---
title: timeout - Time limit command execution
slug: timeout
tags: [process-management, linux-commands]
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# timeout - Time limit command execution

The `timeout` command runs a command with a time limit. If the command doesn't complete within the specified duration, `timeout` sends a signal to terminate it. This is essential for preventing runaway processes and controlling execution time.

## Syntax

```bash
timeout [OPTION] DURATION COMMAND [ARG]...
```

## Common Options

### Duration and Signals
- `-s SIGNAL`, `--signal SIGNAL`: Specify signal to send (default: TERM)
- `-k DURATION`, `--kill-after DURATION`: Kill after specified time after first signal
- `--preserve-status`: Exit with same status as command
- `--foreground`: Run in foreground (allow signals to reach command)

### Time Specification
- DURATION can be: `NUMBER[SUFFIX]`
- `SUFFIX`: `s` (seconds), `m` (minutes), `h` (hours), `d` (days)
- Without suffix: seconds (default)

### Other Options
- `--help`: Display help message
- `--version`: Display version information

## Usage Examples

### Basic Timeout Usage
```bash
# Command must complete within 30 seconds
timeout 30 ./long_running_script.sh

# Command with 5 minute timeout
timeout 5m python data_analysis.py

# Command with 1 hour timeout
timeout 1h backup_database.sh

# 10 second timeout for network command
timeout 10 ping google.com
```

### Signal Control
```bash
# Send SIGKILL after 30 seconds
timeout -s KILL 30 ./stuck_process.sh

# Send custom signal
timeout -s USR1 60 ./service.sh

# Kill after 60 seconds if SIGTERM fails
timeout -k 10 60 ./backup.sh

# Multiple signal options
timeout -s TERM -k 5 30 ./cleanup.sh
```

### Background and Foreground
```bash
# Run in background with timeout
timeout 30 ./script.sh &

# Run in foreground (allow Ctrl+C to reach command)
timeout --foreground 30 interactive_script.sh

# Combined with other job control
timeout 60 long_process.sh && echo "Completed" || echo "Timed out"
```

### Input/Output Management
```bash
# Timeout with input redirection
timeout 30 ./script.sh < input.txt

# Timeout with output redirection
timeout 30 ./script.sh > output.txt 2>&1

# Timeout with pipes
timeout 60 cat large_file | grep "pattern" > results.txt
```

### Development and Testing
```bash
# Timeout for test execution
timeout 30s npm test

# Timeout for build process
timeout 10m make

# Timeout for unit tests
timeout 5m python -m pytest tests/

# Timeout for database operations
timeout 60s mysql -u user -p -e "SELECT * FROM large_table"

# Timeout for network requests
timeout 10s curl -I https://example.com

# Timeout for file operations
timeout 30s find / -name "*.log"
```

### System Administration
```bash
# Timeout for system updates
timeout 30m apt update && timeout 1h apt upgrade -y

# Timeout for backup operations
timeout 2h rsync -av /source/ /destination/

# Timeout for service restart
timeout 60 systemctl restart nginx

# Timeout for log analysis
timeout 10m grep "ERROR" /var/log/app.log

# Timeout for disk cleanup
timeout 30m find /tmp -type f -delete
```

### Network Operations
```bash
# Timeout for network connectivity tests
timeout 10 ping -c 3 8.8.8.8

# Timeout for DNS lookup
timeout 5 nslookup example.com

# Timeout for HTTP requests
timeout 15 wget https://example.com/largefile.zip

# Timeout for SSH commands
timeout 30 ssh user@server "some_command"

# Timeout for port scanning
timeout 60 nmap -p 1-1000 target_host
```

### Process Chaining
```bash
# Multiple commands with individual timeouts
timeout 30 command1 && timeout 60 command2 || echo "One of the commands failed"

# Timeout in pipeline
cat data.txt | timeout 30 process_data.sh > output.txt

# Timeout with command substitution
result=$(timeout 10 get_data.sh)

# Timeout in subshell
(timeout 30 ./process.sh) && echo "Success" || echo "Failed"
```

## Understanding Duration Formats

### Time Units
```bash
# Seconds (default)
timeout 30 command

# Minutes
timeout 5m command  # 5 minutes

# Hours
timeout 2h command  # 2 hours

# Days
timeout 1d command  # 1 day

# Combined units
timeout 1h30m command  # 1 hour and 30 minutes
timeout 2h45m30s command  # 2 hours, 45 minutes, 30 seconds
```

### Examples with Different Formats
```bash
# 5 seconds
timeout 5s ./script.sh

# 10 minutes
timeout 600 ./script.sh  # Same as 10m

# 1 hour 30 minutes
timeout 5400 ./script.sh  # Same as 1h30m

# Half a day
timeout 12h ./script.sh
```

## Signal Handling

### Default Behavior
- Sends SIGTERM after timeout duration
- Waits for process to exit gracefully
- Uses exit code 124 when timeout occurs
- Preserves original command exit code with `--preserve-status`

### Signal Types
```bash
# SIGTERM (15) - Default, allows graceful shutdown
timeout 30 ./script.sh

# SIGKILL (9) - Forceful termination
timeout -s KILL 30 ./script.sh

# SIGINT (2) - Interrupt signal (like Ctrl+C)
timeout -s INT 30 ./script.sh

# SIGUSR1 - User-defined signal
timeout -s USR1 30 ./script.sh
```

### Kill-after Behavior
```bash
# Send SIGTERM after 60s, SIGKILL after 10s more
timeout -k 10 60 ./backup.sh

# Process flow:
# 0-60s: Command runs normally
# 60s: SIGTERM sent
# 60-70s: Wait for graceful shutdown
# 70s: SIGKILL sent if still running
```

## Best Practices

1. **Use appropriate timeouts** based on expected execution time
2. **Choose signals carefully** - use SIGTERM for graceful shutdown
3. **Use `--preserve-status`** when you need the original exit code:
   ```bash
   timeout --preserve-status 30 script.sh
   ```
4. **Combine with logging** for monitoring:
   ```bash
   timeout 60 ./script.sh 2>&1 | tee script.log
   ```
5. **Use `--foreground`** for interactive commands
6. **Set reasonable kill-after times** for cleanup

## Related Commands

- `ulimit`: Set resource limits for processes
- `kill`: Send signals to processes
- `time`: Measure command execution time
- `nice`: Set process priority
- `watch`: Run command repeatedly

## Troubleshooting

### Common Issues

1. **Command exits before timeout**: `timeout` passes through the exit code
2. **Timeout not working**: Check if command ignores signals
3. **Zombie processes**: Some commands may not respond to SIGTERM
4. **Permission issues**: Ensure timeout has permission to send signals

### Common Scenarios

```bash
# Check if command timed out
if timeout 30 command.sh; then
    echo "Command completed successfully"
elif [ $? -eq 124 ]; then
    echo "Command timed out"
else
    echo "Command failed with exit code $?"
fi

# Test timeout with harmless command
timeout 5 sleep 10 && echo "This won't show"
timeout 5 sleep 3 && echo "This will show"
```

### Script Examples
```bash
#!/bin/bash
# Timeout wrapper with logging
timed_command() {
    local duration=$1
    local command=$2
    local log_file=$3
    local kill_after=${4:-10}

    echo "$(date): Starting command with ${duration}s timeout" | tee -a "$log_file"
    echo "Command: $command" | tee -a "$log_file"

    if timeout -k "$kill_after" "$duration" $command 2>&1 | tee -a "$log_file"; then
        local exit_code=$?
        echo "$(date): Command completed with exit code $exit_code" | tee -a "$log_file"
        return $exit_code
    else
        local exit_code=$?
        if [ $exit_code -eq 124 ]; then
            echo "$(date): Command timed out after ${duration}s" | tee -a "$log_file"
        else
            echo "$(date): Command failed with exit code $exit_code" | tee -a "$log_file"
        fi
        return $exit_code
    fi
}

# Network operations with timeout
safe_network_operation() {
    local operation=$1
    local timeout=${2:-30}
    local retry_count=${3:-3}

    echo "Performing network operation: $operation"
    echo "Timeout: ${timeout}s, Retries: $retry_count"

    for attempt in $(seq 1 $retry_count); do
        echo "Attempt $attempt/$retry_count"

        if timeout "$timeout" $operation; then
            echo "Operation successful on attempt $attempt"
            return 0
        else
            local exit_code=$?
            if [ $exit_code -eq 124 ]; then
                echo "Operation timed out on attempt $attempt"
            else
                echo "Operation failed on attempt $attempt with exit code $exit_code"
            fi

            if [ $attempt -lt $retry_count ]; then
                local wait_time=$((attempt * 5))
                echo "Waiting ${wait_time}s before retry..."
                sleep $wait_time
            fi
        fi
    done

    echo "Operation failed after $retry_count attempts"
    return 1
}

# Batch operations with timeout
batch_with_timeout() {
    local timeout=$1
    local commands_file=$2
    local log_file=$3

    echo "Batch processing with timeout"
    echo "Timeout: ${timeout}s"
    echo "Commands: $commands_file"
    echo "Log: $log_file"

    local total=0
    local success=0
    local failed=0
    local timed_out=0

    while IFS= read -r command; do
        # Skip empty lines and comments
        [[ -z "$command" ]] && continue
        [[ "$command" =~ ^# ]] && continue

        total=$((total + 1))
        echo "$(date): Processing [$total] $command" >> "$log_file"

        if timeout --preserve-status "$timeout" bash -c "$command" >> "$log_file" 2>&1; then
            echo "$(date): SUCCESS: $command" >> "$log_file"
            success=$((success + 1))
        else
            local exit_code=$?
            if [ $exit_code -eq 124 ]; then
                echo "$(date): TIMEOUT: $command" >> "$log_file"
                timed_out=$((timed_out + 1))
            else
                echo "$(date): FAILED: $command (exit code: $exit_code)" >> "$log_file"
                failed=$((failed + 1))
            fi
        fi
    done < "$commands_file"

    echo ""
    echo "Batch Processing Summary:"
    echo "Total: $total"
    echo "Success: $success"
    echo "Failed: $failed"
    echo "Timed out: $timed_out"
}

# Usage
timed_command "30s" "./backup.sh" "/var/log/backup.log" "10s"
safe_network_operation "ping -c 4 8.8.8.8" "10" "3"
batch_with_timeout "60" "commands.txt" "/var/log/batch_processing.log"
```

### Advanced Usage
```bash
# Progress monitoring with timeout
timeout_with_progress() {
    local duration=$1
    local command=$2
    local progress_file=$3

    echo "Starting command with ${duration}s timeout"
    echo "Progress will be saved to: $progress_file"

    # Start command in background
    $command &
    local cmd_pid=$!

    # Monitor with timeout
    (
        start_time=$(date +%s)
        while kill -0 $cmd_pid 2>/dev/null; do
            current_time=$(date +%s)
            elapsed=$((current_time - start_time))
            remaining=$((duration - elapsed))

            if [ $remaining -le 0 ]; then
                echo "$(date): Timeout reached, killing process (PID: $cmd_pid)" >> "$progress_file"
                kill -TERM $cmd_pid
                sleep 5
                kill -KILL $cmd_pid 2>/dev/null
                break
            fi

            echo "$(date): Running... Elapsed: ${elapsed}s, Remaining: ${remaining}s" >> "$progress_file"
            sleep 5
        done
    ) &

    local monitor_pid=$!

    # Wait for command to complete
    wait $cmd_pid
    local cmd_exit_code=$?

    # Kill monitor
    kill $monitor_pid 2>/dev/null

    echo "$(date): Command completed with exit code $cmd_exit_code" >> "$progress_file"
    return $cmd_exit_code
}

# Resource monitoring with timeout
timeout_with_monitoring() {
    local duration=$1
    local command=$2
    local log_file=$3

    echo "Starting command with monitoring: $command"
    echo "Duration: ${duration}s"
    echo "Log: $log_file"

    # Start command and monitor resources
    (
        echo "$(date): Starting command monitoring"
        $command &
        local cmd_pid=$!

        # Monitor command and resources
        while kill -0 $cmd_pid 2>/dev/null; do
            # Log resource usage
            ps -p $cmd_pid -o pid,pcpu,pmem,rss,vsz,etime,comm >> "$log_file"
            sleep 10
        done

        echo "$(date): Command finished"
    ) | timeout "$duration" cat > "$log_file"

    local exit_code=$?
    if [ $exit_code -eq 124 ]; then
        echo "$(date): Command timed out after ${duration}s" >> "$log_file"
        return 124
    else
        echo "$(date): Command completed" >> "$log_file"
        return 0
    fi
}

# Adaptive timeout based on file size
adaptive_timeout() {
    local command=$1
    local base_timeout=${2:-60}
    local file_size_factor=${3:-10}  # seconds per MB

    # Estimate processing time based on input size
    local input_size=$(du -s . | cut -f1)  # KB
    local timeout=$((base_timeout + (input_size * file_size_factor / 1024)))

    echo "Adaptive timeout: ${timeout}s (input size: ${input_size}KB)"
    timeout "$timeout" $command
}

# Usage
timeout_with_progress "300" "./long_process.sh" "/tmp/process_progress.log"
timeout_with_monitoring "180" "python data_processor.py" "/var/log/data_processing.log"
adaptive_timeout "./process_images.sh" "120" "5"
```

### Production Usage
```bash
# Service health check with timeout
health_check() {
    local service=$1
    local timeout=${2:-30}
    local check_command=$3

    echo "Health check for $service"
    echo "Timeout: ${timeout}s"

    if timeout "$timeout" $check_command; then
        echo "✓ Health check passed"
        return 0
    else
        local exit_code=$?
        if [ $exit_code -eq 124 ]; then
            echo "✗ Health check timed out"
        else
            echo "✗ Health check failed"
        fi
        return 1
    fi
}

# Deployment with timeout
safe_deploy() {
    local deploy_script=$1
    local timeout=${2:-600}  # 10 minutes default
    local rollback_script=$3

    echo "Starting deployment with ${timeout}s timeout"
    echo "Deploy script: $deploy_script"

    if timeout "$timeout" "$deploy_script"; then
        echo "✓ Deployment completed successfully"
        return 0
    else
        local exit_code=$?
        echo "✗ Deployment failed"

        if [ $exit_code -eq 124 ]; then
            echo "Deployment timed out after ${timeout}s"
        else
            echo "Deployment failed with exit code $exit_code"
        fi

        if [ -n "$rollback_script" ]; then
            echo "Starting rollback..."
            timeout "$timeout" "$rollback_script"
        fi

        return 1
    fi
}

# Usage
health_check "webserver" "30" "curl -f http://localhost:8080/health"
safe_deploy "./deploy.sh" "1800" "./rollback.sh"
```