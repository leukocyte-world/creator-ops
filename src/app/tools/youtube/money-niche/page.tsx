'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function MoneyNichePage() {
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `User wants to make money on YouTube with AI.
Age: ${age}
Interests/Topics: ${interests}

Analyze and provide exactly this breakdown:
1. **Top 5 niches** with highest CPM rates right now
2. **Which niche fits** the user's age & interests best
3. **Competitor gap analysis** for each niche
4. **Realistic income potential** at 1K/10K/100K subs
5. **Which niche they can start TODAY** with zero budget

Rank the 5 niches by: easiest to monetize fastest.`
    });
  };

  return (
    <ToolLayout title="💰 Find Your Money Niche" description="Get a ranked list of the highest CPM YouTube niches tailored to your age and interests." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Your Age</label><input className="input" value={age} onChange={e => setAge(e.target.value)} required /></div>
        <div className="input-wrap"><label className="input-label">Interests / Topics</label><input className="input" value={interests} onChange={e => setInterests(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Find My Niche'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Money Niche Blueprint" />}
    </ToolLayout>
  );
}
