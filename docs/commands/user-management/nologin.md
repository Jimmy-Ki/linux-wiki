---
title: nologin - Politely refuse a login
sidebar_label: nologin
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nologin - Politely refuse a login

The `nologin` command is a security utility that displays a polite message and then terminates, effectively preventing user login access. It's commonly used as a shell for system accounts or service accounts that should not have direct interactive login capabilities. When a user with `nologin` as their shell attempts to log in, they see a predefined message and are immediately disconnected from the system. This provides a secure way to disable login access while maintaining a user account for other purposes like file ownership or process execution.

## Basic Syntax

```bash
nologin [OPTIONS]
```

## Common Options

### Display Options
- `-h, --help` - Display help message and exit
- `-v, --version` - Display version information and exit
- `-c, --custom-message` - Display custom message (in some implementations)

### Message Options
- `-f, --file` - Read message from file (if supported)
- `-t, --timeout` - Set display timeout before exit (if supported)

## Usage Examples

### Basic Usage

#### Default Behavior
```bash
# Execute nologin command
nologin

# Typical output when used as shell:
This account is currently not available.
```

#### Version Information
```bash
# Display version
nologin --version

# Output example:
nologin from util-linux 2.37.2
```

#### Help Information
```bash
# Display help
nologin --help

# Output example:
Usage: nologin [options]
Politely refuse a login.

Options:
  -h, --help     display this help and exit
  -V, --version  output version information and exit
```

### User Management Integration

#### Setting nologin as User Shell
```bash
# Set nologin as shell for existing user
usermod -s /usr/sbin/nologin username

# Set nologin during user creation
useradd -s /usr/sbin/nologin serviceuser

# Verify user's shell
grep username /etc/passwd

# Output:
serviceuser:x:1001:1001::/home/serviceuser:/usr/sbin/nologin
```

#### Different Paths for nologin
```bash
# Common nologin paths (varies by distribution):
/usr/sbin/nologin    # Debian/Ubuntu
/sbin/nologin        # RHEL/CentOS
/usr/bin/nologin     # Some distributions
/bin/false           # Alternative to nologin

# Check which path exists on your system
which nologin
ls -la /usr/sbin/nologin /sbin/nologin
```

### System Service Accounts

#### Creating Service Accounts
```bash
# Create service account with nologin shell
useradd -r -s /usr/sbin/nologin -d /var/lib/service serviceuser

# Create account for web server
useradd -r -s /usr/sbin/nologin -d /var/www wwwuser

# Create database service account
useradd -r -s /usr/sbin/nologin -d /var/lib/postgresql postgresuser

# Verify accounts
grep -E "(serviceuser|wwwuser|postgresuser)" /etc/passwd
```

#### Application User Management
```bash
# Create user for application processes
groupadd appgroup
useradd -r -s /usr/sbin/nologin -g appgroup -d /opt/myapp myappuser

# Set appropriate permissions
chown -R myappuser:appgroup /opt/myapp

# Test user access (should be denied)
su - myappuser
# Output: This account is currently not available.
```

### Security Scenarios

#### Temporary Account Disabling
```bash
# Method 1: Use nologin to temporarily disable user
usermod -s /usr/sbin/nologin username

# Method 2: For system-wide login prevention
echo "System maintenance in progress. Please try again later." > /etc/nologin

# Remove system-wide nologin file to restore access
rm /etc/nologin
```

#### Auditing and Monitoring
```bash
# Check accounts with nologin shell
awk -F: '$7 ~ /nologin/' /etc/passwd

# Count accounts with nologin
grep -c nologin /etc/passwd

# List all system accounts (usually have nologin)
grep -E "^[^:]+:[^:]*:[0-9]{1,3}:" /etc/passwd | grep nologin
```

## Practical Examples

### System Administration

#### Service Account Management
```bash
#!/bin/bash
# Service account creation script

SERVICE_NAME="nginx"
SERVICE_DIR="/var/www"
SERVICE_USER="nginx"

# Create service group
groupadd -r $SERVICE_NAME

# Create service user with nologin
useradd -r -s /usr/sbin/nologin -g $SERVICE_NAME -d $SERVICE_DIR $SERVICE_USER

# Set permissions
chown -R $SERVICE_USER:$SERVICE_NAME $SERVICE_DIR
chmod 755 $SERVICE_DIR

echo "Service account $SERVICE_USER created successfully"

# Verify
id $SERVICE_USER
```

#### Batch User Management
```bash
#!/bin/bash
# Convert multiple users to service accounts

USERS=("user1" "user2" "user3")
NOLOGIN_PATH="/usr/sbin/nologin"

for user in "${USERS[@]}"; do
    if id "$user" &>/dev/null; then
        usermod -s $NOLOGIN_PATH "$user"
        echo "Updated shell for $user to nologin"
    else
        echo "User $user does not exist"
    fi
done

# Verify changes
awk -F: '$7 == "'$NOLOGIN_PATH'"' /etc/passwd
```

### Security Hardening

#### Account Security Review
```bash
#!/bin/bash
# Security audit for login accounts

echo "=== Users with login shells ==="
awk -F: '$7 !~ /(nologin|false)/ && $3 >= 1000 {print $1 ":" $7}' /etc/passwd

echo "=== Service accounts with nologin ==="
awk -F: '$7 ~ /nologin/ {print $1 ":" $3 ":" $7}' /etc/passwd

echo "=== Accounts without passwords ==="
sudo awk -F: '($2 == "" || $2 == "!" || $2 == "*") {print $1 ": LOCKED"}' /etc/shadow

# Find potential security issues
echo "=== Users with UID 0 (other than root) ==="
awk -F: '$3 == 0 && $1 != "root" {print $1}' /etc/passwd
```

#### Temporary Lockdown Script
```bash
#!/bin/bash
# Emergency user lockdown script

# Create system-wide login block
echo "SYSTEM UNDER MAINTENANCE - All logins suspended" | sudo tee /etc/nologin

# Optional: Disable specific user accounts
USERS_TO_DISABLE=("user1" "user2" "user3")
NOLOGIN_PATH="/usr/sbin/nologin"

for user in "${USERS_TO_DISABLE[@]}"; do
    if id "$user" &>/dev/null; then
        sudo usermod -s $NOLOGIN_PATH "$user"
        echo "Disabled login for $user"
    fi
done

echo "Emergency lockdown completed"
echo "To restore access: sudo rm /etc/nologin"
```

### Application Deployment

#### Application User Setup
```bash
#!/bin/bash
# Application deployment with service user

APP_NAME="myapp"
APP_USER="myappuser"
APP_DIR="/opt/$APP_NAME"
LOG_DIR="/var/log/$APP_NAME"

# Create application user
sudo useradd -r -s /usr/sbin/nologin -d $APP_DIR $APP_USER

# Create directories
sudo mkdir -p $APP_DIR $LOG_DIR

# Set ownership
sudo chown -R $APP_USER:$APP_USER $APP_DIR
sudo chown -R $APP_USER:$APP_USER $LOG_DIR

# Set permissions
sudo chmod 755 $APP_DIR
sudo chmod 750 $LOG_DIR

echo "Application user $APP_USER configured"
echo "Directories created and permissions set"

# Test configuration
sudo -u $APP_USER whoami
echo "User test completed"
```

#### Docker and Container Security
```bash
#!/bin/bash
# Container user management

# Create non-root user for containers
CONTAINER_USER="appuser"
CONTAINER_UID="1000"
CONTAINER_GID="1000"

# Group
groupadd -g $CONTAINER_GID $CONTAINER_USER

# User with nologin
useradd -r -u $CONTAINER_UID -g $CONTAINER_GID -s /usr/sbin/nologin $CONTAINER_USER

# Verify
id $CONTAINER_USER

# For Dockerfile example
echo "Add to Dockerfile:"
echo "RUN groupadd -r appuser && useradd -r -g appuser -s /usr/sbin/nologin appuser"
echo "USER appuser"
```

## Advanced Usage

### Custom Messages

#### Customizing nologin Message
```bash
# Method 1: Create custom nologin script
sudo tee /usr/local/bin/custom-nologin << 'EOF'
#!/bin/bash
echo "================================"
echo " ACCESS DENIED "
echo "================================"
echo "This account is disabled for security reasons."
echo "Please contact system administrator."
echo "Admin: admin@company.com"
echo "Phone: x1234"
echo "================================"
exit 1
EOF

sudo chmod +x /usr/local/bin/custom-nologin

# Use custom nologin for specific user
usermod -s /usr/local/bin/custom-nologin username

# Method 2: System-wide message
echo "System under maintenance. Access will be restored at 6:00 PM." | sudo tee /etc/nologin
```

#### Temporary Access Control
```bash
#!/bin/bash
# Time-based access control

USER="tempuser"
NORMAL_SHELL="/bin/bash"
NOLOGIN_SHELL="/usr/sbin/nologin"

# Disable user after business hours
if [[ $(date +%H) -ge 18 || $(date +%H) -lt 8 ]]; then
    usermod -s $NOLOGIN_SHELL $USER
    echo "Access disabled for $USER outside business hours"
else
    usermod -s $NORMAL_SHELL $USER
    echo "Access enabled for $USER during business hours"
fi
```

### Monitoring and Auditing

#### Login Attempt Monitoring
```bash
#!/bin/bash
# Monitor failed nologin attempts

LOG_FILE="/var/log/auth.log"
PATTERN="nologin"

echo "=== Recent nologin attempts ==="
sudo grep "$PATTERN" $LOG_FILE | tail -20

# Count attempts by user
echo "=== Attempts by user ==="
sudo grep "$PATTERN" $LOG_FILE | awk '{print $6}' | sort | uniq -c | sort -nr

# Real-time monitoring
echo "=== Real-time monitoring (Ctrl+C to stop) ==="
sudo tail -f $LOG_FILE | grep --line-buffered "$PATTERN"
```

#### Account Status Report
```bash
#!/bin/bash
# Generate account status report

echo "=== User Account Status Report ==="
echo "Generated on: $(date)"
echo ""

echo "=== Regular Users (login enabled) ==="
awk -F: '$3 >= 1000 && $7 !~ /(nologin|false)/ {printf "%-15s %s\n", $1, $7}' /etc/passwd

echo ""
echo "=== Service Accounts (nologin) ==="
awk -F: '$3 >= 1000 && $7 ~ /nologin/ {printf "%-15s UID:%-5s %s\n", $1, $3, $7}' /etc/passwd

echo ""
echo "=== System Accounts (UID < 1000) ==="
awk -F: '$3 < 1000 && $1 !~ /^(root|nobody|daemon)$/ {printf "%-15s UID:%-5s %s\n", $1, $3, $7}' /etc/passwd
```

## Integration and Automation

### Configuration Management

#### Ansible Playbook Example
```yaml
---
- name: Configure service user with nologin
  hosts: servers
  become: yes
  tasks:
    - name: Create service group
      ansible.builtin.group:
        name: servicegroup
        system: yes
        state: present

    - name: Create service user with nologin
      ansible.builtin.user:
        name: serviceuser
        group: servicegroup
        shell: /usr/sbin/nologin
        home: /opt/service
        system: yes
        create_home: no
        state: present

    - name: Create application directory
      ansible.builtin.file:
        path: /opt/service
        state: directory
        owner: serviceuser
        group: servicegroup
        mode: '0755'
```

#### Puppet Manifest Example
```puppet
# Define service user with nologin
user { 'serviceuser':
  ensure     => present,
  shell      => '/usr/sbin/nologin',
  home       => '/opt/service',
  managehome => false,
  system     => true,
  groups     => ['servicegroup'],
}

# Define service group
group { 'servicegroup':
  ensure => present,
  system => true,
}

# Create application directory
file { '/opt/service':
  ensure => directory,
  owner  => 'serviceuser',
  group  => 'servicegroup',
  mode   => '0755',
}
```

### System Integration

#### PAM Integration
```bash
# Example PAM configuration to use nologin
# /etc/pam.d/sshd

# Add nologin check
auth       required     pam_nologin.so
account    required     pam_nologin.so

# This checks for /etc/nologin file
# If present, prevents all non-root logins
```

#### Systemd Service Example
```ini
# /etc/systemd/system/myservice.service
[Unit]
Description=My Application Service
After=network.target

[Service]
Type=simple
User=serviceuser
Group=servicegroup
ExecStart=/opt/myservice/bin/myservice
Restart=always
RestartSec=10

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict

[Install]
WantedBy=multi-user.target
```

## Troubleshooting

### Common Issues

#### User Cannot Switch to Service Account
```bash
# Problem: su - serviceuser fails
# Solution expected: "This account is currently not available."

# This is normal behavior - nologin is working correctly
# To perform tasks as service user:
sudo -u serviceuser command

# Example: Start process as service user
sudo -u serviceuser /opt/myservice/bin/myservice

# Example: Check files as service user
sudo -u serviceuser ls -la /opt/myservice
```

#### Finding Correct nologin Path
```bash
# Problem: nologin command not found
# Solution: Find correct path for your distribution

# Common locations
ls -la /usr/sbin/nologin 2>/dev/null
ls -la /sbin/nologin 2>/dev/null
ls -la /usr/bin/nologin 2>/dev/null

# Check if nologin is in PATH
which nologin

# Alternative: Use /bin/false
usermod -s /bin/false username

# Check shells listed in /etc/shells
cat /etc/shells
```

#### Removing nologin from User
```bash
# Restore normal shell access
usermod -s /bin/bash username

# Set to default shell
usermod -s $(grep "^username:" /etc/passwd | cut -d: -f7) username  # This keeps current shell

# Set to system default
usermod -s /bin/bash username  # For bash
usermod -s /bin/sh username   # For sh
usermod -s /bin/zsh username  # For zsh

# Verify change
grep username /etc/passwd
```

#### System-wide nologin Issues
```bash
# Problem: /etc/nologin file preventing all logins
# Solution: Remove or update the file

# Check if nologin file exists
ls -la /etc/nologin

# View current message
cat /etc/nologin

# Remove to restore access
sudo rm /etc/nologin

# Or update with new message
echo "System maintenance complete. Access restored." | sudo tee /etc/nologin
```

### Debugging nologin Issues

#### Verify User Shell Configuration
```bash
#!/bin/bash
# Diagnostic script for nologin issues

USER="$1"
if [ -z "$USER" ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

echo "=== Diagnostics for user: $USER ==="

# Check if user exists
if ! id "$USER" &>/dev/null; then
    echo "ERROR: User $USER does not exist"
    exit 1
fi

# Check user shell
SHELL=$(grep "^$USER:" /etc/passwd | cut -d: -f7)
echo "User shell: $SHELL"

# Check if nologin exists
if [ -x "$SHELL" ]; then
    echo "✓ Shell binary exists and is executable"
else
    echo "✗ Shell binary not found or not executable"
fi

# Check if it's nologin
if [[ "$SHELL" =~ nologin ]]; then
    echo "✓ User has nologin shell"
else
    echo "✗ User does not have nologin shell"
fi

# Test nologin command
if command -v nologin &>/dev/null; then
    echo "✓ nologin command found in PATH"
    echo "Location: $(which nologin)"
else
    echo "✗ nologin command not found in PATH"
fi
```

## Related Commands

- [`useradd`](/docs/commands/user-management/useradd) - Create new user account
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`userdel`](/docs/commands/user-management/userdel) - Delete user account
- [`passwd`](/docs/commands/user-management/passwd) - Change user password
- [`su`](/docs/commands/user-management/su) - Switch user
- [`sudo`](/docs/commands/user-management/sudo) - Execute command as another user
- [`login`](/docs/commands/user-management/login) - User login
- [`chsh`](/docs/commands/user-management/chsh) - Change login shell
- [`false`](/docs/commands/user-management/false) - Return false status

## Best Practices

1. **Use nologin for service accounts** to prevent direct login access
2. **Create dedicated service users** for applications instead of using existing users
3. **Regularly audit accounts** with login shells to identify unnecessary access
4. **Use system-wide nologin** (/etc/nologin) for planned maintenance windows
5. **Document exceptions** when users need both service and login capabilities
6. **Combine with sudo** for controlled administrative access
7. **Monitor login attempts** to nologin accounts for security awareness
8. **Test service account functionality** before deploying to production
9. **Use consistent naming** conventions for service accounts
10. **Maintain separation** between service accounts and human users

## Performance Tips

1. **nologin has minimal overhead** - it's a very lightweight program
2. **System-wide nologin** (/etc/nologin) is more efficient than individual shell changes
3. **Use /bin/false** as an even lighter alternative if no message is needed
4. **Regular user audits** help maintain system security and performance
5. **Consider using groups** instead of individual users for some services
6. **Leverage container user namespaces** for modern application deployment
7. **Document service account purposes** to avoid account accumulation

The `nologin` command is a simple but essential security tool in Linux system administration. It provides an effective way to prevent interactive login access while maintaining user accounts for other purposes like file ownership or process execution. When used properly as part of a comprehensive security strategy, nologin helps maintain system integrity by ensuring only authorized users have interactive access to the system.