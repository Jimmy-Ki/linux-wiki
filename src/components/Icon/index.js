import React from 'react';
import {
  // Category Icons
  IconShield, IconNetwork, IconCode, IconBrandLinux, IconStar, IconCalculator,
  // Status Icons
  IconCircleCheck, IconCircleX, IconPlayerPlay, IconClock,
  // Tool Specific Icons
  IconLock, IconQrcode, IconId, IconBinary, IconMarkdown, IconRegex, IconBrackets, IconHashtag, IconLetterCase, IconPalette,
  // Action Icons
  IconCopy, IconDownload, IconUpload, IconRefresh, IconCheck, IconX,
  // File Type Icons
  IconFile,
  // Additional Icons
  IconSearch, IconLink, IconPhoto, IconGamepad, IconClockHour3,
  // UI Icons
  IconSettings
} from '@tabler/icons-react';
import styles from './styles.module.css';

const icons = {
  // Category Icons
  security: IconShield,
  network: IconNetwork,
  code: IconCode,
  linux: IconBrandLinux,
  creative: IconStar,
  calculator: IconCalculator,

  // Status Icons
  available: IconCircleCheck,
  unavailable: IconCircleX,
  suspended: IconPlayerPlay,
  comingSoon: IconClock,

  // Tool Specific Icons
  password: IconLock,
  qrcode: IconQrcode,
  uuid: IconId,
  base64: IconBinary,
  markdown: IconMarkdown,
  regex: IconRegex,
  json: IconBrackets,
  hash: IconHashtag,
  ascii: IconLetterCase,
  color: IconPalette,

  // Action Icons
  copy: IconCopy,
  download: IconDownload,
  upload: IconUpload,
  refresh: IconRefresh,
  check: IconCheck,
  close: IconX,

  // File Type Icons
  file: IconFile,

  // Additional Icons
  search: IconSearch,
  link: IconLink,
  image: IconPhoto,
  games: IconGamepad,
  time: IconClockHour3,

  // UI Icons
  settings: IconSettings
};

export default function Icon({ name, size = 'medium', className = '', style = {} }) {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return null;
  }

  // Map size to pixel values - Tabler icons use size prop directly
  const sizeMap = {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32
  };

  const iconSize = sizeMap[size] || sizeMap.medium;

  return (
    <span
      className={`${styles.iconWrapper} ${className}`}
      style={style}
    >
      <IconComponent
        size={iconSize}
        strokeWidth={1.5}
        style={{ display: 'block' }}
      />
    </span>
  );
}

Icon.displayName = 'Icon';