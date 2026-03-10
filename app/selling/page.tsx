import type { Metadata } from 'next';
import SellingContent from '@/components/pages/SellingContent';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Sell Your Delaware Home | Guaranteed Sale Options | Rush Home Team',
  description: 'Sell your Delaware home with confidence. Get a guaranteed cash offer or list with our comprehensive 10-step process. Close in as little as 14 days.',
  keywords: 'sell home Delaware, cash offer Delaware, guaranteed home sale, Rush Home Team, Compass real estate, sell house fast',
  openGraph: {
    title: 'Sell Your Delaware Home | Guaranteed Sale Options | Rush Home Team',
    description: 'Get a guaranteed cash offer or list with our comprehensive process. Close in as little as 14 days.',
    type: 'website',
    url: 'https://rushhome.com/selling',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Your Delaware Home | Guaranteed Sale Options | Rush Home Team',
    description: 'Get a guaranteed cash offer or list with our comprehensive process. Close in as little as 14 days.',
  },
  alternates: {
    canonical: 'https://rushhome.com/selling',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Sell Your Home in Delaware",
  "description": "Sell your Delaware home with confidence. Get a guaranteed cash offer or list with our comprehensive 10-step process.",
  "author": {
    "@type": "Organization",
    "name": "Rush Home Team",
    "url": "https://rushhome.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Rush Home Team",
    "logo": {
      "@type": "ImageObject",
      "url": "https://rushhome.com/images/logo.png"
    }
  },
  "datePublished": "2024-01-01",
  "dateModified": "2026-01-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://rushhome.com/selling"
  }
};

export default function SellingPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Sell Your Home', url: 'https://rushhome.com/selling' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <SellingContent />
    </>
  );
}