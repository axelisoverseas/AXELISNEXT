'use client';

import React, { useEffect, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { siteInfo } from '../data/siteData';

/**
 * The latest videos from the Axelis channel.
 *
 * This replaces a stock photograph of a stranger at a microphone that sat
 * where the actual episodes should have been. The channel publishes real
 * counselling sessions; showing three of them is both more honest and more
 * persuasive than a picture of podcasting.
 *
 * /api/youtube-videos resolves the channel id and reads the public RSS feed,
 * cached for an hour, so this needs no key and nothing to expire. If the feed
 * is unreachable the section renders a plain link to the channel rather than
 * an empty shell — the same rule as everywhere else on this site: a failure
 * should read as "absent", never as "broken".
 */
export default function YouTubeFeed({ limit = 3 }) {
  const [videos, setVideos] = useState([]);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/youtube-videos')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (Array.isArray(d?.videos)) setVideos(d.videos.slice(0, limit));
      })
      .catch(() => { /* fall through to the link-only state */ })
      .finally(() => { if (alive) setSettled(true); });
    return () => { alive = false; };
  }, [limit]);

  const channel = siteInfo?.social?.youtube || 'https://www.youtube.com/@axelisoverseas';

  return (
    <section className="sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="label">From the channel</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
              Real counselling sessions, published in full.
            </h2>
            <p className="mt-3 text-[var(--color-dim)] measure">
              Not edited highlights. Whole conversations with real students, including the
              ones where the answer is that a plan will not work.
            </p>
          </div>
          <a href={channel} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Play size={16} aria-hidden="true" />
            Visit the channel
          </a>
        </div>

        {videos.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {videos.map((v) => (
              <li key={v.id}>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-white overflow-hidden shadow-e-2 transition-shadow hover:shadow-e-3"
                >
                  <span className="relative block aspect-video overflow-hidden bg-[var(--color-tint)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.thumbnailHigh || v.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy)]/85 text-white">
                        <Play size={18} aria-hidden="true" fill="currentColor" />
                      </span>
                    </span>
                  </span>
                  <span className="block p-4">
                    <span className="block text-sm font-bold leading-snug text-[var(--color-navy)] line-clamp-2">
                      {v.title}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          settled && (
            <a
              href={channel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-axelis)] hover:text-[var(--color-navy)]"
            >
              Watch the sessions on YouTube <ArrowRight size={15} aria-hidden="true" />
            </a>
          )
        )}
      </div>
    </section>
  );
}
