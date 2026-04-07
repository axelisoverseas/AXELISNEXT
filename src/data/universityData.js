// University data from ai guy sheet.xlsx - Axelis Overseas partner universities
// Each university includes: name, slug, country, programs, logo, website domain

export const universities = [
  // ═══════════════════════════ UK (23) ═══════════════════════════
  {
    id: "warwick-university",
    name: "Warwick University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/warwick.ac.uk",
    website: "https://warwick.ac.uk",
    description: "A Russell Group university consistently ranked among the UK's top 10, renowned for business, economics, and engineering programs.",
    ranking: "Top 10 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)",
      pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+", "Reference letters"],
      applyUrl: "https://warwick.ac.uk/study/postgraduate/apply/"
    }
  },
  {
    id: "university-of-bath",
    name: "University of Bath",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/bath.ac.uk",
    website: "https://bath.ac.uk",
    description: "Highly regarded for engineering, business, and sciences with strong industry placement programs.",
    ranking: "Top 15 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)",
      pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+", "Reference letters"],
      applyUrl: "https://www.bath.ac.uk/study/"
    }
  },
  {
    id: "anglia-ruskin-university",
    name: "Anglia Ruskin University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/aru.ac.uk",
    website: "https://aru.ac.uk",
    description: "A modern university with campuses in Cambridge and Chelmsford, offering career-focused programs.",
    ranking: "Top 40 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)",
      pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"],
      applyUrl: "https://www.aru.ac.uk/study/"
    }
  },
  {
    id: "aston-university",
    name: "Aston University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/aston.ac.uk",
    website: "https://aston.ac.uk",
    description: "Birmingham-based university excelling in business, engineering, and health sciences with excellent graduate employability.",
    ranking: "Top 30 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)",
      pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"],
      applyUrl: "https://www.aston.ac.uk/study/"
    }
  },
  {
    id: "coventry-university",
    name: "Coventry University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/coventry.ac.uk",
    website: "https://coventry.ac.uk",
    description: "Known for teaching excellence, industry partnerships, and a strong focus on employability.",
    ranking: "Top 50 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)",
      pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"],
      applyUrl: "https://www.coventry.ac.uk/study/"
    }
  },
  {
    id: "de-montfort-university",
    name: "De Montfort University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/dmu.ac.uk",
    website: "https://dmu.ac.uk",
    description: "Leicester-based university with strong creative arts, technology, and business programs.",
    ranking: "Top 60 UK",
    applicationProcess: {
      ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions",
      requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"],
      applyUrl: "https://www.dmu.ac.uk/study/"
    }
  },
  {
    id: "edinburgh-napier-university",
    name: "Edinburgh Napier University",
    country: "UK",
    countryFlag: "🇬🇧",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/napier.ac.uk",
    website: "https://napier.ac.uk",
    description: "Scotland's largest modern university with strong computing, engineering, and business schools.",
    ranking: "Top 50 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"], applyUrl: "https://www.napier.ac.uk/study-with-us/" }
  },
  {
    id: "liverpool-john-moores-university",
    name: "Liverpool John Moores University",
    country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/ljmu.ac.uk", website: "https://ljmu.ac.uk",
    description: "A vibrant university in Liverpool with excellent teaching quality and student satisfaction.",
    ranking: "Top 60 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"], applyUrl: "https://www.ljmu.ac.uk/study/" }
  },
  {
    id: "solent-university", name: "Solent University", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/solent.ac.uk", website: "https://solent.ac.uk",
    description: "Southampton-based university specializing in creative industries, maritime, and sport.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.solent.ac.uk/study/" }
  },
  {
    id: "university-of-brighton", name: "University of Brighton", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/brighton.ac.uk", website: "https://brighton.ac.uk",
    description: "A creative and career-focused university on the south coast of England.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.brighton.ac.uk/studying-here/" }
  },
  {
    id: "university-of-east-anglia", name: "University of East Anglia", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/uea.ac.uk", website: "https://uea.ac.uk",
    description: "A top UK research university in Norwich, excelling in environmental sciences and creative writing.", ranking: "Top 30 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+"], applyUrl: "https://www.uea.ac.uk/study/" }
  },
  {
    id: "university-of-east-london", name: "University of East London", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/uel.ac.uk", website: "https://uel.ac.uk",
    description: "London-based university with modern campuses and strong focus on professional development.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.uel.ac.uk/study/" }
  },
  {
    id: "university-of-greenwich", name: "University of Greenwich", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/gre.ac.uk", website: "https://gre.ac.uk",
    description: "Historic London university with campuses in Greenwich, Avery Hill, and Medway.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.gre.ac.uk/study/" }
  },
  {
    id: "university-of-hull-london", name: "University of Hull - London", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/hull.ac.uk", website: "https://hull.ac.uk",
    description: "A research-intensive university offering its programs through a London campus.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.hull.ac.uk/study/" }
  },
  {
    id: "university-of-leicester", name: "University of Leicester", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/le.ac.uk", website: "https://le.ac.uk",
    description: "A leading research university renowned for space science, genetics, and law.", ranking: "Top 30 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.0+"], applyUrl: "https://le.ac.uk/study/" }
  },
  {
    id: "buckinghamshire-new-university", name: "Buckinghamshire New University", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/bucks.ac.uk", website: "https://bucks.ac.uk",
    description: "A career-focused university near London specializing in health, creative, and business courses.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://bucks.ac.uk/study/" }
  },
  {
    id: "university-of-liverpool", name: "University of Liverpool", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/liverpool.ac.uk", website: "https://liverpool.ac.uk",
    description: "A Russell Group university with world-leading research in engineering, medicine, and veterinary science.", ranking: "Top 30 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+", "References"], applyUrl: "https://www.liverpool.ac.uk/study/" }
  },
  {
    id: "university-of-stirling", name: "University of Stirling", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/stir.ac.uk", website: "https://stir.ac.uk",
    description: "A Scottish university with a beautiful campus, strong in sports, education, and aquaculture.", ranking: "Top 40 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.stir.ac.uk/study/" }
  },
  {
    id: "university-of-bedfordshire", name: "University of Bedfordshire", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/beds.ac.uk", website: "https://beds.ac.uk",
    description: "A modern university with campuses in Luton and Bedford offering practical, career-ready programs.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.beds.ac.uk/apply/" }
  },
  {
    id: "university-of-surrey", name: "University of Surrey", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/surrey.ac.uk", website: "https://surrey.ac.uk",
    description: "Renowned for graduate employability, with top-ranked programs in hospitality, engineering, and health.", ranking: "Top 25 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+"], applyUrl: "https://www.surrey.ac.uk/apply/" }
  },
  {
    id: "university-of-sunderland", name: "University of Sunderland", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/sunderland.ac.uk", website: "https://sunderland.ac.uk",
    description: "A welcoming university in northeast England with affordable tuition and strong student support.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.sunderland.ac.uk/study/" }
  },
  {
    id: "university-of-strathclyde", name: "University of Strathclyde", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/strath.ac.uk", website: "https://strath.ac.uk",
    description: "Glasgow's technological university, excelling in engineering, business, and science research.", ranking: "Top 20 UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "Personal statement", "IELTS 6.5+"], applyUrl: "https://www.strath.ac.uk/studywithus/" }
  },
  {
    id: "university-of-worcester", name: "University of Worcester", country: "UK", countryFlag: "🇬🇧", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/worcester.ac.uk", website: "https://worcester.ac.uk",
    description: "A friendly Midlands university with high student satisfaction and strong teacher training programs.", ranking: "UK",
    applicationProcess: { ugDeadline: "January 31 (UCAS)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.worcester.ac.uk/study/" }
  },

  // ═══════════════════════════ FRANCE (1) ═══════════════════════════
  {
    id: "rennes-school-of-business", name: "Rennes School of Business", country: "France", countryFlag: "🇫🇷", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/rennes-sb.com", website: "https://rennes-sb.com",
    description: "A triple-accredited (AACSB, EQUIS, AMBA) business school in Brittany, known for its international focus.", ranking: "Top Business Schools France",
    applicationProcess: { pgDeadline: "Multiple intakes (Sep, Jan)", requirements: ["Bachelor's degree", "GMAT/GRE (optional)", "IELTS 6.5+", "CV", "Interview"], applyUrl: "https://www.rennes-sb.com/programs/" }
  },

  // ═══════════════════════════ FINLAND (1) ═══════════════════════════
  {
    id: "university-of-vaasa", name: "University of Vaasa", country: "Finland", countryFlag: "🇫🇮", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/uwasa.fi", website: "https://uwasa.fi",
    description: "A Finnish university specializing in business, technology, and energy with no tuition fees for EU students.", ranking: "Finland",
    applicationProcess: { pgDeadline: "January (main intake)", requirements: ["Bachelor's degree", "IELTS 6.5+", "Motivation letter", "CV"], applyUrl: "https://www.uwasa.fi/en/education/masters-programmes" }
  },

  // ═══════════════════════════ IRELAND (10) ═══════════════════════════
  {
    id: "dublin-business-school", name: "Dublin Business School", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/dbs.ie", website: "https://dbs.ie",
    description: "Ireland's largest independent third-level college specializing in business, arts, and psychology.", ranking: "Ireland",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+", "CV"], applyUrl: "https://www.dbs.ie/apply" }
  },
  {
    id: "dublin-city-university", name: "Dublin City University", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/dcu.ie", website: "https://dcu.ie",
    description: "A young, dynamic university in Dublin known for innovation, technology, and business education.", ranking: "Top 5 Ireland",
    applicationProcess: { ugDeadline: "February 1 (CAO)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.5+", "Personal statement"], applyUrl: "https://www.dcu.ie/registry/how-to-apply" }
  },
  {
    id: "national-college-of-ireland", name: "National College of Ireland", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/ncirl.ie", website: "https://ncirl.ie",
    description: "A Dublin-based college focused on business, computing, and psychology with industry connections.", ranking: "Ireland",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.ncirl.ie/Apply" }
  },
  {
    id: "trinity-college-dublin", name: "Trinity College Dublin", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/tcd.ie", website: "https://tcd.ie",
    description: "Ireland's most prestigious university, founded in 1592, consistently ranked in the world's top 100.", ranking: "Top 100 World",
    applicationProcess: { ugDeadline: "February 1 (CAO)", pgDeadline: "Varies by program", requirements: ["Academic transcripts", "IELTS 6.5+", "Personal statement", "References"], applyUrl: "https://www.tcd.ie/study/" }
  },
  {
    id: "university-college-dublin", name: "University College Dublin", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/ucd.ie", website: "https://ucd.ie",
    description: "Ireland's largest university with a global reputation in business, engineering, and health sciences.", ranking: "Top 200 World",
    applicationProcess: { ugDeadline: "February 1 (CAO)", pgDeadline: "Varies by program", requirements: ["Academic transcripts", "IELTS 6.5+", "Personal statement"], applyUrl: "https://www.ucd.ie/apply/" }
  },
  {
    id: "university-of-limerick", name: "University of Limerick", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/ul.ie", website: "https://ul.ie",
    description: "Known for its cooperative education programs and excellent student experience on a stunning riverside campus.", ranking: "Top 500 World",
    applicationProcess: { ugDeadline: "February 1 (CAO)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.5+"], applyUrl: "https://www.ul.ie/apply/" }
  },
  {
    id: "cct-dublin", name: "CCT Dublin", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/cct.ie", website: "https://cct.ie",
    description: "A technology-focused college in Dublin city centre offering IT, business, and data analytics programs.", ranking: "Ireland",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.cct.ie/apply/" }
  },
  {
    id: "griffith-college", name: "Griffith College", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/griffith.ie", website: "https://griffith.ie",
    description: "Ireland's largest independent college with campuses in Dublin, Cork, and Limerick.", ranking: "Ireland",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+"], applyUrl: "https://www.griffith.ie/apply" }
  },
  {
    id: "university-of-galway", name: "University of Galway", country: "Ireland", countryFlag: "🇮🇪", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/universityofgalway.ie", website: "https://universityofgalway.ie",
    description: "A research-led university on Ireland's west coast, strong in biomedical science and engineering.", ranking: "Top 300 World",
    applicationProcess: { pgDeadline: "Varies by program", requirements: ["Bachelor's degree", "IELTS 6.5+", "Personal statement", "References"], applyUrl: "https://www.universityofgalway.ie/postgraduate/" }
  },
  {
    id: "maynooth-university", name: "Maynooth University", country: "Ireland", countryFlag: "🇮🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/maynoothuniversity.ie", website: "https://maynoothuniversity.ie",
    description: "A vibrant university near Dublin known for arts, humanities, social sciences, and computer science.", ranking: "Top 400 World",
    applicationProcess: { ugDeadline: "February 1 (CAO)", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.5+"], applyUrl: "https://www.maynoothuniversity.ie/study-maynooth/" }
  },

  // ═══════════════════════════ GERMANY (2) ═══════════════════════════
  {
    id: "university-of-europe-for-applied-sciences", name: "University of Europe for Applied Sciences", country: "Germany", countryFlag: "🇩🇪", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/ue-germany.com", website: "https://ue-germany.com",
    description: "A private university with campuses across Germany offering English-taught programs in business, design, and tech.", ranking: "Germany",
    applicationProcess: { ugDeadline: "Rolling (Sep, Mar intakes)", pgDeadline: "Rolling (Sep, Mar intakes)", requirements: ["Academic transcripts", "IELTS 6.0+", "Motivation letter", "CV"], applyUrl: "https://www.ue-germany.com/apply" }
  },
  {
    id: "berlin-school-of-business-and-innovation", name: "Berlin School of Business and Innovation", country: "Germany", countryFlag: "🇩🇪", programs: ["UG", "PG", "PhD"],
    logoUrl: "https://logo.clearbit.com/berlinsbi.com", website: "https://berlinsbi.com",
    description: "A Berlin-based institution offering industry-relevant programs in business, creative industries, and digital marketing.", ranking: "Germany",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Academic transcripts", "IELTS 6.0+", "CV", "Motivation letter"], applyUrl: "https://www.berlinsbi.com/apply" }
  },

  // ═══════════════════════════ USA (32+) ═══════════════════════════
  {
    id: "mcphs", name: "MCPHS University", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/mcphs.edu", website: "https://mcphs.edu",
    description: "Massachusetts College of Pharmacy and Health Sciences — a leader in health sciences education.", ranking: "USA",
    applicationProcess: { pgDeadline: "Rolling admissions", requirements: ["Bachelor's degree", "TOEFL 79+ / IELTS 6.5+", "GRE (program-specific)", "Transcripts"], applyUrl: "https://www.mcphs.edu/admission" }
  },
  {
    id: "new-jersey-institute-of-technology", name: "New Jersey Institute of Technology", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/njit.edu", website: "https://njit.edu",
    description: "New Jersey's science and technology university, strong in engineering, computing, and architecture.", ranking: "Top 100 USA",
    applicationProcess: { ugDeadline: "March 1", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+", "SAT/GRE (optional)"], applyUrl: "https://www.njit.edu/admissions/" }
  },
  {
    id: "rochester-institute-of-technology", name: "Rochester Institute of Technology", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/rit.edu", website: "https://rit.edu",
    description: "A top-tier technology university known for co-op programs, computing, engineering, and design.", ranking: "Top 100 USA",
    applicationProcess: { ugDeadline: "January 15 (Early), March 1 (Regular)", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.5+", "Portfolio (design programs)"], applyUrl: "https://www.rit.edu/admissions/" }
  },
  {
    id: "university-of-arizona", name: "University of Arizona", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/arizona.edu", website: "https://arizona.edu",
    description: "A major public research university in Tucson, excelling in astronomy, optics, and environmental science.", ranking: "Top 100 USA",
    applicationProcess: { pgDeadline: "Varies by department", requirements: ["Bachelor's degree", "TOEFL 79+ / IELTS 6.5+", "GRE", "Statement of Purpose"], applyUrl: "https://grad.arizona.edu/admissions" }
  },
  {
    id: "illinois-institute-of-technology", name: "Illinois Institute of Technology", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/iit.edu", website: "https://iit.edu",
    description: "A private research university in Chicago known for engineering, architecture, and computer science.", ranking: "Top 120 USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "GRE (recommended)"], applyUrl: "https://www.iit.edu/admissions/" }
  },
  {
    id: "colorado-state-university", name: "Colorado State University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/colostate.edu", website: "https://colostate.edu",
    description: "A top public research university in Fort Collins, strong in veterinary medicine, engineering, and environmental sciences.", ranking: "Top 150 USA",
    applicationProcess: { ugDeadline: "February 1", pgDeadline: "Varies by department", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.5+", "GRE (program-specific)"], applyUrl: "https://admissions.colostate.edu/" }
  },
  {
    id: "arizona-state-university", name: "Arizona State University", country: "USA", countryFlag: "🇺🇸",
    programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/asu.edu", website: "https://asu.edu",
    description: "The #1 most innovative university in the US (US News), with schools including Fulton Engineering, W.P. Carey Business, and Thunderbird Global Management.",
    ranking: "#1 Innovation USA",
    schools: ["Fulton Schools of Engineering", "W.P. Carey School of Business (Masters)", "Thunderbird School of Global Management", "Lake Havasu (UG)", "Phoenix (UG)"],
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Varies by program", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "GRE/GMAT (program-specific)", "Statement of Purpose"], applyUrl: "https://admission.asu.edu/" }
  },
  {
    id: "pace-university", name: "Pace University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/pace.edu", website: "https://pace.edu",
    description: "A private university in New York City and Westchester known for business, health, and performing arts.", ranking: "Top 200 USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+"], applyUrl: "https://www.pace.edu/admissions/" }
  },
  {
    id: "stevens-institute-of-technology", name: "Stevens Institute of Technology", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/stevens.edu", website: "https://stevens.edu",
    description: "A premier, private research university in Hoboken, NJ with a focus on engineering, science, and management.", ranking: "Top 80 USA",
    applicationProcess: { ugDeadline: "January 15 (Regular)", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "GRE (recommended)"], applyUrl: "https://www.stevens.edu/admissions/" }
  },
  {
    id: "university-of-maryland-baltimore-county", name: "University of Maryland, Baltimore County", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/umbc.edu", website: "https://umbc.edu",
    description: "A public research university known for undergraduate teaching excellence and STEM programs.", ranking: "Top 150 USA",
    applicationProcess: { pgDeadline: "Varies by department", requirements: ["Bachelor's degree", "TOEFL 80+ / IELTS 6.5+", "GRE"], applyUrl: "https://gradschool.umbc.edu/admissions/" }
  },
  {
    id: "worcester-polytechnic-institute", name: "Worcester Polytechnic Institute", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/wpi.edu", website: "https://wpi.edu",
    description: "A top engineering and technology school in Massachusetts with a project-based learning approach.", ranking: "Top 70 USA",
    applicationProcess: { ugDeadline: "February 1", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "GRE (optional)"], applyUrl: "https://www.wpi.edu/admissions/" }
  },
  {
    id: "lehigh-university", name: "Lehigh University", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/lehigh.edu", website: "https://lehigh.edu",
    description: "A private research university in Pennsylvania with strong engineering and business programs.", ranking: "Top 50 USA",
    applicationProcess: { pgDeadline: "January 15", requirements: ["Bachelor's degree", "TOEFL 80+ / IELTS 6.5+", "GRE", "Statement of Purpose"], applyUrl: "https://www.lehigh.edu/admissions/" }
  },
  {
    id: "suny-albany", name: "SUNY Albany", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/albany.edu", website: "https://albany.edu",
    description: "A public research university in New York's Capital Region, part of the SUNY system.", ranking: "Top 200 USA",
    applicationProcess: { ugDeadline: "March 1", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.5+"], applyUrl: "https://www.albany.edu/admissions/" }
  },
  {
    id: "university-of-texas-arlington", name: "University of Texas, Arlington", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/uta.edu", website: "https://uta.edu",
    description: "A major research university in the Dallas-Fort Worth area with strong engineering and nursing programs.", ranking: "Top 200 USA",
    applicationProcess: { ugDeadline: "March 15", pgDeadline: "Varies by department", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+", "GRE (program-specific)"], applyUrl: "https://www.uta.edu/admissions/" }
  },
  {
    id: "case-western-reserve-university", name: "Case Western Reserve University", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/case.edu", website: "https://case.edu",
    description: "A top private research university in Cleveland known for Weatherhead School of Business and School of Engineering.", ranking: "Top 50 USA",
    schools: ["Weatherhead School of Business", "School of Engineering"],
    applicationProcess: { pgDeadline: "January 15", requirements: ["Bachelor's degree", "TOEFL 90+ / IELTS 7.0+", "GRE/GMAT", "Statement of Purpose"], applyUrl: "https://case.edu/admissions/" }
  },
  {
    id: "northeastern-university", name: "Northeastern University", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/northeastern.edu", website: "https://northeastern.edu",
    description: "A top-tier research university in Boston, famous for its co-op programs and experiential learning.", ranking: "Top 50 USA",
    applicationProcess: { pgDeadline: "Varies by program", requirements: ["Bachelor's degree", "TOEFL 79+ / IELTS 6.5+", "GRE (program-specific)", "Statement of Purpose"], applyUrl: "https://www.northeastern.edu/admissions/" }
  },
  {
    id: "university-of-oregon", name: "University of Oregon", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/uoregon.edu", website: "https://uoregon.edu",
    description: "Oregon's flagship public university known for journalism, education, and environmental law.", ranking: "Top 100 USA",
    applicationProcess: { pgDeadline: "Varies by department", requirements: ["Bachelor's degree", "TOEFL 88+ / IELTS 7.0+", "GRE", "Statement of Purpose"], applyUrl: "https://www.uoregon.edu/admissions/" }
  },
  {
    id: "stony-brook-university", name: "Stony Brook University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/stonybrook.edu", website: "https://stonybrook.edu",
    description: "A SUNY flagship and AAU member, strong in STEM, health sciences, and marine biology.", ranking: "Top 80 USA",
    applicationProcess: { ugDeadline: "January 15", pgDeadline: "Varies by department", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "GRE (program-specific)"], applyUrl: "https://www.stonybrook.edu/admissions/" }
  },
  {
    id: "fordham-university", name: "Fordham University", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/fordham.edu", website: "https://fordham.edu",
    description: "A prestigious Jesuit university in New York City offering graduate business degrees.", ranking: "Top 70 USA",
    applicationProcess: { pgDeadline: "Rolling admissions", requirements: ["Bachelor's degree", "TOEFL 90+ / IELTS 7.0+", "GMAT/GRE"], applyUrl: "https://www.fordham.edu/admissions/" }
  },
  {
    id: "nyu-sps", name: "New York University - School of Professional Studies", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/nyu.edu", website: "https://sps.nyu.edu",
    description: "NYU's professional studies school offering graduate programs in real estate, hospitality, management, and technology.", ranking: "Top 30 USA (NYU)",
    applicationProcess: { pgDeadline: "Rolling admissions", requirements: ["Bachelor's degree", "TOEFL 100+ / IELTS 7.0+", "Resume", "Statement of Purpose"], applyUrl: "https://www.sps.nyu.edu/homepage/admissions.html" }
  },
  {
    id: "nyu-steinhardt", name: "New York University - Steinhardt", country: "USA", countryFlag: "🇺🇸", programs: ["PG"],
    logoUrl: "https://logo.clearbit.com/nyu.edu", website: "https://steinhardt.nyu.edu",
    description: "NYU's school of culture, education, and human development, offering graduate degrees in education, health, and media.", ranking: "Top 30 USA (NYU)",
    applicationProcess: { pgDeadline: "December 1 - February 1", requirements: ["Bachelor's degree", "TOEFL 100+ / IELTS 7.0+", "GRE (program-specific)", "Portfolio (arts programs)"], applyUrl: "https://steinhardt.nyu.edu/admissions/" }
  },
  {
    id: "university-of-houston", name: "University of Houston", country: "USA", countryFlag: "🇺🇸", programs: ["UG"],
    logoUrl: "https://logo.clearbit.com/uh.edu", website: "https://uh.edu",
    description: "A leading public research university in Houston, Texas with strong engineering, business, and law programs.", ranking: "Top 200 USA",
    applicationProcess: { ugDeadline: "March 1", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+", "SAT/ACT (optional)"], applyUrl: "https://www.uh.edu/admissions/" }
  },
  {
    id: "university-of-houston-clear-lake", name: "University of Houston - Clear Lake", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/uhcl.edu", website: "https://uhcl.edu",
    description: "Located near NASA's Johnson Space Center, offering programs in business, science, and education.", ranking: "USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+"], applyUrl: "https://www.uhcl.edu/admissions/" }
  },
  {
    id: "suny-binghamton", name: "SUNY - Binghamton University", country: "USA", countryFlag: "🇺🇸", programs: ["UG"],
    logoUrl: "https://logo.clearbit.com/binghamton.edu", website: "https://binghamton.edu",
    description: "SUNY's premier public university, known as a 'Public Ivy' with excellent undergraduate programs.", ranking: "Top 80 USA",
    applicationProcess: { ugDeadline: "January 15", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "SAT/ACT (optional)", "Essay"], applyUrl: "https://www.binghamton.edu/admissions/" }
  },
  {
    id: "webster-university", name: "Webster University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/webster.edu", website: "https://webster.edu",
    description: "A global university headquartered in St. Louis with campuses worldwide, known for media and business.", ranking: "USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+"], applyUrl: "https://www.webster.edu/admissions/" }
  },
  {
    id: "lim-college", name: "LIM College", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/limcollege.edu", website: "https://limcollege.edu",
    description: "New York City's college for the business of fashion, offering fashion merchandising and marketing programs.", ranking: "USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 79+ / IELTS 6.0+", "Essay"], applyUrl: "https://www.limcollege.edu/admissions/" }
  },
  {
    id: "pittsburgh-state-university", name: "Pittsburgh State University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/pittstate.edu", website: "https://pittstate.edu",
    description: "A Kansas public university known for technology, automotive, and construction programs.", ranking: "USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 71+ / IELTS 6.0+"], applyUrl: "https://www.pittstate.edu/admission/" }
  },
  {
    id: "university-of-findlay", name: "University of Findlay", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/findlay.edu", website: "https://findlay.edu",
    description: "An Ohio private university with unique programs in animal science, pharmacy, and equestrian studies.", ranking: "USA",
    applicationProcess: { ugDeadline: "Rolling admissions", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 71+ / IELTS 6.0+"], applyUrl: "https://www.findlay.edu/admissions/" }
  },
  {
    id: "quinnipiac-university", name: "Quinnipiac University", country: "USA", countryFlag: "🇺🇸", programs: ["UG", "PG"],
    logoUrl: "https://logo.clearbit.com/quinnipiac.edu", website: "https://quinnipiac.edu",
    description: "A Connecticut private university known for health sciences, communications, and business programs.", ranking: "Top 150 USA",
    applicationProcess: { ugDeadline: "February 1", pgDeadline: "Rolling admissions", requirements: ["Transcripts", "TOEFL 80+ / IELTS 6.5+", "Essay"], applyUrl: "https://www.qu.edu/admissions/" }
  }
];

// Helper: Get universities by country
export const getUniversitiesByCountry = (country) =>
  universities.filter(u => u.country === country);

// Helper: Get university by slug
export const getUniversityById = (id) =>
  universities.find(u => u.id === id);

// Helper: Get all unique countries
export const getCountries = () =>
  [...new Set(universities.map(u => u.country))];

// Helper: Get universities offering specific program level
export const getUniversitiesByProgram = (level) =>
  universities.filter(u => u.programs.includes(level));

// Country metadata for SEO and display
export const countryMeta = {
  UK: { fullName: "United Kingdom", flag: "🇬🇧", slug: "uk", count: universities.filter(u => u.country === "UK").length },
  Ireland: { fullName: "Ireland", flag: "🇮🇪", slug: "ireland", count: universities.filter(u => u.country === "Ireland").length },
  USA: { fullName: "United States of America", flag: "🇺🇸", slug: "usa", count: universities.filter(u => u.country === "USA").length },
  Germany: { fullName: "Germany", flag: "🇩🇪", slug: "germany", count: universities.filter(u => u.country === "Germany").length },
  France: { fullName: "France", flag: "🇫🇷", slug: "france", count: universities.filter(u => u.country === "France").length },
  Finland: { fullName: "Finland", flag: "🇫🇮", slug: "finland", count: universities.filter(u => u.country === "Finland").length },
};
