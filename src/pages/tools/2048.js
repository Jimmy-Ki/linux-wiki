import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import Game2048 from '../../components/Game2048';

export default function Game2048Page() {
  return (
    <ToolPageWithAds
      title="2048 Game - Linux Wiki Tools"
      description="Classic 2048 puzzle game with keyboard controls and score tracking"
    >
      <Game2048 />
    </ToolPageWithAds>
  );
}