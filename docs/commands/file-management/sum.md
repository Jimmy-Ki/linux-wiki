---
title: sum - Checksum and Block Count Utility
sidebar_label: sum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sum - Checksum and Block Count Utility

The `sum` command is a traditional Unix utility that calculates and displays checksum values and block counts for files. It uses a simple algorithm to generate a 16-bit checksum and counts the number of 1024-byte blocks in the file. While considered obsolete for security purposes compared to modern alternatives like `md5sum` or `sha256sum`, `sum` remains useful for quick integrity checks and compatibility with legacy systems. The command is particularly valuable in shell scripts where a fast, lightweight checksum is needed and cryptographic security is not a requirement.

## Basic Syntax

```bash
sum [OPTION]... [FILE]...
```

## Common Options

### Algorithm Selection
- `-r` - Use the default BSD sum algorithm (16-bit checksum)
- `-s, --sysv` - Use System V sum algorithm (512-byte blocks)

### Output Format
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Checksum Operations

#### Default BSD Algorithm
```bash
# Calculate checksum and block count for a single file
sum document.txt

# Process multiple files
sum file1.txt file2.txt file3.txt

# Read from standard input
cat data.txt | sum

# Use with wildcards
sum *.log

# Checksum of binary files
sum program executable
```

#### System V Algorithm
```bash
# Use System V algorithm with 512-byte blocks
sum -s datafile

# Compare BSD vs System V results
sum file.txt
sum -s file.txt

# Script to show both algorithms
echo "BSD checksum:"
sum file.txt
echo "System V checksum:"
sum -s file.txt
```

### File Management Operations

#### File Verification
```bash
# Verify file integrity after transfer
# Generate checksum before transfer
sum original_file.txt > checksums.txt

# Verify after transfer
sum transferred_file.txt
# Compare with stored values

# Batch verification
for file in *.conf; do
    echo "Checksum for $file:"
    sum "$file"
done

# Create checksum report
sum *.data > report_checksums.txt
echo "Checksum report generated at $(date)" >> report_checksums.txt
```

#### Change Detection
```bash
# Monitor file changes
sum config.txt > config.sum.bak

# Later check for changes
if ! sum config.txt | diff - config.sum.bak > /dev/null; then
    echo "config.txt has been modified!"
fi

# Log file changes
monitor_changes() {
    local file="$1"
    local prev_sum=$(sum "$file" 2>/dev/null || echo "0 0")

    while true; do
        current_sum=$(sum "$file" 2>/dev/null || echo "0 0")
        if [ "$current_sum" != "$prev_sum" ]; then
            echo "$(date): $file changed - $current_sum"
            prev_sum="$current_sum"
        fi
        sleep 5
    done
}
```

### System Administration

#### Backup Verification
```bash
# Verify backup integrity
create_backup_checksums() {
    local backup_dir="$1"
    local checksum_file="${backup_dir}/backup_checksums.txt"

    echo "# Backup checksums created on $(date)" > "$checksum_file"
    find "$backup_dir" -type f -exec sum {} + >> "$checksum_file"
    echo "Backup checksums saved to $checksum_file"
}

# Verify backup against checksums
verify_backup() {
    local backup_dir="$1"
    local checksum_file="${backup_dir}/backup_checksums.txt"

    if [ ! -f "$checksum_file" ]; then
        echo "Checksum file not found: $checksum_file"
        return 1
    fi

    echo "Verifying backup integrity..."
    # This is a simplified verification
    # In practice, you'd parse and compare checksums
    find "$backup_dir" -type f -exec sum {} + > current_checksums.txt

    if diff "$checksum_file" current_checksums.txt > /dev/null; then
        echo "Backup verification successful!"
        rm current_checksums.txt
        return 0
    else
        echo "Backup verification failed!"
        echo "Differences found in checksums"
        return 1
    fi
}
```

#### Configuration Management
```bash
# Checksum configuration files
checksum_configs() {
    local config_dir="/etc"
    local checksum_file="/var/log/config_checksums.log"

    {
        echo "Configuration checksums - $(date)"
        echo "================================"
        find "$config_dir" -name "*.conf" -type f -exec sum {} + | sort
    } > "$checksum_file"

    echo "Configuration checksums logged to $checksum_file"
}

# Monitor configuration changes
monitor_configs() {
    local baseline="/var/log/config_baseline.sum"
    local current="/var/log/config_current.sum"

    # Create baseline if it doesn't exist
    if [ ! -f "$baseline" ]; then
        find /etc -name "*.conf" -type f -exec sum {} + | sort > "$baseline"
        echo "Configuration baseline created"
        return 0
    fi

    # Generate current checksums
    find /etc -name "*.conf" -type f -exec sum {} + | sort > "$current"

    # Compare with baseline
    if ! diff "$baseline" "$current" > /dev/null; then
        echo "Configuration changes detected:"
        diff "$baseline" "$current" | grep '^<\|>' | head -10
    else
        echo "No configuration changes detected"
    fi
}
```

### Development and Scripting

#### Data Integrity Scripts
```bash
# File integrity checker script
#!/bin/bash
check_file_integrity() {
    local directory="$1"
    local database="$2"

    if [ -z "$directory" ] || [ -z "$database" ]; then
        echo "Usage: $0 <directory> <checksum_database>"
        return 1
    fi

    # Create checksum database if it doesn't exist
    if [ ! -f "$database" ]; then
        echo "Creating checksum database..."
        find "$directory" -type f -exec sum {} + > "$database"
        echo "Database created: $database"
        return 0
    fi

    # Check for changes
    echo "Checking file integrity..."
    local changes=0

    while IFS= read -r checksum_line; do
        local expected=$(echo "$checksum_line" | awk '{print $1 " " $2}')
        local file=$(echo "$checksum_line" | awk '{for(i=3;i<=NF;i++) printf "%s ", $i; print ""}')
        file=${file% }

        if [ -f "$file" ]; then
            local current=$(sum "$file" | awk '{print $1 " " $2}')
            if [ "$expected" != "$current" ]; then
                echo "CHANGED: $file"
                ((changes++))
            fi
        else
            echo "MISSING: $file"
            ((changes++))
        fi
    done < "$database"

    if [ $changes -eq 0 ]; then
        echo "All files verified successfully"
    else
        echo "$changes files have issues"
    fi
}
```

#### Build System Integration
```bash
# Checksum-based build dependencies
check_build_dependencies() {
    local dep_file="build_deps.sum"
    local sources="src/*.c include/*.h"

    # Check if dependency file exists
    if [ ! -f "$dep_file" ]; then
        echo "Creating dependency checksums..."
        sum $sources > "$dep_file"
        return 1  # Need to build
    fi

    # Check if sources changed
    local current_deps=$(tempfile)
    sum $sources > "$current_deps"

    if ! diff "$dep_file" "$current_deps" > /dev/null; then
        echo "Source files changed, rebuilding..."
        mv "$current_deps" "$dep_file"
        return 1  # Need to rebuild
    else
        rm "$current_deps"
        echo "No changes detected, skipping build"
        return 0  # No build needed
    fi
}

# Use in Makefile
build: check_deps
    @echo "Building project..."
    $(CC) $(CFLAGS) -o myapp src/*.c

check_deps:
    @./check_deps.sh
```

### Advanced Usage

#### Performance Monitoring
```bash
# Monitor file system changes
filesystem_monitor() {
    local target_dir="$1"
    local interval="${2:-60}"  # Default 60 seconds
    local log_file="/var/log/fs_monitor.log"

    echo "Starting filesystem monitor for $target_dir"
    echo "Interval: $interval seconds"
    echo "Log file: $log_file"

    local previous_checksum=$(find "$target_dir" -type f -exec sum {} + 2>/dev/null | wc -l)

    while true; do
        local current_checksum=$(find "$target_dir" -type f -exec sum {} + 2>/dev/null | wc -l)
        local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

        if [ "$current_checksum" != "$previous_checksum" ]; then
            echo "[$timestamp] Filesystem activity detected in $target_dir" >> "$log_file"
            echo "  Previous count: $previous_checksum" >> "$log_file"
            echo "  Current count: $current_checksum" >> "$log_file"
            previous_checksum="$current_checksum"
        fi

        sleep "$interval"
    done
}
```

#### Data Migration Verification
```bash
# Verify data migration integrity
verify_migration() {
    local source="$1"
    local destination="$2"

    if [ ! -d "$source" ] || [ ! -d "$destination" ]; then
        echo "Both source and destination must be directories"
        return 1
    fi

    echo "Verifying migration from $source to $destination"

    # Generate checksums for both locations
    local source_checksums=$(tempfile)
    local dest_checksums=$(tempfile)

    echo "Generating source checksums..."
    find "$source" -type f -exec sum {} + | sort > "$source_checksums"

    echo "Generating destination checksums..."
    # Adjust paths for comparison
    find "$destination" -type f -exec sum {} + |
        sed "s|$destination|$source|g" | sort > "$dest_checksums"

    # Compare checksums
    if diff "$source_checksums" "$dest_checksums" > /dev/null; then
        echo "Migration verification: SUCCESS"
        echo "All files transferred with correct checksums"
        result=0
    else
        echo "Migration verification: FAILED"
        echo "Differences found:"
        diff "$source_checksums" "$dest_checksums" | head -20
        result=1
    fi

    # Cleanup
    rm -f "$source_checksums" "$dest_checksums"

    return $result
}
```

## Practical Examples

### Log Analysis

#### Log File Integrity
```bash
# Monitor log file integrity
monitor_log_integrity() {
    local log_dir="/var/log"
    local integrity_file="/var/log/log_integrity.log"

    echo "Starting log file integrity monitoring..."

    # Baseline checksums
    {
        echo "Log integrity baseline - $(date)"
        find "$log_dir" -name "*.log" -type f -exec sum {} +
    } > "$integrity_file"

    # Periodic verification
    while true; do
        sleep 3600  # Check every hour
        echo "$(date): Checking log integrity..." >> "$integrity_file"
        find "$log_dir" -name "*.log" -type f -exec sum {} + >> "$integrity_file"
    done
}

# Compress and checksum old logs
archive_logs() {
    local log_dir="/var/log"
    local archive_dir="/var/log/archive"
    local days_old=7

    find "$log_dir" -name "*.log" -mtime +$days_old -type f | while read log; do
        local basename=$(basename "$log")
        local archive_file="$archive_dir/${basename}.sum"

        echo "Archiving $log"
        sum "$log" > "$archive_file"
        gzip "$log"
        echo "Checksum saved to $archive_file"
    done
}
```

### Batch Processing

#### Directory Comparison
```bash
# Compare two directories
compare_directories() {
    local dir1="$1"
    local dir2="$2"

    if [ ! -d "$dir1" ] || [ ! -d "$dir2" ]; then
        echo "Both arguments must be directories"
        return 1
    fi

    echo "Comparing directories:"
    echo "Source: $dir1"
    echo "Target: $dir2"
    echo

    # Generate checksums
    local dir1_sums=$(tempfile)
    local dir2_sums=$(tempfile)

    find "$dir1" -type f -exec sum {} + | sort > "$dir1_sums"
    find "$dir2" -type f -exec sum {} + | sort > "$dir2_sums"

    # Statistics
    local dir1_count=$(wc -l < "$dir1_sums")
    local dir2_count=$(wc -l < "$dir2_sums")

    echo "File count in $dir1: $dir1_count"
    echo "File count in $dir2: $dir2_count"
    echo

    # Compare checksums
    local common_count=$(comm -12 "$dir1_sums" "$dir2_sums" | wc -l)
    local dir1_only=$(comm -23 "$dir1_sums" "$dir2_sums" | wc -l)
    local dir2_only=$(comm -13 "$dir1_sums" "$dir2_sums" | wc -l)

    echo "Files with same checksum: $common_count"
    echo "Files only in $dir1: $dir1_only"
    echo "Files only in $dir2: $dir2_only"

    if [ $dir1_only -gt 0 ]; then
        echo
        echo "Files only in $dir1:"
        comm -23 "$dir1_sums" "$dir2_sums" | head -5
    fi

    if [ $dir2_only -gt 0 ]; then
        echo
        echo "Files only in $dir2:"
        comm -13 "$dir1_sums" "$dir2_sums" | head -5
    fi

    # Cleanup
    rm -f "$dir1_sums" "$dir2_sums"
}
```

## Related Commands

- [`cksum`](/docs/commands/file-management/cksum) - CRC checksum and byte count
- [`md5sum`](/docs/commands/file-management/md5sum) - MD5 cryptographic checksum
- [`sha256sum`](/docs/commands/file-management/sha256sum) - SHA-256 cryptographic checksum
- [`sha1sum`](/docs/commands/file-management/sha1sum) - SHA-1 cryptographic checksum
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`cmp`](/docs/commands/file-management/cmp) - Compare files byte by byte
- [`find`](/docs/commands/file-management/find) - Find files and perform actions
- [`wc`](/docs/commands/file-management/wc) - Count lines, words, and bytes

## Best Practices

1. **Use appropriate checksum tools** - `sum` is fine for non-critical integrity checks, but use cryptographic tools for security-sensitive applications
2. **Document checksum methods** - Always record which algorithm (BSD vs System V) was used
3. **Store checksums securely** - Keep checksum files separate from the data they verify
4. **Regular verification** - Periodically verify important files against stored checksums
5. **Automate monitoring** - Use `sum` in scripts to monitor file changes automatically
6. **Combine with other tools** - Use `sum` alongside `find`, `diff`, and other file utilities
7. **Consider file permissions** - Ensure checksum files have appropriate access controls
8. **Backup checksums** - Keep backup copies of important checksum databases

## Performance Tips

1. **Fast execution** - `sum` is much faster than cryptographic checksums for large numbers of files
2. **Low resource usage** - Minimal memory and CPU requirements compared to MD5/SHA tools
3. **Batch processing** - Process multiple files in a single command for efficiency
4. **Pipe usage** - Can read from stdin, enabling pipeline integration
5. **Script optimization** - Ideal for shell scripts where speed is more important than cryptographic security
6. **Regular file monitoring** - Lightweight enough for frequent integrity checks
7. **Legacy system compatibility** - Works consistently across different Unix-like systems

## Algorithm Details

### BSD Sum Algorithm
- Uses a 16-bit checksum based on rotate-right operations
- Counts 1024-byte blocks
- Compatible with traditional Unix systems
- Default algorithm on most Linux distributions

### System V Sum Algorithm
- Uses a different 16-bit checksum calculation
- Counts 512-byte blocks instead of 1024-byte blocks
- May produce different results for the same file
- Useful for compatibility with System V-based systems

The `sum` command, while simple, provides a reliable and efficient method for basic file integrity checking and change detection in Unix/Linux environments. Its speed and low resource requirements make it particularly suitable for shell scripting and automated monitoring tasks where cryptographic security is not the primary concern.