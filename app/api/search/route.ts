import { NextResponse } from 'next/server';
import { searchListings, transformListing } from '@/lib/repliers';
import { MOCK_PROPERTIES } from '@/constants';
import type { RepliersListing } from '@/lib/inventory-types';

// Cache for 5 minutes to avoid hammering Repliers on every page load
export const revalidate = 300;

export async function GET() {
  try {
    const PAGE_SIZE = 250;

    // Fetch page 1 to get total count and number of pages
    const firstPage = await searchListings({
      status: 'A',
      resultsPerPage: PAGE_SIZE,
      page: 1,
    });

    if (!firstPage.listings || firstPage.listings.length === 0) {
      return NextResponse.json({
        homes: MOCK_PROPERTIES,
        total: MOCK_PROPERTIES.length,
        isMockData: true,
      });
    }

    let allListings: RepliersListing[] = [...firstPage.listings];
    const totalPages = firstPage.numPages;

    console.log(`[Search API] Page 1 fetched: ${firstPage.listings.length} listings. Total: ${firstPage.count}, Pages: ${totalPages}`);

    // Fetch remaining pages in parallel batches of 5
    if (totalPages > 1) {
      const BATCH_SIZE = 5;
      for (let batchStart = 2; batchStart <= totalPages; batchStart += BATCH_SIZE) {
        const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, totalPages);
        const pagePromises = [];
        for (let p = batchStart; p <= batchEnd; p++) {
          pagePromises.push(
            searchListings({ status: 'A', resultsPerPage: PAGE_SIZE, page: p })
          );
        }
        const results = await Promise.all(pagePromises);
        for (const result of results) {
          if (result.listings && result.listings.length > 0) {
            allListings = allListings.concat(result.listings);
          }
        }
      }
    }

    console.log(`[Search API] All pages fetched: ${allListings.length} total listings`);

    const homes = allListings.map(transformListing);

    return NextResponse.json({
      homes,
      total: homes.length,
      page: 1,
      numPages: 1,
    });
  } catch (error) {
    console.error('Error fetching search listings:', error);
    return NextResponse.json({
      homes: MOCK_PROPERTIES,
      total: MOCK_PROPERTIES.length,
      isMockData: true,
      error: 'Failed to fetch live data, showing sample listings',
    });
  }
}
