import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToolResult } from '../base/types';
import '../ui/CryptoTools.css';

interface UUIDToolProps {
  className?: string;
}

export const UUIDTool: React.FC<UUIDToolProps> = ({ className }) => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'4' | '1'>('4');

  const generateUUIDs = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(uuidv4());
    }
    setUuids(newUuids);
  };

  const clearUUIDs = () => {
    setUuids([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  const copyAllUUIDs = () => {
    const allUUIDs = uuids.join('\n');
    navigator.clipboard.writeText(allUUIDs).then(() => {
      // Could add a toast notification here
    });
  };

  const downloadUUIDs = () => {
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

  return (
    <div className={`crypto-tool ${className}`}>
      <div className="crypto-tool-header">
        <h3>UUID Generator</h3>
        <p>Generate universally unique identifiers (UUIDs) for various purposes.</p>
      </div>

      <div className="crypto-tool-body">
        {/* Configuration Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>Configuration</h4>
          </div>

          <div className="options-grid">
            <div className="option-field">
              <label>UUID Version:</label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as '4' | '1')}
                disabled={uuids.length > 0}
              >
                <option value="4">Version 4 (Random)</option>
                <option value="1">Version 1 (Time-based)</option>
              </select>
            </div>

            <div className="option-field">
              <label>Number of UUIDs:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                disabled={uuids.length > 0}
              />
            </div>
          </div>

          <div className="crypto-tool-actions">
            {uuids.length === 0 ? (
              <button
                onClick={generateUUIDs}
                className="button button-primary"
              >
                🎲 Generate {count} UUID{count !== 1 ? 's' : ''}
              </button>
            ) : (
              <div className="crypto-tool-actions">
                <button
                  onClick={generateUUIDs}
                  className="button button-secondary"
                >
                  🔄 Generate New
                </button>
                <button
                  onClick={clearUUIDs}
                  className="button button-secondary"
                >
                  🗑️ Clear
                </button>
                <button
                  onClick={copyAllUUIDs}
                  className="button button-secondary"
                >
                  📋 Copy All
                </button>
                <button
                  onClick={downloadUUIDs}
                  className="button button-secondary"
                >
                  💾 Download
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {uuids.length > 0 && (
          <div className="crypto-tool-section">
            <div className="section-header">
              <h4>Generated UUIDs ({uuids.length})</h4>
            </div>

            <div className="uuid-list">
              {uuids.map((uuid, index) => (
                <div key={index} className="uuid-item">
                  <code className="uuid-text">{uuid}</code>
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="button button-secondary copy-button"
                    title="Copy UUID"
                  >
                    📋
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="crypto-tool-section">
          <div className="section-header">
            <h4>About UUIDs</h4>
          </div>

          <div className="info-content">
            <p><strong>UUID Version 4:</strong> Randomly generated UUIDs. Most commonly used for general purposes.</p>
            <p><strong>UUID Version 1:</strong> Time-based UUIDs that include the current timestamp and MAC address.</p>
            <p><strong>Format:</strong> 8-4-4-4-12 hexadecimal digits separated by hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000)</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .uuid-list {
          max-height: 400px;
          overflow-y: auto;
          border: 1px solid var(--ifm-color-emphasis-300);
          border-radius: 4px;
          padding: 1rem;
          background: var(--ifm-background-color);
        }

        .uuid-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          background: var(--ifm-color-emphasis-100);
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.9rem;
        }

        .uuid-item:last-child {
          margin-bottom: 0;
        }

        .uuid-text {
          flex: 1;
          color: var(--ifm-color-emphasis-900);
          word-break: break-all;
        }

        .copy-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
          min-width: auto;
        }

        .info-content {
          color: var(--ifm-color-emphasis-700);
          line-height: 1.6;
        }

        .info-content p {
          margin-bottom: 0.5rem;
        }

        .info-content strong {
          color: var(--ifm-color-emphasis-900);
        }
      `}</style>
    </div>
  );
};