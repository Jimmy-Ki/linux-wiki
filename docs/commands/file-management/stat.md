---
title: stat - Display File or Filesystem Status
sidebar_label: stat
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# stat - Display File or Filesystem Status

The `stat` command displays detailed information about files and file systems, including file size, permissions, timestamps, inode information, and more. It provides comprehensive metadata that goes far beyond what `ls` can show, offering precise control over output formatting and the ability to examine both file and filesystem statistics. The command is particularly useful for scripting, system administration, file auditing, and detailed file analysis tasks where exact metadata information is required.

## Basic Syntax

```bash
stat [OPTIONS] FILE...
stat [OPTIONS] -c/--format=FORMAT FILE...
stat [OPTIONS] -f/--filesystem FILESYSTEM...
stat [OPTIONS] -t/--terse FILE...
stat [OPTIONS] --printf=FORMAT FILE...
```

## Common Options

### Display Options

- `-L, --dereference` - Follow symbolic links and display information about the target
- `-f, --filesystem` - Display file system status instead of file status
- `-c, --format=FORMAT` - Use specified format for output
- `--printf=FORMAT` - Like --format, but interpret backslash escapes
- `-t, --terse` - Print information in terse form, suitable for parsing
- `--help` - Display help information and exit
- `--version` - Output version information and exit

### File System Format Specifiers (with -f)

- `%a` - Free blocks available to non-superuser
- `%b` - Total data blocks in file system
- `%c` - Total file nodes in file system
- `%d` - Free file nodes in file system
- `%f` - Free blocks in file system
- `%i` - File System ID in hex
- `%l` - Maximum length of filenames
- `%n` - File name
- `%s` - Block size (for faster transfers)
- `%S` - Fundamental block size (for block counts)
- `%t` - File System type in hex
- `%T` - File System type in human readable form

### File Format Specifiers

#### Basic Information
- `%n` - File name
- `%N` - Quoted file name with dereference if symbolic link
- `%d` - Device number in decimal
- `%D` - Device number in hex
- `%i` - Inode number
- `%f` - Raw mode in hex
- `%F` - File type
- `%h` - Number of hard links

#### Size and Blocks
- `%s` - Total size in bytes
- `%b` - Number of blocks allocated
- `%B` - Size of each block in bytes
- `%o` - Optimal I/O transfer size hint

#### Ownership and Permissions
- `%u` - User ID of owner
- `%U` - User name of owner
- `%g` - Group ID of owner
- `%G` - Group name of owner
- `%a` - Access rights in octal
- `%A` - Access rights in human readable form

#### Timestamps (Human Readable)
- `%w` - Time of file birth (creation), human-readable
- `%x` - Time of last access, human-readable
- `%y` - Time of last modification, human-readable
- `%z` - Time of last change, human-readable

#### Timestamps (Unix Epoch)
- `%W` - Time of file birth (creation), seconds since Epoch
- `%X` - Time of last access, seconds since Epoch
- `%Y` - Time of last modification, seconds since Epoch
- `%Z` - Time of last change, seconds since Epoch

#### Security and Context
- `%C` - SELinux security context
- `%Z` - Time of last change, seconds since Epoch

## Usage Examples

### Basic Usage

#### Displaying File Information
```bash
# Display detailed information about a single file
stat filename.txt

# Display information about multiple files
stat file1.txt file2.txt file3.txt

# Display information in terse format
stat -t filename.txt

# Follow symbolic links to get information about the target
stat -L symbolic_link.txt

# Display information about a directory
stat /home/user/documents/

# Display information about special files
stat /dev/sda1  # Device file
stat /proc/cpuinfo  # Pseudo-file
```

#### Default Output Examples
```bash
# Regular file output
$ stat document.txt
  File: document.txt
  Size: 2048        Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d  Inode: 1312345     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/  user)   Gid: ( 1000/  user)
Access: 2023-12-01 10:30:45.123456789 -0500
Modify: 2023-12-01 15:45:30.987654321 -0500
Change: 2023-12-01 15:45:30.987654321 -0500
 Birth: 2023-11-15 09:20:15.555555555 -0500

# Symbolic link output
$ stat -L symlink.txt
  File: symlink.txt -> /target/real_file.txt
  Size: 25          Blocks: 8          IO Block: 4096   symbolic link
Device: 801h/2049d  Inode: 1312346     Links: 1
Access: (0777/lrwxrwxrwx)  Uid: ( 1000/  user)   Gid: ( 1000/  user)
Access: 2023-12-01 16:00:00.000000000 -0500
Modify: 2023-11-20 14:30:00.000000000 -0500
Change: 2023-11-20 14:30:00.000000000 -0500
 Birth: -
```

### Custom Format Output

#### File Information Extraction
```bash
# Show only file name and size
stat -c "%n: %s bytes" filename.txt

# Show file permissions in human readable format
stat -c "%A %n" *.txt

# Show file owner and group
stat -c "%U:%G %n" /var/log/syslog

# Show file type and permissions
stat -c "%F: %A" filename.txt

# Show inode and device information
stat -c "Inode: %i, Device: %D" filename.txt
```

#### Timestamp Operations
```bash
# Show all timestamps in human readable format
stat -c "Access: %x\nModify: %y\nChange: %z\nBirth: %w" filename.txt

# Show modification time as Unix timestamp
stat -c "%Y" filename.txt

# Find files modified within last 24 hours
find . -type f -mtime -1 -exec stat -c "%y %n" {} \;

# Sort files by modification time
stat -c "%Y %n" * | sort -n | cut -d' ' -f2-

# Calculate file age in days
echo "File is $(($(($(date +%s) - $(stat -c %Y filename.txt))) / 86400)) days old"
```

#### Permission Analysis
```bash
# Check if file is executable
if stat -c "%A" script.sh | grep -q "x"; then
    echo "File is executable"
else
    echo "File is not executable"
fi

# Show permissions in octal format
stat -c "%a %n" *.conf

# Check for files with unusual permissions
find /etc -type f -exec stat -c "%A %n" {} \; | grep -v "rw-r--r--"

# Show files owned by specific user
find /home -user username -exec stat -c "%U %n" {} \;
```

### File System Information

#### Basic File System Statistics
```bash
# Display file system status for root
stat -f /

# Show file system type
stat -f -c "%T" /

# Show total and free space
stat -f -c "Total: %b blocks, Free: %f blocks" /

# Show block size information
stat -f -c "Block size: %S, Optimal: %s" /
```

#### Advanced File System Analysis
```bash
# Show comprehensive file system information
stat -f -c "Filesystem: %n
Type: %T
Total blocks: %b
Free blocks: %f
Available blocks: %a
Total inodes: %c
Free inodes: %d
Block size: %S
Max filename length: %l" /

# Check multiple mount points
for mount in / /home /var /tmp; do
    echo "=== $mount ==="
    stat -f -c "Type: %T, Free: %f/%f blocks (%.1f%%)" "$mount" \
        | awk '{printf "%s, Used: %s/%s blocks (%.1f%%)\n", $2, $4, $6, 100*($4-$6)/$4}'
done

# Show filesystem ID
stat -f -c "FS ID: %i" /
```

### Special File Types

#### Device Files
```bash
# Analyze block device
stat /dev/sda1
stat -c "Device: %t:%T (Major: %t, Minor: %T)" /dev/sda1

# Analyze character device
stat /dev/tty
stat /dev/null
```

#### Pipes and Sockets
```bash
# Named pipe
mkfifo mypipe
stat mypipe

# Unix socket
stat -c "%F %n" /var/run/docker.sock
```

## Practical Examples

### File Verification and Auditing

#### Security Auditing
```bash
# Check system file permissions
stat -c "%A %n" /etc/passwd /etc/shadow /etc/sudoers /etc/hosts

# Find files with SUID/SGID bits set
find / -perm /6000 -type f -exec stat -c "%A %n" {} \; 2>/dev/null

# Check for world-writable files
find / -perm -0002 -type f -exec stat -c "%A %n" {} \; 2>/dev/null

# Audit configuration files
for file in /etc/*.conf; do
    echo "=== $file ==="
    stat -c "Owner: %U:%G, Permissions: %A, Size: %s, Modified: %y" "$file"
done
```

#### File Integrity Monitoring
```bash
# Create file baseline
create_baseline() {
    local file="$1"
    local baseline="${file}.baseline"
    stat -c "%s %a %U %G %Y" "$file" > "$baseline"
    echo "Baseline created for $file"
}

# Check file against baseline
check_integrity() {
    local file="$1"
    local baseline="${file}.baseline"

    if [ ! -f "$baseline" ]; then
        echo "No baseline found for $file"
        return 1
    fi

    local current=$(stat -c "%s %a %U %G %Y" "$file")
    local stored=$(cat "$baseline")

    if [ "$current" != "$stored" ]; then
        echo "WARNING: File $file has changed!"
        echo "Current:  $current"
        echo "Baseline: $stored"
        return 1
    else
        echo "File $file integrity check passed"
        return 0
    fi
}

# Usage
create_baseline /etc/passwd
check_integrity /etc/passwd
```

### Disk Usage Analysis

#### File Size Analysis
```bash
# Find largest files in current directory
stat -c "%s %n" * | sort -nr | head -10

# Calculate directory size (recursive)
find . -type f -exec stat -c "%s" {} + | awk '{sum += $1} END {print sum " bytes"}'

# Show files by size with human readable format
for file in *; do
    if [ -f "$file" ]; then
        size=$(stat -c "%s" "$file")
        printf "%10s bytes - %s\n" "$(numfmt --to=iec $size)" "$file"
    fi
done | sort -hr

# Group files by size ranges
for file in **/*; do
    if [ -f "$file" ]; then
        size=$(stat -c "%s" "$file")
        if [ $size -lt 1024 ]; then
            echo "SMALL: $file"
        elif [ $size -lt 1048576 ]; then
            echo "MEDIUM: $file"
        else
            echo "LARGE: $file"
        fi
    fi
done
```

#### Storage Statistics
```bash
# Analyze file types by size
find . -type f -name "*.txt" -exec stat -c "%s" {} + | awk '{txt += $1} END {print "Text files: " txt " bytes"}'
find . -type f -name "*.jpg" -exec stat -c "%s" {} + | awk '{jpg += $1} END {print "JPG files: " jpg " bytes"}'
find . -type f -name "*.pdf" -exec stat -c "%s" {} + | awk '{pdf += $1} END {print "PDF files: " pdf " bytes"}'

# Show disk usage by file extension
find . -type f -exec stat -c "%n %s" {} \; | \
    awk -F'.' '{ext = $NF; size[ext] += $2; count[ext]++} END {
        for (e in size) printf "%s: %d files, %d bytes\n", e, count[e], size[e]
    }' | sort -k2 -nr
```

### Time-based Operations

#### File Age Analysis
```bash
# Show file ages in days
for file in *; do
    if [ -f "$file" ]; then
        age_days=$(($(($(date +%s) - $(stat -c %Y "$file"))) / 86400))
        echo "$file is $age_days days old"
    fi
done

# Find recently modified files (last N hours)
find_modified_recently() {
    local hours=${1:-24}
    local cutoff=$(($(date +%s) - hours * 3600))

    find . -type f -exec stat -c "%Y %n" {} \; | \
        while read timestamp file; do
            if [ $timestamp -gt $cutoff ]; then
                echo "$file"
            fi
        done
}

find_modified_recently 12  # Files modified in last 12 hours
```

#### Timestamp Manipulation
```bash
# Set file timestamp to match another file
copy_timestamp() {
    local source="$1"
    local target="$2"

    local access_time=$(stat -c %X "$source")
    local modify_time=$(stat -c %Y "$source")

    touch -a -d "@$access_time" "$target"
    touch -m -d "@$modify_time" "$target"

    echo "Timestamps copied from $source to $target"
}

# Show files modified on specific date
find_files_modified_on() {
    local target_date="$1"  # Format: YYYY-MM-DD
    local start_ts=$(date -d "$target_date 00:00:00" +%s)
    local end_ts=$(date -d "$target_date 23:59:59" +%s)

    find . -type f -exec stat -c "%Y %n" {} \; | \
        awk -v start="$start_ts" -v end="$end_ts" '
            $1 >= start && $1 <= end {print $2}
        '
}

find_files_modified_on "2023-12-01"
```

### System Administration

#### Log File Monitoring
```bash
# Monitor log file properties
check_log_files() {
    for logfile in /var/log/*.log; do
        if [ -f "$logfile" ]; then
            echo "=== $logfile ==="
            stat -c "Size: %s bytes, Owner: %U:%G, Modified: %y" "$logfile"

            # Check if file is growing
            size=$(stat -c %s "$logfile")
            sleep 60
            new_size=$(stat -c %s "$logfile")

            if [ $new_size -gt $size ]; then
                echo "WARNING: $logfile is actively being written to!"
            fi
        fi
    done
}

# Monitor important configuration files
monitor_config_changes() {
    local config_file="/etc/ssh/sshd_config"
    local last_change=$(stat -c %Z "$config_file")

    while true; do
        local current_change=$(stat -c %Z "$config_file")
        if [ $current_change -gt $last_change ]; then
            echo "WARNING: $config_file has been modified!"
            echo "Modification time: $(stat -c %z "$config_file")"
            last_change=$current_change
        fi
        sleep 60
    done
}
```

#### Backup Verification
```bash
# Verify backup integrity by comparing file stats
verify_backup() {
    local source="$1"
    local backup="$2"

    if [ ! -d "$source" ] || [ ! -d "$backup" ]; then
        echo "Error: Both source and backup must be directories"
        return 1
    fi

    echo "Verifying backup integrity..."

    # Compare file counts
    source_count=$(find "$source" -type f | wc -l)
    backup_count=$(find "$backup" -type f | wc -l)

    echo "Source files: $source_count"
    echo "Backup files: $backup_count"

    if [ $source_count -ne $backup_count ]; then
        echo "WARNING: File count mismatch!"
    fi

    # Compare total sizes
    source_size=$(find "$source" -type f -exec stat -c %s {} + | awk '{sum += $1} END {print sum}')
    backup_size=$(find "$backup" -type f -exec stat -c %s {} + | awk '{sum += $1} END {print sum}')

    echo "Source total size: $source_size bytes"
    echo "Backup total size: $backup_size bytes"

    if [ $source_size -ne $backup_size ]; then
        echo "WARNING: Size mismatch!"
        return 1
    fi

    echo "Backup verification completed successfully"
    return 0
}
```

## Advanced Usage

### Complex Formatting

#### JSON-like Output
```bash
# Generate JSON-like output for scripting
stat_json() {
    local file="$1"
    echo "{"
    echo "  \"name\": \"$(stat -c %n "$file")\","
    echo "  \"size\": $(stat -c %s "$file"),"
    echo "  \"type\": \"$(stat -c %F "$file")\","
    echo "  \"mode\": \"$(stat -c %a "$file")\","
    echo "  \"owner\": \"$(stat -c %U "$file")\","
    echo "  \"group\": \"$(stat -c %G "$file")\","
    echo "  \"inode\": $(stat -c %i "$file"),"
    echo "  \"access_time\": \"$(stat -c %x "$file")\","
    echo "  \"modify_time\": \"$(stat -c %y "$file")\","
    echo "  \"change_time\": \"$(stat -c %z "$file")\""
    echo "}"
}

stat_json /etc/passwd
```

#### CSV Format Output
```bash
# Generate CSV format for multiple files
stat_csv() {
    local files=("$@")
    echo "filename,size,type,mode,owner,group,inode,mtime"

    for file in "${files[@]}"; do
        if [ -e "$file" ]; then
            echo "$(stat -c "%n,%s,%F,%a,%U,%G,%i,%Y" "$file")"
        fi
    done
}

stat_csv *.txt > files_info.csv
```

#### Custom Report Format
```bash
# Generate detailed file report
generate_file_report() {
    local file="$1"

    echo "=================================================="
    echo "File Analysis Report: $file"
    echo "=================================================="
    echo "Basic Information:"
    echo "  File Type: $(stat -c %F "$file")"
    echo "  Size: $(stat -c %s "$file") bytes"
    echo "  Inode: $(stat -c %i "$file")"
    echo "  Hard Links: $(stat -c %h "$file")"
    echo ""
    echo "Ownership & Permissions:"
    echo "  Owner: $(stat -c %U "$file")"
    echo "  Group: $(stat -c %G "$file")"
    echo "  Permissions: $(stat -c %A "$file")"
    echo "  Octal: $(stat -c %a "$file")"
    echo ""
    echo "Timestamps:"
    echo "  Last Access: $(stat -c %x "$file")"
    echo "  Last Modified: $(stat -c %y "$file")"
    echo "  Last Changed: $(stat -c %z "$file")"
    echo "  Created: $(stat -c %w "$file")"
    echo ""
    echo "Storage Information:"
    echo "  Blocks: $(stat -c %b "$file")"
    echo "  Block Size: $(stat -c %B "$file")"
    echo "  I/O Block: $(stat -c %o "$file")"
    echo "  Device: $(stat -c %d "$file") (hex: $(stat -c %D "$file"))"
}

generate_file_report /etc/passwd
```

### Scripting Examples

#### File Monitoring Script
```bash
#!/bin/bash
# Comprehensive file monitoring script

MONITOR_FILES=(
    "/etc/passwd"
    "/etc/shadow"
    "/etc/sudoers"
    "/var/log/syslog"
    "/var/log/auth.log"
)

MONITOR_INTERVAL=60  # seconds

# Store initial state
initialize_monitoring() {
    echo "Initializing file monitoring..."
    for file in "${MONITOR_FILES[@]}"; do
        if [ -f "$file" ]; then
            stat -c "%Y %Z %s" "$file" > "/tmp/.${file//\//_}.state"
            echo "Monitoring $file"
        else
            echo "Warning: $file does not exist"
        fi
    done
    echo "Monitoring initialized. Checking every $MONITOR_INTERVAL seconds."
}

# Check for changes
check_changes() {
    for file in "${MONITOR_FILES[@]}"; do
        if [ -f "$file" ]; then
            local state_file="/tmp/.${file//\//_}.state"
            local current_state=$(stat -c "%Y %Z %s" "$file")
            local stored_state

            if [ -f "$state_file" ]; then
                stored_state=$(cat "$state_file")

                if [ "$current_state" != "$stored_state" ]; then
                    echo "ALERT: $file has changed!"
                    echo "  Current: $current_state"
                    echo "  Stored:  $stored_state"
                    echo "  Time: $(date)"

                    # Update stored state
                    echo "$current_state" > "$state_file"
                fi
            fi
        fi
    done
}

# Main monitoring loop
main() {
    initialize_monitoring

    while true; do
        sleep $MONITOR_INTERVAL
        check_changes
    done
}

if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
```

#### Disk Space Analysis Script
```bash
#!/bin/bash
# Advanced disk space analysis

analyze_directory() {
    local dir="$1"
    local max_depth="${2:-2}"

    echo "Analyzing directory: $dir"
    echo "========================================="

    # Total size and file count
    local total_size=$(find "$dir" -maxdepth $max_depth -type f -exec stat -c "%s" {} + 2>/dev/null | awk '{sum += $1} END {print sum+0}')
    local total_files=$(find "$dir" -maxdepth $max_depth -type f 2>/dev/null | wc -l)
    local total_dirs=$(find "$dir" -maxdepth $max_depth -type d 2>/dev/null | wc -l)

    echo "Total files: $total_files"
    echo "Total directories: $total_dirs"
    echo "Total size: $total_size bytes ($(numfmt --to=iec $total_size))"
    echo ""

    # Largest files
    echo "Largest files:"
    find "$dir" -maxdepth $max_depth -type f -exec stat -c "%s %n" {} \; 2>/dev/null | \
        sort -nr | head -10 | \
        while read size file; do
            printf "  %10s %s\n" "$(numfmt --to=iec $size)" "$file"
        done
    echo ""

    # File extensions
    echo "File types (by extension):"
    find "$dir" -maxdepth $max_depth -type f -name "*.*" -exec stat -c "%n" {} \; 2>/dev/null | \
        awk -F'.' '{ext = $NF; count[ext]++} END {
            for (e in count) printf "  %s: %d files\n", e, count[e]
        }' | sort -k2 -nr
}

# Usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory> [max_depth]"
    exit 1
fi

analyze_directory "$1" "${2:-2}"
```

### File System Analysis

#### Mount Point Analysis
```bash
# Analyze all mount points
analyze_mounts() {
    echo "Filesystem Analysis Report"
    echo "=========================="

    # Get all mount points
    while read device mountpoint fstype options; do
        if [ -d "$mountpoint" ]; then
            echo ""
            echo "Mount Point: $mountpoint"
            echo "Device: $device"
            echo "Filesystem Type: $fstype"

            if stat -f "$mountpoint" >/dev/null 2>&1; then
                local total_blocks=$(stat -f -c %b "$mountpoint")
                local free_blocks=$(stat -f -c %f "$mountpoint")
                local available_blocks=$(stat -f -c %a "$mountpoint")
                local block_size=$(stat -f -c %S "$mountpoint")

                local total_bytes=$((total_blocks * block_size))
                local free_bytes=$((free_blocks * block_size))
                local used_bytes=$((total_bytes - free_bytes))
                local usage_percent=$((used_bytes * 100 / total_bytes))

                echo "Total space: $(numfmt --to=iec $total_bytes)"
                echo "Used space: $(numfmt --to=iec $used_bytes) ($usage_percent%)"
                echo "Free space: $(numfmt --to=iec $free_bytes)"
                echo "Available to non-superuser: $(numfmt --to=iec $((available_blocks * block_size)))"
            fi
        fi
    done < /proc/mounts
}

analyze_mounts
```

#### Inode Usage Analysis
```bash
# Check inode usage across filesystems
check_inode_usage() {
    echo "Inode Usage Analysis"
    echo "===================="

    while read mountpoint; do
        if [ -d "$mountpoint" ]; then
            local total_inodes=$(stat -f -c %c "$mountpoint" 2>/dev/null)
            local free_inodes=$(stat -f -c %d "$mountpoint" 2>/dev/null)

            if [ -n "$total_inodes" ] && [ "$total_inodes" -gt 0 ]; then
                local used_inodes=$((total_inodes - free_inodes))
                local usage_percent=$((used_inodes * 100 / total_inodes))

                printf "%-20s: %5.1f%% used (%d/%d inodes)\n" \
                    "$mountpoint" "$usage_percent" "$used_inodes" "$total_inodes"

                if [ $usage_percent -gt 90 ]; then
                    echo "  WARNING: High inode usage on $mountpoint!"
                fi
            fi
        fi
    done < <(awk '{print $2}' /proc/mounts | sort -u)
}

check_inode_usage
```

## Integration and Automation

### Shell Integration

#### Custom Shell Functions
```bash
# Quick file information function
fi() {
    if [ $# -eq 0 ]; then
        echo "Usage: fi <file> [file...]"
        return 1
    fi

    for file in "$@"; do
        if [ -e "$file" ]; then
            echo "$(stat -c "%A %U:%G %12s %n" "$file")"
        else
            echo "Error: $file does not exist"
        fi
    done
}

# File timestamp comparison
ft() {
    if [ $# -ne 2 ]; then
        echo "Usage: ft <file1> <file2>"
        echo "Shows which file is newer"
        return 1
    fi

    local time1=$(stat -c %Y "$1" 2>/dev/null)
    local time2=$(stat -c %Y "$2" 2>/dev/null)

    if [ -z "$time1" ]; then
        echo "Error: $1 does not exist"
        return 1
    fi

    if [ -z "$time2" ]; then
        echo "Error: $2 does not exist"
        return 1
    fi

    if [ $time1 -gt $time2 ]; then
        echo "$1 is newer than $2"
    elif [ $time2 -gt $time1 ]; then
        echo "$2 is newer than $1"
    else
        echo "$1 and $2 have the same modification time"
    fi
}

# File size human readable
fs() {
    if [ $# -eq 0 ]; then
        echo "Usage: fs <file> [file...]"
        return 1
    fi

    for file in "$@"; do
        if [ -f "$file" ]; then
            local size=$(stat -c %s "$file")
            printf "%-30s %10s\n" "$file" "$(numfmt --to=iec $size)"
        else
            echo "Error: $file is not a regular file"
        fi
    done
}
```

### Performance Considerations

#### Efficient Batch Operations
```bash
# Efficient way to process many files
# Good: Use find with + for batch stat operations
find . -type f -exec stat -c "%s %n" {} + | sort -nr

# Avoid: This calls stat for each file individually
find . -type f -exec stat -c "%s %n" {} \; | sort -nr

# Cache stat results for repeated operations
stat_cache() {
    local cache_file="/tmp/.stat_cache.$$"
    local directory="$1"

    # Build cache
    find "$directory" -type f -exec stat -c "%i %n %s %Y" {} + > "$cache_file"

    # Use cached data for multiple operations
    echo "Largest files:"
    sort -k3 -nr "$cache_file" | head -10 | while read inode name size mtime; do
        printf "%-50s %10s\n" "$name" "$(numfmt --to=iec $size)"
    done

    echo ""
    echo "Most recently modified:"
    sort -k4 -nr "$cache_file" | head -10 | while read inode name size mtime; do
        printf "%-50s %s\n" "$name" "$(date -d "@$mtime")"
    done

    rm -f "$cache_file"
}

stat_cache .
```

#### Large File System Optimization
```bash
# Optimize stat operations on large directories
efficient_analysis() {
    local dir="$1"
    local limit="$2"

    # Limit search scope first
    echo "Analysis limited to first $limit files..."

    # Use find with maxdepth and head to limit results
    find "$dir" -maxdepth 3 -type f -print0 | head -z -n "$limit" | \
        xargs -0 stat -c "%s %n" | \
        sort -nr | \
        head -20
}

# Parallel processing with GNU parallel (if available)
parallel_stat() {
    export -f stat_file_info
    find . -type f | parallel -j 4 stat_file_info {}
}

stat_file_info() {
    local file="$1"
    printf "%s,%d,%s,%s\n" "$file" "$(stat -c %s "$file")" "$(stat -c %U "$file")" "$(stat -c %Y "$file")"
}
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check file accessibility
check_file_access() {
    local file="$1"

    echo "Checking access to: $file"

    # Basic existence check
    if [ ! -e "$file" ]; then
        echo "Error: File does not exist"
        return 1
    fi

    # Permission check
    if [ ! -r "$file" ]; then
        echo "Warning: No read permission"
        # Try with sudo if available
        if command -v sudo >/dev/null; then
            echo "Attempting with sudo..."
            sudo stat "$file"
            return $?
        else
            return 1
        fi
    fi

    # Normal stat execution
    stat "$file"
}

# Handle special files
check_special_files() {
    # Proc filesystem
    stat /proc/cpuinfo
    stat /proc/meminfo

    # Sysfs
    stat /sys/block/sda/size

    # Device files
    stat /dev/null
    stat /dev/zero
    stat /dev/random
}
```

#### Symbolic Link Issues
```bash
# Analyze symbolic links
analyze_symlinks() {
    echo "Symbolic Link Analysis"
    echo "======================"

    find . -type l | while read link; do
        echo "Link: $link"
        echo "  Target: $(readlink "$link")"
        echo "  Link info: $(stat -c "%F %A %s" "$link")"

        if [ -e "$link" ]; then
            echo "  Target info: $(stat -L -c "%F %A %s" "$link")"
        else
            echo "  Target: BROKEN LINK"
        fi
        echo ""
    done
}

# Find broken symbolic links
find_broken_links() {
    find . -type l ! -exec test -e {} \;
}
```

#### Performance Issues
```bash
# Diagnose slow stat operations
diagnose_stat_performance() {
    local directory="$1"

    echo "Performance Diagnosis for: $directory"

    # Time different approaches
    echo "Method 1: Individual stat calls"
    time find "$directory" -maxdepth 1 -type f -exec stat -c "%s %n" {} \; | wc -l

    echo "Method 2: Batch stat calls"
    time find "$directory" -maxdepth 1 -type f -exec stat -c "%s %n" {} + | wc -l

    echo "Method 3: xargs approach"
    time find "$directory" -maxdepth 1 -type f -print0 | xargs -0 stat -c "%s %n" | wc -l

    # Check filesystem cache effects
    echo "First run (cold cache):"
    time stat "$directory"

    echo "Second run (warm cache):"
    time stat "$directory"
}
```

## Related Commands

- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file ownership
- [`touch`](/docs/commands/file-management/touch) - Change file timestamps
- [`du`](/docs/commands/file-management/du) - Display disk usage statistics
- [`df`](/docs/commands/file-management/df) - Display free disk space
- [`readlink`](/docs/commands/file-management/readlink) - Display symbolic link target
- [`lsof`](/docs/commands/system-information/lsof) - List open files

## Best Practices

1. **Use appropriate output formats for scripting**:
   - `-c "%s %n"` for simple size and name extraction
   - `-c "%Y"` for Unix timestamps in calculations
   - `-t` for machine-readable output

2. **Handle symbolic links carefully**:
   - Use `-L` to follow links when you need target information
   - Default behavior shows link information, not target

3. **Choose the right timestamp format**:
   - `%x`, `%y`, `%z` for human-readable timestamps
   - `%X`, `%Y`, `%Z` for Unix timestamps (better for calculations)

4. **Be efficient with large file sets**:
   - Use `find -exec stat {} +` for batch operations
   - Cache stat results when using the same data multiple times

5. **Check file accessibility**:
   - Verify file existence and permissions before running stat
   - Handle broken symbolic links appropriately

6. **Use filesystem mode for mount point information**:
   - `stat -f` for filesystem statistics and mount point analysis

7. **Handle special files correctly**:
   - Device files, pipes, and sockets have different stat output
   - Some pseudo-files in /proc and /sys have unique behaviors

8. **Consider cross-platform compatibility**:
   - Some format specifiers may vary between systems
   - Test scripts on target platforms

9. **Use appropriate precision**:
   - Human-readable formats for display
   - Raw values for calculations and comparisons

10. **Handle errors gracefully**:
    - Check for file existence
    - Handle permission denied errors
    - Validate command parameters

## Performance Tips

1. **Batch operations are faster**:
   - `find -exec stat {} +` is much faster than `find -exec stat {} \;`
   - Use xargs with -0 for handling filenames with spaces

2. **Cache expensive operations**:
   - Store stat results when using them multiple times
   - Use temporary files for complex analyses

3. **Limit search scope**:
   - Use `-maxdepth` with find for large directory trees
   - Process files in manageable batches

4. **Choose appropriate timestamp formats**:
   - Unix timestamps (`%Y`) are faster for comparisons
   - Human-readable formats require additional processing

5. **Use filesystem-specific options**:
   - `-f` for filesystem information is more efficient than other methods

6. **Avoid redundant calls**:
   - Extract all needed information in a single stat call
   - Use comprehensive format strings rather than multiple calls

7. **Monitor system resources**:
   - Large file operations can be memory-intensive
   - Consider using nice for low-priority batch operations

8. **Parallel processing**:
   - Use GNU parallel or xargs -P for independent file operations
   - Be careful with system resource limits

The `stat` command provides comprehensive file and filesystem metadata that goes far beyond basic directory listings. Its flexible formatting options make it invaluable for scripting, system administration, file auditing, and detailed file analysis tasks in Linux environments. When used effectively, stat can replace multiple other commands and provide precise control over file metadata extraction and manipulation.