import React from 'react';
import Layout from '@theme/Layout';
import SEO from '../SEO';
import SEO_CONFIG from '../SEO/SEOConfig';
import { generateGameStructuredData, generateWebApplicationStructuredData } from '../SEO/StructuredData';
import styles from './styles.module.css';
import './coming-soon-styles.css';

export default function ToolPageWithAds({
  children,
  title,
  description,
  keywords,
  toolType,
  structuredData,
  canonicalUrl,
  imageUrl,
  breadcrumbs = []
}) {
  // Generate structured data if not provided
  const finalStructuredData = structuredData ||
    (toolType === 'game'
      ? generateGameStructuredData(title, description, canonicalUrl)
      : generateWebApplicationStructuredData(title, description, canonicalUrl)
    );

  // Generate breadcrumb structured data
  const breadcrumbData = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  } : null;

  // Combine structured data
  const combinedStructuredData = breadcrumbData
    ? { ...finalStructuredData, breadcrumbList: breadcrumbData.itemListElement }
    : finalStructuredData;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        imageUrl={imageUrl || SEO_CONFIG.defaultImage}
        type={toolType || 'website'}
        structuredData={combinedStructuredData}
        siteName={SEO_CONFIG.siteName}
      />
      <Layout
        title={title}
        description={description}
      >
        <div className={styles.toolPageContainer}>
          <div className={styles.topAd}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client="ca-pub-1920044696501149"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className={styles.toolContent}>
            {children}
          </div>

          <div className={styles.middleAd}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client="ca-pub-1920044696501149"
              data-ad-slot="2345678901"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>

          <div className={styles.bottomAd}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client="ca-pub-1920044696501149"
              data-ad-slot="3456789012"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}