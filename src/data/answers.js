// ============================================================================
// ANSWER PAGES. Built against measured demand, answered with published numbers.
// ============================================================================
//
// Why these four and not a blog. Expanding the site's own services through
// Google autocomplete returned 1,200 real phrases (see ~/Axelis/aeo-tracker/
// site_keywords.csv). 39% of them are cost questions -- the largest single
// block -- and Axelis's one genuine differentiator is publishing its fees. The
// four topics below are where measured demand and a published number meet:
//
//   blocked account    32 phrases
//   MEA apostille      26 phrases   Axelis publishes Rs 1,500/document
//   IELTS fees         23 phrases   Axelis publishes from Rs 460/session
//   without IELTS      12 phrases   Axelis sells language training to B2
//
// IELTS matters beyond its phrase count: across the 161 Indian cities measured
// for search demand, 89% have IELTS in their top phrases. It is the entry query
// for the whole funnel and the site currently ranks for none of it.
//
// THE RULE FOR EVERY NUMBER ON THESE PAGES:
// Axelis's own prices come from public/llms.txt and /products, and are stated
// plainly. Third-party amounts -- the German blocked account minimum, the MEA's
// own fee, the IELTS test fee -- are NOT stated, because they are set by other
// bodies, change without notice, and a stale number on a page that sells
// transparency is worse than no number. Each page says who sets it and tells
// the reader to check at source. That is also the honest answer.
// ============================================================================

export const ARTICLES = {
  'mea-apostille-cost': {
    title: 'What MEA apostille actually costs, per document',
    dek: 'Axelis charges ₹1,500 a document plus GST. Here is what that covers, what it does not, and the order the steps have to happen in.',
    updatedOn: '2026-10-03',
    question: 'How much does MEA apostille cost per document in India?',
    sections: [
      { h2: 'The Axelis fee', body: [
        'MEA apostille through Axelis is ₹1,500 per document plus GST. That is published on the services page and does not change by city or by how many documents you send.',
        'It covers the sequencing and submission. It does not cover the government charges, which are paid to those bodies directly. Axelis takes no margin on them.',
      ]},
      { h2: 'The order matters more than the price', body: [
        'Apostille is not one step. A document is notarised, then authenticated by the state (the Home Department or HRD, depending on the document), then apostilled by the Ministry of External Affairs.',
        'Skipping or reordering those is the usual reason a file comes back. A degree certificate authenticated by the wrong state department has to start again.',
      ]},
      { h2: 'What is outside anyone’s control', body: [
        'The MEA’s own charge and its turnaround are set by the ministry and change without notice. We do not publish a figure for them here, because a stale number on a page about transparent pricing would be worth less than nothing. Check the MEA at source, or ask us and we will tell you what it is on the day.',
      ]},
    ],
    faqs: [
      { q: 'Is ₹1,500 per document or per set?', a: 'Per document, plus GST. Three documents is three times the fee.' },
      { q: 'Does Axelis mark up the government charges?', a: 'No. Government, apostille, exam and visa charges are paid to those bodies directly and Axelis takes no margin on them.' },
      { q: 'Can I do it myself?', a: 'Yes. The sequence is public. People use us for the sequencing and the resubmissions, not because the route is secret.' },
    ],
  },

  'ielts-coaching-fees': {
    title: 'What IELTS coaching costs, and when you do not need it',
    dek: 'Axelis charges from ₹460 a session, one-to-one, booked singly rather than as a package. The honest part is that some people do not need coaching at all.',
    updatedOn: '2026-10-03',
    question: 'How much does IELTS coaching cost in India?',
    sections: [
      { h2: 'The Axelis fee', body: [
        'One-to-one coaching from ₹460 a session, for IELTS, TOEFL, PTE, SAT and the Duolingo English Test. Sessions are bought one at a time, so you are not committed to a package before you know whether you need one.',
        'Coaching is online, which is why the price is the same whether you are in Bengaluru or a town with no test centre.',
      ]},
      { h2: 'The test fee is not ours', body: [
        'The IELTS test fee is set by IDP and the British Council, not by Axelis, and it moves. We do not quote it here for the same reason we do not quote the MEA’s charge: a number that goes stale on a page about published pricing does real damage. Book the test at source and you will see the current fee.',
      ]},
      { h2: 'When coaching is not the answer', body: [
        'If you are already at the band your course asks for, coaching is money spent on a score you have. Sit a free practice test first and find out.',
        'If you are two bands short, coaching is the cheapest part of the gap, and the sessions are where that gets closed.',
      ]},
    ],
    faqs: [
      { q: 'Is ₹460 the whole cost?', a: 'It is the per-session fee, bought one session at a time. How many you need depends on the gap between your practice score and your target.' },
      { q: 'Does Axelis run group batches?', a: 'Coaching is one-to-one. That is what the per-session price buys.' },
      { q: 'Do I have to buy a package?', a: 'No. Sessions are booked singly.' },
    ],
  },

  'study-abroad-without-ielts': {
    title: 'Studying abroad without IELTS: what is real and what is not',
    dek: 'Some universities waive it. Some countries do not accept a waiver for the visa even when the university does. The difference is where people get caught.',
    updatedOn: '2026-10-03',
    question: 'Can I study abroad without IELTS?',
    sections: [
      { h2: 'Two different gates', body: [
        'A university admission and a student visa are decided by different bodies against different rules. A university may accept your medium-of-instruction letter. The embassy may still want a test score.',
        'Being admitted without IELTS and then refused a visa for the same reason is a common and avoidable way to lose an intake.',
      ]},
      { h2: 'What usually substitutes', body: [
        'A medium-of-instruction certificate from your university, a qualifying score in another accepted test, or in some European routes a language qualification in the local language instead of English.',
        'Which of those a given university accepts is specific to that university and that intake, so it is checked per application rather than assumed.',
      ]},
      { h2: 'The route Axelis sells here', body: [
        'German or French from A1 to B2 is ₹1,80,000, and that is published. For the tuition-free European public universities it is often the language qualification, not an English test, that opens the route.',
        'dMAT preparation for APS is ₹25,000, and University Application Craft is ₹42,000. All three are priced on the site before you talk to anyone.',
      ]},
    ],
    faqs: [
      { q: 'Does Axelis promise admission without IELTS?', a: 'No. Axelis does not promise admission at all. What is published is the fee.' },
      { q: 'Is a medium-of-instruction letter enough?', a: 'Sometimes for the university, often not for the visa. The two are decided separately and both have to be satisfied.' },
      { q: 'Which countries are easiest without IELTS?', a: 'There is no general answer worth giving. It is decided per university and per intake, which is why we check it per application.' },
    ],
  },

  'germany-blocked-account': {
    title: 'The German blocked account, and where it sits in the cost',
    dek: 'It is a visa requirement, not a fee anyone charges you. It is your own money, held. That distinction changes how you should budget for it.',
    updatedOn: '2026-10-03',
    question: 'What is the blocked account for a German student visa?',
    sections: [
      { h2: 'It is not a cost, it is a deposit', body: [
        'A blocked account holds your own money to prove you can support yourself for a year. You get it back, drawn down monthly once you are in Germany. Budgeting for it as a fee overstates what studying in Germany costs by a large margin.',
        'What you do lose is access to it while it sits there, plus the provider’s own charges.',
      ]},
      { h2: 'The amount is set by the German government', body: [
        'The minimum is fixed by German authorities and is revised, usually annually. We deliberately do not print a figure here: a stale blocked-account number is the single most repeated error on Indian study-abroad sites, and this one exists to be accurate rather than to rank for a number we would forget to update.',
        'Ask us and you will get the current figure, or check the German mission’s own page.',
      ]},
      { h2: 'Where Axelis fits', body: [
        'The Europe Public Charter is ₹19,999 plus a ₹1,80,000 success fee payable only once an offer is accepted. Blocked account, APS and uni-assist are handled inside it.',
        'The blocked account money itself never passes through Axelis. It goes to the provider you choose and comes back to you.',
      ]},
    ],
    faqs: [
      { q: 'Does Axelis take a cut of the blocked account?', a: 'No. It is your money, held by a provider you choose, and Axelis takes no margin on it.' },
      { q: 'Do I get the money back?', a: 'Yes, drawn down monthly once you are in Germany. It is a deposit, not a fee.' },
      { q: 'How much is it?', a: 'Set by the German government and revised periodically. We will tell you the current figure rather than publish one that goes stale.' },
    ],
  },
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);
export const getArticle = (slug) => ARTICLES[slug] || null;
