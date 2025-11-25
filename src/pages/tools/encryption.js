import React from 'react';
import Layout from '@theme/Layout';
import ToolPage from '@site/src/components/ToolPage';

export default function EncryptionPage() {
  return (
    <Layout
      title="Encryption & Decryption Tools - Free Online Crypto Utilities"
      description="Free online encryption and decryption tools. Base64, MD5, SHA256, URL encoding/decoding. All processing happens in your browser."
    >
      <ToolPage
        title="Encryption & Decryption Tools"
        description="Encode, decode, and hash text with various encryption methods. All tools run locally in your browser for maximum privacy."
        comingSoon={true}
      />
    </Layout>
  );
}