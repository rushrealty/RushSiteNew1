'use client';

import React from 'react';
import ListingsPageContent, { ListingsPageConfig } from './ListingsPageContent';

const SEARCH_CONFIG: ListingsPageConfig = {
  apiEndpoint: '/api/search',
  basePath: '/search',
  heroLabel: 'Browse Listings',
  heroTitle: 'Search Homes',
  heroDescription: 'Explore all available homes for sale in Delaware.',
};

interface SearchContentProps {
  onPropertyClick?: (property: import('../../types').Property) => void;
  initialPropertyId?: string;
}

const SearchContent: React.FC<SearchContentProps> = ({ onPropertyClick, initialPropertyId }) => {
  return (
    <ListingsPageContent
      config={SEARCH_CONFIG}
      onPropertyClick={onPropertyClick}
      initialPropertyId={initialPropertyId}
    />
  );
};

export default SearchContent;
