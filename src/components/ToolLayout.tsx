'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import ToolIcon from '@/components/ToolIcon';
import { Copy, Check, Lock } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

interface ToolLayoutProps {
  title: string;
  description: string;
  badge: 'x' | 'youtube';
  slug: string;
  children: React.ReactNode;
  extraContent?: React.ReactNode;
  relatedTools?: { label: string; href: string; icon: string }[];
}

export default function ToolLayout({ title, description, badge, slug, children, extraContent, relatedTools }: ToolLayoutProps) {
  // Better regex to remove emojis and clean up the title for schema
  // Clean emoji and special characters for a professional schema title
  const cleanName = title.replace(/[^\w\s-]/gi, '').trim();
  
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": cleanName || title,
    "applicationCategory": badge === 'x' ? "SocialNetworkingApplication" : "MultimediaApplication",
    "operatingSystem": "Web",
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://creatorops.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://creatorops.site/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanName || title,
        "item": `https://creatorops.site/tools/${badge}/${slug}`
      }
    ]
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="tool-page">
          <StructuredData data={softwareSchema} />
          <StructuredData data={breadcrumbSchema} />
          <div className="tool-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Link href="/tools" style={{ color: 'var(--text-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                ← Dashboard
              </Link>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>/</span>
              <span className={`badge badge-${badge === 'x' ? 'x' : 'yt'}`}>
                {badge === 'x' ? '𝕏 Twitter' : '▶ YouTube'}
              </span>
            </div>
            <h1 className="tool-title">{title}</h1>
            <p className="tool-desc">{description}</p>
          </div>
          
          <div className="tool-content-wrap">
            {children}
          </div>

          {extraContent && (
            <div className="tool-extra-content animate-fade-up" style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 40 }}>
              {extraContent}
            </div>
          )}

          {relatedTools && relatedTools.length > 0 && (
            <div className="related-tools-section" style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 40, marginBottom: 40 }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Related Tools</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                {relatedTools.map(t => (
                  <Link key={t.href} href={t.href} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <div className={`tool-list-item-icon ${badge}-icon-bg`} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ToolIcon name={t.icon} size={16} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{t.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}

// ─── Shared result display ────────────────────────────────

interface ResultDisplayProps {
  result: string;
  label?: string;
}

export function ResultDisplay({ result, label = 'AI Output' }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  if (!result) return null;

  return (
    <div className="result-card animate-fade-up">
      <div className="result-card-header">
        <span className="result-card-title">{label}</span>
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
      <div className="result-body">{result}</div>
    </div>
  );
}

// ─── Upgrade prompt ─────────────────────────────────────

export function UpgradePrompt() {
  return (
    <div className="result-card" style={{ borderColor: 'rgba(255,107,53,0.3)', background: 'linear-gradient(135deg, rgba(255,107,53,0.07) 0%, rgba(65,88,208,0.07) 100%)' }}>
      <div className="result-card-header">
        <span className="result-card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Lock size={14} /> Usage Limit Reached</span>
      </div>
      <div className="result-body" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p>You&apos;ve used all 5 free uses. Upgrade to Pro to continue using all 17 tools without limits.</p>
        <Link href="/upgrade" className="btn btn-primary">
          Upgrade to Pro — $10/month
        </Link>
      </div>
    </div>
  );
}

// ─── Shared AI hook ──────────────────────────────────────

interface UseAIOptions {
  endpoint?: string;
}

export function useAI({ endpoint = '/api/generate' }: UseAIOptions = {}) {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upgradeRequired, setUpgradeRequired] = useState(false);

  const generate = useCallback(async (payload: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    setUpgradeRequired(false);
    setResult('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error === 'upgrade_required') {
        setUpgradeRequired(true);
        return;
      }

      if (!res.ok) {
        setError(data.error ?? data.message ?? 'Something went wrong. Please try again.');
        return;
      }

      setResult(data.result ?? '');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { result, loading, error, upgradeRequired, generate, setResult };
}
