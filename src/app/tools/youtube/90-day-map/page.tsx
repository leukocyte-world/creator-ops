'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function MoneyMapPage() {
  const [niche, setNiche] = useState('');
  const [budget, setBudget] = useState('');
  const [hours, setHours] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Build a complete 90-day money roadmap for a new YouTube channel.
Niche: ${niche}
Budget: $${budget}
Time available: ${hours} hours/week

Map exactly what to do:
Week 1-2: Setup & first videos
Week 3-4: Growth tactics
Month 2: Monetization preparation
Month 3: First income milestone

Include:
✅ Daily action checklist
✅ Weekly subscriber targets
✅ First monetization date estimate
✅ First $100 / $500 / $1000 milestones
✅ What to do when growth stalls
✅ Biggest mistakes to avoid`
    });
  };

  return (
    <ToolLayout title="🗺️ 90-Day Money Map" description="A strict, step-by-step 90 day roadmap connecting your current state to your first YouTube paycheck." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="input-wrap"><label className="input-label">Budget ($)</label><input className="input" type="number" placeholder="0" value={budget} onChange={e => setBudget(e.target.value)} required /></div>
          <div className="input-wrap"><label className="input-label">Hours per week</label><input className="input" type="number" placeholder="10" value={hours} onChange={e => setHours(e.target.value)} required /></div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Building Roadmap...' : 'Generate 90-Day Map'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="90-Day Roadmap" />}
    </ToolLayout>
  );
}
