---
title: free - Memory Usage Display Utility
sidebar_label: free
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# free - Memory Usage Display Utility

The `free` command displays the total amount of free and used physical and swap memory in the system, as well as the buffers and caches used by the kernel. It's a fundamental tool for monitoring memory usage and identifying potential memory-related performance issues. The command reads information from the `/proc/meminfo` file and presents it in a human-readable format, making it essential for system administrators, developers, and DevOps engineers to monitor system health and troubleshoot memory-related problems.

## Basic Syntax

```bash
free [OPTIONS]
```

## Command Options

### Display Unit Options

| Option | Description |
|--------|-------------|
| `-b, --bytes` | Display memory usage in bytes |
| `-k, --kilo` | Display memory usage in kilobytes (default) |
| `-m, --mega` | Display memory usage in megabytes |
| `-g, --giga` | Display memory usage in gigabytes |
| `--tera` | Display memory usage in terabytes |
| `-h, --human` | Show human-readable output with automatic unit scaling |

### Output Format Options

| Option | Description |
|--------|-------------|
| `-l, --lohi` | Show detailed low and high memory statistics |
| `-t, --total` | Display a line showing the total memory (Mem + Swap) |
| `-w, --wide` | Wide output mode (don't truncate columns) |
| `-o, --old` | Use old format (without -/+buffers/cache line) |

### Monitoring Options

| Option | Description |
|--------|-------------|
| `-s, --seconds N` | Continuously display memory usage every N seconds |
| `-c, --count N` | Repeat the command N times and exit |

### Information Options

| Option | Description |
|--------|-------------|
| `-V, --version` | Display version information |
| `--help` | Display help message and exit |

## Usage Examples

### Basic Memory Display

#### Standard Output Formats
```bash
# Default display (kilobytes)
free

# Display in megabytes
free -m

# Display in gigabytes
free -g

# Display in bytes
free -b

# Display in terabytes
free --tera

# Human-readable format with automatic scaling
free -h

# Wide output (no column truncation)
free -w

# Wide human-readable format
free -wh
```

#### Legacy Format Comparison
```bash
# Modern format (default)
free
# Output:
#               total        used        free      shared  buff/cache   available
# Mem:       16140816     12774804      816004       58736     2540008     2913824
# Swap:       8191996           0      8191996

# Old format with -/+ buffers/cache
free -o
# Output:
#               total        used        free      shared  buffers     cached
# Mem:       16140816     12774804      816004       58736      87452     2453556
# Swap:       8191996           0      8191996
# -/+ buffers/cache:     10234796     5896020
```

### Detailed Memory Information

#### Comprehensive Memory View
```bash
# Show low/high memory details
free -l

# Include total memory line
free -t

# Human-readable with total
free -ht

# Detailed with all options
free -hlt

# Wide detailed output
free -lwt

# Old format with total
free -ot
```

#### Low/High Memory Details
```bash
# On systems with low/high memory split
free -l
# Output shows:
# Mem:       total        used        free      shared  buff/cache   available
# Low:       total        used        free      shared  buff/cache   available
# High:      total        used        free      shared  buff/cache   available
# Swap:      total        used        free
# Total:     total        used        free
```

### Continuous Monitoring

#### Real-time Monitoring
```bash
# Update every 5 seconds indefinitely
free -s 5

# Update every 2 seconds, 10 times
free -s 2 -c 10

# Monitor memory in megabytes continuously
free -ms 5

# Monitor with total line every 10 seconds
free -ts 10

# Human-readable monitoring every 3 seconds
free -hs 3

# Wide format monitoring with count
free -ws 1 -c 60

# Combined monitoring with multiple options
free -hts 5
```

#### Advanced Monitoring Scripts
```bash
# Monitor with timestamp logging
free -hs 1 | while read line; do
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line"
done

# Monitor with alert conditions
free -ms 5 | while read line; do
    if echo "$line" | grep -q "Mem:"; then
        available=$(echo "$line" | awk '{print $7}')
        if [ "$available" -lt 1000 ]; then
            echo "ALERT: Low memory ($available MB available) at $(date)"
        fi
    fi
done
```

## Understanding the Output

### Modern Output Format (Default)

```
              total        used        free      shared  buff/cache   available
Mem:       16140816     12774804      816004       58736     2540008     2913824
Swap:       8191996           0      8191996
```

### Output Columns Explained

#### Memory Section (Mem)
- **total** - Total installed physical memory (RAM)
- **used** - Memory currently in use by processes + system
- **free** - Memory not being used by anyone
- **shared** - Memory used (mostly) by tmpfs filesystems
- **buff/cache** - Combined memory used for kernel buffers and page cache
- **available** - Estimated memory available for starting new applications without swapping

#### Swap Section (Swap)
- **total** - Total swap space configured on the system
- **used** - Swap space currently in use
- **free** - Unused swap space

### Understanding Available Memory

The `available` column is the most important for determining if you have enough memory:

```bash
# Check available memory in different formats
free -h | grep Mem | awk '{print "Available: " $7}'

# Calculate available memory percentage
free | grep Mem | awk '{printf "Available: %.1f%%\n", $7/$2 * 100}'

# Detailed memory breakdown
free -h
echo ""
echo "Memory Analysis:"
free -h | grep Mem | awk '{
    total=$2
    used=$3
    free=$4
    shared=$5
    cache=$6
    available=$7

    printf "Total Memory: %s\n", total
    printf "Used by Applications: %s\n", used
    printf "Completely Free: %s\n", free
    printf "Shared (tmpfs): %s\n", shared
    printf "Cache & Buffers: %s\n", cache
    printf "Available for Apps: %s\n", available
    printf "Memory Pressure: %s\n", (available/total < 0.1) ? "HIGH" : "NORMAL"
}'
```

### Legacy Format Analysis

```
              total        used        free      shared  buff/cache   available
Mem:       16140816     12774804      816004       58736     2540008     2913824
-/+ buffers/cache:     10234796     5896020
Swap:       8191996           0      8191996
```

The `-/+ buffers/cache` line provides traditional memory accounting:
- **used** (-buffers/cache): Memory used by applications (total used - buff/cache)
- **free** (+buffers/cache): Memory available for applications (free + buff/cache)

**Calculation Examples:**
```bash
# Manual calculation of application memory usage
free | grep Mem | awk '{
    app_used = $3 - $6  # used - buff/cache
    app_free = $4 + $6  # free + buff/cache
    printf "Application memory: %d KB\n", app_used
    printf "Available for apps: %d KB\n", app_free
}'
```

## Practical Examples

### System Administration

#### Memory Health Check Script
```bash
#!/bin/bash
# Comprehensive memory health check

check_memory_health() {
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    local hostname=$(hostname)

    echo "=== Memory Health Check for $hostname ==="
    echo "Timestamp: $timestamp"
    echo ""

    # Get memory information
    local mem_info=$(free -m)
    local total_mb=$(echo "$mem_info" | grep Mem | awk '{print $2}')
    local used_mb=$(echo "$mem_info" | grep Mem | awk '{print $3}')
    local free_mb=$(echo "$mem_info" | grep Mem | awk '{print $4}')
    local available_mb=$(echo "$mem_info" | grep Mem | awk '{print $7}')
    local cache_mb=$(echo "$mem_info" | grep Mem | awk '{print $6}')
    local swap_total=$(echo "$mem_info" | grep Swap | awk '{print $2}')
    local swap_used=$(echo "$mem_info" | grep Swap | awk '{print $3}')

    # Calculate percentages
    local usage_percent=$((used_mb * 100 / total_mb))
    local available_percent=$((available_mb * 100 / total_mb))
    local swap_percent=0
    if [ "$swap_total" -gt 0 ]; then
        swap_percent=$((swap_used * 100 / swap_total))
    fi

    # Display summary
    echo "Memory Summary:"
    echo "  Total Memory: ${total_mb} MB"
    echo "  Used Memory: ${used_mb} MB (${usage_percent}%)"
    echo "  Free Memory: ${free_mb} MB"
    echo "  Cache Memory: ${cache_mb} MB"
    echo "  Available Memory: ${available_mb} MB (${available_percent}%)"
    echo ""
    echo "Swap Summary:"
    echo "  Total Swap: ${swap_total} MB"
    echo "  Used Swap: ${swap_used} MB (${swap_percent}%)"
    echo ""

    # Health assessment
    echo "Health Assessment:"
    local status="OK"
    local warnings=()

    # Check available memory
    if [ "$available_mb" -lt 500 ]; then
        status="CRITICAL"
        warnings+=("CRITICAL: Very low available memory (${available_mb} MB)")
    elif [ "$available_mb" -lt 1000 ]; then
        status="WARNING"
        warnings+=("WARNING: Low available memory (${available_mb} MB)")
    fi

    # Check swap usage
    if [ "$swap_used" -gt 0 ]; then
        if [ "$status" = "OK" ]; then status="WARNING"; fi
        warnings+=("WARNING: Swap space is being used (${swap_used} MB)")
    fi

    # Check memory usage percentage
    if [ "$usage_percent" -gt 95 ]; then
        status="CRITICAL"
        warnings+=("CRITICAL: Memory usage is very high (${usage_percent}%)")
    elif [ "$usage_percent" -gt 90 ]; then
        if [ "$status" = "OK" ]; then status="WARNING"; fi
        warnings+=("WARNING: High memory usage (${usage_percent}%)")
    fi

    echo "  Overall Status: $status"
    if [ ${#warnings[@]} -gt 0 ]; then
        echo "  Warnings:"
        for warning in "${warnings[@]}"; do
            echo "    - $warning"
        done
    fi

    echo ""
    echo "=== End Memory Health Check ==="
    echo ""
}

# Run the check
check_memory_health
```

#### Memory Alert System
```bash
#!/bin/bash
# Advanced memory monitoring and alert system

# Configuration
AVAILABLE_THRESHOLD_MB=1000    # Alert if available < 1GB
SWAP_THRESHOLD_MB=100          # Alert if swap used > 100MB
USAGE_THRESHOLD_PERCENT=90     # Alert if usage > 90%
CHECK_INTERVAL=60              # Check every 60 seconds
ALERT_LOG="/var/log/memory_alerts.log"
MAX_LOG_SIZE=10485760          # 10MB max log size

# Ensure log directory exists
mkdir -p "$(dirname "$ALERT_LOG")"

# Rotate log if too large
if [ -f "$ALERT_LOG" ] && [ $(stat -f%z "$ALERT_LOG" 2>/dev/null || stat -c%s "$ALERT_LOG") -gt $MAX_LOG_SIZE ]; then
    mv "$ALERT_LOG" "${ALERT_LOG}.$(date +%Y%m%d_%H%M%S)"
fi

log_alert() {
    local level=$1
    local message=$2
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    echo "[$timestamp] [$level] $message" >> "$ALERT_LOG"
    echo "[$timestamp] [$level] $message"

    # Send to syslog if available
    if command -v logger >/dev/null 2>&1; then
        logger -t "memory_monitor" "$level: $message"
    fi
}

check_memory_status() {
    # Get memory information
    local mem_info=$(free -m)
    local total_mb=$(echo "$mem_info" | grep Mem | awk '{print $2}')
    local used_mb=$(echo "$mem_info" | grep Mem | awk '{print $3}')
    local available_mb=$(echo "$mem_info" | grep Mem | awk '{print $7}')
    local swap_used_mb=$(echo "$mem_info" | grep Swap | awk '{print $3}')

    # Calculate usage percentage
    local usage_percent=$((used_mb * 100 / total_mb))

    # Check thresholds
    if [ "$available_mb" -lt "$AVAILABLE_THRESHOLD_MB" ]; then
        log_alert "CRITICAL" "Low available memory: ${available_mb} MB (threshold: ${AVAILABLE_THRESHOLD_MB} MB)"
    fi

    if [ "$swap_used_mb" -gt "$SWAP_THRESHOLD_MB" ]; then
        log_alert "WARNING" "High swap usage: ${swap_used_mb} MB (threshold: ${SWAP_THRESHOLD_MB} MB)"
    fi

    if [ "$usage_percent" -gt "$USAGE_THRESHOLD_PERCENT" ]; then
        log_alert "WARNING" "High memory usage: ${usage_percent}% (threshold: ${USAGE_THRESHOLD_PERCENT}%)"
    fi

    # Log normal status periodically
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] [INFO] Memory status: ${used_mb}/${total_mb} MB used, ${available_mb} MB available, ${swap_used_mb} MB swap used" >> "$ALERT_LOG"
}

# Main monitoring loop
log_alert "INFO" "Memory monitoring started (interval: ${CHECK_INTERVAL}s)"
log_alert "INFO" "Thresholds: Available<${AVAILABLE_THRESHOLD_MB}MB, Swap>${SWAP_THRESHOLD_MB}MB, Usage>${USAGE_THRESHOLD_PERCENT}%"

while true; do
    check_memory_status
    sleep $CHECK_INTERVAL
done
```

#### Memory Trend Analysis
```bash
#!/bin/bash
# Memory usage trend analysis and reporting

TREND_LOG="/var/log/memory_trend.log"
REPORT_FILE="/tmp/memory_trend_report_$(date +%Y%m%d).txt"
ANALYSIS_HOURS=24  # Analyze last 24 hours

collect_memory_data() {
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    local mem_info=$(free -m)
    local swap_info=$(echo "$mem_info" | grep Swap)
    mem_info=$(echo "$mem_info" | grep Mem)

    local total=$(echo "$mem_info" | awk '{print $2}')
    local used=$(echo "$mem_info" | awk '{print $3}')
    local free=$(echo "$mem_info" | awk '{print $4}')
    local available=$(echo "$mem_info" | awk '{print $7}')
    local cache=$(echo "$mem_info" | awk '{print $6}')
    local swap_used=$(echo "$swap_info" | awk '{print $3}')

    # Calculate usage percentage
    local usage_percent=$((used * 100 / total))

    # Log to trend file
    echo "$timestamp,$total,$used,$free,$available,$cache,$swap_used,$usage_percent" >> "$TREND_LOG"

    # Keep only last 7 days of data
    local cutoff_time=$(date -d "7 days ago" "+%s")
    local temp_file="/tmp/memory_trend_temp.log"

    while IFS=',' read -r timestamp total used free available cache swap_used usage_percent; do
        local log_time=$(date -d "$timestamp" "+%s" 2>/dev/null)
        if [ "$log_time" -ge "$cutoff_time" ]; then
            echo "$timestamp,$total,$used,$free,$available,$cache,$swap_used,$usage_percent" >> "$temp_file"
        fi
    done < "$TREND_LOG"

    mv "$temp_file" "$TREND_LOG"
}

generate_trend_report() {
    if [ ! -f "$TREND_LOG" ] || [ ! -s "$TREND_LOG" ]; then
        echo "No trend data available" > "$REPORT_FILE"
        return
    fi

    local cutoff_time=$(date -d "$ANALYSIS_HOURS hours ago" "+%s")
    local temp_data="/tmp/memory_analysis.csv"

    # Extract recent data
    while IFS=',' read -r timestamp total used free available cache swap_used usage_percent; do
        local log_time=$(date -d "$timestamp" "+%s" 2>/dev/null)
        if [ "$log_time" -ge "$cutoff_time" ]; then
            echo "$timestamp,$total,$used,$free,$available,$cache,$swap_used,$usage_percent" >> "$temp_data"
        fi
    done < "$TREND_LOG"

    # Generate report
    cat > "$REPORT_FILE" << EOF
Memory Usage Trend Report
=========================
Generated: $(date)
Analysis Period: Last $ANALYSIS_HOURS hours
Hostname: $(hostname)

EOF

    if [ -f "$temp_data" ] && [ -s "$temp_data" ]; then
        # Calculate statistics
        local data_points=$(wc -l < "$temp_data")
        local avg_used=$(awk -F',' 'NR>1 {sum+=$3} END {if(NR>1) printf "%.1f", sum/(NR-1)}' "$temp_data")
        local max_used=$(awk -F',' 'NR>1 && $3>max {max=$3} END {if(NR>1) print max}' "$temp_data")
        local min_available=$(awk -F',' 'NR>1 && ($5<min || NR==2) {min=$5} END {if(NR>1) print min}' "$temp_data")
        local total_swap_usage=$(awk -F',' 'NR>1 {sum+=$7} END {if(NR>1) printf "%.1f", sum/(NR-1)}' "$temp_data")

        cat >> "$REPORT_FILE" << EOF
Analysis Results:
- Data Points: $data_points
- Average Memory Used: ${avg_used} MB
- Peak Memory Used: ${max_used} MB
- Minimum Available Memory: ${min_available} MB
- Average Swap Usage: ${total_swap_usage} MB

Recent Activity:
EOF

        # Show last 10 entries
        tail -10 "$temp_data" | while IFS=',' read -r timestamp total used free available cache swap_used usage_percent; do
            printf "  %-19s | Used: %6s MB (%3s%%) | Available: %6s MB | Swap: %6s MB\n" \
                "$timestamp" "$used" "$usage_percent" "$available" "$swap_used" >> "$REPORT_FILE"
        done

        # Identify concerning patterns
        local low_available_count=$(awk -F',' '$5 < 1000 {count++} END {print count+0}' "$temp_data")
        local high_swap_count=$(awk -F',' '$7 > 0 {count++} END {print count+0}' "$temp_data")

        cat >> "$REPORT_FILE" << EOF

Identified Issues:
EOF

        if [ "$low_available_count" -gt 0 ]; then
            echo "- Low available memory detected $low_available_count times (< 1GB)" >> "$REPORT_FILE"
        fi

        if [ "$high_swap_count" -gt 0 ]; then
            echo "- Swap usage detected $high_swap_count times" >> "$REPORT_FILE"
        fi

        if [ "$low_available_count" -eq 0 ] && [ "$high_swap_count" -eq 0 ]; then
            echo "- No significant memory issues detected" >> "$REPORT_FILE"
        fi

        rm "$temp_data"
    else
        echo "No data available for the specified time period" >> "$REPORT_FILE"
    fi

    cat >> "$REPORT_FILE" << EOF

Recommendations:
1. Monitor available memory regularly
2. Investigate any consistent swap usage
3. Consider memory upgrade if available memory consistently < 20%
4. Review application memory usage patterns
5. Set up automated monitoring and alerts

EOF
}

# Main execution
collect_memory_data
generate_trend_report

echo "Memory trend analysis complete. Report saved to: $REPORT_FILE"
```

### Development Workflow

#### Application Memory Testing
```bash
#!/bin/bash
# Memory testing for application development

APP_NAME="$1"
TEST_DURATION="${2:-300}"  # Default 5 minutes
LOG_FILE="/tmp/${APP_NAME}_memory_test_$(date +%Y%m%d_%H%M%S).log"

if [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <app_name> [test_duration_seconds]"
    exit 1
fi

echo "Starting memory test for: $APP_NAME"
echo "Test duration: $TEST_DURATION seconds"
echo "Log file: $LOG_FILE"

# Initialize log
cat > "$LOG_FILE" << EOF
Memory Test Report for $APP_NAME
================================
Started: $(date)
Duration: $TEST_DURATION seconds
Hostname: $(hostname)

Timestamp,Total_MB,Used_MB,Free_MB,Available_MB,Cache_MB,Swap_Used_MB,Usage_Percent,Top_Processes
EOF

# Monitor memory during application run
end_time=$(($(date +%s) + TEST_DURATION))

while [ $(date +%s) -lt $end_time ]; do
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # Get memory stats
    mem_info=$(free -m | grep Mem)
    swap_info=$(free -m | grep Swap)

    total=$(echo "$mem_info" | awk '{print $2}')
    used=$(echo "$mem_info" | awk '{print $3}')
    free_mem=$(echo "$mem_info" | awk '{print $4}')
    available=$(echo "$mem_info" | awk '{print $7}')
    cache=$(echo "$mem_info" | awk '{print $6}')
    swap_used=$(echo "$swap_info" | awk '{print $3}')

    usage_percent=$((used * 100 / total))

    # Get top memory processes
    top_processes=$(ps aux --sort=-%mem | head -6 | awk 'NR>1 {printf "%s(%s%%) ", $11, $4}')

    # Log the data
    echo "$timestamp,$total,$used,$free_mem,$available,$cache,$swap_used,$usage_percent,\"$top_processes\"" >> "$LOG_FILE"

    sleep 10
done

# Generate summary
echo "" >> "$LOG_FILE"
echo "Test Summary:" >> "$LOG_FILE"
echo "=============" >> "$LOG_FILE"

# Calculate statistics
avg_used=$(awk -F',' 'NR>2 {sum+=$3; count++} END {if(count>0) printf "%.1f", sum/count}' "$LOG_FILE")
max_used=$(awk -F',' 'NR>2 && $3>max {max=$3} END {if(NR>2) print max}' "$LOG_FILE")
min_available=$(awk -F',' 'NR>2 && ($5<min || NR==3) {min=$5} END {if(NR>2) print min}' "$LOG_FILE")
total_swap_events=$(awk -F',' 'NR>2 && $7>0 {count++} END {print count+0}' "$LOG_FILE")

cat >> "$LOG_FILE" << EOF
- Average Memory Used: ${avg_used} MB
- Peak Memory Used: ${max_used} MB
- Minimum Available Memory: ${min_available} MB
- Swap Usage Events: ${total_swap_events}

Test completed: $(date)
EOF

echo "Memory test completed. Results saved to: $LOG_FILE"
```

#### Development Environment Monitor
```bash
#!/bin/bash
# Development environment memory monitor

DEV_MONITOR_LOG="/tmp/dev_memory_monitor.log"
ALERT_THRESHOLD=2000  # 2GB available memory warning

start_dev_monitor() {
    echo "Starting development environment memory monitor..."
    echo "Log file: $DEV_MONITOR_LOG"

    # Create log header
    cat > "$DEV_MONITOR_LOG" << EOF
Development Environment Memory Monitor
====================================
Started: $(date)
Hostname: $(hostname)
Alert Threshold: ${ALERT_THRESHOLD} MB available memory

EOF

    # Monitor in background
    (
        while true; do
            timestamp=$(date "+%Y-%m-%d %H:%M:%S")
            available=$(free -m | grep Mem | awk '{print $7}')

            echo "[$timestamp] Available memory: ${available} MB" >> "$DEV_MONITOR_LOG"

            if [ "$available" -lt "$ALERT_THRESHOLD" ]; then
                echo "[$timestamp] WARNING: Low available memory (${available} MB)" >> "$DEV_MONITOR_LOG"

                # Show top memory consumers
                echo "[$timestamp] Top memory-consuming processes:" >> "$DEV_MONITOR_LOG"
                ps aux --sort=-%mem | head -6 | awk '{printf "  [%s] %s - %s%%\n", $2, $11, $4}' >> "$DEV_MONITOR_LOG"
            fi

            sleep 60
        done
    ) &

    echo $! > /tmp/dev_monitor.pid
    echo "Monitor started with PID: $(cat /tmp/dev_monitor.pid)"
}

stop_dev_monitor() {
    if [ -f /tmp/dev_monitor.pid ]; then
        pid=$(cat /tmp/dev_monitor.pid)
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
            echo "Development monitor stopped (PID: $pid)"
        else
            echo "Monitor process not found"
        fi
        rm -f /tmp/dev_monitor.pid
    else
        echo "No monitor running"
    fi
}

case "${1:-start}" in
    start)
        start_dev_monitor
        ;;
    stop)
        stop_dev_monitor
        ;;
    status)
        if [ -f /tmp/dev_monitor.pid ] && kill -0 "$(cat /tmp/dev_monitor.pid)" 2>/dev/null; then
            echo "Development monitor is running (PID: $(cat /tmp/dev_monitor.pid))"
            echo "Recent logs:"
            tail -5 "$DEV_MONITOR_LOG"
        else
            echo "Development monitor is not running"
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        ;;
esac
```

## Advanced Usage

### Memory Analysis Scripts

#### Comprehensive Memory Profiler
```bash
#!/bin/bash
# Comprehensive memory usage profiler

PROFILER_OUTPUT_DIR="/tmp/memory_profiler_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$PROFILER_OUTPUT_DIR"

echo "Starting comprehensive memory profiling..."
echo "Output directory: $PROFILER_OUTPUT_DIR"

# 1. Current memory snapshot
echo "1. Capturing current memory snapshot..."
free -h > "$PROFILER_OUTPUT_DIR/memory_snapshot.txt"
free -l -h >> "$PROFILER_OUTPUT_DIR/memory_snapshot.txt"
free -t -h >> "$PROFILER_OUTPUT_DIR/memory_snapshot.txt"

# 2. Process memory analysis
echo "2. Analyzing process memory usage..."
ps aux --sort=-%mem > "$PROFILER_OUTPUT_DIR/process_memory.txt"
echo "" >> "$PROFILER_OUTPUT_DIR/process_memory.txt"
echo "Top 20 memory-consuming processes:" >> "$PROFILER_OUTPUT_DIR/process_memory.txt"
ps aux --sort=-%mem | head -21 >> "$PROFILER_OUTPUT_DIR/process_memory.txt"

# 3. Memory mapping analysis
echo "3. Analyzing memory mappings..."
if [ -d /proc/self ]; then
    cat /proc/meminfo > "$PROFILER_OUTPUT_DIR/meminfo.txt"
fi

# 4. Shared memory analysis
echo "4. Analyzing shared memory..."
ipcs -m > "$PROFILER_OUTPUT_DIR/shared_memory.txt" 2>/dev/null || echo "No shared memory segments found" > "$PROFILER_OUTPUT_DIR/shared_memory.txt"

# 5. Generate memory heat map
echo "5. Generating memory heat map..."
cat > "$PROFILER_OUTPUT_DIR/memory_heatmap.txt" << EOF
Memory Heat Map Analysis
=======================
Generated: $(date)

EOF

free -m | grep Mem | awk '{
    total=$2
    used=$3
    free=$4
    cache=$6
    available=$7

    printf "Total Memory: %d MB\n", total
    printf "Used Memory: %d MB (%.1f%%)\n", used, (used/total)*100
    printf "Free Memory: %d MB (%.1f%%)\n", free, (free/total)*100
    printf "Cache Memory: %d MB (%.1f%%)\n", cache, (cache/total)*100
    printf "Available Memory: %d MB (%.1f%%)\n", available, (available/total)*100
    printf "\n"

    # Generate visual heat map
    used_bars=int(used/total*50)
    free_bars=int(free/total*50)
    cache_bars=int(cache/total*50)

    printf "Memory Visualization (scale: 1 bar = 2%%):\n"
    printf "Used:     [%-50s] %d%%\n", str_repeat("█", used_bars), int(used/total*100)
    printf "Free:     [%-50s] %d%%\n", str_repeat("░", free_bars), int(free/total*100)
    printf "Cache:    [%-50s] %d%%\n", str_repeat("▓", cache_bars), int(cache/total*100)

}' 2>/dev/null || free -m | grep Mem | awk '{
    total=$2
    used=$3
    free=$4
    cache=$6
    available=$7

    printf "Total Memory: %d MB\n", total
    printf "Used Memory: %d MB (%.1f%%)\n", used, (used/total)*100
    printf "Free Memory: %d MB (%.1f%%)\n", free, (free/total)*100
    printf "Cache Memory: %d MB (%.1f%%)\n", cache, (cache/total)*100
    printf "Available Memory: %d MB (%.1f%%)\n", available, (available/total)*100
}' >> "$PROFILER_OUTPUT_DIR/memory_heatmap.txt"

# 6. Generate summary report
echo "6. Generating summary report..."
cat > "$PROFILER_OUTPUT_DIR/profile_summary.txt" << EOF
Memory Profiling Summary
========================
Profile Date: $(date)
Hostname: $(hostname)
Kernel: $(uname -r)
Uptime: $(uptime)

Memory Analysis Results:
------------------------

EOF

# Extract key metrics
total_mb=$(free -m | grep Mem | awk '{print $2}')
used_mb=$(free -m | grep Mem | awk '{print $3}')
available_mb=$(free -m | grep Mem | awk '{print $7}')
usage_percent=$((used_mb * 100 / total_mb))

cat >> "$PROFILER_OUTPUT_DIR/profile_summary.txt" << EOF
- Total Memory: ${total_mb} MB
- Used Memory: ${used_mb} MB (${usage_percent}%)
- Available Memory: ${available_mb} MB
- Memory Status: $([ "$available_mb" -lt 1000 ] && echo "CRITICAL" || [ "$available_mb" -lt 2000 ] && echo "WARNING" || echo "OK")

Top 5 Memory Processes:
$(ps aux --sort=-%mem | head -6 | awk 'NR>1 {printf "  %-20s %6s%% %10s MB\n", $11, $4, int($6/1024)}')

Recommendations:
EOF

if [ "$available_mb" -lt 1000 ]; then
    echo "- CRITICAL: Very low available memory. Consider immediate action." >> "$PROFILER_OUTPUT_DIR/profile_summary.txt"
elif [ "$available_mb" -lt 2000 ]; then
    echo "- WARNING: Low available memory. Monitor closely." >> "$PROFILER_OUTPUT_DIR/profile_summary.txt"
else
    echo "- OK: Memory usage is within normal ranges." >> "$PROFILER_OUTPUT_DIR/profile_summary.txt"
fi

if [ "$(free | grep Swap | awk '{print $3}')" -gt 0 ]; then
    echo "- Swap usage detected. Investigate memory pressure." >> "$PROFILER_OUTPUT_DIR/profile_summary.txt"
else
    echo "- No swap usage detected." >> "$PROFILER_OUTPUT_DIR/profile_summary.txt"
fi

echo ""
echo "Memory profiling completed!"
echo "Results saved in: $PROFILER_OUTPUT_DIR"
echo ""
echo "Generated files:"
ls -la "$PROFILER_OUTPUT_DIR"
```

#### Memory Leak Detection Script
```bash
#!/bin/bash
# Memory leak detection utility

MONITOR_DURATION="${1:-3600}"  # Default 1 hour
CHECK_INTERVAL="${2:-60}"     # Default every minute
OUTPUT_FILE="/tmp/memory_leak_detection_$(date +%Y%m%d_%H%M%S).log"

echo "Starting memory leak detection..."
echo "Duration: $MONITOR_DURATION seconds"
echo "Check interval: $CHECK_INTERVAL seconds"
echo "Output file: $OUTPUT_FILE"

# Initialize monitoring
cat > "$OUTPUT_FILE" << EOF
Memory Leak Detection Report
===========================
Started: $(date)
Duration: ${MONITOR_DURATION} seconds
Check Interval: ${CHECK_INTERVAL} seconds
Hostname: $(hostname)

Timestamp,Total_MB,Used_MB,Available_MB,Swap_Used_MB,Top_Process
EOF

# Collect baseline
baseline_used=$(free -m | grep Mem | awk '{print $3}')
baseline_available=$(free -m | grep Mem | awk '{print $7}')

echo "Baseline - Used: ${baseline_used} MB, Available: ${baseline_available} MB"

end_time=$(($(date +%s) + MONITOR_DURATION))
memory_growth=0
max_used=$baseline_used
min_available=$baseline_available

while [ $(date +%s) -lt $end_time ]; do
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # Get current memory stats
    current_used=$(free -m | grep Mem | awk '{print $3}')
    current_available=$(free -m | grep Mem | awk '{print $7}')
    current_swap=$(free -m | grep Swap | awk '{print $3}')

    # Track maximums
    if [ "$current_used" -gt "$max_used" ]; then
        max_used=$current_used
    fi

    if [ "$current_available" -lt "$min_available" ]; then
        min_available=$current_available
    fi

    # Calculate growth
    growth=$((current_used - baseline_used))
    if [ "$growth" -gt "$memory_growth" ]; then
        memory_growth=$growth
    fi

    # Get top memory process
    top_process=$(ps aux --sort=-%mem | head -2 | tail -1 | awk '{printf "%s(%s%%)", $11, $4}')

    # Log data
    echo "$timestamp,$current_used,$current_available,$current_swap,$top_process" >> "$OUTPUT_FILE"

    # Alert on significant growth
    if [ "$growth" -gt 500 ]; then
        echo "[$timestamp] ALERT: Memory growth detected - ${growth} MB increase from baseline" | tee -a "$OUTPUT_FILE"
    fi

    sleep $CHECK_INTERVAL
done

# Generate analysis
cat >> "$OUTPUT_FILE" << EOF

Memory Leak Analysis Results:
============================
Duration: $MONITOR_DURATION seconds
Baseline Used: ${baseline_used} MB
Peak Used: ${max_used} MB
Baseline Available: ${baseline_available} MB
Minimum Available: ${min_available} MB
Maximum Growth: ${memory_growth} MB

EOF

if [ "$memory_growth" -gt 1000 ]; then
    echo "STATUS: POSSIBLE MEMORY LEAK DETECTED" >> "$OUTPUT_FILE"
    echo "Reason: Memory grew by ${memory_growth} MB over $(($MONITOR_DURATION/60)) minutes" >> "$OUTPUT_FILE"
    echo "Recommendation: Investigate long-running processes" >> "$OUTPUT_FILE"
elif [ "$memory_growth" -gt 500 ]; then
    echo "STATUS: WARNING - High Memory Growth" >> "$OUTPUT_FILE"
    echo "Reason: Memory grew by ${memory_growth} MB over $(($MONITOR_DURATION/60)) minutes" >> "$OUTPUT_FILE"
    echo "Recommendation: Monitor closely" >> "$OUTPUT_FILE"
else
    echo "STATUS: NORMAL - No significant memory growth detected" >> "$OUTPUT_FILE"
fi

echo ""
echo "Memory leak detection completed!"
echo "Results saved to: $OUTPUT_FILE"
echo "Maximum memory growth: ${memory_growth} MB"

if [ "$memory_growth" -gt 1000 ]; then
    echo "⚠️  WARNING: Potential memory leak detected!"
    exit 1
fi
```

## Integration and Automation

### Monitoring System Integration

#### Nagios/Icinga Plugin
```bash
#!/bin/bash
# Nagios/Icinga memory monitoring plugin

# Plugin configuration
WARNING_AVAILABLE="${1:-1000}"    # Warning if available < 1GB
CRITICAL_AVAILABLE="${2:-500}"    # Critical if available < 500MB
WARNING_SWAP="${3:-0}"            # Warning if swap > 0MB
CRITICAL_SWAP="${4:-100}"         # Critical if swap > 100MB

# Get memory information
mem_info=$(free -m)
total_mb=$(echo "$mem_info" | grep Mem | awk '{print $2}')
used_mb=$(echo "$mem_info" | grep Mem | awk '{print $3}')
available_mb=$(echo "$mem_info" | grep Mem | awk '{print $7}')
swap_used_mb=$(echo "$mem_info" | grep Swap | awk '{print $3}')
usage_percent=$((used_mb * 100 / total_mb))

# Performance data
perf_data="total=${total_mb}MB used=${used_mb}MB available=${available_mb}MB swap_used=${swap_used_mb}MB usage_percent=${usage_percent}%"

# Check thresholds
exit_code=0
status="OK"
message="Memory usage: ${used_mb}/${total_mb}MB (${usage_percent}%), Available: ${available_mb}MB"

if [ "$available_mb" -lt "$CRITICAL_AVAILABLE" ] || [ "$swap_used_mb" -gt "$CRITICAL_SWAP" ]; then
    exit_code=2
    status="CRITICAL"
    message="Memory usage: ${used_mb}/${total_mb}MB (${usage_percent}%), Available: ${available_mb}MB"
    [ "$available_mb" -lt "$CRITICAL_AVAILABLE" ] && message="$message - LOW AVAILABLE MEMORY"
    [ "$swap_used_mb" -gt "$CRITICAL_SWAP" ] && message="$message - HIGH SWAP USAGE"
elif [ "$available_mb" -lt "$WARNING_AVAILABLE" ] || [ "$swap_used_mb" -gt "$WARNING_SWAP" ]; then
    exit_code=1
    status="WARNING"
    message="Memory usage: ${used_mb}/${total_mb}MB (${usage_percent}%), Available: ${available_mb}MB"
    [ "$available_mb" -lt "$WARNING_AVAILABLE" ] && message="$message - Low available memory"
    [ "$swap_used_mb" -gt "$WARNING_SWAP" ] && message="$message - Swap usage detected"
fi

# Output Nagios format
echo "$status: $message | $perf_data"
exit $exit_code
```

#### Prometheus Exporter
```bash
#!/bin/bash
# Simple Prometheus metrics exporter for memory metrics

METRICS_FILE="/tmp/memory.prom"
INTERVAL="${1:-15}"  # Default 15 seconds

export_memory_metrics() {
    # Get memory information
    mem_info=$(free -m)
    total_mb=$(echo "$mem_info" | grep Mem | awk '{print $2}')
    used_mb=$(echo "$mem_info" | grep Mem | awk '{print $3}')
    free_mb=$(echo "$mem_info" | grep Mem | awk '{print $4}')
    shared_mb=$(echo "$mem_info" | grep Mem | awk '{print $5}')
    cache_mb=$(echo "$mem_info" | grep Mem | awk '{print $6}')
    available_mb=$(echo "$mem_info" | grep Mem | awk '{print $7}')
    swap_total_mb=$(echo "$mem_info" | grep Swap | awk '{print $2}')
    swap_used_mb=$(echo "$mem_info" | grep Swap | awk '{print $3}')

    # Calculate percentages
    usage_percent=$((used_mb * 100 / total_mb))
    available_percent=$((available_mb * 100 / total_mb))
    swap_usage_percent=0
    if [ "$swap_total_mb" -gt 0 ]; then
        swap_usage_percent=$((swap_used_mb * 100 / swap_total_mb))
    fi

    # Generate Prometheus metrics
    cat > "$METRICS_FILE" << EOF
# HELP node_memory_total_mb Total memory in megabytes
# TYPE node_memory_total_mb gauge
node_memory_total_mb $total_mb

# HELP node_memory_used_mb Used memory in megabytes
# TYPE node_memory_used_mb gauge
node_memory_used_mb $used_mb

# HELP node_memory_free_mb Free memory in megabytes
# TYPE node_memory_free_mb gauge
node_memory_free_mb $free_mb

# HELP node_memory_available_mb Available memory in megabytes
# TYPE node_memory_available_mb gauge
node_memory_available_mb $available_mb

# HELP node_memory_cache_mb Cache memory in megabytes
# TYPE node_memory_cache_mb gauge
node_memory_cache_mb $cache_mb

# HELP node_memory_usage_percent Memory usage percentage
# TYPE node_memory_usage_percent gauge
node_memory_usage_percent $usage_percent

# HELP node_memory_swap_total_mb Total swap in megabytes
# TYPE node_memory_swap_total_mb gauge
node_memory_swap_total_mb $swap_total_mb

# HELP node_memory_swap_used_mb Used swap in megabytes
# TYPE node_memory_swap_used_mb gauge
node_memory_swap_used_mb $swap_used_mb

# HELP node_memory_swap_usage_percent Swap usage percentage
# TYPE node_memory_swap_usage_percent gauge
node_memory_swap_usage_percent $swap_usage_percent

# HELP node_metrics_scrape_timestamp Unix timestamp of last scrape
# TYPE node_metrics_scrape_timestamp gauge
node_metrics_scrape_timestamp $(date +%s)
EOF
}

# Start HTTP server for Prometheus
if command -v python3 >/dev/null 2>&1; then
    python3 -c "
import http.server
import socketserver
import os

class MetricsHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/metrics':
            if os.path.exists('$METRICS_FILE'):
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                with open('$METRICS_FILE', 'r') as f:
                    self.wfile.write(f.read().encode())
            else:
                self.send_response(404)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

with socketserver.TCPServer(('', 9100), MetricsHandler) as httpd:
    print('Prometheus exporter started on port 9100')
    httpd.serve_forever()
" &

    HTTP_SERVER_PID=$!
    echo "Prometheus exporter started with PID: $HTTP_SERVER_PID"

    # Update metrics periodically
    while kill -0 $HTTP_SERVER_PID 2>/dev/null; do
        export_memory_metrics
        sleep $INTERVAL
    done
else
    echo "Python3 not found. Cannot start HTTP server."
    echo "Exporting metrics to file only: $METRICS_FILE"

    while true; do
        export_memory_metrics
        sleep $INTERVAL
    done
fi
```

## Troubleshooting

### Common Memory Issues

#### Diagnosing Low Memory
```bash
#!/bin/bash
# Low memory diagnosis script

echo "Memory Diagnosis Report"
echo "======================="
echo "Generated: $(date)"
echo "Hostname: $(hostname)"
echo ""

# Current memory status
echo "1. Current Memory Status:"
free -h
echo ""

# Memory breakdown
echo "2. Memory Breakdown:"
free -m | grep Mem | awk '{
    total=$2
    used=$3
    free=$4
    cache=$6
    available=$7

    printf "Total Memory: %d MB\n", total
    printf "Used Memory: %d MB (%.1f%%)\n", used, (used/total)*100
    printf "Free Memory: %d MB (%.1f%%)\n", free, (free/total)*100
    printf "Cache Memory: %d MB (%.1f%%)\n", cache, (cache/total)*100
    printf "Available Memory: %d MB (%.1f%%)\n", available, (available/total)*100
}'
echo ""

# Top memory consumers
echo "3. Top Memory-Consuming Processes:"
ps aux --sort=-%mem | head -11 | awk 'NR==1 {printf "%-10s %6s %8s %s\n", $1, $4, $6, $11; next} {printf "%-10s %6s%% %8s MB %s\n", $1, $4, int($6/1024), $11}'
echo ""

# Check for memory leaks in long-running processes
echo "4. Long-Running Processes (Potential Memory Leaks):"
ps -eo pid,etime,comm --sort=-etime | head -10 | while read pid etime comm; do
    if [ "$pid" != "PID" ] && [ -f "/proc/$pid/status" ]; then
        vmrss=$(grep VmRSS "/proc/$pid/status" 2>/dev/null | awk '{print $2}')
        vmsize=$(grep VmSize "/proc/$pid/status" 2>/dev/null | awk '{print $2}')
        printf "%-8s %-10s %-15s RSS:%8s KB VSize:%8s KB\n" "$pid" "$etime" "$comm" "${vmrss:-0}" "${vmsize:-0}"
    fi
done
echo ""

# Shared memory usage
echo "5. Shared Memory Usage:"
if command -v ipcs >/dev/null 2>&1; then
    ipcs -m | head -5
else
    echo "ipcs command not available"
fi
echo ""

# System memory information
echo "6. System Memory Information:"
if [ -f /proc/meminfo ]; then
    echo "Total RAM: $(grep MemTotal /proc/meminfo | awk '{print $2}' | awk '{print int($1/1024/1024) " GB"}')"
    echo "Free RAM: $(grep MemFree /proc/meminfo | awk '{print $2}' | awk '{print int($1/1024) " MB"}')"
    echo "Cached RAM: $(grep Cached /proc/meminfo | awk '{print $2}' | awk '{print int($1/1024) " MB"}')"
    echo "Swap Total: $(grep SwapTotal /proc/meminfo | awk '{print $2}' | awk '{print int($1/1024) " MB"}')"
    echo "Swap Free: $(grep SwapFree /proc/meminfo | awk '{print $2}' | awk '{print int($1/1024) " MB"}')"
fi
echo ""

# Recommendations
echo "7. Recommendations:"
available_mb=$(free -m | grep Mem | awk '{print $7}')
if [ "$available_mb" -lt 500 ]; then
    echo "⚠️  CRITICAL: Very low available memory ($available_mb MB)"
    echo "   - Consider killing non-essential processes"
    echo "   - Restart memory-intensive applications"
    echo "   - Add more RAM if possible"
elif [ "$available_mb" -lt 1000 ]; then
    echo "⚠️  WARNING: Low available memory ($available_mb MB)"
    echo "   - Monitor closely"
    echo "   - Identify memory-intensive applications"
    echo "   - Consider optimization"
else
    echo "✅ Available memory is adequate ($available_mb MB)"
fi

if [ "$(free | grep Swap | awk '{print $3}')" -gt 0 ]; then
    echo "⚠️  Swap space is being used - investigate memory pressure"
else
    echo "✅ No swap usage detected"
fi
```

#### Swap Usage Analysis
```bash
#!/bin/bash
# Swap usage analysis and optimization

echo "Swap Usage Analysis"
echo "==================="
echo "Generated: $(date)"
echo ""

# Current swap status
echo "1. Current Swap Status:"
free -h | grep -A1 Swap
echo ""

# Swap configuration
echo "2. Swap Configuration:"
swapon --show
echo ""

# Processes using swap
echo "3. Processes Using Swap:"
for file in /proc/*/status; do
    if [ -f "$file" ]; then
        pid=$(echo "$file" | cut -d'/' -f3)
        vm_swap=$(grep VmSwap "$file" 2>/dev/null | awk '{print $2}')
        if [ -n "$vm_swap" ] && [ "$vm_swap" -gt 0 ]; then
            comm=$(ps -p "$pid" -o comm= 2>/dev/null)
            printf "PID %-8s: %-15s %8s KB swap\n" "$pid" "${comm:-unknown}" "$vm_swap"
        fi
    fi
done | sort -k4 -nr
echo ""

# Swapiness setting
echo "4. Swap Configuration:"
echo "Current swappiness: $(cat /proc/sys/vm/swappiness 2>/dev/null || echo 'Unknown')"
echo "Recommended values:"
echo "  - Desktop: 60 (default)"
echo "  - Server: 10 (to minimize swap usage)"
echo "  - Embedded: 1 (minimal swap usage)"
echo ""

# Optimization recommendations
total_swap=$(free | grep Swap | awk '{print $2}')
used_swap=$(free | grep Swap | awk '{print $3}')

if [ "$used_swap" -gt 0 ]; then
    swap_percent=$((used_swap * 100 / total_swap))
    echo "5. Swap Usage: $swap_percent%"

    if [ "$swap_percent" -gt 25 ]; then
        echo "⚠️  HIGH SWAP USAGE - Consider:"
        echo "   - Adding more RAM"
        echo "   - Reducing swappiness"
        echo "   - Optimizing applications"
        echo "   - Identifying memory leaks"
    elif [ "$swap_percent" -gt 10 ]; then
        echo "⚠️  Moderate swap usage - Monitor closely"
    else
        echo "✅ Low swap usage - Normal operation"
    fi
else
    echo "✅ No swap usage detected"
fi

echo ""
echo "To clear swap (emergency only):"
echo "  sudo swapoff -a && sudo swapon -a"
echo "  echo 3 > /proc/sys/vm/drop_caches"
```

## Related Commands

- [`vmstat`](/docs/commands/system-info/vmstat) - Virtual memory statistics
- [`top`](/docs/commands/system-info/top) - Dynamic real-time process viewer
- [`htop`](/docs/commands/system-info/htop) - Interactive process viewer
- [`ps`](/docs/commands/file-management/ps) - Process status
- [`pmap`](/docs/commands/system-info/pmap) - Report memory map of a process
- [`slabtop`](/docs/commands/system-info/slabtop) - Kernel slab cache information
- [`sar`](/docs/commands/system-info/sar) - System activity reporter
- [`iostat`](/docs/commands/system-info/iostat) - I/O statistics
- [`/proc/meminfo`](/docs/commands/system-info/proc-meminfo) - Kernel memory information file
- [`dmesg`](/docs/commands/user-management/dmesg) - Kernel ring buffer messages

## Best Practices

### 1. **Memory Monitoring**
- Use `free -h` for quick human-readable memory checks
- Monitor the `available` column rather than just `free` memory
- Watch for swap usage as an indicator of memory pressure
- Establish baselines for normal memory usage patterns
- Set up automated monitoring and alerting

### 2. **Performance Analysis**
- Consider both physical memory and cache usage when evaluating performance
- Monitor memory trends over time rather than single snapshots
- Understand that high cache usage is generally beneficial
- Focus on available memory for capacity planning
- Correlate memory usage with application performance metrics

### 3. **Troubleshooting Methodology**
- Check both `free` and `-/+ buffers/cache` lines for complete picture
- Monitor swap usage for memory pressure indicators
- Use with other tools like `top`, `ps`, and `vmstat` for comprehensive analysis
- Consider application-specific memory requirements
- Look for memory leaks in long-running processes

### 4. **System Planning**
- Use memory history data for capacity planning
- Consider both current usage and growth patterns
- Account for cache requirements in system planning
- Monitor swap usage patterns and tune accordingly
- Plan for peak loads rather than average usage

### 5. **Integration Strategies**
- Combine memory monitoring with process monitoring tools
- Use in automated monitoring and alerting systems
- Include memory metrics in system health dashboards
- Integrate with configuration management for automated responses
- Use historical data for predictive analysis

### 6. **Optimization Techniques**
- Tune swappiness based on workload requirements
- Monitor and optimize application memory usage
- Use memory-mapping and shared memory for efficiency
- Implement proper memory management in applications
- Consider memory tiering for large datasets

## Performance Tips

1. **Use human-readable format** (`-h`) for quick visual assessment
2. **Focus on available memory** as the primary health indicator
3. **Monitor trends** rather than absolute values for better insights
4. **Combine with process monitoring** to identify memory consumers
5. **Set up continuous monitoring** for early problem detection
6. **Tune swappiness** based on your specific workload requirements
7. **Use cache efficiently** - high cache usage is typically good
8. **Monitor swap usage** as a sign of memory pressure
9. **Establish alerting thresholds** based on your environment
10. **Regular analysis** helps prevent memory-related performance issues

The `free` command is an essential tool for Linux system administration, providing quick insight into memory usage patterns and system health. Understanding free's output enables administrators to effectively monitor memory resources, identify potential performance issues, and maintain optimal system performance. Regular memory monitoring combined with proper analysis helps prevent system slowdowns, optimize resource utilization, and ensure reliable operation of Linux systems.