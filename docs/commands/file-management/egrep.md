---
title: egrep - Search text patterns with extended regex
sidebar_label: egrep
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# egrep - Search text patterns with extended regex

The `egrep` command is a powerful text search utility that searches for patterns in files using extended regular expressions (ERE). It's equivalent to `grep -E` and provides enhanced pattern matching capabilities compared to basic grep. egrep supports metacharacters like `+`, `?`, `|`, and `()` without requiring escaping, making it ideal for complex pattern searches, log analysis, code review, and text processing tasks. It's particularly useful for searching multiple patterns, handling alternation, and working with structured text formats.

## Basic Syntax

```bash
egrep [OPTIONS] PATTERN [FILE...]
egrep [OPTIONS] -e PATTERN [FILE...]
egrep [OPTIONS] -f PATTERN_FILE [FILE...]
```

## Common Options

### Pattern Matching Options
- `-E, --extended-regexp` - Use extended regular expressions (default for egrep)
- `-F, --fixed-strings` - Interpret patterns as fixed strings
- `-G, --basic-regexp` - Use basic regular expressions
- `-P, --perl-regexp` - Use Perl-compatible regular expressions
- `-e PATTERN, --regexp=PATTERN` - Use specified pattern
- `-f FILE, --file=FILE` - Read patterns from file
- `-i, --ignore-case` - Ignore case distinctions
- `-v, --invert-match` - Invert the sense of matching
- `-w, --word-regexp` - Match only whole words
- `-x, --line-regexp` - Match only whole lines

### Output Control Options
- `-c, --count` - Only print a count of matching lines
- `-l, --files-with-matches` - Only print filenames containing matches
- `-L, --files-without-match` - Only print filenames with no matches
- `-m NUM, --max-count=NUM` - Stop after NUM matches
- `-o, --only-matching` - Show only the non-empty parts of matching lines
- `-q, --quiet, --silent` - Suppress normal output
- `-s, --no-messages` - Suppress error messages

### Context Control Options
- `-A NUM, --after-context=NUM` - Show NUM lines after matches
- `-B NUM, --before-context=NUM` - Show NUM lines before matches
- `-C NUM, --context=NUM` - Show NUM lines before and after matches
- `--color[=WHEN]` - Colorize the output (auto, always, never)

### File and Directory Options
- `-r, --recursive` - Search directories recursively
- `-R, --dereference-recursive` - Recursive, follow symlinks
- `--include=FILE_PATTERN` - Search only files matching pattern
- `--exclude=FILE_PATTERN` - Skip files matching pattern
- `--exclude-dir=DIR_PATTERN` - Skip directories matching pattern

### Other Options
- `-n, --line-number` - Prefix output with line numbers
- `-H, --with-filename` - Prefix output with filename
- `-h, --no-filename` - Suppress filename prefix
- `--line-buffered` - Flush output on every line
- `-U, --binary` - Treat files as binary

## Extended Regular Expression Patterns

### Character Classes
```bash
# Predefined character classes
[[:alnum:]]   # Alphanumeric characters
[[:alpha:]]   # Alphabetic characters
[[:digit:]]   # Digits
[[:lower:]]   # Lowercase letters
[[:upper:]]   # Uppercase letters
[[:space:]]   # Whitespace characters
[[:punct:]]   # Punctuation characters
[[:blank:]]   # Space and tab
[[:cntrl:]]   # Control characters

# Custom character classes
[aeiou]       # Any vowel
[A-Za-z]      # Any letter
[0-9]         # Any digit
[^0-9]        # Any non-digit
```

### Quantifiers
```bash
# Extended regex quantifiers (no backslash needed)
*             # Zero or more occurrences
+             # One or more occurrences
?             # Zero or one occurrence
{m}           # Exactly m occurrences
{m,}          # At least m occurrences
{m,n}         # Between m and n occurrences
```

### Anchors
```bash
^             # Beginning of line
$             # End of line
\<            # Beginning of word
\>            # End of word
\b            # Word boundary
\B            # Non-word boundary
```

### Groups and Alternation
```bash
# Grouping
(pattern)     # Group pattern together
# Alternation (OR operator)
cat|dog       # Match "cat" OR "dog"
error|warn|info|debug  # Match any log level
```

## Usage Examples

### Basic Pattern Searching

#### Simple Pattern Matching
```bash
# Search for simple pattern in a file
egrep "error" application.log

# Search for exact whole word
egrep -w "warning" system.log

# Search with case insensitivity
egrep -i "HTTP" access.log

# Search for multiple patterns (OR operation)
egrep "error|fail|timeout" application.log

# Search for pattern with line numbers
egrep -n "^[[:space:]]*function" script.js
```

#### Character Class Usage
```bash
# Search for IPv4 addresses
egrep -o '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' access.log

# Search for email addresses
egrep -o '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' emails.txt

# Search for hex color codes
egrep -o '#[0-9a-fA-F]{6}' styles.css

# Search for phone numbers
egrep -o '\([0-9]{3}\)[[:space:]]*[0-9]{3}-[0-9]{4}' contacts.txt
```

#### Complex Pattern Matching
```bash
# Match URLs with HTTP/HTTPS
egrep -o 'https?://[a-zA-Z0-9./?=_-]*' webpage.html

# Match log timestamps (common formats)
egrep '^[0-9]{4}-[0-9]{2}-[0-9]{2}[[:space:]][0-9]{2}:[0-9]{2}:[0-9]{2}' app.log

# Match JSON property names
egrep -o '"[a-zA-Z_][a-zA-Z0-9_]*"[[:space:]]*:' config.json

# Match function definitions
egrep '^[[:space:]]*(public|private|protected)?[[:space:]]*function[[:space:]]+[a-zA-Z_][a-zA-Z0-9_]*' *.php
```

### File Processing and System Administration

#### Log File Analysis
```bash
# Extract error messages with context
egrep -C 3 "ERROR|FATAL" /var/log/syslog

# Count occurrences of each HTTP status code
egrep -o 'HTTP/[0-9.]+\s+[0-9]{3}' access.log | sort | uniq -c | sort -nr

# Find authentication failures
egrep -i "authentication.*fail|login.*fail" /var/log/auth.log

# Monitor real-time log entries
tail -f /var/log/app.log | egrep --color=auto "WARN|ERROR|FATAL"

# Extract IP addresses from failed SSH attempts
egrep "Failed password" /var/log/auth.log | egrep -o '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
```

#### Configuration File Processing
```bash
# Find uncommented configuration options
egrep '^[^#;]' config.ini

# Extract server names from Apache config
egrep -i 'ServerName[[:space:]]+' /etc/apache2/sites-available/*.conf

# Find enabled modules in Nginx
egrep -i '^[[:space:]]*load_module[[:space:]]+' /etc/nginx/nginx.conf

# Extract database connection strings
egrep -i 'connection.*string|database.*url' application.properties
```

#### Security and Audit
```bash
# Find world-writable files
find / -type f -perm -002 2>/dev/null | egrep -v '^/(proc|sys|dev)'

# Search for potential SQL injection patterns
egrep -i "(union|select|insert|update|delete).*from" access.log

# Find files with suspicious permissions
find /home -type f -perm -o+w 2>/dev/null | egrep -v 'cache|tmp|temp'

# Monitor for brute force attempts
egrep "authentication failure" /var/log/secure | egrep -o '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
```

### Development Workflow

#### Code Analysis and Review
```bash
# Find TODO/FIXME comments
egrep -n "TODO|FIXME|HACK|XXX" --include="*.py" --include="*.js" --include="*.java" .

# Count lines of code by file type
egrep -r --include="*.py" ".*" . | wc -l

# Find unused imports in Python files
egrep -r "^import|^from" --include="*.py" . | cut -d: -f2 | sort | uniq -c

# Find function definitions across multiple files
egrep -r "def[[:space:]]+[a-zA-Z_][a-zA-Z0-9_]*" --include="*.py" .

# Find hardcoded passwords (simple patterns)
egrep -i "password\s*=\s*['\"][^'\"]+['\"]" --include="*.py" --include="*.java" .
```

#### Testing and Quality Assurance
```bash
# Find test files
egrep -r "(test|spec)\." --include="*.py" --include="*.js" .

# Check for console.log statements (should be removed)
egrep -r "console\.(log|debug|info|warn|error)" --include="*.js" .

# Find uncommitted changes that might be problematic
git diff --cached | egrep -i "(password|secret|key|token).*=.*['\"]"

# Check for suspicious patterns in configuration files
egrep -i "(true|false|yes|no|1|0)" --include="*.properties" --include="*.yml" .
```

#### Documentation Generation
```bash
# Extract function documentation comments
egrep -A 2 -B 2 "@param|@return|@throws" --include="*.java" .

# Find all API endpoints in documentation
egrep -o '/api/v[0-9]+/[a-zA-Z0-9_/]+' --include="*.md" docs/

# Extract version numbers from package files
egrep -o '"version"[[:space:]]*:[[:space:]]*"[0-9.]+"' package.json

# Find all references to a specific module
egrep -r "import.*from.*['\"]module['\"]" --include="*.js" .
```

### Advanced Pattern Matching

#### Recursive and Multi-file Searching
```bash
# Recursively search for patterns in specific file types
egrep -r "class[[:space:]]+[A-Z][a-zA-Z0-9]*" --include="*.java" src/

# Search in multiple specific files
egrep "function.*error" app.js utils.js helpers.js

# Exclude certain directories from search
egrep -r "TODO" --exclude-dir=node_modules --exclude-dir=.git .

# Search for patterns across multiple projects
egrep -r "deployment" /home/user/projects/*/config/

# Use multiple pattern files
egrep -f error_patterns.txt -f warning_patterns.txt application.log
```

#### Complex Regex Patterns
```bash
# Match valid email addresses with validation
egrep -i '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' emails.txt

# Find complex time formats (HH:MM:SS)
egrep '[0-2][0-9]:[0-5][0-9]:[0-5][0-9]' timestamps.log

# Match credit card numbers (basic pattern)
egrep '\b[0-9]{4}[-\s]?[0-9]{4}[-\s]?[0-9]{4}[-\s]?[0-9]{4}\b' sensitive.log

# Find specific code blocks
egrep -A 10 -B 2 'try[[:space:]]*\{' --include="*.java" src/
```

#### Output Manipulation
```bash
# Show only matching parts
egrep -o '"[^"]*":' config.json

# Count matches per file
egrep -c "function" --include="*.js" src/

# Sort and count unique patterns
egrep -o 'status_[a-zA-Z0-9_]+' application.log | sort | uniq -c | sort -nr

# Extract and format specific data
egrep -o '[0-9.]+\s*ms' performance.log | sed 's/ms//'
```

## Practical Examples

### System Administration

#### Log Monitoring and Analysis
```bash
# Real-time log monitoring with pattern highlighting
tail -f /var/log/nginx/error.log | egrep --color=auto 'error|warn|crit|alert|emerg'

# Daily error summary
egrep -c "$(date '+%Y-%m-%d').*error" /var/log/app.log

# Extract performance metrics
egrep -o "request_time=[0-9.]+s" access.log | sed 's/request_time=//' | sed 's/s//'

# Find unusual user agents
egrep -o 'Mozilla[^"]*' access.log | sort | uniq -c | sort -nr | head -20

# Monitor disk space warnings
egrep -i "disk.*full|no.*space.*left" /var/log/syslog
```

#### Configuration Management
```bash
# Validate configuration syntax
egrep -q '^[^#]*=' /etc/myapp.conf && echo "Config OK" || echo "Config error"

# Find duplicate configuration entries
egrep -v '^#|^$' config.ini | cut -d= -f1 | sort | uniq -d

# Extract enabled services
egrep '^enable.*true' /etc/sysconfig/services.conf

# Find deprecated configuration options
egrep -i "(deprecated|legacy|old)" /etc/application/*.conf
```

### Development Workflow

#### Code Quality and Refactoring
```bash
# Find long lines that might need refactoring
egrep -n '.{80,}' --include="*.py" --include="*.js" src/

# Identify potential code smells
egrep -r "(if.*if|for.*for|while.*while)" --include="*.java" src/

# Find hardcoded constants that should be variables
egrep -r '["\'][0-9]{4,}["\']' --include="*.js" --include="*.php" .

# Check for missing error handling
egrep -A 5 -B 1 "catch.*Exception" --include="*.java" --include="*.py" src/

# Find unused variables (basic check)
egrep -r "\$[a-zA-Z][a-zA-Z0-9_]*" --include="*.php" . | cut -d: -f2 | sort | uniq -c
```

#### Testing and Validation
```bash
# Find test cases that might be missing
egrep -r "function.*test" --include="*.js" tests/ | wc -l

# Validate JSON files syntax
for file in *.json; do
    egrep -q '^{.*}$' "$file" && echo "$file: OK" || echo "$file: Invalid"
done

# Check for TODO items before release
egrep -r "TODO|FIXME|XXX" --include="*.py" --include="*.js" --include="*.java" .

# Find potential security issues
egrep -r "eval.*\$|exec.*\$" --include="*.php" --include="*.py" .
```

## Advanced Usage

### Performance Optimization

#### Efficient Searching
```bash
# Use fixed strings for faster searching when possible
egrep -F "literal string" large_file.txt

# Limit search to specific directories for better performance
egrep -r "pattern" --include="*.py" --exclude-dir=__pycache__ src/

# Use line buffering for real-time processing
tail -f log.txt | egrep --line-buffered "pattern"

# Stop after finding first match
egrep -m 1 "error" large_file.txt

# Use parallel processing with xargs for multiple files
find . -name "*.log" -print0 | xargs -0 -P 4 egrep "pattern"
```

#### Memory Management
```bash
# Process large files in chunks
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do
    egrep "pattern" "$chunk" >> results.txt
done
rm chunk_*

# Use tempfile for complex processing
egrep "pattern" input.txt > /tmp/tempfile && process_file /tmp/tempfile

# Stream processing without loading entire file
cat large_file.txt | egrep "pattern" | process_results
```

### Integration with Other Tools

#### Pipeline Integration
```bash
# Combine with sed for replacement
egrep "error" log.txt | sed 's/error/ERROR/g'

# Use with awk for data extraction
egrep "^[0-9]{4}-[0-9]{2}-[0-9]{2}" log.txt | awk '{print $1,$2}'

# Sort and count with sort/uniq
egrep -o "status_[a-z]+" log.txt | sort | uniq -c

# Filter through cut for specific fields
egrep "username:" users.txt | cut -d: -f2
```

#### Shell Script Integration
```bash
#!/bin/bash
# Function to check if pattern exists in files
check_pattern() {
    local pattern="$1"
    local files="$2"

    if egrep -q "$pattern" $files; then
        echo "Pattern '$pattern' found"
        return 0
    else
        echo "Pattern '$pattern' not found"
        return 1
    fi
}

# Usage: ./script.sh "error" "*.log"
check_pattern "$1" "$2"
```

## Troubleshooting

### Common Issues

#### Pattern Matching Problems
```bash
# Issue: Special characters not working
# Solution: Escape them properly
egrep "\\$" file.txt  # Search for dollar sign
egrep "\\." file.txt  # Search for literal dot

# Issue: Word boundaries not working as expected
# Solution: Use proper word boundary syntax
egrep '\berror\b' file.txt  # Match whole word "error"

# Issue: Color not showing in redirected output
# Solution: Use --color=always
egrep --color=always "pattern" file.txt | less -R
```

#### Performance Issues
```bash
# Issue: egrep is slow on large files
# Solution: Use -F for fixed strings or limit search scope
egrep -F "exact string" huge_file.txt
egrep "pattern" --include="*.txt" directory/

# Issue: Memory usage is too high
# Solution: Process files one at a time or use line buffering
find . -name "*.log" -exec egrep "pattern" {} \;
egrep --line-buffered "pattern" large_file.txt
```

#### Encoding Issues
```bash
# Issue: Not finding patterns due to encoding
# Solution: Specify correct encoding or use iconv
iconv -f ISO-8859-1 -t UTF-8 file.txt | egrep "pattern"
egrep "pattern" --binary-mode=text file.txt
```

## Related Commands

- [`grep`](/docs/commands/file-management/grep) - Basic pattern searching with basic regular expressions
- [`fgrep`](/docs/commands/file-management/fgrep) - Fixed string pattern searching
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`ag`](/docs/commands/file-management/ag) - The Silver Searcher (faster code search)
- [`ack`](/docs/commands/file-management/ack) - Developer-focused grep replacement
- [`ripgrep`](/docs/commands/file-management/rg) - Fast search tool (if installed)

## Best Practices

1. **Use specific patterns** - Create precise regular expressions to avoid false positives
2. **Quote patterns properly** - Always quote regex patterns to prevent shell interpretation
3. **Use word boundaries** (`\b`) when searching for whole words
4. **Limit search scope** with `--include` and `--exclude` for better performance
5. **Use case-insensitive search** (`-i`) when appropriate
6. **Combine with other tools** like `sed`, `awk`, and `sort` for powerful text processing
7. **Test patterns on small samples** before running on large files
8. **Use line buffering** (`--line-buffered`) for real-time processing
9. **Employ context options** (`-A`, `-B`, `-C`) for better output readability
10. **Consider performance** - use `-F` for simple fixed string searches

## Performance Tips

1. **Use `-F` (fixed strings)** when possible - it's much faster than regex
2. **Limit recursion depth** with `--max-depth` for deep directory structures
3. **Combine multiple patterns** with `|` instead of running multiple commands
4. **Use `--mmap`** on supported systems for large file processing
5. **Avoid greedy quantifiers** like `.*` when more specific patterns exist
6. **Use `--line-buffered`** for real-time log monitoring
7. **Specify file types** with `--include` to skip irrelevant files
8. **Consider using `rg` (ripgrep)** for very large codebases
9. **Use `--color=always`** carefully - can interfere with pipelines
10. **Parallelize searches** with `xargs -P` for multiple files

The `egrep` command is an essential tool for text processing and pattern searching in Linux environments. Its extended regular expression capabilities make it particularly powerful for complex pattern matching, log analysis, code review, and system administration tasks. While modern alternatives like `ripgrep` offer better performance for some use cases, egrep remains a fundamental and reliable utility in every system administrator's and developer's toolkit.