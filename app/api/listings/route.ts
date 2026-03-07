import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io';

async function fetchRepliersListings(searchParams: URLSearchParams) {
  const apiKey = process.env.REPLIERS_API_KEY;
  if (!apiKey) {
    throw new Error('REPLIERS_API_KEY not configured');
  }

  const queryParams = new URLSearchParams();
  queryParams.append('status', 'A');
  queryParams.append('state', 'DE');

  // Forward other search params
  searchParams.forEach((value, key) => {
    if (key !== 'status' && key !== 'state') {
      queryParams.append(key, value);
    }
  });

  const response = await fetch(
    `${REPLIERS_API_URL}/listings?${queryParams.toString()}`,
    {
      headers: {
        'REPLIERS-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Repliers API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await fetchRepliersListings(searchParams);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Listings API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
