---
title: unexpand - Convert spaces to tabs
sidebar_label: unexpand
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# unexpand - Convert spaces to tabs

The `unexpand` command is a text processing utility that converts spaces to tabs in text files or standard input. It serves as the inverse of the `expand` command, which converts tabs to spaces. Unexpand is particularly useful for compressing files, reducing file size, and maintaining consistent indentation when working with source code, configuration files, or tab-delimited data. The command offers flexible tab positioning options and can operate on both leading spaces and all spaces within a file depending on the specified options.

## Basic Syntax

```bash
unexpand [OPTIONS] [FILE...]
```

## Common Options

### Conversion Options
- `-a, --all` - Convert all spaces (not just leading spaces) to tabs
- `-t, --tabs=LIST` - Set tab positions instead of default 8
- `--tab-size=SIZE` - Set tab size (deprecated, use -t instead)

### Tab Position Specification
- `-t N` - Set tab stops every N columns
- `-t N1,N2,N3` - Set tab stops at specific column positions
- `-t N1,N2,N3,+M` - Set initial tab stops, then every M columns

### Standard Options
- `--help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic Conversion Operations

#### Converting Leading Spaces to Tabs
```bash
# Convert leading spaces to tabs (default behavior)
unexpand input.txt > output.txt

# Convert leading spaces using custom tab width
unexpand -t 4 input.txt > output.txt

# Process multiple files
unexpand file1.txt file2.txt file3.txt

# Read from standard input
echo "    Leading spaces" | unexpand

# Process piped data
cat spaced_file.txt | unexpand > tabbed_file.txt
```

#### Converting All Spaces to Tabs
```bash
# Convert all spaces to tabs (not just leading)
unexpand -a input.txt > output.txt

# Convert all spaces with custom tab width
unexpand -a -t 2 input.txt > output.txt

# Process multiple files converting all spaces
unexpand -a *.txt

# Read from stdin with all-space conversion
echo "    Mixed    spaces" | unexpand -a
```

### Custom Tab Positioning

#### Fixed Tab Width
```bash
# Set tab width to 4 spaces
unexpand -t 4 input.txt > output.txt

# Set tab width to 2 spaces
unexpand -t 2 input.txt > output.txt

# Set tab width to 16 spaces
unexpand -t 16 input.txt > output.txt

# Process files with 4-space tabs
unexpand -t 4 *.c *.h
```

#### Multiple Tab Positions
```bash
# Set specific tab positions
unexpand -t 4,8,12,16 input.txt > output.txt

# Set irregular tab positions
unexpand -t 4,10,18,30 input.txt > output.txt

# Mix specific positions with intervals
unexpand -t 4,12,+4 input.txt > output.txt  # tabs at 4,12,16,20,24...

# Complex tab pattern
unexpand -t 2,8,14,+6 input.txt > output.txt
```

## Practical Examples

### Source Code Formatting

#### Python Code Indentation
```bash
# Convert Python code to tabs
unexpand -t 4 script.py > script_tabs.py

# Convert with backup
cp script.py script_backup.py
unexpand -t 4 script_backup.py > script.py

# Process entire Python project
find . -name "*.py" -exec unexpand -t 4 {} \;

# Create tabs version while preserving original
unexpand -t 4 script.py > script_tabs.py
```

#### Configuration Files
```bash
# Convert configuration file to tabs
unexpand -t 2 config.conf > config_tabs.conf

# Convert multiple config files
unexpand -t 2 *.conf *.ini *.cfg

# Process configuration with backup
for file in *.conf; do
    cp "$file" "$file.backup"
    unexpand -t 2 "$file.backup" > "$file"
done
```

#### Makefiles and Build Scripts
```bash
# Convert Makefile to tabs (required by make)
unexpand -a -t 8 Makefile > Makefile.new
mv Makefile.new Makefile

# Convert build scripts
unexpand -t 4 build.sh > build_tabs.sh

# Process shell scripts with tabs
unexpand -t 4 *.sh > /tmp/tabbed_scripts/
```

### Data Processing

#### Tab-Delimited Data Preparation
```bash
# Convert space-separated data to tab-delimited
unexpand -t 8 data.txt > tabbed_data.txt

# Process CSV-like files with spaces
unexpand -a -t 12 spaced_data.csv > tabbed_data.csv

# Convert log files for analysis
unexpand -t 4 application.log > tabbed_application.log
```

#### Text File Compression
```bash
# Compress text files by converting spaces to tabs
unexpand -a document.txt > document_compressed.txt

# Batch compression of text files
for file in *.txt; do
    unexpand -a "$file" > "compressed_$file"
done

# Show compression ratio
wc -c document.txt document_compressed.txt
```

#### Standard Input Processing
```bash
# Convert pipeline output to tabs
ls -l | unexpand -t 8 > ls_tabbed.txt

# Process command output with tabs
ps aux | unexpand -t 4 > ps_tabbed.txt

# Convert formatted data from database
mysql -e "SELECT * FROM users" | unexpand -t 4 > users_tabbed.txt

# Convert find output
find . -ls | unexpand -t 8 > find_tabbed.txt
```

## Advanced Usage

### File Processing Workflows

#### Batch Processing with Error Handling
```bash
#!/bin/bash
# Convert multiple files with error handling

process_file() {
    local file="$1"
    local backup="${file}.backup"

    # Create backup
    if ! cp "$file" "$backup"; then
        echo "Error: Failed to backup $file"
        return 1
    fi

    # Convert to tabs
    if unexpand -t 4 "$backup" > "$file"; then
        echo "Processed: $file"
        rm "$backup"  # Remove backup on success
    else
        echo "Error: Failed to process $file"
        mv "$backup" "$file"  # Restore from backup
        return 1
    fi
}

# Process all text files
for file in *.txt; do
    process_file "$file"
done
```

#### Conditional Conversion
```bash
# Only convert if spaces found
if grep -q "    " input.txt; then
    unexpand -t 4 input.txt > output.txt
    echo "Spaces converted to tabs"
else
    echo "No leading spaces found"
fi

# Show conversion statistics
original_size=$(wc -c < input.txt)
unexpand -a input.txt > temp.txt
converted_size=$(wc -c < temp.txt)
reduction=$((original_size - converted_size))
echo "Size reduction: $reduction bytes"
```

### Integration with Other Commands

#### Pipeline Integration
```bash
# Combine expand and unexpand for complex formatting
cat input.txt | expand -t 4 | unexpand -t 8 > output.txt

# Sort with tab conversion
unexpand -t 4 data.txt | sort | expand -t 4 > sorted_output.txt

# Filter and convert
grep "pattern" *.log | unexpand -t 4 > filtered_tabbed.log

# Complex processing pipeline
cat data.txt | \
    unexpand -t 8 | \
    sort -k2,2n | \
    expand -t 4 | \
    uniq > final_output.txt
```

#### Version Control Integration
```bash
# Check files that need tab conversion before commit
git diff --name-only | grep -E "\.(c|h|py|sh)$" | xargs unexpand -t 4 --test

# Pre-commit hook for tab normalization
#!/bin/bash
for file in $(git diff --cached --name-only | grep -E "\.(c|h|py|sh)$"); do
    unexpand -t 4 "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    git add "$file"
done
```

## Special Operations

### Format Conversion

#### Between Different Tab Styles
```bash
# Convert from 4-space tabs to 8-space tabs
expand -t 4 file.txt | unexpand -t 8 > file_8space.txt

# Convert from custom tabs to standard tabs
expand -t 3,7,11 file.txt | unexpand -t 8 > file_standard.txt

# Progressive tab width changes
expand -t 2 file.txt | unexpand -t 4 | expand -t 8 | unexpand -t 16 > final.txt
```

#### Mixed Space/Tab Handling
```bash
# Only convert leading spaces, preserve internal spacing
unexpand -t 4 file.txt > tabs_leading.txt

# Convert all spaces for maximum compression
unexpand -a -t 2 file.txt > maximum_compression.txt

# Selective conversion based on context
awk '/^    / {print $0 | "unexpand -t 4"; next} {print}' file.txt > output.txt
```

## Performance and Optimization

### Large File Processing

#### Efficient Processing Techniques
```bash
# Process large files with memory consideration
split -l 10000 large_file.txt part_
for part in part_*; do
    unexpand -t 4 "$part" > "tabbed_$part"
done
cat tabbed_part_* > final_tabbed.txt
rm part_* tabbed_part_*

# Parallel processing
find . -name "*.txt" | xargs -P 4 -I {} unexpand -t 4 {} {}.tabs

# Streaming for very large files
cat huge_file.txt | unexpand -t 4 > huge_file_tabs.txt
```

#### Memory and Speed Optimization
```bash
# Use appropriate tab size for efficiency
unexpand -t 8 file.txt > output.txt  # Standard 8-space tabs

# Minimize I/O operations by using pipes
cat file1.txt file2.txt file3.txt | unexpand -t 4 > all_combined.txt

# Batch processing with single command
unexpand -t 4 *.txt > /tmp/all_tabs.txt && split -l 1000 /tmp/all_tabs.txt output_
```

## Troubleshooting

### Common Issues

#### Tab Position Problems
```bash
# Check current tab structure
cat -T file.txt  # Shows tabs as ^I

# Verify conversion result
echo "Test with 4 spaces:    " | unexpand -t 4 | od -c

# Check for mixed tabs and spaces
cat -A file.txt | grep -E "\^I| "

# Show line-by-line conversion
cat file.txt | while read line; do
    echo "$line" | unexpand -t 4
done
```

#### File Encoding Issues
```bash
# Handle different encodings
iconv -f latin1 -t utf8 file.txt | unexpand -t 4 > output.txt

# Check file encoding before processing
file -i file.txt

# Process with proper locale
LC_ALL=C unexpand -t 4 file.txt > output.txt
```

#### Backup and Recovery
```bash
# Always create backups before batch operations
mkdir backups
cp *.txt backups/

# Verify conversion before replacing originals
unexpand -t 4 file.txt > file.tmp
diff file.txt file.tmp || echo "Changes detected"

# Revert if needed
cp backups/*.txt .
```

## Related Commands

- [`expand`](/docs/commands/file-management/expand) - Convert tabs to spaces
- [`tabs`](/docs/commands/file-management/tabs) - Set terminal tab stops
- [`fmt`](/docs/commands/file-management/fmt) - Simple text formatter
- [`pr`](/docs/commands/file-management/pr) - Print files with formatting
- [`col`](/docs/commands/file-management/col) - Filter reverse line feeds
- [`tr`](/docs/commands/file-management/tr) - Translate or delete characters

## Best Practices

1. **Always backup files** before bulk conversion operations
2. **Test on small samples** first to verify tab conversion behavior
3. **Use consistent tab widths** throughout your project
4. **Check file encoding** before processing to avoid character issues
5. **Verify conversion results** using `cat -T` or `od -c` to see tab characters
6. **Consider version control** integration to track tab conversion changes
7. **Use appropriate tab size** based on file type and project standards
8. **Process files atomically** to avoid corruption if conversion fails
9. **Document your tab standards** for team consistency
10. **Test with downstream tools** to ensure tab compatibility

## Performance Tips

1. **Use standard tab widths** (8) for maximum compatibility
2. **Process files in batches** to reduce command overhead
3. **Avoid unnecessary conversions** - only convert when truly needed
4. **Use pipes for streaming** instead of intermediate files when possible
5. **Parallelize large batches** using xargs or parallel processing tools
6. **Choose appropriate tab size** to balance readability and compression
7. **Consider file size** when using `-a` option as it may increase processing time
8. **Use local filesystem** for better performance during conversion
9. **Minimize I/O operations** by combining operations in pipelines
10. **Monitor system resources** when processing very large files

The `unexpand` command is an essential text processing tool for converting spaces to tabs, providing flexible options for tab positioning and comprehensive conversion capabilities. Its ability to handle both leading and all-space conversion, combined with custom tab positioning, makes it invaluable for source code formatting, data processing, and file compression tasks.