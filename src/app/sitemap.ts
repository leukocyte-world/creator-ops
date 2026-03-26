import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creatorops.site';

  const xTools = [
    'reverse-engineer',
    'one-liner',
    'transformation',
    'hook-generator',
    'listicle',
  ];

  const ytTools = [
    'money-niche',
    'faceless-video',
    'viral-titles',
    'income-streams',
    'algorithm-hack',
    '90-day-map',
    'retention-script',
    'shorts',
    'thumbnail',
    'ai-workflow',
    'calendar',
    'competitor',
    'first-10',
  ];

  const xToolRoutes = xTools.map((tool) => ({
    url: `${baseUrl}/tools/x/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const ytToolRoutes = ytTools.map((tool) => ({
    url: `${baseUrl}/tools/youtube/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...xToolRoutes,
    ...ytToolRoutes,
  ];
}
