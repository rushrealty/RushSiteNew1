import { NextRequest, NextResponse } from 'next/server';

const REPLIERS_API_URL = 'https://api.repliers.io';
const API_KEY = process.env.REPLIERS_API_KEY || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query || query.length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  try {
    const url = new URL(`${REPLIERS_API_URL}/locations/autocomplete`);
    url.searchParams.append('query', query);
    // Limit to Delaware for relevance
    url.searchParams.append('state', 'DE');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'REPLIERS-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Repliers autocomplete error:', response.status);
      return NextResponse.json({ predictions: [] });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Repliers autocomplete error:', error);
    return NextResponse.json({ predictions: [] });
  }
}
