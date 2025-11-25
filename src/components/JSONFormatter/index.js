import React, { useState } from 'react';
import styles from './styles.module.css';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const formatJSON = (indent = 2) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
      setIsValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
      setIsValid(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const loadSample = () => {
    const sampleJSON = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "skills": ["JavaScript", "React", "Node.js"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      },
      "isActive": true,
      "score": null
    };
    setInput(JSON.stringify(sampleJSON));
    formatJSON();
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>JSON Formatter</h1>
          <p>Format, validate, and minify JSON data with syntax highlighting</p>
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.column}>
            <div className={styles.editorHeader}>
              <h3>Input JSON</h3>
              <div className={styles.buttonGroup}>
                <button onClick={loadSample} className={styles.sampleButton}>
                  Load Sample
                </button>
                <button onClick={clearAll} className={styles.clearButton}>
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className={styles.textarea}
              spellCheck={false}
            />
          </div>

          <div className={styles.column}>
            <div className={styles.editorHeader}>
              <h3>Formatted Output</h3>
              <div className={styles.buttonGroup}>
                <button onClick={() => formatJSON(2)} className={styles.formatButton}>
                  Format (2 spaces)
                </button>
                <button onClick={() => formatJSON(4)} className={styles.formatButton}>
                  Format (4 spaces)
                </button>
                <button onClick={minifyJSON} className={styles.minifyButton}>
                  Minify
                </button>
                {output && (
                  <button onClick={copyToClipboard} className={styles.copyButton}>
                    Copy
                  </button>
                )}
              </div>
            </div>
            <div className={styles.outputContainer}>
              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}
              {output && !error && (
                <pre className={styles.output}>
                  <code>{output}</code>
                </pre>
              )}
              {!output && !error && (
                <div className={styles.placeholder}>
                  Formatted JSON will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Input Size:</span>
              <span className={styles.statValue}>{input.length.toLocaleString()} chars</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Output Size:</span>
              <span className={styles.statValue}>{output.length.toLocaleString()} chars</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Status:</span>
              <span className={`${styles.statValue} ${isValid ? styles.valid : styles.invalid}`}>
                {isValid ? '✅ Valid JSON' : (input ? '❌ Invalid' : '⏳ Waiting')}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h2>Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4>🔧 Format & Pretty Print</h4>
              <p>Format JSON with proper indentation and line breaks for better readability</p>
            </div>
            <div className={styles.feature}>
              <h4>📦 Minify</h4>
              <p>Compress JSON by removing unnecessary whitespace to reduce file size</p>
            </div>
            <div className={styles.feature}>
              <h4>✅ Validate</h4>
              <p>Check if your JSON is valid and get detailed error messages</p>
            </div>
            <div className={styles.feature}>
              <h4>📋 Copy to Clipboard</h4>
              <p>Quickly copy the formatted result to your clipboard</p>
            </div>
            <div className={styles.feature}>
              <h4>🎨 Syntax Highlighting</h4>
              <p>Color-coded JSON syntax for easy reading and debugging</p>
            </div>
            <div className={styles.feature}>
              <h4>🔄 Real-time Processing</h4>
              <p>Format and validate your JSON instantly as you type</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}