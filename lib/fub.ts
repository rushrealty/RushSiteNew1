/**
 * Send an event to Follow Up Boss CRM via our server-side proxy.
 * This is fire-and-forget — it won't block or fail form submissions.
 */
export async function sendFubEvent(data: {
  type: 'Registration' | 'Inquiry' | 'Property Inquiry' | 'Seller Inquiry' | 'General Inquiry';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  description?: string;
  tags?: string[];
  property?: {
    street?: string;
    city?: string;
    state?: string;
    code?: string;
    mlsNumber?: string;
    price?: number | string;
    url?: string;
    type?: string;
    bedrooms?: number | string;
    bathrooms?: number | string;
    area?: number | string;
  };
}) {
  try {
    await fetch('/api/fub/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // Silently fail — FUB events should never block the user experience
    console.error('Failed to send FUB event:', error);
  }
}
