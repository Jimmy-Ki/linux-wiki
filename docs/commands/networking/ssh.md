---
title: ssh - Secure Shell Client
description: Secure remote login and command execution client for encrypted communication
sidebar_label: ssh
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ssh - Secure Shell Client

The `ssh` command is a secure client for connecting to remote systems using the SSH protocol. It provides encrypted communication between two untrusted hosts over an insecure network, replacing legacy protocols like telnet, rlogin, and rsh. SSH supports secure shell access, port forwarding, X11 forwarding, and file transfers.

## Syntax

```bash
ssh [OPTIONS] [user@]hostname [command]
```

## Key Options

### Connection Options
- `-p <port>` - Specify remote port (default: 22)
- `-l <user>` - Specify login username
- `-i <identity_file>` - Specify private key file
- `-F <config_file>` - Specify configuration file
- `-b <bind_address>` - Bind to specific local address
- `-V` - Show version information

### Protocol Options
- `-1` - Force protocol version 1
- `-2` - Force protocol version 2 (default)
- `-4` - Use IPv4 addresses only
- `-6` - Use IPv6 addresses only

### Authentication Options
- `-o <option>` - Set configuration option
- `-A` - Enable authentication agent forwarding
- `-a` - Disable authentication agent forwarding
- `-T` - Disable pseudo-tty allocation
- `-t` - Force pseudo-tty allocation

### Compression and Data Options
- `-C` - Enable compression
- `-c <cipher_spec>` - Specify cipher specification
- `-m <mac_spec>` - Specify MAC specification
- `-E <log_file>` - Append debug logs to file

### Execution and Forwarding Options
- `-f` - Go to background before command execution
- `-n` - Redirect stdin from /dev/null
- `-q` - Quiet mode (no warnings/errors)
- `-N` - Do not execute remote command
- `-g` - Allow remote hosts to connect to forwarded ports
- `-L <port:host:hostport>` - Local port forwarding
- `-R <port:host:hostport>` - Remote port forwarding
- `-D <port>` - Dynamic application-level port forwarding

### X11 Forwarding
- `-X` - Enable X11 forwarding
- `-x` - Disable X11 forwarding
- `-Y` - Enable trusted X11 forwarding

## Usage Examples

### Basic Connections
```bash
# Basic SSH connection
ssh user@remote.example.com

# Connect with different port
ssh -p 2222 user@remote.example.com

# Connect with current username
ssh remote.example.com

# Connect as root user
ssh root@remote.example.com
```

### Key-Based Authentication
```bash
# Use specific private key
ssh -i ~/.ssh/id_rsa user@remote.example.com

# Use key with specific path
ssh -i /path/to/private_key user@remote.example.com

# Use specific key with passphrase
ssh -i ~/.ssh/my_key.pem user@remote.example.com
```

### Remote Command Execution
```bash
# Execute single command
ssh user@remote.example.com "ls -la"

# Execute multiple commands
ssh user@remote.example.com "cd /var/log && ls -la"

# Execute command with quotes
ssh user@remote.example.com "echo 'Hello World' > ~/message.txt"

# Interactive remote command
ssh user@remote.example.com "sudo systemctl status nginx"
```

### Port Forwarding
```bash
# Local port forwarding
ssh -L 8080:localhost:80 user@webserver.example.com

# Forward local port to remote server's localhost
ssh -L 3306:mysql.example.com:3306 user@remote.example.com

# Remote port forwarding
ssh -R 2222:localhost:22 user@remote.example.com

# Dynamic port forwarding (SOCKS proxy)
ssh -D 1080 user@remote.example.com

# Multiple port forwards
ssh -L 8080:web.example.com:80 -L 3306:db.example.com:3306 user@gateway.example.com
```

### X11 Forwarding
```bash
# Enable X11 forwarding for GUI applications
ssh -X user@remote.example.com

# Trusted X11 forwarding (less secure)
ssh -Y user@remote.example.com

# Run GUI application remotely
ssh -X user@remote.example.com "firefox"
```

### Background Operations
```bash
# Run command in background
ssh -f user@remote.example.com "sleep 3600"

# Background with no terminal allocation
ssh -fNT user@remote.example.com

# Port forwarding in background
ssh -f -N -L 8080:localhost:80 user@remote.example.com
```

### Configuration Files
```bash
# Use specific config file
ssh -F ~/.ssh/custom_config user@remote.example.com

# Set configuration options
ssh -o "ConnectTimeout=10" user@remote.example.com

# Multiple configuration options
ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile=/dev/null" user@remote.example.com
```

### Compression and Optimization
```bash
# Enable compression for slow connections
ssh -C user@remote.example.com

# Specify cipher suite
ssh -c aes256-ctr user@remote.example.com

# Enable verbose output for debugging
ssh -v user@remote.example.com

# Maximum verbosity
ssh -vvv user@remote.example.com
```

## Configuration Files

### ~/.ssh/config
```
Host webserver
    HostName web.example.com
    User admin
    Port 2222
    IdentityFile ~/.ssh/web_key

Host database
    HostName db.example.com
    User dbadmin
    LocalForward 3307 localhost:3306

Host *
    Compression yes
    ConnectTimeout 30
```

### /etc/ssh/ssh_config
Global SSH client configuration file affecting all users.

## Best Practices

### Security Hardening
```bash
# Use key-based authentication instead of passwords
ssh -i ~/.ssh/id_rsa user@server.example.com

# Disable strict host key checking (for automation)
ssh -o "StrictHostKeyChecking=no" user@server.example.com

# Limit allowed ciphers
ssh -c "aes256-ctr,aes192-ctr" user@server.example.com
```

### Connection Reliability
```bash
# Set connection timeout
ssh -o "ConnectTimeout=30" user@server.example.com

# Enable keepalive
ssh -o "ServerAliveInterval=60" user@server.example.com

# Control master for connection sharing
ssh -M -S ~/.ssh/master-%r@%h:%p user@server.example.com
```

### Automation and Scripting
```bash
# Execute commands non-interactively
ssh -o "BatchMode=yes" user@server.example.com "uptime"

# Check if host is reachable
ssh -o "ConnectTimeout=5" -o "BatchMode=yes" user@server.example.com "exit 0"

# Quiet execution for scripts
ssh -q user@server.example.com "ls"
```

## Key Management

### Generate SSH Keys
```bash
# Generate RSA key pair
ssh-keygen -t rsa -b 4096 -C "user@example.com"

# Generate Ed25519 key (recommended)
ssh-keygen -t ed25519 -C "user@example.com"

# Generate key with custom name
ssh-keygen -t ed25519 -f ~/.ssh/custom_key
```

### Copy Public Key to Server
```bash
# Copy public key manually
ssh-copy-id user@remote.example.com

# Copy to specific port
ssh-copy-id -p 2222 user@remote.example.com

# Manual key copy
cat ~/.ssh/id_rsa.pub | ssh user@remote.example.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## Connection Sharing

Using SSH multiplexing for connection sharing:
```bash
# Control master setup
ssh -M -S ~/.ssh/master-%r@%h:%p -fnNT user@server.example.com

# Use existing connection
ssh -S ~/.ssh/master-%r@%h:%p user@server.example.com

# In config file:
ControlMaster auto
ControlPath ~/.ssh/master-%r@%h:%p
ControlPersist 600
```

## Troubleshooting

### Debug Connections
```bash
# Verbose connection
ssh -v user@server.example.com

# Maximum verbosity
ssh -vvv user@server.example.com

# Check supported algorithms
ssh -Q cipher
ssh -Q key
ssh -Q mac
```

### Common Issues
```bash
# Ignore host key verification (temporary)
ssh -o "StrictHostKeyChecking=no" user@server.example.com

# Use specific host key algorithm
ssh -o "HostKeyAlgorithms=ssh-ed25519" user@server.example.com

# Disable known hosts checking
ssh -o "UserKnownHostsFile=/dev/null" user@server.example.com
```

## Common Use Cases

1. **Remote System Administration** - Secure shell access to servers
2. **Automated File Transfers** - Integration with rsync and scp
3. **Port Forwarding** - Secure access to internal services
4. **X11 Forwarding** - Run GUI applications remotely
5. **Jump Hosts** - Access systems behind firewalls
6. **SOCKS Proxy** - Dynamic port forwarding for web browsing

## Security Considerations

- Always use key-based authentication when possible
- Use strong passphrases for private keys
- Regularly rotate SSH keys
- Monitor SSH logs for unauthorized access
- Use fail2ban or similar tools to prevent brute force attacks
- Limit root SSH access where possible

## Related Commands

- [`scp`](/docs/commands/networking/scp) - Secure file copy
- [`sftp`](/docs/commands/networking/sftp) - Secure file transfer
- [`ssh-keygen`](/docs/commands/networking/ssh-keygen) - Generate SSH keys
- [`ssh-agent`](/docs/commands/networking/ssh-agent) - SSH authentication agent
- [`ssh-add`](/docs/commands/networking/ssh-add) - Add private keys to agent
- [`rsync`](/docs/commands/networking/rsync) - Remote file synchronization

SSH is the fundamental tool for secure remote system administration and automation in modern IT environments.