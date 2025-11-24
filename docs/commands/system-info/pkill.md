---
title: pkill - Kill processes by pattern
slug: pkill
tags: [process-management, linux-commands]
sidebar_label: pkill
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# pkill - Kill processes by pattern

The `pkill` command kills processes based on name and other attributes. It offers more flexible filtering than `killall` and can match processes by various criteria including name, user, terminal, and other attributes.

## Syntax

```bash
pkill [OPTIONS] PATTERN
```

## Common Options

### Signal Options
- `-SIGNAL`, `--signal SIGNAL`: Send specified signal
- `-9`: Same as `-KILL`
- `-15`: Same as `-TERM`

### Selection Options
- `-f`, `--full`: Use full process name
- `-x`, `--exact`: Exact match on process name
- `-i`, `--ignore-case`: Case insensitive matching
- `-u`, `--euid UID`: Match by effective user ID
- `-U`, `--uid UID`: Match by real user ID
- `-g`, `--pgroup PGID`: Match by process group ID
- `-t`, `--terminal TTY`: Match by controlling terminal
- `-P`, `--parent PPID`: Match by parent process ID
- `-s`, `--session SID`: Match by session ID
- `-c`, `--count`: Count matching processes
- `-n`, `--newest`: Select newest process
- `-o`, `--oldest`: Select oldest process

### Other Options
- `-v`, `--inverse`: Negate the match
- `-e`, `--echo`: Display what is killed
- `-l`, `--list-name`: List process names of matching processes
- `-a`, `--list-full`: List full command lines of matching processes
- `-F`, `--pidfile FILE`: Read PID from file
- `--help`: Display help message
- `--version`: Display version information

## Usage Examples

### Basic Usage
```bash
# Kill processes by name
pkill firefox

# Kill processes by partial name
pkill fire
```

### Signal Specification
```bash
# Send SIGKILL to all nginx processes
pkill -KILL nginx

# Send SIGHUP to reload configuration
pkill -HUP nginx

# Send SIGUSR1 to processes
pkill -USR1 myprocess
```

### Full Process Name Matching
```bash
# Match in full command line
pkill -f "python script.py"

# Kill processes with specific arguments
pkill -f "--port=8080"

# Kill processes in specific directory
pkill -f "/home/user/app/"
```

### Exact Matching
```bash
# Exact match on process name
pkill -x bash

# Avoid partial matches
pkill -x /usr/sbin/nginx
```

### User-specific Killing
```bash
# Kill processes owned by specific user
pkill -u john firefox

# Kill processes owned by multiple users
pkill -u john,mary firefox

# Kill processes not owned by root
pkill -v -u root nginx
```

### Terminal-specific
```bash
# Kill processes on specific terminal
pkill -t pts/0

# Kill all processes on terminals
pkill -t ''

# Kill processes on remote SSH connections
pkill -t pts
```

### Parent Process Matching
```bash
# Kill all children of a process
pkill -P 1234

# Kill processes whose parent is init
pkill -P 1
```

### Process Group Matching
```bash
# Kill entire process group
pkill -g 1234

# Kill processes in specific session
pkill -s 5678
```

### Newest/Oldest Process
```bash
# Kill newest process matching pattern
pkill -n firefox

# Kill oldest process matching pattern
pkill -o sshd
```

### Count and List
```bash
# Count matching processes
pkill -c firefox

# List processes that would be killed
pkill -l firefox

# List full command lines
pkill -a -f python
```

### Regular Expression Matching
```bash
# Kill processes matching regex pattern
pkill -f '.*\.py$'

# Kill processes containing specific text
pkill -f 'error.*log'

# Complex pattern matching
pkill -f '(java|python).*server'
```

### Echo and Verbose
```bash
# Show which processes are killed
pkill -e firefox

# List processes before killing
pkill -l -v -f python
```

### Complex Filtering
```bash
# Kill processes by multiple criteria
pkill -u www-data -f nginx

# Kill processes not matching pattern
pkill -v -u root

# Count processes without killing
pkill -c -f "chrome.*--incognito"
```

### Session Management
```bash
# Kill all processes in current session
pkill -s $$

# Kill processes in specific session
pkill -s $(pgrep gnome-session)

# Clean up user session on logout
pkill -u $USER
```

## Understanding the Matching

### Default Matching
By default, `pkill` matches against the process name (first 15 characters of `/proc/[pid]/comm`):

```bash
# Matches process name only
pkill firefox  # Matches 'firefox' but not 'firefox-bin'
```

### Full Matching (`-f`)
Matches against the entire command line from `/proc/[pid]/cmdline`:

```bash
# Matches any part of command line
pkill -f "python script.py"
```

### Exact Matching (`-x`)
Matches the entire process name exactly:

```bash
# Only matches exact process name
pkill -x nginx  # Won't match 'nginx-debug'
```

## Best Practices

1. **Use `-f` option** for searching full command lines
2. **Use `-e` option** to see what's being killed
3. **Test with `-l` first** to see what would be matched
4. **Use specific user filtering** to avoid killing wrong processes
5. **Use in scripts** for process management:
   ```bash
   # Kill old processes
   pkill -f "old_process"
   # Send specific signal
   pkill -HUP -u www-data nginx
   ```

## Related Commands

- `killall`: Kill processes by name
- `kill`: Send signals to processes by PID
- `pgrep`: Find processes by name and attributes
- `skill`: Send signals to processes (deprecated)
- `slay`: Kill processes (if installed)

## Troubleshooting

### Common Issues

1. **Wrong processes killed**: Use `-l` to check what would be matched
2. **Permission denied**: Need appropriate permissions
3. **Processes respawn**: Service managers may restart them
4. **Pattern too broad**: Use more specific patterns or `-x` option

### Common Scenarios

```bash
# Test before killing
pkill -l -f pattern

# Kill by user and pattern
pkill -u username -f "process.*args"

# Force kill if regular kill fails
pkill -KILL -f stubborn_process
```

### Script Examples
```bash
#!/bin/bash
# Advanced process manager
advanced_process_manager() {
    local action=$1
    local pattern=$2
    local user=$3
    local signal=${4:-TERM}

    case $action in
        "test")
            echo "Processes matching pattern '$pattern':"
            pkill -l -f "$pattern"
            ;;
        "kill")
            echo "Killing processes matching '$pattern' with signal $signal..."
            pkill -e -"$signal" -f "$pattern"
            ;;
        "user-kill")
            echo "Killing processes for user '$user' matching '$pattern'..."
            pkill -e -"$signal" -u "$user" -f "$pattern"
            ;;
        "count")
            local count=$(pkill -c -f "$pattern")
            echo "Found $count processes matching '$pattern'"
            ;;
        "force-kill")
            echo "Force killing processes matching '$pattern'..."
            pkill -e -KILL -f "$pattern"
            ;;
        *)
            echo "Usage: $0 {test|kill|user-kill|count|force-kill} pattern [user] [signal]"
            return 1
            ;;
    esac
}

# Process cleanup with confirmation
safe_cleanup() {
    local pattern=$1
    local force=${2:-false}

    echo "=== Safe Process Cleanup ==="
    echo "Pattern: $pattern"

    # Show what would be killed
    echo "Processes that match:"
    pkill -l -f "$pattern"

    if [ $? -eq 0 ]; then
        read -p "Proceed with killing these processes? (y/N): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            if [ "$force" = "true" ]; then
                pkill -e -KILL -f "$pattern"
            else
                pkill -e -TERM -f "$pattern"
                sleep 2
                # Check if any remain
                if pkill -c -f "$pattern" > /dev/null; then
                    echo "Some processes remain, force killing..."
                    pkill -e -KILL -f "$pattern"
                fi
            fi
        else
            echo "Cancelled"
        fi
    else
        echo "No processes found matching pattern"
    fi
}

# Usage
advanced_process_manager test "python.*server"
advanced_process_manager user-kill "java.*-jar" www-data
safe_cleanup "firefox.*plugin"
```

### Advanced Usage
```bash
# Session cleanup on logout
cleanup_session() {
    echo "Cleaning up session for user $USER..."

    # Kill GUI applications
    pkill -u $USER -f "(gnome|kde|xfce)"

    # Kill development tools
    pkill -u $USER -f "(vim|emacs|nano)"

    # Kill background jobs
    pkill -u $USER -f "(wget|curl|rsync)"

    # Kill any remaining processes except shell
    pkill -u $USER -v -f "(bash|zsh|sh)"

    echo "Session cleanup complete"
}

# Process group management
manage_process_groups() {
    local main_process=$1
    local action=$2

    case $action in
        "stop")
            echo "Stopping $main_process and all children..."
            # Get main process PID
            local main_pid=$(pgrep -x "$main_process" | head -1)
            if [ -n "$main_pid" ]; then
                # Kill entire process group
                pkill -g "$main_pid"
            fi
            ;;
        "graceful-stop")
            echo "Gracefully stopping $main_process and children..."
            local main_pid=$(pgrep -x "$main_process" | head -1)
            if [ -n "$main_pid" ]; then
                # Send TERM to process group
                pkill -TERM -g "$main_pid"
                sleep 5
                # Force kill if still running
                pkill -KILL -g "$main_pid"
            fi
            ;;
        "show-tree")
            echo "Process tree for $main_process:"
            local main_pid=$(pgrep -x "$main_process" | head -1)
            if [ -n "$main_pid" ]; then
                pstree -p "$main_pid"
            fi
            ;;
    esac
}

# Service restart script
smart_restart() {
    local service=$1
    local timeout=${2:-30}

    echo "Smart restart of $service..."

    # Send graceful shutdown signal
    pkill -HUP -f "$service"
    sleep 5

    # Check if still running
    if pkill -c -f "$service" > /dev/null; then
        echo "Service still running, attempting graceful shutdown..."
        pkill -TERM -f "$service"

        # Wait for graceful shutdown
        local elapsed=0
        while [ $elapsed -lt $timeout ]; do
            if ! pkill -c -f "$service" > /dev/null; then
                echo "Service stopped gracefully"
                systemctl start "$service"
                return 0
            fi
            sleep 2
            elapsed=$((elapsed + 2))
        done

        # Force kill if still running
        echo "Timeout reached, force killing..."
        pkill -KILL -f "$service"
        sleep 2
        systemctl start "$service"
    else
        echo "Service not running, starting..."
        systemctl start "$service"
    fi
}

# Usage examples
cleanup_session
manage_process_groups nginx graceful-stop
smart_restart apache2 45
```

### Monitoring and Maintenance
```bash
# Process health monitor
health_monitor() {
    local pattern=$1
    local max_instances=${2:-10}
    local interval=${3:-60}

    while true; do
        local count=$(pkill -c -f "$pattern")
        if [ $count -gt $max_instances ]; then
            echo "Warning: $count instances of '$pattern' (max: $max_instances)"
            echo "Listing instances:"
            pkill -l -f "$pattern" | head -10

            # Optional: kill oldest processes
            # pkill -o -TERM -f "$pattern"
        fi
        sleep $interval
    done
}

# Automatic cleanup of old processes
cleanup_old_processes() {
    local pattern=$1
    local max_age=${2:-3600}  # 1 hour in seconds

    echo "Cleaning up old processes matching: $pattern"

    # Find processes older than max_age
    ps aux | grep -E "$pattern" | while read line; do
        pid=$(echo $line | awk '{print $2}')
        start_time=$(echo $line | awk '{print $9}')

        # Convert start time to timestamp and check age
        if [ -n "$pid" ] && [ -n "$start_time" ]; then
            age_seconds=$(ps -p "$pid" -o etimes= 2>/dev/null | tr -d ' ')
            if [ -n "$age_seconds" ] && [ "$age_seconds" -gt "$max_age" ]; then
                echo "Killing old process (PID: $pid, age: ${age_seconds}s)"
                kill -TERM "$pid"
            fi
        fi
    done
}

# Resource-based cleanup
cleanup_by_resources() {
    local cpu_threshold=${1:-80}
    local mem_threshold=${2:-20}
    local pattern=${3:-".*"}

    echo "Cleaning up high-resource processes matching: $pattern"

    # Find processes exceeding thresholds
    ps aux | grep -E "$pattern" | while read line; do
        pid=$(echo $line | awk '{print $2}')
        cpu=$(echo $line | awk '{print $3}')
        mem=$(echo $line | awk '{print $4}')
        comm=$(echo $line | awk '{print $11}')

        if [ -n "$cpu" ] && [ -n "$mem" ] && [ -n "$pid" ]; then
            cpu_int=${cpu%.*}
            mem_int=${mem%.*}

            if [ "$cpu_int" -gt $cpu_threshold ] || [ "$mem_int" -gt $mem_threshold ]; then
                echo "High resource process: $comm (PID: $pid, CPU: ${cpu}%, MEM: ${mem}%)"
                # Optional: kill high-resource processes
                # kill -TERM "$pid"
            fi
        fi
    done
}

# Usage
health_monitor "chrome.*--type=renderer" 50 30
cleanup_old_processes "tmp.*cleaner" 7200
cleanup_by_resources 90 30 "java.*"
```