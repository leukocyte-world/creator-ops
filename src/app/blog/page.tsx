'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  author: string;
  category: string;
  published_at: string;
  created_at: string;
  is_published: boolean;
}

export default function BlogPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="blog-page-root" style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>
      <nav className="desktop-nav" style={{ position: 'relative', height: 'auto', padding: '24px 40px', background: 'rgba(13, 15, 20, 0.4)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto' }}>
          <Link href="/" className="logo-mark" style={{ flexShrink: 0 }}>
            <div className="logo-icon">C</div>
            <span className="logo-text">CreatorOps</span>
          </Link>
          
          <div className="nav-links" style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 }}>
            <Link href="/tools">AI Tools</Link>
            <Link href="/blog" style={{ color: 'var(--text-primary)' }}>Resources</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#contact">Contact Us</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <div className="lang-flags" style={{ display: 'flex', gap: 10, opacity: 0.8 }}>
              <span title="Spanish" style={{ cursor: 'pointer', fontSize: 18 }}>🇪🇸</span>
              <span title="Ukrainian" style={{ cursor: 'pointer', fontSize: 18 }}>🇺🇦</span>
            </div>
            <Link href={session ? "/dashboard" : "/auth/signin"} style={{ fontSize: 14, fontWeight: 500, marginLeft: 8 }}>Login</Link>
            <Link href={session ? "/dashboard" : "/auth/signin"} className="btn btn-primary btn-sm" style={{ borderRadius: 99, padding: '10px 24px', background: 'var(--brand-accent)', color: '#1a1000' }}>Sign Up</Link>
          </div>
        </div>
      </nav>

      <Sidebar hiddenOnDesktop />
      
      <main className="main-content" style={{ paddingBottom: 100, marginLeft: 0 }}>
        <header className="tool-page" style={{ textAlign: 'center', paddingTop: 80, maxWidth: 1000, margin: '0 auto' }}>
          <div className="badge badge-pro" style={{ marginBottom: 16 }}>The Creator Playbook</div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '0 0 16px', lineHeight: 1.1 }}>
            Scale Your <span className="hero-title-gradient" style={{ display: 'inline' }}>Attention.</span>
          </h1>
          <p className="hero-sub" style={{ margin: '0 auto 40px', opacity: 0.8 }}>
            Expert strategies on AI content creation, algorithm hacking, and building digital assets.
          </p>
        </header>

        <section className="tool-page" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="spinner" style={{ width: 32, height: 32, borderTopColor: 'var(--accent-orange)' }}></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="card" style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--bg-glass)', borderStyle: 'dashed' }}>
              <h2 style={{ marginBottom: 8 }}>Stay Tuned</h2>
              <p style={{ color: 'var(--text-secondary)' }}>We're currently drafting high-value resources. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 40 }}>📄</div>
                    )}
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <span className="badge badge-x">{post.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{post.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineBreak: 'anywhere', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                      <div className="logo-icon" style={{ width: 24, height: 24, fontSize: 11 }}>C</div>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>

      <style jsx>{`
        .hero-title-gradient {
          background: var(--gradient-hero);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
