import React from 'react';
import Layout from '@theme/Layout';
import ColorPicker from '@site/src/components/ColorPicker';

export default function ColorPickerPage() {
  return (
    <Layout
      title="Color Picker - Professional Color Tool with Multiple Formats"
      description="Free online color picker tool. Convert between HEX, RGB, HSL formats. Generate color palettes, variations, and export for CSS, Tailwind, and more."
    >
      <ColorPicker />
    </Layout>
  );
}