import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Base64Tool,
  HexTool,
  Base32Tool,
  Base58Tool,
  MD5Tool,
  SHA256Tool,
  SHA512Tool,
  AESTool,
  DESTool,
  CaesarCipherTool,
  ROTTool
} from './index';
import './ui/CryptoToolsPage.css';

interface ToolInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  component: React.ComponentType;
  icon: string;
}

const cryptoTools: ToolInfo[] = [
  {
    id: 'base64',
    name: 'Base64',
    description: 'Encode/decode Base64 strings',
    category: 'Encoders & Decoders',
    component: Base64Tool,
    icon: '🔤'
  },
  {
    id: 'hex',
    name: 'Hexadecimal',
    description: 'Encode/decode hexadecimal strings',
    category: 'Encoders & Decoders',
    component: HexTool,
    icon: '🔢'
  },
  {
    id: 'base32',
    name: 'Base32',
    description: 'Encode/decode Base32 strings',
    category: 'Encoders & Decoders',
    component: Base32Tool,
    icon: '📝'
  },
  {
    id: 'base58',
    name: 'Base58',
    description: 'Encode/decode Base58 strings (Bitcoin)',
    category: 'Encoders & Decoders',
    component: Base58Tool,
    icon: '₿'
  },
  {
    id: 'md5',
    name: 'MD5',
    description: 'Generate MD5 hash (legacy)',
    category: 'Hashing & Checksums',
    component: MD5Tool,
    icon: '#️⃣'
  },
  {
    id: 'sha256',
    name: 'SHA-256',
    description: 'Generate SHA-256 hash',
    category: 'Hashing & Checksums',
    component: SHA256Tool,
    icon: '🔐'
  },
  {
    id: 'sha512',
    name: 'SHA-512',
    description: 'Generate SHA-512 hash',
    category: 'Hashing & Checksums',
    component: SHA512Tool,
    icon: '🔒'
  },
  {
    id: 'aes',
    name: 'AES',
    description: 'AES encryption/decryption',
    category: 'Modern Symmetric Crypto',
    component: AESTool,
    icon: '🔑'
  },
  {
    id: 'des',
    name: 'DES',
    description: 'DES encryption/decryption (legacy)',
    category: 'Modern Symmetric Crypto',
    component: DESTool,
    icon: '🗝️'
  },
  {
    id: 'caesar-cipher',
    name: 'Caesar Cipher',
    description: 'Classical Caesar cipher with brute force attacks and frequency analysis',
    category: 'Classical Ciphers',
    component: CaesarCipherTool,
    icon: '🏛️'
  },
  {
    id: 'rot-cipher',
    name: 'ROT Cipher',
    description: 'ROT13, ROT5, ROT18, ROT47 with auto-detection and batch processing',
    category: 'Classical Ciphers',
    component: ROTTool,
    icon: '🔄'
  }
];

const categories = [
  'All Tools',
  'Encoders & Decoders',
  'Modern Symmetric Crypto',
  'Hashing & Checksums',
  'Asymmetric Crypto',
  'KDF & MAC',
  'Classical Ciphers',
  'CTF & Esoteric',
  'Web & Network Tools',
  'Image & Steganography',
  'Developer Misc'
];

export const CryptoToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = cryptoTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All Tools' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedToolInfo = cryptoTools.find(tool => tool.id === selectedTool);
  const SelectedToolComponent = selectedToolInfo?.component;

  return (
    <div className="crypto-tools-page">
      <div className="crypto-tools-header">
        <h1>Cryptography Tools Suite</h1>
        <p>A comprehensive collection of cryptographic tools for encoding, encryption, hashing, and more.</p>
      </div>

      {!selectedTool ? (
        <>
          {/* Search and Filters */}
          <div className="crypto-tools-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search crypto tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={clsx('category-filter', {
                    'active': selectedCategory === category
                  })}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="crypto-tools-grid">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="tool-card"
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-content">
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span className="tool-category">{tool.category}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="no-results">
              <h3>No tools found</h3>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
        </>
      ) : (
        /* Individual Tool View */
        <div className="individual-tool-view">
          <button
            onClick={() => setSelectedTool(null)}
            className="back-button"
          >
            ← Back to Tools
          </button>

          {SelectedToolComponent && <SelectedToolComponent />}
        </div>
      )}
    </div>
  );
};

export default CryptoToolsPage;