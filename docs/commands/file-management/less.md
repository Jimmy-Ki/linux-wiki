---
title: less - Advanced File Pager and Viewer
sidebar_label: less
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# less - Advanced File Pager and Viewer

The `less` command is a sophisticated terminal pager that allows users to view file contents and command output in a scrollable, searchable interface. Unlike the simpler `more` command, `less` provides both forward and backward navigation, advanced search capabilities, and numerous customization options. It is the preferred pager for Linux systems, widely used for viewing log files, source code, documentation, and command output. Less is memory-efficient and can handle files larger than available RAM by loading only the necessary portions into memory.

## Basic Syntax

```bash
less [OPTIONS] [FILE]...
less [OPTIONS] +COMMAND [FILE]
```

## Display Options

### Basic Display
- `-N, --line-numbers` - Display line numbers in the left margin
- `-S, --chop-long-lines` - Chop long lines instead of wrapping them
- `-w, --hilite-unread` - Highlight first unread line after moving
- `-W, --HILITE-UNREAD` - Highlight all unread lines
- `-R, --RAW-CONTROL-CHARS` - Display control characters and ANSI color sequences
- `-r, --raw-control-chars` - Similar to -R but more aggressive

### Prompt and Status
- `-M, --LONG-PROMPT` - Show verbose prompt with file information
- `-m, --MEDIUM-PROMPT` - Show medium prompt with percentage
- `--prompt=PROMPT` - Set custom prompt string
- `-P, --pattern=PATTERN` - Set initial search pattern

### Behavior Control
- `-F, --quit-if-one-screen` - Quit automatically if content fits on one screen
- `-f, --force` - Force opening of special files (directories, binaries)
- `-g, --hilite-search` - Highlight only first occurrence of search matches
- `-G, --HILITE-SEARCH` - Highlight all occurrences of search matches
- `-i, --ignore-case` - Ignore case in searches (smart case)
- `-I, --IGNORE-CASE` - Ignore case completely in searches

### Screen and Exit
- `-X, --no-init` - Don't clear screen on exit
- `-x, --tabs=N` - Set tab stops every N characters
- `-y, --max-forw-scroll=N` - Limit forward scroll to N lines

## Movement Commands

### Navigation
```bash
h / H         # Show help screen
q / Q / :q    # Quit less
Space / f     # Forward one screen
b             # Backward one screen
d             # Forward half screen
u             # Backward half screen
j / Enter     # Forward one line
k             # Backward one line
Down / Up     # Forward/Backward one line
Left / Right  # Scroll horizontally
G             # Go to end of file
g             # Go to beginning of file
10G           # Go to line 10
50%           # Go to 50% through file
p             # Go to beginning of file
```

### Scrolling
```bash
F             # Forward forever (like tail -f)
Ctrl-F        # Forward one screen
Ctrl-B        # Backward one screen
Ctrl-D        # Forward half screen
Ctrl-U        # Backward half screen
Ctrl-L        # Repaint screen
Ctrl-R        # Repaint screen, discarding buffered input
```

### Jumping
```bash
/pattern      # Search forward for pattern
?pattern      # Search backward for pattern
n             # Repeat last search (forward)
N             # Repeat last search (backward)
&pattern      # Display only lines matching pattern
```

## Search Commands

### Basic Searching
```bash
/pattern      # Search forward for pattern
?pattern      # Search backward for pattern
n             # Repeat last search in same direction
N             # Repeat last search in opposite direction
ESC-n         # Repeat last search across multiple files
ESC-N         # Repeat last search backward across files
```

### Search Modifiers
```bash
^pattern      # Match at beginning of line
pattern$      # Match at end of line
\<pattern\>   # Match whole word only
/pattern\c    # Case-insensitive search
/pattern\C    # Case-sensitive search
```

### Pattern Examples
```bash
/error/       # Search for "error"
/ERROR/i      # Case-insensitive search for "error"
/^# /         # Search for comment lines
/\d{4}-\d{2}/ # Search for date patterns
/(error|warning)/ # Search for multiple patterns
```

## File Operations

### Multiple Files
```bash
:n            # Next file
:p            # Previous file
:x            # First file
:d            # Remove current file from file list
```

### File Information
```bash
=             # Show file information (name, size, lines, percentage)
Ctrl-G        # Same as =
:f            # Show current file name
:F            # Show current file name and position
```

### Switching Files
```bash
:e filename   # Edit/view another file
:Ex           # Examine files in directory
```

## Marking and Navigation

### Setting and Using Marks
```bash
mx            # Mark current position as 'x' (where x is any letter)
'x            # Go to mark 'x'
''            # Go to previous position
```

### Position History
```bash
Ctrl-^        # Jump to last viewed file
''            # Jump to previous position
' '           # Jump to where last search started
```

## Interactive Features

### Display Control
```bash
-N            # Toggle line numbers
-S            # Toggle line chop/wrap
-R            # Toggle raw control characters
-M            # Toggle verbose prompt
-I            # Toggle case sensitivity
```

### Shell Commands
```bash
!command      # Execute shell command
|command      # Pipe current file to command
v             # Edit current file in $EDITOR
#command      # Execute command with file as argument
```

### Editing and Modification
```bash
s file.txt    # Save current file to file.txt
E             # Re-examine file (reload from disk)
```

## Usage Examples

### Basic File Viewing
```bash
# View a single file
less filename.txt

# View multiple files
less file1.txt file2.txt file3.txt

# View with line numbers
less -N config.txt

# Auto-quit if file fits on screen
less -F short_file.txt

# View with chop long lines
less -S wide_log.txt

# View with verbose prompt
less -M large_file.txt

# Don't clear screen on exit
less -X file.txt
```

### Search and Navigation
```bash
# Open file and search immediately
less +/error logfile.txt

# Open at specific line
less +100 config.txt

# Open at end of file
less +G log.txt

# Open at percentage
less +50% data.txt

# Case-insensitive search
less -i file.txt

# Highlight all matches
less -G file.txt
```

### Command Output Viewing
```bash
# View command output
ls -la | less

# View command output with options
ps aux | less -N

# View process tree
pstree | less

# View help pages
command --help | less

# View man pages with less
export PAGER=less
man command
```

### Log File Analysis
```bash
# View system log with line numbers
less -N /var/log/syslog

# Monitor growing log file
less +F access.log

# Search for specific error patterns
less +/ERROR application.log

# View only matching lines
less +&ERROR critical.log

# View multiple log files
less /var/log/*.log
```

## Advanced Usage

### Multiple File Workflows
```bash
# Compare multiple files
less file1.txt file2.txt

# Navigate between files
:n            # Next file
:p            # Previous file
:x            # First file

# View file list
=             # Show file information
```

### Search Patterns and Regular Expressions
```bash
# Complex regex search
/^\[ERROR\].*\d{4}-\d{2}-\d{2}/

# Search for email addresses
/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

# Search for IP addresses
/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/

# Search for function definitions in code
/^def\s+\w+\s*\(/

# Search for URLs
/https?:\/\/[^\s]+/
```

### Filtering and Display
```bash
# Display only lines matching pattern
less +&pattern file.txt

# Invert matching (non-matching lines only)
less +&!pattern file.txt

# Search with case sensitivity override
/i pattern    # Case-insensitive
/I pattern    # Case-sensitive
```

### Shell Integration
```bash
# Pipe to external commands
|grep "error"
|sort | uniq
|awk '{print $1}'

# Execute shell commands
!ls -la
!ps aux
!df -h

# Edit current file
v             # Open in $EDITOR
```

## Practical Examples

### System Administration
```bash
# View configuration files with search
less +/ServerName /etc/httpd/conf/httpd.conf

# Monitor system logs
less +F /var/log/messages

# View process information
ps aux | less +S

# Check disk usage by directory
du -h /var | less

# View cron jobs
crontab -l | less -N

# Search for specific processes
ps aux | less +/httpd

# View system resources
free -m | less
```

### Code Review and Development
```bash
# View source code with line numbers
less -N source.py

# Search for function definitions
less +/^def function/ code.py

# Jump to specific line
less +250 main.c

# Compare similar files
less -N file1.c file2.c

# Search TODO/FIXME comments
less +/(TODO|FIXME|XXX) *.c

# View makefile
less -N Makefile

# Examine binary strings
strings binary_file | less
```

### Log File Analysis
```bash
# View Apache access logs with timestamps
less -N +/$(date +%d/%b/%Y:%H:%M) access.log

# Find error messages across multiple logs
less -N +/ERROR /var/log/*.log

# Monitor real-time logs
less +F /var/log/syslog

# Filter specific time range
sed -n '/Jan 15 10:00/,/Jan 15 11:00/p' syslog | less

# View nginx error logs
less +/error /var/log/nginx/error.log
```

### Documentation and Help
```bash
# View README files
less README.md

# View man pages with highlighting
export LESS_TERMCAP_so=$'\E[30;43m'
export LESS_TERMCAP_se=$'\E[0m'
man less

# View configuration documentation
less /usr/share/doc/package/README

# View license files
less LICENSE

# View changelog
less CHANGELOG.md
```

## Environment Variables

### Configuration Variables
```bash
# Default options for less
export LESS='-R -M -X -W'

# Enable syntax highlighting
export LESSOPEN="| /usr/bin/source-highlight -f esc -i %s"
export LESS='-R'

# Editor integration
export LESSEDIT='%E ?lt+%lt. %f'

# History file
export LESSHISTFILE=~/.lesshst

# Character set
export LESSCHARSET=utf-8

# Keyboard handling
export LESSKEY=~/.lesskey
```

### Prompt Customization
```bash
# Custom prompt with file info
export LESS='-P "?f%f .?m(%T %i/%m) .?e(END) ?x- Next\: %x..%t"'

# Simple percentage prompt
export LESS='-P"(%pb\%)"'

# Detailed file information
export LESS='-P"%f ?mLine %lt/%L. ?bByte %b/%B."'
```

### Advanced Configuration
```bash
# ~/.bashrc additions for less customization
export LESS='-R -M -X --shift 5'
export LESSHISTFILE=~/.lesshst
export LESSCHARSET=utf-8
export LESS_TERMCAP_mb=$'\E[01;31m'
export LESS_TERMCAP_md=$'\E[01;31m'
export LESS_TERMCAP_me=$'\E[0m'
export LESS_TERMCAP_se=$'\E[0m'
export LESS_TERMCAP_so=$'\E[01;44;33m'
export LESS_TERMCAP_ue=$'\E[0m'
export LESS_TERMCAP_us=$'\E[01;32m'
```

## Colors and Syntax Highlighting

### Source Highlight Integration
```bash
# Install source-highlight
sudo apt-get install source-highlight

# Set up automatic syntax highlighting
export LESSOPEN="| /usr/share/source-highlight/src-hilite-lesspipe.sh %s"
export LESS=' -R '

# Alternative using pygments (Python syntax highlighter)
export LESSOPEN="| pygmentize -f terminal256 -g %s"
export LESS='-R'
```

### Custom Highlighting
```bash
# Man page highlighting
export LESS_TERMCAP_mb=$'\E[01;31m'    # begin blinking
export LESS_TERMCAP_md=$'\E[01;31m'    # begin bold
export LESS_TERMCAP_me=$'\E[0m'        # end mode
export LESS_TERMCAP_se=$'\E[0m'        # end standout-mode
export LESS_TERMCAP_so=$'\E[01;44;33m' # begin standout-mode
export LESS_TERMCAP_ue=$'\E[0m'        # end underline
export LESS_TERMCAP_us=$'\E[01;32m'    # begin underline
```

## Pipes and Redirection

### Input Handling
```bash
# View command output
ps aux | less

# Multiple commands pipeline
find / -name "*.conf" -print0 | xargs -0 cat | less

# Search then view
grep -n "error" logfile.txt | less -N

# Sorted output
ls -la | sort -k5 -n | less

# Combined output
cat file1.txt file2.txt | less
```

### Output Operations
```bash
# Save viewed content
less file.txt > saved_content.txt

# Save specific lines
less file.txt | grep "pattern" > filtered.txt

# Append to file
less file.txt >> log.txt

# Save with line numbers
less -N file.txt | cat -n > numbered_file.txt
```

### Advanced Pipelining
```bash
# View compressed files without decompression
less compressed_file.gz

# View network data
curl -s http://example.com | less

# View process details in real-time
watch "ps aux | grep httpd" | less

# View database query results
mysql -u user -p database -e "SELECT * FROM table" | less
```

## Performance Tips

### Large File Handling
```bash
# Start at end of file for logs
less +G huge_log.txt

# Start at specific position for very large files
less +1000000 huge_file.txt

# Use -S for files with very long lines
less -S wide_data.csv

# Limit forward scrolling speed
less -y=10 large_file.txt
```

### Memory Optimization
```bash
# less is inherently memory-efficient
# Only loads needed portions into memory
# Can handle files larger than available RAM
# Uses buffering for smooth scrolling
```

### Search Performance
```bash
# Use efficient search patterns
/specific_pattern    # Better than /.*pattern.*

# Limit search scope with marking
ma                  # Mark position
/search_pattern     # Search from mark
'a                  # Return to mark

# Use incremental search (if available)
# Enable with -i or -I options
```

## Integration with Other Tools

### Version Control
```bash
# View git diff
git diff | less

# View git log with decorations
git log --oneline --graph --decorate | less

# View file at specific commit
git show HEAD:file.txt | less

# View git blame output
git blame file.txt | less -S

# View stash changes
git stash show -p | less
```

### System Monitoring
```bash
# View process list interactively
ps aux | less

# View network connections
netstat -an | less

# View disk usage
du -h . | less

# View memory usage
free -m | less

# View system information
uname -a | less
```

### Database Operations
```bash
# View MySQL query results
mysql -u user -p -e "SELECT * FROM table" | less

# View PostgreSQL output
psql -c "SELECT * FROM table" | less

# View SQLite data
sqlite3 database.db "SELECT * FROM table;" | less

# View MongoDB output
mongo --eval "db.collection.find()" | less
```

## Troubleshooting

### Common Issues

#### Display Problems
```bash
# Garbled display with control characters
# Solution: Use -R or -r option
less -R file.txt

# Line wrapping issues
# Solution: Use -S to chop long lines
less -S wide_file.txt

# Color problems
# Solution: Adjust terminal capabilities
export TERM=xterm-256color
```

#### Performance Issues
```bash
# Slow scrolling in very large files
# Solution: Use less memory-intensive options
less --buffers=2 file.txt

# Search is slow
# Solution: Use more specific patterns
/error_log.*2023/  # Better than /error/
```

#### Navigation Problems
```bash
# Can't navigate backward in piped input
# Solution: Use temporary file
command | tee temp.txt && less temp.txt

# Marks don't work in piped input
# Solution: Use file-based approach
```

### File Access Issues
```bash
# Permission denied
# Solution: Use sudo if appropriate
sudo less /var/log/auth.log

# Binary files show garbage
# Solution: Use strings command first
strings binary_file | less
```

## Keybindings and Customization

### Creating Custom Keybindings
```bash
# Create ~/.lesskey file for custom keybindings
# Example ~/.lesskey:
h left            # Left arrow moves left
l right           # Right arrow moves right
k up              # Up arrow moves up
j down            # Down arrow moves down
q quit            # q quits
\ech abort        # Ctrl-C aborts

# Compile keybindings
lesskey
```

### Terminal Integration
```bash
# Make less default pager
export PAGER=less
export MANPAGER=less

# Use less for git diff
export GIT_PAGER=less

# Use less for less -F compatibility
export LESS='FRX'
```

## Related Commands

- [`more`](/docs/commands/file-management/more) - Simpler pager with only forward navigation
- [`cat`](/docs/commands/file-management/cat) - Display entire file without pagination
- [`head`](/docs/commands/file-management/head) - Display beginning of file
- [`tail`](/docs/commands/file-management/tail) - Display end of file
- [`grep`](/docs/commands/file-management/grep) - Search text patterns in files
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text manipulation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`view`](/docs/commands/text-processing/vi) - Vim in read-only mode
- [`most`](/docs/commands/file-management/more) - Alternative pager with mouse support

## Best Practices

### Efficient Usage
1. **Use less for large files** instead of cat to prevent terminal flooding
2. **Learn keyboard shortcuts** for efficient navigation (j/k, f/b, g/G)
3. **Use search patterns** to find relevant content quickly
4. **Utilize marks** (mx) to bookmark important positions for quick return
5. **Customize LESS environment** variable for preferred default behavior

### Search Techniques
1. **Use regular expressions** for complex pattern matching
2. **Combine with grep** for initial filtering when working with very large files
3. **Use case-insensitive search** (-i option) for flexible text searching
4. **Use exact word matching** (\<pattern\>) for precise searches
5. **Leverage search history** (n/N) for quick navigation between matches

### Viewing Strategies
1. **Start with line numbers** (-N) for reference when working with source code
2. **Use -S option** for files with very long lines like CSV files or logs
3. **Use -F option** for files that might fit on one screen to avoid unnecessary pager
4. **Use -X option** to keep content visible when exiting for reference
5. **Use marks and position history** when working with multiple files or sections

### Performance Optimization
1. **Use specific search patterns** rather than broad regexes for faster searches
2. **Start large log files at the end** (+G) when monitoring current activity
3. **Use -S for files with very long lines** to improve rendering performance
4. **Limit forward scroll** (-y option) when working with very wide files
5. **Use appropriate terminal settings** (TERM variable) for optimal display

## Tips and Tricks

### Quick Navigation Patterns
```bash
# Jump to specific patterns immediately
less +/function main.py    # Jump to first function
less +/^#.*TODO todos.txt  # Jump to first TODO comment
less +/\d{4}-\d{2}-\d{2} log.txt  # Jump to first date
```

### Multi-file Workflows
```bash
# Compare files using less
diff file1.txt file2.txt | less

# View files with similar names
less file.{txt,bak,old}

# Search across multiple files
less */*.log
/search_pattern    # Search across all files
:n                 # Next file with match
```

### Automation and Scripting
```bash
# Function to view files with preferred settings
function l() {
    less -N -M -X "$@"
}

# Function to search logs efficiently
function logsearch() {
    find /var/log -name "*.log" -exec less +/"$1" {} +
}

# Alias for common patterns
alias lg='less +G'  # View files starting at end
alias ln='less -N'  # View with line numbers
```

The `less` command is an exceptionally powerful and versatile pager that forms the foundation of text viewing in Linux systems. Its combination of efficient memory usage, advanced search capabilities, and extensive customization options makes it the preferred choice for viewing everything from short configuration files to massive log files. Mastering less's navigation commands, search patterns, and integration with other tools will significantly enhance productivity when working with text-based content in the Linux environment.