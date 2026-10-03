import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HINDI_ARTICLES, HINDI_SLUGS, getHindiArticle } from '@/data/hindiAnswers';
import { SITE_URL, ORG_ID } from '@/lib/seo';
import { BOOK_URL } from '@/data/cityPageContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return HINDI_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getHindiArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    alternates: {
      canonical: `/hi/${slug}`,
      // Tell Google these are the Hindi counterparts, not duplicates.
      languages: { 'hi-IN': `/hi/${slug}`, 'en-IN': a.englishHref },
    },
    openGraph: { title: a.title, description: a.dek, url: `${SITE_URL}/hi/${slug}`, type: 'article', locale: 'hi_IN' },
  };
}

export default async function HindiAnswerPage({ params }) {
  const { slug } = await params;
  const a = getHindiArticle(slug);
  if (!a) notFound();
  const url = `${SITE_URL}/hi/${slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.dek,
    url,
    mainEntityOfPage: url,
    datePublished: a.updatedOn,
    dateModified: a.updatedOn,
    inLanguage: 'hi-IN',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'hi-IN',
    mainEntity: a.faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* lang on the content wrapper: the document root is en, and marking the
          Hindi body correctly is what lets a screen reader and a crawler both
          treat this as Hindi rather than mispronounced English. */}
      <div className="bg-white pt-28 pb-16" lang="hi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">होम</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">हिंदी</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">{a.title}</h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">{a.dek}</p>

          {a.sections.map((s) => (
            <section key={s.h2} className="mb-8">
              <h2 className="text-xl font-bold text-[var(--color-navy)] mb-3">{s.h2}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 30)} className="text-slate-700 leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}

          <h2 className="text-xl font-bold text-[var(--color-navy)] mt-12 mb-3">आम सवाल</h2>
          <dl className="mb-10">
            {a.faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <dt className="font-bold text-slate-900 mb-1">{f.q}</dt>
                <dd className="text-slate-700 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-slate-200 pt-8 flex flex-wrap gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">फ्री कॉल बुक कीजिए</a>
            <Link href={a.englishHref} className="btn btn-secondary" lang="en">Read this in English</Link>
          </div>
        </div>
      </div>
    </>
  );
}
