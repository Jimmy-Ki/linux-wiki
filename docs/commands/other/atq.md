---
title: atq - List jobs queued by at
sidebar_label: atq
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# atq - List jobs queued by at

The `atq` command is a utility that displays the list of jobs currently queued in the `at` job scheduling system. It provides administrators and users with a comprehensive view of all pending one-time scheduled tasks, including their job numbers, execution times, queues, and submitting users. As part of the atd (at daemon) ecosystem, `atq` serves as the primary tool for monitoring and managing scheduled jobs before their execution. The command is essential for system administration, task tracking, and ensuring that scheduled maintenance, backups, and other time-sensitive operations are properly queued and will execute as expected.

## Basic Syntax

```bash
atq [OPTIONS]
atq [-V] [-q queue] [-v]
```

## Job Output Format

The default output format displays:
```
JOB_NUMBER  EXECUTION_TIME  QUEUE  USER
```

- **JOB_NUMBER**: Unique identifier for the job
- **EXECUTION_TIME**: When the job will execute
- **QUEUE**: Queue priority (a-z, A-Z)
- **USER**: User who submitted the job

## Common Options

### Display Options
- `-V`, `--version` - Display version information
- `-v`, `--verbose` - Show detailed job information including year
- `-q QUEUE`, `--queue=QUEUE` - Show only jobs from specific queue

### Queue Filtering
- `-q a` - Show only at jobs
- `-q b` - Show only batch jobs
- `-q c-f` - Show lower priority jobs
- `-q A-Z` - Show higher priority jobs

## Queue Types and Priorities

| Queue | Purpose | Nice Value | Description |
|-------|---------|------------|-------------|
| `a` | At jobs | 0 | Default at job queue |
| `b` | Batch jobs | 0 | Jobs that run when system load is low |
| `c-f` | Lower priority | 5-15 | Jobs with lower execution priority |
| `A-Z` | Higher priority | -15 to -1 | Jobs with higher execution priority |

## Usage Examples

### Basic Job Viewing

#### Standard Job Listing
```bash
# List all pending jobs
atq

# Example output:
# 15      Thu Dec 26 14:30:00 2024 a alice
# 16      Fri Dec 27 09:00:00 2024 a bob
# 17      Mon Dec 30 02:00:00 2024 b root

# List jobs with verbose output (includes year)
atq -v

# Example output with verbose:
# 18      2024-12-26 16:45 a admin
# 19      2024-12-27 11:30 b backup
# 20      2024-12-28 08:00 c lowpriority
```

#### Filter by Queue
```bash
# Show only high priority jobs (queues A-Z)
atq -q A

# Show only batch jobs
atq -q b

# Show only default at jobs
atq -q a

# Show jobs from multiple queues
for queue in a b c; do
    echo "Queue $queue:"
    atq -q $queue
done

# Show all jobs with queue information in a custom format
atq | awk '{printf "Job: %s | Time: %s | Queue: %s | User: %s\n", $1, $2 " " $3 " " $4 " " $5, $6, $7}'
```

### Advanced Job Monitoring

#### Detailed Job Analysis
```bash
# Count total jobs
total_jobs=$(atq | wc -l)
echo "Total pending jobs: $total_jobs"

# Count jobs by queue
echo "Jobs by queue:"
atq | awk '{print $6}' | sort | uniq -c

# Count jobs by user
echo "Jobs by user:"
atq | awk '{print $7}' | sort | uniq -c

# Show jobs scheduled for today
today=$(date +%Y-%m-%d)
atq | grep "$today"

# Show jobs scheduled for tomorrow
tomorrow=$(date -d tomorrow +%Y-%m-%d)
atq | grep "$tomorrow"

# Show jobs scheduled within the next hour
current_time=$(date +%H:%M)
atq | awk -v current="$current_time" '
{
    split($2, time_parts, ":")
    job_hour = time_parts[1]
    job_min = time_parts[2]
    split(current, current_parts, ":")
    curr_hour = current_parts[1]
    curr_min = current_parts[2]

    if (job_hour > curr_hour || (job_hour == curr_hour && job_min > curr_min)) {
        print $0
    }
}'
```

#### Job Age Analysis
```bash
# Show jobs scheduled in the past (should not exist normally)
past_jobs=$(atq | grep "$(date -d yesterday +%Y-%m-%d)")
if [ -n "$past_jobs" ]; then
    echo "WARNING: Found jobs scheduled for past dates:"
    echo "$past_jobs"
fi

# Show jobs scheduled more than a week in the future
future_date=$(date -d "7 days" +%Y-%m-%d)
atq | awk -v future="$future_date" '$2 >= future {print "Future job:", $0}'

# Monitor job queue growth
watch -n 60 'echo "Job count: $(atq | wc -l)" && atq'
```

## Practical Examples

### System Administration

#### Daily Job Monitoring
```bash
#!/bin/bash
# /usr/local/bin/atq_monitor.sh

LOG_FILE="/var/log/atq_monitor.log"
EMAIL="admin@example.com"

# Function to log and email alerts
log_alert() {
    echo "[$(date)] $1" >> "$LOG_FILE"
    echo "AT Queue Monitor Alert: $1" | mail -s "AT Queue Alert" "$EMAIL"
}

# Check job count
job_count=$(atq | wc -l)
if [ "$job_count" -gt 50 ]; then
    log_alert "High job count: $job_count jobs pending"
fi

# Check for jobs in high priority queues
high_priority=$(atq -q A | wc -l)
if [ "$high_priority" -gt 0 ]; then
    log_alert "High priority jobs found: $high_priority jobs"
fi

# Check for jobs from unexpected users
unexpected_users=$(atq | awk '{print $7}' | grep -v -E "^(root|admin|backup|nagios)$")
if [ -n "$unexpected_users" ]; then
    log_alert "Jobs from unexpected users detected: $unexpected_users"
fi

# Check for jobs scheduled during maintenance window
maintenance_start="02:00"
maintenance_end="04:00"
atq | awk -v start="$maintenance_start" -v end="$maintenance_end" '
{
    split($2, time_parts, ":")
    job_time = time_parts[1] ":" time_parts[2]
    if (job_time >= start && job_time <= end) {
        print "Maintenance window job:", $0
    }
}' | while read line; do
    log_alert "$line"
done

echo "[$(date)] AT queue monitoring completed" >> "$LOG_FILE"
```

#### Job Queue Health Check
```bash
#!/bin/bash
# Comprehensive job queue health check

echo "=== AT Queue Health Check ==="
echo "Check time: $(date)"
echo

# Service status
echo "1. ATD Service Status:"
systemctl is-active atd && echo "✓ ATD service is running" || echo "✗ ATD service is not running"
echo

# Job statistics
echo "2. Job Queue Statistics:"
total_jobs=$(atq | wc -l)
echo "Total jobs: $total_jobs"

if [ "$total_jobs" -gt 0 ]; then
    echo "Jobs by queue:"
    atq | awk '{print $6}' | sort | uniq -c | sort -nr

    echo "Jobs by user:"
    atq | awk '{print $7}' | sort | uniq -c | sort -nr

    echo "Oldest scheduled job:"
    atq | sort -k2,2 -k3,3 | head -1

    echo "Newest scheduled job:"
    atq | sort -k2,2 -k3,3 | tail -1
fi
echo

# Problem detection
echo "3. Problem Detection:"

# Check for too many jobs
if [ "$total_jobs" -gt 100 ]; then
    echo "⚠ WARNING: High job count ($total_jobs)"
fi

# Check for jobs in past
current_date=$(date +%Y-%m-%d)
past_jobs=$(atq | awk -v current="$current_date" '$2 < current {print}')
if [ -n "$past_jobs" ]; then
    echo "⚠ WARNING: Jobs scheduled for past dates:"
    echo "$past_jobs"
fi

# Check for jobs from root
root_jobs=$(atq -q a | awk '$7 == "root" {print}')
if [ -n "$root_jobs" ]; then
    echo "⚠ Root jobs found:"
    echo "$root_jobs"
fi

echo "Health check completed."
```

#### Automated Job Reporting
```bash
#!/bin/bash
# Daily job queue report

REPORT_FILE="/var/log/daily_atq_report_$(date +%Y%m%d).txt"
ADMIN_EMAIL="sysadmin@example.com"

{
    echo "Daily AT Queue Report"
    echo "====================="
    echo "Date: $(date)"
    echo

    echo "Summary Statistics:"
    echo "------------------"
    total_jobs=$(atq | wc -l)
    echo "Total pending jobs: $total_jobs"

    if [ "$total_jobs" -gt 0 ]; then
        echo
        echo "Jobs by Queue:"
        atq | awk '{print $6}' | sort | uniq -c | sort -nr

        echo
        echo "Jobs by User:"
        atq | awk '{print $7}' | sort | uniq -c | sort -nr

        echo
        echo "Jobs by Time of Day:"
        atq | awk '{split($2, t, ":"); print t[1] ":00 - " t[1] ":59"}' | sort | uniq -c

        echo
        echo "Upcoming Jobs (Next 24 Hours):"
        tomorrow=$(date -d tomorrow +%Y-%m-%d)
        today=$(date +%Y-%m-%d)
        atq | awk -v today="$today" -v tomorrow="$tomorrow" '$2 == today || $2 == tomorrow {print}'
    fi

    echo
    echo "System Status:"
    echo "-------------"
    echo "ATD service: $(systemctl is-active atd)"
    echo "System load: $(uptime | awk -F'load average:' '{print $2}')"
    echo "Disk space in /var/spool: $(df -h /var/spool | tail -1 | awk '{print $5}')"
} > "$REPORT_FILE"

# Email report
mail -s "Daily AT Queue Report for $(date +%Y-%m-%d)" "$ADMIN_EMAIL" < "$REPORT_FILE"

# Keep only last 30 days of reports
find /var/log -name "daily_atq_report_*.txt" -mtime +30 -delete
```

### User Interface Examples

#### Job Queue Dashboard
```bash
#!/bin/bash
# Interactive job queue viewer

while true; do
    clear
    echo "=== AT Queue Dashboard ==="
    echo "Last updated: $(date)"
    echo

    # Summary
    total_jobs=$(atq | wc -l)
    echo "Total Jobs: $total_jobs"

    if [ "$total_jobs" -gt 0 ]; then
        echo | awk '{printf "%-6s %-20s %-6s %-10s\n", "Job#", "Execution Time", "Queue", "User"}'
        echo | awk '{printf "%-6s %-20s %-6s %-10s\n", "-----", "-------------", "-----", "----"}'

        atq | while read line; do
            job_num=$(echo "$line" | awk '{print $1}')
            exec_time=$(echo "$line" | awk '{print $2 " " $3 " " $4 " " $5}')
            queue=$(echo "$line" | awk '{print $6}')
            user=$(echo "$line" | awk '{print $7}')

            # Color code based on urgency
            if [[ "$queue" =~ [A-Z] ]]; then
                color="\033[31m"  # Red for high priority
            elif [[ "$queue" =~ [c-f] ]]; then
                color="\033[33m"  # Yellow for low priority
            else
                color="\033[32m"  # Green for normal
            fi

            printf "%-6s %-20s ${color}%-6s\033[0m %-10s\n" "$job_num" "$exec_time" "$queue" "$user"
        done
    else
        echo "No jobs pending in the queue."
    fi

    echo
    echo "Options:"
    echo "1. Refresh"
    echo "2. Show detailed job info"
    echo "3. Remove a job"
    echo "4. Show jobs by queue"
    echo "5. Exit"
    echo
    read -p "Choose option: " choice

    case $choice in
        1) continue ;;
        2)
            read -p "Enter job number: " job_num
            echo "Job details:"
            at -c "$job_num"
            read -p "Press Enter to continue..." ;;
        3)
            read -p "Enter job number to remove: " job_num
            atrm "$job_num"
            echo "Job $job_num removed."
            sleep 2 ;;
        4)
            read -p "Enter queue letter (a-z, A-Z): " queue
            echo "Jobs in queue $queue:"
            atq -q "$queue"
            read -p "Press Enter to continue..." ;;
        5) break ;;
        *) echo "Invalid option." && sleep 1 ;;
    esac
done
```

#### Job Search and Filter
```bash
#!/bin/bash
# Advanced job search and filtering utility

show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -u USER     Show jobs for specific user"
    echo "  -q QUEUE    Show jobs for specific queue"
    echo "  -t TIME     Show jobs around specific time (HH:MM)"
    echo "  -d DATE     Show jobs for specific date (YYYY-MM-DD)"
    echo "  -n COUNT    Show only first N jobs"
    echo "  -r          Show jobs in reverse order"
    echo "  -c          Count jobs instead of listing"
    echo "  -h          Show this help"
}

# Parse arguments
user=""
queue=""
time=""
date=""
count=""
reverse=""
count_only=""

while getopts "u:q:t:d:n:rch" opt; do
    case $opt in
        u) user="$OPTARG" ;;
        q) queue="$OPTARG" ;;
        t) time="$OPTARG" ;;
        d) date="$OPTARG" ;;
        n) count="$OPTARG" ;;
        r) reverse="1" ;;
        c) count_only="1" ;;
        h) show_help; exit 0 ;;
    esac
done

# Get jobs
jobs=$(atq)

# Apply filters
if [ -n "$user" ]; then
    jobs=$(echo "$jobs" | awk -v user="$user" '$7 == user {print}')
fi

if [ -n "$queue" ]; then
    jobs=$(echo "$jobs" | awk -v queue="$queue" '$6 == queue {print}')
fi

if [ -n "$time" ]; then
    jobs=$(echo "$jobs" | awk -v time="$time" '$2 ~ time {print}')
fi

if [ -n "$date" ]; then
    jobs=$(echo "$jobs" | awk -v date="$date" '$2 == date {print}')
fi

if [ -n "$reverse" ]; then
    jobs=$(echo "$jobs" | sort -r)
fi

if [ -n "$count" ]; then
    jobs=$(echo "$jobs" | head -n "$count")
fi

# Output results
if [ -n "$count_only" ]; then
    echo "$jobs" | wc -l
else
    if [ -n "$jobs" ]; then
        echo "$jobs"
    else
        echo "No jobs found matching criteria."
    fi
fi
```

## Integration and Automation

### Monitoring and Alerting

#### Real-time Job Monitoring
```bash
#!/bin/bash
# Real-time job queue monitor with alerts

ALERT_THRESHOLD=50
EMAIL="admin@example.com"
LOG_FILE="/var/log/atq_monitor.log"

monitor_queue() {
    while true; do
        job_count=$(atq | wc -l)

        # Log current count
        echo "[$(date)] Current job count: $job_count" >> "$LOG_FILE"

        # Check threshold
        if [ "$job_count" -gt "$ALERT_THRESHOLD" ]; then
            echo "[$(date)] ALERT: Job count ($job_count) exceeds threshold ($ALERT_THRESHOLD)" >> "$LOG_FILE"

            # Send detailed alert
            {
                echo "Subject: AT Queue Alert - High Job Count"
                echo "To: $EMAIL"
                echo ""
                echo "Current job count: $job_count"
                echo "Alert threshold: $ALERT_THRESHOLD"
                echo ""
                echo "Current jobs:"
                atq
            } | /usr/sbin/sendmail -t
        fi

        # Check for stuck jobs (jobs older than 24 hours)
        old_jobs=$(atq | awk -v yesterday="$(date -d yesterday +%Y-%m-%d)" '$2 <= yesterday {print}')
        if [ -n "$old_jobs" ]; then
            echo "[$(date)] ALERT: Found potentially stuck jobs:" >> "$LOG_FILE"
            echo "$old_jobs" >> "$LOG_FILE"
        fi

        sleep 300  # Check every 5 minutes
    done
}

# Start monitoring in background
monitor_queue &
MONITOR_PID=$!

echo "Job queue monitoring started (PID: $MONITOR_PID)"
echo "Monitor will check queue every 5 minutes"
echo "Logs are being written to $LOG_FILE"

# Function to stop monitoring
stop_monitoring() {
    kill $MONITOR_PID
    echo "Monitoring stopped."
}

trap stop_monitoring INT TERM

# Keep script running
wait
```

#### Periodic Queue Analysis
```bash
#!/bin/bash
# Comprehensive periodic queue analysis

ANALYSIS_DIR="/var/log/atq_analysis"
REPORT_FILE="$ANALYSIS_DIR/analysis_$(date +%Y%m%d_%H%M%S).txt"

mkdir -p "$ANALYSIS_DIR"

{
    echo "AT Queue Analysis Report"
    echo "========================"
    echo "Generated: $(date)"
    echo "Analysis Type: Comprehensive"
    echo

    # Basic Statistics
    echo "1. Basic Statistics"
    echo "-------------------"
    total_jobs=$(atq | wc -l)
    echo "Total pending jobs: $total_jobs"

    if [ "$total_jobs" -gt 0 ]; then
        # Queue Distribution
        echo
        echo "2. Queue Distribution"
        echo "---------------------"
        echo "$total_jobs" | atq | awk '{print $6}' | sort | uniq -c | sort -nr

        # User Distribution
        echo
        echo "3. User Distribution"
        echo "--------------------"
        atq | awk '{print $7}' | sort | uniq -c | sort -nr

        # Time Distribution
        echo
        echo "4. Time Distribution (by Hour)"
        echo "--------------------------------"
        atq | awk '{split($2, t, ":"); hour = t[1]; print hour}' | sort | uniq -c

        # Date Distribution
        echo
        echo "5. Date Distribution"
        echo "---------------------"
        atq | awk '{print $2}' | sort | uniq -c

        # Priority Analysis
        echo
        echo "6. Priority Analysis"
        echo "--------------------"

        # High priority jobs (queues A-Z)
        high_priority=$(atq | grep -E ' [A-Z] ' | wc -l)
        echo "High priority jobs: $high_priority"

        # Normal priority jobs (queues a-b)
        normal_priority=$(atq | grep -E ' [ab] ' | wc -l)
        echo "Normal priority jobs: $normal_priority"

        # Low priority jobs (queues c-f)
        low_priority=$(atq | grep -E ' [c-f] ' | wc -l)
        echo "Low priority jobs: $low_priority"

        # Age Analysis
        echo
        echo "7. Job Age Analysis"
        echo "-------------------"
        current_date=$(date +%Y-%m-%d)

        # Jobs scheduled for today
        today_jobs=$(atq | grep "$current_date" | wc -l)
        echo "Jobs scheduled for today: $today_jobs"

        # Jobs scheduled for tomorrow
        tomorrow=$(date -d tomorrow +%Y-%m-%d)
        tomorrow_jobs=$(atq | grep "$tomorrow" | wc -l)
        echo "Jobs scheduled for tomorrow: $tomorrow_jobs"

        # Jobs scheduled more than a week ahead
        week_ahead=$(date -d "7 days" +%Y-%m-%d)
        future_jobs=$(atq | awk -v future="$week_ahead" '$2 > future {print}' | wc -l)
        echo "Jobs scheduled more than 1 week ahead: $future_jobs"

        # Potential Issues
        echo
        echo "8. Potential Issues"
        echo "-------------------"

        # Check for too many jobs from single user
        echo "Users with high job counts:"
        atq | awk '{print $7}' | sort | uniq -c | sort -nr | head -5

        # Check for jobs in maintenance window
        maintenance_jobs=$(atq | awk '
        {
            split($2, time_parts, ":")
            hour = time_parts[1]
            if (hour >= 2 && hour <= 4) {
                print
            }
        }')
        if [ -n "$maintenance_jobs" ]; then
            echo "Jobs in maintenance window (2 AM - 4 AM):"
            echo "$maintenance_jobs"
        fi
    fi

    echo
    echo "9. System Information"
    echo "---------------------"
    echo "ATD service status: $(systemctl is-active atd)"
    echo "System load: $(uptime)"
    echo "Available disk space: $(df -h / | tail -1)"

} > "$REPORT_FILE"

# Email report if significant findings
if [ "$total_jobs" -gt 0 ]; then
    mail -s "AT Queue Analysis Report - $(date +%Y-%m-%d)" admin@example.com < "$REPORT_FILE"
fi

echo "Analysis complete. Report saved to $REPORT_FILE"

# Cleanup old analysis files (keep last 30 days)
find "$ANALYSIS_DIR" -name "analysis_*.txt" -mtime +30 -delete
```

## Troubleshooting

### Common Issues

#### Empty Queue Output
```bash
# Check if atd service is running
systemctl status atd

# Start atd service if not running
sudo systemctl start atd
sudo systemctl enable atd

# Check if jobs directory exists and has proper permissions
ls -la /var/spool/cron/atjobs/

# Check permissions
sudo chmod 700 /var/spool/cron/atjobs/
sudo chown daemon:daemon /var/spool/cron/atjobs/
```

#### Permission Issues
```bash
# Check if user has permission to use at
groups $USER | grep -q at || echo "User not in at group"

# Check at.allow and at.deny files
if [ -f /etc/at.allow ]; then
    echo "AT allowed users:"
    cat /etc/at.allow
elif [ -f /etc/at.deny ]; then
    echo "AT denied users:"
    cat /etc/at.deny
else
    echo "All users allowed to use at"
fi

# Test basic at functionality
echo "test job" | at now + 1 minute
atq
```

#### Jobs Not Showing
```bash
# Check at daemon logs
sudo journalctl -u atd -f

# Check system logs for at errors
grep -i at /var/log/syslog | tail -20

# Verify atd is listening on proper port
sudo netstat -lunp | grep atd

# Restart atd service
sudo systemctl restart atd

# Check for corrupted job files
sudo find /var/spool/cron/atjobs/ -type f -exec file {} \;
```

#### Performance Issues
```bash
# Check system load when running atq
/usr/bin/time -v atq

# Monitor atq performance over time
for i in {1..10}; do
    echo "Run $i:"
    /usr/bin/time -f "%e real, %U user, %S sys" atq > /dev/null
    sleep 1
done

# Check for large number of jobs affecting performance
job_count=$(atq | wc -l)
echo "Total jobs: $job_count"
if [ "$job_count" -gt 1000 ]; then
    echo "High job count may be affecting performance"
    echo "Consider cleaning up old jobs"
fi
```

## Best Practices

### Job Queue Management
1. **Monitor queue regularly** to prevent job accumulation
2. **Clean up old or unnecessary jobs** to maintain queue efficiency
3. **Use appropriate queues** for different priority levels
4. **Document job purposes** for easier queue management
5. **Set up alerts** for unusual queue activity

### Performance Optimization
1. **Limit concurrent atq checks** in automated scripts
2. **Use specific queue filters** instead of listing all jobs when possible
3. **Schedule queue monitoring** during off-peak hours
4. **Cache atq output** in scripts when job list doesn't change frequently
5. **Monitor atd service performance** regularly

### Security Considerations
1. **Restrict atq access** using proper file permissions
2. **Monitor who is viewing job queues** for security auditing
3. **Use sudo** when necessary for administrative queue monitoring
4. **Log queue access** for security purposes
5. **Be careful with job information exposure** in shared environments

### Monitoring and Alerting
1. **Set up automated alerts** for high job counts
2. **Monitor queue growth trends** to identify issues early
3. **Track job execution patterns** for optimization
4. **Implement proactive monitoring** for atd service health
5. **Use dashboards** for visual queue monitoring

## Performance Tips

1. **Use queue-specific queries** (`atq -q a`) instead of full listings when possible
2. **Cache results** in scripts when running multiple atq commands
3. **Schedule heavy queue operations** during low system load periods
4. **Use verbose output only when needed** (`-v` flag adds overhead)
5. **Monitor atd service health** to prevent queue issues
6. **Implement proper indexing** if storing atq output in databases
7. **Use parallel processing** when analyzing large job queues
8. **Implement rate limiting** for automated atq queries
9. **Monitor system resources** during queue operations
10. **Use appropriate time intervals** for automated monitoring

## Related Commands

- [`at`](/docs/commands/system-service/at) - Schedule commands for future execution
- [`atrm`](/docs/commands/system-service/atrm) - Remove scheduled at jobs
- [`batch`](/docs/commands/system-service/batch) - Schedule batch jobs for low system load
- [`cron`](/docs/commands/system-service/crontab) - Schedule recurring jobs
- [`systemctl`](/docs/commands/system-service/systemctl) - Control system services
- [`ps`](/docs/commands/system-info/ps) - View running processes
- [`top`](/docs/commands/system-info/top) - Monitor system processes
- [`journalctl`](/docs/commands/user-management/journalctl) - View system logs
- [`watch`](/docs/commands/system-info/watch) - Execute command repeatedly

The `atq` command is an essential tool for monitoring and managing scheduled jobs in Linux systems. Its ability to provide real-time visibility into the job queue, combined with flexible filtering options, makes it invaluable for system administrators managing time-sensitive operations, maintenance schedules, and automated task execution.