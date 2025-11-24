---
title: nohup - Run command immune to hangups
slug: nohup
tags: [process-management, linux-commands]
---

> **Command Reference**: This content is based on the comprehensive [linux-command](https://github.com/jaywcjlove/linux-command) project by [jaywcjlove](https://github.com/jaywcjlove), licensed under the MIT License.

# nohup - Run command immune to hangups

The `nohup` command runs a command that ignores hangup signals and allows it to continue running after you log out from the terminal. It's commonly used for running long-running processes that need to persist beyond the current session.

## Syntax

```bash
nohup COMMAND [ARG]...
nohup OPTION
```

## Common Options

- `--help`: Display help message
- `--version`: Display version information

## Usage Examples

### Basic Usage
```bash
# Run a command that continues after logout
nohup long_running_script.sh

# Run with arguments
nohup python3 server.py --port 8080

# Run in background
nohup backup_database.sh &
```

### Output Management
```bash
# Redirect output to specific file
nohup ./script.sh > output.log 2>&1 &

# Send all output to /dev/null
nohup ./silent_script.sh > /dev/null 2>&1 &

# Separate stdout and stderr
nohup ./script.sh > out.log 2>error.log &
```

### Common Long-running Tasks
```bash
# Start web server
nohup python3 -m http.server 8000 &

# Run database backup
nohup mysqldump -u root -p database > backup.sql &

# Start a daemon process
nohup java -jar application.jar &

# Copy large files
nohup cp -r /large/source /large/destination &
```

### Background Process Management
```bash
# Start and get PID
nohup ./script.sh > script.log 2>&1 &
echo $! > script.pid

# Monitor the process
tail -f script.log

# Check if process is still running
kill -0 $(cat script.pid) && echo "Process is running"
```

### Development and Deployment
```bash
# Start development server
nohup npm start > server.log 2>&1 &

# Run tests in background
nohup python -m pytest tests/ > test_results.log 2>&1 &

# Deploy application
nohup ./deploy.sh > deploy.log 2>&1 &

# Start microservice
nohup java -Xmx512m -jar microservice.jar &

# Run database migration
nohup rails db:migrate > migration.log 2>&1 &
```

### System Administration
```bash
# System update
nohup apt update && apt upgrade -y > update.log 2>&1 &

# Log rotation
nohup logrotate /etc/logrotate.conf > logrotate.log 2>&1 &

# Security scan
nohup clamscan -r /home/ > security_scan.log 2>&1 &

# System cleanup
nohup find /tmp -type f -mtime +7 -delete > cleanup.log 2>&1 &
```

### Batch Processing
```bash
# Process multiple files
nohup for file in *.txt; do
    process_file "$file"
done > processing.log 2>&1 &

# Run batch job
nohup python batch_processor.py --input /data --output /results > batch.log 2>&1 &

# Data import
nohup mongoimport --db database --collection collection --file data.json > import.log 2>&1 &
```

### Monitoring and Logging
```bash
# Start monitoring script
nohup ./monitor_system.sh > system_monitor.log 2>&1 &

# Log rotation script
nohup ./rotate_logs.sh > log_rotation.log 2>&1 &

# Performance monitoring
nohup iostat 60 > iostat.log 2>&1 &

# Network monitoring
nohup tcpdump -i eth0 -w network_capture.pcap > capture.log 2>&1 &
```

## Understanding nohup Behavior

### Signal Handling
- `nohup` ignores the SIGHUP signal
- Process continues running when terminal closes
- Other signals (SIGTERM, SIGKILL) are still handled normally

### Output Redirection
- If not redirected, stdout goes to `nohup.out` in current directory
- If current directory not writable, output goes to `$HOME/nohup.out`
- stderr is redirected to same location as stdout

### Process Independence
- Process becomes independent of the terminal
- Runs as child of init/systemd process
- Continues after logout and system reboot (if configured)

## Best Practices

1. **Always redirect output** to control log files:
   ```bash
   nohup ./script.sh > output.log 2>&1 &
   ```
2. **Save process IDs** for later management:
   ```bash
   nohup ./script.sh > script.log 2>&1 & echo $! > script.pid
   ```
3. **Use meaningful log filenames**:
   ```bash
   nohup ./backup.sh > backup_$(date +%Y%m%d_%H%M%S).log 2>&1 &
   ```
4. **Check process status** with saved PIDs
5. **Clean up old nohup.out files** regularly
6. **Use with background operator** (`&`) for true detachment

## Related Commands

- `screen`: Terminal multiplexer for session management
- `tmux`: Terminal multiplexer (modern alternative)
- `disown`: Remove jobs from shell's job table
- `bg/fg`: Background/foreground job control
- `&`: Background operator

## Troubleshooting

### Common Issues

1. **Process stops unexpectedly**: Check logs for errors
2. **Can't find output**: Check `nohup.out` or specified log file
3. **Permission denied**: Check file permissions for output
4. **Process not starting**: Verify command syntax and paths

### Common Scenarios

```bash
# Check if nohup process is running
ps aux | grep nohup

# Find process by PID
kill -0 12345 && echo "Process is running"

# Monitor output file
tail -f nohup.out

# Kill nohup process
kill 12345
```

### Script Examples
```bash
#!/bin/bash
# Process manager for nohup processes
manage_nohup_process() {
    local action=$1
    local pid_file=$2
    local command=$3
    local log_file=$4

    case $action in
        "start")
            if [ -f "$pid_file" ] && kill -0 $(cat "$pid_file") 2>/dev/null; then
                echo "Process already running with PID $(cat $pid_file)"
                return 1
            fi

            echo "Starting process: $command"
            nohup $command > "$log_file" 2>&1 &
            echo $! > "$pid_file"
            echo "Process started with PID $(cat $pid_file)"
            echo "Log file: $log_file"
            ;;
        "stop")
            if [ -f "$pid_file" ]; then
                local pid=$(cat "$pid_file")
                if kill -0 "$pid" 2>/dev/null; then
                    kill "$pid"
                    echo "Process $pid stopped"
                    rm -f "$pid_file"
                else
                    echo "Process $pid not running"
                    rm -f "$pid_file"
                fi
            else
                echo "No PID file found"
            fi
            ;;
        "status")
            if [ -f "$pid_file" ]; then
                local pid=$(cat "$pid_file")
                if kill -0 "$pid" 2>/dev/null; then
                    echo "Process running with PID $pid"
                    ps -p "$pid" -o pid,pcpu,pmem,etime,cmd
                else
                    echo "Process not running (stale PID file)"
                fi
            else
                echo "Process not running"
            fi
            ;;
        "restart")
            manage_nohup_process "stop" "$pid_file" "$command" "$log_file"
            sleep 2
            manage_nohup_process "start" "$pid_file" "$command" "$log_file"
            ;;
        *)
            echo "Usage: $0 {start|stop|status|restart}"
            return 1
            ;;
    esac
}

# Automated backup with nohup
automated_backup() {
    local source=$1
    local destination=$2
    local backup_log="/var/log/backup_$(date +%Y%m%d).log"
    local pid_file="/var/run/backup.pid"

    echo "Starting automated backup"
    echo "Source: $source"
    echo "Destination: $destination"
    echo "Log: $backup_log"

    nohup rsync -av --delete "$source" "$destination" > "$backup_log" 2>&1 &
    local pid=$!
    echo $pid > "$pid_file"

    echo "Backup started with PID $pid"
    echo "Monitor with: tail -f $backup_log"
}

# Service starter with nohup
start_service() {
    local service_name=$1
    local command=$2
    local log_dir="/var/log/$service_name"
    local pid_dir="/var/run"
    local user=${3:-$(whoami)}

    # Create directories if they don't exist
    mkdir -p "$log_dir" "$pid_dir"

    local log_file="$log_dir/${service_name}.log"
    local pid_file="$pid_dir/${service_name}.pid"

    echo "Starting service: $service_name"
    echo "Command: $command"
    echo "Log: $log_file"

    # Check if already running
    if [ -f "$pid_file" ] && kill -0 $(cat "$pid_file") 2>/dev/null; then
        echo "Service already running with PID $(cat $pid_file)"
        return 1
    fi

    # Start service
    if [ "$user" = "$(whoami)" ]; then
        nohup $command > "$log_file" 2>&1 &
    else
        sudo -u "$user" nohup $command > "$log_file" 2>&1 &
    fi

    local pid=$!
    echo $pid > "$pid_file"

    echo "Service started with PID $pid"
    echo "Log file: $log_file"
    echo "PID file: $pid_file"
}

# Usage
manage_nohup_process start /tmp/myapp.pid "./myapp.sh" /tmp/myapp.log
automated_backup /home/user/documents /backup/documents
start_service "webserver" "python3 -m http.server 8080" www-data
```

### Advanced Usage
```bash
# Parallel nohup process manager
parallel_nohup_runner() {
    local max_jobs=${1:-3}
    local commands_file=$2

    echo "Running commands from $commands_file (max concurrent: $max_jobs)"

    local running=0
    local pids=()

    while IFS= read -r command; do
        # Skip empty lines and comments
        [[ -z "$command" ]] && continue
        [[ "$command" =~ ^# ]] && continue

        # Wait for free slot
        while [ $running -ge $max_jobs ]; do
            for i in "${!pids[@]}"; do
                if ! kill -0 "${pids[$i]}" 2>/dev/null; then
                    unset pids[$i]
                    running=$((running - 1))
                fi
            done
            sleep 1
        done

        # Start new job
        local log_file="${command//[^a-zA-Z0-9]/_}.log"
        echo "Starting: $command"
        nohup $command > "$log_file" 2>&1 &
        local pid=$!
        pids+=("$pid")
        running=$((running + 1))

        echo "Started job with PID $pid (log: $log_file)"
    done < "$commands_file"

    # Wait for all jobs to complete
    echo "Waiting for all jobs to complete..."
    for pid in "${pids[@]}"; do
        wait "$pid"
    done

    echo "All jobs completed"
}

# Nohup process health checker
health_check_nohup() {
    local pid_dir="/var/run"
    local log_dir="/var/log"

    echo "Nohup Process Health Check"
    echo "=========================="

    # Check all PID files in /var/run
    for pid_file in "$pid_dir"/*.pid; do
        [ -f "$pid_file" ] || continue

        service_name=$(basename "$pid_file" .pid)
        pid=$(cat "$pid_file")
        log_file="$log_dir/${service_name}.log"

        echo ""
        echo "Service: $service_name"
        echo "PID file: $pid_file"
        echo "PID: $pid"

        if kill -0 "$pid" 2>/dev/null; then
            echo "Status: RUNNING"
            # Show process info
            ps -p "$pid" -o pid,pcpu,pmem,etime,cmd 2>/dev/null || echo "Process info unavailable"

            # Check log file
            if [ -f "$log_file" ]; then
                local log_size=$(du -h "$log_file" | cut -f1)
                echo "Log file: $log_file ($log_size)"
                echo "Last log entry:"
                tail -1 "$log_file" 2>/dev/null || echo "Unable to read log"
            else
                echo "Log file: NOT FOUND"
            fi
        else
            echo "Status: NOT RUNNING"
            echo "Action: Stale PID file detected"
            # Optionally remove stale PID file
            # rm -f "$pid_file"
        fi
    done
}

# Batch nohup starter with monitoring
batch_nohup_starter() {
    local config_file=$1
    local monitor_interval=${2:-60}

    echo "Batch nohup starter"
    echo "Config: $config_file"
    echo "Monitor interval: ${monitor_interval}s"

    # Read config and start processes
    while IFS=',' read -r service_name command user max_restarts; do
        # Skip header and comments
        [[ "$service_name" =~ ^# ]] && continue
        [[ -z "$service_name" ]] && continue

        echo "Setting up service: $service_name"

        # Create log directory
        local log_dir="/var/log/$service_name"
        mkdir -p "$log_dir"

        # Start service
        local log_file="$log_dir/${service_name}.log"
        nohup $command > "$log_file" 2>&1 &
        local pid=$!

        echo "Started $service_name with PID $pid"
        echo "Log: $log_file"

        # Save PID
        echo "$pid" > "/var/run/${service_name}.pid"
    done < "$config_file"

    # Start monitor
    echo "Starting health monitor..."
    nohup bash -c "
        while true; do
            $(which health_check_nohup)
            sleep $monitor_interval
        done
    " > /var/log/health_monitor.log 2>&1 &
}

# Usage examples
parallel_nohup_runner 4 "commands.txt"
health_check_nohup
batch_nohup_starter "services.csv" 120
```

### Production Usage
```bash
# Production deployment script
production_deploy() {
    local app_name=$1
    local app_path=$2
    local command=$3

    echo "Production deployment: $app_name"
    echo "Path: $app_path"
    echo "Command: $command"

    local deploy_log="/var/log/deploy_${app_name}_$(date +%Y%m%d_%H%M%S).log"
    local pid_file="/var/run/${app_name}.pid"

    # Stop existing process if running
    if [ -f "$pid_file" ]; then
        local old_pid=$(cat "$pid_file")
        if kill -0 "$old_pid" 2>/dev/null; then
            echo "Stopping existing process (PID: $old_pid)"
            kill "$old_pid"
            sleep 5
            # Force kill if still running
            kill -9 "$old_pid" 2>/dev/null
        fi
        rm -f "$pid_file"
    fi

    # Deploy and start new process
    echo "Deploying application..."
    cd "$app_path"

    echo "Starting new process..."
    nohup $command > "$deploy_log" 2>&1 &
    local new_pid=$!
    echo $new_pid > "$pid_file"

    echo "Deployment completed!"
    echo "New process PID: $new_pid"
    echo "Deploy log: $deploy_log"

    # Wait a moment and check if process started successfully
    sleep 3
    if kill -0 "$new_pid" 2>/dev/null; then
        echo "✓ Process started successfully"
    else
        echo "✗ Process failed to start"
        echo "Check log: $deploy_log"
        return 1
    fi
}

# Log rotation for nohup processes
rotate_nohup_logs() {
    local log_dir="/var/log"
    local max_files=${1:-7}
    local max_size=${2:-100M}

    echo "Rotating nohup logs in $log_dir"
    echo "Max files: $max_files"
    echo "Max size: $max_size"

    find "$log_dir" -name "*.log" -size "+$max_size" | while read log_file; do
        echo "Rotating large log file: $log_file"
        mv "$log_file" "${log_file}.$(date +%Y%m%d_%H%M%S)"
    done

    # Remove old log files
    find "$log_dir" -name "*.log.*" -type f -mtime +$((max_files - 1)) -delete
    echo "Log rotation completed"
}

# Usage
production_deploy "webapp" "/opt/webapp" "python3 app.py"
rotate_nohup_logs 7 50M
```