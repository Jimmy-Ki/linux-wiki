import React from 'react';
import styles from './styles.module.css';

const toolsCategories = [
  {
    title: 'Cryptography & Security',
    description: 'Encryption, encoding, and hashing tools',
    icon: '🔐',
    tools: [
      { title: 'Password Generator', description: 'Strong passwords with customizable options', path: '/tools/password', status: 'available' },
      { title: 'Encryption Tools', description: 'Base64, AES, MD5, SHA, Caesar cipher and more', path: '/tools/encryption', status: 'available' },
      { title: 'Hash Generator', description: 'Various hash functions and algorithms', path: '/tools/hash', status: 'available' },
    ]
  },
  {
    title: 'Network & IP Tools',
    description: 'Network diagnostics and IP utilities',
    icon: '🌐',
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
    icon: '💻',
    tools: [
      { title: 'Regex Tester', description: 'Test regex patterns in real-time', path: '/tools/regex', status: 'available' },
      { title: 'JSON Formatter', description: 'Format and validate JSON data', path: '/tools/json', status: 'available' },
      { title: 'Markdown Editor', description: 'Live preview markdown editor', path: '/tools/markdown', status: 'coming-soon' },
      { title: 'UUID Generator', description: 'Generate unique identifiers', path: '/tools/uuid', status: 'available' },
      { title: 'Base64 Encoder', description: 'Encode and decode Base64 text', path: '/tools/base64', status: 'available' },
    ]
  },
  {
    title: 'Linux Utilities',
    description: 'Linux-specific tools and helpers',
    icon: '🐧',
    tools: [
      { title: 'Command Generator', description: 'Cron jobs, systemd helpers', path: '/tools/linux-commands', status: 'coming-soon' },
    ]
  },
  {
    title: 'Creative & Fun',
    description: 'Entertainment and creative tools',
    icon: '🎨',
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
    icon: '🧮',
    tools: [
      { title: 'Scientific Calculator', description: 'Advanced calculator with functions', path: '/tools/calculator', status: 'coming-soon' },
      { title: 'Color Picker', description: 'Color tools & palette generator', path: '/tools/color', status: 'available' },
      { title: 'Timezone Converter', description: 'World clock & timezone converter', path: '/tools/timezone', status: 'unavailable' },
      { title: 'File Converter', description: 'Image & file format converter', path: '/tools/converter', status: 'unavailable' },
    ]
  },
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'available':
      return { color: '#10b981', text: 'Available', icon: '✅' };
    case 'unavailable':
      return { color: '#ef4444', text: 'Unavailable', icon: '❌' };
    case 'suspended':
      return { color: '#f59e0b', text: 'Suspended', icon: '⏸️' };
    case 'coming-soon':
      return { color: '#6b7280', text: 'Coming Soon', icon: '🚧' };
    default:
      return { color: '#6b7280', text: 'Unknown', icon: '❓' };
  }
};

function ToolCard({ tool }) {
  const statusConfig = getStatusConfig(tool.status);
  const isClickable = tool.status === 'available';

  if (isClickable) {
    return (
      <a href={tool.path} className={styles.toolCard}>
        <div className={styles.toolContent}>
          <h3 className={styles.toolTitle}>{tool.title}</h3>
          <p className={styles.toolDescription}>{tool.description}</p>
        </div>
        <div className={styles.statusBadge} style={{ backgroundColor: statusConfig.color }}>
          <span className={styles.statusIcon}>{statusConfig.icon}</span>
          <span className={styles.statusText}>{statusConfig.text}</span>
        </div>
      </a>
    );
  }

  return (
    <div className={`${styles.toolCard} ${styles.disabled}`}>
      <div className={styles.toolContent}>
        <h3 className={styles.toolTitle}>{tool.title}</h3>
        <p className={styles.toolDescription}>{tool.description}</p>
      </div>
      <div className={styles.statusBadge} style={{ backgroundColor: statusConfig.color }}>
        <span className={styles.statusIcon}>{statusConfig.icon}</span>
        <span className={styles.statusText}>{statusConfig.text}</span>
      </div>
    </div>
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
  // Count total tools
  const totalTools = toolsCategories.reduce((sum, category) => sum + category.tools.length, 0);

  return (
    <div className={styles.toolsContainer}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Linux Wiki Tools Collection</h1>
          <p className={styles.subtitle}>
            {totalTools}+ free online tools for developers, sysadmins, and tech enthusiasts.
            All tools run in your browser - no server required!
          </p>
          <div className={styles.stats}>
            <span>{totalTools}+ Tools</span>
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