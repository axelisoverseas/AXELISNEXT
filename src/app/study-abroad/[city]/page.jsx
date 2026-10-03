import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITY_PAGES, CITY_SLUGS, cityBySlug, questionsFor, hasOffice } from '@/data/cityPages';
import { SITE_URL, ORG_ID } from '@/lib/seo';
import { TOTAL_CITIES, smallTownProof } from '@/data/studentOrigins';
import studentsByCity from '@/data/studentsByCity.json';
import { PRODUCTS, COMPARISON, PROOF, BOOK_URL } from '@/data/cityPageContent';
import { SESSIONS } from '@/data/sessions';
import { STUDENT_STORIES, ANJALI_VIDEO } from '@/data/studentStories';
// The same scroll components the homepage uses, so a city page moves the way
// the rest of the site moves rather than inventing a second motion language.
import StoryDeck from '@/components/scroll/StoryDeck';
import VideoPhone from '@/components/scroll/VideoPhone';
import SmoothScrollRoot from '@/components/scroll/SmoothScrollRoot';

// One page per city with enough measured search demand to warrant one.
// Deliberately NOT one page per city in India: see src/data/cityPages.js.
export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c) return {};
  return {
    title: `Study abroad consultant for ${c.city} students: every fee published`,
    description:
      `Axelis counsels ${c.city} students online. Plans from ₹9,999, every fee published ` +
      `before you pay, and recorded counselling sessions you can watch before you book.`,
    alternates: { canonical: `/study-abroad/${c.slug}` },
    openGraph: {
      title: `Study abroad from ${c.city} with Axelis Overseas`,
      description: `Online counselling for ${c.city} students. Every fee published before you pay.`,
      url: `${SITE_URL}/study-abroad/${c.slug}`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c) notFound();

  const url = `${SITE_URL}/study-abroad/${c.slug}`;
  const local = hasOffice(c.city);
  const questions = questionsFor(c);
  // SESSIONS is already consent-gated upstream; these are published episodes.
  const stories = (SESSIONS || []).slice(0, 3);
  // The one fact that is true of THIS city and no other: how many Axelis
  // students actually came from here. Read from Agentcis, not estimated. 40 of
  // the 79 cities have one; the rest fall back to the reach line.
  const ownStudents = studentsByCity[c.city] || 0;

  const faqs = [
    {
      q: `How does counselling work if I am in ${c.city}?`,
      a: local
        ? `You can come to the ${c.city} office, or do it over Google Meet like most students.`
        : `Over Google Meet, end to end: shortlisting, applications, document checks and visa ` +
          `filing. Axelis has offices in Bengaluru and Bilaspur, and students from ` +
          `${TOTAL_CITIES} cities across India have been counselled online without visiting ` +
          `either. You get one named counsellor, not a call centre.`,
    },
    {
      q: `What does Axelis charge a student from ${c.city}?`,
      a: `The same as anywhere else. The Global Admissions Charter is ₹9,999 onboarding for ` +
         `the UK, USA, Canada and Australia. The Europe Public Charter is ₹19,999 plus a ` +
         `₹1,80,000 success fee payable only once an offer is accepted. Test prep starts at ` +
         `₹460 a session, MEA apostille is ₹1,500 a document plus GST.`,
    },
    {
      q: `Can I see what a counselling session is actually like?`,
      a: `Yes. Whole sessions are published, with the student's consent, including the numbers ` +
         `worked through on the call. They are on the sessions page, not edited into clips.`,
    },
    {
      q: `Does Axelis promise admission?`,
      a: `No. What is committed in writing is the fee, and a refundable deposit on both student ` +
         `plans if the offer or visa does not come through.`,
    },
  ];

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Study abroad counselling for ${c.city} students`,
    serviceType: 'Overseas education consultancy',
    provider: { '@id': ORG_ID },
    // areaServed, NOT LocalBusiness: there is no Axelis premises in this city.
    areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: c.state } },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/bookings`,
      availableLanguage: ['en', 'hi'],
    },
    url,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Study abroad by city', item: `${SITE_URL}/study-abroad` },
      { '@type': 'ListItem', position: 3, name: c.city, item: url },
    ],
  };

  return (
    <>
      <SmoothScrollRoot />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/study-abroad" className="hover:text-[var(--color-navy)]">Study abroad by city</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">{c.city}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-5">
            Study abroad from {c.city}
          </h1>

          {/* Reach as a fact. Every city in smallTownProof is a real student
              origin from Agentcis -- see src/data/studentOrigins.js. */}
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-4">
            {local ? (
              <>Axelis has an office in {c.city}. <Link href={`/offices/${c.slug}`} className="underline underline-offset-2">Address and hours</Link>.</>
            ) : (
              <>
                Axelis counsels {c.city} students online, with one counsellor from shortlist to
                arrival. Students from <strong>{TOTAL_CITIES} Indian cities</strong> have gone abroad
                through this process, and most never walked into an office.
              </>
            )}
          </p>

          {ownStudents === 0 && (
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Of the <strong>242 Indian cities</strong> we measured for study-abroad search demand,{' '}
              <strong>{c.city} ranks {c.rank}</strong> on how much people there are actually
              searching. We measured it before writing this page.
            </p>
          )}

          {ownStudents > 0 && (
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              <strong>
                {ownStudents === 1
                  ? `One student from ${c.city} has already gone abroad with Axelis.`
                  : `${ownStudents} students from ${c.city} have already gone abroad with Axelis.`}
              </strong>{' '}
              Counted from our own records, not an estimate.
            </p>
          )}

          {!local && (
            <p className="text-slate-700 leading-relaxed mb-8">
              Not only the metros. Students from <strong>{smallTownProof(c.city).join(', ')}</strong>{' '}
              were counselled the same way. A student in {c.city} gets the same counsellor, the same
              process and the same published fee as one who walks into Bengaluru or Bilaspur.
              Distance changes nothing about the price.
            </p>
          )}

          <div className="flex flex-wrap gap-3 mb-4">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a free call</a>
            <a href="#plans" className="btn btn-secondary">See every price</a>
          </div>

          {/* ---------------- Products, all of them, real payment links ---------------- */}
          <h2 id="plans" className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-2">
            Everything Axelis sells, and what it costs
          </h2>
          <p className="text-slate-700 mb-6">
            Published before you pay. Government, exam and visa charges go straight to those bodies,
            never to Axelis.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-3">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="border border-slate-200 rounded-2xl p-5 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-axelis)]">{p.tag}</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{p.name}</h3>
                <p className="mt-2">
                  <span className="text-3xl font-extrabold text-[var(--color-navy)]">{p.price}</span>{' '}
                  <span className="text-sm text-[var(--color-dim)]">{p.priceNote}</span>
                </p>
                <ul className="list-disc ml-5 text-sm text-slate-700 mt-3 space-y-1 flex-grow">
                  {p.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-sm">Book a free call</a>
                  {p.pay && (
                    <a href={p.pay} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-sm">Pay {p.price}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-dim)] mb-12">Axelis does not promise admission.</p>

          {/* ---------------- Recorded sessions ---------------- */}
          {stories.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-2">
                Watch a real counselling session before you book
              </h2>
              <p className="text-slate-700 mb-6">
                Whole sessions, published with the student&rsquo;s consent, including the numbers
                worked through on the call. Not clips, and not testimonials.
              </p>
              <div className="grid gap-4 sm:grid-cols-3 mb-12">
                {stories.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/sessions/${s.slug}`}
                    className="border border-slate-200 rounded-2xl overflow-hidden hover:border-[var(--color-axelis)] transition-colors"
                  >
                    <img
                      src={`/sessions/${s.slug}/poster.jpg`}
                      alt={`Recorded Axelis counselling session: ${s.title}`}
                      className="w-full h-36 object-cover bg-slate-100"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-axelis)]">{s.destination}</p>
                      <p className="font-bold text-slate-900 text-sm mt-1 leading-snug">{s.title}</p>
                      {s.numbers?.[0] && (
                        <p className="text-sm mt-2">
                          <span className="font-extrabold text-[var(--color-navy)]">{s.numbers[0].value}</span>{' '}
                          <span className="text-[var(--color-dim)]">{s.numbers[0].label}</span>
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* ---- Student photos and a real video, on the site's own scroll kit ---- */}
      {/* Four stories, not ten. StoryDeck pins and reserves perCard x stories of
          scroll runway, so the homepage's ten-card deck would add ~5,000px of
          scrolling to a page that already carries products, sessions, a
          comparison and proof. Four keeps the effect without the slog; the full
          set is one click away on /testimonials. */}
      <StoryDeck
        id={`city-${c.slug}-stories`}
        eyebrow={`Students who did this from ${c.state}, and everywhere else`}
        stories={STUDENT_STORIES.slice(0, 4)}
        perCard={45}
      />

      <VideoPhone
        id={`city-${c.slug}-video`}
        video={ANJALI_VIDEO}
        eyebrow="Filmed after she landed"
      />

      <div className="bg-white pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* ---------------- Comparison: checkable claims, nobody named ---------------- */}
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-2">
            Seven questions worth asking any consultant in {c.city}
          </h2>
          <p className="text-slate-700 mb-5">
            Our answers are below. Take the same list to anyone else you are considering.
          </p>
          <table className="w-full text-sm border-collapse mb-12">
            <tbody>
              {COMPARISON.map((r) => (
                <tr key={r.claim} className="border-b border-slate-200">
                  <td className="py-3 pr-4 text-slate-700 align-top">{r.claim}</td>
                  <td className="py-3 font-bold text-slate-900 align-top">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {questions.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-2">
                What {c.city} students are searching
              </h2>
              <p className="text-slate-700 mb-3">Measured queries for {c.city}, not guesses:</p>
              <ul className="list-disc ml-6 text-slate-700 mb-12">
                {questions.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </>
          )}

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-3">Common questions</h2>
          <dl className="mb-12">
            {faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <dt className="font-bold text-slate-900 mb-1">{f.q}</dt>
                <dd className="text-slate-700 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>

          {/* ---------------- Proof, at the foot ---------------- */}
          <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-2">
            Receipts, signed agreements, a granted visa
          </h2>
          <p className="text-slate-700 mb-5">
            Also on our <Link href="/testimonials" className="underline underline-offset-2">testimonials page</Link>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {PROOF.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                className="w-full h-32 object-cover rounded-xl border border-slate-200 bg-slate-50"
                loading="lazy"
              />
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-wrap gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a free call</a>
            <Link href="/products" className="btn btn-secondary">All student plans</Link>
            <Link href="/study-abroad" className="btn btn-secondary">Other cities</Link>
          </div>
        </div>
      </div>
    </>
  );
}
