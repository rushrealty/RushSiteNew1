import { Property, PropertyStatus } from '@/types';
import { RepliersListing, EnrichedInventoryHome } from './inventory-types';
import { searchListings } from './repliers';
import { fetchInventoryData } from './inventory';
import { normalizeAddress } from './utils';

export interface QuickMoveInResult {
  homes: Property[];
  fromRepliers: number;
  fromSheet: number;
  total: number;
}

export interface QuickMoveInOptions {
  limit?: number;
  featuredOnly?: boolean;
  includeAll?: boolean; // Include all available homes (QMI first, then others)
  communityId?: string; // Filter by community ID
}

/**
 * Check if a listing qualifies as a Quick Move-In
 * @param listing The Repliers listing
 * @param isInGoogleSheet Whether the address exists in the Google Sheet
 */
function isQuickMoveIn(
  listing: RepliersListing,
  isInGoogleSheet: boolean
): boolean {
  const status = listing.details.constructionStatus;

  // If constructionStatus is null, it's not new construction
  if (!status) return false;

  // If construction is complete, it's a Quick Move-In
  if (status.toLowerCase() === 'complete') return true;

  // If under construction but in Google Sheet, it's still a Quick Move-In
  if (
    ['under construction', 'proposed'].includes(status.toLowerCase()) &&
    isInGoogleSheet
  ) {
    return true;
  }

  return false;
}

/**
 * Build full address string from Repliers address object
 */
function buildAddressString(address: RepliersListing['address']): string {
  const parts = [
    address.streetNumber,
    address.streetName,
    address.streetSuffix,
  ].filter(Boolean);

  return parts.join(' ');
}

/**
 * Map construction status to PropertyStatus
 */
function mapConstructionStatus(status?: string): PropertyStatus {
  if (!status) return PropertyStatus.MOVE_IN_READY;

  const lower = status.toLowerCase();
  if (lower === 'complete') return PropertyStatus.MOVE_IN_READY;
  if (lower === 'under construction') return PropertyStatus.UNDER_CONSTRUCTION;
  if (lower === 'proposed') return PropertyStatus.TO_BE_BUILT;

  return PropertyStatus.MOVE_IN_READY;
}

/**
 * Map inventory status to PropertyStatus
 */
function mapInventoryStatus(status: string): PropertyStatus {
  switch (status) {
    case 'Available':
      return PropertyStatus.MOVE_IN_READY;
    case 'Coming Soon':
      return PropertyStatus.TO_BE_BUILT;
    case 'Under Contract':
      return PropertyStatus.UNDER_CONSTRUCTION;
    default:
      return PropertyStatus.MOVE_IN_READY;
  }
}

/**
 * Transform a Repliers listing to a Property
 */
function transformRepliersListing(listing: RepliersListing, isQMI: boolean = false): Property {
  const address = buildAddressString(listing.address);
  const status = mapConstructionStatus(listing.details.constructionStatus);

  return {
    id: listing.mlsNumber,
    title: `${listing.details.bedrooms} Bed ${listing.details.propertyType || 'Home'}`,
    price: listing.listPrice,
    address,
    city: listing.address.city,
    state: listing.address.state || 'DE',
    zip: listing.address.zip,
    county: listing.address.area || '',
    beds: listing.details.bedrooms,
    baths: listing.details.bathrooms,
    sqft: listing.details.sqft || 0,
    lotSize: listing.details.lotSize || '',
    yearBuilt: listing.details.yearBuilt || new Date().getFullYear(),
    builder: '',
    community: listing.address.neighborhood || '',
    status,
    description: listing.details.description || '',
    images: listing.images || [],
    features: [],
    heating: '',
    cooling: '',
    parking: listing.details.garage ? `${listing.details.garage} Car Garage` : '',
    basement: '',
    hoaFee: 0,
    taxAssessment: 0,
    schools: [],
    isQuickMoveIn: isQMI, // Set based on construction status check
    mlsId: listing.mlsNumber,
    listingAgent: listing.agent?.name || '',
    listingAgentPhone: listing.agent?.phone || '',
    listingBrokerage: listing.office?.name || '',
    brokeragePhone: listing.office?.phone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    priceHistory: isQMI ? [] : [], // Price history would come from API if needed
  };
}

/**
 * Transform an inventory home to a Property
 */
function transformInventoryHome(home: EnrichedInventoryHome): Property {
  const status = mapInventoryStatus(home.status);

  // Build images array - use home photo first, fall back to community model photos
  let images: string[] = [];
  if (home.photoUrl) {
    images = [home.photoUrl];
  } else if (home.community?.modelPhotos && home.community.modelPhotos.length > 0) {
    // Use community model photos as fallback
    images = home.community.modelPhotos;
  }

  return {
    id: home.id,
    title: home.modelName || `${home.beds} Bed Home`,
    price: home.price,
    address: home.address,
    city: home.community?.city || '',
    state: 'DE',
    zip: '',
    county: home.community?.county || '',
    beds: home.beds,
    baths: home.baths,
    sqft: home.sqft,
    lotSize: '', // Lot dimensions not available from inventory sheet
    lotNumber: home.lot ? `Lot ${home.lot}` : undefined,
    yearBuilt: new Date().getFullYear(),
    builder: home.builder?.name || '',
    community: home.community?.name || '',
    status,
    description: home.description || '',
    images,
    features: [],
    heating: '',
    cooling: '',
    parking: home.garage ? `${home.garage} Car Garage` : '',
    basement: '',
    hoaFee: 0,
    taxAssessment: 0,
    schools: [],
    completionDate: home.moveInDate,
    featured: home.featured,
    isQuickMoveIn: true, // Sheet homes are always quick move-in
    mlsId: home.mlsNumber || '',
    listingAgent: 'Rush Home Team',
    listingAgentPhone: '302-219-6707',
    listingBrokerage: 'Compass RE',
    brokeragePhone: '302-219-6707',
    lastUpdated: new Date().toISOString(),
    priceHistory: [], // No price history for quick move-in homes
  };
}

/**
 * Get Quick Move-In listings from both Repliers and Google Sheet
 * Implements the business logic:
 * - Repliers data supersedes Google Sheet when addresses match
 * - Quick Move-In = (new construction + complete) OR (new construction + incomplete + in sheet)
 */
export async function getQuickMoveInListings(
  options: QuickMoveInOptions = {}
): Promise<QuickMoveInResult> {
  try {
    // Fetch from both sources in parallel
    const [repliersResponse, inventoryData] = await Promise.all([
      searchListings({
        status: 'A',
        resultsPerPage: 100,
      }),
      fetchInventoryData(),
    ]);

    // Build Google Sheet address lookup set (normalized)
    const sheetAddressSet = new Set(
      inventoryData.homes.map((h) => normalizeAddress(h.address))
    );

    // Create lookup maps for enrichment
    const communitiesMap = new Map(inventoryData.communities.map((c) => [c.id, c]));
    const buildersMap = new Map(inventoryData.builders.map((b) => [b.id, b]));

    // Filter Repliers listings for Quick Move-Ins
    const repliersQMIs: Property[] = [];
    const repliersAddressSet = new Set<string>();

    for (const listing of repliersResponse.listings) {
      const normalizedAddr = normalizeAddress(buildAddressString(listing.address));
      const inSheet = sheetAddressSet.has(normalizedAddr);

      if (isQuickMoveIn(listing, inSheet)) {
        repliersQMIs.push(transformRepliersListing(listing, true));
        repliersAddressSet.add(normalizedAddr);
      }
    }

    // Get Sheet-only homes (not in Repliers)
    const sheetOnlyHomes: Property[] = inventoryData.homes
      .filter((home) => {
        // Skip if already in Repliers
        const normalizedAddr = normalizeAddress(home.address);
        if (repliersAddressSet.has(normalizedAddr)) return false;

        // Skip if it has an MLS number (should be in Repliers)
        if (home.mlsNumber) return false;

        // Include all inventory homes that aren't in Repliers
        return true;
      })
      .map((home) => {
        const community = communitiesMap.get(home.communityId);
        const builder = community ? buildersMap.get(community.builderId) : undefined;

        return transformInventoryHome({
          ...home,
          community,
          builder,
        });
      });

    // Merge homes based on options
    let homes: Property[];

    if (options.includeAll) {
      // Get all other Repliers listings that are NOT Quick Move-Ins
      // Exclude: new construction that isn't built (Under Construction/Proposed NOT in sheet)
      const otherListings = repliersResponse.listings
        .filter((listing) => {
          const normalizedAddr = normalizeAddress(buildAddressString(listing.address));
          // Skip if already included as QMI
          if (repliersAddressSet.has(normalizedAddr)) return false;

          const status = listing.details.constructionStatus;
          // Include if NOT new construction (status is null)
          if (!status) return true;
          // Include if construction is complete
          if (status.toLowerCase() === 'complete') return true;
          // Exclude unbuilt new construction not in sheet
          return false;
        })
        .map((listing) => transformRepliersListing(listing, false));

      // QMI homes first, then sheet homes, then other available homes
      homes = [...repliersQMIs, ...sheetOnlyHomes, ...otherListings];
    } else {
      // Original behavior: QMI homes only
      homes = [...repliersQMIs, ...sheetOnlyHomes];
    }

    // Apply filters
    if (options.featuredOnly) {
      // Filter to only featured homes from inventory
      homes = homes.filter((h) => h.featured === true);
    }

    // Filter by community ID if provided
    if (options.communityId) {
      // Look up community name from ID for matching
      const targetCommunity = communitiesMap.get(options.communityId);
      const communityName = targetCommunity?.name;

      homes = homes.filter((h) => {
        // Match by community name (case-insensitive)
        if (communityName && h.community) {
          return h.community.toLowerCase() === communityName.toLowerCase();
        }
        return false;
      });
    }

    // Sort: featured homes first, then by price (lowest first)
    homes.sort((a, b) => {
      // Featured homes come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by price
      return a.price - b.price;
    });

    // Apply limit
    if (options.limit && options.limit > 0) {
      homes = homes.slice(0, options.limit);
    }

    return {
      homes,
      fromRepliers: repliersQMIs.length,
      fromSheet: sheetOnlyHomes.length,
      total: homes.length,
    };
  } catch (error) {
    console.error('Error fetching Quick Move-In listings:', error);
    return {
      homes: [],
      fromRepliers: 0,
      fromSheet: 0,
      total: 0,
    };
  }
}

/**
 * Get featured Quick Move-In homes for homepage display
 * Prioritizes homes marked as featured in the inventory sheet
 */
export async function getFeaturedQuickMoveIns(
  limit: number = 6
): Promise<Property[]> {
  // Get all homes - sorting already puts featured first
  const result = await getQuickMoveInListings({ limit });
  return result.homes;
}
