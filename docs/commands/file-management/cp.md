---
title: cp - Copy Files and Directories
sidebar_label: cp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cp - Copy Files and Directories

The `cp` command is one of the most fundamental and frequently used utilities in Linux/Unix systems for copying files and directories between locations. It provides extensive options for controlling how files are copied, including preservation of attributes, recursive directory copying, backup creation, and interactive operations. Beyond simple file duplication, `cp` can handle complex scenarios such as cross-filesystem operations, attribute preservation, link creation, and batch processing, making it an essential tool for system administration, backup operations, and file management workflows.

## Basic Syntax

```bash
cp [OPTIONS] SOURCE DESTINATION
cp [OPTIONS] SOURCE... DIRECTORY
cp [OPTIONS] -t DIRECTORY SOURCE...
```

## Complete Options Reference

### Basic Copying Options
- `-i, --interactive` - Prompt before overwriting existing files
- `-n, --no-clobber` - Do not overwrite existing files
- `-f, --force` - Force overwrite existing files without prompt
- `-u, --update` - Copy only when source file is newer than destination
- `-v, --verbose` - Verbose output, showing files being copied
- `-b, --backup[=CONTROL]` - Create backups of existing destination files
- `-S, --suffix=SUFFIX` - Override usual backup suffix
- `--remove-destination` - Remove each existing destination file before copying
- `--sparse[=WHEN]` - Handle sparse files efficiently
- `--reflink[=WHEN]` - Control clone/CoW copies

### Directory and Recursive Options
- `-r, -R, --recursive` - Copy directories recursively
- `-a, --archive` - Archive mode, equivalent to -dR --preserve=all
- `-d` - Preserve links (same as --no-dereference --preserve=links)
- `-H, --dereference-args` - Follow symbolic links on command line
- `-L, --dereference` - Always follow symbolic links
- `-P, --no-dereference` - Never follow symbolic links

### Attribute Preservation Options
- `-p, --preserve[=ATTRIBUTES]` - Preserve specified attributes
- `--no-preserve=ATTRIBUTES` - Don't preserve specified attributes
- `--preserve=all` - Preserve all file attributes (default for -a)
- `--preserve=mode,ownership,timestamps` - Preserve permissions, ownership, timestamps
- `--preserve=context,links,xattr` - Preserve SELinux context, links, extended attributes
- `--parents` - Use full source file name under DIRECTORY

### Filesystem and Cross-device Options
- `-x, --one-file-system` - Stay on this file system only
- `--reflink[=WHEN]` - Perform copy-on-write (clone) when possible
- `--sparse=WHEN` - Control sparse file creation (never, auto, always)

### Link Creation Options
- `-l, --link` - Create hard links instead of copying
- `-s, --symbolic-link` - Create symbolic links instead of copying
- `--symbolic-link[=WHEN]` - Control symbolic link creation

### Special Purpose Options
- `-T, --no-target-directory` - Treat DEST as a normal file
- `-t, --target-directory=DIRECTORY` - Copy all SOURCE arguments into DIRECTORY
- `--help` - Display help information
- `--version` - Display version information

### Backup Control Options
- `--backup=CONTROL` - Backup method (none, off, simple, never, numbered, t, existing, nil)
- `--copy-contents` - Copy contents of special files when recursive

## Usage Examples

### Basic File Operations

#### Simple File Copying
```bash
# Copy single file to new location
cp source.txt destination.txt

# Copy file to current directory
cp /path/to/remote/file.txt .

# Copy file to different directory
cp document.txt /home/user/documents/

# Copy multiple files to directory
cp file1.txt file2.txt file3.txt /backup/directory/

# Copy files with wildcard patterns
cp *.txt /text_files/
cp image.{jpg,png,gif} /images/
cp config_*.conf /configs/
```

#### File Renaming During Copy
```bash
# Copy and rename file
cp old_config.txt new_config.txt

# Copy with timestamp in name
cp document.txt document_$(date +%Y%m%d).txt

# Copy multiple files with pattern matching
for file in *.log; do cp "$file" "${file%.log}_backup.log"; done

# Copy with systematic naming
cp input.txt output_version_1.txt
```

### Directory Operations

#### Complete Directory Copying
```bash
# Copy entire directory recursively
cp -r source_directory destination_directory

# Copy directory with all attributes preserved
cp -a /home/user /backup/user_backup

# Copy directory contents (excluding the directory itself)
cp -r source_directory/* destination_directory/

# Copy directory with different name
cp -r /path/to/project /path/to/project_copy
```

#### Directory Structure Manipulation
```bash
# Copy directory preserving permissions
cp -rp /data /backup/

# Copy directory without following symbolic links
cp -rP /with_links /without_links/

# Copy directory to parent with new name
cp -r current_project ../project_backup_$(date +%Y%m%d)

# Create template directory copy
cp -r /template/new_project /projects/$(date +%H%M%S)_new_project
```

### Advanced Attribute Management

#### Comprehensive Attribute Preservation
```bash
# Archive mode - preserves everything
cp -a /source /destination

# Preserve specific attributes only
cp --preserve=mode,ownership,timestamps source.txt dest.txt

# Preserve extended attributes and ACLs
cp -a --preserve=xattr,acl source.txt dest.txt

# Copy with SELinux context preservation
cp --preserve=context source.txt dest.txt

# Copy without preserving any attributes
cp --no-preserve=all source.txt dest.txt
```

#### Permissions and Ownership Control
```bash
# Copy with permission preservation
cp -p script.sh script_copy.sh

# Copy maintaining ownership
cp --preserve=ownership config.txt new_config.txt

# Copy with specific ownership change
sudo cp config.txt /etc/ && sudo chown root:root /etc/config.txt

# Copy and set executable permissions
cp script.sh new_script.sh && chmod +x new_script.sh
```

### Interactive and Safe Copying

#### Confirmation and Safety Mechanisms
```bash
# Interactive mode - prompt before overwrite
cp -i important_file.txt backup_file.txt

# Never overwrite existing files
cp -n new_config.conf /etc/new_config.conf

# Update only newer files
cp -u /source/* /backup/

# Force overwrite without prompts (use with caution)
cp -f source.txt destination.txt

# Create backups before overwriting
cp -b existing_file.txt updated_file.txt
```

#### Backup Creation Strategies
```bash
# Create simple backup (~ suffix)
cp --backup=simple file.txt file.txt

# Create numbered backups
cp --backup=numbered config.txt config.txt
# Results: config.txt, config.txt.~1~, config.txt.~2~

# Create existing backups
cp --backup=existing file.txt file.txt

# Custom backup suffix
cp --suffix=.bak file.txt file.txt

# Complex backup strategy
cp --backup=numbered --suffix=.old source.txt destination.txt
```

### Link-Based Operations

#### Hard Link Creation
```bash
# Create hard link instead of copying
cp -l original.txt hardlink.txt

# Create multiple hard links
cp -l source.txt link1.txt link2.txt link3.txt

# Copy directory with hard links
cp -al source_directory hardlinked_directory

# Create hard links to preserve space
cp -l --preserve=all source.txt backup_link.txt
```

#### Symbolic Link Management
```bash
# Create symbolic links instead of copying
cp -s original.txt symlink.txt

# Create absolute symbolic links
cp -s /absolute/path/original.txt symlink.txt

# Copy directory with symbolic links
cp -as source_directory symlinks_directory

# Convert files to symbolic links
cp -s --remove-destination source.txt /path/to/link.txt
```

### Sparse and Special File Handling

#### Sparse File Management
```bash
# Handle sparse files efficiently
cp --sparse=always sparse_file.img sparse_copy.img

# Detect and preserve sparsity
cp --sparse=auto disk_image.img backup_image.img

# Never create sparse files
cp --sparse=never large_file.dat copy.dat

# Copy virtual machine images
cp --sparse=always vm_disk.img vm_backup.img
```

#### Copy-on-Write Operations
```bash
# Use copy-on-write when available
cp --reflink=always large_file.txt fast_copy.txt

# Fall back to normal copy if CoW not available
cp --reflink=auto source.txt dest.txt

# Never use copy-on-write
cp --reflink=never source.txt dest.txt

# Clone large directories when filesystem supports it
cp --reflink=always -r source_directory destination_directory
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# Create configuration file backup
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d)

# Copy configuration templates
cp /etc/skel/.bashrc /home/newuser/.bashrc

# Update configuration with backup
cp -b /etc/hosts /etc/hosts.bak && echo "127.0.0.1 newhost" >> /etc/hosts

# Copy SSL certificates with permissions
cp -a /ssl/old/* /ssl/new/

# System-wide configuration deployment
sudo cp -rv /staging/config/* /etc/
```

#### User and Home Directory Management
```bash
# Create user home from skeleton
sudo cp -r /etc/skel /home/newuser && sudo chown -R newuser:newuser /home/newuser

# Backup user directory with all attributes
sudo cp -a /home/username /backup/home/

# Copy user data to new system
cp -a --preserve=xattr /home/user/* /new/home/user/

# Migrate user profiles
sudo cp -rp /home/olduser/* /home/newuser/ && sudo chown -R newuser:newuser /home/newuser/
```

#### Log File Management
```bash
# Rotate and copy log files
sudo cp /var/log/syslog /var/log/syslog.$(date +%Y%m%d) && sudo truncate -s 0 /var/log/syslog

# Copy application logs to archive
sudo cp -a --preserve=timestamps /var/log/app/ /archive/logs/$(date +%Y%m%d)/

# Create log analysis copy
cp /var/log/apache2/access.log /tmp/access_analysis.log

# Copy logs for remote processing
cp --reflink=always /var/log/large_app.log /remote_share/processed_logs/
```

### Development and Deployment

#### Application Deployment
```bash
# Deploy application files
sudo cp -rv /build/* /var/www/html/

# Copy with ownership preservation
sudo cp -a --preserve=ownership /app/files/* /opt/app/

# Update configuration files with backup
sudo cp -b /app/config/production.conf /app/config/

# Deploy database scripts
cp -rv /database/migrations/* /opt/app/db/migrations/

# Copy static assets
cp -rv /frontend/dist/* /var/www/static/
```

#### Source Code Management
```bash
# Create project template
cp -r /project_template /projects/new_project

# Copy source code for packaging
cp -rv --exclude=.git --exclude=node_modules src/ package/src/

# Backup source code before major changes
cp -a /current_project/ /backup/project_$(date +%Y%m%d_%H%M%S)/

# Copy specific file types for analysis
find /src -name "*.py" -exec cp {} /python_analysis/ \;
```

#### Build System Integration
```bash
# Copy compiled files to release directory
cp -rv build/release/* /releases/v1.0/

# Copy test results
cp -rv test-results/ /reports/test_run_$(date +%Y%m%d)/

# Create distribution package
cp -a --parents src/modules/*.py dist/

# Copy documentation
cp -rv docs/_build/html/ /var/www/docs/
```

### Data Processing and Analysis

#### Dataset Management
```bash
# Copy large datasets with sparse handling
cp --sparse=always dataset.raw analysis_dataset.raw

# Create data backup with compression preparation
cp -a --preserve=timestamps /data/current/ /backup/data_raw/

# Copy data samples for processing
cp /large_dataset/records_*.csv /samples/

# Copy database dumps
cp database_backup.sql.gz /remote_storage/
```

#### File Organization
```bash
# Organize files by date
find /downloads -name "*.pdf" -exec cp {} /documents/pdf/$(date -r {} +%Y%m)/ \;

# Create file categorization copy
for file in *.txt; do
    case "$file" in
        *report*) cp "$file" /reports/ ;;
        *invoice*) cp "$file" /invoices/ ;;
        *contract*) cp "$file" /contracts/ ;;
    esac
done

# Duplicate directory structure
find /source -type d | xargs -I {} mkdir -p /dest/{}
```

### Backup and Recovery

#### System Backup Operations
```bash
# Complete system configuration backup
sudo cp -a /etc /backup/etc_$(date +%Y%m%d)

# User data incremental backup
cp -au /home/user/* /backup/user/

# Application backup with all attributes
cp -a --preserve=all /opt/application/ /backup/app_$(date +%Y%m%d)/

# Selective file backup
find /important -name "*.conf" -mtime -7 -exec cp -p {} /backup/configs/ \;
```

#### Recovery Operations
```bash
# Restore from backup
cp -a /backup/etc/hosts /etc/hosts

# Restore user files with ownership
sudo cp -a /backup/user/home/username/ /home/

# Rollback configuration
cp -p /backup/nginx.conf.20231128 /etc/nginx/nginx.conf

# Restore specific files
cp /backup/$(date --date="yesterday" +%Y%m%d)/important_file.txt /current/
```

## Advanced Techniques

### Performance Optimization

#### Large File Operations
```bash
# Use copy-on-write for large files when supported
cp --reflink=always huge_dataset.img backup_dataset.img

# Parallel copying with GNU parallel
find /source -type f | parallel -j 4 cp {} /destination/

# Monitor copy progress
cp -rv large_directory/ backup/ | pv -l > /dev/null

# Batch copying with progress indication
for dir in */; do
    echo "Copying $dir"
    cp -rv "$dir" /backup/ | wc -l
done
```

#### Memory and I/O Optimization
```bash
# Optimize for different storage types
cp --sparse=always vm_disk.img ssd_backup.img

# Use appropriate buffer sizes for network copies
cp /local/file.txt /network/share/ && sync

# Handle files with special attributes
cp -a --preserve=xattr files_with_extended_attributes/ backup/

# Minimize I/O for incremental copies
cp -au --no-preserve=timestamps /source/ /incremental_backup/
```

### Cross-Filesystem Operations

#### Handling Different Filesystems
```bash
# Copy between different filesystems with attribute handling
cp -a --no-preserve=ownership /source /different_filesystem/destination

# Handle filesystem-specific features
sudo cp -a --preserve=context,xattr /selinux_files/ /ext4_backup/

# Copy to network filesystems
cp -a --preserve=timestamps /local/data/ /network/share/

# Handle filesystem limitations
cp --preserve=mode,timestamps /source/* /fat32_destination/
```

### Automation and Scripting

#### Intelligent Copy Scripts
```bash
#!/bin/bash
# Smart backup script with validation

smart_backup() {
    local source="$1"
    local destination="$2"
    local backup_dir="${destination}/$(date +%Y%m%d_%H%M%S)"

    # Create backup directory
    mkdir -p "$backup_dir"

    # Perform copy with verification
    if cp -av "$source" "$backup_dir"; then
        echo "Backup successful: $backup_dir"

        # Verify copy integrity
        if diff -rq "$source" "$backup_dir/$(basename "$source")"; then
            echo "Backup verified successfully"
        else
            echo "Warning: Backup verification failed"
        fi
    else
        echo "Error: Backup failed"
        return 1
    fi
}

# Usage
smart_backup /home/user/documents /backup/user/
```

#### Batch Processing Scripts
```bash
#!/bin/bash
# Organize files by type and date

organize_files() {
    local source_dir="$1"
    local base_dest="$2"
    local date=$(date +%Y%m)

    mkdir -p "$base_dest/$date"

    for file in "$source_dir"/*; do
        if [ -f "$file" ]; then
            case "${file##*.}" in
                jpg|jpeg|png|gif)
                    dest_dir="$base_dest/$date/images"
                    ;;
                pdf|doc|docx)
                    dest_dir="$base_dest/$date/documents"
                    ;;
                mp4|avi|mkv)
                    dest_dir="$base_dest/$date/videos"
                    ;;
                *)
                    dest_dir="$base_dest/$date/other"
                    ;;
            esac

            mkdir -p "$dest_dir"
            cp -p "$file" "$dest_dir/"
            echo "Copied $(basename "$file") to $dest_dir"
        fi
    done
}
```

### Special File Handling

#### Device Files and Special Files
```bash
# Copy device information (not device files themselves)
cp -a --attributes-only /dev/sda1 device_info.txt

# Handle FIFO pipes and sockets
cp -a --preserve=context /var/run/app.sock /backup/

# Copy file contents from special files
cp /proc/version system_version.txt

# Handle character and block devices carefully
sudo cp -a --preserve=all /dev/null /dev/null_backup
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Problems
```bash
# Handle permission denied errors
sudo cp -a /restricted/file.txt /accessible/

# Preserve ownership when copying to different system
sudo cp -a --preserve=ownership /source/* /destination/

# Fix permissions after copy
sudo cp -r /source/ /dest/ && sudo chown -R user:group /dest/

# Copy with specific permissions
cp source.txt dest.txt && chmod 644 dest.txt
```

#### Disk Space Issues
```bash
# Check available space before copying
available_space=$(df -BG . | awk 'NR==2 {print $4}' | tr -d 'G')
required_space=$(du -BG source/ | tail -1 | cut -f1 | tr -d 'G')

if [ "$available_space" -gt "$required_space" ]; then
    cp -r source/ destination/
else
    echo "Insufficient disk space"
fi

# Compress during copy to save space
cp source.txt >(gzip > destination.txt.gz)
```

#### Cross-Platform Compatibility
```bash
# Handle filename character limitations
cp --preserve=timestamps source.txt "destination_with_spaces.txt"

# Convert line endings during copy
cp source.txt dest.txt && unix2dos dest.txt

# Handle case-insensitive filesystems
cp -i source.txt Destination.txt
```

### Performance Issues

#### Large Directory Structures
```bash
# Use find for selective copying
find /source -name "*.important" -exec cp -p {} /dest/ \;

# Parallel copy with xargs
find /source -type f -print0 | xargs -0 -P 4 -I {} cp {} /dest/

# Copy with progress monitoring
total_files=$(find /source -type f | wc -l)
current=0
find /source -type f -exec cp -v {} /dest/ \; | while read line; do
    ((current++))
    echo "Progress: $current/$total_files ($(( current * 100 / total_files ))%)"
done
```

## Related Commands

- [`mv`](/docs/commands/file-management/mv) - Move or rename files and directories
- [`rm`](/docs/commands/file-management/rm) - Remove files and directories
- [`rsync`](/docs/commands/networking/rsync) - Remote file synchronization with delta transfer
- [`dd`](/docs/commands/file-management/dd) - Convert and copy files at block level
- [`find`](/docs/commands/file-management/find) - Search for files and execute commands
- [`tar`](/docs/commands/compression/tar) - Archive utility for copying directory structures
- [`install`](/docs/commands/file-management/install) - Copy files and set attributes
- [`cpio`](/docs/commands/file-management/cpio) - Copy files to and from archives

## Best Practices

1. **Use archive mode (-a)** for directory backups to preserve all attributes
2. **Enable interactive mode (-i)** for important operations to prevent accidents
3. **Test with dry runs** using `echo cp ...` before executing large operations
4. **Verify copies** with `diff` or checksums for critical data
5. **Use appropriate backup strategies** with `-b` and `--backup` options
6. **Consider cross-filesystem implications** when copying between different storage types
7. **Monitor disk space** during large copy operations
8. **Use verbose mode (-v)** for important operations to track progress
9. **Handle permissions carefully** when copying between users or systems
10. **Use `-n` option** to safely copy without overwriting existing files

## Performance Tips

1. **Use copy-on-write (--reflink=always)** when filesystem supports it for instant copies
2. **Handle sparse files efficiently** with `--sparse` options for virtual machine images
3. **Parallel operations** with GNU Parallel or xargs for multiple file copies
4. **Use `rsync`** for network operations or incremental backups
5. **Batch small files** to reduce filesystem overhead
6. **Consider filesystem characteristics** when copying between different storage types
7. **Use appropriate buffer sizes** for network or slow storage operations
8. **Monitor I/O bandwidth** to avoid system overload during large copies

The `cp` command is an essential tool that forms the foundation of file management in Linux systems. Its extensive options provide powerful capabilities for data duplication, backup creation, and file organization, making it indispensable for system administration, development workflows, and data management tasks.