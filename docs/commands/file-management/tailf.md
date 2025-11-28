---
title: tailf - Follow growth of log file
sidebar_label: tailf
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tailf - Follow growth of log file

The `tailf` command monitors the growth of log files and displays new data as it is appended to the file. It is similar to `tail -f` but more efficient for monitoring log files because it doesn't access the file when it is not growing. This makes tailf particularly useful for long-term monitoring of log files on systems with limited resources or for monitoring files that don't change frequently.

## Basic Syntax

```bash
tailf [OPTION] FILE
```

## Options

### Basic Options
- `-n, --lines=NUM` - Output the last NUM lines instead of starting from the beginning
- `-V, --version` - Display version information and exit
- `-h, --help` - Display help message and exit

## Usage Examples

### Basic File Monitoring

#### Simple Log Monitoring
```bash
# Monitor system log file
tailf /var/log/syslog

# Monitor application log
tailf /var/log/apache2/access.log

# Monitor error log
tailf /var/log/mysql/error.log
```

#### Custom Line Count
```bash
# Show last 100 lines then monitor
tailf -n 100 /var/log/messages

# Show last 50 lines then monitor
tailf -n 50 application.log
```

### System Administration

#### Real-time Log Analysis
```bash
# Monitor authentication attempts
tailf /var/log/auth.log | grep "Failed password"

# Monitor web server for errors
tailf /var/log/apache2/error.log | grep "ERROR"

# Monitor system messages
tailf /var/log/kern.log | grep -i "error\|warning"
```

#### Service and Application Monitoring
```bash
# Monitor Nginx access logs
tailf /var/log/nginx/access.log

# Monitor database query log
tailf /var/log/postgresql/postgresql.log

# Monitor mail server logs
tailf /var/log/mail.log
```

### Development and Debugging

#### Application Development
```bash
# Monitor application debug output
tailf /tmp/debug.log

# Monitor custom application logs
tailf /var/log/myapp/application.log

# Watch for specific patterns
tailf app.log | grep "Exception\|Error"
```

#### Real-time Error Tracking
```bash
# Monitor for segmentation faults
tailf /var/log/syslog | grep "segfault"

# Monitor for network issues
tailf /var/log/messages | grep -i "network\|connection"

# Track performance issues
tailf /var/log/performance.log | grep "slow"
```

## Practical Examples

### Log File Management

#### Multiple Log Monitoring
```bash
# Monitor multiple logs in different terminals
# Terminal 1
tailf /var/log/apache2/access.log

# Terminal 2
tailf /var/log/apache2/error.log

# Terminal 3
tailf /var/log/mysql/slow.log
```

#### Log Filtering and Analysis
```bash
# Monitor for specific IP addresses
tailf /var/log/nginx/access.log | grep "192.168.1.100"

# Monitor HTTP status codes
tailf /var/log/apache2/access.log | grep " 404\| 500"

# Monitor user activities
tailf /var/log/auth.log | grep "user.*login"
```

#### Timestamp and Date Filtering
```bash
# Monitor current day's logs
tailf /var/log/syslog | grep "$(date +'%b %d')"

# Monitor logs with specific time format
tailf app.log | grep "$(date +'%Y-%m-%d')"
```

### System Monitoring

#### Security Monitoring
```bash
# Monitor failed login attempts
tailf /var/log/auth.log | grep "Failed password"

# Monitor sudo usage
tailf /var/log/auth.log | grep "sudo"

# Monitor root access
tailf /var/log/auth.log | grep "root.*LOGIN"
```

#### Performance Monitoring
```bash
# Monitor system resource usage logs
tailf /var/log/syslog | grep -i "cpu\|memory"

# Monitor disk space alerts
tailf /var/log/syslog | grep "disk.*full"

# Monitor process crashes
tailf /var/log/syslog | grep "killed process"
```

### Application Debugging

#### Real-time Debug Output
```bash
# Monitor Python application logs
tailf /var/log/python/app.log | python -m json.tool

# Monitor Java application logs
tailf /var/log/tomcat/catalina.out

# Monitor Node.js application logs
tailf /var/log/nodejs/app.log
```

#### Error Pattern Detection
```bash
# Monitor for stack traces
tailf app.log | grep -A 10 "Exception\|Error"

# Monitor for database connection issues
tailf app.log | grep -i "database\|connection.*failed"

# Monitor for timeout errors
tailf app.log | grep -i "timeout"
```

## Advanced Usage

### Log Rotation Handling

#### Monitoring with Log Rotation
```bash
# Monitor log files that rotate (using tail -f alternative)
tail -f /var/log/application.log

# Or use tailf before rotation starts
tailf /var/log/application.log
```

#### Multiple File Versions
```bash
# Monitor current log and archived logs
tailf /var/log/app.log &
tail -f /var/log/app.log.1
```

### Output Processing

#### Real-time Log Processing
```bash
# Count occurrences in real-time
tailf access.log | awk '{print $1}' | sort | uniq -c

# Extract and process JSON logs
tailf app.log | jq '.message'

# Convert timestamps
tailf app.log | sed 's/\[.*\]/$(date)/'
```

#### Conditional Monitoring
```bash
# Monitor only when errors occur
tailf app.log | grep --line-buffered "ERROR" | while read line; do
    echo "Error detected: $line"
    # Send notification
done
```

### Integration with Other Commands

#### Pipeline Integration
```bash
# Monitor and filter with awk
tailf /var/log/access.log | awk '$9 >= 400 {print}'

# Monitor and extract with sed
tailf /var/log/syslog | sed 's/.*\([0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}\).*/\1/'

# Monitor and count with wc
tailf /var/log/access.log | wc -l
```

#### Real-time Alerts
```bash
# Send email on critical errors
tailf app.log | grep -m 1 "CRITICAL" | mail -s "Critical Error" admin@example.com

# Play sound on specific events
tailf /var/log/auth.log | grep "Failed password" | while read line; do
    paplay /usr/share/sounds/alsa/Front_Left.wav
done
```

## Shell Scripting Integration

### Automated Monitoring Scripts

#### Basic Monitoring Script
```bash
#!/bin/bash
# Simple log monitoring script

LOG_FILE="/var/log/application.log"
ALERT_EMAIL="admin@example.com"

echo "Monitoring $LOG_FILE..."
tailf "$LOG_FILE" | while read line; do
    if echo "$line" | grep -q "ERROR\|CRITICAL"; then
        echo "Alert: $line" | mail -s "Application Error" "$ALERT_EMAIL"
    fi
done
```

#### Multi-log Monitor
```bash
#!/bin/bash
# Monitor multiple log files

LOGS=(
    "/var/log/apache2/access.log"
    "/var/log/apache2/error.log"
    "/var/log/mysql/error.log"
)

for log in "${LOGS[@]}"; do
    echo "Monitoring $log..."
    tailf "$log" &
done

wait
```

#### Conditional Monitoring
```bash
#!/bin/bash
# Monitor with conditions

LOG_FILE="/var/log/syslog"
PATTERN="segmentation fault"

tailf "$LOG_FILE" | grep --line-buffered "$PATTERN" | while read line; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$TIMESTAMP] Segfault detected: $line" >> /var/log/crash_alerts.log

    # Optional: send notification
    echo "Segfault detected in system" | wall
done
```

## Best Practices

### Performance Optimization

1. **Use tailf for infrequently changing files** - More efficient than tail -f for files that don't change often
2. **Avoid complex regex in real-time** - Simple patterns work better for live monitoring
3. **Monitor specific log levels** - Filter for ERROR/WARNING levels instead of everything
4. **Use appropriate buffering** - `--line-buffered` option for real-time processing

### Security Considerations

1. **Monitor authentication logs** - Regularly check `/var/log/auth.log` for suspicious activities
2. **Protect sensitive log data** - Use appropriate permissions on log files
3. **Monitor system integrity** - Watch for unauthorized access attempts
4. **Set up log retention policies** - Don't let log files grow indefinitely

### Log Management

1. **Implement log rotation** - Prevent log files from consuming disk space
2. **Use centralized logging** - Consider syslog or ELK stack for better log management
3. **Monitor disk space** - Watch for logs filling up partitions
4. **Document log locations** - Maintain a list of important log file locations

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# Check file permissions
ls -la /var/log/syslog

# Use sudo if necessary
sudo tailf /var/log/auth.log

# Add user to appropriate group
sudo usermod -aG adm $USER
```

#### File Not Found
```bash
# Check if file exists
ls -la /var/log/application.log

# Find actual log location
find /var/log -name "*application*" -type f

# Check service status
systemctl status apache2
```

#### Performance Issues
```bash
# Monitor system resources
top
htop

# Check disk space
df -h

# Use less intensive monitoring
tailf -n 10 /var/log/large-file.log
```

### Debugging Monitoring

#### Verify Log Activity
```bash
# Check if file is being written to
lsof /var/log/application.log

# Monitor file size changes
watch ls -lh /var/log/application.log

# Test with manual log entry
echo "Test entry $(date)" >> /var/log/test.log
tailf /var/log/test.log
```

## Related Commands

- [`tail`](/docs/commands/file-management/tail) - Display the last part of files
- [`less`](/docs/commands/file-management/less) - View file content with pagination
- [`more`](/docs/commands/file-management/more) - View file content page by page
- [`cat`](/docs/commands/file-management/cat) - Concatenate and display files
- [`grep`](/docs/commands/text-processing/grep) - Search patterns in files
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for filtering and transforming text
- [`watch`](/docs/commands/system/watch) - Execute programs periodically

## Performance Tips

1. **tailf vs tail -f** - Use tailf for files that don't change frequently
2. **Minimal filtering** - Apply filters early in the pipeline to reduce processing
3. **Buffer management** - Use line buffering for real-time output processing
4. **Resource monitoring** - Watch CPU and memory usage during long-term monitoring
5. **Log rotation awareness** - Understand how log rotation affects monitoring
6. **Output redirection** - Save important monitoring sessions to files for later analysis

The `tailf` command is an essential tool for system administrators and developers who need to monitor log files in real-time. Its efficient design makes it particularly suitable for long-term monitoring scenarios where resource conservation is important. By combining tailf with other Unix tools, you can create powerful monitoring and alerting systems for your applications and infrastructure.