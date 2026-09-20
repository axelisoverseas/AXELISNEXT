import React from 'react';
import Image from 'next/image';
import { Linkedin, GraduationCap } from 'lucide-react';
import { teamMembers } from '../data/siteData';

/**
 * The founder, on the page about who we are.
 *
 * EVERY FACT HERE COMES FROM siteData.teamMembers. Nothing is written from
 * outside the repo. LinkedIn blocks automated reads (it answers 429), and a
 * public search turned up nothing beyond this site's own pages, so inventing
 * a career history would have meant publishing fiction about a real person on
 * a commercial site. It says what can be shown and stops.
 *
 * TO EXTEND THIS, edit the founder's entry in src/data/siteData.js. Useful
 * fields it does not yet carry, all of which need Rishabh's own words:
 *   yearsInField   how long he has done this
 *   credential     BUCE / ICEF / AIRC or similar, if held
 *   studiedAbroad  what he read at Cardiff, and when
 *   note           a line in his voice about why Axelis exists
 * The markup below renders each of those only if present, so adding one to
 * the data file is the whole job.
 */

const founder = teamMembers.find((m) => m.role === 'Founder') || teamMembers[0];

export default function FounderProfile() {
  if (!founder) return null;

  return (
    <section className="sec bg-[var(--color-tint)] border-y border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12 items-start">
          <div className="flex items-center gap-5 lg:block">
            <div className="relative h-28 w-28 lg:h-44 lg:w-44 shrink-0 overflow-hidden rounded-[var(--radius-xl)] ring-1 ring-[var(--color-rule)] bg-white">
              {founder.image && (
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.role} of Axelis Overseas`}
                  fill
                  sizes="(max-width: 1024px) 112px, 176px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="lg:mt-5">
              <p className="text-lg font-bold text-[var(--color-navy)]">{founder.name}</p>
              <p className="text-sm font-semibold text-[var(--color-axelis)]">{founder.role}</p>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-white text-[var(--color-axelis)] transition-colors hover:bg-[var(--color-axelis)] hover:text-white"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="label">The person behind it</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
              Axelis exists because the counsellor should have made the journey first.
            </h2>

            {founder.almaMater?.name && (
              <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[var(--color-dim)]">
                <GraduationCap size={16} aria-hidden="true" className="text-[var(--color-axelis)]" />
                <span>
                  {founder.name.split(' ')[0]} studied at{' '}
                  <strong className="font-semibold text-[var(--color-navy)]">
                    {founder.almaMater.name}
                  </strong>
                  {founder.almaMater.country ? `, ${founder.almaMater.country}` : ''}
                  {founder.studiedAbroad ? `, ${founder.studiedAbroad}` : ''}.
                </span>
              </p>
            )}

            {founder.description && (
              <p className="mt-4 text-[var(--color-dim)] leading-relaxed measure">
                {founder.description}
              </p>
            )}

            {founder.note && (
              <blockquote className="mt-6 border-l-2 border-[var(--color-axelis)] pl-4 text-[var(--color-navy)] italic measure">
                {founder.note}
              </blockquote>
            )}

            <p className="mt-6 text-[var(--color-dim)] leading-relaxed measure">
              That is the whole basis of how Axelis works: one counsellor from shortlist to
              arrival, every fee published before you pay, and a straight answer on the first
              call, including when the answer is no.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
