---
title: sort - Sort Lines of Text Files
sidebar_label: sort
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sort - Sort Lines of Text Files

The `sort` command sorts the contents of text files line by line. It's an essential tool for organizing data, preparing files for further processing, and performing basic data analysis tasks.

## Basic Syntax

```bash
sort [OPTION]... [FILE]...
sort [OPTION]... --files0-from=F
```

## Common Options

### Sorting Options

- `-b, --ignore-leading-blanks` - Ignore leading whitespace
- `-d, --dictionary-order` - Consider only blanks, letters, and digits
- `-f, --ignore-case` - Fold lowercase to uppercase for sorting
- `-g, --general-numeric-sort` - Compare according to general numeric value
- `-h, --human-numeric-sort` - Compare human-readable numbers (e.g., 2K, 1G)
- `-i, --ignore-nonprinting` - Consider only printable characters
- `-M, --month-sort` - Sort by month name (JAN, FEB, etc.)
- `-n, --numeric-sort` - Compare according to string numerical value
- `-r, --reverse` - Reverse the result of comparisons
- `-V, --version-sort` - Natural sort of (version) numbers within text
- `-R, --random-sort` - Shuffle, but group identical keys

### Field and Key Options

- `-k, --key=KEYDEF` - Sort by a specific key (field)
- `-t, --field-separator=SEP` - Use SEP as the field separator
- `--debug` - Annotate the part of the line used for sorting

### Output Options

- `-o, --output=FILE` - Write result to FILE instead of standard output
- `-u, --unique` - Output only unique lines (after sorting)
- `-c, --check` - Check for sorted input without sorting
- `-C, --check=quiet` - Like -c, but don't report first unsorted line

### Other Options

- `-m, --merge` - Merge already sorted files
- `-s, --stable` - Disable last-resort comparison
- `-z, --zero-terminated` - End lines with 0 byte, not newline
- `-S, --buffer-size=SIZE` - Use SIZE for main memory buffer
- `-T, --temporary-directory=DIR` - Use DIR for temporary files

## Usage Examples

### Basic Sorting

```bash
# Sort a file alphabetically
sort names.txt

# Sort input from stdin
echo -e "banana\napple\ncherry" | sort

# Sort multiple files and merge results
sort file1.txt file2.txt > merged_sorted.txt
```

### Numeric Sorting

```bash
# Sort numbers numerically (not alphabetically)
sort -n numbers.txt

# Sort in reverse order
sort -nr numbers.txt

# Sort human-readable sizes
du -h | sort -hr

# General numeric sorting for scientific notation
echo -e "1.5e2\n3.2e1\n4.1e3" | sort -g
```

### Field-based Sorting

```bash
# Sort CSV file by second column (numeric)
sort -t, -k2n data.csv

# Sort by multiple keys
sort -t: -k1,1 -k2n /etc/passwd

# Sort by specific character positions
sort -k1.2,1.5 file.txt
```

### Advanced Sorting Techniques

```bash
# Sort and remove duplicates
sort -u file.txt

# Check if file is already sorted
sort -c file.txt
sort -C file.txt

# Stable sort (preserve original order for equal keys)
sort -s file.txt

# Random shuffle (maintaining groups)
sort -R file.txt
```

## Practical Examples

### Data Processing

```bash
# Sort log files by timestamp
sort access_log.txt

# Process CSV data - sort by population, then by name
sort -t',' -k3n -k1 cities.csv

# Sort configuration files
sort -o sorted_config.txt config.txt

# Find unique entries in data
sort data.txt | uniq

# Count occurrences and sort by frequency
sort data.txt | uniq -c | sort -nr
```

### System Administration

```bash
# Sort process list by CPU usage
ps aux | sort -k3nr

# Sort files by size
ls -la | sort -k5n

# Sort disk usage results
du -sh /* | sort -hr

# Sort network connections by local port
netstat -tuln | sort -k4n
```

### Text Analysis

```bash
# Sort words alphabetically
tr '[:space:]' '\n' < document.txt | sort | uniq

# Find most common words
tr '[:space:]' '\n' < document.txt | sort | uniq -c | sort -nr

# Sort lines by length (awk + sort)
awk '{print length(), $0}' file.txt | sort -n | cut -d' ' -f2-

# Sort IPv4 addresses
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ip_addresses.txt
```

### Complex Data Transformations

```bash
# Sort students by grade, then by name
sort -t',' -k3nr -k1 students.csv

# Sort dates in YYYY-MM-DD format
sort dates.txt

# Sort mixed alphanumeric codes
sort -V version_numbers.txt

# Sort by multiple custom criteria
sort -t'|' -k2,2n -k1,1 -k3,3r complex_data.txt
```

## Key Definition Format

The `-k` option uses the format: `F[.C][OPTS][,F[.C][OPTS]]`

Where:
- `F` = Field number (starting from 1)
- `C` = Character position within field (starting from 1)
- `OPTS` = Modifier options (b, d, f, g, i, M, n, r, V)

### Key Examples

```bash
# Sort by second field, starting from 3rd character
sort -k2.3 file.txt

# Sort by first field (ignore case), then second field (numeric)
sort -k1f -k2n file.txt

# Sort by character positions 5-10 only
sort -k1.5,1.10 file.txt

# Complex multi-field sorting
sort -t: -k1,1 -k2n -k3.2,3.5 file.txt
```

## File Size Specifications

For options like `-S`, size can be specified with:
- `%` - Percentage of memory (1%, 15%, etc.)
- `b` - Bytes (default)
- `K` - Kilobytes (1024 bytes)
- `M` - Megabytes
- `G` - Gigabytes
- `T` - Terabytes

```bash
# Use 100MB buffer for sorting
sort -S 100M large_file.txt

# Use 10% of available memory
sort -S 10% huge_dataset.txt
```

## Performance Considerations

```bash
# Use temporary directory with more space
export TMPDIR=/var/tmp
sort huge_file.txt

# Merge pre-sorted files (faster for very large datasets)
sort -m sorted_part1.txt sorted_part2.txt sorted_part3.txt

# Parallel sorting for multi-core systems
sort --parallel=4 large_file.txt

# Use compression for temporary files
sort --compress-program=gzip large_file.txt
```

## Common Use Cases

### Log Analysis

```bash
# Sort Apache access logs by IP address
sort -k1 access_log.txt

# Sort by HTTP status code
sort -k9 access_log.txt

# Sort by response size
sort -k10n access_log.txt

# Sort by date and time
sort -k4,4 access_log.txt
```

### Database Export Processing

```bash
# Sort CSV export by primary key
sort -t, -k1n database_export.csv

# Sort by multiple columns for data import
sort -t',' -k3,3 -k1,1 -k2,2 data_import.csv
```

### Configuration Management

```bash
# Sort configuration files for comparison
sort config.txt > sorted_config.txt

# Sort and deduplicate host lists
sort -u hosts.txt > unique_hosts.txt

# Sort package lists alphabetically
sort packages.txt > sorted_packages.txt
```

## Related Commands

- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for filtering text
- [`join`](/docs/commands/text-processing/join) - Join lines of two files
- [`paste`](/docs/commands/text-processing/paste) - Merge lines of files

## Best Practices

1. **Use appropriate sorting type** - Use `-n` for numbers, `-h` for human-readable sizes
2. **Specify field separators explicitly** - Use `-t` for non-tab delimited data
3. **Use `-u` for unique output** instead of piping to `uniq` when possible
4. **Consider `-S` for large files** to manage memory usage
5. **Use `-c` first** to check if files are already sorted
6. **Combine with other tools** for powerful data processing pipelines

## Troubleshooting

### Memory Issues

```bash
# For very large files, use temporary directory with more space
sort -T /var/tmp huge_file.txt

# Reduce memory usage
sort -S 50M large_file.txt

# Use merge sorting approach
split -l 1000000 huge_file.txt part_
for f in part_*; do sort "$f" > "sorted_$f"; done
sort -m sorted_* > final_sorted.txt
```

### Locale Issues

```bash
# Use C locale for consistent sorting behavior
LC_ALL=C sort file.txt

# Ignore locale for speed
LC_ALL=C sort -n numbers.txt
```

### Complex Field Parsing

```bash
# Sort by the third column of pipe-delimited data
sort -t'|' -k3 file.txt

# Sort by date in YYYY-MM-DD format
sort -k1,1 dates.txt

# Sort by custom pattern (requires preprocessing)
awk -F'[:]' '{print $2, $0}' file.txt | sort -k1n | cut -d' ' -f2-
```

The `sort` command is a fundamental tool for text processing and data manipulation. Mastering its various options and combinations with other Unix tools enables powerful data processing workflows for system administration, log analysis, and general text manipulation tasks.