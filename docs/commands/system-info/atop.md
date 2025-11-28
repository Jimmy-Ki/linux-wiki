---
title: atop - Advanced System and Process Monitor
sidebar_label: atop
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# atop - Advanced System and Process Monitor

The `atop` command is a comprehensive system and process monitor for Linux that provides detailed, color-coded information about system resource utilization. Unlike traditional monitoring tools, atop displays critical system metrics including CPU, memory, disk, and network usage in an intuitive, interactive interface. It records system activity at configurable intervals, maintains historical data for trend analysis, and offers per-process resource accounting that helps identify performance bottlenecks and resource-hungry applications. atop is particularly valuable for system administrators and performance analysts who need real-time monitoring with the ability to analyze historical system behavior.

## Basic Syntax

```bash
atop [OPTIONS] [INTERVAL] [COUNT]
```

## Command Options

### Display Options
- `-a, --all` - Show all processes (including inactive)
- `-b, --begin-time TIME` - Show data beginning from specified time (HH:MM)
- `-e, --end-time TIME` - Show data ending at specified time (HH:MM)
- `-r, --raw` - Show raw counter values instead of per-second rates
- `-R, --read-from-log FILE` - Read data from existing log file
- `-S, --show-swap` - Show detailed swap space information
- `-s, --show-threads` - Show individual threads instead of processes
- `-x, --skip-crit` - Skip critical resource warnings

### Logging Options
- `-w, --write-to-log FILE` - Write data to log file
- `-L, --load-from-log FILE` - Load data from log file
- `-l, --load LOGLEVEL` - Set log level (0-4)
- `-C, --compression LEVEL` - Compress log files (0-9)

### Process Selection
- `-p, --pid PID[,PID...]` - Show only specific process IDs
- `-c, --command REGEX` - Show processes matching command regex
- `-u, --user USER[,USER...]` - Show processes owned by specific users
- `-g, --generic REGEX` - Show processes matching generic criteria

### Output Control
- `-f, --file FILENAME` - Use raw data file instead of live system
- `-P, --per-cpu` - Show per-CPU statistics instead of summary
- `-o, --output FORMAT` - Output format (text, json, html)
- `-q, --quiet` - Suppress warning messages
- `-V, --version` - Display version information
- `-h, --help` - Show help message

### Display Mode Options
- `-m, --memory` - Focus on memory-related information
- `-d, --disk` - Focus on disk I/O statistics
- `-n, --network` - Focus on network statistics
- `-M, --module-list` - Show loaded kernel modules
- `-K, --kernel-version` - Display kernel version information

## Interactive Commands

During execution, atop supports these key commands:
- `q` or `ESC` - Quit the program
- `?` or `h` - Show help information
- `a` - Toggle showing active/inactive processes
- `m` - Sort by memory usage
- `d` - Sort by disk I/O
- `n` - Sort by network activity
- `c` - Sort by CPU usage
- `p` - Sort by process ID
- `t` - Toggle thread view
- `P` - Toggle per-CPU view
- `1` - Show/hide individual CPUs
- `U` - Show per-user statistics
- `S` - Show system statistics
- `r` - Toggle raw/relative values
- `G` - Toggle generic information
- `R` - Reset accumulated counters
- `k` - Kill a process (requires privilege)
- `z` - Toggle color mode

## Usage Examples

### Basic System Monitoring

#### Real-time Monitoring
```bash
# Start atop with default settings
atop

# Start with custom interval (5 seconds)
atop 5

# Start with 10-second interval, show 100 samples then exit
atop 10 100

# Show only active processes
atop -a

# Show detailed memory information
atop -m

# Show per-CPU statistics
atop -P
```

#### Historical Data Analysis
```bash
# Read today's logged data
atop -r /var/log/atop/atop_$(date +%Y%m%d)

# Read data from specific time range
atop -r /var/log/atop/atop_20231201 -b 09:00 -e 17:00

# Show data from yesterday's logs
atop -r /var/log/atop/atop_$(date -d 'yesterday' +%Y%m%d)

# Analyze data from specific log file
atop -r /path/to/atop.log

# Show raw counter values instead of rates
atop -r /var/log/atop/atop_20231201 -R
```

### Advanced Filtering and Selection

#### Process Filtering
```bash
# Monitor specific process by PID
atop -p 1234,5678,9012

# Monitor processes by user
atop -u root,www-data,john

# Show processes matching command pattern
atop -c "nginx|apache"

# Show system processes only
atop -c "^\[.*\]$"

# Monitor processes consuming high CPU
atop -c ".*" | awk '$8 > 50'
```

#### Resource-Specific Monitoring
```bash
# Focus on memory-intensive processes
atop -m -c "java|python|node"

# Monitor disk I/O activity
atop -d

# Show network activity per process
atop -n

# Focus on specific resources
atop -S -m -d -n
```

## Practical Examples

### System Administration

#### Performance Bottleneck Analysis
```bash
# Monitor high CPU usage processes
atop -m -c ".*" -a

# Identify memory leaks over time
atop -m -r /var/log/atop/atop_$(date +%Y%m%d) -b 00:00 -e 23:59

# Track disk I/O bottlenecks
atop -d -P

# Monitor system during peak hours
atop -r /var/log/atop/atop_$(date +%Y%m%d) -b 14:00 -e 16:00

# Find processes consuming swap space
atop -S -c ".*"
```

#### Server Health Monitoring
```bash
# Continuous server monitoring with logging
atop -w /var/log/atop/monitor.log 60 1440

# Monitor critical system services
atop -c "nginx|mysql|postgres|redis"

# Check for unusual activity patterns
atop -r /var/log/atop/atop_$(date +%Y%m%d) | grep -E "(NMB|DSK)"

# Monitor user-specific resource usage
atop -U
```

### Application Performance Analysis

#### Web Server Monitoring
```bash
# Monitor Apache/Nginx processes
atop -c "apache|nginx|httpd"

# Track database process performance
atop -c "mysql|postgres|oracle"

# Monitor application server processes
atop -c "java|node|python"

# Check for memory-intensive applications
atop -m -c "chrome|firefox|java"
```

#### Development Environment Monitoring
```bash
# Monitor build processes
atop -c "make|gcc|g++|mvn"

# Track compilation performance
atop -m -c "gcc|clang|javac"

# Monitor IDE resource usage
atop -c "eclipse|idea|vscode"

# Watch for memory leaks in development
atop -m -r /var/log/atop/atop_$(date +%Y%m%d)
```

## Advanced Usage

### Log Management

#### Custom Logging Setup
```bash
# Create compressed daily logs
atop -w /backup/atop/atop_$(date +%Y%m%d).log 300 288 -C 9

# Set up rotation for log files
for i in {7..1}; do
    mv /var/log/atop/atop_$(date -d "$i days ago" +%Y%m%d).log \
       /backup/atop/atop_$(date -d "$i days ago" +%Y%m%d).log
done

# Monitor specific time window from logs
atop -r /var/log/atop/atop_20231201 -b 09:00 -e 12:00 -w incident.log
```

#### Log Analysis and Reporting
```bash
# Generate daily system usage report
atop -r /var/log/atop/atop_$(date +%Y%m%d) -a | \
    grep -E "(PRC|DSK|NET|MEM)" > daily_report_$(date +%Y%m%d).txt

# Find peak resource usage times
atop -r /var/log/atop/atop_$(date +%Y%m%d) -R | \
    awk '/CPU/ {if ($8 > 80) print $0}'

# Memory usage trend analysis
atop -r /var/log/atop/atop_$(date +%Y%m%d) | \
    grep "MEM" | awk '{print $1, $2, $8}'
```

### Performance Optimization

#### System Resource Tuning
```bash
# Monitor effect of system tuning
atop -m -r /var/log/atop/atop_$(date +%Y%m%d) -b "before_tune" -e "after_tune"

# Compare performance before and after changes
atop -r /var/log/atop/atop_before_change > before.log
atop -r /var/log/atop/atop_after_change > after.log
diff before.log after.log

# Track virtualization performance
atop -P -c "kvm|qemu|vmware|virtualbox"
```

#### Capacity Planning
```bash
# Monitor resource trends for capacity planning
for day in {1..30}; do
    atop -r /var/log/atop/atop_$(date -d "$day days ago" +%Y%m%d) \
        -b 09:00 -e 17:00 >> monthly_trend.log
done

# Track peak usage patterns
atop -r /var/log/atop/atop_$(date +%Y%m%d) -a | \
    awk '/CPU/ {max_cpu = max($8, max_cpu)} \
         /MEM/ {max_mem = max($10, max_mem)} \
         END {print "Peak CPU:", max_cpu "%", "Peak MEM:", max_mem "%"}'
```

## Integration and Automation

### Shell Scripts

#### Automated Monitoring Script
```bash
#!/bin/bash
# Automated system monitoring with atop

LOG_DIR="/var/log/atop"
REPORT_DIR="/reports/atop"
DATE=$(date +%Y%m%d)

# Create daily system report
create_daily_report() {
    echo "=== System Performance Report for $(date +%Y-%m-%d) ===" > "$REPORT_DIR/daily_$DATE.txt"

    # Peak resource usage
    echo "=== Peak Resource Usage ===" >> "$REPORT_DIR/daily_$DATE.txt"
    atop -r "$LOG_DIR/atop_$DATE" -a | grep -E "(CPU|MEM|DSK)" | \
        awk '/CPU/ {if ($8 > cpu_peak) cpu_peak = $8} \
             /MEM/ {if ($10 > mem_peak) mem_peak = $10} \
             END {print "Peak CPU:", cpu_peak "%", "Peak MEM:", mem_peak "%"}' >> "$REPORT_DIR/daily_$DATE.txt"

    # Top resource consumers
    echo -e "\n=== Top CPU Consumers ===" >> "$REPORT_DIR/daily_$DATE.txt"
    atop -r "$LOG_DIR/atop_$DATE" -a | grep -E "PRC" | \
        sort -k8 -n | tail -10 >> "$REPORT_DIR/daily_$DATE.txt"
}

# Alert on threshold breaches
check_thresholds() {
    CURRENT_CPU=$(atop -a 1 1 | grep "CPU" | awk '{print $8}' | cut -d'%' -f1)
    CURRENT_MEM=$(atop -a 1 1 | grep "MEM" | awk '{print $10}' | cut -d'%' -f1)

    if (( $(echo "$CURRENT_CPU > 90" | bc -l) )); then
        echo "ALERT: High CPU usage: $CURRENT_CPU%" | \
            mail -s "CPU Alert" admin@example.com
    fi

    if (( $(echo "$CURRENT_MEM > 95" | bc -l) )); then
        echo "ALERT: High memory usage: $CURRENT_MEM%" | \
            mail -s "Memory Alert" admin@example.com
    fi
}

# Execute monitoring functions
create_daily_report
check_thresholds
```

#### Log Rotation and Cleanup
```bash
#!/bin/bash
# atop log management and rotation

LOG_DIR="/var/log/atop"
ARCHIVE_DIR="/archive/atop"
RETENTION_DAYS=90

# Compress old logs
compress_old_logs() {
    find "$LOG_DIR" -name "atop_*" -mtime +1 -type f -exec gzip {} \;
}

# Move old compressed logs to archive
archive_old_logs() {
    find "$LOG_DIR" -name "atop_*.gz" -mtime +7 -exec mv {} "$ARCHIVE_DIR/" \;
}

# Clean up old archives
cleanup_old_archives() {
    find "$ARCHIVE_DIR" -name "atop_*.gz" -mtime +$RETENTION_DAYS -delete
}

# Execute maintenance
compress_old_logs
archive_old_logs
cleanup_old_archives

echo "atop log maintenance completed on $(date)"
```

### System Integration

#### Cron Job Setup
```bash
# Add to crontab for continuous monitoring
# /etc/cron.d/atop

# Run atop every 5 minutes, keep logs for 28 days
*/5 * * * * root /usr/bin/atop -w /var/log/atop/atop_$(date +\%Y\%m\%d) 300

# Daily log analysis at midnight
0 0 * * * root /usr/local/bin/atop_daily_analysis.sh

# Weekly log cleanup
0 2 * * 0 root /usr/local/bin/atop_log_cleanup.sh
```

#### systemd Service Integration
```bash
# /etc/systemd/system/atop-monitor.service
[Unit]
Description=ATOP System Monitor
After=network.target

[Service]
Type=forking
ExecStart=/usr/bin/atop -w /var/log/atop/atop_$(date +%%Y%%m%%d) 300
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# atop requires root privileges for complete monitoring
# Solution: Run with sudo or configure proper permissions
sudo atop

# Add user to specific groups for partial monitoring
sudo usermod -a -G adm,syslog $USER

# Check atop configuration
cat /etc/atop/atop.conf
```

#### Missing Data or Blank Output
```bash
# Check if atop daemon is running
systemctl status atop

# Start atop service
sudo systemctl start atop
sudo systemctl enable atop

# Check log file permissions
ls -la /var/log/atop/

# Manually create log directory
sudo mkdir -p /var/log/atop
sudo chmod 755 /var/log/atop
```

#### Performance Impact
```bash
# Reduce monitoring interval to decrease overhead
atop 30  # 30-second intervals instead of default 10

# Disable thread monitoring to reduce overhead
atop --no-threads

# Use raw mode for less processing
atop -r

# Monitor specific resources only
atop -m  # Memory only
atop -d  # Disk only
atop -n  # Network only
```

#### Log File Issues
```bash
# Check disk space for log directory
df -h /var/log/atop/

# Clean up large log files
sudo find /var/log/atop -name "atop_*" -size +100M -delete

# Compress old log files
sudo gzip /var/log/atop/atop_*

# Check atop log rotation configuration
cat /etc/logrotate.d/atop
```

## Related Commands

- [`top`](/docs/commands/system-info/top) - Standard process viewer
- [`htop`](/docs/commands/system-info/htop) - Interactive process viewer
- [`vmstat`](/docs/commands/system-info/vmstat) - Virtual memory statistics
- [`iostat`](/docs/commands/system-info/iostat) - I/O statistics
- [`mpstat`](/docs/commands/system-info/mpstat) - CPU statistics
- [`pidstat`](/docs/commands/system-info/pidstat) - Statistics for Linux tasks
- [`sar`](/docs/commands/system-info/sar) - System activity reporter
- [`nethogs`](/docs/commands/system-info/nethogs) - Network monitoring
- [`iotop`](/docs/commands/system-info/iotop) - I/O monitoring
- [`glances`](/docs/commands/system-info/glances) - System monitoring tool

## Best Practices

1. **Use proper intervals** - Balance monitoring frequency with system overhead
2. **Enable logging** - Keep historical data for trend analysis and troubleshooting
3. **Configure log rotation** - Prevent disk space issues from large log files
4. **Monitor during peak hours** - Focus on times when system is heavily used
5. **Use process filtering** - Focus on specific applications or users
6. **Set up alerts** - Automate notifications for threshold breaches
7. **Regular log analysis** - Review historical data for performance trends
8. **Resource-specific monitoring** - Use focused views for targeted analysis
9. **Backup configuration** - Save atop settings and scripts
10. **Document monitoring policies** - Establish clear procedures for system monitoring

## Performance Tips

1. **Longer intervals** reduce overhead but may miss brief spikes
2. **Thread-level monitoring** increases CPU usage significantly
3. **Compressed logging** saves disk space but uses more CPU
4. **Process filtering** reduces overhead by limiting data collection
5. **Raw mode** shows absolute values but uses less processing
6. **Per-CPU monitoring** provides detailed data but increases display complexity
7. **Historical analysis** helps identify performance patterns and trends
8. **Regular cleanup** of old logs prevents disk space issues
9. **Network monitoring** can identify bandwidth hogs and connectivity issues
10. **Memory monitoring** helps detect leaks and optimize application usage

The `atop` command provides comprehensive system monitoring capabilities that go beyond traditional tools. Its ability to record historical data, provide per-process resource accounting, and offer flexible filtering options makes it an essential tool for system administrators and performance analysts who need detailed insights into system behavior and resource utilization patterns.