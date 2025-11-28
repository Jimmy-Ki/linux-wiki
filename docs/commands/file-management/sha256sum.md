---
title: sha256sum - Compute and check SHA256 message digest
sidebar_label: sha256sum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sha256sum - Compute and check SHA256 message digest

The `sha256sum` command is a cryptographic utility that computes and verifies SHA-256 (Secure Hash Algorithm 256-bit) hash values for files and data. SHA-256 is a member of the SHA-2 family of cryptographic hash functions that produces a 256-bit hash value, commonly expressed as a 64-character hexadecimal number. This command is essential for file integrity verification, data validation, security auditing, and digital signatures. SHA-256 provides stronger security than MD5 and SHA-1, making it ideal for security-sensitive applications, cryptocurrency, blockchain operations, and modern cryptographic protocols. The algorithm is designed to be collision-resistant and provides excellent cryptographic properties for data integrity verification.

## Basic Syntax

```bash
sha256sum [OPTION] [FILE]...
sha256sum [OPTION] --check [FILE]
```

## Common Options

### Output Format Options
- `-b, --binary` - Read in binary mode (default on Unix systems)
- `-t, --text` - Read in text mode (may produce different results on Windows)

### Check Options
- `-c, --check` - Read SHA256 sums from FILE and check them
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

### Basic SHA-256 Hash Generation

#### Single File Hash
```bash
# Generate SHA-256 hash for a single file
sha256sum document.pdf

# Output format: hash  filename
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  document.pdf

# Generate hash with binary mode (explicit)
sha256sum -b file.bin

# Generate hash with text mode
sha256sum -t textfile.txt

# Generate hash without filename (hash only)
sha256sum document.pdf | awk '{print $1}'
```

#### Multiple Files Hash
```bash
# Generate hashes for multiple files
sha256sum file1.txt file2.txt file3.txt

# Generate hashes for all files in directory
sha256sum *.txt

# Generate hashes recursively (with find)
find . -type f -exec sha256sum {} +

# Generate hashes with file paths
sha256sum /path/to/documents/*

# Generate hashes with specific pattern
sha256sum /var/log/*.log
```

### Verification and Checking

#### Check File Integrity
```bash
# Create SHA-256 checksum file
sha256sum important_file.dat > checksum.sha256

# Verify file integrity
sha256sum -c checksum.sha256

# Verify with verbose output
sha256sum -v checksum.sha256

# Verify multiple files from checksum file
sha256sum -c multiple_files.sha256
```

#### Batch Verification
```bash
# Create checksums for directory
sha256sum /data/* > data_checksums.sha256

# Verify all files in directory
sha256sum -c data_checksums.sha256

# Verify with status only (no output)
sha256sum --status -c data_checksums.sha256

# Ignore missing files during verification
sha256sum --ignore-missing -c checksum.sha256

# Strict verification (fail on format errors)
sha256sum --strict -c checksum.sha256
```

### Advanced Hash Generation

#### BSD-style Checksums
```bash
# Generate BSD-style checksums
sha256sum --tag file.txt

# Output: SHA256 (file.txt) = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

# Create BSD-style checksum file
sha256sum --tag *.conf > bsd_checksums.sha256

# Verify BSD-style checksums
sha256sum -c bsd_checksums.sha256
```

#### Special Output Formats
```bash
# Generate hashes with NUL termination
sha256sum -z files/* > hashes_null.txt

# Generate hashes without filenames
sha256sum file.txt | awk '{print $1}'

# Generate only hash values for multiple files
sha256sum *.txt | cut -d' ' -f1

# Generate hashes with custom format
sha256sum *.dat | while read hash file; do
    echo "SHA256($file) = $hash"
done
```

#### Standard Input Hashing
```bash
# Hash from standard input
echo "Hello World" | sha256sum

# Hash string literal
printf "Hello World" | sha256sum

# Hash from pipe
cat config.yml | sha256sum

# Hash multiple inputs
printf "line1\nline2\nline3" | sha256sum
```

## Practical Examples

### System Administration

#### File Integrity Monitoring
```bash
# Create baseline checksums for system files
sha256sum /etc/passwd /etc/shadow /etc/group > system_baseline.sha256

# Monitor for changes
if sha256sum --status -c system_baseline.sha256; then
    echo "System files intact"
else
    echo "WARNING: System files have been modified!"
fi

# Check critical configuration files
sha256sum -c /etc/ssh/sshd_config.sha256
sha256sum -c /etc/sudoers.sha256

# Create comprehensive system baseline
find /etc -type f -name "*.conf" -exec sha256sum {} \; > etc_configs.sha256
```

#### Security Auditing
```bash
# Check for new files in system directories
sha256sum /bin/* > bin_checksums.sha256
sha256sum /sbin/* > sbin_checksums.sha256
sha256sum /usr/bin/* > usr_bin_checksums.sha256

# Schedule regular integrity checks
sha256sum --status -c bin_checksums.sha256 || echo "Security Alert: /bin files modified"

# Verify installed packages
dpkg -l | awk '{print $2}' | xargs -I {} dpkg -L {} | sha256sum

# Monitor executable files
find /usr/bin -type f -executable -exec sha256sum {} \; > executables.sha256
```

#### Backup and Archive Verification
```bash
# Create checksums before backup
find /important/data -type f -exec sha256sum {} \; > backup_before.sha256

# After backup, verify backup integrity
find /backup/location -type f -exec sha256sum {} \; > backup_after.sha256

# Compare checksums
diff backup_before.sha256 backup_after.sha256

# Verify restore integrity
sha256sum -c backup_before.sha256

# Create archive with embedded checksums
tar -czf archive.tar.gz --transform 's/.*/&.sha256/' \
    --exec 'sha256sum {} > {}.sha256' files/
```

### Development Workflow

#### Build Artifact Verification
```bash
# Generate checksums for build artifacts
sha256sum build/*.tar.gz build/*.zip > build_checksums.sha256

# Verify build integrity before deployment
sha256sum -c build_checksums.sha256 && echo "Build verified" || exit 1

# Create checksum file for distribution
sha256sum release-1.0.0.tar.gz > release-1.0.0.sha256

# Verify source code integrity
git clone https://github.com/user/repo.git
cd repo && sha256sum -c ../repo_source.sha256

# Docker image verification
docker save app:latest > app.tar
sha256sum app.tar > docker_image.sha256
```

#### Cryptocurrency and Blockchain
```bash
# Verify blockchain data integrity
sha256sum blockchain/*.dat > blockchain_integrity.sha256

# Generate hash for mining operations
printf "block_data_nonce" | sha256sum

# Verify wallet file integrity
sha256sum wallet.dat > wallet_backup.sha256

# Create multi-signature verification
sha256sum transaction1.txt > tx1.sha256
sha256sum transaction2.txt > tx2.sha256
sha256sum transaction3.txt > tx3.sha256
```

#### Code Signing and Verification
```bash
# Sign code files with SHA-256
sha256sum source_code.py > source_code.sha256
gpg --detach-sign --armor source_code.sha256

# Verify code signature
gpg --verify source_code.sha256.asc
sha256sum -c source_code.sha256

# Create reproducible builds
sha256sum build_environment.txt > build_env.sha256
sha256sum source_files.tar.gz > source.sha256
```

### Data Management

#### Data Transfer Verification
```bash
# Before transfer: create checksums
find /data/large_dataset -type f -exec sha256sum {} \; > source_checksums.sha256

# After transfer: verify integrity
find /backup/large_dataset -type f -exec sha256sum {} \; > dest_checksums.sha256

# Compare source and destination
diff source_checksums.sha256 dest_checksums.sha256

# Network transfer verification
scp file.txt remote:/path/
ssh remote "sha256sum /path/file.txt" > remote_hash.sha256
sha256sum file.txt > local_hash.sha256
diff remote_hash.sha256 local_hash.sha256
```

#### Database Dump Verification
```bash
# Create and verify database backup
mysqldump -u root -p database > backup.sql
sha256sum backup.sql > backup.sql.sha256

# Verify backup before restore
sha256sum -c backup.sql.sha256 && mysql -u root -p database < backup.sql

# PostgreSQL backup verification
pg_dump database > backup.sql
sha256sum backup.sql > pg_backup.sha256

# Verify database file integrity
sha256sum /var/lib/mysql/database/*.ibd > mysql_data.sha256
```

#### Cloud Storage Verification
```bash
# Verify cloud upload integrity
aws s3 cp file.txt s3://bucket/
aws s3api get-object --bucket bucket --key file.txt - | sha256sum

# Google Cloud Storage verification
gsutil cp file.txt gs://bucket/
gsutil cat gs://bucket/file.txt | sha256sum

# Create cloud backup with verification
tar -czf backup.tar.gz data/
sha256sum backup.tar.gz > backup.sha256
aws s3 cp backup.tar.gz s3://backups/
aws s3 cp backup.sha256 s3://backups/
```

## Advanced Usage

### Automated Verification Scripts

#### Integrity Monitoring Script
```bash
#!/bin/bash
# Advanced file integrity monitoring system

BASELINE_DIR="/etc/security/baselines"
ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/integrity_monitor.log"
LOCK_FILE="/var/run/integrity_monitor.lock"

# Function to check directory integrity
check_directory() {
    local dir=$1
    local baseline=$2
    local critical=$3

    echo "Checking integrity of $dir..."

    if [ ! -f "$baseline" ]; then
        echo "Creating baseline for $dir"
        find "$dir" -type f -exec sha256sum {} \; > "$baseline"
        return 0
    fi

    # Create temporary checksum file
    temp_checksum=$(mktemp)
    find "$dir" -type f -exec sha256sum {} \; > "$temp_checksum"

    # Compare with baseline
    if ! diff -q "$baseline" "$temp_checksum" > /dev/null 2>&1; then
        echo "$(date): INTEGRITY VIOLATION in $dir" >> "$LOG_FILE"

        if [ "$critical" = "true" ]; then
            mail -s "CRITICAL: Integrity Alert - $dir" "$ALERT_EMAIL" < "$LOG_FILE"
            # Send SMS or other alert mechanism
        else
            mail -s "WARNING: Integrity Alert - $dir" "$ALERT_EMAIL" < "$LOG_FILE"
        fi

        rm -f "$temp_checksum"
        return 1
    fi

    rm -f "$temp_checksum"
    return 0
}

# Prevent concurrent execution
exec 200>"$LOCK_FILE"
flock -n 200 || exit 1

# Monitor critical directories
check_directory "/etc/passwd" "$BASELINE_DIR/etc_files.sha256" "true"
check_directory "/bin" "$BASELINE_DIR/bin_files.sha256" "true"
check_directory "/sbin" "$BASELINE_DIR/sbin_files.sha256" "true"
check_directory "/usr/bin" "$BASELINE_DIR/usr_bin_files.sha256" "false"

flock -u 200
```

#### Cloud Backup Verification Script
```bash
#!/bin/bash
# Automated cloud backup verification with SHA-256

BACKUP_DIR="/backup"
SOURCE_DIR="/data"
CLOUD_BUCKET="s3://my-backup-bucket"
CHECKSUM_FILE="$BACKUP_DIR/checksums.sha256"
AWS_CLI="aws"

# Generate source checksums
echo "Generating source checksums..."
find "$SOURCE_DIR" -type f -exec sha256sum {} \; > "$CHECKSUM_FILE.new"

# Upload to cloud with verification
echo "Uploading to cloud..."
"$AWS_CLI" s3 sync "$SOURCE_DIR" "$CLOUD_BUCKET/$(date +%Y-%m-%d)/"

# Verify cloud upload
echo "Verifying cloud upload integrity..."
"$AWS_CLI" s3 ls --recursive "$CLOUD_BUCKET/$(date +%Y-%m-%d)/" | \
    awk '{print $4}' | \
    xargs -I {} "$AWS_CLI" s3api get-object --bucket my-backup-bucket --key {} - | \
    sha256sum > "$BACKUP_DIR/cloud_checksums.sha256"

# Compare local and cloud checksums
if diff "$CHECKSUM_FILE.new" "$BACKUP_DIR/cloud_checksums.sha256"; then
    echo "Cloud backup verification successful"
    mv "$CHECKSUM_FILE.new" "$CHECKSUM_FILE"

    # Clean up old backups (keep last 7 days)
    "$AWS_CLI" s3 ls "$CLOUD_BUCKET/" | \
        awk '$1 < "'$(date -d '7 days ago' '+%Y-%m-%d')'" {print $4}' | \
        xargs -I {} "$AWS_CLI" s3 rm "$CLOUD_BUCKET/{}" --recursive
else
    echo "ERROR: Cloud backup verification failed!"
    exit 1
fi
```

### Performance Optimization

#### Parallel Hash Calculation
```bash
# Use xargs for parallel processing
find . -type f -print0 | xargs -0 -P 8 -I {} sha256sum {}

# Parallel checksum generation with GNU parallel
find . -type f | parallel -j 8 sha256sum {} > parallel_checksums.sha256

# Large file processing with progress
pv large_file.iso | sha256sum

# Multi-core optimization for directory hashing
find /data -type f | split -d -l 1000 - /tmp/chunk_
for chunk in /tmp/chunk_*; do
    sha256sum -c "$chunk" &
done
wait
```

#### Memory-Efficient Processing
```bash
# Process files one at a time for memory efficiency
find . -type f | while read file; do
    sha256sum "$file" >> checksums.sha256
done

# Stream processing for large datasets
find /data -type f -exec sha256sum {} \; | tee checksums.sha256 | wc -l

# Batch processing for limited memory systems
find . -type f | head -1000 | xargs sha256sum > batch1.sha256
find . -type f | tail -n +1001 | head -1000 | xargs sha256sum > batch2.sha256
```

### Cross-Platform Compatibility

#### Windows Compatibility
```bash
# Ensure text mode for cross-platform files
sha256sum -t mixed_line_endings.txt

# Handle Windows paths properly
sha256sum "windows\path\file.txt"

# Generate checksums compatible with Windows tools
sha256sum --tag file.txt > windows_checksum.sha256

# PowerShell compatible format
sha256sum *.txt | for file in $(cat); do echo "$file" | tr ' ' '*'; done
```

#### Network File Verification
```bash
# Verify files over network
ssh user@remote "sha256sum /remote/file" > remote_hash.sha256
sha256sum local_file > local_hash.sha256
diff remote_hash.sha256 local_hash.sha256

# Check remote file integrity via HTTP
curl -s http://example.com/file.txt | sha256sum

# FTP verification
curl ftp://ftp.example.com/file.txt | sha256sum

# Verify multiple remote files
parallel -j 4 ssh user@{} "sha256sum /data/{}" ::: server1 server2 server3
```

## Integration and Automation

### Shell Integration

#### Command Completion
```bash
# Add to .bashrc for SHA-256 verification shortcuts
verify_sha256() {
    if [ -f "$1" ]; then
        sha256sum -c "$1"
    else
        echo "Usage: verify_sha256 <checksum_file>"
    fi
}

# Create checksums function
create_sha256() {
    if [ -d "$1" ]; then
        find "$1" -type f -exec sha256sum {} \; > "$1.sha256"
        echo "Created checksums for directory: $1"
    elif [ -f "$1" ]; then
        sha256sum "$1" > "$1.sha256"
        echo "Created checksum for file: $1"
    else
        echo "Usage: create_sha256 <file_or_directory>"
    fi
}

# Verify download function
verify_download() {
    local file="$1"
    local expected_hash="$2"

    if [ ! -f "$file" ]; then
        echo "File not found: $file"
        return 1
    fi

    local actual_hash=$(sha256sum "$file" | awk '{print $1}')

    if [ "$actual_hash" = "$expected_hash" ]; then
        echo "✓ Verification successful: $file"
        return 0
    else
        echo "✗ Verification failed: $file"
        echo "  Expected: $expected_hash"
        echo "  Actual:   $actual_hash"
        return 1
    fi
}
```

#### File Type Detection
```bash
# Automatically detect and hash different file types
hash_files_by_type() {
    local dir="$1"

    echo "Hashing files by type in: $dir"

    # Configuration files
    find "$dir" -name "*.conf" -o -name "*.cfg" -o -name "*.ini" | \
        xargs sha256sum > configs.sha256

    # Source code files
    find "$dir" -name "*.py" -o -name "*.js" -o -name "*.java" -o -name "*.c" | \
        xargs sha256sum > source_code.sha256

    # Binary files
    find "$dir" -name "*.bin" -o -name "*.exe" -o -name "*.so" | \
        xargs sha256sum > binaries.sha256

    # Document files
    find "$dir" -name "*.pdf" -o -name "*.doc" -o -name "*.txt" | \
        xargs sha256sum > documents.sha256

    echo "Checksum files created:"
    ls -la *.sha256
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

# Monthly cloud backup verification
0 4 1 * * /usr/local/bin/cloud_backup_verify.sh
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

/var/log/backup_verification.log {
    weekly
    rotate 12
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
}
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied errors
# Solution: Use appropriate permissions or sudo
sudo sha256sum /root/file.txt

# Check file accessibility
test -r file.txt && sha256sum file.txt || echo "Cannot read file"

# Handle permission issues in scripts
if [ -r "$file" ]; then
    sha256sum "$file"
else
    echo "Cannot read $file (permission denied)"
    exit 1
fi

# Drop privileges for security
sudo -u nobody sha256sum /public/file.txt
```

#### File Not Found
```bash
# Missing files during verification
sha256sum --ignore-missing -c checksum.sha256

# Check if files exist before hashing
for file in *.txt; do
    [ -f "$file" ] && sha256sum "$file"
done

# Handle missing files gracefully
sha256sum -c checksum.sha256 2>/dev/null || echo "Some files missing"

# Verify file existence first
while read hash file; do
    if [ -f "$file" ]; then
        echo "$hash  $file"
    else
        echo "WARNING: File not found: $file" >&2
    fi
done < checksum.sha256
```

#### Binary vs Text Mode Issues
```bash
# Different hashes on different systems
# Force binary mode for consistency
sha256sum -b file.txt

# Check which mode was used
file file.txt
sha256sum -b file.txt > binary_mode.sha256
sha256sum -t file.txt > text_mode.sha256

# Handle mixed line endings
dos2unix file.txt
sha256sum file.txt

# Windows vs Unix compatibility
sha256sum -b file.txt  # Always use binary mode
```

#### Performance Issues
```bash
# Slow processing of many files
# Use parallel processing
find . -type f | parallel -j 8 sha256sum {}

# Process large files efficiently
pv large_file | sha256sum

# Optimize for SSD vs HDD
# For SSD: use more parallel jobs
find . -type f | parallel -j 16 sha256sum {}

# For HDD: use fewer jobs to avoid thrashing
find . -type f | parallel -j 4 sha256sum {}

# Monitor resource usage
/usr/bin/time -v sha256sum large_file
```

### Verification Failures

#### Debugging Checksum Mismatches
```bash
# Check file modification times
ls -la file.txt

# Compare file sizes first
wc -c file.txt
sha256sum file.txt

# Check for line ending differences
od -c file.txt | head

# Verify with multiple tools
sha256sum file.txt
sha1sum file.txt
md5sum file.txt

# Check file encoding
file -i file.txt
hexdump -C file.txt | head
```

#### Handling Special Characters
```bash
# Files with special characters in names
sha256sum "file with spaces.txt"
sha256sum 'file-with-$pecial.txt'
sha256sum $'file\twith\ttabs.txt'

# Use find with -print0 for safety
find . -type f -print0 | xargs -0 sha256sum

# Handle Unicode filenames
LC_ALL=C sha256sum "файл.txt"
export LC_ALL=en_US.UTF-8
sha256sum "测试文件.txt"

# Escape problematic characters
sha256sum "./file'with'quotes.txt"
sha256sum './file"with"quotes.txt'
```

#### Network and Storage Issues
```bash
# Network storage timeouts
timeout 300 sha256sum /nfs/file.txt

# Handle interrupted operations
if ! sha256sum large_file.txt > checksum.txt; then
    echo "Operation interrupted, retrying..."
    sha256sum large_file.txt > checksum.txt
fi

# Check disk space before operation
df -h .
available=$(df . | awk 'NR==2 {print $4}')
if [ "$available" -lt 1000000 ]; then
    echo "Insufficient disk space"
    exit 1
fi
```

## Related Commands

- [`md5sum`](/docs/commands/file-management/md5sum) - Compute MD5 message digest
- [`sha1sum`](/docs/commands/file-management/sha1sum) - Compute SHA-1 message digest
- [`sha512sum`](/docs/commands/file-management/sha512sum) - Compute SHA-512 message digest
- [`cksum`](/docs/commands/file-management/cksum) - Compute CRC checksum and byte counts
- [`sum`](/docs/commands/file-management/sum) - Compute checksum and block counts
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`openssl`](/docs/commands/security/openssl) - OpenSSL cryptographic toolkit
- [`gpg`](/docs/commands/security/gpg) - GNU Privacy Guard for encryption and signing
- [`base64`](/docs/commands/file-management/base64) - Base64 encode and decode data

## Best Practices

1. **Store checksums separately** from the files they verify
2. **Use binary mode** (-b) for consistent results across platforms
3. **Create checksums immediately** after file creation or download
4. **Verify backups** regularly using stored checksums
5. **Use SHA-256** for security-sensitive files instead of MD5
6. **Document checksum procedures** for audit trails
7. **Use absolute paths** in checksum files for relocation
8. **Regularly update baselines** for legitimate file changes
9. **Monitor critical system files** for unauthorized modifications
10. **Implement automated verification** for critical infrastructure
11. **Use digital signatures** for high-security verification
12. **Maintain checksum versioning** for change tracking

## Security Considerations

1. **SHA-256 is cryptographically secure** and suitable for security applications
2. **Protect checksum files** from unauthorized modification
3. **Use signed checksums** for high-security requirements
4. **Store checksums securely** and separately from data
5. **Verify checksum sources** before trusting them
6. **Implement secure verification procedures** for sensitive operations
7. **Use multiple hash functions** for critical verifications
8. **Consider hardware security modules** for high-security applications
9. **Regular security audits** of checksum verification processes
10. **Use secure channels** for checksum distribution
11. **Implement tamper-evident logging** for integrity checks
12. **Consider side-channel attacks** in high-security environments

## Performance Tips

1. **Use parallel processing** for multiple files
2. **Process large files with progress indicators** using `pv`
3. **Cache checksums** for frequently accessed files
4. **Use SSD storage** for faster checksum calculations
5. **Minimize disk I/O** by processing files sequentially when possible
6. **Use appropriate buffer sizes** for optimal performance
7. **Consider memory usage** when processing many files
8. **Optimize for storage media** (HDD vs SSD characteristics)
9. **Use binary mode** to avoid text conversion overhead
10. **Batch operations** to reduce system call overhead
11. **Optimize CPU affinity** for CPU-intensive hashing operations
12. **Use hardware acceleration** when available (AES-NI for SHA extensions)

The `sha256sum` command is a fundamental cryptographic tool for file integrity verification and data validation in modern computing. SHA-256 provides strong security properties making it suitable for cryptographic applications, blockchain operations, and security-sensitive verification tasks. Its collision resistance and widespread adoption make it an essential utility for system administrators, developers, security professionals, and data managers who need robust integrity verification and change detection capabilities. As part of the SHA-2 family, SHA-256 represents the current standard for secure hashing applications and is recommended over older algorithms like MD5 and SHA-1 for all security-critical uses.