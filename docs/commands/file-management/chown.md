---
title: chown - Change File Owner
sidebar_label: chown
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chown - Change File Owner

The `chown` (change owner) command changes the user and group ownership of files and directories. This is essential for file management and security, ensuring that files belong to the correct users and groups.

## Basic Syntax

```bash
chown [OPTIONS] OWNER[:GROUP] FILE...
chown [OPTIONS] --from=CURRENT_OWNER[:CURRENT_GROUP] OWNER[:GROUP] FILE...
chown [OPTIONS] --reference=RFILE FILE...
```

## Common Options

### Ownership Options
- `--from=CURRENT_OWNER[:CURRENT_GROUP]` - Change only files owned by specified user/group
- `--reference=RFILE` - Use RFILE's owner and group instead of specifying values

### Recursive Options
- `-R, --recursive` - Operate on files and directories recursively
- `-H` - If a command line argument is a symbolic link to a directory, traverse it
- `-L` - Traverse every symbolic link to a directory encountered
- `-P` - Do not traverse any symbolic links (default)

### Behavior Options
- `-c, --changes` - Report only when a change is made
- `-v, --verbose` - Output a diagnostic for every file processed
- `-f, --silent, --quiet` - Suppress most error messages
- `--preserve-root` - Fail to operate recursively on '/'
- `--no-preserve-root` - Treat '/' specially (default)

## Usage Examples

### Basic Owner Changes
```bash
# Change owner of a file
chown john file.txt

# Change owner and group
chown john:developers file.txt

# Change only group (keep owner)
chown :developers file.txt

# Change multiple files
chown john *.txt
```

### Numeric UID/GID
```bash
# Change owner using numeric user ID
chown 1001 file.txt

# Change owner and group using numeric IDs
chown 1001:1002 file.txt

# Change only group using numeric GID
chown :1002 file.txt
```

### Recursive Operations
```bash
# Change ownership of directory and all contents
chown -R john:developers /home/john/projects/

# Verbose recursive operation
chown -Rv www-data:www-data /var/www/html/

# Change only files owned by specific user
chown -R --from=root www-data:www-data /var/www/
```

### Reference Operations
```bash
# Copy ownership from reference file
chown --reference=template.txt new_file.txt

# Apply ownership to multiple files
find . -name "*.conf" -exec chown --reference=apache.conf {} \;
```

## Ownership Patterns

### Common Ownership Scenarios
```bash
# Web server files
chown -R www-data:www-data /var/www/html

# User home directory
chown -R username:username /home/username

# Shared project directory
chown -R john:developers /projects/shared

# Log files
chown root:adm /var/log/syslog
chown syslog:adm /var/log/auth.log
```

### System Configuration
```bash
# SSH configuration
chown root:root /etc/ssh/sshd_config
chown root:ssh /etc/ssh/ssh_host_*

# Database files
chown mysql:mysql /var/lib/mysql/
chown postgres:postgres /var/lib/postgresql/

# Mail system
chown postfix:postfix /var/spool/postfix/
chown dovecot:mail /var/mail/
```

### Application Files
```bash
# Node.js application
chown -R node:node /opt/myapp/

# Python application
chown -R appuser:appgroup /usr/local/myapp/

# Container applications
chown -R 1000:1000 /app/data/
```

## Advanced Usage

### Conditional Ownership Changes
```bash
# Change ownership only if current owner matches
chown --from=olduser newuser file.txt

# Change only if both user and group match
chown --from=olduser:oldgroup newuser:newgroup file.txt

# Change only group if user matches
chown --from=currentuser :newgroup file.txt
```

### Complex Recursive Operations
```bash
# Change owner but preserve group
find /path -type f -exec chown newuser {} +

# Change group but preserve owner
find /path -type d -exec chown :newgroup {} +

# Different owners for files and directories
find /path -type f -exec chown user:group {} +
find /path -type d -exec chown user:group {} +
```

### Scripting Examples
```bash
#!/bin/bash
# fix_ownership.sh - Fix file ownership for web content

WEB_ROOT="/var/www/html"
WEB_USER="www-data"
WEB_GROUP="www-data"

# Change ownership of web files
if [ -d "$WEB_ROOT" ]; then
    echo "Fixing ownership of $WEB_ROOT"
    chown -R $WEB_USER:$WEB_GROUP "$WEB_ROOT"
    echo "Ownership fixed"
else
    echo "Web root directory not found: $WEB_ROOT"
    exit 1
fi
```

```bash
#!/bin/bash
# user_files_setup.sh - Set up user file ownership

USERNAME=$1
if [ -z "$USERNAME" ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Set up home directory ownership
chown -R $USERNAME:$USERNAME /home/$USERNAME

# Set up mail spool
chown $USERNAME:mail /var/mail/$USERNAME

# Set up temporary files
chown -R $USERNAME:$USERNAME /tmp/$USERNAME-*

echo "Ownership set up for user $USERNAME"
```

## User and Group Management

### Working with Users
```bash
# Find files owned by specific user
find / -user username 2>/dev/null

# Count files owned by user
find /home/username -user username | wc -l

# Change ownership of user's entire directory
chown -R username:username /home/username

# Fix ownership for sudo operations
sudo chown -R username:username /home/username/.config/
```

### Working with Groups
```bash
# Change group membership for files
find /projects/team -type f -exec chown :team {} +

# Set group sticky bit for shared directories
chown -R user:team /shared/project
chmod g+s /shared/project

# Verify group ownership
ls -l /shared/project
```

## Troubleshooting

### Common Issues
```bash
# Permission denied
chown: changing ownership of 'file': Operation not permitted
# Solution: Use sudo or check if you're the current owner

# Invalid user/group
chown: invalid user: 'nonexistent'
# Solution: Check if user/group exists

# Cannot change owner of symlink
chown: cannot dereference 'symlink': Permission denied
# Solution: Use -h to change symlink itself instead of target
```

### Verification
```bash
# Check current ownership
ls -l filename
stat -c "%U:%G %n" filename

# Verify ownership changes
find /path -user newuser -ls

# Check for files with incorrect ownership
find /var/www ! -user www-data -ls
```

## Security Considerations

### Sensitive Files
```bash
# Secure SSH keys
chown $USER:$USER ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Configuration files
chown root:root /etc/crontab
chown root:shadow /etc/shadow

# System binaries
chown root:root /usr/bin/sudo
chmod 4755 /usr/bin/sudo  # Set SUID bit
```

### Shared Directories
```bash
# Create shared directory with proper permissions
mkdir /shared/team
chown root:team /shared/team
chmod 2775 /shared/team  # Set SGID bit

# Files in shared directory inherit group
chown -R user:team /shared/team/project
```

## Performance Considerations

### Large Directories
```bash
# Use find for better performance on large directory trees
find /large/directory -user olduser -exec chown newuser {} +

# Limit scope of recursive operations
chown -R user:group /specific/subdirectory

# Process in chunks if very large
find /path -type f -print0 | xargs -0 -n 1000 chown user:group
```

## Related Commands

- [`chgrp`](/docs/commands/file-management/chgrp) - Change group ownership
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`useradd`](/docs/commands/system-management/useradd) - Create new user
- [`usermod`](/docs/commands/system-management/usermod) - Modify user account
- [`groupadd`](/docs/commands/system-management/groupadd) - Create new group

## Best Practices

1. **Always use sudo** when changing ownership of system files:
   - `sudo chown root:root /etc/important_file`

2. **Be careful with recursive operations**:
   - Test on small directories first
   - Use `-v` (verbose) to see what's being changed

3. **Use reference files** for consistency:
   - `chown --reference=template newfile`

4. **Verify ownership changes**:
   - `ls -l` or `stat -c "%U:%G" filename`

5. **Consider both user and group**:
   - Often need to change both: `chown user:group file`

6. **Use appropriate ownership** for security:
   - System files: `root:root`
   - Web content: `www-data:www-data`
   - User files: `user:user`

The `chown` command is essential for proper file management and security in Linux. Understanding how to change ownership both individually and recursively, along with the interaction with groups, is crucial for effective system administration.