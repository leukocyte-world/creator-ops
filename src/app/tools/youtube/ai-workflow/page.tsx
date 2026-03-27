'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';
import { YT_TOOLS } from '@/lib/tools-config';

export default function AIWorkflowPage() {
  const [niche, setNiche] = useState('');
  const { result, loading, error, upgradeRequired, generate } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate({
      prompt: `Design a complete YouTube automation workflow system for a [${niche}] channel with a $0 budget.

Map out:
- Free AI tools for each production step
- Step-by-step workflow: Script → Voiceover → Edit → Thumbnail
- Time required per video (target under 2 hours)
- Batch production system for 1 month of content
- Upload schedule for maximum algorithm boost
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
        From ChatGPT for scripting to ElevenLabs for voiceovers and CapCut for editing, we show you exactly how to build a high-quality video for $0.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Efficiency and Batching</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Scaling on YouTube is a volume game. If it takes you a week to make one video, you'll never grow. 
        This tool provides a "Batch Production" strategy, allowing you to create 10-20 videos in a single weekend. 
        By separating the creative phases (scripting, recording, editing) from the technical phases, 
        you enter a "flow state" that dramatically increases your output without causing burnout.
      </p>

      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Scaling to Enterprise Level</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
        Once your $0 workflow starts generating revenue, this tool shows you exactly when and where to reinvest. 
        Whether it's hiring a human editor or upgrading to premium AI tools, we provide the roadmap to transition 
        from a solo-creator to a full-scale content enterprise. This is the ultimate guide to YouTube financial freedom in 2026.
      </p>
    </div>
  );

  return (
    <ToolLayout 
      title="🤖 AI Automation Workflow" 
      description="Map out a complete $0 AI automation system for your channel — from idea to upload." 
      badge="youtube"
      extraContent={extraContent}
      relatedTools={relatedTools}
    >
      <form className="tool-form" onSubmit={handleSubmit}>
        <div className="input-wrap"><label className="input-label">Channel Niche</label><input className="input" value={niche} onChange={e => setNiche(e.target.value)} required /></div>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Designing System...' : 'Generate Workflow'}</button>
      </form>
      {error && <div style={{ color: '#ff7070' }}>⚠ {error}</div>}
      {upgradeRequired && <UpgradePrompt />}
      {result && <ResultDisplay result={result} label="Automation System Plan" />}
    </ToolLayout>
  );
}
