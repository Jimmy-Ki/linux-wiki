import React from 'react';
import Head from '@docusaurus/Head';

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  imageUrl,
  type = 'website',
  structuredData,
  locale = 'en_US',
  siteName = 'Linux Wiki'
}) => {
  const siteUrl = 'https://linux.wiki';
  const fullUrl = canonicalUrl || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  // Default structured data for tools
  const defaultStructuredData = structuredData || {
    '@context': 'https://schema.org',
    '@type': type === 'game' ? 'Game' : 'WebApplication',
    name: title,
    description: description,
    url: fullUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'Linux Wiki',
      url: siteUrl
    }
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Linux Wiki" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {imageUrl && (
        <meta property="og:image" content={imageUrl} />
      )}
      {imageUrl && (
        <meta property="og:image:alt" content={`${title} - Linux Wiki Tools`} />
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@linuxwiki" />
      <meta name="twitter:creator" content="@linuxwiki" />
      {imageUrl && (
        <meta name="twitter:image" content={imageUrl} />
      )}

      {/* Additional Meta Tags */}
      <meta name="language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(defaultStructuredData, null, 2)}
      </script>

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    </Head>
  );
};

export default SEO;