'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function ThumbnailPsychologyPage() {
  const [title, setTitle] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `I am creating a YouTube video titled: "${title}"

Design 5 distinct thumbnail concepts that maximize CTR (Click-Through Rate).

For EVERY concept, provide exactly this:
- Exact text on thumbnail (must be 3–5 words ONLY, completely different from the title)
- Subject: Facial expression or emotion to use
- Background/Environment: Color combination that stands out and visual contrast strategy
- Why this works: Curiosity gap explanation and why this specific combination forces a click

Rank the 5 concepts from highest to lowest expected CTR.`
    });
  };

  return (
    <ToolLayout title="🖼️ Thumbnail Psychology" description="Generate high-CTR thumbnail concepts that open curiosity gaps perfectly aligned with your video title." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating Concepts...' : 'Design CTR-Optimized Thumbnails'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Thumbnail Concepts" />}
    </ToolLayout>
  );
}
