---
title: htop - Interactive Process Viewer
sidebar_label: htop
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# htop - Interactive Process Viewer

`htop` is an interactive, real-time process monitoring tool for Linux systems. It provides a more user-friendly and feature-rich alternative to the traditional `top` command, offering mouse support, color-coded displays, and intuitive process management capabilities.

## Basic Syntax

```bash
htop [OPTIONS]
```

## Common Options

- `-C, --no-color` - Use a monochrome color scheme
- `-d, --delay=DELAY` - Set update delay in tenths of a second (default 1.5)
- `-s, --sort-key=COLUMN` - Sort by a specific column
- `-u, --user=USERNAME` - Show only processes for a specific user
- `-p, --pid=PID[,PID,PID...]` - Show only specified PIDs
- `-t, --tree` - Show processes in tree view by default
- `-v, --version` - Display version information
- `-h, --help` - Display help message

## Interactive Commands

### Navigation and Selection
- `↑` or `k` - Move cursor up
- `↓` or `j` - Move cursor down
- `PgUp` or `Ctrl+U` - Move cursor up one page
- `PgDn` or `Ctrl+D` - Move cursor down one page
- `Home` - Go to first process
- `End` - Go to last process
- `Space` - Tag/untag process for multi-process operations
- `Left`/`Right` - Scroll process list horizontally

### Search and Filtering
- `/` or `F3` - Search for process by name
- `\` or `F4` - Filter processes by keyword
- `Ctrl+L` - Clear search/filter

### Process Management
- `F7` or `[` - Decrease nice value (increase priority)
- `F8` or `]` - Increase nice value (decrease priority)
- `F9` or `k` - Kill selected process
- `Ctrl+K` - Kill all tagged processes

### Display Options
- `F1` or `h` or `?` - Show help screen
- `F2` or `S` - Setup/configuration menu
- `F5` or `t` - Toggle tree view
- `F6` or `<` or `>` - Select sort column
- `F10` or `q` - Quit htop

### Toggle Commands
- `H` - Toggle show/hide user threads
- `K` - Toggle show/hide kernel threads
- `P` - Sort by CPU usage (default)
- `M` - Sort by memory usage
- `T` - Sort by time
- `I` - Invert sort order

### Advanced Features
- `l` - Show open files for selected process (requires lsof)
- `s` - Trace system calls for selected process (requires strace)
- `u` - Show processes for specific user
- `U` - Untag all processes

## Usage Examples

### Basic Usage
```bash
# Start htop with default settings
htop

# Start with specific refresh interval (1 second)
htop -d 10

# Start htop in tree view
htop -t

# Show processes for specific user
htop -u username

# Show specific PIDs
htop -p 1234,5678,9012

# Start without colors
htop -C

# Start sorted by memory usage
htop -s PERCENT_MEM
```

### Monitoring Specific Applications
```bash
# Monitor all processes for web server user
htop -u www-data

# Monitor specific application processes
htop -p $(pgrep -d ',' nginx)

# Monitor Java processes
htop -p $(pgrep -d ',' java)

# Monitor Docker containers
htop -p $(pgrep -d ',' docker)

# Show only user processes (no kernel threads)
htop --pid=$(ps -u $USER -o pid=)
```

### Custom Sorting and Filtering
```bash
# Sort by memory usage from start
htop -s PERCENT_MEM

# Sort by process ID
htop -s PID

# Sort by process name
htop -s COMMAND

# Filter to show only specific processes
# (After starting, press F4 and enter filter)

# Search for specific process
# (After starting, press F3 and enter search term)
```

## Configuration and Setup

### Setup Menu (F2)

#### 1. Meters Configuration
**Left/Right Columns:**
- CPU: Individual CPU cores or combined usage
- Memory: Physical and swap memory usage
- Tasks: Process counts by state
- Load average: System load averages
- Uptime: System uptime
- Battery: Battery status (if available)
- Clock: Current time

**Meter Types:**
- Bar: Progress bar visualization
- LED: Light indicators
- Text: Numeric display

#### 2. Display Options
- Tree view: Hierarchical process display
- Shadow other users' processes
- Hide kernel threads
- Hide user threads
- Show program path
- Highlight new processes
- Highlight lost processes
- Color schemes
- Update process names
- Account guest CPU time

#### 3. Colors
Choose from pre-defined color schemes:
- Default (Blue/White)
- Monochrome
- Dark Gray
- Light Gray
- Black Night
- VT100
- MC (Midnight Commander style)

#### 4. Columns
Available columns include:
- PID - Process ID
- PPID - Parent Process ID
- USER - Process owner
- PGRP - Process group ID
- TTY - Controlling terminal
- STATE - Process state
- NICE - Nice value
- VIRT - Virtual memory
- RES - Resident memory
- SHR - Shared memory
- S - Process status
- %CPU - CPU usage percentage
- %MEM - Memory usage percentage
- TIME+ - CPU time
- COMMAND - Command name
- UID - User ID
- GID - Group ID
- TPGID - Tty process group ID
- NLWP - Number of threads
- PRIORITY - Process priority
- M_RESIDENT - Memory resident
- M_SIZE - Memory size
- M_TRS - Text resident size
- M_SHARE - Shared memory size
- M_LIB - Library size
- M_DT - Dirty pages size
- STAT - Process status
- FLAGS - Process flags
- WCHAN - Kernel function where process is sleeping

## Practical Examples

### Server Performance Monitoring
```bash
# Monitor web server performance
htop -u www-data

# Check for memory leaks in application
htop -s PERCENT_MEM

# Monitor database processes
htop -u postgres

# Real-time monitoring during load testing
htop -d 5 -s %CPU

# Monitor system during backup operations
htop -t -d 10
```

### Process Management Workflow
```bash
# Interactive process killing workflow:
# 1. Start htop
htop

# 2. Search for problematic process (press F3)
# 3. Type process name (e.g., "chrome")
# 4. Select process with arrow keys
# 5. Press F9 to kill
# 6. Choose signal (9 for SIGKILL)
# 7. Confirm and watch process disappear

# Priority adjustment workflow:
# 1. Select process
# 2. Press F7 to increase priority (lower nice value)
# 3. Press F8 to decrease priority (higher nice value)

# Multi-process operations:
# 1. Tag multiple processes with Space bar
# 2. Press F9 to kill all tagged
# 3. Press Ctrl+K for alternative kill method
```

### System Diagnostics
```bash
# Check for zombie processes
htop
# Press F4, filter by "zombie" or check STATE column

# Monitor I/O wait issues
htop -s %CPU
# Look for processes in "D" state (uninterruptible sleep)

# Find memory hogs
htop -s PERCENT_MEM

# Check CPU-bound processes
htop -s %CPU

# Monitor threaded applications
htop -t  # Tree view shows parent-child relationships

# Check system responsiveness under load
htop -d 2  # Faster updates for real-time monitoring
```

### Custom Monitoring Scripts
```bash
#!/bin/bash
# Automated monitoring script

MONITOR_USER="www-data"
LOG_FILE="/var/log/process_monitor.log"
ALERT_CPU_THRESHOLD=80
ALERT_MEM_THRESHOLD=90

# Function to log system state
log_system_state() {
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    echo "=== $timestamp ===" >> $LOG_FILE

    # Get high CPU processes
    htop -b -n 1 -u $MONITOR_USER | \
        awk -v threshold=$ALERT_CPU_THRESHOLD 'NR>7 && $9>threshold {print $1,$12,$9"%"}' >> $LOG_FILE

    # Get high memory processes
    htop -b -n 1 -u $MONITOR_USER | \
        awk -v threshold=$ALERT_MEM_THRESHOLD 'NR>7 && $10>threshold {print $1,$12,$10"%"}' >> $LOG_FILE

    echo "" >> $LOG_FILE
}

# Run monitoring
log_system_state
```

### Batch Mode Operations
```bash
# Export current process list
htop -b -n 1 > process_snapshot.txt

# Monitor and log specific user processes
while true; do
    echo "=== $(date) ===" >> user_processes.log
    htop -b -n 1 -u username >> user_processes.log
    sleep 300  # Every 5 minutes
done

# Get top 10 CPU processes in CSV format
htop -b -n 1 | tail -n +8 | head -10 | \
    awk '{print $1","$2","$9","$10","$12}' > top_cpu.csv

# System health report
echo "System Health Report - $(date)" > health_report.txt
htop -b -n 1 | head -10 >> health_report.txt
echo "" >> health_report.txt
echo "Top CPU Consumers:" >> health_report.txt
htop -b -n 1 | tail -n +8 | sort -k9 -nr | head -5 >> health_report.txt
```

## Advanced Features

### Tree View Mode
```bash
# Start in tree view
htop -t

# Toggle tree view during runtime
# Press F5 or 't'

# Tree view benefits:
# - See parent-child process relationships
# - Understand process hierarchies
# - Identify orphaned processes
# - Track process spawning patterns
```

### Process Tracing Integration
```bash
# Trace system calls for selected process
# 1. Select process in htop
# 2. Press 's' to start strace
# 3. Press 'q' to stop tracing

# View open files for process
# 1. Select process in htop
# 2. Press 'l' to list open files (requires lsof)
```

### Custom Color Schemes
```bash
# Access color configuration
# Press F2 -> Colors

# Common color scheme customizations:
# - CPU meters: Blue (normal), Red (high usage)
# - Memory meters: Green (normal), Yellow (warning), Red (critical)
# - Process states: Different colors for running, sleeping, zombie
# - Priority levels: Color coding for nice values
```

### Performance Monitoring Setup
```bash
# Create custom htop configuration for monitoring
# ~/.config/htop/htoprc

# Example configuration snippet:
fields=0 48 17 18 38 39 40 2 46 47 49 1
sort_key=46
sort_direction=1
hide_threads=0
hide_kernel_threads=0
hide_userland_threads=0
shadow_other_users=0
show_thread_names=0
highlight_base_name=0
highlight_megabytes=1
highlight_threads=0
tree_view=1
header_margin=1
detailed_cpu_time=0
cpu_count_from_one=0
update_process_names=0
account_guest_in_cpu_meter=0
color_scheme=0
delay=15
left_meters=AllCPUs Memory Swap
left_meter_modes=1 1 1
right_meters=Tasks LoadAverage Uptime
right_meter_modes=2 2 2
```

## Installation

### Package Manager Installation
```bash
# Debian/Ubuntu
sudo apt update
sudo apt install htop

# CentOS/RHEL/Rocky Linux
sudo yum install htop
# or
sudo dnf install htop

# Fedora
sudo dnf install htop

# Arch Linux
sudo pacman -S htop

# openSUSE
sudo zypper install htop

# Gentoo
sudo emerge htop

# FreeBSD
sudo pkg install htop
```

### Snap Installation
```bash
sudo snap install htop
```

### Source Installation
```bash
# Prerequisites
sudo apt install build-essential ncurses-dev

# Download and compile
wget https://hisham.hm/htop/releases/2.2.0/htop-2.2.0.tar.gz
tar -xzf htop-2.2.0.tar.gz
cd htop-2.2.0/

./configure
make
sudo make install
```

## Best Practices

### 1. **Effective Monitoring**
- Use tree view to understand process relationships
- Sort by relevant metrics for current investigation
- Tag multiple processes for batch operations
- Utilize search and filter features for quick navigation

### 2. **Performance Considerations**
- Increase delay interval on slow systems
- Use specific user filtering to reduce noise
- Monitor only necessary metrics to reduce overhead
- Consider batch mode for automated monitoring

### 3. **Process Management**
- Understand different signal types before killing processes
- Use nice value adjustments before killing processes
- Monitor process behavior after priority changes
- Keep track of parent-child relationships

### 4. **Customization**
- Save frequently used configurations
- Customize meter display for your monitoring needs
- Set up appropriate color schemes for your environment
- Configure column display for relevant information

### 5. **Integration**
- Use htop as first-line diagnostic tool
- Combine with other tools like strace and lsof
- Integrate into monitoring scripts and automation
- Use batch output for logging and reporting

## Related Commands

- [`top`](/docs/commands/system-monitoring/top) - Traditional Linux process viewer
- [`ps`](/docs/commands/system-monitoring/ps) - Process status display
- [`kill`](/docs/commands/system-monitoring/kill) - Send signals to processes
- [`nice`](/docs/commands/system-monitoring/nice) - Modify process priority
- [`renice`](/docs/commands/system-monitoring/renice) - Change running process priority
- [`strace`](/docs/commands/system-monitoring/strace) - System call tracer
- [`lsof`](/docs/commands/system-monitoring/lsof) - List open files
- [`vmstat`](/docs/commands/system-monitoring/vmstat) - Virtual memory statistics
- [`iostat`](/docs/commands/system-monitoring/iostat) - I/O statistics

## Common Issues and Solutions

### Htop Not Available
```bash
# Error: htop: command not found
# Solution: Install htop using package manager
sudo apt install htop  # Ubuntu/Debian
sudo yum install htop  # CentOS/RHEL
```

### Performance Issues
```bash
# System slow when running htop
# Solution: Increase update delay
htop -d 30  # Update every 3 seconds

# High CPU usage by htop itself
# Solution: Use specific filtering
htop -u username  # Monitor specific user only
```

### Display Issues
```bash
# Colors not displaying correctly
# Solution: Use monochrome mode
htop -C

# Terminal display issues
# Solution: Check terminal compatibility
export TERM=xterm-256color
```

`htop` provides an intuitive and powerful interface for Linux process monitoring. Its mouse support, color-coded displays, and comprehensive process management features make it an essential tool for system administrators and developers alike. Understanding htop's capabilities will help you efficiently monitor system resources, troubleshoot performance issues, and manage processes effectively.