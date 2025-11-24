---
title: grep - Text Search Utility
description: Search for patterns in files using regular expressions
sidebar_label: grep
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# grep - Text Search Utility

The `grep` command is a powerful text search utility that searches for patterns in files using regular expressions. Its name comes from "global search regular expression and print out the line." Grep is one of the most frequently used commands in Linux for text processing and log analysis.

## Syntax

```bash
grep [OPTIONS] PATTERN [FILE...]
```

## Key Options

### Output Control
- `-c`, `--count` - Count matching lines
- `-n`, `--line-number` - Show line numbers
- `-o`, `--only-matching` - Show only matched parts
- `-h`, `--no-filename` - Don't show filenames
- `-H`, `--with-filename` - Show filenames (default for multiple files)
- `-m NUM`, `--max-count=NUM` - Stop after NUM matches
- `-q`, `--quiet`, `--silent` - No output, just exit status

### Context Control
- `-A NUM`, `--after-context=NUM` - Show NUM lines after match
- `-B NUM`, `--before-context=NUM` - Show NUM lines before match
- `-C NUM`, `--context=NUM` - Show NUM lines before and after match

### Matching Control
- `-i`, `--ignore-case` - Case-insensitive matching
- `-v`, `--invert-match` - Show non-matching lines
- `-w`, `--word-regexp` - Match whole words only
- `-x`, `--line-regexp` - Match whole lines only
- `-e PATTERN`, `--regexp=PATTERN` - Specify pattern
- `-f FILE`, `--file=FILE` - Read patterns from file

### File Selection
- `-r`, `-R`, `--recursive` - Search recursively
- `--include=PATTERN` - Search files matching pattern
- `--exclude=PATTERN` - Skip files matching pattern
- `--exclude-from=FILE` - Skip files listed in file
- `-L`, `--files-without-match` - Show files with no matches
- `-l`, `--files-with-matches` - Show files with matches

### Regular Expression Types
- `-E`, `--extended-regexp` - Extended regular expressions
- `-G`, `--basic-regexp` - Basic regular expressions (default)
- `-F`, `--fixed-strings` - Fixed strings (no regex)
- `-P`, `--perl-regexp` - Perl-compatible regular expressions

## Examples

### Basic Searching
```bash
# Search for pattern in a file
grep "error" logfile.txt

# Search in multiple files
grep "function" *.py

# Case-insensitive search
grep -i "error" logfile.txt

# Whole word search
grep -w "test" file.txt

# Show line numbers
grep -n "error" logfile.txt
```

### Pattern Matching
```bash
# Search using regular expression
grep -E "error[0-9]+" logfile.txt

# Search for lines starting with "error"
grep "^error" logfile.txt

# Search for lines ending with "failed"
grep "failed$" logfile.txt

# Search for email addresses
grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" file.txt

# Search for IP addresses
grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" log.txt
```

### Recursive Search
```bash
# Search recursively in directory
grep -r "function" /home/user/code/

# Recursive search with line numbers
grep -rn "TODO" /home/user/project/

# Search only in specific file types
grep -r "class" --include="*.py" /home/user/project/

# Exclude certain directories
grep -r "main" --exclude-dir=".git" .
```

### Counting and Statistics
```bash
# Count matching lines
grep -c "error" logfile.txt

# Count in multiple files
grep -c "function" *.py

# Count total matches (not lines)
grep -o "error" logfile.txt | wc -l

# Show only matching parts
grep -o "error[0-9]+" logfile.txt
```

### Context Display
```bash
# Show lines before match
grep -B 3 "error" logfile.txt

# Show lines after match
grep -A 3 "error" logfile.txt

# Show context before and after
grep -C 3 "error" logfile.txt

# Show only filenames with matches
grep -l "function" *.py
```

### Inverting and Filtering
```bash
# Show lines that don't match
grep -v "error" logfile.txt

# Remove empty lines
grep -v "^$" file.txt

# Remove comment lines
grep -v "^#" config.txt

# Show lines without "debug"
grep -v "debug" logfile.txt
```

### Multiple Patterns
```bash
# Search for multiple patterns
grep -e "error" -e "warning" logfile.txt

# Using extended regex
grep -E "error|warning" logfile.txt

# Read patterns from file
grep -f patterns.txt file.txt

# Search for words starting with 'a' or 'b'
grep -E "^(a|b)" words.txt
```

### Advanced Usage
```bash
# Show byte offset
grep -b -o "error" logfile.txt

# Quiet mode (useful in scripts)
grep -q "error" logfile.txt && echo "Found error"

# Binary file search
grep -a "text" binary_file

# Stop after 10 matches
grep -m 10 "error" large_logfile.txt

# Only exact line matches
grep -x "exact_match" file.txt
```

### File Filtering
```bash
# Search only in specific file types
grep "function" --include="*.{c,h}" /usr/src/linux/

# Exclude files
grep "function" --exclude="*.o" /usr/src/linux/

# Exclude multiple patterns
grep "TODO" --exclude="*.tmp" --exclude-dir=".git" .

# Process only files that exist
grep "pattern" *.txt 2>/dev/null
```

## Regular Expressions

### Basic Regex
```bash
# Anchor at start of line
grep "^start" file.txt

# Anchor at end of line
grep "end$" file.txt

# Single character wildcard
grep "h.t" file.txt    # matches hat, hot, hit, etc.

# Zero or more repetitions
grep "ab*c" file.txt   # matches ac, abc, abbc, etc.

# Character class
grep "[aeiou]" file.txt

# Negated character class
grep "[^0-9]" file.txt  # matches non-digits

# Range
grep "[A-Z][a-z]+" file.txt  # words starting with capital
```

### Extended Regex (with -E)
```bash
# Alternation
grep -E "cat|dog" file.txt

# Grouping
grep -E "(error|warning)[0-9]+" file.txt

# Quantifiers
grep -E "a{3}" file.txt     # exactly 3 'a's
grep -E "a{2,4}" file.txt   # 2 to 4 'a's
grep -E "a{2,}" file.txt    # 2 or more 'a's
grep -E "a{,3}" file.txt    # up to 3 'a's

# Word boundaries
grep -E "\berror\b" file.txt

# Non-word characters
grep -E "\W+" file.txt
```

### Practical Patterns
```bash
# Email addresses
grep -E "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b" file.txt

# URLs
grep -E "https?://[^\s]+" file.txt

# Phone numbers (US format)
grep -E "\b\d{3}[-.]?\d{3}[-.]?\d{4}\b" file.txt

# Dates (YYYY-MM-DD)
grep -E "\b\d{4}-\d{2}-\d{2}\b" file.txt

# Log levels
grep -E "\b(DEBUG|INFO|WARN|ERROR|FATAL)\b" log.txt

# Function definitions (Python)
grep -E "^\s*def\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(" *.py
```

## Pipe Integration

### Common Combinations
```bash
# Filter command output
ps aux | grep "nginx"

# Search history
history | grep "git"

# Find large files
du -h | grep -E "^[0-9.]+[GT]"

# Network connections
netstat -tuln | grep ":80\|:443"

# Process management
ps aux | grep -E "(PID|COMMAND|nginx)"

# Log analysis
tail -f logfile.txt | grep "ERROR"

# Search environment variables
env | grep -E "^(PATH|HOME|USER)="
```

### Chain Operations
```bash
# Count unique IP addresses in log
grep -oE "([0-9]{1,3}\.){3}[0-9]{1,3}" access.log | sort | uniq | wc -l

# Extract URLs from HTML
grep -oE 'https?://[^"]+' webpage.html

# Find PHP functions
grep -ohE "php_[a-zA-Z_]+" *.php | sort | uniq

# Log error count by type
grep -oE "ERROR: [a-zA-Z]+" app.log | sort | uniq -c
```

## Performance Tips

### Efficient Searching
```bash
# Use fgrep for fixed strings (faster)
fgrep "exact_string" large_file.txt

# Use grep -F instead of -E for simple patterns
grep -F "simple pattern" file.txt

# Limit search scope
grep "pattern" /path/to/specific/directory/

# Use --mmap for large files
grep --mmap "pattern" large_file.txt

# Parallel search with xargs
find . -name "*.log" | xargs -P 4 grep "pattern"
```

### Memory and Speed
```bash
# Exclude binary files
grep -I "pattern" *

# Don't search device files
grep -D skip "pattern" /dev/*

# Use grep for memory-mapped files
grep --mmap "pattern" huge_file.txt
```

## Color Output

### Configuration
```bash
# Enable color output
grep --color=auto "pattern" file.txt

# Set environment variable
export GREP_COLOR='1;31'  # Red color
grep --color=auto "pattern" file.txt

# Custom color settings
export GREP_COLORS='mt=1;31:ms=1;32:mc=1;33'
grep --color=auto "pattern" file.txt
```

### Aliases for Common Use
```bash
# Add to ~/.bashrc or ~/.bash_aliases
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'

# Search with context
alias grepctx='grep -C 3 --color=auto'

# Recursive search
alias grepdir='grep -r --color=auto'
```

## Best Practices

1. **Use quotes around patterns** to prevent shell expansion
2. **Specify exact match** when possible (`-w` for whole words)
3. **Use appropriate regex type** (`-F` for fixed strings, `-E` for complex patterns)
4. **Limit search scope** to improve performance
5. **Combine with other tools** for complex processing
6. **Use color output** for better readability
7. **Consider alternatives** like `ag`, `rg` for large codebases
8. **Quote special characters** in regex patterns

## Related Commands

- [`sed`](/docs/commands/shell/sed) - Stream editor for text manipulation
- [`awk`](/docs/commands/shell/awk) - Pattern scanning and processing language
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`sort`](/docs/commands/shell/sort) - Sort lines of text files

The `grep` command is an essential tool for text processing, log analysis, and pattern matching in Linux. Mastering grep significantly improves productivity when working with text files and system administration tasks.