---
title: renice - Change process priority
slug: renice
tags: [process-management, linux-commands]
sidebar_label: renice
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# renice - Change process priority

The `renice` command alters the scheduling priority of one or more running processes. Unlike `nice`, which sets priority when starting a process, `renice` modifies the priority of already running processes.

## Syntax

```bash
renice [OPTIONS] PRIORITY [[PID] ...]
renice [OPTIONS] PRIORITY -g PGID ...
renice [OPTIONS] PRIORITY -u USER ...
```

## Common Options

- `-g, --pgrp`: Interpret arguments as process group IDs
- `-p, --pid`: Interpret arguments as process IDs (default)
- `-u, --user`: Interpret arguments as usernames or user IDs
- `-n, --priority`: Specify priority as a signed integer
- `-h, --help`: Display help message
- `-v, --verbose`: Verbose output
- `--version`: Display version information

## Usage Examples

### Basic Usage
```bash
# Change priority of specific process
renice 10 1234

# Make process less important (higher niceness)
renice 15 5678

# Make process more important (lower niceness, requires root)
sudo renice -5 9012
```

### Change by Process ID
```bash
# Single process
renice 5 1234

# Multiple processes
renice 10 1234 5678 9012

# Show verbose output
renice -v 15 1234
```

### Change by User
```bash
# Change priority of all processes owned by user
renice 10 -u john

# Change priority for multiple users
renice 5 -u john mary

# Show what's being changed
renice -v 15 -u www-data
```

### Change by Process Group
```bash
# Change priority of process group
renice 10 -g 1234

# Multiple process groups
renice 15 -g 1234 5678
```

### Negative Niceness (Requires Root)
```bash
# Make process high priority
sudo renice -10 1234

# Make all user processes high priority
sudo renice -5 -u importantuser
```

### Interactive Priority Adjustment
```bash
# Get PID and change priority
pid=$(pidof firefox)
renice 10 $pid

# Batch priority changes
for pid in $(pgrep firefox); do
    renice 10 $pid
done
```

### System Administration
```bash
# Lower priority of background services
renice 15 $(pgrep backup)

# Raise priority of critical services
sudo renice -5 $(pgrep critical_service)

# Lower priority of user processes on loaded system
renice 10 -u regularuser
```

### Priority Management
```bash
# Check current priority before changing
ps -o pid,nice,comm -p 1234
renice 5 1234
ps -o pid,nice,comm -p 1234

# Reset to default priority
renice 0 1234
```

### Advanced Usage
```bash
# Change priority based on CPU usage
for pid in $(ps -eo pid,pcpu --sort=-pcpu | head -5 | awk '{print $1}'); do
    renice 10 $pid
done

# Lower priority of long-running processes
ps -eo pid,etime,comm | awk '$2 ~ /-/ {print $1}' | while read pid; do
    renice 15 $pid
done
```

## Understanding the Changes

### Niceness Values
- **Range**: -20 to 19
- **-20**: Highest priority (requires superuser)
- **0**: Default priority
- **19**: Lowest priority
- **Lower value** = Higher priority
- **Higher value** = Lower priority

### Priority Inheritance
- Child processes inherit parent's niceness value
- Changing parent's niceness doesn't affect existing children
- New children will use updated parent niceness

### System Constraints
- Regular users can only increase niceness (lower priority)
- Only root can decrease niceness (higher priority)
- Some processes may ignore renice requests

## Best Practices

1. **Use `nice`** when starting processes instead of `renice` when possible
2. **Check current priority** before making changes
3. **Use positive niceness values** for background processes
4. **Monitor effects** after changing priorities
5. **Use in scripts** for dynamic priority management:
   ```bash
   # Lower priority of CPU-intensive processes
   for pid in $(pgrep -f "cpu_intensive"); do
       renice 10 $pid
   done
   ```

## Related Commands

- `nice`: Set priority when starting processes
- `ps`: View process priorities with `ps -l`
- `top`: Monitor processes and their priorities
- `ionice`: Set I/O scheduling priority
- `chrt`: Change real-time attributes of processes

## Troubleshooting

### Common Issues

1. **Permission denied**: Need root for negative niceness values
2. **No effect**: Process may have fixed priority or ignore requests
3. **Invalid priority**: Value outside -20 to 19 range
4. **Process not found**: Check if PID is correct

### Common Scenarios

```bash
# Check if change was successful
ps -o pid,nice,comm -p 1234

# Reset to default
renice 0 1234

# Change all processes of a user
renice 10 -u username

# Find PIDs of processes to change
pgrep processname | xargs renice 10
```

### Script Examples
```bash
#!/bin/bash
# Priority management script
manage_priorities() {
    local action=$1
    local target=$2
    local priority=$3

    case $action in
        "process")
            if [ -n "$target" ] && [ -n "$priority" ]; then
                echo "Changing priority of PID $target to $priority"
                renice "$priority" "$target"
            fi
            ;;
        "user")
            if [ -n "$target" ] && [ -n "$priority" ]; then
                echo "Changing priority of user $target to $priority"
                renice "$priority" -u "$target"
            fi
            ;;
        "group")
            if [ -n "$target" ] && [ -n "$priority" ]; then
                echo "Changing priority of process group $target to $priority"
                renice "$priority" -g "$target"
            fi
            ;;
        "high-cpu")
            echo "Lowering priority of high CPU processes"
            ps -eo pid,pcpu | awk '$2 > 50 && $1 != $$ {print $1}' | while read pid; do
                renice 10 $pid
            done
            ;;
        *)
            echo "Usage: $0 {process|user|group|high-cpu} target [priority]"
            return 1
            ;;
    esac
}

# Load-based priority adjustment
adaptive_priorities() {
    local load_threshold=${1:-2.0}
    current_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')

    if (( $(echo "$current_load > $load_threshold" | bc -l) )); then
        echo "High load detected ($current_load), adjusting priorities"
        # Lower priority of background tasks
        pgrep -f "(backup|update|index)" | while read pid; do
            renice 15 $pid
        done
    fi
}

# Service priority manager
service_priority_manager() {
    local service=$1
    local priority=$2
    local action=${3:-adjust}

    local pids=$(pgrep "$service")

    if [ -z "$pids" ]; then
        echo "No processes found for service: $service"
        return 1
    fi

    echo "Service: $service"
    echo "Action: $action"
    echo "Priority: $priority"

    case $action in
        "adjust")
            for pid in $pids; do
                renice "$priority" "$pid"
            done
            ;;
        "check")
            for pid in $pids; do
                ps -o pid,nice,pcpu,pmem,comm -p "$pid"
            done
            ;;
        "reset")
            for pid in $pids; do
                renice 0 "$pid"
            done
            ;;
    esac
}

# Usage examples
manage_priorities process 1234 10
manage_priorities user john 15
manage_priorities high-cpu
adaptive_priorities 1.5
service_priority_manager nginx 5 check
service_priority_manager nginx 10 adjust
```

### Advanced Usage
```bash
# Intelligent priority balancer
priority_balancer() {
    local max_cpu_threshold=${1:-80}
    local target_priority=${2:-15}

    echo "Priority Balancer - $(date)"
    echo "Max CPU threshold: ${max_cpu_threshold}%"
    echo "Target priority: $target_priority"
    echo ""

    # Find processes exceeding CPU threshold
    ps -eo pid,pcpu,comm --sort=-pcpu | while read line; do
        # Skip header
        if [[ "$line" =~ ^PID ]]; then
            continue
        fi

        pid=$(echo $line | awk '{print $1}')
        cpu=$(echo $line | awk '{print $2}')
        comm=$(echo $line | awk '{print $3}')

        if [ -n "$cpu" ] && [ "${cpu%.*}" -gt $max_cpu_threshold ]; then
            echo "High CPU process: $comm (PID: $pid, CPU: ${cpu}%)"
            # Check current priority
            current_nice=$(ps -p "$pid" -o nice= | tr -d ' ')
            echo "Current niceness: $current_nice"

            if [ "$current_nice" -lt $target_priority ]; then
                echo "Raising niceness to $target_priority"
                renice "$target_priority" "$pid"
            else
                echo "Priority already acceptable"
            fi
            echo ""
        fi
    done
}

# User priority enforcement
user_priority_limits() {
    local username=$1
    local max_nice=${2:-15}

    echo "Enforcing priority limits for user: $username"
    echo "Maximum niceness: $max_nice"

    # Find all processes for user
    ps -u "$username" -o pid,nice,comm | while read line; do
        # Skip header
        if [[ "$line" =~ ^PID ]]; then
            continue
        fi

        pid=$(echo $line | awk '{print $1}')
        nice=$(echo $line | awk '{print $2}')
        comm=$(echo $line | awk '{print $3}')

        if [ "$nice" -lt $max_nice ]; then
            echo "Adjusting $comm (PID: $pid) from niceness $nice to $max_nice"
            renice "$max_nice" "$pid"
        fi
    done
}

# Time-based priority adjustment
time_based_priority() {
    local hour=$(date +%H)
    local day_of_week=$(date +%u)

    echo "Time-based priority adjustment"
    echo "Hour: $hour"
    echo "Day of week: $day_of_week"

    # Business hours: lower priority for background tasks
    if [ "$hour" -ge 9 ] && [ "$hour" -le 17 ] && [ "$day_of_week" -le 5 ]; then
        echo "Business hours - adjusting background task priorities"
        pgrep -f "(backup|update|index)" | while read pid; do
            renice 15 $pid
        done
    # Night time: higher priority for maintenance tasks
    elif [ "$hour" -ge 22 ] || [ "$hour" -le 6 ]; then
        echo "Night time - adjusting maintenance task priorities"
        pgrep -f "(backup|cleanup|maintenance)" | while read pid; do
            renice 5 $pid
        done
    fi
}

# Batch job priority manager
batch_job_manager() {
    local action=$1
    local job_pattern=$2
    local priority=${3:-10}

    case $action in
        "lower")
            echo "Lowering priority of jobs matching: $job_pattern"
            pgrep -f "$job_pattern" | while read pid; do
                renice "$priority" "$pid"
            done
            ;;
        "raise")
            echo "Raising priority of jobs matching: $job_pattern"
            pgrep -f "$job_pattern" | while read pid; do
                renice "$priority" "$pid"
            done
            ;;
        "status")
            echo "Status of jobs matching: $job_pattern"
            pgrep -f "$job_pattern" | while read pid; do
                ps -o pid,nice,pcpu,pmem,etime,comm -p "$pid"
            done
            ;;
        *)
            echo "Usage: $0 {lower|raise|status} pattern [priority]"
            ;;
    esac
}

# Usage examples
priority_balancer 75 12
user_priority_limits regularuser 12
time_based_priority
batch_job_manager lower ".*backup.*" 15
batch_job_manager status ".*backup.*"
```

### Monitoring and Maintenance
```bash
# Priority monitoring script
monitor_priorities() {
    local interval=${1:-30}
    local log_file=${2:-"/tmp/priority_monitor.log"}

    while true; do
        echo "$(date): Priority Monitor Check" >> "$log_file"
        echo "System Load: $(uptime)" >> "$log_file"

        # Check processes with unusual priorities
        ps -eo pid,nice,comm | awk '$2 < 0 || $2 > 10 {print $1, $2, $3}' >> "$log_file"

        # Check high CPU processes
        ps -eo pid,nice,pcpu,comm --sort=-pcpu | head -5 >> "$log_file"
        echo "--------------------------------" >> "$log_file"

        sleep $interval
    done
}

# Automatic priority adjustment based on system load
auto_priority_adjust() {
    local load_threshold_low=${1:-1.0}
    local load_threshold_high=${2:-3.0}
    local low_priority=${3:-15}
    normal_priority=5

    current_load=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')

    echo "Current load: $current_load"

    if (( $(echo "$current_load > $load_threshold_high" | bc -l) )); then
        echo "High load detected, lowering priority of background tasks"
        pgrep -f "(backup|update)" | while read pid; do
            renice $low_priority $pid
        done
    elif (( $(echo "$current_load < $load_threshold_low" | bc -l) )); then
        echo "Low load detected, normalizing priority of background tasks"
        pgrep -f "(backup|update)" | while read pid; do
            renice $normal_priority $pid
        done
    else
        echo "Load is normal, no priority adjustment needed"
    fi
}

# Process cleanup with priority adjustment
cleanup_with_priority() {
    local process_pattern=$1
    local max_age=${2:-3600}  # 1 hour
    local final_priority=${3:-19}

    echo "Cleaning up processes matching: $process_pattern"
    echo "Max age: $max_age seconds"
    echo "Final priority: $final_priority"

    # Find old processes and raise their niceness
    ps -eo pid,etime,comm | grep -E "$process_pattern" | while read line; do
        pid=$(echo $line | awk '{print $1}')
        age_str=$(echo $line | awk '{print $2}')
        comm=$(echo $line | awk '{for(i=3;i<=NF;i++) printf "%s ", $i; print ""}')

        # Parse age
        if [[ "$age_str" =~ ([0-9]+)-([0-9]{2}):([0-9]{2}):([0-9]{2}) ]]; then
            days=${BASH_REMATCH[1]}
            hours=${BASH_REMATCH[2]}
            age_seconds=$((days * 86400 + hours * 3600))

            if [ $age_seconds -gt $max_age ]; then
                echo "Old process found: $comm (PID: $pid, age: $age_str)"
                renice $final_priority $pid
                echo "Priority set to $final_priority, process will be terminated if it continues"
            fi
        fi
    done
}

# Usage
monitor_priorities 60
auto_priority_adjust 1.5 3.0 15
cleanup_with_priority "old_process.*" 7200 18
```