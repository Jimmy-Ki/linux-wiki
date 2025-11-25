import React, { useState, useCallback } from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import '../ui/CryptoTools.css';

// Alphabet definitions
const ALPHABETS = {
  english: {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz'
  },
  russian: {
    uppercase: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
    lowercase: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
  }
};

// Frequency analysis for English letters (frequency in %)
const ENGLISH_FREQUENCIES: Record<string, number> = {
  'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0, 'N': 6.7,
  'S': 6.3, 'H': 6.1, 'R': 6.0, 'D': 4.3, 'L': 4.0, 'U': 2.8,
  'C': 2.8, 'M': 2.4, 'W': 2.4, 'F': 2.2, 'G': 2.0, 'Y': 2.0,
  'P': 1.9, 'B': 1.3, 'V': 1.0, 'K': 0.8, 'J': 0.15, 'X': 0.15,
  'Q': 0.10, 'Z': 0.07
};

const config: CryptoToolConfig = {
  id: 'caesar-cipher',
  name: 'Caesar Cipher',
  description: 'A comprehensive Caesar cipher tool with brute force attacks and frequency analysis.',
  category: 'Classical Ciphers',
  operation: 'encrypt'
};

interface BruteForceResult {
  shift: number;
  result: string;
  score: number;
}

interface FrequencyAnalysis {
  letter: string;
  count: number;
  percentage: number;
}

const CaesarCipherTool: React.FC = () => {
  const [localShift, setLocalShift] = useState(3);
  const [localAction, setLocalAction] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [localAlphabet, setLocalAlphabet] = useState<'english' | 'russian'>('english');
  const [localPreserveCase, setLocalPreserveCase] = useState(true);
  const [localPreserveNonAlpha, setLocalPreserveNonAlpha] = useState(true);

  // Caesar cipher implementation
  const caesarCipher = useCallback((text: string, shiftAmount: number, encryptMode: boolean = true, alphabet: string = 'english', preserveCase: boolean = true, preserveNonAlpha: boolean = true): string => {
    const currentAlphabet = ALPHABETS[alphabet as keyof typeof ALPHABETS];

    const actualShift = encryptMode ? shiftAmount : -shiftAmount;

    return text.split('').map(char => {
      // Handle uppercase letters
      if (currentAlphabet.uppercase.includes(char)) {
        const index = currentAlphabet.uppercase.indexOf(char);
        const newIndex = (index + actualShift + currentAlphabet.uppercase.length) % currentAlphabet.uppercase.length;
        return preserveCase ? currentAlphabet.uppercase[newIndex] : currentAlphabet.lowercase[newIndex];
      }
      // Handle lowercase letters
      else if (currentAlphabet.lowercase.includes(char)) {
        const index = currentAlphabet.lowercase.indexOf(char);
        const newIndex = (index + actualShift + currentAlphabet.lowercase.length) % currentAlphabet.lowercase.length;
        return currentAlphabet.lowercase[newIndex];
      }
      // Handle non-alphabetic characters
      else if (preserveNonAlpha) {
        return char;
      }
      else {
        return ''; // Remove non-alphabetic characters
      }
    }).join('');
  }, []);

  // Brute force attack
  const bruteForceAttack = useCallback((text: string, alphabet: string = 'english'): BruteForceResult[] => {
    const currentAlphabet = ALPHABETS[alphabet as keyof typeof ALPHABETS];
    const alphabetSize = currentAlphabet.uppercase.length;
    const results: BruteForceResult[] = [];

    for (let testShift = 1; testShift < alphabetSize; testShift++) {
      const decrypted = caesarCipher(text, testShift, false, alphabet, true, true);

      // Simple scoring based on English letter frequencies
      let score = 0;
      if (alphabet === 'english') {
        const upperDecrypted = decrypted.toUpperCase();
        Object.entries(ENGLISH_FREQUENCIES).forEach(([letter, freq]) => {
          const count = (upperDecrypted.match(new RegExp(letter, 'g')) || []).length;
          score += count * freq;
        });
        score = score / decrypted.length * 100; // Normalize to percentage
      }

      results.push({
        shift: testShift,
        result: decrypted,
        score: Math.round(score * 100) / 100
      });
    }

    return results.sort((a, b) => b.score - a.score);
  }, [caesarCipher]);

  // Main processing function
  const handleProcess = useCallback(async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    try {
      // Parse options with fallbacks
      const currentShift = options?.shift ? parseInt(options.shift) : localShift;
      const currentAction = options?.action || localAction;
      const currentAlphabet = options?.alphabet || localAlphabet;
      const currentPreserveCase = options?.preserveCase !== undefined ? options.preserveCase : localPreserveCase;
      const currentPreserveNonAlpha = options?.preserveNonAlpha !== undefined ? options.preserveNonAlpha : localPreserveNonAlpha;

      if (isNaN(currentShift) || currentShift < 1) {
        return {
          success: false,
          error: 'Shift must be a positive number'
        };
      }

      const currentAlphabetChars = ALPHABETS[currentAlphabet as keyof typeof ALPHABETS].uppercase;
      if (currentShift >= currentAlphabetChars.length) {
        return {
          success: false,
          error: `Shift must be less than ${currentAlphabetChars.length} (alphabet size)`
        };
      }

      const result = caesarCipher(input, currentShift, currentAction === 'encrypt', currentAlphabet, currentPreserveCase, currentPreserveNonAlpha);

      // Generate frequency analysis for the result
      const frequencies: FrequencyAnalysis[] = [];
      if (currentAlphabet === 'english' && currentAction === 'decrypt') {
        const letterCount: Record<string, number> = {};
        const total = result.replace(/[^A-Za-z]/g, '').length;

        result.toUpperCase().split('').forEach(char => {
          if (/[A-Z]/.test(char)) {
            letterCount[char] = (letterCount[char] || 0) + 1;
          }
        });

        Object.entries(letterCount).forEach(([letter, count]) => {
          frequencies.push({
            letter,
            count,
            percentage: Math.round((count / total) * 10000) / 100
          });
        });
      }

      // Generate brute force results if decrypting
      const bruteForceResults = currentAction === 'decrypt' ? bruteForceAttack(input, currentAlphabet) : [];

      return {
        success: true,
        data: result,
        metadata: {
          shift: currentShift,
          action: currentAction,
          alphabet: currentAlphabet,
          preserveCase: currentPreserveCase,
          preserveNonAlpha: currentPreserveNonAlpha,
          frequencyAnalysis: frequencies,
          bruteForceResults: bruteForceResults.slice(0, 10), // Top 10 results
          suggestedShift: bruteForceResults[0]?.shift || 0,
          alphabetSize: currentAlphabetChars.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Caesar cipher operation failed'
      };
    }
  }, [localShift, localAction, localAlphabet, localPreserveCase, localPreserveNonAlpha, caesarCipher, bruteForceAttack]);

  return (
    <div className="caesar-cipher-tool">
      <CryptoTool
        config={{
          ...config,
          operation: localAction
        }}
        onProcess={handleProcess}
      />

      {/* Additional UI for Caesar-specific options */}
      <div className="caesar-custom-options" style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
        <h4>Caesar Cipher Options</h4>
        <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label>Action:</label>
            <select
              value={localAction}
              onChange={(e) => setLocalAction(e.target.value as 'encrypt' | 'decrypt')}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
          </div>

          <div>
            <label>Shift Amount:</label>
            <input
              type="number"
              min="1"
              max={localAlphabet === 'russian' ? 33 : 25}
              value={localShift}
              onChange={(e) => setLocalShift(parseInt(e.target.value) || 1)}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div>
            <label>Alphabet:</label>
            <select
              value={localAlphabet}
              onChange={(e) => setLocalAlphabet(e.target.value as 'english' | 'russian')}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="english">English (26 letters)</option>
              <option value="russian">Russian (33 letters)</option>
            </select>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={localPreserveCase}
                onChange={(e) => setLocalPreserveCase(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Preserve Case
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={localPreserveNonAlpha}
                onChange={(e) => setLocalPreserveNonAlpha(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Preserve Non-Alphabetic Characters
            </label>
          </div>
        </div>

        {/* Educational Information */}
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-info-lightest)', borderRadius: '4px' }}>
          <h5>About Caesar Cipher</h5>
          <p>
            The Caesar cipher is one of the simplest encryption techniques. Each letter is shifted by a fixed number
            of positions down or up the alphabet. For example, with a shift of 3: A → D, B → E, C → F, etc.
          </p>
          <p>
            <strong>Security Note:</strong> This cipher is easily broken with brute force attacks (only 25 possible shifts)
            or frequency analysis. It's mainly used for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export { CaesarCipherTool };