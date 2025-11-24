---
title: ln - Create Symbolic Links
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ln - Create Symbolic Links

The `ln` command creates links between files. It can create hard links (multiple names for the same file) and symbolic links (soft links that point to other files or directories). Links are essential for file system organization and creating convenient access paths.

## Basic Syntax

```bash
ln [OPTIONS] TARGET LINK_NAME
ln [OPTIONS] TARGET... DIRECTORY
ln [OPTIONS] -s TARGET LINK_NAME  # For symbolic links
```

## Common Options

### Link Type
- `-s, --symbolic` - Create symbolic links instead of hard links

### Behavior Options
- `-f, --force` - Remove existing destination files
- `-i, --interactive` - Prompt whether to remove destinations
- `-n, --no-dereference` - Treat LINK_NAME as a normal file if it's a symbolic link to a directory
- `-b, --backup` - Make a backup of each existing destination file

### Backup Options
- `-S, --suffix=SUFFIX` - Override the usual backup suffix
- `-t, --target-directory=DIRECTORY` - Specify the DIRECTORY in which to create the links
- `-T, --no-target-directory` - Treat LINK_NAME as a normal file always

### Output Options
- `-v, --verbose` - Print name of each linked file
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Link Types

### Hard Links
- Multiple directory entries pointing to the same inode
- Share the same data blocks on disk
- Cannot cross file system boundaries
- All hard links have equal status - no original vs copy
- Deleting one hard link doesn't affect others

### Symbolic Links
- Separate file that contains a path to another file
- Can point to files on different file systems
- Can point to directories
- Show as link type in file listings
- Target file can be deleted (broken link)

## Usage Examples

### Basic Hard Links
```bash
# Create hard link
ln original.txt link_to_original

# Create hard links in directory
ln *.txt backups/

# Multiple hard links
ln source1.txt source2.txt destination/
```

### Symbolic Links
```bash
# Create symbolic link
ln -s /path/to/original shortcut

# Create symbolic link with relative path
ln -s ../shared/config config

# Create symbolic link to directory
ln -s /var/www/html public_html

# Force overwrite existing link
ln -sf /new/target link_name
```

### Advanced Operations
```bash
# Create link with backup
ln -b original.txt backup_link

# Interactive link creation
ln -i source.txt destination.txt

# Verbose output
ln -v source.txt destination.txt
```

## Practical Examples

### Application Configuration
```bash
# Link configuration files
ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

# Link to user-specific config
ln -s ~/.dotfiles/vimrc ~/.vimrc
ln -s ~/.dotfiles/bashrc ~/.bashrc

# Link development tools
ln -s /opt/nodejs/bin/node /usr/local/bin/node
```

### Web Server Setup
```bash
# Document root links
ln -s /var/www/html/current /var/www/html/live

# Link to shared resources
ln -s /shared/assets /var/www/html/assets

# Version management
ln -s /var/www/releases/v1.2.3 /var/www/html/current
```

### Development Environment
```bash
# Link to source code
ln -s ~/projects/mysite/src ~/dev/mysite

# Link to vendor libraries
ln -s ../vendor/node_modules node_modules

# Link to test data
ln -s /shared/test-data ./data
```

## Directory Linking

### Symbolic Links to Directories
```bash
# Create convenient shortcuts
ln -s /var/log system_logs
ln -s /etc/apache2/sites-available sites

# Link to user directories
ln -s /home/user/documents ~/docs
ln -s /mnt/server/backups backups
```

### Hard Links to Directories (Limited)
```bash
# Hard links to directories are generally not allowed
# This will typically fail for security reasons
ln /home/user /tmp/user_home  # Usually fails

# Use symbolic links for directories instead
ln -s /home/user /tmp/user_home
```

## Link Management

### Checking Links
```bash
# List files showing links
ls -l
# lrwxrwxrwx 1 user user 10 Dec 1 10:30 link -> target

# Find all symbolic links
find . -type l

# Check link target
readlink symbolic_link
```

### Removing Links
```bash
# Remove symbolic link (removes link, not target)
rm symbolic_link

# Remove hard link (removes one reference)
rm hard_link

# Remove broken links
find . -type l -delete  # Or use rm with find
```

### Finding Broken Links
```bash
# Find broken symbolic links
find . -type l ! -exec test -e {} \; -print

# Or using find's test option
find . -type l -brokenlink

# Check specific link
readlink link_name  # Returns target or error if broken
```

## Advanced Usage

### Creating Link Trees
```bash
#!/bin/bash
# setup_dev_links.sh

PROJECT_DIR="$HOME/projects/myproject"
LINK_DIR="$HOME/dev/mysite"

mkdir -p "$LINK_DIR"

# Create symbolic links for project structure
ln -sf "$PROJECT_DIR/src" "$LINK_DIR/src"
ln -sf "$PROJECT_DIR/config" "$LINK_DIR/config"
ln -sf "$PROJECT_DIR/node_modules" "$LINK_DIR/node_modules"

echo "Development links created at $LINK_DIR"
```

### Backup Links
```bash
# Create link with timestamped backup
ln -b --suffix=.backup original.txt new_link.txt

# Custom backup suffix
ln -b --suffix=_old original.txt new_link.txt
```

### Batch Operations
```bash
# Create links for all config files
for file in ~/.dotfiles/.*; do
    basename_file=$(basename "$file")
    if [[ "$basename_file" != "." && "$basename_file" != ".." ]]; then
        ln -sf "$file" "$HOME/$basename_file"
    fi
done
```

## File System Considerations

### Cross-File System Links
```bash
# Symbolic links work across file systems
ln -s /mnt/storage/videos ~/videos

# Hard links don't work across file systems
ln /home/user/file /tmp/file  # Fails if different file systems

# Check file system
df -T /home/user /tmp
```

### Link Counting
```bash
# Check number of hard links
stat -c "%h" filename.txt

# Multiple hard links increase count
ln file.txt hard_link1
ln file.txt hard_link2
stat -c "%h" file.txt  # Will show 3
```

## Security Considerations

### Privileged Links
```bash
# Links to privileged files
ln -s /etc/passwd ~/passwd_link  # User can read system file
# Be careful with this in shared environments

# World-writable directories with links are risky
chmod 777 /shared  # Dangerous if users can create links
```

### Link Following
```bash
# Always follow symbolic links
cd symbolic_link_directory

# Don't follow symbolic links (chroot security)
chroot /newroot
# Links pointing outside chroot won't work
```

## Performance Implications

### Hard Links
- Very fast (just another directory entry)
- No disk space overhead
- Same inode access performance

### Symbolic Links
- Small overhead for path lookup
- Extra inode for the link file
- Additional disk space for path string

## Related Commands

- [`readlink`](/docs/commands/file-management/readlink) - Read symbolic link target
- [`ls`](/docs/commands/file-management/ls) - List directory contents (shows links)
- [`find`](/docs/commands/file-management/find) - Find files including links
- [`stat`](/docs/commands/file-management/stat) - Show file status including link count
- [`unlink`](/docs/commands/file-management/unlink) - Remove file links

## Best Practices

1. **Use symbolic links for directories**:
   - Hard links to directories are restricted
   - Symbolic links are more flexible

2. **Use absolute paths for reliability**:
   - `ln -s /absolute/path link` vs relative paths

3. **Check for broken links regularly**:
   - `find . -type l ! -exec test -e {} \;`

4. **Use descriptive link names**:
   - `ln -s /var/log system_logs` not just `logs`

5. **Be careful with world-writable directories**:
   - Users can create links to privileged files

6. **Use force option carefully**:
   - `ln -sf` overwrites existing files without warning

7. **Document link structures**:
   - Link trees can be confusing without documentation

Links are powerful tools for file system organization, but they require careful management to avoid confusion and security issues. Understanding the differences between hard and symbolic links is essential for effective Linux system administration.