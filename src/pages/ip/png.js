import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';

export default function IPCardPage() {
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      try {
        // Get IP address
        let ipAddress = '127.0.0.1';
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          ipAddress = data.ip;
        } catch (error) {
          console.error('Failed to get IP:', error);
        }

        // Generate timestamp
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(',', '');

        // Create canvas and generate PNG
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 400, 200);

        // Linux logo placeholder (green square)
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(20, 70, 60, 60);

        // Logo text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('L', 50, 108);

        // Linux.wiki text
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('linux.wiki', 50, 150);

        // IP Address
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 24px Monaco, Consolas, monospace';
        ctx.fillText(ipAddress, 250, 105);

        // Time
        ctx.fillStyle = '#888888';
        ctx.font = '12px Monaco, Consolas, monospace';
        ctx.fillText(timeString, 200, 180);

        // Convert to PNG
        const pngDataUrl = canvas.toDataURL('image/png');

        // Replace entire document with the image
        document.documentElement.innerHTML = `
          <head>
            <title>IP Card</title>
            <meta http-equiv="Content-Type" content="image/png">
            <meta property="og:title" content="IP Address Card">
            <meta property="og:image" content="${pngDataUrl}">
            <meta property="og:image:width" content="400">
            <meta property="og:image:height" content="200">
          </head>
          <body style="margin:0;padding:0;">
            <img src="${pngDataUrl}" alt="IP Card" style="display:block;" />
          </body>
        `;

        setImageReady(true);
      } catch (error) {
        console.error('Error generating image:', error);
        // Fallback: show error message
        document.documentElement.innerHTML = `
          <head><title>Error</title></head>
          <body><h1>Error generating IP card</h1></body>
        `;
      }
    };

    generateImage();
  }, []);

  // Show loading while image is being generated
  if (!imageReady) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        color: '#4CAF50'
      }}>
        <h1>Generating IP Card...</h1>
      </div>
    );
  }

  // This won't be rendered as we replace the entire document
  return null;
}