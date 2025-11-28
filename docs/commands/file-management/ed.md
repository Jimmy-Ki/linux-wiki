---
title: ed - Line-oriented text editor
sidebar_label: ed
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ed - Line-oriented text editor

The `ed` command is a line-oriented text editor that was one of the first Unix text editors, created in 1969 by Ken Thompson and Dennis Ritchie. While it appears primitive by modern standards, ed is still valuable for editing files over slow connections, scripting automated edits, working with very large files, and as the foundation for more advanced editors. It's the predecessor to vi and ex modes, and its command syntax forms the basis for tools like sed and vim's ex mode.

ed operates entirely through commands, making it predictable and scriptable. Its line-based approach makes it efficient for working with large files where screen-based editors might be memory-intensive, and its simplicity makes it ideal for remote editing over poor connections or for automated text processing.

## Basic Syntax

```bash
ed [options] [filename]
```

## Command Line Options

### Basic Options
- `-p <string>`, `--prompt=<string>` - Set command prompt to specified string
- `-s`, `--quiet`, `--silent` - Suppress diagnostics and verbose output
- `-`, `--` - Treat remaining arguments as file names (not options)
- `--help` - Display help information
- `--version` - Display version information

### Traditional Mode
- `-G`, `--traditional` - Run in traditional mode (compatible with original Unix ed)

### Advanced Options
- `-v`, `--verbose` - Enable verbose output (opposite of -s)
- `-l`, `--loose-exit-status` - Exit with status 0 even if errors occur
- `-r <file>`, `--recover=<file>` - Recover edit session from specified file

## Operating Modes

ed operates in two distinct modes:

### Command Mode (Default)
This is the default mode where you enter editing commands. All input is interpreted as commands. This mode is indicated by a prompt (usually `*` or a custom prompt set with `-p`).

### Input Mode
Activated by append (`a`), insert (`i`), or change (`c`) commands. Text entered is added to the buffer until a single period `.` on a line by itself is entered to exit input mode and return to command mode.

## Line Addressing

### Absolute Addresses
```bash
.               # Current line
$               # Last line
<number>        # Specific line number (1-based)
%               # Entire file (equivalent to 1,$)
```

### Relative Addresses
```bash
+<number>       # <number> lines after current line
-<number>       # <number> lines before current line
+               # Next line (equivalent to +1)
-               # Previous line (equivalent to -1)
```

### Pattern-based Addresses
```bash
/pattern/       # Next line containing pattern (forward search)
?pattern?       # Previous line containing pattern (backward search)
//              # Repeat last forward search
??              # Repeat last backward search
```

### Compound Addresses
```bash
<address1>,<address2>  # Range from address1 to address2 (inclusive)
<address>;<address>    # Set current line to first address, then apply second address
```

## File Operations

### Basic File Commands
```bash
e [filename]           # Edit file (replace current buffer, warn if unsaved)
E [filename]           # Edit file without checking for unsaved changes
r [filename]           # Read file into buffer after current line
f [filename]           # Set filename for current buffer
f                      # Display current filename
w [filename]           # Write buffer to file
wq [filename]          # Write buffer to file and quit
q                      # Quit (if no unsaved changes)
Q                      # Force quit without saving changes
```

### Advanced File Operations
```bash
w !command             # Write buffer to shell command (pipe)
r !command             # Read output of shell command into buffer
e !command             # Edit output of shell command
=                      # Print current line number
= <address>            # Print line number of specified address
```

## Text Navigation and Display

### Movement Commands
```bash
<number>p              # Print specific line
$p                     # Print last line
.p                     # Print current line (same as p)
z                      # Print current line with context (default 1 line before/after)
z<number>              # Print current line with <number> lines of context
-                      # Move to previous line and print it
+                      # Move to next line and print it
<enter>                # Move to next line and print it (same as +)
```

### Display Formats
```bash
p                      # Print current line
<number>p              # Print specified line
<range>p               # Print range of lines
n                      # Print line with line number
<number>n              # Print specified line with number
<range>n               # Print range with line numbers
l                      # Print line showing special characters (tabs, ends of lines)
<number>l              # Print specified line with special characters visible
<range>l               # Print range with special characters visible
```

## Text Insertion and Modification

### Insertion Commands
```bash
a                      # Append text after current line
<address>a             # Append after specified line
i                      # Insert text before current line
<address>i             # Insert before specified line
c                      # Change (replace) current line
<address>c             # Change specified line
<range>c               # Change range of lines

# End input mode with single period on line by itself
.
```

### Line Manipulation
```bash
d                      # Delete current line
<address>d             # Delete specified line
<range>d               # Delete range of lines
j                      # Join current line with next line
<address>j             # Join specified line with next line
<range>j               # Join lines in range into one line
```

### Copy and Move Operations
```bash
t<address>             # Copy current line after specified line
<range>t<address>      # Copy range after specified line
m<address>             # Move current line after specified line
<range>m<address>      # Move range after specified line
```

## Search and Substitution

### Basic Substitution
```bash
s/old/new/             # Substitute first occurrence on current line
s/old/new/g            # Substitute all occurrences on current line
<address>s/old/new/    # Substitute on specified line
<range>s/old/new/      # Substitute first occurrence in range
<range>s/old/new/g     # Substitute all occurrences in range
%s/old/new/g           # Substitute throughout entire file
```

### Advanced Substitution Options
```bash
s/old/new/<flags>      # Flags:
                         # g - global substitution (all occurrences)
                         # p - print substituted line
                         # w - write to original file (use with care)
                         # <number> - substitute nth occurrence only

# Different delimiters for patterns containing slashes
s+old/path+new/path+g  # Use + as delimiter
s#old#path#new#path#g   # Use # as delimiter
s|old|path|new|path|g   # Use | as delimiter
```

### Context Substitution
```bash
/pattern/s/old/new/g   # Substitute on lines containing pattern
/pattern1/,/pattern2/s/old/new/g  # Substitute between two patterns
<address>,+<number>s/old/new/g     # Substitute from address for number of lines
```

### Substitution with Backreferences
```bash
s/\(word1\) \(word2\)/\2 \1/      # Swap two words
s/\([0-9]\{3\}\)\([0-9]\{4\}\)/\1-\2/  # Add hyphen to phone number
s/\(.*\)/\1/                     # Reference entire matched pattern
```

## Global Operations

### Basic Global Commands
```bash
g/pattern/command       # Execute command on lines containing pattern
g/pattern/d             # Delete all lines containing pattern
g/pattern/s/old/new/    # Substitute on lines containing pattern
g/pattern/p             # Print lines containing pattern
g/pattern/l             # Print lines containing pattern with special chars
```

### Inverse Global Operations
```bash
v/pattern/command       # Execute command on lines NOT containing pattern
v/pattern/d             # Delete lines NOT containing pattern
v/pattern/s/old/new/    # Substitute on lines NOT containing pattern
```

### Complex Global Operations
```bash
g/^$/d                 # Delete all empty lines
g/^[[:space:]]*$/d     # Delete all blank and whitespace-only lines
g/^#/d                 # Delete all comment lines
v/^[[:space:]]*#/d     # Delete all non-comment lines
g/error/w error.txt     # Write lines containing "error" to file
g/TODO/m$              # Move all TODO lines to end of file
```

## Regular Expressions

### Basic Patterns
```bash
.                      # Any single character
*                      # Zero or more of preceding character
^                      # Beginning of line
$                      # End of line
[]                     # Character class
[^]                    # Negated character class
\                      # Escape special character
```

### Extended Patterns (GNU ed)
```bash
\+                     # One or more of preceding character
\?                     # Zero or one of preceding character
\{n\}                  # Exactly n occurrences
\{n,\}                 # n or more occurrences
\{n,m\}                # n to m occurrences
\|                     # Alternation (OR)
\( \)                  # Grouping (backreferences)
```

### Character Classes
```bash
[[:alpha:]]            # Alphabetic characters
[[:digit:]]            # Numeric characters
[[:alnum:]]            # Alphanumeric characters
[[:space:]]            # Whitespace characters
[[:lower:]]            # Lowercase letters
[[:upper:]]            # Uppercase letters
[[:punct:]]            # Punctuation characters
```

## Shell Integration

### Shell Command Execution
```bash
!command               # Execute shell command
!                      # Repeat last shell command
<address>!command      # Pipe line range to shell command
w !command             # Write buffer to shell command input
r !command             # Read shell command output into buffer
e !command             # Edit output of shell command
```

### Command Substitution
```bash
!!                     # Insert last shell command output
!ls                   # Execute ls command
!date                 # Insert current date/time
!whoami               # Insert current username
```

## Multiple File Editing

### File Navigation
```bash
n                      # Edit next file in argument list
P                      # Edit previous file in argument list
f                      # Display current file name
f <filename>           # Change current filename
```

### File Recovery
```bash
ed -r file             # Recover from crash (if ed created .ed file)
```

## Usage Examples

### Basic File Creation and Editing

#### Creating a New File
```bash
# Start ed without filename to create new file
ed
a                      # Enter append mode
#!/bin/bash
# This is a sample shell script
echo "Hello, World!"
date
.                      # End input mode
w script.sh            # Write to file
q                      # Quit
```

#### Editing an Existing File
```bash
# Edit existing file
ed document.txt
1p                     # Print first line
$p                     # Print last line
10p                    # Print line 10
.                      # Print current line
5,10p                  # Print lines 5-10
q                      # Quit
```

### Navigation and Movement

#### Line-based Navigation
```bash
ed large_file.txt
1                      # Go to line 1
100                    # Go to line 100
$                      # Go to last line
-5                     # Go 5 lines up
+3                     # Go 3 lines down
p                      # Print current line
n                      # Print with line number
```

#### Pattern-based Navigation
```bash
ed config.txt
/error                 # Find next line containing "error"
/error/p               # Find and print line containing "error"
?function              # Search backward for "function"
//                     # Repeat last search forward
??                     # Repeat last search backward
```

### Text Insertion

#### Adding Content
```bash
ed file.txt
$a                     # Append after last line
New line at end
Another new line
.                      # End input mode
w                      # Save

1i                     # Insert before first line
#!/usr/bin/env python3
# Python script header
.                      # End input mode
w                      # Save
```

#### Adding at Specific Lines
```bash
ed file.txt
5a                     # Append after line 5
# New comment section
# Added by ed editor
.                      # End input mode
w                      # Save
```

### Search and Replace Operations

#### Simple Substitutions
```bash
ed document.txt
s/old/new/             # Replace first occurrence on current line
s/old/new/g            # Replace all occurrences on current line
%s/old/new/g           # Replace throughout entire file
1,10s/error/Error/g    # Replace in first 10 lines only
```

#### Complex Substitutions
```bash
ed code.c
1,$s/printf/printf_debug/g    # Replace all printf with printf_debug
g/main(/,+10s/i/index/g        # Replace 'i' with 'index' in main function
/^#include/a                    # Add line after all includes
#include "custom.h"
.                              # End input mode
w
```

#### Substitution with Confirmations
```bash
ed file.txt
g/pattern/p             # First, find all lines with pattern
g/pattern/s/old/new/g   # Then substitute on those lines
w
```

### Global Operations

#### Global Deletion
```bash
ed large_file.txt
g/DEBUG/d               # Delete all lines containing "DEBUG"
g/^$/d                  # Delete all empty lines
g/^#/d                  # Delete all comment lines
v/^[[:space:]]*#/d      # Delete all non-comment lines
w
```

#### Global Substitution
```bash
ed config_file
g/option/s/false/true/g  # Set all options to true
g/^[[:space:]]*$/d       # Remove all blank lines
g/^print/s/print/debug_print/g  # Add debug prefix to print statements
w
```

#### Global Content Extraction
```bash
ed log_file.txt
g/error/w errors.log     # Extract all error lines to separate file
g/warning/w warnings.log # Extract all warning lines
1,$w full_backup.txt     # Save complete copy
q
```

### File Processing

#### Log File Management
```bash
# Archive old log entries
ed application.log
/^2023:/d               # Delete lines from 2023
1,/2024:01/d            # Delete until January 2024
w cleaned.log
q
```

#### Configuration File Updates
```bash
ed /etc/ssh/sshd_config
/^Port/s/^/# /           # Comment out Port directive
$ a                     # Add new configuration at end
Port 2222
PermitRootLogin no
.
w
q
```

#### Code Refactoring
```bash
ed source.c
g/printf.*DEBUG/d       # Remove debug print statements
1,10s/int/long/g        # Change int to long in first 10 lines
%s/old_function/new_function/g  # Rename function globally
w refactored.c
q
```

### Automation and Scripting

#### Creating ed Scripts
```bash
# Create ed script file
cat > cleanup.ed <<'EOF'
g/^$/d                  # Remove empty lines
1,$s/^[ \t]*//          # Remove leading whitespace
1,$s/[ \t]*$//          # Remove trailing whitespace
w cleaned.txt
q
EOF

# Execute script on multiple files
for file in *.txt; do
    ed -s "$file" < cleanup.ed
done
```

#### Batch Processing
```bash
#!/bin/bash
# Process multiple files with ed commands

for file in *.c; do
    echo "Processing $file..."
    ed -s "$file" <<EOF
g/^#include/d            # Remove include statements
1,$s/printf/fprintf/g    # Replace printf with fprintf
g/main/a                 # Add return statement after main
    return 0;
.
w
q
EOF
done
```

### Advanced Operations

#### Pattern-based Editing
```bash
ed source_file.c
/^function/,/^}/p       # Print entire function
/^static/,/^{$/d        # Delete static variable declarations
g/main(/,+20s/i/idx/g  # Replace 'i' with 'idx' in main function context
w
```

#### Complex Range Operations
```bash
ed data_file.txt
1,50w header.txt        # Save first 50 lines as header
51,$w data.txt          # Save rest as data
q

# Create interleaved output
ed numbers.txt
g/[0-9]$/m0            # Move all numbered lines to top
1,$g/[0-9]$/w numbers_only.txt  # Extract only numbered lines
1,$v/[0-9]$/w text_only.txt     # Extract only text lines
q
```

#### Regular Expression Processing
```bash
# Email address extraction and validation
ed emails.txt
g/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/p
g/^[^@]*@[^@]*\.[^@]*$/w valid_emails.txt
g/^[^@]*@[^@]*$/d      # Remove malformed emails

# Phone number formatting
ed contacts.txt
s/(\([0-9]{3}\))\([0-9]{3}\)\([0-9]{4}\)/\1-\2-\3/g
s/\([0-9]{3}\)\([0-9]{3}\)\([0-9]{4}\)/\1-\2-\3/g
w formatted_contacts.txt
q
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# Backup and modify system configuration
ed /etc/hosts
w /etc/hosts.bak        # Create backup
127.0.0.1 localhost     # Add new entry line
127.0.0.1 myapp.local
.
w
q

# Service configuration updates
ed /etc/ssh/sshd_config
/^Port/s/^/# /           # Comment out default port
$ a                     # Add new configuration
Port 2222
MaxAuthTries 3
.
w /etc/ssh/sshd_config.new
q
```

#### Log File Processing
```bash
# Extract and archive specific log entries
ed /var/log/nginx/access.log
g/error/w error_log.txt   # Extract error entries
g/404/w not_found.txt     # Extract 404 entries
1,$w access_backup.txt    # Create full backup
q

# Clean old log entries
ed application.log
/^2023:/d                  # Remove 2023 entries
g/DEBUG/d                  # Remove debug messages
w cleaned.log
q
```

#### User Configuration Updates
```bash
# Add aliases to shell configuration
ed ~/.bashrc
$ a                        # Append at end
# Custom aliases
alias ll='ls -la'
alias la='ls -A'
alias grep='grep --color=auto'
.
w
q

# Update PATH variable
ed ~/.bashrc
/^export PATH=/a
export PATH=$PATH:/usr/local/bin
.
w
q
```

### Development Workflow

#### Code Documentation
```bash
# Add header comments to source files
ed main.c
1i                        # Insert at beginning
/*
 * File: main.c
 * Author: Developer Name
 * Date: $(date +%Y-%m-%d)
 * Description: Main program entry point
 */
.
w
q

# Add function documentation
ed utils.c
g/^int/s/^int/\/*\n * Function: \n * Description: \n *\/\nint/
w
q
```

#### Code Refactoring
```bash
# Rename variables across multiple files
for file in *.c; do
    ed -s "$file" <<EOF
1,$s/oldVariableName/newVariableName/g
g/oldVariableName/d      # Remove any remaining instances
w
q
EOF
done

# Add error handling to functions
ed source.c
g/^int main(/,+5 a       # Add error handling after main function start
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <argument>\n", argv[0]);
        return 1;
    }
.
w
q
```

#### Build System Updates
```bash
# Update Makefile
ed Makefile
g/^CC=/s/gcc/clang/      # Change compiler
/^CFLAGS/a
CFLAGS += -Wall -Wextra -O2
.
w
q

# Add new target to Makefile
ed Makefile
$ a
# Custom target
debug: CFLAGS += -g -DDEBUG
debug: $(TARGET)
.
w
q
```

### Data Processing

#### CSV File Manipulation
```bash
# Remove header and format CSV data
ed data.csv
1d                        # Remove header line
1,$s/,/|/g               # Replace commas with pipes
1,$s/^[[:space:]]*//     # Remove leading whitespace
w formatted_data.txt
q

# Filter data based on conditions
ed inventory.csv
g/out of stock/d          # Remove out of stock items
g/^[^,]*,0,/d            # Remove items with quantity 0
1,$s/^\([^,]*\),\([^,]*\)/\1|\2/  # Reformat columns
w active_inventory.txt
q
```

#### Text File Cleanup
```bash
# Remove extra whitespace and format text
ed document.txt
1,$s/  */ /g            # Convert multiple spaces to single
1,$s/^/    /g           # Indent all lines
g/^$/d                  # Remove empty lines
1,$s/[ \t]*$//          # Remove trailing whitespace
w formatted_document.txt
q

# Process configuration comments
ed config.cfg
g/^#/d                  # Remove all comment lines
g/^[[:space:]]*$/d      # Remove blank lines
1,$s/^[[:space:]]*//    # Remove leading whitespace
w clean_config.cfg
q
```

## Advanced Scripting

### Complex Automation Scripts

#### Multi-file Processing Pipeline
```bash
#!/bin/bash
# Advanced multi-file processing with ed

# Configuration
SOURCE_DIR="/data/input"
OUTPUT_DIR="/data/output"
PATTERN="ERROR"

# Process each file
for file in "$SOURCE_DIR"/*.log; do
    filename=$(basename "$file")

    # Create processing script
    cat > script.ed <<EOF
g/$PATTERN/w "$OUTPUT_DIR/${filename%.log}_errors.txt"
g/$PATTERN/d
1,$s/\([0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\) \([0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}\)/\1T\2Z/
1,$w "$OUTPUT_DIR/$filename"
q
EOF

    # Process file
    ed -s "$file" < script.ed
done

echo "Processing complete. Check $OUTPUT_DIR for results."
```

#### Configuration Management Script
```bash
#!/bin/bash
# System configuration management with ed

CONFIG_FILES=(
    "/etc/ssh/sshd_config"
    "/etc/nginx/nginx.conf"
    "/etc/my.cnf"
)

for config in "${CONFIG_FILES[@]}"; do
    if [[ -f "$config" ]]; then
        echo "Processing $config..."

        # Create backup
        cp "$config" "${config}.backup.$(date +%Y%m%d_%H%M%S)"

        # Apply standard security hardening
        ed -s "$config" <<EOF
/#.*PermitRootLogin/s/#.*PermitRootLogin.*/PermitRootLogin no/
/#.*PasswordAuthentication/s/#.*PasswordAuthentication.*/PasswordAuthentication no/
/#.*Protocol/s/#.*Protocol.*/Protocol 2/
w
q
EOF
    fi
done

echo "Security hardening complete."
```

### Error Handling and Recovery

#### Safe File Editing with Backup
```bash
#!/bin/bash
# Safe file editing with automatic backup

safe_edit() {
    local file="$1"
    local backup_dir="${2:-.}"
    local timestamp=$(date +%Y%m%d_%H%M%S)

    if [[ ! -f "$file" ]]; then
        echo "Error: File $file does not exist"
        return 1
    fi

    # Create backup
    cp "$file" "$backup_dir/${file##*/}.backup.$timestamp"

    # Edit file
    ed -s "$file" <<'EOF'
g/TODO/w todo_items.txt
g/TODO/d
1,$s/^[ \t]*//        # Remove leading whitespace
1,$s/[ \t]*$//        # Remove trailing whitespace
g/^$/d                # Remove empty lines
w
q
EOF

    echo "File $file edited successfully"
    echo "Backup created: ${file##*/}.backup.$timestamp"
}

# Usage example
safe_edit "/path/to/config.conf" "/path/to/backups"
```

#### Batch File Validation and Correction
```bash
#!/bin/bash
# Validate and correct configuration files

validate_and_fix() {
    local config_file="$1"

    ed -s "$config_file" <<EOF
g/^[^=]*=$/d           # Remove empty value assignments
g/^#/w comments.txt    # Extract comments
g/^#/d                 # Remove comments from main file
1,$s/=[[:space:]]*/=/g # Remove spaces after equals
1,$s/[[:space:]]*$//   # Remove trailing spaces
w
q
EOF

    echo "Validated and fixed: $config_file"
}

# Process all .conf files in directory
for conf in /etc/*.conf; do
    validate_and_fix "$conf"
done
```

## Integration with Other Tools

### Pipeline Integration
```bash
# Use ed with pipes
cat file1.txt file2.txt | ed -s - <<'EOF'
1,$s/old/new/g
w combined.txt
q
EOF

# Process output from other commands
ls -la | ed -s - <<'EOF'
1,$s/\(^.\{1,10\}\)\(.\{3,3\}\)\(.\{8,8\}\)/\1 \2 \3/
w formatted_ls.txt
q
EOF
```

### Shell Script Integration
```bash
# Interactive configuration editor
edit_config() {
    local config="$1"

    echo "Current configuration:"
    ed -s "$config" <<'EOF'
,p
q
EOF

    echo -e "\nCommands available:"
    echo "1. Add new entry"
    echo "2. Remove entry by pattern"
    echo "3. Replace value"
    echo "4. View all entries"

    read -p "Choose option (1-4): " choice

    case $choice in
        1)
            read -p "Enter new line: " line
            ed -s "$config" <<EOF
$a
$line
.
w
q
EOF
            ;;
        2)
            read -p "Enter pattern to remove: " pattern
            ed -s "$config" <<EOF
g/$pattern/d
w
q
EOF
            ;;
        3)
            read -p "Enter old value: " old
            read -p "Enter new value: " new
            ed -s "$config" <<EOF
s/$old/$new/g
w
q
EOF
            ;;
        4)
            ed -s "$config" <<'EOF'
,p
q
EOF
            ;;
    esac
}
```

## Performance Considerations

### Large File Handling
```bash
# Process files in chunks for better performance
ed huge_file.txt <<EOF
1,1000w part1.txt       # Process first 1000 lines
1001,2000w part2.txt    # Process next 1000 lines
2001,$w part3.txt       # Process remainder
q
EOF

# Use range operations to minimize memory usage
ed large_file.txt
1,500d                  # Delete first 500 lines if not needed
501,$w trimmed_file.txt # Save remaining content
q
```

### Efficient Pattern Matching
```bash
# Use specific patterns to improve performance
ed log_file.txt
g/ERROR[[:space:]]\+/w errors.txt  # More specific than just "ERROR"
g/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/w ip_addresses.txt
w
q
```

## Troubleshooting

### Common Issues and Solutions

#### File Permission Problems
```bash
# Check and fix file permissions
if [[ ! -w "$file" ]]; then
    echo "File is not writable. Attempting to fix permissions..."
    chmod u+w "$file"

    # Try editing again
    ed -s "$file" <<'EOF'
1,$p
q
EOF
fi
```

#### Memory Issues with Large Files
```bash
# Handle large files by processing in sections
ed large_file.txt <<'EOF'
1,1000w section1.txt
1001,$w remainder.txt
e section1.txt
# Process section1...
w section1_processed.txt
q
ed remainder.txt
# Process remainder...
w remainder_processed.txt
q
```

#### Pattern Matching Problems
```bash
# Escape special characters properly
ed file.txt <<'EOF'
s/\./dot/g              # Escape literal dot
s/\$amount/\$total/g     # Escape dollar sign
s/\[text\]/[replaced]/g  # Escape brackets
w
q
EOF
```

#### Undo Operations
```bash
# Since ed doesn't have undo, use backup strategy
ed file.txt
w file.txt.backup       # Create backup before major changes
# ... make changes ...
# If something goes wrong:
e file.txt.backup       # Restore from backup
```

### Debugging ed Scripts
```bash
# Use verbose mode for debugging
ed -v -s test.txt < script.ed

# Add print statements to track progress
cat > debug_script.ed <<'EOF'
1p                       # Print first line to verify file loaded
/error/p                 # Show lines that match pattern
s/old/new/g
1,$p                     # Show all changes
q
EOF
```

## Related Commands

- [`vi`](/docs/commands/editors/vi) - Visual editor (evolved from ed)
- [`vim`](/docs/commands/editors/vim) - Vi IMproved with enhanced features
- [`ex`](/docs/commands/editors/ex) - EX editor mode (similar to ed)
- [`sed`](/docs/commands/text-processing/sed) - Stream editor with similar syntax
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and text processing
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching in files
- [`nano`](/docs/commands/editors/nano) - Simple terminal-based text editor
- [`emacs`](/docs/commands/editors/emacs) - Advanced text editor with ed-mode

## Best Practices

1. **Always create backups** before making major edits with `w filename.backup`
2. **Use absolute line numbers** for precise editing operations
3. **Test substitutions** with `p` command before applying global changes
4. **Use quiet mode** (`-s`) for automated processing to suppress prompts
5. **Script repetitive operations** for consistency and efficiency
6. **Validate patterns** before global operations to avoid unintended matches
7. **Use specific patterns** rather than broad ones to improve performance
8. **Process large files in chunks** to avoid memory issues
9. **Use appropriate delimiters** when patterns contain slashes
10. **Save frequently** with `w` to prevent data loss during long editing sessions

## Performance Tips

1. **Line-based operations** are more efficient than character-based for large files
2. **Global commands** (`g` and `v`) are optimized for pattern-based operations
3. **Range operations** minimize memory usage compared to loading entire file
4. **Specific patterns** (with character classes and quantifiers) improve performance
5. **Batch operations** are faster than multiple individual operations
6. **Quiet mode** (`-s`) reduces overhead in automated processing
7. **Avoid unnecessary print commands** in scripts for better performance
8. **Use appropriate addressing** (patterns vs line numbers) based on context
9. **Complex substitutions** with backreferences can be resource-intensive
10. **Regular expression complexity** impacts performance - use simpler patterns when possible

The `ed` editor, while appearing primitive by modern standards, provides powerful and predictable text manipulation capabilities through its command-based interface. Its strength lies in simplicity, scriptability, and efficiency for specific use cases like automated text processing, remote editing over poor connections, and working with very large files. Understanding ed provides insight into Unix text editing history and offers a reliable tool for scenarios where screen-based editors might be impractical or resource-intensive.