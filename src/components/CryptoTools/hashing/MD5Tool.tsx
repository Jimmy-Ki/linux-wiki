import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { HashingUtils } from './HashingUtils';
import { HashFormat, ProcessingState, MAX_FILE_SIZE } from './HashingTypes';
import { batchHashFiles } from './HashingUtils';
import '../ui/CryptoTools.css';

export const MD5Tool: React.FC = () => {
  const [state, setState] = useState<ProcessingState>({
    input: '',
    hashResults: { hex: '', base64: '', base64url: '' },
    selectedFormat: 'hex',
    processing: false,
    error: '',
    progress: null,
    inputFile: null,
    inputFileName: '',
    inputSize: 0,
    compareHash: '',
    compareResult: null,
    batchFiles: [],
    batchResults: [],
    processingTime: 0
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // Calculate sizes when input changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      inputSize: new Blob([prev.input]).size
    }));
  }, [state.input]);

  // Generate all format hashes when hex result is available
  useEffect(() => {
    if (state.hashResults.hex) {
      try {
        const base64 = HashingUtils.convertFormat(state.hashResults.hex, 'hex', 'base64');
        const base64url = HashingUtils.convertFormat(state.hashResults.hex, 'hex', 'base64url');

        setState(prev => ({
          ...prev,
          hashResults: {
            ...prev.hashResults,
            base64,
            base64url
          }
        }));
      } catch (error) {
        console.error('Error converting hash formats:', error);
      }
    }
  }, [state.hashResults.hex]);

  const validateInput = useCallback((): string | null => {
    if (!state.input.trim() && !state.inputFile) {
      return 'Please enter text or select a file to hash';
    }
    return null;
  }, [state.input, state.inputFile]);

  const handleHash = useCallback(async () => {
    const error = validateInput();
    if (error) {
      setState(prev => ({ ...prev, error, processing: false }));
      return;
    }

    setState(prev => ({
      ...prev,
      processing: true,
      error: '',
      progress: 0,
      hashResults: { hex: '', base64: '', base64url: '' },
      processingTime: 0
    }));

    const startTime = Date.now();

    try {
      let hash = '';

      if (state.inputFile) {
        // Hash file
        hash = await HashingUtils.hashFileMD5(state.inputFile, (progress) => {
          setState(prev => ({ ...prev, progress }));
        });
      } else {
        // Hash text
        hash = await HashingUtils.hashMD5(state.input);
        setState(prev => ({ ...prev, progress: 100 }));
      }

      const processingTime = Date.now() - startTime;

      setState(prev => ({
        ...prev,
        hashResults: { ...prev.hashResults, hex: hash },
        processing: false,
        processingTime,
        compareResult: state.compareHash ?
          (HashingUtils.compareHashes(hash, state.compareHash) ? 'match' : 'mismatch') :
          null
      }));

      setTimeout(() => {
        setState(prev => ({ ...prev, progress: null }));
      }, 1000);

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Hashing failed',
        processing: false
      }));
    }
  }, [state.input, state.inputFile, state.compareHash, validateInput]);

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
      input: '',
      error: ''
    }));
  }, []);

  const handleBatchInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setState(prev => ({
        ...prev,
        error: `${oversizedFiles.length} file(s) too large. Max ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB per file.`
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      batchFiles: files,
      error: ''
    }));
  }, []);

  const handleBatchProcess = useCallback(async () => {
    if (state.batchFiles.length === 0) return;

    setState(prev => ({ ...prev, processing: true, error: '', batchResults: [] }));

    try {
      const results = await batchHashFiles(
        state.batchFiles,
        'md5',
        state.selectedFormat,
        (current, total, fileName) => {
          setState(prev => ({
            ...prev,
            progress: (current / total) * 100,
            error: `Processing ${fileName} (${current}/${total})`
          }));
        }
      );

      setState(prev => ({
        ...prev,
        batchResults: results,
        processing: false,
        progress: null,
        error: ''
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Batch processing failed',
        processing: false,
        progress: null
      }));
    }
  }, [state.batchFiles, state.selectedFormat]);

  const handleClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      input: '',
      hashResults: { hex: '', base64: '', base64url: '' },
      error: '',
      inputFile: null,
      inputFileName: '',
      progress: null,
      compareHash: '',
      compareResult: null,
      batchFiles: [],
      batchResults: [],
      processingTime: 0
    }));
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    if (batchInputRef.current) {
      batchInputRef.current.value = '';
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(state.hashResults[state.selectedFormat]);

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
  }, [state.hashResults, state.selectedFormat]);

  const handleDownload = useCallback(() => {
    const currentHash = state.hashResults[state.selectedFormat];
    if (!currentHash) return;

    const blob = new Blob([currentHash], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `md5-${state.selectedFormat}-${state.inputFileName || 'hash'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.hashResults, state.selectedFormat, state.inputFileName]);

  const handleCompare = useCallback(() => {
    const currentHash = state.hashResults[state.selectedFormat];
    if (!currentHash || !state.compareHash) {
      setState(prev => ({ ...prev, compareResult: null }));
      return;
    }

    const isMatch = HashingUtils.compareHashes(currentHash, state.compareHash);
    setState(prev => ({ ...prev, compareResult: isMatch ? 'match' : 'mismatch' }));
  }, [state.hashResults, state.selectedFormat, state.compareHash]);

  const downloadBatchResults = useCallback(() => {
    if (state.batchResults.length === 0) return;

    const csvContent = 'File Name,File Size,Hash,Format,Algorithm,Processing Time (ms)\n' +
      state.batchResults.map(result =>
        `"${result.file.name}",${result.file.size},"${result.hash}",${result.format},${result.algorithm},${result.processingTime}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `md5-batch-results-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.batchResults]);

  return (
    <div className="crypto-tool">
      <div className="crypto-tool-header">
        <h3>MD5 Hash Calculator</h3>
        <p>
          Calculate MD5 hashes for text and files with support for hex, base64, and base64url formats.
          Handles files up to 100MB with progress tracking and batch processing capabilities.
          <strong>Note: MD5 is considered cryptographically broken and should only be used for non-security purposes.</strong>
        </p>
        <div className="category-badge category-hashing">Hashing</div>
      </div>

      <div className="crypto-tool-body">
        {/* Options Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Options</h4>
          </div>

          <div className="options-grid">
            {/* Format Selection */}
            <div className="option-field">
              <label>Output Format:</label>
              <select
                value={state.selectedFormat}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  selectedFormat: e.target.value as HashFormat
                }))}
                disabled={state.processing}
              >
                <option value="hex">Hexadecimal</option>
                <option value="base64">Base64</option>
                <option value="base64url">Base64URL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>
              Input {state.inputSize > 0 && `(${HashingUtils.formatFileSize(state.inputSize)})`}
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
              📄 {state.inputFileName} ({HashingUtils.formatFileSize(state.inputSize)})
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
            onChange={(e) => setState(prev => ({ ...prev, input: e.target.value, inputFile: null, inputFileName: '' }))}
            placeholder="Enter text to hash with MD5..."
            className="input-textarea"
            rows={8}
            disabled={state.processing}
          />
        </div>

        {/* Action Button */}
        <div className="crypto-tool-actions">
          <button
            onClick={handleHash}
            disabled={state.processing || (!state.input.trim() && !state.inputFile)}
            className="button button-primary"
          >
            {state.processing ? (
              <>
                <span className="processing-spinner"></span>
                Hashing...
              </>
            ) : (
              '🔐 Calculate MD5'
            )}
          </button>
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
        {state.hashResults.hex && (
          <div className="crypto-tool-section success">
            <div className="section-header">
              <h4>
                MD5 Hash ({state.selectedFormat.toUpperCase()})
                {state.processingTime > 0 && ` - ${state.processingTime}ms`}
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
              value={state.hashResults[state.selectedFormat]}
              readOnly
              className="output-textarea"
              rows={4}
            />

            <div className="encoding-comparison">
              <div className="comparison-item">
                <div className="comparison-label">Hexadecimal:</div>
                <div className="comparison-value">{state.hashResults.hex}</div>
              </div>
              <div className="comparison-item">
                <div className="comparison-label">Base64:</div>
                <div className="comparison-value">{state.hashResults.base64}</div>
              </div>
              <div className="comparison-item">
                <div className="comparison-label">Base64URL:</div>
                <div className="comparison-value">{state.hashResults.base64url}</div>
              </div>
            </div>
          </div>
        )}

        {/* Compare Hashes Section */}
        {state.hashResults.hex && (
          <div className="crypto-tool-section">
            <div className="section-header">
              <h4>Compare Hashes</h4>
            </div>

            <div className="options-grid">
              <div className="option-field">
                <label>Hash to Compare:</label>
                <input
                  type="text"
                  value={state.compareHash}
                  onChange={(e) => setState(prev => ({ ...prev, compareHash: e.target.value }))}
                  placeholder="Enter hash to compare..."
                />
              </div>
            </div>

            <div className="crypto-tool-actions">
              <button
                onClick={handleCompare}
                disabled={!state.compareHash.trim()}
                className="button button-secondary"
              >
                ⚖️ Compare
              </button>
            </div>

            {state.compareResult && (
              <div className={state.compareResult === 'match' ? 'success-container' : 'error-container'}>
                <strong>
                  {state.compareResult === 'match' ? '✅ Hashes Match' : '❌ Hashes Do Not Match'}
                </strong>
              </div>
            )}
          </div>
        )}

        {/* Batch Processing Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Batch Processing</h4>
            <div className="section-actions">
              <input
                ref={batchInputRef}
                type="file"
                onChange={handleBatchInput}
                accept="*/*"
                multiple
                style={{ display: 'none' }}
                id="batch-input"
              />
              <label htmlFor="batch-input" className="button button-secondary">
                📁 Select Files
              </label>
              {state.batchFiles.length > 0 && (
                <>
                  <button
                    onClick={handleBatchProcess}
                    disabled={state.processing}
                    className="button button-primary"
                  >
                    {state.processing ? (
                      <>
                        <span className="processing-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      `🔐 Process ${state.batchFiles.length} Files`
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {state.batchFiles.length > 0 && (
            <div className="file-info">
              📁 {state.batchFiles.length} file(s) selected
            </div>
          )}

          {state.batchResults.length > 0 && (
            <>
              <div className="section-actions">
                <button onClick={downloadBatchResults} className="button button-secondary">
                  💾 Download CSV
                </button>
              </div>

              <div className="batch-results">
                {state.batchResults.map((result, index) => (
                  <div key={index} className="file-info">
                    <div>
                      📄 {result.file.name} ({HashingUtils.formatFileSize(result.file.size)})
                    </div>
                    <div>
                      <strong>{result.hash}</strong> ({result.processingTime}ms)
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .success-container {
          padding: 1rem;
          background: var(--ifm-color-success-contrast-background);
          border: 1px solid var(--ifm-color-success-contrast-foreground);
          border-radius: 4px;
          color: var(--ifm-color-success-contrast-foreground);
          margin: 1rem 0;
        }

        .batch-results {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
          max-height: 300px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};