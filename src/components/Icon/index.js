import React from 'react';
import {
  // Category Icons
  IconShield, IconNetwork, IconCode, IconTerminal, IconStar, IconCalculator,
  // Status Icons
  IconCircleCheck, IconCircleX, IconPlayerPlay, IconClock,
  // Tool Specific Icons
  IconLock, IconQrcode, IconId, IconBinary, IconMarkdown, IconRegex, IconBrackets, IconHash, IconLetterCase, IconPalette, IconCpu,
  // Action Icons
  IconCopy, IconDownload, IconUpload, IconRefresh, IconCheck, IconX,
  // File Type Icons
  IconFile,
  // Additional Icons
  IconSearch, IconLink, IconPhoto, IconDeviceGamepad2, IconClockHour3,
  // UI Icons
  IconSettings,
  // New Icons for Diagram Tools
  IconChartDots, IconBox, IconGitBranch, IconGitPullRequest, IconChartPie
} from '@tabler/icons-react';
import styles from './styles.module.css';

const icons = {
  // Category Icons
  security: IconShield,
  network: IconNetwork,
  code: IconCode,
  linux: IconTerminal,
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
  hash: IconHash,
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
  games: IconDeviceGamepad2,
  time: IconClockHour3,

  // UI Icons
  settings: IconSettings,

  // Additional icons
  cpu: IconCpu,

  // New diagram icons
  chart: IconChartDots,
  diagram: IconBox
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