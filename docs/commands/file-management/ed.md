---
title: ed - Line-oriented text editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ed - Line-oriented text editor

The `ed` command is a line-oriented text editor that was one of the first Unix text editors. While it appears primitive by modern standards, ed is still valuable for editing files over slow connections, scripting automated edits, and working with very large files. It's the predecessor to vi and ex modes.

## Basic Syntax

```bash
ed [options] [filename]
```

## Common Options

- `-G`, `--traditional` - Run in traditional mode (compatible with original ed)
- `-p <string>`, `--prompt=<string>` - Set command prompt to specified string
- `-s`, `--quiet`, `--silent` - Suppress diagnostics and verbose output
- `-`, `--` - Treat remaining arguments as file names
- `--help` - Display help information
- `--version` - Display version information

## Operating Modes

ed operates in two modes:

### Command Mode
Default mode where you enter editing commands. All input is interpreted as commands.

### Input Mode
Activated by append, insert, or change commands. Text entered is added to the buffer until a single period `.` on a line by itself is entered to exit.

## Basic Commands

### File Operations

```bash
# File management
e filename      # Edit file (replace current buffer)
E filename      # Edit file without checking for unsaved changes
r filename      # Read file into buffer after current line
f filename      # Set filename for current buffer
f               # Display current filename
w filename      # Write buffer to file
w               # Write buffer to current file
q               # Quit (if no unsaved changes)
Q               # Force quit without saving changes
```

### Navigation

```bash
# Line addressing
.               # Current line
$               # Last line
<number>        # Specific line number
-number         # Relative line (current - number)
+number         # Relative line (current + number)
%               # Entire file (1,$)
/pattern/       # Next line containing pattern
?pattern?       # Previous line containing pattern
```

### Movement Commands

```bash
# Absolute movement
<number>p       # Print specific line
$p              # Print last line
.p              # Print current line

# Pattern-based movement
/pattern/p      # Print first line containing pattern
/pattern/       # Move to next line containing pattern
?pattern?       # Move to previous line containing pattern
```

### Text Insertion

```bash
# Insert commands
a               # Append text after current line
<number>a       # Append after specified line
i               # Insert text before current line
<number>i       # Insert before specified line
c               # Change (replace) current line
<number>c       # Change specified line

# End input mode with single period
.
```

### Deletion Commands

```bash
# Deleting text
d               # Delete current line
<number>d       # Delete specified line
d$              # Delete from current to end
d1              # Delete from beginning to current
/ pattern /d    # Delete lines matching pattern
<number1,number2>d    # Delete range of lines
```

### Copying and Moving

```bash
# Copying text
t<number>       # Copy lines after specified line
<number1,number2t<number3>  # Copy range after line

# Moving text
m<number>       # Move lines after specified line
<number1,number2m<number3>  # Move range after line
```

### Substitution

```bash
# Search and replace
s/old/new/      # Substitute first occurrence on current line
s/old/new/g     # Substitute all occurrences on current line
<number>s/old/new/     # Substitute on specified line
<number1,number2s/old/new/g    # Substitute in range
%s/old/new/g     # Substitute throughout entire file
/pattern/s/old/new/g      # Substitute on lines matching pattern
```

### Display Commands

```bash
# Printing content
p               # Print current line
<number>p       # Print specified line
<number1,number2p   # Print range of lines
p               # Print current line (same as .=p)
n               # Print line with line number
<number>n       # Print specified line with number
l               # Print line with special characters visible
<number>l       # Print specified line with special characters
```

### Global Commands

```bash
# Global operations
g/pattern/command       # Execute command on lines containing pattern
g/pattern/d             # Delete lines containing pattern
g/pattern/s/old/new/    # Substitute on lines containing pattern
v/pattern/command       # Execute command on lines NOT containing pattern
v/pattern/d             # Delete lines NOT containing pattern
```

## Advanced Commands

### Regular Expressions

```bash
# Regular expression patterns
.               # Any single character
*               # Zero or more of previous character
^               # Beginning of line
$               # End of line
[]              # Character class
\               # Escape special character
&               # Entire matched pattern in replacement
\n              # nth subpattern in replacement
```

### Context Addressing

```bash
# Complex addressing
/pattern1/,/pattern2/command   # Between two patterns
<number1,/pattern/command      # From line number to pattern
/pattern/,+numbercommand       # From pattern for number of lines
```

### Shell Integration

```bash
# Shell command execution
!command        # Execute shell command
!               # Repeat last shell command
<number>!command# Pipe line range to shell command
w !command      # Write buffer to shell command
r !command      # Read shell command output
```

### Multiple Files

```bash
# File switching
n               # Edit next file
P               # Edit previous file
f               # Display current file name
```

## Usage Examples

### Basic File Creation and Editing

```bash
# Create new file
ed
a                    # Enter append mode
Hello, World!
This is line 2
.                    # End input mode
w myfile.txt         # Save file
q                    # Quit

# Edit existing file
ed existing.txt
p                    # Print current line
$                    # Go to last line
p                    # Print last line
1                    # Go to first line
p                    # Print first line
```

### Pattern Searching

```bash
# Search for pattern
/term/p              # Find and print line containing "term"
/function/p          # Find function definition
/error/              # Move to line containing "error"

# Continue search
n                    # Repeat last search
//p                  # Repeat last search and print
```

### Text Insertion

```bash
# Add lines at end
ed file.txt
$a                   # Append after last line
New line at end
Another new line
.                    # End input mode
w                    # Save

# Insert at beginning
1i                   # Insert before line 1
First line
.                    # End input mode
w                    # Save
```

### Search and Replace

```bash
# Simple substitution
ed file.txt
s/old/new/           # Replace first occurrence
s/old/new/g          # Replace all occurrences on current line
%s/old/new/g         # Replace throughout file

# Substitute in specific range
1,10s/error/Error/g  # Replace in first 10 lines
/function/,/end/s/var/variable/g  # Replace between patterns
```

### Deleting Content

```bash
# Delete specific lines
ed file.txt
3d                   # Delete line 3
5,8d                 # Delete lines 5 through 8
/error/d             # Delete line containing "error"
/^#/d                # Delete comment lines
```

### Global Operations

```bash
# Global delete
ed file.txt
g/DEBUG/d            # Delete all lines containing "DEBUG"
v/^[A-Z]/d           # Delete lines NOT starting with capital letter

# Global substitution
g/var/s/var/variable/g    # Replace on lines containing "var"
```

### Pattern-Based Editing

```bash
# Complex pattern matching
ed config.txt
/^include/i          # Insert before lines starting with "include"
#include <stdio.h>
.                    # End input mode

g/main/a             # Append after lines containing "main"
    return 0;
}
.                    # End input mode
```

## Practical Examples

### Configuration File Editing

```bash
# Comment out lines in config file
ed /etc/ssh/sshd_config
/^Port/s/^/# /       # Comment out Port directive
w
q

# Add new configuration
ed ~/.bashrc
$a                   # Append at end
# Custom aliases
alias ll='ls -la'
alias la='ls -A'
.                    # End input mode
w
q
```

### Log File Processing

```bash
# Extract error lines from log
ed /var/log/syslog
g/error/w error_log.txt    # Write error lines to new file
q

# Remove log entries older than specific date
ed application.log
/^2023:/d            # Delete lines from 2023
1,/2024:01/d         # Delete until January 2024
w
q
```

### Source Code Editing

```bash
# Add include statement
ed source.c
1i                   # Insert at beginning
#include <stdio.h>
#include <stdlib.h>

.                    # End input mode
w
q

# Remove debug statements
ed program.c
g/printf.*DEBUG/d    # Remove debug print statements
w
q
```

### Text Processing

```bash
# Format text file
ed document.txt
1,$s/  */ /g        # Convert multiple spaces to single
1,$s/^/    /g        # Indent all lines
w formatted.txt      # Save as new file
q

# Remove blank lines
ed file.txt
g/^$/d               # Delete empty lines
w
q
```

### Batch Processing Script

```bash
#!/bin/bash
# Script to process multiple files with ed

for file in *.txt; do
    ed -s "$file" <<EOF
g/TODO/w todo_${file}
g/TODO/d
w
q
EOF
done
```

## Advanced Usage

### Complex Pattern Matching

```bash
# Multi-line patterns
ed file.txt
/^function/,/^}/p   # Print entire function

# Context-sensitive substitution
ed code.c
/main(/,+10s/i/idx/  # Replace 'i' with 'idx' within main function
w
q
```

### Range Operations

```bash
# Complex ranges
ed large_file.txt
1,50w part1.txt     # Write first 50 lines
51,$w part2.txt     # Write remainder
q

# Interleave lines
ed numbers.txt
g/[0-9]$/m0         # Move numbered lines to top
w
q
```

### Regular Expression Examples

```bash
# Email address validation/extracting
ed emails.txt
g/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/p
q

# Phone number formatting
ed contacts.txt
s/(\([0-9]{3}\))\([0-9]{3}\)\([0-9]{4}\)/\1-\2-\3/g
w
q
```

## Automation and Scripting

### ed Scripts

```bash
# Create ed script file
cat > script.ed <<'EOF'
g/^#/d                # Remove comments
1,$s/^[ \t]*//        # Remove leading whitespace
1,$s/[ \t]*$//        # Remove trailing whitespace
w cleaned.txt
q
EOF

# Execute script
ed -s input.txt < script.ed
```

### Pipeline Integration

```bash
# Use ed in pipeline
cat file1 file2 file3 | ed -s - <<'EOF'
H                    # Enable error messages
1,$s/old/new/g       # Global substitution
w combined.txt       # Write result
q
EOF
```

### Backup and Restore

```bash
# Create backup before editing
ed -s file.txt <<'EOF'
w file.txt.bak       # Create backup
g/temporary/d        # Remove temporary content
w
q
EOF
```

## Related Commands

- [`vi`](/docs/commands/editors/vi) - Visual editor (evolved from ed)
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`ex`](/docs/commands/editors/ex) - EX editor mode
- [`sed`](/docs/commands/text-processing/sed) - Stream editor (similar syntax)
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching

## Best Practices

1. **Save frequently** with `w` to prevent data loss
2. **Use absolute line numbers** for precise editing
3. **Test substitutions** with `p` before global changes
4. **Create backups** before major edits
5. **Use regular expressions** efficiently for pattern matching
6. **Script repetitive operations** for consistency
7. **Use quiet mode** (`-s`) for automated processing
8. **Validate patterns** before global operations

## Common Issues and Solutions

### Accidental Data Loss

```bash
# Always check unsaved changes before quitting
ed file.txt
q                    # Will warn if unsaved changes
Q                    # Force quit without saving (use carefully)
```

### Pattern Matching Problems

```bash
# Escape special characters in patterns
s/\.\/file/\/new\/file/g    # Escape literal dots and slashes

# Use different delimiters if slash is in pattern
s+old/path+new/path+g       # Use + as delimiter
```

### Large File Handling

```bash
# Use range operations for large files
1,1000w part1.txt    # Process in chunks
1001,$w part2.txt
```

### Script Debugging

```bash
# Enable verbose mode for debugging
ed -V -s script.txt < commands.ed
```

The `ed` editor, while seemingly primitive, provides powerful text manipulation capabilities through its command-based interface. Its strength lies in predictability, scriptability, and efficiency for specific use cases. Understanding ed provides insight into Unix text editing history and offers a reliable tool for automated text processing tasks where visual editors might be impractical.