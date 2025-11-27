import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';

export default function MarkdownEditorPage() {
  return (
    <ToolPageWithAds
      title="Markdown Editor - Linux Wiki Tools"
      description="Live preview markdown editor with real-time rendering and syntax highlighting"
    >
      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="icon">📝</div>
          <h2>Markdown Editor</h2>
          <p className="description">Live preview markdown editor with real-time rendering and syntax highlighting</p>
          <div className="features">
            <div className="feature">
              <span className="check">✓</span>
              <span>Real-time markdown preview</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Syntax highlighting</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Export to HTML/PDF</span>
            </div>
            <div className="feature">
              <span className="check">✓</span>
              <span>Toolbar with formatting options</span>
            </div>
          </div>
          <div className="status">
            <span className="status-badge coming-soon">🚧 Coming Soon</span>
            <p className="status-text">This tool is currently under development and will be available soon.</p>
          </div>
        </div>
      </div>
    </ToolPageWithAds>
  );
}