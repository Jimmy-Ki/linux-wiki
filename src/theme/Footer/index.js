import React from 'react';
import Footer from '@theme-original/Footer';
import styles from './styles.module.css';

export default function FooterWrapper(props) {
  return (
    <>
      <div className={styles.sponsorFooter}>
        <div className="container">
          <div className={styles.sponsorTitle}>Our Sponsors</div>
          <div className={styles.sponsorGrid}>
            <a href="https://www.digitalocean.com/?refcode=9b80bafe43ef&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean" className={styles.sponsorLogo} />
            </a>
            <a href="https://www.vultr.com/?ref=9832100-9J" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              <img src="https://www.vultr.com/media/logo_onwhite.png" alt="Vultr" className={styles.sponsorLogo} />
            </a>
            <a href="https://go.setapp.com/invite/ajcaw4fb" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              <img src="https://cdn.setapp.com/master-7c09a14f402a20c2d99463402edf4b37320cf342-983/static/main/images/components/logo/setapp-icon.svg" alt="Setapp" className={styles.sponsorLogo} />
            </a>
            <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              <img src="https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg" alt="Cloudflare" className={styles.sponsorLogo} />
            </a>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
}