---
title: blockdev - Block Device Utilities
sidebar_label: blockdev
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# blockdev - Block Device Utilities

The `blockdev` command is a powerful Linux utility that provides command-line access to block device I/O control functions. It's part of the util-linux package and allows system administrators to query and modify block device parameters directly from the command line. This tool is essential for storage performance tuning, device maintenance operations, troubleshooting block device issues, and managing device access permissions. Blockdev interacts with the kernel's block layer and can modify low-level storage device parameters that affect system performance and reliability.

## Basic Syntax

```bash
blockdev [OPTIONS] device
sudo blockdev [OPTIONS] device  # Most operations require root privileges
```

## Common Options

### Block Size Operations
- `--getbsz device` - Get logical block size in bytes
- `--setbsz BYTES device` - Set logical block size to BYTES (requires root)

### Read-Write Control
- `--setro device` - Set device to read-only mode
- `--setrw device` - Set device to read-write mode
- `--getro device` - Get read-only status (returns 1 if read-only, 0 if read-write)

### Size Information
- `--getsize device` - Get device size in 512-byte sectors
- `--getsize64 device` - Get device size in bytes
- `--getss device` - Get sector size in bytes

### Performance Tuning
- `--getra device` - Get current read-ahead setting (sectors)
- `--setra SECTORS device` - Set read-ahead value to SECTORS

### Maintenance Operations
- `--flushbufs device` - Flush device buffers
- `--rereadpt device` - Reread partition table after changes

### General Options
- `-h, --help` - Display help information
- `-V, --version` - Show version information

## Usage Examples

### Basic Device Information

#### Getting Device Details
```bash
# Get basic device information
blockdev --getsize64 /dev/sda        # Get device size in bytes
blockdev --getsize /dev/sda          # Get device size in 512-byte sectors
blockdev --getbsz /dev/sda           # Get logical block size
blockdev --getss /dev/sda            # Get physical sector size

# Get comprehensive device information
blockdev --getsize64 --getbsz --getss --getro /dev/sda

# Check multiple devices at once
for device in /dev/sda /dev/sdb /dev/nvme0n1; do
    echo "=== $device ==="
    blockdev --getsize64 $device
    blockdev --getbsz $device
    blockdev --getro $device
done
```

#### Read-Only Status
```bash
# Check if device is read-only
blockdev --getro /dev/sda            # Returns 1 if read-only, 0 if read-write

# Set device to read-only for maintenance
sudo blockdev --setro /dev/sda

# Set device back to read-write
sudo blockdev --setrw /dev/sda

# Check status before and after changes
echo "Before: $(blockdev --getro /dev/sda)"
sudo blockdev --setro /dev/sda
echo "After: $(blockdev --getro /dev/sda)"
```

### Block Size Management

#### Getting and Setting Block Size
```bash
# Get current block size
blockdev --getbsz /dev/sda

# Set block size to 4096 bytes (4K)
sudo blockdev --setbsz 4096 /dev/sda

# Set block size for different workloads
sudo blockdev --setbsz 512 /dev/sda           # Small block size for many small files
sudo blockdev --setbsz 4096 /dev/sda          # Large block size for database workloads
sudo blockdev --setbsz 8192 /dev/sda          # Very large blocks for sequential access

# Check if block size change was successful
sudo blockdev --setbsz 4096 /dev/sda && echo "Block size set successfully"
blockdev --getbsz /dev/sda
```

#### Block Size Optimization for Different Workloads
```bash
#!/bin/bash
# Optimize block size for different workloads

DEVICE="/dev/sdb"
WORKLOAD_TYPE="${1:-general}"

case $WORKLOAD_TYPE in
    "database")
        # Large block size for database workloads
        sudo blockdev --setbsz 8192 $DEVICE
        echo "Set block size to 8192 bytes for database workload"
        ;;
    "webserver")
        # Medium block size for web server
        sudo blockdev --setbsz 4096 $DEVICE
        echo "Set block size to 4096 bytes for web server workload"
        ;;
    "general")
        # Default block size for general purpose
        sudo blockdev --setbsz 512 $DEVICE
        echo "Set block size to 512 bytes for general purpose workload"
        ;;
esac

blockdev --getbsz $DEVICE
```

### Performance Tuning

#### Read-Ahead Optimization
```bash
# Get current read-ahead setting
blockdev --getra /dev/sda

# Set read-ahead for different workloads
sudo blockdev --setra 256 /dev/sda          # For database workloads
sudo blockdev --setra 1024 /dev/sda         # For file servers
sudo blockdev --setra 128 /dev/sda          # For desktop systems
sudo blockdev --setra 0 /dev/sda            # Disable read-ahead (for specific applications)

# Optimize read-ahead for SSDs
sudo blockdev --setra 0 /dev/nvme0n1        # SSDs typically don't need read-ahead

# Check if setting was applied
blockdev --getra /dev/sda
```

#### Performance Monitoring and Tuning
```bash
#!/bin/bash
# Performance tuning script

DEVICE="/dev/sda"
LOG_FILE="/var/log/blockdev_tuning.log"

# Function to log current settings
log_settings() {
    echo "$(date): Current settings for $DEVICE" >> $LOG_FILE
    echo "Read-ahead: $(blockdev --getra $DEVICE)" >> $LOG_FILE
    echo "Block size: $(blockdev --getbsz $DEVICE)" >> $LOG_FILE
    echo "Device size: $(blockdev --getsize64 $DEVICE) bytes" >> $LOG_FILE
    echo "----------------------------------------" >> $LOG_FILE
}

# Log current settings before changes
log_settings

# Apply performance settings based on system type
SYSTEM_TYPE=$(hostnamectl | grep "System" | cut -d: -f2 | xargs)

case $SYSTEM_TYPE in
    *"Database"*|*"SQL"*)
        echo "Optimizing for database workload..."
        sudo blockdev --setra 256 $DEVICE
        sudo blockdev --setbsz 8192 $DEVICE
        ;;
    *"Web"*|*"HTTP"*)
        echo "Optimizing for web server workload..."
        sudo blockdev --setra 1024 $DEVICE
        sudo blockdev --setbsz 4096 $DEVICE
        ;;
    *)
        echo "Applying general purpose optimizations..."
        sudo blockdev --setra 128 $DEVICE
        sudo blockdev --setbsz 512 $DEVICE
        ;;
esac

# Log new settings
log_settings
```

### Maintenance Operations

#### Buffer Management
```bash
# Flush device buffers (force write to disk)
sudo blockdev --flushbufs /dev/sda

# Flush buffers before unmounting
sudo blockdev --flushbufs /dev/sdb
sudo umount /dev/sdb

# Safe maintenance sequence
echo "Performing safe maintenance on /dev/sda..."
sudo blockdev --setro /dev/sda              # Set read-only
sudo blockdev --flushbufs /dev/sda           # Flush buffers
# ... perform maintenance tasks ...
sudo blockdev --setrw /dev/sda              # Set back to read-write
echo "Maintenance completed"
```

#### Partition Table Management
```bash
# After modifying partition table, reread it
sudo blockdev --rereadpt /dev/sda

# Safe partition table update sequence
echo "Updating partition table..."
sudo partprobe /dev/sda                     # Alternative method
sudo blockdev --rereadpt /dev/sda           # Reread partition table
echo "Partition table updated"

# Check if device is ready
if blockdev --getsize64 /dev/sda > 0; then
    echo "Device is ready"
else
    echo "Error: Device not accessible"
fi
```

## Practical Examples

### System Administration

#### Storage Device Inventory
```bash
#!/bin/bash
# Storage device inventory script

echo "=== Storage Device Inventory ==="
echo "Generated on: $(date)"
echo "================================"

# Get list of block devices
devices=$(lsblk -d -n -o NAME | grep -E '^[a-z]+$|^[a-z]+[0-9]+$')

for device in $devices; do
    full_path="/dev/$device"
    if [ -b "$full_path" ]; then
        echo ""
        echo "Device: $full_path"
        echo "------------------------"
        echo "Size: $(numfmt --to=iec $(blockdev --getsize64 $full_path))"
        echo "Logical block size: $(blockdev --getbsz $full_path) bytes"
        echo "Sector size: $(blockdev --getss $full_path) bytes"
        echo "Read-only: $( [ $(blockdev --getro $full_path) -eq 1 ] && echo "Yes" || echo "No" )"
        echo "Read-ahead: $(blockdev --getra $full_path) sectors"

        # Additional information
        if lsblk -d -o MODEL $full_path | tail -1 | grep -q " "; then
            echo "Model: $(lsblk -d -o MODEL $full_path | tail -1)"
        fi
        echo "Vendor: $(lsblk -d -o VENDOR $full_path | tail -1)"
    fi
done

echo ""
echo "================================"
echo "End of inventory"
```

#### Performance Optimization Script
```bash
#!/bin/bash
# Storage performance optimization script

# Configuration
TARGET_DEVICE="/dev/sda"
BACKUP_DIR="/var/backups/blockdev_settings"
LOG_FILE="/var/log/storage_optimization.log"

# Create backup directory
mkdir -p $BACKUP_DIR

# Function to backup current settings
backup_settings() {
    echo "$(date): Backing up current settings for $TARGET_DEVICE" >> $LOG_FILE

    {
        echo "# Current blockdev settings for $TARGET_DEVICE"
        echo "# Generated on $(date)"
        echo "BLOCK_SIZE=$(blockdev --getbsz $TARGET_DEVICE)"
        echo "READ_AHEAD=$(blockdev --getra $TARGET_DEVICE)"
        echo "READ_ONLY=$(blockdev --getro $TARGET_DEVICE)"
    } > "$BACKUP_DIR/$(basename $TARGET_DEVICE)_$(date +%Y%m%d_%H%M%S).conf"
}

# Function to apply optimizations
apply_optimizations() {
    local workload_type="$1"

    echo "$(date): Applying optimizations for $workload_type workload" >> $LOG_FILE

    case $workload_type in
        "database")
            # Database optimizations
            sudo blockdev --setbsz 8192 $TARGET_DEVICE
            sudo blockdev --setra 256 $TARGET_DEVICE
            echo "Applied database optimizations"
            ;;
        "webserver")
            # Web server optimizations
            sudo blockdev --setbsz 4096 $TARGET_DEVICE
            sudo blockdev --setra 1024 $TARGET_DEVICE
            echo "Applied web server optimizations"
            ;;
        "desktop")
            # Desktop optimizations
            sudo blockdev --setbsz 512 $TARGET_DEVICE
            sudo blockdev --setra 128 $TARGET_DEVICE
            echo "Applied desktop optimizations"
            ;;
        "ssd")
            # SSD optimizations
            sudo blockdev --setbsz 4096 $TARGET_DEVICE
            sudo blockdev --setra 0 $TARGET_DEVICE  # SSDs don't benefit from read-ahead
            echo "Applied SSD optimizations"
            ;;
    esac
}

# Main execution
if [ $# -eq 0 ]; then
    echo "Usage: $0 {database|webserver|desktop|ssd} {backup|apply}"
    exit 1
fi

WORKLOAD="$1"
ACTION="$2"

case $ACTION in
    "backup")
        backup_settings
        ;;
    "apply")
        backup_settings
        apply_optimizations $WORKLOAD
        echo "Current settings:"
        echo "Block size: $(blockdev --getbsz $TARGET_DEVICE)"
        echo "Read-ahead: $(blockdev --getra $TARGET_DEVICE)"
        ;;
    *)
        echo "Invalid action. Use 'backup' or 'apply'"
        exit 1
        ;;
esac
```

#### Device Health Monitoring
```bash
#!/bin/bash
# Device health monitoring script

DEVICES="/dev/sda /dev/sdb /dev/nvme0n1"
LOG_FILE="/var/log/device_health.log"
ALERT_THRESHOLD=90  # Percentage for alerts

# Function to check device accessibility
check_device_health() {
    local device="$1"

    if [ ! -b "$device" ]; then
        echo "$(date): ALERT - Device $device not found" >> $LOG_FILE
        return 1
    fi

    # Check if device responds
    if ! blockdev --getsize64 "$device" >/dev/null 2>&1; then
        echo "$(date): ALERT - Device $device not responding" >> $LOG_FILE
        return 1
    fi

    # Check device size
    local device_size=$(blockdev --getsize64 "$device")
    if [ "$device_size" -eq 0 ]; then
        echo "$(date): ALERT - Device $device reports zero size" >> $LOG_FILE
        return 1
    fi

    echo "$(date): OK - Device $device healthy, size: $device_size bytes" >> $LOG_FILE
    return 0
}

# Check all devices
echo "=== Device Health Check $(date) ===" >> $LOG_FILE

for device in $DEVICES; do
    check_device_health "$device"
done

echo "Health check completed" >> $LOG_FILE
```

### Advanced Usage

#### Multi-Device Performance Monitoring
```bash
#!/bin/bash
# Real-time performance monitoring script

DEVICES="/dev/sda /dev/sdb /dev/nvme0n1"
INTERVAL=5
OUTPUT_FILE="/tmp/blockdev_monitor.log"

# Function to collect device statistics
collect_stats() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "$timestamp" >> $OUTPUT_FILE

    for device in $DEVICES; do
        if [ -b "$device" ]; then
            stats=$(blockdev --getsize64 --getbsz --getra --getro $device | tr '\n' ' ')
            echo "$device: $stats" >> $OUTPUT_FILE
        fi
    done

    echo "---" >> $OUTPUT_FILE
}

# Header
echo "Starting block device monitoring..." >> $OUTPUT_FILE
echo "Devices: $DEVICES" >> $OUTPUT_FILE
echo "Interval: $INTERVAL seconds" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Monitor loop
trap "echo 'Monitoring stopped' >> $OUTPUT_FILE; exit" INT TERM

while true; do
    collect_stats
    sleep $INTERVAL
done
```

#### Device Configuration Validation
```bash
#!/bin/bash
# Device configuration validation script

CONFIG_FILE="/etc/blockdev.conf"
LOG_FILE="/var/log/blockdev_validation.log"

# Function to validate device configuration
validate_config() {
    local device="$1"
    local expected_block_size="$2"
    local expected_read_ahead="$3"

    local current_block_size=$(blockdev --getbsz "$device")
    local current_read_ahead=$(blockdev --getra "$device")

    local status="PASS"

    if [ "$current_block_size" != "$expected_block_size" ]; then
        echo "$(date): FAIL - $device block size: expected $expected_block_size, got $current_block_size" >> $LOG_FILE
        status="FAIL"
    fi

    if [ "$current_read_ahead" != "$expected_read_ahead" ]; then
        echo "$(date): FAIL - $device read-ahead: expected $expected_read_ahead, got $current_read_ahead" >> $LOG_FILE
        status="FAIL"
    fi

    if [ "$status" = "PASS" ]; then
        echo "$(date): PASS - $device configuration validated" >> $LOG_FILE
    fi

    return $([ "$status" = "PASS" ] && echo 0 || echo 1)
}

# Read configuration file and validate
while IFS= read -r line; do
    # Skip comments and empty lines
    [[ $line =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line// }" ]] && continue

    # Parse configuration line
    if [[ $line =~ ^(.+)=(.+)=(.+)$ ]]; then
        device="${BASH_REMATCH[1]}"
        block_size="${BASH_REMATCH[2]}"
        read_ahead="${BASH_REMATCH[3]}"

        echo "Validating $device..."
        validate_config "/dev/$device" "$block_size" "$read_ahead"
    fi
done < "$CONFIG_FILE"
```

## Integration and Automation

### Cron Jobs for Monitoring
```bash
# Add to crontab for regular monitoring
# Check device health every hour
0 * * * * /usr/local/bin/device_health_check.sh

# Backup device settings weekly
0 0 * * 0 /usr/local/bin/backup_blockdev_settings.sh

# Performance monitoring every 5 minutes during business hours
*/5 9-17 * * 1-5 /usr/local/bin/performance_monitor.sh
```

### Systemd Service Integration
```bash
# Create systemd service for blockdev management
cat > /etc/systemd/system/blockdev-manager.service << 'EOF'
[Unit]
Description=Block Device Manager
After=local-fs.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/apply_blockdev_config.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl enable blockdev-manager
sudo systemctl start blockdev-manager
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Most blockdev operations require root privileges
# Solution: Use sudo or run as root
sudo blockdev --setbsz 4096 /dev/sda

# Check if you have the necessary permissions
if [ $(id -u) -ne 0 ]; then
    echo "This operation requires root privileges"
    exit 1
fi
```

#### Device Not Found
```bash
# Verify device exists
if [ ! -b "/dev/sda" ]; then
    echo "Device /dev/sda not found"
    echo "Available block devices:"
    lsblk
    exit 1
fi

# List all available block devices
lsblk -d -n -o NAME | while read device; do
    echo "/dev/$device: $(blockdev --getsize64 /dev/$device) bytes"
done
```

#### Invalid Block Size
```bash
# Check valid block sizes for your device
# Common valid values: 512, 1024, 2048, 4096, 8192

# Test if block size is supported
test_block_size() {
    local device="$1"
    local block_size="$2"

    if sudo blockdev --setbsz $block_size $device 2>/dev/null; then
        echo "Block size $block_size is supported"
        return 0
    else
        echo "Block size $block_size is not supported"
        return 1
    fi
}

# Test common block sizes
for size in 512 1024 2048 4096 8192; do
    test_block_size "/dev/sda" $size
done
```

#### Read-Only Device Issues
```bash
# Check if device is read-only
if [ $(blockdev --getro /dev/sda) -eq 1 ]; then
    echo "Device is read-only"

    # Try to make it read-write
    sudo blockdev --setrw /dev/sda

    # Check if successful
    if [ $(blockdev --getro /dev/sda) -eq 1 ]; then
        echo "Failed to set device to read-write"
        echo "Possible causes:"
        echo "  - Hardware write-protect switch"
        echo "  - Filesystem mounted read-only"
        echo "  - Device error condition"
    else
        echo "Device is now read-write"
    fi
fi
```

## Related Commands

- [`lsblk`](/docs/commands/system/lsblk) - List block devices
- [`fdisk`](/docs/commands/system/fdisk) - Disk partitioning utility
- [`parted`](/docs/commands/system/parted) - GNU partition editor
- [`mkfs`](/docs/commands/system/mkfs) - Create filesystem
- [`mount`](/docs/commands/system/mount) - Mount filesystems
- [`umount`](/docs/commands/system/umount) - Unmount filesystems
- [`smartctl`](/docs/commands/hardware/smartctl) - SMART monitoring tool
- [`hdparm`](/docs/commands/hardware/hdparm) - Hard disk parameters utility
- [`df`](/docs/commands/system/df) - Display free disk space
- [`du`](/docs/commands/file/du) - Display disk usage statistics

## Best Practices

1. **Always backup current settings** before making changes
2. **Test configuration changes** on non-production systems first
3. **Use appropriate block sizes** for your workload type
4. **Monitor device health** regularly with blockdev commands
5. **Document all changes** for troubleshooting and recovery
6. **Schedule maintenance windows** for disruptive operations
7. **Validate settings** after applying changes
8. **Use automation scripts** for consistent configuration
9. **Monitor performance impact** after optimization changes
10. **Keep logs** of all blockdev operations for audit purposes

## Performance Tips

1. **Database workloads**: Use larger block sizes (8192 bytes) and moderate read-ahead (256 sectors)
2. **Web servers**: Use medium block sizes (4096 bytes) and higher read-ahead (1024 sectors)
3. **SSD devices**: Set read-ahead to 0 as SSDs don't benefit from prefetching
4. **Sequential access workloads**: Use large block sizes and high read-ahead values
5. **Random access workloads**: Use smaller block sizes and lower read-ahead values
6. **Virtual machines**: Use block sizes that match the guest OS requirements
7. **Backup storage**: Optimize for sequential write performance with large blocks
8. **Log devices**: Use smaller block sizes for better write performance
9. **Test before production**: Always benchmark different settings before applying in production
10. **Monitor continuously**: Set up automated monitoring to detect performance regressions

The `blockdev` command is an essential tool for Linux system administrators working with storage systems. Its ability to query and modify low-level block device parameters makes it invaluable for performance tuning, troubleshooting, and maintaining storage infrastructure. When used properly with careful planning and monitoring, blockdev can significantly improve system performance and reliability.