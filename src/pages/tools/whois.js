import React from 'react';
import WhoisLookup from '../../components/WhoisLookup';
import ToolPageWithAds from '../../components/ToolPageWithAds';

export default function WHOISLookupPage() {
  return (
    <ToolPageWithAds
      title="WHOIS Lookup - Linux Wiki Tools"
      description="Domain information and WHOIS lookup service using free APIs"
    >
      <WhoisLookup />
    </ToolPageWithAds>
  );
}