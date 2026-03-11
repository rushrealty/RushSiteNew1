import { MetadataRoute } from 'next'
import { fetchInventoryData } from '@/lib/inventory'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rushhome.com'

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/new-construction`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/quick-move-in`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/available-communities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/selling`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mortgage-101`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/assurance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/exclusive`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Dynamic community pages from Google Sheet
  let communityPages: MetadataRoute.Sitemap = []
  try {
    const inventoryData = await fetchInventoryData()
    const sheetSlugs = inventoryData.communities
      .map(c => c.slug || c.id)
      .filter(Boolean)

    // Merge sheet slugs with known slugs
    const knownSlugs = [
      'abbotts-pond',
      'pinehurst-village',
      'baywood-greens',
      'currie-lane',
      'canaan-woods',
    ]
    const allSlugs = [...new Set([...knownSlugs, ...sheetSlugs])]

    communityPages = allSlugs.map(slug => ({
      url: `${baseUrl}/available-communities/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Fall back to known communities if sheet is unavailable
    const knownSlugs = [
      'abbotts-pond',
      'pinehurst-village',
      'baywood-greens',
      'currie-lane',
      'canaan-woods',
    ]
    communityPages = knownSlugs.map(slug => ({
      url: `${baseUrl}/available-communities/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  }

  return [...staticPages, ...communityPages]
}
