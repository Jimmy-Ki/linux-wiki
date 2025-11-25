import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { lookupIPLocal } from './ipDatabase';
import { resolveDomainLocal } from './localDNS';
import { lookupIPReal } from './realIPDatabase';
import { lookupIPCloudflare, isCloudflareIP } from './cloudflareIPDatabase';

// IP validation functions
function isValidIPv4(ip) {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

function isValidIPv6(ip) {
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}$|^(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}$|^(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})$|^:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)$/;
  return ipv6Regex.test(ip);
}

function isValidDomain(domain) {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

export default function IPLookup() {
  const [query, setQuery] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIP, setCurrentIP] = useState(null);
  
  // Get current IP on component mount (still need external API for this)
  useEffect(() => {
    getCurrentIP();
  }, []);

  // Handle URL parameter for direct IP/domain lookup
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const queryParam = pathParts[pathParts.length - 1];

    if (queryParam && queryParam !== 'ip') {
      const decodedQuery = decodeURIComponent(queryParam);
      if (isValidIPv4(decodedQuery) || isValidIPv6(decodedQuery) || isValidDomain(decodedQuery)) {
        setQuery(decodedQuery);
        performLookup(decodedQuery);
      }
    }
  }, []);

  async function getCurrentIP() {
    try {
      // Try to get current IP from a simple service
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setCurrentIP(data.ip);
      setQuery(data.ip);
      performLookup(data.ip);
    } catch (err) {
      // Fallback: use a random common IP for demo
      const fallbackIP = '8.8.8.8';
      setCurrentIP(fallbackIP);
      setQuery(fallbackIP);
      setError('Could not detect your IP. Using example IP for demonstration.');
    }
  }

  async function performLookup(input) {
    if (!input.trim()) {
      setError('Please enter an IP address or domain');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let targetIP = input;
      let resolvedDomain = null;

      // If it's a domain, resolve it locally
      if (isValidDomain(input)) {
        resolvedDomain = input;
        const resolutionResult = resolveDomainLocal(input);

        if (resolutionResult.success) {
          targetIP = resolutionResult.ip;
        } else {
          // If we can't resolve the domain locally, still provide basic domain info
          setIpInfo({
            ip: input,
            domain: input,
            location: {
              country: 'Unknown',
              countryCode: 'XX',
              region: 'Unknown',
              city: 'Unknown',
              postalCode: 'Unknown',
              latitude: null,
              longitude: null,
              timezone: 'Unknown',
            },
            network: {
              isp: 'Domain Only',
              organization: 'Domain Only',
              asn: 'Unknown',
              connectionType: null,
            },
            security: {
              isProxy: false,
              isVpn: false,
              isTor: false,
              isHosting: false,
            },
            meta: {
              type: 'Domain',
              isCurrent: false,
              lookupTime: new Date().toISOString(),
              source: 'Local DNS - Domain Not Resolved',
              resolutionStatus: 'Domain not found in local cache'
            }
          });
          return;
        }
      }

      // Validate IP after domain resolution
      if (!isValidIPv4(targetIP) && !isValidIPv6(targetIP)) {
        throw new Error('Invalid IP address format');
      }

      // Check if it's Cloudflare IP first, then try real database, then fallback to local database
      const cloudflareData = lookupIPCloudflare(targetIP);
      const isCFIP = isCloudflareIP(targetIP);

      let finalData;
      if (isCFIP) {
        finalData = cloudflareData;
      } else {
        const realData = lookupIPReal(targetIP);
        finalData = realData.source === 'Real IP Database - Not Found' ? lookupIPLocal(targetIP) : realData;
      }

      // Build IP information
      const combinedInfo = {
        ip: targetIP,
        domain: resolvedDomain,
        location: {
          country: finalData.country,
          countryCode: finalData.countryCode,
          region: finalData.region,
          city: finalData.city,
          postalCode: finalData.postalCode,
          latitude: finalData.latitude,
          longitude: finalData.longitude,
          timezone: finalData.timezone,
        },
        network: {
          isp: finalData.isp,
          organization: finalData.organization,
          asn: finalData.asn,
          connectionType: null,
        },
        security: {
          isProxy: false,
          isVpn: false,
          isTor: false,
          isHosting: false,
        },
        meta: {
          type: isValidIPv6(targetIP) ? 'IPv6' : 'IPv4',
          isCurrent: targetIP === currentIP,
          lookupTime: new Date().toISOString(),
          source: finalData.source,
          isCloudflare: isCFIP
        }
      };

      setIpInfo(combinedInfo);
    } catch (err) {
      setError(err.message || 'Failed to lookup IP information. Please check your input and try again.');
      setIpInfo(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      // Update URL if needed
      const currentPath = window.location.pathname;
      if (!currentPath.endsWith(query)) {
        window.history.pushState({}, '', `/tools/ip/${encodeURIComponent(query)}`);
      }
      performLookup(query);
    }
  }

  function handleClear() {
    setQuery('');
    setIpInfo(null);
    setError(null);
    window.history.pushState({}, '', '/tools/ip');
  }

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>IP Lookup Tool</h1>
          <p>Get detailed information about IP addresses and domains using our local database. Completely offline operation.</p>

  
          {currentIP && (
            <div className={styles.currentIP}>
              <span className={styles.currentIPLabel}>Your IP:</span>
              <button
                onClick={() => {
                  setQuery(currentIP);
                  performLookup(currentIP);
                  window.history.pushState({}, '', `/tools/ip/${currentIP}`);
                }}
                className={styles.currentIPButton}
              >
                {currentIP}
              </button>
            </div>
          )}
        </div>

        {/* Search Form */}
        <div className={styles.searchSection}>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter IP address (IPv4/IPv6) or domain name..."
                className={styles.searchInput}
              />
              <button type="submit" disabled={loading} className={styles.searchButton}>
                {loading ? 'Looking up...' : 'Lookup'}
              </button>
              {query && (
                <button type="button" onClick={handleClear} className={styles.clearButton}>
                  Clear
                </button>
              )}
            </div>

            <div className={styles.inputHints}>
              <span className={styles.hint}>Examples:</span>
              <button
                type="button"
                onClick={() => setQuery('8.8.8.8')}
                className={styles.exampleButton}
              >
                8.8.8.8
              </button>
              <button
                type="button"
                onClick={() => setQuery('google.com')}
                className={styles.exampleButton}
              >
                google.com
              </button>
              <button
                type="button"
                onClick={() => setQuery('192.168.1.1')}
                className={styles.exampleButton}
              >
                192.168.1.1
              </button>
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className={styles.errorSection}>
            <div className={styles.errorBox}>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <p>Looking up IP information in local database...</p>
            </div>
          </div>
        )}

        {/* Results Display */}
        {ipInfo && !loading && (
          <div className={styles.resultsSection}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <h2>IP Information</h2>
                {ipInfo.meta.isCurrent && (
                  <span className={styles.currentBadge}>Your IP</span>
                )}
                {ipInfo.meta.isCloudflare && (
                  <span className={styles.cloudflareBadge}>Cloudflare</span>
                )}
                <span className={styles.sourceBadge}>{ipInfo.meta.source}</span>
              </div>

              {/* Basic Information */}
              <div className={styles.infoGroup}>
                <h3>Basic Information</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>IP Address:</label>
                    <span>{ipInfo.ip}</span>
                  </div>
                  {ipInfo.domain && (
                    <div className={styles.infoItem}>
                      <label>Domain:</label>
                      <span>{ipInfo.domain}</span>
                    </div>
                  )}
                  <div className={styles.infoItem}>
                    <label>Type:</label>
                    <span>{ipInfo.meta.type}</span>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className={styles.infoGroup}>
                <h3>Location</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>Country:</label>
                    <span>{ipInfo.location.country} ({ipInfo.location.countryCode})</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Region:</label>
                    <span>{ipInfo.location.region}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>City:</label>
                    <span>{ipInfo.location.city}</span>
                  </div>
                  {ipInfo.location.postalCode && ipInfo.location.postalCode !== 'Unknown' && (
                    <div className={styles.infoItem}>
                      <label>Postal Code:</label>
                      <span>{ipInfo.location.postalCode}</span>
                    </div>
                  )}
                  {ipInfo.location.timezone && ipInfo.location.timezone !== 'Unknown' && (
                    <div className={styles.infoItem}>
                      <label>Timezone:</label>
                      <span>{ipInfo.location.timezone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Network Information */}
              <div className={styles.infoGroup}>
                <h3>Network</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>ISP:</label>
                    <span>{ipInfo.network.isp}</span>
                  </div>
                  {ipInfo.network.organization && (
                    <div className={styles.infoItem}>
                      <label>Organization:</label>
                      <span>{ipInfo.network.organization}</span>
                    </div>
                  )}
                  {ipInfo.network.asn && ipInfo.network.asn !== 'Unknown' && (
                    <div className={styles.infoItem}>
                      <label>ASN:</label>
                      <span>{ipInfo.network.asn}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  onClick={() => navigator.clipboard.writeText(ipInfo.ip)}
                  className={styles.actionButton}
                >
                  Copy IP
                </button>
                {ipInfo.location.latitude && ipInfo.location.longitude && (
                  <button
                    onClick={() => window.open(`https://www.google.com/maps?q=${ipInfo.location.latitude},${ipInfo.location.longitude}`, '_blank')}
                    className={styles.actionButton}
                  >
                    View on Map
                  </button>
                )}
                <button
                  onClick={() => {
                    const text = `IP: ${ipInfo.ip}\nLocation: ${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.country}\nISP: ${ipInfo.network.isp}\nSource: ${ipInfo.meta.source}`;
                    navigator.clipboard.writeText(text);
                  }}
                  className={styles.actionButton}
                >
                  Copy All Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}