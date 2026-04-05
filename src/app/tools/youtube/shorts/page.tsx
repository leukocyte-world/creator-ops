'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function ShortsGrowthPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. I want to use YouTube Shorts to rapidly grow in the [${niche}] niche.

Generate a complete Shorts Growth Engine based on what is TRENDING and performing RIGHT NOW in ${new Date().getFullYear()} — the current formats, hooks, and content styles that are going viral in the Shorts feed today:

1. Provide exactly **30 viral Shorts concepts** (just the core idea/hook) — focused on what is trending in this niche RIGHT NOW
2. Detail the best video length/pacing strategy for this niche in 2026
3. Explain the exact "Loop Strategy" to artificially increase watch time >100%
4. Write the perfect CTA script that successfully converts Short viewers into long-form subscribers
5. Write **5 complete, ready-to-shoot Shorts scripts** based on the 5 best ideas from the list above`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/shorts').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Mastering the Short-Form Feed</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Shorts are the &quot;Viral Discovery&quot; engine of modern YouTube. They allow you to reach millions of people 
        who would never have searched for your long-form content. However, succeeding in the Shorts feed 
        requires a completely different mindset. You have less than 1 second to hook the viewer before they swipe away. 
        Our Shorts Growth Engine provides 30 daily hooks designed specifically for the unique &quot;Swipe-Based&quot; psychology of the platform.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Loop and Retention Strategy</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        In the Shorts algorithm, <strong>Retention &gt; Views</strong>. If your video is 30 seconds long and people watch 28 seconds, 
        it&apos;s a hit. If it&apos;s 30 seconds and they watch 40 seconds (due to a loop), it&apos;s a mega-hit. 
        We show you how to write &quot;Seamless Loops&quot; where the end of the video perfectly transitions back to the beginning, 
        artificially inflating your watch time and signaling to YouTube that your content is &quot;Hyper-Addictive.&quot;
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Converting Shorts to Subscribers</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The biggest complaint about Shorts is that they bring &quot;low quality&quot; subscribers who don&apos;t watch long-form. 
        This tool solves that with a specific CTA (Call to Action) script that filters for high-intent viewers. 
        Instead of just asking for a &quot;Follow,&quot; we help you bridge the gap between the Short and your core channel mission.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Shorts Growth Engine" 
      description="Get 30 viral Shorts ideas and 5 ready-to-shoot scripts engineered for the Shorts feed algorithm." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Building Engine...' : 'Generate 30 Days of Shorts'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Shorts Strategy + Scripts" />}
    </ToolLayout>
  );
}
