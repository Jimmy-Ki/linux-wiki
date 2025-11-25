import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

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

  // Get current IP on component mount
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
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setCurrentIP(data.ip);
      setQuery(data.ip);
      performLookup(data.ip);
    } catch (err) {
      setError('Failed to get current IP address');
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

      // If it's a domain, resolve it to IP first
      if (isValidDomain(input)) {
        try {
          // Use a public DNS resolver for domain lookup
          const dnsResponse = await fetch(`https://dns.google/resolve?name=${input}&type=A`);
          const dnsData = await dnsResponse.json();

          if (dnsData.Answer && dnsData.Answer.length > 0) {
            targetIP = dnsData.Answer[0].data;
          } else {
            // Try AAAA record for IPv6
            const ipv6Response = await fetch(`https://dns.google/resolve?name=${input}&type=AAAA`);
            const ipv6Data = await ipv6Response.json();

            if (ipv6Data.Answer && ipv6Data.Answer.length > 0) {
              targetIP = ipv6Data.Answer[0].data;
            } else {
              throw new Error('Could not resolve domain to IP address');
            }
          }
        } catch (dnsErr) {
          throw new Error('Failed to resolve domain: ' + dnsErr.message);
        }
      }

      // Validate IP after domain resolution
      if (!isValidIPv4(targetIP) && !isValidIPv6(targetIP)) {
        throw new Error('Invalid IP address format');
      }

      // Get IP geolocation information
      const geoResponse = await fetch(`https://ipapi.co/${targetIP}/json/`);
      if (!geoResponse.ok) {
        throw new Error('Failed to fetch IP information');
      }

      const geoData = await geoResponse.json();

      if (geoData.error) {
        throw new Error(geoData.error || 'IP information not available');
      }

      // Get additional IP information
      const ipInfoResponse = await fetch(`http://ip-api.com/json/${targetIP}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
      const ipInfoData = await ipInfoResponse.json();

      if (ipInfoData.status === 'fail') {
        throw new Error(ipInfoData.message || 'Failed to get detailed IP information');
      }

      // Combine all information
      const combinedInfo = {
        ip: targetIP,
        domain: input !== targetIP ? input : null,
        location: {
          country: geoData.country_name || ipInfoData.country,
          countryCode: geoData.country_code || ipInfoData.countryCode,
          region: geoData.region || ipInfoData.regionName,
          city: geoData.city || ipInfoData.city,
          postalCode: geoData.postal || ipInfoData.zip,
          latitude: geoData.latitude || ipInfoData.lat,
          longitude: geoData.longitude || ipInfoData.lon,
          timezone: geoData.timezone || ipInfoData.timezone,
        },
        network: {
          isp: geoData.org || ipInfoData.isp,
          organization: ipInfoData.org,
          asn: ipInfoData.as,
          connectionType: geoData.network || null,
        },
        security: {
          isProxy: geoData.privacy?.proxy || false,
          isVpn: geoData.privacy?.vpn || false,
          isTor: geoData.privacy?.tor || false,
          isHosting: geoData.privacy?.hosting || false,
        },
        meta: {
          type: isValidIPv6(targetIP) ? 'IPv6' : 'IPv4',
          isCurrent: targetIP === currentIP,
          lookupTime: new Date().toISOString(),
        }
      };

      setIpInfo(combinedInfo);
    } catch (err) {
      setError(err.message || 'Failed to lookup IP information');
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
          <p>Get detailed information about IP addresses and domains. Similar to ping0.cc functionality.</p>

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
                onClick={() => setQuery('2001:4860:4860::8888')}
                className={styles.exampleButton}
              >
                2001:4860:4860::8888
              </button>
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className={styles.errorSection}>
            <div className={styles.errorBox}>
              <h3>❌ Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <p>Looking up IP information...</p>
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
              </div>

              {/* Basic Information */}
              <div className={styles.infoGroup}>
                <h3>📍 Basic Information</h3>
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
                <h3>🌍 Location</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>Country:</label>
                    <span>{ipInfo.location.country} ({ipInfo.location.countryCode})</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Region/State:</label>
                    <span>{ipInfo.location.region}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <label>City:</label>
                    <span>{ipInfo.location.city}</span>
                  </div>
                  {ipInfo.location.postalCode && (
                    <div className={styles.infoItem}>
                      <label>Postal Code:</label>
                      <span>{ipInfo.location.postalCode}</span>
                    </div>
                  )}
                  {ipInfo.location.timezone && (
                    <div className={styles.infoItem}>
                      <label>Timezone:</label>
                      <span>{ipInfo.location.timezone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Network Information */}
              <div className={styles.infoGroup}>
                <h3>🌐 Network</h3>
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
                  {ipInfo.network.asn && (
                    <div className={styles.infoItem}>
                      <label>ASN:</label>
                      <span>{ipInfo.network.asn}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Information */}
              <div className={styles.infoGroup}>
                <h3>🔒 Security</h3>
                <div className={styles.securityGrid}>
                  <div className={styles.securityItem}>
                    <span className={`${styles.securityBadge} ${ipInfo.security.isProxy ? styles.badgeWarning : styles.badgeSafe}`}>
                      Proxy: {ipInfo.security.isProxy ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.securityItem}>
                    <span className={`${styles.securityBadge} ${ipInfo.security.isVpn ? styles.badgeWarning : styles.badgeSafe}`}>
                      VPN: {ipInfo.security.isVpn ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.securityItem}>
                    <span className={`${styles.securityBadge} ${ipInfo.security.isTor ? styles.badgeDanger : styles.badgeSafe}`}>
                      Tor: {ipInfo.security.isTor ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.securityItem}>
                    <span className={`${styles.securityBadge} ${ipInfo.security.isHosting ? styles.badgeWarning : styles.badgeSafe}`}>
                      Hosting: {ipInfo.security.isHosting ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  onClick={() => navigator.clipboard.writeText(ipInfo.ip)}
                  className={styles.actionButton}
                >
                  📋 Copy IP
                </button>
                {ipInfo.location.latitude && ipInfo.location.longitude && (
                  <button
                    onClick={() => window.open(`https://www.google.com/maps?q=${ipInfo.location.latitude},${ipInfo.location.longitude}`, '_blank')}
                    className={styles.actionButton}
                  >
                    🗺️ View on Map
                  </button>
                )}
                <button
                  onClick={() => {
                    const text = `IP: ${ipInfo.ip}\nLocation: ${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.country}\nISP: ${ipInfo.network.isp}`;
                    navigator.clipboard.writeText(text);
                  }}
                  className={styles.actionButton}
                >
                  📄 Copy All Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}