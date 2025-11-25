import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';

export default function IPCardPage() {
  const [ipAddress, setIpAddress] = useState(null);
  const [generatedTime] = useState(new Date());
  const [svgData, setSvgData] = useState(null);

  useEffect(() => {
    // Generate IP once
    const getIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);

        // Generate SVG data
        const timeString = generatedTime.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(',', '');

        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="400">
            <rect width="200" height="400" fill="#1a1a1a"/>
            <circle cx="100" cy="60" r="20" fill="#4CAF50"/>
            <text x="100" y="68" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Arial">L</text>
            <text x="100" y="100" text-anchor="middle" fill="#4CAF50" font-size="16" font-weight="bold" font-family="Arial">linux.wiki</text>
            <text x="100" y="200" text-anchor="middle" fill="#4CAF50" font-size="18" font-weight="bold" font-family="Monaco, Consolas, monospace">${data.ip}</text>
            <text x="100" y="360" text-anchor="middle" fill="#888888" font-size="10" font-family="Monaco, Consolas, monospace">${timeString}</text>
          </svg>
        `;

        setSvgData(svg);
      } catch (error) {
        setIpAddress('127.0.0.1');
      }
    };

    getIP();
  }, [generatedTime]);

  if (!ipAddress || !svgData) {
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

  return (
    <>
      <Head>
        <title>IP Card</title>
        <meta httpEquiv="Content-Type" content="image/svg+xml" />
        <meta property="og:title" content="IP Address Card" />
        <meta property="og:image" content="data:image/svg+xml;base64,${btoa(svgData)}" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: svgData }} />
    </>
  );
}