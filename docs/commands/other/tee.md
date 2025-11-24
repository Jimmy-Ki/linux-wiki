---
title: tee - Read from Standard Input and Write to Standard Output and Files
sidebar_label: tee
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tee - Read from Standard Input and Write to Standard Output and Files

The `tee` command reads from standard input and writes to both standard output and one or more files simultaneously. It's named after the T-splitter in plumbing, which splits flow into two directions. This makes it invaluable for logging, debugging, and creating intermediate files while continuing data processing.

## Basic Syntax

```bash
tee [OPTIONS] [FILE]...
```

## Common Options

- `-a`, `--append` - Append to files instead of overwriting
- `-i`, `--ignore-interrupts` - Ignore interrupt signals (Ctrl+C)
- `-p` - Diagnose errors writing to non-pipes
- `--output-error[=MODE]` - Set write error behavior mode
- `--help` - Display help information and exit
- `--version` - Show version information and exit

## Error Handling Modes

- `warn` - Diagnose errors writing to any output
- `warn-nopipe` - Diagnose errors writing to non-pipes (default with `-p`)
- `exit` - Exit on any write error
- `exit-nopipe` - Exit on write errors to non-pipes

## Usage Examples

### Basic Usage
```bash
# Display command output and save to file
ls -la | tee file_list.txt

# Save output while still seeing it on screen
ps aux | tee process_list.txt

# Pipe through multiple commands
cat data.txt | tee intermediate.txt | grep "error" | tee errors.txt > final.txt

# View and save command output
find / -name "*.log" 2>/dev/null | tee log_files.txt
```

### Append Mode
```bash
# Append to file instead of overwriting
echo "New log entry" | tee -a application.log
date | tee -a application.log

# Continue appending to log files
for i in {1..5}; do
    echo "Entry $i: $(date)" | tee -a daily.log
done

# Maintain running logs while monitoring
tail -f /var/log/syslog | tee -a syslog_backup.log
```

### Multiple Files
```bash
# Write to multiple files simultaneously
echo "Configuration data" | tee config1.txt config2.txt config3.txt

# Create backups during processing
cat important_data.txt | tee backup1.txt backup2.txt | process_data

# Distribute data to multiple locations
generate_data | tee /data/dataset1.txt /data/dataset2.txt /data/dataset3.txt

# Create different format outputs
ps aux | tee processes.txt processes.csv | awk '{print $1,$4}' | tee pids.txt memory.txt
```

## Practical Examples

### Logging and Debugging
```bash
#!/bin/bash
# Application logging with tee
start_application() {
    local app_name="$1"
    local log_file="$2"

    echo "Starting $app_name..."
    echo "Log file: $log_file"
    echo "Timestamp: $(date)" | tee "$log_file"

    # Run application with logging
    ./"$app_name" 2>&1 | tee -a "$log_file"
}

# Debug script execution
debug_script() {
    local script="$1"
    local debug_log="${script}.debug.log"

    echo "=== Debug session for $script ===" | tee "$debug_log"
    echo "Start time: $(date)" | tee -a "$debug_log"

    # Execute with debugging
    bash -x "$script" 2>&1 | tee -a "$debug_log"

    echo "End time: $(date)" | tee -a "$debug_log"
}

# System monitoring with logging
system_monitor() {
    local monitor_log="system_monitor_$(date +%Y%m%d).log"

    while true; do
        {
            echo "=== $(date) ==="
            echo "Load average: $(uptime | awk -F'load average:' '{print $2}')"
            echo "Memory usage: $(free -h | grep '^Mem:' | awk '{print $3 "/" $2}')"
            echo "Disk usage: $(df -h / | tail -1 | awk '{print $5}')"
            echo
        } | tee -a "$monitor_log"
        sleep 60
    done
}
```

### Data Processing Pipelines
```bash
#!/bin/bash
# Multi-stage data processing
process_sales_data() {
    local input_file="$1"
    local output_file="$2"

    echo "Processing sales data from $input_file"

    # Read, validate, transform, and save
    cat "$input_file" | \
        tee raw_data.txt | \
        awk 'NF>0' | \
        tee validated_data.txt | \
        awk -F',' '{print $1","$2","($3*$4)}' | \
        tee transformed_data.txt > "$output_file"

    echo "Processing completed. Final output: $output_file"
}

# Chain multiple processing steps
process_images() {
    local input_dir="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    # Process images with intermediate saves
    find "$input_dir" -name "*.jpg" | \
        tee file_list.txt | \
        while read -r file; do
            base_name=$(basename "$file" .jpg)

            convert "$file" -resize 800x600 "${output_dir}/${base_name}_medium.jpg" | \
                tee -a processing.log

            convert "$file" -resize 400x300 "${output_dir}/${base_name}_small.jpg" | \
                tee -a processing.log
        done
}

# Complex data transformation
transform_database_export() {
    local sql_output="$1"

    # SQL to CSV to JSON to processed data
    cat "$sql_output" | \
        tee raw_export.txt | \
        awk 'NR>1 {print $1","$2","$3}' | \
        tee data.csv | \
        jq -R -s 'split("\n") | map(split(",")) | map({"id": .[0], "name": .[1], "value": .[2]})' | \
        tee data.json | \
        jq '.[] | select(.value | tonumber > 100)' > filtered_data.json
}
```

### Backup and Archival
```bash
#!/bin/bash
# Create backups while processing
backup_during_processing() {
    local source="$1"
    local destination="$2"
    local backup_dir="$3"

    mkdir -p "$backup_dir"
    local timestamp=$(date +%Y%m%d_%H%M%S)

    echo "Creating backup while processing..."

    # Copy with backup
    cp "$source" "$backup_dir/${source}_backup_${timestamp}" | \
        tee -a backup.log

    # Process and log
    cat "$source" | \
        tee "$backup_dir/${source}_pre_process_${timestamp}" | \
        process_data > "$destination" 2>&1 | \
        tee -a processing.log

    echo "Backup and processing completed"
}

# Incremental backup system
incremental_backup() {
    local source_dir="$1"
    local backup_dir="$2"

    local backup_date=$(date +%Y%m%d)
    local manifest_file="$backup_dir/manifest_$backup_date.txt"

    echo "Starting incremental backup for $(date)" | tee "$manifest_file"

    find "$source_dir" -type f -newer "$backup_dir/last_backup" | \
        while read -r file; do
            dest_path="$backup_dir/$(echo "$file" | sed "s|$source_dir/||")"
            dest_dir=$(dirname "$dest_path")

            mkdir -p "$dest_dir"
            cp "$file" "$dest_path" 2>&1 | tee -a "$manifest_file"
            echo "Backed up: $file" | tee -a "$manifest_file"
        done

    touch "$backup_dir/last_backup"
    echo "Backup completed" | tee -a "$manifest_file"
}
```

### Development and Testing
```bash
#!/bin/bash
# Test script with output capture
run_tests_with_logging() {
    local test_suite="$1"
    local results_dir="$2"

    mkdir -p "$results_dir"
    local test_log="$results_dir/test_$(date +%Y%m%d_%H%M%S).log"

    echo "Running test suite: $test_suite" | tee "$test_log"
    echo "Started at: $(date)" | tee -a "$test_log"

    # Run tests with captured output
    ./"$test_suite" 2>&1 | tee -a "$test_log"

    local exit_code=$?
    echo "Test completed with exit code: $exit_code" | tee -a "$test_log"

    # Generate summary
    {
        echo "=== Test Summary ==="
        echo "Tests run: $(grep -c "PASS\|FAIL" "$test_log")"
        echo "Passed: $(grep -c "PASS" "$test_log")"
        echo "Failed: $(grep -c "FAIL" "$test_log")"
        echo "Duration: $(date -d "$(head -1 "$test_log" | grep -o '[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}')" +%s) seconds"
    } | tee -a "$test_log"
}

# Code review with logging
code_review() {
    local source_file="$1"
    local review_log="review_$(basename "$source_file").log"

    echo "Code review for $source_file" | tee "$review_log"
    echo "Reviewer: $(whoami)" | tee -a "$review_log"
    echo "Date: $(date)" | tee -a "$review_log"
    echo | tee -a "$review_log"

    # Run various analysis tools
    {
        echo "=== Complexity Analysis ==="
        complexity_analyzer "$source_file"
        echo
        echo "=== Security Check ==="
        security_scanner "$source_file"
        echo
        echo "=== Style Check ==="
        style_checker "$source_file"
    } | tee -a "$review_log"
}
```

### System Administration
```bash
#!/bin/bash
# System configuration management
apply_config_changes() {
    local config_file="$1"
    local backup_dir="/etc/config_backups"

    mkdir -p "$backup_dir"
    local timestamp=$(date +%Y%m%d_%H%M%S)

    echo "Applying configuration changes..."

    # Backup original configuration
    cp "$config_file" "$backup_dir/$(basename "$config_file")_$timestamp" | \
        tee -a "$backup_dir/backup.log"

    # Apply changes with logging
    {
        echo "Configuration changes applied at $(date)"
        echo "Changes:"
        diff "$backup_dir/$(basename "$config_file")_$timestamp" "$config_file"
    } | tee -a "$backup_dir/changes.log"

    # Restart service if needed
    if needs_restart "$config_file"; then
        echo "Restarting service..." | tee -a "$backup_dir/changes.log"
        systemctl restart "$(service_name "$config_file")" 2>&1 | \
            tee -a "$backup_dir/restart.log"
    fi
}

# Performance monitoring
monitor_performance() {
    local duration="$1"
    local output_dir="performance_$(date +%Y%m%d)"

    mkdir -p "$output_dir"

    echo "Starting performance monitoring for $duration seconds" | \
        tee "$output_dir/performance.log"

    {
        for ((i=1; i<=duration; i++)); do
            echo "$(date): CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
            echo "$(date): Memory: $(free -h | grep '^Mem:' | awk '{print $3 "/" $2}')"
            echo "$(date): Load: $(uptime | awk -F'load average:' '{print $2}')"
            echo
            sleep 60
        done
    } | tee -a "$output_dir/performance.log"
}
```

### Network Operations
```bash
#!/bin/bash
# Network traffic monitoring
monitor_network() {
    local interface="$1"
    local duration="$2"

    local capture_file="network_capture_$(date +%Y%m%d_%H%M%S).pcap"
    local analysis_file="network_analysis_$(date +%Y%m%d_%H%M%S).txt"

    echo "Monitoring network interface $interface for $duration seconds"

    # Capture traffic and analyze simultaneously
    tcpdump -i "$interface" -w "$capture_file" & 2>/dev/null
    local tcpdump_pid=$!

    {
        echo "=== Network Monitoring Started ==="
        echo "Interface: $interface"
        echo "Duration: $duration seconds"
        echo "Capture file: $capture_file"
        echo

        while kill -0 $tcpdump_pid 2>/dev/null; do
            echo "$(date): Interface statistics"
            cat "/proc/net/dev" | grep "$interface"
            sleep 10
        done

        echo "=== Monitoring Complete ==="
    } | tee "$analysis_file"

    # Analyze captured traffic
    tcpdump -r "$capture_file" -nn | \
        head -100 | \
        tee -a "$analysis_file"
}

# Port scanning with logging
scan_network() {
    local network="$1"
    local port_range="$2"

    local scan_log="port_scan_$(date +%Y%m%d_%H%M%S).log"
    local results_file="scan_results_$(date +%Y%m%d_%H%M%S).txt"

    echo "Scanning network $network, ports $port_range" | tee "$scan_log"
    echo "Started at: $(date)" | tee -a "$scan_log"

    # Perform scan and capture results
    nmap -p "$port_range" "$network" 2>&1 | \
        tee -a "$scan_log" | \
        grep -E "open|closed|filtered" | \
        tee "$results_file"

    echo "Scan completed at: $(date)" | tee -a "$scan_log"
}
```

## Advanced Usage

### Error Handling and Robustness
```bash
#!/bin/bash
# Robust tee with error handling
robust_tee() {
    local files=("$@")
    local temp_files=()

    # Create temporary files for each output
    for file in "${files[@]}"; do
        local temp_file=$(mktemp)
        temp_files+=("$temp_file")
    done

    # Process data through all temp files
    cat | tee "${temp_files[@]}" >/dev/null

    # Atomically move temp files to final destinations
    local all_success=true
    for ((i=0; i<${#files[@]}; i++)); do
        if ! mv "${temp_files[$i]}" "${files[$i]}"; then
            echo "Error: Failed to write to ${files[$i]}" >&2
            all_success=false
        fi
    done

    if [ "$all_success" = true ]; then
        cat "${temp_files[0]}"
    else
        # Clean up on failure
        for temp_file in "${temp_files[@]}"; do
            rm -f "$temp_file"
        done
        return 1
    fi
}

# Compressed logging
compress_on_fly() {
    local output_file="$1"

    # Compress while still allowing real-time viewing
    cat | \
        tee >(gzip > "${output_file}.gz") | \
        tee >(bzip2 > "${output_file}.bz2") | \
        tee "$output_file"
}
```

## Best Practices

### Performance Considerations
```bash
# Use appropriate buffer sizes for large files
dd if=large_file.bin bs=1M | tee backup.bin | process_data

# Avoid blocking on slow outputs
fast_command | tee >(slow_processor) >(another_slow_process) > final_output

# Use output buffering for better performance
stdbuf -o0 fast_command | tee -a large_log.txt
```

### Resource Management
```bash
# Clean up temporary files
cleanup_tee() {
    local output="$1"
    local temp_file=$(mktemp)

    trap "rm -f '$temp_file'" EXIT

    cat | tee "$temp_file" > "$output"
}

# Handle disk space issues
tee_with_space_check() {
    local file="$1"
    local min_space_mb="$2"

    local available_space=$(df -m --output=avail "$(dirname "$file")" | tail -1)

    if [ "$available_space" -lt "$min_space_mb" ]; then
        echo "Error: Insufficient disk space" >&2
        return 1
    fi

    cat | tee "$file"
}
```

## Related Commands

- `>` - Redirect output to file (overwrites)
- `>>` - Append output to file
- `split` - Split files into pieces
- `cat` - Concatenate files
- `stdbuf` - Modify buffering of standard streams
- `mkfifo` - Create named pipes

## Portability Notes

- `tee` is specified by POSIX and available on all Unix-like systems
- Most options are consistent across implementations
- Some systems may have different default buffer sizes
- Always available as external command

## Performance Tips

- Use `stdbuf` to control buffering behavior
- Consider using named pipes for complex workflows
- Monitor disk space when writing large files with tee
- Use appropriate block sizes for optimal performance

## Safety Considerations

```bash
# Avoid disk space exhaustion
tee_with_monitor() {
    local file="$1"
    local max_size="$2"

    cat | while IFS= read -r line; do
        echo "$line"
        echo "$line" >> "$file"

        if [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file") -gt "$max_size" ]; then
            echo "Maximum file size reached" >&2
            break
        fi
    done
}
```