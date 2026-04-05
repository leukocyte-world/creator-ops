'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function ViralTitlesPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Generate 20 highly clickable YouTube video titles about: ${topic}.

Use what is currently performing well on YouTube RIGHT NOW in ${new Date().getFullYear()} — not outdated formats. Reference current viewer psychology and trending title patterns.

Break them into these categories:
- 5 curiosity-gap titles
- 5 number-based titles
- 5 fear/urgency titles
- 5 transformation titles

For EACH title, provide:
- Predicted CTR score (1-10)
- Target emotion triggered
- Best thumbnail style to match
- SEO keyword strength

Finally, rank all 20 from most to least viral potential.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/viral-titles').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Science of the Click</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Your title is the first—and often only—chance you have to get a viewer to click. 
        Even the best video in the world will fail if its title doesn&apos;t trigger a click. 
        Our Viral Title Machine generates 20 variations of your idea, 
        sorted by curiosity, data, emotion, and transformation — all tuned to what&apos;s working right now in 2026.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>CTR and Algorithm Visibility</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The YouTube algorithm tracks CTR (Click-Through Rate) obsessively. 
        If your video has a high CTR in its first 24 hours, the algorithm &quot;rewards&quot; you with wider distribution. 
        By testing multiple AI-generated titles, you can identify the one with the highest &quot;Magnetic Pull.&quot; 
        We provide predicted CTR scores for each title, helping you make data-backed decisions.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Keyword Strength and Search Intent</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Titles aren&apos;t just for humans; they&apos;re for search engines too. 
        This tool analyzes the SEO strength of your keywords, ensuring your video ranks both in YouTube search and Google search results. 
        This dual benefit ensures a steady flow of organic traffic to your channel, week after week.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Viral Title Machine" 
      description="Stop struggling with titles. Get 20 high-CTR title variations ranked by viral potential." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Topic</label><input className="input" value={topic} onChange={e => setTopic(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating...' : 'Generate Virality'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Viral Titles" />}
    </ToolLayout>
  );
}
