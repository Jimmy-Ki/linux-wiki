import React, { useState, useEffect, useRef } from 'react';
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
  IconTable,
  IconArrowBackUp,
  IconArrowForwardUp
} from '@tabler/icons-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import styles from './styles.module.css';

export default function MarkdownEditor() {
  const editorRef = useRef(null);
  const previewRef = useRef(null);
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
  const [history, setHistory] = useState([markdown]);
  const [historyIndex, setHistoryIndex] = useState(0);

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

  // Handle body overflow when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Sync scrolling between editor and preview
  const handleEditorScroll = () => {
    if (editorRef.current && previewRef.current) {
      const editor = editorRef.current;
      const preview = previewRef.current;
      const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
    }
  };

  const handlePreviewScroll = () => {
    if (editorRef.current && previewRef.current) {
      const editor = editorRef.current;
      const preview = previewRef.current;
      const scrollPercentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      editor.scrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight);
    }
  };

  // Add to history for undo/redo
  const addToHistory = (newMarkdown) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMarkdown);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  // Select all function
  const selectAll = () => {
    const textarea = document.getElementById('markdown-editor');
    textarea.select();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            redo();
          } else {
            e.preventDefault();
            undo();
          }
          break;
        case 'y':
          e.preventDefault();
          redo();
          break;
        case 'a':
          e.preventDefault();
          selectAll();
          break;
        case 's':
          e.preventDefault();
          handleExportMarkdown();
          break;
        case 'b':
          e.preventDefault();
          insertMarkdown('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', '*');
          break;
        case 'k':
          e.preventDefault();
          insertMarkdown('[', '](url)');
          break;
        default:
          break;
      }
    }
  };

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

    let replacement;

    // Handle smart list toggling
    if ((before === '- ' || before === '1. ') && !selectedText) {
      // Check if current line already has list formatting
      const textBeforeCursor = markdown.substring(0, start);
      const lineStart = textBeforeCursor.lastIndexOf('\n') + 1;
      const currentLine = markdown.substring(lineStart, start);

      if (before === '- ' && currentLine.startsWith('- ')) {
        // Remove bullet list
        const newLine = currentLine.substring(2);
        replacement = newLine;
        const newMarkdown = markdown.substring(0, lineStart) + newLine + markdown.substring(start);
        setMarkdown(newMarkdown);
        addToHistory(newMarkdown);
        setTimeout(() => {
          textarea.setSelectionRange(lineStart + newLine.length, lineStart + newLine.length);
          textarea.focus();
        }, 0);
        return;
      } else if (before === '1. ' && /^\d+\.\s/.test(currentLine)) {
        // Remove numbered list
        const newLine = currentLine.replace(/^\d+\.\s/, '');
        replacement = newLine;
        const newMarkdown = markdown.substring(0, lineStart) + newLine + markdown.substring(start);
        setMarkdown(newMarkdown);
        addToHistory(newMarkdown);
        setTimeout(() => {
          textarea.setSelectionRange(lineStart + newLine.length, lineStart + newLine.length);
          textarea.focus();
        }, 0);
        return;
      }
    }

    // Handle multi-line list formatting
    if ((before === '- ' || before === '1. ') && selectedText.includes('\n')) {
      const lines = selectedText.split('\n');
      if (before === '1. ') {
        // Check if lines are already numbered
        const areAlreadyNumbered = lines.every(line => /^\d+\.\s/.test(line.trim()));
        if (areAlreadyNumbered) {
          // Remove numbering
          replacement = lines.map(line => line.trim().replace(/^\d+\.\s/, '')).join('\n');
        } else {
          // Add numbering
          replacement = lines.map((line, index) => {
            const trimmedLine = line.trim();
            return trimmedLine ? `${index + 1}. ${trimmedLine}` : line;
          }).join('\n');
        }
      } else {
        // Check if lines already have bullets
        const areAlreadyBulleted = lines.every(line => line.trim().startsWith('- '));
        if (areAlreadyBulleted) {
          // Remove bullets
          replacement = lines.map(line => line.trim().substring(2)).join('\n');
        } else {
          // Add bullets
          replacement = lines.map(line => {
            const trimmedLine = line.trim();
            return trimmedLine ? `${before}${trimmedLine}` : line;
          }).join('\n');
        }
      }
    } else {
      replacement = before + selectedText + after;
    }

    const newMarkdown = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newMarkdown);
    addToHistory(newMarkdown);

    // Set cursor position
    setTimeout(() => {
      const newCursorPos = start + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const toolbarActions = [
    {
      icon: IconArrowBackUp,
      label: 'Undo (Ctrl+Z)',
      action: undo,
      disabled: historyIndex <= 0
    },
    {
      icon: IconArrowForwardUp,
      label: 'Redo (Ctrl+Y)',
      action: redo,
      disabled: historyIndex >= history.length - 1
    },
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

  // Handle text input with history
  const handleTextChange = (e) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
    addToHistory(newMarkdown);
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
            className={`${styles.toolbarButton} ${action.disabled ? styles.toolbarButtonDisabled : ''}`}
            title={action.label}
            disabled={action.disabled}
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
            ref={editorRef}
            id="markdown-editor"
            value={markdown}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onScroll={handleEditorScroll}
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
              ref={previewRef}
              className={styles.preview}
              onScroll={handlePreviewScroll}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}