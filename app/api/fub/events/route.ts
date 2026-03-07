import { NextRequest, NextResponse } from 'next/server';

const FUB_API_URL = 'https://api.followupboss.com/v1/events';
const FUB_API_KEY = process.env.FUB_API_KEY || '';
const FUB_SYSTEM = process.env.FUB_SYSTEM || 'RushHomeWebsite';
const FUB_SOURCE = process.env.FUB_SOURCE || 'rushhometeam.com';

interface FubEventPayload {
  type: string;
  source?: string;
  system?: string;
  message?: string;
  description?: string;
  person: {
    firstName?: string;
    lastName?: string;
    emails?: { value: string; type?: string }[];
    phones?: { value: string; type?: string }[];
    tags?: string[];
  };
  property?: {
    street?: string;
    city?: string;
    state?: string;
    code?: string;
    mlsNumber?: string;
    price?: string;
    url?: string;
    type?: string;
    bedrooms?: string;
    bathrooms?: string;
    area?: string;
  };
  propertySearch?: {
    type?: string;
    city?: string;
    state?: string;
    code?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
  };
}

export async function POST(request: NextRequest) {
  if (!FUB_API_KEY) {
    console.warn('FUB_API_KEY not configured - skipping FUB event');
    return NextResponse.json(
      { success: false, error: 'FUB integration not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Build the FUB event payload
    const payload: FubEventPayload = {
      source: FUB_SOURCE,
      system: FUB_SYSTEM,
      type: body.type || 'General Inquiry',
      person: {
        firstName: body.firstName,
        lastName: body.lastName,
        emails: body.email ? [{ value: body.email, type: 'home' }] : [],
        phones: body.phone ? [{ value: body.phone, type: 'mobile' }] : [],
        tags: body.tags || [],
      },
    };

    // Add message if provided
    if (body.message) {
      payload.message = body.message;
    }

    // Add description if provided
    if (body.description) {
      payload.description = body.description;
    }

    // Add property data if provided
    if (body.property) {
      payload.property = {
        street: body.property.street,
        city: body.property.city,
        state: body.property.state,
        code: body.property.code,
        mlsNumber: body.property.mlsNumber,
        price: body.property.price ? String(body.property.price) : undefined,
        url: body.property.url,
        type: body.property.type,
        bedrooms: body.property.bedrooms ? String(body.property.bedrooms) : undefined,
        bathrooms: body.property.bathrooms ? String(body.property.bathrooms) : undefined,
        area: body.property.area ? String(body.property.area) : undefined,
      };
    }

    // Add property search data if provided
    if (body.propertySearch) {
      payload.propertySearch = body.propertySearch;
    }

    // Send to FUB Events API using Basic Auth (API key as username, empty password)
    const authHeader = 'Basic ' + Buffer.from(`${FUB_API_KEY}:`).toString('base64');

    const fubResponse = await fetch(FUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-System': FUB_SYSTEM,
        'X-System-Key': FUB_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (fubResponse.ok) {
      const data = await fubResponse.json();
      return NextResponse.json({ success: true, status: fubResponse.status, data });
    } else {
      const errorText = await fubResponse.text();
      console.error('FUB API error:', fubResponse.status, errorText);
      return NextResponse.json(
        { success: false, error: 'FUB API error', status: fubResponse.status },
        { status: fubResponse.status }
      );
    }
  } catch (error) {
    console.error('Error sending FUB event:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
