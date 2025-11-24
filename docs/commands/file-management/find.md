---
title: find - Search for Files and Directories
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# find - Search for Files and Directories

The `find` command searches for files and directories in a directory hierarchy based on criteria such as name, size, type, permissions, and modification time. It's one of the most powerful and flexible tools for file system navigation and management.

## Basic Syntax

```bash
find [PATH] [EXPRESSION] [ACTION]
```

## Common Options

### Search Paths
- `PATH` - Starting directory (default: current directory)
- `-maxdepth LEVELS` - Descend at most LEVELS levels
- `-mindepth LEVELS` - Don't apply tests at levels less than LEVELS

### File Tests
- `-name PATTERN` - File name matches PATTERN (case-sensitive)
- `-iname PATTERN` - Like -name but case-insensitive
- `-type TYPE` - File type (f=file, d=directory, l=link, etc.)
- `-size N` - File size (Nc=bytes, Nk=KB, Nm=MB)
- `-empty` - File is empty
- `-executable` - File is executable

### Time Tests
- `-mtime N` - Modified N*24 hours ago
- `-atime N` - Accessed N*24 hours ago
- `-ctime N` - Status changed N*24 hours ago
- `-mmin N` - Modified N minutes ago
- `-amin N` - Accessed N minutes ago
- `-cmin N` - Status changed N minutes ago

### Permission Tests
- `-perm MODE` - File permissions match MODE
- `-user NAME` - File owned by user NAME
- `-group NAME` - File owned by group NAME

### Actions
- `-print` - Print file name (default action)
- `-ls` - List file in ls -dils format
- `-delete` - Delete files found
- `-exec COMMAND {} \;` - Execute COMMAND on each file
- `-exec COMMAND {} +` - Execute COMMAND on multiple files

## Usage Examples

### Basic File Searching
```bash
# Find files by name
find . -name "myfile.txt"
find /home -name "*.conf"

# Case-insensitive search
find . -iname "README"

# Find in specific directory
find /var/log -name "*.log"
```

### File Type Searches
```bash
# Find only files
find . -type f

# Find only directories
find . -type d

# Find symbolic links
find . -type l

# Find executable files
find . -type f -executable
```

### Size-Based Searches
```bash
# Find files larger than 100MB
find . -type f -size +100M

# Find empty files
find . -type f -empty

# Find files between 1MB and 10MB
find . -type f -size +1M -size -10M

# Find files exactly 1KB
find . -type f -size 1k
```

### Time-Based Searches
```bash
# Find files modified in last 7 days
find . -mtime -7

# Find files modified more than 30 days ago
find . -mtime +30

# Find files accessed in last hour
find . -amin -60

# Find files modified between 5 and 10 days ago
find . -mtime +5 -mtime -10
```

## Advanced Searches

### Combining Criteria
```bash
# Find Python files modified recently
find . -name "*.py" -mtime -7

# Find large executable files
find . -type f -executable -size +1M

# Find files owned by specific user
find /home -user john -type f

# Find files with specific permissions
find . -perm 755 -type f
```

### Using Operators
```bash
# AND operator (default)
find . -name "*.txt" -size +1M

# OR operator
find . -name "*.txt" -o -name "*.pdf"

# NOT operator
find . ! -name "*.tmp"

# Grouping expressions
find . \( -name "*.py" -o -name "*.sh" \) -mtime -7
```

### Depth Control
```bash
# Search only current directory
find . -maxdepth 1 -name "*.txt"

# Search at least 2 levels deep
find . -mindepth 2 -name "*.log"

# Search exactly 3 levels deep
find . -mindepth 3 -maxdepth 3 -type f
```

## Actions and Operations

### Print Actions
```bash
# Print with full path
find . -name "*.conf" -print

# Print relative paths
find . -name "*.txt" -printf "%f\n"

# Print with file size
find . -name "*.log" -printf "%s %p\n"
```

### Execute Commands
```bash
# List files found
find . -name "*.log" -ls

# Count lines in each file
find . -name "*.txt" -exec wc -l {} \;

# Copy files to backup directory
find . -name "*.backup" -exec cp {} /backup/ \;

# Run command on multiple files at once (more efficient)
find . -name "*.tmp" -exec rm {} +

# Execute with confirmation
find . -name "*.old" -ok rm {} \;
```

### File Operations
```bash
# Delete old log files
find /var/log -name "*.log" -mtime +30 -delete

# Change file permissions
find . -type f -name "*.sh" -exec chmod +x {} \;

# Compress old files
find . -name "*.log" -mtime +7 -exec gzip {} \;

# Rename files
find . -name "*.old" -exec mv {} {}.backup \;
```

## Practical Examples

### System Administration
```bash
# Find large files in /var
find /var -type f -size +100M -exec ls -lh {} \;

# Find configuration files
find /etc -name "*.conf" -o -name "*.cfg"

# Find log files rotated recently
find /var/log -name "*.1" -mtime -1

# Find world-writable files
find / -type f -perm -002 2>/dev/null
```

### Development
```bash
# Find source code files
find . -name "*.py" -o -name "*.java" -o -name "*.c"

# Find test files
find . -name "*test*" -type f

# Find build artifacts
find . -name "*.class" -o -name "*.o" -o -name "build"

# Find dependency files
find . -name "package.json" -o -name "requirements.txt"
```

### Cleanup Operations
```bash
# Find temporary files
find /tmp -name "tmp*" -mtime +1

# Find duplicate files (basic approach)
find . -name "*.mp3" -exec md5sum {} \; | sort

# Find empty directories
find . -type d -empty

# Find broken symbolic links
find . -type l -exec test ! -e {} \; -print
```

## Performance Optimization

### Efficient Searching
```bash
# Limit search depth
find . -maxdepth 3 -name "*.log"

# Use xargs for large file sets
find . -name "*.jpg" -print0 | xargs -0 rm

# Exclude directories
find . -path "./node_modules" -prune -o -name "*.js" -print

# Use specific file system
find / -xdev -name "core"  # Stay on one filesystem
```

### Index-Based Searching
```bash
# Use locate for faster searching (requires updatedb)
locate filename

# Update file database
sudo updatedb
```

## Regular Expressions

### Pattern Matching
```bash
# Find files with regex
find . -regex ".*\.log\.[0-9]+$"

# Find files matching complex pattern
find . -regextype posix-extended -regex ".*\.(jpg|png|gif)$"

# Find files in specific directory structure
find . -path "*/src/*/*.c"
```

## Combining with Other Tools

### Pipes and Redirection
```bash
# Count files found
find . -name "*.txt" | wc -l

# Sort results by size
find . -name "*.log" -printf "%s\t%p\n" | sort -n

# Search within files found
find . -name "*.py" -exec grep -l "TODO" {} \;
```

### Complex Workflows
```bash
# Find and archive old files
find /var/log -name "*.log" -mtime +30 -exec tar -rvf archive.tar {} \;

# Find and backup specific files
find /home -name "*.doc" -exec cp -t /backup/ {} +

# Generate file inventory
find . -type f -printf "%TY-%Tm-%Td\t%s\t%p\n" > file_inventory.txt
```

## Common Use Cases

### Security Audits
```bash
# Find SUID files
find / -perm -4000 -type f 2>/dev/null

# Find world-writable files
find / -perm -002 -type f 2>/dev/null

# Find files with no owner
find / -nouser -o -nogroup 2>/dev/null
```

### Disk Usage Analysis
```bash
# Find largest files
find . -type f -printf "%s\t%p\n" | sort -n | tail -10

# Find directories taking most space
find . -type d -exec du -sh {} \; | sort -hr
```

### File Maintenance
```bash
# Find duplicate files by size
find . -type f -printf "%s\n" | sort | uniq -d

# Find recently modified configuration files
find /etc -name "*.conf" -mtime -7 -ls
```

## Related Commands

- [`locate`](/docs/commands/file-management/locate) - Find files by name using database
- [`grep`](/docs/commands/text-processing/grep) - Search text within files
- [`xargs`](/docs/commands/shell/xargs) - Build and execute command lines
- [`which`](/docs/commands/system-info/which) - Locate command executable
- [`whereis`](/docs/commands/system-info/whereis) - Find command locations

## Best Practices

1. **Be specific with paths** to avoid searching entire filesystem
2. **Use -maxdepth** to limit search scope
3. **Combine criteria** for precise results
4. **Use -print0 and xargs -0** for filenames with spaces
5. **Test with -ls** before using -delete or -exec

## Troubleshooting

### Permission Issues
```bash
# Run with sudo for system-wide searches
sudo find / -name "important_file"

# Exclude permission denied errors
find / 2>/dev/null -name "config"
```

### Performance Issues
```bash
# Limit search to specific filesystem
find / -xdev -name "large_file"

# Use locate for frequent searches
locate filename

# Exclude large directories
find . -path "./node_modules" -prune -o -name "*.js" -print
```

The `find` command is incredibly powerful for file system navigation and management. Mastering its various options and combinations will significantly enhance your ability to work with files efficiently in Linux.