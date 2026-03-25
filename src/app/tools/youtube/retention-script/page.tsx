'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

export default function RetentionScriptPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Write a HIGH-RETENTION YouTube video script about: ${topic}.

The script MUST:
- Hook the viewer in the first 3 seconds (visual + audio)
- Use open loops to keep curiosity high
- Add pattern interrupts every 10–15 seconds
- Use storytelling + suspense
- Include re-engagement lines exactly where drop-off is statistically likely
- End with a strong CTA that feels entirely natural, not forced

Format it as a 2-column table: Visuals | Audio (Script)
Also clearly mark:
🔴 HIGH DROP-OFF RISK: [Where it is and how this script prevents it]`
    });
  };

  return (
    <ToolLayout title="🎯 Retention Killer Script" description="Generate a script engineered specifically to maximize average view duration and viewer retention." badge="youtube">
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Topic / Concept</label><textarea className="textarea" value={topic} onChange={e => setTopic(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Writing Script...' : 'Generate High-Retention Script'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Retention-Optimized Script" />}
    </ToolLayout>
  );
}
