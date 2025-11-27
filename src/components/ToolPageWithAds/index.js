import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import './coming-soon-styles.css';

export default function ToolPageWithAds({ children, title, description }) {
  return (
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
  );
}