---
title: sed - Stream Editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sed - Stream Editor

The `sed` command (Stream Editor) is a powerful utility for text transformation and manipulation. It reads text input line by line, applies specified operations to each line, and outputs the result. Sed is particularly useful for automated text processing, search and replace operations, and complex text transformations in shell scripts.

## Basic Syntax

```bash
sed [options] 'script' file1 file2 ...
sed [options] -f scriptfile file1 file2 ...
sed [options] -e 'command1' -e 'command2' file...
```

## Common Options

### Basic Options
- `-n, --quiet, --silent` - Suppress automatic output of pattern space
- `-e script, --expression=script` - Add the script to the commands to be executed
- `-f scriptfile, --file=scriptfile` - Add commands from file
- `-i[SUFFIX], --in-place[=SUFFIX]` - Edit files in place (with optional backup)
- `-l N, --line-length=N` - Specify the desired line-wrap length
- `-r, --regexp-extended` - Use extended regular expressions
- `-E, --regexp-extended` - Same as -r (GNU sed)
- `-s, --separate` - Consider files as separate rather than continuous
- `--posix` - Use POSIX sed syntax
- `-u, --unbuffered` - Minimal I/O buffering

### Output Options
- `-c, --copy` - Use copy instead of rename when shuffling files
- `-b, --binary` - Open files in binary mode
- `--follow-symlinks` - Follow symbolic links when processing

## Basic Commands

### Line Addressing
```bash
# Single line
sed '3s/old/new/' file.txt        # Line 3 only

# Range of lines
sed '1,5s/old/new/' file.txt      # Lines 1-5

# From line to end
sed '10,$s/old/new/' file.txt     # Line 10 to end

# Pattern range
sed '/start/,/end/s/old/new/' file.txt
```

### Substitution Command (s)
```bash
# Basic substitution
sed 's/old/new/' file.txt         # Replace first occurrence
sed 's/old/new/g' file.txt        # Global replacement
sed 's/old/new/2' file.txt        # Replace second occurrence

# Case-insensitive
sed 's/old/new/gI' file.txt

# Case conversion
sed 's/.*/\u&/' file.txt          # Uppercase
sed 's/.*/\l&/' file.txt          # Lowercase
sed 's/.*/\U&/' file.txt          # All uppercase
sed 's/.*/\L&/' file.txt          # All lowercase

# Word boundaries
sed 's/\bold\b/new/g' file.txt
```

### Deletion Commands (d)
```bash
# Delete lines
sed '3d' file.txt                 # Delete line 3
sed '1,5d' file.txt               # Delete lines 1-5
sed '/pattern/d' file.txt         # Delete lines matching pattern
sed '/^$/d' file.txt              # Delete empty lines

# Delete from pattern to end
sed '/error/,$d' file.txt
```

### Print Commands (p)
```bash
# Print specific lines
sed -n '3p' file.txt              # Print only line 3
sed -n '1,5p' file.txt            # Print lines 1-5
sed -n '/pattern/p' file.txt      # Print matching lines
sed -n '/^#/p' file.txt           # Print comment lines
```

### Append, Insert, Change
```bash
# Append text after line (a\)
sed '3a\New line' file.txt

# Insert text before line (i\)
sed '3i\New line' file.txt

# Change entire line (c\)
sed '3c\Replaced line' file.txt

# Multiple lines
sed '2a\
Line 1\
Line 2' file.txt
```

## Advanced Operations

### Hold and Pattern Space
```bash
# Copy pattern space to hold space (h)
sed '/start/,/end/{h; d;}' file.txt

# Get hold space into pattern space (g)
sed '/end/{g; p;}' file.txt

# Append hold space to pattern space (G)
sed '/end/{G;}' file.txt

# Exchange pattern and hold space (x)
sed '{x; s/$/\nNew line/; x;}' file.txt
```

### Multi-line Operations
```bash
# Join lines (N)
sed '{N; s/\n/ /g;}' file.txt

# Process paragraph
sed '/./{H; $!d;}; x; s/\n/ /g' file.txt

# Delete every other line
sed '1d; n; d' file.txt
```

### Branching and Flow Control
```bash
# Branch to label (b)
sed '/error/b skip; s/normal/processed/; :skip' file.txt

# Test and branch (t)
sed 's/old/new/; t success; s/nothing/changed/; :success' file.txt

# Conditional operations
sed '/^#/!{s/^/# /;}' file.txt
```

## Usage Examples

### Search and Replace
```bash
# Replace all occurrences
sed 's/error/warning/g' file.txt

# Replace in specific lines
sed '1,10s/old/new/g' file.txt

# Multiple replacements
sed 's/old/new/g; s/bad/good/g' file.txt

# Replace with backreferences
sed 's/\(word1\) \(word2\)/\2 \1/g' file.txt
```

### File Processing
```bash
# Edit file in place
sed -i 's/old/new/g' file.txt

# Edit with backup
sed -i.bak 's/old/new/g' file.txt

# Multiple files
sed -i 's/old/new/g' *.txt
```

### Pattern-based Processing
```bash
# Comment out lines
sed 's/^/# /' file.txt

# Uncomment lines
sed 's/^# //' file.txt

# Process lines containing pattern
sed '/error/s/^/ERROR: /' file.txt
```

### Configuration File Editing
```bash
# Update configuration values
sed 's/^option=.*/option=new_value/' config.conf

# Remove lines starting with #
sed '/^#/d' config.conf

# Add comment to specific lines
sed '/^option=/s/^/# /' config.conf
```

### Log File Processing
```bash
# Extract error messages
sed -n '/ERROR/p' logfile.txt

# Remove timestamps
sed 's/^[^ ]* //' logfile.txt

# Format log entries
sed 's/|/\t/g' logfile.txt
```

### Code Refactoring
```bash
# Change function names
sed 's/oldFunction/newFunction/g' source.c

# Update include paths
sed 's#include "\.\/\//include "/g' source.c

# Remove trailing whitespace
sed 's/[ \t]*$//' source.c
```

### Text Analysis
```bash
# Count words per line
sed 's/[^ ]*[ ]*//g' file.txt | wc -c

# Extract email addresses
sed -n 's/.*\([a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}\).*/\1/p' file.txt

# Extract URLs
sed -n 's/.*\(https\?:\/\/[^ ]*\).*/\1/p' file.txt
```

## Regular Expressions

### Extended Regular Expressions (-r)
```bash
# Use extended regex
sed -r 's/(word1|word2)/replacement/g' file.txt

# Quantifiers
sed -r 's/a+/A/g' file.txt           # One or more 'a'
sed -r 's/a?/A/g' file.txt           # Zero or one 'a'
sed -r 's/a{3}/AAA/g' file.txt       # Exactly 3 'a's
sed -r 's/a{2,}/AA/g' file.txt       # Two or more 'a's
sed -r 's/a{1,3}/A/g' file.txt       # 1 to 3 'a's

# Character classes
sed -r 's/[[:digit:]]/D/g' file.txt  # Replace digits
sed -r 's/[[:alpha:]]/A/g' file.txt  # Replace letters
sed -r 's/[[:upper:]]/U/g' file.txt  # Replace uppercase
sed -r 's/[[:lower:]]/L/g' file.txt  # Replace lowercase
```

### Anchors and Boundaries
```bash
# Line anchors
sed 's/^start/begin/g' file.txt      # Beginning of line
sed 's/end$/finish/g' file.txt       # End of line

# Word boundaries
sed 's/\bword\b/replacement/g' file.txt

# Non-word boundaries
sed 's/\Bword\B/replacement/g' file.txt
```

## Scripting Examples

### Complex Multi-line Processing
```bash
# Process XML/HTML tags
sed '/<tag>/,/<\/tag>/{
    s/<[^>]*>//g
    s/^[ \t]*//
    s/[ \t]*$//
}' file.xml

# Remove duplicate lines
sed '$!N; /^\(.*\)\n\1$/!P; D' file.txt

# Reverse lines
sed '1!G; h; $!d' file.txt
```

### Conditional Processing
```bash
# Process files differently based on content
sed '/^#!/{
    s/shebang/#!/bin/bash/
    a\
Added shebang line
}' script.sh

# Format C source files
sed '/^[ \t]*$/{
    N
    /^\n$/d
}' source.c
```

### Data Transformation
```bash
# CSV to TSV conversion
sed 's/,/\t/g' data.csv > data.tsv

# Remove duplicate words
sed ':a; s/\(\<\w\+\> \)\1/\1/; ta' file.txt

# Capitalize first letter of each word
sed 's/\b\([a-z]\)/\u\1/g' file.txt
```

## Practical Applications

### System Administration
```bash
# Enable/disable services in configuration
sed -i 's/^#\(Enable.*\)/\1/' config.conf
sed -i 's/^\(Enable.*\)/#\1/' config.conf

# Update system configuration
sed -i 's/HOSTNAME=.*/HOSTNAME=newhost/' /etc/hostname

# Comment out problematic lines
sed -i '/^problematic/s/^/# /' configfile
```

### Web Development
```bash
# Minify HTML/CSS
sed 's/<!--.*-->//g; s/\/\*.*\*\///g; s/[ \t]\+/ /g; s/^[ \t]*//; s/[ \t]*$//' file.html

# Update version numbers
sed -i 's/version="[0-9.]*"/version="1.2.3"/g' index.html

# Replace development URLs
sed -i 's/dev\.example\.com/www\.example\.com/g' *.html
```

### Data Processing
```bash
# Format columns
sed 's/ \+/ /g' | cut -d' ' -f1,3

# Remove headers and footers
sed '1,5d; $d' datafile

# Extract specific columns
sed -n 's/^\([^ ]*\) \([^ ]*\).*/\1,\2/p' logfile
```

## Related Commands

- [`awk`](/docs/commands/text-processing/awk) - Text processing language
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`sort`](/docs/commands/text-processing/sort) - Sort lines
- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicates
- [`tr`](/docs/commands/text-processing/tr) - Translate characters
- [`perl`](/docs/commands/development-tools/perl) - Perl interpreter
- [`python`](/docs/commands/development-tools/python) - Python interpreter
- [`vim`](/docs/commands/editors/vim) - Text editor with regex support

## Best Practices

1. **Use -n for specific output**: Suppress default output when printing specific lines
2. **Test before in-place editing**: Use output redirection first, then -i
3. **Create backups**: Use -i.bak when editing important files
4. **Use extended regex**: Prefer -r for more powerful patterns
5. **Quote your scripts**: Always quote sed scripts to prevent shell expansion
6. **Use address ranges**: Target specific lines efficiently
7. **Combine commands**: Use semicolons or multiple -e options
8. **Test on small samples**: Verify scripts on small files first
9. **Use comments**: Document complex sed scripts
10. **Consider alternatives**: Use awk for complex text processing

## Troubleshooting

### Common Issues
```bash
# Regex not matching
sed -r 's/pattern/replacement/g' file.txt  # Use -r for extended regex

# Special characters escaping
sed 's/\./\\./g' file.txt  # Escape dots
sed 's/\//\\\//g' file.txt  # Escape slashes

# In-place editing failed
sed -i.bak 's/old/new/g' file.txt  # Create backup

# Multiple files processing
for file in *.txt; do sed -i 's/old/new/g' "$file"; done
```

### Performance Tips
```bash
# For large files, use simple patterns
sed 's/simple/replacement/g' largefile.txt

# Use specific line ranges to limit processing
sed '1000,2000s/pattern/replacement/g' hugefile.txt
```

The `sed` command is an indispensable tool for text processing in shell scripts and command-line operations. Mastering sed enables efficient automated text transformation, log analysis, and configuration management across a wide range of system administration and development tasks.