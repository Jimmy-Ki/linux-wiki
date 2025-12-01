import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import styles from './styles.module.css';
import {
  IconCopy,
  IconDownload,
  IconRefresh,
  IconEye,
  IconCode,
  IconFileDescription,
  IconGitBranch,
  IconTimeline,
  IconCalendar,
  IconGitMerge,
  IconGitPullRequest,
  IconChartDots3,
  IconChartPie,
  IconBox,
  IconDevices,
  IconGraph,
  IconTransform
} from '@tabler/icons-react';

export default function MermaidEditor() {
  const [code, setCode] = useState('');
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('default');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme,
      securityLevel: 'loose',
      fontFamily: 'monospace',
      fontSize: 14,
    });
  }, [theme]);

  // Sample diagrams
  const sampleDiagrams = [
    {
      name: 'Flowchart',
      icon: <IconGraph size={20} />,
      code: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`,
    description: 'Basic flowchart example'
    },
    {
      name: 'Sequence Diagram',
      icon: <IconGitPullRequest size={20} />,
      code: `sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Click button
    Frontend->>Backend: API request
    Backend->>Database: Query data
    Database-->>Backend: Return data
    Backend-->>Frontend: JSON response
    Frontend-->>User: Display results`,
      description: 'User authentication flow'
    },
    {
      name: 'Gantt Chart',
      icon: <IconCalendar size={20} />,
      code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Research           :a1, 2024-01-01, 30d
    Design             :a2, after a1, 20d
    section Phase 2
    Development        :a3, after a2, 40d
    Testing            :a4, after a3, 15d
    section Phase 3
    Deployment         :a5, after a4, 10d`,
      description: 'Project management timeline'
    },
    {
      name: 'Class Diagram',
      icon: <IconBox size={20} />,
      code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
      description: 'Object-oriented design'
    },
    {
      name: 'State Diagram',
      icon: <IconTransform size={20} />,
      code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]: Moving
    Still --> Moving: Move
    Moving --> Still: Stop`,
      description: 'State transitions'
    },
    {
      name: 'ER Diagram',
      icon: <IconDevices size={20} />,
      code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
        string name
        string email
        string phone
    }
    ORDER {
        int orderNumber
        date orderDate
        string status
    }
    LINE-ITEM {
        string productCode
        int quantity
        float price
    }`,
      description: 'Database relationships'
    },
    {
      name: 'Journey Map',
      icon: <IconTimeline size={20} />,
      code: `journey
    title Customer Journey
    section Discovery
      Research websites: 5: User
      Compare options: 3: User
    section Purchase
      Add to cart: 2: User
      Complete checkout: 5: User
    section Support
      Contact support: 3: User
      Resolve issue: 4: User`,
      description: 'User experience mapping'
    },
    {
      name: 'Git Graph',
      icon: <IconGitBranch size={20} />,
      code: `gitGraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature
    commit`,
      description: 'Git branching strategy'
    }
  ];

  useEffect(() => {
    if (code.trim()) {
      renderDiagram();
    } else {
      setSvgContent('');
      setError('');
    }
  }, [code, theme]);

  const renderDiagram = async () => {
    try {
      // Generate unique ID for the diagram
      const id = `mermaid-${Date.now()}`;

      // Validate and render the diagram
      const { svg } = await mermaid.render(id, code);
      setSvgContent(svg);
      setError('');
    } catch (err) {
      setError(`Mermaid rendering error: ${err.message}`);
      setSvgContent('');
    }
  };

  const loadSample = (sample) => {
    setCode(sample.code);
    setIsPreviewMode(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadSVG = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCode = () => {
    if (!code.trim()) return;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.mmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCode('');
    setSvgContent('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Mermaid Live Editor</h1>
          <p>Create beautiful diagrams and charts with real-time preview</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={styles.select}
            >
              <option value="default">Default</option>
              <option value="base">Base</option>
              <option value="dark">Dark</option>
              <option value="forest">Forest</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={styles.button}
            >
              <IconEye size={16} />
              {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>

            <button onClick={clearAll} className={styles.button}>
              <IconRefresh size={16} />
              Clear
            </button>

            <button onClick={() => copyToClipboard(code)} className={styles.button}>
              <IconCopy size={16} />
              Copy Code
            </button>

            <button onClick={downloadCode} className={styles.button}>
              <IconDownload size={16} />
              Save Code
            </button>

            <button onClick={downloadSVG} className={styles.button} disabled={!svgContent}>
              <IconDownload size={16} />
              Export SVG
            </button>
          </div>
        </div>

        <div className={styles.samples}>
          <h3>Sample Diagrams</h3>
          <div className={styles.sampleGrid}>
            {sampleDiagrams.map((sample, index) => (
              <button
                key={index}
                onClick={() => loadSample(sample)}
                className={styles.sampleCard}
              >
                <div className={styles.sampleIcon}>{sample.icon}</div>
                <div className={styles.sampleContent}>
                  <h4>{sample.name}</h4>
                  <p>{sample.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.editorPanel}>
            <div className={styles.panelHeader}>
              <h3>
                <IconCode size={18} />
                Mermaid Code
              </h3>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your Mermaid diagram code here..."
              className={styles.textarea}
              rows={20}
            />
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.panelHeader}>
              <h3>
                <IconFileDescription size={18} />
                Preview
              </h3>
            </div>
            <div className={styles.preview}>
              {error ? (
                <div className={styles.error}>
                  <strong>Rendering Error:</strong>
                  <pre>{error}</pre>
                </div>
              ) : svgContent ? (
                <div
                  className={styles.diagram}
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : (
                <div className={styles.placeholder}>
                  Your diagram preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.reference}>
          <h3>Quick Reference</h3>
          <div className={styles.referenceGrid}>
            <div className={styles.referenceCategory}>
              <h4>Basic Syntax</h4>
              <ul>
                <li><code>graph TD</code> - Top to Bottom</li>
                <li><code>graph LR</code> - Left to Right</li>
                <li><code>A --> B</code> - Arrow</li>
                <li><code>A -- Text --> B</code> - Arrow with text</li>
              </ul>
            </div>
            <div className={styles.referenceCategory}>
              <h4>Shapes</h4>
              <ul>
                <li><code>A[Text]</code> - Rectangle</li>
                <li><code>A(Text)</code> - Rounded</li>
                <li><code>A{Text}</code> - Diamond</li>
                <li><code>A((Text))</code> - Circle</li>
              </ul>
            </div>
            <div className={styles.referenceCategory}>
              <h4>Links</h4>
              <ul>
                <li><code>A --> B</code> - Arrow</li>
                <li><code>A --- B</code> - Line</li>
                <li><code>A -.-> B</code> - Dotted</li>
                <li><code>A ==> B</code> - Thick</li>
              </ul>
            </div>
            <div className={styles.referenceCategory}>
              <h4>Subgraphs</h4>
              <ul>
                <li><code>subgraph Title</code></li>
                <li><code>  A --> B</code></li>
                <li><code>end</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}