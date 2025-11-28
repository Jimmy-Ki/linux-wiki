---
title: su - Switch user or become superuser
sidebar_label: su
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# su - Switch user or become superuser

The `su` command (short for "substitute user" or "switch user") allows a user to become another user during a login session, most commonly the superuser (root). It creates a new shell process running with the privileges of the specified user, making it an essential tool for system administration and temporary privilege escalation. Unlike `sudo`, `su` requires the target user's password and provides a full session with that user's environment and permissions.

## Basic Syntax

```bash
su [OPTIONS] [USERNAME] [ARGUMENTS...]
```

## Common Options

### Session Management
- `-`, `-l`, `--login` - Start a login shell (simulate full login)
- `-p`, `--preserve-environment` - Preserve current environment variables
- `-m`, --preserve-environment` - Same as -p
- `-s`, `--shell=SHELL` - Specify alternative shell

### Command Execution
- `-c`, `--command=COMMAND` - Execute single command as target user
- `-` - Start a login shell (same as --login)

### User Identity
- `[USERNAME]` - Target user (defaults to root if not specified)
- `--help` - Display help information
- `--version` - Show version information

## Usage Examples

### Basic User Switching

#### Switching to Root User
```bash
# Switch to root user (requires root password)
su

# Switch to root with login shell (recommended)
su -

# Switch to root with login shell explicitly
su -l

# Switch to root preserving environment
su -p
```

#### Switching to Other Users
```bash
# Switch to specific user (requires that user's password)
su john

# Switch to user with login shell
su - jane

# Switch to system user
su - postgres

# Switch to user with specific shell
su -s /bin/bash www-data
```

### Command Execution

#### Single Command Execution
```bash
# Execute single command as root
su -c "apt-get update"

# Execute command as specific user
su -c "whoami" john

# Execute command with quotes
su -c 'echo "Hello World" > /root/test.txt'

# Execute multiple commands
su -c "cd /var/log && ls -la | head -10"

# Execute command with environment variables
su -c 'echo $HOME' john
```

#### Script Execution
```bash
# Execute script as different user
su -c "/path/to/script.sh" www-data

# Execute script with arguments
su -c "/usr/local/bin/backup.sh --full" backup

# Execute with preserved environment
su -p -c "python3 /app/manage.py migrate"
```

### Environment Management

#### Preserving Environment
```bash
# Keep current environment when switching
su -p

# Preserve specific variables
HOME=$HOME su -p john

# Switch with minimal environment changes
su -m john
```

#### Login Shell Benefits
```bash
# Full login shell (loads .profile, .bashrc, etc.)
su -

# Compare environments
env | grep USER
su -c 'env | grep USER'

# Login shell gets user's complete environment
su - john -c 'echo $PATH'
```

## Practical Examples

### System Administration

#### System Maintenance
```bash
# System update as root
su -c "apt update && apt upgrade -y"

# Service management
su -c "systemctl restart nginx"

# Log rotation
su -c "logrotate -f /etc/logrotate.conf"

# Disk cleanup
su -c "find /tmp -type f -mtime +7 -delete"

# User management
su -c "useradd -m newuser && passwd newuser"
```

#### File System Operations
```bash
# Mount file systems
su -c "mount -t ext4 /dev/sdb1 /mnt/data"

# Change file ownership
su -c "chown -R john:john /home/john/files"

# Set permissions
su -c "chmod 755 /usr/local/bin/script"

# Create system directories
su -c "mkdir -p /var/log/app && chown app:app /var/log/app"
```

### Database Administration

#### PostgreSQL Operations
```bash
# Switch to postgres user
su - postgres

# Create database as postgres
su - postgres -c "createdb new_database"

# Run psql commands
su - postgres -c "psql -c 'SELECT version();'"

# Database backup
su - postgres -c "pg_dump mydb > backup.sql"
```

#### MySQL Operations
```bash
# Switch to mysql user (if configured)
su - mysql

# Execute MySQL commands
su - mysql -c "mysql -u root -e 'SHOW DATABASES;'"

# Run MySQL scripts
su - mysql -c "mysql < setup.sql"
```

### Application Deployment

#### Web Application Management
```bash
# Deploy as application user
su - www-data -c "git pull origin main"

# Install dependencies
su - nodeuser -c "npm install --production"

# Run application
su - appuser -c "python3 manage.py runserver"

# Application restart
su - appuser -c "systemctl --user restart myapp"
```

#### Configuration Management
```bash
# Edit config files as correct user
su - nginx -c "vi /etc/nginx/nginx.conf"

# Test configuration
su - nginx -c "nginx -t"

# Reload service
su -c "systemctl reload nginx"
```

### Development Environment

#### Build Processes
```bash
# Build as specific user
su - builduser -c "make && make install"

# Compile with specific environment
su - compiler -c "CC=gcc-9 make"

# Clean build
su - builduser -c "make clean && make distclean"
```

#### Testing
```bash
# Run tests as different user
su - testuser -c "pytest /app/tests/"

# Integration tests
su - integration -c "./run_integration_tests.sh"

# Performance testing
su - perfuser -c "ab -n 1000 http://localhost/"
```

## Advanced Usage

### Shell Customization

#### Custom Shell Selection
```bash
# Use specific shell
su -s /bin/zsh root

# Use shell with arguments
su -s /bin/bash -- -c "echo 'Custom shell'"

# Temporary shell change
su -s /bin/sh john

# Check available shells
su -s /bin/false john -c "echo 'This wont work'"
```

#### Shell Options
```bash
# Shell with specific options
su -s /bin/bash -- -c "set -x; ls -la"

# Interactive shell with specific profile
su -s /bin/bash -- --profile

# Restricted shell
su -s /bin/rbash restricteduser
```

### Environment Manipulation

#### Advanced Environment Control
```bash
# Set specific environment for command
su -l john -c "env VAR=value python script.py"

# Multiple environment variables
su -l john -c "PATH=$PATH:/custom/bin java -jar app.jar"

# Environment file
su -l john -c "source .env && python app.py"

# Clear environment except specific variables
su -l -c "env -i HOME=/home/john USER=john bash"
```

#### User Context Management
```bash
# Switch with specific working directory
su -l john -c "cd /project && make"

# Maintain current directory
su -p -c "pwd && ls"

# Switch with specific umask
su -l john -c "umask 022 && touch testfile"
```

### Security Practices

#### Secure Session Management
```bash
# Limited command execution
su -c "specific_command --option" restricted_user

# Time-limited session
su -c "timeout 300s long_running_process"

# Log user switching
su -l john -c "logger 'User switched by $(whoami)'"

# Audit trail
su -l john -c "auditctl -w /etc/passwd -p wa -k passwd_changes"
```

#### Password-less Switching
```bash
# Configure sudo for passwordless su (use with caution)
echo "username ALL=(ALL) NOPASSWD: /bin/su" >> /etc/sudoers

# Switch via sudo (recommended)
sudo su - username

# Direct command execution
sudo -u username command
```

## Integration and Automation

### Shell Scripts

#### Automated User Switching Script
```bash
#!/bin/bash
# Multi-user task automation script

TARGET_USER="appuser"
LOG_FILE="/var/log/task_runner.log"

log_action() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to execute commands as target user
execute_as_user() {
    local cmd="$1"
    local user="${2:-$TARGET_USER}"

    log_action "Executing as $user: $cmd"
    su - "$user" -c "$cmd"

    if [ $? -eq 0 ]; then
        log_action "Command succeeded"
        return 0
    else
        log_action "Command failed"
        return 1
    fi
}

# Example usage
execute_as_user "cd /app && git pull origin main"
execute_as_user "npm install --production"
execute_as_user "systemctl --user restart myapp"

log_action "Task automation completed"
```

#### Service Management Script
```bash
#!/bin/bash
# Service management with proper user context

SERVICE_NAME="myapp"
SERVICE_USER="appuser"

start_service() {
    echo "Starting $SERVICE_NAME as $SERVICE_USER..."
    su - "$SERVICE_USER" -c "systemctl --user start $SERVICE_NAME"
    sleep 2

    if su - "$SERVICE_USER" -c "systemctl --user is-active $SERVICE_NAME"; then
        echo "Service started successfully"
    else
        echo "Failed to start service"
        exit 1
    fi
}

stop_service() {
    echo "Stopping $SERVICE_NAME..."
    su - "$SERVICE_USER" -c "systemctl --user stop $SERVICE_NAME"
}

case "$1" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        stop_service
        sleep 1
        start_service
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
```

### Cron Job Integration

#### Scheduled Tasks as Different Users
```bash
# Crontab entries for different users
# Edit root crontab
su -c "crontab -e"

# Add entries like:
# 0 2 * * * /usr/local/bin/backup.sh
# */5 * * * * su - appuser -c "/app/check_status.sh"

# User-specific cron
su - appuser -c "crontab -e"

# System-wide cron with user specification
echo "0 3 * * * appuser /usr/local/bin/daily_cleanup.sh" >> /etc/crontab
```

## Troubleshooting

### Common Issues

#### Authentication Problems
```bash
# Check if user exists
su -l username -c "whoami"

# Verify user account status
su -l username -c "id"

# Check password authentication
su -l username -c "echo 'Authentication successful'"

# Debug authentication issues
su -l username -c "logger 'Test authentication'"
```

#### Environment Issues
```bash
# Compare environments
env > current_env.txt
su -l username -c "env" > user_env.txt
diff current_env.txt user_env.txt

# Check PATH differences
echo $PATH
su -l username -c "echo \$PATH"

# Verify shell loading
su -l username -c "echo \$SHELL"
su -l username -c "which bash"
```

#### Permission Issues
```bash
# Check user permissions
su -l username -c "ls -la /desired/directory"

# Test file access
su -l username -c "touch /test/file.txt"

# Check group membership
su -l username -c "groups"

# Verify sudoers configuration (if applicable)
su -l username -c "sudo -l"
```

#### Shell Issues
```bash
# Test different shells
su -s /bin/bash username
su -s /bin/sh username
su -s /bin/zsh username

# Check shell availability
su -l username -c "cat /etc/shells"

# Test login shell
su -l username -c "echo 'Login shell test'"
```

### Debugging Techniques

#### Session Debugging
```bash
# Verbose mode (if available)
su -v username 2>&1 | tee su_debug.log

# Trace command execution
su -l username -c "set -x; command"

# Monitor process creation
su -l username -c "ps aux | grep username"

# Check system logs for su attempts
tail -f /var/log/auth.log | grep su
```

## Related Commands

- [`sudo`](/docs/commands/user-management/sudo) - Execute commands as another user with authentication
- [`login`](/docs/commands/user-management/login) - Sign in to the system
- [`whoami`](/docs/commands/system-info/whoami) - Display current user name
- [`id`](/docs/commands/system-info/id) - Display user and group information
- [`passwd`](/docs/commands/user-management/passwd) - Change user password
- [`useradd`](/docs/commands/user-management/useradd) - Create new user account
- [`usermod`](/docs/commands/user-management/usermod) - Modify user account
- [`groups`](/docs/commands/system-info/groups) - Display group membership
- [`exit`](/docs/commands/system-info/exit) - Exit current shell

## Best Practices

1. **Use login shells** (`su -`) for complete environment initialization
2. **Prefer `sudo`** over `su` for better auditing and control
3. **Limit su usage** to specific administrative tasks
4. **Log su attempts** for security monitoring
5. **Use passwordless sudo** instead of su when possible
6. **Validate target user** before switching
7. **Clean up sessions** properly with `exit`
8. **Avoid su in scripts** when sudo is more appropriate
9. **Use specific users** for application services
10. **Monitor su usage** in system logs

## Security Tips

1. **Never share passwords** - use sudo instead
2. **Restrict su access** in `/etc/pam.d/su`
3. **Use wheel group** for administrative access
4. **Enable logging** of all su attempts
5. **Regularly audit** privileged account usage
6. **Use strong passwords** for all accounts
7. **Limit login shells** for system accounts
8. **Implement account locking** for inactive users
9. **Use two-factor authentication** where possible
10. **Monitor for suspicious** su activity patterns

## Performance Tips

1. **Use login shells** to avoid environment conflicts
2. **Minimize session time** as privileged users
3. **Batch commands** using `su -c` for multiple operations
4. **Avoid nested su calls** - use sudo instead
5. **Clean environment** for predictable behavior
6. **Use appropriate shells** for specific tasks
7. **Cache credentials** carefully in automated scripts
8. **Profile su performance** in automated workflows

The `su` command remains a fundamental tool for user switching and temporary privilege escalation in Unix/Linux systems. While `sudo` is often preferred for modern system administration due to its enhanced security features and auditing capabilities, `su` provides simple, direct access to other user environments and remains essential for many administrative tasks and system maintenance procedures.