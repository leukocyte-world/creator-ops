import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | CreatorOps AI',
    };
  }

  return {
    title: `${post.title} | CreatorOps AI`,
    description: post.excerpt || `Read ${post.title} on the CreatorOps AI blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
      type: 'article',
    },
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
