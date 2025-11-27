import { SEO_CONFIG } from './SEOConfig';

export const generateGameStructuredData = (title, description, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: title,
  description: description,
  url: url,
  applicationCategory: 'Game',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  author: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  publisher: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  gamePlatform: 'Web Browser',
  genre: ['Puzzle', 'Strategy', 'Brain Training'],
  audience: {
    '@type': 'Audience',
    audienceType: 'General'
  }
});

export const generateWebApplicationStructuredData = (title, description, url, category = 'UtilityApplication') => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: title,
  description: description,
  url: url,
  applicationCategory: category,
  operatingSystem: 'Any',
  browserRequirements: 'HTML5, CSS3, JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  author: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  publisher: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  featureList: [
    'Free to use',
    'No registration required',
    'Works on all devices',
    'Fast and reliable'
  ]
});

export const generateSoftwareStructuredData = (title, description, url, softwareType) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: title,
  description: description,
  url: url,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  softwareVersion: '1.0',
  author: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  publisher: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  screenshot: `${SEO_CONFIG.siteUrl}/images/tools/${url.split('/').pop()}-screenshot.png`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '156',
    bestRating: '5',
    worstRating: '1'
  }
});

export const generateBreadcrumbStructuredData = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});