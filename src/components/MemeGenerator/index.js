import React, { useState, useRef, useEffect } from 'react';
import { IconUpload, IconDownload, IconPhoto, IconTypography, IconAdjustments, IconAlertTriangle } from '@tabler/icons-react';
import styles from './styles.module.css';

const DEFAULT_TEMPLATES = [
  {
    id: 'drake',
    name: 'Drake',
    url: 'https://i.imgflip.com/30b1gx.jpg'
  },
  {
    id: 'distracted',
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg'
  },
  {
    id: 'button',
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1bw8sm.jpg'
  },
  {
    id: 'expanding-brain',
    name: 'Expanding Brain',
    url: 'https://i.imgflip.com/1jwhww.jpg'
  },
  {
    id: 'butterfly',
    name: 'Is This a Butterfly?',
    url: 'https://i.imgflip.com/3oevdk.jpg'
  },
  {
    id: 'stonks',
    name: 'Stonks',
    url: 'https://i.imgflip.com/4ok0b.jpg'
  }
];

export default function MemeGenerator() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState('');

  const wrapText = (ctx, text, x, y, maxWidth, lineHeight, isTop = true) => {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const startY = isTop ? y : y - (lines.length - 1) * lineHeight;

    lines.forEach((line, index) => {
      const textY = startY + (isTop ? index : index) * lineHeight;

      // Stroke text for outline
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText(line, x, textY);

      // Fill text
      ctx.fillStyle = 'white';
      ctx.fillText(line, x, textY);
    });

    return lines.length;
  };

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = selectedTemplate || customImage;

    if (!image) {
      // Show placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#666';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Select a template or upload an image', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Clear canvas and set background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image to fill canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Draw top text
    if (topText.trim()) {
      wrapText(ctx, topText.toUpperCase(), canvas.width / 2, 20, canvas.width - 40, fontSize * 1.2, true);
    }

    // Draw bottom text
    if (bottomText.trim()) {
      ctx.textBaseline = 'bottom';
      wrapText(ctx, bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20, canvas.width - 40, fontSize * 1.2, false);
    }
  };

  const loadTemplate = async (template) => {
    setError('');
    setImageLoaded(false);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        setSelectedTemplate(img);
        setCustomImage(null);
        setImageLoaded(true);
        drawMeme();
      };

      img.onerror = () => {
        setError('Failed to load template image');
        setImageLoaded(false);
      };

      img.src = template.url;
    } catch (err) {
      setError('Error loading template');
      setImageLoaded(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setError('');
    setImageLoaded(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        setCustomImage(img);
        setSelectedTemplate(null);
        setImageLoaded(true);
        drawMeme();
      };

      img.onerror = () => {
        setError('Failed to load uploaded image');
        setImageLoaded(false);
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      setError('Failed to read file');
      setImageLoaded(false);
    };

    reader.readAsDataURL(file);
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const resetCanvas = () => {
    setTopText('');
    setBottomText('');
    setSelectedTemplate(null);
    setCustomImage(null);
    setImageLoaded(false);
    setError('');

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    // Initialize canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 500;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#666';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Select a template or upload an image', canvas.width / 2, canvas.height / 2);
    }
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      drawMeme();
    }
  }, [topText, bottomText, fontSize, imageLoaded]);

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconPhoto size={32} /> Meme Generator</h1>
          <p>Create funny memes with custom text overlay</p>
        </div>

        <div className={styles.content}>
          <div className={styles.canvasSection}>
            <div className={styles.canvasWrapper}>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={500}
                height={500}
              />
              {error && (
                <div className={`${styles.error} ${styles.errorMessage}`}>
                  <IconAlertTriangle size={16} />
                  {error}
                </div>
              )}
            </div>

            {(imageLoaded || selectedTemplate || customImage) && (
              <div className={styles.actions}>
                <button
                  onClick={downloadMeme}
                  className={styles.downloadButton}
                >
                  <IconDownload size={16} />
                  Download Meme
                </button>
                <button
                  onClick={resetCanvas}
                  className={styles.resetButton}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className={styles.controls}>
            <div className={styles.controlSection}>
              <h3><IconPhoto size={18} /> Template</h3>

              <div className={styles.uploadSection}>
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
              </div>

              <div className={styles.templates}>
                {DEFAULT_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className={`${styles.templateButton} ${
                      selectedTemplate?.src === template.url ? styles.active : ''
                    }`}
                  >
                    <img
                      src={template.url}
                      alt={template.name}
                      className={styles.thumbnail}
                      crossOrigin="anonymous"
                    />
                    <span>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlSection}>
              <h3><IconTypography size={18} /> Text</h3>

              <div className={styles.inputGroup}>
                <label htmlFor="topText">Top Text</label>
                <input
                  id="topText"
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="Enter top text"
                  className={styles.textInput}
                  maxLength={100}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="bottomText">Bottom Text</label>
                <input
                  id="bottomText"
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Enter bottom text"
                  className={styles.textInput}
                  maxLength={100}
                />
              </div>
            </div>

            <div className={styles.controlSection}>
              <h3><IconAdjustments size={18} /> Settings</h3>

              <div className={styles.inputGroup}>
                <label htmlFor="fontSize">Font Size: {fontSize}px</label>
                <input
                  id="fontSize"
                  type="range"
                  min="20"
                  max="80"
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
            <h4>How to use</h4>
            <ul>
              <li>Select a template from the available options</li>
              <li>Or upload your own custom image</li>
              <li>Add your top and bottom text</li>
              <li>Adjust the font size as needed</li>
              <li>Download your meme when ready</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h4>Tips</h4>
            <ul>
              <li>Keep text short and impactful</li>
              <li>Use ALL CAPS for classic meme style</li>
              <li>Higher contrast images work better</li>
              <li>Popular templates are pre-loaded for quick use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}