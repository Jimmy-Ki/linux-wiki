---
title: chattr - Change File Attributes on Linux Extended Filesystems
sidebar_label: chattr
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chattr - Change File Attributes on Linux Extended Filesystems

The `chattr` command is a powerful Linux utility used to change file attributes on extended filesystems (ext2, ext3, ext4, and others). It provides low-level file attributes that go beyond traditional Unix permissions, offering enhanced file protection and control. These attributes are stored directly in the filesystem metadata and cannot be bypassed by regular file operations, making them essential for system security, data integrity, and administrative control. The most commonly used attribute is the immutable flag (`+i`), which prevents any modification to protected files, even by the root user.

## Basic Syntax

```bash
chattr [OPERATORS][ATTRIBUTES] FILE...
chattr [OPTIONS] [OPERATORS][ATTRIBUTES] FILE...
```

## Operators

- `+` - Add attributes
- `-` - Remove attributes
- `=` - Set attributes exactly (remove all others)

## File Attributes

### Security and Protection Attributes
- `a` - Append only (file can only be appended to)
- `A` - No atime updates (don't update access time)
- `c` - Compressed (file is stored compressed on disk)
- `C` - No copy-on-write (disable copy-on-write)
- `d` - No dump (exclude from backups with `dump` command)
- `e` - Extents format (use extents for mapping file blocks)
- `i` - Immutable (cannot be modified, deleted, or renamed)
- `j` - Data journaling (write file data to journal)
- `s` - Secure deletion (zero blocks when file is deleted)
- `S` - Synchronous updates (write changes to disk immediately)
- `t` - No tail-merging (no tail-merging of partial blocks)
- `T` - Top of directory hierarchy (hierarchical directory top)
- `u` - Undeletable (allow file contents to be undeleted)

### Extended Attributes
- `D` - Synchronous directory updates
- `E` - Compression error (indicates compression error)
- `I` - Indexed directory (use hashed B-trees)
- `P` - Project hierarchy (project quota inheritance)
- `X` - Compression raw access (direct compressed access)

## Common Options

- `-R, --recursive` - Recursively change attributes of directories and contents
- `-V, --verbose` - Verbose output showing changed attributes
- `-v VERSION` - Set/set the file's version/generation number
- `-p PROJECT` - Set the project ID for project quota control
- `-f, --force` - Suppress most error messages
- `--help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic File Protection

#### Making Files Immutable
```bash
# Make a file immutable (cannot be modified, deleted, or renamed)
sudo chattr +i /etc/hosts
sudo chattr +i /etc/passwd
sudo chattr +i /etc/shadow

# Protect important configuration files
sudo chattr +i /etc/resolv.conf
sudo chattr +i /etc/sudoers
sudo chattr +i /etc/ssh/sshd_config

# Remove immutable attribute
sudo chattr -i /etc/hosts
```

#### Append-Only Files
```bash
# Make log files append-only (can only add to, not modify existing content)
sudo chattr +a /var/log/auth.log
sudo chattr +a /var/log/secure
sudo chattr +a /var/log/audit/audit.log

# Remove append-only attribute
sudo chattr -a /var/log/auth.log

# Create append-only file for security logging
sudo touch /var/log/security.log
sudo chattr +a /var/log/security.log
sudo chmod 600 /var/log/security.log
```

### System Administration

#### Backup and Archive Protection
```bash
# Prevent important backups from being modified
sudo chattr +i /backup/database_backup.sql
sudo chattr +i /backup/system_config.tar.gz

# Mark files to exclude from backups
sudo chattr +d /tmp/*
sudo chattr +d /var/tmp/*

# Secure deletion for sensitive files
sudo chattr +s /home/user/sensitive_document.pdf
sudo rm /home/user/sensitive_document.pdf
```

#### Directory Protection
```bash
# Recursively protect entire directories
sudo chattr -R +i /etc/cron.d/
sudo chattr -R +i /etc/cron.daily/
sudo chattr -R +i /etc/cron.weekly/

# Make critical system directories append-only
sudo chattr -R +a /var/log/
sudo chattr +a /var/log/journal/
```

### Performance Optimization

#### Disable Access Time Updates
```bash
# Improve performance by disabling atime updates
sudo chattr -R +A /var/lib/mysql/
sudo chattr -R +A /var/www/cache/
sudo chattr -R +A /home/user/projects/

# No access time updates for web content
sudo chattr -R +A /var/www/html/
sudo chattr -R +A /srv/http/
```

#### Synchronous Updates
```bash
# Ensure immediate disk writes for critical data
sudo chattr +S /var/lib/postgresql/data/
sudo chattr +S /etc/passwd
sudo chattr +S /etc/shadow

# Database files with synchronous updates
sudo chattr +S /var/lib/mysql/ibdata1
sudo chattr +S /var/lib/mysql/ib_logfile0
```

## Practical Examples

### System Security

#### Protecting System Files
```bash
#!/bin/bash
# Secure critical system files

CRITICAL_FILES=(
    "/etc/passwd"
    "/etc/shadow"
    "/etc/group"
    "/etc/gshadow"
    "/etc/sudoers"
    "/etc/hosts"
    "/etc/fstab"
    "/etc/resolv.conf"
    "/boot/grub/grub.cfg"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Securing $file..."
        sudo chattr +i "$file"
    fi
done

echo "Critical system files secured with immutable flag"
```

#### Log File Protection
```bash
#!/bin/bash
# Setup secure logging

LOG_FILES=(
    "/var/log/auth.log"
    "/var/log/secure"
    "/var/log/audit/audit.log"
    "/var/log/kern.log"
    "/var/log/syslog"
)

for log in "${LOG_FILES[@]}"; do
    if [ -f "$log" ]; then
        echo "Setting append-only for $log..."
        sudo chattr +a "$log"
        sudo chmod 600 "$log"
    fi
done

echo "Log files configured for append-only access"
```

### Database and Application Security

#### Database File Protection
```bash
# Protect database files from accidental deletion
sudo chattr +i /var/lib/mysql/ibdata1
sudo chattr +i /var/lib/mysql/ib_logfile0

# Make database directory append-only
sudo chattr +a /var/lib/mysql/binlog.index
sudo chattr +a /var/lib/mysql/mysql.err

# Enable synchronous updates for data integrity
sudo chattr +S /var/lib/mysql/ibdata*
sudo chattr +S /var/lib/postgresql/data/pg_xlog/*
```

#### Application Configuration Protection
```bash
# Protect application configurations
sudo chattr +i /etc/nginx/nginx.conf
sudo chattr +i /etc/apache2/apache2.conf
sudo chattr +i /etc/php/php.ini
sudo chattr +i /etc/my.cnf

# Protect SSL certificates
sudo chattr -R +i /etc/ssl/certs/
sudo chattr -R +i /etc/ssl/private/

# Make configuration directories append-only
sudo chattr -R +a /etc/logrotate.d/
sudo chattr -R +a /etc/cron.d/
```

### Data Management

#### Archive Protection
```bash
# Create and protect archives
tar -czf backup_$(date +%Y%m%d).tar.gz /important/data/
sudo chattr +i backup_$(date +%Y%m%d).tar.gz

# Mark old files for secure deletion
find /data/old_files/ -mtime +365 -exec sudo chattr +s {} \;

# Exclude temporary files from backups
sudo chattr -R +d /tmp/
sudo chattr -R +d /var/tmp/
sudo chattr -R +d /var/cache/
```

#### User Data Protection
```bash
# Protect user home directory structure
sudo chattr +i /home/user/.bashrc
sudo chattr +i /home/user/.profile
sudo chattr +i /home/user/.ssh/authorized_keys

# Make user documents immutable after completion
sudo chattr +i /home/user/documents/final_report.pdf
sudo chattr +i /home/user/documents/contract_signed.docx
```

## Advanced Usage

### Combined Attributes

#### Multi-Attribute Configuration
```bash
# Combine multiple attributes for maximum protection
sudo chattr +iAS /etc/passwd           # immutable, no atime, synchronous
sudo chattr +aD /var/log/auth.log      # append-only, sync directory updates
sudo chattr +id /tmp/tempfile          # immutable, no dump
sudo chattr +cj /var/lib/mysql/data    # compressed, data journaling

# Set multiple attributes at once
sudo chattr +iAcS /critical/system/files/*
sudo chattr +adij /backup/archives/
```

#### Version Control
```bash
# Set file version numbers
sudo chattr -v 1 /etc/hosts
sudo chattr -v 2 /etc/passwd.backup

# Check file versions
lsattr -v /etc/hosts
lsattr -v /etc/passwd.backup
```

### Recursive Operations

#### Directory Tree Protection
```bash
# Recursively make entire directory structure immutable
sudo chattr -R +i /etc/critical_configs/
sudo chattr -R +a /var/log/secure_logs/

# Apply attributes to specific file types
find /data/documents/ -name "*.conf" -exec sudo chattr +i {} \;
find /var/log/ -name "*.log" -exec sudo chattr +a {} \;
find /backup/ -name "*.tar.gz" -exec sudo chattr +i {} \;
```

#### Selective Attribute Management
```bash
# Apply attributes based on file permissions
find /etc/ -perm 644 -exec sudo chattr +i {} \;
find /var/log/ -perm 600 -exec sudo chattr +a {} \;

# Protect files owned by specific users
find /home/ -user root -exec sudo chattr +i {} \;
find /home/ -user backup -exec sudo chattr +d {} \;
```

## Integration and Automation

### Shell Scripts

#### System Hardening Script
```bash
#!/bin/bash
# Comprehensive system hardening with chattr

set -e

# Configuration
LOG_FILE="/var/log/system_hardening.log"
BACKUP_DIR="/root/security_backup"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to log actions
log_action() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to backup and secure file
secure_file() {
    local file="$1"
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/" 2>/dev/null || true
        sudo chattr +i "$file"
        log_action "Secured: $file"
    fi
}

# Critical system files
CRITICAL_FILES=(
    "/etc/passwd"
    "/etc/shadow"
    "/etc/group"
    "/etc/gshadow"
    "/etc/sudoers"
    "/etc/hosts"
    "/etc/fstab"
    "/etc/resolv.conf"
    "/boot/grub/grub.cfg"
)

log_action "Starting system hardening"

# Secure critical files
for file in "${CRITICAL_FILES[@]}"; do
    secure_file "$file"
done

# Protect log files with append-only
LOG_DIRS=(
    "/var/log"
    "/var/log/audit"
)

for dir in "${LOG_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "*.log" -exec sudo chattr +a {} \;
        log_action "Protected log files in: $dir"
    fi
done

# Exclude temporary directories from dumps
TEMP_DIRS=(
    "/tmp"
    "/var/tmp"
    "/var/cache"
)

for dir in "${TEMP_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        sudo chattr -R +d "$dir"
        log_action "Excluded from dumps: $dir"
    fi
done

log_action "System hardening completed"
echo "Backup location: $BACKUP_DIR"
```

#### File Integrity Monitoring
```bash
#!/bin/bash
# Monitor file attributes for security

MONITOR_FILES=(
    "/etc/passwd"
    "/etc/shadow"
    "/etc/sudoers"
    "/etc/hosts"
)

ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/chattr_monitor.log"

check_attributes() {
    local changes=false

    for file in "${MONITOR_FILES[@]}"; do
        if [ -f "$file" ]; then
            current_attrs=$(lsattr "$file" | cut -d' ' -f1)
            expected_attrs=$(cat "/var/tmp/attrs_$(basename $file)" 2>/dev/null || echo "")

            if [ "$current_attrs" != "$expected_attrs" ]; then
                echo "$(date): Attribute change detected in $file: $current_attrs" | tee -a "$LOG_FILE"
                changes=true

                # Send alert (requires mail setup)
                echo "File $file attributes changed to $current_attrs" | mail -s "Security Alert: chattr change" "$ALERT_EMAIL"
            fi

            # Update stored attributes
            echo "$current_attrs" > "/var/tmp/attrs_$(basename $file)"
        fi
    done

    if [ "$changes" = true ]; then
        echo "$(date): Security alert sent" >> "$LOG_FILE"
    fi
}

# Run the check
check_attributes
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Need root privileges for most operations
sudo chattr +i /etc/critical_file

# Check if filesystem supports extended attributes
sudo tune2fs -l /dev/sda1 | grep "Filesystem features"

# Some filesystems don't support all attributes
# ext2, ext3, ext4 support most attributes
# XFS, Btrfs have limited support
```

#### Files Cannot Be Modified
```bash
# Check file attributes if you can't modify a file
lsattr /etc/hosts

# Remove immutable attribute to allow modifications
sudo chattr -i /etc/hosts

# Check if append-only is preventing modifications
sudo chattr -a /var/log/file.log

# Remove multiple attributes
sudo chattr -ai /file/with/multiple/attrs
```

#### Recursion Issues
```bash
# Be careful with recursive operations
# First test with lsattr to see current state
sudo lsattr -R /directory/

# Use verbose mode to see what's being changed
sudo chattr -Rv +i /directory/

# Exclude certain files from recursive operations
find /directory/ -type f ! -name "*.tmp" -exec sudo chattr +i {} \;
```

#### Filesystem Compatibility
```bash
# Check filesystem type
df -T

# Check supported features
sudo tune2fs -l /dev/sda1

# Enable extended attributes if needed
sudo tune2fs -o user_xattr /dev/sda1
```

## Related Commands

- [`lsattr`](/docs/commands/file-management/lsattr) - List file attributes on extended filesystems
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file owner and group
- [`chgrp`](/docs/commands/file-management/chgrp) - Change group ownership
- [`getfattr`](/docs/commands/file-management/getfattr) - Get extended attributes
- [`setfattr`](/docs/commands/file-management/setfattr) - Set extended attributes
- [`attr`](/docs/commands/file-management/attr) - Extended attribute utilities
- [`tune2fs`](/docs/commands/system-services/tune2fs) - Tune ext2/ext3/ext4 filesystem parameters
- [`fsck`](/docs/commands/compression/fsck) - Filesystem consistency check

## Best Practices

1. **Test before applying** - Always test chattr operations on non-production files first
2. **Document changes** - Keep a record of files with special attributes
3. **Use with caution** - Immutable files cannot be modified even by root
4. **Backup first** - Always backup files before applying restrictive attributes
5. **Regular monitoring** - Monitor file attributes for security purposes
6. **Combine with permissions** - Use chattr as additional security layer, not replacement
7. **Consider recovery** - Plan how to remove attributes in emergencies
8. **Use verbose mode** - Use `-V` flag to track changes during operations
9. **Limit recursion** - Be careful with recursive operations on large directory trees
10. **Check compatibility** - Verify filesystem supports needed attributes

## Performance Tips

1. **Disable atime** for static content with `+A` to reduce disk I/O
2. **Use append-only** for log files rather than synchronous updates
3. **Avoid extensive use** of immutable attributes on frequently modified files
4. **Batch operations** to minimize filesystem metadata updates
5. **Consider file size** when using compression attributes
6. **Test performance impact** before widespread deployment
7. **Use selective protection** rather than directory-wide when possible
8. **Monitor filesystem performance** after applying extensive attributes
9. **Combine with journaling** options for data integrity vs. performance balance
10. **Use project quotas** with `+P` for better resource management

The `chattr` command provides essential filesystem-level protection that complements traditional Unix permissions. When used properly, it significantly enhances system security and data integrity, making it a crucial tool for Linux system administrators managing critical infrastructure and sensitive data.

**Security Note**: The immutable attribute (`+i`) provides strong protection but requires careful planning, as it cannot be bypassed even by the root user without explicitly removing the attribute. Always ensure you have recovery procedures in place before applying restrictive attributes to critical system files.