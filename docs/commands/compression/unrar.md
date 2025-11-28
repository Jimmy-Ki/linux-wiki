---
title: unrar - Extract files from RAR archives
sidebar_label: unrar
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# unrar - Extract files from RAR archives

The `unrar` command is a powerful utility for extracting files from RAR (Roshal Archive) archives. RAR is a proprietary archive file format that supports data compression, error recovery, and file spanning. The unrar tool provides comprehensive functionality for working with RAR archives, including extraction, listing contents, testing integrity, and handling password-protected archives. While RAR format itself is proprietary, the unrar utility is freely available for extracting RAR archives on Linux systems.

## Basic Syntax

```bash
unrar <command> [switches] <archive> [files...] [path_to_extract/]
```

## Common Commands

- `e` - Extract files without archived paths (flatten to current directory)
- `x` - Extract files with full paths (preserve directory structure)
- `l` - List archive contents
- `t` - Test archive integrity
- `v` - Verbosely list archive contents (technical details)
- `p` - Print file to stdout
- `c` - Comment archive
- `cf` - Add files to comment
- `cw` - Write archive comment to file
- `rn` - Rename archived files
- `rr[N]` - Add data recovery record
- `rt[N] - Add recovery volumes
- `kb` - Keep broken extracted files

## Common Switches

### Extraction Options
- `-p[password]` - Set password for encrypted archives
- `-x<file>` - Exclude specified files
- `-y` - Assume Yes on all queries
- `-o+` - Overwrite existing files
- `-o-` - Do not overwrite existing files
- `-or` - Rename existing files
- `-ow` - Save/restore file owner and group

### Display Options
- `-av-` - Disable authenticity verification check
- `-cfg-` - Disable read configuration
- `-c-` - Disable comments display
- `-idp` - Disable percentage indicator
- `-ierr` - Send all messages to stderr
- `-inul` - Disable all messages
- `-p-` - Do not query password

### Path Options
- `-ad` - Append archive name to destination path
- `-ap<path>` - Set path inside archive
- `-vp` - Pause before each volume

### Performance Options
- `-ai` - Ignore file attributes
- `-cl` - Convert names to lower case
- `-cu` - Convert names to upper case
- `-tsm<c,a,m>` - Save/restore file time (modification, creation, access)
- `-tb` - Set file timestamp to current time

## Usage Examples

### Basic Archive Operations

#### Simple Extraction
```bash
# Extract files with full paths (recommended)
unrar x archive.rar

# Extract files to current directory (flatten)
unrar e archive.rar

# Extract to specific directory
unrar x archive.rar /path/to/destination/

# Extract without overwriting existing files
unrar x -o- archive.rar

# Extract and overwrite existing files
unrar x -o+ archive.rar
```

#### Listing Archive Contents
```bash
# List archive contents
unrar l archive.rar

# List with technical details
unrar v archive.rar

# List specific files
unrar l archive.rar *.txt *.pdf

# List with detailed information
unrar lt archive.rar
```

#### Archive Testing
```bash
# Test archive integrity
unrar t archive.rar

# Test password-protected archive
unrar t -p"password" secure.rar

# Test and display detailed information
unrar t -v archive.rar
```

### Password Protection

#### Working with Password-Protected Archives
```bash
# Extract password-protected archive
unrar x -p"mypassword" secure.rar

# Extract and prompt for password (more secure)
unrar x -p secure.rar

# Test password-protected archive
unrar t -p"mypass" archive.rar

# List contents of password-protected archive
unrar l -p"password" archive.rar

# Extract to different directory with password
unrar x -p"mypass" archive.rar /extract/path/
```

### Advanced Extraction

#### Selective File Extraction
```bash
# Extract specific files
unrar x archive.rar document.pdf image.jpg

# Extract files matching pattern
unrar x archive.rar *.txt

# Extract directory from archive
unrar x archive.rar foldername/

# Extract all but certain files
unrar x archive.rar -x"*.tmp" -x"*.log"
```

#### Multi-volume Archives
```bash
# Extract multi-volume archive
unrar x archive.part1.rar

# Extract with automatic volume detection
unrar x archive.rar

# List contents of multi-volume archive
unrar l archive.part01.rar

# Test multi-volume archive integrity
unrar t archive.part1.rar
```

## Practical Examples

### System Administration

#### Software Installation
```bash
# Extract downloaded software package
unrar x software_package.rar /opt/software/

# Extract with permission preservation
unrar x -ow application.rar /usr/local/bin/

# Extract system backup
unrar x -p"backup_pass" system_backup.rar /

# Extract and verify software package
unrar t software_package.rar && unrar x software_package.rar
```

#### Log File Processing
```bash
# Extract archived log files
unrar x -y logs_archive.rar /var/log/processed/

# Extract specific date logs
unrar x logs_2023.rar -x"*.tmp" /archive/logs/

# Extract and immediately process logs
unrar x -p"logpass" secure_logs.rar | grep "ERROR"
```

#### Configuration Management
```bash
# Extract configuration files
unrar x config_backup.rar /etc/

# Extract configuration to temporary location
unrar x config.rar /tmp/config_test/

# Extract and verify configuration integrity
unrar t config.rar && unrar x config.rar -o+
```

### Data Recovery and Forensics

#### Archive Recovery
```bash
# Test corrupted archive
unrar t -v corrupted_archive.rar

# Extract with error recovery
unrar x -kb damaged_archive.rar /recovery/

# Extract keeping broken files
unrar x -kb -y archive.rar /recovery/files/

# Attempt repair on corrupted archive
unrar rc damaged_archive.rar
```

#### Batch Processing
```bash
# Extract all RAR files in directory
for file in *.rar; do
    unrar x "$file" "${file%.rar}/"
done

# Test all archives in directory
for archive in *.rar; do
    echo "Testing $archive..."
    unrar t "$archive" || echo "Error in $archive"
done

# Extract with logging
unrar x -y archive.rar 2>&1 | tee extraction.log
```

## Advanced Usage

### Automation and Scripting

#### Backup Restoration Script
```bash
#!/bin/bash
# Automated backup restoration with unrar

BACKUP_DIR="/backups"
RESTORE_DIR="/restore"
LOG_FILE="/var/log/restore.log"

# Function to extract with error handling
extract_archive() {
    local archive="$1"
    local target_dir="$2"
    local password="$3"

    echo "Extracting $archive to $target_dir" >> "$LOG_FILE"

    if [ -n "$password" ]; then
        unrar x -p"$password" -y "$archive" "$target_dir" 2>&1 >> "$LOG_FILE"
    else
        unrar x -y "$archive" "$target_dir" 2>&1 >> "$LOG_FILE"
    fi

    return $?
}

# Extract daily backups
for backup in "$BACKUP_DIR"/daily_*.rar; do
    if [ -f "$backup" ]; then
        extract_archive "$backup" "$RESTORE_DIR/daily/" "backup_password"
    fi
done
```

#### Archive Verification Script
```bash
#!/bin/bash
# Batch archive integrity verification

ARCHIVE_DIR="/archives"
FAILED_ARCHIVES="/tmp/failed_archives.txt"

# Clear previous failures
> "$FAILED_ARCHIVES"

# Verify all archives
find "$ARCHIVE_DIR" -name "*.rar" -print0 | while IFS= read -r -d '' archive; do
    echo "Testing: $archive"
    if ! unrar t "$archive" 2>/dev/null; then
        echo "FAILED: $archive" >> "$FAILED_ARCHIVES"
        echo "Archive failed integrity check: $archive"
    else
        echo "PASSED: $archive"
    fi
done

# Report failures
if [ -s "$FAILED_ARCHIVES" ]; then
    echo "Failed archives:"
    cat "$FAILED_ARCHIVES"
fi
```

### Performance Optimization

#### Efficient Extraction
```bash
# Extract with minimal output
unrar x -inul archive.rar /target/

# Extract without percentage display
unrar x -idp archive.rar

# Extract and convert to lowercase (for case-insensitive systems)
unrar x -cl archive.rar

# Extract and preserve timestamps
unrar x -tsmca archive.rar
```

#### Batch Extraction with Monitoring
```bash
# Extract with progress monitoring
unrar x -v archive.rar 2>&1 | grep -E "(\d+%|Extracting)"

# Extract multiple archives with status
for file in *.rar; do
    echo "Processing $file..."
    time unrar x "$file" "${file%.rar}/"
    echo "Completed $file"
done
```

## Troubleshooting

### Common Issues

#### Password Problems
```bash
# Try common passwords
for pass in "password" "123456" "admin" ""; do
    echo "Trying password: $pass"
    if unrar t -p"$pass" archive.rar 2>/dev/null; then
        echo "Password found: $pass"
        break
    fi
done

# Test if archive is password-protected
unrar l archive.rar 2>&1 | grep -q "password"
```

#### Corrupted Archives
```bash
# Test archive integrity
unrar t -v corrupted.rar

# Attempt extraction with recovery
unrar x -kb -y corrupted.rar /recovery/

# Check file list before extraction
unrar lt corrupted.rar > file_list.txt

# Extract specific files from corrupted archive
unrar x -kb corrupted.rar important_file.txt
```

#### Permission Issues
```bash
# Extract with different user
sudo unrar x archive.rar /protected/directory/

# Change ownership after extraction
unrar x archive.rar /target/
sudo chown -R user:group /target/

# Extract with preserved permissions
unrar x -ow archive.rar /target/
```

#### Volume Issues
```bash
# Check all volumes are present
unrar lb archive.part1.rar

# Force extraction from specific volume
unrar x -v archive.part01.rar

# Create missing volumes list
ls -la archive.part*.rar > volumes_list.txt
```

### Memory and Performance

#### Large Archive Handling
```bash
# Extract large archive with monitoring
unrar x -v huge_archive.rar 2>&1 | tee extraction.log

# Extract in stages for very large archives
unrar x large_archive.rar -x"large_file.iso"
unrar x large_archive.rar large_file.iso

# Check free space before extraction
df -h /target/directory/
unrar l archive.rar | tail -1
```

## Related Commands

- [`rar`](/docs/commands/compression/rar) - Create RAR archives
- [`7z`](/docs/commands/compression/7z) - 7-Zip archiver (supports RAR extraction)
- [`unzip`](/docs/commands/compression/unzip) - Extract ZIP archives
- [`tar`](/docs/commands/compression/tar) - Tape archiver
- [`p7zip`](/docs/commands/compression/p7zip) - 7-Zip for POSIX systems
- [`arj`](/docs/commands/compression/arj) - ARJ archiver
- [`lha`](/docs/commands/compression/lha) - LHA archiver

## Best Practices

1. **Always test archives** before extraction with `unrar t`
2. **Use `-x` switch** to extract with full paths to preserve directory structure
3. **Verify integrity** of downloaded archives before extraction
4. **Handle passwords securely** - use `-p` without argument to be prompted
5. **Check available disk space** before extracting large archives
6. **Use appropriate permissions** when extracting to system directories
7. **Backup important archives** before attempting recovery operations
8. **Log extraction processes** for audit trails and troubleshooting
9. **Validate extracted files** after extraction for critical data
10. **Use specific file selection** to extract only needed files from large archives

## Performance Tips

1. **Use `-inul`** for faster extraction by suppressing output
2. **Extract to SSD** storage for better performance with large archives
3. **Avoid network storage** for extraction when possible
4. **Use `-o+`** cautiously - it can overwrite existing files
5. **Monitor system resources** during large extractions
6. **Consider RAM usage** when extracting many small files
7. **Batch process** multiple archives efficiently with shell loops
8. **Use `-idp`** to reduce console output during automated extractions
9. **Test before extracting** saves time with corrupted archives
10. **Parallelize** independent extractions on multi-core systems

## Security Considerations

1. **Scan archives** for malware before extraction
2. **Be cautious with password-protected archives** from unknown sources
3. **Never use `-p` with password in scripts** - use secure methods instead
4. **Check file permissions** after extraction from untrusted archives
5. **Verify authenticity** of archives from external sources
6. **Avoid extracting to system directories** from untrusted archives
7. **Monitor extraction** for unexpected file paths
8. **Use chroot or containers** for extracting untrusted archives

The `unrar` command is an essential tool for working with RAR archives on Linux systems. Its comprehensive feature set, support for password protection, and robust error recovery capabilities make it ideal for handling both simple and complex archive extraction tasks, from everyday file management to professional data recovery operations.