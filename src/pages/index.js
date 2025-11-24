import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CommandSearch from '@site/src/components/CommandSearch';
import AdSenseAd from '@site/src/components/AdSenseAd';
import Sponsors from '@site/src/components/Sponsors';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorials/intro">
            Start Learning Linux Contribution Guide →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Linux Wiki - The Ultimate Linux Knowledge Base"
      description="Comprehensive Linux knowledge base with command references, distribution guides, system administration, networking, and development environment setup">
      <HomepageHeader />
      <main>
        <CommandSearch />
        <div className="content-ad">
          <AdSenseAd
            slot="1234567890"
            format="auto"
            responsive="true"
            style={{ textAlign: 'center' }}
          />
        </div>
        <HomepageFeatures />
        <Sponsors />
      </main>
    </Layout>
  );
}
