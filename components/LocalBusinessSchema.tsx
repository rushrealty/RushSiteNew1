'use client';

import Script from 'next/script';

/**
 * LocalBusinessSchema Component
 * 
 * Adds JSON-LD structured data for local SEO including:
 * - RealEstateAgent schema
 * - Organization schema
 * - Service area coverage
 * - Contact information
 * 
 * Usage: Add to app/layout.tsx inside the <body> tag
 * 
 * Example:
 *   import LocalBusinessSchema from '@/components/LocalBusinessSchema';
 *   
 *   // In layout.tsx body:
 *   <LocalBusinessSchema />
 */

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://rushhome.com/#realestate-agent",
        "name": "Rush Home Team",
        "alternateName": "Rush Home Team at Compass",
        "description": "Delaware's trusted real estate experts specializing in new construction, guaranteed home sales, and personalized service. Helping families buy and sell homes across New Castle, Kent, and Sussex counties.",
        "url": "https://rushhome.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rushhome.com/images/logo.png",
          "width": 300,
          "height": 100
        },
        "image": "https://rushhome.com/images/og-home.jpg",
        "telephone": "+1-302-219-6707",
        "email": "info@rushhome.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Smyrna",
          "addressRegion": "DE",
          "postalCode": "19977",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.2998,
          "longitude": -75.6049
        },
        "areaServed": [
          {
            "@type": "County",
            "name": "New Castle County",
            "containedInPlace": {
              "@type": "State",
              "name": "Delaware"
            }
          },
          {
            "@type": "County",
            "name": "Kent County",
            "containedInPlace": {
              "@type": "State",
              "name": "Delaware"
            }
          },
          {
            "@type": "County",
            "name": "Sussex County",
            "containedInPlace": {
              "@type": "State",
              "name": "Delaware"
            }
          }
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.1582,
            "longitude": -75.5244
          },
          "geoRadius": "80000"
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "10:00",
            "closes": "16:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/Realtorrush",
          "https://www.instagram.com/derealtorrush/",
          "https://www.linkedin.com/in/marcus-r-aab77236/"
        ],
        "parentOrganization": {
          "@type": "RealEstateAgent",
          "name": "Compass",
          "url": "https://www.compass.com"
        },
        "founder": {
          "@type": "Person",
          "@id": "https://rushhome.com/#marcus-rush",
          "name": "Marcus Rush",
          "jobTitle": "Founder & Team Leader",
          "telephone": "+1-302-257-3883",
          "email": "marcus@rushhome.com",
          "sameAs": [
            "https://www.facebook.com/Realtorrush",
            "https://www.instagram.com/derealtorrush/",
            "https://www.linkedin.com/in/marcus-r-aab77236/"
          ]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Real Estate Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Guaranteed Home Sale",
                "description": "Get a guaranteed cash offer on your home. Sell on your timeline with certainty."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "New Construction Homes",
                "description": "Expert guidance on buying new construction homes from Delaware's top builders."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Buy Before You Sell",
                "description": "Purchase your next home before selling your current one with our QuickBuy program."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Buyer Representation",
                "description": "Expert guidance for home buyers, from first-time buyers to move-up buyers."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Home Selling",
                "description": "Strategic home selling powered by Compass's industry-leading marketing platform."
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "50"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://rushhome.com/#website",
        "url": "https://rushhome.com",
        "name": "Rush Home Team",
        "description": "Delaware Real Estate - Guaranteed Home Sales, New Construction, Buy & Sell",
        "publisher": {
          "@id": "https://rushhome.com/#realestate-agent"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://rushhome.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://rushhome.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rushhome.com"
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
};

export default LocalBusinessSchema;
