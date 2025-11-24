---
title: xargs - Build and Execute Command Lines from Standard Input
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# xargs - Build and Execute Command Lines from Standard Input

The `xargs` command reads items from standard input, delimited by blanks or newlines, and executes a command with the items as arguments. It's a powerful tool for bridging the gap between commands that produce lists of items and commands that operate on those items.

## Basic Syntax

```bash
xargs [OPTIONS] [COMMAND [INITIAL-ARGS]]
```

## Common Options

### Input Options
- `-a FILE`, `--arg-file=FILE` - Read items from FILE instead of standard input
- `-d DELIM`, `--delimiter=DELIM` - Use DELIM instead of whitespace for item separation
- `-0`, `--null` - Use NUL (ASCII 000) as item separator
- `-t`, `--verbose` - Print command line on stderr before executing

### Argument Control
- `-n MAX-ARGS`, `--max-args=MAX-ARGS` - Use at most MAX-ARGS arguments per command line
- `-L MAX-LINES`, `--max-lines=MAX-LINES` - Use at most MAX-LINES non-blank input lines per command
- `-P MAX-PROCS`, `--max-procs=MAX-PROCS` - Run up to MAX-PROCS processes at once
- `-I REPLACE-STR`, `--replace=REPLACE-STR` - Replace REPLACE-STR in initial arguments with names read

### Execution Control
- `-p`, `--interactive` - Prompt before running each command
- `-r`, `--no-run-if-empty` - Do not run command if input is empty
- `--show-limits` - Show system's limits on command-line length
- `--help` - Display help information and exit
- `--version` - Show version information and exit

## Usage Examples

### Basic Usage
```bash
# Simple argument passing
echo "file1.txt file2.txt file3.txt" | xargs ls -la
echo "1 2 3 4 5" | xargs echo "Numbers:"

# Process multiple arguments
printf "file1\nfile2\nfile3\n" | xargs rm
printf "item1 item2 item3\n" | xargs echo "Processing:"

# Default behavior - splits on whitespace
echo "file with spaces.txt" | xargs echo "Files:"
# Output: Files: file with spaces.txt (treated as 4 separate arguments)
```

### Argument Control
```bash
# Limit arguments per command
seq 1 20 | xargs -n 5 echo "Group:"
# Groups numbers in sets of 5

# Limit lines per command
printf "line1\nline2\nline3\n" | xargs -L 2 echo "Lines:"
# Processes 2 lines at a time

# One argument per command
ls *.txt | xargs -n 1 echo "File:"

# Multiple commands per file
ls *.txt | xargs -I {} sh -c 'echo "Processing {}"; wc -l {}'
```

### File Processing with find
```bash
# Basic find + xargs
find . -name "*.log" | xargs rm

# Handle filenames with spaces and special characters
find . -name "*.txt" -print0 | xargs -0 ls -la

# Parallel processing
find . -name "*.jpg" | xargs -P 4 -I {} convert {} -resize 50% {}

# Complex file operations
find /var/log -name "*.log" -mtime +30 | xargs -r gzip

# Safe file operations with find
find . -type f -name "*.tmp" -print0 | xargs -0 -p rm
```

### Download and Network Operations
```bash
# Download multiple files
cat urls.txt | xargs wget -c

# Download with custom names
cat urls.txt | xargs -I {} wget -c {}

# Parallel downloads
cat urls.txt | xargs -P 5 -I {} wget -c {}

# Check multiple websites
cat websites.txt | xargs -I {} curl -s -o /dev/null -w "%{http_code} {}\\n"

# Mass DNS lookups
cat domains.txt | xargs -I {} nslookup {}
```

## Practical Examples

### File Management
```bash
#!/bin/bash
# Batch file operations
batch_rename() {
    local pattern="$1"
    local prefix="$2"

    find . -name "$pattern" | while read -r file; do
        new_name="${prefix}_$(basename "$file")"
        mv "$file" "$new_name"
    done
}

# Move files with xargs
move_files() {
    local source_pattern="$1"
    local target_dir="$2"

    mkdir -p "$target_dir"
    find . -name "$source_pattern" -print0 | xargs -0 -I {} mv {} "$target_dir"/
}

# Create directories from file list
create_dirs() {
    local dir_list="$1"

    cat "$dir_list" | xargs -I {} mkdir -p {}
}

# Process image files
process_images() {
    local source_dir="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    find "$source_dir" -name "*.jpg" | \
        xargs -I {} -P 4 \
        convert {} -resize 800x600 -quality 85 "$output_dir/{}"
}
```

### System Administration
```bash
#!/bin/bash
# Kill processes matching pattern
kill_processes() {
    local pattern="$1"

    ps aux | grep "$pattern" | grep -v grep | \
        awk '{print $2}' | xargs kill -9
}

# Stop multiple services
stop_services() {
    local service_list="$1"

    cat "$service_list" | xargs -I {} systemctl stop {}
}

# Check disk space on multiple servers
check_disk_space() {
    cat servers.txt | xargs -I {} ssh {} 'df -h'
}

# Update packages on multiple servers
update_servers() {
    cat servers.txt | xargs -I {} -P 10 ssh {} 'apt-get update && apt-get upgrade -y'
}

# Monitor logs across multiple servers
tail_logs() {
    cat servers.txt | xargs -I {} -P 5 ssh {} 'tail -f /var/log/syslog'
}
```

### Development and Build Operations
```bash
#!/bin/bash
# Compile multiple source files
compile_sources() {
    local source_dir="$1"

    find "$source_dir" -name "*.c" | xargs gcc -c
    find "$source_dir" -name "*.o" | xargs gcc -o program
}

# Run tests in parallel
run_tests() {
    find tests/ -name "test_*.py" | xargs -n 1 -I {} python {}

    # Parallel execution
    find tests/ -name "test_*.py" | xargs -P 4 -I {} python {}
}

# Code analysis
analyze_code() {
    find . -name "*.py" | xargs python -m pyflakes
    find . -name "*.js" | xargs jshint
}

# Install dependencies
install_requirements() {
    cat requirements.txt | xargs -I {} pip install {}
}
```

### Data Processing
```bash
#!/bin/bash
# Process CSV files in parallel
process_csv_files() {
    local input_dir="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    find "$input_dir" -name "*.csv" | \
        xargs -I {} -P 4 \
        python process_csv.py {} "$output_dir"
}

# Batch text processing
process_text_files() {
    local operation="$1"
    local pattern="$2"

    find . -name "$pattern" | \
        xargs -I {} \
        sh -c "$operation {} > {}.processed"
}

# Generate reports
generate_reports() {
    local data_source="$1"
    local report_template="$2"

    cat "$data_source" | \
        xargs -I {} \
        python generate_report.py {} "$report_template"
}
```

### Backup and Archival
```bash
#!/bin/bash
# Create compressed backups
backup_files() {
    local source_pattern="$1"
    local backup_name="$2"

    find . -name "$source_pattern" -print0 | \
        xargs -0 \
        tar -czf "${backup_name}_$(date +%Y%m%d).tar.gz"
}

# Backup to multiple locations
backup_to_locations() {
    local source="$1"
    shift
    local locations=("$@")

    echo "$source" | \
        xargs -I {} \
        sh -c 'for location in "$@"; do cp -r {} "$location"; done' \
        -- "${locations[@]}"
}

# Incremental backups
incremental_backup() {
    local source_dir="$1"
    local backup_dir="$2"

    find "$source_dir" -newer "$backup_dir/last_backup" -print0 | \
        xargs -0 -I {} \
        cp --parents {} "$backup_dir"/

    touch "$backup_dir/last_backup"
}
```

### Database Operations
```bash
#!/bin/bash
# Execute SQL on multiple databases
execute_sql() {
    local sql_file="$1"
    shift
    local databases=("$@")

    printf "%s\n" "${databases[@]}" | \
        xargs -I {} \
        mysql -u root -p "{}" < "$sql_file"
}

# Import multiple SQL files
import_sql_files() {
    local database="$1"
    local sql_dir="$2"

    find "$sql_dir" -name "*.sql" | \
        xargs -I {} \
        mysql -u root -p "$database" < {}
}

# Database maintenance tasks
maintenance_tasks() {
    local database="$1"

    printf "optimize table\ncheck table\nrepair table\n" | \
        xargs -I {} \
        mysql -u root -p "$database" -e "{} user_table"
}
```

### Network Operations
```bash
#!/bin/bash
# Check multiple ports on multiple hosts
check_ports() {
    local hosts_file="$1"
    local ports_file="$2"

    # Cross product of hosts and ports
    cat "$hosts_file" | \
        xargs -I {} \
        sh -c 'cat "'$ports_file'" | xargs -I {} nc -z -v {} {} 2>&1'
}

# Mass port scanning
scan_network() {
    local network="$1"
    local port_range="$2"

    nmap -p "$port_range" "$network" | \
        grep "open" | \
        awk '{print $1}' | \
        xargs -I {} echo "Open port: {}"
}

# Deploy to multiple servers
deploy_application() {
    local app_package="$1"
    local servers_list="$2"

    cat "$servers_list" | \
        xargs -I {} -P 10 \
        scp "$app_package" {}:/tmp/

    cat "$servers_list" | \
        xargs -I {} -P 10 \
        ssh {} "tar -xzf /tmp/$(basename "$app_package") -C /opt/"
}
```

### Advanced Usage

### Custom Delimiters
```bash
#!/bin/bash
# Process comma-separated values
echo "apple,banana,cherry" | xargs -d ',' -I {} echo "Fruit: {}"

# Process path lists
echo "/usr/bin:/usr/local/bin:/opt/bin" | xargs -d ':' -I {} ls -la {}

# Process multi-line input with custom delimiter
echo -e "file1.txt\nfile2.txt\nfile3.txt" | xargs -d '\n' -I {} cp {} /backup/
```

### Interactive Operations
```bash
#!/bin/bash
# Safe deletion with confirmation
find . -name "*.tmp" | xargs -p -I {} rm {}

# Interactive file processing
find . -name "*.log" | xargs -p -I {} sh -c 'echo "File: {}"; head -n 5 {}'

# Confirm each operation
cat operations.txt | xargs -p -I {} sh -c 'echo "Executing: {}"; {}'
```

### Complex Command Construction
```bash
#!/bin/bash
# Build complex commands dynamically
cat files.txt | xargs -I {} sh -c '
    echo "Processing {}"
    cp {} {}.backup
    sed "s/old/new/g" {} > {}.processed
    echo "Completed {}"
'

# Multiple operations per item
cat users.txt | xargs -I {} sh -c '
    useradd {}
    mkdir -p /home/{}/documents
    chown {}:{} /home/{}/documents
    echo "User {} created"
'

# Conditional operations
find . -name "*.conf" | xargs -I {} sh -c '
    if grep -q "debug_mode.*=.*true" {}; then
        echo "Debug enabled in {}"
        cp {} {}.debug
    fi
'
```

### Performance Optimization
```bash
#!/bin/bash
# Parallel processing with load control
find . -name "*.dat" | xargs -P $(nproc) -I {} process_file {}

# Batch processing to avoid argument limits
find /var/log -name "*.log" | xargs -n 100 gzip

# Efficient large file processing
find /data -type f -size +100M | xargs -I {} -P 4 process_large_file {}
```

## Best Practices

### Handling Special Characters
```bash
#!/bin/bash
# Always use -print0 with find for filenames with spaces
find . -name "*.txt" -print0 | xargs -0 rm

# Quote arguments properly
printf "file with spaces.txt\nanother file.txt\n" | xargs -I {} cp "{}" backup/

# Handle newlines in input
cat files_with_newlines.txt | xargs -d '\n' -I {} process "{}"
```

### Error Handling
```bash
#!/bin/bash
# Check if xargs found any arguments
find . -name "*.tmp" | xargs -r rm  # Won't run rm if no files found

# Use exit status checking
if ls *.txt 2>/dev/null | xargs wc -l; then
    echo "Word count completed successfully"
else
    echo "Error during word count"
fi

# Handle errors in pipelines
find . -name "*.log" | xargs -I {} sh -c '
    if [ -f "{}" ]; then
        gzip "{}"
    else
        echo "File not found: {}" >&2
    fi
'
```

### Resource Management
```bash
#!/bin/bash
# Limit parallel processes based on CPU cores
find . -name "*.jpg" | xargs -P $(nproc) convert {} {}.webp

# Monitor resource usage
find . -name "*.dat" | xargs -P 2 -I {} sh -c '
    echo "Starting: {}" >&2
    process "{}"
    echo "Completed: {}" >&2
'

# Use timeouts for long-running operations
timeout 300 find . -name "*.log" | xargs -I {} sh -c 'timeout 60 compress "{}"'
```

## Performance Tips

- Use `-P` for CPU-bound tasks to utilize multiple cores
- Use `-n` to avoid hitting argument length limits
- Use `-0` with `find -print0` for reliable filename handling
- Monitor memory usage with large file sets
- Consider `parallel` command for more complex parallelization

## Related Commands

- `find` - Search for files and directories
- `parallel` - Execute jobs in parallel
- `tee` - Read from standard input and write to files and output
- `sed` - Stream editor for filtering and transforming text
- `awk` - Pattern scanning and processing language
- `exec` - Execute commands with arguments

## Portability Notes

- `xargs` is specified by POSIX and widely available
- Some options vary between implementations (GNU vs BSD)
- `-0` option is widely supported but check compatibility
- Parallel processing support varies by system

## Safety Considerations

```bash
#!/bin/bash
# Always test before mass operations
find . -name "*.tmp" | head -5 | xargs -p rm

# Use dry runs to verify commands
find . -name "*.log" | xargs -t -n 1 echo "Would compress:"

# Validate input before processing
cat files.txt | xargs -I {} sh -c '
    if [ -f "{}" ]; then
        echo "Processing: {}"
    else
        echo "Skipping non-existent: {}" >&2
    fi
'

# Use quotes to handle special characters
printf "file with\nnewlines and spaces.txt\n" | xargs -I {} echo "File: '{}'"
```