---
title: chgrp - Change Group Ownership
sidebar_label: chgrp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chgrp - Change Group Ownership

The `chgrp` (change group) command is a fundamental Linux utility that modifies the group ownership of files and directories. It's an essential tool for managing collaborative environments, implementing security policies, and maintaining proper access controls in multi-user systems. The command works by changing the group identifier (GID) associated with specified files, allowing administrators to control which users can access resources based on their group memberships. Understanding `chgrp` is crucial for system administration, team collaboration workflows, and implementing the principle of least privilege in Unix-like operating systems.

## Basic Syntax

```bash
chgrp [OPTIONS] GROUP FILE...
chgrp [OPTIONS] --from=CURRENT_GROUP:NEW_GROUP FILE...
chgrp [OPTIONS] --reference=RFILE FILE...
```

## Group Selection Options

### Group Specification
- `GROUP` - Group name or numeric GID to set
- `--from=CURRENT_GROUP:NEW_GROUP` - Change only if current group matches
- `--reference=RFILE` - Use group from reference file instead of specifying GROUP

### Recursive Options
- `-R, --recursive` - Operate on files and directories recursively
- `-H` - If command line argument is symbolic link to directory, traverse it
- `-L` - Traverse every symbolic link to directory encountered
- `-P` - Do not traverse any symbolic links (default)

### Output and Verbosity Options
- `-c, --changes` - Report only when a change is made
- `-v, --verbose` - Output a diagnostic for every file processed
- `-f, --silent, --quiet` - Suppress most error messages

### Safety Options
- `--preserve-root` - Fail to operate recursively on '/' (default)
- `--no-preserve-root` - Do not treat '/' specially

## Usage Examples

### Basic Group Changes

#### Simple Group Assignment
```bash
# Change group of a single file
chgrp developers project.txt

# Change group of multiple files
chgrp team document1.txt document2.txt report.pdf

# Change group using numeric GID
chgrp 1001 config.conf  # Where 1001 is the GID for 'developers'

# Change group with verbose output
chgrp -v admin /etc/critical.conf

# Report only changes made
chgrp -c staff *.log
```

#### Pattern-Based Group Changes
```bash
# Change group for all files with specific extension
chgrp developers *.py *.js *.html

# Change group for all files matching pattern
chgrp team backup-*.tar.gz

# Change group for hidden files
chgrp users .*  # Be careful with this!
```

### Recursive Operations

#### Directory and Content Group Changes
```bash
# Change group of directory and all contents
chgrp -R web-data /var/www/html/

# Verbose recursive operation
chgrp -Rv database /opt/mysql/

# Change only directories (not files)
find /path -type d -exec chgrp group {} +

# Change only files (not directories)
find /path -type f -exec chgrp group {} +
```

#### Advanced Recursive Scenarios
```bash
# Recursive with specific depth
find /data -maxdepth 3 -exec chgrp data-group {} +

# Recursive with file size criteria
find /storage -size +100M -exec chgrp large-files {} +

# Recursive with time criteria
find /logs -mtime -7 -exec chgrp log-team {} +

# Recursive dry-run (simulate changes)
find /path -exec echo "Would change: {}" \;
```

### Conditional Group Changes

#### Using --from Option
```bash
# Change only files currently owned by specific group
chgrp --from=old-group:new-group file.txt

# Change only from specific group to new group
chgrp --from=users:developers /shared/project/

# Verify current group first
ls -l file.txt  # Check current group
chgrp --from=users:staff file.txt  # Change only if currently 'users'
```

#### Reference-Based Operations
```bash
# Copy group from reference file
chgrp --reference=template.txt new_file.txt

# Apply reference group to multiple files
chgrp --reference=config.conf *.conf

# Use reference with recursion
chgrp -R --reference=/etc/passwd /backup/system/

# Verify reference file's group
stat -c "%G" template.txt
```

## Practical Examples

### System Administration

#### Server Configuration Management
```bash
# Set proper groups for web server files
chgrp -R www-data /var/www/
chgrp www-data /var/log/apache2/

# Database file groups
chgrp -R mysql /var/lib/mysql/
chgrp mysql /etc/mysql/my.cnf

# Mail system groups
chgrp mail /var/spool/mail/
chgrp mail /etc/postfix/main.cf

# Log file management
chgrp -R adm /var/log/
chgrp syslog /var/log/syslog
chgrp authlog /var/log/auth.log
```

#### Security Hardening
```bash
# Sensitive configuration files
chgrp root /etc/passwd
chgrp shadow /etc/shadow
chgrp sshd /etc/ssh/sshd_config

# SSL certificates
chgrp ssl-cert /etc/ssl/private/
chgrp ssl-cert /etc/ssl/certs/

# Temporary files cleanup
chgrp nobody /tmp/session_files/
chgrp nogroup /var/tmp/cache/

# Device access groups
chgrp cdrom /dev/cdrom
chgrp audio /dev/snd/*
chgrp dialout /dev/ttyS*
```

### Development Environment Setup

#### Team Collaboration
```bash
# Create shared development directory
mkdir /projects/team-alpha
chgrp developers /projects/team-alpha
chmod g+s /projects/team-alpha  # Set SGID bit
chmod 2775 /projects/team-alpha

# Set up project structure
for dir in src docs tests config; do
    mkdir -p "/projects/team-alpha/$dir"
    chgrp developers "/projects/team-alpha/$dir"
    chmod 775 "/projects/team-alpha/$dir"
done

# Configuration files for team access
chgrp -R config-team /etc/myapp/
chgrp ops-team /etc/monitoring/

# Build artifacts directory
mkdir -p /build/artifacts
chgrp developers /build/artifacts
chmod 775 /build/artifacts
```

#### Version Control Setup
```bash
# Git repository permissions
chgrp -R developers /repositories/project.git/
chmod -R g+w /repositories/project.git/

# Shared hooks directory
chgrp developers /repositories/project.git/hooks/
chmod g+x /repositories/project.git/hooks/*

# Working directory setup
chgrp -R web-devs /var/www/project/
find /var/www/project/ -type d -exec chmod g+s {} \;
```

### Web Server Management

#### Content Management System Setup
```bash
# WordPress installation
chgrp -R www-data /var/www/wordpress/
find /var/www/wordpress/ -type d -exec chmod 755 {} \;
find /var/www/wordpress/ -type f -exec chmod 644 {} \;

# Uploads directory with write access
mkdir -p /var/www/wordpress/wp-content/uploads
chgrp www-data /var/www/wordpress/wp-content/uploads
chmod 775 /var/www/wordpress/wp-content/uploads

# Plugin and theme directories
chgrp -R www-data /var/www/wordpress/wp-content/plugins/
chgrp -R www-data /var/www/wordpress/wp-content/themes/
```

#### Application Deployment
```bash
# Deploy application with correct groups
chgrp -R app-user /opt/myapp/
chgrp app-user /etc/myapp/config.yml

# Log files with proper groups
mkdir -p /var/log/myapp
chgrp app-user /var/log/myapp
chmod 775 /var/log/myapp

# Runtime directories
mkdir -p /run/myapp
chgrp app-user /run/myapp
chmod 775 /run/myapp
```

## Advanced Usage

### Complex Scripting and Automation

#### Automated Setup Script
```bash
#!/bin/bash
# setup_shared_environment.sh

PROJECT_DIR="/opt/shared-project"
PROJECT_GROUP="developers"
SUBDIRS=("src" "docs" "tests" "config" "logs" "temp")

# Create project structure
mkdir -p "$PROJECT_DIR"
chgrp "$PROJECT_GROUP" "$PROJECT_DIR"
chmod 2775 "$PROJECT_DIR"  # SGID + group write

# Create and configure subdirectories
for subdir in "${SUBDIRS[@]}"; do
    dir_path="$PROJECT_DIR/$subdir"
    mkdir -p "$dir_path"
    chgrp "$PROJECT_GROUP" "$dir_path"

    # Set appropriate permissions based on directory type
    case "$subdir" in
        "src"|"docs")
            chmod 775 "$dir_path"
            ;;
        "config")
            chmod 770 "$dir_path"
            ;;
        "logs"|"temp")
            chmod 777 "$dir_path"
            ;;
    esac
done

echo "Shared project environment set up at $PROJECT_DIR"
```

#### Log Rotation Group Management
```bash
#!/bin/bash
# fix_log_groups.sh

LOG_DIRS=("/var/log" "/opt/app/logs" "/home/*/logs")
LOG_GROUP="adm"

# Fix group ownership of log files
for log_dir in "${LOG_DIRS[@]}"; do
    if [[ -d "$log_dir" ]]; then
        echo "Processing $log_dir..."
        find "$log_dir" -type f \( -name "*.log" -o -name "*.out" -o -name "*.err" \) -exec chgrp "$LOG_GROUP" {} \;
        echo "Fixed groups in $log_dir"
    fi
done

# Ensure log directories have correct group
for log_dir in "${LOG_DIRS[@]}"; do
    if [[ -d "$log_dir" ]]; then
        chgrp "$LOG_GROUP" "$log_dir"
        chmod 755 "$log_dir"
    fi
done

echo "Log file group ownership fixed"
```

#### Backup Verification Script
```bash
#!/bin/bash
# verify_backup_groups.sh

BACKUP_DIR="/backup"
REQUIRED_GROUP="backup"

echo "Verifying backup file group ownership..."

# Check if backup directory exists
if [[ ! -d "$BACKUP_DIR" ]]; then
    echo "Backup directory $BACKUP_DIR does not exist"
    exit 1
fi

# Find files with incorrect group ownership
echo "Files with incorrect group ownership:"
find "$BACKUP_DIR" ! -group "$REQUIRED_GROUP" -ls

# Count files with incorrect groups
incorrect_count=$(find "$BACKUP_DIR" ! -group "$REQUIRED_GROUP" | wc -l)

if [[ $incorrect_count -gt 0 ]]; then
    echo "Found $incorrect_count files with incorrect group ownership"

    # Option to fix groups
    read -p "Fix group ownership? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        find "$BACKUP_DIR" ! -group "$REQUIRED_GROUP" -exec chgrp "$REQUIRED_GROUP" {} \;
        echo "Fixed group ownership for all files"
    fi
else
    echo "All files have correct group ownership"
fi
```

### Group Types and Management

#### Working with System Groups
```bash
# Common system group assignments
chgrp adm /var/log/syslog          # Administrative logs
chgrp mail /var/mail/username      # Mail spool files
chgrp dip /etc/ppp/chap-secrets    # PPP connection secrets
chgrp cdrom /dev/cdrom             # CD-ROM device access
chgrp audio /dev/snd/*             # Audio devices
chgrp video /dev/fb0               # Frame buffer device
chgrp input /dev/input/*           # Input devices
chgrp dialout /dev/ttyS*           # Serial ports
chgrp lp /dev/lp*                  # Printer devices
```

#### User and Project Groups
```bash
# Development team groups
chgrp frontend-devs /projects/web-app/src/frontend/
chgrp backend-devs /projects/web-app/src/backend/
chgrp database-admins /projects/web-app/database/
chgrp devops-team /projects/web-app/deployment/

# Design team resources
chgrp designers /assets/images/
chgrp designers /assets/fonts/
chgrp ui-ux-team /prototypes/

# Content management
chgrp content-writers /var/www/content/
chgrp editors /var/www/drafts/
chgrp publishers /var/www/published/
```

### Integration with File Permissions

#### SGID Bit Management
```bash
# Set SGID bit for shared directories
chmod g+s /shared/project
chgrp team /shared/project

# Verify SGID is set
ls -ld /shared/project
# Output: drwxrwsr-x 2 user team 4096 Dec 1 10:30 /shared/project

# Set SGID recursively on directories
find /shared/project -type d -exec chmod g+s {} \;

# Set up shared project with SGID
mkdir -p /shared/collaboration
chgrp developers /shared/collaboration
chmod 2775 /shared/collaboration  # SGID + group write

# New files will inherit group automatically
touch /shared/collaboration/newfile
ls -l /shared/collaboration/newfile
# Output: -rw-r--r-- 1 user team 0 Dec 1 10:31 newfile
```

#### Group Write Access Configuration
```bash
# Enable team collaboration on documents
chgrp marketing /shared/documents/
chmod g+w /shared/documents/
chmod g+s /shared/documents/  # Inherit group

# Configuration file access
chgrp config-team /etc/application/
chmod 770 /etc/application/

# Temporary shared workspace
mkdir -p /tmp/shared-workspace
chgrp developers /tmp/shared-workspace
chmod 1777 /tmp/shared-workspace  # Sticky bit + all access
```

## Performance Optimization

### Efficient Bulk Operations

#### Using find for Large Operations
```bash
# More efficient than chgrp -R for very large directories
find /path/to/large/dir -exec chgrp newgroup {} +

# Process specific file types efficiently
find /var/log -name "*.log" -exec chgrp adm {} +

# Parallel processing with xargs
find /data -type f -print0 | xargs -0 -P 4 -I {} chgrp data-group {}

# Limit operations to specific depth
find /path -maxdepth 2 -exec chgrp group {} +
```

#### Memory-Efficient Operations
```bash
# Process files in batches to reduce memory usage
find /large/directory -type f | head -1000 | xargs chgrp group

# Use locate for faster file finding (if updatedb is current)
locate "*.conf" | xargs chgrp config-group

# Process subdirectories separately
for subdir in /data/*/; do
    chgrp -R data-group "$subdir"
done
```

### Monitoring and Progress

#### Progress Tracking
```bash
# Show progress with pv (pipe viewer)
find /path -type f | pv -l | xargs chgrp group

# Count files before operation
file_count=$(find /path -type f | wc -l)
echo "Processing $file_count files..."

# Use progress bar in script
current=0
total=$(find /path -type f | wc -l)
find /path -type f -print0 | while IFS= read -r -d '' file; do
    chgrp group "$file"
    ((current++))
    printf "\rProgress: %d/%d (%.1f%%)" "$current" "$total" "$(echo "$current/$total*100" | bc -l)"
done
```

#### Validation and Verification
```bash
# Verify changes after bulk operation
echo "Verifying group changes..."
incorrect=$(find /path -not -group target-group | wc -l)
echo "Files with incorrect groups: $incorrect"

# Generate report of changed files
find /path -group target-group -ls > group_change_report.txt

# Compare before and after states
find /path -printf "%G %p\n" | sort > groups_before.txt
# ... perform chgrp operations ...
find /path -printf "%G %p\n" | sort > groups_after.txt
diff groups_before.txt groups_after.txt
```

## Troubleshooting

### Common Issues and Solutions

#### Permission Denied Errors
```bash
# Error: Operation not permitted
chgrp: changing group of 'file': Operation not permitted

# Solutions:
# 1. Use sudo for system files
sudo chgrp adm /var/log/syslog

# 2. Check if you're the file owner
ls -l file.txt
# Only owner or root can change group ownership

# 3. Verify target group exists
getent group groupname
# If not found, create the group or use correct name
```

#### Invalid Group Errors
```bash
# Error: Invalid group
chgrp: invalid group: 'nonexistent-group'

# Solutions:
# 1. List available groups
getent group
cat /etc/group

# 2. Use correct group name
chgrp valid-group file.txt

# 3. Use numeric GID if known
chgrp 1001 file.txt  # Where 1001 is valid GID
```

#### Symbolic Link Issues
```bash
# Problems with symbolic links
chgrp: cannot dereference 'symlink': Permission denied

# Solutions:
# 1. Change symlink target (default)
chgrp -h group symlink  # Change the symlink itself

# 2. Use -H option to follow command line symlinks
chgrp -RH group /path/with/symlinks/

# 3. Use -L option to follow all symlinks
chgrp -RL group /path/with/symlinks/

# 4. Use -P option to not follow any symlinks (default)
chgrp -RP group /path/with/symlinks/
```

### Diagnostic Commands

#### Verification and Status Checking
```bash
# Check current group ownership
ls -l filename
stat -c "%U:%G %n" filename

# Verify group membership
groups username
id -gn username  # Primary group
id -Gn username  # All groups

# Check if user can access group resources
sudo -u username -g groupname ls -l /path/to/file

# Find files owned by specific group
find /path -group groupname -ls

# Check group existence
getent group groupname
grep "^groupname:" /etc/group
```

#### System Group Information
```bash
# List all system groups
getent group
cat /etc/group

# Show group GID
getent group groupname | cut -d: -f3

# Check group members
getent group groupname | cut -d: -f4

# Show user's primary group
id -gn username
pwshow user username  # On some systems
```

## Security Best Practices

### Secure Group Management

#### Principle of Least Privilege
```bash
# Use specific groups for specific purposes
chgrp database-admins /etc/mysql/          # Not just 'staff'
chgrp web-developers /var/www/project/     # Not just 'users'

# Avoid using 'wheel' group for non-admin tasks
chgrp developers /opt/app/                 # Preferred over 'wheel'

# Create project-specific groups
sudo groupadd project-alpha
chgrp project-alpha /projects/alpha/
```

#### Sensitive File Protection
```bash
# System configuration files
chgrp root /etc/passwd /etc/shadow /etc/sudoers
chmod 640 /etc/shadow

# SSL/TLS certificates
chgrp ssl-cert /etc/ssl/private/
chmod 640 /etc/ssl/private/*

# Application secrets
chgrp app-admins /etc/secrets/
chmod 640 /etc/secrets/config.key

# Backup encryption keys
chgrp backup-admins /backup/keys/
chmod 600 /backup/keys/*
```

#### Temporary File Security
```bash
# Set proper groups for temporary directories
chgrp nobody /tmp/sensitive-temp/
chmod 700 /tmp/sensitive-temp/

# Session files
chgrp www-data /var/lib/php/sessions/
chmod 770 /var/lib/php/sessions/

# Upload directories with restricted access
mkdir -p /var/www/uploads/secure
chgrp secure-uploads /var/www/uploads/secure
chmod 770 /var/www/uploads/secure
```

### Audit and Monitoring

#### Group Ownership Auditing
```bash
# Find files with unexpected group ownership
find /etc -not -group root -ls
find /home -not -group $(stat -c %G /home) -ls

# Audit script
#!/bin/bash
# audit_group_ownership.sh

echo "Group Ownership Audit Report"
echo "==========================="

# Check critical system directories
echo "Checking /etc for non-root group ownership:"
find /etc -not -group root -type f | head -10

echo "Checking /var/log for non-adm/log ownership:"
find /var/log -not \( -group adm -o -group syslog \) -type f | head -10

echo "Checking /home for inconsistent group ownership:"
find /home -type d | while read dir; do
    expected_group=$(basename "$dir")
    if [[ $(stat -c %G "$dir") != "$expected_group" ]]; then
        echo "$dir has group $(stat -c %G "$dir"), expected $expected_group"
    fi
done
```

#### Change Tracking
```bash
# Monitor group changes with auditd (if available)
auditctl -w /etc/passwd -p wa -k group_changes
auditctl -w /etc/group -p wa -k group_changes

# Log group changes for manual tracking
log_group_changes() {
    echo "$(date): chgrp $* - $(whoami)" >> /var/log/group_changes.log
}

# Wrapper function to log changes
chgrp() {
    log_group_changes "$@"
    /bin/chgrp "$@"
}
```

## Integration and Automation

### Shell Integration

#### Command Aliases and Functions
```bash
# Quick group change with verification
alias chgrpv='chgrp -v'

# Function to change group and set appropriate permissions
chgroupperm() {
    local group="$1"
    local path="$2"
    local perms="$3"

    chgrp "$group" "$path"
    if [[ -n "$perms" ]]; then
        chmod "$perms" "$path"
    fi
}

# Function to setup shared directory
setup_shared() {
    local dir="$1"
    local group="$2"

    mkdir -p "$dir"
    chgrp "$group" "$dir"
    chmod 2775 "$dir"  # SGID + group write
    echo "Shared directory setup: $dir (group: $group)"
}
```

#### Batch Processing Scripts
```bash
#!/bin/bash
# batch_group_change.sh

SOURCE_DIR="/source/directory"
TARGET_GROUP="developers"
FILE_TYPES=("*.py" "*.js" "*.html" "*.css")

echo "Starting batch group change..."

# Process each file type
for pattern in "${FILE_TYPES[@]}"; do
    echo "Processing $pattern files..."
    find "$SOURCE_DIR" -name "$pattern" -exec chgrp -v "$TARGET_GROUP" {} \;
done

echo "Batch group change completed"
```

### System Integration

#### Cron Jobs for Maintenance
```bash
# Daily log file group maintenance (add to crontab)
0 2 * * * find /var/log -name "*.log.*" -exec chgrp adm {} \;

# Weekly group ownership verification
0 3 * * 0 /usr/local/sbin/audit_group_ownership.sh

# Monthly temporary file cleanup
0 4 1 * * find /tmp -mtime +30 -exec chgrp nobody {} \; -exec chmod 600 {} \;
```

#### Systemd Service Integration
```bash
# Service file for group management
[Unit]
Description=Group Ownership Maintenance
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/fix_group_ownership.sh
User=root
Group=root

[Install]
WantedBy=multi-user.target
```

## Related Commands

- [`chown`](/docs/commands/file-management/chown) - Change file ownership (user and group)
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`groups`](/docs/commands/system-management/groups) - Display user groups
- [`id`](/docs/commands/system-management/id) - Display user and group information
- [`groupadd`](/docs/commands/system-management/groupadd) - Create new group
- [`groupdel`](/docs/commands/system-management/groupdel) - Delete group
- [`groupmod`](/docs/commands/system-management/groupmod) - Modify group
- [`usermod`](/docs/commands/system-management/usermod) - Modify user group membership
- [`gpasswd`](/docs/commands/system-management/gpasswd) - Administer /etc/group and /etc/gshadow
- [`getent`](/docs/commands/system-management/getent) - Get entries from administrative database
- [`find`](/docs/commands/file-management/find) - Find files and perform actions
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Use descriptive group names** for better organization:
   - `developers`, `designers`, `admin-team`, `database-admins`
   - Avoid generic names like `group1`, `team1`

2. **Set SGID bit on shared directories** for automatic group inheritance:
   - `chmod g+s /shared/project`
   - `chmod 2775 /shared/directory` (SGID + group write)

3. **Use reference files** for consistency across multiple files:
   - `chgrp --reference=template.conf *.conf`

4. **Verify changes** with verbose output:
   - `chgrp -v group file` for important operations
   - `chgrp -c group file` to see only actual changes

5. **Use appropriate privilege levels**:
   - `sudo chgrp adm /var/log/syslog` for system files
   - Regular user chgrp for owned files

6. **Combine group changes with permissions**:
   - Group changes often need permission adjustments too
   - Use `chmod` alongside `chgrp` for complete access control

7. **Audit regularly** for security and compliance:
   - Check for files with incorrect group ownership
   - Monitor group membership changes

8. **Document group purposes** and naming conventions:
   - Maintain documentation of group purposes and members
   - Use consistent naming across systems

## Performance Tips

1. **Use `find` with `+`** for large directory operations instead of `-exec` with `\;`
   - More efficient: `find /path -exec chgrp group {} +`
   - Less efficient: `find /path -exec chgrp group {} \;`

2. **Limit recursion depth** when possible:
   - `chgrp -R --maxdepth=3 group /path/`
   - Or use: `find /path -maxdepth 3 -exec chgrp group {} +`

3. **Process specific file types** instead of entire directories:
   - `find /path -name "*.log" -exec chgrp adm {} +`
   - More efficient than full recursive operations

4. **Use `xargs` for parallel processing**:
   - `find /path -print0 | xargs -0 -P 4 chgrp group`

5. **Batch operations** for multiple files:
   - `chgrp group file1 file2 file3 ...`
   - More efficient than separate commands

6. **Avoid unnecessary recursion**:
   - Use `-P` (default) to not follow symbolic links
   - Only use `-L` or `-H` when specifically needed

7. **Use numeric GIDs** in scripts for better performance:
   - `chgrp 1001 file` instead of `chgrp developers file`
   - Eliminates group name lookup overhead

The `chgrp` command is a fundamental tool for Linux system administration, providing essential group-based access control capabilities. Its proper use enables secure collaborative environments, implements security policies, and maintains the principle of least privilege in multi-user systems. Mastering `chgrp` operations, understanding its interaction with permissions, and following best practices are crucial skills for effective Linux system administration and security management.