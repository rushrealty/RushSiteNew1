import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/listing',
          '/listings',
        ],
      },
    ],
    sitemap: 'https://rushhome.com/sitemap.xml',
  }
}
