import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io/listings';

interface RepliersListing {
  mlsNumber: string;
  listPrice: number;
  address: {
    streetNumber?: string;
    streetName?: string;
    streetSuffix?: string;
    city?: string;
    state?: string;
    zip?: string;
    area?: string;
    neighborhood?: string;
    subdivision?: string;
  };
  details: {
    numBedrooms?: number;
    numBathrooms?: number;
    numGarageSpaces?: number;
    sqft?: number;
    lotSizeSqft?: number;
    propertyType?: string;
    style?: string;
    yearBuilt?: number;
  };
  lot?: {
    size?: string;
    depth?: string;
    width?: string;
  };
  constructionStatus?: string;
  newConstruction?: boolean;
  status?: string;
  listDate?: string;
  description?: string;
  images?: string[];
  virtualTour?: string;
  map?: {
    latitude?: number;
    longitude?: number;
  };
}

interface RepliersResponse {
  listings: RepliersListing[];
  count: number;
  page: number;
  numPages: number;
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.REPLIERS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: 'Repliers API key not configured',
        data: [],
        count: 0,
      },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const community = searchParams.get('community');
    const constructionStatus = searchParams.get('constructionStatus');
    const mlsNumber = searchParams.get('mlsNumber');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status') || 'A'; // Default to Available

    // Build query parameters for Repliers API
    const queryParams = new URLSearchParams();
    queryParams.append('status', status);

    // Filter by community/subdivision name
    if (community) {
      // Search in subdivision field or use general search
      queryParams.append('search', community);
      queryParams.append('searchFields', 'address.subdivision,address.neighborhood,address.area');
    }

    // Filter by MLS number
    if (mlsNumber) {
      queryParams.append('mlsNumber', mlsNumber);
    }

    // Filter by construction status
    if (constructionStatus) {
      queryParams.append('constructionStatus', constructionStatus);
    }

    // Price filters
    if (minPrice) {
      queryParams.append('minListPrice', minPrice);
    }
    if (maxPrice) {
      queryParams.append('maxListPrice', maxPrice);
    }

    // Request response fields we need
    queryParams.append('fields', [
      'mlsNumber',
      'listPrice',
      'address',
      'details',
      'lot',
      'constructionStatus',
      'newConstruction',
      'status',
      'listDate',
      'description',
      'images',
      'virtualTour',
      'map'
    ].join(','));

    const apiUrl = `${REPLIERS_API_URL}?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Repliers API error:', response.status, errorText);
      throw new Error(`Repliers API error: ${response.status}`);
    }

    const data: RepliersResponse = await response.json();

    // Transform to a consistent format
    const listings = data.listings.map((listing) => ({
      id: listing.mlsNumber,
      mls_number: listing.mlsNumber,
      price: listing.listPrice?.toString() || '',
      address: formatAddress(listing.address),
      city: listing.address?.city || '',
      state: listing.address?.state || '',
      zip: listing.address?.zip || '',
      subdivision: listing.address?.subdivision || '',
      neighborhood: listing.address?.neighborhood || '',
      beds: listing.details?.numBedrooms?.toString() || '',
      baths: listing.details?.numBathrooms?.toString() || '',
      garage: listing.details?.numGarageSpaces?.toString() || '',
      sqft: listing.details?.sqft?.toString() || '',
      lot_size: listing.lot?.size || listing.details?.lotSizeSqft?.toString() || '',
      property_type: listing.details?.propertyType || '',
      style: listing.details?.style || '',
      year_built: listing.details?.yearBuilt?.toString() || '',
      construction_status: listing.constructionStatus || '',
      is_new_construction: listing.newConstruction || false,
      status: listing.status || '',
      list_date: listing.listDate || '',
      description: listing.description || '',
      photo_url: listing.images?.[0] || '',
      images: listing.images || [],
      virtual_tour: listing.virtualTour || '',
      latitude: listing.map?.latitude,
      longitude: listing.map?.longitude,
      source: 'repliers' as const,
    }));

    return NextResponse.json({
      success: true,
      data: listings,
      count: listings.length,
      totalCount: data.count,
      page: data.page,
      numPages: data.numPages,
    });
  } catch (error) {
    console.error('Error fetching from Repliers:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

function formatAddress(address: RepliersListing['address']): string {
  if (!address) return '';

  const parts = [
    address.streetNumber,
    address.streetName,
    address.streetSuffix,
  ].filter(Boolean);

  const street = parts.join(' ');
  const cityState = [address.city, address.state].filter(Boolean).join(', ');

  return [street, cityState, address.zip].filter(Boolean).join(', ');
}
