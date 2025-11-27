import React from 'react';
import ToolPageWithAds from '../../components/ToolPageWithAds';
import SEO_CONFIG from '../../components/SEO/SEOConfig';
import LinuxCommandsGenerator from '../../components/LinuxCommandsGenerator';

export default function LinuxCommandsPage() {
  const seoConfig = SEO_CONFIG.tools['linux-commands'];
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/tools/linux-commands`;

  const breadcrumbs = [
    { name: 'Home', url: SEO_CONFIG.siteUrl },
    { name: 'Tools', url: `${SEO_CONFIG.siteUrl}/tools` },
    { name: 'Linux Commands Generator', url: canonicalUrl }
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
      'Interactive command builder',
      'System administration commands',
      'Network configuration tools',
      'File management operations',
      'Process management',
      'Security and permissions',
      'Package management',
      'Copy-paste ready commands',
      'Command explanations',
      'Multiple Linux distributions support'
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Supported Categories',
        value: 'File operations, system admin, networking, security, process management, package management'
      },
      {
        '@type': 'PropertyValue',
        name: 'Linux Distributions',
        value: 'Ubuntu, CentOS, Debian, Red Hat, Fedora, Arch Linux'
      },
      {
        '@type': 'PropertyValue',
        name: 'Command Features',
        value: 'Auto-completion, syntax highlighting, parameter descriptions, examples'
      }
    ],
    teaches: [
      'Linux command line',
      'System administration',
      'Network configuration',
      'File system management',
      'Shell scripting'
    ],
    learningResourceType: 'Interactive tool',
    educationalUse: 'Linux system administration, command line learning, shell scripting',
    screenshot: `${SEO_CONFIG.siteUrl}/images/tools/linux-commands-screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '1879',
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
      <LinuxCommandsGenerator />
    </ToolPageWithAds>
  );
}