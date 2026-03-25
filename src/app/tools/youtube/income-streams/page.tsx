'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function IncomeStreamsPage() {
  const [niche, setNiche] = useState('');
  const [subs, setSubs] = useState('');
  const [views, setViews] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `I have a YouTube channel about [${niche}] with [${subs}] subscribers and [${views}] monthly views.

Build a complete income blueprint:
- AdSense revenue estimate based on average CPM for this niche
- Top 10 affiliate programs for my exact niche
- Digital product ideas I can create and sell
- Sponsorship rate card for my channel size (what to charge)
- Merchandise potential
- Paid community model structure
- Course or coaching opportunity

Show total realistic monthly income at my current size, AND project it for 10K / 50K subscribers.`
    });
  };

  return (
    <ToolLayout title="💸 Multiple Income Streams" description="Calculate your earning potential and discover 7 different ways to monetize your specific channel." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" placeholder="e.g. personal finance, gaming, cooking..." value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="input-wrap"><label className="input-label">Current Subscribers</label><input className="input" placeholder="e.g. 500 or 10k" value={subs} onChange={e => setSubs(e.target.value)} required /></div>
          <div className="input-wrap"><label className="input-label">Monthly Views</label><input className="input" placeholder="e.g. 5000" value={views} onChange={e => setViews(e.target.value)} required /></div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Calculating...' : 'Build Income Blueprint'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Monetization Blueprint" />}
    </ToolLayout>
  );
}
