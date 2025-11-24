---
title: tar - Tape Archive Utility for Backups
sidebar_label: tar
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tar - Tape Archive Utility for Backups

The `tar` command is a versatile archiving utility that combines multiple files and directories into a single archive file, originally designed for tape backup operations. It's one of the most widely used backup tools in Linux systems due to its flexibility, compression support, and extensive feature set. Tar can handle various compression formats, preserve file attributes, and perform incremental backups.

## Basic Syntax

```bash
tar [OPTIONS] ARCHIVE_FILE [FILES/DIRECTORIES]
```

## Common Options

### Operation Modes
- `-c, --create` - Create a new archive
- `-x, --extract, --get` - Extract files from an archive
- `-t, --list` - List archive contents
- `-r, --append` - Append files to the end of an archive
- `-u, --update` - Append only newer files
- `-A, --catenate` - Append tar files to an archive
- `-d, --diff, --compare` - Find differences between archive and file system

### Compression Options
- `-z, --gzip, --gunzip, --ungzip` - Filter archive through gzip
- `-j, --bzip2` - Filter archive through bzip2
- `-J, --xz` - Filter archive through xz
- `--lzip` - Filter archive through lzip
- `--lzma` - Filter archive through lzma
- `-Z, --compress, --uncompress` - Filter archive through compress

### File and Archive Options
- `-f FILE, --file=FILE` - Use archive file or device
- `-C DIR, --directory=DIR` - Change to directory DIR
- `-T FILE, --files-from=FILE` - Get names to extract or create from FILE
- `-X FILE, --exclude-from=FILE` - Exclude patterns listed in FILE

### File Attributes and Permissions
- `-p, --preserve-permissions, --same-permissions` - Preserve file permissions
- `--preserve` - Preserve permissions and ownership (same as `-p` and `--same-owner`)
- `--no-preserve-owner` - Do not preserve ownership
- `--same-owner` - Preserve ownership (super-user only)
- `-a, --auto-compress` - Use archive suffix to determine compression
- `--numeric-owner` - Use numeric user/group IDs

### Exclusion and Inclusion
- `--exclude=PATTERN` - Exclude files matching PATTERN
- `--exclude-backups` - Exclude backup and lock files
- `--exclude-caches` - Exclude directory cache files
- `--include=PATTERN` - Include only files matching PATTERN

### Output and Verbose Options
- `-v, --verbose` - Verbosely list files processed
- `--totals` - Print total bytes after processing archive
- `--checkpoint` - Display progress messages
- `--show-transformed-names` - Show transformed file names

### Advanced Options
- `-g FILE, --listed-incremental=FILE` - Create new-style incremental backup
- `-G, --incremental` - Create old-style incremental backup
- `--level=NUMBER` - Dump level for incremental backups
- `--one-file-system` - Stay in local file system
- `-h, --dereference` - Follow symlinks; archive the files they point to
- `-P, --absolute-names` - Don't strip leading '/'s from file names

## Usage Examples

### Basic Archive Operations
```bash
# Create a simple archive
tar -cvf backup.tar /home/user/documents

# Create compressed archive with gzip
tar -czvf backup.tar.gz /home/user/documents

# Create compressed archive with bzip2
tar -cjvf backup.tar.bz2 /home/user/documents

# Create compressed archive with xz
tar -cJvf backup.tar.xz /home/user/documents

# List archive contents
tar -tvf backup.tar.gz

# Extract archive
tar -xvf backup.tar.gz

# Extract to specific directory
tar -xvf backup.tar.gz -C /tmp/extract/
```

### Backup Operations
```bash
# Full backup of home directory
tar -cvf /backup/home_full_$(date +%Y%m%d).tar /home

# Compressed backup with progress
tar -czvf /backup/home_compressed.tar.gz /home --totals

# Backup excluding specific patterns
tar -czvf backup.tar.gz /home --exclude="*.tmp" --exclude="*.log" --exclude="cache/"

# Backup preserving all attributes
tar -cpszf backup.tar.gz /home

# Backup from file list
tar -cvf backup.tar.gz -T filelist.txt
```

### Incremental Backups
```bash
# Create full backup (level 0)
tar -cvf /backup/full_$(date +%Y%m%d).tar /home

# Create incremental backup based on snapshot
tar -cvf /backup/incremental_$(date +%Y%m%d).tar \
    --listed-incremental=/backup/snapshot.snar /home

# Extract incremental backup
tar -xvf incremental_backup.tar --listed-incremental=/dev/null
```

### Tape Operations
```bash
# Backup to tape device
tar -cvf /dev/st0 /home

# Multiple volume backup
tar -cvf /dev/st0 --multi-volume /home

# Append to tape
tar -rvf /dev/st0 /home/newfiles

# List tape contents
tar -tvf /dev/st0

# Extract from tape
tar -xvf /dev/st0
```

### Remote Operations
```bash
# Backup to remote host
tar -czvf - /home | ssh user@remote "cat > /backup/remote_backup.tar.gz"

# Backup from remote host
ssh user@remote "tar -czvf - /home" > /backup/remote_home.tar.gz

# Extract to remote host
ssh user@remote "tar -xvf -" < backup.tar.gz

# Copy directory between hosts
ssh user@source "tar -czvf - /home/user" | ssh user@dest "tar -xzvf - -C /backup/"
```

## Practical Examples

### Automated Backup Script
```bash
#!/bin/bash
# Comprehensive backup script using tar

BACKUP_DIR="/backups/tar"
SOURCE_DIRS="/home /etc /var/www"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/tar_backup.log"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to backup directory
backup_directory() {
    local source_dir="$1"
    local backup_name="$(basename $source_dir)_backup_$DATE"
    local backup_file="$BACKUP_DIR/$backup_name.tar.gz"

    echo "$(date): Starting backup of $source_dir" >> "$LOG_FILE"

    # Create backup with exclusion and progress
    tar --exclude="*.tmp" \
        --exclude="*.log" \
        --exclude="cache/" \
        --exclude="*.cache" \
        --exclude="node_modules/" \
        --exclude=".git/" \
        -czf "$backup_file" \
        "$source_dir" \
        --totals >> "$LOG_FILE" 2>&1

    if [ $? -eq 0 ]; then
        # Create checksum
        md5sum "$backup_file" > "$backup_file.md5"

        # Get backup size
        backup_size=$(du -h "$backup_file" | cut -f1)

        echo "$(date): Backup completed: $backup_name ($backup_size)" >> "$LOG_FILE"

        # Create backup metadata
        cat > "$backup_file.info" << EOF
Backup Information:
==================
Source: $source_dir
Date: $(date)
Size: $backup_size
Checksum: $(cat "$backup_file.md5")
Host: $(hostname)
Kernel: $(uname -r)
EOF

        return 0
    else
        echo "$(date): ERROR: Backup failed for $source_dir" >> "$LOG_FILE"
        return 1
    fi
}

# Backup all directories
backup_failed=0
for dir in $SOURCE_DIRS; do
    if [ -d "$dir" ]; then
        backup_directory "$dir" || backup_failed=1
    else
        echo "$(date): WARNING: Directory $dir does not exist" >> "$LOG_FILE"
    fi
done

# Cleanup old backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "*.md5" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "*.info" -mtime +$RETENTION_DAYS -delete

# Send notification if backup failed
if [ $backup_failed -eq 1 ]; then
    echo "$(date): One or more backups failed" | \
    mail -s "Backup Alert: $(hostname)" admin@company.com
fi

echo "$(date): Backup procedure completed" >> "$LOG_FILE"
```

### Incremental Backup System
```bash
#!/bin/bash
# Incremental backup system with weekly full backups

BACKUP_ROOT="/backups/incremental"
SNAPSHOT_FILE="$BACKUP_ROOT/snapshot.snar"
SOURCE_DIR="/home"
TODAY=$(date +%u)  # 1=Monday, 7=Sunday

# Create backup directory
mkdir -p "$BACKUP_ROOT"

# Determine backup level
if [ "$TODAY" -eq 1 ]; then
    # Monday: Level 0 (full backup)
    LEVEL=0
    TYPE="full"
    rm -f "$SNAPSHOT_FILE"
else
    # Other days: Level 1 (incremental)
    LEVEL=1
    TYPE="incremental"
fi

BACKUP_FILE="$BACKUP_DIR/${TYPE}_backup_$(date +%Y%m%d).tar.gz"

echo "Starting $TYPE backup (level $LEVEL) of $SOURCE_DIR"

# Create backup
tar --create \
    --file="$BACKUP_FILE" \
    --listed-incremental="$SNAPSHOT_FILE" \
    --gzip \
    --exclude="*.tmp" \
    --exclude="*.log" \
    --exclude="cache/" \
    --verbose \
    --totals \
    "$SOURCE_DIR"

if [ $? -eq 0 ]; then
    echo "Backup completed: $BACKUP_FILE"

    # Create backup info
    echo "Backup Type: $TYPE (Level $LEVEL)" > "$BACKUP_FILE.info"
    echo "Date: $(date)" >> "$BACKUP_FILE.info"
    echo "Size: $(du -h "$BACKUP_FILE" | cut -f1)" >> "$BACKUP_FILE.info"
    echo "Source: $SOURCE_DIR" >> "$BACKUP_FILE.info"

    # Keep full backups for 4 weeks, incrementals for 1 week
    if [ "$LEVEL" -eq 0 ]; then
        find "$BACKUP_ROOT" -name "full_backup_*.tar.gz" -mtime +28 -delete
        find "$BACKUP_ROOT" -name "full_backup_*.info" -mtime +28 -delete
    else
        find "$BACKUP_ROOT" -name "incremental_backup_*.tar.gz" -mtime +7 -delete
        find "$BACKUP_ROOT" -name "incremental_backup_*.info" -mtime +7 -delete
    fi
else
    echo "Backup failed"
    exit 1
fi
```

### Database Backup Integration
```bash
#!/bin/bash
# Backup system files and databases together

BACKUP_DIR="/backups/system"
DATE=$(date +%Y%m%d_%H%M%S)
DB_USER="backup_user"
DB_PASS="backup_password"

mkdir -p "$BACKUP_DIR"

# Function to backup database
backup_database() {
    local db_name="$1"
    local backup_file="$BACKUP_DIR/${db_name}_backup_$DATE.sql.gz"

    echo "Backing up database: $db_name"

    mysqldump -u "$DB_USER" -p"$DB_PASS" \
        --single-transaction \
        --routines \
        --triggers \
        "$db_name" | gzip > "$backup_file"

    if [ $? -eq 0 ]; then
        echo "Database backup completed: $backup_file"
    else
        echo "Database backup failed: $db_name"
        return 1
    fi
}

# Function to backup system files
backup_system() {
    local backup_file="$BACKUP_DIR/system_backup_$DATE.tar.gz"

    echo "Backing up system files"

    tar --create \
        --file="$backup_file" \
        --gzip \
        --exclude="*.log" \
        --exclude="*.tmp" \
        --exclude="/proc" \
        --exclude="/sys" \
        --exclude="/dev" \
        --exclude="/run" \
        --exclude="/tmp" \
        --exclude="/var/tmp" \
        --exclude="/var/cache" \
        --exclude="/var/log" \
        /etc /home /opt /usr/local \
        --totals

    if [ $? -eq 0 ]; then
        echo "System backup completed: $backup_file"
        return 0
    else
        echo "System backup failed"
        return 1
    fi
}

# Backup all databases
databases="wordpress company_data analytics"
backup_failed=0

for db in $databases; do
    backup_database "$db" || backup_failed=1
done

# Backup system files
backup_system || backup_failed=1

# Create comprehensive backup manifest
cat > "$BACKUP_DIR/backup_manifest_$DATE.txt" << EOF
System Backup Manifest
======================
Date: $(date)
Hostname: $(hostname)

Database Backups:
$(ls -la "$BACKUP_DIR"/*_backup_$DATE.sql.gz 2>/dev/null || echo "No database backups")

System Files:
$(ls -la "$BACKUP_DIR"/system_backup_$DATE.tar.gz 2>/dev/null || echo "No system backup")

Total Size:
$(du -sh "$BACKUP_DIR"/*backup*$DATE* 2>/dev/null | awk '{sum+=$1} END {print sum " bytes"}')
EOF

if [ $backup_failed -eq 1 ]; then
    echo "Some backups failed. Check logs."
    exit 1
else
    echo "All backups completed successfully"
fi
```

### Disaster Recovery Preparation
```bash
#!/bin/bash
# Create disaster recovery backup

BACKUP_DIR="/backups/disaster_recovery"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/dr_backup_$DATE.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "Creating disaster recovery backup"

# Critical system directories
CRITICAL_DIRS="/etc /home /var /opt /usr/local /boot /root"

# Create comprehensive backup
tar --create \
    --file="$BACKUP_FILE" \
    --gzip \
    --exclude="*.tmp" \
    --exclude="*.log" \
    --exclude="/var/tmp" \
    --exclude="/var/cache" \
    --exclude="/var/run" \
    --exclude="/var/lock" \
    --exclude="/proc" \
    --exclude="/sys" \
    --exclude="/dev" \
    --exclude="/tmp" \
    --exclude="/home/*/.cache" \
    --exclude="/home/*/.local/share/Trash" \
    --preserve-permissions \
    --preserve-order \
    --same-owner \
    --numeric-owner \
    --one-file-system \
    --totals \
    $CRITICAL_DIRS

if [ $? -eq 0 ]; then
    echo "Disaster recovery backup completed: $BACKUP_FILE"

    # Create recovery documentation
    cat > "$BACKUP_DIR/RECOVERY_INSTRUCTIONS_$DATE.txt" << 'EOF'
Disaster Recovery Instructions
=============================

1. Boot system from rescue media
2. Mount target filesystems
3. Extract backup:
   cd /mnt/target
   tar -xpf dr_backup_YYYYMMDD_HHMMSS.tar.gz

4. Reinstall bootloader:
   grub-install /dev/sda

5. Reboot system

Note: This backup contains:
- System configuration (/etc)
- User home directories (/home)
- Application data (/var, /opt)
- Custom software (/usr/local)
- Boot configuration (/boot)
- Root user data (/root)

Before restoring, ensure:
- Sufficient disk space
- Correct filesystem structure
- Backup integrity verification
EOF

    # Create checksum for verification
    md5sum "$BACKUP_FILE" > "$BACKUP_FILE.md5"

    # Split backup for smaller media if needed
    if [ $(stat -c%s "$BACKUP_FILE") -gt 4700000000 ]; then  # > 4.7GB
        echo "Splitting backup for DVD media"
        split -b 4700M "$BACKUP_FILE" "$BACKUP_FILE.part"
        echo "Backup split into multiple parts"
    fi

else
    echo "Disaster recovery backup failed"
    exit 1
fi
```

### Backup Verification and Testing
```bash
#!/bin/bash
# Verify backup integrity and test restore procedures

BACKUP_DIR="/backups/verification"
TEST_DIR="/tmp/restore_test_$(date +%Y%m%d_%H%M%S)"
RESULTS_FILE="/tmp/backup_verification_$(date +%Y%m%d).txt"

mkdir -p "$TEST_DIR"
echo "Backup Verification Report" > "$RESULTS_FILE"
echo "Generated: $(date)" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

# Function to test backup file
test_backup() {
    local backup_file="$1"

    if [ ! -f "$backup_file" ]; then
        echo "ERROR: Backup file not found: $backup_file" >> "$RESULTS_FILE"
        return 1
    fi

    echo "Testing: $(basename $backup_file)" >> "$RESULTS_FILE"

    # Check file integrity
    if file "$backup_file" | grep -q "gzip compressed"; then
        echo "- Format: gzip compressed tar" >> "$RESULTS_FILE"

        # Test gzip integrity
        if gzip -t "$backup_file" 2>/dev/null; then
            echo "- Gzip integrity: OK" >> "$RESULTS_FILE"
        else
            echo "- ERROR: Gzip integrity check failed" >> "$RESULTS_FILE"
            return 1
        fi
    else
        echo "- Format: uncompressed tar" >> "$RESULTS_FILE"
    fi

    # List archive contents (first 10 files)
    echo "- Sample contents:" >> "$RESULTS_FILE"
    tar -tf "$backup_file" 2>/dev/null | head -10 | sed 's/^/  /' >> "$RESULTS_FILE"

    # Test extraction of small files
    echo "- Testing extraction:" >> "$RESULTS_FILE"
    if tar -xf "$backup_file" -C "$TEST_DIR" 2>/dev/null; then
        extracted_files=$(find "$TEST_DIR" -type f | wc -l)
        echo "- Extraction successful ($extracted_files files)" >> "$RESULTS_FILE"

        # Verify a few random files
        find "$TEST_DIR" -type f | head -5 | while read file; do
            if [ -f "$file" ] && [ -s "$file" ]; then
                echo "- File $(basename "$file"): OK" >> "$RESULTS_FILE"
            else
                echo "- ERROR: File $(basename "$file") corrupted" >> "$RESULTS_FILE"
            fi
        done

        # Cleanup test extraction
        rm -rf "$TEST_DIR"/*
    else
        echo "- ERROR: Extraction failed" >> "$RESULTS_FILE"
        return 1
    fi

    echo "" >> "$RESULTS_FILE"
    return 0
}

# Test all recent backups
for backup in "$BACKUP_DIR"/*.tar.gz; do
    if [ -f "$backup" ]; then
        test_backup "$backup"
    fi
done

# Cleanup
rm -rf "$TEST_DIR"

echo "Backup verification completed. Report saved to: $RESULTS_FILE"

# Display summary
echo "Verification Summary:"
echo "=================="
grep -c "OK" "$RESULTS_FILE" && echo "Files verified successfully"
grep -c "ERROR" "$RESULTS_FILE" && echo "Errors found"
```

## Real-World Scenarios

### Web Application Backup
```bash
#!/bin/bash
# Web application backup with code, database, and media

APP_NAME="myapp"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/backups/webapps/$APP_NAME"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup application code
echo "Backing up application code"
tar --create \
    --file="$BACKUP_DIR/${APP_NAME}_code_$DATE.tar.gz" \
    --gzip \
    --exclude="*.log" \
    --exclude="cache/*" \
    --exclude="storage/logs/*" \
    --exclude="storage/framework/cache/*" \
    --exclude="node_modules/*" \
    --exclude="vendor/*" \
    "$APP_DIR"

# Backup uploaded media
echo "Backing up user uploads"
tar --create \
    --file="$BACKUP_DIR/${APP_NAME}_uploads_$DATE.tar.gz" \
    --gzip \
    "$APP_DIR/public/uploads"

# Backup configuration files
echo "Backing up configuration"
tar --create \
    --file="$BACKUP_DIR/${APP_NAME}_config_$DATE.tar.gz" \
    --gzip \
    "$APP_DIR/.env" \
    /etc/nginx/sites-available/"$APP_NAME" \
    /etc/apache2/sites-available/"$APP_NAME"

# Database backup (MySQL example)
echo "Backing up database"
mysqldump --single-transaction "$APP_NAME" | gzip > "$BACKUP_DIR/${APP_NAME}_db_$DATE.sql.gz"

# Create backup manifest
cat > "$BACKUP_DIR/backup_info_$DATE.txt" << EOF
Application Backup: $APP_NAME
Date: $(date)
Components:
- Code: ${APP_NAME}_code_$DATE.tar.gz
- Uploads: ${APP_NAME}_uploads_$DATE.tar.gz
- Config: ${APP_NAME}_config_$DATE.tar.gz
- Database: ${APP_NAME}_db_$DATE.sql.gz
Total Size: $(du -sh "$BACKUP_DIR"/*_$DATE* | awk '{sum+=$1} END {print sum}')
EOF

echo "Web application backup completed"
```

### Cross-Platform Migration
```bash
#!/bin/bash
# Prepare backup for cross-platform migration

SOURCE_DIR="/home/user"
TARGET_FILE="/tmp/user_migration.tar"
PLATFORM="linux"  # or windows, macos

echo "Creating cross-platform migration backup"

# Create tar with platform-specific options
if [ "$PLATFORM" = "windows" ]; then
    # Windows compatibility - convert paths, handle permissions
    tar --create \
        --file="$TARGET_FILE" \
        --exclude=".cache" \
        --exclude=".local/share/Trash" \
        --transform='s|/|\\|g' \
        --mode=a+rw \
        --owner=0 \
        --group=0 \
        "$SOURCE_DIR"

elif [ "$PLATFORM" = "macos" ]; then
    # macOS compatibility - preserve extended attributes
    tar --create \
        --file="$TARGET_FILE" \
        --exclude=".DS_Store" \
        --exclude="._*" \
        --xattrs \
        "$SOURCE_DIR"

else
    # Linux - preserve all attributes
    tar --create \
        --file="$TARGET_FILE" \
        --preserve-permissions \
        --same-owner \
        --numeric-owner \
        --xattrs \
        --acls \
        "$SOURCE_DIR"
fi

# Create migration instructions
cat > "${TARGET_FILE}.README" << EOF
Migration Instructions
===================

Platform: $PLATFORM
Date: $(date)
Source: $SOURCE_DIR

To restore on $PLATFORM:

1. Extract backup:
   tar -xf user_migration.tar

2. If restoring to different platform, run:
   - Linux: tar --xattrs --acls -xf user_migration.tar
   - macOS: tar -x --xattrs -xf user_migration.tar
   - Windows: Use 7-Zip or WinRAR to extract

3. Update ownership if necessary:
   sudo chown -R username:username /path/to/restored/files

4. Check file permissions and adjust as needed

Note: Some system-specific files were excluded for compatibility.
EOF

echo "Migration backup created: $TARGET_FILE"
echo "Instructions saved: ${TARGET_FILE}.README"
```

## Performance Optimization

### Optimizing Large Backups
```bash
# Use larger block size for better performance
tar --create --blocking-factor=128 -f backup.tar /large/directory

# Use multiple CPU cores for compression
tar --create --use-compress-program="pigz -p 4" -f backup.tar.gz /directory

# Exclude unnecessary files to reduce size
tar --create --exclude-from=exclude_patterns.txt -f backup.tar /directory

# Split large archives for network transfer
tar --create -f - /directory | split -b 100M - backup_part_
```

### Network Optimization
```bash
# Compress during network transfer
tar --create --gzip -f - /directory | ssh remote "cat > backup.tar.gz"

# Use different compression levels based on network speed
# Fast network (no compression)
tar --create -f - /directory | ssh remote "cat > backup.tar"

# Slow network (max compression)
tar --create --use-compress-program="gzip -9" -f - /directory | ssh remote "cat > backup.tar.gz"
```

## Related Commands

- [`gzip`](/docs/commands/compression/gzip) - Compress and decompress files
- [`bzip2`](/docs/commands/compression/bzip2) - Block-sorting file compressor
- [`xz`](/docs/commands/compression/xz) - XZ format compression utility
- [`rsync`](/docs/commands/backup-recovery/rsync) - Remote file synchronization
- [`cpio`](/docs/commands/backup-recovery/cpio) - Copy files to and from archives
- [`find`](/docs/commands/file-management/find) - Search for files and directories

## Best Practices

1. **Use appropriate compression** - Balance compression ratio vs. CPU usage
2. **Exclude unnecessary files** - Reduce backup size and time
3. **Test backups regularly** - Verify you can restore from archives
4. **Use meaningful naming** - Include dates and descriptions in filenames
5. **Document backup procedures** - Keep clear instructions for recovery
6. **Monitor backup sizes** - Ensure sufficient storage space
7. **Use incremental backups** - Save time and storage space
8. **Preserve file attributes** - Use appropriate options for your use case
9. **Schedule backups appropriately** - Run during low-usage periods
10. **Maintain multiple backup copies** - Protect against backup corruption

The `tar` command remains one of the most versatile and reliable backup tools available on Linux systems. Its extensive feature set, compression support, and wide compatibility make it suitable for everything from simple file archiving to enterprise backup strategies. Understanding its various options and best practices ensures efficient and reliable backup operations.