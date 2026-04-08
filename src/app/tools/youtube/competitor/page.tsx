'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function CompetitorPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Act as a senior YouTube strategist. Analyze the top channels in the [${niche}] niche RIGHT NOW in ${new Date().getFullYear()}.

Focus on what is CURRENTLY happening — the latest trends, fastest growing channels, and content formats that are exploding TODAY, not in 2024.

Provide:
1. Top 5 fastest growing channels or channel archetypes CURRENTLY dominating this niche
2. What specific video format or topic is RIGHT NOW driving their explosive growth in ${new Date().getFullYear()}
3. The content gaps and blind spots they are completely ignoring TODAY
4. Their biggest weakness in thumbnails or titles based on current viewer expectations
5. Exactly what I can do better immediately starting this week

AND THEN:
Pitch exactly **10 hyper-specific video ideas** designed specifically to outperform these competitors by stealing their audience — all based on current trends and viewer demand.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/competitor').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Ethics and Strategy of Competitor Analysis</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Competitor analysis isn&apos;t about copying; it&apos;s about identifying &quot;Market Gaps.&quot; 
        If three major channels in your niche are all talking about Topic A, but none of them are mentioning Topic B, 
        you have found a massive opportunity. Our Competitor Breakdown tool uses AI to scan the current landscape 
        and identify these &quot;Blind Spots.&quot;
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Identifying Growth Archetypes</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Every niche has specific &quot;Archetypes&quot; that succeed. Some are the &quot;Rational Experts,&quot; others are the &quot;Relatable Beginners.&quot; 
        We help you identify which role your competitors are playing and where the biggest opening is for you. 
        Instead of competing head-to-head for the same viewers, you can &quot;Zig&quot; when they &quot;Zag.&quot;
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The 10-Idea Steal Pitch</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        This tool culminates in 10 hyper-specific video ideas designed to outperform the competition. 
        We analyze their worst-performing high-potential topics and show you exactly how to rewrite the titles 
        and redo the thumbnails to trigger a &quot;Better Version&quot; click from their existing fans.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Competitor Breakdown" 
      description="Analyze the top players in your niche, identify their weaknesses, and get 10 video ideas to steal their audience." 
      badge="youtube"
      slug="competitor"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Analyzing Competitors...' : 'Run Breakdown'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Competitor Analysis + Ideas" />}
    </ToolLayout>
  );
}
