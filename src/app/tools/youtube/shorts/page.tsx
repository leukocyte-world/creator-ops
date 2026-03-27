'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

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

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/shorts').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Mastering the Short-Form Feed</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Shorts are the "Viral Discovery" engine of modern YouTube. They allow you to reach millions of people 
        who would never have searched for your long-form content. However, succeeding in the Shorts feed 
        requires a completely different mindset. You have less than 1 second to hook the viewer before they swipe away. 
        Our Shorts Growth Engine provides 30 daily hooks designed specifically for the unique "Swipe-Based" psychology of the platform.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Loop and Retention Strategy</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In the Shorts algorithm, <strong>Retention &gt; Views</strong>. If your video is 30 seconds long and people watch 28 seconds, 
        it's a hit. If it's 30 seconds and they watch 40 seconds (due to a loop), it's a mega-hit. 
        We show you how to write "Seamless Loops" where the end of the video perfectly transitions back to the beginning, 
        artificially inflating your watch time and signaling to YouTube that your content is "Hyper-Addictive."
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Converting Shorts to Subscribers</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The biggest complaint about Shorts is that they bring "Low Quality" subscribers who don't watch long-form. 
        This tool solves that with a specific CTA (Call to Action) script that filters for high-intent viewers. 
        Instead of just asking for a "Follow," we help you bridge the gap between the Short and your core channel mission, 
        ensuring your subscriber count translates directly into long-term community value.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="📱 Shorts Growth Engine" 
      description="Get 30 viral Shorts ideas and 5 ready-to-shoot scripts engineered for the Shorts feed algorithm." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
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
