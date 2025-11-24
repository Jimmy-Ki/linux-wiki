---
title: vmstat - Virtual Memory Statistics
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# vmstat - Virtual Memory Statistics

The `vmstat` command reports virtual memory statistics, providing information about processes, memory, paging, block I/O, traps, disks, and CPU activity. It's a fundamental tool for monitoring system performance and diagnosing memory-related issues.

## Basic Syntax

```bash
vmstat [OPTIONS] [DELAY [COUNT]]
```

## Common Options

### Display Options
- `-a, --active` - Display active and inactive memory statistics
- `-f, --forks` - Display number of forks since boot
- `-m, --slabs` - Display slab information
- `-n, --one-header` - Display header only once instead of periodically
- `-s, --stats` - Display event counters and memory statistics in table format
- `-d, --disk` - Display disk statistics
- `-p, --partition [DEVICE]` - Display specific disk partition statistics

### Output Options
- `-S, --unit {k|K|m|M}` - Define display unit (K=1000, k=1024, M=1000000, m=1048576)
- `-V, --version` - Display version information
- `-h, --help` - Display help message

## Usage Examples

### Basic Monitoring
```bash
# Display one-time report
vmstat

# Display summary table format
vmstat -s

# Show active and inactive memory
vmstat -a

# Show fork statistics
vmstat -f

# Show slab information
vmstat -m

# Display disk statistics
vmstat -d
```

### Continuous Monitoring
```bash
# Update every 2 seconds indefinitely
vmstat 2

# Update every 1 second, 10 times
vmstat 1 10

# Update every 5 seconds, 20 times
vmstat 5 20

# Display header only once
vmstat -n 3 10

# Show in megabytes
vmstat -S M 2 5
```

### Advanced Usage
```bash
# Monitor specific disk partition
vmstat -p /dev/sda1 2 5

# Show all available disk partitions
vmstat -p ALL

# Display combined memory and disk statistics
vmstat -ad 2 5

# Show statistics in kilobytes with active memory
vmstat -a -S k 2 10
```

## Understanding the Output

### Standard vmstat Output
```
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0      0 123456  67890 234567    0    0   100    50  200  150 10  5 85  0  0
```

#### Process Section (procs)
- **r** - Number of processes running and waiting for CPU time (run queue length)
- **b** - Number of processes in uninterruptible sleep (blocked on I/O)

#### Memory Section (memory)
- **swpd** - Virtual memory used (swap space)
- **free** - Idle memory
- **buff** - Memory used as buffer space
- **cache** - Memory used as page cache

#### Swap Section
- **si** - Memory swapped in from disk (swap in)
- **so** - Memory swapped out to disk (swap out)

#### I/O Section (io)
- **bi** - Blocks received from block device (blocks in)
- **bo** - Blocks sent to block device (blocks out)

#### System Section (system)
- **in** - Number of interrupts per second
- **cs** - Number of context switches per second

#### CPU Section (cpu) - as percentages
- **us** - User space CPU time
- **sy** - System (kernel) space CPU time
- **id** - Idle CPU time
- **wa** - I/O wait time
- **st** - Steal time (virtualization)

### Active Memory Output (-a)
```
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu------
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 987654 123456 654321    0    0    50    25  180  120 12  3 85  0  0
```

**Additional Memory Fields:**
- **inact** - Inactive memory (memory that hasn't been used recently)
- **active** - Active memory (memory that was recently used)

### Disk Statistics Output (-d)
```
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda      123      45    67890   1234    234      67    87654   2345     0      5
```

## Practical Examples

### Memory Analysis
```bash
# Check for memory pressure
vmstat 2 5

# Look for:
# - High swap activity (si/so > 0 consistently)
# - Low free memory
# - High active/inactive ratio

# Monitor memory trends
vmstat -a 5 12 | tee memory_trend.log
```

### CPU Performance Analysis
```bash
# Monitor CPU usage patterns
vmstat 1 10

# Key indicators to watch:
# - High us (user): Application CPU intensive
# - High sy (system): Kernel overhead
# - High wa (wait): I/O bottleneck
# - Low id (idle): System overloaded

# Find CPU bottlenecks
vmstat 1 | awk 'NR>3 && $13+$14>80 {print "CPU Busy: " $13"+"$14"=" ($13+$14) "%"}'
```

### I/O Performance Analysis
```bash
# Monitor I/O performance
vmstat -d 2 10

# Check for I/O bottlenecks
vmstat 2 10 | awk 'NR>3 && $14>20 {print "I/O Wait High: " $14 "%"}'

# Monitor disk activity
vmstat 2 | awk 'NR>3 {print "Read: "$9" blocks, Write: "$10" blocks"}'
```

### System Health Monitoring
```bash
#!/bin/bash
# System health monitoring script

ALERT_SWAP_THRESHOLD=1000
ALERT_WAIT_THRESHOLD=20
ALERT_QUEUE_THRESHOLD=5

monitor_system() {
    vmstat 2 5 | tail -n +4 | while read line; do
        # Extract values (skip header)
        read r b swpd free buff cache si so bi bo in cs us sy id wa st <<< $line

        # Check swap activity
        if [ $si -gt $ALERT_SWAP_THRESHOLD ] || [ $so -gt $ALERT_SWAP_THRESHOLD ]; then
            echo "ALERT: High swap activity - si=$si, so=$so"
        fi

        # Check I/O wait
        if [ $wa -gt $ALERT_WAIT_THRESHOLD ]; then
            echo "ALERT: High I/O wait - ${wa}%"
        fi

        # Check run queue
        if [ $r -gt $ALERT_QUEUE_THRESHOLD ]; then
            echo "ALERT: High run queue - r=$r"
        fi
    done
}

monitor_system
```

### Memory Leak Detection
```bash
#!/bin/bash
# Monitor for memory leaks

INTERVAL=60
ITERATIONS=60  # Monitor for 1 hour

echo "Monitoring memory usage for memory leak detection..."

for i in $(seq 1 $ITERATIONS); do
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    memory_stats=$(vmstat 1 1 | tail -n 1)

    echo "$timestamp: $memory_stats" >> memory_monitor.log

    # Extract memory values
    free=$(echo $memory_stats | awk '{print $4}')
    cache=$(echo $memory_stats | awk '{print $6}')

    # Log trend analysis
    echo "$timestamp,free=$free,cache=$cache" >> memory_trends.csv

    sleep $INTERVAL
done

echo "Memory monitoring complete. Check memory_monitor.log and memory_trends.csv"
```

### Performance Baseline Script
```bash
#!/bin/bash
# Create performance baseline

BASELINE_FILE="/tmp/system_baseline_$(date +%Y%m%d_%H%M%S).txt"
HOSTNAME=$(hostname)
TIMESTAMP=$(date)

echo "System Performance Baseline" > $BASELINE_FILE
echo "Hostname: $HOSTNAME" >> $BASELINE_FILE
echo "Timestamp: $TIMESTAMP" >> $BASELINE_FILE
echo "================================" >> $BASELINE_FILE

# System info
echo "System Information:" >> $BASELINE_FILE
uname -a >> $BASELINE_FILE
cat /proc/meminfo | grep -E "(MemTotal|MemFree|SwapTotal)" >> $BASELINE_FILE
echo "" >> $BASELINE_FILE

# VMstat baseline (average of 5 samples)
echo "VMstat Baseline (5 samples):" >> $BASELINE_FILE
vmstat 1 5 | tail -n +4 | \
    awk '{sum_r+=$1; sum_b+=$2; sum_sw+=$3; sum_fr+=$4; sum_buf+=$5; sum_cac+=$6;
          sum_si+=$7; sum_so+=$8; sum_bi+=$9; sum_bo+=$10; sum_in+=$11; sum_cs+=$12;
          sum_us+=$13; sum_sy+=$14; sum_id+=$15; sum_wa+=$16}
         END {printf "r=%.1f b=%.1f swpd=%.1f free=%.1f buff=%.1f cache=%.1f si=%.1f so=%.1f bi=%.1f bo=%.1f in=%.1f cs=%.1f us=%.1f sy=%.1f id=%.1f wa=%.1f\n",
                sum_r/5, sum_b/5, sum_sw/5, sum_fr/5, sum_buf/5, sum_cac/5, sum_si/5, sum_so/5, sum_bi/5, sum_bo/5, sum_in/5, sum_cs/5, sum_us/5, sum_sy/5, sum_id/5, sum_wa/5}' >> $BASELINE_FILE

echo "Baseline saved to $BASELINE_FILE"
```

### Real-time Monitoring Dashboard
```bash
#!/bin/bash
# Real-time monitoring dashboard

watch -n 2 '
echo "===== System Monitor $(date) ====="
echo "Memory Status:"
vmstat 1 1 | tail -n 1 | awk "{printf \"Free: %d MB, Cache: %d MB, Swap: %d MB\n\", \$4/1024, \$6/1024, \$3/1024}"

echo ""
echo "CPU Status:"
vmstat 1 1 | tail -n 1 | awk "{printf \"User: %d%%, System: %d%%, Idle: %d%%, Wait: %d%%\n\", \$13, \$14, \$15, \$16}"

echo ""
echo "I/O Status:"
vmstat 1 1 | tail -n 1 | awk "{printf \"Blocks in: %d, Blocks out: %d, Wait: %d%%\n\", \$9, \$10, \$16}"

echo ""
echo "Process Status:"
vmstat 1 1 | tail -n 1 | awk "{printf \"Running: %d, Blocked: %d, Context Switches: %d\n\", \$1, \$2, \$12}"
'
```

## Performance Analysis Guidelines

### Interpreting Key Metrics

#### Process Queue (r and b)
- **r (run queue)**:
  - 0-2: Healthy for single-core systems
  - 0-4: Healthy for multi-core systems
  - >5: Potential CPU bottleneck
- **b (blocked)**:
  - Consistently >0: I/O bottleneck or disk issues

#### Memory Metrics
- **swap activity (si/so)**:
  - Consistently >0: Memory pressure
  - Occasional spikes: Normal during memory-intensive operations
- **free vs cache**: Low free memory is normal if cache is high
- **cache size**: High cache is generally good (indicates effective caching)

#### CPU Metrics
- **us + sy < 80%**: Good performance
- **wa > 20%**: I/O bottleneck
- **id < 20%**: System overloaded

#### I/O Metrics
- **bi + bo**: High values indicate active disk I/O
- **Monitor trends** rather than absolute values

### Common Performance Scenarios

#### Memory Shortage
```
High swap activity (si/so > 0)
Low free memory
High active memory
```

#### CPU Bottleneck
```
High r values (run queue)
High us + sy percentages
Low id (idle) percentage
```

#### I/O Bottleneck
```
High b values (blocked processes)
High wa percentage
Low disk performance metrics
```

## Best Practices

### 1. **Monitoring Strategy**
- Establish baselines during normal operation
- Monitor trends rather than single snapshots
- Use appropriate intervals for your monitoring needs
- Correlate vmstat data with application performance

### 2. **Performance Analysis**
- Look for consistent patterns, not temporary spikes
- Monitor multiple metrics simultaneously
- Consider system specifications when interpreting values
- Document performance characteristics over time

### 3. **Troubleshooting Workflow**
1. Check run queue (r) and blocked processes (b)
2. Analyze memory usage (swap activity)
3. Review CPU utilization patterns
4. Examine I/O wait times
5. Correlate with application performance

### 4. **Alert Thresholds**
- Customize thresholds based on your system
- Consider multi-core systems when setting r threshold
- Account for expected application behavior
- Implement gradual alerting (warning vs critical)

### 5. **Long-term Monitoring**
- Store historical data for trend analysis
- Automate regular baseline measurements
- Integrate with monitoring systems
- Plan capacity based on growth trends

## Related Commands

- [`free`](/docs/commands/system-monitoring/free) - Display memory usage
- [`top`](/docs/commands/system-monitoring/top) - Dynamic process viewer
- [`iostat`](/docs/commands/system-monitoring/iostat) - I/O statistics
- [`sar`](/docs/commands/system-monitoring/sar) - System activity reporter
- [`mpstat`](/docs/commands/system-monitoring/mpstat) - CPU statistics
- [`pidstat`](/docs/commands/system-monitoring/pidstat) - Process statistics
- [`ps`](/docs/commands/system-monitoring/ps) - Process status
- [`uptime`](/docs/commands/system-monitoring/uptime) - System uptime and load

## Common Issues and Solutions

### High Memory Usage
```bash
# Check if memory pressure is real
vmstat -a 5 3

# Look for swap activity
vmstat 2 10 | awk '$7>0 || $8>0 {print "Swap activity detected"}'
```

### High I/O Wait
```bash
# Identify I/O bottlenecks
vmstat 2 5 | awk '$16>20 {print "High I/O wait: " $16 "%"}'

# Check disk activity
vmstat -d 2 5
```

### High CPU Load
```bash
# Monitor CPU usage patterns
vmstat 1 10

# Check for context switch storms
vmstat 1 | awk '$12>1000 {print "High context switches: " $12}'
```

The `vmstat` command is an essential tool for Linux system monitoring and performance analysis. Understanding vmstat's output enables you to diagnose memory issues, identify CPU bottlenecks, and detect I/O problems. Regular vmstat monitoring helps maintain optimal system performance and provides early warning of potential issues.