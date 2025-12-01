import React from 'react';
import Layout from '@theme/Layout';
import MermaidEditor from '@site/src/components/MermaidEditor';

export default function MermaidEditorPage() {
  return (
    <Layout
      title="Mermaid Live Editor - Create Diagrams Online"
      description="Free online Mermaid diagram editor with real-time preview. Create flowcharts, sequence diagrams, Gantt charts, and more with live rendering."
    >
      <MermaidEditor />
    </Layout>
  );
}