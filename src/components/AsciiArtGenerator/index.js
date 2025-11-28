import React, { useState, useRef } from 'react';
import { IconCopy, IconDownload, IconTypography, IconUpload, IconPhoto, IconAdjustments, IconAlertTriangle } from '@tabler/icons-react';
import styles from './styles.module.css';

// ASCII character sets for different densities
const ASCII_SETS = {
  standard: ' .:-=+*#%@',
  simple: ' .oO0@',
  blocks: ' ░▒▓█',
  dots: ' ·∙●',
  binary: ' 01',
  letters: ' abcdefghijklmnopqrstuvwxyz'
};

// Pre-defined ASCII art templates
const ASCII_TEMPLATES = [
  {
    name: 'Cat',
    art: `   /\\_/\\
  ( o.o )
   > ^ <  `
  },
  {
    name: 'Dog',
    art: ` / \\__
(    @\\___
 /         O
/   (_____/
/_____/   U`
  },
  {
    name: 'Heart',
    art: `  ******       ******
**********   **********
************* ************
*****************************
 ***************************
  *************************
    *********************
      *****************
        *************
          *********
            *****
              *
              *`
  },
  {
    name: 'Smiley',
    art: `   .-"-.
  /     \\
 |       |
 |   o   |
  \\     /
   "-.-"`
  }
];

export default function AsciiArtGenerator() {
  const [inputText, setInputText] = useState('');
  const [asciiOutput, setAsciiOutput] = useState('');
  const [selectedSet, setSelectedSet] = useState('standard');
  const [fontSize, setFontSize] = useState(12);
  const [customImage, setCustomImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const outputRef = useRef(null);

  const textToAscii = (text, charset) => {
    if (!text) return '';

    const chars = charset.split('');
    const result = text.split('').map((char, index) => {
      const charCode = char.charCodeAt(0);
      const asciiChar = chars[charCode % chars.length];
      return asciiChar.repeat(Math.max(1, Math.ceil(charCode / 30)));
    });

    return result.join('');
  };

  const imageToAscii = (image, charset, maxWidth = 80) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio = image.height / image.width;
    canvas.width = maxWidth;
    canvas.height = Math.floor(maxWidth * aspectRatio * 0.5); // Adjust for character aspect ratio

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const chars = charset.split('');
    let ascii = '';

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const offset = (y * canvas.width + x) * 4;
        const r = pixels[offset];
        const g = pixels[offset + 1];
        const b = pixels[offset + 2];
        const brightness = (r + g + b) / 3;

        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
        ascii += chars[chars.length - 1 - charIndex];
      }
      ascii += '\n';
    }

    return ascii;
  };

  const handleTextToAscii = () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setError('');
    const charset = ASCII_SETS[selectedSet];
    const ascii = textToAscii(inputText.toUpperCase(), charset);
    setAsciiOutput(ascii);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setError('');
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        setCustomImage(img);
        const charset = ASCII_SETS[selectedSet];
        const ascii = imageToAscii(img, charset);
        setAsciiOutput(ascii);
        setIsProcessing(false);
      };

      img.onerror = () => {
        setError('Failed to load uploaded image');
        setIsProcessing(false);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleTemplateSelect = (template) => {
    setAsciiOutput(template.art);
    setError('');
  };

  const copyToClipboard = () => {
    if (!asciiOutput) return;

    navigator.clipboard.writeText(asciiOutput).then(() => {
      // Could add a toast notification here
    }).catch(() => {
      // Fallback for older browsers
      if (outputRef.current) {
        const textArea = document.createElement('textarea');
        textArea.value = asciiOutput;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    });
  };

  const downloadAscii = () => {
    if (!asciiOutput) return;

    const blob = new Blob([asciiOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `ascii-art-${Date.now()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setInputText('');
    setAsciiOutput('');
    setCustomImage(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconTypography size={32} /> ASCII Art Generator</h1>
          <p>Convert text and images to ASCII art</p>
        </div>

        <div className={styles.content}>
          <div className={styles.inputSection}>
            <div className={styles.tabContainer}>
              <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.active}`}>Text</button>
                <button className={styles.tab}>Image</button>
                <button className={styles.tab}>Templates</button>
              </div>
            </div>

            {/* Text Input */}
            <div className={styles.textSection}>
              <h3>Text to ASCII</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here..."
                className={styles.textarea}
                rows={4}
              />
              <button onClick={handleTextToAscii} className={styles.convertButton}>
                Convert to ASCII
              </button>
            </div>

            {/* Image Input */}
            <div className={styles.imageSection}>
              <h3>Image to ASCII</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
              >
                <IconUpload size={16} />
                Upload Image
              </button>
              {isProcessing && <p className={styles.processing}>Processing image...</p>}
            </div>

            {/* Templates */}
            <div className={styles.templatesSection}>
              <h3>ASCII Templates</h3>
              <div className={styles.templates}>
                {ASCII_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateSelect(template)}
                    className={styles.templateButton}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <h3>ASCII Output</h3>
              <div className={styles.outputActions}>
                <button
                  onClick={copyToClipboard}
                  disabled={!asciiOutput}
                  className={styles.actionButton}
                >
                  <IconCopy size={16} />
                  Copy
                </button>
                <button
                  onClick={downloadAscii}
                  disabled={!asciiOutput}
                  className={styles.actionButton}
                >
                  <IconDownload size={16} />
                  Download
                </button>
                <button onClick={resetAll} className={styles.actionButton}>
                  Reset
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.error}>
                <IconAlertTriangle size={16} />
                {error}
              </div>
            )}

            <div className={styles.outputWrapper}>
              <pre
                ref={outputRef}
                className={styles.asciiOutput}
                style={{ fontSize: `${fontSize}px` }}
              >
                {asciiOutput || 'Your ASCII art will appear here...'}
              </pre>
            </div>

            <div className={styles.settings}>
              <h4><IconAdjustments size={16} /> Settings</h4>

              <div className={styles.setting}>
                <label htmlFor="charset">Character Set</label>
                <select
                  id="charset"
                  value={selectedSet}
                  onChange={(e) => setSelectedSet(e.target.value)}
                  className={styles.select}
                >
                  <option value="standard">Standard</option>
                  <option value="simple">Simple</option>
                  <option value="blocks">Blocks</option>
                  <option value="dots">Dots</option>
                  <option value="binary">Binary</option>
                  <option value="letters">Letters</option>
                </select>
              </div>

              <div className={styles.setting}>
                <label htmlFor="fontSize">Font Size: {fontSize}px</label>
                <input
                  id="fontSize"
                  type="range"
                  min="8"
                  max="20"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h4>Features</h4>
            <ul>
              <li>Convert text to ASCII art</li>
              <li>Transform images to ASCII</li>
              <li>Multiple character sets</li>
              <li>Pre-made ASCII templates</li>
              <li>Copy and download functionality</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h4>Tips</h4>
            <ul>
              <li>Simple text works best for text-to-ASCII</li>
              <li>High-contrast images give better results</li>
              <li>Smaller images are processed faster</li>
              <li>Try different character sets for unique styles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}