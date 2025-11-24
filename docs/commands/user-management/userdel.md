---
title: userdel - Delete User Account
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# userdel - Delete User Account

The `userdel` command deletes user accounts from the Linux system. It removes user entries from system files and can optionally delete the user's home directory and mail spool. This command is essential for user lifecycle management and system cleanup.

## Basic Syntax

```bash
userdel [options] username
```

## Common Options

- `-r, --remove` - Remove user's home directory and mail spool
- `-f, --force` - Force deletion of user account, even if user is currently logged in
- `-Z, --selinux-user` - Remove SELinux user mapping for this user

## Usage Examples

### Basic User Deletion
```bash
# Delete user account only (keeps files)
userdel john

# Delete user account and home directory
userdel -r john

# Force delete user (even if logged in)
userdel -f john

# Force delete user with home directory
userdel -rf john
```

### Safe User Deletion Workflow
```bash
#!/bin/bash
# Safe user deletion with backup

username="formeruser"
backup_dir="/backups/deleted_users/$(date +%Y%m%d)"

# Check if user exists
if ! id "$username" &>/dev/null; then
    echo "User $username does not exist"
    exit 1
fi

# Create backup directory
mkdir -p "$backup_dir"

# Backup user information
getent passwd "$username" > "$backup_dir/$username.passwd"
getent shadow "$username" > "$backup_dir/$username.shadow" 2>/dev/null
getent group "$username" > "$backup_dir/$username.group"

# Backup home directory if it exists
user_home=$(getent passwd "$username" | cut -d: -f6)
if [[ -d "$user_home" ]]; then
    echo "Backing up home directory: $user_home"
    cp -a "$user_home" "$backup_dir/$username.home"
fi

# Check if user is logged in
if who | grep -q "^$username "; then
    echo "WARNING: User $username is currently logged in"
    read -p "Continue with deletion? (y/N): " confirm
    [[ "$confirm" != "y" ]] && exit 1
fi

# Delete user and home directory
userdel -r "$username"

echo "User $username deleted. Backup saved in $backup_dir"
```

## Advanced User Deletion

### Controlled User Deletion
```bash
#!/bin/bash
# Controlled user deletion with checks

username="$1"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Validate username
if ! id "$username" &>/dev/null; then
    echo "Error: User $username does not exist"
    exit 1
fi

# Prevent deletion of critical users
critical_users=("root" "nobody" "daemon" "bin" "sys")
if [[ " ${critical_users[*]} " =~ " $username " ]]; then
    echo "Error: Cannot delete critical user: $username"
    exit 1
fi

# Display user information
echo "=== User Information ==="
echo "Username: $username"
echo "UID: $(id -u "$username")"
echo "Primary Group: $(id -gn "$username")"
echo "Supplementary Groups: $(id -Gn "$username" | tr ' ' ',')"
echo "Home Directory: $(getent passwd "$username" | cut -d: -f6)"
echo "Shell: $(getent passwd "$username" | cut -d: -f7)"

# Check for running processes
echo "=== Running Processes ==="
processes=$(ps -u "$username" -o pid,comm --no-headers 2>/dev/null)
if [[ -n "$processes" ]]; then
    echo "Warning: User has running processes:"
    echo "$processes"
    read -p "Kill processes before deletion? (y/N): " kill_procs
    if [[ "$kill_procs" == "y" ]]; then
        pkill -u "$username"
        sleep 2
    fi
fi

# Check for logged in sessions
echo "=== Login Sessions ==="
who | grep "^$username " && echo "User is currently logged in"

# Confirm deletion
read -p "Delete user $username? (y/N): " confirm
if [[ "$confirm" != "y" ]]; then
    echo "Deletion cancelled"
    exit 0
fi

# Perform deletion
if userdel -r "$username"; then
    echo "User $username deleted successfully"
else
    echo "Error deleting user $username"
    exit 1
fi
```

### User Cleanup Script
```bash
#!/bin/bash
# Clean up multiple users with specific criteria

# Delete users who haven't logged in for 90 days
inactive_days="90"
current_date=$(date +%s)

echo "=== User Cleanup Report ==="
echo "Finding users inactive for more than $inactive_days days"

# Process each user
while IFS=: read -r username _ uid _ _ _ _ shell; do
    # Skip system users and nologin shells
    [[ "$uid" -lt 1000 ]] && continue
    [[ "$shell" =~ (nologin|false)$ ]] && continue
    [[ "$username" =~ ^(root|nobody) ]] && continue

    # Get last login info
    last_login=$(lastlog -u "$username" 2>/dev/null | tail -1 | awk '{print $NF}')

    if [[ "$last_login" == "**Never"** ]]; then
        echo "User $username has never logged in"
        read -p "Delete this user? (y/N): " delete_never
        [[ "$delete_never" == "y" ]] && userdel -r "$username"
    else
        # Calculate days since last login
        if login_date=$(date -d "$last_login" +%s 2>/dev/null); then
            days_inactive=$(( (current_date - login_date) / 86400 ))
            if [[ $days_inactive -gt $inactive_days ]]; then
                echo "User $username inactive for $days_inactive days"
                read -p "Delete this user? (y/N): " delete_inactive
                [[ "$delete_inactive" == "y" ]] && userdel -r "$username"
            fi
        fi
    fi
done < /etc/passwd

echo "User cleanup completed"
```

## Service Account Removal

### Clean Service Account Removal
```bash
#!/bin/bash
# Remove service account safely

username="$1"
service_home="$2"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username> [service_home_directory]"
    exit 1
fi

# Verify it's a service account
user_shell=$(getent passwd "$username" | cut -d: -f7)
if [[ ! "$user_shell" =~ (nologin|false) ]]; then
    echo "Warning: User $username does not appear to be a service account"
    read -p "Continue anyway? (y/N): " continue_anyway
    [[ "$continue_anyway" != "y" ]] && exit 1
fi

# Stop any running services
echo "Checking for running processes..."
if ps -u "$username" &>/dev/null; then
    echo "Stopping processes for user $username"
    pkill -u "$username" || true
    sleep 2
fi

# Remove cron jobs
echo "Removing cron jobs..."
crontab -u "$username" -r 2>/dev/null || true

# Remove from sudoers if present
if grep -q "^$username " /etc/sudoers 2>/dev/null; then
    echo "Removing from sudoers..."
    visudo -c -f /etc/sudoers.tmp
    grep -v "^$username " /etc/sudoers > /etc/sudoers.tmp
    mv /etc/sudoers.tmp /etc/sudoers
    visudo -c
fi

# Backup and remove service files
if [[ -n "$service_home" && -d "$service_home" ]]; then
    backup_location="/backups/service_accounts/${username}_$(date +%Y%m%d)"
    mkdir -p "$(dirname "$backup_location")"
    cp -a "$service_home" "$backup_location"
    echo "Service files backed up to $backup_location"

    # Remove service files
    rm -rf "$service_home"
    echo "Removed service directory: $service_home"
fi

# Delete user
userdel -r "$username"

echo "Service account $username removed successfully"
```

## Emergency User Deletion

### Emergency Cleanup
```bash
#!/bin/bash
# Emergency user deletion for compromised accounts

username="$1"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <compromised_username>"
    exit 1
fi

echo "!!! EMERGENCY USER DELETION !!!"
echo "This will immediately delete user: $username"
echo "This action cannot be undone!"
read -p "Type 'DELETE' to confirm: " confirm

if [[ "$confirm" != "DELETE" ]]; then
    echo "Deletion cancelled"
    exit 1
fi

# Immediately lock account
usermod -L "$username"

# Kill all processes immediately
pkill -9 -u "$username"

# Force delete user and files
userdel -rf "$username"

echo "Emergency deletion completed for user: $username"
```

## User Deletion Validation

### Verify User Deletion
```bash
#!/bin/bash
# Verify user was completely removed

username="$1"

if [[ -z "$username" ]]; then
    echo "Usage: $0 <username>"
    exit 1
fi

echo "=== Verification Report for $username ==="

# Check system files
echo "Checking system files..."

# /etc/passwd
if grep -q "^$username:" /etc/passwd; then
    echo "WARNING: User still exists in /etc/passwd"
else
    echo "✓ User removed from /etc/passwd"
fi

# /etc/shadow
if grep -q "^$username:" /etc/shadow 2>/dev/null; then
    echo "WARNING: User still exists in /etc/shadow"
else
    echo "✓ User removed from /etc/shadow"
fi

# /etc/group
if grep -q "^$username:" /etc/group; then
    echo "WARNING: User group still exists in /etc/group"
else
    echo "✓ User group removed from /etc/group"
fi

# Check for orphaned files
echo "Checking for orphaned files..."
orphaned_files=$(find / -user "$username" 2>/dev/null | head -10)
if [[ -n "$orphaned_files" ]]; then
    echo "WARNING: Found files still owned by $username:"
    echo "$orphaned_files"
else
    echo "✓ No orphaned files found"
fi

# Check processes
echo "Checking for running processes..."
if ps -u "$username" &>/dev/null; then
    echo "WARNING: Found running processes for $username"
else
    echo "✓ No running processes found"
fi

# Check home directory
user_home="/home/$username"
if [[ -d "$user_home" ]]; then
    echo "WARNING: Home directory still exists: $user_home"
else
    echo "✓ Home directory removed"
fi

# Check mail spool
mail_spool="/var/mail/$username"
if [[ -f "$mail_spool" ]]; then
    echo "WARNING: Mail spool still exists: $mail_spool"
else
    echo "✓ Mail spool removed"
fi

echo "Verification completed"
```

## User Deletion Best Practices

### Pre-Deletion Checklist
```bash
#!/bin/bash
# Pre-deletion checklist for user accounts

username="$1"

echo "=== Pre-Deletion Checklist for $username ==="

# 1. Verify user exists
if ! id "$username" &>/dev/null; then
    echo "❌ User does not exist"
    exit 1
else
    echo "✅ User exists"
fi

# 2. Check if user is logged in
if who | grep -q "^$username "; then
    echo "⚠️  User is currently logged in"
else
    echo "✅ User is not logged in"
fi

# 3. Check for running processes
if ps -u "$username" &>/dev/null; then
    echo "⚠️  User has running processes"
    ps -u "$username" -o pid,comm
else
    echo "✅ No running processes"
fi

# 4. Check home directory size
user_home=$(getent passwd "$username" | cut -d: -f6)
if [[ -d "$user_home" ]]; then
    size=$(du -sh "$user_home" 2>/dev/null | cut -f1)
    echo "📁 Home directory: $user_home (Size: $size)"
else
    echo "📁 No home directory found"
fi

# 5. Check mail spool
if [[ -f "/var/mail/$username" ]]; then
    mail_size=$(du -sh "/var/mail/$username" 2>/dev/null | cut -f1)
    echo "📧 Mail spool exists (Size: $mail_size)"
else
    echo "📧 No mail spool"
fi

# 6. Check group memberships
groups=$(id -Gn "$username" 2>/dev/null)
echo "👥 Groups: $groups"

# 7. Check sudo access
if sudo -l -U "$username" 2>/dev/null | grep -q "(root)"; then
    echo "🔒 User has sudo access"
else
    echo "🔒 No sudo access detected"
fi

# 8. Check cron jobs
if crontab -u "$username" -l 2>/dev/null | grep -q .; then
    echo "⏰ User has cron jobs"
else
    echo "⏰ No cron jobs"
fi

echo "=== End Checklist ==="
```

## Recovery and Restoration

### Emergency User Restoration
```bash
#!/bin/bash
# Restore user from backup (emergency use only)

username="$1"
backup_dir="$2"

if [[ -z "$username" || -z "$backup_dir" ]]; then
    echo "Usage: $0 <username> <backup_directory>"
    exit 1
fi

echo "⚠️  WARNING: This is for emergency restoration only"
read -p "Continue with user restoration? (y/N): " confirm
[[ "$confirm" != "y" ]] && exit 1

# Restore passwd entry
if [[ -f "$backup_dir/$username.passwd" ]]; then
    echo "Restoring passwd entry..."
    passwd_entry=$(cat "$backup_dir/$username.passwd")

    # Check if username already exists
    if ! id "$username" &>/dev/null; then
        echo "$passwd_entry" >> /etc/passwd
        echo "✓ Passwd entry restored"
    else
        echo "❌ User $username already exists"
        exit 1
    fi
fi

# Restore shadow entry
if [[ -f "$backup_dir/$username.shadow" ]]; then
    echo "Restoring shadow entry..."
    shadow_entry=$(cat "$backup_dir/$username.shadow")
    echo "$shadow_entry" >> /etc/shadow
    echo "✓ Shadow entry restored"
fi

# Restore home directory
if [[ -d "$backup_dir/$username.home" ]]; then
    echo "Restoring home directory..."
    home_location=$(getent passwd "$username" | cut -d: -f6)
    if [[ -n "$home_location" ]]; then
        cp -a "$backup_dir/$username.home" "$home_location"
        chown -R "$username:$(id -gn $username)" "$home_location"
        echo "✓ Home directory restored"
    fi
fi

echo "User restoration completed"
```

## Best Practices

1. **Always backup** user data before deletion
2. **Verify no important processes** are running
3. **Check for system dependencies** on the user account
4. **Use `-r` option** for complete cleanup when appropriate
5. **Test deletions** in development environment first
6. **Document deletion reasons** for audit trails
7. **Consider account locking** instead of deletion for temporary situations
8. **Review group memberships** before deletion
9. **Check for cron jobs and scheduled tasks**
10. **Verify deletion** using the validation script

## Safety Considerations

### Never Delete These Users
```bash
# Critical system users - NEVER delete:
# root, daemon, bin, sys, sync, games, man, lp, mail, news, uucp
# proxy, www-data, backup, list, irc, gnats, nobody, systemd-network
# systemd-resolve, syslog, messagebus, uuidd, dnsmasq, usbmux
# rtkit, pulse, speech-dispatcher, avahi, saned, colord
# hplip, geoclue, gnome-initial-setup, gdm
```

### Warning Signs
- User owns system files outside their home directory
- User has running critical processes
- User is referenced in system configuration files
- User has sudo or administrative privileges
- User owns important application data

## Related Commands

- [`useradd`](/docs/commands/user-permissions/useradd) - Create new user account
- [`usermod`](/docs/commands/user-permissions/usermod) - Modify user account
- [`passwd`](/docs/commands/user-permissions/passwd) - Change user password
- [`id`](/docs/commands/user-permissions/id) - Display user information
- [`find`](/docs/commands/file-management/find) - Find files owned by user
- [`ps`](/docs/commands/process-management/ps) - Check running processes
- [`who`](/docs/commands/system-info/who) - Check login status

The `userdel` command is a powerful tool for user account management, but should be used with caution due to its irreversible nature. Always ensure proper backups and verification before deletion.