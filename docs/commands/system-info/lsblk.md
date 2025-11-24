---
title: lsblk - List Block Devices
sidebar_label: lsblk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lsblk - List Block Devices

The `lsblk` command lists information about all available block devices and displays their relationships in a tree-like structure. It's an essential tool for system administrators to view disk partitions, storage devices, and their mount points.

## Basic Syntax

```bash
lsblk [options] [device...]
```

## Common Options

### Display Options
- `-a, --all` - Show all devices including empty devices
- `-b, --bytes` - Print sizes in bytes instead of human-readable format
- `-d, --nodeps` - Don't print slaves or holders (show only parent devices)
- `-l, --list` - Use list format instead of default tree format
- `-n, --noheadings` - Don't print column headings
- `-P, --pairs` - Use key="value" output format
- `-r, --raw` - Use raw output format
- `-t, --topology` - Show topology information

### Information Options
- `-f, --fs` - Show filesystem information
- `-m, --perms` - Show permissions information
- `-o, --output <list>` - Specify output columns
- `-D, --discard` - Show discard capabilities

### Filtering Options
- `-e, --exclude <list>` - Exclude devices (default: RAM disks)
- `-I, --include <list>` - Show only devices with specified major numbers

### Other Options
- `-h, --help` - Display help message
- `-V, --version` - Display version information

## Usage Examples

### Basic Device Listing
```bash
# Show all block devices in tree format
lsblk

# Typical output:
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 238.5G  0 disk
├─sda1   8:1    0   512M  0 part /boot/efi
├─sda2   8:2    0 238.0G  0 part /
└─sda3   8:3    0     1K  0 part
sdb      8:16   0 931.5G  0 disk
└─sdb1   8:17   0 931.5G  0 part /data
sr0     11:0    1  1024M  0 rom
```

### Show Filesystem Information
```bash
# Display filesystem details
lsblk -f

# Output includes filesystem type, UUID, and mount point
NAME   FSTYPE   LABEL       UUID                                 FSAVAIL FSUSE% MOUNTPOINT
sda
├─sda1 vfat     SYSTEM      XXXX-XXXX                             511.9M     1% /boot/efi
├─sda2 ext4                 XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX  214.2G    10% /
└─sda3
sdb
└─sdb1 ext4     DATA        XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX  890.3G     4% /data
sr0
```

### Show All Devices Including Empty
```bash
# List all devices, including empty ones
lsblk -a

# This shows devices that might not have partitions
```

### List Format Output
```bash
# Display in list format instead of tree
lsblk -l

# Output in tabular format:
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 238.5G  0 disk
sda1     8:1    0   512M  0 part /boot/efi
sda2     8:2    0 238.0G  0 part /
sdb      8:16   0 931.5G  0 disk
sdb1     8:17   0 931.5G  0 part /data
```

### Show Permissions
```bash
# Display device permissions
lsblk -m

# Output includes owner, group, and mode:
NAME      SIZE OWNER GROUP MODE
sda     238.5G root  disk  brw-rw----
sda1       512M root  disk  brw-rw----
sda2     238.0G root  disk  brw-rw----
```

### Custom Output Columns
```bash
# Specify specific columns to display
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,UUID

# Available columns include:
# NAME, KNAME, PATH, MAJ:MIN, FSTYPE, MOUNTPOINT
# LABEL, UUID, PARTUUID, RA, RO, RM, MODEL, SIZE
# STATE, OWNER, GROUP, MODE, ALIGNMENT, MIN-IO
# OPT-IO, PHY-SEC, LOG-SEC, ROTA, SCHED, RQ-SIZE
# TYPE, DISC-ALN, DISC-GRAN, DISC-MAX, DISC-ZERO
```

### Size in Bytes
```bash
# Show exact sizes in bytes
lsblk -b

# Useful for scripts and precise calculations
lsblk -b -o NAME,SIZE
```

### Show Device Topology
```bash
# Display topology information
lsblk -t

# Shows alignment, minimum IO size, physical sector, etc.
```

## Practical Examples

### Disk Usage Analysis
```bash
# Check disk usage and identify large partitions
lsblk -f -o NAME,FSTYPE,SIZE,MOUNTPOINT,USE%

# Show which disks are getting full
df -h | while read line; do
    if [[ $line =~ ^/dev/ ]]; then
        device=$(echo $line | cut -d' ' -f1)
        mount_point=$(echo $line | cut -d' ' -f6)
        usage=$(echo $line | awk '{print $5}')
        if [[ ${usage%?} -gt 80 ]]; then
            echo "Warning: $device ($mount_point) is ${usage} full"
        fi
    fi
done
```

### Identify Available Storage
```bash
# Find unmounted partitions
lsblk -f | grep -E "(part|disk)" | grep -v "MOUNTPOINT"

# Show available space on mounted filesystems
lsblk -f -o NAME,SIZE,FSAVAIL,MOUNTPOINT
```

### Storage Device Inventory
```bash
# Get detailed inventory of all storage devices
lsblk -d -o NAME,SIZE,MODEL,VENDOR,ROTA,STATE

# Output includes:
# NAME    SIZE MODEL                    VENDOR  ROTA STATE
# sda   238.5G SSD                      KINGSTON    0 running
# sdb   931.5G ST1000LM035-1RK1        SEAGATE     1 running
```

### Scripting and Automation
```bash
# Get list of all disk devices
lsblk -d -n -o NAME | grep -E '^sd|^nvme|^vd|^hd'

# Find all partitions of a specific disk
lsblk -n -l -o NAME /dev/sda | tail -n +2

# Check if a device is a solid state drive
lsblk -d -n -o NAME,ROTA | grep -w '0$' | cut -d' ' -f1

# Get mount points for a specific device
lsblk -n -o MOUNTPOINT /dev/sda2 | grep -v '^$'
```

### Storage Performance Information
```bash
# Check if devices are rotational (HDD) or solid state (SSD)
lsblk -d -o NAME,ROTA,MODEL

# ROTA=1 means rotational (HDD), ROTA=0 means non-rotational (SSD)
```

### Device Verification
```bash
# Verify device exists and get its properties
if lsblk /dev/sda >/dev/null 2>&1; then
    echo "Device /dev/sda exists:"
    lsblk -f /dev/sda
else
    echo "Device /dev/sda not found"
fi
```

## Advanced Usage

### Monitoring Storage Changes
```bash
# Monitor for storage device changes
watch -n 1 'lsblk -f'

# Show changes in real-time
lsblk -f > /tmp/lsblk_before.txt
# After making changes
lsblk -f > /tmp/lsblk_after.txt
diff /tmp/lsblk_before.txt /tmp/lsblk_after.txt
```

### Working with LVM and RAID
```bash
# Show LVM volumes and physical volumes
lsblk -f

# Display RAID array information
lsblk -d -o NAME,SIZE,TYPE

# Show all block devices including MD RAID
cat /proc/mdstat
lsblk -f
```

### USB and External Storage
```bash
# Identify USB storage devices
lsblk -d -o NAME,MODEL,VENDOR | grep -i usb

# Show removable devices
lsblk -d -o NAME,RM | grep ': 1$'

# Hot-plug detection
lsblk -f > /tmp/devices_before
# Plug in USB device
lsblk -f > /tmp/devices_after
diff /tmp/devices_before /tmp/devices_after
```

### Virtualization and Container Storage
```bash
# Show loop devices (often used for containers/images)
lsblk -f | grep loop

# Display device mapper targets
lsblk -f | grep dm

# List all block devices with their types
lsblk -o NAME,TYPE,SIZE
```

## Output Columns Reference

### Device Identification
- **NAME** - Device name
- **KNAME** - Kernel device name
- **PATH** - Device path
- **MAJ:MIN** - Major and minor device numbers

### Device Properties
- **SIZE** - Size of device
- **TYPE** - Device type (disk, part, rom, etc.)
- **MODEL** - Device model name
- **VENDOR** - Device vendor
- **SERIAL** - Serial number
- **STATE** - Device state (running, offline)

### Filesystem Information
- **FSTYPE** - Filesystem type
- **MOUNTPOINT** - Where the device is mounted
- **LABEL** - Filesystem label
- **UUID** - Universally Unique Identifier
- **PARTUUID** - Partition UUID

### Performance and Capabilities
- **ROTA** - Rotational flag (1=HDD, 0=SSD)
- **RO** - Read-only flag
- **RM** - Removable flag
- **ALIGNMENT** - Alignment offset
- **MIN-IO** - Minimum I/O size
- **OPT-IO** - Optimal I/O size
- **PHY-SEC** - Physical sector size
- **LOG-SEC** - Logical sector size

### Permissions
- **OWNER** - Device owner
- **GROUP** - Device group
- **MODE** - Device permissions
- **DISC-GRAN** - Discard granularity
- **DISC-MAX** - Maximum discard size

## Related Commands

- [`fdisk`](/docs/commands/hardware/fdisk) - Partition table manipulator
- [`parted`](/docs/commands/hardware/parted) - Disk partitioning utility
- [`df`](/docs/commands/file-management/df) - Display free disk space
- [`du`](/docs/commands/file-management/du) - Display disk usage statistics
- [`mount`](/docs/commands/hardware/mount) - Mount filesystems
- [`umount`](/docs/commands/hardware/umount) - Unmount filesystems
- [`blkid`](/docs/commands/hardware/blkid) - Locate/print block device attributes

## Troubleshooting

### Common Issues

#### Device Not Listed
```bash
# Check if device exists
ls /dev/sd*

# Rescan SCSI bus
echo "- - -" > /sys/class/scsi_host/host0/scan

# Check kernel messages for device detection
dmesg | grep -i scsi
dmesg | grep -i usb
```

#### Permission Denied
```bash
# Run with sudo for complete information
sudo lsblk -f

# Add user to disk group for non-root access
sudo usermod -a -G disk $USERNAME
```

#### Missing Filesystem Information
```bash
# Sometimes fsck is needed to detect filesystems
sudo fsck /dev/sda1

# Force filesystem table update
sudo partprobe /dev/sda
```

#### Incorrect Size Display
```bash
# Check real device size
sudo blockdev --getsize64 /dev/sda

# Verify sector sizes
sudo blockdev --getss /dev/sda
sudo blockdev --getpbsz /dev/sda
```

## Best Practices

1. **Use `lsblk -f`** for comprehensive filesystem information
2. **Run with `sudo`** to see all available information
3. **Use `-b` option** for scripting to avoid parsing human-readable sizes
4. **Combine with `watch`** for monitoring storage changes
5. **Regular inventory** using `lsblk -d -o NAME,SIZE,MODEL` for asset tracking
6. **Check `ROTA` field** to distinguish between SSDs and HDDs
7. **Use UUIDs instead of device names** in `/etc/fstab` for persistence

The `lsblk` command is an indispensable tool for Linux system administration, providing a comprehensive view of all block devices and their relationships in an easy-to-understand format.