import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://intellumia.com/',
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://intellumia.com/point-of-view',
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://intellumia.com/connect',
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://intellumia.com/privacy',
      lastModified: new Date('2026-08-23'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
