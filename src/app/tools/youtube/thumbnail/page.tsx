'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function ThumbnailPsychologyPage() {
  const [title, setTitle] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. I am creating a YouTube video titled: "${title}"

Design 5 distinct thumbnail concepts that maximize CTR (Click-Through Rate) using what is CURRENTLY working on YouTube in ${new Date().getFullYear()} — current design trends, color psychology, and thumbnail styles that top creators are using RIGHT NOW.

For EVERY concept, provide exactly this:
- Exact text on thumbnail (must be 3-5 words ONLY, completely different from the title)
- Subject: Facial expression or emotion to use
- Background/Environment: Color combination that stands out and visual contrast strategy
- Why this works: Curiosity gap explanation and why this specific combination forces a click in 2026

Rank the 5 concepts from highest to lowest expected CTR.`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/thumbnail').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Psychology of the Thumbnail</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        A thumbnail is a visual promise. It tells the viewer what they can expect and, more importantly, 
        why they should care. Our Thumbnail Psychology tool doesn&apos;t just give you &quot;design ideas&quot;; 
        it gives you <strong>psychological strategies</strong>. We focus on triggering specific human emotions like curiosity, fear, joy, or disbelief 
        to ensure your thumbnail is the only thing a viewer sees in their crowded feed.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Visual Contrast and Branding</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        To stand out on the YouTube homepage, you need high visual contrast. This tool identifies the best color palettes 
        for your niche and suggests subjects (faces, objects, text) that pop against the background. 
        We also show you how to maintain brand consistency so that viewers can recognize one of your videos instantly.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>The Rule of Three Words</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        The most effective thumbnails use 3 words or fewer. Any more, and they become hard to read on mobile. 
        We help you craft &quot;Hook Text&quot; that complements your title without repeating it. 
        By creating a curiosity gap between the text on the thumbnail and the video title, 
        you make it physically impossible for the viewer to keep scrolling without clicking.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Thumbnail Psychology" 
      description="Generate high-CTR thumbnail concepts that open curiosity gaps perfectly aligned with your video title." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating Concepts...' : 'Design CTR-Optimized Thumbnails'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Thumbnail Concepts" />}
    </ToolLayout>
  );
}
