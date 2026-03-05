import type { Metadata } from 'next';
import TeamContent from '@/components/pages/TeamContent';

export const metadata: Metadata = {
  title: 'Meet the Team | Rush Home Team | Delaware Real Estate Experts',
  description: "Meet the dedicated professionals behind Rush Home Team at Compass. Our experienced real estate team serves families across New Castle, Kent, and Sussex counties in Delaware.",
  keywords: 'Rush Home Team members, Delaware real estate agents, Compass realtors, Delaware real estate team',
  openGraph: {
    title: 'Meet the Team | Rush Home Team',
    description: 'Meet the dedicated professionals behind Rush Home Team at Compass.',
    type: 'website',
    url: 'https://rushhome.com/team',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet the Team | Rush Home Team',
    description: 'Meet the dedicated professionals behind Rush Home Team at Compass.',
  },
  alternates: {
    canonical: 'https://rushhome.com/team',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TeamPage() {
  return <TeamContent />;
}
