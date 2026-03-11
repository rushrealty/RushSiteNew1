import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: "Delaware New Construction Experts — Meet the Rush Home Team",
  description: "Meet Marcus Rush and the Rush Home Team at Compass. Delaware's experts in new construction, guaranteed home sales, and helping families find their perfect home across New Castle, Kent, and Sussex counties.",
  keywords: 'Rush Home Team, Marcus Rush, Compass real estate, Delaware real estate agents, new construction experts, Delaware realtors',
  openGraph: {
    title: "Delaware New Construction Experts — Meet the Rush Home Team",
    description: "Meet Marcus Rush and the Rush Home Team at Compass. Delaware's experts in new construction and helping families find their perfect home.",
    type: 'website',
    url: 'https://rushhome.com/about',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Delaware New Construction Experts — Meet the Rush Home Team",
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
