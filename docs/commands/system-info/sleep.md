---
title: sleep - Delay for a specified time
sidebar_label: sleep
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sleep - Delay for a specified time

The `sleep` command is a fundamental Unix/Linux utility that suspends program execution for a specified amount of time. It delays for a specified time by pausing the current process or script for the given duration. Sleep is one of the most essential utilities in shell scripting, system administration, and process coordination, providing a simple way to introduce timed delays, control execution flow, and synchronize processes. It supports multiple time units including seconds, minutes, hours, and days, making it versatile for various timing requirements from microsecond delays to extended pauses.

## Basic Syntax

```bash
sleep NUMBER[SUFFIX]...
sleep OPTION
```

## Common Options

### Help and Version
- `-h, --help` - Display help information and exit
- `-v, --version` - Output version information and exit

### Time Suffixes
- `s` - Seconds (default if no suffix specified)
- `m` - Minutes
- `h` - Hours
- `d` - Days

## Usage Examples

### Basic Time Delays

#### Simple Sleep Operations
```bash
# Sleep for 5 seconds (default unit)
sleep 5

# Sleep for 30 seconds explicitly
sleep 30s

# Sleep for 2 minutes
sleep 2m

# Sleep for 1 hour
sleep 1h

# Sleep for half a day
sleep 0.5d

# Sleep for 1 hour and 30 minutes
sleep 1h 30m

# Sleep for 1 day, 2 hours, 30 minutes, and 45 seconds
sleep 1d 2h 30m 45s
```

#### Fractional Time Delays
```bash
# Sleep for 2.5 seconds
sleep 2.5

# Sleep for 0.75 seconds (750 milliseconds)
sleep 0.75s

# Sleep for 1.5 minutes (90 seconds)
sleep 1.5m

# Sleep for 0.25 hours (15 minutes)
sleep 0.25h

# Sleep for 0.1 days (2.4 hours)
sleep 0.1d
```

### Shell Script Integration

#### Script Timing Control
```bash
#!/bin/bash
# Demo script with timing control

echo "Starting demo script..."
echo "Step 1: Initializing..."
sleep 2

echo "Step 2: Loading configuration..."
sleep 1.5

echo "Step 3: Connecting to services..."
sleep 3

echo "Step 4: Processing data..."
for i in {1..5}; do
    echo "Processing item $i..."
    sleep 0.5
done

echo "Step 5: Cleaning up..."
sleep 1

echo "Demo completed successfully!"
```

#### Retry Logic with Delays
```bash
#!/bin/bash
# Retry mechanism with exponential backoff

function retry_command {
    local max_attempts=5
    local attempt=1
    local delay=1

    while [ $attempt -le $max_attempts ]; do
        echo "Attempt $attempt of $max_attempts..."

        # Try the command (replace with actual command)
        if ping -c 1 google.com >/dev/null 2>&1; then
            echo "Success on attempt $attempt!"
            return 0
        fi

        if [ $attempt -lt $max_attempts ]; then
            echo "Failed. Retrying in ${delay}s..."
            sleep $delay
            delay=$((delay * 2))  # Exponential backoff
        fi

        attempt=$((attempt + 1))
    done

    echo "All attempts failed!"
    return 1
}

retry_command
```

### System Administration

#### Service Management Delays
```bash
#!/bin/bash
# Service restart with proper timing

echo "Stopping web service..."
sudo systemctl stop nginx
sleep 5  # Allow service to fully stop

echo "Updating configuration..."
# Configuration update commands here
sleep 2

echo "Starting web service..."
sudo systemctl start nginx
sleep 3  # Allow service to initialize

echo "Verifying service status..."
sleep 2
sudo systemctl status nginx
```

#### System Resource Monitoring
```bash
#!/bin/bash
# Monitor system resources with intervals

echo "Starting system monitoring..."
echo "Timestamp,CPU%,Memory%,Load" > system_monitor.csv

while true; do
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    mem_usage=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
    load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | cut -d',' -f1)

    echo "$timestamp,$cpu_usage,$mem_usage,$load_avg" >> system_monitor.csv
    echo "[$timestamp] CPU: ${cpu_usage}%, Memory: ${mem_usage}%, Load: $load_avg"

    sleep 30  # Monitor every 30 seconds
done
```

### Process Coordination

#### Parallel Process Synchronization
```bash
#!/bin/bash
# Synchronize multiple background processes

echo "Starting parallel processes..."

# Start process 1
{
    echo "Process 1 started"
    sleep 5
    echo "Process 1 completed"
} &

pid1=$!

# Start process 2 after delay
sleep 2  # Staggered start
{
    echo "Process 2 started"
    sleep 4
    echo "Process 2 completed"
} &

pid2=$!

# Wait for both processes with timeout
echo "Waiting for processes to complete..."
while kill -0 $pid1 2>/dev/null || kill -0 $pid2 2>/dev/null; do
    sleep 1
    echo "Still waiting..."
done

echo "All processes completed!"
```

#### Rate Limiting
```bash
#!/bin/bash
# Rate limiting for API calls or file operations

function rate_limited_operation {
    local rate_limit=2  # Operations per second
    local delay=$(echo "1 / $rate_limit" | bc -l)

    for item in "$@"; do
        echo "Processing: $item"
        # Simulate operation (replace with actual work)
        echo "Operation completed for: $item"

        # Rate limiting delay
        sleep $delay
    done
}

# Process files with rate limiting
files=("file1.txt" "file2.txt" "file3.txt" "file4.txt" "file5.txt")
rate_limited_operation "${files[@]}"
```

## Practical Examples

### Development Workflow

#### Build Process Coordination
```bash
#!/bin/bash
# Build process with staged timing

echo "Starting build process..."

# Clean previous builds
echo "Cleaning build directory..."
rm -rf build/*
sleep 1

# Compile dependencies
echo "Compiling dependencies..."
make deps
sleep 2

# Build main application
echo "Building main application..."
make build
sleep 1

# Run tests
echo "Running test suite..."
make test
sleep 1

# Generate documentation
echo "Generating documentation..."
make docs

echo "Build process completed!"
```

#### Development Server Management
```bash
#!/bin/bash
# Development server with automatic restart

while true; do
    echo "Starting development server..."
    npm start &
    server_pid=$!

    echo "Server running with PID: $server_pid"
    echo "Watching for file changes..."

    # Check for file changes every 2 seconds
    while true; do
        if find . -name "*.js" -o -name "*.py" -o -name "*.html" | grep -q .; then
            echo "File changes detected. Restarting server..."
            kill $server_pid 2>/dev/null
            sleep 2  # Allow server to stop
            break
        fi
        sleep 2
    done
done
```

### Network Operations

#### Network Connectivity Testing
```bash
#!/bin/bash
# Network connectivity test with intervals

function test_connectivity {
    local hosts=("google.com" "github.com" "stackoverflow.com")
    local interval=10

    echo "Starting network connectivity test..."
    echo "Testing every $interval seconds"

    while true; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testing connectivity..."

        for host in "${hosts[@]}"; do
            if ping -c 1 -W 3 $host >/dev/null 2>&1; then
                echo "  ✓ $host - Connected"
            else
                echo "  ✗ $host - Failed"
            fi
        done

        echo "Waiting $interval seconds..."
        sleep $interval
    done
}

test_connectivity
```

#### Batch Download with Delays
```bash
#!/bin/bash
# Download files with delays to prevent overwhelming servers

function batch_download {
    local urls=(
        "https://example.com/file1.pdf"
        "https://example.com/file2.pdf"
        "https://example.com/file3.pdf"
    )

    local delay_between_downloads=5
    local output_dir="downloads"

    mkdir -p "$output_dir"

    for url in "${urls[@]}"; do
        filename=$(basename "$url")
        echo "Downloading: $filename"

        wget -O "$output_dir/$filename" "$url"

        if [ $? -eq 0 ]; then
            echo "✓ Successfully downloaded: $filename"
        else
            echo "✗ Failed to download: $filename"
        fi

        # Wait between downloads
        if [ "$url" != "${urls[-1]}" ]; then
            echo "Waiting ${delay_between_downloads}s before next download..."
            sleep $delay_between_downloads
        fi
    done
}

batch_download
```

## Advanced Usage

### Complex Timing Scenarios

#### Progress Bar with Sleep
```bash
#!/bin/bash
# Animated progress bar using sleep

function show_progress_bar {
    local duration=10
    local steps=20
    local step_duration=$(echo "$duration / $steps" | bc -l)

    echo "Progress: [                    ] 0%"

    for i in $(seq 1 $steps); do
        # Calculate progress
        progress=$((i * 100 / steps))
        filled=$((i * 20 / steps))
        empty=$((20 - filled))

        # Build progress bar
        bar="["
        bar+=$(printf "%*s" $filled | tr ' ' '=')
        bar+=$(printf "%*s" $empty | tr ' ' ' ')
        bar+="] ${progress}%"

        # Update display
        printf "\rProgress: %s" "$bar"
        sleep $step_duration
    done

    printf "\nProgress: [====================] 100% - Complete!\n"
}

show_progress_bar
```

#### Countdown Timer
```bash
#!/bin/bash
# Countdown timer with display

function countdown {
    local target_time=$1
    local message=${2:-"Time's up!"}

    echo "Starting countdown: $target_time seconds"

    for ((i=target_time; i>=0; i--)); do
        printf "\rTime remaining: %02d:%02d" $((i/60)) $((i%60))
        sleep 1
    done

    printf "\n$message\n"
}

# Usage examples
countdown 60 "One minute completed!"
countdown 300 "Five minutes passed - take a break!"
```

### System Resource Management

#### CPU Usage Throttling
```bash
#!/bin/bash
# Throttle CPU-intensive operations

function throttled_process {
    local cpu_limit=50  # Maximum CPU usage percentage
    local work_duration=0.1  # Work duration in seconds
    local sleep_duration=$(echo "($work_duration * (100 - $cpu_limit)) / $cpu_limit" | bc -l)

    echo "Starting throttled process (CPU limit: ${cpu_limit}%)"

    while true; do
        # Do some work
        echo "Working... ($(date '+%H:%M:%S.%3N'))"

        # Sleep to limit CPU usage
        sleep $sleep_duration
    done
}

throttled_process
```

#### Memory Cleanup Intervals
```bash
#!/bin/bash
# Memory cleanup with periodic intervals

function memory_cleanup_scheduler {
    local cleanup_interval=300  # 5 minutes
    local memory_threshold=80   # 80% memory usage

    echo "Starting memory cleanup scheduler..."
    echo "Cleanup interval: ${cleanup_interval}s, Threshold: ${memory_threshold}%"

    while true; do
        # Check memory usage
        memory_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')

        if [ $memory_usage -gt $memory_threshold ]; then
            echo "[$(date)] Memory usage high (${memory_usage}%). Running cleanup..."

            # Clear system caches
            sync && echo 3 > /proc/sys/vm/drop_caches
            sleep 5

            # Run garbage collection if applicable
            # Add application-specific cleanup commands here

            echo "Cleanup completed. New memory usage: $(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')%"
        else
            echo "[$(date)] Memory usage normal: ${memory_usage}%"
        fi

        sleep $cleanup_interval
    done
}

memory_cleanup_scheduler
```

## Integration and Automation

### Backup Operations

#### Timed Backup Script
```bash
#!/bin/bash
# Backup operations with timing coordination

function timed_backup {
    local source_dir="/home/user/documents"
    local backup_dir="/backups"
    local timestamp=$(date '+%Y%m%d_%H%M%S')

    echo "Starting backup process..."

    # Stage 1: Prepare backup directory
    echo "Preparing backup directory..."
    mkdir -p "$backup_dir"
    sleep 2

    # Stage 2: Create initial backup
    echo "Creating initial backup..."
    tar -czf "$backup_dir/initial_backup_$timestamp.tar.gz" -C "$(dirname "$source_dir")" "$(basename "$source_dir")"
    sleep 1

    # Stage 3: Verify backup integrity
    echo "Verifying backup integrity..."
    if tar -tzf "$backup_dir/initial_backup_$timestamp.tar.gz" >/dev/null; then
        echo "✓ Backup verification successful"
    else
        echo "✗ Backup verification failed"
        return 1
    fi
    sleep 1

    # Stage 4: Clean old backups (keep last 7 days)
    echo "Cleaning old backups..."
    find "$backup_dir" -name "initial_backup_*.tar.gz" -mtime +7 -delete
    sleep 1

    echo "Backup process completed successfully!"
}

timed_backup
```

### Log File Management

#### Log Rotation with Delays
```bash
#!/bin/bash
# Log file rotation with timing control

function rotate_logs {
    local log_dir="/var/log/myapp"
    local max_files=7
    local compress_delay=60  # Wait before compressing

    echo "Starting log rotation..."

    # Move current logs
    if [ -f "$log_dir/app.log" ]; then
        echo "Rotating current log..."
        mv "$log_dir/app.log" "$log_dir/app.log.$(date +%Y%m%d_%H%M%S)"
        sleep 2  # Allow applications to create new log files
    fi

    # Wait before compressing (ensure file is not being written to)
    echo "Waiting ${compress_delay}s before compression..."
    sleep $compress_delay

    # Compress old logs
    echo "Compressing old logs..."
    find "$log_dir" -name "app.log.*" -type f -mtime +1 -exec gzip {} \;
    sleep 1

    # Remove very old logs
    echo "Removing old log files..."
    ls -1t "$log_dir"/app.log.*.gz | tail -n +$((max_files + 1)) | xargs -r rm

    echo "Log rotation completed!"
}

rotate_logs
```

## Troubleshooting

### Common Issues

#### Precision and Timing
```bash
# Sleep precision varies by system load
# For high precision timing, consider alternatives

# Basic sleep (may vary based on system load)
time sleep 1

# More precise timing using GNU coreutils
timeout 1s sleep infinity 2>/dev/null

# For millisecond precision on Linux
sleep 0.001  # 1 millisecond

# Check sleep precision
start_time=$(date +%s.%N)
sleep 0.1
end_time=$(date +%s.%N)
actual_sleep=$(echo "$end_time - $start_time" | bc)
echo "Actual sleep time: ${actual_sleep}s"
```

#### Signal Handling
```bash
#!/bin/bash
# Sleep with signal handling

function interruptible_sleep {
    local duration=$1
    local elapsed=0

    echo "Sleeping for ${duration}s (press Ctrl+C to interrupt)..."

    while [ $elapsed -lt $duration ]; do
        if sleep 1 2>/dev/null; then
            elapsed=$((elapsed + 1))
            echo -ne "\rElapsed: ${elapsed}s/${duration}s"
        else
            echo -e "\nSleep interrupted!"
            return 130  # Standard interrupt exit code
        fi
    done

    echo -e "\nSleep completed!"
}

# Trap signals for clean interruption
trap 'echo -e "\nCaught signal!"; exit 130' INT TERM

interruptible_sleep 30
```

#### Resource Usage
```bash
#!/bin/bash
# Monitor sleep command resource usage

function monitor_sleep_resources {
    echo "Testing sleep resource usage..."
    echo "Monitoring for 10 seconds..."

    # Start sleep in background
    sleep 10 &
    sleep_pid=$!

    # Monitor resources
    while kill -0 $sleep_pid 2>/dev/null; do
        echo "PID: $sleep_pid, Memory: $(ps -o pid,rss -p $sleep_pid | tail -1 | awk '{print $2}')KB, Status: $(ps -o pid,stat -p $sleep_pid | tail -1 | awk '{print $2}')"
        sleep 1
    done

    echo "Sleep process completed"
}

monitor_sleep_resources
```

## Related Commands

- [`timeout`](/docs/commands/process-management/timeout) - Run command with time limit
- [`wait`](/docs/commands/system-info/wait) - Wait for process completion
- [`usleep`](/docs/commands/system/usleep) - Microsecond sleep (deprecated)
- [`watch`](/docs/commands/system-info/watch) - Execute command periodically
- [`at`](/docs/commands/system-service/at) - Schedule command execution
- [`cron`](/docs/commands/system-service/crontab) - Scheduled task execution
- [`jobs`](/docs/commands/system-info/jobs) - Background process management
- [`nohup`](/docs/commands/system-info/nohup) - Run command immune to hangups

## Best Practices

1. **Use appropriate time units** - Choose s, m, h, d based on duration for readability
2. **Consider system load** - Sleep timing can vary with system load and scheduling
3. **Use fractional seconds** - Available on most modern systems for precise timing
4. **Combine multiple units** - `sleep 1h 30m 45s` for complex durations
5. **Handle interrupts gracefully** - Use traps in scripts for clean signal handling
6. **Consider alternatives for high precision** - Use specialized tools for microsecond timing
7. **Test on target systems** - Sleep behavior may vary across different Unix/Linux systems
8. **Document sleep durations** - Explain why specific delays are needed in scripts
9. **Use exponential backoff** - For retry logic to avoid overwhelming services
10. **Monitor resource impact** - Sleep has minimal overhead but verify in critical systems

## Performance Tips

1. **Minimal CPU usage** - Sleep uses virtually no CPU resources while waiting
2. **System scheduler friendly** - Sleep yields CPU to other processes
3. **Combine operations** - Use multiple arguments instead of sequential sleep commands
4. **Precision limitations** - Standard sleep has millisecond precision at best
5. **Alternative for high precision** - Consider `nanosleep` or specialized timing libraries
6. **Batch processing** - Use sleep between batch operations to prevent resource exhaustion
7. **Load balancing** - Distribute sleep timing across concurrent processes
8. **Testing accuracy** - Verify actual sleep times in timing-critical applications
9. **System timers** - Sleep relies on system timers, which may have resolution limits
10. **Power management** - Sleep may be affected by system power saving features

The `sleep` command is a fundamental utility that provides simple yet powerful timing control for shell scripts and system administration tasks. Its versatility in handling various time units, minimal resource usage, and reliable behavior across Unix/Linux systems make it an essential tool for process coordination, rate limiting, and timing-sensitive operations.