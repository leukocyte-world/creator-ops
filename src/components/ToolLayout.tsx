'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface ToolLayoutProps {
  title: string;
  description: string;
  badge: 'x' | 'youtube';
  children: React.ReactNode;
}

export default function ToolLayout({ title, description, badge, children }: ToolLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="tool-page">
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
          {children}
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
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy}>
          {copied ? '✓ Copied!' : '⎘ Copy'}
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
        <span className="result-card-title">🔒 Usage Limit Reached</span>
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
