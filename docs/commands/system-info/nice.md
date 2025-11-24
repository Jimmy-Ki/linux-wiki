---
title: nice - Set process priority
slug: nice
tags: [process-management, linux-commands]
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# nice - Set process priority

The `nice` command runs a program with modified scheduling priority. It allows you to control the relative importance of processes, with higher niceness values meaning lower priority.

## Syntax

```bash
nice [OPTION] [COMMAND [ARG]...]
```

## Common Options

- `-n, --adjustment N`: Add niceness value N (default is 10)
- `--help`: Display help message
- `--version`: Display version information

### Niceness Range
- **-20**: Highest priority (requires superuser)
- **0**: Default priority
- **19**: Lowest priority

## Usage Examples

### Basic Usage
```bash
# Run command with default niceness (10)
nice long_running_task

# Run command with specific niceness
nice -n 15 cpu_intensive_task

# Run command with higher priority (requires root)
sudo nice -n -5 important_task
```

### Different Niceness Values
```bash
# Very low priority (niceness 19)
nice -n 19 backup_script.sh

# Low priority (niceness 15)
nice -n 15 make

# Medium priority (niceness 5)
nice -n 5 compilation_task

# High priority (niceness -5, requires root)
sudo nice -n -5 critical_service

# Highest priority (niceness -20, requires root)
sudo nice -n -20 emergency_process
```

### Development Tasks
```bash
# Compile with low priority
nice -n 15 make

# Run tests with medium priority
nice -n 10 make test

# Build documentation with very low priority
nice -n 19 make docs
```

### System Maintenance
```bash
# Run backup with low priority
nice -n 15 backup_system.sh

# Run log rotation with low priority
nice -n 10 logrotate

# Update packages with low priority
nice -n 15 apt upgrade
```

### Without Command (Show Current Niceness)
```bash
# Display current niceness
nice
# Output: 0 (default)

# Show nice value of current shell
nice --help
```

### Combined with Other Commands
```bash
# Run find with low priority
nice -n 15 find / -name "*.log"

# Run compression with low priority
nice -n 19 tar czf backup.tar.gz /home

# Run database operations with medium priority
nice -n 5 mysql_dump database.sql
```

### Script Usage
```bash
#!/bin/bash
# Run background tasks with appropriate niceness

# Archive logs with low priority
nice -n 15 find /var/log -name "*.old" -delete

# Update system with low priority
nice -n 15 apt update && nice -n 15 apt upgrade -y

# Generate reports with low priority
nice -n 10 python generate_reports.py
```

### Relative Niceness
```bash
# Add 10 to current niceness (default behavior)
nice long_task

# Add 5 to current niceness
nice -n 5 medium_task

# Subtract 5 from current niceness (requires privileges)
sudo nice -n -5 high_priority_task
```

## Understanding Niceness

### Niceness Values
- **Range**: -20 to 19
- **Default**: 0
- **Default increment**: +10 when no value specified
- **Higher value** = Lower priority (nicer to other processes)
- **Lower value** = Higher priority (less nice to other processes)

### Priority Levels
```bash
# Real-time priorities (for comparison)
# These are managed by different commands (chrt, schedtool)

# User priorities (nice values)
-20  -19  -18  ...  -2  -1   0   1   2  ...  18  19
Highest                           Default                         Lowest
```

### Current Shell Niceness
```bash
# Check current shell's niceness
nice

# Check niceness of running process
ps -o pid,nice,comm -p 1234
```

## Best Practices

1. **Use positive niceness values** for background tasks
2. **Use negative niceness values** sparingly and only with root
3. **Set appropriate niceness** based on task importance
4. **Use in scripts** for background processing:
   ```bash
   # Low priority backup
   nice -n 15 backup_script.sh
   ```
5. **Resource-intensive tasks**:
   ```bash
   # Run compilation with low priority
   nice -n 15 make -j$(nproc)
   ```

## Related Commands

- `renice`: Change priority of running processes
- `nice`: Set priority when starting processes
- `ps`: View process priorities with `ps -l`
- `top`: Monitor processes and their priorities
- `ionice`: Set I/O scheduling priority

## Troubleshooting

### Common Issues

1. **Permission denied**: Need root for negative niceness values
2. **No effect**: System may be configured to ignore nice values
3. **Priority not changing**: Some processes may have fixed priorities

### Common Scenarios

```bash
# Check if nice value was applied
ps -o pid,nice,comm -p $(pidof myprocess)

# Change priority of running process
sudo renice 10 -p 1234

# Monitor processes with nice values
top -o %CPU -o %MEM
```

### Script Examples
```bash
#!/bin/bash
# Priority-based task scheduler
schedule_task() {
    local task=$1
    local priority=$2
    local user=$3

    case $priority in
        "low")
            if [ "$user" = "root" ]; then
                nice -n 15 "$task" &
            else
                nice -n 10 "$task" &
            fi
            ;;
        "medium")
            nice -n 5 "$task" &
            ;;
        "high")
            if [ "$user" = "root" ]; then
                nice -n -5 "$task" &
            else
                "$task" &
            fi
            ;;
        *)
            echo "Unknown priority: $priority"
            return 1
            ;;
    esac
}

# Batch job manager
run_batch_jobs() {
    local jobs_dir=$1

    echo "Running batch jobs from $jobs_dir"

    for job in "$jobs_dir"/*.sh; do
        if [ -f "$job" ]; then
            job_name=$(basename "$job" .sh)
            echo "Starting job: $job_name with low priority"
            nice -n 15 "$job" &
        fi
    done

    echo "All jobs started in background"
}

# System maintenance runner
maintenance_runner() {
    echo "Starting maintenance tasks..."

    # Log rotation (medium priority)
    nice -n 10 logrotate /etc/logrotate.conf &

    # System cleanup (low priority)
    nice -n 15 find /tmp -type f -mtime +7 -delete &

    # Package updates (low priority)
    nice -n 15 apt update -y &

    wait
    echo "Maintenance tasks completed"
}

# Usage examples
schedule_task "backup.sh" "low" root
schedule_task "critical_service.sh" "high" root
run_batch_jobs "/home/user/batch_jobs"
maintenance_runner
```

### Advanced Usage
```bash
# Dynamic niceness adjustment
adjust_task_priority() {
    local task_name=$1
    local load_threshold=${2:-2.0}

    # Get current system load
    current_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')

    if (( $(echo "$current_load > $load_threshold" | bc -l) )); then
        # High load, increase niceness (lower priority)
        nice -n 15 "$task_name" &
    else
        # Normal load, use default priority
        "$task_name" &
    fi
}

# User-friendly task launcher
task_launcher() {
    echo "Task Launcher"
    echo "1. Low priority (niceness 15)"
    echo "2. Medium priority (niceness 5)"
    echo "3. High priority (niceness -5, requires root)"
    echo "4. Default priority"

    read -p "Select priority (1-4): " choice
    read -p "Enter command to run: " command

    case $choice in
        1) nice -n 15 $command ;;
        2) nice -n 5 $command ;;
- 3)
            if [ "$(id -u)" -eq 0 ]; then
                nice -n -5 $command
            else
                echo "High priority requires root privileges"
                sudo nice -n -5 $command
            fi
            ;;
        4) $command ;;
        *) echo "Invalid choice" ;;
    esac
}

# Process priority monitor
priority_monitor() {
    local interval=${1:-30}

    while true; do
        clear
        echo "Process Priority Monitor - $(date)"
        echo "=================================="
        ps -eo pid,nice,pcpu,pmem,comm --sort=-pcpu | head -10
        echo ""
        echo "System Load: $(uptime)"
        sleep $interval
    done
}

# CPU-aware task runner
cpu_aware_runner() {
    local command=$1
    local cpu_cores=$(nproc)
    local high_load_threshold=$((cpu_cores * 2))

    # Get current load average
    current_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    current_load_int=${current_load%.*}

    if [ "$current_load_int" -gt $high_load_threshold ]; then
        echo "High system load ($current_load), running with very low priority"
        nice -n 19 $command
    elif [ "$current_load_int" -gt $cpu_cores ]; then
        echo "Medium system load ($current_load), running with low priority"
        nice -n 15 $command
    else
        echo "Normal system load ($current_load), running with default priority"
        $command
    fi
}

# Usage examples
adjust_task_priority "backup_database.sh"
task_launcher
priority_monitor 15
cpu_aware_runner "make -j$(nproc)"
```

### System Administration
```bash
# Automated maintenance scheduler
auto_maintenance() {
    local hour=$(date +%H)
    local day_of_week=$(date +%u)

    # During business hours, use lower priority
    if [ "$hour" -ge 9 ] && [ "$hour" -le 17 ]; then
        NICE_VALUE=15
    elif [ "$day_of_week" -ge 6 ]; then  # Weekend
        NICE_VALUE=5
    else
        NICE_VALUE=10
    fi

    echo "Running maintenance with niceness: $NICE_VALUE"

    # System cleanup
    nice -n $NICE_VALUE find /tmp -type f -mtime +3 -delete

    # Log rotation
    nice -n $NICE_VALUE logrotate

    # Cache cleanup
    nice -n $NICE_VALUE apt-get clean
}

# Development environment manager
dev_env_manager() {
    local action=$1

    case $action in
        "compile")
            echo "Starting compilation with low priority..."
            nice -n 15 make -j$(nproc)
            ;;
        "test")
            echo "Running tests with medium priority..."
            nice -n 10 make test
            ;;
        "docs")
            echo "Generating documentation with low priority..."
            nice -n 15 make docs
            ;;
        "clean")
            echo "Cleaning build files with low priority..."
            nice -n 10 make clean
            ;;
        *)
            echo "Usage: $0 {compile|test|docs|clean}"
            ;;
    esac
}

# Usage
auto_maintenance
dev_env_manager compile
```

### Performance Tuning
```bash
# Load-based niceness adjustment
adaptive_niceness() {
    local base_nice=$1
    local command=$2

    # Get current load (1-minute average)
    current_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    load_int=${current_load%.*}

    # Adjust niceness based on load
    if [ "$load_int" -gt 4 ]; then
        adjusted_nice=$((base_nice + 5))
    elif [ "$load_int" -gt 2 ]; then
        adjusted_nice=$((base_nice + 2))
    else
        adjusted_nice=$base_nice
    fi

    # Cap niceness at 19
    [ $adjusted_nice -gt 19 ] && adjusted_nice=19

    echo "Adjusted niceness: $adjusted_nice (load: $current_load)"
    nice -n $adjusted_nice $command
}

# Interactive priority setter
interactive_priority() {
    local command=$1

    echo "Current system load: $(uptime)"
    echo "CPU cores: $(nproc)"
    echo ""
    echo "Select priority:"
    echo "1) Very Low (niceness 19)"
    echo "2) Low (niceness 15)"
    echo "3) Medium (niceness 10)"
    echo "4) Normal (niceness 5)"
    echo "5) High (niceness 0)"
    echo "6) Very High (niceness -5, requires root)"

    read -p "Choice (1-6): " choice

    case $choice in
        1) nice -n 19 $command ;;
        2) nice -n 15 $command ;;
        3) nice -n 10 $command ;;
        4) nice -n 5 $command ;;
        5) $command ;;
- 6)
            if [ "$(id -u)" -eq 0 ]; then
                nice -n -5 $command
            else
                sudo nice -n -5 $command
            fi
            ;;
        *) echo "Invalid choice, using default priority"
           $command
           ;;
    esac
}

# Usage
adaptive_niceness 10 "make -j$(nproc)"
interactive_priority "gcc -o myprogram myprogram.c"
```