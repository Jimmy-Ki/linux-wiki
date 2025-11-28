---
title: wc - Word Count
sidebar_label: wc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# wc - Word Count

The `wc` (word count) command is a fundamental Unix/Linux utility that counts lines, words, characters, and bytes in files or from standard input. It provides essential text analysis capabilities for system administration, development workflows, data processing, and quick file statistics gathering. With support for multiple counting modes, Unicode handling, and efficient processing of large files, `wc` is an indispensable tool for text file analysis, log monitoring, code metrics, and data validation tasks.

## Basic Syntax

```bash
wc [OPTIONS] [FILE]...
```

## Common Options

### Counting Options

#### Primary Count Modes
- `-c, --bytes` - Print only the byte counts
- `-m, --chars` - Print only the character counts (Unicode-aware)
- `-l, --lines` - Print only the newline counts
- `-w, --words` - Print only the word counts
- `-L, --max-line-length` - Print the length of the longest line

#### Default Behavior
- (no options) - Print lines, words, and bytes in that order

### Input Options
- `--files0-from=FILE` - Read input from null-terminated filenames in FILE
- `--files0-from=F` - Read input from null-terminated filenames in F

### Output Format Options
- `--total=MODE` - When counting multiple files, show total line
  - `never` - Never show total line
  - `always` - Always show total line (default for >1 file)
  - `only` - Only show total line

### Help and Version
- `--help` - Display help information
- `--version` - Output version information

## Usage Examples

### Basic Counting Operations

#### Default Output (Lines, Words, Bytes)
```bash
# Count all metrics for a single file
wc document.txt
# Output: 150  750  4500 document.txt
# Format: lines words bytes filename

# Count for multiple files with total
wc file1.txt file2.txt file3.txt
#  50  250  1500 file1.txt
# 100  500  3000 file2.txt
#  75  375  2250 file3.txt
# 225 1125  6750 total

# Count all text files in directory
wc *.txt

# Count with recursive pattern
wc **/*.md
```

#### Individual Count Modes
```bash
# Count only lines
wc -l access.log
# Output: 1250 access.log

# Count only words
wc -w essay.txt
# Output: 2500 essay.txt

# Count only bytes
wc -c data.bin
# Output: 1048576 data.bin

# Count only characters (Unicode-aware)
wc -m unicode_file.txt
# Output: 1000 unicode_file.txt

# Find longest line length
wc -L source_code.py
# Output: 120 source_code.py

# Multiple specific counts
wc -l -w document.txt
# Output: 100  500 document.txt
```

### Standard Input Processing

#### Reading from stdin
```bash
# Count lines from command output
ls -la | wc -l
# Output: 25

# Count words from user input
echo "Hello world this is a test" | wc -w
# Output: 6

# Count characters from multiple commands
{ date; who; pwd; } | wc -c

# Process pipeline output
find . -name "*.py" | wc -l

# Count from here document
wc -l <<EOF
line 1
line 2
line 3
EOF
# Output: 3
```

#### Process Substitution
```bash
# Count from command substitution
wc -l < <(find . -type f)

# Count from multiple commands
wc -w < <(git log --oneline)

# Compare file contents
diff <(wc -l file1.txt) <(wc -l file2.txt)
```

### Advanced File Processing

#### Null-separated Input
```bash
# Process files with null separators
find . -type f -print0 | wc -l --files0-from=-

# Count in files with spaces in names
find . -name "*.txt" -print0 | xargs -0 wc -l

# Safe processing of unusual filenames
printf "file1.txt\0file2.txt\0" | wc --files0-from=/dev/stdin
```

#### Total Control Options
```bash
# Always show total (even single file)
wc --total=always file.txt

# Never show total
wc --total=never *.txt

# Only show total summary
wc --total=only *.txt
# Output: 1000 total

# Custom total formatting
wc -l --files0-from=filelist.txt | tail -1
```

## Specialized Counting Scenarios

### Text and Document Analysis

#### Document Statistics
```bash
# Get comprehensive document stats
wc -l -w -c -L document.pdf
# Output: 50  250  1250  80 document.pdf

# Count code lines excluding comments
grep -v '^[[:space:]]*#' script.py | grep -v '^[[:space:]]*$' | wc -l

# Count effective lines (non-empty)
grep . config.txt | wc -l

# Count empty lines
grep -c '^$' data.txt

# Count lines with specific content
grep -c "ERROR" logfile.txt
```

#### Multilingual Text Processing
```bash
# Unicode character counting
wc -m unicode_text.txt

# Byte counting for encoding analysis
wc -c utf8_file.txt

# Compare byte vs character counts (encoding efficiency)
echo "Byte count: $(wc -c < file.txt), Char count: $(wc -m < file.txt)"

# Handle different line endings
wc -l windows_file.txt  # Counts \r\n as one line

# Count words in multilingual text
export LC_ALL=C
wc -w multilingual.txt
```

### Development and Code Analysis

#### Project Statistics
```bash
# Count lines in all source files
find . -name "*.py" -exec wc -l {} + | tail -1

# Detailed file-by-file analysis
wc -l src/**/*.py | sort -nr | head -10

# Count files by type and total lines
for ext in py js html css md; do
    count=$(find . -name "*.$ext" | wc -l)
    lines=$(find . -name "*.$ext" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
    echo "$ext: $count files, $lines lines"
done

# Function count in code
grep -c '^[[:space:]]*def\|^[[:space:]]*function' *.js

# Comment density analysis
total_lines=$(wc -l < code.py)
comment_lines=$(grep -c '^[[:space:]]*#' code.py)
echo "Comment density: $((comment_lines * 100 / total_lines))%"
```

#### Code Quality Metrics
```bash
# Find longest lines (potential style issues)
wc -L *.py | sort -nr | head -5

# Count blank lines
find . -name "*.py" -exec grep -c '^$' {} + | paste -sd+ | bc

# Count TODO/FIXME comments
grep -r "TODO\|FIXME" . --include="*.py" | wc -l

# Analyze file sizes
find . -name "*.js" -exec wc -c {} + | sort -nr
```

### System Administration

#### Log File Analysis
```bash
# Count log entries by severity
grep "ERROR" /var/log/syslog | wc -l
grep "WARNING" /var/log/syslog | wc -l
grep "INFO" /var/log/syslog | wc -l

# Monitor log growth in real-time
watch "wc -l /var/log/syslog"

# Count unique IP addresses in access log
awk '{print $1}' access.log | sort | uniq | wc -l

# Log rotation statistics
for log in /var/log/*.log; do
    echo "$(basename $log): $(wc -l < $log) lines"
done

# System call statistics
strace -c -p $(pidof process) 2>&1 | tail -1
```

#### User and Process Monitoring
```bash
# Count logged-in users
who | wc -l

# Count running processes
ps aux | wc -l

# Count open files for user
lsof -u username | wc -l

# Network connections count
netstat -an | wc -l

# Count file descriptors
ls /proc/$$/fd | wc -l
```

## Performance Optimization Techniques

### Efficient Large File Processing

#### Memory-Efficient Counting
```bash
# Process very large files efficiently
wc -l huge_file.log  # wc is already memory-efficient

# Progress monitoring for large files
pv huge_file.txt | wc -l

# Split and count in parallel (for massive files)
split -l 1000000 huge_file.txt chunk_
wc -l chunk_* | tail -1
rm chunk_*

# Use appropriate counting mode
wc -l file.txt  # Faster than full wc when only lines needed
wc -c file.txt  # Faster than -m for byte counting
```

#### Batch Processing Optimization
```bash
# Process multiple files efficiently
wc *.txt  # Better than individual wc commands

# Parallel processing with xargs
find . -name "*.log" -print0 | xargs -0 -P 4 wc -l

# Use shell globbing for large sets
wc **/*.csv 2>/dev/null | tail -1

# Combine counts from different sources
{ wc -l access.log; wc -l error.log; } | awk '{sum+=$1} END {print sum}'
```

### Pipeline Optimization

#### Reducing Process Overhead
```bash
# Avoid unnecessary cat
wc -l file.txt  # Good
cat file.txt | wc -l  # Bad (extra process)

# Use direct file access
wc -w < file.txt  # Efficient
head -1000 file.txt | wc -l  # For partial files

# Combine operations
grep "pattern" file.txt | wc -l  # Better than grep -c for complex patterns
```

#### Memory Usage Patterns
```bash
# wc processes files line by line (memory efficient)
# Suitable for files larger than available RAM

# Monitor memory usage
/usr/bin/time -v wc -l huge_file.txt

# Count in compressed files without extraction
zcat compressed.gz | wc -l
bzcat file.bz2 | wc -l
```

## Integration with Other Tools

### Text Processing Pipelines

#### Complex Text Analysis
```bash
# Extract and count specific patterns
grep -o 'https://[^"]*' webpage.html | sort | uniq | wc -l

# Count words by length
awk '{for(i=1;i<=NF;i++) print length($i)}' text.txt | sort -n | uniq -c

# Count email addresses
grep -oE '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b' file.txt | wc -l

# Analyze word frequency
tr '[:space:]' '[\n*]' < document.txt | sort | uniq -c | sort -nr | wc -l
```

#### Data Validation and Cleaning
```bash
# Count malformed lines
awk 'NF != expected_fields' data.csv | wc -l

# Validate file completeness
expected_lines=1000
actual_lines=$(wc -l < data.txt)
if [ $actual_lines -eq $expected_lines ]; then
    echo "File is complete"
else
    echo "File has $((expected_lines - actual_lines)) missing lines"
fi

# Count duplicate lines
sort file.txt | uniq -d | wc -l

# Count unique entries
cut -d, -f1 data.csv | sort | uniq | wc -l
```

### Shell Scripting Integration

#### Comprehensive File Analysis Script
```bash
#!/bin/bash
# analyze_files.sh - Detailed file statistics

analyze_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "Error: File $file not found"
        return 1
    fi

    echo "=== Analysis for $file ==="
    echo "Lines: $(wc -l < "$file")"
    echo "Words: $(wc -w < "$file")"
    echo "Bytes: $(wc -c < "$file")"
    echo "Characters: $(wc -m < "$file")"
    echo "Longest line: $(wc -L < "$file")"
    echo "Non-empty lines: $(grep -c . "$file")"
    echo "Empty lines: $(grep -c '^$' "$file")"
    echo "File size: $(du -h "$file" | cut -f1)"
    echo "---"
}

# Analyze multiple files
for file in "$@"; do
    analyze_file "$file"
done

# Summary statistics
echo "=== Summary ==="
echo "Total files: $#"
echo "Total lines: $(wc -l "$@" | tail -1)"
echo "Total bytes: $(wc -c "$@" | tail -1)"
```

#### Project Statistics Generator
```bash
#!/bin/bash
# project_stats.sh - Generate comprehensive project statistics

echo "# Project Statistics Report"
echo "Generated on: $(date)"
echo ""

# File type analysis
echo "## File Type Analysis"
for ext in py js html css md json yaml yml; do
    files=$(find . -name "*.$ext" -type f | wc -l)
    if [ $files -gt 0 ]; then
        lines=$(find . -name "*.$ext" -type f -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')
        echo "- $ext: $files files, $lines lines"
    fi
done

echo ""
echo "## Largest Files"
find . -type f -exec wc -c {} + | sort -nr | head -10 | \
    awk '{printf "%-15s %s\n", $1, substr($0, index($0,$2))}'

echo ""
echo "## Files by Line Count"
find . -name "*.py" -o -name "*.js" -o -name "*.html" | \
    xargs wc -l 2>/dev/null | sort -nr | head -10
```

## Troubleshooting and Common Issues

### Character Encoding Issues

#### Unicode vs Byte Counting
```bash
# Problem: Different byte and character counts
# Solution: Understand encoding differences
file.txt="café"
echo -n "$file.txt" | wc -c  # 5 bytes (UTF-8)
echo -n "$file.txt" | wc -m  # 4 characters

# Check file encoding
file -bi document.txt

# Force specific encoding
iconv -f latin1 -t utf8 file.txt | wc -m

# Handle Windows line endings
dos2unix windows_file.txt
wc -l windows_file.txt  # Now counts correctly
```

#### Binary File Handling
```bash
# Counting bytes in binary files
wc -c program_binary  # Works fine
wc -m program_binary  # May give unexpected results

# Safe character counting for mixed content
if file -bi "$filename" | grep -q "binary"; then
    echo "Binary file, using byte count"
    wc -c "$filename"
else
    echo "Text file, using character count"
    wc -m "$filename"
fi
```

### Performance Issues

#### Large File Processing
```bash
# Problem: wc seems slow on huge files
# Solution: Use appropriate options and monitoring

# Count only what you need
wc -l huge_file.txt  # Lines only is faster

# Monitor progress
pv huge_file.txt | wc -l

# Check if file is actually being processed
strace -e read wc -l file.txt 2>&1 | grep -c "read("

# Handle sparse files efficiently
du --apparent-size sparse_file.txt  # See apparent size
wc -c sparse_file.txt  # Count actual bytes
```

#### Pipeline Bottlenecks
```bash
# Problem: Pipeline is slow
# Solution: Identify bottleneck component

# Test each component separately
time cat huge_file.txt > /dev/null
time cat huge_file.txt | wc -l
time wc -l huge_file.txt

# Use faster alternatives
# grep -c "pattern" file.txt  # Faster than grep | wc -l
awk 'END{print NR}' file.txt  # Alternative for line counting
```

### File Access Issues

#### Permission and File Problems
```bash
# Handle permission denied gracefully
find . -name "*.log" -exec wc -l {} + 2>/dev/null | tail -1

# Check file accessibility
if [ -r "$file" ]; then
    wc -l "$file"
else
    echo "Cannot read $file"
fi

# Process files with special characters
find . -name "*'"* -exec wc -l {} +  # Handle single quotes
find . -name '* *' -exec wc -l {} +   # Handle spaces

# Use null terminators for safety
find . -type f -print0 | xargs -0 wc -l
```

## Best Practices

### Performance Optimization
1. **Count only what you need**: Use `-l`, `-w`, or `-c` instead of full `wc` when possible
2. **Avoid unnecessary piping**: Use `wc file.txt` instead of `cat file.txt | wc`
3. **Process files directly**: Let `wc` handle file reading for better efficiency
4. **Use appropriate options**: `-c` for bytes, `-m` for Unicode characters
5. **Batch process multiple files**: `wc *.txt` is more efficient than individual calls
6. **Monitor large operations**: Use `pv` or progress indicators for huge files
7. **Consider memory constraints**: `wc` is memory-efficient but be aware of system limits

### Accuracy and Reliability
1. **Use `-m` for Unicode text**: Character counting vs. byte counting for international text
2. **Handle line endings**: Understand how different line endings affect line counts
3. **Validate input**: Check file existence and readability before processing
4. **Test with sample data**: Verify counts match expectations before processing large datasets
5. **Consider encoding**: Be aware of character encoding effects on character counts
6. **Use null separators**: Safe processing of filenames with special characters
7. **Error handling**: Gracefully handle permission issues and missing files

### Integration and Scripting
1. **Process substitution**: Use `wc < <(command)` for command output
2. **Pipeline optimization**: Place `wc` at pipeline end for final counts
3. **Combine with other tools**: Use with `grep`, `awk`, `find` for complex analysis
4. **Shell redirection**: Use `wc < file` to suppress filename in output
5. **Variable capture**: Store counts in variables for script logic
6. **Error checking**: Verify command success before using results
7. **Consistent formatting**: Use consistent options for comparable results

## Related Commands

- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`head`](/docs/commands/file-management/head) - Display first lines of files
- [`tail`](/docs/commands/file-management/tail) - Display last lines of files
- [`grep`](/docs/commands/text-processing/grep) - Search for patterns in files
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text processing
- [`sort`](/docs/commands/text-processing/sort) - Sort lines in files
- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines
- [`cut`](/docs/commands/file-management/cut) - Remove sections from lines
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`xargs`](/docs/commands/other-tools/xargs) - Build and execute command lines
- [`du`](/docs/commands/file-management/du) - Estimate file space usage
- [`wc`](/docs/commands/file-management/wc) - Word, line, and byte counting

## Performance Tips

### Optimization Strategies
1. **Single metric counting**: `-l`, `-w`, or `-c` is faster than full `wc`
2. **Direct file access**: Avoid `cat file | wc` pattern
3. **Batch processing**: Process multiple files in single `wc` call
4. **Appropriate tool selection**: Use `grep -c` instead of `grep | wc -l`
5. **Memory efficiency**: `wc` processes line by line, suitable for huge files
6. **Unicode awareness**: Use `-m` for character counting with international text
7. **Pipeline placement**: Use `wc` as final command in pipelines

### Performance Comparison
```bash
# Fast: Direct file access
wc -l file.txt

# Slower: Unnecessary cat
cat file.txt | wc -l

# Fast: Counting patterns
grep -c "pattern" file.txt

# Slower: Pipeline for counting
grep "pattern" file.txt | wc -l

# Fast: Batch processing
wc *.txt

# Slower: Individual calls
for f in *.txt; do wc -l "$f"; done
```

The `wc` command is a versatile and efficient tool for text analysis and file statistics. Its simple interface masks powerful capabilities for processing files of any size, making it essential for system administration, development workflows, data analysis, and automation tasks. By understanding its various options and optimization techniques, users can leverage `wc` effectively in countless scenarios requiring text and file analysis.