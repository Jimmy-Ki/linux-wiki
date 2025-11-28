---
title: fsck - File System Check and Repair
sidebar_label: fsck
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fsck - File System Check and Repair

The `fsck` command is a critical system utility used to check and repair Linux file systems. It serves as a front-end for various file system-specific checkers, automatically detecting the file system type and invoking the appropriate checker (like `fsck.ext4`, `fsck.xfs`, etc.). fsck is essential for maintaining file system integrity, recovering from system crashes, and preventing data corruption. It can examine file system consistency, repair damaged structures, and recover lost data when possible.

## Basic Syntax

```bash
fsck [OPTIONS] [-t [FSTYPE]] [FSCK_OPTS] [DEVICE]
```

## Common Options

### Basic Options
- `-A` - Check all filesystems listed in /etc/fstab
- `-R` - Skip root filesystem (used with -A)
- `-t [FSTYPE]` - Specify filesystem type (comma-separated list)
- `-V` - Verbose mode - show what is being done
- `-N` - Dry run - don't execute, just show what would be done
- `-M` - Skip mounted filesystems
- `-T` - Don't show title on startup
- `-P` - Parallel checking of filesystems

### Repair Options
- `-a` - Automatically repair without prompting (non-interactive)
- `-p` - Automatic repair (safe mode, similar to -a)
- `-r` - Interactive repair (ask before making changes)
- `-y` - Assume "yes" to all questions
- `-n` - Make no changes to filesystem (read-only)

### Force Options
- `-f` - Force check even if filesystem appears clean
- `-C [FD]` - Display progress bar (file descriptor for GUI)

### Filesystem-specific Options
- `-j` - External journal for ext2/ext3/ext4
- `-b SUPERBLOCK` - Use alternative superblock
- `-B BLOCKSIZE` - Specify blocksize

## Usage Examples

### Basic File System Checks

#### Checking Specific Devices
```bash
# Check ext4 filesystem on /dev/sda1
fsck.ext4 /dev/sda1

# Or let fsck auto-detect the filesystem type
fsck /dev/sda1

# Check with verbose output
fsck -V /dev/sda1

# Force check even if marked clean
fsck -f /dev/sda1

# Dry run to see what would be checked
fsck -N /dev/sda1
```

#### Interactive vs Automatic Repair
```bash
# Interactive repair - ask before each fix
fsck -r /dev/sda1

# Automatic repair - fix common issues without asking
fsck -a /dev/sda1

# Safe automatic repair
fsck -p /dev/sda1

# Answer yes to all questions
fsck -y /dev/sda1
```

### System-wide File System Checks

#### Checking All Filesystems
```bash
# Check all filesystems in /etc/fstab
fsck -A

# Check all except root filesystem
fsck -AR

# Check all unmounted filesystems only
fsck -AM

# Check with progress bars
fsck -A -C

# Parallel checking for faster operation
fsck -AP
```

#### Selective Filesystem Checks
```bash
# Check only ext4 filesystems
fsck -t ext4 -A

# Check multiple filesystem types
fsck -t ext4,xfs -A

# Skip specific filesystem types
fsck -t noext3 -A
```

### Advanced File System Operations

#### Specifying Filesystem Type
```bash
# Force ext4 checking
fsck -t ext4 /dev/sda1

# Check XFS filesystem
fsck.xfs /dev/sdb1

# Check BTRFS filesystem
fsck.btrfs /dev/sdc1

# Check FAT32 filesystem
fsck.vfat -a /dev/sdd1
```

#### Using Alternative Superblocks
```bash
# Use backup superblock (common for ext2/3/4)
fsck.ext4 -b 8193 /dev/sda1

# Find and use first backup superblock
fsck.ext4 -b 32768 /dev/sda1

# Multiple backup superblock locations
for sb in 8193 32768 98304; do
    fsck.ext4 -b $sb /dev/sda1
    if [ $? -eq 0 ]; then
        echo "Superblock $sb worked"
        break
    fi
done
```

#### Progress Monitoring
```bash
# Display progress bar on file descriptor 1
fsck -C 0 /dev/sda1

# Use with GUI tools that provide file descriptor
fsck -C 3 /dev/sda1 3>progress.file
```

## Practical Examples

### System Recovery

#### Emergency Boot Recovery
```bash
# Check root filesystem in recovery mode
fsck -f -y /

# Force check all critical filesystems
fsck -A -f -y

# Check all unmounted filesystems after crash
fsck -AM -f -y

# Parallel checking for faster recovery
fsck -AP -f -y
```

#### Scheduled Maintenance
```bash
# Check all filesystems during maintenance window
fsck -A -f -V

# Create log of filesystem check
fsck -A -V > fsck_check_$(date +%Y%m%d).log

# Check specific filesystem types only
fsck -t ext4,xfs -A -f
```

### File System Troubleshooting

#### Recovering from Corruption
```bash
# Check and repair with maximum verbosity
fsck -f -y -v /dev/sda1

# Force check on unclean shutdown
fsck -f /dev/sda1

# Check filesystem without making changes first
fsck -n /dev/sda1

# Then perform actual repairs if needed
fsck -f -y /dev/sda1
```

#### Handling Specific Issues
```bash
# Fix bad blocks on ext filesystem
fsck.ext4 -c -c /dev/sda1

# Check filesystem with external journal
fsck.ext4 -j /dev/journal_device /dev/sda1

# Fix orphaned inodes automatically
fsck -p /dev/sda1

# Handle large filesystems with progress indicator
fsck -C -f -y /dev/large_volume
```

### System Administration

#### Automated System Checks
```bash
# Check all filesystems in cron job
#!/bin/bash
fsck -A -n > /var/log/fsck_check.log 2>&1
if [ $? -ne 0 ]; then
    echo "Filesystem issues detected" | mail -s "fsck alert" admin@example.com
fi

# Check specific critical filesystems
for device in /dev/sda1 /dev/sdb1; do
    echo "Checking $device..."
    fsck -n "$device"
done
```

#### Pre-backup Verification
```bash
# Verify filesystem integrity before backup
fsck -f -n /dev/backup_partition
if [ $? -eq 0 ]; then
    echo "Filesystem OK, proceeding with backup"
    # Run backup commands here
else
    echo "Filesystem issues found, backup aborted"
fi
```

## Advanced Usage

### Multiple File System Types

#### Managing Different Filesystems
```bash
# Check only Linux native filesystems
fsck -t ext2,ext3,ext4,xfs,btrfs -A

# Skip network filesystems
fsck -t nonfs,nfs4,cifs -A

# Check only specific mount points
fsck -t ext4 /dev/sda1 /dev/sdb1

# Order of checking (root first, then others)
fsck -A -R
```

#### Filesystem-specific Options
```bash
# Ext4 with specific options
fsck.ext4 -f -p -v /dev/sda1

# XFS repair (note: XFS uses different tool)
xfs_repair /dev/sdb1

# BTRFS filesystem check
btrfs check /dev/sdc1

# FAT32 with automatic fix
fsck.vfat -a -w /dev/sdd1
```

### Batch Operations

#### Processing Multiple Devices
```bash
# Check all block devices
for device in $(lsblk -l -o NAME | tail -n +2); do
    fsck -n "/dev/$device" 2>/dev/null
done

# Check based on filesystem type
blkid | grep 'ext[234]' | cut -d: -f1 | while read device; do
    echo "Checking $device..."
    fsck -n "$device"
done
```

#### Parallel Processing
```bash
# Check multiple filesystems in parallel
fsck -A -P -f

# Manual parallel checking
fsck -f /dev/sda1 &
fsck -f /dev/sdb1 &
fsck -f /dev/sdc1 &
wait
```

### Integration and Automation

### Shell Scripts

#### Automated Filesystem Health Check
```bash
#!/bin/bash
# Filesystem Health Monitoring Script

LOG_FILE="/var/log/fsck_health.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Function to check and log
check_filesystem() {
    local device=$1
    echo "[$DATE] Checking $device..." >> "$LOG_FILE"

    if fsck -n "$device" >> "$LOG_FILE" 2>&1; then
        echo "[$DATE] $device: OK" >> "$LOG_FILE"
        return 0
    else
        echo "[$DATE] $device: ISSUES FOUND" >> "$LOG_FILE"
        return 1
    fi
}

# Check all ext4 filesystems
for device in $(blkid -t TYPE=ext4 -o device); do
    check_filesystem "$device"
done
```

#### Recovery Automation Script
```bash
#!/bin/bash
# Automated Recovery Script

EMERGENCY_MODE=false
FORCE_REPAIR=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --emergency)
            EMERGENCY_MODE=true
            shift
            ;;
        --force)
            FORCE_REPAIR=true
            shift
            ;;
        *)
            DEVICE="$1"
            shift
            ;;
    esac
done

# Check and repair function
repair_filesystem() {
    local device=$1

    echo "Analyzing $device..."

    if [ "$EMERGENCY_MODE" = true ]; then
        fsck -f -y "$device"
    elif [ "$FORCE_REPAIR" = true ]; then
        fsck -f -a "$device"
    else
        fsck -n "$device"
        read -p "Repair issues found on $device? [y/N] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            fsck -f -y "$device"
        fi
    fi
}

# Execute repairs
if [ -n "$DEVICE" ]; then
    repair_filesystem "$DEVICE"
else
    fsck -AM -f -y
fi
```

#### Scheduled Maintenance Script
```bash
#!/bin/bash
# Scheduled Filesystem Maintenance

MAINTENANCE_LOG="/var/log/fsck_maintenance.log"
RETENTION_DAYS=30

# Function to perform maintenance
perform_maintenance() {
    echo "=== Filesystem Maintenance started $(date) ===" >> "$MAINTENANCE_LOG"

    # Check all filesystems
    fsck -A -n -V >> "$MAINTENANCE_LOG" 2>&1

    # Check for any issues
    if [ $? -ne 0 ]; then
        echo "Filesystem issues detected during maintenance" >> "$MAINTENANCE_LOG"
        # Send alert
        echo "Filesystem maintenance found issues" | mail -s "fsck maintenance alert" admin@example.com
    fi

    echo "=== Filesystem Maintenance completed $(date) ===" >> "$MAINTENANCE_LOG"
}

# Clean old logs
find /var/log -name "fsck_*" -mtime +$RETENTION_DAYS -delete

# Perform maintenance
perform_maintenance
```

## Troubleshooting

### Common Issues

#### Filesystem Mount Conflicts
```bash
# Error: filesystem is mounted
# Solution: Unmount first or check mounted filesystems
umount /dev/sda1
fsck /dev/sda1

# Or check without unmounting (read-only)
fsck -n /dev/sda1

# Skip mounted filesystems automatically
fsck -M -A
```

#### Unclean Shutdown Issues
```bash
# Filesystem marked as unclean
# Force check and repair
fsck -f -y /dev/sda1

# Check journal for ext filesystems
fsck.ext4 -j /dev/sda1

# For systems with external journal
fsck.ext4 -j /dev/journal_device /dev/sda1
```

#### Permission Issues
```bash
# Permission denied errors
# Solution: Use sudo or run as root
sudo fsck /dev/sda1

# Or check if running in recovery mode
whoami  # Should be root
```

#### Corrupted Superblocks
```bash
# Primary superblock corrupted
# Use backup superblocks
fsck.ext4 -b 8193 /dev/sda1
fsck.ext4 -b 32768 /dev/sda1
fsck.ext4 -b 98304 /dev/sda1

# Find backup superblocks automatically
dumpe2fs /dev/sda1 | grep "Backup superblock"
```

### Performance Issues

#### Slow Filesystem Checks
```bash
# Large filesystems taking too long
# Use progress monitoring
fsck -C -f /dev/large_partition

# Run in parallel for multiple filesystems
fsck -AP -f

# Schedule during off-peak hours
echo "0 2 * * 0 root /usr/sbin/fsck -A -f -y > /var/log/weekly_fsck.log" >> /etc/crontab
```

#### Memory Issues
```bash
# Out of memory during large filesystem checks
# Reduce parallel operations
fsck -A -f  # Remove -P flag

# Use smaller block size for some filesystems
fsck.ext4 -b 1024 /dev/sda1
```

## Related Commands

- [`e2fsck`](/docs/commands/compression/e2fsck) - ext2/ext3/ext4 filesystem checker
- [`fsck.ext4`](/docs/commands/compression/fsck.ext4) - ext4 filesystem checker
- [`xfs_repair`](/docs/commands/compression/xfs_repair) - XFS filesystem repair
- [`btrfs check`](/docs/commands/compression/btrfs_check) - BTRFS filesystem checker
- [`dumpe2fs`](/docs/commands/compression/dumpe2fs) - Display ext2/ext3/ext4 filesystem information
- [`tune2fs`](/docs/commands/compression/tune2fs) - Adjust tunable filesystem parameters
- [`badblocks`](/docs/commands/compression/badblocks) - Search for bad blocks
- [`fsck.minix`](/docs/commands/compression/fsck.minix) - Minix filesystem checker
- [`fsck.vfat`](/docs/commands/compression/fsck.vfat) - FAT filesystem checker
- [`mount`](/docs/commands/compression/mount) - Mount filesystems
- [`umount`](/docs/commands/compression/umount) - Unmount filesystems
- [`blkid`](/docs/commands/compression/blkid) - Locate/print block device attributes

## Best Practices

1. **Always unmount** filesystems before checking when possible
2. **Use dry run mode** (-n) first to assess damage before making changes
3. **Backup critical data** before performing major repairs
4. **Check logs** after fsck operations for any warnings or errors
5. **Schedule regular checks** during system maintenance windows
6. **Use appropriate options** for your filesystem type
7. **Test in recovery mode** before applying to production systems
8. **Monitor progress** on large filesystems with -C option
9. **Document all repairs** for audit and troubleshooting purposes
10. **Update /etc/fstab** pass numbers for proper boot-time checking

## Performance Tips

1. **Use parallel checking** (-P) for multiple independent filesystems
2. **Schedule during low usage** periods to minimize system impact
3. **Progress monitoring** helps track long-running operations
4. **Skip clean filesystems** to save time unless forced checking is needed
5. **Use appropriate block sizes** for better memory efficiency
6. **Consider filesystem-specific tools** for optimized performance
7. **Batch operations** for multiple filesystems reduce overhead
8. **Use modern filesystem features** like journaling to reduce check frequency
9. **Monitor system resources** during large filesystem checks
10. **Plan for sufficient time** when checking very large filesystems

The `fsck` command is an essential system administration tool for maintaining Linux filesystem integrity and recovering from system failures. Proper understanding and usage of fsck is crucial for system administrators to ensure data reliability and system stability.