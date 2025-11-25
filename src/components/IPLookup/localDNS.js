// Local DNS Resolution - Completely Offline
// Contains a small cache of popular domain-to-IP mappings

const dnsCache = {
  // Popular tech domains
  'google.com': ['142.250.191.238', '142.250.185.78', '142.250.191.14'],
  'www.google.com': ['142.250.191.100', '142.250.185.100', '142.250.191.104'],
  'youtube.com': ['142.250.191.14', '142.250.185.14', '142.250.191.46'],
  'facebook.com': ['157.240.229.35', '157.240.24.35', '157.240.25.35'],
  'twitter.com': ['104.244.42.1', '104.244.42.129', '104.244.42.193'],
  'x.com': ['104.244.42.1', '104.244.42.129', '104.244.42.193'],
  'instagram.com': ['157.240.24.174', '157.240.25.174', '157.240.22.174'],
  'linkedin.com': ['108.174.10.10', '108.174.10.27', '108.174.11.10'],
  'github.com': ['140.82.112.3', '140.82.112.4', '140.82.113.3'],
  'stackoverflow.com': ['151.101.65.69', '151.101.193.69', '151.101.1.69'],
  'wikipedia.org': ['208.80.154.224', '208.80.154.238', '208.80.153.224'],
  'reddit.com': ['151.101.65.140', '151.101.1.140', '151.101.193.140'],

  // Chinese domains
  'baidu.com': ['220.181.38.148', '220.181.38.149', '123.125.114.144'],
  'qq.com': ['180.163.151.162', '180.163.151.33', '180.163.151.34'],
  'taobao.com': ['47.246.26.122', '47.246.26.121', '47.246.26.123'],
  'tmall.com': ['47.246.26.122', '47.246.26.121', '47.246.26.123'],
  'weibo.com': ['180.149.132.47', '180.149.132.48', '180.149.132.49'],
  'zhihu.com': ['101.33.197.233', '101.33.197.235', '101.33.197.236'],

  // Japanese domains
  'yahoo.co.jp': ['182.22.59.229', '182.22.59.243', '182.22.24.252'],
  'amazon.co.jp': ['52.119.161.11', '52.119.161.87', '52.119.164.11'],
  'rakuten.co.jp': ['133.237.49.89', '133.237.49.90', '133.237.49.91'],

  // European domains
  'bbc.co.uk': ['151.101.0.81', '151.101.64.81', '151.101.128.81'],
  'bbc.com': ['151.101.0.81', '151.101.64.81', '151.101.128.81'],
  'spiegel.de': ['128.76.218.208', '128.76.218.209', '128.76.218.210'],
  'lemonde.fr': ['151.101.0.208', '151.101.64.208', '151.101.128.208'],

  // Cloud services
  'amazon.com': ['52.94.236.248', '176.32.98.166', '178.236.7.219'],
  'aws.amazon.com': ['52.94.236.248', '176.32.98.166', '178.236.7.219'],
  'microsoft.com': ['20.112.52.29', '20.70.246.20', '20.23.208.101'],
  'apple.com': ['17.253.144.10', '17.253.144.16', '17.253.144.11'],
  'netflix.com': ['52.32.109.176', '54.209.225.72', '54.148.156.101'],
  'cloudflare.com': ['104.16.123.96', '104.16.124.96', '104.16.125.96'],

  // Common services
  'googleapis.com': ['142.250.191.238', '142.250.185.238', '142.250.191.46'],
  'gstatic.com': ['142.250.191.163', '142.250.185.163', '142.250.191.195'],
  'doubleclick.net': ['142.250.191.158', '142.250.185.158', '142.250.191.46'],
  'google-analytics.com': ['142.250.191.238', '142.250.185.238', '142.250.191.46'],

  // DNS servers
  'dns.google': ['8.8.8.8', '8.8.4.4', '2001:4860:4860::8888'],
  'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1', '2606:4700:4700::1111'],
  'opendns.com': ['208.67.222.222', '208.67.220.220', '2620:119:35::35'],

  // Testing domains
  'example.com': ['93.184.216.34'],
  'test.com': ['69.172.200.235'],
  'localhost': ['127.0.0.1'],
};

// Resolve domain locally
export function resolveDomainLocal(domain) {
  const normalizedDomain = domain.toLowerCase().trim();

  // Direct lookup
  if (dnsCache[normalizedDomain]) {
    const ips = dnsCache[normalizedDomain];
    return {
      success: true,
      ip: ips[0], // Return the first IP
      allIPs: ips,
      source: 'Local DNS Cache'
    };
  }

  // Try subdomain lookup
  const domainParts = normalizedDomain.split('.');
  if (domainParts.length >= 2) {
    const rootDomain = domainParts.slice(-2).join('.');
    if (dnsCache[rootDomain]) {
      const ips = dnsCache[rootDomain];
      return {
        success: true,
        ip: ips[0],
        allIPs: ips,
        source: 'Local DNS Cache - Subdomain'
      };
    }
  }

  // Special cases for common patterns
  if (normalizedDomain.endsWith('.google.com')) {
    return {
      success: true,
      ip: '142.250.191.238',
      allIPs: ['142.250.191.238'],
      source: 'Local DNS Cache - Google Pattern'
    };
  }

  if (normalizedDomain.endsWith('.amazon.com')) {
    return {
      success: true,
      ip: '52.94.236.248',
      allIPs: ['52.94.236.248'],
      source: 'Local DNS Cache - Amazon Pattern'
    };
  }

  if (normalizedDomain.endsWith('.microsoft.com')) {
    return {
      success: true,
      ip: '20.112.52.29',
      allIPs: ['20.112.52.29'],
      source: 'Local DNS Cache - Microsoft Pattern'
    };
  }

  if (normalizedDomain.endsWith('.facebook.com')) {
    return {
      success: true,
      ip: '157.240.229.35',
      allIPs: ['157.240.229.35'],
      source: 'Local DNS Cache - Facebook Pattern'
    };
  }

  if (normalizedDomain.endsWith('.apple.com')) {
    return {
      success: true,
      ip: '17.253.144.10',
      allIPs: ['17.253.144.10'],
      source: 'Local DNS Cache - Apple Pattern'
    };
  }

  if (normalizedDomain.endsWith('.netflix.com')) {
    return {
      success: true,
      ip: '52.32.109.176',
      allIPs: ['52.32.109.176'],
      source: 'Local DNS Cache - Netflix Pattern'
    };
  }

  // Cannot resolve locally
  return {
    success: false,
    ip: null,
    allIPs: [],
    source: 'Local DNS Cache - Not Found'
  };
}

// Add domain to cache
export function addDomainToCache(domain, ip) {
  const normalizedDomain = domain.toLowerCase().trim();
  if (!dnsCache[normalizedDomain]) {
    dnsCache[normalizedDomain] = [];
  }
  if (!dnsCache[normalizedDomain].includes(ip)) {
    dnsCache[normalizedDomain].push(ip);
  }
}

// Get cache statistics
export function getDNSCacheStats() {
  const totalDomains = Object.keys(dnsCache).length;
  let totalIPs = 0;

  for (const domain in dnsCache) {
    totalIPs += dnsCache[domain].length;
  }

  return {
    totalDomains,
    totalIPs,
    lastUpdated: '2024-01-01'
  };
}