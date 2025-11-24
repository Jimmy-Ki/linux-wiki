---
title: scp - Secure Copy
description: Secure file transfer between local and remote systems using SSH protocol
sidebar_label: scp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# scp - Secure Copy

The `scp` command is a secure file transfer utility that uses SSH protocol to encrypt data transmission between local and remote hosts. It provides a simple, secure way to copy files and directories between systems, offering encryption, authentication, and integrity verification. SCP is particularly useful for one-time file transfers and system administration tasks.

## Syntax

```bash
scp [OPTIONS] source_file destination_file
```

## Key Options

### Connection Options
- `-P <port>` - Specify remote port (default: 22)
- `-i <identity_file>` - Use specific private key
- `-F <config_file>` - Specify SSH configuration file
- `-1` - Force protocol version 1
- `-2` - Force protocol version 2 (default)
- `-4` - Use IPv4 addresses only
- `-6` - Use IPv6 addresses only

### File Options
- `-r` - Recursive copy (for directories)
- `-p` - Preserve original file attributes (times, permissions)
- `-q` - Quiet mode (no progress meter)
- `-C` - Enable compression
- `-l <limit>` - Limit bandwidth (Kbit/s)

### Advanced Options
- `-B` - Batch mode (never ask for passwords)
- `-o <ssh_option>` - Pass SSH options
- `-S <program>` - Specify program for encrypted connection

## Usage Examples

### Basic File Operations
```bash
# Copy file from remote to local
scp user@remote.example.com:/path/to/remote/file.txt /local/path/

# Copy file from local to remote
scp local_file.txt user@remote.example.com:/remote/path/

# Copy with different port
scp -P 2222 local_file.txt user@remote.example.com:/remote/path/

# Copy with current username
scp remote.example.com:~/file.txt ./
```

### Directory Operations
```bash
# Copy directory recursively
scp -r user@remote.example.com:/remote/directory/ /local/path/

# Copy local directory to remote
scp -r local_directory/ user@remote.example.com:/remote/path/

# Copy with preserved permissions and timestamps
scp -rp local_directory/ user@remote.example.com:/remote/path/
```

### Multiple File Transfers
```bash
# Copy multiple files to remote
scp file1.txt file2.txt file3.txt user@remote.example.com:/remote/directory/

# Copy from remote using wildcards (requires quotes)
scp "user@remote.example.com:/remote/files/*.txt" /local/path/

# Copy multiple files from remote
scp user@remote.example.com:/remote/file1.txt \
    user@remote.example.com:/remote/file2.txt \
    /local/path/
```

### Key-Based Authentication
```bash
# Use specific private key
scp -i ~/.ssh/custom_key.pem user@remote.example.com:/remote/file.txt ./

# Use AWS PEM file
scp -i aws_key.pem -r user@ec2-instance.amazonaws.com:/remote/path/ ./
```

### Performance Optimization
```bash
# Enable compression for large text files
scp -C large_text_file.txt user@remote.example.com:/remote/path/

# Limit bandwidth to 1000 Kbit/s
scp -l 1000 large_file.zip user@remote.example.com:/remote/path/

# Quiet mode for scripts
scp -q file.txt user@remote.example.com:/remote/path/
```

### Advanced Operations
```bash
# Copy between two remote hosts
scp user1@host1:/remote/file.txt user2@host2:/remote/path/

# Copy with SSH options
scp -o "ConnectTimeout=30" file.txt user@remote.example.com:/remote/path/

# Batch mode (no interactive prompts)
scp -B -r local_directory/ user@remote.example.com:/remote/path/
```

## File Permissions and Attributes

### Preserve File Attributes
```bash
# Preserve permissions, timestamps, and ownership
scp -p source.txt user@remote.example.com:/remote/path/

# Copy with specific umask
scp -p -o "UserKnownHostsFile=/dev/null" file.txt user@remote.example.com:/remote/path/
```

### Handle Special Characters
```bash
# Copy files with spaces (use quotes)
scp "user@remote.example.com:/remote/path/file name.txt" ./

# Copy files with special characters
scp 'user@remote.example.com:/remote/path/file-$special.txt' ./

# Escape special characters
scp user@remote.example.com:'/remote/path/file\ with\ spaces.txt' ./
```

## Progress Monitoring

### Show Transfer Progress
```bash
# Default progress meter
scp large_file.zip user@remote.example.com:/remote/path/

# Verbose output for debugging
scp -v file.txt user@remote.example.com:/remote/path/

# Count files being transferred
scp -r directory/ user@remote.example.com:/remote/path/ | wc -l
```

## Error Handling and Troubleshooting

### Common Issues
```bash
# Ignore host key verification (not recommended for production)
scp -o "StrictHostKeyChecking=no" file.txt user@remote.example.com:/remote/path/

# Use different SSH options
scp -o "ConnectTimeout=60" -o "ServerAliveInterval=30" file.txt user@remote.example.com:/remote/path/

# Force specific cipher
scp -c aes256-ctr file.txt user@remote.example.com:/remote/path/
```

### Bandwidth Management
```bash
# Limit to 1 Mbps
scp -l 1000 large_file.iso user@remote.example.com:/remote/path/

# Resume interrupted transfer (note: SCP doesn't support resume)
# Use rsync instead:
# rsync -avP --partial large_file.iso user@remote.example.com:/remote/path/
```

## Best Practices

### Security
```bash
# Use key-based authentication
scp -i ~/.ssh/id_rsa user@remote.example.com:/remote/file.txt ./

# Limit to specific ciphers
scp -c aes256-ctr,aes192-ctr file.txt user@remote.example.com:/remote/path/

# Use SSH config for complex scenarios
scp -F ~/.ssh/custom_config file.txt user@remote.example.com:/remote/path/
```

### Performance
```bash
# Enable compression for compressible files
scp -C text_files.tar.gz user@remote.example.com:/remote/path/

# Use appropriate bandwidth limits
scp -l 5000 file.txt user@remote.example.com:/remote/path/  # 5 Mbps

# Batch operations for scripting
scp -B -o "BatchMode=yes" file.txt user@remote.example.com:/remote/path/
```

### Scripting
```bash
# Check if transfer was successful
if scp -q file.txt user@remote.example.com:/remote/path/; then
    echo "Transfer successful"
else
    echo "Transfer failed"
    exit 1
fi

# Transfer with logging
scp -v file.txt user@remote.example.com:/remote/path/ > scp.log 2>&1
```

## Comparison with Other Tools

### scp vs rsync
```bash
# scp - Simple one-time transfers
scp file.txt user@remote.example.com:/remote/path/

# rsync - Efficient sync with resume capability
rsync -avz --progress file.txt user@remote.example.com:/remote/path/
```

### scp vs sftp
```bash
# scp - Command-line file transfer
scp file.txt user@remote.example.com:/remote/path/

# sftp - Interactive file management
sftp user@remote.example.com
```

## Common Use Cases

1. **System Administration** - Transfer configuration files
2. **Backup Operations** - Copy important files to remote locations
3. **Deployment** - Upload applications to servers
4. **Log Analysis** - Download log files for analysis
5. **File Synchronization** - One-way synchronization of directories
6. **Automation** - Script-based file transfers

## Tips and Notes

- SCP preserves file permissions and timestamps with `-p` option
- For large transfers, consider using `rsync` for resume capability
- Use `-C` for text files, but avoid it for already compressed files
- SCP copies everything, including hidden files in recursive mode
- Consider using `sftp` for interactive file management
- For automated transfers, set up key-based authentication

## Related Commands

- [`rsync`](/docs/commands/networking/rsync) - Efficient file synchronization with resume
- [`sftp`](/docs/commands/networking/sftp) - Interactive secure file transfer
- [`ssh`](/docs/commands/networking/ssh) - Secure shell client
- [`ssh-keygen`](/docs/commands/networking/ssh-keygen) - Generate SSH keys
- [`nc`](/docs/commands/networking/nc) - Netcat for raw network transfers

SCP provides a secure, straightforward way to transfer files between systems, making it essential for system administrators and developers working with remote servers.