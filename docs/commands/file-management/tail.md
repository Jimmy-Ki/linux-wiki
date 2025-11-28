---
title: tail - Display Last Lines of a File
sidebar_label: tail
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tail - Display Last Lines of a File

The `tail` command displays the last part of files, typically the last 10 lines by default. It is one of the most essential tools for system administrators and developers, providing real-time monitoring capabilities for log files and efficient access to the end of large files. The command's versatility lies in its ability to follow file growth, handle multiple files simultaneously, and process files by lines or bytes, making it indispensable for log analysis, debugging, and system monitoring tasks.

## Basic Syntax

```bash
tail [OPTIONS] [FILE]...
```

## Common Options

### Line Count Options
- `-n NUM, --lines=NUM` - Display last NUM lines (default: 10)
- `-n +NUM, --lines=+NUM` - Start with NUMth line from the beginning
- `-c NUM, --bytes=NUM` - Display last NUM bytes
- `-c +NUM, --bytes=+NUM` - Start with NUMth byte from the beginning

### File Following Options
- `-f, --follow[={name|descriptor}]` - Follow file as it grows
- `-F` - Same as --follow=name --retry
- `--retry` - Keep trying to open file if it's inaccessible
- `--pid=PID` - With -f, terminate after process ID dies

### Display Options
- `-q, --quiet, --silent` - Never print headers for file names
- `-v, --verbose` - Always print headers for file names
- `--max-unchanged-stats=N` - With --follow=name, reopen file after N changes

### Sleep and Performance Options
- `-s NUM, --sleep-interval=NUM` - With -f, sleep for NUM seconds between iterations
- `--use-polling` - Use polling instead of inotify for file monitoring

## Usage Examples

### Basic Operations

#### Displaying File Content
```bash
# Display last 10 lines (default behavior)
tail file.txt

# Display specific number of lines
tail -n 20 file.txt
tail --lines=50 file.txt

# Display last 100 bytes
tail -c 100 file.txt
tail --bytes=1K file.txt

# Display multiple files
tail file1.txt file2.txt file3.txt

# Display with headers showing filenames
tail -v *.log

# Display without headers (quiet mode)
tail -q *.log
```

#### Line Position Control
```bash
# Show everything except first 100 lines
tail -n +101 file.txt

# Show from line 1000 to end
tail -n +1000 huge_file.txt

# Show last 500 bytes starting from byte 1000
tail -c +1000 -n 500 large_file.bin
```

### Real-time File Monitoring

#### Basic File Following
```bash
# Follow file growth (live monitoring)
tail -f logfile.txt

# Follow with retry (for log rotation)
tail -F logfile.txt

# Follow with custom sleep interval
tail -f -s 2 logfile.txt
tail -f --sleep-interval=5 logfile.txt

# Follow until process terminates
tail -f --pid=12345 application.log

# Follow and exit after first match
tail -f logfile.txt | grep -m 1 "PROCESSING COMPLETE"
```

#### Multiple File Monitoring
```bash
# Follow multiple files
tail -f /var/log/syslog /var/log/auth.log

# Follow all log files in directory
tail -f /var/log/*.log

# Follow with headers for multiple files
tail -f -v /var/log/syslog /var/log/auth.log

# Quiet mode for multiple file following
tail -f -q *.log

# Follow files with different refresh intervals
tail -f -s 1 fast_changing.log -s 10 slow_changing.log
```

## Advanced Usage

### Log Analysis and Filtering

#### Real-time Log Processing
```bash
# Monitor and filter specific patterns
tail -f logfile.txt | grep "ERROR"
tail -f access.log | grep "404\|500"

# Monitor with case-insensitive search
tail -f application.log | grep -i "error\|exception\|fatal"

# Monitor with context lines
tail -f syslog | grep -C 3 "kernel"

# Monitor with line numbers
tail -f -n 0 logfile.txt | nl

# Monitor with timestamps
tail -f logfile.txt | while read line; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line"
done

# Monitor and save to file
tail -f logfile.txt | tee -a saved_output.log

# Monitor and extract IP addresses
tail -f access.log | grep -oE '\b[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\b' | sort | uniq
```

#### Advanced Filtering Techniques
```bash
# Monitor multiple patterns with colors
tail -f logfile.txt | grep --color=always --line-buffered "ERROR\|WARNING\|INFO"

# Monitor and count occurrences
tail -f access.log | grep -c "200"
tail -f error.log | grep "ERROR" | wc -l

# Monitor and alert on critical events
tail -f security.log | grep --line-buffered "attack\|intrusion" | \
    while read line; do
        echo "ALERT: $line" | mail -s "Security Alert" admin@example.com
    done

# Monitor and extract HTTP status codes
tail -f nginx.log | awk '{print $9}' | sort | uniq -c | sort -nr

# Monitor and filter by time range
tail -f logfile.txt | awk '/2024-01-01 1[0-1]:/ {print}'
```

### File System Operations

#### Working with Large Files
```bash
# View last lines of huge files efficiently
tail -n 1000 huge_database_dump.sql

# Compare end of two files
tail -n 10 file1.txt > /tmp/end1.txt
tail -n 10 file2.txt > /tmp/end2.txt
diff /tmp/end1.txt /tmp/end2.txt

# Extract specific sections from large files
tail -n +1000 huge_file.txt | head -n 100

# Monitor file size changes
while true; do
    echo "File size: $(stat -c%s logfile.txt) bytes"
    tail -n 1 logfile.txt
    sleep 5
done
```

#### Binary File Operations
```bash
# Display last bytes of binary files
tail -c 256 executable.bin | hexdump -C

# Monitor binary log files
tail -f -c 0 binary_log.bin | xxd

# Check file signatures
tail -c 4 unknown_file.bin | od -tx1
```

## Practical Examples

### System Administration

#### System Log Monitoring
```bash
# Monitor system logs in real-time
tail -f /var/log/syslog
tail -f /var/log/auth.log

# Monitor kernel messages
tail -f /var/log/kern.log

# Monitor authentication attempts
tail -f /var/log/auth.log | grep "Failed\|Accepted"

# Monitor system messages with priority filtering
tail -f /var/log/syslog | grep -E "error|warning|critical"

# Monitor multiple system logs together
tail -f /var/log/syslog /var/log/auth.log /var/log/kern.log
```

#### Web Server Log Analysis
```bash
# Monitor Apache access logs
tail -f /var/log/apache2/access.log

# Monitor Nginx error logs
tail -f /var/log/nginx/error.log

# Extract real-time statistics
tail -f /var/log/apache2/access.log | \
    awk '{print $1}' | sort | uniq -c | sort -nr | head -10

# Monitor HTTP status codes
tail -f /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c

# Monitor response times
tail -f /var/log/apache2/access.log | awk '{print $NF}' | sort -n
```

#### Database Log Monitoring
```bash
# Monitor MySQL error log
tail -f /var/log/mysql/error.log

# Monitor MySQL slow query log
tail -f /var/log/mysql/mysql-slow.log

# Monitor PostgreSQL log
tail -f /var/log/postgresql/postgresql.log

# Monitor Redis log
tail -f /var/log/redis/redis-server.log
```

### Development Workflow

#### Application Development
```bash
# Monitor application logs during development
tail -f application.log

# Monitor build process output
make 2>&1 | tail -f

# Monitor test results in real-time
python -m pytest tests/ -v 2>&1 | tail -f

# Monitor Node.js application logs
tail -f npm-debug.log

# Monitor Spring Boot application
tail -f /var/log/spring-boot/application.log
```

#### Debugging and Troubleshooting
```bash
# Monitor debug logs
tail -f debug.log | grep -i "debug\|error"

# Monitor memory usage logs
tail -f memory_usage.log | awk '/Memory usage:/ {print $NF}'

# Monitor performance metrics
tail -f performance.log | grep "Response time" | awk '{print $3}'

# Monitor stack traces
tail -f application.log | grep -A 20 "Exception"
```

### Data Processing and Analysis

#### Real-time Data Processing
```bash
# Monitor CSV data and extract specific columns
tail -f data.csv | cut -d',' -f1,3

# Monitor JSON log entries
tail -f app.json.log | jq '.message, .timestamp'

# Process real-time sensor data
tail -f sensor_data.txt | awk '{sum+=$2; count++} END {print "Average:", sum/count}'

# Monitor and aggregate metrics
tail -f metrics.txt | awk '/requests_per_second/ {print $2}' | \
    awk '{sum+=$1; count++} END {print "Average RPS:", sum/count}'
```

#### Log Rotation Management
```bash
# Monitor with log rotation support
tail -F /var/log/application.log

# Manual log rotation handling
tail --pid=$(cat /var/run/syslogd.pid) -f /var/log/syslog

# Monitor rotated logs
tail -F /var/log/myapp.log.*

# Archive old log entries while monitoring
tail -n 1000 /var/log/app.log >> /var/log/app_archive.log && \
    tail -f /var/log/app.log
```

## Integration and Automation

### Shell Scripts and Automation

#### Log Monitoring Script
```bash
#!/bin/bash
# Advanced log monitoring with tail

LOG_FILE="/var/log/application.log"
PATTERNS=("ERROR" "FATAL" "CRITICAL")
EMAIL="admin@example.com"

# Monitor log for critical patterns
tail -f "$LOG_FILE" | while read line; do
    for pattern in "${PATTERNS[@]}"; do
        if echo "$line" | grep -q "$pattern"; then
            echo "[$(date)] $pattern detected: $line"
            echo "[$(date)] $pattern detected: $line" | \
                mail -s "Critical Log Alert" "$EMAIL"
        fi
    done
done
```

#### File Size Monitoring Script
```bash
#!/bin/bash
# Monitor file size and log growth

FILE="/var/log/large_file.log"
MAX_SIZE=$((1024 * 1024 * 100))  # 100MB

tail -f "$FILE" | while read line; do
    if [ -f "$FILE" ]; then
        SIZE=$(stat -c%s "$FILE")
        if [ "$SIZE" -gt "$MAX_SIZE" ]; then
            echo "WARNING: File size exceeded $(($MAX_SIZE / 1024 / 1024))MB: $SIZE bytes"
        fi
    fi
    echo "$line"
done
```

#### Multi-service Monitoring Script
```bash
#!/bin/bash
# Monitor multiple service logs

declare -A SERVICES=(
    ["web"]="/var/log/nginx/access.log"
    ["app"]="/var/log/application.log"
    ["db"]="/var/log/mysql/error.log"
)

for service in "${!SERVICES[@]}"; do
    {
        echo "=== Monitoring $service logs ==="
        tail -f "${SERVICES[$service]}" | \
            sed "s/^/[$service] /"
    } &
done

wait
```

### Process Integration

#### Background Monitoring
```bash
# Start monitoring in background
tail -f logfile.txt > /dev/null &
TAIL_PID=$!

# ... do other work ...

# Stop monitoring
kill $TAIL_PID

# Monitor multiple files in background
for log in *.log; do
    tail -f "$log" > "${log}.monitor" &
done
```

#### Pipeline Integration
```bash
# Monitor and process through pipeline
tail -f access.log | \
    awk '{print $1, $7, $9}' | \
    sort | uniq -c | \
    sort -nr | \
    head -20

# Monitor with real-time statistics
tail -f sensor_data.txt | \
    awk '{times[NR]=$1; values[NR]=$2}
         NR>1000 {shift times; shift values}
         END {for(i=1;i<=NR;i++) sum+=values[i];
               print "Average:", sum/NR}'

# Monitor with conditional processing
tail -f events.log | \
    while read line; do
        if echo "$line" | grep -q "HIGH_PRIORITY"; then
            echo "$line" | process_high_priority
        fi
    done
```

## Performance Optimization

### Resource Usage Considerations

#### Memory and CPU Optimization
```bash
# Use polling for high-frequency file changes (reduces CPU usage)
tail -f --use-polling high_frequency.log

# Increase sleep interval for less frequent monitoring
tail -f -s 10 low_priority.log

# Limit output for very active logs
tail -f -n 0 very_active.log | head -100

# Use byte-based following for binary logs
tail -f -c 0 binary_log.log
```

#### Disk I/O Optimization
```bash
# Monitor without buffering (line-buffered)
tail -f logfile.txt | grep --line-buffered "pattern"

# Reduce disk access with appropriate sleep intervals
tail -f -s 5 logfile.txt

# Use inotify alternative for network filesystems
tail -f --use-polling /mnt/network/logfile.txt
```

### High-Volume Log Handling

#### Efficient Log Processing
```bash
# Filter early to reduce processing load
tail -f large_access.log | grep "404" | wc -l

# Use specialized tools for very high volumes
# Consider: multitail, lnav, or logstash for production environments

# Process in chunks for huge files
tail -f huge_log.log | split -d -l 10000 - chunk_

# Parallel processing of multiple logs
parallel -j 4 tail -f ::: *.log | combine_output
```

## Troubleshooting

### Common Issues and Solutions

#### File Access Problems
```bash
# Handle permission denied errors
sudo tail -f /var/log/secure

# Deal with file rotation issues
tail -F /var/log/rotating.log  # Use -F instead of -f

# Handle temporarily inaccessible files
tail -f --retry temporary_file.log

# Check file existence before monitoring
[ -f "$LOG_FILE" ] && tail -f "$LOG_FILE" || echo "Log file not found"
```

#### Performance Issues
```bash
# Reduce CPU usage for active monitoring
tail -f -s 1 high_frequency_log

# Handle very large initial reads
tail -n 100 huge_file.log | tail -f

# Monitor specific sections only
tail -f -n 0 application.log | grep "IMPORTANT"
```

#### Terminal Issues
```bash
# Handle terminal buffer overflow
tail -f logfile.txt | less +F

# Clean display with clear command
clear && tail -f logfile.txt

# Use screen or tmux for persistent monitoring
screen -S logmonitor tail -f /var/log/syslog
```

## Related Commands

- [`head`](/docs/commands/file-management/head) - Display first lines of a file
- [`less`](/docs/commands/file-management/less) - View file page by page with advanced features
- [`cat`](/docs/commands/file-management/cat) - Display entire file contents
- [`grep`](/docs/commands/file-management/grep) - Pattern matching and text search
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text transformation
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`watch`](/docs/commands/system-info/watch) - Execute command periodically
- [`multitail`](/docs/commands/file-management/multitail) - Monitor multiple files with colors
- `lnav` - Log file navigator with advanced parsing capabilities
- `journalctl` - Systemd journal query and monitoring tool

## Best Practices

1. **Use `-F` instead of `-f`** when monitoring files that may be rotated
2. **Combine with grep** for real-time pattern matching and filtering
3. **Use appropriate sleep intervals** (-s) to balance responsiveness and resource usage
4. **Employ line buffering** (--line-buffered) when piping to other commands
5. **Monitor with context** (-C in grep) for better log analysis
6. **Use quiet mode** (-q) when monitoring multiple files to reduce noise
7. **Implement log rotation awareness** in production monitoring scripts
8. **Set process limits** when monitoring very high-volume logs
9. **Use background processes** with proper PID management for long-term monitoring
10. **Consider specialized tools** (multitail, lnav) for complex log analysis scenarios

## Performance Tips

1. **`tail -F`** is more reliable than `tail -f` for production environments with log rotation
2. **`--use-polling`** can be more efficient for network filesystems or high-frequency changes
3. **Combine with grep early** in pipelines to reduce data processing volume
4. **`-s` option** helps reduce CPU usage on systems with limited resources
5. **Byte-based monitoring** (-c) is more efficient for binary log files
6. **Line buffering** prevents data loss when piping through other commands
7. **Background monitoring** with proper signal handling ensures clean termination
8. **Memory-efficient monitoring** by avoiding unnecessary data storage in pipelines
9. **Parallel processing** of multiple logs can improve overall monitoring efficiency
10. **Resource-aware monitoring** by adjusting sleep intervals based on system load

The `tail` command is an indispensable tool for real-time file monitoring and log analysis. Its ability to follow file growth, combined with powerful filtering capabilities when used with other Unix tools, makes it essential for system administration, debugging, and application monitoring tasks. Mastering `tail` and its various options provides significant productivity improvements for anyone working with continuously growing log files or monitoring system activities.