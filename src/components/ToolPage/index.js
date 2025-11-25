import React from 'react';
import styles from './styles.module.css';

export default function ToolPage({
  title,
  description,
  children,
  comingSoon = false
}) {
  if (comingSoon) {
    return (
      <div className={styles.toolPage}>
        <div className="container">
          <div className={styles.comingSoon}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.comingSoonCard}>
              <div className={styles.icon}>Under Construction</div>
              <h2>Coming Soon!</h2>
              <p>This tool is under development. We're working hard to bring it to you soon.</p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.check}>Done</span>
                  <span>Planning Complete</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.check}>In Progress</span>
                  <span>Development in Progress</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.check}>Soon</span>
                  <span>Coming Next Week</span>
                </div>
              </div>
              <a href="/tools" className={styles.backButton}>
                ← Back to All Tools
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.toolPage}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.footer}>
          <a href="/tools" className={styles.backButton}>
            ← Back to All Tools
          </a>
        </div>
      </div>
    </div>
  );
}