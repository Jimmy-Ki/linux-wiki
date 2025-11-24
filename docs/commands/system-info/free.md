---
title: free - Memory Usage Display
sidebar_label: free
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# free - Memory Usage Display

The `free` command displays the total amount of free and used physical and swap memory in the system, as well as the buffers and caches used by the kernel. It's a fundamental tool for monitoring memory usage and identifying potential memory-related performance issues.

## Basic Syntax

```bash
free [OPTIONS]
```

## Common Options

### Display Units
- `-b, --bytes` - Display memory in bytes
- `-k, --kilo` - Display memory in kilobytes (default)
- `-m, --mega` - Display memory in megabytes
- `-g, --giga` - Display memory in gigabytes
- `--tera` - Display memory in terabytes
- `-h, --human` - Show human-readable output with automatic unit scaling

### Output Options
- `-l, --lohi` - Show detailed low and high memory statistics
- `-t, --total` - Display a line showing the total memory
- `-s, --seconds N` - Continuously display memory usage every N seconds
- `-c, --count N` - Repeat the command N times and exit

### Legacy Options
- `-o` - Use old format (without -/+buffers/cache line)
- `-w, --wide` - Wide output mode (don't truncate columns)
- `-V, --version` - Display version information

## Usage Examples

### Basic Memory Display
```bash
# Default display (kilobytes)
free

# Display in megabytes
free -m

# Display in gigabytes
free -g

# Human-readable format
free -h

# Wide output (no column truncation)
free -w
```

### Detailed Memory Information
```bash
# Show low/high memory details
free -l

# Include total memory line
free -t

# Human-readable with total
free -ht

# Wide human-readable format
free -wh
```

### Continuous Monitoring
```bash
# Update every 5 seconds indefinitely
free -s 5

# Update every 2 seconds, 10 times
free -s 2 -c 10

# Monitor memory in megabytes continuously
free -ms 5

# Monitor with total line
free -ts 10
```

## Understanding the Output

### Standard Output Format
```
              total        used        free      shared  buff/cache   available
Mem:       16140816     12774804      816004       58736     2540008     2913824
Swap:       8191996           0      8191996
```

### Output Columns Explained

#### Memory Section (Mem)
- **total** - Total installed memory (RAM)
- **used** - Memory currently in use
- **free** - Memory not being used
- **shared** - Memory used (mostly) by tmpfs
- **buff/cache** - Memory used for kernel buffers and page cache
- **available** - Memory available for starting new applications without swapping

#### Swap Section (Swap)
- **total** - Total swap space
- **used** - Swap space currently used
- **free** - Unused swap space

### Legacy Format (-/+ buffers/cache)
```
              total        used        free      shared  buff/cache   available
Mem:       16140816     12774804      816004       58736     2540008     2913824
-/+ buffers/cache:     10234796     5896020
Swap:       8191996           0      8191996
```

The `-/+ buffers/cache` line shows:
- **used** (-buffers/cache): Used memory subtracting buffers and cache
- **free** (+buffers/cache): Free memory adding buffers and cache

**Calculation:**
- Used (-buffers/cache) = total used - buff/cache
- Free (+buffers/cache) = free + buff/cache

## Practical Examples

### Quick Memory Health Check
```bash
# Basic memory check
free -h

# Check available memory for applications
free -h | grep Mem | awk '{print "Available memory: " $7}'

# Check if swap is being used
free | grep Swap | awk '{if($2 != $4) print "Swap in use: " $3 "/" $2}'
```

### Memory Monitoring Script
```bash
#!/bin/bash
# Memory monitoring script

TOTAL_MB=$(free -m | grep Mem | awk '{print $2}')
USED_MB=$(free -m | grep Mem | awk '{print $3}')
FREE_MB=$(free -m | grep Mem | awk '{print $4}')
AVAILABLE_MB=$(free -m | grep Mem | awk '{print $7}')
SWAP_USED=$(free | grep Swap | awk '{print $3}')

echo "Memory Status:"
echo "Total: ${TOTAL_MB} MB"
echo "Used: ${USED_MB} MB"
echo "Free: ${FREE_MB} MB"
echo "Available: ${AVAILABLE_MB} MB"
echo "Swap Used: ${SWAP_USED} KB"

# Calculate usage percentage
USAGE_PERCENT=$((USED_MB * 100 / TOTAL_MB))
echo "Memory Usage: ${USAGE_PERCENT}%"

# Check for memory pressure
if [ $AVAILABLE_MB -lt 1000 ]; then
    echo "WARNING: Low available memory (${AVAILABLE_MB} MB)"
fi

if [ $SWAP_USED -gt 0 ]; then
    echo "WARNING: Swap space is being used (${SWAP_USED} KB)"
fi
```

### Memory Trend Analysis
```bash
#!/bin/bash
# Track memory usage over time

LOG_FILE="/tmp/memory_trend_$(date +%Y%m%d).csv"

# Create CSV header
echo "timestamp,total_mb,used_mb,free_mb,available_mb,swap_used_kb" > $LOG_FILE

# Monitor for 24 hours (every 10 minutes)
for i in {1..144}; do
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # Get memory stats
    memory_info=$(free -m | grep Mem)
    swap_info=$(free | grep Swap)

    total=$(echo $memory_info | awk '{print $2}')
    used=$(echo $memory_info | awk '{print $3}')
    free_mem=$(echo $memory_info | awk '{print $4}')
    available=$(echo $memory_info | awk '{print $7}')
    swap_used=$(echo $swap_info | awk '{print $3}')

    # Log to CSV
    echo "$timestamp,$total,$used,$free_mem,$available,$swap_used" >> $LOG_FILE

    echo "Logged: $timestamp - Memory usage: $used/${total} MB (${available} MB available)"

    sleep 600  # 10 minutes
done

echo "Memory trend saved to $LOG_FILE"
```

### Memory Alert System
```bash
#!/bin/bash
# Memory usage alert system

AVAILABLE_THRESHOLD=1000  # 1GB in MB
SWAP_THRESHOLD=100000     # 100MB in KB
ALERT_EMAIL="admin@example.com"

check_memory() {
    # Get memory info
    AVAILABLE_MB=$(free -m | grep Mem | awk '{print $7}')
    SWAP_USED=$(free | grep Swap | awk '{print $3}')
    TOTAL_MB=$(free -m | grep Mem | awk '{print $2}')
    USED_MB=$(free -m | grep Mem | awk '{print $3}')

    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    # Check available memory
    if [ $AVAILABLE_MB -lt $AVAILABLE_THRESHOLD ]; then
        echo "[$TIMESTAMP] CRITICAL: Low available memory: ${AVAILABLE_MB} MB" | \
            mail -s "Memory Alert: Low Available Memory" $ALERT_EMAIL

        # Log the alert
        logger "CRITICAL: Low available memory - ${AVAILABLE_MB} MB available"
    fi

    # Check swap usage
    if [ $SWAP_USED -gt $SWAP_THRESHOLD ]; then
        echo "[$TIMESTAMP] WARNING: Swap in use: ${SWAP_USED} KB" | \
            mail -s "Memory Alert: Swap Usage Detected" $ALERT_EMAIL

        logger "WARNING: Swap usage detected - ${SWAP_USED} KB"
    fi

    # Display current status
    echo "Memory Check - $TIMESTAMP"
    echo "Total: ${TOTAL_MB} MB, Used: ${USED_MB} MB"
    echo "Available: ${AVAILABLE_MB} MB, Swap Used: ${SWAP_USED} KB"
}

check_memory
```

### Performance Monitoring Integration
```bash
#!/bin/bash
# Combine memory monitoring with other system metrics

monitor_system() {
    # Memory info
    MEMORY_INFO=$(free -m)
    TOTAL_MEM=$(echo "$MEMORY_INFO" | grep Mem | awk '{print $2}')
    USED_MEM=$(echo "$MEMORY_INFO" | grep Mem | awk '{print $3}')
    AVAILABLE_MEM=$(echo "$MEMORY_INFO" | grep Mem | awk '{print $7}')

    # CPU info
    CPU_LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')

    # Disk info
    DISK_USAGE=$(df / | awk 'NR==2 {print $5}')

    # Timestamp
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    # Output combined metrics
    echo "$TIMESTAMP,mem_total=$TOTAL_MEM,mem_used=$USED_MEM,mem_available=$AVAILABLE_MEM,cpu_load=$CPU_LOAD,disk_usage=$DISK_USAGE" >> system_metrics.csv

    # Simple alert check
    if [ $AVAILABLE_MEM -lt 500 ]; then
        echo "ALERT: Low memory ($AVAILABLE_MEM MB available) at $TIMESTAMP" >> alerts.log
    fi
}

# Run monitoring
monitor_system
```

### Real-time Memory Dashboard
```bash
#!/bin/bash
# Real-time memory monitoring dashboard

watch -n 2 '
echo "===== System Memory Dashboard $(date) ====="
echo ""
free -h
echo ""
echo "Memory Details:"
free -l | grep Mem | awk "{printf \"Total: %s MB, Used: %s MB, Available: %s MB\n\", \$2, \$3, \$7}"
echo ""
echo "Top 5 Memory-consuming processes:"
ps aux --sort=-%mem | head -6 | awk "{printf \"%-12s %6s%% %s\\n\", \$1, \$4, \$11}"
echo ""
echo "Swap Usage:"
free | grep Swap | awk "{if(\$3>0) printf \"WARNING: Swap in use: %s KB\\n\", \$3; else printf \"No swap usage\\n\"}"
'
```

### Memory Usage Reports
```bash
#!/bin/bash
# Generate comprehensive memory report

REPORT_FILE="/tmp/memory_report_$(date +%Y%m%d_%H%M%S).txt"
HOSTNAME=$(hostname)

echo "System Memory Report" > $REPORT_FILE
echo "====================" >> $REPORT_FILE
echo "Generated: $(date)" >> $REPORT_FILE
echo "Hostname: $HOSTNAME" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Current memory status
echo "Current Memory Status:" >> $REPORT_FILE
free -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Detailed memory info
echo "Detailed Memory Information:" >> $REPORT_FILE
free -l -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# System memory information
echo "System Memory Information (/proc/meminfo):" >> $REPORT_FILE
cat /proc/meminfo | head -10 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Top memory processes
echo "Top 10 Memory-Consuming Processes:" >> $REPORT_FILE
ps aux --sort=-%mem | head -11 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Memory assessment
TOTAL_MB=$(free -m | grep Mem | awk '{print $2}')
AVAILABLE_MB=$(free -m | grep Mem | awk '{print $7}')
USAGE_PERCENT=$(( (TOTAL_MB - AVAILABLE_MB) * 100 / TOTAL_MB ))

echo "Memory Assessment:" >> $REPORT_FILE
echo "Total Memory: ${TOTAL_MB} MB" >> $REPORT_FILE
echo "Available Memory: ${AVAILABLE_MB} MB" >> $REPORT_FILE
echo "Memory Usage: ${USAGE_PERCENT}%" >> $REPORT_FILE

if [ $USAGE_PERCENT -gt 90 ]; then
    echo "Status: CRITICAL - Memory usage is very high" >> $REPORT_FILE
elif [ $USAGE_PERCENT -gt 80 ]; then
    echo "Status: WARNING - Memory usage is high" >> $REPORT_FILE
elif [ $USAGE_PERCENT -gt 70 ]; then
    echo "Status: CAUTION - Memory usage is moderate" >> $REPORT_FILE
else
    echo "Status: OK - Memory usage is normal" >> $REPORT_FILE
fi

echo "" >> $REPORT_FILE
echo "Report saved to $REPORT_FILE"
```

## Advanced Memory Analysis

### Understanding Linux Memory Management

#### Available Memory
The `available` column shows an estimation of how much memory is available for starting new applications without swapping. This includes:
- Free memory
- Reclaimable cache memory
- Reclaimable slab memory

#### Buffers vs Cache
- **Buffers**: Memory used for block device buffers (metadata about files)
- **Cache**: Memory used for page cache (actual file contents)

#### When to Worry About Memory
- **Available memory < 10% of total**: Memory pressure
- **Swap usage > 0**: System is using swap space
- **High cache but low available**: Consider cache tuning

### Memory Optimization Tips

#### Checking Memory Leaks
```bash
# Monitor memory usage over time
watch -n 60 'free -m && ps aux --sort=-%mem | head -5'

# Check for processes with growing memory usage
for i in {1..10}; do
    echo "=== Check $i at $(date) ==="
    ps aux --sort=-%mem | head -10
    sleep 300
done
```

#### Cache vs Application Memory
```bash
# See memory breakdown
free -h
echo ""
echo "Application memory (excluding cache):"
free -h | grep Mem | awk '{print "Used: " $3 " - " $5 " - " $6 " = " ($3-$5-$6) " MB"}'
```

## Best Practices

### 1. **Memory Monitoring**
- Use `free -h` for quick human-readable checks
- Monitor `available` column rather than just `free`
- Watch for swap usage as an indicator of memory pressure
- Establish baselines for normal memory usage

### 2. **Performance Analysis**
- Consider both physical memory and cache usage
- Monitor trends over time rather than single snapshots
- Understand that high cache usage is generally good
- Focus on available memory for capacity planning

### 3. **Troubleshooting**
- Check both `free` and `-/+ buffers/cache` lines
- Monitor swap usage for memory pressure indicators
- Use with other tools like `top` and `vmstat` for comprehensive analysis
- Consider application-specific memory requirements

### 4. **System Planning**
- Use memory history for capacity planning
- Consider both current usage and growth patterns
- Account for cache requirements in planning
- Monitor swap usage patterns

### 5. **Integration**
- Combine with process monitoring tools
- Use in automated monitoring scripts
- Include in system health dashboards
- Correlate with application performance metrics

## Related Commands

- [`vmstat`](/docs/commands/system-monitoring/vmstat) - Virtual memory statistics
- [`top`](/docs/commands/system-monitoring/top) - Dynamic process viewer
- [`htop`](/docs/commands/system-monitoring/htop) - Interactive process viewer
- [`ps`](/docs/commands/system-monitoring/ps) - Process status
- `/proc/meminfo` - Kernel memory information file
- [`slabtop`](/docs/commands/system-monitoring/slabtop) - Kernel slab cache information
- [`sar`](/docs/commands/system-monitoring/sar) - System activity reporter
- [`iostat`](/docs/commands/system-monitoring/iostat) - I/O statistics

## Common Issues and Solutions

### Low Available Memory
```bash
# Check what's using memory
free -h
ps aux --sort=-%mem | head -10

# Check cache usage
free -h | grep Mem
echo "Cache as percentage of total: $(free | grep Mem | awk '{printf "%.1f%%\n", $6/$2 * 100}')"
```

### Swap Usage Detected
```bash
# Check swap usage
free -h | grep Swap

# Find processes using swap
for file in /proc/*/status; do
    grep VmSwap "$file" 2>/dev/null
done | sort -k2 -nr | head -10
```

### Memory Not Released
```bash
# Check for memory leaks
watch -n 30 'free -m && ps aux --sort=-%mem | head -5'

# Clear caches (emergency only)
echo 3 > /proc/sys/vm/drop_caches
```

The `free` command is an essential tool for Linux system administration, providing quick insight into memory usage patterns. Understanding free's output enables administrators to effectively monitor memory resources, identify potential performance issues, and maintain optimal system performance. Regular memory monitoring helps prevent system slowdowns and ensures reliable operation.