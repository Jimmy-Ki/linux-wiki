import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import EmojiGenerator from '../../components/EmojiGenerator';

export default function EmojiGeneratorPage() {
  return (
    <ToolPageWithAds
      title="Emoji Generator - Linux Wiki Tools"
      description="Find and copy emojis easily with our comprehensive emoji library. Search by category or copy multiple emojis at once"
      keywords={['emoji generator', 'emoji finder', 'copy emojis', 'emoji search', 'emoji library']}
      toolType="webapp"
    >
      <EmojiGenerator />
    </ToolPageWithAds>
  );
}