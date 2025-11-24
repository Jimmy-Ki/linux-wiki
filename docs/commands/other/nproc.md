---
title: nproc - Number of Processing Units
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nproc - Number of Processing Units

The `nproc` command prints the number of processing units available to the current process. This information is useful for determining optimal thread counts, parallel processing limits, and resource allocation in scripts and applications.

## Basic Syntax

```bash
nproc [OPTIONS]
```

## Common Options

- `--all` - Print the number of installed processing units
- `--ignore=N` - Ignore N processing units
- `--help` - Display help message
- `--version` - Display version information

## Usage Examples

### Basic Usage
```bash
# Show number of available processors
nproc
- 8

# Show number of installed processors
nproc --all
- 8

# Show processors ignoring some (useful for system resources)
nproc --ignore=2
- 6
```

### Script Integration
```bash
#!/bin/bash
# Use nproc for parallel processing

# Determine optimal thread count
THREADS=$(nproc)
echo "Using $THREADS threads for parallel processing"

# Example: Make with optimal job count
make -j$THREADS

# Example: Parallel file processing
find . -type f -print0 | xargs -0 -P$THREADS -I{} gzip {}

# Example: Parallel compression
tar -cf - /source/data | pigz -p$THREADS > archive.tar.gz
```

## Practical Examples

### Optimal Configuration
```bash
#!/bin/bash
# Configure applications based on CPU count

CPU_COUNT=$(nproc)
echo "System has $CPU_COUNT processors"

# Configure application thread pools
if [ $CPU_COUNT -le 2 ]; then
    echo "Low-CPU system: conservative settings"
    THREAD_POOL_SIZE=2
    MAX_CONNECTIONS=50
elif [ $CPU_COUNT -le 4 ]; then
    echo "Medium-CPU system: balanced settings"
    THREAD_POOL_SIZE=$CPU_COUNT
    MAX_CONNECTIONS=100
elif [ $CPU_COUNT -le 8 ]; then
    echo "High-CPU system: aggressive settings"
    THREAD_POOL_SIZE=$((CPU_COUNT * 2))
    MAX_CONNECTIONS=200
else
    echo "Very high-CPU system: maximum settings"
    THREAD_POOL_SIZE=$((CPU_COUNT * 2))
    MAX_CONNECTIONS=500
fi

echo "Thread pool size: $THREAD_POOL_SIZE"
echo "Max connections: $MAX_CONNECTIONS"
```

### Build Optimization
```bash
#!/bin/bash
# Optimize build processes based on CPU count

BUILD_JOBS=$(nproc)
echo "Starting parallel build with $BUILD_JOBS jobs"

# Clean build directory
make clean

# Parallel compilation
make -j$BUILD_JOBS

# Parallel testing
ctest -j$BUILD_JOBS

# Example for different build systems
case "$1" in
    "make")
        make -j$BUILD_JOBS
        ;;
    "ninja")
        ninja -j$BUILD_JOBS
        ;;
    "cargo")
        cargo build -j$BUILD_JOBS
        ;;
    "webpack")
        npm run build -- --parallel=$BUILD_JOBS
        ;;
    *)
        echo "Unknown build system: $1"
        exit 1
        ;;
esac
```

### Container Resource Management
```bash
#!/bin/bash
# Container CPU-aware resource management

# Get CPU count (works in containers too)
CPU_COUNT=$(nproc)
echo "Container CPU count: $CPU_COUNT"

# Adjust worker processes based on CPU count
WORKER_PROCESSES=$((CPU_COUNT / 2))
if [ $WORKER_PROCESSES -lt 1 ]; then
    WORKER_PROCESSES=1
fi

echo "Setting worker processes: $WORKER_PROCESSES"

# Example: Configure nginx
sed -i "s/worker_processes .*/worker_processes $WORKER_PROCESSES;/" /etc/nginx/nginx.conf

# Example: Configure application server
export WORKER_PROCESSES=$WORKER_PROCESSES
export THREAD_POOL_SIZE=$CPU_COUNT
```

### Performance Testing
```bash
#!/bin/bash
# CPU-aware performance testing

CPU_COUNT=$(nproc)
echo "Performance testing on $CPU_COUNT CPU system"

# Configure test parameters based on CPU count
CONCURRENT_USERS=$((CPU_COUNT * 10))
REQUEST_DURATION=300  # 5 minutes

echo "Running tests with $CONCURRENT_USERS concurrent users"

# Example: Apache Bench
ab -n $((CONCURRENT_USERS * 100)) -c $CONCURRENT_USERS http://localhost/

# Example: wrk
wrk -t$CPU_COUNT -c$CONCURRENT_USERS -d${REQUEST_DURATION}s http://localhost/

# Example: JMeter (simplified)
jmeter -n -t test.jmx -Jthreads=$CPU_COUNT -Jusers=$CONCURRENT_USERS
```

### System Monitoring
```bash
#!/bin/bash
# System resource monitoring with CPU count

CPU_COUNT=$(nproc)
TOTAL_CORES=$(nproc --all)
echo "System CPU Information:"
echo "Available CPUs: $CPU_COUNT"
echo "Total CPUs: $TOTAL_CORES"

# Monitor CPU usage per core
echo -e "\nCPU Usage per Core:"
top -n1 -b | awk 'NR>=8 && $1~/cpu[0-9]+/ {print $1": "$2"% user, "$4"% system"}' | head -$CPU_COUNT

# Calculate load average per CPU
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | tr -d ',')
LOAD_PER_CPU=$(echo "scale=2; $LOAD_AVG / $CPU_COUNT" | bc)
echo "Load average per CPU: $LOAD_PER_CPU"

# Check if system is overloaded
if (( $(echo "$LOAD_PER_CPU > 1.0" | bc -l) )); then
    echo "WARNING: System is overloaded (load > 1.0 per CPU)"
else
    echo "System load is normal"
fi
```

### Parallel File Operations
```bash
#!/bin/bash
# Parallel file operations based on CPU count

CPU_COUNT=$(nproc)
MAX_PARALLEL=$CPU_COUNT

echo "Using $MAX_PARALLEL parallel processes"

# Parallel compression
compress_files() {
    find . -name "*.log" -type f -print0 | xargs -0 -P$MAX_PARALLEL -I{} gzip {}
}

# Parallel image processing
process_images() {
    find . -name "*.jpg" -type f -print0 | xargs -0 -P$MAX_PARALLEL -I{} convert {} {}.png
}

# Parallel checksum calculation
calculate_checksums() {
    find . -type f -print0 | xargs -0 -P$MAX_PARALLEL -I{} md5sum {} > checksums.md5
}

# Parallel backup
backup_files() {
    SOURCE_DIR="/data"
    BACKUP_DIR="/backup"

    # Create multiple parallel rsync processes
    for ((i=1; i<=MAX_PARALLEL; i++)); do
        (
            find "$SOURCE_DIR" -type f | awk "NR % $MAX_PARALLEL == $((i-1))" | \
            xargs -I{} rsync -a {} "$BACKUP_DIR/{}"
        ) &
    done
    wait
}
```

## Related Commands

- [`lscpu`](/docs/commands/system/lscpu) - Display CPU information
- [`top`](/docs/commands/process-management/top) - Dynamic process viewer
- [`htop`](/docs/commands/process-management/htop) - Interactive process viewer
- [`ps`](/docs/commands/process-management/ps) - Process status
- [`make`](/docs/commands/development/make) - Build automation tool

## Best Practices

1. **Use for parallel processing** to optimize system resource usage
2. **Consider container limits** when running in containerized environments
3. **Reserve some cores** for system processes when setting thread counts
4. **Test different configurations** to find optimal settings for your workload
5. **Use in build scripts** for automatic parallel compilation
6. **Consider memory usage** when increasing parallel processes
7. **Monitor system performance** when using CPU count for configuration
8. **Account for hyperthreading** if you need physical vs logical cores

The `nproc` command is essential for creating CPU-aware scripts and applications that automatically adapt to the available processing power.