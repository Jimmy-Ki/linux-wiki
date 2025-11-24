---
title: cp - Copy Files and Directories
sidebar_label: cp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cp - Copy Files and Directories

The `cp` command copies files and directories from a source to a destination. It's one of the essential file management commands in Linux for duplicating and backing up data.

## Basic Syntax

```bash
cp [OPTIONS] SOURCE DESTINATION
cp [OPTIONS] SOURCE... DIRECTORY
```

## Common Options

### Basic Options
- `-i, --interactive` - Prompt before overwriting files
- `-r, -R, --recursive` - Copy directories recursively
- `-v, --verbose` - Show files being copied
- `-n, --no-clobber` - Don't overwrite existing files
- `-u, --update` - Copy only when source is newer than destination
- `-f, --force` - Force overwrite by deleting destination files

### Attributes and Permissions
- `-p, --preserve` - Preserve file attributes (permissions, timestamps)
- `-a, --archive` - Archive mode (preserve all attributes, recursive)
- `--preserve=ATTRIBUTES` - Preserve specified attributes
- `--no-preserve=ATTRIBUTES` - Don't preserve specified attributes

### Additional Options
- `-l, --link` - Create hard links instead of copying
- `-s, --symbolic-link` - Create symbolic links instead of copying
- `-b, --backup` - Create backups of existing files
- `--backup=CONTROL` - Backup method (simple, numbered, existing)
- `-x, --one-file-system` - Stay on this file system

## Usage Examples

### Basic File Copying
```bash
# Copy a file to current directory
cp /path/to/source.txt .

# Copy and rename a file
cp oldfile.txt newfile.txt

# Copy multiple files to a directory
cp file1.txt file2.txt /path/to/directory/

# Copy all .txt files
cp *.txt /path/to/backup/
```

### Directory Copying
```bash
# Copy entire directory (recursive)
cp -r /path/to/source /path/to/destination

# Copy directory preserving all attributes
cp -a /path/to/source /path/to/destination

# Copy directory contents (not the directory itself)
cp -r /path/to/source/* /path/to/destination/
```

### Interactive Copying
```bash
# Prompt before overwriting files
cp -i source.txt destination.txt

# Don't overwrite existing files
cp -n source.txt destination.txt

# Copy only if source is newer
cp -u source.txt destination.txt
```

### Preserving Attributes
```bash
# Preserve permissions and timestamps
cp -p source.txt destination.txt

# Archive mode (recursive, preserve all attributes)
cp -a /path/to/source /path/to/destination

# Copy preserving only ownership
cp --preserve=ownership source.txt destination.txt
```

### Backup and Safety
```bash
# Create backup of existing destination file
cp -b source.txt destination.txt

# Create numbered backups
cp --backup=numbered source.txt destination.txt

# Force overwrite (no prompts)
cp -f source.txt destination.txt
```

### Link Creation
```bash
# Create hard link instead of copying
cp -l source.txt hardlink.txt

# Create symbolic link
cp -s source.txt symlink.txt
```

## Advanced Usage

### Copy with Progress and Filtering
```bash
# Verbose copy with progress
cp -rv /path/to/large/directory /path/to/backup/

# Copy files matching pattern
cp -r src/*.jpg /path/to/images/

# Copy excluding certain files (requires find)
find /path/to/source -name "*.txt" -exec cp {} /path/to/dest \;
```

### Remote Copying (with rsync)
```bash
# Better alternative for remote copying
rsync -av /path/to/source/ user@remote:/path/to/destination/
```

## File Attributes Preserved

When using `-p` or `-a` options, `cp` preserves:
- **File permissions** (mode bits)
- **Ownership** (user and group)
- **Timestamps** (access and modification times)
- **Extended attributes** (on systems that support them)
- **Links** (when using `-a`)

## Common Use Cases

### Backup Creation
```bash
# Create quick backup of config file
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Backup entire user directory
cp -a /home/user /backup/user-$(date +%Y%m%d)
```

### File Deployment
```bash
# Deploy website files
cp -rv /project/build/* /var/www/html/

# Copy application files with permissions preserved
cp -a /opt/app/* /opt/app-new/
```

### Template Creation
```bash
# Copy template file for new project
cp /templates/project-template /projects/new-project

# Copy configuration template
cp /etc/skel/.bashrc ~/.bashrc
```

## Safety Tips

1. **Always use `-i` for important files**:
   ```bash
   alias cp='cp -i'
   ```

2. **Test with `-n` before overwriting**:
   ```bash
   cp -n source destination  # Safe, won't overwrite
   ```

3. **Use `-v` for important operations**:
   ```bash
   cp -rv important-data/ backup/
   ```

4. **Verify copies**:
   ```bash
   # Compare source and destination
   diff -r source/ destination/
   ```

## Related Commands

- [`mv`](/docs/commands/file-management/mv) - Move or rename files
- [`rm`](/docs/commands/file-management/rm) - Remove files and directories
- [`rsync`](/docs/commands/networking/rsync) - Sync files remotely
- [`dd`](/docs/commands/file-management/dd) - Convert and copy files
- [`find`](/docs/commands/file-management/find) - Search for files

## Common Pitfalls

1. **Forgetting `-r` for directories**: Results in "omitting directory" error
2. **Overwriting important files**: Use `-i` to avoid accidents
3. **Permission issues**: Ensure you have read permissions for source and write permissions for destination
4. **Cross-filesystem copying**: Some attributes may not be preserved
5. **Large file operations**: Consider using `rsync` for better progress reporting

The `cp` command is fundamental for file management in Linux. Understanding its options and using appropriate safety measures will help prevent data loss and ensure successful file operations.