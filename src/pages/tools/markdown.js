import React from 'react';
import Icon from '../../components/Icon';
import ToolPageWithAds from '../../components/ToolPageWithAds';

export default function MarkdownEditorPage() {
  return (
    <ToolPageWithAds
      title="Markdown Editor - Linux Wiki Tools"
      description="Live preview markdown editor with real-time rendering and syntax highlighting"
    >
      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="icon">
            <Icon name="markdown" size="xlarge" />
          </div>
          <h2>Markdown Editor</h2>
          <p className="description">Live preview markdown editor with real-time rendering and syntax highlighting</p>
          <div className="features">
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Real-time markdown preview</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Syntax highlighting</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Export to HTML/PDF</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Toolbar with formatting options</span>
            </div>
          </div>
          <div className="status">
            <span className="status-badge coming-soon">
              <Icon name="comingSoon" size="small" />
              Coming Soon
            </span>
            <p className="status-text">This tool is currently under development and will be available soon.</p>
          </div>
        </div>
      </div>
    </ToolPageWithAds>
  );
}