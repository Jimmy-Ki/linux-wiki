---
title: gzip - GNU Zip Compression Utility
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gzip - GNU Zip Compression Utility

The `gzip` command compresses and decompresses files using the Lempel-Ziv coding (LZ77) algorithm. It's one of the most widely used compression utilities on Linux and Unix systems, offering excellent compression ratios for text files (typically 60-70% reduction). Gzip creates files with the `.gz` extension and preserves the original file permissions, ownership, and timestamps.

## Basic Syntax

```bash
gzip [OPTIONS] [FILES...]
```

## Common Options

### Compression Level Options
- `-1, --fast` - Fastest compression (low compression ratio)
- `-9, --best` - Best compression (slowest speed)
- `-N` - Compression level (1-9, default: 6)

### Operation Mode Options
- `-d, --decompress` - Decompress files
- `-c, --stdout` - Write output to standard output
- `-f, --force` - Force compression/decompression
- `-t, --test` - Test compressed file integrity

### File Handling Options
- `-k, --keep` - Keep (don't delete) input files
- `-r, --recursive` - Process directories recursively
- `-S, --suffix=SUF` - Use suffix SUF instead of .gz
- `-n, --no-name` - Don't save original filename/timestamp
- `-N, --name` - Save or restore original filename/timestamp

### Information Options
- `-l, --list` - List compressed file information
- `-v, --verbose` - Verbose mode
- `-q, --quiet` - Suppress warnings
- `-h, --help` - Display help information
- `-V, --version` - Display version information

## Usage Examples

### Basic Compression Operations

#### Compressing Single Files
```bash
# Compress a single file (original file is replaced)
gzip document.txt

# Compress with verbose output
gzip -v document.txt

# Compress with specific compression level
gzip -9 document.txt  # Best compression
gzip -1 document.txt  # Fastest compression

# Keep original file while compressing
gzip -k document.txt

# Compress to standard output (keep original)
gzip -c document.txt > document.txt.gz

# Force compression of already compressed file
gzip -f document.txt.gz
```

#### Decompressing Files
```bash
# Decompress a file (using gzip)
gzip -d document.txt.gz

# Decompress using gunzip command
gunzip document.txt.gz

# Decompress to standard output
gzip -dc document.txt.gz

# Keep compressed file when decompressing
gzip -dk document.txt.gz

# Force decompression even if file exists
gzip -df document.txt.gz

# Decompress and restore original filename
gzip -N document.txt.gz
```

### Batch Operations

#### Multiple File Compression
```bash
# Compress multiple files
gzip file1.txt file2.txt file3.txt

# Compress all text files in current directory
gzip *.txt

# Compress all files (using wildcard)
gzip *

# Compress with specific suffix
gzip -S .zipped *.log

# Compress and keep original files
gzip -k *.conf
```

#### Recursive Directory Processing
```bash
# Compress all files in directory recursively
gzip -r /path/to/directory/

# Decompress all files recursively
gzip -dr /path/to/directory/

# Compress directory with verbose output
gzip -rv logs/

# Force recursive compression
gzip -rf /path/to/files/

# Recursive compression with specific level
gzip -r9 /backup/directory/
```

### Information and Testing

#### File Information
```bash
# List compression information
gzip -l document.txt.gz

# List information for multiple files
gzip -l *.gz

# Verbose listing
gzip -lv document.txt.gz

# List with human-readable sizes
gzip -l *.gz | awk '{print $1, $2, $4}'

# Check compression ratio
gzip -l document.txt.gz
```

#### Testing Archives
```bash
# Test compressed file integrity
gzip -t document.txt.gz

# Test multiple files
gzip -t *.gz

# Verbose testing
gzip -tv document.txt.gz

# Test and show detailed errors
gzip -tv backup.tar.gz
```

### Advanced Compression Techniques

#### Pipeline Operations
```bash
# Compress output of a command
tar -cf - /path/to/data | gzip > backup.tar.gz

# Create compressed archive in one step
tar -czf backup.tar.gz /path/to/data/

# Compress and stream through network
tar -cf - /path/to/data | gzip | ssh user@server "cat > backup.tar.gz"

# Decompress and extract through network
ssh user@server "cat backup.tar.gz" | gzip -dc | tar -xf -

# Compress database dump
mysqldump database_name | gzip > database_backup.sql.gz
```

#### Custom Compression Settings
```bash
# Use environment variable for compression level
GZIP=9 gzip -c large_file.txt > compressed.gz

# Create compressed archive with specific level
tar -I "gzip -9" -cf archive.tar.gz files/

# Compress with custom suffix
gzip -S .backup *.log

# Fast compression for time-sensitive operations
gzip -1 quick_backup.tar

# Maximum compression for long-term storage
gzip -9 archive.tar
```

## Practical Examples

### System Administration

#### Log File Management
```bash
# Compress old log files
gzip /var/log/messages.old

# Compress all rotated log files
find /var/log -name "*.old" -exec gzip {} \;

# Compress logs recursively
gzip -r /var/log/old/

# Compress and timestamp logs
gzip -c access.log > access_$(date +%Y%m%d).log.gz

# Rotate and compress logs
logrotate -f /etc/logrotate.d/apache2

# Compress application logs while preserving originals
gzip -k /var/log/app/*.log
```

#### Backup Operations
```bash
# Compress backup files after creation
gzip backup_$(date +%Y%m%d).tar

# Create compressed backup of configuration files
tar -cf - /etc/* | gzip > etc_backup_$(date +%Y%m%d).tar.gz

# Compress user home directory
tar -cf - /home/user | gzip -9 > home_backup_$(date +%Y%m%d).tar.gz

# Compress database backups
mysqldump --all-databases | gzip > full_db_backup_$(date +%Y%m%d).sql.gz

# Compress and verify backup
tar -cf - /important/data | gzip > backup.tar.gz
gzip -t backup.tar.gz
```

### Development Workflow

#### Source Code Management
```bash
# Compress source distribution
tar -czf project-1.0.0.tar.gz --exclude='.git' project/

# Compress build artifacts
gzip build/*.log

# Create compressed archive with specific level
tar -I "gzip -9" -cf production_build.tar.gz dist/

# Compress test results
gzip test_results.xml

# Compress and move large files
gzip -c large_dataset.csv > /archive/large_dataset.csv.gz
```

#### File Transfer Optimization
```bash
# Compress files before transfer
gzip -c large_file.dat | ssh remote "cat > /remote/path/large_file.dat.gz"

# Compress directory for email attachment
tar -czf attachment.tar.gz documents/

# Create compressed archive for web distribution
gzip -c stylesheet.css > stylesheet.css.gz

# Compress API responses (for testing)
curl -s "http://api.example.com/data" | gzip > api_response.json.gz
```

### Data Processing

#### Text File Compression
```bash
# Compress large text files
gzip -9 large_text_file.txt

# Compress all CSV files in directory
gzip -k *.csv

# Create compressed archive of log files
cat *.log | gzip > combined_logs.log.gz

# Compress and split large file
gzip -c huge_file.txt | split -b 100M - huge_file.gz.part.

# Extract specific parts of compressed log
gzip -dc access.log.gz | grep "ERROR"
```

#### Batch Processing
```bash
# Compress all files older than 30 days
find /data -type f -mtime +30 -exec gzip {} \;

# Compress but keep original for important files
find /critical -name "*.log" -exec gzip -k {} \;

# Compress based on file size
find /data -type f -size +10M -exec gzip -9 {} \;

# Compress with progress monitoring
find /large/files -type f -exec gzip -v {} \;

# Compress with specific naming pattern
for file in *.txt; do gzip -c "$file" > "${file%.txt}_$(date +%Y%m%d).txt.gz"; done
```

## Advanced Usage

### Performance Optimization

#### Parallel Processing
```bash
# Use find with parallel for multiple files
find /path -type f -print0 | parallel -0 gzip {}

# Use xargs for parallel compression
find /logs -name "*.log" | xargs -P 4 gzip

# Compress with GNU parallel
ls *.txt | parallel -j 4 gzip {}

# Monitor compression performance
time gzip -9 large_file.txt
```

#### Memory and CPU Usage
```bash
# Fast compression for time-critical operations
gzip -1 file.txt

# Best compression for space-critical operations
gzip -9 file.txt

# Use environment variable for default level
export GZIP="-6"
gzip file.txt

# Monitor compression process
gzip -v large_file.txt | pv > file.txt.gz
```

### File Management

#### Filename and Metadata Handling
```bash
# Compress without preserving original filename
gzip -n file.txt

# Decompress and restore original filename
gzip -N file.txt.gz

# Use custom suffix
gzip -S .compressed file.txt

# Preserve timestamps exactly
gzip --best --no-name file.txt

# Compress with specific permissions
chmod 644 file.txt && gzip file.txt
```

#### Working with Special Files
```bash
# Compress device files (careful!)
gzip -c /dev/sda1 > disk_image.img.gz

# Compress while avoiding symbolic links
find /path -type f ! -type l -exec gzip {} \;

# Handle spaces in filenames
find /path -name "*.txt" -print0 | xargs -0 gzip

# Compress hard links (will break them)
gzip -k file_with_hard_links.txt
```

## Troubleshooting

### Common Issues

#### File Corruption
```bash
# Test compressed file integrity
gzip -t file.txt.gz

# Verbose testing for detailed information
gzip -tv file.txt.gz

# Recover what you can from corrupted file
gzip -d -c corrupted_file.gz > recovered_file.txt

# Check file type before decompression
file compressed_file.gz
```

#### Permission Problems
```bash
# Handle permission denied errors
sudo gzip /var/log/syslog

# Change permissions before compression
chmod 644 file.txt && gzip file.txt

# Decompress with specific ownership
sudo gzip -d file.txt.gz && sudo chown user:group file.txt
```

#### Disk Space Issues
```bash
# Compress to different location
gzip -c large_file.txt > /tmp/large_file.txt.gz

# Clean up after compression
gzip file.txt && rm file.txt

# Use temporary file for large operations
gzip -c file.txt > /tmp/temp.gz && mv /tmp/temp.gz file.txt.gz
```

## Integration with Other Tools

### Shell Scripts

#### Automated Compression
```bash
#!/bin/bash
# Daily log compression script

LOG_DIR="/var/log"
DAYS_OLD=7

find "$LOG_DIR" -name "*.log" -mtime +$DAYS_OLD -exec gzip -f {} \;

echo "Compression completed: $(date)"
```

#### Backup Script Integration
```bash
#!/bin/bash
# Backup and compress important data

SOURCE="/home/user/documents"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

tar -cf - "$SOURCE" | gzip -9 > "$BACKUP_DIR/backup_$DATE.tar.gz"

# Verify the backup
if gzip -t "$BACKUP_DIR/backup_$DATE.tar.gz"; then
    echo "Backup created successfully"
else
    echo "Backup verification failed"
    rm "$BACKUP_DIR/backup_$DATE.tar.gz"
fi
```

### Piping and Redirection

#### Complex Data Processing
```bash
# Extract, process, and re-compress
gzip -dc data.txt.gz | grep "pattern" | gzip > filtered_data.txt.gz

# Compress output of database query
psql -d database -c "SELECT * FROM table" | gzip > query_output.sql.gz

# Create compressed checksums
find /important -type f -exec md5sum {} \; | gzip > checksums.md5.gz

# Compress network capture
tcpdump -i eth0 -w - | gzip > network_capture.pcap.gz
```

## Related Commands

- [`gunzip`](/docs/commands/compression/gunzip) - Decompress files
- [`zcat`](/docs/commands/compression/zcat) - View compressed files
- [`bzip2`](/docs/commands/compression/bzip2) - Alternative compression utility
- [`xz`](/docs/commands/compression/xz) - High-compression utility
- [`tar`](/docs/commands/compression/tar) - Archive utility with gzip support
- [`zip`](/docs/commands/compression/zip) - ZIP file format compression
- [`compress`](/docs/commands/compression/compress) - Legacy Unix compression
- [`uncompress`](/docs/commands/compression/uncompress) - Legacy decompression

## Best Practices

1. **Choose appropriate compression level** based on time vs. space requirements
2. **Test compressed files** before deleting originals with `-t` option
3. **Use `-k` option** when you need to preserve original files
4. **Combine with tar** for compressing multiple files and directories
5. **Use verbose mode** (`-v`) during operations to monitor progress
6. **Check file permissions** before compression operations
7. **Consider using alternative formats** (xz, bzip2) for better compression ratios
8. **Monitor disk space** when compressing large files
9. **Use standard output** (`-c`) for pipeline operations
10. **Preserve timestamps** with `-N` when creating archives

## Performance Tips

1. **Use `-1` for fast compression** when time is critical
2. **Use `-9` for best compression** when space is limited
3. **Parallelize operations** for multiple files
4. **Use compression level 6** for balanced performance
5. **Avoid re-compressing already compressed files**
6. **Use `-c` for pipe operations** to avoid intermediate files
7. **Monitor CPU usage** on production systems
8. **Consider hardware compression** for very large datasets

The `gzip` command is an essential tool for file compression on Linux systems, offering an excellent balance of speed, compression ratio, and compatibility. Understanding its options and best practices will help you efficiently manage file storage and optimize data transfer operations.