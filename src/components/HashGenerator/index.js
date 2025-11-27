import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import crypto from 'crypto-js';
import {
  DocumentIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});
  const [activeHashes, setActiveHashes] = useState({
    md5: true,
    sha1: true,
    sha256: true,
    sha512: true,
    sha3: false,
    sha224: false,
    sha384: false,
    ripemd160: false
  });

  const hashAlgorithms = [
    { key: 'md5', name: 'MD5', description: '128-bit hash, widely used but cryptographically broken' },
    { key: 'sha1', name: 'SHA-1', description: '160-bit hash, deprecated for security applications' },
    { key: 'sha224', name: 'SHA-224', description: '224-bit SHA-2 variant' },
    { key: 'sha256', name: 'SHA-256', description: '256-bit SHA-2 variant, widely used' },
    { key: 'sha384', name: 'SHA-384', description: '384-bit SHA-2 variant' },
    { key: 'sha512', name: 'SHA-512', description: '512-bit SHA-2 variant, highest security' },
    { key: 'sha3', name: 'SHA-3', description: 'Keccak-based hash function' },
    { key: 'ripemd160', name: 'RIPEMD-160', description: '160-bit hash function' }
  ];

  useEffect(() => {
    if (input) {
      generateHashes();
    } else {
      setHashes({});
    }
  }, [input, activeHashes]);

  const generateHashes = () => {
    const newHashes = {};

    if (activeHashes.md5) newHashes.md5 = crypto.MD5(input).toString();
    if (activeHashes.sha1) newHashes.sha1 = crypto.SHA1(input).toString();
    if (activeHashes.sha224) newHashes.sha224 = crypto.SHA224(input).toString();
    if (activeHashes.sha256) newHashes.sha256 = crypto.SHA256(input).toString();
    if (activeHashes.sha384) newHashes.sha384 = crypto.SHA384(input).toString();
    if (activeHashes.sha512) newHashes.sha512 = crypto.SHA512(input).toString();
    if (activeHashes.sha3) newHashes.sha3 = crypto.SHA3(input).toString();
    if (activeHashes.ripemd160) newHashes.ripemd160 = crypto.RIPEMD160(input).toString();

    setHashes(newHashes);
  };

  const toggleHash = (algorithm) => {
    setActiveHashes(prev => ({ ...prev, [algorithm]: !prev[algorithm] }));
  };

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash);
  };

  const clearAll = () => {
    setInput('');
    setHashes({});
  };

  const loadSample = () => {
    setInput('Hello, Linux Wiki!');
  };

  const generateFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const compareHashes = () => {
    const hashValues = Object.values(hashes);
    const uniqueHashes = [...new Set(hashValues)];
    return {
      total: hashValues.length,
      unique: uniqueHashes.length,
      collisions: hashValues.length - uniqueHashes.length
    };
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Hash Generator</h1>
          <p>Generate multiple hash algorithms simultaneously with real-time updates</p>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputHeader}>
            <h3>Input Text</h3>
            <div className={styles.buttonGroup}>
              <button onClick={loadSample} className={styles.sampleButton}>
                Load Sample
              </button>
              <label className={styles.fileButton}>
                <input
                  type="file"
                  onChange={generateFromFile}
                  accept=".txt,.md,.js,.json,.xml,.csv"
                  style={{ display: 'none' }}
                />
                <DocumentIcon className="w-5 h-5" /> Load File
              </label>
              <button onClick={clearAll} className={styles.clearButton}>
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className={styles.textarea}
            rows={6}
          />
          <div className={styles.inputStats}>
            <span className={styles.stat}>Characters: {input.length.toLocaleString()}</span>
            <span className={styles.stat}>Bytes: {new Blob([input]).size.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.algorithmSection}>
          <h3>Select Hash Algorithms</h3>
          <div className={styles.algorithmGrid}>
            {hashAlgorithms.map(algo => (
              <label
                key={algo.key}
                className={`${styles.algorithmCard} ${activeHashes[algo.key] ? styles.active : ''}`}
              >
                <input
                  type="checkbox"
                  checked={activeHashes[algo.key]}
                  onChange={() => toggleHash(algo.key)}
                />
                <div className={styles.algoInfo}>
                  <h4>{algo.name}</h4>
                  <p>{algo.description}</p>
                </div>
                <div className={styles.checkbox}>
                  {activeHashes[algo.key] && <CheckIcon className="w-5 h-5" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
              <h3>Generated Hashes</h3>
              <div className={styles.stats}>
                <span className={styles.statBadge}>
                  {Object.keys(hashes).length} algorithms
                </span>
                {compareHashes().collisions > 0 && (
                  <span className={styles.collisionBadge}>
                    <XMarkIcon className="w-5 h-5" /> {compareHashes().collisions} collision{compareHashes().collisions > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.hashesGrid}>
              {hashAlgorithms
                .filter(algo => activeHashes[algo.key] && hashes[algo.key])
                .map(algo => (
                  <div key={algo.key} className={styles.hashCard}>
                    <div className={styles.hashHeader}>
                      <h4>{algo.name}</h4>
                      <button
                        onClick={() => copyHash(hashes[algo.key])}
                        className={styles.copyButton}
                        title="Copy hash"
                      >
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className={styles.hashContent}>
                      <div className={styles.hashValue}>
                        <code>{hashes[algo.key]}</code>
                      </div>
                      <div className={styles.hashInfo}>
                        <span className={styles.length}>
                          Length: {hashes[algo.key].length} chars
                        </span>
                        <span className={styles.bits}>
                          {(hashes[algo.key].length * 4)} bits
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className={styles.featuresSection}>
          <h2>Features & Information</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4><ShieldCheckIcon className="w-5 h-5" /> Multiple Algorithms</h4>
              <p>Generate MD5, SHA-1, SHA-2, SHA-3, and RIPEMD-160 hashes simultaneously</p>
            </div>
            <div className={styles.feature}>
              <h4><ArrowPathIcon className="w-5 h-5" /> Real-time Updates</h4>
              <p>Hashes update instantly as you type or modify the input text</p>
            </div>
            <div className={styles.feature}>
              <h4><DocumentIcon className="w-5 h-5" /> File Support</h4>
              <p>Upload text files to generate hashes of their content</p>
            </div>
            <div className={styles.feature}>
              <h4><ClipboardDocumentIcon className="w-5 h-5" /> Easy Copy</h4>
              <p>One-click copying of hash values to clipboard</p>
            </div>
            <div className={styles.feature}>
              <h4><MagnifyingGlassIcon className="w-5 h-5" /> Collision Detection</h4>
              <p>Automatically detects and warns about hash collisions</p>
            </div>
            <div className={styles.feature}>
              <h4><SwatchIcon className="w-5 h-5" /> Detailed Info</h4>
              <p>Shows hash length in both characters and bits for each algorithm</p>
            </div>
          </div>
        </div>

        <div className={styles.securityInfo}>
          <h2><ShieldCheckIcon className="w-5 h-5" /> Security Information</h2>
          <div className={styles.securityGrid}>
            <div className={`${styles.securityCard} ${styles.deprecated}`}>
              <h4><XMarkIcon className="w-5 h-5" /> Deprecated for Security</h4>
              <p><strong>MD5, SHA-1:</strong> These algorithms have known vulnerabilities and should not be used for security applications like password hashing or digital signatures.</p>
            </div>
            <div className={`${styles.securityCard} ${styles.recommended}`}>
              <h4><CheckIcon className="w-5 h-5" /> Recommended</h4>
              <p><strong>SHA-256, SHA-512:</strong> These are currently recommended for most security applications. SHA-256 is widely used in blockchain and digital signatures.</p>
            </div>
            <div className={`${styles.securityCard} ${styles.modern}`}>
              <h4><ArrowPathIcon className="w-5 h-5" /> Modern Alternatives</h4>
              <p><strong>SHA-3:</strong> The latest hash function standard, using a different internal structure than SHA-2 for diversity in security options.</p>
            </div>
            <div className={`${styles.securityCard} ${styles.specialized}`}>
              <h4><MagnifyingGlassIcon className="w-5 h-5" /> Specialized Use</h4>
              <p><strong>RIPEMD-160:</strong> Primarily used in Bitcoin and other cryptocurrencies as part of address generation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}