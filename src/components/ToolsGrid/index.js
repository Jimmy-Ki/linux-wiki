import React from 'react';
import styles from './styles.module.css';

const toolsCategories = [
  {
    title: 'Cryptography & Security',
    description: '89+ encryption, encoding, and security tools',
    icon: 'Lock',
    tools: [
      { title: 'Crypto Tools Suite', description: '89+ encryption, hashing, encoding tools', path: '/crypto-tools', difficulty: 'easy' },
      { title: 'Encoders & Decoders', description: 'Base64, Base32, URL, HTML encoding (17 tools)', path: '/crypto-tools#encoders', difficulty: 'easy' },
      { title: 'Modern Crypto', description: 'AES, RSA, ChaCha20, ECC encryption (21 tools)', path: '/crypto-tools#modern', difficulty: 'medium' },
      { title: 'Hashing & Ciphers', description: 'MD5, SHA, Caesar, Vigenère, CTF tools (38 tools)', path: '/crypto-tools#ciphers', difficulty: 'medium' },
    ]
  },
  {
    title: 'Network & IP Tools',
    description: 'Network diagnostics and IP utilities',
    icon: 'Globe',
    tools: [
      { title: 'IP Lookup', description: 'IP geolocation and info', path: '/tools/ip-lookup', difficulty: 'easy' },
      { title: 'WHOIS Lookup', description: 'Domain information', path: '/tools/whois', difficulty: 'medium' },
      { title: 'Network Tools', description: 'Ping, port scanner, DNS', path: '/tools/network', difficulty: 'hard' },
      { title: 'URL Shortener', description: 'Create short links', path: '/tools/url-shortener', difficulty: 'medium' },
    ]
  },
  {
    title: 'Developer Tools',
    description: 'Coding and development utilities',
    icon: 'Code',
    tools: [
      { title: 'Regex Tester', description: 'Test regex patterns', path: '/tools/regex', difficulty: 'medium' },
      { title: 'JSON Formatter', description: 'Format and validate JSON', path: '/tools/json', difficulty: 'easy' },
      { title: 'Markdown Editor', description: 'Live preview editor', path: '/tools/markdown', difficulty: 'easy' },
      { title: 'Hash Generator', description: 'Various hash functions', path: '/tools/hash', difficulty: 'medium' },
    ]
  },
  {
    title: 'Linux Utilities',
    description: 'Linux-specific tools and helpers',
    icon: 'Terminal',
    tools: [
      { title: 'Command Generator', description: 'Cron, systemd helpers', path: '/tools/linux-commands', difficulty: 'medium' },
    ]
  },
  {
    title: 'Creative & Fun',
    description: 'Entertainment and creative tools',
    icon: 'Palette',
    tools: [
      { title: 'ASCII Art', description: 'Text to ASCII generator', path: '/tools/ascii-art', difficulty: 'easy' },
      { title: 'Meme Generator', description: 'Create funny memes', path: '/tools/meme', difficulty: 'medium' },
      { title: '2048 Game', description: 'Classic puzzle game', path: '/tools/2048', difficulty: 'medium' },
      { title: 'Fun Tools', description: 'Productivity calculators', path: '/tools/fun', difficulty: 'medium' },
    ]
  },
  {
    title: 'Converters & Calculators',
    description: 'Unit conversion and calculation tools',
    icon: 'Calculator',
    tools: [
      { title: 'Calculator', description: 'Scientific calculator', path: '/tools/calculator', difficulty: 'medium' },
      { title: 'Color Picker', description: 'Color tools & palettes', path: '/tools/color', difficulty: 'easy' },
      { title: 'Timezone Converter', description: 'World clock & timezone', path: '/tools/timezone', difficulty: 'medium' },
      { title: 'File Converter', description: 'Image & file conversion', path: '/tools/converter', difficulty: 'hard' },
    ]
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy': return '#10b981'; // green
    case 'medium': return '#f59e0b'; // amber
    case 'hard': return '#ef4444'; // red
    default: return '#6b7280'; // gray
  }
};

function ToolCard({ tool }) {
  return (
    <a href={tool.path} className={styles.toolCard}>
      <div className={styles.toolContent}>
        <h3 className={styles.toolTitle}>{tool.title}</h3>
        <p className={styles.toolDescription}>{tool.description}</p>
      </div>
      <div className={styles.difficultyBadge} style={{ backgroundColor: getDifficultyColor(tool.difficulty) }}>
        {tool.difficulty}
      </div>
    </a>
  );
}

function ToolsCategory({ category }) {
  return (
    <div className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryIcon}>{category.icon}</span>
        <div>
          <h2 className={styles.categoryTitle}>{category.title}</h2>
          <p className={styles.categoryDescription}>{category.description}</p>
        </div>
      </div>
      <div className={styles.toolsGrid}>
        {category.tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsGrid() {
  return (
    <div className={styles.toolsContainer}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Linux Wiki Tools Collection</h1>
          <p className={styles.subtitle}>
            89+ free online crypto and security tools for developers, sysadmins, and tech enthusiasts.
            All tools run in your browser - no server required!
          </p>
          <div className={styles.stats}>
            <span>89+ Crypto Tools</span>
            <span>Free Forever</span>
            <span>Privacy First</span>
          </div>
        </div>

        {toolsCategories.map((category, index) => (
          <ToolsCategory key={index} category={category} />
        ))}
      </div>
    </div>
  );
}