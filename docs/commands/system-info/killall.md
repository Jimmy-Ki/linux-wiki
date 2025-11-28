---
title: killall - Kill Processes by Name
sidebar_label: killall
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# killall - Kill Processes by Name

The `killall` command is a powerful process management utility that terminates processes by name rather than by process ID (PID). It sends signals to all processes running the specified command, making it invaluable for system administrators and developers who need to manage multiple instances of the same application. Unlike the `kill` command which requires specific PIDs, `killall` can operate on process names, supporting pattern matching, case-insensitive searches, and various signal types for different termination scenarios.

## Basic Syntax

```bash
killall [OPTIONS] NAME
```

## Common Signals

- `1` or `HUP` - Hangup (reload configuration)
- `2` or `INT` - Interrupt (Ctrl+C)
- `9` or `KILL` - Kill (force termination, cannot be caught)
- `15` or `TERM` - Terminate (graceful shutdown, default)
- `18` or `CONT` - Continue (resume suspended process)
- `19` or `STOP` - Stop (suspend process)

## Common Options

### Signal Options
- `-s, --signal SIGNAL` - Send specified signal instead of SIGTERM
- `-l, --list` - List all available signal names

### Matching Options
- `-e, --exact` - Require exact match for long process names
- `-I, --ignore-case` - Case-insensitive process name matching
- `-r, --regexp` - Interpret NAME as regular expression
- `-g, --process-group` - Kill the entire process group

### User and Permission Options
- `-u, --user USER` - Kill only processes owned by USER
- `-o, --older-than TIME` - Kill processes older than specified time
- `-y, --younger-than TIME` - Kill processes younger than specified time

### Interactive and Safety Options
- `-i, --interactive` - Ask for confirmation before killing
- `-q, --quiet` - Don't complain if no processes found
- `-v, --verbose` - Report if signal was successfully sent
- `-w, --wait` - Wait for processes to die

### Information Options
- `-V, --version` - Display version information
- `--help` - Display help message

## Usage Examples

### Basic Process Termination

#### Simple Process Killing
```bash
# Kill all Firefox processes
killall firefox

# Kill all Nginx processes
killall nginx

# Kill all Apache processes
killall apache2

# Kill all bash shells (use with caution)
killall bash

# Kill all Python processes
killall python
```

#### Signal Specification
```bash
# Send SIGKILL (force kill) to all Firefox processes
killall -9 firefox
killall -KILL firefox

# Send SIGHUP (reload configuration) to Nginx
killall -HUP nginx
killall -1 nginx

# Send SIGTERM (graceful shutdown) to Apache
killall -15 apache2
killall -TERM apache2

# Send SIGUSR1 to all Nginx processes
killall -USR1 nginx

# Send SIGINT (interrupt) to all processes
killall -INT processname
```

### Advanced Pattern Matching

#### Case-Insensitive Matching
```bash
# Kill processes regardless of case
killall -I FIREFOX
killall -I Firefox
killall -I firefox

# Match various capitalizations
killall -I CHROME
killall -I Chrome
killall -I chrome

# Kill processes with mixed case variations
killall -I LibreOffice
killall -I libreoffice
```

#### Regular Expression Matching
```bash
# Kill processes matching regex pattern
killall -r 'python.*script'

# Kill all processes containing 'java' in name
killall -r '.*java.*'

# Kill all processes ending with 'd' (daemons)
killall -r '.*d$'

# Kill all processes starting with 'http'
killall -r '^http.*'

# Complex pattern matching
killall -r '.*[Tt]omcat.*[0-9]$'

# Kill processes with specific version patterns
killall -r 'apache2.*[0-9]\.[0-9]'
```

#### Exact Name Matching
```bash
# Require exact process name match
killall -e firefox-bin

# Avoid partial matches
killall -e python3

# Kill only exact matches (not containing the name)
killall -e myapp
```

### User-Specific Process Management

#### Killing by User
```bash
# Kill processes owned by specific user
killall -u john firefox
killall -u www-data apache2
killall -u postgres postgres

# Kill all processes owned by user
killall -u mysql

# Multiple user operations
killall -u root nginx
killall -u daemon sshd
```

#### User and Pattern Combination
```bash
# Kill specific processes owned by user
killall -u john -r '.*chrome.*'

# Kill all daemon processes owned by system users
killall -u daemon -r '.*d$'

# Complex user-based filtering
killall -u www-data -r 'apache.*'
```

### Interactive and Safe Operations

#### Interactive Confirmation
```bash
# Ask for confirmation before killing each process
killall -i firefox

# Interactive with verbose output
killall -i -v firefox

# Interactive for multiple processes
killall -i -r '.*chrome.*'

# Example interactive session:
# Kill firefox(1234) ? (y/N) y
# Killed firefox(1234) with signal 15
# Kill firefox(5678) ? (y/N) y
# Killed firefox(5678) with signal 15
```

#### Verbose Output
```bash
# Show which processes were killed
killall -v nginx
# Output: Killed nginx(1234) with signal 15
#         Killed nginx(5678) with signal 15

# Verbose with specific signal
killall -v -9 firefox

# Verbose with user filtering
killall -v -u john firefox

# Verbose for pattern matching
killall -v -r '.*python.*'
```

#### Quiet Operations
```bash
# Don't complain if no processes found
killall -q nonexistent_process
# No output, exit status 0

# Quiet with different exit codes
killall -q firefox && echo "Firefox killed" || echo "Firefox not found"

# Quiet batch operations
killall -q firefox chrome libreoffice
```

### Time-Based Process Management

#### Age-Based Filtering
```bash
# Kill processes older than 1 hour
killall -o 1h firefox

# Kill processes older than 30 minutes
killall -o 30m chrome

# Kill processes older than 2 days
killall -o 2d backup_process

# Kill processes younger than 5 minutes
killall -y 5m temporary_process

# Complex time-based operations
killall -o 1h -u user firefox
```

#### Combined Time and Pattern Filtering
```bash
# Kill old processes matching pattern
killall -o 2h -r '.*temp.*'

# Kill recent daemon processes
killall -y 10m -r '.*d$'

# Age-based user filtering
killall -o 1h -u www-data apache2
```

### Process Group Management

#### Process Group Operations
```bash
# Kill entire process group
killall -g myprocess

# Kill process group with specific signal
killall -g -TERM myprocess

# Process group for user-owned processes
killall -u www-data -g apache2

# Interactive process group killing
killall -i -g myprocess_group
```

### Waiting for Process Termination

#### Wait Operations
```bash
# Kill processes and wait for them to terminate
killall -w firefox

# Wait with timeout
timeout 30 killall -w firefox

# Wait after graceful shutdown
killall -TERM -w firefox

# Force kill after wait timeout
if ! timeout 10 killall -w firefox; then
    killall -9 firefox
fi
```

#### Advanced Wait Scenarios
```bash
# Multiple process types with wait
killall -w firefox chrome libreoffice

# Wait after reload signal
killall -HUP -w nginx

# Progressive termination with waits
killall -TERM -w firefox || killall -KILL firefox
```

### Signal and Process Information

#### Listing Signals
```bash
# List all available signals
killall -l

# Output: HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE ALRM TERM
#        STKFLT CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH IO PWR SYS
#        UNUSED RTMIN...

# List signals with descriptions
man 7 signal
```

#### Process Discovery
```bash
# Check if processes exist before killing
if pgrep firefox > /dev/null; then
    echo "Firefox processes found:"
    pgrep -a firefox
    killall firefox
else
    echo "No Firefox processes found"
fi

# List processes before killing
ps aux | grep firefox
killall firefox

# Verify processes were killed
sleep 2
pgrep firefox || echo "All Firefox processes terminated"
```

## Practical Examples

### System Administration

#### Service Management
```bash
# Graceful service restart
killall -HUP nginx
echo "Nginx configuration reloaded"

# Force service restart
killall -TERM nginx
sleep 2
killall -KILL nginx
systemctl start nginx

# Service health check and restart
if ! pgrep nginx > /dev/null; then
    echo "Nginx is down, restarting..."
    systemctl start nginx
fi

# Reload multiple services
killall -HUP nginx apache2 postfix

# Emergency service termination
killall -9 httpd mysqld
```

#### Process Cleanup
```bash
# Cleanup browser processes
killall firefox chrome chromium

# Cleanup development processes
killall node python java php

# Cleanup system processes after user logout
killall -u user firefox chrome libreoffice

# Cleanup temporary/background processes
killall -r '.*temp.*'
killall -r '.*backup.*'

# Aggressive cleanup for stuck processes
killall -9 -r '.*[Ff]rozen.*'
```

#### Resource Management
```bash
# Kill high-memory processes
killall -u user -o 1h firefox

# Kill processes consuming excessive CPU
ps aux --sort=-%cpu | head -10
killall -9 high_cpu_process

# Cleanup after maintenance
killall -o 6h maintenance_script
killall -r '.*cleanup.*'

# Free up system resources
killall -y 30m temp_process
```

### Development Workflow

#### Application Development
```bash
# Restart development server
killall -HUP node
killall -INT python app.py

# Kill all development processes
killall node python java php ruby

# Kill specific application instances
killall -r 'python.*app\.py'
killall -r 'node.*server\.js'

# Cleanup test processes
killall -r '.*test.*'
killall -r '.*spec.*'
```

#### Database Management
```bash
# Database server restart
killall -TERM mysql
sleep 5
killall -KILL mysql
mysqld --daemon

# Database connection cleanup
killall mysql psql
killall -r '.*sql.*'

# Backup process management
killall -HUP mysqld
killall -o 2h backup_script
```

#### Build Process Management
```bash
# Kill hanging build processes
killall make gcc clang
killall -r '.*[Cc]ompiled.*'

# Clean up after failed builds
killall -9 make
killall -r '.*build.*'

# Development environment cleanup
killall node npm yarn
killall -r '.*[Ww]ebpack.*'
```

### Multi-User Environments

#### User Process Management
```bash
# Clean up user processes after logout
killall -u username firefox chrome libreoffice

# Kill processes for specific user applications
killall -u www-data apache2
killall -u mysql mysqld
killall -u postfix sendmail

# User-specific service management
killall -u john -r '.*[Bb]rowser.*'
killall -u jane -r '.*[Dd]evelopment.*'
```

#### System Maintenance
```bash
# Pre-maintenance cleanup
killall -r '.*[Tt]emp.*'
killall -r '.*[Bb]ackup.*'
killall -o 1h user_application

# Post-maintenance verification
ps aux | grep -E '(firefox|chrome|libreoffice)' | wc -l

# Emergency process termination
killall -9 -r '.*[Cc]ritical.*'
```

## Advanced Usage

### Complex Scripting

#### Service Management Script
```bash
#!/bin/bash
# Advanced service management script

manage_service() {
    local service=$1
    local action=$2
    local timeout=${3:-30}

    case $action in
        "start")
            echo "Starting $service..."
            systemctl start "$service" || "$service" &
            ;;
        "stop")
            echo "Stopping $service..."
            if killall -q "$service"; then
                echo "Sending TERM signal to $service..."
                killall -TERM "$service"

                # Wait for graceful shutdown
                if timeout "$timeout" killall -w "$service"; then
                    echo "$service stopped gracefully"
                else
                    echo "Timeout, force killing $service..."
                    killall -KILL "$service"
                fi
            else
                echo "$service was not running"
            fi
            ;;
        "restart")
            echo "Restarting $service..."
            manage_service "$service" stop "$timeout"
            sleep 2
            manage_service "$service" start
            ;;
        "reload")
            echo "Reloading $service configuration..."
            if killall -HUP "$service"; then
                echo "$service reloaded successfully"
            else
                echo "$service not running or reload failed"
                return 1
            fi
            ;;
        "status")
            if pgrep "$service" > /dev/null; then
                local count=$(pgrep "$service" | wc -l)
                local oldest=$(ps -p "$(pgrep -o "$service")" -o etimes=)
                echo "$service is running ($count instances, oldest: ${oldest}s)"
            else
                echo "$service is not running"
            fi
            ;;
        "force-stop")
            echo "Force stopping $service..."
            killall -KILL "$service" 2>/dev/null
            echo "$service force killed"
            ;;
        *)
            echo "Usage: $0 service_name {start|stop|restart|reload|status|force-stop} [timeout]"
            return 1
            ;;
    esac
}

# Usage examples
manage_service nginx restart 60
manage_service apache2 reload
manage_service mysql status
```

#### Process Cleanup Script
```bash
#!/bin/bash
# Comprehensive process cleanup script

cleanup_processes() {
    local pattern=$1
    local signal=${2:-TERM}
    local timeout=${3:-15}
    local force=${4:-true}

    echo "=== Process Cleanup ==="
    echo "Pattern: $pattern"
    echo "Signal: $signal"
    echo "Timeout: ${timeout}s"
    echo "Force kill: $force"
    echo ""

    # Find matching processes
    local pids=$(pgrep -f "$pattern")
    if [ -z "$pids" ]; then
        echo "No processes found matching: $pattern"
        return 0
    fi

    echo "Found processes:"
    for pid in $pids; do
        local info=$(ps -p "$pid" -o pid,user,comm,etime=)
        echo "  $info"
    done
    echo ""

    # Send initial signal
    echo "Sending $signal signal to matched processes..."
    if killall -"$signal" -r "$pattern"; then
        echo "Signal sent successfully"

        # Wait for processes to terminate
        echo "Waiting for processes to terminate (${timeout}s)..."
        local remaining=0

        for i in $(seq 1 $timeout); do
            sleep 1
            local current_pids=$(pgrep -f "$pattern")
            if [ -z "$current_pids" ]; then
                echo "All processes terminated successfully"
                return 0
            fi
            remaining=$(echo "$current_pids" | wc -l)
            echo -ne "\rWaiting... ${i}s (${remaining} remaining)"
        done
        echo ""

        # Force kill if requested
        if [ "$force" = "true" ]; then
            echo "Timeout reached, force killing remaining processes..."
            killall -KILL -r "$pattern"
            sleep 1
            local final_pids=$(pgrep -f "$pattern")
            if [ -z "$final_pids" ]; then
                echo "All processes force killed"
            else
                echo "Warning: Some processes could not be killed"
                return 1
            fi
        else
            echo "Timeout reached, leaving remaining processes"
            return 1
        fi
    else
        echo "Failed to send signal or no processes matched"
        return 1
    fi
}

# Usage examples
cleanup_processes "firefox" TERM 30 true
cleanup_processes ".*python.*script.*" HUP 10 false
cleanup_processes ".*chrome.*" KILL 5 true
```

#### User Session Management
```bash
#!/bin/bash
# User session process manager

manage_user_session() {
    local username=$1
    local action=$2
    local process_pattern=${3:-".*"}

    case $action in
        "list")
            echo "=== Processes for user: $username ==="
            echo "Pattern: $process_pattern"
            echo ""
            ps -u "$username" -o pid,ppid,user,comm,etime,cmd | \
                grep -E "$process_pattern" | \
                while read line; do
                    echo "  $line"
                done
            ;;
        "kill")
            echo "Killing processes for user: $username (pattern: $process_pattern)"
            local pids=$(pgrep -u "$username" -f "$process_pattern")
            if [ -n "$pids" ]; then
                echo "Found PIDs: $pids"
                kill -TERM $pids
                sleep 3
                kill -KILL $(pgrep -u "$username" -f "$process_pattern" 2>/dev/null) 2>/dev/null
                echo "Process killing completed"
            else
                echo "No matching processes found"
            fi
            ;;
        "interactive")
            echo "Interactive process management for user: $username"
            ps -u "$username" -o pid,comm | grep -E "$process_pattern" | \
                while read pid comm; do
                    echo -n "Kill process $pid ($comm)? (y/N): "
                    read -r response
                    if [[ "$response" =~ ^[Yy]$ ]]; then
                        kill -TERM "$pid" && echo "  Killed"
                    fi
                done
            ;;
        "monitor")
            echo "Monitoring processes for user: $username"
            while true; do
                clear
                echo "=== Process Monitor for $username ==="
                echo "Pattern: $process_pattern"
                echo "Time: $(date)"
                echo ""
                ps -u "$username" -o pid,pcpu,pmem,comm,etime | \
                    grep -E "$process_pattern" | \
                    head -20
                sleep 5
            done
            ;;
        "cleanup")
            echo "Cleaning up old processes for user: $username"
            # Kill processes older than 2 hours
            killall -u "$username" -o 2h -r "$process_pattern"

            # Kill browser processes
            killall -u "$username" firefox chrome chromium

            # Kill temporary processes
            killall -u "$username" -r '.*[Tt]emp.*'

            echo "Cleanup completed"
            ;;
        *)
            echo "Usage: $0 username {list|kill|interactive|monitor|cleanup} [pattern]"
            return 1
            ;;
    esac
}

# Usage examples
manage_user_session john list ".*"
manage_user_session john kill ".*[Bb]rowser.*"
manage_user_session www-data cleanup
```

### Performance and Monitoring

#### Process Monitoring Script
```bash
#!/bin/bash
# Process monitoring and management script

monitor_and_manage() {
    local process_name=$1
    local max_instances=${2:-5}
    local max_age=${3:-3600}  # 1 hour in seconds
    local check_interval=${4:-60}

    echo "=== Process Monitor for: $process_name ==="
    echo "Max instances: $max_instances"
    echo "Max age: ${max_age}s"
    echo "Check interval: ${check_interval}s"
    echo ""

    while true; do
        local pids=$(pgrep "$process_name")
        local instance_count=$(echo "$pids" | wc -l)

        echo "[$(date)] Checking $process_name: $instance_count instances"

        if [ -n "$pids" ]; then
            echo "Found PIDs: $pids"

            # Check for too many instances
            if [ "$instance_count" -gt "$max_instances" ]; then
                echo "Too many instances ($instance_count > $max_instances)"

                # Sort by age and kill oldest
                local sorted_pids=$(ps -p $pids -o pid,etimes= | sort -k2 -nr | cut -d' ' -f1)
                local excess=$((instance_count - max_instances))
                local count=0

                for pid in $sorted_pids; do
                    if [ $count -lt $excess ]; then
                        echo "Killing oldest instance: PID $pid"
                        kill -TERM "$pid"
                        count=$((count + 1))
                    fi
                done
            fi

            # Check for old instances
            for pid in $pids; do
                local age=$(ps -p "$pid" -o etimes= | tr -d ' ')
                if [ "$age" -gt "$max_age" ]; then
                    echo "Killing old instance: PID $pid (age: ${age}s)"
                    kill -TERM "$pid"
                fi
            done
        fi

        sleep "$check_interval"
    done
}

# Usage examples
monitor_and_manage firefox 3 7200 120
monitor_and_manage python 10 3600 30
```

#### Resource-Based Process Management
```bash
#!/bin/bash
# Resource-based process management

manage_by_resources() {
    local resource_type=$1  # memory, cpu, or both
    local threshold=$2
    local action=${3:-kill}  # kill, warn, or list

    echo "=== Resource-based Process Manager ==="
    echo "Resource: $resource_type"
    echo "Threshold: $threshold"
    echo "Action: $action"
    echo ""

    case $resource_type in
        "memory")
            echo "Finding high-memory processes..."
            local high_mem_procs=$(ps aux --sort=-%mem | \
                awk -v thresh="$threshold" 'NR>1 && $4>thresh {print $2,$4,$11}')

            if [ -n "$high_mem_procs" ]; then
                echo "High memory processes found:"
                echo "$high_mem_procs"
                echo ""

                case $action in
                    "kill")
                        echo "Killing high memory processes..."
                        echo "$high_mem_procs" | while read pid mem cmd; do
                            echo "Killing PID $pid ($cmd - ${mem}% memory)"
                            kill -TERM "$pid"
                        done
                        ;;
                    "warn")
                        echo "Warning: High memory processes detected!"
                        ;;
                    "list")
                        echo "Listing high memory processes only."
                        ;;
                esac
            else
                echo "No processes exceeding memory threshold found."
            fi
            ;;
        "cpu")
            echo "Finding high-CPU processes..."
            local high_cpu_procs=$(ps aux --sort=-%cpu | \
                awk -v thresh="$threshold" 'NR>1 && $3>thresh {print $2,$3,$11}')

            if [ -n "$high_cpu_procs" ]; then
                echo "High CPU processes found:"
                echo "$high_cpu_procs"
                echo ""

                case $action in
                    "kill")
                        echo "Killing high CPU processes..."
                        echo "$high_cpu_procs" | while read pid cpu cmd; do
                            echo "Killing PID $pid ($cmd - ${cpu}% CPU)"
                            kill -TERM "$pid"
                        done
                        ;;
                    "warn")
                        echo "Warning: High CPU processes detected!"
                        ;;
                    "list")
                        echo "Listing high CPU processes only."
                        ;;
                esac
            else
                echo "No processes exceeding CPU threshold found."
            fi
            ;;
        *)
            echo "Usage: $0 {memory|cpu} threshold {kill|warn|list}"
            return 1
            ;;
    esac
}

# Usage examples
manage_by_resources memory 10.0 kill
manage_by_resources cpu 50.0 warn
manage_by_resources memory 5.0 list
```

## Integration and Automation

### System Integration

#### Cron Job for Process Cleanup
```bash
# Add to crontab with: crontab -e

# Daily cleanup of old processes
0 2 * * * /usr/local/bin/cleanup_old_processes.sh

# Hourly monitoring of resource-intensive processes
0 * * * * /usr/local/bin/monitor_resources.sh

# Weekly comprehensive process audit
0 3 * * 0 /usr/local/bin/process_audit.sh
```

#### Systemd Service Integration
```bash
# Create service file: /etc/systemd/system/process-cleanup.service
[Unit]
Description=Process Cleanup Service
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/process_cleanup.sh
User=root
Group=root

[Install]
WantedBy=multi-user.target

# Create timer: /etc/systemd/system/process-cleanup.timer
[Unit]
Description=Run process cleanup periodically
Requires=process-cleanup.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

### Logging and Monitoring

#### Process Management Logging
```bash
#!/bin/bash
# Process management with comprehensive logging

log_file="/var/log/process_management.log"
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

log_action() {
    local action=$1
    local target=$2
    local result=$3
    local details=$4

    echo "[$timestamp] $action: $target - $result" >> "$log_file"
    if [ -n "$details" ]; then
        echo "[$timestamp] Details: $details" >> "$log_file"
    fi
}

safe_killall() {
    local process=$1
    local signal=${2:-TERM}
    local timeout=${3:-30}

    log_action "ATTEMPT_KILL" "$process" "SIGNAL_$signal" "Timeout: ${timeout}s"

    # Check if processes exist
    if ! pgrep "$process" > /dev/null; then
        log_action "NO_PROCESSES" "$process" "NOT_FOUND"
        return 0
    fi

    # List processes before killing
    local process_list=$(pgrep -a "$process")
    log_action "PROCESSES_FOUND" "$process" "$(echo "$process_list" | wc -l)" "$process_list"

    # Send signal
    if killall -"$signal" "$process"; then
        log_action "SIGNAL_SENT" "$process" "SUCCESS"

        # Wait for termination
        if timeout "$timeout" killall -w "$process" 2>/dev/null; then
            log_action "TERMINATION" "$process" "SUCCESS_GRACEFUL"
        else
            log_action "TERMINATION_TIMEOUT" "$process" "TIMEOUT_REACHED"

            # Force kill
            if killall -KILL "$process" 2>/dev/null; then
                log_action "FORCE_KILL" "$process" "SUCCESS"
            else
                log_action "FORCE_KILL" "$process" "FAILED"
                return 1
            fi
        fi
    else
        log_action "SIGNAL_SENT" "$process" "FAILED"
        return 1
    fi

    return 0
}

# Usage examples
safe_killall firefox TERM 30
safe_killall ".*python.*" HUP 10
```

### Monitoring and Alerting

#### Process Alert System
```bash
#!/bin/bash
# Process monitoring with alert system

alert_threshold=5
check_interval=60
alert_email="admin@example.com"

check_process_health() {
    local process=$1
    local min_instances=${2:-1}
    local max_instances=${3:-10}

    local current_instances=$(pgrep "$process" | wc -l)

    if [ "$current_instances" -lt "$min_instances" ]; then
        send_alert "LOW_COUNT" "$process" "$current_instances" "Expected at least $min_instances"
    elif [ "$current_instances" -gt "$max_instances" ]; then
        send_alert "HIGH_COUNT" "$process" "$current_instances" "Expected at most $max_instances"
    fi
}

send_alert() {
    local alert_type=$1
    local process=$2
    local value=$3
    local message=$4

    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local subject="Process Alert: $alert_type for $process"
    local body="
Alert Type: $alert_type
Process: $process
Value: $value
Message: $message
Timestamp: $timestamp

Current process list:
$(ps aux | grep "$process" | head -10)
"

    echo "$body" | mail -s "$subject" "$alert_email"
    echo "[$timestamp] Alert sent: $alert_type for $process ($value)" >> "/var/log/process_alerts.log"
}

# Monitor critical processes
while true; do
    check_process_health nginx 1 5
    check_process_health apache2 1 10
    check_process_health mysql 1 3
    check_process_health postgres 1 2

    sleep "$check_interval"
done
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check permissions before killing
if [ "$(id -u)" -ne 0 ]; then
    echo "Need root privileges to kill system processes"
    sudo killall nginx
fi

# Kill only user-owned processes
killall -u "$(whoami)" firefox

# Check if you can kill a process
ps aux | grep nginx
kill -0 $(pgrep nginx) 2>/dev/null && echo "Can kill nginx" || echo "Cannot kill nginx"
```

#### Process Not Found
```bash
# Verify process name with exact match
ps aux | grep -E '[p]rocessname'

# Use case-insensitive search
killall -I PROCESSNAME

# Try partial name matching
killall -r '.*process.*'

# Check if process exists before killing
if pgrep processname > /dev/null; then
    killall processname
else
    echo "Process 'processname' not found"
fi
```

#### Stubborn Processes
```bash
# Progressive termination approach
killall -TERM processname      # Try graceful shutdown first
sleep 5
killall -INT processname      # Try interrupt signal
sleep 3
killall -KILL processname     # Force kill as last resort

# Handle zombie processes
ps aux | awk '$8 ~ /^Z/ { print $2 }' | xargs -r kill -9

# Handle defunct processes
sudo killall -9 processname
```

#### Service Manager Interference
```bash
# Services may auto-restart, disable first
systemctl stop nginx
systemctl disable nginx
killall nginx

# Or kill the service properly
systemctl kill nginx

# Check if service manager is controlling process
systemctl status nginx
```

### Debugging Tools

#### Process Discovery
```bash
# Find all variations of process name
ps aux | grep -i firefox
pgrep -af firefox

# Check process tree
pstree -p | grep firefox

# Find parent processes
ps -eo pid,ppid,comm | grep firefox

# Check process details
ls -la /proc/$(pgrep firefox)/

# Monitor process creation/destruction
sudo auditctl -a always,exit -F arch=b64 -S kill,killall -k process_kills
```

#### Signal Testing
```bash
# Test different signals safely
killall -HUP processname    # Usually safe (reload)
killall -USR1 processname   # Application-specific
killall -INT processname    # Usually safe (interrupt)

# Check signal handling
man processname | grep -i signal

# Monitor process response to signals
strace -p $(pgrep processname) -e trace=kill,signal &
killall -HUP processname
```

## Related Commands

- [`kill`](/docs/commands/system-info/kill) - Send signals to processes by PID
- [`pkill`](/docs/commands/system-info/pkill) - Kill processes by name and other attributes
- [`pgrep`](/docs/commands/system-info/pgrep) - Find processes by name and other attributes
- [`skill`](/docs/commands/system-info/skill) - Send signals to processes (deprecated)
- [`ps`](/docs/commands/system-info/ps) - Report process status
- [`top`](/docs/commands/system-info/top) - Display and update sorted information about processes
- [`jobs`](/docs/commands/system-info/jobs) - Display status of jobs in the current session
- [`fg`](/docs/commands/system-info/fg) - Run jobs in the foreground
- [`bg`](/docs/commands/system-info/bg) - Run jobs in the background

## Best Practices

1. **Use specific process names** to avoid accidental termination of unrelated processes
2. **Prefer graceful signals** (TERM, HUP) before using force signals (KILL)
3. **Use the `-i` option** for interactive confirmation when killing critical processes
4. **Check process existence** before attempting to kill to avoid unnecessary error messages
5. **Use user-specific killing** (`-u`) to avoid affecting other users' processes
6. **Wait for process termination** (`-w`) to ensure processes have fully terminated
7. **Use verbose mode** (`-v`) for logging and auditing purposes
8. **Test with signal 0** to check if you can kill a process without actually killing it
9. **Consider using pkill** for more complex matching criteria
10. **Always have backups** before killing critical system processes

## Performance Tips

1. **Use exact name matching** (`-e`) for faster operation with many processes
2. **Combine multiple options** in a single command for efficiency
3. **Use quiet mode** (`-q`) to reduce output when scripting
4. **Avoid regular expressions** (`-r`) for simple exact matches
5. **Use case-insensitive matching** (`-I`) carefully as it can be slower
6. **Consider process groups** (`-g`) for managing related processes efficiently
7. **Monitor system load** when killing many processes simultaneously
8. **Use time-based filtering** (`-o`, `-y`) to target specific process instances
9. **Batch process termination** when possible to reduce system impact
10. **Log operations** for performance analysis and troubleshooting

The `killall` command is an essential tool for process management in Linux systems, providing powerful capabilities for terminating processes by name with various options for safety, precision, and control. When used responsibly with proper understanding of signals and process behavior, it enables efficient system administration and application management.