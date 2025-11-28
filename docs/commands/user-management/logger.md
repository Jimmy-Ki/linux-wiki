---
title: logger - Add entries to system log
sidebar_label: logger
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# logger - Add entries to system log

The `logger` command is a versatile utility for adding entries to the system log (syslog). It provides a command-line interface to the syslog facility, allowing users, scripts, and applications to write messages to system logs with various priority levels, tags, and formatting options. Logger is essential for creating custom log entries, debugging shell scripts, monitoring system events, and maintaining audit trails. It integrates seamlessly with the standard syslog daemon (rsyslog, syslog-ng, or systemd-journald) and supports both local and remote logging.

## Basic Syntax

```bash
logger [OPTIONS] [MESSAGE]
```

## Common Priority Levels

### Standard Facilities
- `kern` - Kernel messages
- `user` - User-level messages (default)
- `mail` - Mail system
- `daemon` - System daemons
- `auth` - Security/authorization messages
- `syslog` - Internal syslog messages
- `lpr` - Line printer subsystem
- `news` - Network news subsystem

### Severity Levels
- `emerg` - Emergency (system is unusable)
- `alert` - Alert (action must be taken immediately)
- `crit` - Critical conditions
- `err` - Error conditions
- `warning` - Warning conditions
- `notice` - Normal but significant conditions
- `info` - Informational messages (default)
- `debug` - Debug-level messages

## Common Options

### Message Control
- `-i` - Log the process ID of the logger process
- `--id[=ID]` - Log the specified ID instead of PID
- `-f, --file FILE` - Log the contents of the specified file
- `-e, --empty` - Log an empty line
- `-s, --stderr` - Also output the message to standard error
- `-n, --server SERVER` - Write to specified remote syslog server
- `-P, --port PORT` - Use specified UDP port for remote logging
- `-u, --socket SOCKET` - Write to specified Unix domain socket

### Message Formatting
- `-t, --tag TAG` - Mark every line with the specified tag
- `-p, --priority PRIORITY` - Specify priority (facility.level)
- `--prio-prefix` - Look for a prefix on every line to set priority
- `--journald` - Use systemd journal

### Input Control
- `-u, --socket SOCKET` - Use Unix datagram socket instead of UDP
- `--rfc3164` - Use RFC 3164 syslog format (default)
- `--rfc5424` - Use RFC 5424 syslog format with structured data
- `--size LIMIT` - Maximum message size (default 1024)
- `--octet-count` - Use RFC 6587 octet counting framing

### Help and Version
- `-h, --help` - Display help information
- `-V, --version` - Show version information

## Usage Examples

### Basic Logging Operations

#### Simple Message Logging
```bash
# Log a simple informational message
logger "System maintenance started"

# Log a message with process ID
logger -i "Backup process completed"

# Log with custom tag
logger -t "BACKUP" "Daily backup finished successfully"

# Log to standard error as well
logger -s "Error: Unable to connect to database"
```

#### Priority-Based Logging
```bash
# Log error message with auth facility
logger -p auth.err "Authentication failed for user john"

# Log critical system message
logger -p daemon.crit "Disk space critically low"

# Log debug message
logger -p daemon.debug "Processing user request #12345"

# Log warning with mail facility
logger -p mail.warning "Mail queue exceeding threshold"

# Log emergency message
logger -p kern.emerg "Kernel panic detected"
```

#### Remote Logging
```bash
# Log to remote syslog server
logger -n logserver.example.com "Remote system event"

# Log to remote server with specific port
logger -n 192.168.1.100 -P 1514 "Security alert from workstation"

# Use TCP-like connection (reliable)
logger -n logserver.company.com --rfc5424 "Structured log data"

# Log to remote server with custom tag
logger -n central-log.company.com -t "WEB01" "Web server restart completed"
```

### File Input Operations

#### Logging File Contents
```bash
# Log entire file contents
logger -f /var/log/app.log

# Log file with custom tag
logger -t "AUDIT" -f security_report.txt

# Log specific log file with error priority
logger -p local0.err -f error_messages.txt

# Process and log file line by line
cat /var/log/messages | while read line; do
    logger -t "MSG_PROCESSOR" "$line"
done
```

#### Batch File Processing
```bash
# Log multiple files sequentially
for logfile in /var/log/*.log; do
    logger -t "LOG_ROTATE" -f "$logfile"
done

# Log configuration files for backup verification
logger -t "CONFIG_BACKUP" -f /etc/hosts
logger -t "CONFIG_BACKUP" -f /etc/fstab

# Monitor and log file changes
tail -f /var/log/app.log | logger -t "APP_MONITOR"
```

### Structured Logging

#### RFC 5424 Structured Data
```bash
# Log with structured data (RFC 5424)
logger --rfc5424 --prio-prefix "Application error" \
    "[exampleSDID@32473 iut=\"3\" eventSource=\"Application\" eventID=\"1011\"]"

# Complex structured logging
logger --rfc5424 \
    "[examplePriorityID@32473 class=\"high\" code=\"1234\"] System alert"

# Multiple structured data elements
logger --rfc5424 \
    "[sd1@32473 event=\"login\" user=\"john\"] [sd2@32473 ip=\"192.168.1.100\"] User activity"
```

#### Priority Prefix Logging
```bash
# Log with priority prefix on each line
echo "<13>This is an informational message" | logger --prio-prefix

# Multi-line message with different priorities
printf "<14>Warning message\n<3>Critical error\n" | logger --prio-prefix

# Process application logs with priority prefixes
cat app_output.log | logger --prio-prefix -t "APPLICATION"
```

## Practical Examples

### System Administration

#### System Monitoring
```bash
# Log system status
logger -t "SYSTEM_MONITOR" "$(date): System load: $(uptime | awk -F'load average:' '{ print $2 }')"

# Log disk usage
df -h | logger -t "DISK_MONITOR"

# Log memory usage
free -m | logger -t "MEMORY_MONITOR"

# Log running processes
ps aux | head -20 | logger -t "PROCESS_MONITOR"

# Log network connections
netstat -an | grep ESTABLISHED | wc -l | logger -t "NETWORK_MONITOR"
```

#### Security Auditing
```bash
# Log login attempts
logger -p auth.info -t "LOGIN_AUDIT" "User $(whoami) logged in from $(echo $SSH_CONNECTION | cut -d' ' -f1)"

# Log sudo usage
logger -p authpriv.info -t "SUDO_AUDIT" "$(whoami) executed: $SUDO_COMMAND"

# Log file system changes
logger -p authpriv.notice -t "FILE_AUDIT" "Modified /etc/passwd by $(whoami)"

# Log failed authentication
logger -p auth.err -t "AUTH_FAIL" "Failed login attempt for admin from $SSH_CLIENT"

# Log security alerts
logger -p auth.alert -t "SECURITY_ALERT" "Multiple failed login attempts detected"
```

#### Backup and Maintenance
```bash
# Backup start notification
logger -t "BACKUP" "Starting nightly backup of /home"

# Backup completion
logger -p user.notice -t "BACKUP" "Backup completed successfully: $(date)"

# Backup failure
logger -p user.err -t "BACKUP" "Backup failed: $ERROR_MESSAGE"

# Log backup statistics
tar -czf /backup/home_$(date +%Y%m%d).tar.gz /home 2>&1 | \
    logger -t "BACKUP_STATS"

# System maintenance window
logger -p system.notice -t "MAINTENANCE" "Scheduled maintenance window started"
```

### Application Development

#### Script Debugging
```bash
#!/bin/bash
# Debug logging function
debug_log() {
    logger -p daemon.debug -t "SCRIPT_DEBUG" "$1"
}

# Log script start
debug_log "Script started with PID: $$"

# Log variable values
debug_log "User directory: $HOME"
debug_log "Current path: $PWD"

# Log function calls
debug_log "Processing file: $1"
process_file "$1"
debug_log "File processing completed"

# Error logging
error_log() {
    logger -p daemon.err -t "SCRIPT_ERROR" "$1"
    echo "ERROR: $1" >&2
}
```

#### Application Logging
```bash
# Web application access logging
logger -p local0.info -t "WEBAPP" "GET /api/users processed in 0.05s"

# Database operation logging
logger -p local1.info -t "DATABASE" "Query executed: SELECT * FROM users WHERE id=123"

# Error handling
logger -p local2.err -t "WEBAPP" "Database connection failed: Connection timeout"

# Performance monitoring
start_time=$(date +%s%N)
# ... perform operation ...
end_time=$(date +%s%N)
duration=$((($end_time - $start_time) / 1000000))
logger -p local3.info -t "PERF" "Operation completed in ${duration}ms"
```

#### Service Integration
```bash
# Service startup
logger -p daemon.notice -t "MYSERVICE" "Service starting up on $(hostname)"

# Service status
logger -p daemon.info -t "MYSERVICE" "Service status: Running (PID: $$)"

# Service shutdown
logger -p daemon.notice -t "MYSERVICE" "Service shutting down gracefully"

# Health check
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    logger -p daemon.info -t "HEALTH_CHECK" "Service health check passed"
else
    logger -p daemon.warning -t "HEALTH_CHECK" "Service health check failed"
fi
```

### Log Analysis and Processing

#### Log Rotation and Archiving
```bash
# Log rotation notification
logger -t "LOG_ROTATE" "Rotating application logs"

# Archive old logs
find /var/log/app -name "*.log" -mtime +30 -exec logger -t "LOG_ARCHIVE" "Archiving: {}" \;

# Cleanup old logs
find /var/log/app -name "*.log.old" -mtime +90 -delete
logger -t "LOG_CLEANUP" "Cleaned up logs older than 90 days"

# Log statistics
log_count=$(find /var/log -name "*.log" | wc -l)
logger -t "LOG_STATS" "Currently monitoring $log_count log files"
```

#### Centralized Logging
```bash
# Send logs to centralized server
export LOG_SERVER="central-log.company.com"

# Function to log to central server
central_log() {
    local priority=$1
    local tag=$2
    local message=$3
    logger -n "$LOG_SERVER" -p "$priority" -t "$tag" "$message"
}

# Log system events centrally
central_log "user.notice" "SYSTEM_$(hostname)" "User login: $(whoami)"

# Log application events
central_log "local0.info" "WEBAPP" "Transaction completed: $TRANSACTION_ID"

# Log security events
central_log "auth.warning" "SECURITY" "Suspicious activity detected"
```

## Advanced Usage

### Log Filtering and Processing

#### Conditional Logging
```bash
# Log only errors
if [ $ERROR_CODE -ne 0 ]; then
    logger -p user.err -t "PROCESS" "Process failed with code: $ERROR_CODE"
fi

# Log based on log level
LOG_LEVEL=${LOG_LEVEL:-"info"}
case $LOG_LEVEL in
    "debug")
        logger -p daemon.debug -t "DEBUG" "Detailed debugging information"
        ;&
    "info")
        logger -p daemon.info -t "INFO" "General information"
        ;;
    "warning")
        logger -p daemon.warning -t "WARNING" "Warning condition"
        ;;
esac
```

#### Message Formatting and Templating
```bash
# Structured log messages
log_structured() {
    local level=$1
    local component=$2
    local message=$3
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local hostname=$(hostname)

    logger -p "user.$level" -t "$component" \
        "[$timestamp] [$hostname] $message"
}

# Template-based logging
log_template() {
    local template=$1
    shift
    printf "$template\n" "$@" | logger -t "TEMPLATE"
}

# JSON-like logging
log_json() {
    local event=$1
    local data=$2
    echo "{\"event\":\"$event\",\"data\":$data,\"timestamp\":\"$(date -Iseconds)\"}" | \
        logger -t "JSON_LOG"
}
```

### Performance Monitoring

#### Resource Usage Logging
```bash
# CPU usage monitoring
cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
logger -p daemon.info -t "CPU_MONITOR" "CPU usage: ${cpu_usage}%"

# Memory usage
mem_info=$(free | grep Mem | awk '{printf "Used: %sMB (%.1f%%), Free: %sMB", $3/1024, $3/$2*100, $4/1024}')
logger -p daemon.info -t "MEMORY_MONITOR" "Memory: $mem_info"

# Disk I/O
io_stats=$(iostat -x 1 2 | tail -n +4 | awk 'NR==1{next} {print "Device:", $1, "Util:", $NF"%"}')
logger -p daemon.info -t "IO_MONITOR" "Disk I/O: $io_stats"
```

#### Network Monitoring
```bash
# Network interface statistics
for interface in $(ls /sys/class/net/ | grep -v lo); do
    rx_bytes=$(cat /sys/class/net/$interface/statistics/rx_bytes)
    tx_bytes=$(cat /sys/class/net/$interface/statistics/tx_bytes)
    logger -p daemon.info -t "NET_MONITOR" \
        "$interface: RX=${rx_bytes} bytes, TX=${tx_bytes} bytes"
done

# Connection tracking
connections=$(netstat -an | grep ESTABLISHED | wc -l)
logger -p daemon.info -t "CONN_TRACK" "Active connections: $connections"

# DNS resolution monitoring
if nslookup google.com > /dev/null 2>&1; then
    logger -p daemon.info -t "DNS_MONITOR" "DNS resolution successful"
else
    logger -p daemon.warning -t "DNS_MONITOR" "DNS resolution failed"
fi
```

## Integration and Automation

### Shell Script Integration

#### Comprehensive Logging Library
```bash
#!/bin/bash
# Logging library for shell scripts

# Configuration
LOG_TAG=${LOG_TAG:-"SCRIPT"}
LOG_FACILITY=${LOG_FACILITY:-"user"}
LOG_SERVER=${LOG_SERVER:-""}
LOG_TO_STDERR=${LOG_TO_STDERR:-"false"}

# Logging functions
log_info() {
    local message="$1"
    logger -p "${LOG_FACILITY}.info" -t "$LOG_TAG" "$message"
    [[ "$LOG_TO_STDERR" == "true" ]] && echo "INFO: $message" >&2
}

log_warning() {
    local message="$1"
    logger -p "${LOG_FACILITY}.warning" -t "$LOG_TAG" "$message"
    [[ "$LOG_TO_STDERR" == "true" ]] && echo "WARNING: $message" >&2
}

log_error() {
    local message="$1"
    logger -p "${LOG_FACILITY}.err" -t "$LOG_TAG" "$message"
    [[ "$LOG_TO_STDERR" == "true" ]] && echo "ERROR: $message" >&2
}

log_debug() {
    local message="$1"
    logger -p "${LOG_FACILITY}.debug" -t "$LOG_TAG" "$message"
    [[ "$LOG_TO_STDERR" == "true" ]] && echo "DEBUG: $message" >&2
}

# Central logging
log_remote() {
    local priority="$1"
    local tag="$2"
    local message="$3"

    if [[ -n "$LOG_SERVER" ]]; then
        logger -n "$LOG_SERVER" -p "$priority" -t "$tag" "$message"
    else
        logger -p "$priority" -t "$tag" "$message"
    fi
}

# Usage example
main() {
    log_info "Script started"

    if [[ $# -eq 0 ]]; then
        log_error "No arguments provided"
        exit 1
    fi

    log_debug "Processing $# arguments"

    # Main logic here
    for arg in "$@"; do
        log_info "Processing: $arg"
    done

    log_info "Script completed successfully"
}

main "$@"
```

#### Cron Job Logging
```bash
#!/bin/bash
# Enhanced cron job with logging

CRON_JOB="backup_database"
LOG_TAG="CRON_$CRON_JOB"

# Start logging
logger -p cron.info -t "$LOG_TAG" "Starting scheduled job: $CRON_JOB"

# Set error handling
set -e
trap 'logger -p cron.err -t "$LOG_TAG" "Job failed at line $LINENO"' ERR

# Main job execution
logger -p cron.info -t "$LOG_TAG" "Connecting to database"
# ... database backup commands ...

logger -p cron.info -t "$LOG_TAG" "Backup completed successfully"

# Send completion notification
if command -v mail >/dev/null 2>&1; then
    echo "Backup completed at $(date)" | mail -s "Backup Complete" admin@example.com
fi

logger -p cron.info -t "$LOG_TAG" "Job completed"
```

### System Service Integration

#### Systemd Service Logging
```bash
#!/bin/bash
# Service that integrates with systemd journal

# Use systemd journal if available
if [[ -n "$SYSTEMD_EXEC_PID" ]]; then
    log_msg() {
        echo "$1" | systemd-cat -t "my-service" -p "info"
    }
    log_error() {
        echo "$1" | systemd-cat -t "my-service" -p "err"
    }
else
    # Fallback to traditional logger
    log_msg() {
        logger -t "my-service" -p user.info "$1"
    }
    log_error() {
        logger -t "my-service" -p user.err "$1"
    }
fi

# Service main loop
log_msg "Service starting up"

while true; do
    if process_data; then
        log_msg "Data processing completed successfully"
    else
        log_error "Data processing failed"
    fi
    sleep 60
done
```

## Troubleshooting

### Common Issues

#### Logging Not Working
```bash
# Check if syslog service is running
systemctl status rsyslog
# or
systemctl status syslog-ng

# Check logger configuration
logger --version

# Test basic logging
logger "Test message"

# Check if message appears in logs
tail -f /var/log/syslog
# or
journalctl -f
```

#### Remote Logging Issues
```bash
# Test network connectivity to remote server
nc -zv logserver.example.com 514

# Check firewall rules
iptables -L -n | grep 514

# Test remote logging explicitly
logger -n logserver.example.com -P 514 "Remote test message"

# Check remote server logs
ssh logserver.example.com "tail -f /var/log/remote"
```

#### Permission Issues
```bash
# Check syslog permissions
ls -la /dev/log
ls -la /var/log

# Test with different users
sudo -u nobody logger "Test as nobody"
sudo -u syslog logger "Test as syslog"

# Check group membership
groups $USER
```

### Debugging Logger

#### Verbose Logging
```bash
# Enable debug mode
strace -e write logger "Debug test"

# Monitor syslog daemon activity
tail -f /var/log/syslog | grep logger

# Check system log configuration
cat /etc/rsyslog.conf | grep -i user
cat /etc/rsyslog.d/*.conf
```

#### Message Format Issues
```bash
# Test message length limits
logger "$(python -c 'print("x" * 2000)')"

# Test special characters
logger "Test with special chars: @#$%^&*()"

# Test unicode characters
logger "Unicode test: café, naïve, 中文"

# Test newlines in messages
logger "Line 1\nLine 2\nLine 3"
```

## Related Commands

- [`syslog`](/docs/commands/user-management/syslog) - System logging daemon
- [`journalctl`](/docs/commands/user-management/journalctl) - Query systemd journal
- [`logrotate`](/docs/commands/user-management/logrotate) - Rotate log files
- [`tail`](/docs/commands/file-management/tail) - Display end of files
- [`dmesg`](/docs/commands/user-management/dmesg) - Print kernel messages
- [`systemctl`](/docs/commands/system-services/systemctl) - Control systemd system and service manager
- [`rsyslog`](/docs/commands/system-services/rsyslog) - Reliable system logging daemon

## Best Practices

1. **Use appropriate priority levels** - Choose the correct facility and severity for each message
2. **Use consistent tagging** - Maintain consistent tag names for related applications
3. **Include timestamps** - Add timestamps when logging time-sensitive events
4. **Log context information** - Include relevant context (user ID, process ID, hostname)
5. **Avoid sensitive data** - Never log passwords, tokens, or other confidential information
6. **Use structured logging** - Format logs consistently for easier parsing and analysis
7. **Monitor log levels** - Be mindful of log volume and adjust levels as needed
8. **Test remote logging** - Verify remote syslog connectivity before relying on it
9. **Handle errors gracefully** - Implement proper error handling for logging failures
10. **Document log format** - Maintain documentation of log formats for downstream consumers

## Performance Tips

1. **Batch log messages** when possible to reduce system overhead
2. **Use appropriate priorities** to avoid unnecessary log processing
3. **Consider message size** - Keep messages concise but informative
4. **Use local socket** (`-u`) for better performance on localhost
5. **Avoid excessive logging** in performance-critical code paths
6. **Consider asynchronous logging** for high-throughput applications
7. **Monitor log disk usage** to prevent disk space issues
8. **Use log rotation** to manage log file sizes effectively
9. **Configure appropriate buffer sizes** for high-volume logging
10. **Test logging performance** under load to identify bottlenecks

The `logger` command is a fundamental tool for system logging and monitoring, providing flexible and reliable message logging capabilities for system administrators, developers, and applications. Its integration with the standard syslog infrastructure makes it an essential component of any Linux system's observability and debugging toolkit.