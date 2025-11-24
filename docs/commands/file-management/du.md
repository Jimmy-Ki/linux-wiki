---
title: du - Disk Usage
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# du - Disk Usage

The `du` (disk usage) command estimates and displays the disk space used by files and directories. It recursively calculates the total size of each specified file or directory, including all subdirectories.

## Basic Syntax

```bash
du [OPTIONS] [FILE]...
du [OPTIONS] --max-depth=N [DIRECTORY]
```

## Common Options

### Output Format
- `-h, --human-readable` - Display sizes in human readable format (K, M, G)
- `-k` - Display sizes in kilobytes (default)
- `-m` - Display sizes in megabytes
- `-g` - Display sizes in gigabytes
- `-b, --bytes` - Display sizes in bytes
- `--si` - Use powers of 1000 instead of 1024

### Depth and Recursion
- `-d, --max-depth=N` - Limit display depth to N levels
- `-s, --summarize` - Display only a total for each argument
- `-S, --separate-dirs` - Do not include size of subdirectories
- `--apparent-size` - Display apparent size instead of disk usage

### Display Options
- `-c, --total` - Produce a grand total
- `-a, --all` - Write counts for all files, not just directories
- `-L, --dereference` - Dereference all symbolic links
- `-D, --dereference-args` - Dereference only symlinks that are listed on the command line
- `-P, --no-dereference` - Don't follow any symbolic links

### Counting Methods
- `-0, --null` - End each output line with 0 byte rather than newline
- `--time` - Show time of last modification
- `--time=WORD` - Show time as WORD instead of modification time: atime, access, use, ctime or status
- `--time-style=STYLE` - Show times using STYLE: full-iso, long-iso, iso, or +FORMAT

### Filtering
- `--exclude=PATTERN` - Exclude files that match PATTERN
- `--exclude-from=FILE` - Exclude files that match any pattern in FILE
- `--threshold=SIZE` - Exclude entries smaller than SIZE if positive, or entries greater than SIZE if negative

## Usage Examples

### Basic Usage
```bash
# Show disk usage of current directory
du

# Show human-readable sizes
du -h

# Show total size of current directory only
du -sh

# Show disk usage for specific files/directories
du /home/user /var/log
```

### Depth Control
```bash
# Show only top-level directories (depth 1)
du -h --max-depth=1

# Show up to 2 levels deep
du -h -d 2

# Show grand total
du -ch /home/user
```

### File Type Filtering
```bash
# Include files, not just directories
du -ah

# Separate directories (don't count subdirectory sizes)
du -Sh

# Follow symbolic links
du -L
```

### Size Formats
```bash
# Display in megabytes
du -m

# Display in gigabytes
du -g

# Use SI units (1000 instead of 1024)
du --si

# Show in bytes
du -b
```

## Output Examples

### Default Output
```
32      ./logs
16      ./config
8       ./scripts
64      ./data
- 120     .
```

### Human-Readable Output
```
32K     ./logs
16K     ./config
8.0K    ./scripts
64K     ./data
- 120K    .
```

### Depth-Limited Output
```
4.0K    ./project/src
32K     ./project/logs
64K     ./project/node_modules
100K    ./project
```

## Practical Examples

### System Administration
```bash
# Find large directories in root
sudo du -h --max-depth=1 /

# Check home directory sizes
du -sh /home/*

# Analyze log directory
du -h --max-depth=2 /var/log/

# Check temporary files
du -sh /tmp/*
```

### Disk Space Cleanup
```bash
# Find largest files in current directory
du -ah . | sort -rh | head -10

# Show directories larger than 1GB
du -h --threshold=1G

# Find large hidden files
du -ah . | grep "^\." | sort -rh
```

### Project Analysis
```bash
# Analyze project size by directory
du -h --max-depth=1 project/

# Check node_modules size
du -sh node_modules/

# Show top 10 largest directories
du -h --max-depth=1 | sort -rh | head -10
```

## Advanced Usage

### Complex Filtering
```bash
# Exclude specific patterns
du -h --exclude="*.log" --exclude="*.tmp" .

# Exclude patterns from file
echo "*.cache" > exclude.txt
echo "node_modules" >> exclude.txt
du -h --exclude-from=exclude.txt .

# Show only directories larger than 10MB
du -h --threshold=10M | grep "M"
```

### Time-Based Analysis
```bash
# Show modification times
du -h --time /var/log

# Show access times
du -h --time=atime /home/user

# Custom time format
du -h --time --time-style=+%Y-%m-%d /var/log
```

### Integration with Other Tools
```bash
# Sort by size
du -h | sort -rh

# Find top 10 space consumers
du -ah . | sort -rh | head -10

# Format output for scripts
du -0 --apparent-size | tr '\0' '\n'

# Combine with find for complex searches
find . -name "*.log" -exec du -h {} \; | sort -rh
```

### Script Examples
```bash
# Monitor disk usage changes
#!/bin/bash
DATE=$(date +%Y%m%d)
du -h --max-depth=1 / > usage_$DATE.txt

# Find directories using most space
#!/bin/bash
du -h --max-depth=1 / 2>/dev/null | sort -rh | head -20

# Disk usage report
#!/bin/bash
echo "=== Disk Usage Report ==="
echo "Generated: $(date)"
echo ""
du -sh /home/* 2>/dev/null | sort -rh
```

## Performance Considerations

### Large Directories
```bash
# Use --max-depth to reduce output for large trees
du -h --max-depth=3 /very/large/directory

# Use --summarize for quick total size
du -sh /very/large/directory

# Exclude common large directories
du -h --exclude=node_modules --exclude=.git project/
```

### Network File Systems
```bash
# Faster analysis on network mounts
du -s /network/path

# Limit recursion depth
du --max-depth=1 /network/path
```

## Common Use Cases

### Disk Space Planning
```bash
# Check user directory sizes
du -sh /home/* | sort -rh

# Analyze application directories
du -h --max-depth=2 /opt/

# Check system directory sizes
du -h --max-depth=1 /usr /var /opt
```

### Cleanup Operations
```bash
# Find candidates for cleanup
du -h /tmp /var/tmp

# Check cache directory sizes
du -sh ~/.cache/*

# Find large log files
find /var/log -type f -name "*.log" -exec du -h {} \; | sort -rh
```

### Monitoring and Alerting
```bash
# Check if any directory exceeds threshold
du -s /home/* | awk '$1 > 1000000 {print $2 " is large"}'

# Monitor specific directories
du -s /var/log && du -s /tmp && du -s /home
```

## Related Commands

- [`df`](/docs/commands/file-management/df) - Display free disk space
- [`ncdu`](/docs/commands/file-management/ncdu) - Interactive disk usage analyzer
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`stat`](/docs/commands/file-management/stat) - Display file or filesystem status

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

The `du` command is essential for disk space analysis and management. Its flexible output options and filtering capabilities make it a powerful tool for system administrators, developers, and users who need to monitor and manage disk usage effectively.