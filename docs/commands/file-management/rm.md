---
title: rm - Remove Files and Directories
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rm - Remove Files and Directories

The `rm` command removes (deletes) files and directories from the filesystem. This is a permanent action that cannot be undone without backups, so caution is essential when using this command.

## Basic Syntax

```bash
rm [OPTIONS] FILE...
rm [OPTIONS] DIRECTORY...
```

## Common Options

### Safety Options
- `-i, --interactive` - Prompt before every removal
- `-I, --interactive=once` - Prompt once before removing more than 3 files
- `--interactive=WHEN` - Prompt according to WHEN (never, once, always)
- `--no-preserve-root` - Don't treat '/' specially (dangerous)

### Directory Options
- `-r, -R, --recursive` - Remove directories and their contents recursively
- `-d, --dir` - Remove empty directories

### Force Options
- `-f, --force` - Ignore nonexistent files and never prompt
- `--preserve-root` - Don't remove '/' (default)

### Verbose Options
- `-v, --verbose` - Explain what is being done

## Usage Examples

### Basic File Removal
```bash
# Remove a single file
rm file.txt

# Remove multiple files
rm file1.txt file2.txt file3.txt

# Remove files matching pattern
rm *.tmp
rm *.log.*

# Remove file with verbose output
rm -v important_file.txt
```

### Interactive Removal (Recommended)
```bash
# Prompt before removing each file
rm -i file.txt

# Prompt once when removing multiple files
rm -I *.log

# Remove with confirmation
rm -i dangerous_file.*
```

### Directory Removal
```bash
# Remove empty directory
rmdir empty_directory

# Remove empty directory with rm
rm -d empty_directory

# Remove directory and all contents (DANGEROUS)
rm -r directory_name

# Remove directory with verbose output
rm -rv directory_name
```

### Force Removal
```bash
# Remove files without prompting (USE WITH CAUTION)
rm -f file.txt

# Force remove directory recursively (EXTREMELY DANGEROUS)
rm -rf directory_name

# Remove read-only files
rm -f protected_file.txt
```

## Safety Practices

### Safe Removal Aliases
```bash
# Create safe aliases
alias rm='rm -i'
alias rm_r='rm -ir'
alias rm_rf='echo "Dangerous command - use rm -rf manually"'

# Test before executing
echo "Files to remove: *.tmp"
read -p "Continue? (y/N) " && rm -i *.tmp
```

### Confirmation Prompts
```bash
# Safer directory removal
rm -ir directory/

# Batch removal with confirmation
find . -name "*.log" -exec rm -i {} \;

# Remove old files with date check
find /tmp -name "*.tmp" -mtime +7 -exec rm -i {} \;
```

## Advanced Usage

### Conditional Removal
```bash
# Remove files older than 30 days
find /path -type f -mtime +30 -delete

# Remove empty files
find /path -type f -empty -delete

# Remove files by size
find /path -type f -size +100M -delete
```

### Pattern-Based Removal
```bash
# Remove files with specific extensions
rm *.tmp *.bak *.old

# Remove files matching pattern
rm file?.txt
rm *_backup.*

# Remove files in subdirectories
rm */*.*
rm **/*.tmp
```

### Safe Cleanup Scripts
```bash
#!/bin/bash
# Safe cleanup script

TRASH_DIR="$HOME/.trash/$(date +%Y%m%d)"
mkdir -p "$TRASH_DIR"

# Move files to trash instead of deleting
for file in "$@"; do
    if [ -e "$file" ]; then
        mv "$file" "$TRASH_DIR/"
        echo "Moved $file to trash"
    fi
done
```

## Common Scenarios

### Log File Cleanup
```bash
# Remove old log files
rm /var/log/*.old

# Remove log files older than 7 days
find /var/log -name "*.log" -mtime +7 -delete

# Clean temporary log files
rm -f /tmp/*.log
```

### Development Cleanup
```bash
# Remove build artifacts
rm -rf build/ dist/

# Remove compiled files
rm *.o *.exe *.class

# Clean backup files
rm *~ *.bak *.swp
```

### Temporary File Removal
```bash
# Remove temporary files
rm -rf /tmp/temp_*

# Clean user temp directory
rm -rf ~/tmp/*

# Remove session files
rm -rf /tmp/sess_*
```

## Dangerous Examples (Use with Extreme Caution)

```bash
# WARNING: These commands can cause data loss!

# Remove everything in current directory
rm -rf *

# Remove everything from filesystem (NEVER RUN THIS!)
rm -rf /

# Remove system files (DANGEROUS)
sudo rm -rf /etc/*
```

## Recovery Options

### From Trash
```bash
# If using trash-cli
trash-list
trash-restore file.txt

# Manual trash recovery
mv ~/.trash/file.txt ./file.txt
```

### From Backups
```bash
# Restore from backup
tar -xvf backup.tar.gz path/to/file.txt

# Use rsync to restore
rsync backup/ restored/
```

## Filesystem Behavior

### What Happens During Removal
1. **Unlinks file**: Directory entry is removed
2. **Decrements link count**: Inode reference count decreases
3. **Frees blocks**: When link count reaches zero
4. **Updates metadata**: Filesystem structures updated

### Secure Deletion
```bash
# Overwrite before deletion (more secure)
shred -vfz file.txt

# Use secure delete
srm file.txt

# Multiple overwrite passes
shred -n 3 file.txt
```

## Related Commands

- [`rmdir`](/docs/commands/file-management/rmdir) - Remove empty directories
- [`mv`](/docs/commands/file-management/mv) - Move files (safer alternative)
- [`trash-cli`](/docs/commands/file-management/trash) - Move to trash instead of deleting
- [`shred`](/docs/commands/file-management/shred) - Securely delete files
- [`find`](/docs/commands/file-management/find) - Find and delete files conditionally

## Best Practices

### Before Using rm
1. **Double-check paths** and filenames
2. **Use `ls` first** to verify what will be deleted
3. **Use `-i` or `-I`** for important files
4. **Have backups** before large deletions
5. **Test with `echo`** in scripts to verify

### Safe Scripting
```bash
#!/bin/bash
# Example safe removal script

LOG_FILES="/var/log/*.old"
if [ -n "$(echo $LOG_FILES)" ]; then
    echo "Found old log files:"
    ls $LOG_FILES
    read -p "Remove these files? (y/N) " confirm
    if [[ $confirm == [yY] ]]; then
        rm -v $LOG_FILES
    fi
fi
```

### Recovery Preparation
```bash
# Install trash-cli as rm alternative
sudo apt install trash-cli
alias rm='trash'
alias rm_permanent='/bin/rm -i'

# Create safe rm function
function safe_rm() {
    local trash="$HOME/.trash"
    mkdir -p "$trash"
    mv "$@" "$trash/"
}
```

## Troubleshooting

### Common Issues

1. **"Permission denied"**: Check file permissions
2. **"Directory not empty"**: Use `-r` option
3. **"Operation not permitted"**: File is in use or protected
4. **"No such file or directory"**: File doesn't exist

### Solutions

```bash
# Check permissions
ls -la file.txt

# Change permissions if needed (use carefully)
chmod u+w file.txt

# Find processes using file
lsof file.txt

# Force remove with sudo (DANGEROUS)
sudo rm -f file.txt
```

The `rm` command is powerful but dangerous. Always exercise caution, use interactive options when possible, and maintain regular backups to prevent accidental data loss.