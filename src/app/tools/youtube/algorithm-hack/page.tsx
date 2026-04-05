'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function AlgorithmHackPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Analyze YouTube's CURRENT algorithm for the [${niche}] niche as it operates in ${new Date().getFullYear()}.

Tell me EXACTLY — based on what is working RIGHT NOW, not 2024 or older data:
- Ideal video length for maximum watch time in this niche today
- Best upload frequency for fast growth in 2026
- Tags strategy (does it still work in 2026? how to use them now)
- Thumbnail A/B testing approach
- How to trigger the "Suggested Video" algorithm in 2026
- Community post strategy for engagement
- Shorts strategy to feed main channel growth (current best practices)
- First 24-hour post strategy for maximum algorithmic push

End with a strict, actionable weekly checklist I can follow starting this week.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/algorithm-hack').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Decoding the 2026 YouTube Algorithm</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The YouTube algorithm isn&apos;t a &quot;selector&quot;; it&apos;s a &quot;reflector.&quot; It reflects the interests and behaviors of the audience back to them. 
        To &quot;hack&quot; the algorithm, you must first understand the metrics that matter most: <strong>Watch Time, Click-Through Rate, and Satisfaction</strong>. 
        Our Algorithm Hack System provides a deep-dive into how these metrics are weighted in your specific niche, giving you a clear edge over creators who are just &quot;guessing.&quot;
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Suggested Video Engine</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Search is great, but &quot;Suggested&quot; is where the true scale happens. When YouTube&apos;s AI decides to show your video 
        next to a major creator&apos;s content, your views can jump by 10,000% overnight. 
        We show you how to optimize your metadata and content structure to &quot;bridge&quot; your videos to the largest channels in your niche.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Importance of Consistency</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Algorithm trust is built over time. If you upload sporadically, you confuse the AI. 
        This tool provides a strict upload schedule and checklist that builds &quot;Algorithmic Momentum.&quot; 
        By consistently meeting the expectations of your target audience, you train YouTube&apos;s AI to find more people exactly like them for you.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Algorithm Hack System" 
      description="Understand exactly how YouTube's algorithm treats your niche right now, and how to trigger it." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Hack The Algorithm'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Algorithm Strategy" />}
    </ToolLayout>
  );
}
