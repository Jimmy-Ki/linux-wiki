---
title: crontab - Cron Table Scheduler
sidebar_label: crontab
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# crontab - Cron Table Scheduler

The `crontab` command is used to maintain crontab files for individual users. A crontab file contains instructions for the cron daemon, which executes scheduled commands at specified times and intervals. This powerful scheduling system allows users and administrators to automate repetitive tasks, perform system maintenance, run backups, and manage various time-based operations without manual intervention. The cron system is one of the most essential tools for Linux system administration and automation.

## Basic Syntax

```bash
crontab [OPTIONS] [FILE]
```

## Common Options

### File Management
- `-e` - Edit current user's crontab file
- `-l` - Display current user's crontab
- `-r` - Remove current user's crontab
- `-i` - Prompt before deleting (used with -r)
- `<file>` - Install crontab from specified file

### User Management
- `-u USER` - Specify username (requires root privileges)

### Information
- `-V` - Display version information
- `-h` - Display help message

## Crontab File Format

### Time Field Structure
```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12 OR JAN-DEC)
# │ │ │ │ ┌───────────── day of week (0 - 6 OR SUN-SAT)
# │ │ │ │ │
# │ │ │ │ │
# * * * * *  command to execute
```

### Time Field Values
- **minute**: 0-59
- **hour**: 0-23 (24-hour format)
- **day of month**: 1-31
- **month**: 1-12 or names (JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC)
- **day of week**: 0-7 (0 and 7 = Sunday) or names (SUN, MON, TUE, WED, THU, FRI, SAT)

### Special Characters
- `*` - Any value (wildcard)
- `,` - Value list separator (e.g., 1,3,5)
- `-` - Range of values (e.g., 1-5)
- `/` - Step values (e.g., */15 for every 15 minutes)

### Predefined Schedules
- `@reboot` - Run once at startup
- `@yearly` or `@annually` - Run once a year (0 0 1 1 *)
- `@monthly` - Run once a month (0 0 1 * *)
- `@weekly` - Run once a week (0 0 * * 0)
- `@daily` or `@midnight` - Run once a day (0 0 * * *)
- `@hourly` - Run once an hour (0 * * * *)

### Environment Variables
```bash
SHELL=/bin/bash                    # Default shell
PATH=/usr/local/bin:/usr/bin:/bin  # Command search path
MAILTO=user@example.com            # Email destination for output
HOME=/home/user                    # User's home directory
LOGNAME=username                   # User login name
```

## Usage Examples

### Basic Crontab Management

#### Viewing and Editing
```bash
# Edit current user's crontab
crontab -e

# Display current crontab
crontab -l

# Remove current crontab with confirmation
crontab -i -r

# View another user's crontab (requires root)
sudo crontab -u username -l

# Edit root's crontab
sudo crontab -u root -e
```

#### Installing from Files
```bash
# Create crontab from file
cat > mycron.txt << 'EOF'
# Daily backup at 2:30 AM
30 2 * * * /home/user/scripts/backup.sh

# Weekly system update on Sunday at 3 AM
0 3 * * 0 /usr/bin/apt update && /usr/bin/apt upgrade -y

# Clean temporary files daily at 4 AM
0 4 * * * find /tmp -type f -mtime +7 -delete
EOF

# Install crontab from file
crontab mycron.txt

# Backup current crontab
crontab -l > crontab_backup_$(date +%Y%m%d).txt
```

### Time-based Scheduling

#### Fixed Time Schedules
```bash
# Run at midnight every day
0 0 * * * /home/user/scripts/daily_task.sh

# Run at 2:30 PM every weekday
30 14 * * 1-5 /home/user/scripts/workday_report.sh

# Run at 6 AM on Monday, Wednesday, Friday
0 6 * * 1,3,5 /home/user/scripts/odd_day_maintenance.sh

# Run on the 1st and 15th of every month at 9 AM
0 9 1,15 * * /home/user/scripts/bi_monthly_check.sh

# Run every Tuesday and Thursday at 11 PM
0 23 * * 2,4 /home/user/scripts/evening_cleanup.sh
```

#### Interval Schedules
```bash
# Run every 5 minutes
*/5 * * * * /home/user/scripts/frequent_check.sh

# Run every 2 hours
0 */2 * * * /home/user/scripts/bi_hourly_update.sh

# Run every 30 minutes during business hours (9 AM - 5 PM)
*/30 9-17 * * 1-5 /home/user/scripts/business_hour_monitor.sh

# Run every 10 minutes on weekends
*/10 * * * 6,0 /home/user/scripts/weekend_task.sh

# Run every 15 minutes between 6 PM and midnight
*/15 18-23 * * * /home/user/scripts/evening_task.sh
```

### Complex Time Patterns

#### Advanced Scheduling
```bash
# Run at 9:15 AM and 3:45 PM on weekdays
15 9,45 15 * * 1-5 /home/user/scripts/important_task.sh

# Run on the last day of every month at 11:50 PM
50 23 28-31 * * [ "$(date -d tomorrow +\%d)" -eq "1" ] && /home/user/scripts/month_end_process.sh

# Run on business days, excluding holidays
0 8 * * 1-5 /home/user/scripts/check_holiday.sh || /home/user/scripts/daily_standup.sh

# Run every 5 minutes but not during maintenance window
*/5 * * * * /home/user/scripts/check_maintenance.sh && /home/user/scripts/regular_task.sh

# Run on the 2nd Tuesday of every month
0 10 * * 2 [ $(date +\%m) -ne $(date -d '7 days ago' +\%m) ] && /home/user/scripts/second_tuesday_task.sh
```

### Practical Examples

#### System Maintenance
```bash
# Daily system cleanup
0 3 * * * find /tmp -type f -atime +7 -delete
0 3 * * * find /var/tmp -type f -atime +7 -delete

# Weekly system updates (Debian/Ubuntu)
0 2 * * 0 apt update && apt upgrade -y

# Log rotation
0 1 * * * /usr/sbin/logrotate /etc/logrotate.conf

# Disk space monitoring
*/30 * * * * df -h | grep -E "9[0-9]%" | mail -s "Disk Space Warning" admin@example.com

# Security scan
0 4 * * * /usr/bin/clamscan -r /home --remove=yes --log=/var/log/clamscan.log

# System health check
*/15 * * * * /home/user/scripts/system_health_check.sh

# Database maintenance
0 5 * * * /usr/bin/mysqldump --all-databases | gzip > /backups/mysql/daily_$(date +\%Y\%m\%d).sql.gz

# Package cache cleanup
0 6 * * 0 apt-get clean
```

#### Backup Operations
```bash
# Daily incremental backup
0 1 * * * rsync -av --delete /home/ /backups/daily/home/

# Weekly full backup
0 2 * * 0 tar -czf /backups/weekly/full_$(date +\%Y\%m\%d).tar.gz /important/data/

# Database backup
0 3 * * * /usr/local/bin/backup_database.sh

# Configuration backup
0 4 * * * cp -r /etc/* /backups/config/$(date +\%Y\%m\%d)/

# Remote backup
0 5 * * * rsync -avz -e "ssh" /data/ user@backup-server:/backups/

# Application data backup
*/30 * * * * /usr/local/bin/backup_app_data.sh

# Backup verification
0 6 * * 1 find /backups -name "*.tar.gz" -mtime -7 -exec tar -tzf {} \; >/dev/null && echo "Backup OK" || echo "Backup Failed"
```

#### Web Services
```bash
# Restart web server daily (if needed)
0 6 * * * if ! curl -s http://localhost/health; then systemctl restart apache2; fi

# Clear web cache
0 2 * * * rm -rf /var/www/cache/*

# Generate web statistics
0 8 * * * /usr/local/bin/generate_web_stats.sh

# SSL certificate renewal check
0 9 * * 1 /usr/local/bin/check_ssl_certificates.sh

# Database optimization
0 3 * * * /usr/local/bin/optimize_database.sh

# Log analysis and reporting
0 7 * * * /usr/local/bin/analyze_web_logs.sh

# Cache warming
0 9 * * 1-5 /usr/local/bin/warm_cache.sh

# Performance monitoring
*/5 * * * * /usr/local/bin/monitor_performance.sh
```

#### Development Workflows
```bash
# Daily code backup
0 2 * * * rsync -av /home/user/projects/ /backups/code/

# Build and test overnight
0 1 * * * /home/user/scripts/build_and_test.sh

# Dependency updates
0 6 * * 0 /home/user/scripts/update_dependencies.sh

# Code quality checks
0 7 * * * /home/user/scripts/run_code_quality_checks.sh

# Documentation generation
0 8 * * 1 /home/user/scripts/generate_docs.sh

# Deployment to staging
0 10 * * 1-5 /home/user/scripts/deploy_staging.sh

# Cleanup old containers
0 4 * * * docker container prune -f

# Update package lists
0 6 * * * apt update
```

### Output and Error Handling

#### Log Management
```bash
# Redirect output to log file with timestamp
0 2 * * * /home/user/scripts/backup.sh >> /var/log/backup.log 2>&1

# Separate stdout and stderr logs
0 3 * * * /home/user/scripts/monitor.sh >> /var/log/monitor.log 2>> /var/log/monitor_errors.log

# Log with timestamp
*/5 * * * * echo "$(date): $(/home/user/scripts/check.sh)" >> /var/log/frequent_checks.log

# Rotate log files
0 0 * * * /usr/sbin/logrotate /etc/logrotate.conf

# Email errors only
0 4 * * * /home/user/scripts/important_task.sh 2>&1 | mail -s "Task Error" admin@example.com

# Conditional logging
0 5 * * * RESULT=$(/home/user/scripts/check.sh); [ $? -ne 0 ] && echo "$(date): $RESULT" >> /var/log/errors.log
```

#### Email Notifications
```bash
# Set email recipient
MAILTO=system@example.com

# Send task output via email
0 8 * * * /home/user/scripts/daily_report.sh

# Send summary emails
0 18 * * 1-5 /home/user/scripts/send_weekly_summary.sh

# Alert on critical errors
*/10 * * * * /home/user/scripts/critical_check.sh | mail -s "Critical Alert" admin@example.com

# Email backup success/failure
0 2 * * * /home/user/scripts/backup.sh && echo "Backup successful" | mail -s "Backup Success" admin@example.com || echo "Backup failed" | mail -s "Backup Failure" admin@example.com
```

## Advanced Usage

### Environment and Path Management

#### Setting Environment
```bash
# Complete environment setup
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
MAILTO=user@example.com
HOME=/home/user
LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8

# Custom environment variables
BACKUP_DIR=/backups
LOG_LEVEL=INFO
DB_HOST=localhost

# Use environment in commands
0 2 * * * /home/user/scripts/backup.sh -d $BACKUP_DIR -l $LOG_LEVEL
```

#### Path Management
```bash
# Specify full paths to avoid issues
0 3 * * * /usr/bin/find /tmp -type f -mtime +7 -delete
0 4 * * * /usr/local/bin/custom_script.sh

# Use wrapper scripts for complex environments
0 5 * * * /home/user/scripts/env_wrapper.sh /path/to/real/script.sh

# Export environment variables
0 6 * * * export PATH=$PATH:/usr/local/bin && /home/user/scripts/task.sh
```

### Security Considerations

#### Secure Cron Jobs
```bash
# Run with minimal privileges
0 2 * * * /usr/bin/nice -n 19 /home/user/scripts/low_priority_task.sh

# Use dedicated service account
0 3 * * * sudo -u serviceuser /opt/service/scripts/maintenance.sh

# Restrict file permissions
0 4 * * * find /tmp -type f -mtime +1 -delete

# Use encrypted configuration
0 5 * * * /home/user/scripts/decrypt_and_run.sh /home/user/configs/encrypted.cfg

# Validate inputs before execution
*/5 * * * * /home/user/scripts/validate_inputs.sh && /home/user/scripts/process_data.sh
```

#### Access Control
```bash
# Restrict cron access (as root)
echo "username" >> /etc/cron.allow
echo "restricteduser" >> /etc/cron.deny

# Set crontab permissions
chmod 600 /var/spool/cron/crontabs/username

# Use cron.d for system-wide jobs
echo "0 4 * * * root /usr/local/bin/system_maintenance.sh" > /etc/cron.d/maintenance
```

### Performance Optimization

#### Load Management
```bash
# Run during low load periods
0 2 * * * /home/user/scripts/heavy_task.sh

# Limit CPU usage
0 3 * * * /usr/bin/ionice -c2 -n7 /usr/bin/nice -n 19 /home/user/scripts/io_intensive_task.sh

# Stagger resource-intensive tasks
0 2 * * * /home/user/scripts/backup_part1.sh
30 2 * * * /home/user/scripts/backup_part2.sh
0 3 * * * /home/user/scripts/backup_part3.sh

# Use system load checks
*/5 * * * * [ $(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | cut -d. -f1) -lt 2 ] && /home/user/scripts/background_task.sh
```

#### Parallel Execution Control
```bash
# Prevent overlapping executions
0 2 * * * /usr/bin/flock -n /tmp/backup.lock /home/user/scripts/backup.sh

# Use lock files for coordination
*/10 * * * * /usr/bin/flock -n /tmp/task.lock /home/user/scripts/regular_task.sh

# Single instance control
0 * * * * /home/user/scripts/single_instance_check.sh && /home/user/scripts/main_task.sh
```

## Integration and Automation

### Shell Script Integration

#### Cron Wrapper Scripts
```bash
#!/bin/bash
# /home/user/scripts/cron_wrapper.sh
# Generic wrapper for cron jobs with logging and error handling

SCRIPT_NAME=$1
LOG_FILE="/var/log/cron/${SCRIPT_NAME}.log"
PID_FILE="/var/run/${SCRIPT_NAME}.pid"

# Create log directory
mkdir -p "$(dirname "$LOG_FILE")"

# Check if already running
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        echo "$(date): $SCRIPT_NAME is already running (PID: $PID)" >> "$LOG_FILE"
        exit 1
    else
        rm -f "$PID_FILE"
    fi
fi

# Write PID file
echo $$ > "$PID_FILE"

# Function to cleanup on exit
cleanup() {
    rm -f "$PID_FILE"
    exit $1
}

# Set trap for cleanup
trap cleanup EXIT INT TERM

# Log start
echo "$(date): Starting $SCRIPT_NAME" >> "$LOG_FILE"

# Execute the script
if [ -f "/home/user/scripts/${SCRIPT_NAME}.sh" ]; then
    /home/user/scripts/${SCRIPT_NAME}.sh >> "$LOG_FILE" 2>&1
    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]; then
        echo "$(date): $SCRIPT_NAME completed successfully" >> "$LOG_FILE"
    else
        echo "$(date): $SCRIPT_NAME failed with exit code $EXIT_CODE" >> "$LOG_FILE"
        # Send email notification on failure
        echo "$SCRIPT_NAME failed. Check $LOG_FILE for details." | mail -s "Cron Job Failure: $SCRIPT_NAME" admin@example.com
    fi
else
    echo "$(date): Script not found: /home/user/scripts/${SCRIPT_NAME}.sh" >> "$LOG_FILE"
    EXIT_CODE=1
fi

exit $EXIT_CODE
```

#### Usage Examples
```bash
# Using wrapper in crontab
0 2 * * * /home/user/scripts/cron_wrapper.sh backup
0 3 * * * /home/user/scripts/cron_wrapper.sh maintenance
*/15 * * * * /home/user/scripts/cron_wrapper.sh monitor
```

### System Administration Scripts

#### Automated System Management
```bash
#!/bin/bash
# /home/user/scripts/system_maintenance_suite.sh

MAINTENANCE_LOG="/var/log/system_maintenance.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

log_message() {
    echo "[$DATE] $1" >> "$MAINTENANCE_LOG"
}

# Clean temporary files
cleanup_temp() {
    log_message "Starting temporary file cleanup"
    find /tmp -type f -atime +7 -delete 2>/dev/null
    find /var/tmp -type f -atime +7 -delete 2>/dev/null
    log_message "Temporary file cleanup completed"
}

# Update package lists
update_packages() {
    log_message "Starting package update"
    apt-get update >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        log_message "Package update successful"
    else
        log_message "Package update failed"
    fi
}

# Check disk space
check_disk_space() {
    log_message "Checking disk space"
    df -h | grep -E "9[0-9]%" | while read line; do
        log_message "WARNING: High disk usage: $line"
    done
}

# Monitor system services
check_services() {
    log_message "Checking system services"
    services=("apache2" "mysql" "ssh" "cron")

    for service in "${services[@]}"; do
        if systemctl is-active --quiet "$service"; then
            log_message "Service $service is running"
        else
            log_message "ERROR: Service $service is not running"
        fi
    done
}

# Generate system report
generate_report() {
    log_message "Generating system report"
    {
        echo "=== System Report - $DATE ==="
        echo "Uptime: $(uptime)"
        echo "Memory Usage: $(free -h)"
        echo "Disk Usage: $(df -h)"
        echo "=== End Report ==="
        echo ""
    } >> "$MAINTENANCE_LOG"
}

# Execute all maintenance tasks
main() {
    log_message "Starting system maintenance suite"
    cleanup_temp
    check_disk_space
    check_services
    generate_report
    log_message "System maintenance suite completed"
}

main
```

#### Cron Entry for Management Suite
```bash
# System maintenance suite (daily at 2 AM)
0 2 * * * /home/user/scripts/system_maintenance_suite.sh

# Package updates (weekly on Sunday at 3 AM)
0 3 * * 0 apt-get update && apt-get upgrade -y

# Security scan (daily at 4 AM)
0 4 * * * /usr/bin/clamscan -r /home --quiet --log=/var/log/clamscan.log
```

## Troubleshooting

### Common Issues and Solutions

#### Path and Environment Problems
```bash
# Check cron environment
* * * * * env > /tmp/cron_env.log

# Test with absolute paths
* * * * * /usr/bin/whoami > /tmp/cron_test.log

# Debug path issues
* * * * * echo $PATH > /tmp/cron_path.log

# Fix by specifying full paths
0 2 * * * /usr/local/bin/my_script.sh
```

#### Permission Issues
```bash
# Check script permissions
ls -la /home/user/scripts/script.sh

# Fix permissions
chmod +x /home/user/scripts/script.sh

# Check file ownership
ls -la /home/user/scripts/

# Test user permissions
* * * * * whoami > /tmp/user_test.log
* * * * * id > /tmp/id_test.log
```

#### Cron Service Issues
```bash
# Check if cron service is running
systemctl status cron
service cron status

# Start cron service
sudo systemctl start cron
sudo service cron start

# Enable cron service at boot
sudo systemctl enable cron

# Check cron logs
tail -f /var/log/cron.log
tail -f /var/log/syslog | grep CRON
journalctl -u cron
```

#### Debugging Cron Jobs
```bash
# Create debug wrapper
#!/bin/bash
# /home/user/scripts/debug_cron.sh

exec 1>> /tmp/debug_cron.log 2>&1
echo "=== Cron Job Debug - $(date) ==="
echo "User: $(whoami)"
echo "Current directory: $(pwd)"
echo "Environment variables:"
env
echo "Command output:"
$@
echo "=== End Debug ==="

# Test with debug wrapper
*/5 * * * * /home/user/scripts/debug_cron.sh /path/to/problematic/script.sh
```

#### Time and Synchronization
```bash
# Check system time
date
timedatectl status

# Check timezone
timedatectl show --property=Timezone

# Sync time
sudo ntpdate -s time.nist.gov

# Set timezone
sudo timedatectl set-timezone America/New_York

# Check cron time logs
grep CRON /var/log/syslog | tail -10
```

## Best Practices

### Security and Safety
1. **Use absolute paths** for all commands and files
2. **Redirect output** to avoid unexpected emails
3. **Test scripts manually** before adding to crontab
4. **Use lock files** to prevent overlapping executions
5. **Set appropriate permissions** for cron scripts
6. **Avoid sensitive data** in crontab files
7. **Use environment variables** for configuration
8. **Regular backup** of crontab files
9. **Monitor cron logs** for errors
10. **Use service accounts** for system-level tasks

### Performance and Reliability
1. **Schedule heavy tasks** during low-usage periods
2. **Stagger resource-intensive jobs** to avoid overload
3. **Use nice/ionice** for resource control
4. **Implement error handling** and logging
5. **Set timeouts** for long-running tasks
6. **Monitor system load** before executing
7. **Use wrapper scripts** for complex operations
8. **Implement proper cleanup** on script exit
9. **Document cron jobs** with comments
10. **Regular review** and maintenance of cron entries

### Organization and Maintenance
1. **Group related tasks** with comments
2. **Use consistent naming** conventions
3. **Maintain backup copies** of crontabs
4. **Document job purposes** and dependencies
5. **Use version control** for cron scripts
6. **Implement monitoring** and alerting
7. **Regular cleanup** of old log files
8. **Test backup and restore** procedures
9. **Create standard templates** for common tasks
10. **Schedule regular reviews** of all cron jobs

## Related Commands

- [`at`](/docs/commands/system-service/at) - Schedule one-time job execution
- [`batch`](/docs/commands/system-service/batch) - Execute commands when system load permits
- [`anacron`](/docs/commands/system-service/anacron) - Run commands with frequency specified in days
- [`systemctl`](/docs/commands/system-service/systemctl) - Control systemd system and service manager
- [`service`](/docs/commands/system-service/service) - Run System V init scripts
- [`nohup`](/docs/commands/system-information/nohup) - Run command immune to hangups
- [`screen`](/docs/commands/process-management/screen) - Terminal multiplexer with persistent sessions
- [`tmux`](/docs/commands/process-management/tmux) - Terminal multiplexer

## Performance Tips

1. **Avoid overlapping executions** by using lock files or flock
2. **Schedule heavy tasks** during off-peak hours (usually 2-4 AM)
3. **Use nice/ionice** to control resource consumption
4. **Batch similar operations** to reduce system overhead
5. **Minimize email notifications** by redirecting output appropriately
6. **Use efficient commands** (prefer find over recursive ls, etc.)
7. **Implement proper error handling** to prevent hanging processes
8. **Monitor system resources** during cron execution
9. **Use appropriate intervals** - don't run tasks more frequently than needed
10. **Consider system load** before scheduling resource-intensive operations

The `crontab` command provides a powerful and flexible scheduling system for automating tasks in Linux environments. When properly configured and maintained, cron jobs can significantly reduce administrative overhead while ensuring consistent execution of maintenance, backup, and monitoring tasks. With careful planning, proper security practices, and effective troubleshooting techniques, cron becomes an indispensable tool for system administration and automation workflows.