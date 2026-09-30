import Link from 'next/link';

// ============================================================================
// ONE markdown renderer for answer copy (FAQ answers, homepage FAQ preview).
// ============================================================================
//
// This replaces two near-identical copies -- src/app/faq/page.jsx and
// src/app/HomeClient.jsx -- which both handled ONLY `**bold**`. Every
// `[label](href)` in src/data/siteData.js therefore printed to the reader as
// literal bracket text: "[Canada scholarships](/blog/canada-scholarships)".
// Seven /blog/* slugs plus /mba-abroad were affected, and none of those routes
// exists, so even the intent behind them was dead.
//
// The two call sites differ only in the colour of bold text, so that is the one
// thing `strongClassName` parameterises. Everything else stays identical, which
// is the point of having a single renderer.
//
// Internal hrefs go through next/link for client-side navigation. External ones
// get rel="noopener noreferrer". mailto: and tel: get neither a new tab nor
// noopener, because opening a mail client in a blank tab leaves a dead tab.
// ============================================================================

const BOLD_OR_LINK = /(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

const LINK_CLASS =
  'underline underline-offset-2 decoration-1 hover:decoration-2 transition-all';

export const renderMarkdown = (text, { strongClassName = 'font-extrabold' } = {}) => {
  if (!text) return null;

  return text.split(BOLD_OR_LINK).map((part, i) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = part.match(LINK);
    if (link) {
      const [, label, href] = link;

      if (href.startsWith('/')) {
        return (
          <Link key={i} href={href} className={LINK_CLASS}>
            {label}
          </Link>
        );
      }

      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return (
          <a key={i} href={href} className={LINK_CLASS}>
            {label}
          </a>
        );
      }

      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      );
    }

    return part;
  });
};

export default renderMarkdown;
