'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function MoneyNichePage() {
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. You are a senior YouTube monetization strategist with access to the LATEST 2026 advertising trends and CPM data.

A creator wants to make money on YouTube with AI.
Age: ${age}
Interests/Topics: ${interests}

Based on what is actively trending and monetizing RIGHT NOW in ${new Date().getFullYear()}, provide exactly this breakdown:
1. **Top 5 niches** with the highest CPM rates CURRENTLY (not historical — use what advertisers are actively spending on in 2026)
2. **Which niche fits** the user's age & interests best
3. **Competitor gap analysis** for each niche RIGHT NOW (what angles are underserved today)
4. **Realistic income potential** at 1K/10K/100K subs based on current CPM benchmarks
5. **Which niche they can start TODAY** with zero budget and start seeing traction within 30 days

IMPORTANT: Do not reference outdated 2024 or 2023 CPM data. Focus on what is HOT and growing in 2026.

Rank the 5 niches by: easiest to monetize fastest.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/money-niche').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>How to Find a High-CPM YouTube Niche</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Not all YouTube views are created equal. A &quot;Niche&quot; determines your CPM (Cost Per Mille), which is how much advertisers pay per 1,000 views. 
        While a gaming channel might earn $2–$5 per 1,000 views, a high-intent financial or B2B software niche can command upwards of $30–$50. 
        Our Money Niche tool cross-references your interests with real-time 2026 advertising trends, identifying the most lucrative paths for your channel.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Importance of CPM Strategy</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Most creators start by making content they love, only to realize months later that their niche has no &quot;Ad Inventory.&quot; 
        By starting with a data-driven approach, you ensure that every hour you spend editing is maximizing your future revenue. 
        We focus on &quot;High Intent&quot; audiences—people looking to buy products, invest money, or solve expensive business problems. 
        These are the viewers that major brands are willing to pay a premium to reach.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step-by-Step Guide to Using the Calculator</h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        <ul style={{ listStyle: 'decimal', paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}><strong>Identify Your Core Interests:</strong> Enter topics you are genuinely passionate about or have deep knowledge in.</li>
          <li style={{ marginBottom: 10 }}><strong>Input Your Demographics:</strong> Advertisers target different age groups with varying intensity; knowing yours helps tailor the output.</li>
          <li style={{ marginBottom: 10 }}><strong>Analyze the Results:</strong> Our AI will provide a ranked list of 5 niches that match your criteria.</li>
          <li style={{ marginBottom: 10 }}><strong>Validate with Trends:</strong> Use the competitor gap analysis to see where other channels are falling short.</li>
        </ul>
      </div>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 20 }}>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 5 }}>What is a &quot;Money Niche&quot;?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>A money niche is a category of content where advertisers are willing to pay significantly more to show their ads. These usually involve finance, business, technology, or high-ticket health products.</p>
        </div>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 5 }}>Can I change my niche later?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Yes, but it&apos;s difficult to pivot an existing audience. It is almost always better to restart with a clean channel dedicated to the new high-CPM niche to ensure the YouTube algorithm targets the right viewers from day one.</p>
        </div>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 5 }}>Does this tool use current data?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Absolutely. Our AI is trained on active 2026 advertising benchmarks and trending topics, ensuring you aren&apos;t following outdated 2024 strategies that no longer work.</p>
        </div>
      </div>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Faceless Channels</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Faceless channels live and die by their niche selection. Since you aren&apos;t building a personal brand around your face, 
        your value proposition must be the information or entertainment itself. 
        Choosing a &quot;Money Niche&quot; allows you to outsource production (voiceovers, editing) while still remaining highly profitable.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Find Your Money Niche" 
      description="Get a ranked list of the highest CPM YouTube niches tailored to your age and interests — updated for 2026." 
      badge="youtube"
      slug="money-niche"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Your Age</label><input className="input" value={age} onChange={e => setAge(e.target.value)} required /></div>
        <div className="input-wrap"><label className="input-label">Interests / Topics</label><input className="input" value={interests} onChange={e => setInterests(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing...' : 'Find My Niche'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Money Niche Blueprint" />}
    </ToolLayout>
  );
}
