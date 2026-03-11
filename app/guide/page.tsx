import type { Metadata } from 'next';
import GuideContent from '@/components/pages/GuideContent';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'New Construction Guide | Rush Home Team at Compass',
  description: 'The ultimate guide to buying new construction in Delaware. Learn the 7 steps to your new home, why you need an agent, and frequently asked questions.',
  keywords: 'new construction guide, buying new construction, Delaware new homes, builder contracts, home buying process',
  openGraph: {
    title: 'New Construction Guide | Rush Home Team',
    description: 'The ultimate guide to buying new construction in Delaware.',
    type: 'website',
    url: 'https://rushhome.com/guide',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Construction Guide | Rush Home Team',
    description: 'The ultimate guide to buying new construction in Delaware.',
  },
  alternates: {
    canonical: 'https://rushhome.com/guide',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "New Construction Guide: How to Buy a New Home in Delaware",
  "description": "The ultimate guide to buying new construction in Delaware. Learn the 7 steps to your new home, why you need an agent, and frequently asked questions.",
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
    "@id": "https://rushhome.com/guide"
  }
};

export default function GuidePage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'New Construction Guide', url: 'https://rushhome.com/guide' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <GuideContent />
    </>
  );
}