'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function CompetitorPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Act as a senior YouTube strategist. Analyze the top channels in the [${niche}] niche right now.

Provide:
1. Top 5 fastest growing channels (or channel archetypes if specific names are unavailable)
2. What specific video format or topic is currently driving their explosive growth
3. The content gaps and blind spots they are completely ignoring
4. Their biggest weakness in thumbnails or titles
5. Exactly what I can do better immediately starting today

AND THEN:
Pitch exactly **10 hyper-specific video ideas** designed specifically to outperform these competitors by stealing their audience.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/competitor').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Ethics and Strategy of Competitor Analysis</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Competitor analysis isn't about copying; it's about identifying "Market Gaps." 
        If three major channels in your niche are all talking about Top A, but none of them are mentioning Topic B, 
        you have found a massive opportunity. Our Competitor Breakdown tool uses AI to scan the landscape 
        and identify these "Blind Spots." By positioning yourself as the solution to what's missing, 
        you immediately become a "High-Value" alternative to the established players.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Identifying Growth Archetypes</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Every niche has specific "Archetypes" that succeed. Some are the "Rational Experts," others are the "Relatable Beginners." 
        We help you identify which role your competitors are playing and where the biggest opening is for you. 
        Instead of competing head-to-head for the same viewers, you can "Zig" when they "Zag," 
        capturing the audience that is currently feeling underserved by the top 1%.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The 10-Idea "Steal" Pitch</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        This tool culminates in 10 hyper-specific video ideas designed to outperform the competition. 
        We analyze their worst-performing high-potential topics and show you exactly how to rewrite the titles 
         and redo the thumbnails to trigger a "Better Version" click from their existing fans. 
        This is the most aggressive and effective way to grow a new channel in a saturated market.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="🕵️ Competitor Breakdown" 
      description="Analyze the top players in your niche, identify their weaknesses, and get 10 video ideas to steal their audience." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing Competitors...' : 'Run Breakdown'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Competitor Analysis + Ideas" />}
    </ToolLayout>
  );
}
