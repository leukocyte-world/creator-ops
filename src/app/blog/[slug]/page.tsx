'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Post } from '../page';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog?slug=${params.slug}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar hiddenOnDesktop />
        <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="spinner" style={{ width: 40, height: 40, borderTopColor: 'var(--accent-orange)' }}></div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="app-shell">
        <Sidebar hiddenOnDesktop />
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <h1 style={{ marginBottom: 20 }}>Post not found</h1>
          <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className="desktop-nav" style={{ backgroundColor: 'rgba(13, 15, 20, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="nav-container">
          <Link href="/" className="logo-mark">
            <div className="logo-icon">C</div>
            <span className="logo-text">CreatorOps</span>
          </Link>
          <div className="nav-links">
            <Link href="/tools">AI Tools</Link>
            <Link href="/blog" style={{ color: 'var(--text-primary)' }}>Resources</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-sm">Start Free</Link>
          </div>
        </div>
      </nav>

      <Sidebar hiddenOnDesktop />

      <main className="main-content" style={{ paddingBottom: 100 }}>
        <article className="tool-page" style={{ maxWidth: 860, paddingTop: 120 }}>
          <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', marginBottom: 40, fontSize: 14 }}>
            <ArrowLeft size={16} /> Back to all resources
          </Link>

          <header style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
               <span className="badge badge-x">{post.category}</span>
               <span className="badge badge-pro">Creator Guide</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>{post.title}</h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <User size={14} /> Author: <strong>{post.author}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} /> Published: {new Date(post.published_at).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Tag size={14} /> {post.category}
              </div>
            </div>
          </header>

          {post.cover_image && (
            <div style={{ width: '100%', borderRadius: 24, overflow: 'hidden', marginBottom: 48, border: '1px solid var(--border)' }}>
              <img src={post.cover_image} alt={post.title} style={{ width: '100%', display: 'block' }} />
            </div>
          )}

          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div style={{ marginTop: 64, padding: '40px 32px', background: 'var(--bg-glass)', borderRadius: 24, border: '1px solid var(--border)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 12 }}>Ready to apply these strategies?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Get started with our 17+ AI tools designed specifically for modern creators.</p>
            <Link href={session ? "/tools" : "/auth/signin"} className="btn btn-primary btn-lg">
              Start Building Now
            </Link>
          </div>
        </article>

        <Footer />
      </main>

      <style jsx global>{`
        .blog-content {
          font-size: 17px;
          line-height: 1.8;
          color: var(--text-primary);
        }
        .blog-content h2 { font-size: 28px; margin-top: 48px; margin-bottom: 20px; }
        .blog-content h3 { font-size: 22px; margin-top: 32px; margin-bottom: 16px; }
        .blog-content p { margin-bottom: 24px; }
        .blog-content ul, .blog-content ol { margin-bottom: 24px; padding-left: 20px; }
        .blog-content li { margin-bottom: 8px; }
        .blog-content code { background: var(--bg-surface); padding: 2px 6px; border-radius: 4px; color: var(--accent-orange); font-family: monospace; }
        .blog-content pre { background: var(--bg-surface); padding: 20px; border-radius: 12px; overflow-x: auto; margin-bottom: 24px; border: 1px solid var(--border); }
        .blog-content blockquote { border-left: 4px solid var(--accent-orange); padding-left: 20px; color: var(--text-secondary); font-style: italic; margin-bottom: 24px; }
        .blog-content img { max-width: 100%; border-radius: 16px; margin: 32px 0; }
      `}</style>
    </div>
  );
}
