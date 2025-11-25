import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

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
    { name: 'IPv4 Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: 'Match IPv4 addresses' },
    { name: 'Hex Color', pattern: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b', description: 'Match hex color codes' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', description: 'Match dates in YYYY-MM-DD format' },
    { name: 'Username', pattern: '[a-zA-Z0-9_]{3,16}', description: 'Match usernames (3-16 chars, alphanumeric + underscore)' },
    { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', description: 'Match strong passwords' }
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
    setTestString(regexPattern.description + '\n\nExample text to test: ' +
      (regexPattern.name === 'Email' ? 'contact@example.com, test@test.org' :
       regexPattern.name === 'URL' ? 'https://example.com, http://test.org' :
       regexPattern.name === 'Phone (US)' ? '(555) 123-4567, 555.123.4567' :
       'Test string here'));
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
                  <span className={styles.errorIcon}>⚠️</span>
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