import { getListingByMlsNumber, transformListing, getListingHistory, transformHistory } from './repliers';
import { getQuickMoveInListings } from './quick-move-in';
import { Property } from '../types';

/**
 * Fetch a property by its MLS number or inventory ID.
 * Tries Repliers API (MLS) first, then falls back to Quick Move-In inventory.
 * For non-new-construction listings, also fetches property history.
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Try Repliers API first (covers all MLS listings)
    const listing = await getListingByMlsNumber(id);
    if (listing) {
      const property = transformListing(listing) as Property;

      // Fetch property history for non-new-construction homes
      if (listing.raw?.NewConstructionYN?.toUpperCase() !== 'Y') {
        try {
          const history = await getListingHistory({
            streetNumber: listing.address.streetNumber,
            streetName: listing.address.streetName,
            streetSuffix: listing.address.streetSuffix,
            city: listing.address.city,
            zip: listing.address.zip,
          });
          property.priceHistory = transformHistory(history);
        } catch (historyError) {
          console.error('Error fetching property history:', historyError);
          // Continue without history — not a critical failure
        }
      }

      return property;
    }

    // Fallback: search Quick Move-In inventory sheet
    const result = await getQuickMoveInListings();
    return result.homes.find(h => h.id === id) || null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}
