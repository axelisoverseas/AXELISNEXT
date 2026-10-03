import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, ARTICLE_SLUGS, getArticle } from '@/data/answers';
import { SITE_URL, ORG_ID } from '@/lib/seo';
import { BOOK_URL } from '@/data/cityPageContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/answers/${slug}` },
    openGraph: { title: a.title, description: a.dek, url: `${SITE_URL}/answers/${slug}`, type: 'article' },
  };
}

export default async function AnswerPage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const url = `${SITE_URL}/answers/${slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.dek,
    url,
    mainEntityOfPage: url,
    datePublished: a.updatedOn,
    dateModified: a.updatedOn,
    inLanguage: 'en-IN',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Answers', item: `${SITE_URL}/answers` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/answers" className="hover:text-[var(--color-navy)]">Answers</Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">{a.title}</h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">{a.dek}</p>

          {a.sections.map((s) => (
            <section key={s.h2} className="mb-8">
              <h2 className="text-xl font-bold text-[var(--color-navy)] mb-3">{s.h2}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="text-slate-700 leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}

          <h2 className="text-xl font-bold text-[var(--color-navy)] mt-12 mb-3">Common questions</h2>
          <dl className="mb-10">
            {a.faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <dt className="font-bold text-slate-900 mb-1">{f.q}</dt>
                <dd className="text-slate-700 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>

          <p className="text-sm text-[var(--color-dim)] mb-8">Last checked {a.updatedOn}. Axelis does not promise admission.</p>

          <div className="border-t border-slate-200 pt-8 flex flex-wrap gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a free call</a>
            <Link href="/answers" className="btn btn-secondary">More answers</Link>
            <Link href="/products" className="btn btn-secondary">All student plans</Link>
          </div>
        </div>
      </div>
    </>
  );
}
