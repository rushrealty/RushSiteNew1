import type { Metadata } from 'next';
import TeamContent from '@/components/pages/TeamContent';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Our Real Estate Team | Rush Home Team Delaware',
  description: "Meet the dedicated professionals behind Rush Home Team at Compass. Our experienced real estate team serves families across New Castle, Kent, and Sussex counties in Delaware.",
  keywords: 'Rush Home Team members, Delaware real estate agents, Compass realtors, Delaware real estate team',
  openGraph: {
    title: 'Our Real Estate Team | Rush Home Team Delaware',
    description: 'Meet the dedicated professionals behind Rush Home Team at Compass.',
    type: 'website',
    url: 'https://rushhome.com/team',
    siteName: 'Rush Home Team at Compass',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Real Estate Team | Rush Home Team Delaware',
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

const teamSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Person",
      "name": "Marcus Rush",
      "jobTitle": "Real Estate Agent & Team Lead",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Bert Ferguson",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Alan Coffey",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Chennita Crawford",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Kita Miller",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Landy Coulanges",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Jeremy Mayan",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Deja Johnson",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    },
    {
      "@type": "Person",
      "name": "Reycell Estolonio",
      "jobTitle": "Real Estate Agent",
      "worksFor": { "@type": "Organization", "name": "Rush Home Team at Compass" },
      "url": "https://rushhome.com/team",
      "address": { "@type": "PostalAddress", "addressRegion": "DE", "addressCountry": "US" }
    }
  ]
};

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: 'Home', url: 'https://rushhome.com' },
        { name: 'Our Team', url: 'https://rushhome.com/team' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />
      <TeamContent />
    </>
  );
}
