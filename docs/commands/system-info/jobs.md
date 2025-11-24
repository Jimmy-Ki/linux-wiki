---
title: jobs - Display background jobs
slug: jobs
tags: [process-management, linux-commands]
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# jobs - Display background jobs

The `jobs` command displays the status of jobs in the current shell session. It shows background and suspended processes started from the current shell, allowing you to manage multiple tasks within a single terminal session.

## Syntax

```bash
jobs [OPTIONS] [JOBID]
```

## Common Options

- `-l`: List process IDs in addition to job numbers
- `-p`: List only process IDs
- `-n`: List only processes that have changed status since last notification
- `-r`: Restrict output to running jobs
- `-s`: Restrict output to stopped jobs
- `-x`: Execute COMMAND on each job ID

## Usage Examples

### Basic Usage
```bash
# Start some background jobs
sleep 100 &
ping google.com > /dev/null &
vi test.txt

# Suspend vi with Ctrl+Z
# Then list all jobs
jobs
# Output:
# [1]-  Running                 sleep 100 &
# [2]+  Running                 ping google.com > /dev/null &
# [3]+  Stopped                 vi test.txt
```

### Detailed Job Information
```bash
# List jobs with process IDs
jobs -l
# Output:
# [1]  1234 Running                 sleep 100 &
# [2]  5678 Running                 ping google.com > /dev/null &
# [3]  9012 Stopped                 vi test.txt

# List only process IDs
jobs -p
# Output:
# 1234
# 5678
# 9012
```

### Filter by Status
```bash
# Show only running jobs
jobs -r
# Output:
# [1]-  Running                 sleep 100 &
# [2]+  Running                 ping google.com > /dev/null &

# Show only stopped jobs
jobs -s
# Output:
# [3]+  Stopped                 vi test.txt
```

### Monitor Job Changes
```bash
# Show only jobs that have changed status
jobs -n

# First run - shows all jobs
# Second run - shows only jobs that changed since last run
```

### Job Control Basics
```bash
# Start jobs
command1 &
command2 &
command3

# Suspend command3 with Ctrl+Z
# List jobs
jobs

# Bring job 2 to foreground
fg %2

# Background current job
bg %3

# Kill job 1
kill %1
```

### Job References
```bash
# Reference jobs by number
fg %1
bg %2
kill %3

# Reference jobs by name
fg %vi
kill %sleep

# Reference current/previous jobs
fg %+
bg %-
```

### Complex Job Management
```bash
# Start multiple jobs
find / -name "*.log" &
find /home -name "*.tmp" &
rsync -av /src/ /dst/ &

# Monitor all jobs
watch -n 5 'jobs -l'

# Wait for all background jobs to complete
wait
```

## Understanding Job Status

### Job Status Indicators
- **Running**: Currently executing in background
- **Stopped**: Suspended (usually with Ctrl+Z)
- **Done**: Completed successfully
- **Terminated**: Killed by signal

### Job Numbering
- **[1]**, **[2]**, etc.: Job numbers assigned sequentially
- **+**: Current job (last job started or manipulated)
- **-**: Previous job (second to last job)

### Process vs. Job
- **Job**: Shell's tracking of processes started from this shell
- **Process**: Actual operating system process with PID
- **Relationship**: One job can contain multiple processes

## Best Practices

1. **Use descriptive commands** to identify jobs easily
2. **Use job numbers** for precise control
3. **Monitor job status** before exiting shell
4. **Use `wait`** to ensure background jobs complete:
   ```bash
   # Start background jobs
   job1 &
   job2 &

   # Wait for both to complete
   wait
   ```
5. **Use `nohup`** for jobs that should survive shell exit

## Related Commands

- `fg`: Bring job to foreground
- `bg`: Resume suspended job in background
- `kill`: Terminate jobs or processes
- `nohup`: Run command immune to hangups
- `disown`: Remove job from shell's job table

## Troubleshooting

### Common Issues

1. **"No such job"**: Job number incorrect or job completed
2. **Zombie jobs**: Jobs marked "Done" but not reaped
3. **Cannot find job**: Job may have completed or been killed
4. **Job hangs**: Process may be waiting for input

### Common Scenarios

```bash
# Check if jobs exist before referencing
if jobs | grep -q "\[1\]"; then
    fg %1
fi

# Clean up completed jobs
jobs -n

# Force completion of zombie jobs
wait
```

### Script Examples
```bash
#!/bin/bash
# Job management script
manage_jobs() {
    local action=$1
    local job_number=${2:-""}

    case $action in
        "list")
            echo "Current jobs:"
            jobs -l
            ;;
        "running")
            echo "Running jobs:"
            jobs -r
            ;;
        "stopped")
            echo "Stopped jobs:"
            jobs -s
            ;;
        "bring-foreground")
            if [ -n "$job_number" ]; then
                fg "%$job_number"
            else
                fg
            fi
            ;;
        "background")
            if [ -n "$job_number" ]; then
                bg "%$job_number"
            else
                bg
            fi
            ;;
        "kill-job")
            if [ -n "$job_number" ]; then
                kill "%$job_number"
            else
                echo "Job number required"
                return 1
            fi
            ;;
        *)
            echo "Usage: $0 {list|running|stopped|bring-foreground|background|kill-job} [job_number]"
            return 1
            ;;
    esac
}

# Parallel task runner
run_parallel_tasks() {
    local tasks_dir=$1
    local max_concurrent=${2:-3}

    echo "Running tasks from $tasks_dir (max concurrent: $max_concurrent)"

    local running=0
    local completed=0
    local total_tasks=$(find "$tasks_dir" -name "*.sh" | wc -l)

    for task in "$tasks_dir"/*.sh; do
        if [ -f "$task" ]; then
            # Wait if we have too many jobs running
            while [ $running -ge $max_concurrent ]; do
                # Check job status
                for job in $(jobs -p); do
                    if ! kill -0 "$job" 2>/dev/null; then
                        running=$((running - 1))
                        completed=$((completed + 1))
                        echo "Task completed ($completed/$total_tasks)"
                    fi
                done
                sleep 1
            done

            # Start next task
            echo "Starting: $(basename "$task")"
            bash "$task" &
            running=$((running + 1))
        fi
    done

    # Wait for all remaining jobs to complete
    echo "Waiting for remaining tasks to complete..."
    wait
    echo "All tasks completed ($completed/$total_tasks)"
}

# Job status monitor
job_monitor() {
    local interval=${1:-5}

    echo "Job monitor (interval: ${interval}s)"
    echo "Press Ctrl+C to exit"

    while true; do
        clear
        echo "Job Status - $(date)"
        echo "=================="

        job_count=$(jobs -p | wc -l)
        if [ $job_count -eq 0 ]; then
            echo "No background jobs running"
        else
            echo "Total jobs: $job_count"
            echo ""
            jobs -l
        fi

        echo ""
        echo "System load: $(uptime)"
        sleep $interval
    done
}

# Usage examples
manage_jobs list
manage_jobs running
run_parallel_tasks "/home/user/tasks" 2
job_monitor 10
```

### Advanced Usage
```bash
# Intelligent job queue manager
job_queue_manager() {
    local max_jobs=${1:-3}
    local log_file=${2:-"/tmp/job_queue.log"}

    echo "Job Queue Manager"
    echo "Max concurrent jobs: $max_jobs"
    echo "Log file: $log_file"

    while IFS= read -r command; do
        # Wait if we have too many jobs
        while [ $(jobs -p | wc -l) -ge $max_jobs ]; do
            sleep 1
        done

        echo "$(date): Starting - $command" >> "$log_file"
        eval "$command" &
    done

    # Wait for all jobs to complete
    wait
    echo "$(date): All jobs completed" >> "$log_file"
}

# Job dependency manager
run_with_dependencies() {
    local main_command=$1
    local dependency_command=$2

    echo "Running dependency: $dependency_command"
    $dependency_command &
    local dep_job=$!

    # Wait for dependency to finish
    wait $dep_job
    local dep_status=$?

    if [ $dep_status -eq 0 ]; then
        echo "Dependency completed successfully"
        echo "Running main command: $main_command"
        $main_command &
    else
        echo "Dependency failed with status: $dep_status"
        return 1
    fi
}

# Interactive job selector
interactive_job_control() {
    while true; do
        clear
        echo "Job Control Interface"
        echo "===================="
        echo ""

        job_count=$(jobs -p | wc -l)
        if [ $job_count -eq 0 ]; then
            echo "No background jobs currently running"
            echo ""
            echo "Options:"
            echo "1. Exit"
            echo "2. Start new job (interactive)"
        else
            echo "Current jobs:"
            jobs -l
            echo ""
            echo "Options:"
            echo "1. Exit"
            echo "2. Start new job (interactive)"
            echo "3. Bring job to foreground"
            echo "4. Kill job"
        fi

        read -p "Select option: " choice

        case $choice in
            1) break ;;
- 2)
                read -p "Enter command to run: " cmd
                echo "Starting: $cmd"
                eval "$cmd" &
                ;;
- 3)
                if [ $job_count -gt 0 ]; then
                    read -p "Enter job number: " job_num
                    fg "%$job_num"
                fi
                ;;
- 4)
                if [ $job_count -gt 0 ]; then
                    read -p "Enter job number to kill: " job_num
                    kill "%$job_num"
                fi
                ;;
        esac

        if [ $job_count -eq 0 ] && [ "$choice" != "1" ] && [ "$choice" != "2" ]; then
            continue
        fi
    done
}

# Usage examples
# echo "backup.sh" | job_queue_manager 3
# run_with_dependencies "main_app.sh" "database_init.sh"
# interactive_job_control
```

### Production Usage
```bash
# Production job scheduler
production_scheduler() {
    local config_file=$1
    local log_dir=$2

    echo "Production Job Scheduler"
    echo "Config: $config_file"
    echo "Log directory: $log_dir"

    while IFS=',' read -r job_name job_command priority max_runtime; do
        # Skip header or empty lines
        [[ "$job_name" =~ ^# ]] && continue
        [[ -z "$job_name" ]] && continue

        log_file="$log_dir/${job_name}_$(date +%Y%m%d_%H%M%S).log"

        echo "$(date): Starting job - $job_name"
        echo "Command: $job_command"
        echo "Log: $log_file"

        # Run job with timeout and logging
        timeout "$max_runtime" bash -c "$job_command" > "$log_file" 2>&1 &
        local job_pid=$!

        # Wait for job to complete
        wait $job_pid
        local job_status=$?

        if [ $job_status -eq 0 ]; then
            echo "$(date): Job $job_name completed successfully"
        elif [ $job_status -eq 124 ]; then
            echo "$(date): Job $job_name timed out after $max_runtime"
        else
            echo "$(date): Job $job_name failed with status $job_status"
        fi

        echo "Log file: $log_file"
        echo "----------------------------------------"

    done < "$config_file"
}

# Background job health monitor
job_health_monitor() {
    local check_interval=${1:-30}
    local alert_threshold=${2:-300}  # 5 minutes

    echo "Job Health Monitor"
    echo "Check interval: ${check_interval}s"
    echo "Alert threshold: ${alert_threshold}s"

    while true; do
        jobs -l | while read job_line; do
            # Parse job information
            if [[ "$job_line" =~ ^\[([0-9]+)\][[:space:]]+([0-9]+)[[:space:]]+(.+) ]]; then
                job_num="${BASH_REMATCH[1]}"
                job_pid="${BASH_REMATCH[2]}"
                job_status="${BASH_REMATCH[3]}"

                # Get process start time
                if [ -n "$job_pid" ]; then
                    start_time=$(ps -p "$job_pid" -o lstart= 2>/dev/null)
                    if [ -n "$start_time" ]; then
                        start_timestamp=$(date -d "$start_time" +%s)
                        current_timestamp=$(date +%s)
                        runtime=$((current_timestamp - start_timestamp))

                        if [ $runtime -gt $alert_threshold ]; then
                            echo "ALERT: Job $job_num running for ${runtime}s (threshold: ${alert_threshold}s)"
                            echo "Job info: $job_line"
                            echo "Process: $(ps -p "$job_pid" -o pid,pcpu,pmem,etime,cmd)"
                        fi
                    fi
                fi
            fi
        done

        sleep $check_interval
    done
}

# Usage
# production_scheduler "jobs.csv" "/var/log/jobs"
# job_health_monitor 60 600
```