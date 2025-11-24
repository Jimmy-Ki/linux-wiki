---
title: cpio - Copy Files to and from Archives
sidebar_label: cpio
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cpio - Copy Files to and from Archives

The `cpio` command is a powerful archiving utility that processes files in three distinct modes: copy-out (create archive), copy-in (extract from archive), and copy-pass (copy files directly without creating an intermediate archive). Unlike tar, cpio reads file lists from standard input, making it particularly useful when combined with commands like `find` for creating highly customized backups and archives.

## Basic Syntax

```bash
cpio [OPTIONS] [MODE]
```

## Operation Modes

### Copy-Out Mode (Create Archive)
```bash
find [PATH] [OPTIONS] | cpio -o [OPTIONS] > archive.cpio
```

### Copy-In Mode (Extract Archive)
```bash
cpio -i [OPTIONS] < archive.cpio
```

### Copy-Pass Mode (Direct Copy)
```bash
find [PATH] [OPTIONS] | cpio -p [OPTIONS] [DESTINATION]
```

## Common Options

### Mode Selection
- `-o, --create` - Copy-out mode (create archive)
- `-i, --extract` - Copy-in mode (extract archive)
- `-p, --pass-through` - Copy-pass mode (direct copy)

### I/O Control
- `-f ARCHIVE` - Use archive file instead of stdin/stdout
- `-F ARCHIVE` - Use archive file instead of stdin/stdout
- `-O ARCHIVE` - Output to archive file (copy-out mode)
- `-I ARCHIVE` - Input from archive file (copy-in mode)

### File Attributes and Permissions
- `-a, --reset-access-time` - Reset file access times
- `-m, --preserve-modification-time` - Preserve modification times
- `-p, --preserve-permissions` - Preserve file permissions (same as `--same-permissions`)
- `--no-preserve-owner` - Do not preserve file ownership
- `-R USER:GROUP` - Set file ownership

### Archive Format Options
- `-H FORMAT` - Specify archive format (newc, odc, bin, tar, ustar, etc.)
- `-c` - Use old ASCII archive format (odc)
- `--format=FORMAT` - Alternative way to specify format

### Behavior Control
- `-d, --make-directories` - Create leading directories as needed
- `-u, --unconditional` - Replace all files unconditionally
- `-l, --link` - Link files instead of copying (copy-pass mode)
- `-L, --dereference` - Follow symbolic links
- `-n, --numeric-uid-gid` - Use numeric UID/GID instead of names

### Output and Information
- `-v, --verbose` - Verbose output
- `-t, --list` - List contents (copy-in mode)
- `--absolute-filenames` - Do not strip leading slashes
- `--no-absolute-filenames` - Strip leading slashes (default)

### Advanced Options
- `-0, --null` - Filenames are separated by null characters
- `-A, --append` - Append to existing archive
- `-r, --rename` - Interactively rename files
- `-E FILE` - Read exclude patterns from file
- `--sparse` - Handle sparse files efficiently

## Usage Examples

### Creating Archives (Copy-Out Mode)
```bash
# Basic archive creation from current directory
find . -depth | cpio -ov > archive.cpio

# Create archive preserving permissions and times
find . -depth | cpio -ovm > archive.cpio

# Create archive with null-separated filenames (handles spaces)
find . -depth -print0 | cpio -0ov > archive.cpio

# Create compressed archive
find . -depth | cpio -ov | gzip > archive.cpio.gz

# Create archive in newc format (recommended)
find . -depth | cpio -ovH newc > archive.cpio
```

### Extracting Archives (Copy-In Mode)
```bash
# Extract archive preserving permissions
cpio -ivm < archive.cpio

# Extract archive without prompting
cpio -ivm < archive.cpio

# Extract archive to specific directory
mkdir extract_dir
cd extract_dir
cpio -ivm < ../archive.cpio

# Extract compressed archive
gunzip -c archive.cpio.gz | cpio -ivm

# List archive contents without extracting
cpio -tv < archive.cpio

# Extract only specific files
cpio -ivm "*.txt" < archive.cpio
```

### Direct Copy (Copy-Pass Mode)
```bash
# Copy files from source to destination
find /source -depth | cpio -pdm /destination

# Copy with symbolic links dereferenced
find /source -depth | cpio -pdLm /destination

# Copy preserving all attributes
find /source -depth | cpio -pdamv /destination

# Copy with null-separated filenames
find /source -depth -print0 | cpio -0pdm /destination
```

### Working with find Command
```bash
# Archive files modified in last 7 days
find /home -mtime -7 -depth -print | cpio -ov > recent_changes.cpio

# Archive files larger than 10MB
find /data -size +10M -depth -print | cpio -ov > large_files.cpio

# Archive specific file types
find /usr/src -name "*.c" -depth -print | cpio -ov > source_code.cpio

# Archive excluding certain directories
find / -path "/proc" -prune -o -path "/sys" -prune -o -depth -print | cpio -ov > system_backup.cpio
```

## Practical Examples

### System Backup Script
```bash
#!/bin/bash
# Comprehensive system backup using cpio

BACKUP_DIR="/backups/cpio"
DATE=$(date +%Y%m%d_%H%M%S)
EXCLUDE_FILE="/etc/backup_exclude.txt"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create exclude patterns file
cat > "$EXCLUDE_FILE" << 'EOF'
/tmp/*
/var/tmp/*
/var/run/*
/var/lock/*
/proc/*
/sys/*
/dev/*
/mnt/*
/media/*
/home/*/.cache/*
/home/*/.local/share/Trash/*
*.log
*.tmp
.cache/
EOF

# Function to backup directory
backup_directory() {
    local source_dir="$1"
    local backup_name="$2"
    local archive_file="$BACKUP_DIR/${backup_name}_${DATE}.cpio"

    echo "Backing up $source_dir to $archive_file"

    # Create backup excluding patterns
    find "$source_dir" -depth -xdev -print | \
    cpio -ovH newc --format=newc > "$archive_file"

    if [ $? -eq 0 ]; then
        # Compress the backup
        gzip "$archive_file"
        echo "Backup completed: ${archive_file}.gz"

        # Create checksum
        md5sum "${archive_file}.gz" > "${archive_file}.gz.md5"
    else
        echo "Backup failed for $source_dir"
        return 1
    fi
}

# Backup critical directories
backup_directory "/home" "home"
backup_directory "/etc" "etc"
backup_directory "/usr/local" "usr_local"
backup_directory "/opt" "opt"

# Create backup manifest
cat > "$BACKUP_DIR/backup_manifest_${DATE}.txt" << EOF
System Backup Manifest
=====================
Date: $(date)
Hostname: $(hostname)
Kernel: $(uname -a)

Backups Created:
$(ls -la "$BACKUP_DIR"/*_${DATE}.cpio.gz.md5 | awk '{print $9, $5}')

Exclude Patterns Used:
$(cat "$EXCLUDE_FILE")

Total Size:
$(du -sh "$BACKUP_DIR"/*_${DATE}.cpio.gz)
EOF

echo "Backup completed successfully"
```

### File Recovery Utility
```bash
#!/bin/bash
# File recovery from cpio archives

ARCHIVE_DIR="/backups/cpio"
SEARCH_PATTERN="$1"
RECOVERY_DIR="/tmp/recovery_$(date +%Y%m%d_%H%M%S)"

if [ -z "$SEARCH_PATTERN" ]; then
    echo "Usage: $0 <search_pattern>"
    echo "Example: $0 \"*.pdf\""
    exit 1
fi

# Create recovery directory
mkdir -p "$RECOVERY_DIR"
cd "$RECOVERY_DIR"

echo "Searching for files matching: $SEARCH_PATTERN"
echo "Recovery directory: $RECOVERY_DIR"

# Search through all archives
for archive in "$ARCHIVE_DIR"/*.cpio.gz; do
    if [ -f "$archive" ]; then
        echo "Checking archive: $(basename $archive)"

        # List archive contents for matching files
        matching_files=$(gunzip -c "$archive" | cpio -tv 2>/dev/null | grep "$SEARCH_PATTERN" | awk '{print $NF}')

        if [ -n "$matching_files" ]; then
            echo "Found matching files in $(basename $archive)"

            # Extract matching files
            gunzip -c "$archive" | cpio -imdv --no-absolute-filenames "$SEARCH_PATTERN" 2>/dev/null

            # List recovered files
            echo "Recovered files:"
            find . -name "$SEARCH_PATTERN" -ls
        fi
    fi
done

echo ""
echo "Recovery completed. Files are in: $RECOVERY_DIR"
```

### Directory Synchronization Tool
```bash
#!/bin/bash
# Directory synchronization using cpio copy-pass mode

SOURCE_DIR="$1"
DEST_DIR="$2"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>"
    exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist: $SOURCE_DIR"
    exit 1
fi

# Create destination directory
mkdir -p "$DEST_DIR"

echo "Synchronizing $SOURCE_DIR to $DEST_DIR"

# Use copy-pass mode for efficient synchronization
find "$SOURCE_DIR" -depth -print | cpio -pdlamv "$DEST_DIR"

# Verify synchronization
echo ""
echo "Synchronization complete"
echo "Source size: $(du -sh "$SOURCE_DIR" | cut -f1)"
echo "Destination size: $(du -sh "$DEST_DIR" | cut -f1)"
```

### Tape Backup Operations
```bash
#!/bin/bash
# Tape backup using cpio

TAPE_DEVICE="/dev/st0"
BACKUP_DIRS="/home /etc /var"

# Function to backup to tape
backup_to_tape() {
    local directory="$1"

    echo "Backing up $directory to tape"

    # Position tape
    mt -f "$TAPE_DEVICE" eof

    # Create archive and write to tape
    find "$directory" -depth -xdev -print | cpio -ovH newc > "$TAPE_DEVICE"

    if [ ${PIPESTATUS[0]} -eq 0 ] && [ ${PIPESTATUS[1]} -eq 0 ]; then
        echo "Backup of $directory completed successfully"
    else
        echo "Backup of $directory failed"
    fi
}

# Backup all specified directories
echo "Starting tape backup"
for dir in $BACKUP_DIRS; do
    if [ -d "$dir" ]; then
        backup_to_tape "$dir"
    else
        echo "Warning: Directory $dir does not exist"
    fi
done

# Eject tape
mt -f "$TAPE_DEVICE" eject

echo "Tape backup completed"
```

### Incremental Backup System
```bash
#!/bin/bash
# Incremental backup system using cpio and timestamp

BACKUP_ROOT="/backups/incremental"
TIMESTAMP_FILE="$BACKUP_ROOT/.last_backup"
CURRENT_DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_ROOT"

# Get last backup time or use epoch
if [ -f "$TIMESTAMP_FILE" ]; then
    LAST_BACKUP=$(cat "$TIMESTAMP_FILE")
else
    LAST_BACKUP="0"
fi

echo "Creating incremental backup since: $LAST_BACKUP"

# Find files modified since last backup
find /home -newermt "$LAST_BACKUP" -depth -print | \
cpio -ovH newc > "$BACKUP_DIR/incremental_$CURRENT_DATE.cpio"

if [ ${PIPESTATUS[0]} -eq 0 ] && [ ${PIPESTATUS[1]} -eq 0 ]; then
    # Update timestamp
    date > "$TIMESTAMP_FILE"

    # Compress backup
    gzip "$BACKUP_DIR/incremental_$CURRENT_DATE.cpio"
    echo "Incremental backup completed: incremental_$CURRENT_DATE.cpio.gz"
else
    echo "Incremental backup failed"
    exit 1
fi

# Create full backup if it's Sunday (day 7)
if [ $(date +%u) -eq 7 ]; then
    echo "Creating weekly full backup"
    find /home -depth -print | cpio -ovH newc > "$BACKUP_DIR/full_$CURRENT_DATE.cpio"
    gzip "$BACKUP_DIR/full_$CURRENT_DATE.cpio"
fi
```

## Advanced Usage

### Working with Different Archive Formats
```bash
# Create archive in different formats
find . -depth -print | cpio -ovH newc > archive_newc.cpio    # New ASCII
find . -depth -print | cpio -ovH odc > archive_odc.cpio      # Old ASCII
find . -depth -print | cpio -ovH bin > archive_bin.cpio      # Binary
find . -depth -print | cpio -ovH tar > archive.tar          # Tar format

# Extract with automatic format detection
cpio -ivm < archive.cpio

# Explicitly specify format when extracting
cpio -ivmH newc < archive.cpio
```

### Processing Special Files
```bash
# Handle sparse files efficiently
find . -depth -print | cpio -ov --sparse > sparse_archive.cpio

# Preserve extended attributes
find . -depth -print | cpio -ov --xattrs > archive_with_attrs.cpio

# Handle files with unusual names (spaces, newlines)
find . -depth -print0 | cpio -0ov > archive_special.cpio

# Copy with hard link preservation
find /source -depth -print | cpio -pdl /destination
```

### Remote Operations
```bash
# Create remote backup
find /home -depth -print | cpio -ov | ssh backup@server "cat > /backups/home.cpio"

# Extract from remote backup
ssh backup@server "cat /backups/home.cpio" | cpio -ivm

# Remote copy using cpio
find /source -depth -print | cpio -o | ssh remote "cpio -idm /destination"
```

## Real-World Scenarios

### Migration Tool
```bash
#!/bin/bash
# User migration tool using cpio

OLD_HOME="/old_home"
NEW_HOME="/new_home"
USER_LIST="john jane bob"

# Function to migrate user
migrate_user() {
    local user="$1"
    local old_dir="$OLD_HOME/$user"
    local new_dir="$NEW_HOME/$user"

    if [ ! -d "$old_dir" ]; then
        echo "User $user home directory not found"
        return 1
    fi

    echo "Migrating user: $user"

    # Create new home directory
    mkdir -p "$new_dir"

    # Copy user files preserving all attributes
    find "$old_dir" -depth -print | cpio -pdlamv "$new_dir"

    # Set correct ownership
    chown -R "$user:$user" "$new_dir"

    echo "Migration of $user completed"
}

# Migrate all users
for user in $USER_LIST; do
    migrate_user "$user"
done

echo "User migration completed"
```

### Software Distribution
```bash
#!/bin/bash
# Create software distribution package

PACKAGE_NAME="myapp"
VERSION="1.0.0"
PACKAGE_DIR="dist_${PACKAGE_NAME}_${VERSION}"

# Create package structure
mkdir -p "$PACKAGE_DIR"/{bin,lib,doc,config}

# Copy files to package structure
find src/bin -type f -exec cp {} "$PACKAGE_DIR/bin/" \;
find src/lib -type f -exec cp {} "$PACKAGE_DIR/lib/" \;
find doc -type f -exec cp {} "$PACKAGE_DIR/doc/" \;
find config -type f -exec cp {} "$PACKAGE_DIR/config/" \;

# Create distribution archive
cd "$PACKAGE_DIR"
find . -depth -print | cpio -ovH newc > "../${PACKAGE_NAME}_${VERSION}.cpio"
cd ..

# Compress distribution
gzip "${PACKAGE_NAME}_${VERSION}.cpio"

# Create installation script
cat > install_${PACKAGE_NAME}.sh << 'EOF'
#!/bin/bash
PACKAGE_NAME="$1"
INSTALL_PREFIX="/usr/local"

if [ -z "$PACKAGE_NAME" ]; then
    echo "Usage: $0 <package_file>"
    exit 1
fi

echo "Installing $PACKAGE_NAME to $INSTALL_PREFIX"

# Extract package
gunzip -c "$PACKAGE_NAME" | (cd "$INSTALL_PREFIX" && cpio -idmv)

echo "Installation completed"
EOF

chmod +x install_${PACKAGE_NAME}.sh

echo "Package created: ${PACKAGE_NAME}_${VERSION}.cpio.gz"
```

### Archive Maintenance
```bash
#!/bin/bash
# Archive maintenance and verification

ARCHIVE_DIR="/backups/cpio"
CORRUPTED_LIST="/tmp/corrupted_archives.txt"

# Function to verify archive integrity
verify_archive() {
    local archive="$1"

    echo "Verifying: $(basename $archive)"

    # Try to list archive contents
    if gunzip -c "$archive" 2>/dev/null | cpio -tv >/dev/null 2>&1; then
        return 0
    else
        echo "Corrupted: $archive" >> "$CORRUPTED_LIST"
        return 1
    fi
}

# Function to repair archive if possible
repair_archive() {
    local archive="$1"

    echo "Attempting to repair: $(basename $archive)"

    # Create temporary uncompressed archive
    local temp_archive="${archive%.gz}_temp.cpio"

    # Try to extract ignoring errors
    if gunzip -c "$archive" 2>/dev/null | cpio -iv --quiet 2>/dev/null > "$temp_archive"; then
        # Recompress the repaired archive
        gzip "$temp_archive"
        mv "${temp_archive}.gz" "$archive"
        echo "Successfully repaired: $(basename $archive)"
    else
        echo "Cannot repair: $(basename $archive)"
        rm -f "$temp_archive"
    fi
}

# Main verification process
echo "Starting archive verification"

# Clear corrupted list
> "$CORRUPTED_LIST"

# Verify all archives
for archive in "$ARCHIVE_DIR"/*.cpio.gz; do
    if [ -f "$archive" ]; then
        verify_archive "$archive"
    fi
done

# Report results
if [ -s "$CORRUPTED_LIST" ]; then
    echo ""
    echo "Corrupted archives found:"
    cat "$CORRUPTED_LIST"

    read -p "Attempt repair? (y/n): " repair
    if [ "$repair" = "y" ]; then
        while read archive; do
            repair_archive "$archive"
        done < "$CORRUPTED_LIST"
    fi
else
    echo "All archives verified successfully"
fi
```

## Performance Optimization

### Large File Handling
```bash
# Use larger block size for better performance
find /large/files -depth -print | cpio -ovB --block-size=5120 > archive.cpio

# Handle sparse files to save space
find . -type f -sparse -depth -print | cpio -ov --sparse > sparse_archive.cpio

# Parallel processing for multiple directories
for dir in dir1 dir2 dir3; do
    find "$dir" -depth -print | cpio -ov > "${dir}_archive.cpio" &
done
wait
```

### Memory Usage Optimization
```bash
# Process files in smaller chunks
find /huge/directory -depth -print | split -l 10000 - chunk_
for chunk in chunk_*; do
    cat "$chunk" | cpio -ov >> archive.cpio
    rm "$chunk"
done
```

## Related Commands

- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`tar`](/docs/commands/backup-recovery/tar) - Archive utility
- [`pax`](/docs/commands/backup-recovery/pax) - Portable archive interchange
- [`gzip`](/docs/commands/compression/gzip) - Compress or expand files
- [`mt`](/docs/commands/device-management/mt) - Control magnetic tape drive
- [`split`](/docs/commands/file-management/split) - Split files into pieces

## Best Practices

1. **Always use `find` with cpio** - cpio requires explicit file lists
2. **Use appropriate archive format** - `newc` format is recommended for modern systems
3. **Handle special filenames** - Use `-print0` and `-0` for files with spaces
4. **Preserve file attributes** - Use `-m`, `-p`, and `-a` options as needed
5. **Test archives before storage** - Verify archive integrity
6. **Use compression for storage efficiency** - Pipe through gzip or bzip2
7. **Consider incremental backups** - Use file timestamps for efficient backups
8. **Monitor backup size** - Large archives can consume significant storage
9. **Document backup procedures** - Keep clear instructions for recovery
10. **Use absolute vs relative paths carefully** - Understand path handling differences

The `cpio` command provides flexible and powerful archiving capabilities, especially when combined with other tools like `find`. Its ability to handle special files, preserve file attributes, and work with various archive formats makes it suitable for both simple file collection tasks and complex backup systems.