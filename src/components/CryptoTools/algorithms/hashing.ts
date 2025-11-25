import CryptoJS from 'crypto-js';
import { sha256, sha512 } from 'js-sha512';
import { ToolResult } from '../base/types';

export const hashAlgorithms = {
  md5: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.MD5(input).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'MD5 hashing failed'
      };
    }
  },

  sha1: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.SHA1(input).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SHA1 hashing failed'
      };
    }
  },

  sha256: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: sha256(input)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SHA256 hashing failed'
      };
    }
  },

  sha512: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: sha512(input)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SHA512 hashing failed'
      };
    }
  },

  sha3: (input: string, outputSize: number = 512): ToolResult => {
    try {
      let hash;
      switch (outputSize) {
        case 224:
          hash = CryptoJS.SHA3(input, { outputLength: 224 });
          break;
        case 256:
          hash = CryptoJS.SHA3(input, { outputLength: 256 });
          break;
        case 384:
          hash = CryptoJS.SHA3(input, { outputLength: 384 });
          break;
        case 512:
        default:
          hash = CryptoJS.SHA3(input, { outputLength: 512 });
          break;
      }
      return {
        success: true,
        data: hash.toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'SHA3 hashing failed'
      };
    }
  }
};

export const checksumAlgorithms = {
  crc32: (input: string): ToolResult => {
    try {
      const crcTable: number[] = [];
      for (let i = 0; i < 256; i++) {
        let crc = i;
        for (let j = 0; j < 8; j++) {
          crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
        }
        crcTable[i] = crc;
      }

      const bytes = new TextEncoder().encode(input);
      let crc = 0 ^ (-1);

      for (const byte of bytes) {
        crc = crcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
      }

      return {
        success: true,
        data: ((crc ^ (-1)) >>> 0).toString(16).toLowerCase()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'CRC32 calculation failed'
      };
    }
  },

  Adler32: (input: string): ToolResult => {
    try {
      const bytes = new TextEncoder().encode(input);
      let a = 1;
      let b = 0;

      for (const byte of bytes) {
        a = (a + byte) % 65521;
        b = (b + a) % 65521;
      }

      return {
        success: true,
        data: ((b << 16) | a).toString(16).toLowerCase()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Adler32 calculation failed'
      };
    }
  }
};

export const hmacAlgorithms = {
  hmacMD5: (input: string, key: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.HmacMD5(input, key).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HMAC-MD5 calculation failed'
      };
    }
  },

  hmacSHA1: (input: string, key: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.HmacSHA1(input, key).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HMAC-SHA1 calculation failed'
      };
    }
  },

  hmacSHA256: (input: string, key: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.HmacSHA256(input, key).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HMAC-SHA256 calculation failed'
      };
    }
  },

  hmacSHA512: (input: string, key: string): ToolResult => {
    try {
      return {
        success: true,
        data: CryptoJS.HmacSHA512(input, key).toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HMAC-SHA512 calculation failed'
      };
    }
  }
};