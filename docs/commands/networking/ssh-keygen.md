---
title: ssh-keygen - SSH Authentication Key Generation
sidebar_label: ssh-keygen
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ssh-keygen - SSH Authentication Key Generation

The `ssh-keygen` command is a utility for generating, managing, and converting authentication keys for SSH (Secure Shell). It supports various key types including RSA, DSA, ECDSA, Ed25519, and provides tools for key maintenance, fingerprinting, and format conversion.

## Basic Syntax

```bash
ssh-keygen [options] [key_type] [bits]
```

## Common Options

### Key Generation Options
- `-t type` - Specify key type (rsa, dsa, ecdsa, ed25519)
- `-b bits` - Specify number of bits in key
- `-C comment` - Provide comment for key
- `-f filename` - Specify filename for key
- `-N new_passphrase` - Set new passphrase
- `-P passphrase` - Provide old passphrase
- `-q` - Quiet mode
- `-o` - Use new OpenSSH format

### Key Management Options
- `-l` - Show fingerprint of key file
- `-E hash_algorithm` - Specify hash algorithm for fingerprint
- `-v` - Verbose mode
- `-y` - Read private key and output public key
- `-c` - Change comment in key file
- `-p` - Change passphrase of private key
- `-i` - Convert key to OpenSSH format
- `-e` - Export key to different format

### Certificate Options
- `-s ca_key` - Sign key with CA key
- `-I identity` - Specify key identity for certificates
- `-V validity_interval` - Set certificate validity
- `-n principals` - Set principals (user/hostnames)
- `-O option` - Specify certificate option

### Conversion Options
- `-f input_keyfile` - Input key file
- `-e -m format` - Export to specified format
- `-i -m format` - Import from specified format
- `-p` - Change private key passphrase

## Usage Examples

### Basic Key Generation

#### Generate Default Key Pair
```bash
# Generate default RSA key pair (2048 bits)
ssh-keygen

# Generate with specific filename
ssh-keygen -f my_key

# Generate without passphrase (not recommended)
ssh-keygen -N "" -f no_passphrase_key
```

#### Generate Different Key Types
```bash
# Generate Ed25519 key (recommended modern choice)
ssh-keygen -t ed25519

# Generate RSA key with 4096 bits
ssh-keygen -t rsa -b 4096

# Generate ECDSA key with 256 bits
ssh-keygen -t ecdsa -b 256

# Generate DSA key (legacy, not recommended)
ssh-keygen -t dsa
```

#### Key Generation with Custom Options
```bash
# Generate Ed25519 key with specific comment
ssh-keygen -t ed25519 -C "alice@example.com"

# Generate RSA key with custom comment and filename
ssh-keygen -t rsa -b 4096 -f ~/.ssh/work_key -C "alice@work.com"

# Generate with specific passphrase
ssh-keygen -t ed25519 -N "SecurePassphrase123!" -f secure_key

# Generate with bit size and comment
ssh-keygen -t rsa -b 3072 -C "backup@example.com"
```

### Key Information and Fingerprinting

#### Display Key Information
```bash
# Show fingerprint of public key
ssh-keygen -l -f ~/.ssh/id_rsa.pub

# Show fingerprint in SHA256 format (default)
ssh-keygen -l -f ~/.ssh/id_rsa.pub

# Show fingerprint in MD5 format
ssh-keygen -l -E md5 -f ~/.ssh/id_rsa.pub

# Show fingerprint of private key
ssh-keygen -l -f ~/.ssh/id_rsa

# Show key type and bits
ssh-keygen -l -v -f ~/.ssh/id_rsa.pub
```

#### Extract Public Key
```bash
# Extract public key from private key
ssh-keygen -y -f ~/.ssh/id_rsa > public_key.pub

# Extract public key to specific file
ssh-keygen -y -f private_key > extracted_public.pub

# Show public key on screen
ssh-keygen -y -f ~/.ssh/id_ed25519
```

### Key Management

#### Change Passphrase
```bash
# Change passphrase interactively
ssh-keygen -p

# Change passphrase for specific key
ssh-keygen -p -f ~/.ssh/id_rsa

# Change passphrase with new passphrase specified
ssh-keygen -p -f ~/.ssh/id_rsa -N "NewPassphrase123" -P "OldPassphrase"
```

#### Change Key Comment
```bash
# Change comment interactively
ssh-keygen -c

# Change comment for specific key
ssh-keygen -c -f ~/.ssh/id_rsa

# Change comment to specific value
ssh-keygen -c -f ~/.ssh/id_rsa -C "new.comment@example.com"
```

### Key Format Conversion

#### Convert Between Formats
```bash
# Convert OpenSSH private key to PEM format
ssh-keygen -p -m PEM -f id_rsa

# Convert PEM format to OpenSSH format
ssh-keygen -p -m RFC4716 -f id_rsa.pem

# Export public key to RFC4716 format
ssh-keygen -e -f ~/.ssh/id_rsa.pub > key.rfc

# Import RFC4716 format key
ssh-keygen -i -f key.rfc > converted.pub
```

### Certificate Management

#### Generate SSH Certificates
```bash
# Generate user certificate
ssh-keygen -s ca_key -I alice -n alice -V +52w id_rsa.pub

# Generate host certificate
ssh-keygen -s ca_key -I server.example.com -n server.example.com -V +365d /etc/ssh/ssh_host_rsa_key.pub

# Generate certificate with specific validity period
ssh-keygen -s ca_key -I backup_user -n backup -V 2024-01-01:2025-01-01 backup_key.pub

# Generate certificate with options
ssh-keygen -s ca_key -I deploy_user -n deploy -V +12w -O force-command=/usr/local/bin/deploy.sh deploy_key.pub
```

#### Certificate Information
```bash
# Show certificate information
ssh-keygen -L -f user-cert.pub

# Show certificate fingerprint
ssh-keygen -l -f user-cert.pub

# Verify certificate
ssh-keygen -Lf user-cert.pub
```

### Key Validation and Testing

#### Test SSH Keys
```bash
# Test if key files are valid
ssh-keygen -l -f ~/.ssh/id_rsa

# Check if key is locked with passphrase
ssh-keygen -y -f ~/.ssh/id_rsa > /dev/null

# Validate key format
ssh-keygen -e -f ~/.ssh/id_rsa.pub
```

### Advanced Key Operations

#### Batch Key Generation
```bash
# Generate keys in batch mode (no prompts)
ssh-keygen -t ed25519 -f batch_key -N "BatchPassphrase" -C "batch@example.com" -q

# Generate multiple keys
for user in alice bob charlie; do
    ssh-keygen -t ed25519 -f "${user}_key" -N "" -C "${user}@example.com" -q
done

# Generate keys with specific naming convention
ssh-keygen -t rsa -b 4096 -f "prod_$(date +%Y%m%d)" -N "ProdKey$(date +%Y)" -C "production@company.com"
```

### SSH Key Security

#### Secure Key Handling
```bash
# Set correct permissions on SSH directory
chmod 700 ~/.ssh

# Set correct permissions on private key
chmod 600 ~/.ssh/id_rsa

# Set correct permissions on public key
chmod 644 ~/.ssh/id_rsa.pub

# Add key to ssh-agent
ssh-add ~/.ssh/id_rsa

# Remove key from ssh-agent
ssh-add -d ~/.ssh/id_rsa

# List keys in ssh-agent
ssh-add -l
```

## Practical Examples

### Complete SSH Key Setup Workflow
```bash
#!/bin/bash
# Complete SSH Key Setup Script

USER_EMAIL="alice@example.com"
KEY_TYPE="ed25519"
KEY_PATH="$HOME/.ssh/id_$KEY_TYPE"

echo "Setting up SSH keys for $USER_EMAIL"

# Create SSH directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Generate new key pair
echo "Generating $KEY_TYPE key pair..."
ssh-keygen -t "$KEY_TYPE" -C "$USER_EMAIL" -f "$KEY_PATH"

# Set correct permissions
chmod 600 "$KEY_PATH"
chmod 644 "$KEY_PATH.pub"

# Display public key for copying
echo -e "\n=== Public Key ==="
cat "$KEY_PATH.pub"

echo -e "\n=== Key Information ==="
ssh-keygen -l -f "$KEY_PATH.pub"
ssh-keygen -v -l -f "$KEY_PATH.pub"

# Add to ssh-agent
echo -e "\nAdding key to ssh-agent..."
ssh-add "$KEY_PATH"

echo -e "\nSSH key setup complete!"
echo "Add the public key to remote servers using:"
echo "ssh-copy-id -i $KEY_PATH.pub user@hostname"
```

### Key Rotation Script
```bash
#!/bin/bash
# SSH Key Rotation Script

OLD_KEY="$HOME/.ssh/id_rsa_old"
NEW_KEY="$HOME/.ssh/id_rsa_new"
KEY_EMAIL="alice@example.com"

echo "Rotating SSH keys..."

# Backup old key if it exists
if [ -f "$HOME/.ssh/id_rsa" ]; then
    echo "Backing up old key..."
    mv "$HOME/.ssh/id_rsa" "$OLD_KEY"
    mv "$HOME/.ssh/id_rsa.pub" "$OLD_KEY.pub"
fi

# Generate new key
echo "Generating new key..."
ssh-keygen -t ed25519 -C "$KEY_EMAIL" -f "$NEW_KEY" -N ""

# Create symlink for compatibility
ln -sf "$NEW_KEY" "$HOME/.ssh/id_rsa"
ln -sf "$NEW_KEY.pub" "$HOME/.ssh/id_rsa.pub"

# Set permissions
chmod 600 "$NEW_KEY"
chmod 644 "$NEW_KEY.pub"

echo "Key rotation complete!"
echo "Update remote servers with new public key:"
cat "$NEW_KEY.pub"
```

### Key Validation Script
```bash
#!/bin/bash
# SSH Key Validation and Audit Script

SSH_DIR="$HOME/.ssh"

echo "=== SSH Key Audit ==="
echo

# Check SSH directory permissions
if [ -d "$SSH_DIR" ]; then
    echo "SSH directory permissions: $(stat -c '%A %a' "$SSH_DIR")"
    if [ "$(stat -c '%a' "$SSH_DIR")" != "700" ]; then
        echo "WARNING: SSH directory should have 700 permissions"
        chmod 700 "$SSH_DIR"
        echo "Fixed SSH directory permissions"
    fi
else
    echo "SSH directory not found"
    exit 1
fi

# Check all key files
echo -e "\n=== Key Files ==="
for key_file in "$SSH_DIR"/*_rsa "$SSH_DIR"/*_ed25519 "$SSH_DIR"/*_ecdsa; do
    if [ -f "$key_file" ]; then
        key_name=$(basename "$key_file")
        echo "Key: $key_name"

        # Check permissions
        permissions=$(stat -c '%a' "$key_file")
        echo "  Permissions: $permissions"

        # Show fingerprint
        if ssh-keygen -l -f "$key_file" >/dev/null 2>&1; then
            echo "  Fingerprint: $(ssh-keygen -l -f "$key_file" | cut -d' ' -f2)"
        else
            echo "  WARNING: Invalid key file"
        fi

        # Check if it's a private key
        if [[ "$key_file" != *.pub ]]; then
            if [ "$permissions" != "600" ]; then
                echo "  WARNING: Private key should have 600 permissions"
            fi
        fi
        echo
    fi
done

# Check ssh-agent
echo -e "\n=== SSH Agent ==="
if pgrep -q ssh-agent; then
    echo "SSH agent is running"
    if command -v ssh-add >/dev/null 2>&1; then
        ssh-add -l
    else
        echo "ssh-add command not available"
    fi
else
    echo "SSH agent is not running"
    echo "Start with: eval $(ssh-agent -s)"
fi
```

### Multi-Environment Key Management
```bash
#!/bin/bash
# Multiple SSH Environment Key Manager

# Configuration
SSH_DIR="$HOME/.ssh"
ENVIRONMENTS=("work" "personal" "client1" "client2")
KEY_TYPE="ed25519"

echo "Managing multiple SSH key environments..."

# Create SSH directory
mkdir -p "$SSH_DIR"

for env in "${ENVIRONMENTS[@]}"; do
    echo -e "\n=== Setting up $env environment ==="

    key_file="$SSH_DIR/id_${KEY_TYPE}_${env}"
    pub_file="${key_file}.pub"

    # Generate key if it doesn't exist
    if [ ! -f "$key_file" ]; then
        echo "Generating key for $env..."
        ssh-keygen -t "$KEY_TYPE" -f "$key_file" -N "" -C "alice@${env}.example.com"
    else
        echo "Key for $env already exists"
    fi

    # Set permissions
    chmod 600 "$key_file"
    chmod 644 "$pub_file"

    # Display key info
    echo "Key fingerprint: $(ssh-keygen -l -f "$key_file" | cut -d' ' -f2)"
    echo "Public key: $pub_file"
done

# Create config file suggestions
echo -e "\n=== SSH Config Suggestions ==="
echo "Add these entries to ~/.ssh/config:"
for env in "${ENVIRONMENTS[@]}"; do
    echo "Host $env"
    echo "    HostName ${env}.example.com"
    echo "    User alice"
    echo "    IdentityFile ~/.ssh/id_${KEY_TYPE}_${env}"
    echo "    IdentitiesOnly yes"
    echo ""
done
```

### SSH Key Deployment Automation
```bash
#!/bin/bash
# Automated SSH Key Deployment

PUBLIC_KEY="$HOME/.ssh/id_ed25519.pub"
SERVERS=("server1.example.com" "server2.example.com" "server3.example.com")
USER="alice"

# Check if public key exists
if [ ! -f "$PUBLIC_KEY" ]; then
    echo "Public key not found at $PUBLIC_KEY"
    exit 1
fi

echo "Deploying SSH key to servers..."
echo "Public key: $(cat "$PUBLIC_KEY")"

for server in "${SERVERS[@]}"; do
    echo -e "\n=== Deploying to $server ==="

    # Check if server is reachable
    if ping -c 1 "$server" >/dev/null 2>&1; then
        echo "Server is reachable, deploying key..."

        # Deploy key using ssh-copy-id if available
        if command -v ssh-copy-id >/dev/null 2>&1; then
            ssh-copy-id -i "$PUBLIC_KEY" "$USER@$server"
        else
            # Manual deployment
            echo "ssh-copy-id not available, using manual method..."
            ssh "$USER@$server" "mkdir -p ~/.ssh && chmod 700 ~/.ssh"
            scp "$PUBLIC_KEY" "$USER@$server:~/.ssh/authorized_keys_temp"
            ssh "$USER@$server" "cat ~/.ssh/authorized_keys_temp >> ~/.ssh/authorized_keys && rm ~/.ssh/authorized_keys_temp && chmod 600 ~/.ssh/authorized_keys"
        fi

        # Test connection
        if ssh -o BatchMode=yes -o ConnectTimeout=5 "$USER@$server" "echo 'SSH key deployment successful'" 2>/dev/null; then
            echo "✓ Key deployment successful for $server"
        else
            echo "✗ Key deployment failed for $server"
        fi
    else
        echo "✗ Server $server is not reachable"
    fi
done

echo -e "\nDeployment completed!"
```

## Related Commands

- [`ssh`](/docs/commands/security/ssh) - SSH client
- [`ssh-copy-id`](/docs/commands/security/ssh-copy-id) - Install SSH public key
- [`ssh-agent`](/docs/commands/security/ssh-agent) - SSH authentication agent
- [`ssh-add`](/docs/commands/security/ssh-add) - Add private key to agent
- [`scp`](/docs/commands/security/scp) - Secure copy
- [`sftp`](/docs/commands/security/sftp) - Secure file transfer
- [`ssh-keyscan`](/docs/commands/security/ssh-keyscan) - Scan SSH host keys

## Best Practices

### Key Security
1. **Strong passphrases** - Use long, complex passphrases for private keys
2. **Key size** - Use minimum 2048 bits for RSA, prefer Ed25519 for new keys
3. **File permissions** - Set 600 for private keys, 644 for public keys
4. **Regular rotation** - Rotate keys periodically, especially when personnel change
5. **Backup security** - Keep encrypted backups of important keys
6. **Hardware tokens** - Consider using YubiKey or similar for critical keys

### Key Management
1. **Environment separation** - Use different keys for different environments
2. **Descriptive comments** - Use meaningful comments to identify keys
3. **Access control** - Limit access to private key files
4. **Audit trails** - Track key generation and usage
5. **Revocation** - Have procedures for revoking compromised keys
6. **Documentation** - Maintain records of key purposes and locations

### Usage Best Practices
1. **SSH agent** - Use ssh-agent for passphrase management
2. **Config files** - Use SSH config to manage multiple keys
3. **Key types** - Prefer Ed25519 for modern systems
4. **Certificate authorities** - Consider SSH certificates for large deployments
5. **Regular maintenance** - Remove unused keys periodically
6. **Monitoring** - Monitor SSH access logs for unusual activity

### Common Pitfalls to Avoid
1. **No passphrase** - Never create private keys without passphrases
2. **Shared keys** - Never share private keys between users or systems
3. **Wrong permissions** - Always set correct file permissions
4. **Lost keys** - Maintain secure backups of important keys
5. **Outdated algorithms** - Avoid weak algorithms like DSA
6. **Missing rotation** - Don't use the same keys indefinitely

The `ssh-keygen` command provides comprehensive tools for SSH key management, enabling secure authentication through public key cryptography while maintaining strong security practices for key generation and maintenance.