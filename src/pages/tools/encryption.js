import React from 'react';
import Layout from '@theme/Layout';
import UnifiedCryptoTool from '@site/src/components/UnifiedCryptoTool';

export default function EncryptionPage() {
  return (
    <Layout
      title="Encryption & Decryption Tools - Free Online Crypto Utilities"
      description="Free online encryption and decryption tools. Base64, MD5, SHA256, URL encoding, Caesar cipher and more. All processing happens in your browser."
    >
      <UnifiedCryptoTool />
    </Layout>
  );
}