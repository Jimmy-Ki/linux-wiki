---
title: nano - Nano's ANOther editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nano - Nano's ANOther editor

The `nano` command is a simple, user-friendly text editor for Unix-like systems. It provides an intuitive interface with on-screen help, making it ideal for beginners and users who prefer straightforward text editing over complex modal editors like vi.

## Basic Syntax

```bash
nano [options] [[+line,column] filename]...
```

## Common Options

### File Handling Options

- `-B`, `--backup` - Create backup files when editing
- `-C <dir>`, `--backupdir=<dir>` - Directory for backup files
- `-F`, `--multibuffer` - Enable multiple file buffers
- `-o <dir>`, `--operatingdir=<dir>` - Set operating directory
- `-t`, `--tempfile` - Save automatically on exit, don't prompt

### Display Options

- `-D`, `--boldtext` - Use bold text instead of reverse video
- `-H`, `--historylog` - Log search/replace history
- `-m`, `--mouse` - Enable mouse support
- `-O`, `--morespace` - Use one extra line for editing
- `-x`, `--nohelp` - Don't display help section
- `-z`, `--suspend` - Enable suspend function (Ctrl+Z)
- `-$`, `--softwrap` - Enable soft line wrapping

### Editing Options

- `-c`, `--const` - Constantly show cursor position
- `-i`, `--autoindent` - Auto-indent new lines
- `-k`, `--cut` - Cut from cursor to end of line
- `-l`, `--nofollow` - Don't follow symbolic links
- `-r <#cols>`, `--fill=<#cols>` - Set hard wrapping width
- `-s <program>`, `--speller=<program>` - Enable spell checker
- `-w`, `--nowrap` - Don't wrap long lines

### Formatting Options

- `-E`, `--tabstospaces` - Convert tabs to spaces
- `-T <#cols>`, `--tabsize=<#cols>` - Set tab width to # columns
- `-W`, `--wordbounds` - More accurate word boundary detection

### Special Options

- `-A`, `--smarthome` - Enable smart HOME key
- `-I`, `--ignorercfiles` - Ignore nano's nanorc files
- `-K`, `--rebindkeypad` - Fix numeric keypad confusion
- `-L`, `--nonewlines` - Don't add newlines to file ends
- `-N`, `--noconvert` - Don't convert from DOS/Mac format
- `-p`, `--preserve` - Preserve XON (^Q) and XOFF (^S)
- `-q`, `--quiet` - Quiet mode, ignore startup problems
- `-R`, `--restricted` - Restricted mode
- `-S`, `--smooth` - Smooth scrolling
- `-U`, `--quickblank` - Quick status line blanking
- `-V`, `--version` - Show version and exit
- `-v`, `--view` - View mode (read-only)
- `-Y <string>`, `--syntax=<string>` - Specify syntax highlighting
- `-d`, `--rebinddelete` - Fix backspace/delete key confusion

## Keyboard Shortcuts

### File Operations

```bash
Ctrl+O      # Write out (save) current file
Ctrl+X      # Exit nano (prompt to save if modified)
Ctrl+R      # Read a file into current buffer
Ctrl+Insert # Insert another file at cursor position
```

### Editing Operations

```bash
Ctrl+K      # Cut current line (and store in cutbuffer)
Ctrl+U      # Uncut (paste) from cutbuffer
Alt+U       # Undo last action
Alt+E       # Redo last undone action
Alt+6       # Copy current line to cutbuffer
Ctrl+T      # Run spelling checker
Ctrl+J      # Justify (format) current paragraph
```

### Search and Replace

```bash
Ctrl+W      # Search for a string
Ctrl+\      # Replace a string
Alt+W       # Go to previous search result
Alt+P       # Go to next search result
```

### Cursor Movement

```bash
Ctrl+A      # Go to beginning of current line
Ctrl+E      # Go to end of current line
Ctrl+_      # Go to specific line and column number
Ctrl+C      # Display current cursor position
Alt+\       # Go to first line of file
Alt+/       # Go to last line of file
Alt+G       # Go to line number
```

### Screen Navigation

```bash
Ctrl+Y      # Scroll up one page
Ctrl+V      # Scroll down one page
Ctrl+P      # Move up one line
Ctrl+N      # Move down one line
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character
```

### Text Selection

```bash
Alt+A       # Start marking text
Alt+^       # Mark beginning of file
Alt+]       # Mark end of file
```

### Special Functions

```bash
Ctrl+L      # Refresh/repaint the screen
Ctrl+D      # Delete character under cursor
Ctrl+H      # Delete character before cursor (backspace)
Alt+Del     # Delete word to right
Ctrl+I      # Insert a tab character
Ctrl+M      # Insert a carriage return (enter)
Alt+T       # Run external command
Ctrl+G      # Display help text
```

### Buffer Management

```bash
Alt+<       # Switch to previous file buffer
Alt+>       # Switch to next file buffer
Alt+V       # Insert next command verbatim
```

## Usage Examples

### Basic File Editing

```bash
# Create or edit a file
nano myfile.txt

# Edit file at specific line and column
nano +10,25 config.txt

# Edit file with specific syntax highlighting
nano -Y python script.py

# Open file in read-only mode
nano -v important.conf
```

### Multiple File Editing

```bash
# Open multiple files
nano file1.txt file2.txt file3.txt

# Switch between files using Alt+< and Alt+>
# Or use Ctrl+R to insert another file
```

### Configuration File Editing

```bash
# Edit system configuration with sudo
sudo nano /etc/ssh/sshd_config

# Edit user configuration
nano ~/.bashrc

# Edit with no line wrapping (good for config files)
nano -w /etc/fstab
```

### Programming

```bash
# Edit Python file with syntax highlighting
nano -Y python program.py

# Edit with autoindent enabled
nano -i source_code.c

# Edit with tab conversion to spaces
nano -E indented_file.py
```

### System Administration

```bash
# Edit log files with word wrap disabled
nano -w /var/log/syslog

# Edit with backup creation
nano -B critical_config.conf

# Edit with specified backup directory
nano -B -C /backups important_file.conf
```

## Advanced Features

### Multiple Buffers

```bash
# Enable multiple file buffers
nano -F file1.txt file2.txt

# Within nano:
Alt+<       # Switch to previous buffer
Alt+>       # Switch to next buffer
Alt+V       # View buffer list
```

### Text Selection and Manipulation

```bash
# Start selection mode
Alt+A

# Select text by moving cursor
# Use arrow keys to extend selection

# Copy selected text
Alt+6

# Cut selected text
Ctrl+K

# Paste text
Ctrl+U
```

### Search and Replace

```bash
# Simple search
Ctrl+W
Enter search term

# Case-sensitive search
Alt+C within search

# Regular expression search
Alt+R within search

# Replace with confirmation
Ctrl+\
Enter search term
Enter replacement term
Y for each replacement
```

### Spell Checking

```bash
# Run spell checker
Ctrl+T

# Use alternative spell checker
nano -s aspell program.txt

# Check specific language spelling
nano -s "aspell -l es" spanish_text.txt
```

### Formatting and Justification

```bash
# Justify current paragraph
Ctrl+J

# Justify entire file
Alt+J

# Set fill column for wrapping
nano -r 80 wide_text.txt
```

## Configuration

### Nano Configuration File

```bash
# ~/.nanorc - Nano configuration file

# Set line wrapping
set nowrap

# Enable autoindent
set autoindent

# Set tab size
set tabsize 4

# Convert tabs to spaces
set tabstospaces

# Enable mouse support
set mouse

# Enable constant cursor position display
set const

# Enable soft wrapping
set softwrap

# Enable backup files
set backup

# Set backup directory
set backupdir ~/.nano-backups

# Enable spell checking
set speller "aspell -x -c"

# Enable syntax highlighting
include "/usr/share/nano/*.nanorc"
```

### Syntax Highlighting Examples

```bash
# ~/.nanorc additions

# Custom syntax highlighting
syntax "mylang" "\.my$"
color red "function"
color blue "variable"
color green "#.*$"
```

## Practical Examples

### Quick Note Taking

```bash
# Quick note with timestamp
nano -w notes.txt

# Within nano, add timestamp:
Ctrl+R      # Read file
Enter       # Use external command
date        # Command to execute
Enter       # Insert current date/time
```

### Configuration File Management

```bash
# Safe config editing with backup
sudo nano -B /etc/nginx/nginx.conf

# Edit multiple related files
sudo nano /etc/ssh/sshd_config /etc/ssh/ssh_config
```

### Code Editing

```bash
# Edit with programming-friendly settings
nano -i -E -T 4 script.py

# Edit with syntax highlighting
nano -Y html index.html

# Edit with no line wrapping for config files
nano -w ~/.vimrc
```

### Text Processing

```bash
# Edit large text file
nano large_document.txt

# Search and replace formatting
Ctrl+\      # Replace
Enter       # Search term
Enter       # Replacement
A           # Replace all
```

### Log File Analysis

```bash
# Open log file
nano /var/log/auth.log

# Search for specific events
Ctrl+W      # Search
"failed"    # Search term

# Navigate through matches
Alt+W       # Next match
Alt+P       # Previous match
```

## Best Practices

1. **Enable syntax highlighting** for code files with `-Y` option
2. **Use `-w`** for configuration files to prevent unwanted line wrapping
3. **Enable backups** with `-B` for important files
4. **Customize `.nanorc`** for permanent settings
5. **Use search extensively** with `Ctrl+W` for navigation
6. **Learn selection shortcuts** for efficient text manipulation
7. **Use mouse support** with `-m` for easier navigation
8. **Configure tab settings** for your coding style

## Common Issues and Solutions

### Line Wrapping Issues

```bash
# Disable automatic line wrapping for config files
nano -w /etc/fstab

# Or disable permanently in .nanorc
set nowrap
```

### Backup File Management

```bash
# Find backup files
find . -name "*~" -o -name "*.bak"

# Clean up backup files
rm *.bak
```

### Character Encoding

```bash
# Edit files with specific encoding
# Set locale first
export LANG=en_US.UTF-8
nano encoded_file.txt
```

### Large File Handling

```bash
# Open large file with limited features
nano --view large_log.txt

# Or use specific settings
nano -c -x huge_file.txt
```

The `nano` editor provides an excellent balance between simplicity and functionality, making it perfect for quick edits, configuration file modifications, and users who prefer straightforward text editing without the learning curve of modal editors. Its intuitive interface and comprehensive help system make it accessible to users of all skill levels.