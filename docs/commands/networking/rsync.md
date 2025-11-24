---
title: rsync - Remote Sync File Transfer and Synchronization
sidebar_label: rsync
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rsync - Remote Sync File Transfer and Synchronization

The `rsync` command is a powerful remote data synchronization tool that rapidly synchronizes files and directories between two locations across networks or locally. It uses an efficient algorithm that transfers only the differences between source and destination files, making it significantly faster than traditional copy methods for incremental updates.

## Basic Syntax

```bash
rsync [OPTIONS] SOURCE DESTINATION
rsync [OPTIONS] SOURCE [USER@]HOST:DESTINATION
rsync [OPTIONS] [USER@]HOST:SOURCE DESTINATION
rsync [OPTIONS] [USER@]HOST::SOURCE DESTINATION
rsync [OPTIONS] SOURCE [USER@]HOST::DESTINATION
rsync [OPTIONS] rsync://[USER@]HOST[:PORT]/SOURCE [DESTINATION]
```

## Common Options

### Basic Options
- `-v, --verbose` - Verbose output, show transfer progress
- `-q, --quiet` - Suppress non-error messages
- `-c, --checksum` - Skip based on checksum, not mod-time & size
- `-a, --archive` - Archive mode, equivalent to `-rlptgoD`
- `-r, --recursive` - Recurse into directories
- `-b, --backup` - Make backups (see `--suffix` & `--backup-dir`)
- `-u, --update` - Skip files that are newer on the receiver
- `-n, --dry-run` - Show what would be transferred without actual transfer

### File Preservation
- `-p, --perms` - Preserve permissions
- `-o, --owner` - Preserve owner (super-user only)
- `-g, --group` - Preserve group
- `-t, --times` - Preserve modification times
- `-l, --links` - Copy symlinks as symlinks
- `-L, --copy-links` - Transform symlink into referent file
- `-H, --hard-links` - Preserve hard links
- `-D, --devices` - Preserve device and special files
- `-S, --sparse` - Handle sparse files efficiently

### Transfer Control
- `-z, --compress` - Compress file data during transfer
- `--progress` - Show progress during transfer
- `-P` - Same as `--partial --progress`
- `--partial` - Keep partially transferred files
- `--delete` - Delete extraneous files from destination
- `--exclude=PATTERN` - Exclude files matching pattern
- `--include=PATTERN` - Include files matching pattern

### Remote Execution
- `-e, --rsh=COMMAND` - Specify remote shell (default: ssh)
- `--rsync-path=PROGRAM` - Specify path to rsync on remote machine
- `--timeout=SECONDS` - Set I/O timeout in seconds

## Usage Examples

### Basic Local Synchronization
```bash
# Copy directory with all subdirectories
rsync -r /home/user/documents/ /backup/documents/

# Archive mode - preserves all file attributes
rsync -a /home/user/documents/ /backup/documents/

# Copy only directory contents (no trailing slash on source)
rsync -a /home/user/documents /backup/

# Dry run to see what would be transferred
rsync -av --dry-run /source/ /destination/
```

### Remote Synchronization via SSH
```bash
# Copy local directory to remote server
rsync -avz -e ssh /local/path/ user@remote:/remote/path/

# Pull files from remote server
rsync -avz -e ssh user@remote:/remote/path/ /local/path/

# Sync with specific SSH port
rsync -avz -e "ssh -p 2222" /local/ user@remote:/remote/

# Using SSH key for authentication
rsync -avz -e "ssh -i /path/to/key" /local/ user@remote:/remote/
```

### Exclusion and Inclusion Patterns
```bash
# Exclude specific file types
rsync -av --exclude='*.tmp' /source/ /destination/

# Exclude multiple patterns
rsync -av --exclude='*.log' --exclude='*.tmp' /source/ /destination/

# Exclude directory and its contents
rsync -av --exclude 'cache/' /source/ /destination/

# Include specific files but exclude everything else
rsync -av --include='*.txt' --exclude='*' /source/ /destination/

# Use exclusion file
rsync -av --exclude-from='exclude.txt' /source/ /destination/
```

### Backup and Restore Operations
```bash
# Create backup with timestamp
rsync -av --backup --backup-dir=/backup/old/$(date +%Y%m%d) /source/ /backup/current/

# Mirror directory (delete files not in source)
rsync -av --delete /source/ /destination/

# Update only newer files
rsync -avu /source/ /destination/

# Copy preserving all attributes including hard links
rsync -aHAX /source/ /destination/
```

### Network Performance Optimization
```bash
# Compress during transfer (good for slow networks)
rsync -avz /source/ remote:/destination/

# Limit bandwidth usage (KB/s)
rsync -av --bwlimit=1000 /source/ /destination/

# Use specific block size
rsync -av --block-size=8192 /source/ /destination/

# Check file integrity after transfer
rsync -avc /source/ /destination/
```

## Advanced Usage

### Incremental Backups with Hard Links
```bash
# First full backup
rsync -a --link-dest=/backup/previous /source/ /backup/current/$(date +%Y%m%d)/

# Subsequent incremental backups
rsync -a --link-dest=/backup/current/$(date -d yesterday +%Y%m%d) \
       /source/ /backup/current/$(date +%Y%m%d)/
```

### Remote Server Setup (rsync daemon)
```bash
# Create rsyncd.conf configuration file
cat > /etc/rsyncd.conf << 'EOF'
uid = nobody
gid = nobody
max connections = 4
log file = /var/log/rsyncd.log
pid file = /var/run/rsyncd.pid
secrets file = /etc/rsyncd.secrets

[backup]
comment = Backup area
path = /backup
read only = false
auth users = backupuser
EOF

# Create password file
echo "backupuser:secretpassword" > /etc/rsyncd.secrets
chmod 600 /etc/rsyncd.secrets

# Start rsync daemon
rsync --daemon --config=/etc/rsyncd.conf
```

### Using rsync with rsync daemon
```bash
# List available modules
rsync rsync::backupserver

# Copy to rsync daemon
rsync -av /local/path/ rsync://backupuser@backupserver/backup/

# Copy from rsync daemon
rsync -av rsync://backupuser@backupserver/backup/ /local/path/
```

## Practical Examples

### Web Server Backup
```bash
#!/bin/bash
# Backup web server files
SOURCE="/var/www/html"
BACKUP_DIR="/backup/webserver"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/backup.log"

# Create backup directory
mkdir -p "$BACKUP_DIR/$DATE"

# Perform backup with detailed logging
rsync -avz --delete \
      --exclude="cache/" \
      --exclude="logs/*.log" \
      --exclude="tmp/" \
      --log-file="$LOG_FILE" \
      "$SOURCE/" "$BACKUP_DIR/$DATE/"

# Keep last 7 days of backups
find "$BACKUP_DIR" -type d -mtime +7 -exec rm -rf {} \;
```

### Database Backup Synchronization
```bash
#!/bin/bash
# Sync database backups to remote storage
LOCAL_BACKUP="/var/backups/mysql"
REMOTE_SERVER="backup@remote.server.com"
REMOTE_PATH="/remote/mysql_backups"

# Create today's backup if it doesn't exist
if [ ! -f "$LOCAL_BACKUP/daily_$(date +%Y%m%d).sql.gz" ]; then
    mysqldump --all-databases | gzip > "$LOCAL_BACKUP/daily_$(date +%Y%m%d).sql.gz"
fi

# Sync to remote server
rsync -avz --delete \
      --include="daily_$(date +%Y%m%d).sql.gz" \
      --include="weekly_*.sql.gz" \
      --exclude="*" \
      "$LOCAL_BACKUP/" "$REMOTE_SERVER:$REMOTE_PATH/"
```

### Home Directory Backup with User Configuration
```bash
#!/bin/bash
# User home directory backup with configuration
USER_HOME="/home/john"
BACKUP_DIR="/backup/users/john"
CONFIG_FILE="$HOME/.backup_config"

# Load backup configuration if exists
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    # Default configuration
    EXCLUDE_PATTERNS=(
        ".cache"
        ".local/share/Trash"
        "Downloads/*.iso"
        "tmp/*"
        ".mozilla/firefox/*/cache2"
    )
fi

# Build exclude arguments
EXCLUDE_ARGS=()
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    EXCLUDE_ARGS+=(--exclude="$pattern")
done

# Perform backup
rsync -avx --progress --delete "${EXCLUDE_ARGS[@]}" \
      "$USER_HOME/" "$BACKUP_DIR/"
```

### System Configuration Backup
```bash
#!/bin/bash
# Backup critical system configuration files
CONFIG_FILES=(
    "/etc/fstab"
    "/etc/hosts"
    "/etc/passwd"
    "/etc/group"
    "/etc/shadow"
    "/etc/ssh/sshd_config"
    "/etc/crontab"
    "/var/spool/cron"
    "/etc/network/interfaces"
    "/etc/resolv.conf"
)

BACKUP_DIR="/backup/config/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Backup individual configuration files
for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        rsync -a "$file" "$BACKUP_DIR/"
    fi
done

# Backup entire /etc directory structure
rsync -a --exclude="dev/" --exclude="proc/" --exclude="sys/" \
      /etc/ "$BACKUP_DIR/etc_full/"
```

## Real-World Scenarios

### Disaster Recovery Setup
```bash
#!/bin/bash
# Comprehensive disaster recovery backup

BACKUP_SERVER="dr-backup.company.com"
BACKUP_USER="drsync"
BACKUP_PATH="/disaster_recovery"

# System files and critical data
SYSTEM_DIRS=(
    "/etc"
    "/home"
    "/var/www"
    "/opt/applications"
    "/usr/local/bin"
)

DATABASES=(
    "/var/lib/mysql"
    "/var/lib/postgresql"
)

# System configuration backup
rsync -avz --delete \
      --exclude="*.log" \
      --exclude="*.pid" \
      /etc/ "$BACKUP_USER@$BACKUP_SERVER:$BACKUP_PATH/etc/"

# User data backup
for dir in "${SYSTEM_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        rsync -avz --delete --exclude="*.tmp" --exclude="cache/" \
              "$dir/" "$BACKUP_USER@$BACKUP_SERVER:$BACKUP_PATH$dir/"
    fi
done

# Database backups (databases should be stopped or in backup mode)
for db_dir in "${DATABASES[@]}"; do
    if [ -d "$db_dir" ]; then
        rsync -avz "$db_dir/" "$BACKUP_USER@$BACKUP_SERVER:$BACKUP_PATH$db_dir/"
    fi
done
```

### Development Environment Sync
```bash
#!/bin/bash
# Sync development environment between machines

DEV_SERVER="dev.company.com"
PROJECT_DIR="/var/www/project"
LOCAL_DEV="$HOME/dev"

# Sync project files excluding development-specific items
rsync -avz --delete \
      --exclude="node_modules/" \
      --exclude="vendor/" \
      --exclude=".git/" \
      --exclude="*.log" \
      --exclude="storage/logs/*" \
      --exclude="storage/framework/cache/*" \
      "$PROJECT_DIR/" "$LOCAL_DEV/project/"

# Sync database structure (no data)
mysqldump --no-data --single-transaction project_name | \
      ssh "$DEV_SERVER" "mysql -u root -p project_dev"
```

## Monitoring and Automation

### Automated Daily Backup Script
```bash
#!/bin/bash
# Automated daily backup with monitoring and reporting

LOG_FILE="/var/log/daily_backup.log"
EMAIL_ADMIN="admin@company.com"
BACKUP_SUCCESS=true

# Function to log and send notification
log_and_notify() {
    echo "$(date): $1" >> "$LOG_FILE"
    if [ "$BACKUP_SUCCESS" = false ] || [ "$1" = "ERROR:*" ]; then
        echo "$1" | mail -s "Backup Alert: $(hostname)" "$EMAIL_ADMIN"
    fi
}

# Start backup
log_and_notify "Starting daily backup"

# Backup critical directories
BACKUP_DIRS=("/home" "/etc" "/var/www")
for dir in "${BACKUP_DIRS[@]}"; do
    if rsync -avz --delete "$dir/" "backup:/backup$(dirname $dir)/$(basename $dir)/" >> "$LOG_FILE" 2>&1; then
        log_and_notify "Successfully backed up $dir"
    else
        BACKUP_SUCCESS=false
        log_and_notify "ERROR: Failed to backup $dir"
    fi
done

# Cleanup old backups (keep 30 days)
find /backup -type d -mtime +30 -exec rm -rf {} \; 2>/dev/null

# Final status
if [ "$BACKUP_SUCCESS" = true ]; then
    log_and_notify "Daily backup completed successfully"
else
    log_and_notify "ERROR: Daily backup completed with errors"
fi
```

## Performance Tuning

### Large File Transfer Optimization
```bash
# For large files, adjust chunk size and use whole-file copy
rsync -av --whole-file --block-size=8M /large/files/ /destination/

# Disable delta algorithm for files that are mostly different
rsync -av --whole-file /source/ /destination/

# Use checksum for integrity verification (slower but more reliable)
rsync -avc /source/ /destination/
```

### Network-Specific Optimizations
```bash
# For high-latency networks
rsync -avz --timeout=300 --contimeout=60 /source/ remote:/dest/

# For unreliable networks
rsync -avz --partial --inplace /source/ remote:/dest/

# For very fast networks (local or 10GbE)
rsync -av --no-compress /source/ /dest/
```

## Related Commands

- [`scp`](/docs/commands/network/scp) - Secure copy over SSH
- [`tar`](/docs/commands/backup-recovery/tar) - Archive utility for creating compressed backups
- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`dd`](/docs/commands/backup-recovery/dd) - Convert and copy a file at block level
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`ssh`](/docs/commands/network/ssh) - Secure shell client

## Best Practices

1. **Always use dry-run first** - Test your rsync command with `--dry-run` before execution
2. **Use trailing slashes consistently** - `/source/` vs `/source` changes behavior significantly
3. **Archive mode for backups** - Use `-a` option to preserve all file attributes
4. **Monitor bandwidth usage** - Use `--bwlimit` on production networks
5. **Implement proper exclusion patterns** - Exclude temporary files, cache, and system directories
6. **Use SSH key authentication** - More secure and convenient than password authentication
7. **Verify transfers** - Use `-c` checksum option for critical backups
8. **Test restore procedures** - Regularly verify that you can restore from backups
9. **Log backup operations** - Keep detailed logs for troubleshooting and auditing
10. **Plan for growth** - Consider scalability when designing backup strategies

The `rsync` command is an essential tool for system administrators and developers for creating efficient, reliable backup and synchronization solutions. Mastering its extensive options and understanding the various usage patterns will enable you to create robust backup strategies for any environment.