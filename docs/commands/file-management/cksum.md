---
title: cksum - Output CRC checksum and byte counts
sidebar_label: cksum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cksum - Output CRC checksum and byte counts

The `cksum` command is a file integrity verification utility that calculates and displays the CRC (Cyclic Redundancy Check) checksum, byte count, and filename for specified files. It uses the standard POSIX CRC-32 algorithm to generate a 32-bit checksum value, making it an essential tool for verifying file integrity, detecting data corruption, and comparing files across different systems. Unlike other checksum tools like `md5sum` or `sha256sum`, `cksum` is guaranteed to be available on all POSIX-compliant systems, making it the most portable option for basic file verification tasks.

## Basic Syntax

```bash
cksum [FILE]...
cksum [OPTION]
```

## Output Format

The command output consists of three columns for each file:
- **CRC checksum** (32-bit integer in decimal)
- **Byte count** (file size in bytes)
- **Filename** (or "-" for standard input)

## Common Options

### Help and Version
- `--help` - Display help information and exit
- `--version` - Output version information and exit

### Behavior Options
- No additional options are available in the standard POSIX implementation

## Usage Examples

### Basic File Verification

#### Single File Checksum
```bash
# Calculate checksum for a single file
cksum document.txt
# Output: 4038438805 1024 document.txt

# Calculate checksum for a binary file
cksum program.bin
# Output: 1913406412 5242880 program.bin

# Calculate checksum for a large file
cksum video.mp4
# Output: 3746593278 1048576000 video.mp4
```

#### Multiple Files Checksum
```bash
# Calculate checksums for multiple files
cksum file1.txt file2.txt file3.txt
# Output:
# 3149032861 128 file1.txt
# 1675896119 256 file2.txt
# 2790238775 512 file3.txt

# Calculate checksums using wildcard
cksum *.log
# Output:
# 3598237141 2048 access.log
# 1992478154 1024 error.log
# 3462795845 4096 application.log
```

#### Standard Input Processing
```bash
# Calculate checksum for stdin
echo "Hello World" | cksum
# Output: 4284294367 12

# Process text from stdin
cat << EOF | cksum
This is a test
Multiple lines
of text
EOF
# Output: 2955029631 42
```

### File Integrity Verification

#### Verify File Transfer
```bash
# Generate checksum before transfer
cksum important_file.dat > checksums.txt

# After transfer, verify integrity
cksum important_file.dat | cmp - checksums.txt
# No output means files match

# Script for verification
cksum transferred_file.dat | grep "$(awk '{print $1" "$2}' checksums.txt)"
```

#### Compare Two Files
```bash
# Compare files by checksum
if [ "$(cksum file1.txt | awk '{print $1}')" = "$(cksum file2.txt | awk '{print $1}')" ]; then
    echo "Files are identical"
else
    echo "Files differ"
fi

# Multiple file comparison
cksum file1.txt file2.txt file3.txt | awk '{print $1}' | sort | uniq -d
```

#### Generate Checksum Manifest
```bash
# Create checksum manifest for directory
find /data -type f -exec cksum {} + > directory_manifest.cksum

# Create checksum manifest with relative paths
cd /source && find . -type f -exec cksum {} + > ../backup_manifest.cksum

# Create checksum manifest sorted by filename
find . -type f -exec cksum {} + | sort -k3 > sorted_manifest.cksum
```

### Data Corruption Detection

#### Verify Archive Integrity
```bash
# Verify tar archive before extraction
cksum archive.tar.gz > archive_checksum.txt
tar -tzf archive.tar.gz > /dev/null && echo "Archive is readable"

# After transfer, verify archive integrity
if cksum archive.tar.gz | grep -q "$(cat archive_checksum.txt)"; then
    echo "Archive integrity verified"
else
    echo "Archive corrupted!"
fi
```

#### Monitor File Changes
```bash
# Store initial checksum
cksum config.conf > config_checksum.cksum

# Monitor for changes
if cksum config.conf | cmp - config_checksum.cksum; then
    echo "Config file unchanged"
else
    echo "Config file has been modified!"
fi

# Continuous monitoring
while true; do
    current_cksum=$(cksum monitored_file.txt)
    if [ "$current_cksum" != "$previous_cksum" ]; then
        echo "File changed: $(date)"
        previous_cksum="$current_cksum"
    fi
    sleep 60
done
```

#### Database Backup Verification
```bash
# Generate checksum for database dump
mysqldump -u root -p database > backup.sql
cksum backup.sql > backup_sql.cksum

# Verify restored backup
mysql -u root -p database < backup.sql
cksum backup.sql | cmp - backup_sql.cksum && echo "Backup verified"
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# Backup and verify system configurations
for config in /etc/*.conf; do
    backup_dir="/backup/etc_configs"
    mkdir -p "$backup_dir"
    cp "$config" "$backup_dir/"
    cksum "$config" >> "$backup_dir/checksums.cksum"
done

# Verify configuration integrity
cd /backup/etc_configs
while read cksum size filename; do
    if [ -f "/etc/$filename" ]; then
        current=$(cksum "/etc/$filename")
        if [ "$current" != "$cksum $size $filename" ]; then
            echo "Configuration changed: $filename"
        fi
    fi
done < checksums.cksum
```

#### System Update Verification
```bash
# Verify package files after update
rpm -qa | while read package; do
    rpm -V "$package" 2>/dev/null
done | cksum > package_verification.cksum

# Create system file manifest
find /bin /sbin /usr/bin /usr/sbin -type f -exec cksum {} + > system_files.cksum
```

#### Log File Integrity
```bash
# Rotate logs with integrity verification
log_dir="/var/log"
backup_dir="/backup/logs"
datestamp=$(date +%Y%m%d)

for logfile in "$log_dir"/*.log; do
    if [ -f "$logfile" ]; then
        basename=$(basename "$logfile")
        backup_file="$backup_dir/${basename}.${datestamp}"

        # Copy and verify
        cp "$logfile" "$backup_file"
        cksum "$logfile" > "${backup_file}.cksum"

        # Truncate original log
        > "$logfile"

        echo "Rotated and verified: $basename"
    fi
done
```

### Development Workflow

#### Source Code Verification
```bash
# Verify source code distribution
for file in $(find . -name '*.c' -o -name '*.h' -o -name '*.py'); do
    cksum "$file" >> source_checksums.cksum
done

# Compare development vs production
cksum $(find dev/ -type f) > dev_checksums.cksum
cksum $(find prod/ -type f) > prod_checksums.cksum

diff dev_checksums.cksum prod_checksums.cksum
```

#### Build Artifact Verification
```bash
# Verify build artifacts
build_dir="build"
source_dir="src"

# Generate checksums for built artifacts
find "$build_dir" -type f -exec cksum {} + > build_artifacts.cksum

# Verify reproducible builds
make clean && make
cksum $(find "$build_dir" -type f) > new_build.cksum

if cmp -s build_artifacts.cksum new_build.cksum; then
    echo "Build is reproducible"
else
    echo "Build differs from previous"
fi
```

#### Dependency Verification
```bash
# Verify third-party dependencies
vendor_dir="vendor"
checksum_file="vendor_checksums.cksum"

# Generate checksums for vendor files
find "$vendor_dir" -type f ! -name '*.cksum' -exec cksum {} + > "$checksum_file"

# Verify before deployment
if cksum $(find "$vendor_dir" -type f ! -name '*.cksum') | cmp - "$checksum_file"; then
    echo "Vendor dependencies verified"
else
    echo "Vendor dependencies have changed!"
    exit 1
fi
```

### Data Processing

#### Data Migration Verification
```bash
# Verify data migration between systems
source_dir="/data/old_system"
target_dir="/data/new_system"

# Generate source checksums
find "$source_dir" -type f -exec cksum {} + > source_data.cksum

# Generate target checksums (with path adjustment)
find "$target_dir" -type f -exec cksum {} + | sed "s|$target_dir|$source_dir|" > target_data.cksum

# Compare checksums
diff source_data.cksum target_data.cksum
echo "Migration verification complete"
```

#### Scientific Data Integrity
```bash
# Verify research data integrity
data_dir="/research/experiment_data"
manifest_file="data_integrity.cksum"

# Create comprehensive manifest
cd "$data_dir"
find . -type f \( -name '*.dat' -o -name '*.csv' -o -name '*.json' \) -exec cksum {} + > "$manifest_file"

# Verify data before analysis
if cksum $(find . -name '*.dat') | cmp -s - <(grep '\.dat$' "$manifest_file"); then
    echo "Data integrity verified, starting analysis"
else
    echo "Data corruption detected!"
    exit 1
fi
```

#### Backup Verification
```bash
# Automated backup verification
backup_source="/home/user/documents"
backup_target="/backup/documents"

# Generate source manifest
find "$backup_source" -type f -exec cksum {} + > source_manifest.cksum

# Generate backup manifest
find "$backup_target" -type f -exec cksum {} + | sed "s|$backup_target|$backup_source|" > backup_manifest.cksum

# Verify backup completeness
if cmp -s source_manifest.cksum backup_manifest.cksum; then
    echo "Backup verified successfully"
else
    echo "Backup verification failed!"
    diff source_manifest.cksum backup_manifest.cksum
fi
```

## Advanced Usage

### Batch Processing

#### Recursive Directory Processing
```bash
# Process entire directory tree
cksum $(find . -type f) > complete_tree.cksum

# Process specific file types
cksum $(find . -name '*.txt' -o -name '*.pdf') > documents.cksum

# Exclude certain files
cksum $(find . -type f ! -name '*.tmp' ! -name '*.log') > important_files.cksum

# Process large number of files efficiently
find . -type f -print0 | xargs -0 cksum > all_files.cksum
```

#### Parallel Processing
```bash
# Parallel checksum calculation for large datasets
find /data -type f | parallel -j 4 cksum {} > parallel_checksums.cksum

# Process by file size groups
find /data -size +100M -exec cksum {} + > large_files.cksum &
find /data -size -100M -exec cksum {} + > small_files.cksum &
wait

# Parallel directory processing
for dir in /data/dir*; do
    (find "$dir" -type f -exec cksum {} + > "${dir##*/}.cksum") &
done
wait
```

### Integration with Other Tools

#### Combine with File Metadata
```bash
# Create comprehensive file inventory
for file in $(find . -type f); do
    cksum "$file" | awk -v fname="$file" '{
        size = $2;
        cksum_val = $1;
        cmd = "stat -c \"%y,%s,%U,%G\" \"" fname "\"";
        cmd | getline stats;
        close(cmd);
        print cksum_val, size, fname, stats;
    }'
done > complete_inventory.cksum
```

#### Network Transfer Verification
```bash
# Verify file transfer with remote checksum
remote_file="/remote/path/file.dat"
local_file="file.dat"

# Calculate remote checksum (SSH)
remote_cksum=$(ssh user@remote "cksum $remote_file" | awk '{print $1}')

# Calculate local checksum
local_cksum=$(cksum "$local_file" | awk '{print $1}')

# Compare
if [ "$remote_cksum" = "$local_cksum" ]; then
    echo "Transfer verified successfully"
else
    echo "Transfer verification failed"
fi
```

### Performance Optimization

#### Memory-Efficient Processing
```bash
# Process files sequentially for memory efficiency
find /large/dataset -type f | while read file; do
    cksum "$file" >> large_dataset.cksum
done

# Process in batches to manage system load
batch_size=100
file_count=0
batch_num=1

find /data -type f | while read file; do
    cksum "$file" >> "batch_${batch_num}.cksum"
    ((file_count++))

    if [ $((file_count % batch_size)) -eq 0 ]; then
        ((batch_num++))
    fi
done
```

#### Selective Processing
```bash
# Process only recently modified files
find /data -type f -mtime -7 -exec cksum {} + > recent_files.cksum

# Process files by size range
find /data -type f -size +1M -size -100M -exec cksum {} + > medium_files.cksum

# Process by extension with priority
cksum $(find . -name '*.zip') > archives.cksum &
cksum $(find . -name '*.pdf') > documents.cksum &
cksum $(find . -name '*.jpg') > images.cksum &
wait
```

## Integration and Automation

### Shell Scripts

#### File Integrity Monitor
```bash
#!/bin/bash
# Comprehensive file integrity monitoring system

MONITOR_DIR="/etc/config"
STATE_FILE="/var/lib/file_monitor.state"
ALERT_EMAIL="admin@example.com"

# Load previous state
declare -A previous_checksums
if [ -f "$STATE_FILE" ]; then
    while read checksum size file; do
        previous_checksums["$file"]="$checksum $size"
    done < "$STATE_FILE"
fi

# Generate new checksums
declare -A current_checksums
while IFS= read -r -d '' file; do
    checksum_info=$(cksum "$file")
    file_name=$(echo "$checksum_info" | awk '{print $3}')
    current_checksums["$file_name"]="$checksum_info"
done < <(find "$MONITOR_DIR" -type f -print0)

# Compare and report changes
changes=0
for file in "${!current_checksums[@]}"; do
    current="${current_checksums[$file]}"
    previous="${previous_checksums[$file]:-}"

    if [ "$current" != "$previous" ]; then
        echo "Change detected in: $file"
        echo "Previous: $previous"
        echo "Current: $current"
        echo "---"
        ((changes++))
    fi
done

# Check for deleted files
for file in "${!previous_checksums[@]}"; do
    if [ -z "${current_checksums[$file]:-}" ]; then
        echo "File deleted: $file"
        ((changes++))
    fi
done

# Save new state
> "$STATE_FILE"
for file in "${!current_checksums[@]}"; do
    echo "${current_checksums[$file]}" >> "$STATE_FILE"
done

# Send alert if changes detected
if [ $changes -gt 0 ]; then
    echo "$changes changes detected in $MONITOR_DIR" | \
        mail -s "File Integrity Alert" "$ALERT_EMAIL"
fi
```

#### Backup Verification Script
```bash
#!/bin/bash
# Automated backup verification system

SOURCE_DIR="/data"
BACKUP_DIR="/backup"
LOG_FILE="/var/log/backup_verify.log"
REPORT_FILE="/tmp/backup_report.txt"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

verify_backup() {
    local source="$1"
    local backup="$2"
    local relative_path="${source#$SOURCE_DIR/}"

    if [ -f "$source" ] && [ -f "$backup" ]; then
        source_cksum=$(cksum "$source" | awk '{print $1}')
        backup_cksum=$(cksum "$backup" | awk '{print $1}')

        if [ "$source_cksum" = "$backup_cksum" ]; then
            echo "OK: $relative_path"
            return 0
        else
            echo "FAIL: $relative_path - checksum mismatch"
            return 1
        fi
    elif [ -f "$source" ] && [ ! -f "$backup" ]; then
        echo "MISSING: $relative_path"
        return 1
    fi
}

# Start verification
log "Starting backup verification"

# Generate report header
cat > "$REPORT_FILE" << EOF
Backup Verification Report
=========================
Date: $(date)
Source: $SOURCE_DIR
Backup: $BACKUP_DIR

EOF

# Verify files
errors=0
success=0
total=0

while IFS= read -r -d '' source_file; do
    relative_path="${source_file#$SOURCE_DIR/}"
    backup_file="$BACKUP_DIR/$relative_path"

    ((total++))
    if verify_backup "$source_file" "$backup_file"; then
        ((success++))
    else
        ((errors++))
    fi
done < <(find "$SOURCE_DIR" -type f -print0)

# Add summary to report
cat >> "$REPORT_FILE" << EOF
Summary:
-------
Total files: $total
Successful: $success
Failed: $errors

EOF

# Send report
if [ $errors -gt 0 ]; then
    cat "$REPORT_FILE" | mail -s "Backup Verification Failed" admin@example.com
    log "Backup verification completed with $errors errors"
else
    log "Backup verification completed successfully"
fi
```

## Troubleshooting

### Common Issues

#### Memory Usage with Large Files
```bash
# For very large files, process in chunks
large_file="huge_file.dat"
chunk_size=104857600  # 100MB

split -b $chunk_size "$large_file" chunk_
for chunk in chunk_*; do
    cksum "$chunk" >> "${large_file}_checksums.cksum"
done
rm chunk_*

# Use memory monitoring during checksum calculation
/usr/bin/time -v cksum large_file.dat 2>&1 | grep "Maximum resident set size"
```

#### Permission Issues
```bash
# Handle permission denied gracefully
find / -type f -exec cksum {} + 2>/dev/null > accessible_files.cksum

# Separate inaccessible files
find / -type f ! -readable 2>/dev/null > inaccessible_files.list

# Use sudo for system files if available
if command -v sudo >/dev/null; then
    sudo find /etc -type f -exec cksum {} + > system_files.cksum
fi
```

#### Performance Bottlenecks
```bash
# Identify slow operations
time cksum large_dataset.tar

# Optimize disk I/O by avoiding multiple scans
find /data -type f -exec cksum {} + > all_at_once.cksum

# Use appropriate nice level
nice -n 10 find /large_dataset -type f -exec cksum {} + > background_checksums.cksum
```

#### Network File System Issues
```bash
# For NFS mounts, disable attribute caching
export NFS_ATTR_TIMEOUT=0
cksum /nfs/remote_file.dat

# Copy locally first if network is unreliable
cp /nfs/remote_file.dat /tmp/local_copy.dat
cksum /tmp/local_copy.dat
rm /tmp/local_copy.dat
```

## Related Commands

- [`md5sum`](/docs/commands/file-management/md5sum) - Compute MD5 message digest
- [`sha1sum`](/docs/commands/file-management/sha1sum) - Compute SHA-1 message digest
- [`sha256sum`](/docs/commands/file-management/sha256sum) - Compute SHA-256 message digest
- [`sum`](/docs/commands/file-management/sum) - Compute checksum and block counts
- [`digest`](/docs/commands/file-management/digest) - Calculate message digests
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`comm`](/docs/commands/file-management/comm) - Compare sorted files line by line

## Best Practices

1. **Use cksum for portability** - Available on all POSIX systems
2. **Generate manifests before transfers** - Essential for verification
3. **Store checksums separately** - Keep checksum files with backups
4. **Verify after critical operations** - Check integrity after transfers
5. **Monitor important files regularly** - Set up automated monitoring
6. **Use appropriate file selection** - Don't process unnecessary files
7. **Handle errors gracefully** - Check return codes and handle failures
8. **Document checksum procedures** - Maintain clear verification processes
9. **Use relative paths in manifests** - Improves portability
10. **Consider file system limitations** - Handle special characters and spaces

## Performance Tips

1. **Batch processing** is more efficient than individual file processing
2. **Avoid re-reading** large files when possible
3. **Use find with -exec** for processing multiple files efficiently
4. **Parallel processing** can speed up large dataset verification
5. **Memory mapping** for very large files may be beneficial
6. **SSD storage** significantly improves checksum calculation speed
7. **Reduce I/O operations** by minimizing file system calls
8. **Use appropriate nice levels** for background processing
9. **Consider network latency** for remote file verification
10. **Cache results** for frequently verified files

The `cksum` command is a fundamental tool for file integrity verification, providing a reliable and portable method for detecting file corruption and verifying data integrity across different systems and environments. Its guaranteed availability on POSIX systems makes it the baseline choice for essential file verification tasks.