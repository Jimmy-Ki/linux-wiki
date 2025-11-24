---
title: gunzip - GNU Zip Decompression Utility
sidebar_label: gunzip
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gunzip - GNU Zip Decompression Utility

The `gunzip` command decompresses files that were compressed using the gzip utility. It's essentially a hard link to the gzip command and provides the same decompression functionality. Gunzip can handle files with the `.gz` extension and automatically restores the original filename, permissions, and timestamps when available from the compressed file's metadata.

## Basic Syntax

```bash
gunzip [OPTIONS] [FILES...]
```

## Common Options

### Operation Mode Options
- `-c, --stdout` - Write decompressed output to standard output
- `-d, --decompress` - Force decompression mode
- `-f, --force` - Force decompression, ignore file existence
- `-t, --test` - Test compressed file integrity

### File Handling Options
- `-k, --keep` - Keep (don't delete) compressed files
- `-r, --recursive` - Process directories recursively
- `-S, --suffix=SUF` - Use suffix SUF instead of .gz
- `-n, --no-name` - Don't restore original filename/timestamp
- `-N, --name` - Restore original filename/timestamp

### Information Options
- `-l, --list` - List compression information
- `-v, --verbose` - Verbose mode
- `-q, --quiet` - Suppress warnings
- `-h, --help` - Display help information
- `-V, --version` - Display version information

## Usage Examples

### Basic Decompression Operations

#### Decompressing Single Files
```bash
# Decompress a file (removes .gz file)
gunzip document.txt.gz

# Decompress with verbose output
gunzip -v document.txt.gz

# Keep the compressed file when decompressing
gunzip -k document.txt.gz

# Force decompression (overwrite existing files)
gunzip -f document.txt.gz

# Decompress to standard output
gunzip -c document.txt.gz > document.txt

# Decompress and restore original filename
gunzip -N document.txt.gz
```

#### Alternative Decompression Methods
```bash
# Using gzip -d (equivalent to gunzip)
gzip -d document.txt.gz

# Using zcat to view contents without decompressing
zcat document.txt.gz

# Decompress without removing original
gunzip -c document.txt.gz > document.txt

# Test file before decompression
gunzip -t document.txt.gz && gunzip document.txt.gz
```

### Batch Operations

#### Multiple File Decompression
```bash
# Decompress all .gz files in current directory
gunzip *.gz

# Decompress with verbose output
gunzip -v *.gz

# Keep compressed files when decompressing
gunzip -k *.gz

# Decompress and show compression ratio info
gunzip -l *.gz | gunzip -k

# Force decompression of multiple files
gunzip -f *.gz
```

#### Recursive Directory Processing
```bash
# Decompress all files in directory recursively
gunzip -r /path/to/directory/

# Decompress recursively with verbose output
gunzip -rv /path/to/directory/

# Keep compressed files during recursive decompression
gunzip -rk /path/to/directory/

# Test all compressed files recursively
gunzip -rt /path/to/directory/

# Force recursive decompression
gunzip -rf /path/to/directory/
```

### File Information and Testing

#### Compression Information
```bash
# List compression information
gunzip -l document.txt.gz

# List information for multiple files
gunzip -l *.gz

# Verbose listing with human-readable sizes
gunzip -lv document.txt.gz

# Check compression ratios for all files
gunzip -l *.gz | awk '{print $1" "$2" "$4" compressed: "$3"%"}'

# List with sorted by compression ratio
gunzip -l *.gz | sort -k4 -n
```

#### File Integrity Testing
```bash
# Test compressed file integrity
gunzip -t document.txt.gz

# Test multiple files
gunzip -t *.gz

# Verbose testing with detailed output
gunzip -tv document.txt.gz

# Test all files in directory recursively
gunzip -rt /path/to/compressed/files/

# Test and show only failed files
gunzip -t *.gz 2>&1 | grep -i "error"
```

### Advanced Decompression Techniques

#### Pipeline Operations
```bash
# Decompress and pipe to another command
gunzip -c archive.tar.gz | tar -xvf -

# Decompress and process contents
gunzip -c large_file.txt.gz | grep "pattern"

# Decompress database backup and restore
gunzip -c database_backup.sql.gz | mysql database_name

# Decompress and stream through network
gunzip -c backup.tar.gz | ssh remote "tar -xvf -"

# Decompress multiple archives in sequence
for archive in *.tar.gz; do gunzip -c "$archive" | tar -xvf -; done
```

#### Custom Output Handling
```bash
# Decompress to specific filename
gunzip -c compressed.gz > new_filename.txt

# Decompress and append to existing file
gunzip -c data.gz >> existing_file.txt

# Decompress with permission preservation
gunzip -c config.gz > config && chmod 644 config

# Decompress with timestamp preservation
gunzip -N file.gz

# Decompress to different directory
gunzip -c file.gz > /other/path/file.txt
```

## Practical Examples

### System Administration

#### Log File Restoration
```bash
# Decompress archived log files
gunzip /var/log/messages.1.gz

# Decompress all archived logs
gunzip -r /var/log/

# Decompress logs to specific directory
for file in /backup/logs/*.gz; do gunzip -c "$file" > "/current/logs/$(basename "$file" .gz)"; done

# Decompress and rotate logs
gunzip -c access.log.gz > access.log && mv access.log.gz /archive/

# Test log file integrity before decompression
gunzip -t /var/log/*.gz
```

#### Backup Restoration
```bash
# Decompress system backup
gunzip -c system_backup.tar.gz | tar -xvf /

# Decompress configuration backups
gunzip -c etc_backup.tar.gz | tar -xvf -C /

# Decompress database backup
gunzip -c database_backup.sql.gz | mysql -u user -p database_name

# Decompress and verify backup
gunzip -t backup.tar.gz && gunzip -c backup.tar.gz | tar -tvf -

# Decompress to temporary location first
gunzip -c backup.tar.gz | tar -xvf -C /tmp/restore/
```

### Development Workflow

#### Source Code Extraction
```bash
# Decompress source code archive
gunzip -c project-1.0.0.tar.gz | tar -xvf -

# Decompress and extract to specific directory
gunzip -c archive.tar.gz | tar -xvf -C /target/directory/

# Batch extract multiple archives
for archive in *.tar.gz; do gunzip -c "$archive" | tar -xvf -; done

# Decompress and remove archive if successful
gunzip -t archive.tar.gz && gunzip archive.tar.gz
```

#### Data Processing
```bash
# Decompress large dataset for analysis
gunzip -c dataset.csv.gz | python analyze.py

# Decompress and filter data
gunzip -c logs.gz | grep "ERROR" > errors.log

# Decompress and convert data format
gunzip -c data.json.gz | jq '.[] | .name' > names.txt

# Decompress and process in parallel
find /data -name "*.gz" -print0 | parallel -0 gunzip -c {} | process_data
```

### File Management

#### Batch Processing
```bash
# Decompress all files and organize by date
for file in *.gz; do
    date=$(date -r "$file" +%Y%m%d)
    gunzip -c "$file" > "processed_${date}_$(basename "$file" .gz)"
done

# Decompress with size limits
find /compressed -name "*.gz" -size +100M -exec gunzip {} \;

# Decompress and rename systematically
for file in document_*.txt.gz; do
    gunzip -c "$file" > "final_$(basename "$file" .gz)"
done

# Decompress based on compression ratio
gunzip -l *.gz | awk '$3 < 50 {print $4}' | xargs gunzip
```

#### Space Management
```bash
# Test files before decompression to save space
gunzip -t *.gz && gunzip -k *.gz

# Decompress only needed files
gunzip -c required_files.gz | grep "pattern"

# Decompress to different filesystem
gunzip -c large_file.gz > /mnt/large_storage/large_file

# Decompress and compress with different format
gunzip -c file.gz | xz -9 > file.xz
```

## Advanced Usage

### Performance Optimization

#### Batch Operations
```bash
# Parallel decompression
find /path -name "*.gz" -print0 | parallel -0 -j4 gunzip

# Use find with xargs for multiple files
find /logs -name "*.log.gz" | xargs -P 4 gunzip

# Decompress with progress monitoring
find /data -name "*.gz" -exec gunzip -v {} \; | pv -l > /dev/null

# Batch decompression with error handling
for file in *.gz; do
    if gunzip -t "$file"; then
        gunzip "$file"
        echo "Decompressed: $file"
    else
        echo "Error in file: $file"
    fi
done
```

#### Memory and Storage Management
```bash
# Decompress large files to avoid memory issues
gunzip -c huge_file.gz | split -b 1G - split_part.

# Decompress and stream to avoid disk space issues
gunzip -c large_archive.tar.gz | tar -xvf -C /target/

# Decompress with temporary storage
TMPDIR=/tmp gunzip -c file.gz > /final/destination/file

# Monitor decompression progress
gunzip -v large_file.gz 2>&1 | grep -E "(\.gz:|%)"
```

### File Integrity and Recovery

#### Verification and Testing
```bash
# Comprehensive integrity check
find /compressed -name "*.gz" -exec gunzip -t {} \;

# Test and report only failed files
find /compressed -name "*.gz" -exec bash -c 'if ! gunzip -t "$1"; then echo "Failed: $1"; fi' _ {} \;

# Batch verification with logging
for file in *.gz; do
    if gunzip -t "$file" 2>/dev/null; then
        echo "OK: $file" >> verification.log
    else
        echo "FAIL: $file" >> verification.log
    fi
done
```

#### Error Recovery
```bash
# Attempt partial recovery from corrupted files
gunzip -c corrupted.gz > recovered.txt 2>/dev/null

# Decompress with error tolerance
gunzip -f possibly_corrupt.gz

# Test and report detailed errors
gunzip -tv problematic.gz

# Skip problematic files in batch
for file in *.gz; do gunzip -t "$file" 2>/dev/null && gunzip "$file"; done
```

### Special Operations

#### Working with Different File Formats
```bash
# Handle files with custom extensions
gunzip -S .compressed file.compressed

# Decompress files without .gz extension
gunzip -f file_without_extension

# Decompress and rename based on content
gunzip -c unknown.gz | file - -

# Handle files with different encodings
gunzip -c file.gz | iconv -f latin1 -t utf8 > file_utf8.txt
```

#### Metadata Preservation
```bash
# Restore original timestamps
gunzip -N file.gz

# Decompress without filename restoration
gunzip -n file.gz

# Check original filename in compressed file
gunzip -l file.gz | awk '{print $4}'

# Decompress with specific ownership
sudo gunzip -c system_file.gz > system_file && sudo chown root:root system_file
```

## Troubleshooting

### Common Issues

#### File Not Found Errors
```bash
# Check if file exists and is readable
ls -la file.gz

# Test file before attempting decompression
gunzip -t file.gz

# Check file type
file file.gz

# Handle permissions issues
sudo gunzip file.gz
```

#### Disk Space Issues
```bash
# Check available space before decompression
df -h .

# Decompress to different location
gunzip -c large_file.gz > /other/location/large_file

# Decompress and pipe to process to save space
gunzip -c data.gz | process_data

# Monitor space usage during decompression
df -h . && gunzip -v large_file.gz
```

#### Permission Problems
```bash
# Check file permissions
ls -l file.gz

# Change permissions if needed
chmod 644 file.gz

# Decompress with sudo if necessary
sudo gunzip file.gz

# Preserve permissions during decompression
gunzip -c file.gz > file && chmod --reference=file.gz file
```

## Integration with Other Tools

### Shell Scripts

#### Automated Decompression
```bash
#!/bin/bash
# Automated backup restoration script

BACKUP_DIR="/backups"
RESTORE_DIR="/restore"
DATE=$(date +%Y%m%d)

for backup in "$BACKUP_DIR"/*_"$DATE".tar.gz; do
    if gunzip -t "$backup"; then
        echo "Restoring: $(basename "$backup")"
        gunzip -c "$backup" | tar -xvf -C "$RESTORE_DIR/"
    else
        echo "Error in backup: $(basename "$backup")"
    fi
done
```

#### Log Processing Script
```bash
#!/bin/bash
# Process compressed log files

LOG_DIR="/var/log/old"
OUTPUT_DIR="/processed/logs"

mkdir -p "$OUTPUT_DIR"

for log_file in "$LOG_DIR"/*.gz; do
    if [ -f "$log_file" ]; then
        filename=$(basename "$log_file" .gz)
        echo "Processing: $filename"
        gunzip -c "$log_file" | grep "ERROR" > "$OUTPUT_DIR/${filename}_errors.log"
        gunzip -c "$log_file" | grep "WARNING" > "$OUTPUT_DIR/${filename}_warnings.log"
    fi
done
```

### Pipeline Operations

#### Complex Data Processing
```bash
# Decompress, filter, and re-compress
gunzip -c large_data.json.gz | jq '.status == "active"' | gzip > active_data.json.gz

# Decompress and analyze
gunzip -c access.log.gz | awk '{print $1}' | sort | uniq -c | sort -nr

# Decompress database dump and import
gunzip -c backup.sql.gz | mysql -u user -p database_name

# Decompress and create reports
gunzip -c sales_data.csv.gz | python generate_report.py > report.html
```

## Related Commands

- [`gzip`](/docs/commands/compression/gzip) - Compress files (same utility)
- [`zcat`](/docs/commands/compression/zcat) - View compressed file contents
- [`zless`](/docs/commands/compression/zless) - View compressed files with less
- [`zmore`](/docs/commands/compression/zmore) - View compressed files with more
- [`bzcat`](/docs/commands/compression/bzcat) - View bzip2 compressed files
- [`xzcat`](/docs/commands/compression/xzcat) - View xz compressed files
- [`tar`](/docs/commands/compression/tar) - Archive utility with decompression support
- [`unzip`](/docs/commands/compression/unzip) - Extract ZIP archives

## Best Practices

1. **Test compressed files** with `-t` before decompression
2. **Use `-k` option** to preserve compressed files when needed
3. **Check available disk space** before decompressing large files
4. **Use verbose mode** (`-v`) to monitor decompression progress
5. **Verify file permissions** before and after decompression
6. **Use `-c` for pipeline operations** to avoid intermediate files
7. **Process files in batches** for better performance
8. **Handle errors gracefully** in automated scripts
9. **Use absolute paths** when decompressing system files
10. **Consider using alternatives** like `zcat` for viewing without decompression

## Performance Tips

1. **Use parallel processing** for multiple files
2. **Decompress to different filesystem** if space is limited
3. **Use `-c` option** for streaming operations
4. **Batch operations** are more efficient than individual decompression
5. **Test files first** to avoid wasting time on corrupted files
6. **Use appropriate buffering** for very large files
7. **Monitor system resources** during large decompression operations
8. **Use `-f` carefully** as it may overwrite important files

The `gunzip` command is a fundamental utility for working with compressed files on Linux systems. While it's essentially the same as `gzip -d`, it provides a more intuitive interface for decompression operations and is widely used in system administration, backup restoration, and data processing workflows.