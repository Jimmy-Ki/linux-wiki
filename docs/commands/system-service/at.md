---
title: at - Schedule command execution
sidebar_label: at
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# at - Schedule command execution

The `at` command is a powerful utility that allows users to schedule commands and scripts to be executed at a specified time in the future. Unlike cron which runs tasks on a recurring schedule, `at` executes commands once at a specific time and then removes them from the queue. It's part of the atd (at daemon) system service and provides flexible time specification options, making it ideal for one-time system maintenance tasks, delayed job processing, and time-sensitive operations. The command maintains a queue of pending jobs that can be viewed, modified, or removed before execution.

## Basic Syntax

```bash
at [-V] [-q queue] [-f file] [-mldbv] TIME
at [-V] [-q queue] [-f file] [-mldbv] -t [[CC]YY]MMDDhhmm[.ss]
at [-V] [-q queue] [-f file] [-mldbv] now + COUNT [UNITS]
at -c job [job...]
atq [-V] [-q queue] [-v]
atrm [-V] job [job...]
batch [-V] [-q queue] [-f file] [-mv] [TIME]
```

## Time Specification Formats

### Absolute Time Formats
- `HH:MM` - Specific time today or tomorrow
- `HH:MM YYYY-MM-DD` - Specific date and time
- `HH:MM MM/DD/YY` - Specific date and time (US format)
- `HH:MM DD.MM.YY` - Specific date and time (European format)
- `midnight` - 00:00 (12:00 AM)
- `noon` - 12:00 (12:00 PM)
- `teatime` - 16:00 (4:00 PM)

### Relative Time Formats
- `now + COUNT UNIT` - Relative to current time
- `tomorrow` - Next day at current time
- `today` - Current day
- `TIME tomorrow` - Specified time tomorrow

### Time Units
- `minutes`, `minute`, `mins`, `min`
- `hours`, `hour`, `hrs`, `hr`
- `days`, `day`
- `weeks`, `week`, `wks`, `wk`
- `months`, `month`, `mons`, `mon`
- `years`, `year`, `yrs`, `yr`

## Common Options

### Job Management
- `-f FILE`, `--file=FILE` - Read commands from file instead of stdin
- `-l`, `--list` - List jobs (same as atq)
- `-d`, `--delete=JOB` - Delete job (same as atrm)
- `-c`, `--cat=JOB` - Show job contents
- `-q QUEUE` - Specify queue (a-z, A-Z)

### Output and Notification
- `-m` - Send mail when job completes
- `-M` - Never send mail
- `-v` - Show job times before reading

### Time Formats
- `-t [[CC]YY]MMDDhhmm[.ss]` - Use time specified in format
- `-V`, `--version` - Display version information

### Queue Management
- `-a` - List all jobs in all queues (atq)
- `-d` - Delete jobs (atrm)
- `-i` - Interactive mode for deletion

## Queue Types

| Queue | Purpose | Nice Value |
|-------|---------|------------|
| `a` | At jobs | 0 |
| `b` | Batch jobs | 0 |
| `c-f` | Lower priority | 5-15 |
| `A-Z` | Higher priority | -15 to -1 |

## Usage Examples

### Basic Job Scheduling

#### Simple Time Scheduling
```bash
# Schedule job for specific time
at 14:30
echo "Job executed at $(date)" | mail user@example.com
# Press Ctrl+D to finish

# Schedule job for tomorrow at 9 AM
at 9am tomorrow
shutdown -r +5 "System rebooting in 5 minutes"
# Press Ctrl+D to finish

# Schedule job with specific date
at 10:00 2024-12-25
echo "Merry Christmas!" | wall
# Press Ctrl+D to finish

# Schedule job using common time words
at midnight
find /tmp -type f -mtime +7 -delete
# Press Ctrl+D to finish
```

#### Relative Time Scheduling
```bash
# Schedule job 10 minutes from now
at now + 10 minutes
echo "10 minutes have passed" > /tmp/timer.log
# Press Ctrl+D to finish

# Schedule job 2 hours from now
at now + 2 hours
systemctl restart nginx
# Press Ctrl+D to finish

# Schedule job 3 days from now
at now + 3 days
tar -czf /backup/archive_$(date +%Y%m%d).tar.gz /home/user/documents
# Press Ctrl+D to finish

# Schedule job 1 week from now
at now + 1 week
yum update -y
# Press Ctrl+D to finish
```

#### Using Files for Commands
```bash
# Create script file
cat > /home/user/maintenance.sh << 'EOF'
#!/bin/bash
echo "System maintenance started at $(date)" >> /var/log/maintenance.log
apt-get update && apt-get upgrade -y
echo "System maintenance completed at $(date)" >> /var/log/maintenance.log
EOF

# Schedule script execution
at 3:00am tomorrow -f /home/user/maintenance.sh

# Verify job was scheduled
atq
```

### Job Management

#### Viewing Jobs
```bash
# List all pending jobs
atq

# List jobs with detailed information
atq -v

# Show job contents
at -c 1

# Show multiple jobs
at -c 1 2 3
```

#### Removing Jobs
```bash
# Remove specific job
atrm 3

# Remove multiple jobs
atrm 1 2 4

# Remove all jobs (interactive)
atrm $(atq | cut -f1)

# Remove jobs from specific queue
at -d -q b 5
```

#### Modifying Jobs
```bash
# Remove and reschedule job
atrm 2
at 5:00pm
echo "Rescheduled job" > /tmp/rescheduled.txt
# Press Ctrl+D to finish
```

### Advanced Usage

#### Queue Management
```bash
# Schedule high priority job
at -q A now + 5 minutes
echo "High priority task" > /tmp/high_priority.log

# Schedule low priority job
at -q z now + 10 minutes
echo "Low priority task" > /tmp/low_priority.log

# Schedule batch job (runs when system load is low)
batch -q b now
find /var/log -name "*.log" -mtime +30 -delete
# Press Ctrl+D to finish
```

#### Notification and Output
```bash
# Schedule job with mail notification
at -m 6:00pm
echo "Job completed successfully" | mail -s "Task Complete" admin@example.com

# Schedule job without mail
at -M 11:00am
dd if=/dev/zero of=/tmp/testfile bs=1M count=100

# Redirect output to files
at 2:00am
rsync -av /source/ /destination/ > /var/log/rsync_$(date +%Y%m%d).log 2>&1
# Press Ctrl+D to finish
```

#### Complex Time Specifications
```bash
# Using precise time format
at -t 202412251430.30
echo "Merry Christmas at 2:30:30 PM" > /tmp/holiday.txt

# Multiple time elements
at 4:30pm tomorrow + 2 weeks
echo "Job in 2 weeks" > /tmp/future_job.txt

# Next business day
at monday 9:00am
echo "Monday morning job" > /tmp/monday.txt
```

## Practical Examples

### System Administration

#### System Maintenance
```bash
# Schedule system reboot during off-peak hours
at 2:00am Sunday
echo "Scheduled reboot" | wall
sleep 60
reboot
# Press Ctrl+D to finish

# Schedule log rotation
at 12:00am
logrotate -f /etc/logrotate.conf
# Press Ctrl+D to finish

# Schedule backup
at 1:00am
tar -czf /backup/full_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
    --exclude=/backup --exclude=/proc --exclude=/sys --exclude=/tmp /
# Press Ctrl+D to finish

# Schedule cleanup
at 3:00am
find /tmp -type f -mtime +7 -delete
find /var/tmp -type f -mtime +30 -delete
docker system prune -f
# Press Ctrl+D to finish
```

#### Software Updates
```bash
# Schedule package updates for Ubuntu/Debian
at 4:00am Saturday
apt-get update
apt-get upgrade -y
apt-get autoremove -y
apt-get autoclean
# Press Ctrl+D to finish

# Schedule package updates for CentOS/RHEL
at 5:00am Sunday
yum update -y
yum clean all
# Press Ctrl+D to finish

# Schedule Docker updates
at now + 2 hours
docker pull ubuntu:latest
docker-compose -f /opt/app/docker-compose.yml down
docker-compose -f /opt/app/docker-compose.yml pull
docker-compose -f /opt/app/docker-compose.yml up -d
# Press Ctrl+D to finish
```

### Development Workflow

#### Build and Deployment
```bash
# Schedule nightly build
at 11:00pm
cd /opt/project
make clean
make build
make test
make deploy > /var/log/deploy_$(date +%Y%m%d).log 2>&1
# Press Ctrl+D to finish

# Schedule code analysis
at 3:00am
cd /opt/project
sonar-scanner \
  -Dsonar.projectKey=myproject \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000
# Press Ctrl+D to finish

# Schedule database migration
at 6:00am Saturday
cd /opt/app
python manage.py migrate > /var/log/migration_$(date +%Y%m%d).log 2>&1
# Press Ctrl+D to finish
```

#### Testing and Validation
```bash
# Schedule automated tests
at now + 30 minutes
cd /opt/tests
pytest --html=report_$(date +%Y%m%d_%H%M%S).html > test.log 2>&1
# Press Ctrl+D to finish

# Schedule performance tests
at 10:00pm
cd /opt/performance
ab -n 10000 -c 100 http://localhost:8080/ > perf_$(date +%Y%m%d).log
# Press Ctrl+D to finish

# Schedule security scans
at 2:00am daily
nmap -sS -O -oN /var/log/scan_$(date +%Y%m%d).log 192.168.1.0/24
# Press Ctrl+D to finish
```

### Data Processing

#### File Operations
```bash
# Schedule large file processing
at now + 1 hour
find /data -name "*.csv" -exec awk '{print $1","$2}' {} \; > /processed/data_$(date +%Y%m%d).csv

# Schedule image processing
at 11:00pm
for file in /images/raw/*.tiff; do
  convert "$file" -resize 50% "/images/thumbnails/$(basename "$file" .tiff).jpg"
done
# Press Ctrl+D to finish

# Schedule data compression
at now + 30 minutes
find /logs -name "*.log" -mtime +7 -exec gzip {} \;
find /backup -name "*.sql" -mtime +30 -exec gzip {} \;
# Press Ctrl+D to finish
```

#### Database Operations
```bash
# Schedule database backup
at 1:00am daily
mysqldump -u root -p'password' --all-databases | gzip > /backup/mysql_$(date +%Y%m%d).sql.gz

# Schedule database cleanup
at 4:00am Sunday
mysql -u root -p'password' -e "DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);"

# Schedule report generation
at 8:00am
mysql -u user -p'pass' database -e "SELECT * FROM sales WHERE date >= CURDATE() - INTERVAL 1 DAY;" > /reports/daily_sales_$(date +%Y%m%d).csv
# Press Ctrl+D to finish
```

## Advanced Usage

### Script Integration

#### Complex Maintenance Script
```bash
#!/bin/bash
# /usr/local/bin/system_maintenance.sh

LOG_FILE="/var/log/maintenance_$(date +%Y%m%d_%H%M%S).log"
EMAIL="admin@example.com"

# Function to log and email
log_and_email() {
    echo "[$(date)] $1" >> "$LOG_FILE"
    echo "System Maintenance: $1" | mail -s "Maintenance Alert" "$EMAIL"
}

# System cleanup
log_and_email "Starting system cleanup..."
find /tmp -type f -mtime +7 -delete 2>&1 | tee -a "$LOG_FILE"
find /var/tmp -type f -mtime +30 -delete 2>&1 | tee -a "$LOG_FILE"

# Package updates
log_and_email "Updating packages..."
apt-get update 2>&1 | tee -a "$LOG_FILE"
apt-get upgrade -y 2>&1 | tee -a "$LOG_FILE"

# Service restart
log_and_email "Restarting services..."
systemctl restart nginx 2>&1 | tee -a "$LOG_FILE"
systemctl restart mysql 2>&1 | tee -a "$LOG_FILE"

log_and_email "Maintenance completed successfully"

# Schedule this script
at 2:00am Sunday -f /usr/local/bin/system_maintenance.sh
```

#### Conditional Job Scheduling
```bash
# Script that reschedules itself based on conditions
#!/bin/bash
# /usr/local/bin/conditional_job.sh

# Check if system load is low
LOAD=$(uptime | awk '{print $10}' | sed 's/,//')
if (( $(echo "$LOAD < 1.0" | bc -l) )); then
    echo "System load is low ($LOAD). Running heavy tasks..."
    # Run heavy processing tasks
    find /data -name "*.raw" -exec processor {} \;
else
    echo "System load is high ($LOAD). Rescheduling for later..."
    # Reschedule for 2 hours later
    echo "find /data -name '*.raw' -exec processor {} \;" | at now + 2 hours
fi
```

### Error Handling and Monitoring

#### Job Monitoring Script
```bash
#!/bin/bash
# /usr/local/bin/at_monitor.sh

# Check for failed jobs
FAILED_JOBS=$(atq | wc -l)
if [ "$FAILED_JOBS" -gt 10 ]; then
    echo "Warning: $FAILED_JOBS jobs pending in queue" | \
    mail -s "AT Queue Alert" admin@example.com
fi

# Check atd service status
if ! systemctl is-active --quiet atd; then
    echo "ATD service is not running!" | \
    mail -s "Service Alert" admin@example.com
    systemctl restart atd
fi

# Monitor specific job completion
tail -f /var/log/syslog | grep --line-buffered "atd\[" | \
while read line; do
    if echo "$line" | grep -q "cmd=.*exit=[1-9]"; then
        echo "Job failed: $line" | \
        mail -s "AT Job Failed" admin@example.com
    fi
done
```

#### Job Validation
```bash
# Schedule job with validation
at 10:00pm << EOF
#!/bin/bash
set -e  # Exit on error

# Validate prerequisites
if [ ! -f /path/to/config ]; then
    echo "Configuration file missing!" >&2
    exit 1
fi

# Main job with error handling
trap 'echo "Job failed at line $LINENO"' ERR

echo "Job started at $(date)"
# Your commands here
echo "Job completed successfully at $(date)"
EOF
```

## Integration and Automation

### Cron Integration

#### Using at with cron for flexible scheduling
```bash
# Add to crontab to schedule complex time patterns
# At 9 AM on the last day of each month
0 9 28-31 * * [ "$(date -d tomorrow +\%d)" -eq "01" ] && echo "Monthly job" | at 9am

# At 2 PM on the next weekday after first Friday of month
0 14 * * 5 [ "$(date +\%d)" -le "7" ] && echo "First Friday job" | at 2pm monday
```

### Systemd Integration

#### Creating systemd service for at jobs
```ini
# /etc/systemd/system/at-monitor.service
[Unit]
Description=AT Job Monitor
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/at_monitor.sh
User=root
```

```bash
# Create systemd timer
# /etc/systemd/system/at-monitor.timer
[Unit]
Description=Run AT Monitor every 5 minutes

[Timer]
OnCalendar=*:0/5
Persistent=true

[Install]
WantedBy=timers.target

# Enable the timer
systemctl enable at-monitor.timer
systemctl start at-monitor.timer
```

## Security Considerations

### Access Control

#### Using /etc/at.allow and /etc/at.deny
```bash
# /etc/at.allow - Users allowed to use at
root
admin
backupuser

# /etc/at.deny - Users denied access (if at.allow doesn't exist)
guest
tempuser
```

#### Secure Job Scheduling
```bash
# Schedule jobs with proper permissions
sudo -u backupuser at 2:00am << 'EOF'
tar -czf /backup/user_data_$(date +%Y%m%d).tar.gz /home/user
EOF

# Validate job contents for security
at -c $(atq | head -1 | awk '{print $1}') | grep -v "^[^#]"
```

## Troubleshooting

### Common Issues

#### Job Not Executing
```bash
# Check if atd service is running
systemctl status atd
systemctl start atd
systemctl enable atd

# Check job queue
atq -v

# Check system logs for errors
journalctl -u atd -f
grep atd /var/log/syslog

# Check job permissions
ls -la /var/spool/cron/atjobs/
```

#### Time Zone Issues
```bash
# Check current time zone
timedatectl
date

# Schedule with explicit time zone
TZ=UTC at 14:30
echo "UTC time job" > /tmp/utc_job.txt
# Press Ctrl+D to finish

# Convert time to local for scheduling
at $(date -d "2:30 PM today + 1 day" "+%H:%M %Y-%m-%d")
```

#### Permission Issues
```bash
# Check user permissions
groups $USER
cat /etc/at.allow
cat /etc/at.deny

# Fix permissions
sudo usermod -a -G at $USER
sudo systemctl restart atd
```

#### Job Execution Problems
```bash
# Test simple job first
at now << 'EOF'
echo "Test job at $(date)" > /tmp/at_test.txt
EOF

# Check job environment
at -c $(atq | tail -1 | awk '{print $1}') | head -20

# Schedule with explicit shell
at now << 'EOF'
#!/bin/bash
echo "Job with explicit shell at $(date)" > /tmp/shell_test.txt
EOF
```

### Debugging

#### Enable Verbose Logging
```bash
# Enable atd debugging
sudo systemctl edit atd
# Add:
# [Service]
# Environment="ATD_DEBUG=1"

# Restart service
sudo systemctl daemon-reload
sudo systemctl restart atd

# Monitor logs
journalctl -u atd -f
```

#### Job Testing
```bash
# Test job environment interactively
at now << 'EOF'
env > /tmp/at_env.log
pwd > /tmp/at_pwd.log
whoami > /tmp/at_user.log
echo $PATH > /tmp/at_path.log
EOF

# Check results
cat /tmp/at_*.log
```

## Best Practices

### Job Management
1. **Always verify job scheduling** with `atq` after creating jobs
2. **Use descriptive job identifiers** by embedding timestamps or descriptions
3. **Clean up completed jobs regularly** to maintain queue efficiency
4. **Test jobs with simple commands first** before scheduling complex tasks
5. **Use appropriate queues** for different priority levels

### Time Specification
1. **Use absolute times** for critical system maintenance
2. **Use relative times** for flexible scheduling needs
3. **Consider time zones** when scheduling across systems
4. **Allow buffer time** for jobs that might overrun
5. **Test time specifications** before important jobs

### Security and Permissions
1. **Restrict access** using `/etc/at.allow` and `/etc/at.deny`
2. **Use least privilege principle** for job execution
3. **Validate input** when accepting user-provided commands
4. **Monitor job execution** for security purposes
5. **Audit scheduled jobs** regularly

### Error Handling
1. **Include error handling** in job scripts
2. **Set up notifications** for job failures
3. **Log job activities** for debugging
4. **Test job environment** before scheduling
5. **Have fallback procedures** for critical jobs

## Performance Tips

1. **Batch similar jobs** to reduce system overhead
2. **Use appropriate queues** to optimize system load
3. **Schedule resource-intensive jobs** during off-peak hours
4. **Monitor system load** when scheduling multiple jobs
5. **Use batch command** for non-time-critical jobs that can run when system is idle
6. **Limit concurrent jobs** to prevent system overload
7. **Optimize job scripts** to reduce execution time
8. **Use efficient commands** within scheduled jobs
9. **Monitor disk space** for jobs that create large files
10. **Schedule cleanup jobs** to manage temporary files

## Related Commands

- [`atq`](/docs/commands/system-service/atq) - List pending at jobs
- [`atrm`](/docs/commands/system-service/atrm) - Remove scheduled at jobs
- [`batch`](/docs/commands/system-service/batch) - Schedule batch jobs
- [`cron`](/docs/commands/system-service/crontab) - Schedule recurring jobs
- [`systemctl`](/docs/commands/system-service/systemctl) - Control system services
- [`timedatectl`](/docs/commands/system-service/timedatectl) - Control system time
- [`wall`](/docs/commands/system-info/wall) - Send messages to all users

The `at` command provides a robust and flexible solution for one-time job scheduling in Linux systems. Its intuitive time specification, queue management, and integration with system services make it an essential tool for system administrators and developers needing to execute tasks at specific times without creating recurring schedules.