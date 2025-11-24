---
title: df - Display Free Disk Space
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# df - Display Free Disk Space

The `df` (disk free) command displays the amount of available and used disk space on file systems. It shows information about total disk space, used space, free space, and usage percentage for mounted file systems.

## Basic Syntax

```bash
df [OPTIONS] [FILE]...
```

## Common Options

### Output Format
- `-h, --human-readable` - Print sizes in human readable format (K, M, G)
- `-H, --si` - Use powers of 1000 instead of 1024
- `-k` - Display sizes in kilobytes (default)
- `-m` - Display sizes in megabytes
- `--block-size=SIZE` - Use SIZE-byte blocks

### Display Options
- `-a, --all` - Include dummy file systems
- `-l, --local` - Limit listing to local file systems
- `-x, --exclude-type=TYPE` - Exclude file system type
- `-t, --type=TYPE` - Limit listing to file system type
- `--output[=FIELD_LIST]` - Use custom output format

### File System Information
- `-i, --inodes` - List inode information instead of block usage
- `-T, --print-type` - Print file system type
- `--total` - Elide all entries insignificant to available space, and produce a grand total

### Portability and Compatibility
- `-P, --portability` - Use POSIX output format
- `--sync` - Invoke sync before getting usage info (deprecated)
- `--no-sync` - Do not invoke sync (default)

## Usage Examples

### Basic Usage
```bash
# Display disk usage for all mounted file systems
df

# Display in human readable format
df -h

# Display specific file system
df /home

# Display multiple specific paths
df /home /var /tmp
```

### File System Type Filtering
```bash
# Show only ext4 file systems
df -t ext4

# Show only network file systems
df -t nfs -t cifs

# Exclude certain types
df -x tmpfs -x devtmpfs

# Show file system types
df -T
```

### Specialized Output
```bash
# Show inode usage instead of disk space
df -i

# Include dummy file systems
df -a

# Show only local file systems
df -l

# Generate total
df --total
```

### Size Formats
```bash
# Show in megabytes
df -m

# Use SI units (1000 instead of 1024)
df -H

# Custom block size
df --block-size=1M
```

## Output Format

### Standard Output
```
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       10485760 5242880   5242880  50% /
/dev/sda2        2097152 1048576   1048576  50% /home
tmpfs             524288       0    524288   0% /dev/shm
```

### Human-Readable Output
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       10G  5.0G  5.0G  50% /
/dev/sda2       2.0G  1.0G  1.0G  50% /home
tmpfs           512M     0  512M   0% /dev/shm
```

### With File System Types
```
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda1      ext4   10G  5.0G  5.0G  50% /
/dev/sda2      ext4   2.0G  1.0G  1.0G  50% /home
tmpfs          tmpfs  512M     0  512M   0% /dev/shm
```

### Inode Usage
```
Filesystem      Inodes   IUsed    IFree IUse% Mounted on
/dev/sda1         655K     12K     643K    2% /
/dev/sda2         131K      1K     130K    1% /home
tmpfs             128K       1     128K    1% /dev/shm
```

## Practical Examples

### System Monitoring
```bash
# Check all file systems with human readable output
df -h

# Monitor specific mount points
df -h /var /tmp /home

# Check for file systems with high usage
df -h | awk '$5+0 > 80 {print $1 " is " $5 " full on " $6}'
```

### Disk Space Analysis
```bash
# Show total disk space available
df --total -h

# Check only local file systems
df -hl

# Monitor specific file system types
df -ht ext4
```

### Remote and Network Storage
```bash
# Show all file systems including network mounts
df -h

# Show only network file systems
df -ht nfs,cifs,smbfs

# Check specific network mount
df -h /mnt/nas
```

## Advanced Usage

### Custom Output Format
```bash
# Custom fields
df --output=source,size,used,avail,pcent,target

# Specific format
df --output=source,target,pcent

# Include file system type
df --output=source,fstype,target,pcent
```

### Filtering and Scripting
```bash
# Find file systems over 80% full
df -h | awk '$5+0 > 80 {print $0}'

# Get total free space
df --total | tail -1 | awk '{print $4}'

# Monitor specific directories
df -h /home /var /usr | tail -n +2
```

### Integration with Monitoring
```bash
# Disk space alert script
#!/bin/bash
THRESHOLD=80
df -h | awk '$5+0 > THRESHOLD {print $1 " on " $6 " is " $5 " full"}' THRESHOLD=$THRESHOLD

# Check for specific mount points
if [ $(df /var | tail -1 | awk '{print $5}' | tr -d '%') -gt 90 ]; then
    echo "/var is over 90% full"
fi
```

## File System Types

### Common Linux File Systems
- **ext4** - Extended file system 4 (most common)
- **ext3** - Extended file system 3
- **xfs** - High-performance file system
- **btrfs** - Copy-on-write file system
- **zfs** - Advanced file system with volume management

### Network File Systems
- **nfs** - Network File System
- **cifs/smbfs** - Windows/Samba file sharing
- **sshfs** - SSH file system
- **glusterfs** - Distributed file system

### Special File Systems
- **tmpfs** - Temporary file system (RAM)
- **devtmpfs** - Device file system
- **proc** - Process information
- **sysfs** - System information
- **debugfs** - Kernel debugging

## Monitoring and Automation

### Regular Monitoring
```bash
# Daily disk space check
df -h | mail -s "Daily disk usage report" admin@example.com

# Check for critical usage
df -h | awk '$5+0 > 95 {print "CRITICAL: " $1 " on " $6 " is " $5 " full"}'
```

### Alerting Scripts
```bash
#!/bin/bash
# disk_check.sh - Monitor disk usage

CRITICAL=95
WARNING=80

df -h | grep -vE '^Filesystem|tmpfs|cdrom' | while read line; do
    usage=$(echo $line | awk '{print $5}' | sed 's/%//')
    partition=$(echo $line | awk '{print $1}')
    mountpoint=$(echo $line | awk '{print $6}')

    if [ $usage -ge $CRITICAL ]; then
        echo "CRITICAL: $partition on $mountpoint is ${usage}% full"
    elif [ $usage -ge $WARNING ]; then
        echo "WARNING: $partition on $mountpoint is ${usage}% full"
    fi
done
```

### Logging and Historical Data
```bash
# Log disk usage daily
date >> /var/log/disk_usage.log
df -h >> /var/log/disk_usage.log

# Monitor changes
df -h > /tmp/df_now.txt
diff /tmp/df_previous.txt /tmp/df_now.txt
mv /tmp/df_now.txt /tmp/df_previous.txt
```

## Troubleshooting

### Common Issues
```bash
# df shows wrong disk space - check for deleted files held by processes
lsof +L1

# Check for file system corruption
sudo fsck -n /dev/sda1

# Remount file system to refresh usage
sudo mount -o remount /dev/sda1
```

### Performance Issues
```bash
# Use -l for local file systems only (faster on systems with many network mounts)
df -hl

# Check specific file system instead of all
df -h /home

# Use --sync if you need accurate current usage
df --sync -h
```

## Related Commands

- [`du`](/docs/commands/file-management/du) - Disk usage of files and directories
- [`lsblk`](/docs/commands/device-management/lsblk) - List block devices
- [`fdisk`](/docs/commands/device-management/fdisk) - Partition table manipulator
- [`mount`](/docs/commands/system-management/mount) - Mount file systems
- [`umount`](/docs/commands/system-management/umount) - Unmount file systems

## Best Practices

1. **Use `-h` for human-readable output** for easier interpretation

2. **Monitor critical file systems** regularly:
   - `df -h /var /home /tmp`

3. **Set up alerts** for high usage thresholds:
   - Monitor for usage above 80-90%

4. **Use appropriate filtering** for your environment:
   - `-l` for local file systems only
   - `-t` and `-x` for specific file system types

5. **Check inode usage** if you're running out of space but df shows available space:
   - `df -i` can reveal inode exhaustion

6. **Understand the difference** between `df` and `du`:
   - `df` shows file system-level disk usage
   - `du` shows directory-level usage

7. **Be aware of reserved space** that df shows as unavailable:
   - Linux reserves 5% of file system space for root

The `df` command is essential for monitoring disk space and ensuring system health. Its various output formats and filtering options make it a versatile tool for both quick checks and comprehensive monitoring of file system usage across Linux systems.