import { Property, PropertyStatus } from '@/types';
import { RepliersListing } from './inventory-types';
import { mapHomeType } from './repliers';

/**
 * Parse HOA fee into monthly amount based on the stated frequency.
 */
function parseMonthlyHoa(amount: number, frequency?: string): number {
  if (!amount || amount <= 0) return 0;
  if (!frequency) return amount;
  const freq = frequency.toLowerCase();
  if (freq.includes('annual') && !freq.includes('semi')) return Math.round(amount / 12);
  if (freq.includes('semi')) return Math.round(amount / 6);
  if (freq.includes('quarter')) return Math.round(amount / 3);
  if (freq.includes('bi-month') || freq.includes('bimonth')) return Math.round(amount / 2);
  if (freq.includes('week')) return Math.round((amount * 52) / 12);
  return amount;
}

/**
 * Build full address string from Repliers address object
 */
export function buildAddressString(address: RepliersListing['address']): string {
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
export function mapConstructionStatus(status?: string): PropertyStatus {
  if (!status) return PropertyStatus.MOVE_IN_READY;

  const lower = status.toLowerCase();
  if (lower === 'complete') return PropertyStatus.MOVE_IN_READY;
  if (lower === 'under construction') return PropertyStatus.UNDER_CONSTRUCTION;
  if (lower === 'proposed') return PropertyStatus.TO_BE_BUILT;

  return PropertyStatus.MOVE_IN_READY;
}

/**
 * Transform a Repliers listing to a Property
 */
export function transformRepliersListing(listing: RepliersListing): Property {
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
    hoaFee: parseMonthlyHoa(
      listing.condominium?.fees?.maintenance ??
        (listing.raw?.AssociationFee ? parseFloat(listing.raw.AssociationFee) : 0),
      listing.condominium?.fees?.type ?? listing.raw?.AssociationFeeFrequency,
    ),
    taxAssessment:
      listing.taxes?.annualAmount ??
      (listing.raw?.TaxAnnualAmount ? parseFloat(listing.raw.TaxAnnualAmount) : 0),
    schools: [],
    homeType: mapHomeType(listing.class, listing.raw?.StructureDesignType),
    mlsId: listing.mlsNumber,
    listingAgent: listing.agent?.name || listing.raw?.ListAgentFullName || '',
    listingAgentPhone: listing.agent?.phone || listing.raw?.ListAgentDirectPhone || listing.raw?.ListAgentPreferredPhone || '',
    listingBrokerage: listing.office?.name || listing.raw?.ListOfficeName || '',
    brokeragePhone: listing.office?.phone || listing.raw?.ListOfficePhone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    priceHistory: [],
  };
}
