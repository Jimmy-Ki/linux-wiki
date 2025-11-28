---
title: pico - Pine composer text editor
sidebar_label: pico
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pico - Pine composer text editor

The `pico` command is a simple, intuitive text editor that was originally designed as the mail composer for the Pine email client. It features a straightforward interface with on-screen help, making it accessible to beginners while providing sufficient functionality for general text editing tasks. Pico is the predecessor to the widely-used `nano` editor and maintains a consistent editing paradigm focused on ease of use. The editor emphasizes simplicity over complexity, with all major functions accessible through keyboard shortcuts displayed on-screen, eliminating the need for memorization of commands.

## Basic Syntax

```bash
pico [options] [filename]
```

## Common Options

### General Options

- `-b` - Enable substitution functions (search and replace)
- `-d` - Enable deletion functions
- `-e` - Use complete file names (no truncation in display)
- `-f` - Enable function key support (F1, F2, etc.)
- `-g` - Show cursor position (line and column)
- `-h`, `--help` - Display help information and exit
- `-j` - Enable jumping functions (go to line number)
- `-k` - Cut from cursor to end of line (Pine compatibility)
- `-m` - Enable mouse support for navigation and selection
- `-n <seconds>` - Set mail check interval for Pine integration
- `-o <dir>`, `--operatingdir=<dir>` - Set operating directory (restrict file access)
- `-q` - Ignore termcap settings (for terminal compatibility)
- `-r <cols>`, `--fill=<cols>` - Set fill column for line wrapping (default: 72)
- `-s <program>`, `--speller=<program>` - Specify spell checker program
- `-t` - Enable tool mode (disable suspend)
- `-v`, `--view` - Start in view-only (read-only) mode
- `-w` - Disable word wrap
- `-x` - Disable help display at bottom (more screen space)
- `-z` - Enable suspend function (Ctrl+Z to suspend to shell)
- `+<line>` - Start editing at specified line number
- `+<line>,<column>` - Start at specific line and column

### Configuration Options

- `-p` - Preserve previous edit state
- `-C` - Enable color syntax highlighting (if available)
- `-D` - Set backup directory
- `-F` - Enable multiple file buffers
- `-I` - Ignore case in search
- `-K` - Keep original file when saving fails
- `-L` - Don't follow symlinks
- `-M` - Enable Mac file handling
- `-N` - No backup files
- `-Q` - Quiet mode (no status messages)
- `-R` - Restricted mode (limited file operations)
- `-S` - Smooth scrolling
- `-T` - Set tab size
- `-V` - Show version information
- `-W` - Search and replace without confirmation

## Keyboard Shortcuts

### File Operations

```bash
Ctrl+G      # Get help (display help screen)
Ctrl+O      # Write out (save) current file
Ctrl+R      # Read file (insert file at cursor position)
Ctrl+X      # Exit pico (prompt to save if modified)
```

### Navigation

```bash
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character
Ctrl+P      # Move to previous line
Ctrl+N      # Move to next line
Ctrl+A      # Move to beginning of current line
Ctrl+E      # Move to end of current line
Ctrl+V      # Move forward one page
Ctrl+Y      # Move backward one page
Ctrl+W      # Search for string
Ctrl+C      # Display current cursor position
Ctrl+_      # Go to specific line number (Ctrl+Shift+_)
```

### Editing Commands

```bash
Ctrl+D      # Delete character at cursor
Ctrl+H      # Delete character before cursor (backspace)
Ctrl+I      # Insert tab character
Ctrl+J      # Justify current paragraph
Ctrl+K      # Cut current line
Ctrl+U      # Uncut (paste) previously cut text
Ctrl+L      # Refresh display
Ctrl+T      # Check spelling
Ctrl+Space  # Mark start of text selection
```

### Special Functions

```bash
Ctrl+R      # Insert file (with file browser)
Ctrl+W      # Search with options (case sensitive, reverse)
Ctrl+Y      # Page up (previous page)
Ctrl+V      # Page down (next page)
Ctrl+T      # Spell check (with external spell checker)
Ctrl+C      # Show cursor position
```

## Usage Examples

### Basic File Editing

```bash
# Create or edit a new file
pico myfile.txt

# Edit existing file
pico existing_document.txt

# Edit file starting at specific line
pico +50 config.txt

# Edit file at specific line and column
pico +100,25 long_file.txt

# Open file in read-only mode
pico -v important.conf

# Open with mouse support enabled
pico -m document.txt

# Open without word wrap (good for code)
pico -w source_code.py
```

### Configuration File Editing

```bash
# Edit system configuration with sudo
sudo pico /etc/ssh/sshd_config

# Edit without line wrapping (good for config files)
pico -w /etc/fstab

# Edit with function key support
pico -f ~/.bashrc

# Edit within restricted directory
pico -o ~/projects ~/projects/config.ini

# Edit with specific fill column
pico -r 100 wide_config_file.txt
```

### Programming and Development

```bash
# Edit source code with syntax highlighting (if supported)
pico -C source.c

# Edit with specific tab size
pico -T 4 indented_code.py

# Edit with spell checking enabled
pico -s aspell report.txt

# Edit in restricted mode (prevent accidental system changes)
pico -R temporary_script.sh

# Edit with custom spell checker
pico -s "/usr/bin/hunspell -d en_US" document.txt
```

### Email and Document Composition

```bash
# Compose email message
pico email_draft.txt

# Set up for Pine email client
pico -n 30 email_draft.txt  # Check for new mail every 30 seconds

# Format document with specific line width
pico -r 72 formal_letter.txt

# Compose with word wrap disabled (for plain text)
pico -w plain_text_message.txt

# Start with help disabled for more space
pico -x long_document.txt
```

### Quick Editing Tasks

```bash
# Quick note taking
pico quick_notes.txt

# Edit backup configuration
pico ~/.backup_config

# Edit log rotation config
sudo pico -w /etc/logrotate.conf

# Edit crontab (if EDITOR is set to pico)
export EDITOR=pico
crontab -e

# Edit with mouse and no word wrap
pico -m -w technical_documentation.txt
```

## Advanced Features

### Search and Replace Operations

```bash
# Basic search
Ctrl+W
Enter search term
Enter to find next occurrence

# Case-sensitive search
Ctrl+W
Alt+C (toggle case sensitivity)
Enter search term

# Reverse search (search backwards)
Ctrl+W
Alt+R (toggle reverse)
Enter search term

# Search and replace
Ctrl+W
Alt+R (enter replace mode)
Enter search text
Enter replacement text
Y to replace, N to skip
```

### Text Selection and Manipulation

```bash
# Mark text for selection
Ctrl+Space        # Start selection
Navigate cursor  # Extend selection
Ctrl+K           # Cut selected text
Ctrl+U           # Paste text at cursor

# Select entire document
Ctrl+Home        # Go to beginning
Ctrl+Space       # Start selection
Ctrl+End         # Go to end
Ctrl+K           # Cut selection

# Copy and paste operations
Ctrl+K           # Cut line or selection
Ctrl+U           # Paste at cursor
Ctrl+U           # Paste again at different location
```

### Paragraph Formatting

```bash
# Justify current paragraph
Ctrl+J

# Change fill column interactively
Ctrl+W
Ctrl+R
Enter new fill column number

# Format entire document
Ctrl+Home        # Go to beginning
Ctrl+J           # Justify first paragraph
Ctrl+N           # Move to next paragraph
Ctrl+J           # Repeat for all paragraphs
```

### File Operations

```bash
# Insert external file at cursor
Ctrl+R
Enter filename to insert
Tab completion available

# Save with different name
Ctrl+O
Enter new filename
Confirm overwrite if exists

# Exit and save
Ctrl+X
Y to save changes
Enter filename or accept current

# Exit without saving
Ctrl+X
N for "No" when prompted to save
```

### Navigation Techniques

```bash
# Jump to line number
Ctrl+_
Enter line number
Enter to go to position

# Move by word (if supported)
Ctrl+Right Arrow  # Next word
Ctrl+Left Arrow   # Previous word

# Page navigation with position memory
Ctrl+V  # Page down
Ctrl+Y  # Page up (returns to previous position)
```

## Practical Examples

### System Administration

```bash
# Safe configuration file editing
sudo pico -w /etc/network/interfaces

# Edit sudoers file (caution required)
sudo visudo  # Uses default editor, ensure EDITOR=pico

# System log analysis
pico /var/log/syslog

# Service configuration
sudo pico -w /etc/systemd/system/custom-service.service

# Environment variable configuration
pico ~/.profile
pico ~/.bashrc

# Host file editing
sudo pico /etc/hosts
```

### Programming Workflows

```bash
# Edit Python script with specific settings
pico -w -T 4 script.py

# Create configuration file
pico -r 80 config.ini

# Edit shell script with proper formatting
pico -w -T 2 deploy.sh

# Markdown document editing
pico -r 79 README.md

# Code review comments
pico -m review_comments.txt

# Multi-file editing session
pico main.c
Ctrl+R helper.h    # Include header file
Ctrl+O main.c       # Save main file
```

### Documentation and Writing

```bash
# Technical documentation
pico -r 76 technical_guide.txt

# Email composition
pico -r 72 outgoing_email.txt

# Meeting minutes
pico -r 70 meeting_notes.txt

# Project specification
pico -w -r 132 project_spec.txt

# Quick memo with timestamp
echo "Memo $(date):" | pico memo.txt
Ctrl+R            # Read the timestamp
type memo text
```

### Batch File Operations

```bash
# Edit multiple configuration files
for config in *.conf; do
    pico -w "$config"
done

# Process log files
pico $(ls -t *.log | head -1)  # Edit most recent log

# Edit files from find command
find /etc -name "*.conf" -exec pico -w {} \;

# Edit files with specific content
grep -l "TODO" *.py | xargs pico
```

## Integration and Automation

### Shell Integration

```bash
# Set pico as default editor
export EDITOR=pico
export VISUAL=pico

# Use with version control
export GIT_EDITOR=pico
git commit  # Uses pico for commit message

# Crontab editing
export EDITOR=pico
crontab -e

# System configuration
export EDITOR="pico -w"  # Disable word wrap for configs
visudo

# Mail composition
export EDITOR=pico
mutt  # Uses pico for email composition
```

### Script Integration

```bash
#!/bin/bash
# Configuration file editor script

CONFIG_FILE="$1"
if [ -z "$CONFIG_FILE" ]; then
    echo "Usage: $0 <config_file>"
    exit 1
fi

# Backup original file
cp "$CONFIG_FILE" "$CONFIG_FILE.backup.$(date +%Y%m%d)"

# Edit with pico
pico -w "$CONFIG_FILE"

# Verify syntax if it's a shell script
if [[ "$CONFIG_FILE" == *.sh ]]; then
    bash -n "$CONFIG_FILE" && echo "Syntax OK" || echo "Syntax Error"
fi
```

### Pipeline Integration

```bash
# Edit command output
ls -la | pico temp_listing.txt

# Edit filtered output
ps aux | grep python | pico python_processes.txt

# Edit log entries
grep "ERROR" /var/log/syslog | pico error_log.txt

# Edit configuration after filtering
cat /etc/passwd | grep -v "nologin" | pico active_users.txt
```

## Configuration and Customization

### Environment Variables

```bash
# Set default options
export PICOOPTIONS="-w -m"

# Set default fill column
export PICOFILL=80

# Set default spell checker
export PICOSPELL="aspell -c"

# Set backup directory
export PICOBACKUPDIR="~/.pico_backup"

# Disable help display by default
export PICONOHELP=1
```

### Custom Spell Checker Integration

```bash
# Use Hunspell with specific dictionary
export PICOSPELL="hunspell -d en_US"

# Use ispell with custom options
export PICOSPELL="ispell -x -C"

# Multiple language support
case "$LANG" in
    fr*) export PICOSPELL="hunspell -d fr_FR" ;;
    de*) export PICOSPELL="hunspell -d de_DE" ;;
    *)   export PICOSPELL="hunspell -d en_US" ;;
esac
```

### Terminal Integration

```bash
# Function for quick editing with pico
picoedit() {
    if [ -f "$1" ]; then
        pico -w -m "$1"  # Edit existing file with no wrap and mouse
    else
        pico "$1"        # Create new file with default settings
    fi
}

# Alias for safe configuration editing
alias picoconfig='pico -w -m'

# Alias for document editing
alias picodoc='pico -r 72 -m'
```

## Performance Optimization

### Large File Handling

```bash
# Edit large files efficiently
pico -x large_file.txt        # Disable help for more screen space
pico -x -w large_config.txt   # No wrap, no help for configs

# Navigate large files
Ctrl+_                    # Go to line number
Ctrl+W                    # Search for content
Ctrl+Y/V                  # Page navigation

# Memory-efficient editing
pico -R huge_file.txt     # Restricted mode
pico -q huge_file.txt     # Quiet mode (less status updates)
```

### System Resource Management

```bash
# Use with limited resources
pico -q file.txt          # Quiet mode reduces updates
pico -x file.txt          # More screen space, less interface overhead

# Batch processing optimization
for file in *.txt; do
    pico -x -q -w "$file" &
done
wait  # Process multiple files
```

## Troubleshooting

### Common Issues and Solutions

#### Display Problems
```bash
# Terminal compatibility issues
pico -q file.txt          # Ignore termcap settings
export TERM=vt100         # Set basic terminal type
pico file.txt

# Screen corruption
Ctrl+L                    # Refresh display
pico -q file.txt          # Try with quiet mode

# Color display issues
pico file.txt             # Disable color if problems occur
export NO_COLOR=1         # Disable colors globally
```

#### File Access Issues
```bash
# Permission denied
sudo pico file.txt         # Edit with sudo
chmod +w file.txt          # Make file writable
pico file.txt              # Edit normally

# File locking issues
pico file.txt              # Try again later
lsof | grep file.txt       # Check what's using the file

# Disk space issues
df -h                      # Check available space
pico smaller_file.txt      # Edit smaller file
```

#### Keyboard Issues
```bash
# Function key problems
pico -f file.txt           # Enable function key support

# Special character issues
pico file.txt              # Use default settings
stty sane                  # Reset terminal settings

# Terminal type problems
export TERM=xterm          # Set standard terminal type
pico file.txt
```

### Performance Issues

#### Slow Response
```bash
# Large file editing
pico -x -q file.txt        # Reduce interface overhead
pico -R file.txt           # Use restricted mode

# Spell checking delays
pico -s "" file.txt        # Disable spell checking
export PICOSPELL=""        # Disable globally

# Search performance
Ctrl+W                     # Use incremental search
Enter search term directly
```

#### Memory Issues
```bash
# System memory limits
pico -R file.txt           # Restricted mode
pico -q file.txt           # Quiet mode

# Multiple files
pico file1.txt             # Edit one file at a time
exit
pico file2.txt
```

## Advanced Tips and Techniques

### Efficient Editing Workflows

```bash
# Quick navigation shortcuts
Ctrl+A        # Beginning of line
Ctrl+E        # End of line
Ctrl+V        # Page down
Ctrl+Y        # Page up
Ctrl+_        # Go to line

# Search efficiency
Ctrl+W term   # Search for 'term'
Ctrl+W Enter  # Search again for next occurrence

# Copy-paste workflow
Ctrl+K        # Cut line
Ctrl+U        # Paste at cursor
Ctrl+U        # Paste again if needed
```

### Multi-file Operations

```bash
# File concatenation workflow
pico file1.txt
Ctrl+R file2.txt    # Insert file2 at cursor
Ctrl+O combined.txt # Save as combined file

# Extract sections
pico large_file.txt
Ctrl+_              # Go to start line
Ctrl+Space          # Start selection
Navigate to end
Ctrl+K              # Cut selection
Ctrl+O section.txt  # Save section
```

### Backup and Recovery

```bash
# Automatic backup creation
pico_backup() {
    local file="$1"
    if [ -f "$file" ]; then
        cp "$file" "$file.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    pico -w "$file"
}

# Recovery from crashes
ls -a | grep '\.save'     # Look for pico save files
pico file.save            # Recover from save file
```

## Related Commands

- [`nano`](/docs/commands/development/nano) - Enhanced pico clone (modern replacement)
- [`vi`](/docs/commands/development/vi) - Visual editor
- [`vim`](/docs/commands/development/vim) - Vi IMproved
- [`emacs`](/docs/commands/development/emacs) - Advanced text editor
- [`ed`](/docs/commands/development/ed) - Line-oriented editor
- [`jed`](/docs/commands/development/jed) - JED text editor
- [`joe`](/docs/commands/development/joe) - Joe's Own Editor
- [`pine`](/docs/commands/email/pine) - Pine email client (uses pico)
- [`alpine`](/docs/commands/email/alpine) - Alpine email client (successor to Pine)

## Migration to nano

Since pico has been largely superseded by nano, users often migrate:

```bash
# Start nano with pico-compatible settings
nano -p          # pico-compatible mode
nano -i          # Auto-indent (pico behavior)
nano -m          # Mouse support
nano -x          # No help line (like pico -x)
nano -w          # Disable word wrap (like pico -w)
nano -r 72       # Set fill column (like pico -r 72)
nano -T 4        # Set tab size (like pico -T 4)

# Create alias for pico-like behavior
alias pico='nano -p -i -m'
```

### Differences from nano

While nano is a modern enhanced version of pico, there are some differences:

1. **Shortcuts**: Some keyboard shortcuts differ (search, replace)
2. **Features**: Nano has additional features like multiple buffers, syntax highlighting
3. **Options**: Command-line options may vary or have different defaults
4. **Search**: Nano has incremental search and regular expression support
5. **File operations**: Nano provides more advanced file management
6. **Customization**: Nano offers more extensive customization options

## Best Practices

1. **Use `-w` option** for configuration files to prevent unwanted line wrapping
2. **Enable mouse support** with `-m` for easier navigation and selection
3. **Set appropriate fill column** (`-r`) for different document types (72 for email, 80 for code)
4. **Use spell checking** (`-s` or `Ctrl+T`) for important documents
5. **Learn keyboard shortcuts** for efficient editing without menu dependence
6. **Save frequently** using `Ctrl+O` to prevent data loss from crashes
7. **Use search function** (`Ctrl+W`) for navigating large files efficiently
8. **Disable word wrap** for programming and configuration files
9. **Use restricted mode** (`-R`) when editing system files for safety
10. **Set environment variables** (`EDITOR`, `VISUAL`) for integration with other tools

## Performance Tips

1. **Use `-x` option** for large files to maximize screen space
2. **Enable `-q` (quiet mode)** to reduce system overhead
3. **Use `-R` (restricted mode)** for memory conservation
4. **Disable spell checking** (`-s ""`) when not needed for performance
5. **Use search navigation** instead of scrolling for large files
6. **Close unnecessary buffers** if using multi-file features
7. **Avoid excessive undo operations** in large files
8. **Use appropriate fill column** to prevent unnecessary line breaks
9. **Backup large files** before editing to prevent data loss
10. **Consider alternative editors** for very large files (>10MB)

The `pico` command remains a simple, reliable text editor that excels at basic text editing tasks. Its straightforward interface and consistent behavior make it an excellent choice for users who need a no-frills editor for composing documents, editing configuration files, or drafting email messages. While nano has largely replaced pico in modern Linux distributions, the basic editing concepts and keyboard shortcuts remain similar, making the transition straightforward for pico users. Pico's focus on simplicity and ease of use continues to make it a valuable tool for quick text editing tasks and for users new to command-line text editing.