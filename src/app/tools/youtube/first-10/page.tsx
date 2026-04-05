'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function First10Page() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. I am starting a brand new YouTube channel in the [${niche}] niche with 0 subscribers.

Map out exactly what my first 10 videos should be in ${new Date().getFullYear()}. Do not give generic advice. Give me 10 specific, actionable video concepts based on what is CURRENTLY trending and getting traction in this niche RIGHT NOW.

For EVERY video, provide:
- The exact, highly clickable title (optimized for current viewer psychology in 2026)
- Suggested thumbnail angle
- Target audience intent (Why are they clicking this?)
- Why this specific video will perform well for a 0-subscriber channel right now

Crucially, **arrange them in the EXACT order I should post them** (Video 1 to Video 10) to create a binge-watching funnel and train the algorithm on my target audience.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/first-10').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Critical Mission of Your First 10 Videos</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        YouTube&apos;s algorithm is a machine that needs data. When you launch a new channel, the machine has no data on you. 
        Your first 10 videos aren&apos;t just content; they are <strong>data signals</strong>. 
        If your first 10 videos are scattered across different topics, the algorithm will never know who to show your videos to. 
        Our First 10 Videos Blueprint ensures that every upload is reinforcing the same &quot;Topic Cluster,&quot; 
        training the algorithm to find your perfect audience 10x faster.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Building the Binge-Watch Funnel</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The goal of your first 10 videos is to get one viewer to watch <strong>all of them</strong>. 
        When a new viewer finds your Video #1 and then immediately clicks on your Video #2, 
        the YouTube algorithm gets a &quot;High Satisfaction&quot; signal. 
        This tool helps you design a series of videos that naturally flow into one another, 
        creating a feedback loop of views that can propel a tiny channel to thousands of subscribers in weeks.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Low-Subscriber Clickability</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        When you have 0 subscribers, you can&apos;t rely on &quot;loyalty&quot; for clicks. You must rely on <strong>Intent</strong>. 
        We map out titles and thumbnails that focus on solving urgent problems or answering burning questions in your niche. 
        By providing immediate, undeniable value to strangers, you build a foundation of &quot;Superfans&quot; who will support you for years to come.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="First 10 Videos Blueprint" 
      description="Don't guess. Get the exact 10 videos you need to launch a new channel, ordered for maximum algorithmic momentum." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Mapping Videos...' : 'Generate 10-Video Plan'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="First 10 Videos Strategy" />}
    </ToolLayout>
  );
}
