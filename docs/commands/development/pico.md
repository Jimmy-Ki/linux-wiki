---
title: pico - Pine composer text editor
sidebar_label: pico
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pico - Pine composer text editor

The `pico` command is a simple, intuitive text editor that was originally designed as the mail composer for the Pine email client. It features a straightforward interface with on-screen help, making it accessible to beginners while providing sufficient functionality for general text editing tasks. Pico is the predecessor to the widely-used `nano` editor.

## Basic Syntax

```bash
pico [options] [filename]
```

## Common Options

### General Options

- `-b` - Enable substitution functions
- `-d` - Enable deletion functions
- `-e` - Use complete file names (no truncation)
- `-f` - Enable function key support (F1, F2, etc.)
- `-g` - Show cursor position
- `-h`, `--help` - Display help information
- `-j` - Enable jumping functions
- `-k` - Cut from cursor to end of line
- `-m` - Enable mouse support
- `-n <seconds>` - Set mail check interval (in seconds)
- `-o <dir>`, `--operatingdir=<dir>` - Set operating directory
- `-q` - Ignore termcap settings
- `-r <cols>`, `--fill=<cols>` - Set fill column for line wrapping
- `-s <program>`, `--speller=<program>` - Specify spell checker program
- `-t` - Enable tool mode
- `-v`, `--view` - Start in view-only (read-only) mode
- `-w` - Disable word wrap
- `-x` - Disable help display at bottom
- `-z` - Enable suspend function (Ctrl+Z)
- `+<line>` - Start editing at specified line number

## Keyboard Shortcuts

### File Operations

```bash
Ctrl+G      # Get help (display help screen)
Ctrl+O      # Write out (save) current file
Ctrl+R      # Read file (insert file at cursor position)
Ctrl+X      # Exit pico
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
Ctrl+_      # Go to specific line number (Ctrl+Shift+_)
```

### Special Functions

```bash
Ctrl+Space  # Mark start of selection
Ctrl+X      # Exit and prompt to save changes
```

## Usage Examples

### Basic File Editing

```bash
# Create or edit a file
pico myfile.txt

# Edit file starting at specific line
pico +50 config.txt

# Open file in read-only mode
pico -v important.conf

# Open with mouse support enabled
pico -m document.txt
```

### Configuration File Editing

```bash
# Edit system configuration
sudo pico /etc/ssh/sshd_config

# Edit without line wrapping (good for config files)
pico -w /etc/fstab

# Edit with function key support
pico -f ~/.bashrc
```

### Programming

```bash
# Edit source code
pico source.c

# Edit with specific fill column
pico -r 100 wide_document.txt

# Edit with spell checking enabled
pico -s aspell report.txt
```

### Email Composition

```bash
# Compose email (original purpose)
pico email_draft.txt

# Set up for Pine email client
pico -n 30 email_draft.txt  # Check for new mail every 30 seconds
```

## Screen Layout

### Main Editing Area
The main portion of the screen shows the file being edited, with the cursor position indicating where new text will be inserted.

### Status Lines
Bottom two lines show:
- **Top status line**: Current file name and cursor position
- **Bottom status line**: Available commands and shortcuts

### Help Display
The bottom of the screen always displays available keyboard shortcuts, providing immediate assistance for new users.

## Advanced Features

### Search and Replace

```bash
# Search for text
Ctrl+W
Enter search term
Enter to find next occurrence

# Case-insensitive search
Ctrl+W
Alt+C (within search prompt)
Enter search term
```

### Paragraph Justification

```bash
# Format current paragraph
Ctrl+J

# Set fill column for wrapping
Ctrl+W
Ctrl+R
Enter number
```

### Spell Checking

```bash
# Run spell checker
Ctrl+T

# Use custom spell checker
pico -s "/usr/bin/hunspell -d en_US" document.txt
```

### File Operations

```bash
# Insert external file
Ctrl+R
Enter filename

# Save with different name
Ctrl+O
Enter new filename

# Exit without saving
Ctrl+X
N for "No" when prompted to save
```

## Configuration Options

### Environment Variables

```bash
# Set default editor
export EDITOR=pico

# Set default fill column
export PICOFILL=72

# Disable help display
export PICONOHELP=1
```

### .pinorc Configuration

Pico can be configured through Pine's configuration files:

```bash
# .pinorc or .pine/pinorc
editor-variable-overrides=disable
```

## Practical Examples

### Quick Note Taking

```bash
# Start pico for quick notes
pico notes.txt

# Add timestamp at beginning
Ctrl+R      # Insert file
Enter       # External command
date        # Command to execute
Enter       # Insert current date/time
```

### Configuration File Management

```bash
# Safe editing of system files
sudo pico -w /etc/network/interfaces

# Edit multiple related files
pico ~/.bashrc ~/.profile ~/.bash_aliases
```

### Email Drafting

```bash
# Compose email message
pico -n 60 message.txt

# Format email properly (72-character lines)
pico -r 72 email_draft.txt
```

### Script Editing

```bash
# Edit shell script
pico script.sh

# Add execute permission after editing
chmod +x script.sh
```

### Document Formatting

```bash
# Format text document
pico -r 80 essay.txt

# Justify paragraphs while typing
Ctrl+J after each paragraph
```

## Integration with Other Tools

### Email Clients

```bash
# Set as Pine composer
export EDITOR=pico
pine

# Use with Mutt email client
export EDITOR="pico -w"
mutt
```

### Version Control

```bash
# Edit commit message
export GIT_EDITOR=pico
git commit

# Use without line wrapping for commit messages
export GIT_EDITOR="pico -w"
git commit
```

### Development Environment

```bash
# Set as default editor for various tools
export EDITOR=pico
export VISUAL=pico

# Use in makefiles
EDITOR=pico crontab -e
```

## Tips and Techniques

### Efficient Editing

```bash
# Use navigation shortcuts
Ctrl+A      # Beginning of line
Ctrl+E      # End of line
Ctrl+V      # Page down
Ctrl+Y      # Page up

# Quick search and navigation
Ctrl+W      # Search
Ctrl+W      # Search again for next occurrence
```

### Text Selection

```bash
# Select text blocks
Ctrl+Space  # Start selection
Move cursor to extend selection
Ctrl+K      # Cut selected text
Ctrl+U      # Paste text
```

### File Management

```bash
# Work with multiple files
pico file1.txt
Ctrl+R file2.txt    # Insert second file
Ctrl+O              # Save combined file
```

## Related Commands

- [`nano`](/docs/commands/editors/nano) - Enhanced pico clone (modern replacement)
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`emacs`](/docs/commands/editors/emacs) - Advanced text editor
- [`ed`](/docs/commands/editors/ed) - Line-oriented editor
- [`pine`](/docs/commands/email/pine) - Pine email client (uses pico)

## Migration to nano

Since pico has been largely superseded by nano, users often migrate:

```bash
# Start nano with pico-compatible settings
nano -p          # pico-compatible mode
nano -i          # Auto-indent (pico behavior)
nano -m          # Mouse support
nano -x          # No help line (like pico -x)
```

## Best Practices

1. **Use `-w` option** for configuration files to prevent unwanted line wrapping
2. **Enable mouse support** with `-m` for easier navigation
3. **Set appropriate fill column** for different document types
4. **Use spell checking** for important documents
5. **Learn keyboard shortcuts** for efficient editing
6. **Save frequently** to prevent data loss
7. **Use search function** for navigating large files
8. **Disable word wrap** for programming and configuration files

## Common Issues and Solutions

### Line Wrapping Problems

```bash
# Edit config files without word wrap
pico -w /etc/fstab

# Or set larger fill column
pico -r 132 long_config.conf
```

### File Permissions

```bash
# Edit system files with sudo
sudo pico /etc/hosts

# Check file permissions before editing
ls -la file.txt
```

### Character Encoding

```bash
# Set locale before starting
export LANG=en_US.UTF-8
pico unicode_file.txt
```

### Large File Handling

```bash
# Edit large files efficiently
pico -x large_log.txt  # Disable help for more screen space
```

## Differences from nano

While nano is a modern enhanced version of pico, there are some differences:

1. **Shortcuts**: Some keyboard shortcuts differ
2. **Features**: Nano has additional features like multiple buffers
3. **Options**: Command-line options may vary
4. **Syntax highlighting**: Nano has built-in syntax highlighting
5. **Search**: Nano has incremental search capabilities

Pico remains a simple, reliable text editor that excels at basic text editing tasks. Its straightforward interface and consistent behavior make it an excellent choice for users who need a no-frills editor for composing documents, editing configuration files, or drafting email messages. While nano has largely replaced pico in modern Linux distributions, the basic editing concepts and keyboard shortcuts remain similar, making the transition straightforward for pico users.