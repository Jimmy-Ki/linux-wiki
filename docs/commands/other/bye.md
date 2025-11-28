---
title: bye - Terminate ftp session and exit
sidebar_label: bye
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bye - Terminate ftp session and exit

The `bye` command is a fundamental FTP client command that terminates the current FTP session and exits the FTP client program. It performs a graceful disconnection from the remote FTP server, ensuring that all active transfers are completed properly, temporary files are cleaned up, and network resources are released. The `bye` command is equivalent to the `quit` command in FTP and provides a clean way to end FTP sessions, whether initiated interactively or through automated scripts. This command is essential for maintaining proper connection hygiene and preventing orphaned sessions on FTP servers.

## Basic Syntax

```bash
bye
```

## Command Behavior

- Terminates the current FTP session gracefully
- Closes the control connection to the FTP server
- Completes any pending data transfers before disconnection
- Releases all network resources and file descriptors
- Exits the FTP client program
- Returns to the calling shell or command prompt

## Usage Examples

### Basic Session Termination

#### Standard Exit from FTP
```bash
# Interactive FTP session
$ ftp ftp.example.com
Connected to ftp.example.com.
Name (ftp.example.com:johndoe): johndoe
Password: [password]
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful.
150 Opening ASCII mode data connection.
drwxr-xr-x   2 user     group          4096 Nov 28 10:30 public_html
drwxr-xr-x   2 user     group          4096 Nov 28 10:30 uploads
226 Transfer complete.
ftp> bye
221 Goodbye.
$
```

#### Quick Exit After Authentication
```bash
# Connect and immediately exit
$ ftp -n ftp.example.com
Connected to ftp.example.com.
ftp> user anonymous
guest@example.com
230 Login successful.
ftp> bye
221 Goodbye.
```

### Script-Based FTP Operations

#### Automated File Transfer and Exit
```bash
#!/bin/bash
# Automated FTP download script

FTP_SERVER="files.example.com"
FTP_USER="downloader"
FTP_PASS="downloadpass"
REMOTE_FILE="data.zip"
LOCAL_DIR="/downloads"

# Create FTP command script
cat > /tmp/ftp_commands.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
binary
hash
get $REMOTE_FILE
bye
EOF

# Execute FTP commands
cd "$LOCAL_DIR"
ftp -n < /tmp/ftp_commands.txt

# Cleanup
rm -f /tmp/ftp_commands.txt
echo "File transfer completed and session terminated"
```

#### Bulk File Upload with Clean Exit
```bash
#!/bin/bash
# Upload multiple files and exit cleanly

FTP_SERVER="upload.example.com"
FTP_USER="uploader"
FTP_PASS="uploadpass"
REMOTE_DIR="/incoming"
LOCAL_FILES=("*.log" "*.txt" "*.dat")

# Create comprehensive FTP script
cat > /tmp/batch_upload.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd $REMOTE_DIR
binary
prompt off
hash
mput ${LOCAL_FILES[@]}
status
bye
EOF

# Execute upload
ftp -n < /tmp/batch_upload.txt

# Verify completion
if [ $? -eq 0 ]; then
    echo "All files uploaded successfully"
    rm -f /tmp/batch_upload.txt
else
    echo "Upload failed, check script"
fi
```

### Session Management

#### Conditional Exit Based on Transfer Status
```bash
#!/bin/bash
# Exit FTP session based on conditions

FTP_SERVER="critical.example.com"
FTP_USER="operator"
FTP_PASS="operatorpass"
REQUIRED_FILE="critical_config.xml"

# FTP script with conditional logic
cat > /tmp/conditional_ftp.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd /config
ls $REQUIRED_FILE
get $REQUIRED_FILE
!if [ ! -f $REQUIRED_FILE ]; then echo "File download failed"; exit 1; fi
status
bye
EOF

# Execute with error checking
ftp -n < /tmp/conditional_ftp.txt
exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo "Session completed successfully"
else
    echo "Session terminated with errors"
fi

rm -f /tmp/conditional_ftp.txt
```

#### Timeout-Based Exit
```bash
#!/bin/bash
# FTP session with automatic timeout

FTP_SERVER="timeout.example.com"
FTP_USER="user"
FTP_PASS="pass"
TIMEOUT_DURATION=300  # 5 minutes

# Create FTP script with timeout handling
cat > /tmp/timeout_ftp.txt << 'EOF'
open timeout.example.com
user user pass
binary
tick
get large_file.dat
bye
EOF

# Execute with timeout
timeout $TIMEOUT_DURATION ftp -n < /tmp/timeout_ftp.txt
exit_code=$?

case $exit_code in
    0)
        echo "FTP session completed normally"
        ;;
    124)
        echo "FTP session timed out"
        ;;
    *)
        echo "FTP session failed with exit code: $exit_code"
        ;;
esac

rm -f /tmp/timeout_ftp.txt
```

## Practical Examples

### System Administration

#### Automated Backup Collection
```bash
#!/bin/bash
# Collect backups from multiple FTP servers with clean exit

servers=("backup1.example.com" "backup2.example.com" "backup3.example.com")
backup_user="backupuser"
backup_pass="backuppass"
local_backup_dir="/data/collected_backups"
date_prefix=$(date +%Y%m%d)

mkdir -p "$local_backup_dir"

for server in "${servers[@]}"; do
    echo "Processing $server..."

    # Create server-specific backup script
    cat > /tmp/backup_${server}.txt << EOF
open $server
user $backup_user $backup_pass
binary
hash
prompt off
cd /backups
mget ${date_prefix}*.tar.gz ${date_prefix}*.sql
mdelete ${date_prefix}*.tar.gz ${date_prefix}*.sql
status
bye
EOF

    # Execute backup collection
    server_dir="$local_backup_dir/$(echo $server | cut -d. -f1)"
    mkdir -p "$server_dir"
    cd "$server_dir"

    ftp -n < /tmp/backup_${server}.txt

    if [ $? -eq 0 ]; then
        echo "Backup collected from $server"
    else
        echo "Failed to collect backup from $server"
    fi

    rm -f /tmp/backup_${server}.txt
done

echo "Backup collection completed for all servers"
```

#### Log Rotation and Archive
```bash
#!/bin/bash
# FTP log rotation with proper session termination

FTP_SERVER="logs.example.com"
LOG_USER="loguser"
LOG_PASS="logpass"
LOG_DIR="/var/log/archive"
RETENTION_DAYS=30

# Create log rotation script
cat > /tmp/log_rotation.txt << EOF
open $FTP_SERVER
user $LOG_USER $LOG_PASS
cd $LOG_DIR
binary
prompt off
hash

# Archive today's logs
mget $(date +%Y%m%d)*.log

# Delete old logs
mdelete $(date -d "$RETENTION_DAYS days ago" +%Y%m%d)*.log

status
bye
EOF

# Execute log rotation
cd "/local/log/archive"
ftp -n < /tmp/log_rotation.txt

# Verify operations
today_logs=$(ls -1 $(date +%Y%m%d)*.log 2>/dev/null | wc -l)
echo "Collected $today_logs log files for today"

# Cleanup
rm -f /tmp/log_rotation.txt
```

### Content Distribution

#### Website Publishing with Verification
```bash
#!/bin/bash
# Publish website content with verification and clean exit

FTP_SERVER="ftp.webhost.com"
WEB_USER="webadmin"
WEB_PASS="webpass"
REMOTE_ROOT="/public_html"
LOCAL_SITE="dist/"

# Create publishing script
cat > /tmp/publish_site.txt << EOF
open $FTP_SERVER
user $WEB_USER $WEB_PASS
cd $REMOTE_ROOT
binary
hash

# Backup current version
!mkdir -p backup
mget *.html *.css *.js
!mv *.html *.css *.js backup/

# Upload new version
mput $LOCAL_SITE/*.html $LOCAL_SITE/*.css $LOCAL_SITE/*.js

# Verify upload
ls -la
status
bye
EOF

# Execute publishing
cd "$LOCAL_SITE"
ftp -n < /tmp/publish_site.txt

# Check if files were uploaded
uploaded_files=$(ftp -n << EOF | grep "^-" | wc -l
open $FTP_SERVER
user $WEB_USER $WEB_PASS
cd $REMOTE_ROOT
ls -la
bye
EOF
)

echo "Published $uploaded_files files to website"
rm -f /tmp/publish_site.txt
```

#### Software Distribution
```bash
#!/bin/bash
# Distribute software packages to multiple FTP mirrors

version="2.1.0"
files=("app-${version}.tar.gz" "app-${version}.zip" "setup-${version}.exe")
mirrors=(
    "mirror1.example.com:/pub/releases"
    "mirror2.example.com:/downloads"
    "mirror3.example.com:/software"
)

for mirror in "${mirrors[@]}"; do
    IFS=':' read -r server path <<< "$mirror"
    echo "Uploading to $server$path..."

    # Create mirror-specific upload script
    cat > /tmp/mirror_upload_${server}.txt << EOF
open $server
user uploader uploadpass
cd $path
binary
hash
mkdir $version
cd $version
mput ${files[@]}
ls -la
status
bye
EOF

    # Execute upload
    ftp -n < /tmp/mirror_upload_${server}.txt

    if [ $? -eq 0 ]; then
        echo "Successfully uploaded to $server"
    else
        echo "Failed to upload to $server"
    fi

    rm -f /tmp/mirror_upload_${server}.txt
done
```

## Advanced Usage

### Error Handling and Recovery

#### Robust FTP Script with Error Handling
```bash
#!/bin/bash
# Robust FTP operation with comprehensive error handling

FTP_SERVER="reliable.example.com"
FTP_USER="user"
FTP_PASS="pass"
MAX_RETRIES=3
RETRY_DELAY=5

# Function to execute FTP with retries
execute_ftp() {
    local command_file=$1
    local retry_count=0
    local success=0

    while [ $retry_count -lt $MAX_RETRIES ]; do
        ftp -n < "$command_file"
        exit_code=$?

        if [ $exit_code -eq 0 ]; then
            success=1
            break
        fi

        retry_count=$((retry_count + 1))
        echo "FTP attempt $retry_count failed, retrying in $RETRY_DELAY seconds..."
        sleep $RETRY_DELAY
    done

    return $success
}

# Create FTP command file
cat > /tmp/robust_ftp.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
binary
hash
get critical_file.dat
put status_update.txt
status
bye
EOF

# Execute with error handling
if execute_ftp /tmp/robust_ftp.txt; then
    echo "FTP operation completed successfully"
else
    echo "FTP operation failed after $MAX_RETRIES attempts"
    exit 1
fi

rm -f /tmp/robust_ftp.txt
```

#### Session State Validation
```bash
#!/bin/bash
# Validate FTP session state before exit

FTP_SERVER="critical.example.com"
FTP_USER="validator"
FTP_PASS="validatorpass"

# Create validation script
cat > /tmp/session_validation.txt << 'EOF'
open critical.example.com
user validator validatorpass
cd /data

# Check if critical file exists
ls critical_config.xml

# Validate file integrity
get critical_config.xml
!md5sum critical_config.xml > local_md5.txt
!rm -f critical_config.xml

# Get remote checksum
quote SITE MD5 critical_config.xml

# Exit with status information
status
bye
EOF

# Execute validation
output_file="/tmp/ftp_validation.log"
ftp -n < /tmp/session_validation.txt > "$output_file" 2>&1

# Parse validation results
if grep -q "Transfer complete" "$output_file"; then
    echo "File validation successful"
else
    echo "File validation failed"
    cat "$output_file"
fi

rm -f /tmp/session_validation.txt "$output_file"
```

### Performance Monitoring

#### Transfer Performance Analysis
```bash
#!/bin/bash
# Monitor FTP transfer performance

FTP_SERVER="speedtest.example.com"
FTP_USER="speedtest"
FTP_PASS="speedtestpass"
TEST_FILE="100mb.test"

# Create performance monitoring script
cat > /tmp/performance_test.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
binary
hash
tick
get $TEST_FILE
status
bye
EOF

# Execute with time measurement
start_time=$(date +%s.%N)
ftp -n < /tmp/performance_test.txt
end_time=$(date +%s.%N)

# Calculate transfer duration
duration=$(echo "$end_time - $start_time" | bc)
file_size=$(stat -f%z 100mb.test 2>/dev/null || stat -c%s 100mb.test 2>/dev/null)
throughput=$(echo "scale=2; $file_size / $duration / 1024 / 1024" | bc)

echo "Transfer completed in ${duration}s"
echo "Average throughput: ${throughput} MB/s"

# Cleanup
rm -f /tmp/performance_test.txt 100mb.test
```

#### Connection Pool Management
```bash
#!/bin/bash
# Manage multiple FTP connections efficiently

servers=("server1.example.com" "server2.example.com" "server3.example.com")
connections=()

# Function to create and close connections
manage_connection() {
    local server=$1
    local action=$2

    case $action in
        "open")
            # Create connection script
            cat > /tmp/conn_${server}.txt << EOF
open $server
user connection connpass
cd /data
!echo "Connection to $server established"
status
bye
EOF
            ftp -n < /tmp/conn_${server}.txt &
            connections+=($!)
            rm -f /tmp/conn_${server}.txt
            ;;
        "close")
            # Close all connections
            for pid in "${connections[@]}"; do
                wait $pid 2>/dev/null
            done
            connections=()
            ;;
    esac
}

# Use connections
for server in "${servers[@]}"; do
    manage_connection "$server" "open"
done

# Wait for all operations to complete
manage_connection "" "close"
echo "All FTP connections closed properly"
```

## Integration and Automation

### System Integration

#### Cron Job for Automated FTP Tasks
```bash
#!/bin/bash
# Automated FTP task for cron execution
# Place in /usr/local/bin/daily_ftp_sync.sh

LOG_FILE="/var/log/ftp_sync.log"
LOCK_FILE="/var/run/ftp_sync.lock"

# Prevent duplicate execution
if [ -f "$LOCK_FILE" ]; then
    echo "$(date): FTP sync already running" >> "$LOG_FILE"
    exit 1
fi

touch "$LOCK_FILE"

# FTP synchronization script
cat > /tmp/cron_ftp_sync.txt << EOF
open sync.example.com
user syncuser syncpass
binary
hash
prompt off
cd /incoming
mget *.new
!mv *.new processed/
mput /local/outgoing/*.ready
!mv /local/outgoing/*.ready /local/sent/
status
bye
EOF

# Execute with logging
echo "$(date): Starting FTP synchronization" >> "$LOG_FILE"
cd /data/ftp
ftp -n < /tmp/cron_ftp_sync.txt >> "$LOG_FILE" 2>&1

# Cleanup
rm -f /tmp/cron_ftp_sync.txt "$LOCK_FILE"
echo "$(date): FTP synchronization completed" >> "$LOG_FILE"
```

#### System Service Integration
```bash
#!/bin/bash
# Systemd service script for FTP monitoring
# /etc/systemd/system/ftp-monitor.service

cat > /tmp/ftp_monitor_service.txt << 'EOF'
[Unit]
Description=FTP Monitor Service
After=network.target

[Service]
Type=simple
User=ftpmonitor
ExecStart=/usr/local/bin/ftp_monitor.sh
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
EOF

# FTP monitoring script
cat > /tmp/ftp_monitor.sh << 'EOF'
#!/bin/bash
FTP_SERVER="monitor.example.com"
MONITOR_INTERVAL=300  # 5 minutes

while true; do
    # Create monitoring script
    cat > /tmp/monitor_check.txt << EOL
open $FTP_SERVER
user monitor monitorpass
cd /status
get health_check.txt
status
bye
EOL

    # Execute health check
    ftp -n < /tmp/monitor_check.txt

    if [ $? -ne 0 ]; then
        logger "FTP health check failed for $FTP_SERVER"
    fi

    rm -f /tmp/monitor_check.txt health_check.txt
    sleep $MONITOR_INTERVAL
done
EOF

chmod +x /tmp/ftp_monitor.sh
```

### Workflow Automation

#### Build and Deploy Pipeline
```bash
#!/bin/bash
# CI/CD pipeline with FTP deployment

build_project() {
    echo "Building project..."
    make clean && make build
    return $?
}

test_project() {
    echo "Running tests..."
    make test
    return $?
}

deploy_to_staging() {
    echo "Deploying to staging..."

    # Create deployment script
    cat > /tmp/staging_deploy.txt << EOF
open staging.example.com
user deploy stagingpass
cd /var/www/staging
binary
hash
prompt off
mput dist/*
status
bye
EOF

    cd dist
    ftp -n < /tmp/staging_deploy.txt
    rm -f /tmp/staging_deploy.txt

    return $?
}

deploy_to_production() {
    echo "Deploying to production..."

    # Production deployment with verification
    cat > /tmp/prod_deploy.txt << EOF
open production.example.com
user deploy prodpass
cd /var/www/html
binary
hash

# Backup current version
!mkdir -p backup
mget index.html
!mv index.html backup/index_$(date +%Y%m%d_%H%M%S).html

# Deploy new version
mput dist/index.html
mput dist/*.css
mput dist/*.js

# Verify deployment
get index.html
!diff index.html dist/index.html && echo "Deployment verified"

status
bye
EOF

    cd dist
    ftp -n < /tmp/prod_deploy.txt
    rm -f /tmp/prod_deploy.txt

    return $?
}

# Execute pipeline
if build_project && test_project && deploy_to_staging; then
    echo "Staging deployment successful, proceeding to production..."
    if deploy_to_production; then
        echo "Production deployment completed successfully"
    else
        echo "Production deployment failed"
        exit 1
    fi
else
    echo "Pipeline failed at staging or earlier"
    exit 1
fi
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
#!/bin/bash
# Debug FTP connection issues

FTP_SERVER="problem.example.com"

# Test with various options
echo "Testing basic connection..."
ftp -nv $FTP_SERVER << EOF
quit
EOF

echo "Testing with passive mode..."
ftp -nvp $FTP_SERVER << EOF
quit
EOF

echo "Testing with debugging..."
ftp -nvd $FTP_SERVER << EOF
quit
EOF

echo "Testing IPv4 only..."
ftp -n4v $FTP_SERVER << EOF
quit
EOF

echo "Testing IPv6 only..."
ftp -n6v $FTP_SERVER << EOF
quit
EOF
```

#### Session Hanging Issues
```bash
#!/bin/bash
# Handle hanging FTP sessions

# Force quit with timeout
timeout 30 ftp -n server.example.com << EOF
user user pass
get large_file.dat
bye
EOF

# Check exit status
if [ $? -eq 124 ]; then
    echo "FTP session timed out, forcing cleanup"
    pkill -f "ftp server.example.com"
fi

# Alternative: Use signal handling
handle_hangup() {
    echo "Hangup signal received, cleaning up..."
    pkill -f "ftp.*server.example.com"
    rm -f /tmp/ftp_*.txt
    exit 1
}

trap handle_hangup SIGHUP SIGINT SIGTERM

# FTP with signal handling
cat > /tmp/safe_ftp.txt << EOF
open server.example.com
user user pass
binary
get file.dat
bye
EOF

ftp -n < /tmp/safe_ftp.txt
```

#### Authentication Failures
```bash
#!/bin/bash
# Debug FTP authentication issues

FTP_SERVER="auth.example.com"
TEST_USER="testuser"
TEST_PASS="testpass"

# Test with explicit user command
echo "Testing explicit authentication..."
ftp -n $FTP_SERVER << EOF | tee /tmp/auth_test.log
user $TEST_USER $TEST_PASS
pwd
bye
EOF

# Check authentication response
if grep -q "530 Login incorrect" /tmp/auth_test.log; then
    echo "Authentication failed - check credentials"
elif grep -q "230 Login successful" /tmp/auth_test.log; then
    echo "Authentication successful"
else
    echo "Unexpected authentication response"
    cat /tmp/auth_test.log
fi

# Test with .netrc bypass
echo "Testing without .netrc..."
ftp -n $FTP_SERVER << EOF
debug
user $TEST_USER $TEST_PASS
quit
EOF

rm -f /tmp/auth_test.log
```

## Security Considerations

### Secure FTP Practices

#### Credential Management
```bash
#!/bin/bash
# Secure credential handling for FTP operations

# Use environment variables instead of hardcoded passwords
export FTP_SERVER="secure.example.com"
export FTP_USER="secureuser"
export FTP_PASS=$(pass show ftp/secureuser)  # Using password manager

# Secure FTP script with credential protection
cat > /tmp/secure_ftp.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
binary
hash
get sensitive_data.enc
delete sensitive_data.enc
status
bye
EOF

# Execute with controlled permissions
chmod 600 /tmp/secure_ftp.txt
ftp -n < /tmp/secure_ftp.txt

# Secure cleanup
shred -u /tmp/secure_ftp.txt
unset FTP_PASS
```

#### Session Security
```bash
#!/bin/bash
# Secure FTP session practices

# Function for secure session termination
secure_ftp_exit() {
    local server=$1
    local user=$2

    echo "Establishing secure session..."
    ftp -n << EOF
open $server
user $user $(pass show ftp/$user)
binary
# Perform secure operations
get secure_file.txt
# Clear command history
!history -c
status
bye
EOF

    echo "Session terminated securely"
}

# Monitor for unusual activity
monitor_ftp_activity() {
    local server=$1
    local threshold=1000  # bytes per second threshold

    # Create monitoring script
    cat > /tmp/monitor.txt << EOF
open $server
user monitor monitorpass
cd /logs
get access.log
!awk '\$5 > $threshold' access.log > suspicious.log
status
bye
EOF

    ftp -n < /tmp/monitor.txt

    if [ -f suspicious.log ]; then
        echo "Unusual activity detected:"
        cat suspicious.log
    fi

    rm -f /tmp/monitor.txt access.log suspicious.log
}
```

## Related Commands

- [`ftp`](/docs/commands/networking/ftp) - File Transfer Protocol client
- [`quit`](/docs/commands/other/quit) - Exit FTP client (equivalent to bye)
- [`close`](/docs/commands/ftp/close) - Close current FTP connection
- [`disconnect`](/docs/commands/ftp/disconnect) - Disconnect from FTP server
- [`sftp`](/docs/commands/networking/sftp) - Secure File Transfer Protocol client
- [`scp`](/docs/commands/networking/scp) - Secure copy over SSH
- [`lftp`](/docs/commands/networking/lftp) - Sophisticated FTP/HTTP client
- [`ncftp`](/docs/commands/networking/ncftp) - Enhanced FTP client
- [`curl`](/docs/commands/networking/curl) - URL transfer tool with FTP support
- [`wget`](/docs/commands/networking/wget) - File download utility with FTP support
- [`exit`](/docs/commands/user-management/exit) - Exit shell or program

## Best Practices

1. **Always use `bye` or `quit`** to properly terminate FTP sessions and prevent orphaned connections
2. **Include status checks** before exiting to verify session completion
3. **Use timeouts** in automated scripts to prevent hanging sessions
4. **Clean up temporary files** immediately after FTP operations
5. **Implement error handling** to handle connection failures gracefully
6. **Log session activities** for audit and troubleshooting purposes
7. **Verify file transfers** before exiting the session
8. **Use proper signal handling** in long-running FTP scripts
9. **Close all data connections** before terminating the control connection
10. **Test session termination** in development before deploying to production

## Performance Tips

1. **Use `hash` or `tick`** for transfer progress monitoring without verbose output
2. **Batch commands** reduce network round trips and improve session efficiency
3. **Set appropriate timeouts** to balance reliability with performance
4. **Use passive mode** (-p) for better performance through firewalls
5. **Minimize startup/shutdown overhead** by reusing connections when possible
6. **Implement connection pooling** for frequent FTP operations
7. **Use binary mode** consistently to avoid conversion overhead
8. **Clean up resources promptly** to prevent memory leaks in long-running scripts
9. **Monitor session duration** and optimize for typical usage patterns
10. **Use efficient file selection** to avoid unnecessary directory listings

The `bye` command is a critical component of FTP session management, ensuring clean termination of file transfer operations and proper resource cleanup. While seemingly simple, proper usage of `bye` in automated scripts and interactive sessions is essential for maintaining system stability, preventing connection leaks, and ensuring reliable file transfer operations in both simple and complex FTP workflows.