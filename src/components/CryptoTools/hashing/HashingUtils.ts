import CryptoJS from 'crypto-js';
import { HashFormat, HashAlgorithm, CHUNK_SIZE, FileHashResult } from './HashingTypes';

// Utility functions for hashing
export class HashingUtils {
  // Convert hash to different formats
  static convertFormat(hash: string, from: HashFormat, to: HashFormat): string {
    if (from === to) return hash;

    try {
      // Convert to bytes first
      let wordArray: CryptoJS.lib.WordArray;

      if (from === 'hex') {
        wordArray = CryptoJS.enc.Hex.parse(hash);
      } else if (from === 'base64') {
        wordArray = CryptoJS.enc.Base64.parse(hash);
      } else if (from === 'base64url') {
        // Convert base64url to base64 first
        const base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
        wordArray = CryptoJS.enc.Base64.parse(base64);
      } else {
        throw new Error(`Unsupported format: ${from}`);
      }

      // Convert from bytes to target format
      if (to === 'hex') {
        return CryptoJS.enc.Hex.stringify(wordArray);
      } else if (to === 'base64') {
        return CryptoJS.enc.Base64.stringify(wordArray);
      } else if (to === 'base64url') {
        const base64 = CryptoJS.enc.Base64.stringify(wordArray);
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      }

      throw new Error(`Unsupported target format: ${to}`);
    } catch (error) {
      throw new Error(`Failed to convert from ${from} to ${to}: ${error}`);
    }
  }

  // Hash text using MD5
  static async hashMD5(text: string): Promise<string> {
    return CryptoJS.MD5(text).toString();
  }

  // Hash text using SHA1
  static async hashSHA1(text: string): Promise<string> {
    return CryptoJS.SHA1(text).toString();
  }

  // Hash text using Web Crypto API for SHA256
  static async hashSHA256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Hash text using Web Crypto API for SHA512
  static async hashSHA512(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Hash file using MD5 with chunking for large files
  static async hashFileMD5(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const chunkSize = CHUNK_SIZE;
      let currentChunk = 0;
      const chunks = Math.ceil(file.size / chunkSize);
      let md5Hash = CryptoJS.MD5('');

      const processChunk = () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        reader.onload = (e) => {
          try {
            const chunkData = e.target?.result as string;
            const wordArray = CryptoJS.enc.Latin1.parse(chunkData);
            md5Hash = md5Hash.concat(CryptoJS.MD5(wordArray));

            currentChunk++;

            if (onProgress) {
              onProgress((currentChunk / chunks) * 100);
            }

            if (currentChunk < chunks) {
              processChunk();
            } else {
              resolve(md5Hash.toString());
            }
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = () => reject(new Error('Failed to read file chunk'));
        reader.readAsBinaryString(chunk);
      };

      processChunk();
    });
  }

  // Hash file using SHA1 with chunking
  static async hashFileSHA1(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const chunkSize = CHUNK_SIZE;
      let currentChunk = 0;
      const chunks = Math.ceil(file.size / chunkSize);
      let sha1Hash = CryptoJS.SHA1('');

      const processChunk = () => {
        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        reader.onload = (e) => {
          try {
            const chunkData = e.target?.result as string;
            const wordArray = CryptoJS.enc.Latin1.parse(chunkData);
            sha1Hash = sha1Hash.concat(CryptoJS.SHA1(wordArray));

            currentChunk++;

            if (onProgress) {
              onProgress((currentChunk / chunks) * 100);
            }

            if (currentChunk < chunks) {
              processChunk();
            } else {
              resolve(sha1Hash.toString());
            }
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = () => reject(new Error('Failed to read file chunk'));
        reader.readAsBinaryString(chunk);
      };

      processChunk();
    });
  }

  // Hash file using Web Crypto API for SHA256 with streaming
  static async hashFileSHA256(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const chunkSize = CHUNK_SIZE;
    const chunks = Math.ceil(file.size / chunkSize);

    // Initialize hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', new ArrayBuffer(0));
    const hashAlgorithm = { name: 'SHA-256' };

    // For Web Crypto API, we need to read all chunks and hash them
    const chunksData: ArrayBuffer[] = [];

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const arrayBuffer = await chunk.arrayBuffer();
      chunksData.push(arrayBuffer);

      if (onProgress) {
        onProgress(((i + 1) / chunks) * 100);
      }
    }

    // Combine all chunks and hash
    const totalSize = chunksData.reduce((acc, chunk) => acc + chunk.byteLength, 0);
    const combinedBuffer = new ArrayBuffer(totalSize);
    const combinedView = new Uint8Array(combinedBuffer);

    let offset = 0;
    for (const chunk of chunksData) {
      combinedView.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }

    const finalHashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);
    const hashArray = Array.from(new Uint8Array(finalHashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Hash file using Web Crypto API for SHA512 with streaming
  static async hashFileSHA512(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const chunkSize = CHUNK_SIZE;
    const chunks = Math.ceil(file.size / chunkSize);

    // Read all chunks
    const chunksData: ArrayBuffer[] = [];

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const arrayBuffer = await chunk.arrayBuffer();
      chunksData.push(arrayBuffer);

      if (onProgress) {
        onProgress(((i + 1) / chunks) * 100);
      }
    }

    // Combine all chunks and hash
    const totalSize = chunksData.reduce((acc, chunk) => acc + chunk.byteLength, 0);
    const combinedBuffer = new ArrayBuffer(totalSize);
    const combinedView = new Uint8Array(combinedBuffer);

    let offset = 0;
    for (const chunk of chunksData) {
      combinedView.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }

    const finalHashBuffer = await crypto.subtle.digest('SHA-512', combinedBuffer);
    const hashArray = Array.from(new Uint8Array(finalHashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Validate hash format
  static validateHash(hash: string, format: HashFormat): boolean {
    if (!hash) return false;

    if (format === 'hex') {
      return /^[a-fA-F0-9]+$/.test(hash);
    } else if (format === 'base64') {
      return /^[A-Za-z0-9+/]*={0,2}$/.test(hash);
    } else if (format === 'base64url') {
      return /^[A-Za-z0-9_-]*$/.test(hash);
    }

    return false;
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Compare hashes (case-insensitive)
  static compareHashes(hash1: string, hash2: string): boolean {
    return hash1.toLowerCase() === hash2.toLowerCase();
  }
}

// Batch processing for multiple files
export async function batchHashFiles(
  files: File[],
  algorithm: HashAlgorithm,
  format: HashFormat = 'hex',
  onProgress?: (current: number, total: number, fileName: string) => void
): Promise<FileHashResult[]> {
  const results: FileHashResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (onProgress) {
      onProgress(i + 1, files.length, file.name);
    }

    const startTime = Date.now();
    let hash = '';

    try {
      switch (algorithm) {
        case 'md5':
          hash = await HashingUtils.hashFileMD5(file);
          break;
        case 'sha1':
          hash = await HashingUtils.hashFileSHA1(file);
          break;
        case 'sha256':
          hash = await HashingUtils.hashFileSHA256(file);
          break;
        case 'sha512':
          hash = await HashingUtils.hashFileSHA512(file);
          break;
        default:
          throw new Error(`Unsupported algorithm: ${algorithm}`);
      }

      // Convert to requested format if not hex
      if (format !== 'hex') {
        hash = HashingUtils.convertFormat(hash, 'hex', format);
      }

      const processingTime = Date.now() - startTime;

      results.push({
        file,
        hash,
        format,
        algorithm,
        processingTime
      });
    } catch (error) {
      console.error(`Failed to hash file ${file.name}:`, error);
      results.push({
        file,
        hash: 'ERROR',
        format,
        algorithm,
        processingTime: Date.now() - startTime
      });
    }
  }

  return results;
}