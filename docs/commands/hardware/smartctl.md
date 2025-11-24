---
title: smartctl - SMART Monitoring Tool
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# smartctl - SMART Monitoring Tool

The `smartctl` command controls and monitors S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) enabled storage devices. It's an essential tool for monitoring disk health, predicting failures, and managing storage device diagnostics in Linux systems.

## Basic Syntax

```bash
smartctl [options] device
```

## Common Options

### Information Options
- `-i, --info` - Show device identification information
- `-a, --all` - Show all S.M.A.R.T. information
- `-H, --health` - Show SMART health status
- `-c, --capabilities` - Show device SMART capabilities
- `-A, --attributes` - Show vendor-specific SMART attributes

### Control Options
- `-s, --smart=<on|off>` - Enable/disable SMART on device
- `-o, --offlineauto=<on|off>` - Enable/disable offline auto tests
- `-S, --saveauto=<on|off>` - Enable/disable Attribute autosave

### Test Options
- `-t, --test=<test>` - Run SMART test
  - `short` - Short self-test
  - `long` - Long self-test
  - `conveyance` - Conveyance self-test
  - `offline` - Immediate offline test
- `-X, --abort` - Abort all non-self-test operations

### Output Options
- `-j, --json` - Output in JSON format
- `-d, --device=<type>` - Specify device type
- `-T, --tolerance=<normal|conservative|permissive>` - Output tolerance
- `-b, --badsum` - Accept checksum errors
- `-r, --report=<type>` - Report type

### Logging Options
- `-l, --log=<type>` - Show device logs
  - `error` - SMART error log
  - `selftest` - SMART self-test log
  - `selective` - Selective self-test log
  - `directory` - GP directory log
  - `scttemp` - SCT temperature history
  - `scterc` - SCT Error Recovery Control
- `-f, --format=<format>` - Output format

## Usage Examples

### Basic Device Information
```bash
# Show device information
sudo smartctl -i /dev/sda

# Typical output:
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.4.0-74-generic] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Family:     Samsung 860 EVO 500GB
Device Model:     Samsung SSD 860 EVO 500GB
Serial Number:    S3Z7NB0K123456
LU WWN Device Id: 5 002538 640123456
Firmware Version: 4B6Q
User Capacity:    500,107,862,016 bytes [500 GB]
Sector Size:      512 bytes logical/physical
Rotation Rate:    Solid State Device
Form Factor:      2.5 inches
Device is:        In smartctl database [for details use: -P showall]
ATA Version is:   ATA8-ACS T13/1699-D revision 4
SATA Version is:  SATA 3.1, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Wed Nov 24 10:30:00 2024 EST
SMART support is: Available - device has SMART capability.
SMART support is: Enabled
```

### Health Status Check
```bash
# Check SMART health status
sudo smartctl -H /dev/sda

# Output example:
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

# Failed device example:
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: FAILED!
Drive command failed: ABORTED operation - no more tests to run
```

### Full SMART Information
```bash
# Show all SMART information
sudo smartctl -a /dev/sda

# This includes device info, SMART data, and logs
```

### SMART Attributes
```bash
# Show vendor-specific SMART attributes
sudo smartctl -A /dev/sda

# Example output:
=== START OF READ SMART DATA SECTION ===
SMART Attributes Data Structure revision number: 1
Vendor Specific SMART Attributes with Thresholds:
ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
  5 Reallocated_Sector_Ct   0x0033   100   100   010    Pre-fail  Always       -       0
  9 Power_On_Hours          0x0032   099   099   000    Old_age   Always       -       1524
 12 Power_Cycle_Count       0x0032   100   100   000    Old_age   Always       -       123
177 Wear_Leveling_Count     0x0013   098   098   000    Pre-fail  Always       -       14
179 Used_Rsvd_Blk_Cnt_Tot   0x0033   100   100   010    Pre-fail  Always       -       0
181 Program_Fail_Cnt_Total  0x0033   100   100   010    Pre-fail  Always       -       0
182 Erase_Fail_Count_Total  0x0032   100   100   000    Old_age   Always       -       0
183 Runtime_Bad_Block       0x0032   100   100   000    Old_age   Always       -       0
184 End-to-End_Error        0x0033   100   100   090    Pre-fail  Always       -       0
187 Reported_Uncorrect      0x0032   100   100   000    Old_age   Always       -       0
188 Command_Timeout         0x0032   100   100   000    Old_age   Always       -       0
190 Airflow_Temperature_Cel 0x0022   069   069   045    Old_age   Always   -       31
194 Temperature_Celsius     0x0022   069   069   000    Old_age   Always       -       31
195 Hardware_ECC_Recovered  0x001a   200   200   000    Old_age   Always       -       0
196 Reallocated_Event_Count 0x0032   100   100   000    Old_age   Always       -       0
197 Current_Pending_Sector  0x0012   100   100   000    Old_age   Always       -       0
198 Offline_Uncorrectable   0x0010   100   100   000    Old_age   Always       -       0
199 UDMA_CRC_Error_Count    0x003e   200   200   000    Old_age   Always       -       0
202 Percentage_Used_Retain  0x0033   100   100   010    Pre-fail  Always       -       1
232 Available_Reservd_Space 0x0033   100   100   010    Pre-fail  Always       -       99
233 Media_Wearout_Indicator 0x0033   100   100   010    Pre-fail  Always       -       1
234 Thermal_Throttle_Stat   0x0032   100   100   000    Old_age   Always       -       0
241 Total_LBAs_Written      0x0032   099   099   000    Old_age   Always       -       12345678
242 Total_LBAs_Read         0x0032   099   099   000    Old_age   Always       -       9876543
```

## Practical Examples

### System Health Monitor
```bash
# Check all storage devices health
check_all_disks_health() {
    echo "=== Disk Health Check ==="
    echo "Date: $(date)"
    echo ""

    for device in /dev/sd[a-z] /dev/nvme[0-9]n1; do
        if [ -b "$device" ]; then
            echo "Checking $device:"
            if smartctl -H "$device" >/dev/null 2>&1; then
                health=$(sudo smartctl -H "$device" | grep "test result" | cut -d: -f2 | sed 's/^ *//')
                if [ "$health" = "PASSED" ]; then
                    echo "  ✓ Status: PASSED"
                else
                    echo "  ✗ Status: FAILED - $health"
                fi

                # Get device model
                model=$(sudo smartctl -i "$device" | grep "Device Model" | cut -d: -f2 | sed 's/^ *//')
                echo "  Model: $model"
            else
                echo "  ✗ SMART not available or accessible"
            fi
            echo ""
        fi
    done
}

# Daily health check script
daily_health_check() {
    log_file="/var/log/disk_health.log"

    {
        echo "=== Daily Disk Health Check ==="
        date

        for device in /dev/sd[a-z]; do
            if [ -b "$device" ]; then
                echo ""
                echo "Device: $device"
                sudo smartctl -H "$device" | grep "test result"
            fi
        done

        echo "================================="
    } >> "$log_file"
}
```

### SMART Test Management
```bash
# Run SMART tests
run_smart_tests() {
    local device=$1

    echo "Running SMART tests on $device"

    # Check current test status
    echo "Current test status:"
    sudo smartctl -l selftest "$device"

    # Run short test
    echo "Starting short self-test..."
    sudo smartctl -t short "$device"

    echo "Short test will take approximately 2-10 minutes"
    echo "Monitor progress with: smartctl -l selftest $device"
}

# Check test results
check_test_results() {
    local device=$1

    echo "=== SMART Test Results for $device ==="
    sudo smartctl -l selftest "$device"

    echo ""
    echo "Error log:"
    sudo smartctl -l error "$device"
}

# Run long test (weekly maintenance)
run_long_test() {
    local device=$1

    echo "Starting long SMART test on $device"
    echo "This will take several hours..."

    sudo smartctl -t long "$device"
    echo "Long test started. Monitor with: watch smartctl -l selftest $device"
}
```

### Temperature Monitoring
```bash
# Monitor disk temperatures
monitor_temperatures() {
    echo "=== Disk Temperature Monitor ==="
    echo "Date: $(date)"
    echo ""

    for device in /dev/sd[a-z]; do
        if [ -b "$device" ]; then
            # Get temperature for ATA devices
            temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}' 2>/dev/null)

            if [ -n "$temp" ]; then
                echo "$device: ${temp}°C"

                # Check if temperature is high
                if [ "$temp" -gt 50 ]; then
                    echo "  ⚠ Warning: High temperature"
                elif [ "$temp" -gt 60 ]; then
                    echo "  🔥 Critical: Very high temperature"
                fi
            else
                echo "$device: Temperature not available"
            fi
        fi
    done
}

# Continuous temperature monitoring
temperature_watch() {
    while true; do
        clear
        monitor_temperatures
        sleep 60
    done
}
```

### Disk Usage Analysis
```bash
# Get detailed disk usage statistics
analyze_disk_usage() {
    local device=$1

    echo "=== Disk Usage Analysis for $device ==="

    # Power-on hours
    hours=$(sudo smartctl -A "$device" | grep "Power_On_Hours" | awk '{print $10}')
    if [ -n "$hours" ]; then
        days=$((hours / 24))
        years=$((days / 365))
        echo "Power-on time: $hours hours ($days days, $years years)"
    fi

    # Start/stop count
    start_stop=$(sudo smartctl -A "$device" | grep "Power_Cycle_Count" | awk '{print $10}')
    if [ -n "$start_stop" ]; then
        echo "Power cycles: $start_stop"
    fi

    # For SSDs: Wear level
    wear=$(sudo smartctl -A "$device" | grep "Wear_Leveling_Count" | awk '{print $10}')
    if [ -n "$wear" ]; then
        echo "SSD Wear Leveling: $wear%"
    fi

    # For SSDs: TB written
    tb_written=$(sudo smartctl -A "$device" | grep "Total_LBAs_Written" | awk '{print $10}')
    if [ -n "$tb_written" ]; then
        # Convert to TB (approximate)
        tb=$((tb_written * 512 / 1000000000000))
        echo "Total TB written: $tb"
    fi
}
```

### JSON Output for Automation
```bash
# Get SMART data in JSON format
get_smart_json() {
    local device=$1

    sudo smartctl -j -A "$device"

    # Example usage in scripts:
    # health=$(sudo smartctl -j -H "$device" | jq '.smart_status.passed')
    # temp=$(sudo smartctl -j -A "$device" | jq '.ata_smart_attributes.table[] | select(.name == "Temperature_Celsius") | .raw.value')
}

# Health monitoring with JSON
monitor_health_json() {
    local device=$1

    # Get health status
    health=$(sudo smartctl -j -H "$device" | jq -r '.smart_status.passed')

    if [ "$health" = "true" ]; then
        echo "✓ $device: Healthy"
    else
        echo "✗ $device: FAILED"

        # Get error count
        errors=$(sudo smartctl -j -l error "$device" | jq '.ata_smart_error_log_table.count')
        echo "  Error count: $errors"
    fi
}
```

### Alert System
```bash
# Check for critical issues
check_critical_issues() {
    local device=$1

    echo "=== Critical Issues Check for $device ==="

    # Check for reallocated sectors
    reallocated=$(sudo smartctl -A "$device" | grep "Reallocated_Sector_Ct" | awk '{print $10}')
    if [ "$reallocated" -gt 0 ]; then
        echo "⚠ Reallocated sectors: $reallocated"
    fi

    # Check for pending sectors
    pending=$(sudo smartctl -A "$device" | grep "Current_Pending_Sector" | awk '{print $10}')
    if [ "$pending" -gt 0 ]; then
        echo "⚠ Pending sectors: $pending"
    fi

    # Check for uncorrectable errors
    uncorrectable=$(sudo smartctl -A "$device" | grep "Offline_Uncorrectable" | awk '{print $10}')
    if [ "$uncorrectable" -gt 0 ]; then
        echo "❌ Uncorrectable sectors: $uncorrectable"
    fi

    # Check temperature
    temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}')
    if [ "$temp" -gt 55 ]; then
        echo "🔥 High temperature: ${temp}°C"
    fi
}

# Email alert for critical issues
email_alert() {
    local device=$1
    local email=$2

    # Check for critical issues
    if sudo smartctl -H "$device" | grep -q "FAILED"; then
        echo "CRITICAL: $device has failed SMART test" | mail -s "Disk Failure Alert" "$email"
    fi

    # Check other critical indicators
    if check_critical_issues "$device" | grep -q "❌\|⚠"; then
        echo "WARNING: $device shows critical SMART indicators" | mail -s "Disk Warning Alert" "$email"
    fi
}
```

## Advanced Usage

### Test Automation
```bash
# Schedule regular tests
schedule_smart_tests() {
    # Add to crontab:
    # 0 2 * * 0 /usr/local/bin/smartctl -t short /dev/sda  # Weekly short test
    # 0 2 1 * * /usr/local/bin/smartctl -t long /dev/sda   # Monthly long test
    echo "Add to crontab for automated testing"
}

# Test all devices
test_all_devices() {
    for device in /dev/sd[a-z]; do
        if [ -b "$device" ]; then
            echo "Testing $device..."
            sudo smartctl -t short "$device"
        fi
    done
}
```

### Custom Device Types
```bash
# NVMe devices
check_nvme() {
    sudo smartctl -a /dev/nvme0

    # NVMe-specific information
    sudo smartctl -l error /dev/nvme0
    sudo smartctl -l selftest /dev/nvme0
}

# RAID arrays
check_raid_devices() {
    # Check individual devices in RAID
    for device in /dev/md*; do
        if [ -b "$device" ]; then
            echo "Checking RAID array $device:"
            mdadm --detail "$device"

            # Check underlying devices
            components=$(mdadm --detail "$device" | grep "/dev/sd" | awk '{print $7}')
            for comp in $components; do
                sudo smartctl -H "$comp"
            done
        fi
    done
}
```

## Related Commands

- [`df`](/docs/commands/file-management/df) - Display disk space usage
- [`lsblk`](/docs/commands/hardware/lsblk) - List block devices
- [`hdparm`](/docs/commands/hardware/hdparm) - Get/set SATA device parameters
- [`badblocks`](/docs/commands/filesystem/badblocks) - Search for bad blocks
- [`fsck`](/docs/commands/filesystem/fsck) - Filesystem consistency check

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# smartctl requires root privileges
sudo smartctl -i /dev/sda

# Add user to disk group (not always sufficient)
sudo usermod -a -G disk $USER
```

#### SMART Not Available
```bash
# Enable SMART on device
sudo smartctl -s on /dev/sda

# Check if SMART is enabled
sudo smartctl -i /dev/sda | grep "SMART support"
```

#### Device Not Found
```bash
# List available storage devices
lsblk
ls /dev/sd*
fdisk -l

# Check device type
sudo smartctl -i /dev/sda
sudo smartctl -d sat -i /dev/sda  # Force SAT for USB enclosures
```

### NVMe Specific Issues
```bash
# Check NVMe health
sudo smartctl -H /dev/nvme0

# NVMe specific logs
sudo smartctl -l error /dev/nvme0
sudo smartctl -l selftest /dev/nvme0
```

## Best Practices

1. **Enable SMART** on all storage devices
2. **Run regular health checks** (daily or weekly)
3. **Monitor temperature** and set alerts for high values
4. **Run periodic tests** (short tests weekly, long tests monthly)
5. **Document SMART results** for trend analysis
6. **Plan for replacement** when showing early failure signs
7. **Use JSON output** for automation and monitoring
8. **Check before critical operations** like system upgrades

The `smartctl` command is essential for proactive storage management, helping prevent data loss through early detection of drive failures.