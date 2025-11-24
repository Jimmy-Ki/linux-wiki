---
title: openssl - Open Source Toolkit for SSL/TLS
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# openssl - Open Source Toolkit for SSL/TLS

The `openssl` command is a robust command-line tool for using the various cryptography functions of OpenSSL's crypto library. It provides comprehensive support for SSL/TLS protocols, cryptographic algorithms, certificate management, and secure data encryption/decryption.

## Basic Syntax

```bash
openssl command [options] [arguments]
openssl (interactive mode)
```

## Common Commands

### Information and Help
- `version` - Display OpenSSL version information
- `help` - Show available commands
- `ciphers` - Display available cipher suites
- `list-cipher-commands` - List cipher commands

### Message Digest Commands
- `dgst` - Calculate message digests (hashes)
- `md5`, `sha1`, `sha256`, `sha512` - Specific hash algorithms

### Encryption/Decryption
- `enc` - Encrypt/decrypt using symmetric ciphers
- `rsautl` - RSA utility for encryption/decryption/signing

### Certificate Management
- `req` - PKCS#10 X.509 Certificate Signing Request (CSR) management
- `x509` - X.509 certificate data management
- `ca` - Certificate Authority management
- `crl2pkcs7` - CRL to PKCS#7 converter
- `pkcs12` - PKCS#12 file utility
- `pkcs7` - PKCS#7 utility

### Key Management
- `genrsa` - Generate RSA private keys
- `rsa` - RSA key processing
- `genpkey` - Generate private keys
- `pkey` - Private key processing
- `pkeyparam` - Public key algorithm parameter processing
- `gendsa` - Generate DSA private keys
- `dsa` - DSA key processing
- `ec` - Elliptic curve key processing
- `ecparam` - EC parameter manipulation
- `dhparam` - Diffie-Hellman parameter manipulation
- `dsaparam` - DSA parameter manipulation

### SSL/TLS Commands
- `s_client` - SSL/TLS client program
- `s_server` - SSL/TLS server program
- `s_time` - SSL connection timer

### Random Number Generation
- `rand` - Generate pseudo-random bytes

## Usage Examples

### OpenSSL Information and Version

#### Check OpenSSL Version
```bash
# Show detailed version information
openssl version -a

# Show basic version
openssl version

# Show available ciphers
openssl ciphers -v

# Show help for specific command
openssl dgst -help

# List all available commands
openssl help
```

### Generating Random Data

#### Generate Random Passwords
```bash
# Generate 16 random bytes, base64 encoded
openssl rand -base64 16

# Generate 12 random hexadecimal characters
openssl rand -hex 12

# Generate 32 random bytes
openssl rand 32

# Generate alphanumeric password (32 characters)
openssl rand -base64 32 | tr -d "=+/" | cut -c1-25

# Generate strong password with special characters
openssl rand -base64 32 | tr -d '\n' | head -c 32
```

#### Random Number Generation
```bash
# Generate 10 random bytes
openssl rand 10

# Generate 20 random bytes in hex format
openssl rand -hex 20

# Generate random bytes and save to file
openssl rand -out random.bin 64

# Generate random data with specific seed
openssl rand -seed "my-seed" 32
```

### Message Digests (Hashing)

#### File Hashing
```bash
# Calculate MD5 hash of file
openssl dgst -md5 filename.txt

# Calculate SHA1 hash
openssl dgst -sha1 filename.txt

# Calculate SHA256 hash
openssl dgst -sha256 filename.txt

# Calculate SHA512 hash
openssl dgst -sha512 filename.txt

# Calculate multiple hashes at once
openssl dgst -md5 -sha1 -sha256 filename.txt
```

#### Digital Signatures with Hashing
```bash
# Sign file using SHA1 with RSA private key
openssl dgst -sha1 -sign private.key -out signature.bin document.txt

# Verify signature using public key
openssl dgst -sha1 -verify public.key -signature signature.bin document.txt

# Sign using SHA256
openssl dgst -sha256 -sign private.key -out sha256-signature.bin document.txt

# Verify SHA256 signature
openssl dgst -sha256 -verify public.key -signature sha256-signature.bin document.txt
```

#### HMAC Operations
```bash
# Generate HMAC using SHA256
openssl dgst -sha256 -hmac "secret-key" message.txt

# Generate HMAC from stdin
echo "message" | openssl dgst -sha256 -hmac "secret-key"

# HMAC with binary key
openssl dgst -sha256 -mac HMAC -macopt hexkey:$(echo -n "key" | xxd -p) message.txt
```

### Symmetric Encryption

#### File Encryption
```bash
# Encrypt file using AES-256-CBC
openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.enc

# Decrypt AES-256-CBC file
openssl enc -aes-256-cbc -d -in encrypted.enc -out decrypted.txt

# Encrypt with password from environment
export MYPASSWORD="secret123"
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc -pass env:MYPASSWORD

# Encrypt with password prompt
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc

# Encrypt using different algorithms
openssl enc -des3 -salt -in file.txt -out file.des3
openssl enc -bf-cbc -salt -in file.txt -out file.bf
openssl enc -rc4 -in file.txt -out file.rc4
```

#### Encryption with Key and IV
```bash
# Encrypt using specific key and IV
openssl enc -aes-256-cbc -K $(openssl rand -hex 32) -iv $(openssl rand -hex 16) -in plaintext.txt -out ciphertext.bin

# Encrypt with hex-encoded key and IV
openssl enc -aes-256-cbc -K 0123456789ABCDEF0123456789ABCDEF -iv FEDCBA9876543210FEDCBA9876543210 -in file.txt -out file.enc

# Decrypt with specific key and IV
openssl enc -aes-256-cbc -d -K 0123456789ABCDEF0123456789ABCDEF -iv FEDCBA9876543210FEDCBA9876543210 -in file.enc -out file.txt
```

#### Base64 Encoding/Decoding
```bash
# Base64 encode file
openssl base64 -in binary.dat -out base64.txt

# Base64 decode file
openssl base64 -d -in base64.txt -out binary.dat

# Base64 encode string
echo "Hello World" | openssl base64

# Base64 decode string
echo "SGVsbG8gV29ybGQK" | openssl base64 -d
```

### RSA Key Management

#### Generate RSA Keys
```bash
# Generate 2048-bit RSA private key
openssl genrsa -out private.key 2048

# Generate encrypted private key with AES-256
openssl genrsa -aes256 -out encrypted-private.key 2048

# Generate 4096-bit RSA key
openssl genrsa -out private-4096.key 4096

# Generate with traditional format
openssl genrsa -traditional -out private-trad.key 2048
```

#### RSA Key Operations
```bash
# Extract public key from private key
openssl rsa -in private.key -pubout -out public.key

# Remove passphrase from private key
openssl rsa -in encrypted.key -out decrypted.key

# Add passphrase to private key
openssl rsa -in private.key -aes256 -out encrypted.key

# Display key details
openssl rsa -in private.key -text -noout

# Convert key format
openssl rsa -in private.key -outform DER -out private.der
openssl rsa -in private.key -outform PEM -out private.pem
```

#### RSA Encryption and Decryption
```bash
# Encrypt small file with public key
openssl rsautl -encrypt -pubin -inkey public.key -in smallfile.txt -out encrypted.bin

# Decrypt with private key
openssl rsautl -decrypt -inkey private.key -in encrypted.bin -out decrypted.txt

# Sign file with private key
openssl rsautl -sign -inkey private.key -in document.txt -out signature.bin

# Verify signature with public key
openssl rsautl -verify -pubin -inkey public.key -in signature.bin -out verified.txt
```

### Certificate Management

#### Generate Certificate Signing Request (CSR)
```bash
# Generate private key and CSR
openssl req -new -newkey rsa:2048 -nodes -keyout private.key -out request.csr

# Generate CSR from existing private key
openssl req -new -key private.key -out request.csr

# Generate CSR with specific fields
openssl req -new -key private.key -out request.csr -subj "/C=US/ST=California/L=San Francisco/O=My Company/OU=IT/CN=example.com"

# Generate CSR with config file
openssl req -new -key private.key -out request.csr -config openssl.cnf

# Generate CSR for multi-domain certificate
openssl req -new -key private.key -out request.csr -subj "/C=US/ST=CA/L=SF/O=Company/CN=example.com" -addext "subjectAltName=DNS:www.example.com,DNS:api.example.com"
```

#### Self-Signed Certificates
```bash
# Generate self-signed certificate
openssl req -new -x509 -days 365 -key private.key -out certificate.crt

# Generate self-signed certificate with specific validity
openssl req -new -x509 -days 3650 -key private.key -out certificate.crt -subj "/C=US/ST=CA/O=My Company/CN=localhost"

# Generate with extensions
openssl req -new -x509 -days 365 -key private.key -out certificate.crt -extensions v3_ca -config openssl.cnf
```

#### X.509 Certificate Operations
```bash
# Display certificate information
openssl x509 -in certificate.crt -text -noout

# Display certificate subject
openssl x509 -in certificate.crt -subject -noout

# Display certificate issuer
openssl x509 -in certificate.crt -issuer -noout

# Display certificate validity dates
openssl x509 -in certificate.crt -dates -noout

# Display certificate serial number
openssl x509 -in certificate.crt -serial -noout

# Display certificate fingerprint
openssl x509 -in certificate.crt -fingerprint -sha256 -noout

# Convert certificate formats
openssl x509 -in cert.pem -outform DER -out cert.der
openssl x509 -in cert.der -inform DER -outform PEM -out cert.pem

# Verify certificate
openssl x509 -in certificate.crt -noout -text -purpose
```

### Certificate Authority Operations

#### Creating a CA
```bash
# Generate CA private key
openssl genrsa -out ca.key 4096

# Generate self-signed CA certificate
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -subj "/C=US/ST=CA/O=My CA/CN=My Root CA"

# Create CA directory structure
mkdir -p CA/{certs,crl,newcerts,private}
touch CA/index.txt
echo 1000 > CA/serial
```

#### Signing Certificates with CA
```bash
# Sign CSR using CA
openssl x509 -req -in request.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out certificate.crt -days 365

# Sign with specific CA extensions
openssl x509 -req -in request.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out certificate.crt -days 365 -extensions v3_req -extfile openssl.cnf
```

### Diffie-Hellman Parameters

#### Generate DH Parameters
```bash
# Generate 2048-bit DH parameters
openssl dhparam -out dhparam.pem 2048

# Generate 4096-bit DH parameters (slow)
openssl dhparam -out dhparam-4096.pem 4096

# Generate DH parameters with generator 2
openssl dhparam -2 -out dhparam.pem 2048

# Display DH parameters
openssl dhparam -in dhparam.pem -text -noout

# Generate DH parameters in C format
openssl dhparam -in dhparam.pem -C -noout
```

### SSL/TLS Testing

#### SSL Certificate Testing
```bash
# Connect to HTTPS server and display certificate
openssl s_client -connect example.com:443

# Connect and display server certificate
openssl s_client -connect example.com:443 -showcerts

# Connect with specific TLS version
openssl s_client -connect example.com:443 -tls1_2

# Connect with SNI support
openssl s_client -connect example.com:443 -servername example.com

# Test certificate against CA bundle
openssl s_client -connect example.com:443 -CAfile /etc/ssl/certs/ca-certificates.crt

# Verify certificate chain
openssl s_client -connect example.com:443 -verify_return_error
```

#### SSL Server Testing
```bash
# Run simple SSL server
openssl s_server -accept 8443 -cert certificate.crt -key private.key

# Run server with client certificate requirement
openssl s_server -accept 8443 -cert server.crt -key server.key -CAfile ca.crt -Verify 1

# Test server connection
openssl s_client -connect localhost:8443
```

### PKCS#12 Operations

#### Create PKCS#12 Bundle
```bash
# Create PKCS#12 file with private key and certificate
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt -certfile ca.crt

# Create PKCS#12 without password
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt -passout pass:

# List contents of PKCS#12 file
openssl pkcs12 -in bundle.p12 -info -noout

# Convert PKCS#12 to PEM
openssl pkcs12 -in bundle.p12 -out bundle.pem -nodes -passin pass:password
```

### Elliptic Curve Cryptography

#### Generate EC Keys
```bash
# List available curves
openssl ecparam -list_curves

# Generate EC private key with secp256r1 curve
openssl ecparam -name secp256r1 -genkey -noout -out ec-private.key

# Generate EC key with prime256v1 curve
openssl ecparam -name prime256v1 -genkey -noout -out ec-key.pem

# Extract public key from EC private key
openssl ec -in ec-private.key -pubout -out ec-public.key
```

### S/MIME Operations

#### Encrypt and Sign Emails
```bash
# Encrypt message using recipient's certificate
openssl smime -encrypt -in message.txt -out message.enc recipient-cert.pem

# Sign message
openssl smime -sign -in message.txt -out message.sgn -signer cert.pem -inkey private.key

# Sign and encrypt
openssl smime -sign -encrypt -in message.txt -out message.msg -signer cert.pem -inkey private.key recipient-cert.pem

# Decrypt message
openssl smime -decrypt -in message.enc -recip cert.pem -inkey private.key -out decrypted.txt

# Verify signature
openssl smime -verify -in message.sgn -out verified.txt
```

## Practical Examples

### Complete Certificate Generation Workflow
```bash
#!/bin/bash
# Complete SSL Certificate Generation Workflow

# Variables
DOMAIN="example.com"
KEY_SIZE=2048
DAYS_VALID=365

# Step 1: Generate private key
echo "Generating private key..."
openssl genrsa -out ${DOMAIN}.key ${KEY_SIZE}

# Step 2: Generate certificate signing request
echo "Generating CSR..."
openssl req -new -key ${DOMAIN}.key -out ${DOMAIN}.csr \
    -subj "/C=US/ST=California/L=San Francisco/O=Example Inc/OU=IT/CN=${DOMAIN}"

# Step 3: Generate self-signed certificate (for testing)
echo "Generating self-signed certificate..."
openssl req -x509 -days ${DAYS_VALID} -key ${DOMAIN}.key -in ${DOMAIN}.csr -out ${DOMAIN}.crt

# Step 4: Generate certificate with multiple domains
echo "Generating certificate with SAN..."
cat > ${DOMAIN}.cnf << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = California
L = San Francisco
O = Example Inc
OU = IT
CN = ${DOMAIN}

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${DOMAIN}
DNS.2 = www.${DOMAIN}
DNS.3 = api.${DOMAIN}
DNS.4 = mail.${DOMAIN}
EOF

openssl req -new -key ${DOMAIN}.key -out ${DOMAIN}.csr -config ${DOMAIN}.cnf
openssl x509 -req -days ${DAYS_VALID} -in ${DOMAIN}.csr -signkey ${DOMAIN}.key -out ${DOMAIN}-san.crt -extensions v3_req -extfile ${DOMAIN}.cnf

echo "Certificate generation completed!"
ls -la ${DOMAIN}.*
```

### SSL Certificate Validation Script
```bash
#!/bin/bash
# SSL Certificate Validation Script

DOMAIN=$1
PORT=${2:-443}

if [ -z "$DOMAIN" ]; then
    echo "Usage: $0 domain [port]"
    exit 1
fi

echo "Validating SSL certificate for $DOMAIN:$PORT"

# Get certificate information
echo "Certificate Information:"
echo "======================="
openssl s_client -connect $DOMAIN:$PORT -showcerts 2>/dev/null | openssl x509 -text -noout

# Check expiration
echo -e "\nCertificate Validity:"
echo "======================="
EXPIRY=$(echo | openssl s_client -connect $DOMAIN:$PORT 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
echo "Expires: $EXPIRY"

# Check issuer
echo -e "\nCertificate Issuer:"
echo "====================="
echo | openssl s_client -connect $DOMAIN:$PORT 2>/dev/null | openssl x509 -noout -issuer

# Check subject
echo -e "\nCertificate Subject:"
echo "======================"
echo | openssl s_client -connect $DOMAIN:$PORT 2>/dev/null | openssl x509 -noout -subject

# Check supported ciphers
echo -e "\nSupported Ciphers:"
echo "==================="
openssl ciphers -v | grep -E "(AES|GCM)" | head -10
```

### File Encryption Script
```bash
#!/bin/bash
# Secure File Encryption Script

FILE=$1
if [ -z "$FILE" ]; then
    echo "Usage: $0 filename"
    exit 1
fi

# Generate random encryption key
KEY_FILE="${FILE}.key"
ENCRYPTED_FILE="${FILE}.enc"

echo "Encrypting $FILE..."

# Generate random key
openssl rand -hex 32 > $KEY_FILE

# Encrypt file
openssl enc -aes-256-cbc -salt -in $FILE -out $ENCRYPTED_FILE -K $(cat $KEY_FILE) -iv $(openssl rand -hex 16)

echo "File encrypted: $ENCRYPTED_FILE"
echo "Encryption key: $KEY_FILE"
echo "IMPORTANT: Keep the key file secure and separate from the encrypted file!"

# Cleanup
read -p "Delete original file? (y/N): " confirm
if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
    rm -f $FILE
    echo "Original file deleted."
fi
```

## Related Commands

- [`gpg`](/docs/commands/security/gpg) - GNU Privacy Guard
- [`ssh-keygen`](/docs/commands/security/ssh-keygen) - SSH key generation
- [`keytool`](/docs/commands/security/keytool) - Java keytool
- [`certbot`](/docs/commands/security/certbot) - Let's Encrypt client
- [`curl`](/docs/commands/networking/curl) - Transfer data with SSL/TLS support
- [`wget`](/docs/commands/networking/wget) - Network downloader with SSL support

## Best Practices

### Security Considerations
1. **Use strong algorithms** - Prefer AES-256 over older ciphers like DES
2. **Secure key management** - Protect private keys with strong passphrases
3. **Regular certificate updates** - Renew certificates before expiration
4. **Key size selection** - Use minimum 2048-bit RSA, prefer 4096-bit for high security
5. **Secure random generation** - Use OpenSSL's random functions for keys and IVs
6. **Algorithm validation** - Validate certificate chains and signatures

### Key Management
1. **Backup keys** - Keep secure backups of private keys
2. **Key rotation** - Implement regular key rotation policies
3. **Hardware security** - Consider HSM for critical keys
4. **Access control** - Restrict access to private keys
5. **Audit trails** - Track key usage and modifications
6. **Secure storage** - Store keys in encrypted form when possible

### Certificate Management
1. **Complete information** - Include all required fields in CSRs
2. **Subject Alternative Names** - Use SAN instead of Common Name for modern browsers
3. **Certificate hierarchy** - Maintain proper CA structures
4. **Revocation checking** - Implement CRL and OCSP checking
5. **Certificate pinning** - Consider certificate pinning for critical services
6. **Automated renewal** - Set up automated certificate renewal processes

### Common Pitfalls to Avoid
1. **Weak passphrases** - Use strong, unique passphrases for private keys
2. **Insecure algorithms** - Avoid deprecated or weak cryptographic algorithms
3. **Certificate expiration** - Monitor certificate expiration dates
4. **Key exposure** - Never commit private keys to version control
5. **Missing validation** - Always validate certificates and signatures
6. **Poor randomness** - Use cryptographically secure random number generation

The `openssl` command is a comprehensive toolkit for implementing SSL/TLS and general cryptographic functionality in Linux environments, providing the essential tools needed for secure communication, data protection, and certificate management.