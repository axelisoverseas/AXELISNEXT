#!/usr/bin/env node
/**
 * Expand src/data/finder-universities.json from Wikidata (CC0, no API key).
 *
 * One SPARQL request per destination country (a single global query times the
 * endpoint out), polite delay between requests, exponential backoff on 429 /
 * 503 / timeout, and a country that keeps failing is skipped rather than
 * crashing the run.
 *
 * The run is additive and idempotent: every existing entry is kept byte for
 * byte, and re-running only ever adds universities Wikidata has since gained.
 *
 *   node scripts/fetch-universities.mjs            # fetch + merge
 *   node scripts/fetch-universities.mjs --dry-run  # fetch + report, no write
 *   node scripts/fetch-universities.mjs --cached   # merge from cache only
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

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT = "AxelisOverseas/1.0 (https://overseeducation.com; hello@overseeducation.com) node-fetch";

// Politeness / resilience knobs.
const DELAY_MS = 1500; // between countries
const MAX_ATTEMPTS = 4;
const BASE_BACKOFF_MS = 5000;
const REQUEST_TIMEOUT_MS = 150000;

// Most-notable-first cap per country. The finder renders every card with no
// pagination, and this JSON ships to the browser, so an unbounded Q3918 walk
// (thousands of defunct faculties and micro-colleges) would wreck the page.
const LIMIT_PER_COUNTRY = 200;

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

/* ------------------------------------------------------------------ *
 * Identity helpers
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
 * Fetching
 * ------------------------------------------------------------------ */

function buildQuery(qid) {
  // Order by sitelink count so the cap keeps the most notable institutions and
  // re-runs stay deterministic. P576 (dissolved) excludes defunct bodies, and
  // requiring P856 (official website) is the cleanest single signal that an
  // entity is a real, currently operating institution.
  // The cap lives in an inner subquery so it counts distinct institutions - an
  // item with three listed websites would otherwise eat three slots.
  return `
SELECT ?item ?itemLabel ?cityLabel ?website ?sitelinks WHERE {
  {
    SELECT DISTINCT ?item ?sitelinks WHERE {
      ?item wdt:P31/wdt:P279* wd:Q3918 .
      ?item wdt:P17 wd:${qid} .
      ?item wdt:P856 ?anyWebsite .
      ?item wikibase:sitelinks ?sitelinks .
      FILTER NOT EXISTS { ?item wdt:P576 ?dissolved }
    }
    ORDER BY DESC(?sitelinks)
    LIMIT ${LIMIT_PER_COUNTRY}
  }
  OPTIONAL { ?item wdt:P856 ?website }
  OPTIONAL { ?item wdt:P131 ?city }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`.trim();
}

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

async function fetchCountry(country, qid) {
  const query = buildQuery(qid);
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const json = await sparql(query);
      const rows = json?.results?.bindings ?? [];
      // One row per website/city combination comes back; fold to one per item.
      const byQid = new Map();
      for (const b of rows) {
        const qidOut = b.item?.value?.split("/").pop() ?? null;
        if (!qidOut) continue;
        const existing = byQid.get(qidOut);
        if (existing) {
          if (!existing.city && b.cityLabel?.value) existing.city = b.cityLabel.value;
          if (!existing.website && b.website?.value) existing.website = b.website.value;
          continue;
        }
        byQid.set(qidOut, {
          qid: qidOut,
          label: b.itemLabel?.value ?? "",
          city: b.cityLabel?.value ?? null,
          website: b.website?.value ?? null,
          sitelinks: Number(b.sitelinks?.value ?? 0),
        });
      }
      return [...byQid.values()].sort((a, b) => b.sitelinks - a.sitelinks);
    } catch (err) {
      const last = attempt === MAX_ATTEMPTS;
      const wait = err.retryAfter || BASE_BACKOFF_MS * 2 ** (attempt - 1);
      console.warn(
        `  ! ${country}: ${err.message || err.name} (attempt ${attempt}/${MAX_ATTEMPTS})` +
          (last ? " - giving up, continuing" : ` - backing off ${Math.round(wait / 1000)}s`)
      );
      if (last) return null; // skipped, never fatal
      await sleep(wait);
    }
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Filtering
 * ------------------------------------------------------------------ */

// Wikidata hands back the bare QID when no English label exists.
const isUnlabelled = (name) => !name || /^Q\d+$/.test(name.trim());

// Things that instance-of-university transitively catches but are not a
// university a student applies to.
const NON_UNIVERSITY = [
  /\bfaculty\b/i,
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
];

function looksLikeUniversity(name) {
  if (isUnlabelled(name)) return false;
  if (name.length < 4 || name.length > 120) return false;
  return !NON_UNIVERSITY.some((re) => re.test(name));
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */

async function readCache(country) {
  const file = path.join(CACHE_DIR, `${country.replace(/\s+/g, "-").toLowerCase()}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeCache(country, rows) {
  await mkdir(CACHE_DIR, { recursive: true });
  const file = path.join(CACHE_DIR, `${country.replace(/\s+/g, "-").toLowerCase()}.json`);
  await writeFile(file, JSON.stringify(rows, null, 2) + "\n");
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const cachedOnly = args.includes("--cached");

  const data = JSON.parse(await readFile(DATA_FILE, "utf8"));
  const before = { epa: data.epa.length, gac: data.gac.length };

  // The destination list and the EPA/GAC split both come from the existing
  // data - nothing here is invented.
  const epaCountries = new Set(data.epa.map((u) => u.country));
  const gacCountries = new Set(data.gac.map((u) => u.country));
  const countries = [...new Set([...epaCountries, ...gacCountries])].sort();

  // Countries listed under both charters (Germany, Switzerland) are European
  // public-route destinations first, so additions go to EPA.
  const charterFor = (country) => (epaCountries.has(country) ? "EPA" : gacCountries.has(country) ? "GAC" : null);

  const missingQid = countries.filter((c) => !COUNTRY_QIDS[c]);
  if (missingQid.length) {
    console.error(`No Wikidata QID mapped for: ${missingQid.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`${countries.length} destinations · ${before.epa} EPA + ${before.gac} GAC = ${before.epa + before.gac} existing\n`);

  // Dedup index spans BOTH arrays: a German university routed to EPA must not
  // duplicate one already sitting in GAC.
  // The loose/strict choice follows the country's charter, not the array the
  // entry happens to sit in, so a German GAC entry is still matched loosely.
  const keyFor = (country, name) =>
    `${country}::${dedupKey(name, { loose: charterFor(country) === "EPA" })}`;

  const seen = new Set();
  for (const u of [...data.epa, ...data.gac]) seen.add(keyFor(u.country, u.university));
  const usedIds = new Set([...data.epa, ...data.gac].map((u) => u.id));

  const stats = {};
  let skippedDuplicates = 0;
  let skippedNonUniversity = 0;
  const emptyCountries = [];
  const failedCountries = [];

  for (const country of countries) {
    const charter = charterFor(country);
    let rows = cachedOnly ? await readCache(country) : null;

    if (!rows && !cachedOnly) {
      process.stdout.write(`→ ${country} (${COUNTRY_QIDS[country]}) … `);
      rows = await fetchCountry(country, COUNTRY_QIDS[country]);
      if (rows) {
        await writeCache(country, rows);
        process.stdout.write(`${rows.length} rows\n`);
      }
      await sleep(DELAY_MS);
    }

    if (!rows) {
      failedCountries.push(country);
      stats[country] = { charter, fetched: 0, added: 0, duplicates: 0 };
      continue;
    }
    if (rows.length === 0) emptyCountries.push(country);

    let added = 0;
    let dupes = 0;
    for (const row of rows) {
      const name = (row.label || "").trim();
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
      data[charter.toLowerCase()].push({ country, university: name, source: charter, id });
      added += 1;
    }
    skippedDuplicates += dupes;
    stats[country] = { charter, fetched: rows.length, added, duplicates: dupes };
  }

  // Keep each array grouped by country then name, the way the file already reads.
  for (const key of ["epa", "gac"]) {
    data[key].sort((a, b) => a.country.localeCompare(b.country, "en") || a.university.localeCompare(b.university, "en"));
  }

  const after = { epa: data.epa.length, gac: data.gac.length };

  console.log("\ncountry              charter  fetched  added  dupes");
  for (const country of countries) {
    const s = stats[country];
    console.log(
      `${country.padEnd(20)} ${s.charter.padEnd(7)} ${String(s.fetched).padStart(7)} ${String(s.added).padStart(6)} ${String(s.duplicates).padStart(6)}`
    );
  }
  console.log(
    `\nEPA ${before.epa} → ${after.epa} · GAC ${before.gac} → ${after.gac} · total ${before.epa + before.gac} → ${after.epa + after.gac}`
  );
  console.log(`duplicates skipped: ${skippedDuplicates} · non-universities dropped: ${skippedNonUniversity}`);
  if (emptyCountries.length) console.log(`returned nothing: ${emptyCountries.join(", ")}`);
  if (failedCountries.length) console.log(`failed after retries: ${failedCountries.join(", ")}`);

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
