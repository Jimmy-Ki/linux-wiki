import React from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import { base32Algorithms } from '../algorithms/encoders';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'base32',
  name: 'Base32 Encoder/Decoder',
  description: 'Encode or decode data using Base32 encoding. Used in various applications like Google Authenticator.',
  category: 'Encoders & Decoders',
  operation: 'encode'
};

export const Base32Tool: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    const action = options?.action || 'encode';

    if (action === 'encode') {
      return base32Algorithms.encode(input);
    } else if (action === 'decode') {
      return base32Algorithms.decode(input);
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