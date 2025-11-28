---
title: smartctl - SMART Monitoring and Control Tool
sidebar_label: smartctl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# smartctl - SMART Monitoring and Control Tool

The `smartctl` command is a powerful utility for controlling and monitoring S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) enabled storage devices. It provides comprehensive access to drive health information, diagnostic capabilities, and predictive failure analysis for HDDs, SSDs, and NVMe drives. Smartctl is part of the smartmontools package and is essential for proactive storage management, data loss prevention, and system maintenance in Linux environments. It supports various interface types including ATA/SATA, SCSI/SAS, and NVMe, making it a universal tool for storage device monitoring across different hardware platforms.

## Basic Syntax

```bash
smartctl [options] device
smartctl [options] --device=TYPE device
```

## Device Types and Interfaces

### Supported Device Types
- `ata` - ATA/SATA devices (default for /dev/sd*)
- `scsi` - SCSI/SAS devices
- `nvme` - NVMe devices
- `sat` - SCSI to ATA Translation (USB enclosures)
- `usbjmicron` - JMicron USB bridge
- `usbprolific` - Prolific USB bridge
- `usbsunplus` - SunPlus USB bridge

### Device Path Patterns
- `/dev/sd[a-z]` - SATA/SCSI devices
- `/dev/nvme[0-9]n[1-9]` - NVMe namespaces
- `/dev/hd[a-z]` - IDE/PATA devices
- `/dev/md[0-9]*` - RAID arrays

## Information and Display Options

### Basic Information Commands
- `-i, --info` - Show device identification and SMART information
- `-a, --all` - Display all SMART information (device info, attributes, logs)
- `-x, --xall` - Show all information including vendor-specific attributes
- `-H, --health` - Show SMART overall health self-assessment
- `-c, --capabilities` - Display device SMART capabilities
- `-A, --attributes` - Show vendor-specific SMART attributes

### Output Format Options
- `-j, --json` - Output in JSON format for automation
- `-f, --format=<format>` - Output format (brief, hex, old, brief[,vendor])
- `-g, --general=<level>` - Set output level (quiet, normal, noisy)
- `-v, --vendor=<id,name,version>` - Vendor-specific attribute definitions
- `-p, --presets=<file>` - Use drive presets file

### Device Selection and Control
- `-d, --device=<type>` - Specify device type (auto, ata, scsi, nvme, sat, etc.)
- `-T, --tolerance=<type>` - Output tolerance (normal, conservative, permissive)
- `-b, --badsum` - Accept checksum errors
- `-r, --report=<type>` - Report type for ATA (ioctl, ataioctl, nvmeioctl)

## SMART Control and Management

### SMART Enable/Disable
- `-s, --smart=<on|off>` - Enable or disable SMART on device
- `-o, --offlineauto=<on|off>` - Enable/disable automatic offline testing
- `-S, --saveauto=<on|off>` - Enable/disable attribute autosave

### Test Management
- `-t, --test=<TEST>` - Run SMART self-test
  - `offline` - Immediate offline test
  - `short` - Short self-test (1-2 minutes)
  - `long` - Long comprehensive test (several hours)
  - `conveyance` - Conveyance test (shipping damage)
  - `selective,<start-span>-<end-span>` - Test specific LBA ranges
  - `selective,redo` - Redo last selective test
  - `selective,next` - Continue selective test
  - `afterselect,on` - Enable offline testing after selective test
  - `afterselect,off` - Disable offline testing after selective test
- `-X, --abort` - Abort all non-self-test operations
- `-C, --captive` - Run test in captive mode (foreground)

## Log and Error Reporting

### Log Types
- `-l, --log=<TYPE>` - Display device logs
  - `error` - Comprehensive SMART error log
  - `selftest` - SMART self-test log
  - `selective` - Selective self-test log
  - `directory` - General purpose directory log
  - `scttemp` - SCT (SMART Command Transport) temperature history
  - `scttempsts` - SCT temperature status
  - `scterhist` - SCT error recovery history
  - `scterc` - SCT error recovery control
  - `devstat` - Device statistics
  - `sataphy` - SATA PHY error counters
  - `gplog,NUM` - General purpose log page number NUM
  - `smartlog,NUM` - SMART log page number NUM

### Error and Warning Reporting
- `-s, --smart=<VALUE>` - SMART feature control
- `-w, --wcreorder=<on|off>` - Enable/disable write cache reordering
- `-F, --firmwarebug=<bug>` - Workaround firmware bugs

## Usage Examples

### Basic Device Information

#### Device Identification and Status
```bash
# Display device information
sudo smartctl -i /dev/sda

# Typical output for SATA device:
smartctl 7.2 2020-12-30 r5155 [x86_64-linux-5.15.0] (local build)
Copyright (C) 2002-20, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Family:     Western Digital Red
Device Model:     WDC WD40EFRX-68WT0N0
Serial Number:    WD-WCC4E0ZV1A7Y
LU WWN Device Id: 5 0014ee 2b5e89b35
Firmware Version: 82.00A82
User Capacity:    4,000,787,030,016 bytes [4.00 TB]
Sector Sizes:      512 bytes logical, 4096 bytes physical
Rotation Rate:    5400 rpm
Form Factor:      3.5 inches
Device is:        In smartctl database [for details use: -P showall]
ATA Version is:   ATA8-ACS, ATA/ATAPI-7 ACS T13/2171-D revision 4
SATA Version is:  SATA 3.0, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Wed Nov 24 15:30:45 2024 EST
SMART support is: Available - device has SMART capability.
SMART support is: Enabled

# NVMe device information
sudo smartctl -i /dev/nvme0

# SCSI device information
sudo smartctl -i /dev/sdb
```

#### Health Status Check
```bash
# Quick health status
sudo smartctl -H /dev/sda

# PASSED example:
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

# WARNING example:
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED
WARNING: Please use the -v option to display vendor specific attributes.

# FAILED example:
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: FAILED!
Drive failure expected in less than 24 hours. SAVE ALL DATA.
```

#### Complete SMART Information
```bash
# Show all available information
sudo smartctl -a /dev/sda

# Show extended information (including vendor-specific)
sudo smartctl -x /dev/sda

# JSON format for automation
sudo smartctl -j -a /dev/sda | jq .

# Get specific information fields
sudo smartctl -j -i /dev/sda | jq '.model_name, .serial_number, .capacity.bytes'
```

### SMART Attributes Analysis

#### Detailed Attribute Display
```bash
# Show all SMART attributes
sudo smartctl -A /dev/sda

# Example output structure:
=== START OF READ SMART DATA SECTION ===
SMART Attributes Data Structure revision number: 16
Vendor Specific SMART Attributes with Thresholds:
ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
  1 Raw_Read_Error_Rate     0x002f   200   200   051    Pre-fail  Always       -       0
  3 Spin_Up_Time            0x0027   186   186   021    Pre-fail  Always       -       5624
  4 Start_Stop_Count        0x0032   100   100   000    Old_age   Always       -       1000
  5 Reallocated_Sector_Ct   0x0033   200   200   140    Pre-fail  Always       -       0
  7 Seek_Error_Rate         0x002f   200   200   051    Pre-fail  Always       -       0
  9 Power_On_Hours          0x0032   093   093   000    Old_age   Always       -       15876
 10 Spin_Retry_Count        0x0033   100   100   051    Pre-fail  Always       -       0
 11 Calibration_Retry_Count 0x0032   100   100   000    Old_age   Always       -       0
 12 Power_Cycle_Count       0x0032   100   100   000    Old_age   Always       -       750
192 Power-Off_Retract_Count 0x0032   200   200   000    Old_age   Always       -       50
193 Load_Cycle_Count        0x0032   195   195   000    Old_age   Always       -       15000
194 Temperature_Celsius     0x0022   118   118   000    Old_age   Always       -       32
196 Reallocated_Event_Count 0x0032   200   200   000    Old_age   Always       -       0
197 Current_Pending_Sector  0x0032   200   200   000    Old_age   Always       -       0
198 Offline_Uncorrectable   0x0030   100   100   000    Old_age   Offline      -       0
199 UDMA_CRC_Error_Count    0x0032   200   200   000    Old_age   Always       -       0
200 Multi_Zone_Error_Rate   0x0008   200   200   051    Old_age   Offline      -       0
```

#### SSD-Specific Attributes
```bash
# SSD attributes monitoring
monitor_ss_health() {
    local device=$1

    echo "=== SSD Health Report for $device ==="

    # Get model information
    model=$(sudo smartctl -i "$device" | grep "Device Model" | cut -d: -f2 | sed 's/^ *//')
    echo "Model: $model"

    # SSD-specific attributes
    echo ""
    echo "SSD Health Indicators:"

    # Wear leveling
    wear=$(sudo smartctl -A "$device" | grep "Wear_Leveling_Count" | awk '{print $10}' 2>/dev/null)
    if [ -n "$wear" ]; then
        echo "  Wear Leveling: $wear%"
        if [ "$wear" -lt 20 ]; then
            echo "    ⚠ WARNING: Low wear leveling count"
        fi
    fi

    # Percentage used
    used=$(sudo smartctl -A "$device" | grep "Percentage_Used" | awk '{print $10}' 2>/dev/null)
    if [ -n "$used" ]; then
        echo "  Drive Usage: $used%"
        if [ "$used" -gt 80 ]; then
            echo "    ⚠ WARNING: High drive usage percentage"
        fi
    fi

    # Available reserved space
    reserved=$(sudo smartctl -A "$device" | grep "Available_Reservd_Space" | awk '{print $10}' 2>/dev/null)
    if [ -n "$reserved" ]; then
        echo "  Reserved Space: $reserved%"
        if [ "$reserved" -lt 10 ]; then
            echo "    ⚠ WARNING: Low reserved space"
        fi
    fi

    # Total bytes written
    tbw=$(sudo smartctl -A "$device" | grep "Total_LBAs_Written" | awk '{print $10}' 2>/dev/null)
    if [ -n "$tbw" ]; then
        # Convert to TB (simplified calculation)
        tb_written=$((tbw * 512 / 1000000000000))
        echo "  Total TB Written: $tb_written TB"
    fi

    # Power-on hours
    hours=$(sudo smartctl -A "$device" | grep "Power_On_Hours" | awk '{print $10}' 2>/dev/null)
    if [ -n "$hours" ]; then
        days=$((hours / 24))
        echo "  Power-on Time: $hours hours ($days days)"
    fi
}

# Usage
monitor_ss_health /dev/nvme0n1
```

### SMART Testing and Diagnostics

#### Running Self-Tests
```bash
# Check current test status
sudo smartctl -l selftest /dev/sda

# Run short self-test
sudo smartctl -t short /dev/sda
echo "Short test started. Monitor with: watch smartctl -l selftest /dev/sda"

# Run long self-test (comprehensive)
sudo smartctl -t long /dev/sda
echo "Long test started. This will take several hours."

# Run conveyance test (for new drives)
sudo smartctl -t conveyance /dev/sda

# Run offline immediate test
sudo smartctl -t offline /dev/sda

# Run selective test on specific LBA ranges
sudo smartctl -t selective,1000000-2000000 /dev/sda

# Abort running tests
sudo smartctl -X /dev/sda
```

#### Captive Mode Testing
```bash
# Run short test in captive mode (wait for completion)
sudo smartctl -C -t short /dev/sda

# Run long test in captive mode
sudo smartctl -C -t long /dev/sda

# Test with timeout
timeout 7200 sudo smartctl -C -t long /dev/sda || echo "Test timed out or failed"
```

#### Test Result Analysis
```bash
# Analyze test results
analyze_test_results() {
    local device=$1

    echo "=== SMART Test Analysis for $device ==="

    # Self-test log
    echo "Self-test History:"
    sudo smartctl -l selftest "$device"

    echo ""
    echo "Recent Test Analysis:"

    # Check for failed tests
    failed_tests=$(sudo smartctl -l selftest "$device" | grep "Failed")
    if [ -n "$failed_tests" ]; then
        echo "❌ Failed tests detected:"
        echo "$failed_tests"
    else
        echo "✓ No failed tests in history"
    fi

    # Check test completion rate
    total_tests=$(sudo smartctl -l selftest "$device" | grep "^#" | wc -l)
    completed_tests=$(sudo smartctl -l selftest "$device" | grep -c "Completed without error")

    if [ "$total_tests" -gt 0 ]; then
        completion_rate=$((completed_tests * 100 / total_tests))
        echo "Test completion rate: $completion_rate% ($completed_tests/$total_tests)"
    fi

    # Check error log
    error_count=$(sudo smartctl -l error "$device" | grep "Error Count" | awk '{print $3}')
    if [ -n "$error_count" ] && [ "$error_count" -gt 0 ]; then
        echo "⚠ SMART error log contains $error_count errors"
    fi
}

# Usage
analyze_test_results /dev/sda
```

### Temperature Monitoring

#### Real-time Temperature Monitoring
```bash
# Monitor disk temperatures
monitor_temperatures() {
    echo "=== Disk Temperature Monitor ==="
    echo "Timestamp: $(date)"
    echo ""

    local max_temp=0
    local hot_disks=""

    for device in /dev/sd[a-z] /dev/nvme[0-9]n1; do
        if [ -b "$device" ] 2>/dev/null; then
            # Try different temperature attributes
            temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}' 2>/dev/null)

            if [ -z "$temp" ]; then
                temp=$(sudo smartctl -A "$device" | grep "Airflow_Temperature_Cel" | awk '{print $10}' 2>/dev/null)
            fi

            if [ -z "$temp" ]; then
                # NVMe temperature
                temp=$(sudo smartctl -J "$device" | jq -r '.temperature.current' 2>/dev/null)
            fi

            if [ -n "$temp" ] && [[ "$temp" =~ ^[0-9]+$ ]]; then
                printf "%-15s %3d°C " "$device" "$temp"

                if [ "$temp" -gt 60 ]; then
                    echo "🔥 CRITICAL"
                    hot_disks="$hot_disks $device"
                elif [ "$temp" -gt 50 ]; then
                    echo "⚠ WARNING"
                elif [ "$temp" -gt 40 ]; then
                    echo "🌡 WARM"
                else
                    echo "✓ OK"
                fi

                if [ "$temp" -gt "$max_temp" ]; then
                    max_temp=$temp
                fi
            else
                echo "$device: N/A"
            fi
        fi
    done

    echo ""
    echo "Maximum temperature: ${max_temp}°C"

    if [ -n "$hot_disks" ]; then
        echo "Hot disks detected:$hot_disks"
    fi
}

# Continuous monitoring with alerts
temperature_alert_daemon() {
    local alert_threshold=55
    local critical_threshold=65
    local check_interval=60

    echo "Starting temperature monitoring daemon..."
    echo "Alert threshold: ${alert_threshold}°C"
    echo "Critical threshold: ${critical_threshold}°C"
    echo "Check interval: ${check_interval} seconds"
    echo ""

    while true; do
        for device in /dev/sd[a-z]; do
            if [ -b "$device" ]; then
                temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}' 2>/dev/null)

                if [ -n "$temp" ] && [[ "$temp" =~ ^[0-9]+$ ]]; then
                    if [ "$temp" -gt "$critical_threshold" ]; then
                        logger -t smartctl "CRITICAL: $device temperature ${temp}°C exceeds threshold"
                        echo "🚨 CRITICAL: $device is ${temp}°C (threshold: ${critical_threshold}°C)"
                    elif [ "$temp" -gt "$alert_threshold" ]; then
                        logger -t smartctl "WARNING: $device temperature ${temp}°C exceeds alert threshold"
                        echo "⚠ WARNING: $device is ${temp}°C (alert: ${alert_threshold}°C)"
                    fi
                fi
            fi
        done

        sleep $check_interval
    done
}
```

#### Temperature History Analysis
```bash
# Analyze temperature history for SATA drives
analyze_temperature_history() {
    local device=$1

    echo "=== Temperature History for $device ==="

    # Check if SCT temperature history is supported
    if sudo smartctl -l scttemp "$device" >/dev/null 2>&1; then
        echo "SCT Temperature History:"
        sudo smartctl -l scttemp "$device"

        echo ""
        echo "SCT Temperature Status:"
        sudo smartctl -l scttempsts "$device"
    else
        echo "SCT temperature history not supported on this device"

        # Try to get current temperature instead
        current_temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}')
        if [ -n "$current_temp" ]; then
            echo "Current temperature: ${current_temp}°C"
        fi
    fi
}

# Usage
analyze_temperature_history /dev/sda
```

### Error Log Analysis

#### Comprehensive Error Analysis
```bash
# Detailed error analysis
analyze_errors() {
    local device=$1

    echo "=== Error Analysis for $device ==="

    # Check SMART error log
    echo "SMART Error Log:"
    if sudo smartctl -l error "$device" | grep -q "No errors"; then
        echo "✓ No SMART errors recorded"
    else
        echo "❌ SMART errors detected:"
        sudo smartctl -l error "$device"
    fi

    echo ""
    echo "Critical Attribute Analysis:"

    # Check critical attributes
    reallocated=$(sudo smartctl -A "$device" | grep "Reallocated_Sector_Ct" | awk '{print $10}')
    if [ -n "$reallocated" ] && [ "$reallocated" -gt 0 ]; then
        echo "⚠ Reallocated sectors: $reallocated"
    fi

    pending=$(sudo smartctl -A "$device" | grep "Current_Pending_Sector" | awk '{print $10}')
    if [ -n "$pending" ] && [ "$pending" -gt 0 ]; then
        echo "⚠ Pending sectors: $pending"
    fi

    uncorrectable=$(sudo smartctl -A "$device" | grep "Offline_Uncorrectable" | awk '{print $10}')
    if [ -n "$uncorrectable" ] && [ "$uncorrectable" -gt 0 ]; then
        echo "❌ Uncorrectable sectors: $uncorrectable"
    fi

    crc_errors=$(sudo smartctl -A "$device" | grep "UDMA_CRC_Error_Count" | awk '{print $10}')
    if [ -n "$crc_errors" ] && [ "$crc_errors" -gt 100 ]; then
        echo "⚠ High CRC error count: $crc_errors (check cable/connection)"
    fi

    echo ""
    echo "Drive Health Score:"
    calculate_health_score "$device"
}

# Simple health scoring
calculate_health_score() {
    local device=$1
    local score=100

    # Reallocated sectors penalty
    reallocated=$(sudo smartctl -A "$device" | grep "Reallocated_Sector_Ct" | awk '{print $10}')
    if [ -n "$reallocated" ]; then
        score=$((score - reallocated * 2))
    fi

    # Pending sectors penalty
    pending=$(sudo smartctl -A "$device" | grep "Current_Pending_Sector" | awk '{print $10}')
    if [ -n "$pending" ]; then
        score=$((score - pending * 5))
    fi

    # Uncorrectable sectors penalty
    uncorrectable=$(sudo smartctl -A "$device" | grep "Offline_Uncorrectable" | awk '{print $10}')
    if [ -n "$uncorrectable" ]; then
        score=$((score - uncorrectable * 10))
    fi

    # Temperature penalty
    temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}')
    if [ -n "$temp" ]; then
        if [ "$temp" -gt 50 ]; then
            score=$((score - (temp - 50)))
        fi
    fi

    if [ "$score" -lt 0 ]; then
        score=0
    fi

    echo "Health Score: $score/100"

    if [ "$score" -ge 80 ]; then
        echo "✓ Excellent health"
    elif [ "$score" -ge 60 ]; then
        echo "⚠ Good health (monitor closely)"
    elif [ "$score" -ge 40 ]; then
        echo "⚠ Fair health (attention needed)"
    else
        echo "❌ Poor health (replace soon)"
    fi
}

# Usage
analyze_errors /dev/sda
```

## Advanced Applications

### Automated Health Monitoring System

#### Comprehensive Monitoring Script
```bash
#!/bin/bash
# Advanced SMART monitoring system

CONFIG_FILE="/etc/smart-monitor.conf"
LOG_FILE="/var/log/smart-monitor.log"
ALERT_EMAIL="admin@example.com"

# Default configuration
TEMP_WARNING=50
TEMP_CRITICAL=60
HEALTH_SCORE_WARNING=70
TEST_INTERVAL_SHORT=7   # days
TEST_INTERVAL_LONG=30   # days

# Load configuration
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
fi

# Logging function
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Send alert function
send_alert() {
    local subject=$1
    local message=$2

    echo "$message" | mail -s "$subject" "$ALERT_EMAIL"
    log_message "ALERT: $subject"
}

# Check device health
check_device_health() {
    local device=$1

    log_message "Checking health for $device"

    # Basic health check
    health=$(sudo smartctl -H "$device" | grep "test result" | cut -d: -f2 | sed 's/^ *//')

    if [ "$health" = "FAILED!" ]; then
        send_alert "CRITICAL: $device Failed SMART Test" "Device $device has failed SMART health test. Immediate backup and replacement required."
        return 1
    fi

    # Temperature check
    temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}')
    if [ -n "$temp" ]; then
        if [ "$temp" -gt "$TEMP_CRITICAL" ]; then
            send_alert "CRITICAL: $device Overheating" "Device $device temperature is ${temp}°C (threshold: ${TEMP_CRITICAL}°C)"
        elif [ "$temp" -gt "$TEMP_WARNING" ]; then
            send_alert "WARNING: $device High Temperature" "Device $device temperature is ${temp}°C (threshold: ${TEMP_WARNING}°C)"
        fi
    fi

    # Health score calculation
    calculate_health_score "$device"

    return 0
}

# Automated testing
schedule_tests() {
    local device=$1
    local force_test=${2:-false}

    # Check last test date
    last_short=$(sudo smartctl -l selftest "$device" | grep "short" | head -1 | awk '{print $6,$7,$8,$9,$10}')

    # Run short test if needed
    if [ "$force_test" = "true" ] || should_run_test "$last_short" "$TEST_INTERVAL_SHORT"; then
        log_message "Starting short SMART test for $device"
        sudo smartctl -t short "$device"
    fi

    # Run long test periodically
    last_long=$(sudo smartctl -l selftest "$device" | grep "long" | head -1 | awk '{print $6,$7,$8,$9,$10}')
    if [ "$force_test" = "true" ] || should_run_test "$last_long" "$TEST_INTERVAL_LONG"; then
        log_message "Starting long SMART test for $device"
        sudo smartctl -t long "$device"
    fi
}

# Check if test should run
should_run_test() {
    local last_test=$1
    local interval_days=$2

    if [ -z "$last_test" ]; then
        return 0  # No previous test
    fi

    # Convert last test date to timestamp
    test_timestamp=$(date -d "$last_test" +%s 2>/dev/null)
    current_timestamp=$(date +%s)
    interval_seconds=$((interval_days * 24 * 3600))

    if [ $((current_timestamp - test_timestamp)) -gt "$interval_seconds" ]; then
        return 0  # Interval exceeded
    else
        return 1  # Within interval
    fi
}

# Main monitoring function
main_monitor() {
    log_message "Starting SMART monitoring system"

    # Get list of storage devices
    devices=$(lsblk -d -n -o NAME | grep -E '^sd|^nvme')

    for device_name in $devices; do
        device="/dev/$device_name"

        if [ -b "$device" ]; then
            # Check if device supports SMART
            if sudo smartctl -i "$device" | grep -q "SMART support is: Available"; then
                check_device_health "$device"
                schedule_tests "$device"
            else
                log_message "Device $device does not support SMART"
            fi
        fi
    done

    log_message "SMART monitoring cycle completed"
}

# Run monitoring
if [ "$1" = "--force-tests" ]; then
    echo "Forcing SMART tests on all devices"
    devices=$(lsblk -d -n -o NAME | grep -E '^sd|^nvme')
    for device_name in $devices; do
        device="/dev/$device_name"
        if [ -b "$device" ]; then
            schedule_tests "$device" true
        fi
    done
else
    main_monitor
fi
```

### NVMe-Specific Monitoring

#### NVMe Health and Performance Analysis
```bash
# NVMe-specific monitoring
monitor_nvme_health() {
    local device=$1

    echo "=== NVMe Health Analysis for $device ==="

    # Basic health information
    sudo smartctl -H "$device"

    echo ""
    echo "NVMe Specific Information:"

    # Get JSON output for detailed analysis
    smart_data=$(sudo smartctl -j -A "$device")

    # Critical warnings
    critical_warning=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.critical_warning // 0')
    if [ "$critical_warning" != "0" ]; then
        echo "⚠ CRITICAL WARNING: $critical_warning"

        # Decode warning bits
        if [ $((critical_warning & 1)) -ne 0 ]; then echo "  - Available spare space below threshold"; fi
        if [ $((critical_warning & 2)) -ne 0 ]; then echo "  - Temperature above threshold"; fi
        if [ $((critical_warning & 4)) -ne 0 ]; then echo "  - Device reliability degraded"; fi
        if [ $((critical_warning & 8)) -ne 0 ]; then echo "  - Read-only mode"; fi
        if [ $((critical_warning & 16)) -ne 0 ]; then echo "  - Volatile memory backup failed"; fi
    else
        echo "✓ No critical warnings"
    fi

    # Temperature sensors
    current_temp=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.temperature // "N/A"')
    echo "Current Temperature: $current_temp K ($((${current_temp:-273} - 273))°C)"

    # Available spare
    available_spare=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.available_spare // "N/A"')
    echo "Available Spare: $available_spare%"

    # Percentage used
    percentage_used=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.percentage_used // "N/A"')
    echo "Drive Used: $percentage_used%"

    # Data units read/written
    data_read=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.data_units_read // 0')
    data_written=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.data_units_written // 0')

    # Convert to GB (1 unit = 512KB)
    gb_read=$((data_read * 512 / 1024 / 1024))
    gb_written=$((data_written * 512 / 1024 / 1024))

    echo "Data Read: ${gb_read} GB"
    echo "Data Written: ${gb_written} GB"

    # Power cycles
    power_cycles=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.power_cycles // 0')
    echo "Power Cycles: $power_cycles"

    # Power-on hours
    power_hours=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.power_on_hours // 0')
    echo "Power-on Hours: $power_hours"

    # Unsafe shutdowns
    unsafe_shutdowns=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.unsafe_shutdowns // 0')
    echo "Unsafe Shutdowns: $unsafe_shutdowns"

    # Media and data integrity errors
    media_errors=$(echo "$smart_data" | jq -r '.nvme_smart_health_information_log.media_and_data_integrity_errors // 0')
    echo "Media/Data Integrity Errors: $media_errors"

    # Error information log
    echo ""
    echo "Error Information Log:"
    sudo smartctl -l error "$device"
}

# NVMe telemetry and performance
monitor_nvme_performance() {
    local device=$1

    echo "=== NVMe Performance Analysis for $device ==="

    # Get SMART information in JSON format
    smart_data=$(sudo smartctl -j -i "$device")

    # Firmware and model information
    model=$(echo "$smart_data" | jq -r '.model_name')
    firmware=$(echo "$smart_data" | jq -r '.firmware_version')
    serial=$(echo "$smart_data" | jq -r '.serial_number')

    echo "Model: $model"
    echo "Firmware: $firmware"
    echo "Serial: $serial"

    # Namespace information
    echo ""
    echo "Namespace Information:"
    sudo nvme id-ns "${device}" | grep -E "^nsze|^ncap|^nuse|^nlbaf"

    # Controller information
    echo ""
    echo "Controller Information:"
    sudo nvme id-ctrl "${device}" | grep -E "^vid|^ssvid|^sn|^mn|^fr|^rab|^cntlid"

    # Health information
    echo ""
    echo "Health Attributes:"
    monitor_nvme_health "$device"
}

# Usage
monitor_nvme_health /dev/nvme0n1
monitor_nvme_performance /dev/nvme0n1
```

### RAID and Multi-Drive Systems

#### RAID Array Monitoring
```bash
# Monitor RAID array disk health
monitor_raid_health() {
    echo "=== RAID Array Health Monitor ==="

    # Check software RAID arrays
    for md_device in /dev/md*; do
        if [ -b "$md_device" ]; then
            echo "RAID Array: $md_device"

            # Get RAID array details
            if command -v mdadm >/dev/null 2>&1; then
                echo "RAID Details:"
                mdadm --detail "$md_device" | grep -E "Array Size|State|Active Devices|Working Devices|Failed Devices"

                echo ""
                echo "Component Devices:"

                # Get component devices
                component_devices=$(mdadm --detail "$md_device" | grep "/dev/sd" | awk '{print $7}')

                for device in $component_devices; do
                    echo "  Checking $device:"

                    # Check SMART health
                    health=$(sudo smartctl -H "$device" 2>/dev/null | grep "test result" | cut -d: -f2 | sed 's/^ *//')

                    if [ -n "$health" ]; then
                        if [ "$health" = "PASSED" ]; then
                            echo "    ✓ SMART Health: PASSED"
                        else
                            echo "    ❌ SMART Health: $health"
                        fi
                    else
                        echo "    ⚠ SMART Health: Not available"
                    fi

                    # Get temperature
                    temp=$(sudo smartctl -A "$device" 2>/dev/null | grep "Temperature_Celsius" | awk '{print $10}')
                    if [ -n "$temp" ]; then
                        echo "    Temperature: ${temp}°C"
                    fi

                    echo ""
                done
            else
                echo "mdadm not available"
            fi
        fi
    done

    # Check hardware RAID controllers if available
    if command -v arcconf >/dev/null 2>&1; then
        echo "Hardware RAID (Adaptec):"
        arcconf getconfig 1
    elif command -v hpacucli >/dev/null 2>&1; then
        echo "Hardware RAID (HP):"
        hpacucli ctrl all show config
    elif command -v MegaCli >/dev/null 2>&1; then
        echo "Hardware RAID (LSI):"
        MegaCli -LDInfo -Lall -aAll
    fi
}

# RAID maintenance and testing
raid_maintenance() {
    local action=${1:-check}

    case "$action" in
        "check")
            monitor_raid_health
            ;;
        "test")
            echo "Starting SMART tests on all RAID component devices..."
            for md_device in /dev/md*; do
                if [ -b "$md_device" ]; then
                    component_devices=$(mdadm --detail "$md_device" 2>/dev/null | grep "/dev/sd" | awk '{print $7}')

                    for device in $component_devices; do
                        echo "Starting short test on $device..."
                        sudo smartctl -t short "$device"
                    done
                fi
            done
            ;;
        "status")
            echo "RAID Array Status Summary:"
            for md_device in /dev/md*; do
                if [ -b "$md_device" ]; then
                    echo -n "$md_device: "
                    mdadm --detail "$md_device" 2>/dev/null | grep "State :" | cut -d: -f2 | sed 's/^ *//'
                fi
            done
            ;;
        *)
            echo "Usage: $0 {check|test|status}"
            ;;
    esac
}
```

## Integration and Automation

### Systemd Service Integration

#### SMART Monitoring Service
```ini
# /etc/systemd/system/smart-monitor.service
[Unit]
Description=SMART Monitoring Service
After=network.target
ConditionACPower=true

[Service]
Type=oneshot
ExecStart=/usr/local/bin/smart-monitor.sh
User=root
Group=root
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/smart-monitor.timer
[Unit]
Description=Run SMART monitoring daily
Requires=smart-monitor.service

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=1800

[Install]
WantedBy=timers.target
```

#### SMART Test Service
```ini
# /etc/systemd/system/smart-test.service
[Unit]
Description=SMART Test Service
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/smart-test.sh
User=root
Group=root
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/smart-test.timer
[Unit]
Description=Run SMART tests weekly
Requires=smart-test.service

[Timer]
OnCalendar=weekly
Persistent=true
RandomizedDelaySec=3600
DayOfWeek=sun
Hour=2

[Install]
WantedBy=timers.target
```

### Network Monitoring Integration

#### Prometheus Exporter
```bash
#!/bin/bash
# smartctl-prometheus-exporter.sh

METRICS_FILE="/var/lib/node_exporter/smartctl.prom"
TEMP_DIR="/tmp/smartctl"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Initialize metrics file
cat > "$METRICS_FILE" << 'EOF'
# HELP smartctl_device_health SMART health status (1=passed, 0=failed)
# TYPE smartctl_device_health gauge
# HELP smartctl_device_temperature_celsius Device temperature in Celsius
# TYPE smartctl_device_temperature_celsius gauge
# HELP smartctl_device_power_on_hours_total Total power-on hours
# TYPE smartctl_device_power_on_hours_total counter
# HELP smartctl_device_reallocated_sectors_total Reallocated sectors count
# TYPE smartctl_device_reallocated_sectors_total counter
# HELP smartctl_device_pending_sectors Pending sectors count
# TYPE smartctl_device_pending_sectors gauge
# HELP smartctl_device_power_cycles_total Power cycles count
# TYPE smartctl_device_power_cycles_total counter
EOF

# Function to add metric
add_metric() {
    local metric_name=$1
    local value=$2
    local labels=$3

    echo "smartctl_${metric_name}{${labels}} ${value}" >> "$METRICS_FILE"
}

# Function to process device
process_device() {
    local device=$1
    local device_name=$(basename "$device")

    # Skip if device doesn't support SMART
    if ! sudo smartctl -i "$device" | grep -q "SMART support is: Available"; then
        return
    fi

    # Get device information
    model=$(sudo smartctl -i "$device" | grep "Device Model" | cut -d: -f2 | sed 's/^ *//' | tr ' ' '_')
    serial=$(sudo smartctl -i "$device" | grep "Serial Number" | cut -d: -f2 | sed 's/^ *//' | tr ' ' '_')

    # Labels for all metrics
    labels="device=\"$device_name\",model=\"$model\",serial=\"$serial\""

    # Health status
    health_status=$(sudo smartctl -H "$device" | grep "test result" | cut -d: -f2 | sed 's/^ *//')
    if [ "$health_status" = "PASSED" ]; then
        add_metric "device_health" 1 "$labels"
    else
        add_metric "device_health" 0 "$labels"
    fi

    # Temperature
    temp=$(sudo smartctl -A "$device" | grep "Temperature_Celsius" | awk '{print $10}' 2>/dev/null)
    if [ -n "$temp" ] && [[ "$temp" =~ ^[0-9]+$ ]]; then
        add_metric "device_temperature_celsius" "$temp" "$labels"
    fi

    # Power-on hours
    hours=$(sudo smartctl -A "$device" | grep "Power_On_Hours" | awk '{print $10}' 2>/dev/null)
    if [ -n "$hours" ] && [[ "$hours" =~ ^[0-9]+$ ]]; then
        add_metric "device_power_on_hours_total" "$hours" "$labels"
    fi

    # Reallocated sectors
    reallocated=$(sudo smartctl -A "$device" | grep "Reallocated_Sector_Ct" | awk '{print $10}' 2>/dev/null)
    if [ -n "$reallocated" ] && [[ "$reallocated" =~ ^[0-9]+$ ]]; then
        add_metric "device_reallocated_sectors_total" "$reallocated" "$labels"
    fi

    # Pending sectors
    pending=$(sudo smartctl -A "$device" | grep "Current_Pending_Sector" | awk '{print $10}' 2>/dev/null)
    if [ -n "$pending" ] && [[ "$pending" =~ ^[0-9]+$ ]]; then
        add_metric "device_pending_sectors" "$pending" "$labels"
    fi

    # Power cycles
    power_cycles=$(sudo smartctl -A "$device" | grep "Power_Cycle_Count" | awk '{print $10}' 2>/dev/null)
    if [ -n "$power_cycles" ] && [[ "$power_cycles" =~ ^[0-9]+$ ]]; then
        add_metric "device_power_cycles_total" "$power_cycles" "$labels"
    fi
}

# Process all devices
for device in /dev/sd[a-z]; do
    if [ -b "$device" ]; then
        process_device "$device"
    fi
done

# Process NVMe devices
for device in /dev/nvme[0-9]n1; do
    if [ -b "$device" ]; then
        process_device "$device"
    fi
done

echo "SMART metrics exported to $METRICS_FILE"
```

#### Grafana Dashboard Configuration
```json
{
  "dashboard": {
    "title": "SMART Monitoring Dashboard",
    "panels": [
      {
        "title": "Disk Health Status",
        "type": "stat",
        "targets": [
          {
            "expr": "smartctl_device_health",
            "legendFormat": "{{device}} - {{model}}"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "thresholds": {
              "steps": [
                {"color": "red", "value": 0},
                {"color": "green", "value": 1}
              ]
            },
            "mappings": [
              {"options": {"0": {"text": "FAILED"}}, "type": "value"},
              {"options": {"1": {"text": "PASSED"}}, "type": "value"}
            ]
          }
        }
      },
      {
        "title": "Disk Temperatures",
        "type": "graph",
        "targets": [
          {
            "expr": "smartctl_device_temperature_celsius",
            "legendFormat": "{{device}} - {{model}}"
          }
        ]
      },
      {
        "title": "Reallocated Sectors",
        "type": "graph",
        "targets": [
          {
            "expr": "smartctl_device_reallocated_sectors_total",
            "legendFormat": "{{device}}"
          }
        ]
      }
    ]
  }
}
```

## Troubleshooting and Best Practices

### Common Issues and Solutions

#### Permission and Access Issues
```bash
# Fix permission denied errors
# 1. Use sudo (recommended)
sudo smartctl -a /dev/sda

# 2. Add user to disk group (may not work for all distributions)
sudo usermod -a -G disk $USER
# Then log out and log back in

# 3. Create sudoers entry for smartctl
echo "ALL ALL=(ALL) NOPASSWD: /usr/sbin/smartctl" | sudo tee /etc/sudoers.d/smartctl

# 4. Use setuid wrapper (advanced)
sudo chmod u+s /usr/sbin/smartctl  # Not recommended for security reasons
```

#### Device Detection Problems
```bash
# List all storage devices
lsblk -f
ls -la /dev/sd*
ls -la /dev/nvme*

# Find devices that support SMART
for device in /dev/sd[a-z]; do
    if [ -b "$device" ]; then
        if sudo smartctl -i "$device" | grep -q "SMART support is: Available"; then
            echo "$device: SMART available"
        else
            echo "$device: SMART not available"
        fi
    fi
done

# Check USB enclosures with different device types
for device in /dev/sd[a-z]; do
    if [ -b "$device" ]; then
        echo "Testing $device with different device types:"
        sudo smartctl -d ata -i "$device" 2>/dev/null && echo "  ata: OK"
        sudo smartctl -d sat -i "$device" 2>/dev/null && echo "  sat: OK"
        sudo smartctl -d scsi -i "$device" 2>/dev/null && echo "  scsi: OK"
    fi
done
```

#### SMART Enable Issues
```bash
# Enable SMART on device
sudo smartctl -s on /dev/sda

# Verify SMART is enabled
sudo smartctl -i /dev/sda | grep "SMART support"

# Some devices require specific sequences
# 1. Enable SMART offline testing
sudo smartctl -o on /dev/sda

# 2. Enable attribute autosave
sudo smartctl -S on /dev/sda

# 3. Check capabilities
sudo smartctl -c /dev/sda
```

#### Test Failures and Timeouts
```bash
# Check if tests are supported
sudo smartctl -c /dev/sda | grep -E "Self-test|Offline"

# Monitor test progress
watch -n 10 'sudo smartctl -l selftest /dev/sda'

# Cancel stuck tests
sudo smartctl -X /dev/sda

# Handle timeouts with background processing
run_test_with_timeout() {
    local device=$1
    local test_type=$2
    local timeout=$3

    echo "Starting $test_type test on $device (timeout: ${timeout}s)"

    # Start test in background
    sudo smartctl -t "$test_type" "$device" &
    test_pid=$!

    # Monitor progress
    local elapsed=0
    while [ $elapsed -lt $timeout ]; do
        if ! ps -p $test_pid >/dev/null; then
            echo "Test completed"
            return 0
        fi

        status=$(sudo smartctl -l selftest "$device" | tail -1)
        echo "Status: $status"

        sleep 10
        elapsed=$((elapsed + 10))
    done

    # Timeout reached
    echo "Test timed out, aborting..."
    sudo smartctl -X "$device"
    kill $test_pid 2>/dev/null
    return 1
}

# Usage
run_test_with_timeout /dev/sda long 7200  # 2 hour timeout
```

### Performance and Optimization

#### Efficient Monitoring Scripts
```bash
# Optimized health check function
quick_health_check() {
    local device=$1
    local timeout=5

    # Use timeout to prevent hanging
    if timeout "$timeout" sudo smartctl -H "$device" >/dev/null 2>&1; then
        # Quick health check passed
        health=$(timeout "$timeout" sudo smartctl -H "$device" 2>/dev/null | grep "test result" | cut -d: -f2 | sed 's/^ *//')
        echo "$device: $health"
        return 0
    else
        echo "$device: ERROR or timeout"
        return 1
    fi
}

# Batch processing for multiple devices
batch_health_check() {
    local devices=("$@")
    local max_jobs=5

    # Process devices in parallel
    for device in "${devices[@]}"; do
        if [ ${#job_pids[@]} -ge $max_jobs ]; then
            wait -n  # Wait for any job to complete
            # Remove completed jobs from array
            for i in "${!job_pids[@]}"; do
                if ! kill -0 "${job_pids[i]}" 2>/dev/null; then
                    unset 'job_pids[i]'
                fi
            done
        fi

        quick_health_check "$device" &
        job_pids+=($!)
    done

    # Wait for all remaining jobs
    wait
}

# Usage with device discovery
devices=($(lsblk -d -n -o NAME | grep -E '^sd|^nvme' | sed 's/^/\/dev\//'))
batch_health_check "${devices[@]}"
```

#### Resource Usage Optimization
```bash
# Low-impact monitoring
lightweight_monitor() {
    local device=$1
    local cache_file="/tmp/smart_cache_$(basename $device)"
    local cache_timeout=300  # 5 minutes

    # Check cache validity
    if [ -f "$cache_file" ]; then
        cache_age=$(($(date +%s) - $(date -r "$cache_file" +%s)))
        if [ $cache_age -lt $cache_timeout ]; then
            echo "Using cached data for $device"
            cat "$cache_file"
            return 0
        fi
    fi

    # Fresh check with minimal options
    echo "Checking $device..."

    # Only check essential attributes
    {
        echo "$(date '+%Y-%m-%d %H:%M:%S')"
        sudo smartctl -H "$device" | grep "test result"
        sudo smartctl -A "$device" | grep -E "(Temperature_Celsius|Reallocated_Sector_Ct|Current_Pending_Sector)" 2>/dev/null
    } > "$cache_file"

    cat "$cache_file"
}

# Resource-friendly batch monitoring
monitor_all_devices_efficiently() {
    local log_file="/var/log/smart_monitor.log"

    {
        echo "=== SMART Monitor Report - $(date) ==="
        echo ""

        # Get device list efficiently
        devices=$(lsblk -d -n -o NAME | grep -E '^sd|^nvme')

        for device_name in $devices; do
            device="/dev/$device_name"

            # Quick check if device supports SMART
            if sudo smartctl -i "$device" 2>/dev/null | grep -q "SMART support is: Available"; then
                lightweight_monitor "$device"
                echo ""
            fi
        done

        echo "=== End Report ==="
        echo ""
    } >> "$log_file"
}
```

## Related Commands

- [`df`](/docs/commands/file-management/df) - Display disk free space
- [`lsblk`](/docs/commands/system-info/lsblk) - List block devices
- [`fdisk`](/docs/commands/system-service/fdisk) - Partition table manipulator
- [`hdparm`](/docs/commands/hardware/hdparm) - Get/set SATA device parameters
- [`badblocks`](/docs/commands/hardware/badblocks) - Search for bad blocks on device
- [`fsck`](/docs/commands/hardware/fsck) - Check and repair filesystem
- [`iostat`](/docs/commands/system-info/iostat) - Statistics for I/O and CPU
- [`iotop`](/docs/commands/system-info/iotop) - Interactive I/O viewer
- [`lshw`](/docs/commands/system-info/lshw) - Hardware information lister
- [`lspci`](/docs/commands/system-info/lspci) - List PCI devices
- [`lsusb`](/docs/commands/system-info/lsusb) - List USB devices
- [`nvme`](/docs/commands/hardware/nvme) - NVMe management utility
- [`mdadm`](/docs/commands/system-service/mdadm) - Linux software RAID management

## Best Practices

1. **Regular Monitoring**: Set up automated daily or weekly health checks
2. **Temperature Monitoring**: Monitor drive temperatures and set up alerts for high values
3. **Test Scheduling**: Run short tests weekly and long tests monthly
4. **Trend Analysis**: Keep historical data to identify degradation patterns
5. **Proactive Replacement**: Replace drives showing early failure signs
6. **RAID Awareness**: Monitor individual drives in RAID arrays separately
7. **Documentation**: Document SMART results and drive replacement history
8. **Backup Strategy**: Maintain current backups regardless of SMART status
9. **Firmware Updates**: Keep drive firmware updated for better SMART accuracy
10. **Cable Quality**: Use high-quality cables to prevent CRC errors

## Performance Tips

1. **Batch Operations**: Process multiple drives in parallel for efficiency
2. **Caching**: Cache SMART data to avoid frequent disk access
3. **JSON Output**: Use JSON format for automation and parsing efficiency
4. **Selective Testing**: Use selective tests for specific disk areas when needed
5. **Off-Peak Testing**: Schedule long tests during low-usage periods
6. **Background Processing**: Run tests in background to avoid blocking
7. **Timeout Handling**: Implement timeouts to prevent hanging operations
8. **Log Rotation**: Implement log rotation for monitoring history
9. **Alert Thresholds**: Set appropriate thresholds based on drive type and usage
10. **Resource Limits**: Monitor CPU and memory usage of smartctl operations

The `smartctl` command is an essential tool for storage system administration, providing critical insights into drive health, enabling predictive maintenance, and helping prevent catastrophic data loss through early failure detection and comprehensive monitoring capabilities.