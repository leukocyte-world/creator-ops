'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function CalendarPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Create a highly strategic 30-day YouTube content calendar for a [${niche}] channel.

Balance the content mix specifically using this ratio:
- 40% Educational / High-Utility (Search intent, evergreen)
- 40% Viral / Broad Appeal (High CTR, trend-jacking)
- 20% Connection / Community (Monetization intent, deep engagement)

Provide a week-by-week calendar with:
1. Daily video ideas (title concepts)
2. Which category it falls into (Educational/Viral/Connection)
3. Best posting days and times for this specific niche
4. Which videos are specifically designed to drive growth vs designed to drive revenue`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/calendar').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Architecture of a 30-Day Strategy</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Consistency on YouTube doesn't mean "uploading whenever you feel like it." It means having a rigorous, 
        pre-planned schedule that balances different types of viewer intent. 
        Our Content Calendar Generator uses the <strong>40-40-20 Rule</strong> to ensure your channel grows 
        sustainably while also generating immediate revenue. By mapping out your month in advance, 
        you remove the "decision fatigue" that causes most creators to burn out.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Educational vs. Viral Content</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        A healthy channel needs both a "Floor" and a "Ceiling." Educational content provides the floor—a steady 
        stream of search traffic that builds your authority over time. Viral content provides the ceiling—high-risk, 
        high-reward videos designed to explode your reach and bring in new subscribers. 
        This tool ensures you have the perfect mix of both, preventing your channel from becoming either a 
        boring wiki or a shallow trend-chaser.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Connecting with Your Community</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The remaining 20% of your calendar is dedicated to "Connection." These are videos designed 
        specifically to turn casual viewers into "Superfans." Whether it's a Q&A, a behind-the-scenes look, 
        or a deep dive into your personal story, this content is what allows you to successfully 
        sell products and services later on. This tool helps you place these connection points 
        optimally throughout the month for maximum impact.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="📅 Content Calendar Generator" 
      description="Stop staring at a blank page. Generate a balanced 30-day content calendar engineered for both views AND revenue." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Plotting Calendar...' : 'Generate 30-Day Calendar'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="30-Day Content Strategy" />}
    </ToolLayout>
  );
}
