import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState('#3B82F6');
  const [rgbColor, setRgbColor] = useState({ r: 59, g: 130, b: 246 });
  const [hslColor, setHslColor] = useState({ h: 217, s: 91, l: 60 });
  const [savedColors, setSavedColors] = useState([]);

  useEffect(() => {
    // Load saved colors from localStorage
    const saved = localStorage.getItem('savedColors');
    if (saved) {
      setSavedColors(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Update RGB and HSL when hex changes
    const rgb = hexToRgb(hexColor);
    if (rgb) {
      setRgbColor(rgb);
      setHslColor(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }
  }, [hexColor]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const handleHexChange = (value) => {
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setHexColor(value.toUpperCase());
    }
  };

  const handleRgbChange = (channel, value) => {
    const newRgb = { ...rgbColor, [channel]: Math.min(255, Math.max(0, parseInt(value) || 0)) };
    setRgbColor(newRgb);
    setHexColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (channel, value) => {
    const channelRanges = { h: 360, s: 100, l: 100 };
    const newHsl = {
      ...hslColor,
      [channel]: Math.min(channelRanges[channel], Math.max(0, parseInt(value) || 0))
    };
    setHslColor(newHsl);
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgbColor(rgb);
    setHexColor(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const saveColor = () => {
    const newColor = {
      hex: hexColor,
      timestamp: Date.now()
    };

    const updatedColors = [newColor, ...savedColors.slice(0, 11)]; // Keep max 12 colors
    setSavedColors(updatedColors);
    localStorage.setItem('savedColors', JSON.stringify(updatedColors));
  };

  const deleteSavedColor = (index) => {
    const updatedColors = savedColors.filter((_, i) => i !== index);
    setSavedColors(updatedColors);
    localStorage.setItem('savedColors', JSON.stringify(updatedColors));
  };

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    setHexColor(randomHex);
  };

  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  const getColorVariations = () => {
    const variations = [];

    // Generate lighter and darker shades
    for (let i = 1; i <= 5; i++) {
      const factor = i * 0.15;

      // Lighter
      const lighter = {
        h: hslColor.h,
        s: hslColor.s,
        l: Math.min(90, hslColor.l + factor * 100)
      };
      const lighterRgb = hslToRgb(lighter.h, lighter.s, lighter.l);
      variations.push({
        name: `${i * 15}% Lighter`,
        hex: rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b),
        type: 'lighter'
      });

      // Darker
      const darker = {
        h: hslColor.h,
        s: hslColor.s,
        l: Math.max(10, hslColor.l - factor * 100)
      };
      const darkerRgb = hslToRgb(darker.h, darker.s, darker.l);
      variations.push({
        name: `${i * 15}% Darker`,
        hex: rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b),
        type: 'darker'
      });
    }

    return variations;
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Color Picker</h1>
          <p>Professional color picker with multiple format support and palette generation</p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.leftPanel}>
            <div className={styles.colorDisplay}>
              <div
                className={styles.colorPreview}
                style={{ backgroundColor: hexColor }}
              >
                <div className={styles.colorInfo} style={{ color: getContrastColor(hexColor) }}>
                  <div className={styles.colorName}>{hexColor}</div>
                  <div className={styles.colorContrast}>Contrast: {getContrastColor(hexColor) === '#FFFFFF' ? 'Light Text' : 'Dark Text'}</div>
                </div>
              </div>

              <div className={styles.colorActions}>
                <button onClick={generateRandomColor} className={styles.randomButton}>
                  <ArrowPathIcon className="w-4 h-4" /> Random
                </button>
                <button onClick={saveColor} className={styles.saveButton}>
                  <ArrowDownTrayIcon className="w-4 h-4" /> Save
                </button>
              </div>
            </div>

            <div className={styles.inputSection}>
              <h3>Color Formats</h3>

              <div className={styles.formatGroup}>
                <label>HEX</label>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    value={hexColor}
                    onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                    className={styles.colorInput}
                    placeholder="#RRGGBB"
                  />
                  <button
                    onClick={() => copyToClipboard(hexColor)}
                    className={styles.copyButton}
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={styles.formatGroup}>
                <label>RGB</label>
                <div className={styles.rgbInputs}>
                  <div className={styles.rgbChannel}>
                    <span>R</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgbColor.r}
                      onChange={(e) => handleRgbChange('r', e.target.value)}
                      className={styles.channelInput}
                    />
                  </div>
                  <div className={styles.rgbChannel}>
                    <span>G</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgbColor.g}
                      onChange={(e) => handleRgbChange('g', e.target.value)}
                      className={styles.channelInput}
                    />
                  </div>
                  <div className={styles.rgbChannel}>
                    <span>B</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgbColor.b}
                      onChange={(e) => handleRgbChange('b', e.target.value)}
                      className={styles.channelInput}
                    />
                  </div>
                  <button
                    onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)}
                    className={styles.copyButton}
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={styles.formatGroup}>
                <label>HSL</label>
                <div className={styles.hslInputs}>
                  <div className={styles.hslChannel}>
                    <span>H</span>
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={hslColor.h}
                      onChange={(e) => handleHslChange('h', e.target.value)}
                      className={styles.channelInput}
                    />
                    <span className={styles.unit}>°</span>
                  </div>
                  <div className={styles.hslChannel}>
                    <span>S</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hslColor.s}
                      onChange={(e) => handleHslChange('s', e.target.value)}
                      className={styles.channelInput}
                    />
                    <span className={styles.unit}>%</span>
                  </div>
                  <div className={styles.hslChannel}>
                    <span>L</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hslColor.l}
                      onChange={(e) => handleHslChange('l', e.target.value)}
                      className={styles.channelInput}
                    />
                    <span className={styles.unit}>%</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`)}
                    className={styles.copyButton}
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {savedColors.length > 0 && (
              <div className={styles.savedColors}>
                <h3>Saved Colors</h3>
                <div className={styles.savedColorGrid}>
                  {savedColors.map((color, index) => (
                    <div key={index} className={styles.savedColor}>
                      <div
                        className={styles.savedColorPreview}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setHexColor(color.hex)}
                        title={color.hex}
                      />
                      <button
                        onClick={() => deleteSavedColor(index)}
                        className={styles.deleteButton}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.variationsSection}>
              <h3>Color Variations</h3>
              <div className={styles.variationsGrid}>
                {getColorVariations().map((variation, index) => (
                  <div
                    key={index}
                    className={styles.variation}
                    onClick={() => setHexColor(variation.hex)}
                    style={{ backgroundColor: variation.hex }}
                    title={`${variation.name}: ${variation.hex}`}
                  >
                    <div className={styles.variationInfo}>
                      <div className={styles.variationName}>{variation.name}</div>
                      <div className={styles.variationHex}>{variation.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.exportSection}>
              <h3>Export Options</h3>
              <div className={styles.exportFormats}>
                <div className={styles.exportOption}>
                  <label>CSS Variables</label>
                  <div className={styles.codeBlock}>
                    <code>--primary-color: {hexColor};</code>
                    <button
                      onClick={() => copyToClipboard(`--primary-color: ${hexColor};`)}
                      className={styles.copySmallButton}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className={styles.exportOption}>
                  <label>Tailwind CSS</label>
                  <div className={styles.codeBlock}>
                    <code>bg-[{hexColor}]</code>
                    <button
                      onClick={() => copyToClipboard(`bg-[${hexColor}]`)}
                      className={styles.copySmallButton}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className={styles.exportOption}>
                  <label>JavaScript</label>
                  <div className={styles.codeBlock}>
                    <code>color: '{hexColor}'</code>
                    <button
                      onClick={() => copyToClipboard(`color: '${hexColor}'`)}
                      className={styles.copySmallButton}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className={styles.exportOption}>
                  <label>Sass/SCSS</label>
                  <div className={styles.codeBlock}>
                    <code>$primary-color: {hexColor};</code>
                    <button
                      onClick={() => copyToClipboard(`$primary-color: ${hexColor};`)}
                      className={styles.copySmallButton}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.paletteSection}>
              <h3>Quick Palette</h3>
              <div className={styles.paletteGrid}>
                <div className={styles.palette}>
                  <h4>Material Design</h4>
                  <div className={styles.paletteColors}>
                    {['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'].map(color => (
                      <div
                        key={color}
                        className={styles.paletteColor}
                        style={{ backgroundColor: color }}
                        onClick={() => setHexColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.palette}>
                  <h4>Web Safe</h4>
                  <div className={styles.paletteColors}>
                    {['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(color => (
                      <div
                        key={color}
                        className={styles.paletteColor}
                        style={{ backgroundColor: color }}
                        onClick={() => setHexColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}