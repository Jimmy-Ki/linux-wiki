import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import ScientificCalculator from '../../components/ScientificCalculator';

export default function CalculatorPage() {
  return (
    <ToolPageWithAds
      title="Scientific Calculator - Linux Wiki Tools"
      description="Advanced calculator with scientific functions, memory operations, and history tracking"
    >
      <ScientificCalculator />
    </ToolPageWithAds>
  );
}