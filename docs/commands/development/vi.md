---
title: vi - Visual Editor
sidebar_label: vi
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# vi - Visual Editor

The `vi` command is a powerful, screen-oriented text editor that is universally available on Unix and Linux systems. Originally created by Bill Joy in 1976, it's the predecessor to `vim` (Vi IMproved) and remains one of the most fundamental tools for system administration and programming. Vi operates through different modes (command, insert, and ex mode) and provides efficient text manipulation capabilities through keyboard shortcuts. Its ubiquity across all Unix-like systems makes it an essential skill for any system administrator or developer, especially when working in remote environments or system recovery scenarios where graphical editors are unavailable.

## Basic Syntax

```bash
vi [options] [filename...]
```

## Common Options

### Startup Options
- `+<number>` - Start editing at line number
- `+/<pattern>` - Start with cursor at first occurrence of pattern
- `-b` - Binary mode for editing binary files
- `-c <command>` - Execute command after loading first file
- `-d` - Diff mode for showing file differences
- `-e` - Start in ex mode
- `-E` - Start in improved ex mode
- `-F` - Don't use newlines for end-of-screen
- `-l` - Lisp mode (enables lisp and showmatch)
- `-m` - Disable file writing (modify mode)
- `-M` - Disable modification
- `-n` - No swap file usage
- `-o <number>` - Open specified number of files in split windows
- `-O <number>` - Open files in vertically split windows
- `-p <number>` - Open specified number of files in tab pages
- `-R` - Read-only mode (same as view command)
- `-r` - Recovery mode (recover after crash)
- `-s` - Silent mode (no error messages)
- `-S <session>` - Load session file
- `-t <tag>` - Edit file where tag is defined
- `-v` - Start in vi mode (default)
- `-y` - Easy mode (like evim)
- `--version` - Display version information
- `--help` - Display help information

### Vi Operating Modes

Vi has three main operating modes:

#### Command Mode (Default)
The default mode when vi starts. All keystrokes are interpreted as commands.
- Navigation: `h`, `j`, `k`, `l`, `w`, `b`, `e`, `0`, `$`
- Editing: `x`, `dd`, `yy`, `p`, `P`
- Search: `/`, `?`, `n`, `N`

#### Insert Mode
Allows text entry. Enter by pressing `i`, `a`, `o`, etc.
- `i` - Insert before cursor
- `a` - Append after cursor
- `o` - Open new line below
- `O` - Open new line above
- `Esc` - Return to command mode

#### Ex Mode
Line-based editing mode. Enter by pressing `:` from command mode.
- File operations: `:w`, `:q`, `:wq`, `:e`
- Global operations: `:%s/old/new/g`
- Settings: `:set number`, `:set tabstop=4`

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
ge     # Move to end of previous word

# Line navigation
0      # Move to beginning of line
^      # Move to first non-space character
$      # Move to end of line
g_     # Move to last non-space character

# File navigation
G      # Go to last line
1G     # Go to first line
gg     # Go to first line
<number>G # Go to specific line number
<number>gg # Go to specific line number
:%     # Go to specific percentage of file

# Sentence and paragraph movement
(      # Move to beginning of previous sentence
)      # Move to beginning of next sentence
{      # Move to beginning of previous paragraph
}      # Move to beginning of next paragraph

# Brace matching
%      # Jump to matching (, {, or [, or #if/#else/#endif

# Line position
H      # Move to top of screen
M      # Move to middle of screen
L      # Move to bottom of screen
```

### Screen Navigation

```bash
# Page movement
Ctrl+f # Forward one page
Ctrl+b # Backward one page
Ctrl+d # Forward half page
Ctrl+u # Backward half page

# Line scrolling
Ctrl+e # Scroll down one line
Ctrl+y # Scroll up one line
z<enter> # Current line to top of screen
z.     # Current line to middle of screen
z-     # Current line to bottom of screen

# Line centering
zz     # Center current line
zt     # Move current line to top
zb     # Move current line to bottom

# Horizontal scrolling
zh     # Scroll left
zl     # Scroll right
zH     # Scroll half screen left
zL     # Scroll half screen right
```

### Insert Mode Commands

```bash
# Basic insert commands
i      # Insert before cursor
I      # Insert at beginning of line (first non-space)
a      # Append after cursor
A      # Append at end of line

# Line insertion
o      # Open new line below current line
O      # Open new line above current line

# Replace commands
r<char> # Replace single character
R      # Enter replace mode
s      # Substitute character and enter insert mode
S      # Substitute entire line

# Special insert commands
gi     # Insert at last insertion position
gI     # Insert at first character of line
g_a    # Append at end of line
gI     # Insert in column 1

# Insert from register
"ap    # Insert contents of register 'a'
"0p    # Insert from yank register
```

### Deleting Text

```bash
# Character deletion
x      # Delete character under cursor
X      # Delete character before cursor
dl     # Delete character (same as x)
dh     # Delete character before cursor (same as X)

# Word deletion
dw     # Delete word
dW     # Delete WORD (delimited by whitespace)
de     # Delete to end of word
dE     # Delete to end of WORD
db     # Delete to beginning of word
dB     # Delete to beginning of WORD
daw    # Delete a word (including surrounding whitespace)
diw    # Delete inner word
daW    # Delete a WORD
diW    # Delete inner WORD

# Line deletion
dd     # Delete current line
D      # Delete to end of line (same as d$)
d0     # Delete to beginning of line
d^     # Delete to first non-space character
d$     # Delete to end of line
dgg    # Delete to beginning of file
dG     # Delete to end of file

# Range deletion
<number>dd # Delete multiple lines
:5,10d # Delete lines 5-10
:%d    # Delete entire file
:g/pattern/d # Delete lines matching pattern
:v/pattern/d # Delete lines not matching pattern

# Special deletion
dgg    # Delete from cursor to beginning of file
dG     # Delete from cursor to end of file
```

### Copying and Pasting

```bash
# Yanking (copying)
yy     # Copy current line
Y      # Copy current line (same as yy)
<number>yy # Copy multiple lines
y$     # Copy to end of line
y0     # Copy to beginning of line
y^     # Copy to first non-space character
yw     # Copy word
yiw    # Copy inner word
yaw    # Copy a word
yG     # Copy to end of file
ygg    # Copy to beginning of file

# Pasting
p      # Paste after cursor
P      # Paste before cursor
gp     # Paste after cursor and leave cursor after pasted text
gP     # Paste before cursor and leave cursor before pasted text

# Register operations
"ayy   # Yank to register 'a'
"ap    # Paste from register 'a'
"Ay    # Append to register 'a'
"+y    # Yank to system clipboard
"+p    # Paste from system clipboard
"*y    # Yank to primary selection
"*p    # Paste from primary selection

# Number registers
"1p    # Paste from register 1 (last delete/yank)
"2p    # Paste from register 2 (second last delete/yank)
```

### Search and Replace

```bash
# Basic searching
/pattern     # Search forward for pattern
?pattern     # Search backward for pattern
n            # Repeat search in same direction
N            # Repeat search in opposite direction

# Search with offsets
/pattern/+n  # Search and move n lines down
/pattern/-n  # Search and move n lines up

# Special search patterns
/^pattern    # Search at beginning of line
/pattern$    # Search at end of line
\<pattern    # Search whole word at beginning
pattern\>    # Search whole word at end
\<pattern\>  # Search whole word

# Search options
:set ignorecase    # Ignore case in search
:set smartcase     # Smart case sensitivity
:set hlsearch      # Highlight search results
:set incsearch     # Incremental search
:nohls            # Turn off highlighting

# Substitution
:s/old/new/           # Replace first occurrence on line
:s/old/new/g          # Replace all occurrences on line
:%s/old/new/g         # Replace all occurrences in file
:%s/old/new/gc        # Replace with confirmation
:%s/old/new/gi        # Replace ignoring case
:%s/old/new/gI        # Replace case-sensitive

# Range substitution
:<start>,<end>s/old/new/g    # Replace in range
:.,$s/old/new/g              # Replace from current line to end
:1,.s/old/new/g              # Replace from beginning to current line
:'a,'bs/old/new/g             # Replace between marks a and b

# Advanced substitution
:%s/old/new/g | %s/\s\+$//    # Chain substitutions
:%s/^\(.*\)/\U\1/            # Convert to uppercase
:%s/^\(.*\)/\L\1/            # Convert to lowercase
```

### File Operations

```bash
# Saving
:w            # Save file
:w <filename> # Save as new filename
:w!           # Force save (overwrite existing)
:wq           # Save and quit
:x            # Save and quit (same as :wq)
:up           # Update if modified
:up!          # Force update

# Quitting
:q            # Quit (if no changes)
:q!           # Force quit without saving
:qa           # Quit all
:qa!          # Force quit all
:wqall        # Save all and quit
:xall         # Save all modified and quit

# File editing
:e <filename> # Edit another file
:e!           # Reload current file (discard changes)
:e #<number>  # Edit file number from argument list
:n            # Next file
:N            # Previous file
:args         # List all open files
:args <files> # Set new argument list

# File reading
:r <filename> # Read file into current buffer
:r !command   # Insert command output
:r!date       # Insert current date/time

# File information
:f            # Show current file information
Ctrl+g        # Show file information
=             # Show line number
<Ctrl+v>=     # Show character under cursor

# Encryption
:X            # Set encryption key
:w            # Save with encryption
```

## Usage Examples

### Basic File Editing

```bash
# Create a new file or edit existing
vi newfile.txt

# Open file at specific line
vi +50 config.txt

# Open file at pattern
vi +/error logfile.txt

# Open multiple files
vi file1.txt file2.txt file3.txt

# Open file in read-only mode
vi -R important.conf

# Open file in recovery mode
vi -r filename

# Open without creating swap file
vi -n largefile.log

# Edit binary files
vi -b binaryfile

# Execute command on startup
vi -c 'set number' file.txt

# Start with cursor at end of file
vi + file.txt
```

### Navigation Examples

```bash
# Navigate to specific line
:100    # Go to line 100
:$      # Go to last line
:1      # Go to first line

# Navigate by percentage
:50%    # Go to middle of file
:75%    # Go to 75% through file

# Jump to matching brace
%       # Jump to matching (, {, or [

# Go to mark
'g      # Go to mark 'g'
`g      # Go to exact position of mark 'g'

# Go to insertion position
''      # Go to previous context
````    # Go to previous position

# Search navigation
/function    # Find function definition
/error       # Find error message
/^#include   # Find include statements
```

### Search and Navigation

```bash
# Search for function definition
/function

# Case-insensitive search
:set ignorecase
/variable

# Whole word search
/\<main\>

# Find next occurrence
n

# Find previous occurrence
N

# Search with confirmation
:%s/oldVariable/newVariable/gc

# Replace in specific range
:20,50s/temp/tempFile/g

# Complex substitution
:%s/\(function\)\s\+(\(.*\))/\1(\2)/g
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
Ctrl+w j    # Move to window below
Ctrl+w k    # Move to window above
Ctrl+w h    # Move to window left
Ctrl+w l    # Move to window right

# Tab editing
:tabnew file4.txt
:tabnext
:tabprev
:tabclose

# Buffer operations
:ls         # List all buffers
:b <number> # Switch to buffer by number
:bd         # Delete buffer
:bn         # Next buffer
:bp         # Previous buffer
```

## Advanced Features

### Configuration

```bash
# Display settings
:set number          # Show line numbers
:set nonumber        # Hide line numbers
:set relativenumber  # Show relative line numbers
:set ruler           # Show cursor position
:set showmode        # Show current mode

# Search settings
:set hlsearch        # Highlight search results
:set nohlsearch       # Don't highlight search results
:set ignorecase      # Ignore case in search
:set smartcase       # Smart case sensitivity
:set incsearch       # Incremental search

# Indentation settings
:set tabstop=4       # Tab width
:set shiftwidth=4    # Indent width
:set expandtab       # Use spaces instead of tabs
:set autoindent      # Enable autoindent
:set smartindent     # Enable smart indentation
:set cindent         # C-style indentation

# Text settings
:set wrap            # Wrap long lines
:set nowrap          # Don't wrap long lines
:set textwidth=80    # Wrap at column 80
:set showmatch       # Show matching braces
:set matchtime=2     # Time to show matching brace

# Behavior settings
:set showcmd         # Show command in status line
:set wildmenu        # Enhanced command completion
:set history=1000    # Command history size
:set backup          # Create backup files
:set writebackup     # Create backup before overwriting

# File type specific
:filetype on         # Enable file type detection
:filetype plugin on  # Enable file type plugins
:filetype indent on  # Enable file type indent

# Color settings
:syntax on           # Enable syntax highlighting
:syntax off          # Disable syntax highlighting
:colorscheme default # Set color scheme
```

### Marking and Bookmarks

```bash
# Set mark
ma      # Set mark 'a'
mA      # Set global mark 'a' (works across files)
m<      # Set mark at beginning of line
m>      # Set mark at end of line

# Jump to mark
'a      # Jump to mark 'a' (line start)
`a      # Jump to mark 'a' (exact position)
'A      # Jump to global mark 'a'
'<      # Jump to start of selection
'>      # Jump to end of selection

# Special marks
''      # Jump to previous position
``      # Jump to previous exact position
'.      # Jump to last modification position
'^      # Jump to last insertion position
'"      # Jump to last exited file position
'[      # Jump to start of last yanked/deleted text
']      # Jump to end of last yanked/deleted text

# Show all marks
:marks
:marks a b c  # Show specific marks
```

### Registers

```bash
# Named registers
"ayy    # Yank to register 'a'
"ap     # Paste from register 'a'
"Ay     # Append to register 'a'

# Number registers (delete/yank history)
"1p     # Paste from register 1
"2p     # Paste from register 2
"9p     # Paste from register 9

# Special registers
"+y     # Yank to system clipboard
"+p     # Paste from system clipboard
"*y     # Yank to primary selection
"*p     # Paste from primary selection
"_dd    # Delete to black hole register (don't store)

# Expression register
"=5*5<Enter>p  # Insert result of calculation
"=system('date')<Enter>p  # Insert command output

# File registers
"%     # Current filename
"#     # Alternate filename

# View registers
:reg    # Show all registers
:reg a  # Show register 'a'
```

### Macros

```bash
# Start recording macro
qa      # Start recording to register 'a'
qb      # Start recording to register 'b'
q       # Stop recording

# Execute macro
@a      # Execute macro 'a'
@@      # Repeat last macro
<number>@a # Execute macro 'a' multiple times

# Macro editing
:let @a = 'normal iHello'  # Define macro programmatically
:put @a                     # Put macro contents

# Macro tips
qQ      # Stop recording if started accidentally
"ap     # Paste macro for editing
```

### Visual Mode

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
=       # Auto-format selection
J       # Join selected lines

# Selection commands
o       # Go to other end of selection
O       # Go to other end (same as o)

# Block mode operations
Ctrl+v I#<Esc>  # Insert # at beginning of block
Ctrl+v A;<Esc>  # Append ; to end of block

# Visual search
*       # Search forward for word under cursor
#       # Search backward for word under cursor
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

# Edit multiple config files
vi /etc/sysctl.conf /etc/security/limits.conf

# Edit with syntax highlighting and line numbers
vi -c 'set syntax=on' -c 'set number' /etc/fstab
```

### Programming

```bash
# Edit source code with syntax highlighting
vi main.c

# Navigate to function
/functionName

# Comment out block of lines
:10,20s/^/\/\//    # Add // to lines 10-20

# Auto-indent code
=G                   # Auto-indent entire file
=5G                  # Auto-indent to line 5

# Navigate through errors
:cnext               # Next error in quickfix list
:cprev               # Previous error in quickfix list
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

# Filter and view specific log entries
:g/ERROR/p          # Show only error lines
:v/INFO/d           # Remove info lines
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

# Sort lines
:1,$!sort

# Remove duplicate lines
:sort u
```

### File Recovery

```bash
# Recover file after crash
vi -r filename

# List swap files
vi -r

# Open without swap file
vi -n filename

# Check for existing swap files before editing
if [ -f .filename.swp ]; then echo "Swap file exists"; fi
```

### Bulk Operations

```bash
# Replace across multiple files
for file in *.txt; do
    vi -c '%s/old/new/g' -c 'wq' "$file"
done

# Format all Python files
for file in *.py; do
    vi -c 'normal gg=G' -c 'wq' "$file"
done
```

## Advanced Usage

### Complex Search Patterns

```bash
# Regular expressions
/\v\([a-z]+\)\s*{    # Very magic: function definitions
/\m\(.*\)             # Magic: parentheses with content
/\V\(/               # Very nomagic: literal parenthesis

# Character classes
/[0-9]\+             # One or more digits
/[a-zA-Z_]\w*        # Variable names
/https\?:\/\/\S\+    # URLs

# Multi-line patterns
/first\_.*second      # First...second spanning lines
/^\s*\n\s*$           # Empty lines

# Advanced substitutions
:%s/\(\w\+\)\s\+\(\w\+\)/\2 \1/g    # Swap two words
:%s/\v^(\s*)/\1\/\/ /g               # Comment lines preserving indent
```

### Window Management

```bash
# Split operations
:split            # Split horizontally
:vsplit           # Split vertically
:new              # Create new window
:only             # Close all other windows

# Window navigation
Ctrl+w w          # Next window
Ctrl+W W          # Previous window
Ctrl+w h/j/k/l    # Directional navigation
Ctrl+w t          # Top window
Ctrl+w b          # Bottom window

# Window resizing
Ctrl+w =          # Equal size windows
Ctrl+w +          # Increase height
Ctrl+w -          # Decrease height
Ctrl+w >          # Increase width
Ctrl+w <          # Decrease width
```

### Buffer Management

```bash
# Buffer operations
:ls               # List buffers
:b <number>       # Switch to buffer
:bnext            # Next buffer
:bprev            # Previous buffer
:bfirst           # First buffer
:blast            # Last buffer
:bd               # Delete buffer
:bdelete <number> # Delete specific buffer
:bunload <number> # Unload buffer
:bwipeout <number> # Completely remove buffer
```

### Folding

```bash
# Folding methods
:set foldmethod=manual    # Manual folding
:set foldmethod=indent    # Indent-based folding
:set foldmethod=syntax    # Syntax-based folding
:set foldmethod=marker    # Marker-based folding

# Folding commands
zf                      # Create fold
zd                      # Delete fold
za                      # Toggle fold
zo                      # Open fold
zc                      # Close fold
zr                      # Reduce folding
zm                      # More folding
zR                      # Open all folds
zM                      # Close all folds

# Marker folding
zf10j                   # Fold 10 lines
zf'a                    # Fold to mark 'a'
```

## Shell Integration

```bash
# Execute shell command
:!command
:!ls -l
:!date

# Insert shell command output
:r !command
:r !date
:r !ls -la

# Filter text through command
!}sort         # Sort current paragraph
!Gsort         # Sort from cursor to end of file
:'a,'b!sort    # Sort between marks

# Run command with file content
:w !command    # Pipe file content to command

# Toggle between vi and shell
Ctrl+z         # Suspend vi
fg             # Return to vi

# Edit command output
vi <(command)
```

## Automation and Scripting

```bash
# Execute commands from file
vi -s script.vi file.txt

# Execute command on startup
vi -c 'command' file.txt
vi -c '%s/old/new/g' -c 'wq' file.txt

# Non-interactive editing
ex file.txt <<EOF
:%s/old/new/g
:wq
EOF

# Batch processing
find . -name "*.txt" -exec vi -c '%s/old/new/g' -c 'wq' {} \;
```

## Troubleshooting

### Common Issues

#### Terminal Issues
```bash
# Fix corrupted terminal display
reset

# Clear screen in vi
Ctrl+l

# Fix arrow key issues
:set nocompatible
:set term=xterm

# Fix backspace issues
:set backspace=2
```

#### Large Files
```bash
# Open large file efficiently
vi -c 'set nowrap' largefile.log

# Jump to specific pattern
vi +/error logfile.txt

# Disable features for large files
vi -c 'set noswapfile' -c 'set nobackup' -c 'set nowritebackup' largefile
```

#### Encoding Issues
```bash
# Set file encoding
:set encoding=utf-8
:set fileencoding=utf-8

# Convert encoding
:e ++enc=latin1
:w ++enc=utf-8
```

#### Performance Issues
```bash
# Disable features for better performance
:set syntax=off
:set noswapfile
:set nobackup
:set updatecount=0
```

### Recovery Operations

```bash
# Recover from crash
vi -r filename

# List swap files
vi -r

# Remove swap file
rm .filename.swp

# Check for locks
lsof .filename.swp
```

## Related Commands

- [`vim`](/docs/commands/editors/vim) - Vi IMproved (enhanced vi)
- [`view`](/docs/commands/editors/vim) - Read-only mode of vim
- [`nano`](/docs/commands/editors/nano) - Simple text editor
- [`emacs`](/docs/commands/editors/emacs) - Advanced text editor
- [`ed`](/docs/commands/editors/ed) - Line-oriented text editor
- [`ex`](/docs/commands/editors/ex) - Line editor mode
- [`sed`](/docs/commands/file-processing/sed) - Stream editor
- [`awk`](/docs/commands/file-processing/awk) - Pattern scanning and processing
- [`grep`](/docs/commands/file-processing/grep) - Pattern searching
- [`diff`](/docs/commands/file-comparison/diff) - File comparison

## Best Practices

1. **Save frequently** with `:w` to prevent data loss
2. **Use visual mode** for complex selections and operations
3. **Learn essential commands** before advancing to complex features
4. **Customize `.vimrc`** for your workflow and preferences
5. **Use split windows** for comparing files or referencing documentation
6. **Learn macros** for repetitive tasks to save time
7. **Backup important files** before making bulk edits
8. **Use search and replace** with caution, especially with global substitutions
9. **Master movement commands** to improve navigation efficiency
10. **Use bookmarks** for navigating large files quickly
11. **Learn to recover files** from swap files after crashes
12. **Use appropriate modes** (command vs insert) to avoid accidental changes

## Performance Tips

1. **Disable unnecessary features** for large files (`:set syntax=off`, `:set nowrap`)
2. **Use `/` and `?`** for navigation instead of manual scrolling
3. **Learn macros** for repetitive text transformations
4. **Use visual block mode** for column-based editing
5. **Optimize search** with `set incsearch` and `set hlsearch`
6. **Use marks** for navigating large files efficiently
7. **Disable swap files** for temporary editing (`:set noswapfile`)
8. **Use `:nohls`** to clear search highlighting after completion
9. **Learn `.`** (repeat command) for repetitive operations
10. **Use registers** for storing and reusing text patterns

## Vi vs Vim

While `vi` is the original editor, `vim` (Vi IMproved) offers significant enhancements:

**Vi Advantages:**
- Universally available on all Unix systems
- Smaller memory footprint
- Faster startup time
- Standardized behavior across systems

**Vim Advantages:**
- Enhanced syntax highlighting
- Unlimited undo/redo
- Better split window support
- Extensive plugin ecosystem
- Advanced folding capabilities
- Mouse support in terminals
- Visual mode enhancements
- Better regex support

**When to use vi:**
- System recovery situations
- Minimal installations
- SSH connections to very old systems
- When you need guaranteed consistency

**When to use vim:**
- Daily development work
- Complex editing tasks
- When you need advanced features
- Plugin-based customization

The `vi` editor remains an essential tool for system administrators and developers due to its universal availability, efficiency for text manipulation, and powerful editing capabilities. Mastering vi provides a foundation for text editing across virtually all Unix-like systems and ensures you can edit files even in the most challenging environments. While vim offers many enhancements, the core vi skills are transferable and valuable in any Unix/Linux environment.