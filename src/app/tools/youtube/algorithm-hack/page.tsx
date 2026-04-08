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

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The 3 Pillars of Algorithmic Success</h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}><strong>Content Satisfaction:</strong> YouTube now measures how the viewer FEELS after watching. High "Satisfaction Scores" lead to long-term recommendation shelf-life.</li>
          <li style={{ marginBottom: 10 }}><strong>Session Duration:</strong> Does your video keep the user on YouTube? If they watch another video after yours (even not yours), the algorithm loves you.</li>
          <li style={{ marginBottom: 10 }}><strong>Velocity:</strong> How fast you get views in the first 24 hours relative to your usual performance. This is the primary trigger for the "Browse" feature.</li>
        </ul>
      </div>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Suggested Video Engine</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Search is great, but &quot;Suggested&quot; is where the true scale happens. When YouTube&apos;s AI decides to show your video 
        next to a major creator&apos;s content, your views can jump by 10,000% overnight. 
        We show you how to optimize your metadata and content structure to &quot;bridge&quot; your videos to the largest channels in your niche.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>2026 Algorithmic Checklist</h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        <ul style={{ listStyle: 'decimal', paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}><strong>Hook 2.0:</strong> Capture attention in 3 seconds AND reveal the value proposition in 10 seconds.</li>
          <li style={{ marginBottom: 10 }}><strong>Engagement Pattern Interrupts:</strong> Use b-roll or text overlays every 15-20 seconds to reset the viewer's attention.</li>
          <li style={{ marginBottom: 10 }}><strong>Community Reinforcement:</strong> Use community posts to poll viewers before you upload to prime the algorithm for the topic.</li>
        </ul>
      </div>

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
      slug="algorithm-hack"
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
