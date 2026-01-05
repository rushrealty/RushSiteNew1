import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rushhome.com'
  
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/get-offer`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/sell`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/how-to-buy`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/mortgage-101`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/new-construction`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/assurance`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/available-communities`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/available-communities/abbotts-pond`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/available-communities/pinehurst-village`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/available-communities/wiggins-mill`, lastModified: new Date(), priority: 0.7 },
  ]
}
