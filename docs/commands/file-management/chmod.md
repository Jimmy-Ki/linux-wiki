---
title: chmod - Change File Permissions
sidebar_label: chmod
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chmod - Change File Permissions

The `chmod` (change mode) command changes the access permissions of files and directories. It controls who can read, write, and execute files, which is fundamental to Linux security and file management.

## Basic Syntax

```bash
chmod [OPTIONS] MODE[,MODE]... FILE...
chmod [OPTIONS] OCTAL-MODE FILE...
chmod [OPTIONS] --reference=RFILE FILE...
```

## Common Options

### Recursive Options
- `-R, --recursive` - Change files and directories recursively
- `-c, --changes` - Report only when a change is made
- `-v, --verbose` - Output a diagnostic for every file processed

### Behavior Options
- `-f, --silent, --quiet` - Suppress most error messages
- `--reference=RFILE` - Use RFILE's mode instead of MODE values
- `--preserve-root` - Fail to operate recursively on '/'
- `--no-preserve-root` - Treat '/' specially (default)

### Legacy Options
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Permission System

### Octal Notation (Numeric Mode)
```
0 = ---  (no permission)
1 = --x  (execute only)
2 = -w-  (write only)
3 = -wx  (write and execute)
4 = r--  (read only)
5 = r-x  (read and execute)
6 = rw-  (read and write)
7 = rwx  (read, write, and execute)
```

### Permission Structure
```
Position:  Owner  Group  Others
Values:    rwx    rwx    rwx
Octal:     421    421    421
```

### Symbolic Notation (Character Mode)
- **Who**: `u` (user/owner), `g` (group), `o` (others), `a` (all)
- **Operation**: `+` (add), `-` (remove), `=` (set exactly)
- **Permissions**: `r` (read), `w` (write), `x` (execute), `X` (execute only if file is directory or already executable)

## Usage Examples

### Basic Octal Mode
```bash
# Give read, write, execute to owner only
chmod 700 private_file

# Give read/write to owner, read to group and others
chmod 644 public_file.txt

# Give full permissions to everyone (not recommended)
chmod 777 shared_file

# Give read/write to owner and group, no access to others
chmod 660 team_file.txt
```

### Basic Symbolic Mode
```bash
# Add execute permission for owner
chmod u+x script.sh

# Remove write permission from group
chmod g-w file.txt

# Add read permission for others
chmod o+r public_file

# Add execute permission for all
chmod a+x script.sh
```

### Multiple Permissions
```bash
# Remove write from group and others
chmod go-w important_file

# Set exact permissions (remove all others)
chmod u=rwx,go=rx script.sh

# Add read and write for owner, read for group
chmod u+rw,g+r document.txt

# Remove execute from all, add read for all
chmod a-xr+r regular_file
```

### Directory Permissions
```bash
# Give full access to directory and its contents
chmod -R 755 /path/to/directory

# Make directory accessible to web server
chmod -R 755 /var/www/html

# Remove execute from files but keep it for directories
chmod -R a-x /path && chmod -R a+X /path
```

## Permission Examples

### Common Permission Sets
```bash
# Regular file (644)
chmod 644 document.txt
# Equivalent to: chmod u=rw,go=r document.txt

# Executable script (755)
chmod 755 script.sh
# Equivalent to: chmod u=rwx,go=rx script.sh

# Private file (600)
chmod 600 private_key
# Equivalent to: chmod u=rw,go= private_key

# Shared file (664)
chmod 664 team_document
# Equivalent to: chmod u=rw,g=rw,o=r team_document

# Directory with group write access (775)
chmod 775 shared_dir
# Equivalent to: chmod u=rwx,g=rwx,o=rx shared_dir
```

### Web Server Permissions
```bash
# Standard web permissions
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

# Files that need to be writable by web server
chmod 664 /var/www/html/config.php
chmod 775 /var/www/html/uploads/

# Secure directory (no web access)
chmod 700 /var/www/html/private/
```

### Development Environment
```bash
# Make scripts executable
chmod +x *.sh
chmod +x deploy.sh

# Configuration files
chmod 600 config/database.yml
chmod 644 config/application.yml

# Log files
chmod 644 log/production.log
chmod 755 log/  # Directory must be executable
```

## Advanced Usage

### Special Permissions
```bash
# Set SUID (Set User ID) - executable runs as file owner
chmod 4755 program
chmod u+s program

# Set SGID (Set Group ID) - files inherit directory's group
chmod 2755 directory
chmod g+s directory

# Sticky bit - only file owner can delete files in directory
chmod 1777 /tmp
chmod o+t /shared/directory

# Full special permissions (SUID + SGID + sticky)
chmod 7777 special_file
```

### Reference Mode
```bash
# Copy permissions from one file to another
chmod --reference=template.txt new_file.txt

# Apply same permissions to multiple files
find . -name "*.conf" -exec chmod --reference=apache.conf {} \;
```

### Conditional Operations
```bash
# Make all scripts executable
find . -name "*.sh" -exec chmod +x {} \;

# Secure all .key files
find /home -name "*.key" -exec chmod 600 {} \;

# Set proper permissions for web content
find /var/www -type f -exec chmod 644 {} \;
find /var/www -type d -exec chmod 755 {} \;
```

## Practical Scenarios

### Security Hardening
```bash
# Secure sensitive configuration files
chmod 600 /etc/ssh/sshd_config
chmod 600 /etc/my.cnf
chmod 644 /etc/hosts

# Secure user home directories
chmod 750 /home/username
chmod 700 /home/username/.ssh
chmod 600 /home/username/.ssh/authorized_keys

# Secure log files
chmod 640 /var/log/auth.log
chmod 640 /var/log/syslog
```

### Team Collaboration
```bash
# Shared project directory
mkdir /home/shared/project
chmod 2775 /home/shared/project
# New files will inherit group ownership

# Set default permissions for new files (umask)
umask 002  # New files will be 664, directories 775
```

### Backup and Restore
```bash
# Save current permissions
getfacl -R /path/to/backup > permissions.acl

# Restore permissions
setfacl --restore=permissions.acl

# Alternative: create backup script
#!/bin/bash
find /important/path -exec stat -c "%a %n" {} \; > permissions.txt
```

## Scripting Examples

### Batch Permission Changes
```bash
#!/bin/bash
# fix_web_permissions.sh

if [ ! -d "$1" ]; then
    echo "Usage: $0 <web_directory>"
    exit 1
fi

find "$1" -type d -exec chmod 755 {} \;
find "$1" -type f -exec chmod 644 {} \;

echo "Fixed permissions for $1"
```

### Security Script
```bash
#!/bin/bash
# secure_files.sh - Secure sensitive files

SENSITIVE_FILES=(
    "/etc/passwd"
    "/etc/shadow"
    "/etc/ssh/sshd_config"
    "$HOME/.bashrc"
)

for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Securing $file"
        chmod 600 "$file"
    fi
done
```

### Development Setup
```bash
#!/bin/bash
# setup_dev_permissions.sh

# Make all scripts executable
find . -name "*.sh" -exec chmod +x {} \;

# Secure configuration files
find . -name "*.conf" -exec chmod 600 {} \;

# Set proper permissions for logs
touch app.log
chmod 644 app.log

echo "Development permissions set"
```

## Troubleshooting

### Common Issues
```bash
# Permission denied errors
chmod: changing permissions of 'file': Permission denied
# Solution: Use sudo or check ownership

# Directory not accessible
ls: cannot open directory 'dir': Permission denied
# Solution: Ensure execute permission on directory

# Scripts not executable
./script.sh: Permission denied
# Solution: Add execute permission: chmod +x script.sh
```

### Verification
```bash
# Check current permissions
ls -l filename
stat -c "%A %n" filename

# Verify symbolic vs octal mode
stat -c "%a %A %n" filename

# Test if file is executable
test -x file && echo "Executable" || echo "Not executable"
```

## Related Commands

- [`chown`](/docs/commands/file-management/chown) - Change file ownership
- [`chgrp`](/docs/commands/file-management/chgrp) - Change group ownership
- [`ls`](/docs/commands/file-management/ls) - List directory contents and permissions
- [`umask`](/docs/commands/file-management/umask) - Set default file creation mask
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Use principle of least privilege**:
   - Grant only necessary permissions
   - Start with restrictive permissions, add only what's needed

2. **Be careful with recursive operations**:
   - Always check what will be affected: `chmod -R --verbose 755 directory`
   - Test on a small subset first

3. **Use symbolic notation for clarity**:
   - `chmod go-w file` is clearer than `chmod 644 file`

4. **Secure sensitive files**:
   - Use `chmod 600` for private keys and configuration files
   - Use `chmod 644` for public files

5. **Set proper directory permissions**:
   - Directories need execute permission to be accessible
   - Use `755` for most directories, `700` for private directories

6. **Regularly audit permissions**:
   - `find / -perm -4000` to find SUID files
   - `find / -perm -2000` to find SGID files

The `chmod` command is fundamental to Linux security and file management. Understanding both octal and symbolic notation, along with common permission patterns, is essential for effective system administration and maintaining proper security on Linux systems.