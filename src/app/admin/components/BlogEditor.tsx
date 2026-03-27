'use client';

import { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline, Heading1, Heading2, 
  List, ListOrdered, Quote, Link, Image as ImageIcon, 
  Eye, Edit3, Loader2 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const newText = textarea.value.substring(0, start) + before + selection + after + textarea.value.substring(end);
    
    onChange(newText);
    
    // Focus back and set selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        insertText(`![${file.name}](${data.url})`);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card" style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        padding: '8px 12px', 
        background: 'var(--bg-glass)', 
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: 4, paddingRight: 8, borderRight: '1px solid var(--border)' }}>
          <button type="button" onClick={() => insertText('# ', '')} className="btn-toolbar" title="Heading 1"><Heading1 size={16} /></button>
          <button type="button" onClick={() => insertText('## ', '')} className="btn-toolbar" title="Heading 2"><Heading2 size={16} /></button>
        </div>
        
        <div style={{ display: 'flex', gap: 4, paddingRight: 8, borderRight: '1px solid var(--border)' }}>
          <button type="button" onClick={() => insertText('**', '**')} className="btn-toolbar" title="Bold"><Bold size={16} /></button>
          <button type="button" onClick={() => insertText('*', '*')} className="btn-toolbar" title="Italic"><Italic size={16} /></button>
          <button type="button" onClick={() => insertText('<u>', '</u>')} className="btn-toolbar" title="Underline"><Underline size={16} /></button>
        </div>

        <div style={{ display: 'flex', gap: 4, paddingRight: 8, borderRight: '1px solid var(--border)' }}>
          <button type="button" onClick={() => insertText('> ')} className="btn-toolbar" title="Quote"><Quote size={16} /></button>
          <button type="button" onClick={() => insertText('- ')} className="btn-toolbar" title="Bullet List"><List size={16} /></button>
          <button type="button" onClick={() => insertText('1. ')} className="btn-toolbar" title="Numbered List"><ListOrdered size={16} /></button>
        </div>

        <div style={{ display: 'flex', gap: 4, paddingRight: 8, borderRight: '1px solid var(--border)' }}>
          <button type="button" onClick={() => insertText('[', '](url)')} className="btn-toolbar" title="Link"><Link size={16} /></button>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-toolbar" title="Upload Image" disabled={uploading}>
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
          </button>
          <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
        </div>

        <button 
          type="button" 
          onClick={() => setPreview(!preview)} 
          className={`btn-toolbar ${preview ? 'active' : ''}`}
          style={{ marginLeft: 'auto' }}
        >
          {preview ? <Edit3 size={16} /> : <Eye size={16} />}
          <span style={{ fontSize: 12, marginLeft: 4 }}>{preview ? 'Edit' : 'Preview'}</span>
        </button>
      </div>

      {preview ? (
        <div className="blog-content" style={{ padding: 24, height: 400, overflowY: 'auto', background: 'var(--bg-surface)' }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          className="input"
          style={{ 
            height: 400, 
            padding: 20, 
            border: 'none', 
            borderRadius: 0, 
            fontSize: 15, 
            fontFamily: 'monospace',
            backgroundColor: 'transparent'
          }}
          placeholder="Start writing your masterpiece... Markdown is supported."
          value={content}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      <style jsx>{`
        .btn-toolbar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-toolbar:hover {
          background: var(--bg-glass-hover);
          color: var(--text-primary);
        }
        .btn-toolbar.active {
          background: var(--accent-orange);
          color: #fff;
        }
        .btn-toolbar:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
