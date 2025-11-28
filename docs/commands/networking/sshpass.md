---
title: sshpass - Non-interactive SSH Password Provider
sidebar_label: sshpass
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# sshpass - Non-interactive SSH Password Provider

The `sshpass` command is a utility designed to provide passwords to SSH, SCP, and SFTP commands non-interactively. It solves the problem of automated SSH operations where interactive password input would normally be required. While SSH key-based authentication is generally preferred for security, sshpass fills the gap for situations where keys cannot be used, such as legacy systems, automated scripts, or temporary access scenarios. The utility works by monitoring the SSH client's password prompt and automatically providing the password when needed.

## Basic Syntax

```bash
sshpass [-f filename | -d number | -p password | -e] [SSH_OPTIONS] command [command_args]
```

## Password Input Methods

### From Command Line (Insecure)
- `-p password` - Provide password as command line argument (NOT recommended)

### From File
- `-f filename` - Read password from the first line of a file

### From File Descriptor
- `-d number` - Read password from specified file descriptor

### From Environment Variable
- `-e` - Read password from the `SSHPASS` environment variable

## Common Options

### Password Input Options
- `-p password` - Password provided as command line argument
- `-f filename` - Password from file (first line)
- `-d number` - Password from file descriptor
- `-e` - Password from environment variable `SSHPASS`

### Verbose Options
- `-v` - Verbose mode - show password (insecure, for debugging)
- `-V` - Display version information and exit
- `-h` - Display help message and exit

## Usage Examples

### Basic Password Authentication

#### Using Password from Command Line (Insecure)
```bash
# Direct password (NOT recommended for security)
sshpass -p 'mypassword' ssh user@hostname

# Copy files with password
sshpass -p 'mypassword' scp file.txt user@hostname:/remote/path/

# Execute remote commands
sshpass -p 'mypassword' ssh user@hostname 'ls -la'
```

#### Using Password from File (Recommended)
```bash
# Create password file with restricted permissions
echo 'mypassword' > ~/.sshpass
chmod 600 ~/.sshpass

# Use password from file
sshpass -f ~/.sshpass ssh user@hostname

# Copy with password from file
sshpass -f ~/.sshpass scp -r /local/dir user@hostname:/remote/dir/

# Execute commands on multiple servers
sshpass -f ~/.sshpass ssh user@hostname1 'uptime'
sshpass -f ~/.sshpass ssh user@hostname2 'uptime'
```

#### Using Environment Variable
```bash
# Set environment variable
export SSHPASS='mypassword'

# Use environment variable
sshpass -e ssh user@hostname

# Temporary environment variable
SSHPASS='mypassword' sshpass -e ssh user@hostname 'df -h'

# Export in shell script
export SSHPASS=$(cat /path/to/secure/password)
sshpass -e sftp user@hostname
```

#### Using File Descriptor
```bash
# Read password from file descriptor 3
exec 3<<< 'mypassword'
sshpass -d 3 ssh user@hostname

# Close file descriptor when done
exec 3<&-
```

### File Transfer Operations

#### SCP File Transfers
```bash
# Upload single file
sshpass -f ~/.sshpass scp local_file.txt user@hostname:~/remote_file.txt

# Download file
sshpass -f ~/.sshpass scp user@hostname:~/remote_file.txt ./local_file.txt

# Recursive directory upload
sshpass -f ~/.sshpass scp -r ./local_dir/ user@hostname:~/remote_dir/

# Download with progress
sshpass -f ~/.sshpass scp -v user@hostname:~/large_file.zip ./

# Copy between remote systems
sshpass -f ~/.sshpass scp -3 user@host1:~/file.txt user@host2:~/file.txt
```

#### SFTP Operations
```bash
# Interactive SFTP with password
sshpass -f ~/.sshpass sftp user@hostname

# Batch SFTP commands
echo 'get remote_file.txt local_file.txt' | sshpass -f ~/.sshpass sftp user@hostname

# Upload with SFTP
echo 'put local_file.txt remote_file.txt' | sshpass -f ~/.sshpass sftp user@hostname

# Multiple SFTP commands
cat << EOF | sshpass -f ~/.sshpass sftp user@hostname
cd /remote/directory
ls -la
get file1.txt
put file2.txt
bye
EOF
```

### Advanced SSH Operations

#### Port Forwarding
```bash
# Local port forwarding
sshpass -f ~/.sshpass ssh -L 8080:localhost:80 user@hostname -N

# Remote port forwarding
sshpass -f ~/.sshpass ssh -R 8080:localhost:80 user@hostname -N

# Dynamic port forwarding (SOCKS proxy)
sshpass -f ~/.sshpass ssh -D 1080 user@hostname -N

# Port forwarding with background execution
sshpass -f ~/.sshpass ssh -L 3306:localhost:3306 user@hostname -f -N
```

#### SSH Tunneling
```bash
# SSH tunnel for database access
sshpass -f ~/.sshpass ssh -L 5432:db-server:5432 jump-server -N

# Reverse tunnel for access behind NAT
sshpass -f ~/.sshpass ssh -R 2222:localhost:22 user@public-server -N

# Multi-hop SSH through jump hosts
sshpass -f ~/.sshpass ssh -J jumpuser@jumphost finaluser@finalhost
```

## Practical Examples

### System Administration

#### Automated Backup Scripts
```bash
#!/bin/bash
# Automated backup script using sshpass

BACKUP_DIR="/backup"
SOURCE_DIR="/home/user/documents"
TARGET_HOST="backup.example.com"
TARGET_USER="backup"
PASS_FILE="/secure/backup.pass"

# Create local backup
tar -czf /tmp/backup_$(date +%Y%m%d).tar.gz "$SOURCE_DIR"

# Transfer to backup server
sshpass -f "$PASS_FILE" scp /tmp/backup_$(date +%Y%m%d).tar.gz \
    "${TARGET_USER}@${TARGET_HOST}:${BACKUP_DIR}/"

# Clean up local backup
rm /tmp/backup_$(date +%Y%m%d).tar.gz

echo "Backup completed successfully"
```

#### Remote System Monitoring
```bash
#!/bin/bash
# Remote system health check

SERVERS=("server1.example.com" "server2.example.com" "server3.example.com")
PASS_FILE="/secure/monitor.pass"

for server in "${SERVERS[@]}"; do
    echo "=== Checking $server ==="
    sshpass -f "$PASS_FILE" ssh user@"$server" << 'EOF'
    echo "Uptime: $(uptime)"
    echo "Disk usage:"
    df -h | grep -E '^/dev/'
    echo "Memory usage:"
    free -h
    echo "Load average:"
    cat /proc/loadavg
    echo "---"
EOF
done
```

#### Configuration Management
```bash
#!/bin/bash
# Deploy configuration files to multiple servers

CONFIG_DIR="/etc/app/config"
SERVERS=("web1.example.com" "web2.example.com" "app1.example.com")
PASS_FILE="/secure/deploy.pass"

for server in "${SERVERS[@]}"; do
    echo "Deploying to $server..."

    # Create backup of existing config
    sshpass -f "$PASS_FILE" ssh deploy@"$server" \
        "sudo cp -r $CONFIG_DIR $CONFIG_DIR.bak.$(date +%Y%m%d)"

    # Copy new configuration
    sshpass -f "$PASS_FILE" scp -r ./configs/* deploy@"$server":/tmp/

    # Apply configuration with proper permissions
    sshpass -f "$PASS_FILE" ssh deploy@"$server" << EOF
    sudo cp -r /tmp/* $CONFIG_DIR/
    sudo chown -R app:app $CONFIG_DIR
    sudo systemctl reload app
    rm -rf /tmp/configs*
EOF

    echo "Deployment to $server completed"
done
```

### Development Workflow

#### Continuous Integration
```bash
#!/bin/bash
# CI deployment script

DEPLOY_HOST="staging.example.com"
DEPLOY_USER="ci"
PASS_FILE="/etc/ci/pass"
BUILD_DIR="./build"

# Create build archive
tar -czf app.tar.gz -C "$BUILD_DIR" .

# Transfer to staging server
sshpass -f "$PASS_FILE" scp app.tar.gz "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/"

# Deploy on remote server
sshpass -f "$PASS_FILE" ssh "${DEPLOY_USER}@${DEPLOY_HOST}" << EOF
    cd /var/www/staging
    tar -xzf /tmp/app.tar.gz
    sudo chown -R www-data:www-data .
    sudo systemctl reload apache2
    rm /tmp/app.tar.gz

    # Run tests
    ./test.sh
EOF

# Cleanup local
rm app.tar.gz
```

#### Database Operations
```bash
#!/bin/bash
# Remote database management

DB_HOST="db.example.com"
DB_USER="dbadmin"
PASS_FILE="/secure/db.pass"

# Database backup
sshpass -f "$PASS_FILE" ssh "$DB_USER@$DB_HOST" \
    "mysqldump -u root -p --all-databases | gzip > /backup/db_backup_$(date +%Y%m%d).sql.gz"

# Download backup
sshpass -f "$PASS_FILE" scp "$DB_USER@$DB_HOST:/backup/db_backup_$(date +%Y%m%d).sql.gz" ./

# Restore database (upload and restore)
sshpass -f "$PASS_FILE" scp ./restore.sql.gz "$DB_USER@$DB_HOST:/tmp/"
sshpass -f "$PASS_FILE" ssh "$DB_USER@$DB_HOST" \
    "gunzip -c /tmp/restore.sql.gz | mysql -u root -p myapp"
```

## Integration and Automation

### Shell Script Integration

#### Multi-Server Operations
```bash
#!/bin/bash
# Parallel execution on multiple servers

SERVERS=("web1.example.com" "web2.example.com" "api1.example.com")
PASS_FILE="/secure/operations.pass"
COMMAND="sudo systemctl restart nginx"

# Function to execute command on server
execute_on_server() {
    local server=$1
    local cmd=$2

    echo "Executing on $server: $cmd"
    if sshpass -f "$PASS_FILE" ssh admin@"$server" "$cmd"; then
        echo "✓ Success on $server"
    else
        echo "✗ Failed on $server"
    fi
}

# Sequential execution
for server in "${SERVERS[@]}"; do
    execute_on_server "$server" "$COMMAND"
done

# Parallel execution
for server in "${SERVERS[@]}"; do
    execute_on_server "$server" "$COMMAND" &
done
wait
```

#### Batch File Processing
```bash
#!/bin/bash
# Process files across multiple servers

SERVERS=("server1.example.com" "server2.example.com")
REMOTE_DIR="/data/process"
LOCAL_DIR="./processed"
PASS_FILE="/secure/batch.pass"

mkdir -p "$LOCAL_DIR"

for server in "${SERVERS[@]}"; do
    echo "Processing files on $server..."

    # Get list of files
    files=$(sshpass -f "$PASS_FILE" ssh user@"$server" "ls $REMOTE_DIR/*.log 2>/dev/null")

    for file in $files; do
        filename=$(basename "$file")

        # Download file
        echo "Downloading $filename from $server"
        sshpass -f "$PASS_FILE" scp user@"$server":"$file" "$LOCAL_DIR/${server}_${filename}"

        # Process and remove
        sshpass -f "$PASS_FILE" ssh user@"$server" "rm '$file'"
    done
done
```

### Cron Job Integration

#### Scheduled Maintenance
```bash
# Add to crontab with: crontab -e
# 0 2 * * * /usr/local/bin/daily_maintenance.sh

#!/bin/bash
# Daily maintenance script

PASS_FILE="/secure/maintenance.pass"
LOG_FILE="/var/log/maintenance.log"

{
    echo "=== Daily Maintenance - $(date) ==="

    # Update all servers
    servers=("server1.example.com" "server2.example.com")
    for server in "${servers[@]}"; do
        echo "Updating $server..."
        sshpass -f "$PASS_FILE" ssh admin@"$server" "sudo apt update && sudo apt upgrade -y"
    done

    # Clean temporary files
    sshpass -f "$PASS_FILE" ssh admin@"$server" "sudo find /tmp -type f -mtime +7 -delete"

    echo "Maintenance completed"
} >> "$LOG_FILE" 2>&1
```

#### Log Rotation
```bash
#!/bin/bash
# Remote log rotation

PASS_FILE="/secure/logrotate.pass"
LOG_SERVERS=("app1.example.com" "app2.example.com")

for server in "${LOG_SERVERS[@]}"; do
    sshpass -f "$PASS_FILE" ssh admin@"$server" << EOF
    # Rotate application logs
    sudo logrotate /etc/logrotate.d/app

    # Compress old logs
    sudo find /var/log/app -name "*.log.*" -mtime +30 -exec gzip {} \;

    # Remove very old logs
    sudo find /var/log/app -name "*.log.*.gz" -mtime +90 -delete
EOF
done
```

## Security Considerations

### Password File Security

#### Secure Password Storage
```bash
# Create secure password file
echo 'mypassword' > ~/.ssh/sshpass_key
chmod 600 ~/.ssh/sshpass_key
chown $USER:$USER ~/.ssh/sshpass_key

# Use in scripts with error checking
PASS_FILE="$HOME/.ssh/sshpass_key"
if [ ! -f "$PASS_FILE" ] || [ $(stat -c %a "$PASS_FILE") != "600" ]; then
    echo "Password file not secure!"
    exit 1
fi

sshpass -f "$PASS_FILE" ssh user@hostname
```

#### Temporary Password Handling
```bash
# Create temporary secure password file
TMP_PASS=$(mktemp)
chmod 600 "$TMP_PASS"
echo 'temporary_password' > "$TMP_PASS"

# Use password and clean up
sshpass -f "$TMP_PASS" ssh user@hostname "command"
rm -f "$TMP_PASS"

# Or use trap for cleanup
TMP_PASS=$(mktemp)
chmod 600 "$TMP_PASS"
trap 'rm -f "$TMP_PASS"' EXIT
echo 'password' > "$TMP_PASS"
sshpass -f "$TMP_PASS" ssh user@hostname
```

### Security Best Practices

#### Limiting Password Exposure
```bash
# Use environment variables instead of command line
export SSHPASS='password'
sshpass -e ssh user@hostname 'command'
unset SSHPASS

# Use function wrapper
ssh_with_pass() {
    local server=$1
    local command=$2
    sshpass -f ~/.ssh/sshpass_key ssh "$server" "$command"
}

ssh_with_pass user@hostname 'ls -la'
```

#### Audit and Logging
```bash
# Log sshpass usage for audit
log_sshpass() {
    local cmd="sshpass $*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] sshpass executed: $cmd" >> /var/log/sshpass_audit.log
    $cmd
}

log_sshpass -f ~/.ssh/sshpass_key ssh user@hostname
```

## Troubleshooting

### Common Issues

#### Permission Denied Errors
```bash
# Check password correctness
sshpass -f ~/.sshpass ssh -v user@hostname

# Test with verbose output
sshpass -v -f ~/.sshpass ssh user@hostname

# Check file permissions
ls -la ~/.sshpass
# Should be 600 or 400

# Check SSH configuration
ssh -o PreferredAuthentications=password user@hostname
```

#### Connection Timeouts
```bash
# Add connection timeout
sshpass -f ~/.sshpass ssh -o ConnectTimeout=30 user@hostname

# Use ServerAliveInterval for long operations
sshpass -f ~/.sshpass ssh -o ServerAliveInterval=60 user@hostname 'long_running_command'

# Debug connection issues
sshpass -f ~/.sshpass ssh -vvv user@hostname
```

#### File Transfer Failures
```bash
# Check disk space on remote
sshpass -f ~/.sshpass ssh user@hostname 'df -h'

# Check file permissions
sshpass -f ~/.sshpass ssh user@hostname 'ls -la /target/directory'

# Use verbose SCP output
sshpass -f ~/.sshpass scp -v file.txt user@hostname:/path/

# Test with small file first
echo "test" > test.txt
sshpass -f ~/.sshpass scp test.txt user@hostname:/tmp/
```

### Performance Optimization

#### Batch Operations
```bash
# Use SSH multiplexing for multiple connections
sshpass -f ~/.sshpass ssh -f -N -M user@hostname
# Now subsequent connections will reuse the socket
sshpass -f ~/.sshpass ssh user@hostname 'command1'
sshpass -f ~/.sshpass ssh user@hostname 'command2'
sshpass -f ~/.sshpass ssh -O exit user@hostname
```

#### Parallel Processing
```bash
# Process multiple files in parallel
process_file() {
    local file=$1
    local server=$2
    sshpass -f ~/.sshpass scp "$file" "$server:/tmp/"
}

export -f process_file
export SSHPASS_FILE=~/.sshpass

find ./files -name "*.log" | \
    xargs -P 4 -I {} bash -c 'process_file "{}" "user@hostname"'
```

## Related Commands

- [`ssh`](/docs/commands/networking/ssh) - Secure shell client
- [`scp`](/docs/commands/networking/scp) - Secure copy program
- [`sftp`](/docs/commands/networking/sftp) - Secure file transfer program
- [`ssh-keygen`](/docs/commands/networking/ssh-keygen) - SSH key generation and management
- [`ssh-agent`](/docs/commands/networking/ssh-agent) - SSH authentication agent
- [`ssh-add`](/docs/commands/networking/ssh-add) - Add private keys to ssh-agent
- [`rsync`](/docs/commands/networking/rsync) - Remote file synchronization
- [`expect`](/docs/commands/development/expect) - Automate interactive applications

## Best Practices

1. **Use SSH keys instead of passwords** when possible for better security
2. **Store passwords in secure files** with 600 permissions, never on command line
3. **Use environment variables** for temporary password storage
4. **Implement proper error handling** in scripts using sshpass
5. **Audit and log sshpass usage** for security compliance
6. **Clean up temporary files** containing passwords immediately
7. **Use SSH multiplexing** for multiple connections to reduce authentication overhead
8. **Test password files** before production use
9. **Restrict sshpass usage** to necessary automated tasks only
10. **Consider alternatives** like Ansible, Fabric, or configuration management tools

## Security Considerations

1. **Never store passwords in scripts** or version control systems
2. **Use file permissions 600** for password files
3. **Avoid command-line passwords** (visible in process lists)
4. **Use dedicated service accounts** with limited privileges
5. **Implement password rotation** policies
6. **Monitor for unauthorized usage** through system logs
7. **Consider SSH key authentication** as a more secure alternative
8. **Use temporary passwords** for one-time operations
9. **Encrypt password files** when storing them long-term
10. **Document security policies** for automated authentication

The `sshpass` command is a practical solution for automated SSH authentication when key-based authentication is not feasible. While it provides convenience for scripting and automation, it should be used with careful attention to security best practices and proper password management procedures. For production environments, consider using SSH keys or configuration management tools whenever possible.