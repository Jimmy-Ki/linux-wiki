---
title: touch - Create Empty Files or Update Timestamps
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# touch - Create Empty Files or Update Timestamps

The `touch` command creates empty files or updates file timestamps (access and modification times). It's commonly used for creating placeholder files and updating file timestamps for various purposes.

## Basic Syntax

```bash
touch [OPTIONS] FILE...
```

## Common Options

### Timestamp Options
- `-a` - Change only the access time
- `-m` - Change only the modification time
- `-t [[CC]YY]MMDDhhmm[.ss]` - Use specified timestamp
- `-d, --date=STRING` - Parse STRING and use it as a timestamp
- `-r, --reference=FILE` - Use FILE's times instead of current time

### Creation Options
- `-c, --no-create` - Don't create files if they don't exist

### Additional Options
- `--time=WORD` - Change specified time (access, atime, use, modify, mtime)

## Usage Examples

### Creating Files
```bash
# Create empty file
touch newfile.txt

# Create multiple empty files
touch file1.txt file2.txt file3.txt

# Create files with extensions
touch config.json database.sql README.md

# Create numbered files
touch report_{1,2,3}.txt

# Don't create file if it doesn't exist
touch -c optional_file.txt
```

### Updating Timestamps
```bash
# Update both access and modification times
touch existing_file.txt

# Update only access time
touch -a file.txt

# Update only modification time
touch -m file.txt

# Use verbose mode to show changes
touch -v file.txt
```

### Setting Specific Timestamps
```bash
# Set specific timestamp
touch -t 202401151200.00 file.txt  # Jan 15, 2024 12:00:00

# Set date using string format
touch -d "2024-01-15 12:00:00" file.txt
touch -d "2 days ago" file.txt
touch -d "next Monday" file.txt
touch -d "2024-01-01" file.txt

# Use relative time
touch -d "1 hour ago" file.txt
touch -d "tomorrow" file.txt
touch -d "last Friday" file.txt
```

### Copying Timestamps
```bash
# Copy timestamps from another file
touch -r reference_file.txt target_file.txt

# Make file have same timestamps as another
touch -r /etc/passwd backup_passwd
```

## Practical Examples

### File Management
```bash
# Create placeholder files for project structure
touch src/main.c src/utils.h src/Makefile

# Create log files
touch application.log error.log access.log

# Create backup timestamp markers
touch backup_$(date +%Y%m%d).marker
```

### Development Workflows
```bash
# Force make to rebuild files
touch source.c  # Updates timestamp, make will rebuild

# Create .gitkeep for empty directories
touch .gitkeep

# Update configuration files to trigger reload
touch /etc/app/config
```

### System Administration
```bash
# Create lock files
touch /var/lock/app.lock

# Update log files to trigger log rotation
touch /var/log/app.log

# Create temporary marker files
touch /tmp/maintenance_in_progress
```

## Advanced Usage

### Bulk File Operations
```bash
# Create files with pattern
touch report_{01..10}.txt
touch data_{A..F}.csv

# Create files for each day of month
touch log_$(date +%Y%m)_{01..31}.log

# Update all files in directory
touch *
```

### Script Integration
```bash
#!/bin/bash
# Create log files for current month
MONTH=$(date +%Y%m)
for day in {01..31}; do
    touch "log_${MONTH}${day}.txt"
done

# Mark build completion
touch build_complete_$(date +%s)
```

### Conditional Operations
```bash
# Create file only if it doesn't exist
[ ! -f "config.txt" ] && touch config.txt

# Update file if it exists
[ -f "existing.txt" ] && touch existing.txt

# Create marker file for tracking
touch processed_$(basename "$1")
```

## Timestamp Formats

### Date String Formats
```bash
touch -d "2024-01-15" file.txt          # ISO format
touch -d "15 Jan 2024" file.txt         # European format
touch -d "01/15/2024" file.txt          # US format
touch -d "15:30" file.txt               # Time only
touch -d "2024-01-15 15:30:45" file.txt # Full timestamp
```

### Relative Time Formats
```bash
touch -d "now" file.txt                 # Current time
touch -d "yesterday" file.txt           # Yesterday
touch -d "tomorrow" file.txt            # Tomorrow
touch -d "next week" file.txt           # Next week
touch -d "2 hours ago" file.txt         # 2 hours ago
touch -d "1 month ago" file.txt         # 1 month ago
touch -d "3 days ago" file.txt          # 3 days ago
```

## File Creation Patterns

### Naming Conventions
```bash
# Version files
touch version_1.0.txt version_2.0.txt

# Date-based files
touch log_$(date +%Y%m%d).txt
touch backup_$(date +%Y%m%d_%H%M%S).tar.gz

# Project files
touch README.md LICENSE .gitignore
touch src/main.c include/header.h
```

### Batch Creation
```bash
# Create test files
touch test_{001..100}.txt

# Create configuration files
touch config_{dev,prod,test}.json

# Create log structure
touch logs/{app,error,access,debug}.log
```

## Use Cases

### Build Systems
```bash
# Force make to rebuild
touch source.c

# Mark build completion
touch build_successful

# Create dependency files
touch .deps/main.d .deps/utils.d
```

### Logging and Monitoring
```bash
# Create daily log files
touch app_$(date +%Y%m%d).log

# Create rotation marker
touch rotate_logs_$(date +%s)

# Mark maintenance start
touch maintenance_start_$(date +%s)
```

### File Management
```bash
# Create directory structure with .gitkeep
mkdir -p logs/{archive,current}
touch logs/archive/.gitkeep logs/current/.gitkeep

# Create project skeleton
mkdir -p {src,tests,docs,config}
touch src/main.py tests/test_main.py docs/README.md
```

## File Properties

### Timestamp Types
```bash
# Access time (atime) - when file was last read
touch -a file.txt

# Modification time (mtime) - when file content was last changed
touch -m file.txt

# Change time (ctime) - when file metadata was last changed (cannot be set directly)
```

### Viewing Timestamps
```bash
# Show detailed file information
stat file.txt

# Show timestamps in human-readable format
ls -l --time-style=full-iso file.txt

# Show access time
ls -lu file.txt

# Show change time
ls -lc file.txt
```

## Related Commands

- [`stat`](/docs/commands/file-management/stat) - Display file status
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`mkdir`](/docs/commands/file-management/mkdir) - Create directories
- [`date`](/docs/commands/shell/date) - Display or set date and time
- [`find`](/docs/commands/file-management/find) - Find files by timestamp

## Common Issues

### Permission Problems
```bash
# Check permissions before creating
[ -w "$(pwd)" ] && touch newfile.txt

# Create file with specific permissions
touch file.txt && chmod 644 file.txt
```

### File Existence
```bash
# Don't overwrite existing files with -c
touch -c existing_file.txt

# Check if file exists before creating
[ ! -f "newfile.txt" ] && touch newfile.txt
```

## Best Practices

1. **Use descriptive names** when creating placeholder files
2. **Use -c option** to avoid creating unwanted files
3. **Use verbose mode** for important operations
4. **Use relative timestamps** for automation scripts
5. **Create .gitkeep files** to preserve empty directories in version control

## Tips and Tricks

### Project Setup
```bash
# Quick project skeleton
mkdir project && cd project
touch README.md .gitignore LICENSE
mkdir -p src tests docs
touch src/main.py tests/test_main.py
```

### Automation
```bash
# Create timestamp-based files
for i in {1..5}; do
    touch "report_$(date +%Y%m%d)_$i.txt"
done

# Update files to trigger processes
touch /var/www/html/reload
```

The `touch` command is versatile for both creating empty files and managing file timestamps. It's particularly useful in build systems, automation scripts, and file management workflows.