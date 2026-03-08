import { NextRequest, NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';

/**
 * GET /api/similar-homes?mlsId=...&zip=...&sqft=...&lat=...&lng=...&limit=6
 *
 * Searches Repliers for similar homes:
 *  - Same zip code, active listings
 *  - Within +/- 500 sqft of the subject property
 *  - Excludes the current listing (by mlsId)
 *  - If lat/lng provided, sorts by proximity and filters to ~1 mile
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mlsId = searchParams.get('mlsId') || '';
  const zip = searchParams.get('zip') || '';
  const city = searchParams.get('city') || '';
  const sqft = parseInt(searchParams.get('sqft') || '0', 10);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const limit = parseInt(searchParams.get('limit') || '6', 10);

  if (!zip && !city) {
    return NextResponse.json({ homes: [], total: 0, error: 'zip or city is required' });
  }

  const SQFT_RANGE = 500;
  const minSqft = sqft > SQFT_RANGE ? sqft - SQFT_RANGE : 0;
  const maxSqft = sqft > 0 ? sqft + SQFT_RANGE : undefined;

  try {
    // Search by zip code first, with sqft range, active listings only
    const response = await searchListings({
      zip: zip || undefined,
      city: !zip ? city : undefined,
      status: 'A',
      minSqft: minSqft || undefined,
      maxSqft,
      resultsPerPage: 50, // Fetch enough to filter & rank
      page: 1,
    });

    if (!response.listings || response.listings.length === 0) {
      // Fallback: search by city if zip returned nothing
      if (zip && city) {
        const fallback = await searchListings({
          city,
          status: 'A',
          minSqft: minSqft || undefined,
          maxSqft,
          resultsPerPage: 50,
          page: 1,
        });

        if (!fallback.listings || fallback.listings.length === 0) {
          return NextResponse.json({ homes: [], total: 0 });
        }

        const homes = fallback.listings
          .filter(l => l.mlsNumber !== mlsId)
          .map(transformListing);

        return NextResponse.json({
          homes: homes.slice(0, limit),
          total: homes.length,
        });
      }

      return NextResponse.json({ homes: [], total: 0 });
    }

    // Exclude current listing
    let filtered = response.listings.filter(l => l.mlsNumber !== mlsId);

    // If lat/lng provided, calculate distances and filter to ~1 mile
    if (lat && lng) {
      const withDistance = filtered
        .filter(l => l.map?.latitude && l.map?.longitude)
        .map(l => ({
          listing: l,
          distance: getDistanceMiles(lat, lng, l.map!.latitude!, l.map!.longitude!),
        }))
        .filter(item => item.distance <= 1.0) // within 1 mile
        .sort((a, b) => a.distance - b.distance);

      // Also include any without coordinates (so we don't lose listings)
      const withoutCoords = filtered.filter(l => !l.map?.latitude || !l.map?.longitude);

      filtered = [
        ...withDistance.map(item => item.listing),
        ...withoutCoords,
      ];
    }

    const homes = filtered.map(transformListing);

    return NextResponse.json({
      homes: homes.slice(0, limit),
      total: homes.length,
    });
  } catch (error) {
    console.error('[Similar Homes API] Error:', error);
    return NextResponse.json({ homes: [], total: 0, error: 'Failed to fetch similar homes' });
  }
}

/**
 * Calculate distance between two lat/lng points in miles using Haversine formula
 */
function getDistanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
