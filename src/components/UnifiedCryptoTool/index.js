import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// Import crypto functions
import CryptoJS from 'crypto-js';

export default function UnifiedCryptoTool() {
  const [mode, setMode] = useState('encode');
  const [algorithm, setAlgorithm] = useState('base64');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shiftAmount, setShiftAmount] = useState(13);
  const [key, setKey] = useState('');

  // Process text whenever inputs change
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      let result = '';

      switch (algorithm) {
        // Base64 variants
        case 'base64':
          result = mode === 'encode'
            ? btoa(unescape(encodeURIComponent(inputText)))
            : decodeURIComponent(escape(atob(inputText)));
          break;

        case 'base64url':
          result = mode === 'encode'
            ? btoa(unescape(encodeURIComponent(inputText)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '')
            : decodeURIComponent(escape(atob(inputText + '='.repeat((4 - inputText.length % 4) % 4))));
          break;

        // Hex
        case 'hex':
          result = mode === 'encode'
            ? Array.from(new TextEncoder().encode(inputText))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')
                .toUpperCase()
                .match(/.{1,4}/g)
                ?.join(' ') || ''
            : decodeURIComponent(escape(atob(inputText.replace(/\s/g, ''))));
          break;

        // URL Encoding
        case 'url':
          result = mode === 'encode'
            ? encodeURIComponent(inputText)
            : decodeURIComponent(inputText);
          break;

        // Hash functions (only encode mode)
        case 'md5':
          result = CryptoJS.MD5(inputText).toString();
          break;
        case 'sha1':
          result = CryptoJS.SHA1(inputText).toString();
          break;
        case 'sha256':
          result = CryptoJS.SHA256(inputText).toString();
          break;
        case 'sha512':
          result = CryptoJS.SHA512(inputText).toString();
          break;

        // Classical ciphers
        case 'caesar':
          result = caesarCipher(inputText, mode === 'encode' ? shiftAmount : -shiftAmount);
          break;
        case 'rot13':
          result = caesarCipher(inputText, 13);
          break;
        case 'rot47':
          result = rot47(inputText);
          break;
        case 'atbash':
          result = atbashCipher(inputText);
          break;

        // AES (simplified - for demo)
        case 'aes':
          if (key) {
            result = mode === 'encode'
              ? CryptoJS.AES.encrypt(inputText, key).toString()
              : CryptoJS.AES.decrypt(inputText, key).toString(CryptoJS.enc.Utf8);
          }
          break;

        // Binary
        case 'binary':
          result = mode === 'encode'
            ? inputText.split('').map(char =>
                char.charCodeAt(0).toString(2).padStart(8, '0')
              ).join(' ')
            : inputText.split(' ').map(binary =>
                String.fromCharCode(parseInt(binary, 2))
              ).join('');
          break;

        // Morse Code
        case 'morse':
          result = mode === 'encode' ? textToMorse(inputText) : morseToText(inputText);
          break;

        default:
          result = 'Algorithm not implemented';
      }

      setOutputText(result);
    } catch (error) {
      setOutputText(`Error: ${error.message}`);
    }
  }, [inputText, mode, algorithm, shiftAmount, key]);

  // Helper functions
  function caesarCipher(text, shift) {
    return text.replace(/[a-zA-Z]/g, char => {
      const code = char.charCodeAt(0);
      const base = code < 97 ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });
  }

  function rot47(text) {
    return text.replace(/[!-~]/g, char =>
      String.fromCharCode(33 + ((char.charCodeAt(0) - 33 + 47) % 94))
    );
  }

  function atbashCipher(text) {
    return text.replace(/[a-zA-Z]/g, char => {
      const code = char.charCodeAt(0);
      const base = code < 97 ? 65 : 97;
      return String.fromCharCode(25 - (code - base) + base);
    });
  }

  function textToMorse(text) {
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', ' ': '/'
    };
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
  }

  function morseToText(morse) {
    const textCode = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
      '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9', '/': ' '
    };
    return morse.split(' ').map(code => textCode[code] || '?').join('');
  }

  function swapTexts() {
    setInputText(outputText);
    setOutputText(inputText);
  }

  function clearAll() {
    setInputText('');
    setOutputText('');
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Encryption & Decryption Tools</h1>
          <p>All operations are performed locally in your browser. No data is sent to any server.</p>
        </div>

        {/* Input Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{mode === 'encode' ? 'Plaintext' : 'Ciphertext'}</h2>
            <div className={styles.textInfo}>
              <span>{inputText.length} characters</span>
              <button onClick={swapTexts} className={styles.swapButton}>
                ↓ Swap ↑
              </button>
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode or hash...' : 'Enter text to decode...'}
            className={styles.textArea}
          />
        </div>

        {/* Control Panel */}
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Mode:</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="encode"
                  checked={mode === 'encode'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Encode / Hash
              </label>
              <label>
                <input
                  type="radio"
                  value="decode"
                  checked={mode === 'decode'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Decode
              </label>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className={styles.select}
            >
              <option value="base64">Base64</option>
              <option value="base64url">Base64 URL Safe</option>
              <option value="hex">Hexadecimal</option>
              <option value="url">URL Encoding</option>
              <option value="binary">Binary</option>
              <option value="morse">Morse Code</option>
              <option disabled>─ Hash Functions (Encode Only) ─</option>
              <option value="md5">MD5</option>
              <option value="sha1">SHA-1</option>
              <option value="sha256">SHA-256</option>
              <option value="sha512">SHA-512</option>
              <option disabled>─ Classical Ciphers ─</option>
              <option value="caesar">Caesar Cipher</option>
              <option value="rot13">ROT13</option>
              <option value="rot47">ROT47</option>
              <option value="atbash">Atbash Cipher</option>
              <option disabled>─ Modern Encryption ─</option>
              <option value="aes">AES (Simple Demo)</option>
            </select>
          </div>

          {/* Caesar Cipher Parameters */}
          {algorithm === 'caesar' && (
            <div className={styles.controlGroup}>
              <label>Shift Amount:</label>
              <input
                type="number"
                value={shiftAmount}
                onChange={(e) => setShiftAmount(parseInt(e.target.value) || 0)}
                min="1"
                max="25"
                className={styles.numberInput}
              />
            </div>
          )}

          {/* AES Key */}
          {algorithm === 'aes' && (
            <div className={styles.controlGroup}>
              <label>Key:</label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter encryption key..."
                className={styles.textInput}
              />
            </div>
          )}

          <button onClick={clearAll} className={styles.clearButton}>
            Clear All
          </button>
        </div>

        {/* Output Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>{mode === 'encode' ? 'Ciphertext / Hash' : 'Plaintext'}</h2>
            <div className={styles.textInfo}>
              <span>{outputText.length} characters</span>
              <button
                onClick={() => navigator.clipboard.writeText(outputText)}
                disabled={!outputText}
                className={styles.copyButton}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            className={styles.textArea}
          />
        </div>
      </div>
    </div>
  );
}