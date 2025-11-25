import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';

export default function IPCardPage() {
  const [ipAddress, setIpAddress] = useState(null);
  const [generatedTime] = useState(new Date());
  const [pngDataUrl, setPngDataUrl] = useState(null);

  useEffect(() => {
    // Generate IP once
    const getIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);

        // Generate and convert to PNG
        await generatePNG(data.ip);
      } catch (error) {
        setIpAddress('127.0.0.1');
        await generatePNG('127.0.0.1');
      }
    };

    getIP();
  }, [generatedTime]);

  const generatePNG = async (ip) => {
    const timeString = generatedTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');

    // Create SVG with horizontal layout (400x200)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
        <defs>
          <style>
            .title-text { fill: #4CAF50; font-family: Arial, sans-serif; font-weight: bold; }
            .ip-text { fill: #4CAF50; font-family: Monaco, Consolas, monospace; font-weight: bold; }
            .time-text { fill: #888888; font-family: Monaco, Consolas, monospace; font-size: 12px; }
          </style>
        </defs>

        <!-- Background -->
        <rect width="400" height="200" fill="#1a1a1a"/>

        <!-- Left side: Logo and Title -->
        <g transform="translate(20, 100)">
          <!-- Linux logo placeholder - will be replaced with actual image -->
          <rect x="0" y="-30" width="60" height="60" fill="#4CAF50" rx="8"/>
          <text x="30" y="8" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial">L</text>

          <!-- linux.wiki text below logo -->
          <text x="30" y="50" text-anchor="middle" class="title-text" font-size="16">linux.wiki</text>
        </g>

        <!-- Right side: IP Address -->
        <text x="200" y="95" text-anchor="middle" class="ip-text" font-size="24">${ip}</text>

        <!-- Bottom: Time -->
        <text x="200" y="180" text-anchor="middle" class="time-text">${timeString}</text>
      </svg>
    `;

    // Convert SVG to PNG using Canvas API
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = async function() {
      // Draw SVG to canvas
      ctx.drawImage(img, 0, 0);

      // Try to load and draw linux.png logo
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = function() {
          // Draw logo over the placeholder
          ctx.drawImage(logoImg, 20, 70, 60, 60);

          // Convert to PNG data URL
          const pngData = canvas.toDataURL('image/png');
          setPngDataUrl(pngData);

          // Redirect to the image
          window.location.href = pngData;
        };
        logoImg.onerror = function() {
          // If logo fails to load, still generate PNG without it
          const pngData = canvas.toDataURL('image/png');
          setPngDataUrl(pngData);
          window.location.href = pngData;
        };
        logoImg.src = '/img/linux.png';
      } catch (error) {
        // If any error with logo, generate PNG without it
        const pngData = canvas.toDataURL('image/png');
        setPngDataUrl(pngData);
        window.location.href = pngData;
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  };

  if (!ipAddress || !pngDataUrl) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        color: '#4CAF50'
      }}>
        <h1>Generating PNG...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>IP Card</title>
        <meta httpEquiv="Content-Type" content="image/png" />
        <meta property="og:title" content="IP Address Card" />
        <meta property="og:image" content={pngDataUrl} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="200" />
      </Head>
      <div style={{ display: 'none' }}>
        <img src={pngDataUrl} alt="IP Card" />
      </div>
    </>
  );
}