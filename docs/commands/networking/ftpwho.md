---
title: ftpwho - Show current FTP users
sidebar_label: ftpwho
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ftpwho - Show current FTP users

The `ftpwho` command is a system administration tool that displays information about currently connected FTP users on a Linux system. It provides real-time monitoring of FTP sessions, showing user details, connection times, current activities, and transfer statistics. This command is particularly useful for system administrators managing FTP servers, allowing them to monitor active connections, identify potential security issues, and track resource usage. The tool is part of the `proftpd` FTP server suite and works with various FTP daemon implementations including `vsftpd`, `proftpd`, and `wu-ftpd`.

## Basic Syntax

```bash
ftpwho [OPTIONS] [FILE]
```

## Common Options

### Display Options
- `-v, --verbose` - Show verbose output with additional details
- `-V, --version` - Display version information and exit
- `-h, --help` - Show help message and exit
- `-s, --server` - Specify server type (proftpd, vsftpd, wuftpd)
- `-f, --file` - Read from specific log file instead of default

### Output Formatting
- `-c, --count` - Show only user count without details
- `-n, --numeric` - Show numeric IP addresses instead of hostnames
- `-a, --all` - Show all users including idle connections
- `-i, --idle` - Show only idle users

### Filtering Options
- `-u, --user USER` - Show information for specific user only
- `-H, --host HOST` - Show connections from specific host only
- `-t, --time SECONDS` - Show only connections active for more than specified time

## Usage Examples

### Basic FTP Monitoring

#### Show Current FTP Users
```bash
# Display all currently connected FTP users
ftpwho

# Basic output shows user count and summary
ftpwho -c

# Show verbose information
ftpwho -v
```

#### Display Detailed User Information
```bash
# Show detailed information about all users
ftpwho -v

# Show all users including idle ones
ftpwho -a

# Show only idle connections
ftpwho -i

# Display numeric IP addresses
ftpwho -n
```

### User and Host Filtering

#### Filter by Specific User
```bash
# Show information for specific user
ftpwho -u john

# Monitor specific user with verbose output
ftpwho -v -u admin

# Check if user is currently connected
ftpwho -u ftpuser
```

#### Filter by Host or IP
```bash
# Show connections from specific host
ftpwho -H 192.168.1.100

# Show connections from specific hostname
ftpwho -H client.example.com

# Monitor connections from specific network
ftpwho -n | grep "192.168.1"
```

### Time-based Filtering

#### Filter by Connection Duration
```bash
# Show connections active for more than 5 minutes
ftpwho -t 300

# Show long-running connections (more than 1 hour)
ftpwho -t 3600

# Monitor new connections (less than 1 minute)
ftpwho -t 60 -a
```

### Server-specific Operations

#### Different FTP Server Types
```bash
# Specify server type explicitly
ftpwho -s proftpd

# Monitor vsftpd server
ftpwho -s vsftpd

# Check wu-ftpd server
ftpwho -s wuftpd
```

#### Custom Log File Locations
```bash
# Read from custom log file
ftpwho -f /var/log/proftpd/xferlog

# Monitor from alternate location
ftpwho -f /custom/path/ftp.log

# Check multiple log files
ftpwho -f /var/log/proftpd/proftpd.log
```

## Practical Examples

### System Administration

#### Server Monitoring
```bash
# Quick check of FTP server status
ftpwho -c

# Comprehensive server monitoring
ftpwho -v -a -n

# Monitor server load from FTP connections
watch -n 5 'ftpwho -c && echo "---" && ftpwho | wc -l'

# Check for suspicious activity
ftpwho -n | grep -E "(unknown|suspicious|admin)"

# Generate daily usage report
ftpwho -v > /var/log/ftp_usage_$(date +%Y%m%d).log
```

#### Security Monitoring
```bash
# Check for concurrent connections from same IP
ftpwho -n | awk '{print $3}' | sort | uniq -c | sort -nr

# Monitor for unusual connection patterns
watch -n 10 'ftpwho -n | grep -v "127.0.0.1"'

# Track high-volume users
ftpwho -v | grep -E "(KB|MB|GB)" | sort -k4 -nr

# Alert on too many connections
if [ $(ftpwho -c) -gt 50 ]; then
    echo "High FTP usage detected: $(ftpwho -c) users"
fi
```

#### Resource Management
```bash
# Monitor active transfers
ftpwho -v | grep -i "transfer\|download\|upload"

# Check for stuck connections
ftpwho -a | grep -i "idle\|stuck"

# Identify long-running sessions
ftpwho -v | awk '$5 > 3600 {print $0}'

# Generate user activity summary
ftpwho -v | awk '{users[$1]++; time[$1]+=$5} END {for(u in users) print u, users[u], time[u]"s"}'
```

### Performance Analysis

#### Connection Analysis
```bash
# Peak usage monitoring
while true; do
    echo "$(date): $(ftpwho -c) users"
    sleep 300
done

# Analyze connection patterns
ftpwho -v > /tmp/ftp_snapshot_$(date +%H%M%S).txt

# Track busiest hours
for hour in {00..23}; do
    echo "Hour $hour:"
    # This would typically be run as a cron job
done

# Monitor geographic distribution (if hostnames available)
ftpwho | awk '{print $3}' | cut -d. -f3-4 | sort | uniq -c | sort -nr
```

### User Management

#### User Activity Tracking
```bash
# Track specific user activity
ftpwho -v -u username

# Monitor anonymous users
ftpwho -v | grep -i "anonymous\|ftp"

# Check user login patterns
ftpwho | awk '{print $1}' | sort | uniq -c | sort -nr

# Generate per-user statistics
for user in $(ftpwho | awk '{print $1}' | sort -u); do
    echo "User $user:"
    ftpwho -v -u "$user"
done
```

#### Bandwidth Monitoring
```bash
# Estimate current bandwidth usage
ftpwho -v | grep -E "(MB/s|KB/s)" | awk '{sum+=$4} END {print "Total:", sum, "KB/s"}'

# Track heavy users
ftpwho -v | awk '$4 > 1000 {print $1, $4, "KB/s"}' | sort -k2 -nr

# Monitor transfer volumes
ftpwho -v | grep -E "(MB|GB)" | awk '{user[$1]+=$4} END {for(u in user) print u, user[u]"MB"}'
```

## Advanced Usage

### Automation and Scripting

#### Monitoring Scripts
```bash
#!/bin/bash
# FTP Server Monitor Script

LOG_FILE="/var/log/ftp_monitor.log"
MAX_USERS=100
ALERT_EMAIL="admin@example.com"

# Check current user count
USER_COUNT=$(ftpwho -c)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Log current status
echo "$TIMESTAMP: $USER_COUNT users connected" >> $LOG_FILE

# Alert on high usage
if [ $USER_COUNT -gt $MAX_USERS ]; then
    echo "High FTP usage alert: $USER_COUNT users" | \
    mail -s "FTP Server Alert" $ALERT_EMAIL
fi

# Check for suspicious IPs
SUSPICIOUS=$(ftpwho -n | awk '{print $3}' | sort | uniq -c | awk '$1 > 10 {print $2}')
if [ ! -z "$SUSPICIOUS" ]; then
    echo "Suspicious IPs detected: $SUSPICIOUS" >> $LOG_FILE
fi
```

#### Usage Statistics Collection
```bash
#!/bin/bash
# Collect FTP usage statistics

STATS_DIR="/var/log/ftp_stats"
DATE=$(date +%Y%m%d)

# Create daily stats directory
mkdir -p $STATS_DIR/$DATE

# Collect hourly statistics
for hour in {00..23}; do
    TIMESTAMP=$(date +%H)
    ftpwho -v > $STATS_DIR/$DATE/ftp_${hour}00.log
    echo "$TIMESTAMP: $(ftpwho -c) users" >> $STATS_DIR/$DATE/user_count.log
done

# Generate daily summary
echo "Daily FTP Usage Summary for $DATE:" > $STATS_DIR/$DATE/summary.txt
echo "Peak users: $(sort -n $STATS_DIR/$DATE/user_count.log | tail -1)" >> $STATS_DIR/$DATE/summary.txt
echo "Average users: $(awk '{sum+=$4} END {print sum/NR}' $STATS_DIR/$DATE/user_count.log)" >> $STATS_DIR/$DATE/summary.txt
```

### Integration with Other Tools

#### Combine with System Monitoring
```bash
# Integrate with top for comprehensive monitoring
top -b -n 1 | head -10
echo "--- FTP Status ---"
ftpwho -c

# Combine with netstat for network analysis
netstat -an | grep :21
echo "--- FTP Users ---"
ftpwho -n

# Monitor system load with FTP usage
uptime
ftpwho -v
iostat -x 1 3
```

#### Log Analysis Integration
```bash
# Cross-reference with system logs
ftpwho -v
echo "--- Recent FTP Log Entries ---"
tail -20 /var/log/proftpd/proftpd.log

# Analyze failed login attempts with current users
grep "Failed login" /var/log/proftpd/proftpd.log | tail -10
echo "--- Current Users ---"
ftpwho -v

# Monitor bandwidth usage with system network stats
iftop -t -s 10
ftpwho -v
```

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# ftpwho might not be installed on all systems
# Install proftpd-utils for ftpwho
sudo apt-get install proftpd-utils    # Ubuntu/Debian
sudo yum install proftpd-utils        # CentOS/RHEL

# Alternative methods if ftpwho is not available
ps aux | grep ftpd
netstat -an | grep :21
systemctl status proftpd
```

#### Permission Denied
```bash
# ftpwho usually requires root privileges or specific group membership
sudo ftpwho

# Add user to appropriate group
sudo usermod -a -G adm $USER  # On some systems
sudo usermod -a -G proftpd $USER  # On others

# Check file permissions
ls -la /var/run/proftpd.scoreboard
ls -la /var/log/proftpd/
```

#### No Output or Inaccurate Information
```bash
# Check if FTP server is running
systemctl status proftpd
systemctl status vsftpd

# Verify scoreboard file location
find /var -name "*scoreboard*" -o -name "*proftpd*" 2>/dev/null

# Try specifying server type
ftpwho -s proftpd
ftpwho -s vsftpd

# Check log file permissions
sudo tail -f /var/log/proftpd/proftpd.log
```

### Performance Issues

#### Slow Response
```bash
# Use numeric IP addresses to avoid DNS resolution delays
ftpwho -n

# Filter output to reduce processing
ftpwho -c  # Just count users
ftpwho -u specific_user  # Specific user only

# Check system resources during command execution
time ftpwho -v
```

#### Large Number of Connections
```bash
# Filter by specific criteria to reduce output
ftpwho -t 3600  # Only long-running connections
ftpwho -H specific_ip  # Specific host only

# Use count-only mode for quick checks
ftpwho -c

# Process output in chunks
ftpwho -v | head -20
ftpwho -v | tail -20
```

## Related Commands

- [`ftptop`](/docs/commands/networking/ftptop) - Real-time FTP server process monitoring
- [`ftpcount`](/docs/commands/networking/ftpcount) - Count current FTP users
- [`ftpshut`](/docs/commands/networking/ftpshut) - Shut down FTP server
- [`ftp`](/docs/commands/networking/ftp) - File Transfer Protocol client
- [`netstat`](/docs/commands/system-information/netstat) - Network connections monitoring
- [`ss`](/docs/commands/system-information/ss) - Socket statistics
- [`lsof`](/docs/commands/system-information/lsof) - List open files
- [`ps`](/docs/commands/system-information/ps) - Process status
- [`who`](/docs/commands/system-information/who) - Show who is logged on
- [`last`](/docs/commands/system-information/last) - Show last logins

## Best Practices

1. **Regular Monitoring**: Use `ftpwho` frequently to monitor FTP server activity
2. **Security Awareness**: Watch for unusual connection patterns or multiple connections from same IP
3. **Resource Management**: Monitor user count and bandwidth usage to prevent server overload
4. **Logging**: Log FTP user activity for security audits and capacity planning
5. **Automation**: Create scripts for automated monitoring and alerting
6. **Access Control**: Implement proper user authentication and access restrictions
7. **Performance Optimization**: Use filters and numeric mode for faster responses on busy servers
8. **Documentation**: Maintain logs of FTP usage patterns for trend analysis

## Performance Tips

1. **Use `-n` flag** to avoid DNS lookup delays on busy servers
2. **Filter with `-u` or `-H`** for specific user or host monitoring
3. **Use `-c` for quick user count** checks when detailed information isn't needed
4. **Monitor regularly** to establish baseline usage patterns
5. **Set up alerts** for unusual activity or high user counts
6. **Use time-based filtering** to focus on long-running or new connections
7. **Combine with other monitoring tools** for comprehensive server oversight
8. **Implement automated scripts** for continuous monitoring and reporting

The `ftpwho` command is an essential tool for FTP server administration, providing real-time visibility into user connections and activities. Its filtering capabilities and integration with system monitoring make it invaluable for maintaining secure and efficient FTP services.