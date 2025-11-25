// Shared types for hashing tools
export type HashFormat = 'hex' | 'base64' | 'base64url';
export type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

export interface HashResult {
  algorithm: HashAlgorithm;
  input: string;
  inputType: 'text' | 'file';
  format: HashFormat;
  hash: string;
  inputSize: number;
  processingTime: number;
}

export interface ProcessingState {
  input: string;
  hashResults: Record<HashFormat, string>;
  selectedFormat: HashFormat;
  processing: boolean;
  error: string;
  progress: number | null;
  inputFile: File | null;
  inputFileName: string;
  inputSize: number;
  compareHash: string;
  compareResult: 'match' | 'mismatch' | 'pending' | null;
  batchFiles: File[];
  batchResults: HashResult[];
  processingTime: number;
}

export interface FileHashResult {
  file: File;
  hash: string;
  format: HashFormat;
  algorithm: HashAlgorithm;
  processingTime: number;
}

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const CHUNK_SIZE = 64 * 1024; // 64KB chunks for large files