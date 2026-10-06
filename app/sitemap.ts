import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://intellumia.com/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://intellumia.com/point-of-view/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://intellumia.com/point-of-view/full/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://intellumia.com/lab/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://intellumia.com/lab/walkthrough/',
      lastModified: new Date('2026-10-06'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://intellumia.com/connect/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://intellumia.com/privacy/',
      lastModified: new Date('2026-10-05'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
