import { Property, PropertyStatus } from '@/types';
import { RepliersListing } from './inventory-types';

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
    mlsId: listing.mlsNumber,
    listingAgent: listing.agent?.name || '',
    listingAgentPhone: listing.agent?.phone || '',
    listingBrokerage: listing.office?.name || '',
    brokeragePhone: listing.office?.phone || '',
    lastUpdated: listing.listDate || new Date().toISOString(),
    priceHistory: [],
  };
}
