---
title: stat - Display File or Filesystem Status
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# stat - Display File or Filesystem Status

The `stat` command displays detailed information about files and file systems, including file size, permissions, timestamps, inode information, and more. It provides comprehensive metadata that goes beyond what `ls` can show.

## Basic Syntax

```bash
stat [OPTIONS] FILE...
stat [OPTIONS] -c/--format=FORMAT FILE...
stat [OPTIONS] -f/--filesystem FILESYSTEM...
```

## Common Options

### Display Options
- `-L, --dereference` - Follow symbolic links
- `-f, --filesystem` - Display file system status instead of file status
- `-c, --format=FORMAT` - Use specified format for output
- `--printf=FORMAT` - Like --format, but interpret backslash escapes
- `-t, --terse` - Print information in terse form

### Format Specifiers
- `%a` - Access rights in octal
- `%A` - Access rights in human readable form
- `%b` - Number of blocks allocated
- `%B` - Size of each block in bytes
- `%C` - SELinux security context
- `%d` - Device number in decimal
- `%D` - Device number in hex
- `%f` - Raw mode in hex
- `%F` - File type
- `%g` - Group ID of owner
- `%G` - Group name of owner
- `%h` - Number of hard links
- `%i` - Inode number
- `%n` - File name
- `%N` - Quoted file name with dereference if symbolic link
- `%o` - Optimal I/O transfer size hint
- `%s` - Total size in bytes
- `%t` - Major device type in hex
- `%T` - Minor device type in hex
- `%u` - User ID of owner
- `%U` - User name of owner
- `%w` - Time of file birth (creation)
- `%W` - Time of file birth (creation) seconds since Epoch
- `%x` - Time of last access
- `%X` - Time of last access seconds since Epoch
- `%y` - Time of last modification
- `%Y` - Time of last modification seconds since Epoch
- `%z` - Time of last change
- `%Z` - Time of last change seconds since Epoch

## Usage Examples

### Basic Usage
```bash
# Display file status
stat filename.txt

# Display status of multiple files
stat file1.txt file2.txt

# Follow symbolic links
stat -L symlink.txt

# Display in terse format
stat -t filename.txt
```

### Custom Format Output
```bash
# Show only specific information
stat -c "%n %s bytes" filename.txt

# Show file permissions in human readable format
stat -c "%A %n" filename.txt

# Show all timestamps
stat -c "Access: %x\nModify: %y\nChange: %z" filename.txt

# Show file type and permissions
stat -c "%F: %A" filename.txt
```

### File System Information
```bash
# Display file system status
stat -f /

# Show file system block size
stat -f -c "%S" /

# Display file system type
stat -f -c "%T" /
```

### Directory Analysis
```bash
# Show directory information
stat directory/

# Show directory contents count (files + subdirs)
stat -c "%h" directory/

# Multiple files in directory
stat -c "%n %s" *.txt
```

## Output Examples

### Default Output
```
  File: filename.txt
  Size: 1024        Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d    Inode: 123456      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/   user)   Gid: ( 1000/   user)
Access: 2023-12-01 10:30:45.000000000 -0500
Modify: 2023-12-01 10:30:45.000000000 -0500
Change: 2023-12-01 10:30:45.000000000 -0500
 Birth: 2023-12-01 10:30:45.000000000 -0500
```

### Terse Format Output
```
filename.txt 1024 8 81a4 1000 1000 801 123456 1 0 0 1701448245 1701448245 1701448245 1701448245 4096
```

### Custom Format Examples
```bash
# File size and name
$ stat -c "%n: %s bytes" filename.txt
filename.txt: 1024 bytes

# Permissions and type
$ stat -c "%F - %A" filename.txt
regular file - -rw-r--r--

# Timestamps
$ stat -c "Access: %x | Modify: %y" filename.txt
Access: 2023-12-01 10:30:45.000000000 -0500 | Modify: 2023-12-01 10:30:45.000000000 -0500
```

## Practical Examples

### File Verification
```bash
# Check file permissions
stat -c "%A %n" *.sh

# Verify file ownership
stat -c "%U:%G %n" /var/log/*

# Check if file is executable
stat -c "%A" script.sh | grep -q x && echo "Executable" || echo "Not executable"
```

### Disk Usage Analysis
```bash
# Find largest files in directory
stat -c "%s %n" * | sort -n | tail -10

# Calculate directory size (excluding subdirectories)
stat -c "%s" * | awk '{sum += $1} END {print sum " bytes"}'

# Show files by size
for file in *; do
    echo "$(stat -c "%s" "$file") bytes - $file"
done | sort -nr
```

### Time-based Operations
```bash
# Find files modified in last 24 hours
find . -type f -mtime -1 -exec stat -c "%y %n" {} \;

# Sort files by modification time
stat -c "%Y %n" * | sort -n | cut -d' ' -f2-

# Find recently created files
stat -c "%W %n" * | awk '$1 > $(date +%s)-86400 {print $2}'
```

### System Administration
```bash
# Check system file permissions
stat -c "%A %n" /etc/passwd /etc/shadow /etc/sudoers

# Verify log file properties
stat -c "%U:%G %A %s %n" /var/log/syslog

# Monitor file changes
watch -n 1 'stat -c "%y %z" important_file'
```

## Advanced Usage

### Complex Formatting
```bash
# Custom detailed format
stat -c "File: %n
Type: %F
Size: %s bytes
Permissions: %A
Owner: %U:%G
Modified: %y
Accessed: %x" filename.txt

# JSON-like output
stat -c '{"name":"%n","size":%s,"mode":"%a","owner":"%U","group":"%G","mtime":"%Y"}' filename.txt

# CSV format
stat -c "%n,%s,%a,%U,%G,%Y" *.txt | tr '\n' ',' | sed 's/,$/\n/'
```

### Scripting Examples
```bash
# File monitoring script
#!/bin/bash
FILE="/var/log/syslog"
LAST_MOD=$(stat -c "%Y" "$FILE")

while true; do
    CURRENT_MOD=$(stat -c "%Y" "$FILE")
    if [ "$CURRENT_MOD" -gt "$LAST_MOD" ]; then
        echo "File $FILE has been modified"
        LAST_MOD="$CURRENT_MOD"
    fi
    sleep 5
done

# Disk space by user
for user in $(ls /home); do
    echo "User $user:"
    find /home/$user -type f -exec stat -c "%s" {} \; | \
        awk '{sum += $1} END {print "  Total: " sum/1024/1024 " MB"}'
done
```

### File System Analysis
```bash
# Check file system details
stat -f -c "Type: %T
Block size: %S
Blocks: %b
Free blocks: %f
Total inodes: %c
Free inodes: %d" /

# Mount point information
for mount in $(mount | awk '{print $3}'); do
    echo "=== $mount ==="
    stat -f -c "Type: %T, Free: %f blocks" "$mount"
done
```

### Security and Auditing
```bash
# Check for files with unusual permissions
find /etc -type f -exec stat -c "%A %n" {} \; | grep -v "rw-r--r--"

# Find files owned by specific user
find / -user username -exec stat -c "%n %U %G" {} \; 2>/dev/null

# Audit file changes
stat -c "%n %y" important_file > file_audit.log
# Later compare with current state
```

## Performance Considerations

### Efficient Usage
```bash
# Use stat with find for batch operations
find . -type f -exec stat -c "%s %n" {} \; | sort -nr

# Avoid calling stat multiple times on same file
SIZE=$(stat -c "%s" file.txt)
MODE=$(stat -c "%a" file.txt)
```

### Large File Systems
```bash
# For large directories, use find + stat
find /large/directory -type f -exec stat -c "%s" {} + | awk '{sum += $1} END {print sum}'

# Limit search scope
find /path -maxdepth 2 -exec stat -c "%n %s" {} \;
```

## Related Commands

- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file ownership

## Best Practices

1. **Use custom formats** for scripting:
   - `stat -c "%s %n"` for size and name
   - `stat -c "%Y"` for Unix timestamp

2. **Follow symbolic links** when needed:
   - Use `-L` to get information about the target

3. **Use appropriate precision** for timestamps:
   - `%x`, `%y`, `%z` for human-readable
   - `%X`, `%Y`, `%Z` for Unix timestamps

4. **Be careful with special files**:
   - `stat` works differently on device files, pipes, etc.

5. **Consider performance** with large numbers of files:
   - Use `find -exec stat {} +` for batch operations

6. **Use file system mode** for mount point information:
   - `stat -f` for file system statistics

The `stat` command provides comprehensive file and file system metadata that goes far beyond basic directory listings. Its flexible formatting options make it invaluable for scripting, system administration, and detailed file analysis tasks in Linux environments.