import { ToolResult, ProcessingProgress } from '../base/types';

export const CHUNK_SIZE = 1024 * 1024; // 1MB chunks for large file processing

export async function processLargeText(
  text: string,
  processor: (chunk: string) => Promise<ToolResult>,
  onProgress?: (loaded: number, total: number) => void
): Promise<ToolResult> {
  const total = text.length;

  if (total <= CHUNK_SIZE) {
    return await processor(text);
  }

  const results: string[] = [];
  let processed = 0;

  for (let i = 0; i < total; i += CHUNK_SIZE) {
    const chunk = text.slice(i, i + CHUNK_SIZE);
    const result = await processor(chunk);

    if (!result.success) {
      return result;
    }

    if (result.data) {
      results.push(typeof result.data === 'string' ? result.data : Buffer.from(result.data).toString());
    }

    processed += chunk.length;
    onProgress?.(processed, total);
  }

  return {
    success: true,
    data: results.join('')
  };
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export function hexToArrayBuffer(hex: string): ArrayBuffer {
  const cleanHex = hex.replace(/\s+/g, '').toLowerCase();
  if (cleanHex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }

  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function stringToArrayBuffer(str: string, encoding: string = 'utf-8'): ArrayBuffer {
  return new TextEncoder().encode(str).buffer;
}

export function arrayBufferToString(buffer: ArrayBuffer, encoding: string = 'utf-8'): string {
  return new TextDecoder().decode(buffer);
}

export function generateSecureRandomBytes(length: number): Uint8Array {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint8Array(length));
  }
  // Fallback for older browsers (not recommended for production)
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

export function generateSecureRandomString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  const bytes = generateSecureRandomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(bytes[i] % charset.length);
  }
  return result;
}