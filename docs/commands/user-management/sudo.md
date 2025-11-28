---
title: sudo - Execute Commands as Another User
sidebar_label: sudo
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sudo - Execute Commands as Another User

The `sudo` (superuser do) command allows authorized users to execute commands as another user, typically the root user, with comprehensive security controls, logging, and audit capabilities. It provides fine-grained access control through the sudoers file, enabling administrators to specify exactly which users can run which commands on which machines. Sudo is the standard method for temporary privilege escalation on Linux systems, offering superior security compared to direct root login while maintaining detailed logs for security auditing and compliance.

## Basic Syntax

```bash
sudo [OPTIONS] COMMAND
sudo -u [USER] [OPTIONS] COMMAND
sudo -i [USER]        # Start login shell as specified user
sudo -s [USER]        # Start shell as specified user
```

## Command Options

### User and Group Options
- `-u, --user <USER>` - Run command as specified user (default: root)
- `-g, --group <GROUP>` - Run command as specified group
- `-E, --preserve-env` - Preserve user's environment variables
- `-H, --set-home` - Set HOME environment variable to target user's home directory
- `-i, --login` - Start login shell (equivalent to `su -`)
- `-s, --shell` - Run specified shell
- `-U, --other-user <USER>` - List privileges for specified user

### Authentication Options
- `-k, --reset-timestamp` - Invalidate cached credentials
- `-K, --remove-timestamp` - Remove cached credentials completely
- `-v, --validate` - Update cached credentials without executing command
- `-n, --non-interactive` - Non-interactive mode (no password prompts)
- `-S, --stdin` - Read password from standard input
- `-p, --prompt <PROMPT>` - Use custom password prompt

### Environment Options
- `-i, --login` - Start login shell with complete environment
- `-E, --preserve-env` - Preserve user's environment when executing command
- `--preserve-env=LIST` - Preserve specific environment variables only
- `--set-home` - Set HOME environment variable to target user's home
- `-H, --set-home` - Same as --set-home

### Display Options
- `-l, --list` - List user's privileges
- `-ll, --list` - List privileges in verbose format
- `-L, --list` - List privileges in long format
- `-V, --version` - Show version information
- `-h, --help` - Show help information
- `-b, --background` - Run command in background

### Security Options
- `-a, --auth-type <TYPE>` - Use specific authentication method
- `-r, --role <ROLE>` - Run with specified SELinux role
- `-t, --type <TYPE>` - Run with specified SELinux type

### Sudoers File Options
- `-c, --check` - Check mode (only validate sudoers file)
- `-f, --file <FILE>` - Use alternative sudoers file
- `-C, --close-from <NUM>` - Close file descriptors >= NUM

## Usage Examples

### Basic Sudo Operations

#### Running Commands as Root
```bash
# Execute single command as root
sudo ls /root

# Execute command with arguments
sudo systemctl restart nginx

# Run command in root's home directory
sudo -H echo $HOME

# Execute command and redirect output
sudo ls /root > root_files.txt

# Run command with root environment
sudo -i -c 'whoami && pwd'
```

#### Running Commands as Different Users
```bash
# Execute as specific user
sudo -u www-data whoami

# Execute as specific user and group
sudo -u www-data -g www-data ls /var/www

# Run command as different user with their environment
sudo -i -u postgres psql

# Execute with multiple users (for testing)
sudo -u www-data -g www-data -H bash -c 'whoami && groups'

# Run daemon processes as service users
sudo -u tomcat /opt/tomcat/bin/startup.sh
```

### Shell Access and Interactive Sessions

#### Starting Root Shell
```bash
# Start root shell with environment
sudo -i

# Start root shell without full login
sudo -s

# Start root shell with custom shell
sudo -s /bin/zsh

# Execute multiple commands in shell
sudo -s << 'EOF'
cd /var/log
ls -la
tail -f syslog
EOF

# Interactive root shell with preserved environment
sudo -E bash
```

#### User Shell Access
```bash
# Start login shell as different user
sudo -i -u john

# Start shell as specific user with environment
sudo -i -u mysql mysql -u root

# Switch to service user for debugging
sudo -u www-data -s /bin/bash

# Execute with different user and custom shell
sudo -u git -s /bin/bash -c 'cd /home/git && ls'
```

### Environment Variable Management

#### Preserving Environment
```bash
# Preserve all environment variables
sudo -E env | grep USER

# Preserve specific variables
sudo --preserve-env=HOME,PATH env | grep HOME

# Set custom environment variable
sudo EDITOR=vim visudo

# Multiple environment variables
sudo PATH=/custom/path:$PATH some_command

# Execute with custom home directory
sudo -H bash -c 'echo $HOME'
```

#### Environment Variables in Sudoers
```bash
# Set allowed environment variables in sudoers
Defaults env_keep += "EDITOR VISUAL COLORS"
Defaults env_reset
Defaults !env_keep += "PYTHONPATH"

# Use with custom environment
sudo MYVAR=value command
```

### Authentication and Credential Management

#### Password Cache Control
```bash
# Invalidate cached credentials
sudo -k

# Remove all cached credentials completely
sudo -K

# Validate credentials without running command
sudo -v

# Update credentials with longer timeout
sudo -v

# Test credentials without executing command
sudo -n true
```

#### Non-Interactive Operation
```bash
# Non-interactive execution (for scripts)
sudo -n command_that_might_need_password

# Read password from stdin (for automation)
echo "password" | sudo -S command

# Custom prompt for scripts
sudo -p "Enter admin password: " command

# No output prompt for scripting
sudo -p "" -n command

# Execute from script without tty
echo "mypassword" | sudo -S whoami
```

### Background and Process Management

#### Background Execution
```bash
# Run command in background
sudo -b long_running_script.sh

# Background with no tty allocation
sudo -b -n systemctl restart service

# Background with custom user
sudo -b -u www-data python server.py

# Run daemon processes
sudo -b -u daemon_user /usr/bin/daemon_process

# Background with logging
sudo -b command > /var/log/command.log 2>&1 &
```

#### Process Control
```bash
# Run command and continue
sudo systemctl start nginx &

# Execute and wait for completion
sudo -b service restart && echo "Service restarted"

# Run with timeout
timeout 300 sudo long_running_command

# Execute with nice priority
sudo -n 10 ionice -c2 -n7 /usr/bin/make
```

### Privilege Inspection and Management

#### Listing Privileges
```bash
# List current user's sudo privileges
sudo -l

# List verbose privileges
sudo -ll

# List privileges for specific user
sudo -U john -l

# Check if you can run specific command
sudo -l /usr/bin/systemctl

# List all allowed commands
sudo -l | grep -E "(allowed|may run)"

# Check privileges for host
sudo -l hostname
```

#### Testing Sudo Access
```bash
# Test sudo access without command
sudo -v

# Test specific command permission
sudo -n /usr/bin/apt-get update

# Validate sudoers file
sudo visudo -c

# Check specific user privileges
sudo -U backup_user -l

# Test with dry run
sudo -n true
```

## Configuration and Sudoers File

### Sudoers File Syntax

The `/etc/sudoers` file uses this format:
```bash
# User specification format
user    HOSTS=(USERS:GROUPS) COMMANDS

# Examples
username ALL=(ALL) ALL
username ALL=(root) /usr/bin/systemctl, /usr/bin/service
```

### Alias Definitions

#### User Aliases
```bash
# Define groups of users
User_Alias    ADMINS = john, jane, bob
User_Alias    DEVELOPERS = alice, charlie, david
User_Alias    WEBMASTERS = webadmin1, webadmin2

# Include groups
User_Alias    FULLTIME = %fulltime, %managers
```

#### Host Aliases
```bash
# Define groups of hosts
Host_Alias    WEBSERVERS = web1.example.com, web2.example.com, web3.example.com
Host_Alias    DATABASES = db1.example.com, db2.example.com
Host_Alias    WORKSTATIONS = ws[01-20].example.com

# Use CIDR notation
Host_Alias    INTERNAL_NET = 192.168.1.0/24
Host_Alias    DMZ = 10.0.1.0/24
```

#### Command Aliases
```bash
# Network commands
Cmnd_Alias    NETWORKING = /sbin/ifconfig, /bin/ping, /usr/bin/netstat, /sbin/route
Cmnd_Alias    SOFTWARE = /bin/rpm, /usr/bin/apt-get, /usr/bin/yum, /usr/bin/dnf

# System commands
Cmnd_Alias    SERVICES = /usr/bin/systemctl, /usr/bin/service, /usr/bin/initctl
Cmnd_Alias    STORAGE = /sbin/fdisk, /sbin/mkfs, /sbin/mount, /sbin/umount

# Development tools
Cmnd_Alias    DEVTOOLS = /usr/bin/git, /usr/bin/docker, /usr/bin/npm, /usr/bin/make
Cmnd_Alias    MONITORING = /usr/bin/htop, /usr/bin/iotop, /usr/bin/nethogs
```

#### Runas Aliases
```bash
# Define target users
Runas_Alias   DB_USERS = oracle, mysql, postgres
Runas_Alias   WEB_USERS = www-data, apache, nginx
Runas_Alias   SERVICE = daemon, nobody, systemd-resolve
```

### Common Sudoers Configurations

#### Basic User Permissions
```bash
# Allow wheel group to execute any command
%wheel ALL=(ALL) ALL

# Allow specific user without password
jane ALL=(ALL) NOPASSWD: /usr/bin/apt-get, /usr/bin/systemctl

# Allow developers to run specific commands
%developers ALL=(ALL) /usr/bin/docker, /usr/bin/git, /usr/bin/npm

# Allow read-only access to logs
%logreaders ALL=(ALL) /bin/cat /var/log/*.log, /usr/bin/tail /var/log/*.log

# Allow database administration
%dba ALL=(DB_USERS) /usr/bin/mysql, /usr/bin/psql
```

#### Service Management Permissions
```bash
# Web administrators
%webadmins ALL=(root) /usr/bin/systemctl * nginx, /usr/bin/systemctl * apache2
%webadmins ALL=(root) /bin/chown -R www-data:www-data /var/www/*

# Database administrators
%dbadmins ALL=(root) /usr/bin/systemctl * mysql, /usr/bin/systemctl * postgresql
%dbadmins ALL=(root) /bin/chown -R mysql:mysql /var/lib/mysql

# System administrators
%sysadmins ALL=(ALL) ALL
```

#### Development Environment
```bash
# Docker management
%docker ALL=(root) /usr/bin/docker, /usr/bin/docker-compose
%docker ALL=(root) /bin/chmod +x /usr/local/bin/docker-*

# Node.js development
%nodejs ALL=(root) /usr/bin/npm install -g *, /usr/bin/node *

# Python development
%python ALL=(root) /usr/bin/pip install *, /usr/bin/python3 *
```

### Security Hardening

#### Logging and Auditing
```bash
# Log all sudo commands
Defaults log_output, log_input
Defaults!/usr/bin/su !log_output
Defaults!/usr/bin/sudo !log_output

# Log to custom file
Defaults logfile="/var/log/sudo.log"
Defaults log_year, log_host

# Lecture settings
Defaults lecture="always"
Defaults lecture_file="/etc/sudo_lecture"

# Mail notifications
Defaults mail_always
Defaults mailto="admin@example.com"
Defaults mailsub="Sudo alert on %h"
```

#### Password Policies
```bash
# Require password for all commands
Defaults !authenticate

# Set password timeout (15 minutes)
Defaults timestamp_timeout=15

# Require password every time
Defaults timestamp_timeout=0

# Different timeouts per user
Defaults:john timestamp_timeout=5
Defaults:jane timestamp_timeout=30

# Password prompt customization
Defaults passprompt="Enter %u@%h's password: "
```

#### Environment Security
```bash
# Reset environment
Defaults env_reset

# Keep specific variables
Defaults env_keep += "EDITOR VISUAL COLORS"

# Remove dangerous variables
Defaults env_delete += "LD_PRELOAD LD_LIBRARY_PATH"

# Path security
Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Home directory
Defaults always_set_home
```

## Advanced Usage Patterns

### System Administration

#### Package Management
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install specific packages
sudo apt install nginx mysql-server

# Remove packages
sudo apt remove --purge package_name

# Package search and installation
sudo apt search package && sudo apt install package_name

# Handle dependencies
sudo apt-get -f install

# Repository management
sudo add-apt-repository ppa:user/ppa
sudo apt-key add keyfile
```

#### Service Management
```bash
# Start/stop services
sudo systemctl start nginx
sudo systemctl stop apache2

# Enable/disable services
sudo systemctl enable mysql
sudo systemctl disable nginx

# Service status and logs
sudo systemctl status nginx
sudo journalctl -u nginx -f

# Reload configurations
sudo systemctl reload nginx
sudo systemctl restart apache2

# Service debugging
sudo systemctl daemon-reload
sudo systemctl --failed
```

#### File System Operations
```bash
# Mount operations
sudo mount /dev/sdb1 /mnt/data
sudo umount /mnt/data

# File permissions
sudo chmod 755 /var/www/html
sudo chown www-data:www-data /var/www/html

# System file editing
sudo nano /etc/hosts
sudo vim /etc/fstab

# Disk operations
sudo fdisk /dev/sdb
sudo mkfs.ext4 /dev/sdb1

# File system checks
sudo fsck /dev/sdb1
```

### Network Administration

#### Network Configuration
```bash
# Network interface management
sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip link set eth0 up

# Firewall management
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw reload

# DNS configuration
sudo systemctl restart systemd-resolved
sudo echo "nameserver 8.8.8.8" > /etc/resolv.conf

# Route management
sudo ip route add default via 192.168.1.1
sudo route -n
```

#### Network Debugging
```bash
# Network diagnostics
sudo netstat -tulpn
sudo ss -tulpn
sudo tcpdump -i eth0 port 80

# Port scanning and testing
sudo nmap -sT localhost
sudo hping3 -c 3 google.com

# Bandwidth monitoring
sudo iftop -i eth0
sudo nethogs
```

### Database Administration

#### MySQL/MariaDB
```bash
# Start/stop database
sudo systemctl start mysql
sudo systemctl stop mariadb

# Database operations
sudo mysql -u root -p -e "CREATE DATABASE newdb"
sudo mysqladmin -u root -p create newdb

# Backup and restore
sudo mysqldump -u root -p database > backup.sql
sudo mysql -u root -p database < backup.sql

# Permission management
sudo mysql -u root -p -e "GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost'"
```

#### PostgreSQL
```bash
# Database management
sudo -u postgres createdb newdb
sudo -u postgres dropdb olddb
sudo -u postgres psql -c "CREATE USER newuser WITH PASSWORD 'pass'"

# Service management
sudo systemctl start postgresql
sudo systemctl restart postgresql

# Backup operations
sudo -u postgres pg_dump dbname > backup.sql
sudo -u postgres psql dbname < backup.sql
```

### Development Environment Setup

#### Development Tools Installation
```bash
# Programming languages
sudo apt install python3 python3-pip
sudo apt install nodejs npm
sudo apt install golang-go
sudo apt install openjdk-11-jdk

# Build tools
sudo apt install build-essential
sudo apt install cmake make
sudo apt install git

# Database clients
sudo apt install mysql-client
sudo apt install postgresql-client
sudo apt install redis-tools
```

#### Development Server Management
```bash
# Docker operations
sudo docker run -d --name nginx nginx
sudo docker exec -it container_name bash
sudo docker-compose up -d

# Virtual environments
sudo python3 -m venv /opt/env
sudo chown -R user:user /opt/env

# Development services
sudo systemctl restart redis
sudo systemctl restart elasticsearch
```

## Security and Compliance

### Access Control Patterns

#### Role-Based Access Control
```bash
# Role definitions in sudoers
User_Alias    WEB_ADMINS = alice, bob
User_Alias    DB_ADMINS = charlie, david
User_Alias    SYS_ADMINS = eve, frank

# Web administrators
WEB_ADMINS ALL=(root) /usr/bin/systemctl * nginx, /usr/bin/systemctl * apache2
WEB_ADMINS ALL=(www-data) /bin/chown -R www-data:www-data /var/www/*
WEB_ADMINS ALL=(root) /usr/bin/certbot *

# Database administrators
DB_ADMINS ALL=(root) /usr/bin/systemctl * mysql, /usr/bin/systemctl * postgresql
DB_ADMINS ALL=(mysql, postgres) /usr/bin/mysql, /usr/bin/psql
DB_ADMINS ALL=(root) /usr/bin/mysqldump, /usr/bin/pg_dump
```

#### Time-Based Access Control
```bash
# Restrict sudo to business hours
%staff ALL=(ALL) ALL, !/bin/su, !/usr/bin/passwd
Defaults:%staff timestamp_timeout=0

# Allow weekend maintenance
%maintenance ALL=(ALL) ALL
Defaults:%maintenance lecture="always"
```

#### Command Restrictions
```bash
# Dangerous command restrictions
Defaults!/bin/su !lecture
Defaults!/usr/bin/passwd !lecture
Defaults!/usr/bin/chsh !lecture
Defaults!/usr/bin/vim !lecture

# File editing restrictions
%editors ALL=(root) /usr/bin/vi /etc/*, /usr/bin/nano /etc/*
%editors ALL=(root) /usr/bin/vim /var/log/*, /usr/bin/nano /var/log/*

# Log file access
%auditors ALL=(root) /usr/bin/cat /var/log/*, /usr/bin/tail /var/log/*
%auditors ALL=(root) /usr/bin/less /var/log/*
%auditors ALL=(root) !/usr/bin/rm /var/log/*, !/usr/bin/truncate /var/log/*
```

### Logging and Monitoring

#### Enhanced Logging Configuration
```bash
# Comprehensive logging
Defaults log_input, log_output
Defaults log_host, log_year
Defaults logfile="/var/log/sudo.log"

# I/O logging for specific commands
Defaults!/usr/bin/passwd log_input, log_output
Defaults!/usr/bin/su log_input, log_output

# Mail alerts for critical commands
Defaults mail_always
Defaults mailto="security@example.com"
Defaults mail_badpass
Defaults mailsub="Sudo usage alert on %h"

# Log command execution time
Defaults loglinelen=0
Defaults log_format="%h %e %T"
```

#### Monitoring Sudo Usage
```bash
# Monitor sudo activity in real-time
sudo tail -f /var/log/sudo.log

# Check failed sudo attempts
sudo grep "sudo.*FAILURE" /var/log/auth.log

# Analyze sudo usage patterns
sudo journalctl _COMM=sudo --since="1 day ago"

# Find suspicious sudo activity
sudo grep "sudo.*NOPASSWD" /var/log/auth.log

# Generate sudo usage report
sudo awk '{print $1, $2, $3}' /var/log/sudo.log | sort | uniq -c
```

## Troubleshooting and Debugging

### Common Issues and Solutions

#### Sudoers File Problems
```bash
# Check sudoers syntax
sudo visudo -c

# Test sudoers configuration
sudo -l

# Find syntax errors
sudo visudo -f /etc/sudoers.test

# Validate specific sudoers include
sudo visudo -c -f /etc/sudoers.d/local

# Check included files
grep "#includedir" /etc/sudoers
sudo visudo -c -f /etc/sudoers.d/*
```

#### Permission Issues
```bash
# Check if user is in correct group
groups username
id username

# Verify sudoers entry
sudo grep username /etc/sudoers
sudo grep "^%wheel" /etc/sudoers

# Check command path
which command
sudo which command

# Test specific command
sudo -n command 2>&1
```

#### Authentication Problems
```bash
# Clear sudo cache
sudo -K

# Test password authentication
sudo -v

# Check PAM configuration
sudo grep auth /etc/pam.d/sudo

# Reset timestamps
sudo -k

# Check LDAP/AD authentication (if configured)
sudo -ll
```

#### Environment Issues
```bash
# Check environment variables
sudo env
sudo -E env

# Test PATH issues
echo $PATH
sudo -E bash -c 'echo $PATH'

# Check secure path
sudo visudo -c | grep secure_path

# Test with preserved environment
sudo -E bash -c 'env | grep HOME'
```

### Debugging Techniques

#### Verbose Output
```bash
# Enable verbose sudo
sudo -v

# Use strace with sudo
sudo strace -o trace.log command

# Debug specific sudo issue
sudo -u root bash -x script.sh

# Check sudo configuration
sudo -ll

# Test with alternative sudoers file
sudo -f /path/to/sudoers command
```

#### Security Auditing
```bash
# Find all sudoable commands
sudo -l | grep -v "password"

# Check for NOPASSWD entries
sudo -l | grep NOPASSWD

# Review user permissions
sudo -U username -l

# Audit dangerous commands
grep -E "(su |passwd |chsh |visudo)" /etc/sudoers

# Check for wildcard commands
grep -E "\\*|ALL" /etc/sudoers
```

## Scripting and Automation

### Sudo in Shell Scripts

#### Basic Sudo Scripting
```bash
#!/bin/bash
# Script with sudo operations

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
    echo "Running as root"
elif sudo -n true 2>/dev/null; then
    echo "Running with sudo"
else
    echo "This script requires sudo privileges"
    exit 1
fi

# Use sudo for specific commands
sudo apt update
sudo apt install -y package_name

# Use sudo -E to preserve environment
sudo -E pip install -r requirements.txt

# Use sudo with input redirection
echo "config_value" | sudo tee /etc/config/file.conf
```

#### Automation-Friendly Sudo Usage
```bash
#!/bin/bash
# Automation script with sudo

# Non-interactive mode for automation
if ! sudo -n true 2>/dev/null; then
    echo "Password input required, cannot run in non-interactive mode"
    exit 1
fi

# Batch operations with sudo
for service in nginx apache2 mysql; do
    echo "Restarting $service..."
    sudo systemctl restart "$service"
done

# Sudo with complex commands
sudo bash -c '
    cd /var/log
    find . -name "*.log" -mtime +30 -delete
    systemctl restart rsyslog
'

# Use sudo with environment variables
sudo -E DATABASE_URL="postgres://user:pass@localhost/db" python manage.py migrate
```

### Configuration Management

#### Ansible Integration
```bash
# Using sudo with Ansible-style operations
sudo -E ansible-playbook playbook.yml

# Environment setup for configuration management
sudo -E DEBIAN_FRONTEND=noninteractive apt-get install -y package

# Configuration deployment
sudo cp /path/to/config /etc/application/
sudo chown root:root /etc/application/config
sudo chmod 644 /etc/application/config
```

## Best Practices and Guidelines

### Security Best Practices

#### Principle of Least Privilege
```bash
# Give users only necessary permissions
%webadmins ALL=(root) /usr/bin/systemctl * nginx
%webadmins ALL=(root) /bin/cp /etc/nginx/* /etc/nginx/
%webadmins ALL=(root) /usr/sbin/nginx -t

# Avoid ALL=(ALL) ALL when possible
# Bad: john ALL=(ALL) ALL
# Good: john ALL=(root) /usr/bin/apt-get, /usr/bin/systemctl

# Use command aliases for clarity
Cmnd_Alias WEB_CMDS = /usr/bin/systemctl * nginx, /usr/sbin/nginx
webadmin ALL=(root) WEB_CMDS
```

#### Password Security
```bash
# Set reasonable timeout
Defaults timestamp_timeout=15

# Require password for dangerous commands
Defaults!/bin/su lecture
Defaults!/usr/bin/passwd lecture

# Use lecture for important users
Defaults lecture="always"
Defaults lecture_file="/etc/sudo_lecture"

# Custom password prompts
Defaults passprompt="[sudo] password for %p@%h: "
```

#### Environment Security
```bash
# Reset environment by default
Defaults env_reset

# Keep only necessary variables
Defaults env_keep += "EDITOR LANG LC_ALL"

# Remove dangerous variables
Defaults env_delete += "LD_PRELOAD LD_LIBRARY_PATH PYTHONPATH"

# Secure path
Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
```

### Performance Optimization

#### Efficient Sudo Usage
```bash
# Use sudo -s for multiple commands
sudo -s
# Now run multiple commands as root
apt update
apt install package
systemctl start service
exit

# Use command grouping
sudo bash -c 'cd /var/log && find . -name "*.old" -delete'

# Batch operations to minimize password prompts
sudo bash << 'EOF'
systemctl restart nginx
systemctl restart mysql
systemctl restart apache2
EOF
```

#### Resource Management
```bash
# Limit concurrent sudo sessions
Defaults maxseq=10

# Set reasonable password timeout
Defaults timestamp_timeout=5

# Use I/O logging sparingly (performance impact)
Defaults!/usr/bin/passwd log_input, log_output
Defaults!/usr/bin/su !log_output, !log_input

# Optimize logging
Defaults loglinelen=0
Defaults log_format="%h %e %T"
```

## Integration with Other Tools

### Version Control Integration
```bash
# Git operations with sudo
sudo -u www-data git -C /var/www/html pull origin main
sudo -u www-data git -C /var/www/html config --global user.email "admin@example.com"

# Deployment scripts
sudo -E ./deploy.sh
sudo -u deploy_user ./production_deploy.sh

# File permissions in repositories
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

### Container and Virtualization
```bash
# Docker operations
sudo docker run -d --name container image
sudo docker exec -it container bash
sudo docker-compose up -d

# VM management
sudo virsh start vm_name
sudo virsh shutdown vm_name

# Container networking
sudo docker network create network_name
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

## Related Commands

- [`su`](/docs/commands/user-management/su) - Switch user (traditional method)
- [`visudo`](/docs/commands/user-management/visudo) - Edit sudoers file safely
- [`sudoedit`](/docs/commands/user-management/sudoedit) - Edit files with sudo privileges
- [`runuser`](/docs/commands/user-management/runuser) - Run command with different user
- [`doas`](/docs/commands/user-management/doas) - Alternative sudo implementation (OpenBSD)
- [`pkexec`](/docs/commands/system/pkexec) - PolicyKit execution utility
- [`gksudo`](/docs/commands/user-management/gksudo) - GTK+ frontend for sudo
- [`kdesudo`](/docs/commands/user-management/kdesudo) - KDE frontend for sudo

The `sudo` command is the cornerstone of Linux system administration, providing secure, auditable, and granular control over privileged operations. Its comprehensive configuration options, robust security features, and detailed logging capabilities make it an essential tool for managing multi-user environments while maintaining security and compliance requirements. By following best practices for sudoers configuration and understanding the full range of sudo's capabilities, administrators can create a secure and efficient privilege management system tailored to their specific organizational needs.