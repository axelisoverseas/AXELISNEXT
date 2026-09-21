"use client";


import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X, Globe2, Building2, GraduationCap, Clock, Info } from "lucide-react";
import universitiesData from "@/data/finder-universities.json";
import logoManifest from "@/data/finder-university-logos.json";
import { COUNTRY_FLAG_CODES } from "@/data/finder-country-codes";

// Midnight Dodger palette (ported from the B2B site).
const DODGER = "#A51C30";
const CERULEAN = "#A51C30";

// Counted, not asserted.
const DESTINATION_COUNT = new Set(
  [...universitiesData.epa, ...universitiesData.gac].map((u) => u.country)
).size;

const FILTERS = [
  { id: "all", label: "All destinations" },
  { id: "epa", label: "Tuition-free Europe" },
  { id: "gac", label: "Global (full-fee)" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.02 } } };
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

function initials(name) {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
}

function groupByCountry(list) {
  const map = new Map();
  for (const u of list) {
    if (!map.has(u.country)) map.set(u.country, []);
    map.get(u.country).push(u);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function UniversityCard({ u }) {
  const logo = logoManifest[u.university];
  return (
    <motion.div
      variants={item}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-e-1 transition-all hover:-translate-y-0.5 hover:shadow-e-2"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        {logo ? (
          <Image src={logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 object-contain" />
        ) : (
          <span className="text-xs font-bold text-[var(--color-dim)]">{initials(u.university)}</span>
        )}
      </div>
      <p className="min-w-0 truncate text-sm font-semibold text-slate-900" title={u.university}>
        {u.university}
      </p>
    </motion.div>
  );
}

// How many cards a country shows before asking. Three rows of three on a
// desktop grid. Without this the page is 82,000px tall: thousands of cards is
// a hundred screens of scrolling, which nobody does, so the list is only
// reachable by searching it anyway.
const PER_COUNTRY_PREVIEW = 9;

// A search used to force every country open unconditionally. That was fine at
// 2,795 rows and is not fine now: typing a single letter matches most of the
// list, and rendering that many cards in one commit locks the tab for seconds
// on a mid-range phone. Above this many matches the preview + "Show N more"
// behaviour is kept, so a broad query stays cheap and a narrow one - the only
// kind anybody actually types - still opens in full.
const SEARCH_EXPAND_LIMIT = 400;

function CountryGroup({ country, universities, expanded: forceExpanded = false }) {
  const flagCode = COUNTRY_FLAG_CODES[country];
  const [showAll, setShowAll] = useState(false);
  // A search has already narrowed things, so show every match.
  const expanded = forceExpanded || showAll;
  const visible = expanded ? universities : universities.slice(0, PER_COUNTRY_PREVIEW);
  const hidden = universities.length - visible.length;
  return (
    <div>
      <div className="flex items-center gap-2">
        {flagCode && (
          <Image src={`/flags/${flagCode}.svg`} alt="" width={20} height={15} className="h-3.5 w-5 rounded-sm object-cover" />
        )}
        <h3 className="text-sm font-semibold tracking-wide" style={{ color: DODGER }}>
          {country}
          <span className="ml-2 font-normal normal-case text-[var(--color-dim)]">({universities.length})</span>
        </h3>
      </div>
      <motion.div
        variants={container}
        initial={false}
        animate="show"
        className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((u) => (
          <UniversityCard key={u.id} u={u} />
        ))}
      </motion.div>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="btn btn-secondary btn-sm mt-3"
        >
          Show {hidden.toLocaleString("en-IN")} more in {country}
        </button>
      )}
    </div>
  );
}

function CharterSection({ icon: Icon, title, subtitle, groups, total, expanded = false }) {
  if (groups.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Icon className="h-5 w-5" style={{ color: DODGER }} />
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-dim)]">{total}</span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-dim)]">{subtitle}</p>
      <div className="mt-6 space-y-8">
        {groups.map(([country, universities]) => (
          <CountryGroup key={country} country={country} universities={universities} expanded={expanded} />
        ))}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ *
 * Courses
 *
 * Backed by src/data/finder-courses.json, built by scripts/import-courses.mjs
 * from real programme records that were already in this repository. Nothing on
 * this tab is generated: if a programme is not in that file it is not shown,
 * and the coverage note below states plainly which destinations have data.
 *
 * The file is ~420KB, which is the same order as the university list, so it is
 * imported lazily on first use rather than shipped to every visitor who only
 * wanted to look up a university.
 * ------------------------------------------------------------------ */

const COURSE_PREVIEW = 30;

function useCourseData(active) {
  const [state, setState] = useState({ status: "idle", data: null });
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    setState({ status: "loading", data: null });
    import("@/data/finder-courses.json")
      .then((m) => setState({ status: "ready", data: m.default ?? m }))
      .catch(() => setState({ status: "error", data: null }));
  }, [active]);
  return state;
}

function CourseCard({ c }) {
  return (
    <motion.div
      variants={item}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-e-1 transition-all hover:-translate-y-0.5 hover:shadow-e-2"
    >
      <p className="text-sm font-semibold leading-snug text-slate-900">{c.course}</p>
      <p className="mt-1 truncate text-xs text-[var(--color-dim)]" title={c.university}>
        {c.university}
        {c.city && <span className="text-slate-400"> \u00b7 {c.city}</span>}
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: `${DODGER}14`, color: DODGER }}
        >
          {c.level}
        </span>
        {c.duration && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[var(--color-dim)]">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {c.duration}
          </span>
        )}
        {(c.modes ?? []).slice(0, 2).map((m) => (
          <span
            key={m}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[var(--color-dim)]"
          >
            {m}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CourseCoverageNote({ coverage }) {
  if (!coverage) return null;
  const per = Object.entries(coverage.perCountry ?? {});
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-5 sm:p-6">
      <div className="flex items-start gap-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: DODGER }} aria-hidden="true" />
        <div>
          <h3 className="text-sm font-bold text-[var(--color-navy)]">
            What this course search actually covers
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dim)] measure">
            {coverage.courses.toLocaleString("en-IN")} accredited programmes at{" "}
            {coverage.institutions.toLocaleString("en-IN")} institutions, covering{" "}
            {coverage.destinationsCovered ?? coverage.countries} of our{" "}
            {coverage.destinationsInFinder} destinations. Almost no country publishes its
            programme register under a licence that lets anyone republish it, so rather than
            pad this out with numbers we cannot stand behind, we list only what is openly
            licensed and say so. For every other destination, tell us the subject and a
            counsellor will confirm the current intake with the university directly.
          </p>
          {/* CC-BY obliges us to credit the source by name, in public, with a
              link. A coverage figure is not attribution. */}
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-dim)]">
            Source:{" "}
            <a
              href="https://onderwijsdata.duo.nl/dataset/overzicht-erkenningen-ho"
              target="_blank"
              rel="noopener noreferrer license"
              className="font-semibold text-[var(--color-axelis)] underline underline-offset-2"
            >
              DUO, Overzicht Erkenningen ho
            </a>{" "}
            (Dienst Uitvoering Onderwijs, Netherlands), used under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer license"
              className="font-semibold text-[var(--color-axelis)] underline underline-offset-2"
            >
              CC BY 4.0
            </a>
            . Axelis is not affiliated with DUO, and DUO does not endorse this listing.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {per.map(([country, n]) => (
              <li
                key={country}
                className="rounded-full border border-[var(--color-rule)] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-dim)]"
              >
                {country} <span className="font-normal">{n.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CourseResults({ query, active }) {
  const { status, data } = useCourseData(active);
  const [shown, setShown] = useState(COURSE_PREVIEW);

  const q = query.trim().toLowerCase();
  // Reset the "show more" count when the query changes. Done during render
  // rather than in an effect: an effect would paint the previous query's long
  // list first and then immediately re-render, which is both a wasted commit
  // and a visible flash. This is React's documented way to adjust state when
  // an input changes.
  const [shownFor, setShownFor] = useState(q);
  if (shownFor !== q) {
    setShownFor(q);
    setShown(COURSE_PREVIEW);
  }

  const matches = useMemo(() => {
    if (!data) return [];
    if (!q) return data.courses;
    return data.courses.filter(
      (c) =>
        c.course.toLowerCase().includes(q) ||
        c.university.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [data, q]);

  if (status === "loading" || status === "idle") {
    return <p className="text-sm text-[var(--color-dim)]">Loading programmes…</p>;
  }
  if (status === "error") {
    return (
      <p className="text-sm text-[var(--color-dim)]">
        The programme list could not be loaded.{" "}
        <Link href="/contact" className="font-semibold underline">
          Ask a counsellor instead
        </Link>
        .
      </p>
    );
  }

  const visible = matches.slice(0, shown);
  const remaining = matches.length - visible.length;

  return (
    <div className="space-y-6">
      <CourseCoverageNote coverage={data.coverage} />
      <p className="text-sm text-[var(--color-dim)]">
        Showing <span className="font-semibold text-slate-900">{matches.length.toLocaleString("en-IN")}</span>{" "}
        {matches.length === 1 ? "programme" : "programmes"}
        {q && <> matching &ldquo;{query}&rdquo;</>}.
      </p>

      {matches.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-6 sm:p-8">
          <h3 className="text-lg font-bold text-[var(--color-navy)]">
            No programme here matches &ldquo;{query}&rdquo;.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)] measure">
            This index only holds programmes we have a verifiable record for, which today means
            mostly Germany. It is not a statement about what you can study. It is a statement
            about what is published as open data. Tell us the subject and destination and a
            counsellor will check the university&rsquo;s own catalogue.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Ask about this subject
            </Link>
            <button type="button" onClick={() => setShown(COURSE_PREVIEW)} className="btn btn-ghost">
              Clear the search
            </button>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial={false}
            animate="show"
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </motion.div>
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setShown((n) => n + 60)}
              className="btn btn-secondary btn-sm"
            >
              Show {Math.min(60, remaining).toLocaleString("en-IN")} more
              {remaining > 60 && <> of {remaining.toLocaleString("en-IN")}</>}
            </button>
          )}
        </>
      )}
    </div>
  );
}

const TABS = [
  { id: "universities", label: "Universities", icon: Building2 },
  { id: "courses", label: "Courses", icon: GraduationCap },
];

export default function UniversityFinder() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("universities");
  const showCourses = tab === "courses";

  // Deep link to a tab, so /university-finder?tab=courses lands on courses
  // rather than on universities with the right tab one click away. The navbar
  // points here for course search. Read after mount rather than during
  // render, because the server has no query string and a mismatch would
  // hydrate wrong.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t && TABS.some((x) => x.id === t)) setTab(t);
  }, []);

  const { epaGroups, gacGroups, epaCount, gacCount, totalCount, expandAll } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (u) => !q || u.university.toLowerCase().includes(q) || u.country.toLowerCase().includes(q);
    const epaFiltered = universitiesData.epa.filter(matches);
    const gacFiltered = universitiesData.gac.filter(matches);
    const total = epaFiltered.length + gacFiltered.length;
    return {
      epaGroups: filter === "gac" ? [] : groupByCountry(epaFiltered),
      gacGroups: filter === "epa" ? [] : groupByCountry(gacFiltered),
      epaCount: epaFiltered.length,
      gacCount: gacFiltered.length,
      totalCount: total,
      // Open every country only when the search has actually narrowed things.
      expandAll: Boolean(q) && total <= SEARCH_EXPAND_LIMIT,
    };
  }, [query, filter]);

  return (
 <section className="bg-white px-6 sec-sm ">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1" role="tablist" aria-label="Search universities or courses">
          {TABS.map((t) => {
            const Icon = t.icon;
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-95"
                style={selected ? { background: DODGER, color: "#fff" } : { color: "#586179" }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 max-w-sm">
          <label htmlFor="university-search" className="sr-only">
            {showCourses ? "Search courses" : "Search universities"}
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dim)]" />
          <input
            id="university-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={showCourses ? "Search a programme, subject or university…" : "Search a university or country…"}
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-[var(--color-dim)] focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": `${DODGER}55` }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[var(--color-dim)] transition-transform hover:text-slate-700 active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" hidden={showCourses}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95"
              style={
                filter === f.id
                  ? { borderColor: DODGER, background: DODGER, color: "#fff" }
                  : { borderColor: "#E2E4E9", color: "#586179" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {showCourses ? (
          <div className="mt-8">
            <CourseResults query={query} active={showCourses} />
          </div>
        ) : (
          <>
        <p className="mt-4 text-sm text-[var(--color-dim)]">
          Showing <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
          {totalCount === 1 ? "university" : "universities"}
          {query && <> matching &ldquo;{query}&rdquo;</>}.
        </p>

        <div className="mt-10 space-y-14">
          {totalCount === 0 && (
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[var(--color-navy)]">
                We could not find &ldquo;{query}&rdquo; in this list.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)] measure">
                This list holds every institution in our {DESTINATION_COUNT} destinations that
                open data records as a currently operating university with its own website. It is
                not the whole world, and a university missing here does not mean we cannot get you
                there. Send us the name and a counsellor will check it against the current intake
                and confirm.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Ask us to check this university
                </Link>
                <Link href="/products" className="btn btn-secondary">
                  See student plans
                </Link>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="btn btn-ghost"
                >
                  Clear the search
                </button>
              </div>
            </div>
          )}
          <CharterSection
            expanded={expandAll}
            icon={Globe2}
            title="Tuition-free & low-fee Europe"
            subtitle="Public universities across Europe, many with little or no tuition for international students."
            groups={epaGroups}
            total={epaCount}
          />
          <CharterSection
            expanded={expandAll}
            icon={Building2}
            title="Global destinations"
            subtitle="Full-fee universities across the UK, US, Canada, Australia and beyond."
            groups={gacGroups}
            total={gacCount}
          />
        </div>
          </>
        )}
      </div>
    </section>
  );
}
