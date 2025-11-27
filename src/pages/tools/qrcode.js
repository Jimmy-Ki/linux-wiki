import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import QRCodeGenerator from '../../components/QRCodeGenerator';

export default function QRCodeGeneratorPage() {
  return (
    <ToolPageWithAds
      title="QR Code Generator - Linux Wiki Tools"
      description="Create custom QR codes for URLs, text, WiFi, and more with customizable colors and sizes"
    >
      <QRCodeGenerator />
    </ToolPageWithAds>
  );
}