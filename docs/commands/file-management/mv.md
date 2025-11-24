---
title: mv - Move or Rename Files and Directories
sidebar_label: mv
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mv - Move or Rename Files and Directories

The `mv` command moves or renames files and directories. It's used to relocate files within the filesystem or give them new names. Unlike copying, `mv` removes the original file after the operation completes.

## Basic Syntax

```bash
mv [OPTIONS] SOURCE DESTINATION
mv [OPTIONS] SOURCE... DIRECTORY
```

## Common Options

### Interactive Options
- `-i, --interactive` - Prompt before overwriting files
- `-n, --no-clobber` - Don't overwrite existing files
- `-f, --force` - Force overwrite without prompting

### Display Options
- `-v, --verbose` - Show files being moved
- `-u, --update` - Move only when source is newer than destination

### Additional Options
- `-b, --backup` - Create backup of existing destination files
- `--backup=CONTROL` - Backup method (simple, numbered, existing)
- `-T, --no-target-directory` - Treat destination as normal file
- `--strip-trailing-slashes` - Remove trailing slashes from source arguments

## Usage Examples

### Basic File Operations
```bash
# Rename a file
mv oldname.txt newname.txt

# Move a file to different directory
mv file.txt /path/to/directory/

# Move and rename simultaneously
mv /path/to/old/file.txt /path/to/new/file.txt

# Move multiple files to directory
mv file1.txt file2.txt file3.txt /path/to/directory/
```

### Directory Operations
```bash
# Rename a directory
mv old_directory new_directory

# Move directory to different location
mv /path/to/source /path/to/destination/

# Move directory and its contents
mv -r source_directory destination/
```

### Safe Operations
```bash
# Prompt before overwriting
mv -i source.txt destination.txt

# Don't overwrite existing files
mv -n source.txt destination.txt

# Create backup before overwriting
mv -b source.txt destination.txt

# Move only if source is newer
mv -u source.txt destination.txt
```

### Verbose Operations
```bash
# Show files being moved
mv -v *.txt /path/to/archive/

# Verbose with interactive prompt
mv -iv important_file.txt backup/
```

## Advanced Usage

### Batch Renaming
```bash
# Rename files with pattern (using rename command is better)
mv file1.txt backup1.txt
mv file2.txt backup2.txt

# Move all files from subdirectories to current directory
mv */* .
```

### Conditional Moving
```bash
# Move only if destination doesn't exist
mv -n source.txt destination.txt

# Move with backup numbering
mv --backup=numbered source.txt destination.txt
```

### Special Scenarios
```bash
# Move file only if it exists
[ -f source.txt ] && mv source.txt backup/

# Move directory contents (not directory itself)
mv source/* destination/

# Force move across filesystems
mv -f /tmp/large_file /home/user/
```

## File System Behavior

### Same Filesystem
- **Fast operation**: Only updates directory entries (inode links)
- **Instant**: No actual data copying occurs
- **Preserves**: All file attributes, permissions, timestamps

### Different Filesystems
- **Slower operation**: Physically copies data then removes original
- **Temporary space**: Requires space on destination filesystem
- **Attributes**: May preserve some attributes depending on filesystem

### Moving vs. Copying
- **mv**: Removes original, updates inode pointers
- **cp**: Creates new copy, preserves original
- **mv is faster** on same filesystem (no data copying)

## Practical Examples

### File Organization
```bash
# Move log files to archive directory
mv *.log /var/log/archive/

# Organize downloads by file type
mv ~/Downloads/*.jpg ~/Pictures/
mv ~/Downloads/*.pdf ~/Documents/

# Move project files to versioned directory
mv project/ project-v1.0/
```

### Backup and Cleanup
```bash
# Move old logs to backup
mv access.log.$(date +%Y%m%d) /backup/logs/

# Clean up temporary files
mv /tmp/temp_file* ~/.trash/

# Archive old project
mv old_project/ archive/2024/
```

### System Administration
```bash
# Move configuration file
mv /etc/app/old.conf /etc/app/new.conf

# Relocate user home directory
mv /home/olduser /home/newuser

# Move web files to new location
mv /var/www/old_site/ /var/www/new_site/
```

## Safety and Best Practices

### Prevent Accidents
```bash
# Always use interactive mode for important files
alias mv='mv -i'

# Test move before executing
echo "Would move: source -> destination"
# Then execute actual mv command
```

### Verification
```bash
# Verify move was successful
ls -l destination/
# Check original location is empty
ls -l source_location/
```

### Large Operations
```bash
# Use verbose for large moves
mv -v /large/directory /new/location/

# Check disk space before moving between filesystems
df -h /source/filesystem /destination/filesystem
```

## Common Use Cases

### File Management
- **Renaming files**: `mv old.txt new.txt`
- **Moving files between directories**: `mv file.txt /path/to/dir/`
- **Batch organization**: `mv *.jpg /pictures/`

### Directory Restructuring
- **Renaming directories**: `mv old_name new_name`
- **Relocating directories**: `mv /path/old /path/new`
- **Consolidating directories**: `mv dir1/* dir2/`

### Maintenance Tasks
- **Archiving old files**: `mv old_logs/ archive/`
- **Cleaning temporary files**: `mv temp/* ~/.trash/`
- **Updating configurations**: `mv config.new config`

## Related Commands

- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`rm`](/docs/commands/file-management/rm) - Remove files and directories
- [`rename`](/docs/commands/file-management/rename) - Rename multiple files
- [`find`](/docs/commands/file-management/find) - Search for files
- [`ln`](/docs/commands/file-management/ln) - Create links

## Troubleshooting

### Common Issues

1. **"Permission denied"**: Check file and directory permissions
2. **"Device or resource busy"**: File is in use by another process
3. **"No space left on device"**: Insufficient disk space on destination
4. **"Cross-device link"**: Moving between different filesystems

### Solutions

```bash
# Check permissions
ls -la /path/to/file
ls -ld /path/to/destination

# Check disk space
df -h

# Force move if necessary
mv -f source destination

# Handle cross-device moves explicitly
cp -r source destination && rm -rf source
```

## Tips and Tricks

1. **Use absolute paths** for scripts to avoid ambiguity
2. **Test with `-n`** to prevent overwriting
3. **Use `-v`** for important operations to track progress
4. **Combine with `find`** for complex moves: `find . -name "*.tmp" -exec mv {} /tmp/ \;`
5. **Create aliases** for common operations

The `mv` command is essential for file system organization in Linux. Understanding its behavior across different filesystems and using appropriate safety options will help prevent data loss and ensure successful file management operations.