---
title: csplit - Split a File into Sections Determined by Context Lines
sidebar_label: csplit
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# csplit - Split a File into Sections Determined by Context Lines

The `csplit` command splits files into sections based on context patterns, unlike `split` which divides files by size or line count. It's particularly useful for processing log files, configuration files, and documents with clear section delimiters.

## Basic Syntax

```bash
csplit [OPTION]... FILE PATTERN...
```

## Common Options

### Output Control

- `-f, --prefix=PREFIX` - Use PREFIX instead of 'xx' for created filenames
- `-b, --suffix-format=FORMAT` - Use sprintf FORMAT for suffixes (default: %02d)
- `-n, --digits=DIGITS` - Use DIGITS digits in suffix names

### File Handling

- `-k, --keep-files` - Do not remove output files on errors
- `-s, --quiet, --silent` - Do not print counts of output file sizes
- `-z, --elide-empty-files` - Remove empty output files

### Help Options

- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Pattern Specifications

### Line Number Patterns

```bash
N           # Split at line N
{N}         # Repeat N times
*           # Repeat until end of file
```

### Regular Expression Patterns

```bash
/REGEXP/    # Split at line matching REGEXP
%REGEXP%    # Split but exclude matching line
/REGEXP/+N  # Split N lines after matching line
/REGEXP/-N  # Split N lines before matching line
```

### Repeat Patterns

```bash
{N}         # Repeat previous pattern N times
{*}         # Repeat previous pattern until EOF
```

## Usage Examples

### Basic Splitting

```bash
# Split at specific line numbers
csplit file.txt 5 10

# Split at pattern matches
csplit logfile.txt '/ERROR/' '/WARN/'

# Split with custom prefix
csplit -f section document.txt '/Chapter /' '{*}'

# Split with numbered output
csplit -b '%03d.txt' -f chapter book.txt '/Chapter /' '{*}'
```

### Advanced Pattern Matching

```bash
# Split but exclude pattern lines
csplit config.txt '%# Configuration%' '{*}'

# Split with offset lines
csplit access.log '/ERROR/+5'

# Split before pattern
csplit data.txt '/Header/-1'

# Complex pattern with repeats
csplit log.txt '/session_start/' '/session_end/' '{*}'
```

## Practical Examples

### Log File Processing

```bash
# Split web log by days
csplit access_log.txt '/\[24\/Jan\/2023:/' '{*}'

# Split application log by session IDs
csplit app.log '/Session ID:/' '{*}'

# Split error log by error types
csplit error_log.txt '/FATAL ERROR/' '/WARNING/' '/INFO/'

# Extract specific log sections
csplit system.log '/kernel:/' '/systemd:/{1}'
```

### Configuration File Management

```bash
# Split Apache config by virtual hosts
csplit httpd.conf '/<VirtualHost/' '{*}'

# Split INI file by sections
csplit config.ini '/\[.*\]/' '{*}'

# Extract database configurations
csplit my.cnf '/\[mysqld\]' '/\[client\]'

# Split YAML documents
csplit data.yml '/^---/' '{*}'
```

### Document Processing

```bash
# Split Markdown by headers
csplit README.md '/^## /' '{*}'

# Split book by chapters
csplit novel.txt '/Chapter [0-9]*/' '{*}'

# Split code file by functions
csplit script.py '/^def /' '{*}'

# Extract email sections
csplit email.txt '/^From:/' '/^Subject:/' '/^Date:/' '{*}'
```

## Advanced Usage

### Complex Splitting Patterns

```bash
# Split with multiple conditions
csplit mixed.log '/ERROR/+1' '/WARNING/-1' '/INFO/'

# Split using lookahead
csplit data.txt '/pattern/{2}'

# Split with custom output format
csplit -f 'part_' -b '%04d.txt' large_file.txt '/SECTION/' '{*}'

# Split and keep empty sections
csplit -k sparse.txt '/EOF/'

# Split but remove empty files
csplit -z file.txt '/empty_section/'
```

### Script Integration

```bash
# Process each section separately
csplit data.txt '/SECTION/' '{*}'
for part in xx*; do
    process_section "$part"
done

# Split and analyze separately
csplit -f 'segment_' -b '%02d.log' server.log '/SERVER/' '{*}'
for segment in segment_*; do
    analyze_log_segment "$segment"
done
```

### Quality Control

```bash
# Verify split integrity
wc -l original.txt
awk '{sum+=$1} END {print "Total lines:", sum}' xx*

# Check for empty sections
csplit -k -z file.txt '/pattern/'
for part in xx*; do
    [ -s "$part" ] || echo "Empty section: $part"
done
```

## Real-World Applications

### System Administration

```bash
# Split system logs by boot sessions
csplit /var/log/syslog '/systemd\[1\]: Started/' '{*}'

# Split mail log by users
csplit /var/log/maillog '/from=/' '{*}'

# Extract configuration sections
csplit /etc/ssh/sshd_config '/^#/' '/^[A-Z]/' '{*}'

# Split Apache access log by hours
csplit access_log.txt '/\[01:/' '/\[02:/' '/\[03:/' '{*}'
```

### Database Management

```bash
# Split SQL dump by tables
csplit backup.sql '/CREATE TABLE/' '{*}'

# Extract stored procedures
csplit database.sql '/CREATE PROCEDURE/' '{*}'

# Split by transaction batches
csplit transaction.log '/COMMIT/' '{*}'

# Extract specific data ranges
csplit data_export.txt '/2023-01-01/' '/2023-02-01/'
```

### Development Workflow

```bash
# Split test results by test suites
csplit test_output.txt '/TEST SUITE:/' '{*}'

# Extract function documentation
csplit code.py '/^def /' '/^class /' '{*}'

# Split build logs by targets
csplit make.log '/Making target/' '{*}'

# Separate error and warning sections
csplit compile.log '/error:/' '/warning:/' '{*}'
```

## Special Use Cases

### Email Processing

```bash
# Split mbox file by individual emails
csplit mailbox.txt '/^From /' '{*}'

# Extract email headers
csplit email.txt '/^$/' '{1}'

# Separate email body parts
csplit email.txt '/--boundary/' '{*}'

# Split digest emails
csplit digest.txt '/Digest #/' '{*}'
```

### Data Migration

```bash
# Split CSV by record types
csplit data.csv '/TYPE=A/' '/TYPE=B/' '/TYPE=C/'

# Extract configuration sections
csplit legacy.conf '/\[BEGIN\]/' '/\[END\]/' '{*}'

# Split mixed format files
csplit mixed.txt '/^\[XML\]/' '/^\[JSON\]/' '/^\[TXT\]/'

# Process backup archives
csplit backup_manifest.txt '/File:/' '{*}'
```

## Performance Considerations

### Large File Processing

```bash
# Process in memory-efficient way
csplit -s huge_log.txt '/pattern/' '{*}'

# Use temporary directory for large splits
TMPDIR=/fast/temp csplit massive_file.txt '/SECTION/' '{*}'

# Split and compress in pipeline
csplit big_file.txt '/SECTION/' '{*}'
for part in xx*; do gzip "$part"; done
```

### Memory Optimization

```bash
# Quiet mode for better performance
csplit -s file.txt '/pattern/' '{*}'

# Avoid creating unnecessary files
csplit -z file.txt '/empty_section/'

# Keep files only on success
csplit -k critical_data.txt '/pattern/' '{*}'
```

## Automation Scripts

### Log Analysis Script

```bash
#!/bin/bash
# Split and analyze logs by error types

LOG_FILE="$1"
OUTPUT_DIR="log_analysis"

mkdir -p "$OUTPUT_DIR"

# Split by error severity
csplit -f "$OUTPUT_DIR/error_" -b '%02d.log' "$LOG_FILE" \
    '/CRITICAL/' '/ERROR/' '/WARNING/' '/INFO/' '{*}'

# Analyze each section
for error_file in "$OUTPUT_DIR"/*.log; do
    echo "=== $(basename "$error_file") ==="
    wc -l "$error_file"
    grep -c "ERROR" "$error_file" 2>/dev/null || echo "No errors"
    echo "---"
done
```

### Configuration Extractor

```bash
#!/bin/bash
# Extract configuration sections

CONFIG_FILE="$1"
SECTION_PATTERN="$2"

if [ -z "$SECTION_PATTERN" ]; then
    SECTION_PATTERN="/\[.*\]/"
fi

csplit -f 'section_' -b '%02d.conf' "$CONFIG_FILE" "$SECTION_PATTERN" '{*}'

echo "Sections extracted:"
ls -la section_*.conf
```

## Troubleshooting

### Common Issues

```bash
# Pattern not found - check regex
csplit file.txt '/nonexistent/'  # May create empty files

# Better - use optional pattern
csplit -z file.txt '/nonexistent/'

# Too many splits - limit repeats
csplit file.txt '/pattern/' '{5}'  # Only 5 splits

# Memory issues - use quiet mode
csplit -s large_file.txt '/pattern/' '{*}'
```

### Pattern Matching

```bash
# Special characters need escaping
csplit config.txt '/\[section\]/' '{*}'

# Use exact matching
csplit file.txt '/^EXACT_MATCH$/'

# Case-sensitive matching
csplit file.txt '/[Pp]attern/'

# Complex patterns
csplit log.txt '/ERROR.*[0-9]{4}/' '{*}'
```

## Related Commands

- [`split`](/docs/commands/text-processing/split) - Split a file into fixed-size pieces
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for filtering text
- [`grep`](/docs/commands/text-processing/grep) - Search for patterns in files
- [`perl`](/docs/commands/development/perl) - Practical extraction and report language

## Best Practices

1. **Test patterns on small files** before processing large datasets
2. **Use appropriate output prefixes** for file organization
3. **Handle empty files** with `-z` option when appropriate
4. **Verify split results** with line counts and content checks
5. **Use `-k` option** for critical data processing
6. **Consider memory usage** when splitting very large files

## Common Patterns

### Log File Sections

```bash
# Split Apache log by days
csplit access.log '/\[24\//{/^\[24\//+1}' '{*}'

# Split by session boundaries
csplit app.log '/Session started/' '/Session ended/' '{*}'

# Extract error sections only
csplit -f 'error_' errors.log '/FATAL:/+1' '/ERROR:/+1' '{*}'
```

### Configuration Extraction

```bash
# Extract specific configuration sections
csplit config.ini '/\[database\]/' '/\[cache\]/' '/\[security\]/'

# Remove empty configuration sections
csplit -z sparse.conf '/\[.*\]/' '{*}'
```

The `csplit` command excels at context-aware file splitting, making it invaluable for processing structured text files, logs, and configuration files. While it requires more understanding of patterns than simple `split`, it provides much more sophisticated splitting capabilities.