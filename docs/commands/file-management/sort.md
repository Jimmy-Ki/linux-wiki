---
title: sort - Sort Lines of Text Files
sidebar_label: sort
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sort - Sort Lines of Text Files

The `sort` command is a powerful utility that sorts the contents of text files line by line using various sorting algorithms and criteria. It's an essential tool for data processing, log analysis, system administration, and text manipulation tasks. The sort command supports multiple sorting methods including alphabetical, numerical, human-readable numeric sorting, version sorting, and complex field-based sorting with customizable delimiters. It can handle extremely large files efficiently using temporary storage and parallel processing capabilities.

## Basic Syntax

```bash
sort [OPTION]... [FILE]...
sort [OPTION]... --files0-from=F
```

## Sorting Options

### Basic Sorting Control
- `-b, --ignore-leading-blanks` - Ignore leading blank space when determining sort keys
- `-f, --ignore-case` - Fold lowercase characters to uppercase for sorting
- `-i, --ignore-nonprinting` - Consider only printable characters for sorting
- `-n, --numeric-sort` - Compare according to string numeric value (handles integers)
- `-g, --general-numeric-sort` - Compare according to general numeric value (handles floating point, scientific notation)
- `-h, --human-numeric-sort` - Compare human-readable numbers (1K, 2M, 3G, etc.)
- `-V, --version-sort` - Natural sort of version numbers within text
- `-r, --reverse` - Reverse the result of comparisons (descending order)
- `-R, --random-sort` - Random shuffle, but group identical keys
- `--random-source=FILE` - Get random bytes from FILE

### Special Sorting Modes
- `-d, --dictionary-order` - Consider only blanks, alphanumeric characters for sorting
- `-M, --month-sort` - Sort by month name (JAN < FEB < ... < DEC)
- `--sort=WORD` - Specify sorting method: general-numeric, human-numeric, month, numeric, random, version

## Field and Key Options

### Field Delimiters and Keys
- `-t, --field-separator=SEP` - Use SEP as field separator instead of tab
- `-k, --key=KEYDEF` - Sort by a specific key/field definition
- `--debug` - Annotate the part of the line used for sorting and send warnings to stderr

### Key Definition Format
The KEYDEF format is: `F[.C][OPTS][,F[.C][OPTS]]`
- `F` = Field number (starting from 1)
- `C` = Character position within field (starting from 1)
- `OPTS` = Modifier options (b, d, f, g, i, M, n, r, V)

## Output and Processing Options

### Output Control
- `-o, --output=FILE` - Write result to FILE instead of standard output
- `-u, --unique` - Output only the first of an equal run of lines (unique lines)
- `-m, --merge` - Merge already sorted files without additional sorting
- `-c, --check, --check=diagnose-first` - Check for sorted input without sorting
- `-C, --check=quiet, --check=silent` - Like -c, but don't report first unsorted line

### Performance and Memory Options
- `-S, --buffer-size=SIZE` - Use SIZE for main memory buffer
- `-T, --temporary-directory=DIR` - Use DIR for temporary files instead of $TMPDIR
- `--parallel=N` - Change the number of sorts run concurrently to N
- `--compress-program=PROG` - Compress temporary files with PROG
- `--batch-size=NM` - Merge at most NM files at a time

### Other Options
- `-s, --stable` - Disable last-resort comparison to maintain original order for equal keys
- `-z, --zero-terminated` - End lines with 0 byte, not newline
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Sorting Operations

#### Simple Text Sorting
```bash
# Sort a file alphabetically (default behavior)
sort names.txt

# Sort input from stdin
echo -e "banana\napple\ncherry" | sort

# Sort multiple files and merge results
sort file1.txt file2.txt > merged_sorted.txt

# Sort and save to a file
sort -o sorted_names.txt names.txt
```

#### Case-Insensitive Sorting
```bash
# Sort ignoring case differences
sort -f mixed_case.txt

# Case-sensitive sort (default)
sort mixed_case.txt

# Dictionary order (only letters, numbers, and spaces)
sort -d special_chars.txt

# Ignore non-printable characters
sort -i binary_data.txt
```

### Numeric Sorting

#### Integer and General Numeric Sorting
```bash
# Sort numbers numerically (not alphabetically)
printf "10\n2\n100\n25\n" | sort -n

# Sort in reverse numerical order
sort -nr numbers.txt

# Sort floating point numbers and scientific notation
echo -e "1.5e2\n3.2e1\n4.1e3\n2.8" | sort -g

# Sort with general numeric comparison
sort -g measurements.txt

# Example of numeric vs alphabetical sorting
echo -e "10\n2\n100" | sort    # Alphabetical: 10, 100, 2
echo -e "10\n2\n100" | sort -n # Numerical: 2, 10, 100
```

#### Human-Readable Size Sorting
```bash
# Sort file sizes in human-readable format
du -h /var/log | sort -hr

# Sort disk usage by size (largest first)
du -sh /* | sort -hr

# Sort memory usage
ps aux --sort=-%mem | head -10

# Sort with human-readable sizes
echo -e "1K\n10M\n2G\n500K" | sort -hr
```

### Field-Based Sorting

#### Single Field Sorting
```bash
# Sort CSV file by second column (numeric)
sort -t',' -k2n sales_data.csv

# Sort passwd file by UID (third field, numeric)
sort -t':' -k3n /etc/passwd

# Sort by first field only
sort -k1,1 addresses.txt

# Sort starting from character position 5
sort -k1.5 file.txt
```

#### Multiple Field Sorting
```bash
# Sort by last name, then first name
sort -t',' -k2,2 -k1,1 names.csv

# Sort log files by date, then time, then IP
sort -t' ' -k4,4 -k5,5 -k1,1 access.log

# Complex multi-field sorting with different options
sort -t'|' -k3,3n -k1,1f -k2,2r data.txt

# Sort students by grade (descending), then by name (ascending)
sort -t',' -k3nr -k1,1 students.csv
```

#### Advanced Field Selection
```bash
# Sort by second field, starting from 3rd character
sort -k2.3 file.txt

# Sort by character positions 5-10 of first field only
sort -k1.5,1.10 file.txt

# Sort by range of fields (fields 2 through 4)
sort -k2,4 file.txt

# Complex key with multiple options
sort -t: -k1,1f -k2n -k3.2,3.5V file.txt
```

### Specialized Sorting

#### Version Number Sorting
```bash
# Sort version numbers naturally
echo -e "version-2.10\nversion-2.2\nversion-2.1" | sort -V

# Sort software versions
sort -V versions.txt

# Sort mixed version strings
printf "1.9.1\n1.10.2\n1.2.3\n2.0.0\n" | sort -V
```

#### Month and Date Sorting
```bash
# Sort by month names
echo -e "March\nJanuary\nDecember\nFebruary" | sort -M

# Sort log entries by month
sort -M -k4,4 monthly_logs.txt

# Custom date sorting (YYYY-MM-DD format - works with default)
sort dates.txt

# Complex date field sorting
sort -t' ' -k3M -k2n -k1n dates_with_months.txt
```

#### Random Shuffling
```bash
# Random shuffle lines (maintaining groups)
sort -R list.txt

# Random shuffle with specific random source
sort -R --random-source=/dev/urandom names.txt

# Create random sample
sort -R data.txt | head -100
```

### Data Processing and Analysis

#### Unique Sorting and Deduplication
```bash
# Remove duplicate lines after sorting
sort -u file.txt

# Same as: sort file.txt | uniq
sort -u input.txt

# Sort and remove duplicates from multiple files
sort -u file1.txt file2.txt

# Stable sort to maintain original order for equal keys
sort -s file.txt

# Find unique entries in data
cut -d',' -f1 data.csv | sort -u
```

#### Checking Sorted Order
```bash
# Check if file is already sorted
sort -c file.txt

# Quiet check (no output if sorted)
sort -C file.txt

# Check and report first unsorted line
sort -c unsorted_file.txt

# Check multiple files
sort -c file1.txt && echo "file1 is sorted" || echo "file1 is not sorted"
```

## Practical Examples

### System Administration

#### Log File Analysis
```bash
# Sort Apache access logs by IP address
sort -k1 access_log.txt

# Sort by HTTP status code (field 9)
sort -k9n access_log.txt

# Sort by response size (field 10, numeric)
sort -k10n access_log.txt | tail -10  # Largest files

# Sort by date and time (fields 4-5)
sort -k4,4 -k5,5 access_log.txt

# Sort nginx logs by response time
awk '{print $NF, $0}' access.log | sort -n | cut -d' ' -f2-

# Sort error logs by frequency
awk '{print $1}' error_log.txt | sort | uniq -c | sort -nr
```

#### Process and System Management
```bash
# Sort process list by CPU usage
ps aux | sort -k3nr

# Sort processes by memory usage
ps aux | sort -k4nr

# Sort process list by PID
ps aux | sort -k2n

# Sort network connections by local port
netstat -tuln | sort -k4n

# Sort open files by user
lsof | awk '{print $3}' | sort | uniq -c | sort -nr

# Sort disk usage by size
du -ah /home | sort -hr | head -20
```

#### User and Permission Management
```bash
# Sort /etc/passwd by UID
sort -t':' -k3n /etc/passwd

# Sort users by shell
sort -t':' -k7 /etc/passwd

# Sort groups by GID
sort -t':' -k3n /etc/group

# Sort sudo users
grep -v '^#' /etc/sudoers | sort

# Sort cron jobs by time
cut -d' ' -f1-5 /etc/crontab | sort
```

### Data Processing and Analysis

#### CSV and Tabular Data Processing
```bash
# Sort sales data by amount (column 3, numeric)
sort -t',' -k3n sales.csv

# Sort by multiple columns: region (1), then sales (3, descending)
sort -t',' -k1,1 -k3nr sales.csv

# Sort employee data by department, then salary (descending)
sort -t'|' -k3,3 -k5nr employees.txt

# Sort and find top performers
sort -t',' -k3nr scores.csv | head -10

# Sort students by grade and name
awk -F',' 'NR>1 {print $3, $1, $2}' grades.csv | sort -nr
```

#### Text Analysis and Statistics
```bash
# Count word frequencies and sort by frequency
cat document.txt | tr '[:space:]' '\n' | sort | uniq -c | sort -nr

# Find most common IPs in access log
cut -d' ' -f1 access_log.txt | sort | uniq -c | sort -nr | head -10

# Sort lines by length
awk '{print length(), $0}' file.txt | sort -n | cut -d' ' -f2-

# Sort words alphabetically for dictionary
tr '[:space:]' '\n' < text.txt | sort | uniq > dictionary.txt

# Analyze character frequency
fold -w1 file.txt | sort | uniq -c | sort -nr
```

#### Network and Security Analysis
```bash
# Sort IP addresses numerically
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ip_list.txt

# Sort firewall rules by port number
iptables-save | grep -E '^\-A' | sort -k4n

# Sort failed login attempts by IP
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr

# Sort SSL certificates by expiration date
openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Development and Programming

#### Code Analysis
```bash
# Sort import statements alphabetically
grep "^import\|^from" *.py | sort

# Sort function definitions by name
grep -n "^def" *.py | sort -k2

# Sort Git commits by date
git log --format="%ad %s" --date=short | sort

# Sort file sizes in project
find . -type f -exec ls -la {} + | sort -k5n

# Sort dependencies by package name
cat requirements.txt | sort
```

#### Configuration Management
```bash
# Sort configuration files for comparison
sort config.txt > sorted_config.txt

# Sort and deduplicate host lists
sort -u hosts.txt > unique_hosts.txt

# Sort environment variables
printenv | sort

# Sort package lists
apt list --installed | awk -F'/' '{print $1}' | sort > packages.txt

# Sort DNS records
dig example.com ANY +short | sort
```

## Advanced Usage

### Performance Optimization

#### Large File Processing
```bash
# Use specific buffer size for large files
sort -S 1G huge_file.txt

# Use custom temporary directory
sort -T /var/tmp large_file.txt

# Parallel processing for multi-core systems
sort --parallel=8 large_dataset.txt

# Use compression for temporary files
sort --compress-program=gzip large_file.txt

# Monitor sort progress
sort huge_file.txt | pv > sorted_output.txt
```

#### Memory Management
```bash
# Use percentage of available memory
sort -S 50% large_file.txt

# Set specific memory limit
sort -S 500M data.txt

# Create temporary directory with more space
mkdir /tmp/sort_temp
sort -T /tmp/sort_temp huge_file.txt

# Use external merge sort for very large files
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do sort "$chunk" > "sorted_$chunk"; done
sort -m sorted_chunk_* > final_sorted.txt
```

### Complex Data Transformations

#### Multi-step Processing Pipelines
```bash
# Complex log analysis pipeline
cat access.log | \
    awk '{print $1, $7, $10}' | \
    sort -k1,1 -k2,2 | \
    uniq -c | \
    sort -nr > analysis.txt

# Sort and extract top N from multiple categories
cut -d',' -f1,3 data.csv | sort | uniq -c | sort -nr | head -20

# Generate sorted frequency table
cat words.txt | sort | uniq -c | awk '{print $2, $1}' | sort -k2nr
```

#### Custom Sorting Algorithms
```bash
# Sort by custom pattern (extract numeric part)
awk -F'[-]' '{print $2, $0}' version-list.txt | sort -n | cut -d' ' -f2-

# Sort by embedded timestamp
awk '{print substr($0,1,8), $0}' timestamps.txt | sort | cut -d' ' -f2-

# Sort by line length and then alphabetically
awk '{print length(), $0}' file.txt | sort -k1,1n -k2,2 | cut -d' ' -f2-
```

## Integration and Automation

### Shell Scripts

#### Automated Data Processing Script
```bash
#!/bin/bash
# Advanced log analysis and sorting

INPUT_DIR="/var/log"
OUTPUT_DIR="/reports"
DATE=$(date +%Y%m%d)

# Process Apache access logs
if [ -f "$INPUT_DIR/access.log" ]; then
    echo "Processing Apache access logs..."

    # Sort by IP address and count requests
    awk '{print $1}' "$INPUT_DIR/access.log" | \
        sort | uniq -c | sort -nr > "$OUTPUT_DIR/ip_stats_$DATE.txt"

    # Sort by response size
    awk '{print $10, $7}' "$INPUT_DIR/access.log" | \
        sort -nr | head -100 > "$OUTPUT_DIR/largest_files_$DATE.txt"

    # Sort by HTTP status code
    awk '{print $9}' "$INPUT_DIR/access.log" | \
        sort | uniq -c | sort -nr > "$OUTPUT_DIR/status_codes_$DATE.txt"
fi

# Sort system users by various criteria
echo "Sorting user information..."
sort -t':' -k3n /etc/passwd > "$OUTPUT_DIR/users_by_uid_$DATE.txt"
sort -t':' -k1,1 /etc/passwd > "$OUTPUT_DIR/users_alphabetical_$DATE.txt"

echo "Report generation complete: $OUTPUT_DIR"
```

#### File Organization Script
```bash
#!/bin/bash
# Automatic file sorting and organization

SOURCE_DIR="$1"
TARGET_DIR="$2"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <target_directory>"
    exit 1
fi

# Create target directories
mkdir -p "$TARGET_DIR"/{small,medium,large}

# Sort files by size
find "$SOURCE_DIR" -type f -exec ls -la {} + | \
    sort -k5n | \
    while read -r line; do
        size=$(echo "$line" | awk '{print $5}')
        filename=$(echo "$line" | awk '{print $9}')

        if [ "$size" -lt 1024 ]; then
            cp "$filename" "$TARGET_DIR/small/"
        elif [ "$size" -lt 1048576 ]; then
            cp "$filename" "$TARGET_DIR/medium/"
        else
            cp "$filename" "$TARGET_DIR/large/"
        fi
    done

echo "Files sorted and organized in $TARGET_DIR"
```

## Troubleshooting

### Common Issues

#### Memory Problems
```bash
# Out of memory errors
# Solution: Reduce buffer size or use temporary directory
sort -S 100M large_file.txt

# Use disk-based sorting
sort -T /var/tmp huge_file.txt

# Split and merge approach
split -l 500000 huge_file.txt part_
for file in part_*; do sort "$file" > "sorted_$file"; done
sort -m sorted_part_* > final_sorted.txt
```

#### Locale and Character Encoding Issues
```bash
# Use C locale for consistent sorting
LC_ALL=C sort file.txt

# Ignore locale for faster numeric sorting
LC_ALL=C sort -n numbers.txt

# Handle UTF-8 properly
LANG=en_US.UTF-8 sort unicode_file.txt

# Force specific collation order
LANG=C sort -f mixed_case.txt
```

#### Field Separation Problems
```bash
# Tab-separated data
sort -t$'\t' -k2n tab_data.txt

# Multiple spaces as delimiter
tr -s ' ' ' ' < file.txt | sort -k2n

# Complex delimiter handling
awk -F'[:[:space:]]+' '{print $2, $0}' file.txt | sort -k1n | cut -d' ' -f2-

# CSV with quoted fields
csvtool -t input.csv | sort -k2n | csvtool -u > sorted.csv
```

#### Performance Optimization Issues
```bash
# Slow sorting on large files
# Use parallel processing
sort --parallel=4 large_file.txt

# Optimize memory usage
sort -S 50% file.txt

# Use stable sorting when needed
sort -s file.txt

# Test different buffer sizes
time sort -S 100M file.txt
time sort -S 500M file.txt
time sort -S 1G file.txt
```

## Related Commands

- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines from sorted files
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from each line of files
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing language
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for filtering and transforming text
- [`join`](/docs/commands/text-processing/join) - Join lines of two files on a common field
- [`paste`](/docs/commands/text-processing/paste) - Merge lines of files
- [`wc`](/docs/commands/text-processing/wc) - Count lines, words, and characters in files
- [`grep`](/docs/commands/file-management/grep) - Search text patterns in files
- [`head`](/docs/commands/file-management/head) - Output the first part of files
- [`tail`](/docs/commands/file-management/tail) - Output the last part of files

## Best Practices

1. **Choose appropriate sorting type** - Use `-n` for integers, `-g` for floating-point numbers, `-h` for human-readable sizes
2. **Specify field separators explicitly** - Use `-t` for non-tab delimited data to avoid ambiguity
3. **Use `-u` for unique output** instead of piping to `uniq` when possible for better performance
4. **Consider `-S` for large files** to manage memory usage and avoid swapping
5. **Use `-c` first** to check if files are already sorted before processing
6. **Leverage parallel processing** with `--parallel` on multi-core systems
7. **Use stable sorting** (`-s`) when maintaining original order for equal keys is important
8. **Specify temporary directory** with `-T` when dealing with large datasets
9. **Combine with other tools** for powerful data processing pipelines
10. **Test with small samples** before processing very large files

## Performance Tips

1. **Numeric sorting** (`-n`, `-g`) is faster than alphabetic sorting for numeric data
2. **Human-readable sorting** (`-h`) is slower than numeric sorting but more user-friendly
3. **Parallel sorting** significantly improves performance on multi-core systems
4. **Larger buffer sizes** improve performance but use more memory
5. **Version sorting** (`-V`) is more computationally intensive than standard sorting
6. **Stable sorting** (`-s`) has minimal performance overhead
7. **Locale-independent sorting** (`LC_ALL=C`) is faster than locale-aware sorting
8. **Field-based sorting** is more efficient than using external tools like `awk` or `cut`
9. **Merge sorting** (`-m`) is much faster than re-sorting already sorted files
10. **Temporary directory selection** on faster storage improves performance for large files

The `sort` command is a fundamental and powerful tool for text processing and data manipulation. Its extensive options for field-based sorting, multiple numeric formats, and performance optimization make it indispensable for system administration, log analysis, data processing, and text manipulation tasks. Mastering the sort command enables efficient handling of large datasets and creation of sophisticated data processing pipelines.