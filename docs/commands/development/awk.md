---
title: awk - Pattern Scanning and Processing Language
sidebar_label: awk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# awk - Pattern Scanning and Processing Language

The `awk` command is a powerful text processing utility that combines pattern matching with programming language capabilities. Named after its creators Aho, Weinberger, and Kernighan, awk excels at extracting and manipulating structured text data, particularly columnar data like log files, CSV files, and system outputs. It processes files line by line, applying patterns and actions to matching lines, making it ideal for data extraction, reporting, and text transformation tasks. Awk's C-like syntax, built-in functions, and field-based processing make it one of the most versatile tools in the Unix/Linux toolbox.

## Basic Syntax

```bash
awk [options] 'program' file(s)
awk [options] -f program-file file(s)
```

## Program Structure

Awk programs consist of pattern-action pairs:

```awk
pattern { action }
pattern { action }
# ... more pairs
```

## Common Options

### Field and Record Separators
- `-F FS` or `--field-separator=FS` - Set field separator (default: whitespace)
- `-v var=val` or `--assign=var=val` - Assign variable before processing
- `-f file` or `--file=file` - Read program from file

### Processing Control
- `-W posix` or `--posix` - Use POSIX compatibility mode
- `-W re-interval` or `--re-interval` - Enable interval expressions in regex
- `-W source=program-text` - Source program text

### Output Options
- `-W usage` or `--usage` - Print usage summary
- `-W version` or `--version` - Print version information

## Built-in Variables

### Record and Field Variables
- `NR` - Current record number (line number)
- `NF` - Number of fields in current record
- `$0` - Entire current record
- `$1, $2, $3...` - Individual fields
- `FS` - Field separator (default: whitespace)
- `RS` - Record separator (default: newline)
- `OFS` - Output field separator (default: space)
- `ORS` - Output record separator (default: newline)

### File Information
- `FILENAME` - Name of current input file
- `FNR` - Record number within current file
- `ARGC` - Number of command line arguments
- `ARGV` - Array of command line arguments

### Arithmetic and Formatting
- `CONVFMT` - Conversion format for numbers (default: "%.6g")
- `OFMT` - Output format for numbers (default: "%.6g")
- `RLENGTH` - Length of string matched by `match()`
- `RSTART` - Start position of string matched by `match()`

## Usage Examples

### Basic Text Processing

#### Field Extraction
```bash
# Print specific columns
awk '{print $1, $3}' file.txt          # Print 1st and 3rd columns
awk '{print $NF}' file.txt             # Print last column
awk '{print NF}' file.txt              # Print number of columns

# Calculate and print sum
awk '{sum += $3} END {print sum}' file.txt
awk '{sum += $3} END {print "Total:", sum}' file.txt

# Print with custom separators
awk -F: '{print $1, $6}' /etc/passwd   # Use colon as separator
awk 'BEGIN{FS=","} {print $2}' file.csv # Set separator in BEGIN block
```

#### Conditional Processing
```bash
# Print lines matching conditions
awk '$3 > 100' file.txt                # Lines where 3rd field > 100
awk '$1 == "error"' logfile.txt        # Lines where first field is "error"
awk 'NF > 5' file.txt                  # Lines with more than 5 fields
awk '/error/ {print $0}' logfile.txt   # Lines containing "error"

# Multiple conditions
awk '$3 > 100 && $1 == "test"' file.txt
awk '$2 ~ /^[0-9]+$/' file.txt         # Second field contains only digits
```

### Pattern Matching

#### Regular Expression Patterns
```bash
# Lines matching patterns
awk '/^ERROR/ {print}' logfile.txt     # Lines starting with ERROR
awk /pattern/ file.txt                 # Lines containing pattern
awk '!/error/' file.txt                # Lines NOT containing error

# Case insensitive matching
awk 'BEGIN{IGNORECASE=1} /error/' file.txt

# Pattern ranges
awk '/start/,/end/' file.txt           # From line with start to line with end
awk 'NR>=10 && NR<=20' file.txt        # Lines 10 through 20
```

#### Field-based Patterns
```bash
# Pattern matching in specific fields
awk '$1 ~ /^[a-z]+$/' file.txt         # First field only lowercase letters
awk '$NF == "success"' file.txt        # Last field equals "success"
awk '$3 + $4 > 100' file.txt           # Sum of 3rd and 4th fields > 100

# Complex field conditions
awk '$1 == "user" && $3 >= 50 && $3 <= 100' file.txt
```

### Data Transformation

#### Field Manipulation
```bash
# Modify and print fields
awk '{$2 = toupper($2); print}' file.txt
awk '{$1 = $1 * 2; print}' file.txt

# Add fields
awk '{$4 = $2 + $3; print}' file.txt

# Reformat output
awk '{printf "%-10s %8s\n", $1, $2}' file.txt
awk '{printf "Name: %s, Age: %d\n", $1, $3}' file.txt
```

#### Data Aggregation
```bash
# Group by field
awk '{count[$1]++} END {for (item in count) print item, count[item]}' file.txt

# Sum by category
awk '{sum[$1] += $3} END {for (item in sum) print item, sum[item]}' file.txt

# Average by group
awk '{count[$1]++; sum[$1] += $3} END {
    for (item in count)
        print item, sum[item]/count[item]
}' file.txt

# Find maximum by group
awk '{if ($3 > max[$1]) {max[$1] = $3; val[$1] = $2}} END {
    for (item in max)
        print item, max[item], val[item]
}' file.txt
```

## Practical Examples

### Log File Analysis

#### Web Server Logs
```bash
# Count HTTP status codes
awk '{count[$9]++} END {for (code in count) print code, count[code]}' access.log

# Calculate total bytes transferred
awk '{sum += $10} END {print "Total bytes:", sum}' access.log

# Top 10 IP addresses
awk '{count[$1]++} END {for (ip in count) print count[ip], ip}' access.log | sort -nr | head -10

# Filter by response code
awk '$9 >= 400 {print $1, $9, $7}' access.log

# Average response size by status code
awk '{count[$9]++; sum[$9] += $10} END {
    for (code in count)
        printf "%d: %.2f bytes avg (%d requests)\n",
               code, sum[code]/count[code], count[code]
}' access.log

# Requests per hour
awk '{count[substr($4,14,2)]++} END {for (hour in count) print hour":00", count[hour]}' access.log
```

#### System Logs
```bash
# Count error messages by type
awk '/ERROR/ {count[$5]++} END {for (error in count) print error, count[error]}' syslog

# Filter by time range
awk '$3 >= "10:00:00" && $3 <= "12:00:00" && /ERROR/' syslog

# Extract failed login attempts
awk '/Failed password/ {print $1, $2, $3, $13}' auth.log

# Monitor service restarts
awk '/restarting/ {print $0}' syslog

# Parse systemd journal format
awk '{for (i=5; i<=NF; i++) printf "%s ", $i; print ""}' journal.log
```

### Data Processing

#### CSV Processing
```bash
# Process CSV with header
awk -F, 'NR==1 {for (i=1; i<=NF; i++) header[i]=$i; next}
         {for (i=1; i<=NF; i++) print header[i]":", $i}' file.csv

# Filter CSV by column value
awk -F, '$3 > 1000' file.csv

# Convert CSV to fixed-width format
awk -F, '{printf "%-20s %10s %15s\n", $1, $2, $3}' file.csv

# Calculate column statistics
awk -F, '{sum[$1] += $3; count[$1]++} END {
    for (item in sum)
        printf "%s: %.2f avg (%d items)\n", item, sum[item]/count[item], count[item]
}' file.csv
```

#### Number Processing
```bash
# Calculate statistics
awk '{sum+=$1; sumsq+=$1*$1; count++} END {
    mean=sum/count;
    variance=sumsq/count - mean*mean;
    print "Count:", count;
    print "Mean:", mean;
    print "StdDev:", sqrt(variance);
}' numbers.txt

# Find min and max
awk 'NR==1 {min=max=$1} {if ($1<min) min=$1; if ($1>max) max=$1}
     END {print "Min:", min, "Max:", max}' numbers.txt

# Generate running total
awk '{total += $1; print $1, total}' numbers.txt

# Round numbers to specified precision
awk '{printf "%.2f\n", $1}' numbers.txt
```

### File Processing

#### Text Manipulation
```bash
# Remove duplicate lines (keeping first occurrence)
awk '!seen[$0]++' file.txt

# Number lines
awk '{printf "%4d %s\n", NR, $0}' file.txt

# Join lines ending with backslash
awk '/\\$/ {sub(/\\$/, ""); printf "%s", $0; next} {print}' file.txt

# Wrap long lines at specified width
awk '{while (length($0) > 80) {
    print substr($0, 1, 80);
    $0 = substr($0, 81)
} print}' longfile.txt

# Replace specific text
awk '{gsub(/old_text/, "new_text"); print}' file.txt
```

#### Format Conversion
```bash
# Convert tab-separated to comma-separated
awk -F'\t' -v OFS=',' '1' file.txt

# Add line numbers to beginning
awk '{print NR, $0}' file.txt

# Create formatted report
awk 'BEGIN {print "=== REPORT ==="}
     {printf "%-20s %10d %15s\n", $1, $2, $3}
     END {print "=== END ==="}' data.txt

# Convert to JSON format
awk 'BEGIN {print "["}
     {printf "  {\"name\": \"%s\", \"value\": %d, \"status\": \"%s\"}", $1, $2, $3
      if (NR < NR-1) print ","}
     END {print "]"}' data.txt
```

## Advanced Usage

### Complex Programming

#### Control Structures
```bash
# If-else statements
awk '{
    if ($3 > 100) {
        print $1, "HIGH"
    } else if ($3 > 50) {
        print $1, "MEDIUM"
    } else {
        print $1, "LOW"
    }
}' file.txt

# Loop structures
awk '{
    for (i = 1; i <= NF; i++) {
        if (length($i) > 10) print "Long field:", $i
    }
}' file.txt

# While loop
awk '{
    i = 1
    while (i <= NF) {
        if ($i ~ /pattern/) count++
        i++
    }
} END {print "Pattern count:", count}' file.txt

# Do-while loop
awk '{
    sum = 0
    i = 1
    do {
        sum += $i
        i++
    } while (i <= NF)
    print "Sum:", sum
}' file.txt
```

#### User-defined Functions
```bash
# Define and use custom functions
awk '
function avg(a, b) {
    return (a + b) / 2
}
function to_kelvin(celsius) {
    return celsius + 273.15
}

{
    print "Average:", avg($2, $3)
    print "Temperature K:", to_kelvin($1)
}' data.txt

# Complex function for string processing
awk '
function format_phone(number) {
    gsub(/[() -]/, "", number)
    return sprintf("(%d) %d-%d",
                   substr(number, 1, 3),
                   substr(number, 4, 3),
                   substr(number, 7))
}

{
    print "Formatted:", format_phone($1)
}' contacts.txt
```

### Multi-file Processing

#### Working with Multiple Files
```bash
# Process files with awareness of file boundaries
awk 'FNR==1 {print "Processing:", FILENAME}
     {print FILENAME ":" NR ":" $0}' file1.txt file2.txt

# Combine data from multiple files
awk '{sum[FNR] += $2} END {
    for (i = 1; i <= FNR; i++) print sum[i]
}' file1.txt file2.txt

# Find differences between files
awk '
NR==FNR {a[$0]=1; next}
!a[$0] {print "In file2 only:", $0}
' file1.txt file2.txt

# Merge files based on common field
awk '
NR==FNR {data[$1] = $2; next}
$1 in data {print $1, data[$1], $2}
' file1.txt file2.txt
```

#### File Operations
```bash
# Read from multiple sources
awk 'BEGIN {while ((getline < "config.txt") > 0) config[$1] = $2}
     $1 in config {print $0, config[$1]}' data.txt

# Write to multiple files
awk '{
    if ($3 > 100) print > "high.txt"
    else print > "low.txt"
}' data.txt

# Generate summary files
awk '{print $0 > "output_" $1 ".txt"}' data.txt

# Create separate files per category
awk '{
    filename = $1 "_report.txt"
    print $0 >> filename
    close(filename)
}' data.txt
```

### Performance Optimization

#### Efficient Processing
```bash
# Pre-compile regular expressions
awk 'BEGIN {error_pat = /ERROR/}
     error_pat {print}' large_file.txt

# Use array for lookups instead of repeated patterns
awk 'BEGIN {while (getline < "patterns") patterns[$0]=1}
     $2 in patterns {print}' data.txt patterns

# Minimize field access in loops
awk '{
    first = $1
    second = $2
    for (i = 3; i <= NF; i++) {
        # Use cached field values
    }
}' file.txt

# Batch processing with getline
awk 'BEGIN {while ((getline < "large_file") > 0) {
    count++
    if (count % 1000 == 0) print "Processed:", count > "/dev/stderr"
}}'
```

#### Memory Management
```bash
# Clear large arrays periodically
awk '{
    data[$1] = $2
    if (NR % 10000 == 0) {
        for (key in data) delete data[key]
    }
}' huge_file.txt

# Use split() instead of arrays when possible
awk '{split($0, fields); print fields[1], fields[3]}' file.txt

# Process files in chunks
awk 'NR % 1000 == 1 {chunk++}
     {print $0 > "chunk_" chunk ".txt"}' large_file.txt
```

## Integration and Automation

### Shell Script Integration

#### Awk in Shell Scripts
```bash
#!/bin/bash
# Log analysis script with Awk

LOG_FILE="/var/log/apache2/access.log"
REPORT_FILE="access_report_$(date +%Y%m%d).txt"

# Generate report using awk
awk "
BEGIN {
    print \"Access Log Analysis - $(date)\"
    print \"================================\"
}

# Count total requests
END {print \"Total Requests:\", NR}

# Count unique IPs
{ips[\$1]++}
END {
    print \"Unique IPs:\", length(ips)
    print \"\nTop 10 IPs:\"
    for (ip in ips) {
        print ips[ip], ip
        if (++count >= 10) break
    }
}

# Count status codes
{codes[\$9]++}
END {
    print \"\nStatus Code Distribution:\"
    for (code in codes) print code, codes[code]
}

# Calculate total bytes
{bytes += \$10}
END {print \"\nTotal Bytes:\", bytes}
" "$LOG_FILE" > "$REPORT_FILE"

echo "Report generated: $REPORT_FILE"
```

#### Pipeline Integration
```bash
# Process command output with awk
ps aux | awk '{sum += $3} END {print "Total CPU%:", sum}'
df -h | awk 'NR>1 && $5+0 > 80 {print $1, $5}'

# Chain multiple awk commands
cat data.txt | awk '{print $2}' | sort | uniq -c | awk '$1 > 5'

# Filter and format netstat output
netstat -tuln | awk '
/LISTEN/ {split($4, addr, ":");
          if (addr[1] == "0.0.0.0" || addr[1] == "127.0.0.1")
              print addr[2], $6}'

# Real-time log monitoring with awk
tail -f access.log | awk '/ 404 / {print $1, $7, $9}'
```

### Data Validation and Cleaning

#### Data Validation
```bash
# Validate numeric fields
awk '$3 !~ /^[0-9]+$/ {print "Invalid number in line", NR, ":", $0}' data.txt

# Check email format
awk '$2 !~ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ {
    print "Invalid email in line", NR, ":", $0
}' contacts.txt

# Validate date format (YYYY-MM-DD)
awk '$1 !~ /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ {
    print "Invalid date format in line", NR
}' dates.txt

# Range validation
awk '$2 < 0 || $2 > 100 {
    print "Value out of range (0-100) in line", NR, ":", $2
}' scores.txt
```

#### Data Cleaning
```bash
# Remove extra whitespace
awk '{gsub(/[[:space:]]+/, " "); $1=$1; print}' file.txt

# Standardize case
awk '{print toupper($1), tolower($2)}' file.txt

# Remove non-printable characters
awk '{gsub(/[^[:print:]]/, ""); print}' file.txt

# Normalize phone numbers
awk '{gsub(/[^0-9]/, "", $1);
     if (length($1) == 10) print $1;
     else if (length($1) == 11) substr($1, 2)}' phones.txt
```

## Troubleshooting

### Common Issues

#### Field Separation Problems
```bash
# Issue: Awk not parsing fields correctly
# Solution: Specify correct field separator
awk -F: '{print $1, $6}' /etc/passwd      # Colon separator
awk -F, '{print $1, $3}' file.csv         # Comma separator

# Handle multiple separators
awk -F'[:|]' '{print $1, $3}' file.txt     # Colon or pipe

# Mixed field separators in same file
awk 'BEGIN{FS="[ :]"} {print $1, $2}' file.txt
```

#### Memory Issues with Large Files
```bash
# Issue: Running out of memory with large datasets
# Solution: Process in smaller chunks

awk 'NR % 10000 == 0 {
    for (key in data) delete data[key];
    print "Processed", NR, "lines"
} {
    data[$1] = $2
}' huge_file.txt

# Stream processing without storing everything
awk '{sum += $1; count++} END {print sum/count}' large_numbers.txt
```

#### Performance Issues
```bash
# Issue: Slow processing of large files
# Solution: Optimize awk script

# Use built-in functions instead of shell commands
# Bad: awk '{system("echo " $0 " | wc -c")}' file.txt
# Good: awk '{print length($0)}' file.txt

# Minimize array operations
# Bad: awk '{for (i=1; i<=NF; i++) fields[i] = $i}' file.txt
# Good: awk '{for (i=1; i<=NF; i++) process($i)}' file.txt

# Use character classes for faster regex
awk '$2 ~ /[0-9]/' file.txt    # Slower
awk '$2 ~ /[[:digit:]]/' file.txt  # Faster
```

### Debugging Awk Scripts

#### Common Debugging Techniques
```bash
# Print line numbers for debugging
awk '{print NR ": " $0}' file.txt

# Show field boundaries
awk '{for (i=1; i<=NF; i++) printf "Field %d: %s\n", i, $i}' file.txt

# Debug array contents
awk '{arr[$1] = $2} END {
    for (key in arr)
        print key " -> " arr[key]
}' file.txt

# Trace variable changes
awk '{
    old_sum = sum
    sum += $1
    if (sum != old_sum)
        print NR ": sum changed from", old_sum, "to", sum
}' file.txt
```

## Related Commands

- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`grep`](/docs/commands/file-management/grep) - Pattern searching tool
- [`cut`](/docs/commands/file-management/cut) - Field extraction utility
- [`sort`](/docs/commands/file-management/sort) - Text sorting utility
- [`uniq`](/docs/commands/file-management/uniq) - Remove duplicate lines
- [`perl`](/docs/commands/file-management/perl) - Perl scripting language
- [`python`](/docs/commands/file-management/python) - Python scripting language
- [`join`](/docs/commands/file-management/join) - Join lines of two files

## Best Practices

1. **Use BEGIN blocks** for initialization and setting variables
2. **Specify field separators explicitly** with `-F` for consistent parsing
3. **Comment complex scripts** with `#` for maintainability
4. **Use arrays judiciously** - they consume memory proportional to unique keys
5. **Leverage built-in functions** instead of external commands when possible
6. **Test with small samples** before processing large files
7. **Use proper quoting** to protect awk programs from shell expansion
8. **Consider performance** for large datasets and optimize accordingly
9. **Validate input data** before processing to avoid runtime errors
10. **Use functions** for reusable code to improve readability and maintenance

## Performance Tips

1. **Avoid unnecessary splits** - use existing field variables when possible
2. **Pre-compile regex patterns** in BEGIN blocks for repeated use
3. **Minimize string operations** - they're more expensive than numeric operations
4. **Use appropriate data structures** - arrays for lookups, simple variables for counters
5. **Process in streaming fashion** - avoid storing entire file in memory
6. **Use next statement** to skip processing when conditions aren't met
7. **Batch operations** - combine multiple operations in single pass when possible
8. **Choose appropriate separators** - simple characters are faster than complex regex
9. **Limit print statements** - they have I/O overhead
10. **Use built-in functions** instead of custom implementations when available

The `awk` command is an exceptionally powerful and flexible tool for text processing and data manipulation. Its combination of pattern matching, procedural programming capabilities, and efficient field-based processing makes it indispensable for system administrators, data analysts, and developers working with structured text data. From simple column extraction to complex data aggregation and transformation, awk provides the versatility needed for virtually any text processing task.