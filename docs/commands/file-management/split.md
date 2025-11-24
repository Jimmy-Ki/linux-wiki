---
title: split - Split a File into Pieces
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# split - Split a File into Pieces

The `split` command splits large files into smaller pieces, making it easier to manage, transfer, or process large datasets. It's commonly used for backup operations, data processing, and file management.

## Basic Syntax

```bash
split [OPTION]... [INPUT [PREFIX]]
```

## Common Options

### Size-based Splitting

- `-b, --bytes=SIZE` - Put SIZE bytes per output file
- `-C, --line-bytes=SIZE` - Put at most SIZE bytes of lines per output file

### Line-based Splitting

- `-l, --lines=NUMBER` - Put NUMBER lines per output file

### Naming Options

- `-d, --numeric-suffixes[=FROM]` - Use numeric suffixes instead of alphabetic
- `-a, --suffix-length=N` - Use suffixes of length N (default 2)
- `--additional-suffix=SUFFIX` - Append an additional SUFFIX to files

### Help Options

- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Size Specifications

SIZE can have multiplier suffixes:
- `b` - 512 bytes
- `KB` - 1000 bytes
- `K` - 1024 bytes
- `MB` - 1,000,000 bytes
- `M` - 1,048,576 bytes (1024×1024)
- `GB` - 1,000,000,000 bytes
- `G` - 1,073,741,824 bytes (1024³)

## Usage Examples

### Basic Splitting

```bash
# Split file into 1MB pieces
split -b 1M large_file.txt

# Split into 1000 line chunks
split -l 1000 data.txt

# Split with custom prefix
split -b 500K backup.tar.gz backup_part

# Split with numeric suffixes
split -d -b 1M data.dat part_
```

### Advanced Splitting

```bash
# Split by bytes with line preservation
split -C 1M text_file.txt

# Split with long suffixes for many files
split -d -a 5 -b 10M huge_file.bin part_

# Split with additional suffix
split -b 100K log.txt backup --additional-suffix=.txt

# Split starting from specific number
split -d -b 1M file.txt part_ --numeric-suffixes=100
```

## Practical Examples

### Backup Operations

```bash
# Split large backup into manageable pieces
tar -czf backup.tar.gz /home/user
split -b 100M backup.tar.gz backup_part_

# Create DVDs from large backup
split -b 4.7G system_backup.iso dvd_image_

# Split database dump
mysqldump -u user -p database > db_dump.sql
split -l 100000 db_dump.sql db_part_
```

### Log File Processing

```bash
# Split daily logs into hourly chunks
split -l 50000 access_log.txt hourly_access_

# Split large error logs
split -b 50M application.log error_part_

# Process logs by time periods
awk '$1 >= "2023-01-01" && $1 < "2023-01-02"' all_logs.txt | split -l 10000 - jan1_logs_
```

### Data Processing

```bash
# Split CSV for parallel processing
split -l 10000 large_dataset.csv csv_part_

# Split configuration file by sections
awk '/^# Section/ {section++} {print > "section_" section ".txt"}' config.conf

# Split by content patterns
awk '/ERROR/ {print > "error.log"} !/ERROR/ {print > "normal.log"}' app.log
```

## Advanced Usage

### Custom Splitting Logic

```bash
# Split by file size patterns
find . -name "*.log" -size +100M -exec split -b 50M {} {}_part_ \;

# Split and compress simultaneously
split -b 100M large_file.txt | gzip > compressed_parts.gz

# Split and calculate checksums
split -b 1GB backup.tar.gz part_
for file in part_*; do md5sum "$file" > "${file}.md5"; done
```

### Script Integration

```bash
# Process split files in parallel
split -l 100000 huge_file.txt chunk_
for chunk in chunk_*; do
    process_chunk "$chunk" &
done
wait

# Split and reassemble pipeline
split -l 1000 data.txt temp_
for temp in temp_*; do
    process_file "$temp" >> processed_output.txt
done
```

### Quality Control

```bash
# Verify split integrity
wc -l original_file.txt
awk '{sum+=$1} END {print "Total lines:", sum}' temp_* | tail -1

# Check byte accuracy
wc -c original_file.txt
cat part_* | wc -c
```

## Real-World Applications

### System Administration

```bash
# Split system logs for archival
split -b 100M /var/log/syslog syslog_$(date +%Y%m%d)_

# Split user home directories for migration
tar -cf - /home/user | split -b 1G - user_backup_

# Split package files for distribution
split -b 650M software.tar.gz cd_image_

# Split mail spools for processing
split -l 50000 /var/mail/username mail_part_
```

### Data Migration

```bash
# Split database exports for import
mysqldump database | split -l 100000 - db_export_

# Split large text files for FTP transfer
split -b 2GB huge_dataset.txt transfer_part_

# Split configuration for deployment
split -p '^# Server' production.conf server_conf_
```

### Development Workflow

```bash
# Split test files for parallel execution
split -l 100 test_cases.txt test_batch_

# Split source code for analysis
find . -name "*.py" | split -l 1000 - py_files_

# Split documentation by sections
awk '/^## / {section++} {print > "section_" section ".md"}' README.md
```

## Special Use Cases

### Media Processing

```bash
# Split large video files for streaming
ffmpeg -i large_video.mp4 -c copy -map 0 -segment_time 600 -f segment video_part_%03d.mp4

# Split audio files by silence
ffmpeg -i audio.mp3 -f segment -segment_time 300 audio_part_%03d.mp3
```

### Network Transfer

```bash
# Split for email attachment limits
split -b 20M large_file.zip email_part_

# Create resume-friendly downloads
split -b 10MB download.zip part_
# Generate download script
for file in part_*; do echo "wget http://example.com/$file"; done > download_script.sh
```

## Recombination Methods

```bash
# Reassemble split files (cat method)
cat part_* > reassembled_file.txt

# Reassemble with specific order
cat part_aa part_ab part_ac > complete_file.txt

# Reassemble numeric files
cat $(ls part_* | sort -V) > recombined_file.txt

# Verify reassembly
md5sum original_file.txt recombined_file.txt
```

## Performance Considerations

### Large File Handling

```bash
# Split with minimal memory usage
split -b 1G huge_file.txt part_

# Use appropriate buffer sizes
split -b 1M --buffer-size=1M large_file.txt

# Split in parallel for multiple files
for file in *.log; do split -b 50M "$file" "${file}_" & done
wait
```

### I/O Optimization

```bash
# Split to different disks for performance
split -b 500M /source/huge_file /target/disk1/part_
split -b 500M /source/huge_file /target/disk2/part_

# Use temporary directory for large operations
TMPDIR=/fast/temp split -b 1G huge_file.txt part_
```

## Automation Scripts

### Backup Script

```bash
#!/bin/bash
# Split backup script
BACKUP_FILE="backup_$(date +%Y%m%d).tar.gz"
tar -czf "$BACKUP_FILE" /important/data
split -b 1G "$BACKUP_FILE" "backup_part_"

# Create reassembly script
cat > reassemble_backup.sh << 'EOF'
#!/bin/bash
cat backup_part_* > backup_reassembled.tar.gz
echo "Backup reassembled successfully"
EOF
chmod +x reassemble_backup.sh
```

### Log Rotation Script

```bash
#!/bin/bash
# Log rotation with splitting
LOG_FILE="/var/log/application.log"
MAX_SIZE="100M"
SPLIT_DIR="/var/log/archive"

# Check log size and split if needed
if [ $(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE") -gt 104857600 ]; then
    split -b "$MAX_SIZE" "$LOG_FILE" "$SPLIT_DIR/app_log_$(date +%Y%m%d)_"
    > "$LOG_FILE"  # Clear original log
fi
```

## Related Commands

- [`cat`](/docs/commands/file-management/cat) - Concatenate files
- [`csplit`](/docs/commands/text-processing/csplit) - Split files based on context
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`tar`](/docs/commands/compression-archiving/tar) - Archive utility
- [`dd`](/docs/commands/file-management/dd) - Convert and copy a file

## Best Practices

1. **Choose appropriate split sizes** for your use case (email limits, media constraints)
2. **Use meaningful prefixes** for easy identification
3. **Verify split integrity** with checksums
4. **Document reassembly procedures** for split files
5. **Consider compression** before splitting for space efficiency
6. **Use numeric suffixes** for large numbers of split files

## Common Pitfalls

### Reassembly Issues

```bash
# Wrong order - files may not sort correctly
cat part_* > wrong_order.txt

# Correct - ensure proper ordering
cat $(ls part_* | sort -V) > correct_order.txt
```

### Space Considerations

```bash
# Not accounting for overhead
split -b 1G exact_file.txt part_  # May create more than 1G parts

# Better - account for overhead
split -b 900M exact_file.txt part_  # Leaves room for overhead
```

The `split` command is essential for managing large files and datasets. Whether for backup operations, data processing, or file transfer, it provides reliable file splitting capabilities that integrate well with other Unix tools.