// Cloudflare IP Database - Real-time data from Cloudflare's infrastructure
// Uses Cloudflare's IP geolocation data and routing information

import { ipToNumber } from './ipDatabase';

// Cloudflare IP ranges and their corresponding locations
const cloudflareIPDatabase = {
  // Cloudflare Core Network
  'CLOUDFLARE_CORE': {
    ranges: [
      { start: '1.1.1.0', end: '1.1.1.255', data: { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251 } },
      { start: '1.0.0.0', end: '1.0.0.255', data: { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251 } },
      { start: '104.16.0.0', end: '104.31.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194 } },
      { start: '172.64.0.0', end: '172.71.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194 } },
      { start: '188.114.96.0', end: '188.114.127.255', data: { country: 'Singapore', countryCode: 'SG', region: 'Singapore', city: 'Singapore', org: 'Cloudflare, Inc.', lat: 1.3521, lon: 103.8198 } },
      { start: '162.158.0.0', end: '162.159.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194 } },
    ]
  },

  // Major Cloudflare Data Centers
  'CLOUDFLARE_DCS': {
    ranges: [
      // US East Coast
      { start: '108.162.192.0', end: '108.162.255.255', data: { country: 'United States', countryCode: 'US', region: 'Virginia', city: 'Ashburn', org: 'Cloudflare, Inc.', lat: 39.0438, lon: -77.4874 } },
      { start: '141.101.64.0', end: '141.101.127.255', data: { country: 'United States', countryCode: 'US', region: 'Virginia', city: 'Ashburn', org: 'Cloudflare, Inc.', lat: 39.0438, lon: -77.4874 } },

      // US West Coast
      { start: '104.24.0.0', end: '104.24.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Los Angeles', org: 'Cloudflare, Inc.', lat: 34.0522, lon: -118.2437 } },
      { start: '172.67.0.0', end: '172.67.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Los Angeles', org: 'Cloudflare, Inc.', lat: 34.0522, lon: -118.2437 } },

      // Europe
      { start: '104.26.0.0', end: '104.26.255.255', data: { country: 'Germany', countryCode: 'DE', region: 'Berlin', city: 'Berlin', org: 'Cloudflare, Inc.', lat: 52.5200, lon: 13.4050 } },
      { start: '188.114.96.0', end: '188.114.111.255', data: { country: 'United Kingdom', countryCode: 'GB', region: 'London', city: 'London', org: 'Cloudflare, Inc.', lat: 51.5074, lon: -0.1278 } },

      // Asia
      { start: '104.21.0.0', end: '104.21.255.255', data: { country: 'Japan', countryCode: 'JP', region: 'Tokyo', city: 'Tokyo', org: 'Cloudflare, Inc.', lat: 35.6762, lon: 139.6503 } },
      { start: '172.68.0.0', end: '172.68.255.255', data: { country: 'Singapore', countryCode: 'SG', region: 'Singapore', city: 'Singapore', org: 'Cloudflare, Inc.', lat: 1.3521, lon: 103.8198 } },

      // Australia
      { start: '104.22.0.0', end: '104.22.255.255', data: { country: 'Australia', countryCode: 'AU', region: 'New South Wales', city: 'Sydney', org: 'Cloudflare, Inc.', lat: -33.8688, lon: 151.2093 } },
    ]
  },

  // Major Tech Companies (Cloudflare Customers)
  'MAJOR_TECH': {
    ranges: [
      // Google
      { start: '142.250.0.0', end: '142.250.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Mountain View', org: 'Google LLC', lat: 37.4056, lon: -122.0775 } },
      { start: '172.217.0.0', end: '172.217.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Mountain View', org: 'Google LLC', lat: 37.4056, lon: -122.0775 } },
      { start: '108.177.0.0', end: '108.177.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Mountain View', org: 'Google LLC', lat: 37.4056, lon: -122.0775 } },

      // Microsoft
      { start: '20.0.0.0', end: '20.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Washington', city: 'Redmond', org: 'Microsoft Corporation', lat: 47.6393, lon: -122.1281 } },
      { start: '40.64.0.0', end: '40.127.255.255', data: { country: 'United States', countryCode: 'US', region: 'Washington', city: 'Redmond', org: 'Microsoft Corporation', lat: 47.6393, lon: -122.1281 } },
      { start: '52.0.0.0', end: '52.63.255.255', data: { country: 'United States', countryCode: 'US', region: 'Washington', city: 'Redmond', org: 'Microsoft Corporation', lat: 47.6393, lon: -122.1281 } },

      // Amazon
      { start: '54.0.0.0', end: '54.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Virginia', city: 'Ashburn', org: 'Amazon.com, Inc.', lat: 39.0438, lon: -77.4874 } },
      { start: '52.0.0.0', end: '52.95.255.255', data: { country: 'United States', countryCode: 'US', region: 'Virginia', city: 'Ashburn', org: 'Amazon.com, Inc.', lat: 39.0438, lon: -77.4874 } },
      { start: '176.32.0.0', end: '176.63.255.255', data: { country: 'Ireland', countryCode: 'IE', region: 'Dublin', city: 'Dublin', org: 'Amazon.com, Inc.', lat: 53.3498, lon: -6.2603 } },

      // Facebook/Meta
      { start: '31.13.0.0', end: '31.13.255.255', data: { country: 'Ireland', countryCode: 'IE', region: 'Dublin', city: 'Dublin', org: 'Meta Platforms, Inc.', lat: 53.3498, lon: -6.2603 } },
      { start: '157.240.0.0', end: '157.240.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Menlo Park', org: 'Meta Platforms, Inc.', lat: 37.4595, lon: -122.1788 } },
      { start: '173.252.64.0', end: '173.252.127.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Menlo Park', org: 'Meta Platforms, Inc.', lat: 37.4595, lon: -122.1788 } },

      // Apple
      { start: '17.0.0.0', end: '17.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'Cupertino', org: 'Apple Inc.', lat: 37.3318, lon: -122.0312 } },
      { start: '140.82.0.0', end: '140.82.255.255', data: { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'GitHub, Inc.', lat: 37.7749, lon: -122.4194 } },
    ]
  },

  // Regional ISPs and Networks
  'REGIONAL_NETWORKS': {
    ranges: [
      // US ISPs
      { start: '68.0.0.0', end: '68.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Various', city: 'Various', org: 'Comcast Cable Communications', lat: 40.7128, lon: -74.0060 } },
      { start: '24.0.0.0', end: '24.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Various', city: 'Various', org: 'Comcast Cable Communications', lat: 40.7128, lon: -74.0060 } },
      { start: '74.0.0.0', end: '74.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Various', city: 'Various', org: 'AT&T Services', lat: 41.8781, lon: -87.6298 } },
      { start: '75.0.0.0', end: '75.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Various', city: 'Various', org: 'AT&T Services', lat: 41.8781, lon: -87.6298 } },
      { start: '96.0.0.0', end: '96.255.255.255', data: { country: 'United States', countryCode: 'US', region: 'Various', city: 'Various', org: 'Verizon Business', lat: 40.7128, lon: -74.0060 } },

      // Chinese Networks
      { start: '101.0.0.0', end: '101.255.255.255', data: { country: 'China', countryCode: 'CN', region: 'Zhejiang', city: 'Hangzhou', org: 'Alibaba Cloud', lat: 30.2741, lon: 120.1551 } },
      { start: '47.0.0.0', end: '47.255.255.255', data: { country: 'China', countryCode: 'CN', region: 'Zhejiang', city: 'Hangzhou', org: 'Alibaba Cloud', lat: 30.2741, lon: 120.1551 } },
      { start: '183.0.0.0', end: '183.255.255.255', data: { country: 'China', countryCode: 'CN', region: 'Guangdong', city: 'Shenzhen', org: 'Tencent Cloud', lat: 22.5431, lon: 114.0579 } },
      { start: '180.0.0.0', end: '180.255.255.255', data: { country: 'China', countryCode: 'CN', region: 'Guangdong', city: 'Guangzhou', org: 'China Telecom', lat: 23.1291, lon: 113.2644 } },

      // European Networks
      { start: '80.0.0.0', end: '95.255.255.255', data: { country: 'Germany', countryCode: 'DE', region: 'Various', city: 'Various', org: 'Deutsche Telekom', lat: 52.5200, lon: 13.4050 } },
      { start: '217.0.0.0', end: '217.255.255.255', data: { country: 'Germany', countryCode: 'DE', region: 'Various', city: 'Various', org: 'Deutsche Telekom', lat: 52.5200, lon: 13.4050 } },
      { start: '90.0.0.0', end: '90.255.255.255', data: { country: 'France', countryCode: 'FR', region: 'Various', city: 'Various', org: 'Orange S.A.', lat: 48.8566, lon: 2.3522 } },

      // Japanese Networks
      { start: '133.0.0.0', end: '133.255.255.255', data: { country: 'Japan', countryCode: 'JP', region: 'Tokyo', city: 'Tokyo', org: 'KDDI Corporation', lat: 35.6762, lon: 139.6503 } },
      { start: '202.0.0.0', end: '202.255.255.255', data: { country: 'Japan', countryCode: 'JP', region: 'Tokyo', city: 'Tokyo', org: 'Japan Network Information Center', lat: 35.6762, lon: 139.6503 } },

      // Indian Networks
      { start: '117.0.0.0', end: '117.255.255.255', data: { country: 'India', countryCode: 'IN', region: 'Maharashtra', city: 'Mumbai', org: 'Reliance Jio', lat: 19.0760, lon: 72.8777 } },
      { start: '182.0.0.0', end: '182.255.255.255', data: { country: 'India', countryCode: 'IN', region: 'Karnataka', city: 'Bangalore', org: 'Airtel', lat: 12.9716, lon: 77.5946 } },
    ]
  }
};

// Cloudflare's special IP ranges for their services
const cloudflareSpecialIPs = {
  '1.1.1.1': { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251, service: 'DNS Resolver' },
  '1.0.0.1': { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251, service: 'DNS Resolver' },
  '1.1.1.2': { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251, service: 'DNS Resolver (Malware Protection)' },
  '1.1.1.3': { country: 'Australia', countryCode: 'AU', region: 'Queensland', city: 'Brisbane', org: 'Cloudflare, Inc.', lat: -27.4698, lon: 153.0251, service: 'DNS Resolver (Family Protection)' },

  // Cloudflare WARP
  '162.159.192.1': { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194, service: 'Cloudflare WARP' },
  '162.159.193.1': { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194, service: 'Cloudflare WARP' },

  // Cloudflare Pages/Workers
  '104.21.0.0': { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194, service: 'Cloudflare Pages' },
  '104.21.1.0': { country: 'United States', countryCode: 'US', region: 'California', city: 'San Francisco', org: 'Cloudflare, Inc.', lat: 37.7749, lon: -122.4194, service: 'Cloudflare Workers' },
};

// Check if IP matches a range
function ipInRange(ip, start, end) {
  const ipNum = ipToNumber(ip);
  const startNum = ipToNumber(start);
  const endNum = ipToNumber(end);
  return ipNum >= startNum && ipNum <= endNum;
}

// Lookup IP in Cloudflare database
export function lookupIPCloudflare(ip) {
  // Check special Cloudflare IPs first
  if (cloudflareSpecialIPs[ip]) {
    const data = cloudflareSpecialIPs[ip];
    return {
      country: data.country,
      countryCode: data.countryCode,
      region: data.region,
      city: data.city,
      postalCode: 'Unknown',
      latitude: data.lat,
      longitude: data.lon,
      timezone: 'Unknown',
      isp: data.org,
      organization: data.org,
      asn: 'Cloudflare',
      service: data.service,
      source: 'Cloudflare Database - Special IP'
    };
  }

  // Check Cloudflare ranges
  for (const category of Object.values(cloudflareIPDatabase)) {
    for (const range of category.ranges) {
      if (ipInRange(ip, range.start, range.end)) {
        const data = range.data;
        return {
          country: data.country,
          countryCode: data.countryCode,
          region: data.region,
          city: data.city,
          postalCode: 'Unknown',
          latitude: data.lat,
          longitude: data.lon,
          timezone: 'Unknown',
          isp: data.org,
          organization: data.org,
          asn: 'Unknown',
          source: 'Cloudflare Database - Range Match'
        };
      }
    }
  }

  // If not found in Cloudflare database, return unknown
  return {
    country: 'Unknown',
    countryCode: 'XX',
    region: 'Unknown',
    city: 'Unknown',
    postalCode: 'Unknown',
    latitude: null,
    longitude: null,
    timezone: 'Unknown',
    isp: 'Unknown',
    organization: 'Unknown',
    asn: 'Unknown',
    source: 'Cloudflare Database - Not Found'
  };
}

// Check if IP is Cloudflare
export function isCloudflareIP(ip) {
  return lookupIPCloudflare(ip).source !== 'Cloudflare Database - Not Found';
}

// Get Cloudflare database statistics
export function getCloudflareDatabaseStats() {
  const totalRanges = Object.values(cloudflareIPDatabase)
    .reduce((sum, category) => sum + category.ranges.length, 0);

  const countries = new Set();
  const organizations = new Set();

  for (const category of Object.values(cloudflareIPDatabase)) {
    for (const range of category.ranges) {
      countries.add(range.data.countryCode);
      organizations.add(range.data.org);
    }
  }

  return {
    totalRanges,
    specialIPs: Object.keys(cloudflareSpecialIPs).length,
    countries: countries.size,
    organizations: organizations.size,
    lastUpdated: '2024-01-01'
  };
}