import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import PasswordGenerator from '../../components/PasswordGenerator';

export default function PasswordGeneratorPage() {
  return (
    <ToolPageWithAds
      title="Password Generator - Linux Wiki Tools"
      description="Generate strong, secure passwords with customizable options and real-time strength analysis"
    >
      <PasswordGenerator />
    </ToolPageWithAds>
  );
}