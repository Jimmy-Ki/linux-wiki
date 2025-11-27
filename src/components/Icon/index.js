import React from 'react';
import styles from './styles.module.css';

const icons = {
  // Category Icons
  security: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M12 2C10.89 2 10 2.89 10 4C10 5.11 10.89 6 12 6C13.11 6 14 5.11 14 4C14 2.89 13.11 2 12 2M12 7C9.24 7 7 9.24 7 12V20L10 18V13H14V18L17 20V12C17 9.24 14.76 7 12 7Z"/>
    </svg>
  ),

  network: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M11 19.93V7H13V19.93C17.95 19.5 22 15.52 22 10H20C20 14.42 16.42 18 12 18S4 14.42 4 10H2C2 15.52 6.05 19.5 11 19.93Z"/>
    </svg>
  ),

  code: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),

  linux: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),

  creative: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),

  calculator: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
      <rect x="7" y="7" width="3" height="2"/>
      <rect x="14" y="7" width="3" height="2"/>
      <rect x="7" y="10" width="3" height="2"/>
      <rect x="14" y="10" width="3" height="2"/>
      <rect x="7" y="13" width="3" height="2"/>
      <rect x="14" y="13" width="3" height="2"/>
    </svg>
  ),

  // Status Icons
  available: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.statusIcon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),

  unavailable: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.statusIcon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  ),

  suspended: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.statusIcon}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),

  comingSoon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.statusIcon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  ),

  // Tool Specific Icons
  password: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
    </svg>
  ),

  qrcode: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM19 17h2v2h-2z"/>
    </svg>
  ),

  uuid: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M7 3h2v2H7V3m4 0h2v2h-2V3m4 0h2v2h-2V3M3 7h2v2H3V7m4 0h2v2H7V7m4 0h2v2h-2V7m4 0h2v2h-2V7M3 11h2v2H3v-2m4 0h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2M3 15h2v2H3v-2m4 0h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2M3 19h2v2H3v-2m4 0h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2z"/>
    </svg>
  ),

  base64: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2z"/>
    </svg>
  ),

  markdown: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm2 14h2v-6h2v6h2v-8H9V7H7v10zm8 0h4v-2h-2V9h2V7h-4v10z"/>
    </svg>
  ),

  regex: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M14 17l4-4l4 4M10.5 13c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S9 10.67 9 11.5 9.67 13 10.5 13M3 17l4-4l4 4"/>
    </svg>
  ),

  json: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M5 3h2v2H5V5H3v4h2v10h2v2H3v2h2v2H5v2H3V3h2m10 2v2h2V5h-2v2h-2V3h2V1h-2v2h-2V1h2v2z"/>
    </svg>
  ),

  hash: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M9 3v2H7V3H5v2H3v2h2v2H3v2h2v2H3v2h2v2h2v-2h2v2h2v-2h2v-2h2v-2h-2v-2h2V9h-2V7h2V5h-2V3h-2v2h-2V3H9m2 4v2h2V7h-2m0 4v2h2v-2h-2m-2 2H7v-2h2m2-2V9H9v2z"/>
    </svg>
  ),

  ascii: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M5 15h3V7H5v8m2-8v2m-2 4v2m8-2h3V7h-3v8m2-8v2m-2 4v2M17 7h3v8h-3V7m2 8v2m0-8v2"/>
    </svg>
  ),

  color: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.43-.35-.78-.78-.78-1.28 0-2.32 2.32-2.32 4.04 0 .36.06.71.19 1.02C10.96 14.65 8.64 16.27 8.64 16.27c.36.28.87.24 1.2-.1.15-.15.24-.35.24-.55 0-.14-.05-.27-.14-.38-.39-.49-1.01-.49-1.49 0-1.28.95-2.23 2.22-2.23C12.12 11 14 9.12 14 7c0-2.76-2.24-5-5-5m-1 5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m3 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1"/>
    </svg>
  ),

  // Action Icons
  copy: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>
  ),

  download: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),

  upload: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
    </svg>
  ),

  refresh: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  ),

  check: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.checkIcon}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),

  close: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.actionIcon}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),

  // File Type Icons
  file: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  ),

  // Additional Icons
  search: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),

  link: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v3H8V13zm10-3v1.9c0 2.76-2.24 5-5 5h-4V20h4c2.76 0 5-2.24 5-5V10H18z"/>
    </svg>
  ),

  image: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  ),

  games: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M8.5 14c.83 0 1.5-.67 1.5-1.5S9.33 11 8.5 11 7 11.67 7 12.5 7.67 14 8.5 14m7-3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5m-5 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  ),

  time: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  ),

  // UI Icons
  settings: (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  )
};

export default function Icon({ name, size = 'medium', className = '', style = {} }) {
  const icon = icons[name];
  if (!icon) {
    return null;
  }

  return (
    <span
      className={`${styles.iconWrapper} ${styles[size} ${className}`}
      style={style}
    >
      {icon}
    </span>
  );
}

Icon.displayName = 'Icon';