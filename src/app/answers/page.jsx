import Link from 'next/link';
import { ARTICLES, ARTICLE_SLUGS } from '@/data/answers';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'Answers: what studying abroad actually costs',
  description:
    'Straight answers with the numbers attached, on apostille, IELTS coaching, studying without IELTS and the German blocked account.',
  alternates: { canonical: '/answers' },
};

export default function AnswersIndex() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ARTICLE_SLUGS.map((slug, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ARTICLES[slug].title,
      item: `${SITE_URL}/answers/${slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">Answers</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
            Answers, with the numbers attached
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-10">
            Where we charge for something, the price is here. Where another body sets the charge,
            we say who sets it rather than print a figure that will go stale.
          </p>

          <ul className="space-y-6">
            {ARTICLE_SLUGS.map((slug) => (
              <li key={slug} className="border-b border-slate-200 pb-6">
                <h2 className="text-xl font-bold mb-1">
                  <Link href={`/answers/${slug}`} className="text-[var(--color-navy)] underline underline-offset-2">
                    {ARTICLES[slug].title}
                  </Link>
                </h2>
                <p className="text-slate-700 leading-relaxed">{ARTICLES[slug].dek}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
