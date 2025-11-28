---
title: ps - Process Status
sidebar_label: ps
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ps - Process Status

The `ps` command is one of the most fundamental and versatile utilities in Linux/Unix systems for monitoring and analyzing running processes. It provides detailed information about process IDs, resource consumption, execution states, parent-child relationships, memory usage, and much more. Beyond simple process listing, `ps` offers multiple output formats, sorting capabilities, custom field selection, and process tree visualization, making it an essential tool for system administration, performance monitoring, debugging, and process management workflows.

## Basic Syntax

```bash
ps [OPTIONS]
ps [OPTIONS] [PROCESS SELECTION]
```

## Complete Options Reference

### Process Selection Options

#### Basic Selection
- `-A, -e` - Select all processes on the system
- `-a` - Select all processes except session leaders and processes not associated with a terminal
- `-d` - Select all processes except session leaders
- `-N, --deselect` - Negate the selection
- `-r` - Restrict output to running processes only
- `-T` - Select all processes on this terminal
- `-x` - Select processes without controlling ttys

#### Selection by Process ID
- `-p, --pid=PIDLIST` - Select by process ID
- `--pid=PIDLIST` - Select processes with specified PIDs
- `--ppid=PPIDLIST` - Select processes with specified parent PIDs

#### Selection by Name
- `-C, --command=COMMANDLIST` - Select processes by command name
- `-C name` - Select process named "name"

#### Selection by User/Group
- `-U, --user=USERLIST` - Select by effective user ID or name
- `-u, --user=USERLIST` - Select by real user ID or name
- `-G, --group=GROUPLIST` - Select by effective group ID or name
- `-g, --group=GROUPLIST` - Select by real group ID or name

#### Selection by Terminal/Session
- `-t, --tty=TTYLIST` - Select by controlling terminal
- `-p, --parent=PPIDLIST` - Select processes with specified parent PIDs
- `-s, --sid=SIDLIST` - Select processes by session ID

#### Selection by Priority/Nice
- `--context=CONTEXT` - Select processes with SELinux security context

### Output Format Options

#### Standard Formats
- `-l, --long` - Long format
- `-f, --full` - Full format listing
- `-F, --extra` - Extra full format
- `-j, --jobs` - Jobs format
- `-o, --format=FORMAT` - User-defined format
- `-O, --overline` - Overloaded format (same as -o with some defaults)

#### Format Control
- `-w, --wide` - Wide output (don't truncate)
- `-w 132` - Set output width to 132 characters
- `--cols, --columns=COLUMNS` - Set screen width
- `--headers` - Repeat header lines
- `--no-headers` - Don't print header line
- `--lines=LINES` - Set screen height

#### Display Options
- `-H, --forest` - Display process hierarchy (ASCII art tree)
- `-c` - Show true command name
- `-e` - Show environment after command
- `--forest` - Same as -H
- `--cumulative` - Include some dead child process data
- `--sort=COLUMN` - Sort by specified column
- `--reverse` - Reverse sort order
- `--no-forest` - Don't show forest display

#### Security and Context
- `-Z, --context` - Display SELinux security context
- `--cumulative` - Include cumulative data

### Output Field Specification

#### Process Information Fields
- `pid` - Process ID
- `ppid` - Parent process ID
- `tid` - Thread ID
- `tgid` - Thread group ID
- `pgid` - Process group ID
- `sid` - Session ID
- `tpgid` - Terminal process group ID

#### User and Group Fields
- `uid` - Real user ID
- `euid` - Effective user ID
- `suid` - Saved user ID
- `fsuid` - File system user ID
- `gid` - Real group ID
- `egid` - Effective group ID
- `sgid` - Saved group ID
- `fgid` - File system group ID
- `user` - Username
- `group` - Group name
- `euser` - Effective username
- `egroup` - Effective group name
- `suser` - Saved username
- `sgroup` - Saved group name

#### Command Fields
- `comm` - Command name (executable name)
- `args` - Command with all arguments
- `cmd` - Alias for args
- `command` - Same as args
- `fname` - First 8 bytes of the command's base name
- `ucmd` - User-space command name
- `ucomm` - User command name
- `exe` - Executable path
- `lstart` - Start time of process (standard format)
- `start` - Start time of process
- `started` - Start time
- `stime` - Start time in HH:MM format
- `bsdstart` - Start time in standard format
- `etime` - Elapsed time since process started
- `etimes` - Elapsed time in seconds

#### Resource Usage Fields
- `cputime` - CPU time used (cumulative)
- `time` - CPU time in [DD-]HH:MM:SS format
- `times` - CPU time in seconds
- `pcpu` - % CPU usage (cumulative)
- `%cpu` - % CPU usage
- `c` - Processor utilization (2.2 average)
- `psr` - Processor that process is currently assigned to
- `rtprio` - Real-time priority
- `prio` - Priority (higher number = lower priority)
- `nice` - Nice value (negative = high priority)
- `ni` - Nice value
- `policy` - Scheduling policy (ts, ff, rr)

#### Memory Fields
- `pmem` - % Memory usage
- `%mem` - % Memory usage
- `vsz` - Virtual memory size in KB
- `vsize` - Virtual memory size in bytes
- `rss` - Resident set size in KB
- `rssize` - Resident set size in bytes
- `rsz` - Resident set size
- `size` - Approximate amount of swap space used
- `sz` - Size in physical pages
- `shr` - Shared memory size
- `drs` - Data resident set size
- `trs` - Text resident set size
- `lrs` - Library resident set size
- `dt` - Dirty pages count

#### Status and State Fields
- `stat` - Process state (multi-character)
- `state` - Process state (single character)
- `s` - Process state (alias for stat)
- `flag` - Process flags
- `flags` - Process flags in hexadecimal
- `suid` - Set user ID flag
- `sgid` - Set group ID flag

#### Terminal and Session Fields
- `tty` - Controlling terminal
- `tname` - Controlling terminal name
- `tt` - Controlling tty (alias for tty)
- `session` - Session ID
- `sess` - Session ID (alias)

#### Process Relationship Fields
- `lwp` - Light weight process (thread) ID
- `nlwp` - Number of light weight processes (threads)
- `nthr` - Number of threads (alias for nlwp)
- `tid` - Thread ID
- `tgid` - Thread group ID

#### Security and Context Fields
- `label` - Security label
- `context` - SELinux security context
- `cls` - Scheduling class
- `tpgid` - Terminal process group ID

#### File Descriptor and I/O Fields
- `wchan` - Wait channel (address of kernel function where process is sleeping)
- `nwchan` - Wait channel address in numeric format
- `blocked` - Mask of blocked signals
- `caught` - Mask of caught signals
- `cignore` - Mask of ignored signals
- `sigcatch` - Mask of caught signals
- `sigignore` - Mask of ignored signals

## Usage Examples

### Basic Process Monitoring

#### Quick Process Views
```bash
# Show all processes in BSD format (most common)
ps aux

# Show all processes in Unix format
ps -ef

# Show processes for current user
ps

# Show all processes with full details
ps -efl

# Show processes in tree format
ps -ejH
```

#### Custom Output Formats
```bash
# Custom format with specific columns
ps -eo pid,user,pcpu,pmem,cmd

# Show PID, PPID, and command
ps -eo pid,ppid,cmd

# Show resource usage
ps -eo pid,user,%cpu,%mem,rss,vsz,cmd

# Show all available columns
ps -eo L
```

### Process Selection and Filtering

#### Selection by Process Characteristics
```bash
# Select specific processes by PID
ps -p 1234
ps -p 1234,5678,9012

# Select by command name
ps -C nginx
ps -C "chrome"

# Select by user
ps -u username
ps -U root

# Select by group
ps -G developers

# Select processes without controlling terminal
ps -x

# Select running processes only
ps -r
```

#### Process Tree Visualization
```bash
# Show process hierarchy
ps -ejH

# BSD format with tree
ps axjf

# Full format with forest view
ps -ef --forest

# Custom format with tree
ps -eo pid,ppid,user,cmd --forest

# Show tree for specific user
ps -u username -f --forest
```

### Resource Monitoring and Analysis

#### CPU Usage Monitoring
```bash
# Sort by CPU usage (highest first)
ps aux --sort=-%cpu

# Show top 10 CPU consumers
ps aux --sort=-%cpu | head -11

# Show processes using > 50% CPU
ps aux --no-headers | awk '$3 > 50.0'

# Monitor specific process CPU usage
watch -n 1 "ps -p 1234 -o pid,pcpu,pmem,cmd"

# Show CPU time consumption
ps -eo pid,time,pcpu,cmd
```

#### Memory Usage Analysis
```bash
# Sort by memory usage
ps aux --sort=-%mem

# Show top memory consumers
ps aux --sort=-%mem | head -11

# Show processes using > 10% memory
ps aux --no-headers | awk '$4 > 10.0'

# Memory details
ps -eo pid,user,rss,vsz,%mem,cmd

# Show shared memory usage
ps -eo pid,user,pmem,rss,shr,cmd
```

#### Priority and Scheduling
```bash
# Show process priorities
ps -eo pid,prio,ni,cmd

# Show real-time processes
ps -eo pid,rtprio,policy,cmd

# Show processes with negative nice values (high priority)
ps -eo pid,ni,cmd | awk '$2 < 0'

# Show scheduler classes
ps -eo pid,cls,cmd
```

### Advanced Filtering and Analysis

#### Process State Analysis
```bash
# Show process states
ps -eo stat,pid,cmd

# Show running processes only
ps -eo stat,pid,cmd | grep '^R'

# Show sleeping processes
ps -eo stat,pid,cmd | grep '^S'

# Show zombie processes
ps aux | awk '$8 ~ /Z/'

# Show stopped processes
ps -eo stat,pid,cmd | grep '^T'

# Show processes by state count
ps -eo stat | sort | uniq -c
```

#### Thread and Process Relationship Analysis
```bash
# Show all threads
ps -eLf

# Show thread count for processes
ps -eo pid,nlwp,cmd

# Show process relationships
ps -eo pid,ppid,cmd --forest

# Show parent-child relationships
ps -eo pid,ppid,user,cmd | sort -k2

# Show processes with multiple threads
ps -eo pid,nlwp,cmd | awk '$2 > 1'
```

#### Terminal and Session Analysis
```bash
# Show processes by terminal
ps -t pts/0
ps -t tty1

# Show all terminal processes
ps -a

# Show processes without terminals
ps -x

# Show session leaders
ps -d

# Show process groups
ps -j
```

### Practical System Administration

#### Service Monitoring
```bash
# Monitor web server processes
ps aux | grep -E '(nginx|apache|httpd)'

# Show database processes
ps -u postgres -f
ps -u mysql -f

# Show all system services
ps -eo pid,user,cmd | grep -E '^\s*[1-9]'

# Show daemon processes
ps aux | awk '$8 ~ /^S/'
```

#### Performance Troubleshooting
```bash
# Find resource-intensive processes
ps aux --sort=-%cpu | head -20
ps aux --sort=-%mem | head -20

# Show processes with high I/O wait
ps -eo pid,wchan,cmd | grep -i wait

# Show processes in uninterruptible sleep
ps aux | awk '$8 ~ /D/'

# Monitor specific resource usage
watch -n 2 "ps -eo pid,pcpu,pmem,cmd | head -10"
```

#### Security Analysis
```bash
# Show processes running as root
ps -U root -u root

# Show setuid processes
ps aux | awk '$1 != $8'

# Show processes with unusual permissions
ps -eo pid,user,cmd | grep -v '^root'

# Show network-related processes
ps aux | grep -E '(ssh|ftp|telnet|nc)'

# Show processes with open network connections
netstat -tulpn | awk 'NR>2 {print $7}' | cut -d/ -f1 | sort -u | xargs ps -p
```

## Advanced Techniques

### Custom Monitoring Scripts

#### Process Resource Monitor
```bash
#!/bin/bash
# Advanced process monitoring script

process_monitor() {
    local threshold_cpu=${1:-80}
    local threshold_mem=${2:-80}

    echo "=== Process Resource Monitor ==="
    echo "CPU Threshold: ${threshold_cpu}%"
    echo "Memory Threshold: ${threshold_mem}%"
    echo "Time: $(date)"
    echo ""

    # High CPU processes
    echo "High CPU Usage Processes:"
    ps aux --no-headers | awk -v threshold="$threshold_cpu" '$3 > threshold {
        printf "%-8s %-8s %-6s %-6s %s\n", $1, $2, $3, $4, $11
    }'
    echo ""

    # High Memory processes
    echo "High Memory Usage Processes:"
    ps aux --no-headers | awk -v threshold="$threshold_mem" '$4 > threshold {
        printf "%-8s %-8s %-6s %-6s %s\n", $1, $2, $3, $4, $11
    }'
    echo ""

    # Zombie processes
    zombie_count=$(ps aux | awk '$8 ~ /Z/' | wc -l)
    if [ "$zombie_count" -gt 0 ]; then
        echo "Zombie Processes: $zombie_count"
        ps aux | awk '$8 ~ /Z/'
    fi

    # Process count by state
    echo "Process States:"
    ps -eo stat | sort | uniq -c
}

process_monitor 70 70
```

#### Service Health Checker
```bash
#!/bin/bash
# Service health monitoring

check_service() {
    local service_name="$1"
    local process_name="$2"

    echo "Checking $service_name..."

    # Check if process is running
    if pgrep -f "$process_name" > /dev/null; then
        local pid=$(pgrep -f "$process_name")
        local cpu=$(ps -p "$pid" -o %cpu=)
        local mem=$(ps -p "$pid" -o %mem=)

        echo "✅ $service_name is running (PID: $pid)"
        echo "   CPU: ${cpu}% | Memory: ${mem}%"
    else
        echo "❌ $service_name is not running"
    fi
    echo ""
}

# Check critical services
check_service "Web Server" "nginx"
check_service "Database" "mysqld"
check_service "SSH Daemon" "sshd"
```

### Process Tree Analysis

#### Complete Process Hierarchy
```bash
# Show full process tree with details
ps -ejH --cols=120

# Custom process tree with resource info
ps -eo pid,ppid,user,pcpu,pmem,cmd --forest

# Show process tree for specific application
ps -eo pid,ppid,cmd --forest | grep -A 10 -B 5 "nginx"

# Display process ancestry
function get_process_tree() {
    local pid="$1"
    echo "Process tree for PID $pid:"
    ps -eo pid,ppid,cmd | awk -v target="$pid" '
    function show_tree(pid, indent) {
        cmd[pid] | getline name
        close(cmd[pid])
        printf "%s%s (%s)\n", indent, pid, name
        for (child in parent) {
            if (parent[child] == pid) {
                show_tree(child, indent "  ")
            }
        }
    }
    {
        parent[$1] = $2
        cmd[$1] = "ps -p " $1 " -o cmd="
    }
    END {
        show_tree(target, "")
    }'
}

get_process_tree 1
```

### Real-time Monitoring Integration

#### Live Process Monitoring
```bash
# Watch specific processes
watch -n 2 "ps aux | grep -E '(nginx|mysql|redis)' | grep -v grep"

# Monitor resource usage trends
watch -n 5 'ps aux --sort=-%cpu | head -10'

# Monitor zombie processes
watch -n 10 "ps aux | awk '\$8 ~ /Z/' | wc -l"

# Custom dashboard
while true; do
    clear
    echo "=== Process Monitor $(date) ==="
    echo ""
    echo "Top CPU Processes:"
    ps aux --sort=-%cpu | head -6 | tail -5
    echo ""
    echo "Top Memory Processes:"
    ps aux --sort=-%mem | head -6 | tail -5
    echo ""
    echo "Process Count: $(ps aux | wc -l)"
    echo "Zombie Processes: $(ps aux | awk '$8 ~ /Z/' | wc -l)"
    sleep 3
done
```

## Process States and Their Meanings

### Single Character States
- **R** - Running or runnable (on run queue)
- **S** - Sleeping (interruptible)
- **D** - Sleeping (uninterruptible, usually I/O)
- **Z** - Zombie (terminated but parent hasn't reaped)
- **T** - Stopped or traced (job control signal)
- **X** - Dead (should never be seen)

### Multi-Character State Codes
- **s** - Session leader
- **<** - High-priority (not nice to other users)
- **N** - Low-priority (nice to other users)
- **L** - Has pages locked into memory (for real-time and custom I/O)
- **l** - Multi-threaded (using CLONE_THREAD, like NPTL pthreads)
- **+** - In foreground process group

### Common State Combinations
- **Ss** - Sleeping session leader
- **R+** - Running in foreground
- **Sl** - Sleeping multi-threaded process
- **D<** - Uninterruptible high-priority process
- **Zs** - Zombie session leader

## Troubleshooting

### Common Issues

#### Understanding Process States
```bash
# Find zombie processes and their parents
ps aux | awk '$8 ~ /Z/ {print $2, $3, $8}'
ps -eo pid,ppid,stat,cmd | awk '$3 ~ /Z/'

# Find processes in uninterruptible sleep (I/O bound)
ps aux | awk '$8 ~ /D/'

# Find stopped processes (job control)
ps aux | awk '$8 ~ /T/'

# Find high-priority processes
ps aux | awk '$8 ~ /</'
```

#### Resource Investigation
```bash
# Find processes consuming abnormal resources
ps aux --no-headers | awk '$3 > 95 || $4 > 95'

# Check for memory leaks (growing RSS)
for i in {1..5}; do
    echo "=== Check $i ==="
    ps -o pid,rss,vsz,cmd -p $(pidof myprocess)
    sleep 30
done

# Find processes with many threads
ps -eo pid,nlwp,cmd | awk '$2 > 10'
```

#### Performance Analysis
```bash
# System load correlation
ps aux --sort=-%cpu | head -10
uptime

# Memory pressure analysis
free -h
ps aux --sort=-%mem | head -10

# I/O analysis
ps aux | grep -i "wait"
iostat -x 1
```

## Integration with Other Commands

### Combining with System Tools
```bash
# ps with netstat for network connections
netstat -tulpn | awk 'NR>2 {print $7}' | cut -d/ -f1 | sort -u | xargs ps -p

# ps with lsof for file usage
lsof -p $(pgrep nginx) | grep -E "(REG|DIR)"

# ps with strace for system call analysis
strace -p $(pgrep high_cpu_process) -c

# ps with top for comparison
ps aux | head -10
top -n 1 -b | head -10
```

### Automation and Scripting
```bash
# Kill processes exceeding resource limits
kill_high_cpu() {
    local threshold=${1:-90}
    ps aux --no-headers | awk -v threshold="$threshold" '$3 > threshold {
        print $2, $11
    }' | while read pid cmd; do
        echo "Killing $cmd (PID: $pid) - CPU: $threshold%"
        kill -TERM "$pid"
    done
}

# Generate process report
generate_report() {
    local report_file="/tmp/process_report_$(date +%Y%m%d_%H%M%S).txt"
    {
        echo "=== Process Report ==="
        echo "Generated: $(date)"
        echo "System: $(hostname)"
        echo ""

        echo "=== System Overview ==="
        echo "Total processes: $(ps aux | wc -l)"
        echo "Running processes: $(ps aux | awk '$8 ~ /R/' | wc -l)"
        echo "Sleeping processes: $(ps aux | awk '$8 ~ /S/' | wc -l)"
        echo "Zombie processes: $(ps aux | awk '$8 ~ /Z/' | wc -l)"
        echo ""

        echo "=== Top CPU Consumers ==="
        ps aux --sort=-%cpu | head -11
        echo ""

        echo "=== Top Memory Consumers ==="
        ps aux --sort=-%mem | head -11
        echo ""

        echo "=== Process States Distribution ==="
        ps -eo stat | sort | uniq -c
    } > "$report_file"

    echo "Report generated: $report_file"
}

generate_report
```

## Related Commands

- [`top`](/docs/commands/process-management/top) - Real-time process viewer
- [`htop`](/docs/commands/process-management/htop) - Interactive process viewer with colors
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`killall`](/docs/commands/process-management/killall) - Kill processes by name
- [`pgrep`](/docs/commands/process-management/pgrep) - Find processes by name and attributes
- [`pidof`](/docs/commands/process-management/pidof) - Find process ID of running programs
- [`pstree`](/docs/commands/process-management/pstree) - Display process tree
- [`jobs`](/docs/commands/process-management/jobs) - Display active jobs
- [`nice`](/docs/commands/process-management/nice) - Set process priority
- [`renice`](/docs/commands/process-management/renice) - Modify priority of running processes

## Best Practices

1. **Choose appropriate format** based on your needs (`aux` for overview, `-ef` for details, `-eo` for custom)
2. **Use custom formats** to display exactly the information you need
3. **Combine with sorting** to quickly identify resource-intensive processes
4. **Monitor regularly** to establish baseline resource usage patterns
5. **Watch for zombie processes** to prevent resource leaks and system instability
6. **Use process trees** to understand parent-child relationships
7. **Combine with grep** for filtering specific applications or users
8. **Use watch command** for real-time monitoring of specific processes
9. **Automate monitoring** with custom scripts for critical services
10. **Document resource baselines** for quick identification of anomalies

## Performance Tips

1. **Use `ps aux` for quick overviews** and `ps -ef` for detailed analysis
2. **Pipe to `head`** when you only need the top resource consumers
3. **Use `--no-headers`** in scripts to avoid parsing complications
4. **Combine with `awk`** for advanced filtering and calculations
5. **Use `--sort`** instead of external `sort` for better performance
6. **Monitor specific PIDs** rather than listing all processes when possible
7. **Use process groups** for monitoring related processes
8. **Limit output fields** in scripts to reduce processing overhead
9. **Cache process lists** in monitoring loops to reduce system calls
10. **Use appropriate update intervals** in monitoring scripts to balance accuracy and system load

The `ps` command is an indispensable tool for Linux system administration, providing comprehensive process monitoring and analysis capabilities. Its flexibility in output formatting, process selection, and integration with other system tools makes it essential for performance monitoring, troubleshooting, security analysis, and automated system management tasks.
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