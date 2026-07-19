"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X, Globe2, Building2 } from "lucide-react";
import universitiesData from "@/data/finder-universities.json";
import logoManifest from "@/data/finder-university-logos.json";
import { COUNTRY_FLAG_CODES } from "@/data/finder-country-codes";

// Midnight Dodger palette (ported from the B2B site).
const DODGER = "#3590f3";
const CERULEAN = "#4d7298";

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
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        {logo ? (
          <Image src={logo} alt="" width={32} height={32} unoptimized className="h-8 w-8 object-contain" />
        ) : (
          <span className="text-xs font-bold text-slate-500">{initials(u.university)}</span>
        )}
      </div>
      <p className="min-w-0 truncate text-sm font-semibold text-slate-900" title={u.university}>
        {u.university}
      </p>
    </motion.div>
  );
}

function CountryGroup({ country, universities }) {
  const flagCode = COUNTRY_FLAG_CODES[country];
  return (
    <div>
      <div className="flex items-center gap-2">
        {flagCode && (
          <Image src={`/flags/${flagCode}.svg`} alt="" width={20} height={15} className="h-3.5 w-5 rounded-sm object-cover" />
        )}
        <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: DODGER }}>
          {country}
          <span className="ml-2 font-normal normal-case text-slate-500">({universities.length})</span>
        </h3>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {universities.map((u) => (
          <UniversityCard key={u.id} u={u} />
        ))}
      </motion.div>
    </div>
  );
}

function CharterSection({ icon: Icon, title, subtitle, groups, total }) {
  if (groups.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Icon className="h-5 w-5" style={{ color: DODGER }} />
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{total}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      <div className="mt-6 space-y-8">
        {groups.map(([country, universities]) => (
          <CountryGroup key={country} country={country} universities={universities} />
        ))}
      </div>
    </div>
  );
}

export default function UniversityFinder() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { epaGroups, gacGroups, epaCount, gacCount, totalCount } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (u) => !q || u.university.toLowerCase().includes(q) || u.country.toLowerCase().includes(q);
    const epaFiltered = universitiesData.epa.filter(matches);
    const gacFiltered = universitiesData.gac.filter(matches);
    return {
      epaGroups: filter === "gac" ? [] : groupByCountry(epaFiltered),
      gacGroups: filter === "epa" ? [] : groupByCountry(gacFiltered),
      epaCount: epaFiltered.length,
      gacCount: gacFiltered.length,
      totalCount: epaFiltered.length + gacFiltered.length,
    };
  }, [query, filter]);

  return (
    <section className="bg-white px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative max-w-sm">
          <label htmlFor="university-search" className="sr-only">Search universities</label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="university-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a university or country…"
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": `${DODGER}55` }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-slate-500 transition-transform hover:text-slate-700 active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95"
              style={
                filter === f.id
                  ? { borderColor: DODGER, background: DODGER, color: "#fff" }
                  : { borderColor: "#e2e8f0", color: "#475569" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
          {totalCount === 1 ? "university" : "universities"}
          {query && <> matching &ldquo;{query}&rdquo;</>}.
        </p>

        <div className="mt-10 space-y-14">
          {totalCount === 0 && (
            <p className="text-sm text-slate-500">
              No universities match &ldquo;{query}&rdquo;. Try a different spelling, or{" "}
              <button onClick={() => setQuery("")} className="font-medium underline" style={{ color: CERULEAN }}>
                clear the search
              </button>
              .
            </p>
          )}
          <CharterSection
            icon={Globe2}
            title="Tuition-free & low-fee Europe"
            subtitle="Public universities across Europe, many with little or no tuition for international students."
            groups={epaGroups}
            total={epaCount}
          />
          <CharterSection
            icon={Building2}
            title="Global destinations"
            subtitle="Full-fee universities across the UK, US, Canada, Australia and beyond."
            groups={gacGroups}
            total={gacCount}
          />
        </div>
      </div>
    </section>
  );
}
