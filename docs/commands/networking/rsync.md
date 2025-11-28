---
title: rsync - Remote Sync File Transfer and Synchronization
sidebar_label: rsync
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rsync - Remote Sync File Transfer and Synchronization

The `rsync` command is a highly efficient file transfer and synchronization tool that excels at transferring only the differences between source and destination files. Using the rsync algorithm, it minimizes data transfer by identifying and sending only changed portions of files, making it ideal for backups, mirroring, and incremental transfers. Rsync operates both locally and over remote connections, supports compression, preserves file attributes, and provides extensive filtering and exclusion capabilities. Its delta-transfer algorithm, security features, and robust error handling make it the de facto standard for file synchronization in Unix/Linux environments.

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

### Mode Options
- `-a, --archive` - Archive mode (equivalent to -rlptgoD)
- `-r, --recursive` - Recurse into directories
- `-d, --dirs` - Transfer directories without recursing
- `-l, --links` - Copy symlinks as symlinks
- `-L, --copy-links` - Transform symlinks into referent files
- `--copy-unsafe-links` - Transform "unsafe" symlinks into referent files
- `--safe-links` - Ignore symlinks outside destination tree
- `--copy-dirlinks` - Transform symlink to dir into referent dir
- `-k, --copy-dirlinks` - Transform symlink to directory into referent directory

### File Preservation
- `-p, --perms` - Preserve permissions
- `-o, --owner` - Preserve owner (super-user only)
- `-g, --group` - Preserve group
- `-t, --times` - Preserve modification times
- `-A, --acls` - Preserve ACLs (implies -p)
- `-X, --xattrs` - Preserve extended attributes
- `-H, --hard-links` - Preserve hard links
- `-S, --sparse` - Handle sparse files efficiently
- `-n, --dry-run` - Show what would be transferred without actual transfer
- `--numeric-ids` - Don't map uid/gid values by user/group name

### Transfer Control
- `-z, --compress` - Compress file data during transfer
- `--compress-level=NUM` - Explicitly set compression level (0-9)
- `--skip-compress=LIST` - Skip compressing files with suffix in LIST
- `-P` - Same as --partial --progress
- `--partial` - Keep partially transferred files
- `--partial-dir=DIR` - Put partially transferred files into DIR
- `--delay-updates` - Put all updated files into place at transfer's end
- `--progress` - Show progress during transfer
- `--delete` - Delete extraneous files from destination
- `--delete-before` - Delete before transfer
- `--delete-during` - Delete during transfer (default)
- `--delete-delay` - Find deletions during, delete after
- `--delete-after` - Delete after transfer
- `--delete-excluded` - Also delete excluded files from destination dirs

### Filtering Options
- `--exclude=PATTERN` - Exclude files matching PATTERN
- `--exclude-from=FILE` - Read exclude patterns from FILE
- `--include=PATTERN` - Include files matching PATTERN
- `--include-from=FILE` - Read include patterns from FILE
- `--filter=RULE` - Add a file-filtering RULE
- `-f, --filter=RULE` - Same as --filter
- `-C, --cvs-exclude` - Auto-ignore files the same way CVS does

### Backup Options
- `-b, --backup` - Make backups (see --suffix & --backup-dir)
- `--backup-dir=DIR` - Make backups into hierarchy based in DIR
- `--suffix=SUFFIX` - Backup suffix (default ~ w/o --backup-dir)
- `--inplace` - Update destination files in-place
- `--append` - Append data onto shorter files
- `--append-verify` - Like --append, but with old data verification

### Remote and Network
- `-e, --rsh=COMMAND` - Specify remote shell (default: ssh)
- `--rsync-path=PROGRAM` - Specify path to rsync on remote machine
- `--timeout=SECONDS` - Set I/O timeout in seconds
- `--contimeout=SECONDS` - Set connection timeout in seconds
- `--port=PORT` - Specify double-colon alternate port number
- `--blocking-io` - Use blocking I/O for the remote shell
- `--outbuf=N` - Set output buffering (None, Line, Block)
- `--stats` - Give some file-transfer stats
- `-h, --human-readable` - Output numbers in a human-readable format
- `--progress` - Show progress during transfer

### Bandwidth and Performance
- `--bwlimit=RATE` - Limit socket I/O bandwidth (KB/s)
- `--no-whole-file` - Turn off --whole-file (default with remote transfers)
- `--whole-file` - Copy files whole (without rsync algorithm)
- `--block-size=SIZE` - Force a fixed checksum block-size
- `--max-size=SIZE` - Don't transfer any file larger than SIZE
- `--min-size=SIZE` - Don't transfer any file smaller than SIZE
- `--max-delete=NUM` - Don't delete more than NUM files

### Logging and Monitoring
- `-v, --verbose` - Verbose output
- `-q, --quiet` - Suppress non-error messages
- `-i, --itemize-changes` - Output a change-summary for all updates
- `--log-file=FILE` - Log what we're doing to the specified FILE
- `--log-file-format=FMT` - Log updates using the specified FMT
- `--out-format=FORMAT` - Output updates using the specified FORMAT

## Usage Examples

### Basic Local Operations

#### File and Directory Copying
```bash
# Copy single file
rsync -v file.txt /backup/

# Copy directory recursively
rsync -av /home/user/documents/ /backup/documents/

# Copy directory contents (no trailing slash on source)
rsync -av /home/user/documents /backup/

# Archive mode with verbose output
rsync -avz /source/ /destination/

# Copy with progress indicator
rsync -avP /large/files/ /backup/
```

#### Dry Run and Testing
```bash
# Test what would be transferred
rsync -avn --dry-run /source/ /destination/

# Show itemized changes
rsync -avi --dry-run /source/ /destination/

# Check differences without transferring
rsync -avc --dry-run /source/ /destination/

# Detailed statistics
rsync -av --stats /source/ /destination/
```

### Remote Synchronization

#### SSH-Based Transfers
```bash
# Copy to remote server with SSH
rsync -avz -e ssh /local/path/ user@remote:/remote/path/

# Pull from remote server
rsync -avz -e ssh user@remote:/remote/path/ /local/path/

# Use custom SSH port
rsync -avz -e "ssh -p 2222" /local/ user@remote:/remote/

# Use SSH key authentication
rsync -avz -e "ssh -i /path/to/private_key" /local/ user@remote:/remote/

# Use specific SSH options
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" /local/ user@remote:/remote/
```

#### Remote Daemon Connections
```bash
# List available modules on rsync daemon
rsync rsync::backupserver
rsync rsync://backupserver/

# Connect to rsync daemon with password
rsync -avz --password-file=/etc/rsync.pass /local/path/ rsync://user@backupserver/backup/

# Pull from rsync daemon
rsync -avz rsync://backupserver/module/ /local/path/

# Push to rsync daemon
rsync -avz /local/path/ rsync://backupserver/module/
```

### Advanced Filtering and Exclusion

#### Pattern-Based Filtering
```bash
# Exclude specific file types
rsync -av --exclude='*.tmp' --exclude='*.log' /source/ /destination/

# Exclude directories
rsync -av --exclude='cache/' --exclude='temp/' /source/ /destination/

# Complex pattern matching
rsync -av --exclude='*.bak' --exclude='*.tmp' --exclude='*.cache' /source/ /destination/

# Include specific patterns while excluding others
rsync -av --include='*.txt' --include='*.md' --exclude='*' /source/ /destination/

# Exclude files based on size
rsync -av --max-size=100M /source/ /destination/
rsync -av --min-size=1K /source/ /destination/
```

#### File-Based Exclusions
```bash
# Use exclude file
rsync -av --exclude-from='/path/to/exclude.txt' /source/ /destination/

# Use include file
rsync -av --include-from='/path/to/include.txt' /source/ /destination/

# Combined include and exclude files
rsync -av --include-from='include.txt' --exclude-from='exclude.txt' /source/ /destination/
```

#### Advanced Filter Rules
```bash
# Protect files from deletion
rsync -av --filter='P important/' --delete /source/ /destination/

# Merge filter rules from file
rsync -av --filter='merge /path/to/filter.rules' /source/ /destination/

# Hide files from transfer
rsync -av --filter='H *.secret' /source/ /destination/

# Custom directory-based rules
rsync -av --filter='dir-merge /.rsync-filter' /source/ /destination/
```

### Backup and Mirror Operations

#### Mirror Synchronization
```bash
# Complete mirror with deletion
rsync -av --delete /source/ /destination/

# Mirror with backup of deleted files
rsync -av --delete --backup --backup-dir=/backup/deleted/ /source/ /destination/

# Mirror with exclusion patterns
rsync -av --delete --exclude='*.tmp' --exclude='cache/' /source/ /destination/

# One-way sync preserving everything
rsync -aHAX --delete /source/ /destination/
```

#### Incremental Backups
```bash
# Timestamped backup directory
rsync -av /source/ /backup/$(date +%Y%m%d)/

# Backup with rotated directories
rsync -av --delete --backup --backup-dir=/backup/old/$(date +%Y%m%d) /source/ /backup/current/

# Hardlink-based incremental backup
rsync -av --link-dest=/backup/yesterday /source/ /backup/today/

# Multiple incremental backups
rsync -av --link-dest=/backup/weekly/$(date -d 'last week' +%Y%m%d) \
       --link-dest=/backup/daily/$(date -d 'yesterday' +%Y%m%d) \
       /source/ /backup/daily/$(date +%Y%m%d)/
```

#### Update-Only Transfers
```bash
# Skip files newer on destination
rsync -avu /source/ /destination/

# Update based on checksum instead of time
rsync -avc /source/ /destination/

# Update only if source is different
rsync -av --ignore-existing /source/ /destination/
```

### Performance Optimization

#### Compression and Bandwidth
```bash
# Compress during transfer (good for slow networks)
rsync -avz /source/ remote:/destination/

# Skip compression for already compressed files
rsync -avz --skip-compress=gz/jpg/mp[34]/mov/avi /source/ /destination/

# Limit bandwidth usage (1000 KB/s)
rsync -av --bwlimit=1000 /source/ /destination/

# High-performance transfer on fast networks
rsync -av --no-compress --whole-file /source/ /destination/
```

#### Block Size and Transfer Method
```bash
# Use larger block size for better performance
rsync -av --block-size=8192 /source/ /destination/

# Use whole-file transfer for mostly different files
rsync -av --whole-file /source/ /destination/

# Optimize for many small files
rsync -av --no-whole-file /source/ /destination/
```

#### Concurrent Transfers
```bash
# Use multiple rsync processes for large directories
find /source -type d -print0 | xargs -0 -I {} -P 4 \
    rsync -av {} /destination/{}

# Parallel transfer using GNU parallel
find /source -type f | parallel -j 4 rsync -av {} /destination/{}
```

### File Attributes and Permissions

#### Preserve All Attributes
```bash
# Preserve everything including ACLs and xattrs
rsync -aHAX /source/ /destination/

# Preserve with specific ownership
rsync -av --owner --group /source/ /destination/

# Preserve permissions only
rsync -avp --no-o --no-g /source/ /destination/
```

#### Handle Special Files
```bash
# Handle device files (requires root)
rsync -avD /source/ /destination/

# Copy hard links properly
rsync -avH /source/ /destination/

# Handle sparse files efficiently
rsync -avS /source/ /destination/

# Preserve symlinks
rsync -avl /source/ /destination/

# Convert symlinks to actual files
rsync -avL /source/ /destination/
```

## Advanced Usage

### Rsync Daemon Configuration

#### Server Setup
```bash
# Create comprehensive rsyncd.conf
cat > /etc/rsyncd.conf << 'EOF'
# Global settings
uid = rsync
gid = rsync
use chroot = yes
max connections = 10
log file = /var/log/rsyncd.log
pid file = /var/run/rsyncd.pid
lock file = /var/run/rsyncd.lock
secrets file = /etc/rsyncd.secrets
motd file = /etc/rsyncd.motd
read only = false
write only = false
list = yes
timeout = 600
dont compress = *.gz *.zip *.jpg *.mp3 *.mp4

# Backup module
[backup]
comment = Main backup area
path = /backup/data
auth users = backup_user
read only = false
write only = false
list = yes
ignore errors = yes
transfer logging = yes
log format = %t %a %m %f %b
exclude = lost+found/ .cache/ .tmp/

# Public module
[public]
comment = Public file sharing
path = /data/public
read only = false
guest ok = yes
hosts allow = 192.168.1.0/24 10.0.0.0/8
hosts deny = *

# Logs module
[logs]
comment = System log archives
path = /data/logs
auth users = logreader
read only = true
list = yes
EOF

# Create secrets file
cat > /etc/rsyncd.secrets << 'EOF'
backup_user:secure_password_here
logreader:another_password
EOF

# Set proper permissions
chmod 600 /etc/rsyncd.secrets
chown root:root /etc/rsyncd.secrets

# Create directories and set permissions
mkdir -p /backup/data /data/public /data/logs
chown -R rsync:rsync /backup /data/public
chmod -R 755 /backup /data/public

# Start rsync daemon
rsync --daemon --config=/etc/rsyncd.conf
```

#### Client Daemon Operations
```bash
# List all available modules
rsync rsync::server
rsync rsync://server/

# List contents of a module
rsync rsync::backup/

# Download from module
rsync -avz rsync::backup/important/ /local/backup/

# Upload to module
rsync -avz /local/data/ rsync::backup/user_data/

# Use password file for non-interactive operation
echo "secure_password_here" > ~/.rsync.pass
chmod 600 ~/.rsync.pass
rsync -avz --password-file=~/.rsync.pass /local/ rsync::backup/
```

### Complex Backup Strategies

#### Rotating Backup System
```bash
#!/bin/bash
# Advanced rotating backup system

SOURCE="/home/user"
BACKUP_ROOT="/backup/user"
RETENTION_DAYS=30
WEEKLY_RETENTION=4
MONTHLY_RETENTION=12

DATE=$(date +%Y%m%d)
DAY_OF_WEEK=$(date +%w)
DAY_OF_MONTH=$(date +%d)

# Create backup directory structure
mkdir -p "$BACKUP_ROOT"/{daily,weekly,monthly}

# Daily backup
rsync -av --delete \
      --exclude=".cache" \
      --exclude=".local/share/Trash" \
      --exclude="Downloads/*.iso" \
      --exclude="tmp/" \
      --link-dest="$BACKUP_ROOT/daily/latest" \
      "$SOURCE/" "$BACKUP_ROOT/daily/$DATE"

# Update latest symlink
rm -f "$BACKUP_ROOT/daily/latest"
ln -s "$DATE" "$BACKUP_ROOT/daily/latest"

# Weekly backup (Sunday)
if [ "$DAY_OF_WEEK" -eq 0 ]; then
    WEEK_DATE=$(date +%Y%m%d)
    rsync -a --delete \
          --link-dest="$BACKUP_ROOT/daily/$DATE" \
          "$SOURCE/" "$BACKUP_ROOT/weekly/$WEEK_DATE"
fi

# Monthly backup (1st of month)
if [ "$DAY_OF_MONTH" -eq 01 ]; then
    MONTH_DATE=$(date +%Y%m%d)
    rsync -a --delete \
          --link-dest="$BACKUP_ROOT/daily/$DATE" \
          "$SOURCE/" "$BACKUP_ROOT/monthly/$MONTH_DATE"
fi

# Cleanup old backups
find "$BACKUP_ROOT/daily" -maxdepth 1 -type d -name "????????" -mtime +$RETENTION_DAYS -exec rm -rf {} \;
find "$BACKUP_ROOT/weekly" -maxdepth 1 -type d -name "????????" -mtime +$((WEEKLY_RETENTION * 7)) -exec rm -rf {} \;
find "$BACKUP_ROOT/monthly" -maxdepth 1 -type d -name "????????" -mtime +$((MONTHLY_RETENTION * 30)) -exec rm -rf {} \;
```

#### Differential and Incremental Backups
```bash
#!/bin/bash
# Differential and incremental backup system

SOURCE="/var/www"
BACKUP_ROOT="/backup/web"
DATE=$(date +%Y%m%d)
WEEKDAY=$(date +%A)

# Create directories
mkdir -p "$BACKUP_ROOT"/{full,diff/inc}

# Full backup (Sunday)
if [ "$WEEKDAY" = "Sunday" ]; then
    echo "Creating full backup for $DATE"
    rsync -a --delete \
          --exclude="cache/" \
          --exclude="logs/*.log" \
          --exclude="tmp/" \
          "$SOURCE/" "$BACKUP_ROOT/full/$DATE"

    # Update reference for differential
    rm -f "$BACKUP_ROOT/diff/latest_full"
    ln -s "$DATE" "$BACKUP_ROOT/diff/latest_full"

    # Clean old incremental backups
    find "$BACKUP_ROOT/diff/inc" -maxdepth 1 -type d -name "????????" -exec rm -rf {} \;
else
    # Incremental backup
    LATEST_FULL=$(readlink "$BACKUP_ROOT/diff/latest_full")
    echo "Creating incremental backup for $DATE (based on $LATEST_FULL)"

    rsync -a --delete \
          --exclude="cache/" \
          --exclude="logs/*.log" \
          --exclude="tmp/" \
          --link-dest="$BACKUP_ROOT/full/$LATEST_FULL" \
          "$SOURCE/" "$BACKUP_ROOT/diff/inc/$DATE"
fi

# Differential backup (daily)
if [ -n "$LATEST_FULL" ]; then
    echo "Creating differential backup for $DATE"
    rsync -a --delete \
          --exclude="cache/" \
          --exclude="logs/*.log" \
          --exclude="tmp/" \
          "$SOURCE/" "$BACKUP_ROOT/diff/diff_$DATE"
fi
```

### Specialized Synchronization Scenarios

#### Database Backup Synchronization
```bash
#!/bin/bash
# Database backup synchronization with consistency

DB_NAME="production_db"
DB_USER="backup_user"
DB_PASS="backup_password"
REMOTE_HOST="backup.company.com"
REMOTE_PATH="/backups/database"
LOCAL_BACKUP="/local/backups"

# Create consistent database dump
DATE=$(date +%Y%m%d_%H%M%S)
DUMP_FILE="$LOCAL_BACKUP/${DB_NAME}_$DATE.sql.gz"

# Lock tables and create dump
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "FLUSH TABLES WITH READ LOCK; SYSTEM mysqladmin ping" &
LOCK_PID=$!

# Create database dump
mysqldump -u "$DB_USER" -p"$DB_PASS" --single-transaction --routines --triggers "$DB_NAME" | \
    gzip > "$DUMP_FILE"

# Release lock
kill $LOCK_PID 2>/dev/null

# Sync to remote backup server
rsync -avz --delete \
      --include="${DB_NAME}_$DATE.sql.gz" \
      --include="weekly_*.sql.gz" \
      --include="monthly_*.sql.gz" \
      --exclude="*" \
      "$LOCAL_BACKUP/" "$REMOTE_HOST:$REMOTE_PATH/"

# Verify transfer integrity
REMOTE_CHECKSUM=$(ssh "$REMOTE_HOST" "md5sum $REMOTE_PATH/${DB_NAME}_$DATE.sql.gz | cut -d' ' -f1")
LOCAL_CHECKSUM=$(md5sum "$DUMP_FILE" | cut -d' ' -f1)

if [ "$REMOTE_CHECKSUM" = "$LOCAL_CHECKSUM" ]; then
    echo "Backup transferred successfully and verified"
else
    echo "ERROR: Checksum mismatch - backup may be corrupted"
    exit 1
fi
```

#### Web Application Deployment
```bash
#!/bin/bash
# Web application deployment with zero downtime

LOCAL_PATH="/var/www/app_staging"
REMOTE_PATH="/var/www/app_production"
BACKUP_PATH="/var/www/app_backup"
WEB_SERVERS=("web1.company.com" "web2.company.com" "web3.company.com")

# Create timestamp for deployment
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DEPLOY_VERSION="deploy_$TIMESTAMP"

echo "Starting deployment: $DEPLOY_VERSION"

# Pre-deployment backup
for server in "${WEB_SERVERS[@]}"; do
    echo "Creating backup on $server"
    ssh "$server" "rsync -av $REMOTE_PATH/ $BACKUP_PATH/$DEPLOY_VERSION/"
done

# Deploy to all servers
for server in "${WEB_SERVERS[@]}"; do
    echo "Deploying to $server"

    # Use atomic deployment with symlink switch
    ssh "$server" "
        # Create new deployment directory
        mkdir -p $REMOTE_PATH/../$DEPLOY_VERSION

        # Sync files
        rsync -avz --delete \
              --exclude='*.log' \
              --exclude='cache/' \
              --exclude='sessions/' \
              --exclude='storage/logs/*' \
              $server:$LOCAL_PATH/ $REMOTE_PATH/../$DEPLOY_VERSION/

        # Update configuration for production
        sed -i 's/APP_ENV=staging/APP_ENV=production/' $REMOTE_PATH/../$DEPLOY_VERSION/.env

        # Atomic switch
        ln -sfn ../$DEPLOY_VERSION $REMOTE_PATH.tmp
        mv -T $REMOTE_PATH.tmp $REMOTE_PATH

        # Restart services
        sudo systemctl reload nginx
        sudo systemctl reload php-fpm
    "

    if [ $? -eq 0 ]; then
        echo "Deployment to $server successful"
    else
        echo "ERROR: Deployment to $server failed"
        exit 1
    fi
done

# Health check
for server in "${WEB_SERVERS[@]}"; do
    echo "Performing health check on $server"
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$server/health")

    if [ "$HTTP_STATUS" = "200" ]; then
        echo "Health check passed for $server"
    else
        echo "WARNING: Health check failed for $server (HTTP $HTTP_STATUS)"
        # Consider rollback here
    fi
done

echo "Deployment completed: $DEPLOY_VERSION"
```

## Automation and Monitoring

### Automated Backup Monitoring
```bash
#!/bin/bash
# Comprehensive backup monitoring and reporting

LOG_FILE="/var/log/backup_monitor.log"
EMAIL_ADMIN="admin@company.com"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# Function to send notifications
send_notification() {
    local status="$1"
    local message="$2"

    # Email notification
    echo "$message" | mail -s "Backup $status: $(hostname)" "$EMAIL_ADMIN"

    # Slack notification
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"Backup $status on $(hostname): $message\"}" \
        "$SLACK_WEBHOOK"
}

# Function to check backup integrity
check_backup_integrity() {
    local backup_path="$1"
    local check_count=0
    local error_count=0

    for file in $(find "$backup_path" -type f -name "*.tar.gz" -o -name "*.sql.gz"); do
        ((check_count++))

        if ! gzip -t "$file" 2>/dev/null; then
            ((error_count++))
            echo "Corrupted backup file: $file" >> "$LOG_FILE"
        fi
    done

    echo "Checked $check_count files, found $error_count errors"
    return $error_count
}

# Monitor backup systems
BACKUP_SYSTEMS=(
    "/backup/daily:/backup/remote/daily"
    "/backup/database:/backup/remote/database"
    "/backup/user:/backup/remote/user"
)

overall_status="SUCCESS"
status_message="All backups completed successfully"

for backup_pair in "${BACKUP_SYSTEMS[@]}"; do
    local_backup="${backup_pair%%:*}"
    remote_backup="${backup_pair##*:}"

    echo "$(date): Checking backup: $local_backup" >> "$LOG_FILE"

    # Check if backup exists and is recent
    if [ ! -d "$local_backup" ]; then
        echo "ERROR: Backup directory not found: $local_backup" >> "$LOG_FILE"
        overall_status="ERROR"
        status_message="Some backup directories missing"
        continue
    fi

    # Check backup age (should be less than 24 hours)
    latest_backup=$(find "$local_backup" -maxdepth 1 -type d -name "????????" | sort | tail -1)
    if [ -n "$latest_backup" ]; then
        backup_age=$(( ($(date +%s) - $(stat -c %Y "$latest_backup")) / 3600 ))
        if [ $backup_age -gt 24 ]; then
            echo "WARNING: Backup is $backup_age hours old" >> "$LOG_FILE"
            if [ "$overall_status" = "SUCCESS" ]; then
                overall_status="WARNING"
                status_message="Some backups are outdated"
            fi
        fi
    fi

    # Check integrity
    check_backup_integrity "$local_backup"
    if [ $? -gt 0 ]; then
        overall_status="ERROR"
        status_message="Backup integrity check failed"
    fi

    # Check remote sync status
    if rsync --dry-run -az --delete "$local_backup/" "backup@remote:$remote_backup/" | grep -q "sending incremental"; then
        echo "WARNING: Remote backup out of sync for $local_backup" >> "$LOG_FILE"
        if [ "$overall_status" = "SUCCESS" ]; then
            overall_status="WARNING"
            status_message="Remote backups need synchronization"
        fi
    fi
done

# Send notification based on overall status
case "$overall_status" in
    "SUCCESS")
        send_notification "SUCCESS" "$status_message"
        ;;
    "WARNING")
        send_notification "WARNING" "$status_message"
        ;;
    "ERROR")
        send_notification "ERROR" "$status_message"
        ;;
esac

echo "$(date): Backup monitoring completed - Status: $overall_status" >> "$LOG_FILE"
```

### Scheduled Backup System
```bash
#!/bin/bash
# Scheduled backup system with resource management

CONFIG_FILE="/etc/backup.conf"
PID_FILE="/var/run/backup.pid"
RESOURCE_LIMIT="70"  # Maximum CPU usage percentage

# Load configuration
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "Configuration file not found: $CONFIG_FILE" >&2
    exit 1
fi

# Check if already running
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        echo "Backup already running (PID: $PID)" >&2
        exit 1
    else
        rm -f "$PID_FILE"
    fi
fi

# Create PID file
echo $$ > "$PID_FILE"

# Cleanup function
cleanup() {
    rm -f "$PID_FILE"
    exit $1
}

trap cleanup EXIT INT TERM

# Resource monitoring
monitor_resources() {
    local backup_pid=$1
    while kill -0 "$backup_pid" 2>/dev/null; do
        CPU_USAGE=$(ps -p "$backup_pid" -o %cpu --no-headers | awk '{print int($1)}')
        if [ "$CPU_USAGE" -gt "$RESOURCE_LIMIT" ]; then
            echo "High CPU usage detected: ${CPU_USAGE}% - throttling backup"
            renice +10 "$backup_pid" >/dev/null 2>&1
            sleep 5
        fi
        sleep 30
    done
}

# Start resource monitor in background
monitor_resources $$ &

# Execute backup jobs
for job_config in "${BACKUP_JOBS[@]}"; do
    eval "declare -A job=($job_config)"

    echo "$(date): Starting backup: ${job[name]}"

    case "${job[type]}" in
        "rsync")
            rsync_cmd="rsync -avz"

            # Add options based on job configuration
            [[ "${job[delete]:-false}" == "true" ]] && rsync_cmd+=" --delete"
            [[ "${job[compress]:-true}" == "true" ]] && rsync_cmd+=" -z"
            [[ -n "${job[exclude]}" ]] && rsync_cmd+=" --exclude=${job[exclude]}"
            [[ -n "${job[bandwidth]}" ]] && rsync_cmd+=" --bwlimit=${job[bandwidth]}"

            # Add source and destination
            rsync_cmd+=" ${job[source]} ${job[destination]}"

            # Execute with timeout and retry
            timeout --kill-after=30m 1h bash -c "$rsync_cmd"
            ;;

        "database")
            # Database backup logic here
            ;;
    esac

    if [ $? -eq 0 ]; then
        echo "$(date): Backup completed: ${job[name]}"
    else
        echo "$(date): ERROR: Backup failed: ${job[name]}"
        # Send alert
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"Backup failed: ${job[name]} on $(hostname)\"}" \
            "${SLACK_WEBHOOK}"
    fi
done

echo "$(date): All backup jobs completed"
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Problems
```bash
# Permission denied errors
# Solution: Use appropriate options and check permissions
rsync -av --rsync-path="sudo rsync" /source/ user@remote:/destination/
rsync -av --fake-super /source/ user@remote:/destination/

# Ownership preservation issues
# Solution: Use numeric IDs or adjust permissions
rsync -av --numeric-ids /source/ /destination/
rsync -av --no-o --no-g /source/ /destination/
```

#### Network Connectivity Issues
```bash
# Connection timeout issues
# Solution: Increase timeout values
rsync -avz --timeout=300 --contimeout=60 /source/ remote:/dest/

# Unstable connections
# Solution: Use partial transfer and inplace updates
rsync -avz --partial --inplace --append /source/ remote:/dest/

# SSH connection problems
# Solution: Debug SSH connection
ssh -v user@remote
rsync -avz -e "ssh -v" /source/ user@remote:/dest/
```

#### Performance Issues
```bash
# Slow transfers
# Solution: Adjust compression and block size
rsync -av --no-compress --whole-file --block-size=1M /source/ /dest/

# High memory usage
# Solution: Use smaller block size or limit processes
rsync -av --block-size=4096 /source/ /dest/
rsync -av --max-size=100M /source/ /dest/
```

#### Disk Space Issues
```bash
# Out of disk space during transfer
# Solution: Use incremental transfers or exclude files
rsync -av --max-size=1G --exclude='*.iso' /source/ /dest/

# Clean up partial transfers
# Solution: Use partial directory and cleanup
rsync -av --partial --partial-dir=/tmp/rsync-partial /source/ /dest/
```

### Debugging and Verification

#### Verbose Output and Logging
```bash
# Maximum verbosity for debugging
rsync -avvv --log-file=/tmp/rsync-debug.log /source/ /dest/

# Itemized changes output
rsync -avi --log-file=/tmp/rsync-changes.log /source/ /dest/

# Progress monitoring
rsync -avP --info=progress2 /source/ /dest/

# Check what would be transferred
rsync -avn --dry-run /source/ /dest/
```

#### Integrity Verification
```bash
# Verify using checksums
rsync -avc /source/ /dest/

# Check for differences
rsync -avcn --dry-run /source/ /dest/

# Verify specific files
rsync -av --checksum /important/files/ /backup/important/
```

## Related Commands

- [`scp`](/docs/commands/networking/scp) - Secure copy over SSH
- [`ssh`](/docs/commands/networking/ssh) - Secure shell client
- [`tar`](/docs/commands/compression/tar) - Archive utility
- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`dd`](/docs/commands/file-management/dd) - Convert and copy a file
- [`find`](/docs/commands/file-management/find) - Search for files
- [`sftp`](/docs/commands/networking/sftp) - Secure file transfer protocol
- [`wget`](/docs/commands/networking/wget) - Network downloader
- [`curl`](/docs/commands/networking/curl) - Transfer data with URLs

## Best Practices

1. **Always test with --dry-run first** - Verify your command before actual execution
2. **Use trailing slashes consistently** - Understand the difference between `/source` and `/source/`
3. **Employ archive mode (-a) for backups** - Preserves all necessary file attributes
4. **Implement proper exclusion patterns** - Exclude temporary files, caches, and system directories
5. **Use SSH key authentication** - More secure and convenient than passwords
6. **Monitor bandwidth on production networks** - Use `--bwlimit` to avoid network congestion
7. **Verify critical transfers** - Use checksum option (-c) for important backups
8. **Log backup operations** - Keep detailed logs for troubleshooting and auditing
9. **Test restore procedures regularly** - Verify that backups can be restored successfully
10. **Use appropriate compression settings** - Skip compression for already compressed files

## Performance Tips

1. **Use --whole-file for local transfers** - Faster for transfers on the same filesystem
2. **Skip compression for binary files** - Use `--skip-compress` for images, videos, archives
3. **Adjust block size for large files** - Larger blocks improve performance for big files
4. **Use --inplace for large file updates** - More efficient for updating large files
5. **Limit concurrent connections** - Don't overwhelm the remote server
6. **Consider network latency** - Use appropriate timeout settings for slow networks
7. **Use --partial for unreliable connections** - Resume interrupted transfers
8. **Optimize exclude patterns** - Place most common exclusions first
9. **Use --numeric-ids for faster transfers** - Avoids UID/GID lookups
10. **Monitor system resources** - Adjust nice levels and IO scheduling as needed

The `rsync` command is an indispensable tool for system administrators and developers, providing efficient, flexible, and reliable file synchronization capabilities. Mastering its extensive options and understanding its behavior in different scenarios enables you to create robust backup strategies and maintain data consistency across systems with confidence and precision.