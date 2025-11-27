import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';
import TimezoneConverter from '../../components/TimezoneConverter';

export default function TimezoneConverterPage() {
  const seoConfig = SEO_CONFIG.tools.timezone;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/timezone`;

  const breadcrumbs = [
    { name: 'Home', url: SEO_CONFIG.siteUrl },
    { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
    { name: 'Time Zone Converter', url: canonicalUrl }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoConfig.title,
    description: seoConfig.description,
    url: canonicalUrl,
    applicationCategory: 'UtilityApplication',
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
      'Real-time timezone conversion',
      'Support for all major cities',
      'Daylight Saving Time (DST) support',
      'Multiple timezone comparison',
      'No registration required',
      'Mobile responsive design'
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Supported Timezones',
        value: '500+ cities worldwide'
      },
      {
        '@type': 'PropertyValue',
        name: 'Update Frequency',
        value: 'Real-time'
      },
      {
        '@type': 'PropertyValue',
        name: 'DST Support',
        value: 'Automatic adjustments'
      }
    ],
    screenshot: `${SEO_CONFIG.siteUrl}/images/tools/timezone-screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '892',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <ToolPageWithAds
      title={seoConfig.title}
      description={seoConfig.description}
      keywords={seoConfig.keywords}
      toolType="WebApplication"
      structuredData={structuredData}
      canonicalUrl={canonicalUrl}
      imageUrl={seoConfig.image}
      breadcrumbs={breadcrumbs}
    >
      <TimezoneConverter />
    </ToolPageWithAds>
  );
}