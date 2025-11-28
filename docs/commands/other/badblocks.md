---
title: badblocks - Search for bad blocks on device
sidebar_label: badblocks
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# badblocks - Search for bad blocks on device

The `badblocks` command is a utility used to search for bad blocks (damaged sectors) on a storage device such as a hard disk, SSD, or USB drive. It performs various types of read/write tests to identify problematic sectors that may cause data corruption or system instability. The tool can be used for preventive maintenance, diagnostic purposes, and as part of disk formatting procedures. Badblocks is commonly used with filesystem tools like `e2fsck` and `mkfs` to handle discovered bad blocks.

## Basic Syntax

```bash
badblocks [options] device [block-count [start-block]]
```

## Common Options

### Test Mode Options
- `-c <blocks>` - Test this many blocks at a time (default: 64)
- `-d` - Use read-write non-destructive test
- `-f` - Force checking even if device is mounted
- `-i <file>` - Read list of known bad blocks from file
- `-n` - Use non-destructive read-write test
- `-o <file>` - Output list of bad blocks to file
- `-p <num>` - Pass num test passes
- `-s` - Show progress of scanning
- `-t <pattern>` - Test pattern (0, 0xaa, 0x55, 0xff, 0xfffe, 0x0)
- `-v` - Verbose mode
- `-w` - Use write-mode test (destructive)
- `-b <size>` - Set block size (default: 1024)
- `-e <max_err>` - Abort after finding max_err bad blocks
- `-X` - Exclusive access mode (O_EXCL)
- `-T <time>` - Set runtime (minutes)

### Input/Output Options
- `-o <file>` - Write bad block list to file
- `-i <file>` - Read initial bad block list from file
- `-s` - Show scanning progress

## Usage Examples

### Basic Block Scanning

#### Read-Only Testing
```bash
# Basic read-only scan (non-destructive)
badblocks -v /dev/sda

# Scan with progress indicator
badblocks -sv /dev/sdb1

# Scan specific range of blocks
badblocks -v /dev/sda 1000000 2000000

# Scan with custom block size
badblocks -b 4096 -v /dev/sda

# Output bad blocks to file
badblocks -o badblocks.txt -v /dev/sda

# Scan with limited time (30 minutes)
badblocks -T 30 -v /dev/sda
```

#### Non-Destructive Read-Write Testing
```bash
# Non-destructive read-write test (safer than -w)
badblocks -nsv /dev/sda

# Non-destructive test with custom pattern
badblocks -nsv -t 0xaa /dev/sda

# Multiple passes for thorough testing
badblocks -nsv -p 3 /dev/sda

# Non-destructive test with progress and output
badblocks -nsv -o badblocks_found.txt /dev/sda

# Test specific range non-destructively
badblocks -nsv /dev/sda 500000 1000000
```

#### Destructive Write Testing
```bash
# Destructive write test (erases data!)
badblocks -wsv /dev/sda

# Write test with specific pattern
badblocks -wsv -t 0x55 /dev/sda

# Multiple passes with different patterns
badblocks -wsv -p 2 -t 0xaa -t 0x55 /dev/sda

# Write test with progress and logging
badblocks -wsv -o /var/log/badblocks_test.log /dev/sda

# Destructive test on specific partition
badblocks -wsv /dev/sdb1
```

### Advanced Testing Patterns

#### Pattern Testing
```bash
# Test with all zeros pattern
badblocks -t 0 -sv /dev/sda

# Test with alternating bits pattern
badblocks -t 0xaa -sv /dev/sda

# Test with inverse alternating pattern
badblocks -t 0x55 -sv /dev/sda

# Test with all ones pattern
badblocks -t 0xff -sv /dev/sda

# Test with custom complex pattern
badblocks -t 0xfffe -sv /dev/sda

# Multiple pattern testing
badblocks -t 0 -t 0xff -sv /dev/sda
```

#### Block Size and Performance Options
```bash
# Use larger block size for faster testing
badblocks -b 8192 -sv /dev/sda

# Use smaller block size for more precise testing
badblocks -b 512 -sv /dev/sda

# Test with multiple blocks at once
badblocks -c 256 -sv /dev/sda

# Optimize for SSD (larger blocks, fewer passes)
badblocks -b 65536 -c 1024 -nsv /dev/sda
```

## Practical Examples

### System Administration

#### Disk Health Monitoring
```bash
# Quick health check (read-only)
badblocks -sv /dev/sda

# Comprehensive non-destructive test
badblocks -nsv -p 2 /dev/sda

# Pre-deployment disk testing
badblocks -wsv /dev/sdb

# Monitor disk degradation over time
badblocks -o monthly_badblocks_$(date +%Y%m).txt -sv /dev/sda
```

#### New Disk Preparation
```bash
# Test new disk before use (destructive)
badblocks -wsv /dev/sdb

# Create bad block list for filesystem
badblocks -o /tmp/sdb_badblocks -sv /dev/sdb

# Test and format disk (two-step process)
badblocks -wsv /dev/sdb && mkfs.ext4 -l /tmp/sdb_badblocks /dev/sdb

# SSD testing (non-destructive recommended)
badblocks -nsv -p 1 /dev/nvme0n1
```

#### Troubleshooting Suspected Disk Issues
```bash
# Quick diagnostic scan
badblocks -sv /dev/sda

# Targeted scan of problematic area
badblocks -sv /dev/sda 1000000 1100000

# Multiple pass thorough testing
badblocks -nsv -p 3 /dev/sda

# Scan with abort limit for quick diagnostics
badblocks -e 10 -sv /dev/sda
```

### Backup and Recovery Scenarios

#### Pre-Backup Disk Verification
```bash
# Verify disk health before backup
badblocks -nsv -o pre_backup_badblocks.txt /dev/sda1

# Quick scan before important backup
badblocks -sv /dev/backups

# Document existing bad blocks
badblocks -i known_badblocks.txt -o updated_badblocks.txt -sv /dev/sda
```

#### Data Recovery Context
```bash
# Locate bad blocks before recovery
badblocks -o recovery_badblocks.txt -sv /dev/sda

# Non-destructive test to avoid further damage
badblocks -nsv /dev/failing_disk

# Identify bad areas to skip during recovery
badblocks -sv /dev/sdb1 > bad_sectors.log
```

### Automation and Scripting

#### Automated Health Monitoring
```bash
#!/bin/bash
# Weekly disk health check script

DEVICES="/dev/sda /dev/sdb /dev/sdc"
LOG_DIR="/var/log/disk_health"
DATE=$(date +%Y%m%d)

mkdir -p "$LOG_DIR"

for device in $DEVICES; do
    if [ -b "$device" ]; then
        echo "Scanning $device..."
        badblocks -sv -o "$LOG_DIR/${device##*/}_$DATE.txt" "$device"

        # Check if bad blocks found
        if [ -s "$LOG_DIR/${device##*/}_$DATE.txt" ]; then
            echo "WARNING: Bad blocks found on $device" | \
                mail -s "Disk Alert: $device" admin@example.com
        fi
    fi
done
```

#### Disk Preparation Script
```bash
#!/bin/bash
# Prepare new disk with bad block testing

DEVICE="/dev/sdb"
TEMP_BADLIST="/tmp/badblocks_temp"

echo "Testing $DEVICE for bad blocks..."
badblocks -wsv -o "$TEMP_BADLIST" "$DEVICE"

if [ -s "$TEMP_BADLIST" ]; then
    echo "Bad blocks found. Proceeding with formatting..."
    mkfs.ext4 -l "$TEMP_BADLIST" "$DEVICE"
else
    echo "No bad blocks found. Formatting disk..."
    mkfs.ext4 "$DEVICE"
fi

rm -f "$TEMP_BADLIST"
echo "Disk preparation complete."
```

#### System Integration
```bash
#!/bin/bash
# Integrate with fsck for automatic bad block handling

DEVICE="/dev/sda1"
BADBLOCKS_FILE="/tmp/${DEVICE##*/}_badblocks"

# Find bad blocks
badblocks -nsv -o "$BADBLOCKS_FILE" "$DEVICE"

# Run fsck with bad block list
if [ -s "$BADBLOCKS_FILE" ]; then
    echo "Running filesystem check with bad block list..."
    e2fsck -l "$BADBLOCKS_FILE" -y "$DEVICE"
    rm "$BADBLOCKS_FILE"
else
    echo "No bad blocks found. Running standard fsck..."
    e2fsck -y "$DEVICE"
fi
```

## Advanced Usage

### Performance Optimization

#### Fast Testing Options
```bash
# Quick scan with large blocks
badblocks -b 65536 -c 1024 -sv /dev/sda

# Limited time scan for quick diagnostics
badblocks -T 10 -sv /dev/sda

# Single pass for faster testing
badblocks -nsv -p 1 /dev/sda

# Read-only for fastest scan
badblocks -sv /dev/sda
```

#### Thorough Testing
```bash
# Multiple passes with different patterns
badblocks -nsv -p 3 -t 0 -t 0xaa -t 0x55 /dev/sda

# Small block size for precision
badblocks -b 512 -sv /dev/sda

# Comprehensive range testing
badblocks -nsv -p 5 /dev/sda

# Full disk with detailed logging
badblocks -nsv -o comprehensive_test.log /dev/sda
```

### Special Device Types

#### SSD Testing
```bash
# Non-destructive test (recommended for SSDs)
badblocks -nsv -p 1 /dev/nvme0n1

# Large block size for SSD efficiency
badblocks -b 131072 -nsv /dev/sda

# Quick SSD health check
badblocks -sv /dev/nvme0n1p1
```

#### USB/External Drive Testing
```bash
# Test external drive
badblocks -nsv /dev/sdb1

# Quick external drive check
badblocks -sv /dev/sdc

# Test with larger blocks for USB
badblocks -b 4096 -nsv /dev/sdb
```

#### RAID Array Testing
```bash
# Test individual RAID members
badblocks -nsv /dev/md0

# Test underlying physical disks
badblocks -nsv /dev/sda /dev/sdb /dev/sdc /dev/sdd

# Quick RAID health check
badblocks -sv /dev/md0
```

## Output Analysis

### Understanding Bad Block Output
```bash
# Example badblocks output:
# 1234567
# 2345678
# 3456789

# This means blocks at these positions are bad
```

### Processing Bad Block Lists
```bash
# Count bad blocks
wc -l badblocks.txt

# Convert to human-readable ranges
awk 'NR>1{print $0-1"-"$0}' badblocks.txt

# Check if blocks are in critical areas
awk '$0 < 1000 {print "Critical bad block at: " $0}' badblocks.txt
```

### Integration with Filesystem Tools
```bash
# Use badblocks output with e2fsck
e2fsck -l badblocks.txt /dev/sda1

# Create filesystem with bad block list
mkfs.ext4 -l badblocks.txt /dev/sda1

# Check filesystem health
e2fsck -c -y /dev/sda1  # Uses badblocks internally
```

## Troubleshooting

### Common Issues

#### Permission Errors
```bash
# Run with sudo for disk access
sudo badblocks -sv /dev/sda

# Check disk permissions
ls -l /dev/sda

# Ensure user is in disk group
groups $USER
```

#### Mounted Disk Issues
```bash
# Force check on mounted disk (risky)
sudo badblocks -f -sv /dev/sda1

# Better approach: unmount first
sudo umount /dev/sda1
sudo badblocks -sv /dev/sda1
```

#### Performance Issues
```bash
# Use appropriate block size
sudo badblocks -b 4096 -sv /dev/sda

# Limit testing time
sudo badblocks -T 60 -sv /dev/sda

# Use read-only for speed
sudo badblocks -sv /dev/sda
```

#### Large Disk Testing
```bash
# Test in sections for large disks
sudo badblocks -sv /dev/sda 0 10000000
sudo badblocks -sv /dev/sda 10000001 20000000

# Use larger blocks for efficiency
sudo badblocks -b 8192 -sv /dev/sda

# Set reasonable abort limit
sudo badblocks -e 100 -sv /dev/sda
```

## Safety Considerations

### Data Protection
```bash
# Always use read-only first
badblocks -sv /dev/sda

# Use non-destructive before destructive
badblocks -nsv /dev/sda
badblocks -wsv /dev/sda  # Only if -n passes

# Backup before destructive testing
rsync -av /important/data/ /backup/location/
badblocks -wsv /dev/sda
```

### System Stability
```bash
# Test during low usage periods
badblocks -sv /dev/sda &  # Run in background

# Monitor system load
iostat -x 1
```

## Related Commands

- [`e2fsck`](/docs/commands/filesystem/e2fsck) - Check filesystem consistency
- [`mkfs`](/docs/commands/filesystem/mkfs) - Create filesystem
- [`fsck`](/docs/commands/filesystem/fsck) - Check and repair filesystem
- [`dd`](/docs/commands/system/dd) - Convert and copy files
- [`hdparm`](/docs/commands/hardware/hdparm) - Get/set SATA device parameters
- [`smartctl`](/docs/commands/hardware/smartctl) - Control SMART self-tests
- [`lsblk`](/docs/commands/system/lsblk) - List block devices
- [`fdisk`](/docs/commands/system/fdisk) - Partition table manipulator

## Best Practices

1. **Always start with read-only testing** before using write modes
2. **Backup important data** before running destructive tests
3. **Unmount filesystems** before testing for accurate results
4. **Use appropriate block sizes** based on device type
5. **Monitor system resources** during intensive testing
6. **Document bad blocks** for future reference
7. **Test during maintenance windows** to avoid system disruption
8. **Use non-destructive mode** for regular health checks
9. **Combine with SMART monitoring** for comprehensive disk health
10. **Consider device type** (HDD vs SSD) when choosing test mode

## Performance Tips

1. **Read-only tests** are fastest but less thorough
2. **Non-destructive mode** provides good balance of safety and thoroughness
3. **Larger block sizes** improve speed but reduce precision
4. **Multiple passes** increase reliability but take longer
5. **SSDs should use non-destructive testing** to minimize wear
6. **Time-limited scans** useful for quick diagnostics
7. **Background execution** for long-running tests
8. **Abort limits** prevent endless scanning on failing drives

The `badblocks` command is an essential tool for disk maintenance and troubleshooting, providing crucial information about storage device health and helping prevent data loss through early detection of failing sectors.