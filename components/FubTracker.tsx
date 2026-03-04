'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    widgetTracker?: (...args: unknown[]) => void;
  }
}

/**
 * Track a virtual pageview in Follow Up Boss.
 * Sets document.title before firing so FUB captures the correct page name.
 */
export function trackFubPageView(title: string) {
  if (typeof window === 'undefined') return;
  document.title = title;
  if (window.widgetTracker) {
    window.widgetTracker('send', 'pageview');
  }
}

/**
 * FubTracker component — fires widgetTracker("send", "pageview") on every
 * Next.js client-side route change so FUB sees individual page views
 * instead of just the initial page load.
 */
export default function FubTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the first render — the pixel in layout.tsx already fires the initial pageview
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Small delay to let Next.js update document.title via metadata
    const timer = setTimeout(() => {
      if (window.widgetTracker) {
        window.widgetTracker('send', 'pageview');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
