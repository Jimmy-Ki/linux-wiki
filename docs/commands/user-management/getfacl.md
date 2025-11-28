---
title: getfacl - Get file access control lists
sidebar_label: getfacl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# getfacl - Get file access control lists

The `getfacl` command is used to get file access control lists (ACLs) from files and directories. ACLs provide a more flexible permission mechanism than the traditional Unix permission system, allowing fine-grained access control for multiple users and groups beyond the basic owner/group/other model. The command displays the ACL entries in human-readable format, showing both the base Unix permissions and any extended ACL entries that have been set using `setfacl`.

## Basic Syntax

```bash
getfacl [OPTIONS] [FILE]...
```

## Common Options

### Output Format Options
- `-d, --default` - Display the default ACL
- `-R, --recursive` - List ACLs of all files and directories recursively
- `-L, --logical` - Logical walk, follow symbolic links (default)
- `-P, --physical` - Physical walk, do not follow symbolic links
- `-a, --access` - Display the file access control list only (default)
- `-c, --omit-header` - Do not display the comment header
- `-i, --ignore-case` - Match ACL entries case-insensitively
- `-p, --absolute-names` - Don't strip leading '/' in pathnames
- `-n, --numeric` - Print numeric UIDs/GIDs instead of names
- `-s, --skip-base` - Skip files that only have the base entries

### Output Formatting
- `-t, --tabular` - Use tabular output format
- `-m, --more-effective` - Display only effective rights

### Version and Help
- `-v, --version` - Display version information and exit
- `-h, --help` - Display help information and exit

## Usage Examples

### Basic ACL Viewing

#### View ACL of a Single File
```bash
# View ACL of a specific file
getfacl file.txt

# View ACL with full paths
getfacl -p /home/user/document.pdf

# View ACL without header comment
getfacl -c file.txt

# View ACL with numeric UIDs/GIDs
getfacl -n file.txt
```

#### View ACL of Multiple Files
```bash
# View ACL of multiple files
getfacl file1.txt file2.txt file3.txt

# View ACL of files matching pattern
getfacl *.log

# View ACL of specific directory contents
getfacl /var/log/*
```

### Directory ACL Operations

#### View Directory ACL
```bash
# View directory ACL
getfacl /home/user/

# View both access and default ACL
getfacl -d /home/user/shared/

# View ACL of directory without following symlinks
getfacl -P /home/user/

# View all ACL entries in tabular format
getfacl -t /home/user/
```

#### Recursive ACL Viewing
```bash
# Recursively view all ACLs in directory
getfacl -R /home/user/projects/

# Recursive view with absolute paths
getfacl -R -p /home/user/documents/

# Recursive view in tabular format
getfacl -R -t /data/

# Recursive numeric display for scripts
getfacl -R -n /shared/files/
```

### Default ACL Management

#### View Default ACLs
```bash
# View default ACL of directory
getfacl -d /home/user/shared/

# View both access and default ACLs
getfacl /home/user/shared/ && getfacl -d /home/user/shared/

# Compare access and default ACLs
diff <(getfacl /home/user/shared/) <(getfacl -d /home/user/shared/)
```

## Practical Examples

### System Administration

#### File System Security Audit
```bash
# Find all files with extended ACLs
find / -type f -exec getfacl {} \; 2>/dev/null | grep -B1 "user:"

# List directories with default ACLs
find / -type d -exec getfacl -d {} \; 2>/dev/null | grep -l "default:"

# Check for suspicious ACL entries
getfacl -R /etc/ | grep -E "(user:[^:]+:[rwx]{3,}|group:[^:]+:[rwx]{3,})"

# Audit user permissions across system
getfacl -R /home/ | grep "user:username"
```

#### ACL Backup and Migration
```bash
# Backup ACLs for entire directory tree
getfacl -R /data/ > acl_backup_$(date +%Y%m%d).txt

# Backup ACLs in numeric format
getfacl -R -n /important/files/ > numeric_acl_backup.txt

# Export ACLs for migration
getfacl -R -p /shared/ > migration_acl.txt

# Create ACL report
getfacl -R -t /critical/files/ > acl_report.txt
```

### User and Group Management

#### Check User Permissions
```bash
# Check specific user's permissions
getfacl /shared/project/ | grep "user:john"

# Check group permissions
getfacl /shared/data/ | grep "group:developers"

# View effective permissions for user
getfacl -m /home/user/documents/

# List all ACL entries for specific user
getfacl -R /home/ | grep "user:alice"
```

#### Permission Verification
```bash
# Verify user has read access
getfacl /shared/file.txt | grep -E "(user:username:.*r|group:groupname:.*r)"

# Check write permissions for group
getfacl -d /shared/projects/ | grep "group:team:.*w"

# Verify executable permissions
getfacl /usr/local/bin/script.sh | grep -E "(user:.*x|group:.*x|other:.*x)"

# Check ACL inheritance
getfacl -R /parent/dir/ | grep -A2 -B2 "default:"
```

### Development and Configuration

#### Configuration File Permissions
```bash
# Check web server file permissions
getfacl /var/www/html/ | grep -E "(user:www-data|group:www-data)"

# Verify database file ACLs
getfacl /var/lib/mysql/ | grep -E "(user:mysql|group:mysql)"

# Check application config permissions
getfacl /etc/app/config.properties

# Audit log file permissions
getfacl /var/log/app/ | grep -E "(user:app|group:app)"
```

#### Development Environment Setup
```bash
# Check development directory permissions
getfacl -R /home/dev/projects/ | grep -E "(user:dev|group:developers)"

# Verify shared repository permissions
getfacl /srv/git/repositories/ | grep -E "(user:git|group:git)"

# Check build directory ACLs
getfacl /tmp/build/ | grep -E "(user:builduser|group:build)"

# Verify deployment permissions
getfacl /var/www/app/ | grep -E "(user:www-data|group:deploy)"
```

## Advanced Usage

### ACL Analysis and Comparison

#### Compare File ACLs
```bash
# Compare ACLs between two files
diff <(getfacl file1.txt) <(getfacl file2.txt)

# Find files with identical ACLs
getfacl -R /data/ | sort | uniq -c | sort -nr

# Compare directory ACL structures
comm -12 <(getfacl -R dir1/ | sort) <(getfacl -R dir2/ | sort)
```

#### Complex ACL Queries
```bash
# Find files with specific user permissions
getfacl -R /path/ | awk '/user:username:/ {print FILENAME; nextfile}'

# List all default ACLs in system
find / -type d -exec sh -c 'getfacl -d "$1" | grep -q "default:"' _ {} \; -print

# Check for conflicting ACL entries
getfacl -R /data/ | grep -E "(user|group):" | sort | uniq -d

# Generate ACL statistics
getfacl -R /home/ | grep -c "user:" | wc -l
```

### Script Integration

#### ACL Validation Scripts
```bash
#!/bin/bash
# Check if files have proper ACLs

directory="/shared/data"
required_user="appuser"
required_group="appgroup"

# Check if directory has required user ACL
if getfacl "$directory" | grep -q "user:$required_user:rw"; then
    echo "✓ User ACL correctly set"
else
    echo "✗ Missing required user ACL"
fi

# Check if directory has required group ACL
if getfacl "$directory" | grep -q "group:$required_group:rw"; then
    echo "✓ Group ACL correctly set"
else
    echo "✗ Missing required group ACL"
fi
```

#### ACL Migration Script
```bash
#!/bin/bash
# Migrate ACLs from source to destination

source_dir="/source"
dest_dir="/destination"

# Export ACLs from source
getfacl -R -p "$source_dir" > /tmp/source_acls.txt

# Apply ACLs to destination (requires setfacl)
# This would need to be adapted for actual ACL restoration
echo "ACL export completed. Use setfacl --restore to apply."
```

## Integration and Automation

### Monitoring and Alerting

#### ACL Change Detection
```bash
#!/bin/bash
# Monitor ACL changes

directory="/critical/files"
acl_log="/var/log/acl_changes.log"

# Create baseline
getfacl -R "$directory" > /tmp/acl_baseline.txt

# Monitor for changes
while true; do
    getfacl -R "$directory" > /tmp/acl_current.txt
    if ! diff /tmp/acl_baseline.txt /tmp/acl_current.txt; then
        echo "$(date): ACL changes detected in $directory" >> "$acl_log"
        cp /tmp/acl_current.txt /tmp/acl_baseline.txt
    fi
    sleep 300
done
```

#### Automated ACL Reporting
```bash
#!/bin/bash
# Generate daily ACL reports

report_dir="/reports/acls"
date=$(date +%Y%m%d)

# Create report directory
mkdir -p "$report_dir"

# Generate reports for critical directories
for dir in "/etc" "/home" "/var/www" "/shared"; do
    if [ -d "$dir" ]; then
        getfacl -R -t "$dir" > "$report_dir/acl_${dir//\//_}_$date.txt"
    fi
done

# Create summary report
echo "ACL Report Generated: $(date)" >> "$report_dir/summary_$date.txt"
echo "================================" >> "$report_dir/summary_$date.txt"
find "$report_dir" -name "acl_*_$date.txt" -exec wc -l {} \; >> "$report_dir/summary_$date.txt"
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Check if you have permission to read ACLs
ls -la file.txt

# Try with sudo if permissions are insufficient
sudo getfacl /root/secret_file

# Check directory permissions
getfacl -d /restricted/directory/

# Verify file system supports ACLs
tune2fs -l /dev/sda1 | grep "Default mount options"
```

#### Symbolic Link Issues
```bash
# Don't follow symbolic links
getfacl -P /path/with/symlinks/

# Follow symbolic links explicitly
getfacl -L /path/with/symlinks/

# Check if target exists
readlink symlink_name

# View ACL of symlink target
getfacl $(readlink symlink_name)
```

#### File System ACL Support
```bash
# Check if file system supports ACLs
mount | grep -i acl

# Tune ext4 for ACL support
tune2fs -o acl /dev/sda1

# Remount with ACL support
mount -o remount,acl /mount/point

# Check current mount options
mount | grep /mount/point
```

#### ACL Display Issues
```bash
# Force numeric display if name resolution fails
getfacl -n file.txt

# Check for corrupted ACL entries
getfacl -c file.txt

# Use tabular format for better readability
getfacl -t directory/

# Skip files without extended ACLs
getfacl -s -R /directory/
```

## Related Commands

- [`setfacl`](/docs/commands/user-management/setfacl) - Set file access control lists
- [`ls`](/docs/commands/file-management/ls) - List directory contents with permissions
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file owner and group
- [`chacl`](/docs/commands/user-management/chacl) - Change file access control lists (alternative)
- [`getcap`](/docs/commands/user-management/getcap) - Get file capabilities
- [`find`](/docs/commands/file-management/find) - Find files with specific criteria
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Use recursive viewing** (-R) for directory structures to understand complete ACL layout
2. **Check default ACLs** (-d) when working with directories to understand inheritance
3. **Use numeric format** (-n) in scripts to avoid name resolution issues
4. **Skip base-only entries** (-s) to focus on files with extended ACLs
5. **Document ACL changes** by saving output before and after modifications
6. **Use tabular format** (-t) for better readability in complex ACL environments
7. **Regularly audit** critical directories for proper ACL configuration
8. **Test ACL changes** in non-production environments first
9. **Backup ACLs** before making system-wide changes
10. **Monitor file system support** to ensure ACLs are enabled on relevant mounts

## Performance Tips

1. **Use -s flag** to skip files without extended ACLs in large directory trees
2. **Combine with find** for targeted ACL examination of specific file types
3. **Limit recursion depth** for very deep directory structures
4. **Use absolute paths** (-p) for consistent script output
5. **Avoid numeric lookups** (-n) when UID/GID resolution is not needed
6. **Cache ACL information** for frequently accessed files in monitoring scripts
7. **Use grep filtering** to focus on specific users or groups in large ACL outputs
8. **Schedule ACL audits** during off-peak hours for large file systems
9. **Parallelize operations** when checking multiple independent directory trees
10. **Minimize header output** (-c) for faster processing in automated scripts

The `getfacl` command is an essential tool for managing and auditing file access control lists in Linux systems. Its ability to display both standard Unix permissions and extended ACL entries makes it invaluable for system administrators who need fine-grained control over file access permissions. When combined with `setfacl`, it provides a comprehensive solution for implementing and managing sophisticated access control policies.