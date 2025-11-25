export type CryptoOperation = 'encrypt' | 'decrypt' | 'encode' | 'decode' | 'hash' | 'generate';

export type EncryptionMode = 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR' | 'GCM';

export interface ToolResult {
  success: boolean;
  data?: string | Uint8Array;
  error?: string;
  metadata?: Record<string, any>;
}

export interface ToolOptions {
  [key: string]: string | number | boolean;
}

export interface CryptoToolConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  operation: CryptoOperation;
  supportedModes?: EncryptionMode[];
  defaultMode?: EncryptionMode;
  hasKeyInput?: boolean;
  hasIVInput?: boolean;
  keySizes?: number[];
  ivSizes?: number[];
}

export interface CryptoToolState {
  input: string;
  output: string;
  key: string;
  iv: string;
  mode: EncryptionMode;
  options: ToolOptions;
  processing: boolean;
  error: string;
}

export interface ProcessingProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type TextEncoding = 'utf8' | 'ascii' | 'hex' | 'base64' | 'binary';

export type ByteFormat = 'hex' | 'base64' | 'binary' | 'utf8';