'use client';

import React, { useMemo, useState } from 'react';
import { Search, GraduationCap, Globe2, X, Award, ArrowRight, ExternalLink } from 'lucide-react';
import {
  scholarships,
  SCHOLARSHIP_COUNTRIES,
  SCHOLARSHIP_LEVELS,
  SCHOLARSHIP_TYPES,
} from '../data/scholarshipData';
import { BorderBeam } from './ui/BorderBeam';
import { TextEffectInView } from './ui/TextEffect';

const PLAN_OPTIONS = [
  { value: 'ALL', label: 'All plans' },
  { value: 'ZTF', label: 'ZTF — Zero Tuition Fee' },
  { value: 'ZCF', label: 'ZCF — Zero Consultation Fee' },
];

export default function ScholarshipFinder() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('ALL');
  const [level, setLevel] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [plan, setPlan] = useState('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scholarships.filter((s) => {
      if (country !== 'ALL' && s.country !== country) return false;
      if (level !== 'ALL' && !s.level.includes(level)) return false;
      if (type !== 'ALL' && s.type !== type) return false;
      if (plan !== 'ALL' && !s.plan.includes(plan)) return false;
      if (!q) return true;
      const hay = `${s.name} ${s.summary} ${s.country} ${s.type} ${s.level.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, country, level, type, plan]);

  const clearAll = () => {
    setQuery('');
    setCountry('ALL');
    setLevel('ALL');
    setType('ALL');
    setPlan('ALL');
  };

  const countryLookup = useMemo(
    () => Object.fromEntries(SCHOLARSHIP_COUNTRIES.map((c) => [c.code, c])),
    []
  );

  const activeFilters = [
    country !== 'ALL' && { label: countryLookup[country]?.name, reset: () => setCountry('ALL') },
    level !== 'ALL' && { label: level, reset: () => setLevel('ALL') },
    type !== 'ALL' && { label: type, reset: () => setType('ALL') },
    plan !== 'ALL' && { label: plan, reset: () => setPlan('ALL') },
    query && { label: `"${query}"`, reset: () => setQuery('') },
  ].filter(Boolean);

  return (
    <section id="finder" className="py-20 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-4">
            <Award size={16} /> Scholarship Finder
          </div>
          <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Find scholarships across all 29 countries we cover
          </TextEffectInView>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Filter by destination, study level, plan (ZTF / ZCF) or scholarship type.
            Every listing here is applicable to Indian students going abroad — public or private universities.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-5 lg:col-span-2 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, keyword, or country"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All countries</option>
              {SCHOLARSHIP_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All levels</option>
              {SCHOLARSHIP_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All types</option>
              {SCHOLARSHIP_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {PLAN_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPlan(p.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  plan === p.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {p.label}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={clearAll}
                className="ml-auto px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <X size={14} /> Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between my-6 px-1">
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">{filtered.length}</span> scholarship{filtered.length === 1 ? '' : 's'} found
          </p>
          <p className="hidden sm:block text-xs text-slate-500">
            Every scholarship is covered by our ZCF plan; ZTF plans unlock public-university tracks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const c = countryLookup[s.country];
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400/60 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-lg">{c?.flag}</span>
                    <span>{c?.name}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {s.plan.map((p) => (
                      <span
                        key={p}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                          p === 'ZTF'
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-[15px] leading-snug group-hover:text-blue-700 transition-colors flex items-start gap-1.5">
                  <span>{s.name}</span>
                  <ExternalLink size={13} className="shrink-0 mt-1 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3 min-h-[36px]">{s.summary}</p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider mt-auto">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    <GraduationCap size={12} /> {s.level.join(' / ')}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {s.type}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                    {s.amount}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            <Globe2 size={28} className="mx-auto mb-3 text-slate-400" />
            No scholarships match these filters. Try loosening a filter or <button onClick={clearAll} className="text-blue-600 font-semibold hover:underline">reset all</button>.
          </div>
        )}

        <div className="mt-12 bg-slate-900 rounded-3xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Not sure which scholarship fits your profile?</h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm">
            Our counsellors map scholarships against your academic profile, destination, and plan — free under ZCF and ZTF.
          </p>
          <a
            href="/bookings"
            className="relative overflow-hidden inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            <span className="relative z-10 inline-flex items-center">
              Book a free counselling call <ArrowRight size={16} className="ml-2" />
            </span>
            <BorderBeam size={120} duration={8} colorFrom="#ffffff" colorTo="#22d3ee" />
          </a>
        </div>
      </div>
    </section>
  );
}
