---
title: logrotate - Rotate, compress, and mail system logs
sidebar_label: logrotate
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# logrotate - Rotate, compress, and mail system logs

The `logrotate` command is a system administration utility designed to manage the automatic rotation, compression, removal, and mailing of log files. It helps prevent log files from growing indefinitely and consuming excessive disk space. Logrotate is typically run as a daily cron job and reads configuration files that specify how log files should be handled. It supports flexible rotation schedules, compression methods, retention policies, and can execute scripts before and after rotation operations. This tool is essential for maintaining system health, managing storage resources, and ensuring logs remain organized and accessible.

## Basic Syntax

```bash
logrotate [OPTIONS] <config_file>
```

## Common Options

### Command Line Options
- `-d, --debug` - Debug mode: don't rotate anything, but show what would be done
- `-f, --force` - Force rotation even if it doesn't meet criteria
- `-m, --mail <command>` - Command to send mail (default is `/usr/bin/mail -s`)
- `-s, --state <statefile>` - Path to state file (default is `/var/lib/logrotate/status`)
- `-v, --verbose` - Display verbose messages during rotation
- `-l, --log <logfile>` - Log file to write messages to

### Configuration Testing
- `--debug` - Same as `-d`, show actions without executing
- `--force` - Same as `-f`, force rotation
- `--usage` - Display brief usage message

## Configuration Directives

### Rotation Schedule
- `daily` - Rotate logs daily
- `weekly` - Rotate logs weekly (default: Sunday)
- `monthly` - Rotate logs monthly
- `yearly` - Rotate logs yearly
- `size <size>` - Rotate when log exceeds specified size (e.g., `100M`, `1G`)
- `rotate <count>` - Keep specified number of rotated logs

### File Rotation
- `missingok` - Don't error if log file is missing
- `notifempty` - Don't rotate if log is empty
- `delaycompress` - Compress rotated logs on next rotation
- `compress` - Compress rotated logs with gzip
- `nocompress` - Don't compress rotated logs
- `compresscmd <command>` - Command to use for compression
- `uncompresscmd <command>` - Command to use for uncompression
- `compressext <extension>` - Extension for compressed files
- `compressoptions <options>` - Options for compression command

### File Handling
- `create <mode> <owner> <group>` - Create new log file after rotation
- `createolddir <mode> <owner> <group>` - Create directory for old logs
- `olddir <directory>` - Move rotated logs to specified directory
- `extension <ext>` - Remove extension before adding rotation suffix
- `start <count>` - Start numbering from specified number

### Mail and Notification
- `mail <address>` - Mail rotated logs to specified address
- `nomail` - Don't mail logs
- `mailfirst` - Mail the first (oldest) rotated log
- `maillast` - Mail the last (newest) rotated log

### Scripts and Hooks
- `firstaction <script>` - Run script before all log rotations
- `lastaction <script>` - Run script after all log rotations
- `prerotate <script>` - Run script before rotating specific logs
- `postrotate <script>` - Run script after rotating specific logs
- `sharedscripts` - Run scripts once for all logs in section

### Advanced Options
- `maxage <days>` - Remove logs older than specified days
- `minsize <size>` - Don't rotate if log is smaller than specified size
- `maxsize <size>` - Don't rotate if log exceeds specified size
- `dateext` - Use date extension instead of numbers
- `dateyesterday` - Use yesterday's date for dateext
- `dateformat <format>` - Format for date extensions

## Usage Examples

### Basic Log Rotation

#### Simple Configuration
```bash
# Basic logrotate configuration file
# /etc/logrotate.d/myapp

/var/log/myapp.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 644 root root
}
```

#### Testing Configuration
```bash
# Test configuration without making changes
logrotate -d /etc/logrotate.conf

# Test specific configuration file
logrotate -d /etc/logrotate.d/nginx

# Force rotation with verbose output
logrotate -vf /etc/logrotate.d/myapp
```

### Rotation Scheduling

#### Daily Rotation
```bash
# Rotate logs daily, keep 7 days
/var/log/app/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 www-data www-data
}
```

#### Weekly Rotation
```bash
# Rotate logs weekly, keep 4 weeks
/var/log/system/*.log {
    weekly
    rotate 4
    compress
    missingok
    notifempty
    create 644 root root
}
```

#### Size-Based Rotation
```bash
# Rotate when log reaches 100MB
/var/log/bigapp.log {
    size 100M
    rotate 5
    compress
    delaycompress
    missingok
    notifempty
    create 644 appuser appuser
}
```

#### Combined Criteria
```bash
# Rotate daily or when size exceeds 50MB
/var/log/database.log {
    daily
    size 50M
    rotate 30
    compress
    missingok
    notifempty
    create 644 dbuser dbuser
}
```

### Advanced Rotation Patterns

#### Date-Based Extensions
```bash
# Use date extensions instead of numbers
/var/log/access.log {
    daily
    rotate 30
    dateext
    dateformat -%Y-%m-%d
    compress
    missingok
    notifempty
    create 644 www-data www-data
}
```

#### Hourly Rotation
```bash
# Hourly rotation for high-volume logs
/var/log/highfreq.log {
    hourly
    rotate 24
    compress
    delaycompress
    missingok
    notifempty
    create 644 appuser appuser
    postrotate
        /usr/bin/systemctl reload highfreq.service
    endscript
}
```

#### Custom Compression
```bash
# Use bzip2 instead of gzip for better compression
/var/log/archive.log {
    weekly
    rotate 52
    compresscmd /bin/bzip2
    uncompresscmd /bin/bunzip2
    compressext .bz2
    compressoptions -9
    missingok
    notifempty
    create 644 root root
}
```

### File Organization

#### Move to Archive Directory
```bash
# Move old logs to archive directory
/var/log/production/*.log {
    daily
    rotate 90
    compress
    missingok
    notifempty
    olddir /var/log/archive/
    create 644 produser produser
}
```

#### Separate Rotation Settings
```bash
# Different settings for different log types
/var/log/app/error.log {
    daily
    rotate 14
    compress
    create 644 appuser appuser
}

/var/log/app/access.log {
    hourly
    rotate 48
    compress
    create 644 appuser appuser
}

/var/log/app/debug.log {
    size 10M
    rotate 5
    compress
    create 644 appuser appuser
}
```

## Practical Examples

### System Administration

#### Web Server Logs
```bash
# Apache/Nginx log rotation
/var/log/nginx/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    sharedscripts
    postrotate
        /usr/sbin/nginx -s reload > /dev/null 2>&1 || true
    endscript
}

# Apache logs with custom naming
/var/log/apache2/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root adm
    sharedscripts
    postrotate
        /usr/sbin/apache2ctl graceful > /dev/null 2>&1 || true
    endscript
}
```

#### System Logs
```bash
# System log rotation
/var/log/syslog {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 syslog adm
    sharedscripts
    postrotate
        /usr/bin/systemctl reload rsyslog > /dev/null 2>&1 || true
    endscript
}

# Auth logs
/var/log/auth.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 644 root adm
}
```

#### Application Logs
```bash
# Multi-application log management
/var/log/apps/*.log {
    daily
    size 50M
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 appuser appgroup
    sharedscripts
    postrotate
        find /var/log/apps/ -name "*.log.*" -mtime +90 -delete
    endscript
}
```

### Database Log Management

#### MySQL Logs
```bash
# MySQL error log rotation
/var/log/mysql/error.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 mysql mysql
    postrotate
        # Test if MySQL is running before attempting reload
        if [ -x /usr/bin/mysqladmin ]; then
            /usr/bin/mysqladmin ping > /dev/null 2>&1 && \
            /usr/bin/mysqladmin flush-logs > /dev/null 2>&1
        fi
    endscript
}

# MySQL slow query log
/var/log/mysql/slow.log {
    weekly
    rotate 4
    compress
    delaycompress
    missingok
    notifempty
    create 644 mysql mysql
    size 1G
}
```

#### PostgreSQL Logs
```bash
# PostgreSQL log rotation
/var/log/postgresql/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 644 postgres postgres
    sharedscripts
    postrotate
        /usr/bin/pg_ctl reload -D /var/lib/postgresql/data > /dev/null 2>&1
    endscript
}
```

### Development Workflow

#### Application Development Logs
```bash
# Development environment logs
/home/user/project/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 $USER $USER
    size 100M
    maxage 30
}

# Debug logs with different retention
/home/user/project/logs/debug/*.log {
    daily
    rotate 3
    compress
    missingok
    notifempty
    create 644 $USER $USER
    maxage 7
}
```

#### Build and CI/CD Logs
```bash
# CI/CD pipeline logs
/var/log/ci/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 jenkins jenkins
    sharedscripts
    postrotate
        # Archive old build artifacts
        find /var/lib/jenkins/jobs -name "*.log" -mtime +60 -delete
    endscript
}
```

### Backup and Archiving

#### Log Archive Strategy
```bash
# Production log archiving
/var/log/production/*.log {
    daily
    rotate 365
    compress
    delaycompress
    missingok
    notifempty
    dateext
    dateformat -%Y-%m-%d
    create 644 produser prodgroup
    olddir /archive/production/logs/
}

# Critical logs with longer retention
/var/log/production/critical/*.log {
    daily
    rotate 1095  # 3 years
    compress
    delaycompress
    missingok
    notifempty
    dateext
    dateformat -%Y-%m-%d
    create 644 produser prodgroup
    olddir /archive/production/critical/
}
```

#### Remote Log Management
```bash
# Centralized log server rotation
/var/log/central/hosts/*/*.log {
    daily
    rotate 90
    compress
    delaycompress
    missingok
    notifempty
    create 644 syslog syslog
    sharedscripts
    postrotate
        # Sync to backup server
        rsync -a --delete /var/log/central/ backup-server:/logs/central/
    endscript
}
```

## Advanced Usage

### Complex Configuration Patterns

#### Conditional Rotation
```bash
# Complex rotation with conditions
/var/log/app/application.log {
    daily
    size 500M
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    minsize 10M
    maxsize 2G
    create 644 appuser appgroup
    sharedscripts
    prerotate
        # Check disk space before rotation
        if [ $(df /var/log | awk 'NR==2 {print $5}' | sed 's/%//') -gt 90 ]; then
            echo "Warning: Low disk space, skipping log rotation"
            exit 1
        fi
    endscript
    postrotate
        # Clean up old compressed logs if needed
        find /var/log/app/ -name "*.log.*.gz" -mtime +60 -delete
    endscript
}
```

#### Multiple Log Sets
```bash
# Multiple log files with shared configuration
/var/log/webserver/*.log
/var/log/application/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    sharedscripts
    prerotate
        # Perform backup before rotation
        if [ -d /backup/logs ]; then
            rsync -a --include="*.log" --exclude="*" /var/log/ /backup/logs/
        fi
    endscript
    postrotate
        # Notify monitoring system
        curl -X POST http://monitoring.local/alert \
             -d "Log rotation completed for $(date)"
    endscript
}
```

### Custom Scripts Integration

#### External Script Execution
```bash
# Log rotation with custom processing
/var/log/transactions/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 transuser transgroup
    sharedscripts
    postrotate
        # Process rotated logs
        for logfile in /var/log/transactions/*.log.1.gz; do
            if [ -f "$logfile" ]; then
                /usr/local/bin/process_transaction_log "$logfile" &
            fi
        done

        # Update database with rotation info
        /usr/local/bin/update_log_rotation_db $(date +%Y-%m-%d)
    endscript
}
```

#### Health Checks and Monitoring
```bash
# Log rotation with health monitoring
/var/log/critical/*.log {
    hourly
    rotate 24
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    sharedscripts
    lastaction
        # Check if all logs were rotated successfully
        failed=0
        for log in $1; do
            if [ ! -f "${log}.1.gz" ]; then
                logger -t logrotate "Failed to rotate $log"
                failed=1
            fi
        done

        if [ $failed -eq 1 ]; then
            # Send alert
            echo "Log rotation failures detected" | \
            mail -s "Logrotate Alert" admin@example.com
        fi
    endscript
}
```

### Performance Optimization

#### Parallel Processing
```bash
# Optimized for high-volume systems
/var/log/highvolume/*.log {
    hourly
    rotate 12
    compress
    compresscmd /usr/bin/pigz  # Parallel gzip
    compressoptions -p 4       # Use 4 threads
    delaycompress
    missingok
    notifempty
    size 1G
    create 644 hvuser hvgroup
    sharedscripts
    postrotate
        # Clean up in background
        find /var/log/highvolume/ -name "*.log.*" -mtime +7 -delete &
    endscript
}
```

#### Memory-Efficient Configuration
```bash
# For systems with limited resources
/var/log/constrained/*.log {
    weekly
    rotate 4
    nocompress  # Skip compression to save CPU
    missingok
    notifempty
    create 644 user user
    maxage 30   # Remove old logs quickly
}
```

## Integration and Automation

### Cron Integration

#### Manual Cron Setup
```bash
# Add to crontab for custom schedule
crontab -e

# Run logrotate every hour
0 * * * * /usr/sbin/logrotate /etc/logrotate.hourly.conf

# Run logrotate every 6 hours
0 */6 * * * /usr/sbin/logrotate /etc/logrotate.conf

# Custom daily run at 2 AM with full path
0 2 * * * /usr/sbin/logrotate -s /var/lib/logrotate/status /etc/logrotate.conf
```

#### Custom Logrotate Configuration
```bash
# Create hourly logrotate configuration
cat > /etc/logrotate.hourly.conf << 'EOF'
# Hourly log rotation configuration
include /etc/logrotate.d/hourly

/var/log/nginx/access.log {
    hourly
    rotate 24
    compress
    delaycompress
    missingok
    notifempty
    create 644 www-data www-data
    postrotate
        /usr/sbin/nginx -s reload > /dev/null 2>&1
    endscript
}
EOF
```

### Monitoring and Alerting

#### Logrotate Monitoring Script
```bash
#!/bin/bash
# Monitor logrotate execution and send alerts

LOGROTATE_LOG="/var/log/logrotate.log"
ALERT_EMAIL="admin@example.com"
ERROR_THRESHOLD=5

# Check logrotate log for errors
error_count=$(grep -c "error" "$LOGROTATE_LOG" 2>/dev/null || echo "0")

if [ "$error_count" -gt "$ERROR_THRESHOLD" ]; then
    echo "Logrotate errors detected: $error_count" | \
    mail -s "Logrotate Alert" "$ALERT_EMAIL"
fi

# Check for missing log files that should be rotated
missing_logs=$(find /var/log -name "*.log" -mtime +30 -type f 2>/dev/null | wc -l)

if [ "$missing_logs" -gt 0 ]; then
    echo "Found $missing_logs potentially unrotated logs" | \
    mail -s "Log Rotation Warning" "$ALERT_EMAIL"
fi
```

#### Systemd Service Integration
```bash
# Create systemd timer for custom logrotate schedule
cat > /etc/systemd/system/logrotate-hourly.timer << 'EOF'
[Unit]
Description=Hourly log rotation
Requires=logrotate-hourly.service

[Timer]
OnCalendar=hourly
Persistent=true

[Install]
WantedBy=timers.target
EOF

cat > /etc/systemd/system/logrotate-hourly.service << 'EOF'
[Unit]
Description=Hourly log rotation

[Service]
Type=oneshot
ExecStart=/usr/sbin/logrotate /etc/logrotate.hourly.conf
EOF

# Enable and start the timer
systemctl enable logrotate-hourly.timer
systemctl start logrotate-hourly.timer
```

## Troubleshooting

### Common Issues

#### Configuration Errors
```bash
# Debug configuration syntax issues
logrotate -d /etc/logrotate.d/problematic_config

# Check configuration file syntax
logrotate -f /etc/logrotate.d/test_config 2>&1 | grep -i error

# Validate all configuration files
for config in /etc/logrotate.d/*; do
    echo "Checking $config:"
    logrotate -d "$config" 2>&1 | head -10
done
```

#### Permission Issues
```bash
# Check file permissions
ls -la /var/log/
ls -la /var/lib/logrotate/

# Fix common permission issues
chown root:adm /var/log/some.log
chmod 644 /var/log/some.log

# Check state file permissions
ls -la /var/lib/logrotate/status
chown root:root /var/lib/logrotate/status
chmod 644 /var/lib/logrotate/status
```

#### Disk Space Issues
```bash
# Find large log files
find /var/log -type f -size +100M -exec ls -lh {} \;

# Clean up old rotated logs manually
find /var/log -name "*.log.*" -mtime +90 -delete

# Check compression effectiveness
du -sh /var/log/app.log
du -sh /var/log/app.log.1.gz
```

#### Service Reload Issues
```bash
# Test reload commands manually
nginx -s reload
apache2ctl graceful
systemctl reload rsyslog

# Check service status after reload
systemctl status nginx
systemctl status apache2
systemctl status rsyslog
```

### Debugging Techniques

#### Verbose Execution
```bash
# Run with maximum verbosity
logrotate -vf /etc/logrotate.conf

# Monitor specific log rotation
logrotate -vf /etc/logrotate.d/nginx | tee /tmp/rotation.log

# Check what would happen (dry run)
logrotate -d /etc/logrotate.conf | grep -A 10 "rotating pattern"
```

#### State File Analysis
```bash
# Examine logrotate state file
cat /var/lib/logrotate/status

# Check last rotation time for specific log
grep "/var/log/nginx/access.log" /var/lib/logrotate/status

# Reset rotation state for testing
sed -i '/\/var\/log\/test.log/d' /var/lib/logrotate/status
```

## Related Commands

- [`logger`](/docs/commands/user-management/logger) - Add entries to system log
- [`journalctl`](/docs/commands/user-management/journalctl) - Query systemd journal
- [`logwatch`](/docs/commands/user-management/logwatch) - System log analyzer and reporter
- [`rsyslog`](/docs/commands/user-management/rsyslog) - Reliable system and kernel logging daemon
- [`cron`](/docs/commands/system-service/cron) - Daemon to execute scheduled commands
- [`crontab`](/docs/commands/system-service/crontab) - Manage crontab files
- [`systemctl`](/docs/commands/system-service/systemctl) - Control systemd system and service manager
- [`find`](/docs/commands/file-management/find) - Search for files and execute commands
- [`du`](/docs/commands/file-management/du) - Estimate file space usage
- [`df`](/docs/commands/file-management/df) - Report file system disk space usage

## Best Practices

1. **Test configurations** with `-d` flag before applying to production
2. **Use `delaycompress`** to avoid compression-related race conditions
3. **Set appropriate permissions** for new log files with `create` directive
4. **Use `sharedscripts`** to avoid executing scripts multiple times
5. **Monitor disk space** and set appropriate retention policies
6. **Use `missingok`** for optional log files that may not exist
7. **Implement `notifempty`** to avoid rotating empty log files
8. **Use `dateext`** for better chronological organization of old logs
9. **Set up monitoring** for logrotate failures and disk space issues
10. **Regularly review** and adjust rotation intervals based on log growth patterns

## Performance Tips

1. **Use `pigz` instead of `gzip`** for parallel compression on multi-core systems
2. **Adjust rotation intervals** based on actual log growth rates
3. **Use `size` directive** for high-volume logs in addition to time-based rotation
4. **Implement `maxage`** to prevent accumulation of very old logs
5. **Use `olddir`** to separate current logs from archived ones
6. **Optimize compression levels** based on CPU vs. storage trade-offs
7. **Consider `nocompress`** for frequently accessed old logs
8. **Use `sharedscripts`** to reduce the number of service reloads
9. **Implement background cleanup** tasks to remove old compressed logs
10. **Monitor system load** during log rotation and adjust schedules accordingly

The `logrotate` command is an essential tool for managing log files in Linux systems. Its flexible configuration options, integration with system services, and automation capabilities make it indispensable for maintaining system hygiene, managing storage resources, and ensuring logs remain organized and accessible for troubleshooting and analysis purposes.