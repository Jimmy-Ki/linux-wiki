import React, { useState } from 'react';
import { CryptoTool } from '../base/CryptoTool';
import { CryptoToolConfig } from '../base/types';
import '../ui/CryptoTools.css';

const config: CryptoToolConfig = {
  id: 'json-formatter',
  name: 'JSON Formatter/Minifier',
  description: 'Format, validate, and minify JSON strings with syntax highlighting and error detection.',
  category: 'Developer Misc',
  operation: 'encode'
};

export const JSONFormatterTool: React.FC = () => {
  const [syntaxError, setSyntaxError] = useState<string>('');

  const handleProcess = async (input: string, key?: string, iv?: string, mode?: any, options?: any) => {
    try {
      setSyntaxError('');

      if (!input.trim()) {
        return {
          success: false,
          error: 'Input JSON is required'
        };
      }

      const action = options?.action || 'format';
      const indent = options?.indent === 'tabs' ? '\t' : (options?.indent || 2);

      // Parse the JSON to validate it
      const parsed = JSON.parse(input);

      let result: string;
      if (action === 'format') {
        result = JSON.stringify(parsed, null, indent === 'none' ? 0 : indent);
      } else if (action === 'minify') {
        result = JSON.stringify(parsed);
      } else {
        return {
          success: false,
          error: 'Invalid action. Please select format or minify.'
        };
      }

      return {
        success: true,
        data: result,
        metadata: {
          valid: true,
          action,
          indent,
          originalLength: input.length,
          processedLength: result.length
        }
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'JSON processing failed';
      setSyntaxError(errorMsg);

      return {
        success: false,
        error: `Invalid JSON: ${errorMsg}`
      };
    }
  };

  return (
    <div className="crypto-tool">
      <div className="crypto-tool-header">
        <h3>{config.name}</h3>
        <p>{config.description}</p>
      </div>

      <div className="crypto-tool-body">
        {/* Input Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Input JSON</h4>
          </div>

          <textarea
            id="json-input"
            placeholder="Paste your JSON here..."
            className="input-textarea"
            rows={10}
            style={{ fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace' }}
          />

          {syntaxError && (
            <div className="error-container">
              <strong>JSON Error:</strong> {syntaxError}
            </div>
          )}
        </div>

        {/* Options Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Options</h4>
          </div>

          <div className="options-grid">
            <div className="option-field">
              <label>Action:</label>
              <select id="json-action">
                <option value="format">Format (Pretty Print)</option>
                <option value="minify">Minify (Compress)</option>
              </select>
            </div>

            <div className="option-field" id="indent-options">
              <label>Indentation:</label>
              <select id="json-indent">
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tabs">Tabs</option>
                <option value="none">None (for minify)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Process Button */}
        <div className="crypto-tool-actions">
          <button
            onClick={() => {
              const input = (document.getElementById('json-input') as HTMLTextAreaElement).value;
              const action = (document.getElementById('json-action') as HTMLSelectElement).value;
              const indent = (document.getElementById('json-indent') as HTMLSelectElement).value;

              handleProcess(input, undefined, undefined, undefined, { action, indent }).then(result => {
                if (result.success && result.data) {
                  const output = document.getElementById('json-output') as HTMLTextAreaElement;
                  if (output) {
                    output.value = result.data as string;
                    output.parentElement?.parentElement?.classList.add('success');
                  }
                }
              });
            }}
            className="button button-primary"
          >
            🎨 Format JSON
          </button>
        </div>

        {/* Output Section */}
        <div className="crypto-tool-section" id="json-output-section">
          <div className="section-header">
            <h4>Formatted JSON</h4>
            <div className="section-actions">
              <button
                onClick={() => {
                  const output = document.getElementById('json-output') as HTMLTextAreaElement;
                  if (output?.value) {
                    navigator.clipboard.writeText(output.value);
                  }
                }}
                className="button button-secondary"
              >
                📋 Copy
              </button>
              <button
                onClick={() => {
                  const output = document.getElementById('json-output') as HTMLTextAreaElement;
                  if (output?.value) {
                    const blob = new Blob([output.value], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'formatted.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }
                }}
                className="button button-secondary"
              >
                💾 Download
              </button>
            </div>
          </div>

          <textarea
            id="json-output"
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="output-textarea"
            rows={10}
            style={{ fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace' }}
          />
        </div>

        {/* Information Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>About JSON Formatting</h4>
          </div>

          <div className="info-content" style={{ color: 'var(--ifm-color-emphasis-700)', lineHeight: '1.6' }}>
            <p><strong>Pretty Printing:</strong> Formats JSON with proper indentation for readability.</p>
            <p><strong>Minifying:</strong> Removes unnecessary whitespace to reduce file size.</p>
            <p><strong>Validation:</strong> Checks for proper JSON syntax and provides helpful error messages.</p>
            <p><strong>Best Practices:</strong> Use formatted JSON for development and minified JSON for production.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        #indent-options {
          display: none;
        }

        #json-action[value="format"] ~ #indent-options {
          display: block;
        }

        .info-content strong {
          color: var(--ifm-color-emphasis-900);
        }
      `}</style>
    </div>
  );
};