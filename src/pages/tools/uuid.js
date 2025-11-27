import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import UUIDGenerator from '../../components/UUIDGenerator';

export default function UUIDGeneratorPage() {
  return (
    <ToolPageWithAds
      title="UUID Generator - Linux Wiki Tools"
      description="Generate unique UUID identifiers with support for v1, v4, and v7 versions with bulk generation"
    >
      <UUIDGenerator />
    </ToolPageWithAds>
  );
}