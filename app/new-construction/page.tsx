import type { Metadata } from 'next';
import NewConstructionProcessContent from '@/components/pages/NewConstructionProcessContent';

export const metadata: Metadata = {
  title: 'New Construction Homes in Delaware | Complete Buyer\'s Guide | Rush Home Team',
  description: 'Your complete guide to buying new construction in Delaware. From choosing a builder to closing day, navigate the new home building process with confidence. Expert guidance from Rush Home Team.',
  keywords: 'new construction Delaware, new homes Delaware, home builders Delaware, Ashburn Homes, new construction process, buying new construction, Delaware new home communities, build new home Delaware',
  openGraph: {
    title: 'New Construction Homes in Delaware | Complete Buyer\'s Guide',
    description: 'From choosing a builder to closing day, your guide to buying new construction in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/new-construction',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-new-construction.jpg',
        width: 1200,
        height: 630,
        alt: 'New Construction Homes in Delaware - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Construction Homes in Delaware',
    description: 'Your complete guide to buying new construction in Delaware.',
    images: ['https://rushhome.com/images/og-new-construction.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/new-construction',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewConstructionPage() {
  return <NewConstructionProcessContent />;
}
