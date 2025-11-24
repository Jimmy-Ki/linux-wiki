---
title: bzip2 - Block-sorting File Compressor
sidebar_label: bzip2
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bzip2 - Block-sorting File Compressor

The `bzip2` command compresses and decompresses files using the Burrows-Wheeler block sorting text compression algorithm and Huffman coding. It typically achieves better compression ratios than gzip (especially for text files) while maintaining reasonable speed. Bzip2 creates files with the `.bz2` extension and preserves file permissions, timestamps, and ownership when possible.

## Basic Syntax

```bash
bzip2 [OPTIONS] [FILES...]
```

## Common Options

### Operation Mode
- `-z, --compress` - Force compression (default)
- `-d, --decompress` - Force decompression
- `-t, --test` - Test compressed file integrity
- `-c, --stdout` - Write to standard output

### File Handling
- `-k, --keep` - Keep (don't delete) input files
- `-f, --force` - Force overwrite of output files
- `-s, --small` - Reduce memory usage (slower)
- `-q, --quiet` - Suppress non-critical warnings

### Compression Levels
- `-1` through `-9` - Set block size (100k to 900k, default: 900k)

### Information
- `-v, --verbose` - Verbose mode
- `-L, --license` - Display software version and license
- `-h, --help` - Display help information
- `-V, --version` - Display version information

## Usage Examples

### Basic Compression

#### Single File Operations
```bash
# Compress a file (replaces original with .bz2)
bzip2 document.txt

# Compress with verbose output
bzip2 -v document.txt

# Compress with specific block size
bzip2 -5 document.txt  # 500k block size
bzip2 -1 document.txt  # 100k block size (fastest)
bzip2 -9 document.txt  # 900k block size (best compression)

# Keep original file when compressing
bzip2 -k document.txt

# Force compression (overwrite existing .bz2 file)
bzip2 -f document.txt
```

#### Decompression
```bash
# Decompress a file (replaces .bz2 with original)
bzip2 -d document.txt.bz2

# Using bunzip2 command
bunzip2 document.txt.bz2

# Decompress keeping compressed file
bzip2 -dk document.txt.bz2

# Force decompression
bzip2 -df document.txt.bz2

# Decompress to standard output
bzip2 -dc document.txt.bz2
```

### Advanced Operations

#### Memory Management
```bash
# Use reduced memory mode (good for low-memory systems)
bzip2 -s large_file.txt

# Compress with minimal memory usage
bzip2 -1 -s document.txt

# Test with reduced memory
bzip2 -ts document.txt.bz2
```

#### Batch Processing
```bash
# Compress multiple files
bzip2 file1.txt file2.txt file3.txt

# Compress all text files
bzip2 *.txt

# Compress recursively
find /data -type f -name "*.log" -exec bzip2 {} \;

# Compress with progress monitoring
find /data -name "*.txt" -print0 | parallel -0 bzip2 -v
```

### File Integrity Testing

#### Verification
```bash
# Test compressed file integrity
bzip2 -t document.txt.bz2

# Test with verbose output
bzip2 -tv document.txt.bz2

# Test multiple files
bzip2 -t *.bz2

# Comprehensive integrity check
find /compressed -name "*.bz2" -exec bzip2 -t {} \;
```

## Practical Examples

### System Administration

#### Log File Management
```bash
# Compress old log files
find /var/log -name "*.log.*" -mtime +30 -exec bzip2 {} \;

# Compress all application logs
bzip2 -k /var/log/app/*.log

# Compress and move to archive
for log in /var/log/*.log; do
    bzip2 -c "$log" > "/archive/$(basename "$log").bz2"
    rm "$log"
done

# Rotate and compress logs
logrotate -f /etc/logrotate.d/apache2
find /var/log/apache2 -name "*.log.*" -exec bzip2 {} \;
```

#### Backup Operations
```bash
# Compress database backup
mysqldump database_name | bzip2 > backup.sql.bz2

# Compress system backup
tar -cf - /etc | bzip2 > etc_backup.tar.bz2

# Compress and verify backup
tar -cf - /home/user | bzip2 > home_backup.tar.bz2
bzip2 -t home_backup.tar.bz2

# Create compressed archive with specific level
tar -cf - /data | bzip2 -9 > data_backup.tar.bz2
```

### Development Workflow

#### Source Code Management
```bash
# Compress source code for distribution
tar -cf - src/ | bzip2 > source.tar.bz2

# Compress build artifacts
bzip2 -k build/*.log build/*.xml

# Compress test results
tar -cf - test_results/ | bzip2 > test_results.tar.bz2

# Compress with specific compression level for web distribution
tar -cf - public_html/ | bzip2 -6 > website.tar.bz2
```

#### Data Processing
```bash
# Compress large datasets
bzip2 -9 large_dataset.csv

# Process compressed data directly
bzip2 -dc data.csv.bz2 | python process.py

# Compress multiple data files
find /data -name "*.csv" -mtime +7 -exec bzip2 {} \;

# Compress and archive old data
find /archive -name "*.txt" -mtime +365 -exec bzip2 {} \;
```

## Advanced Usage

### Pipeline Operations

#### Stream Processing
```bash
# Compress output of commands
ls -la | bzip2 > directory_listing.bz2

# Compress database dump
pg_dump database | bzip2 > db_dump.sql.bz2

# Decompress and process immediately
bzip2 -dc data.bz2 | grep "pattern"

# Compress and transfer over network
tar -cf - /data | bzip2 | ssh remote "cat > remote_data.tar.bz2"

# Decompress remote data
ssh remote "cat remote_data.tar.bz2" | bzip2 -dc | tar -xf -
```

#### File Conversion
```bash
# Convert gzip to bzip2
gunzip -c file.gz | bzip2 > file.bz2

# Convert tar.gz to tar.bz2
gunzip -c archive.tar.gz | bzip2 > archive.tar.bz2

# Create different compression formats
tar -cf - data | tee >(gzip > data.tar.gz) | bzip2 > data.tar.bz2
```

### Performance Optimization

#### Memory Efficient Processing
```bash
# Use reduced memory for large files on limited systems
bzip2 -s huge_file.txt

# Process multiple files with limited memory
find /large/files -name "*.txt" -exec bzip2 -s {} \;

# Parallel processing with memory control
find /data -name "*.log" -print0 | parallel -0 -j2 bzip2 -s
```

#### Speed vs. Compression Ratio
```bash
# Fast compression for time-critical operations
bzip2 -1 quick_backup.tar

# Best compression for long-term storage
bzip2 -9 archive_for_storage.tar

# Balanced compression (default)
bzip2 -6 normal_compression.tar

# Test compression ratios
for level in {1..9}; do
    echo "Level $level:"
    time bzip2 -$level test_file.txt
    ls -lh test_file.txt.bz2
done
```

## Special Operations

### File Recovery and Repair

#### Corruption Detection
```bash
# Test all compressed files
find /compressed -name "*.bz2" -exec bzip2 -t {} \;

# Report corrupted files
find /compressed -name "*.bz2" -exec bash -c 'if ! bzip2 -t "$1" 2>/dev/null; then echo "Corrupted: $1"; fi' _ {} \;

# Batch verification with logging
for file in *.bz2; do
    if bzip2 -t "$file" 2>/dev/null; then
        echo "OK: $file" >> verification.log
    else
        echo "FAIL: $file" >> verification.log
    fi
done
```

#### Emergency Recovery
```bash
# Attempt to extract readable parts of damaged file
bzip2 -dc partially_corrupted.bz2 > recovered_data.txt 2>/dev/null

# Test file before processing operations
if bzip2 -t important.bz2; then
    bzip2 -dc important.bz2 | process_critical_data
else
    echo "File corrupted, using backup"
fi
```

## Troubleshooting

### Common Issues

#### Memory Problems
```bash
# Out of memory errors
# Solution: Use -s option for reduced memory usage
bzip2 -s huge_file.txt

# Check available memory
free -h

# Monitor memory usage during compression
/usr/bin/time -v bzip2 large_file.txt
```

#### Permission Issues
```bash
# Permission denied errors
sudo bzip2 system_file.txt

# Change permissions first
chmod 644 file.txt && bzip2 file.txt

# Check file permissions before compression
ls -la file.txt
```

#### Disk Space Issues
```bash
# Check available space
df -h .

# Use standard output to avoid intermediate files
bzip2 -c large_file.txt > /other/filesystem/large_file.txt.bz2

# Compress and remove original atomically
bzip2 -c file.txt > file.txt.bz2 && rm file.txt
```

## Integration Examples

### Shell Scripts

#### Automated Backup Script
```bash
#!/bin/bash
# Daily backup with bzip2 compression

BACKUP_DIR="/backups"
SOURCE_DIR="/home/user/documents"
DATE=$(date +%Y%m%d)
COMPRESS_LEVEL=9

# Create backup
tar -cf - "$SOURCE_DIR" | bzip2 -$COMPRESS_LEVEL > "$BACKUP_DIR/backup_$DATE.tar.bz2"

# Verify backup
if bzip2 -t "$BACKUP_DIR/backup_$DATE.tar.bz2"; then
    echo "Backup created successfully: backup_$DATE.tar.bz2"

    # Clean old backups (keep last 7 days)
    find "$BACKUP_DIR" -name "backup_*.tar.bz2" -mtime +7 -delete
else
    echo "Backup verification failed!"
    exit 1
fi
```

#### Log Rotation Script
```bash
#!/bin/bash
# Log rotation and compression

LOG_DIR="/var/log/app"
MAX_SIZE="100M"
RETENTION_DAYS=30

# Rotate large logs
find "$LOG_DIR" -name "*.log" -size +$MAX_SIZE -exec bash -c '
    log="$1"
    base="${log%.log}"
    timestamp=$(date +%Y%m%d_%H%M%S)

    # Rotate log
    mv "$log" "${base}_${timestamp}.log"

    # Compress rotated log
    bzip2 "${base}_${timestamp}.log"

    echo "Rotated and compressed: $(basename "$log")"
' _ {} \;

# Clean old compressed logs
find "$LOG_DIR" -name "*.log.bz2" -mtime +$RETENTION_DAYS -delete
```

## Related Commands

- [`bunzip2`](/docs/commands/compression/bunzip2) - Decompress bzip2 files
- [`bzip2recover`](/docs/commands/compression/bzip2recover) - Recover damaged bzip2 files
- [`bzcat`](/docs/commands/compression/bzcat) - View bzip2 compressed files
- [`gzip`](/docs/commands/compression/gzip) - Alternative compression utility
- [`xz`](/docs/commands/compression/xz) - High-compression utility
- [`tar`](/docs/commands/compression/tar) - Archive utility with bzip2 support
- [`pbzip2`](/docs/commands/compression/pbzip2) - Parallel bzip2 implementation

## Best Practices

1. **Choose appropriate compression level** based on speed vs. space requirements
2. **Test compressed files** with `-t` before deleting originals
3. **Use `-k` option** when you need to preserve original files
4. **Use `-s` option** on memory-constrained systems
5. **Monitor disk space** when compressing large files
6. **Use compression level 9** for long-term archival
7. **Use compression level 1** for temporary compression
8. **Consider parallel implementations** (`pbzip2`) for multi-core systems
9. **Verify archive integrity** after important compressions
10. **Use standard output** (`-c`) for pipeline operations

## Performance Tips

1. **Higher compression levels** use more memory and CPU time
2. **Level 9** provides best compression but is slowest
3. **Level 1** is fastest but provides lower compression
4. **Use `-s`** to reduce memory usage on constrained systems
5. **Parallel bzip2** (`pbzip2`) can significantly speed up compression on multi-core systems
6. **Combine with tar** for compressing multiple files and directories
7. **Use appropriate block size** for your system memory
8. **Consider SSD storage** for faster compression of large files

The `bzip2` command provides excellent compression ratios, particularly for text files, making it ideal for long-term storage and bandwidth-constrained transfers. While slower than gzip, its superior compression often justifies the additional processing time for archival purposes.