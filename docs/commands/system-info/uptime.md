---
title: uptime - System Uptime and Load Average
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# uptime - System Uptime and Load Average

The `uptime` command displays how long the system has been running, the number of logged-in users, and the system load averages for the past 1, 5, and 15 minutes. It provides a quick snapshot of system health and activity levels.

## Basic Syntax

```bash
uptime [OPTIONS]
```

## Common Options

- `-p, --pretty` - Show uptime in pretty format
- `-s, --since` - Display system up since date
- `-h, --help` - Display help message
- `-V, --version` - Display version information

## Usage Examples

### Basic Usage
```bash
# Display standard uptime information
uptime

# Show uptime in pretty format
uptime -p

# Show system start time
uptime -s

# Display version information
uptime -V
```

### Understanding Output Format
```bash
# Standard output
$ uptime
10:30:45 up 15 days,  4:32,  2 users,  load average: 0.15, 0.23, 0.18

# Pretty format output
$ uptime -p
up 2 weeks, 1 day, 4 hours, 32 minutes

# Since format output
$ uptime -s
2024-01-15 06:58:12
```

## Understanding the Output

### Standard Output Breakdown
```
10:30:45 up 15 days, 4:32, 2 users, load average: 0.15, 0.23, 0.18
```

#### Time Information
- **10:30:45** - Current system time in 24-hour format

#### Uptime Information
- **up 15 days, 4:32** - System has been running for 15 days and 4 hours, 32 minutes
  - For uptime less than 24 hours: `up 4:32` (hours:minutes)
  - For uptime less than 1 hour: `up 32 min` (minutes)
  - For uptime more than 1 day: `up 15 days, 4:32`

#### User Information
- **2 users** - Number of currently logged-in user sessions
  - This counts sessions, not unique users
  - Multiple sessions from same user are counted separately

#### Load Average
- **load average: 0.15, 0.23, 0.18** - System load averages
  - First value: 1-minute average
  - Second value: 5-minute average
  - Third value: 15-minute average

## Load Average Explained

### What is Load Average?
Load average represents the average number of processes in the system's run queue (processes running or waiting for CPU time) over the specified time period.

### Interpreting Load Average Values

#### Single Core Systems
- **< 1.0**: System is not overloaded
- **1.0-2.0**: System is moderately busy
- **> 2.0**: System is overloaded

#### Multi-Core Systems
For systems with multiple CPU cores, divide the load average by the number of cores:

```bash
# Check number of CPU cores
nproc
# or
cat /proc/cpuinfo | grep processor | wc -l

# Interpret load average based on core count
# 4-core system examples:
# Load 2.0 = 50% utilization (2.0 ÷ 4)
# Load 4.0 = 100% utilization (4.0 ÷ 4)
# Load 6.0 = 150% utilization (6.0 ÷ 4)
```

#### Load Average Patterns
```
Stable load: 0.50, 0.48, 0.52  (Consistent load)
Increasing load: 0.20, 0.60, 1.40  (Rising load)
Decreasing load: 2.10, 1.40, 0.80  (Falling load)
Spiky load: 0.15, 1.80, 0.35  (Temporary spikes)
```

## Practical Examples

### System Health Monitoring
```bash
# Quick system health check
uptime
echo "System health: $(uptime | awk '{print $NF}' | cut -d, -f1) 1-minute load average"

# Check if system is under load
if (( $(uptime | awk '{print $NF}' | cut -d, -f1 | tr -d ',') > 2.0 )); then
    echo "Warning: High system load detected"
    uptime
fi

# Monitor load trends
watch -n 30 'uptime && echo "---"'
```

### Load Average Monitoring Script
```bash
#!/bin/bash
# Monitor system load averages

ALERT_THRESHOLD_1=2.0
ALERT_THRESHOLD_5=1.5
ALERT_THRESHOLD_15=1.0
LOG_FILE="/var/load_monitor.log"

monitor_load() {
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    load_info=$(uptime)

    # Extract load averages
    load_1=$(echo "$load_info" | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
    load_5=$(echo "$load_info" | awk -F'load average:' '{print $2}' | awk '{print $2}' | tr -d ',')
    load_15=$(echo "$load_info" | awk -F'load average:' '{print $2}' | awk '{print $3}')

    echo "[$timestamp] Load: $load_1, $load_5, $load_15" >> $LOG_FILE

    # Check thresholds
    if (( $(echo "$load_1 > $ALERT_THRESHOLD_1" | bc -l) )); then
        echo "[$timestamp] ALERT: High 1-min load: $load_1" >> $LOG_FILE
        logger "High system load detected: $load_1 (1-min average)"
    fi

    if (( $(echo "$load_5 > $ALERT_THRESHOLD_5" | bc -l) )); then
        echo "[$timestamp] WARNING: High 5-min load: $load_5" >> $LOG_FILE
    fi

    if (( $(echo "$load_15 > $ALERT_THRESHOLD_15" | bc -l) )); then
        echo "[$timestamp] CAUTION: High 15-min load: $load_15" >> $LOG_FILE
    fi
}

monitor_load
```

### Uptime Reporting
```bash
#!/bin/bash
# Generate system uptime report

REPORT_FILE="/tmp/uptime_report_$(date +%Y%m%d_%H%M%S).txt"
HOSTNAME=$(hostname)

echo "System Uptime Report" > $REPORT_FILE
echo "====================" >> $REPORT_FILE
echo "Generated: $(date)" >> $REPORT_FILE
echo "Hostname: $HOSTNAME" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Basic uptime information
echo "Current Status:" >> $REPORT_FILE
uptime >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Pretty uptime
echo "Uptime Duration:" >> $REPORT_FILE
uptime -p >> $REPORT_FILE
echo "" >> $REPORT_FILE

# System start time
echo "System Started:" >> $REPORT_FILE
uptime -s >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Load average analysis
echo "Load Average Analysis:" >> $REPORT_FILE
load_1=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
load_5=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $2}' | tr -d ',')
load_15=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $3}')

echo "1-minute:  $load_1" >> $REPORT_FILE
echo "5-minute:  $load_5" >> $REPORT_FILE
echo "15-minute: $load_15" >> $REPORT_FILE

# CPU core count for load comparison
cores=$(nproc)
echo "CPU Cores:  $cores" >> $REPORT_FILE
echo "Load/CPU:   $(echo "scale=2; $load_1 / $cores" | bc) (1-min)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# User information
echo "Current Users:" >> $REPORT_FILE
who | wc -l | xargs echo "Total user sessions:" >> $REPORT_FILE
echo "" >> $REPORT_FILE

echo "Report saved to $REPORT_FILE"
```

### Performance Monitoring Integration
```bash
#!/bin/bash
# Integration with other system monitoring tools

# Function to get system metrics
get_system_metrics() {
    # Uptime and load
    UPTIME_INFO=$(uptime)
    LOAD_1=$(echo "$UPTIME_INFO" | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')

    # Memory info
    MEM_INFO=$(free -m | grep '^Mem:')
    MEM_USED=$(echo $MEM_INFO | awk '{print $3}')
    MEM_TOTAL=$(echo $MEM_INFO | awk '{print $2}')
    MEM_PERCENT=$((MEM_USED * 100 / MEM_TOTAL))

    # CPU info
    CPU_CORES=$(nproc)

    # Current date/time
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    echo "$TIMESTAMP,load=$LOAD_1,cpu_cores=$CPU_CORES,mem_percent=$MEM_PERCENT"
}

# Monitoring loop
echo "Starting system monitoring..."
while true; do
    get_system_metrics >> system_metrics.csv
    sleep 60  # Update every minute
done
```

### Load Threshold Alerts
```bash
#!/bin/bash
# Advanced load monitoring with email alerts

LOAD_1_THRESHOLD=2.0
LOAD_5_THRESHOLD=1.5
EMAIL_ADMIN="admin@example.com"
ALERT_COOLDOWN=300  # 5 minutes between alerts

LAST_ALERT_FILE="/tmp/last_load_alert"

check_load() {
    load_output=$(uptime)
    load_1=$(echo "$load_output" | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
    load_5=$(echo "$load_output" | awk -F'load average:' '{print $2}' | awk '{print $2}' | tr -d ',')

    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # Check if we should send an alert (avoid spamming)
    if [ -f "$LAST_ALERT_FILE" ]; then
        last_alert=$(cat "$LAST_ALERT_FILE")
        current_time=$(date +%s)
        alert_time=$(date -d "$last_alert" +%s 2>/dev/null || echo 0)

        if [ $((current_time - alert_time)) -lt $ALERT_COOLDOWN ]; then
            return  # Skip if within cooldown period
        fi
    fi

    # Check load thresholds
    if (( $(echo "$load_1 > $LOAD_1_THRESHOLD" | bc -l) )); then
        echo "High load alert: $load_output" | logger
        echo "System load alert at $timestamp
Current load: $load_1 (1-min), $load_5 (5-min)
Full uptime output: $load_output

This exceeds the threshold of $LOAD_1_THRESHOLD for 1-minute load." | \
        mail -s "High Load Alert on $(hostname)" "$EMAIL_ADMIN"

        date "+%Y-%m-%d %H:%M:%S" > "$LAST_ALERT_FILE"
    fi
}

check_load
```

### Historical Uptime Tracking
```bash
#!/bin/bash
# Track system uptime and load history

LOG_DIR="/var/log/uptime_history"
mkdir -p "$LOG_DIR"

# Function to log uptime data
log_uptime() {
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    uptime_data=$(uptime)
    pretty_uptime=$(uptime -p)

    # Extract load averages
    load_1=$(echo "$uptime_data" | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
    load_5=$(echo "$uptime_data" | awk -F'load average:' '{print $2}' | awk '{print $2}' | tr -d ',')
    load_15=$(echo "$uptime_data" | awk -F'load average:' '{print $2}' | awk '{print $3}')

    # Count users
    user_count=$(uptime | awk '{print $(NF-4)}')

    # Log to daily file
    daily_log="$LOG_DIR/uptime_$(date +%Y%m%d).csv"
    echo "$timestamp,$load_1,$load_5,$load_15,$user_count" >> "$daily_log"

    echo "Logged: $timestamp - Load: $load_1, $load_5, $load_15, Users: $user_count"
}

# Archive old logs (older than 30 days)
archive_old_logs() {
    find "$LOG_DIR" -name "uptime_*.csv" -mtime +30 -exec gzip {} \;
}

# Main execution
log_uptime
archive_old_logs

# Schedule in cron for regular monitoring
# Add to crontab: */5 * * * * /path/to/uptime_tracker.sh
```

## Best Practices

### 1. **Understanding Load Averages**
- Consider CPU core count when interpreting load values
- Monitor all three time periods (1, 5, 15 minutes)
- Look for trends rather than single snapshots
- Consider the nature of your workload (CPU-bound vs I/O-bound)

### 2. **Monitoring Strategy**
- Use uptime as a quick health indicator
- Correlate with other system metrics
- Establish baselines for your systems
- Set appropriate alert thresholds

### 3. **Performance Analysis**
- Investigate sustained high loads (> 1.0 per core)
- Monitor load patterns during peak hours
- Compare with application performance metrics
- Consider both average and peak loads

### 4. **System Planning**
- Use load history for capacity planning
- Monitor load growth over time
- Plan for seasonal load variations
- Consider load distribution in multi-server environments

### 5. **Integration**
- Combine with other monitoring tools
- Use in automated monitoring scripts
- Include in system health dashboards
- Correlate with business metrics

## Related Commands

- [`w`](/docs/commands/system-monitoring/w) - Show who is logged on and what they are doing
- [`who`](/docs/commands/system-monitoring/who) - Display who is logged in
- [`top`](/docs/commands/system-monitoring/top) - Display dynamic process information
- [`htop`](/docs/commands/system-monitoring/htop) - Interactive process viewer
- [`ps`](/docs/commands/system-monitoring/ps) - Process status
- [`free`](/docs/commands/system-monitoring/free) - Memory usage display
- [`vmstat`](/docs/commands/system-monitoring/vmstat) - Virtual memory statistics
- [`sar`](/docs/commands/system-monitoring/sar) - System activity reporter

## Common Issues and Solutions

### High Load Average
```bash
# Check current load
uptime

# Investigate processes causing high load
top -o %CPU
top -o %MEM

# Check system resources
free -m
df -h

# Monitor over time
watch -n 30 'uptime && ps aux --sort=-%cpu | head -10'
```

### Load Average vs CPU Utilization
```bash
# Remember that load includes processes waiting for I/O
# High load with low CPU % may indicate I/O bottleneck

# Check I/O wait
iostat -x 1 5

# Check disk usage
df -h

# Check network connections
netstat -i
```

The `uptime` command provides a quick and effective way to assess system health and performance. Understanding load averages and system uptime patterns helps administrators maintain optimal system performance and plan for capacity needs. Regular uptime monitoring provides early warning of potential system issues and helps maintain reliable service delivery.