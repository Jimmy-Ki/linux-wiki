---
title: ps - Process Status
sidebar_label: ps
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ps - Process Status

The `ps` command reports information about currently running processes, making it one of the most fundamental and powerful process monitoring tools in Linux. It provides detailed information about process IDs, resource usage, execution states, and parent-child relationships.

## Basic Syntax

```bash
ps [OPTIONS]
```

## Common Options

### Process Selection Options
- `-A, -e` - Select all processes
- `-a` - Select all processes except both session leaders and processes not associated with a terminal
- `-a` - Select all processes except session leaders
- `-d` - Select all processes except session leaders
- `-N, --deselect` - Negate selection
- `-r` - Restrict selection to running processes
- `-T` - Select all processes on this terminal
- `-x` - Select processes without controlling ttys

### Output Format Options
- `-C` - Command name
- `-F` - Extra full format
- `-f` - Full format listing
- `-j, --jobs` - Jobs format
- `-l, --long` - Long format
- `-o, --format` - User-defined format
- `-O, --overline` - Overloaded
- `-y, --no-headers` - No headers
- `--cols, --columns` - Set screen width
- `--headers` - Repeat header lines
- `--no-headers` - Print no header line

### Display Options
- `-H` - Process hierarchy (forest)
- `-n, --no-headers` - No headers
- `-w, --wide` - Wide output
- `-Z` - Add security context
- `--cumulative` - Include some dead child process data
- `--forest` - ASCII art process tree
- `--vwidth` - Variable width screen columns

### Information Options
- `-c` - Show true command name
- `-L, --threads` - Show threads, possibly with LWP and NLWP columns
- `-m, --threads` - Show threads
- `-V, --version` - Display version information
- `--help` - Print help message
- `--info` - Print debugging info

## Usage Examples

### Basic Process Listing
```bash
# Show processes for current terminal
ps

# Show all processes running
ps -A

# Show all processes in full format
ps aux

# Show all processes with BSD syntax
ps ax

# Show all processes with standard syntax
ps -ef
```

### User-Specific Process Listings
```bash
# Show processes for current user
ps u

# Show processes for specific user
ps -u username
ps -U username

# Show processes for specific user ID
ps -u 1000
ps -U 1000

# Show processes not owned by current user
ps -U $(id -u) -N
```

### Process Tree Display
```bash
# Show process hierarchy (forest style)
ps -f --forest

# Show ASCII art process tree
ps -e -o pid,ppid,cmd --forest

# Show process tree for specific user
ps -u username -f --forest

# Show all processes in tree format
ps -axjf
```

### Specific Process Selection
```bash
# Select by process ID
ps -p 1234
ps -p 1234,5678,9012

# Select by process name
ps -C nginx
ps -C "chrome"

# Select by process group
ps -g 1234
ps -G groupname

# Select by terminal
ps -t tty1
ps -t pts/0

# Select by session
ps -s 1234
```

### Output Formatting
```bash
# Custom output format
ps -eo pid,ppid,cmd,%cpu,%mem

# Show specific columns with custom headers
ps -o pid=PID,user=USER,cmd=COMMAND

# Show elapsed time
ps -eo pid,cmd,etime

# Show thread information
ps -eLf

# Show all available columns
ps -eo L
```

### Filtering and Sorting
```bash
# Sort by CPU usage (descending)
ps aux --sort=-%cpu

# Sort by memory usage (descending)
ps aux --sort=-%mem

# Sort by process ID
ps aux --sort=pid

# Filter by process state
ps -eo stat,pid,cmd | grep '^R'

# Show only running processes
ps -eo stat,pid,cmd | awk '$1 ~ /R/'

# Filter by command name
ps aux | grep nginx
```

### Resource Monitoring
```bash
# Show top CPU consuming processes
ps aux --sort=-%cpu | head -11

# Show top memory consuming processes
ps aux --sort=-%mem | head -11

# Show processes using specific amount of CPU
ps aux --no-headers | awk '$3 > 50.0'

# Show processes using specific amount of memory
ps aux --no-headers | awk '$4 > 10.0'

# Show zombie processes
ps aux | awk '$8 ~ /Z/'

# Show processes with specific nice values
```
ps -eo pid,ni,cmd | awk '$2 < 0'
```
```

## Practical Examples

### System Monitoring
```bash
# System resource overview
ps aux --sort=-%cpu,%mem | head -20

# Find resource-intensive processes
ps aux --no-headers | awk '{if($3>50 || $4>10) print $2, $11, $3"% CPU", $4"% MEM"}'

# Monitor specific application
ps -C apache2 -o pid,ppid,cmd,%cpu,%mem

# Check for zombie processes
ps aux | awk '$8 ~ /^Z/ {print "Zombie:", $2, $11}'

# Show processes by parent-child relationship
ps -e -o pid,ppid,user,cmd --forest
```

### Process Management
```bash
# Find process ID by name
pgrep -f nginx || ps -C nginx -o pid=

# Find all processes of a specific user
ps -u www-data -o pid,cmd

# Show all processes running as root
ps -U root -u root

# Show processes with specific arguments
ps -f -C python | grep 'script.py'

# Monitor specific process
watch -n 1 'ps -p $(pgrep nginx) -o pid,%cpu,%mem,cmd'
```

### Troubleshooting
```bash
# Find processes using specific file
lsof -f -- /var/log/nginx/access.log | awk 'NR>1 {print $2}' | xargs ps -p

# Show processes listening on ports
ps aux | grep 'nginx'

# Find processes with high I/O wait
ps -eo pid,stat,wchan,cmd | grep -i wait

# Show processes with specific environment variables
ps ewwo pid,cmd | grep -i 'JAVA_HOME'

# Check for runaway processes
ps aux --no-headers | awk '{if($3>90) print "High CPU:", $2, $11, $3"%"}'
```

### Performance Analysis
```bash
# Real-time process monitoring
watch -n 1 'ps aux --sort=-%cpu | head -10'

# Memory usage analysis
ps -eo pid,vsz,rss,cmd --sort=-rss | head -10

# Thread analysis
ps -eLf | awk '{print $2}' | sort | uniq -c | sort -nr | head

# Process state distribution
ps -eo stat | sort | uniq -c

# CPU usage by process group
ps -eo pid,ppid,%cpu,cmd | awk '{cpu[$3]+=$4} END {for(p in cpu) print p, cpu[p]}'
```

### Application-Specific Examples
```bash
# Web server monitoring
ps -C nginx,apache2 -o pid,user,%cpu,%mem,cmd

# Database processes
ps -C mysqld,postgresql -o pid,%cpu,%mem,etime,cmd

# Development environment
ps -u $(whoami) -f | grep -E '(vim|code|git|npm)'

# Background jobs
ps aux | grep -E '[j]ava|[p]ython|[n]ode' | grep -v grep

# Container processes
ps aux | grep -E '[d]ocker|[k]ubelet'
```

### Security Monitoring
```bash
# Processes running as root
ps -U root -u root -o pid,cmd

# Processes with setuid bit
ps aux | awk '$6 ~ /s/'

# Network processes
ps aux | grep -E 'sshd|vsftpd|apache'

# Suspicious processes
ps aux | awk '($11 !~ /^\// && $11 !~ /^\[/) {print $2, $11}'

# Processes with unusual parent IDs
ps -eo pid,ppid,cmd | awk '$2==1 && $3!~/^\[/ {print "Orphan:", $1, $3}'
```

## Process States

The `ps` command displays process states using the following codes:

- **R** - Running or runnable (on run queue)
- **S** - Sleeping (interruptible sleep)
- **D** - Waiting (uninterruptible sleep, usually I/O)
- **Z** - Zombie (terminated but parent not waiting)
- **T** - Stopped or traced
- **W** - Paging (not valid since kernel 2.6.xx)
- **X** - Dead (should never be seen)

Additional modifiers:
```
- **<** - High priority process
```
- **N** - Low priority process
- **L** - Has pages locked in memory
- **s** - Session leader
- **l** - Multi-threaded process
- **+** - Foreground process group

## Output Columns

When using `ps aux` (BSD style), columns include:
- **USER** - Username of process owner
- **PID** - Process ID
- **%CPU** - CPU usage percentage
- **%MEM** - Memory usage percentage
- **VSZ** - Virtual memory size (KB)
- **RSS** - Resident set size (KB)
- **TTY** - Controlling terminal
- **STAT** - Process state
- **START** - Start time of process
- **TIME** - CPU time used
- **COMMAND** - Command name

## Related Commands

- [`top`](/docs/commands/process-management/top) - Real-time process viewer
- [`htop`](/docs/commands/process-management/htop) - Interactive process viewer
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`killall`](/docs/commands/process-management/killall) - Kill processes by name
- [`jobs`](/docs/commands/process-management/jobs) - Display shell jobs
- [`pgrep`](/docs/commands/process-management/pgrep) - Find processes by name
- [`pidof`](/docs/commands/process-management/pidof) - Find process ID
- [`pstree`](/docs/commands/process-management/pstree) - Display process tree

## Best Practices

```
1. **Use appropriate options** for your monitoring needs (`aux`, `-ef`, `-eo pid,cmd`)
```
```
2. **Combine with sorting** to find resource-intensive processes quickly
```
```
3. **Use filtering** with `grep` for specific process monitoring
```
```
4. **Monitor regularly** to establish baseline resource usage
```
```
5. **Watch process states** for troubleshooting hung processes
```
```
6. **Check for zombies** to prevent resource leaks
```
```
7. **Use custom formats** for specific monitoring requirements
```
```
8. **Pipe to other tools** for advanced analysis and reporting
```

The `ps` command is essential for system administration and process monitoring. Mastering its various options and output formats provides comprehensive visibility into system performance and process behavior.