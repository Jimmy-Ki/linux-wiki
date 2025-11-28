---
title: lsattr - List File Attributes on Linux
sidebar_label: lsattr
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lsattr - List File Attributes on Linux

The `lsattr` command is a Linux utility used to list extended file attributes on Linux second extended filesystems (ext2, ext3, ext4). Extended file attributes provide additional metadata beyond the standard Unix file permissions and ownership information. These attributes are particularly useful for system administrators who need to implement enhanced security controls, data integrity measures, or special file handling behaviors. The `lsattr` command works in conjunction with `chattr` (change attributes) to provide a comprehensive file attribute management system that operates at the filesystem level rather than through traditional Unix permissions.

## Basic Syntax

```bash
lsattr [OPTIONS] [FILE...]
```

## Common Options

### Display Options
- `-a, --all` - List all files in directories, including hidden files
- `-d, --directory` - List directories like other files, rather than their contents
- `-R, --recursive` - Recursively list attributes of directories and their contents
- `-l, --long` - Use long format output
- `-v, --version` - List the file's version/generation number
- `-p, --project` - List the file's project number

### Output Control
- `-V, --verbose` - Verbose output (show more detailed information)
- `-q, --quiet` - Suppress most error messages
- `-f, --force` - Force operation, ignore errors
- `--help` - Display help information
- `--version` - Show version information

## File Attributes

Extended file attributes are represented by single-character codes:

| Attribute | Description | Common Use Cases |
|-----------|-------------|------------------|
| `a` | Append-only | Log files, audit trails |
| `A` | No atime updates | Performance optimization |
| `c` | Compressed | Disk space saving |
| `C` | No copy-on-write | Database files |
| `d` | No dump | Exclude from backups |
| `D` | Synchronous directory updates | Data integrity |
| `e` | Extents format | Modern filesystem features |
| `E` | Encrypted | Security |
| `i` | Immutable | System configuration files |
| `I` | Indexed directory | Performance |
| `j` | Data journalling | Data integrity |
| `P` | Project hierarchy | Disk quotas |
| `s` | Secure deletion | Sensitive data |
| `S` | Synchronous updates | Critical data |
| `t` | No tail-merging | Special file formats |
| `T` | Top of directory hierarchy | System directories |
| `u` | Undeletable | Important data |
| `x` | Direct access for compressed files | Database files |

## Usage Examples

### Basic Attribute Listing

#### Simple File Attribute Display
```bash
# List attributes of a single file
lsattr important_file.txt

# List attributes of multiple files
lsattr file1.txt file2.txt file3.txt

# List attributes in current directory
lsattr *

# List all files including hidden ones
lsattr -a
```

#### Directory Attribute Listing
```bash
# List directory attributes (not contents)
lsattr -d /var/log

# List directory contents with attributes
lsattr /var/log/

# List all files in directory including hidden
lsattr -a /etc/
```

### Recursive Operations

#### Recursive Attribute Listing
```bash
# List attributes recursively
lsattr -R /home/user/documents

# Recursive listing with directory handling
lsattr -Rd /etc/

# Show attributes for entire filesystem tree
lsattr -R /path/to/directory | head -20
```

#### Advanced Recursive Options
```bash
# Recursive with verbose output
lsattr -Rv /important/data/

# Find files with specific attributes recursively
lsattr -R /path | grep "i"
```

### Extended Output Formats

#### Verbose and Long Format
```bash
# Long format output
lsattr -l file.txt

# Verbose output with additional information
lsattr -v file.txt

# Show project numbers (if supported)
lsattr -p file.txt

# Combine multiple output options
lsattr -lv -R /data/
```

#### Filtering and Searching
```bash
# Find immutable files
find /etc -exec lsattr {} + | grep "i"

# Show only files with append-only attribute
lsattr -R /var/log | grep "^....a"

# List all attributes for files with specific pattern
lsattr $(find /home -name "*.conf")
```

## Practical Examples

### System Administration

#### System File Auditing
```bash
# Check critical system files for attributes
sudo lsattr /etc/passwd /etc/shadow /etc/sudoers

# List attributes in system configuration directories
sudo lsattr -R /etc/ssh/

# Check boot configuration files
sudo lsattr /boot/grub/grub.cfg

# Audit log file attributes
sudo lsattr -d /var/log
sudo lsattr /var/log/*.log
```

#### Security Configuration Review
```bash
# Find all immutable files on system
sudo find / -exec lsattr {} + 2>/dev/null | grep "i"

# Check for append-only log files
sudo find /var/log -exec lsattr {} + 2>/dev/null | grep "a"

# List attributes of security-critical directories
sudo lsattr -d /etc /bin /sbin /usr/bin /usr/sbin

# Check backup exclusion attributes
sudo find / -exec lsattr {} + 2>/dev/null | grep "d"
```

### File System Management

#### Performance Monitoring
```bash
# Check for compressed files
lsattr -R /data | grep "c"

# Find files with no atime updates (performance optimization)
lsattr -R /var/www | grep "A"

# Check synchronous update files
lsattr -R /database | grep "S"

# Monitor directory hierarchy optimizations
lsattr -Rd /home/* | grep "T"
```

#### Storage Optimization
```bash
# Find compressed files to check space savings
find /home -type f -exec lsattr {} + 2>/dev/null | grep "c"

# Check for files with secure deletion (security impact)
lsattr -R /sensitive/data | grep "s"

# Locate files that are excluded from dumps
find / -exec lsattr {} + 2>/dev/null | grep "d"
```

### Development and Testing

#### Development Environment Setup
```bash
# Check source code files for special attributes
lsattr -R /project/source/

# Verify configuration file attributes
lsattr /project/config/*.conf

# Check build directory attributes
lsattr -d /project/build/

# List test data file attributes
lsattr -R /project/test/data/
```

#### Application File Management
```bash
# Check application log file attributes
lsattr -R /var/log/myapp/

# Verify database file attributes
lsattr /var/lib/myapp/database/*

# Check temporary file directories
lsattr -d /tmp /var/tmp

# List backup file attributes
lsattr -R /backup/myapp/
```

## Advanced Usage

### File System Analysis

#### Comprehensive File System Audit
```bash
#!/bin/bash
# Comprehensive file attribute audit script

echo "=== File System Attribute Analysis ==="
echo "Date: $(date)"
echo "Hostname: $(hostname)"
echo

# Check for immutable files
echo "Immutable Files:"
sudo find / -type f -exec lsattr {} + 2>/dev/null | grep "i" | head -10
echo

# Check for append-only files
echo "Append-only Files:"
sudo find / -type f -exec lsattr {} + 2>/dev/null | grep "a" | head -10
echo

# Check for compressed files
echo "Compressed Files:"
find /home -type f -exec lsattr {} + 2>/dev/null | grep "c" | wc -l
echo "Total compressed files found"
echo

# Check directories with special attributes
echo "Special Directories:"
sudo find / -type d -exec lsattr -d {} + 2>/dev/null | grep -v "^-" | head -10
```

#### Performance Impact Assessment
```bash
#!/bin/bash
# Assess performance-related attributes

echo "=== Performance Attribute Analysis ==="

# Files with synchronous updates (performance impact)
echo "Files with synchronous updates:"
sudo find /var/lib -exec lsattr {} + 2>/dev/null | grep "S" | wc -l

# Files with no atime updates (performance benefit)
echo "Files with no atime updates:"
find /home -exec lsattr {} + 2>/dev/null | grep "A" | wc -l

# Compressed files (space vs CPU tradeoff)
echo "Compressed files by directory:"
for dir in /home /var /opt; do
    count=$(find "$dir" -type f -exec lsattr {} + 2>/dev/null | grep "c" | wc -l)
    echo "$dir: $count compressed files"
done
```

### Troubleshooting and Diagnostics

#### Common Issues Resolution
```bash
# Check if file has immutable attribute preventing deletion
sudo lsattr problem_file.txt

# Check directory attributes affecting file operations
sudo lsattr -d /problem/directory/

# Verify attributes after chattr operation
sudo chattr +i important_file.conf
sudo lsattr important_file.conf

# Check for attributes causing backup issues
find /backup/source -exec lsattr {} + | grep "d"
```

#### Attribute Recovery Procedures
```bash
# List all attributes for restoration documentation
lsattr -Rlv /important/data/ > /tmp/attributes_backup.txt

# Check attribute consistency across file copies
lsattr original_file.txt copy_file.txt

# Verify attributes after system recovery
sudo lsattr -R /recovered/data/
```

## Integration and Automation

### Shell Script Integration

#### Automated Security Audit
```bash
#!/bin/bash
# Automated file attribute security audit

AUDIT_LOG="/var/log/file_attribute_audit.log"
DATE=$(date +%Y-%m-%d_%H:%M:%S)

echo "[$DATE] Starting file attribute audit" >> "$AUDIT_LOG"

# Check for unexpected immutable files
IMMUTABLE_FILES=$(sudo find /home -type f -exec lsattr {} + 2>/dev/null | grep "i")
if [ ! -z "$IMMUTABLE_FILES" ]; then
    echo "[$DATE] WARNING: Found immutable files in /home:" >> "$AUDIT_LOG"
    echo "$IMMUTABLE_FILES" >> "$AUDIT_LOG"
fi

# Verify critical system files are protected
CRITICAL_FILES="/etc/passwd /etc/shadow /etc/sudoers /etc/hosts"
for file in $CRITICAL_FILES; do
    if [ -f "$file" ]; then
        ATTRS=$(sudo lsattr "$file" 2>/dev/null)
        echo "[$DATE] $file: $ATTRS" >> "$AUDIT_LOG"
    fi
done

echo "[$DATE] File attribute audit completed" >> "$AUDIT_LOG"
```

#### Backup Attribute Check
```bash
#!/bin/bash
# Pre-backup attribute verification

SOURCE_DIR="/data"
BACKUP_DIR="/backup"
LOG_FILE="/var/log/backup_attributes.log"

echo "=== Pre-Backup Attribute Check ===" >> "$LOG_FILE"
date >> "$LOG_FILE"

# Check for files excluded from dumps
EXCLUDED=$(find "$SOURCE_DIR" -exec lsattr {} + 2>/dev/null | grep "d")
if [ ! -z "$EXCLUDED" ]; then
    echo "Files excluded from dumps:" >> "$LOG_FILE"
    echo "$EXCLUDED" >> "$LOG_FILE"
fi

# Check for append-only files that might cause issues
APPEND_ONLY=$(find "$SOURCE_DIR" -exec lsattr {} + 2>/dev/null | grep "a")
if [ ! -z "$APPEND_ONLY" ]; then
    echo "Append-only files found:" >> "$LOG_FILE"
    echo "$APPEND_ONLY" >> "$LOG_FILE"
fi

# Document current attributes for restoration
lsattr -R "$SOURCE_DIR" > "$BACKUP_DIR/attributes_backup_$(date +%Y%m%d).txt"
```

### Monitoring and Alerting

#### Attribute Change Monitoring
```bash
#!/bin/bash
# Monitor for unauthorized attribute changes

BASELINE_FILE="/etc/attributes_baseline"
CURRENT_FILE="/tmp/current_attributes"
ALERT_EMAIL="admin@example.com"

# Create baseline if it doesn't exist
if [ ! -f "$BASELINE_FILE" ]; then
    echo "Creating baseline..."
    sudo find /etc -type f -exec lsattr {} + 2>/dev/null > "$BASELINE_FILE"
fi

# Get current attributes
sudo find /etc -type f -exec lsattr {} + 2>/dev/null > "$CURRENT_FILE"

# Compare with baseline
if ! diff -q "$BASELINE_FILE" "$CURRENT_FILE" > /dev/null; then
    echo "WARNING: File attribute changes detected in /etc" | \
    mail -s "Attribute Change Alert" "$ALERT_EMAIL"

    echo "Changes:"
    diff "$BASELINE_FILE" "$CURRENT_FILE"
fi
```

## Troubleshooting

### Common Issues

#### Permission Issues
```bash
# Permission denied errors
# Solution: Use sudo for system directories
sudo lsattr /etc/passwd

# Files owned by other users
# Solution: Check ownership and use appropriate permissions
ls -la file.txt
sudo lsattr file.txt
```

#### Filesystem Compatibility
```bash
# Command not found on non-ext filesystems
# Solution: Check filesystem type
df -T
mount | grep ext

# Extended attributes not supported
# Solution: Verify filesystem supports extended attributes
tune2fs -l /dev/sda1 | grep "Filesystem features"
```

#### Output Interpretation
```bash
# Unusual attribute combinations
# Solution: Research specific attribute meanings
man chattr

# Attributes not showing expected changes
# Solution: Verify filesystem supports the attribute
sudo tune2fs -l /dev/sda1 | grep -i "compress"
```

### Performance Considerations

#### Large Directory Scans
```bash
# Slow performance on large directories
# Solution: Use specific paths and limit recursion depth
lsattr -R /specific/path | head -50

# Memory issues with very large filesystems
# Solution: Process in chunks
find /path -maxdepth 2 -exec lsattr {} + 2>/dev/null
```

#### System Impact
```bash
# High I/O during recursive operations
# Solution: Run during low-usage periods
nice -n 19 lsattr -R /large/filesystem/

# Minimize impact on production systems
# Solution: Use ionice to limit I/O priority
ionice -c 3 lsattr -R /production/data/
```

## Related Commands

- [`chattr`](/docs/commands/file-management/chattr) - Change file attributes on Linux filesystems
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`stat`](/docs/commands/file-management/stat) - Display file or filesystem status
- [`getfattr`](/docs/commands/file-management/getfattr) - Get extended file attributes
- [`setfattr`](/docs/commands/file-management/setfattr) - Set extended file attributes
- [`attr`](/docs/commands/file-management/attr) - Extended attributes on XFS filesystems
- [`tune2fs`](/docs/commands/system-service/tune2fs) - Adjust tunable filesystem parameters
- [`dumpe2fs`](/docs/commands/system-service/dumpe2fs) - Dump filesystem information

## Best Practices

1. **Use `sudo`** for system directories and files you don't own
2. **Document attribute changes** for system configuration files
3. **Regular audits** of critical file attributes for security
4. **Backup attribute settings** before major system changes
5. **Test attribute changes** in non-production environments first
6. **Use specific paths** rather than recursive scans when possible
7. **Monitor performance impact** when scanning large filesystems
8. **Verify filesystem support** for extended attributes
9. **Keep records** of attribute changes for compliance and auditing
10. **Use automation scripts** for regular attribute monitoring

## Performance Tips

1. **Limit recursion depth** with `-maxdepth` in find commands
2. **Specify exact paths** instead of using broad patterns
3. **Use `nice` and `ionice`** for large scans on production systems
4. **Avoid peak hours** for comprehensive filesystem scans
5. **Cache results** when running the same checks repeatedly
6. **Use `head` or `tail`** to limit output for large result sets
7. **Combine with `grep`** to filter for specific attributes only
8. **Run in parallel** for multiple independent directory scans
9. **Store baselines** to compare against instead of full scans
10. **Use filesystem-specific tools** when available for better performance

The `lsattr` command is an essential tool for Linux system administrators working with ext2/ext3/ext4 filesystems. It provides visibility into extended file attributes that control file behavior beyond traditional Unix permissions. By understanding and properly using `lsattr`, administrators can implement enhanced security controls, optimize filesystem performance, and maintain system integrity through proper attribute management. Regular monitoring and auditing of file attributes is crucial for maintaining system security and compliance in production environments.