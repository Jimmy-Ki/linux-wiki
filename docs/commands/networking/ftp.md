---
title: ftp - File Transfer Protocol client
sidebar_label: ftp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ftp - File Transfer Protocol client

The `ftp` command is the classic File Transfer Protocol (FTP) client that allows users to transfer files between a local system and a remote FTP server. It provides both interactive and command-line modes for uploading, downloading, and managing files on remote systems. FTP operates in a client-server model using separate control (port 21) and data connections, supporting both active and passive transfer modes. While considered less secure than modern alternatives like SFTP or FTPS, FTP remains widely used for anonymous file distribution and legacy system compatibility.

## Basic Syntax

```bash
ftp [OPTIONS] [HOSTNAME]
```

### Interactive Mode Commands

```bash
# Basic FTP commands (used after connection)
open HOSTNAME [PORT]     # Connect to remote host
user USERNAME [PASSWORD]  # Login with credentials
close                    # Close current connection
quit                     # Exit FTP client
```

## Command Line Options

### Connection Options
- `-4` - Connect only using IPv4
- `-6` - Connect only using IPv6
- `-A` - Enable active mode (default)
- `-P` - Enable passive mode
- `-p` - Enable passive mode (alternative)
- `-e` - Disable readline support
- `-i` - Turn off interactive prompting during multiple file transfers
- `-n` - Disable auto-login (don't read .netrc file)
- `-v` - Verbose mode (show all responses from server)
- `-V` - Disable verbose mode
- `-d` - Enable debugging mode

### Authentication Options
- `-u` - Force authentication before connection
- `-w` - Use specified buffer size for data transfers
- `-g` - Disable filename globbing

## FTP Interactive Commands

### Connection Management
- `open HOST [PORT]` - Connect to remote FTP server
- `close` - Close current connection
- `disconnect` - Same as close
- `user USERNAME [PASSWORD]` - Send new user information
- `account [PASSWORD]` - Send account command
- `reconnect` - Reconnect to the last host
- `quit` - Exit FTP client
- `bye` - Same as quit

### File Transfer Commands
- `get REMOTE_FILE [LOCAL_FILE]` - Download single file
- `mget REMOTE_FILES...` - Download multiple files
- `put LOCAL_FILE [REMOTE_FILE]` - Upload single file
- `mput LOCAL_FILES...` - Upload multiple files
- `recv REMOTE_FILE [LOCAL_FILE]` - Same as get
- `send LOCAL_FILE [REMOTE_FILE]` - Same as put
- `append LOCAL_FILE [REMOTE_FILE]` - Append to remote file

### Directory Operations
- `cd [DIRECTORY]` - Change remote directory
- `cdup` - Change to parent directory
- `lcd [DIRECTORY]` - Change local directory
- `pwd` - Print working directory (remote)
- `lpwd` - Print working directory (local)
- `mkdir DIRECTORY` - Create remote directory
- `rmdir DIRECTORY` - Remove remote directory
- `delete REMOTE_FILE` - Delete remote file
- `mdelete REMOTE_FILES...` - Delete multiple remote files

### Directory Listing
- `dir [REMOTE_DIR] [LOCAL_FILE]` - List remote directory contents
- `ls [REMOTE_DIR] [LOCAL_FILE]` - List files (simpler format)
- `mlsd [REMOTE_DIR]` - Machine-readable directory listing
- `mlst [REMOTE_PATH]` - Machine-readable file listing

### File Information
- `status` - Show current status
- `remotehelp [COMMAND]` - Get help from remote server
- `help [COMMAND]` - Show FTP client help
- `quote COMMAND` - Send arbitrary command to server
- `literal COMMAND` - Same as quote

### Transfer Settings
- `binary` - Set binary transfer mode (default)
- `ascii` - Set ASCII transfer mode
- `tenex` - Set Tenex transfer mode
- `type [TYPE]` - Show/set transfer type
- `mode [MODE]` - Show/set transfer mode
- `struct [STRUCT]` - Show/set file structure

### Transfer Control
- `passive` - Enter passive transfer mode
- `active` - Enter active transfer mode
- `prompt` - Toggle interactive prompting
- `glob` - Toggle filename globbing
- `hash` - Toggle hash mark printing for transferred data
- `tick` - Toggle printing byte counter
- `progress` - Toggle progress bar

### Debug and Utility
- `debug` - Toggle debugging mode
- `trace` - Toggle packet tracing
- `verbose` - Toggle verbose mode
- `bell` - Toggle bell on file transfer completion
- `site COMMAND` - Send site-specific command
- `system` - Show remote system type

## Usage Examples

### Basic Connection and Authentication

#### Connecting to FTP Servers
```bash
# Connect to anonymous FTP server
ftp ftp.example.com

# Connect with specific port
ftp ftp.example.com 2121

# Connect with verbose output
ftp -v ftp.example.com

# Connect using IPv6
ftp -6 ftp6.example.com

# Connect without auto-login
ftp -n ftp.example.com
```

#### Authentication Methods
```bash
# Interactive authentication (after connection)
Connected to ftp.example.com.
Name (ftp.example.com:johndoe): johndoe
Password: [password]

# Anonymous login
Name (ftp.example.com): anonymous
Password: guest@example.com

# Skip .netrc file
ftp -n ftp.example.com
user johndoe
Password: [password]
```

### File Transfer Operations

#### Downloading Files
```bash
# Download single file
ftp> get document.txt

# Download with different local name
ftp> get remote_file.txt local_copy.txt

# Download multiple files
ftp> mget *.txt

# Download entire directory (requires scripting)
ftp> prompt off
ftp> mget directory/*
ftp> prompt on

# Download in binary mode
ftp> binary
ftp> get image.jpg
```

#### Uploading Files
```bash
# Upload single file
ftp> put local_file.txt

# Upload with different remote name
ftp> put local_file.txt remote_name.txt

# Upload multiple files
ftp> mput *.txt

# Upload in ASCII mode (text files)
ftp> ascii
ftp> put text_file.txt

# Append to remote file
ftp> append local.log remote.log
```

### Directory Management

#### Navigation and Listing
```bash
# Change remote directory
ftp> cd /pub/uploads

# Change to parent directory
ftp> cdup

# Show current remote directory
ftp> pwd

# List directory contents
ftp> ls

# Detailed directory listing
ftp> dir

# Save listing to local file
ftp> dir > listing.txt

# Change local directory
ftp> lcd /local/downloads
```

#### Directory Operations
```bash
# Create remote directory
ftp> mkdir new_folder

# Remove remote directory (must be empty)
ftp> mkdir old_folder
ftp> cd old_folder
ftp> mdelete *
ftp> cd ..
ftp> rmdir old_folder

# Delete remote files
ftp> delete old_file.txt
ftp> mdelete *.tmp

# Delete multiple files with prompting
ftp> prompt on
ftp> mdelete *.log
```

### Transfer Mode Configuration

#### Binary vs ASCII Transfers
```bash
# Set binary mode for executable and media files
ftp> binary
200 Type set to I.

# Upload image file
ftp> put photo.jpg

# Set ASCII mode for text files
ftp> ascii
200 Type set to A.

# Upload text file with line ending conversion
ftp> put document.txt
```

#### Active vs Passive Mode
```bash
# Enable passive mode (works through firewalls)
ftp> passive
Passive mode on.

# Enable active mode
ftp> active
Active mode on.

# Connect with passive mode from command line
ftp -p ftp.example.com
```

## Practical Examples

### System Administration

#### Automated File Backups
```bash
#!/bin/bash
# FTP backup script

FTP_SERVER="backup.example.com"
FTP_USER="backupuser"
FTP_PASS="backuppass"
LOCAL_DIR="/data/backup"
REMOTE_DIR="/backups/$(date +%Y%m%d)"

# Create FTP script
cat > /tmp/ftp_commands.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
mkdir $REMOTE_DIR
cd $REMOTE_DIR
binary
prompt off
mput *.tar.gz *.sql
quit
EOF

# Execute backup
ftp -n < /tmp/ftp_commands.txt

# Clean up
rm /tmp/ftp_commands.txt
echo "Backup completed to $REMOTE_DIR"
```

#### Log File Collection
```bash
#!/bin/bash
# Collect logs from multiple servers

servers=("server1.example.com" "server2.example.com" "server3.example.com")
date_prefix=$(date +%Y%m%d)
local_dir="/logs/collected"

mkdir -p "$local_dir"

for server in "${servers[@]}"; do
    echo "Collecting logs from $server..."

    # Create FTP commands
    cat > /tmp/ftp_logs.txt << EOF
open $server
anonymous guest@example.com
cd /var/log
binary
prompt off
mget $date_prefix*.log
quit
EOF

    # Execute collection
    mkdir -p "$local_dir/$server"
    cd "$local_dir/$server"
    ftp -n < /tmp/ftp_logs.txt

    echo "Logs collected from $server"
done

rm /tmp/ftp_logs.txt
```

### Software Distribution

#### Publishing Updates
```bash
#!/bin/bash
# Publish software updates to FTP server

FTP_SERVER="updates.example.com"
FTP_USER="publisher"
FTP_PASS="publisherpass"
LOCAL_BUILD="dist/"
REMOTE_DIR="/updates/v2.1.0"

# Create release directory
cat > /tmp/ftp_publish.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
mkdir $REMOTE_DIR
cd $REMOTE_DIR
binary
prompt off
put release_notes.txt
put changelog.md
put setup.exe
put app.zip
ls -la
quit
EOF

ftp -n < /tmp/ftp_publish.txt

# Create symlink for latest version
cat > /tmp/ftp_symlink.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd /updates
site RMDIR latest
site SYMLINK latest v2.1.0
quit
EOF

ftp -n < /tmp/ftp_symlink.txt

rm -f /tmp/ftp_publish.txt /tmp/ftp_symlink.txt
echo "Release v2.1.0 published successfully"
```

### Content Distribution

#### Web Content Upload
```bash
#!/bin/bash
# Upload website content

FTP_SERVER="ftp.webhost.com"
FTP_USER="website"
FTP_PASS="webpass"
LOCAL_SITE="public_html/"
REMOTE_ROOT="/public_html"

# Create FTP upload script
cat > /tmp/ftp_upload.txt << EOF
open $FTP_SERVER
user $FTP_USER $FTP_PASS
cd $REMOTE_ROOT
binary
prompt off

# Upload HTML files (ASCII)
ascii
mput *.html *.css *.js

# Upload images (Binary)
binary
mput images/*.jpg images/*.png images/*.gif

# Set directory permissions
quote SITE CHMOD 755 .
quote SITE CHMOD 644 *.html *.css *.js
quit
EOF

ftp -n < /tmp/ftp_upload.txt

rm /tmp/ftp_upload.txt
echo "Website uploaded successfully"
```

## Advanced Usage

### Batch Operations

#### Non-Interactive File Transfers
```bash
# Create command file for batch operations
cat > batch_commands.txt << EOF
open archive.example.com
anonymous
cd /pub/software/linux
binary
hash
get kernel-5.15.0.tar.gz
get gcc-11.2.0.tar.gz
bye
EOF

# Execute batch transfer
ftp -n < batch_commands.txt

# Alternative using pipe
echo -e "open ftp.example.com\nanonymous\ncd /pub\nbinary\nget file.tar.gz\nbye" | ftp -n
```

#### Bulk Directory Synchronization
```bash
#!/bin/bash
# Synchronize local directory with remote

local_dir="/data/sync"
remote_dir="/remote/sync"
ftp_server="sync.example.com"

cd "$local_dir"

# Create sync script
cat > /tmp/sync_ftp.txt << EOF
open $ftp_server
user syncuser syncpass
cd $remote_dir
binary
hash
prompt off

# Upload new/modified files
mput *.dat *.txt *.json

# Download missing files
lcd $local_dir
mget *.missing
quit
EOF

ftp -n < /tmp/sync_ftp.txt
rm /tmp/sync_ftp.txt
```

### Network Configuration

#### Firewall and NAT Configuration
```bash
# Connect through NAT using passive mode
ftp -p ftp.nated-server.com

# Force active mode for specific firewall
cat > /tmp/ftp_active.txt << EOF
open ftp.server.com
user username password
active
binary
get large_file.iso
quit
EOF

ftp -n < /tmp/ftp_active.txt
```

#### IPv6 FTP Operations
```bash
# Connect using IPv6
ftp -6 ftp6.server.com

# Enable debugging for IPv6 issues
ftp -dv6 ftp6.server.com

# Show server capabilities
ftp> quote FEAT
```

### Security Considerations

#### Using .netrc for Credentials
```bash
# Create .netrc file (secure permissions)
cat > ~/.netrc << EOF
machine ftp.example.com
login johndoe
password secretpassword
machine backup.example.com
login backupuser
password backuppass
EOF

# Set proper permissions
chmod 600 ~/.netrc

# Connect using .netrc credentials
ftp ftp.example.com
```

#### Encrypted FTP through SSH Tunnel
```bash
# Create SSH tunnel for FTP
ssh -L 2121:ftp.server.com:21 user@ssh.server.com

# Connect through tunnel
ftp -p localhost 2121
```

## Troubleshooting

### Connection Issues

#### Common Connection Problems
```bash
# Test connection with debugging
ftp -dv ftp.example.com

# Test specific port
ftp ftp.example.com 2121

# Check firewall issues (use passive mode)
ftp -p ftp.example.com

# IPv4 fallback when IPv6 fails
ftp -4 ftp.example.com

# Force IPv6 when IPv4 fails
ftp -6 ftp6.example.com
```

#### Authentication Problems
```bash
# Disable auto-login to test credentials manually
ftp -n ftp.example.com
user testuser
Password: [enter password]

# Test with explicit user command
echo "open ftp.example.com" | ftp -n
user testuser
```

### Transfer Issues

#### File Corruption Problems
```bash
# Ensure binary mode for non-text files
ftp> binary
ftp> get executable_file

# Check file integrity after transfer
md5sum local_file
md5sum remote_file

# Use hash marks to monitor transfer
ftp> hash
Hash mark printing on (1024 bytes/hash mark).
```

#### Performance Issues
```bash
# Monitor transfer progress
ftp> progress
Progress meter enabled.

# Use hash marks for visual feedback
ftp> hash

# Try passive mode if active mode is slow
ftp> passive

# Check server system type
ftp> system
215 UNIX Type: L8
```

### Script Automation

#### Error Handling in Scripts
```bash
#!/bin/bash
# Robust FTP script with error handling

ftp_server="ftp.example.com"
logfile="/tmp/ftp_transfer.log"

# Execute FTP with logging
ftp -n $ftp_server > $logfile 2>&1 << EOF
user username password
binary
hash
get important_file.dat
bye
EOF

# Check transfer success
if grep -q "Transfer complete" $logfile; then
    echo "File transferred successfully"
else
    echo "Transfer failed. Check $logfile for details"
    cat $logfile
fi
```

## Related Commands

- [`sftp`](/docs/commands/networking/sftp) - Secure File Transfer Protocol client
- [`scp`](/docs/commands/networking/scp) - Secure copy over SSH
- [`lftp`](/docs/commands/networking/lftp) - Sophisticated FTP/HTTP client
- [`ncftp`](/docs/commands/networking/ncftp) - Enhanced FTP client
- [`wget`](/docs/commands/networking/wget) - File download utility
- [`curl`](/docs/commands/networking/curl) - URL transfer tool
- [`rsync`](/docs/commands/networking/rsync) - Remote file synchronization
- [`ssh`](/docs/commands/networking/ssh) - Secure shell client
- [`telnet`](/docs/commands/networking/telnet) - Telnet client
- [`nc`](/docs/commands/networking/nc) - Netcat utility

## Best Practices

1. **Use passive mode** (-p) when behind firewalls or NAT
2. **Set appropriate transfer mode** (binary for executables, ASCII for text)
3. **Disable auto-login** (-n) for security in scripts
4. **Use .netrc with proper permissions** (600) for stored credentials
5. **Enable verbose mode** (-v) for debugging connection issues
6. **Use hash marks** (hash command) to monitor large transfers
7. **Test transfers** with checksum verification for critical files
8. **Implement error checking** in automated scripts
9. **Consider secure alternatives** like SFTP for sensitive data
10. **Use specific timeouts** for unreliable network connections

## Performance Tips

1. **Passive mode** often performs better through firewalls
2. **Binary mode** is faster (no character conversion)
3. **Disable prompting** (prompt off) for bulk transfers
4. **Use hash marks** to track progress without verbose output
5. **Batch commands** reduce network round trips
6. **Buffer size adjustment** can improve throughput on fast networks
7. **Avoid mget/mput** with large numbers of files in single command
8. **Consider compression** for text files before transfer
9. **Schedule large transfers** during off-peak hours
10. **Monitor network utilization** to avoid congestion

The `ftp` command remains a fundamental tool for file transfer operations, particularly valuable for compatibility with legacy systems, anonymous file distribution, and simple transfer scenarios. While modern secure alternatives should be preferred for sensitive data, FTP's simplicity and widespread support make it an essential utility in any system administrator's toolkit.