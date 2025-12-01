import React, { useState, useEffect } from 'react';
import { encode } from 'plantuml-encoder';
import styles from './styles.module.css';
import {
  IconCopy,
  IconDownload,
  IconRefresh,
  IconEye,
  IconCode,
  IconCube,
  IconGitPullRequest,
  IconUsers,
  IconGitBranch,
  IconChartDots3,
  IconDevices,
  IconCalendar,
  IconGitMerge,
  IconLifebuoy,
  IconShield
} from '@tabler/icons-react';

export default function UMLEditor() {
  const [code, setCode] = useState('');
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Remove Mermaid initialization - using PlantUML instead

  // PlantUML Templates
  const umlTemplates = [
    {
      name: 'Class Diagram',
      icon: <IconCube size={20} />,
      category: 'Structure',
      code: `@startuml
class Animal {
  +name: String
  +age: int
  +species: String
  +makeSound()
  +eat()
  +sleep()
}
class Dog {
  +breed: String
  +color: String
  +bark()
  +wagTail()
}
class Cat {
  +indoor: boolean
  +meow()
  +purr()
}

Animal <|-- Dog : inherits
Animal <|-- Cat : inherits
Dog "1" -- "*" Toy : has
Cat "1" -- "*" Toy : has

class Toy {
  +name: String
  +type: String
  +play()
}
@enduml`,
      description: 'Object-oriented class relationships'
    },
    {
      name: 'Use Case Diagram',
      icon: <IconUsers size={20} />,
      category: 'Requirements',
      code: `graph TD
    A[System] --> B[User Management]
    A --> C[Order Processing]
    A --> D[Payment Processing]

    E[Admin] --> B
    E --> F[Inventory Management]
    E --> G[Reports]

    H[Customer] --> B
    H --> C
    H --> D
    H --> I[Product Catalog]

    I --> C
    C --> D
    B --> C
    F --> C`,
      description: 'System functionality from user perspective'
    },
    {
      name: 'Sequence Diagram',
      icon: <IconGitPullRequest size={20} />,
      category: 'Behavior',
      code: `sequenceDiagram
    participant User
    participant Frontend as UI
    participant Backend as API
    participant Database as DB
    participant Payment as Pay

    User->>UI: Click Checkout
    UI->>API: POST /checkout
    API->>DB: Validate cart items
    DB-->>API: Cart valid
    API->>DB: Calculate total
    DB-->>API: Total amount
    API->>Pay: Process payment
    Pay-->>API: Payment successful
    API->>DB: Create order
    DB-->>API: Order created
    API-->>UI: Order confirmation
    UI-->>User: Show order details`,
      description: 'Interaction between system components'
    },
    {
      name: 'Activity Diagram',
      icon: <IconChartDots3 size={20} />,
      category: 'Behavior',
      code: `graph TD
    A[Start] --> B{User logged in?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login Page]
    D --> E{Login successful?}
    E -->|Yes| C
    E -->|No| F[Show Error]
    F --> D
    C --> G[Select Action]
    G --> H{Action Type}
    H -->|Profile| I[Edit Profile]
    H -->|Settings| J[Update Settings]
    H -->|Logout| K[Clear Session]
    I --> L[Save Changes]
    J --> L
    K --> M[End]
    L --> G`,
      description: 'Workflow and process flow'
    },
    {
      name: 'Component Diagram',
      icon: <IconDevices size={20} />,
      category: 'Structure',
      code: `graph TB
    subgraph "Frontend"
        A[React App]
        B[Redux Store]
        C[UI Components]
    end

    subgraph "Backend"
        D[Express API]
        E[Authentication]
        F[Business Logic]
        G[Database Layer]
    end

    subgraph "External Services"
        H[Payment Gateway]
        I[Email Service]
        J[CDN]
    end

    A --> B
    A --> C
    A --> D
    D --> E
    D --> F
    F --> G
    F --> H
    F --> I
    C --> J`,
      description: 'System architecture and components'
    },
    {
      name: 'State Diagram',
      icon: <IconGitBranch size={20} />,
      category: 'Behavior',
      code: `stateDiagram-v2
    [*] --> Created
    Created --> Processing: Start
    Processing --> Validated: Validate
    Processing --> Failed: Error
    Validated --> Processing: Revalidate
    Validated --> Completed: Finish
    Failed --> Processing: Retry
    Failed --> Cancelled: Cancel
    Completed --> [*]
    Cancelled --> [*]`,
      description: 'Object lifecycle and states'
    },
    {
      name: 'Package Diagram',
      icon: <IconCalendar size={20} />,
      category: 'Structure',
      code: `graph TB
    subgraph "com.company"
        A[controller]
        B[service]
        C[repository]
        D[model]
    end

    subgraph "com.company.controller"
        E[UserController]
        F[ProductController]
    end

    subgraph "com.company.service"
        G[UserService]
        H[ProductService]
    end

    subgraph "com.company.repository"
        I[UserRepository]
        J[ProductRepository]
    end

    subgraph "com.company.model"
        K[User]
        L[Product]
    end

    E --> G
    F --> H
    G --> I
    H --> J
    I --> K
    J --> L`,
      description: 'Package structure and dependencies'
    },
    {
      name: 'Deployment Diagram',
      icon: <IconShield size={20} />,
      category: 'Deployment',
      code: `graph TB
    subgraph "Cloud Infrastructure"
        A[Load Balancer]
        B[Web Server 1]
        C[Web Server 2]
        D[Application Server]
        E[Database Server]
        F[Cache Server]
    end

    subgraph "External Services"
        G[CDN]
        H[Backup Storage]
        I[Monitoring]
    end

    G --> A
    A --> B
    A --> C
    B --> D
    C --> D
    D --> E
    D --> F
    E --> H
    I --> A
    I --> D
    I --> E`,
      description: 'System deployment architecture'
    },
    {
      name: 'Object Diagram',
      icon: <IconLifebuoy size={20} />,
      category: 'Structure',
      code: `graph TB
    subgraph "Objects at Runtime"
        A[john:User]
        B[order1:Order]
        C[product1:Product]
        D[product2:Product]
        E[cart:ShoppingCart]
    end

    A -.-> B : places
    B -.-> C : contains
    B -.-> D : contains
    A -.-> E : owns
    E -.-> C : adds
    E -.-> D : adds

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#9f9,stroke:#333,stroke-width:2px
    style C fill:#99f,stroke:#333,stroke-width:2px
    style D fill:#99f,stroke:#333,stroke-width:2px
    style E fill:#ff9,stroke:#333,stroke-width:2px`,
      description: 'Object instances and their relationships'
    }
  ];

  useEffect(() => {
    if (code.trim()) {
      generatePlantUML();
    } else {
      setSvgContent('');
      setError('');
    }
  }, [code]);

  const generatePlantUML = () => {
    try {
      // PlantUML编码和URL生成
      const encodedCode = encode(code);
      const plantumlServerUrl = 'https://www.plantuml.com/plantuml/svg/';
      const imageUrl = plantumlServerUrl + encodedCode;

      setSvgContent(imageUrl);
      setError('');
    } catch (err) {
      setError(`PlantUML encoding error: ${err.message}`);
      setSvgContent('');
    }
  };

  const loadTemplate = (template) => {
    setCode(template.code);
    setSelectedTemplate(template.name);
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
    a.download = `uml-diagram-${selectedTemplate}.svg`;
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
    a.download = `uml-diagram-${selectedTemplate}.mmd`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCode('');
    setSvgContent('');
    setError('');
    setSelectedTemplate('');
  };

  const getTemplatesByCategory = () => {
    const categories = {};
    umlTemplates.forEach(template => {
      if (!categories[template.category]) {
        categories[template.category] = [];
      }
      categories[template.category].push(template);
    });
    return categories;
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>UML Diagram Designer</h1>
          <p>Professional UML diagramming tool with templates for all UML diagram types</p>
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

        <div className={styles.templates}>
          <h3>UML Templates</h3>
          {Object.entries(getTemplatesByCategory()).map(([category, templates]) => (
            <div key={category} className={styles.templateCategory}>
              <h4>{category}</h4>
              <div className={styles.templateGrid}>
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className={`${styles.templateCard} ${selectedTemplate === template.name ? styles.active : ''}`}
                  >
                    <div className={styles.templateIcon}>{template.icon}</div>
                    <div className={styles.templateContent}>
                      <h5>{template.name}</h5>
                      <p>{template.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.editorPanel}>
            <div className={styles.panelHeader}>
              <h3>
                <IconCode size={18} />
                UML Code
              </h3>
              {selectedTemplate && (
                <span className={styles.templateIndicator}>{selectedTemplate}</span>
              )}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Select a template or write your UML diagram code here..."
              className={styles.textarea}
              rows={25}
            />
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.panelHeader}>
              <h3>
                <IconEye size={18} />
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
                <img
                  src={svgContent}
                  alt="PlantUML Diagram"
                  className={styles.diagram}
                  onError={(e) => {
                    setError('Failed to load PlantUML diagram. Check your syntax.');
                    setSvgContent('');
                  }}
                />
              ) : (
                <div className={styles.placeholder}>
                  Your UML diagram preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.reference}>
          <h3>UML Diagram Types</h3>
          <div className={styles.referenceGrid}>
            <div className={styles.referenceItem}>
              <h4>📊 Structure Diagrams</h4>
              <p>Class, Object, Component, Package, Deployment diagrams - show static structure</p>
            </div>
            <div className={styles.referenceItem}>
              <h4>🔄 Behavior Diagrams</h4>
              <p>Use Case, Activity, State, Sequence diagrams - show dynamic behavior</p>
            </div>
            <div className={styles.referenceItem}>
              <h4>🎯 Key Concepts</h4>
              <p>Relationships, multiplicities, interfaces, inheritance, composition</p>
            </div>
            <div className={styles.referenceItem}>
              <h4>💡 Best Practices</h4>
              <p>Keep diagrams simple, use consistent notation, focus on relevant details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}