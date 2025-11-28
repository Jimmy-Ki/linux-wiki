---
title: e2fsck - Check ext2/ext3/ext4 filesystems
sidebar_label: e2fsck
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# e2fsck - Check ext2/ext3/ext4 filesystems

The `e2fsck` command is a powerful filesystem checker utility used to examine and repair Linux ext2, ext3, and ext4 filesystems. As part of the e2fsprogs suite, it performs comprehensive consistency checks, detects and fixes filesystem corruption, repairs damaged inodes, blocks, and directories, and maintains filesystem integrity. e2fsck is essential for system administration tasks, emergency recovery operations, and routine filesystem maintenance, offering various modes from non-interactive automatic repairs to detailed manual intervention with extensive logging and reporting capabilities.

## Basic Syntax

```bash
e2fsck [OPTIONS] [-p | -y | -n] device
e2fsck [OPTIONS] [-f] [-b superblock] [-B blocksize] [-c] device
```

## Common Modes

- `-p` - Preen mode (automatically fix problems that can be safely corrected)
- `-y` - Assume "yes" to all questions (non-interactive mode)
- `-n` - Assume "no" to all questions (read-only mode, don't make changes)

## Common Options

### Basic Check Options
- `-f` - Force check even if filesystem appears clean
- `-v` - Verbose mode (print detailed information)
- `-c` - Check for bad blocks (read-only test)
- `-k` - Keep existing bad blocks when adding new ones

### Bad Block Handling
- `-c` - Check for bad blocks and add them to the bad block list
- `-C fd` - Write completion information to specified file descriptor
- `-l filename` - Add bad blocks listed in specified file
- `-L filename` - Set bad block list from specified file

### Superblock and Recovery
- `-b superblock` - Use alternative superblock
- `-B blocksize` - Force block size
- `-j external-journal` - Use external journal
- `-E extended_options` - Specify extended options

### Output and Behavior
- `-V` - Print version information and exit
- `-d` - Debug mode (print debugging output)
- `-q` - Quiet mode (minimal output)
- `-r` - Interactive mode (default)

## Usage Examples

### Basic Filesystem Checking

#### Simple Check Operations
```bash
# Basic filesystem check (interactive)
sudo e2fsck /dev/sda1

# Force check even if filesystem appears clean
sudo e2fsck -f /dev/sda1

# Automatic repair (preen mode)
sudo e2fsck -p /dev/sda1

# Non-interactive automatic repair
sudo e2fsck -y /dev/sda1

# Read-only check (no changes)
sudo e2fsck -n /dev/sda1
```

#### Verbose and Quiet Operations
```bash
# Verbose check with detailed output
sudo e2fsck -v /dev/sda1

# Quiet mode with minimal output
sudo e2fsck -q /dev/sda1

# Check with progress reporting
sudo e2fsck -C 0 /dev/sda1

# Verbose force check
sudo e2fsck -fv /dev/sda1
```

### Bad Block Management

#### Bad Block Checking
```bash
# Check for bad blocks (read-only test)
sudo e2fsck -c /dev/sda1

# Check bad blocks and add to list
sudo e2fsck -cc /dev/sda1

# Add bad blocks from file
sudo e2fsck -l badblocks.txt /dev/sda1

# Set bad block list from file
sudo e2fsck -L badblocks.txt /dev/sda1

# Keep existing bad blocks
sudo e2fsck -k -c /dev/sda1
```

#### Bad Block Scenarios
```bash
# Bad block check with progress
sudo e2fsck -c -C 0 /dev/sda1

# Read-write bad block test (destructive)
sudo e2fsck -c -c -f /dev/sda1

# Combined bad block and filesystem check
sudo e2fsck -c -f -v /dev/sda1
```

### Superblock Recovery

#### Using Alternative Superblocks
```bash
# Check using backup superblock
sudo e2fsck -b 8193 /dev/sda1

# Check with specific block size
sudo e2fsck -B 4096 /dev/sda1

# Find and use backup superblock
sudo mke2fs -n /dev/sda1
sudo e2fsck -b 32768 /dev/sda1

# Check using multiple backup superblocks
for sb in 8193 16384 32768; do
    echo "Trying superblock $sb"
    sudo e2fsck -b $sb /dev/sda1
    break
done
```

#### External Journal Recovery
```bash
# Check using external journal
sudo e2fsck -j /dev/sdb1 /dev/sda1

# Specify external journal device
sudo e2fsck -j UUID=journal-uuid /dev/sda1
```

### Extended Options and Advanced Usage

#### Extended Options
```bash
# Check with specific extended options
sudo e2fsck -E journal_only /dev/sda1
sudo e2fsck -E bsize=4096 /dev/sda1

# Check with hash algorithm
sudo e2fsck -E hash_desc=tea /dev/sda1

# Force check with extended features
sudo e2fsck -E extent /dev/sda1
sudo e2fsck -E unshare_blocks /dev/sda1
```

#### Debug and Testing
```bash
# Debug mode with extensive output
sudo e2fsck -d /dev/sda1

# Test filesystem (no modifications)
sudo e2fsck -n -f /dev/sda1

# Check with timing information
time sudo e2fsck -f /dev/sda1
```

## Practical Examples

### System Administration

#### Emergency Recovery
```bash
# Emergency filesystem repair after crash
sudo e2fsck -y -f /dev/sda1

# Check all filesystems listed in fstab
for mount in $(grep -E '^/dev/' /etc/fstab | awk '{print $1}'); do
    echo "Checking $mount"
    sudo e2fsck -n -f "$mount" || sudo e2fsck -y -f "$mount"
done

# Check root filesystem (in rescue mode)
e2fsck -y -f /dev/mapper/vg_root-lv_root

# Automated recovery script
#!/bin/bash
DEVICE=$1
if [ -z "$DEVICE" ]; then
    echo "Usage: $0 <device>"
    exit 1
fi

echo "Performing emergency check on $DEVICE"
sudo e2fsck -y -f -v "$DEVICE" | tee "/tmp/e2fsck_$(basename $DEVICE).log"
```

#### Maintenance Operations
```bash
# Scheduled filesystem check
sudo e2fsck -f -p /dev/sda1

# Check filesystem after power failure
sudo e2fsck -y -f -c /dev/sda1

# Periodic maintenance check
for device in /dev/sd[a-z][1-9]; do
    if [ -b "$device" ]; then
        echo "Checking $device"
        sudo e2fsck -n -f "$device"
    fi
done
```

### Backup and Recovery

#### Pre-backup Verification
```bash
# Verify filesystem before backup
sudo e2fsck -n -f /dev/sda1 && echo "Filesystem OK for backup"

# Check and log results
sudo e2fsck -f -v /dev/sda1 > /var/log/fsck_$(date +%Y%m%d).log 2>&1

# Verify multiple filesystems
#!/bin/bash
LOG="/var/log/filesystem_check_$(date +%Y%m%d).log"
echo "Filesystem Check Report - $(date)" > "$LOG"
echo "================================" >> "$LOG"

for fs in /dev/sda1 /dev/sdb1 /dev/sdc1; do
    echo "Checking $fs" >> "$LOG"
    if sudo e2fsck -n -f "$fs" >> "$LOG" 2>&1; then
        echo "$fs: OK" >> "$LOG"
    else
        echo "$fs: ISSUES FOUND" >> "$LOG"
    fi
done
```

#### Recovery Operations
```bash
# Recover from corrupted superblock
sudo e2fsck -b 8193 -y /dev/sda1

# Recover with journal replay
sudo e2fsck -j /dev/sdb1 -y /dev/sda1

# Force recovery mode
sudo e2fsck -f -y -b 32768 /dev/sda1
```

### Performance and Large Filesystems

#### Optimized Checking
```bash
# Parallel filesystem checking (multiple devices)
sudo e2fsck -p /dev/sda1 &
sudo e2fsck -p /dev/sdb1 &
sudo e2fsck -p /dev/sdc1 &
wait

# Check large filesystem with progress
sudo e2fsck -C 0 -f -v /dev/mapper/vg_data-lv_data

# Optimized check for SSD
sudo e2fsck -f -p /dev/sda1

# Memory-efficient check for large filesystems
sudo e2fsck -f -E bsize=1024 /dev/sda1
```

#### Batch Processing
```bash
# Check all non-root filesystems
mount | grep '^/dev/' | grep -v 'on / ' | while read device on mount rest; do
    echo "Checking $device ($mount)"
    sudo e2fsck -n -f "$device"
done

# Automated maintenance script
#!/bin/bash
DEVICES="/dev/sda1 /dev/sdb1 /dev/sdc1"
DATE=$(date +%Y%m%d_%H%M%S)
LOGDIR="/var/log/e2fsck"
mkdir -p "$LOGDIR"

for device in $DEVICES; do
    if [ -b "$device" ]; then
        LOGFILE="$LOGDIR/e2fsck_$(basename $device)_$DATE.log"
        echo "Checking $device - logging to $LOGFILE"
        sudo e2fsck -f -v "$device" > "$LOGFILE" 2>&1 &
    fi
done

wait
echo "All filesystem checks completed"
```

## Advanced Usage

### Extended Configuration

#### Extended Options
```bash
# Force specific features
sudo e2fsck -E test_fs /dev/sda1
sudo e2fsck -E discard /dev/sda1

# Check with specific encoding
sudo e2fsck -E encoding=utf8 /dev/sda1

# Check filesystem with lazy initialization
sudo e2fsck -E lazy_itable_init=1 /dev/sda1
```

#### Journal Handling
```bash
# Check journal-only
sudo e2fsck -E journal_only /dev/sda1

# Replay journal and exit
sudo e2fsck -E replay_journal_only /dev/sda1

# Check with external journal recovery
sudo e2fsck -j /dev/sdb1 -E journal_only /dev/sda1
```

### Special Scenarios

#### Corrupted Filesystem Recovery
```bash
# Aggressive recovery mode
sudo e2fsck -y -f -c /dev/sda1

# Check using multiple superblocks
for sb in 8193 16384 32768 65536; do
    echo "Attempting recovery with superblock $sb"
    if sudo e2fsck -b $sb -y /dev/sda1; then
        echo "Recovery successful with superblock $sb"
        break
    fi
done

# Recovery with specific block size
sudo e2fsck -B 2048 -b 8193 -y /dev/sda1
```

#### Logical Volume Management
```bash
# Check LVM logical volume
sudo e2fsck -f /dev/mapper/vg00-lv_root

# Check encrypted filesystem
sudo cryptsetup luksOpen /dev/sda1 crypt_fs
sudo e2fsck -f /dev/mapper/crypt_fs

# Check RAID array filesystem
sudo e2fsck -f /dev/md0
```

### Integration and Automation

#### System Integration
```bash
# Integration with systemd
sudo systemctl emergency
e2fsck -y -f /dev/sda1
systemctl reboot

# Pre-mount filesystem check
#!/bin/bash
# /etc/rc.d/rc.local or equivalent
for device in $(blkid | grep ext[234] | cut -d: -f1); do
    if [ -b "$device" ]; then
        sudo e2fsck -n -f "$device" || {
            echo "Filesystem check failed for $device"
            sudo e2fsck -y -f "$device"
        }
    fi
done
```

#### Monitoring Integration
```bash
# Filesystem health monitoring
#!/bin/bash
DEVICE=$1
CRITICAL_LOG="/var/log/critical_fs_errors.log"

check_filesystem() {
    local device=$1
    local result=$(sudo e2fsck -n -f "$device" 2>&1)

    if echo "$result" | grep -q "ERROR"; then
        echo "$(date): Critical filesystem error on $device" >> "$CRITICAL_LOG"
        echo "$result" >> "$CRITICAL_LOG"
        return 1
    fi

    if echo "$result" | grep -q "WARNING"; then
        echo "$(date): Filesystem warning on $device" >> "$CRITICAL_LOG"
        return 2
    fi

    return 0
}

# Automated check with alerts
for device in /dev/sd[a-z][1-9]; do
    if [ -b "$device" ]; then
        check_filesystem "$device"
        case $? in
            1) echo "ALERT: Critical error on $device" | mail -s "FS Error" admin@domain.com ;;
            2) echo "WARNING: Filesystem warning on $device" | mail -s "FS Warning" admin@domain.com ;;
        esac
    fi
done
```

## Troubleshooting

### Common Issues

#### Superblock Corruption
```bash
# Symptoms: "Invalid argument" or "Can't read superblock"
# Solution: Use backup superblock

# Find backup superblocks
sudo mke2fs -n /dev/sda1 | grep "Backup superblock"

# Try each backup superblock
for sb in 8193 16384 32768; do
    if sudo e2fsck -b $sb -y /dev/sda1; then
        echo "Success with superblock $sb"
        break
    fi
done
```

#### Journal Corruption
```bash
# Symptoms: Journal-related errors
# Solution: Clear or recover journal

# Clear journal (last resort)
sudo e2fsck -E journal_only /dev/sda1
sudo e2fsck -y -f /dev/sda1

# Use external journal recovery
sudo e2fsck -j /dev/sdb1 -y /dev/sda1
```

#### Resource Issues
```bash
# Out of memory during check
# Solution: Reduce block size or use less memory-intensive options

sudo e2fsck -B 1024 -f /dev/sda1
sudo e2fsck -E lazy_itable_init=0 /dev/sda1

# Check with reduced memory usage
sudo e2fsck -f -p /dev/sda1
```

#### Permission and Access Issues
```bash
# Permission denied
# Solution: Run as root with proper environment

sudo e2fsck -y -f /dev/sda1

# Device busy error
# Solution: Unmount filesystem first

sudo umount /dev/sda1
sudo e2fsck -y -f /dev/sda1

# Check filesystem in rescue mode
# Solution: Use emergency shell or live CD

e2fsck -y -f /dev/sda1
```

### Performance Issues

#### Slow Checking
```bash
# Large filesystems take too long
# Solution: Use optimized options

# Parallel processing
sudo e2fsck -p -C 0 /dev/sda1

# Skip unnecessary checks
sudo e2fsck -f -E no_journal_check /dev/sda1

# Use specific block size for SSDs
sudo e2fsck -B 4096 -f /dev/sda1
```

#### System Resource Usage
```bash
# High CPU usage
# Solution: Use nice or ionice

sudo nice -n 19 e2fsck -f /dev/sda1
sudo ionice -c 3 e2fsck -f /dev/sda1

# Combined resource management
sudo nice -n 19 ionice -c 3 e2fsck -f -p /dev/sda1
```

## Related Commands

- [`fsck`](/docs/commands/compression/fsck) - Generic filesystem checker
- [`mke2fs`](/docs/commands/compression/mke2fs) - Create ext2/ext3/ext4 filesystem
- [`tune2fs`](/docs/commands/compression/tune2fs) - Adjust filesystem parameters
- [`resize2fs`](/docs/commands/compression/resize2fs) - Resize filesystem
- [`dumpe2fs`](/docs/commands/compression/dumpe2fs) - Display filesystem information
- [`debugfs`](/docs/commands/compression/debugfs) - Filesystem debugger
- [`badblocks`](/docs/commands/compression/badblocks) - Search for bad blocks
- [`e2label`](/docs/commands/compression/e2label) - Change filesystem label
- [`e2image`](/docs/commands/compression/e2image) - Save critical filesystem data
- [`logsave`](/docs/commands/compression/logsave) - Save command output to log file

## Best Practices

1. **Always unmount** filesystems before running e2fsck when possible
2. **Use read-only mode** (-n) first to assess filesystem condition
3. **Backup important data** before performing any filesystem repairs
4. **Use preen mode** (-p) for routine maintenance and automatic repairs
5. **Check bad blocks** periodically on aging storage devices
6. **Keep backup superblock locations** documented for critical systems
7. **Use verbose mode** (-v) for debugging complex issues
8. **Monitor system resources** during large filesystem checks
9. **Test on non-critical systems** before using new options or parameters
10. **Document all filesystem repairs** for audit and troubleshooting purposes

## Performance Tips

1. **Parallel checking** can significantly reduce total check time for multiple devices
2. **Appropriate block size** matching filesystem geometry improves performance
3. **SSD optimization** includes using -E discard and avoiding unnecessary bad block checks
4. **Memory management** with -B option for very large filesystems
5. **Progress monitoring** with -C option for long-running operations
6. **Resource scheduling** using nice and ionice for production systems
7. **Batch processing** during maintenance windows for multiple filesystems
8. **Regular maintenance** prevents extensive corruption requiring long repairs

The `e2fsck` command is an essential tool for maintaining Linux ext2/3/4 filesystems, providing comprehensive checking and repair capabilities crucial for system reliability and data integrity. Its flexible operation modes, extensive options, and powerful recovery features make it indispensable for system administrators managing Linux systems.