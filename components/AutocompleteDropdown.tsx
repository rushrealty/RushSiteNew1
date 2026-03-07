'use client';

import React, { forwardRef, Fragment } from 'react';
import { MapPin, Home, Building2, Search } from 'lucide-react';
import type { AutocompletePrediction, AutocompleteResults } from '@/lib/autocomplete-types';

// ── Helpers ────────────────────────────────────────────────────────────

/** Wrap matched portions of text in <strong> tags, Google-style */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || query.length < 1) return text;

  const q = query.trim().toLowerCase();
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);

  if (idx === -1) return text;

  return (
    <>
      <span className="text-gray-400">{text.slice(0, idx)}</span>
      <span className="font-semibold text-gray-900">{text.slice(idx, idx + q.length)}</span>
      <span className="text-gray-400">{text.slice(idx + q.length)}</span>
    </>
  );
}

function formatPrice(price?: string | number): string {
  if (!price) return '';
  const num = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, ''), 10) : price;
  if (isNaN(num)) return '';
  return `$${num.toLocaleString()}`;
}

function getIcon(type: string) {
  switch (type) {
    case 'location':
      return <MapPin size={14} className="text-gray-500" />;
    case 'property':
      return <Home size={14} className="text-green-600" />;
    case 'community':
      return <Building2 size={14} className="text-blue-600" />;
    case 'inventory':
      return <Home size={14} className="text-amber-600" />;
    default:
      return <Search size={14} className="text-gray-400" />;
  }
}

// ── Component types ────────────────────────────────────────────────────

interface AutocompleteDropdownProps {
  results: AutocompleteResults;
  query: string;
  selectedIndex: number;
  isLoading: boolean;
  isOpen: boolean;
  onSelect: (prediction: AutocompletePrediction) => void;
  variant?: 'hero' | 'search';
}

// ── Category section ───────────────────────────────────────────────────

function CategorySection({
  label,
  predictions,
  query,
  startIndex,
  selectedIndex,
  onSelect,
  variant,
}: {
  label: string;
  predictions: AutocompletePrediction[];
  query: string;
  startIndex: number;
  selectedIndex: number;
  onSelect: (p: AutocompletePrediction) => void;
  variant: 'hero' | 'search';
}) {
  if (predictions.length === 0) return null;

  const isHero = variant === 'hero';

  return (
    <div>
      <div className={`px-3 ${isHero ? 'py-1.5' : 'py-1'} text-[10px] font-semibold tracking-wider text-gray-400 uppercase`}>
        {label}
      </div>
      {predictions.map((prediction, i) => {
        const flatIndex = startIndex + i;
        const isSelected = flatIndex === selectedIndex;

        return (
          <button
            key={`${prediction.type}-${prediction.description}-${i}`}
            type="button"
            className={`w-full text-left ${isHero ? 'px-3 py-2.5' : 'px-3 py-2'} flex items-center gap-2.5 transition-colors cursor-pointer ${
              isSelected
                ? 'bg-gray-100'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelect(prediction)}
            onMouseEnter={() => {
              // Let parent know via index if needed
            }}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 ${isHero ? 'w-8 h-8' : 'w-7 h-7'} rounded-full flex items-center justify-center ${
                prediction.type === 'community'
                  ? 'bg-blue-50'
                  : prediction.type === 'inventory'
                  ? 'bg-amber-50'
                  : prediction.type === 'property'
                  ? 'bg-green-50'
                  : 'bg-gray-100'
              }`}
            >
              {getIcon(prediction.type)}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={`${isHero ? 'text-sm' : 'text-[13px]'} truncate leading-snug`}>
                {highlightMatch(prediction.description, query)}
              </p>
              <MetaLine prediction={prediction} variant={variant} />
            </div>

            {/* Badge */}
            <Badge type={prediction.type} />
          </button>
        );
      })}
    </div>
  );
}

// ── Meta line (secondary info) ─────────────────────────────────────────

function MetaLine({
  prediction,
  variant,
}: {
  prediction: AutocompletePrediction;
  variant: 'hero' | 'search';
}) {
  const size = variant === 'hero' ? 'text-xs' : 'text-[11px]';

  if (prediction.type === 'location') {
    const parts: string[] = [];
    if (prediction.county) parts.push(`${prediction.county} County`);
    parts.push('Delaware');
    return <p className={`${size} text-gray-400`}>{parts.join(' · ')}</p>;
  }

  if (prediction.type === 'property') {
    const price = formatPrice(prediction.listPrice);
    const parts: string[] = [];
    if (price) parts.push(price);
    if (prediction.mlsNumber) parts.push(`MLS# ${prediction.mlsNumber}`);
    return parts.length > 0 ? (
      <p className={`${size} text-gray-400`}>
        {price && <span className="text-green-600 font-medium">{price}</span>}
        {price && prediction.mlsNumber && <span className="mx-1 text-gray-300">·</span>}
        {prediction.mlsNumber && <span>MLS# {prediction.mlsNumber}</span>}
      </p>
    ) : null;
  }

  if (prediction.type === 'community') {
    const parts: string[] = [];
    if (prediction.communityData && 'city' in prediction.communityData) {
      parts.push((prediction.communityData as { city: string }).city);
    } else if (prediction.city) {
      parts.push(prediction.city);
    }
    parts.push('DE');
    const price = prediction.communityData && 'minPrice' in prediction.communityData
      ? formatPrice((prediction.communityData as { minPrice: number }).minPrice)
      : '';
    return (
      <p className={`${size} text-gray-400`}>
        {parts.join(', ')}
        {price && <span className="text-blue-600 font-medium ml-1">From {price}</span>}
      </p>
    );
  }

  if (prediction.type === 'inventory') {
    const inv = prediction.inventoryData;
    if (!inv) return null;
    const details: string[] = [];
    if ('price' in inv && inv.price) details.push(formatPrice(inv.price));
    if ('beds' in inv && inv.beds) details.push(`${inv.beds} bd`);
    if ('baths' in inv && inv.baths) details.push(`${inv.baths} ba`);
    if ('sqft' in inv && inv.sqft) details.push(`${inv.sqft.toLocaleString()} sqft`);
    return details.length > 0 ? (
      <p className={`${size} text-gray-400`}>
        <span className="text-amber-600 font-medium">{details[0]}</span>
        {details.slice(1).map((d, i) => (
          <Fragment key={i}>
            <span className="mx-1 text-gray-300">·</span>
            <span>{d}</span>
          </Fragment>
        ))}
      </p>
    ) : null;
  }

  return null;
}

// ── Badge ──────────────────────────────────────────────────────────────

function Badge({ type }: { type: string }) {
  switch (type) {
    case 'community':
      return (
        <span className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
          Community
        </span>
      );
    case 'inventory':
      return (
        <span className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
          Available
        </span>
      );
    case 'property':
      return (
        <span className="flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
          MLS
        </span>
      );
    default:
      return null;
  }
}

// ── Main dropdown ──────────────────────────────────────────────────────

const AutocompleteDropdown = forwardRef<HTMLDivElement, AutocompleteDropdownProps>(
  function AutocompleteDropdown(
    { results, query, selectedIndex, isLoading, isOpen, onSelect, variant = 'hero' },
    ref
  ) {
    const { locations, properties, communities } = results;
    const totalResults = locations.length + properties.length + communities.length;

    if (!isOpen) return null;

    // Index offsets for each category
    const locStart = 0;
    const propStart = locations.length;
    const comStart = locations.length + properties.length;

    const isHero = variant === 'hero';

    return (
      <div
        ref={ref}
        className={`absolute left-0 right-0 z-50 bg-white border border-gray-200 overflow-hidden ${
          isHero
            ? 'mt-2 rounded-2xl shadow-xl max-h-[400px]'
            : 'mt-1 rounded-xl shadow-lg max-h-72'
        } overflow-y-auto`}
      >
        {/* Location results (instant) */}
        <CategorySection
          label="Locations"
          predictions={locations}
          query={query}
          startIndex={locStart}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          variant={variant}
        />

        {/* Divider between instant and API results */}
        {locations.length > 0 && (properties.length > 0 || communities.length > 0) && (
          <div className="border-t border-gray-100" />
        )}

        {/* Property results (API) */}
        <CategorySection
          label="Properties"
          predictions={properties}
          query={query}
          startIndex={propStart}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          variant={variant}
        />

        {/* Divider */}
        {properties.length > 0 && communities.length > 0 && (
          <div className="border-t border-gray-100" />
        )}

        {/* Community results (API) */}
        <CategorySection
          label="Communities"
          predictions={communities}
          query={query}
          startIndex={comStart}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          variant={variant}
        />

        {/* Loading indicator for API tier */}
        {isLoading && (
          <div className={`px-3 ${isHero ? 'py-3' : 'py-2'} flex items-center justify-center gap-2`}>
            <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            <span className="text-xs text-gray-400">Searching listings...</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && totalResults === 0 && query.length >= 2 && (
          <div className={`px-4 ${isHero ? 'py-6' : 'py-4'} text-center`}>
            <Search size={20} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">
              No results for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Try a city, ZIP code, or address
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default AutocompleteDropdown;
