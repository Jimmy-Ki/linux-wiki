import React from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import { base58Algorithms } from '../algorithms/encoders';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'base58',
  name: 'Base58 Encoder/Decoder',
  description: 'Encode or decode data using Base58 encoding. Commonly used in Bitcoin and other cryptocurrencies.',
  category: 'Encoders & Decoders',
  operation: 'encode'
};

export const Base58Tool: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    const action = options?.action || 'encode';

    if (action === 'encode') {
      return base58Algorithms.encode(input);
    } else if (action === 'decode') {
      return base58Algorithms.decode(input);
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