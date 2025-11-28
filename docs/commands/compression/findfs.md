---
title: findfs - Find filesystem by label or UUID
sidebar_label: findfs
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# findfs - Find filesystem by label or UUID

The `findfs` command is a utility used to find a filesystem by its label or UUID (Universally Unique Identifier). This command is particularly useful in system administration tasks where you need to locate filesystems without knowing their device names. The findfs utility is part of the util-linux package and provides a reliable way to identify filesystems regardless of their current mount point or device assignment, which can change across system reboots or hardware reconfigurations.

## Basic Syntax

```bash
findfs LABEL=<label>
findfs UUID=<uuid>
findfs PARTLABEL=<partlabel>
findfs PARTUUID=<partuuid>
```

## Common Search Types

- `LABEL=<label>` - Find filesystem by volume label
- `UUID=<uuid>` - Find filesystem by UUID
- `PARTLABEL=<partlabel>` - Find partition by partition label
- `PARTUUID=<partuuid>` - Find partition by partition UUID

## Common Options

### Output Options
- `-V, --version` - Display version information
- `-h, --help` - Display help message

### Search Modifiers
- No additional options - findfs uses a straightforward syntax with search type and value

## Usage Examples

### Basic Filesystem Discovery

#### Finding by Label
```bash
# Find filesystem with label 'DATA'
findfs LABEL=DATA

# Find filesystem with label 'ROOT'
findfs LABEL=ROOT

# Find filesystem with label containing spaces
findfs LABEL="Data Volume"

# Find filesystem with label 'HOME'
findfs LABEL=HOME
```

#### Finding by UUID
```bash
# Find filesystem by specific UUID
findfs UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890

# Find filesystem by shortened UUID (partial match)
findfs UUID=a1b2c3d4

# Find root filesystem UUID (common in /etc/fstab)
findfs UUID=$(blkid -s UUID -o value /dev/sda1)
```

#### Finding by Partition Attributes
```bash
# Find partition by partition label
findfs PARTLABEL="EFI System Partition"

# Find partition by partition UUID
findfs PARTUUID=1234-5678

# Find boot partition
findfs PARTLABEL="boot"
```

## Practical Examples

### System Administration

#### Boot Configuration Management
```bash
# Find root filesystem for GRUB configuration
ROOT_DEVICE=$(findfs LABEL=ROOT)
echo "Root device: $ROOT_DEVICE"

# Find boot partition for bootloader setup
BOOT_PARTITION=$(findfs PARTLABEL="EFI System Partition")
echo "Boot partition: $BOOT_PARTITION"

# Update /etc/fstab with correct UUIDs
echo "UUID=$(blkid -s UUID -o value /dev/sda1) / ext4 defaults 0 1" >> /etc/fstab

# Find all filesystems and their labels
for device in /dev/sd*; do
    if [ -b "$device" ]; then
        label=$(blkid -s LABEL -o value "$device" 2>/dev/null)
        if [ -n "$label" ]; then
            found=$(findfs LABEL="$label" 2>/dev/null)
            echo "$device -> $label -> $found"
        fi
    fi
done
```

#### Storage Device Management
```bash
# Identify data drive for mounting
DATA_DRIVE=$(findfs LABEL=BACKUP)
mount "$DATA_DRIVE" /mnt/backup

# Find and mount user data partition
USER_PARTITION=$(findfs LABEL=USER_DATA)
mount "$USER_PARTITION" /home/user

# Check if filesystem exists before operations
if findfs LABEL=DATABASE >/dev/null 2>&1; then
    echo "Database filesystem found"
    mount "$(findfs LABEL=DATABASE)" /mnt/database
else
    echo "Database filesystem not found"
fi

# List all available labeled filesystems
lsblk -o NAME,LABEL,UUID,MOUNTPOINT | grep -E "(LABEL|UUID)"
```

#### Backup and Recovery Operations
```bash
# Find backup drive for automated backups
BACKUP_DEVICE=$(findfs LABEL=BACKUP_DRIVE 2>/dev/null)
if [ -n "$BACKUP_DEVICE" ]; then
    echo "Backup drive found: $BACKUP_DEVICE"
    rsync -av /home/ "$BACKUP_DEVICE"/backup/
else
    echo "Backup drive not found"
fi

# Recovery script using filesystem labels
#!/bin/bash
# Mount critical filesystems by label

critical_fs=("ROOT" "HOME" "VAR" "TMP")
for fs_label in "${critical_fs[@]}"; do
    device=$(findfs LABEL="$fs_label" 2>/dev/null)
    if [ -n "$device" ]; then
        echo "Found $fs_label at $device"
        mkdir -p "/mnt/recovery/$fs_label"
        mount "$device" "/mnt/recovery/$fs_label"
    else
        echo "Warning: $fs_label not found"
    fi
done
```

### System Diagnostics

#### Filesystem Troubleshooting
```bash
# Check if all required filesystems are accessible
required_labels=("ROOT" "HOME" "SWAP")
missing_fs=()

for label in "${required_labels[@]}"; do
    if ! findfs LABEL="$label" >/dev/null 2>&1; then
        missing_fs+=("$label")
    fi
done

if [ ${#missing_fs[@]} -gt 0 ]; then
    echo "Missing filesystems: ${missing_fs[*]}"
else
    echo "All required filesystems found"
fi

# Verify filesystem integrity by finding and checking
for label in $(blkid -s LABEL -o value); do
    device=$(findfs LABEL="$label" 2>/dev/null)
    if [ -n "$device" ]; then
        echo "Checking $label ($device)..."
        fsck -n "$device"
    fi
done
```

#### Disk Usage Analysis by Label
```bash
# Analyze disk space usage for labeled filesystems
for label in $(blkid -s LABEL -o value 2>/dev/null | sort -u); do
    device=$(findfs LABEL="$label" 2>/dev/null)
    if [ -n "$device" ] && [ -b "$device" ]; then
        echo "=== $label ==="
        df -h "$device"
        echo ""
    fi
done

# Find and monitor filesystems with specific labels
monitor_labels=("DATABASE" "LOGS" "CACHE")
while true; do
    clear
    echo "Filesystem Monitor - $(date)"
    echo "=========================="
    for label in "${monitor_labels[@]}"; do
        device=$(findfs LABEL="$label" 2>/dev/null)
        if [ -n "$device" ]; then
            usage=$(df -h "$device" | awk 'NR==2 {print $5}' | sed 's/%//')
            echo "$label: ${usage}% used"
            if [ "$usage" -gt 80 ]; then
                echo "  WARNING: High usage on $label"
            fi
        fi
    done
    sleep 60
done
```

### Development and Testing

#### Test Environment Setup
```bash
# Create test filesystems with specific labels
setup_test_filesystems() {
    local test_labels=("TEST_ROOT" "TEST_HOME" "TEST_DATA")

    for label in "${test_labels[@]}"; do
        # Create test file
        test_file="/tmp/test_${label,,}.img"
        dd if=/dev/zero of="$test_file" bs=1M count=100

        # Create filesystem
        mkfs.ext4 -L "$label" "$test_file"

        # Setup loop device
        loop_device=$(losetup -f --show "$test_file")
        echo "Created $label on $loop_device"
    done
}

# Test findfs functionality
test_findfs() {
    local test_labels=("TEST_ROOT" "TEST_HOME" "TEST_DATA")

    echo "Testing findfs functionality..."
    for label in "${test_labels[@]}"; do
        device=$(findfs LABEL="$label" 2>/dev/null)
        if [ -n "$device" ]; then
            echo "✓ Found $label at $device"
        else
            echo "✗ Failed to find $label"
        fi
    done
}

# Cleanup test environment
cleanup_test_environment() {
    losetup -D
    rm -f /tmp/test_*.img
}
```

#### Automated Testing Script
```bash
#!/bin/bash
# Comprehensive findfs testing suite

findfs_test_suite() {
    local passed=0
    local failed=0

    # Test 1: Find by existing label
    echo "Test 1: Find by existing label"
    if findfs LABEL=ROOT >/dev/null 2>&1; then
        echo "✓ PASS: Found ROOT label"
        ((passed++))
    else
        echo "✗ FAIL: Could not find ROOT label"
        ((failed++))
    fi

    # Test 2: Find by UUID (if available)
    echo "Test 2: Find by UUID"
    root_uuid=$(blkid -s UUID -o value /dev/sda1 2>/dev/null)
    if [ -n "$root_uuid" ] && findfs UUID="$root_uuid" >/dev/null 2>&1; then
        echo "✓ PASS: Found filesystem by UUID"
        ((passed++))
    else
        echo "✗ FAIL: Could not find filesystem by UUID"
        ((failed++))
    fi

    # Test 3: Handle non-existent filesystem
    echo "Test 3: Handle non-existent filesystem"
    if ! findfs LABEL=NONEXISTENT >/dev/null 2>&1; then
        echo "✓ PASS: Correctly failed for non-existent label"
        ((passed++))
    else
        echo "✗ FAIL: Should have failed for non-existent label"
        ((failed++))
    fi

    echo "Test Results: $passed passed, $failed failed"
    return $failed
}

# Run the test suite
findfs_test_suite
```

## Advanced Usage

### Complex Filesystem Operations

#### Multi-disk System Management
```bash
# Script to identify and mount all labeled filesystems
mount_all_labeled_filesystems() {
    local mount_base="/mnt"
    local mounted_count=0

    echo "Scanning for labeled filesystems..."

    # Get all unique filesystem labels
    while IFS= read -r label; do
        if [ -n "$label" ]; then
            device=$(findfs LABEL="$label" 2>/dev/null)
            if [ -n "$device" ] && ! mountpoint -q "${mount_base}/${label}"; then
                # Create mount point if it doesn't exist
                mkdir -p "${mount_base}/${label}"

                # Mount the filesystem
                if mount "$device" "${mount_base}/${label}"; then
                    echo "Mounted $label ($device) at ${mount_base}/${label}"
                    ((mounted_count++))
                else
                    echo "Failed to mount $label ($device)"
                fi
            fi
        fi
    done < <(blkid -s LABEL -o value 2>/dev/null | sort -u)

    echo "Mounted $mounted_count filesystems"
}

# Unmount all labeled filesystems
unmount_all_labeled_filesystems() {
    local mount_base="/mnt"
    local unmounted_count=0

    for mount_point in "$mount_base"/*; do
        if mountpoint -q "$mount_point"; then
            if umount "$mount_point"; then
                echo "Unmounted $mount_point"
                ((unmounted_count++))
            else
                echo "Failed to unmount $mount_point"
            fi
        fi
    done

    echo "Unmounted $unmounted_count filesystems"
}
```

#### Filesystem Migration Tools
```bash
# Migrate data from one labeled filesystem to another
migrate_filesystem_data() {
    local source_label="$1"
    local target_label="$2"

    source_device=$(findfs LABEL="$source_label" 2>/dev/null)
    target_device=$(findfs LABEL="$target_label" 2>/dev/null)

    if [ -z "$source_device" ]; then
        echo "Error: Source filesystem '$source_label' not found"
        return 1
    fi

    if [ -z "$target_device" ]; then
        echo "Error: Target filesystem '$target_label' not found"
        return 1
    fi

    # Create mount points
    mkdir -p "/mnt/source" "/mnt/target"

    # Mount filesystems
    mount "$source_device" /mnt/source
    mount "$target_device" /mnt/target

    # Perform migration
    echo "Migrating data from $source_label to $target_label..."
    rsync -av --progress /mnt/source/ /mnt/target/

    # Cleanup
    umount /mnt/source /mnt/target
    rmdir /mnt/source /mnt/target

    echo "Migration completed"
}

# Usage example
# migrate_filesystem_data "OLD_DATA" "NEW_DATA"
```

### Integration with System Tools

#### GRUB Configuration Helper
```bash
# Update GRUB configuration using findfs
update_grub_with_labels() {
    local grub_cfg="/boot/grub/grub.cfg"
    local temp_cfg="/tmp/grub.cfg.tmp"

    echo "Updating GRUB configuration with device labels..."

    # Create new GRUB configuration
    cat > "$temp_cfg" << 'EOF'
# GRUB configuration generated by findfs helper
set default=0
set timeout=5

# Find root filesystem
search --no-floppy --set=root --label ROOT
linux /boot/vmlinuz-$(uname -r) root=LABEL=ROOT ro
initrd /boot/initrd.img-$(uname -r)
EOF

    # Backup original configuration
    cp "$grub_cfg" "${grub_cfg}.backup"

    # Install new configuration
    mv "$temp_cfg" "$grub_cfg"

    echo "GRUB configuration updated successfully"
    echo "Original configuration backed up as ${grub_cfg}.backup"
}
```

#### System Backup Configuration
```bash
# Configure automated backup using filesystem labels
configure_backup_system() {
    local config_file="/etc/backup.conf"
    local backup_labels=("BACKUP" "ARCHIVE" "STORAGE")

    cat > "$config_file" << 'EOF'
# Backup configuration using filesystem labels
# Generated by findfs helper script
EOF

    for label in "${backup_labels[@]}"; do
        device=$(findfs LABEL="$label" 2>/dev/null)
        if [ -n "$device" ]; then
            echo "BACKUP_DEVICE_${label}=$device" >> "$config_file"
            echo "BACKUP_MOUNT_${label}=/mnt/${label,,}" >> "$config_file"
        fi
    done

    echo "Backup configuration created at $config_file"
}
```

## Troubleshooting

### Common Issues

#### Filesystem Not Found
```bash
# Issue: findfs cannot locate a filesystem
# Solution: Check if the filesystem actually exists and has a label

# Debug function to verify filesystem existence
debug_findfs() {
    local search_type="$1"  # LABEL, UUID, PARTLABEL, PARTUUID
    local search_value="$2"

    echo "Debug: Searching for $search_type=$search_value"

    # Check all block devices
    echo "Available block devices:"
    lsblk -f

    # Search for the specific value in blkid output
    echo "Searching in blkid output:"
    blkid | grep -i "$search_value"

    # Try to find with findfs
    echo "findfs result:"
    findfs "$search_type=$search_value" 2>&1
}

# Usage: debug_findfs "LABEL" "DATA"
```

#### Multiple Filesystems with Same Label
```bash
# Issue: Multiple filesystems have the same label
# Solution: Use UUID or device-specific identification

handle_duplicate_labels() {
    local label="$1"
    local devices=()

    # Find all devices with the specified label
    while IFS= read -r device; do
        devices+=("$device")
    done < <(blkid -l -t LABEL="$label" -o device)

    if [ ${#devices[@]} -gt 1 ]; then
        echo "Warning: Multiple devices found with label '$label':"
        for i in "${!devices[@]}"; do
            uuid=$(blkid -s UUID -o value "${devices[$i]}")
            echo "  ${devices[$i]} (UUID: $uuid)"
        done

        # Suggest using UUID instead
        echo "Consider using UUID for specific identification:"
        for i in "${!devices[@]}"; do
            uuid=$(blkid -s UUID -o value "${devices[$i]}")
            echo "  findfs UUID=$uuid"
        done
    fi
}

# Usage: handle_duplicate_labels "DATA"
```

#### Permission Issues
```bash
# Issue: findfs requires root privileges for some operations
# Solution: Check permissions and run with appropriate privileges

check_findfs_permissions() {
    if [ "$EUID" -ne 0 ]; then
        echo "Warning: findfs may require root privileges to access all block devices"
        echo "Current user: $(whoami)"
        echo "Try running with sudo if filesystem is not found"

        # Show what devices are accessible to current user
        echo "Devices accessible to current user:"
        find /dev -name "sd*" -type b 2>/dev/null | head -5
    else
        echo "Running with root privileges - full device access available"
    fi
}
```

## Related Commands

- [`blkid`](/docs/commands/system/blkid) - Locate/print block device attributes
- [`lsblk`](/docs/commands/system/lsblk) - List block devices
- [`mount`](/docs/commands/system/mount) - Mount a filesystem
- [`umount`](/docs/commands/system/umount) - Unmount filesystems
- [`fsck`](/docs/commands/compression/fsck) - Check and repair a Linux filesystem
- [`parted`](/docs/commands/system/parted) - Partition manipulation utility
- [`fdisk`](/docs/commands/system/fdisk) - Partition table manipulator

## Best Practices

1. **Use UUIDs for critical filesystems** - More reliable than labels for system partitions
2. **Label filesystems during creation** - Use descriptive names for easy identification
3. **Backup filesystem labels** - Document your labeling scheme for recovery purposes
4. **Test findfs in recovery scenarios** - Ensure you can locate filesystems when needed
5. **Use unique labels** - Avoid duplicate labels to prevent confusion
6. **Combine with other tools** - Use findfs with blkid and lsblk for comprehensive device management
7. **Script error handling** - Always check if findfs succeeds before using the returned device
8. **Regular validation** - Periodically verify that labeled filesystems are accessible

## Performance Tips

1. **findfs is fast** - Direct lookup mechanism provides quick results
2. **Cache results** - In scripts, cache findfs results if used repeatedly
3. **Use specific searches** - UUID searches are typically faster than label searches
4. **Batch operations** - Combine multiple findfs calls in scripts to minimize overhead
5. **Avoid loops** - Use blkid with filters for finding multiple filesystems efficiently

The `findfs` command is an essential utility for system administrators and developers who need reliable filesystem identification. Its ability to locate filesystems by labels and UUIDs makes it invaluable for system recovery, automated mounting, and device-independent configuration management. By combining findfs with other system utilities, you can create robust scripts that adapt to changing hardware configurations and maintain system stability across reboots and hardware changes.