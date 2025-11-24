---
title: gpg - GNU Privacy Guard
sidebar_label: gpg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gpg - GNU Privacy Guard

The `gpg` command is the OpenPGP implementation of the GNU Privacy Guard, providing complete and free implementation of the OpenPGP standard as defined by RFC4880. GPG enables cryptographic privacy and authentication through data encryption and digital signatures.

## Supported Algorithms

- **Public Key**: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
- **Symmetric Cipher**: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH, CAMELLIA128, CAMELLIA192, CAMELLIA256
- **Hash**: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
- **Compression**: Uncompressed, ZIP, ZLIB, BZIP2

## Basic Syntax

```bash
gpg [options] [files...]
```

## Common Options

### Key Generation and Management
- `--generate-key` - Generate a new key pair
- `--quick-generate-key` - Quick generate a new key pair
- `--full-generate-key` - Full featured key generation
- `--list-keys` - List public keys
- `--list-secret-keys` - List private keys
- `--fingerprint` - List keys and fingerprints
- `--delete-keys` - Remove keys from public keyring
- `--delete-secret-keys` - Remove keys from secret keyring

### Encryption and Decryption
- `-e, --encrypt` - Encrypt data
- `-d, --decrypt` - Decrypt data (default)
- `-c, --symmetric` - Encrypt with a symmetric cipher only
- `-r, --recipient USER-ID` - Encrypt for specific user ID
- `-u, --local-user USER-ID` - Use USER-ID for signing

### Signing and Verification
- `-s, --sign` - Make a signature
- `--clear-sign` - Make a cleartext signature
- `-b, --detach-sign` - Make a detached signature
- `--verify` - Verify a signature
- `--list-signatures` - List keys and signatures
- `--check-signatures` - List and check key signatures

### Import and Export
- `--import` - Import/merge keys
- `--export` - Export keys
- `--send-keys` - Send keys to a keyserver
- `--receive-keys` - Receive keys from a keyserver
- `--search-keys` - Search for keys on a keyserver
- `--refresh-keys` - Update all keys from a keyserver

### Output Options
- `-a, --armor` - Create ASCII armored output
- `-o, --output FILE` - Write output to FILE
- `--textmode` - Use canonical text mode

### Key Editing
- `--edit-key` - Sign or edit a key
- `--change-passphrase` - Change the passphrase
- `--quick-add-uid` - Quick add a new user ID
- `--quick-revoke-uid` - Quick revoke a user ID
- `--quick-set-expire` - Quick set a new expiration date

### Additional Options
- `-v, --verbose` - Verbose mode
- `-n, --dry-run` - Do not make any changes
- `-i, --interactive` - Prompt before overwrite
- `--openpgp` - Use strict OpenPGP behavior

## Usage Examples

### GPG Setup and Configuration

#### Basic Configuration
```bash
# Check GPG version
gpg --version

# Display default configuration
gpg --dump-options

# Create GPG directory (if needed)
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

# Set default key server in configuration
echo "keyserver hkps://keys.openpgp.org" >> ~/.gnupg/gpg.conf
echo "keyserver hkps://pgp.mit.edu" >> ~/.gnupg/gpg.conf
```

### Key Generation

#### Quick Key Generation
```bash
# Generate basic key with default settings
gpg --quick-generate-key alice@example.com

# Generate key with specific algorithm
gpg --quick-generate-key alice@example.com rsa4096

# Generate key with expiration
gpg --quick-generate-key alice@example.com rsa4096 cert 2y

# Generate key with name and email
gpg --quick-generate-key "Alice Smith <alice@example.com>"
```

#### Full Interactive Key Generation
```bash
# Start full key generation wizard
gpg --full-generate-key

# Example configuration responses:
# Key type: (1) RSA and RSA (default)
# Key size: 4096
# Valid for: 2y (2 years)
# Real name: Alice Smith
# Email: alice@example.com
# Comment: Work Key
# Passphrase: [secure passphrase]
```

#### Advanced Key Generation
```bash
# Generate with specific algorithm and curve
gpg --quick-generate-key alice@example.com future-default

# Generate subkey for encryption
gpg --quick-add-key alice@example.com cv25519 2y

# Generate subkey for signing
gpg --quick-add-key alice@example.com ed25519 2y

# Generate subkey for authentication
gpg --quick-add-key alice@example.com rsa4096 authenticate 2y
```

### Key Management

#### List and Display Keys
```bash
# List all public keys
gpg --list-keys

# List all secret keys
gpg --list-secret-keys

# List keys with key IDs
gpg --list-keys --with-subkey-fingerprints

# Display detailed key information
gpg --list-keys --with-fingerprint alice@example.com

# Show key fingerprints
gpg --fingerprint alice@example.com

# List secret keys in short format
gpg --list-secret-keys --keyid-format LONG
```

#### Key Information
```bash
# Check if key exists
gpg --list-keys alice@example.com

# Show key with signatures
gpg --list-sigs alice@example.com

# Check key trust levels
gpg --check-signatures alice@example.com

# Show key statistics
gpg --list-keys --list-options show-uid-validity alice@example.com
```

### Encryption and Decryption

#### Symmetric Encryption
```bash
# Encrypt file with symmetric encryption (password protected)
gpg -c document.txt

# Encrypt with specific cipher
gpg -c --cipher-algo AES256 document.txt

# Encrypt with compression
gpg -c --compress-algo 1 document.txt

# Encrypt and specify output file
gpg -c -o document.txt.gpg document.txt
```

#### Asymmetric Encryption
```bash
# Encrypt for specific recipient
gpg -e -r alice@example.com document.txt

# Encrypt for multiple recipients
gpg -e -r alice@example.com -r bob@example.com document.txt

# Encrypt and sign
gpg -se -r alice@example.com document.txt

# Encrypt with ASCII armor
gpg -ea -r alice@example.com document.txt

# Encrypt and specify output
gpg -e -o document.enc -r alice@example.com document.txt
```

#### Decryption
```bash
# Decrypt file
gpg document.txt.gpg

# Decrypt and verify signature
gpg document.txt.sig

# Decrypt to specific output file
gpg -o decrypted.txt --decrypt document.enc

# Decrypt with multiple recipients (will try all)
gpg document.txt.gpg

# Decrypt with multiple recipients and verbose output
gpg -v document.txt.gpg
```

### Digital Signatures

#### Create Signatures
```bash
# Create basic signature
gpg -s document.txt

# Create detached signature
gpg -b document.txt

# Create clear text signature
gpg --clear-sign document.txt

# Sign with specific key
gpg -u alice@example.com -s document.txt

# Create ASCII armored signature
gpg -a -b document.txt

# Sign and encrypt
gpg -se -r bob@example.com document.txt
```

#### Verify Signatures
```bash
# Verify signature
gpg --verify document.txt.sig document.txt

# Verify detached signature
gpg --verify document.txt.sig

# Verify clear text signature
gpg --verify document.txt.asc

# Verify with verbose output
gpg -v --verify document.txt.sig document.txt

# Show fingerprint during verification
gpg --show-fingerprint --verify document.txt.sig document.txt
```

### Key Export and Import

#### Export Keys
```bash
# Export public key in binary format
gpg --export alice@example.com > alice-public.key

# Export public key with ASCII armor
gpg --armor --export alice@example.com > alice-public.asc

# Export secret key (WARNING: be careful with this)
gpg --export-secret-keys alice@example.com > alice-secret.key

# Export secret key with ASCII armor
gpg --armor --export-secret-keys alice@example.com > alice-secret.asc

# Export multiple keys
gpg --armor --export alice@example.com bob@example.com > keys.asc
```

#### Import Keys
```bash
# Import public key
gpg --import alice-public.asc

# Import secret key
gpg --import alice-secret.asc

# Import from file
gpg --import filename.key

# Import multiple keys
gpg --import keys.asc

# Import and trust automatically (use with caution)
gpg --import --import-options import-local-sigs alice-public.asc
```

#### Key Server Operations
```bash
# Upload public key to keyserver
gpg --send-keys alice@example.com

# Download key from keyserver
gpg --recv-keys alice@example.com

# Search for keys on keyserver
gpg --search-keys "Alice Smith"

# Refresh all keys from keyserver
gpg --refresh-keys

# Search by email
gpg --search-keys alice@example.com

# Search by name
gpg --search-keys Alice Smith
```

### Key Editing and Maintenance

#### Edit Keys
```bash
# Enter key editing mode
gpg --edit-key alice@example.com

# Inside key editing mode, available commands:
# adduid     - Add new user ID
# addphoto   - Add photo ID
# deluid     - Delete user ID
# expire     - Change expiration date
# trust      - Change trust level
# addkey     - Add subkey
# delkey     - Delete subkey
# revkey     - Revoke subkey
# toggle     - Toggle secret/public display
# passwd     - Change passphrase
# save       - Save changes
# quit       - Quit without saving
```

#### Key Maintenance Commands
```bash
# Change passphrase
gpg --change-passphrase alice@example.com

# Add new user ID
gpg --quick-add-uid alice@example.com "Alice Smith <alice@work.com>"

# Revoke user ID
gpg --quick-revoke-uid alice@example.com "Alice Smith <alice@oldwork.com>"

# Set new expiration date
gpg --quick-set-expire alice@example.com 2025-12-31

# Generate revocation certificate
gpg --generate-revocation alice@example.com > alice-revoke.asc

# Delete public key
gpg --delete-key alice@example.com

# Delete secret key
gpg --delete-secret-key alice@example.com
```

### Trust Management

#### Trust Levels
```bash
# Trust a key ultimately (for your own keys)
gpg --edit-key alice@example.com
# > trust
# > 5 = I trust ultimately
# > y
# > save

# Trust a key marginally (for keys you've verified)
gpg --edit-key bob@example.com
# > trust
# > 3 = I trust marginally
# > y
# > save

# Sign a key to indicate trust
gpg --sign-key bob@example.com

# Sign a key locally (non-exportable)
gpg --lsign-key bob@example.com
```

### Web of Trust Operations

#### Key Signing
```bash
# Sign someone's key after verification
gpg --sign-key bob@example.com

# Sign with specific key
gpg -u alice@example.com --sign-key bob@example.com

# Sign locally (not published)
gpg --lsign-key bob@example.com

# Quick sign (less interactive)
gpg --quick-sign-key bob@example.com

# Quick local sign
gpg --quick-lsign-key bob@example.com
```

#### Trust Database
```bash
# Update trust database
gpg --update-trustdb

# Check trust database
gpg --check-trustdb

# Rebuild trust database
rm ~/.gnupg/trustdb.gpg
gpg --update-trustdb
```

### Advanced Operations

#### Smart Card Support
```bash
# Check smart card status
gpg --card-status

# Edit card data
gpg --edit-card

# Change PIN
gpg --change-pin

# Move key to smart card
gpg --edit-key alice@example.com
# > key 1 (select subkey)
# > keytocard
# > save
```

#### Batch Operations
```bash
# Encrypt multiple files in batch
for file in *.txt; do
    gpg -e -r alice@example.com "$file"
done

# Sign multiple files
for file in *.pdf; do
    gpg -b "$file"
done

# Decrypt multiple files
for file in *.gpg; do
    gpg "$file"
done
```

#### Configuration Files
```bash
# View current configuration
gpg --dump-options

# Edit configuration file
nano ~/.gnupg/gpg.conf

# Example gpg.conf settings:
# keyserver hkps://keys.openpgp.org
# default-key alice@example.com
# cert-digest-algo SHA256
# digest-algo SHA256
# cipher-algo AES256
# compress-algo 1
# personal-digest-preferences SHA512 SHA384 SHA256 SHA224
# personal-cipher-preferences AES256 AES192 AES CAST5
# personal-compress-preferences ZLIB BZIP2 ZIP Uncompressed
```

## Practical Examples

### Complete Key Setup Workflow
```bash
#!/bin/bash
# Complete GPG Key Setup Script

EMAIL="alice@example.com"
NAME="Alice Smith"

echo "Setting up GPG for $NAME <$EMAIL>"

# Step 1: Generate primary key
echo "Generating primary key..."
gpg --batch --passphrase 'SecurePassphrase123!' --quick-generate-key \
    "$NAME <$EMAIL>" rsa4096 sign 2y

# Step 2: Generate subkeys
echo "Generating encryption subkey..."
gpg --batch --passphrase 'SecurePassphrase123!' \
    --quick-add-key "$EMAIL" cv25519 encrypt 2y

echo "Generating authentication subkey..."
gpg --batch --passphrase 'SecurePassphrase123!' \
    --quick-add-key "$EMAIL" rsa4096 authenticate 2y

# Step 3: Generate revocation certificate
echo "Generating revocation certificate..."
gpg --batch --passphrase 'SecurePassphrase123!' \
    --generate-revocation "$EMAIL" > revocation.asc

# Step 4: Export public key
echo "Exporting public key..."
gpg --armor --export "$EMAIL" > "$EMAIL.asc"

# Step 5: Upload to keyserver
echo "Uploading to keyserver..."
gpg --send-keys "$EMAIL"

echo "Setup complete!"
echo "Public key: $EMAIL.asc"
echo "Revocation certificate: revocation.asc"
echo "IMPORTANT: Store revocation certificate securely!"
```

### Encrypted Backup Script
```bash
#!/bin/bash
# Encrypted Backup Script Using GPG

SOURCE_DIR="/home/alice/documents"
BACKUP_DIR="/home/alice/backups"
RECIPIENT="alice@example.com"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.tar.gz.gpg"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create archive and encrypt
echo "Creating encrypted backup..."
tar -czf - "$SOURCE_DIR" | gpg -e -r "$RECIPIENT" -o "$BACKUP_DIR/$BACKUP_FILE"

# Verify backup
echo "Verifying backup..."
if gpg --list-packets "$BACKUP_DIR/$BACKUP_FILE" > /dev/null 2>&1; then
    echo "Backup created successfully: $BACKUP_FILE"
    echo "File size: $(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)"
else
    echo "Backup verification failed!"
    exit 1
fi

# Clean old backups (keep last 7)
echo "Cleaning old backups..."
find "$BACKUP_DIR" -name "backup_*.tar.gz.gpg" -mtime +7 -delete

echo "Backup process completed."
```

### Digital Signature Verification Script
```bash
#!/bin/bash
# Script to verify digital signatures on downloads

# Usage: ./verify-signature.sh file.tar.gz file.tar.gz.asc

FILE="$1"
SIGNATURE="$2"

if [ $# -ne 2 ]; then
    echo "Usage: $0 ` <signature>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "Error: File '$FILE' not found"
    exit 1
fi

if [ ! -f "$SIGNATURE" ]; then
    echo "Error: Signature file '$SIGNATURE' not found"
    exit 1
fi

echo "Verifying signature for '$FILE'..."

# Verify signature
if gpg --verify "$SIGNATURE" "$FILE" 2>/dev/null; then
    echo "✓ Signature verification successful!"

    # Show key information
    KEY_ID=$(gpg --status-fd 1 --verify "$SIGNATURE" "$FILE" 2>&1 | grep "SIG_ID" | cut -d' ' -f4 | cut -d'!' -f1)
    if [ -n "$KEY_ID" ]; then
        echo "Key ID: $KEY_ID"
        gpg --list-keys --with-fingerprint "$KEY_ID"
    fi

    exit 0
else
    echo "✗ Signature verification failed!"
    echo "The file may be corrupted or tampered with."
    exit 1
fi
```

### Key Distribution Script
```bash
#!/bin/bash
# Key Distribution and Management Script

EMAIL="alice@example.com"
KEYSERVERS=("hkps://keys.openpgp.org" "hkps://pgp.mit.edu")

echo "Distributing GPG key for $EMAIL"

# Export public key
echo "Exporting public key..."
gpg --armor --export "$EMAIL" > "${EMAIL}.asc"

# Upload to multiple keyservers
for server in "${KEYSERVERS[@]}"; do
    echo "Uploading to $server..."
    gpg --keyserver "$server" --send-keys "$EMAIL"
done

# Generate fingerprint display
echo -e "\n=== Key Information ==="
gpg --fingerprint "$EMAIL"

echo -e "\n=== Public Key ==="
cat "${EMAIL}.asc"

echo -e "\nKey has been exported to ${EMAIL}.asc and uploaded to keyservers"
echo "Share this file or the fingerprint with others to verify your identity."
```

## Related Commands

- [`openssl`](/docs/commands/security/openssl) - OpenSSL cryptographic toolkit
- [`ssh-keygen`](/docs/commands/security/ssh-keygen) - SSH key generation
- [`keybase`](/docs/commands/security/keybase) - Keybase client
- [`pass`](/docs/commands/security/pass) - Password manager
- [`gpg-agent`](/docs/commands/security/gpg-agent) - GPG secret key daemon
- [`gpgconf`](/docs/commands/security/gpgconf) - GPG configuration utility

## Best Practices

### Key Security
1. **Strong passphrases** - Use long, complex passphrases with multiple character types
2. **Secure backup** - Backup private keys securely, preferably offline and encrypted
3. **Separate subkeys** - Use subkeys for daily operations, keep primary key offline
4. **Regular rotation** - Rotate keys periodically, especially if compromised
5. **Hardware tokens** - Consider using YubiKey or other hardware security modules
6. **Revocation certificates** - Generate and securely store revocation certificates

### Trust Management
1. **Verify identities** - Always verify key fingerprints through multiple channels
2. **Web of trust** - Participate in key signing events to build trust network
3. **Documentation** - Keep records of how you verified each key
4. **Regular updates** - Refresh keys regularly to check for revocations
5. **Trust levels** - Use appropriate trust levels based on verification

### Encryption Best Practices
1. **Strong algorithms** - Use modern algorithms like AES-256, RSA-4096, ECC
2. **Recipient verification** - Double-check recipient keys before encryption
3. **Secure channels** - Exchange keys through secure, verified channels
4. **Regular backups** - Backup encrypted data and decryption keys separately
5. **Key expiration** - Set reasonable expiration dates on keys

### Common Pitfalls to Avoid
1. **Weak passphrases** - Never use weak or easily guessable passphrases
2. **Key compromise** - Report and revoke compromised keys immediately
3. **Trust boundaries** - Don't trust keys without proper verification
4. **Backup neglect** - Always maintain secure backups of private keys
5. **Software updates** - Keep GPG software updated for security patches

The `gpg` command provides a complete implementation of the OpenPGP standard, enabling secure communication, data protection, and identity verification through public key cryptography.