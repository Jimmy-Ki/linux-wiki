import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import MemeGenerator from '../../components/MemeGenerator';

export default function MemeGeneratorPage() {
  return (
    <ToolPageWithAds
      title="Meme Generator - Linux Wiki Tools"
      description="Create funny memes with custom text overlay. Choose from popular templates or upload your own images"
      keywords={['meme generator', 'create memes', 'funny memes', 'image editor', 'text overlay']}
      toolType="webapp"
    >
      <MemeGenerator />
    </ToolPageWithAds>
  );
}