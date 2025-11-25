import React, { useState, useEffect } from 'react';
import Head from '@docusaurus/Head';

export default function IPCardPage() {
  const [currentIP, setCurrentIP] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <>
      <Head>
        <title>IP Card - Linux Wiki</title>
        <meta property="og:title" content="IP Address" />
        <meta property="og:description" content={`Your IP address: ${currentIP || 'Loading...'}`} />
        <meta property="og:image" content="https://linux.wiki/ip/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="200" />
      </Head>

      <div style={{
          width: '800px',
          height: '200px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: '0',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          {/* Linux logo */}
          <img
            src="/img/linux.png"
            alt="Linux Logo"
            style={{
              width: '60px',
              height: '60px',
              marginBottom: '10px',
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
              width: '60px',
              height: '60px',
              backgroundColor: '#4CAF50',
              borderRadius: '8px',
              display: 'none', // Hidden by default, shown on image error
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px',
              border: '2px solid #4CAF50',
              color: 'white'
            }}
          >
            L
          </div>

          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4CAF50',
            marginBottom: '15px'
          }}>
            linux.wiki
          </span>

          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Monaco, Consolas, monospace',
            color: '#4CAF50'
          }}>
            {error ? 'Error' : (currentIP || 'Loading...')}
          </div>

          {/* Status indicator */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: error ? '#ff4444' : (currentIP ? '#4CAF50' : '#ff9800'),
            opacity: currentIP ? '1' : '0.5'
          }} />
        </div>
    </>
  );
}