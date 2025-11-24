---
title: vi - Visual Editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# vi - Visual Editor

The `vi` command is a powerful, screen-oriented text editor that is universally available on Unix and Linux systems. It's the predecessor to `vim` (Vi IMproved) and remains one of the most fundamental tools for system administration and programming.

## Basic Syntax

```bash
vi [options] [filename...]
```

## Common Options

- `+<number>` - Start editing at line number
- `-b` - Binary mode for editing binary files
- `-c <command>` - Execute command after loading first file
- `-d` - Diff mode for showing file differences
- `-l` - Lisp mode (enables lisp and showmatch)
- `-m` - Disable file writing
- `-M` - Disable modification
- `-n` - No swap file usage
- `-o <number>` - Open specified number of files
- `-R` - Read-only mode
- `-s` - Silent mode (no error messages)
- `-v` - Start in vi mode (default)
- `-y` - Easy mode (like evim)
- `--version` - Display version information
- `--help` - Display help information

## Vi Operating Modes

Vi has three main operating modes:

### Command Mode
The default mode when vi starts. All keystrokes are interpreted as commands.

### Insert Mode
Allows text entry. Enter by pressing `i`, `a`, `o`, etc.

### Ex Mode
Line-based editing mode. Enter by pressing `:` from command mode.

## Essential Commands

### Navigation

```bash
# Basic cursor movement
h      # Move left one character
j      # Move down one line
k      # Move up one line
l      # Move right one character

# Word movement
w      # Move to beginning of next word
b      # Move to beginning of previous word
e      # Move to end of current word

# Line navigation
0      # Move to beginning of line
^      # Move to first non-space character
$      # Move to end of line

# File navigation
G      # Go to last line
1G     # Go to first line
<number>G # Go to specific line number
```

### Screen Navigation

```bash
# Page movement
Ctrl+f # Forward one page
Ctrl+b # Backward one page
Ctrl+d # Forward half page
Ctrl+u # Backward half page

# Line centering
zz     # Center current line
zt     # Move current line to top
zb     # Move current line to bottom
```

### Insert Mode Commands

```bash
i      # Insert before cursor
a      # Append after cursor
I      # Insert at beginning of line
A      # Append at end of line
o      # Open new line below current line
O      # Open new line above current line
s      # Substitute character
S      # Substitute entire line
```

### Deleting Text

```bash
x      # Delete character under cursor
X      # Delete character before cursor
dd     # Delete current line
dw     # Delete word
d$     # Delete to end of line
d0     # Delete to beginning of line
<number>dd # Delete multiple lines
```

### Copying and Pasting

```bash
yy     # Copy current line (yank)
<number>yy # Copy multiple lines
p      # Paste after cursor
P      # Paste before cursor
yw     # Copy word
y$     # Copy to end of line
```

### Search and Replace

```bash
/pattern     # Search forward for pattern
?pattern     # Search backward for pattern
n            # Repeat search in same direction
N            # Repeat search in opposite direction
:%s/old/new/g    # Replace all occurrences
:%s/old/new/gc   # Replace with confirmation
:<start>,<end>s/old/new/g    # Replace in range
```

### File Operations

```bash
:w            # Save file
:w <filename> # Save as new filename
:wq           # Save and quit
:x            # Save and quit (same as :wq)
:q            # Quit (if no changes)
:q!           # Force quit without saving
:e <filename> # Edit another file
:e!           # Reload current file
:r <filename> # Read file into current buffer
:w !sudo tee %    # Save with sudo
```

## Usage Examples

### Basic File Editing

```bash
# Create a new file or edit existing
vi newfile.txt

# Open file at specific line
vi +50 config.txt

# Open multiple files
vi file1.txt file2.txt file3.txt

# Open file in read-only mode
vi -R important.conf
```

### Navigation Examples

```bash
# Navigate to specific line
:100    # Go to line 100
:$      # Go to last line

# Navigate by percentage
:50%    # Go to middle of file

# Jump to matching brace
%       # Jump to matching (, {, or [
```

### Search and Navigation

```bash
# Search for function definition
/function

# Find next occurrence
n

# Find and replace variable names
:%s/oldVariable/newVariable/g

# Replace with confirmation
:%s/error/Error/gc

# Replace in specific range
:20,50s/temp/tempFile/g
```

### Working with Multiple Files

```bash
# Switch between files
:n      # Next file
:N      # Previous file
:args   # List all open files

# Split screen editing
:split file2.txt
:vsplit file3.txt
Ctrl+w w    # Switch between windows
```

## Advanced Features

### Configuration

```bash
# Enable line numbers
:set number

# Disable line numbers
:set nonumber

# Enable syntax highlighting
:syntax on

# Set tab width
:set tabstop=4

# Enable autoindent
:set autoindent

# Show matching braces
:set showmatch

# Highlight search results
:set hlsearch

# Ignore case in search
:set ignorecase
```

### Marking and Bookmarks

```bash
# Set mark
ma      # Set mark 'a'
mb      # Set mark 'b'

# Jump to mark
'a      # Jump to mark 'a' (line start)
`a      # Jump to mark 'a' (exact position)

# Show all marks
:marks
```

### Registers

```bash
# Named registers
"ayy    # Yank to register 'a'
"ap     # Paste from register 'a'

# Number registers
"1p     # Paste from register 1
"2p     # Paste from register 2

# System clipboard (if available)
"+y     # Yank to system clipboard
"+p     # Paste from system clipboard
```

### Macros

```bash
# Start recording macro
qa      # Start recording to register 'a'

# Stop recording
q       # Stop recording

# Execute macro
@a      # Execute macro 'a'
@@      # Repeat last macro
<number>@a # Execute macro 'a' multiple times
```

## Practical Examples

### System Configuration

```bash
# Edit system configuration file
sudo vi /etc/ssh/sshd_config

# Find and change port
/Port
i       # Enter insert mode
22      # Change port number
Esc     # Return to command mode
:wq     # Save and quit
```

### Programming

```bash
# Edit source code with syntax highlighting
vi main.c

# Navigate to function
/functionName

# Comment out block of lines
:10,20s/^/\/\//    # Add // to lines 10-20
```

### Log File Analysis

```bash
# Open large log file
vi /var/log/syslog

# Go to end of file
G

# Search for errors
/ERROR

# Navigate through errors
n
```

### Text Processing

```bash
# Remove trailing whitespace
:%s/\s\+$//

# Convert tabs to spaces
:%s/\t/    /g

# Remove empty lines
:g/^$/d

# Add line numbers
:%s/^/\=line('.').'. '
```

## File Recovery

```bash
# Recover file after crash
vi -r filename

# List swap files
vi -r

# Open without swap file
vi -n filename
```

## Visual Mode

```bash
# Start visual mode
v       # Character-wise visual mode
V       # Line-wise visual mode
Ctrl+v  # Block-wise visual mode

# Actions in visual mode
d       # Delete selection
y       # Copy selection
c       # Change selection
>       # Indent selection
<       # Unindent selection
```

## Shell Integration

```bash
# Execute shell command
:!command

# Insert shell command output
:r !command

# Filter text through command
!}sort    # Sort current paragraph

# Insert current date/time
:r !date
```

## Related Commands

- [`vim`](/docs/commands/editors/vim) - Vi IMproved (enhanced vi)
- [`view`](/docs/commands/editors/vim) - Read-only mode of vim
- [`nano`](/docs/commands/editors/nano) - Simple text editor
- [`emacs`](/docs/commands/editors/emacs) - Advanced text editor
- [`ed`](/docs/commands/editors/ed) - Line-oriented text editor
- [`ex`](/docs/commands/editors/ex) - Line editor mode

## Best Practices

1. **Save frequently** with `:w` to prevent data loss
2. **Use visual mode** for complex selections
3. **Learn essential commands** before advanced features
4. **Customize `.vimrc`** for your workflow
5. **Use split windows** for comparing files
6. **Learn macros** for repetitive tasks
7. **Backup important files** before bulk edits
8. **Use search and replace** with caution

## Common Issues and Solutions

### Accidentally Lost Changes

```bash
# Check for swap files
ls -a | grep .swp

# Recover from swap file
vi -r filename
```

### Terminal Issues

```bash
# Fix corrupted terminal display
reset

# Clear screen in vi
Ctrl+l
```

### Large Files

```bash
# Open large file efficiently
vi -c 'set nowrap' largefile.log

# Jump to specific pattern
vi +/error logfile.txt
```

The `vi` editor remains an essential tool for system administrators and developers due to its universal availability, efficiency for text manipulation, and powerful editing capabilities. Mastering vi provides a foundation for text editing across virtually all Unix-like systems.