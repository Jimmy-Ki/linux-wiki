---
title: apt-key - APT Key Management Utility
sidebar_label: apt-key
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# apt-key - APT Key Management Utility

The `apt-key` command is used to manage the list of keys used by APT to authenticate packages. Packages and repositories are authenticated using GPG signed files, and `apt-key` provides the interface for adding, removing, and managing these authentication keys. Note: `apt-key` is deprecated and will be removed in future Debian releases.

## Basic Syntax

```bash
apt-key [COMMAND] [OPTIONS] [ARGUMENTS]
```

## Common Options

### General Options
- `-h, --help` - Show help message
- `--keyring `` - Use specified keyring file
- `--fingerprint` - Show key fingerprint
- `--list-sigs` - List keys and signatures
- `--export` - Export keys
- `--export-all` - Export all keys
- `--import` - Import keys
- `--delete` - Delete keys
- `--adv` - Pass advanced options to GPG

### Advanced GPG Options
- `--armor` - Create ASCII armored output
- `--no-armor` - Don't create ASCII armored output
- `--with-fingerprint` - Show key fingerprint
- `--with-colons` - Use colon separated output format
- `--check-sigs` - Check for signatures
- `--secret` - Operate on secret keyring
- `--primary-keyring `` - Set primary keyring

## Usage Examples

### Key Management Operations

```bash
# List all trusted keys
apt-key list

# List keys with fingerprints
apt-key list --with-fingerprint

# Add a GPG key from file
apt-key add keyfile.asc

# Add a GPG key from standard input
wget -qO - https://example.com/key.asc | apt-key add -

# Remove a key by key ID
apt-key del 12345678

# Remove multiple keys
apt-key del ABCDEF12 12345678

# Export a specific key
apt-key export 12345678

# Export all keys
apt-key exportall

# Export keys to file
apt-key exportall > trusted_keys.gpg
```

### Repository Key Setup

```bash
# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Google Cloud SDK key
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# Add Node.js repository key
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -

# Add MongoDB key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Add PHP repository key
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -
```

### Advanced Key Operations

```bash
# Show detailed key information
apt-key adv --list-keys

# Show key fingerprints
apt-key adv --fingerprint

# Receive key from keyserver
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 12345678

# Receive key from HTTP keyserver
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 12345678

# Send key to keyserver
apt-key adv --keyserver keyserver.ubuntu.com --send-keys 12345678

# Update keys from keyservers
apt-key adv --refresh-keys

# Verify key signature
apt-key adv --check-sigs

# Export key with subkeys
apt-key adv --export --armor 12345678

# Import key with armor format
apt-key adv --import keyfile.asc
```

### Keyring Operations

```bash
# Use alternative keyring
apt-key --keyring /usr/share/keyrings/custom-keyring.gpg list

# Add key to specific keyring
apt-key --keyring /usr/share/keyrings/custom-keyring.gpg add keyfile.asc

# Export from specific keyring
apt-key --keyring /etc/apt/trusted.gpg export 12345678

# Create new keyring
sudo touch /usr/share/keyrings/custom-keyring.gpg
sudo chmod 644 /usr/share/keyrings/custom-keyring.gpg
```

### Troubleshooting and Verification

```bash
# Check if key exists
apt-key list | grep "1234 5678"

# Show key details
apt-key adv --list-keys --with-fingerprint --with-colons

# Verify key fingerprint
apt-key adv --fingerprint 12345678

# Check key expiration
apt-key list | grep "expires"

# List expired keys
apt-key list | grep "expired"

# Search for specific key
apt-key list | grep "Key Name"
```

## Practical Examples

### Repository Setup Workflow

```bash
# Complete repository setup example
# 1. Add repository to sources.list
echo "deb https://example.com/apt stable main" | sudo tee /etc/apt/sources.list.d/example.list

# 2. Add repository GPG key
wget -qO - https://example.com/archive.key | sudo apt-key add -

# 3. Update package lists
sudo apt update

# 4. Install package from repository
sudo apt install package_name
```

### Key Management for Third-Party Repositories

```bash
# Setup multiple third-party repositories
# Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list

# Visual Studio Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null

# Google Chrome
wget -qO- https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
```

### Key Backup and Recovery

```bash
# Backup all trusted keys
sudo apt-key exportall > /root/backup/trusted_keys.gpg
sudo cp /root/backup/trusted_keys.gpg /secure/backup/location/

# Backup individual key
sudo apt-key export 12345678 > /root/backup/specific_key.gpg

# Restore keys from backup
sudo apt-key add /root/backup/trusted_keys.gpg

# Restore individual key
sudo apt-key add /root/backup/specific_key.gpg

# Create timestamped backup
sudo apt-key exportall > /root/backup/trusted_keys_$(date +%Y%m%d).gpg
```

### Security Auditing

```bash
# List all keys with detailed information
sudo apt-key list --with-fingerprint

# Check for unknown keys
sudo apt-key list | grep -E "uid\s+\[unknown\]"

# Find keys without email addresses
sudo apt-key list | grep -v "@"

# List keys by creation date
sudo apt-key adv --list-keys --with-colons | grep '^pub:' | sort -k6

# Check for duplicate keys
sudo apt-key list | grep -E "^[a-f0-9]{40}$" | sort | uniq -d

# Audit key permissions
ls -la /etc/apt/trusted.gpg*
ls -la /etc/apt/trusted.gpg.d/
```

### Migration to Modern Practices

```bash
# Modern approach: Use signed-by option in sources.list
# 1. Create keyring directory
sudo mkdir -p /etc/apt/keyrings

# 2. Import key to specific keyring
wget -qO- https://example.com/archive.key | sudo gpg --dearmor -o /etc/apt/keyrings/example.gpg

# 3. Add repository with signed-by option
echo "deb [signed-by=/etc/apt/keyrings/example.gpg] https://example.com/apt stable main" | sudo tee /etc/apt/sources.list.d/example.list

# 4. Update and verify
sudo apt update
```

### Key Server Operations

```bash
# Receive key from multiple keyservers
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 12345678
sudo apt-key adv --keyserver pgp.mit.edu --recv-keys 12345678

# Refresh all keys
sudo apt-key adv --refresh-keys

# Update specific key
sudo apt-key adv --keyserver keyserver.ubuntu.com --refresh-keys 12345678

# Send key to keyserver
sudo apt-key adv --keyserver keyserver.ubuntu.com --send-keys 12345678

# Search keyserver for key
sudo apt-key adv --keyserver keyserver.ubuntu.com --search-keys "Key Owner"
```

## Related Commands

- `gpg` - GNU Privacy Guard for key management
- `apt` - Package management tool
- `apt-get` - Low-level package management
- `dpkg` - Debian package manager
- `wget` - File retrieval utility
- `curl` - Data transfer utility
- `lsb_release` - Distribution information
- `tee` - Read from standard input and write to standard output and files

## Best Practices

### Security Considerations
1. Only import keys from trusted sources
2. Verify key fingerprints before importing
3. Use HTTPS for key downloads when possible
4. Regularly audit trusted keys for unauthorized additions
5. Consider migrating to signed-by approach for better security

### Key Management
1. Keep a backup of all trusted keys
2. Document the purpose of each added key
3. Remove unused or expired keys
4. Use descriptive keyring names for organization
5. Monitor key expiration dates

### Modern Practices
1. Migrate to signed-by option in sources.list
2. Use separate keyrings for different repositories
3. Avoid using apt-key for new repository setups
4. Use /etc/apt/keyrings/ directory for new key storage
5. Document key sources and purposes

### Troubleshooting
1. Use `apt-key adv` for detailed key information
2. Check key permissions and ownership
3. Verify key formats (ASCII vs binary)
4. Use verbose output for debugging
5. Test key operations with dry-run when possible

### Automation and Scripting
1. Include key verification in automated setup scripts
2. Use error handling for key operations
3. Log key management activities
4. Test key imports in isolated environments
5. Implement rollback procedures for key management changes

### Migration Notes
Since `apt-key` is deprecated, consider these modern alternatives:

1. **For new repositories**: Use signed-by option in sources.list
2. **For existing repositories**: Plan migration to signed-by approach
3. **For automation**: Use gpg directly for key operations
4. **For security**: Separate keys by repository in dedicated keyrings
5. **For maintenance**: Regular security audits of trusted keys

## Deprecation Warning

`apt-key` is deprecated and will be removed in future Debian releases. The recommended approach is to use the `signed-by` option in `sources.list` files with dedicated keyring files in `/etc/apt/keyrings/`. This provides better security and allows for per-repository key management.

**Modern approach:**
```bash
# Create dedicated keyring
wget -qO- https://example.com/key.asc | gpg --dearmor -o /etc/apt/keyrings/example.gpg

# Add repository with signed-by
echo "deb [signed-by=/etc/apt/keyrings/example.gpg] https://example.com/apt stable main" > /etc/apt/sources.list.d/example.list
```

This approach provides better security isolation and allows for more granular control over repository authentication.