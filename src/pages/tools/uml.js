import React from 'react';
import Layout from '@theme/Layout';
import UMLEditor from '@site/src/components/UMLEditor';

export default function UMLEditorPage() {
  return (
    <Layout
      title="UML Diagram Designer - Create UML Diagrams Online"
      description="Free online UML diagram designer with templates for class diagrams, sequence diagrams, use case diagrams, and more. Professional UML modeling tools."
    >
      <UMLEditor />
    </Layout>
  );
}