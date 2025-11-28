---
title: calsps - Calendar Process Status Viewer
sidebar_label: calsps
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# calsps - Calendar Process Status Viewer

The `calsps` command is a unique system monitoring utility that combines calendar display with process status information, providing temporal context for system monitoring and process management. This innovative tool allows administrators and users to view process information alongside calendar dates, making it ideal for scheduling system maintenance, tracking long-running processes, and correlating system events with specific dates. `calsps` supports various output formats, filtering options, and can generate historical reports of system activity, making it particularly valuable for system administration, performance analysis, and audit trail management.

## Basic Syntax

```bash
calsps [OPTIONS] [CALENDAR_OPTIONS] [PROCESS_SELECTION]
calsps [OPTIONS] [DATE_RANGE] [PROCESS_FILTERS]
```

## Common Options

### Calendar Display Options
- `-1, --one` - Show only current month (default)
- `-3, --three` - Show previous, current, and next month
- `-y, --year` - Display entire year
- `-m, --monday` - Monday as first day of week
- `-s, --sunday` - Sunday as first day of week (default)
- `-j, --julian` - Display Julian days
- `-n, --months N` - Show N months

### Process Selection Options
- `-a, --all` - Show all processes including other users'
- `-u, --user=USER` - Show processes for specific user
- `-p, --pid=PID` - Show specific process ID
- `-C, --command=CMD` - Show processes matching command name
- `-t, --type=TYPE` - Filter by process type (running, sleeping, zombie)
- `-r, --running` - Show only running processes

### Output Format Options
- `-f, --full` - Full format listing
- `-l, --long` - Long format
- `-o, --format=FORMAT` - Custom output format
- `-c, --calendar-first` - Show calendar before process info
- `-p, --process-first` - Show process info before calendar
- `-i, --integrated` - Integrated display (default)

### Time-based Options
- `-d, --date=DATE` - Show processes for specific date
- `-s, --since=DATE` - Show processes since date
| `-u, --until=DATE` - Show processes until date
- `-T, --today` - Focus on today's processes (default)
- `-w, --week` - Show this week's processes

### Historical Options
- `-H, --history` - Show historical process data
- `-L, --log=FILE` - Use specific process log file
- `-R, --report` - Generate report format
- `-A, --archive` - Include archived process data

## Usage Examples

### Basic Calendar and Process Display

#### Default Display
```bash
# Show current month with current processes
calsps

# Show three-month view with running processes
calsps -3 -r

# Show current year with all processes
calsps -y -a
```

#### Combined Calendar and Process Views
```bash
# Show calendar with process information integrated
calsps -i

# Show calendar first, then process list
calsps -c

# Show processes first, then calendar
calsps -p
```

### Process Filtering with Calendar Context

#### User-specific Process Monitoring
```bash
# Show current month with user's processes
calsps -u john

# Show three-month view for specific user
calsps -3 -u admin

# Show yearly view for multiple users
calsps -y -u "john,mary,admin"
```

#### Process Type Filtering
```bash
# Show running processes with calendar context
calsps -r

# Show sleeping processes only
calsps -t sleeping

# Show zombie processes (problematic)
calsps -t zombie

# Show specific process with its start date context
calsps -p 1234
```

#### Command-based Filtering
```bash
# Show web server processes with calendar
calsps -C nginx

# Show database processes with three-month view
calsps -3 -C postgres

# Show multiple service processes
calsps -C "nginx,apache,mysql"
```

### Time-based Process Analysis

#### Daily and Weekly Views
```bash
# Show today's processes with calendar context
calsps -T

# Show this week's processes with weekly calendar
calsps -w -3

# Show processes for specific date
calsps -d 2024-12-25

# Show date range with processes
calsps -s 2024-12-01 -u 2024-12-31
```

#### Historical Process Analysis
```bash
# Show historical process data
calsps -H

# Show last month's processes with calendar
calsps -H -n 1

# Generate yearly process report
calsps -y -H -R
```

### Advanced Process Monitoring

#### Long-running Process Tracking
```bash
# Show processes running longer than 24 hours
calsps --long-running

# Show processes with their start dates
calsps --show-start-dates

# Track process lifespan over calendar
calsps --lifespan-tracking
```

#### Resource-intensive Process Monitoring
```bash
# Show high CPU usage processes with calendar
calsps --high-cpu

# Show high memory usage processes
calsps --high-memory

# Show processes by resource consumption with date context
calsps --by-resource-usage
```

## Practical Examples

### System Administration

#### Daily System Health Check
```bash
# Morning system check with calendar context
calsps -T -f

# Weekly system review with three-month view
calsps -w -3 -H

# Monthly system report
calsps -y -R > monthly_system_report.txt
```

#### Maintenance Scheduling
```bash
# Check running processes before maintenance
calsps -r -3

# Show processes that need restart with calendar for scheduling
calsps --needs-restart -m

# Plan downtime around critical processes
calsps --critical-processes -n 2
```

#### User Activity Monitoring
```bash
# Monitor specific user activity with date context
calsps -u username -y

# Show login processes with calendar
calsps -C "sshd,login" -3

# Track user session durations
calsps --session-tracking -u username
```

### Development and Testing

#### Development Server Monitoring
```bash
# Monitor development servers with calendar
calsps -C "node,python,java" -3

# Show test processes with scheduling context
calsps -C "pytest,junit,mocha" -w

# Track build processes over time
calsps -C "make,gcc,cargo" -H
```

#### Application Deployment Tracking
```bash
# Show deployment processes with calendar context
calsps -C "docker,kubectl,ansible" -m

# Track deployment success/failure rates
calsps --deployment-stats -y

# Monitor rollback processes
calsps -C "rollback" --critical
```

### Performance Analysis

#### CPU Usage Analysis
```bash
# Show CPU-intensive processes with calendar
calsps --high-cpu -3

# Track CPU usage trends over months
calsps --cpu-trends -y

# Identify performance bottlenecks by date
calsps --performance-bottlenecks -H
```

#### Memory Usage Monitoring
```bash
# Show memory-consuming processes with context
calsps --high-memory -m

# Track memory leaks over time
calsps --memory-leak-detection -y

# Show memory usage patterns
calsps --memory-patterns -n 6
```

#### Disk I/O Monitoring
```bash
# Show disk-intensive processes with calendar
calsps --high-disk-io -3

# Track backup processes with scheduling
calsps -C "rsync,tar,backup" -y

# Monitor cron job executions
calsps -C "cron" -w
```

### Security Monitoring

#### Security Process Monitoring
```bash
# Show security-related processes
calsps -C "fail2ban,ufw,selinux" -3

# Monitor authentication processes
calsps -C "sshd,pam,login" -T

# Track suspicious process activity
calsps --suspicious-processes -H
```

#### Audit Trail Management
```bash
# Generate audit report with calendar context
calsps --audit-report -y

# Show privileged process activity
calsps --privileged-processes -m

# Track process execution history
calsps --execution-history -n 3
```

## Advanced Usage

### Custom Output Formats

#### Process Information Customization
```bash
# Custom format with calendar context
calsps -o "pid,user,cmd,start_time,cpu,mem" -3

# Show detailed process information
calsps -f -j --julian

# Compact view for terminals
calsps --compact -1
```

#### Calendar Customization
```bash
# European style calendar with processes
calsps -m -u username

# Julian calendar for scientific applications
calsps -j -H

# ISO week numbers with process stats
calsps --iso -y --weekly-stats
```

### Automation and Scripting

#### Automated System Monitoring Script
```bash
#!/bin/bash
# Daily system monitoring with calsps

DATE=$(date +%Y-%m-%d)
REPORT_DIR="/var/reports/system"

# Create daily report
calsps -T -f -o "pid,user,cmd,cpu,mem,start_time" > "$REPORT_DIR/daily_$DATE.txt"

# Create weekly summary (run on Monday)
if [ $(date +%u) -eq 1 ]; then
    calsps -w -H -R > "$REPORT_DIR/weekly_$DATE.txt"
fi

# Create monthly summary (run on 1st)
if [ $(date +%d) -eq 01 ]; then
    calsps -y -H --monthly-summary > "$REPORT_DIR/monthly_$DATE.txt"
fi

# Alert on critical processes
CRITICAL_COUNT=$(calsps --critical-processes --count-only)
if [ $CRITICAL_COUNT -gt 0 ]; then
    echo "Alert: $CRITICAL_COUNT critical processes running" | mail -s "System Alert" admin@example.com
fi
```

#### Process Scheduling Assistant
```bash
#!/bin/bash
# Intelligent process scheduling with calendar context

# Check current system load
LOAD=$(calsps --system-load --current)

# Suggest maintenance windows based on process activity
if [ $LOAD -lt 2 ]; then
    echo "Low system load detected. Safe for maintenance."
    calsps -T -r --maintenance-friendly
else
    echo "High system load. Consider scheduling maintenance for:"
    calsps --maintenance-windows -n 7
fi

# Show process patterns for better scheduling
calsps --process-patterns -3
```

### Reporting and Analytics

#### Monthly Performance Report
```bash
#!/bin/bash
# Generate comprehensive monthly performance report

MONTH=$(date +%m)
YEAR=$(date +%Y)
REPORT_FILE="performance_report_$MONTH_$YEAR.txt"

echo "=== Monthly Performance Report $MONTH/$YEAR ===" > $REPORT_FILE

# System overview with calendar
calsps -y --monthly-summary $MONTH $YEAR >> $REPORT_FILE

# Top resource consumers
calsps --top-cpu-users --monthly $MONTH $YEAR >> $REPORT_FILE
calsps --top-memory-users --monthly $MONTH $YEAR >> $REPORT_FILE

# Process execution patterns
calsps --execution-patterns --monthly $MONTH $YEAR >> $REPORT_FILE

# Security events
calsps --security-events --monthly $MONTH $YEAR >> $REPORT_FILE

echo "Report generated: $REPORT_FILE"
```

#### Capacity Planning Analysis
```bash
#!/bin/bash
# Capacity planning with historical data

# Yearly resource usage trends
calsps --cpu-trends -y --capacity-analysis > cpu_trends.txt
calsps --memory-trends -y --capacity-analysis > memory_trends.txt

# Process growth patterns
calsps --process-growth -y --forecast > process_forecast.txt

# Peak usage identification
calsps --peak-usage -y --by-month > peak_usage.txt

echo "Capacity planning reports generated successfully."
```

### Integration with System Tools

#### Log Analysis Integration
```bash
# Correlate system logs with process activity
calsps -T -H --correlate-logs /var/log/syslog

# Show error processes with calendar context
calsps --error-processes -3 --log-analysis

# Track crashed processes
calsps --crashed-processes -y --crash-analysis
```

#### Backup and Restore Integration
```bash
# Show backup processes with scheduling context
calsps -C "rsync,tar,backup" -y --backup-schedule

# Monitor restore operations
calsps -C "restore,recovery" -T

# Verify backup completion
calsps --backup-verification -w
```

## Integration and Automation

### Shell Functions and Aliases

#### Custom Monitoring Functions
```bash
# Quick system health check
alias health='calsps -T -f --critical-only'

# Weekly system review
alias weekly='calsps -w -3 -H -R'

# Monthly system report
alias monthly='calsps -y --monthly-summary'

# User activity monitor
function user_monitor() {
    local user=$1
    calsps -u "$user" -n 3 --activity-summary
}

# Process family tree with calendar
function process_tree() {
    local pid=$1
    calsps -p "$pid" --tree-view -3
}
```

#### Alert Functions
```bash
# Process count monitoring
function process_alert() {
    local threshold=$1
    local count=$(calsps --count-only -a)

    if [ $count -gt $threshold ]; then
        calsps -T -f | mail -s "High Process Count Alert" admin@example.com
    fi
}

# Critical process monitor
function critical_monitor() {
    local critical=$(calsps --critical-processes --count-only)
    if [ $critical -gt 0 ]; then
        calsps --critical-processes -3 > /tmp/critical_alert.txt
        mail -s "Critical Process Alert" admin@example.com < /tmp/critical_alert.txt
    fi
}
```

### System Service Integration

#### Systemd Service Monitoring
```bash
# Monitor systemd services with calendar context
calsps -C "systemd" -y --service-status

# Show service restarts with timeline
calsps --service-restarts -3 --timeline

# Track service failures
calsps --service-failures -y --failure-analysis
```

#### Cron Job Integration
```bash
# Monitor cron job executions with calendar
calsps -C "cron" -y --cron-analysis

# Show cron job execution patterns
calsps --cron-patterns -3

# Track missed cron jobs
calsps --missed-cron -w --alert
```

## Troubleshooting

### Common Issues

#### Display Problems
```bash
# Terminal width issues with calendar
# Solution: Use compact view or adjust terminal
calsps --compact -1
export COLUMNS=120; calsps -3

# Calendar showing wrong dates
# Solution: Check system timezone
timedatectl status
calsps --timezone-check

# Process information not updating
# Solution: Refresh process data
calsps --refresh -T
```

#### Performance Issues
```bash
# Slow response with large process lists
# Solution: Use filtering
calsps -r -T  # Running processes only
calsps -u username -T  # Specific user

# High memory usage
# Solution: Limit date range
calsps -T --current-only
calsps -w --minimal-info

# System load during execution
# Solution: Use nice priority
nice -n 19 calsps -y -H
```

#### Data Accuracy Issues
```bash
# Missing historical data
# Solution: Check log availability
calsps --check-logs
calsps -H --log-file /var/log/process.log

# Incorrect process information
# Solution: Update process database
calsps --update-db
calsps --verify-data

# Time synchronization issues
# Solution: Check system time
ntpdate -q pool.ntp.org
calsps --sync-time
```

### Debugging Options

#### Verbose Output
```bash
# Show debugging information
calsps --debug -T

# Show data sources
calsps --show-sources -H

# Trace execution path
calsps --trace --dry-run
```

#### Data Validation
```bash
# Validate calendar data
calsps --validate-calendar

# Validate process data
calsps --validate-processes

# Cross-check with system tools
calsps --cross-check ps aux
calsps --cross-check "ps -ef"
```

## Related Commands

- [`ps`](/docs/commands/system-info/ps) - Process status viewer
- [`cal`](/docs/commands/system-info/cal) - Calendar display utility
- [`top`](/docs/commands/system-info/top) - Dynamic process viewer
- [`htop`](/docs/commands/system-info/htop) - Interactive process viewer
- [`atop`](/docs/commands/system-info/atop) - Advanced system monitor
- [`date`](/docs/commands/system-info/date) - Date display and manipulation
- [`timedatectl`](/docs/commands/system-info/timedatectl) - System time management
- [`journalctl`](/docs/commands/user-management/journalctl) - System log viewer
- [`crontab`](/docs/commands/system-service/crontab) - Cron job scheduler

## Best Practices

1. **Use appropriate date ranges** to avoid overwhelming output
2. **Filter processes** by user or command for focused monitoring
3. **Regular monitoring** with `-T` for daily system health checks
4. **Historical analysis** with `-H` for trend identification and capacity planning
5. **Scheduled reports** using automation scripts for regular system reviews
6. **Integration with monitoring systems** for comprehensive observability
7. **Resource-aware usage** during system load to avoid performance impact
8. **Data validation** when using historical information for critical decisions
9. **Backup important data** before performing maintenance based on calsps output
10. **Documentation** of process patterns and scheduling decisions

## Performance Tips

1. **Use specific filters** rather than showing all processes for better performance
2. **Limit date ranges** with `-n` or specific dates when possible
3. **Cache results** for frequently accessed historical data
4. **Use `--compact` option** for terminals with limited width
5. **Run during off-peak hours** for comprehensive historical analysis
6. **Avoid excessive options** in automated scripts for faster execution
7. **Use appropriate output format** to minimize processing overhead
8. **Consider system load** when choosing between comprehensive vs. focused views
9. **Use parallel processing** options when analyzing large datasets
10. **Regular maintenance** of process logs to ensure optimal query performance

The `calsps` command represents an innovative approach to system monitoring by combining temporal awareness with process management. Its ability to provide calendar context for process information makes it invaluable for long-term system administration, capacity planning, and maintaining comprehensive audit trails. When integrated into regular monitoring workflows and automated systems, calsps becomes an essential tool for modern Linux system administration and DevOps practices.