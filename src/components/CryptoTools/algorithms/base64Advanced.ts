import { ToolResult } from '../base/types';

// Enhanced Base64 encoding algorithms with multiple variants
export const advancedBase64Algorithms = {
  // Standard Base64 encoding
  encodeStandard: (input: string): ToolResult => {
    try {
      // Convert string to UTF-8 bytes then to Base64
      const utf8Bytes = new TextEncoder().encode(input);
      const base64 = btoa(String.fromCharCode(...utf8Bytes));
      return {
        success: true,
        data: base64
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Standard Base64 encoding failed'
      };
    }
  },

  // Standard Base64 decoding
  decodeStandard: (input: string): ToolResult => {
    try {
      // Validate Base64 input
      const cleanInput = input.replace(/\s/g, '');
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanInput)) {
        return {
          success: false,
          error: 'Invalid Base64 format'
        };
      }

      const binaryString = atob(cleanInput);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return {
        success: true,
        data: new TextDecoder().decode(bytes)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Standard Base64 decoding failed'
      };
    }
  },

  // URL-safe Base64 encoding (replaces + with - and / with _)
  encodeURLSafe: (input: string): ToolResult => {
    try {
      const standardResult = advancedBase64Algorithms.encodeStandard(input);
      if (!standardResult.success) {
        return standardResult;
      }

      const urlSafe = standardResult.data!
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Remove padding

      return {
        success: true,
        data: urlSafe
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL-safe Base64 encoding failed'
      };
    }
  },

  // URL-safe Base64 decoding
  decodeURLSafe: (input: string): ToolResult => {
    try {
      // Convert back to standard Base64
      let standardInput = input
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      // Add padding if needed
      while (standardInput.length % 4 !== 0) {
        standardInput += '=';
      }

      return advancedBase64Algorithms.decodeStandard(standardInput);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL-safe Base64 decoding failed'
      };
    }
  },

  // MIME Base64 encoding (with line breaks every 76 characters)
  encodeMIME: (input: string): ToolResult => {
    try {
      const standardResult = advancedBase64Algorithms.encodeStandard(input);
      if (!standardResult.success) {
        return standardResult;
      }

      const base64 = standardResult.data!;
      const lines: string[] = [];

      // Split into lines of 76 characters each
      for (let i = 0; i < base64.length; i += 76) {
        lines.push(base64.slice(i, i + 76));
      }

      return {
        success: true,
        data: lines.join('\r\n')
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'MIME Base64 encoding failed'
      };
    }
  },

  // MIME Base64 decoding (handles line breaks)
  decodeMIME: (input: string): ToolResult => {
    try {
      // Remove all line breaks and whitespace
      const cleanInput = input.replace(/[\r\n\s]/g, '');
      return advancedBase64Algorithms.decodeStandard(cleanInput);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'MIME Base64 decoding failed'
      };
    }
  }
};

// Chunked processing for large files
export class Base64ChunkProcessor {
  private static readonly CHUNK_SIZE = 1024 * 1024; // 1MB chunks

  static async encodeFile(
    file: File,
    variant: 'standard' | 'url-safe' | 'mime',
    onProgress?: (progress: number) => void
  ): Promise<ToolResult> {
    try {
      const totalSize = file.size;
      let processed = 0;
      const result: string[] = [];

      const reader = new FileReader();

      for (let offset = 0; offset < totalSize; offset += this.CHUNK_SIZE) {
        const chunk = file.slice(offset, Math.min(offset + this.CHUNK_SIZE, totalSize));

        const chunkResult = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            try {
              const chunkData = new Uint8Array(e.target?.result as ArrayBuffer);
              const chunkString = String.fromCharCode(...chunkData);
              const encoded = btoa(chunkString);
              resolve(encoded);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file chunk'));
          reader.readAsArrayBuffer(chunk);
        });

        result.push(chunkResult);
        processed += chunk.size;

        if (onProgress) {
          onProgress((processed / totalSize) * 100);
        }
      }

      // Apply variant-specific transformations
      let finalResult = result.join('');

      if (variant === 'url-safe') {
        finalResult = finalResult
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      } else if (variant === 'mime') {
        // Split into 76-character lines
        const lines: string[] = [];
        for (let i = 0; i < finalResult.length; i += 76) {
          lines.push(finalResult.slice(i, i + 76));
        }
        finalResult = lines.join('\r\n');
      }

      return {
        success: true,
        data: finalResult
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File encoding failed'
      };
    }
  }

  static async decodeFile(
    content: string,
    variant: 'standard' | 'url-safe' | 'mime',
    onProgress?: (progress: number) => void
  ): Promise<ToolResult> {
    try {
      // Preprocess based on variant
      let processedContent = content;

      if (variant === 'url-safe') {
        processedContent = content
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        while (processedContent.length % 4 !== 0) {
          processedContent += '=';
        }
      } else if (variant === 'mime') {
        processedContent = content.replace(/[\r\n\s]/g, '');
      }

      // Validate
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(processedContent)) {
        return {
          success: false,
          error: 'Invalid Base64 format'
        };
      }

      // Process in chunks to handle large content
      const chunkSize = 1024 * 1024; // 1MB
      const totalLength = processedContent.length;
      let processed = 0;
      const result: number[] = [];

      for (let i = 0; i < totalLength; i += chunkSize) {
        const chunk = processedContent.slice(i, i + chunkSize);
        const binaryString = atob(chunk);

        for (let j = 0; j < binaryString.length; j++) {
          result.push(binaryString.charCodeAt(j));
        }

        processed += chunk.length;

        if (onProgress) {
          onProgress((processed / totalLength) * 100);
        }
      }

      const decodedBytes = new Uint8Array(result);
      return {
        success: true,
        data: new TextDecoder().decode(decodedBytes)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File decoding failed'
      };
    }
  }
}

// Validation utilities
export const Base64Validation = {
  // Check if string is valid Base64 (standard)
  isValidStandard: (input: string): boolean => {
    const clean = input.replace(/\s/g, '');
    return /^[A-Za-z0-9+/]*={0,2}$/.test(clean) && clean.length % 4 === 0;
  },

  // Check if string is valid URL-safe Base64
  isValidURLSafe: (input: string): boolean => {
    return /^[A-Za-z0-9_-]*$/.test(input);
  },

  // Get Base64 variant from format
  detectVariant: (input: string): 'standard' | 'url-safe' | 'mime' | 'unknown' => {
    const clean = input.replace(/[\r\n\s]/g, '');

    if (clean.includes('+') || clean.includes('/')) {
      return 'standard';
    } else if (clean.includes('-') || clean.includes('_')) {
      return 'url-safe';
    } else if (/^[A-Za-z0-9]+$/.test(clean)) {
      return 'url-safe';
    } else if (/^[A-Za-z0-9+/]*={0,2}$/.test(clean)) {
      return input.includes('\n') || input.includes('\r') ? 'mime' : 'standard';
    }

    return 'unknown';
  },

  // Estimate decoded size (rough approximation)
  estimateDecodedSize: (base64: string): number => {
    const clean = base64.replace(/[\s=]/g, '');
    return Math.floor(clean.length * 0.75);
  }
};