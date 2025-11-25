import React from 'react';
import Layout from '@theme/Layout';
import JSONFormatter from '@site/src/components/JSONFormatter';

export default function JSONFormatterPage() {
  return (
    <Layout
      title="JSON Formatter - Format, Validate & Minify JSON Online"
      description="Free online JSON formatter tool. Format, validate, and minify JSON data with syntax highlighting. Real-time JSON validation and formatting."
    >
      <JSONFormatter />
    </Layout>
  );
}