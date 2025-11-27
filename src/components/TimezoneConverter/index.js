import React, { useState, useEffect } from 'react';
import { IconClock, IconArrowsExchange, IconCopy, IconPlus, IconX } from '@tabler/icons-react';
import styles from './styles.module.css';

export default function TimezoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezones, setTargetTimezones] = useState([
    { id: 1, timezone: 'America/New_York', label: 'New York' },
    { id: 2, timezone: 'Europe/London', label: 'London' },
    { id: 3, timezone: 'Asia/Tokyo', label: 'Tokyo' }
  ]);
  const [customTime, setCustomTime] = useState('');
  const [useCustomTime, setUseCustomTime] = useState(false);

  const popularTimezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'New York (EST/EDT)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)' }
  ];

  const allTimezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'America/Anchorage', label: 'Alaska Time' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
    { value: 'America/Sao_Paulo', label: 'Brasília Time' },
    { value: 'America/Buenos_Aires', label: 'Argentina Time' },
    { value: 'America/Mexico_City', label: 'Central Mexico Time' },
    { value: 'Europe/London', label: 'Greenwich Mean Time' },
    { value: 'Europe/Paris', label: 'Central European Time' },
    { value: 'Europe/Berlin', label: 'Central European Time' },
    { value: 'Europe/Moscow', label: 'Moscow Time' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time' },
    { value: 'Asia/Kolkata', label: 'India Standard Time' },
    { value: 'Asia/Shanghai', label: 'China Standard Time' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong Time' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time' },
    { value: 'Asia/Seoul', label: 'Korea Standard Time' },
    { value: 'Asia/Singapore', label: 'Singapore Time' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time' },
    { value: 'Australia/Perth', label: 'Australian Western Time' },
    { value: 'Pacific/Auckland', label: 'New Zealand Time' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!useCustomTime) {
        setCurrentTime(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [useCustomTime]);

  const formatTime = (date, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date, timezone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getTimezoneOffset = (timezone) => {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return (tzDate - utcDate) / (1000 * 60 * 60);
  };

  const convertTime = (sourceDate, sourceTz, targetTz) => {
    const sourceOffset = getTimezoneOffset(sourceTz);
    const targetOffset = getTimezoneOffset(targetTz);
    const offsetDiff = targetOffset - sourceOffset;
    return new Date(sourceDate.getTime() + offsetDiff * 60 * 60 * 1000);
  };

  const getReferenceTime = () => {
    if (useCustomTime && customTime) {
      return new Date(customTime);
    }
    return currentTime;
  };

  const handleCustomTimeChange = (e) => {
    setCustomTime(e.target.value);
    if (e.target.value) {
      setUseCustomTime(true);
    }
  };

  const toggleCustomTime = () => {
    setUseCustomTime(!useCustomTime);
    if (!useCustomTime) {
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setCustomTime(localDateTime);
    } else {
      setCustomTime('');
    }
  };

  const addTargetTimezone = () => {
    const newId = Math.max(...targetTimezones.map(tz => tz.id), 0) + 1;
    setTargetTimezones([...targetTimezones, { id: newId, timezone: 'UTC', label: 'New Timezone' }]);
  };

  const removeTargetTimezone = (id) => {
    setTargetTimezones(targetTimezones.filter(tz => tz.id !== id));
  };

  const updateTargetTimezone = (id, field, value) => {
    setTargetTimezones(targetTimezones.map(tz =>
      tz.id === id ? { ...tz, [field]: value } : tz
    ));
  };

  const copyAllTimes = () => {
    const referenceTime = getReferenceTime();
    const times = [
      `Reference: ${formatDate(referenceTime, sourceTimezone)} ${formatTime(referenceTime, sourceTimezone)} (${sourceTimezone})`
    ];

    targetTimezones.forEach(tz => {
      const convertedTime = convertTime(referenceTime, sourceTimezone, tz.timezone);
      times.push(`${tz.label || tz.timezone}: ${formatDate(convertedTime, tz.timezone)} ${formatTime(convertedTime, tz.timezone)} (${tz.timezone})`);
    });

    navigator.clipboard.writeText(times.join('\n'));
  };

  const referenceTime = getReferenceTime();

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Timezone Converter</h1>
          <p>Convert time between different timezones around the world</p>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.timeControl}>
            <h3>Reference Time</h3>
            <div className={styles.timeInput}>
              {!useCustomTime ? (
                <div className={styles.currentTimeDisplay}>
                  <IconClock size={20} />
                  <span className={styles.time}>
                    {formatTime(referenceTime, sourceTimezone)}
                  </span>
                  <span className={styles.date}>
                    {formatDate(referenceTime, sourceTimezone)}
                  </span>
                </div>
              ) : (
                <input
                  type="datetime-local"
                  value={customTime}
                  onChange={handleCustomTimeChange}
                  className={styles.datetimeInput}
                />
              )}
              <button
                onClick={toggleCustomTime}
                className={styles.toggleButton}
              >
                {useCustomTime ? 'Use Current Time' : 'Use Custom Time'}
              </button>
            </div>
          </div>

          <div className={styles.timezoneControl}>
            <h3>Source Timezone</h3>
            <select
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className={styles.timezoneSelect}
            >
              {popularTimezones.map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.conversionSection}>
          <div className={styles.conversionHeader}>
            <h3>Target Timezones</h3>
            <div className={styles.conversionActions}>
              <button
                onClick={copyAllTimes}
                className={styles.copyButton}
              >
                <IconCopy size={16} /> Copy All
              </button>
              <button
                onClick={addTargetTimezone}
                className={styles.addButton}
              >
                <IconPlus size={16} /> Add Timezone
              </button>
            </div>
          </div>

          <div className={styles.timezoneGrid}>
            {targetTimezones.map(tz => {
              const convertedTime = convertTime(referenceTime, sourceTimezone, tz.timezone);
              return (
                <div key={tz.id} className={styles.timezoneCard}>
                  <div className={styles.timezoneHeader}>
                    <input
                      type="text"
                      value={tz.label}
                      onChange={(e) => updateTargetTimezone(tz.id, 'label', e.target.value)}
                      className={styles.labelInput}
                      placeholder="Enter label"
                    />
                    <button
                      onClick={() => removeTargetTimezone(tz.id)}
                      className={styles.removeButton}
                    >
                      <IconX size={16} />
                    </button>
                  </div>
                  <select
                    value={tz.timezone}
                    onChange={(e) => updateTargetTimezone(tz.id, 'timezone', e.target.value)}
                    className={styles.timezoneSelect}
                  >
                    {allTimezones.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <div className={styles.timeDisplay}>
                    <div className={styles.time}>
                      {formatTime(convertedTime, tz.timezone)}
                    </div>
                    <div className={styles.date}>
                      {formatDate(convertedTime, tz.timezone)}
                    </div>
                    <div className={styles.timezoneName}>
                      {tz.timezone}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h4>How to Use</h4>
              <ul>
                <li>Select your source timezone</li>
                <li>Choose to use current time or set a custom time</li>
                <li>Add target timezones you want to convert to</li>
                <li>View real-time conversions</li>
                <li>Copy results for sharing</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Quick Tips</h4>
              <ul>
                <li>Click "Add Timezone" to compare multiple locations</li>
                <li>Custom labels help organize your timezones</li>
                <li>Use custom time for planning future events</li>
                <li>Copy all times with one click for easy sharing</li>
                <li>All times update in real-time when using current time</li>
              </ul>
            </div>
            <div className={styles.infoCard}>
              <h4>Timezone Facts</h4>
              <ul>
                <li>There are 24 primary timezones worldwide</li>
                <li>Some regions use Daylight Saving Time (DST)</li>
                <li>UTC (Coordinated Universal Time) is the reference</li>
                <li>Timezones can be offset by 30 or 45 minutes in some places</li>
                <li>The International Date Line separates calendar days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}