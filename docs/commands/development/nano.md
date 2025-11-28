---
title: nano - Nano's ANOther editor
sidebar_label: nano
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nano - Nano's ANOther editor

The `nano` command is a simple, user-friendly text editor for Unix-like systems designed to be easy to use and intuitive for beginners while providing powerful features for experienced users. It offers a non-modal editing interface with on-screen help, making it an excellent choice for quick edits, configuration file modifications, and users who prefer straightforward text editing over complex modal editors like vi or Emacs. Nano supports syntax highlighting, multiple buffers, spell checking, search and replace with regular expressions, and extensive customization through configuration files.

## Basic Syntax

```bash
nano [OPTIONS] [[+LINE[,COLUMN]] FILENAME]...
```

## Command Line Options

### File Handling Options

- `-B`, `--backup` - Create backup files when editing existing files
- `-C <dir>`, `--backupdir=<dir>` - Specify directory for backup files
- `-F`, `--multibuffer` - Enable multiple file buffers for editing multiple files
- `-o <dir>`, `--operatingdir=<dir>` - Set operating directory (chroot-like behavior)
- `-t`, `--tempfile` - Save automatically on exit, don't prompt for filename

### Display and Interface Options

- `-D`, `--boldtext` - Use bold text instead of reverse video for interface elements
- `-H`, `--historylog` - Log search and replace history to ~/.nano_history
- `-m`, `--mouse` - Enable mouse support for clicking and selecting text
- `-O`, `--morespace` - Use one extra line for editing (replaces help shortcut line)
- `-x`, `--nohelp` - Don't display help section at bottom of screen
- `-z`, `--suspend` - Enable suspend function (Ctrl+Z) to suspend nano
- `-$`, `--softwrap` - Enable soft line wrapping for long lines
- `-c`, `--const` - Constantly show cursor position and line information
- `-M`, `--mac` - Treat files as Mac format (CR line endings)
- `-N`, `--noconvert` - Don't convert files from DOS/Mac format

### Editing and Text Manipulation Options

- `-i`, `--autoindent` - Auto-indent new lines to match previous line
- `-k`, `--cut` - Cut from cursor to end of line instead of entire line
- `-l`, `--nofollow` - Don't follow symbolic links when editing
- `-r <#cols>`, `--fill=<#cols>` - Set hard wrapping width for text justification
- `-s <program>`, `--speller=<program>` - Enable spell checker with specified program
- `-w`, `--nowrap` - Don't wrap long lines at screen edge
- `-a`, `--atblanks` - When soft wrapping, wrap at whitespace instead of screen edge

### Formatting and Tab Options

- `-E`, `--tabstospaces` - Convert typed tabs to spaces
- `-T <#cols>`, `--tabsize=<#cols>` - Set tab width to specified number of columns
- `-W`, `--wordbounds` - More accurate word boundary detection for navigation
- `-Q <str>`, `--quotestr=<str>` - Set quoting string for justified paragraphs

### Behavior and Mode Options

- `-A`, `--smarthome` - Enable smart HOME key behavior
- `-I`, `--ignorercfiles` - Ignore nano's nanorc files and use defaults
- `-K`, `--rebindkeypad` - Fix numeric keypad confusion
- `-L`, `--nonewlines` - Don't add newlines to file ends
- `-p`, `--preserve` - Preserve XON (^Q) and XOFF (^S) characters
- `-q`, `--quiet` - Quiet mode, ignore startup problems and warnings
- `-R`, `--restricted` - Restricted mode (no file writing, no suspending)
- `-S`, `--smooth` - Smooth scrolling (one line at a time)
- `-U`, `--quickblank` - Quick status line blanking after keypress
- `-V`, `--version` - Show version information and exit
- `-v`, `--view` - View mode (read-only)
- `-Y <string>`, `--syntax=<string>` - Specify syntax highlighting type
- `-d`, `--rebinddelete` - Fix backspace/delete key confusion

## Keyboard Shortcuts and Commands

### File Operations

```bash
Ctrl+O      # Write out (save) current file
Ctrl+X      # Exit nano (prompt to save if modified)
Ctrl+R      # Read a file into current buffer
Ctrl+Insert # Insert another file at cursor position
Alt+R       # Replace file in current buffer
```

### Text Editing Operations

```bash
Ctrl+K      # Cut current line (and store in cutbuffer)
Ctrl+U      # Uncut (paste) from cutbuffer
Alt+U       # Undo last action
Alt+E       # Redo last undone action
Alt+6       # Copy current line to cutbuffer
Ctrl+T      # Run spelling checker
Ctrl+J      # Justify (format) current paragraph
Alt+J       # Justify entire file
Ctrl+_      # Go to specific line and column
Alt+T       # Execute external command and insert output
Ctrl+D      # Delete character under cursor
Ctrl+H      # Delete character before cursor (backspace)
```

### Search and Navigation

```bash
Ctrl+W      # Search for a string
Ctrl+\      # Replace a string
Alt+W       # Go to previous search result
Alt+P       # Go to next search result
Ctrl+Y      # Scroll up one page
Ctrl+V      # Scroll down one page
Ctrl+A      # Go to beginning of current line
Ctrl+E      # Go to end of current line
Alt+\       # Go to first line of file
Alt+/       # Go to last line of file
Alt+G       # Go to specific line number
Ctrl+C      # Display current cursor position
```

### Cursor Movement

```bash
Ctrl+P      # Move up one line
Ctrl+N      # Move down one line
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character
Ctrl+Space  # Move forward one word
Alt+Space   # Move backward one word
Alt+A       # Start marking text selection
Alt+^       # Go to beginning of buffer
Alt+]       # Go to end of buffer
```

### Buffer and Window Management

```bash
Alt+<       # Switch to previous file buffer
Alt+>       # Switch to next file buffer
Alt+V       # Insert next command verbatim
Ctrl+L      # Refresh/repaint the screen
Ctrl+I      # Insert a tab character
Ctrl+M      # Insert a carriage return (enter)
Alt+Del     # Delete word to right
```

### Special Functions

```bash
Ctrl+G      # Display help text
Ctrl+Z      # Suspend nano (if enabled)
Alt+L       # Go to line
Alt+B       # Execute external command
Alt+S       # Toggle spell checking
Alt+X       # Toggle help display
```

## Usage Examples

### Basic File Editing

```bash
# Create or edit a file
nano myfile.txt

# Edit file at specific line and column
nano +10,25 config.txt

# Edit file at specific line
nano +50 script.py

# Edit file with specific syntax highlighting
nano -Y python program.py

# Open file in read-only mode
nano -v important.conf

# Edit multiple files in sequence
nano file1.txt file2.txt file3.txt

# Edit file with mouse support
nano -m document.txt
```

### Configuration File Editing

```bash
# Edit system configuration with sudo
sudo nano /etc/ssh/sshd_config

# Edit user configuration
nano ~/.bashrc

# Edit with no line wrapping (good for config files)
nano -w /etc/fstab

# Edit with backup creation
nano -B critical_config.conf

# Edit with specified backup directory
nano -B -C /backups important_file.conf

# Edit with restricted mode for safety
nano -R /etc/passwd
```

### Programming and Development

```bash
# Edit Python file with syntax highlighting
nano -Y python program.py

# Edit with autoindent enabled
nano -i source_code.c

# Edit with tab conversion to spaces (4 spaces per tab)
nano -E -T 4 indented_file.py

# Edit with custom tab size
nano -T 8 config.ini

# Edit with soft wrapping for long lines
nano -$ long_document.txt

# Edit with hard wrapping at 80 columns
nano -r 80 readme.md
```

### Text Processing and Writing

```bash
# Edit with spell checking enabled
nano -s aspell document.txt

# Edit with custom spell checker for specific language
nano -s "aspell -l es" spanish_document.txt

# Edit with history logging for search/replace
nano -H research_paper.txt

# Edit with constant cursor position display
nano -c manuscript.txt

# Edit with smart HOME key behavior
nano -A text_file.txt
```

### System Administration

```bash
# Edit log files with word wrap disabled
nano -w /var/log/syslog

# Edit multiple configuration files
sudo nano /etc/hosts /etc/hostname /etc/resolv.conf

# Edit in restricted mode for sensitive files
sudo nano -R /etc/shadow

# Edit with operating directory restriction
sudo nano -o /etc config_file.conf

# Edit with backup and specific backup directory
sudo nano -B -C /etc/backup /etc/nginx/nginx.conf
```

## Advanced Features and Operations

### Multiple Buffer Management

```bash
# Enable multiple file buffers
nano -F file1.txt file2.txt file3.txt

# Within nano:
Alt+<       # Switch to previous buffer
Alt+>       # Switch to next buffer
Alt+V       # View buffer list and switch

# Switch to specific buffer by number
Ctrl+R      # Read file (opens dialog to select or enter filename)
```

### Text Selection and Manipulation

```bash
# Start selection mode
Alt+A

# Select text by moving cursor with arrow keys
# Use navigation keys to extend selection

# Copy selected text to cutbuffer
Alt+6

# Cut selected text to cutbuffer
Ctrl+K

# Paste text from cutbuffer
Ctrl+U

# Select entire file
Alt+A
Alt+^       # Go to beginning
Alt+]       # Go to end (selection extends)

# Select current word
Alt+A
Ctrl+Space  # Move to word start
Alt+Space   # Move to word end
```

### Advanced Search and Replace

```bash
# Simple search
Ctrl+W
Enter search term

# Case-sensitive search
Ctrl+W
Alt+C       # Toggle case sensitivity
Enter search term

# Regular expression search
Ctrl+W
Alt+R       # Toggle regular expressions
Enter search pattern

# Backwards search
Ctrl+W
Alt+B       # Toggle backwards search
Enter search term

# Replace with confirmation for each occurrence
Ctrl+\
Enter search term
Enter replacement term
Y for each replacement or A for all

# Replace all without confirmation
Ctrl+\
Enter search term
Enter replacement term
A           # Replace all

# Replace using regular expressions
Ctrl+\
Alt+R       # Enable regex mode
Enter search pattern
Enter replacement
A           # Replace all matches
```

### Spell Checking and Text Validation

```bash
# Run spell checker interactively
Ctrl+T

# Use alternative spell checker
nano -s aspell document.txt

# Check spelling with specific dictionary
nano -s "aspell -d en_US" document.txt

# Enable Hunspell instead of aspell
nano -s "hunspell -l en_US" document.txt

# Custom spell checking with options
nano -s "aspell --personal=mydict.txt" document.txt
```

### Text Formatting and Justification

```bash
# Justify current paragraph
Ctrl+J

# Justify entire file
Alt+J

# Set fill column for wrapping at 72 characters
nano -r 72 document.txt

# Justify with custom quoting
nano -Q "> " email_reply.txt

# Toggle autoindent during editing
Alt+I       # Toggle autoindent mode

# Convert tabs to spaces in existing text
Alt+T       # Execute external command
Enter "expand -t 4"  # Convert tabs to 4 spaces
```

## Configuration and Customization

### Nano Configuration File (~/.nanorc)

```bash
# ~/.nanorc - Main nano configuration file

# Basic Editing Settings
set autoindent              # Automatically indent new lines
set backup                  # Create backup files
set backupdir "~/.nano-backups"  # Backup directory
set const                   # Constantly show cursor position
set fill 72                 # Set wrapping column at 72
set historylog              # Log search/replace history
set mouse                   # Enable mouse support
set multibuffer             # Enable multiple file buffers
set nowrap                  # Don't wrap long lines
set regexp                  # Enable regular expressions
set smooth                  # Smooth scrolling
set suspend                 # Allow suspension with Ctrl+Z

# Tab and Indentation Settings
set tabsize 4               # Set tab width to 4 spaces
set tabstospaces            # Convert tabs to spaces

# Display Settings
set boldtext                # Use bold text instead of reverse video
set morespace               # Use extra line for editing
set nohelp                  # Don't show help at bottom
set softwrap                # Enable soft line wrapping

# File Handling
set operatingdir "~"        # Restrict to home directory
set tempfile                # Save automatically on exit

# Spell Checking
set speller "aspell -x -c"  # Use aspell for spell checking

# Syntax Highlighting
include "/usr/share/nano/*.nanorc"
include "/usr/share/nano/extra/*.nanorc"

# Custom Syntax Highlighting
syntax "custom" "\.custom$"
color brightwhite ".*"
color green "function[[:space:]]*[(]"
color brightyellow "TODO|FIXME|NOTE"
color red "ERROR|CRITICAL|FATAL"

# Backup Configuration
set backup
set backupdir "/tmp/nano-backups"
```

### System-Wide Configuration (/etc/nanorc)

```bash
# /etc/nanorc - System-wide nano configuration

# Global defaults for all users
set autoindent
set const
set fill 80
set historylog
set mouse
set smooth
set tabsize 4

# Enable all syntax highlighting
include "/etc/nano/*.nanorc"
include "/usr/share/nano/*.nanorc"
```

### Custom Syntax Highlighting Rules

```bash
# Custom syntax for configuration files
syntax "config" "\.(conf|config|cfg|ini)$"
color brightcyan "^[[:space:]]*#.*$"  # Comments
color yellow "^[[[:space:]]*[a-zA-Z0-9_]+][[:space:]]*="  # Keys
color green "\"(\\.|[^\"])*\""  # Quoted values
color brightmagenta "[[:space:]]+(true|false|yes|no|on|off)[[:space:]]*"

# Custom syntax for log files
syntax "log" "\.(log|out|err)$"
color red "ERROR|CRITICAL|FATAL"
color yellow "WARNING|WARN"
color green "INFO"
color brightblue "DEBUG"
color cyan "^[[:digit:]]{4}-[[:digit:]]{2}-[[:digit:]]{2}"  # Dates

# Custom syntax for shell scripts
syntax "shell" "\.(sh|bash|zsh)$"
color green "^#.*$"  # Comments
color brightblue "^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*[[:space:]]*[(])"  # Function definitions
color brightred "(sudo|do|if|then|else|fi|for|while|case|esac|function)"
color yellow "\$\{?[a-zA-Z_][a-zA-Z0-9_]*\}?"  # Variables
color brightcyan "\"(\\.|[^\"])*\""  # Quoted strings
```

## Practical Examples and Use Cases

### System Administration Workflows

#### Configuration File Management

```bash
# Safe editing of system configuration with backup
sudo nano -B -C /etc/backup /etc/ssh/sshd_config

# Edit multiple related configuration files
sudo nano /etc/apache2/apache2.conf /etc/apache2/sites-available/default

# Quick edit with no line wrapping for structured configs
nano -w /etc/fstab /etc/crontab

# Restricted editing of sensitive files
sudo nano -R /etc/passwd /etc/group

# Edit configuration with operating directory restriction
sudo nano -o /etc/mysql my.cnf
```

#### Log File Analysis and Editing

```bash
# Open system log with word wrap disabled
nano -w /var/log/syslog

# Edit recent log entries with history enabled
nano -H /var/log/auth.log

# Search for specific patterns in logs
nano /var/log/nginx/access.log
# Within nano:
Ctrl+W      # Search
"404"       # Search for 404 errors
Alt+W       # Find next occurrence

# Filter log file and edit results
grep "ERROR" /var/log/application.log > errors.log
nano errors.log

# Edit log file with constant position display
nano -c /var/log/daemon.log
```

#### Backup and Recovery Operations

```bash
# Create backup-enabled editing session
nano -B /home/user/important_document.txt

# Edit with custom backup directory
nano -B -C /backups/$(date +%Y%m%d) configuration.conf

# Emergency configuration recovery
sudo nano -B /etc/network/interfaces

# Batch editing with backup for multiple files
for config in /etc/app/*.conf; do
    sudo nano -B "$config"
done
```

### Software Development Workflows

#### Code Editing with Syntax Highlighting

```bash
# Edit Python file with Python syntax
nano -Y python script.py

# Edit HTML file with HTML syntax
nano -Y html index.html

# Edit multiple source files with multi-buffer
nano -F *.py

# Edit with programming-friendly settings
nano -i -E -T 4 -Y c source_code.c

# Edit JavaScript with autoindent and specific tab size
nano -i -T 2 -Y javascript app.js
```

#### Documentation and README Editing

```bash
# Edit README with markdown highlighting
nano -Y markdown README.md

# Edit documentation with text wrapping at 80 columns
nano -r 80 documentation.txt

# Edit man page source with no wrapping
nano -w manual_page.1

# Edit changelog with automatic backup
nano -B CHANGELOG.md
```

#### Quick Code Snippets and Testing

```bash
# Quick Python script for testing
nano -Y python test_script.py

# Create shell script with execution permissions
nano script.sh
chmod +x script.sh

# Edit configuration file for development
nano -w ~/.bashrc

# Quick HTML prototype
nano -Y html prototype.html
```

### Content Creation and Writing

#### Document Writing and Formatting

```bash
# Write document with 72-character line wrapping
nano -r 72 essay.txt

# Write with automatic spell checking
nano -s aspell document.txt

# Write with constant position display
nano -c manuscript.txt

# Write with history logging for search/replace
nano -H research_paper.txt
```

#### Note Taking and Quick Editing

```bash
# Quick note with timestamp insertion
nano notes.txt
# Within nano:
Ctrl+R      # Read file
Enter       # Use external command
date        # Insert current date/time
Enter

# Meeting notes with bullet points
nano meeting_notes_$(date +%Y%m%d).txt

# TODO list with easy editing
nano TODO.txt

# Quick journal entry
nano journal_$(date +%Y%m%d).txt
```

#### Email and Message Composition

```bash
# Compose email with proper formatting
nano -r 78 email_draft.txt

# Compose with spell checking
nano -s aspell important_email.txt

# Quick message with timestamp
nano -c message_$(date +%H%M%S).txt

# Edit email with quote preservation
nano -Q "> " email_reply.txt
```

## Advanced Usage Techniques

### Text Processing with External Commands

```bash
# Pipe external command output into nano
ls -la | nano file_list.txt

# Edit output of command
ps aux | nano process_list.txt

# Use nano as a pager alternative
command_that_outputs_text | nano -

# Edit file after processing with external tools
cat file.txt | sed 's/foo/bar/g' | nano processed_file.txt

# Insert command output at cursor position
Alt+T       # Execute command
Enter "date"  # Command to execute
Enter       # Insert output at cursor
```

### Batch Editing Operations

```bash
# Edit all Python files in directory
nano -Y python *.py

# Edit multiple configuration files
nano /etc/app/*.conf

# Edit all text files recursively
find . -name "*.txt" -exec nano {} +

# Edit files matching pattern
nano $(find . -name "*.log" -mtime -7)
```

### Integration with Version Control

```bash
# Edit Git configuration
nano .git/config

# Edit commit message (Git uses $EDITOR)
export EDITOR=nano
git commit

# Edit .gitignore file
nano .gitignore

# View and edit git diff output
git diff | nano -

# Edit merge conflict files
nano conflicted_file.txt
```

### Remote File Editing

```bash
# Edit remote file using SSH
ssh user@server "nano remote_file.txt"

# Edit remote file and copy back
ssh user@server "cat remote_file.txt" | nano local_copy.txt
scp local_copy.txt user@server:remote_file.txt

# Use nano through SSH tunnel
ssh -L 2222:localhost:22 server &
ssh -p 2222 localhost "nano file.txt"
```

## Troubleshooting and Common Issues

### Performance Issues with Large Files

```bash
# Open large file in view mode only
nano -v large_file.txt

# Disable unnecessary features for large files
nano -c -x large_file.txt

# Use specific settings for huge logs
nano -w -x -c huge_log.txt

# Edit large file with restricted memory usage
nano -R -x massive_file.txt

# Monitor performance while editing
/usr/bin/time -v nano large_file.txt
```

### Terminal and Display Problems

```bash
# Fix display issues by forcing terminal type
TERM=xterm-256color nano file.txt

# Use basic mode if terminal has problems
nano -D file.txt

# Disable mouse if causing issues
nano file.txt  # without -m flag

# Fix backspace/delete key issues
nano -d file.txt

# Fix numeric keypad issues
nano -K file.txt
```

### File Permission and Access Issues

```bash
# Edit file with sudo for root access
sudo nano /etc/config_file

# Check file permissions before editing
ls -la file.txt
nano file.txt

# Edit file in restricted mode for safety
nano -R sensitive_file.txt

# Use operating directory restriction
nano -o /secure/directory file.txt
```

### Character Encoding and Line Ending Issues

```bash
# Force UTF-8 encoding
LANG=en_US.UTF-8 nano file.txt

# Prevent automatic line ending conversion
nano -N file.txt

# Edit Windows format files
nano -M windows_file.txt

# Convert line endings using external tools
dos2unix file.txt
nano file.txt
```

### Backup and Recovery Issues

```bash
# Find backup files
find . -name "*~" -o -name "*.bak"

# Restore from backup
cp file.txt~ file.txt

# Clean up backup files
find . -name "*~" -delete

# Use custom backup directory
nano -B -C /tmp/backups file.txt
```

## Integration with Other Tools and Workflows

### Shell Script Integration

```bash
# Nano as default editor in scripts
export EDITOR=nano
crontab -e  # Will use nano

# Use nano in shell scripts for user input
#!/bin/bash
echo "Edit your configuration:"
nano config.txt
echo "Configuration updated."

# Batch editing script
#!/bin/bash
for file in *.conf; do
    echo "Editing $file..."
    nano "$file"
done
```

### Version Control Workflows

```bash
# Set nano as default editor for Git
git config --global core.editor nano

# Edit commit messages with nano template
git commit -t commit_template.txt

# View staged changes with nano
git diff --staged | nano -

# Edit conflict resolution files
nano -Y diff conflict_file.txt
```

### Development Environment Setup

```bash
# Create development-friendly .nanorc
cat > ~/.nanorc << 'EOF'
set autoindent
set tabsize 4
set tabstospaces
set mouse
set const
set fill 80
set backup
set backupdir "~/.nano-backups"
include "/usr/share/nano/*.nanorc"
EOF

# Set nano as default editor
echo 'export EDITOR=nano' >> ~/.bashrc
echo 'export VISUAL=nano' >> ~/.bashrc
```

## Best Practices and Optimization Tips

1. **Use syntax highlighting** with `-Y` option for better code readability
2. **Enable backups** with `-B` for important files to prevent data loss
3. **Configure `.nanorc`** for permanent personalized settings
4. **Use search extensively** with `Ctrl+W` for efficient navigation
5. **Master keyboard shortcuts** for faster editing workflow
6. **Use multiple buffers** with `-F` when working with multiple files
7. **Enable mouse support** with `-m` for easier text selection
8. **Configure tab settings** appropriately for different file types
9. **Use restricted mode** (`-R`) when editing sensitive system files
10. **Set proper line wrapping** (`-w` for configs, `-r` for documents)
11. **Use history logging** (`-H`) for frequently searched patterns
12. **Customize backup directory** (`-C`) for organized backup management
13. **Enable spell checking** for documents and content creation
14. **Use view mode** (`-v`) for read-only access to prevent accidental changes
15. **Leverage external commands** with `Alt+T` for advanced text processing

## Related Commands

- [`vi`](/docs/commands/development/vi) - Vi text editor
- [`vim`](/docs/commands/development/vim) - Vi IMproved text editor
- [`emacs`](/docs/commands/development/emacs) - GNU Emacs text editor
- [`pico`](/docs/commands/development/pico) - Pine Composer text editor
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing language
- [`grep`](/docs/commands/text-processing/grep) - Pattern searching utility
- [`less`](/docs/commands/text-processing/less) - File pager with navigation
- [`more`](/docs/commands/text-processing/more) - File pager
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`head`](/docs/commands/file-management/head) - Display beginning of files
- [`tail`](/docs/commands/file-management/tail) - Display end of files

The `nano` editor provides an excellent balance between simplicity and powerful functionality, making it ideal for quick edits, configuration file modifications, programming tasks, and users who prefer straightforward text editing without the learning curve of modal editors. Its intuitive interface, comprehensive help system, and extensive customization options make it accessible to users of all skill levels while providing advanced features for experienced users.