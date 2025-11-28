---
title: setfacl - Set file access control lists
sidebar_label: setfacl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# setfacl - Set file access control lists

The `setfacl` command is a powerful utility for setting and managing Access Control Lists (ACLs) on files and directories in Linux systems. ACLs provide a more flexible and granular permission system than traditional Unix permissions, allowing you to specify access rights for multiple users and groups beyond the standard owner/group/other model. This command is essential for implementing fine-grained access control, shared resource management, and complex security policies in multi-user environments.

## Basic Syntax

```bash
setfacl [OPTIONS] ACL_SPEC FILE...
setfacl [OPTIONS] -f ACL_FILE FILE...
setfacl [OPTIONS] --set ACL_SPEC FILE...
setfacl [OPTIONS] -X ACL_FILE FILE...
setfacl [OPTIONS] -b FILE...
setfacl [OPTIONS] -k FILE...
setfacl [OPTIONS] -R FILE...
```

## ACL Entry Format

```bash
# ACL entry format: [u|g|m:o]:[user|group]:[permissions]
# Default ACL format: d:[u|g|m]:[user|group]:[permissions]

# User ACL
u:username:rw-       # Specific user
u:1001:rw-           # User by UID
u::rw-               # File owner

# Group ACL
g:groupname:r-x      # Specific group
g:1002:r-x           # Group by GID
g::r-x               # File group

# Mask and Other
m::rwx               # Effective rights mask
o::r--               # Others

# Default ACL (for directories)
d:u:username:rwx     # Default user ACL
d:g:groupname:r-x    # Default group ACL
d:m::rwx             # Default mask
d:o::r-x             # Default others
```

## Common Options

### ACL Modification Options
- `-m, --modify=ACL_SPEC` - Modify or add ACL entries
- `-M, --modify-file=FILE` - Read ACL entries from file and modify
- `-x, --remove=ACL_SPEC` - Remove specific ACL entries
- `-X, --remove-file=FILE` - Read ACL entries from file and remove
- `--set=ACL_SPEC` - Set complete ACL (replace existing)
- `--set-file=FILE` - Set complete ACL from file

### ACL Removal Options
- `-b, --remove-all` - Remove all extended ACL entries
- `-k, --remove-default` - Remove default ACL entries

### Processing Options
- `-R, --recursive` - Apply ACLs recursively to directory contents
- `-L, --logical` - Follow symbolic links (default)
- `-P, --physical` - Do not follow symbolic links
- `--restore=FILE` - Restore ACLs from backup file
- `-d, --default` - Apply operations to default ACLs

### Output Options
- `--test` - Test mode (show what would be done without applying)
- `-n, --no-mask` - Do not recalculate effective rights mask
- `-v, --verbose` - Display detailed information
- `--version` - Show version information
- `--help` - Display help message

## Usage Examples

### Basic ACL Operations

#### Setting User and Group ACLs
```bash
# Grant read/write access to specific user
setfacl -m u:john:rw- document.txt

# Grant read-only access to specific group
setfacl -m g:developers:r-- /projects/

# Grant full access to user by UID
setfacl -m u:1001:rwx /shared/data/

# Modify permissions for existing ACL
setfacl -m u:alice:r-x reports.pdf

# Grant execute permission to group
setfacl -m g:staff:--x scripts/
```

#### Managing Multiple ACLs
```bash
# Set multiple ACL entries at once
setfacl -m u:bob:rw-,u:alice:r-x,g:team:r-- /shared/project/

# Remove specific user ACL
setfacl -x u:john document.txt

# Remove specific group ACL
setfacl -x g:developers /projects/

# Replace all ACL entries with new ones
setfacl --set u:john:rwx,u:mary:r-x,g:users:r-x,m::rwx,o::--- file.txt
```

### Default ACLs for Directories

#### Setting Default ACLs
```bash
# Set default ACL for directory (applies to new files)
setfacl -d -m u:john:rwx,g:developers:r-x,o::--- /shared/projects/

# Set multiple default ACL entries
setfacl -d -m u:john:rwx,u:mary:r-x,g:team:rwx,m::rwx,o::--- /shared/team/

# Set both regular and default ACLs
setfacl -m u:john:rwx -d -m u:john:rwx /shared/projects/

# Remove default ACLs only
setfacl -k /shared/projects/
```

#### Directory ACL Management
```bash
# Create directory with specific ACLs
mkdir /shared/documents
setfacl -m u:admin:rwx,g:users:r-x,o::--- /shared/documents/
setfacl -d -m u:admin:rwx,g:users:r-x,o::--- /shared/documents/

# Set ACLs for web server directory
setfacl -R -m u:www-data:rwx,g:webmasters:r-x,o::--- /var/www/html/

# Remove all ACLs from directory tree
setfacl -R -b /backup/old_files/
```

### Advanced ACL Operations

#### Recursive ACL Application
```bash
# Apply ACLs recursively to directory tree
setfacl -R -m u:james:rw- /home/shared/projects/

# Recursively set default ACLs
setfacl -R -d -m g:developers:r-x /source/code/

# Remove all ACLs recursively
setfacl -R -b /tmp/cleanup/

# Follow symbolic links during recursive operation
setfacl -RL -m u:backup:rw- /data/archives/
```

#### Batch ACL Operations
```bash
# Read ACLs from file and apply
cat > acl_entries.txt << EOF
u:john:rw-
u:alice:r-x
g:developers:r-x
m::rwx
EOF

setfacl -M acl_entries.txt file.txt

# Remove ACLs using file
cat > remove_acl.txt << EOF
u:john
g:developers
EOF

setfacl -X remove_acl.txt file.txt
```

### Permission Masks and Effective Rights

#### Managing Effective Rights Mask
```bash
# Set specific mask to limit effective permissions
setfacl -m m::r-x /shared/documents/

# Set mask without recalculating
setfacl -n -m m::rw- /shared/important/

# Show effective rights
getfacl /shared/documents/

# Remove mask (reset to defaults)
setfacl -x m:: file.txt
```

#### Complex Permission Scenarios
```bash
# Create collaboration directory with specific permissions
mkdir /project/collaboration
setfacl -m u:alice:rw-,u:bob:rw-,g:team:r-x,m::rw- /project/collaboration
setfacl -d -m u:alice:rw-,u:bob:rw-,g:team:r-x,m::rw- /project/collaboration

# Set up read-only backup access
setfacl -R -m u:backup:r-x /data/
setfacl -R -m u:backup:--- /data/sensitive/

# Grant temporary access with specific duration
setfacl -m u:temp_user:rwx /shared/temp_project/
# Later remove:
# setfacl -x u:temp_user /shared/temp_project/
```

## Practical Examples

### System Administration

#### Web Server Configuration
```bash
# Configure proper ACLs for web content
setfacl -R -m u:www-data:r-x,g:webadmins:rwx,o::r-- /var/www/

# Set default ACLs for new web content
setfacl -R -d -m u:www-data:r-x,g:webadmins:rwx,o::r-- /var/www/

# Grant SSL certificate management access
setfacl -m u:ssl_admin:rwx /etc/ssl/
setfacl -m g:cert_team:r-x /etc/ssl/certs/

# Log directory access control
setfacl -R -m u:logrotate:rw-,g:sysadmins:r-x,o::--- /var/log/
```

#### Database Server Setup
```bash
# MySQL data directory permissions
setfacl -R -m u:mysql:rwx,g:dba:r-x,o::--- /var/lib/mysql/

# PostgreSQL data access
setfacl -R -m u:postgres:rwx,g:pg_admins:r-x,o::--- /var/lib/postgresql/

# Database backup access
setfacl -m u:backup_user:rwx /backup/database/
setfacl -m g:backup_team:r-x /backup/database/

# Configuration file access
setfacl -m u:mysql:rw-,g:dba:r-- /etc/mysql/my.cnf
```

#### File Server Management
```bash
# Create user home directories with proper ACLs
mkdir /home/users/alice
setfacl -m u:alice:rwx,u:admin:rwx,g:users:---,o::--- /home/users/alice
setfacl -d -m u:alice:rwx,u:admin:rwx,g:users:---,o::--- /home/users/alice

# Shared project directories
mkdir /shared/projects/marketing
setfacl -m g:marketing:rwx,g:management:r-x,o::--- /shared/projects/marketing
setfacl -d -m g:marketing:rwx,g:management:r-x,o::--- /shared/projects/marketing

# Temporary collaboration space
mkdir /shared/collab/alpha_team
setfacl -m u:alice:rw-,u:bob:rw-,g:alpha_team:rwx,o::--- /shared/collab/alpha_team
setfacl -d -m u:alice:rw-,u:bob:rw-,g:alpha_team:rwx,o::--- /shared/collab/alpha_team
```

### Development Environment

#### Source Code Management
```bash
# Git repository access control
setfacl -R -m g:developers:rwx,o::r-- /var/git/project.git/

# Build directory permissions
setfacl -R -m u:jenkins:rwx,g:devs:rwx,o::--- /build/project/

# Configuration files access
setfacl -m u:deploy:r--,g:ops:rwx,o::--- /etc/project/

# Log files with selective access
setfacl -m g:devs:r--,g:ops:rwx,o::--- /var/log/project/
```

#### Testing Environment
```bash
# Test data access control
setfacl -R -m u:tester:rw-,g:qa:rwx,o::--- /test/data/

# Database test environment
setfacl -R -m u:test_runner:rw-,g:qa:rw-,o::--- /test/database/

# Test reports directory
setfacl -R -m u:tester:rwx,g:qa:r-x,g:managers:r-- /test/reports/

# Temporary test files
setfacl -m u:tester:rw-,u:junit:rw- /tmp/test_workspace/
```

### Security and Compliance

#### Sensitive Data Protection
```bash
# Financial data access control
setfacl -R -m u:accountant:rwx,g:finance:r-x,o::--- /data/financial/

# HR records protection
setfacl -R -m u:hr_manager:rwx,g:hr_staff:r-x,o::--- /data/hr/
setfacl -d -m u:hr_manager:rwx,g:hr_staff:r-x,o::--- /data/hr/

# Legal documents access
setfacl -R -m u:legal_counsel:rwx,g:legal_team:r-x,o::--- /data/legal/

# Remove all ACLs for cleanup
setfacl -R -b /archive/old_data/
```

#### Audit and Compliance
```bash
# Audit trail directory with strict access
setfacl -R -m u:auditor:rwx,g:audit_team:r-x,o::--- /var/log/audit/

# Compliance documentation access
setfacl -R -m g:compliance:rwx,g:management:r-x,o::--- /docs/compliance/

# Configuration backup with restricted access
setfacl -R -m u:backup_admin:rwx,g:sysadmins:r-x,o::--- /backup/config/
```

### Backup and Recovery

#### Backup Operations
```bash
# Grant backup access to specific user
setfacl -R -m u:backup_user:r-x /home/users/
setfacl -R -m u:backup_user:rw- /backup/storage/

# Exclude sensitive directories from backup
setfacl -m u:backup_user:--- /data/sensitive/
setfacl -m u:backup_user:--- /private/secrets/

# Incremental backup permissions
setfacl -m u:backup_user:rw-,g:backup_team:r-x /data/incremental/
```

#### Restore Operations
```bash
# Restore ACLs from backup
getfacl -R /backup/archive/ > acl_backup.txt
setfacl --restore=acl_backup.txt

# Restore with dry run
setfacl --test --restore=acl_backup.txt

# Restore ACLs to new location
getfacl -R /original/data/ | setfacl --set-file=- /restored/data/
```

## Advanced Usage

### Complex ACL Scenarios

#### Hierarchical Permissions
```bash
# Multi-level directory structure with different ACLs
mkdir -p /projects/{alpha,beta,gamma}/{src,docs,logs}

# Alpha project - developer access
setfacl -R -m g:alpha_devs:rwx,o::--- /projects/alpha/
setfacl -R -d -m g:alpha_devs:rwx,o::--- /projects/alpha/

# Beta project - read-only for some users
setfacl -R -m u:analyst:r-x,g:beta_devs:rwx,o::--- /projects/beta/
setfacl -R -d -m g:beta_devs:rwx,o::--- /projects/beta/

# Gamma project - mixed permissions
setfacl -R -m u:lead:rwx,g:gamma_devs:rwx,g:managers:r-x,o::--- /projects/gamma/
setfacl -R -d -m g:gamma_devs:rwx,g:managers:r-x,o::--- /projects/gamma/
```

#### Temporary Access Management
```bash
# Grant temporary contractor access
setfacl -R -m u:contractor1:rwx,g:contractors:r-x /projects/external/
setfacl -R -d -m g:contractors:r-x /projects/external/

# Schedule access removal (example script)
echo "setfacl -R -x u:contractor1 /projects/external/" | at now + 7 days

# Emergency access for system maintenance
setfacl -R -m u:maintenance:rwx /critical/system/
# Later remove:
# setfacl -R -x u:maintenance /critical/system/
```

### Scripting and Automation

#### ACL Management Scripts
```bash
#!/bin/bash
# setup_project_acls.sh - Set up ACLs for new project

PROJECT_DIR="/projects/$1"
PROJECT_GROUP="proj_$1"

if [ -z "$1" ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

# Create project directory
mkdir -p "$PROJECT_DIR"

# Set up ACLs
setfacl -m u:project_owner:rwx,g:"$PROJECT_GROUP":rwx,o::--- "$PROJECT_DIR"
setfacl -d -m u:project_owner:rwx,g:"$PROJECT_GROUP":rwx,o::--- "$PROJECT_DIR"

echo "ACLs set up for project: $1"
```

#### Backup ACLs Script
```bash
#!/bin/bash
# backup_acls.sh - Backup ACLs for specified directories

BACKUP_DIR="/acl_backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

for dir in "$@"; do
    if [ -d "$dir" ]; then
        backup_file="$BACKUP_DIR/acl_$(basename "$dir")_$DATE.txt"
        getfacl -R "$dir" > "$backup_file"
        echo "ACLs backed up for $dir to $backup_file"
    else
        echo "Directory $dir does not exist"
    fi
done
```

### Performance Optimization

#### Efficient Recursive Operations
```bash
# Use find with setfacl for large directory trees
find /data/ -type d -exec setfacl -m g:users:rw- {} +

# Process files separately from directories
find /projects/ -type d -exec setfacl -m g:devs:rwx {} +
find /projects/ -type f -exec setfacl -m g:devs:rw- {} +

# Use xargs for better performance
find /home/ -user john -print0 | xargs -0 setfacl -m g:backup:r-x
```

#### Batch Operations
```bash
# Process multiple files with similar ACLs
for file in /config/*.conf; do
    setfacl -m u:app_user:r--,g:admins:rwx "$file"
done

# Set ACLs based on file types
find /data/ -name "*.log" -exec setfacl -m g:logreaders:r-- {} +
find /data/ -name "*.sh" -exec setfacl -m g:users:r-x {} +
```

## Integration and Automation

### Monitoring and Auditing

#### ACL Monitoring Script
```bash
#!/bin/bash
# monitor_acls.sh - Monitor ACL changes

LOG_FILE="/var/log/acl_monitor.log"

while true; do
    find /shared/ -exec getfacl {} + > /tmp/current_acls.txt
    if [ -f /tmp/previous_acls.txt ]; then
        if ! diff /tmp/previous_acls.txt /tmp/current_acls.txt > /dev/null; then
            echo "$(date): ACL changes detected" >> "$LOG_FILE"
            diff /tmp/previous_acls.txt /tmp/current_acls.txt >> "$LOG_FILE"
        fi
    fi
    cp /tmp/current_acls.txt /tmp/previous_acls.txt
    sleep 300  # Check every 5 minutes
done
```

### Cron Jobs for ACL Management
```bash
# Daily ACL cleanup
0 2 * * * /usr/local/bin/cleanup_temp_acls.sh

# Weekly ACL backup
0 3 * * 0 /usr/local/bin/backup_all_acls.sh

# Monthly ACL audit
0 4 1 * * /usr/local/bin/audit_acls.sh
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Check if filesystem supports ACLs
tune2fs -l /dev/sda1 | grep "Default mount options"
# Should include "acl" option

# Remount with ACL support
mount -o remount,acl /

# Check if ACL is already set
getfacl file.txt

# Verify user exists before setting ACL
id john || echo "User john does not exist"
```

#### Recursive Operation Issues
```bash
# Use -P option to avoid following symlinks
setfacl -R -P -m u:user:rw- /path/with/symlinks/

# Check for circular symlinks
find /path -type l -ls

# Process directories first, then files
find /path -type d -exec setfacl -m g:group:rwx {} +
find /path -type f -exec setfacl -m g:group:rw- {} +
```

#### Mask Permission Problems
```bash
# Check effective rights
getfacl file.txt | grep "effective:"

# Recalculate mask if needed
setfacl -m m::rwx file.txt

# Remove mask restriction
setfacl -x m:: file.txt
```

### Recovery Operations

#### Restoring Lost ACLs
```bash
# Restore from backup
setfacl --restore=acl_backup.txt

# Rebuild ACLs from scratch
setfacl --set u:user1:rwx,g:group1:r-x,o::--- file.txt

# Copy ACLs from template file
getfacl template_file | setfacl --set-file=- target_file
```

## Related Commands

- [`getfacl`](/docs/commands/user-management/getfacl) - Get file access control lists
- [`chacl`](/docs/commands/user-management/chacl) - Change file access control lists
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file owner and group
- [`lsattr`](/docs/commands/file-management/lsattr) - List file attributes
- [`chattr`](/docs/commands/file-management/chattr) - Change file attributes
- [`find`](/docs/commands/file-management/find) - Find files with specific criteria
- [`mount`](/docs/commands/system-services/mount) - Mount filesystems with options

## Best Practices

1. **Plan ACL structure** before implementing to avoid complexity
2. **Use default ACLs** on directories for consistent inheritance
3. **Document ACL policies** for audit and compliance purposes
4. **Regular backup** of ACL configurations for disaster recovery
5. **Test ACL changes** in non-production environments first
6. **Use groups instead of individual users** for easier management
7. **Monitor ACL changes** for security and compliance
8. **Clean up unused ACLs** to maintain system performance
9. **Use recursive operations** carefully to avoid unintended changes
10. **Implement least privilege principle** - grant minimal necessary permissions

## Performance Tips

1. **Batch operations** are more efficient than individual operations
2. **Use specific targets** instead of recursive operations when possible
3. **Avoid excessive ACL entries** on heavily accessed files
4. **Consider filesystem support** for ACLs when planning deployment
5. **Use symbolic link options** (-L/-P) appropriately for performance
6. **Test with --test option** before applying changes to large directory trees
7. **Schedule ACL operations** during low-usage periods for large operations
8. **Use find with xargs** for better performance on large numbers of files
9. **Avoid circular symlinks** in directories with recursive operations
10. **Consider RAM requirements** when working with large ACL datasets

The `setfacl` command is an essential tool for implementing fine-grained access control in Linux environments. Its ability to provide granular permissions beyond traditional Unix models makes it invaluable for shared resources, collaborative projects, and security-sensitive environments. When used properly, ACLs offer powerful and flexible file access management while maintaining system security and compliance requirements.