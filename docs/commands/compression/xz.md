---
title: xz - XZ Format Compression Utility
sidebar_label: xz
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# xz - XZ Format Compression Utility

The `xz` command compresses and decompresses files using the XZ format, which utilizes the LZMA2 compression algorithm. XZ provides superior compression ratios compared to gzip and bzip2 while maintaining reasonable decompression speeds. It's particularly effective for compressing text files and is increasingly becoming the standard for compressing software distributions and system backups.

## Basic Syntax

```bash
xz [OPTIONS] [FILES...]
```

## Common Options

### Operation Mode
- `-z, --compress` - Force compression (default)
- `-d, --decompress` - Force decompression
- `-t, --test` - Test compressed file integrity
- `-l, --list` - List information about .xz files

### File Handling
- `-k, --keep` - Keep (don't delete) input files
- `-f, --force` - Force overwrite of output files
- `-c, --stdout` - Write to standard output

### Compression Settings
- `-0` to `-9` - Compression preset (default: 6)
- `-e, --extreme` - Try to improve compression ratio using more CPU time
- `-T, --threads=NUM` - Use up to NUM threads (default: 1, 0 = auto)

### Output Control
- `-q, --quiet` - Suppress warnings (use twice for errors too)
- `-v, --verbose` - Verbose mode (use twice for more detail)
- `-h, --help` - Display help information
- `-H, --long-help` - Display more detailed help
- `-V, --version` - Display version information

## Usage Examples

### Basic Compression

#### Single File Operations
```bash
# Compress a file (replaces original with .xz)
xz document.txt

# Compress with verbose output
xz -v document.txt

# Compress with specific compression level
xz -6 document.txt  # Default level
xz -0 document.txt  # Fastest
xz -9 document.txt  # Best compression

# Keep original file when compressing
xz -k document.txt

# Force compression (overwrite existing .xz file)
xz -f document.txt

# Compress to standard output
xz -c document.txt > compressed.xz
```

#### Decompression
```bash
# Decompress a file (replaces .xz with original)
xz -d document.txt.xz

# Using unxz command
unxz document.txt.xz

# Decompress keeping compressed file
xz -dk document.txt.xz

# Decompress to standard output
xz -dc document.txt.xz

# Force decompression
xz -df document.txt.xz
```

### Advanced Compression

#### Extreme Compression
```bash
# Use extreme compression mode
xz -e document.txt

# Extreme compression with highest level
xz -e9 document.txt

# Extreme compression with multiple threads
xz -e9 -T4 document.txt

# Test different compression presets
for preset in {0..9}; do
    echo "Testing preset $preset:"
    xz -$preset document.txt && ls -lh document.txt.xz
    rm document.txt.xz
done
```

#### Multi-threaded Compression
```bash
# Use 4 threads for compression
xz -T4 document.txt

# Use automatic thread detection
xz -T0 document.txt

# Compress multiple files in parallel
find /data -name "*.txt" -print0 | parallel -0 -j4 xz

# Monitor CPU usage during compression
htop &
xz -T8 large_file.txt
```

### File Information and Testing

#### File Information
```bash
# List information about compressed file
xz -l document.txt.xz

# List with detailed information
xz -lv document.txt.xz

# List information about multiple files
xz -l *.xz

# List with human-readable sizes
xz -l document.txt.xz | awk '{print $4, $5, $8, $9}'
```

#### Integrity Testing
```bash
# Test compressed file integrity
xz -t document.txt.xz

# Test with verbose output
xz -tv document.txt.xz

# Test multiple files
xz -t *.xz

# Comprehensive integrity check with logging
find /compressed -name "*.xz" -exec bash -c 'if xz -t "$1" 2>/dev/null; then echo "OK: $1"; else echo "FAIL: $1"; fi' _ {} \;
```

## Practical Examples

### System Administration

#### Package Management
```bash
# Compress log files for distribution
xz -9 system.log

# Compress kernel modules
find /lib/modules -name "*.ko" -exec xz -k {} \;

# Compress package files
tar -cf - package/ | xz -9 > package.tar.xz

# Create highly compressed system backup
tar -cf - /etc /home | xz -e9T0 > full_backup.tar.xz
```

#### Log Management
```bash
# Compress old log files
find /var/log -name "*.log.*" -mtime +30 -exec xz {} \;

# Compress with specific settings for text logs
find /var/log -name "*.log.*" -mtime +30 -exec xz -e6 {} \;

# Rotate and compress application logs
for log in /var/log/app/*.log; do
    mv "$log" "${log}.$(date +%Y%m%d)"
    xz -9 "${log}.$(date +%Y%m%d)"
done

# Compress database dumps
mysqldump database_name | xz -9 > database_backup_$(date +%Y%m%d).sql.xz
```

### Development Workflow

#### Software Distribution
```bash
# Create compressed source distribution
tar -cf - source/ | xz -e9T0 > project-1.0.0.tar.xz

# Compress build artifacts
xz -k build/*.log build/*.xml

# Create patch archives
git diff | xz > feature.patch.xz

# Compress documentation
tar -cf - docs/ | xz -6 > documentation.tar.xz

# Create release package with maximum compression
tar -cf - release/ | xz -e9 -T0 > release-$(git describe --tags).tar.xz
```

#### Data Processing
```bash
# Compress large datasets efficiently
xz -e9T0 large_dataset.csv

# Process compressed data directly
xz -dc data.csv.xz | python process.py

# Compress multiple data files
find /data -name "*.csv" -mtime +7 -exec xz -k {} \;

# Create compressed archive for cloud storage
tar -cf - /important/data | xz -e6 -T4 > cloud_archive.tar.xz
```

### Performance Optimization

#### CPU Utilization
```bash
# Use all available CPU cores
xz -T0 large_file.txt

# Limit CPU usage with specific thread count
xz -T2 sensitive_operation.txt

# Monitor compression performance
time xz -T8 large_file.txt

# Benchmark different settings
for threads in {1,2,4,8}; do
    echo "Testing with $threads threads:"
    /usr/bin/time xz -T$threads large_file.txt
done
```

#### Memory Management
```bash
# Use preset that fits your memory
xz -2 large_file.txt  # Lower memory usage
xz -6 large_file.txt  # Default balance
xz -9 large_file.txt  # Higher memory usage

# Monitor memory usage
/usr/bin/time -v xz large_file.txt

# Compress with reduced memory (lower preset)
xz -1 -T1 memory_constrained.txt
```

## Advanced Usage

### Pipeline Operations

#### Stream Processing
```bash
# Compress output of commands
ls -la | xz > directory_listing.xz

# Compress database dump
pg_dump database | xz -9 > db_dump.sql.xz

# Decompress and process immediately
xz -dc data.xz | grep "pattern"

# Create compressed archive over network
tar -cf - /data | xz -T4 | ssh remote "cat > remote_data.tar.xz"

# Decompress remote data
ssh remote "cat remote_data.tar.xz" | xz -dc | tar -xf -
```

#### Format Conversion
```bash
# Convert gzip to xz
gunzip -c file.gz | xz > file.xz

# Convert tar.gz to tar.xz
gunzip -c archive.tar.gz | xz -6 > archive.tar.xz

# Create multiple compression formats
tar -cf - data | tee >(gzip > data.tar.gz) | xz > data.tar.xz

# Compare compression ratios
for format in gz bz2 xz; do
    tar -cf - data | $format > data.tar.$format
    ls -lh data.tar.$format
done
```

### Batch Processing

#### Parallel Operations
```bash
# Compress multiple files in parallel
find /data -name "*.txt" -print0 | parallel -0 -j4 xz -6

# Parallel compression with custom settings
ls *.log | parallel -j2 xz -e9

# Batch decompression
find /compressed -name "*.xz" -print0 | parallel -0 xz -d

# Compress with progress monitoring
find /large/files -name "*.txt" -print0 | parallel -0 xz -v
```

#### Smart Compression Scripts
```bash
#!/bin/bash
# Intelligent file compression based on type

compress_smart() {
    local file="$1"

    case "$file" in
        *.txt|*.log|*.csv|*.json|*.xml)
            echo "Compressing text file: $file"
            xz -e9T0 "$file"
            ;;
        *.jpg|*.png|*.gif|*.mp3|*.avi)
            echo "Skipping compressed media file: $file"
            ;;
        *)
            echo "Compressing unknown file type: $file"
            xz -6 "$file"
            ;;
    esac
}

# Usage
compress_smart document.txt
```

## Special Operations

### Archive Management

#### Multi-volume Archives
```bash
# Create split archive (requires external tools)
tar -cf - /large/data | xz -c | split -b 1G - archive.part.

# Recombine split archives
cat archive.part.* | xz -dc | tar -xf -

# Create encrypted compressed archive
tar -cf - /sensitive/data | gpg --symmetric | xz > secure.tar.xz.gpg
```

#### Integrity Verification
```bash
# Verify all compressed files in directory
find /compressed -name "*.xz" -exec xz -t {} \;

# Create checksums for compressed files
find /compressed -name "*.xz" -exec sha256sum {} \; > checksums.txt

# Verify checksums
sha256sum -c checksums.txt

# Test and report only failed files
find /data -name "*.xz" -exec bash -c 'if ! xz -t "$1" 2>/dev/null; then echo "Corrupted: $1"; fi' _ {} \;
```

## Troubleshooting

### Common Issues

#### Memory Issues
```bash
# Out of memory during compression
# Solution: Use lower compression preset
xz -1 large_file.txt

# Monitor memory usage
/usr/bin/time -v xz large_file.txt

# Check available memory
free -h

# Use single thread to reduce memory usage
xz -T1 large_file.txt
```

#### Performance Issues
```bash
# Slow compression
# Solution: Use faster preset or more threads
xz -1 -T0 large_file.txt

# Check CPU usage
top -p $(pidof xz)

# Benchmark different settings
for preset in {0..6}; do
    echo "Preset $preset:"
    time xz -$preset test_file.txt
done
```

#### File Corruption
```bash
# Test file integrity
xz -t corrupted.xz

# Attempt to recover partial data
xz -dc partially_corrupted.xz > recovered_data.txt 2>/dev/null

# Check file headers
file compressed_file.xz

# Verify with detailed output
xz -tv compressed_file.xz
```

## Integration Examples

### Shell Scripts

#### Backup Script
```bash
#!/bin/bash
# Advanced backup script with XZ compression

BACKUP_DIR="/backups"
SOURCE_DIR="/home/user/documents"
DATE=$(date +%Y%m%d_%H%M%S)
THREADS=$(nproc)
COMPRESSION_LEVEL=9

# Create compressed backup
backup_file="$BACKUP_DIR/backup_$DATE.tar.xz"

echo "Creating backup: $backup_file"
tar -cf - "$SOURCE_DIR" | xz -e$COMPRESSION_LEVEL -T$THREADS > "$backup_file"

# Verify backup
if xz -t "$backup_file"; then
    echo "Backup created successfully"

    # Display compression ratio
    original_size=$(du -sh "$SOURCE_DIR" | cut -f1)
    compressed_size=$(du -sh "$backup_file" | cut -f1)
    echo "Original size: $original_size"
    echo "Compressed size: $compressed_size"
else
    echo "Backup verification failed!"
    rm "$backup_file"
    exit 1
fi

# Clean old backups (keep last 7 days)
find "$BACKUP_DIR" -name "backup_*.tar.xz" -mtime +7 -delete
```

#### Log Rotation Script
```bash
#!/bin/bash
# Log rotation with XZ compression

LOG_DIR="/var/log/app"
MAX_SIZE="100M"
COMPRESSION_THREADS=2

# Rotate and compress large logs
find "$LOG_DIR" -name "*.log" -size +$MAX_SIZE -exec bash -c '
    log="$1"
    base="${log%.log}"
    timestamp=$(date +%Y%m%d_%H%M%S)

    # Rotate log
    mv "$log" "${base}_${timestamp}.log"

    # Compress with optimal settings
    xz -e6 -T'$COMPRESSION_THREADS' "${base}_${timestamp}.log"

    echo "Rotated and compressed: $(basename "$log")"
' _ {} \;

# Clean old compressed logs
find "$LOG_DIR" -name "*.log.xz" -mtime +30 -delete
```

## Related Commands

- [`unxz`](/docs/commands/compression/unxz) - Decompress XZ files
- [`xzcat`](/docs/commands/compression/xzcat) - View XZ compressed files
- [`xzdec`](/docs/commands/compression/xzdec) - Decompress XZ files (liblzma)
- [`gzip`](/docs/commands/compression/gzip) - Alternative compression utility
- [`bzip2`](/docs/commands/compression/bzip2) - Alternative compression utility
- [`tar`](/docs/commands/compression/tar) - Archive utility with XZ support
- [`7z`](/docs/commands/compression/7z) - 7-Zip archiver with XZ support

## Best Practices

1. **Use preset 6** for balanced compression and speed (default)
2. **Use extreme mode (-e)** for maximum compression on important files
3. **Utilize multiple threads (-T0)** on multi-core systems
4. **Test compressed files** with `-t` before deleting originals
5. **Use appropriate presets** based on available memory and CPU
6. **Monitor system resources** during large compression operations
7. **Choose compression level** based on file type and usage patterns
8. **Use `-k` option** when you need to preserve original files
9. **Consider file size** when choosing compression level
10. **Use pipeline operations** for efficient processing

## Performance Tips

1. **Higher presets** use more memory but provide better compression
2. **Multi-threading** significantly speeds up compression on multi-core systems
3. **Extreme mode** can improve compression by 5-10% with more CPU time
4. **Preset 6** provides good balance for most use cases
5. **Preset 0-3** are faster but have lower compression ratios
6. **Preset 7-9** provide better compression but use more memory
7. **Text files** compress particularly well with XZ
8. **Already compressed files** (images, videos) won't benefit much

The `xz` command represents the state-of-the-art in general-purpose compression, offering excellent compression ratios with reasonable speeds. Its multi-threading capabilities and advanced LZMA2 algorithm make it ideal for compressing software distributions, system backups, and large text files where space efficiency is paramount.