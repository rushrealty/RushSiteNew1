'use client';

import React from 'react';
import ListingsPageContent, { ListingsPageConfig } from './ListingsPageContent';

const QMI_CONFIG: ListingsPageConfig = {
  apiEndpoint: '/api/quick-move-in?includeAll=true',
  basePath: '/quick-move-in',
  heroLabel: 'Move-in Ready',
  heroTitle: 'Quick Move-In Homes',
  heroDescription: 'These are homes that are already built by the builder, or in the process of being built, so the buyer does not have to wait to build from scratch.',
};

interface QuickMoveInContentProps {
  onPropertyClick?: (property: import('../../types').Property) => void;
  initialPropertyId?: string;
}

const QuickMoveInContent: React.FC<QuickMoveInContentProps> = ({ onPropertyClick, initialPropertyId }) => {
  return (
    <ListingsPageContent
      config={QMI_CONFIG}
      onPropertyClick={onPropertyClick}
      initialPropertyId={initialPropertyId}
    />
  );
};

export default QuickMoveInContent;
