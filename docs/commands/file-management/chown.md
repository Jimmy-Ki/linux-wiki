---
title: chown - Change File Owner and Group
sidebar_label: chown
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chown - Change File Owner and Group

The `chown` (change owner) command is a fundamental Linux utility that changes the user and group ownership of files and directories. This command is essential for system administration, security management, and proper file access control. It allows administrators to assign ownership to specific users and groups, ensuring that files are accessible only to authorized personnel. The `chown` command works in conjunction with the Unix/Linux permission model, supporting both symbolic and numeric user/group identifiers, and provides powerful recursive capabilities for managing ownership across entire directory structures.

## Basic Syntax

```bash
chown [OPTIONS] OWNER[:GROUP] FILE...
chown [OPTIONS] :GROUP FILE...
chown [OPTIONS] --from=CURRENT_OWNER[:CURRENT_GROUP] OWNER[:GROUP] FILE...
chown [OPTIONS] --reference=RFILE FILE...
```

## Ownership Specifications

### Owner and Group Formats
- `USER` - Change only the user owner
- `USER:GROUP` - Change both user and group
- `:GROUP` - Change only the group (preserve user)
- `USER:` - Change user owner, group remains unchanged

### User/Group Identification
- **Symbolic names**: `john`, `developers`, `www-data`
- **Numeric IDs**: `1001`, `1002`, `0` (for root)
- **Mixed format**: `john:1002` or `1001:developers`

## Common Options

### Recursive and Directory Options
- `-R, --recursive` - Operate on files and directories recursively
- `-H` - If a command line argument is a symbolic link to a directory, traverse it
- `-L` - Traverse every symbolic link to a directory encountered
- `-P` - Do not traverse any symbolic links (default)

### Information and Verbosity
- `-c, --changes` - Report only when a change is made
- `-v, --verbose` - Output a diagnostic for every file processed
- `-f, --silent, --quiet` - Suppress most error messages

### Conditional Operations
- `--from=CURRENT_OWNER[:CURRENT_GROUP]` - Change only files owned by specified user/group
- `--reference=RFILE` - Use RFILE's owner and group instead of specifying values

### Safety and Behavior
- `--preserve-root` - Fail to operate recursively on '/' (default)
- `--no-preserve-root` - Treat '/' specially (disable preservation)
- `--dereference` - Affect the referent of each symbolic link (default)
- `-h, --no-dereference` - Affect symbolic links themselves instead of their targets

## Usage Examples

### Basic Ownership Changes

#### Simple Owner Changes
```bash
# Change owner of a single file
chown john document.txt

# Change owner of multiple files
chown john *.txt *.pdf

# Change owner using numeric UID
chown 1001 file.txt

# Change multiple files with verbose output
chown -v john *.log

# Change owner with confirmation
chown -c john *.conf
```

#### User and Group Changes
```bash
# Change both owner and group
chown john:developers project.txt

# Change only group (preserve owner)
chown :developers shared_file.txt

# Change group using numeric GID
chown :1002 config.txt

# Change owner and group using numeric IDs
chown 1001:1002 database.db

# Change owner, keep group unchanged
chown john: file.txt

# Change only if different (verbose mode)
chown -v www-data:www-data /var/www/html/index.html
```

### Recursive Operations

#### Directory Ownership
```bash
# Change ownership of entire directory tree
chown -R www-data:www-data /var/www/html/

# Verbose recursive operation
chown -Rv john:users /home/john/projects/

# Change ownership with symbolic link handling
chown -R -L user:group /path/with/symlinks

# Change only directories, not files
find /path -type d -exec chown john:group {} +

# Change only files, not directories
find /path -type f -exec chown john:group {} +
```

#### Advanced Recursive Patterns
```bash
# Different owners for files vs directories
find /app -type f -exec chown appuser:appgroup {} +
find /app -type d -exec chown appuser:appgroup {} +

# Change ownership based on file type
find /var/log -name "*.log" -exec chown syslog:adm {} +
find /var/log -name "*.gz" -exec chown root:root {} +

# Recursive with selective symbolic link handling
chown -R -h user:group /path  # Don't follow symlinks

# Preserve symlinks but change their ownership
chown -R --no-dereference user:group /directory
```

### Conditional Ownership Changes

#### Current Owner Filtering
```bash
# Change only if current owner matches
chown --from=olduser newuser file.txt

# Change only if both user and group match
chown --from=olduser:oldgroup newuser:newgroup file.txt

# Change only group if user matches
chown --from=currentuser :newgroup file.txt

# Batch operation with conditions
find /home -user olduser -exec chown newuser:newgroup {} +

# Change ownership based on multiple conditions
find /var/www -user root -exec chown www-data:www-data {} +
```

#### Reference-based Operations
```bash
# Copy ownership from reference file
chown --reference=template.txt new_file.txt

# Apply template ownership to multiple files
chown --reference=apache.conf *.conf

# Use reference in recursive operation
find /config -name "*.conf" -exec chown --reference=/etc/app/master.conf {} +

# Reference with recursive directory structure
chown -R --reference=/template/dir /target/dir

# Copy ownership from one file to another
cp file.txt backup.txt && chown --reference=file.txt backup.txt
```

## Practical Examples

### Web Server Management

#### Apache/Nginx File Ownership
```bash
# Set ownership for web content
chown -R www-data:www-data /var/www/html/

# Fix ownership after manual file creation
sudo chown www-data:www-data /var/www/html/new_page.html

# Set ownership for upload directories
chown -R www-data:www-data /var/www/html/uploads/

# Configure log directory ownership
chown -R syslog:adm /var/log/apache2/
chown -R nginx:adm /var/log/nginx/

# SSL certificates (more restrictive)
chown root:root /etc/ssl/certs/domain.crt
chown root:ssl-cert /etc/ssl/private/domain.key

# Web server configuration files
chown root:www-data /etc/apache2/sites-available/default.conf
chmod 640 /etc/apache2/sites-available/default.conf
```

#### Application Deployment
```bash
# Deploy Node.js application
chown -R node:node /opt/myapp/
chown node:node /var/log/myapp.log

# Python application with virtual environment
chown -R appuser:appgroup /usr/local/myapp/
chown -R appuser:appgroup /home/appuser/.virtualenvs/myapp/

# Docker application files
chown -R 1000:1000 /app/data/
chown -R root:root /app/config/

# Laravel/PHP application
chown -R www-data:www-data /var/www/laravel/storage/
chown -R www-data:www-data /var/www/laravel/bootstrap/cache/
chmod -R 775 /var/www/laravel/storage/
chmod -R 775 /var/www/laravel/bootstrap/cache/

# WordPress installation
chown -R www-data:www-data /var/www/wordpress/
find /var/www/wordpress/ -type d -exec chmod 755 {} \;
find /var/www/wordpress/ -type f -exec chmod 644 {} \;
```

### Database Administration

#### MySQL/MariaDB Setup
```bash
# MySQL data directory
chown -R mysql:mysql /var/lib/mysql/

# MySQL configuration
chown root:root /etc/mysql/my.cnf
chown mysql:mysql /var/log/mysql/

# MySQL socket directory
chown mysql:mysql /var/run/mysqld/

# PostgreSQL setup
chown -R postgres:postgres /var/lib/postgresql/
chown postgres:postgres /var/log/postgresql/
chown postgres:postgres /var/run/postgresql/

# MongoDB data files
chown -R mongodb:mongodb /var/lib/mongodb/
chown mongodb:mongodb /var/log/mongodb/

# Redis server
chown redis:redis /var/lib/redis/
chown redis:redis /var/log/redis/
```

#### Database Backup Management
```bash
# Backup directory with proper ownership
mkdir -p /backups/mysql
chown mysql:mysql /backups/mysql

# Scheduled backup script ownership
chown root:root /usr/local/bin/backup_mysql.sh
chmod 700 /usr/local/bin/backup_mysql.sh

# Log files for backup operations
chown root:adm /var/log/mysql_backup.log

# Database dump files
mysqldump -u root -p database > backup.sql
chown mysql:mysql backup.sql
chmod 600 backup.sql

# PostgreSQL backup ownership
chown postgres:postgres /backups/postgresql/
chmod 700 /backups/postgresql/
```

### User Home Directory Management

#### New User Setup
```bash
# Set up complete home directory ownership
chown -R username:username /home/username/

# Mail spool ownership
chown username:mail /var/mail/username

# User-specific tmp files
chown -R username:username /tmp/username-*

# Configuration files in home directory
chown username:username /home/username/.bashrc
chown username:username /home/username/.profile
chown username:username /home/username/.ssh/

# User desktop and documents
chown -R username:username /home/username/Desktop/
chown -R username:username /home/username/Documents/
chown -R username:username /home/username/Downloads/
```

#### User Migration
```bash
# Migrate user files from old to new user
find /home/olduser -exec chown newuser:newuser {} +

# Update ownership for shared group files
find /shared/project -group oldgroup -exec chown :newgroup {} +

# Fix ownership after sudo operations
sudo chown -R $USER:$USER ~/.config/
sudo chown $USER:$USER ~/.local/

# Handle special user files
chown $USER:$USER ~/.Xauthority
chown $USER:$USER ~/.ICEauthority

# Fix mail ownership after migration
chown newuser:mail /var/mail/newuser
```

## Advanced Usage

### Complex Directory Structures

#### Multi-level Ownership Management
```bash
# Project directory with mixed ownership
mkdir -p /projects/{shared,private,user1,user2}

# Shared project directory
chown root:developers /projects/shared
chmod 2775 /projects/shared  # Set SGID bit

# Private directories
chown user1:user1 /projects/user1
chown user2:user2 /projects/user2

# Set ownership for files within shared directory
find /projects/shared -type f -exec chown :developers {} +

# Development environment setup
chown -R dev:dev /opt/devtools/
chown -R root:dev /opt/devtools/bin/
chmod 750 /opt/devtools/bin/

# Code repository ownership
chown -R git:git /var/git/repositories/
chown git:git /home/git/.ssh/authorized_keys
chmod 600 /home/git/.ssh/authorized_keys
```

#### Application Server Environments
```bash
# Java application server setup
chown -R tomcat:tomcat /opt/tomcat/
chown -R tomcat:tomcat /var/log/tomcat/
chown -R tomcat:tomcat /var/lib/tomcat/

# Temporary directories
chown -R tomcat:tomcat /tmp/tomcat-*

# Configuration with restricted access
chown root:tomcat /etc/tomcat/server.xml
chmod 640 /etc/tomcat/server.xml

# PHP-FPM pool configuration
chown -R www-data:www-data /var/www/app/
chown root:root /etc/php/7.4/fpm/pool.d/www.conf

# Ruby on Rails application
chown -R deploy:deploy /var/www/myapp/
chown deploy:deploy /var/www/myapp/config/database.yml
chmod 600 /var/www/myapp/config/database.yml
```

### System Configuration Management

#### Service File Ownership
```bash
# Systemd service files
chown root:root /etc/systemd/system/myservice.service
chmod 644 /etc/systemd/system/myservice.service

# Init script ownership
chown root:root /etc/init.d/myscript
chmod 755 /etc/init.d/myscript

# Configuration files
chown root:root /etc/myservice/config.conf
chmod 644 /etc/myservice/config.conf

# Log rotation configuration
chown root:root /etc/logrotate.d/myservice

# Cron job ownership
chown root:root /etc/cron.d/myservice
chmod 644 /etc/cron.d/myservice

# System-wide configuration
chown root:root /etc/profile
chown root:root /etc/environment
```

#### Security-sensitive Files
```bash
# SSH configuration and keys
chown root:root /etc/ssh/sshd_config
chmod 600 /etc/ssh/sshd_config

chown root:ssh /etc/ssh/ssh_host_*
chmod 600 /etc/ssh/ssh_host_*_key
chmod 644 /etc/ssh/ssh_host_*_key.pub

# User SSH keys
chown $USER:$USER ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
chown $USER:$USER ~/.ssh/id_rsa.pub
chmod 644 ~/.ssh/id_rsa.pub

# Password and shadow files
chown root:root /etc/passwd
chmod 644 /etc/passwd
chown root:shadow /etc/shadow
chmod 600 /etc/shadow

# SSL/TLS certificates
chown root:root /etc/ssl/certs/*
chown root:ssl-cert /etc/ssl/private/*
chmod 600 /etc/ssl/private/*
```

### Integration and Automation

#### Shell Scripts

##### Ownership Fix Script
```bash
#!/bin/bash
# fix_ownership.sh - Comprehensive file ownership fix

LOG_FILE="/var/log/ownership_fix.log"
DATE=$(date "+%Y-%m-%d %H:%M:%S")

log() {
    echo "[$DATE] $1" | tee -a "$LOG_FILE"
}

# Web content ownership
log "Fixing web content ownership..."
if [ -d "/var/www/html" ]; then
    chown -Rv www-data:www-data /var/www/html/ 2>&1 | tee -a "$LOG_FILE"
    log "Web content ownership fixed"
else
    log "Warning: /var/www/html not found"
fi

# User home directories
log "Fixing user home directories..."
for user in /home/*; do
    if [ -d "$user" ]; then
        username=$(basename "$user")
        chown -Rv "$username:$username" "$user" 2>&1 | tee -a "$LOG_FILE"
        log "Fixed ownership for $username"
    fi
done

# Log directories
log "Fixing log directory ownership..."
find /var/log -type f -user root -exec chown root:adm {} + 2>&1 | tee -a "$LOG_FILE"

log "Ownership fix completed"
```

##### Application Deployment Script
```bash
#!/bin/bash
# deploy_app.sh - Automated application deployment with ownership management

APP_NAME="myapp"
APP_USER="appuser"
APP_GROUP="appgroup"
DEPLOY_DIR="/opt/$APP_NAME"
BACKUP_DIR="/backups/$APP_NAME"

# Create backup with current ownership
if [ -d "$DEPLOY_DIR" ]; then
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    cp -rp "$DEPLOY_DIR" "$BACKUP_DIR/$BACKUP_NAME"
    log "Created backup: $BACKUP_NAME"
fi

# Deploy new files
rsync -av --exclude='.git' ./ "$DEPLOY_DIR/"

# Set correct ownership
chown -R "$APP_USER:$APP_GROUP" "$DEPLOY_DIR/"
chown -R "$APP_USER:$APP_GROUP" "$DEPLOY_DIR/logs/"
chown "$APP_USER:$APP_GROUP" "$DEPLOY_DIR/config/app.conf"

# Set appropriate permissions
chmod 755 "$DEPLOY_DIR/bin/app.sh"
chmod 644 "$DEPLOY_DIR/config/app.conf"

# Verify ownership
if [ "$(stat -c %U:%G "$DEPLOY_DIR")" = "$APP_USER:$APP_GROUP" ]; then
    echo "Deployment successful: Ownership set correctly"
else
    echo "Error: Ownership verification failed"
    exit 1
fi
```

#### Scheduled Maintenance

##### Cron Job for Ownership Maintenance
```bash
#!/bin/bash
# /usr/local/bin/maintain_ownership.sh

# Fix upload directory ownership
find /var/www/html/uploads -type f -exec chown www-data:www-data {} +
find /var/www/html/uploads -type d -exec chown www-data:www-data {} +

# Clean up temp files with proper ownership
find /tmp -user $(whoami) -name "*.tmp" -delete 2>/dev/null

# Fix log file ownership
find /var/log -name "*.log.*" -exec chown root:adm {} +

# Update application cache ownership
find /var/cache -type d -exec chown www-data:www-data {} + 2>/dev/null
```

Add to crontab:
```bash
# Run ownership maintenance every hour
0 * * * * /usr/local/bin/maintain_ownership.sh
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Denied Errors
```bash
# Error: chown: changing ownership of 'file': Operation not permitted
# Solution: Use sudo or check if you're the current owner
sudo chown username:group filename

# Error: chown: changing ownership of 'directory': Permission denied
# Solution: Check directory permissions and use appropriate user
ls -ld directory_name
sudo chown -R user:group directory_name

# Check current ownership and permissions
ls -la /path/to/file
stat /path/to/file

# Verify user has sudo privileges
sudo -l
```

#### Invalid User/Group Names
```bash
# Error: chown: invalid user: 'nonexistent_user'
# Solution: Verify user and group exist
getent passwd username
getent group groupname

# List available users and groups
compgen -u  # List users
compgen -g  # List groups

# Create user if needed
sudo useradd -m username
sudo groupadd groupname

# Add user to group
sudo usermod -aG groupname username
```

#### Symbolic Link Issues
```bash
# Symbolic link pointing to restricted file
# Solution: Use -h option to change symlink ownership
chown -h user:group symlink_name

# Change ownership of symlink target
chown --dereference user:group symlink_name

# Handle broken symlinks
find . -type l -exec chown -h user:group {} +

# Recursive with proper symlink handling
chown -R -h user:group /directory/with/symlinks
```

#### Recursive Operation Problems
```bash
# Accidentally changing ownership of system files
# Prevention: Always test with --dry-run or specific paths
find /path -user olduser -ls  # First check what will be changed

# Use more specific targeting
chown -R user:group /specific/directory/  # Avoid root-level operations

# Test before actual operation
find /path -user olduser -exec echo "Would change: {}" \;

# Use exclude patterns to avoid sensitive directories
find /path -path /path/sensitive -prune -o -user olduser -exec chown newuser {} +
```

### Verification and Diagnostics

#### Checking Current Ownership
```bash
# Detailed file information
ls -l filename
stat filename

# Show only owner and group
stat -c "%U:%G %n" filename

# Find files with specific ownership
find /path -user username
find /path -group groupname
find /path -user username -group groupname

# Check for ownership problems
find /var/www ! -user www-data -ls
find /home ! -user $(basename $HOME) -ls

# List ownership of entire directory tree
find /path -printf "%u:%g %p\n"
```

#### Ownership Audit Script
```bash
#!/bin/bash
# audit_ownership.sh - Comprehensive ownership audit

echo "=== File Ownership Audit ==="
echo "Date: $(date)"
echo

# System configuration files
echo "=== System Configuration Files ==="
find /etc -type f ! -user root -ls | head -10

# Web content ownership
echo "=== Web Content Ownership ==="
if [ -d "/var/www" ]; then
    find /var/www ! -user www-data -ls | head -10
fi

# User home directories
echo "=== User Home Directory Issues ==="
for user in /home/*; do
    if [ -d "$user" ]; then
        username=$(basename "$user")
        find "$user" ! -user "$username" -ls | head -5
    fi
done

# Log file ownership
echo "=== Log File Ownership ==="
find /var/log -type f ! \( -user root -o -user syslog \) -ls | head -10

echo "=== Audit Complete ==="
```

## Performance Considerations

### Large Directory Operations

#### Optimizing Recursive Changes
```bash
# Use find for better performance on large directory trees
find /large/directory -user olduser -exec chown newuser {} +

# Limit scope of operations
chown -R user:group /specific/subdirectory

# Process in chunks for very large directories
find /huge/path -type f -print0 | xargs -0 -n 1000 chown user:group

# Parallel processing (with caution)
find /path -type f -print0 | parallel -0 chown user:group {}

# Use GNU parallel for large-scale operations
find /path -type f -print0 | parallel -j 8 chown user:group {}
```

#### Memory and System Load Management
```bash
# Monitor system resources during ownership changes
ionice -c2 -n7 chown -R user:group /large/directory

# Use nice to reduce priority
nice -n 19 chown -R user:group /large/directory

# Batch processing with progress monitoring
find /path -type f | while read file; do
    chown user:group "$file"
    echo "Processed: $file"
done

# Limited concurrency with xargs
find /path -type f -print0 | xargs -0 -P 4 chown user:group
```

### Minimizing Filesystem Impact

#### Selective Ownership Changes
```bash
# Change only files that need ownership changes
find /path -user olduser -exec chown newuser {} +

# Avoid unnecessary operations
find /path -user olduser -group oldgroup -exec chown newuser:newgroup {} +

# Test before making changes
find /path -user olduser -ls  # Review before executing

# Use verbose output only when needed
chown -R user:group /path > /dev/null 2>&1  # Silent operation
```

## Security Considerations

### Security-Sensitive Directories

#### System-critical Files
```bash
# System binaries and libraries
chown root:root /usr/bin/sudo
chown root:root /bin/su
chmod 4755 /usr/bin/sudo  # Set SUID bit

# System configuration
chown root:root /etc/crontab
chown root:root /etc/fstab
chown root:root /etc/passwd

# Device files
chown root:root /dev/null
chown root:disk /dev/sda*

# Kernel modules
chown root:root /lib/modules/$(uname -r)/*
chown root:root /boot/vmlinuz-$(uname -r)
```

#### Temporary and Cache Directories
```bash
# System temporary directory
chmod 1777 /tmp  # Sticky bit
chown root:root /tmp

# User temporary directories
chown -R $USER:$USER /tmp/user-$USER

# Application cache with restricted access
mkdir -p /var/cache/myapp
chown appuser:appgroup /var/cache/myapp
chmod 750 /var/cache/myapp

# Session files
chown -R www-data:www-data /var/lib/php/sessions/
chmod 770 /var/lib/php/sessions/
```

### Access Control Integration

#### Combining with Permissions
```bash
# Secure directory setup
mkdir -p /secure/data
chown user:group /secure/data
chmod 750 /secure/data

# Set SGID for group inheritance
chmod 2755 /shared/project
chown user:group /shared/project

# Sticky bit for shared directories
chmod 1777 /shared/temp
chown root:root /shared/temp

# User home directory with proper permissions
chmod 700 /home/username
chown username:username /home/username
```

## Related Commands

- [`chgrp`](/docs/commands/file-management/chgrp) - Change group ownership
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`useradd`](/docs/commands/system-management/useradd) - Create new user
- [`usermod`](/docs/commands/system-management/usermod) - Modify user account
- [`groupadd`](/docs/commands/system-management/groupadd) - Create new group
- [`find`](/docs/commands/file-management/find) - Find files and perform actions
- [`stat`](/docs/commands/file-management/stat) - Display file status
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`id`](/docs/commands/system-information/id) - Display user and group information
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`sudo`](/docs/commands/user-management/sudo) - Execute command as another user

## Best Practices

1. **Always use caution with recursive operations**:
   - Test on small directories first
   - Use `-v` (verbose) to monitor changes
   - Never run `chown -R` on `/` unless absolutely necessary

2. **Use appropriate ownership for security**:
   - System files: `root:root`
   - Web content: `www-data:www-data`
   - User files: `user:user`
   - Application files: dedicated service user

3. **Verify changes before making them**:
   - Use `find` to preview what will be changed
   - Check current ownership with `ls -l` or `stat`

4. **Use reference files for consistency**:
   - `chown --reference=template newfile`
   - Maintains consistent ownership patterns

5. **Consider both user and group ownership**:
   - Often need to change both: `chown user:group file`
   - Group ownership is crucial for shared resources

6. **Document ownership requirements**:
   - Keep records of required ownership for applications
   - Include ownership in deployment procedures

7. **Use sudo appropriately**:
   - Only use elevated privileges when necessary
   - Log ownership changes for audit purposes

## Performance Tips

1. **Use find + exec for large directories**:
   - More efficient than `chown -R` for specific patterns
   - Allows precise targeting of files

2. **Minimize filesystem calls**:
   - Combine operations when possible
   - Use reference files instead of multiple specifications

3. **Process in chunks for very large operations**:
   - Use `xargs` with `-n` limit
   - Monitor system load during operations

4. **Avoid unnecessary changes**:
   - Check current ownership before changing
   - Use `--from` option for conditional changes

5. **Consider system impact**:
   - Use `nice` and `ionice` for large operations
   - Schedule maintenance during low-usage periods

The `chown` command is a fundamental tool for Linux system administration, providing essential control over file and directory ownership. Understanding its various options, combining it with other file management tools, and following security best practices ensures proper access control and system security. Whether managing web servers, application deployments, or user home directories, `chown` is indispensable for maintaining proper file ownership across the Linux filesystem.