'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function ShortsGrowthPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `I want to use YouTube Shorts to rapidly grow in the [${niche}] niche.

Generate a complete Shorts Growth Engine:
1. Provide exactly **30 viral Shorts concepts** (just the core idea/hook)
2. Detail the best video length/pacing strategy for this niche
3. Explain the exact "Loop Strategy" to artificially increase watch time >100%
4. Write the perfect CTA script that successfully converts Short viewers into long-form subscribers
5. Write **5 complete, ready-to-shoot Shorts scripts** based on the 5 best ideas from the list above.`
    });
  };

  return (
    <ToolLayout title="📱 Shorts Growth Engine" description="Get 30 viral Shorts ideas and 5 ready-to-shoot scripts engineered for the Shorts feed algorithm." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Building Engine...' : 'Generate 30 Days of Shorts'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Shorts Strategy + Scripts" />}
    </ToolLayout>
  );
}
