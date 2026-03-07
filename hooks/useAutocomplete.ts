'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { searchLocations } from '@/lib/autocomplete-data';
import type {
  AutocompletePrediction,
  AutocompleteResults,
  AutocompleteApiResponse,
} from '@/lib/autocomplete-types';

interface UseAutocompleteOptions {
  /** Debounce for API calls in ms (default 300) */
  debounceMs?: number;
  /** Called when an inventory item is selected instead of navigating */
  onInventorySelect?: (prediction: AutocompletePrediction) => void;
}

export function useAutocomplete(options: UseAutocompleteOptions = {}) {
  const { debounceMs = 300, onInventorySelect } = options;
  const router = useRouter();

  // ── State ──────────────────────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AutocompleteResults>({
    locations: [],
    properties: [],
    communities: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // ── Flat list of all results (for keyboard navigation) ─────────────

  const allResults = useMemo(() => {
    return [...results.locations, ...results.properties, ...results.communities];
  }, [results]);

  // ── Tier 1: Instant local matching ─────────────────────────────────

  useEffect(() => {
    const q = query.trim();
    if (q.length < 1) {
      setResults((prev) => ({ ...prev, locations: [] }));
      setIsOpen(false);
      return;
    }

    // Instant client-side location search
    const locations = searchLocations(q, 5).map((loc) => ({
      description: loc.name,
      type: 'location' as const,
      city: loc.city,
      county: loc.county,
      zip: loc.zip,
    }));

    setResults((prev) => ({ ...prev, locations }));
    if (locations.length > 0) {
      setIsOpen(true);
    }
    setSelectedIndex(-1);
  }, [query]);

  // ── Tier 2: Debounced API search ───────────────────────────────────

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults((prev) => ({ ...prev, properties: [], communities: [] }));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/locations/autocomplete?query=${encodeURIComponent(q)}`
        );
        if (!res.ok) throw new Error('API error');

        const data: AutocompleteApiResponse = await res.json();

        setResults((prev) => ({
          ...prev,
          properties: data.properties || [],
          communities: data.communities || [],
        }));
        setIsOpen(true);
      } catch {
        setResults((prev) => ({ ...prev, properties: [], communities: [] }));
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, debounceMs]);

  // ── Click outside to close ─────────────────────────────────────────

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Selection handler ──────────────────────────────────────────────

  const handleSelect = useCallback(
    (prediction: AutocompletePrediction) => {
      setIsOpen(false);
      setSelectedIndex(-1);
      setQuery(prediction.description);

      switch (prediction.type) {
        case 'community':
          if (prediction.communityId) {
            router.push(`/communities?community=${prediction.communityId}`);
          }
          break;

        case 'inventory':
          if (onInventorySelect) {
            onInventorySelect(prediction);
          } else if (prediction.inventoryId) {
            router.push(`/quick-move-in?property=${prediction.inventoryId}`);
          }
          break;

        case 'property':
          {
            const params = new URLSearchParams();
            if (prediction.description) params.set('search', prediction.description);
            if (prediction.city) params.set('city', prediction.city);
            if (prediction.mlsNumber) params.set('mls', prediction.mlsNumber);
            router.push(`/search?${params.toString()}`);
          }
          break;

        case 'location':
          {
            const params = new URLSearchParams();
            if (prediction.city) {
              params.set('city', prediction.city);
              params.set('search', prediction.city);
            }
            if (prediction.county) params.set('county', prediction.county);
            if (prediction.zip) {
              params.set('zip', prediction.zip);
              params.set('search', prediction.zip);
            }
            router.push(`/search?${params.toString()}`);
          }
          break;

        default:
          router.push(`/search?search=${encodeURIComponent(prediction.description)}`);
      }
    },
    [router, onInventorySelect]
  );

  // ── Submit raw query ───────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    const q = query.trim();
    if (!q) return;
    setIsOpen(false);
    setSelectedIndex(-1);
    router.push(`/search?search=${encodeURIComponent(q)}`);
  }, [query, router]);

  // ── Keyboard navigation ────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen && e.key === 'ArrowDown' && allResults.length > 0) {
        setIsOpen(true);
        setSelectedIndex(0);
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < allResults.length - 1 ? prev + 1 : prev
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;

        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < allResults.length) {
            handleSelect(allResults[selectedIndex]);
          } else {
            handleSubmit();
          }
          break;

        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [isOpen, selectedIndex, allResults, handleSelect, handleSubmit]
  );

  // ── Helpers ────────────────────────────────────────────────────────

  const hasResults = allResults.length > 0;

  const clear = useCallback(() => {
    setQuery('');
    setResults({ locations: [], properties: [], communities: [] });
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    allResults,
    hasResults,
    inputRef,
    dropdownRef,
    handleKeyDown,
    handleSelect,
    handleSubmit,
    clear,
  };
}
