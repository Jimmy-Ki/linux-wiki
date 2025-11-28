---
title: ex - Line-oriented Text Editor
sidebar_label: ex
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ex - Line-oriented Text Editor

The `ex` command is a line-oriented text editor and the predecessor to the vi editor. It serves as the command-line interface mode of Vim and provides powerful text manipulation capabilities through command-line instructions. Unlike visual editors, ex operates in a line-by-line manner, making it ideal for scripting, automation, and batch processing of text files. Ex mode is particularly useful for making rapid, precise edits to files without entering visual mode, and it forms the foundation for advanced vi/Vim operations through colon commands.

## Basic Syntax

```bash
ex [options] [file ...]
```

## Common Command-line Options

### Execution Modes
- `-e` - Start in Ex mode (same as running ex)
- `-E` - Start in improved Ex mode (exim)
- `-R` - Read-only mode (same as view command)
- `-Z` - Restricted mode (no shell commands)

### File Handling
- `+[num]` - Start at line number `num`
- `+/{pattern}` - Start at first line matching `pattern`
- `+{command}` - Execute Ex command after loading file
- `-c {command}` - Execute Ex command after loading file

### Mode and Behavior
- `-b` - Binary mode for editing binary files
- `-C` - Compatible mode (behave like Vi)
- `-N` - No-compatible mode (enhanced Vim behavior)
- `-n` - No swap file (disable recovery)
- `-m` - Disable file modification
- `-M` - Disable all modifications

### Session Management
- `-i {viminfo}` - Specify viminfo file location
- `-s {scriptin}` - Read commands from script file
- `-w {scriptout}` - Write typed characters to script file

## Ex Mode Commands

### File Operations
- `:e[dit] [file]` - Edit another file
- `:w[rite] [file]` - Write current file
- `:wq[!] [file]` - Write and quit
- `:q[uit]` - Quit (no unsaved changes)
- `:q[uit]!` - Quit without saving
- `:x[it]` - Save and quit
- `:r[ead] [file]` - Read file into current buffer
- `:f[ile]` - Show current file information

### Navigation Commands
- `{number}` - Go to line number
- `/{pattern}` - Search forward for pattern
- `?{pattern}` - Search backward for pattern
- `n` - Repeat last search (forward)
- `N` - Repeat last search (backward)
- `:$` - Go to last line
- `:0` - Go to first line

### Text Manipulation

#### Line Deletion
- `:d` - Delete current line
- `:d {range}` - Delete specified range
- `:dd` - Delete current line
- `:[range]d` - Delete lines in range

#### Line Insertion
- `:i[nsert]` - Insert text before current line
- `:a[ppend]` - Append text after current line
- `:o[pen]` - Open line for insertion

#### Substitution
- `:s/{old}/{new}/` - Substitute first occurrence on current line
- `:s/{old}/{new}/g` - Substitute all occurrences on current line
- `:%s/{old}/{new}/g` - Substitute all occurrences in file
- `:[range]s/{old}/{new}/g` - Substitute in specified range

#### Copy and Move
- `:co[py] {address}` - Copy lines to specified address
- `:t {address}` - Copy lines to specified address
- `:m[ove] {address}` - Move lines to specified address

#### Range Specifications
- `.` - Current line
- `$` - Last line
- `%` - Entire file (1,$)
- `+n` - Current line plus n lines
- `-n` - Current line minus n lines
- `start,end` - Range from start to end line
- `{pattern}` - Lines matching pattern

### Display and Output
- `:p[rint]` - Print current line
- `:p[rint] {range}` - Print specified range
- `:l[ist]` - List current line with special characters
- `:nu[mber]` - Show line numbers with content
- `:set nu[mber]` - Enable line numbers
- `:set nonu[mber]` - Disable line numbers

### Search and Patterns
- `:g/{pattern}/cmd` - Execute cmd on lines matching pattern
- `:v/{pattern}/cmd` - Execute cmd on lines NOT matching pattern
- `:g!/{pattern}/cmd` - Same as :v/ command

### Buffer Management
- `:b[uffer] {n}` - Switch to buffer n
- `:b[uffer] {name}` - Switch to named buffer
- `:bn[ext]` - Go to next buffer
- `:bp[revious]` - Go to previous buffer
- `:ls` - List all buffers
- `:bd[elete]` - Delete buffer

## Usage Examples

### Basic File Editing

#### Simple File Operations
```bash
# Edit a file in ex mode
ex myfile.txt

# Edit file at specific line
ex +100 myfile.txt

# Edit file starting at pattern match
ex +/function myfile.txt

# Execute command on file edit
ex -c "%s/old/new/g" -c "wq" myfile.txt

# Edit multiple files
ex file1.txt file2.txt file3.txt
```

#### Read-only Editing
```bash
# Open file in read-only mode
ex -R myfile.txt

# View file without modification capability
ex -M myfile.txt
```

### Text Substitution and Replacement

#### Global Substitutions
```bash
# Replace all occurrences in file
ex -c "%s/error/Error/g" -c "wq" logfile.txt

# Replace pattern with confirmation
ex -c "%s/old/new/gc" -c "wq" data.txt

# Case-insensitive substitution
ex -c "%s/error/Error/gi" -c "wq" file.txt

# Multiple substitutions in sequence
ex -c "%s/foo/bar/g" -c "%s/baz/qux/g" -c "wq" input.txt
```

#### Pattern-based Editing
```bash
# Delete lines containing pattern
ex -c "/error/d" -c "wq" file.txt

# Delete empty lines
ex -c "/^$/d" -c "wq" data.txt

# Comment out lines matching pattern
ex -c "/TODO/^/# /" -c "wq" code.py

# uncomment lines
ex -c "/^# TODO/s/^# //" -c "wq" code.py
```

### Line Operations

#### Line Range Operations
```bash
# Delete lines 10 to 20
ex -c "10,20d" -c "wq" file.txt

# Copy lines 5-10 after line 25
ex -c "5,10t25" -c "wq" file.txt

# Move lines 15-25 to line 5
ex -c "15,25m5" -c "wq" file.txt

# Delete first 100 lines
ex -c "1,100d" -c "wq" largefile.txt
```

#### Conditional Operations
```bash
# Delete lines not containing pattern
ex -c "v/important/d" -c "wq" data.txt

# Capitalize lines starting with TODO
ex -c "/TODO/s/.*/\U&/" -c "wq" notes.txt

# Add line numbers to all lines
ex -c "%s/^/\=line('.'). ' /" -c "wq" text.txt

# Remove trailing whitespace
ex -c "%s/\s\+$//" -c "wq" file.txt
```

### Batch Processing and Scripting

#### Command Execution
```bash
# Execute multiple commands
ex -c "1,10d" -c "/pattern/d" -c "wq" file.txt

# Execute commands from script file
ex -s commands.scr file.txt

# Process files in loop
for file in *.txt; do
    ex -c "%s/Windows/Linux/g" -c "wq" "$file"
done
```

#### Advanced Pattern Processing
```bash
# Extract lines between markers
ex -c "/START/,/END/w output.txt" -c "q!" input.txt

# Remove lines between markers
ex -c "/BEGIN/,/END/d" -c "wq" data.txt

# Duplicate lines matching pattern
ex -c "/error/t." -c "wq" logfile.txt

# Join consecutive lines
ex -c "1,$-1j" -c "wq" multiline.txt
```

### File Transformation

#### Code Processing
```bash
# Add header to all files
ex -c "0i#!/usr/bin/env python\n" -c "wq" script.py

# Remove trailing spaces and tabs
ex -c "%s/[ \t]\+$//" -c "wq" source.c

# Convert tabs to spaces (4 spaces per tab)
ex -c "%s/\t/    /g" -c "wq" indented.txt

# Add copyright header
ex -c "1i/*\n * Copyright 2024\n * All rights reserved\n */\n" -c "wq" main.c
```

#### Data Processing
```bash
# Remove blank lines and compress spacing
ex -c "/^$/d" -c "%s/  */ /g" -c "wq" data.txt

# Format CSV: ensure commas between fields
ex -c "%s/\s\+/,/g" -c "wq" unformatted.csv

# Extract email addresses
ex -c "v/@/d" -c "%s/.*\(\w\+@\w\+\.\w\+\).*/\1/" -c "wq" emails.txt

# Number lines
ex -c "%s/^/\=line('.'). ' /" -c "wq" numbered.txt
```

### Complex Search and Replace

#### Multiple Pattern Operations
```bash
# Replace multiple different patterns
ex -c "1,$s/color/red/g" \
    -c "1,$s/hue/red/g" \
    -c "1,$s/shade/red/g" \
    -c "wq" descriptions.txt

# Replace based on line content
ex -c "/error/s/red/bright-red/g" \
    -c "/warning/s/red/yellow/g" \
    -c "wq" log.txt
```

#### Pattern-based Line Processing
```bash
# Process function definitions
ex -c "/^func/.,/^}/d" -c "wq" functions.txt

# Process XML/HTML tags
ex -c "%s/<[^>]*>//g" -c "wq" html.txt

# Format JSON (simple beautification)
ex -c "%s/,/,\n/g" -c "%s/{/{\n/g" -c "%s/}/\n}/g" -c "wq" ugly.json
```

### File Management Operations

#### File Concatenation
```bash
# Read multiple files into one
ex -c "r header.txt" -c "r content.txt" -c "r footer.txt" -c "w" combined.txt

# Append current date to file
ex -c "$r !date" -c "w" log.txt
```

#### File Filtering
```bash
# Filter lines through external command
ex -c "!grep error" -c "w" logfile.txt

# Execute shell command within ex
ex -c "!ls -la > filelist.txt" -c "w" buffer.txt

# Insert command output at specific line
ex -c "10r !date" -c "w" report.txt
```

## Practical Examples

### System Administration

#### Log File Processing
```bash
# Clean up log files automatically
for logfile in /var/log/app/*.log; do
    # Remove old entries and archive
    ex -c "/2023/d" -c "wq" "$logfile"
    # Add timestamp header
    ex -c "0i# Processed on $(date)\n" -c "wq" "$logfile"
done

# Extract error lines from log
ex -c "/error/w errors.log" -c "q!" system.log

# Remove duplicate lines from log
ex -c "%s/^\(.*\)\(\n\1\)\+$/\1/" -c "wq" duplicates.log
```

#### Configuration File Management
```bash
# Enable feature in config files
ex -c "%s/#feature_enable/feature_enable/" -c "wq" config.conf

# Update version number in multiple files
for file in version*.txt; do
    ex -c "s/version = .*/version = \"2.0.0\"/" -c "wq" "$file"
done

# Comment out deprecated settings
ex -c "/deprecated_^/# deprecated: &/" -c "wq" old_config.conf
```

### Development Workflow

#### Code Formatting
```bash
# Standardize indentation (tabs to spaces)
ex -c "%s/\t/    /g" -c "wq" source.py

# Remove trailing blank lines
ex -c "g/^$/d" -c "wq" clean_code.c

# Add include guards to header files
ex -c "0i#ifndef UNIQUE_NAME_H\n#define UNIQUE_NAME_H\n" \
    -c "$a\n#endif // UNIQUE_NAME_H" \
    -c "wq" header.h
```

#### Documentation Processing
```bash
# Update copyright year in all source files
find . -name "*.c" -o -name "*.h" | while read file; do
    ex -c "s/Copyright 2023/Copyright 2024/g" -c "wq" "$file"
done

# Generate function index from source
ex -c "/^[a-zA-Z_][a-zA-Z0-9_]*.*{$/w functions.txt" -c "q!" source.c

# Remove commented-out code
ex -c "/^[ \t]*\/\/.*debug/d" -c "wq" debug_code.c
```

### Data Processing

#### CSV and Text Processing
```bash
# Remove header from CSV
ex -c "1d" -c "wq" data.csv

# Filter records based on column value
ex -c "/.*,ERROR/d" -c "wq" records.csv

# Add column headers to data file
ex -c "0iName,Age,City\n" -c "wq" people.txt

# Convert tab-separated to comma-separated
ex -c "%s/\t/,/g" -c "wq" tab_data.txt
```

#### Text Analysis
```bash
# Count word occurrences
ex -c "g/pattern/p" -c "w! matches.txt" -c "q!" textfile.txt

# Extract email addresses from file
ex -c "v/@/d" -c "%s/.*\(\w\+@\w\+\.\w\+\).*/\1/" -c "wq" contacts.txt

# Normalize whitespace
ex -c "%s/  */ /g" -c "%s/^ //g" -c "%s/ $//g" -c "wq" messy.txt
```

## Advanced Usage

### Regular Expressions in ex

#### Complex Pattern Matching
```bash
# Match whole words only
ex -c "/\<error\>/s//ERROR/g" -c "wq" text.txt

# Match at line start/end
ex -c "/^TODO/s//TODO:/g" -c "wq" tasks.txt
ex -c "/END$/s/.*/& - COMPLETED/" -c "wq" status.txt

# Match character classes
ex -c "/[0-9][0-9][0-9][0-9]/s//YEAR/g" -c "wq" dates.txt

# Match alternatives
ex -c "/\(red\|blue\|green\)/s//COLOR/g" -c "wq" colors.txt
```

#### Backreferences and Grouping
```bash
# Swap two words
ex -c "%s/\(word1\) \(word2\)/\2 \1/g" -c "wq" text.txt

# Duplicate first word of each line
ex -c "%s/^\(\w\+\).*/\1 \1/" -c "wq" words.txt

# Extract domain from URLs
ex -c "%s/https*:\/\/[^\/]*\/\(.*\)/\1/" -c "wq" urls.txt
```

### Multi-file Operations

#### Processing Multiple Files
```bash
# Process all files in directory
for file in *.log; do
    ex -c "%s/old/NEW/g" -c "wq" "$file"
done

# Apply changes recursively
find . -name "*.txt" -exec ex -c "%s/foo/bar/g" -c "wq" {} \;

# Batch rename using ex commands
ls *.oldext | while read file; do
    newname="${file%.oldext}.newext"
    ex -c "r $file" -c "w $newname" -c "q!" dummy.txt
done
```

### Performance Optimization

#### Efficient Large File Processing
```bash
# Process files without loading full content
ex -c "1d" -c "wq" huge_file.txt  # Only first line operation

# Use read-only mode for viewing
ex -R large_dataset.txt

# Disable swap for temporary editing
ex -n -c "1,1000d" -c "wq" temp_file.txt
```

## Integration and Automation

### Shell Script Integration

#### Automated File Processing
```bash
#!/bin/bash
# Process log files with ex

LOG_DIR="/var/log/myapp"
ARCHIVE_DIR="/archive/logs"

for logfile in "$LOG_DIR"/*.log; do
    filename=$(basename "$logfile")

    # Remove old entries and add timestamp
    ex -c "/2023/d" \
       -c "0i# Processed: $(date)\n" \
       -c "wq" "$logfile"

    # Archive processed file
    mv "$logfile" "$ARCHIVE_DIR/$filename.processed"
done

echo "Log processing completed"
```

#### Configuration Management
```bash
#!/bin/bash
# Update configuration across multiple servers

CONFIG_FILE="/etc/myapp/config.conf"
NEW_VERSION="2.1.0"

# Update version and enable features
ex -c "s/version=.*/version=$NEW_VERSION/" \
    -c "s/feature_enable=false/feature_enable=true/" \
    -c "s/debug_mode=false/debug_mode=true/" \
    -c "wq" "$CONFIG_FILE"

echo "Configuration updated to version $NEW_VERSION"
```

### Pipeline Integration

#### Combining with Other Tools
```bash
# Filter and process with grep and ex
grep -l "pattern" *.txt | xargs -I {} ex -c "%s/old/new/g" -c "wq" {}

# Use find to locate and process files
find . -name "*.conf" -exec ex -c "%s/#opt/opt/g" -c "wq" {} \;

# Process output from other commands
ps aux | grep "process_name" | ex -c "%s/  */|/g" -c "w!" process_list.txt
```

## Troubleshooting

### Common Issues

#### Command Execution Problems
```bash
# Ex commands not executing - check syntax
ex -c ":%s/old/new/g" -c "wq" file.txt  # Correct
ex -c ":%s/old/new/g" -c "wq"  # Missing filename

# Pattern not found - use escaped characters
ex -c "%s/\.com/\.org/g" -c "wq" urls.txt

# File permissions - check read/write access
ls -la file.txt
chmod 644 file.txt
```

#### Memory and Performance Issues
```bash
# Large files causing problems
ex -n -c "1,1000d" -c "wq" large_file.txt  # No swap file

# System resource limits
ulimit -n 4096  # Increase file descriptor limit
ex file.txt
```

#### File Encoding Issues
```bash
# Handle different encodings
ex -c "set fileencoding=utf-8" -c "w" encoded_file.txt

# Convert file encoding
ex -c "+set fileencoding=latin1" -c "w" input.txt
```

### Debugging ex Commands

#### Command Testing
```bash
# Test commands without saving
ex -c ":v/TEST/p" -c "q!" file.txt  # Show what will be deleted

# Use print to verify changes
ex -c "%s/old/new/gp" -c "q!" file.txt  # Show substitutions

# Check line numbers
ex -c "set number" -c "p" -c "q!" file.txt
```

## Related Commands

- [`vi`](/docs/commands/development/vi) - Visual editor based on ex
- [`vim`](/docs/commands/development/vim) - Vi IMproved editor
- [`ed`](/docs/commands/file/ed) - Original Unix line editor
- [`sed`](/docs/commands/file/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file/awk) - Pattern scanning and processing language
- [`grep`](/docs/commands/file/grep) - Text pattern search utility

## Best Practices

1. **Test commands** on backup files before applying to important data
2. **Use specific ranges** instead of global operations when possible
3. **Save frequently** when making extensive changes
4. **Use regular expressions** carefully and test patterns first
5. **Check file permissions** before attempting edits
6. **Backup original files** when performing batch operations
7. **Use read-only mode** (-R) when just viewing files
8. **Disable swap file** (-n) for temporary edits of large files
9. **Use restricted mode** (-Z) for untrusted script execution
10. **Validate input** before processing automated edits

## Performance Tips

1. **Use specific line ranges** instead of % for large files
2. **Disable swap files** (-n) for temporary operations
3. **Combine multiple commands** in single ex session
4. **Use shell loops** for batch file processing
5. **Employ regex efficiency** - anchor patterns when possible
6. **Minimize global substitutions** - use targeted ranges
7. **Use binary mode** (-b) for non-text file operations
8. **Leverage shell pipes** to reduce temporary file usage
9. **Use read-only mode** for viewing to prevent accidental writes
10. **Process files in chunks** for very large datasets

The `ex` command provides powerful, efficient text manipulation capabilities through its command-line interface. Its line-oriented nature makes it ideal for automation, batch processing, and precise text operations, while its integration with vi/Vim provides a comprehensive editing environment for both interactive and scripted text processing tasks.