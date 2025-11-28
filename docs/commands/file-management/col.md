---
title: col - Filter Reverse Line Feeds
sidebar_label: col
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# col - Filter Reverse Line Feeds

The `col` command is a specialized text processing utility that filters out reverse line feeds and other formatting characters from text files. It's particularly useful for processing text that contains backspace characters, half-line motions, and other terminal formatting sequences. The command can convert files with mixed text formatting into clean, linear text suitable for printing or further processing. `col` is commonly used to process output from programs that generate formatted text with backspaces, such as `man` pages, `nroff` output, or text with overstriking effects.

## Basic Syntax

```bash
col [options] [input_file]
```

## Common Options

### Filtering Options
- `-b`, `--no-backspaces` - Do not output backspaces
- `-f`, `--fine` - Permit half forward line feeds
- `-p`, `--pass` - Pass unknown control sequences through
- `-x`, `--tabs` - Output multiple spaces instead of tabs

### Spacing Options
- `-l`, `--lines=NUM` - Buffer at least NUM lines (default 128)
- `-h`, `--tabs=NUM` - Convert tabs to spaces (default 8)
- `-a`, `--all` - Be more aggressive in removing backspaces

## Usage Examples

### Basic Text Filtering

#### Simple Backspace Removal
```bash
# Remove backspace characters from a file
col < input.txt > output.txt

# Process man page output
man ls | col -b > ls_manual.txt

# Clean up text with overstriking
col -b < formatted_text.txt > clean_text.txt
```

#### Tab Conversion
```bash
# Convert tabs to spaces
col -x < tabbed_file.txt > spaced_file.txt

# Custom tab spacing
expand -t 4 input.txt | col -x > output.txt

# Process text with mixed tabs and backspaces
col -bx < complex_format.txt > clean_output.txt
```

### Advanced Filtering Options

#### Fine Line Feed Processing
```bash
# Allow half-line forward motions
col -f < nroff_output.txt > processed.txt

# Process formatted man pages
man -Tascii ls | col -f -b > ls_ascii.txt

# Handle complex formatting
col -fp < formatted_doc.txt > clean_doc.txt
```

#### Control Sequence Handling
```bash
# Pass through unknown control sequences
col -p < special_format.txt > output.txt

# More aggressive backspace removal
col -a -b < heavily_formatted.txt > clean.txt

# Combine multiple options
col -fbp < complex_text.txt > final_output.txt
```

## Practical Examples

### Man Page Processing

#### Clean Man Page Export
```bash
# Export clean man page for printing
man -Tascii printf | col -b | lpr

# Save man page without formatting
man grep | col -b > grep_manual.txt

# Create searchable man page database
for cmd in ls cp mv rm; do
    man $cmd | col -b > docs/${cmd}_manual.txt
done

# Process multiple man pages
man -a cat | col -b > cat_all_manuals.txt
```

#### Man Page Formatting for Different Uses
```bash
# Prepare man page for documentation
man -Tascii tar | col -b | fmt -w 80 > tar_docs.txt

# Create man page summary
man ls | col -b | head -50 > ls_summary.txt

# Extract specific sections
man find | col -b | grep -A 10 "EXAMPLES" > find_examples.txt
```

### Text Document Processing

#### Cleaning Legacy Text
```bash
# Process text from old terminals
col -b < legacy_text.txt > modern_text.txt

# Remove line drawing characters
col -f < terminal_output.txt > clean_output.txt

# Process text with mixed encodings
iconv -f latin1 -t utf8 old_text.txt | col -b > clean_utf8.txt
```

#### Document Preparation
```bash
# Prepare text for typesetting
col -x < source.txt > typesetter_input.txt

# Clean up text for version control
col -b < formatted_changes.txt > clean_changes.txt

# Process text for email
col -b -x < document.txt > email_ready.txt
```

### Development Workflow

#### Log Processing
```bash
# Clean up log files with control characters
col -b < application.log > clean_log.txt

# Process terminal output
script session.log
col -b < session.log > clean_session.txt

# Filter debug output
./debug_program 2>&1 | col -b > debug_clean.txt
```

#### Source Code Processing
```bash
# Remove backspaces from generated code
col -b < generated_source.c > clean_source.c

# Process preprocessor output
gcc -E source.c | col -b > preprocessed.c

# Clean up documentation strings
col -b < comments.txt > clean_comments.txt
```

### System Administration

#### Configuration File Processing
```bash
# Clean configuration files
col -b < config.bak > config_clean.txt

# Process system output
dmesg | col -b > dmesg_clean.txt

# Format system information
ps aux | col -b > ps_output.txt
```

#### Terminal Session Cleanup
```bash
# Clean script recordings
script -c "ls -la" session.txt
col -b < session.txt > clean_session.txt

# Process terminal captures
col -b < terminal_capture.txt > readable_output.txt

# Clean remote session logs
ssh host "command" | col -b > remote_output.txt
```

## Advanced Usage

### Buffer Management

#### Large File Processing
```bash
# Increase buffer for large files
col -l 1000 < huge_file.txt > output.txt

# Process files with many lines
col -l 10000 < massive_log.txt > clean_log.txt

# Handle extremely long lines
col -l 50000 < special_format.txt > output.txt
```

#### Memory Optimization
```bash
# Process files in chunks for low memory
split -l 10000 huge_file.txt chunk_
for chunk in chunk_*; do
    col -b < "$chunk" >> output.txt
done
rm chunk_*
```

### Integration with Text Processing Pipeline

#### Complex Text Processing
```bash
# Multi-stage text processing pipeline
cat input.txt | col -b | fmt -w 80 | sed 's/  */ /g' > final.txt

# Combine with other text utilities
grep "pattern" large_file.txt | col -b | sort | uniq > results.txt

# Process and reformat text
col -x < input.txt | pr -t -o 5 | lpr
```

#### Batch Processing
```bash
# Process multiple files
for file in *.txt; do
    col -b < "$file" > "clean_$file"
done

# Recursive processing
find . -name "*.log" -exec col -b < {} > {}.clean \;

# Parallel processing
for file in *.txt; do
    col -b < "$file" > "clean_$file" &
done
wait
```

## Special Operations

### Working with Specific Formats

#### Nroff/Troff Output
```bash
# Process nroff output
nroff document.ms | col -b > document.txt

# Handle troff formatting
troff -Tascii document.ms | col -f > clean_doc.txt

# Process man pages with special formatting
man -Tascii -P cat command | col -b > clean_man.txt
```

#### Terminal Emulator Output
```bash
# Clean up terminal emulator output
col -b -f < terminal_dump.txt > readable_text.txt

# Process ANSI escape sequences
sed 's/\x1b\[[0-9;]*m//g' ansi_text.txt | col -b > clean.txt

# Handle VT100 formatting
col -p < vt100_output.txt > processed.txt
```

### Cross-Platform Compatibility

#### Windows Text Processing
```bash
# Convert Windows text files
tr -d '\r' < windows.txt | col -b > unix_clean.txt

# Process Windows command output
cmd.exe /c "dir /b" | col -b > dir_listing.txt

# Handle Windows line endings
dos2unix windows_file.txt | col -b > final_output.txt
```

#### International Text Processing
```bash
# Process UTF-8 text with control characters
iconv -f utf-8 -t utf-8 //IGNORE input.txt | col -b > clean.txt

# Handle mixed encoding text
file -bi mixed_text.txt
iconv -f detected_encoding -t utf-8 mixed_text.txt | col -b > output.txt
```

## Integration and Automation

### Shell Scripts

#### Text Cleaning Utility
```bash
#!/bin/bash
# Universal text cleaner with col

clean_text() {
    local input="$1"
    local output="${2:-${input%.txt}_clean.txt}"

    if [ ! -f "$input" ]; then
        echo "Error: Input file '$input' not found"
        return 1
    fi

    echo "Cleaning text file: $input"

    # Multiple cleaning stages
    col -b < "$input" | \
    tr -s '[:space:]' ' ' | \
    sed 's/^[[:space:]]*//;s/[[:space:]]*$//' > "$output"

    echo "Cleaned text saved to: $output"

    # Show statistics
    echo "Original size: $(wc -c < "$input") bytes"
    echo "Cleaned size: $(wc -c < "$output") bytes"
}

# Usage example
clean_text "$1" "$2"
```

#### Batch Document Processor
```bash
#!/bin/bash
# Batch document processor using col

process_documents() {
    local source_dir="$1"
    local target_dir="$2"

    mkdir -p "$target_dir"

    find "$source_dir" -name "*.txt" -type f | while read -r file; do
        basename=$(basename "$file")
        echo "Processing: $basename"

        # Clean and format document
        col -b -x < "$file" > "$target_dir/$basename"

        # Add header with processing info
        {
            echo "=== Processed by col on $(date) ==="
            echo "Original: $file"
            echo ""
            cat "$target_dir/$basename"
        } > "$target_dir/$basename.tmp"

        mv "$target_dir/$basename.tmp" "$target_dir/$basename"
    done

    echo "Processing complete. Output in: $target_dir"
}

# Usage
process_documents "$1" "$2"
```

### Monitoring and Maintenance

#### Log File Cleaner
```bash
#!/bin/bash
# Automated log file cleaning

clean_logs() {
    local log_dir="$1"
    local clean_dir="$2"
    local days_old="${3:-7}"

    mkdir -p "$clean_dir"

    find "$log_dir" -name "*.log" -mtime +$days_old | while read -r logfile; do
        filename=$(basename "$logfile")
        clean_file="$clean_dir/${filename%.log}_clean.log"

        echo "Cleaning log: $filename"

        # Clean log and add timestamp
        {
            echo "=== Log cleaned on $(date) ==="
            echo "Original: $logfile"
            echo "================================"
            col -b < "$logfile"
        } > "$clean_file"

        # Compress cleaned log
        gzip "$clean_file"
    done
}

# Daily log cleaning (for cron)
clean_logs "/var/log" "/archive/clean_logs" 30
```

## Troubleshooting

### Common Issues

#### Buffer Overflow
```bash
# Error: Input buffer overflow
# Solution: Increase buffer size
col -l 1000 < large_file.txt > output.txt

# Progressive processing for huge files
split -l 5000 huge_file.txt part_
for part in part_*; do
    col -b < "$part" >> final_output.txt
    rm "$part"
done
```

#### Character Encoding Issues
```bash
# Problem: Invalid multibyte sequences
# Solution: Clean encoding first
iconv -f utf-8 -t utf-8 //IGNORE input.txt | col -b > output.txt

# Handle mixed encoding files
file -bi problem_file.txt
# Determine encoding and convert appropriately
iconv -f detected_encoding -t utf-8 problem_file.txt | col -b > clean.txt
```

#### Memory Usage Problems
```bash
# Issue: High memory usage with large files
# Solution: Process in smaller chunks
awk 'NR%1000==0{print > "temp_"NR}{print > "temp_all"}' large_file.txt
for temp in temp_*; do
    col -b < "$temp" >> final_output.txt
    rm "$temp"
done
```

#### Performance Optimization
```bash
# Slow processing of many files
# Solution: Parallel processing
find . -name "*.txt" | xargs -P 4 -I {} sh -c 'col -b < "{}" > "clean_{}"'

# Optimize for SSD storage
col -b < file.txt > tmp.txt && mv tmp.txt final.txt
```

## Related Commands

- [`expand`](/docs/commands/file-management/expand) - Convert tabs to spaces
- [`unexpand`](/docs/commands/file-management/unexpand) - Convert spaces to tabs
- [`tr`](/docs/commands/file-management/tr) - Translate or delete characters
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`fmt`](/docs/commands/file-management/fmt) - Simple text formatter
- [`pr`](/docs/commands/file-management/pr) - Convert text files for printing
- [`iconv`](/docs/commands/file-management/iconv) - Convert text encoding

## Best Practices

1. **Always use `-b`** when processing man pages or terminal output to remove backspaces
2. **Use `-x`** when preparing text for printing or email to convert tabs to spaces
3. **Increase buffer size** with `-l` for very large files to prevent overflow errors
4. **Chain with other tools** like `tr`, `sed`, or `fmt` for comprehensive text cleaning
5. **Test with sample data** first when processing unknown file formats
6. **Backup original files** before batch processing operations
7. **Use appropriate encoding** conversion for international text processing
8. **Monitor memory usage** when processing very large files
9. **Consider parallel processing** for batch operations on multiple files
10. **Validate output** to ensure no text corruption during processing

## Performance Tips

1. **Buffer tuning**: Increase `-l` value for files with very long lines or many formatting characters
2. **Sequential processing**: Process files in a pipeline rather than creating intermediate files
3. **Memory efficiency**: Use streaming operations for large files instead of loading entire files
4. **Parallel operations**: Use `xargs -P` for processing multiple files simultaneously
5. **I/O optimization**: Process files on fast storage (SSD) for better performance
6. **Selective filtering**: Use specific options (`-b`, `-f`, `-p`) rather than all-purpose filtering
7. **Batch size**: Process files in manageable batches to avoid system overload
8. **Preprocessing**: Remove obvious garbage characters before running `col` for better efficiency
9. **Output buffering**: Redirect to files in the same filesystem to minimize I/O overhead
10. **Resource monitoring**: Use tools like `top` or `htop` to monitor resource usage during large operations

The `col` command is an essential tool for cleaning up formatted text, especially when dealing with legacy terminal output, man pages, or documents containing backspaces and control characters. Its ability to normalize text formatting makes it invaluable for text processing pipelines, document preparation, and system administration tasks involving text cleanup.