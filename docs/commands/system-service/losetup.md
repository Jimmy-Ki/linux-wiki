---
title: losetup - Set up and control loop devices
sidebar_label: losetup
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# losetup - Set up and control loop devices

The `losetup` command is a powerful Linux utility used to set up and control loop devices, which are pseudo-devices that allow regular files to be accessed as block devices. Loop devices are essential for mounting disk image files (ISO, IMG, VHD), creating encrypted filesystems, implementing virtual storage solutions, and working with container technologies. The command provides comprehensive control over loop device association, detachment, and configuration options including read-only mode, offset positioning, and sector size customization.

## Basic Syntax

```bash
losetup [options] loop_device file
losetup [options] -a | -l | -J [-O output_format]
losetup -d loop_device...
losetup -f
losetup -c loop_device
```

## Common Options

### Device Selection and Control
- `-a, --all` - List all available loop devices
- `-f, --find` - Find first unused loop device
- `-d, --detach` - Detach specified loop devices
- `-c, --set-capacity` - Resize loop device to match file size
- `--show` - Print device name after setup

### Loop Device Configuration
- `-o, --offset NUM` - Start at offset NUM bytes into file
- `--sizelimit NUM` - Limit device size to NUM bytes
- `-b, --sector-size NUM` - Set logical sector size to NUM bytes
- `-r, --read-only` - Set up read-only loop device
- `-P, --partscan` - Create partitioned loop device

### Output and Formatting
- `-l, --list` - List information about loop devices
- `-J, --json` - Use JSON format for output
- `-O, --output FORMAT` - Specify output columns
- `-n, --noheadings` - Don't print headings for list output

### Encryption and Advanced Options
- `-e, --encryption TYPE` - Enable data encryption (deprecated)
- `-p, --pass-fd NUM` - Read passphrase from file descriptor NUM
- `-C, --cipher TYPE` - Set encryption cipher (when using cryptsetup)

## Usage Examples

### Basic Loop Device Operations

#### Creating Loop Devices
```bash
# Attach a file to the first available loop device
sudo losetup -f disk.img

# Attach a file to a specific loop device
sudo losetup /dev/loop0 disk.img

# Attach with automatic partition scanning
sudo losetup -f -P disk.img

# Show which device was used
sudo losetup --show -f disk.img
```

#### Listing and Checking Loop Devices
```bash
# List all active loop devices
sudo losetup -a

# List in detailed format
sudo losetup -l

# List specific columns
sudo losetup -l -O NAME,BACK-FILE,SIZELIMIT,OFFSET,AUTOCLEAR

# JSON format output
sudo losetup -J

# Find unused loop devices
sudo losetup -f
```

#### Detaching Loop Devices
```bash
# Detach specific loop device
sudo losetup -d /dev/loop0

# Detach multiple devices
sudo losetup -d /dev/loop0 /dev/loop1

# Detach all associated devices for a file
sudo losetup -j disk.img
```

### Advanced Loop Device Configuration

#### Working with Disk Images
```bash
# Mount ISO image as loop device
sudo losetup -f ubuntu-22.04.iso
sudo mount /dev/loop0 /mnt/iso

# Create and mount partitioned disk image
sudo losetup -f -P multi-part.img
sudo mount /dev/loop0p1 /mnt/part1
sudo mount /dev/loop0p2 /mnt/part2

# Work with specific offset in image
sudo losetup -o 1048576 /dev/loop0 disk.img
```

#### Read-Only and Sector Configuration
```bash
# Create read-only loop device
sudo losetup -r /dev/loop0 backup.img

# Set custom sector size
sudo losetup -b 4096 /dev/loop0 special.img

# Limit device size
sudo losetup --sizelimit 1G /dev/loop0 large-file.img

# Combine options for complex setup
sudo losetup -r -o 512 --sizelimit 100M -b 512 /dev/loop0 file.img
```

### File System Operations

#### Creating Filesystems on Loop Devices
```bash
# Create filesystem on loop device
sudo losetup /dev/loop0 container.img
sudo mkfs.ext4 /dev/loop0
sudo mount /dev/loop0 /mnt/container

# Create swap file on loop device
sudo losetup /dev/loop0 swapfile.img
sudo mkswap /dev/loop0
sudo swapon /dev/loop0

# Resize loop device to match file size
sudo losetup -c /dev/loop0
```

#### Encrypted Storage Solutions
```bash
# Create encrypted container with cryptsetup
sudo dd if=/dev/zero of=encrypted.img bs=1M count=100
sudo losetup /dev/loop0 encrypted.img
sudo cryptsetup luksFormat /dev/loop0
sudo cryptsetup open /dev/loop0 secure_drive
sudo mkfs.ext4 /dev/mapper/secure_drive
sudo mount /dev/mapper/secure_drive /mnt/secure

# Clean up encrypted device
sudo umount /mnt/secure
sudo cryptsetup close secure_drive
sudo losetup -d /dev/loop0
```

### System Administration

#### Backup and Recovery Operations
```bash
# Create backup using loop device
sudo dd if=/dev/sda1 of=backup.img
sudo losetup -r /dev/loop0 backup.img
sudo fsck /dev/loop0

# Mount backup for inspection
sudo mount -o ro /dev/loop0 /mnt/backup

# Create compressed backup with loop device
sudo losetup /dev/loop0 /dev/sdb1
sudo dd if=/dev/loop0 bs=4M | gzip > backup.img.gz
sudo losetup -d /dev/loop0
```

#### Virtualization and Container Support
```bash
# Setup loop device for VM disk
sudo losetup /dev/loop0 vm-disk.img
sudo kvm -hda /dev/loop0 -m 1024

# Multiple loop devices for complex setup
for i in {0..3}; do
    sudo losetup /dev/loop$i disk-part$i.img
done

# Container root filesystem setup
sudo losetup /dev/loop0 container-root.img
sudo mount /dev/loop0 /var/lib/container/rootfs
```

## Practical Examples

### Data Recovery and Forensics

#### Disk Image Analysis
```bash
# Create forensic image
sudo dd if=/dev/sdb of=forensic.img bs=512 conv=noerror,sync

# Analyze with loop device
sudo losetup -r /dev/loop0 forensic.img
sudo fdisk -l /dev/loop0
sudo file -s /dev/loop0

# Mount specific partitions with offset
sudo losetup -o $((512*2048)) /dev/loop1 forensic.img
sudo mount -o ro /dev/loop1 /mnt/analysis

# Create multiple partition loop devices
sudo losetup -P -r /dev/loop0 forensic.img
```

#### Partition Recovery
```bash
# Recover lost partition table
sudo losetup /dev/loop0 corrupted.img
sudo testdisk /dev/loop0

# Extract data from damaged image
sudo losetup -r -o 1048576 --sizelimit 52428800 /dev/loop0 damaged.img
sudo mount -o ro /dev/loop0 /mnt/recovery
```

### Development and Testing

#### Filesystem Development
```bash
# Create test filesystem
dd if=/dev/zero of=testfs.img bs=1M count=100
sudo losetup /dev/loop0 testfs.img

# Test different filesystems
sudo mkfs.ext4 /dev/loop0
sudo mount /dev/loop0 /mnt/test
# ... perform tests ...
sudo umount /mnt/test

# Benchmark filesystem performance
sudo mkfs.btrfs /dev/loop0
sudo mount /dev/loop0 /mnt/btrfs-test
sudo bonnie++ -d /mnt/btrfs-test -s 1G -r 256M -u root
```

#### Software Installation and Packaging
```bash
# Create loop device for package testing
sudo losetup /dev/loop0 package-test.img
sudo mkfs.ext4 /dev/loop0
sudo mount /dev/loop0 /mnt/pkgtest

# Install package in isolated environment
sudo debootstrap --arch=amd64 focal /mnt/pkgtest http://archive.ubuntu.com/ubuntu/
sudo chroot /mnt/pkgtest apt-get install package-name

# Clean up
sudo umount /mnt/pkgtest
sudo losetup -d /dev/loop0
```

## Advanced Usage

### Performance Optimization

#### Optimizing Loop Device Performance
```bash
# Use optimal sector size for SSD
sudo losetup -b 4096 /dev/loop0 ssd-image.img

# Direct I/O for better performance
sudo losetup --direct-io=on /dev/loop0 large-file.img

# Set autoclear for automatic cleanup
sudo losetup --autoclear /dev/loop0 temp-image.img
```

#### Memory and Caching Configuration
```bash
# Configure loop device with specific parameters
echo "max_loop=256" | sudo tee -a /etc/modprobe.d/loop.conf
echo "loop.max_part=63" | sudo tee -a /etc/modprobe.d/loop.conf

# Reload loop module
sudo modprobe -r loop
sudo modprobe loop
```

### Security and Access Control

#### Securing Loop Device Access
```bash
# Create loop device with specific permissions
sudo losetup /dev/loop0 secure-data.img
sudo chmod 600 /dev/loop0

# Use group permissions for shared access
sudo chgrp storage /dev/loop0
sudo chmod 660 /dev/loop0

# Create udev rules for persistent permissions
echo 'KERNEL=="loop[0-9]*", GROUP="storage", MODE="0660"' | \
    sudo tee /etc/udev/rules.d/99-loop-permissions.rules
```

#### Audit and Monitoring
```bash
# Monitor loop device usage
watch -n 1 'sudo losetup -l'

# Log loop device creation and deletion
function losetup_log() {
    echo "$(date): $*" >> /var/log/losetup.log
    sudo losetup "$@"
    losetup_log "Command completed with status $?"
}
```

### Automation and Scripting

#### Automated Mount Scripts
```bash
#!/bin/bash
# Mount multiple disk images automatically

IMAGES_DIR="/data/images"
MOUNT_BASE="/mnt/images"

for img in "$IMAGES_DIR"/*.img; do
    name=$(basename "$img" .img)
    mount_dir="$MOUNT_BASE/$name"

    # Create mount point
    sudo mkdir -p "$mount_dir"

    # Setup loop device and mount
    loop_dev=$(sudo losetup --show -f "$img")
    sudo mount "$loop_dev" "$mount_dir"

    echo "Mounted $img at $mount_dir via $loop_dev"
done
```

#### Backup Automation
```bash
#!/bin/bash
# Automated backup with loop device rotation

BACKUP_DIR="/backups"
SOURCE_DEVICE="/dev/sdb1"
MAX_BACKUPS=7

# Create backup
backup_img="$BACKUP_DIR/backup-$(date +%Y%m%d).img"
sudo dd if="$SOURCE_DEVICE" of="$backup_img" bs=4M

# Setup loop device for verification
loop_dev=$(sudo losetup --show -r "$backup_img")
sudo fsck -n "$loop_dev"

# Cleanup old backups (keep last N)
ls -t "$BACKUP_DIR"/backup-*.img | tail -n +$((MAX_BACKUPS + 1)) | \
    while read -r old_backup; do
        sudo losetup -j "$old_backup" | cut -d: -f1 | \
            xargs -r sudo losetup -d
        rm "$old_backup"
    done
```

## Troubleshooting

### Common Issues

#### Device Busy Errors
```bash
# Find processes using loop device
sudo lsof /dev/loop0

# Force unmount and detach
sudo umount -l /mnt/mountpoint
sudo losetup -d /dev/loop0

# Check for open file handles
sudo fuser -v /dev/loop0
```

#### Permission Issues
```bash
# Check user permissions
groups $USER | grep -q disk || echo "User not in disk group"

# Add user to appropriate groups
sudo usermod -a -G disk,lpadmin $USER

# Use sudo for loop operations
sudo losetup /dev/loop0 file.img
```

#### Module Loading Issues
```bash
# Check if loop module is loaded
lsmod | grep loop

# Load loop module with specific options
sudo modprobe loop max_loop=128

# Check available loop devices
ls /dev/loop*
```

### Performance Issues

#### Slow Performance
```bash
# Check for hardware acceleration
sudo hdparm -I /dev/loop0

# Optimize I/O scheduler
echo deadline | sudo tee /sys/block/loop0/queue/scheduler

# Increase readahead size
sudo blockdev --setra 1024 /dev/loop0
```

#### Memory Usage
```bash
# Monitor loop device memory usage
free -h
cat /proc/meminfo | grep -E "(MemAvailable|Cached|Buffers)"

# Adjust loop device caching
echo 0 | sudo tee /sys/block/loop0/queue/rotational
```

## Related Commands

- [`mount`](/docs/commands/system-service/mount) - Mount filesystems
- [`umount`](/docs/commands/system-service/umount) - Unmount filesystems
- [`fdisk`](/docs/commands/system-service/fdisk) - Partition table manipulator
- [`mkfs`](/docs/commands/system-service/mkfs) - Build a Linux filesystem
- [`dd`](/docs/commands/file-management/dd) - Convert and copy a file
- [`cryptsetup`](/docs/commands/security/cryptsetup) - Setup encrypted volumes
- [`parted`](/docs/commands/system-service/parted) - Partition manipulation tool
- [`kpartx`](/docs/commands/system-service/kpartx) - Create device mappings for partitions
- [`dmsetup`](/docs/commands/system-service/dmsetup) - Low level logical volume management

## Best Practices

1. **Always use read-only mode** (-r) when mounting disk images for analysis
2. **Detach loop devices** when finished to free system resources
3. **Use specific offsets** (-o) for accessing partitions within disk images
4. **Enable partition scanning** (-P) for multi-partition images
5. **Verify filesystem integrity** after mounting with fsck
6. **Use appropriate sector sizes** (-b) for optimal performance
7. **Monitor loop device usage** to prevent resource exhaustion
8. **Clean up properly** in scripts to avoid orphaned loop devices
9. **Use descriptive names** when creating multiple loop devices
10. **Document loop device mappings** for system administration

## Performance Tips

1. **Use appropriate sector sizes** (4096 bytes) for modern storage devices
2. **Enable direct I/O** (--direct-io=on) for large file operations
3. **Use read-only mode** whenever possible to reduce caching overhead
4. **Set autoclear** (--autoclear) for temporary loop devices
5. **Configure loop module parameters** for optimal performance
6. **Use SSD-optimized settings** when working with flash storage
7. **Monitor I/O statistics** to identify bottlenecks
8. **Use appropriate block sizes** with dd for better throughput

The `losetup` command is an essential tool for Linux system administration, providing flexible and powerful loop device management capabilities. Its comprehensive feature set supports everything from simple disk image mounting to complex virtualization and container implementations, making it indispensable for modern Linux workflows.