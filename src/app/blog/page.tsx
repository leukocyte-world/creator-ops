'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts, Post } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-24 px-4 md:px-8">
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 80, backgroundColor: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', zIndex: 100 }}>
        <Link href="/" style={{ fontSize: 24, fontWeight: 900, fontFamily: 'Syne, sans-serif', letterSpacing: -1, color: 'var(--text-primary)', textDecoration: 'none' }}>
          CREATOR<span style={{ color: 'var(--brand-primary)' }}>OPS</span>
        </Link>
        <div style={{ display: 'flex', gap: 30 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Home</Link>
          <Link href="/tools" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Tools</Link>
          <Link href="/blog" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Resources</Link>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto w-full pb-20">
        <header className="mb-16 text-center">
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, letterSpacing: -2, marginBottom: 20 }}>
            Creator <span className="gradient-text">Resources</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Expert guides on AI growth, YouTube automation, and mastering the X algorithm.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="spinner" />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: 24, border: '1px dashed var(--border-color)' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, marginBottom: 12 }}>Stay Tuned!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We're currently drafting high-value resources for you. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', marginBottom: 20, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  {post.cover_image && (
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'var(--brand-primary)', color: '#000', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                    {post.category}
                  </div>
                </div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .blog-card {
          padding: 24px;
          border-radius: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        .blog-card:hover {
          transform: translateY(-8px);
          border-color: var(--brand-primary);
          box-shadow: 0 12px 40px rgba(0, 243, 255, 0.1);
        }
        .gradient-text {
          background: linear-gradient(90deg, var(--brand-primary), #fff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
