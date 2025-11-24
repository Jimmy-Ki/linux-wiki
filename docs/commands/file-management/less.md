---
title: less - View File Content Page by Page
sidebar_label: less
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# less - View File Content Page by Page

The `less` command displays file contents one page at a time, allowing backward and forward movement through the file. It's more advanced than `more` and is the preferred pager for viewing large files in Linux.

## Basic Syntax

```bash
less [OPTIONS] [FILE]...
```

## Common Options

### Display Options
- `-N, --line-numbers` - Display line numbers
- `-S, --chop-long-lines` - Chop long lines instead of wrapping
- `-w, --hilite-unread` - Highlight first unread line after movement
- `-i, --ignore-case` - Ignore case in searches
- `-I, --IGNORE-CASE` - Ignore case completely in searches

### Navigation Options
- `-X, --no-init` - Don't clear screen on exit
- `-F, --quit-if-one-screen` - Quit if entire file fits on first screen
- `-R, --RAW-CONTROL-CHARS` - Display control characters
- `-M, --LONG-PROMPT` - Show more detailed prompt

### Behavior Options
- `-e, --quit-at-eof` - Exit at end-of-file
- `-E, --QUIT-AT-EOF` - Quit at end-of-file twice
- `-f, --force` - Force opening of special files
- `-r, --raw-control-chars` - Display raw control characters

## Navigation Commands

### Movement
```bash
h / ?         # Show help screen
q             # Quit less
Space / f     # Forward one screen
b             # Backward one screen
d             # Forward half screen
u             # Backward half screen
j / Enter     # Forward one line
k             # Backward one line
G             # Go to end of file
g             # Go to beginning of file
10G           # Go to line 10
50%           # Go to 50% of file
```

### Searching
```bash
/pattern      # Search forward for pattern
?pattern      # Search backward for pattern
n             # Repeat last search (forward)
N             # Repeat last search (backward)
&pattern      # Display only matching lines
```

### Display Control
```bash
-N            # Toggle line numbers
-S            # Toggle line chop/wrap
-R            # Toggle raw control characters
-M            # Toggle detailed prompt
```

## Usage Examples

### Basic File Viewing
```bash
# View a file
less filename.txt

# View multiple files
less file1.txt file2.txt

# View with line numbers
less -N filename.txt

# Auto-quit if file fits on screen
less -F small_file.txt
```

### Search and Navigation
```bash
# Open file and search immediately
less +/error logfile.txt

# Open at specific line
less +100 config.txt

# View with case-insensitive search
less -i file.txt
```

### Advanced Options
```bash
# Don't clear screen on exit
less -X file.txt

# Chop long lines
less -S wide_log.txt

# Detailed prompt showing position
less -M large_file.txt
```

## Interactive Features

### Marking Positions
```bash
mx            # Mark current position as 'x'
'x            # Go to mark 'x'
''            # Go to previous position
```

### File Operations
```bash
:e file.txt   # Edit/view another file
:n            # Next file (when viewing multiple files)
:p            # Previous file
=             # Show file information
```

### Shell Commands
```bash
!command      # Execute shell command
|command      # Pipe current file to command
v             # Edit file in $EDITOR
```

## Practical Examples

### Log File Analysis
```bash
# View log file with line numbers
less -N /var/log/syslog

# Search for specific errors
less +/ERROR application.log

# Monitor live log (with tail -f)
tail -f logfile.txt | less
```

### Code Review
```bash
# View source code with syntax highlighting
less source.py

# Jump to specific function
less +/def main function.py

# View multiple files
less *.c *.h
```

### Configuration Files
```bash
# View configuration with search
less +/ServerName httpd.conf

# Compare files (requires patch)
diff file1.txt file2.txt | less
```

### Documentation Viewing
```bash
# View man pages
man -P less command

# View README files
less README.md

# View help output
command --help | less
```

## Search Patterns

### Regular Expressions
```bash
# Basic text search
/error/

# Case-insensitive search (with -i option)
/error/i

# Search for whole words
/\<error\>

# Search at beginning of line
/^Error/

# Search at end of line
/Error$/

# Complex regex
/Error.*[0-9]+.*failed/
```

### Search Operators
```bash
# OR search
/(error|warning)/

# Multiple patterns
/error/ AND /critical/    # Use two searches
```

## Display Customization

### Line Numbering
```bash
# Always show line numbers
less -N file.txt

# Toggle during viewing
N                    # Press 'N' while in less
```

### Line Wrapping
```bash
# Wrap long lines (default)
less file.txt

# Chop long lines
less -S file.txt

# Toggle during viewing
S                    # Press 'S' while in less
```

### Colors and Syntax
```bash
# Enable syntax highlighting (requires source-highlight)
export LESSOPEN="| /usr/share/source-highlight/src-hilite-lesspipe.sh %s"
export LESS=' -R '

# View code with colors
less program.py
```

## Pipes and Redirection

### Input from Pipes
```bash
# View command output
ls -la | less

# View search results
grep "error" logfile.txt | less

# View process list
ps aux | less
```

### Output Redirection
```bash
# Save viewed content to file
less file.txt > saved_content.txt

# Save specific lines
less file.txt | grep "pattern" > filtered.txt
```

## File Information

### File Statistics
```bash
# While in less, press:
=             # Show file path, size, lines, percentage
Ctrl-G        # Same as =
```

### Multiple Files
```bash
# View multiple files in sequence
less file1.txt file2.txt file3.txt

# Navigation between files
:n            # Next file
:p            # Previous file
:x            # First file
:d            # Remove current file from list
```

## Environment Variables

### Common Variables
```bash
# Default options
export LESS='-R -M -X'

# Syntax highlighting
export LESSOPEN="| /usr/bin/source-highlight -f esc -i %s"

# Editor integration
export LESSEDIT='%E ?lt+%lt. %f'
```

### Customization
```bash
# Add to ~/.bashrc
export LESS='-R -M -X --shift 5'
export LESSHISTFILE=~/.lesshst
export LESSCHARSET=utf-8
```

## Performance Tips

### Large Files
```bash
# For very large files:
less +G huge_file.txt          # Start at end
less +1000 large_file.txt      # Start at line 1000
```

### Memory Usage
```bash
# less is memory efficient
# Can handle files larger than available RAM
# Only loads needed portions into memory
```

## Integration with Other Tools

### Version Control
```bash
# View git diff
git diff | less

# View commit history
git log | less

# View file at specific commit
git show HEAD:file.txt | less
```

### System Monitoring
```bash
# View process list interactively
ps aux | less

# View network connections
netstat -an | less

# View disk usage
du -h . | less
```

## Related Commands

- [`more`](/docs/commands/text-processing/more) - Simpler pager
- [`cat`](/docs/commands/text-processing/cat) - Display entire file
- [`head`](/docs/commands/text-processing/head) - Display beginning of file
- [`tail`](/docs/commands/text-processing/tail) - Display end of file
- [`grep`](/docs/commands/text-processing/grep) - Search text patterns

## Best Practices

### Efficient Usage
1. **Use less for large files** instead of cat
2. **Learn keyboard shortcuts** for efficient navigation
3. **Use search patterns** to find relevant content quickly
4. **Use multiple files** to compare related content
5. **Customize LESS environment** variable for preferences

### Search Techniques
1. **Use regular expressions** for complex patterns
2. **Combine with grep** for initial filtering
3. **Use case-insensitive search** (-i option) for flexibility
4. **Mark positions** to quickly return to important sections

### Viewing Strategies
1. **Start with line numbers** (-N) for reference
2. **Use -S** for files with very long lines
3. **Use -F** for files that might fit on one screen
4. **Use -X** to keep content visible when exiting

## Tips and Tricks

### Quick Navigation
```bash
# Quick file inspection
less +G file.txt          # Jump to end immediately
less +/^function file.py  # Jump to first function
```

### Search Efficiency
```bash
# Highlight all matches (some versions)
/pattern                 # First search
n                        # Next match
N                        # Previous match
```

### Multi-file Workflows
```bash
# Compare files side by side (requires vimdiff)
less file1.txt
# Type :n to open file2.txt in same session
```

The `less` command is the preferred pager for Linux systems due to its flexibility and powerful features. Mastering its navigation and search capabilities will significantly improve your efficiency when working with text files and command output.