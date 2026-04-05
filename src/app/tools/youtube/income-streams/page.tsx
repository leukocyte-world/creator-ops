'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function IncomeStreamsPage() {
  const [niche, setNiche] = useState('');
  const [subs, setSubs] = useState('');
  const [views, setViews] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. I have a YouTube channel about [${niche}] with [${subs}] subscribers and [${views}] monthly views.

Build a complete income blueprint based on what is ACTUALLY paying well in ${new Date().getFullYear()} — use current affiliate program rates, current CPM benchmarks, and what brands are actively sponsoring in this niche RIGHT NOW:

- AdSense revenue estimate based on CURRENT average CPM for this niche in 2026
- Top 10 affiliate programs for my exact niche that are actively running in 2026
- Digital product ideas I can create and sell TODAY
- Sponsorship rate card for my channel size (what to charge brands right now)
- Merchandise potential
- Paid community model structure
- Course or coaching opportunity

Show total realistic monthly income at my current size, AND project it for 10K / 50K subscribers.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/income-streams').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The 7 Streams of Modern Creator Income</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Relying solely on YouTube AdSense is the biggest mistake a new creator can make. Ad revenue is volatile and subject to the whims of advertisers. 
        Our Multiple Income Streams tool helps you build a diversified financial fortress. 
        By identifying affiliate opportunities, digital product potential, and sponsorship models early on, 
        you can start earning a full-time income even with a small, dedicated audience.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Affiliate Marketing and Partnerships</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Affiliate marketing is often the most immediate way to monetize a new channel. 
        This tool scans your niche for the highest-paying and most relevant partner programs active in 2026. 
        Instead of promoting generic products, we help you find the tools and services that your audience actually needs, 
        building trust while maximizing your conversion rates.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Digital Products and Communities</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The real &quot;wealth&quot; on YouTube comes from owning the customer relationship. 
        We provide ideas for e-books, templates, checklists, and private communities 
        that you can sell directly to your fans — creating a stable and predictable business model 
        that decouples your income from your view count.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Multiple Income Streams" 
      description="Calculate your earning potential and discover 7 different ways to monetize your specific channel." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" placeholder="e.g. personal finance, gaming, cooking..." value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="input-wrap"><label className="input-label">Current Subscribers</label><input className="input" placeholder="e.g. 500 or 10k" value={subs} onChange={e => setSubs(e.target.value)} required /></div>
          <div className="input-wrap"><label className="input-label">Monthly Views</label><input className="input" placeholder="e.g. 5000" value={views} onChange={e => setViews(e.target.value)} required /></div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Calculating...' : 'Build Income Blueprint'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Monetization Blueprint" />}
    </ToolLayout>
  );
}
