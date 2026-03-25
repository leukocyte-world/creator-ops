'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function FacelessVideoPage() {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Create a complete faceless YouTube video concept for a [${niche}] channel targeting [${audience}].

Include:
- Video title (SEO optimized)
- Full script (no camera needed)
- Voiceover instructions (tone, pacing)
- Stock footage keywords to search for the edit
- Background music mood
- Thumbnail concept (text + color + emotion)
- Estimated CPM for this video topic
- Monetization angle beyond AdSense`
    });
  };

  return (
    <ToolLayout title="🎭 Faceless Video System" description="Generate a complete, ready-to-produce faceless video concept including script, visuals, and monetization strategy." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Your Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <div className="input-wrap"><label className="input-label">Target Audience</label><input className="input" value={audience} onChange={e => setAudience(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating System...' : 'Generate Video Concept'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Faceless Video Blueprint" />}
    </ToolLayout>
  );
}
