---
title: ftptop - FTP Server Process Monitor
sidebar_label: ftptop
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ftptop - FTP Server Process Monitor

The `ftptop` command is a real-time monitoring utility for FTP servers that displays active FTP sessions, their status, and resource usage in a format similar to the Unix `top` command. It provides system administrators with valuable insights into FTP server activity, including connected users, current transfers, bandwidth usage, and session durations. ftptop is particularly useful for monitoring busy FTP servers, identifying performance bottlenecks, and managing server resources effectively.

## Basic Syntax

```bash
ftptop [OPTIONS]
```

## Common Options

### Display Options
- `-d, --delay=SECONDS` - Set refresh delay in seconds (default: 5)
- `-b, --batch` - Run in batch mode (non-interactive)
- `-n, --iterations=COUNT` - Number of updates before exiting
- `-H, --no-header` - Don't display header information

### Filtering Options
- `-u, --user=USERNAME` - Show only sessions for specific user
- `-i, --ip=ADDRESS` - Show only sessions from specific IP address
- `-p, --port=PORT` - Monitor specific FTP port (default: 21)
- `-s, --sort=FIELD` - Sort by specific field (user, ip, time, size, rate)

### Output Format
- `-f, --format=TYPE` - Output format (default, csv, json)
- `-o, --output=FILE` - Save output to file
- `-q, --quiet` - Quiet mode (minimal output)
- `-v, --verbose` - Verbose output with detailed information

### Server Configuration
- `-c, --config=FILE` - Use specific configuration file
- `-P, --pidfile=FILE` - Use specific PID file location
- `-S, --socket=PATH` - Use specific socket file
- `-t, --timeout=SECONDS` - Connection timeout (default: 10)

## Usage Examples

### Basic Monitoring

#### Start Real-time Monitoring
```bash
# Start ftptop with default settings
ftptop

# Start with custom refresh interval
ftptop -d 3

# Run for specific number of updates
ftptop -n 20

# Batch mode for logging
ftptop -b -n 100
```

#### Monitor with Filtering
```bash
# Monitor specific user
ftptop -u ftpuser

# Monitor specific IP address
ftptop -i 192.168.1.100

# Monitor multiple conditions
ftptop -u admin -i 10.0.0.0/24

# Sort by transfer rate
ftptop -s rate
```

### Advanced Monitoring

#### Custom Display Settings
```bash
# No header for cleaner output
ftptop -H

# Verbose mode with detailed info
ftptop -v

# Quiet mode for scripts
ftptop -q

# Custom refresh and iterations
ftptop -d 2 -n 50
```

#### Output to Files
```bash
# Save output to file
ftptop -b -n 1000 -o /var/log/ftptop.log

# CSV format for analysis
ftptop -b -f csv -o ftp_activity.csv

# JSON format for web applications
ftptop -b -f json -o ftp_stats.json
```

## Practical Examples

### System Administration

#### FTP Server Health Monitoring
```bash
# Continuous monitoring
ftptop -d 1 -n 0

# Monitor with logging
ftptop -b -d 5 -n 288 -o /var/log/ftp_daily.log

# Alert on high usage
ftptop -b -n 12 | awk '$5 > 1000 {print "High bandwidth:", $0}'
```

#### User Activity Analysis
```bash
# Monitor specific user activity
ftptop -u anonymous -d 2

# Track bandwidth usage by user
ftptop -b -n 100 -s user | grep -E "^[a-zA-Z]"

# Monitor concurrent connections
ftptop -b -n 1000 | wc -l
```

#### Performance Analysis
```bash
# Sort by transfer rate to find heavy users
ftptop -s rate -d 3

# Monitor long-running sessions
ftptop -s time -d 5

# Track total bandwidth usage
ftptop -b -n 144 | awk '{sum += $5} END {print "Total MB:", sum/1024}'
```

### Network Management

#### Bandwidth Monitoring
```bash
# Real-time bandwidth monitoring
ftptop -d 1 -s rate

# Monitor high-bandwidth transfers
ftptop -b | awk '$5 > 500 {print "Alert:", $0}'

# Generate bandwidth reports
ftptop -b -n 720 -f csv > /reports/bandwidth_$(date +%Y%m%d).csv
```

#### Connection Analysis
```bash
# Monitor connections by source IP
ftptop -s ip -d 2

# Track connection durations
ftptop -s time -b -n 100

# Identify potential abuse
ftptop -b | awk '$4 > 50 {print "Long session:", $0}'
```

#### Server Load Management
```bash
# Monitor during peak hours
ftptop -d 2 -n 180 | grep -E "(10|11|1[4-9]):[0-5][0-9]"

# Check server response times
ftptop -v | grep "response"

# Monitor for connection limits
ftptop -b | awk '{sessions++} END {print "Total sessions:", sessions}'
```

### Security Monitoring

#### Suspicious Activity Detection
```bash
# Monitor for multiple connections from same IP
ftptop -b -n 100 | awk '{print $2}' | sort | uniq -c | sort -nr

# Track anonymous usage
ftptop -u anonymous -b -n 200

# Monitor for unusual transfer patterns
ftptop -b -n 500 | awk '$5 > 1000 || $6 > 1000'
```

#### Access Control Verification
```bash
# Verify user restrictions
ftptop -u restricted_user -d 1

# Monitor privileged accounts
ftptop -u admin -u root -b -n 100

# Check for unauthorized access
ftptop -b | grep -v -E "(admin|ftpuser|anonymous)"
```

## Advanced Usage

### Custom Filtering and Processing

#### Complex Filtering
```bash
# Monitor specific IP ranges
ftptop -b | awk '$2 ~ /^192\.168\./ {print}'

# Filter by file size transfers
ftptop -b | awk '$5 > 100 {print "Large transfer:", $0}'

# Monitor specific time periods
ftptop -b | grep -E "^[0-9:]*[2-3][0-9]:"
```

#### Data Analysis
```bash
# Generate usage statistics
ftptop -b -n 1000 | awk '{users[$1]++; size[$1] += $5} END {for(u in users) print u, users[u], size[u]/1024 " MB"}'

# Calculate average transfer rates
ftptop -b -n 100 | awk '{total += $5; count++} END {print "Average:", total/count " KB/s"}'

# Top users by bandwidth
ftptop -b -n 500 | awk '{bandwidth[$1] += $5} END {for(u in bandwidth) print bandwidth[u], u}' | sort -nr
```

### Integration with Other Tools

#### Log Analysis Integration
```bash
# Correlate with FTP logs
ftptop -b -n 100 > /tmp/ftptop.log
grep "$(date +%Y%m%d)" /var/log/vsftpd.log | tail -100

# Monitor with system load
top -b -n 1 && ftptop -b -n 1

# Combine with network monitoring
iftop -t -s 10 && ftptop -b -n 2
```

#### Alert Systems
```bash
# Email alert for high usage
ftptop -b -n 6 | awk '$5 > 1000 {print "High usage detected"}' | mail -s "FTP Alert" admin@example.com

# Log rotation alert
ftptop -b -n 10 | awk '$6 > 5000 {print "Large file transfer:", $0}' >> /var/log/ftp_alerts.log

# Real-time monitoring with alerts
watch -n 5 'ftptop -b -n 1 | awk "$5 > 1000 {system(\"echo \"Alert: \" $0 | wall)}"'
```

### Automation Scripts

#### Automated Monitoring Script
```bash
#!/bin/bash
# FTP Server Monitor Script

LOG_FILE="/var/log/ftp_monitor.log"
ALERT_THRESHOLD=1000  # MB
MAX_SESSIONS=50

while true; do
    # Get current session count
    SESSIONS=$(ftptop -b -n 1 | grep -c "ftp")

    # Get bandwidth usage
    BANDWIDTH=$(ftptop -b -n 1 | awk '{sum += $5} END {print sum}')

    # Log current status
    echo "$(date): Sessions: $SESSIONS, Bandwidth: ${BANDWIDTH}MB" >> $LOG_FILE

    # Check for alerts
    if [ $BANDWIDTH -gt $ALERT_THRESHOLD ]; then
        echo "$(date): High bandwidth usage: ${BANDWIDTH}MB" | mail -s "FTP Alert" admin@example.com
    fi

    if [ $SESSIONS -gt $MAX_SESSIONS ]; then
        echo "$(date): Too many sessions: $SESSIONS" | mail -s "FTP Session Alert" admin@example.com
    fi

    sleep 300  # Check every 5 minutes
done
```

#### Daily Report Generator
```bash
#!/bin/bash
# Generate Daily FTP Usage Report

DATE=$(date +%Y%m%d)
REPORT_FILE="/reports/ftp_report_$DATE.csv"

echo "Time,User,IP,Duration,Download,Upload,Rate" > $REPORT_FILE

# Collect data for 24 hours
for i in {1..288}; do  # 5-minute intervals for 24 hours
    ftptop -b -n 1 -f csv >> $REPORT_FILE
    sleep 300
done

# Generate summary
echo "Daily FTP Report for $DATE" > /reports/ftp_summary_$DATE.txt
echo "=============================" >> /reports/ftp_summary_$DATE.txt
echo "Total Sessions:" $(wc -l < $REPORT_FILE) >> /reports/ftp_summary_$DATE.txt
echo "Total Bandwidth:" $(awk -F, '{sum += $5 + $6} END {print sum/1024 " GB"}' $REPORT_FILE) >> /reports/ftp_summary_$DATE.txt
echo "Top Users:" $(awk -F, '{user[$2] += $5 + $6} END {for(u in user) print user[u]/1024, u}' $REPORT_FILE | sort -nr | head -5) >> /reports/ftp_summary_$DATE.txt
```

## Configuration and Customization

### Server Configuration

#### Custom ftptop Configuration
```bash
# Create custom configuration
cat > ~/.ftptop.conf << EOF
# ftptop Configuration File

# Display settings
delay=3
iterations=0
show_header=true
verbose=false

# Filtering
default_user=all
default_ip=all
sort_field=time

# Output
format=default
output_file=

# Server
ftp_port=21
timeout=10
config_file=/etc/vsftpd.conf
EOF

# Use custom configuration
ftptop -c ~/.ftptop.conf
```

#### Integration with FTP Servers
```bash
# vsftpd integration
ftptop -P /var/run/vsftpd.pid

# proftpd integration
ftptop -P /var/run/proftpd.pid

# Custom FTP server
ftptop -S /var/run/custom-ftp.sock
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Check FTP server status
systemctl status vsftpd

# Test connectivity
telnet localhost 21

# Check permissions
ls -la /var/run/vsftpd.pid

# Alternative PID file location
ftptop -P /var/run/vsftpd/vsftpd.pid
```

#### Display Issues
```bash
# If display is garbled, try batch mode
ftptop -b

# Check terminal capabilities
tput lines; tput cols

# Use smaller delay for slow systems
ftptop -d 10

# Clear screen before starting
clear && ftptop
```

#### Performance Issues
```bash
# Reduce update frequency
ftptop -d 10

# Limit number of updates
ftptop -n 50

# Use quiet mode
ftptop -q

# Monitor specific resources only
ftptop -s user
```

### Debug Mode

#### Verbose Diagnostics
```bash
# Verbose output for debugging
ftptop -v -d 1

# Check configuration
ftptop -c /etc/ftptop.conf -v

# Test connection
ftptop -t 30 -v

# Debug filtering
ftptop -u testuser -v
```

## Related Commands

- [`ftp`](/docs/commands/networking/ftp) - FTP client program
- [`ftpwho`](/docs/commands/networking/ftpwho) - Show current FTP sessions
- [`ftpcount`](/docs/commands/networking/ftpcount) - Count connected FTP users
- [`ftpshut`](/docs/commands/networking/ftpshut) - Shut down FTP server
- [`lftp`](/docs/commands/networking/lftp) - Sophisticated file transfer program
- [`ncftp`](/docs/commands/networking/ncftp) - NcFTP client
- [`vsftpd`](/docs/commands/system-services/vsftpd) - Very Secure FTP Daemon
- [`proftpd`](/docs/commands/system-services/proftpd) - Professional FTP daemon
- [`top`](/docs/commands/system-information/top) - Display Linux processes
- [`htop`](/docs/commands/system-information/htop) - Interactive process viewer
- [`iftop`](/docs/commands/networking/iftop) - Display bandwidth usage

## Best Practices

1. **Monitor Regularly**: Use consistent monitoring intervals to track trends
2. **Set Alerts**: Configure alerts for unusual activity or bandwidth usage
3. **Log Activities**: Keep historical logs for analysis and troubleshooting
4. **Use Filtering**: Focus on specific users or IPs when detailed analysis is needed
5. **Batch Mode**: Use batch mode for automated scripts and logging
6. **Resource Limits**: Monitor for sessions that consume excessive resources
7. **Security Monitoring**: Regularly check for unauthorized access or suspicious activity
8. **Performance Analysis**: Track server performance during different time periods
9. **Integration**: Combine with other monitoring tools for comprehensive oversight
10. **Documentation**: Maintain logs and reports for compliance and analysis

## Performance Tips

1. **Update Interval**: Adjust refresh rate based on server load (1-10 seconds)
2. **Batch Processing**: Use batch mode for long-term monitoring to reduce overhead
3. **Specific Filtering**: Monitor specific criteria to reduce processing load
4. **Output Format**: Choose appropriate output format (CSV/JSON) for efficient processing
5. **Limit Iterations**: Set specific iteration counts for automated monitoring
6. **Resource Awareness**: Monitor ftptop's own resource usage on busy servers
7. **Network Considerations**: Account for network latency when monitoring remote servers
8. **Concurrent Sessions**: Be aware of monitoring overhead with many concurrent FTP sessions
9. **Disk I/O**: Consider disk I/O impact when logging extensive monitoring data
10. **System Integration**: Coordinate monitoring with system-wide performance monitoring

The `ftptop` command is an essential tool for FTP server administration, providing real-time insights into server activity, user behavior, and resource utilization. Its comprehensive monitoring capabilities make it invaluable for maintaining optimal FTP server performance, security, and reliability in production environments.