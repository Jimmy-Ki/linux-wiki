---
title: mv - Move or Rename Files and Directories
sidebar_label: mv
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mv - Move or Rename Files and Directories

The `mv` command is a fundamental utility in Linux/Unix systems for moving and renaming files and directories. It operates by either updating directory entries (inode links) when moving within the same filesystem, or by copying data and removing the original when moving across different filesystems. Beyond simple relocation, `mv` provides safety mechanisms, backup options, and batch processing capabilities that make it essential for file system organization, data management, and system administration tasks.

## Basic Syntax

```bash
mv [OPTIONS] SOURCE DESTINATION
mv [OPTIONS] SOURCE... DIRECTORY
mv [OPTIONS] -t DIRECTORY SOURCE...
```

## Complete Options Reference

### Safety and Interactive Options
- `-i, --interactive` - Prompt before overwriting existing files
- `-n, --no-clobber` - Do not overwrite existing files
- `-f, --force` - Force overwrite existing files without prompt
- `-u, --update` - Move only when source is newer than destination or destination missing
- `--strip-trailing-slashes` - Remove trailing slashes from source arguments

### Display and Information Options
- `-v, --verbose` - Verbose output, showing files being moved
- `-h, --help` - Display help information
- `--version` - Display version information

### Backup and Recovery Options
- `-b, --backup[=CONTROL]` - Create backups of existing destination files
- `-S, --suffix=SUFFIX` - Override usual backup suffix
- `--backup=CONTROL` - Backup method (none, off, simple, never, numbered, t, existing, nil)

### Directory Handling Options
- `-T, --no-target-directory` - Treat DEST as a normal file
- `-t, --target-directory=DIRECTORY` - Move all SOURCE arguments into DIRECTORY

### Special Purpose Options
- `-Z, --context` - Set SELinux security context of destination file to default type

## Usage Examples

### Basic File Operations

#### Simple File Moving
```bash
# Rename a single file
mv oldname.txt newname.txt

# Move file to different directory
mv document.txt /home/user/documents/

# Move and rename simultaneously
mv /path/to/old/file.txt /path/to/new/renamed_file.txt

# Move multiple files to directory
mv file1.txt file2.txt file3.txt /archive/directory/

# Move files with wildcard patterns
mv *.log /var/log/archive/
mv image_{001,002,003}.jpg /photos/
mv config_*.conf /etc/new_config/
```

#### Pattern-Based Operations
```bash
# Move files matching specific patterns
mv *[0-9]*.log /numeric_logs/
mv backup_$(date +%Y%m%d)*.tar.gz /current_backups/

# Move files with specific extensions
mv *.pdf /documents/pdf/
mv *.jpg *.png *.gif /images/
mv {*.c,*.h,*.cpp} /source_code/

# Move files based on size (using find)
find . -size +100M -exec mv {} /large_files/ \;
```

### Directory Operations

#### Directory Relocation
```bash
# Rename a directory
mv old_project new_project

# Move directory to different location
mv /home/user/old_projects /backup/archived_projects/

# Move directory and all contents
mv -r source_directory destination_directory/

# Move directory to parent with new name
mv current_project ../archived_project_$(date +%Y%m%d)

# Flatten directory structure
mv source_directory/* destination_directory/
```

#### Complex Directory Restructuring
```bash
# Move multiple directories to new location
mv project_1 project_2 project_3 /archived_projects/

# Reorganize directory tree
mv data/raw/* data/processed/
mv logs/old/* logs/archive/

# Create directory hierarchy move
for year in 2020 2021 2022 2023; do
    mv logs/$year/* logs/archive/$year/
done

# Move subdirectories to level up
find . -maxdepth 2 -type d -name "backup_*" -exec mv {} ../archive/ \;
```

### Safe Moving Operations

#### Interactive Protection
```bash
# Prompt before overwriting existing files
mv -i important_config.txt backup_config.txt

# Never overwrite existing files
mv -n source.txt destination.txt

# Move only if source is newer than destination
mv -u updated_script.sh /usr/local/bin/script.sh

# Force move without prompts (use carefully)
mv -f source.txt destination.txt

# Combined safety options
mv -ivu critical_data.* /backup/
```

#### Backup Creation Strategies
```bash
# Create backup before overwriting
mv -b existing_file.txt new_file.txt
# Result: existing_file.txt and existing_file.txt~

# Create numbered backups
mv --backup=numbered config.txt config.txt
# Results: config.txt, config.txt.~1~, config.txt.~2~

# Create backups with custom suffix
mv --suffix=.bak important.conf important.conf

# Smart backup strategy
mv --backup=existing --suffix=.old source.txt destination.txt

# Directory move with backup
mv -bv old_project/ new_project/
```

### Advanced Moving Techniques

#### Batch and Conditional Operations
```bash
# Move files based on modification time
find /tmp -mtime +7 -exec mv {} /archive/ \;

# Move files matching multiple criteria
find . -name "*.log" -size +1M -exec mv {} /large_logs/ \;

# Move with complex conditional logic
for file in *.txt; do
    if [[ "$file" == *"important"* ]]; then
        mv "$file" /critical_docs/
    else
        mv "$file" /regular_docs/
    fi
done

# Move files preserving directory structure
find source/ -name "*.py" -exec bash -c 'dest="dest/${1#source/}"; mkdir -p "$(dirname "$dest")"; mv "$1" "$dest"' _ {} \;
```

#### Cross-Filesystem Operations
```bash
# Force move across filesystems (automatic)
mv /tmp/large_file /home/user/

# Explicit cross-filesystem move with verification
cp -a /source /destination && rm -rf /source

# Move large directories across filesystems with progress
rsync -av --progress /source/ /destination/ && rm -rf /source/

# Move to network filesystem
mv -v /local/data /network/storage/
```

## Practical Examples

### File Organization and Management

#### Automated File Organization
```bash
# Organize downloads by file type
organize_downloads() {
    cd ~/Downloads

    # Move images
    mv *.jpg *.jpeg *.png *.gif ~/Pictures/ 2>/dev/null

    # Move documents
    mv *.pdf *.doc *.docx *.txt ~/Documents/ 2>/dev/null

    # Move videos
    mv *.mp4 *.avi *.mkv *.mov ~/Videos/ 2>/dev/null

    # Move archives
    mv *.zip *.tar.gz *.rar ~/Archives/ 2>/dev/null

    echo "Downloads organized successfully"
}

# Organize project files by date
organize_by_date() {
    for file in project_*; do
        date=$(date -r "$file" +%Y-%m)
        mkdir -p "$date"
        mv "$file" "$date/"
    done
}
```

#### Log File Management
```bash
# Rotate and archive log files
rotate_logs() {
    local log_dir="$1"
    local archive_dir="$2"
    local date=$(date +%Y%m%d)

    mkdir -p "$archive_dir/$date"

    # Move current logs to archive
    mv -v "$log_dir"/*.log "$archive_dir/$date/"

    # Move compressed logs
    mv -v "$log_dir"/*.log.* "$archive_dir/$date/"

    echo "Logs archived to $archive_dir/$date"
}

# Clean up temporary files
cleanup_temp() {
    local temp_dirs="/tmp /var/tmp"

    for dir in $temp_dirs; do
        find "$dir" -name "temp_*" -mtime +1 -exec mv {} ~/.trash/ \;
        find "$dir" -name "*.tmp" -mtime +7 -exec mv {} ~/.trash/ \;
    done

    echo "Temporary files cleaned up"
}
```

### System Administration

#### Configuration Management
```bash
# Update configuration with backup
update_config() {
    local config_file="$1"
    local new_config="$2"
    local backup_dir="/etc/config_backups"

    mkdir -p "$backup_dir"

    # Backup current config with timestamp
    mv -b "$config_file" "$backup_dir/$(basename "$config_file").$(date +%Y%m%d_%H%M%S)"

    # Move new config into place
    mv "$new_config" "$config_file"

    echo "Configuration updated: $config_file"
}

# Relocate user home directory
relocate_user() {
    local old_home="$1"
    local new_home="$2"
    local username="$3"

    # Check if user exists
    if id "$username" >/dev/null 2>&1; then
        echo "Moving home directory for $username"

        # Create backup
        mv -b "$old_home" "${old_home}.backup"

        # Move to new location
        sudo mv "$old_home" "$new_home"

        # Update user database
        sudo usermod -d "$new_home" "$username"

        echo "Home directory moved to $new_home"
    else
        echo "User $username not found"
        return 1
    fi
}
```

#### Service and Application Management
```bash
# Move application files with service restart
move_app_files() {
    local source="/opt/app/old_version"
    local destination="/opt/app/current_version"
    local service_name="myapp"

    # Stop service
    sudo systemctl stop "$service_name"

    # Backup current version
    sudo mv -b "$destination" "${destination}.backup"

    # Move new version
    sudo mv "$source" "$destination"

    # Fix permissions
    sudo chown -R app:app "$destination"

    # Start service
    sudo systemctl start "$service_name"

    echo "Application updated successfully"
}

# Move web content with Apache restart
move_web_content() {
    local source_dir="$1"
    local dest_dir="/var/www/html"
    local backup_dir="/var/www/backup"

    # Create backup
    sudo mkdir -p "$backup_dir"
    sudo mv -b "$dest_dir"/* "$backup_dir/"

    # Move new content
    sudo mv "$source_dir"/* "$dest_dir/"

    # Set correct permissions
    sudo chown -R www-data:www-data "$dest_dir"

    # Restart web server
    sudo systemctl reload apache2

    echo "Web content updated"
}
```

### Data Processing and Analysis

#### Dataset Management
```bash
# Move processed data to archive
archive_processed_data() {
    local source_dir="$1"
    local archive_base="$2"
    local date=$(date +%Y%m%d)

    local archive_dir="$archive_base/processed_$date"
    mkdir -p "$archive_dir"

    # Move processed files
    find "$source_dir" -name "*_processed.*" -exec mv {} "$archive_dir/" \;

    # Create manifest
    ls -la "$archive_dir" > "$archive_dir/manifest.txt"

    echo "Processed data archived to $archive_dir"
}

# Move data by category
categorize_and_move() {
    local data_dir="$1"

    cd "$data_dir"

    # Move financial data
    mv *{finance,financial,money}* /data/finance/ 2>/dev/null

    # Move customer data
    mv *{customer,client,user}* /data/customers/ 2>/dev/null

    # Move product data
    mv *{product,item,inventory}* /data/products/ 2>/dev/null

    echo "Data categorized and moved"
}
```

#### Backup and Archive Operations
```bash
# Create incremental backup using mv
incremental_backup() {
    local source="$1"
    local backup_base="$2"
    local date=$(date +%Y%m%d)
    local marker_file="$backup_base/.last_backup"

    local backup_dir="$backup_base/incremental_$date"
    mkdir -p "$backup_dir"

    # Find files newer than last backup
    find "$source" -newer "$marker_file" -exec mv {} "$backup_dir/" \;

    # Update marker
    touch "$marker_file"

    echo "Incremental backup created: $backup_dir"
}

# Archive old project files
archive_old_projects() {
    local projects_dir="$1"
    local archive_dir="$2"
    local days_old=90

    find "$projects_dir" -maxdepth 1 -type d -mtime +$days_old | while read project; do
        project_name=$(basename "$project")
        echo "Archiving project: $project_name"
        mv "$project" "$archive_dir/"
    done
}
```

## Advanced Techniques

### Performance Optimization

#### Large File Operations
```bash
# Use verbose mode for monitoring progress
mv -v /very/large/directory /new/location/

# Move files in parallel (advanced)
parallel_mv() {
    local source_dir="$1"
    local dest_dir="$2"
    local jobs=4

    find "$source_dir" -type f -print0 | parallel -0 -j $jobs mv {} "$dest_dir/"
}

# Move with progress monitoring
mv_with_progress() {
    local source="$1"
    local destination="$2"

    total_files=$(find "$source" -type f | wc -l)
    current=0

    find "$source" -type f -exec bash -c '
        file="$1"
        dest="$2"
        echo "$((++current))/$total_files: $(basename "$file")"
        mv "$file" "$dest/"
    ' _ {} "$destination" \;
}
```

#### Cross-Filesystem Optimization
```bash
# Intelligent cross-filesystem move
smart_move() {
    local source="$1"
    local destination="$2"

    # Check if same filesystem
    if [[ $(stat -f -c %T "$source") == $(stat -f -c %T "$(dirname "$destination")") ]]; then
        # Same filesystem - use direct move
        mv "$source" "$destination"
    else
        # Different filesystem - use rsync for progress
        rsync -a --progress "$source" "$destination/" && rm -rf "$source"
    fi
}

# Move with compression (for network storage)
compress_and_move() {
    local source="$1"
    local destination="$2"

    tar -czf - "$source" | ssh remote "cat > $destination/source.tar.gz"
    rm -rf "$source"
}
```

### Automation and Scripting

#### Intelligent Move Scripts
```bash
#!/bin/bash
# Smart file organization script

smart_organize() {
    local source_dir="$1"
    local base_dest="$2"

    mkdir -p "$base_dest"/{images,documents,videos,archives,others}

    for file in "$source_dir"/*; do
        if [ -f "$file" ]; then
            case "${file##*.}" in
                jpg|jpeg|png|gif|bmp)
                    mv "$file" "$base_dest/images/"
                    ;;
                pdf|doc|docx|txt|rtf)
                    mv "$file" "$base_dest/documents/"
                    ;;
                mp4|avi|mkv|mov|wmv)
                    mv "$file" "$base_dest/videos/"
                    ;;
                zip|tar|gz|rar|7z)
                    mv "$file" "$base_dest/archives/"
                    ;;
                *)
                    mv "$file" "$base_dest/others/"
                    ;;
            esac
            echo "Moved $(basename "$file")"
        fi
    done
}
```

#### Safety Verification Scripts
```bash
#!/bin/bash
# Safe move with verification

safe_move() {
    local source="$1"
    local destination="$2"
    local temp_dest="${destination}.tmp"

    # Check if source exists
    if [ ! -e "$source" ]; then
        echo "Error: Source does not exist: $source"
        return 1
    fi

    # Check destination parent exists
    mkdir -p "$(dirname "$destination")"

    # Move to temporary location first
    if mv "$source" "$temp_dest"; then
        # Verify the move
        if [ -e "$temp_dest" ] && [ ! -e "$source" ]; then
            # Move to final destination
            mv "$temp_dest" "$destination"
            echo "Successfully moved: $source -> $destination"
            return 0
        else
            # Rollback if verification fails
            mv "$temp_dest" "$source"
            echo "Error: Move verification failed, rolled back"
            return 1
        fi
    else
        echo "Error: Move failed"
        return 1
    fi
}
```

## Filesystem Behavior Details

### Same Filesystem Operations
```bash
# Moving within same filesystem (fast)
mv /home/user/documents/report.txt /home/user/archive/

# Only updates directory entries (inode changes)
# No data copying occurs
# Instant operation regardless of file size
# Preserves all attributes: permissions, timestamps, ownership
```

### Cross-Filesystem Operations
```bash
# Moving between different filesystems (slower)
mv /tmp/temp_file.txt /home/user/documents/

# Physically copies data to destination filesystem
# Removes original after successful copy
# Requires sufficient space on destination
# May lose some attributes depending on filesystem capabilities
```

### Attribute Preservation
```bash
# Move with full attribute preservation (same filesystem)
mv -a source.txt destination.txt

# Move preserving specific attributes
mv --preserve=mode,timestamps source.txt destination.txt

# Handle cross-filesystem attribute loss
sudo mv -v source.txt /different/filesystem/ && sudo chown user:group /different/filesystem/source.txt
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Problems
```bash
# Check file permissions
ls -la source_file.txt
ls -ld destination_directory/

# Handle permission denied
sudo mv restricted_file.txt /allowed/location/

# Fix ownership after move
sudo mv source.txt /etc/ && sudo chown root:root /etc/source.txt
```

#### Disk Space Issues
```bash
# Check available space before cross-filesystem move
source_size=$(du -sb source_directory | cut -f1)
available_space=$(df -B1 /destination/filesystem | awk 'NR==2 {print $4}')

if [ "$available_space" -gt "$source_size" ]; then
    mv source_directory /destination/
else
    echo "Insufficient disk space"
fi
```

#### File Lock Issues
```bash
# Check if file is in use
lsof /path/to/locked_file.txt

# Handle "device or resource busy" error
fuser -k /path/to/locked_file.txt
mv /path/to/locked_file.txt /new/location/
```

#### Cross-Device Link Errors
```bash
# When mv reports "cross-device link" (moving between filesystems)
# This is normal - mv automatically handles it
# But you can force a specific method:

# Use rsync for more control
rsync -av --remove-source-files /source/ /destination/

# Manual cross-device move
cp -a /source/* /destination/ && rm -rf /source/*
```

## Related Commands

- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`rm`](/docs/commands/file-management/rm) - Remove files and directories
- [`rename`](/docs/commands/file-management/rename) - Rename multiple files with patterns
- [`find`](/docs/commands/file-management/find) - Search for files and execute commands
- [`rsync`](/docs/commands/networking/rsync) - Synchronize files and directories
- [`ln`](/docs/commands/file-management/ln) - Create hard and symbolic links
- [`install`](/docs/commands/file-management/install) - Copy files and set permissions

## Best Practices

1. **Use interactive mode (-i)** for important files to prevent accidental overwrites
2. **Test with dry runs** using `echo mv ...` before executing large operations
3. **Use verbose mode (-v)** for important operations to track progress
4. **Check disk space** before moving between filesystems
5. **Create backups** with `-b` option when overwriting important files
6. **Use absolute paths** in scripts to avoid ambiguity
7. **Verify permissions** before and after moves
8. **Handle cross-filesystem moves** appropriately with rsync for large transfers
9. **Use `-n` option** to safely move without overwriting existing files
10. **Consider using `rsync`** for complex moves or when progress reporting is needed

## Performance Tips

1. **Same filesystem moves are instant** - only directory entries are updated
2. **Cross-filesystem moves require full copy** - allocate enough time and space
3. **Use `rsync` instead of `mv`** for large cross-filesystem moves with progress
4. **Parallel operations** with GNU Parallel for multiple file moves
5. **Batch small files** to reduce filesystem overhead
6. **Consider network bandwidth** for remote filesystem moves
7. **Use appropriate buffer sizes** for filesystem-specific optimizations
8. **Monitor I/O** during large moves to avoid system overload

The `mv` command is an essential tool for file system management and organization in Linux. Its ability to handle both simple renames and complex directory relocations, combined with safety features and cross-filesystem support, makes it indispensable for daily system administration, file organization, and data management workflows.