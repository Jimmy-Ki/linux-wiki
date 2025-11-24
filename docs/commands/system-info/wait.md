---
title: wait - Wait for Process Completion
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# wait - Wait for Process Completion

The `wait` command waits for processes to complete and returns their exit status. It's essential for shell scripting when you need to synchronize the execution of multiple processes or ensure background jobs complete before proceeding.

## Basic Syntax

```bash
wait [PID | JOB_SPEC]
```

## Common Options

The `wait` command accepts:
- `PID` - Process ID to wait for
- `%JOB_NUMBER` - Job specification to wait for
- No arguments - Wait for all background jobs

## Usage Examples

### Waiting for Single Job
```bash
# Start a background job
sleep 10 &
[1] 12345

# Wait for it to complete
wait %1
[1]+  Done                    sleep 10

# The script continues after job completes
echo "Job completed!"
```

### Waiting by Process ID
```bash
# Start process and capture PID
sleep 5 &
PID=$!
echo "Started process with PID: $PID"

# Wait for specific process
wait $PID
echo "Process $PID completed"
```

### Waiting for Multiple Jobs
```bash
# Start multiple background jobs
job1 &
job2 &
job3 &

# Wait for all background jobs to complete
wait

echo "All jobs completed"
```

## Practical Examples

### Parallel Processing
```bash
#!/bin/bash
# Process multiple files in parallel

files=("file1.txt" "file2.txt" "file3.txt")

# Start all jobs in background
for file in "${files[@]}"; do
    process_file "$file" &
    echo "Started processing $file with PID $!"
done

# Wait for all processes to complete
wait

echo "All files processed"
```

### Database Operations
```bash
#!/bin/bash
# Perform database operations in parallel

# Start backup
mysqldump -u user -p database > backup.sql &
BACKUP_PID=$!

# Start data analysis
python analyze_data.py &
ANALYSIS_PID=$!

# Wait for both to complete
wait $BACKUP_PID
echo "Backup completed"

wait $ANALYSIS_PID
echo "Analysis completed"
```

### Build Systems
```bash
#!/bin/bash
# Parallel build process

# Start compilation
make build &
BUILD_PID=$!

# Start documentation generation
make docs &
DOCS_PID=$!

# Start tests
make test &
TEST_PID=$!

# Wait for all processes
wait $BUILD_PID $DOCS_PID $TEST_PID

echo "Build process completed successfully"
```

### File Operations
```bash
#!/bin/bash
# Parallel file operations

# Large file copy
cp -r /large/source /backup/destination &
COPY_PID=$!

# File compression
tar -czf archive.tar.gz /directory/ &
COMPRESS_PID=$!

# Wait for operations to complete
wait $COPY_PID
echo "Copy completed"

wait $COMPRESS_PID
echo "Compression completed"
```

### Network Operations
```bash
#!/bin/bash
# Download and process files

urls=("http://example.com/file1.zip" "http://example.com/file2.zip")

# Download all files in parallel
for url in "${urls[@]}"; do
    wget "$url" &
    echo "Downloading $url with PID $!"
done

# Wait for all downloads to complete
wait

echo "All downloads completed"
```

## Advanced Usage

### Exit Status Handling
```bash
#!/bin/bash
# Handle exit status of background jobs

some_command &
PID=$!

# Wait and check exit status
wait $PID
STATUS=$?

if [ $STATUS -eq 0 ]; then
    echo "Command succeeded"
else
    echo "Command failed with status $STATUS"
fi
```

### Timeout Implementation
```bash
#!/bin/bash
# Wait with timeout

long_process &
PID=$!

# Wait for process with timeout
TIMEOUT=30
while [ $TIMEOUT -gt 0 ]; do
    if ! kill -0 $PID 2>/dev/null; then
        echo "Process completed"
        wait $PID
        exit 0
    fi
    sleep 1
    TIMEOUT=$((TIMEOUT - 1))
done

echo "Timeout reached, killing process"
kill $PID
wait $PID
```

### Job Completion Monitoring
```bash
#!/bin/bash
# Monitor job completion

jobs=(job1 job2 job3)
pids=()

# Start all jobs
for job in "${jobs[@]}"; do
    $job &
    pids+=($!)
done

# Monitor progress
while [ ${#pids[@]} -gt 0 ]; do
    echo "Running jobs: ${pids[*]}"

    # Check for completed jobs
    new_pids=()
    for pid in "${pids[@]}"; do
        if kill -0 $pid 2>/dev/null; then
            new_pids+=($pid)
        else
            wait $pid
            echo "Job $pid completed"
        fi
    done
    pids=("${new_pids[@]}")

    sleep 1
done

echo "All jobs completed"
```

### Conditional Waiting
```bash
#!/bin/bash
# Wait based on conditions

critical_task &
CRITICAL_PID=$!

optional_task &
OPTIONAL_PID=$!

# Wait for critical task first
wait $CRITICAL_PID
echo "Critical task completed"

# Optionally wait for optional task
if [ "$WAIT_FOR_OPTIONAL" = "true" ]; then
    wait $OPTIONAL_PID
    echo "Optional task completed"
else
    echo "Not waiting for optional task"
fi
```

## Integration with Shell Scripts

### Pipeline Processing
```bash
#!/bin/bash
# Multi-stage pipeline

# Stage 1: Data extraction
extract_data &
EXTRACT_PID=$!

# Wait for extraction before continuing
wait $EXTRACT_PID

# Stage 2: Data processing (can run in parallel with stage 3)
process_data &
PROCESS_PID=$!

# Stage 3: Data validation
validate_data &
VALIDATE_PID=$!

# Wait for processing and validation
wait $PROCESS_PID $VALIDATE_PID

echo "Pipeline completed successfully"
```

### Error Recovery
```bash
#!/bin/bash
# Wait with error recovery

main_process &
MAIN_PID=$!

monitor_process &
MONITOR_PID=$!

# Wait for main process
wait $MAIN_PID
MAIN_STATUS=$?

if [ $MAIN_STATUS -ne 0 ]; then
    echo "Main process failed, starting recovery"
    recovery_process &
    RECOVERY_PID=$!
    wait $RECOVERY_PID
fi

# Clean up monitor
kill $MONITOR_PID 2>/dev/null
wait $MONITOR_PID
```

### Progress Reporting
```bash
#!/bin/bash
# Wait with progress reporting

tasks=("task1" "task2" "task3")
total_tasks=${#tasks[@]}
completed=0

# Start all tasks
for task in "${tasks[@]}"; do
    $task &
    pids+=($!)
done

# Wait and report progress
for pid in "${pids[@]}"; do
    wait $pid
    completed=$((completed + 1))
    progress=$((completed * 100 / total_tasks))
    echo "Progress: $progress% ($completed/$total_tasks)"
done

echo "All tasks completed"
```

## System Administration

### Service Management
```bash
#!/bin/bash
# Start and wait for services

services=("nginx" "mysql" "redis")

# Start all services
for service in "${services[@]}"; do
    systemctl start $service &
    echo "Starting $service"
done

# Wait for all services to be ready
for service in "${services[@]}"; do
    while ! systemctl is-active --quiet $service; do
        echo "Waiting for $service..."
        sleep 1
    done
    echo "$service is ready"
done

echo "All services are running"
```

### Backup Synchronization
```bash
#!/bin/bash
# Synchronize backups to multiple locations

locations=("backup1.example.com" "backup2.example.com" "backup3.example.com")

# Start parallel backups
for location in "${locations[@]}"; do
    rsync -av /data/ $location:/backup/ &
    echo "Starting backup to $location"
done

# Wait for all backups to complete
wait

echo "All backups completed successfully"
```

### Log Processing
```bash
#!/bin/bash
# Process multiple log files

log_files=("/var/log/access.log" "/var/log/error.log" "/var/log/system.log")

# Process logs in parallel
for log_file in "${log_files[@]}"; do
    python process_log.py "$log_file" "${log_file}.processed" &
    echo "Processing $log_file"
done

# Wait for all processing to complete
wait

echo "All log files processed"
```

## Troubleshooting

### Stuck Processes
```bash
#!/bin/bash
# Handle stuck processes

process_with_timeout &
PID=$!

# Wait with timeout handling
if timeout 60 wait $PID; then
    echo "Process completed normally"
else
    echo "Process timed out, killing..."
    kill -TERM $PID
    wait $PID
fi
```

### Zombie Processes
```bash
#!/bin/bash
# Wait and clean up zombie processes

start_background_process &
PID=$!

# Wait and ensure process is reaped
wait $PID

# Verify no zombie
if ps -p $PID > /dev/null; then
    echo "Warning: Process $PID still exists"
    kill -9 $PID 2>/dev/null
fi
```

## Performance Optimization

### Job Pool Management
```bash
#!/bin/bash
# Limit concurrent jobs

MAX_JOBS=4
tasks=($(ls *.txt))
pids=()

# Process files with job limit
for task in "${tasks[@]}"; do
    # Wait if we have too many jobs
    while [ ${#pids[@]} -ge $MAX_JOBS ]; do
        # Remove completed PIDs
        new_pids=()
        for pid in "${pids[@]}"; do
            if kill -0 $pid 2>/dev/null; then
                new_pids+=($pid)
            else
                wait $pid
            fi
        done
        pids=("${new_pids[@]}")
        sleep 0.1
    done

    # Start new job
    process_file "$task" &
    pids+=($!)
done

# Wait for remaining jobs
wait
echo "All tasks completed"
```

## Related Commands

- [`jobs`](/docs/commands/process-management/jobs) - List active jobs
- [`bg`](/docs/commands/process-management/bg) - Background suspended jobs
- [`fg`](/docs/commands/process-management/fg) - Bring jobs to foreground
- [`kill`](/docs/commands/process-management/kill) - Send signals to processes
- [`disown`](/docs/commands/process-management/disown) - Remove jobs from shell control
- [`sleep`](/docs/commands/system/sleep) - Delay execution
- [`timeout`](/docs/commands/process-management/timeout) - Run command with time limit

## Best Practices

1. **Use `$!`** to capture PIDs of background processes
2. **Check exit status** with `$?` after `wait` for error handling
3. **Use timeouts** to prevent indefinite waiting
4. **Limit concurrent jobs** to avoid system overload
5. **Clean up processes** that don't complete normally
6. **Monitor progress** for long-running operations
7. **Use job arrays** for managing multiple similar tasks
8. **Handle signals gracefully** in wait loops

The `wait` command is fundamental for process synchronization in shell scripting, enabling controlled parallel execution and proper resource management.