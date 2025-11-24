---
title: pgrep - Process Grep
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pgrep - Process Grep

The `pgrep` command searches through currently running processes and lists process IDs (PIDs) based on specified criteria. It's a powerful tool for process discovery and management, offering extensive filtering and pattern matching capabilities beyond simple name matching.

## Basic Syntax

```bash
pgrep [OPTIONS] PATTERN
```

## Common Options

### Output Options
- `-l, --list-name` - List PID and process name
- `-a, --list-full` - List PID and full command line
- `-d, --delimiter STRING` - Specify output delimiter
- `-c, --count` - Count matching processes
- `-v, --inverse` - Invert match (show non-matching processes)
- `-w, --lightweight` - List all TIDs (threads)

### Matching Options
- `-f, --full` - Match against full process name and arguments
- `-x, --exact` - Exact match against process name
- `-i, --ignore-case` - Ignore case in pattern matching

### Selection Options
- `-u, --euid UID` - Match by effective user ID
- `-U, --uid UID` - Match by real user ID
- `-g, --pgroup PGID` - Match by process group ID
- `-G, --group GID` - Match by real group ID
- `-s, --session SID` - Match by session ID
- `-t, --terminal TTY` - Match by controlling terminal
- `-P, --parent PPID` - Match by parent process ID

### Time-Based Options
- `-n, --newest` - Select most recently started process
- `-o, --oldest` - Select least recently started process
- `-O, --older SECONDS` - Match processes older than specified seconds

### Advanced Options
- `-F, --pidfile FILE` - Read PID from file
- `-r, --runstates STATE` - Match by process run state
- `--ns PID` - Match processes in same namespace
- `--nslist NS` - Specify namespaces to consider

## Usage Examples

### Basic Process Search
```bash
# Find all processes containing "nginx"
pgrep nginx
13312 5371

# List process names with PIDs
pgrep -l nginx
13312 nginx
5371 nginx

# Show full command line
pgrep -a nginx
13312 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
5371 nginx: worker process
```

### User-Specific Search
```bash
# Find processes by user
pgrep -u www-data nginx
- 5371

# Find processes by username
pgrep -u root systemd
- 1

# Find all processes for current user
pgrep -u $(id -u)
```

### Exact Matching
```bash
# Exact match (case-sensitive)
pgrep -x nginx
- 13312

# Full command line matching
pgrep -f "nginx -g daemon"
- 13312

# Case-insensitive matching
pgrep -i NGINX
13312 5371
```

### Process Selection by Time
```bash
# Find newest process
pgrep -n python
- 12345

# Find oldest process
pgrep -o sshd
- 567

# Find processes older than 1 hour (3600 seconds)
pgrep -O 3600 sleep
```

## Practical Examples

### Service Management
```bash
#!/bin/bash
# Check if web services are running

services=("nginx" "apache2" "httpd")
for service in "${services[@]}"; do
    pids=$(pgrep "$service")
    if [ -n "$pids" ]; then
        echo "✓ $service is running: $pids"
    else
        echo "✗ $service is not running"
    fi
done
```

### Process Monitoring
```bash
#!/bin/bash
# Monitor specific user processes

username="john"
processes=$(pgrep -u "$username" -l)

if [ -n "$processes" ]; then
    echo "Processes for user $username:"
    echo "$processes"
else
    echo "No processes found for user $username"
fi
```

### Application Health Checks
```bash
#!/bin/bash
# Health check for application processes

app_name="myapp"
pids=$(pgrep -f "$app_name")

if [ -n "$pids" ]; then
    echo "$app_name processes found: $pids"

    # Check if all processes are responding
    for pid in $pids; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "✓ Process $pid is responding"
        else
            echo "✗ Process $pid is not responding"
        fi
    done
else
    echo "$app_name is not running"
fi
```

### Log File Management
```bash
#!/bin/bash
# Find processes using specific log files

log_file="/var/log/app.log"
pids=$(pgrep -f "$log_file")

if [ -n "$pids" ]; then
    echo "Processes using $log_file: $pids"

    # Send SIGHUP to rotate logs
    for pid in $pids; do
        echo "Sending HUP to process $pid"
        kill -HUP "$pid"
    done
else
    echo "No processes are using $log_file"
fi
```

### Development Environment Management
```bash
#!/bin/bash
# Find development processes

dev_processes=$(pgrep -f -l -u $(id -u) "node\|python\|java\|npm")

if [ -n "$dev_processes" ]; then
    echo "Development processes running:"
    echo "$dev_processes"
else
    echo "No development processes found"
fi
```

## Advanced Usage

### Process Tree Analysis
```bash
#!/bin/bash
# Find all child processes of a parent

parent_name="sshd"
parent_pid=$(pgrep -o "$parent_name")

if [ -n "$parent_pid" ]; then
    echo "Parent $parent_name PID: $parent_pid"

    # Find child processes
    child_pids=$(pgrep -P "$parent_pid")
    if [ -n "$child_pids" ]; then
        echo "Child processes: $child_pids"

        # Show details of child processes
        pgrep -P "$parent_pid" -l
    fi
fi
```

### Container Process Monitoring
```bash
#!/bin/bash
# Monitor processes in containers

container_name="webserver"
pids=$(pgrep -f "$container_name")

if [ -n "$pids" ]; then
    echo "Container processes: $pids"

    for pid in $pids; do
        echo "Process $pid details:"
        ps -p "$pid" -o pid,ppid,user,cmd
    done
fi
```

### Process Resource Management
```bash
#!/bin/bash
# Find high-CPU processes

# Find processes using more than 50% CPU
high_cpu_pids=$(ps aux --no-headers | awk '$3 > 50 {print $2}')

if [ -n "$high_cpu_pids" ]; then
    echo "High CPU processes:"
    for pid in $high_cpu_pids; do
        name=$(pgrep -l -d , "$pid" | cut -d' ' -f2)
        echo "PID $pid: $name"
    done
fi
```

### Security Monitoring
```bash
#!/bin/bash
# Monitor suspicious processes

# Find processes with unusual names
suspicious_names=("nc" "netcat" "ncat" "telnet" "sh")

for name in "${suspicious_names[@]}"; do
    pids=$(pgrep -l "$name")
    if [ -n "$pids" ]; then
        echo "Suspicious process found: $pids"

        # Show process details
        pgrep -a "$name"
    fi
done
```

### Batch Process Management
```bash
#!/bin/bash
# Manage multiple similar processes

process_pattern="worker_"
pids=$(pgrep -f "$process_pattern")

if [ -n "$pids" ]; then
    echo "Found worker processes: $pids"

    count=$(pgrep -c -f "$process_pattern")
    echo "Total worker processes: $count"

    # Get newest and oldest
    newest=$(pgrep -n -f "$process_pattern")
    oldest=$(pgrep -o -f "$process_pattern")

    echo "Newest worker: $newest"
    echo "Oldest worker: $oldest"
else
    echo "No worker processes found"
fi
```

## Integration with System Administration

### System Resource Monitoring
```bash
#!/bin/bash
# Monitor system processes by categories

categories=("system" "user" "network" "database")

echo "System Process Summary:"
echo "======================"

# System processes
system_count=$(pgrep -u root -c)
echo "System processes: $system_count"

# User processes
user_count=$(pgrep -v -u root -c)
echo "User processes: $user_count"

# Network processes
network_pids=$(pgrep -f "ssh\|ftp\|http\|telnet")
if [ -n "$network_pids" ]; then
    echo "Network processes: $(echo $network_pids | wc -w)"
fi

# Database processes
db_pids=$(pgrep -f "mysql\|postgres\|oracle")
if [ -n "$db_pids" ]; then
    echo "Database processes: $(echo $db_pids | wc -w)"
fi
```

### Automated Process Cleanup
```bash
#!/bin/bash
# Clean up old processes

# Find processes older than 24 hours
old_processes=$(pgrep -O 86400 -f "old_worker")

if [ -n "$old_processes" ]; then
    echo "Found old processes to clean up: $old_processes"

    for pid in $old_processes; do
        process_name=$(pgrep -l "$pid" | cut -d' ' -f2-)
        echo "Terminating old process: $process_name (PID: $pid)"

        # Graceful termination
        kill -TERM "$pid"
        sleep 5

        # Force kill if still running
        if kill -0 "$pid" 2>/dev/null; then
            kill -KILL "$pid"
        fi
    done
else
    echo "No old processes found to clean up"
fi
```

### Process Dependency Analysis
```bash
#!/bin/bash
# Analyze process dependencies

main_process="nginx"
main_pids=$(pgrep "$main_process")

if [ -n "$main_pids" ]; then
    echo "Analyzing dependencies for $main_process"

    for pid in $main_pids; do
        echo "PID $pid dependencies:"

        # Child processes
        children=$(pgrep -P "$pid")
        if [ -n "$children" ]; then
            echo "  Children: $children"
        fi

        # Same session processes
        session=$(ps -p "$pid" -o sess= | tr -d ' ')
        session_mates=$(pgrep -s "$session" | grep -v "$pid")
        if [ -n "$session_mates" ]; then
            echo "  Session mates: $session_mates"
        fi
    done
fi
```

## Troubleshooting

### No Processes Found
```bash
# Check if pattern is correct
ps aux | grep "pattern"

# Use full command search
pgrep -f "full command pattern"

# Check for case sensitivity
pgrep -i "pattern"
```

### Too Many Results
```bash
# Use exact matching
pgrep -x "exact_name"

# Be more specific with pattern
pgrep -f "specific/path/program"

# Filter by user
pgrep -u username "program"
```

### Permission Issues
```bash
# Use sudo for system processes
sudo pgrep -u root "systemd"

# Check what you can see
pgrep -u $(id -u) "program"
```

## Performance Optimization

### Efficient Process Searching
```bash
# Use exact match when possible
pgrep -x "program_name"

# Limit search scope with user filtering
pgrep -u $(id -u) "program"

# Cache results for repeated use
pids=$(pgrep "program")
if [ -n "$pids" ]; then
    # Use cached PIDs
fi
```

### Batch Operations
```bash
# Multiple searches in one command
for pattern in "nginx" "mysql" "redis"; do
    count=$(pgrep -c "$pattern")
    echo "$pattern: $count processes"
done
```

## Related Commands

- [`pidof`](/docs/commands/process-management/pidof) - Find process ID by name
- [`ps`](/docs/commands/process-management/ps) - Process status
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`pkill`](/docs/commands/process-management/pkill) - Kill processes by name
- [`top`](/docs/commands/process-management/top) - Dynamic process viewer
- [`pstree`](/docs/commands/process-management/pstree) - Display process tree

## Best Practices

1. **Use `-f` flag** for searching command line arguments
2. **Use `-x` flag** for exact process name matching
3. **Combine with `-l`** to see process names with PIDs
4. **Use `-u`** to limit searches by user
5. **Check process count** with `-c` before processing
6. **Use `-n` and `-o`** for time-based selection
7. **Pipe to other commands** for further processing
8. **Store results in variables** for repeated use in scripts

The `pgrep` command is an essential tool for process discovery and management, offering powerful pattern matching and filtering capabilities for system administration and automation tasks.