---
title: logout - Exit login shell
sidebar_label: logout
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# logout - Exit login shell

The `logout` command is a built-in shell utility that terminates a login session and returns the user to the login prompt or closes the terminal connection. It signals the end of a user's interactive shell session, performs cleanup operations, and properly terminates all user processes associated with the session. The `logout` command is essential for maintaining system security and ensuring proper resource management in multi-user environments.

## Basic Syntax

```bash
logout
```

## Command Behavior

- Terminates the current login shell
- Executes shell logout procedures and cleanup scripts
- Closes all file descriptors and resources associated with the session
- Signals the parent process (login manager or terminal) of session termination
- Returns to login prompt or closes terminal connection

## Usage Examples

### Basic Logout Operations

#### Standard Logout
```bash
# Simple logout from login shell
logout

# Logout with confirmation (some shells)
logout && echo "Session ended"

# Force logout from non-login shell (use exit)
exit
```

#### Different Shell Environments
```bash
# From bash login shell
logout

# From zsh login shell
logout

# From sh/dash login shell
logout

# From fish login shell
logout
```

### Session Management

#### Multiple Session Handling
```bash
# Check current sessions before logout
who
w

# Logout from current session only
logout

# Logout from specific session (requires privileges)
pkill -u username -t pts/2
```

#### Remote Session Logout
```bash
# SSH session logout
logout

# Telnet session logout
logout

# Serial console logout
logout

# Screen session detachment then logout
screen -d
logout
```

### Security and Cleanup

#### Secure Logout Procedures
```bash
# Clear screen before logout
clear && logout

# Clear command history before logout
history -c && logout

# Remove temporary files before logout
rm -rf /tmp/$USER/* && logout

# Kill background processes before logout
jobs -p | xargs kill && logout
```

#### Monitoring Session Activity
```bash
# Check running processes before logout
ps -u $USER

# Check for background jobs before logout
jobs

# Check for locked files before logout
lsof -u $USER

# Comprehensive session check before logout
who && ps -u $USER && jobs && logout
```

### Terminal and GUI Logout

#### Terminal Sessions
```bash
# Logout from terminal emulator
logout

# Close terminal after logout
exit

# Logout from virtual console (tty)
logout

# Switch to another console before logout
chvt 2
```

#### Desktop Environment Integration
```bash
# From terminal in GUI environment
logout

# Graphical session logout (GNOME)
gnome-session-quit

# Graphical session logout (KDE)
qdbus org.kde.ksmserver /KSMServer logout

# System-wide logout command
gnome-session-save --kill
```

## Advanced Usage

### Shell Configuration and Logout Hooks

#### Bash Logout Configuration
```bash
# Add to ~/.bash_logout
echo "Goodbye, $USER! You were logged in at $(date)"
clear

# Cleanup temporary directories
rm -rf /tmp/$USER-*

# Close specific applications
pkill -u $USER firefox
```

#### Zsh Logout Configuration
```bash
# Add to ~/.zlogout
echo "Session ended: $(date)"
# Perform cleanup operations
rm -f ~/.ssh/ssh_auth_sock
```

#### System-wide Logout Scripts
```bash
# /etc/profile.d/logout_cleanup.sh
if [ "$SHLVL" -eq 1 ]; then
    echo "Cleaning up session for $USER"
    # System-wide cleanup operations
fi
```

### Session Persistence and Recovery

#### Saving Session State
```bash
# Save current directory to file
pwd > ~/.last_directory

# Save running processes
ps -u $USER > ~/.last_processes

# Create session snapshot
who > ~/.last_login_info

# Complete logout with session save
pwd > ~/.last_directory && logout
```

#### Session Recovery
```bash
# Restore last directory on login
cd $(cat ~/.last_directory 2>/dev/null) || cd $HOME

# Check previous session activity
if [ -f ~/.last_processes ]; then
    echo "Previous session processes:"
    cat ~/.last_processes
fi
```

### Automated Logout Scenarios

#### Idle Session Timeout
```bash
# Set automatic logout after inactivity
export TMOUT=600  # 10 minutes

# Monitor idle time and logout
if [ $(($(date +%s) - $(stat -c %X ~/.bash_history))) -gt 3600 ]; then
    logout
fi
```

#### Scheduled Logout
```bash
# Schedule logout at specific time
echo "logout" | at 17:00

# Logout after specific duration
timeout 3600 bash -c "read; logout"
```

#### Conditional Logout
```bash
# Logout if specific conditions met
if [ $(date +%H) -ge 18 ]; then
    echo "Working hours ended, logging out..."
    logout
fi

# Logout if system resources low
if [ $(free -m | awk 'NR==2{print $3+0}') -gt 8000 ]; then
    echo "High memory usage, logging out..."
    logout
fi
```

## Integration and Automation

### Shell Script Integration

#### Automated Logout Script
```bash
#!/bin/bash
# Comprehensive logout script

SESSION_LOG="$HOME/.session.log"
BACKUP_DIR="$HOME/.session_backup"

# Create session log entry
echo "$(date): Session started for $USER" >> "$SESSION_LOG"

# Backup important files
mkdir -p "$BACKUP_DIR"
cp ~/.bash_history "$BACKUP_DIR/history_$(date +%Y%m%d_%H%M%S)"

# Cleanup operations
rm -rf /tmp/$USER-*
find ~/Downloads -type f -mtime +7 -delete

# Perform logout
echo "$(date): Logging out $USER" >> "$SESSION_LOG"
logout
```

#### Session Monitoring Script
```bash
#!/bin/bash
# Monitor session and logout on specific conditions

monitor_session() {
    while true; do
        # Check for specific processes
        if pgrep -u "$USER" "long_running_process" >/dev/null; then
            echo "Critical process still running, delaying logout"
            sleep 300  # Wait 5 minutes
        else
            break
        fi
    done

    echo "All checks passed, proceeding with logout"
    logout
}

# Run monitoring
monitor_session
```

### System Administration

#### User Session Management
```bash
# List all active user sessions
who -u

# Force logout for specific user
sudo pkill -u username

# Logout all users except root
sudo pkill -u $(who | awk '{print $1}' | grep -v root | sort -u)

# Logout users from specific terminal
sudo pkill -t pts/0
```

#### Session Cleanup Automation
```bash
#!/bin/bash
# System-wide session cleanup script

# Function to perform user cleanup
cleanup_user_session() {
    local user=$1
    echo "Cleaning up session for $user"

    # Remove temporary files
    find /tmp -user "$user" -type f -delete 2>/dev/null

    # Kill lingering processes
    pkill -u "$user" -f "process_name" 2>/dev/null

    # Clear user-specific caches
    rm -rf "/home/$user/.cache/temp/*" 2>/dev/null
}

# Cleanup all logged-out users' sessions
for user in $(who -q | awk '{print $1}' | sort -u); do
    if ! who | grep -q "$user"; then
        cleanup_user_session "$user"
    fi
done
```

## Troubleshooting

### Common Logout Issues

#### Hanging Logout Process
```bash
# Identify hanging processes
ps -ef | grep $USER

# Kill specific processes preventing logout
pkill -f "process_name"

# Force logout with kill
kill -9 $$

# Use killall to terminate all user processes
killall -u $USER
```

#### Resource Cleanup Issues
```bash
# Check for open files
lsof -u $USER

# Check for locked resources
lsof | grep $USER

# Force cleanup of user resources
sudo pkill -u $USER
sudo pkill -9 -u $USER
```

#### Permission Issues
```bash
# Check file permissions in home directory
ls -la $HOME

# Fix ownership issues
sudo chown -R $USER:$USER $HOME

# Check for unwriteable files
find $HOME -type f ! -writable
```

### Debugging Logout Problems

#### Debug Shell Session
```bash
# Enable bash debugging for logout
set -x
logout

# Check shell configuration files
bash -x ~/.bash_logout

# Monitor logout process
strace -e trace=open,read,write logout
```

#### Session State Analysis
```bash
# Check current shell level
echo $SHLVL

# Check login shell status
echo $0
shopt login_shell

# Analyze session variables
env | grep -E "(SESSION|LOGIN|SHELL)"
```

## Security Considerations

### Session Security

#### Secure Logout Procedures
```bash
# Clear sensitive data before logout
history -c && history -w && logout

# Remove authentication tokens
rm -f ~/.Xauthority 2>/dev/null
rm -f ~/.ICEauthority 2>/dev/null

# Clear SSH agent sockets
unset SSH_AUTH_SOCK
rm -f /tmp/ssh-*/agent.* 2>/dev/null

# Comprehensive security logout
history -c && unset HISTFILE && rm -f ~/.bash_history && logout
```

#### Preventing Session Hijacking
```bash
# Set session timeout
export TMOUT=900  # 15 minutes

# Logout on idle timeout
echo 'TMOUT=900; readonly TMOUT; export TMOUT' >> ~/.bashrc

# Monitor for suspicious activity
last -n 10 $USER
```

### Access Control

#### Restricting Logout Access
```bash
# Create restricted logout function
restricted_logout() {
    if [ "$(date +%H)" -ge 9 ] && [ "$(date +%H)" -le 17 ]; then
        echo "Logout not allowed during working hours"
        return 1
    else
        logout
    fi
}

# Replace logout command in restricted environments
alias logout='restricted_logout'
```

## Related Commands

- [`exit`](/docs/commands/user-management/exit) - Exit the current shell
- [`login`](/docs/commands/user-management/login) - Begin a session on the system
- [`su`](/docs/commands/user-management/su) - Substitute user identity
- [`sudo`](/docs/commands/user-management/sudo) - Execute a command as another user
- [`who`](/docs/commands/system-info/who) - Show who is logged on
- [`w`](/docs/commands/system-info/w) - Show who is logged on and what they are doing
- [`last`](/docs/commands/system-info/last) - Show listing of last logged in users
- [`pkill`](/docs/commands/system-info/pkill) - Kill processes by name
- [`killall`](/docs/commands/process-management/killall) - Kill processes by name
- [`nohup`](/docs/commands/system-info/nohup) - Run a command immune to hangups
- [`screen`](/docs/commands/process-management/screen) - Screen manager with VT100/ANSI terminal emulation

## Best Practices

1. **Always use `logout`** for login shells instead of `exit` to ensure proper session termination
2. **Clear sensitive data** before logging out to maintain security
3. **Check for background jobs** before logging out to prevent data loss
4. **Save important work** before initiating logout procedures
5. **Use session management tools** like `screen` or `tmux` for long-running processes
6. **Monitor system resources** before logout to ensure clean termination
7. **Configure automatic timeouts** for enhanced security in shared environments
8. **Document custom logout procedures** for consistency across systems
9. **Test logout scripts** in development before deploying in production
10. **Implement proper logging** for audit and troubleshooting purposes

## Performance Tips

1. **Minimize startup/shutdown scripts** to speed up logout process
2. **Clean temporary files regularly** to reduce logout cleanup time
3. **Avoid heavy background processes** that may delay logout completion
4. **Use efficient session monitoring** to reduce system overhead
5. **Implement incremental cleanup** for large user environments
6. **Optimize file permissions** to prevent delays during logout
7. **Use proper signal handling** in custom scripts for graceful termination
8. **Monitor logout times** and optimize bottlenecks in the process
9. **Implement caching** for frequently accessed logout resources
10. **Use parallel cleanup** operations when appropriate

The `logout` command is a fundamental tool for managing user sessions and maintaining system security. Proper usage ensures clean session termination, resource cleanup, and protection of sensitive data, making it essential for both individual users and system administrators in multi-user Linux environments.