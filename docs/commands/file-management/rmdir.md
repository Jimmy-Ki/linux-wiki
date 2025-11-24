---
title: rmdir - Remove Empty Directories
sidebar_label: rmdir
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rmdir - Remove Empty Directories

The `rmdir` command removes empty directories from the filesystem. Unlike `rm -r`, it will only delete directories that contain no files or subdirectories, making it a safer option for cleanup operations.

## Basic Syntax

```bash
rmdir [OPTIONS] DIRECTORY...
```

## Common Options

- `-p, --parents` - Remove DIRECTORY and its ancestors
- `-v, --verbose` - Output a diagnostic for every directory processed
- `--ignore-fail-on-non-empty` - Ignore failures caused by non-empty directories

## Usage Examples

### Basic Directory Removal
```bash
# Remove a single empty directory
rmdir empty_directory

# Remove multiple empty directories
rmdir dir1 dir2 dir3

# Remove with verbose output
rmdir -v temp_directory

# Show what would be removed (dry run)
rmdir --verbose empty_directory
```

### Parent Directory Removal
```bash
# Remove directory and its empty parents
rmdir -p path/to/empty/directory

# Example: if path/to/empty/directory is empty,
# it will remove directory, then empty, then to, then path
# as long as they're all empty
```

### Safe Operations
```bash
# Remove empty directories only
rmdir empty_dir

# Ignore non-empty directories (don't fail)
rmdir --ignore-fail-on-non-empty possibly_empty_dir
```

## When to Use rmdir

### Cleanup Operations
```bash
# Remove temporary empty directories
rmdir /tmp/temp_*

# Remove build directories after successful build
rmdir build/cache build/temp

# Clean up empty log directories
rmdir /var/log/empty_logs/*
```

### Application Cleanup
```bash
# Remove empty cache directories
rmdir -p cache/sessions/empty/*

# Remove empty backup directories
find /backup -type d -empty -exec rmdir {} \;
```

## Advanced Usage

### Combining with Other Commands
```bash
# Find and remove empty directories
find . -type d -empty -exec rmdir {} \;

# Remove empty directories with verbose output
find . -type d -empty -exec rmdir -v {} \;

# Safe removal of empty subdirectories
find . -mindepth 2 -type d -empty -delete
```

### Script Usage
```bash
#!/bin/bash
# Cleanup script for empty directories

echo "Removing empty directories..."

# Remove all empty directories in current path
find . -type d -empty -print0 | while IFS= read -r -d '' dir; do
    echo "Removing: $dir"
    rmdir "$dir"
done

echo "Cleanup complete"
```

### Conditional Removal
```bash
# Remove directory only if it's empty
if [ -z "$(ls -A some_directory)" ]; then
    rmdir some_directory
    echo "Removed empty directory"
else
    echo "Directory is not empty"
fi
```

## Error Scenarios

### Common Errors
```bash
# Error: Directory not empty
rmdir directory_with_files
# rmdir: failed to remove 'directory_with_files': Directory not empty

# Error: No such file or directory
rmdir nonexistent_directory
# rmdir: failed to remove 'nonexistent_directory': No such file or directory

# Error: Permission denied
rmdir protected_directory
# rmdir: failed to remove 'protected_directory': Permission denied
```

### Handling Errors
```bash
# Check if directory is empty first
if [ -d "some_dir" ] && [ -z "$(ls -A some_dir)" ]; then
    rmdir some_dir
fi

# Use find to safely remove only empty directories
find . -type d -empty -exec rmdir {} \; 2>/dev/null
```

## Practical Examples

### Development Cleanup
```bash
# Remove empty test directories
rmdir -p tests/unit/empty/*
rmdir tests/integration/empty

# Clean up build artifacts (only empty directories)
find build -type d -empty -exec rmdir -v {} \;
```

### System Maintenance
```bash
# Remove empty temporary directories
rmdir /tmp/empty_* 2>/dev/null

# Clean up empty user cache directories
find /home/*/cache -type d -empty -exec rmdir {} \;
```

### Log Management
```bash
# Remove empty log directories
rmdir /var/log/app/archive/empty_logs/*

# Remove old empty log directories
find /var/log -type d -empty -mtime +30 -exec rmdir {} \;
```

## Safety Features

### Built-in Safety
```bash
# rmdir won't remove directories with content
rmdir directory_with_file
# This will fail safely

# Use --ignore-fail-on-non-empty to skip non-empty directories
rmdir --ignore-fail-on-non-empty dir1 dir2 dir3
```

### Verbose Operations
```bash
# See what's being removed
rmdir -v empty_directory1 empty_directory2
# rmdir: removing directory, 'empty_directory1'
# rmdir: removing directory, 'empty_directory2'
```

## Comparison with rm

### rmdir vs rm -r
```bash
# Safe: only removes empty directories
rmdir empty_directory

# Dangerous: removes directories and all contents
rm -r directory_with_contents

# More dangerous: removes without prompting
rm -rf directory_with_contents
```

### When to Choose Each
- **Use rmdir**: When you want to ensure directories are empty
- **Use rm -r**: When you want to remove directories and their contents
- **Use rm -rf**: When you're absolutely sure and want to force removal

## Automation and Scripting

### Cleanup Scripts
```bash
#!/bin/bash
# Example: Remove empty directories from multiple locations

DIRECTORIES="/tmp /var/log /home/user/downloads"

for dir in $DIRECTORIES; do
    echo "Cleaning $dir..."
    find "$dir" -type d -empty -exec rmdir -v {} \; 2>/dev/null
done
```

### Monitoring Empty Directories
```bash
# Find empty directories (without removing)
find /path -type d -empty

# Count empty directories
find /path -type d -empty | wc -l

# List empty directories with details
find /path -type d -empty -exec ls -ld {} \;
```

## Related Commands

- [`rm`](/docs/commands/file-management/rm) - Remove files and directories
- [`mkdir`](/docs/commands/file-management/mkdir) - Create directories
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`tree`](/docs/commands/file-management/tree) - Display directory structure

## Best Practices

1. **Use rmdir** when you want to ensure directories are empty
2. **Combine with find** for bulk empty directory cleanup
3. **Use verbose mode** to track removal operations
4. **Check directory contents** before removal in scripts
5. **Use --ignore-fail-on-non-empty** for batch operations

## Tips and Tricks

### Testing Before Removal
```bash
# Find empty directories first
find . -type d -empty

# Then remove them
find . -type d -empty -exec rmdir {} \;
```

### Parent Directory Cleanup
```bash
# Remove entire empty path
mkdir -p a/b/c/d
rmdir -p a/b/c/d
# All directories a, b, c, d will be removed if they're empty
```

### Safe Batch Operations
```bash
# Remove empty directories in multiple locations
for path in /tmp /var/log /home/user/temp; do
    find "$path" -type d -empty -exec rmdir -v {} \; 2>/dev/null
done
```

The `rmdir` command provides a safe way to clean up empty directories without the risk of accidentally removing directories that contain important files. It's particularly useful in automated cleanup scripts and maintenance tasks.