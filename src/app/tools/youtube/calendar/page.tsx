'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function CalendarPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Create a highly strategic 30-day YouTube content calendar for a [${niche}] channel.

Balance the content mix specifically using this ratio:
- 40% Educational / High-Utility (Search intent, evergreen)
- 40% Viral / Broad Appeal (High CTR, trend-jacking)
- 20% Connection / Community (Monetization intent, deep engagement)

Provide a week-by-week calendar with:
1. Daily video ideas (title concepts)
2. Which category it falls into (Educational/Viral/Connection)
3. Best posting days and times for this specific niche
4. Which videos are specifically designed to drive growth vs designed to drive revenue`
    });
  };

  return (
    <ToolLayout title="📅 Content Calendar Generator" description="Stop staring at a blank page. Generate a balanced 30-day content calendar engineered for both views AND revenue." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Plotting Calendar...' : 'Generate 30-Day Calendar'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="30-Day Content Strategy" />}
    </ToolLayout>
  );
}
