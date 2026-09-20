/**
 * Landing page content, one entry per headline.
 *
 * VOICE
 * Written in the register Ambitio uses across ambitio.club: second person
 * throughout, short declaratives, a sharp problem statement before the offer,
 * outcome-led section headings, and an aspirational CTA rather than a
 * navigational one ("Get your dream admit", not "See our plans").
 *
 * Two of their moves are deliberately NOT copied:
 *
 *   "No Partner Colleges. No Hidden Agendas... not commissions."
 *   Their central differentiator is that they take no university commission.
 *   Axelis does, through the GAC arrangements, and the FAQ on this site says
 *   so plainly. Running their line here would contradict our own FAQ. The
 *   rhetorical shape is kept and filled with something true instead.
 *
 *   The before/after admit-rate table (3.7% to 22.2% and so on).
 *   We have no equivalent measurement, so there is nothing to put in it.
 *
 * Everything else follows their construction. Where this conflicts with the
 * no-slop pass, which bans binary contrasts and negative listing, the
 * competitor register wins, because that was the later instruction.
 *
 * Claims are the ones already published elsewhere on this site. No figure
 * appears here that is not already on /products, the homepage or the FAQ.
 */

export const LANDING_PAGES = {
  'tuition-free-europe': {
    slug: 'tuition-free-europe',
    source: 'lp-tuition-free-europe',
    label: 'Europe Public Charter',
    h1: 'Study in Europe tuition-free, and save up to ₹80 lakh.',
    sub:
      'Most Indian students never look at Europe, because nobody told them the tuition is zero. Axelis places you at public universities that charge international students nothing, on the same terms as their own.',
    primaryCta: { label: 'Get your tuition-free shortlist', href: '/products' },
    secondaryCta: { label: 'Talk to us', href: '/bookings' },
    proofHeading: 'What is in it for you',
    proof: [
      { title: 'Zero tuition, not a scholarship', body: 'You are not competing for a discount. Public universities across much of Europe charge no tuition at all. That is how the system is funded.' },
      { title: '€150 to €350 a semester', body: 'Your only university charge. It covers student services and usually a local transport pass.' },
      { title: 'Taught in English', body: 'English-taught bachelor’s and master’s programmes are widely available. You do not need German to be admitted.' },
      { title: 'Work while you study', body: 'Germany allows 120 full days or 240 half days a year, and no limit at all on research or teaching assistantships.' },
    ],
    bodyHeading: 'Why Axelis',
    body: [
      'Students do not miss tuition-free Europe because they were not good enough. They miss it because the agency they walked into earns nothing when you pay no tuition.',
      'That is the whole reason this route stays invisible. An agency paid a percentage of your fees has no reason to show you a university that charges none, so you are steered toward the destinations that pay best and told Europe is complicated.',
      'Axelis runs the Europe Public Charter as its own plan precisely because it needs to exist separately from the commission model. Your counsellor is measured on getting you in, not on what your tuition bill comes to.',
    ],
    faqs: [
      { q: 'Is it genuinely free, or are there hidden fees?', a: 'Tuition is genuinely zero at public universities. You pay a semester contribution of €150 to €350, living costs of roughly €800 to €1,300 a month, and compulsory health insurance at about €110 a month. None of that goes to the university as tuition.' },
      { q: 'Do I need to speak German?', a: 'Not for English-taught programmes, where IELTS 6.5 or TOEFL 90 is the usual bar. German-taught programmes want B2, usually evidenced by DSH-2 or TestDaF 4. Learning some regardless makes housing and part-time work considerably easier.' },
      { q: 'What is the blocked account?', a: 'A German bank account holding €11,904 that you cannot draw down faster than a set monthly amount. It proves you can support yourself for a year, and it has to be funded before your visa interview. In practice it, not the university deadline, is what sets your timeline.' },
      { q: 'Which countries does this cover?', a: 'Germany, France, Norway, Finland, Denmark, Sweden, Austria, Czechia and Poland among others. The rules differ by country and sometimes by state, so your shortlist is built against the specific regulation rather than a general promise.' },
    ],
  },

  'pay-after-offer': {
    slug: 'pay-after-offer',
    source: 'lp-pay-after-offer',
    label: 'Student Plans',
    h1: 'Pay ₹19,999 now. The ₹1,80,000 only if you accept an offer.',
    sub:
      'You should not have to pay a six-figure fee to find out whether your plan was ever realistic. The Europe Public Charter costs ₹19,999 to begin, and its ₹1,80,000 success fee falls due only if you accept an offer from a tuition-free university.',
    primaryCta: { label: 'Get your dream admit', href: '/products' },
    secondaryCta: { label: 'Book a call now', href: '/bookings' },
    proofHeading: 'What is in it for you',
    proof: [
      { title: 'Published before you pay', body: 'Europe Public Charter ₹19,999. Global Admissions Charter ₹9,999. Both figures are on the page before you speak to anyone.' },
      { title: 'The success fee waits for a result', body: '\u20b91,80,000, payable only if and when you accept an offer. No offer, nothing to pay.' },
      { title: 'Refunded on a placement', body: 'The \u20b99,999 Global Admissions Charter deposit is returned in full once your visa is granted, you have arrived and your tuition is paid, so a placed student pays Axelis nothing.' },
      { title: 'No margin on third parties', body: 'Application, apostille, exam and visa charges go to those bodies directly. We add nothing.' },
    ],
    bodyHeading: 'Why Axelis',
    body: [
      'Students do not lose a year because they aimed too high. They lose it because they paid in full at the start, to an agency that then had every reason to keep them moving rather than tell them the shortlist was wrong.',
      'Once a large fee has changed hands, honesty costs the agency money. That is the mechanism, and no amount of counsellor training fixes it.',
      'Charging after the offer reverses it. We are paid when a university says yes, so shortlisting places you will not get into costs us directly. It also means your first call can end with us saying no, which costs us a lead and saves you a year.',
    ],
    faqs: [
      { q: 'What does the upfront fee cover?', a: 'Profile assessment, university shortlisting and the application work that follows. The Global Admissions Charter is ₹9,999 and the Europe Public Charter is ₹19,999. Both are published on the Student Plans page.' },
      { q: 'What is the success fee, and when is it due?', a: 'On the Europe Public Charter it is ₹1,80,000, taking the total to ₹1,99,999, and it is payable only if and when you accept an offer from a tuition-free public university. The Global Admissions Charter carries no success fee: its ₹9,999 deposit is returned in full once you are placed.' },
      { q: 'What if no offer comes at all?', a: 'The success fee is never charged, and both charters refund the upfront fee if you receive zero offers. You are out some time, not a six-figure fee.' },
      { q: 'Are there other costs?', a: 'Yes, and none of them are ours. University application fees, apostille and attestation, English and entrance tests, the visa fee and any health surcharge are paid directly to those bodies. We take no commission on any of them and we list them before you commit.' },
    ],
  },

  'published-fees': {
    slug: 'published-fees',
    source: 'lp-published-fees',
    label: 'How we work',
    h1: 'Never pay a fee you have not seen. 29 countries, one counsellor.',
    sub:
      'Every Axelis fee is on this website before you speak to anyone. One named counsellor takes you from shortlist to arrival, across all 29 destinations we work in.',
    primaryCta: { label: 'See what we charge', href: '/products' },
    secondaryCta: { label: 'Book a call now', href: '/bookings' },
    proofHeading: 'What is in it for you',
    proof: [
      { title: 'No quoted price. No surprise invoice.', body: 'Both plans are priced publicly. You read the figure before you hand over your phone number.' },
      { title: 'One named counsellor', body: 'Not a sales desk, then an applications desk, then a visa desk. The same person, with their direct number.' },
      { title: '29 destinations', body: 'Tuition-free public Europe through to the UK, USA, Canada, Australia and Singapore, under one roof.' },
      { title: 'A straight answer first', body: 'If your plan does not work on your marks, your budget or your timeline, you hear it on call one.' },
    ],
    bodyHeading: 'Why Axelis',
    body: [
      'An unpublished fee is not a detail somebody forgot to mention. It is a number set after the agency has worked out how badly you want this, which is why it arrives at the end of a long free consultation rather than the beginning.',
      'Publishing it takes that away. The figure you read is the figure everyone reads, and it cannot be adjusted to what your family looks like it can afford.',
      'Here is the part most agencies will not put in writing. Universities pay us a commission on enrolment for a proportion of the institutions we work with. We disclose that, and if you ask which of your recommendations carry one, we will tell you. Ask your current consultant the same question and compare the answers.',
    ],
    faqs: [
      { q: 'Where are the fees published?', a: 'On the Student Plans page. Both plans carry their full price, and that figure is the entire Axelis fee.' },
      { q: 'Do you charge for the first consultation?', a: 'No. It covers your profile, a shortlist, a timeline and a cost breakdown, and it ends with a recommendation. Nothing to pay and nothing to sign.' },
      { q: 'If I pay you so little, how do you make money?', a: 'Universities pay a commission on enrolment for a proportion of the institutions we work with. That is disclosed, and it is what keeps the student-side fee where it is. It is also exactly why you should ask which recommendations carry a commission, and we will answer.' },
      { q: 'What does one counsellor actually mean?', a: 'One named person from the first call through shortlisting, applications, the offer, the loan, the visa file and arrival. They do not change as you move between stages, and you have their direct contact throughout.' },
    ],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);
