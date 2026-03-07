/**
 * Static Delaware location data for instant client-side autocomplete.
 * No API call needed — this runs synchronously in the browser.
 */

import { DELAWARE_LOCATIONS } from './repliers';

// ── Types ──────────────────────────────────────────────────────────────

export interface LocationEntry {
  /** Display text, e.g. "Rehoboth Beach, DE" or "Sussex County, DE" or "19971 — Rehoboth Beach" */
  name: string;
  type: 'city' | 'county' | 'zip';
  city?: string;
  county?: string;
  zip?: string;
}

// ── Delaware ZIP codes ─────────────────────────────────────────────────

const DELAWARE_ZIPS: Record<string, { city: string; county: string }> = {
  // New Castle County
  '19701': { city: 'Bear', county: 'New Castle' },
  '19702': { city: 'Newark', county: 'New Castle' },
  '19703': { city: 'Claymont', county: 'New Castle' },
  '19706': { city: 'Delaware City', county: 'New Castle' },
  '19707': { city: 'Hockessin', county: 'New Castle' },
  '19709': { city: 'Middletown', county: 'New Castle' },
  '19710': { city: 'Montchanin', county: 'New Castle' },
  '19711': { city: 'Newark', county: 'New Castle' },
  '19713': { city: 'Newark', county: 'New Castle' },
  '19716': { city: 'Newark', county: 'New Castle' },
  '19717': { city: 'Newark', county: 'New Castle' },
  '19718': { city: 'Wilmington', county: 'New Castle' },
  '19720': { city: 'New Castle', county: 'New Castle' },
  '19721': { city: 'New Castle', county: 'New Castle' },
  '19725': { city: 'Newark', county: 'New Castle' },
  '19726': { city: 'Wilmington', county: 'New Castle' },
  '19730': { city: 'Odessa', county: 'New Castle' },
  '19731': { city: 'Port Penn', county: 'New Castle' },
  '19732': { city: 'Rockland', county: 'New Castle' },
  '19733': { city: 'Saint Georges', county: 'New Castle' },
  '19734': { city: 'Townsend', county: 'New Castle' },
  '19735': { city: 'Winterthur', county: 'New Castle' },
  '19736': { city: 'Yorklyn', county: 'New Castle' },
  '19801': { city: 'Wilmington', county: 'New Castle' },
  '19802': { city: 'Wilmington', county: 'New Castle' },
  '19803': { city: 'Wilmington', county: 'New Castle' },
  '19804': { city: 'Wilmington', county: 'New Castle' },
  '19805': { city: 'Wilmington', county: 'New Castle' },
  '19806': { city: 'Wilmington', county: 'New Castle' },
  '19807': { city: 'Wilmington', county: 'New Castle' },
  '19808': { city: 'Wilmington', county: 'New Castle' },
  '19809': { city: 'Wilmington', county: 'New Castle' },
  '19810': { city: 'Wilmington', county: 'New Castle' },
  // Kent County
  '19901': { city: 'Dover', county: 'Kent' },
  '19902': { city: 'Dover', county: 'Kent' },
  '19903': { city: 'Dover', county: 'Kent' },
  '19904': { city: 'Dover', county: 'Kent' },
  '19905': { city: 'Dover', county: 'Kent' },
  '19906': { city: 'Dover', county: 'Kent' },
  '19934': { city: 'Camden', county: 'Kent' },
  '19936': { city: 'Cheswold', county: 'Kent' },
  '19938': { city: 'Clayton', county: 'Kent' },
  '19943': { city: 'Felton', county: 'Kent' },
  '19946': { city: 'Frederica', county: 'Kent' },
  '19950': { city: 'Greenwood', county: 'Kent' },
  '19952': { city: 'Harrington', county: 'Kent' },
  '19953': { city: 'Hartly', county: 'Kent' },
  '19955': { city: 'Kenton', county: 'Kent' },
  '19958': { city: 'Lewes', county: 'Sussex' },
  '19960': { city: 'Lincoln', county: 'Kent' },
  '19961': { city: 'Little Creek', county: 'Kent' },
  '19962': { city: 'Magnolia', county: 'Kent' },
  '19963': { city: 'Milford', county: 'Kent' },
  '19964': { city: 'Marydel', county: 'Kent' },
  '19966': { city: 'Millsboro', county: 'Sussex' },
  '19967': { city: 'Millville', county: 'Sussex' },
  '19968': { city: 'Milton', county: 'Sussex' },
  '19969': { city: 'Nassau', county: 'Sussex' },
  '19970': { city: 'Ocean View', county: 'Sussex' },
  '19971': { city: 'Rehoboth Beach', county: 'Sussex' },
  '19973': { city: 'Seaford', county: 'Sussex' },
  '19975': { city: 'Selbyville', county: 'Sussex' },
  '19977': { city: 'Smyrna', county: 'Kent' },
  '19979': { city: 'Viola', county: 'Kent' },
  '19980': { city: 'Woodside', county: 'Kent' },
  // Sussex County
  '19930': { city: 'Bethany Beach', county: 'Sussex' },
  '19931': { city: 'Bethel', county: 'Sussex' },
  '19933': { city: 'Bridgeville', county: 'Sussex' },
  '19939': { city: 'Dagsboro', county: 'Sussex' },
  '19940': { city: 'Delmar', county: 'Sussex' },
  '19941': { city: 'Ellendale', county: 'Sussex' },
  '19944': { city: 'Fenwick Island', county: 'Sussex' },
  '19945': { city: 'Frankford', county: 'Sussex' },
  '19947': { city: 'Georgetown', county: 'Sussex' },
  '19951': { city: 'Harbeson', county: 'Sussex' },
  '19956': { city: 'Laurel', county: 'Sussex' },
  '19971': { city: 'Rehoboth Beach', county: 'Sussex' },
};

// ── Build flat searchable list at module load ──────────────────────────

interface ScoredEntry extends LocationEntry {
  /** Lowercase name for matching */
  _lower: string;
  /** Individual lowercase words for word-start matching */
  _words: string[];
}

const ALL_LOCATIONS: ScoredEntry[] = [];

// Add counties
for (const county of DELAWARE_LOCATIONS.counties) {
  ALL_LOCATIONS.push({
    name: `${county} County, DE`,
    type: 'county',
    county,
    _lower: `${county} county, de`.toLowerCase(),
    _words: `${county} county de`.toLowerCase().split(/\s+/),
  });
}

// Add cities
for (const [county, cities] of Object.entries(DELAWARE_LOCATIONS.cities)) {
  for (const city of cities) {
    ALL_LOCATIONS.push({
      name: `${city}, DE`,
      type: 'city',
      city,
      county,
      _lower: `${city}, de`.toLowerCase(),
      _words: `${city} de`.toLowerCase().split(/\s+/),
    });
  }
}

// Add ZIP codes
for (const [zip, info] of Object.entries(DELAWARE_ZIPS)) {
  ALL_LOCATIONS.push({
    name: `${zip} — ${info.city}, DE`,
    type: 'zip',
    zip,
    city: info.city,
    county: info.county,
    _lower: `${zip} ${info.city} de`.toLowerCase(),
    _words: [zip, ...info.city.toLowerCase().split(/\s+/), 'de'],
  });
}

// ── Search function ────────────────────────────────────────────────────

/**
 * Instantly search Delaware locations. No network call.
 *
 * Scoring:
 *   3 = query matches START of the full name
 *   2 = query matches START of any word in the name
 *   1 = query is contained anywhere in the name
 *
 * Returns at most `limit` results sorted by score desc, then alphabetically.
 */
export function searchLocations(query: string, limit = 5): LocationEntry[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 1) return [];

  const scored: { entry: LocationEntry; score: number }[] = [];

  for (const loc of ALL_LOCATIONS) {
    let score = 0;

    if (loc._lower.startsWith(q)) {
      score = 3;
    } else if (loc._words.some(w => w.startsWith(q))) {
      score = 2;
    } else if (loc._lower.includes(q)) {
      score = 1;
    }

    if (score > 0) {
      // Strip internal fields before returning
      const { _lower, _words, ...entry } = loc;
      scored.push({ entry, score });
    }
  }

  // Sort: highest score first, then alphabetically by name
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.name.localeCompare(b.entry.name);
  });

  return scored.slice(0, limit).map(s => s.entry);
}
