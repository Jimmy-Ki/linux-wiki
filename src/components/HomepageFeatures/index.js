import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Linux Command Reference',
    image: '/img/command-line.png',
    description: (
      <>
        Complete Linux command reference with syntax, options, examples, and best practices.
        From basic commands to advanced system administration - everything you need.
      </>
    ),
  },
  {
    title: 'Distribution Guides',
    image: '/img/linux.png',
    description: (
      <>
        Detailed guides for major Linux distributions with installation instructions and optimization.
        Ubuntu, Debian, Fedora, Arch, and more - choose the perfect distro for you.
      </>
    ),
  },
  {
    title: 'Practical Tutorials',
    image: '/img/icon_practice.png',
    description: (
      <>
        From beginner to advanced Linux tutorials.
        System administration, networking, development environment setup, and security hardening.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} alt={title} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
