import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import styles from './styles.module.css';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://linux.wiki');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(256);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
  const [margin, setMargin] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFormats, setDownloadFormats] = useState({
    png: true,
    jpg: false,
    svg: false
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    generateQRCode();
  }, [text, size, darkColor, lightColor, errorCorrectionLevel, margin]);

  const generateQRCode = async () => {
    if (!text.trim()) {
      setQrCodeUrl('');
      return;
    }

    setIsGenerating(true);
    try {
      const options = {
        width: size,
        margin: margin,
        color: {
          dark: darkColor,
          light: lightColor
        },
        errorCorrectionLevel: errorCorrectionLevel
      };

      const url = await QRCode.toDataURL(text, options);
      setQrCodeUrl(url);

      // Also draw on canvas for other formats
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, options);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setQrCodeUrl('');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async (format) => {
    if (!qrCodeUrl) return;

    try {
      let blob;
      let fileName;

      switch (format) {
        case 'png':
          const response = await fetch(qrCodeUrl);
          blob = await response.blob();
          fileName = 'qrcode.png';
          break;
        case 'jpg':
          const canvas = canvasRef.current;
          if (canvas) {
            // Convert to JPEG by creating a new canvas with white background
            const jpgCanvas = document.createElement('canvas');
            jpgCanvas.width = size;
            jpgCanvas.height = size;
            const ctx = jpgCanvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(canvas, 0, 0);

            blob = await new Promise(resolve => {
              jpgCanvas.toBlob(resolve, 'image/jpeg', 0.95);
            });
            fileName = 'qrcode.jpg';
          }
          break;
        case 'svg':
          const svgString = await QRCode.toString(text, {
            type: 'svg',
            width: size,
            margin: margin,
            color: {
              dark: darkColor,
              light: lightColor
            },
            errorCorrectionLevel: errorCorrectionLevel
          });
          blob = new Blob([svgString], { type: 'image/svg+xml' });
          fileName = 'qrcode.svg';
          break;
      }

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const getSampleTexts = () => [
    { label: 'URL', value: 'https://linux.wiki', icon: '🌐' },
    { label: 'Email', value: 'mailto:contact@linux.wiki', icon: '📧' },
    { label: 'Phone', value: 'tel:+1234567890', icon: '📱' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;', icon: '📶' },
    { label: 'vCard', value: 'BEGIN:VCARD\nVERSION:3.0\nFN:Linux Wiki\nTEL:+1234567890\nEMAIL:contact@linux.wiki\nEND:VCARD', icon: '👤' },
    { label: 'Location', value: 'geo:37.7749,-122.4194', icon: '📍' },
    { label: 'SMS', value: 'sms:+1234567890?body=Hello Linux Wiki!', icon: '💬' },
    { label: 'Plain Text', value: 'Hello from Linux Wiki!', icon: '📝' }
  ];

  const getErrorCorrectionInfo = () => ({
    L: { level: 'L', name: 'Low', capacity: '~7%', description: 'Lowest redundancy, most data capacity' },
    M: { level: 'M', name: 'Medium', capacity: '~15%', description: 'Default balance between capacity and error correction' },
    Q: { level: 'Q', name: 'Quartile', capacity: '~25%', description: 'Higher error correction for better reliability' },
    H: { level: 'H', name: 'High', capacity: '~30%', description: 'Highest error correction, lowest data capacity' }
  });

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>QR Code Generator</h1>
          <p>Create custom QR codes for URLs, text, WiFi, contacts, and more</p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.inputSection}>
            <div className={styles.controlGroup}>
              <h3>Content</h3>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL, text, or any data to encode..."
                className={styles.textInput}
                rows={6}
              />
              <div className={styles.sampleButtons}>
                {getSampleTexts().map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setText(sample.value)}
                    className={styles.sampleButton}
                    title={sample.label}
                  >
                    <span className={styles.sampleIcon}>{sample.icon}</span>
                    <span className={styles.sampleLabel}>{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>Appearance</h3>
              <div className={styles.appearanceControls}>
                <div className={styles.colorControl}>
                  <label>Foreground Color</label>
                  <div className={styles.colorPicker}>
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div className={styles.colorControl}>
                  <label>Background Color</label>
                  <div className={styles.colorPicker}>
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.sizeControl}>
                <label>Size: {size}x{size}px</label>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className={styles.sizeSlider}
                />
                <div className={styles.sizePresets}>
                  {[128, 256, 512, 1024].map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`${styles.sizePreset} ${size === s ? styles.active : ''}`}
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.marginControl}>
                <label>Margin: {margin}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className={styles.marginSlider}
                />
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>Error Correction</h3>
              <div className={styles.errorCorrectionGrid}>
                {Object.entries(getErrorCorrectionInfo()).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setErrorCorrectionLevel(key)}
                    className={`${styles.errorCorrectionButton} ${errorCorrectionLevel === key ? styles.active : ''}`}
                  >
                    <div className={styles.errorCorrectionHeader}>
                      <strong>{info.name}</strong>
                      <span>({info.capacity})</span>
                    </div>
                    <div className={styles.errorCorrectionDescription}>
                      {info.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.qrCodeContainer}>
              {isGenerating ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p>Generating QR Code...</p>
                </div>
              ) : qrCodeUrl ? (
                <div className={styles.qrCodeDisplay}>
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className={styles.qrCodeImage}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{ display: 'none' }}
                    width={size}
                    height={size}
                  />
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Enter text to generate QR code</p>
                </div>
              )}
            </div>

            {qrCodeUrl && (
              <div className={styles.actionButtons}>
                <button
                  onClick={copyToClipboard}
                  className={styles.copyButton}
                >
                  📋 Copy Image
                </button>

                <div className={styles.downloadButtons}>
                  <button
                    onClick={() => downloadQRCode('png')}
                    className={styles.downloadButton}
                  >
                    💾 PNG
                  </button>
                  <button
                    onClick={() => downloadQRCode('jpg')}
                    className={styles.downloadButton}
                  >
                    🖼️ JPG
                  </button>
                  <button
                    onClick={() => downloadQRCode('svg')}
                    className={styles.downloadButton}
                  >
                    🎨 SVG
                  </button>
                </div>
              </div>
            )}

            <div className={styles.infoSection}>
              <h3>QR Code Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>Format:</strong>
                  <span>{text.startsWith('http') ? 'URL' : 'Text/Other'}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Size:</strong>
                  <span>{size} × {size} pixels</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Error Correction:</strong>
                  <span>{getErrorCorrectionInfo()[errorCorrectionLevel].name}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Character Count:</strong>
                  <span>{text.length} characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h2>Features & Use Cases</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4>🌐 Multiple Formats</h4>
              <p>Generate QR codes for URLs, email addresses, phone numbers, WiFi credentials, contact cards, and more</p>
            </div>
            <div className={styles.feature}>
              <h4>🎨 Custom Design</h4>
              <p>Customize colors, size, and error correction level to match your branding or requirements</p>
            </div>
            <div className={styles.feature}>
              <h4>📱 Universal Compatibility</h4>
              <p>Works with all smartphone cameras and QR code scanner apps</p>
            </div>
            <div className={styles.feature}>
              <h4>💾 Multiple Export Formats</h4>
              <p>Download as PNG, JPG, or SVG for use in print, web, or applications</p>
            </div>
            <div className={styles.feature}>
              <h4>⚡ Instant Generation</h4>
              <p>Real-time QR code generation as you type or modify settings</p>
            </div>
            <div className={styles.feature}>
              <h4>🔒 Reliable Error Correction</h4>
              <p>Multiple error correction levels ensure QR codes remain scannable even when damaged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}