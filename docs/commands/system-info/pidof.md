---
title: pidof - Find Process ID by Name
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pidof - Find Process ID by Name

The `pidof` command finds the process ID (PID) of running programs by name. It's a simple and efficient tool for locating specific processes when you know their executable name, making it particularly useful for process management and automation scripts.

## Basic Syntax

```bash
pidof [OPTIONS] PROGRAM_NAME
```

## Common Options

- `-s` - Return only a single PID (the first one found)
- `-c` - Only show processes with the same root directory
- `-x` - Include processes started by shell scripts
- `-o PID` - Omit the specified PID from results
- `-m` - Show processes with matching names in different namespaces

## Usage Examples

### Basic Process Lookup
```bash
# Find PID of nginx
pidof nginx
13312 5371

# Find PID of cron daemon
pidof crond
- 1509

# Find PID of init process
pidof init
- 1

# Find PID of SSH daemon
pidof sshd
1234 5678 9012
```

### Single PID Return
```bash
# Get only the first PID found
pidof -s nginx
- 13312

# Useful when you need only one instance
PID=$(pidof -s nginx)
kill -HUP $PID  # Send signal to first nginx instance
```

### Script Process Detection
```bash
# Find processes started by scripts
pidof -x myscript.sh
- 23456

# Find python script processes
pidof -x python
34567 45678
```

### Excluding Specific PIDs
```bash
# Find all nginx processes except current one
pidof -o $$ nginx
- 13312

# Exclude specific PID
pidof -o 1234 sshd
- 5678 9012
```

## Practical Examples

### Service Management
```bash
#!/bin/bash
# Restart nginx if it's not running

NGINX_PID=$(pidof -s nginx)
if [ -z "$NGINX_PID" ]; then
    echo "Nginx is not running, starting it..."
    systemctl start nginx
else
    echo "Nginx is running with PID $NGINX_PID"
fi
```

### Process Monitoring
```bash
#!/bin/bash
# Monitor if critical services are running

services=("nginx" "mysql" "redis")
for service in "${services[@]}"; do
    pid=$(pidof -s "$service")
    if [ -n "$pid" ]; then
        echo "$service is running (PID: $pid)"
    else
        echo "WARNING: $service is not running!"
    fi
done
```

### Application Health Checks
```bash
#!/bin/bash
# Health check for web application

APP_PID=$(pidof -s myapp)
if [ -n "$APP_PID" ]; then
    # Check if process is responding
    if kill -0 "$APP_PID" 2>/dev/null; then
        echo "Application is healthy (PID: $APP_PID)"
        exit 0
    else
        echo "Application process exists but not responding"
        exit 1
    fi
else
    echo "Application is not running"
    exit 1
fi
```

### Log Rotation
```bash
#!/bin/bash
# Rotate logs and restart services

SERVICES=("nginx" "apache2")
for service in "${SERVICES[@]}"; do
    # Find service PID
    PID=$(pidof -s "$service")
    if [ -n "$PID" ]; then
        echo "Rotating logs for $service (PID: $PID)"
        # Send log rotation signal
        kill -USR1 "$PID"
        sleep 1
    fi
done
```

### Database Management
```bash
#!/bin/bash
# Database backup with process checking

MYSQL_PID=$(pidof -s mysqld)
if [ -n "$MYSQL_PID" ]; then
    echo "MySQL is running (PID: $MYSQL_PID), starting backup..."
    mysqldump -u user -p database > backup.sql
else
    echo "MySQL is not running, cannot perform backup"
    exit 1
fi
```

## Advanced Usage

### Multiple Instance Management
```bash
#!/bin/bash
# Manage multiple instances of the same program

PROGRAM="nginx"
PIDS=$(pidof "$PROGRAM")

if [ -n "$PIDS" ]; then
    echo "Found $PROGRAM instances: $PIDS"

    # Send signal to all instances
    for pid in $PIDS; do
        echo "Sending HUP to $PROGRAM instance $pid"
        kill -HUP "$pid"
    done
else
    echo "No $PROGRAM instances found"
fi
```

### Process Tree Analysis
```bash
#!/bin/bash
# Find all child processes of a parent program

PARENT_NAME="nginx"
PARENT_PID=$(pidof -s "$PARENT_NAME")

if [ -n "$PARENT_PID" ]; then
    echo "Parent $PARENT_NAME PID: $PARENT_PID"

    # Find child processes
    child_pids=$(pgrep -P "$PARENT_PID")
    if [ -n "$child_pids" ]; then
        echo "Child processes: $child_pids"
    fi
fi
```

### Service Restart Scripts
```bash
#!/bin/bash
# Graceful service restart

SERVICE="myapp"
PID=$(pidof -s "$SERVICE")

if [ -n "$PID" ]; then
    echo "Found $SERVICE with PID $PID, performing graceful restart..."

    # Send graceful shutdown signal
    kill -TERM "$PID"

    # Wait for process to stop
    while pidof "$SERVICE" > /dev/null; do
        echo "Waiting for $SERVICE to stop..."
        sleep 1
    done

    echo "$SERVICE stopped, starting new instance..."
    systemctl start "$SERVICE"
else
    echo "$SERVICE is not running, starting it..."
    systemctl start "$SERVICE"
fi
```

### Process Cleanup Scripts
```bash
#!/bin/bash
# Clean up orphaned processes

PROGRAM="old_worker"
PIDS=$(pidof "$PROGRAM")

if [ -n "$PIDS" ]; then
    echo "Found orphaned $PROGRAM processes: $PIDS"
    echo "Terminating orphaned processes..."

    for pid in $PIDS; do
        echo "Killing $PROGRAM instance $pid"
        kill -TERM "$pid"
        sleep 2

        # Force kill if still running
        if kill -0 "$pid" 2>/dev/null; then
            echo "Force killing $PROGRAM instance $pid"
            kill -KILL "$pid"
        fi
    done

    echo "Cleanup completed"
else
    echo "No orphaned $PROGRAM processes found"
fi
```

## Integration with System Administration

### System Monitoring
```bash
#!/bin/bash
# Monitor critical system processes

CRITICAL_PROCS=("init" "systemd" "kernel" "kthreadd")

for proc in "${CRITICAL_PROCS[@]}"; do
    pid=$(pidof -s "$proc" 2>/dev/null)
    if [ -n "$pid" ]; then
        echo "✓ $proc is running (PID: $pid)"
    else
        echo "✗ $proc is not running!"
    fi
done
```

### Load Balancer Health
```bash
#!/bin/bash
# Check load balancer backend health

BACKENDS=("app1" "app2" "app3")
for backend in "${BACKENDS[@]}"; do
    pid=$(pidof -s "$backend")
    if [ -n "$pid" ]; then
        echo "Backend $backend is healthy (PID: $pid)"
        # Mark as healthy in load balancer
    else
        echo "Backend $backend is down!"
        # Remove from load balancer pool
    fi
done
```

### Container Process Management
```bash
#!/bin/bash
# Monitor processes inside containers

CONTAINER_NAME="webserver"
PID=$(pidof -s "nginx")

if [ -n "$PID" ]; then
    echo "Nginx running in container (PID: $PID)"

    # Check if process is in the correct container
    if grep -q "$PID" /proc/*/cgroup 2>/dev/null; then
        echo "Process is containerized correctly"
    else
        echo "Warning: Process might not be in expected container"
    fi
else
    echo "Nginx not found in container"
fi
```

## Troubleshooting

### Process Not Found
```bash
# Check if program is actually running
ps aux | grep "program_name"

# Use alternative search methods
pgrep -f "program_name"
pgrep "program_name"

# Check for full path issues
pidof /usr/bin/nginx
pidof nginx
```

### Multiple Process Instances
```bash
# Get all instances
pidof nginx
13312 5371

# Get only the main process
pidof -s nginx
- 13312

# Get PIDs as array
IFS=' ' read -ra PIDS <<< "$(pidof nginx)"
for pid in "${PIDS[@]}"; do
    echo "nginx instance: $pid"
done
```

### Permission Issues
```bash
# Check if you can see the process
ps aux | grep "process_name"

# Use sudo if needed
sudo pidof nginx

# Check process ownership
ps -eo pid,user,cmd | grep nginx
```

## Performance Considerations

### Efficient Process Lookup
```bash
# For frequent checks, store PID
APP_PID=$(pidof -s myapp)
if [ -n "$APP_PID" ]; then
    # Use stored PID for subsequent operations
    if kill -0 "$APP_PID" 2>/dev/null; then
        echo "Process still running"
    fi
fi
```

### Batch Process Checking
```bash
# Check multiple processes efficiently
services=("nginx" "mysql" "redis" "apache2")
for service in "${services[@]}"; do
    if pid=$(pidof -s "$service" 2>/dev/null); then
        echo "$service: $pid"
    else
        echo "$service: not running"
    fi
done
```

## Related Commands

- [`pgrep`](/docs/commands/process-management/pgrep) - Find processes by name or attributes
- [`ps`](/docs/commands/process-management/ps) - Process status
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`jobs`](/docs/commands/process-management/jobs) - List shell jobs
- [`top`](/docs/commands/process-management/top) - Dynamic process viewer
- [`htop`](/docs/commands/process-management/htop) - Interactive process viewer

## Best Practices

1. **Use `-s` flag** when you need only one PID for operations
2. **Store PIDs in variables** for repeated use in scripts
3. **Check for empty results** when process might not be running
4. **Combine with `kill -0`** to verify process is still alive
5. **Use error handling** for cases where processes don't exist
6. **Consider using `pgrep`** for more complex pattern matching
7. **Check permissions** when looking for processes owned by other users
8. **Use full paths** if multiple programs have similar names

The `pidof` command is a simple yet powerful tool for process discovery, essential for system administration, monitoring scripts, and automated process management workflows.