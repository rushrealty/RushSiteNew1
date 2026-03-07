import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io';

export async function GET(request: NextRequest) {
  const apiKey = process.env.REPLIERS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'REPLIERS_API_KEY not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'A';

  const queryParams = new URLSearchParams();
  queryParams.append('status', status);
  queryParams.append('state', 'DE');

  // Forward other search params
  searchParams.forEach((value, key) => {
    if (key !== 'status' && key !== 'state') {
      queryParams.append(key, value);
    }
  });

  try {
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
      return NextResponse.json(
        { error: `Repliers API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Repliers API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Repliers API' },
      { status: 500 }
    );
  }
}
