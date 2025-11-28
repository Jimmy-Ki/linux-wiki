---
title: expand - Convert tabs to spaces
sidebar_label: expand
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# expand - Convert tabs to spaces

The `expand` command is a Unix/Linux utility that converts tab characters in text files to spaces. It reads input from files or standard input and writes the result to standard output, replacing each tab with the appropriate number of spaces to align text to tab stops. This tool is particularly useful for normalizing text files, ensuring consistent formatting, and preparing files for environments where tab handling varies between systems or applications. Expand supports customizable tab spacing, selective tab conversion, and various output options for different text processing scenarios.

## Basic Syntax

```bash
expand [OPTION]... [FILE]...
```

## Common Options

### Tab Stop Options
- `-t, --tabs=LIST` - Set tab stops at specified positions or use regular spacing
- `-i, --initial` - Convert only initial tabs (tabs at beginning of lines)
- `--tabs=NUMBER` - Set tab width to specified number of spaces (default: 8)

### Input/Output Options
- `FILE` - Input file(s) to process (default: standard input)

### Help and Version
- `--help` - Display help information and exit
- `--version` - Show version information and exit

## Usage Examples

### Basic Tab Expansion

#### Simple Tab Conversion
```bash
# Convert tabs to spaces with default 8-space tab width
expand input.txt

# Convert tabs and save to output file
expand input.txt > output.txt

# Process multiple files
expand file1.txt file2.txt > combined_output.txt

# Read from standard input
echo -e "Column1\tColumn2\tColumn3" | expand
```

#### Custom Tab Width
```bash
# Set tab width to 4 spaces
expand -t 4 input.txt

# Set tab width to 2 spaces
expand --tabs=2 input.txt

# Use tab width of 6 for Python-style indentation
expand -t 6 python_script.py > expanded_script.py
```

### Advanced Tab Stop Configuration

#### Specific Tab Positions
```bash
# Set tab stops at specific columns (comma-separated)
expand -t 5,10,15,20 input.txt

# Set tab stops at irregular intervals
expand --tabs=3,8,16,32,64 input.txt

# Configure tab stops for formatted data
expand -t 10,25,40,55,70 formatted_data.txt
```

#### Multiple Files Processing
```bash
# Process multiple files with same tab settings
expand -t 4 file1.txt file2.txt file3.txt

# Process files and concatenate output
expand -t 4 *.txt > all_expanded.txt

# Process files from different directories
expand -t 4 docs/*.txt config/*.conf > merged_expanded.txt
```

### Selective Tab Conversion

#### Convert Only Initial Tabs
```bash
# Convert only tabs at the beginning of lines
expand -i input.txt

# Use with custom tab width for indentation only
expand -i -t 4 source_code.py

# Preserve internal tabs, expand indentation
expand --initial --tabs=8 mixed_content.txt
```

#### Preserving Internal Tabs
```bash
# Expand indentation but keep internal tabs for tabular data
expand -i tabular_data.txt > clean_indentation.txt

# Process source code keeping string literals with tabs intact
expand -i --tabs=4 source_with_tabs.c > normalized_source.c
```

## Practical Examples

### Source Code Processing

#### Normalizing Code Indentation
```bash
# Convert tabs to 4 spaces in Python files
expand -t 4 -i indented_code.py > normalized_code.py

# Process all Python files in directory
for file in *.py; do
    expand -t 4 -i "$file" > "expanded_$file"
done

# Normalize mixed tab/space indentation in JavaScript
expand -t 2 -i mixed_indentation.js > clean_indentation.js

# Convert Makefile tabs (preserve) while expanding other files
# Note: Makefiles require tabs, so be careful with expansion
expand -t 4 -i $(find . -name "*.c" -o -name "*.h") > all_sources_expanded.c
```

#### Legacy Code Migration
```bash
# Convert old code with tabs to modern space indentation
find /legacy/project -name "*.c" -exec expand -t 4 -i {} \; > /modern/project/converted_sources.c

# Batch process configuration files
expand -t 8 /etc/old/*.conf > /etc/new/expanded_configs.conf

# Convert CVS/SVN checkout files with tabs
expand -t 4 $(find . -name "*.java") > normalized_java_sources.java
```

### Document Processing

#### Text Document Normalization
```bash
# Normalize document with inconsistent tabs
expand -t 8 inconsistent_document.txt > clean_document.txt

# Convert tab-separated values to space-separated
expand -t 4 data.tsv > data_ssv.txt

# Process README files for consistent formatting
expand -t 4 README.md > normalized_README.md

# Convert configuration files for cross-platform compatibility
expand -t 8 windows_config.cfg > unix_friendly_config.cfg
```

#### Log File Processing
```bash
# Expand tabs in log files for better readability
expand -t 4 application.log > readable_application.log

# Process multiple log files
expand -t 4 /var/log/*.log > all_logs_expanded.log

# Convert syslog entries with tab delimiters
expand -t 8 /var/log/syslog > expanded_syslog.log
```

### Data Processing and Formatting

#### Tabular Data Conversion
```bash
# Convert tab-delimited data to aligned columns
expand -t 10,20,30,40 tabular_data.txt > aligned_columns.txt

# Process CSV files that use tabs as delimiters
expand -t 4 -i tab_delimited_data.csv > space_delimited.csv

# Align database export files
expand -t 12,25,40,60 database_export.txt > formatted_export.txt

# Convert mixed delimiter files to consistent spacing
expand -t 8 mixed_delimiter_data.txt > clean_format.txt
```

#### Configuration File Management
```bash
# Expand tabs in configuration files for consistency
expand -t 4 /etc/app/*.conf > /tmp/expanded_configs.conf

# Normalize Windows configuration files for Unix
expand -t 4 windows.ini > unix_compatible.ini

# Process configuration templates
expand -t 2 template.conf > production_ready.conf
```

## Advanced Usage

### Complex Text Processing

#### Pipeline Operations
```bash
# Expand tabs in pipeline output
cat mixed_format.txt | expand -t 4 | grep "pattern"

# Chain with other text processing tools
expand -t 4 input.txt | sort | uniq > processed.txt

# Use with sed for additional formatting
expand -t 4 source.c | sed 's/^[ \t]*//' > stripped_source.c

# Combine with awk for field processing
expand -t 4 data.txt | awk -F' +' '{print $1,$2}'
```

#### Conditional Processing
```bash
# Expand tabs only if file contains tabs
if grep -q $'\t' input.txt; then
    expand -t 4 input.txt > output.txt
else
    cp input.txt output.txt
fi

# Process files with different tab widths based on extension
case "$file" in
    *.py) expand -t 4 -i "$file" ;;
    *.js) expand -t 2 -i "$file" ;;
    *.c)  expand -t 8 -i "$file" ;;
    *)    expand -t 8 "$file" ;;
esac
```

### Batch Processing

#### Directory Processing
```bash
# Process all text files in directory recursively
find . -name "*.txt" -exec expand -t 4 {} \; -exec mv {}.expanded {} \;

# Create backup before processing
for file in *.txt; do
    cp "$file" "$file.backup"
    expand -t 4 "$file.backup" > "$file"
done

# Process files with specific encoding
expand -t 4 input.txt | iconv -f latin1 -t utf8 > output_utf8.txt
```

#### Automation Scripts
```bash
#!/bin/bash
# Normalize all source files in project

PROJECT_DIR="/path/to/project"
TAB_WIDTH=4

# Find and process source files
find "$PROJECT_DIR" -type f \( -name "*.c" -o -name "*.h" -o -name "*.py" -o -name "*.java" \) | while read file; do
    if grep -q $'\t' "$file"; then
        echo "Processing: $file"
        expand -t $TAB_WIDTH -i "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi
done

echo "Source file normalization complete"
```

## Performance and Optimization

### Large File Processing

#### Memory Efficiency
```bash
# Process large files using streams
expand -t 4 large_file.txt | other_command > result.txt

# Split and process very large files
split -l 100000 huge_file.txt part_
for part in part_*; do
    expand -t 4 "$part" > "expanded_$part"
done
cat expanded_part_* > fully_expanded.txt
rm part_* expanded_part_*
```

#### Parallel Processing
```bash
# Process multiple files in parallel
ls *.txt | xargs -P 4 -I {} expand -t 4 {} > {}.expanded

# GNU parallel for batch processing
find . -name "*.txt" | parallel -j 4 expand -t 4 {} {.}.expanded
```

### Special Cases

#### Binary File Safety
```bash
# Check if file is text before processing
if file "$filename" | grep -q text; then
    expand -t 4 "$filename" > output.txt
fi

# Skip binary files
find . -type f -exec file {} \; | grep -v binary | cut -d: -f1 | xargs expand -t 4
```

#### Encoding Considerations
```bash
# Handle UTF-8 files with tabs
expand -t 4 utf8_file.txt | iconv -f utf8 -t utf8 > clean_utf8.txt

# Process files with different line endings
expand -t 4 input.txt | tr -d '\r' > unix_format.txt
```

## Integration and Automation

### Version Control Integration

#### Git Hooks
```bash
#!/bin/sh
# .git/hooks/pre-expand-hook - Expand tabs before commit

# Staged files
staged_files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(c|h|py|java|js)$')

for file in $staged_files; do
    if [ -f "$file" ]; then
        # Expand tabs and stage the result
        expand -t 4 -i "$file" > "$file.expanded"
        mv "$file.expanded" "$file"
        git add "$file"
    fi
done
```

#### Editor Integration
```bash
# Vim command to expand tabs
:!expand -t 4 % > /tmp/expanded && mv /tmp/expanded %

# Emacs function for tab expansion
(defun expand-tabs-in-buffer ()
  "Expand tabs in current buffer"
  (interactive)
  (shell-command-on-region (point-min) (point-max) "expand -t 4" nil t))
```

### Build System Integration

#### Make Integration
```makefile
# Makefile rule to expand tabs in source files
%.c: %.c.tabs
	expand -t 4 -i $< > $@

.PHONY: normalize-tabs
normalize-tabs:
	find . -name "*.c" -exec expand -t 4 -i {} {}.tmp \;
	for f in *.c.tmp; do mv "$f" "$${f%.tmp}"; done
```

#### CMake Integration
```cmake
# Custom command to expand tabs
add_custom_command(
    OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/expanded_source.c
    COMMAND expand -t 4 -i ${CMAKE_CURRENT_SOURCE_DIR}/source.c > expanded_source.c
    DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/source.c
)
```

## Troubleshooting

### Common Issues

#### Tab Width Inconsistency
```bash
# Check tab width in file before processing
od -c input.txt | head -20

# Use od to visualize tab characters
od -c file.txt | grep '\\t'

# Find lines with tabs
grep -n $'\t' input.txt
```

#### Mixed Indentation Issues
```bash
# Check for mixed tabs and spaces
grep -n -P '[ \t]+[^\t ]' file.txt

# Detect inconsistent indentation
grep -n -P '^[ \t]*\t' file.txt  # Tabs after spaces
```

#### File Encoding Problems
```bash
# Check file encoding
file -bi input.txt

# Convert encoding before expanding
iconv -f latin1 -t utf8 input.txt | expand -t 4 > output.txt
```

### Validation and Verification

#### Verify Tab Conversion
```bash
# Check if output contains any tabs
if grep -q $'\t' output.txt; then
    echo "Warning: Output still contains tabs"
fi

# Compare line counts before and after
original_lines=$(wc -l < input.txt)
expanded_lines=$(wc -l < output.txt)
echo "Lines: $original_lines -> $expanded_lines"

# Verify no data loss
if [ $original_lines -eq $expanded_lines ]; then
    echo "Line count preserved"
else
    echo "Warning: Line count changed"
fi
```

## Related Commands

- [`unexpand`](/docs/commands/file-management/unexpand) - Convert spaces to tabs (inverse operation)
- [`tabs`](/docs/commands/system-info/tabs) - Set terminal tab stops
- [`pr`](/docs/commands/file-management/pr) - Convert text files for printing
- [`fmt`](/docs/commands/file-management/fmt) - Simple text formatting utility
- [`fold`](/docs/commands/file-management/fold) - Wrap input lines to fit specified width
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`tr`](/docs/commands/other-tools/tr) - Translate or delete characters

## Best Practices

1. **Choose appropriate tab width** based on file type and project standards (2 for JavaScript, 4 for Python, 8 for traditional Unix)
2. **Use `-i` option** for source code to preserve internal tabs in strings while normalizing indentation
3. **Test on sample files** before processing large batches of important files
4. **Create backups** before processing critical configuration files
5. **Validate results** to ensure no data loss during conversion
6. **Consider encoding** when working with international text files
7. **Use consistent settings** across team members and projects
8. **Integrate with version control** to automatically handle tab expansion in commits
9. **Check file type** before processing to avoid corrupting binary files
10. **Document your tab width standards** in project style guides

## Performance Tips

1. **Stream processing** is more memory-efficient than loading entire files for large files
2. **Batch processing** with `xargs` or `find -exec` is more efficient than individual commands
3. **Parallel processing** can significantly speed up operations on multiple files
4. **Conditional processing** (only files with tabs) saves unnecessary work
5. **Use appropriate I/O buffering** when working with network-mounted filesystems
6. **Consider SSD storage** for faster I/O when processing large volumes of files
7. **Monitor system resources** during batch processing of large file sets
8. **Use `--tabs=N` syntax** for better performance with simple uniform tab widths

The `expand` command is an essential utility for text normalization and code formatting across different systems and environments. Its flexibility in handling various tab configurations and selective conversion options makes it invaluable for maintaining consistent text formatting in software development, document processing, and system administration tasks.