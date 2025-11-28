---
title: swapoff - Disable devices for paging and swapping
sidebar_label: swapoff
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# swapoff - Disable devices for paging and swapping

The `swapoff` command is a crucial Linux system administration utility used to disable swap devices and files, effectively stopping the system from using them for paging and swapping operations. This command is essential for memory management, system maintenance, and performance optimization. It works in conjunction with `swapon` to manage virtual memory by allowing administrators to temporarily or permanently disable swap space when needed, such as during system upgrades, performance testing, or when reconfiguring memory management settings.

## Basic Syntax

```bash
swapoff [OPTIONS] [DEVICE|FILE...]
```

## Common Options

### Display Options
- `-a, --all` - Disable all swap devices and files listed in `/etc/fstab`
- `-h, --help` - Display help information and exit
- `-v, --verbose` - Verbose mode, report details about operations
- `-V, --version` - Display version information and exit

### Specific Options
- `-e, --efi` - Consider swap entries with EFI boot partitions (if supported)
- `-f, --fixpgsz` - Reinitialize swap space if page size is wrong
- `-p, --priority=PRIORITY` - Specify priority of swap device (when enabling, not disabling)

## Usage Examples

### Basic Swap Operations

#### Disabling Specific Swap Devices
```bash
# Disable a specific swap partition
swapoff /dev/sda2

# Disable a swap file
swapoff /swapfile

# Disable multiple swap devices
swapoff /dev/sda2 /swapfile /dev/mapper/swap-volume

# Disable swap by UUID
swapoff UUID=1234-abcd-5678-efgh

# Disable swap by label
swapoff LABEL=myswap
```

#### Disabling All Swap Space
```bash
# Disable all swap devices from /etc/fstab
swapoff -a

# Disable all swap with verbose output
swapoff -av

# Check current swap status before disabling
swapon --show
swapoff -a

# Verify swap is disabled
swapon --show
free -h
```

### System Management Operations

#### Maintenance and Upgrades
```bash
# Before system maintenance - disable swap safely
sync
swapoff -a

# During kernel upgrade preparation
echo "Disabling swap for kernel upgrade..."
swapoff -av

# For filesystem operations on swap partition
umount /dev/sda2  # if mounted
swapoff /dev/sda2
# Now safe to modify the partition
```

#### Performance Testing
```bash
# Disable swap for performance benchmarking
echo "Disabling swap for performance testing..."
swapoff -a

# Run performance tests without swap interference
./benchmark_test.sh

# Re-enable swap after testing
swapon -a
```

### Troubleshooting and Diagnostics

#### Checking Swap Status
```bash
# Show current swap devices
swapon --show

# Display detailed swap information
cat /proc/swaps

# Show memory and swap usage
free -h

# Display swap summary
cat /proc/meminfo | grep -i swap
```

#### Safe Swap Disabling
```bash
# Check if swap can be safely disabled
free -h
echo "Available memory: $(free -h | grep '^Mem:' | awk '{print $7}')"

# Disable swap only if enough RAM is available
AVAILABLE_RAM=$(free -m | grep '^Mem:' | awk '{print $7}')
SWAP_USED=$(free -m | grep '^Swap:' | awk '{print $3}')

if [ "$AVAILABLE_RAM" -gt "$((SWAP_USED + 1024))" ]; then
    echo "Sufficient RAM available, disabling swap..."
    swapoff -a
else
    echo "Insufficient RAM, cannot safely disable swap"
fi
```

## Practical Examples

### System Administration

#### System Shutdown and Reboot
```bash
#!/bin/bash
# Clean system shutdown script

echo "Starting clean system shutdown..."

# Sync filesystems
sync

# Disable swap to ensure clean state
echo "Disabling swap..."
swapoff -av

# Stop services that might use swap
systemctl stop postgresql
systemctl stop mysql

# Additional cleanup
echo "Performing system cleanup..."
# ... cleanup tasks ...

echo "System ready for shutdown"
```

#### Memory Management
```bash
#!/bin/bash
# Memory optimization script

# Check current memory usage
echo "=== Current Memory Status ==="
free -h
echo

# Show swap usage before disabling
echo "=== Current Swap Usage ==="
swapon --show
echo

# Calculate if we can disable swap
TOTAL_RAM=$(free -m | grep '^Mem:' | awk '{print $2}')
AVAILABLE_RAM=$(free -m | grep '^Mem:' | awk '{print $7}')
SWAP_USED=$(free -m | grep '^Swap:' | awk '{print $3}')

echo "Total RAM: ${TOTAL_RAM}MB"
echo "Available RAM: ${AVAILABLE_RAM}MB"
echo "Swap Used: ${SWAP_USED}MB"

if [ "$SWAP_USED" -eq 0 ]; then
    echo "No swap in use, safe to disable..."
    swapoff -a
    echo "Swap disabled successfully"
elif [ "$AVAILABLE_RAM" -gt "$((SWAP_USED + 512))" ]; then
    echo "Sufficient RAM available, moving data from swap..."
    swapoff -a
    echo "Swap data moved to RAM successfully"
else
    echo "Insufficient RAM to move swap data, keeping swap enabled"
fi
```

#### Disk Maintenance
```bash
#!/bin/bash
# Disk maintenance script requiring swap space manipulation

TARGET_DEVICE="/dev/sda2"

# Check if device is being used as swap
if swapon --show | grep -q "$TARGET_DEVICE"; then
    echo "$TARGET_DEVICE is currently active as swap"

    # Check if we have enough RAM
    AVAILABLE_RAM=$(free -m | grep '^Mem:' | awk '{print $7}')
    SWAP_SIZE=$(swapon --show | grep "$TARGET_DEVICE" | awk '{print $3}' | sed 's/M//')

    if [ "$AVAILABLE_RAM" -gt "$((SWAP_SIZE + 1024))" ]; then
        echo "Disabling swap on $TARGET_DEVICE..."
        swapoff "$TARGET_DEVICE"
        echo "Swap disabled, proceeding with maintenance..."

        # Perform maintenance on the device
        fsck -y "$TARGET_DEVICE"

        echo "Maintenance completed, re-enabling swap..."
        swapon "$TARGET_DEVICE"
    else
        echo "Insufficient RAM to safely disable swap"
        exit 1
    fi
else
    echo "$TARGET_DEVICE is not currently active as swap"
fi
```

### Development and Testing

#### Application Testing
```bash
#!/bin/bash
# Test script to verify application behavior without swap

APP_NAME="my_critical_application"
MIN_RAM_MB=2048

echo "Testing $APP_NAME without swap..."

# Check system requirements
TOTAL_RAM=$(free -m | grep '^Mem:' | awk '{print $2}')
if [ "$TOTAL_RAM" -lt "$MIN_RAM_MB" ]; then
    echo "Error: System requires at least ${MIN_RAM_MB}MB RAM for this test"
    exit 1
fi

# Disable swap for testing
echo "Disabling swap for clean testing environment..."
swapoff -av

# Run application tests
echo "Running application tests..."
./test_suite.sh

# Capture test results
TEST_RESULT=$?

# Re-enable swap
echo "Re-enabling swap..."
swapon -a

# Report results
if [ $TEST_RESULT -eq 0 ]; then
    echo "Tests passed successfully without swap"
else
    echo "Tests failed - check application memory management"
fi

exit $TEST_RESULT
```

#### Performance Benchmarking
```bash
#!/bin/bash
# Performance benchmarking with and without swap

BENCHMARK_SCRIPT="./performance_benchmark.sh"
RESULTS_FILE="benchmark_results_$(date +%Y%m%d_%H%M%S).log"

echo "Performance Benchmarking Suite" | tee "$RESULTS_FILE"
echo "=============================" | tee -a "$RESULTS_FILE"
echo "Date: $(date)" | tee -a "$RESULTS_FILE"
echo | tee -a "$RESULTS_FILE"

# Function to run benchmark
run_benchmark() {
    local scenario="$1"
    echo "Running benchmark: $scenario" | tee -a "$RESULTS_FILE"
    echo "---" | tee -a "$RESULTS_FILE"

    # Record system state
    free -h >> "$RESULTS_FILE"
    swapon --show >> "$RESULTS_FILE"

    # Run benchmark
    local start_time=$(date +%s)
    "$BENCHMARK_SCRIPT" >> "$RESULTS_FILE" 2>&1
    local end_time=$(date +%s)

    local duration=$((end_time - start_time))
    echo "Duration: ${duration} seconds" | tee -a "$RESULTS_FILE"
    echo | tee -a "$RESULTS_FILE"
}

# Test with swap enabled
echo "=== Testing with SWAP ENABLED ===" | tee -a "$RESULTS_FILE"
swapon -a
run_benchmark "with_swap"

# Test without swap
echo "=== Testing with SWAP DISABLED ===" | tee -a "$RESULTS_FILE"
swapoff -a
run_benchmark "without_swap"

# Restore original state
swapon -a

echo "Benchmarking completed. Results saved to: $RESULTS_FILE"
```

### Automation and Monitoring

#### Automated Swap Management
```bash
#!/bin/bash
# Automated swap management based on system load

THRESHOLD_LOAD=2.0  # Load average threshold
MIN_FREE_RAM_MB=1024  # Minimum free RAM in MB

while true; do
    # Get current system load (1-minute average)
    LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')

    # Get free RAM in MB
    FREE_RAM=$(free -m | grep '^Mem:' | awk '{print $4}')

    # Check if swap is currently enabled
    SWAP_ENABLED=$(swapon --show | wc -l)

    echo "Load: $LOAD_AVG, Free RAM: ${FREE_RAM}MB, Swap devices: $SWAP_ENABLED"

    # Decision logic
    if (( $(echo "$LOAD_AVG < $THRESHOLD_LOAD" | bc -l) )) && [ "$FREE_RAM" -gt "$MIN_FREE_RAM_MB" ]; then
        if [ "$SWAP_ENABLED" -gt 0 ]; then
            echo "System load is low and plenty of RAM available, disabling swap..."
            swapoff -a
        else
            echo "System is optimized - swap already disabled"
        fi
    else
        if [ "$SWAP_ENABLED" -eq 0 ]; then
            echo "System load is high or RAM is low, enabling swap..."
            swapon -a
        else
            echo "Swap is already enabled for system stability"
        fi
    fi

    sleep 300  # Check every 5 minutes
done
```

#### System Health Monitoring
```bash
#!/bin/bash
# System health monitoring with swap analysis

LOG_FILE="/var/log/system_health.log"
ALERT_EMAIL="admin@example.com"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

send_alert() {
    echo "$1" | mail -s "System Alert: Swap Management" "$ALERT_EMAIL"
}

# Check swap utilization
SWAP_TOTAL=$(free -m | grep '^Swap:' | awk '{print $2}')
SWAP_USED=$(free -m | grep '^Swap:' | awk '{print $3}')

if [ "$SWAP_TOTAL" -gt 0 ]; then
    SWAP_USAGE_PERCENT=$((SWAP_USED * 100 / SWAP_TOTAL))

    if [ "$SWAP_USAGE_PERCENT" -gt 80 ]; then
        MESSAGE="High swap usage detected: ${SWAP_USAGE_PERCENT}% (${SWAP_USED}MB/${SWAP_TOTAL}MB)"
        log_message "$MESSAGE"

        # Check if we have enough RAM to disable swap
        FREE_RAM=$(free -m | grep '^Mem:' | awk '{print $7}')
        if [ "$FREE_RAM" -gt "$((SWAP_USED + 512))" ]; then
            log_message "Attempting to disable swap due to high usage"
            swapoff -a && log_message "Swap disabled successfully"
        else
            send_alert "$MESSAGE - Insufficient RAM to disable swap"
        fi
    fi
fi

# Check for swap thrashing
# Look at recent system activity for signs of swap thrashing
if sar -W 1 5 | tail -1 | awk '{print $3}' | grep -q "[1-9]"; then
    MESSAGE "Swap thrashing detected - system performance may be degraded"
    log_message "$MESSAGE"
    send_alert "$MESSAGE"
fi

log_message "System health check completed"
```

## Advanced Usage

### Emergency Procedures

#### Emergency Swap Disabling
```bash
#!/bin/bash
# Emergency swap disabling for critical situations

echo "EMERGENCY: Disabling all swap immediately!"

# Force sync to minimize data loss
sync; sync; sync

# Try to move critical data to RAM first
echo "Attempting graceful swap disable..."
if swapoff -a 2>/dev/null; then
    echo "Swap disabled gracefully"
else
    echo "Graceful disable failed, attempting force disable..."
    # Force disable (may cause data loss)
    swapoff -f -a 2>/dev/null || swapoff -a
fi

echo "Emergency swap disable completed"
```

#### Recovery Procedures
```bash
#!/bin/bash
# Recovery script after emergency swap disable

echo "Starting system recovery..."

# Check system state
echo "Checking system memory status..."
free -h

# Re-enable swap if safe
SWAP_DEVICES=$(grep '^[^#].*swap' /etc/fstab | awk '{print $1}')
if [ -n "$SWAP_DEVICES" ]; then
    echo "Re-enabling swap devices..."
    for device in $SWAP_DEVICES; do
        if [ -e "$device" ]; then
            echo "Enabling swap on $device..."
            swapon "$device"
        else
            echo "Warning: Swap device $device not found"
        fi
    done
else
    echo "No swap devices found in fstab"
fi

# Verify system state
echo "Verifying system state..."
free -h
swapon --show

echo "System recovery completed"
```

### Configuration and Integration

#### Swap Configuration Management
```bash
#!/bin/bash
# Swap configuration management script

FSTAB_FILE="/etc/fstab"
SWAP_DIR="/swap"

function list_swap_entries() {
    echo "=== Current Swap Configuration ==="
    grep '^[^#].*swap' "$FSTAB_FILE" | while read line; do
        echo "$line"
    done

    echo
    echo "=== Active Swap Devices ==="
    swapon --show
}

function add_swap_file() {
    local swap_size="$1"
    local swap_file="$SWAP_DIR/swapfile_$swap_size"

    if [ -z "$swap_size" ]; then
        echo "Usage: add_swap_file <size_in_mb>"
        return 1
    fi

    echo "Creating ${swap_size}MB swap file..."

    # Create swap directory if it doesn't exist
    mkdir -p "$SWAP_DIR"

    # Create swap file
    dd if=/dev/zero of="$swap_file" bs=1M count="$swap_size" status=progress

    # Set proper permissions
    chmod 600 "$swap_file"

    # Format as swap
    mkswap "$swap_file"

    # Add to fstab
    echo "$swap_file none swap sw 0 0" >> "$FSTAB_FILE"

    # Enable the new swap
    swapon "$swap_file"

    echo "Swap file created and enabled: $swap_file"
}

function remove_swap_file() {
    local swap_file="$1"

    if [ -z "$swap_file" ]; then
        echo "Usage: remove_swap_file <swap_file>"
        return 1
    fi

    # Disable swap
    if swapon --show | grep -q "$swap_file"; then
        swapoff "$swap_file"
    fi

    # Remove from fstab
    sed -i "\|$swap_file|d" "$FSTAB_FILE"

    # Remove the file
    rm -f "$swap_file"

    echo "Swap file removed: $swap_file"
}

# Main script logic
case "$1" in
    "list")
        list_swap_entries
        ;;
    "add")
        add_swap_file "$2"
        ;;
    "remove")
        remove_swap_file "$2"
        ;;
    "disable-all")
        swapoff -a
        ;;
    "enable-all")
        swapon -a
        ;;
    *)
        echo "Usage: $0 {list|add <size_mb>|remove <file>|disable-all|enable-all}"
        exit 1
        ;;
esac
```

## Troubleshooting

### Common Issues

#### Cannot Disable Swap - Device Busy
```bash
# Problem: swapoff fails with "device busy" error
# Solution: Identify and stop processes using swap

# 1. Check what's using swap
for file in /proc/*/status; do
    awk '/VmSwap|Name/{printf $2 " " $3}END{ print ""}' "$file" 2>/dev/null
done | grep -v "VmSwap 0" | sort -k2 -nr

# 2. Stop memory-intensive processes
systemctl stop apache2
systemctl stop mysql
killall -9 memory_intensive_process

# 3. Try disabling swap again
swapoff -a
```

#### Insufficient Memory to Disable Swap
```bash
# Problem: Not enough free RAM to move swap data
# Solution: Free up memory or add temporary swap

# 1. Clear system caches
sync
echo 3 > /proc/sys/vm/drop_caches

# 2. Stop unnecessary services
systemctl stop docker
systemctl stop snapd

# 3. Try disabling swap again
swapoff -a

# Alternative: Create temporary larger swap
dd if=/dev/zero of=/tmp/temp_swap bs=1M count=4096
chmod 600 /tmp/temp_swap
mkswap /tmp/temp_swap
swapon /tmp/temp_swap

# Now disable original swap
swapoff /dev/sda2

# Handle the swap replacement as needed
```

#### Swap Device Not Found
```bash
# Problem: swapoff cannot find the specified device
# Solution: Verify device paths and UUIDs

# 1. Check current swap devices
swapon --show
cat /proc/swaps

# 2. List all block devices
lsblk
blkid

# 3. Check fstab entries
grep swap /etc/fstab

# 4. Use correct device identifier
swapoff /dev/disk/by-uuid/1234-abcd-5678-efgh
# or
swapoff UUID=1234-abcd-5678-efgh
```

#### Permission Issues
```bash
# Problem: Permission denied when running swapoff
# Solution: Ensure proper privileges

# 1. Run with sudo
sudo swapoff -a

# 2. Check if user has necessary capabilities
sudo -l

# 3. Add user to proper group (if applicable)
sudo usermod -a -G disk username

# 4. Use sudo for specific operations
sudo swapoff /swapfile
```

## Related Commands

- [`swapon`](/docs/commands/compression/swapon) - Enable devices for paging and swapping
- [`mkswap`](/docs/commands/compression/mkswap) - Set up a Linux swap area
- [`free`](/docs/commands/system-info/free) - Display amount of free and used memory in the system
- [`vmstat`](/docs/commands/system-info/vmstat) - Report virtual memory statistics
- [`top`](/docs/commands/system-info/top) - Display Linux processes
- [`htop`](/docs/commands/system-info/htop) - Interactive process viewer
- [`ps`](/docs/commands/system-info/ps) - Report process status
- [`cat /proc/meminfo`](/docs/commands/system-info/cat) - Display detailed memory information
- [`cat /proc/swaps`](/docs/commands/system-info/cat) - Display active swap information
- [`sysctl`](/docs/commands/system-services/sysctl) - Configure kernel parameters at runtime

## Best Practices

1. **Verify Sufficient RAM** before disabling swap to prevent system instability
2. **Use Verbose Mode** (`-v`) to monitor swap operations and confirm success
3. **Check System Load** before disabling swap to avoid performance issues
4. **Sync Filesystems** before swap operations to ensure data integrity
5. **Monitor Memory Usage** during and after swap operations
6. **Test in Non-Production** environments before implementing in production
7. **Document Changes** when modifying swap configurations
8. **Plan Recovery Steps** before making swap configuration changes
9. **Use System Services** to manage swap automatically on system boot
10. **Regular Monitoring** of swap usage to identify potential memory issues

## Performance Tips

1. **Disable Swap Temporarily** for performance-critical applications
2. **Monitor Swap Usage** regularly to identify memory bottlenecks
3. **Use Fast Storage** for swap devices (SSD preferred over HDD)
4. **Configure Swap Priority** when using multiple swap devices
5. **Tune Swappiness** parameter to control swap behavior
6. **Consider Zswap** or ZRAM for compressed swap in RAM
7. **Use Swap Files** for flexibility instead of dedicated partitions
8. **Monitor System Load** during intensive memory operations
9. **Clear Caches** before disabling swap to free up RAM
10. **Use Multiple Smaller Swap** devices instead of one large one for better performance

The `swapoff` command is an essential tool for Linux system administrators, providing control over virtual memory management and enabling critical system maintenance, performance optimization, and troubleshooting operations. When used properly with appropriate planning and monitoring, it helps maintain optimal system performance and stability.