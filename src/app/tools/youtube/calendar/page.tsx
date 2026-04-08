'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function CalendarPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Create a highly strategic 30-day YouTube content calendar for a [${niche}] channel.

Base this entirely on what is CURRENTLY trending and getting views RIGHT NOW in ${new Date().getFullYear()} — include trending topics, seasonal events, and viral content angles that are hot in this niche TODAY.

Balance the content mix specifically using this ratio:
- 40% Educational / High-Utility (Search intent, evergreen)
- 40% Viral / Broad Appeal (High CTR, trend-jacking — reference actual current trends where possible)
- 20% Connection / Community (Monetization intent, deep engagement)

Provide a week-by-week calendar with:
1. Daily video ideas (title concepts based on current trends)
2. Which category it falls into (Educational/Viral/Connection)
3. Best posting days and times for this specific niche in 2026
4. Which videos are specifically designed to drive growth vs designed to drive revenue`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/calendar').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Architecture of a 30-Day Strategy</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Consistency on YouTube doesn&apos;t mean &quot;uploading whenever you feel like it.&quot; It means having a rigorous, 
        pre-planned schedule that balances different types of viewer intent. 
        Our Content Calendar Generator uses the <strong>40-40-20 Rule</strong> to ensure your channel grows 
        sustainably while also generating immediate revenue.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Educational vs. Viral Content</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        A healthy channel needs both a &quot;Floor&quot; and a &quot;Ceiling.&quot; Educational content provides the floor — a steady 
        stream of search traffic that builds your authority over time. Viral content provides the ceiling — high-risk, 
        high-reward videos designed to explode your reach and bring in new subscribers.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Connecting with Your Community</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The remaining 20% of your calendar is dedicated to &quot;Connection.&quot; These are videos designed 
        specifically to turn casual viewers into &quot;Superfans.&quot; Whether it&apos;s a Q&amp;A, a behind-the-scenes look, 
        or a deep dive into your personal story, this content is what allows you to successfully 
        sell products and services later on.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Content Calendar Generator" 
      description="Stop staring at a blank page. Generate a balanced 30-day content calendar engineered for both views AND revenue." 
      badge="youtube"
      slug="calendar"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Plotting Calendar...' : 'Generate 30-Day Calendar'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="30-Day Content Strategy" />}
    </ToolLayout>
  );
}
