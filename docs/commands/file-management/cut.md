---
title: cut - Remove Sections from Lines
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cut - Remove Sections from Lines

The `cut` command extracts sections from each line of input files or standard input. It's commonly used to extract specific columns or character ranges from structured text data.

## Basic Syntax

```bash
cut OPTION... [FILE]...
```

## Common Options

### Selection Options

- `-b, --bytes=LIST` - Select only specific bytes
- `-c, --characters=LIST` - Select only specific characters
- `-f, --fields=LIST` - Select only specific fields

### Field Options

- `-d, --delimiter=DELIM` - Use DELIM instead of TAB for field delimiter
- `--complement` - Invert the selection (select everything except specified)
- `-s, --only-delimited` - Do not print lines without delimiters

### Output Options

- `--output-delimiter=STRING` - Use STRING as the output delimiter
- `-z, --zero-terminated` - Use NULL character as line delimiter

### Help Options

- `--help` - Display help message and exit
- `--version` - Output version information and exit

## List Format Specification

The LIST parameter can specify ranges in several formats:

- `N` - Single item (Nth byte, character, or field)
- `N-` - From Nth item to end of line
- `N-M` - From Nth through Mth item (inclusive)
- `-M` - From beginning through Mth item (inclusive)
- `N,M` - Multiple specific items (comma-separated)
- `N- M` - Multiple ranges (comma-separated, spaces are optional)

## Usage Examples

### Field Extraction

```bash
# Extract first field (default delimiter is TAB)
cut -f1 data.txt

# Extract specific fields (1st, 3rd, and 5th)
cut -f1,3,5 data.txt

# Extract range of fields (2nd through 4th)
cut -f2-4 data.txt

# Extract from 3rd field to end
cut -f3- data.txt

# Extract fields 1 through 3 and 5 through 7
cut -f1-3,5-7 data.txt
```

### Custom Delimiters

```bash
# Use comma as delimiter
cut -d',' -f2 data.csv

# Use colon as delimiter
cut -d':' -f1 /etc/passwd

# Use space as delimiter
cut -d' ' -f1-3 names.txt

# Use pipe as delimiter
cut -d'|' -f2,4 data.txt

# Use semicolon as delimiter
cut -d';' -f1,3-5 config.txt
```

### Character and Byte Extraction

```bash
# Extract first 10 characters
cut -c1-10 file.txt

# Extract characters 5 through 15
cut -c5-15 file.txt

# Extract characters from 20th to end
cut -c20- file.txt

# Extract specific characters (1st, 5th, 10th)
cut -c1,5,10 file.txt

# Extract first 100 bytes
cut -b1-100 file.txt
```

### Complementary Selection

```bash
# Extract all fields except the 2nd
cut -f2 --complement data.txt

# Extract all characters except first 5
cut -c1-5 --complement file.txt

# Extract all fields except 1st and 3rd
cut -f1,3 --complement data.txt
```

## Practical Examples

### System Administration

```bash
# Extract usernames from /etc/passwd
cut -d':' -f1 /etc/passwd

# Extract home directories
cut -d':' -f6 /etc/passwd

# Extract user IDs
cut -d':' -f3 /etc/passwd

# Get list of shells
cut -d':' -f7 /etc/passwd | sort | uniq -c

# Extract process names
ps aux | cut -d' ' -f11 | tail -n +2

# Extract IP addresses from log
cut -d' ' -f1 access_log.txt
```

### Log Analysis

```bash
# Extract timestamps from Apache logs
cut -d' ' -f4 access_log.txt | sed 's/\[//'

# Extract HTTP methods
cut -d'"' -f2 access_log.txt | cut -d' ' -f1

# Extract URLs from requests
cut -d'"' -f2 access_log.txt | cut -d' ' -f2

# Extract status codes
cut -d' ' -f9 access_log.txt

# Extract user agents
cut -d'"' -f6 access_log.txt
```

### CSV and Data Processing

```bash
# Extract specific columns from CSV
cut -d',' -f1,3,5 data.csv

# Get headers from CSV file
head -1 data.csv | cut -d',' -f1-

# Extract email domain names
cut -d'@' -f2 emails.txt

# Process configuration files
cut -d'=' -f1 config.txt

# Extract file extensions
ls -la | cut -d'.' -f2-
```

### Text Processing

```bash
# Extract first word from each line
cut -d' ' -f1 file.txt

# Extract last word from each line
rev file.txt | cut -d' ' -f1 | rev

# Extract first 3 characters of each line
cut -c1-3 file.txt

# Extract columns from fixed-width data
cut -c1-10,20-30,50-60 fixed_width.txt

# Remove first column from tab-delimited data
cut -f1 --complement tab_data.txt
```

## Advanced Usage

### Complex Field Extraction

```bash
# Extract username and shell from passwd
cut -d':' -f1,7 /etc/passwd

# Extract date and time from logs
cut -d'[' -f2 access_log.txt | cut -d']' -f1

# Extract coordinates from GPS data
cut -d',' -f2,3 gps_data.txt

# Multiple delimiters (requires preprocessing)
tr ',' '\t' < data.csv | cut -f2,3

# Extract nested fields (multiple cuts)
cut -d'"' -f2 access_log.txt | cut -d' ' -f1
```

### Data Transformation

```bash
# Reorder columns
cut -f3,1,2 data.txt

# Create new format from multiple fields
paste <(cut -f1 data.txt) <(cut -f3 data.txt)

# Extract and reformat dates
cut -d'-' -f1,2,3 dates.txt | tr '\n' ' '

# Create summary report
cut -f1,5 data.txt | tr '\t' ','

# Extract and format network information
ifconfig | grep 'inet ' | cut -d' ' -f2
```

### Integration with Other Commands

```bash
# Pipeline with sort and uniq
cut -d':' -f1 /etc/passwd | sort

# Count unique values in column
cut -d',' -f2 data.csv | sort | uniq -c

# Filter and extract
grep "ERROR" logfile.txt | cut -d' ' -f4- | sort | uniq -c

# Extract and calculate statistics
cut -f3 numbers.txt | awk '{sum+=$1} END {print sum/NR}'

# Extract and process
cut -d':' -f3 /etc/passwd | sort -n
```

## Special Cases and Workarounds

### Handling Variable Width Fields

```bash
# Extract fields separated by multiple spaces
tr -s ' ' '\t' < file.txt | cut -f2

# Extract last field (field number unknown)
rev file.txt | cut -d' ' -f1 | rev

# Extract fields with awk for complex delimiters
awk -F'[[:space:]]+' '{print $2}' file.txt

# Handle CSV with quoted fields
csvcut -c 1,3 data.csv  # Using csvkit
```

### Multibyte Character Handling

```bash
# Handle UTF-8 characters properly
LC_ALL=en_US.UTF-8 cut -c1-10 file.txt

# Extract characters respecting multibyte encoding
cut -c1-20 unicode_file.txt

# Skip N bytes vs N characters
cut -b1-10 file.txt    # Bytes
cut -c1-10 file.txt    # Characters
```

## Performance Considerations

```bash
# For large files, use appropriate buffering
cut -f1 large_file.txt | buffer -o 1000000 > output.txt

# Process multiple files efficiently
cut -f1 *.txt > all_first_columns.txt

# Use temporary files for complex operations
cut -f1,3 data.txt > temp.txt
cut -f2 data.txt | paste temp.txt - > final.txt
```

## Real-World Applications

### Data Migration

```bash
# Extract specific columns for database import
cut -d',' -f1,2,4 source.csv > import_ready.csv

# Transform data format for legacy systems
cut -d'|' -f1,3,5 old_format.txt | tr '|' ',' > new_format.csv

# Extract user data for migration
cut -d':' -f1,5,6 /etc/passwd > user_migration.csv
```

### Report Generation

```bash
# Create summary report from logs
cut -d' ' -f1,9 access_log.txt | sort | uniq -c > status_report.txt

# Extract key metrics from monitoring data
cut -d',' -f1,3,5 metrics.csv > report_data.csv

# Generate inventory report
ls -la | cut -d' ' -f9,5 > file_inventory.txt
```

### Configuration Processing

```bash
# Extract server names from config
grep -v '^#' config.txt | cut -d'=' -f1

# Get enabled features from configuration
cut -d':' -f2 features.txt | grep -v '^#'

# Extract IP addresses from hosts file
cut -f1 /etc/hosts | grep -v '^#'
```

## Related Commands

- [`awk`](/docs/commands/text-processing/awk) - More powerful field processing
- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files
- [`paste`](/docs/commands/text-processing/paste) - Merge lines of files
- [`join`](/docs/commands/text-processing/join) - Join lines of two files
- [`tr`](/docs/commands/text-processing/tr) - Translate or delete characters
- [`column`](/docs/commands/text-processing/column) - Columnate data

## Best Practices

1. **Use appropriate delimiters** for your data format
2. **Combine with other tools** for complex data processing
3. **Handle edge cases** like empty fields or inconsistent delimiters
4. **Use `--complement`** for easier exclusion logic
5. **Consider alternatives** like `awk` for complex field extraction
6. **Test on sample data** before processing large files

## Common Pitfalls

### Field Numbering Issues

```bash
# Common mistake: fields are 1-indexed, not 0-indexed
cut -f0 data.txt  # WRONG - no field 0
cut -f1 data.txt  # CORRECT - first field

# Empty fields with consecutive delimiters
echo "a,,c" | cut -d',' -f2  # Returns empty field
echo "a,,c" | cut -d',' -f3  # Returns 'c'
```

### Whitespace Handling

```bash
# Multiple spaces as delimiters
echo "a   b   c" | cut -d' ' -f2  # May not work as expected
tr -s ' ' '\t' | cut -f2           # Better approach

# Leading/trailing whitespace
sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | cut -f1
```

The `cut` command is simple but powerful for basic field extraction. While it has limitations compared to more advanced tools like `awk`, it's perfect for quick column extraction from structured text files and is an essential tool in the Unix text processing toolkit.