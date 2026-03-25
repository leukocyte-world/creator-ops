'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function AlgorithmHackPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Analyze YouTube's current algorithm for the [${niche}] niche.

Tell me EXACTLY:
- Ideal video length for maximum watch time
- Best upload frequency for fast growth
- Tags strategy (does it still work? how to use them)
- Thumbnail A/B testing approach
- How to trigger the "Suggested Video" algorithm
- Community post strategy for engagement
- Shorts strategy to feed main channel growth
- First 24-hour post strategy for maximum algorithmic push

End with a strict, actionable weekly checklist I can follow.`
    });
  };

  return (
    <ToolLayout title="📊 Algorithm Hack System" description="Understand exactly how YouTube's algorithm treats your niche right now, and how to trigger it." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Hack The Algorithm'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Algorithm Strategy" />}
    </ToolLayout>
  );
}
