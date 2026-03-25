'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function OneLinerPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    generate({
      prompt: `You are a viral X (Twitter) creator known for raw, unfiltered, emotionally charged content.

Write 10 one-line posts about: ${topic}

Rules:
- Start each with a bold, emotional or opinionated claim
- Keep it raw, human, slightly unfiltered
- Use natural emphasis (CAPS for key words if needed)
- NEVER use generic motivational tone
- NEVER use em dashes (—)
- Vary the style: some controversial, some inspiring, some painful truths
- Each post stands alone as a complete thought
- Output ONLY the 10 posts, numbered. Nothing else.`
    });
  };

  return (
    <ToolLayout title="⚡ Viral One-Liner" description="Drop your topic. Get 10 raw, emotionally charged one-line posts built to stop the scroll." badge="x">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic</label>
          <input className="input" placeholder="e.g. building in public, quitting your job, crypto, AI..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim()}>
          {loading ? <><span className="spinner" /> Generating...</> : '⚡ Generate 10 One-Liners'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="10 Viral One-Liners" />}
    </ToolLayout>
  );
}
