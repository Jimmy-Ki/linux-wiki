---
title: dump - Ext2/Ext3 Filesystem Backup Utility
sidebar_label: dump
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dump - Ext2/Ext3 Filesystem Backup Utility

The `dump` command is a powerful filesystem backup utility specifically designed for ext2, ext3, and ext4 filesystems. It creates incremental backups using a sophisticated level system (0-9) and supports both full and incremental backups. Unlike other backup tools, dump works at the filesystem level, understanding filesystem internals and providing efficient, reliable backups with detailed metadata.

## Basic Syntax

```bash
dump [OPTIONS] [-LEVEL] [-f ARCHIVE_FILE] FILESYSTEM
```

## Common Options

### Backup Level Options
- `-0` through `-9` - Backup level (0 = full backup, 1-9 = incremental backups)
- `-u` - Update /etc/dumpdates file after successful backup
- `-L LABEL` - Backup label (stored in dump header)

### Output and File Options
- `-f FILE` - Backup file or device (required)
- `-a` - Auto-detect archive media and format
- `-b SIZE` - Block size in kilobytes (default: 10)
- `-B COUNT` - Volume capacity in blocks

### Performance and Behavior
- `-j` - Use bzlib compression (level 1-9)
- `-z` - Use zlib compression (level 1-9)
- `-M` - Multi-volume backup
- `-W` - Show which files need backup
- `-n` - Notify operators via wall when backup requires attention

### Filesystem Options
- `-h LEVEL` - Do not dump files marked nodump if dump level is >= LEVEL
- `-T DATE` - Use specified timestamp for determining what to dump
- `-x INODE` - Exclude specific inode from backup

### Information and Debugging
- `-v` - Verbose output
- `-S` - Estimate backup size
- `-q` - Quiet mode (no progress indicators)
- `-R` - Run in record mode (for restore)

## Usage Examples

### Basic Backup Operations
```bash
# Level 0 (full backup) of /home filesystem
dump -0u -f /backup/home_level0.dump /home

# Level 1 (incremental) backup since last level 0
dump -1u -f /backup/home_level1.dump /home

# Level 2 incremental backup since last level 1
dump -2u -f /backup/home_level2.dump /home

# Compressed full backup
dump -0uj9 -f /backup/home_compressed.dump.bz2 /home
```

### Backup to Tape Devices
```bash
# Backup to tape drive
dump -0u -f /dev/st0 /home

# Multi-volume backup to multiple tapes
dump -0u -M -f /dev/st0 /home

# Backup to remote tape drive via SSH
dump -0u -f "(ssh backup@server dd of=/dev/st0)" /home
```

### Estimating and Planning
```bash
# Estimate backup size without creating backup
dump -0S /home

# Estimate size of level 1 backup
dump -1S /home

# Check what files would be backed up
dump -0W /home

# Verbose backup with progress
dump -0vu -f /backup/home.dump /home
```

### Advanced Backup Strategies
```bash
# Backup with custom block size for better performance
dump -0u -b 1024 -f /backup/home_large.dump /home

# Backup excluding certain directories
dump -0u -f /backup/home.dump /home -h 1

# Create backup with specific label
dump -0u -L "Weekly Home Backup" -f /backup/home_weekly.dump /home

# Backup using custom timestamp
dump -0u -T "2024-01-01 00:00:00" -f /backup/home_newyear.dump /home
```

## Practical Examples

### Automated Backup Script
```bash
#!/bin/bash
# Automated dump backup script with rotation

BACKUP_DIR="/backups/dump"
LOG_FILE="/var/log/dump_backup.log"
RETENTION_DAYS=30
FILESYSTEMS="/home /var /usr"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to perform backup
backup_filesystem() {
    local fs="$1"
    local backup_date=$(date +%Y%m%d)
    local backup_name="${fs//\//_}_${backup_date}"

    echo "$(date): Starting backup of $fs" >> "$LOG_FILE"

    # Determine backup level based on day of week
    local day_of_week=$(date +%u)
    local backup_level=1
    if [ "$day_of_week" -eq 1 ]; then  # Monday = level 0
        backup_level=0
    fi

    # Perform backup
    if dump -${backup_level}u -f "$BACKUP_DIR/${backup_name}.dump" "$fs" 2>&1 | tee -a "$LOG_FILE"; then
        echo "$(date): Backup of $fs completed successfully" >> "$LOG_FILE"

        # Compress backup
        gzip "$BACKUP_DIR/${backup_name}.dump"
        echo "$(date): Backup compressed" >> "$LOG_FILE"
    else
        echo "$(date): ERROR: Backup of $fs failed" >> "$LOG_FILE"
    fi
}

# Backup all filesystems
for fs in $FILESYSTEMS; do
    if mountpoint -q "$fs"; then
        backup_filesystem "$fs"
    else
        echo "$(date): WARNING: $fs is not mounted" >> "$LOG_FILE"
    fi
done

# Cleanup old backups
find "$BACKUP_DIR" -name "*.dump.gz" -mtime +$RETENTION_DAYS -delete
echo "$(date): Cleanup completed" >> "$LOG_FILE"
```

### Weekly Backup Rotation
```bash
#!/bin/bash
# Weekly backup rotation using dump levels

BACKUP_DIR="/backups/weekly"
FULL_BACKUP_DAY=1  # Monday
TODAY=$(date +%u)
TODAY_DATE=$(date +%Y%m%d)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to determine backup level
get_backup_level() {
    local day="$1"
    case $day in
        $FULL_BACKUP_DAY) echo "0" ;;  # Full backup on Monday
        2|3) echo "1" ;;               # Tuesday, Wednesday
        4|5) echo "2" ;;               # Thursday, Friday
        6|7) echo "3" ;;               # Saturday, Sunday
    esac) echo "0" ;;
    esac
}

# Backup function
backup_fs() {
    local filesystem="$1"
    local level=$(get_backup_level "$TODAY")
    local backup_file="${filesystem//\//_}_${TODAY_DATE}_L${level}.dump"

    echo "Starting level $level backup of $filesystem"

    dump -${level}u -f "$BACKUP_DIR/$backup_file" "$filesystem"

    if [ $? -eq 0 ]; then
        echo "Backup completed: $backup_file"
        gzip "$BACKUP_DIR/$backup_file"
    else
        echo "Backup failed for $filesystem"
    fi
}

# Backup key filesystems
backup_fs "/home"
backup_fs "/var"
backup_fs "/usr/local"

# Keep weekly full backups for 4 weeks
if [ "$TODAY" -eq "$FULL_BACKUP_DAY" ]; then
    find "$BACKUP_DIR" -name "*_L0_*.dump.gz" -mtime +28 -delete
fi
```

### Remote Backup Setup
```bash
#!/bin/bash
# Remote backup configuration for dump

REMOTE_SERVER="backup.company.com"
REMOTE_USER="backup"
REMOTE_PATH="/remote_backups"
SSH_KEY="/home/backup/.ssh/id_rsa"

# Function to backup to remote server
remote_backup() {
    local filesystem="$1"
    local level="$2"
    local backup_name="${filesystem//\//_}_$(date +%Y%m%d)_L${level}"

    echo "Starting level $level backup of $filesystem to remote server"

    # Perform backup and stream to remote server
    dump -${level}u -f - "$filesystem" | \
    ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_SERVER" \
        "cat > $REMOTE_PATH/${backup_name}.dump"

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo "Remote backup completed successfully"
    else
        echo "Remote backup failed for $filesystem"
    fi
}

# Perform remote backups
remote_backup "/home" "0"
remote_backup "/var" "0"
```

### Restore Testing Script
```bash
#!/bin/bash
# Test dump backup integrity by performing test restore

BACKUP_DIR="/backups/dump"
TEST_RESTORE_DIR="/tmp/restore_test"

# Function to test restore
test_restore() {
    local backup_file="$1"
    local test_dir="$2"

    echo "Testing restore of $backup_file"

    # Create test restore directory
    mkdir -p "$test_dir"

    # Extract table of contents first
    restore -t -f "$backup_file" > "${backup_file}.toc" 2>&1

    if [ $? -eq 0 ]; then
        echo "TOC extraction successful for $backup_file"

        # Perform interactive restore (dry run)
        echo "y" | restore -iv -f "$backup_file" 2>&1 | \
            grep -E "(extracted|skipped)" | tail -10
    else
        echo "ERROR: TOC extraction failed for $backup_file"
        return 1
    fi

    # Cleanup
    rm -rf "$test_dir"
    rm -f "${backup_file}.toc"

    return 0
}

# Test all recent backups
for backup in "$BACKUP_DIR"/*.dump.gz; do
    if [ -f "$backup" ]; then
        # Uncompress temporarily for testing
        gunzip -c "$backup" > "${backup%.gz}"
        test_restore "${backup%.gz}" "$TEST_RESTORE_DIR"
        rm -f "${backup%.gz}"
    fi
done
```

## Real-World Scenarios

### Enterprise Backup Strategy
```bash
#!/bin/bash
# Enterprise-level backup strategy using dump

BACKUP_ROOT="/enterprise/backups"
CONFIG_FILE="/etc/backup_config.conf"
LOG_FILE="/var/log/enterprise_backup.log"
EMAIL_ADMIN="backup-admin@company.com"

# Load configuration
[ -f "$CONFIG_FILE" ] && source "$CONFIG_FILE"

# Default filesystems if not configured
FILESYSTEMS="${FILESYSTEMS:-"/home /var /opt /data"}"

# Function to send notification
notify_admin() {
    local subject="$1"
    local message="$2"
    echo "$message" | mail -s "$subject" "$EMAIL_ADMIN"
}

# Function to create backup with verification
create_backup() {
    local fs="$1"
    local level="$2"
    local backup_date=$(date +%Y%m%d_%H%M%S)
    local backup_name="${fs//\//_}_${backup_date}_L${level}"
    local backup_file="$BACKUP_ROOT/$backup_name.dump"

    echo "$(date): Creating level $level backup of $fs" >> "$LOG_FILE"

    # Perform backup
    if dump -${level}u -f "$backup_file" "$fs" >> "$LOG_FILE" 2>&1; then
        # Calculate checksum
        local checksum=$(md5sum "$backup_file" | cut -d' ' -f1)
        echo "$checksum  $backup_file" > "${backup_file}.md5"

        # Compress backup
        gzip "$backup_file"
        mv "${backup_file}.md5" "${backup_file}.gz.md5"

        # Create metadata
        cat > "${backup_file}.gz.info" << EOF
Backup Information:
==================
Filesystem: $fs
Level: $level
Date: $(date)
Size: $(du -h "${backup_file}.gz" | cut -f1)
Checksum: $checksum
Host: $(hostname)
EOF

        echo "$(date): Backup completed successfully: $backup_name.dump.gz" >> "$LOG_FILE"
        return 0
    else
        echo "$(date): ERROR: Backup failed for $fs" >> "$LOG_FILE"
        notify_admin "Backup Failed: $fs" "Level $level backup of $fs failed. Check log file."
        return 1
    fi
}

# Function to determine backup level based on schedule
determine_level() {
    local day_of_week=$(date +%u)
    local day_of_month=$(date +%d)

    # Level 0 on first Monday of month
    if [ "$day_of_week" -eq 1 ] && [ "$day_of_month" -le 7 ]; then
        echo "0"
    # Level 1 on Sundays
    elif [ "$day_of_week" -eq 7 ]; then
        echo "1"
    # Level 2 on Tuesday-Thursday
    elif [ "$day_of_week" -ge 2 ] && [ "$day_of_week" -le 4 ]; then
        echo "2"
    # Level 3 on Friday-Saturday
    else
        echo "3"
    fi
}

# Main backup procedure
echo "$(date): Starting enterprise backup procedure" >> "$LOG_FILE"

# Determine backup level
BACKUP_LEVEL=$(determine_level)
echo "$(date): Using backup level $BACKUP_LEVEL" >> "$LOG_FILE"

# Create backups for all filesystems
for fs in $FILESYSTEMS; do
    if mountpoint -q "$fs"; then
        create_backup "$fs" "$BACKUP_LEVEL"
    else
        echo "$(date): WARNING: $fs is not mounted, skipping" >> "$LOG_FILE"
    fi
done

# Cleanup old backups based on retention policy
find "$BACKUP_ROOT" -name "*.dump.gz" -mtime +60 -delete
find "$BACKUP_ROOT" -name "*.dump.gz.info" -mtime +60 -delete
find "$BACKUP_ROOT" -name "*.dump.gz.md5" -mtime +60 -delete

echo "$(date): Enterprise backup procedure completed" >> "$LOG_FILE"
```

### Disaster Recovery Preparation
```bash
#!/bin/bash
# Prepare disaster recovery backups using dump

RECOVERY_MEDIA="/mnt/recovery"
ESSENTIAL_FS="/ /boot /home /var"
RECOVERY_DATE=$(date +%Y%m%d_%H%M%S)

# Mount recovery media
mount /dev/sdb1 "$RECOVERY_MEDIA" || {
    echo "Failed to mount recovery media"
    exit 1
}

# Function to create disaster recovery backup
dr_backup() {
    local fs="$1"
    local backup_file="$RECOVERY_MEDIA/dr_${fs//\//_}_${RECOVERY_DATE}.dump"

    echo "Creating disaster recovery backup of $fs"

    # Use level 0 for disaster recovery
    if dump -0u -f "$backup_file" "$fs"; then
        echo "DR backup created: $backup_file"

        # Create restore script
        cat > "$RECOVERY_MEDIA/restore_${fs//\//_}.sh" << EOF
#!/bin/bash
# Restore script for $fs from $RECOVERY_DATE

echo "Restoring $fs from disaster recovery backup"
restore -rf "$backup_file"

if [ $? -eq 0 ]; then
    echo "Restore of $fs completed successfully"
else
    echo "ERROR: Restore of $fs failed"
fi
EOF

        chmod +x "$RECOVERY_MEDIA/restore_${fs//\//_}.sh"
    else
        echo "ERROR: DR backup failed for $fs"
        return 1
    fi
}

# Create disaster recovery backups
for fs in $ESSENTIAL_FS; do
    if [ "$fs" = "/" ]; then
        dr_backup "root"
    else
        dr_backup "$fs"
    fi
done

# Create recovery documentation
cat > "$RECOVERY_MEDIA/README_RECOVERY.txt" << EOF
Disaster Recovery Backup Information
==================================

Date Created: $(date)
Hostname: $(hostname)
Kernel: $(uname -a)

Backup Files:
$(ls -la "$RECOVERY_MEDIA"/dr_*.dump)

To restore:
1. Boot from rescue media
2. Mount this recovery media
3. Run the appropriate restore script
4. Reboot system

Note: This is a complete disaster recovery backup.
Ensure you have tested your restore procedure.
EOF

# Unmount recovery media
umount "$RECOVERY_MEDIA"

echo "Disaster recovery backup completed"
```

## Performance Optimization

### Optimizing Dump Performance
```bash
# Optimize block size for different storage types
# For SSDs (faster with larger blocks)
dump -0u -b 2048 -f /backup/home_ssd.dump /home

# For traditional HDDs
dump -0u -b 1024 -f /backup/home_hdd.dump /home

# For tape drives
dump -0u -b 512 -f /dev/st0 /home

# Use compression to reduce backup size
dump -0uj7 -f /backup/home_compressed.dump /home
```

### Parallel Backups
```bash
#!/bin/bash
# Run multiple dump backups in parallel

FILESYSTEMS="/home /var /opt"
MAX_PARALLEL=3

# Function to run backup
run_backup() {
    local fs="$1"
    dump -0u -f "/backup/${fs//\//_}.dump" "$fs"
}

# Run backups in parallel (limited by MAX_PARALLEL)
echo "$FILESYSTEMS" | xargs -n 1 -P $MAX_PARALLEL -I {} bash -c 'run_backup "$@"' _ {}
```

## Related Commands

- [`restore`](/docs/commands/backup-recovery/restore) - Restore files from dump backups
- [`tar`](/docs/commands/backup-recovery/tar) - Archive utility for file backups
- [`rsync`](/docs/commands/backup-recovery/rsync) - Remote file synchronization
- [`dumpdates`](/etc/dumpdates) - Dump backup database file
- [`fsck`](/docs/commands/disk-filesystem/fsck) - Filesystem check and repair
- [`mount`](/docs/commands/disk-filesystem/mount) - Mount filesystems

## Best Practices

1. **Test restore procedures regularly** - Verify that backups can be restored
2. **Use appropriate backup levels** - Implement a proper incremental backup schedule
3. **Monitor backup success** - Check return codes and log files
4. **Store backups offsite** - Protect against local disasters
5. **Document backup procedures** - Maintain clear recovery documentation
6. **Use compression wisely** - Balance storage savings with CPU overhead
7. **Implement retention policies** - Automatically clean up old backups
8. **Monitor disk space** - Ensure sufficient space for backups
9. **Verify backup integrity** - Use checksums and test restores
10. **Schedule appropriately** - Run backups during low-usage periods

The `dump` command provides robust, filesystem-aware backups ideal for Linux systems using ext filesystems. While it may seem more complex than simpler tools, its incremental backup capabilities and deep filesystem integration make it an excellent choice for enterprise backup strategies.