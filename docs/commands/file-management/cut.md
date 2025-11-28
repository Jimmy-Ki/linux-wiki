---
title: cut - Remove Sections from Lines
sidebar_label: cut
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cut - Remove Sections from Lines

The `cut` command is a powerful text processing utility that extracts sections from each line of input files or standard input. It operates on three main modes: byte extraction (-b), character extraction (-c), and field extraction (-f). The command is particularly useful for processing structured text files like CSV data, log files, configuration files, and system files like `/etc/passwd`. Cut excels at column-based data extraction and is an essential component of the Unix text processing toolkit, often used in combination with other tools like `grep`, `awk`, `sort`, and `sed` for complex data manipulation pipelines.

## Basic Syntax

```bash
cut OPTION... [FILE]...
```

If no FILE is specified, or when FILE is "-", cut reads from standard input.

## Selection Modes

### Byte Extraction
- `-b, --bytes=LIST` - Select only specific bytes from each line

### Character Extraction
- `-c, --characters=LIST` - Select only specific characters from each line

### Field Extraction
- `-f, --fields=LIST` - Select only specific fields from each line

## Field Options

### Delimiter Settings
- `-d, --delimiter=DELIM` - Use DELIM instead of TAB for field delimiter
- `--output-delimiter=STRING` - Use STRING as the output delimiter (default is input delimiter)

### Field Behavior
- `--complement` - Invert the selection (select everything except specified)
- `-s, --only-delimited` - Do not print lines without delimiters

### Input/Output Options
- `-z, --zero-terminated` - Use NULL character as line delimiter instead of newline
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## List Format Specification

The LIST parameter can specify ranges in several formats:

### Single Items
- `N` - Single item (Nth byte, character, or field)

### Ranges
- `N-` - From Nth item to end of line
- `N-M` - From Nth through Mth item (inclusive)
- `-M` - From beginning through Mth item (inclusive)

### Multiple Items
- `N,M` - Multiple specific items (comma-separated)
- `N- M` - Multiple ranges (comma-separated, spaces are optional)
- `N,M-P,Q-R` - Mix of single items and ranges

## Usage Examples

### Field Extraction

#### Basic Field Operations
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

# Extract all fields except 2nd
cut -f2 --complement data.txt

# Extract last field only
rev data.txt | cut -f1 | rev
```

#### Custom Delimiters
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

# Use multiple character delimiter
cut -d'::' -f2 file.txt

# Extract multiple non-consecutive fields
cut -d',' -f1,3,5,7 data.csv
```

### Character and Byte Extraction

#### Character Extraction
```bash
# Extract first 10 characters
cut -c1-10 file.txt

# Extract characters 5 through 15
cut -c5-15 file.txt

# Extract characters from 20th to end
cut -c20- file.txt

# Extract specific characters (1st, 5th, 10th)
cut -c1,5,10 file.txt

# Extract multiple ranges
cut -c1-5,10-15,20-25 file.txt

# Extract everything except first 5 characters
cut -c1-5 --complement file.txt

# Extract characters from multiple files
cut -c1-50 *.txt > all_first_50_chars.txt
```

#### Byte Extraction
```bash
# Extract first 100 bytes
cut -b1-100 file.txt

# Extract specific byte ranges
cut -b1-20,50-100 binary_file.bin

# Extract bytes respecting multibyte characters
LC_ALL=en_US.UTF-8 cut -c1-10 unicode_file.txt

# Difference between bytes and characters
cut -b1-10 utf8_file.txt    # May split multibyte characters
cut -c1-10 utf8_file.txt    # Handles multibyte correctly
```

### Advanced Field Operations

#### Complex Selection Patterns
```bash
# Non-contiguous field selection
cut -f1,3,5,7-9 data.txt

# Multiple range specifications
cut -f1-3,5,7-9,11 data.txt

# Open-ended ranges
cut -f3- data.txt      # From field 3 to end
cut -f-5 data.txt      # From beginning to field 5

# Complex complementary selection
cut -f1,3,5 --complement data.txt  # All except 1,3,5

# Skip lines without delimiters
cut -s -f2 data.txt    # Only process lines with delimiter
```

#### Output Formatting
```bash
# Custom output delimiter
cut -d',' -f1,3 --output-delimiter=' | ' data.csv

# Change delimiter format
cut -d':' -f1,7 /etc/passwd --output-delimiter=': '

# Replace tabs with spaces
cut -f1,3 data.txt | expand -t 8

# Create new format from fields
paste <(cut -f1 data.txt) <(cut -f3 data.txt) -d '|'
```

## Practical Applications

### System Administration

#### User and Group Management
```bash
# Extract usernames from /etc/passwd
cut -d':' -f1 /etc/passwd

# Extract user IDs
cut -d':' -f3 /etc/passwd | sort -n

# Extract home directories
cut -d':' -f6 /etc/passwd

# Extract user shells
cut -d':' -f7 /etc/passwd | sort | uniq -c

# Find users with specific shell
cut -d':' -f1,7 /etc/passwd | grep '/bin/bash'

# Extract group names
cut -d':' -f1 /etc/group

# Get user and group mapping
cut -d':' -f1,4 /etc/passwd | while read user gid; do
    group=$(grep ":$gid:" /etc/group | cut -d':' -f1)
    echo "$user:$group"
done
```

#### Process Management
```bash
# Extract process names
ps aux | cut -d' ' -f11 | tail -n +2

# Extract process IDs
ps aux | cut -d' ' -f2 | tail -n +2

# Get CPU usage for specific processes
ps aux | grep 'nginx' | cut -d' ' -f3

# Extract memory usage
ps aux | tail -n +2 | cut -d' ' -f4 | sort -n

# Get parent process IDs
ps -eo pid,ppid,comm | cut -d' ' -f1,2,3
```

### Log Analysis

#### Web Server Logs
```bash
# Extract IP addresses from access logs
cut -d' ' -f1 access_log.txt | sort | uniq -c | sort -nr

# Extract timestamps
cut -d' ' -f4 access_log.txt | sed 's/\[//'

# Extract HTTP methods
cut -d'"' -f2 access_log.txt | cut -d' ' -f1 | sort | uniq -c

# Extract requested URLs
cut -d'"' -f2 access_log.txt | cut -d' ' -f2

# Extract status codes
cut -d' ' -f9 access_log.txt | sort | uniq -c

# Extract user agents
cut -d'"' -f6 access_log.txt | sort | uniq -c

# Extract response sizes
cut -d' ' -f10 access_log.txt | awk '{sum+=$1} END {print sum/NR}'
```

#### System Logs
```bash
# Extract log levels
cut -d' ' -f3 /var/log/syslog | cut -d'[' -f2 | cut -d']' -f1 | sort | uniq -c

# Extract timestamp components
cut -d' ' -f1-3 /var/log/messages

# Extract process names from logs
cut -d'[' -f1 /var/log/syslog | cut -d' ' -f4

# Filter error messages
grep "ERROR" /var/log/application.log | cut -d' ' -f4-

# Extract specific time period logs
grep "2023-10-01" /var/log/access.log | cut -d' ' -f1,7
```

### Data Processing

#### CSV File Processing
```bash
# Extract specific columns from CSV
cut -d',' -f1,3,5 data.csv

# Get headers from CSV file
head -1 data.csv | cut -d',' -f1-

# Extract rows with specific criteria
grep "ERROR" data.csv | cut -d',' -f1,2,5

# Process CSV with quoted fields (simplified)
cut -d',' -f1,3 data.csv | tr -d '"'

# Convert CSV to space-separated
cut -d',' -f1-3 data.csv | tr ',' ' '

# Extract email domain names
cut -d'@' -f2 emails.txt | sort | uniq -c
```

#### Configuration File Processing
```bash
# Extract server names from config
grep -v '^#' config.txt | cut -d'=' -f1

# Extract configuration values
grep -v '^#' config.txt | cut -d'=' -f2

# Process Apache configuration
grep "ServerName" /etc/apache2/sites-available/*.conf | cut -d' ' -f2

# Extract IP addresses from hosts file
cut -f1 /etc/hosts | grep -v '^#'

# Process environment variables
printenv | cut -d'=' -f1

# Extract enabled services
systemctl list-unit-files | grep "enabled" | cut -d' ' -f1
```

### Data Migration and Transformation

#### Database Export Processing
```bash
# Extract specific columns for database import
cut -d',' -f1,2,4 source.csv > import_ready.csv

# Transform data format for legacy systems
cut -d'|' -f1,3,5 old_format.txt | tr '|' ',' > new_format.csv

# Create user data for migration
cut -d':' -f1,5,6 /etc/passwd > user_migration.csv

# Extract and reformat dates
cut -d'-' -f1,2,3 dates.txt | tr '\n' '-' | sed 's/-$//'

# Process tab-delimited data
cut -f1,3,5 data.txt --output-delimiter=',' > comma_separated.csv

# Create backup file list
find /home -name "*.txt" | cut -d'/' -f4- > file_list.txt
```

## Advanced Techniques

### Complex Data Processing

#### Multi-Step Processing
```bash
# Extract last field from lines with variable field counts
awk '{print $NF}' data.txt  # Alternative using awk
rev data.txt | cut -d' ' -f1 | rev  # Using cut with rev

# Process nested delimiters
cut -d'"' -f4 access_log.txt | cut -d' ' -f2

# Extract nth field from space-separated data with multiple spaces
tr -s ' ' '\t' < file.txt | cut -f2

# Combine multiple extraction operations
cut -d',' -f1,3 data.csv | cut -d' ' -f1

# Process lines with different delimiters
awk -F'[,:|]' '{print $1, $3}' mixed_delimiters.txt
```

#### Pipeline Integration
```bash
# Extract and count unique values
cut -d',' -f2 data.csv | sort | uniq -c | sort -nr

# Filter and extract in one pipeline
grep "ERROR" logfile.txt | cut -d' ' -f4- | sort | uniq -c

# Extract and calculate statistics
cut -f3 numbers.txt | awk '{sum+=$1; count++} END {print sum/count}'

# Multiple file processing
for file in *.csv; do
    cut -d',' -f1 "$file" >> all_first_columns.txt
done

# Extract and format for reports
cut -f1,5 data.txt | awk '{printf "%-20s %10s\n", $1, $2}'
```

### Performance Optimization

#### Large File Processing
```bash
# Process files in chunks for large datasets
split -l 1000000 large_file.txt chunk_
for chunk in chunk_*; do
    cut -f1,3 "$chunk" >> extracted_columns.txt
    rm "$chunk"
done

# Use parallel processing for multiple files
ls *.csv | parallel -j 4 'cut -d',' -f1,3 {} > {.}_extracted.csv'

# Memory-efficient processing with temp files
cut -f1 large_file.txt > temp_col1.txt
cut -f2 large_file.txt > temp_col2.txt
paste temp_col1.txt temp_col2.txt > result.txt
rm temp_col1.txt temp_col2.txt

# Stream processing for real-time data
tail -f access_log.txt | cut -d' ' -f1,7 | uniq -c
```

#### Alternative Approaches for Better Performance
```bash
# Use awk for complex field processing
awk -F',' '{print $1, $3, $5}' data.csv  # Often faster than multiple cuts

# Use sed for simple character extraction
sed 's/^\(.\{10\}\).*/\1/' file.txt  # Extract first 10 characters

# Use grep for pattern-based extraction
grep -o '[0-9]\+' file.txt  # Extract numbers

# Use perl for complex text processing
perl -F',' -lane 'print "$F[0]\t$F[2]"' data.csv
```

## Special Use Cases

### Text Mining and Analysis

#### Word and Character Analysis
```bash
# Extract first word from each line
cut -d' ' -f1 file.txt

# Extract nth word (handling multiple spaces)
tr -s ' ' '\t' < file.txt | cut -f2

# Extract fixed-width columns
cut -c1-10,20-30,50-60 fixed_width.txt

# Character frequency analysis
fold -w1 file.txt | sort | uniq -c | sort -nr

# Extract words of specific length
grep -oE '\b\w{5}\b' file.txt  # 5-letter words
```

#### Data Cleaning and Validation
```bash
# Remove empty fields
cut -d',' -f1,3 data.csv | grep -v ',,'

# Validate field counts
cut -d',' -f1- data.csv | while read line; do
    field_count=$(echo "$line" | tr ',' '\n' | wc -l)
    if [ $field_count -ne 5 ]; then
        echo "Invalid line: $line"
    fi
done

# Extract records with missing fields
grep ',,' data.csv | cut -d',' -f1

# Normalize data format
cut -d';' -f1,3 data.txt | tr ';' ',' | tr -d '"'
```

### Network and Security

#### IP Address Processing
```bash
# Extract unique IP addresses from logs
cut -d' ' -f1 access_log.txt | sort | uniq

# Extract IP address ranges
cut -d' ' -f1 access_log.txt | cut -d'.' -f1,2 | sort | uniq

# Process firewall logs
cut -d' ' -f8 firewall.log | cut -d':' -f1

# Extract source and destination IPs
grep "SRC=" firewall.log | cut -d' ' -f8 | cut -d'=' -f2
```

#### Security Log Analysis
```bash
# Extract failed login attempts
grep "Failed" auth.log | cut -d' ' -f1,2,6

# Extract user accounts from failed logins
grep "Failed password" auth.log | cut -d' ' -f9 | sort | uniq -c

# Process sudo logs
grep "sudo:" /var/log/auth.log | cut -d' ' -f6

# Extract timestamp and event
cut -d' ' -f1-3,5-6 security.log
```

## Integration with Shell Scripts

### Automated Report Generation
```bash
#!/bin/bash
# System resource usage report

echo "=== Top 10 CPU consuming processes ==="
ps aux | tail -n +2 | sort -nr -k 3 | head -10 | cut -d' ' -f1,2,3,11

echo "=== Top 10 Memory consuming processes ==="
ps aux | tail -n +2 | sort -nr -k 4 | head -10 | cut -d' ' -f1,2,4,11

echo "=== Disk usage by user ==="
find /home -type f -printf "%u %s\n" | awk '{users[$1]+=$2} END {for(u in users) print u, users[u]}' | cut -d' ' -f1

echo "=== Network connections ==="
netstat -tn | tail -n +3 | cut -d' ' -f4,5 | sort | uniq -c | sort -nr
```

### Data Validation Script
```bash
#!/bin/bash
# CSV file validation

validate_csv() {
    local file="$1"
    local expected_fields="$2"

    line_num=0
    while IFS= read -r line; do
        ((line_num++))

        # Skip empty lines
        [[ -z "$line" ]] && continue

        # Count fields
        field_count=$(echo "$line" | tr ',' '\n' | wc -l)

        if [ "$field_count" -ne "$expected_fields" ]; then
            echo "Line $line_num: Expected $expected_fields fields, got $field_count"
            echo "Content: $line"
        fi

        # Check for empty fields
        if echo "$line" | grep -q ',,'; then
            echo "Line $line_num: Contains empty fields"
            echo "Content: $line"
        fi

    done < "$file"
}

validate_csv "data.csv" 5
```

### Batch File Processing
```bash
#!/bin/bash
# Process multiple data files

input_dir="./data"
output_dir="./processed"
mkdir -p "$output_dir"

for csv_file in "$input_dir"/*.csv; do
    filename=$(basename "$csv_file" .csv)

    echo "Processing $filename..."

    # Extract key columns
    cut -d',' -f1,3,5,7 "$csv_file" > "$output_dir/${filename}_key_cols.csv"

    # Create summary statistics
    cut -d',' -f3 "$csv_file" | awk '{sum+=$1; count++} END {print "Average: " sum/count}' > "$output_dir/${filename}_stats.txt"

    # Extract unique values from a column
    cut -d',' -f2 "$csv_file" | sort | uniq > "$output_dir/${filename}_unique.txt"

    echo "Completed $filename"
done
```

## Troubleshooting

### Common Issues and Solutions

#### Delimiter Problems
```bash
# Issue: Multiple spaces as delimiter
echo "a   b   c" | cut -d' ' -f2  # May not work as expected

# Solution: Normalize spaces first
tr -s ' ' '\t' < file.txt | cut -f2

# Alternative using awk
awk '{print $2}' file.txt

# Issue: Tab delimiter not working
# Solution: Use literal tab character
cut -d$'\t' -f1 file.txt  # Bash
cut -d'	' -f1 file.txt    # Literal tab
```

#### Character Encoding Issues
```bash
# Issue: Multibyte character handling
cut -b1-10 utf8_file.txt  # May split characters incorrectly

# Solution: Use character extraction instead
LC_ALL=en_US.UTF-8 cut -c1-10 utf8_file.txt

# Check file encoding
file -i filename.txt

# Convert encoding if needed
iconv -f latin1 -t utf8 file.txt > utf8_file.txt
```

#### Performance Issues
```bash
# Issue: Slow processing of large files
cut -f1 huge_file.txt > output.txt

# Solution: Use appropriate tools for the task
# For simple field extraction: cut
# For complex processing: awk
# For pattern matching: grep
# For large files: consider parallel processing

# Memory usage monitoring
/usr/bin/time -v cut -f1 large_file.txt > output.txt
```

#### Line Ending Issues
```bash
# Issue: Windows line endings (CRLF)
cut -d',' -f1 windows_file.csv  # May not work correctly

# Solution: Convert line endings
dos2unix windows_file.csv
# or
tr -d '\r' < windows_file.csv > unix_file.csv
```

## Related Commands

- [`awk`](/docs/commands/text-processing/awk) - More powerful field processing and pattern matching
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text transformation
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching in files
- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files
- [`paste`](/docs/commands/text-processing/paste) - Merge lines of files
- [`join`](/docs/commands/text-processing/join) - Join lines of two files on a common field
- [`tr`](/docs/commands/text-processing/tr) - Translate or delete characters
- [`column`](/docs/commands/text-processing/column) - Columnate data
- [`perl`](/docs/commands/text-processing/perl) - Perl interpreter for text processing
- [`python`](/docs/commands/text-processing/python) - Python for advanced text processing

## Best Practices

1. **Choose the right mode**: Use -f for field-based data, -c for character positions, -b for byte-level operations
2. **Handle edge cases**: Account for empty fields, inconsistent delimiters, and variable line lengths
3. **Use appropriate delimiters**: Select delimiters that don't appear in your data content
4. **Combine with other tools**: Integrate cut with grep, sort, uniq, and awk for powerful data processing pipelines
5. **Test on sample data**: Validate your cut commands on small samples before processing large files
6. **Consider alternatives**: Use awk for complex field processing or when dealing with multiple delimiters
7. **Handle character encoding**: Ensure proper locale settings when working with multibyte characters
8. **Use complementary selection**: Leverage --complement for easier exclusion logic
9. **Process large files efficiently**: Consider memory usage and performance when handling big datasets
10. **Validate input data**: Check for consistent field counts and delimiter usage

## Performance Tips

1. **Field extraction (-f)** is generally faster than character extraction (-c) for delimited data
2. **Byte extraction (-b)** is fastest but doesn't handle multibyte characters correctly
3. **Use -s (--only-delimited)** to skip lines without delimiters for cleaner output
4. **Avoid complex pipelines** when a single awk command can accomplish the same task
5. **Process files sequentially** rather than in parallel when I/O is the bottleneck
6. **Use appropriate buffering** for large file operations
7. **Consider memory constraints** when processing very large files
8. **Use temp files strategically** for complex multi-step operations
9. **Leverage shell built-ins** like parameter expansion for simple string operations
10. **Profile your commands** using time or /usr/bin/time to identify bottlenecks

## Cut Command Limitations

### Known Limitations

1. **Single delimiter only**: Cannot handle multiple different delimiters in one command
2. **Limited regex support**: No regular expression capability for delimiter definition
3. **No field manipulation**: Cannot perform calculations or transformations on extracted fields
4. **Fixed-width limitations**: Character-based extraction doesn't handle variable-width fields well
5. **Quote handling**: No built-in support for handling quoted fields in CSV files
6. **Memory usage**: Loads entire lines into memory, which can be problematic for very long lines
7. **Limited error handling**: Minimal feedback about malformed input data

### Workarounds and Alternatives

```bash
# For multiple delimiters: use tr or awk
tr ',' '\t' < file.csv | cut -f2,3
awk -F'[,:|]' '{print $2, $4}' file.txt

# For CSV with quotes: use specialized tools
csvcut -c 1,3 data.csv  # From csvkit package

# For complex field processing: use awk
awk -F',' '{print $1, ($3 * $5)}' data.csv

# For variable-width fields: use awk with regex
awk -F'[[:space:]]+' '{print $2, $4}' file.txt
```

The `cut` command remains an essential tool for simple field and character extraction tasks. While it has limitations compared to more powerful tools like `awk` or specialized CSV processors, its simplicity, predictability, and widespread availability make it ideal for quick data extraction tasks and inclusion in shell scripts where performance and reliability are paramount.