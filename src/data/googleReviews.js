// ============================================================================
// GOOGLE REVIEWS. Axelis Overseas, Bilaspur (Nehru Chowk branch)
// ============================================================================
//
// Captured 22 September 2026 from the live Google Business Profile. This
// replaces the placeholder that shipped here, which the original TODO asked to
// fill from the live profile.
//
// Two corrections that came out of doing it:
//
//   1. totalReviews read 87. The live profile says 75. The lower number is the
//      real one and is now used.
//   2. The BENGALURU Business Profile has ZERO reviews. Its own dashboard still
//      shows the "Get your first reviews" prompt. Every review below is from
//      Bilaspur, and the widget labels it as such rather than implying the
//      company has 75 reviews everywhere.
//
// Reviewer profile pictures are hosted by Google and belong to the reviewers,
// not to Axelis. They are not hotlinked: avatarInitials render instead. This is
// the one place on the testimonials page without a face, and it is deliberate.
//
// Text is verbatim. Where Google itself truncated a long review behind a "More"
// link, `truncated: true` is set and the widget appends an ellipsis rather than
// inventing the rest.
// ============================================================================

export const googleReviewsMeta = {
  businessName: 'Axelis Overseas. Bilaspur',
  address: '1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, Chhattisgarh 495001',
  rating: 4.9,
  totalReviews: 75,
  capturedOn: '2026-09-22',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Axelis+Overseas+Bilaspur',
  placeUrl:
    'https://www.google.com/maps/place/Axelis+Overseas+Education+Pvt+Ltd/@22.0868588,82.1429961,17z',
};

// Each review: name, rating (1-5), relativeDate, text, avatarInitials, verified.
export const reviews = [
  {
    name: 'Abhishek Bisht',
    rating: 5,
    relativeDate: '3 months ago',
    text: 'I had a wonderful experience with Axelis Overseas Education Pvt. Ltd. The entire team was supportive, professional, and always ready to help. Would highly recommend Axelis to any student looking for reliable guidance for overseas education.',
    avatarInitials: 'AB',
    truncated: false,
    verified: true,
  },
  {
    name: 'Shaurya',
    rating: 5,
    relativeDate: '6 months ago',
    text: 'Great experience with Axelis Overseas. They guided me through the entire process of studying abroad and made everything simple and smooth. The team was supportive, responsive, and very helpful with applications and documentation. Highly recommended for students planning to go abroad.',
    avatarInitials: 'S',
    truncated: false,
    verified: true,
  },
  {
    name: 'Saiyam Mazumder',
    rating: 5,
    relativeDate: '8 months ago',
    text: 'I had a very good experience with Axelis Overseas. The counselling session was extremely helpful, and everything was explained clearly and patiently. They genuinely focus on guiding students in the right direction rather than pushing',
    avatarInitials: 'SM',
    truncated: true,
    verified: true,
  },
  {
    name: 'Krish Kamdar',
    rating: 5,
    relativeDate: '4 months ago',
    text: 'Axelis Overseas is the best organisation I have ever met with. They have helped me in all my queries and doubts, and make studies abroad easy.',
    avatarInitials: 'KK',
    truncated: false,
    verified: true,
  },
  {
    name: 'Rhea Verma',
    rating: 5,
    relativeDate: 'a year ago',
    text: 'I had an outstanding experience with Axelis Overseas for my study abroad journey. What stands out is that they provide free counselling services while delivering exceptional value. Their team guided me through every step, from selecting',
    avatarInitials: 'RV',
    truncated: true,
    verified: true,
  },
  {
    name: 'Ghanshyam Pratap Singh',
    rating: 5,
    relativeDate: 'a year ago',
    text: 'Axelis Overseas was really helpful in my study abroad journey. They guided me in choosing the right university and made the visa process easy. Their team supported me at every step, from applications to interview preparation. I liked how honest and friendly they were. If you are planning to study abroad, I highly recommend them.',
    avatarInitials: 'GS',
    truncated: false,
    verified: true,
  },
  {
    name: 'Pragya Agarwal',
    rating: 5,
    relativeDate: 'a year ago',
    text: 'Choosing Axelis was the best decision I made for my study abroad journey. I was aiming for a psychology program in the US, and they did not just help me pick the right course, they connected me with alumni to make sure it was a good fit',
    avatarInitials: 'PA',
    truncated: true,
    verified: true,
  },
  {
    name: 'Saurabh Raj',
    rating: 5,
    relativeDate: 'a year ago',
    text: 'I had an amazing experience with Axelis Overseas Education throughout my study abroad admission process. From the very beginning, their team provided professional, transparent, and personalized guidance, ensuring a smooth and hassle-free',
    avatarInitials: 'SR',
    truncated: true,
    verified: true,
  },
  {
    name: 'Sreeja Bonam',
    rating: 5,
    relativeDate: '5 months ago',
    text: 'Highly professional and responsive. They provided clear insights into my selected program and addressed all my queries with patience.',
    avatarInitials: 'SB',
    truncated: false,
    verified: true,
  },
  {
    name: 'Sai Vikash',
    rating: 5,
    relativeDate: '2 years ago',
    text: 'I cannot thank the team at Axelis Overseas enough for their exceptional guidance and support throughout my entire Ireland application process. From day one, they made everything so smooth and stress-free. A special shoutout to Rishabh, John,',
    avatarInitials: 'SV',
    truncated: true,
    verified: true,
  },
];

// Only reviews confirmed live on the Google profile. The widgets render
// from THIS list, so an unreplaced placeholder hides the component instead
// of shipping a fabricated-looking review on a page about credibility.
export const verifiedReviews = reviews.filter((r) => r.verified);

export const hasVerifiedReviews = verifiedReviews.length > 0;

// Convenience helper used by the widget to pick the best outbound URL.
export function getGoogleMapsHref() {
  return googleReviewsMeta.placeUrl || googleReviewsMeta.mapsUrl;
}
