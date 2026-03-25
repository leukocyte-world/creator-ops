'use client';

import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function TransformationPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    generate({
      prompt: `Write a viral X (Twitter) post about a transformation in: ${topic}

Structure exactly like this:
Line 1 = painful before state (7-8 words)
Line 2 = the single thing that changed everything (7-8 words)
Line 3 = the after state (7-8 words)
Line 4 = the lesson in one sentence (7-8 words)

Rules:
- Write it like it happened to a REAL person, not a case study
- No hashtags, no em dashes, no motivational fluff
- Each line is 7-8 words maximum
- Make it feel true and lived-in
- Output ONLY the 4-line post. Nothing else.`
    });
  };

  return (
    <ToolLayout title="🔄 4-Line Transformation" description="Before → Change → After → Lesson. 4 lines, 7-8 words each. Maximum emotional punch." badge="x">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label className="input-label">Topic / Transformation</label>
          <input className="input" placeholder="e.g. learning to code, leaving a toxic job, losing weight, going broke..." value={topic} onChange={e => setTopic(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !topic.trim()}>
          {loading ? <><span className="spinner" /> Writing...</> : '🔄 Write Transformation Post'}
        </button>
      </form>
      {error && <div style={{ color: '#ff7070', fontSize: 14, marginBottom: 16 }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="4-Line Transformation Post" />}
    </ToolLayout>
  );
}
