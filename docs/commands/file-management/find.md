---
title: find - Search for Files and Directories
sidebar_label: find
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# find - Search for Files and Directories

The `find` command is one of the most powerful and versatile utilities in Linux/Unix systems for searching files and directories based on a wide range of criteria. It traverses directory hierarchies recursively, applying tests and actions to matched files. Beyond simple filename searching, `find` can perform complex pattern matching, execute commands on found files, process file metadata, and handle advanced file system operations, making it an indispensable tool for system administration, file management, and automated processing workflows.

## Basic Syntax

```bash
find [PATH...] [EXPRESSION]
find [OPTIONS] [PATH...] [TESTS] [ACTIONS]
```

## Complete Options Reference

### Path and Directory Options
- `PATH` - Starting directory path(s) for search (default: current directory)
- `-maxdepth LEVELS` - Descend at most LEVELS levels of directories
- `-mindepth LEVELS` - Don't apply tests at levels less than LEVELS
- `-depth` - Process directory contents before the directory itself
- `-daystart` - Measure times from beginning of day
- `-follow` - Follow symbolic links (can cause infinite loops)
- `-L` - Same as -follow
- `-H` - Follow symbolic links on command lines only
- `-P` - Never follow symbolic links (default)
- `-xdev` - Don't descend directories on other filesystems
- `-mount` - Same as -xdev

### File Type Tests
- `-type c` - File type is c
  - `b` - Block special file
  - `c` - Character special file
  - `d` - Directory
  - `f` - Regular file
  - `l` - Symbolic link
  - `p` - Named pipe (FIFO)
  - `s` - Socket
  - `D` - Door (Solaris)

### Name Pattern Tests
- `-name pattern` - Base name matches shell pattern (case-sensitive)
- `-iname pattern` - Case-insensitive name matching
- `-path pattern` - Full path matches shell pattern
- `-ipath pattern` - Case-insensitive path matching
- `-regex pattern` - Full path matches regular expression
- `-iregex pattern` - Case-insensitive regex matching
- `-lname pattern` - Symbolic link target matches pattern
- `-ilname pattern` - Case-insensitive link target matching

### Size and Space Tests
- `-size n[cwbkMGTP]` - File uses n units of space
  - `c` - bytes
  - `w` - 2-byte words
  - `b` - 512-byte blocks (default)
  - `k` - Kilobytes (1024 bytes)
  - `M` - Megabytes (1024K)
  - `G` - Gigabytes (1024M)
  - `T` - Terabytes (1024G)
  - `P` - Petabytes (1024T)
- `-empty` - File is empty and is a regular file or directory
- `-ls` - List current file in ls -dils format

### Time-Based Tests
- `-mtime n` - File data was last modified n*24 hours ago
- `-atime n` - File was last accessed n*24 hours ago
- `-ctime n` - File status was last changed n*24 hours ago
- `-mmin n` - File data was last modified n minutes ago
- `-amin n` - File was last accessed n minutes ago
- `-cmin n` - File status was last changed n minutes ago
- `-newer file` - File was modified more recently than file
- `-anewer file` - File was accessed more recently than file
- `-cnewer file` - File's status was changed more recently than file
- `-newerXY reference` - Compare timestamps
  - `X` = a (access), c (change), m (modify), t (creation)
  - `Y` = a, c, m, t
  - Example: `-newermt "2023-01-01"` - Files modified after 2023-01-01

### Permission and Ownership Tests
- `-perm mode` - File's permission bits are exactly mode
- `-perm -mode` - All of the permission bits mode are set
- `-perm /mode` - Any of the permission bits mode are set
- `-user name` - File is owned by user name (numeric user ID allowed)
- `-group name` - File belongs to group name (numeric group ID allowed)
- `-nouser` - No user corresponds to file's numeric user ID
- `-nogroup` - No group corresponds to file's numeric group ID

### Content and Attribute Tests
- `-inum n` - File has inode number n
- `-samefile name` - File refers to the same inode as name
- `-links n` - File has n links
- `-readable` - File is readable by current user
- `-writable` - File is writable by current user
- `-executable` - File is executable by current user

### Logical Operators
- `expr1 -a expr2` - AND (both expressions true)
- `expr1 -and expr2` - Same as -a
- `expr1 -o expr2` - OR (either expression true)
- `expr1 -or expr2` - Same as -o
- `! expr` - NOT (expression is false)
- `-not expr` - Same as !
- `expr1 , expr2` - List evaluation (always true)

### Actions
- `-exec command {} +` - Execute command, {} replaced with filename
- `-exec command {} \;` - Execute command on each file separately
- `-ok command {} \;` - Like -exec but prompt user first
- `-execdir command {} \;` - Like -exec but run from file's directory
- `-print` - Print full file name (default action)
- `-print0` - Print full file name followed by null character
- `-fprint file` - Print full file name to file
- `-fprint0 file` - Like -fprint but followed by null character
- `-fprintf file format` - Print format to file
- `-ls` - List file in ls -dils format
- `-fls file` - Like -ls but write to file
- `-prune` - Don't descend into directory
- `-quit` - Exit immediately
- `-delete` - Delete files (always returns true)
- `-true` - Always true
- `-false` - Always false

## Usage Examples

### Basic File Searching

#### Simple Name Searches
```bash
# Find files by exact name
find . -name "config.txt"

# Find files by pattern (case-sensitive)
find /home -name "*.log"

# Case-insensitive name search
find . -iname "README"

# Find in multiple directories
find /var/log /tmp -name "*.tmp"

# Search current directory only
find . -maxdepth 1 -name "*.sh"

# Exclude hidden files
find . -name ".*" -prune -o -name "*.txt" -print
```

#### Complex Pattern Matching
```bash
# Multiple name patterns
find . -name "*.py" -o -name "*.js" -o -name "*.html"

# Find files starting with specific prefix
find . -name "test_*"

# Find files with specific suffix
find . -name "*_backup"

# Find files with multiple conditions
find . -name "*.conf" -a -name "*config*"

# Case-insensitive regex search
find . -iregex ".*\.(jpg|jpeg|png|gif)$"
```

### File Type and Size Searching

#### File Type Filtering
```bash
# Find directories only
find . -type d

# Find regular files only
find . -type f

# Find symbolic links
find . -type l

# Find executable files
find . -type f -executable

# Find block devices
find /dev -type b

# Find character devices
find /dev -type c

# Multiple file types
find . -type f -o -type l
```

#### Size-Based Searches
```bash
# Find files larger than 100MB
find . -type f -size +100M

# Find files smaller than 1KB
find . -type f -size -1k

# Find files exactly 1MB in size
find . -type f -size 1M

# Find empty files
find . -type f -empty

# Find large log files
find /var/log -type f -size +50M -name "*.log"

# Find files in specific size ranges
find . -type f -size +10M -size -100M
```

### Time-Based Searching

#### Modification Time Searches
```bash
# Files modified in last 24 hours
find . -mtime -1

# Files modified more than 7 days ago
find . -mtime +7

# Files modified exactly 3 days ago
find . -mtime 3

# Files modified between 2 and 5 days ago
find . -mtime +2 -mtime -5

# Files modified today
find . -mtime 0
```

#### Access Time Searches
```bash
# Files accessed in last hour
find . -amin -60

# Files not accessed in 30 days
find . -atime +30

# Recently accessed PDFs
find . -name "*.pdf" -atime -7

# Find unused files (not accessed recently)
find /shared -type f -atime +90
```

#### Status Change Searches
```bash
# Files with changed permissions recently
find . -ctime -1

# Files changed in last 10 minutes
find . -cmin -10

# Find recently created files
find . -newer reference_file.txt

# Files modified after specific date
find . -newermt "2023-01-01"

# Files modified between two dates
find . -newermt "2023-01-01" ! -newermt "2023-12-31"
```

### Permission and Ownership Searches

#### Permission-Based Filtering
```bash
# Files with exact permissions 755
find . -perm 755

# Files with at least execute permission
find . -perm /111

# Files with all read permissions
find . -perm -444

# Files writable by owner
find . -perm -u=w

# Files with SUID bit set
find . -perm -4000

# Files with SGID bit set
find . -perm -2000

# Sticky bit files
find . -perm -1000

# Find world-writable files (security risk)
find / -type f -perm -002
```

#### Ownership Searches
```bash
# Files owned by specific user
find . -user john

# Files owned by specific group
find . -group developers

# Files with no valid owner (orphaned files)
find . -nouser

# Files with no valid group
find . -nogroup

# Files owned by root in user directories
find /home -user root

# Files owned by current user
find . -user $(whoami)
```

### Advanced Search Techniques

#### Path-Based Searches
```bash
# Find files in specific path pattern
find . -path "*/src/*"

# Exclude certain directories
find . -path "*/node_modules/*" -prune -o -name "*.js" -print

# Search in specific directory depth
find . -maxdepth 3 -name "*.txt"

# Search from specific depth
find . -mindepth 2 -name "*.c"

# Complex path exclusions
find . -type f -not -path "*/.git/*" -not -path "*/node_modules/*"

# Find files by absolute path
find / -path "/etc/*"
```

#### Content and Metadata Searches
```bash
# Find files with specific inode number
find . -inum 12345

# Find hard links to specific file
find . -samefile reference.txt

# Find files with multiple hard links
find . -type f -links +1

# Find readable files
find . -type f -readable

# Find writable files
find . -type f -writable

# Find executable scripts
find . -name "*.sh" -executable
```

### Actions and Command Execution

#### Basic Actions
```bash
# List files found (default action)
find . -name "*.txt"

# Detailed listing
find . -name "*.txt" -ls

# Print with full path
find . -name "*.txt" -print

# Print in specific format
find . -name "*.txt" -printf "%p %s bytes\n"
```

#### Execute Commands on Results
```bash
# Execute command on each file
find . -name "*.tmp" -exec rm {} \;

# Execute with multiple arguments (more efficient)
find . -name "*.log" -exec gzip {} +

# Execute with confirmation prompt
find . -name "*.bak" -ok rm {} \;

# Execute from file's directory
find . -name "*.sh" -execdir chmod +x {} \;

# Complex command execution
find . -name "*.txt" -exec grep -l "error" {} \;
```

#### File Processing
```bash
# Copy found files to another location
find . -name "*.jpg" -exec cp {} /backup/ \;

# Move files to archive directory
find . -name "*.old" -exec mv {} /archive/ \;

# Change permissions on found files
find . -name "*.sh" -exec chmod 755 {} \;

# Create checksums for files
find . -type f -exec md5sum {} \; > checksums.txt

# Count lines in found files
find . -name "*.py" -exec wc -l {} \;

# Compress large files
find . -size +100M -exec gzip {} \;
```

## Practical Examples

### System Administration

#### Log File Management
```bash
# Find large log files
find /var/log -type f -size +100M -name "*.log" -ls

# Find old log files for archiving
find /var/log -name "*.log" -mtime +30 -exec gzip {} \;

# Find empty log files
find /var/log -name "*.log" -empty

# Find log files with specific content
find /var/log -name "*.log" -exec grep -l "ERROR" {} \;

# Rotate and archive logs
find /var/log -name "*.log" -mtime +7 -exec mv {} {}.old \;

# Find Apache access logs
find /var/log -name "access.log*"

# Find error logs from last week
find /var/log -name "*error*" -mtime -7
```

#### Security Auditing
```bash
# Find world-writable files
find / -type f -perm -002 2>/dev/null

# Find SUID files (potential security risk)
find / -type f -perm -4000 2>/dev/null

# Find SGID files
find / -type f -perm -2000 2>/dev/null

# Find files with no owner
find / -nouser 2>/dev/null

# Find files with no group
find / -nogroup 2>/dev/null

# Find files with unusual permissions
find /home -type f ! -perm 644 2>/dev/null

# Find recently changed system files
find /etc -mtime -7 -not -path "*/ssl/*"

# Find hidden executables
find / -name ".*" -type f -executable 2>/dev/null

# Find world-readable files in private directories
find /home/*/private -perm -004
```

#### Disk Usage Analysis
```bash
# Find largest files in home directory
find /home -type f -printf "%s %p\n" | sort -nr | head -10

# Find files consuming most space
find . -type f -exec du -h {} + | sort -hr | head -20

# Find empty directories
find . -type d -empty

# Find directories with many files
find . -type d -exec sh -c 'echo "{}: $(ls -1 "{}" | wc -l)"' \;

# Find duplicate files by size
find . -type f -printf "%s\n" | sort | uniq -d | while read size; do
    find . -type f -size "${size}c"
done

# Find files by size ranges
find . -size +1G -exec ls -lh {} \;
find . -size +100M -size -1G -exec ls -lh {} \;
```

### Development Workflow

#### Source Code Management
```bash
# Find all source files
find . -name "*.c" -o -name "*.h" -o -name "*.cpp"

# Find all test files
find . -name "*test*" -o -name "*spec*"

# Find build artifacts
find . -name "*.o" -o -name "*.exe" -o -name "build"

# Find configuration files
find . -name "*.conf" -o -name "*.config" -o -name "*.ini"

# Find documentation files
find . -name "*.md" -o -name "*.txt" -o -name "*.rst"

# Find files with specific content
find . -name "*.py" -exec grep -l "TODO" {} \;

# Find recently modified source files
find src -name "*.py" -mtime -1
```

#### Code Quality and Analysis
```bash
# Find files without copyright notice
find . -name "*.py" -exec grep -L "Copyright" {} \;

# Find files with trailing whitespace
find . -name "*.py" -exec grep -l "[[:space:]]$" {} \;

# Find very long source files
find . -name "*.py" -exec wc -l {} + | awk '$1 > 1000'

# Find files without tests
find src -name "*.py" -not -path "*/test/*" -exec basename {} \;

# Find files with syntax errors
find . -name "*.py" -exec python -m py_compile {} \; 2>&1

# Find duplicate function definitions
find . -name "*.py" -exec grep -H "^def " {} \; | cut -d: -f3 | sort | uniq -d
```

### Data Processing and Analysis

#### File Organization
```bash
# Organize files by type
for ext in jpg png gif; do
    find . -name "*.$ext" -exec mkdir -p "$ext" \; -exec mv {} "$ext/" \;
done

# Organize files by date
find . -type f -printf "%TY-%Tm-%Td %p\n" | while read date file; do
    mkdir -p "$date"
    mv "$file" "$date/"
done

# Move files based on size
find . -size +100M -exec mv {} large_files/ \;
find . -size -1M -exec mv {} small_files/ \;

# Find and categorize image files
find . -iregex ".*\.(jpg|jpeg|png|gif|bmp)$" -exec identify {} \;

# Remove duplicate files (by checksum)
find . -type f -exec md5sum {} \; | sort | uniq -d -w32
```

#### Data Migration and Backup
```bash
# Find recently modified files for backup
find /home -mtime -7 -type f -printf "%p\n" > recent_files.txt

# Create selective backup
find /important -name "*.conf" -o -name "*.key" -exec cp -a {} /backup/ \;

# Find and compress old files
find /archive -name "*.log" -mtime +365 -exec gzip {} \;

# Find and move files by year
find . -type f -printf "%TY %p\n" | while read year file; do
    mkdir -p "archive_$year"
    mv "$file" "archive_$year/"
done
```

### Performance Optimization

#### Efficient Search Strategies
```bash
# Limit search depth for better performance
find . -maxdepth 2 -name "*.txt"

# Use specific paths instead of root
find /home/user -name "*.tmp" -exec rm {} \;

# Exclude large directories
find . -path "./node_modules" -prune -o -name "*.js" -print

# Use newer find syntax for better performance
find . -name "*.py" -print0 | xargs -0 python -m py_compile

# Parallel processing with xargs
find . -type f -print0 | xargs -0 -P 4 md5sum

# Use locate for frequent searches
updatedb
locate "important_file"
```

#### Optimized File Operations
```bash
# Efficient file deletion with -delete
find /tmp -mtime +7 -delete

# Batch file processing
find . -name "*.log" -exec gzip {} +

# Use -execdir for directory-specific operations
find . -name "*.tmp" -execdir mv {} /tmp/archive/ \;

# Efficient permission changes
find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +

# Use print0 for filenames with spaces
find . -name "*.pdf" -print0 | xargs -0 tar -czf pdfs.tar.gz
```

## Advanced Techniques

### Complex Pattern Matching

#### Regular Expression Searches
```bash
# Find files with complex naming patterns
find . -regex ".*[0-9]{4}-[0-9]{2}-[0-9]{2}.*"

# Find files with version numbers
find . -regex ".*v[0-9]+\.[0-9]+\.[0-9]+.*"

# Case-insensitive regex for documents
find . -iregex ".*\.(doc|docx|pdf|txt)$"

# Find files with timestamp in name
find . -regex ".*[0-9]{10}.*"  # Unix timestamp format

# Find backup files with date patterns
find . -regex ".*backup[0-9]{8}.*"
```

#### Logical Condition Combinations
```bash
# Complex AND/OR combinations
find . \( -name "*.py" -o -name "*.js" \) -a -executable

# Negation and complex logic
find . -type f ! -name "*.tmp" ! -path "*/.git/*"

# Multiple time conditions
find . -mtime -7 -a -size +1M -a -user $(whoami)

# Permission and ownership combinations
find . -perm -u+w -a -user john

# Nested logical expressions
find . \( -name "*.txt" -o -name "*.md" \) -a \( -mtime -30 -o -size +1M \)
```

### File System Specific Operations

#### Cross-Filesystem Operations
```bash
# Stay on single filesystem
find / -xdev -name "*.conf"

# Find files on specific filesystem type
find / -fstype ext4 -name "*.log"

# Handle network filesystems carefully
find /mnt/nfs -type f -maxdepth 1 -name "*.tmp"
```

#### Symbolic Link Handling
```bash
# Find broken symbolic links
find . -type l ! -exec test -e {} \; -print

# Find symbolic links to specific target
find . -lname "/path/to/target"

# Follow symbolic links in search
find -L . -name "*.txt"

# Find circular symbolic links
find . -type l -exec test -e {} \; -exec readlink -f {} \;
```

### Automation and Scripting

#### Backup Script Integration
```bash
#!/bin/bash
# Automated backup with find

backup_recent_files() {
    local source_dir="$1"
    local backup_dir="$2"
    local days="$3"

    mkdir -p "$backup_dir"

    find "$source_dir" -type f -mtime -"$days" -exec cp -a {} "$backup_dir/" \;

    echo "Backed up $(find "$backup_dir" -type f | wc -l) files"
}

backup_recent_files /home/user/docs /backup/docs 7
```

#### Cleanup Automation
```bash
#!/bin/bash
# Intelligent cleanup script

cleanup_old_files() {
    local pattern="$1"
    local days="$2"
    local dry_run="$3"

    if [ "$dry_run" = "true" ]; then
        echo "Dry run: Files that would be deleted:"
        find . -name "$pattern" -mtime +$days -ls
    else
        find . -name "$pattern" -mtime +$days -delete
        echo "Cleanup completed"
    fi
}

# Usage with dry run
cleanup_old_files "*.tmp" 7 true
```

#### File Analysis Script
```bash
#!/bin/bash
# File system analysis with find

analyze_directory() {
    local dir="$1"

    echo "Analysis for $dir:"
    echo "Total files: $(find "$dir" -type f | wc -l)"
    echo "Total directories: $(find "$dir" -type d | wc -l)"
    echo "Largest file: $(find "$dir" -type f -printf '%s %p\n' | sort -nr | head -1)"
    echo "Most recent file: $(find "$dir" -type f -printf '%T@ %p\n' | sort -nr | head -1 | cut -d' ' -f2-)"
    echo "Files by owner:"
    find "$dir" -type f -printf '%u\n' | sort | uniq -c | sort -nr
}

analyze_directory "/home/user"
```

## Performance Considerations

### Search Optimization
```bash
# Use specific starting paths
find /home/user -name "*.log" 2>/dev/null

# Limit search depth
find . -maxdepth 3 -name "*.tmp"

# Exclude unnecessary directories
find . -path "./node_modules" -prune -o -name "*.js" -print

# Use appropriate file type filters
find . -type f -name "*.txt"

# Use -delete instead of -exec rm
find /tmp -name "*.tmp" -delete

# Batch operations efficiently
find . -name "*.jpg" -exec cp {} /images/ +
```

### Memory and CPU Considerations
```bash
# Process files in batches for very large directories
find . -name "*.log" -print0 | xargs -0 -P 4 gzip

# Use -print0 for special filenames
find . -name "*.txt" -print0 | xargs -0 process_files

# Limit concurrent operations
find . -name "*.large" -exec nice cp {} /slow/storage/ \;

# Monitor find operations
find / -name "*.conf" -fprint /tmp/find_output.txt &
FIND_PID=$!
watch -n 1 "ps -p $FIND_PID -o pid,pcpu,pmem,cmd"
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Handle permission denied errors
find / -name "*.conf" 2>/dev/null

# Use sudo for system-wide searches
sudo find / -name "important_config"

# Fix permissions for found files
find . -type f -user nobody -exec chown user:group {} \;
```

#### Performance Issues
```bash
# Timeout for very large searches
timeout 300 find / -name "*.log"

# Use locate instead of find for frequent searches
updatedb && locate "*.log"

# Exclude problematic directories
find / -path "/proc" -prune -o -path "/sys" -prune -o -name "*.conf" -print
```

#### Memory Issues
```bash
# Process files one by one for memory efficiency
find . -name "*.large" -exec process_single_file {} \;

# Use xargs with limited batch size
find . -type f -print0 | xargs -0 -n 10 process_batch

# Monitor memory usage during find operations
/usr/bin/time -v find . -type f -exec md5sum {} \;
```

## Related Commands

- [`locate`](/docs/commands/file-management/locate) - Fast file search using database
- [`grep`](/docs/commands/text-processing/grep) - Search text within files
- [`xargs`](/docs/commands/shell/xargs) - Build and execute command lines
- [`which`](/docs/commands/system-info/which) - Locate command executables
- [`whereis`](/docs/commands/system-info/whereis) - Find command locations
- [`tree`](/docs/commands/file-management/tree) - Display directory tree structure
- [`du`](/docs/commands/system-info/du) - Disk usage summary
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Be specific with starting paths** to avoid searching entire filesystem
2. **Use `-maxdepth`** to limit search scope and improve performance
3. **Combine criteria** using logical operators for precise results
4. **Use `-print0` and `xargs -0`** for filenames with spaces
5. **Test with `-ls`** before using destructive actions like `-delete` or `-exec rm`
6. **Use appropriate permissions** - avoid unnecessary sudo usage
7. **Exclude problematic directories** like /proc, /sys, or large data directories
8. **Consider using `locate`** for frequent filename searches
9. **Monitor performance** on large filesystems and long-running operations
10. **Use verbose output** during critical operations for better debugging

## Performance Tips

1. **Start searches from specific directories** rather than filesystem root
2. **Use file type filters** (-type f, -type d) to reduce search space
3. **Combine multiple criteria** to narrow results quickly
4. **Use `-delete`** instead of `-exec rm` for better performance
5. **Process files in batches** with xargs for large result sets
6. **Exclude known large directories** with `-path` and `-prune`
7. **Use appropriate timeout values** for automated scripts
8. **Consider filesystem characteristics** when planning large searches
9. **Use `-exec ... +`** instead of `-exec ... \;` when possible
10. **Monitor system resources** during extensive find operations

The `find` command is an essential tool for file system exploration and management in Linux. Its ability to combine multiple criteria, execute commands, and handle complex search patterns makes it indispensable for system administration, file organization, automated processing, and security auditing tasks.