'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function FacelessVideoPage() {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Create a complete faceless YouTube video concept for a [${niche}] channel targeting [${audience}].

Base this on what is CURRENTLY trending and performing well in this niche in ${new Date().getFullYear()} — the most recent viral formats, angles, and topics that are gaining traction RIGHT NOW.

Include:
- Video title (SEO optimized for current search trends)
- Full script (no camera needed)
- Voiceover instructions (tone, pacing)
- Stock footage keywords to search for the edit
- Background music mood
- Thumbnail concept (text + color + emotion)
- Estimated CPM for this video topic (current 2026 rates)
- Monetization angle beyond AdSense`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/faceless-video').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Building Your Faceless Empire</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The era of the &quot;faceless superstar&quot; is here. You no longer need to be on camera to build a multi-million dollar audience. 
        Our Faceless Video System provides the complete production framework—from script to final edit markers. 
        It leverages AI to generate high-retention scripts that keep viewers engaged, even without a personal host present.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Production Pipeline</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        A successful faceless video relies on three core pillars: <strong>Voice, Visuals, and Velocity</strong>. 
        Our system generates the voiceover script with specific pacing markers, suggests stock footage keywords for your editor, 
        and proposes thumbnail concepts that trigger high CTR. By following this AI-generated blueprint, 
        you can reduce video production time from 10 hours to under 60 minutes.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Why This Matters for Scalability</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The biggest advantage of a faceless channel is that it&apos;s an asset you can sell. 
        Because the brand isn&apos;t tied to your face, it has a much higher market value for investors. 
        Additionally, you can run 5 or 10 channels simultaneously using this system, effectively building a &quot;content studio&quot; rather than just a hobby.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Faceless Video System" 
      description="Generate a complete, ready-to-produce faceless video concept including script, visuals, and monetization strategy." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Your Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div className="input-wrap"><label className="input-label">Target Audience</label><input className="input" value={audience} onChange={e => setAudience(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating System...' : 'Generate Video Concept'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Faceless Video Blueprint" />}
    </ToolLayout>
  );
}
