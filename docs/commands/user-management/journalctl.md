---
title: journalctl - Query systemd journal
sidebar_label: journalctl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# journalctl - Query systemd journal

The `journalctl` command is a powerful utility for querying and displaying messages from the systemd journal, which collects and manages log data from the kernel, system services, and user processes. It provides comprehensive access to system logs with advanced filtering, formatting, and real-time monitoring capabilities. Journalctl is the modern replacement for traditional log viewing tools like `dmesg`, `lastlog`, and syslog utilities in systemd-based Linux distributions.

## Basic Syntax

```bash
journalctl [OPTIONS] [MATCHES...]
```

## Common Options

### Output Control
- `-n, --lines=NUM` - Show the latest NUM entries (default: 10)
- `-f, --follow` - Follow the journal in real-time (like tail -f)
- `-e, --pager-end` - Jump to the end of the journal in the pager
- `-r, --reverse` - Show the newest entries first
- `-o, --output=FORMAT` - Control output format (short, short-iso, short-precise, json, json-pretty, cat, etc.)
- `-a, --all` - Show all fields, including long and unprintable
- `-q, --quiet` - Suppress informational messages
- `--no-pager` - Do not pipe output into a pager

### Filtering Options
- `-u, --unit=UNIT` - Show messages for the specified unit
- `-t, --identifier=IDENTIFIER` - Show messages with specified syslog identifier
- `-p, --priority=PRIORITY` - Filter by priority level (emerg, alert, crit, err, warning, notice, info, debug)
- `-b, --this-boot` - Show messages from the current boot
- `--since=TIME`, `--until=TIME` - Show entries since or until specified time
- `-k, --dmesg` - Show kernel messages (same as dmesg)
- `--system` - Show the system journal
- `--user` - Show the user journal

### Time and Date Options
- `--since="TIMESTAMP"` - Show entries since the specified time
- `--until="TIMESTAMP"` - Show entries until the specified time
- `--today`, `--yesterday` - Show entries from today or yesterday
- `--utc` - Display time in UTC

### Boot and Session Options
- `-b [ID][+offset]` - Show messages from a specific boot
- `--list-boots` - Show a table of available boots
- `-i, --identifier` - Show syslog identifier only

### Display Options
- `--no-full` - Don't show full field values, truncate instead
- `--catalog` - Augment log lines with explanations from the message catalog
- `--show-cursor` - Show the cursor after the last entry

## Usage Examples

### Basic Log Viewing

#### Viewing Recent Logs
```bash
# Show the last 10 log entries
journalctl

# Show the last 50 entries
journalctl -n 50

# Show the last 100 lines without pager
journalctl -n 100 --no-pager

# Show logs in reverse chronological order
journalctl -r

# Follow logs in real-time
journalctl -f

# Follow logs with full field values
journalctl -f -a
```

#### View Logs from Current Boot
```bash
# Show logs from current boot only
journalctl -b

# Show logs from current boot, most recent first
journalctl -b -r

# Show kernel messages from current boot
journalctl -b -k

# Show logs from current boot since last 1 hour
journalctl -b --since "1 hour ago"
```

### Filtering by Unit and Service

#### Service-Specific Logs
```bash
# Show logs for nginx service
journalctl -u nginx.service

# Show logs for multiple services
journalctl -u nginx.service -u mysql.service

# Show logs for all services containing "ssh"
journalctl -u "*ssh*"

# Show logs for a specific user service
journalctl --user -u my-app.service

# Show logs for a socket
journalctl -u docker.socket
```

#### Process and Application Logs
```bash
# Show logs with specific syslog identifier
journalctl -t kernel
journalctl -t systemd
journalctl -t cron

# Show logs from specific process
journalctl _PID=1234

# Show logs with specific message ID
journalctl MESSAGE_ID=...
```

### Priority and Severity Filtering

#### Filter by Log Level
```bash
# Show only error messages and above
journalctl -p err

# Show warning and error messages
journalctl -p warning..err

# Show debug messages
journalctl -p debug

# Show all messages from priority 3 (err) and above
journalctl -p 3..

# Show messages with specific priority range
journalctl -p info..warning

# Show critical and alert messages
journalctl -p crit..alert
```

### Time-Based Filtering

#### Time Range Queries
```bash
# Show logs from today
journalctl --since today

# Show logs from yesterday
journalctl --since yesterday --until today

# Show logs from specific time range
journalctl --since "2024-01-01 00:00:00" --until "2024-01-02 00:00:00"

# Show logs from the last hour
journalctl --since "1 hour ago"

# Show logs from the last 24 hours
journalctl --since "24 hours ago"

# Show logs since system boot
journalctl --since "$(systemd-analyze timestamp)"

# Show logs until a specific time
journalctl --until "2024-01-01 12:00:00"

# Show logs from last week
journalctl --since "last week"
```

### Kernel and System Messages

#### Kernel Messages
```bash
# Show kernel messages (equivalent to dmesg)
journalctl -k

# Show kernel messages from current boot
journalctl -k -b

# Show kernel messages with priority error and above
journalctl -k -p err

# Show kernel messages in reverse order
journalctl -k -r

# Show kernel messages since yesterday
journalctl -k --since yesterday
```

#### Systemd Messages
```bash
# Show systemd messages
journalctl -t systemd

# Show systemd service start/stop messages
journalctl -t systemd | grep -E "(Starting|Started|Stopping|Stopped)"

# Show systemd failed services
journalctl -b -p err -t systemd

# Show systemd login sessions
journalctl -t systemd-logind
```

## Practical Examples

### System Administration

#### System Boot Analysis
```bash
# Show boot process analysis time
systemd-analyze

# Show which services took longest to start
systemd-analyze blame

# Show critical chain of services
systemd-analyze critical-chain

# Show boot logs with timestamps
journalctl -b -o short-iso

# Show boot performance metrics
journalctl -b -u systemd-analyze.service

# Show boot messages since last reboot
journalctl -b -n 1000

# Show boot warnings and errors
journalctl -b -p warning..err
```

#### Service Troubleshooting
```bash
# Check if a service failed to start
journalctl -u nginx.service -p err

# Show detailed service logs with full paths
journalctl -u apache2.service -b

# Show service startup sequence
journalctl -b | grep -E "(Starting|Started) "

# Show service restart history
journalctl -u mysql.service | grep -i restart

# Show service crash logs
journalctl -u my-app.service -p crit --since today

# Show logs when a specific user logged in
journalctl _UID=1000 -t systemd-logind
```

#### System Performance Monitoring
```bash
# Monitor high CPU usage messages
journalctl -f | grep -i "cpu"

# Monitor memory pressure events
journalctl -f -k | grep -i "memory"

# Monitor disk I/O errors
journalctl -f -k | grep -i "i/o error"

# Monitor network interface events
journalctl -f -u NetworkManager.service

# Monitor systemd events in real-time
journalctl -f -t systemd
```

### Security and Auditing

#### Security Event Monitoring
```bash
# Show authentication failures
journalctl -t sshd -p err

# Show sudo usage
journalctl -t sudo

# Show failed login attempts
journalctl -t sshd | grep "Failed password"

# Show user session logs
journalctl -t systemd-logind

# Show audit events (if auditd is integrated)
journalctl -t audit

# Show security-related messages
journalctl | grep -i "security"

# Show firewall events
journalctl -u firewalld.service

# Show SELinux events
journalctl -t audit | grep -i selinux
```

#### Log Analysis and Investigation
```bash
# Find all error messages from today
journalctl --since today -p err

# Search for specific error patterns
journalctl | grep -i "disk full"

# Show logs around a specific timestamp
journalctl --since "2024-01-01 10:00:00" --until "2024-01-01 10:05:00"

# Show logs with specific process name
journalctl _COMM=nginx

# Show logs with specific executable path
journalctl _EXE=/usr/sbin/nginx

# Show logs with specific command line
journalctl _CMDLINE="nginx -g daemon on;"
```

### Output Formatting and Processing

#### Different Output Formats
```bash
# Output in JSON format
journalctl -u nginx.service -o json

# Output in pretty JSON format
journalctl -u nginx.service -o json-pretty

# Output in JSON lines format (one JSON object per line)
journalctl -o json-lines

# Output in cat format (show only message field)
journalctl -o cat

# Output with full field values
journalctl -a

# Output with catalog entries
journalctl --catalog

# Export logs to file
journalctl -u nginx.service > nginx_logs.txt

# Export in JSON format
journalctl -u nginx.service -o json > nginx_logs.json
```

#### Log Processing with Pipes
```bash
# Count error messages
journalctl -p err | wc -l

# Extract only timestamps and messages
journalctl -o short-iso | awk '{print $1 " " $2 " " $NF}'

# Find top error-producing services
journalctl -p err | awk '/UNIT=/ {print $0}' | sort | uniq -c | sort -nr

# Monitor for specific patterns
journalctl -f | grep -i "error\|warning\|critical"

# Extract IP addresses from authentication logs
journalctl -t sshd | grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b'

# Create daily summary report
journalctl --since yesterday --until today | grep -E "(Starting|Started|Failed)" | sort
```

## Advanced Usage

### Boot History Analysis

#### Multiple Boot Logs
```bash
# List all available boots
journalctl --list-boots

# Show logs from previous boot
journalctl -b -1

# Show logs from boot number 2 (counting from 0)
journalctl -b 2

# Show logs from boot 2 days ago
journalctl -b -2

# Show logs with boot offset
journalctl -b +1  # Next boot (if available)

# Compare current vs previous boot
journalctl -b -1 -p err | head -20
```

### Journal Storage and Management

#### Journal File Information
```bash
# Show journal disk usage
journalctl --disk-usage

# Show journal file locations
journalctl --verify

# Show journal header information
journalctl --header

# Show runtime vs persistent journal info
ls -la /run/log/journal/
ls -la /var/log/journal/

# Check journal file integrity
journalctl --verify
```

#### Vacuum and Cleanup
```bash
# Remove old journal files to free up space
sudo journalctl --vacuum-size=100M

# Keep only last 2 days of logs
sudo journalctl --vacuum-time=2days

# Keep only 1GB of journal files
sudo journalctl --vacuum-size=1G

# Remove all journal files
sudo journalctl --vacuum-time=1s
```

### Real-time Monitoring and Alerts

#### Live Log Monitoring
```bash
# Monitor all system logs in real-time
journalctl -f

# Monitor specific service logs
journalctl -u nginx.service -f

# Monitor error messages only
journalctl -f -p err

# Monitor with specific output format
journalctl -f -o json-pretty

# Monitor multiple services
journalctl -f -u nginx.service -u mysql.service

# Monitor with color highlighting
journalctl -f --color=always | grep --color=always -E "ERROR|WARNING|CRITICAL"
```

#### Custom Log Watching Scripts
```bash
# Monitor for service failures
journalctl -f -p err -t systemd | while read line; do
    echo "ALERT: $line" | mail -s "System Error Alert" admin@example.com
done

# Watch for disk space issues
journalctl -f | grep --line-buffered -i "disk full\|no space left" | while read line; do
    notify-send "Disk Space Warning" "$line"
done

# Monitor authentication failures
journalctl -u sshd -f | grep --line-buffered "Failed password" | while read line; do
    echo "$(date): $line" >> /var/log/ssh_failures.log
done
```

## Integration and Automation

### Shell Scripts for Log Management

#### Automated Log Analysis Script
```bash
#!/bin/bash
# Daily log analysis and reporting

REPORT_DIR="/var/log/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORT_DIR/daily_report_$DATE.txt"

# Create report directory
mkdir -p "$REPORT_DIR"

# Generate daily report
{
    echo "Daily System Report - $DATE"
    echo "=============================="
    echo ""

    echo "Boot Summary:"
    echo "-------------"
    journalctl --since yesterday --until today | grep -E "(Starting|Started)" | wc -l
    echo "Services started today"

    echo ""
    echo "Error Summary:"
    echo "--------------"
    journalctl --since yesterday --until today -p err | wc -l
    echo "Error messages logged"

    echo ""
    echo "Service Failures:"
    echo "----------------"
    journalctl --since yesterday --until today | grep -i "failed" | head -10

    echo ""
    echo "Authentication Events:"
    echo "---------------------"
    journalctl -t sshd --since yesterday --until today | grep -E "(Accepted|Failed)" | wc -l
    echo "SSH login attempts"

    echo ""
    echo "Disk Usage:"
    echo "-----------"
    journalctl --disk-usage

} > "$REPORT_FILE"

# Email report if there are critical errors
if [ $(journalctl --since yesterday --until today -p crit | wc -l) -gt 0 ]; then
    mail -s "Critical System Errors Report - $DATE" admin@example.com < "$REPORT_FILE"
fi
```

#### Service Health Monitoring Script
```bash
#!/bin/bash
# Service health check using journalctl

SERVICES=("nginx" "mysql" "apache2" "php-fpm")
ERROR_COUNT=0

for service in "${SERVICES[@]}"; do
    # Check if service had errors in the last hour
    error_logs=$(journalctl -u "$service.service" --since "1 hour ago" -p err)

    if [ -n "$error_logs" ]; then
        echo "CRITICAL: $service service errors in the last hour:"
        echo "$error_logs"
        ERROR_COUNT=$((ERROR_COUNT + 1))
    fi

    # Check if service is currently running
    if ! systemctl is-active --quiet "$service.service"; then
        echo "CRITICAL: $service service is not running!"
        ERROR_COUNT=$((ERROR_COUNT + 1))
    fi
done

if [ $ERROR_COUNT -gt 0 ]; then
    echo "Total issues found: $ERROR_COUNT"
    exit 1
else
    echo "All services are healthy"
    exit 0
fi
```

### Configuration and Customization

#### Journal Configuration
```bash
# View current journal configuration
systemd-analyze cat-config systemd/journald.conf

# Edit journal configuration
sudo nano /etc/systemd/journald.conf

# Common configuration options:
# Storage=auto|volatile|persistent|none
# Compress=yes|no
# Seal=yes|no
# SplitMode=uid|login|none
# RateLimitIntervalSec=30s
# RateLimitBurst=10000

# Restart journal service after configuration changes
sudo systemctl restart systemd-journald
```

## Troubleshooting

### Common Issues

#### No Logs Available
```bash
# Check if journal service is running
systemctl status systemd-journald.service

# Check journal file permissions
ls -la /var/log/journal/

# Restart journal service
sudo systemctl restart systemd-journald

# Verify journal files
journalctl --verify

# Check disk space
df -h /var/log/
```

#### Large Journal Files
```bash
# Check journal size
journalctl --disk-usage

# Clean up old entries
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=500M

# Configure persistent storage limits
sudo nano /etc/systemd/journald.conf
# Add: SystemMaxUse=1G
```

#### Performance Issues
```bash
# Use specific filters to reduce output
journalctl -u specific.service

# Limit the number of entries shown
journalctl -n 1000

# Use specific time ranges
journalctl --since "1 hour ago"

# Disable catalog lookups for faster display
journalctl --no-catalog
```

## Related Commands

- [`systemctl`](/docs/commands/system-service/systemctl) - Control systemd services
- [`dmesg`](/docs/commands/user-management/dmesg) - Display kernel messages
- [`logger`](/docs/commands/user-management/logger) - Add messages to the system log
- [`logrotate`](/docs/commands/user-management/logrotate) - Rotate system logs
- [`systemd-analyze`](https://man7.org/linux/man-pages/man1/systemd-analyze.1.html) - Analyze system performance
- [`journalctl`](https://man7.org/linux/man-pages/man1/journalctl.1.html) - Official man page
- [`coredumpctl`](https://man7.org/linux/man-pages/man1/coredumpctl.1.html) - Retrieve core dumps

## Best Practices

1. **Use specific filters** to reduce output and improve performance
2. **Regular maintenance** with `--vacuum-*` options to manage disk usage
3. **Persistent storage** configuration for long-term log retention
4. **Real-time monitoring** with `-f` for critical services during troubleshooting
5. **Time-based filtering** for investigating specific incidents
6. **Priority filtering** to focus on critical messages
7. **Output formatting** based on your needs (human-readable vs machine-parseable)
8. **Journal verification** to ensure log integrity
9. **Proper permissions** when accessing user journals
10. **Backup important logs** before performing system maintenance

## Performance Tips

1. **Narrow your search** with specific `-u` unit filters rather than browsing all logs
2. **Use time limits** with `--since` and `--until` to limit search scope
3. **Avoid `-a` flag** unless you need full field values (it uses more memory)
4. **Use `--no-pager`** for scripts and automation
5. **Prefer JSON output** for machine processing: `-o json`
6. **Use `-b` for boot-specific logs** instead of filtering by time
7. **Enable persistent storage** for better performance on next boots
8. **Configure appropriate rate limits** to prevent journal flooding
9. **Use `--disk-usage`** regularly to monitor journal file sizes
10. **Consider log rotation** policies for long-running systems

The `journalctl` command is an essential tool for modern Linux system administration, providing comprehensive access to system logs with powerful filtering, formatting, and monitoring capabilities. Its integration with systemd makes it the primary tool for troubleshooting, auditing, and monitoring systemd-based Linux systems.