import React, { useState, useEffect, lazy, Suspense } from 'react';
import Icon from '@site/src/components/Icon';
import styles from './styles.module.css';

// 动态导入所有工具组件
const PasswordGenerator = lazy(() => import('../../components/PasswordGenerator'));
const UnifiedCryptoTool = lazy(() => import('../../components/UnifiedCryptoTool'));
const HashGenerator = lazy(() => import('../../components/HashGenerator'));
const IPLookup = lazy(() => import('../../components/IPLookup'));
const RegexTester = lazy(() => import('../../components/RegexTester'));
const JSONFormatter = lazy(() => import('../../components/JSONFormatter'));
const MarkdownEditor = lazy(() => import('../../components/MarkdownEditor'));
const UUIDGenerator = lazy(() => import('../../components/UUIDGenerator'));
const Base64Encoder = lazy(() => import('../../components/Base64Encoder'));
const LinuxCommandsGenerator = lazy(() => import('../../components/LinuxCommandsGenerator'));
const QRCodeGenerator = lazy(() => import('../../components/QRCodeGenerator'));
const AsciiArtGenerator = lazy(() => import('../../components/AsciiArtGenerator'));
const MemeGenerator = lazy(() => import('../../components/MemeGenerator'));
const PetPetGenerator = lazy(() => import('../../components/PetPetGenerator'));
const EmojiGenerator = lazy(() => import('../../components/EmojiGenerator'));
const Game2048 = lazy(() => import('../../components/Game2048'));
const ScientificCalculator = lazy(() => import('../../components/ScientificCalculator'));
const ColorPicker = lazy(() => import('../../components/ColorPicker'));
const TimezoneConverter = lazy(() => import('../../components/TimezoneConverter'));
const MermaidEditor = lazy(() => import('../../components/MermaidEditor'));
const UMLEditor = lazy(() => import('../../components/UMLEditor'));

const toolsCategories = [
  {
    title: 'Cryptography & Security',
    description: 'Encryption, encoding, and hashing tools',
    icon: 'security',
    tools: [
      { title: 'Password Generator', description: 'Strong passwords with customizable options', path: '/tools/password', status: 'available', icon: 'password' },
      { title: 'Encryption Tools', description: 'Base64, AES, MD5, SHA, Caesar cipher and more', path: '/tools/encryption', status: 'available', icon: 'base64' },
      { title: 'Hash Generator', description: 'Various hash functions and algorithms', path: '/tools/hash', status: 'available', icon: 'hash' },
    ]
  },
  {
    title: 'Network & IP Tools',
    description: 'Network diagnostics and IP utilities',
    icon: 'network',
    tools: [
      { title: 'IP Address', description: 'Get your current IP address', path: '/tools/ip', status: 'available', icon: 'network' },
      { title: 'Network Tools', description: 'Ping, port scanner, DNS tools', path: '/tools/network', status: 'unavailable', icon: 'settings' },
      { title: 'URL Shortener', description: 'Create short links service', path: '/tools/url-shortener', status: 'unavailable', icon: 'link' },
    ]
  },
  {
    title: 'Developer Tools',
    description: 'Coding and development utilities',
    icon: 'code',
    tools: [
      { title: 'Mermaid Editor', description: 'Create flowcharts, sequence diagrams & charts', path: '/tools/mermaid', status: 'available', icon: 'chart' },
      { title: 'UML Designer', description: 'Professional UML diagram designer with templates', path: '/tools/uml', status: 'available', icon: 'diagram' },
      { title: 'Regex Tester', description: 'Test regex patterns in real-time', path: '/tools/regex', status: 'available', icon: 'regex' },
      { title: 'JSON Formatter', description: 'Format and validate JSON data', path: '/tools/json', status: 'available', icon: 'json' },
      { title: 'Markdown Editor', description: 'Live preview markdown editor', path: '/tools/markdown', status: 'available', icon: 'markdown' },
      { title: 'UUID Generator', description: 'Generate unique identifiers', path: '/tools/uuid', status: 'available', icon: 'uuid' },
      { title: 'Base64 Encoder', description: 'Encode and decode Base64 text', path: '/tools/base64', status: 'available', icon: 'base64' },
    ]
  },
  {
    title: 'Linux Utilities',
    description: 'Linux-specific tools and helpers',
    icon: 'linux',
    tools: [
      { title: 'Command Generator', description: 'Cron jobs, systemd helpers', path: '/tools/linux-commands', status: 'available', icon: 'cpu' },
    ]
  },
  {
    title: 'Creative & Fun',
    description: 'Entertainment and creative tools',
    icon: 'creative',
    tools: [
      { title: 'QR Code Generator', description: 'Create custom QR codes', path: '/tools/qrcode', status: 'available', icon: 'qrcode' },
      { title: 'ASCII Art', description: 'Text to ASCII generator', path: '/tools/ascii-art', status: 'available', icon: 'ascii' },
      { title: 'Meme Generator', description: 'Create funny memes with text', path: '/tools/meme', status: 'unavailable', icon: 'image' },
      { title: 'PetPet Generator', description: 'Create patting head GIF memes', path: '/tools/petpet', status: 'unavailable', icon: 'image' },
      { title: 'Emoji Generator', description: 'Find and copy emojis easily', path: '/tools/emoji-generator', status: 'unavailable', icon: 'color' },
      { title: '2048 Game', description: 'Classic 2048 puzzle game', path: '/tools/2048', status: 'available', icon: 'games' },
    ]
  },
  {
    title: 'Converters & Calculators',
    description: 'Unit conversion and calculation tools',
    icon: 'calculator',
    tools: [
      { title: 'Scientific Calculator', description: 'Advanced calculator with functions', path: '/tools/calculator', status: 'available', icon: 'calculator' },
      { title: 'Color Picker', description: 'Color tools & palette generator', path: '/tools/color', status: 'available', icon: 'color' },
      { title: 'Timezone Converter', description: 'World clock & timezone converter', path: '/tools/timezone', status: 'available', icon: 'time' },
    ]
  },
];

// 组件映射
const componentMap = {
  '/tools/password': PasswordGenerator,
  '/tools/encryption': UnifiedCryptoTool,
  '/tools/hash': HashGenerator,
  '/tools/ip': IPLookup,
  '/tools/regex': RegexTester,
  '/tools/json': JSONFormatter,
  '/tools/markdown': MarkdownEditor,
  '/tools/uuid': UUIDGenerator,
  '/tools/base64': Base64Encoder,
  '/tools/linux-commands': LinuxCommandsGenerator,
  '/tools/qrcode': QRCodeGenerator,
  '/tools/ascii-art': AsciiArtGenerator,
  '/tools/meme': MemeGenerator,
  '/tools/petpet': PetPetGenerator,
  '/tools/emoji-generator': EmojiGenerator,
  '/tools/2048': Game2048,
  '/tools/calculator': ScientificCalculator,
  '/tools/color': ColorPicker,
  '/tools/timezone': TimezoneConverter,
  '/tools/mermaid': MermaidEditor,
  '/tools/uml': UMLEditor,
};

const getStatusConfig = (status) => {
  switch (status) {
    case 'available':
      return { color: '#10b981', text: 'Available', className: 'stateAvailable' };
    case 'unavailable':
      return { color: '#ef4444', text: 'Unavailable', className: 'stateUnavailable' };
    case 'suspended':
      return { color: '#f59e0b', text: 'Suspended', className: 'stateSuspended' };
    case 'coming-soon':
      return { color: '#6b7280', text: 'Coming Soon', className: 'stateComingSoon' };
    default:
      return { color: '#6b7280', text: 'Unknown', className: '' };
  }
};

function SidebarTool({ tool, isActive, onClick }) {
  const statusConfig = getStatusConfig(tool.status);
  const isClickable = tool.status === 'available';

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(tool);
    }
  };

  return (
    <div
      className={`${styles.sidebarTool} ${isActive ? styles.active : ''} ${!isClickable ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      <div className={styles.toolMain}>
        <div className={styles.titleRow}>
          <div className={styles.toolIcon}>
            <Icon name={tool.icon} size="small" />
          </div>
          <h4
            className={`${styles.toolTitle} ${styles.tooltip}`}
            data-tooltip={tool.title}
          >
            {tool.title}
          </h4>
        </div>
        <p
          className={`${styles.toolDescription} ${styles.tooltip}`}
          data-tooltip={tool.description}
        >
          {tool.description}
        </p>
      </div>
      <div className={styles.statusIndicator} style={{ backgroundColor: statusConfig.color }}>
      </div>
    </div>
  );
}

function SidebarCategory({ category, selectedTool, onToolSelect, expandedCategories, toggleCategory }) {
  const isExpanded = expandedCategories.includes(category.title);

  return (
    <div className={styles.sidebarCategory}>
      <div
        className={styles.categoryHeader}
        onClick={() => toggleCategory(category.title)}
      >
        <div className={styles.categoryIcon}>
          <Icon name={category.icon} size="medium" />
        </div>
        <h3 className={styles.categoryTitle}>{category.title}</h3>
        <Icon
          name={isExpanded ? "refresh" : "settings"}
          size="small"
          className={styles.chevron}
        />
      </div>
      {isExpanded && (
        <div className={styles.categoryTools}>
          {category.tools.map((tool, index) => (
            <SidebarTool
              key={index}
              tool={tool}
              isActive={selectedTool?.path === tool.path}
              onClick={onToolSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarContent({ selectedTool, onToolSelect, expandedCategories, toggleCategory }) {
  const totalTools = toolsCategories.reduce((sum, category) => sum + category.tools.length, 0);

  return (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Icon name="linux" size="large" />
          <h2>Linux Wiki Tools</h2>
        </div>
        <div className={styles.stats}>
          <span className={styles.statItem}>{totalTools}+ Tools</span>
          <span className={styles.statItem}>Free Forever</span>
        </div>
      </div>

      <div className={styles.categoriesList}>
        {toolsCategories.map((category, index) => (
          <SidebarCategory
            key={index}
            category={category}
            selectedTool={selectedTool}
            onToolSelect={onToolSelect}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
          />
        ))}
      </div>
    </div>
  );
}

// 加载占位组件
function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading tool...</p>
    </div>
  );
}

function MainContent({ selectedTool, onClearSelection }) {
  const [ToolComponent, setToolComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 当选中的工具改变时，动态加载组件
  useEffect(() => {
    if (!selectedTool || selectedTool.status !== 'available') {
      setToolComponent(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // 获取对应的组件
    const Component = componentMap[selectedTool.path];

    if (Component) {
      setToolComponent(() => Component);
      setLoading(false);
    } else {
      setError('Tool component not found');
      setLoading(false);
    }
  }, [selectedTool]);

  if (!selectedTool) {
    // Most popular tools
    const popularTools = [
      { title: 'Mermaid Editor', description: 'Create beautiful diagrams', path: '/tools/mermaid', icon: 'chart' },
      { title: 'UML Designer', description: 'Professional UML diagrams', path: '/tools/uml', icon: 'diagram' },
      { title: 'Regex Tester', description: 'Test patterns in real-time', path: '/tools/regex', icon: 'regex' },
      { title: 'Password Generator', description: 'Create strong passwords', path: '/tools/password', icon: 'password' },
      { title: 'JSON Formatter', description: 'Format & validate JSON', path: '/tools/json', icon: 'json' },
      { title: 'QR Code Generator', description: 'Generate QR codes', path: '/tools/qrcode', icon: 'qrcode' },
      { title: 'Encryption Tools', description: 'Encode & encrypt data', path: '/tools/encryption', icon: 'base64' },
      { title: 'Hash Generator', description: 'Generate various hashes', path: '/tools/hash', icon: 'hash' },
      { title: 'Markdown Editor', description: 'Live preview editor', path: '/tools/markdown', icon: 'markdown' }
    ];

    return (
      <div className={styles.overviewContent}>
        <div className={styles.overviewHeader}>
          <h1 className={styles.overviewTitle}>Free Online Tools for Developers</h1>
          <p className={styles.overviewSubtitle}>
            Choose a tool from the sidebar to get started. All tools are browser-based,
            privacy-focused, and completely free to use.
          </p>
          <div className={styles.overviewStats}>
            <div className={styles.overviewStat}>
              <div className={styles.statNumber}>27+</div>
              <div className={styles.statLabel}>Tools</div>
            </div>
            <div className={styles.overviewStat}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Categories</div>
            </div>
            <div className={styles.overviewStat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Private</div>
            </div>
          </div>
        </div>

        <div className={styles.popularTools}>
          <h2 className={styles.sectionTitle}>Most Popular Tools</h2>
          <div className={styles.popularToolsGrid}>
            {popularTools.map((tool, index) => (
              <button
                key={index}
                className={styles.popularToolCard}
                onClick={() => setSelectedTool(tool)}
              >
                <div className={styles.popularToolIcon}>
                  <Icon name={tool.icon} size="large" />
                </div>
                <div className={styles.popularToolContent}>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.overviewFeatures}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Icon name="security" size="medium" />
            </div>
            <h3>Privacy First</h3>
            <p>All tools run locally in your browser. No data ever leaves your device.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Icon name="refresh" size="medium" />
            </div>
            <h3>Lightning Fast</h3>
            <p>Instant results with no server round trips or processing delays.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Icon name="creative" size="medium" />
            </div>
            <h3>Free Forever</h3>
            <p>No ads, no tracking, no premium features. Completely free for everyone.</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTool.status !== 'available') {
    return (
      <div className={styles.toolUnavailable}>
        <div className={styles.unavailableIcon}>
          <Icon name="unavailable" size="large" />
        </div>
        <h2>Tool Coming Soon</h2>
        <p>{selectedTool.title} is currently under development.</p>
        <button
          className={styles.backButton}
          onClick={onClearSelection}
        >
          <Icon name="refresh" size="small" />
          Back to tools
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.toolError}>
        <div className={styles.errorIcon}>
          <Icon name="unavailable" size="large" />
        </div>
        <h2>Error Loading Tool</h2>
        <p>{error}</p>
        <button
          className={styles.backButton}
          onClick={onClearSelection}
        >
          <Icon name="refresh" size="small" />
          Back to tools
        </button>
      </div>
    );
  }

  return (
    <div className={styles.toolContent}>
      <div className={styles.toolHeader}>
        <div className={styles.toolHeaderLeft}>
          <button
            className={styles.backButton}
            onClick={onClearSelection}
          >
            <Icon name="refresh" size="small" />
            <span>Back to Tools</span>
          </button>
          <div className={styles.toolInfo}>
            <div className={styles.toolIcon}>
              <Icon name={selectedTool.icon} size="large" />
            </div>
            <div>
              <h1 className={styles.mainToolTitle}>{selectedTool.title}</h1>
              <p className={styles.mainToolDescription}>{selectedTool.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.toolHeaderRight}>
          <a
            href={selectedTool.path}
            className={styles.externalToolButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="link" size="small" />
            Open in New Tab
          </a>
        </div>
      </div>

      <div className={styles.toolBody}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            {ToolComponent && <ToolComponent />}
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default function ToolsSidebarLayout() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(
    toolsCategories.map(cat => cat.title) // Start with all categories expanded
  );

  const handleToolSelect = (tool) => {
    if (tool.status === 'available') {
      setSelectedTool(tool);
    }
  };

  const handleClearSelection = () => {
    setSelectedTool(null);
  };

  const toggleCategory = (categoryTitle) => {
    setExpandedCategories(prev =>
      prev.includes(categoryTitle)
        ? prev.filter(title => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <SidebarContent
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
        />
      </div>
      <div className={styles.mainContent}>
        <MainContent
          selectedTool={selectedTool}
          onClearSelection={handleClearSelection}
        />
      </div>
    </div>
  );
}