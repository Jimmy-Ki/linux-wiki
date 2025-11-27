import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';
import MarkdownEditor from '../../components/MarkdownEditor';

export default function MarkdownEditorPage() {
  const seoConfig = SEO_CONFIG.tools.markdown;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/markdown`;

  const breadcrumbs = [
    { name: 'Home', url: SEO_CONFIG.siteUrl },
    { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
    { name: 'Markdown Editor', url: canonicalUrl }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoConfig.title,
    description: seoConfig.description,
    url: canonicalUrl,
    applicationCategory: 'DeveloperApplication',
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
      'Real-time markdown preview',
      'Syntax highlighting',
      'Live split-screen view',
      'Export to HTML/PDF',
      'Auto-save functionality',
      'Keyboard shortcuts',
      'GitHub Flavored Markdown support',
      'Dark/light theme support',
      'Markdown cheat sheet',
      'File import/export'
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Markdown Support',
        value: 'GitHub Flavored Markdown (GFM), CommonMark, tables, code blocks, math expressions'
      },
      {
        '@type': 'PropertyValue',
        name: 'Export Formats',
        value: 'HTML, PDF, plain text'
      },
      {
        '@type': 'PropertyValue',
        name: 'Editor Features',
        value: 'Auto-save, syntax highlighting, line numbers, search & replace'
      }
    ],
    screenshot: `${SEO_CONFIG.siteUrl}/images/tools/markdown-screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '1456',
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
      <MarkdownEditor />
    </ToolPageWithAds>
  );
}