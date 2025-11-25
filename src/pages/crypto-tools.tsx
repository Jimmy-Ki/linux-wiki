import React from 'react';
import Layout from '@theme/Layout';
import CryptoToolsPage from '@site/src/components/CryptoTools/CryptoToolsPage';

export default function CryptoTools() {
  return (
    <Layout
      title="Crypto Tools - 89+ Free Online Encryption & Security Tools"
      description="89+ free online cryptography tools. Base64, AES, RSA, SHA, Caesar cipher, and more. All tools run in your browser with complete privacy."
    >
      <CryptoToolsPage />
    </Layout>
  );
}