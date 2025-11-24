---
title: useradd - Create New User Account
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# useradd - Create New User Account

The `useradd` command creates new user accounts in Linux. It's a fundamental system administration tool for user management that creates entries in system files and can optionally create user home directories and initial settings.

## Basic Syntax

```bash
useradd [options] username
```

## Common Options

### Basic User Creation
- `-m, --create-home` - Create the user's home directory
- `-M` - Do not create the user's home directory (overrides system defaults)
- `-s, --shell SHELL` - Specify the user's login shell
- `-u, --uid UID` - Specify a specific user ID
- `-g, --gid GROUP` - Specify the primary group name or ID

### User Information
- `-c, --comment COMMENT` - Add a description or comment (often used for full name)
- `-d, --home HOME_DIR` - Specify the home directory path
- `-l, --no-log-init` - Do not add user to lastlog and faillog databases

### Group Management
- `-G, --groups GROUP1[,GROUP2,...]` - Specify supplementary groups
- `-N, --no-user-group` - Do not create a group with the same name as the user
- `-U, --user-group` - Create a group with the same name as the user (default)

### System Users
- `-r, --system` - Create a system account (with UID < SYS_UID_MIN)
- `-k, --skel SKEL_DIR` - Specify skeleton directory for template files

### Password and Expiration
- `-p, --password PASSWORD` - Specify encrypted password
- `-e, --expiredate DATE` - Set account expiration date (YYYY-MM-DD)
- `-f, --inactive DAYS` - Set password inactivity period

### Configuration
- `-D, --defaults` - Display or change default useradd configuration
- `-K, --key KEY=VALUE` - Override /etc/login.defs defaults

## Usage Examples

### Basic User Creation
```bash
# Create a basic user with default settings
useradd john

# Create user with home directory
useradd -m alice

# Create user with specific shell
useradd -s /bin/zsh bob

# Create user with specific UID
useradd -u 1500 developer
```

### User with Custom Home Directory
```bash
# Create user with custom home directory
useradd -m -d /opt/appuser appuser

# Create user with specific skeleton directory
useradd -m -k /etc/custom.skel tempuser
```

### User with Group Assignments
```bash
# Create user with specific primary group
useradd -g developers alice

# Create user with supplementary groups
useradd -m -G developers,designers,admin bob

# Create user without creating a同名 group
useradd -N -g users guestuser
```

### System Users
```bash
# Create a system user
useradd -r -s /sbin/nologin mongodb

# Create system user without home directory
useradd -r -M -s /usr/sbin/nologin nginx
```

### User with Additional Information
```bash
# Create user with full name/comment
useradd -c "John Doe" -m john

# Create user with password (encrypted)
useradd -m -p '$6$encryptedpassword' secureuser

# Create user with expiration date
useradd -e 2024-12-31 -m tempuser
```

## Configuration and Defaults

### Viewing Default Settings
```bash
# Display current useradd defaults
useradd -D

# Typical output:
# GROUP=100
# HOME=/home
# INACTIVE=-1
# EXPIRE=
# SHELL=/bin/bash
# SKEL=/etc/skel
# CREATE_MAIL_SPOOL=yes
```

### Modifying Default Settings
```bash
# Change default home directory base
useradd -D -b /home/users

# Change default shell
useradd -D -s /bin/zsh

# Change default group
useradd -D -g 1000

# Change skeleton directory
useradd -D -k /etc/custom.skel
```

### Override System Configuration Files
```bash
# Override UID_MIN setting
useradd -K UID_MIN=1000 -m testuser

# Override password maximum days
useradd -K PASS_MAX_DAYS=90 -m newuser

# Override umask setting
useradd -K UMASK=027 -m secureuser
```

## Advanced User Management

### Batch User Creation
```bash
#!/bin/bash
# Batch user creation script

# User list format: username:comment:groups
users=(
    "dev1:Developer 1:developers,git"
    "dev2:Developer 2:developers,git"
    "design1:Designer 1:designers"
    "manager1:Project Manager:managers,developers"
)

for user_info in "${users[@]}"; do
    IFS=':' read -r username comment groups <<< "$user_info"

    # Create user with home directory, shell, and groups
    useradd -m -c "$comment" -s /bin/bash -G "$groups" "$username"

    # Set temporary password
    echo "$username:TempPass123!" | chpasswd

    # Force password change on first login
    chage -d 0 "$username"

    echo "Created user: $username"
done
```

### User Creation with Custom Setup
```bash
#!/bin/bash
# Advanced user creation with custom setup

username="newdeveloper"
homedir="/opt/developers/$username"
groups="developers,git,docker"

# Create custom skeleton directory
custom_skel="/etc/developer.skel"
mkdir -p "$custom_skel"

# Add custom files to skeleton
cat > "$custom_skel/.bashrc" << 'EOF'
# Developer environment setup
export PATH=$HOME/bin:$PATH
export EDITOR=vim
alias ll='ls -la'
alias dev='cd ~/projects'
source /etc/bash_completion.d/git
EOF

# Create projects directory
mkdir -p "$custom_skel/projects"

# Create user with custom settings
useradd -m \
    -d "$homedir" \
    -s /bin/bash \
    -G "$groups" \
    -c "Developer Account" \
    -k "$custom_skel" \
    "$username"

# Set up SSH directory
mkdir -p "$homedir/.ssh"
chmod 700 "$homedir/.ssh"
touch "$homedir/.ssh/authorized_keys"
chmod 600 "$homedir/.ssh/authorized_keys"
chown -R "$username:$username" "$homedir/.ssh"

echo "Created developer user: $username with custom setup"
```

## System Files and Configuration

### Key Configuration Files
```bash
# Main configuration file
/etc/default/useradd

# System-wide defaults
/etc/login.defs

# Password and shadow information
/etc/passwd
/etc/shadow

# Group information
/etc/group
/etc/gshadow

# Skeleton directory
/etc/skel/
```

### Understanding /etc/default/useradd
```bash
# Example content:
# GROUP=100
# HOME=/home
# INACTIVE=-1
# EXPIRE=
# SHELL=/bin/bash
# SKEL=/etc/skel
# CREATE_MAIL_SPOOL=yes
```

### Understanding /etc/login.defs
```bash
# Important settings:
# UID_MIN              1000
# UID_MAX            60000
# SYS_UID_MIN           101
# SYS_UID_MAX           999
# GID_MIN              1000
# GID_MAX            60000
# CREATE_HOME        yes
# UMASK             077
# PASS_MAX_DAYS      99999
# PASS_MIN_DAYS        0
# PASS_WARN_AGE       7
```

## User Account Verification

### Checking User Creation
```bash
# Verify user was created in /etc/passwd
grep username /etc/passwd

# Check user ID and group information
id username

# Verify home directory
ls -la /home/username

# Check password entry
grep username /etc/shadow

# List user groups
groups username
```

### User Account Status
```bash
# Display user information
finger username

# Show last login information
lastlog -u username

# Check password status
passwd -S username

# Display account aging information
chage -l username
```

## Security Considerations

### Creating Secure User Accounts
```bash
# Create user with restricted shell
useradd -m -s /bin/rbash restricteduser

# Create user with password aging
useradd -m -K PASS_MAX_DAYS=90 -K PASS_WARN_AGE=7 regularuser

# Create user without mail spool
useradd -m -K CREATE_MAIL_SPOOL=no nomailuser
```

### System User Best Practices
```bash
# System user should have:
# - UID below 1000 (or SYS_UID_MIN)
# - No login shell (/sbin/nologin or /bin/false)
# - No home directory or minimal home
# - No password entry

useradd -r -s /sbin/nologin -M appuser
```

## Integration with Other Tools

### Using with passwd Command
```bash
# Create user and set password in one script
useradd -m newuser
echo "newuser:SecurePass123!" | chpasswd
chage -d 0 newuser  # Force password change
```

### Using with SSH Key Setup
```bash
#!/bin/bash
# Create user with SSH key setup

username="remoteuser"
ssh_key="ssh-rsa AAAAB3NzaC1yc2E... user@machine"

# Create user
useradd -m -s /bin/bash "$username"

# Set up SSH
mkdir -p /home/"$username"/.ssh
echo "$ssh_key" > /home/"$username"/.ssh/authorized_keys
chmod 700 /home/"$username"/.ssh
chmod 600 /home/"$username"/.ssh/authorized_keys
chown -R "$username:$username" /home/"$username"/.ssh

# Disable password authentication
passwd -l "$username"
```

## Troubleshooting

### Common Issues and Solutions
```bash
# Error: user already exists
# Solution: Check existing users
grep username /etc/passwd

# Error: group does not exist
# Solution: Create group first
groupadd newgroup
useradd -g newgroup newuser

# Error: UID already in use
# Solution: Find available UID or use -o for non-unique
useradd -u $(($(awk -F: '($3>=1000 && $3<=60000) {max=$3} END {print max+1}' /etc/passwd))) newuser

# Error: home directory cannot be created
# Solution: Check permissions and disk space
ls -la /home
df -h
```

### Recovery and Cleanup
```bash
# If user creation fails, clean up partial entries
userdel -r username  # Remove user and home directory
groupdel groupname   # Remove group if created separately
```

## Best Practices

1. **Always use `-m`** for interactive users to create home directories
2. **Set appropriate shells** based on user purpose (/bin/bash for users, /sbin/nologin for services)
3. **Use descriptive comments** with the `-c` option for better user management
4. **Implement password policies** using `/etc/login.defs` and user-specific settings
5. **Create system users** with `-r` flag for services and applications
6. **Use supplementary groups** (`-G`) for role-based access control
7. **Test user creation** in development environment before production deployment
8. **Document user creation policies** for consistency across systems
9. **Regular audit** of user accounts to remove unnecessary ones
10. **Use scripts** for consistent bulk user creation

## Related Commands

- [`usermod`](/docs/commands/user-permissions/usermod) - Modify user account
- [`userdel`](/docs/commands/user-permissions/userdel) - Delete user account
- [`passwd`](/docs/commands/user-permissions/passwd) - Change user password
- [`groupadd`](/docs/commands/user-permissions/groupadd) - Create new group
- [`chage`](/docs/commands/user-permissions/chage) - Change user password aging
- [`id`](/docs/commands/user-permissions/id) - Display user and group information
- [`groups`](/docs/commands/user-permissions/groups) - Display group membership

The `useradd` command is essential for Linux system administration and user management. Understanding its options and configuration ensures proper user account creation and system security.