---
title: du - Disk Usage
sidebar_label: du
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# du - Disk Usage

The `du` (disk usage) command is a fundamental Linux utility that estimates and displays the disk space consumed by files and directories. It recursively calculates the total size of each specified file or directory, including all subdirectories and their contents. The `du` command is essential for system administrators, developers, and users who need to monitor disk usage, identify large files and directories, perform cleanup operations, and manage storage resources effectively. With its comprehensive set of options for output formatting, depth control, and filtering, `du` provides flexible disk space analysis capabilities suitable for everything from quick size checks to detailed storage auditing.

## Basic Syntax

```bash
du [OPTIONS] [FILE]...
du [OPTIONS] --max-depth=N [DIRECTORY]
```

## Common Options

### Output Format Options
- `-h, --human-readable` - Display sizes in human readable format (K, M, G, T)
- `-k` - Display sizes in kilobytes (default)
- `-m` - Display sizes in megabytes
- `-g` - Display sizes in gigabytes
- `-b, --bytes` - Display sizes in bytes
- `--si` - Use powers of 1000 instead of 1024 (decimal units)
- `-H, --dereference-args` - Dereference only symlinks that are listed on the command line

### Depth and Recursion Control
- `-d, --max-depth=N` - Limit display depth to N levels
- `-s, --summarize` - Display only a total for each argument
- `-S, --separate-dirs` - Do not include size of subdirectories
- `--apparent-size` - Display apparent size instead of disk usage
- `-0, --null` - End each output line with 0 byte rather than newline

### Display and Counting Options
- `-c, --total` - Produce a grand total
- `-a, --all` - Write counts for all files, not just directories
- `-L, --dereference` - Dereference all symbolic links
- `-P, --no-dereference` - Don't follow any symbolic links (default)
- `--count-links` - Count sizes many times if hard linked

### Time and Information Options
- `--time` - Show time of last modification
- `--time=WORD` - Show time as WORD: atime, access, use, ctime, or status
- `--time-style=STYLE` - Show times using STYLE: full-iso, long-iso, iso, or +FORMAT

### Filtering and Exclusion
- `--exclude=PATTERN` - Exclude files that match PATTERN
- `--exclude-from=FILE` - Exclude files that match any pattern in FILE
- `--threshold=SIZE` - Exclude entries smaller than SIZE if positive, or entries greater than SIZE if negative

## Usage Examples

### Basic Operations

#### Simple Disk Usage Analysis
```bash
# Show disk usage of current directory
du

# Show human-readable sizes
du -h

# Show total size of current directory only
du -sh

# Show disk usage for specific files/directories
du /home/user /var/log

# Display in bytes
du -b

# Use SI (decimal) units
du --si
```

#### Depth Control and Output Management
```bash
# Show only top-level directories (depth 1)
du -h --max-depth=1

# Show up to 2 levels deep
du -h -d 2

# Show summary with grand total
du -ch /home/user

# Show all files and directories
du -ah

# Show separate directories (don't count subdirectories)
du -Sh

# Show apparent size instead of disk usage
du --apparent-size -h
```

### Advanced Usage Patterns

#### Size Filtering and Analysis
```bash
# Show directories larger than 1GB
du -h --threshold=1G

# Show items smaller than 10MB
du -h --threshold=-10M

# Find top 10 largest directories
du -h --max-depth=1 | sort -rh | head -10

# Show all files sorted by size
du -ah | sort -rh

# Find directories using exact size matching
du -h | grep "^[0-9]*\.[0-9]*G"
```

#### Pattern Matching and Exclusion
```bash
# Exclude specific file types
du -h --exclude="*.log" --exclude="*.tmp" .

# Exclude directories by pattern
du -h --exclude="node_modules" --exclude=".git" project/

# Exclude patterns from file
echo "*.cache" > exclude.txt
echo "*.tmp" >> exclude.txt
echo "temp/*" >> exclude.txt
du -h --exclude-from=exclude.txt .

# Multiple exclusion patterns
du -h --exclude="*.pyc" --exclude="__pycache__" --exclude=".pytest_cache" .
```

#### Time-Based Analysis
```bash
# Show modification times
du -h --time /var/log

# Show access times
du -h --time=atime /home/user

# Show status change times
du -h --time=ctime /etc

# Custom time format
du -h --time --time-style=+%Y-%m-%d\ %H:%M /var/log

# ISO format timestamps
du -h --time --time-style=iso /var/log
```

## Practical Examples

### System Administration

#### System Disk Space Analysis
```bash
# Analyze root directory usage
sudo du -h --max-depth=1 /

# Check user directory sizes
du -sh /home/* | sort -rh

# Analyze system directories
du -h --max-depth=2 /usr /var /opt

# Check temporary directory sizes
du -sh /tmp/* /var/tmp/* 2>/dev/null

# Find large system directories
sudo du -h --max-depth=1 / | sort -rh | head -10
```

#### Log File Management
```bash
# Analyze log directory sizes
du -h --max-depth=1 /var/log/

# Find large log files
find /var/log -type f -name "*.log" -exec du -h {} \; | sort -rh

# Check log rotation candidates
du -h /var/log --time | sort -rh

# Archive old logs by size
find /var/log -type f -size +100M -exec du -h {} \;

# Monitor log directory growth
du -sh /var/log && du -sh /var/log/*.log.* 2>/dev/null
```

#### Package and Cache Management
```bash
# Check package cache sizes
du -sh /var/cache/apt/*

# Analyze user cache directories
du -sh ~/.cache/* | sort -rh

# Check Docker disk usage
du -sh /var/lib/docker/*

# Find large application caches
du -h --max-depth=1 ~/.local/share/
```

### Development Workflow

#### Project Size Analysis
```bash
# Analyze project structure
du -h --max-depth=1 project/

# Check source code sizes
du -sh project/src/ project/docs/ project/tests/

# Find large dependencies
du -sh node_modules/ vendor/ target/

# Show build artifacts
du -h --max-depth=2 project/build/ project/dist/

# Analyze Git repository size
du -sh .git/ && du -sh .git/objects/
```

#### Development Environment Cleanup
```bash
# Find large build artifacts
du -ah . | grep -E "(build|dist|target)" | sort -rh

# Check dependency sizes
du -sh node_modules/ | awk '{print $1}'

# Find temporary files
find . -name "*.tmp" -o -name "*.bak" -exec du -h {} \;

# Clean up caches
du -sh ~/.cache/* | sort -rh | head -5
```

#### Code Quality Analysis
```bash
# Find large source files
find . -name "*.py" -o -name "*.js" -o -name "*.java" | xargs du -h | sort -rh

# Check test directory sizes
du -sh tests/ spec/ test/

# Analyze documentation size
du -sh docs/ README.md *.md

# Find large binary files in repo
find . -type f -size +1M -exec du -h {} \;
```

### Storage Management

#### Disk Cleanup Operations
```bash
# Find cleanup candidates
du -h /tmp /var/tmp | sort -rh

# Check user home directory usage
du -sh /home/* | sort -rh | head -10

# Find large downloads
du -sh ~/Downloads/* | sort -rh

# Identify large media files
find ~ -type f \( -name "*.mp4" -o -name "*.avi" -o -name "*.mkv" \) -exec du -h {} \; | sort -rh
```

#### Archive and Backup Analysis
```bash
# Check backup directory sizes
du -sh /backup/* | sort -rh

# Find old large files
find /data -type f -mtime +30 -size +100M -exec du -h {} \;

# Analyze archive compression ratio
du -b original_file && du -b compressed_file.gz

# Check snapshot sizes
du -sh .snapshots/ | sort -rh
```

#### Storage Planning
```bash
# Project storage requirements
du -sh project/ && du -ah project/ | wc -l

# Database size analysis
du -sh /var/lib/mysql/

# Application deployment size
du -sh /opt/application/

# User quota monitoring
du -sh /home/username/
```

## Advanced Usage

### Complex Filtering and Analysis

#### Multi-Criteria Analysis
```bash
# Find large directories with recent changes
find /data -type d -mtime -7 -exec du -sh {} \; | sort -rh

# Show directories larger than threshold with modification times
du -h --time --threshold=100M /var/log

# Combine size and type filtering
find /home -type f -size +50M -name "*.mp4" -exec du -h {} \;

# Analyze specific user files
du -ah /home/user --exclude=".cache" --exclude=".local" | sort -rh
```

#### Pattern-Based Analysis
```bash
# Analyze by file extension
find . -name "*.log" -exec du -ch {} + | tail -1

# Show sizes by file pattern
du -ch *.txt *.pdf *.doc 2>/dev/null | tail -1

# Exclude hidden files and directories
du -h --exclude=".*" .

# Show only hidden files
du -ah . | grep "^\./\." | sort -rh
```

#### Performance Optimization
```bash
# Faster analysis on large directories
du -s /very/large/directory

# Limit recursion for speed
du --max-depth=2 /huge/directory

# Use apparent size for quick estimates
du --apparent-size -s /path

# Parallel analysis with find
find /path -maxdepth 1 -type d -print0 | xargs -0 -P4 du -sh
```

### Integration with Other Tools

#### Pipeline Operations
```bash
# Sort by size and format output
du -h | sort -rh | awk '{printf "%-10s %s\n", $1, $2}'

# Create disk usage report
du -h --max-depth=1 / | sort -rh | head -20 > disk_report.txt

# Combine with grep for specific patterns
du -ah | grep -E "\.(jpg|png|gif)$" | sort -rh

# Format for CSV output
du -h --time --time-style=+%Y-%m-%d | awk '{print $1","$2","$3}'
```

#### Monitoring and Alerting
```bash
# Check if directories exceed threshold
du -s /home/* | awk '$1 > 1000000 {print $2 " exceeds 1GB"}'

# Monitor specific directories
for dir in /var/log /tmp /home; do
    echo "=== $dir ==="
    du -sh "$dir"
done

# Size change monitoring
du -sh /path > /tmp/size_now
sleep 3600
du -sh /path > /tmp/size_later
diff /tmp/size_now /tmp/size_later
```

### Scripting and Automation

#### Disk Usage Monitoring Script
```bash
#!/bin/bash
# Disk usage monitoring script

REPORT_DIR="/reports"
DATE=$(date +%Y%m%d_%H%M%S)
THRESHOLD_GB=10

# Create report directory
mkdir -p "$REPORT_DIR"

# Generate system disk usage report
echo "=== System Disk Usage Report ===" > "$REPORT_DIR/disk_usage_$DATE.txt"
echo "Generated: $(date)" >> "$REPORT_DIR/disk_usage_$DATE.txt"
echo "" >> "$REPORT_DIR/disk_usage_$DATE.txt"

# Top-level directory analysis
echo "=== Top-Level Directory Usage ===" >> "$REPORT_DIR/disk_usage_$DATE.txt"
sudo du -h --max-depth=1 / | sort -rh >> "$REPORT_DIR/disk_usage_$DATE.txt"

# User directory analysis
echo "" >> "$REPORT_DIR/disk_usage_$DATE.txt"
echo "=== User Directory Usage ===" >> "$REPORT_DIR/disk_usage_$DATE.txt"
du -sh /home/* 2>/dev/null | sort -rh >> "$REPORT_DIR/disk_usage_$DATE.txt"

# Large directories alert
echo "" >> "$REPORT_DIR/disk_usage_$DATE.txt"
echo "=== Directories Exceeding ${THRESHOLD_GB}GB ===" >> "$REPORT_DIR/disk_usage_$DATE.txt"
du -s /home/* 2>/dev/null | awk -v threshold="$((THRESHOLD_GB * 1024 * 1024))" '$1 > threshold {print $2 " is " $1/1024/1024 " GB"}' >> "$REPORT_DIR/disk_usage_$DATE.txt"

echo "Report saved to: $REPORT_DIR/disk_usage_$DATE.txt"
```

#### Automated Cleanup Script
```bash
#!/bin/bash
# Automated disk cleanup script

CLEANUP_DIRS="/tmp /var/tmp"
LOG_FILE="/var/log/cleanup.log"
DATE=$(date +%Y-%m-%d\ %H:%M:%S)

log_message() {
    echo "[$DATE] $1" >> "$LOG_FILE"
}

# Clean temporary directories
for dir in $CLEANUP_DIRS; do
    if [ -d "$dir" ]; then
        size_before=$(du -sb "$dir" | cut -f1)
        find "$dir" -type f -atime +7 -delete 2>/dev/null
        size_after=$(du -sb "$dir" | cut -f1)
        freed=$((size_before - size_after))
        log_message "Cleaned $dir: freed $((freed / 1024 / 1024)) MB"
    fi
done

# Clean user caches older than 30 days
for user_home in /home/*; do
    if [ -d "$user_home/.cache" ]; then
        size_before=$(du -sb "$user_home/.cache" | cut -f1)
        find "$user_home/.cache" -type f -atime +30 -delete 2>/dev/null
        size_after=$(du -sb "$user_home/.cache" | cut -f1)
        if [ $size_before -gt $size_after ]; then
            freed=$((size_before - size_after))
            username=$(basename "$user_home")
            log_message "Cleaned cache for $username: freed $((freed / 1024 / 1024)) MB"
        fi
    fi
done

log_message "Cleanup completed"
```

## Special Use Cases

### Network File Systems

#### Remote Storage Analysis
```bash
# Faster analysis on NFS mounts
du -s /network/path

# Limit depth for network directories
du --max-depth=1 /remote/share

# Use specific block size for network analysis
du -B 1M /network/directory

# Quick summary of network storage
du -sh /mnt/nfs/* | sort -rh
```

#### Cloud Storage Monitoring
```bash
# Analyze cloud-synced directories
du -sh ~/Dropbox/ ~/Google\ Drive/

# Check sync directory sizes
du -ah ~/Sync/ --exclude=".dropbox" --exclude=".sync"

# Monitor cloud storage usage
for cloud_dir in ~/Dropbox ~/Google\ Drive ~/OneDrive; do
    if [ -d "$cloud_dir" ]; then
        size=$(du -s "$cloud_dir" | cut -f1)
        echo "$(basename "$cloud_dir"): $((size / 1024 / 1024)) MB"
    fi
done
```

### Virtualization and Containers

#### Docker and Container Analysis
```bash
# Docker disk usage analysis
du -sh /var/lib/docker/*

# Container image sizes
du -sh /var/lib/docker/image/*/layerdb/

# Container volume analysis
du -sh /var/lib/docker/volumes/*

# Kubernetes node storage
sudo du -sh /var/lib/kubelet/*
```

#### Virtual Machine Management
```bash
# VM disk image analysis
du -h /var/lib/libvirt/images/*.qcow2

# VM snapshot sizes
du -sh /var/lib/libvirt/images/*-snap*

# VirtualBox VM sizes
du -sh ~/VirtualBox\ VMs/*
```

## Performance Considerations

### Large Directory Optimization

#### Efficient Analysis Techniques
```bash
# Use summary mode for very large directories
du -sh /very/large/directory

# Limit depth to reduce processing time
du --max-depth=2 /huge/directory

# Exclude known large directories
du -h --exclude=node_modules --exclude=.git large_project/

# Use specific block size for faster processing
du -B 4K /path/to/directory

# Process multiple directories in parallel
find /path -maxdepth 1 -type d | xargs -P4 du -sh
```

#### Memory and I/O Optimization
```bash
# Reduce memory usage on large trees
du --apparent-size -s /large/directory

# Use null termination for safe processing
du -0 /path | tr '\0' '\n'

# Batch processing of large file lists
find /path -type f -print0 | xargs -0 du -ch | tail -1

# Optimize for SSD storage
du -b /ssd/path  # Use byte counts for SSD efficiency
```

### Network Performance

#### Remote Analysis Optimization
```bash
# Minimize network calls
du -s /remote/mount/point

# Use local caching when possible
export DU_LOCAL_CACHE=1
du -h /network/path

# Reduce round trips
du --max-depth=1 /remote/share

# Batch remote requests
find /remote -maxdepth 1 -exec du -sh {} \;
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Run with sudo for system directories
sudo du -h --max-depth=1 /

# Handle permission errors gracefully
du -h / 2>/dev/null | sort -rh

# Check specific user directories only
du -h /home/user

# Use find to bypass permission issues
find /path -type d -exec du -sh {} \; 2>/dev/null
```

#### Symbolic Link Issues
```bash
# Don't follow symbolic links
du -h -P /path/with/symlinks

# Follow all symbolic links
du -h -L /path/with/symlinks

# Follow only command-line symlinks
du -h -H /symlink/path

# Check for circular symlinks
find /path -type l -exec test -e {} \; -print
```

#### Performance Issues
```bash
# Timeout long-running operations
timeout 300 du -sh /very/large/directory

# Use nice to reduce priority
nice -n 19 du -h /large/directory

# Monitor progress
du -h /large/directory | pv -l > /dev/null

# Check disk usage while du is running
watch -n 5 'df -h | grep -vE "^Filesystem|tmpfs|cdrom"'
```

#### Disk Space Discrepancies
```bash
# Compare apparent size vs disk usage
du --apparent-size -s /path && du -s /path

# Check for sparse files
find /path -type f -exec du -h {} \; | sort -rh

# Look for deleted files held open by processes
lsof | grep deleted

# Check filesystem block size
stat -fc %T /path
```

## Related Commands

- [`df`](/docs/commands/file-management/df) - Display free disk space
- [`ncdu`](/docs/commands/file-management/ncdu) - Interactive disk usage analyzer
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`stat`](/docs/commands/file-management/stat) - Display file or filesystem status
- [`tree`](/docs/commands/file-management/tree) - Display directory tree structure
- [`quotacheck`](/docs/commands/system-services/quotacheck) - File system quota consistency checker
- [`repquota`](/docs/commands/other-tools/repquota) - Report disk usage and quotas

## Best Practices

1. **Use `-h` for human-readable output** in most cases for better readability
2. **Limit depth with `-d` or `--max-depth`** for large directory trees to avoid overwhelming output
3. **Use `-s` for quick total size** when you only need the overall disk usage
4. **Combine with `sort`** to identify the largest directories:
   - `du -h | sort -rh | head -10`
5. **Exclude unnecessary directories** to focus on relevant data:
   - `du -h --exclude=node_modules --exclude=.git`
6. **Use appropriate size units** for your use case:
   - `-m` for megabytes when working with large files
   - `-k` for kilobytes for detailed analysis
7. **Be careful with network file systems** as `du` can be slow on remote mounts
8. **Use `--apparent-size`** when you need file size rather than disk usage
9. **Handle permissions properly** using sudo when analyzing system directories
10. **Use time options** for tracking when files were last modified

## Performance Tips

1. **Use summary mode (`-s`)** for quick estimates of large directories
2. **Limit recursion depth** (`--max-depth`) to reduce processing time
3. **Exclude irrelevant patterns** (`--exclude`) to focus on important data
4. **Use appropriate block sizes** (`-B`) for specific filesystem types
5. **Run with lower priority** (`nice`) on production systems
6. **Process in parallel** using `xargs -P` for multiple directories
7. **Use null termination** (`-0`) for handling filenames with special characters
8. **Consider `--apparent-size`** for faster analysis when exact disk usage isn't critical
9. **Cache results** for frequently accessed directories
10. **Use monitoring tools** like `watch` for tracking changes over time

The `du` command is essential for disk space analysis and management. Its flexible output options, filtering capabilities, and integration with other Unix tools make it a powerful utility for system administrators, developers, and users who need to monitor and manage disk usage effectively. Whether performing quick size checks, conducting detailed storage audits, or implementing automated cleanup routines, `du` provides the necessary functionality for comprehensive disk space analysis.