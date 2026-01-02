export interface FloorPlan {
  name: string;
  price: string;
  beds: string;
  baths: string;
  garage: string;
  stories: string;
  sqft: string;
  img: string;
  floorPlanImgs?: string[];
  description: string;
  elevations: string[];
}

export interface MoveInReadyHome {
  address: string;
  lot: string;
  price: string;
  status: string;
  beds: string;
  baths: string;
  garage: string;
  stories: string;
  sqft: string;
  img: string;
  name?: string;
  description?: string;
  elevations?: string[];
  floorPlanImgs?: string[];
}

export interface School {
  name: string;
  grades: string;
  distance: string;
}

export interface NearbyPlace {
  name: string;
  time: string;
  icon: 'shop' | 'food' | 'health' | 'mall' | 'beach';
}

export interface Community {
  id: string;
  name: string;
  location: string;
  county: 'newcastle' | 'kent' | 'sussex';
  price: string;
  lat: number;
  lng: number;
  address: string;
  status: 'Closing Out' | 'Now Selling' | 'Coming Soon';
  img: string;
  gallery: string[];
  mainImageContain?: boolean;
  description: string;
  features: string[];
  bedrooms: string;
  bathrooms: string;
  garage: string;
  stories: string;
  sqft: string;
  builderName: string;
  builderLogoText: string;
  builderLogoImg?: string;
  builderExperience: string;
  floorplans: FloorPlan[];
  moveInReadyHomes: MoveInReadyHome[];
  siteMapUrl: string;
  schoolDistrict: string;
  schools: School[];
  nearbyPlaces: NearbyPlace[];
  externalUrl?: string;
}

export const COMMUNITIES_DATA: Record<string, Community> = {
  'wiggins-mill': {
    id: 'wiggins-mill',
    name: 'Wiggins Mill Rd',
    location: 'Middletown, DE',
    county: 'newcastle',
    price: 'From $1,329,000',
    lat: 39.4294406,
    lng: -75.7275466,
    address: '404 Wiggins Mill Rd, Middletown, DE 19709',
    status: 'Closing Out',
    img: 'https://drive.google.com/thumbnail?id=1GAaP2HYSxHD93csWawWXxZGM2OpG-pEO&sz=w1200',
    gallery: [
      'https://drive.google.com/thumbnail?id=1GAaP2HYSxHD93csWawWXxZGM2OpG-pEO&sz=w1600',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600'
    ],
    description: 'Experience luxury living at Wiggins Mill Rd. This exclusive community features custom-designed homes on spacious lots, offering the perfect blend of modern sophistication and rural charm in the heart of Middletown.',
    features: ['Custom Floor Plans', '1+ Acre Lots', 'High-End Finishes', 'Appoquinimink School District'],
    bedrooms: '3 - 5',
    bathrooms: '2.5 - 4.5',
    garage: '2 - 3',
    stories: '1 - 2',
    sqft: '2,400 - 4,200',
    builderName: 'Custom Homes by Rush',
    builderLogoText: 'RUSH',
    builderExperience: 'Crafting luxury homes for over 25 years',
    floorplans: [],
    moveInReadyHomes: [],
    siteMapUrl: 'https://app.higharc.com/builders/demo',
    schoolDistrict: 'Appoquinimink School District',
    schools: [],
    nearbyPlaces: []
  },
  'abbotts-pond': {
    id: 'abbotts-pond',
    name: "Abbott's Pond Acres",
    location: 'Greenwood, DE',
    county: 'kent',
    price: 'From $430,000',
    lat: 38.8084,
    lng: -75.5908,
    address: '20 Amanda Ave, Greenwood, DE 19950',
    status: 'Now Selling',
    img: 'https://drive.google.com/thumbnail?id=1oF8FDvL11zdHgdIQtmllgWIAPoV6wgZY&sz=w1200',
    gallery: [
      'https://drive.google.com/thumbnail?id=1oF8FDvL11zdHgdIQtmllgWIAPoV6wgZY&sz=w1600',
      'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1600',
      'https://drive.google.com/thumbnail?id=1EdjXo54My1a3K9Q19GBHJ77DEB0y_L6r&sz=w1600',
      'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1600',
      'https://drive.google.com/thumbnail?id=1RnAGcAoxqxtbwPWSioGBeeQjuot_uoE2&sz=w1600'
    ],
    mainImageContain: true,
    description: "Located in Greenwood, Abbotts Pond Acres offers a peaceful residential setting with the perfect blend of privacy and convenience. This quiet community is known for its spacious surroundings, relaxed atmosphere, and easy access to nearby towns for shopping, dining, and everyday essentials. With quick connections to Route 13, residents enjoy a convenient commute to Milford and Dover, while Delaware’s coastal beaches, state parks, and outdoor recreation are just a short drive away. Whether you’re looking for a calm place to unwind or a central location that keeps you connected, Abbotts Pond Acres delivers comfortable living in a laid-back Delaware setting.",
    features: ['Granite Countertops', '42" Upper Kitchen Cabinets', "9' Ceilings on First Floor", '2-Car Attached Garage', 'Energy Star Certified', 'Weather Sealing System', 'LVP Flooring in Wet Areas', 'Full Landscaping Included'],
    bedrooms: '3 - 5',
    bathrooms: '2 - 3.5',
    garage: '2',
    stories: '1 - 2',
    sqft: '1,955 - 2,513',
    builderName: 'Ashburn Homes',
    builderLogoText: 'ASHBURN',
    builderLogoImg: 'https://drive.google.com/thumbnail?id=10oYf7kWSBirByVTWoVLr6aUFNuZ4Lpep&sz=w1000',
    builderExperience: '40+ years building quality homes in Delaware',
    floorplans: [
      {
        name: 'Lewes',
        price: '$445,000',
        beds: '3 Bed',
        baths: '2 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '2,022 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=10bJIxlQx0IyarO1ODmXDf59XW1rLNpIJ&sz=w1000',
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=149HSk6Sgzg61xLuyYlemVjz06Oo6d_E2&sz=w1000'],
        description: 'Lewes is a spacious single-story ranch home perfect for those seeking main-level living. Featuring an open-concept great room and kitchen, plus a luxurious owner\'s suite.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1G21W80sdVTcQe1OM4TnJWpJN4j2FhR3F&sz=w1000',
          'https://drive.google.com/thumbnail?id=1o7UXDMiTJ7Cu9WhirIffRTcinhrlsXYc&sz=w1000',
          'https://drive.google.com/thumbnail?id=1nyaCrwAbnQRaXuU4DX11miwQSjyqg_MS&sz=w1000',
          'https://drive.google.com/thumbnail?id=1o4FpirFvnP7Q-e6whXfLEjUBcpL9KZb-&sz=w1000'
        ]
      },
      {
        name: 'Burlington',
        price: '$430,000',
        beds: '3 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '1,955 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1oRtutWp8QKUPPu29luHWh8ytcVo838T7&sz=w1000',
        floorPlanImgs: [
          'https://drive.google.com/thumbnail?id=16icNWKWKvoTWMIHCp8cpvbFv2gEwbbV1&sz=w1000',
          'https://drive.google.com/thumbnail?id=1HubgNVVGgds_Q98KavPjDBnrpymtgJKh&sz=w1000'
        ],
        description: 'A thoughtful design featuring a formal dining room and a sprawling 2 story living room. Starting with 3 upper level bedrooms and large primary ensuite, this layout maximized every square foot.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1000',
          'https://drive.google.com/thumbnail?id=1Re7WuqQU6EC0UXrrXGopiTVKLJHwwTyk&sz=w1000',
          'https://drive.google.com/thumbnail?id=1RW-3s6GUtZnAEobiK8MzZb0wWVj1-S89&sz=w1000'
        ]
      },
      {
        name: 'Ashburton',
        price: '$465,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '2,257 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=16U1tFpQYEtBKxtd4DZfkCumjr5E7W2Xs&sz=w1000',
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=1LSA9h1M_quWCqQxT4grPM-EHx4jkWpaS&sz=w1000'],
        description: 'A premium single-story floor plan with an expansive central living area. The open floor plan allows the chef to oversee the family room and never feel separated from the party.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1X-9d5BB9-Dzajq2rRVDt6pcwQua9NCsv&sz=w1000',
          'https://drive.google.com/thumbnail?id=1EdjXo54My1a3K9Q19GBHJ77DEB0y_L6r&sz=w1000',
          'https://drive.google.com/thumbnail?id=1LEptssQ1V48f5H0VyhHXGaCVQyFeMSkR&sz=w1000'
        ]
      },
      {
        name: 'Oceanview',
        price: '$510,000',
        beds: '3 Bed',
        baths: '2 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '2,378 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1tBLScrZHZBS36Lx2LkIm4PSdeyMs0Xrw&sz=w1000',
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=1cFtLug8fJtr0EqVefFmy-hmx9OJ72_mY&sz=w1000'],
        description: 'This ranch style home boasts over 2,300 square feet of luxury living with an open floor plan perfect for entertaining. The home features elegant finishes, large windows, and high ceilings.',
        elevations: [
          'https://drive.google.com/thumbnail?id=17ggeIFE-snJAnbN-7XWECEZWZDe9yzzB&sz=w1000',
          'https://drive.google.com/thumbnail?id=1Yjm5vq2GK9-zKjEotJhOX8Q_RK7W69wF&sz=w1000',
          'https://drive.google.com/thumbnail?id=1Yw33rtGDJe4sMm3o5kdljV_cTa6MPXrf&sz=w1000',
          'https://drive.google.com/thumbnail?id=15fYysN5W-1mvBY9ylW8t7AwmBOQzIrtH&sz=w1000'
        ]
      },
      {
        name: 'Wyoming',
        price: '$440,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,379 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1geLCtkZfc68Zx6vzf2Do2u5uoY6P1XMo&sz=w1000',
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=1UjKll52BEBh9XQUxpmPGxSYMrrHFPWcM&sz=w1000'],
        description: 'This beautiful 4-bedroom, 2.5-bath home offers 2,379 sq ft of thoughtfully designed living space. Upstairs, you’ll love the oversized primary suite complete with a luxurious ensuite bath.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1IrBgP92YYCxU8lfT1ffEyRlt_AEqLhOa&sz=w1000',
          'https://drive.google.com/thumbnail?id=1h3WX0I5b3bi0JLou-1rTwgVRoBkUpxy&sz=w1000',
          'https://drive.google.com/thumbnail?id=1h5WI3H0eARReGf8b-OO1rzSudxsupZ6K&sz=w1000',
          'https://drive.google.com/thumbnail?id=1gvFg6UlzyqEjJtbB3GA7JButrfZt8Dlm&sz=w1000'
        ]
      },
      {
        name: 'Georgetown',
        price: '$495,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,513 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=15hUnb4K6LyT7wdwgeovl7NU0Wj5nhw7a&sz=w1000'],
        description: 'This stunning property offers over 2,500 square feet of living space with the master bedroom conveniently located on the main level. Features a grand 2-story living room.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1000',
          'https://drive.google.com/thumbnail?id=1cy706xj69lA-TilGaypgyqrfdOcWtYBJ&sz=w1000',
          'https://drive.google.com/thumbnail?id=1chIFJtKPgIALLDgJ5AOeIlPbnkQLkUw0&sz=w1000',
          'https://drive.google.com/thumbnail?id=1cZ7booYQIkrjwY-omgah7J1XacwhSYXn&sz=w1000',
          'https://drive.google.com/thumbnail?id=1coAwMTJIlkAEY-RpbSUDqFiDcvdpSWzR&sz=w1000'
        ]
      }
    ],
    moveInReadyHomes: [
      {
        name: 'Hampshire',
        address: 'Hampshire Inventory Home',
        lot: 'Available Now',
        price: '$475,900',
        status: 'Ready Now',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,415 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=17SgJm_eAMsAWMjMIFQIku6vcDizZzpVz&sz=w1000',
        description: 'This Hampshire model features 4 bedrooms, 2 and a half bath and is a beautifully designed. What better way to relax than in your master suite, which has an amazing en-suite full sized bathroom with tub and shower! The Hampshire\'s main floor also boasts an eat-in kitchen with dramatic maple 42" cabinetry. Spacious 9 foot high ceilings make the open floor plan bright and welcoming. The great room is built for hosting or just relaxing and taking in your beautiful new home. Pictures are of similar home and may show options that are not included in price.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1nKN9-gYEntJ4NqpuN4WbsTFjk8FrYJN2&sz=w1000',
          'https://drive.google.com/thumbnail?id=1CfElppr3yD2ISfBmxL9kiJwSP4pvzjj4&sz=w1000',
          'https://drive.google.com/thumbnail?id=1Cn-xYMBupcddQEyUfzu-wdyd073U9utX&sz=w1000',
          'https://drive.google.com/thumbnail?id=1CfFrsoeYdRLDlMYuqwYA7uuAR2ilZyqZ&sz=w1000'
        ],
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=1hY4VDlMQgKMhIwqdnqDP2oj6IHMUXWHS&sz=w1000']
      }
    ],
    siteMapUrl: 'https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/vqGWerxzkAp9d0B6/sales-map',
    schoolDistrict: 'Milford School District',
    schools: [
      { name: 'Evelyn I. Morris Early Childhood', grades: 'PK, K', distance: '10.6 mi' },
      { name: 'Mispillion Elementary School', grades: '1-5', distance: '11.7 mi' },
      { name: 'Milford Central Academy', grades: '6-8', distance: '11.2 mi' },
      { name: 'Milford Senior High School', grades: '11.2 mi', distance: '11.2 mi' }
    ],
    nearbyPlaces: [
      { name: 'Walmart Supercenter (Milford)', time: '18 min', icon: 'shop' },
      { name: 'Local Dining & Shops (Greenwood)', time: '3 min', icon: 'food' },
      { name: 'Harrington Casino & Raceway', time: '10 min', icon: 'mall' },
      { name: 'Killens Pond State Park', time: '14 min', icon: 'beach' },
      { name: 'Delaware Beaches (Rehoboth)', time: '48 min', icon: 'beach' }
    ]
  },
  'baywood-greens': {
    id: 'baywood-greens',
    name: 'Baywood Greens',
    location: 'Millsboro, DE',
    county: 'sussex',
    price: 'From $305,000',
    lat: 38.61861,
    lng: -75.19154,
    address: '25164 Dogleg Way, Millsboro, DE 19966',
    status: 'Now Selling',
    img: 'https://drive.google.com/thumbnail?id=1K4Ux3S9YqV4xNSc5IlocIlzQGzB6yyhq&sz=w1200',
    gallery: [
      'https://drive.google.com/thumbnail?id=1K4Ux3S9YqV4xNSc5IlocIlzQGzB6yyhq&sz=w1600'
    ],
    description: "Known as the 'Augusta of the North,' Baywood Greens is Delaware's premier golf course community. Enjoy resort-style living with world-class amenities just minutes from the beach.",
    features: ['Championship Golf', 'Resort Pool & Clubhouse', 'Garden Care Included'],
    bedrooms: '2 - 4',
    bathrooms: '2 - 3',
    garage: '1 - 2',
    stories: '1 - 2',
    sqft: '1,800 - 2,600',
    builderName: 'Tunnell Companies',
    builderLogoText: 'BAYWOOD',
    builderExperience: 'Resort living specialists since 1970',
    floorplans: [],
    moveInReadyHomes: [],
    siteMapUrl: 'https://baywoodgreens.com/interactive-map',
    schoolDistrict: 'Indian River School District',
    schools: [],
    nearbyPlaces: [],
    externalUrl: 'https://www.ashburnhomesatbaywood.com/'
  },
  'pinehurst-village': {
    id: 'pinehurst-village',
    name: 'Pinehurst Village',
    location: 'Felton, DE',
    county: 'kent',
    price: 'From $400,000',
    lat: 39.00645,
    lng: -75.58039,
    address: '25 Belfry Dr, Felton, DE 19943',
    status: 'Now Selling',
    img: 'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1200',
    gallery: [
      'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1600',
      'https://drive.google.com/thumbnail?id=1qJy3hT5Sg5HEz30-_hcaBdDbDI5BLgdr&sz=w1600',
      'https://drive.google.com/thumbnail?id=1ceA5K9Jy5inq4Lzq1CLfFo_lBO4tmkf0&sz=w1600',
      'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1600',
      'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1600'
    ],
    mainImageContain: true,
    description: 'Pinehurst Village is a vibrant new community designed for active lifestyles in the heart of Felton. Featuring carriage style garage doors and expansive floor plans, this community is built for those who value both style and substance. With 8\' unfinished basements standard and generous incentives, Pinehurst Village offers unparalleled value for Delaware homebuyers.',
    features: [
      '2025 Incentive: 20% OFF DESIGN OPTIONS',
      'Carriage Style Garage Doors',
      '42" Upper Cabinets Standard',
      'Stainless Steel Appliances',
      'Unfinished 8\' Basement Included',
      '3-Piece Under Slab Plumbing',
      'Spacious Open-Concept Designs',
      'Walking Trails & Playgrounds'
    ],
    bedrooms: '3 - 5',
    bathrooms: '2 - 3.5',
    garage: '2',
    stories: '1 - 2',
    sqft: '1,727 - 2,680',
    builderName: 'Ashburn Homes',
    builderLogoText: 'ASHBURN',
    builderLogoImg: 'https://drive.google.com/thumbnail?id=10oYf7kWSBirByVTWoVLr6aUFNuZ4Lpep&sz=w1000',
    builderExperience: '40+ years building quality homes in Delaware',
    floorplans: [
      {
        name: 'Windsor',
        price: '$400,000',
        beds: '3 Bed',
        baths: '2 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '1,727 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1Et6Pcx4lzk5tFD50-EmGQIhxiUqrmHZv&sz=w1000',
        description: 'The beautiful Windsor is a home that provides options. Looking for a nice size rancher that provides a clean open floor plan with 3 bedrooms and 2 full bath, then the Windsor is your home. Looking for a 2 story home that offers up to 5 bedrooms and over 2,300 sq ft, then the Windsor is your house. Either way you slice it, the Windsor is a dynamic home that is sure to please. The kitchen over looks the living room to provide an open floor plan that ensures no one is left out.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1Kc0MWxbFOo9YPJdPAVODzfEMvuFlU0zE&sz=w1000',
          'https://drive.google.com/thumbnail?id=1oIePo4rEDV8_Y57i3AppIJo5HyByd0wp&sz=w1000',
          'https://drive.google.com/thumbnail?id=1HLhNlUrQmyGrPRVNI_XeoO9sEzt1wifP&sz=w1000',
          'https://drive.google.com/thumbnail?id=1xe-HPh51RTLmQnm5U_iDuZ5b6_1v1wiF&sz=w1000',
          'https://drive.google.com/thumbnail?id=1b3dZ-kOdXWQCdBLitn_QLHXp4jj3J25c&sz=w1000'
        ],
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=164XZLPqedjzRaDlSbtM6LYh1m-jcwHuS&sz=w1000']
      },
      {
        name: 'Livingston',
        price: '$420,000',
        beds: '3 Bed',
        baths: '2 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '1,854 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1kq1cd8XgPpkT2l9c0nN7EhUVWRU8F4FT&sz=w1000',
        description: 'An open floor plan has never looked this good! The main floor hosts a 3 bedroom rancher with a split bedroom arrangement. With upgrades, the Livingston can host up to 5 bedrooms. The kitchen overlooks the open dining room and great room. There is space to put an optional 2nd floor with two bedrooms, a loft, and a full bath. Oversized windows in every room make this home bright!',
        elevations: [
          'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1000',
          'https://drive.google.com/thumbnail?id=10eAF0Qr8FOUbJvF9bqr_J_lw27YJ7mYQ&sz=w1000',
          'https://drive.google.com/thumbnail?id=10WLqLktNIAm-MJVwMLKzIbtBjXY2pQ88&sz=w1000',
          'https://drive.google.com/thumbnail?id=10rbsLU6W3KTN3C3iV5DA2PRCvoLjQOgT&sz=w1000'
        ],
        floorPlanImgs: ['https://drive.google.com/thumbnail?id=1eIenSKLz4CRnf8x6oXqWBIEp7wLEmDiH&sz=w1000']
      },
      {
        name: 'Lewes',
        price: '$430,000',
        beds: '3 Bed',
        baths: '2 Bath',
        garage: '2 Garage',
        stories: '1 Story',
        sqft: '2,022 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=10bJIxlQx0IyarO1ODmXDf59XW1rLNpIJ&sz=w1000',
        description: 'Spacious main-level living with a grand feel. The Lewes includes a large kitchen island, walk-in pantry, and a primary suite that feels like a private retreat.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1G21W80sdVTcQe1OM4TnJWpJN4j2FhR3F&sz=w1000',
          'https://drive.google.com/thumbnail?id=1o7UXDMiTJ7Cu9WhirIffRTcinhrlsXYc&sz=w1000',
          'https://drive.google.com/thumbnail?id=1nyaCrwAbnQRaXuU4DX11miwQSjyqg_MS&sz=w1000',
          'https://drive.google.com/thumbnail?id=1o4FpirFvnP7Q-e6whXfLEjUBcpL9KZb-&sz=w1000'
        ]
      },
      {
        name: 'Wyoming',
        price: '$425,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,379 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1geLCtkZfc68Zx6vzf2Do2u5uoY6P1XMo&sz=w1000',
        description: 'A classic 2-story design with expanded living areas. The Wyoming offers four spacious bedrooms on the upper level and a wide footprint for impressive curb appeal.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1IrBgP92YYCxU8lfT1ffEyRlt_AEqLhOa&sz=w1000',
          'https://drive.google.com/thumbnail?id=1h3WX0I5b3bi0JLou-1rTwgVRoBkUpxy&sz=w1000',
          'https://drive.google.com/thumbnail?id=1h5WI3H0eARReGf8b-OO1rzSudxsupZ6K&sz=w1000',
          'https://drive.google.com/thumbnail?id=1gvFg6UlzyqEjJtbB3GA7JButrfZt8Dlm&sz=w1000'
        ]
      },
      {
        name: 'Camden Grand',
        price: '$458,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,680 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1GKgbkA-bZx8vLmMAr589Jo7bGt_8YWmC&sz=w1000',
        description: 'Step into the Camden Grand, a breathtaking 2,680 sq. ft. home designed to impress at every turn. The soaring two-story family room floods the main level with natural light, creating an unforgettable space to gather and entertain. A chef-inspired kitchen with stainless steel appliances, a spacious island, and pantry flows seamlessly into the breakfast area and living space, while a formal dining room and private study add both elegance and versatility.',
        elevations: [
          'https://drive.google.com/thumbnail?id=14yiXK5bTK_H1JBUkGELQHOupJDXwBxbd&sz=w1000',
          'https://drive.google.com/thumbnail?id=1RqKbtnPymNGs2drhqiQ1wSHGctEbezTr&sz=w1000',
          'https://drive.google.com/thumbnail?id=1-7bJhKbVZ9AHWXCBM6GOl_YfJHgWwMkJ&sz=w1000',
          'https://drive.google.com/thumbnail?id=15nZ-4mph-4-2fr0HsPjqdnL9KToooWDj&sz=w1000'
        ]
      },
      {
        name: 'Georgetown',
        price: '$480,000',
        beds: '4 Bed',
        baths: '2.5 Bath',
        garage: '2 Garage',
        stories: '2 Story',
        sqft: '2,513 Sq. Ft.',
        img: 'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
        description: 'A sophisticated master-on-main design with extra bedrooms upstairs. The Georgetown offers the convenience of first-floor primary living with the space of a full 2-story home.',
        elevations: [
          'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1000',
          'https://drive.google.com/thumbnail?id=1cy706xj69lA-TilGaypgyqrfdOcWtYBJ&sz=w1000',
          'https://drive.google.com/thumbnail?id=1chIFJtKPgIALLDgJ5AOeIlPbnkQLkUw0&sz=w1000',
          'https://drive.google.com/thumbnail?id=1cZ7booYQIkrjwY-omgah7J1XacwhSYXn&sz=w1000',
          'https://drive.google.com/thumbnail?id=1coAwMTJIlkAEY-RpbSUDqFiDcvdpSWzR&sz=w1000'
        ]
      }
    ],
    moveInReadyHomes: [],
    siteMapUrl: 'https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map',
    schoolDistrict: 'Lake Forest School District',
    schools: [
      { name: 'Lake Forest North Elementary', grades: 'PK, K-3', distance: '1.1 mi' },
      { name: 'Lake Forest Central Elementary', grades: '4-5', distance: '2.5 mi' },
      { name: 'W.T. Chipman Middle School', grades: '6-8', distance: '2.8 mi' },
      { name: 'Lake Forest High School', grades: '9-12', distance: '3.1 mi' }
    ],
    nearbyPlaces: [
      { name: 'Killens Pond', time: '9 min', icon: 'beach' },
      { name: 'Walmart', time: '12 min', icon: 'shop' },
      { name: 'Dover Air Force Base', time: '16 min', icon: 'mall' },
      { name: 'Bayhealth Hospital', time: '18 min', icon: 'health' },
      { name: 'Dover Mall', time: '22 min', icon: 'mall' },
      { name: 'Rehoboth Beach', time: '55 min', icon: 'beach' },
      { name: 'Philadelphia Airport', time: '1 hr 15 min', icon: 'mall' }
    ]
  }
};
