import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Converts Google Drive view/share links to direct image URLs.
 * Input: https://drive.google.com/file/d/{FILE_ID}/view?usp=drive_link
 * Output: https://drive.google.com/uc?export=view&id={FILE_ID}
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // Match Google Drive file URLs
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Already a direct URL or not a Google Drive link
  return url;
}

/**
 * Normalizes an address for comparison purposes.
 * Converts to lowercase, standardizes common abbreviations,
 * and removes punctuation.
 */
export function normalizeAddress(address: string): string {
  return address
    .toLowerCase()
    .trim()
    // Standardize street type abbreviations
    .replace(/\bstreet\b/gi, 'st')
    .replace(/\bdrive\b/gi, 'dr')
    .replace(/\bavenue\b/gi, 'ave')
    .replace(/\broad\b/gi, 'rd')
    .replace(/\blane\b/gi, 'ln')
    .replace(/\bcourt\b/gi, 'ct')
    .replace(/\bcircle\b/gi, 'cir')
    .replace(/\bplace\b/gi, 'pl')
    .replace(/\bboulevard\b/gi, 'blvd')
    .replace(/\bparkway\b/gi, 'pkwy')
    .replace(/\bterrace\b/gi, 'ter')
    .replace(/\bhighway\b/gi, 'hwy')
    // Standardize directional abbreviations
    .replace(/\bnorth\b/gi, 'n')
    .replace(/\bsouth\b/gi, 's')
    .replace(/\beast\b/gi, 'e')
    .replace(/\bwest\b/gi, 'w')
    .replace(/\bnortheast\b/gi, 'ne')
    .replace(/\bnorthwest\b/gi, 'nw')
    .replace(/\bsoutheast\b/gi, 'se')
    .replace(/\bsouthwest\b/gi, 'sw')
    // Remove punctuation and extra spaces
    .replace(/[.,#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
