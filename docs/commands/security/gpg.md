---
title: gpg - GNU Privacy Guard
sidebar_label: gpg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gpg - GNU Privacy Guard

The `gpg` command is the OpenPGP implementation of the GNU Privacy Guard, providing a complete and free implementation of the OpenPGP standard as defined by RFC4880. GPG enables cryptographic privacy and authentication through data encryption and digital signatures. It supports symmetric and asymmetric encryption, digital signatures, key management, and trust relationships, making it the de facto standard for secure communication, data protection, and identity verification in open-source environments. GPG is widely used for software distribution verification, secure email communication, encrypted file storage, and establishing trust relationships through its web of trust system.

## Supported Algorithms

### Public Key Algorithms
- **RSA** - RSA encryption and signing (1024-16384 bits)
- **ELG** - ElGamal encryption (public key encryption)
- **DSA** - Digital Signature Algorithm (signing only)
- **ECDH** - Elliptic Curve Diffie-Hellman (encryption)
- **ECDSA** - Elliptic Curve Digital Signature Algorithm
- **EDDSA** - Edwards-curve Digital Signature Algorithm

### Symmetric Cipher Algorithms
- **IDEA** - International Data Encryption Algorithm
- **3DES** - Triple Data Encryption Standard
- **CAST5** - CAST-128 block cipher
- **BLOWFISH** - Symmetric block cipher
- **AES** - Advanced Encryption Standard (128-bit)
- **AES192** - Advanced Encryption Standard (192-bit)
- **AES256** - Advanced Encryption Standard (256-bit)
- **TWOFISH** - Symmetric block cipher
- **CAMELLIA128** - Camellia cipher (128-bit)
- **CAMELLIA192** - Camellia cipher (192-bit)
- **CAMELLIA256** - Camellia cipher (256-bit)

### Hash Algorithms
- **SHA1** - Secure Hash Algorithm 1 (deprecated for signatures)
- **RIPEMD160** - RACE Integrity Primitives Evaluation Message Digest
- **SHA256** - Secure Hash Algorithm 256-bit
- **SHA384** - Secure Hash Algorithm 384-bit
- **SHA512** - Secure Hash Algorithm 512-bit
- **SHA224** - Secure Hash Algorithm 224-bit

### Compression Algorithms
- **Uncompressed** - No compression
- **ZIP** - ZIP compression (compatible with PGP)
- **ZLIB** - zlib compression algorithm
- **BZIP2** - Burrows-Wheeler block sorting compression

## Basic Syntax

```bash
gpg [options] command [command_options] [files...]
```

## Key Generation and Management Commands

### Key Generation
- `--generate-key` - Interactive full-featured key generation
- `--quick-generate-key USER-ID` - Quick generate with defaults
- `--full-generate-key` - Full interactive key generation wizard
- `--generate-revocation USER-ID` - Generate revocation certificate

### Key Listing and Display
- `--list-keys [PATTERN]` - List public keys with detailed information
- `--list-secret-keys [PATTERN]` - List secret/private keys
- `--list-public-keys [PATTERN]` - Alias for --list-keys
- `--fingerprint [PATTERN]` - Display key fingerprints
- `--list-sigs [PATTERN]` - List keys and their signatures
- `--check-sigs [PATTERN]` - List and verify key signatures
- `--with-colons` - Use colon format for script parsing
- `--with-fingerprint` - Include fingerprints in listings
- `--with-subkey-fingerprints` - Show subkey fingerprints

### Key Deletion
- `--delete-keys USER-ID` - Remove public keys from keyring
- `--delete-secret-keys USER-ID` - Remove private keys from keyring
- `--delete-secret-and-public-keys USER-ID` - Remove both key types

### Key Editing
- `--edit-key USER-ID` - Interactive key editing and signing
- `--change-passphrase USER-ID` - Change key passphrase
- `--quick-add-uid USER-ID NAME` - Add new user ID quickly
- `--quick-revoke-uid USER-ID NAME` - Revoke user ID quickly
- `--quick-set-expire USER-ID EXPIRE` - Set expiration date quickly
- `--quick-add-key USER-ID [ALGO]` - Add subkey quickly

## Encryption and Decryption Commands

### Encryption
- `-e, --encrypt` - Encrypt data with public key(s)
- `-c, --symmetric` - Encrypt with symmetric cipher only
- `-r, --recipient USER-ID` - Specify encryption recipient
- `-u, --local-user USER-ID` - Use this key for signing
- `--sign` - Create and sign encrypted message
- `--encrypt-and-sign` - Encrypt and sign combined
- `--store` - Store without encryption (identity encoding)

### Decryption
- `-d, --decrypt` - Decrypt data (default action)
- `--decrypt-files` - Decrypt multiple files
- `--verify` - Verify signature without decryption
- `--verify-files` - Verify multiple file signatures
- `--list-packets` - List OpenPGP packets in file
- `--show-session-key` - Show session key during decryption

## Digital Signature Commands

### Creating Signatures
- `-s, --sign` - Make a binary signature
- `--clear-sign` - Make a cleartext signature
- `-b, --detach-sign` - Create detached signature file
- `--sign-and-encrypt` - Sign and encrypt in one step
- `--local-sign` - Create non-exportable signature
- `--attribute-sign` - Sign attribute packets

### Verification
- `--verify` - Verify signature
- `--verify-files` - Verify multiple signatures
- `--multifile` - Handle multiple input files
- `--sign-with` - Use specific key for signing

## Key Import and Export Commands

### Exporting Keys
- `--export [PATTERN]` - Export public keys in binary format
- `--export-secret-keys [PATTERN]` - Export private keys
- `--export-secret-subkeys [PATTERN]` - Export only subkeys
- `--export-ownertrust` - Export trust database

### Importing Keys
- `--import FILES` - Import keys from files
- `--import-files PATTERN` - Import files matching pattern
- `--fast-import` - Import without trust checks
- `--import-ownertrust` - Import trust database
- `--recv-keys KEYIDS` - Receive keys from keyserver
- `--send-keys KEYIDS` - Send keys to keyserver
- `--search-keys TEXT` - Search keys on keyserver
- `--refresh-keys [PATTERN]` - Update keys from keyserver
- `--fetch-keys URL` - Import keys from HTTP/HTTPS URL

## Configuration and Output Options

### Output Formatting
- `-a, --armor` - Create ASCII armored output
- `-o, --output FILE` - Write output to specified file
- `--textmode` - Use canonical text mode
- `--no-textmode` - Disable text mode
- `--set-filename FILENAME` - Set filename in encrypted data
- `--for-your-eyes-only` - Mark as "for your eyes only"

### File Processing
- `--output FILE` - Specify output file
- `--quiet` - Minimize output
- `--no-greeting` - Suppress version message
- `--no-secmem-warning` - Suppress secure memory warning
- `--no-permission-warning` - Suppress permission warnings

### Behavior Control
- `--yes` - Assume "yes" on all prompts
- `--no` - Assume "no" on all prompts
- `--batch` - Run in batch mode, no interaction
- `--no-batch` - Disable batch mode
- `-i, --interactive` - Prompt before overwriting
- `--dry-run` - Show what would happen without doing it

### Algorithm Selection
- `--cipher-algo NAME` - Specify symmetric cipher
- `--digest-algo NAME` - Specify hash algorithm
- `--cert-digest-algo NAME` - Cert hash algorithm
- `--compress-algo NAME` - Specify compression
- `--compress-level N` - Set compression level (0-9)
- `--s2k-cipher-algo NAME` - String-to-key cipher
- `--s2k-digest-algo NAME` - String-to-key digest
- `--s2k-mode N` - String-to-key mode
- `--s2k-count N` - String-to-key iteration count

## Advanced Configuration Options

### Key Server Settings
- `--keyserver HOST[:PORT]` - Specify keyserver
- `--keyserver-options OPTIONS` - Key server options
- `--auto-key-locate MECHANISMS` - Automatic key location
- `--keyid-format FORMAT` - Key ID display format
- `--with-key-data` - Include key data in listings

### Trust and Verification
- `--trusted-key KEYID` - Mark key as trusted
- `--load-extension FILE` - Load extension module
- `--disable-ccid` - Disable CCID smart card reader
- `--status-fd FD` - Write status to file descriptor
- `--logger-fd FD` - Write logs to file descriptor

### Performance and Memory
- `--display-charset NAME` - Set character set for display
- `--utf8-strings` - Assume UTF-8 string arguments
- `--no-utf8-strings` - Don't assume UTF-8 strings
- `--options FILE` - Read options from file
- `--no-options` - Don't read option files
- `--homedir DIR` - Use different home directory

## Usage Examples

### GPG Setup and Initial Configuration

#### Basic Environment Setup
```bash
# Check GPG version and installation
gpg --version

# Create GPG directory with proper permissions
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

# Display default configuration and options
gpg --dump-options

# Create basic configuration file
cat > ~/.gnupg/gpg.conf << 'EOF'
# Basic GPG configuration
keyserver hkps://keys.openpgp.org
keyserver hkps://pgp.mit.edu
default-key alice@example.com
cert-digest-algo SHA256
digest-algo SHA256
cipher-algo AES256
compress-algo 1
personal-digest-preferences SHA512 SHA384 SHA256 SHA224
personal-cipher-preferences AES256 AES192 AES CAST5
personal-compress-preferences ZLIB BZIP2 ZIP Uncompressed
EOF

# Set proper permissions on config files
chmod 600 ~/.gnupg/gpg.conf
```

### Key Generation and Management

#### Quick Key Generation for Different Use Cases
```bash
# Generate basic key with email only
gpg --quick-generate-key alice@example.com

# Generate key with full name and email
gpg --quick-generate-key "Alice Smith <alice@example.com>"

# Generate key with specific algorithm
gpg --quick-generate-key alice@example.com rsa4096

# Generate key with expiration date
gpg --quick-generate-key alice@example.com rsa4096 cert 2y

# Generate key for specific purpose
gpg --quick-generate-key alice@example.com future-default default 1y

# Generate key with comment
gpg --quick-generate-key "Alice Smith (Work) <alice@work.com>"
```

#### Full Interactive Key Generation
```bash
# Start interactive key generation wizard
gpg --full-generate-key

# Interactive prompts and example responses:
# Please select what kind of key you want:
#    (1) RSA and RSA (default)
#    (2) DSA and Elgamal
#    (3) DSA (sign only)
#    (4) RSA (sign only)
#    (7) DSA (set your own capabilities)
#    (8) RSA (set your own capabilities)
#    (9) ECC and ECC
#   (10) ECC (sign only)
#   (11) ECC (set your own capabilities)
# Your selection? 1

# RSA keys may be between 1024 and 4096 bits long.
# What keysize do you want? (3072) 4096

# Please specify how long the key should be valid.
#         0 = key does not expire
#      <n>  = key expires in n days
#      <n>w = key expires in n weeks
#      <n>m = key expires in n months
#      <n>y = key expires in n years
# Key is valid for? (0) 2y

# Key expires at Thu 28 Nov 2026 03:15:00 PM UTC
# Is this correct? (y/N) y

# GnuPG needs to construct a user ID to identify your key.
# Real name: Alice Smith
# Email address: alice@example.com
# Comment: Work Key
# You selected this USER-ID:
#     "Alice Smith (Work Key) <alice@example.com>"

# Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O

# ┌──────────────────────────────────────────────────────┐
# │ Please enter the passphrase to protect your new key   │
# │                                                      │
# │ Passphrase: ________________________________________ │
# │                                                      │
# │       <OK>                              <Cancel>     │
# └──────────────────────────────────────────────────────┘

# Repeat passphrase:
# Passphrase: ________________________________________
# │                                                      │
# │       <OK>                              <Cancel>     │
# └──────────────────────────────────────────────────────┘
```

#### Advanced Subkey Management
```bash
# Generate encryption subkey
gpg --quick-add-key alice@example.com cv25519 encrypt 2y

# Generate signing subkey
gpg --quick-add-key alice@example.com ed25519 sign 2y

# Generate authentication subkey
gpg --quick-add-key alice@example.com rsa4096 auth 2y

# Generate subkey with specific curve
gpg --quick-add-key alice@example.com brainpoolP512r1 encrypt 2y

# List keys with subkey details
gpg --list-keys --with-subkey-fingerprints alice@example.com

# Show key hierarchy and capabilities
gpg --list-keys --list-options show-usage alice@example.com
```

### Key Listing and Information Display

#### Comprehensive Key Information
```bash
# List all public keys
gpg --list-keys

# List all secret keys
gpg --list-secret-keys

# List keys with fingerprints
gpg --list-keys --with-fingerprint

# Show detailed key information
gpg --list-keys --with-subkey-fingerprints --with-fingerprint alice@example.com

# Display key in colon format for scripts
gpg --list-keys --with-colons alice@example.com

# Show key creation and expiration dates
gpg --list-keys --with-fingerprint --fixed-list-mode --list-options show-unusable-subkeys alice@example.com

# List keys with trust levels
gpg --list-keys --list-options show-uid-validity alice@example.com

# Display all signatures on a key
gpg --list-sigs alice@example.com

# Check and verify all signatures
gpg --check-sigs alice@example.com

# Show key fingerprint only
gpg --fingerprint alice@example.com

# Display key usage capabilities
gpg --list-keys --list-options show-usage alice@example.com

# Show key in machine-readable format
gpg --export --export-options export-minimal alice@example.com | gpg --list-packets
```

#### Key Trust and Validation
```bash
# Check if key exists and is valid
gpg --list-keys alice@example.com && echo "Key exists" || echo "Key not found"

# Show trust levels for all keys
gpg --list-keys --with-colons | grep '^pub:' | cut -d: -f2

# Display key expiration information
gpg --list-keys --fixed-list-mode alice@example.com | grep '^pub:'

# Check if key is expired
gpg --list-keys --with-colons alice@example.com | grep '^pub:' | cut -d: -f7 | grep -q '^exp' && echo "Key expired" || echo "Key valid"

# Show key revocation status
gpg --list-keys --list-options show-unusable-subkeys alice@example.com
```

### Encryption and Decryption Operations

#### Symmetric Encryption
```bash
# Encrypt file with password protection
gpg -c document.txt

# Encrypt with specific cipher algorithm
gpg -c --cipher-algo AES256 document.txt

# Encrypt with custom compression
gpg -c --compress-algo ZLIB --compress-level 9 document.txt

# Encrypt with specific output file
gpg -c -o document.txt.gpg document.txt

# Encrypt with custom S2K settings
gpg -c --s2k-mode 3 --s2k-count 65011712 document.txt

# Encrypt with ASCII armor
gpg -c -a document.txt

# Encrypt multiple files with password
for file in *.txt; do
    gpg -c --batch --passphrase "SecurePass123" "$file"
done

# Encrypt directory (create archive first)
tar -czf - documents/ | gpg -c -o documents.tar.gz.gpg

# Encrypt with minimal output
gpg -c --quiet document.txt
```

#### Asymmetric (Public Key) Encryption
```bash
# Encrypt file for single recipient
gpg -e -r alice@example.com document.txt

# Encrypt for multiple recipients
gpg -e -r alice@example.com -r bob@example.com -r charlie@example.com document.txt

# Encrypt and sign simultaneously
gpg -se -r bob@example.com -u alice@example.com document.txt

# Encrypt with ASCII armor
gpg -ea -r bob@example.com document.txt

# Encrypt with specific output file
gpg -e -o document.enc -r alice@example.com document.txt

# Encrypt with specific cipher
gpg -e --cipher-algo AES256 -r alice@example.com sensitive_file.txt

# Encrypt with compression disabled
gpg -e --compress-algo 0 -r alice@example.com precompressed_file.zip

# Encrypt without using MDC (older compatibility)
gpg -e --disable-mdc --force-mdc -r alice@example.com document.txt

# Encrypt with recipient hidden
gpg -e --hidden-recipient alice@example.com document.txt

# Encrypt for groups of recipients
gpg -e -r team@example.com -r manager@example.com project_data.csv

# Encrypt directory for recipient
tar -czf - project/ | gpg -e -r alice@example.com -o project.tar.gz.gpg

# Encrypt streaming data
echo "Secret message" | gpg -e -r alice@example.com > secret.gpg
```

#### Decryption Operations
```bash
# Decrypt encrypted file
gpg document.txt.gpg

# Decrypt to specific output file
gpg -o decrypted.txt --decrypt document.enc

# Decrypt with verbose output
gpg -v document.txt.gpg

# Decrypt password-protected file
gpg document.txt.gpg
# (will prompt for password)

# Decrypt multiple files
for file in *.gpg; do
    gpg "$file"
done

# Decrypt and verify signature
gpg signed_document.gpg

# Decrypt with session key display
gpg --show-session-key document.txt.gpg

# Decrypt to stdout
gpg -d document.txt.gpg > document.txt

# Decrypt and extract archive
gpg -d documents.tar.gz.gpg | tar -xzf -

# Decrypt with specific key
gpg -u alice@example.com --decrypt document.txt.gpg

# Decrypt with multiple possible keys
gpg --try-secret-key alice@example.com --try-secret-key bob@example.com document.txt.gpg

# Decrypt and show metadata
gpg --list-packets document.txt.gpg
```

### Digital Signatures

#### Creating Various Signature Types
```bash
# Create binary signature (default)
gpg -s document.txt

# Create detached signature
gpg -b document.txt

# Create cleartext signature
gpg --clear-sign document.txt

# Sign with specific key
gpg -u alice@example.com -s document.txt

# Create ASCII armored signature
gpg -a -b document.txt

# Sign and encrypt in one operation
gpg -se -r bob@example.com document.txt

# Create detached signature with custom output
gpg -b --output document.sig document.txt

# Sign with specific hash algorithm
gpg --digest-algo SHA512 -s document.txt

# Sign with text mode
gpg --textmode -s document.txt

# Sign without compression
gpg --compress-algo 0 -s document.txt

# Sign with timestamp policy
gpg -s --force-v3-sigs document.txt

# Create local signature (non-exportable)
gpg --local-sign alice@example.com

# Sign multiple files
for file in *.pdf; do
    gpg -b "$file"
done

# Sign archive
tar -czf - documents/ | gpg -b --output documents.tar.gz.sig

# Sign with custom user ID
gpg -u "Alice Smith <alice@work.com>" -s document.txt
```

#### Verifying Signatures
```bash
# Verify signature with original file
gpg --verify document.txt.sig document.txt

# Verify detached signature only
gpg --verify document.txt.sig

# Verify cleartext signature
gpg --verify document.txt.asc

# Verify with verbose output
gpg -v --verify document.txt.sig document.txt

# Verify and show key fingerprint
gpg --show-fingerprint --verify document.txt.sig document.txt

# Verify multiple signatures
for file in *.sig; do
    echo "Verifying $file"
    gpg --verify "$file" "${file%.sig}"
done

# Verify with status output
gpg --status-fd 1 --verify document.txt.sig document.txt

# Verify and show signer's key information
gpg --verify document.txt.sig document.txt 2>&1 | grep -E "(using|from)"

# Verify signature on archive
tar -tzf documents.tar.gz | head -5
gpg --verify documents.tar.gz.sig

# Batch verification
gpg --verify-files *.sig

# Verify with key server lookup
gpg --keyserver keys.openpgp.org --verify document.txt.sig document.txt
```

#### Advanced Signature Operations
```bash
# Sign key to indicate trust
gpg --sign-key bob@example.com

# Create local-only signature
gpg --lsign-key bob@example.com

# Sign multiple keys at once
for key in alice@example.com bob@example.com charlie@example.com; do
    gpg --sign-key "$key"
done

# Quick sign with minimal interaction
gpg --quick-sign-key bob@example.com

# Quick local sign
gpg --quick-lsign-key bob@example.com

# Create certification signatures
gpg --cert-policy-url https://example.com/policy.txt --sign-key bob@example.com

# Sign with specific policy URL
gpg --sign-key --cert-policy-url "https://company.com/security-policy" bob@example.com

# Sign and add notation
gpg --sign-key --cert-notation "policy@example.com=https://example.com/policy" bob@example.com
```

### Key Import and Export Operations

#### Exporting Keys in Various Formats
```bash
# Export public key in binary format
gpg --export alice@example.com > alice-public.key

# Export public key with ASCII armor
gpg --armor --export alice@example.com > alice-public.asc

# Export private key (WARNING: handle with extreme care)
gpg --export-secret-keys alice@example.com > alice-secret.key

# Export private key with ASCII armor
gpg --armor --export-secret-keys alice@example.com > alice-secret.asc

# Export only subkeys
gpg --export-secret-subkeys alice@example.com > alice-subkeys.key

# Export multiple keys
gpg --armor --export alice@example.com bob@example.com > team_keys.asc

# Export all public keys
gpg --armor --export > all_public_keys.asc

# Export keys matching pattern
gpg --armor --export "@example.com" > company_keys.asc

# Export with minimal information
gpg --export --export-options export-minimal alice@example.com

# Export with sensitive attributes
gpg --export --export-options export-sensitive alice@example.com

# Export with specific output format
gpg --export --armor --output alice.asc alice@example.com

# Export revocation certificate
gpg --generate-revocation alice@example.com > alice-revoke.asc

# Export trust database
gpg --export-ownertrust > trustdb.txt

# Export key with creation date
gpg --export --export-options export-clean alice@example.com
```

#### Importing Keys and Trust Management
```bash
# Import public key
gpg --import alice-public.asc

# Import private key
gpg --import alice-secret.asc

# Import from multiple files
gpg --import alice.asc bob.asc charlie.asc

# Import from key server
gpg --recv-keys alice@example.com

# Import with automatic trust
gpg --import --import-options import-local-sigs alice-public.asc

# Import and trust ultimately
gpg --import alice-public.asc
gpg --edit-key alice@example.com
# > trust
# > 5 = I trust ultimately
# > y
# > save

# Import trust database
gpg --import-ownertrust trustdb.txt

# Import from URL
gpg --fetch-keys https://example.com/alice.asc

# Import from stdin
curl https://keys.openpgp.org/vks/v1/by-fingerprint/A1B2C3D4E5F6 | gpg --import

# Import with batch mode
gpg --batch --import *.asc

# Import and show statistics
gpg --import --import-options import-show alice.asc

# Import from keyserver with multiple keys
gpg --keyserver keys.openpgp.org --recv-keys \
    alice@example.com bob@example.com charlie@example.com

# Import specific key by fingerprint
gpg --keyserver hkps://keys.openpgp.org --recv-key \
    0123456789ABCDEF0123456789ABCDEF01234567
```

#### Key Server Operations
```bash
# Upload public key to keyserver
gpg --send-keys alice@example.com

# Download key from keyserver
gpg --recv-keys alice@example.com

# Search for keys on keyserver
gpg --search-keys "Alice Smith"

# Search by email address
gpg --search-keys alice@example.com

# Search by name
gpg --search-keys Alice Smith

# Upload to specific keyserver
gpg --keyserver hkps://keys.openpgp.org --send-keys alice@example.com

# Download from specific keyserver
gpg --keyserver hkps://pgp.mit.edu --recv-keys alice@example.com

# Search with verbose output
gpg --verbose --search-keys "Alice Smith"

# Refresh all keys from keyserver
gpg --refresh-keys

# Refresh specific keys
gpg --refresh-keys alice@example.com bob@example.com

# Search by key ID
gpg --search-keys 0123456789ABCDEF

# Download multiple keys
gpg --recv-keys alice@example.com bob@example.com charlie@example.com

# Search with multiple terms
gpg --search-keys "Alice Smith" alice@example.com

# Upload to multiple keyservers
for server in hkps://keys.openpgp.org hkps://pgp.mit.edu hkps://keyserver.ubuntu.com; do
    gpg --keyserver "$server" --send-keys alice@example.com
done

# Search and import in one step
gpg --search-keys --recv-keys alice@example.com

# Configure default keyserver
echo "keyserver hkps://keys.openpgp.org" >> ~/.gnupg/gpg.conf

# Refresh with verbose output
gpg --verbose --refresh-keys
```

### Key Editing and Maintenance

#### Interactive Key Editing
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
# showphoto  - Show photo ID
# check      - Check key health
# clean      - Clean unusable signatures from keyring
# minimize   - Remove all signatures except self-signatures
# save       - Save changes
# quit       - Quit without saving
# back       - Go back one level
# pref       - Set preference list
# updpref    - Update preference list
# notation   - Add notation data
# sign       - Sign the key
# lsign      - Sign locally

# Example key editing session:
# gpg --edit-key alice@example.com
# gpg> adduid
# Real name: Alice Johnson
# Email address: alice@personal.com
# Comment: Personal Key
# You selected this USER-ID:
#     "Alice Johnson (Personal Key) <alice@personal.com>"
#
# Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
#
# gpg> expire
# Changing expiration time for the primary key.
# Please specify how long the key should be valid.
# Key is valid for? (0) 1y
#
# gpg> addkey
# Please select what kind of key you want:
#    (4) RSA (sign only)
#    (6) RSA (set your own capabilities)
# Your selection? 4
# RSA keys may be between 1024 and 4096 bits long.
# What keysize do you want? (3072) 2048
#
# gpg> save
```

#### Key Maintenance and Management
```bash
# Change key passphrase
gpg --change-passphrase alice@example.com

# Add new user ID quickly
gpg --quick-add-uid alice@example.com "Alice Smith <alice@work.com>"

# Revoke user ID quickly
gpg --quick-revoke-uid alice@example.com "Alice Smith <alice@oldwork.com>"

# Set new expiration date
gpg --quick-set-expire alice@example.com 2025-12-31

# Generate revocation certificate
gpg --generate-revocation alice@example.com > alice-revoke.asc

# Delete public key
gpg --delete-key alice@example.com

# Delete secret key (must delete secret before public)
gpg --delete-secret-key alice@example.com
gpg --delete-key alice@example.com

# Delete secret and public keys together
gpg --delete-secret-and-public-keys alice@example.com

# Add photo ID
gpg --edit-key alice@example.com
# > addphoto
# (select photo file)
# > save

# Generate backup of secret key
gpg --armor --export-secret-keys --output backup-alice.asc alice@example.com

# Check key health and validity
gpg --check-trustdb

# Update trust database
gpg --update-trustdb

# Rebuild trust database (last resort)
rm ~/.gnupg/trustdb.gpg
gpg --update-trustdb

# Clean unusable keys
gpg --clean --all-keys

# Minimize key (remove non-self signatures)
gpg --minimize --all-keys

# Remove user ID from key
gpg --edit-key alice@example.com
# > uid 1 (select user ID to delete)
# > deluid
# > save

# Add subkey with custom expiration
gpg --quick-add-key alice@example.com rsa2048 encrypt 1y

# Revoke subkey
gpg --edit-key alice@example.com
# > key 1 (select subkey)
# > revkey
# > save

# Check key for weak keys
gpg --import --import-options import-weak-keys weak_key.asc

# Remove weak keys
gpg --edit-key alice@example.com
# > key 1 (select potentially weak subkey)
# > delkey
# > save
```

### Trust Management and Web of Trust

#### Trust Level Management
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

# Trust a key fully (after thorough verification)
gpg --edit-key charlie@example.com
# > trust
# > 4 = I trust fully
# > y
# > save

# Don't trust a key
gpg --edit-key unknown@example.com
# > trust
# > 2 = I do NOT trust
# > y
# > save

# Show current trust levels
gpg --list-keys --list-options show-uid-validity

# Display trust database information
gpg --check-trustdb

# Export owner trust
gpg --export-ownertrust > ownertrust.txt

# Import owner trust
gpg --import-ownertrust ownertrust.txt

# Clear all trust values
echo > ~/.gnupg/trustdb.gpg
gpg --update-trustdb

# Set trust for multiple keys
for key in bob@example.com charlie@example.com; do
    gpg --edit-key "$key" << EOF
trust
3
y
save
EOF
done
```

#### Key Signing for Web of Trust
```bash
# Sign someone's key after verification
gpg --sign-key bob@example.com

# Sign with specific key
gpg -u alice@example.com --sign-key bob@example.com

# Sign locally (not published to keyservers)
gpg --lsign-key bob@example.com

# Quick sign with minimal interaction
gpg --quick-sign-key bob@example.com

# Quick local sign
gpg --quick-lsign-key bob@example.com

# Sign key with notation
gpg --sign-key --cert-notation "verified@2025-11-28=true" bob@example.com

# Sign and add policy URL
gpg --sign-key --cert-policy-url "https://example.com/verification-policy" bob@example.com

# Sign key after fingerprint verification
# First verify fingerprint through secure channel
gpg --fingerprint bob@example.com
# Then sign
gpg --sign-key bob@example.com

# Create certification signature with specific trust level
gpg --sign-key --trust-level complete bob@example.com

# Sign multiple keys in batch
for key in bob@example.com charlie@example.com; do
    gpg --sign-key "$key"
done

# Export signatures to keyserver
gpg --send-keys bob@example.com charlie@example.com

# Sign key with timestamp
gpg --sign-key --sig-policy-url "https://example.com/timestamp-policy" bob@example.com
```

### Advanced Operations and Special Features

#### Smart Card and Hardware Token Support
```bash
# Check smart card status
gpg --card-status

# Edit card data
gpg --edit-card

# Change PIN on smart card
gpg --change-pin

# Generate key on smart card
gpg --card-edit
# > generate
# > Admin PIN: [enter admin PIN]
# > Key type: RSA
# > Key size: 2048
# > Expiration: 2y
# > User PIN: [enter user PIN]

# Move existing key to smart card
gpg --edit-key alice@example.com
# > key 1 (select subkey)
# > keytocard
# > 1 - signature key
# > 2 - encryption key
# > 3 - authentication key
# > 2
# > save

# List supported readers
gpg --status-fd 1 --card-status | grep reader

# Generate key entirely on card
gpg --card-edit
# > admin
# > generate
# > (follow prompts)

# Reset smart card (WARNING: destroys data)
gpg --card-edit
# > admin
# > factory-reset

# Backup smart card keys
gpg --card-edit
# > admin
# > backup

# Restore smart card backup
gpg --card-edit
# > admin
# > restore
```

#### Batch Operations and Automation
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

# Batch import keys
for keyfile in *.asc; do
    gpg --import "$keyfile"
done

# Encrypt with batch mode and passphrase file
echo "SecurePass123" > passphrase.txt
chmod 600 passphrase.txt
for file in *.txt; do
    gpg --batch --yes --passphrase-file passphrase.txt -c "$file"
done

# Batch key generation
cat > batch-keygen << 'EOF'
%echo Generating key
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: Batch User
Name-Email: batch@example.com
Expire-Date: 2y
Passphrase: BatchPass123
%commit
%echo done
EOF

gpg --batch --generate-key batch-keygen

# Delete temporary files
rm batch-keygen passphrase.txt

# Batch verify signatures
for sig in *.sig; do
    original="${sig%.sig}"
    if [ -f "$original" ]; then
        echo "Verifying $sig..."
        gpg --verify "$sig" "$original" && echo "✓ OK" || echo "✗ FAILED"
    fi
done

# Batch encrypt to multiple recipients
RECIPIENTS=("alice@example.com" "bob@example.com" "charlie@example.com")
for file in *.txt; do
    recipient_args=""
    for recipient in "${RECIPIENTS[@]}"; do
        recipient_args="$recipient_args -r $recipient"
    done
    gpg -e $recipient_args "$file"
done
```

#### Configuration File Management
```bash
# View current configuration
gpg --dump-options

# Edit configuration file
nano ~/.gnupg/gpg.conf

# Create comprehensive configuration
cat > ~/.gnupg/gpg.conf << 'EOF'
# GPG Configuration File

# Key servers
keyserver hkps://keys.openpgp.org
keyserver hkps://pgp.mit.edu
keyserver hkps://keyserver.ubuntu.com

# Default key (optional)
# default-key alice@example.com

# Algorithm preferences
personal-digest-preferences SHA512 SHA384 SHA256 SHA224
personal-cipher-preferences AES256 AES192 AES CAST5
personal-compress-preferences ZLIB BZIP2 ZIP Uncompressed

# Default algorithms
cert-digest-algo SHA256
digest-algo SHA256
cipher-algo AES256
compress-algo ZLIB

# Key behavior
default-recipient-self
no-emit-version
no-comments
use-agent
throw-keyids

# Display options
charset utf-8
fixed-list-mode
no-greeting
no-secmem-warning

# Key server options
keyserver-options auto-key-retrieve
keyserver-options timeout=10
keyserver-options ca-cert-file=/etc/ssl/certs/ca-certificates.crt

# Behavior
default-recipient-self
no-emit-version
no-comments
display-charset utf-8

# Security
require-secmem
require-cross-certification
no-sig-cache
no-auto-check-trustdb

# Output
armor
textmode
EOF

# Set proper permissions
chmod 600 ~/.gnupg/gpg.conf

# Create agent configuration
cat > ~/.gnupg/gpg-agent.conf << 'EOF
# GPG Agent Configuration

# Default cache TTL (seconds)
default-cache-ttl 3600

# Maximum cache TTL
max-cache-ttl 7200

# Pinentry program
pinentry-program /usr/bin/pinentry-curses

# Enable SSH support
enable-ssh-support

# Allow loopback passphrase entry
allow-loopback-pinentry

# Keep TTY
keep-tty
keep-display
EOF

chmod 600 ~/.gnupg/gpg-agent.conf

# Restart gpg-agent
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent
```

### Advanced Cryptographic Operations

#### Custom Algorithm Selection
```bash
# Encrypt with specific cipher
gpg -e --cipher-algo AES256 -r alice@example.com document.txt

# Sign with specific hash algorithm
gpg --digest-algo SHA512 -s document.txt

# Use elliptic curve cryptography
gpg --quick-generate-key alice@example.com future-default

# Use specific curve for key generation
gpg --batch --generate-key << EOF
Key-Type: EDDSA
Key-Curve: Ed25519
Subkey-Type: ECDH
Subkey-Curve: Curve25519
Name-Real: Alice Smith
Name-Email: alice@example.com
Expire-Date: 2y
%commit
EOF

# Generate DSA key
gpg --batch --generate-key << EOF
Key-Type: DSA
Key-Length: 3072
Subkey-Type: ELG-E
Subkey-Length: 3072
Name-Real: Alice Smith
Name-Email: alice@example.com
Expire-Date: 2y
%commit
EOF

# Use RSA with custom key size
gpg --quick-generate-key alice@example.com rsa8192

# Encrypt with custom compression
gpg -e --compress-algo BZIP2 --compress-level 9 -r alice@example.com document.txt

# Generate key with custom expiration
gpg --batch --generate-key << EOF
Key-Type: RSA
Key-Length: 4096
Subkey-Type: RSA
Subkey-Length: 4096
Name-Real: Alice Smith
Name-Email: alice@example.com
Expire-Date: 2026-12-31
%commit
EOF

# Use specific string-to-key settings
gpg -c --s2k-mode 3 --s2k-digest-algo SHA512 --s2k-cipher-algo AES256 document.txt

# Generate key with specific capabilities
gpg --batch --generate-key << EOF
Key-Type: RSA
Key-Length: 4096
Key-Usage: sign auth
Subkey-Type: RSA
Subkey-Length: 4096
Subkey-Usage: encrypt
Name-Real: Alice Smith
Name-Email: alice@example.com
Expire-Date: 2y
%commit
EOF
```

#### File Processing and Format Conversion
```bash
# Convert binary to ASCII armor
gpg --enarmor < binary_file.key > ascii_file.asc

# Convert ASCII armor to binary
gpg --dearmor < ascii_file.asc > binary_file.key

# Extract data from encrypted message
gpg --list-packets encrypted_file.gpg

# Extract only the message body
gpg --decrypt --output message.txt encrypted_file.gpg

# Extract metadata only
gpg --list-only encrypted_file.gpg

# Convert from PGP 2.x format to modern format
gpg --dearmor --output new_key.gpg old_key.pgp
gpg --import new_key.gpg

# Merge multiple key files
cat key1.asc key2.asc key3.asc > merged_keys.asc
gpg --import merged_keys.asc

# Split key file into multiple files
gpg --split-export-files --prefix team_key team_keys.asc

# Convert to different key formats
gpg --export --export-options export-ssh alice@example.com > alice_ssh.pub

# Export for different GPG versions
gpg --export --export-options export-pka alice@example.com > alice_pka.txt

# Extract only encryption subkey
gpg --export-secret-subkeys --filter-by-usage encrypt alice@example.com > encrypt_subkey.gpg
```

### Advanced Troubleshooting and Diagnostics

#### Debugging and Information Gathering
```bash
# Show GPG version and supported algorithms
gpg --version

# Display all available options
gpg --dump-options

# Show configuration being used
gpg --list-config

# Display debug information
gpg --debug-all --list-keys

# Show what GPG would do without executing
gpg --dry-run -e -r alice@example.com document.txt

# Check key database integrity
gpg --check-trustdb

# List available key servers
gpg --keyserver-options help

# Show memory usage statistics
gpg --status-fd 1 --list-keys | grep memory

# Test encryption without actual encryption
gpg --encrypt -r alice@example.com --dry-run document.txt

# Display help for specific command
gpg --help --list-key

# Show file information and packets
gpg --list-packets document.txt.gpg

# Debug import issues
gpg --import --verbose --debug-level expert problem_key.asc

# Check file permissions
ls -la ~/.gnupg/

# Test smart card detection
gpg --card-status --debug-all

# Verify GPG installation
gpg --check-sigs
```

#### Performance Optimization
```bash
# Disable compression for already compressed files
gpg -e --compress-algo 0 -r alice@example.com compressed_file.zip

# Use faster encryption for bulk operations
gpg -e --cipher-algo AES128 -r alice@example.com large_file.bin

# Optimize key lookup with key cache
echo "keyserver-options auto-key-retrieve" >> ~/.gnupg/gpg.conf

# Use parallel processing for batch operations
for file in *.txt; do
    gpg -e -r alice@example.com "$file" &
done
wait

# Optimize memory usage for large files
gpg --max-output 0x1000000 -e -r alice@example.com huge_file.bin

# Preload keys for faster operations
gpg --list-keys alice@example.com bob@example.com charlie@example.com

# Use specific compression settings for text vs binary
gpg -e --compress-algo 1 -r alice@example.com text_file.txt
gpg -e --compress-algo 0 -r alice@example.com binary_file.bin

# Optimize database access
gpg --batch --no-greeting --no-secmem-warning -e -r alice@example.com document.txt

# Use agent for caching passphrases
gpgconf --launch gpg-agent
```

## Practical Examples and Real-World Applications

### Complete Key Setup Workflow for New User
```bash
#!/bin/bash
# Complete GPG Key Setup Script for New User

set -e

EMAIL="alice@example.com"
NAME="Alice Smith"
PASSPHRASE="SecurePassphrase123!"

echo "=== GPG Key Setup for $NAME <$EMAIL> ==="

# Step 1: Setup environment
echo "Setting up GPG environment..."
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

# Step 2: Create configuration
echo "Creating configuration..."
cat > ~/.gnupg/gpg.conf << EOF
# GPG Configuration
keyserver hkps://keys.openpgp.org
personal-digest-preferences SHA512 SHA384 SHA256
personal-cipher-preferences AES256 AES192 AES
personal-compress-preferences ZLIB BZIP2 ZIP
cert-digest-algo SHA256
cipher-algo AES256
compress-algo ZLIB
no-emit-version
no-comments
use-agent
EOF

chmod 600 ~/.gnupg/gpg.conf

# Step 3: Generate primary key
echo "Generating primary key..."
gpg --batch --passphrase "$PASSPHRASE" --quick-generate-key \
    "$NAME <$EMAIL>" rsa4096 sign 2y

# Step 4: Generate encryption subkey
echo "Generating encryption subkey..."
gpg --batch --passphrase "$PASSPHRASE" \
    --quick-add-key "$EMAIL" cv25519 encrypt 2y

# Step 5: Generate authentication subkey
echo "Generating authentication subkey..."
gpg --batch --passphrase "$PASSPHRASE" \
    --quick-add-key "$EMAIL" rsa4096 auth 2y

# Step 6: Generate revocation certificate
echo "Generating revocation certificate..."
REVOCATION_FILE="${EMAIL}_revocation.asc"
gpg --batch --passphrase "$PASSPHRASE" \
    --generate-revocation "$EMAIL" > "$REVOCATION_FILE"

# Step 7: Export keys
echo "Exporting keys..."
PUBLIC_KEY="${EMAIL}_public.asc"
gpg --armor --export "$EMAIL" > "$PUBLIC_KEY"

# Step 8: Trust the key ultimately
echo "Setting trust level..."
gpg --command-fd 0 --edit-key "$EMAIL" << EOF
trust
5
y
save
EOF

# Step 9: Upload to keyserver
echo "Uploading to keyserver..."
gpg --send-keys "$EMAIL"

# Step 10: Display information
echo -e "\n=== Setup Complete ==="
echo "Key fingerprint:"
gpg --fingerprint "$EMAIL"
echo -e "\nKeys generated:"
echo "- Public key: $PUBLIC_KEY"
echo "- Revocation certificate: $REVOCATION_FILE"
echo -e "\nIMPORTANT:"
echo "1. Keep your revocation certificate secure and private!"
echo "2. Backup your secret key: gpg --armor --export-secret-keys '$EMAIL' > secret_key.asc"
echo "3. Never share your secret key or passphrase"
echo -e "\nYour public key is ready to share: $PUBLIC_KEY"
```

### Encrypted Backup and Archiving System
```bash
#!/bin/bash
# Advanced Encrypted Backup System

set -euo pipefail

# Configuration
SOURCE_DIR="/home/alice/documents"
BACKUP_DIR="/home/alice/backups"
RECIPIENTS=("alice@example.com" "backup@company.com")
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${TIMESTAMP}"
LOG_FILE="/var/log/backup_system.log"

# Function for logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to create encrypted backup
create_backup() {
    local source="$1"
    local output="$2"
    shift 2
    local recipients=("$@")

    log "Creating backup of $source"

    # Build recipient arguments
    local recipient_args=""
    for recipient in "${recipients[@]}"; do
        recipient_args="$recipient_args -r $recipient"
    done

    # Create compressed archive and encrypt
    if tar -czf - "$source" | gpg -e --compress-algo ZLIB --compress-level 9 $recipient_args --output "$output"; then
        log "Backup created successfully: $(basename "$output")"
        log "Backup size: $(du -h "$output" | cut -f1)"
        return 0
    else
        log "ERROR: Backup creation failed"
        return 1
    fi
}

# Function to verify backup integrity
verify_backup() {
    local backup_file="$1"

    log "Verifying backup: $(basename "$backup_file")"

    # Check if file can be opened and has valid GPG structure
    if gpg --list-packets "$backup_file" >/dev/null 2>&1; then
        log "Backup verification successful"
        return 0
    else
        log "ERROR: Backup verification failed"
        return 1
    fi
}

# Function to clean old backups
cleanup_old_backups() {
    local backup_pattern="$1"
    local days="$2"

    log "Cleaning backups older than $days days"

    local removed_count=0
    while IFS= read -r -d '' file; do
        log "Removing old backup: $(basename "$file")"
        rm "$file"
        ((removed_count++))
    done < <(find "$BACKUP_DIR" -name "$backup_pattern" -mtime +$days -print0)

    log "Removed $removed_count old backups"
}

# Main backup process
main() {
    # Create backup directory
    mkdir -p "$BACKUP_DIR"

    # Ensure backup directory has proper permissions
    chmod 750 "$BACKUP_DIR"

    # Full backup filename
    local backup_file="$BACKUP_DIR/${BACKUP_NAME}.tar.gz.gpg"

    log "Starting backup process"

    # Create backup
    if ! create_backup "$SOURCE_DIR" "$backup_file" "${RECIPIENTS[@]}"; then
        log "FATAL: Backup creation failed, exiting"
        exit 1
    fi

    # Verify backup
    if ! verify_backup "$backup_file"; then
        log "WARNING: Backup verification failed, but file was created"
    fi

    # Clean old backups
    cleanup_old_backups "backup_*.tar.gz.gpg" "$RETENTION_DAYS"

    # Create backup metadata
    local metadata_file="$BACKUP_DIR/${BACKUP_NAME}.metadata"
    cat > "$metadata_file" << EOF
Backup Metadata
===============
Created: $(date)
Source: $SOURCE_DIR
Size: $(du -h "$backup_file" | cut -f1)
Recipients: ${RECIPIENTS[*]}
Checksum: $(sha256sum "$backup_file" | cut -d' ' -f1)
EOF

    log "Backup process completed successfully"
    log "Backup file: $backup_file"
    log "Metadata: $metadata_file"

    # Display summary
    echo -e "\nBackup Summary:"
    echo "==============="
    echo "File: $(basename "$backup_file")"
    echo "Size: $(du -h "$backup_file" | cut -f1)"
    echo "Checksum: $(sha256sum "$backup_file" | cut -d' ' -f1)"
    echo "Recipients: ${RECIPIENTS[*]}"
}

# Execute main function
main "$@"
```

### Digital Signature Verification System
```bash
#!/bin/bash
# Comprehensive Digital Signature Verification System

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color="$1"
    local message="$2"
    echo -e "${color}${message}${NC}"
}

# Function to verify signature
verify_signature() {
    local file="$1"
    local signature="$2"

    print_status "$BLUE" "Verifying signature: $signature"
    print_status "$BLUE" "For file: $file"

    # Check if files exist
    if [[ ! -f "$file" ]]; then
        print_status "$RED" "ERROR: File '$file' not found"
        return 1
    fi

    if [[ ! -f "$signature" ]]; then
        print_status "$RED" "ERROR: Signature file '$signature' not found"
        return 1
    fi

    # Perform verification
    local verify_output
    if verify_output=$(gpg --status-fd 1 --verify "$signature" "$file" 2>&1); then
        print_status "$GREEN" "✓ Signature verification SUCCESSFUL!"

        # Extract key information
        local key_id
        key_id=$(echo "$verify_output" | grep "SIG_ID" | cut -d' ' -f4 | cut -d'!' -f1 | head -1)

        if [[ -n "$key_id" ]]; then
            print_status "$BLUE" "Key Information:"
            gpg --list-keys --with-fingerprint "$key_id" 2>/dev/null || \
                print_status "$YELLOW" "Key details not available in local keyring"
        fi

        # Show fingerprint
        local fingerprint
        fingerprint=$(echo "$verify_output" | grep "using RSA key" | head -1 | grep -o '[A-F0-9]\{40\}' | head -1)
        if [[ -n "$fingerprint" ]]; then
            print_status "$BLUE" "Fingerprint: $fingerprint"
        fi

        return 0
    else
        print_status "$RED" "✗ Signature verification FAILED!"
        print_status "$YELLOW" "Possible reasons:"
        print_status "$YELLOW" "- File has been modified"
        print_status "$YELLOW" "- Signature is corrupted"
        print_status "$YELLOW" "- Public key not available"
        print_status "$YELLOW" "- Wrong public key"
        echo
        print_status "$RED" "GPG output:"
        echo "$verify_output" | grep -E "(GOODSIG|BADSIG|ERRSIG|NO_PUBKEY)"

        return 1
    fi
}

# Function to verify multiple files
verify_multiple() {
    local pattern="$1"

    print_status "$BLUE" "Verifying multiple signatures matching: $pattern"

    local verified_count=0
    local failed_count=0

    for signature_file in $pattern; do
        if [[ ! -f "$signature_file" ]]; then
            continue
        fi

        # Determine original file name
        local original_file="${signature_file%.*}"
        if [[ "$signature_file" == *.asc ]] || [[ "$signature_file" == *.sig ]]; then
            original_file="${signature_file%.*}"
        else
            original_file="${signature_file}.sig"
            if [[ ! -f "$original_file" ]]; then
                original_file="${signature_file}.asc"
            fi
        fi

        if verify_signature "$original_file" "$signature_file"; then
            ((verified_count++))
        else
            ((failed_count++))
        fi
        echo
    done

    print_status "$BLUE" "Verification Summary:"
    print_status "$GREEN" "Successful: $verified_count"
    print_status "$RED" "Failed: $failed_count"

    return $((failed_count > 0))
}

# Function to download and verify
download_and_verify() {
    local url="$1"
    local signature_url="$2"
    local output_file="$3"

    print_status "$BLUE" "Downloading file: $url"
    if ! curl -fsSL -o "$output_file" "$url"; then
        print_status "$RED" "ERROR: Failed to download file"
        return 1
    fi

    print_status "$BLUE" "Downloading signature: $signature_url"
    local signature_file="${output_file}.sig"
    if ! curl -fsSL -o "$signature_file" "$signature_url"; then
        print_status "$RED" "ERROR: Failed to download signature"
        rm -f "$output_file"
        return 1
    fi

    # Verify downloaded file
    if verify_signature "$output_file" "$signature_file"; then
        print_status "$GREEN" "Downloaded file verified successfully"
        return 0
    else
        print_status "$RED" "WARNING: Downloaded file verification failed"
        print_status "$YELLOW" "Removing downloaded files"
        rm -f "$output_file" "$signature_file"
        return 1
    fi
}

# Function to refresh keys
refresh_keys() {
    print_status "$BLUE" "Refreshing keys from keyserver..."

    if gpg --refresh-keys; then
        print_status "$GREEN" "Keys refreshed successfully"
        return 0
    else
        print_status "$YELLOW" "Key refresh encountered issues"
        return 1
    fi
}

# Function to show help
show_help() {
    cat << EOF
Digital Signature Verification System

Usage: $0 [OPTIONS] COMMAND [ARGS...]

Commands:
    verify <file> <signature>     Verify single file signature
    multiple <pattern>           Verify multiple signatures
    download <url> <sig_url> <output> Download and verify file
    refresh                      Refresh keys from keyserver
    help                         Show this help

Examples:
    $0 verify document.txt document.txt.sig
    $0 multiple "*.sig"
    $0 download "https://example.com/app.tar.gz" "https://example.com/app.tar.gz.sig" "app.tar.gz"
    $0 refresh

EOF
}

# Main script logic
main() {
    case "${1:-help}" in
        "verify")
            if [[ $# -ne 3 ]]; then
                print_status "$RED" "ERROR: verify command requires file and signature arguments"
                show_help
                exit 1
            fi
            verify_signature "$2" "$3"
            ;;
        "multiple")
            if [[ $# -ne 2 ]]; then
                print_status "$RED" "ERROR: multiple command requires pattern argument"
                show_help
                exit 1
            fi
            verify_multiple "$2"
            ;;
        "download")
            if [[ $# -ne 4 ]]; then
                print_status "$RED" "ERROR: download command requires url, signature_url, and output arguments"
                show_help
                exit 1
            fi
            download_and_verify "$2" "$3" "$4"
            ;;
        "refresh")
            refresh_keys
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            print_status "$RED" "ERROR: Unknown command: ${1:-}"
            show_help
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
```

### Key Distribution and Trust Management System
```bash
#!/bin/bash
# Comprehensive Key Distribution and Trust Management System

set -euo pipefail

# Configuration
EMAIL="alice@example.com"
NAME="Alice Smith"
KEYSERVERS=("hkps://keys.openpgp.org" "hkps://pgp.mit.edu" "hkps://keyserver.ubuntu.com")
TRUST_LEVELS=("1=unknown" "2=none" "3=marginal" "4=full" "5=ultimate")

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_colored() {
    local color="$1"
    shift
    echo -e "${color}$*${NC}"
}

# Function to distribute key to multiple keyservers
distribute_key() {
    local email="$1"

    print_colored "$BLUE" "Distributing GPG key for $email"

    # Export public key
    local key_file="${email}.asc"
    gpg --armor --export "$email" > "$key_file"

    print_colored "$GREEN" "Public key exported: $key_file"

    # Upload to each keyserver
    for server in "${KEYSERVERS[@]}"; do
        print_colored "$BLUE" "Uploading to $server..."
        if gpg --keyserver "$server" --send-keys "$email"; then
            print_colored "$GREEN" "✓ Successfully uploaded to $server"
        else
            print_colored "$YELLOW" "⚠ Failed to upload to $server"
        fi
    done

    # Display key information
    echo -e "\n=== Key Information ==="
    gpg --fingerprint "$email"

    echo -e "\n=== Public Key ==="
    cat "$key_file"

    echo -e "\nKey distribution completed!"
    echo "Share this file with others: $key_file"
}

# Function to import and verify keys
import_and_verify_key() {
    local key_file="$1"
    local fingerprint_source="$2"  # Optional: how fingerprint was verified

    if [[ ! -f "$key_file" ]]; then
        print_colored "$YELLOW" "Error: Key file '$key_file' not found"
        return 1
    fi

    print_colored "$BLUE" "Importing key from $key_file"

    # Import the key
    local import_output
    if import_output=$(gpg --import "$key_file" 2>&1); then
        print_colored "$GREEN" "✓ Key imported successfully"

        # Extract key ID from import output
        local key_id
        key_id=$(echo "$import_output" | grep -o 'key [A-F0-9]\{16\}' | head -1 | cut -d' ' -f2)

        if [[ -n "$key_id" ]]; then
            print_colored "$BLUE" "Key ID: $key_id"

            # Show fingerprint for verification
            echo -e "\n=== Fingerprint (for verification) ==="
            gpg --fingerprint "$key_id"

            # Prompt for verification if fingerprint source provided
            if [[ -n "$fingerprint_source" ]]; then
                print_colored "$YELLOW" "Please verify this fingerprint using: $fingerprint_source"
                read -p "Press Enter after verification..."
            fi

            # Prompt for trust level
            echo -e "\nSet trust level for this key:"
            select level in "${TRUST_LEVELS[@]}"; do
                if [[ -n "$level" ]]; then
                    local trust_value="${level%%=*}"
                    gpg --command-fd 0 --edit-key "$key_id" << EOF
trust
$trust_value
y
save
EOF
                    print_colored "$GREEN" "Trust level set to: ${level#*=}"
                    break
                fi
            done

            # Offer to sign the key
            read -p "Do you want to sign this key? (y/N): " sign_choice
            if [[ "$sign_choice" =~ ^[Yy]$ ]]; then
                gpg --sign-key "$key_id"
                print_colored "$GREEN" "✓ Key signed successfully"
            fi
        fi

        return 0
    else
        print_colored "$YELLOW" "✗ Key import failed"
        echo "$import_output"
        return 1
    fi
}

# Function to search and import keys from keyserver
search_and_import() {
    local search_term="$1"

    print_colored "$BLUE" "Searching for keys matching: $search_term"

    # Search on primary keyserver
    local search_results
    if search_results=$(gpg --keyserver "${KEYSERVERS[0]}" --search-keys "$search_term" 2>&1); then
        print_colored "$GREEN" "Search results:"
        echo "$search_results"

        # Interactive selection
        echo -e "\nEnter the number of the key to import (or 'q' to quit):"
        read -r key_selection

        if [[ "$key_selection" =~ ^[Qq]$ ]]; then
            print_colored "$BLUE" "Quitting"
            return 0
        elif [[ "$key_selection" =~ ^[0-9]+$ ]]; then
            print_colored "$BLUE" "Importing key selection: $key_selection"
            echo "$key_selection" | gpg --keyserver "${KEYSERVERS[0]}" --recv-keys
            return 0
        else
            print_colored "$YELLOW" "Invalid selection"
            return 1
        fi
    else
        print_colored "$YELLOW" "Search failed or no results found"
        return 1
    fi
}

# Function to manage trust database
manage_trust_db() {
    print_colored "$BLUE" "Trust Database Management"

    echo "Select operation:"
    echo "1) Check trust database"
    echo "2) Update trust database"
    echo "3) Export trust database"
    echo "4) Import trust database"
    echo "5) Show trust statistics"

    read -p "Enter choice (1-5): " choice

    case "$choice" in
        1)
            print_colored "$BLUE" "Checking trust database..."
            gpg --check-trustdb
            ;;
        2)
            print_colored "$BLUE" "Updating trust database..."
            gpg --update-trustdb
            ;;
        3)
            local trust_file="trustdb_backup_$(date +%Y%m%d_%H%M%S).txt"
            print_colored "$BLUE" "Exporting trust database to $trust_file..."
            gpg --export-ownertrust > "$trust_file"
            print_colored "$GREEN" "✓ Trust database exported"
            ;;
        4)
            read -p "Enter trust file path: " trust_file
            if [[ -f "$trust_file" ]]; then
                print_colored "$BLUE" "Importing trust database from $trust_file..."
                gpg --import-ownertrust "$trust_file"
                print_colored "$GREEN" "✓ Trust database imported"
            else
                print_colored "$YELLOW" "Error: Trust file not found"
            fi
            ;;
        5)
            print_colored "$BLUE" "Trust Statistics:"
            gpg --list-keys --with-colons | grep '^pub:' | wc -l | xargs echo "Public keys:"
            gpg --list-secret-keys --with-colons | grep '^sec:' | wc -l | xargs echo "Secret keys:"
            gpg --list-keys --with-colons | grep -c '^pub:[^:]*:[^:]*:[^:]*:[^:]*:[^:]*:u:' && echo "Ultimately trusted keys:"
            ;;
        *)
            print_colored "$YELLOW" "Invalid choice"
            ;;
    esac
}

# Function to generate key signing worksheet
generate_signing_worksheet() {
    local output_file="key_signing_worksheet_$(date +%Y%m%d).txt"

    cat > "$output_file" << EOF
Key Signing Worksheet - $(date)
===============================

Instructions for use:
1. Fill in verification methods for each key
2. Check government-issued ID against key owner
3. Verify fingerprint with key owner
4. Mark keys as verified
5. Sign verified keys

Keys to Sign:
------------

EOF

    # List all keys without trust
    gpg --list-keys --with-colons | grep '^pub:' | while IFS=: read -r _ _ _ _ _ _ keyid rest; do
        local fingerprint
        fingerprint=$(gpg --fingerprint "$keyid" | grep -o '[A-F0-9]\{40\}' | tr -d ' ')
        local user_ids
        user_ids=$(gpg --list-keys "$keyid" | grep '^uid' | sed 's/uid[[:space:]]*//')

        cat >> "$output_file" << EOF

Key ID: $keyid
Fingerprint: $fingerprint
User IDs: $user_ids

Verification Method:
□ Government ID checked
□ Email verified
□ Phone verified
□ In-person verification
□ Other: _________________________

Verified by: _________________________ Date: _______

Signature: _________________________

---

EOF
    done

    print_colored "$GREEN" "✓ Key signing worksheet generated: $output_file"
}

# Main function
main() {
    case "${1:-help}" in
        "distribute")
            distribute_key "$2"
            ;;
        "import")
            import_and_verify_key "$2" "${3:-}"
            ;;
        "search")
            search_and_import "$2"
            ;;
        "trust")
            manage_trust_db
            ;;
        "worksheet")
            generate_signing_worksheet
            ;;
        "help"|"--help"|"-h")
            cat << EOF
Key Distribution and Trust Management System

Usage: $0 [OPTIONS] COMMAND [ARGS...]

Commands:
    distribute <email>              Distribute key to multiple keyservers
    import <key_file> [method]      Import key and set trust (method: how fingerprint was verified)
    search <term>                   Search and import from keyserver
    trust                          Manage trust database
    worksheet                      Generate key signing worksheet
    help                           Show this help

Examples:
    $0 distribute alice@example.com
    $0 import bob.asc "phone call"
    $0 search "Bob Smith"
    $0 trust
    $0 worksheet

EOF
            ;;
        *)
            print_colored "$YELLOW" "Unknown command: ${1:-}"
            print_colored "$YELLOW" "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
```

### Integration with Development Workflow
```bash
#!/bin/bash
# GPG Integration for Development Workflow

set -euo pipefail

# Configuration
DEVELOPER_EMAIL="developer@company.com"
TEAM_RECIPIENTS=("alice@company.com" "bob@company.com" "charlie@company.com")
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SIGNATURE_DIR="${REPO_ROOT}/.git-signatures"

# Function to sign Git commits
setup_git_signing() {
    local email="${1:-$DEVELOPER_EMAIL}"

    echo "Setting up GPG signing for Git commits..."

    # Get key ID for email
    local key_id
    key_id=$(gpg --list-secret-keys --keyid-format LONG "$email" | grep '^sec' | head -1 | awk '{print $2}' | cut -d'/' -f2)

    if [[ -z "$key_id" ]]; then
        echo "Error: No key found for email: $email"
        return 1
    fi

    # Configure Git to use this key for signing
    git config user.signingkey "$key_id"
    git config commit.gpgsign true
    git config tag.gpgsign true

    echo "Git configured to sign commits and tags with key ID: $key_id"

    # Test signing
    if git commit --allow-empty -m "Test GPG signed commit"; then
        echo "✓ Test commit created successfully with GPG signature"
    else
        echo "✗ Failed to create test commit"
        return 1
    fi
}

# Function to sign release artifacts
sign_release() {
    local version="$1"
    shift
    local files=("$@")

    if [[ -z "$version" ]]; then
        echo "Error: Version number required"
        return 1
    fi

    echo "Signing release $version..."

    # Create signatures directory
    mkdir -p "$SIGNATURE_DIR"

    local signature_files=()

    for file in "${files[@]}"; do
        if [[ ! -f "$file" ]]; then
            echo "Warning: File not found: $file"
            continue
        fi

        # Create detached signature
        local signature_file="${SIGNATURE_DIR}/${file##*/}.asc"
        if gpg -a -b --output "$signature_file" "$file"; then
            echo "✓ Signed: $file -> $signature_file"
            signature_files+=("$signature_file")
        else
            echo "✗ Failed to sign: $file"
        fi
    done

    # Create checksums file
    local checksums_file="${SIGNATURE_DIR}/SHA256SUMS"
    echo "Creating checksums file: $checksums_file"

    for file in "${files[@]}"; do
        if [[ -f "$file" ]]; then
            sha256sum "$file" >> "$checksums_file"
        fi
    done

    # Sign checksums file
    gpg -a -b --output "${checksums_file}.asc" "$checksums_file"
    echo "✓ Signed checksums: ${checksums_file}.asc"

    # Create release manifest
    local manifest_file="${SIGNATURE_DIR}/RELEASE_${version}.txt"
    cat > "$manifest_file" << EOF
Release Manifest for version $version
=====================================

Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Signed by: $(git config user.name) <$(git config user.email)>

Files:
EOF

    for file in "${files[@]}"; do
        if [[ -f "$file" ]]; then
            local size
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "unknown")
            local checksum
            checksum=$(sha256sum "$file" | cut -d' ' -f1)
            printf "  %-30s %10s bytes  %s\n" "$(basename "$file")" "$size" "$checksum" >> "$manifest_file"
        fi
    done

    cat >> "$manifest_file" << EOF

Signatures:
EOF

    for sig_file in "${signature_files[@]}"; do
        echo "  $(basename "$sig_file")" >> "$manifest_file"
    done

    echo "  SHA256SUMS.asc" >> "$manifest_file"

    # Sign manifest
    gpg --clear-sign --output "${manifest_file}.asc" "$manifest_file"
    echo "✓ Signed manifest: ${manifest_file}.asc"

    echo -e "\nRelease signing complete!"
    echo "Files generated in: $SIGNATURE_DIR"
    ls -la "$SIGNATURE_DIR"
}

# Function to verify release
verify_release() {
    local version="$1"
    local release_dir="${2:-$SIGNATURE_DIR}"

    echo "Verifying release $version in $release_dir..."

    local manifest_file="${release_dir}/RELEASE_${version}.txt.asc"
    local checksums_file="${release_dir}/SHA256SUMS.asc"

    if [[ ! -f "$manifest_file" ]]; then
        echo "Error: Release manifest not found: $manifest_file"
        return 1
    fi

    # Verify manifest signature
    if gpg --verify "$manifest_file"; then
        echo "✓ Release manifest signature verified"
    else
        echo "✗ Release manifest signature verification failed"
        return 1
    fi

    # Verify checksums signature
    if [[ -f "$checksums_file" ]]; then
        if gpg --verify "$checksums_file" "${checksums_file%.asc}"; then
            echo "✓ Checksums signature verified"
        else
            echo "✗ Checksums signature verification failed"
            return 1
        fi
    fi

    # Verify file signatures and checksums
    local checksums_data="${checksums_file%.asc}"
    while IFS= read -r line; do
        local expected_checksum="${line%% *}"
        local filename="${line#* * }"

        if [[ -f "$filename" ]]; then
            # Verify checksum
            local actual_checksum
            actual_checksum=$(sha256sum "$filename" | cut -d' ' -f1)

            if [[ "$expected_checksum" == "$actual_checksum" ]]; then
                echo "✓ Checksum verified: $filename"

                # Verify signature if exists
                local sig_file="${filename}.asc"
                if [[ -f "$sig_file" ]]; then
                    if gpg --verify "$sig_file" "$filename"; then
                        echo "  ✓ Signature verified: $sig_file"
                    else
                        echo "  ✗ Signature verification failed: $sig_file"
                        return 1
                    fi
                fi
            else
                echo "✗ Checksum mismatch: $filename"
                echo "  Expected: $expected_checksum"
                echo "  Actual:   $actual_checksum"
                return 1
            fi
        else
            echo "Warning: File not found: $filename"
        fi
    done < "$checksums_data"

    echo -e "\n✓ All release verifications passed!"
}

# Function to encrypt sensitive configuration
encrypt_config() {
    local config_file="$1"
    local output_file="${2:-${config_file}.gpg}"

    if [[ ! -f "$config_file" ]]; then
        echo "Error: Configuration file not found: $config_file"
        return 1
    fi

    echo "Encrypting configuration file: $config_file"

    # Build recipient arguments
    local recipient_args=""
    for recipient in "${TEAM_RECIPIENTS[@]}"; do
        recipient_args="$recipient_args -r $recipient"
    done

    if gpg -e $recipient_args --compress-algo ZLIB --output "$output_file" "$config_file"; then
        echo "✓ Configuration encrypted: $output_file"

        # Verify encryption
        if gpg --list-packets "$output_file" >/dev/null 2>&1; then
            echo "✓ Encryption verified"
        else
            echo "Warning: Encryption verification failed"
        fi
    else
        echo "✗ Configuration encryption failed"
        return 1
    fi
}

# Function to decrypt configuration
decrypt_config() {
    local encrypted_file="$1"
    local output_file="${2:-${encrypted_file%.gpg}}"

    if [[ ! -f "$encrypted_file" ]]; then
        echo "Error: Encrypted file not found: $encrypted_file"
        return 1
    fi

    echo "Decrypting configuration file: $encrypted_file"

    if gpg --output "$output_file" --decrypt "$encrypted_file"; then
        echo "✓ Configuration decrypted: $output_file"

        # Set secure permissions
        chmod 600 "$output_file"
        echo "✓ Secure permissions set (600)"
    else
        echo "✗ Configuration decryption failed"
        return 1
    fi
}

# Function to backup Git repository with encryption
backup_repo() {
    local backup_dir="${1:-repo_backup_$(date +%Y%m%d_%H%M%S)}"
    local encrypted_backup="${backup_dir}.tar.gz.gpg"

    echo "Creating encrypted backup of repository..."

    # Create temporary directory
    mkdir -p "$backup_dir"

    # Backup repository content
    if git rev-parse --git-dir >/dev/null 2>&1; then
        # It's a git repository
        git archive --format=tar.gz --output="${backup_dir}/source.tar.gz" HEAD

        # Backup git metadata (excluding sensitive files)
        tar -czf "${backup_dir}/metadata.tar.gz" \
            --exclude='.git/objects/*' \
            --exclude='.git/logs/*' \
            --exclude='.git/refs/original/*' \
            .git/
    else
        # Not a git repository, just backup the directory
        tar -czf "${backup_dir}/source.tar.gz" --exclude='*.gpg' .
    fi

    # Create backup manifest
    cat > "${backup_dir}/MANIFEST.txt" << EOF
Repository Backup
=================

Backup created: $(date)
Source directory: $(pwd)
Git repository: $(git rev-parse --git-dir 2>/dev/null && echo "Yes" || echo "No")
Current branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "N/A")
Last commit: $(git log -1 --format="%H %s" 2>/dev/null || echo "N/A")

Files:
- source.tar.gz: Repository source code
- metadata.tar.gz: Git metadata (if applicable)
EOF

    # Encrypt backup
    tar -czf - "$backup_dir" | gpg -e -r "${TEAM_RECIPIENTS[0]}" --output "$encrypted_backup"

    # Cleanup temporary directory
    rm -rf "$backup_dir"

    echo "✓ Encrypted backup created: $encrypted_backup"
    echo "Backup size: $(du -h "$encrypted_backup" | cut -f1)"
}

# Main function
main() {
    case "${1:-help}" in
        "git-setup")
            setup_git_signing "$2"
            ;;
        "sign-release")
            shift
            sign_release "$@"
            ;;
        "verify-release")
            verify_release "$2" "$3"
            ;;
        "encrypt-config")
            encrypt_config "$2" "$3"
            ;;
        "decrypt-config")
            decrypt_config "$2" "$3"
            ;;
        "backup-repo")
            backup_repo "$2"
            ;;
        "help"|"--help"|"-h")
            cat << EOF
GPG Integration for Development Workflow

Usage: $0 [OPTIONS] COMMAND [ARGS...]

Commands:
    git-setup [email]              Configure Git to sign commits
    sign-release <version> <files> Sign release artifacts
    verify-release <version> [dir] Verify release signatures
    encrypt-config <file> [output] Encrypt configuration file
    decrypt-config <file> [output] Decrypt configuration file
    backup-repo [name]             Create encrypted repository backup
    help                           Show this help

Examples:
    $0 git-setup developer@company.com
    $0 sign-release v1.0.0 app.tar.gz README.md
    $0 verify-release v1.0.0
    $0 encrypt-config config.ini
    $0 decrypt-config config.ini.gpg
    $0 backup-repo

EOF
            ;;
        *)
            echo "Unknown command: ${1:-}"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
```

## Troubleshooting and Error Resolution

### Common Issues and Solutions

#### Permission and File Access Problems
```bash
# Fix GPG directory permissions
chmod 700 ~/.gnupg
chmod 600 ~/.gnupg/*

# Fix secure memory warnings
echo "disable-ccid" >> ~/.gnupg/gpg.conf
ulimit -l unlimited

# Resolve file permission issues for shared repositories
chmod 644 public_key.asc
chmod 600 secret_key.asc

# Fix timezone issues with signature verification
export TZ=UTC
gpg --verify document.sig

# Handle permission denied errors
sudo chown -R $USER:$USER ~/.gnupg
```

#### Memory and Performance Issues
```bash
# Increase secure memory limit
echo "disable-scdaemon" >> ~/.gnupg/gpg-agent.conf
gpgconf --reload gpg-agent

# Disable agent for batch operations
gpg --no-use-agent -e -r alice@example.com large_file.bin

# Optimize for large file processing
gpg --compress-algo 0 --cipher-algo AES128 -e -r alice@example.com large_file.bin

# Set appropriate memory limits
gpg --batch --no-tty --status-fd 1 -e -r alice@example.com file.bin

# Handle out-of-memory errors
echo "no-secmem-warning" >> ~/.gnupg/gpg.conf
```

#### Key Server and Network Issues
```bash
# Test key server connectivity
gpg --keyserver hkps://keys.openpgp.org --send-keys --dry-run alice@example.com

# Use HTTP fallback for network issues
gpg --keyserver hkp://pgp.mit.edu --recv-keys alice@example.com

# Increase timeout for slow connections
echo "keyserver-options timeout=30" >> ~/.gnupg/gpg.conf

# Use specific keyserver port
gpg --keyserver hkps://keys.openpgp.org:443 --recv-keys alice@example.com

# Handle proxy issues
export https_proxy=http://proxy.company.com:8080
gpg --keyserver hkps://keys.openpgp.org --recv-keys alice@example.com
```

#### Signature Verification Failures
```bash
# Debug signature verification
gpg --verbose --verify document.sig document.txt

# Check for expired keys
gpg --list-keys --with-colons alice@example.com | grep '^pub:' | cut -d: -f7

# Handle timestamp issues
export LC_TIME=C
gpg --verify document.sig document.txt

# Fix line ending issues for cleartext signatures
dos2unix document.txt.asc
gpg --verify document.txt.asc

# Handle different character encodings
gpg --display-charset utf-8 --verify document.sig document.txt
```

#### Import/Export Problems
```bash
# Fix binary key import issues
gpg --allow-non-selfsigned-uid --import problem_key.asc

# Handle large key imports
gpg --import-options import-show --import large_key_file.asc

# Fix armored format issues
gpg --dearmor < problematic_key.asc > fixed_key.gpg
gpg --import fixed_key.gpg

# Handle missing trust database
gpg --update-trustdb

# Fix corrupted keyring
mv ~/.gnupg/pubring.gpg ~/.gnupg/pubring.gpg.backup
gpg --import backup_keys.asc
```

#### Agent and Passphrase Issues
```bash
# Restart GPG agent
gpgconf --kill gpg-agent
gpgconf --launch gpg-agent

# Clear cached passphrases
gpg --forget-passphrase

# Reset agent configuration
rm ~/.gnupg/gpg-agent.conf
gpgconf --reload gpg-agent

# Handle agent timeout issues
echo "default-cache-ttl 7200" >> ~/.gnupg/gpg-agent.conf
echo "max-cache-ttl 86400" >> ~/.gnupg/gpg-agent.conf

# Disable agent for specific operations
gpg --no-use-agent -e -r alice@example.com document.txt
```

## Related Commands

- [`openssl`](/docs/commands/security/openssl) - OpenSSL cryptographic toolkit for X.509 and TLS operations
- [`ssh-keygen`](/docs/commands/security/ssh-keygen) - SSH key generation and management
- [`ssh-add`](/docs/commands/security/ssh-add) - SSH private key management and agent integration
- [`ssh-agent`](/docs/commands/security/ssh-agent) - SSH authentication agent for key management
- [`gpg-agent`](/docs/commands/security/gpg-agent) - GPG secret key daemon for passphrase caching
- [`gpgconf`](/docs/commands/security/gpgconf) - GPG configuration management utility
- [`base64`](/docs/commands/security/base64) - Base64 encoding and decoding
- [`md5sum`](/docs/commands/security/md5sum) - MD5 checksum calculation and verification
- [`sha256sum`](/docs/commands/security/sha256sum) - SHA-256 checksum calculation
- [`zip`](/docs/commands/compression/zip) - File compression with password protection
- [`tar`](/docs/commands/compression/tar) - Archive creation for GPG encryption

## Best Practices

### Key Management Security
1. **Strong Passphrases** - Use minimum 20 characters with mixed case, numbers, and special characters
2. **Secure Backup Strategy** - Backup private keys offline and encrypted, store revocation certificates separately
3. **Subkey Separation** - Use different subkeys for encryption, signing, and authentication; keep primary key offline
4. **Regular Rotation** - Rotate keys every 1-2 years or immediately if compromise is suspected
5. **Hardware Security** - Consider YubiKey, Nitrokey, or smart cards for critical keys
6. **Revocation Planning** - Generate and securely store revocation certificates during key creation

### Trust and Verification
1. **Multi-Channel Verification** - Verify fingerprints through in-person meetings, phone calls, and known-good websites
2. **Key Signing Parties** - Participate in organized key signing events to build trust network
3. **Documentation** - Keep detailed records of verification methods and dates for each signed key
4. **Regular Refreshes** - Refresh keys monthly to check for revocations and updates
5. **Trust Boundaries** - Use appropriate trust levels (marginal vs. full) based on verification thoroughness

### Encryption Best Practices
1. **Modern Algorithms** - Use AES-256 for encryption, RSA-4096 or ECC curves for keys, SHA-256 or better for hashing
2. **Recipient Verification** - Always double-check recipient fingerprints before encrypting sensitive data
3. **Secure Channels** - Exchange public keys through verified channels; verify fingerprints out-of-band
4. **Algorithm Preferences** - Configure strong algorithm preferences in gpg.conf for consistent security
5. **Metadata Protection** - Use `--hidden-recipient` and clear sensitive metadata when necessary

### Operational Security
1. **Environment Security** - Secure the ~/.gnupg directory with 700 permissions and individual files with 600
2. **Memory Protection** - Use GPG agent for passphrase caching with reasonable timeout periods
3. **Audit Trail** - Keep logs of important operations and regularly review key access patterns
4. **Software Updates** - Keep GPG and related packages updated for security patches
5. **Secure Deletion** - Use secure deletion methods for sensitive temporary files and key material

### Common Pitfalls to Avoid
1. **Weak Passphrases** - Never use dictionary words, personal information, or short passphrases
2. **Key Compromise** - Report and revoke compromised keys immediately using pre-generated revocation certificates
3. **Trust Misconfiguration** - Don't trust keys without proper verification through multiple channels
4. **Backup Negligence** - Always maintain multiple secure backups of private keys and revocation certificates
5. **Algorithm Compatibility** - Consider recipient's GPG version and algorithm support when encrypting
6. **Passphrase Reuse** - Use unique passphrases for different keys and avoid password reuse

### Development Integration
1. **Git Signing** - Enable commit signing for critical repositories to ensure code integrity
2. **Release Signing** - Sign all release artifacts and provide detached signatures and checksums
3. **CI/CD Integration** - Integrate GPG signing into automated build and deployment pipelines
4. **Configuration Encryption** - Encrypt sensitive configuration files and keys in repositories
5. **Audit Logging** - Log all cryptographic operations for security audit and compliance

## Performance Tips

### Encryption Optimization
1. **Algorithm Selection** - AES-256 provides best security; AES-128 is faster for large files when appropriate
2. **Compression Settings** - Disable compression (--compress-algo 0) for already compressed files
3. **Parallel Processing** - GPG uses available cores automatically; ensure sufficient system resources
4. **Memory Configuration** - Increase secure memory limits for large file operations
5. **Batch Operations** - Use `--batch` mode for processing multiple files to reduce interaction overhead

### Key Management Optimization
1. **Key Caching** - Use GPG agent with appropriate cache timeouts for frequent operations
2. **Selective Key Loading** - Load only necessary keys to reduce memory usage
3. **Database Optimization** - Regularly maintain and clean trust database with `--check-trustdb`
4. **Network Caching** - Use local key caches and key server mirroring for team environments
5. **Index Optimization** - Rebuild key indices periodically for faster lookups in large keyrings

### Performance Monitoring
1. **Timing Operations** - Use `time` command to measure encryption/decryption performance
2. **Memory Profiling** - Monitor memory usage with tools like `/usr/bin/time -v` during operations
3. **Network Analysis** - Monitor keyserver performance and latency during remote operations
4. **Benchmarks** - Regular performance benchmarking to detect degradations
5. **Resource Allocation** - Ensure sufficient system resources for cryptographic operations

The `gpg` command provides comprehensive cryptographic capabilities for secure communication, data protection, and identity verification through public key cryptography. Its extensive feature set, including advanced key management, multiple algorithm support, and strong security guarantees, makes it the standard for privacy and security in open-source environments. With proper understanding of its capabilities and adherence to security best practices, GPG enables robust protection of sensitive data and verification of digital identities in personal, corporate, and development contexts.