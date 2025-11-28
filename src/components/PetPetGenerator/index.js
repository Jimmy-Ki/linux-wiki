import React, { useState, useRef, useEffect } from 'react';
import { IconUpload, IconDownload, IconPhoto, IconAdjustments, IconAlertTriangle, IconRefresh, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';
import styles from './styles.module.css';

// PetPet frames as base64 encoded images (simplified version)
const PETPET_FRAMES = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Placeholder
  // In a real implementation, you would include all 5 frames of the petpet animation
];

export default function PetPetGenerator() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [size, setSize] = useState(128);
  const [speed, setSpeed] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [error, setError] = useState('');

  const drawPetPetFrame = (ctx, userImage, frame, width, height) => {
    ctx.clearRect(0, 0, width, height);

    if (!userImage) {
      // Draw placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#666';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Upload an image to start', width / 2, height / 2);
      return;
    }

    const handOffset = Math.sin(frame * Math.PI / 2) * 10;
    const scale = 1 + Math.sin(frame * Math.PI / 2) * 0.1;

    // Draw user image (scaled and positioned for "patting" effect)
    const imageWidth = width * 0.6;
    const imageHeight = height * 0.6;
    const imageX = (width - imageWidth) / 2;
    const imageY = (height - imageHeight) / 2 + 10;

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-width / 2, -height / 2);

    // Draw circular mask for user image
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(imageWidth, imageHeight) / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(userImage, imageX, imageY, imageWidth, imageHeight);
    ctx.restore();

    // Draw hand (simplified - in reality you'd overlay hand images)
    ctx.fillStyle = '#8B4513';
    const handX = width / 2 + Math.cos(frame * Math.PI / 2) * 40;
    const handY = height / 2 + Math.sin(frame * Math.PI / 2) * 20 + handOffset - 50;

    ctx.beginPath();
    ctx.ellipse(handX, handY, 30 + Math.abs(Math.sin(frame * Math.PI / 2)) * 5, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw fingers
    for (let i = -2; i <= 2; i++) {
      const fingerX = handX + i * 8;
      const fingerY = handY - 15;
      ctx.beginPath();
      ctx.ellipse(fingerX, fingerY, 4, 8, i * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const animate = () => {
    if (!canvasRef.current || !image) return;

    const ctx = canvasRef.current.getContext('2d');
    const frame = (currentFrame + 1) % 10;

    drawPetPetFrame(ctx, image, frame, canvasRef.current.width, canvasRef.current.height);
    setCurrentFrame(frame);

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(animate, 1000 / speed);
      });
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
    setIsGenerating(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        setImage(img);
        setIsGenerating(false);
        drawPreview();
      };

      img.onerror = () => {
        setError('Failed to load uploaded image');
        setIsGenerating(false);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const drawPreview = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = size * 2;
    canvas.height = size * 2;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      drawPetPetFrame(ctx, image, 0, canvas.width, canvas.height);
    }
  };

  const generateGif = () => {
    if (!image || !canvasRef.current) return;

    setIsGenerating(true);
    setError('');

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Simple implementation - just export current frame as PNG
      // In a real implementation, you would use gif.js or similar library
      const link = document.createElement('a');
      link.download = `petpet-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      setIsGenerating(false);
    } catch (err) {
      setError('Failed to generate GIF');
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setImage(null);
    setIsPlaying(false);
    setCurrentFrame(0);
    setError('');
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    drawPreview();
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      setIsPlaying(true);
      animate();
    }
  };

  useEffect(() => {
    drawPreview();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [image, size]);

  useEffect(() => {
    if (isPlaying) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying, speed, currentFrame]);

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconPhoto size={32} /> PetPet Generator</h1>
          <p>Create the classic patting head GIF meme</p>
        </div>

        <div className={styles.content}>
          <div className={styles.canvasSection}>
            <div className={styles.canvasWrapper}>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={256}
                height={256}
              />
              {error && (
                <div className={`${styles.error} ${styles.errorMessage}`}>
                  <IconAlertTriangle size={16} />
                  {error}
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <button
                onClick={togglePlay}
                disabled={!image}
                className={`${styles.playButton} ${!image ? styles.disabled : ''}`}
              >
                {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
                {isPlaying ? 'Pause' : 'Preview'}
              </button>

              <button
                onClick={generateGif}
                disabled={!image || isGenerating}
                className={`${styles.generateButton} ${(!image || isGenerating) ? styles.disabled : ''}`}
              >
                {isGenerating ? 'Generating...' : <><IconDownload size={16} /> Export PNG</>}
              </button>

              <button
                onClick={reset}
                className={styles.resetButton}
              >
                <IconRefresh size={16} />
                Reset
              </button>
            </div>
          </div>

          <div className={styles.settings}>
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
              <p className={styles.uploadHint}>
                Choose an image to turn into a petpet GIF
              </p>
            </div>

            <div className={styles.settingsSection}>
              <h3><IconAdjustments size={18} /> Settings</h3>

              <div className={styles.inputGroup}>
                <label htmlFor="size">Size: {size}px</label>
                <input
                  id="size"
                  type="range"
                  min="64"
                  max="256"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="speed">Animation Speed: {speed}fps</label>
                <input
                  id="speed"
                  type="range"
                  min="5"
                  max="30"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
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
              <li>Upload an image (faces work best)</li>
              <li>Adjust size and speed settings</li>
              <li>Click Preview to see the animation</li>
              <li>Export as PNG (GIF coming soon)</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h4>Tips</h4>
            <ul>
              <li>Square images work best</li>
              <li>Face-focused images give the best effect</li>
              <li>Higher speeds create more energetic patting</li>
              <li>128px is the classic petpet size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}