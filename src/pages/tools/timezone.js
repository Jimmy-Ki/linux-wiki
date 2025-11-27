import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import TimezoneConverter from '../../components/TimezoneConverter';

export default function TimezoneConverterPage() {
  return (
    <ToolPageWithAds
      title="Timezone Converter - Linux Wiki Tools"
      description="World clock and timezone conversion tool with real-time updates"
    >
      <TimezoneConverter />
    </ToolPageWithAds>
  );
}