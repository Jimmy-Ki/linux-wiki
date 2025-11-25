import React from 'react';
import Layout from '@theme/Layout';
import ToolPage from '@site/src/components/ToolPage';

export default function AsciiArtPage() {
  return (
    <Layout
      title="ASCII Art Generator - Text to ASCII Art Converter"
      description="Free online ASCII art generator. Convert text to ASCII art with multiple styles and fonts. Create cool text art for your terminal or projects."
    >
      <ToolPage
        title="🎨 ASCII Art Generator"
        description="Convert your text into stunning ASCII art with multiple fonts and styles. Perfect for terminal headers, signatures, and creative projects."
        comingSoon={true}
      />
    </Layout>
  );
}