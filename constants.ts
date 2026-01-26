import { SaleOption, Step, Community, Property, PropertyStatus } from './types';

// Communities for homepage display (simplified from data/communities.ts)
export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'abbotts-pond',
    name: "Abbott's Pond Acres",
    slug: 'abbotts-pond',
    location: 'Greenwood, DE',
    city: 'Greenwood',
    state: 'DE',
    zip: '19950',
    builder: 'Ashburn Homes',
    priceRange: '$430k - $510k',
    minPrice: 430000,
    image: 'https://drive.google.com/thumbnail?id=1oF8FDvL11zdHgdIQtmllgWIAPoV6wgZY&sz=w1200',
    status: 'Selling Fast',
    homesAvailable: 6,
    floorPlansCount: 6,
    description: 'Peaceful residential setting with spacious surroundings in Greenwood. Quick access to Route 13 and Delaware beaches.',
    features: ['Granite Countertops', '9\' Ceilings', '2-Car Garage', 'Energy Star Certified']
  },
  {
    id: 'pinehurst-village',
    name: 'Pinehurst Village',
    slug: 'pinehurst-village',
    location: 'Felton, DE',
    city: 'Felton',
    state: 'DE',
    zip: '19943',
    builder: 'Ashburn Homes',
    priceRange: '$400k - $480k',
    minPrice: 400000,
    image: 'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1200',
    status: 'Grand Opening',
    homesAvailable: 12,
    floorPlansCount: 6,
    description: 'Vibrant community designed for active lifestyles with carriage style garage doors and expansive floor plans.',
    features: ['8\' Unfinished Basement', 'Carriage Garage Doors', '42" Cabinets', 'Walking Trails']
  },
  {
    id: 'wiggins-mill',
    name: 'Wiggins Mill Rd',
    slug: 'wiggins-mill',
    location: 'Middletown, DE',
    city: 'Middletown',
    state: 'DE',
    zip: '19709',
    builder: 'Custom Homes by Rush',
    priceRange: '$1.3M+',
    minPrice: 1329000,
    image: 'https://drive.google.com/thumbnail?id=1GAaP2HYSxHD93csWawWXxZGM2OpG-pEO&sz=w1200',
    status: 'Closeout',
    homesAvailable: 2,
    floorPlansCount: 0,
    description: 'Exclusive custom-designed homes on spacious 1+ acre lots in the heart of Middletown.',
    features: ['Custom Floor Plans', '1+ Acre Lots', 'High-End Finishes', 'Appoquinimink Schools']
  },
  {
    id: 'baywood-greens',
    name: 'Baywood Greens',
    slug: 'baywood-greens',
    location: 'Millsboro, DE',
    city: 'Millsboro',
    state: 'DE',
    zip: '19966',
    builder: 'Tunnell Companies',
    priceRange: '$305k+',
    minPrice: 305000,
    image: 'https://drive.google.com/thumbnail?id=1K4Ux3S9YqV4xNSc5IlocIlzQGzB6yyhq&sz=w1200',
    status: 'Selling Fast',
    homesAvailable: 8,
    floorPlansCount: 4,
    description: "Delaware's premier golf course community. Resort-style living just minutes from the beach.",
    features: ['Championship Golf', 'Resort Pool', 'Clubhouse', 'Garden Care Included']
  }
];

// Helper to generate price history
const generateHistory = (price: number) => [
  { date: '01/20/2026', event: 'Listed' as const, price: price },
  { date: '12/10/2025', event: 'Price Change' as const, price: price + 15000 },
  { date: '11/05/2025', event: 'Listed' as const, price: price + 25000 },
];

// Mock properties for Quick Move-In display
export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Hampshire - Abbott\'s Pond',
    price: 475900,
    address: '20 Amanda Ave',
    city: 'Greenwood',
    county: 'Kent',
    state: 'DE',
    zip: '19950',
    beds: 4,
    baths: 2.5,
    sqft: 2415,
    lotSize: '0.25 Acres',
    yearBuilt: 2025,
    builder: 'Ashburn Homes',
    community: "Abbott's Pond Acres",
    status: PropertyStatus.MOVE_IN_READY,
    description: 'This Hampshire model features 4 bedrooms, 2.5 baths and is beautifully designed with 9 foot ceilings and an open floor plan.',
    images: [
      'https://drive.google.com/thumbnail?id=17SgJm_eAMsAWMjMIFQIku6vcDizZzpVz&sz=w1000',
      'https://drive.google.com/thumbnail?id=1nKN9-gYEntJ4NqpuN4WbsTFjk8FrYJN2&sz=w1000'
    ],
    features: ['Open Floor Plan', 'Master Suite', '2-Car Garage', 'Energy Star'],
    heating: 'Forced Air, Gas',
    cooling: 'Central Air',
    parking: '2 Car Garage',
    basement: 'None',
    hoaFee: 0,
    taxAssessment: 2800,
    schools: [
      { name: 'Mispillion Elementary', rating: 7, level: 'Elementary', distance: '11.7 mi' },
      { name: 'Milford Central Academy', rating: 6, level: 'Middle', distance: '11.2 mi' },
      { name: 'Milford Senior High', rating: 6, level: 'High', distance: '3.1 mi' }
    ],
    completionDate: 'Ready Now',
    mlsId: 'DEKT2055001',
    listingBrokerage: 'Compass RE',
    listingAgent: 'Rush Home Team',
    listingAgentPhone: '302-219-6707',
    brokeragePhone: '302-219-6707',
    lastUpdated: 'Jan 26, 2026',
    priceHistory: generateHistory(475900)
  },
  {
    id: '2',
    title: 'Windsor - Pinehurst Village',
    price: 425000,
    address: '25 Belfry Dr',
    city: 'Felton',
    county: 'Kent',
    state: 'DE',
    zip: '19943',
    beds: 3,
    baths: 2,
    sqft: 1727,
    lotSize: '0.20 Acres',
    yearBuilt: 2025,
    builder: 'Ashburn Homes',
    community: 'Pinehurst Village',
    status: PropertyStatus.UNDER_CONSTRUCTION,
    description: 'The Windsor is a dynamic home with an open floor plan. Looking for a rancher or 2-story, the Windsor adapts to your needs.',
    images: [
      'https://drive.google.com/thumbnail?id=1Et6Pcx4lzk5tFD50-EmGQIhxiUqrmHZv&sz=w1000',
      'https://drive.google.com/thumbnail?id=1Kc0MWxbFOo9YPJdPAVODzfEMvuFlU0zE&sz=w1000'
    ],
    features: ['8\' Basement', 'Carriage Garage', 'Open Concept', 'Walking Trails'],
    heating: 'Forced Air, Gas',
    cooling: 'Central Air',
    parking: '2 Car Garage',
    basement: 'Unfinished',
    hoaFee: 50,
    taxAssessment: 2400,
    schools: [
      { name: 'Lake Forest North Elementary', rating: 7, level: 'Elementary', distance: '1.1 mi' },
      { name: 'W.T. Chipman Middle', rating: 6, level: 'Middle', distance: '2.8 mi' },
      { name: 'Lake Forest High', rating: 7, level: 'High', distance: '3.1 mi' }
    ],
    completionDate: '60 Days',
    mlsId: 'DEKT2055002',
    listingBrokerage: 'Compass RE',
    listingAgent: 'Rush Home Team',
    listingAgentPhone: '302-219-6707',
    brokeragePhone: '302-219-6707',
    lastUpdated: 'Jan 26, 2026',
    priceHistory: generateHistory(425000)
  },
  {
    id: '3',
    title: 'Georgetown - Pinehurst Village',
    price: 480000,
    address: '30 Belfry Dr',
    city: 'Felton',
    county: 'Kent',
    state: 'DE',
    zip: '19943',
    beds: 4,
    baths: 2.5,
    sqft: 2513,
    lotSize: '0.22 Acres',
    yearBuilt: 2025,
    builder: 'Ashburn Homes',
    community: 'Pinehurst Village',
    status: PropertyStatus.MOVE_IN_READY,
    description: 'Master-on-main design with extra bedrooms upstairs. Over 2,500 sq ft with a grand 2-story living room.',
    images: [
      'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
      'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1000'
    ],
    features: ['Master on Main', '2-Story Living Room', '8\' Basement', 'Premium Lot'],
    heating: 'Forced Air, Gas',
    cooling: 'Central Air',
    parking: '2 Car Garage',
    basement: 'Unfinished',
    hoaFee: 50,
    taxAssessment: 2900,
    schools: [
      { name: 'Lake Forest North Elementary', rating: 7, level: 'Elementary', distance: '1.1 mi' },
      { name: 'W.T. Chipman Middle', rating: 6, level: 'Middle', distance: '2.8 mi' },
      { name: 'Lake Forest High', rating: 7, level: 'High', distance: '3.1 mi' }
    ],
    completionDate: 'Ready Now',
    mlsId: 'DEKT2055003',
    listingBrokerage: 'Compass RE',
    listingAgent: 'Rush Home Team',
    listingAgentPhone: '302-219-6707',
    brokeragePhone: '302-219-6707',
    lastUpdated: 'Jan 26, 2026',
    priceHistory: generateHistory(480000)
  }
];

export const SALE_OPTIONS: SaleOption[] = [
  {
    id: 'immediate',
    title: 'RUSH HOME IMMEDIATE',
    subtitle: 'Instant Cash Offer',
    description: 'Instant cash offer with closing in as few as 14 days.',
    bestFor: 'Maximum speed & certainty',
    features: [
      'Close in as few as 14 days',
      'No staging or repairs needed',
      'Leaseback option available',
      'Avoid market uncertainty'
    ]
  },
  {
    id: 'advantage',
    title: 'RUSH HOME ADVANTAGE',
    subtitle: 'Maximize Equity',
    description: 'Access majority of proceeds upfront while we handle improvements.',
    bestFor: 'Convenience + equity capture',
    features: [
      'Access funds immediately',
      'We manage improvements',
      'Capture more equity',
      'Hassle-free transition'
    ]
  },
  {
    id: 'flex',
    title: 'RUSH HOME FLEX',
    subtitle: 'Guaranteed Backup',
    description: '150-day guaranteed backup offer while you sell traditionally.',
    bestFor: 'Buy before you sell',
    features: [
      '150-day guaranteed offer',
      'Buy your next home first',
      'Compete without contingency',
      'Try traditional sale first'
    ],
    highlight: true
  }
];

export const FLEX_STEPS: Step[] = [
  {
    number: '01',
    title: 'Get a Guaranteed Backup Offer',
    description: 'We secure a firm purchase contract on your current home, valid for 150 days.'
  },
  {
    number: '02',
    title: 'Shop with Confidence',
    description: 'Make non-contingent offers on your dream home, knowing your current home will sell.'
  },
  {
    number: '03',
    title: 'List Traditionally',
    description: 'We market your home to maximize value. If it sells before the backup deadline, you keep the higher price.'
  },
  {
    number: '04',
    title: 'Guaranteed Sale',
    description: "If your home doesn't sell traditionally, the guaranteed backup offer activates automatically."
  }
];