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

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Proven Viral Title Formulas</h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}><strong>The Paradox:</strong> "How I Failed but Won Anyway" - Triggers curiosity by presenting a contradiction.</li>
          <li style={{ marginBottom: 10 }}><strong>The Specificity:</strong> "How to Scale to $12,453/mo" - Specific numbers build trust and show authority.</li>
          <li style={{ marginBottom: 10 }}><strong>The Fear of Missing Out (FOMO):</strong> "The Stop Doing This Before You Fail" - Uses negative emotion to drive urgency.</li>
          <li style={{ marginBottom: 10 }}><strong>The Bridge:</strong> "From Broke to $100k (The True Story)" - Promises a transformation that viewers desire.</li>
        </ul>
      </div>

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

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Optimization Checklist</h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        <p>Before you publish, check your title against these criteria:</p>
        <ul style={{ listStyle: 'decimal', paddingLeft: 20 }}>
          <li>Is the title under 60 characters? (Prevents cutoff on mobile)</li>
          <li>Does it correlate with the thumbnail?</li>
          <li>Does it contain the primary keyword near the beginning?</li>
          <li>Does it evoke a specific emotion?</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout 
      title="Viral Title Machine" 
      description="Stop struggling with titles. Get 20 high-CTR title variations ranked by viral potential." 
      badge="youtube"
      slug="viral-titles"
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
