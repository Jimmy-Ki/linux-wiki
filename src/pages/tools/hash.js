import React from 'react';
import Layout from '@theme/Layout';
import HashGenerator from '@site/src/components/HashGenerator';

export default function HashGeneratorPage() {
  return (
    <Layout
      title="Hash Generator - Generate MD5, SHA-1, SHA-256, SHA-512 Hashes"
      description="Free online hash generator tool. Generate MD5, SHA-1, SHA-2, SHA-3, and RIPEMD-160 hashes. Real-time hash generation with collision detection and security information."
    >
      <HashGenerator />
    </Layout>
  );
}