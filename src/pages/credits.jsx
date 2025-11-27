import React from 'react';
import Layout from '@theme/Layout';
import {
  IconTerminal,
  IconLink,
  IconCode,
  IconFileText,
  IconSettings,
  IconSparkles,
  IconUpload,
  IconShieldCheck,
  IconCheck
} from '@tabler/icons-react';
import styles from './credits.module.css';

export default function Credits() {
  return (
    <Layout title="Credits & Acknowledgments" description="Credits and acknowledgments for the Linux Wiki project">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className="hero__title">Credits & Acknowledgments</h1>
            <p className="hero__subtitle">
              Thank you to everyone who made this Linux Wiki possible
            </p>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2><IconTerminal size={16} className="inline" /> Linux Command Reference Foundation</h2>
              </div>
              <div className="card__body">
                <p>
                  The core command reference structure and content organization in this Linux Wiki is based on the comprehensive work of:
                </p>
                <div className={styles.creditBox}>
                  <h3>linux-command</h3>
                  <p>A complete Linux command reference project by <strong>jaywcjlove</strong></p>
                  <div className={styles.projectLinks}>
                    <a href="https://github.com/jaywcjlove/linux-command" target="_blank" rel="noopener noreferrer" className="button button--primary">
                      <IconLink size={16} className="inline" /> View on GitHub
                    </a>
                    <a href="https://wangchujiang.com/linux-command/" target="_blank" rel="noopener noreferrer" className="button button--secondary">
                      <IconLink size={16} className="inline" /> Live Demo
                    </a>
                  </div>
                  <p className={styles.licenseInfo}>
                    <strong>License:</strong> MIT License
                  </p>
                </div>
                <p>
                  This project provides an invaluable foundation for Linux command documentation,
                  featuring detailed explanations, examples, and a comprehensive command categorization
                  that has been adopted and extended in this Wiki.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2><IconCode size={16} className="inline" /> Framework & Technology</h2>
              </div>
              <div className="card__body">
                <div className={styles.techGrid}>
                  <div className={styles.techItem}>
                    <h4>Docusaurus</h4>
                    <p>Modern documentation framework by Meta</p>
                    <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">
                      docusaurus.io
                    </a>
                  </div>
                  <div className={styles.techItem}>
                    <h4>React</h4>
                    <p>JavaScript library for building user interfaces</p>
                    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                      reactjs.org
                    </a>
                  </div>
                  <div className={styles.techItem}>
                    <h4>Linux Foundation</h4>
                    <p>Supporting the growth of Linux and open source</p>
                    <a href="https://www.linuxfoundation.org/" target="_blank" rel="noopener noreferrer">
                      linuxfoundation.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2><IconFileText size={16} className="inline" /> How to Contribute</h2>
              </div>
              <div className="card__body">
                <p>
                  This Linux Wiki is a community-driven project. You can help improve it by:
                </p>
                <div className={styles.contributeWays}>
                  <div className={styles.contributeItem}>
                    <span className={styles.icon}><IconSettings size={16} /></span>
                    <h4>Fix Errors</h4>
                    <p>Report and fix documentation errors</p>
                  </div>
                  <div className={styles.contributeItem}>
                    <span className={styles.icon}><IconFileText size={16} /></span>
                    <h4>Add Content</h4>
                    <p>Contribute new command documentation</p>
                  </div>
                  <div className={styles.contributeItem}>
                    <span className={styles.icon}><IconLink size={16} /></span>
                    <h4>Translate</h4>
                    <p>Help translate content to other languages</p>
                  </div>
                  <div className={styles.contributeItem}>
                    <span className={styles.icon}><IconSparkles size={16} /></span>
                    <h4>Improve Examples</h4>
                    <p>Add better examples and use cases</p>
                  </div>
                </div>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                  <a href="https://github.com/Jimmy-Ki/linux-wiki" target="_blank" rel="noopener noreferrer" className="button button--primary button--lg">
                    <IconUpload size={16} className="inline" /> Contribute on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2><IconShieldCheck size={16} className="inline" /> License Information</h2>
              </div>
              <div className="card__body">
                <p>
                  <strong>Linux Wiki:</strong> This project is open source and available under the MIT License.
                </p>
                <p>
                  <strong>linux-command:</strong> The original command reference work is licensed under the MIT License.
                </p>
                <p>
                  <strong>Third-party content:</strong> Individual command documentation and examples are credited to their respective authors and maintainers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--8 col--offset-2 text--center">
            <p className={styles.footerNote}>
              <IconCheck size={16} className="inline" /> <strong>Thank you</strong> to everyone who contributes to making Linux knowledge
              accessible and understandable for users around the world.
            </p>
            <p>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}