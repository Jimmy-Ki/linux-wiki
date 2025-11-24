---
title: wc - Word Count
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# wc - Word Count

The `wc` (word count) command counts lines, words, and bytes in files. It's useful for text analysis, statistics, and quick file information gathering.

## Basic Syntax

```bash
wc [OPTIONS] [FILE]...
```

## Common Options

### Output Options
- `-c, --bytes` - Print the byte counts
- `-m, --chars` - Print the character counts
- `-l, --lines` - Print the newline counts
- `-L, --max-line-length` - Print the length of the longest line
- `-w, --words` - Print the word counts

### Input Options
- `--files0-from=FILE` - Read input from the null-terminated file names in FILE

## Usage Examples

### Basic Counting
```bash
# Count lines, words, and bytes (default)
wc file.txt

# Count only lines
wc -l file.txt

# Count only words
wc -w file.txt

# Count only bytes
wc -c file.txt

# Count only characters
wc -m file.txt
```

### Multiple Files
```bash
# Count for multiple files
wc file1.txt file2.txt file3.txt

# Count for all text files
wc *.txt

# Count with wildcards
wc report*.md

# Total summary included automatically
```

### Piped Input
```bash
# Count from stdin
ls -l | wc -l

# Count command output
ps aux | wc -l

# Pipe multiple commands
find . -name "*.py" | wc -l
```

## Output Format

### Standard Output
```
  50  200 1500 file.txt
```
Format: lines words bytes filename

### Multiple Files
```
  25  100  750 file1.txt
  75  300 2250 file2.txt
 100  400 3000 total
```

### Individual Options
```bash
# Lines only
$ wc -l file.txt
50 file.txt

# Words only
$ wc -w file.txt
200 file.txt

# Bytes only
$ wc -c file.txt
1500 file.txt
```

## Practical Examples

### File Analysis
```bash
# Quick file size check
wc -c large_file.dat

# Count lines in log file
wc -l /var/log/syslog

# Find longest line in code file
wc -L script.py

# Count code lines (excluding comments and blanks)
grep -v '^[[:space:]]*#' script.py | grep -v '^[[:space:]]*$' | wc -l
```

### Project Statistics
```bash
# Total lines in project
find . -name "*.py" -exec wc -l {} + | tail -1

# Count different file types
find . -name "*.py" | wc -l
find . -name "*.js" | wc -l
find . -name "*.html" | wc -l

# Character count for documentation
wc -m README.md
```

### System Information
```bash
# Count running processes
ps aux | wc -l

# Count logged-in users
who | wc -l

# Count network connections
netstat -an | wc -l

# Count files in directory
ls -1 | wc -l
```

## Advanced Usage

### Complex Counting
```bash
# Count lines excluding empty lines
grep . file.txt | wc -l

# Count words in specific sections
sed -n '1,100p' file.txt | wc -w

# Count unique lines
sort file.txt | uniq | wc -l

# Count lines matching pattern
grep -c "error" logfile.txt
```

### Script Examples
```bash
#!/bin/bash
# file_stats.sh - Detailed file statistics

FILE=$1
if [ ! -f "$FILE" ]; then
    echo "File not found: $FILE"
    exit 1
fi

echo "=== Statistics for $FILE ==="
echo "Lines: $(wc -l < "$FILE")"
echo "Words: $(wc -w < "$FILE")"
echo "Characters: $(wc -c < "$FILE")"
echo "Longest line: $(wc -L < "$FILE")"
echo "Non-empty lines: $(grep -c . "$FILE")"
echo "Empty lines: $(grep -c '^$' "$FILE")"
```

```bash
#!/bin/bash
# project_stats.sh - Project statistics by file type

echo "=== Project Statistics ==="

for ext in py js html css md; do
    count=$(find . -name "*.$ext" -type f | wc -l)
    lines=$(find . -name "*.$ext" -type f -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
    echo "$ext files: $count, total lines: $lines"
done
```

### Processing Multiple Files
```bash
# Create summary report
wc *.txt > file_counts.txt

# Sort files by line count
wc -l *.txt | sort -nr

# Find files with most lines
wc -l **/*.py | sort -n | tail -10

# Total across file types
find . -name "*.py" -exec wc -l {} + | tail -1
find . -name "*.js" -exec wc -l {} + | tail -1
```

## Special Cases

### Binary Files
```bash
# Count bytes in binary file
wc -c program

# Character count may differ from byte count for Unicode files
wc -c unicode_file.txt  # Byte count
wc -m unicode_file.txt  # Character count
```

### Files with No Newlines
```bash
# File without final newline
echo -n "test" > no_newline.txt
wc -l no_newline.txt  # Shows 0 lines

# File with multiple lines
printf "line1\nline2\nline3" > mixed.txt
wc -l mixed.txt  # Shows 2 lines (no final newline)
```

### Large Files
```bash
# Count lines in large file efficiently
wc -l huge_file.log

# Progress for very large files
pv huge_file.log | wc -l

# Split counting for massive files
split -l 1000000 huge_file.txt chunk_
wc -l chunk_* | tail -1
```

## Integration with Other Commands

### Text Processing Pipeline
```bash
# Extract and count URLs
grep -o 'https://[^"]*' webpage.html | wc -l

# Count email addresses
grep -o '[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*' file.txt | sort | uniq | wc -l

# Count function definitions in code
grep -c '^[[:space:]]*def ' *.py
```

### Log Analysis
```bash
# Count error messages
grep "ERROR" /var/log/syslog | wc -l

# Count unique IP addresses
awk '{print $1}' access.log | sort | uniq | wc -l

# Count requests per hour
awk '{print $4}' access.log | cut -d: -f2 | sort | uniq -c
```

## Performance Considerations

### Efficient Counting
```bash
# Use wc directly instead of cat | wc
wc -l file.txt  # Faster than cat file.txt | wc -l

# For multiple files, let wc handle it
wc *.txt  # Better than running wc multiple times

# Use appropriate options
wc -l file.txt  # Only count what you need
```

### Memory Usage
```bash
# wc is memory efficient
# It processes files line by line
# Suitable for very large files
```

## Related Commands

- [`cat`](/docs/commands/file-management/cat) - Concatenate files
- [`grep`](/docs/commands/text-processing/grep) - Search for patterns
- [`sort`](/docs/commands/text-processing/sort) - Sort lines
- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing

## Best Practices

1. **Use appropriate options**:
   - `wc -l` for lines only (faster than full count)
   - `wc -w` for words only
   - `wc -c` for bytes only

2. **Avoid unnecessary piping**:
   - `wc file.txt` instead of `cat file.txt | wc`
   - Direct file access is more efficient

3. **Use process substitution** for complex counting:
   - `wc -l < <(command)`

4. **Consider Unicode vs ASCII**:
   - Use `-m` for character count with Unicode
   - Use `-c` for byte count

5. **Handle large files efficiently**:
   - wc is designed for large files
   - Don't worry about memory usage

6. **Use with find for batch operations**:
   - `find . -type f -exec wc -l {} +`

The `wc` command is a simple yet powerful tool for text analysis and file statistics. Its flexibility and efficiency make it essential for script writing, log analysis, and quick file information gathering in Linux environments.