import type { Metadata } from 'next';
import Mortgage101Content from '@/components/pages/Mortgage101Content';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Mortgage 101: Understanding Home Loans | Delaware Mortgage Guide | Rush Home Team',
  description: 'Learn the basics of mortgage loans, types of financing, qualification requirements, and costs. Your complete guide to understanding home financing in Delaware.',
  keywords: 'mortgage Delaware, home loan guide, FHA loan Delaware, VA loan Delaware, first time buyer loan, mortgage pre-approval, down payment assistance Delaware, mortgage rates Delaware',
  openGraph: {
    title: 'Mortgage 101: Understanding Home Loans in Delaware',
    description: 'Everything you need to know about mortgages, loan types, and financing your Delaware home.',
    type: 'website',
    url: 'https://rushhome.com/mortgage-101',
    siteName: 'Rush Home Team',
    images: [
      {
        url: 'https://rushhome.com/images/og-mortgage-101.jpg',
        width: 1200,
        height: 630,
        alt: 'Mortgage 101 Guide - Rush Home Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage 101: Understanding Home Loans',
    description: 'Your complete guide to mortgages, loan types, and financing your Delaware home.',
    images: ['https://rushhome.com/images/og-mortgage-101.jpg'],
  },
  alternates: {
    canonical: 'https://rushhome.com/mortgage-101',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Mortgage 101: Understanding Home Loans in Delaware",
  "description": "Learn the basics of mortgage loans, types of financing, qualification requirements, and costs. Your complete guide to understanding home financing in Delaware.",
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
    "@id": "https://rushhome.com/mortgage-101"
  }
};

export default function Mortgage101Page() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Mortgage 101', url: 'https://rushhome.com/mortgage-101' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Mortgage101Content />
    </>
  );
}
