import React, { useState, useCallback, useMemo } from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'rot-cipher',
  name: 'ROT (Rotation) Cipher',
  description: 'A comprehensive ROT cipher tool supporting ROT13, ROT5, ROT18, ROT47, and custom rotations with auto-detection.',
  category: 'Classical Ciphers',
  operation: 'encrypt'
};

interface ROTVariant {
  name: string;
  value: string;
  description: string;
  shift: number;
  alphabetType: 'letters' | 'numbers' | 'ascii';
}

const ROT_VARIANTS: ROTVariant[] = [
  {
    name: 'ROT13',
    value: 'rot13',
    description: 'Rotate letters by 13 positions (A↔N, B↔O, etc.)',
    shift: 13,
    alphabetType: 'letters'
  },
  {
    name: 'ROT5',
    value: 'rot5',
    description: 'Rotate digits by 5 positions (0↔5, 1↔6, etc.)',
    shift: 5,
    alphabetType: 'numbers'
  },
  {
    name: 'ROT18',
    value: 'rot18',
    description: 'Combination of ROT13 (letters) and ROT5 (digits)',
    shift: 13,
    alphabetType: 'letters'
  },
  {
    name: 'ROT47',
    value: 'rot47',
    description: 'Rotate all printable ASCII characters by 47 positions',
    shift: 47,
    alphabetType: 'ascii'
  },
  {
    name: 'ROT1',
    value: 'rot1',
    description: 'Caesar cipher with shift 1',
    shift: 1,
    alphabetType: 'letters'
  },
  {
    name: 'ROT2',
    value: 'rot2',
    description: 'Caesar cipher with shift 2',
    shift: 2,
    alphabetType: 'letters'
  },
  {
    name: 'ROT3',
    value: 'rot3',
    description: 'Caesar cipher with shift 3',
    shift: 3,
    alphabetType: 'letters'
  },
  {
    name: 'Custom',
    value: 'custom',
    description: 'Custom rotation amount',
    shift: 0,
    alphabetType: 'letters'
  }
];

const ROTTool: React.FC = () => {
  const [localSelectedVariant, setLocalSelectedVariant] = useState('rot13');
  const [localCustomShift, setLocalCustomShift] = useState(7);
  const [localPreserveNonAlpha, setLocalPreserveNonAlpha] = useState(true);
  const [localAutoDetect, setLocalAutoDetect] = useState(false);
  const [localTextOnly, setLocalTextOnly] = useState(false);

  // Auto-detect ROT variant based on input characteristics
  const detectVariant = useCallback((input: string): string => {
    const hasLetters = /[A-Za-z]/.test(input);
    const hasNumbers = /[0-9]/.test(input);
    const hasSpecialChars = /[^A-Za-z0-9\s]/.test(input);

    if (hasSpecialChars && !hasLetters && !hasNumbers) {
      return 'rot47';
    }

    if (hasLetters && hasNumbers) {
      return 'rot18';
    }

    if (hasNumbers && !hasLetters) {
      return 'rot5';
    }

    if (hasLetters) {
      return 'rot13';
    }

    return 'rot13'; // Default fallback
  }, []);

  // Get active variant configuration
  const activeVariant = useMemo(() => {
    const variant = ROT_VARIANTS.find(v => v.value === localSelectedVariant);
    if (!variant) return ROT_VARIANTS[0];

    if (localSelectedVariant === 'custom') {
      return {
        ...variant,
        shift: localCustomShift
      };
    }

    return variant;
  }, [localSelectedVariant, localCustomShift]);

  // ROT cipher implementation
  const rotCipher = useCallback((text: string, shift: number, alphabetType: 'letters' | 'numbers' | 'ascii'): string => {
    if (alphabetType === 'ascii') {
      // ROT47: Rotate all printable ASCII characters (33-126)
      return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 33 && code <= 126) {
          let newCode = code + shift;
          while (newCode > 126) newCode -= 94; // 94 printable ASCII characters
          while (newCode < 33) newCode += 94;
          return String.fromCharCode(newCode);
        }
        return char;
      }).join('');
    } else if (alphabetType === 'numbers') {
      // ROT5: Rotate digits 0-9
      return text.split('').map(char => {
        if (char >= '0' && char <= '9') {
          const digit = parseInt(char);
          return String.fromCharCode('0'.charCodeAt(0) + (digit + shift) % 10);
        }
        return char;
      }).join('');
    } else {
      // ROT for letters (like Caesar cipher)
      const alphabetSize = 26;
      return text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          const base = 'A'.charCodeAt(0);
          const offset = (char.charCodeAt(0) - base + shift) % alphabetSize;
          return String.fromCharCode(base + offset);
        } else if (char >= 'a' && char <= 'z') {
          const base = 'a'.charCodeAt(0);
          const offset = (char.charCodeAt(0) - base + shift) % alphabetSize;
          return String.fromCharCode(base + offset);
        } else if (!localPreserveNonAlpha) {
          return '';
        } else {
          return char;
        }
      }).join('');
    }
  }, [localPreserveNonAlpha]);

  // Multi-ROT processing (ROT18 = ROT13 + ROT5)
  const multiROT = useCallback((text: string, variant: string): string => {
    if (variant === 'rot18') {
      // Apply ROT13 first, then ROT5
      const rot13Result = rotCipher(text, 13, 'letters');
      return rotCipher(rot13Result, 5, 'numbers');
    } else {
      const rotVariant = ROT_VARIANTS.find(v => v.value === variant);
      if (rotVariant) {
        const shift = variant === 'custom' ? localCustomShift : rotVariant.shift;
        return rotCipher(text, shift, rotVariant.alphabetType);
      }
    }
    return text;
  }, [rotCipher, localCustomShift]);

  // Main processing function
  const handleProcess = useCallback(async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    try {
      let finalInput = input;
      let detectedVariant = localSelectedVariant;

      // Parse options with fallbacks
      const selectedVariant = options?.variant || localSelectedVariant;
      const customShift = options?.customShift ? parseInt(options.customShift) : localCustomShift;
      const preserveNonAlpha = options?.preserveNonAlpha !== undefined ? options.preserveNonAlpha : localPreserveNonAlpha;
      const autoDetect = options?.autoDetect !== undefined ? options.autoDetect : localAutoDetect;
      const textOnly = options?.textOnly !== undefined ? options.textOnly : localTextOnly;

      // Auto-detection
      if (autoDetect) {
        detectedVariant = detectVariant(input);
      }

      // Text only mode
      if (textOnly) {
        finalInput = input.replace(/[^A-Za-z0-9]/g, '');
      }

      // Single line processing
      const result = multiROT(finalInput, detectedVariant);

      // Analyze result for statistics
      const stats = {
        totalChars: finalInput.length,
        processedChars: result.length,
        letters: (finalInput.match(/[A-Za-z]/g) || []).length,
        numbers: (finalInput.match(/[0-9]/g) || []).length,
        special: (finalInput.match(/[^A-Za-z0-9\s]/g) || []).length
      };

      const activeRotVariant = ROT_VARIANTS.find(v => v.value === detectedVariant);
      const shiftAmount = detectedVariant === 'custom' ? customShift : activeRotVariant?.shift || 0;

      return {
        success: true,
        data: result,
        metadata: {
          variant: detectedVariant,
          shift: shiftAmount,
          alphabetType: activeRotVariant?.alphabetType || 'letters',
          autoDetect,
          textOnly,
          preserveNonAlpha,
          stats,
          originalLength: finalInput.length,
          resultLength: result.length,
          detectedVariant: autoDetect ? detectedVariant : null
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'ROT operation failed'
      };
    }
  }, [localSelectedVariant, localCustomShift, localPreserveNonAlpha, localAutoDetect, localTextOnly, detectVariant, multiROT]);

  return (
    <div className="rot-tool">
      <CryptoTool
        config={config}
        onProcess={handleProcess}
      />

      {/* Additional UI for ROT-specific options */}
      <div className="rot-custom-options" style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
        <h4>ROT Cipher Options</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <label>ROT Variant:</label>
            <select
              value={localSelectedVariant}
              onChange={(e) => setLocalSelectedVariant(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              {ROT_VARIANTS.map(variant => (
                <option key={variant.value} value={variant.value}>
                  {variant.name} - {variant.description}
                </option>
              ))}
            </select>
          </div>

          {localSelectedVariant === 'custom' && (
            <div>
              <label>Custom Shift Amount:</label>
              <input
                type="number"
                min="1"
                max="25"
                value={localCustomShift}
                onChange={(e) => setLocalCustomShift(parseInt(e.target.value) || 1)}
                style={{ width: '100%', padding: '0.5rem' }}
              />
            </div>
          )}

          <div>
            <label>
              <input
                type="checkbox"
                checked={localAutoDetect}
                onChange={(e) => setLocalAutoDetect(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Auto-detect Variant
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={localTextOnly}
                onChange={(e) => setLocalTextOnly(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Text Only Mode
            </label>
          </div>

          {(activeVariant.alphabetType === 'letters' || localSelectedVariant === 'custom') && (
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
          )}
        </div>

        {/* Quick Reference */}
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '4px' }}>
          <h5>Quick Reference</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.9rem', padding: '0.5rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
              <strong>ROT13:</strong> A↔N, B↔O, C↔P...
            </div>
            <div style={{ fontSize: '0.9rem', padding: '0.5rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
              <strong>ROT5:</strong> 0↔5, 1↔6, 2↔7...
            </div>
            <div style={{ fontSize: '0.9rem', padding: '0.5rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
              <strong>ROT18:</strong> ROT13 + ROT5 combined
            </div>
            <div style={{ fontSize: '0.9rem', padding: '0.5rem', background: 'var(--ifm-background-surface-color)', borderRadius: '4px' }}>
              <strong>ROT47:</strong> ASCII 33-126 rotated
            </div>
          </div>
        </div>

        {/* Educational Information */}
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-info-lightest)', borderRadius: '4px' }}>
          <h5>About ROT Ciphers</h5>
          <p>
            ROT (Rotation) ciphers are simple substitution ciphers that rotate characters by a fixed amount.
            They're commonly used for simple obfuscation and in puzzle games.
          </p>
          <ul>
            <li><strong>ROT13:</strong> The most famous rotation cipher. Rotating by 13 makes the operation its own inverse.</li>
            <li><strong>ROT5:</strong> Used for rotating numbers 0-9.</li>
            <li><strong>ROT18:</strong> Combines ROT13 (for letters) and ROT5 (for digits).</li>
            <li><strong>ROT47:</strong> Rotates all printable ASCII characters, providing more obfuscation.</li>
          </ul>
          <p>
            <strong>Security Note:</strong> ROT ciphers provide very weak security and should only be used for
            simple obfuscation, puzzles, or educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export { ROTTool };