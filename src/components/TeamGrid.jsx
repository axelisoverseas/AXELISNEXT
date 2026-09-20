'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';

/**
 * The team, as a grid.
 *
 * This replaces a rotating 3D carousel that stacked the cards on top of one
 * another: names and descriptions from one card printed over the next, so at
 * rest most of the team was unreadable. A carousel also hides most of a small
 * team behind an interaction for no gain — there are five people; they fit on
 * the page.
 *
 * Cards are a uniform height so the row lines up, and the photo, name, role
 * and link sit in the same place on each one.
 */
export default function TeamGrid({ teamMembers = [] }) {
  if (!teamMembers.length) return null;

  return (
    <section className="sec relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="label">The people on your file</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mt-2">
            One counsellor, start to finish.
          </h2>
          <p className="mt-3 text-[var(--color-dim)] measure mx-auto">
            You are not handed between desks. The person who shortlists with you is the
            person who sees your visa through.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {teamMembers.map((m) => (
            <li
              key={m.id ?? m.name}
              className="glass-storm p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-1 ring-[var(--color-rule)] shrink-0">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center bg-[var(--color-tint)] text-[var(--color-axelis)] font-bold text-xl"
                  >
                    {m.name?.charAt(0)}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-bold text-[var(--color-navy)] leading-tight">
                {m.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[var(--color-axelis)]">{m.role}</p>

              {m.description && (
                <p className="mt-3 text-sm text-[var(--color-dim)] leading-relaxed">
                  {m.description}
                </p>
              )}

              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-rule)] text-[var(--color-axelis)] transition-colors hover:bg-[var(--color-tint)] hover:border-[var(--color-dim)]"
                >
                  <Linkedin size={16} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
