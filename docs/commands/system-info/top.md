---
title: top - Display Linux Processes
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# top - Display Linux Processes

The `top` command provides a dynamic real-time view of a running system. It displays system summary information and a list of processes or threads currently being managed by the Linux kernel. It's one of the most essential tools for system monitoring and process management.

## Basic Syntax

```bash
top [OPTIONS]
```

## Common Options

- `-b, --batch` - Run in batch mode, useful for sending output to other programs or files
- `-c, --command` - Toggle between command name and full command line display
- `-d, --delay=SEC` - Set screen refresh interval in seconds (default 5 seconds)
- `-H, --threads` - Show individual threads
- `-i, --idle-procs` - Toggle idle processes display
- `-n, --iterations=NUM` - Limit number of updates before exiting
- `-p, --pid=PID[,PID...]` - Monitor only specific PIDs
- `-s, --secure` - Run in secure mode, disabling certain interactive commands
- `-S, --cumulative` - Toggle cumulative mode
- `-u, --user=USERNAME` - Monitor only processes for specific user
- `-v, --version` - Display version information

## Interactive Commands

### Display Control Commands
- `h` or `?` - Show help screen with command summary
- `C` - Toggle multiplexed CPU or per-core statistics
- `1` - Toggle showing individual CPUs or combined CPU statistics
- `f` or `F` - Add/remove fields from display
- `o` or `O` - Change field display order
- `L` - Toggle location of highlighted tasks

### Process Management Commands
- `k` - Kill a process (prompts for PID and signal)
- `r` - Renice a process (change priority)
- `i` - Toggle idle/zombie processes visibility
- `q` - Quit top program

### Display Toggle Commands
- `t` - Toggle task/CPU states display
- `m` - Toggle memory information display
- `l` - Toggle load average/uptime display
- `c` - Toggle command name/full command line
- `s` - Change refresh delay time

### Sorting Commands
- `P` - Sort by CPU usage (default)
- `M` - Sort by memory usage
- `T` - Sort by time/cumulative time
- `N` - Sort by PID
- `A` - Sort by age (newest first)
- `U` - Sort by user name

### Color and Other Commands
- `z` - Toggle color/mono display
- `x` - Toggle highlights for sort field
- `y` - Toggle highlights for running tasks
- `Z` - Set color scheme
- `w` - Write current configuration to ~/.toprc

## Usage Examples

### Basic Monitoring
```bash
# Run top with default settings
top

# Run top with faster refresh (1 second)
top -d 1

# Run top with custom refresh interval
top -d 2.5

# Run for specific number of updates then exit
top -n 10

# Run in batch mode (useful for scripts)
top -b -n 1

# Monitor specific process
top -p 1234

# Monitor multiple processes
top -p 1234,5678,9012

# Monitor processes for specific user
top -u username

# Show threads instead of processes
top -H
```

### Output to File
```bash
# Save current snapshot to file
top -b -n 1 > top_snapshot.txt

# Monitor and log to file every minute
while true; do
    echo "=== $(date) ===" >> top_log.txt
    top -b -n 1 >> top_log.txt
    sleep 60
done

# Get top 10 CPU consuming processes
top -b -n 1 | head -17 | tail -10
```

## Understanding the Display

### Summary Area (First 5 Lines)
```
top - 09:44:56 up 16 days, 21:23,  1 user,  load average: 9.59, 4.75, 1.92
Tasks: 145 total,   2 running, 143 sleeping,   0 stopped,   0 zombie
%Cpu(s): 99.8%us,  0.1%sy,  0.0%ni,  0.2%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st
KiB Mem :  4147888 total,  2493092 used,  1654796 free,   158188 buffers
KiB Swap:  5144568 total,       56 used,  5144512 free,  2013180 cached
```

**Line 1 - System Info:**
- Current time: `09:44:56`
- System uptime: `up 16 days, 21:23`
- Number of users: `1 user`
- Load average: `9.59, 4.75, 1.92` (1, 5, 15 minute averages)

**Line 2 - Task Summary:**
- `145 total` - Total number of processes
- `2 running` - Currently running processes
- `143 sleeping` - Sleeping processes
- `0 stopped` - Stopped processes
- `0 zombie` - Zombie processes

**Line 3 - CPU Usage:**
- `99.8%us` - User space processes
- `0.1%sy` - Kernel processes
- `0.0%ni` - User priority processes
- `0.2%id` - Idle
- `0.0%wa` - Waiting for I/O
- `0.0%hi` - Hardware interrupts
- `0.0%si` - Software interrupts
- `0.0%st` - Steal time (virtualization)

**Line 4 - Memory Usage:**
- `4147888 total` - Total physical memory
- `2493092 used` - Used memory
- `1654796 free` - Free memory
- `158188 buffers` - Kernel buffers

**Line 5 - Swap Usage:**
- `5144568 total` - Total swap space
- `56 used` - Used swap
- `5144512 free` - Free swap
- `2013180 cached` - Cached swap

### Process Table Columns
- `PID` - Process ID
- `USER` - Process owner
- `PR` - Priority
- `NI` - Nice value
- `VIRT` - Virtual memory used
- `RES` - Resident memory (physical memory)
- `SHR` - Shared memory
- `S` - Process status (S=Sleeping, R=Running, Z=Zombie)
- `%CPU` - CPU usage percentage
- `%MEM` - Memory usage percentage
- `TIME+` - Total CPU time
- `COMMAND` - Command name

## Practical Examples

### Finding Resource-Intensive Processes
```bash
# Find top 10 CPU consuming processes in batch mode
top -b -n 1 | grep -E "^[0-9]" | sort -k9 -nr | head -10

# Find top 10 memory consuming processes
top -b -n 1 | grep -E "^[0-9]" | sort -k10 -nr | head -10

# Monitor processes consuming more than 50% CPU
watch -n 1 "top -b -n 1 | awk 'NR>7 && \$9>50 {print}'"

# Monitor system health continuously
top -d 10 -b | tee system_monitor.log
```

### Process Management with Top
```bash
# Start top and immediately sort by memory
top -M

# Monitor specific user's processes
top -u apache

# Monitor specific command
top -p $(pgrep -d ',' httpd)

# Interactive usage workflow:
# 1. Start top
# 2. Press 'M' to sort by memory
# 3. Press 'k' to kill problematic process
# 4. Enter PID of process to kill
# 5. Enter signal number (9 for SIGKILL)
# 6. Press 'q' to quit
```

### Customizing Display
```bash
# Show all threads for a specific process
top -H -p 1234

# Monitor system with minimal refresh delay
top -d 0.5

# Display only running processes (press 'i' to toggle idle processes)
top

# Change color scheme (press 'Z' for color options)
top

# Save configuration for future sessions
# (Press 'w' in top to save current settings)
```

### System Health Monitoring
```bash
# Monitor system load and alert if high
while true; do
    load=$(top -b -n 1 | grep "load average" | awk '{print $NF}')
    if (( $(echo "$load > 5.0" | bc -l) )); then
        echo "High load detected: $load at $(date)"
    fi
    sleep 60
done

# Monitor memory usage and alert if low
while true; do
    mem_free=$(top -b -n 1 | grep "Mem:" | awk '{print $8}')
    if [ "$mem_free" -lt 100000 ]; then
        echo "Low memory: ${mem_free}KB free at $(date)"
    fi
    sleep 30
done

# Generate system report
echo "=== System Report $(date) ==="
top -b -n 1 | head -5
echo ""
echo "Top 5 CPU processes:"
top -b -n 1 | grep -E "^[0-9]" | sort -k9 -nr | head -5
echo ""
echo "Top 5 Memory processes:"
top -b -n 1 | grep -E "^[0-9]" | sort -k10 -nr | head -5
```

### Server Monitoring Script
```bash
#!/bin/bash
# Monitor server health using top

LOG_FILE="/var/log/server_monitor.log"
ALERT_THRESHOLD_CPU=80
ALERT_THRESHOLD_MEM=90

monitor_system() {
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")

    # Get system summary
    summary=$(top -b -n 1 | head -5)

    # Check for high CPU processes
    high_cpu=$(top -b -n 1 | grep -E "^[0-9]" | awk -v threshold=$ALERT_THRESHOLD_CPU '$9>threshold {print $1, $12, $9"%"}')

    # Check for high memory processes
    high_mem=$(top -b -n 1 | grep -E "^[0-9]" | awk -v threshold=$ALERT_THRESHOLD_MEM '$10>threshold {print $1, $12, $10"%"}')

    # Log results
    echo "=== $timestamp ===" >> $LOG_FILE
    echo "$summary" >> $LOG_FILE

    if [ -n "$high_cpu" ]; then
        echo "High CPU processes detected:" >> $LOG_FILE
        echo "$high_cpu" >> $LOG_FILE
    fi

    if [ -n "$high_mem" ]; then
        echo "High Memory processes detected:" >> $LOG_FILE
        echo "$high_mem" >> $LOG_FILE
    fi

    echo "" >> $LOG_FILE
}

# Run monitor
monitor_system
```

## Advanced Configuration

### Customizing Fields
```bash
# Access field management (press 'f' in top)
# Available fields include:
# CODE = Code size
# DATA = Data+Stack size
# COMMAND = Command name
# COMMAND_LINE = Full command
# FLAGS = Task flags
# GID = Group ID
# MAJFLT = Major faults
# MINFLT = Minor faults
# nDRT = Dirty pages count
# P = Last used CPU
# PR = Priority
# RES = Resident memory
# SHR = Shared memory
# S = Process status
# SUID = Saved user ID
# SWAP = Swapped size
# TIME = CPU time
# TIME+ = CPU time, hundredths
# TPGID = Tty process group ID
# TTY = Controlling tty
# UID = User ID
# USED = Memory used (RES+SWAP)
# USER = Username
# VIRT = Virtual memory
# WCHAN = Sleeping in function

# Example: Add CODE and DATA fields
# 1. Press 'f'
# 2. Navigate to CODE field
# 3. Press 'd' to add to display
# 4. Navigate to DATA field
# 5. Press 'd' to add to display
# 6. Press 'q' to return
```

### Configuration File (~/.toprc)
```bash
# Example ~/.toprc file
# Generated by 'w' command in top

top's Config File (Linux process table)
Field separators for defaults fields:    0 0 0 0
Show command path (c) = 1
Sort order (x) = 0
Mono mode (m) = 0
Secure mode (s) = 0
Cumulative mode (S) = 1
Delay time (d) = 5.0
Window fields:    PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND
Window flags:     439484 0 0 0 0 0 0 0 0 0 0 0 0 0
```

## Best Practices

### 1. **Regular Monitoring**
- Use top for quick system health checks
- Monitor load averages relative to CPU count
- Track memory trends over time
- Watch for zombie processes

### 2. **Effective Process Management**
- Use sorting options to identify resource hogs
- Kill processes only when necessary
- Understand the difference between signals (SIGTERM vs SIGKILL)
- Monitor processes before taking action

### 3. **Customization**
- Save frequently used configurations
- Customize field display for your needs
- Use appropriate refresh intervals
- Set up color schemes for better visibility

### 4. **Script Integration**
- Use batch mode for automated monitoring
- Combine with other tools for comprehensive monitoring
- Create alert systems based on thresholds
- Log system states for trend analysis

### 5. **Performance Considerations**
- Increase refresh interval on busy systems
- Use specific process monitoring when possible
- Avoid running top continuously on production systems
- Consider alternatives like htop for better usability

## Related Commands

- [`htop`](/docs/commands/system-monitoring/htop) - Enhanced process viewer with better interface
- [`ps`](/docs/commands/system-monitoring/ps) - Process status viewer
- [`kill`](/docs/commands/system-monitoring/kill) - Send signals to processes
- [`nice`](/docs/commands/system-monitoring/nice) - Change process priority
- [`renice`](/docs/commands/system-monitoring/renice) - Modify running process priority
- [`vmstat`](/docs/commands/system-monitoring/vmstat) - Virtual memory statistics
- [`iostat`](/docs/commands/system-monitoring/iostat) - I/O statistics
- [`free`](/docs/commands/system-monitoring/free) - Memory usage display
- [`uptime`](/docs/commands/system-monitoring/uptime) - System uptime and load average

## Common Issues and Solutions

### High System Load
```bash
# Identify processes causing high load
top -o %CPU

# Check system-wide resource usage
top -b -n 1 | head -10

# Monitor specific time periods
top -d 30 -n 20
```

### Memory Issues
```bash
# Sort by memory usage
top -o %MEM

# Check for memory leaks
top -b -n 1 | grep -E "^[0-9]" | sort -k10 -nr

# Monitor swap usage
top -b -n 1 | grep "Swap"
```

### Zombie Processes
```bash
# Show zombie processes
top -i

# Find parent of zombie processes
ps -eo pid,ppid,stat,comm | awk '$3 ~ /^Z/ { print }'
```

The `top` command is an essential tool for Linux system administration. Mastering its features and understanding the information it provides will help you effectively monitor and manage system resources, troubleshoot performance issues, and maintain optimal system health.