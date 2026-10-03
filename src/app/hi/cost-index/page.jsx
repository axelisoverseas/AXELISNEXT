import Link from 'next/link';
import { SITE_URL, ORG_ID } from '@/lib/seo';
import { UG_ROWS, PG_ROWS, COST_AS_OF, lakh, byNet } from '@/lib/costIndex';
import { BOOK_URL } from '@/data/cityPageContent';

// ============================================================================
// THE COST INDEX, IN HINDI
// ============================================================================
// "germany me padhai ka kharcha" is a live suggested query, and the English
// cost index cannot answer a question asked in Hindi. Same data, same honesty
// rules as /cost-index: gross, assumed earnings and net all shown, public and
// private as separate rows, no ranking claim. The register is the Hinglish a
// student actually types, not a Sanskritised rendering nobody searches for.
//
// Entry-bar and post-study columns stay in English: they quote university and
// visa terms, and the documents a student will actually receive use them.
// ============================================================================

const TITLE = 'विदेश में पढ़ाई का खर्च: हर देश की पूरी कीमत, एक टेबल में';
const DEK =
  'हर देश का पूरा खर्च रुपये में — ट्यूशन, रहना-खाना, सब जोड़कर — बैचलर्स और मास्टर्स दोनों के लिए। ' +
  'पार्ट-टाइम कमाई अलग कॉलम में है, चुपचाप घटाई नहीं गई, ताकि असली खर्च छुपे नहीं।';

export const metadata = {
  title: TITLE,
  description: DEK,
  alternates: {
    canonical: '/hi/cost-index',
    languages: { 'hi-IN': '/hi/cost-index', 'en-IN': '/cost-index' },
  },
  openGraph: {
    title: TITLE,
    description: DEK,
    url: `${SITE_URL}/hi/cost-index`,
    type: 'article',
    locale: 'hi_IN',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const Table = ({ caption, rows, id }) => (
  <div className="overflow-x-auto rounded-2xl border border-[var(--color-rule)]">
    <table className="w-full text-sm min-w-[46rem]">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-[var(--color-tint)] text-left text-[var(--color-navy)]">
        <tr>
          <th scope="col" className="px-4 py-3 font-bold">देश</th>
          <th scope="col" className="px-4 py-3 font-bold">कोर्स की लंबाई</th>
          <th scope="col" className="px-4 py-3 font-bold">कोर्स + रहना-खाना</th>
          <th scope="col" className="px-4 py-3 font-bold">पार्ट-टाइम कमाई घटाकर</th>
          <th scope="col" className="px-4 py-3 font-bold">नेट खर्च</th>
          <th scope="col" className="px-4 py-3 font-bold" lang="en">Entry bar</th>
          <th scope="col" className="px-4 py-3 font-bold" lang="en">Post-study stay</th>
        </tr>
      </thead>
      <tbody>
        {byNet(rows).map((r) => (
          <tr key={`${id}-${r.country}`} className="border-t border-[var(--color-rule)] align-top">
            <th scope="row" className="px-4 py-3 text-left font-bold text-[var(--color-navy)]" lang="en">
              {r.country}
            </th>
            <td className="px-4 py-3 whitespace-nowrap" lang="en">{r.duration}</td>
            <td className="px-4 py-3 whitespace-nowrap font-semibold">{lakh(r.cost_l)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-[var(--color-dim)]">
              &minus; {lakh(r.earnings_l)}
              <span className="block text-xs">{r.hours}/हफ़्ता पर</span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap font-bold text-[var(--color-navy)]">{lakh(r.net_l)}</td>
            <td className="px-4 py-3" lang="en">{r.requirements}</td>
            <td className="px-4 py-3" lang="en">{r.opt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function HindiCostIndexPage() {
  const url = `${SITE_URL}/hi/cost-index`;

  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Axelis Cost Index (हिंदी)',
    description: DEK,
    url,
    inLanguage: 'hi-IN',
    dateModified: COST_AS_OF,
    temporalCoverage: COST_AS_OF,
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isBasedOn: `${SITE_URL}/cost-index`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />

      <div className="bg-white pt-28 pb-16" lang="hi">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">होम</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">विदेश में पढ़ाई का खर्च</span>
          </nav>

          <header className="mb-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-[var(--color-navy)] mb-5 tracking-tight">
              विदेश में पढ़ाई का असली खर्च
            </h1>
            <p className="text-xl text-[var(--color-dim)] leading-relaxed mb-5">{DEK}</p>
            <p className="text-sm text-[var(--color-dim)]">
              कीमतें 20 जुलाई 2026 की हैं। ये अंदाज़े के आंकड़े हैं — एक्सचेंज रेट और फीस के साथ
              बदलते रहते हैं — कोटेशन नहीं हैं।
            </p>
          </header>

          <div className="rounded-2xl bg-[var(--color-tint)] border border-[var(--color-rule)] p-6 mb-12 max-w-3xl">
            <h2 className="text-lg font-bold text-[var(--color-navy)] mb-2">नेट वाला कॉलम ध्यान से पढ़िए</h2>
            <p className="text-[var(--foreground)] leading-relaxed">
              नेट वह रकम है जो वीज़ा के हिसाब से मिलने वाले पार्ट-टाइम काम की कमाई घटाने के बाद बचती
              है। यह छोटा और अच्छा दिखने वाला नंबर है, और इसी पर शक करना चाहिए: यह मान कर चलता है कि
              काम मिलेगा, पूरे कोर्स तक चलेगा, और पढ़ाई के साथ-साथ हो भी पाएगा। कमाई की कोई गारंटी
              नहीं है। बजट &ldquo;कोर्स + रहना-खाना&rdquo; वाले कॉलम से बनाइए — लोन देने वाला बैंक भी
              वही देखता है।
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4" id="masters">
            मास्टर्स (PG) — सबसे कम नेट खर्च पहले
          </h2>
          <Table id="pg" rows={PG_ROWS} caption="भारतीय छात्रों के लिए विदेश में मास्टर्स का खर्च, रुपयों में" />

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-4" id="bachelors">
            बैचलर्स (UG) — सबसे कम नेट खर्च पहले
          </h2>
          <Table id="ug" rows={UG_ROWS} caption="भारतीय छात्रों के लिए विदेश में बैचलर्स का खर्च, रुपयों में" />

          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-3">ये नंबर कहाँ से आए</h2>
            <p className="text-[var(--foreground)] leading-relaxed mb-3">
              ट्यूशन और रहने का खर्च, कोर्स की लंबाई से गुणा करके। जहाँ सरकारी (public) और प्राइवेट
              की कीमत अलग है, वहाँ दोनों की अलग लाइन है — दोनों का औसत किसी के भी काम का नंबर नहीं
              होता। एडमिशन और वीज़ा की शर्तें English में हैं, क्योंकि यूनिवर्सिटी से जो डॉक्यूमेंट
              आएंगे, वे उसी में होंगे।
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              सरकारी, एग्ज़ाम और वीज़ा के चार्ज वे संस्थाएँ तय करती हैं, Axelis नहीं — और उन पर हम
              कोई मार्जिन नहीं लेते। हमारी अपनी फीस{' '}
              <Link href="/products" className="text-[var(--color-axelis)] hover:underline">प्लान्स पेज</Link>{' '}
              पर पहले से छपी है, पेमेंट से पहले।
            </p>
          </section>

          <aside className="mt-12 rounded-2xl bg-[var(--color-navy)] p-8 text-white max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">अपनी प्रोफ़ाइल पर यही हिसाब चाहिए?</h2>
            <p className="text-[var(--color-dim-dark)] mb-6">
              काउंसलर आपके मार्क्स, बजट और टेस्ट स्कोर देखकर बताएगा कि इनमें से कौन से देश आपके लिए
              सच में मुमकिन हैं — और कौन से नहीं, वह भी साफ़-साफ़।
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[var(--color-navy)] font-bold py-3 px-5 rounded-xl hover:bg-[var(--color-tint)]">
                फ्री कॉल बुक कीजिए
              </a>
              <Link href="/cost-index" className="inline-block border border-[var(--dark-rule)] text-white font-bold py-3 px-5 rounded-xl hover:bg-[var(--dark-surface)]" lang="en">
                Read this in English
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
