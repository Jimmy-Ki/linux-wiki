import React from 'react';
import Head from '@docusaurus/Head';
import { useState, useEffect } from 'react';

export default function IPCardPage() {
  const [currentIP, setCurrentIP] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getIP() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setCurrentIP(data.ip);
      } catch (err) {
        setError('Failed to get IP');
      }
    }
    getIP();
  }, []);

  return (
    <>
      <Head>
        <title>IP Card - Linux Wiki</title>
        <meta property="og:title" content="IP Address" />
        <meta property="og:description" content={`Your IP address: ${currentIP || 'Loading...'}`} />
      </Head>
      {currentIP ? (
        <div style={{
          width: '400px',
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
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '10px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4CAF50',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              L
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#4CAF50'
            }}>
              linux.wiki
            </span>
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Monaco, Consolas, monospace'
          }}>
            {currentIP}
          </div>
        </div>
      ) : error ? (
        <div style={{
          width: '400px',
          height: '200px',
          backgroundColor: '#ff4444',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: '0',
          boxSizing: 'border-box',
          textAlign: 'center',
          padding: '20px'
        }}>
          Error loading IP
        </div>
      ) : (
        <div style={{
          width: '400px',
          height: '200px',
          backgroundColor: '#333',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: '0',
          boxSizing: 'border-box'
        }}>
          Loading...
        </div>
      )}
    </>
  );
}