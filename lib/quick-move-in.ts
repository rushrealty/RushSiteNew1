import { Property, PropertyStatus } from '@/types';
import { RepliersListing, EnrichedInventoryHome, InventoryHome } from './inventory-types';
import { searchListings, mapHomeType } from './repliers';
import { fetchInventoryData } from './inventory';
import { normalizeAddress } from './utils';
import { COMMUNITIES_DATA } from '@/data/communities';

export interface QuickMoveInResult {
  homes: Property[];
  fromRepliers: number;
  fromSheet: number;
  total: number;
  lastUpdated: string;
}

export interface QuickMoveInOptions {
  limit?: number;
  featuredOnly?: boolean;
  communityId?: string; // Filter by community ID
}

/**
 * Check if a Repliers listing qualifies as a Quick Move-In
 * Criteria:
 *   1. Listed on the Inventory Google Sheet, OR
 *   2. NewConstructionYN = "Y" AND ConstructionCompletedYN = "Y"
 *      (raw Bright MLS RESO fields)
 *
 * Note: The Repliers API call already filters for NewConstructionYN = Y,
 * so all listings passed here are new construction. We just need to check
 * if construction is complete (or if it's in the Google Sheet).
 */
function isQuickMoveIn(
  listing: RepliersListing,
  isInGoogleSheet: boolean
): boolean {
  // Rule 1: If it's in the Google Sheet, it's always QMI
  if (isInGoogleSheet) return true;

  // Rule 2: Construction complete (API already filtered for NewConstructionYN=Y)
  // Strictly require raw.ConstructionCompletedYN = 'Y' — no fallback to constructionStatus
  const isConstructionComplete = listing.raw?.ConstructionCompletedYN?.toUpperCase() === 'Y';
  return isConstructionComplete;
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
    case 'Under Construction':
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

  // --- Lot Size (normalized to acres) ---
  // Priority: 1) lot.acres, 2) raw.LotSizeAcres, 3) raw.LotSizeArea+Units, 4) raw.LotSizeSquareFeet, 5) lot.size, 6) details.lotSize
  let lotSize = '';
  const lotAcres = listing.lot?.acres ? parseFloat(listing.lot.acres) : 0;
  const rawLotSizeAcres = listing.raw?.LotSizeAcres ? parseFloat(listing.raw.LotSizeAcres) : 0;
  const rawLotArea = listing.raw?.LotSizeArea ? parseFloat(listing.raw.LotSizeArea) : 0;
  const rawLotUnits = listing.raw?.LotSizeUnits || '';
  const rawLotSqft = listing.raw?.LotSizeSquareFeet ? parseFloat(listing.raw.LotSizeSquareFeet) : 0;

  if (lotAcres > 0) {
    lotSize = `${lotAcres.toFixed(2)} Acres`;
  } else if (rawLotSizeAcres > 0) {
    lotSize = `${rawLotSizeAcres.toFixed(2)} Acres`;
  } else if (rawLotArea > 0) {
    const acres = rawLotUnits.toLowerCase().includes('square') ? rawLotArea / 43560 : rawLotArea;
    lotSize = `${acres.toFixed(2)} Acres`;
  } else if (rawLotSqft > 0) {
    const acres = rawLotSqft / 43560;
    lotSize = `${acres.toFixed(2)} Acres`;
  } else if (listing.lot?.size) {
    lotSize = listing.lot.size;
  } else {
    lotSize = listing.details.lotSize || '';
  }

  // --- Stories ---
  const rawStories = listing.raw?.StoriesTotal ? parseInt(listing.raw.StoriesTotal, 10) : NaN;
  const rawLevels = listing.raw?.Levels ? parseInt(listing.raw.Levels, 10) : NaN;
  const stories = !isNaN(rawStories) ? rawStories : !isNaN(rawLevels) ? rawLevels : undefined;

  return {
    id: listing.mlsNumber,
    title: `${listing.details.numBedrooms} Bed ${listing.details.propertyType || 'Home'}`,
    price: listing.listPrice,
    address,
    city: listing.address.city,
    state: listing.address.state || 'DE',
    zip: listing.address.zip,
    county: listing.address.area || '',
    beds: listing.details.numBedrooms,
    baths: listing.details.numBathrooms,
    sqft: listing.details.sqft || 0,
    lotSize,
    yearBuilt: listing.details.yearBuilt || new Date().getFullYear(),
    builder: '',
    community: listing.address.neighborhood || '',
    status,
    description: listing.details.description || '',
    images: listing.images || [],
    features: [],
    heating: '',
    cooling: '',
    parking: listing.details.numGarageSpaces ? `${listing.details.numGarageSpaces} Car Garage` : '',
    basement: listing.raw?.BasementYN?.toUpperCase() === 'Y' ? 'Yes' : '',
    stories,
    is55Plus: listing.raw?.SeniorCommunityYN?.toUpperCase() === 'Y',
    hasCommunityPool: listing.raw?.PoolYN?.toUpperCase() === 'Y',
    isNewConstruction: listing.raw?.NewConstructionYN?.toUpperCase() === 'Y',
    hoaFee: 0,
    taxAssessment: 0,
    schools: [],
    isQuickMoveIn: isQMI, // Set based on construction status check
    homeType: mapHomeType(listing.class, listing.raw?.StructureDesignType),
    latitude: listing.map?.latitude,
    longitude: listing.map?.longitude,
    mlsId: listing.mlsNumber,
    listingAgent: listing.agent?.name || listing.raw?.ListAgentFullName || '',
    listingAgentPhone: listing.agent?.phone || listing.raw?.ListAgentDirectPhone || listing.raw?.ListAgentPreferredPhone || '',
    listingBrokerage: listing.office?.name || listing.raw?.ListOfficeName || '',
    brokeragePhone: listing.office?.phone || listing.raw?.ListOfficePhone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    priceHistory: [],
  };
}

/**
 * Transform an inventory home to a Property
 */
function transformInventoryHome(home: EnrichedInventoryHome): Property {
  const status = mapInventoryStatus(home.status);

  // Look up community lat/lng from static communities data
  let latitude: number | undefined;
  let longitude: number | undefined;
  if (home.community?.name) {
    const communityEntry = Object.values(COMMUNITIES_DATA).find(
      (c: any) => c.name?.toLowerCase() === home.community?.name?.toLowerCase()
    );
    if (communityEntry) {
      latitude = (communityEntry as any).lat;
      longitude = (communityEntry as any).lng;
    }
  }

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
    zip: (home.community?.address?.match(/\b(\d{5})\b/) || [])[1] || '',
    county: home.community?.county || '',
    beds: home.beds,
    baths: home.baths,
    sqft: home.sqft,
    lotSize: '', // Lot dimensions not available from inventory sheet
    lotNumber: home.lot ? `Lot ${home.lot}` : undefined,
    yearBuilt: new Date().getFullYear(),
    builder: home.builder?.name || '',
    community: home.community?.name || '',
    communityId: home.communityId || home.community?.id || '',
    status,
    description: home.description || '',
    images,
    features: [],
    heating: home.heating || '',
    cooling: home.cooling || '',
    parking: home.garage ? `${home.garage} Car Garage` : '',
    basement: home.basement || '',
    hoaFee: 0,
    taxAssessment: 0,
    schools: [],
    completionDate: home.moveInDate,
    featured: home.featured,
    isQuickMoveIn: true, // Sheet homes are always quick move-in
    homeType: home.homeType || 'Single Family',
    stories: home.stories,
    is55Plus: home.community?.is55Plus || false,
    hasClubhouse: home.community?.hasClubhouse || false,
    hasGolfCourse: home.community?.hasGolfCourse || false,
    hasCommunityPool: home.community?.hasCommunityPool || false,
    latitude,
    longitude,
    builderWebsite: home.builder?.website || '',
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
 * Business logic:
 * - A home is QMI if it's in the Google Sheet inventory, OR
 *   if it has new construction status AND construction is complete
 * - Only homes for sale in Delaware (no rentals)
 * - Repliers data supersedes Google Sheet when addresses match
 */
export async function getQuickMoveInListings(
  options: QuickMoveInOptions = {}
): Promise<QuickMoveInResult> {
  try {
    // Fetch from both sources in parallel
    // For Repliers: specifically request new construction homes (not all active listings)
    const [repliersResponse, inventoryData] = await Promise.all([
      searchListings({
        status: 'A',
        resultsPerPage: 200,
        rawFilters: {
          'raw.NewConstructionYN': 'contains:Y',
        },
      }),
      fetchInventoryData(),
    ]);

    console.log(`[QMI] Repliers returned ${repliersResponse.listings.length} new construction listings (total: ${repliersResponse.count})`);
    if (repliersResponse.listings.length > 0) {
      const sample = repliersResponse.listings[0];
      console.log(`[QMI] Sample: MLS#${sample.mlsNumber}, ${sample.address.city}, constructionStatus: ${sample.details.constructionStatus || 'null'}, raw.NewConstructionYN: ${sample.raw?.NewConstructionYN || 'n/a'}, raw.ConstructionCompletedYN: ${sample.raw?.ConstructionCompletedYN || 'n/a'}`);
    }

    // Build Google Sheet address lookup set (normalized) and address-to-home map
    const sheetAddressSet = new Set(
      inventoryData.homes.map((h) => normalizeAddress(h.address))
    );
    const sheetAddressMap = new Map(
      inventoryData.homes.map((h) => [normalizeAddress(h.address), h])
    );

    // Build MLS number lookup from sheet homes (for matching by MLS# in addition to address)
    const sheetMlsMap = new Map<string, InventoryHome>();
    for (const home of inventoryData.homes) {
      if (home.mlsNumber) {
        sheetMlsMap.set(home.mlsNumber.trim(), home);
      }
    }

    // Create lookup maps for enrichment
    const communitiesMap = new Map(inventoryData.communities.map((c) => [c.id, c]));
    const buildersMap = new Map(inventoryData.builders.map((b) => [b.id, b]));

    // Log builder data for debugging
    console.log('[QMI] Builder websites:', inventoryData.builders.map(b => `${b.name}: "${b.website}"`).join(', '));

    // Filter Repliers listings for Quick Move-Ins
    const repliersQMIs: Property[] = [];
    const repliersAddressSet = new Set<string>();
    const repliersMlsSet = new Set<string>();

    for (const listing of repliersResponse.listings) {
      const normalizedAddr = normalizeAddress(buildAddressString(listing.address));
      const inSheetByAddress = sheetAddressSet.has(normalizedAddr);
      const inSheetByMls = sheetMlsMap.has(listing.mlsNumber);
      const inSheet = inSheetByAddress || inSheetByMls;

      if (isQuickMoveIn(listing, inSheet)) {
        const property = transformRepliersListing(listing, true);

        // Enrich with builder/community data from sheet (match by address or MLS number)
        if (inSheet) {
          const sheetHome = inSheetByAddress
            ? sheetAddressMap.get(normalizedAddr)
            : sheetMlsMap.get(listing.mlsNumber);
          if (sheetHome) {
            const community = communitiesMap.get(sheetHome.communityId);
            const builder = community ? buildersMap.get(community.builderId) : undefined;
            if (builder) {
              property.builder = builder.name;
              property.builderWebsite = builder.website || '';
            }
            if (community) {
              property.community = community.name;
              property.communityId = community.id;
              property.is55Plus = community.is55Plus;
              property.hasClubhouse = community.hasClubhouse;
              property.hasGolfCourse = community.hasGolfCourse;
              property.hasCommunityPool = community.hasCommunityPool;
            }
          }
        }

        repliersQMIs.push(property);
        repliersAddressSet.add(normalizedAddr);
        repliersMlsSet.add(listing.mlsNumber);
      }
    }

    // Get Sheet-only homes (not already included from Repliers)
    const sheetOnlyHomes: Property[] = inventoryData.homes
      .filter((home) => {
        // Skip if already matched to a Repliers listing by address
        const normalizedAddr = normalizeAddress(home.address);
        if (repliersAddressSet.has(normalizedAddr)) return false;

        // Skip if MLS number was found and included in Repliers results
        if (home.mlsNumber && repliersMlsSet.has(home.mlsNumber.trim())) return false;

        // Include sheet homes not matched to any Repliers listing
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

    // Merge QMI homes: Repliers QMI + Sheet-only
    let homes: Property[] = [...repliersQMIs, ...sheetOnlyHomes];

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
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching Quick Move-In listings:', error);
    return {
      homes: [],
      fromRepliers: 0,
      fromSheet: 0,
      total: 0,
      lastUpdated: new Date().toISOString(),
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
