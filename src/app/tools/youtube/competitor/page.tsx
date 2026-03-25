'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function CompetitorPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Act as a senior YouTube strategist. Analyze the top channels in the [${niche}] niche right now.

Provide:
1. Top 5 fastest growing channels (or channel archetypes if specific names are unavailable)
2. What specific video format or topic is currently driving their explosive growth
3. The content gaps and blind spots they are completely ignoring
4. Their biggest weakness in thumbnails or titles
5. Exactly what I can do better immediately starting today

AND THEN:
Pitch exactly **10 hyper-specific video ideas** designed specifically to outperform these competitors by stealing their audience.`
    });
  };

  return (
    <ToolLayout title="🕵️ Competitor Breakdown" description="Analyze the top players in your niche, identify their weaknesses, and get 10 video ideas to steal their audience." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing Competitors...' : 'Run Breakdown'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Competitor Analysis + Ideas" />}
    </ToolLayout>
  );
}
