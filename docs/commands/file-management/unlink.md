---
title: unlink - Remove directory entry
sidebar_label: unlink
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# unlink - Remove directory entry

The `unlink` command is a basic Unix utility that removes a single file from the filesystem. It calls the `unlink()` system call, which removes the specified directory entry and decrements the link count of the file. When the link count reaches zero and no process has the file open, the file is actually deleted from the filesystem. Unlike `rm`, `unlink` can only remove one file at a time and has no recursive or interactive options. It's a minimal, low-level tool designed for simple file removal operations.

## Basic Syntax

```bash
unlink [OPTION]... FILE...
```

## Common Options

### Basic Options
- `--help` - Display help information and exit
- `--version` - Output version information and exit

### Behavior
- `unlink` only accepts a single filename argument
- Cannot remove directories
- No confirmation prompts
- No recursive deletion capability
- Cannot use wildcards or multiple filenames

## Usage Examples

### Basic File Removal

#### Simple Unlink Operations
```bash
# Remove a single file
unlink myfile.txt

# Remove a file with absolute path
unlink /tmp/tempfile.dat

# Remove a file in current directory
unlink "./document.pdf"

# Attempt to remove directory (will fail)
unlink mydirectory/  # Error: unlink: cannot unlink 'mydirectory/': Is a directory

# Attempt to remove multiple files (will fail)
unlink file1.txt file2.txt  # Error: unlink: extra operand 'file2.txt'
```

#### Working with Different File Types
```bash
# Remove a regular file
unlink regular_file.txt

# Remove a symbolic link (removes the link, not target)
unlink symlink_to_file

# Remove a hard link (decrements link count)
unlink hardlink.txt

# Remove a file with special characters in name
unlink "file with spaces.txt"
unlink "file-with-dashes.txt"
unlink "file_with_underscores.txt"
```

### Filesystem Operations

#### Understanding Link Behavior
```bash
# Create multiple links to same file
echo "content" > original.txt
ln original.txt hardlink1.txt
ln original.txt hardlink2.txt

# Check link count (should be 3)
ls -l original.txt

# Remove one link (file still accessible via other links)
unlink hardlink1.txt
ls -l original.txt  # Link count now 2

# Remove all links one by one
unlink hardlink2.txt
unlink original.txt  # File actually deleted
```

#### Working with Symbolic Links
```bash
# Create symbolic link
ln -s /path/to/target.txt symlink.txt

# Remove symbolic link (target file remains)
unlink symlink.txt

# Create broken symbolic link
ln -s nonexistent.txt broken_link.txt
unlink broken_link.txt  # Removes broken link
```

### Error Handling

#### Common Error Scenarios
```bash
# Attempt to remove non-existent file
unlink nonexistent.txt  # Error: unlink: cannot unlink 'nonexistent.txt': No such file or directory

# Attempt to remove directory
unlink mydir/  # Error: unlink: cannot unlink 'mydir/': Is a directory

# Attempt to remove file without permissions
unlink protected.txt  # Error: unlink: cannot unlink 'protected.txt': Permission denied

# Attempt to remove file in use by process
lsof +f -- /tmp/locked_file.txt
unlink /tmp/locked_file.txt  # May work or fail depending on system

# Attempt to remove multiple files
unlink file1.txt file2.txt  # Error: unlink: extra operand
```

#### Safe File Removal
```bash
# Check if file exists before unlinking
[ -f "temp_file.txt" ] && unlink temp_file.txt

# Use find with unlink for selective removal
find /tmp -name "*.tmp" -type f -exec unlink {} \;

# Remove files older than 7 days
find /var/log -name "*.log.old" -mtime +7 -type f -exec unlink {} \;
```

## Practical Examples

### System Administration

#### Temporary File Cleanup
```bash
#!/bin/bash
# Clean up temporary files safely

# Clean user temporary files
find /tmp -maxdepth 1 -name "tmp.*" -user "$USER" -type f -exec unlink {} \;

# Clean session files
find /tmp -name "session_*" -mtime +1 -type f -exec unlink {} \;

# Clean cache files
find ~/.cache -name "*.cache" -mtime +7 -type f -exec unlink {} \;

echo "Temporary files cleaned successfully"
```

#### Log File Management
```bash
#!/bin/bash
# Rotate and remove old log files

LOG_DIR="/var/log/myapp"
DAYS_TO_KEEP=30

# Remove old log files
find "$LOG_DIR" -name "*.log.*" -mtime +$DAYS_TO_KEEP -type f -exec unlink {} \;

# Compress and remove uncompressed logs if they exist
if [ -f "$LOG_DIR/application.log" ]; then
    gzip "$LOG_DIR/application.log"
    unlink "$LOG_DIR/application.log"  # Remove original after compression
fi

echo "Log rotation completed"
```

#### Process Cleanup
```bash
#!/bin/bash
# Remove process lock files

# Remove stale lock files
find /var/lock -name "*.lock" -type f -exec sh -c '
    f="$1"
    # Check if process is still running
    pid=$(cat "$f" 2>/dev/null)
    if ! kill -0 "$pid" 2>/dev/null; then
        echo "Removing stale lock: $f"
        unlink "$f"
    fi
' sh {} \;
```

### Development Workflow

#### Build System Cleanup
```bash
#!/bin/bash
# Clean build artifacts using unlink

# Remove object files
find . -name "*.o" -type f -exec unlink {} \;

# Remove compiled binaries
find . -name "a.out" -type f -exec unlink {} \;

# Remove temporary build files
find . -name ".tmp_*" -type f -exec unlink {} \;

# Remove specific build artifacts
[ -f "Makefile.bak" ] && unlink Makefile.bak

echo "Build cleanup completed"
```

#### Version Control Operations
```bash
#!/bin/bash
# Version control helper functions

# Remove untracked files
git_clean_untracked() {
    git ls-files --others --exclude-standard | while read -r file; do
        if [ -f "$file" ]; then
            echo "Removing: $file"
            unlink "$file"
        fi
    done
}

# Remove merge conflict backup files
remove_conflict_backups() {
    find . -name "*.orig" -type f -exec unlink {} \;
    find . -name "*.rej" -type f -exec unlink {} \;
}
```

### File Processing

#### File Processing Pipeline
```bash
#!/bin/bash
# Process files and remove originals

for file in *.dat; do
    if [ -f "$file" ]; then
        # Process the file
        processed_file="${file%.dat}.processed"
        python process_data.py "$file" > "$processed_file"

        # Remove original if processing was successful
        if [ -f "$processed_file" ]; then
            unlink "$file"
            echo "Processed and removed: $file"
        fi
    fi
done
```

#### Backup Verification
```bash
#!/bin/bash
# Verify backups and remove temporary files

SOURCE_DIR="/data"
BACKUP_DIR="/backup"
TEMP_DIR="/tmp/backup_verify"

# Create temporary verification file
verify_file="$TEMP_DIR/verify_$(date +%Y%m%d_%H%M%S).txt"

# Perform backup verification
if tar -tf "$BACKUP_DIR/backup.tar.gz" | wc -l > "$verify_file"; then
    echo "Backup verification successful"
    unlink "$verify_file"
else
    echo "Backup verification failed"
    # Keep verification file for debugging
fi
```

## Advanced Usage

### Script Integration

#### Batch Processing with Unlink
```bash
#!/bin/bash
# Safe batch file removal

safe_unlink() {
    local file="$1"
    local confirm="${2:-false}"

    if [ ! -f "$file" ]; then
        echo "Error: File '$file' does not exist"
        return 1
    fi

    if [ "$confirm" = "true" ]; then
        read -p "Remove '$file'? [y/N] " response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "Cancelled"
            return 0
        fi
    fi

    if unlink "$file" 2>/dev/null; then
        echo "Removed: $file"
        return 0
    else
        echo "Error: Failed to remove '$file'"
        return 1
    fi
}

# Usage examples
safe_unlink "temp.txt"
safe_unlink "important.txt" "true"
```

#### File Monitoring and Cleanup
```bash
#!/bin/bash
# Monitor directory and remove old files

monitor_and_clean() {
    local directory="$1"
    local max_age="$2"  # in minutes
    local pattern="${3:-*}"

    while true; do
        find "$directory" -name "$pattern" -type f -mmin +$max_age -exec sh -c '
            for file; do
                echo "Removing old file: $file"
                unlink "$file" 2>/dev/null && echo "Removed: $file"
            done
        ' sh {} +

        sleep 300  # Check every 5 minutes
    done
}

# Start monitoring
monitor_and_clean "/tmp" 60 "*.tmp" &
```

### Error Recovery

#### Robust File Removal
```bash
#!/bin/bash
# Robust file removal with error handling

robust_unlink() {
    local file="$1"
    local max_attempts="$2"
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if [ ! -f "$file" ]; then
            echo "File '$file' does not exist"
            return 0
        fi

        # Check if file is in use
        if lsof "$file" >/dev/null 2>&1; then
            echo "Attempt $attempt: File '$file' is in use, waiting..."
            sleep $((attempt * 2))
        else
            if unlink "$file" 2>/dev/null; then
                echo "Successfully removed: $file"
                return 0
            else
                echo "Attempt $attempt: Failed to remove '$file'"
            fi
        fi

        ((attempt++))
    done

    echo "Failed to remove '$file' after $max_attempts attempts"
    return 1
}

# Usage
robust_unlink "problematic_file.txt" 5
```

#### File System Check
```bash
#!/bin/bash
# Check filesystem before unlink operations

check_filesystem() {
    local file="$1"
    local dir=$(dirname "$file")

    # Check if filesystem is read-only
    if ! touch "$dir/.test_write" 2>/dev/null; then
        echo "Error: Filesystem is read-only"
        return 1
    fi
    unlink "$dir/.test_write" 2>/dev/null

    # Check available space
    local available=$(df "$dir" | awk 'NR==2 {print $4}')
    if [ "$available" -lt 1024 ]; then  # Less than 1KB
        echo "Warning: Low disk space"
    fi

    return 0
}

# Safe unlink with filesystem check
safe_unlink_with_check() {
    local file="$1"

    if check_filesystem "$file"; then
        unlink "$file"
    else
        echo "Cannot remove '$file': Filesystem issues detected"
        return 1
    fi
}
```

## Integration and Automation

### Shell Scripting Patterns

#### Conditional Unlinking
```bash
#!/bin/bash
# Conditional file removal

# Remove file only if it meets criteria
conditional_unlink() {
    local file="$1"
    local max_size="${2:-0}"  # in bytes
    local max_age="${3:-0}"   # in days

    [ ! -f "$file" ] && return 0

    # Check file size
    if [ "$max_size" -gt 0 ]; then
        local size=$(stat -c%s "$file" 2>/dev/null || echo 0)
        if [ "$size" -gt "$max_size" ]; then
            echo "File '$file' is too large (${size} bytes)"
            return 1
        fi
    fi

    # Check file age
    if [ "$max_age" -gt 0 ]; then
        local age=$(find "$file" -mtime +$max_age -print)
        [ -z "$age" ] && return 0
    fi

    unlink "$file" && echo "Removed: $file"
}

# Examples
conditional_unlink "temp.txt" 1048576 7  # Remove if >1MB and older than 7 days
```

#### Batch Operations
```bash
#!/bin/bash
# Batch unlink operations

# Read files from list and remove them
unlink_from_list() {
    local file_list="$1"
    local dry_run="${2:-false}"

    while IFS= read -r -d '' file; do
        if [ -f "$file" ]; then
            if [ "$dry_run" = "true" ]; then
                echo "Would remove: $file"
            else
                unlink "$file" && echo "Removed: $file"
            fi
        fi
    done < <(tr '\n' '\0' < "$file_list")
}

# Create file list and remove
find /tmp -name "*.tmp" -print0 > temp_files.list
unlink_from_list "temp_files.list" "true"  # Dry run
unlink_from_list "temp_files.list"        # Actual removal
unlink temp_files.list
```

### System Integration

#### Cron Job Integration
```bash
#!/bin/bash
# Cleanup script for cron jobs
# Place in: /etc/cron.daily/cleanup_temp_files

LOG_FILE="/var/log/cleanup.log"
TEMP_DIRS="/tmp /var/tmp"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Cleanup function
cleanup_temp_files() {
    local dir="$1"
    local count=0

    find "$dir" -maxdepth 1 -name "tmp.*" -type f -mtime +1 -exec sh -c '
        file="$1"
        if unlink "$file" 2>/dev/null; then
            echo "$file"
        fi
    ' sh {} \; | while read -r file; do
        ((count++))
        log_message "Removed temporary file: $file"
    done

    return $count
}

# Main cleanup
total_removed=0
for dir in $TEMP_DIRS; do
    if [ -d "$dir" ]; then
        count=$(cleanup_temp_files "$dir")
        total_removed=$((total_removed + count))
    fi
done

log_message "Cleanup completed. Removed $total_removed files."
```

#### Service Integration
```bash
#!/bin/bash
# Service cleanup script

SERVICE_NAME="myapp"
PID_FILE="/var/run/$SERVICE_NAME.pid"
SOCKET_FILE="/var/run/$SERVICE_NAME.sock"

# Cleanup service files on service stop
cleanup_service_files() {
    # Remove PID file if process is not running
    if [ -f "$PID_FILE" ]; then
        if ! kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            echo "Removing stale PID file"
            unlink "$PID_FILE"
        fi
    fi

    # Remove socket file if it exists
    if [ -S "$SOCKET_FILE" ]; then
        echo "Removing socket file"
        unlink "$SOCKET_FILE"
    fi

    # Clean up temporary service files
    find "/tmp/$SERVICE_NAME" -name "*.tmp" -type f -exec unlink {} \; 2>/dev/null
}

# Call this function when service stops
cleanup_service_files
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check file permissions
ls -l problematic_file.txt

# Check ownership
stat problematic_file.txt

# Try with sudo if necessary
sudo unlink protected_file.txt

# Change permissions first (if allowed)
chmod 644 file.txt
unlink file.txt
```

#### File in Use Issues
```bash
# Check what process is using the file
lsof +f -- /path/to/file.txt

# List open files for a specific process
lsof -p PID

# Find processes using files in a directory
lsof +D /path/to/directory

# Force close and remove (dangerous!)
fuser -k file.txt
unlink file.txt  # May now work
```

#### Filesystem Issues
```bash
# Check filesystem status
df -h /path/to/filesystem

# Check if filesystem is mounted read-only
mount | grep "on /path/to/filesystem"

# Remount as read-write (if possible)
sudo mount -o remount,rw /path/to/filesystem

# Check filesystem integrity
sudo fsck /dev/sdXn
```

#### Symbolic Link Issues
```bash
# Check if it's a broken link
readlink symlink.txt
ls -l symlink.txt

# Remove broken symlink
unlink broken_symlink.txt

# Check link target before removing
if [ ! -e "$(readlink -f symlink.txt)" ]; then
    echo "Removing broken symlink"
    unlink symlink.txt
fi
```

## Related Commands

- [`rm`](/docs/commands/file-management/rm) - Remove files and directories (more powerful)
- [`ln`](/docs/commands/file-management/ln) - Create links between files
- [`find`](/docs/commands/file-management/find) - Search for files and execute commands
- [`lsof`](/docs/commands/system-information/lsof) - List open files
- [`stat`](/docs/commands/file-management/stat) - Display file or filesystem status
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file owner and group

## Best Practices

1. **Use `rm` for most operations** - `unlink` is too limiting for general use
2. **Check file existence** before unlinking to avoid errors
3. **Verify permissions** before attempting to remove files
4. **Use absolute paths** when unlinking files in scripts
5. **Handle errors gracefully** in automated scripts
6. **Consider using `find -exec unlink`** for batch operations
7. **Test with dry runs** before大规模删除操作
8. **Log removals** for audit purposes in production environments
9. **Backup important files** before removal operations
10. **Use proper quoting** for filenames with special characters

## Performance Tips

1. **`unlink` is faster than `rm`** for single file removal
2. **Use `find -exec unlink {} +`** for better performance with many files
3. **Avoid shell loops** for large numbers of files
4. **Batch operations** are more efficient than individual calls
5. **Consider `rm -f`** for automated scripts where errors are acceptable
6. **Use `xargs unlink`** for very large file lists
7. **Minimize filesystem checks** in performance-critical code
8. **Process files by directory** to improve filesystem cache locality

The `unlink` command is a simple, low-level tool for removing single files. While it lacks the features and safety mechanisms of `rm`, its simplicity makes it useful in specific scenarios like scripts, system programming, and when you need precise control over file removal operations. Understanding its behavior with links, permissions, and filesystem operations is essential for safe and effective use.