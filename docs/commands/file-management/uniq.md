---
title: uniq - Report or Omit Repeated Lines
sidebar_label: uniq
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# uniq - Report or Omit Repeated Lines

The `uniq` command filters adjacent duplicate lines from input. It's commonly used to remove duplicate entries, count occurrences, and analyze data patterns in sorted files.

## Basic Syntax

```bash
uniq [OPTION]... [INPUT [OUTPUT]]
```

## Common Options

### Filtering Options

- `-c, --count` - Prefix lines by the number of occurrences
- `-d, --repeated` - Only print duplicate lines, one for each group
- `-D, --all-repeated[=METHOD]` - Print all duplicate lines
- `-u, --unique` - Only print unique lines

### Comparison Options

- `-i, --ignore-case` - Ignore differences in case when comparing
- `-s, --skip-chars=N` - Skip N characters at start of line
- `-w, --check-chars=N` - Compare only first N characters
- `-f, --skip-fields=N` - Skip N fields at start of line

### Grouping Options

- `--group[=METHOD]` - Show all lines with empty lines separating groups
  - `separate` - Separate groups with empty lines (default)
  - `prepend` - Prepend empty line to each group
  - `append` - Append empty line to each group
  - `both` - Prepend and append empty lines

### Output Options

- `--all-repeated[=METHOD]` - Like `-D`, but allow separating with empty lines
- `-z, --zero-terminated` - Use NULL character as line delimiter

### Help Options

- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Duplicate Removal

```bash
# Remove adjacent duplicate lines
uniq data.txt

# Remove duplicates from unsorted file (sort first)
sort data.txt | uniq

# Alternative to sort -u
sort -u data.txt

# Remove duplicates and save to file
sort data.txt | uniq > unique_data.txt
```

### Counting Occurrences

```bash
# Count occurrences of each line
sort data.txt | uniq -c

# Sort by frequency (most common first)
sort data.txt | uniq -c | sort -nr

# Sort by frequency (least common first)
sort data.txt | uniq -c | sort -n

# Get top 10 most common entries
sort data.txt | uniq -c | sort -nr | head -10
```

### Filtering Specific Types

```bash
# Show only duplicate lines
sort data.txt | uniq -d

# Show only unique lines (no duplicates)
sort data.txt | uniq -u

# Show all duplicate entries
sort data.txt | uniq -D

# Show all duplicates separated by empty lines
sort data.txt | uniq -D --group=separate
```

### Case-Insensitive Processing

```bash
# Remove case-insensitive duplicates
sort -f data.txt | uniq -i

# Count case-insensitive occurrences
sort -f data.txt | uniq -ic

# Show case-insensitive duplicates only
sort -f data.txt | uniq -id
```

## Practical Examples

### Log Analysis

```bash
# Count requests per IP address
awk '{print $1}' access_log.txt | sort | uniq -c | sort -nr

# Find most accessed URLs
awk '{print $7}' access_log.txt | sort | uniq -c | sort -nr | head -10

# Count HTTP status codes
awk '{print $9}' access_log.txt | sort | uniq -c | sort -nr

# Identify suspicious repeated requests
awk '{print $1,$7}' access_log.txt | sort | uniq -c | sort -nr | head -20
```

### System Monitoring

```bash
# Count running processes by name
ps aux | awk '{print $11}' | sort | uniq -c | sort -nr

# Find users with most processes
ps aux | awk '{print $1}' | sort | uniq -c | sort -nr

# Monitor duplicate log entries
tail -f application.log | sort | uniq -c

# Check for duplicate cron jobs
crontab -l | sort | uniq -d
```

### File Processing

```bash
# Remove duplicate email addresses
sort emails.txt | uniq > unique_emails.txt

# Find duplicate files (by size)
find . -type f -exec ls -l {} \; | awk '{print $5}' | sort | uniq -d | while read size; do
    find . -type f -size "${size}c" -exec ls -l {} \;
done

# Deduplicate word list
tr '[:space:]' '\n' < document.txt | sort | uniq -c | sort -nr

# Find duplicate lines in configuration files
grep -v '^#' config.txt | sort | uniq -d
```

### Data Analysis

```bash
# Analyze survey responses
sort survey_responses.txt | uniq -c | sort -nr

# Count unique values in CSV column
cut -d',' -f3 data.csv | sort | uniq -c | sort -nr

# Remove duplicate records based on first field
sort -t',' -k1,1 data.csv | uniq

# Find repeated patterns
cut -d' ' -f1-3 log_file.txt | sort | uniq -c | sort -nr
```

## Advanced Usage

### Field-based Comparison

```bash
# Skip first field when comparing duplicates
uniq -f1 data.txt

# Skip first 2 fields and compare next 10 characters
uniq -f2 -w10 data.txt

# Skip first 5 characters of each line
uniq -s5 data.txt

# Compare only first 3 characters of each line
uniq -w3 data.txt
```

### Complex Data Processing

```bash
# Remove duplicates while preserving first occurrence order
awk '!seen[$0]++' file.txt

# Find duplicates in unsorted file without sorting
awk 'seen[$0]++ == 1' file.txt
awk 'seen[$0] == 1' file.txt

# Count duplicates in original order
awk '{count[$0]++} END {for (line in count) print count[line], line}' file.txt | sort -nr
```

### Grouping and Formatting

```bash
# Group duplicates with empty lines
sort data.txt | uniq --group=separate

# Group duplicates with headers
sort data.txt | uniq --group=prepend

# Show all duplicate entries in context
sort data.txt | uniq -D --group=both

# Create summary report
sort data.txt | uniq -c | awk '{printf "%-6s %s\n", $1, substr($0, 8)}'
```

## Real-World Scenarios

### Web Server Analysis

```bash
# Analyze user agents
awk -F'"' '{print $6}' access_log.txt | sort | uniq -c | sort -nr | head -10

# Find pages with most visits
awk '{print $7}' access_log.txt | sort | uniq -c | sort -nr | head -20

# Identify bots (high request rates)
awk '{print $1}' access_log.txt | sort | uniq -c | awk '$1 > 1000'

# Track error patterns
awk '$9 >= 400 {print $9}' access_log.txt | sort | uniq -c | sort -nr
```

### Database Analysis

```bash
# Analyze SQL query patterns
grep -i "^select" slow_query.log | awk '{print $1}' | sort | uniq -c | sort -nr

# Find duplicate records in CSV export
cut -d',' -f1 data_export.csv | sort | uniq -d

# Count records by category
cut -d',' -f2 data.csv | sort | uniq -c | sort -nr

# Data quality check for duplicates
awk -F, '{print $1,$2,$3}' database_export.csv | sort | uniq -d
```

### Configuration Management

```bash
# Find duplicate host entries
cat /etc/hosts | grep -v '^#' | sort | uniq -d

# Check for duplicate DNS records
dig +short example.com ALL | sort | uniq -d

# Validate unique usernames
cut -d':' -f1 /etc/passwd | sort | uniq -d

# Find duplicate package installations
dpkg -l | awk '{print $2}' | sort | uniq -d
```

## Performance Considerations

```bash
# For very large files, process in chunks
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do
    sort "$chunk" | uniq -c >> counts.txt
done

# Use temporary files for intermediate steps
sort huge_file.txt > sorted_file.txt
uniq -c sorted_file.txt > final_counts.txt

# Memory-efficient processing for limited RAM
sort -S 100M huge_file.txt | uniq -c > counts.txt
```

## Integration with Other Commands

### Common Pipeline Patterns

```bash
# Most common words in text
tr -cs '[:alnum:]' '\n' < document.txt | sort | uniq -c | sort -nr

# Top referring sites
awk '{print $11}' access_log.txt | sort | uniq -c | sort -nr | head -10

# File extension statistics
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -nr

# Process monitoring
ps aux | awk '{print $11}' | sort | uniq -c | sort -nr | head -20
```

### Complex Data Analysis

```bash
# Two-level analysis: count by category and item
awk -F',' '{print $1, $2}' data.csv | sort | uniq -c | sort -nr

# Time-based pattern analysis
awk '{print substr($4, 2, 11)}' access_log.txt | sort | uniq -c

# Size-based file analysis
find . -type f -exec ls -l {} \; | awk '{print int($5/1024)}' | sort | uniq -c
```

## Related Commands

- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`wc`](/docs/commands/text-processing/wc) - Count lines, words, and characters
- [`grep`](/docs/commands/text-processing/grep) - Search for patterns in files
- [`comm`](/docs/commands/text-processing/comm) - Compare sorted files line by line

## Best Practices

1. **Always sort first** when processing unsorted data to find all duplicates
2. **Use `-c` for counting** to understand data distribution
3. **Combine with `sort` pipelines** for powerful data analysis
4. **Consider field skipping** for structured data with headers
5. **Use case-insensitive option** when appropriate
6. **Process large files in chunks** to manage memory usage

## Troubleshooting

### Common Issues

```bash
# Not finding duplicates in unsorted data
# Solution: sort first
sort unsorted.txt | uniq -d

# Memory issues with very large files
# Solution: use temporary storage and process in chunks
sort -T /tmp large_file.txt | uniq -c

# Unexpected behavior with whitespace
# Solution: normalize whitespace first
sed 's/^[[:space:]]*//;s/[[:space:]]*$//' data.txt | sort | uniq

# Issues with special characters
# Solution: use locale settings
LC_ALL=C sort data.txt | uniq -c
```

The `uniq` command is essential for data cleanup, analysis, and pattern detection. When combined with `sort` and other Unix tools, it becomes a powerful component of text processing pipelines for system administration, log analysis, and data quality assurance.