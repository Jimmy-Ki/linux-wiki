import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  CryptoToolConfig,
  CryptoToolState,
  ToolResult,
  ProcessingProgress,
  EncryptionMode,
  TextEncoding
} from './types';
import { processLargeText } from '../utils/processing';
import { formatBytes } from '../utils/formatting';

interface CryptoToolProps {
  config: CryptoToolConfig;
  onProcess: (input: string, key?: string, iv?: string, mode?: EncryptionMode, options?: any) => Promise<ToolResult>;
  className?: string;
}

export const CryptoTool: React.FC<CryptoToolProps> = ({
  config,
  onProcess,
  className
}) => {
  const [state, setState] = useState<CryptoToolState>({
    input: '',
    output: '',
    key: '',
    iv: '',
    mode: config.defaultMode || (config.supportedModes?.[0] || 'ECB'),
    options: {},
    processing: false,
    error: ''
  });

  const [inputEncoding, setInputEncoding] = useState<TextEncoding>('utf8');
  const [outputEncoding, setOutputEncoding] = useState<TextEncoding>('hex');
  const [progress, setProgress] = useState<ProcessingProgress | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [inputFileName, setInputFileName] = useState<string>('');

  const validateInputs = useCallback((): string | null => {
    if (!state.input.trim()) {
      return 'Input is required';
    }

    if (config.hasKeyInput && !state.key.trim()) {
      return 'Key is required';
    }

    if (config.hasIVInput && config.supportedModes?.includes(state.mode) && !state.iv.trim()) {
      return 'IV is required for this mode';
    }

    if (config.keySizes && state.key) {
      const keyBytes = Buffer.from(state.key, 'utf8').length;
      if (!config.keySizes.includes(keyBytes * 8)) {
        return `Key must be one of: ${config.keySizes.map(size => `${size/8} bytes`).join(', ')}`;
      }
    }

    return null;
  }, [state, config]);

  const handleProcess = useCallback(async () => {
    const error = validateInputs();
    if (error) {
      setState(prev => ({ ...prev, error, processing: false }));
      return;
    }

    setState(prev => ({ ...prev, processing: true, error: '' }));
    setProgress({ loaded: 0, total: 1, percentage: 0 });

    try {
      const result = await processLargeText(
        state.input,
        (chunk: string) => onProcess(chunk, state.key, state.iv, state.mode, state.options),
        (loaded: number, total: number) => {
          setProgress({ loaded, total, percentage: (loaded / total) * 100 });
        }
      );

      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          output: typeof result.data === 'string' ? result.data : Buffer.from(result.data).toString(outputEncoding),
          processing: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: result.error || 'Processing failed',
          processing: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        processing: false
      }));
    } finally {
      setProgress(null);
    }
  }, [state, onProcess, validateInputs, outputEncoding]);

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

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
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
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(state.output).then(() => {
      // Could add a toast notification here
    });
  }, [state.output]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([state.output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.toLowerCase().replace(/\s+/g, '-')}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.output, config.name]);

  return (
    <div className={clsx('crypto-tool', className)}>
      <div className="crypto-tool-header">
        <h3>{config.name}</h3>
        <p>{config.description}</p>
      </div>

      <div className="crypto-tool-body">
        {/* Input Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Input</h4>
            <div className="section-actions">
              <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileInput}
                accept=".txt,.json,.xml,.csv"
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
            placeholder="Enter text to process..."
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
              <option value="utf8">UTF-8</option>
              <option value="ascii">ASCII</option>
              <option value="hex">Hex</option>
              <option value="base64">Base64</option>
              <option value="binary">Binary</option>
            </select>
          </div>
        </div>

        {/* Options Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Options</h4>
          </div>

          <div className="options-grid">
            {/* Mode Selection */}
            {config.supportedModes && config.supportedModes.length > 1 && (
              <div className="option-field">
                <label>Encryption Mode:</label>
                <select
                  value={state.mode}
                  onChange={(e) => setState(prev => ({ ...prev, mode: e.target.value as EncryptionMode }))}
                  disabled={state.processing}
                >
                  {config.supportedModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Key Input */}
            {config.hasKeyInput && (
              <div className="option-field">
                <label>Key:</label>
                <input
                  type="password"
                  value={state.key}
                  onChange={(e) => setState(prev => ({ ...prev, key: e.target.value }))}
                  placeholder="Enter encryption key..."
                  disabled={state.processing}
                />
                {config.keySizes && (
                  <small>Valid sizes: {config.keySizes.map(size => `${size} bits`).join(', ')}</small>
                )}
              </div>
            )}

            {/* IV Input */}
            {config.hasIVInput && config.supportedModes?.includes(state.mode) && (
              <div className="option-field">
                <label>IV (Initialization Vector):</label>
                <input
                  type="text"
                  value={state.iv}
                  onChange={(e) => setState(prev => ({ ...prev, iv: e.target.value }))}
                  placeholder="Enter IV..."
                  disabled={state.processing}
                />
                {config.ivSizes && (
                  <small>Valid sizes: {config.ivSizes.map(size => `${size} bits`).join(', ')}</small>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Process Button */}
        <div className="crypto-tool-actions">
          <button
            onClick={handleProcess}
            disabled={state.processing || !state.input.trim()}
            className="button button-primary"
          >
            {state.processing ? '⏳ Processing...' : `🔐 ${config.operation.charAt(0).toUpperCase() + config.operation.slice(1)}`}
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
        {state.error && (
          <div className="error-container">
            <strong>Error:</strong> {state.error}
          </div>
        )}

        {/* Output Section */}
        {state.output && (
          <div className="crypto-tool-section">
            <div className="section-header">
              <h4>Output</h4>
              <div className="section-actions">
                <button onClick={handleCopy} className="button button-secondary">
                  📋 Copy
                </button>
                <button onClick={handleDownload} className="button button-secondary">
                  💾 Download
                </button>
              </div>
            </div>

            <div className="encoding-selector">
              <label>Output Format:</label>
              <select
                value={outputEncoding}
                onChange={(e) => setOutputEncoding(e.target.value as TextEncoding)}
              >
                <option value="hex">Hex</option>
                <option value="base64">Base64</option>
                <option value="utf8">UTF-8</option>
                <option value="binary">Binary</option>
              </select>
            </div>

            <textarea
              value={state.output}
              readOnly
              className="output-textarea"
              rows={8}
            />
          </div>
        )}
      </div>
    </div>
  );
};