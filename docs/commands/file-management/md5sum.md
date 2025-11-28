---
title: md5sum - Compute and check MD5 message digest
sidebar_label: md5sum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# md5sum - Compute and check MD5 message digest

The `md5sum` command is a cryptographic utility that computes and verifies MD5 (Message Digest 5) hash values for files. MD5 is a widely used cryptographic hash function that produces a 128-bit hash value, commonly expressed as a 32-character hexadecimal number. This command is essential for file integrity verification, data validation, security auditing, and detecting file corruption or unauthorized modifications. MD5 hashes are unique to input data, making them perfect for comparing files, verifying downloads, and ensuring data integrity across systems and networks.

## Basic Syntax

```bash
md5sum [OPTION] [FILE]...
md5sum [OPTION] --check [FILE]
```

## Common Options

### Output Format Options
- `-b, --binary` - Read in binary mode (default on Unix)
- `-t, --text` - Read in text mode (may produce different results on Windows)

### Check Options
- `-c, --check` - Read MD5 sums from FILE and check them
- `--ignore-missing` - Don't fail or report status for missing files
- `--quiet` - Don't print OK for each successfully verified file
- `--status` - Don't output anything, status code shows success
- `--strict` - Exit non-zero for improperly formatted checksum lines

### Hash Algorithm Variants
- `--tag` - Create a BSD-style checksum
- `-z, --zero` - End each output line with NUL character

### Help and Information
- `-h, --help` - Display help message
- `-v, --version` - Show version information

## Usage Examples

### Basic MD5 Hash Generation

#### Single File Hash
```bash
# Generate MD5 hash for a single file
md5sum document.pdf

# Output format: hash  filename
d41d8cd98f00b204e9800998ecf8427e  document.pdf

# Generate hash with binary mode (explicit)
md5sum -b file.bin

# Generate hash with text mode
md5sum -t textfile.txt
```

#### Multiple Files Hash
```bash
# Generate hashes for multiple files
md5sum file1.txt file2.txt file3.txt

# Generate hashes for all files in directory
md5sum *.txt

# Generate hashes recursively (with find)
find . -type f -exec md5sum {} +

# Generate hashes with file paths
md5sum /path/to/documents/*
```

### Verification and Checking

#### Check File Integrity
```bash
# Create MD5 checksum file
md5sum important_file.dat > checksum.md5

# Verify file integrity
md5sum -c checksum.md5

# Verify with output for all files
md5sum -v checksum.md5

# Verify multiple files from checksum file
md5sum -c multiple_files.md5
```

#### Batch Verification
```bash
# Create checksums for directory
md5sum /data/* > data_checksums.md5

# Verify all files in directory
md5sum -c data_checksums.md5

# Verify with status only (no output)
md5sum --status -c data_checksums.md5

# Ignore missing files during verification
md5sum --ignore-missing -c checksum.md5
```

### Advanced Hash Generation

#### BSD-style Checksums
```bash
# Generate BSD-style checksums
md5sum --tag file.txt

# Output: MD5 (file.txt) = d41d8cd98f00b204e9800998ecf8427e

# Create BSD-style checksum file
md5sum --tag *.conf > bsd_checksums.md5
```

#### Special Output Formats
```bash
# Generate hashes with NUL termination
md5sum -z files/* > hashes_null.txt

# Generate hashes without filenames
md5sum file.txt | awk '{print $1}'

# Generate only hash values for multiple files
md5sum *.txt | cut -d' ' -f1
```

## Practical Examples

### System Administration

#### File Integrity Monitoring
```bash
# Create baseline checksums for system files
md5sum /etc/passwd /etc/shadow /etc/group > system_baseline.md5

# Monitor for changes
if md5sum --status -c system_baseline.md5; then
    echo "System files intact"
else
    echo "WARNING: System files have been modified!"
fi

# Check critical configuration files
md5sum -c /etc/ssh/sshd_config.md5
md5sum -c /etc/sudoers.md5
```

#### Backup Verification
```bash
# Create checksums before backup
find /important/data -type f -exec md5sum {} \; > backup_before.md5

# After backup, verify backup integrity
find /backup/location -type f -exec md5sum {} \; > backup_after.md5

# Compare checksums
diff backup_before.md5 backup_after.md5

# Verify restore integrity
md5sum -c backup_before.md5
```

#### Security Auditing
```bash
# Check for new files in system directories
md5sum /bin/* > bin_checksums.md5
md5sum /sbin/* > sbin_checksums.md5
md5sum /usr/bin/* > usr_bin_checksums.md5

# Schedule regular integrity checks
md5sum --status -c bin_checksums.md5 || echo "Security Alert: /bin files modified"
```

### Development Workflow

#### Build Artifact Verification
```bash
# Generate checksums for build artifacts
md5sum build/*.tar.gz build/*.zip > build_checksums.md5

# Verify build integrity before deployment
md5sum -c build_checksums.md5 && echo "Build verified" || exit 1

# Create checksum file for distribution
md5sum release-1.0.0.tar.gz > release-1.0.0.md5
```

#### Source Code Integrity
```bash
# Verify source code download
wget https://example.com/source.tar.gz
md5sum -c source.tar.gz.md5

# Check source code modifications
md5sum -c source_baseline.md5

# Create integrity report
find . -name "*.py" -exec md5sum {} \; > python_files.md5
```

#### Dependency Verification
```bash
# Verify downloaded dependencies
md5sum -c dependencies.md5

# Create checksums for local dependencies
find vendor/ -type f -exec md5sum {} \; > vendor_checksums.md5

# Check package integrity
md5sum package.deb > package.md5
```

### Data Management

#### Data Transfer Verification
```bash
# Before transfer: create checksums
find /data/large_dataset -type f -exec md5sum {} \; > source_checksums.md5

# After transfer: verify integrity
find /backup/large_dataset -type f -exec md5sum {} \; > dest_checksums.md5

# Compare source and destination
diff source_checksums.md5 dest_checksums.md5
```

#### Database Dump Verification
```bash
# Create and verify database backup
mysqldump -u root -p database > backup.sql
md5sum backup.sql > backup.sql.md5

# Verify backup before restore
md5sum -c backup.sql.md5 && mysql -u root -p database < backup.sql
```

#### Log File Integrity
```bash
# Create checksum for archived logs
md5sum /var/log/application.log.1 > log_checksum.md5

# Verify log file hasn't been tampered with
md5sum -c log_checksum.md5

# Monitor log file changes in real-time
watch -n 60 "md5sum /var/log/current.log"
```

## Advanced Usage

### Automated Verification Scripts

#### Integrity Monitoring Script
```bash
#!/bin/bash
# File integrity monitoring system

BASELINE_DIR="/etc/security/baselines"
ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/integrity_monitor.log"

# Function to check directory integrity
check_directory() {
    local dir=$1
    local baseline=$2

    echo "Checking integrity of $dir..."

    if [ ! -f "$baseline" ]; then
        echo "Creating baseline for $dir"
        find "$dir" -type f -exec md5sum {} \; > "$baseline"
        return 0
    fi

    if ! md5sum --status -c "$baseline"; then
        echo "$(date): INTEGRITY VIOLATION in $dir" >> "$LOG_FILE"
        mail -s "Integrity Alert: $dir" "$ALERT_EMAIL" < "$LOG_FILE"
        return 1
    fi

    return 0
}

# Monitor critical directories
check_directory "/etc/passwd" "$BASELINE_DIR/etc_files.md5"
check_directory "/bin" "$BASELINE_DIR/bin_files.md5"
check_directory "/sbin" "$BASELINE_DIR/sbin_files.md5"
```

#### Backup Verification Script
```bash
#!/bin/bash
# Automated backup verification

BACKUP_DIR="/backup"
SOURCE_DIR="/data"
CHECKSUM_FILE="$BACKUP_DIR/checksums.md5"

# Generate source checksums
echo "Generating source checksums..."
find "$SOURCE_DIR" -type f -exec md5sum {} \; > "$CHECKSUM_FILE.new"

# Compare with previous backup if exists
if [ -f "$CHECKSUM_FILE" ]; then
    echo "Comparing with previous backup..."
    diff "$CHECKSUM_FILE" "$CHECKSUM_FILE.new" > "$BACKUP_DIR/changes.diff"

    if [ -s "$BACKUP_DIR/changes.diff" ]; then
        echo "Changes detected since last backup"
        cat "$BACKUP_DIR/changes.diff"
    else
        echo "No changes since last backup"
    fi
fi

# Verify current backup
echo "Verifying backup integrity..."
if md5sum --status -c "$CHECKSUM_FILE.new"; then
    echo "Backup verification successful"
    mv "$CHECKSUM_FILE.new" "$CHECKSUM_FILE"
else
    echo "WARNING: Backup verification failed!"
    exit 1
fi
```

### Performance Optimization

#### Parallel Hash Calculation
```bash
# Use xargs for parallel processing
find . -type f -print0 | xargs -0 -P 4 -I {} md5sum {}

# Parallel checksum generation with GNU parallel
find . -type f | parallel -j 4 md5sum {} > parallel_checksums.md5

# Large file processing with progress
pv large_file.iso | md5sum
```

#### Memory-Efficient Processing
```bash
# Process files one at a time for memory efficiency
find . -type f | while read file; do
    md5sum "$file" >> checksums.md5
done

# Stream processing for large datasets
find /data -type f -exec md5sum {} \; | tee checksums.md5 | wc -l
```

### Cross-Platform Compatibility

#### Windows Compatibility
```bash
# Ensure text mode for cross-platform files
md5sum -t mixed_line_endings.txt

# Handle Windows paths properly
md5sum "windows\path\file.txt"

# Generate checksums compatible with Windows tools
md5sum --tag file.txt > windows_checksum.md5
```

#### Network File Verification
```bash
# Verify files over network
ssh user@remote "md5sum /remote/file" > remote_hash.md5
md5sum local_file > local_hash.md5
diff remote_hash.md5 local_hash.md5

# Check remote file integrity
ssh user@server "md5sum -c /path/to/checksum.md5"
```

## Integration and Automation

### Shell Integration

#### Command Completion
```bash
# Add to .bashrc for MD5 verification shortcuts
verify_md5() {
    if [ -f "$1" ]; then
        md5sum -c "$1"
    else
        echo "Usage: verify_md5 <checksum_file>"
    fi
}

# Create checksums function
create_md5() {
    if [ -d "$1" ]; then
        find "$1" -type f -exec md5sum {} \; > "$1.md5"
    elif [ -f "$1" ]; then
        md5sum "$1" > "$1.md5"
    else
        echo "Usage: create_md5 <file_or_directory>"
    fi
}
```

#### File Type Detection
```bash
# Automatically detect and hash different file types
hash_files() {
    for file in "$@"; do
        if [ -f "$file" ]; then
            echo "Hashing: $file"
            case "$file" in
                *.tar.gz|*.tgz) md5sum "$file" >> archives.md5 ;;
                *.txt|*.conf|*.log) md5sum -t "$file" >> text_files.md5 ;;
                *.bin|*.exe) md5sum -b "$file" >> binary_files.md5 ;;
                *) md5sum "$file" >> other_files.md5 ;;
            esac
        fi
    done
}
```

### System Integration

#### Cron Jobs for Monitoring
```bash
# Add to crontab for regular integrity checks
# Hourly check of critical files
0 * * * * /usr/local/bin/integrity_check.sh

# Daily backup verification
0 2 * * * /usr/local/bin/backup_verify.sh

# Weekly system file baseline update
0 3 * * 0 /usr/local/bin/update_baseline.sh
```

#### Logrotate Integration
```bash
# Add to logrotate configuration
/var/log/integrity_check.log {
    daily
    rotate 30
    compress
    missingok
    notifempty
    create 644 root root
    postrotate
        /usr/local/bin/create_integrity_baseline.sh
    endscript
}
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied errors
# Solution: Use appropriate permissions or sudo
sudo md5sum /root/file.txt

# Check file accessibility
test -r file.txt && md5sum file.txt || echo "Cannot read file"

# Handle permission issues in scripts
if [ -r "$file" ]; then
    md5sum "$file"
else
    echo "Cannot read $file (permission denied)"
fi
```

#### File Not Found
```bash
# Missing files during verification
md5sum --ignore-missing -c checksum.md5

# Check if files exist before hashing
for file in *.txt; do
    [ -f "$file" ] && md5sum "$file"
done

# Handle missing files gracefully
md5sum -c checksum.md5 2>/dev/null || echo "Some files missing"
```

#### Binary vs Text Mode Issues
```bash
# Different hashes on different systems
# Force binary mode for consistency
md5sum -b file.txt

# Check which mode was used
file file.txt
md5sum -b file.txt > binary_mode.md5
md5sum -t file.txt > text_mode.md5
```

#### Performance Issues
```bash
# Slow processing of many files
# Use parallel processing
find . -type f | parallel -j 4 md5sum {}

# Process large files efficiently
pv large_file | md5sum

# Optimize for SSD vs HDD
# For SSD: use more parallel jobs
# For HDD: use fewer jobs to avoid thrashing
```

### Verification Failures

#### Debugging Checksum Mismatches
```bash
# Check file modification times
ls -la file.txt

# Compare file sizes first
wc -c file.txt
md5sum file.txt

# Check for line ending differences
od -c file.txt | head

# Verify with multiple tools
md5sum file.txt
sha1sum file.txt
```

#### Handling Special Characters
```bash
# Files with special characters in names
md5sum "file with spaces.txt"
md5sum 'file-with-$pecial.txt'

# Use find with -print0 for safety
find . -type f -print0 | xargs -0 md5sum

# Handle Unicode filenames
LC_ALL=C md5sum "файл.txt"
```

## Related Commands

- [`sha1sum`](/docs/commands/file-management/sha1sum) - Compute SHA-1 message digest
- [`sha256sum`](/docs/commands/file-management/sha256sum) - Compute SHA-256 message digest
- [`sha512sum`](/docs/commands/file-management/sha512sum) - Compute SHA-512 message digest
- [`cksum`](/docs/commands/file-management/cksum) - Compute CRC checksum and byte counts
- [`sum`](/docs/commands/file-management/sum) - Compute checksum and block counts
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`openssl`](/docs/commands/security/openssl) - OpenSSL cryptographic toolkit

## Best Practices

1. **Store checksums separately** from the files they verify
2. **Use binary mode** (-b) for consistent results across platforms
3. **Create checksums immediately** after file creation or download
4. **Verify backups** regularly using stored checksums
5. **Use cryptographic checksums** for security-sensitive files
6. **Document checksum procedures** for audit trails
7. **Use absolute paths** in checksum files for relocation
8. **Regularly update baselines** for legitimate file changes
9. **Monitor critical system files** for unauthorized modifications
10. **Use appropriate hash algorithms** based on security requirements

## Security Considerations

1. **MD5 is cryptographically broken** - not suitable for security-critical applications
2. **Use SHA-256 or stronger** for security-sensitive verifications
3. **Protect checksum files** from unauthorized modification
4. **Use signed checksums** for high-security requirements
5. **Consider collision attacks** when using MD5 for security
6. **Store checksums securely** and separately from data
7. **Use multiple hash functions** for critical verifications
8. **Verify checksum sources** before trusting them
9. **Implement secure verification procedures** for sensitive operations
10. **Consider hardware security modules** for high-security applications

## Performance Tips

1. **Use parallel processing** for multiple files
2. **Process large files with progress indicators** using `pv`
3. **Cache checksums** for frequently accessed files
4. **Use SSD storage** for faster checksum calculations
5. **Minimize disk I/O** by processing files sequentially
6. **Use appropriate buffer sizes** for optimal performance
7. **Consider memory usage** when processing many files
8. **Optimize for storage media** (HDD vs SSD characteristics)
9. **Use binary mode** to avoid text conversion overhead
10. **Batch operations** to reduce system call overhead

The `md5sum` command is a fundamental tool for file integrity verification and data validation. While MD5 is no longer recommended for cryptographic security purposes due to known vulnerabilities, it remains widely used for file integrity checking, data verification, and duplicate detection. Its speed and ubiquity make it an essential utility for system administrators, developers, and data managers who need to verify file integrity and detect changes or corruption in data.

---

*Note: For security-critical applications, consider using SHA-256 (`sha256sum`) or stronger cryptographic hash functions instead of MD5.*