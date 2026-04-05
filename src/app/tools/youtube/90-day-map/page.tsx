'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function MoneyMapPage() {
  const [niche, setNiche] = useState('');
  const [budget, setBudget] = useState('');
  const [hours, setHours] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Build a complete 90-day money roadmap for a new YouTube channel starting RIGHT NOW in ${new Date().getFullYear()}.
Niche: ${niche}
Budget: $${budget}
Time available: ${hours} hours/week

Map exactly what to do — based on what is CURRENTLY working in this niche:
Week 1-2: Setup & first videos (tools available now, current best practices)
Week 3-4: Growth tactics (what's actually growing channels in 2026)
Month 2: Monetization preparation
Month 3: First income milestone

Include:
- Daily action checklist
- Weekly subscriber targets (realistic for 2026 competition levels)
- First monetization date estimate
- First $100 / $500 / $1000 milestones
- What to do when growth stalls
- Biggest mistakes to avoid RIGHT NOW`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/90-day-map').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Path to Financial Freedom</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Most creators quit within the first 60 days because they don&apos;t see immediate results. 
        The 90-Day Money Map is your &quot;anti-quitting&quot; shield. By setting realistic milestones and daily actionable tasks, 
        we help you navigate the &quot;Trough of Disillusionment&quot; that every successful channel goes through. 
        This is a marathon, not a sprint — but with a map, you know exactly where the finish line is.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Phase 1: Foundation and Momentum</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Your first 30 days are about learning the production workflow and building a library of content. 
        We focus on &quot;Low Hanging Fruit&quot; keywords that allow you to get those first few hundred views quickly. 
        This initial momentum is critical for maintaining motivation and training the algorithm to see your channel as active.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Phase 2: Monetization and Scale</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Months 2 and 3 are where the magic happens. We show you how to optimize for watch time and start building 
        your secondary income streams (affiliate, digital products) even before you hit 1,000 subscribers. 
        By day 90, you should have a clear, repeatable system generating real-world revenue and growing organically every day.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="90-Day Money Map" 
      description="A strict, step-by-step 90 day roadmap connecting your current state to your first YouTube paycheck." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="input-wrap"><label className="input-label">Budget ($)</label><input className="input" type="number" placeholder="0" value={budget} onChange={e => setBudget(e.target.value)} required /></div>
          <div className="input-wrap"><label className="input-label">Hours per week</label><input className="input" type="number" placeholder="10" value={hours} onChange={e => setHours(e.target.value)} required /></div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Building Roadmap...' : 'Generate 90-Day Map'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="90-Day Roadmap" />}
    </ToolLayout>
  );
}
