---
title: lsof - List Open Files
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# lsof - List Open Files

The `lsof` command (List Open Files) is a powerful diagnostic tool that lists information about files opened by processes. In Linux, everything is a file, including regular files, directories, block devices, character special files, libraries, pipes, sockets, and network connections.

## Basic Syntax

```bash
lsof [OPTIONS] [FILENAME]
```

## Common Options

### Process Selection
- `-p PID` - List files opened by specific process ID(s)
- `-c COMMAND` - List files opened by processes with specified name
- `-u USER` - List files opened by specific user
- `-g GID` - List files opened by processes with specific GID
- `-a` - AND selections (show only items matching all criteria)

### File Selection
- `FILENAME` - List processes using the specified file
- `+D DIRECTORY` - Recursively search directory for open files
- `+d DIRECTORY` - Search directory for open files (non-recursive)

### Network Options
- `-i` - List Internet and UNIX domain socket files
- `-i [ADDRESS]` - List files matching Internet address (e.g., -i :80)
- `-i [PROTOCOL]` - List files by protocol (TCP, UDP)
- `-i [PORT]` - List files by port number

### Output Options
- `-n` - Don't resolve hostnames (numeric IP addresses)
- `-P` - Don't convert port numbers to port names
- `-F` - Select fields for output
- `-t` - Terse output (process IDs only)
- `-v` - Verbose output
- `-h` - Display help information

### Special Options
- `-r` - Repeat mode (refresh every X seconds)
- `-b` - Avoid kernel calls that might block
- `-l` - Don't convert user IDs to user names
- `-w` - Suppress warning messages

## Usage Examples

### Basic File Information
```bash
# List all open files
sudo lsof

# List files opened by specific process
sudo lsof -p 1234

# List processes using specific file
lsof /var/log/syslog

# List files opened by specific user
lsof -u username

# List files opened by specific command
lsof -c nginx
```

### Network Connections
```bash
# List all network connections
sudo lsof -i

# List connections on specific port
sudo lsof -i :80

# List connections on specific IP
sudo lsof -i 192.168.1.100

# List TCP connections only
sudo lsof -i TCP

# List UDP connections only
sudo lsof -i UDP

# List listening sockets
sudo lsof -i -P -n | grep LISTEN
```

### Directory Monitoring
```bash
# List all open files in directory
lsof +D /var/log

# List open files in directory (non-recursive)
lsof +d /tmp

# Find processes using mounted filesystem
lsof /mnt/data

# Find deleted files still held open
lsof | grep deleted
```

### Advanced Usage
```bash
# Find processes holding deleted files open
sudo lsof | grep '(deleted)'

# List all files opened by user except their own processes
lsof -u ^root

# Find processes using specific device
sudo lsof /dev/sda1

# Combine multiple criteria
sudo lsof -u root -c bash

# Terse output for scripting
sudo lsof -t -i :80
```

## Understanding the Output

### Standard Output Format
```
COMMAND   PID     USER   FD      TYPE             DEVICE     SIZE       NODE     NAME
init      1       root   cwd     DIR                8,2     4096          2      /
init      1       root   rtd     DIR                8,2     4096          2      /
init      1       root   txt     REG                8,2    43496    6121706 /sbin/init
nginx     1234    www    cwd     DIR                8,2     4096     12345      /var/www
nginx     1234    www    4u      IPv4             123456      0t0        TCP    *:http (LISTEN)
```

### Output Columns Explained

#### COMMAND
- Process name (15 characters maximum, truncated with +)

#### PID
- Process ID

#### USER
- User ID or login name of the process owner

#### FD (File Descriptor)
- **cwd** - Current Working Directory
- **rtd** - Root Directory
- **txt** - Program Text (code)
- **mem** - Memory-mapped file
- **mmap** - Memory-mapped device
- **pd** - Parent Directory
- **0-9** - File descriptor numbers
- **u** - File is open for read/write
- **r** - File is open for read-only
- **w** - File is open for write-only
- **** - Space indicates no lock
- **-** - File is locked

#### TYPE
- **REG** - Regular file
- **DIR** - Directory
- **CHR** - Character special file
- **BLK** - Block special file
- **FIFO** - FIFO (named pipe)
- **PIPE** - Pipe
- **SOCK** - Socket
- **IPv4** - IPv4 socket
- **IPv6** - IPv6 socket

#### DEVICE
- Device numbers (major, minor)

#### SIZE
- File size or offset

#### NODE
- Node number (inode number)

#### NAME
- File name or mount point

## Practical Examples

### Finding Port Conflicts
```bash
# Find process using port 80
sudo lsof -i :80

# Find all listening ports
sudo lsof -i -P -n | grep LISTEN

# Check what's using a specific port range
sudo lsof -i :8000-8999

# Find processes using specific network interface
sudo lsof -i @192.168.1.100
```

### Troubleshooting File Locks
```bash
# Find processes using a specific file
lsof /home/user/document.txt

# Find processes with deleted files still open
sudo lsof | grep '(deleted)'

# Find processes using specific directory
sudo lsof +D /var/log

# Find what's preventing unmounting
sudo lsof /mnt/usb_drive
```

### Security Monitoring
```bash
# Find all network connections
sudo lsof -i

# Find suspicious connections (non-standard ports)
sudo lsof -i -P -n | grep -v ':22\|:80\|:443'

# Monitor user activity
sudo lsof -u suspicious_user

# Find processes opening unusual files
sudo lsof -c /bin/sh
```

### System Recovery
```bash
# Find processes using deleted files (common after log rotation)
sudo lsof | grep '(deleted)'

# Find processes using old libraries after updates
sudo lsof | grep '\.so.*deleted'

# Recover space from deleted files held open
sudo lsof -t | xargs -I {} kill -HUP {}
```

### Application Debugging
```bash
# Monitor application file usage
sudo lsof -p $(pgrep application_name)

# Find configuration files being used
sudo lsof -c nginx | grep '\.conf'

# Track log file usage
sudo lsof +D /var/log

# Check library dependencies in use
sudo lsof -p $(pgrep app_name) | grep '\.so'
```

### Scripting and Automation
```bash
#!/bin/bash
# Find process using specific port and kill it
PORT=8080
PID=$(sudo lsof -t -i :$PORT)
if [ -n "$PID" ]; then
    echo "Killing process $PID using port $PORT"
    sudo kill -9 $PID
else
    echo "No process found using port $PORT"
fi
```

```bash
#!/bin/bash
# Monitor for new file deletions
while true; do
    deleted_files=$(sudo lsof | grep '(deleted)')
    if [ -n "$deleted_files" ]; then
        echo "New deleted files detected:"
        echo "$deleted_files"
    fi
    sleep 30
done
```

```bash
#!/bin/bash
# Generate file usage report
REPORT_FILE="/tmp/file_usage_report_$(date +%Y%m%d_%H%M%S).txt"

echo "File Usage Report - $(date)" > $REPORT_FILE
echo "================================" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Most active users by open files
echo "Top 10 Users by Open Files:" >> $REPORT_FILE
sudo lsof | awk '{print $3}' | sort | uniq -c | sort -nr | head -10 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Most active processes
echo "Top 10 Processes by Open Files:" >> $REPORT_FILE
sudo lsof | awk '{print $1}' | sort | uniq -c | sort -nr | head -10 >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Deleted files still open
echo "Deleted Files Still Open:" >> $REPORT_FILE
sudo lsof | grep '(deleted)' >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Network connections
echo "Active Network Connections:" >> $REPORT_FILE
sudo lsof -i | grep ESTABLISHED | wc -l | xargs echo "Established connections:" >> $REPORT_FILE
sudo lsof -i | grep LISTEN | wc -l | xargs echo "Listening ports:" >> $REPORT_FILE

echo "Report saved to $REPORT_FILE"
```

### Real-time Monitoring
```bash
# Monitor port usage in real-time
watch -n 5 'sudo lsof -i :80'

# Monitor file usage for specific application
watch -n 2 'sudo lsof -p $(pgrep nginx)'

# Monitor deleted files (useful after log rotation)
watch -n 30 'sudo lsof | grep deleted'
```

### File System Cleanup
```bash
# Find processes preventing filesystem unmount
sudo lsof /mount/point

# Find processes using old libraries (after system update)
sudo lsof | grep '\.so.*deleted'

# Identify large log files held open
sudo lsof | grep '\.log' | awk '$7 > 1000000 {print}'
```

## Advanced Usage Patterns

### Combining with Other Commands
```bash
# Get process IDs for all web server processes
sudo lsof -t -i :80,443

# Count open files per user
sudo lsof | awk '{print $3}' | sort | uniq -c | sort -nr

# Find all temporary files in use
sudo lsof | grep '/tmp/'

# Monitor socket usage
sudo lsof | grep -E 'IPv[46]|SOCK'

# Find processes with many open files
for pid in $(sudo lsof -t); do
    count=$(sudo lsof -p $pid | wc -l)
    if [ $count -gt 100 ]; then
        echo "Process $pid has $count files open"
        ps -p $pid -o pid,cmd
    fi
done
```

### Custom Field Selection
```bash
# Show only process ID and command
sudo lsof -F pc

# Show network information only
sudo lsof -F iPn

# Terse output for scripting
sudo lsof -t -i :8080

# Custom format for reporting
sudo lsof -F pcnu | while read -r line; do
    case $line in
        p*) echo -n "PID: ${line#p} " ;;
        c*) echo -n "CMD: ${line#c} " ;;
        u*) echo -n "USER: ${line#u} " ;;
        n*) echo "FILE: ${line#n}" ;;
    esac
done
```

## Best Practices

### 1. **Performance Considerations**
- Use `lsof` sparingly on busy systems
- Use `-n` and `-P` flags to speed up network queries
- Consider filtering with `-c`, `-p`, or `-u` to reduce output
- Use `-t` for scripting when only PIDs are needed

### 2. **Security**
- `lsof` typically requires root privileges
- Be careful about exposing sensitive file information
- Use specific filters to avoid showing unnecessary information
- Regular monitoring can help detect security issues

### 3. **Troubleshooting**
- Start with broad searches, then narrow down
- Combine with other tools for comprehensive analysis
- Use lsof to identify resource usage patterns
- Monitor system state during normal operation for baseline

### 4. **System Maintenance**
- Use lsof to identify files preventing unmounting
- Check for deleted files still held open after updates
- Monitor log file usage and rotation
- Track library usage after system updates

### 5. **Performance Tuning**
- Monitor file descriptor usage
- Identify processes with excessive file handles
- Check for file leaks in applications
- Optimize file access patterns

## Related Commands

- [`netstat`](/docs/commands/system-monitoring/netstat) - Network statistics
- [`ss`](/docs/commands/system-monitoring/ss) - Socket statistics
- [`fuser`](/docs/commands/system-monitoring/fuser) - Identify processes using files
- [`ps`](/docs/commands/system-monitoring/ps) - Process status
- [`strace`](/docs/commands/system-monitoring/strace) - System call tracer
- [`ltrace`](/docs/commands/system-monitoring/ltrace) - Library call tracer
- [`find`](/docs/commands/file-management/find) - Find files
- [`procinfo`](/docs/commands/system-monitoring/procinfo) - Process information

## Common Issues and Solutions

### Permission Denied
```bash
# Error: lsof: permission denied
# Solution: Use sudo or run as root
sudo lsof
```

### Slow Performance
```bash
# Speed up network queries
sudo lsof -i -n -P

# Limit search to specific criteria
sudo lsof -u username
sudo lsof -p PID
```

### Deleted Files Taking Space
```bash
# Find processes with deleted files
sudo lsof | grep deleted

# Restart processes holding deleted files
sudo lsof -t | xargs -I {} sudo kill -HUP {}
```

The `lsof` command is an essential tool for Linux system administration and troubleshooting. Its ability to show what processes are using which files, sockets, and other resources makes it invaluable for debugging, security monitoring, and system maintenance. Mastering lsof enables administrators to quickly identify and resolve a wide range of system issues.