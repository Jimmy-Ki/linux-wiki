---
title: ex - EX editor
sidebar_label: ex
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ex - EX editor

The `ex` command starts the vi editor in Ex mode, providing a line-oriented editing interface. Ex mode is the original line editor from which vi was developed, operating purely with command-line text manipulation without the visual screen editing of vi. This mode is particularly useful for scripting automated edits and working in environments where visual editing isn't available or practical.

## Basic Syntax

```bash
ex [options] [filename]
```

## Common Options

### Display Options

- `-c <command>` - Execute command after loading first file
- `-e` - Start in Ex mode (same as vi -E)
- `-R` - Read-only mode
- `-s` - Silent mode (no error messages)
- `-v` - Start in vi mode (default for vi command)

### File Options

- `-r` - Recovery mode (after crash)
- `-t <tag>` - Edit file containing tag
- `+<command>` - Execute command after loading file

### Information Options

- `--version` - Display version information
- `--help` - Display help information

## Operating Modes

### Ex Mode
The default mode for the `ex` command. All editing is done through command-line instructions without visual feedback.

### Vi Mode
Can be entered from Ex mode using the `:vi` or `:visual` command to access full vi functionality.

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
w! filename     # Force write to file (overwrite)
q               # Quit (if no unsaved changes)
q!              # Force quit without saving changes
x               # Save and exit (same as :wq)
```

### Navigation and Display

```bash
# Line addressing
.               # Current line
$               # Last line
<number>        # Specific line number
-number         # Relative line (current - number)
+number         # Relative line (current + number)

# Display commands
p               # Print current line
<number>p       # Print specified line
<number1,number2p   # Print range of lines
z               # Print current line centered in screen
<number>z       # Print specified line centered
```

### Text Insertion

```bash
# Insert commands
a               # Append text after current line
<number>a       # Append after specified line
i               # Insert text before current line
<number>i       # Insert before specified line
o               # Open new line after current line
<number>o       # Open new line after specified line

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
co<number>      # Copy lines after specified line (alternative)

# Moving text
m<number>       # Move lines after specified line
<number1,number2m<number3>  # Move range after line
mo<number>      # Move lines after specified line (alternative)
```

### Search and Substitution

```bash
# Search commands
/pattern        # Find next line containing pattern
?pattern        # Find previous line containing pattern
n               # Repeat last search in same direction
N               # Repeat last search in opposite direction

# Substitution commands
s/old/new/      # Substitute first occurrence on current line
s/old/new/g     # Substitute all occurrences on current line
<number>s/old/new/     # Substitute on specified line
<number1,number2s/old/new/g    # Substitute in range
%s/old/new/g     # Substitute throughout entire file
g/pattern/s/old/new/      # Substitute on lines containing pattern
v/pattern/s/old/new/      # Substitute on lines NOT containing pattern
```

### Global Commands

```bash
# Global operations
g/pattern/command       # Execute command on lines containing pattern
g/pattern/d             # Delete lines containing pattern
g/pattern/s/old/new/g    # Substitute on lines containing pattern
g/pattern/p             # Print lines containing pattern
v/pattern/command       # Execute command on lines NOT containing pattern
v/pattern/d             # Delete lines NOT containing pattern
```

## Advanced Commands

### Buffer Management

```bash
# Buffer operations
b!              # Like b, but discard changes
bn              # Next buffer
bN              # Previous buffer
bp              # Previous buffer
bf              # First buffer
bl              # List buffers
```

### Shell Integration

```bash
# Shell command execution
!command        # Execute shell command
!!              # Repeat last shell command
<number>!command# Pipe line range to shell command
w !command      # Write buffer to shell command
r !command      # Read shell command output
```

### Marking and Jumping

```bash
# Marks
ma              # Set mark 'a'
`a              # Go to mark 'a'
'a              # Go to first character of line containing mark 'a'
```

### Undo and Redo

```bash
# Undo operations
u               # Undo last change
U               # Restore current line to original state
```

### Visual Mode Transition

```bash
# Enter vi visual mode
vi              # Enter vi mode at current line
visual          # Enter vi mode at current line
```

## Usage Examples

### Basic File Editing

```bash
# Start Ex mode
ex

# Create new file
a
Hello, World!
This is line 2
Third line
.
w newfile.txt
q

# Edit existing file
ex existing.txt
1,$p            # Print entire file
3d              # Delete line 3
w               # Save changes
q               # Quit
```

### Search and Replace Operations

```bash
# Simple substitution
ex file.txt
%s/old/new/g    # Replace throughout file
w
q

# Conditional substitution
ex document.txt
g/error/s/error/fatal_error/g    # Replace on lines containing 'error'
w
q

# Interactive substitution
ex source.c
%s/printf/DEBUG_printf/gc    # Replace with confirmation
w
q
```

### Pattern-Based Editing

```bash
# Delete comment lines
ex config.txt
g/^#/d         # Delete lines starting with #
g/^$/d         # Delete empty lines
w
q

# Process log files
ex access.log
g/ERROR/p      # Print lines containing ERROR
g/404/w not_found.txt    # Write 404 errors to file
q
```

### File Processing

```bash
# Extract specific lines
ex large_file.txt
1,100w first_part.txt     # Write first 100 lines
101,$w second_part.txt    # Write remaining lines
q

# Reorder file
ex numbers.txt
/^1/d          # Delete lines starting with 1
w reordered.txt
q
```

### Programming Tasks

```bash
# Add include statement
ex source.c
- 1i
#include <stdio.h>
#include <stdlib.h>
.
w
q

# Remove debug statements
ex program.c
g/DEBUG/d      # Delete lines containing DEBUG
w
q

# Add function template
ex module.c
$a

int new_function()
{
    return 0;
}
.
w
q
```

## Advanced Usage

### Complex Pattern Matching

```bash
# Regular expression substitutions
ex text.txt
s/\([a-z]\)\([A-Z]\)/\1 \2/g    # Add space between lower and upper case
s/\([0-9]\{3\}\)\([0-9]\{3\}\)\([0-9]\{4\})/(\1) \2-\3/g  # Format phone numbers
w
q
```

### Range Operations

```bash
# Complex ranges
ex document.txt
/^Chapter/,/^Chapter/-1d          # Delete between chapter headers
1,/^$/d                          # Delete up to first empty line
/function/,/^}/w function.txt    # Write function to file
w
q
```

### Multiple File Editing

```bash
# Edit multiple files
ex file1.txt file2.txt file3.txt
n               # Next file
prev            # Previous file
args            # Show argument list
w file4.txt     # Write to new file
q
```

### Shell Command Integration

```bash
# Use external commands
ex data.txt
!grep -c "ERROR" %   # Count errors in current file
!sort % > sorted.txt # Sort current file
r !date              # Insert current date
w
q
```

## Scripting and Automation

### Ex Script Files

```bash
# Create Ex script
cat > script.ex <<'EOF'
g/^#/d                  # Remove comments
g/^$/d                  # Remove empty lines
%s/  */ /g              # Reduce multiple spaces to one
1,$s/^/    /g           # Indent all lines
w processed.txt
q
EOF

# Execute script
ex -s input.txt < script.ex
```

### Pipeline Integration

```bash
# Process files in pipeline
cat *.txt | ex -s - <<'EOF'
g/TODO/w todo_items.txt
g/TODO/d
w cleaned.txt
q
EOF
```

### Batch Processing Script

```bash
#!/bin/bash
# Process multiple files with Ex

for file in *.c; do
    ex -s "$file" <<EOF
g/DEBUG/d
g/include <stdio.h>/i
#include "common.h"
.
w
q
EOF
done
```

## Practical Examples

### Configuration File Management

```bash
# Update configuration file
sudo ex /etc/ssh/sshd_config <<'EOF'
/^Port/s/Port .*/Port 2222/
w
q
EOF

# Comment out deprecated settings
ex config.txt <<'EOF'
g/^old_setting/s/^/# /
w
q
EOF
```

### Log File Analysis

```bash
# Extract error messages from log
ex /var/log/syslog <<'EOF'
g/ERROR/w errors.txt
g/WARNING/w warnings.txt
q
EOF

# Filter log by date range
ex access.log <<'EOF'
/^2024:/d                # Remove old entries
1,/2024:01/d            # Keep only January 2024
w january_2024.log
q
EOF
```

### Source Code Refactoring

```bash
# Rename function across multiple files
for file in *.c; do
    ex -s "$file" <<EOF
g/old_function(/s/old_function/new_function/g
w
q
EOF
done

# Add header to all source files
for file in *.h; do
    ex -s "$file" <<EOF
- 0i
/* Header automatically added */
/* Date: $(date) */
.
w
q
EOF
done
```

### Text Processing

```bash
# Format document
ex document.txt <<'EOF'
1,$s/^[ \t]*//    # Remove leading whitespace
1,$s/[ \t]*$//    # Remove trailing whitespace
1,$s/  */ /g      # Convert multiple spaces to single
g/^$/d            # Remove empty lines
w formatted.txt
q
EOF
```

## Integration with vi

### Switching Between Modes

```bash
# Start in Ex mode, switch to vi
ex file.txt
1,$p              # Ex commands
vi                # Switch to vi visual mode
# Use vi commands
:q                # Return to Ex mode or quit
```

### Using vi Commands in Ex Mode

```bash
# Many vi commands work in Ex mode
ex file.txt
:set number       # Show line numbers
:set list         # Show special characters
:1,$s/old/new/g   # Global substitution
:w newfile.txt    # Write to new file
:q
```

## Related Commands

- [`vi`](/docs/commands/editors/vi) - Visual editor (Ex mode is part of vi)
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`ed`](/docs/commands/editors/ed) - Line-oriented editor
- [`sed`](/docs/commands/text-processing/sed) - Stream editor (similar syntax)
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching

## Best Practices

1. **Save frequently** with `w` to prevent data loss
2. **Test substitutions** on small ranges first
3. **Use visual mode** (`vi`) for complex edits
4. **Create backups** before major operations
5. **Use global commands** for efficient bulk operations
6. **Script repetitive tasks** for consistency
7. **Use shell integration** for combining with other tools
8. **Validate patterns** before global changes
9. **Use `-s` flag** for automated processing
10. **Test scripts** on non-critical files first

## Common Issues and Solutions

### Unsaved Changes

```bash
# Ex will warn about unsaved changes
ex file.txt
# Make changes
q                # Will warn: No write since last change
q!               # Force quit without saving
```

### Complex Patterns

```bash
# Escape special characters in patterns
s/\//\\/g         # Escape forward slashes
s/\./\\./g        # Escape literal dots
```

### Large Files

```bash
# Process large files efficiently
ex -s large_file.txt <<'EOF'
1,1000w part1.txt
1001,$w part2.txt
q
EOF
```

### Script Debugging

```bash
# Add verbose output for debugging
ex -V -s file.txt < script.ex
```

The `ex` command provides powerful line-oriented text editing capabilities that are particularly valuable for automated text processing, scripting, and working in environments where visual editors aren't available. While it lacks the immediate visual feedback of vi, its command-based interface makes it ideal for systematic text manipulation, batch processing, and integration into shell scripts. Understanding Ex mode is essential for mastering the full capabilities of the vi/vim editing ecosystem.