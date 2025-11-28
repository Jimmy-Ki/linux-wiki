---
title: blkid - Locate block device attributes
sidebar_label: blkid
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# blkid - Locate block device attributes

The `blkid` command is a powerful utility for locating and displaying block device attributes, including filesystem types, UUIDs, labels, and other metadata. It reads information directly from block devices and can identify filesystems, partitions, and storage devices even when they're not mounted. blkid is essential for system administration, storage management, and automated mounting operations, providing reliable device identification that persists across reboots and hardware changes.

## Basic Syntax

```bash
blkid [OPTIONS] [DEVICE...]
```

## Common Options

### Display Options
- `-o <format>` - Output format (value, list, export, device, full)
- `-s <tag>` - Show specific tag(s) (TYPE, UUID, LABEL, etc.)
- `-t <token>` - Find devices with matching token (NAME=value)
- `-L <label>` - Find device by filesystem label
- `-U <uuid>` - Find device by filesystem UUID
- `-d, --no-encoding` - Don't encode non-printing characters
- `-p, --probe` - Low-level superblock probing (root only)
- `--output-format <format>` - Advanced output formatting

### Information Options
- `-g, --garbage-collect` - Garbage collect the blkid cache
- `-c, --cache-file <file>` - Use alternative cache file
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `-v, --verbose` - Enable verbose output

### Cache Management
- `-w, --write-cache <device>` - Write cache entry for device
- `--info` - Show info about the cache file
- `--list-one` - Show only one device per result

## Usage Examples

### Basic Block Device Operations

#### Displaying All Block Devices
```bash
# Show information for all block devices
blkid

# List with device information
blkid -o device

# Show in list format
blkid -o list

# Export format for shell scripts
blkid -o export

# Full detailed output
blkid -o full
```

#### Querying Specific Devices
```bash
# Query specific device
blkid /dev/sda1

# Query multiple devices
blkid /dev/sda1 /dev/sdb1 /dev/nvme0n1p2

# Query by device name pattern
blkid /dev/sd*

# Query all partitions of a disk
blkid /dev/sda*
```

### Filesystem Information

#### Displaying Specific Attributes
```bash
# Show only UUIDs
blkid -s UUID

# Show only filesystem types
blkid -s TYPE

# Show only labels
blkid -s LABEL

# Show UUID and TYPE only
blkid -s UUID -s TYPE

# Show all available tags
blkid -s LABEL -s UUID -s TYPE -s PTTYPE
```

#### Finding Devices by Attributes
```bash
# Find device by label
blkid -L "DATA"

# Find device by UUID
blkid -U "a1b2c3d4-e5f6-7890-abcd-ef1234567890"

# Find ext4 filesystems
blkid -t TYPE=ext4

# Find devices with specific label pattern
blkid -t LABEL="home*"

# Find devices with multiple criteria
blkid -t TYPE=ext4 -t LABEL="backup*"
```

### Output Formatting

#### Different Output Formats
```bash
# Default format (device: TAG="value" ...)
blkid

# List format (device TYPE=value UUID=value ...)
blkid -o list

# Export format (shell-compatible variables)
blkid -o export

# Device only (just device names)
blkid -o device

# Full format with all available information
blkid -o full

# Value format (just the values)
blkid -o value -s UUID
```

#### Custom Output Processing
```bash
# Extract UUID for /dev/sda1
blkid -s UUID -o value /dev/sda1

# Get filesystem type for multiple devices
blkid -s TYPE -o value /dev/sda*

# Format output for fstab entries
blkid -o export | while read line; do
    if [[ $line == UUID* ]]; then
        echo "$line"
    fi
done

# Generate mount commands
for device in $(blkid -o device); do
    uuid=$(blkid -s UUID -o value $device)
    type=$(blkid -s TYPE -o value $device)
    echo "mount UUID=$uuid /mnt/$type -t $type"
done
```

## Practical Examples

### System Administration

#### fstab Management
```bash
# Generate fstab entries
blkid | while read line; do
    device=$(echo $line | cut -d: -f1)
    uuid=$(echo $line | grep -o 'UUID="[^"]*"' | cut -d'"' -f2)
    type=$(echo $line | grep -o 'TYPE="[^"]*"' | cut -d'"' -f2)

    if [ -n "$uuid" ] && [ -n "$type" ]; then
        echo "UUID=$uuid  /mnt/$(basename $device)  $type  defaults  0  2"
    fi
done

# Update fstab with current devices
blkid -o export | grep -E '^UUID|^TYPE' | \
    awk 'BEGIN{FS="="} {print $1 "=" $2}' > /tmp/blkid_info

# Check for duplicate UUIDs
blkid -s UUID -o value | sort | uniq -d
```

#### Storage Device Discovery
```bash
# List all storage devices with their types
blkid -o list | sort

# Find all mounted filesystems
mount | awk '{print $1}' | xargs blkid 2>/dev/null

# Identify USB devices
blkid -o device | grep -E '/dev/sd[b-z][0-9]*$' | while read dev; do
    echo "USB Device: $dev"
    blkid $dev
done

# Find unmounted filesystems
for device in $(blkid -o device); do
    if ! mount | grep -q "^$device "; then
        echo "Unmounted: $device"
        blkid $device
    fi
done
```

#### Backup and Recovery
```bash
# Backup all block device information
blkid -o full > /backup/blkid_info_$(date +%Y%m%d).txt

# Document system storage layout
echo "=== Storage Layout Information ===" > /tmp/storage_report.txt
echo "Generated: $(date)" >> /tmp/storage_report.txt
echo "" >> /tmp/storage_report.txt

blkid -o list | while read device type uuid label rest; do
    echo "Device: $device" >> /tmp/storage_report.txt
    echo "  Type: $type" >> /tmp/storage_report.txt
    echo "  UUID: $uuid" >> /tmp/storage_report.txt
    echo "  Label: $label" >> /tmp/storage_report.txt
    echo "" >> /tmp/storage_report.txt
done

# Compare current vs previous storage state
blkid -o export > /tmp/current_blkid
diff /backup/previous_blkid /tmp/current_blkid
```

### Scripting and Automation

#### Device Identification Scripts
```bash
#!/bin/bash
# Find device by label (case-insensitive)
find_device_by_label() {
    local search_label="$1"
    blkid -t LABEL="$search_label" -o device 2>/dev/null || \
    blkid | grep -i "LABEL=\"$search_label\"" | cut -d: -f1
}

# Get filesystem mount information
get_mount_info() {
    local device="$1"
    local mount_point=$(findmnt -n -o TARGET "$device" 2>/dev/null)
    local fs_type=$(blkid -s TYPE -o value "$device" 2>/dev/null)

    echo "Device: $device"
    echo "Mount Point: ${mount_point:-Not mounted}"
    echo "Filesystem: ${fs_type:-Unknown}"
}

# Safe mount by label
safe_mount_by_label() {
    local label="$1"
    local mount_point="$2"

    local device=$(find_device_by_label "$label")
    if [ -n "$device" ]; then
        local fs_type=$(blkid -s TYPE -o value "$device")
        mkdir -p "$mount_point"
        mount "$device" "$mount_point"
        echo "Mounted $device ($fs_type) at $mount_point"
    else
        echo "Device with label '$label' not found" >&2
        return 1
    fi
}
```

#### Storage Monitoring
```bash
#!/bin/bash
# Monitor for new storage devices
monitor_storage_changes() {
    local temp_file="/tmp/blkid_current"
    local previous_file="/tmp/blkid_previous"

    while true; do
        blkid -o device > "$temp_file"

        if [ -f "$previous_file" ]; then
            # Check for new devices
            comm -13 "$previous_file" "$temp_file" | while read device; do
                echo "New device detected: $device"
                blkid "$device"
            done

            # Check for removed devices
            comm -23 "$previous_file" "$temp_file" | while read device; do
                echo "Device removed: $device"
            done
        fi

        mv "$temp_file" "$previous_file"
        sleep 5
    done
}

# Check filesystem integrity
check_filesystems() {
    blkid -t TYPE=ext4 -o device | while read device; do
        echo "Checking $device..."
        if ! tune2fs -l "$device" | grep -q "Filesystem state:.*clean"; then
            echo "Warning: $device may need fsck"
        fi
    done
}
```

### Advanced Usage

#### Cache Management
```bash
# Clear the blkid cache
sudo blkid -g

# Rebuild cache for all devices
sudo blkid -g && sudo blkid

# Check cache file location and size
ls -la /run/blkid/blkid.tab 2>/dev/null || \
ls -la /etc/blkid.tab 2>/dev/null

# Use custom cache file
blkid -c /custom/cache/file

# Write cache entry for specific device
sudo blkid -w /dev/sda1
```

#### Low-level Probing
```bash
# Perform low-level superblock probing
sudo blkid -p /dev/sda1

# Probe with verbose output
sudo blkid -p -v /dev/sda1

# Probe all devices with low-level access
sudo blkid -p /dev/sd*

# Check for multiple filesystems on device
sudo blkid -p -o low-level /dev/sda1
```

#### Advanced Output Processing
```bash
# Create JSON output
blkid -o export | jq -R -s '
    split("\n")[:-1] |
    map(split("=") | if length == 2 then {(.[0]): .[1]} else empty end) |
    group_by(.DEVICE) |
    map(add)
'

# Generate HTML report
cat << EOF > storage_report.html
<!DOCTYPE html>
<html>
<head><title>Storage Report</title></head>
<body>
<h1>Storage Devices</h1>
<table border="1">
<tr><th>Device</th><th>Type</th><th>UUID</th><th>Label</th></tr>
$(blkid -o list | while read device type uuid label; do
    echo "<tr><td>$device</td><td>$type</td><td>$uuid</td><td>$label</td></tr>"
done)
</table>
</body>
</html>
EOF
```

## Integration and Automation

### Shell Scripts

#### Automated Mounting Script
```bash
#!/bin/bash
# Auto-mount external drives by label

MOUNT_BASE="/media"
USER="username"
GROUP="plugdev"

# Ensure mount base directory exists
mkdir -p "$MOUNT_BASE"

# Find and mount devices with specific labels
mount_by_pattern() {
    local pattern="$1"

    blkid -t "LABEL=$pattern" -o device | while read device; do
        local label=$(blkid -s LABEL -o value "$device")
        local mount_point="$MOUNT_BASE/$label"

        # Create mount point
        mkdir -p "$mount_point"
        chown "$USER:$GROUP" "$mount_point"

        # Mount if not already mounted
        if ! mountpoint -q "$mount_point"; then
            local fs_type=$(blkid -s TYPE -o value "$device")
            mount -t "$fs_type" "$device" "$mount_point"
            echo "Mounted $device at $mount_point"
        fi
    done
}

# Mount common external drives
mount_by_pattern "USB*"
mount_by_pattern "BACKUP*"
mount_by_pattern "DATA*"
```

#### Storage Inventory Script
```bash
#!/bin/bash
# Generate comprehensive storage inventory

REPORT_FILE="/var/log/storage_inventory_$(date +%Y%m%d_%H%M%S).txt"

echo "=== Storage Inventory Report ===" > "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "Hostname: $(hostname)" >> "$REPORT_FILE"
echo "Kernel: $(uname -r)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== Block Devices ===" >> "$REPORT_FILE"
lsblk >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== Filesystem Information ===" >> "$REPORT_FILE"
blkid -o full >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== Mount Points ===" >> "$REPORT_FILE"
mount >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== Disk Usage ===" >> "$REPORT_FILE"
df -h >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "=== Storage Health ===" >> "$REPORT_FILE"
for device in $(lsblk -d -n -o NAME); do
    if [[ $device =~ ^sd|^nvme ]]; then
        echo "--- $device ---" >> "$REPORT_FILE"
        smartctl -a "/dev/$device" >> "$REPORT_FILE" 2>/dev/null || \
        echo "S.M.A.R.T. not available for $device" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
done

echo "Report saved to: $REPORT_FILE"
```

## Troubleshooting

### Common Issues

#### Device Not Found
```bash
# Device not showing up in blkid
# Solutions:

# Refresh udev
sudo udevadm trigger
sudo udevadm settle

# Rebuild blkid cache
sudo blkid -g
sudo blkid

# Check if device exists
ls -l /dev/sd*

# Try direct probing
sudo blkid -p /dev/sdX

# Check dmesg for device errors
dmesg | grep -i "sd\|block"
```

#### Permission Issues
```bash
# blkid requires root for some operations
# Use sudo for full access:
sudo blkid

# For low-level probing:
sudo blkid -p /dev/sda1

# For cache operations:
sudo blkid -g
```

#### Slow Performance
```bash
# blkid scanning slowly
# Solutions:

# Limit device scope
blkid /dev/sda*

# Use cache more effectively
blkid -c /var/cache/blkid.cache

# Avoid unnecessary probing
blkid --no-encoding

# Probe specific devices only
blkid -p /dev/sda1
```

#### Cache Corruption
```bash
# Symptoms: inconsistent or missing device information
# Solutions:

# Clear and rebuild cache
sudo blkid -g
sudo blkid

# Use different cache file
blkid -c /tmp/blkid_cache

# Disable caching temporarily
blkid -c /dev/null

# Check cache file integrity
file /run/blkid/blkid.tab
```

## Related Commands

- [`lsblk`](/docs/commands/system-info/lsblk) - List block devices in a tree format
- [`fdisk`](/docs/commands/system-service/fdisk) - Partition table manipulator
- [`parted`](/docs/commands/system-service/parted) - Partition manipulation utility
- [`mount`](/docs/commands/system-service/mount) - Mount filesystems
- [`findmnt`](/docs/commands/system-info/findmnt) - Find mounted filesystems
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`lshw`](/docs/commands/system-info/lshw) - List hardware
- [`udevadm`](/docs/commands/system-info/udevadm) - udev management tool
- [`df`](/docs/commands/file-management/df) - Display disk space usage
- [`du`](/docs/commands/file-management/du) - Display file space usage

## Best Practices

1. **Use UUIDs** for persistent device identification in `/etc/fstab`
2. **Regular cache updates** with `blkid -g` after hardware changes
3. **Script with export format** (-o export) for shell compatibility
4. **Combine with lsblk** for complete device information
5. **Test device accessibility** before relying on blkid output
6. **Handle non-existent devices** gracefully in scripts
7. **Use specific tags** (-s) to reduce output noise
8. **Cache results** in long-running scripts to avoid repeated scanning
9. **Verify mount operations** with device UUIDs from blkid
10. **Document storage layout** using blkid output for system recovery

## Performance Tips

1. **Limit device scope** when possible (specify specific devices)
2. **Use cache effectively** for repeated queries
3. **Avoid low-level probing** (-p) unless necessary (requires root)
4. **Filter output** with specific tags to reduce processing time
5. **Export format** is fastest for script parsing
6. **Cache device listings** in long-running processes
7. **Batch queries** instead of individual device calls
8. **Use list format** (-o list) for human-readable output
9. **Parallel processing** for multiple device operations
10. **Avoid repeated cache clearing** in automated tasks

The `blkid` command is an essential utility for Linux system administration, providing reliable identification and metadata for block devices. Its ability to read filesystem information directly from devices makes it invaluable for storage management, automated mounting, and system maintenance tasks. By understanding its various output formats and filtering options, administrators can effectively integrate blkid into scripts and automated workflows for robust storage device management.