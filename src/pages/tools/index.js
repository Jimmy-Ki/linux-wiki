import React from 'react';
import Layout from '@theme/Layout';
import ToolsGrid from '@site/src/components/ToolsGrid';

export default function ToolsPage() {
  return (
    <Layout
      title="Free Online Tools - Developer & Linux Utilities"
      description="25+ free online tools for developers, sysadmins, and tech enthusiasts. Encryption, network tools, calculators, and more. All tools run in your browser."
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className="hero__title text--center">Linux Wiki Tools Collection</h1>
            <p className="hero__subtitle text--center">
              Free online tools for developers, sysadmins, and tech enthusiasts
            </p>
          </div>
        </div>
      </div>
      <ToolsGrid />
    </Layout>
  );
}