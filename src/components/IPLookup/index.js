import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function IPLookup() {
  const [currentIP, setCurrentIP] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current IP on component mount
  useEffect(() => {
    getCurrentIP();
  }, []);

  async function getCurrentIP() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setCurrentIP(data.ip);
    } catch (err) {
      setError('Failed to get your IP address');
    } finally {
      setLoading(false);
    }
  }

  function handleRefresh() {
    getCurrentIP();
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>IP Address</h1>
          <p>Get your current IP address instantly</p>
        </div>

        {/* Main IP Display */}
        <div className={styles.ipDisplay}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button onClick={handleRefresh} className={styles.retryButton}>
                Retry
              </button>
            </div>
          ) : (
            <div className={styles.ipResult}>
              <div className={styles.ipValue}>
                Your IP Address: {currentIP}
              </div>
              <div className={styles.ipActions}>
                <button
                  onClick={() => navigator.clipboard.writeText(currentIP)}
                  className={styles.copyButton}
                >
                  Copy IP Address
                </button>
                <button onClick={handleRefresh} className={styles.refreshButton}>
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>

        {/* API Card Display */}
        <div className={styles.apiSection}>
          <h2>API Card</h2>
          <p>Use this image API to embed your IP address:</p>
          <div className={styles.apiCard}>
            <img
              src="/ip/png"
              alt="IP Address Card"
              className={styles.apiCardImage}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.apiCode}>
            <code>![IP Card](https://linux.wiki/ip/png)</code>
          </div>
        </div>
      </div>
    </div>
  );
}