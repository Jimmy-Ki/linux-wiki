import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';

export default function IPCardPage() {
  const [currentIP, setCurrentIP] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [generatedTime] = useState(new Date());

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    async function getIP() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();

        if (isMounted) {
          setCurrentIP(data.ip);
          setLoaded(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setLoaded(true);
        }
      }
    }

    // Start IP fetch immediately
    getIP();

    // Add a delay to ensure IP is loaded before rendering
    timeoutId = setTimeout(() => {
      if (isMounted && !currentIP && !error) {
        setError(true);
        setLoaded(true);
      }
    }, 3000); // Reduced timeout to 3 seconds

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Format the generation time
  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  return (
    <>
      <Head>
        <title>IP Card - Linux Wiki</title>
        <meta property="og:title" content="IP Address" />
        <meta property="og:description" content={`Your IP address: ${currentIP || 'Loading...'}`} />
        <meta property="og:image" content="https://linux.wiki/ip/png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="400" />
      </Head>

      <div style={{
          width: '200px',
          height: '400px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 0,
          padding: '20px',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          {/* First row: Linux logo + Linux.wiki */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Linux logo */}
            <img
              src="/img/linux.png"
              alt="Linux Logo"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                // Show fallback text logo
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />

            {/* Fallback text logo if image fails */}
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#4CAF50',
                borderRadius: '6px',
                display: 'none', // Hidden by default, shown on image error
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '2px solid #4CAF50',
                color: 'white'
              }}
            >
              L
            </div>

            <span style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#4CAF50',
              textAlign: 'center'
            }}>
              linux.wiki
            </span>
          </div>

          {/* Second row: IP Address */}
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Monaco, Consolas, monospace',
            color: '#4CAF50',
            wordBreak: 'break-all',
            maxWidth: '100%',
            padding: '10px 0'
          }}>
            {error ? 'Error' : (currentIP || 'Loading...')}
          </div>

          {/* Third row: Time (small font) */}
          <div style={{
            fontSize: '10px',
            textAlign: 'center',
            color: '#888888',
            fontFamily: 'Monaco, Consolas, monospace'
          }}>
            {formatTime(generatedTime)}
          </div>

          {/* Status indicator */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: error ? '#ff4444' : (currentIP ? '#4CAF50' : '#ff9800'),
            opacity: currentIP ? '1' : '0.5'
          }} />
        </div>
    </>
  );
}