---
title: cpio - Copy Files to and from Archives
sidebar_label: cpio
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cpio - Copy Files to and from Archives

The `cpio` command is a powerful archiving utility that processes files in three distinct modes: copy-out (create archive), copy-in (extract from archive), and copy-pass (copy files directly without creating an intermediate archive). Unlike tar, cpio reads file lists from standard input, making it particularly useful when combined with commands like `find` for creating highly customized backups and archives. Cpio supports various archive formats and preserves file attributes including permissions, ownership, timestamps, and can handle special files like device nodes and symbolic links.

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
- `-B, --block-size=5120` - Set block size to 5120 bytes
- `-C, --io-size=SIZE` - Set I/O block size
- `--force-local` - Treat archive file as local even with colon
- `--quiet` - Suppress informational messages
- `--rsh-command=COMMAND` - Use remote shell command instead of rsh

## Usage Examples

### Creating Archives (Copy-Out Mode)

#### Basic Archive Creation
```bash
# Basic archive creation from current directory
find . -depth | cpio -ov > archive.cpio

# Create archive preserving permissions and times
find . -depth | cpio -ovm > archive.cpio

# Create archive with verbose output and specific format
find . -depth | cpio -ovH newc > archive_newc.cpio
```

#### Advanced Archive Creation
```bash
# Create archive with null-separated filenames (handles spaces)
find . -depth -print0 | cpio -0ov > archive.cpio

# Create compressed archive
find . -depth | cpio -ov | gzip > archive.cpio.gz

# Create archive in newc format (recommended for modern systems)
find . -depth | cpio -ovH newc > archive.cpio

# Create archive with specific owner
find . -depth | cpio -ovR user:group > archive_owned.cpio

# Create archive following symbolic links
find . -depth -follow | cpio -ovL > archive_with_links.cpio
```

### Extracting Archives (Copy-In Mode)

#### Basic Extraction
```bash
# Extract archive preserving permissions
cpio -ivm < archive.cpio

# Extract archive without prompting
cpio -ivm < archive.cpio

# Extract archive to specific directory
mkdir extract_dir
cd extract_dir
cpio -ivm < ../archive.cpio
```

#### Advanced Extraction
```bash
# Extract compressed archive
gunzip -c archive.cpio.gz | cpio -ivm

# List archive contents without extracting
cpio -tv < archive.cpio

# Extract only specific files
cpio -ivm "*.txt" < archive.cpio

# Extract with specific ownership
cpio -ivmR user:group < archive.cpio

# Extract without preserving ownership
cpio -ivm --no-preserve-owner < archive.cpio

# Extract and create directories as needed
cpio -ivmd < archive.cpio

# Extract with interactive renaming
cpio -ivmr < archive.cpio
```

### Direct Copy (Copy-Pass Mode)

#### Basic Direct Copy
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

#### Advanced Copy Operations
```bash
# Copy files and link instead of copying (same filesystem)
find /source -depth | cpio -pdl /destination

# Copy with specific ownership
find /source -depth | cpio -pdR user:group /destination

# Copy resetting access times
find /source -depth | cpio -pdam /destination

# Copy using numeric UID/GID
find /source -depth | cpio -pdn /destination
```

### Working with find Command

#### File Selection and Filtering
```bash
# Archive files modified in last 7 days
find /home -mtime -7 -depth -print | cpio -ov > recent_changes.cpio

# Archive files larger than 10MB
find /data -size +10M -depth -print | cpio -ov > large_files.cpio

# Archive specific file types
find /usr/src -name "*.c" -depth -print | cpio -ov > source_code.cpio

# Archive excluding certain directories
find / -path "/proc" -prune -o -path "/sys" -prune -o -depth -print | cpio -ov > system_backup.cpio

# Archive files owned by specific user
find /home -user john -depth -print | cpio -ov > john_files.cpio

# Archive files with specific permissions
find /data -perm 644 -depth -print | cpio -ov > readable_files.cpio
```

#### Complex Backup Scenarios
```bash
# Create incremental backup using timestamp files
find /home -newer backup.timestamp -depth -print | cpio -ov > incremental.cpio

# Archive files not accessed in 30 days
find /archive -atime +30 -depth -print | cpio -ov > old_files.cpio

# Create system backup excluding temporary files
find / -type f -not \( -path "/tmp/*" -o -path "/var/tmp/*" \) -depth -print | cpio -ov > system_backup.cpio

# Archive configuration files only
find /etc -type f -name "*.conf" -depth -print | cpio -ov > config_files.cpio
```

## Practical Examples

### System Administration

#### Comprehensive System Backup
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

#### File Recovery Utility
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

### Development Workflow

#### Source Code Archiving
```bash
#!/bin/bash
# Create source code distribution

PROJECT_NAME="myproject"
VERSION="1.0.0"
SOURCE_DIR="/path/to/source"

# Create source archive excluding build files
find "$SOURCE_DIR" -depth \
    -not -path "*/build/*" \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -name "*.o" \
    -not -name "*.so" | \
cpio -ovH newc | gzip > "${PROJECT_NAME}_${VERSION}_source.cpio.gz"

echo "Source archive created: ${PROJECT_NAME}_${VERSION}_source.cpio.gz"
```

#### Build System Integration
```bash
#!/bin/bash
# Archive build artifacts

BUILD_DIR="build"
ARTIFACT_DIR="artifacts"

# Create artifact directory
mkdir -p "$ARTIFACT_DIR"

# Archive binaries
find "$BUILD_DIR" -type f -executable -depth -print | \
cpio -ovH newc > "$ARTIFACT_DIR/binaries.cpio"

# Archive libraries
find "$BUILD_DIR" -name "*.so" -o -name "*.a" -depth -print | \
cpio -ovH newc > "$ARTIFACT_DIR/libraries.cpio"

# Archive documentation
find "$BUILD_DIR" -name "*.html" -o -name "*.pdf" -depth -print | \
cpio -ovH newc > "$ARTIFACT_DIR/docs.cpio"

echo "Build artifacts archived in $ARTIFACT_DIR"
```

### Data Migration

#### Directory Synchronization Tool
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

#### User Migration Tool
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

## Advanced Usage

### Working with Different Archive Formats

#### Format Specifications
```bash
# Create archive in different formats
find . -depth -print | cpio -ovH newc > archive_newc.cpio    # New ASCII (recommended)
find . -depth -print | cpio -ovH odc > archive_odc.cpio      # Old ASCII
find . -depth -print | cpio -ovH bin > archive_bin.cpio      # Binary
find . -depth -print | cpio -ovH tar > archive.tar          # Tar format
find . -depth -print | cpio -ovH ustar > archive_ustar.cpio # USTAR format
find . -depth -print | cpio -ovH hpbin > archive_hpbin.cpio # HP-UX binary
find . -depth -print | cpio -ovH hpodc > archive_hpodc.cpio # HP-UX ASCII

# Extract with automatic format detection
cpio -ivm < archive.cpio

# Explicitly specify format when extracting
cpio -ivmH newc < archive.cpio
```

#### Format Conversion
```bash
# Convert between formats
cpio -ivm < old_format.cpio | cpio -ovH newc > new_format.cpio

# Convert to tar format
cpio -ivm < archive.cpio | cpio -ovH tar > archive.tar

# Convert and compress in one step
cpio -ivm < old.cpio | gzip > new.cpio.gz
```

### Processing Special Files

#### Sparse Files and Large Files
```bash
# Handle sparse files efficiently
find . -depth -print | cpio -ov --sparse > sparse_archive.cpio

# Use larger block size for better performance with large files
find /large/files -depth -print | cpio -ovB --block-size=5120 > large_archive.cpio

# Set custom I/O block size
find . -depth -print | cpio -ovC 65536 > archive.cpio
```

#### Extended Attributes and ACLs
```bash
# Preserve extended attributes (if supported)
find . -depth -print | cpio -ov --xattrs > archive_with_attrs.cpio

# Handle files with unusual names (spaces, newlines)
find . -depth -print0 | cpio -0ov > archive_special.cpio

# Copy with hard link preservation
find /source -depth -print | cpio -pdl /destination

# Handle symbolic links appropriately
find . -depth -follow -print | cpio -ovL > archive_follow_links.cpio
find . -depth -print | cpio -ov > archive_keep_links.cpio
```

### Remote Operations

#### Remote Backup and Restore
```bash
# Create remote backup
find /home -depth -print | cpio -ov | ssh backup@server "cat > /backups/home.cpio"

# Create compressed remote backup
find /home -depth -print | cpio -ov | gzip | ssh backup@server "cat > /backups/home.cpio.gz"

# Extract from remote backup
ssh backup@server "cat /backups/home.cpio" | cpio -ivm

# Extract compressed remote backup
ssh backup@server "cat /backups/home.cpio.gz" | gunzip | cpio -ivm

# Remote copy using cpio
find /source -depth -print | cpio -o | ssh remote "cpio -idm /destination"

# Remote synchronization
find /local -depth -print | cpio -o | ssh remote "cd /remote && cpio -pdm ."
```

#### Tape Backup Operations
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

## Integration and Automation

### Shell Scripts

#### Incremental Backup System
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
cpio -ovH newc > "$BACKUP_ROOT/incremental_$CURRENT_DATE.cpio"

if [ ${PIPESTATUS[0]} -eq 0 ] && [ ${PIPESTATUS[1]} -eq 0 ]; then
    # Update timestamp
    date > "$TIMESTAMP_FILE"

    # Compress backup
    gzip "$BACKUP_ROOT/incremental_$CURRENT_DATE.cpio"
    echo "Incremental backup completed: incremental_$CURRENT_DATE.cpio.gz"
else
    echo "Incremental backup failed"
    exit 1
fi

# Create full backup if it's Sunday (day 7)
if [ $(date +%u) -eq 7 ]; then
    echo "Creating weekly full backup"
    find /home -depth -print | cpio -ovH newc > "$BACKUP_ROOT/full_$CURRENT_DATE.cpio"
    gzip "$BACKUP_ROOT/full_$CURRENT_DATE.cpio"
fi
```

#### Software Distribution
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

#### Archive Verification and Repair
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
# Process files in smaller chunks to reduce memory usage
find /huge/directory -depth -print | split -l 10000 - chunk_
for chunk in chunk_*; do
    cat "$chunk" | cpio -ov >> archive.cpio
    rm "$chunk"
done

# Use null termination for very large numbers of files
find /very/large/directory -depth -print0 | cpio -0ov > archive.cpio
```

### I/O Optimization
```bash
# Optimize I/O block size for different media
find . -depth -print | cpio -ovC 131072 > fast_disk_archive.cpio  # 128KB blocks
find . -depth -print | cpio -ovC 4096 > slow_disk_archive.cpio     # 4KB blocks

# Use quiet mode for batch operations
find . -depth -print | cpio -ov --quiet > archive.cpio

# Force local file operations
cpio -iv --force-local < archive.cpio
```

## Troubleshooting

### Common Issues

#### File Name Problems
```bash
# Files with spaces or special characters
find . -depth -print0 | cpio -0ov > archive.cpio
find . -depth -print0 | cpio -0iv < archive.cpio

# Absolute vs relative path issues
find /full/path -depth | cpio -ov --absolute-filenames > archive.cpio
find . -depth | cpio -ov --no-absolute-filenames > archive.cpio
```

#### Permission Issues
```bash
# Extract without preserving ownership
cpio -ivm --no-preserve-owner < archive.cpio

# Extract with specific ownership
cpio -ivmR root:root < archive.cpio

# Create directories with proper permissions
cpio -ivmd < archive.cpio
```

#### Memory and Performance Issues
```bash
# Reduce memory usage for large archives
find . -depth -print | split -l 5000 - chunk_
for chunk in chunk_*; do
    cat "$chunk" | cpio -ovC 4096 >> archive.cpio
    rm "$chunk"
done

# Use streaming for very large operations
find /huge/path -depth -print | cpio -ov | gzip > huge_archive.cpio.gz
```

#### Format Compatibility
```bash
# Convert old format to new format
cpio -ivm < old_format.cpio | cpio -ovH newc > new_format.cpio

# Handle different system archives
cpio -ivmH bin < hpux_archive.cpio  # HP-UX binary format
cpio -ivmH hpodc < hpux_archive.cpio # HP-UX ASCII format
```

## Related Commands

- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`tar`](/docs/commands/compression/tar) - Archive utility
- [`pax`](/docs/commands/backup-recovery/pax) - Portable archive interchange
- [`gzip`](/docs/commands/compression/gzip) - Compress or expand files
- [`bzip2`](/docs/commands/compression/bzip2) - Block-sorting file compressor
- [`xz`](/docs/commands/compression/xz) - XZ compression utility
- [`mt`](/docs/commands/device-management/mt) - Control magnetic tape drive
- [`split`](/docs/commands/file-management/split) - Split files into pieces
- [`rsync`](/docs/commands/network-tools/rsync) - Remote file copy tool

## Best Practices

1. **Always use `find` with cpio** - cpio requires explicit file lists from stdin
2. **Use appropriate archive format** - `newc` format is recommended for modern systems
3. **Handle special filenames** - Use `-print0` and `-0` for files with spaces or special characters
4. **Preserve file attributes** - Use `-m`, `-p`, and `-a` options as needed for backup scenarios
5. **Test archives before storage** - Verify archive integrity with listing operations
6. **Use compression for storage efficiency** - Pipe through gzip or bzip2 for better compression
7. **Consider incremental backups** - Use file timestamps with `find` for efficient backup strategies
8. **Monitor backup size** - Large archives can consume significant storage space
9. **Document backup procedures** - Keep clear instructions for recovery processes
10. **Use absolute vs relative paths carefully** - Understand path handling differences for your use case

## Performance Tips

1. **Use newc format** - Most compatible and efficient for modern systems
2. **Adjust block size** - Larger blocks (5120-65536) improve I/O performance on fast storage
3. **Process in chunks** - Split large file lists to reduce memory usage
4. **Use null termination** - `-print0` and `-0` handle all possible filenames safely
5. **Parallel processing** - Process multiple directories concurrently when possible
6. **Streaming compression** - Pipe directly to compression tools for space efficiency
7. **Sparse file handling** - Use `--sparse` option for files with many zero blocks
8. **Optimize I/O** - Adjust block sizes based on storage medium characteristics

The `cpio` command provides flexible and powerful archiving capabilities, especially when combined with other tools like `find`. Its ability to handle special files, preserve file attributes, and work with various archive formats makes it suitable for both simple file collection tasks and complex backup systems. While less commonly used than `tar` in modern systems, cpio remains valuable for specific use cases requiring precise control over file selection and archive creation processes.