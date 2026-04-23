// Curated list of scholarships available to Indian students studying abroad.
// plan: 'ZTF' = Zero Tuition Fee (public/tuition-free EU tracks); 'ZCF' = Zero Consultation Fee.
// Many scholarships apply under BOTH plans.

export const SCHOLARSHIP_COUNTRIES = [
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
];

export const SCHOLARSHIP_LEVELS = ['UG', 'PG', 'PhD', 'MBA'];
export const SCHOLARSHIP_TYPES = ['Merit', 'Need-Based', 'Government', 'University', 'Research'];

export const scholarships = [
  // UK
  { id: 'chevening', name: 'Chevening Scholarship', country: 'UK', level: ['PG'], type: 'Government', amount: 'Full tuition + stipend', plan: ['ZCF', 'ZTF'], url: 'https://www.chevening.org/scholarship/india/', summary: 'UK FCDO fully-funded master\'s award for future leaders.' },
  { id: 'commonwealth-uk', name: 'Commonwealth Scholarship (UK)', country: 'UK', level: ['PG', 'PhD'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://cscuk.fcdo.gov.uk/scholarships/', summary: 'For developing Commonwealth citizens — tuition, flight, living costs.' },
  { id: 'gates-cambridge', name: 'Gates Cambridge Scholarship', country: 'UK', level: ['PG', 'PhD'], type: 'Merit', amount: 'Full tuition + stipend', plan: ['ZCF'], url: 'https://www.gatescambridge.org/', summary: 'Highly selective Cambridge graduate funding.' },
  { id: 'rhodes', name: 'Rhodes Scholarship', country: 'UK', level: ['PG'], type: 'Merit', amount: 'Fully funded', plan: ['ZCF'], url: 'https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/', summary: 'Oxford fully-funded graduate scholarship.' },
  { id: 'gse-uk', name: 'GREAT Scholarship (India)', country: 'UK', level: ['PG'], type: 'Government', amount: '£10,000', plan: ['ZCF'], url: 'https://study-uk.britishcouncil.org/scholarships/great-scholarships', summary: 'British Council × UK universities — tuition discount for Indian students.' },

  // USA
  { id: 'fulbright-nehru', name: 'Fulbright–Nehru Fellowship', country: 'US', level: ['PG', 'PhD'], type: 'Government', amount: 'Fully funded', plan: ['ZCF'], url: 'https://www.usief.org.in/Fellowships/Fulbright-Nehru-Fellowships.aspx', summary: 'US flagship award for Indian scholars; tuition + living + travel.' },
  { id: 'knight-hennessy', name: 'Knight-Hennessy Scholars', country: 'US', level: ['PG', 'MBA', 'PhD'], type: 'Merit', amount: 'Full tuition + stipend', plan: ['ZCF'], url: 'https://knight-hennessy.stanford.edu/', summary: 'Stanford graduate school full funding.' },
  { id: 'tata-scholarship', name: 'Tata Scholarship (Cornell)', country: 'US', level: ['UG'], type: 'Need-Based', amount: 'Financial aid', plan: ['ZCF'], url: 'https://admissions.cornell.edu/apply/international-applicants/financial-aid-international-applicants/tata-scholarship-incoming', summary: 'Cornell undergraduate need-based award for Indian citizens.' },
  { id: 'inlaks', name: 'Inlaks Shivdasani Foundation', country: 'US', level: ['PG'], type: 'Merit', amount: 'Up to $100,000', plan: ['ZCF'], url: 'https://www.inlaksfoundation.org/scholarships/', summary: 'For Indian students pursuing master\'s at top US/UK/EU schools.' },

  // Canada
  { id: 'vanier', name: 'Vanier Canada Graduate Scholarship', country: 'CA', level: ['PhD'], type: 'Government', amount: 'CAD 50,000/year', plan: ['ZCF'], url: 'https://vanier.gc.ca/en/home-accueil.html', summary: 'Doctoral students demonstrating leadership + academic excellence.' },
  { id: 'trudeau', name: 'Trudeau Foundation Doctoral', country: 'CA', level: ['PhD'], type: 'Merit', amount: 'CAD 40,000/year', plan: ['ZCF'], url: 'https://www.trudeaufoundation.ca/scholarships', summary: 'Humanities / social sciences doctoral candidates in Canada.' },
  { id: 'lester-pearson', name: 'Lester B. Pearson (UofT)', country: 'CA', level: ['UG'], type: 'Merit', amount: 'Full tuition + living', plan: ['ZCF'], url: 'https://future.utoronto.ca/pearson/', summary: 'University of Toronto full-ride undergraduate award.' },

  // Australia
  { id: 'awards-aus', name: 'Australia Awards', country: 'AU', level: ['PG'], type: 'Government', amount: 'Fully funded', plan: ['ZCF'], url: 'https://www.dfat.gov.au/people-to-people/australia-awards', summary: 'DFAT long-term awards — tuition, living, airfare.' },
  { id: 'iprs', name: 'Research Training Program (RTP)', country: 'AU', level: ['PhD'], type: 'Research', amount: 'Full tuition + stipend', plan: ['ZCF'], url: 'https://www.education.gov.au/research-block-grants/research-training-program', summary: 'Federal doctoral research scholarship at Australian universities.' },

  // Ireland
  { id: 'government-ireland', name: 'Government of Ireland Scholarship', country: 'IE', level: ['PG', 'PhD'], type: 'Government', amount: '€10,000', plan: ['ZCF', 'ZTF'], url: 'https://hea.ie/funding-governance-performance/funding/student-finance/government-of-ireland-international-education-scholarships/', summary: 'Higher Education Authority award for non-EU/EEA students.' },
  { id: 'walsh-fellowship', name: 'Walsh Scholarship Programme', country: 'IE', level: ['PhD'], type: 'Research', amount: 'Full funding', plan: ['ZCF', 'ZTF'], url: 'https://www.teagasc.ie/about/research--innovation/walsh-scholarships/', summary: 'Teagasc research funding for agri/food masters and PhDs.' },

  // Germany (ZTF heavy)
  { id: 'daad-germany', name: 'DAAD Scholarship', country: 'DE', level: ['PG', 'PhD'], type: 'Government', amount: '€934–€1,200/month', plan: ['ZTF'], url: 'https://www.daad.in/en/study-research-in-germany/scholarships/', summary: 'German federal funding for master\'s / doctoral / research stays.' },
  { id: 'deutschlandstipendium', name: 'Deutschlandstipendium', country: 'DE', level: ['UG', 'PG'], type: 'Merit', amount: '€300/month', plan: ['ZTF'], url: 'https://www.deutschlandstipendium.de/deutschlandstipendium/en/home/home_node.html', summary: 'Merit-based monthly stipend at German public universities.' },
  { id: 'erasmus-mundus', name: 'Erasmus Mundus Joint Masters', country: 'DE', level: ['PG'], type: 'Government', amount: 'Up to €49,000', plan: ['ZTF', 'ZCF'], url: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters-scholarships', summary: 'EU-funded joint masters across 2+ European universities.' },
  { id: 'heinrich-boll', name: 'Heinrich Böll Foundation', country: 'DE', level: ['PG', 'PhD'], type: 'Merit', amount: '€850–€1,350/month', plan: ['ZTF'], url: 'https://www.boell.de/en/scholarships', summary: 'Scholarship for socially & politically engaged students.' },

  // France
  { id: 'eiffel', name: 'Eiffel Excellence Scholarship', country: 'FR', level: ['PG', 'PhD'], type: 'Government', amount: '€1,181–€1,700/month', plan: ['ZCF', 'ZTF'], url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence', summary: 'MEAE programme — monthly allowance + insurance + travel.' },
  { id: 'charpak', name: 'Charpak Scholarship', country: 'FR', level: ['UG', 'PG'], type: 'Government', amount: 'Tuition + living', plan: ['ZCF', 'ZTF'], url: 'https://www.inde.campusfrance.org/en/charpak-scholarship-programme', summary: 'Campus France flagship — for Indian students only.' },
  { id: 'emlyon', name: 'emlyon Excellence Scholarship', country: 'FR', level: ['MBA', 'PG'], type: 'University', amount: 'Up to 50% tuition', plan: ['ZCF'], url: 'https://em-lyon.com/en/tuition-and-fees/financial-aid-and-scholarships', summary: 'emlyon business school merit-based tuition waiver.' },
  { id: 'kedge-excellence', name: 'KEDGE Excellence Award', country: 'FR', level: ['MBA', 'PG'], type: 'University', amount: '€3,000–€8,000', plan: ['ZCF'], url: 'https://student.kedge.edu/financial-aid/scholarships', summary: 'KEDGE Business School merit-based tuition waiver.' },

  // Finland (ZTF destination)
  { id: 'finland-scholarship', name: 'Finland Scholarship', country: 'FI', level: ['PG'], type: 'University', amount: 'First-year tuition waiver', plan: ['ZTF'], url: 'https://www.studyinfinland.fi/scholarships/finland-scholarship', summary: 'For non-EU/EEA master\'s students at Finnish universities.' },
  { id: 'aalto-talent', name: 'Aalto University Scholarship', country: 'FI', level: ['PG'], type: 'Merit', amount: '50–100% tuition', plan: ['ZTF'], url: 'https://www.aalto.fi/en/study-at-aalto/aalto-university-scholarships', summary: 'Aalto master\'s merit scholarship with living stipend option.' },

  // Italy
  { id: 'italian-government', name: 'Italian Government Scholarship', country: 'IT', level: ['PG', 'PhD'], type: 'Government', amount: '€9,000', plan: ['ZCF', 'ZTF'], url: 'https://studyinitaly.esteri.it/en/call-for-procedure', summary: 'Ministry of Foreign Affairs (MAECI) annual scholarship.' },
  { id: 'bocconi-merit', name: 'Bocconi Merit Award', country: 'IT', level: ['PG', 'MBA'], type: 'University', amount: 'Up to full tuition', plan: ['ZCF'], url: 'https://www.unibocconi.it/en/programs/scholarships-financial-aid', summary: 'Bocconi University automatic merit consideration at admission.' },

  // Austria
  { id: 'oead', name: 'OeAD Ernst Mach Scholarship', country: 'AT', level: ['PG', 'PhD'], type: 'Government', amount: '€1,150/month', plan: ['ZTF'], url: 'https://grants.at/en/', summary: 'Austrian federal research / master\'s funding.' },

  // Netherlands
  { id: 'holland-scholarship', name: 'Holland Scholarship', country: 'NL', level: ['UG', 'PG'], type: 'Government', amount: '€5,000', plan: ['ZCF'], url: 'https://www.studyinnl.org/finances/holland-scholarship', summary: 'Dutch Ministry of Education — non-EEA students.' },
  { id: 'orange-tulip', name: 'Orange Tulip Scholarship', country: 'NL', level: ['PG'], type: 'Government', amount: 'Up to full tuition', plan: ['ZCF'], url: 'https://www.nesoindia.org/students/scholarships/orange-tulip-scholarship', summary: 'Nuffic Neso India — several partner universities in the Netherlands.' },

  // New Zealand
  { id: 'nzis', name: 'New Zealand Excellence Awards', country: 'NZ', level: ['UG', 'PG'], type: 'Government', amount: 'NZD 5,000–10,000', plan: ['ZCF'], url: 'https://www.studywithnewzealand.govt.nz/en/scholarships', summary: 'ENZ awards for Indian students — tuition discount.' },

  // Singapore
  { id: 'nus-graduate', name: 'NUS Research Scholarship', country: 'SG', level: ['PhD'], type: 'Research', amount: 'Full tuition + stipend', plan: ['ZCF'], url: 'https://www.nus.edu.sg/registrar/administrative-policies-procedures/graduate/research-scholarship-other-scholarships-fellowships', summary: 'NUS fully-funded doctoral scholarship.' },

  // Spain
  { id: 'aecid', name: 'MAEC-AECID Scholarship', country: 'ES', level: ['PG', 'PhD'], type: 'Government', amount: 'Full tuition + stipend', plan: ['ZCF', 'ZTF'], url: 'https://www.aecid.es/en/becas-y-lectorados', summary: 'Spanish government scholarship for higher studies.' },

  // Sweden
  { id: 'si-global', name: 'Swedish Institute Scholarships', country: 'SE', level: ['PG'], type: 'Government', amount: 'Tuition + SEK 12,000/month', plan: ['ZCF', 'ZTF'], url: 'https://si.se/en/apply/scholarships/', summary: 'Global Professionals scheme — Indian students eligible.' },

  // Denmark
  { id: 'danish-govt', name: 'Danish Government Scholarship', country: 'DK', level: ['PG', 'PhD'], type: 'Government', amount: 'Up to full tuition', plan: ['ZCF'], url: 'https://studyindenmark.dk/study-options/tuition-fees-and-scholarships/danish-government-scholarships', summary: 'Ministry of Higher Education awards at Danish universities.' },

  // Switzerland
  { id: 'swiss-excellence', name: 'Swiss Government Excellence', country: 'CH', level: ['PG', 'PhD'], type: 'Government', amount: 'CHF 1,920/month + fees', plan: ['ZCF'], url: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html', summary: 'Research / postgraduate award at Swiss universities.' },

  // Belgium
  { id: 'vlir-uos', name: 'VLIR-UOS Master Scholarship', country: 'BE', level: ['PG'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://www.vliruos.be/en/scholarships/', summary: 'Flemish master programmes open to Indian development professionals.' },

  // Poland / Czech / Hungary / Portugal
  { id: 'stipendium-hu', name: 'Stipendium Hungaricum', country: 'HU', level: ['UG', 'PG', 'PhD'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://stipendiumhungaricum.hu/', summary: 'Hungarian government full-scholarship across programmes.' },
  { id: 'visegrad', name: 'Visegrad Scholarship', country: 'CZ', level: ['PG', 'PhD'], type: 'Government', amount: '€3,330/semester', plan: ['ZCF'], url: 'https://www.visegradfund.org/apply/mobilities/visegrad-scholarships/', summary: 'V4 countries — Czech Republic, Poland, Slovakia, Hungary.' },
  { id: 'ignacy-lukasiewicz', name: 'Ignacy Łukasiewicz Programme', country: 'PL', level: ['PG'], type: 'Government', amount: 'Tuition + stipend', plan: ['ZCF'], url: 'https://nawa.gov.pl/en/students/foreign-students/the-lukasiewicz-scholarship-programme', summary: 'Polish NAWA scholarship for Indian engineering students.' },
  { id: 'nova-sbe', name: 'Nova SBE Merit Award', country: 'PT', level: ['PG', 'MBA'], type: 'University', amount: 'Up to 50% tuition', plan: ['ZCF'], url: 'https://www.novasbe.unl.pt/en/study/financing-your-studies/scholarships', summary: 'Nova School of Business merit-based tuition waiver.' },

  // Japan / Korea / Malaysia / HK / Turkey
  { id: 'mext', name: 'MEXT Scholarship', country: 'JP', level: ['UG', 'PG', 'PhD'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://www.studyinjapan.go.jp/en/planning/scholarship/mext-scholarship/', summary: 'Japanese government full-tuition + stipend award.' },
  { id: 'gks', name: 'Global Korea Scholarship', country: 'KR', level: ['UG', 'PG'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do', summary: 'NIIED full scholarship — tuition, living, Korean language course.' },
  { id: 'malaysia-int', name: 'Malaysia International Scholarship', country: 'MY', level: ['PG', 'PhD'], type: 'Government', amount: 'Tuition + stipend', plan: ['ZCF'], url: 'https://biasiswa.mohe.gov.my/INTER/', summary: 'Ministry of Higher Education Malaysia award.' },
  { id: 'hkpfs', name: 'Hong Kong PhD Fellowship', country: 'HK', level: ['PhD'], type: 'Research', amount: 'HKD 331,200/year', plan: ['ZCF'], url: 'https://cerg1.ugc.edu.hk/hkpfs/index.html', summary: 'RGC fellowship at Hong Kong universities.' },
  { id: 'turkiye-burslari', name: 'Türkiye Scholarships', country: 'TR', level: ['UG', 'PG', 'PhD'], type: 'Government', amount: 'Fully funded', plan: ['ZCF', 'ZTF'], url: 'https://www.turkiyeburslari.gov.tr/en', summary: 'Turkish government full scholarship.' },
];
