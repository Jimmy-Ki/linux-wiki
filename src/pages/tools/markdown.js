import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import MarkdownEditor from '../../components/MarkdownEditor';

export default function MarkdownEditorPage() {
  return (
    <ToolPageWithAds
      title="Markdown Editor - Linux Wiki Tools"
      description="Live preview markdown editor with real-time rendering and syntax highlighting"
    >
      <MarkdownEditor />
    </ToolPageWithAds>
  );
}