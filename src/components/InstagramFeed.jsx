'use client';

import React, { useEffect, useState } from 'react';
import { Instagram, Play, ArrowRight } from 'lucide-react';
import { siteInfo } from '../data/siteData';

/**
 * Live Instagram grid.
 *
 * Renders only when /api/instagram actually returns posts. With no token, an
 * expired token, or Meta unreachable, this renders nothing at all and the
 * curated reels above it are untouched. That is deliberate: the token needs
 * refreshing every 60 days, so it WILL lapse, and the failure mode has to be
 * "the section is absent" rather than "the section is empty".
 *
 * It renders nothing on the server too, so a stale cache never ships in the
 * HTML.
 */
export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((d) => { if (alive && d?.ok && Array.isArray(d.posts)) setPosts(d.posts.slice(0, 8)); })
      .catch(() => { /* leaving posts empty is the fallback */ });
    return () => { alive = false; };
  }, []);

  if (!posts.length) return null;

  return (
    <section className="sec-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="label">Latest from Instagram</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
              What we have been posting.
            </h2>
          </div>
          <a
            href={siteInfo?.social?.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Instagram size={16} aria-hidden="true" />
            Follow us
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 list-none p-0 m-0">
          {posts.map((p) => (
            <li key={p.id}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-tint)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.caption || 'Instagram post'}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {p.isVideo && (
                  <span className="absolute top-2 right-2 rounded-full bg-[var(--color-navy)]/80 p-1.5 text-white">
                    <Play size={12} aria-hidden="true" fill="currentColor" />
                  </span>
                )}
                {p.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent p-3 pt-8 text-xs font-medium leading-snug text-white line-clamp-2">
                    {p.caption}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteInfo?.social?.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-axelis)] hover:text-[var(--color-navy)]"
        >
          See everything on Instagram <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
