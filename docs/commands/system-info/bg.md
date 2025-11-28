---
title: bg - Background Job Control
sidebar_label: bg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bg - Background Job Control

The `bg` command is a shell builtin that resumes suspended jobs in the background, allowing you to continue working in the terminal while processes run. It's an essential component of Unix job control that enables efficient multitasking in command-line environments. The `bg` command works in conjunction with other job control commands like `fg`, `jobs`, and `kill` to provide comprehensive process management within a single shell session.

## Basic Syntax

```bash
bg [JOB_SPEC]
```

## Job Specifications

The `bg` command accepts various job specification formats:

| Specifier | Description | Example |
|-----------|-------------|---------|
| `%n` | Job number n | `%1`, `%2` |
| `%+`, `%%` | Current job (most recently stopped) | `bg %+` |
| `%-` | Previous job (job before current) | `bg %-` |
| `%string` | Job whose command starts with string | `bg %python` |
| `%?string` | Job whose command contains string | `bg %?server` |
| `""` or no argument | Current job (default) | `bg` |

## Usage Examples

### Basic Job Control

#### Starting and Backgrounding Jobs
```bash
# Start a long-running command
sleep 300

# Suspend it with Ctrl+Z
^Z
[1]+  Stopped                 sleep 300

# Resume it in background
bg %1
[1]+ sleep 300 &

# Check background jobs
jobs
[1]+  Running                 sleep 300 &

# Start command directly in background
sleep 200 &
[2] 12345

# Bring to foreground and then background again
fg %1
sleep 300
^Z
[1]+  Stopped                 sleep 300
bg
[1]+ sleep 300 &
```

#### Managing Multiple Jobs
```bash
# Start multiple processes
tar -czf backup.tar.gz /home/user/documents
^Z
[1]+  Stopped                 tar -czf backup.tar.gz /home/user/documents

find /var/log -name "*.log" -mtime +7
^Z
[2]+  Stopped                 find /var/log -name "*.log" -mtime +7

python -m http.server 8000
^Z
[3]+  Stopped                 python -m http.server 8000

# List all jobs
jobs
[1]-  Stopped                 tar -czf backup.tar.gz /home/user/documents
[2]+  Stopped                 find /var/log -name "*.log" -mtime +7
[3]+  Stopped                 python -m http.server 8000

# Resume specific jobs in background
bg %1
[1]- tar -czf backup.tar.gz /home/user/documents &

bg %2
[2]+ find /var/log -name "*.log" -mtime +7 &

bg %3
[3]+ python -m http.server 8000 &

# Check all are running
jobs
[1]-  Running                 tar -czf backup.tar.gz /home/user/documents &
[2]+  Running                 find /var/log -name "*.log" -mtime +7 &
[3]+  Running                 python -m http.server 8000 &
```

### Advanced Job Selection

#### Using Job Patterns
```bash
# Start processes with distinctive names
python manage.py runserver
^Z
[1]+  Stopped                 python manage.py runserver

npm run dev
^Z
[2]+  Stopped                 npm run dev

gcc -o program source.c && ./program
^Z
[3]+  Stopped                 gcc -o program source.c && ./program

# Resume by command name prefix
bg %python
[1]+ python manage.py runserver &

# Resume by partial command name
bg %?manage
[1]+ python manage.py runserver &

# Resume current job
bg %+  # or just "bg"

# Resume previous job
bg %-
```

#### Job Status Management
```bash
# Start and stop jobs to create different states
sleep 100 &
[1] 54321

sleep 200
^Z
[2]+  Stopped                 sleep 200

# List jobs with status
jobs -l
[1]-  54321 Running                 sleep 100 &
[2]+  54322 Stopped                 sleep 200

# Background the stopped job
bg %2
[2]+ sleep 200 &

# Check final status
jobs -l
[1]-  54321 Running                 sleep 100 &
[2]+  54322 Running                 sleep 200 &
```

## Practical Examples

### File Operations

#### Large File Management
```bash
# Start large file copy operation
cp -r /very/large/directory /backup/location
^Z
[1]+  Stopped                 cp -r /very/large/directory /backup/location

# Resume in background
bg %1
[1]+ cp -r /very/large/directory /backup/location &

# Start compression while copy runs
tar -czf archive.tar.gz /another/large/directory
^Z
[2]+  Stopped                 tar -czf archive.tar.gz /another/large/directory

bg %2
[2]+ tar -czf archive.tar.gz /another/large/directory &

# Start file search while others run
find /home -name "*.tmp" -type f -delete
^Z
[3]+  Stopped                 find /home -name "*.tmp" -type f -delete

bg %3
[3]+ find /home -name "*.tmp" -type f -delete &

# Monitor all operations
jobs -l
[1]-  12345 Running                 cp -r /very/large/directory /backup/location &
[2]+  12346 Running                 tar -czf archive.tar.gz /another/large/directory &
[3]+  12347 Running                 find /home -name "*.tmp" -type f -delete &
```

#### Batch File Processing
```bash
# Start image conversion
for img in *.jpg; do convert "$img" "${img%.jpg}.png"; done
^Z
[1]+  Stopped                 for img in *.jpg; do convert "$img" "${img%.jpg}.png"; done

bg %1

# Start video processing
ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mp4
^Z
[2]+  Stopped                 ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mp4

bg %2

# Start log file analysis
grep -r "ERROR" /var/log/ > error_report.txt
^Z
[3]+  Stopped                 grep -r "ERROR" /var/log/ > error_report.txt

bg %3
```

### Development Workflow

#### Development Server Management
```bash
# Start backend development server
python manage.py runserver 8000
^Z
[1]+  Stopped                 python manage.py runserver 8000

bg %1
[1]+ python manage.py runserver 8000 &

# Start frontend development server
npm start
^Z
[2]+  Stopped                 npm start

bg %2
[2]+ npm start &

# Start database migration
python manage.py migrate
^Z
[3]+  Stopped                 python manage.py migrate

bg %3
[3]+ python manage.py migrate &

# Start code linting
flake8 . --output-file=lint_report.txt
^Z
[4]+  Stopped                 flake8 . --output-file=lint_report.txt

bg %4
[4]+ flake8 . --output-file=lint_report.txt &

# Check all development jobs
jobs -l
[1]-  12345 Running                 python manage.py runserver 8000 &
[2]+  12346 Running                 npm start &
[3]+  12347 Running                 python manage.py migrate &
[4]+  12348 Running                 flake8 . --output-file=lint_report.txt &
```

#### Build and Test Operations
```bash
# Start compilation
make -j4 all
^Z
[1]+  Stopped                 make -j4 all

bg %1

# Start unit tests
pytest tests/ -v --html=test_report.html
^Z
[2]+  Stopped                 pytest tests/ -v --html=test_report.html

bg %2

# Start documentation generation
make docs
^Z
[3]+  Stopped                 make docs

bg %3

# Start code coverage analysis
coverage run --source=. -m pytest tests/
^Z
[4]+  Stopped                 coverage run --source=. -m pytest tests/

bg %4
```

### System Administration

#### System Maintenance Tasks
```bash
# Start system update
apt update && apt upgrade -y
^Z
[1]+  Stopped                 apt update && apt upgrade -y

bg %1

# Start log rotation
logrotate -f /etc/logrotate.conf
^Z
[2]+  Stopped                 logrotate -f /etc/logrotate.conf

bg %2

# Start disk cleanup
find /tmp -type f -atime +7 -delete
^Z
[3]+  Stopped                 find /tmp -type f -atime +7 -delete

bg %3

# Start backup process
rsync -av --delete /source/ /backup/destination/
^Z
[4]+  Stopped                 rsync -av --delete /source/ /backup/destination/

bg %4
```

#### Monitoring and Logging
```bash
# Start system monitoring
top -b -d 10 > system_monitor.log &
[1] 54321

# Start log monitoring
tail -f /var/log/syslog
^Z
[2]+  Stopped                 tail -f /var/log/syslog

bg %2

# Start network monitoring
netstat -i > network_stats.txt
^Z
[3]+  Stopped                 netstat -i > network_stats.txt

bg %3

# Start process monitoring
ps aux --sort=-%cpu | head -20 > top_processes.txt
^Z
[4]+  Stopped                 ps aux --sort=-%cpu | head -20 > top_processes.txt

bg %4
```

### Network Operations

#### File Transfers
```bash
# Start large file download
wget https://example.com/largefile.iso
^Z
[1]+  Stopped                 wget https://example.com/largefile.iso

bg %1
[1]+ wget https://example.com/largefile.iso &

# Start remote backup
scp -r /local/directory user@remote:/remote/directory
^Z
[2]+  Stopped                 scp -r /local/directory user@remote:/remote/directory

bg %2

# Start FTP upload
ftp -in << EOF
open ftp.example.com
user username password
put localfile.txt
bye
EOF
^Z
[3]+  Stopped                 ftp -in << EOF

bg %3

# Start rsync synchronization
rsync -avz /source/ user@server:/destination/
^Z
[4]+  Stopped                 rsync -avz /source/ user@server:/destination/

bg %4
```

#### Network Testing
```bash
# Start continuous ping
ping -c 100 google.com
^Z
[1]+  Stopped                 ping -c 100 google.com

bg %1

# Start port scanning
nmap -sS -O target_host
^Z
[2]+  Stopped                 nmap -sS -O target_host

bg %2

# Start bandwidth test
iperf -c server -t 60
^Z
[3]+  Stopped                 iperf -c server -t 60

bg %3

# Start DNS lookup testing
dig @8.8.8.8 example.com +trace
^Z
[4]+  Stopped                 dig @8.8.8.8 example.com +trace

bg %4
```

## Advanced Job Management

### Job Output Management

#### Redirecting Job Output
```bash
# Start process with output redirection
long_running_process > output.log 2>&1
^Z
[1]+  Stopped                 long_running_process > output.log 2>&1

bg %1

# Background with custom redirection
bg %1 >> /var/log/custom.log 2>&1 &

# Multiple jobs with different outputs
backup_process > backup.log 2>&1 &
^Z
[2]+  Stopped                 backup_process > backup.log 2>&1

bg %2

monitor_process > monitor.log 2>&1 &
^Z
[3]+  Stopped                 monitor_process > monitor.log 2>&1

bg %3

# Check log files in separate terminals
tail -f backup.log &
tail -f monitor.log &
```

#### Output Filtering and Processing
```bash
# Start process with output filtering
find / -name "*.log" 2>/dev/null | grep -i error > error_logs.txt
^Z
[1]+  Stopped                 find / -name "*.log" 2>/dev/null | grep -i error > error_logs.txt

bg %1

# Start real-time log analysis
tail -f /var/log/app.log | grep "ERROR" >> critical_errors.log &
[1] 54321

# Start data processing pipeline
cat large_data.txt | sort | uniq > processed_data.txt
^Z
[2]+  Stopped                 cat large_data.txt | sort | uniq > processed_data.txt

bg %2
```

### Job Completion Monitoring

#### Waiting for Job Completion
```bash
# Start long-running job
make build
^Z
[1]+  Stopped                 make build

bg %1

# Wait for specific job completion
wait %1
echo "Build completed successfully"

# Start multiple jobs
job1 > output1.log 2>&1 &
^Z
[2]+  Stopped                 job1 > output1.log 2>&1
bg %2

job2 > output2.log 2>&1 &
^Z
[3]+  Stopped                 job2 > output2.log 2>&1
bg %3

# Wait for all background jobs to complete
echo "Waiting for all jobs to complete..."
wait
echo "All jobs completed!"

# Monitor job progress
while jobs | grep -q "Running"; do
    echo "Jobs still running: $(jobs | grep -c "Running")"
    sleep 10
done
echo "All background jobs completed"
```

#### Job Status Notifications
```bash
# Function to notify when job completes
notify_job() {
    local job_id="$1"
    local job_cmd="$(jobs -l | grep "^\[$job_id\]" | awk '{for(i=4;i<=NF;i++) printf "%s ", $i; print ""}')"

    wait "%$job_id"
    echo "Job $job_id completed: $job_cmd"
    # Send desktop notification if available
    command -v notify-send && notify-send "Job Completed" "Job $job_id: $job_cmd"
}

# Start job and set up notification
long_process > process.log 2>&1 &
^Z
[1]+  Stopped                 long_process > process.log 2>&1
bg %1

# Monitor in background
notify_job 1 &
```

### Job Persistence

#### Using nohup with bg
```bash
# Start process that should persist after logout
nohup python server.py > server.log 2>&1 &
[1] 54321

# Combine with suspend/resume pattern
python worker.py
^Z
[1]+  Stopped                 python worker.py

bg %1
disown %1  # Remove from shell's job control

# Verify it's still running after disown
ps aux | grep worker.py
```

#### Creating Background Services
```bash
# Function to create persistent background jobs
create_service() {
    local cmd="$1"
    local log_file="$2"
    local pid_file="$3"

    # Start command in background with PID tracking
    nohup $cmd > "$log_file" 2>&1 &
    echo $! > "$pid_file"

    echo "Service started with PID $(cat $pid_file)"
    echo "Log file: $log_file"
}

# Create multiple services
create_service "python app.py" "/var/log/app.log" "/var/run/app.pid"
create_service "nginx -g 'daemon off;'" "/var/log/nginx.log" "/var/run/nginx.pid"
create_service "redis-server" "/var/log/redis.log" "/var/run/redis.pid"
```

## Shell Configuration and Customization

### Job Control Settings

#### Enable/Disable Job Control
```bash
# Check if job control is enabled
set -o | grep monitor

# Enable job control (usually default in interactive shells)
set -o monitor
# or
set -m

# Disable job control
set +o monitor
# or
set +m

# Test job control status
if [[ $- == *i* ]]; then
    echo "Interactive shell - job control should be available"
else
    echo "Non-interactive shell - job control may not be available"
fi
```

### Custom Job Functions

#### Enhanced Job Management Functions
```bash
# Function to background and forget (disown)
bgf() {
    if [[ $# -eq 0 ]]; then
        bg %+ && disown %+ 2>/dev/null
    else
        bg "$@" && disown "$@" 2>/dev/null
    fi
}

# Function to list jobs with detailed information
jobsl() {
    echo "Active Jobs:"
    jobs -l | while read line; do
        job_num=$(echo "$line" | awk '{print $1}' | tr -d '[]')
        job_pid=$(echo "$line" | awk '{print $2}')
        job_status=$(echo "$line" | awk '{print $3}')
        job_cmd=$(echo "$line" | cut -d' ' -f4-)

        echo "Job $job_num: PID $job_pid, Status: $job_status"
        echo "  Command: $job_cmd"
        echo ""
    done
}

# Function to wait for all background jobs
waitall() {
    local job_count=$(jobs -p | wc -l)
    echo "Waiting for $job_count background jobs..."

    for job in $(jobs -p); do
        echo "Waiting for PID $job..."
        wait "$job"
        echo "PID $job completed"
    done

    echo "All background jobs completed!"
}

# Function to kill all background jobs
killall_bg() {
    echo "Killing all background jobs..."
    for job in $(jobs -p); do
        echo "Killing PID $job..."
        kill "$job"
    done
}

# Function to restart failed jobs
restart_failed_jobs() {
    local failed_jobs=()

    # Find stopped/failed jobs
    while IFS= read -r line; do
        if echo "$line" | grep -q "Stopped\|Terminated"; then
            local job_num=$(echo "$line" | awk '{print $1}' | tr -d '[]')
            failed_jobs+=("$job_num")
        fi
    done <<< "$(jobs -l)"

    # Restart failed jobs
    for job_num in "${failed_jobs[@]}"; do
        echo "Restarting job $job_num..."
        bg "%$job_num"
    done
}
```

#### Job Monitoring Functions
```bash
# Function to monitor job progress
monitor_jobs() {
    local interval=${1:-10}

    while true; do
        clear
        echo "Job Status - $(date)"
        echo "========================"

        if jobs -l 2>/dev/null | grep -q .; then
            jobs -l | while IFS= read -r line; do
                job_num=$(echo "$line" | awk '{print $1}' | tr -d '[]')
                job_pid=$(echo "$line" | awk '{print $2}')
                job_status=$(echo "$line" | awk '{print $3}')
                job_cmd=$(echo "$line" | cut -d' ' -f4- | cut -c1-50)

                # Get CPU and memory usage
                if [[ -n "$job_pid" ]]; then
                    local ps_info=$(ps -p "$job_pid" -o %cpu,%mem --no-headers 2>/dev/null)
                    local cpu=$(echo "$ps_info" | awk '{print $1}')
                    local mem=$(echo "$ps_info" | awk '{print $2}')
                    printf "Job %-2s: %-8s (PID %-6s) CPU: %-5s%% MEM: %-5s%%\n" \
                           "$job_num" "$job_status" "$job_pid" "$cpu" "$mem"
                fi
                echo "  $job_cmd"
                echo ""
            done
        else
            echo "No active jobs"
        fi

        echo "Next update in $interval seconds... (Press Ctrl+C to stop)"
        sleep "$interval"
    done
}

# Function to check job exit status
check_job_status() {
    local job_id="$1"

    if wait "$job_id" 2>/dev/null; then
        echo "Job $job_id completed successfully"
        return 0
    else
        echo "Job $job_id failed with exit code $?"
        return 1
    fi
}
```

### Job Control Aliases

#### Convenient Aliases
```bash
# Quick job backgrounding
alias bgc='bg %+ && disown'
alias bgall='for job in $(jobs -p); do bg "%$job"; done'

# List jobs with details
alias j='jobs -l'
alias jj='jobs'
alias jp='jobs -p'

# Job management shortcuts
alias fg1='fg %1'
alias fg2='fg %2'
alias bg1='bg %1'
alias bg2='bg %2'

# Kill job shortcuts
alias k1='kill %1'
alias k2='kill %2'
alias kall='for job in $(jobs -p); do kill "$job"; done'

# Wait for all jobs
alias wa='wait'

# Background and notify
alias bgn='bg && echo "Job backgrounded" && notify-send "Job Backgrounded" "Command moved to background"'

# Quick suspend and background
alias sb='^Z && bg'
```

## Integration with Other Tools

### Terminal Multiplexers

#### Using bg with tmux
```bash
# In tmux session
long_command
^Z
[1]+  Stopped                 long_command

bg %1

# Move job to new tmux window
tmux new-window -d "fg %1"

# Create new session with background job
tmux new-session -d -s background "fg %1"

# List jobs across tmux sessions
tmux list-windows -a
```

#### Using bg with screen
```bash
# In GNU Screen session
background_process
^Z
[1]+  Stopped                 background_process

bg %1

# Create new screen window with job
screen -t background bash -c "fg %1; exec bash"

# Detach and let job run in background
screen -d -m bash -c "fg %1"
```

### Process Monitoring Tools

#### Integration with htop/htop
```bash
# Start background jobs
job1 > job1.log 2>&1 &
job2 > job2.log 2>&1 &

# Monitor with htop in separate terminal
htop -p $(jobs -p | tr '\n' ',' | sed 's/,$//')

# Monitor specific jobs
watch -n 2 "ps -p \$(jobs -p | tr '\n' ',') -o pid,ppid,cmd,%cpu,%mem"
```

#### Integration with pstree
```bash
# Start background jobs and monitor process tree
python server.py &
^Z
bg %1

# Show process tree including background jobs
pstree -p $$  # Show shell's process tree

# Monitor all background jobs
watch "pstree -p \$\$ | grep -A5 '\[\$(jobs -p | head -1)\]'"
```

## Troubleshooting

### Common Issues and Solutions

#### Job Control Not Available
```bash
# Problem: "bg: no job control"
# Solution: Enable job control in interactive shell
set -o monitor
# Check shell type
echo $-  # Should contain 'i' for interactive

# Problem: Job control disabled in script
# Solution: Enable explicitly in script
#!/bin/bash
set -m  # Enable job control

# Use job control in script
long_command &
bg %+  # This will work now
```

#### No Such Job Error
```bash
# Problem: "bg: no such job"
# Solution: Check available jobs first
jobs
[1]+  Running                 sleep 100 &

# Use correct job specification
bg %1  # Not bg 1

# Problem: Job already running
# Solution: Check job status
jobs -l
[1]+  12345 Running                 sleep 100 &

# Job is already in background, no need to bg
```

#### Job Completion Issues
```bash
# Problem: Jobs hanging or not completing
# Solution: Check if job is waiting for input
jobs -l
[1]+  12345 Stopped (tty input)    interactive_command

# Solution: Provide input or redirect
echo "input_data" | fg %1

# Problem: Zombie processes
# Solution: Properly wait for jobs
wait  # Wait for all background jobs

# Or wait for specific job
wait %1
```

#### Shell Exit Issues
```bash
# Problem: "There are stopped jobs" when exiting shell
# Solution: Background or kill stopped jobs
jobs -s  # List stopped jobs

# Option 1: Background all stopped jobs
for job in $(jobs -sp); do bg "%$job"; done

# Option 2: Kill stopped jobs
for job in $(jobs -sp); do kill "%$job"; done

# Option 3: Use disown to make jobs persist
jobs -s | while read job; do
    job_num=$(echo "$job" | awk '{print $1}' | tr -d '[]')
    disown "%$job_num"
done
```

### Debugging Job Control

#### Job Control Debugging
```bash
# Enable job control debugging
set -x  # Show command execution

# Test job control step by step
echo "Starting test job..."
sleep 10
echo "Suspending job..."
^Z
jobs -l
echo "Resuming job in background..."
bg %+ 2>&1
jobs -l

# Check shell options
echo "Current shell options: $-"
set -o | grep -E "(monitor|interactive)"

# Test job control in different contexts
(
    echo "In subshell"
    sleep 5
    ^Z  # May not work in subshell
)

# Test job control with different commands
echo "Testing with builtin command..."
echo "test" > /dev/null
^Z  # Probably won't suspend

echo "Testing with external command..."
sleep 5
^Z  # Should work
```

#### Signal Handling
```bash
# Function to handle job-related signals
handle_signals() {
    trap 'echo "Received SIGINT - checking jobs..."; jobs -l' INT
    trap 'echo "Received SIGTERM - cleaning up jobs..."; kill $(jobs -p) 2>/dev/null' TERM
    trap 'echo "Received SIGQUIT - showing job status..."; jobs -l' QUIT
}

# Test signal handling
handle_signals

# Start some jobs
sleep 100 &
sleep 200 &

# Send signals to test
kill -INT $$  # Should show job list
kill -TERM $$  # Should kill background jobs
```

## Related Commands

- [`fg`](/docs/commands/system-info/fg) - Bring job to foreground
- [`jobs`](/docs/commands/system-info/jobs) - List active jobs
- [`kill`](/docs/commands/system-info/kill) - Send signals to jobs or processes
- [`disown`](/docs/commands/system-info/disown) - Remove job from shell's job table
- [`wait`](/docs/commands/system-info/wait) - Wait for job completion
- [`nohup`](/docs/commands/system-info/nohup) - Run command immune to hangups
- [`suspend`](/docs/commands/system-info/suspend) - Suspend shell execution
- [`ps`](/docs/commands/system-info/ps) - Process status
- [`top`](/docs/commands/system-info/top) - Dynamic process viewer
- [`&` operator] - Run command directly in background

## Best Practices

1. **Use descriptive commands** that can be easily identified in job lists
2. **Redirect output appropriately** to prevent terminal clutter and preserve logs
3. **Monitor job status regularly** using `jobs` command with appropriate options
4. **Use job numbers consistently** when managing multiple background jobs
5. **Clean up completed jobs** to maintain a clean job table
6. **Combine with `disown`** for long-running jobs that should outlive the shell
7. **Use `wait`** when job completion is required before proceeding
8. **Set up monitoring** for critical background jobs
9. **Use nohup** for jobs that need to persist after shell logout
10. **Test job control** in your specific shell environment

## Performance Tips

1. **Background I/O intensive operations** to keep terminal responsive
2. **Limit concurrent jobs** based on system resources (CPU, memory, I/O)
3. **Use job control** instead of multiple terminal sessions when possible
4. **Monitor system resources** when running many background jobs
5. **Use appropriate nice levels** for CPU-intensive background jobs
6. **Batch similar operations** together for better resource utilization
7. **Avoid interactive commands** in background unless properly handled
8. **Use process monitoring tools** to track background job performance

The `bg` command is fundamental for efficient command-line multitasking, enabling users to manage multiple processes seamlessly within a single terminal session. Mastering job control with `bg` and related commands significantly improves productivity for system administrators, developers, and power users working in Unix-like environments.