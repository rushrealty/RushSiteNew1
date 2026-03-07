import { NextRequest, NextResponse } from 'next/server';
import { fetchInventoryData } from '@/lib/inventory';
import type { AutocompletePrediction, AutocompleteApiResponse } from '@/lib/autocomplete-types';

const REPLIERS_API_URL = 'https://api.repliers.io';

// ── Repliers MLS listing search ────────────────────────────────────────

async function fetchRepliersListings(query: string): Promise<AutocompletePrediction[]> {
  try {
    const url = new URL(`${REPLIERS_API_URL}/listings`);
    url.searchParams.append('search', query);
    url.searchParams.append(
      'searchFields',
      'address.streetNumber,address.streetName,address.streetSuffix,mlsNumber,address.city,address.zip,address.neighborhood'
    );
    url.searchParams.append('fields', 'address.*,mlsNumber,listPrice');
    url.searchParams.append('state', 'DE');
    url.searchParams.append('status', 'A');
    url.searchParams.append('resultsPerPage', '8');

    const response = await fetch(url.toString(), {
      headers: {
        'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const listings = data.listings || [];

    return listings
      .map(
        (listing: {
          mlsNumber?: string;
          listPrice?: string | number;
          address?: {
            streetNumber?: string;
            streetName?: string;
            streetSuffix?: string;
            city?: string;
            state?: string;
            zip?: string;
            neighborhood?: string;
            area?: string;
          };
        }) => {
          const addr = listing.address || {};
          const street = [addr.streetNumber, addr.streetName, addr.streetSuffix]
            .filter(Boolean)
            .join(' ');
          const cityState = [addr.city, addr.state].filter(Boolean).join(', ');
          const fullAddress = [street, cityState].filter(Boolean).join(', ');

          return {
            description: fullAddress || listing.mlsNumber || '',
            type: 'property' as const,
            city: addr.city,
            area: addr.area,
            neighborhood: addr.neighborhood,
            zip: addr.zip,
            mlsNumber: listing.mlsNumber,
            listPrice: listing.listPrice?.toString(),
          };
        }
      )
      .filter((p: AutocompletePrediction) => p.description);
  } catch (error) {
    console.error('Repliers listings autocomplete error:', error);
    return [];
  }
}

// ── Google Sheets search (communities + inventory) ─────────────────────

async function fetchSheetResults(query: string) {
  const data = await fetchInventoryData();

  const communities: AutocompletePrediction[] = data.communities
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.county.toLowerCase().includes(query)
    )
    .slice(0, 4)
    .map((c) => ({
      description: c.name,
      type: 'community' as const,
      city: c.city,
      county: c.county,
      area: c.county,
      communityId: c.id,
      communityData: c,
    }));

  const inventory: AutocompletePrediction[] = data.homes
    .filter(
      (h) =>
        h.address.toLowerCase().includes(query) ||
        h.communityId.toLowerCase().includes(query) ||
        h.modelName.toLowerCase().includes(query)
    )
    .slice(0, 3)
    .map((h) => ({
      description: h.address,
      type: 'inventory' as const,
      inventoryId: h.id,
      inventoryData: h,
    }));

  return { communities, inventory };
}

// ── Route handler ──────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim().toLowerCase() || '';

  if (!query || query.length < 2) {
    return NextResponse.json({ properties: [], communities: [] } satisfies AutocompleteApiResponse);
  }

  try {
    // Run Repliers + Google Sheets concurrently
    const [listings, sheets] = await Promise.all([
      fetchRepliersListings(query),
      fetchSheetResults(query),
    ]);

    // Merge communities and inventory into one "communities" bucket for the client
    const communityResults = [...sheets.communities, ...sheets.inventory].slice(0, 5);

    const response: AutocompleteApiResponse = {
      properties: listings.slice(0, 6),
      communities: communityResults,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Autocomplete error:', error);
    return NextResponse.json({ properties: [], communities: [] } satisfies AutocompleteApiResponse);
  }
}
