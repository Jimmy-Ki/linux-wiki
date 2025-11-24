---
title: kill - Send Signals to Processes
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# kill - Send Signals to Processes

The `kill` command sends signals to processes, typically to terminate them. Despite its name, `kill` can send various types of signals, not just termination signals. It's a fundamental tool for process management in Linux systems.

## Basic Syntax

```bash
kill [OPTIONS] PID...
kill -l [SIGNAL]
kill -s SIGNAL PID...
kill -SIGNAL PID...
```

## Common Options

### Signal Options
- `-l, --list[=SIGNAL]` - List signal names or convert signal number to name
- `-s, --signal=SIGNAL` - Specify signal to send
- `-SIGNAL` - Specify signal (alternative format)
- `-a, --all` - Do not restrict the signal-to-pid mapping
- `--help` - Display help message
- `--version` - Display version information

## Common Signals

### Standard Signals
- **1 (SIGHUP)** - Hang up signal (reread configuration files)
- **2 (SIGINT)** - Interrupt signal (Ctrl+C)
- **3 (SIGQUIT)** - Quit signal
- **9 (SIGKILL)** - Kill signal (cannot be ignored)
- **15 (SIGTERM)** - Termination signal (default)
- **19 (SIGSTOP)** - Stop signal (suspend process)
- **18 (SIGCONT)** - Continue signal (resume suspended process)

### Additional Signals
- **10 (SIGUSR1)** - User-defined signal 1
- **12 (SIGUSR2)** - User-defined signal 2
- **15 (SIGTERM)** - Termination signal (graceful shutdown)
- **9 (SIGKILL)** - Kill signal (forceful termination)

## Usage Examples

### Basic Process Termination
```bash
# Send default termination signal (SIGTERM)
kill 1234

# Send specific signal by name
kill -SIGTERM 1234
kill -TERM 1234

# Send signal by number
kill -15 1234

# Force kill process (cannot be ignored)
kill -9 1234
kill -SIGKILL 1234
```

### Listing Available Signals
```bash
# List all available signals
kill -l

# Show specific signal number
kill -l TERM
kill -l 15

# Common signal names:
kill -l HUP INT QUIT KILL TERM STOP CONT
```

### Multiple Process Management
```bash
# Send signal to multiple processes
kill 1234 5678 9012

# Kill multiple processes forcefully
kill -9 1234 5678 9012

# Send signal to process group
kill -TERM -1234  # Negative PID kills entire process group
```

### Reload Configuration
```bash
# Send HUP signal to reread configuration
kill -HUP 1234
kill -1 1234

# Common usage for services
kill -HUP $(cat /var/run/nginx.pid)
kill -HUP $(pgrep httpd)
```

### Process State Management
```bash
# Suspend process
kill -STOP 1234

# Resume suspended process
kill -CONT 1234

# Check if process is stopped
ps aux | grep 1234
```

## Signal Types and Effects

### Termination Signals
```bash
# SIGTERM (15) - Graceful termination
kill -TERM 1234

# SIGKILL (9) - Forceful termination
kill -KILL 1234

# SIGINT (2) - Interrupt signal (same as Ctrl+C)
kill -INT 1234

# SIGQUIT (3) - Quit with core dump
kill -QUIT 1234
```

### Control Signals
```bash
# SIGHUP (1) - Hang up and reread config
kill -HUP 1234

# SIGSTOP (19) - Suspend process
kill -STOP 1234

# SIGCONT (18) - Continue suspended process
kill -CONT 1234
```

### User-Defined Signals
```bash
# SIGUSR1 and SIGUSR2 for custom purposes
kill -USR1 1234
kill -USR2 1234
```

## Process Identification and Management

### Finding Process IDs
```bash
# Find PID by process name
pidof nginx
pgrep nginx

# Kill process by name
kill $(pidof nginx)
killall nginx

# Find process and kill
ps aux | grep process_name
kill $(ps aux | grep process_name | awk '{print $2}')
```

### Safe Process Termination
```bash
# Step 1: Try graceful termination
kill -TERM 1234

# Check if process is still running
ps -p 1234

# Step 2: If still running, force kill
kill -KILL 1234

# Step 3: Verify termination
ps -p 1234 || echo "Process terminated"
```

### Process Groups and Sessions
```bash
# Kill all processes in a process group
kill -TERM -1234

# Kill all processes of a user
kill -9 -1  # Dangerous - kills all processes except init

# Kill all child processes
kill -9 $(pgrep -P 1234)
```

## Advanced Usage

### Script Integration
```bash
# Function to safely kill process
safe_kill() {
    local pid=$1
    local timeout=${2:-10}

    # Send SIGTERM
    kill -TERM "$pid"

    # Wait for process to terminate
    for ((i=0; i<timeout; i++)); do
        if ! kill -0 "$pid" 2>/dev/null; then
            echo "Process $pid terminated gracefully"
            return 0
        fi
        sleep 1
    done

    # Force kill if still running
    echo "Process $pid did not terminate, forcing kill"
    kill -KILL "$pid"
}

# Usage
safe_kill 1234
safe_kill 1234 5  # 5 second timeout
```

### Monitoring and Cleanup
```bash
# Kill processes using specific port
kill -9 $(lsof -t -i:8080)

# Kill processes using specific file
kill -9 $(lsof -t /path/to/file)

# Clean up zombie processes (limited capability)
kill -9 $(ps aux | awk '$8 ~ /^Z/ {print $2}')
```

### Service Management
```bash
# Reload service configuration
kill -HUP $(cat /var/run/service.pid)

# Restart service gracefully
kill -TERM $(cat /var/run/service.pid)
service start

# Stop all processes of a service
pkill -f "service-name"
killall service-name
```

## Signal Handling in Applications

### Common Signal Usage Patterns
```bash
# Web servers - reload configuration
kill -HUP $(cat /var/run/nginx.pid)

# Databases - graceful shutdown
kill -TERM $(cat /var/run/mysqld.pid)

# Applications - trigger debugging
kill -USR1 $(pidof application)

# Processes - checkpoint creation
kill -USR2 $(pidof application)
```

### Debugging with Signals
```bash
# Send SIGTRAP for debugging (if supported)
kill -TRAP 1234

# Send SIGSEGV for core dump
kill -SEGV 1234

# Monitor signal responses
strace -p 1234 -e signal
```

## Error Handling and Troubleshooting

### Common Issues
```bash
# "Operation not permitted" - insufficient privileges
# Use sudo or run as appropriate user
sudo kill 1234

# "No such process" - process doesn't exist
# Check if process exists first
kill -0 1234 2>/dev/null && echo "Process exists"

# "Signal already sent" - signal already queued
# Usually not an error, continue
```

### Verification
```bash
# Check if process exists
kill -0 1234 2>/dev/null && echo "Process exists" || echo "Process not found"

# Check process status
ps -p 1234 -o pid,ppid,cmd,stat

# Monitor process until termination
while kill -0 1234 2>/dev/null; do
    echo "Process 1234 is still running"
    sleep 1
done
echo "Process 1234 terminated"
```

## Safety Best Practices

### Safe Termination Sequence
```bash
# 1. Always try SIGTERM first
kill -TERM 1234

# 2. Wait and check
sleep 5
if ps -p 1234 > /dev/null; then
    # 3. Use SIGKILL as last resort
    kill -KILL 1234
fi
```

### Avoid Dangerous Operations
```bash
# Never kill init process (PID 1)
kill -9 1  # DON'T DO THIS - will crash system

# Be careful with negative PIDs (process groups)
kill -9 -1234  # Kills entire process group

# Don't kill essential system processes
ps aux | grep -E "systemd|kernel|kthreadd"
```

### Proper Process Management
```bash
# Use process names when possible
pkill process-name
killall process-name

# Use specific signal names for clarity
kill -TERM 1234  # Better than kill -15 1234

# Verify before killing
ps -p 1234 -o pid,cmd
kill -TERM 1234
```

## Related Commands

- [`killall`](/docs/commands/process-management/killall) - Kill processes by name
- [`pkill`](/docs/commands/process-management/pkill) - Find and signal processes by name
- [`pgrep`](/docs/commands/process-management/pgrep) - Find processes by name
- [`ps`](/docs/commands/process-management/ps) - Report process status
- [`jobs`](/docs/commands/process-management/jobs) - Display active jobs

## Best Practices

1. **Always try SIGTERM first**:
   ```bash
   kill -TERM pid  # Graceful shutdown
   ```

2. **Use signal names instead of numbers**:
   ```bash
   kill -HUP pid    # Better than kill -1 pid
   kill -KILL pid   # Better than kill -9 pid
   ```

3. **Verify process existence**:
   ```bash
   kill -0 pid 2>/dev/null && echo "Process exists"
   ```

4. **Use appropriate tools**:
   - `kill` for specific PIDs
   - `killall` for process names
   - `pkill` for pattern matching

5. **Be careful with system processes**:
   - Never kill PID 1 (init/systemd)
   - Avoid killing critical kernel threads

The `kill` command is essential for process management in Linux. Understanding the different signal types and using appropriate termination strategies will help you manage processes safely and effectively.