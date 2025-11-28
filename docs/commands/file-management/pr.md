---
title: pr - Convert text files for printing
sidebar_label: pr
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pr - Convert text files for printing

The `pr` command is a powerful text file formatting and pagination utility designed specifically for preparing text files for printing. It transforms plain text files into a printable format by adding headers, footers, page numbers, and formatting text into columns. This command is essential for creating professional-looking printouts, reports, and documentation from simple text files. `pr` offers extensive customization options for page layout, margins, headers, multi-column output, and various printing formats, making it an indispensable tool for document preparation in Unix/Linux environments.

## Basic Syntax

```bash
pr [OPTION]... [FILE]...
```

If no FILE is specified, or when FILE is '-', pr reads from standard input.

## Core Options

### Page Layout and Formatting
- `+PAGE[:COLUMN]` - Begin output at page PAGE (and column COLUMN)
- `-COLUMN` - Produce COLUMN-column output (default is 1)
- `-a, --across` - Print columns across rather than down
- `-c, --show-control-chars` - Show control characters as hat notation (^X)
- `-d, --double-space` - Double space the output
- `-D, --date-format=FORMAT` - Use FORMAT for the header date
- `-e[CHAR[WIDTH]]` - Expand tabs to CHAR (default space) spaces WIDTH
- `-F, -f, --form-feed` - Use form feeds instead of newlines between pages
- `-h, --header=HEADER` - Use a centered HEADER instead of filename
- `-i[CHAR[WIDTH]]` - Replace spaces with CHAR (default space) spaces WIDTH
- `-J, --join-lines` - Merge full lines, turns off -W line truncation
- `-l, --length=PAGE_LENGTH` - Set page length to PAGE_LENGTH lines (default 66)
- `-m, --merge` - Print all files in parallel, one per column
- `-n[CHAR[DIGITS]]` - Number lines with DIGITS digits, using CHAR as separator
- `-N, --first-line-number=NUMBER` - Start counting with NUMBER at first line
- `-o, --indent=MARGIN` - Offset each line with MARGIN (default 0) spaces
- `-r, --no-file-warnings` - Suppress warnings about unknown files
- `-s[CHAR]` - Separate columns by the character CHAR (default is TAB)
- `-t, --omit-header` - Omit page headers and trailers
- `-T, --omit-pagination` - Omit page headers, trailers, and pagination
- `-w, --width=WIDTH` - Set page width to WIDTH characters (default 72)
- `-W, --page-width=WIDTH` - Set page width (default 72) for multi-column output

### Output Control
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Text Formatting

#### Simple File Formatting
```bash
# Basic formatting with default settings
pr document.txt > formatted_document.txt

# Format with custom header
pr -h "Monthly Report" report.txt > report_formatted.txt

# Double spacing for easier reading
pr -d notes.txt > notes_double_spaced.txt

# Remove headers and trailers
pr -t large_file.txt > clean_output.txt

# Custom page length (default is 66 lines)
pr -l 50 long_document.txt > short_pages.txt
```

#### Line Numbering
```bash
# Add line numbers (default 5 digits width)
pr -n source_code.c > numbered_source.c

# Custom line numbering with 3 digits
pr -n3 source_code.c > numbered_3digit.c

# Use custom separator for line numbers
pr -n:3 source_code.c > numbered_colon.c

# Start numbering from 100
pr -N100 source_code.c > start_from_100.c
```

### Multi-Column Output

#### Two Column Printing
```bash
# Create two-column output
pr -2 long_text.txt > two_column.txt

# Two columns with custom separator
pr -2 -s" | " long_text.txt > two_column_pipe.txt

# Two columns across (horizontal)
pr -2 -a long_text.txt > two_column_across.txt
```

#### Multiple Columns
```bash
# Three columns for narrow content
pr -3 list_of_items.txt > three_columns.txt

# Four columns for dense content
pr -4 short_items.txt > four_columns.txt

# Custom column separator
pr -3 -s" | " data.txt > three_columns_pipe.txt
```

### Tab Expansion and Indentation

#### Tab Handling
```bash
# Expand tabs to spaces (default 8 spaces)
pr -e source_with_tabs.c > expanded_tabs.c

# Custom tab width (4 spaces)
pr -e4 source_with_tabs.c > tabs_to_4spaces.c

# Use different character for tab expansion
pr -e.4 source_with_tabs.c > tabs_to_dots.c
```

#### Text Indentation
```bash
# Indent all lines by 5 spaces
pr -o5 document.txt > indented_doc.txt

# Indent by 10 spaces for quotes
pr -o10 quote.txt > indented_quote.txt

# Combine with line numbering
pr -n -o5 source_code.c > numbered_indented.c
```

### Multiple File Handling

#### Merge Files in Parallel
```bash
# Print two files side by side
pr -m file1.txt file2.txt > merged_parallel.txt

# Three files in parallel
pr -m file1.txt file2.txt file3.txt > triple_parallel.txt

# Parallel with headers
pr -m -h "Comparison" old_version.txt new_version.txt > comparison.txt
```

#### Multiple Files Sequentially
```bash
# Format multiple files sequentially
pr file1.txt file2.txt file3.txt > combined_output.txt

# Use form feeds between files
pr -F file1.txt file2.txt > form_feed_separated.txt

# Process multiple files with custom settings
pr -n -h "Code Listing" *.c > all_code_formatted.txt
```

### Advanced Page Control

#### Custom Headers and Date Format
```bash
# Custom header without filename
pr -h "Project Documentation" docs.txt > custom_header.txt

# Custom date format
pr -D "%Y-%m-%d %H:%M" report.txt > custom_date.txt

# Header with custom date format
pr -h "Sales Report" -D "%B %d, %Y" sales.txt > formatted_sales.txt

# No filename in header, custom text only
pr -h "CONFIDENTIAL" sensitive.txt > confidential_doc.txt
```

#### Page Range Control
```bash
# Start from page 5
pr +5 document.txt > from_page5.txt

# Start from page 3, column 2
pr +3:2 multi_column_doc.txt > from_page3_col2.txt

# Format and print specific pages only
pr +10 large_document.txt | head -n 100 > pages_10_to_12.txt
```

## Practical Examples

### Document Preparation

#### Report Formatting
```bash
# Create professional report format
pr -h "Q4 Financial Report" -n -o5 -d financial_data.txt > formatted_report.txt

# Technical document with custom layout
pr -l 60 -w 80 -n -o3 technical_doc.txt > tech_formatted.txt

# Legal document with double spacing and line numbers
pr -d -n10 legal_document.txt > legal_formatted.txt

# Create manuscript format for submission
pr -o10 -l 55 manuscript.txt > manuscript_formatted.txt
```

#### Code Listing
```bash
# Format source code for printing
pr -n -h "Source Code: main.c" -l 70 main.c > code_listing.txt

# Multiple source files in one document
pr -n -h "Complete Module" module.c module.h module_test.c > complete_module.txt

# Code review format with custom indentation
pr -n -o4 -h "Code Review" review_candidate.c > review_format.txt

# Diff-style comparison (side by side)
pr -m -h "Code Comparison" old_version.c new_version.c > code_comparison.txt
```

### Data Processing

#### Database Report
```bash
# Format database dump for printing
pr -n -h "Database Export" -l 50 data_dump.txt > db_report.txt

# Wide data in multiple columns
pr -4 -s", " -h "Contact List" contacts.txt > contact_list.txt

# Log file with timestamps
pr -n -h "System Log" -D "%Y-%m-%d %H:%M:%S" application.log > formatted_log.txt

# Configuration files with line numbers
pr -n -h "Apache Configuration" httpd.conf > apache_config.txt
```

#### Text Processing Pipeline
```bash
# Complex text processing pipeline
cat raw_data.txt |
    grep "ERROR" |
    sort |
    pr -n -h "Error Report" -o5 > error_report.txt

# Format and add headers to CSV data
pr -n -h "Sales Data" -s"," sales.csv > formatted_sales.txt

# Create index from text file
grep -n "TODO" project.txt |
    pr -n -h "TODO Index" -o5 > todo_index.txt
```

### System Administration

#### Log File Formatting
```bash
# Format system logs for review
pr -n -h "System Messages" -D "%b %d %H:%M" /var/log/syslog > formatted_syslog.txt

# Multiple log files combined
pr -h "Combined Logs" -n access.log error.log > combined_logs.txt

# Security log with special formatting
pr -n -h "Security Audit" -d secure.log > security_report.txt

# Daily log rotation reports
for logfile in /var/log/app.*.log; do
    pr -h "Log: $(basename $logfile)" -n "$logfile" >> weekly_report.txt
done
```

#### Configuration Documentation
```bash
# Document server configuration
pr -h "Server Configuration" -n -o3 /etc/nginx/nginx.conf > nginx_docs.txt

# Multiple config files
pr -m -h "Config Comparison" prod.conf test.conf > config_diff.txt

# System information report
{
    echo "=== System Information ==="
    uname -a
    echo ""
    echo "=== Disk Usage ==="
    df -h
    echo ""
    echo "=== Memory Usage ==="
    free -m
} | pr -h "System Status Report" -n > system_report.txt
```

## Advanced Usage

### Custom Page Layouts

#### Newsletter Format
```bash
# Two-column newsletter with custom header
pr -2 -a -h "Company Newsletter" -D "%B %Y" articles.txt > newsletter.txt

# Three-column compact format
pr -3 -s"   " -h "Quick Updates" brief_updates.txt > news_brief.txt

# Format with custom margins and spacing
pr -o8 -w 64 -l 55 -h "Formal Report" formal_report.txt > formal_formatted.txt
```

#### Academic Paper Format
```bash
# Academic paper with standard formatting
pr -n -o10 -l 60 -w 65 -h "Research Paper" paper.txt > academic_format.txt

# Thesis format with double spacing
pr -d -n -o8 -h "Thesis Draft" thesis.txt > thesis_formatted.txt

# Bibliography format
pr -n -h "Bibliography" -o5 bibliography.txt > bibliography_formatted.txt
```

### Automated Document Generation

#### Daily Reports
```bash
#!/bin/bash
# Automated daily report generator

DATE=$(date +%Y-%m-%d)
REPORT_FILE="daily_report_$DATE.txt"

{
    echo "Daily System Report - $DATE"
    echo "============================="
    echo ""
    echo "=== Uptime ==="
    uptime
    echo ""
    echo "=== Disk Usage ==="
    df -h
    echo ""
    echo "=== Memory Usage ==="
    free -h
    echo ""
    echo "=== Recent Errors ==="
    grep -i "error" /var/log/syslog | tail -10
} | pr -h "Daily System Report" -n -d > "$REPORT_FILE"

echo "Report generated: $REPORT_FILE"
```

#### Multiple Document Processing
```bash
# Batch process all text files in a directory
for file in *.txt; do
    pr -n -h "Document: $file" -o5 "$file" > "formatted_$file"
done

# Create master document from multiple sources
{
    echo "TABLE OF CONTENTS"
    echo "================="
    ls *.txt | nl

    echo ""
    echo "DOCUMENTS"
    echo "========="
    for file in doc*.txt; do
        echo ""
        pr -h "$(basename $file .txt | tr '[:lower:]' '[:upper:]')" "$file"
    done
} | pr -h "Master Document" > master_document.txt
```

## Integration and Automation

### Shell Script Integration

#### Print Queue Script
```bash
#!/bin/bash
# Format and prepare files for printing

PRINTER_QUEUE="laser_printer"
FORMAT_DIR="/tmp/formatted"

mkdir -p "$FORMAT_DIR"

for file in "$@"; do
    if [[ -f "$file" ]]; then
        formatted_file="$FORMAT_DIR/$(basename "$file").formatted"
        pr -n -h "Print: $file" -d "$file" > "$formatted_file"
        echo "Formatted: $formatted_file"

        # Optional: send to printer
        # lpr -P "$PRINTER_QUEUE" "$formatted_file"
    else
        echo "Warning: $file is not a regular file"
    fi
done
```

#### Log Analysis Automation
```bash
#!/bin/bash
# Automated log analysis and reporting

LOG_DIR="/var/log"
REPORT_DIR="/reports"
DATE=$(date +%Y%m%d)

mkdir -p "$REPORT_DIR"

# Analyze different log types
process_log() {
    local log_file="$1"
    local report_name="$2"
    local pattern="$3"

    if [[ -f "$log_file" ]]; then
        grep "$pattern" "$log_file" |
            sort |
            uniq -c |
            sort -nr |
            pr -n -h "$report_name" -o5 > "$REPORT_DIR/${report_name}_${DATE}.txt"
    fi
}

# Process various logs
process_log "$LOG_DIR/auth.log" "Authentication_Logins" "Accepted"
process_log "$LOG_DIR/auth.log" "Authentication_Failures" "Failed"
process_log "$LOG_DIR/syslog" "System_Errors" "ERROR"
process_log "$LOG_DIR/apache2/access.log" "Web_Access" "HTTP/1.1\" [45]"

echo "Log analysis reports generated in $REPORT_DIR"
```

## Troubleshooting

### Common Issues

#### Formatting Problems
```bash
# Lines too long for page width
# Solution: Increase page width or use multi-column output
pr -w 100 long_lines.txt > fixed_width.txt
pr -3 -w 100 long_content.txt > multi_column.txt

# Tabs not displaying correctly
# Solution: Explicitly expand tabs
pr -e4 file_with_tabs.txt > expanded_tabs.txt

# Special characters causing issues
# Solution: Show control characters
pr -c problematic_file.txt > visible_control_chars.txt
```

#### Output Layout Issues
```bash
# Page breaks in wrong places
# Solution: Adjust page length
pr -l 50 wrong_breaks.txt > correct_breaks.txt

# Multi-column alignment problems
# Solution: Use fixed-width characters and proper spacing
pr -3 -s" | " -w 120 data.txt > aligned_columns.txt

# Headers not appearing correctly
# Solution: Check for control characters in header text
pr -h "Simple_Header" clean_file.txt > clean_header.txt
```

### Performance Considerations

#### Large File Processing
```bash
# Process large files efficiently
# Solution: Use stream processing
large_command | pr -n -h "Large Output" > formatted_large.txt

# Batch processing for multiple large files
# Solution: Process in parallel if possible
for file in large_files/*.txt; do
    pr -n "$file" > "formatted_$(basename $file)" &
done
wait  # Wait for all background jobs to complete
```

## Related Commands

- [`lp`](/docs/commands/system-services/lp) - Print files
- [`lpr`](/docs/commands/system-services/lpr) - Off line print
- [`lpq`](/docs/commands/system-services/lpq) - Show printer queue status
- [`lprm`](/docs/commands/system-services/lprm) - Remove jobs from the printer queue
- [`a2ps`](/docs/commands/file-management/a2ps) - Format files for printing on a PostScript printer
- [`enscript`](/docs/commands/file-management/enscript) - Convert text files to PostScript
- [`fmt`](/docs/commands/file-management/fmt) - Simple text formatting utility
- [`fold`](/docs/commands/file-management/fold) - Wrap input lines to fit in specified width
- [`nl`](/docs/commands/file-management/nl) - Number lines of files
- [`cat`](/docs/commands/file-management/cat) - Concatenate files and print on standard output
- [`more`](/docs/commands/file-management/more) - File perusal filter for crt viewing
- [`less`](/docs/commands/file-management/less) - Opposite of more

## Best Practices

1. **Preview before printing** - Always review formatted output before sending to printer
2. **Use appropriate page length** - Adjust `-l` based on paper size and font
3. **Consider page width** - Set `-w` to match printer capabilities and readability
4. **Add meaningful headers** - Use `-h` to identify document content and purpose
5. **Number lines for reference** - Use `-n` for technical documents and code
6. **Use double spacing** - Apply `-d` for documents requiring annotations
7. **Test tab expansion** - Ensure `-e` settings match your tab conventions
8. **Format for audience** - Adjust complexity based on who will read the document
9. **Batch process consistently** - Use the same formatting options for related documents
10. **Backup original files** - Keep originals before making major formatting changes

## Performance Tips

1. **Stream processing** - Pipe data directly to `pr` for large datasets
2. **Minimal options** - Use only necessary formatting options for better performance
3. **Batch operations** - Process multiple files in scripts rather than interactive commands
4. **Page size optimization** - Use appropriate page lengths to reduce unnecessary processing
5. **Column efficiency** - Use multi-column output for dense content to save space
6. **Header simplicity** - Keep headers short to reduce formatting overhead
7. **Filter before formatting** - Use `grep`, `sed`, or `awk` to reduce content before `pr`
8. **Memory consideration** - For extremely large files, consider splitting before formatting
9. **Parallel processing** - Use background processes for multiple file formatting
10. **Output redirection** - Direct output to files immediately to avoid terminal buffer limits

The `pr` command is an essential utility for anyone needing to create professional-looking printable documents from plain text files. Its extensive formatting options make it perfect for creating reports, documentation, code listings, and various other print-ready materials. Whether you're preparing technical documentation, formatting source code for review, or creating formatted reports from log files, `pr` provides the tools needed to transform plain text into polished, print-ready documents.