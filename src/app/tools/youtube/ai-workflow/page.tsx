'use client';
import { useState } from 'react';
import ToolLayout, { ResultDisplay, UpgradePrompt, useAI } from '@/components/ToolLayout';

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

  return (
    <ToolLayout title="🤖 AI Automation Workflow" description="Map out a complete $0 AI automation system for your channel — from idea to upload." badge="youtube">
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
