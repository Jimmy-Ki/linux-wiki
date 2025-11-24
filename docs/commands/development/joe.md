---
title: joe - Joe's Own Editor
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# joe - Joe's Own Editor

The `joe` command is a powerful, full-screen text editor that provides a user-friendly interface while maintaining powerful editing capabilities. Joe's Own Editor was designed to be easy to use for beginners while offering advanced features for experienced users. It can emulate other popular editors like Emacs, WordStar, and Brief, making it familiar to users coming from different editing environments.

## Basic Syntax

```bash
joe [options] [filename...]
```

## Common Options

### Editing Options

- `--force` - Force adding newline at end of file
- `--autoindent` - Enable auto-indentation
- `--backups` - Create backup files
- `--nobackups` - Don't create backup files
- `--overwrite` - Overwrite existing files without warning
- `--notab` - Convert tabs to spaces
- `--tab <number>` - Set tab width to specified number
- `--linums` - Enable line numbers
- `--nolinums` - Disable line numbers

### Display Options

- `--keepup` - Keep status line at top of screen
- `--lightoff` - Turn off highlighting after block operations
- `--columns <number>` - Set screen width to specified columns
- `--lines <number>` - Set screen height to specified lines
- `--mouse` - Enable mouse support (if available)
- `--noxon` - Disable XON/XOFF flow control

### Behavior Options

- `--asis` - Preserve original file format
- `--crlf` - Use Windows line endings
- `--flow` - Control flow characters
- `--help` - Display help information
- `--version` - Display version information
- `--noexask` - Don't ask to save files on exit
- `--nonotice` - Don't display copyright notice
- `--nosta` - Don't display status line
- `--orphan` - Put files in separate buffers

### Performance Options

- `--dopadding` - Add padding between program and terminal
- `--skiptop <number>` - Skip specified number of top lines

## Keyboard Shortcuts

### File Operations

```bash
Ctrl+K H    # Get help (display help screen)
Ctrl+K X    # Exit and save
Ctrl+K D    # Save file
Ctrl+K Q    # Quit without saving
Ctrl+K E    # Edit another file
Ctrl+K R    # Insert file
Ctrl+K V    # Move to next file
Ctrl+K U    # Move to previous file
```

### Basic Movement

```bash
Ctrl+F      # Move forward one character
Ctrl+B      # Move backward one character
Ctrl+P      # Move to previous line
Ctrl+N      # Move to next line
Ctrl+A      # Move to beginning of line
Ctrl+E      # Move to end of line
```

### Advanced Movement

```bash
Ctrl+U A    # Beginning of buffer
Ctrl+U E    # End of buffer
Ctrl+U P    # Previous page
Ctrl+U N    # Next page
Ctrl+U I    # Go to specific line
```

### Text Editing

```bash
Ctrl+D      # Delete character at cursor
Ctrl+H      # Delete character before cursor
Ctrl+W      # Delete word to left
Ctrl+Y      # Delete line
Ctrl+K C    # Copy block
Ctrl+K M    # Move block
Ctrl+K Y    # Delete block
Ctrl+K W    # Save block to file
```

### Search and Replace

```bash
Ctrl+K F    # Find text
Ctrl+L      # Repeat last find
Ctrl+K R    # Replace text
Ctrl+K A    # Replace all
```

### Block Operations

```bash
Ctrl+K B    # Mark beginning of block
Ctrl+K K    # Mark end of block
Ctrl+K C    # Copy block
Ctrl+K M    # Move block
Ctrl+K Y    # Delete block
Ctrl+K W    # Write block to file
```

### Buffer Management

```bash
Ctrl+K D    # Save buffer
Ctrl+K E    # Edit file in new buffer
Ctrl+K V    # Next buffer
Ctrl+K U    # Previous buffer
Ctrl+K G    # Goto specific buffer
```

### Special Functions

```bash
Ctrl+K J    # Format paragraph
Ctrl+K Space# Center line
Ctrl+K ,    # Insert date/time
Ctrl+K .    # Insert file name
Ctrl+K /    # Spell check
Ctrl+K ;    # Execute shell command
```

## Usage Examples

### Basic File Editing

```bash
# Create or edit a file
joe myfile.txt

# Edit file with auto-indent
joe --autoindent source.c

# Edit with line numbers
joe --linums script.py

# Edit with specific tab width
joe --tab 8 indented_file.txt
```

### Programming

```bash
# Edit C source code with programming-friendly settings
joe --autoindent --notab --tab 4 program.c

# Edit Python with tab conversion
joe --notab --autoindent python_script.py

# Edit with backups enabled
joe --backups important_config.conf
```

### Configuration File Editing

```bash
# Edit system configuration
sudo joe /etc/ssh/sshd_config

# Edit without backups to avoid clutter
joe --nobackups temp_file.txt

# Edit with overwrite protection disabled
joe --overwrite draft.txt
```

### Multiple File Editing

```bash
# Edit multiple files
joe file1.txt file2.txt file3.txt

# Navigate between files
Ctrl+K V    # Next file
Ctrl+K U    # Previous file
```

## Editor Emulations

Joe can emulate other popular editors:

### WordStar Mode

```bash
# Start in WordStar mode
joe --wordstar document.txt

# WordStar-like commands:
Ctrl+K D    # Save
Ctrl+K X    # Save and exit
Ctrl+K Q    # Quit
```

### Emacs Mode

```bash
# Start in Emacs mode
joe --emacs source_code.c

# Emacs-like navigation:
Ctrl+V      # Page down
Alt+V       # Page up
Ctrl+A      # Beginning of line
Ctrl+E      # End of line
```

### Brief Mode

```bash
# Start in Brief mode
joe --brief file.txt
```

## Advanced Features

### Block Selection and Manipulation

```bash
# Mark block
Ctrl+K B    # Mark beginning
Move cursor to end position
Ctrl+K K    # Mark end

# Block operations
Ctrl+K C    # Copy block
Ctrl+K M    # Move block
Ctrl+K Y    # Delete block
Ctrl+K W    # Save block to file

# Rectangle operations
Ctrl+K X    # Exchange mark and cursor
Ctrl+K R    # Replace text in block
```

### Search and Replace

```bash
# Simple search
Ctrl+K F
Enter search string
Enter

# Case-sensitive search
Ctrl+K F
Enter search string
Alt+C       # Toggle case sensitivity

# Search and replace
Ctrl+K R
Enter search string
Enter replacement string

# Global replace
Ctrl+K A
Enter search string
Enter replacement string
```

### Formatting

```bash
# Format paragraph
Ctrl+K J

# Center line
Ctrl+K Space

# Justify paragraph
Ctrl+K J
```

### Shell Integration

```bash
# Execute shell command
Ctrl+K ;
Enter shell command

# Insert command output
Ctrl+K R
!command

# Run external spell checker
Ctrl+K /
```

## Configuration

### Configuration Files

Joe uses configuration files to customize behavior:

```bash
# Global configuration
/etc/joe/joerc

# User configuration
~/.joerc

# Local configuration
./.joerc
```

### Sample Configuration

```bash
# ~/.joerc sample

# Set tab width
-rmtab 4

# Enable auto-indent
-autoindent

# Enable line numbers
-linums

# Set backup directory
-backupdir ~/.joe_backup

# Enable mouse support
-mouse

# Set column width
-columns 80

# Set fill column
-rmargin 72
```

### Custom Key Bindings

```bash
# Define custom key bindings in .joerc
defmap joe

# Custom functions
^KW         "Save block to file"
^K,         "Insert date/time"

# Redefine existing keys
^KX         "Save and exit"
^KQ         "Quit without saving"
```

## Practical Examples

### Programming Workflow

```bash
# Edit with programming settings
joe --autoindent --notab --tab 4 --backups project.c

# Within Joe:
Ctrl+K B    # Mark beginning of function
Navigate to function end
Ctrl+K K    # Mark end of function
Ctrl+K C    # Copy function
Navigate to new location
Ctrl+K M    # Move function
```

### Document Writing

```bash
# Edit with document settings
joe --columns 80 --skiptop 5 document.txt

# Format paragraphs while typing
Ctrl+K J    # Format current paragraph

# Center titles
Ctrl+K Space# Center line
```

### Configuration Management

```bash
# Safe editing of system files
sudo joe --backups --nobackups /etc/hosts

# Edit with custom tab settings
joe --tab 2 --autoindent config.yaml
```

### Code Review

```bash
# Open multiple files for comparison
joe original.c modified.c

# Use block operations to compare
Ctrl+K B    # Mark block in first file
Switch to second file (Ctrl+K V)
Ctrl+K C    # Copy for comparison
```

## Advanced Usage

### Regular Expressions

```bash
# Search with regular expressions
Ctrl+K F
Enter pattern with wildcards
*           # Match any characters
?           # Match single character
[char]      # Match character class
```

### Macro Recording

```bash
# Record macro sequence
Ctrl+K (    # Start recording
Perform editing actions
Ctrl+K )    # Stop recording

# Execute macro
Ctrl+K '    # Execute last macro
```

### Column Editing

```bash
# Column mode editing
Ctrl+K X    # Exchange mark and cursor
Set rectangular block
Ctrl+K C    # Copy rectangular block
Ctrl+K M    # Move rectangular block
```

### File Management

```bash
# File operations
Ctrl+K E    # Edit new file
Ctrl+K V    # Next file
Ctrl+K U    # Previous file
Ctrl+K D    # Save current file

# Buffer management
Ctrl+K G    # Goto specific buffer by number
```

## Integration with Other Tools

### Version Control

```bash
# Edit commit message
export JOE_EDITOR="joe --notab"
git commit

# Use for diff viewing
git diff | joe -
```

### Development Environment

```bash
# Set as default editor
export EDITOR=joe
export VISUAL=joe

# Use with make
EDITOR=joe crontab -e
```

### Email Integration

```bash
# Compose email
joe --wordstar email_draft.txt

# Format email with proper line width
joe --columns 72 message.txt
```

## Related Commands

- [`emacs`](/docs/commands/editors/emacs) - GNU Emacs editor (can be emulated)
- [`vi`](/docs/commands/editors/vi) - Visual editor
- [`vim`](/docs/commands/editors/vim) - Vi IMproved
- [`nano`](/docs/commands/editors/nano) - Nano editor
- [`jed`](/docs/commands/editors/jed) - JED editor (similar capabilities)
- [`pico`](/docs/commands/editors/pico) - Pine composer

## Best Practices

1. **Use auto-indentation** for programming with `--autoindent`
2. **Enable backups** for important files with `--backups`
3. **Configure tab settings** appropriately for different file types
4. **Learn block operations** for efficient text manipulation
5. **Use keyboard shortcuts** extensively for speed
6. **Customize .joerc** for personalized workflow
7. **Enable line numbers** for code editing
8. **Use search and replace** effectively for bulk changes
9. **Learn editor emulations** if coming from other editors
10. **Save frequently** to prevent data loss

## Common Issues and Solutions

### Tab and Indentation Issues

```bash
# Convert tabs to spaces
joe --notab file.txt

# Set specific tab width
joe --tab 4 file.txt

# Enable auto-indentation
joe --autoindent source.c
```

### File Permission Problems

```bash
# Edit system files with sudo
sudo joe /etc/sudoers

# Check file permissions first
ls -la file.txt
```

### Large File Handling

```bash
# Edit large files efficiently
joe --skiptop 5 large_file.txt

# Disable line numbers for more screen space
joe --nolinums huge_log.txt
```

### Backup Management

```bash
# Control backup file location
mkdir ~/.joe_backup
# Add to .joerc:
-backupdir ~/.joe_backup
```

Joe's Own Editor provides an excellent balance between simplicity and power. Its ability to emulate other popular editors makes it accessible to users transitioning from different environments, while its native features provide efficient text editing capabilities. The intuitive keyboard shortcuts and comprehensive help system make it suitable for both beginners and experienced users who need a reliable, full-screen text editor.