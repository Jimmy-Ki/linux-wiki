---
title: head - Display First Part of Files
sidebar_label: head
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# head - Display First Part of Files

The `head` command is a fundamental Unix/Linux utility that displays the first part of files, typically showing the first 10 lines by default. It's an essential tool for file inspection, log analysis, data preprocessing, and quick content preview. `head` is highly efficient as it only reads the necessary portions of files, making it ideal for working with large files where loading the entire content would be impractical. The command supports both line-based and byte-based counting, negative counting for excluding content from the end, and various output formatting options for enhanced readability.

## Basic Syntax

```bash
head [OPTION]... [FILE]...
```

## Common Options

### Line Count Options
- `-n, --lines=[-]NUM` - Display first NUM lines instead of first 10
- `-NUM` - Same as -n NUM (POSIX-compatible short form)
- `-n +NUM` - Start with NUMth line, print file starting from given line

### Byte Count Options
- `-c, --bytes=[-]NUM` - Print first NUM bytes of the file
- `-c +NUM` - Print bytes starting with NUMth byte
- `-c -NUM` - Print all bytes except last NUM bytes

### Output Formatting Options
- `-q, --quiet, --silent` - Never print headers giving file names
- `-v, --verbose` - Always print headers giving file names
- `-z, --zero-terminated` - Line delimiter is NUL, not newline

### Multiple File Handling
- Default behavior: Show headers for multiple files, single file shows no header
- Headers display as: `==> filename <==`

## Usage Examples

### Basic File Operations

#### Default and Simple Usage
```bash
# Show first 10 lines (default behavior)
head document.txt

# Show specific number of lines
head -n 25 document.txt
head -25 document.txt      # Short form equivalent

# Show first 3 lines
head -n 3 /etc/passwd

# Show first line only
head -n 1 config.yaml
```

#### Byte-based Operations
```bash
# Show first 100 bytes
head -c 100 binary_file

# Show first 1KB (1024 bytes)
head -c 1024 data.bin

# Show first 1MB
head -c 1048576 large_file.log

# Show first 500 characters
head -c 500 text_file.txt
```

### Advanced Counting Techniques

#### Negative Counting (Exclude from End)
```bash
# Show all lines except last 5
head -n -5 file.txt

# Show all bytes except last 100
head -c -100 data.bin

# Remove last line from file
head -n -1 input.txt > output_no_last_line.txt

# Show file content minus last 10 bytes
head -c -10 file.dat
```

#### Positive Offset Counting
```bash
# Show content starting from line 50
head -n +50 large_file.txt

# Show content starting from byte 1000
head -c +1000 data.bin

# Extract specific range (lines 50-60)
tail -n +50 file.txt | head -n 11
```

### Multiple File Operations

#### Processing Multiple Files
```bash
# Show first lines of multiple files with headers
head file1.txt file2.txt file3.txt

# Quiet mode - no headers, continuous output
head -q *.log

# Verbose mode - always show headers
head -v *.conf

# Process files with specific pattern
head -n 5 /var/log/syslog /var/log/auth.log
```

#### Directory-wide Operations
```bash
# Show first 3 lines of all text files
head -n 3 *.txt

# Preview all configuration files
head -n 10 /etc/*.conf

# Process log files from current and subdirectories
find . -name "*.log" -exec head -n 5 {} +
```

## Practical Applications

### File Inspection and Analysis

#### Quick File Preview
```bash
# Preview document structure
head -n 20 README.md

# Check file format and encoding
head -c 200 unknown_file | file -

# Examine CSV header structure
head -n 1 data.csv | tr ',' '\n'

# Check JSON structure
head -n 50 config.json | python -m json.tool

# Preview script content
head -n 15 deployment.sh
```

#### Configuration File Analysis
```bash
# Check SSH daemon configuration
head -n 20 /etc/ssh/sshd_config

# Examine Apache configuration
head -n 30 /etc/apache2/apache2.conf

# Check system environment
head -n 15 /etc/environment

# Preview crontab entries
head -n 10 /etc/crontab
```

### Log File Management

#### System Log Analysis
```bash
# Check recent system messages
head /var/log/syslog

# Examine authentication logs
head -n 25 /var/log/auth.log

# Check kernel messages
head /var/log/kern.log

# Preview application logs
head -n 50 /var/log/nginx/access.log
```

#### Log File Rotation and Analysis
```bash
# Check first lines of rotated logs
head /var/log/syslog.1 /var/log/syslog.2

# Show timestamp format in logs
head -n 5 /var/log/applications/*.log | grep -E "^[0-9]{4}"

# Analyze log file headers
head -n 1 *.log | cut -d' ' -f1-3
```

### Data Processing and Extraction

#### CSV and Data File Operations
```bash
# Extract CSV header for validation
head -n 1 sales_data.csv > headers.csv

# Get sample of data with header
(head -n 1 data.csv; tail -n +2 data.csv | shuf | head -n 100) > sample.csv

# Check data file consistency
head -n 5 *.csv | grep -E "(^[^,]*,)" | cut -d',' -f1

# Validate column count in CSV
head -n 1000 data.csv | while read line; do echo $line | tr ',' '\n' | wc -l; done
```

#### Text Processing and Content Analysis
```bash
# Extract file metadata
head -n 10 document.txt | wc -w

# Check file encoding markers
head -c 3 file.txt | od -c

# Get document title (first non-empty line)
head -n 20 document.txt | grep -v "^$" | head -n 1

# Extract email headers from mailbox
head -n 50 mbox | grep -E "^(From|To|Subject|Date):"
```

### System Administration

#### Process and System Monitoring
```bash
# Show top processes
ps aux | head -n 11

# Display system information
uname -a | head -n 1

# Check disk usage summary
df -h | head -n 5

# Show network connections
netstat -tuln | head -n 10
```

#### File System Operations
```bash
# List largest files in directory
ls -la | head -n 20

# Show file permissions summary
ls -l /bin | head -n 10

# Check directory structure
tree -L 2 | head -n 30

# Display recently modified files
ls -lt | head -n 15
```

## Advanced Usage Patterns

### Pipeline Integration

#### Combining with Other Commands
```bash
# Show largest files
du -h * | sort -hr | head -n 20

# Find most frequent log entries
cat /var/log/syslog | sort | uniq -c | sort -nr | head -n 10

# Extract error messages
grep -i "error" *.log | head -n 25

# Show memory usage summary
free -m | head -n 3
```

#### Complex Data Processing
```bash
# Get file statistics
wc -l *.txt | head -n -1 | sort -nr | head -n 5

# Analyze system load
uptime | head -n 1 | awk '{print $10,$11,$12}'

# Process CSV data
cut -d',' -f1,3 data.csv | head -n 100 | sort -u

# Extract IP addresses from logs
grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" /var/log/access.log | head -n 20
```

### Scripting and Automation

#### File Processing Scripts
```bash
#!/bin/bash
# preview_all_files.sh - Preview first lines of all text files

echo "File Preview Report"
echo "=================="
echo ""

for file in *.txt; do
    if [ -f "$file" ]; then
        echo "File: $file ($(wc -l < "$file") lines total)"
        echo "----------------------------------------"
        head -n 5 "$file"
        echo ""
        echo ""
    fi
done
```

```bash
#!/bin/bash
# log_checker.sh - Check log files for recent activity

LOG_DIR="/var/log"
PATTERN="ERROR|WARN|CRITICAL"

echo "Log File Analysis - $(date)"
echo "=========================="

for logfile in "$LOG_DIR"/*.log; do
    if [ -f "$logfile" ]; then
        echo "Checking: $(basename "$logfile")"
        echo "Recent entries:"
        head -n 20 "$logfile" | grep -E "$PATTERN" || echo "  No critical entries found"
        echo ""
    fi
done
```

#### Data Validation Scripts
```bash
#!/bin/bash
# csv_validator.sh - Validate CSV file format

validate_csv() {
    local file="$1"
    local expected_columns="$2"

    echo "Validating: $file"

    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "  ERROR: File not found"
        return 1
    fi

    # Check header
    local header=$(head -n 1 "$file")
    local column_count=$(echo "$header" | tr ',' '\n' | wc -l)

    echo "  Header: $header"
    echo "  Columns: $column_count"

    if [ "$column_count" -ne "$expected_columns" ]; then
        echo "  WARNING: Expected $expected_columns columns, found $column_count"
    else
        echo "  OK: Column count matches expected"
    fi

    # Check sample data
    echo "  Sample data:"
    head -n 3 "$file" | tail -n +2 | while IFS= read -r line; do
        echo "    $line"
    done
    echo ""
}

# Usage
validate_csv "sales_data.csv" 5
validate_csv "customer_data.csv" 8
```

### Special File Types

#### Binary File Handling
```bash
# Check file signatures
head -c 4 program.exe | od -c

# Examine binary headers
head -c 64 image.jpg | xxd

# Check for text in binary files
head -c 1024 mixed_file | strings

# Validate file type
head -c 10 document.pdf | grep -q "^%PDF" && echo "Valid PDF"
```

#### Compressed and Archive Files
```bash
# Preview compressed files without full extraction
zcat logfile.gz | head -n 20

# Check archive contents
tar -tzf archive.tar.gz | head -n 10

# Preview first file in zip archive
unzip -p archive.zip first_file.txt | head -n 15
```

## Performance Optimization

### Large File Handling
```bash
# Efficient reading of large files
head -c 10485760 huge_file.log  # First 10MB only

# Process large files line by line
head -n 1000000 large_file.csv | process_data.py

# Memory-efficient file preview
head -n 50 enormous_file.txt

# Get file fingerprint
head -c 4096 file.bin | sha256sum
```

### Batch Processing
```bash
# Process files in parallel
find . -name "*.log" | xargs -P 4 -I {} head -n 5 {}

# Efficient multiple file processing
head -n 10 *.txt > all_headers.txt

# Combine with find for large directories
find /data -name "*.csv" -exec head -n 5 {} + > csv_sample.txt
```

## Output Control and Formatting

### Custom Output Formats
```bash
# Add line numbers
head -n 20 file.txt | nl

# Create formatted preview
head -n 10 file.txt | sed 's/^/> /'

# Show file info with preview
echo "=== $(wc -l < file.txt) lines ===" && head -n 5 file.txt

# Create bordered output
head -n 5 file.txt | sed 's/^/| /' | sed 's/$/ |/'
```

### Zero-terminated Processing
```bash
# Handle files with null characters
head -z -n 5 file_with_nuls.txt

# Process find output safely
find . -name "*.txt" -print0 | head -z -c 1000 | tr '\0' '\n'

# Use with other null-aware tools
find . -name "*.log" -print0 | head -z -c 5000 | xargs -0 grep "ERROR"
```

## Troubleshooting

### Common Issues

#### File Access Problems
```bash
# Check file permissions before using head
if [ -r "$file" ]; then
    head -n 10 "$file"
else
    echo "Cannot read file: $file"
fi

# Handle files that don't exist
head -n 5 file.txt 2>/dev/null || echo "File not found"

# Skip non-regular files
find . -type f -name "*.log" -exec head -n 3 {} +
```

#### Encoding and Character Issues
```bash
# Handle different encodings
head -n 10 utf8_file.txt | iconv -f utf-8 -t ascii//ignore

# Check file encoding
head -c 2000 file.txt | chardetect

# Handle binary contamination
head -c 1000 mixed_file | strings | head -n 20
```

#### Performance Issues
```bash
# Monitor head performance
time head -n 100000 huge_file.txt

# Use appropriate buffer sizes
head -c 1048576 file.bin  # 1MB at once

# For very large files, consider using dd for precise byte extraction
dd if=file.txt bs=1 count=1000 2>/dev/null
```

## Integration and Automation

### System Monitoring Scripts
```bash
#!/bin/bash
# system_snapshot.sh - Quick system overview

echo "System Snapshot - $(date)"
echo "========================"
echo ""

echo "CPU Usage:"
top -bn1 | head -n 9 | tail -n 8
echo ""

echo "Memory Usage:"
free -m | head -n 4
echo ""

echo "Disk Usage:"
df -h | head -n 6
echo ""

echo "Network Connections:"
netstat -tuln | head -n 10
echo ""

echo "Recent System Messages:"
head -n 5 /var/log/syslog
```

### Data Quality Assurance
```bash
#!/bin/bash
# data_quality_check.sh - Validate data file formats

check_file_format() {
    local file="$1"
    local expected_pattern="$2"

    echo "Checking: $file"

    # Check file exists and is readable
    [ ! -f "$file" ] && echo "  File not found" && return 1
    [ ! -r "$file" ] && echo "  File not readable" && return 1

    # Check first line matches expected pattern
    first_line=$(head -n 1 "$file")
    if echo "$first_line" | grep -qE "$expected_pattern"; then
        echo "  Format OK: $first_line"
    else
        echo "  Format ERROR: $first_line"
    fi
    echo ""
}

# Usage examples
check_file_format "data.csv" "^[^,]+,[^,]+,[^,]+$"
check_file_format "config.json" "^\\{"
check_file_format "users.txt" "^[a-zA-Z0-9]+:"
```

## Related Commands

- [`tail`](/docs/commands/file-management/tail) - Display last part of files
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`less`](/docs/commands/file-management/less) - View file content interactively
- [`more`](/docs/commands/file-management/more) - View file content page by page
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text processing
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`cut`](/docs/commands/file-management/cut) - Remove sections from each line of files
- [`wc`](/docs/commands/file-management/wc) - Word, line, character, and byte count

## Best Practices

1. **Use specific line counts** for clarity:
   - `head -n 20` instead of `head` when exact count matters
   - Document why specific counts are chosen in scripts

2. **Choose appropriate counting method**:
   - Use `-n` for text files and line-oriented data
   - Use `-c` for binary files or when exact byte positions matter

3. **Handle multiple files thoughtfully**:
   - Use `-q` to suppress headers when not needed
   - Use `-v` to always identify file sources

4. **Optimize for large files**:
   - `head` is naturally efficient, reading only what's needed
   - Use byte counting for very large files when possible

5. **Combine effectively with pipes**:
   - `command | head -n 10` for limiting output
   - `head | grep` for filtering preview content

6. **Error handling in scripts**:
   - Check file existence before processing
   - Handle permission issues gracefully

## Performance Tips

1. **Memory efficiency**: `head` only reads required portions, making it ideal for large files
2. **Speed advantage**: For previewing large files, `head` is much faster than `cat`
3. **Batch processing**: Use wildcards or find with head for multiple file operations
4. **Minimal resource usage**: head has very low CPU and memory overhead
5. **I/O optimization**: Use appropriate byte counts to minimize disk reads

The `head` command is an indispensable tool for file inspection, data analysis, and system monitoring. Its efficiency with large files, flexible counting options, and seamless integration with other Unix tools make it essential for both interactive use and script automation in Linux environments.