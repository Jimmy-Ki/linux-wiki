---
title: dmesg - Display kernel ring buffer
sidebar_label: dmesg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dmesg - Display kernel ring buffer

The `dmesg` command is a essential system utility that displays or controls the kernel ring buffer, which contains messages generated during kernel boot-up and runtime operation. This buffer serves as the primary logging mechanism for the Linux kernel, capturing critical system information including hardware detection, driver initialization, error conditions, warnings, and debug messages. As a fundamental diagnostic tool, `dmesg` provides administrators and developers with direct access to kernel-level events, making it invaluable for troubleshooting hardware issues, monitoring system performance, analyzing boot processes, and diagnosing kernel-related problems.

The kernel ring buffer operates as a fixed-size circular buffer that automatically overwrites the oldest messages when full. `dmesg` offers comprehensive control over this buffer, including message filtering by level and facility, time formatting, real-time monitoring, and buffer management operations. The command integrates seamlessly with modern system logging frameworks while maintaining its role as the primary interface for kernel message access.

## Basic Syntax

```bash
dmesg [OPTIONS]
```

## Common Options

### Display Control
- `-C` - Clear the kernel ring buffer
- `-c` - Read and clear the buffer
- `-D` - Disable printing messages to console
- `-E` - Enable printing messages to console
- `-n` - Set console logging level
- `-s` - Set buffer size

### Time Formatting
- `-T` - Show human-readable timestamps
- `-t` - Don't show timestamps
- `--time-format` - Specify time format
- `--since` - Show messages since specified time
- `--until` - Show messages until specified time
- `-d` - Show time delta between messages

### Message Filtering
- `-l` - Filter by message level
- `-f` - Filter by facility
- `-k` - Show only kernel messages
- `-u` - Show only userspace messages
- `-x` - Decode facility and level names

### Output Formatting
- `-L` - Use color output
- `-P` - Don't use pager
- `-S` - Use syslog format
- `-w` - Follow new messages (watch mode)
- `-r` - Raw output format
- `-H` - Human-readable output

## Usage Examples

### Basic Message Viewing

#### Displaying Kernel Messages
```bash
# Display all kernel messages
dmesg

# Display with human-readable timestamps
dmesg -T

# Display without timestamps
dmesg -t

# Display in color with decoded facilities
dmesg -L -x

# Show message delta between entries
dmesg -d
```

#### Buffer Management
```bash
# Clear the kernel ring buffer
sudo dmesg -C

# Read and clear buffer (captures current messages)
sudo dmesg -c > current_messages.log

# Set console message level to only show errors
sudo dmesg -n 3

# Disable console message output
sudo dmesg -D

# Re-enable console message output
sudo dmesg -E
```

#### Real-time Monitoring
```bash
# Follow new messages in real-time
dmesg -w

# Real-time monitoring with timestamps and color
dmesg -w -T -L

# Follow messages and save to log file
dmesg -w | tee -a /var/log/kernel_monitor.log
```

### Message Filtering

#### Filtering by Message Level
```bash
# Show only error messages
dmesg -l err

# Show errors and warnings
dmesg -l err,warn

# Show critical messages and above
dmesg -l emerg,alert,crit

# Show only debug messages
dmesg -l debug

# Show informational messages
dmesg -l info,notice

# Exclude debug messages
dmesg -l emerg,alert,crit,err,warn,notice,info
```

#### Filtering by Facility
```bash
# Show only kernel messages
dmesg -k

# Show only userspace messages
dmesg -u

# Show specific facilities
dmesg -f kern,daemon

# Show authentication-related messages
dmesg -f auth

# Show mail system messages
dmesg -f mail
```

#### Time-based Filtering
```bash
# Show messages from last hour
dmesg --since "1 hour ago"

# Show messages from today
dmesg --since "today"

# Show messages within date range
dmesg --since "2024-01-01" --until "2024-01-02"

# Show recent messages with specific time format
dmesg --time-format iso --since "10 minutes ago"

# Show messages since last boot
dmesg --since "yesterday"
```

### Hardware Diagnostics

#### Memory Issues
```bash
# Check for memory errors
dmesg | grep -i "mem.*error"

# Look for OOM killer activity
dmesg | grep -i "killed process"

# Check for allocation failures
dmesg | grep -i "allocation.*fail"

# Monitor memory management
dmesg -T | grep -E "(Memory|RAM|mem)"

# Check for ECC errors (if supported)
dmesg | grep -i "ecc.*error"
```

#### Disk and Storage Issues
```bash
# Check for I/O errors
dmesg | grep -i "I/O error"

# Look for filesystem errors
dmesg | grep -E "(filesystem|ext4|xfs|btrfs)"

# Check for disk detection issues
dmesg | grep -E "(sd[a-z]|hd[a-z]|nvme)"

# Monitor RAID status
dmesg | grep -i raid

# Check for DMA issues
dmesg | grep -i dma
```

#### Network Interface Problems
```bash
# Check network interface errors
dmesg | grep -E "(net|eth|wlan|enp).*error"

# Look for driver loading failures
dmesg | grep -E "(failed.*load|unknown.*nic)"

# Check link status changes
dmesg | grep -E "(link.*down|link.*up)"

# Monitor network hardware detection
dmesg | grep -i "network.*device"

# Check for interrupt conflicts
dmesg | grep -E "(irq.*net|interrupt.*net)"
```

#### USB Device Issues
```bash
# Check USB device detection
dmesg | grep -i "usb.*device"

# Look for USB errors
dmesg | grep -E "(usb.*error|device.*disconnect)"

# Check USB driver issues
dmesg | grep -E "(usb.*driver|usb.*probe)"

# Monitor USB power management
dmesg | grep -i "usb.*power"

# Check USB controller status
dmesg | grep -E "(ehci|uhci|xhci)"
```

### System Boot Analysis

#### Boot Process Diagnosis
```bash
# Check BIOS/UEFI information
dmesg | grep -i "bios\|uefi"

# Look for ACPI issues
dmesg | grep -i acpi

# Check kernel boot parameters
dmesg | grep "Command line"

# Examine hardware detection during boot
dmesg | grep -E "(PCI|ACPI|CPU)"

# Check initialization sequence
dmesg -T | head -50
```

#### Service and Driver Issues
```bash
# Check for failed module loading
dmesg | grep -E "(failed.*module|cannot.*find)"

# Look for service startup problems
dmesg | grep -i "failed.*start"

# Check for driver initialization
dmesg | grep -E "(driver.*loaded|module.*initialized)"

# Look for permission issues
dmesg | grep -E "(permission.*denied|access.*denied)"
```

### Performance Monitoring

#### CPU Performance
```bash
# Check CPU frequency changes
dmesg | grep -E "(cpu.*freq|governor)"

# Look for CPU hotplug events
dmesg | grep -E "(cpu.*hotplug|cpu.*online|cpu.*offline)"

# Monitor scheduler information
dmesg | grep -E "(scheduler|cfs|rt)"

# Check for CPU errors
dmesg | grep -E "(cpu.*error|machine.*check)"
```

#### Memory Performance
```bash
# Check memory allocation patterns
dmesg | grep -E "(alloc.*memory|memory.*alloc)"

# Look for memory pressure
dmesg | grep -E "(memory.*pressure|low.*memory)"

# Monitor slab allocator
dmesg | grep -i slab

# Check for memory leaks
dmesg | grep -E "(memory.*leak|unfreed.*memory)"
```

## Practical Examples

### System Administration

#### Automated Monitoring
```bash
#!/bin/bash
# kernel_monitor.sh - Kernel message monitoring script

LOG_FILE="/var/log/kernel_monitor.log"
ALERT_LEVELS="emerg,alert,crit,err"

echo "Starting kernel message monitor..." | tee -a "$LOG_FILE"

# Monitor for critical messages
dmesg -w | while read -r line; do
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $line" >> "$LOG_FILE"

    # Check for alert-level messages
    if echo "$line" | grep -qiE "(emerg|alert|crit|err)"; then
        echo "[$timestamp] CRITICAL: $line" | logger -t kernel_monitor -p daemon.err

        # Send notification (customize as needed)
        # echo "Critical kernel message: $line" | mail -s "Kernel Alert" admin@example.com
    fi
done
```

#### Error Statistics Script
```bash
#!/bin/bash
# error_stats.sh - Kernel error statistics collector

TEMP_FILE=$(mktemp)
REPORT_FILE="/var/log/kernel_stats_$(date +%Y%m%d).log"

echo "=== Kernel Error Statistics Report $(date) ===" | tee "$REPORT_FILE"
echo | tee -a "$REPORT_FILE"

# Collect recent messages
dmesg -T > "$TEMP_FILE"

# Statistics by level
echo "Message Levels:" | tee -a "$REPORT_FILE"
for level in emerg alert crit err warn notice info debug; do
    count=$(grep -i "$level" "$TEMP_FILE" | wc -l)
    printf "  %-8s: %4d messages\n" "$level" "$count" | tee -a "$REPORT_FILE"
done
echo | tee -a "$REPORT_FILE"

# Error keyword statistics
echo "Error Keywords:" | tee -a "$REPORT_FILE"
keywords=("error" "failed" "timeout" "panic" "oops" "warning" "critical" "alert")
for keyword in "${keywords[@]}"; do
    count=$(grep -i "$keyword" "$TEMP_FILE" | wc -l)
    if [ $count -gt 0 ]; then
        printf "  %-10s: %4d occurrences\n" "$keyword" "$count" | tee -a "$REPORT_FILE"
    fi
done

# Cleanup
rm -f "$TEMP_FILE"
echo "Report saved to: $REPORT_FILE"
```

#### Hardware Health Check
```bash
#!/bin/bash
# hardware_health.sh - Hardware status checker

echo "=== Hardware Health Check $(date) ==="
echo

# CPU status
echo "CPU Information:"
dmesg | grep -E "(CPU|processor)" | tail -5
echo

# Memory status
echo "Memory Status:"
dmesg | grep -E "(Memory|RAM)" | tail -5
echo

# Storage devices
echo "Storage Devices:"
dmesg | grep -E "(sd[a-z]|hd[a-z]|nvme)" | tail -10
echo

# Network interfaces
echo "Network Interfaces:"
dmesg | grep -E "(eth|enp|wlan)" | tail -5
echo

# USB devices
echo "USB Devices:"
dmesg | grep -E "(USB|usb)" | tail -5
echo

# Recent errors (last 10)
echo "Recent Errors:"
dmesg -T | grep -iE "(error|failed|warning)" | tail -10
```

### Troubleshooting Common Issues

#### System Boot Problems
```bash
# Check boot sequence
dmesg | grep -E "(init|systemd|boot)" | head -20

# Look for hardware detection failures
dmesg | grep -E "(failed.*detect|cannot.*find)"

# Check for driver issues
dmesg | grep -E "(driver.*fail|module.*error)"

# Examine ACPI issues
dmesg | grep -i acpi | grep -E "(error|warning)"

# Check for filesystem mount issues
dmesg | grep -E "(mount.*failed|filesystem.*error)"
```

#### Performance Issues
```bash
# Check for I/O bottlenecks
dmesg | grep -E "(I/O.*slow|disk.*busy)"

# Look for memory pressure indicators
dmesg | grep -E "(out of memory|memory.*pressure)"

# Check for CPU throttling
dmesg | grep -E "(thermal.*throttle|cpu.*hot)")

# Look for network buffer issues
dmesg | grep -E "(buffer.*overflow|queue.*full)"
```

#### Security-related Issues
```bash
# Check for SELinux denials
dmesg | grep -i "selinux.*denied"

# Look for authentication failures
dmesg | grep -E "(auth.*fail|login.*fail)"

# Check for permission denials
dmesg | grep -E "(permission.*denied|access.*denied)"

# Monitor for suspicious kernel activity
dmesg | grep -E "(intrusion|malicious|suspicious)"
```

## Advanced Usage

### Integration with System Tools

#### Systemd Integration
```bash
# Create systemd service for monitoring
# File: /etc/systemd/system/dmesg-monitor.service

[Unit]
Description=Kernel Message Monitor
After=network.target syslog.service

[Service]
Type=simple
ExecStart=/usr/local/bin/kernel_monitor.sh
Restart=always
RestartSec=30
User=root
Group=root
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

#### Log Rotation Setup
```bash
# File: /etc/logrotate.d/dmesg-logs

/var/log/kernel_monitor.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        # Archive current dmesg output
        dmesg -T > /var/log/dmesg_archive_$(date +%Y%m%d).log
    endscript
}
```

#### Cron-based Monitoring
```bash
# Add to crontab for periodic checks

# Every 5 minutes: check for critical errors
*/5 * * * * /usr/local/bin/error_stats.sh >> /var/log/kernel_errors.log 2>&1

# Daily at midnight: save complete dmesg output
0 0 * * * dmesg -T > /var/log/dmesg_$(date +\%Y\%m\%d).log

# Weekly: hardware status report
0 6 * * 1 /usr/local/bin/hardware_health.sh >> /var/log/hardware_status.log 2>&1
```

### Custom Filtering and Analysis

#### Complex Filtering Examples
```bash
# Multiple criteria filtering
dmesg -T | grep -E "(error|failed)" | grep -i "usb"

# Time-based error filtering
dmesg --since "1 hour ago" -l err,warn,crit

# Facility and level combination
dmesg -f kern -l err,crit

# Exclude certain message types
dmesg | grep -vE "(debug|info|notice)"

# Find messages related to specific hardware
dmesg | grep -A5 -B5 "Intel.*Ethernet"
```

#### Pattern Analysis
```bash
# Count error types
dmesg | grep -i error | cut -d: -f4 | sort | uniq -c | sort -nr

# Analyze message frequency over time
dmesg -T | awk '{print $1,$2}' | sort | uniq -c

# Find most active facilities
dmesg -x | awk '{print $3}' | sort | uniq -c | sort -nr

# Identify problematic devices
dmesg | grep -i error | grep -oE '[a-zA-Z0-9_]*[0-9]*:' | sort | uniq -c
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Issues
```bash
# Problem: Permission denied when running dmesg
$ dmesg
dmesg: read kernel buffer failed: Operation not permitted

# Solution 1: Use sudo
sudo dmesg

# Solution 2: Add user to appropriate group
sudo usermod -a -G systemd-journal $USER
newgrp systemd-journal

# Solution 3: Check kernel restrictions
sudo sysctl kernel.dmesg_restrict

# If restricted (value=1), you can temporarily disable (not recommended for production)
sudo sysctl -w kernel.dmesg_restrict=0
```

#### Empty Buffer Issues
```bash
# Problem: No messages in buffer
dmesg
# (no output)

# Check current settings
dmesg -n

# Lower logging level to show more messages
sudo dmesg -n 7

# Check if buffer was cleared
sudo dmesg

# Reboot to collect fresh messages if needed
sudo reboot
```

#### Timestamp Problems
```bash
# Problem: Incorrect or missing timestamps

# Use human-readable format
dmesg -T

# Use ISO format
dmesg --time-format iso

# Check system time synchronization
timedatectl status

# Sync system time if needed
sudo ntpdate -s time.nist.gov
```

#### Performance Impact
```bash
# Problem: dmesg causing performance issues

# Reduce console message output
sudo dmesg -n 3

# Disable console logging temporarily
sudo dmesg -D

# Increase buffer size to prevent frequent clearing
sudo dmesg -s 65536

# Use more efficient filtering (avoid pipes when possible)
dmesg -l err  # More efficient than dmesg | grep err
```

### Error Analysis

#### Memory Issues Diagnosis
```bash
# Check for out-of-memory conditions
dmesg | grep -i "out of memory\|oom"

# Look for memory allocation failures
dmesg | grep -E "allocation.*fail\|cannot.*allocate"

# Check for slab memory issues
dmesg | grep -i slab

# Analyze memory pressure
dmesg | grep -E "memory.*pressure\|low.*memory"
```

#### Hardware Failure Indicators
```bash
# Check disk SMART warnings
dmesg | grep -i "smart.*fail\|disk.*error"

# Look for hardware ECC errors
dmesg | grep -i "ecc.*error\|memory.*error"

# Check for thermal issues
dmesg | grep -i "thermal\|temperature.*high\|overheat"

# Monitor for power supply issues
dmesg | grep -E "power.*fail|voltage.*error"
```

## Related Commands

- [`journalctl`](/docs/commands/user-management/journalctl) - Systemd journal viewer
- [`logger`](/docs/commands/user-management/logger) - System logging utility
- [`top`](/docs/commands/system-information/top) - Process and system monitor
- [`htop`](/docs/commands/system-information/htop) - Interactive process viewer
- [`iostat`](/docs/commands/system-information/iostat) - I/O statistics
- [`sar`](/docs/commands/system-information/sar) - System activity reporter
- [`vmstat`](/docs/commands/system-information/vmstat) - Virtual memory statistics
- [`lshw`](/docs/commands/system-information/lshw) - Hardware lister
- [`lscpu`](/docs/commands/system-information/lscpu) - CPU information
- [`lsblk`](/docs/commands/system-information/lsblk) - Block device information

## Best Practices

1. **Regular Monitoring** - Check dmesg output daily for errors and warnings
2. **Automated Alerting** - Set up scripts to monitor critical messages
3. **Log Archiving** - Save dmesg output periodically for historical analysis
4. **Trend Analysis** - Monitor error patterns to identify recurring issues
5. **Buffer Management** - Appropriately size the kernel message buffer
6. **Access Control** - Implement proper permissions for kernel message access
7. **Integration** - Combine with other monitoring tools for comprehensive coverage
8. **Documentation** - Document system-specific message patterns and their meanings

## Performance Tips

1. **Use specific flags** like `-l` for level filtering instead of piping to grep
2. **Limit real-time monitoring** duration to avoid resource consumption
3. **Choose appropriate time formats** to minimize processing overhead
4. **Use color output** (`-L`) for better error identification during troubleshooting
5. **Batch filtering operations** to reduce system calls
6. **Consider using journalctl** for complex queries across multiple logs
7. **Archive old messages** to keep buffer size manageable
8. **Monitor system resources** when running intensive dmesg operations

The `dmesg` command is an essential tool for system administration and troubleshooting, providing direct access to kernel messages that are crucial for maintaining system health and performance. Its comprehensive filtering, formatting, and monitoring capabilities make it indispensable for diagnosing hardware issues, tracking system events, and ensuring optimal system operation.