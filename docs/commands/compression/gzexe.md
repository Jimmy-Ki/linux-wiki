---
title: gzexe - Compress executable files in place
sidebar_label: gzexe
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gzexe - Compress executable files in place

The `gzexe` command is a specialized utility that compresses executable files in place, creating self-extracting compressed executables. When a compressed executable is run, it automatically decompresses itself in memory and executes normally. This tool is particularly useful for reducing disk space usage for large executable files while maintaining full functionality. gzexe uses the gzip compression algorithm and preserves all file permissions and attributes, making it ideal for optimizing storage on systems with limited disk space or for distributing compressed applications.

## Basic Syntax

```bash
gzexe [OPTIONS] FILE...
```

## Common Options

### Basic Options
- `-d, --decompress` - Decompress the specified files
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `-v, --verbose` - Verbose output mode

### Advanced Options
- `-k, --keep` - Keep (don't delete) original files during compression
- `-f, --force` - Force compression even if file is already compressed
- `-t, --test` - Test compressed file integrity

## Usage Examples

### Basic Compression Operations

#### Compressing Executable Files
```bash
# Compress a single executable
gzexe /usr/bin/large_app

# Compress multiple executables
gzexe /usr/bin/app1 /usr/bin/app2 /usr/bin/app3

# Compress executables in a directory
gzexe /opt/custom_tools/*

# Compress with verbose output
gzexe -v /usr/local/bin/mytool

# Force compression even if already compressed
gzexe -f /usr/bin/suspicious_exe
```

#### Decompressing Files
```bash
# Decompress a compressed executable
gzexe -d /usr/bin/large_app

# Decompress multiple files
gzexe -d /usr/bin/app1 /usr/bin/app2 /usr/bin/app3

# Decompress with verbose output
gzexe -dv /opt/custom_tools/*

# Keep original file during decompression
gzexe -kd /usr/bin/backup_tool
```

#### Testing Compressed Files
```bash
# Test integrity of compressed executable
gzexe -t /usr/bin/large_app

# Test multiple files
gzexe -t /opt/bin/*

# Verbose testing with detailed output
gzexe -tv /usr/local/bin/myapp
```

### System Administration

#### Disk Space Optimization
```bash
# Find large executables and compress them
find /usr/bin -size +1M -type f -executable -exec gzexe {} \;

# Compress applications in user directories
find /home/*/bin -type f -executable -size +500K -exec gzexe -v {} \;

# Optimize system utilities
gzexe /usr/local/bin/* /opt/tools/*

# Check disk space savings
du -sh /usr/bin/large_app*
```

#### Application Deployment
```bash
# Compress newly installed applications
gzexe /opt/newapp/bin/*

# Create compressed application package
cp /usr/bin/original_app /opt/deployment/
gzexe /opt/deployment/original_app

# Deploy compressed executables to remote systems
scp /opt/deployment/original_app user@remote:/usr/local/bin/

# Verify deployment
ssh user@remote "gzexe -t /usr/local/bin/original_app"
```

#### Backup and Archive Operations
```bash
# Compress executables before backup
gzexe -k /backup/archive/*.exe

# Create space before system backup
find /usr/local -name "*.bin" -size +2M -exec gzexe {} \;

# Compress development tools
gzexe /home/developer/tools/*

# Restore from compressed backups
gzexe -d /backup/archive/*.exe
```

### Development Workflow

#### Software Distribution
```bash
# Compress compiled binary for distribution
gzexe release/myapplication

# Create compressed version with original preserved
gzexe -k myprogram_v2.0

# Batch compress multiple build artifacts
gzexe build/*/*/*/bin/*

# Verify all compressed executables
find . -name "*~" -exec gzexe -t {} \;
```

#### Testing and Validation
```bash
# Test compressed executable functionality
gzexe -t test_app && ./test_app --version

# Compare execution performance
time ./original_app
time ./compressed_app

# Validate decompression works correctly
gzexe -d compressed_app && cmp original_app compressed_app
```

#### Cross-platform Compatibility
```bash
# Compress Linux-specific executables
file *.elf | grep ELF | cut -d: -f1 | xargs gzexe

# Preserve original during cross-compilation
gzexe -k cross_compiled_binary

# Test compatibility across systems
gzexe -t universal_binary
```

## Advanced Usage

### Batch Operations

#### System-wide Optimization
```bash
#!/bin/bash
# System executable compression script

LOG_FILE="/var/log/gzexe_optimization.log"
DATE=$(date +%Y-%m-%d_%H:%M:%S)

echo "Starting system optimization at $DATE" >> $LOG_FILE

# Find and compress large executables
find /usr/bin /usr/local/bin -type f -executable -size +1M | while read file; do
    if [ ! -f "${file}~" ]; then
        echo "Compressing: $file" >> $LOG_FILE
        gzexe -v "$file" >> $LOG_FILE 2>&1
    fi
done

echo "Optimization completed at $(date)" >> $LOG_FILE
```

#### Selective Compression
```bash
#!/bin/bash
# Intelligent executable compression

# Compress based on file type and usage patterns
compress_executables() {
    local directory="$1"
    local min_size="$2"

    find "$directory" -type f -executable -size "+$min_size" | while read exe; do
        # Skip recently used files (within last 7 days)
        if [ $(find "$exe" -mtime -7 2>/dev/null | wc -l) -eq 0 ]; then
            echo "Compressing unused executable: $exe"
            gzexe -v "$exe"
        fi
    done
}

# Compress old applications
compress_executables "/opt/old_apps" "500K"
compress_executables "/home/user/.local/bin" "1M"
```

### Performance Monitoring

#### Compression Analysis
```bash
# Analyze compression ratios
analyze_compression() {
    local file="$1"

    if [ -f "${file}~" ]; then
        local original_size=$(stat -c%s "${file}~")
        local compressed_size=$(stat -c%s "$file")
        local ratio=$(echo "scale=2; (1 - $compressed_size / $original_size) * 100" | bc)

        echo "File: $file"
        echo "Original size: $original_size bytes"
        echo "Compressed size: $compressed_size bytes"
        echo "Compression ratio: ${ratio}%"
        echo "---"
    fi
}

# Analyze all compressed executables
find /usr/bin -name "*~" | while read original; do
    compressed="${original%~}"
    analyze_compression "$compressed"
done
```

#### Execution Time Testing
```bash
#!/bin/bash
# Performance testing script

test_performance() {
    local executable="$1"
    local iterations=10

    if [ -f "${executable}~" ]; then
        echo "Testing performance for: $executable"

        echo "Original executable timing:"
        time_for_original=0
        for ((i=1; i<=$iterations; i++)); do
            start_time=$(date +%s.%N)
            "${executable}~" --version >/dev/null 2>&1
            end_time=$(date +%s.%N)
            time_for_original=$(echo "$time_for_original + ($end_time - $start_time)" | bc)
        done
        avg_original=$(echo "scale=4; $time_for_original / $iterations" | bc)

        echo "Compressed executable timing:"
        time_for_compressed=0
        for ((i=1; i<=$iterations; i++)); do
            start_time=$(date +%s.%N)
            "$executable" --version >/dev/null 2>&1
            end_time=$(date +%s.%N)
            time_for_compressed=$(echo "$time_for_compressed + ($end_time - $start_time)" | bc)
        done
        avg_compressed=$(echo "scale=4; $time_for_compressed / $iterations" | bc)

        echo "Average original time: ${avg_original}s"
        echo "Average compressed time: ${avg_compressed}s"
        overhead=$(echo "scale=2; ($avg_compressed - $avg_original) / $avg_original * 100" | bc)
        echo "Performance overhead: ${overhead}%"
        echo ""
    fi
}

# Test performance on compressed executables
find /usr/bin -name "*~" | while read original; do
    test_performance "${original%~}"
done
```

### Automation and Integration

#### Automated Maintenance
```bash
#!/bin/bash
# Automated executable maintenance script

MAINTENANCE_LOG="/var/log/executable_maintenance.log"
MIN_SIZE="2M"  # Only compress files larger than 2MB
DAYS_UNUSED="14"  # Files unused for 14 days

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$MAINTENANCE_LOG"
}

# Compress old, unused executables
compress_unused_executables() {
    log_message "Starting compression of unused executables"

    find /usr/local/bin /opt -type f -executable -size "+$MIN_SIZE" -mtime "+$DAYS_UNUSED" | while read exe; do
        if [ ! -f "${exe}~" ]; then
            log_message "Compressing: $exe"
            if gzexe -v "$exe" >> "$MAINTENANCE_LOG" 2>&1; then
                log_message "Successfully compressed: $exe"
            else
                log_message "Failed to compress: $exe"
            fi
        fi
    done

    log_message "Compression process completed"
}

# Verify compressed executables
verify_compressed_files() {
    log_message "Starting verification of compressed executables"

    find /usr/local/bin /opt -name "*~" | while read original; do
        compressed="${original%~}"
        if ! gzexe -t "$compressed" >> "$MAINTENANCE_LOG" 2>&1; then
            log_message "Verification failed for: $compressed"
            # Attempt to restore original
            mv "$original" "$compressed"
            log_message "Restored original: $compressed"
        else
            log_message "Verification passed for: $compressed"
        fi
    done

    log_message "Verification process completed"
}

# Execute maintenance
compress_unused_executables
verify_compressed_files

log_message "Maintenance completed successfully"
```

#### Integration with Package Management
```bash
#!/bin/bash
# Post-installation hook for package managers

# Function to optimize newly installed executables
optimize_package_executables() {
    local package_name="$1"
    local install_dir="$2"

    echo "Optimizing executables for package: $package_name"

    # Find and compress large executables
    find "$install_dir" -type f -executable -size +1M | while read exe; do
        if [ ! -f "${exe}~" ]; then
            echo "Compressing: $exe"
            gzexe -v "$exe"
        fi
    done

    # Generate compression report
    local original_size=$(du -sb "$install_dir" | cut -f1)
    local compressed_size=$(du -sb "$install_dir" | cut -f1)
    local space_saved=$((original_size - compressed_size))

    echo "Package optimization completed for $package_name"
    echo "Space saved: $((space_saved / 1024)) KB"
}

# Usage examples
# optimize_package_executables "myapp" "/opt/myapp"
# optimize_package_executables "custom-tools" "/usr/local/bin"
```

## Integration and Automation

### Shell Scripts

#### Smart Compression Script
```bash
#!/bin/bash
# Intelligent executable compression with safeguards

SCRIPT_NAME="smart_gzexe"
LOG_FILE="/var/log/${SCRIPT_NAME}.log"
BACKUP_DIR="/tmp/${SCRIPT_NAME}_backup_$$"

# Safety checks and initialization
safety_checks() {
    # Check if running as root for system-wide operations
    if [ "$EUID" -ne 0 ] && [[ "$PWD" == /usr* || "$PWD" == /opt* ]]; then
        echo "Warning: Not running as root. Some operations may fail."
    fi

    # Create backup directory
    mkdir -p "$BACKUP_DIR"

    # Initialize log
    echo "$(date): Starting $SCRIPT_NAME" >> "$LOG_FILE"
}

# Safe compression with backup
safe_compress() {
    local file="$1"
    local min_size="${2:-1M}"

    # Skip if already compressed
    if [ -f "${file}~" ]; then
        echo "Already compressed: $file"
        return 0
    fi

    # Check file size
    if ! stat -c%s "$file" | grep -q "^[0-9]\+$"; then
        echo "Invalid file: $file"
        return 1
    fi

    file_size=$(stat -c%s "$file")
    min_size_bytes=$(( ${min_size%[MmGgKk]} * 1024 * 1024 ))

    if [ "$file_size" -lt "$min_size_bytes" ]; then
        echo "File too small to compress: $file (${file_size} bytes)"
        return 0
    fi

    # Create backup
    cp "$file" "$BACKUP_DIR/"

    # Test original executable
    if ! "$file" --version >/dev/null 2>&1 && ! "$file" --help >/dev/null 2>&1; then
        echo "Cannot verify executable: $file"
        return 1
    fi

    # Compress
    echo "Compressing: $file"
    if gzexe -v "$file"; then
        # Test compressed version
        if "$file" --version >/dev/null 2>&1 || "$file" --help >/dev/null 2>&1; then
            echo "Successfully compressed: $file"
            return 0
        else
            echo "Compressed file failed verification: $file"
            # Restore from backup
            mv "$BACKUP_DIR/$(basename "$file")" "$file"
            return 1
        fi
    else
        echo "Compression failed: $file"
        return 1
    fi
}

# Cleanup function
cleanup() {
    if [ -d "$BACKUP_DIR" ]; then
        echo "Cleaning up backup directory: $BACKUP_DIR"
        rm -rf "$BACKUP_DIR"
    fi
    echo "$(date): $SCRIPT_NAME completed" >> "$LOG_FILE"
}

# Set up cleanup trap
trap cleanup EXIT

# Execute safety checks
safety_checks

# Process files
for file in "$@"; do
    if [ -f "$file" ] && [ -x "$file" ]; then
        safe_compress "$file" "1M"
    else
        echo "Not an executable file: $file"
    fi
done
```

## Troubleshooting

### Common Issues

#### Compression Failures
```bash
# Check file permissions before compression
ls -la /usr/bin/large_app

# Fix permissions if needed
chmod 755 /usr/bin/large_app

# Check if file is actually executable
file /usr/bin/large_app

# Try force compression
gzexe -f /usr/bin/large_app

# Check for insufficient disk space
df -h /usr/bin
```

#### Execution Problems
```bash
# Test compressed executable
gzexe -t /usr/bin/large_app

# If test fails, restore original
mv /usr/bin/large_app~ /usr/bin/large_app

# Check for dynamic library dependencies
ldd /usr/bin/large_app

# Verify executable format
file /usr/bin/large_app
```

#### Performance Issues
```bash
# Monitor compression process
strace -c gzexe /usr/bin/large_app

# Check system resources during compression
htop
iostat -x 1

# Use verbose mode to see progress
gzexe -v /usr/bin/large_app

# Test compression on different files
for file in /usr/bin/*; do
    if [ -f "$file" ] && [ -x "$file" ]; then
        echo "Testing: $file"
        time gzexe "$file" 2>/dev/null && gzexe -d "$file" 2>/dev/null
    fi
done
```

#### Recovery Procedures
```bash
# Restore all compressed executables from backups
find /usr/bin -name "*~" | while read backup; do
    original="${backup%~}"
    echo "Restoring: $original"
    mv "$backup" "$original"
done

# Batch restore with verification
find /opt -name "*~" | while read backup; do
    original="${backup%~}"
    if [ -f "$backup" ]; then
        mv "$backup" "$original"
        if "$original" --version >/dev/null 2>&1; then
            echo "Successfully restored: $original"
        else
            echo "Failed to restore: $original"
        fi
    fi
done
```

## Related Commands

- [`gzip`](/docs/commands/compression/gzip) - GZIP compression utility
- [`gunzip`](/docs/commands/compression/gunzip) - Decompress GZIP files
- [`compress`](/docs/commands/compression/compress) - Original Unix compression utility
- [`upx`](/docs/commands/compression/upx) - Ultimate Packer for eXecutables
- [`strip`](/docs/commands/development/strip) - Strip symbols from object files
- [`objcopy`](/docs/commands/development/objcopy) - Copy and translate object files
- [`ldd`](/docs/commands/development/ldd) - Print shared library dependencies
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`stat`](/docs/commands/file-management/stat) - Display file or filesystem status

## Best Practices

1. **Test before compression** - Always verify executables work after compression
2. **Keep backups** - Use `-k` option or manual backups during initial testing
3. **Monitor disk space** - Ensure enough space for both original and compressed versions
4. **Check dependencies** - Verify compressed files maintain library dependencies
5. **Performance testing** - Measure execution time overhead for critical applications
6. **Selective compression** - Only compress files large enough to benefit from compression
7. **Regular verification** - Periodically test compressed executables with `-t` option
8. **Document changes** - Keep track of which files have been compressed
9. **Consider usage patterns** - Avoid compressing frequently executed programs on slow systems
10. **System monitoring** - Monitor system performance after large-scale compression operations

## Performance Tips

1. **Ideal file size**: Files larger than 1MB typically benefit most from compression
2. **Compression ratio**: Expect 30-70% size reduction for most executables
3. **Execution overhead**: Usually 10-50ms decompression time for large executables
4. **System impact**: Minimal impact on modern systems with sufficient RAM
5. **SSD performance**: Faster decompression on SSD systems compared to HDD
6. **Memory usage**: Decompression happens in memory, no disk writes required
7. **CPU overhead**: One-time decompression cost per execution
8. **Network benefits**: Faster transfer of compressed executables over network
9. **Storage savings**: Significant space savings on systems with many large binaries
10. **Startup time**: Slightly increased startup time, offset by disk read savings

The `gzexe` command provides an efficient solution for reducing disk space usage while maintaining full executable functionality. Its ability to create self-extracting compressed executables makes it particularly valuable for embedded systems, deployment scenarios, and environments where storage space is at a premium. When used judiciously with proper testing and monitoring, gzexe can significantly optimize storage without compromising system performance or reliability.