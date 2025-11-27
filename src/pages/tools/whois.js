import React from 'react';
import Icon from '../../components/Icon';
import ToolPageWithAds from '../../components/ToolPageWithAds';

export default function WHOISLookupPage() {
  return (
    <ToolPageWithAds
      title="WHOIS Lookup - Linux Wiki Tools"
      description="Domain information and WHOIS lookup service"
    >
      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="icon">
            <Icon name="search" size="xlarge" />
          </div>
          <h2>WHOIS Lookup</h2>
          <p className="description">Domain information and WHOIS lookup service</p>
          <div className="features">
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Domain registration lookup</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>WHOIS database access</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>DNS records display</span>
            </div>
            <div className="feature">
              <Icon name="check" size="small" />
              <span>Registrar information</span>
            </div>
          </div>
          <div className="status">
            <span className="status-badge unavailable">
              <Icon name="unavailable" size="small" />
              Unavailable
            </span>
            <p className="status-text">This tool requires API access and is currently unavailable.</p>
          </div>
        </div>
      </div>
    </ToolPageWithAds>
  );
}