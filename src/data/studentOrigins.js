// ============================================================================
// WHERE AXELIS STUDENTS ACTUALLY COME FROM
// ============================================================================
//
// Read from the Agentcis client records on 3 October 2026: 205 clients, 148 of
// them with a home city on file, resolving to 40 distinct cities.
//
// This exists so the city pages can show reach without inventing it. Every name
// below is a city a real Axelis student came from. No student is named, so
// there is no consent question; the claim is aggregate and checkable against
// Agentcis.
//
// DO NOT add a city here to make a page look better. The whole value of this
// list is that it is true -- an invented origin would be misleading advertising
// under the Consumer Protection Act 2019, and it would undercut the one thing
// the brand actually sells, which is that the published numbers are real.
//
// Refresh: query /clients/list in Agentcis and re-derive. Update CAPTURED_ON.
// ============================================================================

export const CAPTURED_ON = 'October 2026';

export const TOTAL_CITIES = 40;

// The two cities with an Axelis office are excluded from NON_METRO on purpose:
// the point of the list is reach beyond where we have premises.
export const NON_METRO_ORIGINS = [
  'Amaravati', 'Barabanki', 'Baran', 'Bareilly', 'Bhilai', 'Bhopal',
  'Charkhi Dadri', 'Eluru', 'Gandhinagar', 'Guntur', 'Indore', 'Jaipur',
  'Jamshedpur', 'Kanpur', 'Lucknow', 'Malegaon', 'Mehsana', 'Nagpur',
  'Nashik', 'Panipat', 'Panvel', 'Raigarh', 'Raipur', 'Rajkot', 'Ratlam',
  'Sangli', 'Surat', 'Tirupati', 'Varanasi', 'Vijayawada', 'Visakhapatnam',
];

/**
 * A handful of genuinely small-town origins, for the proof line on a city page.
 * Picked for being unmistakably tier 3-4 rather than for sounding impressive.
 * Excludes the city being viewed, so a Ratlam page does not cite Ratlam.
 */
export const smallTownProof = (exclude, n = 6) =>
  ['Charkhi Dadri', 'Baran', 'Barabanki', 'Ratlam', 'Eluru', 'Raigarh',
   'Malegaon', 'Panipat', 'Sangli', 'Mehsana']
    .filter((c) => c.toLowerCase() !== String(exclude || '').toLowerCase())
    .slice(0, n);
