import React from 'react';
import Layout from '@theme/Layout';
import ToolsGrid from '@site/src/components/ToolsGrid';

export default function ToolsPage() {
  return (
    <Layout
      title="Free Online Tools - Developer & Linux Utilities"
      description="25+ free online tools for developers, sysadmins, and tech enthusiasts. Encryption, network tools, calculators, and more. All tools run in your browser."
    >
      <ToolsGrid />
    </Layout>
  );
}