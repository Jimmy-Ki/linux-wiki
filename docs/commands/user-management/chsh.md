---
title: chsh - Change login shell
sidebar_label: chsh
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# chsh - Change login shell

The `chsh` command is a system administration utility that allows users to change their default login shell. It modifies the user's shell information in the `/etc/passwd` file (or the appropriate user database on systems using NSS - Name Service Switch). The command can be used by regular users to change their own shell or by superusers to change any user's shell. `chsh` ensures that only valid shells listed in `/etc/shells` can be set as login shells, providing a security measure against arbitrary program execution.

## Basic Syntax

```bash
chsh [OPTIONS] [USERNAME]
chsh -s SHELL [OPTIONS] [USERNAME]
```

## Common Options

### Shell Selection
- `-s, --shell SHELL` - Specify the new login shell
- `-l, --list-shells` - Print the list of valid login shells and exit

### User Target
- `USERNAME` - Target user (only works with appropriate privileges)
- Default: current user if not specified

### Help and Information
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `-q, --quiet` - Suppress error messages

## Available Shells

### System Shells
- `/bin/sh` - Bourne shell (POSIX shell)
- `/bin/bash` - Bourne Again Shell (GNU shell)
- `/bin/csh` - C shell
- `/bin/tcsh` - Enhanced C shell
- `/bin/ksh` - KornShell
- `/bin/zsh` - Z shell
- `/bin/fish` - Friendly Interactive Shell
- `/usr/bin/fish` - Fish shell (alternative location)

### Restricted Shells
- `/sbin/nologin` - Prevents shell login
- `/bin/rbash` - Restricted bash
- `/usr/bin/passwd` - Forces password change on login
- `/bin/false` - Always exits with failure

## Usage Examples

### Basic Shell Management

#### Changing Current User's Shell
```bash
# Change to bash interactively
chsh

# Change to bash directly
chsh -s /bin/bash

# Change to zsh
chsh -s /bin/zsh

# Change to fish
chsh -s /usr/bin/fish

# Change to ksh
chsh -s /bin/ksh
```

#### Listing Available Shells
```bash
# Show all valid login shells
chsh -l

# Alternative method
cat /etc/shells
```

#### Changing Another User's Shell (requires root)
```bash
# Change another user's shell (as root)
sudo chsh -s /bin/bash john

# Change to nologin (disable shell access)
sudo chsh -s /sbin/nologin temporary_user

# Change to restricted shell
sudo chsh -s /bin/rbash restricted_user
```

### System Administration

#### User Access Control
```bash
# Disable shell access for service accounts
sudo chsh -s /sbin/nologin mysql
sudo chsh -s /sbin/nologin www-data

# Enable shell access temporarily
sudo chsh -s /bin/bash maintenance_user

# Restore restricted shell
sudo chsh -s /bin/rssh restricted_user
```

#### Bulk Shell Changes
```bash
# Change multiple users to bash
for user in alice bob charlie; do
    sudo chsh -s /bin/bash "$user"
done

# Change all users in a group to zsh
for user in $(getent group developers | cut -d: -f4 | tr ',' ' '); do
    sudo chsh -s /bin/zsh "$user"
done

# Set nologin for all users without home directories
for user in $(awk -F: '$7 != "/bin/bash" && $7 != "/bin/sh" {print $1}' /etc/passwd); do
    sudo chsh -s /sbin/nologin "$user"
done
```

### Security and Access Management

#### Temporary Access Changes
```bash
# Script for temporary shell access
#!/bin/bash
# grant_temp_access.sh - Grant temporary bash access

USER="$1"
DURATION="${2:-1h}"
ORIGINAL_SHELL=$(getent passwd "$USER" | cut -d: -f7)

echo "Granting temporary bash access to $USER for $DURATION"
sudo chsh -s /bin/bash "$USER"

echo "Will restore original shell ($ORIGINAL_SHELL) after $DURATION"
echo "sudo chsh -s $ORIGINAL_SHELL $USER" | at now + "$DURATION"
```

#### Shell Verification
```bash
# Check current shell
echo $SHELL

# Verify user's login shell
getent passwd username | cut -d: -f7

# List users with specific shell
awk -F: '$7 == "/bin/bash" {print $1}' /etc/passwd

# Find users with invalid shells
awk -F: 'BEGIN {while (getline < "/etc/shells") shells[$1]=1} $7 in shells {next} {print $1 " -> " $7}' /etc/passwd
```

## Advanced Usage

### Shell Environment Configuration

#### Custom Shell Paths
```bash
# Add custom shell to /etc/shells (as root)
echo "/opt/custom-shell/bin/myshell" | sudo tee -a /etc/shells

# Change to custom shell
chsh -s /opt/custom-shell/bin/myshell

# Verify shell availability
if [ -x /opt/custom-shell/bin/myshell ]; then
    echo "Shell exists and is executable"
else
    echo "Shell not found or not executable"
fi
```

#### Shell Migration Scripts
```bash
#!/bin/bash
# migrate_to_zsh.sh - Migrate users from bash to zsh

TARGET_SHELL="/bin/zsh"
BACKUP_FILE="/root/shell_changes_$(date +%Y%m%d).log"

echo "Shell migration log - $(date)" > "$BACKUP_FILE"

for user in $(awk -F: '$7 == "/bin/bash" && $3 >= 1000 {print $1}' /etc/passwd); do
    original_shell=$(getent passwd "$user" | cut -d: -f7)
    echo "Changing $user: $original_shell -> $TARGET_SHELL" | tee -a "$BACKUP_FILE"
    sudo chsh -s "$TARGET_SHELL" "$user" && echo "SUCCESS" | tee -a "$BACKUP_FILE"
done

echo "Migration completed. Log saved to $BACKUP_FILE"
```

### Integration with User Management

#### New User Shell Configuration
```bash
#!/bin/bash
# setup_user_shell.sh - Configure shell for new users

USERNAME="$1"
DEFAULT_SHELL="${2:-/bin/bash}"

if [ -z "$USERNAME" ]; then
    echo "Usage: $0 <username> [shell]"
    exit 1
fi

# Check if user exists
if ! id "$USERNAME" &>/dev/null; then
    echo "User $USERNAME does not exist"
    exit 1
fi

# Validate shell
if ! grep -q "^$DEFAULT_SHELL$" /etc/shells; then
    echo "Shell $DEFAULT_SHELL is not in /etc/shells"
    exit 1
fi

# Set shell
sudo chsh -s "$DEFAULT_SHELL" "$USERNAME"
echo "Shell for $USERNAME set to $DEFAULT_SHELL"
```

#### Shell-based Access Policies
```bash
#!/bin/bash
# enforce_shell_policy.sh - Enforce shell access policies

# Policy: regular users get bash, service accounts get nologin
REGULAR_USERS_SHELL="/bin/bash"
SERVICE_ACCOUNTS_SHELL="/sbin/nologin"

# Define service account patterns (UID < 1000 or specific usernames)
awk -F: '$3 < 1000 && $1 != "root" && $1 != "sync" && $1 != "shutdown" && $1 != "halt" {print $1 ":" $7}' /etc/passwd | while IFS=: read -r user current_shell; do
    if [ "$current_shell" != "$SERVICE_ACCOUNTS_SHELL" ]; then
        echo "Setting nologin for service account: $user"
        sudo chsh -s "$SERVICE_ACCOUNTS_SHELL" "$user"
    fi
done

# Regular users (UID >= 1000)
awk -F: '$3 >= 1000 && $7 != "/bin/false" {print $1 ":" $7}' /etc/passwd | while IFS=: read -r user current_shell; do
    if [ "$current_shell" != "$REGULAR_USERS_SHELL" ]; then
        echo "Setting bash for regular user: $user"
        sudo chsh -s "$REGULAR_USERS_SHELL" "$user"
    fi
done
```

## Shell Validation and Testing

### Shell Compatibility Testing
```bash
#!/bin/bash
# test_shell_compatibility.sh - Test shell before setting as default

TEST_SHELL="$1"
TEST_USER="${2:-$(whoami)}"

if [ -z "$TEST_SHELL" ]; then
    echo "Usage: $0 <shell_path> [username]"
    exit 1
fi

# Check if shell exists
if [ ! -x "$TEST_SHELL" ]; then
    echo "ERROR: Shell $TEST_SHELL does not exist or is not executable"
    exit 1
fi

# Check if shell is in /etc/shells
if ! grep -q "^$TEST_SHELL$" /etc/shells; then
    echo "WARNING: Shell $TEST_SHELL is not in /etc/shells"
    echo "Add it first: echo '$TEST_SHELL' | sudo tee -a /etc/shells"
    exit 1
fi

# Test shell execution
echo "Testing shell execution..."
if "$TEST_SHELL" -c "echo 'Shell test successful'"; then
    echo "Shell execution test passed"
else
    echo "ERROR: Shell execution test failed"
    exit 1
fi

# Interactive test (optional)
echo "Would you like to test the shell interactively? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Entering test shell. Type 'exit' to return."
    "$TEST_SHELL"
fi

echo "Shell $TEST_SHELL is ready for use"
echo "To set as login shell: chsh -s $TEST_SHELL"
```

### Shell Environment Setup
```bash
#!/bin/bash
# setup_shell_environment.sh - Setup environment for new shell

NEW_SHELL="$1"
USERNAME="${2:-$(whoami)}"

if [ -z "$NEW_SHELL" ]; then
    echo "Usage: $0 <shell> [username]"
    exit 1
fi

# Backup current shell configuration
HOME_DIR=$(getent passwd "$USERNAME" | cut -d: -f6)
BACKUP_DIR="$HOME_DIR/.shell_backup_$(date +%Y%m%d)"

mkdir -p "$BACKUP_DIR"
[ -f "$HOME_DIR/.bashrc" ] && cp "$HOME_DIR/.bashrc" "$BACKUP_DIR/"
[ -f "$HOME_DIR/.profile" ] && cp "$HOME_DIR/.profile" "$BACKUP_DIR/"

# Initialize shell configuration based on shell type
case "$NEW_SHELL" in
    */zsh)
        # Initialize zsh
        [ ! -f "$HOME_DIR/.zshrc" ] && cp /etc/zsh/zshrc.default "$HOME_DIR/.zshrc" 2>/dev/null || \
        echo "export ZDOTDIR=\$HOME" > "$HOME_DIR/.zshrc"
        ;;
    */fish)
        # Initialize fish
        mkdir -p "$HOME_DIR/.config/fish"
        [ ! -f "$HOME_DIR/.config/fish/config.fish" ] && \
        echo "set -gx EDITOR vim" > "$HOME_DIR/.config/fish/config.fish"
        ;;
    */bash)
        # Ensure bash configuration exists
        [ ! -f "$HOME_DIR/.bashrc" ] && cp /etc/skel/.bashrc "$HOME_DIR/" 2>/dev/null
        ;;
esac

echo "Shell environment setup completed for $USERNAME"
echo "Backup created in $BACKUP_DIR"
```

## Integration and Automation

### System Integration

#### Automated User Onboarding
```bash
#!/bin/bash
# onboard_user.sh - Complete user setup with shell configuration

USERNAME="$1"
SHELL="${2:-/bin/bash}"
DEPARTMENT="${3:-general}"

if [ -z "$USERNAME" ]; then
    echo "Usage: $0 <username> [shell] [department]"
    exit 1
fi

# Create user
sudo useradd -m -s "$SHELL" "$USERNAME"

# Set department-specific configurations
case "$DEPARTMENT" in
    "developers")
        sudo chsh -s /bin/zsh "$USERNAME"
        # Copy developer dotfiles
        sudo cp -r /etc/skel/developer/* "/home/$USERNAME/"
        ;;
    "sysadmins")
        sudo chsh -s /bin/bash "$USERNAME"
        # Add to sudo group
        sudo usermod -aG sudo "$USERNAME"
        ;;
    "support")
        sudo chsh -s /bin/bash "$USERNAME"
        # Limited shell configuration
        ;;
esac

# Set password
echo "Set password for $USERNAME:"
sudo passwd "$USERNAME"

echo "User $USERNAME onboarded successfully"
echo "Shell: $(getent passwd "$USERNAME" | cut -d: -f7)"
```

#### Shell Compliance Monitoring
```bash
#!/bin/bash
# monitor_shell_compliance.sh - Monitor shell compliance

COMPLIANCE_FILE="/var/log/shell_compliance.log"
COMPLIANCE_RULES="/etc/shell_compliance.conf"

# Function to log compliance issues
log_compliance() {
    echo "$(date): $1" >> "$COMPLIANCE_FILE"
}

# Check if users have approved shells
while IFS= read -r line; do
    [ "$line" = "" ] && continue
    [ "${line:0:1}" = "#" ] && continue

    username=$(echo "$line" | cut -d: -f1)
    expected_shell=$(echo "$line" | cut -d: -f2)

    if id "$username" &>/dev/null; then
        current_shell=$(getent passwd "$username" | cut -d: -f7)
        if [ "$current_shell" != "$expected_shell" ]; then
            log_compliance "COMPLIANCE VIOLATION: $username has shell $current_shell (expected $expected_shell)"
            echo "ALERT: $username shell compliance issue"
        fi
    fi
done < "$COMPLIANCE_RULES"

echo "Shell compliance check completed. See $COMPLIANCE_FILE for details."
```

## Troubleshooting

### Common Issues

#### Shell Not Found Errors
```bash
# Problem: chsh: "shell" is not a valid shell
# Solution: Add shell to /etc/shells

echo "/opt/custom/bin/shell" | sudo tee -a /etc/shells

# Verify shell is executable
sudo chmod +x /opt/custom/bin/shell

# Test shell before setting
/opt/custom/bin/shell --version
```

#### Permission Denied Errors
```bash
# Problem: chsh: cannot change shell for user
# Solution: Check permissions and authentication

# Check if you can modify your own shell
chsh -l

# For other users, use sudo
sudo chsh -s /bin/bash username

# Check if user database is writable
sudo touch /etc/passwd.test && sudo rm /etc/passwd.test
```

#### Shell Change Not Taking Effect
```bash
# Problem: Shell change not reflected after login
# Solution: Verify multiple configuration sources

# Check /etc/passwd
getent passwd username

# Check user database (LDAP/NIS)
getent passwd username | cut -d: -f7

# Verify shell exists and is executable
ls -la /bin/bash

# Test shell manually
/bin/bash --version
```

#### NSS (Name Service Switch) Issues
```bash
# Problem: Changes not saved with LDAP/NIS users
# Solution: Check NSS configuration

# Check NSS configuration
cat /etc/nsswitch.conf

# Test user lookup
getent passwd username

# For LDAP, check if shell attribute is writable
ldapsearch -x -LLL uid=username loginShell
```

### Diagnostic Commands

#### Shell Status Verification
```bash
# Check current shell
echo $SHELL
ps -p $$ -o comm=

# Verify login shell in password file
getent passwd $USER | cut -d: -f7

# Check all shells in system
awk -F: '{print $1 " -> " $7}' /etc/passwd

# Find users with invalid shells
awk -F: 'BEGIN {while (getline < "/etc/shells") shells[$1]=1} $7 in shells {next} {print "Invalid: " $1 " -> " $7}' /etc/passwd
```

#### System Shell Inventory
```bash
#!/bin/bash
# shell_inventory.sh - Complete shell inventory report

echo "=== Shell Inventory Report ==="
echo "Generated: $(date)"
echo

echo "=== Available Shells ==="
chsh -l | nl

echo
echo "=== Current Shell Distribution ==="
awk -F: '{shells[$7]++} END {for (shell in shells) print shells[shell], shell}' /etc/passwd | sort -nr

echo
echo "=== Users with Non-Standard Shells ==="
awk -F: 'BEGIN {while (getline < "/etc/shells") shells[$1]=1} $7 in shells {next} {print $1 " -> " $7}' /etc/passwd

echo
echo "=== Service Accounts with Shell Access ==="
awk -F: '$3 < 1000 && $7 != "/sbin/nologin" && $7 != "/bin/false" {print $1 " -> " $7}' /etc/passwd

echo
echo "=== Recent Shell Changes ==="
if [ -f /var/log/auth.log ]; then
    grep "chsh" /var/log/auth.log | tail -10
fi
```

## Related Commands

- [`passwd`](/docs/commands/user-management/passwd) - Change user password
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`useradd`](/docs/commands/user-management/useradd) - Create new user
- [`su`](/docs/commands/user-management/su) - Switch user
- [`sudo`](/docs/commands/user-management/sudo) - Execute commands as another user
- [`login`](/docs/commands/user-management/login) - User login
- [`getent`](/docs/commands/user-management/getent) - Get entries from administrative database
- [`id`](/docs/commands/system-info/id) - Display user and group information
- [`whoami`](/docs/commands/system-info/whoami) - Display current username

## Best Practices

1. **Always validate shells** before setting them as login shells
2. **Use `/etc/shells`** as the authoritative list of valid shells
3. **Test shell compatibility** with user scripts and applications
4. **Document shell changes** for audit and troubleshooting purposes
5. **Use restricted shells** (`rbash`, `rssh`) for limited user access
6. **Set nologin shell** for service and system accounts
7. **Backup shell configurations** before making changes
8. **Consider user dependencies** when changing shells
9. **Use version control** for shell configuration files
10. **Monitor shell compliance** with security policies

## Security Considerations

1. **Validate shell paths** to prevent arbitrary code execution
2. **Restrict shell access** for service and system accounts
3. **Monitor shell changes** for security auditing
4. **Use least privilege** principle for shell assignments
5. **Regular audit** of user shell assignments
6. **Document exceptions** to standard shell policies
7. **Implement change approval** workflows for production systems
8. **Use sudo carefully** when modifying other users' shells
9. **Secure /etc/shells** file permissions (644)
10. **Consider SELinux/AppArmor** contexts for custom shells

## Performance Tips

1. **Lightweight shells** (sh, dash) for system processes
2. **Feature-rich shells** (bash, zsh) for interactive use
3. **Fish shell** for user-friendly command line experience
4. **Avoid resource-intensive shells** for service accounts
5. **Consider login time** when choosing complex shells
6. **Profile shell startup time** for performance-critical systems
7. **Use shell optimization** (.bashrc, .zshrc tuning)
8. **Minimize shell initialization** for automated logins
9. **Cache shell configurations** for frequently accessed systems
10. **Monitor resource usage** of different shells in production

The `chsh` command is a critical system administration tool for managing user shell access and enforcing security policies. When used properly with proper validation and monitoring, it provides a secure way to control user login environments while maintaining system flexibility and user productivity.