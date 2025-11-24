---
title: printf - Format and Print Data
sidebar_label: printf
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# printf - Format and Print Data

The `printf` command formats and prints data according to a format string. It provides more control over output formatting than `echo`, making it ideal for creating structured output, tables, and formatted text.

## Basic Syntax

```bash
printf FORMAT [ARGUMENT]...
printf [-v VAR] FORMAT [ARGUMENT]...
```

## Common Options

- `-v VAR` - Store output in variable VAR instead of printing to standard output
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Format Specifiers

### Basic Specifiers
- `%s` - String
- `%c` - Character
- `%d`, `%i` - Signed decimal integer
- `%u` - Unsigned decimal integer
- `%o` - Unsigned octal
- `%x`, `%X` - Unsigned hexadecimal (lowercase/uppercase)
- `%f` - Floating point number
- `%e`, `%E` - Scientific notation (lowercase/uppercase)
- `%g`, `%G` - Use %e or %f, whichever is shorter
- `%%` - Literal percent sign

### Extended Specifiers (bash)
- `%b` - Expand backslash escape sequences in arguments
- `%q` - Quote argument for shell input
- `%(fmt)T` - Format date/time string using strftime format

## Escape Sequences

- `\\` - Backslash
- `\a` - Alert (bell)
- `\b` - Backspace
- `\c` - Produce no further output
- `\e` - Escape character
- `\f` - Form feed
- `\n` - Newline
- `\r` - Carriage return
- `\t` - Horizontal tab
- `\v` - Vertical tab
- `\NNN` - Character with octal value NNN
- `\xHH` - Character with hexadecimal value HH

## Usage Examples

### Basic String Formatting
```bash
# Simple string output
printf "Hello, World!\n"

# Multiple arguments
printf "Name: %s, Age: %d, City: %s\n" "John" 25 "New York"

# Without newline (explicit \n)
printf "No newline here"
printf "This continues on same line\n"
```

### Number Formatting
```bash
# Integer formatting
printf "Decimal: %d, Octal: %o, Hex: %x\n" 255 255 255

# Floating point with precision
printf "Pi: %.2f, Scientific: %e\n" 3.14159 3.14159

# Field width and alignment
printf "Right aligned: %10s\n" "hello"
printf "Left aligned: %-10s\n" "hello"
printf "Zero padded: %010d\n" 42

# Combined formatting
printf "%-10s %8d %10.2f\n" "Product" 100 19.99
```

### Tables and Columns
```bash
# Create a formatted table
printf "%-15s %-10s %8s\n" "NAME" "AGE" "SALARY"
printf "%-15s %-10d %8.2f\n" "John Doe" 30 50000.50
printf "%-15s %-10d %8.2f\n" "Jane Smith" 28 62500.75
printf "%-15s %-10d %8.2f\n" "Bob Johnson" 35 48000.00

# Column headers with separators
printf "%-20s | %-10s | %-15s\n" "Full Name" "Age" "Department"
printf "%s\n" "$(printf '%*s' 50 | tr ' ' '-')"
printf "%-20s | %-10d | %-15s\n" "Alice Anderson" 32 "Engineering"
printf "%-20s | %-10d | %-15s\n" "Charlie Brown" 45 "Marketing"
```

## Practical Examples

### Data Processing
```bash
# Format file information
filename="document.txt"
size=1024
date="2024-01-15"
printf "File: %-20s Size: %8d bytes Date: %s\n" "$filename" "$size" "$date"

# CSV format
printf "%s,%d,%s\n" "Product A" 100 "Available"
printf "%s,%d,%s\n" "Product B" 50 "Out of stock"

# JSON formatting (simple)
printf '{"name": "%s", "age": %d, "active": %s}\n' "John" 25 "true"
```

### System Information
```bash
# Memory usage formatting
free | while read line; do
    printf "%-20s %10s %10s %10s\n" $line
done

# Process information
ps aux | head -5 | while read user pid cpu mem cmd; do
    printf "%-8s %8s %6s %6s %s\n" "$user" "$pid" "$cpu" "$mem" "$cmd"
done

# Disk usage report
df -h | while read fs size used avail usep mount; do
    printf "%-15s %8s %8s %8s %5s %s\n" "$fs" "$size" "$used" "$avail" "$usep" "$mount"
done
```

### Script Output
```bash
# Progress bar
bar_width=50
progress=75
filled=$((progress * bar_width / 100))
printf "["
printf "%*s" $filled | tr ' ' '='
printf "%*s" $((bar_width - filled)) | tr ' ' '-'
printf "] %3d%%\r" $progress

# Status messages
printf "[%s] Starting process...\n" "$(date '+%H:%M:%S')"
printf "[%s] Process completed successfully\n" "$(date '+%H:%M:%S')"

# Error messages with formatting
printf "[ERROR] %s: %s\n" "File not found" "/path/to/file"
printf "[WARNING] %s: %d%% used\n" "Disk space" 95
```

## Advanced Usage

### Variable Assignment
```bash
# Store formatted output in variable
printf -v formatted "Hello, %s!" "World"
echo "$formatted"

# Complex formatting for variables
printf -v csv_line "%s,%d,%s" "Product" 100 "In stock"
echo "$csv_line"

# Build formatted strings incrementally
printf -v output "Header\n"
printf -v output "%s%s\n" "$output" "Line 1"
printf -v output "%s%s\n" "$output" "Line 2"
echo "$output"
```

### Color Formatting
```bash
# Colored output
printf "\e[31m%s\e[0m\n" "Red text"
printf "\e[32m%s\e[0m\n" "Green text"
printf "\e[1;33m%s\e[0m\n" "Bold yellow text"

# Colored status messages
printf "\e[32m[SUCCESS]\e[0m %s\n" "Operation completed"
printf "\e[33m[WARNING]\e[0m %s\n" "Low disk space"
printf "\e[31m[ERROR]\e[0m %s\n" "Connection failed"

# Colored table
printf "\e[1m%-15s\e[0m | \e[1m%-10s\e[0m\n" "Status" "Count"
printf "%-15s | %-10d\n" "\e[32mSuccess\e[0m" 150
printf "%-15s | %-10d\n" "\e[31mFailed\e[0m" 5
```

### Date and Time Formatting
```bash
# Current date and time
printf "Current date: %(%Y-%m-%d)T\n" -1
printf "Current time: %(%H:%M:%S)T\n" -1

# Custom datetime formats
printf "Timestamp: %(%Y-%m-%d %H:%M:%S %Z)T\n" -1
printf "ISO format: %(%Y-%m-%dT%H:%M:%S%z)T\n" -1

# Specific date formatting
printf "Human readable: %(%B %d, %Y)T\n" -1
printf "Short format: %(%x %X)T\n" -1
```

### Data Validation
```bash
# Format validation examples
validate_number() {
    if printf "%d" "$1" >/dev/null 2>&1; then
        printf "%d is a valid integer\n" "$1"
    else
        printf "%s is not a valid integer\n" "$1"
    fi
}

# Input formatting
format_phone() {
    printf "(%03d) %03d-%04d\n" "$1" "$2" "$3"
}

format_ssn() {
    printf "%03d-%02d-%04d\n" "$1" "$2" "$3"
}
```

## Special Applications

### Mathematical Output
```bash
# Mathematical tables
printf "Number\tSquare\tCube\n"
printf "%d\t%d\t%d\n" 1 1 1
printf "%d\t%d\t%d\n" 2 4 8
printf "%d\t%d\t%d\n" 3 9 27

# Scientific notation
printf "Scientific: %e\n" 1234567.89
printf "Compact: %g\n" 1234567.89

# Hexadecimal conversion
printf "Hex: 0x%x\n" 255
printf "Upper hex: 0x%X\n" 255
printf "Octal: %o\n" 255
```

### File Generation
```bash
# Generate configuration files
printf "[server]\n" > config.ini
printf "host = %s\n" "localhost" >> config.ini
printf "port = %d\n" 8080 >> config.ini

# Create log entries
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
printf "[%s] [INFO] Application started\n" "$timestamp" >> app.log

# Generate test data
for i in {1..100}; do
    printf "user%03d,pass%03d,role%d\n" $i $i $((i % 3 + 1))
done > users.csv
```

### Network and System Scripts
```bash
# Network status
printf "Host: %-20s Status: %-10s Latency: %s ms\n" \
    "google.com" "Up" "25.3"

# Service status report
printf "%-20s %-10s %-15s\n" "Service" "Status" "Memory Usage"
printf "%-20s \e[32m%-10s\e[0m %-15s\n" "nginx" "Running" "12.5 MB"
printf "%-20s \e[31m%-10s\e[0m %-15s\n" "apache" "Stopped" "0 MB"

# System resource report
printf "CPU Usage: %5.1f%%\n" "$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')"
printf "Memory Usage: %5.1f%%\n" "$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')"
```

## Performance Considerations

### Efficient Output
```bash
# Use printf for large amounts of data
for i in {1..10000}; do
    printf "%d,%s,%d\n" "$i" "item_$i" "$((RANDOM % 100))"
done > large_dataset.csv

# Buffer output for better performance
{ printf "Header\n"
  for i in {1..1000}; do
      printf "Line %d\n" "$i"
  done
} > file.txt
```

## Best Practices

1. **Use printf for complex formatting** instead of echo
2. **Always include explicit newlines** (\n) when needed
3. **Quote format strings** to prevent shell interpretation
4. **Use field width specifiers** for aligned output
5. **Validate input before formatting** to prevent errors
6. **Use color codes sparingly** for better readability

## Common Issues and Solutions

### Format String Problems
```bash
# Problem: Missing arguments
printf "%s %d\n" "hello"  # Error: not enough arguments

# Solution: Provide all required arguments
printf "%s %d\n" "hello" 42
```

### Special Characters
```bash
# Problem: % characters in format string
printf "Progress: 50%\n"  # Error: format specifier

# Solution: Escape or use %%
printf "Progress: 50%%\n"
printf "%s" "Progress: 50%"
```

### Variable Expansion
```bash
# Problem: Uncontrolled variable expansion
var="%s"
printf "$var" "dangerous"  # Vulnerable to format string attacks

# Solution: Use %s specifier
printf "%s" "$var"
```

## Related Commands

- [`echo`](/docs/commands/other-commands/echo) - Display a line of text
- [`sprintf`](/docs/commands/programming/sprintf) - Format string and store in variable (various languages)
- [`fprintf`](/docs/commands/programming/fprintf) - Write formatted output to stream (C)
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing language
- [`date`](/docs/commands/system-utility/date) - Display or set date and time

The `printf` command provides powerful formatting capabilities for creating structured, professional-looking output in shell scripts and command-line operations.