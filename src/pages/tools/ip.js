import React from 'react';
import Layout from '@theme/Layout';
import IPLookup from '@site/src/components/IPLookup';

export default function IPLookupPage() {
  return (
    <Layout
      title="IP Lookup Tool - IP Geolocation & Information"
      description="Free online IP lookup tool. Get detailed information about IP addresses and domains including geolocation, ISP, and security details."
    >
      <IPLookup />
    </Layout>
  );
}