#!/usr/bin/env node
/**
 * Build src/data/finder-courses.json - the course-search index behind the
 * Courses tab of the university finder.
 *
 * WHAT THIS IS NOT
 * ----------------
 * It does not invent a single programme name.
 *
 * By default it emits exactly one source: DUO's Dutch accreditation register,
 * which is openly licensed (CC-BY) and is fetched live - see DUO_RESOURCE
 * below. CC-BY obliges us to credit it by name and link wherever the data is
 * shown, which CourseCoverageNote in UniversityFinder.jsx does.
 *
 * A second source exists in the repo and is NOT emitted: src/data/
 * programsData.json, 982 rows that were already here, referenced by no page.
 * They are real programme records - real institutions, real durations, real
 * delivery modes - but the repo records no origin and no licence for them, and
 * the `type` vocabulary ("international course, full time", "with integrated
 * professional training, dual system") is DAAD's, from its International
 * Programmes database, whose terms reserve commercial reuse. Likely origin is
 * not permission, so they stay out unless --include-unlicensed says otherwise.
 *
 * The result is a thin index - one destination of 29 - and that is the honest
 * state of open course data, not a shortfall in the importer.
 *
 * The honest coverage, measured rather than claimed, is printed on every run
 * and baked into the output so the UI can state it to the user. Two
 * destinations out of twenty-nine have meaningful coverage. The Courses tab
 * says so on its face rather than implying a catalogue that does not exist.
 *
 * WHY ONLY TWO. Every other national source was checked and is unusable:
 *   - Wikidata has ~189 programme items linked to an institution GLOBALLY,
 *     and the sample is mostly mislabelled departments. Not a foundation.
 *   - Germany (Hochschulkompass/HRK) reserves commercial reuse in writing;
 *     DAAD's International Programmes JSON API returns 403.
 *   - UCAS is a paid licensed product that forbids third-party access.
 *   - Finland (Opintopolku konfo-backend) is the best data anywhere - all
 *     five useful fields including language of instruction, ~1,895 HE
 *     programmes - but declares NO licence, so reuse rights are undefined.
 *   - Norway (utdanning.no studievelgeren) likewise: NLOD 2.0 is declared for
 *     a different, non-institution-bound dataset, not this endpoint.
 *   - UK Discover Uni exists but could not be retrieved or its current
 *     licence verified.
 *   - ESCO, OpenAIRE, ETER and Erasmus Without Paper carry occupations,
 *     research outputs, institutions and mobility course units respectively -
 *     none carries degree programmes.
 *
 *   node scripts/import-courses.mjs
 *   node scripts/import-courses.mjs --dry-run
 *   node scripts/import-courses.mjs --refresh-nl   # re-pull the DUO register
 *   node scripts/import-courses.mjs --no-nl        # repo source only, offline
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_FILE = path.join(ROOT, "src/data/programsData.json");
const UNIVERSITIES_FILE = path.join(ROOT, "src/data/finder-universities.json");
const OUT_FILE = path.join(ROOT, "src/data/finder-courses.json");
const DUO_CACHE = path.join(ROOT, "scripts/.cache/duo/ho-erkenningen.json");

/**
 * SOURCE 2 - the Netherlands, and the only genuinely open programme-level feed
 * found anywhere across the 29 destinations.
 *
 * DUO (the Dutch education executive agency) publishes "Overzicht Erkenningen
 * ho" - the register of accredited higher education programmes - on its CKAN
 * portal under CC-BY, declared as `license_id: cc-by` in the package metadata:
 *
 *   https://onderwijsdata.duo.nl/api/3/action/package_show?id=overzicht-erkenningen-ho
 *
 * 6,733 currently-valid (STATUS=ACTUEEL) rows. This is a statutory register,
 * not a marketing list: every row is an accredited programme with an NVAO
 * accreditation date, an EQF/NLQF level and a legal study load in ECTS.
 *
 * Fetched through the datastore API rather than the CSV download, because the
 * CSV truncates non-deterministically - two identical requests returned 27,649
 * and 11,836 rows against a register the datastore reports as 74,137.
 *
 * KNOWN GAP: the register carries no language of instruction. For a study
 * abroad audience that is the single most useful missing field, and no open
 * Dutch source supplies it.
 */
const DUO_RESOURCE = "28a4d89b-c223-4dbc-8deb-9d02a533f215";
const DUO_API = "https://onderwijsdata.duo.nl/api/3/action/datastore_search";
const DUO_PAGE = 1000;

/**
 * Institution-name matcher. The source file and the finder disagree on
 * punctuation, diacritics and the odd parenthetical, so compare on a folded
 * form. Deliberately NOT the finder's loose key - that one strips the word
 * "university" entirely, which is right for merging translations of one German
 * university and wrong here, where a wrong match would file a programme under
 * the wrong institution.
 */
function foldName(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// "7 semester" -> "7 semesters"; anything unparseable is passed through as-is.
function tidyDuration(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(semester|semesters|year|years|month|months)$/i);
  if (!m) return s;
  const n = Number(m[1]);
  const unit = m[2].toLowerCase().replace(/s$/, "");
  return `${m[1]} ${unit}${n === 1 ? "" : "s"}`;
}

// The source `type` column is a comma-separated bag of delivery attributes.
// Split it so the UI can show them as chips and the search can match them.
function parseModes(raw) {
  if (!raw) return [];
  return [
    ...new Set(
      String(raw)
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    ),
  ];
}

// A programme name that is really just a level marker.
const PLACEHOLDER_COURSE = /^(pg|ug|n\/?a|mixed|general|mixed\s*\/\s*general|-+)$/i;

const LEVELS = { UG: "Undergraduate", PG: "Postgraduate" };
const levelLabel = (c) => LEVELS[c] ?? "Mixed / general";

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function serialize(data) {
  // Same on-disk convention as finder-universities.json: 2-space indent,
  // non-ASCII escaped, so diffs stay readable.
  return JSON.stringify(data, null, 2).replace(/[\u007f-￿]/g, (c) =>
    "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
  );
}


async function fetchDuo({ refresh }) {
  if (!refresh && existsSync(DUO_CACHE)) {
    return JSON.parse(await readFile(DUO_CACHE, "utf8"));
  }
  const filters = encodeURIComponent(JSON.stringify({ STATUS: "ACTUEEL" }));
  const records = [];
  let offset = 0;
  for (;;) {
    const url = `${DUO_API}?resource_id=${DUO_RESOURCE}&filters=${filters}&limit=${DUO_PAGE}&offset=${offset}`;
    const res = await fetch(url, { headers: { "User-Agent": "AxelisOverseas/1.0 (https://overseeducation.com)" } });
    if (!res.ok) throw new Error(`DUO HTTP ${res.status}`);
    const json = await res.json();
    if (!json.success) throw new Error("DUO returned success=false");
    const batch = json.result.records ?? [];
    records.push(...batch);
    process.stdout.write(`  DUO ${records.length}/${json.result.total}\r`);
    if (batch.length < DUO_PAGE || records.length >= json.result.total) break;
    offset += DUO_PAGE;
  }
  process.stdout.write("\n");
  await mkdir(path.dirname(DUO_CACHE), { recursive: true });
  await writeFile(DUO_CACHE, JSON.stringify(records));
  return records;
}

// NIVEAU codes from the register, spelled out. WO = research university,
// HBO = university of applied sciences; both are higher education in law.
const DUO_LEVELS = {
  "WO-BA": "Bachelor (research university)",
  "WO-MA": "Master (research university)",
  "WO-PM": "Post-master (research university)",
  "WO-O": "Doctorate / other (research university)",
  "HBO-BA": "Bachelor (university of applied sciences)",
  "HBO-MA": "Master (university of applied sciences)",
  "HBO-AD": "Associate degree",
  "HBO-PM": "Post-master (university of applied sciences)",
};

const DUO_FORMS = { VOLTIJD: "full time", DEELTIJD: "part time", DUAAL: "dual" };

function duoToCourse(r) {
  // The register carries a separate international name for programmes taught
  // under an English title; prefer it, since that is the name a student
  // searching in English would type.
  const name = (r.OPLEIDINGSEENHEID_INTERNATIONALE_NAAM || r.OPLEIDINGSEENHEID_NAAM || "").trim();
  const university = (r.INSTELLINGSNAAM || "").trim();
  if (!name || !university) return null;
  const ects = Number(r.STUDIELAST);
  return {
    course: name,
    university,
    country: "Netherlands",
    level: DUO_LEVELS[r.NIVEAU] ?? (r.GRAAD ? String(r.GRAAD).toLowerCase() : "Higher education"),
    duration: Number.isFinite(ects) && ects > 0 && r.STUDIELASTEENHEID === "ECTS_PUNT" ? `${ects} ECTS` : null,
    modes: [DUO_FORMS[r.VORM] ?? null].filter(Boolean),
    city: r.PLAATSNAAM ? r.PLAATSNAAM.charAt(0) + r.PLAATSNAAM.slice(1).toLowerCase() : null,
  };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const refreshNl = process.argv.includes("--refresh-nl");
  const skipNl = process.argv.includes("--no-nl");

  // programsData.json is EXCLUDED by default, and that is the whole point of
  // this flag. The 982 rows in it are real programme records, but this repo
  // records no origin and no licence for them, and the delivery-mode
  // vocabulary points at DAAD's International Programmes database, whose terms
  // reserve commercial reuse. Publishing them on a commercial site on the
  // strength of "it was already in the repo" is not a licence.
  //
  // If someone establishes where the file came from and on what terms, pass
  // --include-unlicensed and record the answer in the provenance block below.
  const includeUnlicensed = process.argv.includes("--include-unlicensed");

  const rows = includeUnlicensed
    ? JSON.parse(await readFile(SOURCE_FILE, "utf8"))
    : [];
  const unis = JSON.parse(await readFile(UNIVERSITIES_FILE, "utf8"));
  const all = [...unis.epa, ...unis.gac];

  // Institution index, so each programme can be attributed to a real finder
  // entry (and therefore a real country) rather than to a free-text string.
  const byName = new Map();
  // Same index keyed by country too. Institution names are NOT globally
  // unique: matching "Northeastern University" on name alone filed Boston's
  // programmes under China, because Shenyang's Northeastern University sorts
  // first. Where the source row declares a country, the match must agree.
  const byCountryName = new Map();
  for (const u of all) {
    const key = foldName(u.university);
    if (!byName.has(key)) byName.set(key, u);
    const ck = `${u.country}::${key}`;
    if (!byCountryName.has(ck)) byCountryName.set(ck, u);
  }

  const courses = [];
  const usedIds = new Set();
  const perCountry = {};
  const unresolved = new Set();
  let skippedNoCourse = 0;
  let skippedPlaceholder = 0;

  for (const row of rows) {
    const name = (row.course || "").trim();
    const universityRaw = (row.university || "").trim();
    if (!name || !universityRaw) {
      skippedNoCourse += 1;
      continue;
    }
    // Eleven rows carry a bare level token where the programme name belongs
    // ("PG", "UG"). They are placeholders, not programmes, and a card reading
    // just "PG" is exactly the kind of filler this index must not contain.
    if (PLACEHOLDER_COURSE.test(name)) {
      skippedPlaceholder += 1;
      continue;
    }

    const declared = (row.country || "").trim();
    const folded = foldName(universityRaw);
    // Prefer a match inside the country the row declares; fall back to a bare
    // name match only when the row says nothing about where it is.
    const match = declared
      ? byCountryName.get(`${declared}::${folded}`) ?? null
      : byName.get(folded);
    // Country comes from the matched finder entry first - that is the only
    // attribution that is checkable. The source file's own `country` column is
    // empty on 909 of 982 rows, so it is a fallback, not the primary.
    const country = match?.country ?? declared;
    if (!match) unresolved.add(universityRaw);
    if (!country) {
      // No verifiable country: the row would be unplaceable in a
      // country-grouped UI, so it is dropped rather than guessed at.
      continue;
    }

    let id = `C-${slug(country)}-${slug(universityRaw)}-${slug(name)}`.slice(0, 160);
    if (usedIds.has(id)) {
      let n = 2;
      while (usedIds.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    usedIds.add(id);

    courses.push({
      id,
      course: name,
      // Prefer the finder's spelling when matched, so a course card and a
      // university card name the same institution the same way.
      university: match?.university ?? universityRaw,
      universityId: match?.id ?? null,
      country,
      level: levelLabel(row.category),
      duration: tidyDuration(row.duration),
      modes: parseModes(row.type),
    });
    perCountry[country] = (perCountry[country] ?? 0) + 1;
  }

  const perSource = {};
  if (courses.length) perSource["programsData.json"] = courses.length;

  /* ---- source 2: DUO (NL), CC-BY ---- */
  if (!skipNl) {
    let duoRows = [];
    try {
      duoRows = await fetchDuo({ refresh: refreshNl });
    } catch (err) {
      console.warn(`DUO fetch failed (${err.message}); continuing without it.`);
    }
    // One register row per programme PER LOCATION. A programme taught on three
    // campuses is one thing a student applies to, so collapse on
    // institution + programme + level and keep the cities.
    const collapsed = new Map();
    for (const raw of duoRows) {
      const c = duoToCourse(raw);
      if (!c) continue;
      const key = `${foldName(c.university)}::${foldName(c.course)}::${c.level}`;
      const existing = collapsed.get(key);
      if (existing) {
        if (c.city && !existing.cities.includes(c.city)) existing.cities.push(c.city);
        for (const m of c.modes) if (!existing.modes.includes(m)) existing.modes.push(m);
        continue;
      }
      collapsed.set(key, { ...c, cities: c.city ? [c.city] : [] });
    }

    let nlAdded = 0;
    for (const c of collapsed.values()) {
      const match = byName.get(foldName(c.university));
      let id = `C-netherlands-${slug(c.university)}-${slug(c.course)}`.slice(0, 160);
      if (usedIds.has(id)) {
        let n = 2;
        while (usedIds.has(`${id}-${n}`)) n += 1;
        id = `${id}-${n}`;
      }
      usedIds.add(id);
      courses.push({
        id,
        course: c.course,
        university: match?.university ?? c.university,
        universityId: match?.id ?? null,
        country: "Netherlands",
        level: c.level,
        duration: c.duration,
        modes: c.modes,
        city: c.cities.join(", ") || null,
        source: "duo",
      });
      perCountry.Netherlands = (perCountry.Netherlands ?? 0) + 1;
      nlAdded += 1;
    }
    perSource["DUO Overzicht Erkenningen ho (CC-BY)"] = nlAdded;
    console.log(`DUO register: ${duoRows.length} current rows -> ${nlAdded} distinct programmes`);
  }

  courses.sort(
    (a, b) =>
      a.country.localeCompare(b.country, "en") ||
      a.university.localeCompare(b.university, "en") ||
      a.course.localeCompare(b.course, "en")
  );

  const destinations = new Set(all.map((u) => u.country));
  const institutions = new Set(courses.map((c) => c.university));
  const linked = new Set(courses.filter((c) => c.universityId).map((c) => c.universityId));

  const out = {
    // Everything a reader needs to judge how far to trust this file.
    provenance: {
      generatedBy: "scripts/import-courses.mjs",
      generatedAt: new Date().toISOString().slice(0, 10),
      fabricated: false,
      sources: [
        {
          name: "DUO - Overzicht Erkenningen ho",
          url: "https://onderwijsdata.duo.nl/dataset/overzicht-erkenningen-ho",
          licence: "CC-BY",
          openlyLicensed: true,
          covers: "Netherlands",
          note:
            "Statutory register of accredited Dutch higher education programmes, filtered to STATUS=ACTUEEL. Carries no language of instruction.",
        },
        ...(includeUnlicensed
          ? [
              {
                name: "src/data/programsData.json",
                url: null,
                licence: "unknown",
                openlyLicensed: false,
                covers: "Germany, and a little USA / UK / Ireland",
                note:
                  "Pre-existing repository file, previously unreferenced by any page. Real programme records; original provenance not documented in this repo. The delivery-mode vocabulary matches DAAD's International Programmes database, which is the likely but unconfirmed origin. Included only because --include-unlicensed was passed.",
              },
            ]
          : []),
      ],
      note: includeUnlicensed
        ? undefined
        : "Only openly-licensed programme data is published here. A pre-existing repository file (src/data/programsData.json, 967 usable rows, mostly Germany) was excluded: the records look real, but this repo documents no origin or licence for them, and an undocumented licence is not a licence.",
    },
    coverage: {
      courses: courses.length,
      perSource,
      institutions: institutions.size,
      institutionsLinkedToFinder: linked.size,
      countries: Object.keys(perCountry).length,
      // Of the countries with course data, how many are actually one of the
      // finder's destinations. The UK is in the source data but is not one of
      // them, so the headline figure would otherwise overstate coverage.
      destinationsCovered: Object.keys(perCountry).filter((c) => destinations.has(c)).length,
      countriesOutsideDestinations: Object.keys(perCountry).filter((c) => !destinations.has(c)),
      perCountry: Object.fromEntries(
        Object.entries(perCountry).sort((a, b) => b[1] - a[1])
      ),
      destinationsInFinder: destinations.size,
    },
    courses,
  };

  console.log(`\nrepo source rows: ${rows.length}`);
  console.log(`emitted:     ${courses.length} courses at ${institutions.size} institutions`);
  console.log("by source:");
  for (const [src, n] of Object.entries(perSource)) console.log(`  ${src}: ${n}`);
  console.log(`linked to a finder university: ${linked.size}`);
  console.log(`dropped - no course/university name: ${skippedNoCourse}`);
  console.log(`dropped - placeholder level token as the name: ${skippedPlaceholder}`);
  console.log(
    `dropped - no resolvable country: ${
      rows.length - perSource["programsData.json"] - skippedNoCourse - skippedPlaceholder
    }`
  );
  console.log(`institution names not found in the finder: ${unresolved.size}`);
  console.log("\nper country:");
  for (const [c, n] of Object.entries(out.coverage.perCountry)) {
    console.log(`  ${c.padEnd(16)} ${n}`);
  }
  console.log(
    `\nCOVERAGE: ${out.coverage.destinationsCovered} of ${out.coverage.destinationsInFinder} destinations have any course data at all.` +
      (out.coverage.countriesOutsideDestinations.length
        ? ` (plus ${out.coverage.countriesOutsideDestinations.join(", ")}, which the finder does not list as a destination)`
        : "")
  );

  if (dryRun) {
    console.log("\n--dry-run: nothing written.");
    return;
  }
  await writeFile(OUT_FILE, serialize(out));
  console.log(`\nwrote ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
