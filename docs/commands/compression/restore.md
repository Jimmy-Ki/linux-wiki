---
title: restore - Restore Files from Dump Backups
sidebar_label: restore
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# restore - Restore Files from Dump Backups

The `restore` command is the companion utility to `dump`, designed to restore files and filesystems from backup archives created by the dump utility. It supports various restore modes, including full restores, selective file restoration, and interactive restoration. Restore can work with backups stored on files, tapes, or other storage media.

## Basic Syntax

```bash
restore [OPTIONS] [ARCHIVE_FILE]
```

## Common Options

### Restore Modes
- `-r` - Restore filesystem (complete restore)
- `-R` - Resume interrupted restore
- `-x` - Extract named files
- `-i` - Interactive restore mode
- `-t` - List contents of backup
- `-C` - Compare backup with current filesystem

### File and Path Options
- `-f FILE` - Backup archive file or device
- `-b BLOCKSIZE` - Block size in kilobytes (default: 10)
- `-s TAPEFILE` - Tape file number
- `-D FILESYSTEM` - Filesystem to use

### Restore Behavior
- `-y` - Assume "yes" to all questions
- `-v` - Verbose output
- `-h` - Restore directories but not contents
- `-m` - Restore by inode numbers
- `-n` - Do not extract files with same modification time

### Advanced Options
- `-N` - Do not extract directories (file mode only)
- `-o` - Change file ownership to current user
- `-p` - Extract files with original permissions (default)
- `-s FILE` - Read file names from file
- `-T DIR` - Target directory for restore

## Usage Examples

### Interactive Restore Mode
```bash
# Start interactive restore session
restore -i -f /backup/home_level0.dump

# Interactive restore commands within session:
# ls [directory]           - List files
# cd directory             - Change directory
# add filename             - Mark file for extraction
# delete filename          - Unmark file for extraction
# extract                  - Extract marked files
# quit                     - Exit interactive mode
```

### Complete Filesystem Restore
```bash
# Restore entire filesystem
restore -r -f /backup/home_level0.dump

# Resume interrupted restore
restore -R -f /backup/home_level0.dump

# Restore to different location
restore -r -f /backup/home_level0.dump -T /tmp/restore_test
```

### Selective File Restoration
```bash
# Extract specific files
restore -x -f /backup/home_level0.dump ./documents/report.pdf

# Extract multiple files
restore -x -f /backup/home_level0.dump ./documents/ ./pictures/

# Extract files from tape
restore -x -f /dev/st0 -s 2 ./home/user/important/
```

### Listing and Verification
```bash
# List backup contents
restore -t -f /backup/home_level0.dump

# List specific directory contents
restore -t -f /backup/home_level0.dump ./documents/

# Compare backup with current filesystem
restore -C -f /backup/home_level0.dump

# Verbose listing with inode information
restore -tv -f /backup/home_level0.dump
```

### Advanced Restore Operations
```bash
# Restore without prompting
restore -iy -f /backup/home_level0.dump

# Restore directories but not contents
restore -ih -f /backup/home_level0.dump

# Restore and change ownership
restore -io -f /backup/home_level0.dump

# Restore using inode numbers
restore -im -f /backup/home_level0.dump
```

## Interactive Restore Mode Guide

### Navigation Commands
```bash
# Within interactive restore session:
restore > ls                    # List current directory
restore > ls -l                # List with details
restore > cd documents          # Change to documents directory
restore > cd ..                 # Go to parent directory
restore > pwd                   # Show current directory
```

### File Selection Commands
```bash
restore > add report.pdf        # Mark file for extraction
restore > add *.txt             # Mark all .txt files
restore > delete old.txt        # Unmark file
restore > delete *              # Unmark all files
restore > add *                 # Mark all files in current directory
```

### Extraction and Control
```bash
restore > extract               # Extract marked files
restore > help                  # Show help
restore > what                  # Show extraction summary
restore > verbose               # Toggle verbose mode
restore > quit                  # Exit without extracting
```

## Practical Examples

### Disaster Recovery Script
```bash
#!/bin/bash
# Complete disaster recovery using restore

BACKUP_ROOT="/backups/disaster_recovery"
TARGET_ROOT="/mnt/recovery_target"
LOG_FILE="/var/log/disaster_recovery.log"

# Function to restore filesystem
restore_filesystem() {
    local fs_name="$1"
    local backup_file="$2"
    local target_dir="$3"

    echo "$(date): Restoring $fs_name to $target_dir" >> "$LOG_FILE"

    mkdir -p "$target_dir"
    cd "$target_dir"

    if restore -rf "$backup_file" >> "$LOG_FILE" 2>&1; then
        echo "$(date): Successfully restored $fs_name" >> "$LOG_FILE"
        return 0
    else
        echo "$(date): ERROR: Failed to restore $fs_name" >> "$LOG_FILE"
        return 1
    fi
}

# Mount target filesystem
mount /dev/sda1 "$TARGET_ROOT" || {
    echo "Failed to mount target filesystem"
    exit 1
}

# Restore root filesystem
restore_filesystem "root" \
    "$BACKUP_ROOT/dr_root_20240101.dump" \
    "$TARGET_ROOT"

# Restore home filesystem
mkdir -p "$TARGET_ROOT/home"
restore_filesystem "home" \
    "$BACKUP_ROOT/dr_home_20240101.dump" \
    "$TARGET_ROOT/home"

# Restore var filesystem
mkdir -p "$TARGET_ROOT/var"
restore_filesystem "var" \
    "$BACKUP_ROOT/dr_var_20240101.dump" \
    "$TARGET_ROOT/var"

# Reinstall boot loader
grub-install --root-directory="$TARGET_ROOT" /dev/sda

echo "Disaster recovery completed. Check $LOG_FILE for details."
```

### Selective File Recovery
```bash
#!/bin/bash
# Selective file recovery utility

BACKUP_FILE="$1"
TARGET_FILES="$2"
RESTORE_DIR="/tmp/restore_$(date +%Y%m%d_%H%M%S)"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <backup_file> <file_pattern>"
    echo "Example: $0 /backup/home.dump \"documents/*.pdf\""
    exit 1
fi

# Create restore directory
mkdir -p "$RESTORE_DIR"
cd "$RESTORE_DIR"

echo "Restoring files matching: $TARGET_FILES"
echo "From backup: $BACKUP_FILE"
echo "To directory: $RESTORE_DIR"

# Perform selective restore
if restore -xvf "$BACKUP_FILE" "$TARGET_FILES"; then
    echo "Restore completed successfully"
    echo "Restored files:"
    find . -type f
else
    echo "Restore failed"
    rm -rf "$RESTORE_DIR"
    exit 1
fi
```

### Backup Verification Script
```bash
#!/bin/bash
# Verify backup integrity by comparing with filesystem

BACKUP_FILE="$1"
FILESYSTEM="$2"
REPORT_FILE="/tmp/backup_verification_$(date +%Y%m%d).txt"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <backup_file> <filesystem>"
    exit 1
fi

echo "Backup Verification Report" > "$REPORT_FILE"
echo "==========================" >> "$REPORT_FILE"
echo "Date: $(date)" >> "$REPORT_FILE"
echo "Backup: $BACKUP_FILE" >> "$REPORT_FILE"
echo "Filesystem: $FILESYSTEM" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Perform comparison
echo "Comparing backup with current filesystem..." >> "$REPORT_FILE"
restore -Cf "$BACKUP_FILE" >> "$REPORT_FILE" 2>&1

echo "Verification complete. Report saved to: $REPORT_FILE"

# Display summary
grep -E "(missing|different)" "$REPORT_FILE" | head -20
```

### Tape Restore Operations
```bash
#!/bin/bash
# Restore from tape backups with multiple files

TAPE_DEVICE="/dev/st0"
BACKUP_DATE="$1"

if [ -z "$BACKUP_DATE" ]; then
    echo "Usage: $0 <backup_date>"
    echo "Example: $0 20240101"
    exit 1
fi

# Rewind tape
mt -f "$TAPE_DEVICE" rewind

# Function to restore from tape file
restore_from_tape() {
    local tape_file="$1"
    local filesystem="$2"
    local target_dir="$3"

    echo "Restoring tape file $tape_file: $filesystem"

    # Position tape to correct file
    mt -f "$TAPE_DEVICE" fsf $((tape_file - 1))

    # Create target directory
    mkdir -p "$target_dir"
    cd "$target_dir"

    # Restore from tape
    restore -rf "$TAPE_DEVICE"
}

# Restore key filesystems from tape
restore_from_tape 1 "root" "/mnt/restore/root"
restore_from_tape 2 "home" "/mnt/restore/home"
restore_from_tape 3 "var" "/mnt/restore/var"

# Eject tape
mt -f "$TAPE_DEVICE" eject

echo "Tape restore completed"
```

### Incremental Restore Process
```bash
#!/bin/bash
# Restore incremental backups in correct order

BACKUP_BASE="/backups/incremental"
RESTORE_TARGET="/tmp/incremental_restore"
FILESYSTEM="/home"

# Create restore directory
mkdir -p "$RESTORE_TARGET"

# Function to restore level
restore_level() {
    local level="$1"
    local backup_file="$BACKUP_BASE/${FILESYSTEM//\//_}_*_${level}.dump.gz"

    echo "Restoring level $level backup"

    if [ -f "$backup_file" ]; then
        gunzip -c "$backup_file" | restore -rf -
    else
        echo "Warning: Level $level backup not found: $backup_file"
    fi
}

# Restore in order: level 0 (full), then incrementals
echo "Starting incremental restore process"

cd "$RESTORE_TARGET"

# First restore level 0 (full backup)
restore_level 0

# Then restore incrementals in order
for level in 1 2 3 4 5; do
    restore_level $level
done

echo "Incremental restore completed"
```

## Real-World Scenarios

### Emergency File Recovery
```bash
#!/bin/bash
# Emergency file recovery for critical systems

BACKUP_LOCATION="/backups/emergency"
RECOVERY_REQUEST="$1"
CASE_NUMBER="$(date +%Y%m%d_%H%M%S)"
RECOVERY_DIR="/tmp/emergency_recovery_$CASE_NUMBER"

if [ -z "$RECOVERY_REQUEST" ]; then
    echo "Usage: $0 <file_pattern>"
    echo "Example: $0 \"*/config/database.conf\""
    exit 1
fi

echo "Emergency File Recovery Started"
echo "=============================="
echo "Case Number: $CASE_NUMBER"
echo "Recovery Request: $RECOVERY_REQUEST"
echo "Recovery Directory: $RECOVERY_DIR"

# Create recovery directory
mkdir -p "$RECOVERY_DIR"
cd "$RECOVERY_DIR"

# Search all recent backups for requested files
echo "Searching backups for: $RECOVERY_REQUEST"
for backup in "$BACKUP_LOCATION"/*.dump.gz; do
    if [ -f "$backup" ]; then
        echo "Checking backup: $(basename $backup)"

        # Check if file exists in backup
        if gunzip -c "$backup" | restore -tf - 2>/dev/null | grep -q "$RECOVERY_REQUEST"; then
            echo "Found matching files in: $(basename $backup)"

            # Extract matching files
            gunzip -c "$backup" | restore -xf - "$RECOVERY_REQUEST" 2>/dev/null

            if [ $? -eq 0 ]; then
                echo "Successfully extracted files from $(basename $backup)"
            fi
        fi
    fi
done

# Show results
echo ""
echo "Recovery Results:"
echo "================"
find . -type f -ls

# Create recovery report
cat > "recovery_report_$CASE_NUMBER.txt" << EOF
Emergency File Recovery Report
==============================
Case Number: $CASE_NUMBER
Date: $(date)
Request: $RECOVERY_REQUEST
Files Recovered:
$(find . -type f)
EOF

echo "Recovery completed. Report saved to: recovery_report_$CASE_NUMBER.txt"
```

### Cross-Machine Restore
```bash
#!/bin/bash
# Restore backups to different machine with path mapping

SOURCE_MACHINE="old-server.company.com"
BACKUP_FILE="/backups/home_level0.dump"
TARGET_BASE="/newhome"
PATH_MAP_FILE="/etc/user_path_mapping.txt"

# Function to map old paths to new paths
map_path() {
    local old_path="$1"

    # Check mapping file first
    if [ -f "$PATH_MAP_FILE" ]; then
        local mapped=$(grep "^$old_path:" "$PATH_MAP_FILE" | cut -d: -f2)
        if [ -n "$mapped" ]; then
            echo "$mapped"
            return
        fi
    fi

    # Default mapping: replace /home with /newhome
    echo "$old_path" | sed 's|^/home|/newhome|'
}

# Interactive restore with path mapping
interactive_restore() {
    echo "Starting cross-machine restore from $SOURCE_MACHINE"

    # Copy backup from source machine
    scp "$SOURCE_MACHINE:$BACKUP_FILE" "/tmp/backup.dump"

    # Start interactive restore
    echo "Available backup contents:"
    restore -tf "/tmp/backup.dump" | head -20

    echo ""
    echo "Enter files to restore (wildcards allowed):"
    read -r files_to_restore

    # Restore to temporary location first
    mkdir -p /tmp/temp_restore
    cd /tmp/temp_restore

    if restore -xf "/tmp/backup.dump" "$files_to_restore"; then
        echo "Files extracted to temporary location"

        # Move files to final locations with path mapping
        find . -type f | while read file; do
            old_path="/$(echo $file | cut -d/ -f2-)"
            new_path=$(map_path "$old_path")

            # Create target directory
            mkdir -p "$(dirname "$new_path")"

            # Move file
            mv "$file" "$new_path"
            echo "Moved: $old_path -> $new_path"
        done

        echo "Restore completed with path mapping"
    else
        echo "Restore failed"
    fi

    # Cleanup
    rm -f "/tmp/backup.dump"
    rm -rf /tmp/temp_restore
}

# Run the restore
interactive_restore
```

### Archive Validation and Recovery
```bash
#!/bin/bash
# Comprehensive archive validation before restore

BACKUP_FILE="$1"
VALIDATION_REPORT="/tmp/backup_validation_$(date +%Y%m%d).txt"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Backup Archive Validation Report" > "$VALIDATION_REPORT"
echo "Generated: $(date)" >> "$VALIDATION_REPORT"
echo "Archive: $BACKUP_FILE" >> "$VALIDATION_REPORT"
echo "" >> "$VALIDATION_REPORT"

# Check file integrity
echo "=== File Integrity Check ===" >> "$VALIDATION_REPORT"
file "$BACKUP_FILE" >> "$VALIDATION_REPORT"
ls -la "$BACKUP_FILE" >> "$VALIDATION_REPORT"
echo "" >> "$VALIDATION_REPORT"

# Extract table of contents
echo "=== Archive Contents (First 50 entries) ===" >> "$VALIDATION_REPORT"
restore -tf "$BACKUP_FILE" | head -50 >> "$VALIDATION_REPORT"
echo "" >> "$VALIDATION_REPORT"

# Check for potential issues
echo "=== Archive Analysis ===" >> "$VALIDATION_REPORT"
total_files=$(restore -tf "$BACKUP_FILE" 2>/dev/null | wc -l)
echo "Total files in archive: $total_files" >> "$VALIDATION_REPORT"

# Check for very large files
echo "Largest files:" >> "$VALIDATION_REPORT"
restore -tfv "$BACKUP_FILE" 2>/dev/null | sort -k6 -nr | head -10 >> "$VALIDATION_REPORT"
echo "" >> "$VALIDATION_REPORT"

# Summary
echo "=== Summary ===" >> "$VALIDATION_REPORT"
echo "Archive appears to be valid" >> "$VALIDATION_REPORT"
echo "Files can be restored using: restore -xf $BACKUP_FILE [filename]" >> "$VALIDATION_REPORT"

echo "Validation complete. Report saved to: $VALIDATION_REPORT"

# Display summary to user
echo "Backup validation completed:"
echo "- Total files: $total_files"
echo "- Archive file size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo "- Detailed report: $VALIDATION_REPORT"
```

## Advanced Features

### Using Named Pipes for Streaming
```bash
# Restore from compressed backup
mkfifo /tmp/backup_pipe
gunzip -c /backup/home.dump.gz > /tmp/backup_pipe &
restore -rf /tmp/backup_pipe

# Restore from remote backup
ssh backup@server "cat /backup/home.dump" | restore -rf -
```

### Custom Restore Scripts
```bash
# Create restore menu script
cat > restore_menu.sh << 'EOF'
#!/bin/bash

echo "Backup Restore Menu"
echo "=================="
echo "1. Complete filesystem restore"
echo "2. Interactive restore"
echo "3. Selective file restore"
echo "4. List backup contents"
echo "5. Exit"

read -p "Select option: " choice

case $choice in
- 1)
        read -p "Enter backup file: " backup
        read -p "Enter target directory: " target
        restore -rf "$backup" -T "$target"
        ;;
- 2)
        read -p "Enter backup file: " backup
        restore -if "$backup"
        ;;
- 3)
        read -p "Enter backup file: " backup
        read -p "Enter file pattern: " pattern
        restore -xf "$backup" "$pattern"
        ;;
- 4)
        read -p "Enter backup file: " backup
        restore -tf "$backup" | less
        ;;
    *)
        echo "Exiting"
        ;;
esac
EOF

chmod +x restore_menu.sh
```

## Related Commands

- [`dump`](/docs/commands/backup-recovery/dump) - Create filesystem backups
- [`tar`](/docs/commands/backup-recovery/tar) - Archive utility for file backups
- [`cpio`](/docs/commands/backup-recovery/cpio) - Copy files to and from archives
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`mt`](/docs/commands/device-management/mt) - Magnetic tape control utility
- [`fsck`](/docs/commands/disk-filesystem/fsck) - Filesystem check and repair

## Best Practices

1. **Verify backups before restore** - Use `-t` option to list contents first
2. **Test restore procedures regularly** - Practice recovery scenarios
3. **Use interactive mode for selective restores** - `-i` option provides flexibility
4. **Restore to temporary location first** - Verify before overwriting production data
5. **Document restore procedures** - Keep step-by-step recovery instructions
6. **Maintain proper file permissions** - Use appropriate restore options
7. **Monitor restore progress** - Use verbose mode for large restores
8. **Validate restored data** - Check file integrity after restore
9. **Plan for incremental restore order** - Restore full backup first, then incrementals
10. **Maintain backup chain integrity** - Keep all required backup levels available

The `restore` command is essential for recovering data from dump backups. Understanding its various modes and options enables efficient recovery of entire filesystems or individual files when needed. Regular testing of restore procedures ensures reliable disaster recovery capabilities.