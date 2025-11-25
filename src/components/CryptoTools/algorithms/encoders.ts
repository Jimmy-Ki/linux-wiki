import { ToolResult } from '../base/types';

export const base64Algorithms = {
  encode: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: btoa(unescape(encodeURIComponent(input)))
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base64 encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: decodeURIComponent(escape(atob(input)))
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base64 decoding failed'
      };
    }
  }
};

export const base32Algorithms = {
  encode: (input: string): ToolResult => {
    try {
      const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
      const bytes = new TextEncoder().encode(input);
      let output = '';
      let bits = 0;
      let value = 0;

      for (let i = 0; i < bytes.length; i++) {
        value = (value << 8) | bytes[i];
        bits += 8;

        while (bits >= 5) {
          output += base32Chars[(value >> (bits - 5)) & 31];
          bits -= 5;
        }
      }

      if (bits > 0) {
        output += base32Chars[(value << (5 - bits)) & 31];
      }

      // Add padding
      while (output.length % 8 !== 0) {
        output += '=';
      }

      return { success: true, data: output };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base32 encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
      const cleanInput = input.toUpperCase().replace(/=/g, '');
      let bits = 0;
      let value = 0;
      const output: number[] = [];

      for (let i = 0; i < cleanInput.length; i++) {
        const charIndex = base32Chars.indexOf(cleanInput[i]);
        if (charIndex === -1) continue;

        value = (value << 5) | charIndex;
        bits += 5;

        if (bits >= 8) {
          output.push((value >> (bits - 8)) & 255);
          bits -= 8;
        }
      }

      return {
        success: true,
        data: new TextDecoder().decode(new Uint8Array(output))
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base32 decoding failed'
      };
    }
  }
};

export const base16Algorithms = {
  encode: (input: string): ToolResult => {
    try {
      const bytes = new TextEncoder().encode(input);
      const hex = Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      return { success: true, data: hex.toUpperCase() };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Hex encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      const cleanHex = input.replace(/[^0-9a-fA-F]/g, '');
      if (cleanHex.length % 2 !== 0) {
        return { success: false, error: 'Hex string must have even length' };
      }

      const bytes = new Uint8Array(cleanHex.length / 2);
      for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
      }

      return {
        success: true,
        data: new TextDecoder().decode(bytes)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Hex decoding failed'
      };
    }
  }
};

export const base58Algorithms = {
  alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',

  encode: (input: string): ToolResult => {
    try {
      const bytes = new TextEncoder().encode(input);
      let num = 0n;

      for (const byte of bytes) {
        num = num * 256n + BigInt(byte);
      }

      let result = '';
      const alphabet = base58Algorithms.alphabet;

      while (num > 0n) {
        const remainder = num % 58n;
        result = alphabet[Number(remainder)] + result;
        num = num / 58n;
      }

      // Handle leading zeros
      for (const byte of bytes) {
        if (byte === 0) {
          result = alphabet[0] + result;
        } else {
          break;
        }
      }

      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base58 encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      const alphabet = base58Algorithms.alphabet;
      let num = 0n;

      for (const char of input) {
        const index = alphabet.indexOf(char);
        if (index === -1) {
          return { success: false, error: `Invalid Base58 character: ${char}` };
        }
        num = num * 58n + BigInt(index);
      }

      const bytes: number[] = [];
      while (num > 0n) {
        bytes.unshift(Number(num % 256n));
        num = num / 256n;
      }

      // Handle leading ones (which represent zeros)
      for (const char of input) {
        if (char === alphabet[0]) {
          bytes.unshift(0);
        } else {
          break;
        }
      }

      return {
        success: true,
        data: new TextDecoder().decode(new Uint8Array(bytes))
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Base58 decoding failed'
      };
    }
  }
};

export const urlEncoder = {
  encode: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: encodeURIComponent(input)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      return {
        success: true,
        data: decodeURIComponent(input)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL decoding failed'
      };
    }
  }
};

export const htmlEncoder = {
  encode: (input: string): ToolResult => {
    try {
      const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      return { success: true, data: encoded };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HTML encoding failed'
      };
    }
  },

  decode: (input: string): ToolResult => {
    try {
      const decoded = input
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      return { success: true, data: decoded };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'HTML decoding failed'
      };
    }
  }
};