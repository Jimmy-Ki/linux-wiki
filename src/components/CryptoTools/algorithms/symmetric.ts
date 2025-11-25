import CryptoJS from 'crypto-js';
import { ToolResult, EncryptionMode } from '../base/types';

export interface SymmetricCryptoOptions {
  mode?: EncryptionMode;
  padding?: CryptoJS.pad.Any;
  iv?: string;
}

export const symmetricAlgorithms = {
  aes: {
    encrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let encrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            encrypted = CryptoJS.AES.encrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            encrypted = CryptoJS.AES.encrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CFB':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CFB mode' };
            }
            encrypted = CryptoJS.AES.encrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CFB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'OFB':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for OFB mode' };
            }
            encrypted = CryptoJS.AES.encrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.OFB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CTR':
            // Note: crypto-js doesn't have native CTR mode, we'd need to implement it
            return { success: false, error: 'CTR mode not supported by crypto-js' };
          case 'GCM':
            // Note: crypto-js doesn't have native GCM mode
            return { success: false, error: 'GCM mode not supported by crypto-js' };
          default:
            return { success: false, error: `Unsupported mode: ${mode}` };
        }

        return {
          success: true,
          data: encrypted.toString(),
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'AES encryption failed'
        };
      }
    },

    decrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let decrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            decrypted = CryptoJS.AES.decrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            decrypted = CryptoJS.AES.decrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CFB':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CFB mode' };
            }
            decrypted = CryptoJS.AES.decrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CFB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'OFB':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for OFB mode' };
            }
            decrypted = CryptoJS.AES.decrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.OFB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CTR':
            return { success: false, error: 'CTR mode not supported by crypto-js' };
          case 'GCM':
            return { success: false, error: 'GCM mode not supported by crypto-js' };
          default:
            return { success: false, error: `Unsupported mode: ${mode}` };
        }

        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
          return { success: false, error: 'Decryption failed - invalid key or corrupted data' };
        }

        return {
          success: true,
          data: plaintext,
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'AES decryption failed'
        };
      }
    }
  },

  des: {
    encrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let encrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            encrypted = CryptoJS.DES.encrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            encrypted = CryptoJS.DES.encrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          default:
            return { success: false, error: `DES mode ${mode} not implemented` };
        }

        return {
          success: true,
          data: encrypted.toString(),
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'DES encryption failed'
        };
      }
    },

    decrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let decrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            decrypted = CryptoJS.DES.decrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            decrypted = CryptoJS.DES.decrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          default:
            return { success: false, error: `DES mode ${mode} not implemented` };
        }

        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
          return { success: false, error: 'Decryption failed - invalid key or corrupted data' };
        }

        return {
          success: true,
          data: plaintext,
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'DES decryption failed'
        };
      }
    }
  },

  tripleDES: {
    encrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let encrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            encrypted = CryptoJS.TripleDES.encrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            encrypted = CryptoJS.TripleDES.encrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          default:
            return { success: false, error: `TripleDES mode ${mode} not implemented` };
        }

        return {
          success: true,
          data: encrypted.toString(),
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'TripleDES encryption failed'
        };
      }
    },

    decrypt: (input: string, key: string, options?: SymmetricCryptoOptions): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const ivBytes = options?.iv ? CryptoJS.enc.Hex.parse(options.iv) : undefined;

        let decrypted: CryptoJS.lib.CipherParams;
        const mode = options?.mode || 'CBC';

        switch (mode) {
          case 'ECB':
            decrypted = CryptoJS.TripleDES.decrypt(input, keyBytes, {
              mode: CryptoJS.mode.ECB,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          case 'CBC':
            if (!ivBytes) {
              return { success: false, error: 'IV is required for CBC mode' };
            }
            decrypted = CryptoJS.TripleDES.decrypt(input, keyBytes, {
              iv: ivBytes,
              mode: CryptoJS.mode.CBC,
              padding: options?.padding || CryptoJS.pad.Pkcs7
            });
            break;
          default:
            return { success: false, error: `TripleDES mode ${mode} not implemented` };
        }

        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
          return { success: false, error: 'Decryption failed - invalid key or corrupted data' };
        }

        return {
          success: true,
          data: plaintext,
          metadata: { mode }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'TripleDES decryption failed'
        };
      }
    }
  },

  rabbit: {
    encrypt: (input: string, key: string): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.Rabbit.encrypt(input, keyBytes);
        return {
          success: true,
          data: encrypted.toString()
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Rabbit encryption failed'
        };
      }
    },

    decrypt: (input: string, key: string): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const decrypted = CryptoJS.Rabbit.decrypt(input, keyBytes);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
          return { success: false, error: 'Decryption failed - invalid key or corrupted data' };
        }
        return {
          success: true,
          data: plaintext
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Rabbit decryption failed'
        };
      }
    }
  },

  rc4: {
    encrypt: (input: string, key: string): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.RC4.encrypt(input, keyBytes);
        return {
          success: true,
          data: encrypted.toString()
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'RC4 encryption failed'
        };
      }
    },

    decrypt: (input: string, key: string): ToolResult => {
      try {
        const keyBytes = CryptoJS.enc.Utf8.parse(key);
        const decrypted = CryptoJS.RC4.decrypt(input, keyBytes);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
          return { success: false, error: 'Decryption failed - invalid key or corrupted data' };
        }
        return {
          success: true,
          data: plaintext
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'RC4 decryption failed'
        };
      }
    }
  }
};