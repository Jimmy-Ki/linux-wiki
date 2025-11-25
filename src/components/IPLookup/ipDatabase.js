// Lightweight IP Database for Offline Use
// Contains major IP ranges and their corresponding geolocation data

const ipDatabase = {
  // Major US IP ranges
  'US': {
    ranges: [
      { start: '3.0.0.0', end: '3.255.255.255', org: 'Amazon' },
      { start: '4.0.0.0', end: '4.255.255.255', org: 'Level 3' },
      { start: '8.0.0.0', end: '8.255.255.255', org: 'Level 3' },
      { start: '13.0.0.0', end: '13.255.255.255', org: 'Xerox' },
      { start: '17.0.0.0', end: '17.255.255.255', org: 'Apple' },
      { start: '18.0.0.0', end: '18.255.255.255', org: 'MIT' },
      { start: '20.0.0.0', end: '20.255.255.255', org: 'Microsoft' },
      { start: '24.0.0.0', end: '24.255.255.255', org: 'ARIN' },
      { start: '50.0.0.0', end: '50.255.255.255', org: 'ARIN' },
      { start: '64.0.0.0', end: '71.255.255.255', org: 'Various US ISPs' },
      { start: '72.0.0.0', end: '79.255.255.255', org: 'Various US ISPs' },
      { start: '96.0.0.0', end: '127.255.255.255', org: 'Various US ISPs' },
      { start: '142.250.0.0', end: '142.250.255.255', org: 'Google' },
      { start: '172.217.0.0', end: '172.217.255.255', org: 'Google' },
      { start: '173.194.0.0', end: '173.194.255.255', org: 'Google' },
      { start: '192.0.2.0', end: '192.0.2.255', org: 'TEST-NET-1' },
      { start: '198.51.100.0', end: '198.51.100.255', org: 'TEST-NET-2' },
      { start: '203.0.113.0', end: '203.0.113.255', org: 'TEST-NET-3' },
    ],
    country: 'United States',
    countryCode: 'US',
    region: 'North America',
    timezone: 'UTC-5 to UTC-8'
  },

  // Major China IP ranges
  'CN': {
    ranges: [
      { start: '1.0.1.0', end: '1.0.3.255', org: 'CNNIC' },
      { start: '14.0.0.0', end: '14.255.255.255', org: 'CNNIC' },
      { start: '27.0.0.0', end: '27.255.255.255', org: 'CNNIC' },
      { start: '36.0.0.0', end: '36.255.255.255', org: 'CNNIC' },
      { start: '39.0.0.0', end: '39.255.255.255', org: 'CNNIC' },
      { start: '42.0.0.0', end: '42.255.255.255', org: 'CNNIC' },
      { start: '49.0.0.0', end: '49.255.255.255', org: 'CNNIC' },
      { start: '58.0.0.0', end: '58.255.255.255', org: 'CNNIC' },
      { start: '59.0.0.0', end: '59.255.255.255', org: 'CNNIC' },
      { start: '60.0.0.0', end: '60.255.255.255', org: 'CNNIC' },
      { start: '61.0.0.0', end: '61.255.255.255', org: 'CNNIC' },
      { start: '101.0.0.0', end: '101.255.255.255', org: 'CNNIC' },
      { start: '103.0.0.0', end: '103.255.255.255', org: 'CNNIC' },
      { start: '106.0.0.0', end: '106.255.255.255', org: 'CNNIC' },
      { start: '110.0.0.0', end: '110.255.255.255', org: 'CNNIC' },
      { start: '111.0.0.0', end: '111.255.255.255', org: 'CNNIC' },
      { start: '112.0.0.0', end: '112.255.255.255', org: 'CNNIC' },
      { start: '113.0.0.0', end: '113.255.255.255', org: 'CNNIC' },
      { start: '114.0.0.0', end: '114.255.255.255', org: 'CNNIC' },
      { start: '115.0.0.0', end: '115.255.255.255', org: 'CNNIC' },
      { start: '116.0.0.0', end: '116.255.255.255', org: 'CNNIC' },
      { start: '117.0.0.0', end: '117.255.255.255', org: 'CNNIC' },
      { start: '118.0.0.0', end: '118.255.255.255', org: 'CNNIC' },
      { start: '119.0.0.0', end: '119.255.255.255', org: 'CNNIC' },
      { start: '120.0.0.0', end: '120.255.255.255', org: 'CNNIC' },
      { start: '121.0.0.0', end: '121.255.255.255', org: 'CNNIC' },
      { start: '122.0.0.0', end: '122.255.255.255', org: 'CNNIC' },
      { start: '123.0.0.0', end: '123.255.255.255', org: 'CNNIC' },
      { start: '124.0.0.0', end: '124.255.255.255', org: 'CNNIC' },
      { start: '125.0.0.0', end: '125.255.255.255', org: 'CNNIC' },
      { start: '180.0.0.0', end: '180.255.255.255', org: 'CNNIC' },
      { start: '183.0.0.0', end: '183.255.255.255', org: 'CNNIC' },
      { start: '202.0.0.0', end: '202.255.255.255', org: 'CNNIC' },
      { start: '203.0.0.0', end: '203.255.255.255', org: 'CNNIC' },
      { start: '210.0.0.0', end: '210.255.255.255', org: 'CNNIC' },
      { start: '211.0.0.0', end: '211.255.255.255', org: 'CNNIC' },
      { start: '218.0.0.0', end: '218.255.255.255', org: 'CNNIC' },
      { start: '219.0.0.0', end: '219.255.255.255', org: 'CNNIC' },
      { start: '220.0.0.0', end: '220.255.255.255', org: 'CNNIC' },
      { start: '221.0.0.0', end: '221.255.255.255', org: 'CNNIC' },
      { start: '222.0.0.0', end: '222.255.255.255', org: 'CNNIC' },
      { start: '223.0.0.0', end: '223.255.255.255', org: 'CNNIC' },
    ],
    country: 'China',
    countryCode: 'CN',
    region: 'Asia',
    timezone: 'UTC+8'
  },

  // Major European IP ranges
  'DE': {
    ranges: [
      { start: '5.0.0.0', end: '5.255.255.255', org: 'DE-CIX' },
      { start: '46.0.0.0', end: '46.255.255.255', org: 'Various DE' },
      { start: '80.0.0.0', end: '95.255.255.255', org: 'Various EU' },
      { start: '145.0.0.0', end: '145.255.255.255', org: 'DE' },
      { start: '188.0.0.0', end: '188.255.255.255', org: 'Various DE' },
      { start: '192.0.0.0', end: '192.255.255.255', org: 'Various EU' },
    ],
    country: 'Germany',
    countryCode: 'DE',
    region: 'Europe',
    timezone: 'UTC+1'
  },

  // Major Japan IP ranges
  'JP': {
    ranges: [
      { start: '1.0.16.0', end: '1.0.31.255', org: 'APNIC' },
      { start: '43.0.0.0', end: '43.255.255.255', org: 'APNIC' },
      { start: '100.0.0.0', end: '100.255.255.255', org: 'APNIC' },
      { start: '125.0.0.0', end: '125.255.255.255', org: 'APNIC' },
      { start: '133.0.0.0', end: '133.255.255.255', org: 'APNIC' },
      { start: '150.0.0.0', end: '150.255.255.255', org: 'APNIC' },
      { start: '202.0.0.0', end: '202.255.255.255', org: 'APNIC' },
      { start: '203.0.0.0', end: '203.255.255.255', org: 'APNIC' },
      { start: '210.0.0.0', end: '210.255.255.255', org: 'APNIC' },
      { start: '211.0.0.0', end: '211.255.255.255', org: 'APNIC' },
      { start: '218.0.0.0', end: '218.255.255.255', org: 'APNIC' },
      { start: '219.0.0.0', end: '219.255.255.255', org: 'APNIC' },
      { start: '220.0.0.0', end: '220.255.255.255', org: 'APNIC' },
      { start: '221.0.0.0', end: '221.255.255.255', org: 'APNIC' },
      { start: '222.0.0.0', end: '222.255.255.255', org: 'APNIC' },
      { start: '223.0.0.0', end: '223.255.255.255', org: 'APNIC' },
    ],
    country: 'Japan',
    countryCode: 'JP',
    region: 'Asia',
    timezone: 'UTC+9'
  },

  // Major UK IP ranges
  'GB': {
    ranges: [
      { start: '2.0.0.0', end: '2.255.255.255', org: 'RIPE' },
      { start: '25.0.0.0', end: '25.255.255.255', org: 'RIPE' },
      { start: '31.0.0.0', end: '31.255.255.255', org: 'RIPE' },
      { start: '37.0.0.0', end: '37.255.255.255', org: 'RIPE' },
      { start: '46.0.0.0', end: '46.255.255.255', org: 'RIPE' },
      { start: '51.0.0.0', end: '51.255.255.255', org: 'RIPE' },
      { start: '62.0.0.0', end: '62.255.255.255', org: 'RIPE' },
      { start: '77.0.0.0', end: '77.255.255.255', org: 'RIPE' },
      { start: '78.0.0.0', end: '78.255.255.255', org: 'RIPE' },
      { start: '79.0.0.0', end: '79.255.255.255', org: 'RIPE' },
      { start: '80.0.0.0', end: '95.255.255.255', org: 'RIPE' },
      { start: '109.0.0.0', end: '109.255.255.255', org: 'RIPE' },
      { start: '185.0.0.0', end: '185.255.255.255', org: 'RIPE' },
      { start: '194.0.0.0', end: '195.255.255.255', org: 'RIPE' },
    ],
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Europe',
    timezone: 'UTC+0'
  },

  // Private IP ranges
  'PRIVATE': {
    ranges: [
      { start: '10.0.0.0', end: '10.255.255.255', org: 'Private network' },
      { start: '172.16.0.0', end: '172.31.255.255', org: 'Private network' },
      { start: '192.168.0.0', end: '192.168.255.255', org: 'Private network' },
      { start: '127.0.0.0', end: '127.255.255.255', org: 'Loopback' },
    ],
    country: 'Private Network',
    countryCode: 'PR',
    region: 'Local',
    timezone: 'Local'
  }
};

// Convert IP string to number for comparison
function ipToNumber(ip) {
  const parts = ip.split('.').map(Number);
  return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

// Lookup IP in local database
export function lookupIPLocal(ip) {
  // Check if it's a private IP first
  const privateRanges = ipDatabase.PRIVATE.ranges;
  for (const range of privateRanges) {
    const start = ipToNumber(range.start);
    const end = ipToNumber(range.end);
    const ipNum = ipToNumber(ip);

    if (ipNum >= start && ipNum <= end) {
      return {
        country: 'Private Network',
        countryCode: 'PR',
        region: 'Local',
        city: 'Local',
        postalCode: 'N/A',
        latitude: null,
        longitude: null,
        timezone: 'Local',
        isp: range.org,
        organization: range.org,
        asn: 'Private',
        source: 'Local Database - Private'
      };
    }
  }

  // Check country-specific ranges
  for (const [countryCode, countryData] of Object.entries(ipDatabase)) {
    if (countryCode === 'PRIVATE') continue;

    for (const range of countryData.ranges) {
      const start = ipToNumber(range.start);
      const end = ipToNumber(range.end);
      const ipNum = ipToNumber(ip);

      if (ipNum >= start && ipNum <= end) {
        // Try to get more specific city data based on first octet
        let city = 'Unknown';
        let latitude = null;
        let longitude = null;

        // Rough city mapping for major regions
        const firstOctet = parseInt(ip.split('.')[0]);
        if (countryCode === 'US') {
          if (firstOctet >= 64 && firstOctet <= 71) {
            city = 'Various US Cities';
            latitude = 39.8283;
            longitude = -98.5795;
          } else if (firstOctet >= 96 && firstOctet <= 127) {
            city = 'Various US Cities';
            latitude = 39.8283;
            longitude = -98.5795;
          } else if (ip.startsWith('142.250') || ip.startsWith('172.217') || ip.startsWith('173.194')) {
            city = 'Mountain View, CA';
            latitude = 37.4056;
            longitude = -122.0775;
          }
        } else if (countryCode === 'CN') {
          if (firstOctet >= 101 && firstOctet <= 125) {
            city = 'Various Chinese Cities';
            latitude = 39.9042;
            longitude = 116.4074;
          }
        } else if (countryCode === 'JP') {
          city = 'Various Japanese Cities';
          latitude = 35.6762;
          longitude = 139.6503;
        } else if (countryCode === 'DE') {
          city = 'Various German Cities';
          latitude = 52.5200;
          longitude = 13.4050;
        } else if (countryCode === 'GB') {
          city = 'Various UK Cities';
          latitude = 51.5074;
          longitude = -0.1278;
        }

        return {
          country: countryData.country,
          countryCode: countryData.countryCode,
          region: countryData.region,
          city: city,
          postalCode: 'Unknown',
          latitude: latitude,
          longitude: longitude,
          timezone: countryData.timezone,
          isp: range.org,
          organization: range.org,
          asn: 'Unknown',
          source: 'Local Database'
        };
      }
    }
  }

  // If not found in database, return unknown
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
    source: 'Local Database - Not Found'
  };
}

// Get database statistics
export function getDatabaseStats() {
  let totalRanges = 0;
  const countries = Object.keys(ipDatabase).filter(key => key !== 'PRIVATE');

  for (const countryCode of countries) {
    totalRanges += ipDatabase[countryCode].ranges.length;
  }

  return {
    countries: countries.length,
    totalRanges: totalRanges + ipDatabase.PRIVATE.ranges.length,
    privateRanges: ipDatabase.PRIVATE.ranges.length,
    lastUpdated: '2024-01-01'
  };
}