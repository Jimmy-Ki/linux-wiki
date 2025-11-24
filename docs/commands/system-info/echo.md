---
title: echo - Display a Line of Text
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# echo - Display a Line of Text

The `echo` command displays lines of text or string variables to the standard output. It's one of the most frequently used commands in shell scripting for displaying messages, debugging, and generating output.

## Basic Syntax

```bash
echo [SHORT-OPTION]... [STRING]...
echo LONG-OPTION
```

## Common Options

- `-n` - Do not output the trailing newline
- `-e` - Enable interpretation of backslash escapes
- `-E` - Disable interpretation of backslash escapes (default)
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Escape Sequences (with -e option)

- `\a` - Alert (bell)
- `\b` - Backspace
- `\c` - Produce no further output
- `\e` - Escape character
- `\f` - Form feed
- `\n` - Newline
- `\r` - Carriage return
- `\t` - Horizontal tab
- `\v` - Vertical tab
- `\\` - Backslash
- `\nnn` - Character with octal value nnn
- `\xHH` - Character with hexadecimal value HH

## Usage Examples

### Basic Output
```bash
# Simple text output
echo "Hello, World!"

# Multiple arguments
echo Hello World Linux

# Output without newline
echo -n "This continues on the same line"
echo " and this continues"

# Empty line
echo
```

### Variable Expansion
```bash
# Display environment variables
echo $HOME
echo $PATH
echo $USER

# Combine variables with text
echo "Welcome, $USER! Your home directory is $HOME"

# Command substitution
echo "Current directory: $(pwd)"
echo "Date and time: $(date)"

# Arithmetic expansion
echo "2 + 2 = $((2 + 2))"
echo "File count: $(ls | wc -l)"
```

### Special Characters and Escaping
```bash
# Using escape sequences
echo -e "Line 1\nLine 2\nLine 3"
echo -e "Column 1\tColumn 2\tColumn 3"
echo -e "Alert sound\a"

# Backspace and overwriting
echo -e "Loading...\b\b\bDone!"

# No further output after \c
echo -e "Progress: 50%\c"
echo "This won't be printed"

# Raw escape character
echo -e "Escape sequence: \e[31mRed text\e[0m"
```

## Practical Examples

### Colored Output
```bash
# Basic colors
echo -e "\e[31mRed text\e[0m"
echo -e "\e[32mGreen text\e[0m"
echo -e "\e[33mYellow text\e[0m"
echo -e "\e[34mBlue text\e[0m"
echo -e "\e[35mMagenta text\e[0m"
echo -e "\e[36mCyan text\e[0m"

# Background colors
echo -e "\e[41mRed background\e[0m"
echo -e "\e[42mGreen background\e[0m"
echo -e "\e[44mBlue background\e[0m"

# Text formatting
echo -e "\e[1mBold text\e[0m"
echo -e "\e[4mUnderlined text\e[0m"
echo -e "\e[5mBlinking text\e[0m"
echo -e "\e[7mReversed text\e[0m"

# Combined formatting
echo -e "\e[1;31;44mBold red text on blue background\e[0m"
```

### Scripting and Automation
```bash
# Progress indicators
echo -n "Installing package: "
for i in {1..5}; do
    echo -n "."
    sleep 1
done
echo " Done!"

# Status messages
echo "[INFO] Starting application..."
echo "[WARNING] Low disk space"
echo "[ERROR] Connection failed"

# File generation
echo "#!/bin/bash" > script.sh
echo "echo 'Hello from script'" >> script.sh
chmod +x script.sh

# Configuration files
echo "server_name = example.com" > config.conf
echo "port = 8080" >> config.conf
echo "debug_mode = true" >> config.conf
```

### Data Processing
```bash
# Create CSV data
echo "Name,Age,City" > data.csv
echo "John,25,New York" >> data.csv
echo "Jane,30,Los Angeles" >> data.csv

# Generate numbered list
for i in {1..10}; do
    echo "Item $i"
done

# File header creation
echo "Report generated on: $(date)" > report.txt
echo "================================" >> report.txt

# Log file creation
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$timestamp] Application started" >> app.log
```

### System Administration
```bash
# System status
echo "System information:"
echo "Hostname: $(hostname)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime)"
echo "Memory usage: $(free -h | grep Mem)"

# Service status
echo "Checking services..."
systemctl is-active nginx && echo "Nginx: Running" || echo "Nginx: Stopped"
systemctl is-active mysql && echo "MySQL: Running" || echo "MySQL: Stopped"

# User information
echo "Current user: $(whoami)"
echo "Groups: $(groups)"
echo "Shell: $SHELL"
```

## Advanced Usage

### Complex Formatting
```bash
# Table format
printf "%-15s %8s %10s\n" "Name" "Age" "City"
echo "-------------------------------"
printf "%-15s %8d %10s\n" "John" 25 "New York"
printf "%-15s %8d %10s\n" "Jane" 30 "Los Angeles"

# Progress bar
bar_length=50
progress=30
filled=$((progress * bar_length / 100))
empty=$((bar_length - filled))
echo -n "["
printf "%*s" $filled | tr ' ' '='
printf "%*s" $empty | tr ' ' '-'
echo "] $progress%"
```

### Special Applications
```bash
# ASCII art
echo "   __   _"
echo "  / _| | |"
echo " | |_  | | __ _  ___"
echo " |  _| | |/ _\` |/ __|"
echo " | |___| | (_| | (__"
echo " |______|_|\__,_|\___|"

# Box drawing
echo "+--------+--------+"
echo "|  Name  |  Age   |"
echo "+--------+--------+"
echo "|  John  |   25   |"
echo "+--------+--------+"

# Mathematical patterns
for i in {1..5}; do
    echo -n "$(printf "%*s" $i | tr ' ' '*') "
    echo
done
```

### Debugging and Development
```bash
# Debug output
debug() {
    [ "$DEBUG" = "true" ] && echo "[DEBUG] $1"
}

debug "Variable value: $variable"
debug "Function called with parameters: $@"

# Variable inspection
echo "Variable types:"
echo "STRING_VAR='$STRING_VAR'"
echo "NUMBER_VAR=$NUMBER_VAR"
echo "ARRAY_VAR=(${ARRAY_VAR[@]})"

# Function tracing
trace_execution() {
    echo "TRACE: Entering function $1"
    "$@"
    echo "TRACE: Exiting function $1"
}
```

## File Operations

### File Creation and Writing
```bash
# Create multiple files
for file in file1.txt file2.txt file3.txt; do
    echo "Content of $file" > "$file"
done

# Create structured data
cat << 'EOF' > structured_data.json
{
    "name": "example",
    "version": "1.0",
    "created": "$(date -Iseconds)"
}
EOF

# Multi-line content
echo "Line 1" > multiline.txt
echo "Line 2" >> multiline.txt
echo "Line 3" >> multiline.txt
```

### Redirection and Pipes
```bash
# Redirect to files
echo "Error message" >&2
echo "Log entry" >> application.log

# Pipe to other commands
echo "hello world" | tr '[:lower:]' '[:upper:]'
echo "file1 file2 file3" | xargs touch

# Here document alternative
echo "This is a long line
that spans multiple
lines" > multiline.txt
```

## Performance Considerations

### Efficient Output
```bash
# Multiple echoes vs single echo
# Less efficient:
echo "Line 1"
echo "Line 2"
echo "Line 3"

# More efficient:
echo -e "Line 1\nLine 2\nLine 3"

# For large amounts of data:
printf "%s\n" "Line 1" "Line 2" "Line 3"

# Using echo in loops efficiently
for i in {1..1000}; do
    echo "Line $i"
done > large_file.txt
```

## Best Practices

1. **Quote variables** to prevent word splitting and glob expansion
2. **Use `printf`** for complex formatting instead of echo
3. **Prefer `echo -e`** over external echo for consistency
4. **Use appropriate quoting** for special characters
5. **Consider `printf`** for portability in scripts

## Common Issues and Solutions

### Variable Expansion Problems
```bash
# Problem: Unquoted variables
echo $path_with_spaces  # May split into multiple arguments

# Solution: Quote variables
echo "$path_with_spaces"  # Preserves spacing
```

### Special Character Handling
```bash
# Problem: Interpreted escape sequences
echo "C:\Users\Documents"  # \U might be interpreted

# Solution: Use -E or single quotes
echo -E "C:\Users\Documents"
echo 'C:\Users\Documents'
```

### Portability Considerations
```bash
# For maximum portability, use printf
printf "%s\n" "Hello, World!"
printf "Line 1\nLine 2\nLine 3\n"
```

## Related Commands

- [`printf`](/docs/commands/other-commands/printf) - Format and print data
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`tee`](/docs/commands/text-processing/tee) - Read from standard input and write to standard output and files
- [`print`](/docs/commands/shell/print) - Shell builtin for printing
- [`tput`](/docs/commands/terminal/tput) - Initialize a terminal or query terminfo database

The `echo` command is fundamental to shell scripting and command-line operations, providing a simple yet powerful way to generate output and display information.