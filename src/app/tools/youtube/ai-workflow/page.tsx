'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function AIWorkflowPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    generate({
      prompt: `Today is ${currentDate}. Design a complete YouTube automation workflow system for a [${niche}] channel with a $0 budget.

Use only tools and platforms that are ACTIVELY AVAILABLE and working in ${new Date().getFullYear()} — no deprecated or discontinued services.

Map out:
- The best FREE AI tools CURRENTLY available for each production step (script, voice, edit, thumbnail)
- Step-by-step workflow: Idea → Script → Voiceover → Edit → Thumbnail → Upload
- Time required per video (target under 2 hours)
- Batch production system for 1 month of content
- Upload schedule for maximum algorithm boost in 2026
- How to run 3 channels simultaneously
- When to reinvest first earnings into paid tools`
    });
  };

  const relatedTools = YT_TOOLS.filter(t => t.href !== '/tools/youtube/ai-workflow').slice(0, 3);

  const extraContent = (
    <div className="prose">
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>The Zero-Dollar Production System</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Many creators never start because they believe they need expensive equipment or software. 
        Our AI Automation Workflow proves them wrong. We design entire production pipelines that use <strong>100% free AI tools</strong>. 
        From scripting to voiceovers and editing, we show you exactly how to build a high-quality video for $0.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Efficiency and Batching</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Scaling on YouTube is a volume game. If it takes you a week to make one video, you&apos;ll never grow. 
        This tool provides a &quot;Batch Production&quot; strategy, allowing you to create 10–20 videos in a single weekend. 
        By separating the creative phases (scripting, recording, editing) from the technical phases, 
        you enter a &quot;flow state&quot; that dramatically increases your output without causing burnout.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Scaling to Enterprise Level</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Once your $0 workflow starts generating revenue, this tool shows you exactly when and where to reinvest. 
        Whether it&apos;s hiring a human editor or upgrading to premium AI tools, we provide the roadmap to transition 
        from a solo-creator to a full-scale content enterprise.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="AI Automation Workflow" 
      description="Map out a complete $0 AI automation system for your channel — from idea to upload." 
      badge="youtube"
      slug="ai-workflow"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Designing System...' : 'Generate Workflow'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>{error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Automation System Plan" />}
    </ToolLayout>
  );
}
