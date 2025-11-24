---
title: disown - Remove Jobs from Shell
sidebar_label: disown
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# disown - Remove Jobs from Shell

The `disown` command removes jobs from the shell's job table, preventing them from being affected by shell events like SIGHUP signals when the shell exits. This allows processes to continue running after the terminal session ends.

## Basic Syntax

```bash
disown [-h] [-ar] [JOB_SPEC ... | PID ...]
```

## Common Options

- `-h` - Mark each job so that SIGHUP is not sent to it if the shell receives a SIGHUP
- `-a` - Remove all jobs from the job table
- `-r` - Remove only running jobs from the job table

## Usage Examples

### Basic Job Removal
```bash
# Start a background job
sleep 300 &
[1] 12345

# List jobs
jobs
[1]+  Running                 sleep 300 &

# Remove job from shell control
disown %1

# Job is no longer listed
jobs

# But process still exists
ps aux | grep sleep
user    12345  0.0  0.0   4508   796 pts/0    S    10:30   0:00 sleep 300
```

### Removing Running Jobs Only
```bash
# Start multiple jobs
sleep 100 &
[1] 12346
sleep 200
^Z
[2]+  Stopped                 sleep 200
sleep 300 &
[3] 12347

# List all jobs
jobs
[1]   Running                 sleep 100 &
[2]+  Stopped                 sleep 200
[3]-  Running                 sleep 300 &

# Remove only running jobs
disown -r

# Check remaining jobs
jobs
[2]+  Stopped                 sleep 200
```

### Removing All Jobs
```bash
# Start several jobs
job1 &
job2 &
job3 &
^Z
[4]+  Stopped                 job3

# List jobs
jobs
[1]   Running                 job1 &
[2]-  Running                 job2 &
[3]   Running                 job3 &
[4]+  Stopped                 job3

# Remove all jobs
disown -a

# All jobs removed
jobs
```

### Preventing SIGHUP with -h Option
```bash
# Start long-running process
python long_script.py &
[1] 12348

# Mark job to ignore hangup signal
disown -h %1

# Exit shell - process continues running
exit

# In new terminal, check if process still running
ps aux | grep long_script.py
user    12348  0.1  0.2  12345  6789 ?        S    10:35   0:01 python long_script.py
```

## Practical Examples

### Persistent Background Services
```bash
# Start web server in background
python -m http.server 8000 &
[1] 12349

# Remove from shell control so it persists
disown -h %1

# Exit terminal - server continues running
exit

# Can still access server in browser
curl http://localhost:8000
```

### Data Processing Jobs
```bash
# Start large data processing
python process_large_dataset.py input.csv output.json &
[1] 12350

# Make it persistent
disown -h %1

# Can log out safely while processing continues
exit

# Check progress later
tail -f output.json
```

### Backup Operations
```bash
# Start backup process
rsync -av /source/ /backup/location &
[1] 12351

# Make it survive shell exit
disown -h %1

# Log out - backup continues
exit

# Monitor backup progress from another session
ps aux | grep rsync
```

### Development Servers
```bash
# Start development server
npm run dev &
[1] 12352

# Remove from shell control
disown %1

# Can close terminal without killing server
exit

# Server continues running
curl http://localhost:3000
```

### Database Operations
```bash
# Start database dump
mysqldump -u user -p database > backup.sql &
[1] 12353

# Make it persistent
disown -h %1

# Exit while dump continues
exit

# Dump completes in background
```

## Advanced Usage

### Specific Job Selection
```bash
# Remove specific job by number
disown %2

# Remove by process ID
disown 12345

# Remove multiple jobs
disown %1 %3 %5

# Remove jobs by name pattern
disown %?python
```

### Job Management Workflow
```bash
# Start job
command &
[1] 12354

# Check job status
jobs -l
[1]+ 12354 Running                 command &

# Remove from shell
disown %1

# Verify process still running
ps -p 12354
  PID TTY      STAT   TIME COMMAND
12354 pts/0    S      0:00 command
```

### Combining with Other Job Control
```bash
# Start job
long_process

# Suspend with Ctrl+Z
^Z
[1]+  Stopped                 long_process

# Background it
bg %1

# Remove from shell control
disown -h %1

# Exit safely
exit
```

### Script Usage
```bash
#!/bin/bash
# Start background service
my_service &
SERVICE_PID=$!

# Remove from shell control
disown $SERVICE_PID

# Store PID for later management
echo $SERVICE_PID > /var/run/myservice.pid

echo "Service started with PID $SERVICE_PID"
```

## Error Handling

### Non-existent Jobs
```bash
# Try to disown non-existent job
disown %99
bash: disown: %99: no such job

# Check available jobs first
jobs
```

### Invalid Process IDs
```bash
# Try to disown invalid PID
disown 99999
bash: kill: (99999) - No such process
```

### Permission Issues
```bash
# Try to disown process owned by another user
disown 1
bash: kill: (1) - Operation not permitted
```

## Monitoring Disowned Processes

### Finding Disowned Processes
```bash
# Find processes that were disowned
ps aux | grep -v grep | grep "process_name"

# Use pstree to see process hierarchy
pstree -p user

# Check specific PID
ps -p 12345 -o pid,ppid,cmd
```

### Process Recovery
```bash
# If you forgot to disown, but process is still running
ps aux | grep "process_name"
user    12345  0.0  0.0   4508   796 ?        S    10:45   0:00 process_name

# Can still send signals to it
kill -TERM 12345
```

## Shell Configuration

### Enable Job Control
```bash
# Check if job control is enabled
set -o | grep monitor

# Enable job control if needed
set -o monitor
```

### Custom Disown Functions
```bash
# Disown and save PID
disown_save() {
    local job="$1"
    if [ -z "$job" ]; then
        job="%+"
    fi
    jobs -l | grep "\[$job\]" | awk '{print $2}' > "/tmp/disowned_$(date +%s).pid"
    disown "$job"
}

# Disown all and save PIDs
disown_all_save() {
    local timestamp=$(date +%s)
    local pid_file="/tmp/disowned_$timestamp.pid"
    jobs -l | awk '{print $2}' > "$pid_file"
    disown -a
    echo "Disowned PIDs saved to $pid_file"
}
```

## Integration with Other Commands

### Combining with nohup
```bash
# Alternative to nohup
command &
disown -h %+ && exit

# Compare approaches
nohup command &              # Manages output redirection
command &; disown -h %+ && exit  # More flexible but manual
```

### Using with screen/tmux
```bash
# Start process, disown, then reattach in screen
command &
disown %1
screen -dm bash -c "fg %1; exec bash"

# Or use screen directly
screen -dm command
```

### Process Management Scripts
```bash
#!/bin/bash
# disown_daemon.sh - Start daemon and disown

start_daemon() {
    local command="$1"
    local pidfile="$2"

    # Start command
    $command &
    local pid=$!

    # Disown to make persistent
    disown -h $pid

    # Save PID
    echo $pid > "$pidfile"

    echo "Started daemon with PID $pid"
}

# Usage
start_daemon "my_daemon --config /etc/mydaemon.conf" "/var/run/mydaemon.pid"
```

## Security Considerations

### Process Ownership
```bash
# Only disown processes you own
ps aux | grep "^$USER" | grep "process"

# Be careful with privileged processes
sudo command &
disown # This might not work as expected
```

### Resource Management
```bash
# Monitor disowned processes that consume resources
ps aux --sort=-%cpu | head -10
ps aux --sort=-%mem | head -10

# Clean up orphaned processes
ps aux | awk '$3 == "?" && $1 != "root" {print "Orphan:", $2, $11}'
```

## Related Commands

- [`nohup`](/docs/commands/process-management/nohup) - Run command immune to hangups
- [`bg`](/docs/commands/process-management/bg) - Background suspended jobs
- [`fg`](/docs/commands/process-management/fg) - Bring jobs to foreground
- [`jobs`](/docs/commands/process-management/jobs) - List active jobs
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`wait`](/docs/commands/process-management/wait) - Wait for job completion

## Best Practices

1. **Use `-h` flag** when you want processes to survive shell exit
2. **Monitor disowned processes** to prevent resource leaks
3. **Save PIDs** if you need to manage processes later
4. **Use with caution** - disowned processes can be harder to manage
5. **Consider nohup** for simpler persistent background tasks
6. **Clean up processes** that are no longer needed
7. **Document disowned processes** for system maintenance
8. **Use screen/tmux** for complex interactive background tasks

The `disown` command is powerful for creating persistent background processes, but requires careful management to avoid orphaned processes consuming system resources.