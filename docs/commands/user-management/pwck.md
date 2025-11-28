---
title: pwck - Verify integrity of password files
sidebar_label: pwck
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pwck - Verify integrity of password files

The `pwck` command is a system administration tool that verifies the integrity of password files in Linux/Unix systems. It checks the `/etc/passwd` and `/etc/shadow` files for consistency, proper formatting, and potential security issues. The command validates each user entry, ensuring that fields are correctly formatted, required information is present, and there are no duplicate usernames or user IDs. pwck is essential for maintaining system security and user account consistency.

## Basic Syntax

```bash
pwck [OPTIONS] [passwd_file] [shadow_file]
```

## Common Options

### File Options
- `-r, --read-only` - Perform read-only checks without making changes
- `-q, --quiet` - Report only errors, suppress normal output
- `-s, --sort` - Sort entries by user ID

### Output Options
- `-V, --verbose` - Display detailed information about checks
- `-h, --help` - Display help message
- `-R, --root CHROOT_DIR` - Apply checks in a chrooted directory

### Shadow File Options
- No specific shadow file options - uses `/etc/shadow` by default

## Usage Examples

### Basic Verification

#### Standard Password File Checks
```bash
# Check default password files
sudo pwck

# Check with verbose output
sudo pwck -V

# Check specific password file
sudo pwck /custom/passwd

# Check both password and shadow files
sudo pwck /etc/passwd /etc/shadow

# Read-only mode (no corrections)
sudo pwck -r
```

#### Quiet Mode for Scripts
```bash
# Check silently, only report errors
sudo pwck -q

# Use in automated scripts
if sudo pwck -q; then
    echo "Password files are valid"
else
    echo "Password file errors detected"
fi
```

### Advanced File Operations

#### Working with Custom Files
```bash
# Check backup password files
sudo pwck /backup/passwd /backup/shadow

# Check files from different system
sudo pwck /mnt/system/etc/passwd /mnt/system/etc/shadow

# Sort entries by UID during check
sudo pwck -s /etc/passwd
```

#### Chroot Environment Checks
```bash
# Check in chroot environment
sudo pwck -R /chroot/directory

# Check system after installation
sudo pwck -R /mnt/new-system
```

### System Maintenance

#### Routine System Checks
```bash
# Weekly system integrity check
sudo pwck -V && echo "Password files verified"

# Check before major system updates
sudo pwck -q || echo "Fix password files before update"

# System health check script
#!/bin/bash
echo "Checking system password files..."
if sudo pwck -q; then
    echo "✓ Password files are healthy"
else
    echo "✗ Password file issues found"
    exit 1
fi
```

#### Security Auditing
```bash
# Detailed security check
sudo pwck -V | grep -i "error\|warning\|invalid"

# Check for duplicate UIDs
sudo pwck -V | grep "duplicate"

# Verify all users have valid shells
sudo pwck -V | grep -E "(no shell|invalid shell)"
```

### Troubleshooting and Recovery

#### Identifying Issues
```bash
# Check specific file for issues
sudo pwck -V /etc/passwd | less

# Find problematic entries
sudo pwck -V 2>&1 | grep -E "(line|user|UID)"

# Check for formatting issues
sudo pwck -V | grep -E "(format|field)"
```

#### File Recovery
```bash
# Verify backup before restore
sudo pwck /backup/passwd /backup/shadow

# Check files after manual editing
sudo nano /etc/passwd
sudo pwck -V

# Validate NIS/LDAP password files
sudo pwck /etc/passwd.nis
```

## Practical Examples

### System Administration

#### New User Account Validation
```bash
# After adding new users manually
sudo useradd -m newuser
sudo passwd newuser
sudo pwck -V

# Batch user account verification
#!/bin/bash
for user in $(cat new_users.txt); do
    echo "Checking user: $user"
    sudo useradd -m $user
done
sudo pwck -V

# Verify system after user import
sudo newusers < batch_users.txt
sudo pwck -V
```

#### Migration and Backup
```bash
# Check files before migration
sudo pwck -V
sudo cp /etc/passwd /backup/passwd.$(date +%Y%m%d)
sudo cp /etc/shadow /backup/shadow.$(date +%Y%m%d)

# Verify backup integrity
sudo pwck /backup/passwd.$(date +%Y%m%d) /backup/shadow.$(date +%Y%m%d)

# Check after system restoration
sudo pwck /etc/passwd.restore /etc/shadow.restore
sudo mv /etc/passwd.restore /etc/passwd
```

#### Security Hardening
```bash
# System security audit
sudo pwck -V | grep -E "(no password|locked|empty)"

# Check for system accounts with shells
sudo pwck -V | grep -E "(bin|daemon|nobody|mail)"

# Verify password file permissions
ls -la /etc/passwd /etc/shadow
sudo pwck -r
```

### Development and Testing

#### Testing Environment Setup
```bash
# Create test password file
cp /etc/passwd /tmp/test_passwd
sudo pwck /tmp/test_passwd

# Test with invalid data
echo "invalid:user:x:0:0::/root:" >> /tmp/test_passwd
sudo pwck /tmp/test_passwd

# Clean up test files
rm /tmp/test_passwd
```

#### Automated Testing
```bash
# Integration test script
#!/bin/bash
TEST_PASSWD="/tmp/test_passwd"
TEST_SHADOW="/tmp/test_shadow"

# Create test files
cp /etc/passwd $TEST_PASSWD
cp /etc/shadow $TEST_SHADOW

# Add test data
echo "testuser:x:1001:1001:Test User:/home/testuser:/bin/bash" >> $TEST_PASSWD

# Verify test files
if sudo pwck -q $TEST_PASSWD $TEST_SHADOW; then
    echo "Test files are valid"
else
    echo "Test files have issues"
fi

# Cleanup
rm $TEST_PASSWD $TEST_SHADOW
```

### Cross-platform Compatibility

#### Multi-system Checks
```bash
# Check different Unix systems
for dir in /mnt/systems/*/; do
    echo "Checking system: $dir"
    sudo pwck "$dir/etc/passwd" "$dir/etc/shadow"
done

# Verify NFS mounted systems
sudo pwck /net/fileserver/etc/passwd /net/fileserver/etc/shadow
```

#### Container Environments
```bash
# Check Docker container password files
docker exec container_name pwck -V

# Check before container deployment
sudo pwck /container/rootfs/etc/passwd /container/rootfs/etc/shadow
```

## Advanced Usage

### Performance and Optimization

#### Large System Optimization
```bash
# Quick check on large systems
sudo pwck -q

# Parallel processing for multiple files
for file in /etc/passwd.*; do
    sudo pwck -q "$file" &
done
wait

# Batch processing with logging
sudo pwck -V > /var/log/pwck_check_$(date +%Y%m%d).log 2>&1
```

#### Scheduled Maintenance
```bash
# Daily cron job
# /etc/cron.daily/pwck-check
#!/bin/bash
sudo pwck -q > /var/log/pwck_daily.log 2>&1
if [ $? -ne 0 ]; then
    mail -s "Password File Issues" admin@example.com < /var/log/pwck_daily.log
fi

# Weekly detailed check
# /etc/cron.weekly/pwck-detailed
#!/bin/bash
sudo pwck -V > /var/log/pwck_weekly_$(date +%Y%m%d).log 2>&1
```

### Integration and Automation

#### Monitoring and Alerting
```bash
# Monitoring script
#!/bin/bash
LOG_FILE="/var/log/pwck_monitor.log"
DATE=$(date)

echo "[$DATE] Starting password file check" >> $LOG_FILE

if sudo pwck -q; then
    echo "[$DATE] Password files: OK" >> $LOG_FILE
else
    echo "[$DATE] Password files: ERROR" >> $LOG_FILE
    # Send alert
    echo "Password file issues detected on $(hostname)" | \
        mail -s "PWCK Alert" admin@example.com
fi
```

#### Backup and Recovery Scripts
```bash
# Comprehensive backup script
#!/bin/bash
BACKUP_DIR="/backup/system/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup password files
sudo cp /etc/passwd $BACKUP_DIR/passwd
sudo cp /etc/shadow $BACKUP_DIR/shadow

# Verify backup
if sudo pwck -q $BACKUP_DIR/passwd $BACKUP_DIR/shadow; then
    echo "Password files backed up and verified"
else
    echo "Backup verification failed!"
    exit 1
fi
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied errors
sudo pwck  # Use sudo for root privileges

# Check file permissions
ls -la /etc/passwd /etc/shadow

# Fix permissions if needed
sudo chmod 644 /etc/passwd
sudo chmod 600 /etc/shadow
```

#### File Format Issues
```bash
# Corrupted password file entries
sudo pwck -V | grep "line"

# Manual repair
sudo vipw  # Edit password file safely

# Verify after repair
sudo pwck -V
```

#### Missing Files
```bash
# Missing shadow file
sudo pwck /etc/passwd

# Create missing shadow file
sudo touch /etc/shadow
sudo chmod 600 /etc/shadow
sudo pwconv  # Convert to shadow passwords
```

### Recovery Procedures

#### File Corruption Recovery
```bash
# Restore from backup
sudo cp /backup/passwd.backup /etc/passwd
sudo cp /backup/shadow.backup /etc/shadow

# Verify restored files
sudo pwck -V

# Check system functionality
sudo getent passwd
```

#### Emergency Repairs
```bash
# Emergency password file reconstruction
sudo pwck -r > /tmp/pwck_errors.txt

# Rebuild from available sources
sudo pwconv  # Rebuild shadow file
sudo grpconv  # Rebuild group files

# Final verification
sudo pwck -V
```

## Related Commands

- [`passwd`](/docs/commands/user-management/passwd) - Change user passwords
- [`useradd`](/docs/commands/user-management/useradd) - Create new user accounts
- [`usermod`](/docs/commands/user-management/usermod) - Modify user accounts
- [`userdel`](/docs/commands/user-management/userdel) - Delete user accounts
- [`pwconv`](/docs/commands/user-management/pwconv) - Convert to shadow passwords
- [`pwunconv`](/docs/commands/user-management/pwunconv) - Convert from shadow passwords
- [`vipw`](/docs/commands/user-management/vipw) - Edit password file safely
- [`grpck`](/docs/commands/user-management/grpck) - Verify group file integrity
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`login`](/docs/commands/user-management/login) - User login utility

## Best Practices

1. **Run regularly** - Schedule periodic pwck checks as part of system maintenance
2. **Use sudo** - Always run pwck with appropriate privileges
3. **Backup first** - Create backups before making changes to password files
4. **Check after changes** - Verify password files after manual user account modifications
5. **Monitor output** - Pay attention to warnings and error messages
6. **Test backups** - Verify backup password files with pwck before restoration
7. **Use read-only mode** - Check without making changes when investigating issues
8. **Log results** - Keep records of pwck runs for audit purposes
9. **Check before updates** - Verify password files before system updates or migrations
10. **Combine with other checks** - Use pwck alongside grpck and other validation tools

## Performance Tips

1. **Use quiet mode** (-q) for faster checks in automated scripts
2. **Check specific files** rather than entire system when possible
3. **Schedule during low-usage periods** for large systems
4. **Use read-only mode** (-r) when just checking without repairs
5. **Limit verbose output** (-V) to specific troubleshooting scenarios
6. **Batch operations** when checking multiple systems
7. **Cache results** for monitoring systems that check frequently
8. **Parallel processing** when checking multiple backup files
9. **Selective checking** focus on specific problematic users when known
10. **Regular maintenance** prevents accumulation of issues

The `pwck` command is an essential system administration tool for maintaining password file integrity and security. Regular use helps prevent user account issues, maintains system security, and ensures proper authentication system functionality. Its comprehensive checking capabilities make it invaluable for system maintenance, security auditing, and troubleshooting user account problems.