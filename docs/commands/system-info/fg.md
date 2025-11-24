---
title: fg - Foreground Job
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fg - Foreground Job

The `fg` command brings background or suspended jobs to the foreground, allowing you to interact with them directly. It's a crucial shell job control command that enables switching between different running processes in a terminal session.

## Basic Syntax

```bash
fg [JOB_SPEC]
```

## Common Options

The `fg` command accepts job specifications:
- `%1` - Job number 1
- `%+` or `%%` - Current job
- `%-` - Previous job
- `%string` - Job whose command starts with string
- `%?string` - Job whose command contains string

## Usage Examples

### Basic Job Control
```bash
# Start a command and suspend it
sleep 60
^Z
[1]+  Stopped                 sleep 60

# Bring it to foreground
fg %1
sleep 60

# The command now runs in foreground and blocks the terminal
```

### Managing Multiple Jobs
```bash
# Start first job
find / -name "*.log"
^Z
[1]+  Stopped                 find / -name "*.log"

# Start second job
tar -czf backup.tar.gz /home/user
^Z
[2]+  Stopped                 tar -czf backup.tar.gz /home/user

# List jobs
jobs
[1]-  Stopped                 find / -name "*.log"
[2]+  Stopped                 tar -czf backup.tar.gz /home/user

# Bring specific job to foreground
fg %2
tar -czf backup.tar.gz /home/user

# Suspend again and bring different job
^Z
fg %1
find / -name "*.log"
```

### Job Selection Methods
```bash
# Bring job by number to foreground
fg %1

# Bring current job to foreground
fg %+

# Bring previous job to foreground
fg %-

# Bring job by command name
fg %find

# Bring job by partial command name
fg %?tar
```

## Practical Examples

### Interactive Processes
```bash
# Start text editor
vim config.txt
^Z
[1]+  Stopped                 vim config.txt

# Do other work
ls -la
pwd

# Return to editor
fg %1
# Now you're back in vim
```

### Development Workflow
```bash
# Start development server
python manage.py runserver
^Z
[1]+  Stopped                 python manage.py runserver

# Background it to do other work
bg %1
[1]+ python manage.py runserver &

# Start another process
npm test
^Z
[2]+  Stopped                 npm test

# Switch between jobs
fg %1  # Back to server
^Z
fg %2  # Back to tests
```

### File Operations
```bash
# Start file copy
cp -r /large/directory /backup/location
^Z
[1]+  Stopped                 cp -r /large/directory /backup/location

# Start compression in background
tar -czf archive.tar.gz /another/directory &

# Return to file copy
fg %1

# Monitor both processes
jobs
[1]+  Stopped                 cp -r /large/directory /backup/location
[2]-  Running                 tar -czf archive.tar.gz /another/directory &
```

### Database Operations
```bash
# Start database backup
mysqldump -u user -p database > backup.sql
^Z
[1]+  Stopped                 mysqldump -u user -p database > backup.sql

# Start database import in background
mysql -u user -p newdb < import.sql &

# Switch back to backup
fg %1

# After backup completes, check import
fg %2
```

### Network Operations
```bash
# Start SSH session
ssh user@server
^Z
[1]+  Stopped                 ssh user@server

# Start file transfer
scp file.txt user@remote:/path/
^Z
[2]+  Stopped                 scp file.txt user@remote:/path/

# Switch between connections
fg %1  # Back to SSH session
# Do some work, then suspend
^Z
fg %2  # Back to file transfer
```

## Advanced Job Management

### Job Cycling
```bash
# Start multiple jobs
job1 &
job2 &
job3 &

# Suspend current job with Ctrl+Z
^Z

# Cycle through jobs
fg %-   # Previous job
fg %+   # Current job
fg %1   # Specific job
```

### Temporary Switching
```bash
# Working on job 1
fg %1

# Need to quickly check job 2
^Z
fg %2

# Check something and return
^Z
fg %1  # Back to original job
```

### Job Dependencies
```bash
# Start data processing
python process_data.py input.csv
^Z
[1]+  Stopped                 python process_data.py input.csv

# Background it
bg %1

# Wait for completion, then bring to foreground to see results
while jobs | grep -q "Running"; do
    sleep 1
done
fg %1
```

## Interactive Sessions

### Shell Integration
```bash
# Start interactive program
python
>>> print("Hello")
^Z
[1]+  Stopped                 python

# Do shell commands
ls -la
echo "Shell work done"

# Return to Python session
fg %1
>>> print("Back to Python")
```

### Terminal Applications
```bash
# Start terminal-based editor
nano file.txt
^Z
[1]+  Stopped                 nano file.txt

# Check file content with other tools
head -10 file.txt
grep "pattern" file.txt

# Return to editor
fg %1
```

### Monitoring Jobs
```bash
# Start long-running process
make build
^Z
[1]+  Stopped                 make build

# Background it
bg %1

# Monitor progress periodically
while true; do
    echo "Checking job status..."
    jobs
    sleep 10
done

# When ready to interact, bring to foreground
^Z
fg %1
```

## Error Handling and Recovery

### Failed Job Transitions
```bash
# Try to bring non-existent job
fg %99
bash: fg: %99: no such job

# Check available jobs first
jobs
[1]+  Running                 sleep 100 &
```

### Stuck Jobs
```bash
# Job not responding
fg %1
# If stuck, use Ctrl+C or Ctrl+Z

# Force kill if needed
kill -9 %1
```

### Shell Crash Recovery
```bash
# Before shell restart, check jobs
jobs -l

# Note job PIDs for recovery
ps aux | grep "command"
```

## Shell Configuration

### Job Control Settings
```bash
# Enable job control
set -o monitor
# or
set -m

# Check job control status
set -o | grep monitor

# Custom foreground function
fgc() {
    local job="$1"
    if [ -z "$job" ]; then
        job="%+"
    fi
    fg "$job" 2>/dev/null || echo "Job $job not found"
}
```

### Job Status Aliases
```bash
# List jobs with status
alias jl='jobs -l'

# Quick foreground for current job
alias fgcur='fg %+'

# Foreground last job
alias fglast='fg %-'
```

## Integration with Other Commands

### Combining Job Control Commands
```bash
# Complete job lifecycle
command
^Z          # Suspend
bg %1       # Background
jobs        # Check status
fg %1       # Bring to foreground
^Z          # Suspend again
kill %1     # Terminate
```

### Using with Terminal Multiplexers
```bash
# In tmux, move job to new window
command
^Z
tmux new-window "fg %1"

# In screen, move job to new window
command
^Z
screen -t command bash -c "fg %1"
```

## Automation and Scripting

### Batch Job Management
```bash
# Function to cycle through jobs
cycle_jobs() {
    while true; do
        echo "Current jobs:"
        jobs
        echo "Enter job number to foreground (or 'q' to quit):"
        read -r job_num
        [ "$job_num" = "q" ] && break
        fg "%$job_num"
    done
}
```

### Job Completion Scripts
```bash
# Wait for job and auto-foreground
wait_and_fg() {
    local job="$1"
    while jobs | grep -q "\[$job\].*Stopped"; do
        sleep 1
    done
    fg "%$job"
}
```

## Related Commands

- [`bg`](/docs/commands/process-management/bg) - Background suspended jobs
- [`jobs`](/docs/commands/process-management/jobs) - List active jobs
- [`kill`](/docs/commands/process-management/kill) - Send signals to jobs
- [`disown`](/docs/commands/process-management/disown) - Remove job from shell control
- [`wait`](/docs/commands/process-management/wait) - Wait for job completion
- [`Ctrl+Z`] - Suspend current foreground job
- [`Ctrl+C`] - Terminate current foreground job

## Best Practices

1. **Use job numbers** for precise job control
2. **Check job status** before attempting to bring jobs to foreground
3. **Save work before switching** between interactive sessions
4. **Use meaningful commands** that are easy to identify
5. **Handle errors gracefully** when jobs don't exist or can't be foregrounded
6. **Use shell aliases** for frequently used job control operations
7. **Monitor long-running jobs** before bringing them to foreground
8. **Clean up jobs** that are no longer needed

The `fg` command is essential for managing multiple processes interactively, enabling efficient workflow management in terminal environments.