---
title: e2label - Change ext2/ext3/ext4 filesystem label
sidebar_label: e2label
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# e2label - Change ext2/ext3/ext4 filesystem label

The `e2label` command is a utility for displaying or changing the filesystem label on ext2, ext3, and ext4 filesystems. A filesystem label is a human-readable name that can be assigned to a filesystem partition, making it easier to identify and manage storage devices. Labels are particularly useful for mounting filesystems by name rather than device path, which provides more stable and flexible system configuration, especially when device names may change between reboots.

## Basic Syntax

```bash
e2label device [newlabel]
```

## Parameters

- `device` - The block device containing the ext2/ext3/ext4 filesystem (e.g., /dev/sda1, /dev/nvme0n1p2)
- `newlabel` - Optional new label to assign to the filesystem (maximum 16 characters)

## Usage Examples

### Basic Operations

#### Viewing Filesystem Labels
```bash
# Display the current label of a filesystem
e2label /dev/sda1

# Display labels for multiple filesystems
for device in /dev/sd*; do
    if [ -b "$device" ]; then
        echo "Device: $device"
        e2label "$device" 2>/dev/null || echo "No label or not ext filesystem"
        echo "---"
    fi
done

# Check if a device has an ext filesystem and display its label
blkid | grep ext
```

#### Setting Filesystem Labels
```bash
# Set a simple label
e2label /dev/sda1 "DATA"

# Set a label for the root filesystem
e2label /dev/sda2 "ROOT"

# Set a label for home partition
e2label /dev/sda3 "HOME"

# Set a label with descriptive name
e2label /dev/sdb1 "BACKUP_DRIVE"

# Remove a label (set to empty string)
e2label /dev/sda1 ""
```

### System Administration

#### Initial Setup and Configuration
```bash
# Label partitions during system setup
e2label /dev/sda1 "BOOT"      # Usually /boot partition
e2label /dev/sda2 "ROOT"      # Root filesystem
e2label /dev/sda3 "HOME"      # /home partition
e2label /dev/sda4 "DATA"      # Data storage partition
e2label /dev/sdb1 "BACKUP"    # Backup drive
e2label /dev/sdc1 "MEDIA"     # Media files

# Verify all labels are set correctly
blkid -o list

# Display filesystem information with labels
df -h -T | grep ext
```

#### Mount Configuration with Labels
```bash
# Create mount points
sudo mkdir -p /mnt/{data,backup,media}

# Add entries to /etc/fstab using labels
echo 'LABEL="DATA"    /mnt/data    ext4    defaults    0    2' | sudo tee -a /etc/fstab
echo 'LABEL="BACKUP"  /mnt/backup  ext4    defaults    0    2' | sudo tee -a /etc/fstab
echo 'LABEL="MEDIA"   /mnt/media   ext4    defaults    0    2' | sudo tee -a /etc/fstab

# Mount filesystems by label
sudo mount LABEL="DATA" /mnt/data
sudo mount LABEL="BACKUP" /mnt/backup
sudo mount LABEL="MEDIA" /mnt/media

# Test fstab entries
sudo mount -a
```

### Advanced Operations

#### Mass Labeling Operations
```bash
#!/bin/bash
# Script to label multiple filesystems systematically

# Define devices and their labels
declare -A device_labels=(
    ["/dev/sda1"]="BOOT"
    ["/dev/sda2"]="ROOT"
    ["/dev/sda3"]="HOME"
    ["/dev/sda4"]="VAR"
    ["/dev/sdb1"]="DATA1"
    ["/dev/sdb2"]="DATA2"
    ["/dev/sdc1"]="BACKUP"
    ["/dev/sdc2"]="ARCHIVE"
)

# Apply labels to devices
for device in "${!device_labels[@]}"; do
    label="${device_labels[$device]}"

    # Check if device exists
    if [ -b "$device" ]; then
        echo "Labeling $device as '$label'"
        e2label "$device" "$label"

        # Verify the label was set
        current_label=$(e2label "$device")
        if [ "$current_label" = "$label" ]; then
            echo "✓ Successfully labeled $device as $label"
        else
            echo "✗ Failed to label $device as $label"
        fi
    else
        echo "⚠ Device $device does not exist"
    fi
    echo "---"
done

# Display final state
echo "Final filesystem labels:"
blkid | grep ext
```

#### Backup and Recovery Configuration
```bash
# Label backup devices with dates and purposes
BACKUP_DATE=$(date +%Y%m%d)
e2label /dev/sdb1 "BACKUP_${BACKUP_DATE}"
e2label /dev/sdb2 "INCREMENTAL_${BACKUP_DATE}"

# Create rotation labels for backup strategy
e2label /dev/sdc1 "BACKUP_DAILY"
e2label /dev/sdc2 "BACKUP_WEEKLY"
e2label /dev/sdd1 "BACKUP_MONTHLY"

# Monitor backup filesystem status
for mount_label in BACKUP_DAILY BACKUP_WEEKLY BACKUP_MONTHLY; do
    device=$(blkid -L "$mount_label" 2>/dev/null)
    if [ -n "$device" ]; then
        echo "Checking $mount_label ($device):"
        sudo fsck -n "$device"
        echo "---"
    fi
done
```

#### Virtual Machine and Container Setup
```bash
# Label filesystems for VM environments
e2label /dev/vda1 "VM_ROOT"
e2label /dev/vda2 "VM_SWAP"
e2label /dev/vdb1 "VM_DATA"
e2label /dev/vdc1 "VM_IMAGES"

# Container storage labeling
e2label /dev/sdd1 "CONTAINERS"
e2label /dev/sdd2 "DOCKER_VOLUMES"
e2label /dev/sde1 "KUBERNETES"

# Setup mounts for container environments
echo 'LABEL="CONTAINERS"      /var/lib/containers    ext4    defaults    0    2' | sudo tee -a /etc/fstab
echo 'LABEL="DOCKER_VOLUMES"  /var/lib/docker        ext4    defaults    0    2' | sudo tee -a /etc/fstab
echo 'LABEL="KUBERNETES"      /var/lib/kubelet       ext4    defaults    0    2' | sudo tee -a /etc/fstab
```

### Troubleshooting and Maintenance

#### Diagnostic Operations
```bash
# Check filesystem label consistency
echo "=== Filesystem Label Report ==="
echo "Generated on: $(date)"
echo ""

# List all ext filesystems with their labels
for device in $(lsblk -o NAME,FSTYPE -n | grep ext | awk '{print "/dev/"$1}'); do
    if [ -b "$device" ]; then
        label=$(e2label "$device" 2>/dev/null)
        fstype=$(blkid -o value -s TYPE "$device" 2>/dev/null)
        size=$(lsblk -b -o SIZE -n "$device" 2>/dev/null | numfmt --to=iec)

        printf "%-15s %-8s %-10s %s\n" "$device" "$fstype" "$label" "$size"
    fi
done

# Check for duplicate labels
echo ""
echo "=== Duplicate Label Check ==="
blkid -o value -s LABEL | sort | uniq -d | while read label; do
    if [ -n "$label" ]; then
        echo "Duplicate label found: $label"
        blkid -L "$label"
    fi
done
```

#### Recovery Operations
```bash
# Fix missing or incorrect labels after hardware changes
echo "=== Filesystem Label Recovery ==="

# Auto-detect and suggest labels based on mount points
for mount_point in / /home /var /tmp /usr /opt; do
    device=$(findmnt -n -o SOURCE "$mount_point" 2>/dev/null)
    if [ -n "$device" ] && [[ "$device" == /dev/* ]]; then
        current_label=$(e2label "$device" 2>/dev/null)

        # Suggest label based on mount point
        suggested_label=$(echo "$mount_point" | tr '/' '_' | sed 's/^_//')
        suggested_label=$(echo "$suggested_label" | tr '[:lower:]' '[:upper:]')

        if [ -z "$current_label" ]; then
            echo "No label for $device ($mount_point). Suggested: $suggested_label"
            read -p "Apply label '$suggested_label'? [y/N]: " confirm
            if [[ "$confirm" =~ ^[Yy]$ ]]; then
                e2label "$device" "$suggested_label"
                echo "✓ Applied label $suggested_label to $device"
            fi
        fi
    fi
done
```

#### Maintenance Scripts
```bash
#!/bin/bash
# Filesystem label maintenance script

LABEL_LOG="/var/log/filesystem_labels.log"
BACKUP_CONFIG="/etc/fstab"

# Function to log actions
log_action() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LABEL_LOG"
}

# Function to backup current configuration
backup_config() {
    cp "$BACKUP_CONFIG" "${BACKUP_CONFIG}.backup.$(date +%Y%m%d)"
    log_action "Backed up fstab configuration"
}

# Function to verify all critical filesystems have labels
verify_labels() {
    echo "=== Verifying Critical Filesystem Labels ==="
    critical_mounts=("/" "/home" "/var" "/usr")

    for mount in "${critical_mounts[@]}"; do
        device=$(findmnt -n -o SOURCE "$mount" 2>/dev/null)
        if [ -n "$device" ] && [[ "$device" == /dev/* ]]; then
            label=$(e2label "$device" 2>/dev/null)
            if [ -z "$label" ]; then
                echo "⚠ WARNING: No label for $device ($mount)"
                suggested_label=$(echo "$mount" | tr '/' '_' | sed 's/^_//' | tr '[:lower:]' '[:upper:]')
                echo "  Suggested label: $suggested_label"
            else
                echo "✓ $device ($mount) has label: $label"
            fi
        fi
    done
}

# Function to check for problematic label names
check_label_names() {
    echo "=== Checking Label Names ==="

    for device in $(blkid -o device -t TYPE=ext4); do
        label=$(e2label "$device" 2>/dev/null)
        if [ -n "$label" ]; then
            # Check for spaces
            if [[ "$label" =~ \  ]]; then
                echo "⚠ WARNING: Label '$label' contains spaces on $device"
            fi

            # Check length (max 16 characters for ext2/3/4)
            if [ ${#label} -gt 16 ]; then
                echo "⚠ WARNING: Label '$label' exceeds 16 characters on $device"
            fi

            # Check for special characters
            if [[ "$label" =~ [^a-zA-Z0-9_-] ]]; then
                echo "⚠ WARNING: Label '$label' contains special characters on $device"
            fi
        fi
    done
}

# Run maintenance checks
verify_labels
check_label_names

# Offer to fix issues
echo ""
read -p "Backup current fstab configuration? [y/N]: " backup_confirm
if [[ "$backup_confirm" =~ ^[Yy]$ ]]; then
    backup_config
fi

echo "Filesystem label maintenance completed."
log_action "Filesystem label maintenance completed"
```

## Special Operations

#### Multi-Boot System Configuration
```bash
# Setup labels for multi-boot environments
e2label /dev/sda2 "UBUNTU_2204"
e2label /dev/sda3 "WINDOWS_DATA"
e2label /dev/sda4 "SHARED_DATA"

# Create cross-platform compatible mount points
sudo mkdir -p /mnt/{ubuntu,windows,shared}

# Configure automatic mounting in /etc/fstab
cat << EOF | sudo tee -a /etc/fstab
# Multi-boot configuration
LABEL="UBUNTU_2204"  /mnt/ubuntu   ext4    defaults,ro  0  2
LABEL="WINDOWS_DATA" /mnt/windows  ntfs-3g defaults,uid=1000,gid=1000  0  2
LABEL="SHARED_DATA"  /mnt/shared   ext4    defaults,uid=1000,gid=1000  0  2
EOF

# Test the configuration
sudo mount -a
df -h | grep -E "(ubuntu|windows|shared)"
```

#### Network Attached Storage (NAS) Setup
```bash
# Label filesystems for NAS deployment
e2label /dev/md0 "RAID1_SYSTEM"     # RAID-1 system array
e2label /dev/md1 "RAID5_DATA"       # RAID-5 data array
e2label /dev/md2 "RAID6_BACKUP"     # RAID-6 backup array
e2label /dev/md3 "RAID10_CACHE"     # RAID-10 cache array

# Configure NAS mounts
sudo mkdir -p /mnt/{system,data,backup,cache}

cat << EOF | sudo tee -a /etc/fstab
# NAS RAID Configuration
LABEL="RAID1_SYSTEM"  /mnt/system   ext4    defaults,noatime        0  2
LABEL="RAID5_DATA"    /mnt/data     ext4    defaults,noatime        0  2
LABEL="RAID6_BACKUP"  /mnt/backup   ext4    defaults,noatime        0  2
LABEL="RAID10_CACHE"  /mnt/cache    ext4    defaults,noatime        0  2
EOF

# Monitor RAID status with labels
for array_label in RAID1_SYSTEM RAID5_DATA RAID6_BACKUP RAID10_CACHE; do
    device=$(blkid -L "$array_label" 2>/dev/null)
    if [ -n "$device" ]; then
        echo "Checking $array_label ($device):"
        if [[ "$device" == /dev/md* ]]; then
            cat /proc/mdstat | grep "$(basename $device)"
        fi
    fi
done
```

## Integration and Automation

### System Integration Scripts

#### Automated Disk Management
```bash
#!/bin/bash
# Automated disk labeling and management system

CONFIG_FILE="/etc/disk-labels.conf"
LOG_FILE="/var/log/disk-management.log"

# Function to log operations
log_operation() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to detect new disks and suggest labels
detect_new_disks() {
    log_operation "Scanning for new disks..."

    # Find unpartitioned disks or disks without ext filesystems
    for disk in $(lsblk -d -o NAME -n | grep -E '^sd|^nvme|^vd'); do
        device="/dev/$disk"

        # Skip if already has ext filesystem
        if blkid -o value -s TYPE "$device" 2>/dev/null | grep -q "ext"; then
            continue
        fi

        # Check if disk has partitions
        partitions=$(lsblk -l -o NAME "$device" | grep -E "${disk}[0-9]+" | wc -l)

        if [ "$partitions" -eq 0 ]; then
            echo "New unpartitioned disk found: $disk ($(lsblk -d -o SIZE -n "$device"))"

            # Suggest partitioning and labeling
            read -p "Partition and label $disk? [y/N]: " confirm
            if [[ "$confirm" =~ ^[Yy]$ ]]; then
                # Create single partition covering entire disk
                echo -e "n\np\n1\n\n\nw" | sudo fdisk "$device"

                # Format as ext4
                partition="${device}1"
                sudo mkfs.ext4 "$partition"

                # Suggest label
                read -p "Enter label for $partition: " label
                if [ -n "$label" ]; then
                    sudo e2label "$partition" "$label"
                    log_operation "Created partition $partition with label '$label'"
                fi
            fi
        fi
    done
}

# Function to validate and fix labels
validate_labels() {
    log_operation "Validating filesystem labels..."

    issues_found=false

    for device in $(blkid -o device -t TYPE=ext4); do
        label=$(e2label "$device" 2>/dev/null)

        # Check for missing labels on mounted filesystems
        if [ -z "$label" ]; then
            mount_point=$(findmnt -n -o TARGET "$device" 2>/dev/null)
            if [ -n "$mount_point" ]; then
                echo "⚠ Mounted filesystem $device ($mount_point) has no label"
                issues_found=true
            fi
        fi

        # Check for problematic labels
        if [ -n "$label" ]; then
            if [[ "$label" =~ \  ]]; then
                echo "⚠ Label '$label' on $device contains spaces"
                issues_found=true
            fi

            if [ ${#label} -gt 16 ]; then
                echo "⚠ Label '$label' on $device exceeds 16 characters"
                issues_found=true
            fi
        fi
    done

    if [ "$issues_found" = true ]; then
        log_operation "Label validation issues found"
        return 1
    else
        log_operation "All labels are valid"
        return 0
    fi
}

# Main execution
case "${1:-scan}" in
    "scan")
        detect_new_disks
        ;;
    "validate")
        validate_labels
        ;;
    "report")
        echo "=== Filesystem Label Report ==="
        blkid -o list | grep ext
        ;;
    *)
        echo "Usage: $0 [scan|validate|report]"
        exit 1
        ;;
esac
```

#### Backup Configuration Generator
```bash
#!/bin/bash
# Generate backup configuration based on filesystem labels

FSTAB_FILE="/etc/fstab"
BACKUP_CONFIG="/etc/backup-config.conf"

# Generate backup configuration from labeled filesystems
generate_backup_config() {
    echo "# Backup configuration generated from filesystem labels" > "$BACKUP_CONFIG"
    echo "# Generated on: $(date)" >> "$BACKUP_CONFIG"
    echo "" >> "$BACKUP_CONFIG"

    # Find backup-related labels
    for device in $(blkid -o device -t TYPE=ext4); do
        label=$(e2label "$device" 2>/dev/null)

        if [[ "$label" =~ ^(BACKUP|ARCHIVE|STORAGE) ]]; then
            mount_point=$(findmnt -n -o TARGET "$device" 2>/dev/null)

            if [ -n "$mount_point" ]; then
                echo "# Backup destination: $label" >> "$BACKUP_CONFIG"
                echo "BACKUP_DEST_${label}=\"${mount_point}\"" >> "$BACKUP_CONFIG"
                echo "BACKUP_DEVICE_${label}=\"${device}\"" >> "$BACKUP_CONFIG"
                echo "" >> "$BACKUP_CONFIG"
            fi
        fi
    done

    echo "Backup configuration generated: $BACKUP_CONFIG"
}

# Generate backup scripts based on labels
generate_backup_scripts() {
    SCRIPTS_DIR="/usr/local/bin/backup-scripts"
    sudo mkdir -p "$SCRIPTS_DIR"

    for device in $(blkid -o device -t TYPE=ext4); do
        label=$(e2label "$device" 2>/dev/null)

        if [[ "$label" =~ ^(BACKUP|ARCHIVE|STORAGE) ]]; then
            mount_point=$(findmnt -n -o TARGET "$device" 2>/dev/null)

            if [ -n "$mount_point" ]; then
                script_file="$SCRIPTS_DIR/backup-to-${label,,}.sh"

                cat << EOF | sudo tee "$script_file"
#!/bin/bash
# Backup script for $label

BACKUP_DEST="$mount_point"
BACKUP_NAME="\$(date +%Y%m%d_%H%M%S)"
SOURCE_DIR="/home/user"

echo "Starting backup to $label (\$BACKUP_DEST)..."
rsync -av --progress "\$SOURCE_DIR" "\$BACKUP_DEST/\${BACKUP_NAME}/"

if [ \$? -eq 0 ]; then
    echo "Backup completed successfully"
    echo "Backup location: \$BACKUP_DEST/\${BACKUP_NAME}/"
else
    echo "Backup failed"
    exit 1
fi
EOF

                sudo chmod +x "$script_file"
                echo "Generated backup script: $script_file"
            fi
        fi
    done
}

# Execute functions
generate_backup_config
generate_backup_scripts

echo "Backup system configuration completed."
```

## Troubleshooting

### Common Issues and Solutions

#### Device Not Found Errors
```bash
# Error: e2label: No such file or directory while trying to open /dev/sda1
# Solution: Check if device exists and is accessible

# Verify device exists
ls -la /dev/sda1

# Check if it's a block device
[ -b /dev/sda1 ] && echo "Block device found" || echo "Not a block device"

# List all block devices
lsblk

# Try to identify the correct device
sudo fdisk -l
```

#### Permission Denied Errors
```bash
# Error: e2label: Permission denied while trying to open /dev/sda1
# Solution: Run with appropriate privileges

# Check if running as root
[ "$EUID" -eq 0 ] && echo "Running as root" || echo "Not running as root"

# Use sudo
sudo e2label /dev/sda1 "NEW_LABEL"

# Check device permissions
ls -la /dev/sda1

# Add user to disk group (temporary solution)
sudo usermod -a -G disk $USER
# Note: User needs to log out and log back in for changes to take effect
```

#### Filesystem Not Unmounted
```bash
# Error: e2label: Device or resource busy while trying to open /dev/sda1
# Solution: Unmount the filesystem first

# Check if filesystem is mounted
findmnt /dev/sda1
mount | grep /dev/sda1

# Unmount the filesystem
sudo umount /dev/sda1

# If unmount fails, check what's using it
sudo lsof /dev/sda1
sudo fuser -v /dev/sda1

# Force unmount (last resort)
sudo umount -l /dev/sda1

# After unmounting, change the label
sudo e2label /dev/sda1 "NEW_LABEL"
```

#### Label Too Long
```bash
# Error: e2label: Label too long
# Solution: Keep label under 16 characters

# Check current label length
current_label=$(e2label /dev/sda1)
echo "Current label length: ${#current_label}"

# Set a shorter label
sudo e2label /dev/sda1 "SHORT"

# Generate label from directory name with length limit
dir_name="/home/user/documents"
short_label=$(basename "$dir_name" | head -c 12)
echo "Suggested label: $short_label"
```

## Related Commands

- [`blkid`](/docs/commands/system/blkid) - Display block device attributes
- [`findmnt`](/docs/commands/system/findmnt) - Find mount points
- [`mount`](/docs/commands/system/mount) - Mount filesystems
- [`umount`](/docs/commands/system/umount) - Unmount filesystems
- [`fsck`](/docs/commands/system/fsck) - Filesystem consistency check
- [`mkfs.ext4`](/docs/commands/system/mkfs) - Create ext4 filesystem
- [`tune2fs`](/docs/commands/system/tune2fs) - Adjust filesystem parameters
- [`lsblk`](/docs/commands/system/lsblk) - List block devices
- [`fdisk`](/docs/commands/system/fdisk) - Partition table manipulator
- [`parted`](/docs/commands/system/parted) - Partition manipulation tool

## Best Practices

1. **Use descriptive labels** that clearly indicate the filesystem's purpose
2. **Keep labels short** (under 16 characters) and avoid spaces
3. **Use consistent naming conventions** across all storage devices
4. **Label filesystems immediately** after creating them
5. **Update `/etc/fstab`** to use LABEL= entries for more robust mounting
6. **Avoid special characters** in labels; use only letters, numbers, hyphens, and underscores
7. **Test mounts** after changing labels to ensure everything works correctly
8. **Document your labeling scheme** for future reference
9. **Backup fstab** before making major changes to filesystem labels
10. **Use scripts** for consistent labeling across multiple systems

## Performance Tips

1. **Label changes are instantaneous** and don't require filesystem resizing
2. **Use labels instead of device paths** in `/etc/fstab` for better hardware compatibility
3. **Batch label operations** when setting up multiple filesystems
4. **Combine with udev rules** for automatic device handling
5. **Regular validation** of labels prevents configuration issues
6. **Use labels for backup rotation** to track backup destinations
7. **Implement monitoring** for filesystem label consistency
8. **Plan label names carefully** to avoid conflicts in multi-disk systems

The `e2label` command is an essential tool for managing ext2/ext3/ext4 filesystem labels, providing a robust way to identify and organize storage devices. Proper use of filesystem labels enhances system reliability by making mount configurations independent of specific device paths, which is particularly valuable in environments with dynamic hardware configurations or multi-disk setups.