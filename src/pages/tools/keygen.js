import React from 'react';
import Layout from '@theme/Layout';
import ToolPage from '@site/src/components/ToolPage';

export default function KeygenPage() {
  return (
    <Layout
      title="Key Generator - SSH, API Keys, Passwords Generator"
      description="Free online key generator. Generate SSH keys, API keys, strong passwords, and random strings. Secure and private - everything happens in your browser."
    >
      <ToolPage
        title="Key Generator"
        description="Generate secure SSH keys, API keys, passwords, and random strings. All generation happens locally for maximum security."
        comingSoon={true}
      />
    </Layout>
  );
}