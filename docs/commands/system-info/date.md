---
title: date - Display or set system date and time
sidebar_label: date
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# date - Display or set system date and time

The `date` command is a fundamental Unix/Linux utility for displaying and setting the system date and time. It supports a wide range of formatting options for custom output, time zone conversions, date arithmetic, and can be used for generating timestamps, scheduling tasks, and scripting operations. The command is highly versatile, supporting both human-readable output and machine-parseable formats, making it essential for logging, backup operations, and system administration tasks.

## Basic Syntax

```bash
date [OPTION]... [+FORMAT]
date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
```

## Common Options

### Display Options
- `-d, --date=STRING` - Display time described by STRING, not 'now'
- `-f, --file=DATEFILE` - Like --date once for each line of DATEFILE
- `-I[TIMESPEC], --iso-8601[=TIMESPEC]` - Output date/time in ISO 8601 format
- `-R, --rfc-2822` - Output RFC-2822 compliant date string
- `--rfc-3339=TIMESPEC` - Output RFC-3339 compliant date string
- `-r, --reference=FILE` - Display the last modification time of FILE
- `-s, --set=STRING` - Set time described by STRING
- `-u, --utc, --universal` - Display or set Coordinated Universal Time
- `--debug` - Annotate the parsed date and warn about questionable usage

### Format Options
- `+FORMAT` - Custom format string (controls output format)

## Format Specifiers

### Date Components
- `%Y` - Year (4-digit)
- `%y` - Year (2-digit, 00-99)
- `%m` - Month (01-12)
- `%B` - Full month name (January-December)
- `%b` - Abbreviated month name (Jan-Dec)
- `%h` - Same as %b
- `%d` - Day of month (01-31)
- `%e` - Day of month, space padded ( 1-31)
- `%j` - Day of year (001-366)
- `%U` - Week of year, Sunday first (00-53)
- `%W` - Week of year, Monday first (00-53)
- `%V` - ISO week number (01-53)
- `%A` - Full weekday name (Sunday-Saturday)
- `%a` - Abbreviated weekday name (Sun-Sat)
- `%u` - Day of week (1-7, Monday=1)
- `%w` - Day of week (0-6, Sunday=0)

### Time Components
- `%H` - Hour (00-23)
- `%k` - Hour, space padded ( 0-23)
- `%I` - Hour (01-12)
- `%l` - Hour, space padded ( 1-12)
- `%M` - Minute (00-59)
- `%S` - Second (00-60)
- `%N` - Nanoseconds (000000000-999999999)
- `%p` - AM/PM
- `%P` - am/pm (lowercase)
- `%r` - 12-hour time (hh:mm:ss AM/PM)
- `%T` - 24-hour time (HH:MM:SS)
- `%X` - Locale's time representation (HH:MM:SS)

### Time Zone Components
- `%Z` - Time zone abbreviation (EST, PST, etc.)
- `%z` - Time zone offset from UTC (+hhmm)
- `%:z` - Time zone offset with colon (+hh:mm)
- `%::z` - Time zone offset with colon and seconds (+hh:mm:ss)

### Special Characters
- `%%` - Literal % character
- `%n` - Newline character
- `%t` - Tab character
- `%s` - Seconds since Unix epoch (1970-01-01 00:00:00 UTC)

## Usage Examples

### Basic Date Operations

#### Current Date and Time
```bash
# Display current date and time (default format)
date

# Display in 24-hour format
date "+%Y-%m-%d %H:%M:%S"

# Display in 12-hour format with AM/PM
date "+%Y-%m-%d %I:%M:%S %p"

# Display only date
date "+%Y-%m-%d"

# Display only time
date "+%H:%M:%S"
```

#### Custom Formatting
```bash
# ISO 8601 format
date -Iseconds

# RFC 2822 format (email standard)
date -R

# Human-readable format
date "+%A, %B %d, %Y"

# Log file format
date "+%Y%m%d_%H%M%S"

# Timestamp for backups
date "+backup_%Y%m%d_%H%M%S"

# File naming format
date "+report_%Y-%m-%d.txt"

# Database timestamp
date "+%Y-%m-%d %H:%M:%S.%3N"
```

### Date Calculations and Conversions

#### Relative Date Operations
```bash
# Yesterday's date
date -d "yesterday"

# Tomorrow's date
date -d "tomorrow"

# Next week
date -d "next week"

# Last month
date -d "last month"

# Next year
date -d "next year"

# Specific number of days ago
date -d "10 days ago"

# Specific number of days in future
date -d "15 days"

# Next Monday
date -d "next monday"

# Last Friday
date -d "last friday"

# 3 months ago
date -d "3 months ago"

# 2 years from now
date -d "2 years"
```

#### Arithmetic Operations
```bash
# Add days to current date
date -d "+5 days"

# Subtract weeks from current date
date -d "-2 weeks"

# Add months
date -d "+3 months"

# Add years and months
date -d "+1 year +2 months"

# Complex date calculation
date -d "+1 month -10 days"

# End of current month
date -d "$(date +%Y-%m-01) +1 month -1 day"

# Beginning of current year
date -d "$(date +%Y-01-01)"

# End of current year
date -d "$(date +%Y-01-01) +1 year -1 day"
```

#### Date Parsing and Conversion
```bash
# Parse specific date string
date -d "2024-12-25"

# Parse relative time
date -d "2024-01-01 +30 days"

# Parse human-readable date
date -d "January 15, 2024"

# Parse time with timezone
date -d "2024-01-01 12:00:00 UTC"

# Convert between date formats
date -d "2024-01-15" "+%B %d, %Y"

# Get day of week for specific date
date -d "2024-07-04" "+%A"

# Get week number for specific date
date -d "2024-07-04" "+%V"
```

### File Operations

#### File Timestamps
```bash
# Get file modification time
date -r "/etc/passwd"

# Get file modification time in custom format
date -r "/var/log/syslog" "+%Y-%m-%d %H:%M:%S"

# Create timestamp for backup files
echo "backup_$(date -r /home/user/documents "+%Y%m%d_%H%M%S").tar.gz"

# Check if file is older than 30 days
file_date=$(date -r "/path/to/file" +%s)
current_date=$(date +%s)
days_old=$(( (current_date - file_date) / 86400 ))
if [ $days_old -gt 30 ]; then
    echo "File is older than 30 days"
fi
```

### Time Zone Operations

#### UTC and Time Zone Conversions
```bash
# Display UTC time
date -u

# Convert local time to UTC
date -u -d "2024-01-15 15:30:00"

# Convert UTC to local time
date -d "2024-01-15 15:30:00 UTC"

# Show time in different timezone
TZ='America/New_York' date
TZ='Europe/London' date
TZ='Asia/Tokyo' date

# Get timezone offset
date "+%z"

# Get timezone name
date "+%Z"
```

## Practical Examples

### System Administration

#### Log Management
```bash
# Rotate logs with timestamp
mv app.log app.log.$(date "+%Y%m%d_%H%M%S")

# Create daily log directories
mkdir -p /var/log/archive/$(date "+%Y/%m/%d")

# Archive logs older than 7 days
find /var/log -name "*.log.*" -mtime +7 -exec gzip {} \;

# Generate log rotation scripts
cat << 'EOF' > /etc/logrotate.d/custom
/path/to/logfile {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    dateext
    dateformat _%Y%m%d
}
EOF
```

#### Backup Operations
```bash
# Create timestamped backup directory
backup_dir="/backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"

# Generate backup filename
backup_file="backup_$(date +%Y-%m-%d_%H-%M-%S).tar.gz"
tar -czf "$backup_file" /path/to/data

# Incremental backup script
#!/bin/bash
source="/home/user"
dest="/backup"
timestamp=$(date +%Y%m%d_%H%M%S)
backup_file="incremental_$timestamp.tar.gz"

# Create backup with date
tar --create --file="$dest/$backup_file" \
    --listed-incremental="$dest/snapshot.snar" \
    "$source"
```

#### System Monitoring
```bash
# Monitor system uptime with timestamp
echo "$(date): System uptime: $(uptime)" >> /var/log/system_monitor.log

# Check disk space usage
df -h | grep -vE '^Filesystem|tmpfs|cdrom' | \
    awk '{print $5 " " $1}' | while read output; do
    echo "$(date): Disk usage: $output" >> /var/log/disk_monitor.log
done

# Memory usage monitoring
free -m | awk 'NR==2{printf "$(date): Memory Usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }' \
    >> /var/log/memory_monitor.log
```

### Development Workflow

#### Build and Deployment
```bash
# Create timestamped build directory
build_dir="build_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$build_dir"

# Generate version string with date
version="1.2.3-$(date +%Y%m%d)"
echo "Building version: $version"

# Create deployment package
package_name="app_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$package_name" dist/

# Update build information
cat > build_info.txt << EOF
Build Date: $(date)
Build Time: $(date +%H:%M:%S)
Unix Timestamp: $(date +%s)
Git Commit: $(git rev-parse HEAD)
EOF
```

#### Version Control
```bash
# Tag releases with date
git tag -a "v$(date +%Y%m%d)" -m "Release $(date +%Y-%m-%d)"

# Create changelog entry
echo "$(date +%Y-%m-%d) - Version $(git describe --tags)" >> CHANGELOG.md

# Generate release notes
cat > release_notes_$(date +%Y%m%d).md << EOF
# Release Notes - $(date +%Y-%m-%d)

## Changes
- $(git log --since="1 month ago" --oneline | head -10)

## Build Information
- Build Date: $(date)
- Build Time: $(date +%H:%M:%S)
- Commit: $(git rev-parse HEAD)
EOF
```

### Scripting and Automation

#### Timestamp Functions
```bash
#!/bin/bash
# Date utility functions

# Get current timestamp
get_timestamp() {
    date "+%Y-%m-%d %H:%M:%S"
}

# Get date in specific format
format_date() {
    local format="$1"
    date "+$format"
}

# Calculate date difference
date_diff() {
    local start_date=$(date -d "$1" +%s)
    local end_date=$(date -d "$2" +%s)
    echo $(( (end_date - start_date) / 86400 ))
}

# Age calculation
calculate_age() {
    local birth_date="$1"
    local current_date=$(date +%s)
    local birth_timestamp=$(date -d "$birth_date" +%s)
    local age=$(( (current_date - birth_timestamp) / 31536000 ))
    echo $age
}
```

#### File Naming and Organization
```bash
# Organize files by date
organize_by_date() {
    local source_dir="$1"
    local dest_dir="$2"

    find "$source_dir" -type f | while read file; do
        file_date=$(date -r "$file" +%Y/%m)
        target_dir="$dest_dir/$file_date"
        mkdir -p "$target_dir"
        cp "$file" "$target_dir/"
    done
}

# Create date-based directory structure
mkdir -p "projects/{$(date +%Y)}/{$(date +%m)}/{$(date +%d)}"

# Generate unique filenames
generate_unique_filename() {
    local base_name="$1"
    local extension="$2"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    echo "${base_name}_${timestamp}.${extension}"
}
```

### Data Analysis and Reporting

#### Date-based Data Processing
```bash
# Filter logs by date range
filter_logs_by_date() {
    local log_file="$1"
    local start_date="$2"
    local end_date="$3"

    while read line; do
        log_date=$(echo "$line" | awk '{print $1, $2, $3}')
        if [[ $(date -d "$log_date" +%s) -ge $(date -d "$start_date" +%s) ]] && \
           [[ $(date -d "$log_date" +%s) -le $(date -d "$end_date" +%s) ]]; then
            echo "$line"
        fi
    done < "$log_file"
}

# Generate daily reports
generate_daily_report() {
    local report_date="$1"
    local output_file="report_${report_date}.txt"

    cat > "$output_file" << EOF
Daily Report - $report_date
Generated: $(date)

System Information:
- Uptime: $(uptime)
- Load Average: $(cat /proc/loadavg)
- Memory Usage: $(free -h | grep Mem)
- Disk Usage: $(df -h | grep -vE '^Filesystem|tmpfs')

Recent Logs:
$(tail -20 /var/log/syslog | grep "$report_date")
EOF
}

# Calculate statistics over time period
calculate_statistics() {
    local start_date="$1"
    local end_date="$2"

    echo "Statistics from $start_date to $end_date"
    echo "========================================"

    # Count log entries per day
    while IFS= read -r date; do
        count=$(grep "$date" /var/log/syslog | wc -l)
        echo "$date: $count entries"
    done < <(
        date -d "$start_date" "+%Y-%m-%d"
        while [[ $(date -d "$date" +%Y%m%d) -le $(date -d "$end_date" +%Y%m%d) ]]; do
            date=$(date -d "$date +1 day" "+%Y-%m-%d")
            echo "$date"
        done
    )
}
```

## Advanced Usage

### Time Calculations

#### Epoch Time Operations
```bash
# Current Unix timestamp
date +%s

# Convert timestamp to human readable
date -d @1703980800

# Convert human readable to timestamp
date -d "2024-01-01 00:00:00" +%s

# Calculate seconds between two dates
start_ts=$(date -d "2024-01-01" +%s)
end_ts=$(date +%s)
diff_seconds=$((end_ts - start_ts))

# Convert seconds to days, hours, minutes
days=$((diff_seconds / 86400))
hours=$(((diff_seconds % 86400) / 3600))
minutes=$(((diff_seconds % 3600) / 60))
echo "$diff_seconds seconds = $days days, $hours hours, $minutes minutes"
```

#### Date Validation and Conversion
```bash
# Validate date format
validate_date() {
    local date_string="$1"
    if date -d "$date_string" >/dev/null 2>&1; then
        echo "Valid date: $date_string"
        return 0
    else
        echo "Invalid date: $date_string"
        return 1
    fi
}

# Convert between date formats
convert_date_format() {
    local input_date="$1"
    local input_format="$2"
    local output_format="$3"

    date -d "$(date -d "$input_date" "+$input_format")" "+$output_format"
}

# Get last day of month
get_last_day_of_month() {
    local year_month="$1"  # Format: YYYY-MM
    date -d "$year_month/01 +1 month -1 day" +%d
}

# Get first day of month
get_first_day_of_month() {
    local year_month="$1"  # Format: YYYY-MM
    date -d "$year_month/01" +%u  # Day of week (1-7)
}
```

## Integration and Automation

### System Administration Scripts

#### Automated Backup with Rotation
```bash
#!/bin/bash
# Automated backup script with date-based rotation

BACKUP_DIR="/backups"
SOURCE_DIR="/home/user"
RETENTION_DAYS=30
MAX_BACKUPS=10

# Create timestamped backup
create_backup() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_name="backup_$timestamp.tar.gz"
    local backup_path="$BACKUP_DIR/$backup_name"

    echo "Creating backup: $backup_name"
    tar -czf "$backup_path" "$SOURCE_DIR"

    # Test backup integrity
    if tar -tzf "$backup_path" >/dev/null; then
        echo "Backup created successfully"
        echo "$backup_path" >> "$BACKUP_DIR/backup_list.txt"
    else
        echo "Backup creation failed!"
        rm -f "$backup_path"
        return 1
    fi
}

# Clean old backups
cleanup_old_backups() {
    echo "Cleaning backups older than $RETENTION_DAYS days"
    find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete

    # Keep only most recent backups
    cd "$BACKUP_DIR"
    ls -t backup_*.tar.gz | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm
}

# Generate backup report
generate_report() {
    local report_file="$BACKUP_DIR/backup_report_$(date +%Y%m%d).txt"

    cat > "$report_file" << EOF
Backup Report - $(date +%Y-%m-%d %H:%M:%S)
========================================

Latest Backups:
$(ls -lt "$BACKUP_DIR"/backup_*.tar.gz | head -10)

Backup Statistics:
- Total Backups: $(ls -1 "$BACKUP_DIR"/backup_*.tar.gz | wc -l)
- Total Size: $(du -sh "$BACKUP_DIR"/backup_*.tar.gz | cut -f1)
- Oldest Backup: $(ls -lt "$BACKUP_DIR"/backup_*.tar.gz | tail -1 | awk '{print $6, $7, $8}')
EOF
}

# Main execution
create_backup
cleanup_old_backups
generate_report
```

#### Log Analysis Script
```bash
#!/bin/bash
# Log analysis script with date filtering

LOG_FILE="/var/log/apache2/access.log"
REPORT_DIR="/var/log/reports"
date_range_today=$(date +%Y-%m-%d)

# Analyze logs for specific date
analyze_logs() {
    local target_date="$1"
    local report_file="$REPORT_DIR/analysis_$target_date.txt"

    mkdir -p "$REPORT_DIR"

    cat > "$report_file" << EOF
Log Analysis Report - $target_date
Generated: $(date)
========================================

Total Requests: $(grep "$target_date" "$LOG_FILE" | wc -l)

Top IP Addresses:
$(grep "$target_date" "$LOG_FILE" | awk '{print $1}' | sort | uniq -c | sort -nr | head -10)

Top Pages:
$(grep "$target_date" "$LOG_FILE" | awk '{print $7}' | sort | uniq -c | sort -nr | head -10)

HTTP Status Codes:
$(grep "$target_date" "$LOG_FILE" | awk '{print $9}' | sort | uniq -c | sort -nr)

Hourly Distribution:
EOF

    # Add hourly distribution
    for hour in {00..23}; do
        count=$(grep "$target_date" "$LOG_FILE" | grep ":$hour:" | wc -l)
        echo "$hour:00 - $count requests" >> "$report_file"
    done
}

# Generate reports for last 7 days
for i in {6..0}; do
    target_date=$(date -d "$i days ago" +%Y-%m-%d)
    analyze_logs "$target_date"
done

echo "Log analysis reports generated in $REPORT_DIR"
```

## Troubleshooting

### Common Issues

#### Date Format Problems
```bash
# Issue: Invalid date format
date -d "2024/13/01"  # Invalid month
# Solution: Use valid date format
date -d "2024-01-13"

# Issue: Timezone problems
date
TZ=UTC date
# Solution: Set timezone explicitly
export TZ="America/New_York"
date

# Issue: Locale affecting month names
LC_TIME=C date "+%B %d, %Y"  # English
LC_TIME=es_ES.UTF-8 date "+%B %d, %Y"  # Spanish
```

#### Permission Issues
```bash
# Setting system time requires root privileges
sudo date -s "2024-01-01 12:00:00"

# Check if time setting succeeded
if [ $? -eq 0 ]; then
    echo "System time updated successfully"
else
    echo "Failed to update system time"
fi
```

#### Scripting Issues
```bash
# Issue: Date variables with spaces
timestamp=$(date "+%Y-%m-%d %H:%M:%S")  # Don't forget quotes!
echo "Timestamp: $timestamp"

# Issue: Arithmetic with dates
# Correct way to calculate date difference
start_ts=$(date -d "2024-01-01" +%s)
end_ts=$(date +%s)
diff_days=$(( (end_ts - start_ts) / 86400 ))
echo "Days since 2024-01-01: $diff_days"
```

## Related Commands

- [`cal`](/docs/commands/system-info/cal) - Display calendar
- [`timedatectl`](/docs/commands/system-info/timedatectl) - System time and date management
- [`hwclock`](/docs/commands/system-info/hwclock) - Hardware clock management
- [`uptime`](/docs/commands/system-info/uptime) - System uptime
- [`touch`](/docs/commands/file-management/touch) - Change file timestamps
- [`find`](/docs/commands/file-management/find) - Find files with date criteria
- [`stat`](/docs/commands/file-management/stat) - Display file status including timestamps

## Best Practices

1. **Use ISO 8601 format** (`%Y-%m-%d %H:%M:%S`) for consistent date handling
2. **Quote format strings** to prevent shell interpretation issues
3. **Validate input dates** before processing in scripts
4. **Use UTC** for logging and storage to avoid timezone confusion
5. **Include timezone information** when storing dates for international use
6. **Test date calculations** with edge cases (leap years, month boundaries)
7. **Use consistent naming conventions** for timestamped files
8. **Handle permission requirements** when setting system time
9. **Consider daylight saving time changes** in date calculations
10. **Use descriptive format strings** for human-readable output

## Performance Tips

1. **Cache date values** when using repeatedly in loops
2. **Avoid complex date calculations** in performance-critical code
3. **Use Unix timestamps** for efficient date arithmetic
4. **Minimize timezone conversions** in batch operations
5. **Use efficient date parsing** for log file processing
6. **Prefer built-in date functions** over external tools when possible
7. **Optimize file timestamp operations** with find's date predicates
8. **Use parallel processing** for large-scale date calculations
9. **Profile date-heavy scripts** to identify bottlenecks
10. **Consider using TZ environment variable** for consistent timezone handling

The `date` command is an essential utility for time-related operations in Linux systems. Its extensive formatting options, calculation capabilities, and integration features make it indispensable for system administration, scripting, and automation tasks.