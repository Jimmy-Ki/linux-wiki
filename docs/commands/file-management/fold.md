---
title: fold - Wrap input lines to fit specified width
sidebar_label: fold
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fold - Wrap input lines to fit specified width

The `fold` command is a text processing utility that wraps each input line to fit a specified width, breaking lines at the last blank character within the width limit when possible. It's particularly useful for formatting text files for display on terminals with specific width constraints, preparing text for printing, or ensuring consistent line lengths in text processing pipelines. The command handles various character encodings and provides options for different wrapping behaviors.

## Basic Syntax

```bash
fold [OPTION]... [FILE]...
```

If no FILE is specified, or when FILE is `-`, fold reads from standard input.

## Common Options

### Width Control
- `-w, --width=WIDTH` - Use WIDTH columns instead of default 80
- `-s, --spaces` - Break at spaces (breaks at word boundaries when possible)

### Behavior Options
- `-b, --bytes` - Count bytes rather than columns (useful for multibyte characters)
- `-c, --characters` - Count characters (screen columns) rather than bytes

### Standard Options
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Line Wrapping

#### Default Width Wrapping
```bash
# Wrap lines to default width (80 columns)
fold longfile.txt

# Wrap lines from stdin
echo "This is a very long line that will be wrapped by the fold command" | fold

# Wrap multiple files
fold file1.txt file2.txt file3.txt
```

#### Custom Width Wrapping
```bash
# Wrap lines to 50 columns
fold -w 50 document.txt

# Wrap lines to 120 columns for wide displays
fold -w 120 wide_document.txt

# Wrap lines to 40 columns for narrow terminals
fold -w 40 narrow_output.txt

# Wrap to 10 columns for testing
fold -w 10 test_text.txt
```

### Word Boundary Wrapping

#### Smart Word Wrapping
```bash
# Break at spaces to preserve whole words
fold -s -w 50 paragraph.txt

# Default behavior breaks at exact width
echo "This sentence will be broken at exact width" | fold -w 20

# With -s, breaks at word boundaries
echo "This sentence will be broken at word boundaries" | fold -s -w 20
```

#### Text Formatting Examples
```bash
# Format text for 60-column display
fold -s -w 60 README.md > formatted_readme.md

# Prepare email text for 72-character lines
fold -s -w 72 email_draft.txt > email_formatted.txt

# Format log entries for better readability
tail -f application.log | fold -w 100
```

### Character and Byte Handling

#### Byte vs Character Counting
```bash
# Count bytes (default for ASCII)
fold -b -w 10 utf8_file.txt

# Count characters (screen columns)
fold -c -w 10 utf8_file.txt

# Handle multibyte characters properly
fold -c -w 20 japanese_text.txt
```

#### Unicode and Special Characters
```bash
# Properly handle wide characters (CJK, emojis)
fold -c -w 30 unicode_text.txt

# Process files with mixed character widths
fold -c -w 40 mixed_charset.txt

# Handle tabs and special characters
expand -t 4 file_with_tabs.txt | fold -w 60
```

## Practical Examples

### Document Formatting

#### Terminal Display Preparation
```bash
# Format man page output for terminal
man ls | col -b | fold -w $COLUMNS | less

# Format help text for narrow displays
command --help | fold -w 60 | less

# Format configuration files for viewing
fold -w 80 /etc/sysctl.conf | less
```

#### Text File Processing
```bash
# Wrap all text files in a directory
for file in *.txt; do
    fold -s -w 72 "$file" > "wrapped_$file"
done

# Create printable version with proper formatting
fold -s -w 80 document.txt > document_printable.txt

# Format source code comments
grep "^#" script.py | fold -w 70 > comments_formatted.txt
```

### Log Processing and Analysis

#### Log File Formatting
```bash
# Format long log lines for better readability
tail -1000 /var/log/syslog | fold -w 100

# Format Apache access logs
fold -w 120 /var/log/apache2/access.log | less

# Process application logs with timestamps
grep "ERROR" application.log | fold -w 80 > error_lines_formatted.txt
```

#### Real-time Log Monitoring
```bash
# Monitor and format logs in real-time
tail -f /var/log/messages | fold -w $COLUMNS

# Monitor specific log entries
tail -f access.log | grep "404" | fold -w 100

# Format multiple log sources
multitail -l "tail -f /var/log/syslog | fold -w 80" \
          -l "tail -f /var/log/auth.log | fold -w 80"
```

### Data Processing Scripts

#### CSV and Data File Processing
```bash
# Wrap CSV data for display
fold -w 120 large_dataset.csv | head

# Format data with consistent column width
cat data.txt | fold -w 60 | cut -c1-30

# Prepare data for reports
awk '{print $1, $2, $3}' data.log | fold -w 50 > summary.txt
```

#### Pipeline Integration
```bash
# Chain with other text processing tools
cat long_document.txt | fold -s -w 70 | grep "important" | uniq

# Format before analysis
find . -name "*.log" -exec cat {} \; | fold -w 80 | grep "ERROR"

# Format output for scripts
df -h | fold -w 60 | awk '{print $1, $5}'
```

### Email and Communication

#### Email Formatting
```bash
# Format email body for 72-character lines
echo "Long email content" | fold -s -w 72 > email_body.txt

# Format email signatures
cat signature.txt | fold -w 60 > formatted_signature.txt

# Prepare email headers for display
cat email_headers.txt | fold -w 80 | less
```

#### Document Conversion
```bash
# Convert markdown to plain text with wrapping
pandoc -t plain document.md | fold -s -w 80

# Format HTML content
lynx -dump webpage.html | fold -w 70

# Format PDF text extraction
pdftotext document.pdf - | fold -s -w 80
```

## Advanced Usage

### Script Integration

#### Automated Text Processing
```bash
#!/bin/bash
# Format all text files in a project

WIDTH=72
SOURCE_DIR="./documents"
OUTPUT_DIR="./formatted"

mkdir -p "$OUTPUT_DIR"

find "$SOURCE_DIR" -name "*.txt" -o -name "*.md" | while read file; do
    filename=$(basename "$file")
    fold -s -w "$WIDTH" "$file" > "$OUTPUT_DIR/wrapped_$filename"
done

echo "Text files formatted and saved to $OUTPUT_DIR"
```

#### Log Analysis Script
```bash
#!/bin/bash
# Analyze and format error logs

LOG_FILE="/var/log/application.log"
WIDTH=100
OUTPUT_FILE="error_analysis.txt"

# Extract and format error messages
grep "ERROR" "$LOG_FILE" | \
    fold -w "$WIDTH" | \
    sort | \
    uniq -c | \
    sort -nr > "$OUTPUT_FILE"

echo "Error analysis complete. Results saved to $OUTPUT_FILE"
```

#### Report Generation
```bash
#!/bin/bash
# Generate formatted reports

REPORT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="report_$REPORT_DATE.txt"

# Create header
echo "System Report - $REPORT_DATE" > "$REPORT_FILE"
echo "=============================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Add and format system information
{
    echo "Disk Usage:"
    df -h
    echo ""
    echo "Memory Usage:"
    free -h
    echo ""
    echo "System Uptime:"
    uptime
} | fold -w 80 >> "$REPORT_FILE"

echo "Report generated: $REPORT_FILE"
```

### Performance Considerations

#### Large File Processing
```bash
# Process large files efficiently
fold -w 80 huge_file.txt | pv > processed_huge_file.txt

# Process with progress monitoring
pv large_file.txt | fold -w 80 | pv > formatted_file.txt

# Memory-efficient processing for very large files
split -l 10000 huge_file.txt chunk_
for chunk in chunk_*; do
    fold -w 80 "$chunk" >> formatted_output.txt
    rm "$chunk"
done
```

#### Batch Processing
```bash
# Process multiple files in parallel
find . -name "*.txt" | xargs -P 4 -I {} bash -c 'fold -w 72 "{}" > "wrapped_{}"'

# Format all files in directory tree
find . -type f -name "*.log" -exec fold -w 120 {} \; > all_logs_formatted.txt
```

## Integration with Other Commands

### Text Processing Pipeline
```bash
# Complex text processing pipeline
cat document.txt | \
    tr '[:upper:]' '[:lower:]' | \
    fold -s -w 60 | \
    grep -v "^$" | \
    sort | \
    uniq > processed_document.txt

# Format and analyze logs
tail -1000 access.log | \
    awk '{print $7}' | \
    sort | \
    uniq -c | \
    sort -nr | \
    fold -w 50 > top_pages.txt
```

### Document Conversion Workflows
```bash
# Convert Word document to formatted text
pandoc document.docx -t plain | fold -s -w 80 > formatted_document.txt

# Format HTML content for terminal reading
curl -s https://example.com | \
    lynx -dump -stdin | \
    fold -w $COLUMNS | \
    less

# Process PDF content
pdftotext document.pdf - | \
    fold -s -w 72 | \
    grep -i "important" > important_sections.txt
```

## Special Use Cases

### Terminal Compatibility
```bash
# Auto-detect terminal width
fold -w $COLUMNS document.txt

# Fallback for terminals without COLUMNS variable
WIDTH=${COLUMNS:-80}
fold -w $COLUMNS document.txt

# Safe wrapper script
#!/bin/bash
WIDTH=$(tput cols 2>/dev/null || echo 80)
fold -w $WIDTH "$@"
```

### International Text Processing
```bash
# Handle different character encodings
iconv -f iso-8859-1 -t utf-8 latin1.txt | fold -c -w 60

# Process RTL languages (with additional tools)
fold -c -w 50 arabic_text.txt | rev

# Handle mixed language documents
fold -c -w 70 multilang_document.txt
```

## Troubleshooting

### Common Issues

#### Character Encoding Problems
```bash
# Check file encoding
file -bi filename.txt

# Convert encoding before folding
iconv -f unknown-encoding -t utf-8 file.txt | fold -w 80

# Handle byte order marks (BOM)
sed '1s/^\xEF\xBB\xBF//' file.txt | fold -w 80
```

#### Performance Issues
```bash
# Process files in chunks for better performance
split -l 50000 large_file.txt temp_
for temp in temp_*; do
    fold -w 80 "$temp" >> output.txt
    rm "$temp"
done

# Use temporary files for complex pipelines
cat huge_file.txt | fold -w 80 > temp_formatted.txt
grep "pattern" temp_formatted.txt
```

#### Line Ending Issues
```bash
# Convert Windows line endings to Unix
dos2unix file.txt
fold -w 80 file.txt

# Handle mixed line endings
sed 's/\r$//' file.txt | fold -w 80

# Preserve original line endings if needed
fold -w 80 file.txt | sed 's/$/\r/' > windows_formatted.txt
```

## Related Commands

- [`fmt`](/docs/commands/file-management/fmt) - Format text paragraphs with more sophisticated options
- [`pr`](/docs/commands/file-management/pr) - Convert text files for printing
- [`expand`](/docs/commands/file-management/expand) - Convert tabs to spaces
- [`unexpand`](/docs/commands/file-management/unexpand) - Convert spaces to tabs
- [`cut`](/docs/commands/file-management/cut) - Remove sections from lines
- [`column`](/docs/commands/file-management/column) - Columnate input
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`sed`](/docs/commands/file-management/sed) - Stream editor for filtering and transforming text
- [`nl`](/docs/commands/file-management/nl) - Number lines of files
- [`cat`](/docs/commands/file-management/cat) - Concatenate files and print on standard output
- [`less`](/docs/commands/file-management/less) - Display file content with pagination
- [`more`](/docs/commands/file-management/more) - Display file content page by page

## Best Practices

1. **Use `-s` flag for text documents** to break at word boundaries and maintain readability
2. **Consider character encoding** when working with multibyte characters; use `-c` for proper handling
3. **Match output width to target display** (terminal, printer, email) for optimal formatting
4. **Preserve original files** by redirecting output to new files rather than overwriting
5. **Test with sample data** before processing large files to ensure desired formatting
6. **Use appropriate width** for different contexts (72 for email, 80 for terminals, custom for specific displays)
7. **Handle encoding properly** when processing files with special characters or different charsets
8. **Pipeline responsibly** to avoid excessive memory usage with large files
9. **Consider using `fmt`** for more sophisticated paragraph formatting when needed
10. **Backup important files** before batch processing operations

## Performance Tips

1. **Use `-b` for byte-based processing** when working with pure ASCII text for better performance
2. **Process files in chunks** when dealing with very large files to avoid memory issues
3. **Avoid unnecessary piping** by using fold directly on files when possible
4. **Consider `fmt` for paragraph text** as it may be more efficient for natural language formatting
5. **Use appropriate buffer sizes** when integrating fold into complex pipelines
6. **Monitor resource usage** when processing multiple large files sequentially
7. **Leverage shell built-ins** for simple width detection (`$COLUMNS`) to avoid external calls
8. **Cache formatted output** when the same files need to be displayed multiple times

The `fold` command is a simple yet powerful utility for text formatting and display preparation. Its ability to handle various character encodings, word boundary detection, and seamless integration into text processing pipelines makes it an essential tool for system administrators, developers, and anyone working with text files in Unix-like environments. Whether formatting logs for terminal display, preparing documents for email, or ensuring consistent text width in automated processes, fold provides reliable and efficient line-wrapping functionality.