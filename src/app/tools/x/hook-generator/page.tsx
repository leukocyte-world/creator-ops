'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Write a powerful X (Twitter) hook for:
Topic: ${topic}
Target audience: ${audience}

Rules:
- Open a loop so strong that readers NEED to keep scrolling
- Tease a specific result, story, or list that follows
- End with a bold promise, an open question, or a numbered list title like "here are 7 reasons"
- NEVER close the loop in the hook itself
- No hashtags
- Write like a human, NOT a marketer
- The hook should be 1-3 lines max
- Make it IMPOSSIBLE to scroll past

Output:
1. The hook text
2. Why this hook works (2-3 sentences)
3. Two alternative versions`
    });
  };

  return (
    <ToolLayout title="🎣 Hook Generator" description="Generate loop-opening hooks that make readers physically unable to scroll past your post." badge="x">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic</label>
          <input className="input" placeholder="e.g. why most freelancers fail, my morning routine, how I made $10k..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <div className="input-wrap">
          <label className="input-label">Target Audience</label>
          <input className="input" placeholder="e.g. beginner entrepreneurs, developers, crypto investors..." value={audience} onChange={e => setAudience(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim() || !audience.trim()}>
          {loading ? <><span className="spinner" /> Generating...</> : '🎣 Generate Hook'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Hook + Alternatives" />}
    </ToolLayout>
  );
}
