import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { advancedBase64Algorithms, Base64ChunkProcessor, Base64Validation } from '../algorithms/base64Advanced';
import '../ui/CryptoTools.css';

// TypeScript interfaces
type Base64Variant = 'standard' | 'url-safe' | 'mime';
type LineEnding = 'lf' | 'crlf' | 'auto';

interface ProcessingState {
  input: string;
  output: string;
  variant: Base64Variant;
  action: 'encode' | 'decode';
  processing: boolean;
  error: string;
  progress: number | null;
  inputFile: File | null;
  inputFileName: string;
  inputSize: number;
  outputSize: number;
  lineEnding: LineEnding;
  autoDetectVariant: boolean;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const Base64Tool: React.FC = () => {
  const [state, setState] = useState<ProcessingState>({
    input: '',
    output: '',
    variant: 'standard',
    action: 'encode',
    processing: false,
    error: '',
    progress: null,
    inputFile: null,
    inputFileName: '',
    inputSize: 0,
    outputSize: 0,
    lineEnding: 'lf',
    autoDetectVariant: true
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-detect variant when input changes (for decoding)
  useEffect(() => {
    if (state.action === 'decode' && state.autoDetectVariant && state.input) {
      const detected = Base64Validation.detectVariant(state.input);
      if (detected !== 'unknown' && detected !== state.variant) {
        setState(prev => ({ ...prev, variant: detected }));
      }
    }
  }, [state.input, state.action, state.autoDetectVariant, state.variant]);

  // Calculate sizes when input/output changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      inputSize: new Blob([prev.input]).size,
      outputSize: new Blob([prev.output]).size
    }));
  }, [state.input, state.output]);

  const validateInput = useCallback((): string | null => {
    if (!state.input.trim()) {
      return 'Input is required';
    }

    if (state.action === 'decode') {
      const cleanInput = state.input.replace(/[\r\n\s]/g, '');

      if (state.variant === 'standard' || state.variant === 'mime') {
        if (!Base64Validation.isValidStandard(cleanInput)) {
          return 'Invalid Base64 format for standard/MIME variant';
        }
      } else if (state.variant === 'url-safe') {
        if (!Base64Validation.isValidURLSafe(cleanInput)) {
          return 'Invalid Base64 format for URL-safe variant';
        }
      }
    }

    return null;
  }, [state.input, state.action, state.variant]);

  const handleProcess = useCallback(async () => {
    const error = validateInput();
    if (error) {
      setState(prev => ({ ...prev, error, processing: false }));
      return;
    }

    setState(prev => ({ ...prev, processing: true, error: '', progress: 0 }));

    try {
      let result: any;

      if (state.action === 'encode') {
        switch (state.variant) {
          case 'standard':
            result = advancedBase64Algorithms.encodeStandard(state.input);
            break;
          case 'url-safe':
            result = advancedBase64Algorithms.encodeURLSafe(state.input);
            break;
          case 'mime':
            result = advancedBase64Algorithms.encodeMIME(state.input);
            break;
          default:
            throw new Error('Unsupported Base64 variant');
        }
      } else {
        // Decode
        switch (state.variant) {
          case 'standard':
            result = advancedBase64Algorithms.decodeStandard(state.input);
            break;
          case 'url-safe':
            result = advancedBase64Algorithms.decodeURLSafe(state.input);
            break;
          case 'mime':
            result = advancedBase64Algorithms.decodeMIME(state.input);
            break;
          default:
            throw new Error('Unsupported Base64 variant');
        }
      }

      if (result.success) {
        // Apply line ending conversion for MIME variant
        let processedOutput = result.data;
        if (state.variant === 'mime' && state.lineEnding !== 'auto') {
          processedOutput = state.lineEnding === 'crlf'
            ? processedOutput.replace(/\n/g, '\r\n')
            : processedOutput.replace(/\r\n/g, '\n');
        }

        setState(prev => ({
          ...prev,
          output: processedOutput,
          processing: false,
          progress: 100
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
      setTimeout(() => {
        setState(prev => ({ ...prev, progress: null }));
      }, 1000);
    }
  }, [state, validateInput]);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setState(prev => ({
        ...prev,
        error: `File too large. Max ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB supported.`
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      inputFile: file,
      inputFileName: file.name,
      processing: true,
      error: '',
      progress: 0
    }));

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;

        // Process file with progress
        let result: any;

        if (state.action === 'encode') {
          // For encoding, read as text and process
          setState(prev => ({ ...prev, input: content }));
          result = await Base64ChunkProcessor.encodeFile(file, state.variant, (progress) => {
            setState(prev => ({ ...prev, progress }));
          });
        } else {
          // For decoding, read as text and process
          setState(prev => ({ ...prev, input: content }));
          result = await Base64ChunkProcessor.decodeFile(content, state.variant, (progress) => {
            setState(prev => ({ ...prev, progress }));
          });
        }

        if (result.success) {
          setState(prev => ({
            ...prev,
            output: result.data,
            processing: false,
            progress: 100
          }));
        } else {
          setState(prev => ({
            ...prev,
            error: result.error || 'File processing failed',
            processing: false
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'File reading failed',
          processing: false
        }));
      }
    };

    reader.onerror = () => {
      setState(prev => ({ ...prev, error: 'Failed to read file', processing: false }));
    };

    reader.readAsText(file);
  }, [state.action, state.variant]);

  const handleClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      input: '',
      output: '',
      error: '',
      inputFile: null,
      inputFileName: '',
      progress: null
    }));
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.output);

      // Add visual feedback
      if (outputRef.current) {
        outputRef.current.classList.add('copy-success');
        setTimeout(() => {
          outputRef.current?.classList.remove('copy-success');
        }, 500);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setState(prev => ({ ...prev, error: 'Failed to copy to clipboard' }));
    }
  }, [state.output]);

  const handleQuickEncode = useCallback(() => {
    if (!state.input.trim()) return;
    setState(prev => ({
      ...prev,
      action: 'encode',
      output: '',
      error: ''
    }));
    setTimeout(handleProcess, 0);
  }, [state.input, handleProcess]);

  const handleQuickDecode = useCallback(() => {
    if (!state.input.trim()) return;
    setState(prev => ({
      ...prev,
      action: 'decode',
      output: '',
      error: ''
    }));
    setTimeout(handleProcess, 0);
  }, [state.input, handleProcess]);

  const handleSwapInputOutput = useCallback(() => {
    setState(prev => ({
      ...prev,
      input: prev.output,
      output: '',
      action: prev.action === 'encode' ? 'decode' : 'encode',
      error: ''
    }));
  }, []);

  const handleDownload = useCallback(() => {
    const filename = state.action === 'encode'
      ? `encoded-${state.variant}.txt`
      : `decoded-${state.variant}.txt`;

    const blob = new Blob([state.output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.output, state.action, state.variant]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="crypto-tool">
      <div className="crypto-tool-header">
        <h3>Base64 Encoder/Decoder</h3>
        <p>
          Encode or decode data using Base64 encoding with support for Standard, URL-safe, and MIME variants.
          Handles files up to 50MB with real-time progress tracking.
        </p>
      </div>

      <div className="crypto-tool-body">
        {/* Options Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Options</h4>
          </div>

          <div className="options-grid">
            {/* Action Selection */}
            <div className="option-field">
              <label>Action:</label>
              <select
                value={state.action}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  action: e.target.value as 'encode' | 'decode',
                  output: '',
                  error: ''
                }))}
                disabled={state.processing}
              >
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
              </select>
            </div>

            {/* Variant Selection */}
            <div className="option-field">
              <label>Base64 Variant:</label>
              <select
                value={state.variant}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  variant: e.target.value as Base64Variant,
                  autoDetectVariant: false
                }))}
                disabled={state.processing || (state.action === 'decode' && state.autoDetectVariant)}
              >
                <option value="standard">Standard Base64</option>
                <option value="url-safe">URL-safe Base64</option>
                <option value="mime">MIME Base64</option>
              </select>
              {state.action === 'decode' && (
                <div className="checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={state.autoDetectVariant}
                      onChange={(e) => setState(prev => ({ ...prev, autoDetectVariant: e.target.checked }))}
                      disabled={state.processing}
                    />
                    Auto-detect variant
                  </label>
                </div>
              )}
            </div>

            {/* Line Ending (for MIME) */}
            {state.variant === 'mime' && (
              <div className="option-field">
                <label>Line Endings:</label>
                <select
                  value={state.lineEnding}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    lineEnding: e.target.value as LineEnding
                  }))}
                  disabled={state.processing}
                >
                  <option value="lf">LF (Unix/Mac)</option>
                  <option value="crlf">CRLF (Windows)</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>
              Input {state.inputSize > 0 && `(${formatFileSize(state.inputSize)})`}
            </h4>
            <div className="section-actions">
              <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileInput}
                accept="*/*"
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

          {state.inputFileName && (
            <div className="file-info">
              📄 {state.inputFileName} ({formatFileSize(state.inputSize)})
              {state.inputSize > 10 * 1024 * 1024 && (
                <span className="large-file-warning">
                  ⚠️ Large file detected. Processing may take some time.
                </span>
              )}
            </div>
          )}

          {/* Drag and drop area */}
          <div
            className={`file-upload-area ${state.processing ? 'disabled' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              const files = Array.from(e.dataTransfer.files);
              if (files.length > 0) {
                const file = files[0];

                if (file.size > MAX_FILE_SIZE) {
                  setState(prev => ({
                    ...prev,
                    error: `File too large. Max ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB supported.`
                  }));
                  return;
                }

                // Create a synthetic event to trigger file processing
                const syntheticEvent = {
                  target: { files: [file] }
                } as React.ChangeEvent<HTMLInputElement>;
                handleFileInput(syntheticEvent);
              }
            }}
            onClick={() => !state.processing && inputFileRef.current?.click()}
          >
            <div>
              📁 <strong>Drop files here</strong> or click to browse
            </div>
            <small>
              Supports any file type up to {Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB
            </small>
          </div>

          <textarea
            value={state.input}
            onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
            placeholder={state.action === 'encode'
              ? "Enter text to encode to Base64..."
              : "Enter Base64 text to decode..."
            }
            className="input-textarea"
            rows={8}
            disabled={state.processing}
          />

          {state.action === 'decode' && state.input && (
            <div className="input-validation">
              <div>
                <span className="size-display">
                  Format: <strong>{Base64Validation.detectVariant(state.input)}</strong>
                </span>
                {state.autoDetectVariant && (
                  <span className="auto-detected"> (Auto-detected)</span>
                )}
              </div>
              <div className="size-display">
                Est. decoded size: <strong>{formatFileSize(Base64Validation.estimateDecodedSize(state.input))}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="crypto-tool-actions">
          <button
            onClick={handleProcess}
            disabled={state.processing || !state.input.trim()}
            className="button button-primary"
          >
            {state.processing ? (
              <>
                <span className="processing-spinner"></span>
                Processing...
              </>
            ) : (
              `${state.action === 'encode' ? '🔐' : '🔓'} ${state.action.charAt(0).toUpperCase() + state.action.slice(1)}`
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {state.input && !state.processing && (
            <>
              <button
                onClick={handleQuickEncode}
                className="quick-action-btn"
                disabled={state.action === 'encode'}
              >
                🔐 Quick Encode
              </button>
              <button
                onClick={handleQuickDecode}
                className="quick-action-btn"
                disabled={state.action === 'decode'}
              >
                🔓 Quick Decode
              </button>
            </>
          )}
          {state.output && !state.processing && (
            <button
              onClick={handleSwapInputOutput}
              className="quick-action-btn"
            >
              🔄 Swap ↔
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {state.progress !== null && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${state.progress}%` }}
              />
            </div>
            <div className="progress-text">
              {Math.round(state.progress)}% complete
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
              <h4>
                Output {state.outputSize > 0 && `(${formatFileSize(state.outputSize)})`}
              </h4>
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
              ref={outputRef}
              value={state.output}
              readOnly
              className="output-textarea"
              rows={8}
            />

            <div className="output-stats">
              <small>
                Characters: {state.output.length.toLocaleString()} |
                Lines: {state.output.split('\n').length} |
                Variant: {state.variant}
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Additional styles for this component */}
      <style jsx>{`
        .validation-info {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: var(--ifm-color-info-contrast-background);
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .checkbox-field {
          margin-top: 0.5rem;
        }

        .checkbox-field label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .output-stats {
          margin-top: 1rem;
          padding: 0.5rem;
          background: var(--ifm-color-emphasis-100);
          border-radius: 4px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};