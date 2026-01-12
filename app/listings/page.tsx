import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled to prevent hydration issues
const ListingContent = dynamic(
  () => import('@/components/pages/ListingContent'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        minHeight: '100vh', 
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#737373' }}>Loading property details...</p>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Property Details | Rush Home Team',
  description: 'View property details, photos, and information. Rush Home Team - Delaware Real Estate.',
  openGraph: {
    title: 'Property Details | Rush Home Team',
    description: 'View property details, photos, and information.',
    type: 'website',
    siteName: 'Rush Home Team',
  },
};

export default function ListingPage() {
  return <ListingContent />;
}
