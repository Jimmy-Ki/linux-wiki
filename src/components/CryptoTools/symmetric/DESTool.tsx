import React from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import { symmetricAlgorithms } from '../algorithms/symmetric';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'des',
  name: 'DES Encryption/Decryption',
  description: 'Data Encryption Standard (DES) - An older symmetric encryption algorithm using 56-bit keys. Not recommended for modern security.',
  category: 'Modern Symmetric Crypto',
  operation: 'encrypt',
  supportedModes: ['ECB', 'CBC'],
  defaultMode: 'CBC',
  hasKeyInput: true,
  hasIVInput: true,
  keySizes: [56],
  ivSizes: [64]
};

export const DESTool: React.FC = () => {
  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    if (!key) {
      return {
        success: false,
        error: 'Key is required for DES encryption/decryption'
      };
    }

    const action = options?.action || 'encrypt';

    if (action === 'encrypt') {
      return symmetricAlgorithms.des.encrypt(input, key, { mode, iv });
    } else if (action === 'decrypt') {
      return symmetricAlgorithms.des.decrypt(input, key, { mode, iv });
    }

    return {
      success: false,
      error: 'Invalid action. Please select encrypt or decrypt.'
    };
  };

  return (
    <CryptoTool
      config={config}
      onProcess={handleProcess}
    />
  );
};