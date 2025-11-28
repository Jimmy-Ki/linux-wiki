---
title: swapon - Enable devices for paging and swapping
sidebar_label: swapon
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# swapon - Enable devices for paging and swapping

The `swapon` command is used to enable devices and files for paging and swapping on Linux systems. It activates swap areas that have been prepared by the `mkswap` command, allowing the operating system to use disk space as virtual memory when physical RAM becomes scarce. Swapon is a critical component of Linux memory management, enabling systems to handle memory pressure gracefully by moving less frequently used memory pages to disk storage.

The command supports various types of swap areas including disk partitions, swap files, and logical volumes. It provides detailed information about active swap space and can verify swap areas before activation. Proper swap management is essential for system stability, especially on systems with limited RAM or running memory-intensive applications.

## Basic Syntax

```bash
swapon [OPTIONS] [DEVICE|FILE]...
```

## Common Options

### Display Options
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `-s, --summary` - Display swap usage summary (deprecated, use /proc/swaps)
- `--show` - Display swap devices in a parseable format
- `--raw` - Display numbers in raw format (with --show)
- `--noheadings` - Don't display headings (with --show)

### Priority Options
- `-p, --priority PRIORITY` - Set swap priority (0 to 32767)
- `--fixpgsz` - Reinitialize swap space if page size is wrong

### Policy Options
- `-d, --discard` - Enable swap discard support
- `--discard=POLICY` - Set discard policy (once, pages)

### Verification Options
- `-f, --fixpgsz` - Reinitialize swap if page size is wrong
- `-v, --verbose` - Verbose output

### File Options
- `-a, --all` - Activate all swap devices from /etc/fstab
- `-e, --ifexists` - Silently skip devices that do not exist
- `-F, --file` - Set file for reading in place of /etc/fstab
- `-U, --uuid UUID` - Activate swap by UUID
- `-L, --label LABEL` - Activate swap by label

## Usage Examples

### Basic Swap Operations

#### Enabling Single Swap Device
```bash
# Enable swap partition
sudo swapon /dev/sda2

# Enable swap file
sudo swapon /swapfile

# Enable swap with verbose output
sudo swapon -v /swapfile

# Check if swap was enabled successfully
swapon --show
```

#### Activating All Swap Devices
```bash
# Enable all swap devices from /etc/fstab
sudo swapon -a

# Enable all swap devices, skipping non-existent ones
sudo swapon -ae

# Enable swap from custom fstab file
sudo swapon -a -F /etc/fstab.backup
```

### Working with Swap Files

#### Creating and Enabling Swap Files
```bash
# Create a 2GB swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile

# Enable the swap file
sudo swapon /swapfile

# Add to /etc/fstab for permanent activation
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify swap is active
swapon --show
free -h
```

#### Multiple Swap Files with Priorities
```bash
# Create multiple swap files with different priorities
sudo mkswap /swapfile1
sudo mkswap /swapfile2

# Enable with specific priorities (higher number = higher priority)
sudo swapon -p 10 /swapfile1
sudo swapon -p 20 /swapfile2

# Check swap priorities
swapon --show
```

### System Administration

#### Emergency Swap Activation
```bash
# Quick swap file creation for emergency situations
sudo dd if=/dev/zero of=/emergencyswap bs=1M count=1024
sudo chmod 600 /emergencyswap
sudo mkswap /emergencyswap
sudo swapon /emergencyswap

# Monitor swap usage
free -h
watch -n 1 cat /proc/meminfo | grep -E '(SwapTotal|SwapFree|SwapCached)'
```

#### Performance Monitoring
```bash
# Display detailed swap information
swapon --show --verbose

# Show swap usage summary
cat /proc/swaps
free -h

# Monitor swap activity
vmstat 1
sar -W 1 10

# Check which processes are using swap
for file in /proc/*/status; do
    awk '/VmSwap|Name/{printf $2 " " $3} END{ print ""}' "$file"
done | sort -k2 -nr | head -10
```

### Advanced Configuration

#### Swap Priority Management
```bash
# Set different priorities for multiple swap devices
sudo swapon -p 5 /dev/sda2      # Low priority
sudo swapon -p 10 /swapfile     # Medium priority
sudo swapon -p 20 /dev/sdb1     # High priority

# Display current priorities
swapon --show

# Modify existing swap priorities
sudo swapoff /dev/sda2
sudo swapon -p 15 /dev/sda2
```

#### Discard/TRIM Configuration
```bash
# Enable discard support for SSD swap
sudo swapon --discard /swapfile

# Enable discard with specific policy
sudo swapon --discard=pages /swapfile

# Enable discard for all swap devices
sudo swapon -a --discard
```

### Troubleshooting and Verification

#### Checking Swap Status
```bash
# Display active swap devices
swapon --show
cat /proc/swaps

# Detailed system memory information
free -h
cat /proc/meminfo | grep Swap

# Check swap device labels and UUIDs
sudo blkid | grep swap
lsblk -f
```

#### Verifying Swap Areas
```bash
# Test swap file integrity
sudo swapon -v /swapfile

# Check swap area exists and is valid
file /swapfile
sudo mkswap -c /dev/sda2  # Check for bad blocks
```

## Practical Examples

### System Setup

#### Initial System Configuration
```bash
#!/bin/bash
# System swap setup script

# Create swap partition (example: /dev/sda2)
sudo mkswap /dev/sda2
sudo swapon /dev/sda2

# Create swap file
SIZE="2G"
SWAPFILE="/swapfile"

sudo fallocate -l "$SIZE" "$SWAPFILE"
sudo chmod 600 "$SWAPFILE"
sudo mkswap "$SWAPFILE"
sudo swapon "$SWAPFILE"

# Add to fstab
echo '/dev/sda2 none swap sw 0 0' | sudo tee -a /etc/fstab
echo "$SWAPFILE none swap sw 0 0" | sudo tee -a /etc/fstab

# Verify setup
swapon --show
free -h
```

#### Swap Configuration Optimization
```bash
# Configure swappiness (aggressiveness of swapping)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Configure cache pressure
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf

# Monitor swap usage patterns
watch -n 5 '
echo "=== Memory Usage ==="
free -h
echo "=== Top Swap Users ==="
for file in /proc/*/status; do
    if [ -r "$file" ]; then
        name=$(awk '/^Name:/{print $2}' "$file")
        vmswap=$(awk '/^VmSwap:/{print $2}' "$file")
        [ "$vmswap" -gt 0 ] && echo "$name: $vmswap kB"
    fi
done | sort -k2 -nr | head -5
'
```

### Performance Tuning

#### High-Performance Swap Setup
```bash
# Fast swap file configuration for SSD systems
SWAPFILE="/fastswap"
SIZE="4G"

# Create on fast SSD
sudo fallocate -l "$SIZE" "$SWAPFILE"
sudo chmod 600 "$SWAPFILE"

# Optimize for SSD performance
sudo mkswap "$SWAPFILE"
sudo swapon --discard=pages -p 100 "$SWAPFILE"

# Optimize kernel parameters
cat << EOF | sudo tee /etc/sysctl.d/99-swap.conf
vm.swappiness=15
vm.vfs_cache_pressure=50
vm.dirty_ratio=15
vm.dirty_background_ratio=5
EOF

sudo sysctl --system
```

#### Swap Space Monitoring Script
```bash
#!/bin/bash
# Comprehensive swap monitoring script

check_swap_health() {
    echo "=== Swap Health Check ==="
    echo "Active swap devices:"
    swapon --show

    echo -e "\nSwap usage:"
    free -h

    echo -e "\nSwap pressure:"
    cat /proc/vmstat | grep -E "(pswpin|pswpout)"

    echo -e "\nProcesses using swap:"
    for proc in /proc/*/status; do
        if [ -r "$proc" ]; then
            name=$(awk '/Name/{print $2}' "$proc")
            swap=$(awk '/VmSwap/{print $2}' "$proc")
            [ "$swap" -gt 0 ] && printf "%-20s %10s kB\n" "$name" "$swap"
        fi
    done | sort -k2 -nr
}

# Alert on high swap usage
alert_swap_usage() {
    local total_swap=$(free | grep Swap | awk '{print $2}')
    local used_swap=$(free | grep Swap | awk '{print $3}')
    local swap_usage=$((used_swap * 100 / total_swap))

    if [ "$swap_usage" -gt 80 ]; then
        echo "WARNING: High swap usage: ${swap_usage}%"
        # Send notification or alert
        # notify-send "High Swap Usage" "Current: ${swap_usage}%"
    fi
}

check_swap_health
alert_swap_usage
```

## Advanced Usage

### Swap Area Management

#### Converting Partitions to Swap
```bash
# Identify unused partitions
sudo fdisk -l
sudo lsblk -f

# Convert partition to swap (example: /dev/sda3)
sudo mkswap /dev/sda3
sudo swapon /dev/sda3

# Update fstab
echo '/dev/sda3 none swap sw 0 0' | sudo tee -a /etc/fstab

# Verify
swapon --show
```

#### Working with LVM Swap
```bash
# Create LVM logical volume for swap
sudo lvcreate -L 2G -n swap vg0
sudo mkswap /dev/vg0/swap
sudo swapon /dev/vg0/swap

# Add to fstab using UUID
SWAP_UUID=$(sudo blkid -s UUID -o value /dev/vg0/swap)
echo "UUID=$SWAP_UUID none swap sw 0 0" | sudo tee -a /etc/fstab
```

### System Integration

#### Automated Swap Management
```bash
#!/bin/bash
# Dynamic swap management based on memory usage

MANAGE_SWAP_THRESHOLD=80
MIN_SWAP_SIZE=1
MAX_SWAP_SIZE=8
SWAPFILE="/var/lib/dynamic_swap"

adjust_swap_size() {
    local mem_usage=$(free | awk '/Mem/{printf "%.0f", $3/$2 * 100.0}')
    local current_swap=$(free | awk '/Swap/{print $2}')

    if [ "$mem_usage" -gt "$MANAGE_SWAP_THRESHOLD" ] && [ "$current_swap" -eq 0 ]; then
        echo "High memory usage detected (${mem_usage}%), creating swap..."
        sudo fallocate -l "${MIN_SWAP_SIZE}G" "$SWAPFILE"
        sudo chmod 600 "$SWAPFILE"
        sudo mkswap "$SWAPFILE"
        sudo swapon "$SWAPFILE"

    elif [ "$mem_usage" -lt 40 ] && [ "$current_swap" -gt 0 ]; then
        echo "Low memory usage, removing dynamic swap..."
        sudo swapoff "$SWAPFILE" 2>/dev/null
        sudo rm -f "$SWAPFILE"
    fi
}

# Run as cron job every 5 minutes
adjust_swap_size
```

#### Swap Performance Testing
```bash
# Swap performance benchmark
test_swap_performance() {
    local test_file="/tmp/swaptest"
    local size="1G"

    echo "Creating test file..."
    dd if=/dev/zero of="$test_file" bs=1M count=1024

    echo "Testing swap performance..."
    sync && echo 3 > /proc/sys/vm/drop_caches

    # Time the operation with and without swap
    time cp "$test_file" "/tmp/test1"
    time cp "$test_file" "/tmp/test2"

    rm -f "$test_file" "/tmp/test1" "/tmp/test2"
}
```

## Troubleshooting

### Common Issues

#### Swap Device Not Found
```bash
# Check if device exists
ls -la /dev/sda2
sudo fdisk -l

# Check device type
sudo file -s /dev/sda2

# Re-create swap signature
sudo mkswap /dev/sda2
sudo swapon /dev/sda2
```

#### Permission Issues
```bash
# Check swap file permissions
ls -la /swapfile

# Fix permissions
sudo chmod 600 /swapfile
sudo chown root:root /swapfile

# Verify swap area
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### Swap Device Busy
```bash
# Check processes using swap
sudo lsof | grep swap

# Check memory usage
free -h
cat /proc/meminfo | grep Swap

# Force swapoff if needed
sudo swapoff -a
sudo swapon -a
```

#### Performance Issues
```bash
# Monitor swap I/O
iotop -o
vmstat 1

# Check swap fragmentation
cat /proc/vmstat | grep -E "(pswpin|pswpout)"

# Optimize swap settings
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Recovery Procedures

#### Corrupted Swap Recovery
```bash
# Check swap area integrity
sudo mkswap -c /dev/sda2  # Check for bad blocks

# Recreate swap file
sudo swapoff /swapfile
sudo rm /swapfile
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### Emergency Procedures
```bash
# Create emergency swap space
sudo dd if=/dev/zero of=/tmp/emergency_swap bs=1M count=1024
sudo chmod 600 /tmp/emergency_swap
sudo mkswap /tmp/emergency_swap
sudo swapon /tmp/emergency_swap

# Clear emergency swap after use
sudo swapoff /tmp/emergency_swap
sudo rm /tmp/emergency_swap
```

## Integration and Automation

### System Scripts

#### Service Startup Script
```bash
#!/bin/bash
# /etc/init.d/swap-setup

# Enable all swap devices
start() {
    echo "Enabling swap devices..."
    sudo swapon -a
    swapon --show
}

# Disable all swap devices
stop() {
    echo "Disabling swap devices..."
    sudo swapoff -a
}

case "$1" in
    start) start ;;
    stop) stop ;;
    restart) stop; start ;;
    *) echo "Usage: $0 {start|stop|restart}" ;;
esac
```

#### Monitoring Script
```bash
#!/bin/bash
# /usr/local/bin/swap-monitor

ALERT_THRESHOLD=80
LOG_FILE="/var/log/swap-monitor.log"

log_swap_status() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local swap_usage=$(free | awk '/Swap/{printf "%.0f", $3/$2 * 100.0}' 2>/dev/null)

    echo "[$timestamp] Swap usage: ${swap_usage}%" >> "$LOG_FILE"

    if [ "$swap_usage" -gt "$ALERT_THRESHOLD" ]; then
        echo "[$timestamp] ALERT: High swap usage (${swap_usage}%)" >> "$LOG_FILE"
        # Send notification
        logger "High swap usage detected: ${swap_usage}%"
    fi
}

log_swap_status
```

## Related Commands

- [`swapoff`](/docs/commands/compression/swapoff) - Disable devices for paging and swapping
- [`mkswap`](/docs/commands/compression/mkswap) - Set up a Linux swap area
- [`free`](/docs/commands/system-info/free) - Display amount of free and used memory
- [`vmstat`](/docs/commands/system-info/vmstat) - Report virtual memory statistics
- [`sar`](/docs/commands/system-info/sar) - Collect, report, or save system activity information
- [`top`](/docs/commands/system-info/top) - Display Linux processes
- [`htop`](/docs/commands/system-info/htop) - Interactive process viewer
- [`iotop`](/docs/commands/system-info/iotop) - Simple top-like I/O monitor
- [`lsblk`](/docs/commands/system-info/lsblk) - List block devices
- [`blkid`](/docs/commands/system-info/blkid) - Locate/print block device attributes

## Best Practices

1. **Size swap appropriately** - Typically 1-2x RAM size, or use formula based on hibernation needs
2. **Use swap files on modern systems** - More flexible than partitions, easier to resize
3. **Set appropriate swappiness** - Lower values (10-20) for desktop systems, higher for servers
4. **Enable discard/TRIM** - Essential for SSD swap devices to maintain performance
5. **Monitor swap usage** - High swap usage may indicate memory pressure or leaks
6. **Use multiple swap devices** - With different priorities for optimal performance
7. **Test swap areas** - Verify integrity before production use with `mkswap -c`
8. **Configure automatic activation** - Use `/etc/fstab` entries for persistent swap
9. **Plan for hibernation** - Ensure swap size is at least RAM size if using hibernation
10. **Regular monitoring** - Check swap effectiveness and adjust configuration as needed

## Performance Tips

1. **Higher priority swap devices** are used first, place faster storage with higher priority
2. **SSD-based swap** provides better performance than HDD-based swap
3. **Swap files near the beginning** of disk partitions for better performance
4. **Optimal swappiness values**: 10-60 depending on workload and system type
5. **Enable compressed swap** (zswap) for better performance on memory-constrained systems
6. **Monitor swap I/O** to identify bottlenecks and performance issues
7. **Use vm.dirty_ratio** settings to optimize write-back behavior with swap
8. **Consider zram** for compressed RAM-based swap on very memory-constrained systems
9. **Regular defragmentation** of swap files can improve performance
10. **Balance swap priority** between SSD and HDD for optimal performance-cost ratio

The `swapon` command is a fundamental tool for Linux memory management, enabling systems to gracefully handle memory pressure through virtual memory. Proper configuration and monitoring of swap space is crucial for system stability and performance, especially on systems with limited RAM or running memory-intensive workloads.