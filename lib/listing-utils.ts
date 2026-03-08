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
    parking: listing.details.numGarageSpaces ? `${listing.details.numGarageSpaces} Car Garage` : '',
    basement: '',
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
    listingAgent: listing.agent?.name || '',
    listingAgentPhone: listing.agent?.phone || '',
    listingBrokerage: listing.office?.name || '',
    brokeragePhone: listing.office?.phone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    priceHistory: [],
  };
}
