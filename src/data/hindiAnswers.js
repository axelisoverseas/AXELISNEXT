// ============================================================================
// HINDI ANSWER PAGES
// ============================================================================
//
// Nothing on overseeducation.com was in Hindi, and the measurement says that is
// the single biggest unworked opening. 20 Hindi and Hinglish seeds returned 58
// real suggested phrases (~/Axelis/aeo-tracker/keywords_hindi.csv), and the
// shape of them is specific:
//
//   IELTS fees dominates. Eleven separate variants -- "ielts ki fees kitni
//   hai", "ielts ki coaching fees kitni hai", "ielts exam ki fees kitni hai",
//   "ielts ki monthly fees kitni hai" and more. Axelis publishes Rs 460 a
//   session. The question people type and the number we publish are the same
//   thing, in the language they type it in.
//
//   Cost next: "germany me padhai ka kharcha", "विदेश में पढ़ाई का खर्च",
//   "canada me padhai ka kharch", plus loan and scholarship variants.
//
// These are written in Hindi, not machine-translated from the English pages.
// The register is deliberately the Hinglish a student actually uses -- "fees
// kitni hai", not a formal Sanskritised rendering nobody searches for.
//
// SAME RULE AS THE ENGLISH ANSWER PAGES: Axelis's own prices are stated. The
// IELTS test fee, set by IDP and the British Council, is not -- it moves, and a
// stale number on a page selling published pricing is worse than no number.
// ============================================================================

export const HINDI_ARTICLES = {
  'ielts-fees': {
    lang: 'hi',
    title: 'IELTS की फीस कितनी है? सीधा जवाब, नंबर के साथ',
    dek: 'Axelis की IELTS कोचिंग ₹460 प्रति सेशन से शुरू होती है, एक-एक सेशन बुक करके। टेस्ट की फीस अलग है और वह हम तय नहीं करते।',
    updatedOn: '2026-10-03',
    englishHref: '/answers/ielts-coaching-fees',
    sections: [
      { h2: 'कोचिंग की फीस: ₹460 प्रति सेशन', body: [
        'Axelis में IELTS, TOEFL, PTE, SAT और Duolingo की वन-टू-वन कोचिंग ₹460 प्रति सेशन से शुरू होती है। सेशन एक-एक करके बुक होते हैं, इसलिए पहले से कोई बड़ा पैकेज खरीदना ज़रूरी नहीं है।',
        'कोचिंग ऑनलाइन होती है। इसका मतलब यह है कि आप बेंगलुरु में हों या किसी ऐसे शहर में जहाँ टेस्ट सेंटर तक नहीं है, फीस वही रहती है।',
      ]},
      { h2: 'टेस्ट की फीस हमारी नहीं है', body: [
        'IELTS टेस्ट की फीस IDP और British Council तय करते हैं, Axelis नहीं। वह समय-समय पर बदलती रहती है, इसलिए हम उसका कोई आंकड़ा यहाँ नहीं छापते। जिस दिन आप टेस्ट बुक करेंगे, सही फीस वहीं दिख जाएगी।',
        'यही नियम सरकारी, वीज़ा और अपॉस्टिल चार्ज पर भी लागू होता है। वे सीधे उन्हीं संस्थाओं को जाते हैं और Axelis उन पर कोई मार्जिन नहीं लेता।',
      ]},
      { h2: 'कोचिंग कब ज़रूरी नहीं है', body: [
        'अगर आपका प्रैक्टिस स्कोर पहले से ही उस बैंड पर है जो आपके कोर्स को चाहिए, तो कोचिंग उस स्कोर पर पैसा खर्च करना है जो आपके पास पहले से है। एक फ्री प्रैक्टिस टेस्ट देकर पहले यह पता कर लीजिए।',
        'अगर दो बैंड का फ़र्क है, तो कोचिंग इस पूरे खर्च का सबसे सस्ता हिस्सा है।',
      ]},
    ],
    faqs: [
      { q: 'IELTS की कोचिंग फीस कितनी है?', a: 'Axelis में ₹460 प्रति सेशन से शुरू, वन-टू-वन। सेशन अलग-अलग बुक किए जा सकते हैं, पैकेज लेना ज़रूरी नहीं।' },
      { q: 'क्या IELTS टेस्ट की फीस इसमें शामिल है?', a: 'नहीं। टेस्ट फीस IDP और British Council तय करते हैं और वह सीधे उन्हें दी जाती है। Axelis उस पर कोई मार्जिन नहीं लेता।' },
      { q: 'कितने सेशन लगेंगे?', a: 'यह आपके प्रैक्टिस स्कोर और टारगेट बैंड के बीच के फ़र्क पर निर्भर करता है। पहले एक प्रैक्टिस टेस्ट दीजिए, फिर तय कीजिए।' },
      { q: 'क्या कोचिंग ग्रुप में होती है?', a: 'नहीं, वन-टू-वन होती है। ₹460 प्रति सेशन उसी का दाम है।' },
    ],
  },

  'videsh-padhai-kharcha': {
    lang: 'hi',
    title: 'विदेश में पढ़ाई का खर्च: Axelis की फीस पूरी, पहले से',
    dek: 'हमारी फीस पेमेंट से पहले छपी होती है। जो चार्ज सरकार या यूनिवर्सिटी तय करती है, वह हम नहीं छापते, क्योंकि वह बदलता रहता है।',
    updatedOn: '2026-10-03',
    englishHref: '/products',
    sections: [
      { h2: 'Axelis क्या लेता है', body: [
        'Global Admissions Charter: ₹9,999 ऑनबोर्डिंग, एक बार। यह UK, USA, कनाडा और ऑस्ट्रेलिया के लिए है, और इसमें शॉर्टलिस्ट से लेकर वीज़ा फाइलिंग तक सब शामिल है।',
        'Europe Public Charter: ₹19,999 और उसके बाद ₹1,80,000 सक्सेस फीस, जो तभी देनी है जब ऑफर स्वीकार हो जाए। यह यूरोप की उन पब्लिक यूनिवर्सिटीज़ के लिए है जहाँ ट्यूशन फीस नहीं लगती।',
        'टेस्ट प्रेप ₹460 प्रति सेशन से। MEA अपॉस्टिल ₹1,500 प्रति डॉक्यूमेंट प्लस GST। जर्मन या फ्रेंच A1 से B2 तक ₹1,80,000। APS के लिए dMAT की तैयारी ₹25,000।',
      ]},
      { h2: 'जो हम नहीं लेते', body: [
        'सरकारी फीस, वीज़ा चार्ज, एग्ज़ाम फीस और ब्लॉक्ड अकाउंट का पैसा सीधे उन्हीं संस्थाओं को जाता है। Axelis उन पर कोई मार्जिन नहीं लेता।',
        'जर्मनी का ब्लॉक्ड अकाउंट खर्च नहीं है, डिपॉज़िट है। वह आपका अपना पैसा है जो जर्मनी पहुँचने के बाद महीने-दर-महीने वापस मिलता है। उसे खर्च मानकर बजट बनाने से विदेश की पढ़ाई असल से कहीं महँगी लगती है।',
      ]},
      { h2: 'Axelis एडमिशन की गारंटी नहीं देता', body: [
        'हम यह नहीं कहते कि एडमिशन मिल ही जाएगा। जो लिखित में तय है वह है फीस, और दोनों स्टूडेंट प्लान में डिपॉज़िट की वापसी अगर ऑफर या वीज़ा नहीं मिलता।',
      ]},
    ],
    faqs: [
      { q: 'क्या फीस शहर के हिसाब से बदलती है?', a: 'नहीं। मुंबई में हों या रतलाम में, फीस वही रहती है। काउंसलिंग ऑनलाइन Google Meet पर होती है।' },
      { q: 'पहली कॉल का कोई चार्ज है?', a: 'नहीं, पहली काउंसलिंग कॉल फ्री है।' },
      { q: 'क्या Axelis सरकारी फीस पर कमीशन लेता है?', a: 'नहीं। सरकारी, अपॉस्टिल, एग्ज़ाम और वीज़ा चार्ज सीधे उन संस्थाओं को जाते हैं।' },
      { q: 'क्या एडमिशन की गारंटी है?', a: 'नहीं। Axelis कहीं भी एडमिशन का वादा नहीं करता। फीस लिखित में तय है, एडमिशन नहीं।' },
    ],
  },
};

export const HINDI_SLUGS = Object.keys(HINDI_ARTICLES);
export const getHindiArticle = (slug) => HINDI_ARTICLES[slug] || null;
