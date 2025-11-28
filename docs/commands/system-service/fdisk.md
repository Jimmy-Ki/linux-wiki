---
title: fdisk - Disk partitioning utility
sidebar_label: fdisk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fdisk - Disk partitioning utility

The `fdisk` command is a powerful disk partitioning utility that allows users to create, delete, resize, and manage disk partitions on Linux systems. It provides a text-based interactive interface for manipulating partition tables, supporting both MBR (Master Boot Record) and GPT (GUID Partition Table) schemes. fdisk is an essential tool for system administrators, offering precise control over disk layout for installation, dual-boot setups, and storage management. While newer tools like `parted` and `gdisk` offer more advanced features, fdisk remains widely used for its simplicity, reliability, and compatibility with legacy systems.

## Basic Syntax

```bash
fdisk [OPTIONS] [DEVICE]
```

## Common Options

### Display Options
- `-l, --list` - List partition tables for all devices or specified device
- `-L, --color[=when]` - Colorize output (auto, always, never)
- `-b, --sector-size=<size>` - Display sector size in bytes
- `-u, --units[=<unit>]` - Display units (cylinders, sectors, or bytes)

### Modification Options
- `-C, --cylinders \\ <number\\>` - Specify number of cylinders
- `-H, --heads \\ <number\\>` - Specify number of heads
- `-S, --sectors \\ <number\\>` - Specify number of sectors per track

### Output Options
- `-V, --version` - Display version information
- `-h, --help` - Show help message
- `-v, --verbose` - Verbose output

## Interactive fdisk Commands

Once in fdisk's interactive mode, these commands are available:

### Partition Management
- `n` - Create new partition
- `d` - Delete partition
- `p` - Print partition table
- `l` - List known partition types
- `t` - Change partition type
- `u` - Change display/entry units
- `a` - Toggle bootable flag
- `b` - Edit embedded BSD disklabel
- `c` - Toggle DOS compatibility flag
- `g` - Create new empty GPT partition table
- `G` - Create new empty SGI (IRIX) partition table
- `o` - Create new empty DOS partition table
- `s` - Create new empty Sun partition table

### Navigation and Actions
- `m` - Print help menu
- `q` - Quit without saving changes
- `w` - Write table to disk and exit
- `x` - Extra functionality (experts only)

### Expert Commands (x mode)
- `b` - Move beginning of data in partition
- `c` - Change number of cylinders
- `d` - Print raw data in partition table
- `e` - List extended partitions
- `f` - Fix partition order
- `h` - Change number of heads
- `i` - Change partition information
- `p` - Print partition table
- `q` - Quit without saving
- `r` - Return to main menu
- `s` - Change number of sectors/track
- `v` - Verify partition table
- `w` - Write table to disk and exit

## Usage Examples

### Basic Disk Information

#### Viewing Partition Tables
```bash
# List all partition tables
fdisk -l

# List partitions for specific device
fdisk -l /dev/sda

# Show partitions with human-readable sizes
fdisk -l -u=sectors /dev/sdb

# Colorized output
fdisk -l --color=always
```

#### Display Device Information
```bash
# Show detailed sector information
fdisk -l /dev/sda | grep -E "(Sector|Disk)"

# Check partition table type
fdisk -l /dev/sda | grep "Disklabel type"

# View disk geometry
fdisk -C 1024 -H 64 -S 32 /dev/hda
```

### Interactive Partition Management

#### Creating New Partitions
```bash
# Enter interactive mode
fdisk /dev/sdb

# Inside fdisk interactive mode:
# n - Create new partition
# p - Primary partition
# 1 - Partition number
# Default - First sector
# +10G - Last sector (10GB partition)
# w - Write changes and exit

# Quick example in script
echo -e "n\np\n1\n\n+10G\nw" | fdisk /dev/sdb
```

#### Setting Up Boot Partition
```bash
fdisk /dev/sda

# In interactive mode:
# d - Delete existing partitions (if needed)
# n - Create new partition
# p - Primary
# 1 - Partition number
# +500M - Size for boot partition
# a - Toggle bootable flag
# n - Create root partition
# p - Primary
# 2 - Partition number
# Default - Use remaining space
# w - Write changes
```

### Partition Type Management

#### Common Partition Types
```bash
# Enter fdisk and change partition type
fdisk /dev/sdb

# Interactive sequence:
# t - Change partition type
# 1 - Select partition 1
# L - List partition types
# 83 - Linux (default)
# 82 - Linux swap
# 8e - Linux LVM
# 7 - HPFS/NTFS/exFAT
# b - W95 FAT32
# c - W95 FAT32 (LBA)
```

#### Setting Up LVM
```bash
fdisk /dev/sdc

# Create LVM partition:
# n - New partition
# p - Primary
# 1 - Partition number
# +20G - Size
# t - Change type
# 8e - Linux LVM
# w - Write changes
```

### Advanced Partition Schemes

#### Dual Boot Setup
```bash
# For Windows + Linux dual boot
fdisk /dev/sda

# Create partitions:
# 1: Windows (NTFS) - 100GB
# 2: Linux swap - 4GB
# 3: Linux root - Remaining space

# Interactive commands:
# o - Create DOS table
# n - New partition (Windows)
# p - Primary, 1, +100G
# t - Type 7 (NTFS)
# a - Make bootable
# n - New partition (swap)
# p - Primary, 2, +4G
# t - Type 82 (swap)
# n - New partition (Linux)
# p - Primary, 3 (default for all space)
# w - Write changes
```

#### GPT Partition Table
```bash
# Create GPT partition table
fdisk /dev/sdb

# Interactive sequence:
# g - Create new GPT table
# n - New EFI partition
# 1 - Partition 1
# +512M - Size
# t - Change type
# 1 - EFI System
# n - New data partition
# 2 - Partition 2
# +50G - Size
# w - Write changes
```

## Practical Examples

### System Administration

#### Server Disk Setup
```bash
# Check available disks
lsblk
fdisk -l

# Create partitions for web server
fdisk /dev/sdb <<EOF
n
p
1
+100G
n
p
2
+2G
t
2
82
n
p
3


w
EOF

# Format partitions
mkfs.ext4 /dev/sdb1
mkswap /dev/sdb2
swapon /dev/sdb2
```

#### Automated Partition Creation
```bash
#!/bin/bash
# Script to create standard partition layout

DEVICE="/dev/sdb"
BOOT_SIZE="1G"
SWAP_SIZE="4G"

# Create partition layout
fdisk $DEVICE <<EOF
o
n
p
1
+$BOOT_SIZE
a
n
p
2
+$SWAP_SIZE
t
2
82
n
p
3


w
EOF

# Format partitions
mkfs.ext4 ${DEVICE}1
mkswap ${DEVICE}2
mkfs.ext4 ${DEVICE}3

echo "Partition creation completed for $DEVICE"
```

#### LVM Setup
```bash
# Create LVM physical volume
fdisk /dev/sdc <<EOF
n
p
1


t
8e
w
EOF

# Initialize as LVM
pvcreate /dev/sdc1
vgcreate vg_data /dev/sdc1
lvcreate -l 100%FREE -n lv_data vg_data
mkfs.ext4 /dev/vg_data/lv_data
```

### Backup and Recovery

#### Partition Backup
```bash
# Backup partition table
sfdisk -d /dev/sda > partition_table_backup.txt

# Restore partition table
sfdisk /dev/sda < partition_table_backup.txt

# Backup MBR
dd if=/dev/sda of=mbr_backup.img bs=512 count=1

# Restore MBR
dd if=mbr_backup.img of=/dev/sda bs=512 count=1
```

#### Partition Resizing Workflow
```bash
# Safety backup first
fdisk -l > /root/partition_info.txt

# Resize partition (requires unmounting)
umount /dev/sdb1
fdisk /dev/sdb

# Interactive:
# d - Delete partition
# n - Create new partition with larger size
# w - Write changes

# Resize filesystem
resize2fs /dev/sdb1
```

### Virtualization and Containers

#### Virtual Disk Preparation
```bash
# Create partitions for VM
fdisk /dev/loop0 <<EOF
o
n
p
1


w
EOF

# Format and mount
mkfs.ext4 /dev/loop0p1
mount /dev/loop0p1 /mnt/vm_root
```

#### Docker Storage Setup
```bash
# Add storage for Docker
fdisk /dev/sdd <<EOF
n
p
1


t
83
w
EOF

# Create filesystem for Docker
mkfs.ext4 /dev/sdd1
mount /dev/sdd1 /var/lib/docker
```

## Advanced Usage

### Scripted Partition Management

#### Automated Setup Script
```bash
#!/bin/bash
# Comprehensive disk setup script

setup_disk() {
    local device=$1
    local boot_size=${2:-"1G"}
    local swap_size=${3:-"4G"}

    echo "Setting up $device..."

    # Create partition table
    fdisk $device <<EOF
o
n
p
1
+$boot_size
a
n
p
2
+$swap_size
t
2
82
n
p
3


w
EOF

    # Wait for partition table to update
    sleep 2
    partprobe $device

    # Format partitions
    mkfs.ext4 ${device}1
    mkswap ${device}2
    mkfs.ext4 ${device}3

    echo "Disk setup completed for $device"
}

# Usage
setup_disk "/dev/sdb" "2G" "8G"
```

#### Partition Validation Script
```bash
#!/bin/bash
# Validate partition configuration

validate_partitions() {
    local device=$1

    echo "Validating $device..."

    # Check partition table
    if ! fdisk -l $device >/dev/null 2>&1; then
        echo "ERROR: Cannot read partition table on $device"
        return 1
    fi

    # Check for bootable partition
    if ! fdisk -l $device | grep -q "Boot"; then
        echo "WARNING: No bootable partition found"
    fi

    # Check partition alignment
    fdisk -l -u=sectors $device | while read line; do
        if [[ $line =~ ^/dev/.* ]]; then
            start_sector=$(echo $line | awk '{print $2}')
            if [ $((start_sector % 2048)) -ne 0 ]; then
                echo "WARNING: Misaligned partition detected"
            fi
        fi
    done

    echo "Validation completed"
}
```

### Performance Optimization

#### SSD Optimization
```bash
# SSD-aware partitioning
fdisk /dev/nvme0n1 <<EOF
g
n
1
+512M
n
2
+100G
n
3


w
EOF

# Optimize filesystem for SSD
mkfs.ext4 -F -E discard,lazy_itable_init=0,lazy_journal_init=0 /dev/nvme0n1p1
```

#### Alignment Optimization
```bash
# Create properly aligned partitions
fdisk -H 224 -S 56 /dev/sdb <<EOF
n
p
1
2048
+100G
n
p
2


w
EOF
```

## Troubleshooting

### Common Issues

#### Partition Table Corruption
```bash
# Check partition table integrity
fdisk -l /dev/sda
fdisk -v /dev/sda

# Rebuild corrupted partition table
fdisk /dev/sda <<EOF
o
n
p
1


w
EOF

# Use testdisk for recovery
testdisk /dev/sda
```

#### Boot Issues
```bash
# Set bootable flag
fdisk /dev/sda

# Interactive:
# a - Toggle bootable flag on partition 1
# w - Write changes

# Check MBR
dd if=/dev/sda bs=512 count=1 | hexdump -C
```

#### Permission Issues
```bash
# Run with proper permissions
sudo fdisk /dev/sda

# Check device permissions
ls -l /dev/sda*

# Fix permissions if needed
sudo chmod 660 /dev/sda
```

#### Size Mismatch
```bash
# Re-read partition table
partprobe /dev/sda
blockdev --rereadpt /dev/sda

# Check kernel partition info
cat /proc/partitions
```

## Related Commands

- [`parted`](/docs/commands/system-service/parted) - Advanced partition manipulation tool
- [`gdisk`](/docs/commands/system-service/gdisk) - GPT partition table editor
- [`cfdisk`](/docs/commands/system-service/cfdisk) - curses-based partition editor
- [`sfdisk`](/docs/commands/system-service/sfdisk) - Scriptable partition table manipulator
- [`lsblk`](/docs/commands/system-info/lsblk) - List block devices
- [`blkid`](/docs/commands/system-service/blkid) - Locate/print block device attributes
- [`partprobe`](/docs/commands/system-service/partprobe) - Inform kernel of partition changes
- [`mkfs`](/docs/commands/system-service/mkfs) - Create filesystem
- [`resize2fs`](/docs/commands/system-service/resize2fs) - Resize ext2/ext3/ext4 filesystem
- [`fsck`](/docs/commands/system-service/fsck) - Check and repair filesystem

## Best Practices

1. **Always backup** partition tables before making changes
2. **Use modern GPT** instead of MBR for disks larger than 2TB
3. **Align partitions** to proper boundaries for performance
4. **Verify changes** before writing with `w` command
5. **Use appropriate tools** - fdisk for basic, parted for advanced
6. **Test on non-production** systems first
7. **Document partition layouts** for recovery purposes
8. **Consider SSD requirements** for alignment and wear leveling
9. **Create separate partitions** for /boot, swap, and root when possible
10. **Use UUIDs** in `/etc/fstab` instead of device names

## Performance Tips

1. **4K alignment** improves SSD performance
2. **Separate partitions** for different workloads
3. **Use LVM** for flexible storage management
4. **Consider partition scheme** based on workload
5. **RAID considerations** when planning partitions
6. **Swap partition** should be 1-2x RAM size
7. **Keep partitions separate** from system data
8. **Use ext4** for Linux partitions unless specific requirements
9. **Avoid over-partitioning** - keep layout simple
10. **Regular maintenance** with fsck and defragmentation

The `fdisk` command remains a fundamental tool for Linux system administrators, providing reliable and straightforward disk partitioning capabilities. While newer tools offer enhanced features, fdisk's simplicity and proven stability make it an excellent choice for basic partition management tasks and educational purposes. Understanding fdisk operations is essential for anyone working with Linux storage systems.