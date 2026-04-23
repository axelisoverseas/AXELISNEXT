// Curated portfolio of 100 top universities across the 29 countries Axelis serves.
// Logos are direct Wikimedia Commons / Wikipedia upload URLs (SVG rendered as PNG thumbs).
// Sourced via Wikipedia's REST summary API + grep of official infobox images.
// Every card has a graceful initials fallback on error (handled in LogoColumn).

export const universityLogos = [
  // United Kingdom
  { name: 'University of Oxford', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Arms_of_University_of_Oxford.svg/500px-Arms_of_University_of_Oxford.svg.png' },
  { name: 'University of Cambridge', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/3840px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png' },
  { name: 'Imperial College London', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/960px-Shield_of_Imperial_College_London.svg.png' },
  { name: 'University College London', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/UCL_Logo%2C_plain_background.svg/500px-UCL_Logo%2C_plain_background.svg.png' },
  { name: 'London School of Economics', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/London_School_of_Economics_Coat_of_Arms.svg/960px-London_School_of_Economics_Coat_of_Arms.svg.png' },
  { name: 'University of Edinburgh', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/University_of_Edinburgh_ceremonial_roundel.svg/330px-University_of_Edinburgh_ceremonial_roundel.svg.png' },
  { name: 'University of Manchester', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Arms_of_the_University_of_Manchester.svg/1920px-Arms_of_the_University_of_Manchester.svg.png' },
  { name: 'University of Bristol', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Shield_of_the_University_of_Bristol.svg/3840px-Shield_of_the_University_of_Bristol.svg.png' },
  { name: 'University of Warwick', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Warwick_University_Shield.svg/960px-Warwick_University_Shield.svg.png' },
  { name: 'Cardiff University', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shield_of_the_University_of_Cardiff.svg/3840px-Shield_of_the_University_of_Cardiff.svg.png' },
  { name: 'University of Strathclyde', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/University_of_Strathclyde_arms.svg/960px-University_of_Strathclyde_arms.svg.png' },
  { name: 'King\'s College London', country: 'United Kingdom', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/King%27s_College%2C_London_full_achievement.svg/1280px-King%27s_College%2C_London_full_achievement.svg.png' },

  // United States
  { name: 'Harvard University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/330px-Harvard_University_coat_of_arms.svg.png' },
  { name: 'Massachusetts Institute of Technology', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/330px-MIT_Seal.svg.png' },
  { name: 'Stanford University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/960px-Seal_of_Leland_Stanford_Junior_University.svg.png' },
  { name: 'Yale University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/330px-Yale_University_Shield_1.svg.png' },
  { name: 'Princeton University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/330px-Princeton_seal.svg.png' },
  { name: 'Columbia University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Coat_of_Arms_of_Columbia_University.svg/330px-Coat_of_Arms_of_Columbia_University.svg.png' },
  { name: 'University of Pennsylvania', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/250px-UPenn_shield_with_banner.svg.png' },
  { name: 'UC Berkeley', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/960px-Seal_of_University_of_California%2C_Berkeley.svg.png' },
  { name: 'New York University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/New_York_University_Seal.svg/250px-New_York_University_Seal.svg.png' },
  { name: 'University of Southern California', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/University_of_Southern_California_%28USC%29_seal.svg/120px-University_of_Southern_California_%28USC%29_seal.svg.png' },
  { name: 'Northwestern University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Northwestern_University_seal.svg/250px-Northwestern_University_seal.svg.png' },
  { name: 'Cornell University', country: 'United States', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/120px-Cornell_University_seal.svg.png' },

  // Canada
  { name: 'University of Toronto', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/250px-Utoronto_coa.svg.png' },
  { name: 'McGill University', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/330px-McGill_University_CoA.svg.png' },
  { name: 'University of British Columbia', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/British_columbia_univ_coat_arms.svg/330px-British_columbia_univ_coat_arms.svg.png' },
  { name: 'University of Waterloo', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/250px-University_of_Waterloo_seal.svg.png' },
  { name: 'University of Alberta', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/9/92/University_of_Alberta_Coat_of_Arms.png' },
  { name: 'McMaster University', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/McMaster_University_logo.svg/500px-McMaster_University_logo.svg.png' },
  { name: 'Queen\'s University', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/QueensU_Crest.svg/250px-QueensU_Crest.svg.png' },
  { name: 'University of Ottawa', country: 'Canada', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Uottawacoa.svg/250px-Uottawacoa.svg.png' },

  // Australia
  { name: 'University of Melbourne', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/The_University_of_Melbourne_Coat_of_Arms.svg/500px-The_University_of_Melbourne_Coat_of_Arms.svg.png' },
  { name: 'University of Sydney', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/University_of_Sydney_coat_of_arms.png' },
  { name: 'Australian National University', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Australian_National_University_coat_of_arms.svg/250px-Australian_National_University_coat_of_arms.svg.png' },
  { name: 'UNSW Sydney', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_New_South_Wales_Crest_Variant_2022.png' },
  { name: 'University of Queensland', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/University_of_Queensland_%28crest%29.svg/330px-University_of_Queensland_%28crest%29.svg.png' },
  { name: 'Monash University', country: 'Australia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Arms_of_Monash_University.svg/4096px-Arms_of_Monash_University.svg.png' },

  // Germany
  { name: 'Technical University of Munich', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_the_Technical_University_of_Munich.svg/500px-Logo_of_the_Technical_University_of_Munich.svg.png' },
  { name: 'LMU Munich', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Sigillum_Universitatis_Ludovico-Maximilianeae.svg/960px-Sigillum_Universitatis_Ludovico-Maximilianeae.svg.png' },
  { name: 'Heidelberg University', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_University_of_Heidelberg.svg/1920px-Logo_University_of_Heidelberg.svg.png' },
  { name: 'Humboldt University of Berlin', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Huberlin-logo.svg/960px-Huberlin-logo.svg.png' },
  { name: 'RWTH Aachen', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/SuperC_-_bei_Nacht.jpg' },
  { name: 'Freie Universität Berlin', country: 'Germany', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Seal_of_Free_University_of_Berlin.svg/330px-Seal_of_Free_University_of_Berlin.svg.png' },

  // France
  { name: 'Sorbonne Université', country: 'France', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Sorbonne_University_Logo.svg/250px-Sorbonne_University_Logo.svg.png' },
  { name: 'Sciences Po', country: 'France', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Paris_Institute_of_Political_Studies.png' },
  { name: 'PSL University', country: 'France', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/LOGO-PSL-nov-2017.jpg' },
  { name: 'Université Paris-Saclay', country: 'France', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Ch%C3%A2teau_de_Launay%2C_Universit%C3%A9_Paris-Saclay%2C_Orsay%2C_France.jpg' },
  { name: 'École Polytechnique', country: 'France', image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/POLYTECHNIQUE-IP_PARIS.png' },

  // Ireland
  { name: 'Trinity College Dublin', country: 'Ireland', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/The_entrance_of_the_historic_Trinity_College_%28Unsplash%29.jpg' },
  { name: 'University College Dublin', country: 'Ireland', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_College_Dublin_logo.svg/60px-University_College_Dublin_logo.svg.png' },
  { name: 'University College Cork', country: 'Ireland', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/County_Cork_-_University_College_Cork_-_20190125141016.jpg' },
  { name: 'University of Galway', country: 'Ireland', image: 'https://upload.wikimedia.org/wikipedia/en/7/79/University_of_Galway_logo_2022.png' },
  { name: 'Dublin City University', country: 'Ireland', image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Dublin_City_University_%28logo%29.png' },

  // Netherlands
  { name: 'University of Amsterdam', country: 'Netherlands', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amsterdamuniversitylogo.svg/500px-Amsterdamuniversitylogo.svg.png' },
  { name: 'Utrecht University', country: 'Netherlands', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Utrecht_University_logo.svg/330px-Utrecht_University_logo.svg.png' },
  { name: 'TU Delft', country: 'Netherlands', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Zegel_Technische_Universiteit_Delft.svg/960px-Zegel_Technische_Universiteit_Delft.svg.png' },
  { name: 'Leiden University', country: 'Netherlands', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Leiden_University_seal.svg/330px-Leiden_University_seal.svg.png' },
  { name: 'Erasmus University Rotterdam', country: 'Netherlands', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Erasmus_University_Rotterdam_Stacked_logo_%28Colour%29.png' },

  // Finland
  { name: 'University of Helsinki', country: 'Finland', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/University_of_Helsinki.svg/250px-University_of_Helsinki.svg.png' },
  { name: 'Aalto University', country: 'Finland', image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Aalto_University_logo_tri-lingual_version.png' },
  { name: 'Tampere University', country: 'Finland', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Tampere_University_logo.svg/500px-Tampere_University_logo.svg.png' },

  // Italy
  { name: 'University of Bologna', country: 'Italy', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Seal_of_the_University_of_Bologna.svg/1920px-Seal_of_the_University_of_Bologna.svg.png' },
  { name: 'Politecnico di Milano', country: 'Italy', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Polytechnic_University_of_Milan_logo.svg/500px-Polytechnic_University_of_Milan_logo.svg.png' },
  { name: 'Bocconi University', country: 'Italy', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Bocconi_University_seal.svg/330px-Bocconi_University_seal.svg.png' },
  { name: 'Sapienza University of Rome', country: 'Italy', image: 'https://upload.wikimedia.org/wikipedia/en/4/45/Sapienza_University_of_Rome.png' },

  // Austria
  { name: 'University of Vienna', country: 'Austria', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Seal_of_the_University_of_Vienna.svg/960px-Seal_of_the_University_of_Vienna.svg.png' },
  { name: 'TU Wien', country: 'Austria', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/TU_Signet_CMYK.svg/330px-TU_Signet_CMYK.svg.png' },

  // Sweden
  { name: 'Lund University', country: 'Sweden', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Lunds_universitet.svg/330px-Lunds_universitet.svg.png' },
  { name: 'Uppsala University', country: 'Sweden', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Uppsala_University_logo.svg/120px-Uppsala_University_logo.svg.png' },
  { name: 'KTH Royal Institute of Technology', country: 'Sweden', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/KTH_Royal_Institute_of_Technology_logo.svg/330px-KTH_Royal_Institute_of_Technology_logo.svg.png' },
  { name: 'Chalmers University of Technology', country: 'Sweden', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Formal_Seal_of_Chalmers_tekniska_h%C3%B6gskola%2C_G%C3%B6teborg%2C_V%C3%A4stra_G%C3%B6talands_l%C3%A4n%2C_Sverige.svg/330px-Formal_Seal_of_Chalmers_tekniska_h%C3%B6gskola%2C_G%C3%B6teborg%2C_V%C3%A4stra_G%C3%B6talands_l%C3%A4n%2C_Sverige.svg.png' },

  // Norway
  { name: 'University of Oslo', country: 'Norway', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/University_of_Oslo_seal.svg/330px-University_of_Oslo_seal.svg.png' },
  { name: 'NTNU', country: 'Norway', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/NTNU_Trondheim_Mainbuilding.jpg' },

  // Denmark
  { name: 'University of Copenhagen', country: 'Denmark', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ku-ucph-logo-svg.svg/500px-Ku-ucph-logo-svg.svg.png' },
  { name: 'Aarhus University', country: 'Denmark', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Aarhus_University_seal.svg/330px-Aarhus_University_seal.svg.png' },
  { name: 'Technical University of Denmark', country: 'Denmark', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Danmarks_Tekniske_Universitet_%28logo%29.svg/500px-Danmarks_Tekniske_Universitet_%28logo%29.svg.png' },

  // Spain
  { name: 'University of Barcelona', country: 'Spain', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Coat_of_Arms_of_the_University_of_Barcelona.svg/330px-Coat_of_Arms_of_the_University_of_Barcelona.svg.png' },
  { name: 'IE University', country: 'Spain', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/IE_University_logo.svg/330px-IE_University_logo.svg.png' },
  { name: 'Autonomous University of Madrid', country: 'Spain', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Escudo_de_la_Universidad_Aut%C3%B3noma_de_Madrid.svg/1280px-Escudo_de_la_Universidad_Aut%C3%B3noma_de_Madrid.svg.png' },

  // Switzerland
  { name: 'ETH Zürich', country: 'Switzerland', image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/ETH_Z%C3%BCrich_-_Hauptgeb%C3%A4ude_-_Unispital_2012-07-30_07-57-03_ShiftN.jpg' },
  { name: 'EPFL', country: 'Switzerland', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/EPFL_campus_2017.jpg' },
  { name: 'University of Zurich', country: 'Switzerland', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Zurich_seal.svg/250px-University_of_Zurich_seal.svg.png' },

  // New Zealand
  { name: 'University of Auckland', country: 'New Zealand', image: 'https://upload.wikimedia.org/wikipedia/en/a/ac/University_of_Auckland_Coat_of_Arms.png' },
  { name: 'University of Otago', country: 'New Zealand', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Arms_of_the_University_of_Otago.svg/960px-Arms_of_the_University_of_Otago.svg.png' },

  // Singapore
  { name: 'National University of Singapore', country: 'Singapore', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/250px-NUS_coat_of_arms.svg.png' },
  { name: 'Nanyang Technological University', country: 'Singapore', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Nanyang_Technological_University_coat_of_arms_vector.svg/120px-Nanyang_Technological_University_coat_of_arms_vector.svg.png' },

  // Hong Kong
  { name: 'University of Hong Kong', country: 'Hong Kong', image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/University_of_Hong_Kong_coat_of_arms.png' },
  { name: 'HKUST', country: 'Hong Kong', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Hong_Kong_University_of_Science_and_Technology_symbol.svg/330px-Hong_Kong_University_of_Science_and_Technology_symbol.svg.png' },
  { name: 'Chinese University of Hong Kong', country: 'Hong Kong', image: 'https://upload.wikimedia.org/wikipedia/en/0/09/CUHK_Coat_of_Arms.png' },

  // Japan
  { name: 'University of Tokyo', country: 'Japan', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/2024_Yasuda_Auditorium_-_Tokyo_University.jpg' },
  { name: 'Kyoto University', country: 'Japan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Kyoto_University_emblem.svg/500px-Kyoto_University_emblem.svg.png' },

  // Malaysia
  { name: 'University of Malaya', country: 'Malaysia', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/University_of_Malaya_logo.svg/250px-University_of_Malaya_logo.svg.png' },
  { name: 'Taylor\'s University', country: 'Malaysia', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Logo_of_Taylor%27s_University.svg/500px-Logo_of_Taylor%27s_University.svg.png' },

  // UAE
  { name: 'NYU Abu Dhabi', country: 'UAE', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/NYU_Abu_Dhabi_logo.svg/500px-NYU_Abu_Dhabi_logo.svg.png' },
  { name: 'Heriot-Watt University Dubai', country: 'UAE', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Heriot-Watt_University_arms.svg/960px-Heriot-Watt_University_arms.svg.png' },

  // Belgium
  { name: 'KU Leuven', country: 'Belgium', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/KUL.svg/1280px-KUL.svg.png' },
  { name: 'Ghent University', country: 'Belgium', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Braemtzegel.png' },

  // Poland
  { name: 'University of Warsaw', country: 'Poland', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/POL_University_of_Warsaw_logo.svg/330px-POL_University_of_Warsaw_logo.svg.png' },
  { name: 'Jagiellonian University', country: 'Poland', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/POL_Jagiellonian_University_logo.svg/120px-POL_Jagiellonian_University_logo.svg.png' },

  // Czech Republic
  { name: 'Charles University', country: 'Czech Republic', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Charles-University-symbol-4.svg/330px-Charles-University-symbol-4.svg.png' },

  // Hungary
  { name: 'Central European University', country: 'Hungary', image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/CEU_Primary-Logo_RGB_DualColor.png' },
  { name: 'Eötvös Loránd University', country: 'Hungary', image: 'https://upload.wikimedia.org/wikipedia/en/a/af/ELTE_logo.png' },

  // Lithuania
  { name: 'Vilnius University', country: 'Lithuania', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Vilnius_university_logo.svg/120px-Vilnius_university_logo.svg.png' },

  // Cyprus
  { name: 'University of Cyprus', country: 'Cyprus', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/University_of_Cyprus.svg/120px-University_of_Cyprus.svg.png' },

];

export default universityLogos;
