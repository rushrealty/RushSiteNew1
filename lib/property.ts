import { getListingByMlsNumber, transformListing } from './repliers';
import { getQuickMoveInListings } from './quick-move-in';
import { Property } from '../types';

/**
 * Fetch a property by its MLS number or inventory ID.
 * Tries Repliers API (MLS) first, then falls back to Quick Move-In inventory.
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Try Repliers API first (covers all MLS listings)
    const listing = await getListingByMlsNumber(id);
    if (listing) {
      return transformListing(listing) as Property;
    }

    // Fallback: search Quick Move-In inventory sheet
    const result = await getQuickMoveInListings();
    return result.homes.find(h => h.id === id) || null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}
