---
title: killall - Kill processes by name
slug: killall
tags: [process-management, linux-commands]
sidebar_label: killall
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# killall - Kill processes by name

The `killall` command kills processes by name, sending signals to all processes running the specified command. It's useful when you want to terminate all instances of a particular program without finding their individual PIDs.

## Syntax

```bash
killall [OPTIONS] NAME
```

## Common Options

- `-e`, `--exact`: Require exact match for long names
- `-I`, `--ignore-case`: Case insensitive process name match
- `-g`, `--process-group`: Kill process group instead of processes
- `-i`, `--interactive`: Ask for confirmation before killing
- `-l`, `--list`: List all known signal names
- `-q`, `--quiet`: Don't complain if no processes found
- `-r`, `--regexp`: Interpret NAME as regular expression
- `-s`, `--signal SIGNAL`: Send specified signal instead of SIGTERM
- `-u`, `--user USER`: Kill only processes owned by USER
- `-v`, `--verbose`: Report if signal was successfully sent
- `-w`, `--wait`: Wait for processes to die
- `-V`, `--version`: Display version information
- `--help`: Display help message

## Usage Examples

### Basic Usage
```bash
# Kill all processes named 'firefox'
killall firefox

# Kill all instances of 'nginx'
killall nginx

# Kill all 'bash' processes (use with caution)
killall bash
```

### Signal Specification
```bash
# Send SIGKILL (force kill) to all apache processes
killall -9 apache2
# Or
killall -KILL apache2

# Send SIGHUP (reload configuration) to nginx
killall -HUP nginx

# Send SIGUSR1 to all nginx processes
killall -USR1 nginx
```

### Interactive Killing
```bash
# Ask for confirmation before killing
killall -i firefox
# Output: Kill firefox(1234) ? (y/N)
```

### Case Insensitive Matching
```bash
# Kill processes regardless of case
killall -I FIREFOX

# Match 'Chrome', 'chrome', 'CHROME', etc.
killall -I chrome
```

### User-specific Killing
```bash
# Kill processes owned by specific user
killall -u john firefox

# Kill all processes owned by www-data
killall -u www-data httpd
```

### Wait for Processes to Die
```bash
# Kill processes and wait for them to terminate
killall -w firefox

# Kill with timeout
timeout 30 killall -w firefox
```

### Process Group Killing
```bash
# Kill entire process group
killall -g myprocess

# Kill process group owned by user
killall -u www-data -g apache2
```

### Regular Expression Matching
```bash
# Kill processes matching regex pattern
killall -r 'python.*script'

# Kill processes containing 'java' in name
killall -r '.*java.*'

# Kill all processes ending with 'd'
killall -r '.*d$'
```

### Verbose Output
```bash
# Show which processes were killed
killall -v nginx
# Output: Killed nginx(1234) with signal 15
#        Killed nginx(5678) with signal 15
```

### List Available Signals
```bash
# List all available signals
killall -l
# Output: HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE ALRM TERM
#        STKFLT CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH IO PWR SYS
#        UNUSED RTMIN...
```

### Error Handling
```bash
# Don't complain if no processes found
killall -q nonexistent_process
# No output, exit status 0

# Check if processes were found
if killall -q -i firefox; then
    echo "Firefox processes found and killed"
else
    echo "No firefox processes found"
fi
```

## Understanding the Signals

### Common Signals
- **SIGTERM (15)**: Graceful termination (default)
- **SIGKILL (9)**: Force termination (cannot be ignored)
- **SIGHUP (1)**: Reload configuration
- **SIGINT (2)**: Interrupt from keyboard (Ctrl+C)
- **SIGSTOP (19)**: Suspend process
- **SIGCONT (18)**: Continue suspended process

### Signal Numbers and Names
```bash
# Send signal by number
killall -9 processname

# Send signal by name
killall -KILL processname

# Both commands are equivalent
```

## Best Practices

1. **Use `-i` option** for critical processes to avoid accidents
2. **Try SIGTERM first** before using SIGKILL
3. **Use `-u` option** to avoid killing other users' processes
4. **Use in scripts** with proper error handling:
   ```bash
   # Graceful shutdown script
   killall -TERM -w myapp || killall -KILL myapp
   ```
5. **Test with `-v`** to see what would be killed:
   ```bash
   # Dry run to see what would be killed
   killall -v -i processname
   ```

## Related Commands

- `kill`: Send signals to processes by PID
- `pkill`: Kill processes by name and other attributes
- `pgrep`: Find processes by name and other attributes
- `skill`: Send signals to processes (deprecated)
- `xkill`: Kill client by X resource

## Troubleshooting

### Common Issues

1. **Permission denied**: Need appropriate permissions to kill processes
2. **Process not found**: Check if process name is correct
3. **Process respawning**: Service manager may restart killed processes
4. **Partial matches**: Use `-e` for exact matching

### Common Scenarios

```bash
# Force kill stubborn processes
killall -9 firefox

# Reload web server configuration
killall -HUP nginx

# Kill processes owned by specific user
killall -u username firefox

# Find what would be killed without actually killing
killall -v processname
```

### Script Examples
```bash
#!/bin/bash
# Service management script
manage_service() {
    local service=$1
    local action=$2

    case $action in
        "stop")
            echo "Stopping $service..."
            if killall -q "$service"; then
                killall -TERM -w "$service" && echo "$service stopped"
            else
                echo "$service not running"
            fi
            ;;
        "force-stop")
            echo "Force stopping $service..."
            killall -KILL "$service" && echo "$service force killed"
            ;;
        "reload")
            echo "Reloading $service..."
            if killall -HUP "$service"; then
                echo "$service reloaded"
            else
                echo "Failed to reload $service"
            fi
            ;;
        "restart")
            echo "Restarting $service..."
            killall -TERM "$service" 2>/dev/null
            sleep 2
            killall -KILL "$service" 2>/dev/null
            systemctl start "$service" || "$service" &
            ;;
        "status")
            if pgrep "$service" > /dev/null; then
                local count=$(pgrep "$service" | wc -l)
                echo "$service is running ($count instances)"
            else
                echo "$service is not running"
            fi
            ;;
        *)
            echo "Usage: $0 {stop|force-stop|reload|restart|status}"
            return 1
            ;;
    esac
}

# Usage
manage_service nginx stop
manage_service apache2 reload
manage_service firefox status
```

### Advanced Usage
```bash
# Process cleanup script
cleanup_processes() {
    local pattern=$1
    local signal=${2:-TERM}
    local timeout=${3:-10}

    echo "Cleaning up processes matching: $pattern"

    # First, try graceful termination
    echo "Sending $signal signal..."
    if killall -"$signal" "$pattern"; then
        echo "Waiting for processes to terminate..."
        timeout "$timeout" killall -w "$pattern" || {
            echo "Timeout, force killing..."
            killall -KILL "$pattern"
        }
    else
        echo "No processes found matching: $pattern"
    fi
}

# User process management
manage_user_processes() {
    local username=$1
    local action=$2
    local process_pattern=$3

    case $action in
        "list")
            echo "Processes for $username matching '$process_pattern':"
            pgrep -u "$username" -f "$process_pattern" | while read pid; do
                comm=$(ps -p "$pid" -o comm=)
                echo "  PID $pid: $comm"
            done
            ;;
        "kill")
            echo "Killing processes for $username matching '$process_pattern'..."
            pkill -u "$username" -f "$process_pattern"
            ;;
        "interactive")
            echo "Interactive kill for $username processes..."
            killall -u "$username" -i "$process_pattern"
            ;;
    esac
}

# Batch process termination
batch_terminate() {
    local processes="$@"
    local timeout=30

    echo "Batch terminating: $processes"

    # Send TERM to all processes
    for proc in $processes; do
        echo "Sending TERM to $proc..."
        killall -q -TERM "$proc" &
    done

    # Wait a bit
    sleep 5

    # Force kill any remaining processes
    for proc in $processes; do
        if pgrep "$proc" > /dev/null; then
            echo "Force killing remaining $proc processes..."
            killall -q -KILL "$proc" &
        fi
    done

    wait
    echo "Batch termination complete"
}

# Usage examples
cleanup_processes "firefox.*plugin" TERM 15
manage_user_processes john list "java.*-jar"
manage_user_processes www-data kill "httpd"
batch_terminate firefox chrome libreoffice
```

### Safety Scripts
```bash
# Safe process killer with confirmation
safe_kill() {
    local process=$1
    local force=${2:-false}

    echo "=== Safe Process Killer ==="
    echo "Target process: $process"

    # List matching processes
    local pids=$(pgrep "$process")
    if [ -z "$pids" ]; then
        echo "No processes found matching: $process"
        return 1
    fi

    echo "Found processes:"
    for pid in $pids; do
        comm=$(ps -p "$pid" -o pid,user,comm=)
        echo "  $comm"
    done

    # Confirmation
    read -p "Are you sure you want to kill these processes? (y/N): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        echo "Killing processes..."
        if [ "$force" = "true" ]; then
            killall -v -KILL "$process"
        else
            killall -v -TERM "$process"
            sleep 2
            # Check if any remain
            if pgrep "$process" > /dev/null; then
                echo "Some processes remain, force killing..."
                killall -v -KILL "$process"
            fi
        fi
    else
        echo "Operation cancelled"
        return 1
    fi
}

# Service health manager
health_manager() {
    local service=$1
    local max_restart=${2:-3}
    local restart_count=0

    echo "Health manager for: $service"

    while true; do
        if ! pgrep "$service" > /dev/null; then
            echo "$service is down, restarting... (attempt $((restart_count + 1))/$max_restart)"
            systemctl start "$service" 2>/dev/null || "$service" &
            sleep 5

            if pgrep "$service" > /dev/null; then
                echo "$service restarted successfully"
                restart_count=0
            else
                restart_count=$((restart_count + 1))
                if [ $restart_count -ge $max_restart ]; then
                    echo "Maximum restart attempts reached for $service"
                    break
                fi
            fi
        fi
        sleep 30
    done
}

# Usage
safe_kill firefox
safe_kill chrome true
health_manager nginx 5
```