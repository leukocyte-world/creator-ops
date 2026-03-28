import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch blog posts for dynamic sitemap safely
  let blogPostRoutes: MetadataRoute.Sitemap = [];
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { getPosts } = await import('@/lib/supabase');
      const posts = await getPosts(true);
      blogPostRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/upgrade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...xToolRoutes,
    ...ytToolRoutes,
    ...blogPostRoutes,
  ];
}
