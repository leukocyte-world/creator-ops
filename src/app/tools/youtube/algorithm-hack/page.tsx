'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

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

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/algorithm-hack').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Decoding the 2026 YouTube Algorithm</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The YouTube algorithm isn't a "selector"; it's a "reflector." It reflects the interests and behaviors of the audience back to them. 
        To "hack" the algorithm, you must first understand the metrics that matter most: <strong>Watch Time, Click-Through Rate, and Satisfaction</strong>. 
        Our Algorithm Hack System provides a deep-dive into how these metrics are weighted in your specific niche, giving you a clear edge over creators who are just "guessing."
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Suggested Video Engine</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Search is great, but "Suggested" is where the true scale happens. When YouTube's AI decides to show your video 
        next to a major creator's content, your views can jump by 10,000% overnight. 
        We show you how to optimize your metadata and content structure to "bridge" your videos to the largest channels in your niche. 
        This is the most powerful growth tactic used by the world's top 1% of creators.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Importance of Consistency</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Algorithm trust is built over time. If you upload sporadically, you confuse the AI. 
        This tool provides a strict upload schedule and checklist that builds "Algorithmic Momentum." 
        By consistently meeting the expectations of your target audience, you train YouTube's AI to find more people exactly like them for you. 
        It's a virtuous cycle that leads to exponential growth.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="📊 Algorithm Hack System" 
      description="Understand exactly how YouTube's algorithm treats your niche right now, and how to trigger it." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
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
