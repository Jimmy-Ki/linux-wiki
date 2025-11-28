---
title: sed - Stream Editor
sidebar_label: sed
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sed - Stream Editor

The `sed` command (Stream Editor) is a powerful utility for text transformation and manipulation. It reads text input line by line, applies specified operations to each line, and outputs the result. Sed is particularly useful for automated text processing, search and replace operations, and complex text transformations in shell scripts. Unlike interactive editors, sed operates non-interactively, making it ideal for batch processing and automation tasks. It supports regular expressions, conditional processing, and can work with multiple files simultaneously.

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

### Script Debugging
- `-z, --null-data` - Separate lines by NUL characters
- `--debug` - Annotate program execution

## Sed Commands

### Addressing Commands

#### Line Numbers
```bash
# Single line
sed '3s/old/new/' file.txt        # Line 3 only

# Range of lines
sed '1,5s/old/new/' file.txt      # Lines 1-5

# From line to end
sed '10,$s/old/new/' file.txt     # Line 10 to end

# Multiple ranges
sed '1,3p; 5,7p' file.txt        # Print lines 1-3 and 5-7

# Step pattern (every Nth line)
sed '1~2p' file.txt               # Print every 2nd line starting from 1
sed '2~3d' file.txt               # Delete every 3rd line starting from 2
```

#### Pattern Addresses
```bash
# Pattern matching
sed '/error/s/old/new/' file.txt    # Lines containing 'error'
sed '/^#/d' file.txt                # Delete comment lines

# Pattern ranges
sed '/start/,/end/s/old/new/' file.txt  # Between start and end
sed '/^$/,/^$/d' file.txt               # Delete empty paragraphs

# Negated patterns
sed '/error/!d' file.txt                # Delete lines NOT containing 'error'
```

### Substitution Command (s)

#### Basic Substitution
```bash
# Basic substitution
sed 's/old/new/' file.txt         # Replace first occurrence
sed 's/old/new/g' file.txt        # Global replacement
sed 's/old/new/2' file.txt        # Replace second occurrence
sed 's/old/new/g' file.txt        # Replace all occurrences

# Case-insensitive
sed 's/old/new/gI' file.txt       # Case-insensitive replacement
sed 's/OlD/new/gI' file.txt       # Case-insensitive with case

# Multiple occurrences
sed 's/old/new/4g' file.txt       # Replace 4th occurrence onward
sed 's/old/new/1p' file.txt       # Replace and print first occurrence
```

#### Case Conversion
```bash
# Case conversion in replacement
sed 's/.*/\u&/' file.txt          # Uppercase first character
sed 's/.*/\l&/' file.txt          # Lowercase first character
sed 's/.*/\U&/' file.txt          # All uppercase
sed 's/.*/\L&/' file.txt          # All lowercase
sed 's/\b\([a-z]\)/\u\1/g' file.txt  # Capitalize first letter of each word

# Case conversion with backreferences
sed 's/\([a-z]*\)/\U\1/' file.txt  # Uppercase captured group
sed 's/\([A-Z]*\)/\L\1/' file.txt  # Lowercase captured group
```

#### Delimiters and Escaping
```bash
# Different delimiters
sed 's|old|new|' file.txt         # Use pipe as delimiter
sed 's#old#new#' file.txt         # Use hash as delimiter
sed 's@old@new@' file.txt         # Use @ as delimiter

# Escaping special characters
sed 's/\./\\./g' file.txt         # Escape dots
sed 's/\//\\\//g' file.txt        # Escape slashes
sed 's/\$/\\$/g' file.txt         # Escape dollar signs

# Using different delimiter for paths
sed 's#/usr/local#/opt/new#g' file.txt
```

#### Backreferences
```bash
# Basic backreferences
sed 's/\(word1\) \(word2\)/\2 \1/g' file.txt    # Swap words
sed 's/\([0-9]*\)-\([0-9]*\)/\2-\1/g' file.txt  # Swap numbers

# Complex backreferences
sed 's/\(.*\) \(.*\)/\2, \1/' file.txt          # Swap fields
sed 's/\([a-z]\+\)\([0-9]\+\)/\2\1/g' file.txt # Rearrange alphanumeric

# Case conversion with backreferences
sed 's/\([a-z]\+\)/\U\1/g' file.txt             # Uppercase captured text
sed 's/\([A-Z]\+\)/\L\1/g' file.txt             # Lowercase captured text
```

### Deletion Commands (d)

#### Line Deletion
```bash
# Delete lines by number
sed '3d' file.txt                 # Delete line 3
sed '1,5d' file.txt               # Delete lines 1-5
sed '10,$d' file.txt              # Delete from line 10 to end

# Delete lines by pattern
sed '/pattern/d' file.txt         # Delete lines matching pattern
sed '/^$/d' file.txt              # Delete empty lines
sed '/^\s*$/d' file.txt           # Delete whitespace-only lines

# Delete with ranges
sed '/start/,/end/d' file.txt     # Delete between patterns
sed '/error/,$d' file.txt         # Delete from pattern to end
sed '1,/end/d' file.txt           # Delete from start to pattern
```

#### Conditional Deletion
```bash
# Delete lines NOT containing pattern
sed '/pattern/!d' file.txt        # Keep only matching lines

# Delete lines containing multiple patterns
sed '/pattern1/d; /pattern2/d' file.txt

# Delete lines with case-insensitive match
sed '/pattern/Id' file.txt        # Case-insensitive deletion
```

### Print Commands (p)

#### Line Printing
```bash
# Print specific lines
sed -n '3p' file.txt              # Print only line 3
sed -n '1,5p' file.txt            # Print lines 1-5
sed -n '/pattern/p' file.txt      # Print matching lines
sed -n '/^#/p' file.txt           # Print comment lines

# Print after substitution
sed -n 's/old/new/p' file.txt     # Print only changed lines
sed -n 's/old/new/gp' file.txt    # Print all changed lines

# Print line numbers
sed '=' file.txt                  # Print line numbers
sed -n '10,15p; 20,25p' file.txt  # Print multiple ranges
```

### Append, Insert, Change

#### Text Addition
```bash
# Append text after line (a\)
sed '3a\New line' file.txt
sed '3a\New line\nSecond line' file.txt

# Insert text before line (i\)
sed '3i\New line' file.txt
sed '/pattern/i\Before pattern' file.txt

# Change entire line (c\)
sed '3c\Replaced line' file.txt
sed '/pattern/c\New content' file.txt

# Multiple lines
sed '2a\
Line 1\
Line 2\
Line 3' file.txt
```

### File Operations

#### File Reading and Writing
```bash
# Read file content
sed '3r otherfile.txt' file.txt     # Insert otherfile after line 3
sed '/pattern/r otherfile.txt' file.txt  # Insert after pattern

# Write to file
sed '1,5w output.txt' file.txt      # Write lines 1-5 to file
sed '/pattern/w matches.txt' file.txt  # Write matching lines

# Append to file
sed '1,5w output.txt' file.txt      # Write lines 1-5
sed '6,$w output.txt' file.txt      # Append lines 6-end
```

## Advanced Operations

### Hold and Pattern Space

#### Basic Hold Space Operations
```bash
# Copy pattern space to hold space (h)
sed '/start/{h; d;}' file.txt

# Get hold space into pattern space (g)
sed '/end/{g; p;}' file.txt

# Append hold space to pattern space (G)
sed '/end/{G;}' file.txt

# Exchange pattern and hold space (x)
sed '{x; s/$/\nNew line/; x;}' file.txt
```

#### Advanced Pattern Space
```bash
# Multi-line processing with hold space
sed '/^Title/{h; d;}; /^Content/{H; g; s/\n/ /g;}' file.txt

# Store and retrieve patterns
sed '/begin/,/end/{H; d;}; ${g; p;}' file.txt

# Accumulate lines
sed '{H; $!d}; x; s/\n/, /g' file.txt
```

### Multi-line Operations

#### Line Joining
```bash
# Join consecutive lines
sed '{N; s/\n/ /g;}' file.txt
sed 'N; s/\n/ /' file.txt        # Join two lines

# Join paragraphs
sed '/./{H; $!d;}; x; s/\n/ /g' file.txt

# Remove newlines within sentences
sed ':a; N; s/\n/ /; ta; P; D' file.txt
```

#### Pattern Ranges
```bash
# Process between markers
sed '/<tag>/,/<\/tag>/{
    s/<[^>]*>//g
    s/^[ \t]*//
    s/[ \t]*$//
}' file.xml

# Delete C-style comments
sed '/\/\*/,/\*\//d' file.c
sed '/\/\*/,/\*\//{/\/\*/d; /\*\//!d; /\*\//d;}' file.c
```

### Branching and Flow Control

#### Branch Commands
```bash
# Branch to label (b)
sed '/error/b skip; s/normal/processed/; :skip' file.txt

# Conditional branch (t)
sed 's/old/new/; t success; s/nothing/changed/; :success' file.txt

# Infinite loop with break
sed ':loop; /pattern/b end; s/old/new/; b loop; :end' file.txt
```

#### Conditional Operations
```bash
# Process based on content
sed '/^#!/{
    s/shebang/#!/bin/bash/
    a\
Added shebang line
}' script.sh

# Complex conditional logic
sed '/error/b error; /warning/b warning; b normal; :error; s/^/ERROR: /; b; :warning; s/^/WARNING: /; b; :normal; s/^/INFO: /' file.txt
```

## Regular Expressions

### Extended Regular Expressions (-r)

#### Quantifiers and Groups
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

# Custom character classes
sed -r 's/[0-9]/N/g' file.txt        # Replace digits
sed -r 's/[a-zA-Z]/L/g' file.txt     # Replace letters
sed -r 's/[^a-zA-Z0-9]/X/g' file.txt # Replace non-alphanumeric
```

### Anchors and Boundaries

#### Line and Word Anchors
```bash
# Line anchors
sed 's/^start/begin/g' file.txt      # Beginning of line
sed 's/end$/finish/g' file.txt       # End of line
sed 's/^$/EMPTY/' file.txt           # Empty lines

# Word boundaries
sed 's/\bword\b/replacement/g' file.txt    # Whole word match
sed 's/\Bword\B/replacement/g' file.txt    # Word in the middle

# Non-word boundaries
sed 's/\B\w\+\B/X/g' file.txt       # Replace word parts
```

### Lookarounds and Advanced Patterns

#### Lookahead and Lookbehind
```bash
# Positive lookahead (GNU sed extended)
sed -r 's/word(?=s)/WORD/g' file.txt      # Replace 'word' before 's'
sed -r 's/(?<=prefix)word/WORD/g' file.txt # Replace 'word' after 'prefix'

# Negative patterns
sed -r 's/word(?!s)/WORD/g' file.txt       # Replace 'word' not followed by 's'
sed -r 's/(?<!prefix)word/WORD/g' file.txt # Replace 'word' not after 'prefix'
```

## Usage Examples

### Basic Text Processing

#### Simple Substitutions
```bash
# Replace all occurrences globally
sed 's/error/warning/g' file.txt

# Replace in specific lines
sed '1,10s/old/new/g' file.txt
sed '/pattern/s/old/new/g' file.txt

# Multiple replacements
sed 's/old/new/g; s/bad/good/g' file.txt

# Replace with backreferences
sed 's/\(word1\) \(word2\)/\2 \1/g' file.txt

# Case-insensitive replacement
sed 's/ERROR/error/gI' file.txt
```

#### Text Formatting
```bash
# Remove leading/trailing whitespace
sed 's/^[ \t]*//; s/[ \t]*$//' file.txt

# Add line numbers
sed '=' file.txt | sed 'N; s/\n/\t/'

# Convert tabs to spaces
sed 's/\t/    /g' file.txt

# Remove multiple spaces
sed 's/  \+/ /g' file.txt

# Add commas between words
sed 's/ \+/, /g' file.txt
```

### File Processing

#### In-place Editing
```bash
# Edit file in place
sed -i 's/old/new/g' file.txt

# Edit with backup
sed -i.bak 's/old/new/g' file.txt

# Multiple files in place
sed -i 's/old/new/g' *.txt

# In-place with multiple commands
sed -i 's/old/new/g; s/bad/good/g' file.txt

# Safe in-place editing with backup
sed -i.$(date +%Y%m%d) 's/old/new/g' file.txt
```

#### Batch Processing
```bash
# Process multiple files
sed 's/old/new/g' file1.txt file2.txt file3.txt

# Process with find
find . -name "*.txt" -exec sed -i 's/old/new/g' {} +

# Process with pipe
cat file.txt | sed 's/old/new/g' > newfile.txt

# Complex processing pipeline
cat input.txt | sed 's/foo/bar/g' | sed '/baz/d' > output.txt
```

### Pattern-based Processing

#### Comment Manipulation
```bash
# Comment out lines
sed 's/^/# /' file.txt
sed '/pattern/s/^/# /' file.txt

# Uncomment lines
sed 's/^# //' file.txt
sed '/^# /{s/^# //; t; d;}' file.txt

# Toggle comments
sed '/^#\?pattern/s/^#\?/# /' file.txt

# Add comment blocks
sed '/start/,/end/{s/^/# /;}' file.txt
```

#### Line Filtering
```bash
# Extract specific lines
sed -n '/pattern/p' file.txt
sed -n '10,20p' file.txt
sed -n '/start/,/end/p' file.txt

# Remove lines
sed '/pattern/d' file.txt
sed '10,20d' file.txt
sed '/^$/d' file.txt

# Keep only specific lines
sed '/pattern/!d' file.txt
sed '/error/!d; /warning/!d' file.txt
```

### Configuration File Editing

#### Configuration Management
```bash
# Update configuration values
sed 's/^option=.*/option=new_value/' config.conf

# Enable/disable options
sed 's/^#\(Enable.*\)/\1/' config.conf    # Uncomment
sed 's/^\(Enable.*\)/#\1/' config.conf     # Comment out

# Update paths
sed 's|/usr/local|/opt/new|g' config.conf

# Modify numeric values
sed 's/port=[0-9]*/port=8080/' config.conf

# Add new configuration
sed '$ a\new_option=value' config.conf
```

#### Environment Configuration
```bash
# Set environment variables
sed 's/^DB_HOST=.*/DB_HOST=localhost/' .env
sed 's/^DB_PORT=.*/DB_PORT=5432/' .env

# Update version numbers
sed 's/version="[0-9.]*"/version="2.0.0"/' package.json

# Modify paths in Makefile
sed 's|PREFIX=/usr/local|PREFIX=/opt/software|' Makefile
```

### Log File Processing

#### Log Analysis
```bash
# Extract error messages
sed -n '/ERROR/p' logfile.txt
sed -n '/ERROR\|WARN/p' logfile.txt

# Remove timestamps
sed 's/^[0-9-]* [0-9:]* //' logfile.txt

# Extract IP addresses
sed -n 's/.*\([0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\).*/\1/p' access.log

# Format log entries
sed 's/|/\t/g' logfile.txt | column -t

# Filter by date
sed '/2024-01-01/,/2024-01-31/!d' logfile.txt
```

#### Log Cleaning
```bash
# Remove log levels
sed 's/\(ERROR\|WARN\|INFO\): //g' logfile.txt

# Standardize timestamps
sed 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}//g' logfile.txt

# Extract specific fields
sed -n 's/.*user=\([^ ]*\).*/\1/p' access.log

# Remove duplicate entries
sed '$!N; /^\(.*\)\n\1$/!P; D' logfile.txt
```

### Code Refactoring

#### Source Code Processing
```bash
# Change function names
sed 's/oldFunction/newFunction/g' source.c

# Update include paths
sed 's#include "\.\/\//include "/g' source.c

# Remove trailing whitespace
sed 's/[ \t]*$//' source.c

# Format indentation
sed 's/^    /\t/' source.c

# Add copyright header
sed '1i\
/*\
 * Copyright (c) 2024\
 * All rights reserved\
 */' source.c
```

#### Web Development
```bash
# Update HTML class names
sed 's/class="old"/class="new"/g' *.html

# Replace development URLs
sed -i 's/dev\.example\.com/www\.example\.com/g' *.html

# Minify CSS
sed 's/\/\*.*\*\///g; s/[ \t]\+/ /g; s/^[ \t]*//; s/[ \t]*$//' style.css

# Update JavaScript version
sed 's/version: "[0-9.]*"/version: "2.1.0"/' package.json
```

### Data Processing

#### CSV and Tabular Data
```bash
# CSV to TSV conversion
sed 's/,/\t/g' data.csv > data.tsv

# Remove quotes from CSV
sed 's/"//g' data.csv

# Add column headers
sed '1i\
Name,Email,Phone' data.csv

# Extract specific columns
sed -n 's/^\([^,]*\),\([^,]*\),.*/\1,\2/p' data.csv

# Format numeric columns
sed 's/\([0-9]\)\([0-9]\{3\}\)/\1,\2/g' data.csv
```

#### Text Analysis
```bash
# Count words per line
sed 's/[^ ]*[ ]*//g' file.txt | wc -c

# Extract email addresses
sed -n 's/.*\([a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}\).*/\1/p' file.txt

# Extract URLs
sed -n 's/.*\(https\?:\/\/[^ ]*\).*/\1/p' file.txt

# Extract phone numbers
sed -n 's/.*\([0-9]\{3\}-[0-9]\{3\}-[0-9]\{4\}\).*/\1/p' file.txt

# Word frequency analysis
sed 's/[^a-zA-Z]/ /g' file.txt | tr '[:upper:]' '[:lower:]' | tr ' ' '\n' | sort | uniq -c | sort -nr
```

## Scripting Examples

### Complex Multi-line Processing

#### XML/HTML Processing
```bash
# Remove HTML tags while preserving content
sed 's/<[^>]*>//g' file.html

# Extract content between tags
sed -n '/<title>/,/<\/title>/p' file.html | sed 's/<[^>]*>//g'

# Process XML elements
sed '/<item>/,/<\/item>/{
    s/<item>/ITEM: /
    s/<\/item>//
    s/<[^>]*>//g
}' file.xml

# Clean XML attributes
sed 's/ [a-zA-Z]*="[^"]*"//g' file.xml
```

#### Document Processing
```bash
# Remove duplicate lines
sed '$!N; /^\(.*\)\n\1$/!P; D' file.txt

# Reverse line order
sed '1!G; h; $!d' file.txt

# Remove blank paragraphs
sed '/^$/,/^$/{
    /^$/d
}' file.txt

# Format paragraphs
sed '/./{H; $!d;}; x; s/\n/ /g; s/  */ /g' file.txt
```

### Conditional Processing

#### File Type Detection
```bash
# Process files differently based on content
sed '/^#!/{
    s/shebang/#!/bin/bash/
    a\
Added shebang line
}' script.sh

# Handle different data formats
sed '/^HTTP\//{
    s/HTTP\/[0-9.]* [0-9]* //
    s/[#?].*$//
}' access.log

# Conditional formatting
sed '/^[0-9]$/{
    s/^/Number: /
}
/^[a-zA-Z]$/{
    s/^/Letter: /
}' mixed.txt
```

#### State Machine Processing
```bash
# Process configuration sections
sed '/^\[database\]/,/^\[/{
    /^\[/!{
        s/^host=/DB_HOST=/
        s/^port=/DB_PORT=/
        s/^user=/DB_USER=/
    }
}' config.ini

# Handle multi-line records
sed '/^--/,/^--$/{
    /^--$/d
    s/^ID: /ID=/
    s/^Name: /NAME=/
    s/^Date: /DATE=/
}' records.txt
```

### Data Transformation

#### Advanced Data Conversion
```bash
# Remove duplicate words
sed ':a; s/\(\<\w\+\> \)\1/\1/; ta' file.txt

# Capitalize first letter of each word
sed 's/\b\([a-z]\)/\u\1/g' file.txt

# Convert snake_case to camelCase
sed 's/_\([a-z]\)/\u\1/g' file.txt

# Format phone numbers
sed 's/\([0-9]\{3\}\)\([0-9]\{3\}\)\([0-9]\{4\}\)/(\1) \2-\3/g' phone.txt

# JSON pretty printing (basic)
sed 's/,/,\n/g; s/{/{\n /g; s/}/\n}/g' data.json
```

## Practical Applications

### System Administration

#### Configuration Management
```bash
# Enable/disable services in configuration
sed -i 's/^#\(Enable.*\)/\1/' /etc/service.conf
sed -i 's/^\(Enable.*\)/#\1/' /etc/service.conf

# Update system configuration
sed -i 's/HOSTNAME=.*/HOSTNAME=newhost/' /etc/hostname

# Comment out problematic lines
sed -i '/^problematic/s/^/# /' /etc/configfile

# Add configuration entries
sed -i '$ a\NewOption=value' /etc/configfile

# Remove configuration sections
sed -i '/^\[section\]/,/^\[/d' /etc/configfile
```

#### Log Rotation and Management
```bash
# Archive log entries by date
sed '/2024-01-01/,/2024-01-31/w january.log' /var/log/app.log
sed '/2024-01-01/,/2024-01-31/d' /var/log/app.log

# Extract error logs for analysis
sed -n '/ERROR/p' /var/log/syslog > errors.log

# Clean sensitive information from logs
sed -i 's/password=[^ ]*/password=***/g' /var/log/auth.log

# Compress log entries
sed '/2023/d' /var/log/app.log | gzip > app.log.gz

# Create daily log summaries
sed -n "/$(date +%Y-%m-%d)/p" /var/log/app.log | head -100
```

#### Security Hardening
```bash
# Remove comments from configuration files
sed '/^#/d; /^$/d' /etc/ssh/sshd_config > sshd_clean.conf

# Update default passwords
sed -i 's/secret_password/complex_password_123/g' /etc/app/config

# Secure file permissions in scripts
sed -i 's/chmod 777/chmod 755/g' setup.sh

# Remove debug statements
sed -i '/console\.log/d; /print/d; /debug/d' production.js

# Harden Apache configuration
sed -i 's/ServerSignature On/ServerSignature Off/' /etc/apache2/conf-available/security.conf
```

### Development Workflow

#### Build and Deployment Scripts
```bash
# Update version numbers in multiple files
sed -i 's/version="[0-9.]*"/version="2.1.0"/' package.json
sed -i 's/app.version = "[^"]*"/app.version = "2.1.0"/' config.js

# Replace environment-specific settings
sed -i 's/dev\.api\.example\.com/prod\.api\.example\.com/g' *.config

# Update database connection strings
sed -i 's/host=localhost/host=db-prod.example.com/g' database.yml
sed -i 's/password=devpassword/password=prodpass123/g' database.yml

# Modify build configurations
sed -i 's/debug=true/debug=false/g' build.properties
sed -i 's/minify=false/minify=true/g' build.properties
```

#### Code Quality and Standards
```bash
# Enforce coding standards
sed -i 's/    /\t/g' source.c          # Convert spaces to tabs
sed -i 's/\/\/[^\n]*//g' source.c      # Remove C++ style comments
sed -i 's/\t/    /g' source.py         # Convert tabs to spaces

# Add license headers
sed -i '1i\
# Copyright (c) 2024 Company Name\
# All rights reserved\
' *.py

# Remove trailing whitespace
sed -i 's/[ \t]*$//' *.c *.h *.py

# Standardize import statements
sed -i 's/^import \([^ ]*\)$/from \1 import */g' *.py
```

### Web Development

#### Content Management
```bash
# Update HTML meta tags
sed -i 's/<meta name="description" content="[^"]*">/<meta name="description" content="New description">/' *.html

# Replace placeholder content
sed -i 's/{{site_name}}/My Website/g' templates/*.html
sed -i 's/{{current_year}}/2024/g' footer.html

# Optimize CSS files
sed -i 's/\/\*.*\*\///g; s/[ \t]\+/ /g; s/^[ \t]*//; s/[ \t]*$//' styles.css

# Minify JavaScript
sed -i 's/\/\/.*//g; s/\/\*.*\*\///g; s/[ \t]\+/ /g; s/^[ \t]*//; s/[ \t]*$//' script.js

# Update navigation menus
sed -i 's/class="active"/class=""/g' *.html
sed -i '/href="about\.html"/s/class=""/class="active"/' *.html
```

#### SEO and Optimization
```bash
# Update page titles
sed -i 's/<title>[^<]*<\/title>/<title>Optimized Page Title<\/title>/' *.html

# Add missing alt attributes
sed -i 's/<img src="\([^"]*\)">/<img src="\1" alt="Image">/g' *.html

# Optimize heading structure
sed -i 's/<h1>/<h2>/g' content.html
sed -i '0,/<h2>/s/<h2>/<h1>/' content.html

# Add canonical URLs
sed -i '0,/<\/head>/i\
<link rel="canonical" href="https://example.com/current-page">\
' *.html
```

### Data Processing and Analytics

#### Data Cleaning
```bash
# Remove invalid email addresses
sed -i '/@[a-zA-Z0-9.-]*\./!d' emails.txt

# Standardize date formats
sed -i 's|\([0-9]\{2\}\)/\([0-9]\{2\}\)/\([0-9]\{4\}\)|\3-\1-\2|g' dates.txt

# Normalize phone numbers
sed -i 's/[^0-9]//g; s/^\([0-9]\{10\}\)$/(\1) \1/p' phone_numbers.txt

# Remove duplicates and sort
sed '$!N; /^\(.*\)\n\1$/!P; D' data.txt | sort -u > clean_data.txt

# Clean CSV data
sed 's/"//g; s/\t/,/g; s/ *, */,/g' messy_data.csv > clean_data.csv
```

#### Log Analysis and Reporting
```bash
# Generate summary reports
sed -n '/ERROR/p' application.log | wc -l > error_count.txt
sed -n '/200\|OK/p' access.log | wc -l > success_count.txt

# Extract performance metrics
sed -n 's/.*time=\([0-9.]*\)ms.*/\1/p' performance.log | awk '{sum+=$1} END {print sum/NR}'

# Filter by user activity
sed -n "/user=john/p" activity.log | grep "login\|logout" > john_activity.txt

# Generate daily summaries
sed -n "/$(date +%Y-%m-%d)/p" /var/log/app.log | awk '{print $1}' | sort | uniq -c
```

## Integration and Automation

### Shell Script Integration

#### Automated File Processing
```bash
#!/bin/bash
# Batch file processor with sed

INPUT_DIR="./input"
OUTPUT_DIR="./output"
PATTERN="old_text"
REPLACEMENT="new_text"

mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.txt; do
    filename=$(basename "$file")
    sed "s/$PATTERN/$REPLACEMENT/g" "$file" > "$OUTPUT_DIR/$filename"
    echo "Processed: $filename"
done
```

#### Configuration Update Script
```bash
#!/bin/bash
# Update multiple configuration files

CONFIG_FILES=(
    "/etc/apache2/apache2.conf"
    "/etc/mysql/my.cnf"
    "/etc/ssh/sshd_config"
)

for config in "${CONFIG_FILES[@]}"; do
    if [[ -f "$config" ]]; then
        # Create backup
        cp "$config" "$config.backup.$(date +%Y%m%d)"

        # Update configuration
        sed -i 's/^#\(ServerName.*\)/\1/' "$config"
        sed -i 's/^#\?\(MaxClients.*\)/MaxClients 150/' "$config"

        echo "Updated: $config"
    fi
done
```

#### Log Processing Automation
```bash
#!/bin/bash
# Automated log analysis and archiving

LOG_DIR="/var/log/app"
ARCHIVE_DIR="/var/log/archive"
RETENTION_DAYS=30

mkdir -p "$ARCHIVE_DIR"

# Process yesterday's log
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)

if [[ -f "$LOG_DIR/app-$YESTERDAY.log" ]]; then
    # Extract statistics
    sed -n '/ERROR/p' "$LOG_DIR/app-$YESTERDAY.log" > "$ARCHIVE_DIR/errors-$YESTERDAY.log"
    sed -n '/WARN/p' "$LOG_DIR/app-$YESTERDAY.log" > "$ARCHIVE_DIR/warnings-$YESTERDAY.log"

    # Create summary
    echo "Log Summary for $YESTERDAY" > "$ARCHIVE_DIR/summary-$YESTERDAY.txt"
    echo "Errors: $(grep -c ERROR "$LOG_DIR/app-$YESTERDAY.log")" >> "$ARCHIVE_DIR/summary-$YESTERDAY.txt"
    echo "Warnings: $(grep -c WARN "$LOG_DIR/app-$YESTERDAY.log")" >> "$ARCHIVE_DIR/summary-$YESTERDAY.txt"

    # Compress original log
    gzip "$LOG_DIR/app-$YESTERDAY.log"

    echo "Processed logs for $YESTERDAY"
fi
```

### Integration with Other Tools

#### Pipeline Processing
```bash
# Combine sed with other text processing tools
cat access.log | sed 's/.*\[//g' | sed 's/\].*//g' | sort | uniq -c | sort -nr

# Use sed with awk for complex processing
cat data.csv | sed 's/,/\t/g' | awk '{print $1, $3}' | sed 's/ /,/g'

# Integrate with grep and sort
cat file.txt | sed 's/^[ \t]*//' | grep -v '^$' | sort -u

# Use sed in find operations
find . -name "*.log" -exec sed -i '/^$/d' {} \;
```

#### System Monitoring Scripts
```bash
#!/bin/bash
# Monitor system resources and format output

while true; do
    echo "=== $(date) ==="

    # Memory usage
    free -m | sed -n '2p' | sed 's/ \+/ /g' | cut -d' ' -f2,3 | sed 's/ /, Usage: /'

    # Disk usage
    df -h | sed '1d' | sed 's/ \+/ /g' | awk '{print $5, $6}' | sed 's/%/%, Mount: /'

    # CPU load
    uptime | sed 's/.*load average: \([^ ]*\).*/CPU Load: \1/'

    echo "---"
    sleep 60
done
```

## Troubleshooting

### Common Issues

#### Regular Expression Problems
```bash
# Special characters not escaped properly
sed 's/\./\\./g' file.txt          # Escape dots
sed 's/\//\\\//g' file.txt         # Escape slashes
sed 's/\$/\\$/g' file.txt          # Escape dollar signs

# Pattern not matching
sed -r 's/pattern/replacement/g' file.txt  # Use -r for extended regex

# Case sensitivity issues
sed 's/PATTERN/replacement/gI' file.txt    # Use case-insensitive flag

# Word boundary issues
sed 's/\bword\b/replacement/g' file.txt    # Use word boundaries
```

#### In-place Editing Issues
```bash
# Permission denied
sudo sed -i 's/old/new/g' /etc/configfile

# Disk space full
df -h  # Check disk space
sed 's/old/new/g' file.txt > temp && mv temp file.txt

# File locked by other process
lsof file.txt  # Check what's using the file

# Create backup before editing
sed -i.bak 's/old/new/g' important_file.txt
```

#### Performance Issues
```bash
# Slow processing of large files
# Solution 1: Use simpler patterns
sed 's/simple/replacement/g' largefile.txt

# Solution 2: Limit processing to specific lines
sed '1000,2000s/pattern/replacement/g' hugefile.txt

# Solution 3: Use streaming
cat largefile.txt | sed 's/old/new/g' > output.txt

# Solution 4: Split and process
split -l 100000 hugefile.txt part_
for part in part_*; do
    sed 's/old/new/g' "$part" >> output.txt
done
```

### Debugging Techniques

#### Script Debugging
```bash
# Show what sed would do without making changes
sed -n 's/old/new/p' file.txt  # Only show changed lines

# Add debug output
sed 's/old/new/w debug.txt' file.txt

# Use verbose mode (if available)
sed --debug 's/old/new/g' file.txt

# Test on small sample first
head -100 file.txt | sed 's/old/new/g'

# Check syntax before execution
echo 's/old/new/g' | sed -f /dev/stdin /dev/null
```

#### Pattern Testing
```bash
# Test if pattern matches
sed -n '/pattern/p' file.txt

# Show matched context
sed -n '/pattern/-2,+2p' file.txt

# Count pattern occurrences
grep -c pattern file.txt

# Show line numbers of matches
sed -n '/pattern/=' file.txt
```

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

## Performance Tips

1. **For large files, use simple patterns**: Complex regex slow down processing
2. **Use specific line ranges**: Limit processing to relevant sections
3. **Avoid unnecessary substitutions**: Use pattern addresses to target lines
4. **Use streaming for very large files**: Process in chunks to save memory
5. **Minimize backreferences**: They consume more processing time
6. **Use greedy quantifiers carefully**: .* can be expensive
7. **Consider multiple passes**: Sometimes two simple passes are faster than one complex one
8. **Use extended regex**: -r is often faster than complex basic regex

## Related Commands

- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing language
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching and filtering
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines and fields
- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files
- [`uniq`](/docs/commands/text-processing/uniq) - Remove duplicate lines from files
- [`tr`](/docs/commands/text-processing/tr) - Translate or delete characters
- [`perl`](/docs/commands/development-tools/perl) - Perl interpreter (more powerful text processing)
- [`python`](/docs/commands/development-tools/python) - Python interpreter (advanced text processing)
- [`vim`](/docs/commands/editors/vim) - Text editor with powerful regex support
- [`nano`](/docs/commands/editors/nano) - Simple text editor
- [`ed`](/docs/commands/file-management/ed) - Line-oriented text editor

The `sed` command is an indispensable tool for text processing in shell scripts and command-line operations. Mastering sed enables efficient automated text transformation, log analysis, and configuration management across a wide range of system administration and development tasks. Its streaming nature makes it particularly valuable for processing large files and integrating into complex data pipelines.