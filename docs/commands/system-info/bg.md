---
title: bg - Background Job
sidebar_label: bg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bg - Background Job

The `bg` command resumes suspended jobs in the background, allowing you to continue working in the terminal while processes run. It's an essential shell job control command that enables multitasking in command-line environments.

## Basic Syntax

```bash
bg [JOB_SPEC]
```

## Common Options

The `bg` command accepts job specifications:
- `%1` - Job number 1
- `%+` or `%%` - Current job
- `%-` - Previous job
- `%string` - Job whose command starts with string
- `%?string` - Job whose command contains string

## Usage Examples

### Basic Job Control
```bash
# Start a long-running command
sleep 60

# Suspend it with Ctrl+Z
^Z
[1]+  Stopped                 sleep 60

# Resume it in background
bg %1
[1]+ sleep 60 &

# Check background jobs
jobs
[1]+  Running                 sleep 60 &
```

### Managing Multiple Jobs
```bash
# Start multiple processes
tar -czf backup.tar.gz /home/user/documents
^Z
[1]+  Stopped                 tar -czf backup.tar.gz /home/user/documents

find / -name "*.log"
^Z
[2]+  Stopped                 find / -name "*.log"

# List all jobs
jobs
[1]-  Stopped                 tar -czf backup.tar.gz /home/user/documents
[2]+  Stopped                 find / -name "*.log"

# Resume specific job in background
bg %1
[1]- tar -czf backup.tar.gz /home/user/documents &

bg %2
[2]+ find / -name "*.log" &
```

### Job Selection Methods
```bash
# Resume by job number
bg %1

# Resume current job (last stopped)
bg %+

# Resume previous job
bg %-

# Resume by command name
bg %find

# Resume by partial command name
bg %?tar
```

## Practical Examples

### File Operations
```bash
# Start a large file copy
cp -r /large/directory /backup/location
^Z
[1]+  Stopped                 cp -r /large/directory /backup/location

# Resume in background
bg %1

# Start compression while copy runs
tar -czf archive.tar.gz /another/directory
^Z
[2]+  Stopped                 tar -czf archive.tar.gz /another/directory

bg %2

# Check progress
jobs
[1]-  Running                 cp -r /large/directory /backup/location &
[2]+  Running                 tar -czf archive.tar.gz /another/directory &
```

### Development Workflow
```bash
# Start development server
python manage.py runserver
^Z
[1]+  Stopped                 python manage.py runserver

# Resume in background
bg %1

# Start another process
npm run watch
^Z
[2]+  Stopped                 npm run watch

bg %2

# Check both are running
jobs
[1]-  Running                 python manage.py runserver &
[2]+  Running                 npm run watch &
```

### System Administration
```bash
# Start system update
apt update
^Z
[1]+  Stopped                 apt update

bg %1

# Start log monitoring
tail -f /var/log/syslog
^Z
[2]+  Stopped                 tail -f /var/log/syslog

bg %2

# Start backup process
rsync -av /source /destination
^Z
[3]+  Stopped                 rsync -av /source /destination

bg %3

# Monitor all background jobs
jobs
[1]-  Running                 apt update &
[2]+  Running                 tail -f /var/log/syslog &
[3]+  Running                 rsync -av /source /destination &
```

### Data Processing
```bash
# Start data processing script
python process_data.py input.csv output.json
^Z
[1]+  Stopped                 python process_data.py input.csv output.json

bg %1

# Start database backup
mysqldump -u user -p database > backup.sql
^Z
[2]+  Stopped                 mysqldump -u user -p database > backup.sql

bg %2

# Start log analysis
grep -r "ERROR" /var/log/ > errors.txt
^Z
[3]+  Stopped                 grep -r "ERROR" /var/log/ > errors.txt

bg %3
```

### Network Operations
```bash
# Start file download
wget https://example.com/largefile.zip
^Z
[1]+  Stopped                 wget https://example.com/largefile.zip

bg %1

# Start remote backup
scp -r /local/path user@remote:/remote/path
^Z
[2]+  Stopped                 scp -r /local/path user@remote:/remote/path

bg %2

# Start network testing
ping -c 100 google.com
^Z
[3]+  Stopped                 ping -c 100 google.com

bg %3
```

## Advanced Job Management

### Job Status Monitoring
```bash
# Check job status
jobs -l
[1]-  1234 Running                 sleep 300 &
[2]+  5678 Running                 find / -name "*.tmp" &

# Show only running jobs
jobs -r

# Show only stopped jobs
jobs -s

# Detailed job information
jobs -p
- 1234
- 5678
```

### Job Completion Monitoring
```bash
# Start long-running job
make build
^Z
[1]+  Stopped                 make build

bg %1

# Wait for job completion
wait %1
echo "Job completed"

# Monitor with periodic checks
while jobs | grep -q "Running"; do
    echo "Jobs still running..."
    sleep 5
done
```

### Job Output Management
```bash
# Redirect output when backgrounding
bg %1 > output.log 2>&1 &

# Start process with output redirection
long_process > process.log 2>&1 &
^Z
bg %+

# Multiple jobs with different outputs
job1 > output1.log 2>&1 &
^Z
bg %1

job2 > output2.log 2>&1 &
^Z
bg %2
```

## Shell Configuration

### Enable Job Control
```bash
# Check if job control is enabled
set -o monitor

# Enable job control
set -o monitor
# or
set -m

# Disable job control
set +o monitor
# or
set +m
```

### Custom Job Functions
```bash
# Function to background and forget
bgf() {
    bg "$@" && disown %+ 2>/dev/null
}

# Function to list jobs with PIDs
jobsp() {
    jobs -l | awk '{print $2, $NF}'
}

# Function to wait for all jobs
waitall() {
    local job
    for job in $(jobs -p); do
        wait "$job"
    done
}
```

### Job Control Aliases
```bash
# Quick job backgrounding
alias bgc='bg %+ && disown'

# List jobs with details
alias j='jobs -l'

# Background and notify
alias bgn='bg && echo "Job backgrounded"'
```

## Integration with Other Commands

### Combining with Other Job Control Commands
```bash
# Start process, suspend, background, then bring to foreground
long_command
^Z
bg %1
fg %1

# Background and then kill
command
^Z
bg %1
kill %1

# Background and disown (remove from shell)
command
^Z
bg %1
disown %1
```

### Using with Terminal Multiplexers
```bash
# In tmux or screen
bg %1  # Job backgrounded in current shell
tmux new-window -d "fg %1"  # Move to new window

# Create new session with background job
tmux new-session -d -s background "fg %1"
```

## Troubleshooting

### Common Issues
```bash
# Job control not available
# Solution: Enable job control
set -o monitor

# No such job
# Solution: Check job list first
jobs

# Job already running
# Solution: Check job status
jobs -l
```

### Error Handling
```bash
# Safe backgrounding function
safe_bg() {
    local job_id="$1"
    if jobs | grep -q "\[${job_id}\]"; then
        bg "%${job_id}" 2>/dev/null || echo "Failed to background job ${job_id}"
    else
        echo "Job ${job_id} not found"
    fi
}
```

## Related Commands

- [`fg`](/docs/commands/process-management/fg) - Bring job to foreground
- [`jobs`](/docs/commands/process-management/jobs) - List active jobs
- [`kill`](/docs/commands/process-management/kill) - Send signals to jobs
- [`disown`](/docs/commands/process-management/disown) - Remove job from shell
- [`wait`](/docs/commands/process-management/wait) - Wait for job completion
- [`nohup`](/docs/commands/process-management/nohup) - Run command immune to hangups
- [`&` operator] - Run command directly in background

## Best Practices

1. **Use job control** for long-running processes to keep terminal responsive
2. **Monitor jobs regularly** with `jobs` command
3. **Redirect output** appropriately to prevent terminal clutter
4. **Use meaningful commands** that can be easily identified in job list
5. **Clean up completed jobs** to maintain a clean job list
6. **Combine with `disown`** for jobs that should outlive the shell
7. **Use `wait`** when you need to ensure job completion
8. **Set up shell aliases** for common job control operations

The `bg` command is fundamental for efficient command-line multitasking, enabling users to manage multiple processes seamlessly within a single terminal session.