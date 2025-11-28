---
title: dirname - Strip directory from filename
sidebar_label: dirname
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dirname - Strip directory from filename

The `dirname` command is a fundamental Unix/Linux utility that extracts the directory path component from a given file path. It removes the last component (typically the filename) from a path and returns the remaining directory portion. This command is essential for shell scripting, path manipulation, and file system operations where you need to separate directory paths from filenames. Dirname is part of the GNU Core Utilities package and follows POSIX standards, making it available on virtually all Unix-like systems.

## Basic Syntax

```bash
dirname [OPTION] NAME...
dirname --help
dirname --version
```

## Common Options

- `-z, --zero` - End each output line with NUL character instead of newline
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Path Operations

#### Simple Directory Extraction
```bash
# Extract directory from file path
dirname /home/user/documents/file.txt
# Output: /home/user/documents

# Extract directory from relative path
dirname ./scripts/deploy.sh
# Output: ./scripts

# Handle current directory
dirname filename.txt
# Output: .

# Extract from root-level file
dirname /etc/passwd
# Output: /etc
```

#### Multiple Path Processing
```bash
# Process multiple paths at once
dirname /var/log/syslog /home/user/data.txt ./config.json
# Output:
# /var/log
# /home/user
# .

# Using with find command
find /home/user -name "*.log" | head -3 | xargs dirname
# Output directories containing log files
```

#### Edge Cases and Special Paths
```bash
# Handle trailing slashes
dirname /path/to/directory/
# Output: /path/to

# Handle root directory
dirname /
# Output: /

# Handle single dot
dirname .
# Output: .

# Handle parent directory
dirname ..
# Output: .

# Handle empty string (returns dot)
dirname ""
# Output: .
```

## Practical Examples

### Shell Scripting

#### Script Path Manipulation
```bash
#!/bin/bash
# Get script directory path
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Script directory: $SCRIPT_DIR"

# Create relative paths
CONFIG_FILE="$SCRIPT_DIR/config.json"
LOG_FILE="$SCRIPT_DIR/logs/app.log"

echo "Config file: $CONFIG_FILE"
echo "Log file: $LOG_FILE"
```

#### File Processing Scripts
```bash
#!/bin/bash
# Batch file processing with directory extraction

while IFS= read -r file_path; do
    # Extract directory and filename
    dir_path=$(dirname "$file_path")
    file_name=$(basename "$file_path")

    # Create backup directory structure
    backup_dir="/backup$dir_path"
    mkdir -p "$backup_dir"

    # Copy file maintaining directory structure
    cp "$file_path" "$backup_dir/$file_name"
    echo "Backed up: $file_path -> $backup_dir/$file_name"
done < file_list.txt
```

#### Configuration Management
```bash
#!/bin/bash
# Configuration file locator

CONFIG_LOCATIONS=(
    "$HOME/.config/app/config.yaml"
    "/etc/app/config.yaml"
    "./config.yaml"
    "/usr/local/etc/app/config.yaml"
)

find_config() {
    for config_path in "${CONFIG_LOCATIONS[@]}"; do
        if [[ -f "$config_path" ]]; then
            echo "Found config: $config_path"
            echo "Config directory: $(dirname "$config_path")"
            return 0
        fi
    done
    echo "No configuration file found"
    return 1
}

find_config
```

### System Administration

#### Log File Management
```bash
#!/bin/bash
# Log rotation and archive management

LOG_DIRS=(
    "/var/log/apache2"
    "/var/log/nginx"
    "/var/log/mysql"
    "/home/user/logs"
)

archive_logs() {
    for log_dir in "${LOG_DIRS[@]}"; do
        if [[ -d "$log_dir" ]]; then
            echo "Processing logs in: $log_dir"

            # Find old log files
            find "$log_dir" -name "*.log" -mtime +30 | while read -r log_file; do
                archive_dir="/archives$(dirname "$log_file")"
                mkdir -p "$archive_dir"

                # Compress and move old logs
                gzip -c "$log_file" > "$archive_dir/$(basename "$log_file").gz"
                rm "$log_file"

                echo "Archived: $log_file -> $archive_dir"
            done
        fi
    done
}

archive_logs
```

#### Backup and Restore Operations
```bash
#!/bin/bash
# Incremental backup with directory structure preservation

SOURCE_DIR="/home/user/documents"
BACKUP_BASE="/backup/daily"

create_incremental_backup() {
    date_stamp=$(date +%Y%m%d_%H%M%S)
    backup_dir="$BACKUP_BASE/$date_stamp"

    # Find modified files within last 24 hours
    find "$SOURCE_DIR" -type f -mtime -1 | while read -r file; do
        # Get relative path from source
        rel_path="${file#$SOURCE_DIR/}"
        dir_path=$(dirname "$rel_path")

        # Create corresponding directory in backup
        mkdir -p "$backup_dir/$dir_path"

        # Copy file with timestamp
        cp "$file" "$backup_dir/$rel_path"
    done

    echo "Incremental backup created: $backup_dir"
}

create_incremental_backup
```

### Development Workflow

#### Build System Integration
```bash
#!/bin/bash
# Build script with proper path handling

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/build"
SOURCE_DIR="$PROJECT_ROOT/src"
OUTPUT_DIR="$PROJECT_ROOT/dist"

setup_build_environment() {
    echo "Project root: $PROJECT_ROOT"
    echo "Source directory: $SOURCE_DIR"
    echo "Build directory: $BUILD_DIR"

    # Clean and create build directory
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"

    # Create output directory
    mkdir -p "$OUTPUT_DIR"
}

compile_project() {
    # Find source files
    find "$SOURCE_DIR" -name "*.cpp" -o -name "*.c" | while read -r source_file; do
        # Get relative path
        rel_path="${source_file#$SOURCE_DIR/}"
        obj_dir="$BUILD_DIR/$(dirname "$rel_path")"

        # Create object file directory
        mkdir -p "$obj_dir"

        # Compile source file
        obj_file="$obj_dir/$(basename "$rel_path" .cpp).o"
        echo "Compiling: $source_file -> $obj_file"

        # Actual compilation command would go here
        # g++ -c "$source_file" -o "$obj_file"
    done
}

setup_build_environment
compile_project
```

#### Package Management Scripts
```bash
#!/bin/bash
# Package installation and path management

install_package() {
    package_file="$1"
    install_prefix="/usr/local"

    if [[ ! -f "$package_file" ]]; then
        echo "Error: Package file not found: $package_file"
        return 1
    fi

    # Extract package (assuming tar.gz format)
    temp_dir=$(mktemp -d)
    tar -xzf "$package_file" -C "$temp_dir"

    # Find package root directory
    package_root=$(find "$temp_dir" -maxdepth 1 -type d | head -2 | tail -1)

    # Install files maintaining structure
    find "$package_root" -type f | while read -r file; do
        rel_path="${file#$package_root/}"
        target_dir="$install_prefix/$(dirname "$rel_path")"
        target_path="$install_prefix/$rel_path"

        # Create target directory
        mkdir -p "$target_dir"

        # Copy file
        cp "$file" "$target_path"
        echo "Installed: $rel_path"
    done

    # Cleanup
    rm -rf "$temp_dir"
    echo "Package installation completed"
}

# Usage example: install_package myapp-1.0.tar.gz
```

## Advanced Usage

### Complex Path Manipulation

#### Nested Directory Operations
```bash
#!/bin/bash
# Multi-level directory extraction

extract_parent_directory() {
    local path="$1"
    local levels="${2:-1}"

    for ((i=0; i<levels; i++)); do
        path=$(dirname "$path")
    done

    echo "$path"
}

# Examples
extract_parent_directory "/home/user/documents/projects/app/src/main.py" 1
# Output: /home/user/documents/projects/app/src

extract_parent_directory "/home/user/documents/projects/app/src/main.py" 2
# Output: /home/user/documents/projects/app

extract_parent_directory "/home/user/documents/projects/app/src/main.py" 3
# Output: /home/user/documents/projects
```

#### Path Normalization
```bash
#!/bin/bash
# Path normalization and canonicalization

normalize_path() {
    local path="$1"

    # Remove trailing slash (unless it's root)
    [[ "$path" != "/" && "$path" =~ /$ ]] && path="${path%/}"

    # Convert relative to absolute
    [[ ! "$path" =~ ^/ ]] && path="$(pwd)/$path"

    # Extract directory for further processing
    dir_path=$(dirname "$path")
    file_name=$(basename "$path")

    echo "Normalized directory: $dir_path"
    echo "Filename: $file_name"
}

# Test various path formats
normalize_path "./scripts/../config/app.json"
normalize_path "/home/user//documents//"
normalize_path "relative/path/to/file.txt"
```

### Performance Optimization

#### Bulk Path Processing
```bash
#!/bin/bash
# High-performance batch path processing

process_paths_bulk() {
    local file_count=0
    local start_time=$(date +%s)

    # Read all paths at once for better performance
    mapfile -t paths < <(find / -type f -name "*.conf" 2>/dev/null | head -1000)

    # Process in batches
    batch_size=100
    for ((i=0; i<${#paths[@]}; i+=batch_size)); do
        batch_paths=("${paths[@]:i:batch_size}")

        for path in "${batch_paths[@]}"; do
            dir_path=$(dirname "$path")

            # Perform directory-specific operations
            if [[ -r "$dir_path" ]]; then
                ((file_count++))
            fi
        done

        # Progress indicator
        echo "Processed: $((i + batch_size)) files"
    done

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo "Total files processed: $file_count"
    echo "Total time: ${duration}s"
    echo "Files per second: $((file_count / duration))"
}

process_paths_bulk
```

#### Memory-Efficient Processing
```bash
#!/bin/bash
# Memory-efficient path processing for large file lists

process_large_file_list() {
    local input_file="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    # Process line by line to conserve memory
    while IFS= read -r file_path; do
        # Skip empty lines
        [[ -z "$file_path" ]] && continue

        # Extract directory path
        dir_path=$(dirname "$file_path")

        # Create corresponding output directory
        output_subdir="$output_dir${dir_path}"
        mkdir -p "$output_subdir"

        # Process file (example: create metadata file)
        metadata_file="$output_subdir/$(basename "$file_path").meta"
        echo "Original path: $file_path" > "$metadata_file"
        echo "Directory: $dir_path" >> "$metadata_file"
        echo "Processed: $(date)" >> "$metadata_file"

    done < "$input_file"

    echo "Processing completed. Results in: $output_dir"
}

# Usage: process_large_file_list file_list.txt ./output
```

## Integration and Automation

### Pipeline Integration

#### Combining with Other Commands
```bash
#!/bin/bash
# Complex pipeline with dirname

analyze_file_distribution() {
    local search_dir="$1"

    echo "File distribution analysis for: $search_dir"
    echo "=========================================="

    # Count files per directory
    find "$search_dir" -type f | \
        dirname | \
        sort | \
        uniq -c | \
        sort -nr | \
        head -10

    echo
    echo "Largest directories by file count:"

    # Find directories with most files
    find "$search_dir" -type f | \
        dirname | \
        sort | \
        uniq -c | \
        sort -nr | \
        awk '{printf "%4d files: %s\n", $1, $2}' | \
        head -5
}

# Usage example
analyze_file_distribution "/var/log"
```

#### Data Processing Pipeline
```bash
#!/bin/bash
# Multi-stage data processing pipeline

process_log_files() {
    local log_source="$1"
    local output_base="$2"

    # Stage 1: Extract unique log directories
    find "$log_source" -name "*.log" -type f | \
        dirname | \
        sort -u > "/tmp/log_dirs.txt"

    # Stage 2: Process each directory
    while IFS= read -r log_dir; do
        echo "Processing directory: $log_dir"

        # Create output directory structure
        output_dir="$output_base${log_dir#$log_source}"
        mkdir -p "$output_dir"

        # Stage 3: Analyze logs in this directory
        find "$log_dir" -name "*.log" -exec wc -l {} + | \
            awk '{sum += $1} END {print "Total lines:", sum}' > \
            "$output_dir/line_count.txt"

    done < "/tmp/log_dirs.txt"

    # Cleanup
    rm -f "/tmp/log_dirs.txt"
    echo "Log analysis completed. Results in: $output_base"
}

# Usage: process_log_files /var/log ./log_analysis
```

## Troubleshooting

### Common Issues

#### Path Handling Problems
```bash
#!/bin/bash
# Debugging and fixing common path issues

debug_path_processing() {
    local test_paths=(
        "/path/with//double/slashes/"
        "./relative/./path"
        "path/without/leading/slash"
        "/"
        "."
        ""
        "   "  # whitespace only
    )

    echo "Testing dirname with various path formats:"
    echo "=========================================="

    for path in "${test_paths[@]}"; do
        echo "Input: '$path'"

        # Handle empty or whitespace-only paths
        if [[ -z "${path// }" ]]; then
            echo "  Result: '.' (empty input)"
        else
            result=$(dirname "$path")
            echo "  Result: '$result'"
        fi

        # Show directory existence check
        dir_result=$(dirname "$path")
        if [[ -d "$dir_result" ]]; then
            echo "  Directory exists: YES"
        else
            echo "  Directory exists: NO"
        fi

        echo
    done
}

debug_path_processing
```

#### Performance Issues
```bash
#!/bin/bash
# Performance testing and optimization

benchmark_dirname() {
    local iterations=10000
    local test_path="/very/long/nested/path/to/some/deep/directory/structure/file.txt"

    echo "Benchmarking dirname performance"
    echo "================================="

    # Method 1: Direct dirname command
    start_time=$(date +%s.%N)
    for ((i=0; i<iterations; i++)); do
        result=$(dirname "$test_path")
    done
    end_time=$(date +%s.%N)
    dirname_time=$(echo "$end_time - $start_time" | bc -l)

    # Method 2: Parameter expansion (for simple cases)
    start_time=$(date +%s.%N)
    for ((i=0; i<iterations; i++)); do
        result="${test_path%/*}"
    done
    end_time=$(date +%s.%N)
    expansion_time=$(echo "$end_time - $start_time" | bc -l)

    echo "Direct dirname: ${dirname_time}s"
    echo "Parameter expansion: ${expansion_time}s"

    if (( $(echo "$dirname_time > $expansion_time" | bc -l) )); then
        echo "Parameter expansion is $(( $(echo "scale=2; $dirname_time / $expansion_time" | bc -l) ))x faster"
    else
        echo "dirname command is $(( $(echo "scale=2; $expansion_time / $dirname_time" | bc -l) ))x faster"
    fi
}

benchmark_dirname
```

## Related Commands

- [`basename`](/docs/commands/file-management/basename) - Extract filename from path
- [`realpath`](/docs/commands/file-management/realpath) - Get absolute path
- [`readlink`](/docs/commands/file-management/readlink) - Resolve symbolic links
- [`pwd`](/docs/commands/file-management/pwd) - Print working directory
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`pathchk`](/docs/commands/file-management/pathchk) - Check path validity

## Best Practices

1. **Always quote variables** when passing to dirname to handle paths with spaces
2. **Use command substitution** `$(dirname "$path")` instead of backticks for better readability
3. **Combine with `cd` and `pwd`** to get absolute directory paths
4. **Handle edge cases** like empty strings and root directory properly
5. **Use parameter expansion** for simple cases when performance is critical
6. **Validate input paths** before processing to avoid errors
7. **Use `dirname --zero`** when processing paths with newlines or special characters
8. **Consider using `realpath`** when you need canonical absolute paths

## Performance Tips

1. **Parameter expansion** (`${path%/*}`) is faster but less robust than dirname
2. **Avoid calling dirname multiple times** on the same path in a loop
3. **Use arrays** to store multiple paths when processing in bulk
4. **Cache results** when repeatedly processing the same paths
5. **Use `dirname --zero`** with `xargs -0` for processing paths with special characters
6. **Minimize subprocess calls** by combining multiple operations
7. **Consider `readlink -f`** when you need both directory resolution and symlink resolution

The `dirname` command is an essential tool for path manipulation in Unix/Linux environments. Its simplicity and reliability make it indispensable for shell scripting, system administration, and development workflows. Understanding its behavior with various path formats and combining it effectively with other commands enables powerful file system operations and automation solutions.