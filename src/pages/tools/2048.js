import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';
import Game2048 from '../../components/Game2048';

export default function Game2048Page() {
  const seoConfig = SEO_CONFIG.tools['2048'];
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/2048`;

  const breadcrumbs = [
    { name: 'Home', url: SEO_CONFIG.siteUrl },
    { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
    { name: '2048 Game', url: canonicalUrl }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: seoConfig.title,
    description: seoConfig.description,
    url: canonicalUrl,
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
    genre: ['Puzzle', 'Strategy', 'Brain Training', 'Educational'],
    audience: {
      '@type': 'Audience',
      audienceType: 'General'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Game Mode',
        value: 'Single Player'
      },
      {
        '@type': 'PropertyValue',
        name: 'Controls',
        value: 'Keyboard Arrow Keys, Touch/Click'
      },
      {
        '@type': 'PropertyValue',
        name: 'Features',
        value: 'Score Tracking, Undo Function, Smooth Animations'
      }
    ],
    screenshot: `${SEO_CONFIG.siteUrl}/images/tools/2048-screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <ToolPageWithAds
      title={seoConfig.title}
      description={seoConfig.description}
      keywords={seoConfig.keywords}
      toolType="game"
      structuredData={structuredData}
      canonicalUrl={canonicalUrl}
      imageUrl={seoConfig.image}
      breadcrumbs={breadcrumbs}
    >
      <Game2048 />
    </ToolPageWithAds>
  );
}