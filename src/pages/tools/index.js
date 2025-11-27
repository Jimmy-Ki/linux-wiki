import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import ToolsGrid from '@site/src/components/ToolsGrid';
import { Search, X } from '@tabler/icons-react';

const toolsCategories = [
  {
    title: 'Cryptography & Security',
    description: 'Encryption, encoding, and hashing tools',
    tools: [
      { title: 'Password Generator', description: 'Strong passwords with customizable options', path: '/tools/password', status: 'available' },
      { title: 'Encryption Tools', description: 'Base64, AES, MD5, SHA, Caesar cipher and more', path: '/tools/encryption', status: 'available' },
      { title: 'Hash Generator', description: 'Various hash functions and algorithms', path: '/tools/hash', status: 'available' },
    ]
  },
  {
    title: 'Network & IP Tools',
    description: 'Network diagnostics and IP utilities',
    tools: [
      { title: 'IP Address', description: 'Get your current IP address', path: '/tools/ip', status: 'available' },
      { title: 'WHOIS Lookup', description: 'Domain information lookup service', path: '/tools/whois', status: 'unavailable' },
      { title: 'Network Tools', description: 'Ping, port scanner, DNS tools', path: '/tools/network', status: 'unavailable' },
      { title: 'URL Shortener', description: 'Create short links service', path: '/tools/url-shortener', status: 'unavailable' },
    ]
  },
  {
    title: 'Developer Tools',
    description: 'Coding and development utilities',
    tools: [
      { title: 'Regex Tester', description: 'Test regex patterns in real-time', path: '/tools/regex', status: 'available' },
      { title: 'JSON Formatter', description: 'Format and validate JSON data', path: '/tools/json', status: 'available' },
      { title: 'Markdown Editor', description: 'Live preview markdown editor', path: '/tools/markdown', status: 'coming-soon' },
      { title: 'UUID Generator', description: 'Generate unique identifiers', path: '/tools/uuid', status: 'available' },
      { title: 'Base64 Encoder', description: 'Encode and decode Base64 text', path: '/tools/base64', status: 'available' },
    ]
  },
  {
    title: 'Creative & Fun',
    description: 'Entertainment and creative tools',
    tools: [
      { title: 'QR Code Generator', description: 'Create custom QR codes', path: '/tools/qrcode', status: 'available' },
      { title: 'ASCII Art', description: 'Text to ASCII generator', path: '/tools/ascii-art', status: 'available' },
      { title: 'Meme Generator', description: 'Create funny memes with text', path: '/tools/meme', status: 'unavailable' },
      { title: '2048 Game', description: 'Classic 2048 puzzle game', path: '/tools/2048', status: 'coming-soon' },
    ]
  },
  {
    title: 'Converters & Calculators',
    description: 'Unit conversion and calculation tools',
    tools: [
      { title: 'Scientific Calculator', description: 'Advanced calculator with functions', path: '/tools/calculator', status: 'coming-soon' },
      { title: 'Color Picker', description: 'Color tools & palette generator', path: '/tools/color', status: 'available' },
      { title: 'Timezone Converter', description: 'World clock & timezone converter', path: '/tools/timezone', status: 'unavailable' },
      { title: 'File Converter', description: 'Image & file format converter', path: '/tools/converter', status: 'unavailable' },
    ]
  },
];

function ToolsSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="row margin-bottom--lg">
      <div className="col col--6 col--offset-3">
        <div className="card">
          <div className="card__header">
            <h3>Search Tools</h3>
          </div>
          <div className="card__body">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search for tools... (e.g., password, json, qr)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  fontSize: '16px',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--ifm-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--ifm-color-emphasis-300)'}
              />
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--ifm-color-emphasis-600)'
              }}>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
                <Search size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTools([]);
      return;
    }

    const results = [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    toolsCategories.forEach(category => {
      category.tools.forEach(tool => {
        if (tool.title.toLowerCase().includes(lowerSearchTerm) ||
            tool.description.toLowerCase().includes(lowerSearchTerm)) {
          results.push({
            ...tool,
            category: category.title
          });
        }
      });
    });

    setFilteredTools(results);
  }, [searchTerm]);

  return (
    <Layout
      title="Free Online Tools - Developer & Linux Utilities"
      description="25+ free online tools for developers, sysadmins, and tech enthusiasts. Encryption, network tools, calculators, and more. All tools run in your browser."
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className="hero__title text--center">Linux Wiki Tools Collection</h1>
            <p className="hero__subtitle text--center">
              Free online tools for developers, sysadmins, and tech enthusiasts
            </p>
          </div>
        </div>
      </div>

      <ToolsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredTools.length > 0 && (
        <div className="container margin-bottom--lg">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <div className="card">
                <div className="card__header">
                  <h3>Search Results ({filteredTools.length})</h3>
                </div>
                <div className="card__body">
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {filteredTools.map((tool, index) => (
                      <div
                        key={index}
                        className="card"
                        style={{
                          padding: '16px',
                          cursor: tool.status === 'available' ? 'pointer' : 'not-allowed',
                          opacity: tool.status === 'available' ? 1 : 0.6
                        }}
                        onClick={() => {
                          if (tool.status === 'available') {
                            window.location.href = tool.path;
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0' }}>{tool.title}</h4>
                            <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-700)', fontSize: '14px' }}>
                              {tool.description}
                            </p>
                            <small style={{ color: 'var(--ifm-color-emphasis-600)' }}>
                              Category: {tool.category}
                            </small>
                          </div>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: tool.status === 'available' ? '#10b981' :
                                               tool.status === 'coming-soon' ? '#6b7280' : '#ef4444',
                            color: 'white'
                          }}>
                            {tool.status === 'available' ? 'Available' :
                             tool.status === 'coming-soon' ? 'Coming Soon' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchTerm && filteredTools.length === 0 && (
        <div className="container margin-bottom--lg">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="card">
                <div className="card__body text--center">
                  <Search size={32} style={{ color: 'var(--ifm-color-emphasis-500)', marginBottom: '16px' }} />
                  <h3>No tools found</h3>
                  <p>Try searching for terms like "password", "json", "qr", "hash", etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToolsGrid />
    </Layout>
  );
}