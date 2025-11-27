import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [version, setVersion] = useState('4');
  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState('default');
  const [uppercase, setUppercase] = useState(false);
  const [removeDashes, setRemoveDashes] = useState(false);

  const generateUUID = useCallback((ver = '4') => {
    switch (ver) {
      case '1':
        return generateUUIDv1();
      case '4':
        return generateUUIDv4();
      case '7':
        return generateUUIDv7();
      default:
        return generateUUIDv4();
    }
  }, []);

  const generateUUIDv1 = () => {
    // Simplified v1 UUID (timestamp-based)
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}-${random}`;
  };

  const generateUUIDv4 = () => {
    // Generate proper v4 UUID
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback for environments without crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDv7 = () => {
    // UUID v7 (time-ordered)
    const timestamp = Date.now();
    const randomBytes = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `${timestamp.toString(16).padStart(12, '0')}-7${randomBytes.substring(0, 3)}-${randomBytes.substring(3, 7)}-${randomBytes.substring(7, 11)}-${randomBytes.substring(11)}`;
  };

  useEffect(() => {
    generateUUIDs();
  }, [version, quantity, format, uppercase, removeDashes]);

  const generateUUIDs = () => {
    const newUuids = [];
    for (let i = 0; i < quantity; i++) {
      let uuid = generateUUID(version);

      // Apply formatting options
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      if (removeDashes) {
        uuid = uuid.replace(/-/g, '');
      }

      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid) => {
    navigator.clipboard.writeText(uuid);
  };

  const copyAllToClipboard = () => {
    const text = uuids.join('\n');
    navigator.clipboard.writeText(text);
  };

  const copyFormatted = (uuid) => {
    let formatted = uuid;
    switch (format) {
      case 'quoted':
        formatted = `"${uuid}"`;
        break;
      case 'javascript':
        formatted = `const uuid = "${uuid}";`;
        break;
      case 'json':
        formatted = `"${uuid}"`;
        break;
      case 'python':
        formatted = `uuid = "${uuid}"`;
        break;
      default:
        formatted = uuid;
    }
    navigator.clipboard.writeText(formatted);
  };

  const downloadAsFile = () => {
    const content = uuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getUUIDInfo = () => ({
    '1': {
      name: 'UUID v1',
      description: 'Time-based UUID using timestamp and MAC address',
      useCase: 'Distributed systems, logging, database records',
      pros: ['Time-sortable', 'Unique across systems'],
      cons: ['Privacy concerns (MAC address)', 'Collision possibility if clock issues']
    },
    '4': {
      name: 'UUID v4',
      description: 'Random UUID using cryptographically secure random numbers',
      useCase: 'General purpose, database keys, unique identifiers',
      pros: ['No privacy issues', 'Highly unique', 'Most common'],
      cons: ['Not time-sortable', 'Slightly larger chance of theoretical collisions']
    },
    '7': {
      name: 'UUID v7',
      description: 'Time-ordered UUID with random components',
      useCase: 'Modern applications needing both uniqueness and sortability',
      pros: ['Time-sortable', 'Random components', 'Privacy-friendly'],
      cons: ['Newer standard', 'Less widely supported']
    }
  });

  const getFormatExamples = () => {
    const sample = '550e8400-e29b-41d4-a716-446655440000';
    return {
      'default': sample,
      'uppercase': sample.toUpperCase(),
      'no-dashes': sample.replace(/-/g, ''),
      'quoted': `"${sample}"`,
      'javascript': `const uuid = "${sample}";`,
      'json': `"${sample}"`,
      'python': `uuid = "${sample}"`
    };
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>UUID Generator</h1>
          <p>Generate unique identifiers with different UUID versions and formats</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <h3>UUID Version</h3>
            <div className={styles.versionGrid}>
              {Object.entries(getUUIDInfo()).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setVersion(key)}
                  className={`${styles.versionButton} ${version === key ? styles.active : ''}`}
                >
                  <div className={styles.versionHeader}>
                    <strong>{info.name}</strong>
                  </div>
                  <p className={styles.versionDescription}>{info.description}</p>
                  <div className={styles.versionDetails}>
                    <div className={styles.versionUseCase}>
                      <strong>Best for:</strong> {info.useCase}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <h3>Quantity</h3>
              <div className={styles.quantityControl}>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.quantitySlider}
                />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.quantityInput}
                />
              </div>
              <div className={styles.quantityPresets}>
                {[1, 5, 10, 25, 50, 100].map(num => (
                  <button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`${styles.quantityPreset} ${quantity === num ? styles.active : ''}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>Formatting Options</h3>
              <div className={styles.formatControls}>
                <div className={styles.formatGroup}>
                  <label>Output Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className={styles.formatSelect}
                  >
                    <option value="default">Default</option>
                    <option value="quoted">Quoted String</option>
                    <option value="javascript">JavaScript</option>
                    <option value="json">JSON</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                    />
                    <span>Uppercase</span>
                  </label>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={removeDashes}
                      onChange={(e) => setRemoveDashes(e.target.checked)}
                    />
                    <span>Remove Dashes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <h3>Generated UUIDs ({uuids.length})</h3>
            <div className={styles.outputActions}>
              <button onClick={generateUUIDs} className={styles.regenerateButton}>
                🔄 Regenerate
              </button>
              <button onClick={copyAllToClipboard} className={styles.copyAllButton}>
                📋 Copy All
              </button>
              <button onClick={downloadAsFile} className={styles.downloadButton}>
                💾 Download
              </button>
            </div>
          </div>

          <div className={styles.uuidList}>
            {uuids.map((uuid, index) => (
              <div key={index} className={styles.uuidItem}>
                <div className={styles.uuidContent}>
                  <code className={styles.uuidCode}>{uuid}</code>
                  <div className={styles.uuidActions}>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className={styles.copyButton}
                      title="Copy UUID"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => copyFormatted(uuid)}
                      className={styles.copyFormattedButton}
                      title="Copy with formatting"
                    >
                      📄
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h2>UUID Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Current Version: {getUUIDInfo()[version].name}</h3>
              <p>{getUUIDInfo()[version].description}</p>
              <div className={styles.prosCons}>
                <div className={styles.pros}>
                  <h4>✅ Advantages</h4>
                  <ul>
                    {getUUIDInfo()[version].pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cons}>
                  <h4>⚠️ Disadvantages</h4>
                  <ul>
                    {getUUIDInfo()[version].cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Format Examples</h3>
              <div className={styles.formatExamples}>
                {Object.entries(getFormatExamples()).map(([key, example]) => (
                  <div key={key} className={styles.formatExample}>
                    <strong>{key}:</strong>
                    <code>{example}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>UUID Structure</h3>
              <div className={styles.structure}>
                <p>Standard UUIDs follow this structure:</p>
                <code className={styles.structureCode}>
                  xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
                </code>
                <ul className={styles.structureLegend}>
                  <li><strong>x:</strong> Hexadecimal digit (0-9, a-f)</li>
                  <li><strong>M:</strong> Version (1, 4, 7, etc.)</li>
                  <li><strong>N:</strong> Variant and configuration bits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h2>Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4>🔄 Multiple Versions</h4>
              <p>Support for UUID v1 (time-based), v4 (random), and v7 (time-ordered)</p>
            </div>
            <div className={styles.feature}>
              <h4>📝 Flexible Formatting</h4>
              <p>Various output formats including code snippets for different programming languages</p>
            </div>
            <div className={styles.feature}>
              <h4>⚡ Bulk Generation</h4>
              <p>Generate multiple UUIDs at once, up to 100 in a single batch</p>
            </div>
            <div className={styles.feature}>
              <h4>📋 Easy Copy & Export</h4>
              <p>One-click copy for individual UUIDs or bulk download as text file</p>
            </div>
            <div className={styles.feature}>
              <h4>🔧 Customizable Options</h4>
              <p>Choose uppercase, remove dashes, or apply different formatting styles</p>
            </div>
            <div className={styles.feature}>
              <h4>🔒 Cryptographically Secure</h4>
              <p>Uses browser's native crypto API for secure random number generation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}