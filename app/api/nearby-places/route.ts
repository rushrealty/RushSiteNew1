import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Place types to search for - mix of attractions, shopping, dining, recreation
const PLACE_TYPES = [
  'shopping_mall',
  'supermarket',
  'hospital',
  'park',
  'restaurant',
  'tourist_attraction',
  'airport',
  'beach',
];

interface PlaceResult {
  name: string;
  location?: string;
  time: string;
  placeId: string;
  type: string;
}

interface GooglePlace {
  place_id: string;
  name: string;
  vicinity?: string;
  types?: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface DistanceMatrixElement {
  status: string;
  duration?: {
    text: string;
    value: number;
  };
}

// Get coordinates from address using Geocoding API
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK' && data.results.length > 0) {
    return data.results[0].geometry.location;
  }
  return null;
}

// Search for nearby places
async function searchNearbyPlaces(lat: number, lng: number, type: string, radius: number = 50000): Promise<GooglePlace[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK') {
    return data.results || [];
  }
  return [];
}

// Get driving time using Distance Matrix API
async function getDrivingTime(originLat: number, originLng: number, destinations: GooglePlace[]): Promise<Map<string, string>> {
  if (destinations.length === 0) return new Map();

  const destinationCoords = destinations
    .map(p => `${p.geometry.location.lat},${p.geometry.location.lng}`)
    .join('|');

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destinationCoords}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const times = new Map<string, string>();

  if (data.status === 'OK' && data.rows.length > 0) {
    const elements: DistanceMatrixElement[] = data.rows[0].elements;
    destinations.forEach((place, index) => {
      if (elements[index]?.status === 'OK' && elements[index].duration) {
        times.set(place.place_id, elements[index].duration!.text);
      }
    });
  }

  return times;
}

// Format place type to readable category
function getPlaceCategory(types: string[] | undefined): string {
  if (!types) return 'attraction';

  if (types.includes('airport')) return 'airport';
  if (types.includes('hospital')) return 'hospital';
  if (types.includes('shopping_mall') || types.includes('supermarket')) return 'shopping';
  if (types.includes('park') || types.includes('beach')) return 'recreation';
  if (types.includes('restaurant')) return 'dining';
  if (types.includes('tourist_attraction')) return 'attraction';
  return 'attraction';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const limit = parseInt(searchParams.get('limit') || '7', 10);

  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
  }

  let coordinates: { lat: number; lng: number } | null = null;

  // Get coordinates from lat/lng params or geocode the address
  if (lat && lng) {
    coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
  } else if (address) {
    coordinates = await geocodeAddress(address);
  }

  if (!coordinates) {
    return NextResponse.json({ error: 'Could not determine location' }, { status: 400 });
  }

  try {
    // Search for various place types
    const allPlaces: GooglePlace[] = [];
    const seenPlaceIds = new Set<string>();

    for (const type of PLACE_TYPES) {
      const places = await searchNearbyPlaces(coordinates.lat, coordinates.lng, type);

      // Add unique places (limit per type to get variety)
      for (const place of places.slice(0, 3)) {
        if (!seenPlaceIds.has(place.place_id)) {
          seenPlaceIds.add(place.place_id);
          allPlaces.push(place);
        }
      }
    }

    // Get driving times for all places
    const drivingTimes = await getDrivingTime(coordinates.lat, coordinates.lng, allPlaces);

    // Format results with driving time
    const results: PlaceResult[] = allPlaces
      .filter(place => drivingTimes.has(place.place_id))
      .map(place => ({
        name: place.name,
        location: place.vicinity?.split(',')[0] || '',
        time: drivingTimes.get(place.place_id) || '',
        placeId: place.place_id,
        type: getPlaceCategory(place.types),
      }))
      .sort((a, b) => {
        // Sort by time (parse minutes from strings like "15 mins" or "1 hour 5 mins")
        const parseMinutes = (time: string) => {
          const hours = time.match(/(\d+)\s*hour/);
          const mins = time.match(/(\d+)\s*min/);
          return (hours ? parseInt(hours[1]) * 60 : 0) + (mins ? parseInt(mins[1]) : 0);
        };
        return parseMinutes(a.time) - parseMinutes(b.time);
      })
      .slice(0, limit);

    return NextResponse.json({
      places: results,
      origin: coordinates
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return NextResponse.json({ error: 'Failed to fetch nearby places' }, { status: 500 });
  }
}
