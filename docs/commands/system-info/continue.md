---
title: continue - Resume loop execution
sidebar_label: continue
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# continue - Resume loop execution

The `continue` command is a shell built-in that skips the remaining commands in the current iteration of a for, while, until, or select loop, and proceeds to the next iteration. When used inside nested loops, it can optionally specify how many loop levels to skip. The continue statement is essential for controlling loop flow, allowing you to bypass certain iterations based on conditions without breaking out of the entire loop. It provides fine-grained control over loop execution patterns, making scripts more efficient and readable.

## Basic Syntax

```bash
continue [n]
```

Where `n` is an optional integer specifying the number of enclosing loop levels to continue from (default is 1).

## Supported Loop Types

The `continue` command works with the following loop constructs:

- `for` loops - Iterates over a list of items
- `while` loops - Executes while a condition is true
- `until` loops - Executes until a condition becomes true
- `select` loops - Creates menu-driven selections (bash-specific)

## Usage Examples

### Basic Loop Control

#### Continue in for Loops
```bash
# Skip even numbers in a for loop
for i in {1..10}; do
    if (( i % 2 == 0 )); then
        continue  # Skip even numbers
    fi
    echo "Odd number: $i"
done

# Process files but skip directories
for item in *; do
    if [[ -d "$item" ]]; then
        continue  # Skip directories
    fi
    echo "Processing file: $item"
done

# Skip specific values
for fruit in apple banana cherry date; do
    if [[ "$fruit" == "banana" ]]; then
        continue  # Skip banana
    fi
    echo "I like $fruit"
done
```

#### Continue in while Loops
```bash
# Skip invalid input
count=0
while (( count < 5 )); do
    read -p "Enter a positive number: " num

    if [[ ! "$num" =~ ^[0-9]+$ ]] || (( num <= 0 )); then
        echo "Invalid input. Please enter a positive number."
        continue  # Skip to next iteration
    fi

    echo "You entered: $num"
    ((count++))
done

# Process lines, skip empty ones
while IFS= read -r line; do
    if [[ -z "$line" ]]; then
        continue  # Skip empty lines
    fi

    if [[ "$line" =~ ^# ]]; then
        continue  # Skip comment lines
    fi

    echo "Processing: $line"
done < input.txt

# Skip weekend days in date processing
current_date=$(date +%s)
end_date=$((current_date + 86400 * 30))  # 30 days from now

while (( current_date < end_date )); do
    day_of_week=$(date -d "@$current_date" +%u)

    if (( day_of_week >= 6 )); then  # Saturday (6) or Sunday (7)
        current_date=$((current_date + 86400))
        continue  # Skip weekends
    fi

    echo "Processing date: $(date -d "@$current_date" +%Y-%m-%d)"
    current_date=$((current_date + 86400))
done
```

#### Continue in until Loops
```bash
# Skip failed attempts
attempts=0
until (( attempts >= 10 )); do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://example.com)

    if [[ "$response" != "200" ]]; then
        echo "Attempt $((attempts + 1)) failed (HTTP $response)"
        ((attempts++))
        sleep 2
        continue  # Try again
    fi

    echo "Success! HTTP $response"
    break
done

# Skip invalid configurations
until grep -q "production=true" config.ini; do
    echo "Configuration not ready for production"

    if grep -q "maintenance_mode=true" config.ini; then
        echo "System in maintenance mode, skipping check"
        sleep 60
        continue
    fi

    # Update configuration
    update_config
    sleep 5
done
```

#### Continue in select Loops (Bash)
```bash
# Menu with skip options
PS3="Choose an option (or 'skip' to continue): "
options=("Option 1" "Option 2" "Option 3" "Quit")

select opt in "${options[@]}"; do
    case $opt in
        "Option 1")
            echo "You chose Option 1"
            ;;
        "Option 2")
            echo "You chose Option 2"
            ;;
        "Option 3")
            echo "You chose Option 3"
            ;;
        "Quit")
            break
            ;;
        *)
            echo "Invalid choice, continuing..."
            continue  # Skip invalid input
            ;;
    esac

    echo "Operation completed."
    break  # Exit after valid choice
done
```

### Advanced Loop Control

#### Nested Loops with Level Specification
```bash
# Continue from outer loop
for i in {1..3}; do
    echo "Outer loop: $i"

    for j in {1..3}; do
        echo "  Inner loop: $j"

        if [[ $i -eq 2 && $j -eq 2 ]]; then
            echo "    Skipping to next outer iteration"
            continue 2  # Skip 2 loop levels (outer loop)
        fi

        echo "    Processing: $i,$j"
    done
done

# Triple nested loops
for x in A B C; do
    echo "Level 1: $x"

    for y in {1..3}; do
        echo "  Level 2: $y"

        for z in X Y Z; do
            if [[ "$x" == "B" && "$y" -eq 2 ]]; then
                echo "    Skipping to level 1"
                continue 3  # Skip all 3 levels
            fi

            echo "    Level 3: $z"
        done
    done
done

# File processing with directory traversal
find . -type d | while read -r dir; do
    echo "Processing directory: $dir"

    for file in "$dir"/*; do
        if [[ -d "$file" ]]; then
            continue  # Skip subdirectories in inner loop
        fi

        if [[ "${file##*.}" == "tmp" ]]; then
            echo "  Skipping temp file: $(basename "$file")"
            continue  # Skip temp files
        fi

        echo "  Processing file: $(basename "$file")"

        # If file is too large, skip to next directory
        if [[ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file") -gt 10485760 ]]; then
            echo "    File too large, skipping to next directory"
            continue 2  # Skip to outer loop (next directory)
        fi

        # Process file content
        process_file "$file"
    done
done
```

### File Processing Examples

#### Skip Files Based on Criteria
```bash
# Process files, skip based on conditions
for file in *.log; do
    # Skip if file doesn't exist (glob might not match)
    if [[ ! -f "$file" ]]; then
        continue
    fi

    # Skip empty files
    if [[ ! -s "$file" ]]; then
        echo "Skipping empty file: $file"
        continue
    fi

    # Skip files older than 30 days
    if [[ $(find "$file" -mtime +30 -print) ]]; then
        echo "Skipping old file: $file"
        continue
    fi

    echo "Processing: $file"
    # Process the log file
done

# Skip files with specific patterns
for filename in *; do
    # Skip directories
    if [[ -d "$filename" ]]; then
        continue
    fi

    # Skip hidden files
    if [[ "$filename" == .* ]]; then
        continue
    fi

    # Skip backup files
    if [[ "$filename" == *.bak || "$filename" == *~ ]]; then
        continue
    fi

    # Skip system files
    if [[ "$filename" =~ ^(Thumbs\.db|\.DS_Store|desktop\.ini)$ ]]; then
        continue
    fi

    echo "Found file: $filename"
done
```

#### Process Text Files with Conditions
```bash
# Read config file, skip comments and empty lines
while IFS= read -r line; do
    # Skip empty lines
    if [[ -z "$line" ]]; then
        continue
    fi

    # Skip lines with only whitespace
    if [[ "$line" =~ ^[[:space:]]*$ ]]; then
        continue
    fi

    # Skip comment lines
    if [[ "$line" =~ ^[[:space:]]*# ]]; then
        continue
    fi

    # Skip lines that don't contain key=value pairs
    if [[ ! "$line" =~ ^[^=]+=.+$ ]]; then
        echo "Warning: Invalid line format: $line"
        continue
    fi

    # Process valid configuration line
    key="${line%%=*}"
    value="${line#*=}"
    echo "Setting: $key = $value"
done < config.txt

# Parse CSV, skip header and invalid rows
row_num=0
while IFS=, read -r name age city; do
    ((row_num++))

    # Skip header row
    if (( row_num == 1 )); then
        continue
    fi

    # Skip rows with missing data
    if [[ -z "$name" || -z "$age" || -z "$city" ]]; then
        echo "Skipping incomplete row $row_num"
        continue
    fi

    # Skip invalid age
    if ! [[ "$age" =~ ^[0-9]+$ ]] || (( age < 0 || age > 150 )); then
        echo "Skipping invalid age in row $row_num"
        continue
    fi

    echo "Processing: $name, $age years old, from $city"
done < data.csv
```

### System Administration Examples

#### Service Management
```bash
# Check service status, skip running ones
services=("nginx" "apache2" "mysql" "postgresql" "redis")

for service in "${services[@]}"; do
    # Skip if service doesn't exist
    if ! systemctl list-unit-files | grep -q "^${service}\.service"; then
        echo "Service $service not installed, skipping"
        continue
    fi

    # Check if service is running
    if systemctl is-active --quiet "$service"; then
        echo "Service $service is already running"
        continue
    fi

    echo "Starting service: $service"
    systemctl start "$service"

    # Verify service started successfully
    if systemctl is-active --quiet "$service"; then
        echo "✓ Service $service started successfully"
    else
        echo "✗ Failed to start service $service"
        continue  # Skip further processing for this service
    fi

    # Enable service for auto-start
    systemctl enable "$service"
    echo "✓ Service $service enabled for auto-start"
done

# Monitor system resources, skip healthy processes
while true; do
    # Get list of processes consuming high CPU
    high_cpu_procs=$(ps aux --sort=-%cpu | awk 'NR>1 && $3>80 {print $11}')

    if [[ -z "$high_cpu_procs" ]]; then
        echo "$(date): No high CPU processes detected"
        sleep 30
        continue
    fi

    echo "$(date): High CPU processes detected: $high_cpu_procs"

    # Process each high CPU process
    echo "$high_cpu_procs" | while read -r proc; do
        # Skip if it's a known system process
        if [[ "$proc" =~ ^(systemd|kthreadd|ksoftirqd) ]]; then
            echo "Skipping system process: $proc"
            continue
        fi

        # Skip if already being handled
        if pgrep -f "monitor_$proc" > /dev/null; then
            echo "Process $proc already being monitored"
            continue
        fi

        echo "Starting monitoring for: $proc"
        monitor_process "$proc" &
    done

    sleep 60
done
```

#### Log Analysis
```bash
# Analyze web server logs, skip certain entries
while IFS= read -r log_line; do
    # Skip empty lines
    if [[ -z "$log_line" ]]; then
        continue
    fi

    # Skip health check requests
    if [[ "$log_line" =~ /health|/ping|/status ]]; then
        continue
    fi

    # Skip static file requests
    if [[ "$log_line" =~ \.(css|js|png|jpg|gif|ico)\  ]]; then
        continue
    fi

    # Extract HTTP status code
    status_code=$(echo "$log_line" | awk '{print $9}')

    # Skip successful requests
    if [[ "$status_code" =~ ^[23] ]]; then
        continue
    fi

    # Process error or redirect
    echo "Error detected - Status: $status_code"
    echo "Log entry: $log_line"

    # Additional processing for error handling
    handle_error "$log_line"
done < /var/log/nginx/access.log

# Clean old log files, skip locked ones
for log_file in /var/log/app/*.log.*; do
    # Skip if file doesn't exist
    if [[ ! -f "$log_file" ]]; then
        continue
    fi

    # Skip if file is currently being written to
    if lsof "$log_file" > /dev/null 2>&1; then
        echo "File $log_file is in use, skipping"
        continue
    fi

    # Check file age
    file_age=$(( $(date +%s) - $(stat -c %Y "$log_file") ))

    # Skip if file is newer than 7 days
    if (( file_age < 604800 )); then
        continue
    fi

    echo "Archiving old log file: $log_file"
    gzip "$log_file"
    mv "$log_file.gz" /var/log/app/archive/
done
```

### Data Processing Examples

#### Array Processing
```bash
# Process array, skip specific values
data=(10 20 30 40 50 0 -10 20 30)
skip_values=(0 -10)

for value in "${data[@]}"; do
    # Skip values in skip list
    for skip in "${skip_values[@]}"; do
        if (( value == skip )); then
            echo "Skipping value: $value"
            continue 2  # Skip to next array element
        fi
    done

    # Skip duplicate processing
    if [[ "$value" == "$last_value" ]]; then
        echo "Skipping duplicate value: $value"
        continue
    fi

    echo "Processing value: $value"
    last_value="$value"

    # Process the value
    result=$(( value * 2 ))
    echo "  Result: $result"
done

# Process coordinate pairs, skip invalid ones
coordinates=("1,2" "3,4" "invalid" "5,x" "6,7")

for coord in "${coordinates[@]}"; do
    # Skip invalid coordinate format
    if [[ ! "$coord" =~ ^[0-9]+,[0-9]+$ ]]; then
        echo "Skipping invalid coordinate: $coord"
        continue
    fi

    # Extract coordinates
    x="${coord%%,*}"
    y="${coord##*,}"

    # Skip coordinates outside bounds
    if (( x < 0 || x > 100 || y < 0 || y > 100 )); then
        echo "Skipping out-of-bounds coordinate: ($x, $y)"
        continue
    fi

    # Skip origin
    if (( x == 0 && y == 0 )); then
        echo "Skipping origin: ($x, $y)"
        continue
    fi

    echo "Processing coordinate: ($x, $y)"
    distance=$(( (x*x + y*y) ** 0.5 ))
    echo "  Distance from origin: $distance"
done
```

#### Network Operations
```bash
# Test network connectivity, skip local addresses
hosts=("google.com" "github.com" "localhost" "127.0.0.1" "example.com" "192.168.1.1")

for host in "${hosts[@]}"; do
    # Skip localhost addresses
    if [[ "$host" =~ ^(localhost|127\.0\.0\.1)$ ]]; then
        echo "Skipping localhost address: $host"
        continue
    fi

    # Skip private IP ranges
    if [[ "$host" =~ ^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.) ]]; then
        echo "Skipping private IP: $host"
        continue
    fi

    echo "Testing connectivity to: $host"

    # Skip if host doesn't resolve
    if ! nslookup "$host" > /dev/null 2>&1; then
        echo "Cannot resolve host: $host"
        continue
    fi

    # Test ping
    if ping -c 1 -W 3 "$host" > /dev/null 2>&1; then
        echo "✓ $host is reachable"
    else
        echo "✗ $host is not reachable"
        continue  # Skip further tests for unreachable host
    fi

    # Test HTTP if ping successful
    if curl -s --max-time 5 "http://$host" > /dev/null; then
        echo "✓ HTTP service is responding on $host"
    else
        echo "✗ HTTP service not responding on $host"
    fi
done

# Port scanning with skip conditions
target_host="example.com"
ports=(20 21 22 23 25 53 80 110 143 443 993 995)

for port in "${ports[@]}"; do
    # Skip well-known vulnerable ports in production
    if [[ "$ENVIRONMENT" == "production" ]]; then
        case $port in
            23|135|139|445)
                echo "Skipping vulnerable port $port in production"
                continue
                ;;
        esac
    fi

    # Skip if port was already scanned recently
    if [[ -f "/tmp/port_scan_${target_host}_${port}" ]]; then
        scan_time=$(stat -c %Y "/tmp/port_scan_${target_host}_${port}")
        current_time=$(date +%s)

        if (( current_time - scan_time < 3600 )); then  # Within last hour
            echo "Port $port recently scanned, skipping"
            continue
        fi
    fi

    echo "Scanning port $port on $target_host"

    # Test port connectivity
    if timeout 3 bash -c "</dev/tcp/$target_host/$port" 2>/dev/null; then
        echo "✓ Port $port is open"
        echo "$(date): $target_host:$port is OPEN" >> port_scan.log
    else
        echo "✗ Port $port is closed or filtered"
    fi

    # Record scan time
    touch "/tmp/port_scan_${target_host}_${port}"
done
```

### Script Integration Examples

#### User Input Validation
```bash
# Interactive menu with input validation
while true; do
    echo "Menu:"
    echo "1) Process files"
    echo "2) Backup data"
    echo "3) Clean up"
    echo "4) Exit"

    read -p "Choose an option [1-4]: " choice

    # Skip if input is empty
    if [[ -z "$choice" ]]; then
        echo "Please enter a choice"
        continue
    fi

    # Skip non-numeric input
    if ! [[ "$choice" =~ ^[0-9]+$ ]]; then
        echo "Please enter a number"
        continue
    fi

    # Skip invalid choices
    if (( choice < 1 || choice > 4 )); then
        echo "Invalid choice. Please enter 1-4"
        continue
    fi

    case $choice in
        1)
            echo "Processing files..."
            process_files
            ;;
        2)
            echo "Starting backup..."
            backup_data
            ;;
        3)
            echo "Cleaning up..."
            cleanup
            ;;
        4)
            echo "Exiting..."
            break
            ;;
    esac
done

# Batch processing with skip options
files_to_process=(*.txt)
processed_count=0
skipped_count=0

for file in "${files_to_process[@]}"; do
    # Skip if not a file
    if [[ ! -f "$file" ]]; then
        ((skipped_count++))
        continue
    fi

    # Skip if already processed (check for .done file)
    if [[ -f "${file}.done" ]]; then
        echo "Already processed: $file"
        ((skipped_count++))
        continue
    fi

    # Skip if file is locked
    if [[ -f "${file}.lock" ]]; then
        echo "File locked: $file"
        ((skipped_count++))
        continue
    fi

    echo "Processing: $file"

    # Create lock file
    touch "${file}.lock"

    # Process file
    if process_file "$file"; then
        # Mark as done
        touch "${file}.done"
        ((processed_count++))
        echo "✓ Completed: $file"
    else
        echo "✗ Failed to process: $file"
    fi

    # Remove lock file
    rm -f "${file}.lock"
done

echo "Processing complete:"
echo "  Processed: $processed_count files"
echo "  Skipped: $skipped_count files"
```

#### Error Handling in Loops
```bash
# Database operations with error handling
records=$(sql "SELECT id FROM users WHERE status = 'pending'")

for record_id in $records; do
    echo "Processing record ID: $record_id"

    # Skip if record doesn't exist
    if ! sql "SELECT 1 FROM users WHERE id = $record_id" > /dev/null 2>&1; then
        echo "Record $record_id not found, skipping"
        continue
    fi

    # Skip if already processed
    if sql "SELECT 1 FROM users WHERE id = $record_id AND status = 'processed'" > /dev/null 2>&1; then
        echo "Record $record_id already processed, skipping"
        continue
    fi

    # Attempt to process record
    if sql "UPDATE users SET status = 'processing' WHERE id = $record_id"; then
        echo "Marked record $record_id as processing"
    else
        echo "Failed to update record $record_id, skipping"
        continue
    fi

    # Perform complex processing
    if process_user_record "$record_id"; then
        sql "UPDATE users SET status = 'processed' WHERE id = $record_id"
        echo "✓ Successfully processed record $record_id"
    else
        sql "UPDATE users SET status = 'error' WHERE id = $record_id"
        echo "✗ Failed to process record $record_id"
        continue  # Skip to next record
    fi

    # Send confirmation
    send_confirmation "$record_id"
done

# API requests with retry logic
api_endpoints=(
    "https://api.example.com/users"
    "https://api.example.com/products"
    "https://api.example.com/orders"
)

for endpoint in "${api_endpoints[@]}"; do
    max_retries=3
    retry_count=0

    while (( retry_count < max_retries )); do
        echo "Attempting to fetch: $endpoint (attempt $((retry_count + 1))/$max_retries)"

        response=$(curl -s -w "%{http_code}" -o /tmp/api_response.json "$endpoint")
        http_code="${response: -3}"

        # Skip to next endpoint if successful
        if [[ "$http_code" =~ ^2 ]]; then
            echo "✓ Successfully fetched: $endpoint"
            process_response "/tmp/api_response.json"
            break  # Exit retry loop, continue to next endpoint
        fi

        # Skip endpoint if it's a client error (4xx)
        if [[ "$http_code" =~ ^4 ]]; then
            echo "✗ Client error for $endpoint (HTTP $http_code), skipping"
            continue 2  # Skip to next endpoint
        fi

        # Retry for server errors (5xx)
        if [[ "$http_code" =~ ^5 ]]; then
            ((retry_count++))
            echo "Server error for $endpoint, retrying..."
            sleep 5
            continue  # Retry same endpoint
        fi

        # Unknown error, skip
        echo "✗ Unknown error for $endpoint (HTTP $http_code), skipping"
        continue 2  # Skip to next endpoint
    done

    # Check if we exhausted retries
    if (( retry_count >= max_retries )); then
        echo "✗ Max retries exceeded for $endpoint, skipping"
        continue  # Skip to next endpoint
    fi
done
```

## Advanced Usage

### Performance Optimization

#### Efficient Loop Control
```bash
# Use continue to avoid nested if statements
# Inefficient: deeply nested conditions
for file in *; do
    if [[ -f "$file" ]]; then
        if [[ "${file##*.}" == "txt" ]]; then
            if [[ -s "$file" ]]; then
                if [[ ! "$file" =~ ^temp ]]; then
                    echo "Processing: $file"
                    # Process file
                fi
            fi
        fi
    fi
done

# Efficient: using continue to exit early
for file in *; do
    # Skip non-files
    [[ ! -f "$file" ]] && continue

    # Skip non-text files
    [[ "${file##*.}" != "txt" ]] && continue

    # Skip empty files
    [[ ! -s "$file" ]] && continue

    # Skip temp files
    [[ "$file" =~ ^temp ]] && continue

    # Process the file
    echo "Processing: $file"
done

# Batch processing with continue for efficiency
large_files=(*.dat)
processed=0
batch_size=100

for i in "${!large_files[@]}"; do
    file="${large_files[i]}"

    # Skip if file doesn't exist
    [[ ! -f "$file" ]] && continue

    # Skip if file is too small
    file_size=$(stat -c%s "$file" 2>/dev/null || echo 0)
    (( file_size < 1024 )) && continue

    # Skip if already processed today
    if [[ -f "${file}.processed_today" ]]; then
        process_date=$(stat -c %Y "${file}.processed_today")
        today=$(date +%Y%m%d | sed 's/^0*//')
        file_date=$(date -d "@$process_date" +%Y%m%d | sed 's/^0*//')

        (( process_date == today )) && continue
    fi

    # Process file
    process_large_file "$file"
    touch "${file}.processed_today"

    ((processed++))

    # Take a break every batch_size files
    if (( processed % batch_size == 0 )); then
        echo "Processed $processed files, taking a break..."
        sleep 10
    fi
done
```

#### Memory-Efficient Processing
```bash
# Process large files line by line, skipping unwanted lines
process_large_log() {
    local file="$1"
    local line_count=0
    local processed_count=0

    while IFS= read -r line; do
        ((line_count++))

        # Skip empty lines early to save memory
        [[ -z "$line" ]] && continue

        # Skip comment lines
        [[ "$line" =~ ^[[:space:]]*# ]] && continue

        # Skip debug messages in production
        if [[ "$ENVIRONMENT" == "production" && "$line" =~ DEBUG ]]; then
            continue
        fi

        # Process the line
        ((processed_count++))
        process_log_line "$line"

        # Progress reporting every 1000 lines
        if (( line_count % 1000 == 0 )); then
            echo "Progress: $line_count lines read, $processed_count processed"
        fi

        # Prevent memory buildup
        if (( processed_count % 100 == 0 )); then
            # Clear any accumulated variables
            line=""
        fi
    done < "$file"

    echo "Complete: $line_count lines read, $processed_count processed"
}

# Process database results efficiently
query_results=$(sql "SELECT id, name, email FROM users WHERE active = 1")

while IFS='|' read -r user_id name email; do
    # Skip malformed records
    [[ -z "$user_id" || -z "$name" ]] && continue

    # Skip invalid email formats
    [[ ! "$email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]] && continue

    # Skip users already processed today
    if [[ -f "/tmp/processed_user_$user_id" ]]; then
        continue
    fi

    # Process user (this might be expensive)
    process_user "$user_id" "$name" "$email"

    # Mark as processed
    touch "/tmp/processed_user_$user_id"
done <<< "$query_results"
```

## Troubleshooting

### Common Issues

#### Continue Not Working as Expected
```bash
# Issue: continue not in loop context
function broken_function() {
    continue  # This will cause an error
}

# Solution: use return in functions
function good_function() {
    if [[ some_condition ]]; then
        return  # Exit function, not loop
    fi
}

# Issue: continue in pipeline subshell
cat file.txt | while read line; do
    if [[ "$line" == "skip" ]]; then
        continue  # This only affects the subshell
    fi
    echo "$line"
done

# Solution: use process substitution or redirect input
while read line; do
    if [[ "$line" == "skip" ]]; then
        continue  # This works correctly
    fi
    echo "$line"
done < file.txt

# Alternative solution
while IFS= read -r line; do
    if [[ "$line" == "skip" ]]; then
        continue
    fi
    echo "$line"
done <<< "$(cat file.txt)"
```

#### Level Specification Problems
```bash
# Issue: Continue level doesn't exist
for i in {1..3}; do
    if [[ some_condition ]]; then
        continue 5  # Error: only 1 level available
    fi
done

# Solution: Check loop nesting before using continue levels
for i in {1..3}; do
    for j in {1..3}; do
        for k in {1..3}; do
            if [[ some_condition ]]; then
                continue 3  # Safe: 3 levels available
            fi
        done
    done
done

# Better approach: use flags for complex logic
skip_outer=false
for i in {1..3}; do
    if [[ "$skip_outer" == true ]]; then
        skip_outer=false
        continue
    fi

    for j in {1..3}; do
        if [[ some_condition ]]; then
            skip_outer=true
            continue  # Exit inner loop
        fi
    done
done
```

#### Performance Issues
```bash
# Issue: Too many continue statements causing slow execution
for file in *; do
    if [[ ! -f "$file" ]]; then continue; fi
    if [[ "${file##*.}" != "log" ]]; then continue; fi
    if [[ -z "$file" ]]; then continue; fi
    if [[ "$file" =~ ^\. ]]; then continue; fi
    if [[ -L "$file" ]]; then continue; fi
    if [[ ! -r "$file" ]]; then continue; fi

    # Process file
done

# Solution: Combine conditions with logical operators
for file in *; do
    # Single test with all conditions
    if [[ ! -f "$file" || "${file##*.}" != "log" || -z "$file" || \
          "$file" =~ ^\. || -L "$file" || ! -r "$file" ]]; then
        continue
    fi

    # Process file
done

# Alternative: Filter first, then process
for file in *.log; do
    [[ -f "$file" && -r "$file" && ! -L "$file" ]] || continue
    # Process file
done
```

## Best Practices

1. **Use continue early** to avoid deep nesting and improve readability
2. **Combine conditions** instead of multiple sequential if statements
3. **Use meaningful variable names** when checking continue conditions
4. **Add comments** explaining why certain items are being skipped
5. **Test edge cases** to ensure continue behaves as expected
6. **Be careful with continue levels** in nested loops
7. **Use return instead of continue** inside functions called from loops
8. **Consider using continue for error handling** to skip problematic iterations
9. **Profile performance** when using continue in large loops
10. **Document continue logic** in complex scripts for maintainability

## Performance Tips

1. **Early exit**: Place continue statements at the beginning of loops
2. **Logical operators**: Use && and || for efficient condition checking
3. **Filter input**: Pre-filter data before entering loops when possible
4. **Minimize work**: Do expensive operations only after all checks pass
5. **Avoid complex continue levels**: Use flags or refactoring instead
6. **Cache conditions**: Store boolean results if checking same condition repeatedly
7. **Use pattern matching**: Leverage shell patterns and regex efficiently
8. **Consider set -e**: Use errexit for automatic error handling instead of manual continues

The `continue` command is a fundamental control flow tool in shell scripting that enables efficient loop management by allowing selective iteration skipping. Mastering continue usage leads to cleaner, more efficient, and more readable shell scripts, especially when processing large datasets or implementing complex business logic in loops.