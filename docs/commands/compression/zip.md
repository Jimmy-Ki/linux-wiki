---
title: zip - Package and Compress Files
sidebar_label: zip
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# zip - Package and Compress Files

The `zip` command is a widely used compression and packaging utility that creates ZIP archives containing compressed files and directories. It's compatible across multiple platforms (Windows, macOS, Linux) making it ideal for file distribution and exchange. Zip supports various compression levels, password protection, and can handle multiple files and directory structures efficiently.

## Basic Syntax

```bash
zip [OPTIONS] ZIPFILE [FILES...]
```

## Common Options

### Compression Level Options
- `-0` - Store only (no compression)
- `-1` - Fastest compression
- `-9` - Best compression (default: 6)

### Operation Mode Options
- `-f, --freshen` - Freshen existing files (changed files only)
- `-u, --update` - Update existing files and add new ones
- `-d, --delete` - Delete entries from zip file
- `-m, --move` - Move files into zip (delete originals)
- `-r, --recursive` - Recurse into directories

### File Selection Options
- `-x PATTERN` - Exclude files matching pattern
- `-i PATTERN` - Include only files matching pattern
- `-@` - Read filenames from stdin
- `-n SUFFIXES` - Don't compress files with these suffixes

### Output and Display Options
- `-v, --verbose` - Verbose mode
- `-q, --quiet` - Quiet operation
- `-l, --to-crlf` - Convert LF to CRLF
- `-ll, --from-crlf` - Convert CRLF to LF

### Security and Options
- `-e, --encrypt` - Encrypt zip file
- `-P PASSWORD` - Set password directly
- `-T, --test` - Test zip file integrity
- `-X, --exclude-extra` - Exclude extra file attributes

### Archive Options
- `-z, --archive-comment` - Add zip file comment
- `-c, --entry-comments` - Add comments to entries
- `-o, --latest-time` - Set zip file time to latest entry
- `-A, --adjust-sfx` - Adjust self-extracting exe
- `-j, --junk-paths` - Don't store directory paths

## Usage Examples

### Basic Archive Operations

#### Creating Simple Archives
```bash
# Create zip file with single file
zip document.zip file.txt

# Create zip with multiple files
zip archive.zip file1.txt file2.txt file3.txt

# Create archive with verbose output
zip -v archive.zip files/

# Create zip with specific compression level
zip -9 max_compression.zip large_file.txt
zip -1 fast_compression.zip many_files.txt

# Create zip without compression (store only)
zip -0 store_only.zip file.bin
```

#### Directory Archiving
```bash
# Archive directory recursively
zip -r project.zip project/

# Archive with quiet operation
zip -q backup.zip /home/user/documents/

# Archive specific directory with absolute paths
zip -r -p absolute.zip /etc/nginx/

# Archive with relative paths only
zip -r relative.zip project/ -C /path/to/

# Archive current directory contents
zip -r current.zip . -x ".git/*" "node_modules/*"
```

### Advanced File Selection

#### Include and Exclude Patterns
```bash
# Archive specific file types
zip source.zip *.c *.h *.cpp

# Archive with multiple exclude patterns
zip -r project.zip . -x "*.log" -x "*.tmp" -x "cache/*"

# Archive with multiple include patterns
zip -r documents.zip . -i "*.pdf" -i "*.doc*" -i "*.txt"

# Exclude Git and Node.js directories
zip -r clean_project.zip project/ -x "*.git*" -x "node_modules/*"

# Exclude based on file size
find . -size +10M -exec zip -r large_files.zip {} +
```

#### File Management
```bash
# Add files to existing archive
zip existing.zip new_file.txt

# Update existing archive
zip -u archive.zip updated_files/

# Freshen existing files only
zip -f archive.txt.zip changed_files.txt

# Move files into archive
zip -m moved.zip file_to_move.txt

# Delete files from archive
zip -d archive.zip file_to_remove.txt
```

### Compression and Performance

#### Compression Levels
```bash
# Fast compression (level 1)
zip -1 fast_archive.zip large_directory/

# Good compression (level 6, default)
zip -6 normal_archive.zip files/

# Best compression (level 9)
zip -9 best_archive.zip documents/

# No compression (store only)
zip -0 store_archive.zip already_compressed_files.*

# Set specific suffixes for no compression
zip -r archive.zip files/ -n ".gz:.zip:.jpg:.png"
```

#### Performance Optimization
```bash
# Create archive with progress monitoring
zip -r large_archive.zip /path/to/data/ | pv -l > /dev/null

# Create archive with specific block size
zip -b /tmp/archive.zip -r /path/to/data/

# Use temporary directory for large archives
export TMPDIR=/tmp/large_temp
zip -r huge_archive.zip /massive/data/

# Archive with parallel processing (using find)
find /data -type f -print0 | parallel -0 zip archive.zip {}
```

### Security and Encryption

#### Password Protection
```bash
# Create encrypted archive (prompts for password)
zip -e secure.zip sensitive_files/

# Create encrypted archive with password directly
zip -e -P "mypassword" secure.zip files/

# Create archive with both encryption and compression
zip -e -9 secure_archive.zip important_documents/

# Update encrypted archive
zip -u -e secure.zip new_sensitive_file.txt

# Test encrypted archive
zip -T secure.zip
```

#### File Comments
```bash
# Add comment to zip file
zip -z archive.zip
# (Enter comment when prompted)

# Add comments to specific files
zip -c archive.zip file1.txt file2.txt
# (Enter comments for each file when prompted)

# Create archive with file comment
echo "Backup created on $(date)" | zip -z -r backup.zip files/

# Archive with individual file comments
printf "Main configuration\nDatabase settings\n" | zip -c config.zip *.conf
```

### Special Operations

#### Self-Extracting Archives
```bash
# Adjust self-extracting executable
zip -A self_extractor.exe

# Create self-extracting archive (with external tools)
zip -r archive.zip files/ && cat sfx_stub.exe archive.zip > self_extractor.exe

# Create archive for Windows compatibility
zip -r windows_archive.zip files/ -X

# Create archive with specific attributes
zip -r -X -ll archive.zip files/
```

#### Timestamp and Date Management
```bash
# Archive files newer than specific date
find /data -newer "2023-01-01" -exec zip update.zip {} +

# Archive files modified in last 7 days
find /logs -mtime -7 -exec zip recent_logs.zip {} +

# Set archive timestamp to newest file
zip -o -r latest.zip files/

# Archive with specific timestamp reference
zip -r -t "20231231" year_end.zip documents/
```

## Practical Examples

### Development Workflow

#### Project Distribution
```bash
# Create clean project archive
zip -r project-1.0.0.zip project/ \
    -x "*.git*" \
    -x "node_modules/*" \
    -x "dist/*" \
    -x "coverage/*" \
    -x "*.log" \
    -x ".env*"

# Create source code distribution
cd src && zip -r ../source.zip . -x "tests/*" -x "*.tmp"

# Archive with version-specific files
zip -r release-$(git describe --tags).zip \
    --exclude "*.git*" \
    --exclude "tests/*" \
    build/ \
    README.md \
    LICENSE

# Create archive for different platforms
zip -r windows-dist.zip dist/windows/ -X -ll
zip -r unix-dist.zip dist/unix/ -X
```

#### Backup Operations
```bash
# Daily backup with date stamp
zip -r backup_$(date +%Y%m%d).zip /home/user/documents/

# Incremental backup
zip -r backup_$(date +%Y%m%d).zip \
    -u previous_backup.zip \
    /home/user/documents/

# System configuration backup
zip -r system_config_$(date +%Y%m%d).zip \
    /etc/ \
    /home/user/.config/ \
    /var/log/ \
    -x "*.log" \
    -x "*.tmp"

# Database backup
mysqldump database_name | zip database_backup_$(date +%Y%m%d).sql.zip -
```

#### Web Development
```bash
# Archive static assets for deployment
zip -r static_assets.zip css/ js/ images/ \
    -x "*.map" \
    -x "node_modules/*"

# Archive website excluding development files
zip -r website.zip public/ \
    -x "*.scss" \
    -x "*.coffee" \
    -x "*.less" \
    -x "src/*" \
    -x "*.git*"

# Archive for CDN upload
zip -r cdn_upload.zip assets/ \
    -i "*.css" \
    -i "*.js" \
    -i "*.png" \
    -i "*.jpg" \
    -i "*.gif"
```

### System Administration

#### Log Management
```bash
# Archive old log files
find /var/log -name "*.log.*" -mtime +30 -exec zip old_logs.zip {} \;

# Archive logs by date
zip -r logs_$(date +%Y%m%d).zip /var/log/apache2/ \
    -x "*.log" \
    -x "*.tmp"

# Archive application logs
find /app/logs -name "*.log" -mtime +7 -exec zip app_logs.zip {} +

# Create log archive with compression based on size
find /logs -name "*.log" -size +100M -exec zip large_logs.zip {} +
```

#### File Transfer Optimization
```bash
# Create archive for network transfer
zip -r transfer.zip /path/to/large/data/ -9

# Archive for email attachment
zip -r attachment.zip documents/ -x "*.tmp" "*.bak"

# Archive with specific file types for upload
zip -r upload.zip /project/data/ \
    -i "*.csv" \
    -i "*.json" \
    -i "*.xml"

# Create split archives for size limits
zip -s 100m large_archive.zip huge_directory/
```

### Data Processing

#### Batch Operations
```bash
# Archive files by type
zip pdf_files.zip *.pdf
zip image_files.zip *.jpg *.png *.gif
zip document_files.zip *.doc* *.pdf *.txt

# Archive based on file age
find /data -mtime +90 -exec zip archive_old.zip {} +

# Archive and organize by date
for date in $(seq 1 30); do
    find /logs -name "*$(date -d "$date days ago" +%Y%m%d)*" \
        -exec zip "logs_$(date -d "$date days ago" +%Y%m%d).zip" {} +
done
```

## Advanced Usage

### Complex File Selection

#### Pattern Matching
```bash
# Complex include/exclude patterns
zip -r selective.zip . \
    -i "*.py" \
    -x "*test*" \
    -x "*__pycache__*" \
    -x "*.pyc"

# Exclude based on full path
zip -r archive.zip /path/to/data/ \
    -x "/path/to/data/temp/*" \
    -x "/path/to/data/cache/*"

# Archive with file size criteria
find . -type f -size +1M -size -100M \
    -exec zip medium_files.zip {} +

# Archive based on permissions
find . -type f -perm 644 -exec zip public_files.zip {} +
```

#### Conditional Archiving
```bash
# Archive only if files exist
if ls *.txt 1> /dev/null 2>&1; then
    zip text_files.zip *.txt
fi

# Archive with error handling
find /data -name "*.log" -exec zip -r logs.zip {} + 2>/dev/null || \
    echo "Error creating log archive"

# Archive with progress indication
find /data -type f -print0 | \
    while IFS= read -r -d '' file; do
        echo "Archiving: $file"
        zip archive.zip "$file"
    done
```

### Performance and Memory

#### Large File Handling
```bash
# Use temporary directory for large operations
TMPDIR=/tmp/zip_temp zip -r huge_archive.zip /massive/data/

# Create archive with specific memory allocation
zip -b /tmp -r archive.zip /large/directory/

# Archive with compression level based on file type
zip -r archive.zip . -n ".zip:.gz:.jpg:.png:.mp3" -9

# Optimized for network transfer
zip -6 -r network_archive.zip /path/to/data/
```

### Integration and Automation

#### Shell Script Integration
```bash
#!/bin/bash
# Automated backup script

BACKUP_DIR="/backups"
SOURCE_DIR="/home/user/documents"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
zip -r "$BACKUP_DIR/backup_$DATE.zip" "$SOURCE_DIR/" \
    -x "*.tmp" -x "*.cache" -x "*.log"

# Test backup
if zip -T "$BACKUP_DIR/backup_$DATE.zip"; then
    echo "Backup created successfully"
else
    echo "Backup verification failed"
    exit 1
fi

# Clean old backups (keep last 7)
ls -t "$BACKUP_DIR"/backup_*.zip | tail -n +8 | xargs rm -f
```

#### Pipeline Operations
```bash
# Create zip from stdout output
find /data -type f -name "*.txt" -print | zip files.zip -@

# Create archive from find command
find /config -name "*.conf" | zip config.zip -@

# Archive database dump
mysqldump database_name | zip db_backup.sql.zip -

# Archive with custom file list
printf "file1.txt\nfile2.txt\n" | zip custom.zip -@
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Handle permission denied errors
sudo zip -r system_archive.zip /etc/

# Check and fix permissions before archiving
find /source -type f -not -perm -r -exec chmod +r {} \;

# Archive with specific user context
sudo -u www-data zip -r web_backup.zip /var/www/
```

#### Disk Space Issues
```bash
# Check available space before archiving
df -h .

# Create archive on different filesystem
zip -r /tmp/backup.zip /home/user/documents/

# Use temporary directory for large archives
TMPDIR=/mnt/large_temp zip -r archive.zip /data/
```

#### Compression Problems
```bash
# Test archive integrity
zip -T archive.zip

# Fix corrupted archive
zip -F damaged.zip

# Attempt more aggressive repair
zip -FF severely_damaged.zip

# Check compression statistics
unzip -l archive.zip
```

## Related Commands

- [`unzip`](/docs/commands/compression/unzip) - Extract zip archives
- [`zipinfo`](/docs/commands/compression/zipinfo) - Display zip file information
- [`zipsplit`](/docs/commands/compression/zipsplit) - Split zip files into smaller pieces
- [`gzip`](/docs/commands/compression/gzip) - Compress with gzip format
- [`tar`](/docs/commands/compression/tar) - Archive with tar format
- [`7z`](/docs/commands/compression/7z) - 7-Zip archiver with better compression
- [`rar`](/docs/commands/compression/rar) - RAR archive format
- [`bzip2`](/docs/commands/compression/bzip2) - Alternative compression utility

## Best Practices

1. **Use appropriate compression levels** based on content type and requirements
2. **Test archives** after creation with `-T` option
3. **Use meaningful filenames** with date stamps for backup archives
4. **Exclude unnecessary files** like temporary files and build artifacts
5. **Use encryption** for sensitive data with `-e` option
6. **Consider cross-platform compatibility** when creating archives
7. **Monitor disk space** when creating large archives
8. **Use verbose mode** (`-v`) during creation to monitor progress
9. **Include documentation** in archive comments with `-z` option
10. **Use `-X` option** for better cross-platform compatibility

## Performance Tips

1. **Use `-0` for already compressed files** (images, videos, compressed archives)
2. **Use `-9` for text files** to maximize compression
3. **Exclude unnecessary files** to reduce archive size and processing time
4. **Use `-r` carefully** with large directory structures
5. **Consider splitting large archives** for transfer limits
6. **Use `-j` option** when directory structure is not needed
7. **Monitor system resources** when creating very large archives
8. **Use appropriate temporary directory** for large operations

The `zip` command is an essential tool for file compression and distribution across platforms. Its wide compatibility and flexible options make it ideal for creating archives for sharing, backup, and deployment purposes.