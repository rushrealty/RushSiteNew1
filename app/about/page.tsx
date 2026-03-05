import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: "About Rush Home Team | Delaware's Trusted Real Estate Experts | Compass",
  description: "Meet Marcus Rush and the Rush Home Team at Compass. Delaware's experts in new construction, guaranteed home sales, and helping families find their perfect home across New Castle, Kent, and Sussex counties.",
  keywords: 'Rush Home Team, Marcus Rush, Compass real estate, Delaware real estate agents, new construction experts, Delaware realtors',
  openGraph: {
    title: "About Rush Home Team | Delaware's Trusted Real Estate Experts",
    description: "Meet Marcus Rush and the Rush Home Team at Compass. Delaware's experts in new construction and helping families find their perfect home.",
    type: 'website',
    url: 'https://rushhome.com/about',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Rush Home Team | Delaware's Trusted Real Estate Experts",
    description: "Meet Marcus Rush and the Rush Home Team at Compass. Delaware's experts in new construction and helping families find their perfect home.",
  },
  alternates: {
    canonical: 'https://rushhome.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
