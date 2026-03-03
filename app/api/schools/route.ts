import { NextResponse } from 'next/server';
import { fetchInventoryData } from '@/lib/inventory';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface SchoolResult {
  name: string;
  grades: string;
  distance: string;
  placeId?: string;
}

interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
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

// Search for a school by name near a location
async function findSchool(schoolName: string, nearLat: number, nearLng: number): Promise<GooglePlace | null> {
  // First try text search which is better for finding specific named places
  const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(schoolName + ' school')}&location=${nearLat},${nearLng}&radius=50000&type=school&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(textSearchUrl);
  const data = await response.json();

  if (data.status === 'OK' && data.results.length > 0) {
    // Return the first (most relevant) result
    return data.results[0];
  }

  // Fallback: try without 'school' suffix in case it's already in the name
  const fallbackUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(schoolName)}&location=${nearLat},${nearLng}&radius=50000&key=${GOOGLE_MAPS_API_KEY}`;

  const fallbackResponse = await fetch(fallbackUrl);
  const fallbackData = await fallbackResponse.json();

  if (fallbackData.status === 'OK' && fallbackData.results.length > 0) {
    return fallbackData.results[0];
  }

  return null;
}

// Get driving distance using Distance Matrix API
async function getDrivingDistance(originLat: number, originLng: number, destLat: number, destLng: number): Promise<string | null> {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK' && data.rows.length > 0 && data.rows[0].elements.length > 0) {
    const element = data.rows[0].elements[0];
    if (element.status === 'OK' && element.distance) {
      // Convert meters to miles and format
      const miles = element.distance.value / 1609.34;
      return `${miles.toFixed(1)} mi`;
    }
  }

  return null;
}

// Try to extract grade level from school name
function inferGrades(schoolName: string): string {
  const nameLower = schoolName.toLowerCase();

  if (nameLower.includes('early childhood') || nameLower.includes('preschool') || nameLower.includes('pre-k')) {
    return 'PK, K';
  }
  if (nameLower.includes('elementary')) {
    if (nameLower.includes('north') || nameLower.includes('south') || nameLower.includes('east') || nameLower.includes('west') || nameLower.includes('central')) {
      return 'K-5';
    }
    return 'K-5';
  }
  if (nameLower.includes('middle') || nameLower.includes('academy') || nameLower.includes('intermediate')) {
    return '6-8';
  }
  if (nameLower.includes('high school') || nameLower.includes('senior high')) {
    return '9-12';
  }
  if (nameLower.includes('junior high')) {
    return '7-9';
  }

  return '';
}

// Parse lat/lng from a Niche.com URL like: https://niche.com/k12/schools-near-you/?center=-75.53289,39.04721
function parseNicheUrl(url: string): { lat: number; lng: number } | null {
  try {
    const parsed = new URL(url);
    const center = parsed.searchParams.get('center');
    if (!center) return null;
    const [lng, lat] = center.split(',').map(Number);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

// Find nearby schools using Google Places Nearby Search
async function findNearbySchools(lat: number, lng: number, radius: number = 16000): Promise<GooglePlace[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=school&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK' && data.results.length > 0) {
    // Filter to likely K-12 schools (exclude driving schools, dance schools, etc.)
    return data.results.filter((place: any) => {
      const name = place.name.toLowerCase();
      return name.includes('elementary') || name.includes('middle') || name.includes('high school') ||
             name.includes('academy') || name.includes('school district') || name.includes('early childhood') ||
             name.includes('intermediate') || name.includes('junior high') || name.includes('senior high') ||
             (place.types && place.types.includes('school') && !name.includes('driving') && !name.includes('dance') &&
              !name.includes('beauty') && !name.includes('cosmetology') && !name.includes('music') &&
              !name.includes('martial') && !name.includes('karate') && !name.includes('swim'));
    });
  }
  return [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let address = searchParams.get('address');
  let schoolNames = searchParams.get('schools'); // Semicolon-separated school names
  let nicheUrl = searchParams.get('nicheUrl'); // Niche.com URL with lat/lng
  const communityId = searchParams.get('communityId'); // Community ID to look up from Sheet

  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
  }

  // If communityId is provided, look up school data from Google Sheet
  if (communityId) {
    try {
      const inventoryData = await fetchInventoryData();
      const community = inventoryData.communities.find(c => c.id === communityId);
      if (community) {
        if (community.schoolsUrl) {
          nicheUrl = community.schoolsUrl;
        } else if (community.schoolNames && community.schoolNames.length > 0) {
          schoolNames = community.schoolNames.join(';');
          address = community.address || `${community.city}, DE`;
        }
      }
    } catch (error) {
      console.error('Error fetching community data for schools:', error);
    }
  }

  // Mode 1: Nearby search using Niche URL coordinates
  if (nicheUrl) {
    const coords = parseNicheUrl(nicheUrl);
    if (!coords) {
      return NextResponse.json({ error: 'Could not parse coordinates from Niche URL' }, { status: 400 });
    }

    const nearbyPlaces = await findNearbySchools(coords.lat, coords.lng);
    const schools: SchoolResult[] = [];

    for (const place of nearbyPlaces.slice(0, 8)) {
      const distance = await getDrivingDistance(
        coords.lat, coords.lng,
        place.geometry.location.lat, place.geometry.location.lng
      );

      schools.push({
        name: place.name,
        grades: inferGrades(place.name),
        distance: distance || 'N/A',
        placeId: place.place_id,
      });
    }

    // Sort by distance
    schools.sort((a, b) => {
      const distA = parseFloat(a.distance) || 999;
      const distB = parseFloat(b.distance) || 999;
      return distA - distB;
    });

    return NextResponse.json({
      schools,
      origin: coords,
    });
  }

  // Mode 2: Named school search (original behavior)
  if (!address) {
    return NextResponse.json({ error: 'Address or nicheUrl is required' }, { status: 400 });
  }

  if (!schoolNames) {
    return NextResponse.json({ error: 'School names are required' }, { status: 400 });
  }

  // Geocode the community address
  const communityCoords = await geocodeAddress(address);
  if (!communityCoords) {
    return NextResponse.json({ error: 'Could not geocode address' }, { status: 400 });
  }

  // Parse school names
  const names = schoolNames.split(';').map(s => s.trim()).filter(Boolean);

  // Find each school and calculate distance
  const schools: SchoolResult[] = [];

  for (const name of names) {
    const school = await findSchool(name, communityCoords.lat, communityCoords.lng);

    if (school) {
      const distance = await getDrivingDistance(
        communityCoords.lat,
        communityCoords.lng,
        school.geometry.location.lat,
        school.geometry.location.lng
      );

      schools.push({
        name: school.name,
        grades: inferGrades(school.name),
        distance: distance || 'N/A',
        placeId: school.place_id,
      });
    } else {
      // If we can't find the school, still include it with unknown distance
      schools.push({
        name: name,
        grades: inferGrades(name),
        distance: 'N/A',
      });
    }
  }

  return NextResponse.json({
    schools,
    origin: communityCoords,
  });
}
