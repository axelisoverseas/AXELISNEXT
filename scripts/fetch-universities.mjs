#!/usr/bin/env node
/**
 * Expand src/data/finder-universities.json from Wikidata (CC0, no API key).
 *
 * TWO-PHASE, because the old single-query-per-country shape could not be
 * scaled. It asked for labels, websites and cities in the same join it used to
 * rank by sitelink count, which WDQS can only answer for a few hundred rows
 * before it hits the server-side 60s cap - so the old run was forced to carry
 * LIMIT_PER_COUNTRY = 200 and could never see, let alone report, how many
 * institutions actually exist.
 *
 *   Phase 1 (enumerate): one cheap `?item`-only query per (country, type).
 *     No labels, no OPTIONALs, NO LIMIT. This returns the COMPLETE set, which
 *     is the only way to state a real ceiling rather than a capped one.
 *   Phase 2 (hydrate): label / website / city for the deduped QID union, in
 *     batches of HYDRATE_BATCH via `VALUES ?item { ... }`.
 *   Phase 3 (merge): filter, dedup, append. Never rewrites an existing entry.
 *
 * Enumeration deliberately does NOT filter on P856 (official website), so the
 * run can MEASURE what relaxing that requirement would admit instead of
 * guessing. See REQUIRE_WEBSITE.
 *
 *   node scripts/fetch-universities.mjs              # fetch + merge
 *   node scripts/fetch-universities.mjs --dry-run    # fetch + report, no write
 *   node scripts/fetch-universities.mjs --cached     # merge from cache only
 *   node scripts/fetch-universities.mjs --census     # ceiling report, no merge
 *   node scripts/fetch-universities.mjs --audit=DE   # print what a country adds
 *
 * Requires Node 18+ (global fetch).
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "src/data/finder-universities.json");
const CACHE_DIR = path.join(ROOT, "scripts/.cache/wikidata");
const QID_CACHE = path.join(CACHE_DIR, "qids");
const HYDRATE_CACHE = path.join(CACHE_DIR, "hydrated");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT = "AxelisOverseas/1.0 (https://overseeducation.com; hello@overseeducation.com) node-fetch";

// Politeness / resilience knobs.
const DELAY_MS = 1200;
const MAX_ATTEMPTS = 4;
const BASE_BACKOFF_MS = 5000;
const REQUEST_TIMEOUT_MS = 120000;
const HYDRATE_BATCH = 300;

/**
 * Require an official website (P856).
 *
 * Measured, not assumed. With enumeration unfiltered we can see both halves:
 * across the 29 destinations the no-website remainder is dominated by items
 * with no English label at all (bare QIDs), historical German Hochschulen that
 * predate P576 being filled in, and stub items for single faculties. The
 * website is the cleanest single signal that an entity is a real, currently
 * operating institution a student could actually apply to, so it stays ON -
 * but the census report prints the number it costs, so the trade is visible
 * rather than hidden. Flip to false and re-run --census to re-measure.
 */
const REQUIRE_WEBSITE = true;

/**
 * Entity types to walk, each via wdt:P31/wdt:P279*.
 *
 * Q3918 (university) alone was the old query and it under-counts badly: whole
 * national sectors sit under other classes. Germany's Fachhochschulen, the
 * Dutch hogescholen, the French grandes ecoles and the US community-college
 * sector are all outside Q3918.
 *
 * Every type here was checked by sampling its EXCLUSIVE set (items matching it
 * but NOT Q3918) before being added - see the census output for the marginal
 * contribution each one makes.
 *
 * Q2385804 (educational institution) is deliberately ABSENT. It is the parent
 * class of "school", so walking it pulls in primary schools, Gymnasien,
 * Berufskollegs, driving schools and kindergartens. It is also so large that
 * WDQS times out on a bare COUNT for Germany. It would inflate the number at
 * the cost of making the finder useless, which is the opposite of the job.
 */
const TYPES = [
  { qid: "Q3918", label: "university" },
  { qid: "Q38723", label: "higher education institution" },
  { qid: "Q189004", label: "college" },
  { qid: "Q1371037", label: "institute of technology" },
  { qid: "Q3354859", label: "collegiate university" },
  { qid: "Q1663017", label: "technical university" },
];

/**
 * Wikidata country QIDs, keyed by the country names the site's own data uses.
 * The set of keys is derived from finder-universities.json at runtime - if a
 * country appears there and is missing here, the run reports it loudly.
 */
const COUNTRY_QIDS = {
  Australia: "Q408",
  Austria: "Q40",
  Belgium: "Q31",
  Canada: "Q16",
  China: "Q148",
  "Czech Republic": "Q213",
  Denmark: "Q35",
  Estonia: "Q191",
  Finland: "Q33",
  France: "Q142",
  Germany: "Q183",
  Greece: "Q41",
  Hungary: "Q28",
  Iceland: "Q189",
  Ireland: "Q27",
  Italy: "Q38",
  Japan: "Q17",
  Netherlands: "Q55",
  "New Zealand": "Q664",
  Norway: "Q20",
  Poland: "Q36",
  Portugal: "Q45",
  Singapore: "Q334",
  Slovenia: "Q215",
  Spain: "Q29",
  Sweden: "Q34",
  Switzerland: "Q39",
  UAE: "Q878",
  USA: "Q30",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slugFile = (s) => s.replace(/\s+/g, "-").toLowerCase();

/* ------------------------------------------------------------------ *
 * Identity helpers  (unchanged - the ids already on disk depend on these)
 * ------------------------------------------------------------------ */

/**
 * The id scheme already used in finder-universities.json: charter prefix, then
 * country + name lowercased with every non-alphanumeric run collapsed to a
 * dash. Non-ASCII is collapsed, not transliterated - matching the existing
 * "EPA-austria-montanuniversit-t-leoben".
 */
function makeId(charter, country, name) {
  const slug = `${country}-${name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${charter}-${slug}`;
}

// "University" in the languages the destination countries actually use, so
// "Universite de X" and "University of X" collapse to the same stem.
const UNIVERSITY_WORDS =
  /\b(universities|university|universite|universitet|universitetet|universitat|universitaet|universiteit|universidad|universidade|universita|uniwersytet|univerzita|univerza|univerzitet|egyetem|yliopisto|univ)\b/g;

/**
 * The dedup key is deliberately far more aggressive than makeId: diacritics
 * folded, punctuation dropped, and the noise words that make one institution
 * look like two ("the", "university of", "univ.") removed. Matching only -
 * never written out.
 *
 * `loose` additionally strips the word "university" itself in every language,
 * which makes word order and translation irrelevant: "Universite Bordeaux
 * Montaigne" == "Bordeaux Montaigne University", "Leipzig University" ==
 * "University of Leipzig".
 *
 * That is right for the EPA countries, where those pairs are the same school
 * written two ways, and wrong for the GAC ones, where word order is the only
 * thing separating genuinely different institutions - Miami University (Ohio)
 * from the University of Miami, Jinan University from the University of Jinan,
 * York University from the University of York. So the loose key is used for
 * EPA only; GAC keeps the conservative one.
 */
function dedupKey(name, { loose = false } = {}) {
  let key = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\buniv\b/g, "university")
    .replace(/\buniversity of\b/g, " ");
  if (loose) key = key.replace(UNIVERSITY_WORDS, " ").replace(/\b(of|for|and)\b/g, " ");
  return key
    .replace(/\bthe\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Match the data file's existing on-disk conventions exactly - 2-space indent,
 * non-ASCII written as \uXXXX escapes, no trailing newline - so a re-run shows
 * up in git as pure additions rather than reformatting every existing line.
 */
function serialize(data) {
  return JSON.stringify(data, null, 2).replace(/[\u007f-￿]/g, (c) =>
    "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
  );
}

/* ------------------------------------------------------------------ *
 * SPARQL
 * ------------------------------------------------------------------ */

async function sparql(query) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST", // long queries overflow GET URL limits
      headers: {
        Accept: "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
      },
      body: new URLSearchParams({ query }).toString(),
      signal: controller.signal,
    });
    if (!res.ok) {
      const retryAfter = Number(res.headers.get("retry-after")) || 0;
      const err = new Error(`HTTP ${res.status} ${res.statusText}`);
      err.status = res.status;
      err.retryAfter = retryAfter * 1000;
      throw err;
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function sparqlWithRetry(query, what) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await sparql(query);
    } catch (err) {
      const last = attempt === MAX_ATTEMPTS;
      const wait = err.retryAfter || BASE_BACKOFF_MS * 2 ** (attempt - 1);
      console.warn(
        `  ! ${what}: ${err.message || err.name} (attempt ${attempt}/${MAX_ATTEMPTS})` +
          (last ? " - giving up, continuing" : ` - backing off ${Math.round(wait / 1000)}s`)
      );
      if (last) return null; // skipped, never fatal
      await sleep(wait);
    }
  }
  return null;
}

/* -- Phase 1: enumerate ------------------------------------------- */

/**
 * Bare QID enumeration. No label service, no OPTIONAL, no ORDER BY, no LIMIT -
 * every one of those is what made the old query fall over above a few hundred
 * rows. `hasSite` is carried as a boolean so the P856 trade-off can be
 * measured without a second round trip.
 */
function enumerateQuery(typeQid, countryQid) {
  return `
SELECT ?item (COUNT(?w) AS ?sites) WHERE {
  ?item wdt:P31/wdt:P279* wd:${typeQid} .
  ?item wdt:P17 wd:${countryQid} .
  FILTER NOT EXISTS { ?item wdt:P576 ?dissolved }
  OPTIONAL { ?item wdt:P856 ?w }
}
GROUP BY ?item`.trim();
}

async function enumerateCountry(country, countryQid) {
  // qid -> { types: Set, hasSite: bool }
  const found = new Map();
  const perType = {};
  for (const type of TYPES) {
    const json = await sparqlWithRetry(
      enumerateQuery(type.qid, countryQid),
      `${country}/${type.qid}`
    );
    if (!json) {
      perType[type.qid] = null; // failed, distinct from zero
      await sleep(DELAY_MS);
      continue;
    }
    const rows = json.results.bindings;
    perType[type.qid] = rows.length;
    for (const b of rows) {
      const qid = b.item.value.split("/").pop();
      const hasSite = Number(b.sites?.value ?? 0) > 0;
      const entry = found.get(qid);
      if (entry) {
        entry.types.push(type.qid);
        entry.hasSite = entry.hasSite || hasSite;
      } else {
        found.set(qid, { types: [type.qid], hasSite });
      }
    }
    process.stdout.write(`    ${type.qid} ${String(rows.length).padStart(6)}\n`);
    await sleep(DELAY_MS);
  }
  return { found, perType };
}

/* -- Phase 2: hydrate --------------------------------------------- */

function hydrateQuery(qids) {
  const values = qids.map((q) => `wd:${q}`).join(" ");
  return `
SELECT ?item ?itemLabel ?cityLabel ?website ?sitelinks WHERE {
  VALUES ?item { ${values} }
  ?item wikibase:sitelinks ?sitelinks .
  OPTIONAL { ?item wdt:P856 ?website }
  OPTIONAL { ?item wdt:P131 ?city }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`.trim();
}

async function hydrate(country, found) {
  const qids = [...found.keys()];
  const out = new Map();
  for (let i = 0; i < qids.length; i += HYDRATE_BATCH) {
    const batch = qids.slice(i, i + HYDRATE_BATCH);
    const json = await sparqlWithRetry(
      hydrateQuery(batch),
      `${country} hydrate ${i}-${i + batch.length}`
    );
    if (json) {
      for (const b of json.results.bindings) {
        const qid = b.item.value.split("/").pop();
        const existing = out.get(qid);
        if (existing) {
          if (!existing.city && b.cityLabel?.value) existing.city = b.cityLabel.value;
          if (!existing.website && b.website?.value) existing.website = b.website.value;
          continue;
        }
        out.set(qid, {
          qid,
          label: b.itemLabel?.value ?? "",
          city: b.cityLabel?.value ?? null,
          website: b.website?.value ?? null,
          sitelinks: Number(b.sitelinks?.value ?? 0),
          types: found.get(qid)?.types ?? [],
          hasSite: found.get(qid)?.hasSite ?? false,
        });
      }
    }
    process.stdout.write(
      `    hydrated ${Math.min(i + HYDRATE_BATCH, qids.length)}/${qids.length}\r`
    );
    await sleep(DELAY_MS);
  }
  process.stdout.write("\n");
  // Most notable first, so any downstream display cap keeps the useful ones.
  return [...out.values()].sort((a, b) => b.sitelinks - a.sitelinks);
}

/* ------------------------------------------------------------------ *
 * Filtering
 * ------------------------------------------------------------------ */

// Wikidata hands back the bare QID when no English label exists.
const isUnlabelled = (name) => !name || /^Q\d+$/.test(name.trim());

/**
 * Things the type walk catches that are not an institution a student applies
 * to. The first block was tuned against Q3918 output; the second block was
 * added when the walk was broadened, and every pattern in it was put there in
 * response to real rows seen in the new types' exclusive sets - sub-units,
 * school-sector items pulled in under Q189004, and administrative bodies.
 */
const NON_UNIVERSITY = [
  /\bfaculty\b/i,
  /\bfaculties\b/i,
  /\bdepartment\b/i,
  /\binstitute of technology transfer\b/i,
  /\bhospital\b/i,
  /\bmuseum\b/i,
  /\blibrary\b/i,
  /\bpress\b/i,
  /\bpublishing\b/i,
  /\bnetwork\b/i,
  /\bassociation\b/i,
  /\balumni\b/i,
  /\bfoundation\b/i,
  /\bconsortium\b/i,
  /\bsystem office\b/i,
  /\bcampus of\b/i,
  /\bbotanical garden\b/i,
  /\bstudent union\b/i,
  /\bhalls? of residence\b/i,
  // Service academies: degree-granting, but not open to international applicants.
  /\b(military|militaire|militare|naval|navale|aeronautica|gendarmerie|cadet)\b/i,
  /\b(air force|war college|staff college|police academy)\b/i,
  // Seminaries proper. Theological *universities* and colleges stay in - several
  // (Debrecen Reformed, Lutheran Theological) are ordinary accredited universities.
  /\b(seminary|seminario|séminaire|rabbinical)\b/i,
  /\bbible college\b/i,

  // --- added for the broadened type walk ---
  // Sub-units of a university, which Q38723/Q189004 surface as items in their
  // own right. A student applies to the parent, not to these.
  /\b(school|college|institute|centre|center) of the university\b/i,
  /\buniversity (college )?hospital\b/i,
  /\bgraduate school of\b/i,
  /\bdoctoral school\b/i,
  /\bresearch (centre|center|institute|unit|group|station)\b/i,
  /\bmax planck\b/i,
  /\bfraunhofer\b/i,
  /\bleibniz(-| )(institut|institute|zentrum)\b/i,
  /\bhelmholtz\b/i,
  // Secondary / pre-tertiary, which Q189004 and Q38723 both leak.
  /\b(gymnasium|gymnasien|realschule|hauptschule|grundschule|berufskolleg|berufsschule|volkshochschule|studienkolleg)\b/i,
  /\b(high school|secondary school|primary school|elementary school|middle school|grammar school|preparatory school)\b/i,
  /\b(lycée|lycee|collège d'enseignement|instituto de educación secundaria|liceo)\b/i,
  /\b(kindergarten|nursery)\b/i,
  // Administrative and umbrella bodies.
  /\b(board of|ministry of|department for|council of|agency for|authority)\b/i,
  /\bschool district\b/i,
  /\b(university|college) system\b/i,
  /\bstate university system\b/i,
  // Driving / flight / language schools.
  /\b(driving school|flight school|language school|dance school|riding school)\b/i,
];

function looksLikeUniversity(name) {
  if (isUnlabelled(name)) return false;
  if (name.length < 4 || name.length > 120) return false;
  return !NON_UNIVERSITY.some((re) => re.test(name));
}

/* ------------------------------------------------------------------ *
 * Cache
 * ------------------------------------------------------------------ */

async function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2) + "\n");
}

const qidFile = (country) => path.join(QID_CACHE, `${slugFile(country)}.json`);
const hydFile = (country) => path.join(HYDRATE_CACHE, `${slugFile(country)}.json`);

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const cachedOnly = args.includes("--cached");
  const census = args.includes("--census");
  const auditArg = args.find((a) => a.startsWith("--audit="));
  const auditCountry = auditArg ? auditArg.slice("--audit=".length) : null;

  const data = JSON.parse(await readFile(DATA_FILE, "utf8"));
  const before = { epa: data.epa.length, gac: data.gac.length };
  // Additive contract: nothing already on disk may disappear. Asserted at the end.
  const originalIds = new Set([...data.epa, ...data.gac].map((u) => u.id));

  // The destination list and the EPA/GAC split both come from the existing
  // data - nothing here is invented.
  const epaCountries = new Set(data.epa.map((u) => u.country));
  const gacCountries = new Set(data.gac.map((u) => u.country));
  const countries = [...new Set([...epaCountries, ...gacCountries])].sort();

  // Countries listed under both charters (Germany, Switzerland) are European
  // public-route destinations first, so additions go to EPA.
  const charterFor = (country) =>
    epaCountries.has(country) ? "EPA" : gacCountries.has(country) ? "GAC" : null;

  const missingQid = countries.filter((c) => !COUNTRY_QIDS[c]);
  if (missingQid.length) {
    console.error(`No Wikidata QID mapped for: ${missingQid.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `${countries.length} destinations · ${before.epa} EPA + ${before.gac} GAC = ${
      before.epa + before.gac
    } existing\n`
  );

  // Dedup index spans BOTH arrays: a German university routed to EPA must not
  // duplicate one already sitting in GAC.
  // The loose/strict choice follows the country's charter, not the array the
  // entry happens to sit in, so a German GAC entry is still matched loosely.
  const keyFor = (country, name) =>
    `${country}::${dedupKey(name, { loose: charterFor(country) === "EPA" })}`;

  const seen = new Set();
  for (const u of [...data.epa, ...data.gac]) seen.add(keyFor(u.country, u.university));
  const usedIds = new Set(originalIds);

  const stats = {};
  // Marginal contribution per type, across every country: how many entries
  // were ADDED whose type set does not include Q3918.
  const typeCredit = Object.fromEntries(TYPES.map((t) => [t.qid, 0]));
  const typeExclusive = Object.fromEntries(TYPES.map((t) => [t.qid, 0]));
  let totalRaw = 0;
  let totalNoSite = 0;
  let totalUnlabelled = 0;
  let skippedDuplicates = 0;
  let skippedNonUniversity = 0;
  let skippedNoWebsite = 0;
  const failedCountries = [];

  for (const country of countries) {
    const charter = charterFor(country);
    let rows = await readJson(hydFile(country));

    if (!rows && !cachedOnly) {
      console.log(`→ ${country} (${COUNTRY_QIDS[country]})`);
      let enumerated = await readJson(qidFile(country));
      if (!enumerated) {
        const { found, perType } = await enumerateCountry(country, COUNTRY_QIDS[country]);
        enumerated = {
          perType,
          items: Object.fromEntries([...found].map(([q, v]) => [q, v])),
        };
        await writeJson(qidFile(country), enumerated);
      }
      const found = new Map(
        Object.entries(enumerated.items).map(([q, v]) => [q, v])
      );
      if (found.size === 0) {
        failedCountries.push(country);
        stats[country] = { charter, raw: 0, added: 0, duplicates: 0, noSite: 0 };
        continue;
      }
      rows = await hydrate(country, found);
      await writeJson(hydFile(country), rows);
    }

    if (!rows) {
      failedCountries.push(country);
      stats[country] = { charter, raw: 0, added: 0, duplicates: 0, noSite: 0 };
      continue;
    }

    let added = 0;
    let dupes = 0;
    let noSite = 0;
    let unlabelled = 0;
    const auditAdded = [];

    for (const row of rows) {
      totalRaw += 1;
      const isExclusive = !row.types?.includes("Q3918");
      if (isExclusive) for (const t of row.types ?? []) typeExclusive[t] = (typeExclusive[t] ?? 0) + 1;

      const name = (row.label || "").trim();
      if (isUnlabelled(name)) {
        unlabelled += 1;
        totalUnlabelled += 1;
      }
      if (!row.hasSite) {
        noSite += 1;
        totalNoSite += 1;
        if (REQUIRE_WEBSITE) {
          skippedNoWebsite += 1;
          continue;
        }
      }
      if (!looksLikeUniversity(name)) {
        skippedNonUniversity += 1;
        continue;
      }
      const key = keyFor(country, name);
      if (seen.has(key)) {
        dupes += 1;
        continue;
      }
      const id = makeId(charter, country, name);
      if (usedIds.has(id)) {
        // Distinct entities can slug-collide; React keys must stay unique.
        dupes += 1;
        continue;
      }
      seen.add(key);
      usedIds.add(id);
      if (!census) data[charter.toLowerCase()].push({ country, university: name, source: charter, id });
      added += 1;
      if (isExclusive) for (const t of row.types ?? []) typeCredit[t] = (typeCredit[t] ?? 0) + 1;
      if (auditCountry && country.toLowerCase().startsWith(auditCountry.toLowerCase())) {
        auditAdded.push(`${name}  [${(row.types ?? []).join(",")}] sl=${row.sitelinks}`);
      }
    }

    if (auditAdded.length) {
      console.log(`\n--- ${country}: ${auditAdded.length} newly added ---`);
      for (const line of auditAdded) console.log("  " + line);
      console.log("");
    }

    skippedDuplicates += dupes;
    stats[country] = { charter, raw: rows.length, added, duplicates: dupes, noSite, unlabelled };
  }

  // Keep each array grouped by country then name, the way the file already reads.
  for (const key of ["epa", "gac"]) {
    data[key].sort(
      (a, b) =>
        a.country.localeCompare(b.country, "en") || a.university.localeCompare(b.university, "en")
    );
  }

  const after = { epa: data.epa.length, gac: data.gac.length };

  console.log("\ncountry              charter     raw  added  dupes  noSite");
  for (const country of countries) {
    const s = stats[country] ?? { charter: "?", raw: 0, added: 0, duplicates: 0, noSite: 0 };
    console.log(
      `${country.padEnd(20)} ${String(s.charter).padEnd(7)} ${String(s.raw).padStart(7)} ${String(
        s.added
      ).padStart(6)} ${String(s.duplicates).padStart(6)} ${String(s.noSite).padStart(7)}`
    );
  }

  console.log("\ntype marginal contribution (items NOT also instance-of Q3918)");
  console.log("qid        label                            in-wikidata   kept");
  for (const t of TYPES) {
    console.log(
      `${t.qid.padEnd(10)} ${t.label.padEnd(32)} ${String(typeExclusive[t.qid]).padStart(11)} ${String(
        typeCredit[t.qid]
      ).padStart(6)}`
    );
  }

  console.log(
    `\nEPA ${before.epa} → ${after.epa} · GAC ${before.gac} → ${after.gac} · total ${
      before.epa + before.gac
    } → ${after.epa + after.gac}`
  );
  console.log(
    `raw distinct entities enumerated: ${totalRaw} · without P856: ${totalNoSite} · unlabelled: ${totalUnlabelled}`
  );
  console.log(
    `dropped - no website: ${skippedNoWebsite} · not an institution: ${skippedNonUniversity} · duplicate: ${skippedDuplicates}`
  );
  if (failedCountries.length) console.log(`failed after retries: ${failedCountries.join(", ")}`);

  // Additive contract, asserted rather than trusted.
  const finalIds = new Set([...data.epa, ...data.gac].map((u) => u.id));
  const lost = [...originalIds].filter((id) => !finalIds.has(id));
  if (lost.length) {
    console.error(`\nREFUSING TO WRITE: ${lost.length} existing entries would be lost.`);
    console.error(lost.slice(0, 20).join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log(`additive check: all ${originalIds.size} pre-existing ids still present.`);

  if (census) {
    console.log("\n--census: ceiling measured, nothing written.");
    return;
  }
  if (dryRun) {
    console.log("\n--dry-run: nothing written.");
    return;
  }
  await writeFile(DATA_FILE, serialize(data));
  console.log(`\nwrote ${path.relative(ROOT, DATA_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
