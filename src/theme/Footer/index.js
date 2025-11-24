import React from 'react';
import Footer from '@theme-original/Footer';
import styles from './styles.module.css';

export default function FooterWrapper(props) {
  return (
    <>
      <div className={styles.sponsorFooter}>
        <div className="container">
          <div className={styles.sponsorLinks}>
            <span className={styles.sponsorLabel}>Sponsors:</span>
            <a href="https://www.digitalocean.com/?refcode=9b80bafe43ef&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              DigitalOcean
            </a>
            <a href="https://www.vultr.com/?ref=9832100-9J" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              Vultr
            </a>
            <a href="https://go.setapp.com/invite/ajcaw4fb" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              Setapp
            </a>
            <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
              Cloudflare
            </a>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
}