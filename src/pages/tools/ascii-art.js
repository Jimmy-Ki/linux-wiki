import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import AsciiArtGenerator from '../../components/AsciiArtGenerator';

export default function AsciiArtPage() {
  return (
    <ToolPageWithAds
      title="ASCII Art Generator - Linux Wiki Tools"
      description="Convert text and images to ASCII art. Create stunning text art and transform images into ASCII characters"
      keywords={['ascii art', 'text art', 'ascii generator', 'image to ascii', 'text converter']}
      toolType="webapp"
    >
      <AsciiArtGenerator />
    </ToolPageWithAds>
  );
}