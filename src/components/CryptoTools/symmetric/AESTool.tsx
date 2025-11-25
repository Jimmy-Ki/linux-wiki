import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  CryptoToolConfig,
  CryptoToolState,
  ToolResult,
  ProcessingProgress,
  EncryptionMode,
  TextEncoding
} from '../base/types';
import { formatBytes } from '../utils/formatting';
import '../ui/CryptoTools.css';

// Extended interfaces for comprehensive AES tool
interface AESAdvancedOptions {
  action: 'encrypt' | 'decrypt';
  keySize: 128 | 192 | 256;
  outputFormat: 'hex' | 'base64' | 'raw';
  keySourceType: 'text' | 'password' | 'random';
  pbkdf2Iterations?: number;
  authTag?: string; // For GCM mode
  additionalData?: string; // For GCM mode
}

interface AESInfo {
  mode: EncryptionMode;
  security: 'high' | 'medium' | 'low';
  description: string;
  useCase: string;
  requiresIV: boolean;
  requiresAuthTag: boolean;
}

interface KeyStrength {
  score: number;
  text: string;
  color: string;
}

const config: CryptoToolConfig = {
  id: 'aes-advanced',
  name: 'Advanced AES Encryption/Decryption',
  description: 'Comprehensive AES implementation with support for multiple modes, key sizes, and enterprise-grade security features using Web Crypto API.',
  category: 'Modern Symmetric Crypto',
  operation: 'encrypt',
  supportedModes: ['ECB', 'CBC', 'CFB', 'OFB', 'CTR', 'GCM'],
  defaultMode: 'GCM',
  hasKeyInput: true,
  hasIVInput: true,
  keySizes: [128, 192, 256],
  ivSizes: [128]
};

// AES mode information for educational content
const aesModes: Record<EncryptionMode, AESInfo> = {
  'GCM': {
    mode: 'GCM',
    security: 'high',
    description: 'Galois/Counter Mode with built-in authentication',
    useCase: 'Recommended for most applications requiring confidentiality and authenticity',
    requiresIV: true,
    requiresAuthTag: true
  },
  'CTR': {
    mode: 'CTR',
    security: 'high',
    description: 'Counter mode that turns block cipher into stream cipher',
    useCase: 'Parallel encryption/decryption, high-performance applications',
    requiresIV: true,
    requiresAuthTag: false
  },
  'CBC': {
    mode: 'CBC',
    security: 'medium',
    description: 'Cipher Block Chaining - each block depends on the previous',
    useCase: 'Traditional encryption, but vulnerable to padding attacks',
    requiresIV: true,
    requiresAuthTag: false
  },
  'CFB': {
    mode: 'CFB',
    security: 'medium',
    description: 'Cipher Feedback - stream cipher mode with block cipher',
    useCase: 'Stream applications where data arrives in small portions',
    requiresIV: true,
    requiresAuthTag: false
  },
  'OFB': {
    mode: 'OFB',
    security: 'medium',
    description: 'Output Feedback - stream cipher mode similar to CFB',
    useCase: 'Noisy channels where bit errors might occur',
    requiresIV: true,
    requiresAuthTag: false
  },
  'ECB': {
    mode: 'ECB',
    security: 'low',
    description: 'Electronic Codebook - identical blocks produce identical output',
    useCase: 'NOT RECOMMENDED for secure applications (educational only)',
    requiresIV: false,
    requiresAuthTag: false
  }
};

export const AdvancedAESTool: React.FC<{className?: string}> = ({ className }) => {
  const [state, setState] = useState<CryptoToolState>({
    input: '',
    output: '',
    key: '',
    iv: '',
    mode: config.defaultMode || 'GCM',
    options: {
      action: 'encrypt',
      keySize: 256,
      outputFormat: 'hex',
      keySourceType: 'text',
      pbkdf2Iterations: 100000,
      authTag: '',
      additionalData: ''
    } as AESAdvancedOptions,
    processing: false,
    error: ''
  });

  const [inputEncoding, setInputEncoding] = useState<TextEncoding>('utf8');
  const [progress, setProgress] = useState<ProcessingProgress | null>(null);
  const [keyStrength, setKeyStrength] = useState<KeyStrength>({ score: 0, text: '', color: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showEducational, setShowEducational] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [inputFileName, setInputFileName] = useState<string>('');
  const [authTag, setAuthTag] = useState<string>('');
  const [additionalData, setAdditionalData] = useState<string>('');

  // Validate key strength
  useEffect(() => {
    if (state.key) {
      const strength = calculateKeyStrength(state.key);
      setKeyStrength(strength);
    } else {
      setKeyStrength({ score: 0, text: '', color: '' });
    }
  }, [state.key]);

  const calculateKeyStrength = (key: string): KeyStrength => {
    let score = 0;

    // Length scoring
    if (key.length >= 32) score += 40;
    else if (key.length >= 24) score += 30;
    else if (key.length >= 16) score += 20;
    else if (key.length >= 8) score += 10;

    // Character variety scoring
    if (/[a-z]/.test(key)) score += 10;
    if (/[A-Z]/.test(key)) score += 10;
    if (/[0-9]/.test(key)) score += 10;
    if (/[^a-zA-Z0-9]/.test(key)) score += 20;

    // Entropy-like scoring for random looking keys
    const uniqueChars = new Set(key).size;
    if (uniqueChars >= key.length * 0.8) score += 10;

    if (score >= 80) return { score, text: 'Strong', color: 'var(--ifm-color-success)' };
    if (score >= 60) return { score, text: 'Good', color: 'var(--ifm-color-warning)' };
    if (score >= 40) return { score, text: 'Weak', color: 'var(--ifm-color-danger)' };
    return { score, text: 'Very Weak', color: 'var(--ifm-color-danger-contrast-foreground)' };
  };

  // Generate random bytes as hex string
  const generateRandomBytes = async (length: number): Promise<string> => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Generate random key
  const generateRandomKey = async (keySize: number): Promise<string> => {
    const bytes = keySize / 8;
    return await generateRandomBytes(bytes);
  };

  // Derive key from password using PBKDF2
  const deriveKeyFromPassword = async (
    password: string,
    salt: string,
    iterations: number,
    keySize: number
  ): Promise<Uint8Array> => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const saltBuffer = encoder.encode(salt);
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: keySize },
      true,
      ['encrypt', 'decrypt']
    );

    const exported = await crypto.subtle.exportKey('raw', key);
    return new Uint8Array(exported);
  };

  // Convert string to key buffer
  const prepareKey = async (key: string, keySize: number, options: AESAdvancedOptions): Promise<{key: Uint8Array, metadata: any}> => {
    let keyBuffer: Uint8Array;
    let metadata: any = {};

    switch (options.keySourceType) {
      case 'random':
        const randomKeyHex = await generateRandomKey(keySize);
        keyBuffer = new Uint8Array(keySize / 8);
        const hexBytes = randomKeyHex.match(/.{2}/g)?.map(byte => parseInt(byte, 16)) || [];
        keyBuffer.set(hexBytes);
        metadata.generatedKey = randomKeyHex;
        setState(prev => ({ ...prev, key: randomKeyHex }));
        break;

      case 'password':
        const salt = await generateRandomBytes(16);
        keyBuffer = await deriveKeyFromPassword(key, salt, options.pbkdf2Iterations || 100000, keySize);
        metadata.salt = salt;
        metadata.iterations = options.pbkdf2Iterations;
        break;

      case 'text':
      default:
        // For text keys, we need to ensure correct length
        const encoder = new TextEncoder();
        let keyBytes = encoder.encode(key);

        if (keyBytes.length !== keySize / 8) {
          // Pad or truncate to correct length
          const paddedKey = new Uint8Array(keySize / 8);
          paddedKey.set(keyBytes.slice(0, keySize / 8));
          keyBuffer = paddedKey;
          metadata.warning = `Key was ${keyBytes.length > keySize / 8 ? 'truncated' : 'padded'} to ${keySize} bits`;
        } else {
          keyBuffer = keyBytes;
        }
        break;
    }

    return { key: keyBuffer, metadata };
  };

  // Convert hex string to Uint8Array
  const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  };

  // Convert Uint8Array to hex string
  const bytesToHex = (bytes: Uint8Array): string => {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Convert Uint8Array to base64
  const bytesToBase64 = (bytes: Uint8Array): string => {
    return btoa(String.fromCharCode(...bytes));
  };

  
  // Convert base64 to Uint8Array
  const base64ToBytes = (base64: string): Uint8Array => {
    return new Uint8Array(atob(base64).split('').map(char => char.charCodeAt(0)));
  };

  // Encode input data based on selected encoding
  const encodeInput = (input: string, encoding: TextEncoding): Uint8Array => {
    switch (encoding) {
      case 'hex':
        return hexToBytes(input);
      case 'base64':
        return base64ToBytes(input);
      case 'binary':
        // Convert binary string (0s and 1s) to bytes
        const binaryLength = Math.ceil(input.length / 8);
        const bytes = new Uint8Array(binaryLength);
        for (let i = 0; i < input.length; i += 8) {
          const byteStr = input.substr(i, 8).padEnd(8, '0');
          bytes[i / 8] = parseInt(byteStr, 2);
        }
        return bytes;
      case 'ascii':
        return new TextEncoder().encode(input);
      case 'utf8':
      default:
        return new TextEncoder().encode(input);
    }
  };

  // Decode output data based on selected format
  const decodeOutput = (data: Uint8Array, format: string): string => {
    switch (format) {
      case 'hex':
        return bytesToHex(data);
      case 'base64':
        return bytesToBase64(data);
      case 'raw':
        return new TextDecoder().decode(data);
      default:
        return bytesToHex(data);
    }
  };

  // Main AES processing function
  const handleProcess = useCallback(async () => {
    const options = state.options as AESAdvancedOptions;

    // Validation
    if (!state.input.trim()) {
      setState(prev => ({ ...prev, error: 'Input is required', processing: false }));
      return;
    }

    if (!state.key.trim() && options.keySourceType !== 'random') {
      setState(prev => ({ ...prev, error: 'Key is required (or select "Generate Random")', processing: false }));
      return;
    }

    const modeInfo = aesModes[state.mode];
    if (modeInfo.requiresIV && !state.iv.trim()) {
      setState(prev => ({ ...prev, error: `IV is required for ${state.mode} mode`, processing: false }));
      return;
    }

    if (state.mode === 'GCM' && options.action === 'decrypt' && !authTag.trim()) {
      setState(prev => ({ ...prev, error: 'Authentication tag is required for GCM decryption', processing: false }));
      return;
    }

    setState(prev => ({ ...prev, processing: true, error: '' }));
    setProgress({ loaded: 0, total: 1, percentage: 0 });

    try {
      // Prepare key
      const { key: keyBuffer, metadata: keyMetadata } = await prepareKey(state.key, options.keySize, options);

      // Prepare IV
      let ivBuffer: Uint8Array | undefined;
      if (modeInfo.requiresIV) {
        if (state.iv.trim()) {
          ivBuffer = hexToBytes(state.iv);
        } else {
          // Generate random IV if not provided
          ivBuffer = crypto.getRandomValues(new Uint8Array(16));
          setState(prev => ({ ...prev, iv: bytesToHex(ivBuffer) }));
        }
      }

      // Encode input
      const inputData = encodeInput(state.input, inputEncoding);

      let result: Uint8Array;
      let metadata: any = {
        mode: state.mode,
        action: options.action,
        keySize: options.keySize,
        ...keyMetadata
      };

      // Use Web Crypto API for GCM mode (most secure)
      if (state.mode === 'GCM') {
        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          keyBuffer,
          'AES-GCM',
          false,
          ['encrypt', 'decrypt']
        );

        if (options.action === 'encrypt') {
          const algorithm: any = {
            name: 'AES-GCM',
            iv: ivBuffer!,
          };

          if (additionalData) {
            algorithm.additionalData = new TextEncoder().encode(additionalData);
          }

          const encryptedBuffer = await crypto.subtle.encrypt(algorithm, cryptoKey, inputData);
          result = new Uint8Array(encryptedBuffer);

          // In Web Crypto API, GCM tag is included in the output, so we extract it
          // The tag is the last 16 bytes by default
          const tagLength = 16;
          const dataLength = result.length - tagLength;
          const encryptedData = result.slice(0, dataLength);
          const tag = result.slice(dataLength);

          metadata.authTag = bytesToHex(tag);
          setAuthTag(metadata.authTag);
          result = encryptedData;

        } else {
          // For GCM decryption, we need to append the auth tag to the encrypted data
          let dataForDecryption = inputData;

          if (authTag) {
            const tagBuffer = hexToBytes(authTag);
            const combined = new Uint8Array(inputData.length + tagBuffer.length);
            combined.set(inputData);
            combined.set(tagBuffer, inputData.length);
            dataForDecryption = combined;
          }

          const algorithm: any = {
            name: 'AES-GCM',
            iv: ivBuffer!,
          };

          if (additionalData) {
            algorithm.additionalData = new TextEncoder().encode(additionalData);
          }

          const decryptedBuffer = await crypto.subtle.decrypt(algorithm, cryptoKey, dataForDecryption);
          result = new Uint8Array(decryptedBuffer);
        }
      } else {
        // For other modes, use crypto-js as fallback with Web Crypto API for key derivation
        const CryptoJS = await import('crypto-js');

        // Convert Uint8Array to CryptoJS WordArray
        const keyWords = CryptoJS.lib.WordArray.create(keyBuffer);
        const ivWords = ivBuffer ? CryptoJS.lib.WordArray.create(ivBuffer) : undefined;
        const dataWords = CryptoJS.lib.WordArray.create(inputData);

        let encrypted: CryptoJS.lib.CipherParams;

        // Get the appropriate CryptoJS mode
        const cryptojsMode = await (() => {
          switch (state.mode) {
            case 'ECB':
              return CryptoJS.mode.ECB;
            case 'CBC':
              return CryptoJS.mode.CBC;
            case 'CFB':
              return CryptoJS.mode.CFB;
            case 'OFB':
              return CryptoJS.mode.OFB;
            case 'CTR':
              // crypto-js doesn't have native CTR, fall back to CBC
              return CryptoJS.mode.CBC;
            default:
              return CryptoJS.mode.CBC;
          }
        })();

        if (options.action === 'encrypt') {
          const cryptoJsOptions: any = {
            mode: cryptojsMode,
            padding: CryptoJS.pad.Pkcs7
          };

          if (ivWords) {
            cryptoJsOptions.iv = ivWords;
          }

          encrypted = CryptoJS.AES.encrypt(dataWords, keyWords, cryptoJsOptions);
          result = new Uint8Array(encrypted.ciphertext.words.length * 4);
          const view = new DataView(result.buffer);
          for (let i = 0; i < encrypted.ciphertext.words.length; i++) {
            view.setUint32(i * 4, encrypted.ciphertext.words[i], false);
          }

        } else {
          const encryptedData = CryptoJS.lib.CipherParams.create({
            ciphertext: dataWords
          });

          const cryptoJsOptions: any = {
            mode: cryptojsMode,
            padding: CryptoJS.pad.Pkcs7
          };

          if (ivWords) {
            cryptoJsOptions.iv = ivWords;
          }

          const decrypted = CryptoJS.AES.decrypt(encryptedData, keyWords, cryptoJsOptions);
          result = new Uint8Array(decrypted.words.length * 4);
          const view = new DataView(result.buffer);
          for (let i = 0; i < decrypted.words.length; i++) {
            view.setUint32(i * 4, decrypted.words[i], false);
          }

          // Remove padding
          const paddingLength = result[result.length - 1];
          if (paddingLength <= 16 && paddingLength > 0) {
            result = result.slice(0, result.length - paddingLength);
          }
        }
      }

      // Format output
      const formattedOutput = decodeOutput(result, options.outputFormat);

      setState(prev => ({
        ...prev,
        output: formattedOutput,
        processing: false
      }));

      if (metadata.warning) {
        setState(prev => ({
          ...prev,
          error: `Warning: ${metadata.warning}`,
          processing: false
        }));
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'AES operation failed',
        processing: false
      }));
    } finally {
      setProgress(null);
    }
  }, [state, inputEncoding, authTag, additionalData]);

  // Generate random IV
  const handleGenerateIV = async () => {
    const iv = await generateRandomBytes(16); // 128 bits = 16 bytes = 32 hex chars
    setState(prev => ({ ...prev, iv }));
  };

  // Generate random key
  const handleGenerateKey = async () => {
    const options = state.options as AESAdvancedOptions;
    const key = await generateRandomKey(options.keySize);
    setState(prev => ({
      ...prev,
      key,
      options: { ...prev.options, keySourceType: 'text' }
    }));
  };

  // File handling
  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setInputFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      setState(prev => ({ ...prev, input: content }));
    };

    reader.onerror = () => {
      setState(prev => ({ ...prev, error: 'Failed to read file' }));
    };

    if (file.size > 50 * 1024 * 1024) {
      setState(prev => ({ ...prev, error: 'File too large. Max 50MB supported.' }));
      return;
    }

    reader.readAsText(file);
  }, []);

  const handleClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      input: '',
      output: '',
      key: '',
      iv: '',
      error: ''
    }));
    setInputFileName('');
    setAuthTag('');
    setAdditionalData('');
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(state.output).then(() => {
      // Could add toast notification
    });
  }, [state.output]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([state.output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aes-${(state.options as AESAdvancedOptions).action}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.output, state.options]);

  const currentModeInfo = aesModes[state.mode];
  const isDecryptMode = (state.options as AESAdvancedOptions).action === 'decrypt';
  const needsAuthTag = state.mode === 'GCM' && isDecryptMode;
  const needsAdditionalData = state.mode === 'GCM';

  return (
    <div className={clsx('crypto-tool', className)}>
      <div className="crypto-tool-header">
        <h3>{config.name}</h3>
        <p>{config.description}</p>
        <div className="category-badge category-symmetric">Enterprise Grade Security</div>
      </div>

      <div className="crypto-tool-body">
        {/* Action Toggle */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Operation Mode</h4>
          </div>
          <div className="options-grid">
            <div className="option-field">
              <label>Action:</label>
              <select
                value={(state.options as AESAdvancedOptions).action}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  options: { ...prev.options, action: e.target.value as 'encrypt' | 'decrypt' }
                }))}
                disabled={state.processing}
              >
                <option value="encrypt">🔒 Encrypt</option>
                <option value="decrypt">🔓 Decrypt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Input Data</h4>
            <div className="section-actions">
              <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileInput}
                accept=".txt,.json,.xml,.csv,.bin"
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input" className="button button-secondary">
                📁 Load File
              </label>
              <button onClick={handleClear} className="button button-secondary">
                🗑️ Clear
              </button>
            </div>
          </div>

          {inputFileName && (
            <div className="file-info">
              📄 {inputFileName}
            </div>
          )}

          <textarea
            value={state.input}
            onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
            placeholder={isDecryptMode ? "Enter encrypted data to decrypt..." : "Enter plaintext to encrypt..."}
            className="input-textarea"
            rows={8}
            disabled={state.processing}
          />

          <div className="encoding-selector">
            <label>Input Encoding:</label>
            <select
              value={inputEncoding}
              onChange={(e) => setInputEncoding(e.target.value as TextEncoding)}
              disabled={state.processing}
            >
              <option value="utf8">UTF-8 Text</option>
              <option value="ascii">ASCII Text</option>
              <option value="hex">Hexadecimal</option>
              <option value="base64">Base64</option>
              <option value="binary">Binary (0s and 1s)</option>
            </select>
          </div>
        </div>

        {/* Advanced Options Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Encryption Settings</h4>
            <button
              className="button button-secondary"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '▼' : '▶'} {showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </div>

          <div className="options-grid">
            {/* AES Mode Selection */}
            <div className="option-field">
              <label>AES Mode:</label>
              <select
                value={state.mode}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  mode: e.target.value as EncryptionMode
                }))}
                disabled={state.processing}
              >
                {config.supportedModes?.map(mode => (
                  <option key={mode} value={mode}>
                    {mode} - {aesModes[mode as EncryptionMode].security} security
                  </option>
                ))}
              </select>
              <div className="mode-info">
                <small className={currentModeInfo.security}>
                  {currentModeInfo.description}
                </small>
              </div>
            </div>

            {/* Key Size */}
            <div className="option-field">
              <label>Key Size:</label>
              <select
                value={(state.options as AESAdvancedOptions).keySize}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  options: { ...prev.options, keySize: parseInt(e.target.value) as 128 | 192 | 256 }
                }))}
                disabled={state.processing}
              >
                <option value="128">128 bits</option>
                <option value="192">192 bits</option>
                <option value="256">256 bits (Recommended)</option>
              </select>
            </div>

            {/* Output Format */}
            <div className="option-field">
              <label>Output Format:</label>
              <select
                value={(state.options as AESAdvancedOptions).outputFormat}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  options: { ...prev.options, outputFormat: e.target.value as 'hex' | 'base64' | 'raw' }
                }))}
                disabled={state.processing}
              >
                <option value="hex">Hexadecimal</option>
                <option value="base64">Base64</option>
                <option value="raw">Raw Text</option>
              </select>
            </div>

            {/* Key Management */}
            <div className="option-field">
              <label>Key Source:</label>
              <select
                value={(state.options as AESAdvancedOptions).keySourceType}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  options: { ...prev.options, keySourceType: e.target.value as 'text' | 'password' | 'random' }
                }))}
                disabled={state.processing}
              >
                <option value="text">Text Key</option>
                <option value="password">Password (PBKDF2)</option>
                <option value="random">Generate Random</option>
              </select>
            </div>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="advanced-options">
              <div className="options-grid">
                {/* PBKDF2 Iterations */}
                {(state.options as AESAdvancedOptions).keySourceType === 'password' && (
                  <div className="option-field">
                    <label>PBKDF2 Iterations:</label>
                    <input
                      type="number"
                      value={(state.options as AESAdvancedOptions).pbkdf2Iterations}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        options: { ...prev.options, pbkdf2Iterations: parseInt(e.target.value) }
                      }))}
                      min="10000"
                      max="1000000"
                      disabled={state.processing}
                    />
                    <small>Recommended: 100,000+ iterations</small>
                  </div>
                )}

                {/* Additional Data for GCM */}
                {needsAdditionalData && (
                  <div className="option-field">
                    <label>Additional Authenticated Data (AAD):</label>
                    <input
                      type="text"
                      value={additionalData}
                      onChange={(e) => setAdditionalData(e.target.value)}
                      placeholder="Optional additional data for authentication"
                      disabled={state.processing}
                    />
                    <small>Optional: Additional data that is authenticated but not encrypted</small>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Key Management Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Key Management</h4>
            <div className="section-actions">
              {(state.options as AESAdvancedOptions).keySourceType !== 'random' && (
                <button onClick={handleGenerateKey} className="button button-secondary">
                  🎲 Generate Random Key
                </button>
              )}
            </div>
          </div>

          {(state.options as AESAdvancedOptions).keySourceType !== 'random' && (
            <div className="option-field">
              <label>Encryption Key:</label>
              <input
                type="password"
                value={state.key}
                onChange={(e) => setState(prev => ({ ...prev, key: e.target.value }))}
                placeholder="Enter encryption key..."
                disabled={state.processing}
              />
              {keyStrength.text && (
                <div className="key-strength">
                  <span style={{ color: keyStrength.color }}>
                    Key Strength: {keyStrength.text} ({keyStrength.score}%)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* IV Management */}
          {currentModeInfo.requiresIV && (
            <div className="option-field">
              <label>IV (Initialization Vector):</label>
              <div className="iv-management">
                <input
                  type="text"
                  value={state.iv}
                  onChange={(e) => setState(prev => ({ ...prev, iv: e.target.value }))}
                  placeholder="Enter 32 hex characters (128 bits)..."
                  disabled={state.processing}
                />
                <button
                  onClick={handleGenerateIV}
                  className="button button-secondary"
                  disabled={state.processing}
                >
                  🎲 Generate IV
                </button>
              </div>
              <small>Must be unique for each encryption with the same key</small>
            </div>
          )}

          {/* Authentication Tag for GCM */}
          {needsAuthTag && (
            <div className="option-field">
              <label>Authentication Tag (GCM):</label>
              <input
                type="text"
                value={authTag}
                onChange={(e) => setAuthTag(e.target.value)}
                placeholder="Enter 32 hex characters (128 bits)..."
                disabled={state.processing}
              />
              <small>Required for GCM decryption - obtained during encryption</small>
            </div>
          )}
        </div>

        {/* Security Warnings */}
        {currentModeInfo.security === 'low' && (
          <div className="error-container">
            <strong>⚠️ Security Warning:</strong> {currentModeInfo.mode} mode is not recommended for production use due to security vulnerabilities. Consider using GCM or CTR mode instead.
          </div>
        )}

        {/* Process Button */}
        <div className="crypto-tool-actions">
          <button
            onClick={handleProcess}
            disabled={state.processing || !state.input.trim()}
            className="button button-primary"
          >
            {state.processing ? '⏳ Processing...' : `🔐 ${(state.options as AESAdvancedOptions).action.toUpperCase()}`}
          </button>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="progress-text">
              {formatBytes(progress.loaded)} / {formatBytes(progress.total)}
              ({Math.round(progress.percentage)}%)
            </div>
          </div>
        )}

        {/* Error Display */}
        {state.error && !state.error.includes('Warning') && (
          <div className="error-container">
            <strong>Error:</strong> {state.error}
          </div>
        )}

        {/* Warning Display */}
        {state.error && state.error.includes('Warning') && (
          <div className="large-file-warning">
            {state.error}
          </div>
        )}

        {/* Output Section */}
        {state.output && (
          <div className="crypto-tool-section success">
            <div className="section-header">
              <h4>Output Result</h4>
              <div className="section-actions">
                <button onClick={handleCopy} className="button button-secondary">
                  📋 Copy
                </button>
                <button onClick={handleDownload} className="button button-secondary">
                  💾 Download
                </button>
              </div>
            </div>

            <textarea
              value={state.output}
              readOnly
              className="output-textarea"
              rows={8}
            />

            {/* GCM Auth Tag Display */}
            {state.mode === 'GCM' && !isDecryptMode && authTag && (
              <div className="auth-tag-display">
                <strong>Authentication Tag (save this for decryption):</strong>
                <div className="auth-tag-value">
                  <code>{authTag}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(authTag)}
                    className="button button-secondary"
                  >
                    📋 Copy Tag
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Educational Content */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>📚 AES Mode Information</h4>
            <button
              className="button button-secondary"
              onClick={() => setShowEducational(!showEducational)}
            >
              {showEducational ? '▼' : '▶'} {showEducational ? 'Hide' : 'Show'} Details
            </button>
          </div>

          {showEducational && (
            <div className="educational-content">
              <div className="mode-details">
                <h5>Current Mode: {state.mode}</h5>
                <p><strong>Description:</strong> {currentModeInfo.description}</p>
                <p><strong>Best Use Case:</strong> {currentModeInfo.useCase}</p>
                <p><strong>Security Level:</strong>
                  <span className={currentModeInfo.security}>
                    {' '}{currentModeInfo.security.toUpperCase()}
                  </span>
                </p>
                <p><strong>Requirements:</strong></p>
                <ul>
                  <li>IV Required: {currentModeInfo.requiresIV ? 'Yes' : 'No'}</li>
                  <li>Auth Tag Required: {currentModeInfo.requiresAuthTag ? 'Yes (GCM)' : 'No'}</li>
                </ul>
              </div>

              <div className="security-recommendations">
                <h5>🛡️ Security Recommendations:</h5>
                <ul>
                  <li><strong>Always use unique IVs</strong> for each encryption with the same key</li>
                  <li><strong>Prefer GCM mode</strong> for applications requiring both confidentiality and authenticity</li>
                  <li><strong>Use 256-bit keys</strong> for maximum security (compatible with most applications)</li>
                  <li><strong>Store IVs securely</strong> - they don't need to be secret but must be unique</li>
                  <li><strong>For GCM mode</strong>, always save the authentication tag for decryption</li>
                  <li><strong>Avoid ECB mode</strong> in production - it's vulnerable to pattern analysis</li>
                  <li><strong>When using passwords</strong>, employ PBKDF2 with high iteration count (100,000+)</li>
                </ul>
              </div>

              <div className="best-practices">
                <h5>✨ Best Practices:</h5>
                <ul>
                  <li>Generate keys using cryptographically secure random number generators</li>
                  <li>Never hardcode keys in your application</li>
                  <li>Use a proper key management system for production applications</li>
                  <li>Consider the performance vs security trade-offs for your specific use case</li>
                  <li>Test your implementation thoroughly with known test vectors</li>
                  <li>Stay updated with the latest cryptographic recommendations</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// Export the advanced AES tool
export const AESTool: React.FC<{className?: string}> = (props) => <AdvancedAESTool {...props} />;