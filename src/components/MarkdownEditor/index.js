import React, { useState, useEffect } from 'react';
import {
  IconMarkdown,
  IconCopy,
  IconDownload,
  IconEye,
  IconEyeOff,
  IconMaximize,
  IconMinimize,
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconHeading,
  IconList,
  IconListNumbers,
  IconQuote,
  IconCode,
  IconLink,
  IconPhoto,
  IconTable
} from '@tabler/icons-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import styles from './styles.module.css';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Editor

This is a **live preview** markdown editor with real-time rendering.

## Features

- **Real-time preview** - See your markdown rendered as you type
- **Syntax highlighting** - Code blocks are beautifully highlighted
- **Export options** - Download your work as HTML or markdown
- **Dark mode support** - Works seamlessly with your theme
- **Full-screen mode** - Focus on your writing

## Code Examples

### Inline Code
Use backticks for \`inline code\`.

### Code Block
\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
}

hello('World');
\`\`\`

### Lists

#### Unordered List
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

#### Ordered List
1. First item
2. Second item
3. Third item

## Formatting

- **Bold text** using two asterisks
- *Italic text* using one asterisk
- ~~Strikethrough~~ using two tildes
- [Links](https://example.com) using square brackets and parentheses

## Blockquote

> This is a blockquote. It's great for highlighting important information
> or quoting external sources.

---

## Tables

| Feature | Status | Description |
|---------|--------|-------------|
| Live Preview | ✅ | See changes instantly |
| Export | ✅ | Download as HTML or MD |
| Dark Mode | ✅ | Theme support |
| Fullscreen | ✅ | Focus mode |

Start typing in the editor on the left to see the magic happen!`);

  const [previewHtml, setPreviewHtml] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const html = marked(markdown, {
      breaks: true,
      gfm: true,
    });
    setPreviewHtml(DOMPurify.sanitize(html));

    // Calculate word and character count
    const words = markdown.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    setCharCount(markdown.length);
  }, [markdown]);

  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
        h1, h2, h3 { color: #333; margin-top: 2rem; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
        pre { background: #f4f4f4; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; padding-left: 1rem; margin: 1rem 0; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 0.5rem; }
    </style>
</head>
<body>
    ${previewHtml}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  const insertMarkdown = (before, after = '') => {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const replacement = before + selectedText + after;

    const newMarkdown = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newMarkdown);

    // Set cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const toolbarActions = [
    {
      icon: IconBold,
      label: 'Bold',
      action: () => insertMarkdown('**', '**')
    },
    {
      icon: IconItalic,
      label: 'Italic',
      action: () => insertMarkdown('*', '*')
    },
    {
      icon: IconStrikethrough,
      label: 'Strikethrough',
      action: () => insertMarkdown('~~', '~~')
    },
    {
      icon: IconHeading,
      label: 'Heading',
      action: () => insertMarkdown('## ', '')
    },
    {
      icon: IconList,
      label: 'Bullet List',
      action: () => insertMarkdown('- ', '')
    },
    {
      icon: IconListNumbers,
      label: 'Numbered List',
      action: () => insertMarkdown('1. ', '')
    },
    {
      icon: IconQuote,
      label: 'Quote',
      action: () => insertMarkdown('> ', '')
    },
    {
      icon: IconCode,
      label: 'Code',
      action: () => insertMarkdown('`', '`')
    },
    {
      icon: IconLink,
      label: 'Link',
      action: () => insertMarkdown('[', '](url)')
    },
    {
      icon: IconPhoto,
      label: 'Image',
      action: () => insertMarkdown('![alt text](', ')')
    },
    {
      icon: IconTable,
      label: 'Table',
      action: () => insertMarkdown('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', '')
    }
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.header}>
        <h1><IconMarkdown size={24} /> Markdown Editor</h1>
        <div className={styles.headerActions}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={styles.previewToggle}
          >
            {showPreview ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={copyToClipboard}
            className={styles.actionButton}
            title="Copy Markdown"
          >
            <IconCopy size={16} /> Copy
          </button>
          <button
            onClick={handleExportMarkdown}
            className={styles.actionButton}
            title="Download as Markdown"
          >
            <IconDownload size={16} /> MD
          </button>
          <button
            onClick={handleExportHtml}
            className={styles.actionButton}
            title="Download as HTML"
          >
            <IconDownload size={16} /> HTML
          </button>
          <button
            onClick={toggleFullscreen}
            className={styles.actionButton}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        {toolbarActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={styles.toolbarButton}
            title={action.label}
          >
            <action.icon size={16} />
          </button>
        ))}
      </div>

      <div className={`${styles.editorContainer} ${!showPreview ? styles.editorOnly : ''}`}>
        <div className={styles.editorPanel}>
          <div className={styles.panelHeader}>
            <h3>Editor</h3>
            <div className={styles.stats}>
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
            </div>
          </div>
          <textarea
            id="markdown-editor"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className={styles.editor}
            placeholder="Start typing your markdown here..."
            spellCheck="false"
          />
        </div>

        {showPreview && (
          <div className={styles.previewPanel}>
            <div className={styles.panelHeader}>
              <h3>Preview</h3>
            </div>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}