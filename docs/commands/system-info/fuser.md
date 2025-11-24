---
title: fuser - Find Processes Using Files or Sockets
sidebar_label: fuser
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fuser - Find Processes Using Files or Sockets

The `fuser` command identifies processes using files or sockets. It's particularly useful for determining which processes are preventing unmounting filesystems, deleting files, or accessing network ports.

## Basic Syntax

```bash
fuser [OPTIONS] FILE|SOCKET
```

## Common Options

### Selection Options
- `-a, --all` - Display all files on command line
- `-m, --mount` - Show all processes using filesystems mounted on the specified files
- `-i, --inode` - Show processes using files with the same inode
- `-s, --silent` - Silent operation
- `-v, --verbose` - Verbose output

### Signal Options
- `-k, --kill` - Kill processes accessing the file
- `-SIGNAL` - Send specified signal instead of SIGKILL
- `-l, --list-signals` - List available signals

### Output Options
- `-n SPACE, LIST` - Select processes in specified namespace
- `-4, --ipv4` - Search IPv4 sockets only
- `-6, --ipv6` - Search IPv6 sockets only

### Display Options
- `-f, --file` - Show processes using files
- `-u, --user` - Append username to PID
- `-w, --write` - Show only processes with write access

## Usage Examples

### Basic File Usage
```bash
# Find processes using a specific file
fuser /var/log/syslog

# Find processes using a directory
fuser /tmp

# Show which user is using the file
fuser -u /var/log/syslog

# Find processes with write access
fuser -w /tmp/testfile
```

### Filesystem Usage
```bash
# Find processes using a filesystem
fuser -m /home

# Show all processes preventing unmount
fuser -mv /mnt/usb

# Find processes on mounted filesystem
fuser -m /dev/sdb1
```

### Network Socket Usage
```bash
# Find processes using TCP port 80
fuser -n tcp 80

# Find processes using UDP port 53
fuser -n udp 53

# Find processes on specific network interface
fuser -n tcp 192.168.1.1/80

# Show IPv4 and IPv6 connections
fuser -4 -n tcp 80
fuser -6 -n tcp 80
```

## Practical Examples

### Unmount Troubleshooting
```bash
#!/bin/bash
# Find and handle processes preventing unmount

MOUNTPOINT="$1"
if [ -z "$MOUNTPOINT" ]; then
    echo "Usage: $0 <mountpoint>"
    exit 1
fi

echo "Checking processes preventing unmount of: $MOUNTPOINT"

# Find processes using the mountpoint
PROCESSES=$(fuser -m "$MOUNTPOINT" 2>/dev/null)

if [ -n "$PROCESSES" ]; then
    echo "Processes using $MOUNTPOINT:"
    fuser -mv "$MOUNTPOINT"

    echo -e "\nProcess details:"
    for pid in $PROCESSES; do
        if [ "$pid" != "$MOUNTPOINT" ]; then
            process_name=$(ps -p "$pid" -o comm=)
            echo "PID $pid: $process_name"
            ps -p "$pid" -o pid,ppid,user,cmd
        fi
    done

    echo -e "\nOptions:"
    echo "1. Kill processes: fuser -km $MOUNTPOINT"
    echo "2. Stop processes manually"
    echo "3. Use lazy unmount: umount -l $MOUNTPOINT"
else
    echo "No processes found using $MOUNTPOINT"
    echo "Safe to unmount: umount $MOUNTPOINT"
fi
```

### Port Conflict Resolution
```bash
#!/bin/bash
# Find and resolve port conflicts

PORT="$1"
PROTOCOL="${2:-tcp}"

if [ -z "$PORT" ]; then
    echo "Usage: $0 <port> [protocol]"
    echo "Example: $0 8080 tcp"
    exit 1
fi

echo "Checking processes using $PROTOCOL port $PORT"

# Find processes using the port
PROCESSES=$(fuser -n "$PROTOCOL" "$PORT" 2>/dev/null)

if [ -n "$PROCESSES" ]; then
    echo "Processes using $PROTOCOL port $PORT:"
    fuser -v -n "$PROTOCOL" "$PORT"

    echo -e "\nProcess details:"
    for pid in $PROCESSES; do
        if [ "$pid" != "$PORT" ]; then
            process_name=$(ps -p "$pid" -o comm=)
            command_line=$(ps -p "$pid" -o cmd=)
            echo "PID $pid: $process_name"
            echo "Command: $command_line"
        fi
    done

    echo -e "\nResolution options:"
    echo "1. Kill process: kill $pid"
    echo "2. Kill all processes: fuser -k -n $PROTOCOL $PORT"
    echo "3. Change application configuration"
else
    echo "Port $PORT/$PROTOCOL is not in use"
fi
```

### File Lock Detection
```bash
#!/bin/bash
# Find processes with locks on files

FILE="$1"
if [ -z "$FILE" ]; then
    echo "Usage: $0 <filepath>"
    exit 1
fi

echo "Checking locks on file: $FILE"

# Check if file exists
if [ ! -e "$FILE" ]; then
    echo "File does not exist: $FILE"
    exit 1
fi

# Find processes using the file
PROCESSES=$(fuser "$FILE" 2>/dev/null)

if [ -n "$PROCESSES" ]; then
    echo "Processes using $FILE:"
    fuser -v "$FILE"

    echo -e "\nProcess details:"
    for pid in $PROCESSES; do
        if [ "$pid" != "$FILE" ]; then
            process_name=$(ps -p "$pid" -o comm=)
            echo "PID $pid: $process_name"

            # Check file descriptors
            echo "File descriptors:"
            ls -la "/proc/$pid/fd" 2>/dev/null | grep -E "($FILE|$(readlink -f "$FILE"))" || echo "  No matching FDs found"
        fi
    done

    echo -e "\nCannot modify/delete file while processes are using it"
else
    echo "No processes currently using $FILE"
    echo "File can be safely modified/deleted"
fi
```

### System Resource Cleanup
```bash
#!/bin/bash
# Clean up orphaned processes and file handles

echo "System Resource Cleanup"
echo "====================="

# Find processes using deleted files
echo -e "\nProcesses with deleted file handles:"
DELETED_FILES=$(lsof +L1 2>/dev/null | grep "(deleted)")

if [ -n "$DELETED_FILES" ]; then
    echo "$DELETED_FILES"

    # Extract PIDs for cleanup options
    PIDS=$(echo "$DELETED_FILES" | awk '{print $2}' | sort -u)
    echo -e "\nPIDs to consider restarting: $PIDS"
else
    echo "No processes with deleted file handles found"
fi

# Find processes preventing tmp cleanup
echo -e "\nProcesses using /tmp:"
fuser -v /tmp 2>/dev/null

# Find long-running processes on temporary files
echo -e "\nProcesses with long-running file handles:"
find /tmp -type f -mtime +1 -exec fuser {} \; 2>/dev/null | sort -u

# Network cleanup suggestions
echo -e "\nNetwork port usage:"
for port in 80 443 8080 3000 5000; do
    processes=$(fuser -n tcp "$port" 2>/dev/null)
    if [ -n "$processes" ]; then
        echo "Port $port: $processes"
    fi
done
```

### Application Deployment Helper
```bash
#!/bin/bash
# Helper for application deployment - find what needs to be stopped

APP_NAME="$1"
APP_DIR="$2"

if [ -z "$APP_NAME" ] || [ -z "$APP_DIR" ]; then
    echo "Usage: $0 <app_name> <app_directory>"
    exit 1
fi

echo "Deployment preparation for: $APP_NAME"
echo "Application directory: $APP_DIR"

# Find processes using application directory
echo -e "\nProcesses using application directory:"
DIR_PROCESSES=$(fuser -m "$APP_DIR" 2>/dev/null)

if [ -n "$DIR_PROCESSES" ]; then
    echo "Found processes using $APP_DIR:"
    for pid in $DIR_PROCESSES; do
        if [ "$pid" != "$APP_DIR" ]; then
            process_name=$(ps -p "$pid" -o comm=)
            echo "PID $pid: $process_name"
        fi
    done

    echo -e "\nStop these processes before deployment"
else
    echo "No processes using $APP_DIR"
fi

# Find processes by application name
echo -e "\nProcesses by application name:"
APP_PROCESSES=$(pgrep "$APP_NAME")

if [ -n "$APP_PROCESSES" ]; then
    echo "Found $APP_NAME processes:"
    for pid in $APP_PROCESSES; do
        process_name=$(ps -p "$pid" -o comm=)
        command_line=$(ps -p "$pid" -o cmd=)
        echo "PID $pid: $process_name"
        echo "Command: $command_line"
    done

    echo -e "\nStop application processes before deployment"
else
    echo "No $APP_NAME processes found"
fi

# Check for common ports (if web application)
echo -e "\nChecking common web application ports:"
for port in 80 8080 3000 5000 8000; do
    processes=$(fuser -n tcp "$port" 2>/dev/null)
    if [ -n "$processes" ]; then
        echo "Port $port: $processes"
    fi
done
```

## Advanced Usage

### System Health Monitor
```bash
#!/bin/bash
# Monitor system health with fuser

echo "System Health Monitor"
echo "==================="

# Check for processes preventing critical operations
echo -e "\nCritical filesystem access:"
for mount in / /var /home /tmp; do
    echo "Mountpoint: $mount"
    fuser -m "$mount" 2>/dev/null | wc -l
done

# Check for unusual port usage
echo -e "\nUnusual port usage:"
for port in {1..1024}; do
    processes=$(fuser -n tcp "$port" 2>/dev/null)
    if [ -n "$processes" ]; then
        echo "Port $port: $processes"
    fi
done | head -20

# Check for processes with many open files
echo -e "\nProcesses with high file descriptor usage:"
for pid in $(ps -eo pid= | head -20); do
    fd_count=$(ls /proc/$pid/fd 2>/dev/null | wc -l)
    if [ "$fd_count" -gt 100 ]; then
        process_name=$(ps -p "$pid" -o comm=)
        echo "PID $pid ($process_name): $fd_count open files"
    fi
done
```

## Related Commands

- [`lsof`](/docs/commands/process-management/lsof) - List open files
- [`ps`](/docs/commands/process-management/ps) - Process status
- [`netstat`](/docs/commands/network/netstat) - Network statistics
- [`ss`](/docs/commands/network/ss) - Socket statistics
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes

## Best Practices

1. **Use with `-v`** for verbose output to understand what's happening
2. **Use `-m`** for filesystem-related operations
3. **Use `-u`** to see which users are accessing files
4. **Be careful with `-k`** as it terminates processes
5. **Use specific signals** instead of SIGKILL when possible
6. **Check with `ps`** before killing processes to understand what they're doing
7. **Use in scripts** for automated deployment and maintenance
8. **Combine with `lsof`** for comprehensive file access analysis

The `fuser` command is essential for system administration tasks involving file access, mounting/unmounting filesystems, and network port management.