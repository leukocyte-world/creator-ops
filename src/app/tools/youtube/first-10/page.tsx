'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function First10Page() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `I am starting a brand new YouTube channel in the [${niche}] niche with 0 subscribers.

Map out exactly what my first 10 videos should be. Do not give generic advice. Give me 10 specific, actionable video concepts.

For EVERY video, provide:
- The exact, highly clickable title
- Suggested thumbnail angle
- Target audience intent (Why are they clicking this?)
- Why this specific video will perform well for a 0-subscriber channel

Crucially, **arrange them in the EXACT order I should post them** (Video 1 to Video 10) to create a binge-watching funnel and train the algorithm on my target audience.`
    });
  };

  return (
    <ToolLayout title="🎬 First 10 Videos Blueprint" description="Don't guess. Get the exact 10 videos you need to launch a new channel, ordered for maximum algorithmic momentum." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Mapping Videos...' : 'Generate 10-Video Plan'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="First 10 Videos Strategy" />}
    </ToolLayout>
  );
}
