'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPostBySlug, Post } from '@/lib/supabase';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

export default function PostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (slug) {
        const data = await getPostBySlug(slug);
        setPost(data);
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-40 flex justify-center"><span className="spinner" /></div>;

  if (!post) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>Post not found</h1>
        <Link href="/blog" style={{ color: 'var(--brand-primary)', textDecoration: 'none' }}>Return to Resources</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-32 px-4 md:px-8">
      {/* Basic Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 80, backgroundColor: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', zIndex: 100 }}>
        <a href="/" style={{ fontSize: 24, fontWeight: 900, fontFamily: 'Syne, sans-serif', letterSpacing: -1, color: 'var(--text-primary)', textDecoration: 'none' }}>
          CREATOR<span style={{ color: 'var(--brand-primary)' }}>OPS</span>
        </a>
        <div style={{ display: 'flex', gap: 30 }}>
          <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Home</a>
          <a href="/tools" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Tools</a>
          <a href="/blog" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Resources</a>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto w-full pb-20">
        <header className="mb-12">
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ backgroundColor: 'rgba(0, 243, 255, 0.1)', color: 'var(--brand-primary)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(0, 243, 255, 0.2)' }}>
              {post.category}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 24 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
              AI
            </div>
            <span>By <strong>{post.author}</strong></span>
            <span>•</span>
            <span>{new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {post.cover_image && (
          <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 40, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <img src={post.cover_image} alt={post.title} style={{ width: '100%', display: 'block' }} />
          </div>
        )}

        <div className="prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <section style={{ marginTop: 80, padding: 40, borderRadius: 32, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Ready to Go Viral?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Get access to 17+ AI tools designed specifically for creators. Build your empire today.
          </p>
          <a href="/tools" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Browse All Tools
          </a>
        </section>
      </article>

      <Footer />

      <style jsx global>{`
        .prose {
          color: var(--text-primary);
          line-height: 1.8;
          font-size: 18px;
        }
        .prose h2 {
          font-family: 'Syne, sans-serif';
          font-size: 28px;
          margin-top: 48px;
          margin-bottom: 24px;
          color: #fff;
          font-weight: 800;
        }
        .prose h3 {
          font-family: 'Syne, sans-serif';
          font-size: 22px;
          margin-top: 32px;
          margin-bottom: 16px;
          color: #fff;
          font-weight: 700;
        }
        .prose p {
          margin-bottom: 24px;
          color: var(--text-secondary);
        }
        .prose ul, .prose ol {
          margin-bottom: 24px;
          padding-left: 20px;
          color: var(--text-secondary);
        }
        .prose li {
          margin-bottom: 12px;
        }
        .prose strong {
          color: #fff;
        }
        .prose blockquote {
          border-left: 4px solid var(--brand-primary);
          padding-left: 24px;
          font-style: italic;
          margin: 32px 0;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
