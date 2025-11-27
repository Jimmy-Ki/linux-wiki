import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import {
  ShieldCheckIcon,
  ArrowPathIcon,
  DocumentIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Base64Encoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode');
  const [encoding, setEncoding] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    processText();
  }, [inputText, mode, encoding]);

  const processText = async () => {
    if (!inputText) {
      setOutputText('');
      setError('');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      let result = '';

      if (mode === 'encode') {
        result = encodeBase64(inputText);
      } else {
        result = decodeBase64(inputText);
      }

      setOutputText(result);
    } catch (err) {
      setError(err.message);
      setOutputText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const encodeBase64 = (text) => {
    switch (encoding) {
      case 'standard':
        return btoa(unescape(encodeURIComponent(text)));
      case 'urlsafe':
        return btoa(unescape(encodeURIComponent(text)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      case 'html':
        return btoa(unescape(encodeURIComponent(text)));
      default:
        return btoa(unescape(encodeURIComponent(text)));
    }
  };

  const decodeBase64 = (base64Text) => {
    try {
      let normalizedText = base64Text.trim();

      switch (encoding) {
        case 'standard':
          return decodeURIComponent(escape(atob(normalizedText)));
        case 'urlsafe':
          // Add padding back if needed
          const padding = '='.repeat((4 - normalizedText.length % 4) % 4);
          normalizedText = normalizedText.replace(/-/g, '+').replace(/_/g, '/') + padding;
          return decodeURIComponent(escape(atob(normalizedText)));
        case 'html':
          return decodeURIComponent(escape(atob(normalizedText)));
        default:
          return decodeURIComponent(escape(atob(normalizedText)));
      }
    } catch (err) {
      throw new Error('Invalid Base64 input');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (mode === 'encode') {
        setInputText(e.target.result);
      } else {
        // For decode mode, try to read as text and process as base64
        const text = e.target.result;
        setInputText(text);
      }
    };

    if (mode === 'encode') {
      reader.readAsText(file);
    } else {
      // For decode mode, try to read as base64
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const copyInputToClipboard = () => {
    navigator.clipboard.writeText(inputText);
  };

  const swapInputOutput = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const clearAll = () => {
    if (inputText && outputText) {
      setHistory(prev => [{
        input: inputText,
        output: outputText,
        mode: mode,
        encoding: encoding,
        timestamp: new Date().toLocaleString()
      }, ...prev.slice(0, 9)]);
    }
    setInputText('');
    setOutputText('');
    setError('');
  };

  const loadFromHistory = (item) => {
    setInputText(item.input);
    setMode(item.mode);
    setEncoding(item.encoding);
  };

  const downloadAsFile = () => {
    const content = outputText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSampleTexts = () => [
    { label: 'Simple Text', value: 'Hello, World!' },
    { label: 'JSON', value: '{"name": "Linux Wiki", "version": "1.0.0"}' },
    { label: 'URL', value: 'https://linux.wiki/tools' },
    { label: 'Email', value: 'contact@linux.wiki' },
    { label: 'Multilingual', value: 'Hello 你好 🌍 Linux Wiki' },
    { label: 'Binary Data', value: '\x00\x01\x02\x03\x04\x05' }
  ];

  const getEncodingInfo = () => ({
    standard: {
      name: 'Standard Base64',
      description: 'Standard Base64 encoding with + and / characters',
      useCase: 'General purpose Base64 encoding'
    },
    urlsafe: {
      name: 'URL-Safe Base64',
      description: 'URL-safe Base64 with - and _ characters, no padding',
      useCase: 'Use in URLs and filenames without encoding'
    },
    html: {
      name: 'HTML Compatible',
      description: 'Standard Base64 that works well in HTML/XML contexts',
      useCase: 'Embedding data in HTML, CSS, or XML'
    }
  });

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Base64 Encoder/Decoder</h1>
          <p>Encode and decode text and files using Base64 encoding</p>
        </div>

        <div className={styles.modeSelector}>
          <h3>Operation Mode</h3>
          <div className={styles.modeButtons}>
            <button
              onClick={() => setMode('encode')}
              className={`${styles.modeButton} ${mode === 'encode' ? styles.active : ''}`}
            >
              <ShieldCheckIcon className="w-5 h-5" /> Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`${styles.modeButton} ${mode === 'decode' ? styles.active : ''}`}
            >
              <ShieldCheckIcon className="w-5 h-5" /> Decode
            </button>
            <button
              onClick={swapInputOutput}
              className={styles.swapButton}
              disabled={!inputText && !outputText}
            >
              <ArrowPathIcon className="w-5 h-5" /> Swap
            </button>
          </div>
        </div>

        <div className={styles.encodingSelector}>
          <h3>Encoding Type</h3>
          <div className={styles.encodingOptions}>
            {Object.entries(getEncodingInfo()).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setEncoding(key)}
                className={`${styles.encodingButton} ${encoding === key ? styles.active : ''}`}
              >
                <div className={styles.encodingHeader}>
                  <strong>{info.name}</strong>
                </div>
                <div className={styles.encodingDescription}>
                  {info.description}
                </div>
                <div className={styles.encodingUseCase}>
                  {info.useCase}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.inputSection}>
            <div className={styles.sectionHeader}>
              <h3>{mode === 'encode' ? 'Input Text' : 'Base64 Input'}</h3>
              <div className={styles.inputActions}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.fileButton}
                >
                  <DocumentIcon className="w-5 h-5" /> Upload File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt,.json,.xml,.html,.css,.js,.md"
                  style={{ display: 'none' }}
                />
                <button
                  onClick={copyInputToClipboard}
                  className={styles.copyButton}
                  disabled={!inputText}
                >
                  <ClipboardDocumentIcon className="w-5 h-5" /> Copy
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
              className={styles.textarea}
              rows={10}
            />
            <div className={styles.inputStats}>
              <span>Length: {inputText.length.toLocaleString()} characters</span>
              <span>Bytes: {new Blob([inputText]).size.toLocaleString()}</span>
            </div>

            {mode === 'encode' && (
              <div className={styles.samplesSection}>
                <h4>Sample Text</h4>
                <div className={styles.sampleButtons}>
                  {getSampleTexts().map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(sample.value)}
                      className={styles.sampleButton}
                      title={sample.label}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.outputSection}>
            <div className={styles.sectionHeader}>
              <h3>{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</h3>
              <div className={styles.outputActions}>
                {isProcessing && <span className={styles.processing}>Processing...</span>}
                <button
                  onClick={downloadAsFile}
                  className={styles.downloadButton}
                  disabled={!outputText}
                >
                  <ArrowDownTrayIcon className="w-5 h-5" /> Download
                </button>
                <button
                  onClick={copyToClipboard}
                  className={styles.copyButton}
                  disabled={!outputText}
                >
                  <ClipboardDocumentIcon className="w-5 h-5" /> Copy
                </button>
              </div>
            </div>

            {error ? (
              <div className={styles.error}>
                <h4><XMarkIcon className="w-5 h-5" /> Error</h4>
                <p>{error}</p>
              </div>
            ) : (
              <textarea
                value={outputText}
                readOnly
                placeholder="Output will appear here..."
                className={`${styles.textarea} ${styles.readonly}`}
                rows={10}
              />
            )}

            {outputText && !error && (
              <div className={styles.outputStats}>
                <span>Length: {outputText.length.toLocaleString()} characters</span>
                <span>Bytes: {new Blob([outputText]).size.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button onClick={clearAll} className={styles.clearButton}>
            <XMarkIcon className="w-5 h-5" /> Clear All
          </button>
        </div>

        {history.length > 0 && (
          <div className={styles.historySection}>
            <h3>History</h3>
            <div className={styles.historyGrid}>
              {history.map((item, index) => (
                <div key={index} className={styles.historyItem}>
                  <div className={styles.historyHeader}>
                    <strong>{item.mode === 'encode' ? 'Encoded' : 'Decoded'}</strong>
                    <span>{item.timestamp}</span>
                  </div>
                  <button
                    onClick={() => loadFromHistory(item)}
                    className={styles.historyButton}
                  >
                    <DocumentIcon className="w-5 h-5" /> Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.infoSection}>
          <h2>About Base64 Encoding</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>What is Base64?</h3>
              <p>
                Base64 is an encoding scheme that converts binary data into ASCII text format.
                It's commonly used for transmitting data over channels that only support text,
                such as email attachments, URLs, and JSON.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Common Use Cases</h3>
              <ul>
                <li>Email attachments (MIME encoding)</li>
                <li>Data URLs for embedding images in HTML/CSS</li>
                <li>Transmitting binary data in JSON/XML</li>
                <li>Basic authentication headers</li>
                <li>Storing binary data in text-based databases</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h3>Encoding Process</h3>
              <ol>
                <li>Convert text to bytes using UTF-8</li>
                <li>Group bytes into 24-bit chunks</li>
                <li>Split into four 6-bit groups</li>
                <li>Map each 6-bit group to a Base64 character</li>
                <li>Add padding if necessary</li>
              </ol>
            </div>
            <div className={styles.infoCard}>
              <h3>Character Set</h3>
              <div className={styles.charset}>
                <strong>Standard Base64:</strong> A-Z, a-z, 0-9, +, /
              </div>
              <div className={styles.charset}>
                <strong>URL-Safe Base64:</strong> A-Z, a-z, 0-9, -, _
              </div>
              <div className={styles.charset}>
                <strong>Padding:</strong> = character (omitted in URL-safe)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}