import React from 'react';
import styles from './styles.module.css';

const SponsorList = [
  {
    name: 'DigitalOcean',
    logo: 'https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg',
    url: 'https://www.digitalocean.com/?refcode=9b80bafe43ef&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge',
    alt: 'DigitalOcean Referral Badge',
  },
  {
    name: 'Vultr',
    logo: 'https://www.vultr.com/media/logo_onwhite.png',
    url: 'https://www.vultr.com/?ref=9832100-9J',
    alt: 'Vultr Cloud Server',
  },
  {
    name: 'Setapp',
    logo: 'https://cdn.setapp.com/master-7c09a14f402a20c2d99463402edf4b37320cf342-983/static/main/images/components/logo/setapp-icon.svg',
    url: 'https://go.setapp.com/invite/ajcaw4fb',
    alt: 'Setapp Subscription',
  },
  {
    name: 'Cloudflare',
    logo: 'https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg',
    url: 'https://www.cloudflare.com/',
    alt: 'Cloudflare CDN',
  },
];

function Sponsor({ name, logo, url, alt }) {
  return (
    <div className={styles.sponsorItem}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
        <img src={logo} alt={alt} className={styles.sponsorLogo} />
      </a>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section className={styles.sponsors}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.sponsorsTitle}>Our Sponsors</h2>
            <p className={styles.sponsorsDescription}>
              These amazing companies support the Linux Wiki project. Check out their services!
            </p>
          </div>
        </div>
        <div className={styles.sponsorsGrid}>
          {SponsorList.map((props, idx) => (
            <Sponsor key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}