---
title: sudo - Execute Commands as Another User
description: Execute commands as another user, typically root, with security controls
sidebar_label: sudo
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sudo - Execute Commands as Another User

The `sudo` (superuser do) command allows authorized users to execute commands as another user, typically the root user. It provides fine-grained control over who can run what commands on which machines, with comprehensive logging for security auditing. Sudo is the preferred method for temporary privilege escalation on Linux systems.

## Syntax

```bash
sudo [OPTIONS] COMMAND
sudo -u [user] [OPTIONS] COMMAND
sudo -i [user]        # Start login shell
sudo -s [user]        # Start shell
```

## Key Options

### User and Group Options
- `-u, --user <user>` - Run command as specified user (default: root)
- `-g, --group <group>` - Run command as specified group
- `-E, --preserve-env` - Preserve user's environment variables
- `-H, --set-home` - Set HOME environment variable to target user's home
- `-i, --login` - Start login shell (equivalent to su -)
- `-s, --shell` - Run specified shell

### Authentication Options
- `-k, --reset-timestamp` - Invalidate cached credentials
- `-K, --remove-timestamp` - Remove cached credentials completely
- `-v, --validate` - Update cached credentials without command
- `-n, --non-interactive` - Non-interactive mode (no password prompts)
- `-S, --stdin` - Read password from standard input

### Display Options
- `-l, --list` - List user's privileges
- -ll --list - List privileges in verbose format
- `-V, --version` - Show version information
- `-h, --help` - Show help information

### Process Control
- `-b, --background` - Run command in background
- `-p, --prompt <prompt>` - Use custom password prompt

## Usage Examples

### Basic Sudo Usage
```bash
# Execute command as root
sudo ls /root

# Run command with custom user
sudo -u www-data ls /var/www

# Execute with specific group
sudo -g developers whoami
```

### Shell Access
```bash
# Start root shell with environment
sudo -i

# Start shell without full login
sudo -s

# Start shell as different user
sudo -i -u john

# Execute multiple commands in shell
sudo -s << 'EOF'
cd /var/log
ls -la
tail -f syslog
EOF
```

### Environment Handling
```bash
# Preserve environment variables
sudo -E env | grep USER

# Set specific environment variable
sudo USER=john whoami

# Set HOME to target user's home
sudo -H echo $HOME
```

### Background Execution
```bash
# Run command in background
sudo -b long_running_script.sh

# Background with no tty allocation
sudo -b -n systemctl restart service
```

### Privilege Inspection
```bash
# List current user's sudo privileges
sudo -l

# List verbose privileges
sudo -ll

# List privileges for specific user
sudo -U john -l
```

### Authentication Control
```bash
# Invalidate cached credentials
sudo -k

# Remove all cached credentials
sudo -K

# Validate credentials without running command
sudo -v

# Non-interactive execution (for scripts)
sudo -n command_that_might_need_password
```

## Configuration

### /etc/sudoers Format
The sudoers file uses this syntax:
```
# User specification
user    HOSTS=(USERS) COMMANDS

# Alias definitions
User_Alias    ADMINS = john, jane, bob
Host_Alias    WEBSERVERS = web1, web2, web3
Cmnd_Alias    NETWORKING = /sbin/ifconfig, /bin/ping, /usr/bin/netstat

# Examples
ADMINS      ALL=(ALL) ALL
john        ALL=(root) /usr/bin/systemctl, /usr/bin/service
webadmin    WEBSERVERS=(www-data) ALL
developers  ALL=(ALL) NOPASSWD: /usr/bin/git, /usr/bin/docker
```

### Common Sudoers Directives
```bash
# Use visudo to edit safely
sudo visudo

# Allow wheel group to execute any command
%wheel ALL=(ALL) ALL

# Allow specific user without password
jane ALL=(ALL) NOPASSWD: /usr/bin/apt-get, /usr/bin/systemctl

# Allow developers to run specific commands
%developers ALL=(ALL) /usr/bin/docker, /usr/bin/git, /usr/bin/npm

# Allow read-only access to logs
%logreaders ALL=(ALL) /bin/cat /var/log/*.log, /usr/bin/tail /var/log/*.log
```

### Security Best Practices
```bash
# Restrict sudo access to specific users
%admin ALL=(ALL) ALL

# Use command aliases for clarity
Cmnd_Alias WEB_CMDS = /usr/bin/systemctl restart nginx, /usr/bin/systemctl reload nginx
webadmin ALL=(root) WEB_CMDS

# Log all sudo commands
Defaults log_output, log_input
Defaults!/usr/bin/su !log_output
Defaults!/usr/bin/sudo !log_output

# Require TTY for sudo
Defaults requiretty

# Set password timeout (5 minutes)
Defaults timestamp_timeout=5
```

## Advanced Usage

### Chain Commands
```bash
# Execute command string with semicolons
sudo 'cd /var/log && ls -la'

# Execute script with arguments
sudo /path/to/script.sh arg1 arg2

# Pipeline with sudo
cat file.txt | sudo tee /etc/config/new_file
```

### Custom Prompts
```bash
# Set custom password prompt
sudo -p "Enter admin password: " whoami

# Script-friendly prompt
sudo -p "" -n command  # No prompt for scripting
```

### Sudo with Scripts
```bash
# Execute script with arguments as root
sudo -u root bash -c 'cd /root && ./setup.sh --production'

# Run command and redirect output
sudo command > output_file 2>&1
```

## Logging and Auditing

### View Sudo Logs
```bash
# View sudo logs in auth.log
sudo grep sudo /var/log/auth.log

# View recent sudo usage
sudo journalctl _COMM=sudo

# Check failed sudo attempts
sudo grep "sudo.*FAILURE" /var/log/auth.log
```

### Enhanced Logging Configuration
```bash
# Log to custom file
Defaults logfile="/var/log/sudo.log"

# Log input and output
Defaults log_input, log_output
Defaults!/usr/bin/passwd !log_output  # Don't log password input
```

## Security Considerations

### Password Policies
```bash
# Set password timeout to 15 minutes
Defaults timestamp_timeout=15

# Require password every time
Defaults timestamp_timeout=0

# Never cache passwords
Defaults !authenticate
```

### Access Control
```bash
# Restrict sudo to specific commands only
backup_user ALL=(root) /usr/bin/rsync, /bin/tar

# Allow read-only access
auditor ALL=(root) /usr/bin/cat /var/log/*, /usr/bin/less /var/log/*

# Environment variable control
Defaults env_reset
Defaults env_keep += "EDITOR VISUAL"
```

### Time-Based Access
```bash
# Allow sudo only during business hours
john ALL=(ALL) ALL, !/bin/su
```

## Common Patterns

### System Administration
```bash
# Package management
sudo apt update
sudo apt install package_name
sudo systemctl restart service_name

# File operations in privileged locations
sudo cp config.conf /etc/nginx/
sudo chmod 644 /etc/config/file
sudo chown www-data:www-data /var/www/html
```

### Development Environment
```bash
# Docker operations
sudo docker run -d container_name
sudo docker exec -it container_id /bin/bash

# Development tools
sudo npm install -g package_name
sudo gem install gem_name
```

### User Management
```bash
# Add user to groups
sudo usermod -aG sudo,docker username
sudo groupadd newgroup
sudo useradd -m newuser
```

## Troubleshooting

### Common Issues
```bash
# Check sudoers file syntax
sudo visudo -c

# Verify sudo configuration
sudo -ll

# Test specific command permission
sudo -U username -l

# Clear sudo cache
sudo -K
```

### Permission Denied
```bash
# Check if user is in correct group
groups username

# Verify sudoers entry
sudo grep username /etc/sudoers

# Check command path
which command
sudo command
```

## Exit Codes

- `0` - Success
- `1` - Syntax error or general failure
- `2` - Invalid command or configuration

## Related Commands

- [`su`](/docs/commands/user-management/su) - Switch user
- [`visudo`](/docs/commands/user-management/visudo) - Edit sudoers file safely
- [`sudoedit`](/docs/commands/user-management/sudoedit) - Edit files with sudo
- [`runuser`](/docs/commands/user-management/runuser) - Run command with different user
- [`doas`](/docs/commands/user-management/doas) - Alternative sudo implementation (OpenBSD)

The `sudo` command is essential for secure system administration, providing granular control over privileged access while maintaining comprehensive audit trails for security compliance.