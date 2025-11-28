---
title: logsave - Save output of a command to a log file
sidebar_label: logsave
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# logsave - Save output of a command to a log file

The `logsave` command is a utility that saves the output of a command to a log file while simultaneously displaying it on the terminal. It's particularly useful for system administration tasks, debugging, and creating audit trails of command executions. The command captures both standard output and standard error, providing a complete record of command execution including timestamps and proper formatting for log analysis.

## Basic Syntax

```bash
logsave [OPTIONS] LOGFILE COMMAND [ARGUMENTS...]
```

## Common Options

### Output Control
- `-a` - Append to the log file instead of overwriting it
- `-s` - Skip writing to the log file if the command fails (non-zero exit status)
- `-v` - Verbose mode, show additional information about the logging process

### Log File Handling
- LOGFILE - Path to the log file where output will be saved
- COMMAND - The command to execute and log
- ARGUMENTS - Optional arguments to pass to the command

## Usage Examples

### Basic Command Logging

#### Simple Command Logging
```bash
# Save output of a command to a log file
logsave /var/log/system_update.log "apt update && apt upgrade -y"

# Save directory listing to log
logsave /tmp/directory_listing.log ls -la /home/user

# Save disk usage information
logsave /tmp/disk_usage.log df -h

# Save process information
logsave /tmp/process_info.log ps aux
```

#### Logging with Timestamp Context
```bash
# Create timestamped log entries
logsave /var/log/backup.log "echo 'Backup started at $(date)' && tar czf backup.tar.gz /home/documents"

# Log system information with timestamp
logsave /var/log/system_check.log "echo 'System check: $(date)' && free -m && uptime"
```

### Advanced Logging Scenarios

#### Append to Existing Logs
```bash
# Append to an existing log file
logsave -a /var/log/daily_tasks.log "echo 'Daily task completed: $(date)'"

# Multiple commands appending to same log
logsave -a /var/log/maintenance.log "systemctl status nginx"
logsave -a /var/log/maintenance.log "systemctl status mysql"
```

#### Conditional Logging
```bash
# Only log if command succeeds
logsave -s /var/log/backup_success.log "rsync -av /source/ /destination/"

# Skip logging on failure for non-critical tasks
logsave -s /tmp/test.log "ping -c 4 google.com"
```

#### Verbose Logging
```bash
# Show detailed logging information
logsave -v /var/log/detailed.log "make && make install"

# Debug mode with verbose output
logsave -v /tmp/debug.log "./configure && make"
```

## Practical Examples

### System Administration

#### System Maintenance Logging
```bash
# Complete system update with logging
logsave /var/log/system_update_$(date +%Y%m%d).log "apt update && apt full-upgrade -y && apt autoremove -y"

# Service management with logging
logsave /var/log/service_restart.log "systemctl restart apache2 && systemctl status apache2"

# Log rotation and cleanup
logsave /var/log/cleanup.log "find /var/log -name '*.log.*' -mtime +30 -delete && echo 'Log cleanup completed'"

# Security audit logging
logsave /var/log/security_audit.log "auditctl -l && ausearch -k recent_accesses"
```

#### Backup and Recovery Operations
```bash
# Database backup with logging
logsave /var/log/db_backup.log "mysqldump -u root -p database_name > backup_$(date +%Y%m%d).sql"

# File system backup logging
logsave /var/log/filesystem_backup.log "rsync -av --delete /source/ /backup/destination/"

# Incremental backup logging
logsave /var/log/incremental_backup.log "rsync -av --link-dest=/backup/yesterday/ /source/ /backup/today/"
```

#### Performance Monitoring
```bash
# System performance logging
logsave /var/log/performance_$(date +%H%M).log "top -b -n 1 && iostat -x 1 3"

# Memory usage monitoring
logsave /var/log/memory_usage.log "free -h && cat /proc/meminfo | grep -E 'MemTotal|MemFree|MemAvailable'"

# Network statistics logging
logsave /var/log/network_stats.log "netstat -i && ss -s"
```

### Development Workflow

#### Build Process Logging
```bash
# Software compilation with detailed logging
logsave /var/log/build_$(date +%Y%m%d).log "./configure && make && make install"

# Continuous integration logging
logsave /var/log/ci_build.log "npm install && npm test && npm run build"

# Package building logging
logsave /var/log/package_build.log "dpkg-buildpackage -us -uc"
```

#### Debugging and Troubleshooting
```bash
# Application startup debugging
logsave /var/log/app_debug.log "java -jar application.jar --debug"

# Network connectivity troubleshooting
logsave /var/log/network_debug.log "traceroute 8.8.8.8 && nslookup google.com"

# Service dependency analysis
logsave /var/log/dependency_check.log "ldd /usr/bin/application && lsof -p $(pidof application)"
```

#### Code Quality and Analysis
```bash
# Code analysis logging
logsave /var/log/code_analysis.log "cppcheck --enable=all src/ && find . -name '*.py' -exec pyflakes {} \;"

# Test execution logging
logsave /var/log/test_results.log "python -m pytest tests/ -v --cov"

# Documentation generation logging
logsave /var/log/docs_generation.log "make docs && sphinx-build -b html docs/ html/"
```

### Script Automation

#### Scheduled Task Logging
```bash
# Daily system health check
logsave /var/log/health_check.log "df -h && free -m && uptime && systemctl --failed"

# Weekly security scan
logsave /var/log/security_scan.log "clamscan -r /home && rkhunter --check --skip-keypress"

# Log file analysis
logsave /var/log/log_analysis.log "grep -i error /var/log/syslog | tail -20"
```

#### Automation Script Integration
```bash
# Backup script with comprehensive logging
#!/bin/bash
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/backup_${BACKUP_DATE}.log"

logsave "$LOG_FILE" "echo 'Starting backup at $(date)'"
logsave -a "$LOG_FILE" "tar czf /backup/full_${BACKUP_DATE}.tar.gz /important/data/"
logsave -a "$LOG_FILE" "echo 'Backup completed at $(date)'"
logsave -a "$LOG_FILE" "ls -lh /backup/full_${BACKUP_DATE}.tar.gz"
```

## Advanced Usage

### Log Management

#### Log File Organization
```bash
# Create dated log directories
mkdir -p /var/log/commands/$(date +%Y/%m/%d)
logsave /var/log/commands/$(date +%Y/%m/%d)/operations.log "systemctl status重要服务"

# Rotate logs based on size
LOG_SIZE=$(stat -c%s /var/log/command.log)
if [ $LOG_SIZE -gt 10485760 ]; then  # 10MB
    mv /var/log/command.log /var/log/command_$(date +%Y%m%d_%H%M%S).log
fi
logsave /var/log/command.log "your command here"
```

#### Log Filtering and Analysis
```bash
# Create filtered logs
logsave /tmp/full_output.log "your_command_here"
grep -i "error\|warning" /tmp/full_output.log > /tmp/errors_only.log

# Extract specific information
logsave /tmp/system_info.log "dmidecode && lscpu && free -h"
grep -E "Processor|Memory|Size" /tmp/system_info.log > /tmp/hardware_summary.log
```

### Error Handling and Recovery

#### Robust Error Logging
```bash
# Command with error handling
logsave /var/log/operation.log "command_that_might_fail 2>&1" || {
    logsave -a /var/log/operation.log "echo 'Command failed at $(date)'"
    exit 1
}

# Retry mechanism with logging
for i in {1..3}; do
    if logsave -s /var/log/retry.log "unreliable_command"; then
        logsave -a /var/log/retry.log "echo 'Command succeeded on attempt $i'"
        break
    else
        logsave -a /var/log/retry.log "echo 'Command failed on attempt $i'"
        sleep 5
    fi
done
```

#### Recovery Operations Logging
```bash
# System recovery with logging
logsave /var/log/recovery.log "echo 'Starting recovery process' && fsck -y /dev/sda1"

# Data recovery logging
logsave /var/log/data_recovery.log "testdisk /dev/sdb && photorec /dev/sdb"
```

## Integration and Automation

### Shell Script Integration

#### Comprehensive Logging Function
```bash
#!/bin/bash
# Advanced logging function

log_command() {
    local log_file="$1"
    local command="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "=== $timestamp ===" >> "$log_file"
    logsave -a "$log_file" "$command"
    echo "" >> "$log_file"
}

# Usage examples
log_command "/var/log/maintenance.log" "apt update"
log_command "/var/log/maintenance.log" "systemctl restart nginx"
```

#### Centralized Logging System
```bash
#!/bin/bash
# Centralized logging wrapper

CENTRAL_LOG="/var/log/central_$(date +%Y%m%d).log"

log_with_context() {
    local context="$1"
    local command="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    {
        echo "[$timestamp] Context: $context"
        echo "[$timestamp] Command: $command"
        echo "[$timestamp] Output:"
    } >> "$CENTRAL_LOG"

    logsave -a "$CENTRAL_LOG" "$command"
    echo "----------------------------------------" >> "$CENTRAL_LOG"
}

# Example usage
log_with_context "System Update" "apt list --upgradable"
log_with_context "Service Check" "systemctl status apache2"
```

### Monitoring and Alerting

#### Log-based Monitoring
```bash
# Monitor critical system operations
logsave /var/log/critical_operations.log "critical_system_command"

# Check log for errors and alert
if logsave /tmp/operation.log "your_command" && grep -q "error\|failed" /tmp/operation.log; then
    echo "Alert: Command completed with errors" | mail -s "Operation Alert" admin@example.com
fi
```

#### Real-time Log Analysis
```bash
# Create log and analyze immediately
logsave /tmp/current_operation.log "your_command"
ERROR_COUNT=$(grep -ci "error\|warning\|failed" /tmp/current_operation.log)

if [ $ERROR_COUNT -gt 0 ]; then
    echo "Found $ERROR_COUNT potential issues in operation log"
    # Send notification or take corrective action
fi
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check if log directory is writable
test -w /var/log || echo "Cannot write to /var/log directory"

# Use user-accessible log location
logsave ~/logs/command.log "your_command"

# Create log directory with proper permissions
mkdir -p /var/log/custom_logs
chmod 755 /var/log/custom_logs
logsave /var/log/custom_logs/operation.log "your_command"
```

#### Disk Space Issues
```bash
# Check available disk space before logging
AVAILABLE_SPACE=$(df /var/log | awk 'NR==2 {print $4}')
if [ $AVAILABLE_SPACE -lt 102400 ]; then  # Less than 100MB
    echo "Warning: Low disk space in /var/log"
    # Clean old logs or use different location
fi

# Use temporary directory for large logs
logsave /tmp/large_operation.log "command_with_lots_of_output"
```

#### Command Not Found
```bash
# Check if logsave is installed
which logsave || echo "logsave not found, install util-linux package"

# Alternative approaches if logsave is unavailable
# Using script command
script -q /tmp/output.log your_command

# Using tee with timestamp
your_command 2>&1 | tee -a >(while read line; do echo "$(date): $line"; done > /tmp/timestamped.log)
```

### Performance Considerations

#### Large Output Handling
```bash
# For commands with very large output
logsave /tmp/large_output.log large_command 2>&1 | head -100  # Show first 100 lines

# Compress old logs automatically
find /var/log -name "*.log" -mtime +7 -exec gzip {} \;

# Use logrotate for log management
# /etc/logrotate.d/custom_commands:
# /var/log/command_*.log {
#     daily
#     rotate 7
#     compress
#     delaycompress
#     missingok
#     notifempty
# }
```

## Related Commands

- [`script`](/docs/commands/other-tools/script) - Record terminal sessions
- [`tee`](/docs/commands/other-tools/tee) - Redirect output to multiple files
- [`logger`](/docs/commands/user-management/logger) - Send messages to system log
- [`journalctl`](/docs/commands/user-management/journalctl) - Query systemd journal
- [`nohup`](/docs/commands/system-information/nohup) - Run commands immune to hangups
- [`screen`](/docs/commands/process-management/screen) - Terminal multiplexer
- [`tmux`](/docs/commands/process-management/tmux) - Terminal multiplexer
- [`cron`](/docs/commands/system-services/crontab) - Schedule periodic tasks

## Best Practices

1. **Use descriptive log file names** with dates and context
2. **Check disk space** before logging large amounts of data
3. **Use append mode (-a)** for continuous logging to the same file
4. **Implement log rotation** to prevent log files from growing too large
5. **Use conditional logging (-s)** for non-critical operations
6. **Monitor log files regularly** for important events and errors
7. **Secure sensitive log files** with appropriate permissions
8. **Create backup strategies** for important log data
9. **Use centralized logging** for system-wide monitoring
10. **Document logging policies** and retention schedules

## Performance Tips

1. **Avoid logging in tight loops** as it can significantly impact performance
2. **Use compressed log files** for long-term storage
3. **Consider log levels** for different types of information
4. **Implement log sampling** for high-frequency events
5. **Use separate log files** for different subsystems or applications
6. **Monitor I/O impact** of intensive logging operations
7. **Use memory-based logging** (/dev/shm) for temporary high-speed logging
8. **Implement buffering** for applications that generate many small log entries
9. **Consider async logging** for performance-critical applications
10. **Use log analysis tools** for efficient processing of large log files

The `logsave` command is an essential tool for system administrators and developers who need to maintain comprehensive records of command executions. Its ability to simultaneously display and save output makes it invaluable for debugging, auditing, and maintaining system operation histories. By following best practices for log management, users can create effective logging strategies that enhance system monitoring and troubleshooting capabilities.