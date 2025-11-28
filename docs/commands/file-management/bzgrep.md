---
title: bzgrep - Search bzip2 compressed files
sidebar_label: bzgrep
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bzgrep - Search bzip2 compressed files

The `bzgrep` command is a specialized version of `grep` that allows you to search for patterns within bzip2 compressed files (.bz2) without the need to decompress them first. It's part of the bzip2 utility suite and provides the same powerful pattern matching capabilities as regular grep, but works directly on compressed data. This makes it extremely useful for searching large compressed log files, archives, and text datasets while saving disk space and processing time. bzgrep supports all standard grep options including regular expressions, context control, case sensitivity, and output formatting.

## Basic Syntax

```bash
bzgrep [OPTIONS] PATTERN [FILE...]
bzgrep [-abcdDEFGHhIiJLlMmnOopqRSsUVvwXxZz] [-A num] [-B num] [-C[num]] [-e pattern] [-f file] [pattern] [file ...]
```

## Common Options

### Pattern Matching
- `-e PATTERN, --regexp=PATTERN` - Use PATTERN as the pattern
- `-f FILE, --file=FILE` - Obtain patterns from FILE, one per line
- `-i, --ignore-case` - Ignore case distinctions
- `-v, --invert-match` - Invert the sense of matching
- `-w, --word-regexp` - Select only those lines containing matches that form whole words
- `-x, --line-regexp` - Select only those matches that match whole lines

### Context Control
- `-A NUM, --after-context=NUM` - Print NUM lines of trailing context after matching lines
- `-B NUM, --before-context=NUM` - Print NUM lines of leading context before matching lines
- `-C NUM, --context=NUM` - Print NUM lines of output context
- `--color[=WHEN], --colour[=WHEN]` - Use markers to highlight matching strings

### Output Control
- `-c, --count` - Only print a count of matching lines per FILE
- `-l, --files-with-matches` - Only print FILE names containing matches
- `-L, --files-without-match` - Only print FILE names containing no match
- `-n, --line-number` - Prefix each line of output with its line number within its input file
- `-o, --only-matching` - Show only the part of a matching line that matches PATTERN
- `-q, --quiet, --silent` - Suppress all normal output
- `-s, --no-messages` - Suppress error messages about nonexistent or unreadable files

### File Processing
- `-a, --text` - Process a binary file as if it were text
- `-h, --no-filename` - Suppress the prefixing filename on output
- `-H, --with-filename` - Print the filename for each match
- `-r, --recursive` - Read all files under each directory, recursively
- `-R, --dereference-recursive` - Likewise, but follow all symbolic links

## Usage Examples

### Basic Pattern Searching

#### Simple Text Searches
```bash
# Search for a word in a bzip2 compressed file
bzgrep "error" logfile.bz2

# Search for multiple words
bzgrep -E "(error|warning|critical)" system.log.bz2

# Case-insensitive search
bzgrep -i "login attempt" access.log.bz2

# Search for exact phrase
bzgrep -F "database connection failed" app.log.bz2
```

#### Advanced Pattern Matching
```bash
# Use regular expressions
bzgrep -E "ERROR[0-9]{4}" error.log.bz2

# Search for email addresses
bzgrep -E "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b" contacts.bz2

# Search for IP addresses
bzgrep -E "\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b" network.log.bz2

# Search for dates in YYYY-MM-DD format
bzgrep -E "\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b" dates.bz2
```

### Context and Output Control

#### Context-Based Searching
```bash
# Show 3 lines before and after matches
bzgrep -C 3 "exception" debug.log.bz2

# Show 5 lines after matching lines
bzgrep -A 5 "starting service" application.log.bz2

# Show 2 lines before matching lines
bzgrep -B 2 "error" system.log.bz2

# Show line numbers
bzgrep -n "WARNING" alerts.log.bz2
```

#### Output Formatting
```bash
# Count occurrences of a pattern
bzgrep -c "ERROR" application.log.bz2

# Show only matching files
bzgrep -l "database" *.log.bz2

# Show only non-matching files
bzgrep -L "success" *.log.bz2

# Show only the matching part (not whole lines)
bzgrep -o "user_id=[0-9]+" access.log.bz2

# Highlight matches in color
bzgrep --color=auto "error" logfile.bz2
```

### Multiple File Operations

#### Searching Multiple Files
```bash
# Search in multiple compressed files
bzgrep "critical" error1.log.bz2 error2.log.bz2 error3.log.bz2

# Search with file pattern expansion
bzgrep "warning" /var/log/*.log.bz2

# Recursive search through directories
bzgrep -r "exception" /var/log/archive/

# Show filenames for matches
bzgrep -H "timeout" /logs/*.bz2
```

#### Pipeline Operations
```bash
# Search and count unique error types
bzgrep -o "ERROR.*" app.log.bz2 | sort | uniq -c

# Find all lines with errors and extract timestamps
bzgrep "ERROR" system.log.bz2 | bzgrep -o "\b[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\b"

# Chain with other commands
bzgrep -l "database" *.log.bz2 | xargs bzgrep -c "connection"

# Extract and process matching lines
bzgrep "API call" api.log.bz2 | bzgrep -o "response_time=[0-9]+" | sed 's/response_time=//'
```

## Practical Examples

### System Administration

#### Log Analysis
```bash
# Find all error messages in archived logs
bzgrep -n "ERROR" /var/log/archive/2023-*.log.bz2

# Monitor specific user activity
bzgrep -B 2 -A 2 "user_id=12345" access.log.bz2

# Find database connection issues
bzgrep -i "database.*connection.*failed" application.log.bz2

# Extract all failed login attempts
bzgrep -E "(failed|denied|invalid).*login" security.log.bz2

# Find system resource warnings
bzgrep -C 5 "(memory|cpu|disk).*warning" system.log.bz2
```

#### Performance Monitoring
```bash
# Find slow database queries
bzgrep -A 3 "slow query" mysql.log.bz2

# Extract response times from web logs
bzgrep -o "response.*time.*[0-9]+ms" webserver.log.bz2

# Find high memory usage events
bzgrep -B 2 -A 2 "memory usage.*high" monitor.log.bz2

# Search for timeout errors
bzgrep -n -i "timeout" application.log.bz2
```

### Development Workflow

#### Code and Debug Analysis
```bash
# Search for specific function calls in archived debug logs
bzgrep -n "calculateTotal" debug_*.log.bz2

# Find all exception stack traces
bzgrep -A 10 "Exception" application.log.bz2

# Search for API endpoints
bzgrep -o "/api/[a-zA-Z0-9_/]+" server.log.bz2 | sort | uniq

# Find compilation errors in build logs
bzgrep -i "error:" build.log.bz2

# Extract test failures
bzgrep -B 1 -A 3 "FAIL" test_results.log.bz2
```

#### Data Processing
```bash
# Extract email addresses from compressed data
bzgrep -o -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" contacts.bz2

# Find and count status codes
bzgrep -o "HTTP/[0-9.]* [0-9]{3}" access.log.bz2 | sort | uniq -c

# Extract JSON data from logs
bzgrep -o '"[^"]*":\s*[^,}]+' structured.log.bz2

# Parse CSV data in compressed files
bzgrep -E ",[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}," data.csv.bz2
```

### Security Analysis

#### Security Monitoring
```bash
# Find suspicious login patterns
bzgrep -E "(failed|invalid|unauthorized)" auth.log.bz2

# Search for root access attempts
bzgrep -B 2 -A 2 "su.*root" security.log.bz2

# Find network scanning activities
bzgrep -E "(port.*scan|nmap|masscan)" firewall.log.bz2

# Extract IP addresses from failed login attempts
bzgrep "failed login" auth.log.bz2 | bzgrep -oE "\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b"

# Find file permission changes
bzgrep -i "chmod.*[0-9]{3}" audit.log.bz2
```

#### Compliance Auditing
```bash
# Find data access logs
bzgrep -i "(accessed|viewed|read).*personal" audit.log.bz2

# Search for administrative actions
bzgrep -B 1 -A 2 "(admin|root|sudo)" system.log.bz2

# Extract file modification events
bzgrep -E "(modified|changed|deleted)" file_monitor.log.bz2

# Find authentication events
bzgrep -E "(authentication|login|logout)" security_events.log.bz2
```

## Advanced Usage

### Complex Pattern Matching

#### Multiple Pattern Searches
```bash
# Search for multiple error types
bzgrep -E "(CRITICAL|FATAL|SEVERE)" critical_errors.log.bz2

# Complex log pattern matching
bzgrep -E "^\[([0-9]{4}-[0-9]{2}-[0-9]{2})\s+([0-9]{2}:[0-9]{2}:[0-9]{2})\]\s+(ERROR|WARN)" structured.log.bz2

# Find lines that contain both patterns
bzgrep -P "password.*(?=.*failed|.*invalid)" auth.log.bz2

# Exclude certain patterns while searching
bzgrep -E "error" app.log.bz2 | bzgrep -v "warning"
```

#### Regular Expression Techniques
```bash
# Search for numbers with specific ranges
bzgrep -E "temperature.*([0-9]{2,3})C" sensors.log.bz2

# Find quoted strings
bzgrep -o '"[^"]*"' config.log.bz2

# Search for hex color codes
bzgrep -E "#[0-9A-Fa-f]{6}" web.log.bz2

# Find URLs in logs
bzgrep -E "https?://[a-zA-Z0-9./?=&_-]+" access.log.bz2
```

### Performance Optimization

#### Efficient Searching
```bash
# Search only specific file types
bzgrep "error" /var/log/applications/*.log.bz2

# Limit output for initial investigation
bzgrep -m 10 "exception" huge_log.bz2

# Use fixed strings for faster searching
bzgrep -F "specific error message" application.log.bz2

# Search compressed archives efficiently
find /logs -name "*.bz2" -exec bzgrep -l "ERROR" {} \;
```

#### Batch Processing
```bash
# Process multiple logs in parallel
for file in *.log.bz2; do
    bzgrep -c "ERROR" "$file" &
done
wait

# Create error summary report
for f in /var/log/archive/*.log.bz2; do
    echo "=== $(basename $f) ==="
    bzgrep -c "ERROR" "$f"
done > error_summary.txt

# Extract unique error messages
bzgrep -o "ERROR.*" *.log.bz2 | sort | uniq > unique_errors.txt
```

## Automation and Scripting

### Monitoring Scripts

#### Log Monitoring Script
```bash
#!/bin/bash
# Monitor bzip2 compressed logs for critical errors

LOG_DIR="/var/log/archive"
SEARCH_PATTERN="CRITICAL|FATAL"
ALERT_EMAIL="admin@example.com"

# Search recent compressed logs
for log_file in "$LOG_DIR"/*$(date +%Y%m%d)*.log.bz2; do
    if bzgrep -q -E "$SEARCH_PATTERN" "$log_file"; then
        echo "Critical errors found in $log_file"
        bzgrep -E "$SEARCH_PATTERN" "$log_file" | mail -s "Alert: Critical Errors" "$ALERT_EMAIL"
    fi
done
```

#### Automated Log Analysis
```bash
#!/bin/bash
# Daily log analysis script

YESTERDAY=$(date -d "yesterday" +%Y%m%d)
LOG_BASE="/var/log/archive"
REPORT_FILE="/tmp/log_analysis_$YESTERDAY.txt"

echo "Log Analysis Report - $(date -d yesterday)" > "$REPORT_FILE"

# Error counts
echo "=== Error Statistics ===" >> "$REPORT_FILE"
bzgrep -c "ERROR" "$LOG_BASE"/app*$YESTERDAY*.log.bz2 >> "$REPORT_FILE"

# Critical events
echo "=== Critical Events ===" >> "$REPORT_FILE"
bzgrep -B 2 -A 2 "CRITICAL" "$LOG_BASE"/system*$YESTERDAY*.log.bz2 >> "$REPORT_FILE"

# Performance issues
echo "=== Performance Issues ===" >> "$REPORT_FILE"
bzgrep -E "(timeout|slow|memory.*full)" "$LOG_BASE"/app*$YESTERDAY*.log.bz2 >> "$REPORT_FILE"

# Send report
mail -s "Daily Log Analysis - $YESTERDAY" admin@example.com < "$REPORT_FILE"
```

### Data Extraction Scripts

#### Log Data Extraction
```bash
#!/bin/bash
# Extract specific data from compressed logs

INPUT_DIR="/data/logs"
OUTPUT_DIR="/tmp/extracted_data"
PATTERN="user_id=[0-9]+"

mkdir -p "$OUTPUT_DIR"

for bz2_file in "$INPUT_DIR"/*.log.bz2; do
    filename=$(basename "$bz2_file" .bz2)
    bzgrep -o "$PATTERN" "$bz2_file" | sed 's/.*=//' > "$OUTPUT_DIR/${filename}_users.txt"
done

# Combine all user IDs
cat "$OUTPUT_DIR"/*_users.txt | sort | uniq > "$OUTPUT_DIR/all_users.txt"

echo "Data extraction complete. Results in $OUTPUT_DIR"
```

## Integration with Other Tools

### Pipeline Examples

#### Complex Data Processing
```bash
# Extract IPs and count occurrences
bzgrep -oE "\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b" access.log.bz2 | \
    sort | uniq -c | sort -nr

# Filter and format output
bzgrep "ERROR" application.log.bz2 | \
    bzgrep -oE "timestamp: [0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}" | \
    sed 's/timestamp: //' | sort

# Chain multiple grep operations
bzgrep "user_activity" web.log.bz2 | \
    bzgrep -v "admin" | \
    bzgrep -E "(login|logout)" | \
    bzgrep -oE "user_id=[0-9]+"
```

#### Integration with System Tools
```bash
# Monitor disk space usage in compressed logs
bzgrep -oE "[0-9]+[GMKT]B" system.log.bz2 | \
    awk '{sum += $1} END {print "Total size processed:", sum}'

# Extract and calculate statistics
bzgrep -o "response_time=[0-9]+" api.log.bz2 | \
    sed 's/response_time=//' | \
    awk '{sum+=$1; count++} END {print "Average response time:", sum/count "ms"}'

# Create time-based reports
bzgrep -oE "\b[0-9]{2}:[0-9]{2}:[0-9]{2}\b" timestamped.log.bz2 | \
    cut -d: -f1 | sort | uniq -c
```

## Troubleshooting

### Common Issues

#### Memory and Performance
```bash
# Out of memory with large files
# Solution: Process in chunks
bzgrep -m 1000 "pattern" huge_file.bz2

# Slow searching through multiple files
# Solution: Use parallel processing
find . -name "*.bz2" -print0 | xargs -0 -P 4 -I {} bzgrep "pattern" {}

# Memory issues with context options
# Solution: Reduce context lines
bzgrep -C 1 "pattern" large_file.bz2  # Instead of -C 10
```

#### Pattern Matching Problems
```bash
# Special characters in pattern
# Solution: Escape or use -F for fixed strings
bzgrep -F "error[404]" log.bz2
bzgrep "error\\[404\\]" log.bz2

# Complex regular expressions not working
# Solution: Use extended regex or basic syntax correctly
bzgrep -E "ERROR|WARN|CRITICAL" log.bz2
bzgrep "ERROR\|WARN\|CRITICAL" log.bz2  # Basic regex
```

#### File Handling Issues
```bash
# Permission denied errors
# Solution: Check file permissions or use sudo
sudo bzgrep "pattern" /root/secure.log.bz2

# Corrupted bzip2 files
# Solution: Test file integrity first
bzip2 -t file.log.bz2
# Or skip unreadable files
bzgrep -s "pattern" *.bz2 2>/dev/null
```

## Related Commands

- [`grep`](/docs/commands/file-management/grep) - Search text files for patterns
- [`egrep`](/docs/commands/file-management/egrep) - Extended grep with enhanced regex support
- [`fgrep`](/docs/commands/file-management/fgrep) - Fixed string grep
- [`zgrep`](/docs/commands/file-management/zgrep) - Search gzip compressed files
- [`bzip2`](/docs/commands/compression/bzip2) - Bzip2 compression utility
- [`bunzip2`](/docs/commands/compression/bunzip2) - Bzip2 decompression utility
- [`bzcat`](/docs/commands/file-management/bzcat) - Concatenate bzip2 compressed files
- [`bzless`](/docs/commands/file-management/bzless) - View bzip2 compressed files

## Best Practices

1. **Use context options** (-C, -A, -B) to understand error context
2. **Combine with other tools** for complex data analysis workflows
3. **Use fixed strings** (-F) when searching for literal text for better performance
4. **Regular expressions** (-E) provide powerful pattern matching capabilities
5. **Pipe output** to other commands for further processing and analysis
6. **Use color highlighting** for better visibility of matches in interactive use
7. **Count matches** (-c) for quick statistics and monitoring
8. **Recursive search** (-r) for comprehensive log directory analysis
9. **Case sensitivity** control with -i for flexible searching
10. **Save searches** to files for documentation and audit purposes

## Performance Tips

1. **Use fixed strings** (-F) for simple text searches - much faster than regex
2. **Limit context lines** (-C) when searching very large files
3. **Use -m option** to limit matches when doing initial investigations
4. **Process files in parallel** when searching multiple large files
5. **Combine find with xargs** for efficient batch processing
6. **Use -o option** to extract only matching parts and reduce output size
7. **Pipe to other tools** instead of saving large intermediate results
8. **Use -q for boolean checks** when you only need to know if a pattern exists
9. **Avoid unnecessary color formatting** in scripts and automated processes
10. **Consider memory usage** when using large context windows on huge files

The `bzgrep` command is an essential tool for anyone working with compressed log files and archives. It combines the power of regular expression pattern matching with the efficiency of direct compressed file access, making it ideal for system administrators, developers, and data analysts who need to search through large volumes of compressed text data quickly and efficiently.