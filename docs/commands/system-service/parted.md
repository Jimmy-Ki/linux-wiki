---
title: parted - Partition Manipulation Tool
sidebar_label: parted
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# parted - Partition Manipulation Tool

The `parted` command is a powerful disk partitioning utility that allows creation, deletion, resizing, and management of disk partitions. Unlike traditional tools like `fdisk`, `parted` supports resizing partitions and handles modern large disks and various partition table formats including GPT.

## Basic Syntax

```bash
parted [options] [device [command [options...]]]
```

## Common Options

### General Options
- `-h, --help` - Display help message
- `-v, --version` - Display version information
- `-a, --align=<type>` - Partition alignment (none, cylinder, minimal, optimal)
- `-m, --machine` - Display machine-parseable output
- `-s, --script` - Never prompt for user intervention
- `-f, --fix` - Fix partition table automatically

### Commands
- `help` - Show available commands
- `print` - Display partition table
- `mklabel` - Create new disk label (partition table)
- `mkpart` - Create new partition
- `rm` - Delete partition
- `resizepart` - Resize partition
- `move` - Move partition
- `name` - Set partition name (GPT)
- `unit` - Set default unit
- `quit` - Exit program

## Usage Examples

### Interactive Mode
```bash
# Start parted interactively
sudo parted /dev/sdb

# Interactive session example:
GNU Parted 3.3
Using /dev/sdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) print
Model: ATA ST1000DM003 (scsi)
Disk /dev/sdb: 1000GB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  537MB   536MB   fat32              boot, esp
 2      537MB   1000GB  1000GB  ext4

(parted) quit
```

### Display Disk Information
```bash
# Print partition table in human-readable format
sudo parted /dev/sda print

# Print in machine-parseable format
sudo parted -m /dev/sda print

# List all available disks
sudo parted -l

# Print specific disk information
sudo parted /dev/sda unit GB print
```

### Create New Partition Table
```bash
# Create GPT partition table
sudo parted /dev/sdb mklabel gpt

# Create MBR (msdos) partition table
sudo parted /dev/sdb mklabel msdos

# Verify the label
sudo parted /dev/sdb print
```

### Create Partitions
```bash
# Create primary partition (interactive)
sudo parted /dev/sdb mkpart primary

# Create partition with specific start and end
sudo parted /dev/sdb mkpart primary 1GB 10GB

# Create partition with specific filesystem
sudo parted /dev/sdb mkpart primary ext4 10GB 20GB

# Create partition using percentage
sudo parted /dev/sdb mkpart primary ext4 20% 50%

# Create extended partition (MBR only)
sudo parted /dev/sdb mkpart extended 50GB 100GB
```

### Delete Partitions
```bash
# Delete partition by number
sudo parted /dev/sdb rm 1

# Delete multiple partitions
sudo parted /dev/sdb rm 2
sudo parted /dev/sdb rm 3

# Delete all partitions
sudo parted /dev/sdb rm 1
sudo parted /dev/sdb rm 2
# ... continue until all are removed
```

### Resize Partitions
```bash
# Resize partition to new size
sudo parted /dev/sdb resizepart 1 15GB

# Extend partition to use free space
sudo parted /dev/sdb resizepart 2 100%

# Shrink partition
sudo parted /dev/sdb resizepart 2 30GB
```

## Practical Examples

### Complete Disk Setup
```bash
#!/bin/bash
# Complete disk setup with parted

DISK="/dev/sdb"

echo "Setting up $DISK with GPT and partitions..."

# Create GPT partition table
sudo parted "$DISK" mklabel gpt

# Create BIOS boot partition (for GRUB)
sudo parted "$DISK" mkpart primary 1MB 2MB
sudo parted "$DISK" set 1 bios_grub on

# Create EFI system partition (for UEFI)
sudo parted "$DISK" mkpart primary fat32 2MB 512MB
sudo parted "$DISK" set 2 esp on

# Create root partition
sudo parted "$DISK" mkpart primary ext4 512MB 20GB

# Create data partition using remaining space
sudo parted "$DISK" mkpart primary 20GB 100%

# Print final layout
sudo parted "$DISK" print

echo "Partition setup complete. Format with:"
echo "  sudo mkfs.vfat -F32 ${DISK}2"
echo "  sudo mkfs.ext4 ${DISK}3"
echo "  sudo mkfs.ext4 ${DISK}4"
```

### Resize Existing Partition
```bash
#!/bin/bash
# Safely resize partition

DISK="/dev/sda"
PARTITION=1

echo "Resizing partition $PARTITION on $DISK"

# Check filesystem first
sudo fsck -n "${DISK}${PARTITION}"

# Display current partition info
echo "Current partition layout:"
sudo parted "$DISK" print

# Resize partition to use all available space
echo "Resizing partition to maximum size..."
sudo parted "$DISK" resizepart "$PARTITION" 100%

# Resize filesystem (for ext2/ext3/ext4)
echo "Resizing filesystem..."
sudo resize2fs "${DISK}${PARTITION}"

echo "Resize complete"
```

### Partition Information Script
```bash
#!/bin/bash
# Display detailed partition information

echo "=== Disk and Partition Information ==="
echo "Generated: $(date)"
echo ""

for disk in /dev/sd[a-z] /dev/nvme[0-9]n1; do
    if [ -b "$disk" ]; then
        echo "=== $disk ==="

        # Basic disk info
        size_bytes=$(sudo parted -m "$disk" unit B print | tail -1 | cut -d: -f2)
        size_gb=$((size_bytes / 1024 / 1024 / 1024))
        echo "Size: ${size_gb} GB"

        # Partition table type
        table_type=$(sudo parted "$disk" print | grep "Partition Table" | awk '{print $3}')
        echo "Partition Table: $table_type"

        # Partition details
        echo "Partitions:"
        sudo parted -m "$disk" unit MB print | tail -n +3 | while IFS=: read -r number start end size fsystem flags; do
            size_mb=$((size / 1024 / 1024))
            echo "  Partition $number: ${size_mb} MB ($fsystem) $flags"
        done

        echo ""
    fi
done
```

### Convert MBR to GPT
```bash
#!/bin/bash
# Convert MBR partition table to GPT

DISK="/dev/sdb"

echo "WARNING: This will convert $DISK from MBR to GPT"
echo "All partitions will be preserved but need to be recreated"
read -p "Continue? (y/N): " confirm

if [[ $confirm =~ ^[Yy]$ ]]; then
    echo "Backing up current partition table..."
    sudo sfdisk -d "$DISK" > "/tmp/partition_backup_$(basename $DISK).sf"

    echo "Converting to GPT..."
    sudo sgdisk -m "$DISK"

    echo "Conversion complete. Recreate partitions as needed."
    echo "Backup saved to /tmp/partition_backup_$(basename $DISK).sf"
else
    echo "Operation cancelled"
fi
```

### Alignment Check
```bash
#!/bin/bash
# Check partition alignment

for disk in /dev/sd[a-z]; do
    if [ -b "$disk" ]; then
        echo "=== Checking alignment for $disk ==="

        # Get physical sector size
        phys_sector_size=$(sudo blockdev --getpbsz "$disk")
        echo "Physical sector size: $phys_sector_size bytes"

        # Check each partition
        sudo parted -m "$disk" unit s print | tail -n +3 | while IFS=: read -r number start end size fsystem flags; do
            # Check if start is aligned
            if [ $((start % (phys_sector_size / 512))) -eq 0 ]; then
                echo "Partition $number: ✓ Aligned (starts at sector $start)"
            else
                echo "Partition $number: ✗ NOT aligned (starts at sector $start)"
            fi
        done

        echo ""
    fi
done
```

### Space Analysis
```bash
#!/bin/bash
# Analyze disk space and partition usage

echo "=== Disk Space Analysis ==="
echo "Generated: $(date)"
echo ""

for disk in /dev/sd[a-z]; do
    if [ -b "$disk" ]; then
        echo "=== $disk ==="

        # Total disk size
        total_sectors=$(sudo parted -m "$disk" unit s print | tail -1 | cut -d: -f2 | sed 's/s//')
        total_gb=$((total_sectors * 512 / 1024 / 1024 / 1024))
        echo "Total capacity: ${total_gb} GB"

        # Used space by partitions
        used_sectors=0
        partition_count=0

        sudo parted -m "$disk" unit s print | tail -n +3 | while IFS=: read -r number start end size fsystem flags; do
            if [ -n "$size" ] && [ "$size" != "" ]; then
                size_gb=$((size * 512 / 1024 / 1024 / 1024))
                echo "  Partition $number: ${size_gb} GB ($fsystem)"
            fi
        done

        # Show mount points and usage
        echo "  Mount points:"
        sudo parted -m "$disk" print | tail -n +3 | while IFS=: read -r number start end size fsystem flags; do
            if [ -e "${disk}${number}" ]; then
                mount_point=$(findmnt -n -o TARGET "${disk}${number}" 2>/dev/null)
                if [ -n "$mount_point" ]; then
                    usage=$(df -h "${disk}${number}" | tail -1 | awk '{print $5}')
                    echo "    ${disk}${number} at $mount_point (${usage} used)"
                fi
            fi
        done

        echo ""
    fi
done
```

## Advanced Usage

### Working with Large Disks (>2TB)
```bash
# Initialize 4TB disk with GPT
sudo parted /dev/sdc mklabel gpt
sudo parted /dev/sdc unit TB mkpart primary 0 4

# Create multiple partitions on large disk
sudo parted /dev/sdc mkpart primary ext4 0 1TB
sudo parted /dev/sdc mkpart primary ext4 1TB 2TB
sudo parted /dev/sdc mkpart primary ext4 2TB 4TB
```

### RAID and LVM Setup
```bash
# Create partitions for RAID
sudo parted /dev/sdb mklabel gpt
sudo parted /dev/sdb mkpart primary 0% 100%
sudo parted /dev/sdb set 1 raid on

# Create partitions for LVM
sudo parted /dev/sdc mklabel gpt
sudo parted /dev/sdc mkpart primary 0% 100%
sudo parted /dev/sdc set 1 lvm on

# Create LVM physical volume
sudo pvcreate /dev/sdc1
sudo vgcreate vg_main /dev/sdc1
sudo lvcreate -l 100%FREE -n lv_data vg_main
```

### Partition Flags and Attributes
```bash
# Set boot flag (MBR)
sudo parted /dev/sda set 1 boot on

# Set BIOS GRUB flag (GPT)
sudo parted /dev/sda set 1 bios_grub on

# Set EFI System Partition flag (GPT)
sudo parted /dev/sda set 1 esp on

# Set RAID flag
sudo parted /dev/sda set 1 raid on

# Set LVM flag
sudo parted /dev/sda set 1 lvm on

# Set hidden flag
sudo parted /dev/sda set 1 hidden on

# Set read-only flag
sudo parted /dev/sda set 1 readonly on
```

## Command Reference

### Unit Types
- **B** - Bytes
- **KB** - Kilobytes (1000)
- **KiB** - Kibibytes (1024)
- **MB** - Megabytes (1000×1000)
- **MiB** - Mebibytes (1024×1024)
- **GB** - Gigabytes (1000³)
- **GiB** - Gibibytes (1024³)
- **TB** - Terabytes (1000⁴)
- **TiB** - Tebibytes (1023³)
- **s** - Sectors
- **%** - Percentage of disk space

### Partition Types
- **primary** - Primary partition (MBR)
- **logical** - Logical partition (MBR)
- **extended** - Extended partition (MBR)
- Any name (GPT) - Named partition

### Common Filesystem Types
- **ext2** - Linux ext2
- **ext3** - Linux ext3
- **ext4** - Linux ext4
- **fat16** - FAT16
- **fat32** - FAT32
- **ntfs** - NTFS
- **hfs+** - HFS+
- **linux-swap** - Linux swap
- **xfs** - XFS
- **btrfs** - Btrfs

## Related Commands

- [`fdisk`](/docs/commands/hardware/fdisk) - Partition table manipulator
- [`sfdisk`](/docs/commands/hardware/sfdisk) - Disk partition table manipulator
- [`sgdisk`](/docs/commands/hardware/sgdisk) - GPT partition table manipulator
- [`mkfs`](/docs/commands/filesystem/mkfs) - Create filesystem
- [`resize2fs`](/docs/commands/filesystem/resize2fs) - Resize ext2/ext3/ext4 filesystem
- [`pvcreate`](/docs/commands/storage/pvcreate) - Initialize physical volume for LVM

## Troubleshooting

### Common Issues

#### Partition Table Errors
```bash
# Check partition table consistency
sudo fsck -n /dev/sda

# Fix partition table errors
sudo parted /dev/sda print
sudo parted /dev/sda mklabel gpt

# Rescue lost partitions
sudo testdisk /dev/sda
```

#### Alignment Issues
```bash
# Check alignment
sudo parted -a optimal /dev/sda print

# Fix alignment
sudo parted /dev/sda mklabel gpt
sudo parted -a optimal /dev/sda mkpart primary 1MB 100%
```

#### Size Limitations
```bash
# For disks > 2TB, always use GPT
sudo parted /dev/sdb mklabel gpt

# Check if disk uses 4K sectors
sudo blockdev --getss /dev/sdb
sudo blockdev --getpbsz /dev/sdb
```

### Recovery Operations
```bash
# Backup partition table
sudo sfdisk -d /dev/sda > partition_backup.sfd

# Restore partition table
sudo sfdisk /dev/sda < partition_backup.sfd

# Convert partition table backup to parted format
sfdisk -d /dev/sda | sfdisk --force /dev/sdb
```

## Best Practices

1. **Always use GPT** for disks larger than 2TB
2. **Backup partition tables** before making changes
3. **Use optimal alignment** for SSD and 4K sector disks
4. **Test commands** with `-m` or script mode before execution
5. **Verify filesystem integrity** after resizing
6. **Leave unallocated space** for future adjustments
7. **Use descriptive names** for GPT partitions
8. **Document partition layouts** for system maintenance
9. **Check alignment** for SSD performance
10. **Use appropriate flags** for special partitions (boot, esp, raid, lvm)

The `parted` command is essential for modern disk management, providing flexible partition creation and management capabilities for both traditional and large storage devices.