import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * The 404 page.
 *
 * There was no not-found.jsx, so a missing URL fell through to Next's
 * built-in page: unstyled black-on-black against this site's body, with no
 * navigation out of it. A visitor who mistyped a URL, or followed one of the
 * stale links that pointed at routes which no longer exist, hit what looked
 * like a broken site rather than a missing page.
 *
 * This keeps the header and footer, says what happened in one line, and
 * offers the four destinations people are actually looking for.
 */

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const WAYS_OUT = [
  { href: '/products', title: 'Student plans', body: 'Both charters, priced in full.' },
  { href: '/university-finder', title: 'University finder', body: 'Search institutions across 29 destinations.' },
  { href: '/university-finder?tab=courses', title: 'Course finder', body: 'Search accredited programmes by subject.' },
  { href: '/bookings', title: 'Book a free call', body: 'A straight answer on where you stand.' },
];

export default function NotFound() {
  return (
    <section className="sec-lg bg-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <img
          src="/brand/axelis-mark-navy.svg"
          alt="Axelis Overseas"
          width={48}
          height={48}
          className="mx-auto mb-6 h-12 w-auto"
        />
        <p className="label">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl">
          That page is not here.
        </h1>
        <p className="measure mx-auto mt-4 text-[var(--color-dim)]">
          Either the address has a typo in it, or the page moved. Nothing is wrong with
          your connection and nothing is broken on our side.
        </p>

        <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-8 p-0 text-left sm:grid-cols-2">
          {WAYS_OUT.map((w) => (
            <li key={w.href}>
              <span aria-hidden="true" className="block h-0.5 w-8 rounded-full bg-[var(--color-axelis)]" />
              <Link
                href={w.href}
                className="mt-3 inline-flex items-center gap-1.5 font-bold text-[var(--color-navy)] hover:text-[var(--color-axelis)]"
              >
                {w.title}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <p className="mt-1 text-sm text-[var(--color-dim)]">{w.body}</p>
            </li>
          ))}
        </ul>

        <Link href="/" className="btn btn-secondary mt-10">
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
