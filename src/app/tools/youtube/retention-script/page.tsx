'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function RetentionScriptPage() {
  const [topic, setTopic] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Write a HIGH-RETENTION YouTube video script about: ${topic}.

Use the latest retention patterns that are working in ${new Date().getFullYear()} — current viewer attention spans, modern pacing expectations, and what top creators are doing RIGHT NOW to keep viewers watching.

The script MUST:
- Hook the viewer in the first 3 seconds (visual + audio)
- Use open loops to keep curiosity high
- Add pattern interrupts every 10-15 seconds
- Use storytelling + suspense
- Include re-engagement lines exactly where drop-off is statistically likely
- End with a strong CTA that feels entirely natural, not forced

Format it as a 2-column table: Visuals | Audio (Script)
Also clearly mark:
HIGH DROP-OFF RISK: [Where it is and how this script prevents it]`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/retention-script').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Battle for Viewer Attention</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Retention is the single most important metric on YouTube. If people watch your video until the end, YouTube will push it to millions. 
        If they leave in the first 10 seconds, your video dies. Our Retention Killer Script tool uses the &quot;Hook-Story-Offer&quot; framework 
        combined with pattern interrupts to ensure your audience stays glued to the screen from start to finish.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Anatomy of a High-Retention Script</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        A great script is like a well-paced thriller. You must constantly promise value, deliver it, and immediately tease the next point. 
        This tool identifies the &quot;danger zones&quot; in your content — places where viewers typically lose interest — and provides 
        specific &quot;Retention Fixes&quot; like visual switches, controversial takes, or direct questions to keep the audience engaged.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Pattern Interrupts and Pacing</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Monotony is the enemy of retention. Even a great host can be boring if the pacing never changes. 
        We show you where to add pattern interrupts every 15-30 seconds to &quot;reset&quot; the viewer&apos;s attention span. 
        This is the secret technique used by top-tier creators to maintain 70%+ retention on long-form videos.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="Retention Killer Script" 
      description="Generate a script engineered specifically to maximize average view duration and viewer retention." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Video Topic / Concept</label><textarea className="textarea" value={topic} onChange={e => setTopic(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Writing Script...' : 'Generate High-Retention Script'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Retention-Optimized Script" />}
    </ToolLayout>
  );
}
