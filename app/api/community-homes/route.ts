import { NextRequest, NextResponse } from 'next/server';
import { searchListings } from '@/lib/repliers';
import { fetchInventoryData } from '@/lib/inventory';
import { normalizeAddress } from '@/lib/utils';
import { buildAddressString, transformRepliersListing } from '@/lib/listing-utils';

export async function GET(request: NextRequest) {
  try {
    const community = request.nextUrl.searchParams.get('community'); // Community name
    const type = request.nextUrl.searchParams.get('type'); // 'new-construction' | 'quick-move-in'

    // Fetch from Repliers and Google Sheet
    const [repliersResponse, inventoryData] = await Promise.all([
      searchListings({ status: 'A', resultsPerPage: 100 }),
      fetchInventoryData(),
    ]);

    // Build sheet address set for QMI detection
    const sheetAddressSet = new Set(
      inventoryData.homes.map(h => normalizeAddress(h.address))
    );

    if (type === 'new-construction') {
      // Filter for new construction homes NOT in sheet (NOT quick move-ins)
      // These are "to be built" homes that can be customized
      const homes = repliersResponse.listings.filter(listing => {
        const status = listing.details.constructionStatus;
        if (!status) return false; // Not new construction

        // Must be under construction or proposed
        const isUnderConstruction = ['under construction', 'proposed'].includes(status.toLowerCase());
        if (!isUnderConstruction) return false;

        // Must NOT be in Google Sheet (that would make it a QMI)
        const normalizedAddr = normalizeAddress(buildAddressString(listing.address));
        return !sheetAddressSet.has(normalizedAddr);
      });

      // Filter by community name (match neighborhood or area field)
      const communityHomes = community
        ? homes.filter(h => {
            const neighborhood = h.address.neighborhood?.toLowerCase() || '';
            const area = h.address.area?.toLowerCase() || '';
            const communityLower = community.toLowerCase();
            return neighborhood.includes(communityLower) || area.includes(communityLower);
          })
        : homes;

      return NextResponse.json({
        homes: communityHomes.map(transformRepliersListing),
        total: communityHomes.length,
      });
    }

    // Default: return empty
    return NextResponse.json({ homes: [], total: 0 });
  } catch (error) {
    console.error('Error fetching community homes:', error);
    return NextResponse.json({
      homes: [],
      total: 0,
      error: 'Failed to fetch community homes',
    });
  }
}
