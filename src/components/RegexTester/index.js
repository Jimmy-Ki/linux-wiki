import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import {
  IconX
} from '@tabler/icons-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: false, i: false, m: false });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // Common regex patterns
  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Match email addresses' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'Match HTTP/HTTPS URLs' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', description: 'Match US phone numbers' },
    { name: 'IPv4 Address', pattern: '\\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', description: 'Match valid IPv4 addresses (0-255)' },
    { name: 'IPv6 Address', pattern: '((?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:))', description: 'Match IPv6 addresses' },
    { name: 'MAC Address', pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$', description: 'Match MAC addresses' },
    { name: 'Hex Color', pattern: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b', description: 'Match hex color codes' },
    { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', description: 'Match valid dates in YYYY-MM-DD format' },
    { name: 'Time (HH:MM:SS)', pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$', description: 'Match time in HH:MM:SS format' },
    { name: 'Credit Card', pattern: '\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b', description: 'Match credit card numbers' },
    { name: 'Username', pattern: '[a-zA-Z0-9_]{3,16}', description: 'Match usernames (3-16 chars, alphanumeric + underscore)' },
    { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', description: 'Match strong passwords (8+ chars with uppercase, lowercase, number, special)' },
    { name: 'HTML Tags', pattern: '<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^<>]*)?\\/?>', description: 'Match HTML tags' },
    { name: 'JSON Keys', pattern: '"([^"\\\\]|\\\\.)*"\\s*:', description: 'Match JSON object keys' },
    { name: 'Numbers (Integer)', pattern: '-?\\b\\d+\\b', description: 'Match integer numbers (positive or negative)' },
    { name: 'Numbers (Decimal)', pattern: '-?\\b\\d+\\.\\d+\\b', description: 'Match decimal numbers' },
    { name: 'Currency (USD)', pattern: '\\$\\s?\\d{1,3}(,\\d{3})*(\\.\\d{2})?', description: 'Match USD currency format' },
    { name: 'Currency (EUR)', pattern: '€\\s?\\d{1,3}(,\\d{3})*(\\.\\d{2})?', description: 'Match EUR currency format' },
    { name: 'Postal Code (US)', pattern: '\\b\\d{5}(-\\d{4})?\\b', description: 'Match US ZIP codes' },
    { name: 'Postal Code (UK)', pattern: '[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}', description: 'Match UK postal codes' },
    { name: 'Social Security (US)', pattern: '\\b\\d{3}-\\d{2}-\\d{4}\\b', description: 'Match US SSN format' },
    { name: 'ISBN-10', pattern: '\\b\\d{9}[\\dXx]\\b', description: 'Match ISBN-10 numbers' },
    { name: 'ISBN-13', pattern: '\\b978\\d{10}\\b', description: 'Match ISBN-13 numbers' },
    { name: 'File Extension', pattern: '\\.[a-zA-Z0-9]{2,8}$', description: 'Match file extensions' },
    { name: 'Windows Path', pattern: '[A-Z]:\\\\[^<>:"/\\|?*]*', description: 'Match Windows file paths' },
    { name: 'Unix Path', pattern: '/(?:[^/\\0]+/)*[^/\\0]+', description: 'Match Unix/Linux file paths' },
    { name: 'Domain Name', pattern: '^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$', description: 'Match domain names' },
    { name: 'Subdomain', pattern: '^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$', description: 'Match subdomains and domains' },
    { name: 'YouTube URL', pattern: '(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11})', description: 'Match YouTube video URLs' },
    { name: 'Twitter Handle', pattern: '@[a-zA-Z0-9_]{1,15}', description: 'Match Twitter usernames' },
    { name: 'Instagram Handle', pattern: '@[a-zA-Z0-9._]{1,30}', description: 'Match Instagram usernames' },
    { name: 'Hashtag', pattern: '#[a-zA-Z0-9_]+', description: 'Match social media hashtags' },
    { name: 'Mention', pattern: '@[a-zA-Z0-9_]+', description: 'Match social media mentions' },
    { name: 'Quoted String', pattern: '"([^"\\\\]|\\\\.)*"|\'([^\'\\\\]|\\\\.)*\'', description: 'Match quoted strings' },
    { name: 'XML/HTML Comments', pattern: '<!--.*?-->', description: 'Match XML/HTML comments' },
    { name: 'CSS Hex Color', pattern: '#(?:[a-fA-F0-9]{3}){1,2}\\b', description: 'Match CSS hex color codes' },
    { name: 'CSS RGB Color', pattern: 'rgb\\(\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*\\)', description: 'Match CSS rgb() colors' },
    { name: 'CSS RGBA Color', pattern: 'rgba\\(\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*,\\s*[01]?\\.?\\d*\\s*\\)', description: 'Match CSS rgba() colors' },
    { name: 'SQL SELECT', pattern: '(?i)SELECT\\s+.+\\s+FROM\\s+.+', description: 'Match SQL SELECT statements' },
    { name: 'Java Class', pattern: 'public\\s+class\\s+\\w+', description: 'Match Java class declarations' },
    { name: 'Python Function', pattern: 'def\\s+\\w+\\s*\\(', description: 'Match Python function definitions' },
    { name: 'JavaScript Function', pattern: 'function\\s+\\w+\\s*\\(|const\\s+\\w+\\s*=\\s*\\(', description: 'Match JavaScript function declarations' },
    { name: 'IPv4 CIDR', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\/\\d{1,2}\\b', description: 'Match IPv4 CIDR notation' },
    { name: 'SemVer', pattern: '\\b\\d+\\.\\d+\\.\\d+(?:-[a-zA-Z0-9.-]+)?\\b', description: 'Match semantic version numbers' },
    { name: 'GUID/UUID', pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}', description: 'Match GUID/UUID format' },
    { name: 'Base64 String', pattern: '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=)?', description: 'Match Base64 encoded strings' },
    { name: 'Phone (International)', pattern: '\\+(?:[0-9][\\s-]?){9,15}[0-9]', description: 'Match international phone numbers' },
    { name: 'Currency (General)', pattern: '[€$£¥₹₽]\\s?\\d{1,3}(?:[\\s,]\\d{3})*(?:\\.\\d{2})?', description: 'Match multiple currency symbols' },
    { name: 'Double Words', pattern: '\\b(\\w+)\\s+\\1\\b', description: 'Find repeated words' },
    { name: 'Leading/Trailing Spaces', pattern: '^\\s+|\\s+$', description: 'Match leading or trailing whitespace' },
    { name: 'Multiple Spaces', pattern: ' {2,}', description: 'Match two or more consecutive spaces' },
    { name: 'Empty Lines', pattern: '^\\s*$', description: 'Match empty lines' },
    { name: 'Lines Starting With', pattern: '^TODO:|^FIXME:|^NOTE:', description: 'Match lines starting with keywords' },
    { name: 'C Comments', pattern: '\\/\\/.*?$|\\/\\*[\\s\\S]*?\\*\\/', description: 'Match C-style single and multi-line comments' },
    { name: 'Python Comments', pattern: '#.*$', description: 'Match Python comments' },
    { name: 'HTML Attributes', pattern: '\\w+[\\s]*=[\\s]*["\'][^"\']*["\']', description: 'Match HTML tag attributes' },
    { name: 'CSS Properties', pattern: '[a-zA-Z-]+\\s*:\\s*[^;]+', description: 'Match CSS property-value pairs' },
    { name: 'JSON Values', pattern: ':\\s*("[^"]*"|\\d+|true|false|null)', description: 'Match JSON values' },
    { name: 'HTTP Methods', pattern: '\\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\\b', description: 'Match HTTP methods' },
    { name: 'HTTP Status Codes', pattern: '\\b[1-5]\\d{2}\\b', description: 'Match HTTP status codes' },
    { name: 'File Size', pattern: '\\b\\d+(?:\\.\\d+)?\\s*(?:B|KB|MB|GB|TB)\\b', description: 'Match file sizes with units' },
    { name: 'Percentage', pattern: '\\b\\d+(?:\\.\\d+)?%\\b', description: 'Match percentage values' },
    { name: 'Coordinates (Lat/Lng)', pattern: '\\b(-?\\d{1,3}\\.\\d+)[,\\s]+(-?\\d{1,3}\\.\\d+)\\b', description: 'Match latitude/longitude coordinates' }
  ];

  useEffect(() => {
    if (pattern && testString) {
      testRegex();
    } else {
      setMatches([]);
      setHighlightedText(testString);
      setError('');
    }
  }, [pattern, flags, testString]);

  const testRegex = () => {
    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag, _]) => flag)
        .join('');

      const regex = new RegExp(pattern, flagString);
      const foundMatches = [];
      let match;

      if (flags.g) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(foundMatches);
      setError('');
      highlightMatches(foundMatches);
    } catch (err) {
      setError(`Invalid regex: ${err.message}`);
      setMatches([]);
      setHighlightedText(testString);
    }
  };

  const highlightMatches = (foundMatches) => {
    if (!foundMatches.length) {
      setHighlightedText(testString);
      return;
    }

    let highlighted = testString;
    let offset = 0;

    foundMatches.forEach(({ match, index }) => {
      const beforeMatch = highlighted.substring(0, index + offset);
      const afterMatch = highlighted.substring(index + match.length + offset);

      highlighted = beforeMatch +
        `<span class="${styles.highlight}">${match}</span>` +
        afterMatch;

      offset += `<span class="${styles.highlight}">`.length + `</span>`.length;
    });

    setHighlightedText(highlighted);
  };

  const loadPattern = (regexPattern) => {
    setPattern(regexPattern.pattern);

    // Generate example text based on pattern type
    let exampleText = '';

    switch (regexPattern.name) {
      case 'Email':
        exampleText = 'john.doe@example.com, jane_smith@test.co.uk, admin@company.org';
        break;
      case 'URL':
        exampleText = 'https://www.example.com/path?query=param, http://test.org, https://sub.domain.co.uk';
        break;
      case 'Phone (US)':
        exampleText = '(555) 123-4567, 555.123.4567, 555 123 4567, 5551234567';
        break;
      case 'IPv4 Address':
        exampleText = '192.168.1.1, 10.0.0.1, 172.16.0.1, 127.0.0.1, 256.1.1.1 (invalid)';
        break;
      case 'IPv6 Address':
        exampleText = '2001:db8::1, ::1, fe80::1, 2001:db8:85a3::8a2e:370:7334';
        break;
      case 'MAC Address':
        exampleText = '00:1A:2B:3C:4D:5E, 00-1A-2B-3C-4D-5E';
        break;
      case 'Hex Color':
        exampleText = '#FF5733, #333, #ff5733, #F00, color: #RRGGBB';
        break;
      case 'Date (YYYY-MM-DD)':
        exampleText = '2024-01-15, 2023-12-31, 2024-02-29 (invalid), 2024-13-01 (invalid)';
        break;
      case 'Time (HH:MM:SS)':
        exampleText = '14:30:45, 09:15:30, 23:59:59, 24:00:00 (invalid)';
        break;
      case 'Credit Card':
        exampleText = '4111 1111 1111 1111, 5421-2345-6789-0123, 378282246310005';
        break;
      case 'Strong Password':
        exampleText = 'MyP@ssw0rd123, Weak123 (invalid), NoSpecialChar (invalid), short (invalid)';
        break;
      case 'HTML Tags':
        exampleText = '<div class="container">Hello <span>world</span></div>, <img src="image.jpg" />, <br>';
        break;
      case 'JSON Keys':
        exampleText = '{"name": "John", "age": 30, "email": "john@example.com"}';
        break;
      case 'Username':
        exampleText = 'john_doe123, user.name, test_user, invalid!user, ab (too short), this_username_is_way_too_long_for_validation';
        break;
      case 'Windows Path':
        exampleText = 'C:\\Users\\John\\Documents\\file.txt, D:\\Program Files\\App\\app.exe';
        break;
      case 'Unix Path':
        exampleText = '/home/user/documents/file.txt, /var/log/system.log, /usr/bin/node';
        break;
      case 'YouTube URL':
        exampleText = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ, https://youtu.be/dQw4w9WgXcQ';
        break;
      case 'Twitter Handle':
        exampleText = '@john_doe, @user123, @thisisaverylongtwitterhandle (invalid), @invalid!char (invalid)';
        break;
      case 'Instagram Handle':
        exampleText = '@johndoe, @user.name_123, @prettyusername (invalid)';
        break;
      case 'Hashtag':
        exampleText = '#javascript, #webdevelopment, #reactjs, #FrontEnd2024';
        break;
      case 'CSS RGB Color':
        exampleText = 'color: rgb(255, 0, 0), background: rgb(100, 150, 200), border: rgb(0%, 100%, 50%)';
        break;
      case 'JavaScript Function':
        exampleText = 'function calculateSum(a, b) { return a + b; }, const multiply = (x, y) => x * y;';
        break;
      case 'SemVer':
        exampleText = 'v1.2.3, 2.0.0-alpha.1, 10.15.2, 1.0.0-beta+exp.sha.5114f85';
        break;
      case 'GUID/UUID':
        exampleText = '550e8400-e29b-41d4-a716-446655440000, 6ba7b810-9dad-11d1-80b4-00c04fd430c8';
        break;
      case 'Postal Code (US)':
        exampleText = '10001, 90210-1234, 30301, 12345-6789';
        break;
      case 'Currency (USD)':
        exampleText = '$1,234.56, $100, $0.99, $ 50.00';
        break;
      case 'File Size':
        exampleText = '1.5 MB, 500 KB, 2 GB, 1024 B, 1.25 TB';
        break;
      case 'Percentage':
        exampleText = '25%, 87.5%, 100%, 0.25%';
        break;
      default:
        exampleText = 'Example text to test your regex pattern';
    }

    setTestString(regexPattern.description + '\n\nTest with this example:\n' + exampleText);
  };

  const toggleFlag = (flag) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const clearAll = () => {
    setPattern('');
    setFlags({ g: false, i: false, m: false });
    setTestString('');
    setMatches([]);
    setError('');
    setHighlightedText('');
  };

  const exportRegex = () => {
    const flagString = Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag, _]) => flag)
      .join('');

    return `/${pattern}/${flagString}`;
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Regex Tester</h1>
          <p>Test and debug regular expressions with real-time matching and highlighting</p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.leftPanel}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Regular Expression</h3>
                <div className={styles.regexExport}>
                  <code>{exportRegex()}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(exportRegex())}
                    className={styles.copyButton}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className={styles.regexInput}
              />

              <div className={styles.flags}>
                <h4>Flags</h4>
                <div className={styles.flagButtons}>
                  <label className={styles.flagLabel}>
                    <input
                      type="checkbox"
                      checked={flags.g}
                      onChange={() => toggleFlag('g')}
                    />
                    <span>g - Global</span>
                  </label>
                  <label className={styles.flagLabel}>
                    <input
                      type="checkbox"
                      checked={flags.i}
                      onChange={() => toggleFlag('i')}
                    />
                    <span>i - Case Insensitive</span>
                  </label>
                  <label className={styles.flagLabel}>
                    <input
                      type="checkbox"
                      checked={flags.m}
                      onChange={() => toggleFlag('m')}
                    />
                    <span>m - Multiline</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Test String</h3>
                <button onClick={clearAll} className={styles.clearButton}>
                  Clear All
                </button>
              </div>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against your regex..."
                className={styles.testInput}
                rows={8}
              />
            </div>

            <div className={styles.section}>
              <h3>Common Patterns</h3>
              <div className={styles.patternsGrid}>
                {commonPatterns.map((regex, index) => (
                  <div
                    key={index}
                    className={styles.patternCard}
                    onClick={() => loadPattern(regex)}
                  >
                    <h4>{regex.name}</h4>
                    <p>{regex.description}</p>
                    <code className={styles.patternCode}>{regex.pattern}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.section}>
              <h3>Results</h3>
              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}><IconX size={16} /></span>
                  {error}
                </div>
              )}

              {matches.length > 0 && (
                <div className={styles.matchesInfo}>
                  <span className={styles.matchCount}>{matches.length} match{matches.length !== 1 ? 'es' : ''} found</span>
                </div>
              )}

              <div className={styles.highlightedOutput}>
                {highlightedText ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                    className={styles.highlightedText}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    Matches will be highlighted here
                  </div>
                )}
              </div>

              {matches.length > 0 && (
                <div className={styles.matchesList}>
                  <h4>Match Details</h4>
                  {matches.map((match, index) => (
                    <div key={index} className={styles.matchItem}>
                      <div className={styles.matchHeader}>
                        <span className={styles.matchIndex}>Match {index + 1}</span>
                        <span className={styles.matchPosition}>Position: {match.index}</span>
                      </div>
                      <div className={styles.matchContent}>
                        <strong>Full Match:</strong>
                        <code>{match.match}</code>
                      </div>
                      {match.groups.length > 0 && (
                        <div className={styles.groupsContent}>
                          <strong>Groups:</strong>
                          {match.groups.map((group, groupIndex) => (
                            <div key={groupIndex} className={styles.group}>
                              <span className={styles.groupIndex}>${groupIndex + 1}:</span>
                              <code>{group || '(empty)'}</code>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h3>Quick Reference</h3>
              <div className={styles.referenceGrid}>
                <div className={styles.referenceCategory}>
                  <h4>Character Classes</h4>
                  <div className={styles.referenceItems}>
                    <div className={styles.referenceItem}>
                      <code>.</code>
                      <span>Any character</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>\d</code>
                      <span>Digit (0-9)</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>\w</code>
                      <span>Word character (a-z, A-Z, 0-9, _)</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>\s</code>
                      <span>Whitespace</span>
                    </div>
                  </div>
                </div>

                <div className={styles.referenceCategory}>
                  <h4>Quantifiers</h4>
                  <div className={styles.referenceItems}>
                    <div className={styles.referenceItem}>
                      <code>*</code>
                      <span>0 or more</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>+</code>
                      <span>1 or more</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>?</code>
                      <span>0 or 1</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>{'\\{n,m\\}'}</code>
                      <span>n to m times</span>
                    </div>
                  </div>
                </div>

                <div className={styles.referenceCategory}>
                  <h4>Anchors</h4>
                  <div className={styles.referenceItems}>
                    <div className={styles.referenceItem}>
                      <code>^</code>
                      <span>Start of string</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>$</code>
                      <span>End of string</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>\b</code>
                      <span>Word boundary</span>
                    </div>
                  </div>
                </div>

                <div className={styles.referenceCategory}>
                  <h4>Groups</h4>
                  <div className={styles.referenceItems}>
                    <div className={styles.referenceItem}>
                      <code>()</code>
                      <span>Capturing group</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>(?:)</code>
                      <span>Non-capturing group</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>[]</code>
                      <span>Character set</span>
                    </div>
                    <div className={styles.referenceItem}>
                      <code>|</code>
                      <span>OR operator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}