import React, { useState } from 'react';
import { IconSearch, IconWorld, IconCalendar, IconMail, IconPhone, IconBuilding, IconClock, IconExternalLink, IconRefresh, IconAlertTriangle } from '@tabler/icons-react';
import styles from './styles.module.css';

export default function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');

  const validateDomain = (input) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(input);
  };

  const cleanDomain = (input) => {
    return input.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const extractValue = (obj, keys) => {
    for (const key of keys) {
      if (obj[key]) return obj[key];
    }
    return 'Not available';
  };

  const extractEvents = (events) => {
    const extracted = {};
    if (!Array.isArray(events)) return extracted;

    events.forEach(event => {
      const eventAction = event.eventAction;
      if (eventAction && event.eventDate) {
        extracted[eventAction] = event.eventDate;
      }
    });

    return extracted;
  };

  const searchWhois = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    const cleanInput = cleanDomain(domain);
    if (!validateDomain(cleanInput)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setFallbackUrl('');

    try {
      // Try RDAP API first (completely free, no limits)
      const rdapResponse = await fetch(`https://rdap.org/domain/${cleanInput}`);

      if (rdapResponse.ok) {
        const data = await rdapResponse.json();

        // Parse RDAP data
        const events = extractEvents(data.events || []);
        const status = data.status ? data.status.join(', ') : 'Unknown';

        const parsedResult = {
          domain: cleanInput,
          status: status,
          registrar: extractValue(data.entities?.[0] || {}, {
            vcardArray: 'vcardArray',
            name: 'name'
          }),
          created: events['registration'] || events['created'] || 'Unknown',
          expires: events['expiration'] || events['expired'] || 'Unknown',
          updated: events['last changed'] || events['updated'] || 'Unknown',
          nameServers: data.nameservers?.map(ns => ns.unicodeName || ns.ldhName) || [],
          dnssec: data.secureDNS?.delegationSigned ? 'Enabled' : 'Disabled',
          contacts: (data.entities || []).map(entity => ({
            role: entity.roles?.join(', ') || 'Unknown',
            name: extractValue(entity, {
              vcardArray: 'vcardArray',
              name: 'name'
            }),
            organization: extractValue(entity, { organization: 'organization' }),
            email: extractValue(entity, { vcardArray: 'vcardArray' }),
            phone: extractValue(entity, { vcardArray: 'vcardArray' })
          }))
        };

        setResult(parsedResult);
      } else {
        throw new Error('RDAP lookup failed');
      }
    } catch (err) {
      console.error('RDAP Error:', err);

      // Fallback to alternative API or external link
      try {
        // Try WhoisJSON as backup (1000 free requests/month)
        const fallbackResponse = await fetch(`https://api.whoisjson.com/v1/${cleanInput}`);

        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          setResult({
            domain: cleanInput,
            registrar: data.registrar?.name || 'Unknown',
            created: data.created_at || 'Unknown',
            expires: data.expires_at || 'Unknown',
            updated: data.updated_at || 'Unknown',
            nameServers: data.name_servers || [],
            status: data.status || 'Unknown',
            dnssec: 'Unknown',
            contacts: []
          });
        } else {
          throw new Error('All APIs failed');
        }
      } catch (fallbackErr) {
        // If all APIs fail, provide external link
        setFallbackUrl(`https://www.whois.com/whois/${cleanInput}`);
        setError('Direct lookup failed. Click the link below to check WHOIS information on an external site.');
      }
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWhois();
    }
  };

  const formatContact = (contact) => {
    const details = [];
    if (contact.name && contact.name !== 'Not available') details.push(contact.name);
    if (contact.organization && contact.organization !== 'Not available') details.push(contact.organization);
    if (contact.email && contact.email !== 'Not available') details.push(contact.email);
    if (contact.phone && contact.phone !== 'Not available') details.push(contact.phone);
    return details.join(' • ') || 'No contact information';
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconWorld size={32} /> WHOIS Domain Lookup</h1>
          <p>Get detailed information about any domain name</p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter domain name (e.g., example.com)"
              className={styles.input}
            />
            <button
              onClick={searchWhois}
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? (
                <><IconRefresh size={16} className={styles.spinning} /> Searching...</>
              ) : (
                <><IconSearch size={16} /> Search</>
              )}
            </button>
          </div>
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              <IconAlertTriangle size={16} />
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h2>WHOIS Information for {result.domain}</h2>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3><IconBuilding size={18} /> Domain Status</h3>
                <p><strong>Status:</strong> {result.status}</p>
                <p><strong>DNSSEC:</strong> {result.dnssec}</p>
              </div>

              <div className={styles.infoCard}>
                <h3><IconBuilding size={18} /> Registrar</h3>
                <p>{result.registrar}</p>
              </div>

              <div className={styles.infoCard}>
                <h3><IconCalendar size={18} /> Important Dates</h3>
                <p><strong>Created:</strong> {formatDateTime(result.created)}</p>
                <p><strong>Expires:</strong> {formatDateTime(result.expires)}</p>
                <p><strong>Updated:</strong> {formatDateTime(result.updated)}</p>
              </div>

              {result.nameServers && result.nameServers.length > 0 && (
                <div className={styles.infoCard}>
                  <h3><IconWorld size={18} /> Name Servers</h3>
                  <ul>
                    {result.nameServers.map((ns, index) => (
                      <li key={index}>{ns}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {result.contacts && result.contacts.length > 0 && (
              <div className={styles.contactsSection}>
                <h3><IconMail size={18} /> Contact Information</h3>
                <div className={styles.contactsGrid}>
                  {result.contacts.map((contact, index) => (
                    <div key={index} className={styles.contactCard}>
                      <h4>{contact.role}</h4>
                      <p>{formatContact(contact)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {fallbackUrl && (
          <div className={styles.fallbackSection}>
            <div className={styles.fallbackCard}>
              <h3><IconExternalLink size={20} /> External WHOIS Lookup</h3>
              <p>For complete WHOIS information, please use an external service:</p>
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                View WHOIS on whois.com
                <IconExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h4>About WHOIS</h4>
            <p>
              WHOIS is a query and response protocol that provides information about domain names
              and IP addresses. This tool uses multiple data sources including RDAP (Registration
              Data Access Protocol) and public APIs to provide comprehensive domain information.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h4>Data Sources</h4>
            <ul>
              <li><strong>RDAP.org:</strong> Official protocol, no rate limits</li>
              <li><strong>WhoisJSON API:</strong> 1,000 free requests/month</li>
              <li><strong>Fallback:</strong> External WHOIS services</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h4>Privacy Notice</h4>
            <p>
              Some domain owners use privacy protection services. In such cases, personal
              contact information may be hidden from public WHOIS records. This is a legitimate
              service offered by many registrars to protect domain owners from spam and unwanted contact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}