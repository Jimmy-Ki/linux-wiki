---
title: head - Display First Lines
sidebar_label: head
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# head - Display First Lines

The `head` command displays the first part of files, typically showing the first 10 lines by default. It's useful for previewing file contents, examining log file headers, and quick file inspection without loading entire files into memory.

## Basic Syntax

```bash
head [OPTIONS] [FILE]...
```

## Common Options

### Line Count Options
- `-n, --lines=[-]NUM` - Show first NUM lines instead of first 10
- `-NUM` - Same as -n NUM (for compatibility with older systems)

### Byte Count Options
- `-c, --bytes=[-]NUM` - Show first NUM bytes
- `--bytes=[+]NUM` - Show bytes starting with NUM

### Display Options
- `-q, --quiet, --silent` - Never print headers giving file names
- `-v, --verbose` - Always print headers giving file names
- `-z, --zero-terminated` - Line delimiter is NUL, not newline

## Usage Examples

### Basic Usage
```bash
# Show first 10 lines (default)
head file.txt

# Show specific number of lines
head -n 20 file.txt
head -20 file.txt  # Short form

# Show first 5 lines
head -5 file.txt
```

### Multiple Files
```bash
# Show first lines of multiple files
head file1.txt file2.txt file3.txt

# With verbose header (file names)
head -v *.txt

# Quiet mode (no file names)
head -q *.log
```

### Byte Counting
```bash
# Show first 100 bytes
head -c 100 file.txt

# Show first 1K (1024 bytes)
head -c 1024 file.txt

# Show first 50 bytes from multiple files
head -c 50 *.conf
```

## Advanced Usage

### Negative Counting
```bash
# Show all lines except last 5
head -n -5 file.txt

# Show all bytes except last 100
head -c -100 file.txt

# Show file minus last line
head -n -1 file.txt
```

### Context Display
```bash
# Show first line with context
head -n 1 -v file.txt

# Show file header with name and size
head -c 50 -v file.txt
```

## Practical Examples

### File Inspection
```bash
# Quick file preview
head README.md

# Check file format
head -5 data.csv

# Preview configuration files
head /etc/ssh/sshd_config

# Check script headers
head -5 script.sh
```

### Log File Analysis
```bash
# See recent log entries (log files are often reverse chronological)
head /var/log/syslog

# Check first lines of multiple logs
head /var/log/*.log

# Quick system status check
head /var/log/dmesg
```

### Data Analysis
```bash
# Check data file headers
head -n 1 data.csv | tr ',' '\n'

# Preview file structure
head -5 file.txt

# Check file encoding (first few bytes)
head -c 200 file.txt | file -
```

## Integration with Other Commands

### Piping Operations
```bash
# Show first 10 lines of command output
ps aux | head

# Show largest files
du -h * | sort -hr | head -10

# Show most recent log entries
tail -r /var/log/syslog | head

# Preview search results
grep "error" *.log | head -20
```

### File Processing
```bash
# Remove header from CSV file
tail -n +2 data.csv > data_noheader.csv
# Or:
head -n -1 data.csv | tail -n +2 > data_middle.csv

# Get sample data
head -n 100 large_dataset.csv > sample.csv

# Create file preview
head -n 20 large_file.txt > preview.txt
```

## Special Characters and Encoding

### Binary Files
```bash
# Show first bytes of binary file
head -c 100 program.exe

# Show first lines with special characters
head -c 200 binary_file | od -c
```

### Unicode and Special Characters
```bash
# Handle UTF-8 files
head -n 10 unicode_file.txt

# Show bytes with encoding awareness
head -c 100 utf8_file.txt | iconv -f utf-8
```

## Scripting Examples

### File Processing Scripts
```bash
#!/bin/bash
# preview_files.sh - Preview first lines of all text files

for file in *.txt; do
    if [ -f "$file" ]; then
        echo "=== $file ==="
        head -n 5 "$file"
        echo
    fi
done
```

```bash
#!/bin/bash
# log_summary.sh - Show first lines from system logs

LOGS="/var/log/syslog /var/log/auth.log /var/log/kern.log"

for log in $LOGS; do
    if [ -f "$log" ]; then
        echo "=== $(basename $log) ==="
        head -n 10 "$log"
        echo
    fi
done
```

### Data Extraction
```bash
# Extract header from CSV
head -n 1 data.csv > header.csv

# Get sample data with header
(head -n 1 data.csv; tail -n +1001 data.csv | head -n 10) > sample_with_header.csv

# Create file fingerprint (first 1KB)
head -c 1024 file.txt | sha256sum
```

## Performance Considerations

### Large Files
```bash
# head is efficient for large files
# It only reads what's needed

# For very large files with seeking
# head can jump directly to required bytes
head -c 1048576 huge_file.dat  # First 1MB
```

### Multiple Files
```bash
# Process multiple files efficiently
head -n 10 *.txt

# Use find with head for large file sets
find . -name "*.log" -exec head -n 5 {} +
```

## Output Formatting

### Header Display
```bash
# Always show file names (even for single file)
head -v file.txt

# Never show file names (even for multiple files)
head -q file1.txt file2.txt

# Default: show names for multiple files only
head file1.txt file2.txt
```

### Zero-Terminated Lines
```bash
# For files with null characters
head -z -n 5 file_with_nuls

# Useful with find -print0
find . -name "*.txt" -print0 | head -z -c 1000
```

## Related Commands

- [`tail`](/docs/commands/file-management/tail) - Display last lines of files
- [`cat`](/docs/commands/file-management/cat) - Display entire file contents
- [`less`](/docs/commands/file-management/less) - View file content interactively
- [`more`](/docs/commands/file-management/more) - View file content page by page
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text processing

## Best Practices

1. **Use specific line counts** instead of default:
   - `head -n 20` instead of `head` for clarity

2. **Combine with other tools** for analysis:
   - `head -n 1 file.txt` to get headers
   - `grep | head -n 10` for filtered previews

3. **Use byte mode for binary files**:
   - `head -c 100` instead of line mode

4. **Consider file size** when choosing count:
   - Use appropriate number for preview vs full view

5. **Use verbose mode** when processing multiple files:
   - `head -v *.log` to identify sources

6. **Pipeline efficiently**:
   - `command | head -n 10` instead of redirecting to temp file

The `head` command is essential for quick file inspection and previewing. Its efficiency with large files and flexibility in counting options make it invaluable for script writing, log analysis, and general file management in Linux environments.