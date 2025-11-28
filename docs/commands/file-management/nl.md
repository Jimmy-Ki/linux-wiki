---
title: nl - Number lines of files
sidebar_label: nl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nl - Number lines of files

The `nl` command is a versatile line numbering utility that reads files from standard input or specified files and writes them to standard output with line numbers added. Unlike simple line numbering tools, `nl` offers sophisticated formatting options including different numbering styles, section-based numbering, customizable number formats, and intelligent blank line handling. It's particularly useful for processing source code, configuration files, logs, and any text documents where line references are important for navigation, debugging, or documentation purposes.

## Basic Syntax

```bash
nl [OPTION]... [FILE]...
```

If no FILE is specified, or when FILE is `-`, `nl` reads from standard input.

## Numbering Styles

The `nl` command supports three main numbering styles, each with specific use cases:

- **body** (default) - Numbers all lines in the body section
- **header** - Numbers lines in the header section
- **footer** - Numbers lines in the footer section

## Common Options

### Line Numbering Control
- `-b, --body-numbering=STYLE` - Set body line numbering style
  - `a` - Number all lines
  - `t` - Number only non-empty lines (default)
  - `n` - Number no lines
  - `pREGEXP` - Number only lines matching regular expression
- `-h, --header-numbering=STYLE` - Set header line numbering style
- `-f, --footer-numbering=STYLE` - Set footer line numbering style
- `-d, --section-delimiter=CC` - Use characters CC for logical page delimiters (default `\:`)

### Number Format Options
- `-i, --line-increment=NUMBER` - Line number increment (default 1)
- `-l, --join-blank-lines=NUMBER` - Group blank lines and only number first of group
- `-n, --number-format=FORMAT` - Line numbering format:
  - `ln` - Left justified, no leading zeros
  - `rn` - Right justified, no leading zeros (default)
  - `rz` - Right justified, with leading zeros
- `-v, --starting-line-number=NUMBER` - First line number on each logical page (default 1)
- `-w, --number-width=NUMBER` - Width of line numbers (default 6)

### Page Layout
- `-p, --no-renumber` - Do not reset line numbers at logical page boundaries
- `-s, --number-separator=STRING` - String to separate line numbers and lines (default TAB)

### Other Options
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Line Numbering

#### Simple Line Numbering
```bash
# Number all lines in a file
nl file.txt

# Number only non-empty lines (default behavior)
nl -b t document.txt

# Number all lines including empty ones
nl -b a config.conf

# Number no lines in body (useful for headers only)
nl -b n source_code.c

# Read from standard input
ps aux | nl
```

#### Custom Number Formats
```bash
# Left-justified numbers
nl -n ln output.log

# Right-justified with leading zeros
nl -n rz numbers.txt

# Right-justified without leading zeros (default)
nl -n rn data.txt

# Custom width for numbers
nl -w 3 short_file.txt

# Custom separator instead of tab
nl -s ": " README.md
```

### Advanced Numbering Patterns

#### Conditional Line Numbering
```bash
# Number lines containing "error" only
nl -b p'error' application.log

# Number lines starting with # (comments)
nl -b p'^#' script.sh

# Number lines NOT matching pattern (using grep first)
grep -v '^#' config.conf | nl

# Number lines with specific text patterns
nl -b p'function\|def\|class' code.py
```

#### Section-Based Numbering
```bash
# Create sections with different numbering
echo -e "Header section\n\n:\nBody section\n\n:\nFooter section" | nl

# Custom section delimiters
nl -d '%%' sections.txt

# Number headers, body, and footer differently
nl -h a -b t -f n document_with_sections.txt
```

### Number Range and Increment Control

#### Custom Starting Numbers and Increments
```bash
# Start numbering from 100
nl -v 100 file.txt

# Increment by 5
nl -i 5 data.txt

# Start from 1, increment by 10
nl -v 1 -i 10 multiples.txt

# Negative starting number
nl -v -10 counting.txt
```

#### Page-Based Numbering
```bash
# Reset numbering for each logical page
nl document.txt

# Continue numbering across pages
nl -p long_document.txt

# Multiple files with continuous numbering
nl file1.txt file2.txt file3.txt

# Multiple files with page reset
nl -p file1.txt file2.txt file3.txt
```

### Blank Line Handling

#### Grouping Blank Lines
```bash
# Group up to 3 blank lines together
nl -l 3 sparse_file.txt

# Don't group blank lines
nl -l 1 text_with_blanks.txt

# Group all consecutive blank lines
nl -l 1000 many_blanks.txt

# Number only first line of blank line groups
nl -b t -l 2 mixed_content.txt
```

## Practical Examples

### Source Code Processing

#### Code Line Numbering
```bash
# Number source code for debugging
nl -b a source_code.py > numbered_code.py

# Number code with zero-padded line numbers
nl -n rz -w 3 program.c > numbered_program.c

# Number only significant code lines (skip blank lines)
nl -b t algorithm.java

# Create line-numbered code listing
nl -s "  " -w 3 script.sh > code_listing.txt
```

#### Code Documentation
```bash
# Number code with custom separator
nl -s ": " -b a functions.js > documented_functions.js

# Create code reference with line numbers
nl -b p'function\|def\|class' code.py > function_lines.txt

# Number header comments differently
nl -h a -b t module.py > documented_module.py

# Number only function definitions
awk '/function/ {print NR ": " $0}' script.js
# Or using nl with grep:
grep -n 'function' script.js | nl -v 1 -i 1
```

### Configuration and Log File Analysis

#### Configuration File Numbering
```bash
# Number configuration file for reference
nl /etc/ssh/sshd_config > sshd_numbered.conf

# Number only active (non-comment) configuration lines
nl -b p'^[^#]' nginx.conf

# Create numbered backup of configuration
cp config.conf config.conf.bak && nl config.conf > config_numbered.conf

# Number sections in configuration file
nl -d '\[' -h a -b t sections.conf
```

#### Log File Analysis
```bash
# Number log entries for reference
nl application.log > numbered_app.log

# Number only error messages
nl -b p'ERROR\|FATAL' system.log

# Number lines with timestamps
nl -b p'^[0-9]{4}-[0-9]{2}-[0-9]{2}' access.log

# Create indexed log for searching
nl -w 6 -s " | " server.log | grep 'ERROR'
```

### Document Processing

#### Document Preparation
```bash
# Number document lines for review
nl -b a draft.txt > numbered_draft.txt

# Number with custom formatting
nl -s ". " -w 3 document.txt > formal_document.txt

# Number only body content (skip headers/footers)
nl -h n -b t -f n letter.txt

# Create academic paper line numbering
nl -n rz -w 4 -s " " research_paper.txt
```

#### Text Processing Pipelines
```bash
# Number lines and then filter
nl file.txt | grep 'important'

# Number and format for display
nl file.txt | fold -w 80

# Number lines and add timestamps
nl file.txt | while read line; do echo "$(date '+%Y-%m-%d %H:%M:%S') $line"; done

# Number and create HTML table
nl -h a -b t file.txt | sed 's/^/<tr><td>/' | sed 's/\t/<\/td><td>/' | sed 's/$/<\/td><\/tr>/'
```

## Advanced Usage

### Complex Numbering Schemes

#### Multiple File Processing
```bash
# Number multiple files with continuous numbering
cat file1.txt file2.txt file3.txt | nl > combined_numbered.txt

# Number files with individual numbering
for file in *.txt; do nl -b a "$file" > "numbered_$file"; done

# Number with file prefixes
for file in *.log; do echo "=== $file ==="; nl "$file"; done

# Create master index of multiple files
find . -name "*.txt" -exec echo "=== {} ===" \; -exec nl {} \;
```

#### Conditional and Pattern-Based Numbering
```bash
# Number based on indentation level
awk '/^[ \t]/ {print NR ": " $0; next} {print $0}' file.txt

# Number only lines with specific indentation
nl -b p'^    ' indented_code.txt

# Number lines of different types differently
awk '/^#/ {print "H" ++h ": " $0; next} /^[^$]/ {print "B" ++b ": " $0; next} {print $0}' file.txt

# Number with custom logic
awk 'length($0) > 80 {print "L" ++l ": " $0; next} {print $0}' long_lines.txt
```

### Integration with Other Tools

#### Pipeline Integration
```bash
# Number output of other commands
ls -la | nl

# Number filtered results
ps aux | grep 'nginx' | nl

# Number sorted output
sort file.txt | nl

# Number diff output
diff file1.txt file2.txt | nl
```

#### Script and Automation
```bash
# Create numbered backup with timestamp
backup_file() {
    local file="$1"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    cp "$file" "${file}.backup_${timestamp}"
    nl "$file" > "${file}.numbered_${timestamp}"
}

# Number all files in directory
number_directory() {
    for file in *; do
        if [ -f "$file" ]; then
            nl "$file" > "numbered_$file"
        fi
    done
}

# Create line-numbered code review package
create_code_review() {
    find . -name "*.py" -exec echo "=== {} ===" \; -exec nl {} \; > code_review.txt
}
```

## Special Applications

### Academic and Technical Writing

#### Thesis and Paper Numbering
```bash
# Number thesis chapters
for chapter in chapter*.tex; do
    echo "\\chapter{$chapter}"
    nl -b a -v 1 -s " " "$chapter"
done

# Create line-numbered appendix
nl -h a -b t appendix.txt > numbered_appendix.txt

# Number bibliography entries
nl -b p'^[A-Z]' bibliography.txt > numbered_bibliography.txt
```

#### Code Review and Debugging
```bash
# Create code review document
git show HEAD:src/main.js | nl -s "  " > review_main.js

# Number diff for review
git diff | nl > diff_review.txt

# Number test results
pytest -v | nl > test_results_numbered.txt

# Create numbered patch file
diff -u original.txt modified.txt | nl > patch_numbered.txt
```

### System Administration

#### System Documentation
```bash
# Document system configuration
{
    echo "=== Network Configuration ==="
    nl /etc/network/interfaces

    echo "=== SSH Configuration ==="
    nl /etc/ssh/sshd_config

    echo "=== System Information ==="
    uname -a | nl
} > system_documentation.txt

# Number cron jobs
crontab -l | nl > numbered_crontab.txt

# Document running processes
ps aux | nl > process_list.txt
```

#### Log Analysis and Reporting
```bash
# Create numbered error report
grep 'ERROR' /var/log/syslog | nl > error_report.txt

# Number system events by date
grep "$(date +%Y-%m-%d)" /var/log/messages | nl > today_events.txt

# Create numbered access log summary
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | nl > ip_summary.txt
```

## Performance Tips

### Optimizing Large File Processing
```bash
# Use appropriate buffer sizes for large files
nl -b a large_file.txt > output.txt

# Process large files in chunks
split -l 10000 huge_file.txt chunk_
for chunk in chunk_*; do
    nl "$chunk" > "numbered_$chunk"
done

# Use memory-efficient options for very large files
nl -b t -l 1000 sparse_large_file.txt
```

### Batch Processing Optimization
```bash
# Process multiple files efficiently
find . -name "*.log" -exec nl {} + > all_logs_numbered.txt

# Parallel processing with GNU parallel
ls *.txt | parallel 'nl {} > numbered_{/}'

# Use temporary files for intermediate processing
nl input.txt > temp_file && process temp_file > final_output.txt
```

## Troubleshooting

### Common Issues

#### Line Number Alignment Problems
```bash
# Fix alignment issues with wide numbers
nl -w 10 long_file.txt

# Handle mixed line lengths properly
nl -s "  " -b a mixed_content.txt

# Deal with tabs in input
expand -t 4 input.txt | nl -s "  "
```

#### Encoding and Character Issues
```bash
# Handle UTF-8 files properly
LC_ALL=C nl utf8_file.txt

# Convert line endings first
dos2unix file.txt && nl file.txt

# Handle binary files safely
file file.txt | grep -q text && nl file.txt
```

#### Performance Issues
```bash# For very large files, consider using simpler tools
wc -l large_file.txt

# Use awk for complex conditions when nl is slow
awk 'NR>=100 && NR<=200' large_file.txt

# Process specific line ranges
sed -n '100,200p' file.txt | nl -v 100
```

## Related Commands

- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`head`](/docs/commands/file-management/head) - Display first lines of files
- [`tail`](/docs/commands/file-management/tail) - Display last lines of files
- [`grep`](/docs/commands/file-management/grep) - Search text patterns
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/file-management/sed) - Stream editor
- [`wc`](/docs/commands/file-management/wc) - Count lines, words, and characters
- [`pr`](/docs/commands/file-management/pr) - Convert text files for printing
- [`fmt`](/docs/commands/file-management/fmt) - Format text files
- [`fold`](/docs/commands/file-management/fold) - Wrap lines to fit specified width

## Best Practices

1. **Choose appropriate numbering style** (`-b`) based on content type and purpose
2. **Use consistent formatting** (`-n`, `-w`) for professional documents
3. **Handle blank lines appropriately** (`-l`) for readability
4. **Consider logical page boundaries** (`-d`, `-p`) for multi-section documents
5. **Test on small samples** before processing very large files
6. **Backup original files** before overwriting with numbered versions
7. **Use custom separators** (`-s`) for better integration with other tools
8. **Filter content first** when numbering specific types of lines
9. **Consider encoding issues** when working with diverse file types
10. **Use pipelines** to combine `nl` with other text processing tools

## Performance Tips

1. **`-b t` (default)** is most efficient for sparse files
2. **`-l N`** groups blank lines, reducing processing overhead
3. **`-w N`** with appropriate width prevents reformatting
4. **Avoid complex regex patterns** in `-b pREGEXP` for large files
5. **Use `awk`** for complex conditional numbering needs
6. **Process chunks** of very large files to manage memory
7. **Consider `cat -n`** for simple numbering tasks
8. **Use `grep -n`** for pattern-based line numbers
9. **Buffer output** when redirecting to slow storage
10. **Parallel process** multiple independent files when possible

The `nl` command is a powerful and flexible tool for adding line numbers to text files, offering sophisticated formatting options that make it invaluable for code review, documentation, log analysis, and any scenario where line references are essential for navigation and communication.