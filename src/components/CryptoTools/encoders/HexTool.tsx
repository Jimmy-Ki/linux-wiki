import React from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import { base16Algorithms } from '../algorithms/encoders';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'hex',
  name: 'Hex Encoder/Decoder',
  description: 'Encode or decode data using hexadecimal (Base16) encoding. Useful for representing binary data as text.',
  category: 'Encoders & Decoders',
  operation: 'encode'
};

export const HexTool: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    const action = options?.action || 'encode';

    if (action === 'encode') {
      return base16Algorithms.encode(input);
    } else if (action === 'decode') {
      return base16Algorithms.decode(input);
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