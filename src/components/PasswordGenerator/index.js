import React, { useState, useEffect, useCallback } from 'react';
import {
  IconCopy,
  IconRefresh,
  IconDownload,
  IconX,
  IconShieldCheck,
  IconPalette
} from '@tabler/icons-react';
import styles from './styles.module.css';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  });
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

  const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'ilLo01O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  };

  const generatePassword = useCallback(() => {
    let charset = '';
    if (options.uppercase) charset += characterSets.uppercase;
    if (options.lowercase) charset += characterSets.lowercase;
    if (options.numbers) charset += characterSets.numbers;
    if (options.symbols) charset += characterSets.symbols;

    if (options.excludeSimilar) {
      charset = charset.split('').filter(char => !characterSets.similar.includes(char)).join('');
    }
    if (options.excludeAmbiguous) {
      charset = charset.split('').filter(char => !characterSets.ambiguous.includes(char)).join('');
    }

    if (!charset) {
      setPassword('');
      return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  useEffect(() => {
    if (password) {
      calculateStrength(password);
    }
  }, [password]);

  const calculateStrength = (pwd) => {
    let score = 0;
    let feedback = [];

    // Length bonus
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 2;

    // Character variety
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    // Pattern analysis
    if (!/(.)\1{2,}/.test(pwd)) score += 1; // No repeated characters
    if (!/^[a-zA-Z]+$/.test(pwd) && !/^[0-9]+$/.test(pwd)) score += 1; // Mixed types

    let strengthText = '';
    let strengthColor = '';

    if (score < 3) {
      strengthText = 'Weak';
      strengthColor = '#ef4444';
    } else if (score < 6) {
      strengthText = 'Fair';
      strengthColor = '#f59e0b';
    } else if (score < 9) {
      strengthText = 'Good';
      strengthColor = '#3b82f6';
    } else {
      strengthText = 'Strong';
      strengthColor = '#10b981';
    }

    setStrength({ score, text: strengthText, color: strengthColor });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const copyAllPasswords = () => {
    const allPasswords = passwordHistory.join('\n');
    navigator.clipboard.writeText(allPasswords);
  };

  const regeneratePassword = () => {
    if (password) {
      setPasswordHistory(prev => [password, ...prev.slice(0, 9)]);
    }
    generatePassword();
  };

  const savePassword = () => {
    if (password && !passwordHistory.includes(password)) {
      setPasswordHistory(prev => [password, ...prev.slice(0, 9)]);
    }
  };

  const clearHistory = () => {
    setPasswordHistory([]);
  };

  const getPasswordSuggestions = () => {
    const suggestions = [
      { name: 'Strong Password', length: 16, options: { uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: true, excludeAmbiguous: false } },
      { name: 'PIN Code', length: 4, options: { uppercase: false, lowercase: false, numbers: true, symbols: false, excludeSimilar: false, excludeAmbiguous: false } },
      { name: 'Passphrase', length: 20, options: { uppercase: true, lowercase: true, numbers: false, symbols: false, excludeSimilar: false, excludeAmbiguous: true } },
      { name: 'No Symbols', length: 12, options: { uppercase: true, lowercase: true, numbers: true, symbols: false, excludeSimilar: true, excludeAmbiguous: false } }
    ];
    return suggestions;
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Password Generator</h1>
          <p>Create strong, secure passwords with customizable options</p>
        </div>

        <div className={styles.passwordSection}>
          <div className={styles.passwordDisplay}>
            <div className={styles.passwordOutput}>
              {password || 'Click generate to create password'}
            </div>
            <div className={styles.passwordActions}>
              <button onClick={copyToClipboard} className={styles.copyButton} disabled={!password}>
                <IconCopy size={16} /> Copy
              </button>
              <button onClick={regeneratePassword} className={styles.regenerateButton}>
                <IconRefresh size={16} /> Regenerate
              </button>
              <button onClick={savePassword} className={styles.saveButton} disabled={!password || passwordHistory.includes(password)}>
                <IconDownload size={16} /> Save
              </button>
            </div>
          </div>

          <div className={styles.strengthMeter}>
            <div className={styles.strengthBar}>
              <div
                className={styles.strengthFill}
                style={{
                  width: `${(strength.score / 10) * 100}%`,
                  backgroundColor: strength.color
                }}
              />
            </div>
            <span className={styles.strengthText} style={{ color: strength.color }}>
              {strength.text || 'Enter password'}
            </span>
          </div>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <h3>Password Length</h3>
            <div className={styles.lengthControl}>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className={styles.lengthSlider}
              />
              <div className={styles.lengthDisplay}>
                <input
                  type="number"
                  min="4"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className={styles.lengthInput}
                />
                <span>characters</span>
              </div>
            </div>
          </div>

          <div className={styles.controlGroup}>
            <h3>Character Options</h3>
            <div className={styles.optionsGrid}>
              {Object.entries({
                uppercase: 'Uppercase (A-Z)',
                lowercase: 'Lowercase (a-z)',
                numbers: 'Numbers (0-9)',
                symbols: 'Symbols (!@#$%)'
              }).map(([key, label]) => (
                <label key={key} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <h3>Advanced Options</h3>
            <div className={styles.optionsGrid}>
              {Object.entries({
                excludeSimilar: 'Exclude Similar (ilLo01O)',
                excludeAmbiguous: 'Exclude Ambiguous ({}[]()\\\'"`)'
              }).map(([key, label]) => (
                <label key={key} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <h3>Quick Presets</h3>
            <div className={styles.presetsGrid}>
              {getPasswordSuggestions().map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLength(preset.length);
                    setOptions(preset.options);
                  }}
                  className={styles.presetButton}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {passwordHistory.length > 0 && (
          <div className={styles.historySection}>
            <div className={styles.historyHeader}>
              <h3>Password History</h3>
              <div className={styles.historyActions}>
                <button onClick={copyAllPasswords} className={styles.copyAllButton}>
                  <IconCopy size={16} /> Copy All
                </button>
                <button onClick={clearHistory} className={styles.clearButton}>
                  <IconX size={16} /> Clear
                </button>
              </div>
            </div>
            <div className={styles.historyGrid}>
              {passwordHistory.map((pwd, index) => (
                <div key={index} className={styles.historyItem}>
                  <code className={styles.historyPassword}>{pwd}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(pwd)}
                    className={styles.historyCopy}
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h4><IconShieldCheck size={16} /> Security Best Practices</h4>
              <ul>
                <li>Use at least 12 characters for important accounts</li>
                <li>Include uppercase, lowercase, numbers, and symbols</li>
                <li>Use unique passwords for each account</li>
                <li>Consider using a password manager</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4><IconPalette size={16} /> Password Strength</h4>
              <ul>
                <li><strong>Weak:</strong> Short, simple patterns</li>
                <li><strong>Fair:</strong> Mixed character types</li>
                <li><strong>Good:</strong> 12+ chars, mixed types</li>
                <li><strong>Strong:</strong> 16+ chars, all types, no patterns</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4><IconShieldCheck size={16} /> Advanced Features</h4>
              <ul>
                <li><strong>Exclude Similar:</strong> Removes confusing characters</li>
                <li><strong>Exclude Ambiguous:</strong> Removes symbols that may cause issues</li>
                <li><strong>History:</strong> Stores last 10 generated passwords</li>
                <li><strong>Cryptographically Secure:</strong> Uses browser's crypto API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}