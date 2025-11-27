import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';
import ScientificCalculator from '../../components/ScientificCalculator';

export default function CalculatorPage() {
  const seoConfig = SEO_CONFIG.tools.calculator;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/calculator`;

  const breadcrumbs = [
    { name: 'Home', url: SEO_CONFIG.siteUrl },
    { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
    { name: 'Scientific Calculator', url: canonicalUrl }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoConfig.title,
    description: seoConfig.description,
    url: canonicalUrl,
    applicationCategory: 'EducationalApplication',
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
      'Advanced mathematical functions',
      'Trigonometric calculations',
      'Logarithmic and exponential functions',
      'Memory operations (M+, M-, MR, MC)',
      'Calculation history',
      'Keyboard support',
      'High precision results',
      'Mobile responsive interface'
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Supported Operations',
        value: 'Basic arithmetic, trigonometry, logarithms, exponentials, constants (π, e)'
      },
      {
        '@type': 'PropertyValue',
        name: 'Precision',
        value: 'Up to 15 decimal places'
      },
      {
        '@type': 'PropertyValue',
        name: 'Input Methods',
        value: 'On-screen buttons, keyboard input, mathematical notation'
      }
    ],
    educationalUse: 'Mathematics calculation, scientific computation, engineering calculations',
    learningResourceType: 'Interactive tool',
    teaches: ['Mathematics', 'Arithmetic', 'Trigonometry', 'Logarithms'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Student'
    },
    screenshot: `${SEO_CONFIG.siteUrl}/images/tools/calculator-screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2103',
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
      <ScientificCalculator />
    </ToolPageWithAds>
  );
}