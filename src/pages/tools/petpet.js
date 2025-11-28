import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import PetPetGenerator from '../../components/PetPetGenerator';

export default function PetPetGeneratorPage() {
  return (
    <ToolPageWithAds
      title="PetPet Generator - Linux Wiki Tools"
      description="Create animated patting head GIF memes. Upload any image and generate the popular petpet animation"
      keywords={['petpet generator', 'patting head meme', 'gif generator', 'animated meme', 'meme creator']}
      toolType="webapp"
    >
      <PetPetGenerator />
    </ToolPageWithAds>
  );
}