---
title: df - Display Free Disk Space
sidebar_label: df
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# df - Display Free Disk Space

The `df` (disk free) command displays the amount of available and used disk space on file systems. It shows information about total disk space, used space, free space, and usage percentage for mounted file systems. The `df` command is a fundamental system administration tool that provides file system-level disk usage statistics, making it essential for monitoring storage resources, identifying potential disk space issues, and maintaining system health. Unlike `du` which shows directory-level usage, `df` operates at the file system level, showing partition and mount point information.

## Basic Syntax

```bash
df [OPTIONS] [FILE]...
```

## Common Options

### Output Format Options
- `-h, --human-readable` - Print sizes in human readable format (K, M, G, T)
- `-H, --si` - Use powers of 1000 instead of 1024 (SI units)
- `-k` - Display sizes in kilobytes (1024-byte blocks, default)
- `-m` - Display sizes in megabytes (1024^2 blocks)
- `--block-size=SIZE` - Use SIZE-byte blocks (e.g., 1M, 1G, 1T)

### File System Selection
- `-a, --all` - Include dummy file systems (tmpfs, proc, sysfs, etc.)
- `-l, --local` - Limit listing to local file systems only
- `-t, --type=TYPE` - Limit listing to specific file system type
- `-x, --exclude-type=TYPE` - Exclude specific file system type

### Display Information
- `-i, --inodes` - List inode information instead of block usage
- `-T, --print-type` - Print file system type in output
- `--total` - Display a grand total for all listed file systems
- `--output[=FIELD_LIST]` - Use custom output format with specified fields

### Special Options
- `-P, --portability` - Use POSIX output format for portability
- `--sync` - Invoke sync before getting usage info (ensures accuracy)
- `--no-sync` - Do not invoke sync (default, faster but potentially less accurate)

### Output Fields for --output
- `source` - File system source device
- `fstype` - File system type
- `itotal` - Total number of inodes
- `iused` - Number of used inodes
- `iavail` - Number of available inodes
- `ipcent` - Percentage of inodes used
- `size` - Total file system size
- `used` - Used space
- `avail` - Available space
- `pcent` - Percentage of space used
- `file` - File name if specified
- `target` - Mount point

## Usage Examples

### Basic Usage

#### Simple Disk Space Checks
```bash
# Display disk usage for all mounted file systems
df

# Display in human readable format (recommended for daily use)
df -h

# Display specific file system or directory
df /home

# Display multiple specific paths
df /home /var /tmp /usr

# Use SI units (base 10 instead of base 2)
df -H

# Display sizes in megabytes
df -m
```

#### Quick System Overview
```bash
# Human-readable overview with file system types
df -hT

# Check only local file systems (excludes NFS, SMB, etc.)
df -hl

# Show everything including virtual file systems
df -ah

# Display total summary
df --total -h
```

### File System Type Filtering

#### Include Specific Types
```bash
# Show only ext4 file systems
df -t ext4

# Show only XFS file systems
df -t xfs

# Show multiple specific types
df -t ext4 -t xfs -t btrfs

# Show only network file systems
df -t nfs -t cifs -t smbfs

# Show only virtual file systems
df -t tmpfs -t devtmpfs -t proc -t sysfs
```

#### Exclude Specific Types
```bash
# Exclude temporary file systems
df -h -x tmpfs -x devtmpfs

# Exclude network file systems for local view
df -h -x nfs -x cifs -x smbfs

# Exclude virtual file systems
df -h -x proc -x sysfs -x devtmpfs

# Multiple exclusions for clean output
df -h -x tmpfs -x devtmpfs -x proc -x sysfs
```

### Inode Usage Monitoring

#### Basic Inode Information
```bash
# Show inode usage instead of disk space
df -i

# Human-readable inode usage with types
df -ihT

# Check specific directory inode usage
df -i /home

# Show inode usage for specific types
df -i -t ext4
```

#### Inode Analysis
```bash
# Compare disk space and inode usage
echo "Disk Space Usage:"; df -h
echo "Inode Usage:"; df -i

# Find file systems with inode exhaustion risk
df -i | awk '$5+0 > 90 {print "Inode warning: " $1 " on " $6 " is " $5 " full"}'

# Monitor both space and inodes
df -hi | grep -E "^(/dev|Filesystem)"
```

### Custom Output Formatting

#### Specific Field Selection
```bash
# Show only essential information
df --output=source,size,used,avail,pcent,target

# Custom format with file system type
df --output=source,fstype,target,pcent,size

# Compact format for scripts
df --output=target,pcent | tail -n +2

# Show all available fields
df --output=source,fstype,size,used,avail,pcent,itotal,iused,ipcent,target
```

#### Scripting and Automation Formats
```bash
# Machine-readable output for monitoring
df --output=source,target,pcent,size,used,avail --portability

# JSON-like structured output (custom function)
df_to_json() {
    echo "{"
    df --output=source,fstype,size,used,avail,pcent,target --no-header | while read line; do
        # Convert df output to JSON format
        echo "  \"$source\": {"
        echo "    \"type\": \"$fstype\","
        echo "    \"size\": \"$size\","
        echo "    \"used\": \"$used\","
        echo "    \"available\": \"$avail\","
        echo "    \"percent_used\": \"$pcent\","
        echo "    \"mountpoint\": \"$target\""
        echo "  },"
    done
    echo "}"
}
```

### Advanced Filtering and Analysis

#### Usage Threshold Analysis
```bash
# Find file systems over 80% full
df -h | awk 'NR>1 && $5+0 > 80 {printf "%-30s %5s used on %-15s\n", $1, $5, $6}'

# Critical disk space alert
df -h | awk 'NR>1 && $5+0 > 95 {print "CRITICAL: " $1 " on " $6 " is " $5 " full"}'

# Comprehensive disk space report
df -h | awk 'NR>1 {
    usage = substr($5, 1, length($5)-1);
    if (usage > 90) level = "CRITICAL";
    else if (usage > 80) level = "WARNING";
    else if (usage > 70) level = "CAUTION";
    else level = "OK";
    printf "%-8s %-15s %-8s %-20s\n", level, $1, $5, $6;
}'
```

#### Comparative Analysis
```bash
# Compare disk space and inode usage
echo "File System Analysis:"
df -h | while read filesystem size used avail use mount; do
    if [[ "$filesystem" == Filesystem* ]]; then
        printf "%-20s %-8s %-8s %-8s\n" "FILESYSTEM" "SPACE%" "INODE%" "MOUNTPOINT"
    else
        space_pct=$(df -h "$mount" | tail -1 | awk '{print $5}')
        inode_pct=$(df -i "$mount" | tail -1 | awk '{print $5}')
        printf "%-20s %-8s %-8s %-8s\n" "$filesystem" "$space_pct" "$inode_pct" "$mount"
    fi
done

# Disk space growth monitoring
current_usage=$(df --output=used / | tail -1)
previous_usage=$(cat /tmp/df_previous.txt 2>/dev/null || echo "0")
if [[ "$current_usage" -gt "$previous_usage" ]]; then
    echo "Disk usage increased by $((current_usage - previous_usage)) blocks"
fi
echo "$current_usage" > /tmp/df_previous.txt
```

### Performance and Optimization

#### Fast Local Monitoring
```bash
# Quick local file system check (excludes network mounts)
df -hl

# Only real file systems (no virtual or special file systems)
df -h --type=ext4 --type=xfs --type=btrfs

# Minimal output for fast checking
df -h --output=target,pcent | grep -v '^Use%' | sort
```

#### Synchronized Accurate Reporting
```bash
# Force sync for accurate current usage (slower but precise)
df --sync -h

# Sync only for specific critical file systems
sync && df -h /var /home /tmp

# Non-blocking accurate reporting
df --no-sync -h  # Default, faster
```

## Practical Examples

### System Administration

#### Daily Disk Space Monitoring
```bash
#!/bin/bash
# daily_disk_check.sh - Comprehensive daily disk space monitoring

LOG_FILE="/var/log/disk_monitoring.log"
EMAIL_TO="admin@company.com"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Function to send email alert
send_alert() {
    local message="$1"
    echo "$message" | mail -s "Disk Space Alert - $HOSTNAME" "$EMAIL_TO"
}

# Log the current date
echo "=== Disk Space Report for $DATE ===" >> "$LOG_FILE"

# Check all file systems
echo "Overall Disk Usage:" >> "$LOG_FILE"
df -h >> "$LOG_FILE"

# Check for critical issues (over 95%)
echo -e "\nCritical Issues:" >> "$LOG_FILE"
critical_issues=$(df -h | awk 'NR>1 && $5+0 > 95 {print $1 " on " $6 " is " $5 " full"}')
if [[ -n "$critical_issues" ]]; then
    echo "$critical_issues" >> "$LOG_FILE"
    send_alert "Critical disk space issues detected:\n$critical_issues"
fi

# Check for warnings (over 80%)
echo -e "\nWarnings:" >> "$LOG_FILE"
warnings=$(df -h | awk 'NR>1 && $5+0 > 80 && $5+0 <= 95 {print $1 " on " $6 " is " $5 " full"}')
if [[ -n "$warnings" ]]; then
    echo "$warnings" >> "$LOG_FILE"
fi

# Check inode usage
echo -e "\nInode Usage:" >> "$LOG_FILE"
df -i >> "$LOG_FILE"

# Check for inode exhaustion (over 90%)
inode_issues=$(df -i | awk 'NR>1 && $5+0 > 90 {print $1 " on " $6 " is " $5 " full of inodes"}')
if [[ -n "$inode_issues" ]]; then
    echo "Inode Issues:" >> "$LOG_FILE"
    echo "$inode_issues" >> "$LOG_FILE"
    send_alert "Inode exhaustion warning:\n$inode_issues"
fi

echo "Report completed at $(date)" >> "$LOG_FILE"
echo "================================" >> "$LOG_FILE"
```

#### Automated Cleanup Based on Usage
```bash
#!/bin/bash
# cleanup_based_on_usage.sh - Perform cleanup based on disk usage

THRESHOLD=85
LOG_FILE="/var/log/cleanup.log"

# Function to log actions
log_action() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Check disk usage and perform cleanup
check_and_cleanup() {
    local mountpoint="$1"
    local usage=$(df "$mountpoint" | tail -1 | awk '{print $5}' | sed 's/%//')

    if [[ "$usage" -gt "$THRESHOLD" ]]; then
        log_action "Disk usage on $mountpoint is ${usage}%, initiating cleanup"

        case "$mountpoint" in
            "/var")
                log_action "Cleaning /var/log directory"
                find /var/log -type f -name "*.log.*" -mtime +30 -delete
                find /var/log -type f -name "*.log" -size +100M -exec truncate -s 50M {} \;
                ;;
            "/tmp")
                log_action "Cleaning /tmp directory"
                find /tmp -type f -atime +7 -delete
                find /tmp -type d -empty -delete
                ;;
            "/home")
                log_action "Cleaning user cache directories"
                find /home -name ".cache" -type d -exec find {} -type f -atime +30 -delete \;
                ;;
        esac

        # Check if cleanup helped
        local new_usage=$(df "$mountpoint" | tail -1 | awk '{print $5}' | sed 's/%//')
        log_action "Usage after cleanup: ${new_usage}%"
    fi
}

# Check critical mount points
for mountpoint in / /var /tmp /home /usr; do
    if [[ -d "$mountpoint" ]]; then
        check_and_cleanup "$mountpoint"
    fi
done
```

### Web Server Administration

#### Web Server Disk Space Management
```bash
#!/bin/bash
# web_server_disk_check.sh - Specialized for web servers

WEB_ROOT="/var/www"
LOG_DIR="/var/log/nginx"
CACHE_DIR="/var/cache/nginx"

# Check web server specific directories
echo "Web Server Disk Space Analysis"

# Check web root
if [[ -d "$WEB_ROOT" ]]; then
    echo "Web root usage:"
    df -h "$WEB_ROOT"

    # Find large files in web root
    echo "Large files in web root (>100MB):"
    find "$WEB_ROOT" -type f -size +100M -exec ls -lh {} \; 2>/dev/null | head -10
fi

# Check log directory
if [[ -d "$LOG_DIR" ]]; then
    echo "Log directory usage:"
    du -sh "$LOG_DIR"/*

    # Old log files
    echo "Log files older than 30 days:"
    find "$LOG_DIR" -name "*.log.*" -mtime +30 -ls | head -10
fi

# Check cache directory
if [[ -d "$CACHE_DIR" ]]; then
    echo "Cache directory size:"
    du -sh "$CACHE_DIR"
fi

# Overall system check
echo "System-wide disk usage:"
df -h | grep -E "(/$|/var|/home|/tmp)"
```

#### Database Server Monitoring
```bash
#!/bin/bash
# db_server_disk_monitor.sh - Database server specific monitoring

DB_DATA="/var/lib/mysql"
DB_LOGS="/var/log/mysql"

# Check database directories
echo "Database Server Disk Space Report"

if [[ -d "$DB_DATA" ]]; then
    echo "Database data directory usage:"
    df -h "$DB_DATA"

    # Check for large databases
    echo "Database sizes:"
    du -sh "$DB_DATA"/* 2>/dev/null | sort -hr | head -10
fi

if [[ -d "$DB_LOGS" ]]; then
    echo "Database log directory usage:"
    du -sh "$DB_LOGS"

    # Binary log files
    echo "Binary log files:"
    ls -lh "$DB_LOGS"/mysql-bin.* 2>/dev/null | head -10
fi

# Check for disk space that could affect database performance
echo "Disk space analysis for database performance:"
for mount in / /var /tmp; do
    usage=$(df "$mount" | tail -1 | awk '{print $5}' | sed 's/%//')
    if [[ "$usage" -gt 80 ]]; then
        echo "WARNING: $mount is ${usage}% full - may impact database performance"
    fi
done
```

### Development Environment

#### Developer Workspace Monitoring
```bash
#!/bin/bash
# dev_workspace_monitor.sh - Monitor development workspace

PROJECT_ROOT="$HOME/projects"
BUILD_DIR="$HOME/build"
CACHE_DIR="$HOME/.cache"

# Function to check and report directory usage
check_directory() {
    local dir="$1"
    local description="$2"

    if [[ -d "$dir" ]]; then
        local size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "$description: $size"

        # Find large items in directory
        echo "Large items in $description:"
        find "$dir" -maxdepth 1 -type d -exec du -sh {} \; 2>/dev/null | sort -hr | head -5
    fi
}

echo "Development Workspace Disk Usage Report"

# Check project directories
if [[ -d "$PROJECT_ROOT" ]]; then
    echo "Project directories:"
    du -sh "$PROJECT_ROOT"/* 2>/dev/null | sort -hr | head -10
fi

# Check build directories
check_directory "$BUILD_DIR" "Build directory"

# Check cache directories
check_directory "$CACHE_DIR" "Cache directory"

# Check node_modules in projects (common space hog)
echo "Node modules usage:"
find "$PROJECT_ROOT" -name "node_modules" -type d -exec du -sh {} \; 2>/dev/null | head -10

# Overall disk status
echo "System disk status:"
df -h | grep -E "^/dev/"
```

### Container and Virtualization

#### Docker Disk Space Monitoring
```bash
#!/bin/bash
# docker_disk_monitor.sh - Monitor Docker disk usage

echo "Docker Disk Space Analysis"

# Check Docker directory usage
DOCKER_DIR="/var/lib/docker"
if [[ -d "$DOCKER_DIR" ]]; then
    echo "Docker directory breakdown:"
    du -sh "$DOCKER_DIR"/* 2>/dev/null | sort -hr

    # Check containers
    echo "Container sizes:"
    docker ps -as --format "table {{.Names}}\t{{.Size}}"

    # Check images
    echo "Image sizes:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | head -20

    # Check volumes
    echo "Volume sizes:"
    docker system df --format "table {{.Type}}\t{{.TotalCount}}\t{{.Size}}"
fi

# Check available space for Docker operations
echo "Disk space available for Docker:"
df -h "$DOCKER_DIR" 2>/dev/null || df -h /var
```

## Advanced Usage

### Network File System Monitoring

#### NFS Performance Monitoring
```bash
#!/bin/bash
# nfs_monitor.sh - Monitor NFS mount performance

echo "NFS File System Monitoring"

# Check only NFS mounts
echo "NFS mount points:"
df -h -t nfs

# Check NFS mount response times
for mount in $(df -t nfs --output=target | tail -n +2); do
    if [[ -d "$mount" ]]; then
        echo "Testing $mount:"
        time ls "$mount" >/dev/null 2>&1
    fi
done

# Check for stale NFS handles
echo "Checking for stale NFS handles:"
for mount in $(df -t nfs --output=target | tail -n +2); do
    if timeout 5 ls "$mount" >/dev/null 2>&1; then
        echo "$mount: OK"
    else
        echo "$mount: STALE or UNRESPONSIVE"
    fi
done
```

#### Multi-server Disk Space Summary
```bash
#!/bin/bash
# multi_server_df.sh - Check disk space on multiple servers

SERVERS=("server1" "server2" "server3" "db1" "web1")
THRESHOLD=85

echo "Multi-Server Disk Space Summary"
echo "================================"

for server in "${SERVERS[@]}"; do
    echo "Checking $server:"
    if ssh "$server" "df -h" >/dev/null 2>&1; then
        # Get disk usage and check for high usage
        ssh "$server" "df -h" | awk -v threshold=$THRESHOLD -v server="$server" '
        NR>1 {
            usage = substr($5, 1, length($5)-1);
            if (usage > threshold) {
                printf "  CRITICAL: %s on %s is %s used (mounted on %s)\n", $1, server, $5, $6;
            } else if (usage > threshold - 10) {
                printf "  WARNING:  %s on %s is %s used (mounted on %s)\n", $1, server, $5, $6;
            } else {
                printf "  OK:       %s on %s is %s used (mounted on %s)\n", $1, server, $5, $6;
            }
        }'
    else
        echo "  ERROR: Cannot connect to $server"
    fi
    echo ""
done
```

### Historical Trend Analysis

#### Disk Space Trend Tracking
```bash
#!/bin/bash
# disk_trend_tracker.sh - Track disk space usage over time

DATA_FILE="/var/log/disk_trends.csv"
RETENTION_DAYS=365

# Create CSV header if file doesn't exist
if [[ ! -f "$DATA_FILE" ]]; then
    echo "Date,Filesystem,Size,Used,Available,Usage%,MountPoint" > "$DATA_FILE"
fi

# Current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Collect current disk usage data
df -h --output=source,size,used,avail,pcent,target | tail -n +2 | while read line; do
    # Parse df output
    source=$(echo "$line" | awk '{print $1}')
    size=$(echo "$line" | awk '{print $2}')
    used=$(echo "$line" | awk '{print $3}')
    avail=$(echo "$line" | awk '{print $4}')
    usage=$(echo "$line" | awk '{print $5}')
    mount=$(echo "$line" | awk '{print $6}')

    # Write to CSV
    echo "$TIMESTAMP,$source,$size,$used,$avail,$usage,$mount" >> "$DATA_FILE"
done

# Clean old data
if [[ -f "$DATA_FILE" ]]; then
    # Keep only recent entries (simplified - in practice, you'd want more sophisticated date handling)
    tail -n $((RETENTION_DAYS * 24)) "$DATA_FILE" > "${DATA_FILE}.tmp" && mv "${DATA_FILE}.tmp" "$DATA_FILE"
fi

# Generate daily summary
DAILY_SUMMARY="/var/log/disk_daily_summary.log"
echo "Daily Disk Space Summary - $(date)" > "$DAILY_SUMMARY"
df -h >> "$DAILY_SUMMARY"

echo "Disk trend data collected at $TIMESTAMP"
```

### Real-time Monitoring

#### Continuous Disk Space Monitor
```bash
#!/bin/bash
# realtime_disk_monitor.sh - Real-time disk space monitoring

THRESHOLD_WARNING=80
THRESHOLD_CRITICAL=95
CHECK_INTERVAL=60  # seconds

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Function to check disk space
check_disk_space() {
    local alerts_found=false

    while read -r filesystem size used avail percent mountpoint; do
        # Skip header line
        if [[ "$filesystem" == "Filesystem" ]]; then
            continue
        fi

        # Extract numeric percentage
        usage_percent=$(echo "$percent" | sed 's/%//')

        # Check thresholds
        if [[ "$usage_percent" -gt "$THRESHOLD_CRITICAL" ]]; then
            log_message "CRITICAL: $filesystem on $mountpoint is ${usage_percent}% full (${used} used of ${size})"
            alerts_found=true
        elif [[ "$usage_percent" -gt "$THRESHOLD_WARNING" ]]; then
            log_message "WARNING: $filesystem on $mountpoint is ${usage_percent}% full (${used} used of ${size})"
            alerts_found=true
        fi
    done < <(df -h | tail -n +2)

    if [[ "$alerts_found" == false ]]; then
        log_message "All file systems within normal limits"
    fi
}

log_message "Starting real-time disk space monitoring (interval: ${CHECK_INTERVAL}s)"

# Main monitoring loop
while true; do
    check_disk_space
    sleep "$CHECK_INTERVAL"
done
```

## Integration and Automation

### System Monitoring Integration

#### Nagios/Icinga Plugin
```bash
#!/bin/bash
# check_disk_space.sh - Nagios/Icinga plugin for disk space monitoring

WARNING_THRESHOLD=80
CRITICAL_THRESHOLD=90
EXCLUDE_TYPES="tmpfs,devtmpfs,proc,sysfs"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -w|--warning)
            WARNING_THRESHOLD="$2"
            shift 2
            ;;
        -c|--critical)
            CRITICAL_THRESHOLD="$2"
            shift 2
            ;;
        -e|--exclude)
            EXCLUDE_TYPES="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 3
            ;;
    esac
done

# Check thresholds
if [[ "$WARNING_THRESHOLD" -ge "$CRITICAL_THRESHOLD" ]]; then
    echo "UNKNOWN: Warning threshold ($WARNING_THRESHOLD) must be less than critical threshold ($CRITICAL_THRESHOLD)"
    exit 3
fi

# Function to check a single file system
check_filesystem() {
    local usage_percent="$1"
    local filesystem="$2"
    local mountpoint="$3"

    if [[ "$usage_percent" -ge "$CRITICAL_THRESHOLD" ]]; then
        echo "CRITICAL: $filesystem on $mountpoint is ${usage_percent}% full"
        return 2
    elif [[ "$usage_percent" -ge "$WARNING_THRESHOLD" ]]; then
        echo "WARNING: $filesystem on $mountpoint is ${usage_percent}% full"
        return 1
    else
        echo "OK: $filesystem on $mountpoint is ${usage_percent}% full"
        return 0
    fi
}

# Main check
exit_code=0
output_lines=()

# Build exclude options for df
exclude_opts=""
IFS=',' read -ra EXCLUDED_TYPES <<< "$EXCLUDE_TYPES"
for type in "${EXCLUDED_TYPES[@]}"; do
    exclude_opts="$exclude_opts -x $type"
done

# Check file systems
while read -r filesystem size used avail percent mountpoint; do
    # Skip header
    if [[ "$filesystem" == "Filesystem" ]]; then
        continue
    fi

    usage_percent=$(echo "$percent" | sed 's/%//')
    result=$(check_filesystem "$usage_percent" "$filesystem" "$mountpoint")
    output_lines+=("$result")

    # Use highest exit code
    check_exit_code=$?
    if [[ "$check_exit_code" -gt "$exit_code" ]]; then
        exit_code="$check_exit_code"
    fi
done < <(df -h $exclude_opts | tail -n +2)

# Output results
IFS=$'\n'
echo "${output_lines[*]}"
exit "$exit_code"
```

#### Prometheus Metrics Exporter
```bash
#!/bin/bash
# disk_space_prometheus.sh - Export disk space metrics in Prometheus format

METRIC_FILE="/tmp/disk_space.prom"
TEMP_FILE="/tmp/disk_space.tmp"

# Generate Prometheus metrics
echo "# HELP disk_space_bytes Total disk space in bytes" > "$TEMP_FILE"
echo "# TYPE disk_space_bytes gauge" >> "$TEMP_FILE"
echo "# HELP disk_space_used_bytes Used disk space in bytes" >> "$TEMP_FILE"
echo "# TYPE disk_space_used_bytes gauge" >> "$TEMP_FILE"
echo "# HELP disk_space_available_bytes Available disk space in bytes" >> "$TEMP_FILE"
echo "# TYPE disk_space_available_bytes gauge" >> "$TEMP_FILE"
echo "# HELP disk_space_usage_percent Disk space usage percentage" >> "$TEMP_FILE"
echo "# TYPE disk_space_usage_percent gauge" >> "$TEMP_FILE"

# Convert human readable sizes to bytes
convert_to_bytes() {
    local size="$1"
    local number="${size%[A-Za-z]}"
    local unit="${size#$number}"

    case "$unit" in
        K|k) echo "$((${number%.*} * 1024))" ;;
        M|m) echo "$((${number%.*} * 1024 * 1024))" ;;
        G|g) echo "$((${number%.*} * 1024 * 1024 * 1024))" ;;
        T|t) echo "$((${number%.*} * 1024 * 1024 * 1024 * 1024))" ;;
        *) echo "$number" ;;
    esac
}

# Get disk space data in 1K blocks (more precise)
df --output=source,size,used,avail,pcent,target --block-size=1K | tail -n +2 | while read line; do
    source=$(echo "$line" | awk '{print $1}')
    size_kb=$(echo "$line" | awk '{print $2}')
    used_kb=$(echo "$line" | awk '{print $3}')
    avail_kb=$(echo "$line" | awk '{print $4}')
    usage_percent=$(echo "$line" | awk '{print $5}')
    target=$(echo "$line" | awk '{print $6}')

    # Convert to bytes
    size_bytes=$((size_kb * 1024))
    used_bytes=$((used_kb * 1024))
    avail_bytes=$((avail_kb * 1024))

    # Create metric names (sanitize for Prometheus)
    metric_name=$(echo "$target" | sed 's/[\/\-\.]/_/g' | sed 's/^_//')

    # Output metrics
    echo "disk_space_bytes{mountpoint=\"$target\",device=\"$source\"} $size_bytes" >> "$TEMP_FILE"
    echo "disk_space_used_bytes{mountpoint=\"$target\",device=\"$source\"} $used_bytes" >> "$TEMP_FILE"
    echo "disk_space_available_bytes{mountpoint=\"$target\",device=\"$source\"} $avail_bytes" >> "$TEMP_FILE"

    # Remove % and convert to float
    usage_float=$(echo "$usage_percent" | sed 's/%//')
    echo "disk_space_usage_percent{mountpoint=\"$target\",device=\"$source\"} $usage_float" >> "$TEMP_FILE"
done

# Atomic update
mv "$TEMP_FILE" "$METRIC_FILE"

echo "Disk space metrics exported to $METRIC_FILE"
```

### Alerting and Notifications

#### Slack Integration
```bash
#!/bin/bash
# df_slack_alert.sh - Send disk space alerts to Slack

WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
CHANNEL="#alerts"
THRESHOLD=85

send_slack_alert() {
    local message="$1"
    local color="${2:-danger}"

    curl -X POST -H 'Content-type: application/json' \
        --data "{\"channel\":\"$CHANNEL\",\"attachments\":[{\"color\":\"$color\",\"text\":\"$message\"}]}" \
        "$WEBHOOK_URL"
}

# Check disk usage and send alerts
df -h | awk -v threshold=$THRESHOLD '
NR>1 {
    usage = substr($5, 1, length($5)-1);
    if (usage > threshold) {
        message = "🚨 Disk Space Alert: " $1 " on " $6 " is " $5 " full";
        print message;
        system("curl -X POST -H \"Content-type: application/json\" --data \'{\"channel\":\"#alerts\",\"attachments\":[{\"color\":\"danger\",\"text\":\"" message "\"}]}\" " WEBHOOK_URL);
    }
}'
```

#### Email Alert with Detailed Report
```bash
#!/bin/bash
# detailed_disk_report.sh - Send detailed disk space report via email

EMAIL_TO="admin@company.com"
REPORT_FILE="/tmp/disk_report_$(date +%Y%m%d_%H%M%S).txt"

# Generate detailed report
cat > "$REPORT_FILE" << EOF
Subject: Comprehensive Disk Space Report - $(hostname) - $(date)

=== SYSTEM DISK SPACE REPORT ===
Hostname: $(hostname)
Date: $(date)
Kernel: $(uname -r)

=== OVERALL DISK USAGE ===
$(df -h)

=== INODE USAGE ===
$(df -i)

=== LARGE FILES ANALYSIS ===
Large files (>1GB) in /home:
$(find /home -type f -size +1G -exec ls -lh {} \; 2>/dev/null | head -20)

Large files in /var:
$(find /var -type f -size +500M -exec ls -lh {} \; 2>/dev/null | head -20)

=== DIRECTORY SIZES ===
Top 10 largest directories in /:
$(du -sh /* 2>/dev/null | sort -hr | head -10)

Top 10 largest directories in /home:
$(find /home -maxdepth 1 -type d -exec du -sh {} \; 2>/dev/null | sort -hr | head -10)

=== LOG FILE ANALYSIS ===
Log directory sizes:
$(du -sh /var/log/* 2>/dev/null | sort -hr | head -10)

Old log files (>30 days):
$(find /var/log -name "*.log.*" -mtime +30 -ls 2>/dev/null | head -10)

=== SYSTEM LOAD AND MEMORY ===
$(uptime)

$(free -h)

=== MOUNT POINT DETAILS ===
$(mount | grep -E "^/dev" | head -10)

=== CONCLUSION ===
This report was automatically generated by the system monitoring script.
Please review critical items and take appropriate action.

EOF

# Send email
if command -v mailx >/dev/null 2>&1; then
    mailx -s "Disk Space Report - $(hostname)" "$EMAIL_TO" < "$REPORT_FILE"
else
    mail -s "Disk Space Report - $(hostname)" "$EMAIL_TO" < "$REPORT_FILE"
fi

echo "Disk space report sent to $EMAIL_TO"
rm "$REPORT_FILE"
```

## Troubleshooting

### Common Issues and Solutions

#### Inconsistent df Output
```bash
# Issue: df shows different values than du
# Solution: Check for deleted files held by processes
echo "Checking for files deleted but still in use:"
lsof +L1 | grep -v "^COMMAND"

# Check for open file descriptors on deleted files
echo "Finding processes with deleted files:"
find /proc/*/fd -ls 2>/dev/null | grep '(deleted)'

# Solution: Restart processes holding deleted files or reboot
```

#### Slow df Performance
```bash
# Issue: df is slow, especially with network mounts
# Solution: Use local-only checking
df -hl  # Local file systems only

# Solution: Exclude problematic network mounts
df -h -x nfs -x cifs

# Solution: Use specific mount points instead of all
df -h / /home /var

# Solution: Check specific filesystem types only
df -ht ext4,xfs
```

#### Disk Space Discrepancies
```bash
# Issue: Available space doesn't match expected values
# Solution: Check reserved blocks
tune2fs -l /dev/sda1 | grep "Reserved block count"

# Solution: Check filesystem-specific reserves
for fs in $(df --output=source | tail -n +2); do
    if [[ -b "$fs" ]]; then
        echo "Filesystem: $fs"
        dumpe2fs -h "$fs" 2>/dev/null | grep -E "(Reserved|Block)"
    fi
done

# Solution: Check for filesystem corruption
sudo fsck -n /dev/sda1  # Note: Read-only check
```

#### Network Mount Issues
```bash
# Issue: df hangs on network file systems
# Solution: Check network connectivity
ping -c 3 server-name

# Solution: Check NFS server status
showmount -e server-name

# Solution: Test mount manually
timeout 10 df -h /mnt/nfs-mount

# Solution: Use soft mount options for problematic mounts
mount -o soft,timeo=5,retrans=1 server:/path /mnt/test
```

#### Permission and Access Issues
```bash
# Issue: Permission denied errors
# Solution: Check mount permissions
mount | grep "$(df . | tail -1 | awk '{print $1}')"

# Solution: Check filesystem permissions
ls -ld $(df . | tail -1 | awk '{print $6}')

# Solution: Use sudo for system-wide checks
sudo df -h

# Issue: Cannot access certain directories
# Solution: Check with find for inaccessible directories
find / -type d ! -readable 2>/dev/null | head -10
```

### Performance Optimization

#### Optimizing df Performance
```bash
# Use appropriate options for your use case
# Fast local checks
alias df-local='df -hl'

# Quick space check (exclude virtual filesystems)
alias df-real='df -h --type=ext4 --type=xfs --type=btrfs'

# Production monitoring (sync for accuracy)
alias df-prod='df --sync -h'

# Development (speed over accuracy)
alias df-dev='df --no-sync -h'

# Custom function for optimal performance
df_optimal() {
    local use_case="${1:-local}"

    case "$use_case" in
        "local")
            df -hl
            ;;
        "network")
            df -h -t nfs -t cifs -t smbfs
            ;;
        "all")
            df -ahiT
            ;;
        "quick")
            df -h --output=target,pcent | tail -n +2
            ;;
        "detailed")
            df -ahiT --output=source,fstype,size,used,avail,pcent,itotal,iused,ipcent,target
            ;;
        *)
            echo "Usage: df_optimal [local|network|all|quick|detailed]"
            return 1
            ;;
    esac
}
```

## Related Commands

- [`du`](/docs/commands/file-management/du) - Disk usage of files and directories
- [`lsblk`](/docs/commands/device-management/lsblk) - List block devices and partitions
- [`fdisk`](/docs/commands/device-management/fdisk) - Partition table manipulator
- [`mount`](/docs/commands/system-management/mount) - Mount file systems
- [`umount`](/docs/commands/system-management/umount) - Unmount file systems
- [`findmnt`](/docs/commands/system-management/findmnt) - Find and display mounted filesystems
- [`stat`](/docs/commands/file-management/stat) - Display file or file system status
- [`lsof`](/docs/commands/system-management/lsof) - List open files
- [`tune2fs`](/docs/commands/device-management/tune2fs) - Adjust tunable filesystem parameters
- [`blkid`](/docs/commands/device-management/blkid) - Locate/print block device attributes

## Best Practices

### Daily Operations
1. **Use human-readable format**: `df -h` is the most useful for daily monitoring
2. **Monitor critical file systems**: Check `/var`, `/home`, `/tmp` regularly
3. **Set up automated alerts**: Monitor for usage above 80-90% threshold
4. **Check both disk space and inodes**: Use `df -h` and `df -i` together
5. **Use appropriate filtering**: `-l` for local systems, `-t`/`-x` for specific types

### System Administration
1. **Schedule regular checks**: Implement cron jobs for daily/weekly monitoring
2. **Document baseline usage**: Understand normal usage patterns for your systems
3. **Plan for growth**: Monitor trends and plan storage capacity upgrades
4. **Understand reserved space**: Linux reserves 5% for root, account for this in planning
5. **Monitor network mounts**: Check connectivity and performance of remote filesystems

### Performance Considerations
1. **Use local-only checks**: `df -l` is faster on systems with many network mounts
2. **Exclude unnecessary filesystems**: Filter out tmpfs, proc, sysfs for cleaner output
3. **Use specific mount points**: Check specific directories instead of all filesystems
4. **Consider sync vs no-sync**: Use `--sync` for accuracy when needed
5. **Optimize for your environment**: Create custom aliases and functions

### Troubleshooting Guidelines
1. **Understand df vs du differences**: df shows filesystem-level, du shows directory-level usage
2. **Check for deleted files**: Use `lsof` to find processes holding deleted files
3. **Verify mount points**: Ensure filesystems are properly mounted and accessible
4. **Monitor inode usage**: `df -i` can reveal inode exhaustion issues
5. **Check filesystem integrity**: Use `fsck` when encountering unusual behavior

## Performance Tips

1. **Fast local monitoring**: Use `df -hl` for quick checks of local filesystems only
2. **Minimal output**: `df -h --output=target,pcent` for script-friendly compact output
3. **Exclude network mounts**: `-x nfs -x cifs` for faster local monitoring
4. **Batch operations**: Combine multiple checks in a single command to reduce system calls
5. **Cache results**: For monitoring scripts, cache results and check for changes instead of running df continuously
6. **Use appropriate block sizes**: `--block-size=1M` for consistent reporting across systems
7. **Scheduled sync**: Use `sync` command before df for accurate results when needed
8. **Parallel monitoring**: For multiple servers, use parallel ssh to check disk space simultaneously

The `df` command is an essential tool for system administration, providing critical insights into storage utilization across mounted filesystems. Its versatility in output formatting, filtering capabilities, and integration with monitoring systems makes it indispensable for maintaining healthy Linux systems. Whether performing quick checks, implementing comprehensive monitoring solutions, or troubleshooting storage issues, `df` provides the foundational information needed for effective disk space management.