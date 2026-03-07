'use client';

import React from 'react';
import ListingsPageContent, { ListingsPageConfig } from './ListingsPageContent';

const BUY_CONFIG: ListingsPageConfig = {
  apiEndpoint: '/api/search',
  basePath: '/buy',
  heroLabel: 'All Listings',
  heroTitle: 'Find Your Dream Home',
  heroDescription: 'Search all available homes for sale across Delaware with Rush Home Team.',
};

interface BuyContentProps {
  onPropertyClick?: (property: import('../../types').Property) => void;
  initialPropertyId?: string;
}

const BuyContent: React.FC<BuyContentProps> = ({ onPropertyClick, initialPropertyId }) => {
  return (
    <ListingsPageContent
      config={BUY_CONFIG}
      onPropertyClick={onPropertyClick}
      initialPropertyId={initialPropertyId}
    />
  );
};

export default BuyContent;
