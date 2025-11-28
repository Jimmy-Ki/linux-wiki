---
title: arj - ARJ Archive Manager
sidebar_label: arj
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arj - ARJ Archive Manager

The `arj` command is a powerful archive manager that creates and manages ARJ (Archive by Robert Jung) format compressed files. ARJ was one of the most popular compression formats in the early 1990s, known for its excellent compression ratios, multi-volume support, and robust error recovery capabilities. While largely superseded by modern formats like ZIP and 7z, ARJ remains important for legacy systems and data recovery scenarios.

## Historical Context

ARJ was developed by Robert Jung in 1992 as a successor to the ARC format. It gained popularity due to:
- Superior compression ratios compared to early ZIP versions
- Advanced features like self-extracting archives
- Multi-volume support for large file distribution
- Strong error recovery and repair capabilities
- Password protection and file encryption

## Basic Syntax

```bash
arj [command] [switches] <archive_name> [files...] [-<switches>]
```

## Core Commands

### Archive Operations
- `a` - Add files to archive
- `m` - Move files to archive (delete originals)
- `u` - Update files in archive (add new or modified files)
- `f` - Freshen archive (update only existing files)

### Extraction Operations
- `x` - Extract files with full paths
- `e` - Extract files without paths (flatten structure)
- `t` - Test archive integrity

### Management Operations
- `l` - List archive contents (brief)
- `v` - List archive contents (verbose with details)
- `d` - Delete files from archive
- `r` - Rename files in archive
- `c` - Comment archive
- `y` - Copy archive with new options
- `j` - Join multiple volumes

### Information Operations
- `i` - Check archive integrity and show information

## Compression Methods and Levels

### Method Selection (-m switch)
```bash
arj a -m[0-4] archive.arj files/
```

| Method | Compression Level | Speed | Ratio | Best Use Case |
|--------|------------------|-------|--------|---------------|
| `-m0` | No compression | Fastest | 1:1 | Already compressed files |
| `-m1` | Fastest compression | Very Fast | Good | Quick backups, temporary archives |
| `-m2` | Good compression | Fast | Better | General purpose use |
| `-m3` | Better compression | Medium | Excellent | Most files, balanced approach |
| `-m4` | Best compression | Slowest | Superior | Long-term storage, text files |

## Advanced Switches

### Security and Encryption
- `-g` - Garble (encrypt) files with password
- `-hp` - Encrypt both data and headers
- `-p[password]` - Set password for archive

### File Selection
- `-r` - Recurse into subdirectories
- `-a` - Include files with archive attribute
- `-b` - Backup modified files only
- `-e[days]` - Exclude files older than specified days
- `-f[days]` - Include files newer than specified days

### Volume Management
- `-v[size]` - Create multi-volume archive
- `-va` - Auto-detect volume size from media
- `-v1440k` - Create 1.44MB floppy disk volumes
- `-v720k` - Create 720KB floppy volumes
- `-v1200k` - Create 1.2MB 5.25" floppy volumes

### Archive Options
- `-je` - Create self-extracting archive (.exe)
- `-jm` - Set maximum compression method
- `-jd` - Disable date/time stamping
- `-jt1` - Set temporary directory
- `-t1` - Set file type (binary/text)

### Recovery and Integrity
- `-jg` - Add recovery record
- `-jg1000` - Add recovery record with 1000 bytes
- `-jw` - Keep temp files for recovery

### Output Control
- `-y` - Assume Yes for all queries (batch mode)
- `-i[log]` - Log operations to file
- `-n` - Process only newer files
- `-q` - Quiet operation (minimal output)

## Usage Examples

### Basic Archive Operations

#### Creating Archives
```bash
# Create basic archive
arj a documents.arj file1.txt file2.txt

# Create archive with maximum compression
arj a -m4 backup.arj important_files/

# Create archive recursively including subdirectories
arj a -r project.arj /path/to/project/

# Create archive with specific file types
arj a source.arj *.c *.h *.cpp

# Create archive with date-based selection
arj a -b -f30 recent.arj /data/  # Files modified in last 30 days
```

#### Password-Protected Archives
```bash
# Create password-protected archive (will prompt for password)
arj a -g secure.arj sensitive_files/

# Create archive with encrypted headers
arj a -hp ultra_secure.arj classified_data/

# Create self-extracting encrypted archive
arj a -je -g installer.exe application_files/
```

#### Multi-Volume Archives
```bash
# Create 1.44MB floppy disk volumes
arj a -v1440k backup.arj large_dataset/

# Create 100MB volumes for email/CD distribution
arj a -v100m distribution.arj software_package/

# Create volumes with automatic size detection
arj a -va backup.arj /media/usb_drive/
```

### Extraction Operations

#### Standard Extraction
```bash
# Extract with full directory structure
arj x documents.arj

# Extract files to specific directory
arj x backup.arj -/path/to/extract/

# Extract without preserving directory structure
arj e flat_archive.arj

# Extract specific files
arj x project.arj main.c config.h

# Extract with password (will prompt)
arj x -g encrypted.arj
```

#### Selective Extraction
```bash
# Extract files matching pattern
arj x archive.arj "*.txt"

# Extract to different directory with rename
arj x -/new/location/ -r old.arj

# Extract and verify integrity
arj x -t verified.arj
```

### Archive Management

#### Content Inspection
```bash
# Brief file listing
arj l documents.arj

# Detailed listing with compression info
arj v documents.arj

# List archive information only
arj i documents.arj

# Test archive integrity
arj t documents.arj

# Test with detailed output
arj t -v documents.arj
```

#### File Operations
```bash
# Add files to existing archive
arj a existing.arj new_file.txt

# Update files in archive (add new or modified)
arj u project.arj updated_sources/

# Freshen existing files only
arj f backup.arj

# Delete files from archive
arj d archive.arj unwanted_file.txt

# Rename files in archive
arj r archive.arj old_name.txt new_name.txt

# Move files to archive (delete originals)
arj m transfer.arj files_to_move/
```

## Practical Applications

### System Administration

#### Backup Strategies
```bash
#!/bin/bash
# Daily backup script with ARJ
BACKUP_DIR="/backup"
SOURCE_DIR="/home/user"
DATE=$(date +%Y%m%d)

# Create compressed backup with encryption
arj a -m4 -g -va \
    "$BACKUP_DIR/daily_$DATE.arj" \
    "$SOURCE_DIR" \
    -e"*.tmp" -e"*.cache" -e"*.log"

# Verify backup integrity
if arj t "$BACKUP_DIR/daily_$DATE.arj"; then
    echo "Backup successful and verified"
else
    echo "Backup verification failed"
    exit 1
fi
```

#### Log File Management
```bash
# Compress old log files
find /var/log -name "*.log.*" -mtime +7 | \
    while read logfile; do
        arj a -m1 -r logs_archive.arj "$logfile"
        rm "$logfile"
    done

# Create monthly log archive
arj a -m2 -b -f30 \
    "logs_$(date +%Y%m).arj" \
    /var/log/ \
    -e"*.log"  # Exclude current logs
```

#### Software Distribution
```bash
# Create self-extracting installer
arj a -je -m4 \
    installer_v1.0.exe \
    application/ \
    readme.txt \
    license.txt \
    setup.bat

# Create multi-volume distribution for floppies
arj a -v1440k -m3 \
    software_dist.arj \
    software_package/ \
    -e"*.obj" -e"*.tmp"
```

### Data Recovery

#### Archive Repair
```bash
# Test damaged archive
arj t -v damaged.arj

# Extract with error recovery
arj x -jg damaged.arj

# Create recovery record for future repairs
arj a -jg5000 important.arj critical_data/
```

#### Volume Recovery
```bash
# Join multiple volumes
arj j complete.arj volume1.arj volume2.arj volume3.arj

# Test volume sequence
arj t multi_volume.arj
```

### Legacy System Support

#### Converting from Modern Formats
```bash
# Extract 7z and create ARJ for legacy system
7z x modern_archive.7z
arj a -m4 -r legacy.arj extracted_files/

# Create self-extracting for Windows 3.1
arj a -je -m1 win31_app.exe old_app/
```

## Performance Optimization

### Compression Strategy
```bash
# Fast compression for temporary archives
arj a -m1 temp.arj files/

# Best compression for long-term storage
arj a -m4 archive.arj documents/

# Selective compression based on file type
arj a -m4 text_files.arj *.txt *.doc *.html
arj a -m1 binary_files.arj *.exe *.jpg *.mp3
```

### Memory and Speed Optimization
```bash
# Use temporary directory on fast disk
arj a -t1/tmp arj_file.arj large_dataset/

# Disable file timestamps for speed
arj a -jd fast_backup.arj /data/

# Quiet operation for batch processing
arj a -q -y batch_archive.arj /source/
```

### Multi-threading Considerations
ARJ is single-threaded but can benefit from system optimization:
```bash
# Use nice to set priority
nice -n 19 arj a -m4 archive.arj large_files/

# Use ionice for disk I/O priority
ionice -c 3 arj a backup.arj /data/
```

## Error Handling and Troubleshooting

### Common Issues

#### Password Protection Problems
```bash
# If password prompt fails, try explicit password
arj x -g"mypassword" archive.arj

# Check if archive is actually encrypted
arj i archive.arj | grep -i encrypt
```

#### Volume Issues
```bash
# Check volume integrity
arj t -v multi_volume.arj

# Reconstruct missing volumes (if recovery record exists)
arj a -jg new_vol.arj existing_files/

# Join volumes in correct order
arj j complete.arj vol?.arj
```

#### Corruption Recovery
```bash
# Test archive for errors
arj t -v corrupted.arj

# Extract with recovery enabled
arj x -jg corrupted.arj

# Create new archive from extracted files
arj a -m4 recovered.arj extracted_files/
```

#### Space Issues
```bash
# Check archive size before extraction
arj i archive.arj

# Extract to different drive with more space
arj x -/mnt/large_disk/ archive.arj

# Use smaller volumes for extraction
arj x -v50m large_archive.arj
```

### Limitations and Workarounds

#### File Size Limitations
```bash
# ARJ has 2GB file size limit
# Split large files before archiving
split -b 1G huge_file.dat huge_part_

# Archive parts separately
arj a -m4 large_file.arj huge_part_*

# Reconstruct after extraction
cat huge_part_* > huge_file.dat
```

#### Filename Limitations
```bash
# ARJ has limited filename support
# Use tar wrapper for complex filenames
tar cf - complex_filenames/ | arj a -si archive.arj

# Extract with tar wrapper
arj x -so archive.arj | tar xf -
```

## Security Considerations

### Password Security
```bash
# Avoid passwords in command line (security risk)
# DON'T: arj a -g"password" archive.arj files/
# DO: arj a -g archive.arj files/ (enter password interactively)

# Use strong passwords with mixed characters
# Minimum 8 characters with letters, numbers, symbols

# For automated scripts, use environment variables
ARJ_PASSWORD="$SECURE_PASS" arj a -g archive.arj files/
```

### Encryption Strength
- ARJ uses proprietary encryption (not AES)
- Consider additional encryption for sensitive data:
```bash
# Encrypt ARJ with GnuPG
arj a archive.arj files/
gpg -c archive.arj  # Creates archive.arj.gpg
```

## Integration with Other Tools

### Shell Script Integration
```bash
#!/bin/bash
# Progress indicator for large archives
arj a -m4 large.arj /huge/dataset/ &
PID=$!
while kill -0 $PID 2>/dev/null; do
    echo -n "."
    sleep 10
done
echo "Done!"
```

### Batch Processing
```bash
# Process multiple directories
for dir in /data/*/; do
    dirname=$(basename "$dir")
    arj a -m4 -r "$dirname.arj" "$dir"
done

# Compress files by age
find /logs -name "*.log" -mtime +30 -print0 | \
    xargs -0 arj a -m2 old_logs.arj
```

### Cross-Platform Compatibility

#### Windows Compatibility
```bash
# Create Windows-compatible self-extracting archive
arj a -je windows_installer.exe application/

# Use short filenames for Windows 95 compatibility
arj a -jf8 old_win.arj files/
```

#### Unix/Linux Integration
```bash
# Use with find for selective archiving
find /home -name "*.doc" -print0 | \
    xargs -0 arj a documents.arj

# Pipe operations
tar cf - directory/ | arj a -si archive.arj
arj x -so archive.arj | tar xf -
```

## Migration to Modern Formats

### Converting ARJ Archives
```bash
#!/bin/bash
# Convert ARJ to 7z format
for arj_file in *.arj; do
    # Extract ARJ
    mkdir temp_extract
    cd temp_extract
    arj x "../$arj_file"

    # Create 7z with better compression
    7z a -m0=lzma2 -mx=9 "../${arj_file%.arj}.7z" *

    cd ..
    rm -rf temp_extract

    # Verify both archives
    arj t "$arj_file"
    7z t "${arj_file%.arj}.7z"
done
```

### Automated Migration Script
```bash
#!/bin/bash
# Convert all ARJ archives in directory tree
find . -name "*.arj" | while read arjfile; do
    dir=$(dirname "$arjfile")
    base=$(basename "$arjfile" .arj)

    mkdir -p "$dir/converted"

    # Extract and convert
    (cd "$dir" && \
        mkdir temp && \
        cd temp && \
        arj x "../$base.arj" && \
        7z a "../converted/$base.7z" * && \
        cd .. && rm -rf temp)

    echo "Converted: $arjfile -> $dir/converted/$base.7z"
done
```

## Best Practices

### Archive Creation
1. **Choose appropriate compression level** based on use case
2. **Use self-extracting archives** for distribution to non-technical users
3. **Create multi-volume archives** for large file transfers
4. **Add recovery records** for critical data
5. **Use descriptive names** with dates or versions

### Security Practices
1. **Use strong passwords** for sensitive archives
2. **Avoid passwords in scripts** or command history
3. **Consider additional encryption** for highly sensitive data
4. **Test password recovery** before distribution
5. **Keep password backups** in secure location

### Performance Optimization
1. **Use appropriate compression method** for file types
2. **Exclude unnecessary files** (.tmp, .cache, etc.)
3. **Use fast compression** for temporary archives
4. **Schedule large operations** during low-usage periods
5. **Monitor disk space** during large operations

### Maintenance
1. **Test archive integrity** regularly
2. **Verify backups** can be restored
3. **Migrate to modern formats** when possible
4. **Document archive passwords** securely
5. **Keep multiple copies** of critical archives

## Comparison with Modern Formats

| Feature | ARJ | ZIP | 7z | tar.gz |
|---------|-----|-----|----|---------|
| Compression Ratio | Good | Fair | Excellent | Good |
| Speed | Medium | Fast | Slow | Fast |
| Self-Extracting | Yes | Yes | Yes | No |
| Multi-Volume | Yes | Limited | Yes | No |
| Encryption | Proprietary | AES-256 | AES-256 | GPG |
| Unicode Support | Limited | Good | Excellent | Excellent |
| Recovery Record | Yes | No | Yes | No |
| Modern Support | Limited | Universal | Growing | Universal |

## Related Commands

- [`zip`](/docs/commands/compression/zip) - Modern ZIP archive utility
- [`unzip`](/docs/commands/compression/unzip) - Extract ZIP archives
- [`7z`](/docs/commands/compression/7z) - 7-Zip archive manager
- [`tar`](/docs/commands/compression/tar) - Tape archive utility
- [`gzip`](/docs/commands/compression/gzip) - GZIP compression
- [`bzip2`](/docs/commands/compression/bzip2) - BZIP2 compression
- [`gpg`](/docs/commands/security/gpg) - GNU Privacy Guard for encryption

## Performance Tips

1. **Use -m1 for speed** when compression ratio isn't critical
2. **Use -m4 for storage** when space is premium
3. **Exclude compressed files** (.zip, .jpg, .mp3) to save time
4. **Use self-extracting archives** only when necessary
5. **Split large files** before archiving if possible
6. **Test archives** after creation to ensure integrity
7. **Use recovery records** for mission-critical data
8. **Batch operations** during off-peak hours

ARJ remains a valuable tool for working with legacy archives and specific use cases requiring its unique features. While modern formats generally offer better performance and compatibility, ARJ's robust error recovery and self-extracting capabilities make it useful for specific applications.