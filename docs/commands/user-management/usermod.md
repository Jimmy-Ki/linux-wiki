---
title: usermod - Modify User Account
sidebar_label: usermod
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# usermod - Modify User Account

The `usermod` command modifies existing user account properties in Linux. It's a versatile tool for updating user information, changing home directories, managing group memberships, and modifying account settings without recreating the user.

## Basic Syntax

```bash
usermod [options] username
```

## Common Options

### User Information
- `-c, --comment COMMENT` - Change the user's comment field (GECOS)
- `-l, --login NEW_LOGIN` - Change the user's login name
- `-u, --uid UID` - Change the user's UID
- `-s, --shell SHELL` - Change the user's login shell

### Home Directory
- `-d, --home HOME_DIR` - Change the user's home directory
- `-m, --move-home` - Move the contents of the current home directory to the new location (used with `-d`)

### Group Management
- `-g, --gid GROUP` - Change the user's primary group
- `-G, --groups GROUPS` - Change the user's supplementary groups
- `-a, --append` - Append groups to the user's current supplementary groups (used with `-G`)

### Account Status
- `-L, --lock` - Lock the user account (disable login)
- `-U, --unlock` - Unlock the user account
- `-e, --expiredate DATE` - Set account expiration date (YYYY-MM-DD)
- `-f, --inactive DAYS` - Set password inactivity period

### System Options
- `-o, --non-unique` - Allow non-unique UIDs (when changing UID)
- `-Z, --selinux-user SEUSER` - Change the user's SELinux user mapping

## Usage Examples

### Basic User Information Changes
```bash
# Change user's full name/comment
usermod -c "John Smith" john

# Change user's login name
usermod -l jsmith john

# Change user's shell
usermod -s /bin/zsh john

# Change user's UID
usermod -u 1500 john
```

### Home Directory Management
```bash
# Change home directory path only (doesn't move files)
usermod -d /opt/users/john john

# Move home directory contents to new location
usermod -d /opt/users/john -m john

# Change home directory to a mounted filesystem
usermod -d /export/home/john -m john
```

### Group Membership Management
```bash
# Change primary group
usermod -g developers john

# Replace all supplementary groups
usermod -G developers,git,admin john

# Add user to additional groups (preserving existing groups)
usermod -aG docker,developers john

# Remove user from all supplementary groups
usermod -G "" john
```

### Account Locking and Management
```bash
# Lock user account
usermod -L john

# Unlock user account
usermod -U john

# Set account expiration date
usermod -e 2024-12-31 john

# Set password inactivity to 30 days
usermod -f 30 john

# Remove account expiration
usermod -e "" john
```

## Advanced User Modifications

### Comprehensive User Profile Update
```bash
#!/bin/bash
# Complete user profile update

username="developer"
new_username="senior_dev"
new_uid="2000"
new_home="/opt/developers/senior_dev"
new_shell="/bin/zsh"
new_comment="Senior Developer Account"
primary_group="devs"
supplementary_groups="git,docker,admin,developers"
expire_date="2025-12-31"

# Update user profile
usermod \
    -l "$new_username" \
    -u "$new_uid" \
    -d "$new_home" \
    -m \
    -s "$new_shell" \
    -c "$new_comment" \
    -g "$primary_group" \
    -G "$supplementary_groups" \
    -e "$expire_date" \
    "$username"

echo "Updated user profile: $username -> $new_username"
```

### User Promotion Script
```bash
#!/bin/bash
# Promote user to admin role

username="regularuser"
admin_groups="sudo,admin,wheel,developers"
new_shell="/bin/bash"
new_comment="System Administrator"

# Add to admin groups
usermod -aG "$admin_groups" "$username"

# Update shell and comment
usermod -s "$new_shell" -c "$new_comment" "$username"

# Ensure account doesn't expire
usermod -e "" "$username"

echo "Promoted $username to administrator role"
```

### Temporary User Access
```bash
#!/bin/bash
# Grant temporary access to user

username="contractor"
access_days="7"
temp_groups="developers,git"

# Add to required groups
usermod -aG "$temp_groups" "$username"

# Set account expiration
future_date=$(date -d "+$access_days days" +%Y-%m-%d)
usermod -e "$future_date" "$username"

# Set password inactivity
usermod -f 0 "$username"

echo "Granted $username access until $future_date"
```

## User Migration and Transfer

### User Migration Between Systems
```bash
#!/bin/bash
# Prepare user for system migration

username="appuser"
new_uid="3000"
new_gid="3000"

# Set specific UID/GID for consistent mapping
usermod -u "$new_uid" "$username"
groupmod -g "$new_gid" "$(id -gn $username)"

# Update home directory permissions
find /home/"$username" -user "$(id -u $username)-1" -exec chown "$new_uid:$new_gid" {} \;

echo "Prepared $username for migration with UID=$new_uid, GID=$new_gid"
```

### Bulk User Modifications
```bash
#!/bin/bash
# Bulk user shell changes

# Change shell for multiple users
users=("user1" "user2" "user3")
new_shell="/bin/bash"

for user in "${users[@]}"; do
    if id "$user" &>/dev/null; then
        usermod -s "$new_shell" "$user"
        echo "Changed shell for $user to $new_shell"
    else
        echo "User $user not found"
    fi
done
```

### Departmental User Group Management
```bash
#!/bin/bash
# Manage departmental user groups

engineering_users=("alice" "bob" "charlie")
design_users=("diana" "eve")
marketing_users=("frank" "grace")

# Engineering department
for user in "${engineering_users[@]}"; do
    usermod -G "engineering,git,docker" "$user"
done

# Design department
for user in "${design_users[@]}"; do
    usermod -G "design,creative" "$user"
done

# Marketing department
for user in "${marketing_users[@]}"; do
    usermod -G "marketing,analytics" "$user"
done
```

## Account Security Management

### User Account Locking Workflow
```bash
#!/bin/bash
# Secure user account lockdown

username="terminated_user"
lock_reason="Account terminated - $(date)"

# Lock the account
usermod -L "$username"

# Change shell to nologin
usermod -s /sbin/nologin "$username"

# Set account expiration to yesterday
yesterday=$(date -d "yesterday" +%Y-%m-%d)
usermod -e "$yesterday" "$username"

# Add comment about termination
usermod -c "$lock_reason" "$username"

echo "Locked account: $username - $lock_reason"
```

### Periodic User Access Review
```bash
#!/bin/bash
# Periodic access review and cleanup

inactive_threshold="90"  # days
current_date=$(date +%s)

# Find inactive users
while IFS=: read -r username _ _ _ _ _ _ shell; do
    # Skip system users and nologin shells
    [[ "$username" =~ ^(root|nobody|daemon) ]] && continue
    [[ "$shell" =~ (nologin|false)$ ]] && continue

    # Check last login
    last_login=$(lastlog -u "$username" | tail -1 | awk '{print $NF}')

    if [[ "$last_login" == "**Never"** ]]; then
        # Never logged in - consider for removal
        echo "User $username has never logged in"
    else
        # Check if inactive for too long
        login_date=$(date -d "$last_login" +%s 2>/dev/null)
        if [[ $login_date -gt 0 ]]; then
            days_inactive=$(( (current_date - login_date) / 86400 ))
            if [[ $days_inactive -gt $inactive_threshold ]]; then
                echo "User $username inactive for $days_inactive days"
                # Optionally lock account
                # usermod -L "$username"
            fi
        fi
    fi
done < /etc/passwd
```

## Troubleshooting and Validation

### Verification Scripts
```bash
#!/bin/bash
# Verify user modifications

username="testuser"

# Display current user information
echo "=== User Information ==="
id "$username"
getent passwd "$username"
getent group "$username"

# Show user's groups
echo "=== Group Membership ==="
groups "$username"

# Check account status
echo "=== Account Status ==="
passwd -S "$username"
chage -l "$username" 2>/dev/null

# Home directory information
echo "=== Home Directory ==="
echo "Home: $(getent passwd $username | cut -d: -f6)"
if [[ -d "$(getent passwd $username | cut -d: -f6)" ]]; then
    ls -la "$(getent passwd $username | cut -d: -f6)"
else
    echo "Home directory does not exist"
fi
```

### Common Issues and Solutions
```bash
# Issue: User is logged in and can't be modified
# Solution: Ensure user is not running processes
ps aux | grep username
# Kill user processes or wait for logout

# Issue: Home directory move fails due to permissions
# Solution: Check and fix permissions
sudo -u username ls -la /old/home
sudo chown -R username:username /old/home

# Issue: Group doesn't exist when changing primary group
# Solution: Create group first
groupadd newgroup
usermod -g newgroup username

# Issue: UID already in use
# Solution: Find available UID
awk -F: '($3>=1000 && $3<=60000) {max=$3} END {print max+1}' /etc/passwd

# Issue: Supplementary groups not properly updated
# Solution: Use -a flag to append instead of replace
usermod -aG newgroup username
```

## Integration with System Services

### Service Account Configuration
```bash
#!/bin/bash
# Configure service account

username="webapp"
service_group="webapp"
home_dir="/opt/webapp"
shell="/sbin/nologin"

# Create or modify service account
if id "$username" &>/dev/null; then
    # Modify existing user
    usermod -s "$shell" -d "$home_dir" -g "$service_group" "$username"
else
    # Create new user
    useradd -r -s "$shell" -d "$home_dir" -g "$service_group" "$username"
fi

# Ensure proper permissions
mkdir -p "$home_dir"
chown -R "$username:$service_group" "$home_dir"
chmod 750 "$home_dir"

echo "Configured service account: $username"
```

### User Profile Standardization
```bash
#!/bin/bash
# Standardize user profiles

users=("dev1" "dev2" "dev3")
standard_shell="/bin/bash"
standard_groups="developers,git"

# Create standard bash profile
cat > /etc/skel/.bash_profile << 'EOF'
# Standard developer profile
export PATH=$HOME/bin:$PATH
export EDITOR=vim
export LANG=en_US.UTF-8

# Aliases
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'

# Git configuration if git is installed
if command -v git &> /dev/null; then
    source /etc/bash_completion.d/git 2>/dev/null || true
fi
EOF

for user in "${users[@]}"; do
    # Standardize shell
    usermod -s "$standard_shell" "$user"

    # Add to standard groups
    usermod -G "$standard_groups" "$user"

    # Copy updated profile if home exists
    if [[ -d "/home/$user" ]]; then
        cp /etc/skel/.bash_profile "/home/$user/.bash_profile"
        chown "$user:$user" "/home/$user/.bash_profile"
    fi

    echo "Standardized profile for: $user"
done
```

## Best Practices

1. **Test changes** in development environment before production
2. **Use `-a` flag** with `-G` to preserve existing group memberships
3. **Verify UID uniqueness** when changing user IDs
4. **Backup user data** before major modifications like home directory moves
5. **Document changes** for audit trails and troubleshooting
6. **Use consistent naming conventions** for login names
7. **Lock accounts instead of deleting** if you might need them later
8. **Verify file ownership** after UID changes
9. **Check for running processes** before making major changes
10. **Test login functionality** after shell or account changes

## Related Commands

- [`useradd`](/docs/commands/user-permissions/useradd) - Create new user account
- [`userdel`](/docs/commands/user-permissions/userdel) - Delete user account
- [`passwd`](/docs/commands/user-permissions/passwd) - Change user password
- [`groupmod`](/docs/commands/user-permissions/groupmod) - Modify group information
- [`chown`](/docs/commands/file-management/chown) - Change file ownership
- [`id`](/docs/commands/user-permissions/id) - Display user and group information
- [`chage`](/docs/commands/user-permissions/chage) - Change user password aging

The `usermod` command is essential for maintaining user accounts throughout their lifecycle. Understanding its options ensures proper user management and system security.