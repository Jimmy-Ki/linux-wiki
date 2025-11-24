---
title: awk - Text Processing Programming Language
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# awk - Text Processing Programming Language

The `awk` command is a powerful programming language designed for text processing and data extraction. It processes text files line by line, allowing users to search, extract, and manipulate text patterns using a concise syntax. Awk is particularly useful for report generation, data analysis, and complex text transformations.

## Basic Syntax

```bash
awk [options] 'program' file1 file2 ...
awk [options] -f scriptfile file1 file2 ...
awk [options] 'BEGIN{program} pattern{action} END{program}' file
```

## Common Options

### Basic Options
- `-F <fs>` - Set field separator (default is whitespace)
- `-f `` - Read awk program from file
- `-v <var>=<value>` - Assign variable before processing begins
- `-W <option>` - GNU awk specific options
- `-m[fr] <val>` - Set memory limits (GNU extension)

### GNU Awk Extensions
- `-W re-interval` - Enable interval expressions in regex
- `-W source=program` - Source program file
- `-W posix` - POSIX compatibility mode
- `-W traditional` - Traditional awk behavior
- `-W non-decimal-data` - Allow non-decimal data values
- `-W gen-po` - Generate .po file for internationalization
- `-W use-lc-numeric` - Use locale for decimal point

### Formatting Options
- `-W lint` - Check for non-portable constructs
- `-W lint-old` - Old lint check
- `-W compat` - Compatibility mode
- `-W copyleft` - Print copyleft information

## Awk Program Structure

### Basic Components
```bash
# Basic syntax
pattern { action }

# Simple one-liners
awk '{print $1}' file.txt                    # Print first field
awk '/pattern/ {print}' file.txt              # Print matching lines
awk '{print NR, $0}' file.txt                 # Print line numbers

# BEGIN and END blocks
awk 'BEGIN{print "Start"} {print $1} END{print "Done"}' file.txt
```

### Patterns
```bash
# Regular expression patterns
/regex/           # Lines matching regex
!/regex/          # Lines NOT matching regex

# Relational expressions
$1 > 100          # First field greater than 100
$2 == "error"     # Second field equals "error"
NF >= 5           # Number of fields >= 5

# Range patterns
/start/,/stop/    # From line with "start" to line with "stop"

# Combination patterns
$1 > 100 && $2 < 200    # Both conditions true
$1 == "error" || NF == 0   # Either condition true
```

### Built-in Variables
```bash
# Field variables
$0                 # Entire line
$1, $2, $3...      # Individual fields
NF                 # Number of fields
NR                 # Current record number
FNR                # Record number in current file
FS                 # Field separator (input)
OFS                # Output field separator
RS                 # Record separator (input)
ORS                # Output record separator

# File and environment
FILENAME           # Current filename
ARGC               # Number of command line arguments
ARGV               # Array of command line arguments
ENVIRON            # Array of environment variables

# Format and numeric
OFMT               # Output format for numbers
CONVFMT            # Conversion format for numbers
RLENGTH            # Length matched by match function
RSTART             # Start position of match
SUBSEP             # Subscript separator for arrays
```

## Usage Examples

### Basic Text Processing
```bash
# Print first column
awk '{print $1}' file.txt

# Print last column
awk '{print $NF}' file.txt

# Print specific columns
awk '{print $1, $3, $5}' file.txt

# Print with custom separator
awk 'BEGIN{OFS="|"} {print $1, $2, $3}' file.txt

# Print line numbers
awk '{print NR, $0}' file.txt
```

### Pattern Matching
```bash
# Print lines containing pattern
awk '/error/ {print}' file.txt

# Print lines NOT containing pattern
awk '!/error/ {print}' file.txt

# Case-insensitive matching
awk 'BEGIN{IGNORECASE=1} /error/ {print}' file.txt

# Multiple patterns
awk '/error/ || /warning/ {print}' file.txt
```

### Field Processing
```bash
# Set custom field separator
awk -F: '{print $1, $6}' /etc/passwd        # Use colon as separator
awk -F'[ ,:]+' '{print $1, $2}' file.txt     # Multiple separators

# Conditional field processing
awk 'NF > 3 {print "Line", NR, "has", NF, "fields"}' file.txt
awk '$1 > 100 {print $1, "is greater than 100"}' file.txt
```

### Calculations and Aggregations
```bash
# Sum columns
awk '{sum += $3} END {print "Total:", sum}' file.txt

# Average calculation
awk '{sum += $3; count++} END {print "Average:", sum/count}' file.txt

# Min and Max values
awk 'NR==1 {min=max=$1} {if($1<min) min=$1; if($1>max) max=$1} END {print "Min:", min, "Max:", max}' file.txt

# Count occurrences
awk '/error/ {count++} END {print "Errors:", count}' file.txt
```

### String Operations
```bash
# String length
awk '{print $1, length($1)}' file.txt

# String substitution
awk '{gsub(/old/, "new"); print}' file.txt

# Case conversion
awk '{print toupper($1), tolower($2)}' file.txt

# Substring extraction
awk '{print substr($1, 1, 5)}' file.txt        # First 5 characters
```

### Array Operations
```bash
# Count unique values
awk '{count[$1]++} END {for (key in count) print key, count[key]}' file.txt

# Group and aggregate
awk '{sum[$1] += $2} END {for (key in sum) print key, sum[key]}' file.txt

# Multiple aggregation
awk '{count[$1]++; sum[$1] += $2} END {for (key in count) print key, count[key], sum[key]/count[key]}' file.txt
```

### File Processing
```bash
# Multiple file processing
awk 'FNR==1 {print "Processing:", FILENAME} {print NR, $0}' file1.txt file2.txt

# File header/footer
awk 'BEGIN{print "Report Generated:", strftime()} {print} END{print "End of Report"}' file.txt
```

## Advanced Features

### Built-in Functions

### String Functions
```bash
# Length and substring
length(string)                 # String length
substr(string, start, len)     # Extract substring
index(string, find)           # Find position of substring

# Case conversion
toupper(string)               # Convert to uppercase
tolower(string)               # Convert to lowercase

# Split and join
split(string, array, sep)     # Split string into array
sprintf(format, args...)      # Formatted string

# Search and replace
sub(regex, replacement, string)    # Replace first occurrence
gsub(regex, replacement, string)   # Replace all occurrences
match(string, regex)               # Find and return position

# Trimming
sub(/^[ \t]+/, "")             # Trim leading whitespace
sub(/[ \t]+$/, "")             # Trim trailing whitespace
```

### Mathematical Functions
```bash
# Basic math
sqrt(x)                        # Square root
exp(x)                         # Exponential function
log(x)                         # Natural logarithm
sin(x), cos(x), tan(x)         # Trigonometric functions
int(x)                         # Integer part
rand()                         # Random number 0-1
srand(seed)                    # Seed random generator

# Rounding
printf "%.2f", value           # Format with 2 decimal places
```

### Time Functions
```bash
# Current time
strftime(format, timestamp)    # Format timestamp
systime()                      # Current Unix timestamp
```

### Advanced Programming

### User-defined Functions
```bash
awk '
function square(x) {
    return x * x
}

function max(a, b) {
    return (a > b) ? a : b
}

{
    print "Square of", $1, "is", square($1)
    print "Max of", $1, "and", $2, "is", max($1, $2)
}' file.txt
```

### Conditional Statements
```bash
awk '
{
    if ($1 > 100) {
        print $1, "is large"
    } else if ($1 > 50) {
        print $1, "is medium"
    } else {
        print $1, "is small"
    }

    # Ternary operator
    result = ($1 > 50) ? "large" : "small"
    print "Result:", result
}' file.txt
```

### Loops
```bash
awk '
{
    # For loop
    for (i = 1; i <= NF; i++) {
        print "Field", i, ":", $i
    }

    # While loop
    i = 1
    while (i <= NF) {
        print "Field", i, ":", $i
        i++
    }

    # Do-while loop
    i = 1
    do {
        print "Field", i, ":", $i
        i++
    } while (i <= NF)
}' file.txt
```

## Practical Examples

### Log File Analysis
```bash
# Analyze Apache access logs
awk '
{
    split($9, code, " ")
    status = code[1]
    count[status]++
    bytes += $10
}
END {
    for (status in count) {
        print "Status", status, ":", count[status], "requests"
    }
    print "Total bytes transferred:", bytes
}' /var/log/apache2/access.log
```

### Data Validation
```bash
# Validate CSV format
awk -F, '
NF != 5 {
    print "Line", NR, "has", NF, "fields (expected 5)"
    next
}
{
    for (i = 1; i <= NF; i++) {
        if ($i == "") {
            print "Line", NR, "field", i, "is empty"
        }
    }
}' data.csv
```

### File Processing
```bash
# Convert between formats
awk 'BEGIN{OFS=","}
{
    for (i = 1; i <= NF; i++) {
        gsub(/"/, "\\\"", $i)  # Escape quotes
    }
    print $1, $2, $3
}' space_separated.txt > csv_output.csv
```

### System Monitoring
```bash
# Monitor system processes
ps aux | awk '
NR > 1 {
    mem[$1] += $4
    cpu[$1] += $3
    count[$1]++
}
END {
    print "USER\t\tCPU%\tMEM%\tPROCS"
    for (user in mem) {
        printf "%-15s\t%.1f\t%.1f\t%d\n", user, cpu[user], mem[user], count[user]
    }
}'
```

### Configuration File Processing
```bash
# Parse configuration files
awk -F= '
/^[^#]/ && $1 != "" {
    sub(/^[ \t]+/, "", $1)  # Trim leading whitespace
    sub(/[ \t]+$/, "", $1)  # Trim trailing whitespace
    sub(/^[ \t]+/, "", $2)  # Trim leading whitespace
    sub(/[ \t]+$/, "", $2)  # Trim trailing whitespace
    config[$1] = $2
}
END {
    for (key in config) {
        print key "=" config[key]
    }
}' config.conf
```

## Performance and Optimization

### Efficient Processing
```bash
# Process large files efficiently
awk '
BEGIN {
    # Initialize variables in BEGIN block
    count = 0
    sum = 0
}
{
    # Avoid repeated function calls
    if ($1 > threshold) {
        count++
        sum += $2
    }
}
END {
    # Final calculations
    print "Count:", count
    print "Sum:", sum
    if (count > 0) print "Average:", sum/count
}' large_file.txt
```

### Memory Management
```bash
# Delete array elements when no longer needed
awk '
{
    data[$1] = $2
    if (NR % 1000000 == 0) {
        # Periodically clear data if possible
        for (key in data) delete data[key]
    }
}' very_large_file.txt
```

## Related Commands

- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text transformation
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching tool
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files
- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines
- [`perl`](/docs/commands/development-tools/perl) - Perl programming language
- [`python`](/docs/commands/development-tools/python) - Python programming language
- [`tr`](/docs/commands/text-processing/tr) - Translate characters
- [`wc`](/docs/commands/text-processing/wc) - Word, line, and byte count
- [`paste`](/docs/commands/text-processing/paste) - Merge lines of files

## Best Practices

1. **Use appropriate field separators**: Choose separators that match your data format
2. **Leverage built-in variables**: Use NF, NR, and other built-ins efficiently
3. **Process in BEGIN/END blocks**: Initialize variables and print summaries
4. **Use arrays for aggregation**: Group and summarize data efficiently
5. **Apply patterns selectively**: Only process lines that match your criteria
6. **Use functions for complex logic**: Improve code readability and reusability
7. **Optimize for large files**: Consider memory usage and performance
8. **Validate input**: Check data integrity before processing
9. **Use gawk extensions**: Take advantage of GNU awk features when available
10. **Document complex scripts**: Add comments for maintainability

## Troubleshooting

### Common Issues
```bash
# Field separator problems
awk -F: '{print $1}' file.txt           # Use explicit separator

# Numeric vs string comparison
awk '$1 == "123" {print}' file.txt        # String comparison
awk '$1 == 123 {print}' file.txt          # Numeric comparison

# File not found
ls -la file.txt                          # Check file exists

# Permission denied
sudo awk '{print}' protected_file.txt     # Use sudo if needed
```

### Performance Issues
```bash
# Slow processing of large files
awk 'NR%1000==0 {print "Processed:", NR}' large_file.txt  # Progress indicator

# Memory issues
awk '{print $0}' large_file.txt > processed.txt          # Redirect output
```

The `awk` command is a versatile and powerful text processing tool that combines programming capabilities with simplicity. Mastering its features enables efficient data analysis, report generation, and complex text transformations with minimal code.