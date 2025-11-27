import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import Base64Encoder from '../../components/Base64Encoder';

export default function Base64EncoderPage() {
  return (
    <ToolPageWithAds
      title="Base64 Encoder/Decoder - Linux Wiki Tools"
      description="Encode and decode text and files using Base64 encoding with standard and URL-safe options"
    >
      <Base64Encoder />
    </ToolPageWithAds>
  );
}