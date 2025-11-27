import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import LinuxCommandsGenerator from '../../components/LinuxCommandsGenerator';

export default function LinuxCommandsPage() {
  return (
    <ToolPageWithAds
      title="Linux Command Generator - Linux Wiki Tools"
      description="Generate and customize Linux commands for system administration, networking, and development"
    >
      <LinuxCommandsGenerator />
    </ToolPageWithAds>
  );
}