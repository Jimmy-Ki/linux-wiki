---
title: more - Display File Content Page by Page
sidebar_label: more
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# more - Display File Content Page by Page

The `more` command is a fundamental Unix pager utility that displays file contents one screen at a time, allowing users to scroll through large files in a controlled manner. It's one of the original pager utilities, predating the more advanced `less` command, and remains available on virtually all Unix-like systems. More provides essential functionality for viewing lengthy files, log files, documentation, and command output without overwhelming the terminal display. While simpler than modern alternatives, its predictable behavior and minimal resource requirements make it valuable for basic file viewing tasks and educational purposes.

## Basic Syntax

```bash
more [OPTIONS] [FILE]...
more [-dflpcsu] [+LINE_NUM] [+/PATTERN] [FILE...]
```

## Command Options

### Display Control Options

| Option | Description |
|--------|-------------|
| `-d` | Display helpful prompts and user instructions at bottom of screen |
| `-l` | Suppress form-feed character (^L) after each page of output |
| `-f` | Count logical lines rather than screen lines (useful for long lines) |
| `-p` | Do not scroll; clear entire screen and display text |
| `-c` | Do not scroll; clear screen before displaying each page |
| `-s` | Squeeze multiple blank lines into a single blank line |
| `-u` | Suppress underlining; treat backspace and carriage return as normal characters |

### Position Control Options

| Option | Description |
|--------|-------------|
| `+NUM` | Start displaying at line number NUM (1-based) |
| `+/PATTERN` | Start displaying at line containing search PATTERN |

### File Options

| Option | Description |
|--------|-------------|
| `--help` | Display help information and exit |
| `--version` | Output version information and exit |

## Interactive Navigation Commands

### Movement and Navigation

| Command | Description |
|---------|-------------|
| `SPACE` or `f` | Forward one screen |
| `RETURN` or `j` | Forward one line |
| `d` or `Ctrl-D` | Forward half screen |
| `q` or `Q` | Quit more immediately |
| `b` or `Ctrl-B` | Backward one screen (may not be available in all versions) |
| `=` | Display current line number |
| `Ctrl-L` | Redraw/refresh the screen |
| `.` | Repeat previous command |
| `'` | Go to previous marked line (after searching) |

### Search Commands

| Command | Description |
|---------|-------------|
| `/pattern` | Search forward for pattern (regular expression) |
| `n` | Find next occurrence of search pattern |
| `!command` | Execute shell command |
| `v` | Start editing current file with $EDITOR |

### File Management (Multiple Files)

| Command | Description |
|---------|-------------|
| `:n` | Next file (when viewing multiple files) |
| `:p` | Previous file |
| `:f` | Show current filename and line information |
| `.` | Repeat previous command |

## Usage Examples

### Basic File Viewing

#### Simple File Display
```bash
# View a file page by page
more document.txt

# View multiple files sequentially
more file1.txt file2.txt file3.txt

# View file with helpful instructions
more -d readme.txt

# View file without line wrapping
more -f wide_log_file.txt
```

#### Starting Position Control
```bash
# Start at specific line number
more +100 application.log

# Start at pattern match
more +/"ERROR" system.log

# Start at function definition in source code
more +/"def main" script.py

# Start at line 500 and display instructions
more -d +500 large_file.txt
```

### Display Formatting

#### Clean Display Options
```bash
# Squeeze multiple blank lines
more -s formatted_document.txt

# Clear screen between pages
more -c presentation.txt

# Don't scroll, repaint entire screen
more -p clean_display.txt

# Suppress form-feed characters
more -l document_with_page_breaks.txt

# Suppress underlining
more -u old_terminal_output.txt
```

#### Combined Display Options
```bash
# Multiple options for clean viewing
more -s -c -d formatted_log.txt

# Clean display with line counting
more -f -s wide_document.txt

# Instructions with line suppression
more -d -l manual_page.txt
```

### Command Output Integration

#### Pipe Operations
```bash
# View command output page by page
ps aux | more

# Long directory listings
ls -la | more

# Find command results
find /var/log -name "*.log" | more

# Process tree view
pstree -p | more

# System information
dmesg | more
```

#### Complex Pipeline Operations
```bash
# Filter and page output
grep "ERROR" application.log | more

# Sort and page user list
sort /etc/passwd | more

# Network connections
netstat -ant | more

# Disk usage analysis
du -sh /* | more

# Package list
dpkg -l | more
```

### File Analysis and Searching

#### Pattern Searching
```bash
# Start at error messages
more +/"CRITICAL" system.log

# Search through code files
more +/"TODO" project.c

# Find configuration sections
more +/"[database]" config.ini

# Start at specific date in logs
more +/"2025-01-01" access.log
```

#### Log File Analysis
```bash
# View recent log entries (start from line 10000)
more +10000 /var/log/syslog

# Find specific error patterns
more +/"Connection refused" application.log

# Start at authentication failures
more +/"authentication failed" security.log

# View system boot messages
more +/"Linux version" dmesg_output.txt
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# View system configuration safely
more /etc/passwd
more /etc/group
more /etc/shadow

# Application configuration review
more /etc/ssh/sshd_config
more /etc/apache2/apache2.conf
more /etc/nginx/nginx.conf

# Network configuration
more /etc/network/interfaces
more /etc/hosts
more /etc/resolv.conf

# Service configuration
more /etc/crontab
more /etc/fstab
more /etc/exports
```

#### Log File Analysis
```bash
# System logs (start from recent entries)
tail -n 5000 /var/log/syslog | more

# Authentication logs
more +/"$(date '+%b %d')" /var/log/auth.log

# Application error logs
more +/"FATAL" /var/log/application/error.log

# Web server access logs
more +/"404" /var/log/apache2/access.log

# Database query logs
more +/"SELECT" /var/log/mysql/query.log

# Mail server logs
more +/"from=" /var/log/mail.log
```

### Development Workflow

#### Source Code Review
```bash
# View source files starting at main function
more +/"int main" program.c

# Review Python classes
more +/"class " module.py

# Examine function definitions
more +/"def " script.py

# View configuration files
more requirements.txt
more Dockerfile
more .gitignore
```

#### Documentation Viewing
```bash
# Project documentation
more README.md
more INSTALL
more CHANGELOG

# Manual pages with more
export MANPAGER=more
man command

# Package information
more package.json
more Cargo.toml
more setup.py
```

#### Build and Test Output
```bash
# View build output page by page
make 2>&1 | more

# Test results
pytest 2>&1 | more

# Compiler output with warnings
gcc -Wall program.c 2>&1 | more

# Lint results
eslint . 2>&1 | more
```

### Data Processing

#### Large Dataset Viewing
```bash
# View CSV files with headers
more +/"header" data.csv

# Examine database exports
more database_dump.sql

# View configuration data
more config.json

# Check data file integrity
more +/"ERROR" validation_report.txt
```

#### File Comparison Results
```bash
# View diff output
diff file1.txt file2.txt | more

# Side-by-side comparison
sdiff file1.txt file2.txt | more

# Directory comparison
diff -r dir1/ dir2/ | more

# Binary file analysis
hexdump -C binary_file | more
```

## Advanced Usage

### Scripting and Automation

#### File Processing Scripts
```bash
#!/bin/bash
# Log file viewer with automatic positioning

LOG_FILE="/var/log/application.log"
PATTERN="ERROR"

# Start at today's errors and page through
more +/"$(date '+%Y-%m-%d')" +/"$PATTERN" "$LOG_FILE"
```

```bash
#!/bin/bash
# Configuration file reviewer

CONFIG_DIR="/etc"
for config in "$CONFIG_DIR"/*.conf; do
    echo "=== $config ==="
    more "$config"
    echo "Press Enter for next file..."
    read
done
```

#### Custom Functions
```bash
# Custom function for viewing large files
viewlarge() {
    if [ $# -eq 0 ]; then
        echo "Usage: viewlarge <file>"
        return 1
    fi

    # Start 100 lines from end and display with instructions
    tail -n 500 "$1" | more -d
}

# Function to search logs by date
logsearch() {
    local date="$1"
    local log_file="$2"
    more +/"$date" "$log_file"
}
```

### Integration with Shell Environment

#### Environment Variables
```bash
# Set more as default pager
export PAGER=more

# Default options for more
export MORE='-d -s'

# Set more for manual pages
export MANPAGER=more

# Use more for git diff
export GIT_PAGER=more
```

#### Shell Aliases
```bash
# Convenient aliases for common tasks
alias m='more -d'
alias ml='more -l'
alias ms='more -s'
alias mc='more -c'
alias mf='more -f'

# Log viewing aliases
alias syslog='more +/"$(date +%b\ %d)" /var/log/syslog'
alias authlog='more /var/log/auth.log'

# Configuration aliases
alias hosts='more /etc/hosts'
alias crontab='more /etc/crontab'
```

### Performance Optimization

#### Memory-Efficient Viewing
```bash
# For very large files, use tail to load less
tail -n 10000 huge_file.txt | more

# View only recent lines efficiently
tail -f application.log | more

# Process logs efficiently
grep "ERROR" huge_log.txt | more

# Split large files and view parts
split -l 5000 huge_file.txt part_
more part_aa
```

#### Terminal Optimization
```bash
# Optimize for slow terminals
more -c slow_display_file.txt

# Clean display for remote connections
more -s -d remote_file.txt

# Minimal redraws for network terminals
more -p network_file.txt
```

## Troubleshooting

### Common Issues

#### Display Problems
```bash
# Garbled display - clear and redraw
Ctrl-L

# Terminal corruption - reset terminal
reset

# Incorrect line counting - use logical lines
more -f file_with_long_lines.txt

# Too many blank lines - squeeze them
more -s file_with_extra_spaces.txt
```

#### Navigation Issues
```bash
# Can't go backward - use less instead
less filename.txt

# Search not working - check pattern syntax
more +/"simple_pattern" file.txt

# File not found - verify path
ls -la /path/to/file
more /path/to/file
```

#### Performance Issues
```bash
# Slow with very large files - use head/tail first
head -n 1000 huge_file.txt | more

# Terminal scrolling problems - disable scrolling
more -c problematic_file.txt

# Memory issues with large files - process in chunks
split -l 10000 huge_file.txt chunk_
more chunk_aa
```

### Version Compatibility

#### Different System Implementations
```bash
# Check which version of more
man more

# Test available options
more --help 2>&1 | head

# Check for specific feature support
echo "test" | more -d
echo "test" | more -c
```

#### Alternative Pagers
```bash
# If more is limited, use these alternatives:
less filename.txt          # More features
pg filename.txt             # POSIX pager
view filename.txt           # Vim in read-only mode
```

## Related Commands

- [`less`](/docs/commands/file-management/less) - Advanced pager with bidirectional navigation
- [`cat`](/docs/commands/file-management/cat) - Display entire file content
- [`head`](/docs/commands/file-management/head) - Display beginning of files
- [`tail`](/docs/commands/file-management/tail) - Display end of files
- [`pg`](/docs/commands/file-management/pg) - POSIX-compliant pager
- [`view`](/docs/commands/file-management/view) - Read-only file viewer (vim mode)
- [`nl`](/docs/commands/file-management/nl) - Number lines in files
- [`pr`](/docs/commands/file-management/pr) - Format files for printing

## Best Practices

1. **Choose the right pager** - Use `more` for simple viewing, `less` for complex navigation
2. **Start at relevant content** - Use `+NUM` or `+/PATTERN` to jump to important sections
3. **Clean up display** - Use `-s` to squeeze blank lines, `-c` for clean screen redraws
4. **Handle long lines** - Use `-f` to count logical lines instead of screen lines
5. **Use instructions** - Enable `-d` for new users or infrequent use
6. **Pipeline integration** - Combine with other commands for powerful filtering
7. **Memory efficiency** - For huge files, consider `tail` first or file splitting
8. **Script compatibility** - More is universally available, good for portable scripts

## Performance Tips

1. **Minimal resource usage** - More uses less memory than complex pagers
2. **Fast startup** - Minimal initialization time for quick file viewing
3. **Predictable behavior** - Consistent across all Unix-like systems
4. **Network-friendly** - Works well over slow connections with `-c` option
5. **Terminal compatibility** - Works with basic terminals and serial connections
6. **Script reliability** - Universal availability makes it ideal for portable scripts

## Usage Scenarios

### When to Use `more`

**Simple File Viewing**
- Quick file inspection without complex navigation needs
- Reading documentation or README files
- Viewing configuration files
- Educational purposes and learning Unix basics

**Limited Resource Environments**
- Minimal system memory available
- Basic terminal without advanced features
- Network connections with limited bandwidth
- Embedded systems or rescue environments

**Scripting and Automation**
- Portable scripts that must run on any Unix system
- Simple file display in shell scripts
- Educational examples and demonstrations
- Consistent behavior across platforms

**Legacy Systems**
- Older Unix systems without modern pagers
- Compatibility with established workflows
- Traditional Unix administration practices
- Minimalist system configurations

### When to Choose Alternatives

**Use `less` when:**
- Bidirectional navigation is needed
- Complex search patterns are required
- Multiple file viewing is necessary
- Advanced features like line editing are desired
- Syntax highlighting or other enhancements are needed

**Use `cat` when:**
- Entire file content fits on one screen
- File concatenation is needed
- Simple file display without paging
- Pipe operations without interaction

**Use `head`/`tail` when:**
- Only beginning or end of file is needed
- Real-time log monitoring is required
- File preview is sufficient
- Specific line ranges are needed

The `more` command represents the fundamental concept of paged text display in Unix systems. While modern alternatives offer advanced features, `more` remains valuable for its simplicity, universal availability, and predictable behavior. It serves as an excellent tool for basic file viewing tasks and provides a foundation for understanding more advanced pager utilities.