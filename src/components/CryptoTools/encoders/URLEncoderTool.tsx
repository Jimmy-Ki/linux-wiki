import React from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import { urlEncoder } from '../algorithms/encoders';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'url-encoder',
  name: 'URL Encoder/Decoder',
  description: 'Encode or decode URLs using percent-encoding. Useful for handling special characters in URLs.',
  category: 'Encoders & Decoders',
  operation: 'encode'
};

export const URLEncoderTool: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    const action = options?.action || 'encode';

    if (action === 'encode') {
      return urlEncoder.encode(input);
    } else if (action === 'decode') {
      return urlEncoder.decode(input);
    }

    return {
      success: false,
      error: 'Invalid action. Please select encode or decode.'
    };
  };

  return (
    <CryptoTool
      config={config}
      onProcess={handleProcess}
    />
  );
};