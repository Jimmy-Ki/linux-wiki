---
title: openssl - Open Source Toolkit for SSL/TLS
sidebar_label: openssl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# openssl - Open Source Toolkit for SSL/TLS

The `openssl` command is a robust command-line tool for using the various cryptography functions of OpenSSL's crypto library. It provides comprehensive support for SSL/TLS protocols, cryptographic algorithms, certificate management, and secure data encryption/decryption. OpenSSL is the de facto standard cryptographic library for secure communications on the internet, offering implementations of SSL and TLS protocols, as well as a full-strength general-purpose cryptography library. It supports various cryptographic operations including symmetric and asymmetric encryption, digital signatures, certificate generation and management, secure random number generation, and SSL/TLS client/server functionality.

## Basic Syntax

```bash
openssl command [command_options] [command_arguments]
openssl (interactive mode)
```

## Common Commands

### Information and Help
- `version` - Display OpenSSL version information
- `help` - Show available commands
- `ciphers` - Display available cipher suites
- `list-cipher-commands` - List cipher commands
- `list-cipher-algorithms` - List available cipher algorithms
- `list-digest-commands` - List message digest commands
- `list-public-key-algorithms` - List public key algorithms

### Message Digest Commands
- `dgst` - Calculate message digests (hashes)
- `md5`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512` - Specific hash algorithms
- `sha3-224`, `sha3-256`, `sha3-384`, `sha3-512` - SHA-3 algorithms
- `shake128`, `shake256` - SHAKE extendable output functions
- `blake2b512`, `blake2s256` - BLAKE2 algorithms

### Encryption/Decryption
- `enc` - Encrypt/decrypt using symmetric ciphers
- `rsautl` - RSA utility for encryption/decryption/signing
- `pkeyutl` - Public key cryptographic utility

### Certificate Management
- `req` - PKCS#10 X.509 Certificate Signing Request (CSR) management
- `x509` - X.509 certificate data management
- `ca` - Certificate Authority management
- `crl` - Certificate Revocation List management
- `crl2pkcs7` - CRL to PKCS#7 converter
- `ocsp` - Online Certificate Status Protocol utility
- `pkcs12` - PKCS#12 file utility
- `pkcs7` - PKCS#7 utility
- `pkcs8` - PKCS#8 private key format utility

### Key Management
- `genrsa` - Generate RSA private keys
- `rsa` - RSA key processing
- `genpkey` - Generate private keys
- `pkey` - Private key processing
- `pkeyparam` - Public key algorithm parameter processing
- `gendsa` - Generate DSA private keys
- `dsa` - DSA key processing
- `dsaparam` - DSA parameter manipulation
- `ec` - Elliptic curve key processing
- `ecparam` - EC parameter manipulation
- `dhparam` - Diffie-Hellman parameter manipulation

### SSL/TLS Commands
- `s_client` - SSL/TLS client program
- `s_server` - SSL/TLS server program
- `s_time` - SSL connection timer
- `verify` - X.509 certificate verification utility

### Random Number Generation
- `rand` - Generate pseudo-random bytes
- `rand_hex` - Generate random hex strings (deprecated)
- `rand_base64` - Generate random base64 strings (deprecated)

### Utility Commands
- `speed` - Benchmark cryptographic algorithm performance
- `errstr` - Convert error codes to human-readable strings
- `asn1parse` - ASN.1 parsing tool
- `ca` - Minimal certificate authority utility
- `crl2pkcs7` - CRL to PKCS#7 Conversion Utility

## Common Options

### General Options
- `-help` - Display help information
- `-in filename` - Input file
- `-out filename` - Output file
- `-inform format` - Input format (DER, PEM, P12)
- `-outform format` - Output format (DER, PEM, P12)
- `-text` - Print information in text form
- `-noout` - Don't output encoded information
- `-modulus` - Print the RSA modulus value
- `-pubin` - Input is a public key
- `-pubout` - Output is a public key

### Encryption Options
- `-cipher` - Specify cipher algorithm
- `-k password` - Password for encryption
- `-pass arg` - Password source (pass:env:file:fd)
- `-salt` - Use salt in key derivation
- `-nosalt` - Don't use salt
- `-K key` - Hex-encoded key
- `-iv iv` - Hex-encoded initialization vector
- `-S salt` - Hex-encoded salt

### Certificate Options
- `-days n` - Certificate validity period in days
- `-subj arg` - Certificate subject field
- `-addext ext` - Add certificate extension
- `-keyform format` - Key input format
- `-reqexts` - Request extensions
- `-extensions` - Certificate extensions
- `-req` - Input is a certificate request

### Verification Options
- `-CAfile file` - CA certificate file
- `-CApath dir` - CA certificate directory
- `-crl_check` - Check CRL for certificate revocation
- `-crl_check_all` - Check CRL for entire chain
- `-purpose` - Check certificate purpose

## Usage Examples

### OpenSSL Information and Version

#### Version and Information
```bash
# Show detailed version information
openssl version -a

# Show basic version
openssl version

# Show directory information
openssl version -d

# Show platform information
openssl version -p

# Show available ciphers
openssl ciphers -v

# Show all available commands
openssl list-commands

# Show available digest commands
openssl list-digest-commands

# Show available cipher commands
openssl list-cipher-commands

# Show available public key algorithms
openssl list-public-key-algorithms

# Show help for specific command
openssl dgst -help

# Show all available ciphers with detailed information
openssl ciphers -v -s

# Show cipher suites for specific TLS version
openssl ciphers -tls1_2 -v

# Show supported curves
openssl ecparam -list_curves

# Show engine information
openssl engine -t

# Show OpenSSL configuration
openssl version -a | grep -E "(OPENSSLDIR|ENGINESDIR)"
```

### Generating Random Data

#### Random Passwords and Keys
```bash
# Generate 16 random bytes, base64 encoded
openssl rand -base64 16

# Generate 12 random hexadecimal characters
openssl rand -hex 12

# Generate 32 random bytes (binary)
openssl rand 32

# Generate alphanumeric password (32 characters)
openssl rand -base64 32 | tr -d "=+/" | cut -c1-25

# Generate strong password with special characters
openssl rand -base64 32 | tr -d '\n' | head -c 32

# Generate password with specific character set
openssl rand -base64 32 | tr -dc 'A-Za-z0-9!@#$%^&*()_+' | head -c 20

# Generate secure temporary password
openssl rand -base64 12 | tr -d "=+/" | cut -c1-10

# Generate UUID-style identifier
openssl rand -hex 16 | sed 's/\(.\{8\}\)\(.\{4\}\)\(.\{4\}\)\(.\{4\}\)\(.\{12\}\)/\1-\2-\3-\4-\5/'

# Generate random number within range
openssl rand -hex 2 | xargs printf "%d\n"
```

#### Random Number Generation for Cryptography
```bash
# Generate 10 random bytes
openssl rand 10

# Generate 20 random bytes in hex format
openssl rand -hex 20

# Generate 32 random bytes in base64 format
openssl rand -base64 32

# Generate random bytes and save to file
openssl rand -out random.bin 64

# Generate random data with specific seed (for testing)
openssl rand -seed "my-seed" 32

# Generate random data from /dev/urandom
openssl rand -rand /dev/urandom 32

# Generate random IV for AES-256
openssl rand -hex 16

# Generate random salt
openssl rand -hex 8

# Generate random DH parameters seed
openssl rand -out dh-seed.bin 1024
```

### Message Digests (Hashing)

#### File and String Hashing
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

# Hash with binary output
openssl dgst -sha256 -binary filename.txt > hash.bin

# Calculate hash of string
echo "hello" | openssl dgst -sha256

# Calculate hash of standard input
cat file.txt | openssl dgst -sha512

# Calculate hash with hex output
openssl dgst -sha256 -hex filename.txt

# Using legacy hash commands
openssl md5 filename.txt
openssl sha1 filename.txt
openssl sha256 filename.txt
openssl sha512 filename.txt
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

# Sign using SHA384
openssl dgst -sha384 -sign private.key -out document.sig document.txt

# Sign with binary key format
openssl dgst -sha256 -sign private.der -keyform DER -out signature.bin document.txt

# Create detached signature
openssl dgst -sha256 -sign private.key -out signature.txt document.txt

# Verify detached signature
openssl dgst -sha256 -verify public.key -signature signature.txt document.txt

# Sign multiple files
openssl dgst -sha256 -sign private.key -out batch.sig *.txt
```

#### HMAC Operations
```bash
# Generate HMAC using SHA256
openssl dgst -sha256 -hmac "secret-key" message.txt

# Generate HMAC from stdin
echo "message" | openssl dgst -sha256 -hmac "secret-key"

# HMAC with binary key
openssl dgst -sha256 -mac HMAC -macopt hexkey:$(echo -n "key" | xxd -p) message.txt

# HMAC with key from file
openssl dgst -sha256 -hmac "$(cat secret.key)" message.txt

# HMAC with different algorithms
openssl dgst -md5 -hmac "key" data.txt
openssl dgst -sha1 -hmac "key" data.txt
openssl dgst -sha512 -hmac "key" data.txt

# HMAC with hex key
openssl dgst -sha256 -mac HMAC -macopt hexkey:7365637265746b6579 data.txt

# Verify HMAC
openssl dgst -sha256 -hmac "secret-key" message.txt > expected_hmac
# Compare with existing HMAC
```

### Symmetric Encryption

#### File Encryption and Decryption
```bash
# Encrypt file using AES-256-CBC with password prompt
openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.enc

# Decrypt AES-256-CBC file
openssl enc -aes-256-cbc -d -in encrypted.enc -out decrypted.txt

# Encrypt with password from environment variable
export MYPASSWORD="secret123"
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc -pass env:MYPASSWORD

# Encrypt with password from file
echo "password" > pass.txt
openssl enc -aes-256-cbc -salt -in file.txt -out file.enc -pass file:pass.txt

# Encrypt without salt (less secure)
openssl enc -aes-256-cbc -nosalt -in file.txt -out file.enc -pass pass:mypassword

# Encrypt with different algorithms
openssl enc -des3 -salt -in file.txt -out file.des3 -pass pass:mypassword
openssl enc -bf-cbc -salt -in file.txt -out file.bf -pass pass:mypassword
openssl enc -rc4 -in file.txt -out file.rc4 -pass pass:mypassword
openssl enc -aes-128-gcm -in file.txt -out file.aes128gcm -pass pass:mypassword

# Encrypt with iteration count
openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in file.txt -out file.enc -pass pass:mypassword

# Decrypt with specific cipher
openssl enc -aes-256-cbc -d -in encrypted.enc -out decrypted.txt -pass pass:mypassword
```

#### Encryption with Key and IV
```bash
# Encrypt using specific hex-encoded key and IV
openssl enc -aes-256-cbc -K 0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF -iv FEDCBA9876543210FEDCBA9876543210 -in file.txt -out file.enc

# Generate random key and IV
KEY=$(openssl rand -hex 32)
IV=$(openssl rand -hex 16)
openssl enc -aes-256-cbc -K $KEY -iv $IV -in plaintext.txt -out ciphertext.bin

# Decrypt with specific key and IV
openssl enc -aes-256-cbc -d -K 0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF -iv FEDCBA9876543210FEDCBA9876543210 -in file.enc -out file.txt

# Encrypt with GCM mode (provides authentication)
openssl enc -aes-256-gcm -K $(openssl rand -hex 32) -iv $(openssl rand -hex 12) -in file.txt -out file.enc

# Encrypt with custom tag length for GCM
openssl enc -aes-256-gcm -taglen 16 -K key -iv iv -in file.txt -out file.enc

# Using different key derivation functions
openssl enc -aes-256-cbc -pbkdf2 -md sha256 -iter 100000 -salt -in file.txt -out file.enc -pass pass:password
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

# Base64 encode with line breaks
openssl base64 -in file.dat -out encoded.txt

# Base64 encode without line breaks
openssl base64 -A -in file.dat -out encoded.txt

# URL-safe base64 encoding
openssl base64 | tr '+/' '-_' | tr -d '='

# Base64 encode with specific alphabet
openssl base64 -in file.txt | tr -d '\n'
```

### RSA Key Management

#### Generate RSA Keys
```bash
# Generate 2048-bit RSA private key
openssl genrsa -out private.key 2048

# Generate encrypted private key with AES-256
openssl genrsa -aes256 -out encrypted-private.key 2048

# Generate 4096-bit RSA key for higher security
openssl genrsa -out private-4096.key 4096

# Generate with traditional format (PKCS#1)
openssl genrsa -traditional -out private-trad.key 2048

# Generate with specific public exponent
openssl genrsa -f4 -out private.key 2048
openssl genrsa -3 -out private.key 2048

# Generate with verbose output
openssl genrsa -out private.key 2048 -verbose

# Generate multiple keys
openssl genrsa -out key1.key 2048
openssl genrsa -out key2.key 2048

# Generate with specific number of primes
openssl genrsa -out private.key 2048 -primes 3
```

#### RSA Key Operations
```bash
# Extract public key from private key
openssl rsa -in private.key -pubout -out public.key

# Remove passphrase from private key
openssl rsa -in encrypted.key -out decrypted.key

# Add passphrase to private key
openssl rsa -in private.key -aes256 -out encrypted.key

# Display key details in human-readable format
openssl rsa -in private.key -text -noout

# Display public key details
openssl rsa -pubin -in public.key -text -noout

# Check key consistency
openssl rsa -in private.key -check

# Convert between different key formats
openssl rsa -in private.key -outform DER -out private.der
openssl rsa -in private.key -outform PEM -out private.pem
openssl rsa -in private.der -inform DER -outform PEM -out private.pem

# Convert PKCS#8 format
openssl pkcs8 -topk8 -in private.key -out pkcs8.key -nocrypt
openssl pkcs8 -topk8 -in private.key -out encrypted-pkcs8.key -v2 aes256

# Display RSA modulus
openssl rsa -in private.key -modulus -noout

# Display public exponent
openssl rsa -in private.key -text -noout | grep -A 1 "publicExponent"

# Generate RSA public key in format for SSH
ssh-keygen -f private.key -y > public_ssh.key
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

# Encrypt with PKCS#1 v1.5 padding
openssl rsautl -encrypt -pubin -inkey public.key -pkcs -in data.txt -out encrypted.bin

# Encrypt with OAEP padding
openssl rsautl -encrypt -pubin -inkey public.key -oaep -in data.txt -out encrypted.bin

# Sign with different hash algorithms
openssl pkeyutl -sign -in file.txt -inkey private.key -out signature.bin -digest sha256
openssl pkeyutl -sign -in file.txt -inkey private.key -out signature.bin -digest sha512

# Verify with pkeyutl
openssl pkeyutl -verify -in file.txt -sigfile signature.bin -pubin -inkey public.key -digest sha256
```

### Certificate Management

#### Generate Certificate Signing Request (CSR)
```bash
# Generate private key and CSR in one step
openssl req -new -newkey rsa:2048 -nodes -keyout private.key -out request.csr

# Generate CSR from existing private key
openssl req -new -key private.key -out request.csr

# Generate CSR with specific fields (non-interactive)
openssl req -new -key private.key -out request.csr -subj "/C=US/ST=California/L=San Francisco/O=My Company/OU=IT/CN=example.com"

# Generate CSR with config file
openssl req -new -key private.key -out request.csr -config openssl.cnf

# Generate CSR for multi-domain certificate (SAN)
openssl req -new -key private.key -out request.csr -subj "/C=US/ST=CA/L=SF/O=Company/CN=example.com" -addext "subjectAltName=DNS:www.example.com,DNS:api.example.com"

# Generate CSR with IP address in SAN
openssl req -new -key private.key -out request.csr -subj "/C=US/O=Company/CN=server1" -addext "subjectAltName=IP:192.168.1.100"

# Generate CSR with email address
openssl req -new -key private.key -out request.csr -subj "/C=US/O=Company/CN=example.com/emailAddress=admin@example.com"

# Generate CSR without challenge password
openssl req -new -key private.key -out request.csr -nodes

# Generate CSR with SHA-256 signature
openssl req -new -sha256 -key private.key -out request.csr -subj "/C=US/O=Company/CN=example.com"

# Generate CSR with specific extensions file
openssl req -new -key private.key -out request.csr -config req.cnf -extensions v3_req

# Verify CSR information
openssl req -in request.csr -text -noout -verify
```

#### Self-Signed Certificates
```bash
# Generate self-signed certificate for testing (1 year validity)
openssl req -new -x509 -days 365 -key private.key -out certificate.crt

# Generate self-signed certificate with long validity (10 years)
openssl req -new -x509 -days 3650 -key private.key -out certificate.crt -subj "/C=US/ST=CA/O=My Company/CN=localhost"

# Generate self-signed certificate in one command
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/O=Company/CN=localhost"

# Generate with SHA-256 signature algorithm
openssl req -new -x509 -sha256 -days 365 -key private.key -out certificate.crt -subj "/C=US/O=Company/CN=localhost"

# Generate with specific extensions
openssl req -new -x509 -days 365 -key private.key -out certificate.crt -extensions v3_ca -config openssl.cnf

# Generate with custom extensions for server certificate
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes \
    -subj "/C=US/ST=CA/L=SF/O=Company/CN=example.com" \
    -addext "subjectAltName=DNS:example.com,DNS:www.example.com" \
    -addext "keyUsage=digitalSignature,keyEncipherment" \
    -addext "extendedKeyUsage=serverAuth"

# Generate wildcard certificate
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes \
    -subj "/C=US/O=Company/CN=*.example.com" \
    -addext "subjectAltName=DNS:*.example.com"
```

#### X.509 Certificate Operations
```bash
# Display complete certificate information
openssl x509 -in certificate.crt -text -noout

# Display certificate subject only
openssl x509 -in certificate.crt -subject -noout

# Display certificate issuer only
openssl x509 -in certificate.crt -issuer -noout

# Display certificate validity dates
openssl x509 -in certificate.crt -dates -noout

# Display certificate serial number
openssl x509 -in certificate.crt -serial -noout

# Display certificate fingerprint (MD5)
openssl x509 -in certificate.crt -fingerprint -noout

# Display certificate fingerprint (SHA-256)
openssl x509 -in certificate.crt -fingerprint -sha256 -noout

# Display certificate purpose
openssl x509 -in certificate.crt -purpose -noout

# Convert certificate formats
openssl x509 -in cert.pem -outform DER -out cert.der
openssl x509 -in cert.der -inform DER -outform PEM -out cert.pem

# Check certificate validity against current time
openssl x509 -in certificate.crt -noout -dates

# Extract public key from certificate
openssl x509 -in certificate.crt -pubkey -noout -out public_key.pem

# Display certificate in hash format for CA directory
openssl x509 -in certificate.crt -hash -noout

# Verify certificate purpose for specific usage
openssl x509 -in certificate.crt -purpose -noout | grep -i server

# Display certificate extensions
openssl x509 -in certificate.crt -text -noout | grep -A 20 "X509v3 extensions"
```

### Certificate Authority Operations

#### Creating a Certificate Authority
```bash
# Generate CA private key
openssl genrsa -out ca.key 4096

# Generate self-signed CA certificate with CA extensions
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt \
    -subj "/C=US/ST=California/L=San Francisco/O=My CA/OU=Certificate Authority/CN=My Root CA" \
    -extensions v3_ca -config <(
cat <<EOF
[ v3_ca ]
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid:always,issuer
basicConstraints = critical,CA:true
keyUsage = critical, digitalSignature, keyCertSign, cRLSign
EOF
)

# Create CA directory structure
mkdir -p CA/{certs,crl,newcerts,private}
touch CA/index.txt
echo 1000 > CA/serial
echo 1000 > CA/crlnumber

# Create CA configuration file
cat > openssl-ca.cnf << 'EOF'
[ ca ]
default_ca = CA_default

[ CA_default ]
dir               = ./CA
certs             = $dir/certs
crl_dir           = $dir/crl
database          = $dir/index.txt
new_certs_dir     = $dir/newcerts
certificate       = $dir/ca.crt
serial            = $dir/serial
crl               = $dir/crl.pem
private_key       = $dir/private/ca.key
RANDFILE          = $dir/private/.rand

default_days      = 365
default_crl_days  = 30
default_md        = sha256

policy            = policy_match

[ policy_match ]
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ v3_intermediate_ca ]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical,CA:true,pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
EOF
```

#### Signing Certificates with CA
```bash
# Sign CSR using CA (simple method)
openssl x509 -req -in request.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out certificate.crt -days 365

# Sign with specific CA extensions
openssl x509 -req -in request.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out certificate.crt -days 365 \
    -extensions v3_req -extfile openssl.cnf

# Sign using ca command (more complex but proper)
openssl ca -in request.csr -out certificate.crt -cert ca.crt -keyfile ca.key -days 365

# Sign with custom configuration
openssl ca -config openssl-ca.cnf -in request.csr -out certificate.crt -days 365

# Sign with specific extensions
openssl ca -config openssl-ca.cnf -in request.csr -out certificate.crt -days 365 -extensions server_cert

# Generate intermediate CA
openssl genrsa -out intermediate.key 4096
openssl req -new -key intermediate.key -out intermediate.csr -subj "/C=US/O=Company/CN=Intermediate CA"
openssl ca -config openssl-ca.cnf -in intermediate.csr -out intermediate.crt -days 1825 -extensions v3_intermediate_ca

# Revoke a certificate
openssl ca -config openssl-ca.cnf -revoke certificate.crt

# Generate CRL (Certificate Revocation List)
openssl ca -config openssl-ca.cnf -gencrl -out ca.crl.pem

# View certificate database
cat CA/index.txt
```

### Diffie-Hellman Parameters

#### Generate DH Parameters
```bash
# Generate 2048-bit DH parameters
openssl dhparam -out dhparam.pem 2048

# Generate 4096-bit DH parameters (very slow)
openssl dhparam -out dhparam-4096.pem 4096

# Generate DH parameters with generator 2 (default)
openssl dhparam -2 -out dhparam.pem 2048

# Generate DH parameters with generator 5
openssl dhparam -5 -out dhparam.pem 2048

# Generate DH parameters with detailed output
openssl dhparam -out dhparam.pem 2048 -verbose

# Display DH parameters
openssl dhparam -in dhparam.pem -text -noout

# Generate DH parameters in C format
openssl dhparam -in dhparam.pem -C -noout

# Check DH parameters
openssl dhparam -in dhparam.pem -check -noout

# Generate DH parameters with faster method (less secure)
openssl dhparam -dsaparam -out dhparam.pem 2048

# Convert to DER format
openssl dhparam -in dhparam.pem -outform DER -out dhparam.der
```

### SSL/TLS Testing and Diagnostics

#### SSL Certificate Testing
```bash
# Connect to HTTPS server and display certificate chain
openssl s_client -connect example.com:443 -showcerts

# Connect and display server certificate only
openssl s_client -connect example.com:443 -showcerts | openssl x509 -text -noout

# Connect with specific TLS version
openssl s_client -connect example.com:443 -tls1_2
openssl s_client -connect example.com:443 -tls1_3
openssl s_client -connect example.com:443 -tls1

# Connect with SNI support
openssl s_client -connect example.com:443 -servername example.com

# Test certificate against CA bundle
openssl s_client -connect example.com:443 -CAfile /etc/ssl/certs/ca-certificates.crt

# Verify certificate chain and return error on failure
openssl s_client -connect example.com:443 -verify_return_error

# Connect with specific cipher
openssl s_client -connect example.com:443 -cipher AES256-GCM-SHA384

# Connect with specific cipher suite
openssl s_client -connect example.com:443 -ciphersuites TLS_AES_256_GCM_SHA384

# Connect with client certificate
openssl s_client -connect example.com:443 -cert client.crt -key client.key

# Connect with specific certificate chain
openssl s_client -connect example.com:443 -cert client.crt -key client.key -CAfile ca.crt

# Get certificate information only
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -text -noout

# Check certificate expiration
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# Get certificate fingerprint
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -fingerprint -sha256

# Test OCSP stapling
openssl s_client -connect example.com:443 -status -tlsextdebug

# Connect with timeout
timeout 10 openssl s_client -connect example.com:443

# Test all available ciphers
nmap --script ssl-enum-ciphers -p 443 example.com
```

#### SSL Server Testing
```bash
# Run simple SSL server
openssl s_server -accept 8443 -cert certificate.crt -key private.key

# Run server with client certificate requirement
openssl s_server -accept 8443 -cert server.crt -key server.key -CAfile ca.crt -Verify 1

# Run server with specific TLS version
openssl s_server -accept 8443 -cert cert.pem -key key.pem -tls1_2

# Run server with WWW folder
openssl s_server -accept 8443 -cert cert.pem -key key.pem -WWW

# Test server connection
openssl s_client -connect localhost:8443

# Run server with debug output
openssl s_server -accept 8443 -cert cert.pem -key key.pem -debug

# Run server with HTTP protocol
openssl s_server -accept 8443 -cert cert.pem -key key.pem -HTTP

# Run server with specific cipher
openssl s_server -accept 8443 -cert cert.pem -key key.pem -cipher AES256-GCM-SHA384

# Run server with stateless session resumption
openssl s_server -accept 8443 -cert cert.pem -key key.pem -stateless

# Test SSL/TLS handshake time
openssl s_time -connect example.com:443 -new_session
```

### PKCS#12 Operations

#### Create and Manage PKCS#12 Files
```bash
# Create PKCS#12 file with private key and certificate
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt

# Create PKCS#12 with CA chain
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt -certfile ca.crt

# Create PKCS#12 without password (not recommended)
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt -passout pass:

# Create PKCS#12 with specific password
openssl pkcs12 -export -out bundle.p12 -inkey private.key -in certificate.crt -passout pass:mypassword

# List contents of PKCS#12 file
openssl pkcs12 -in bundle.p12 -info -noout

# List contents with password prompt
openssl pkcs12 -in bundle.p12 -info -noout

# Convert PKCS#12 to PEM (separate files)
openssl pkcs12 -in bundle.p12 -out bundle.pem -nodes -passin pass:password

# Extract private key from PKCS#12
openssl pkcs12 -in bundle.p12 -nocerts -out private.key -nodes -passin pass:password

# Extract certificate from PKCS#12
openssl pkcs12 -in bundle.p12 -clcerts -nokeys -out certificate.crt -passin pass:password

# Extract CA certificates from PKCS#12
openssl pkcs12 -in bundle.p12 -cacerts -nokeys -out ca.crt -passin pass:password

# Create PKCS#12 with friendly name
openssl pkcs12 -export -out bundle.p12 -inkey key.pem -in cert.pem -name "My Certificate" -passout pass:mypassword

# Merge multiple certificates into PKCS#12
cat cert1.crt cert2.crt > chain.pem
openssl pkcs12 -export -out bundle.p12 -inkey key.pem -in cert1.crt -certfile chain.pem
```

### Elliptic Curve Cryptography

#### Generate and Manage EC Keys
```bash
# List available curves
openssl ecparam -list_curves

# Generate EC private key with secp256r1 curve (P-256)
openssl ecparam -name secp256r1 -genkey -noout -out ec-private.key

# Generate EC key with prime256v1 curve (same as secp256r1)
openssl ecparam -name prime256v1 -genkey -noout -out ec-key.pem

# Generate EC key with secp384r1 curve (P-384)
openssl ecparam -name secp384r1 -genkey -noout -out ec-384.key

# Generate EC key with secp521r1 curve (P-521)
openssl ecparam -name secp521r1 -genkey -noout -out ec-521.key

# Extract public key from EC private key
openssl ec -in ec-private.key -pubout -out ec-public.key

# Display EC key parameters
openssl ecparam -in ec-private.key -text -noout

# Display EC key information
openssl ec -in ec-private.key -text -noout

# Convert EC key formats
openssl ec -in ec-key.pem -outform DER -out ec-key.der
openssl ec -in ec-key.der -inform DER -outform PEM -out ec-key.pem

# Generate EC key with explicit parameters
openssl ecparam -name secp256r1 -out ecparams.pem
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:secp256r1 -out ec-key.pem

# Create CSR from EC private key
openssl req -new -key ec-private.key -out ec-request.csr

# Create self-signed EC certificate
openssl req -new -x509 -key ec-private.key -days 365 -out ec-cert.crt
```

### S/MIME Operations

#### Encrypt and Sign with S/MIME
```bash
# Encrypt message using recipient's certificate
openssl smime -encrypt -in message.txt -out message.enc recipient-cert.pem

# Encrypt with multiple recipients
openssl smime -encrypt -in message.txt -out message.enc cert1.pem cert2.pem

# Sign message
openssl smime -sign -in message.txt -out message.sgn -signer cert.pem -inkey private.key

# Sign message with detached signature
openssl smime -sign -in message.txt -out message.sgn -signer cert.pem -inkey private.key -nodetach

# Sign and encrypt
openssl smime -sign -encrypt -in message.txt -out message.msg -signer cert.pem -inkey private.key recipient-cert.pem

# Decrypt message
openssl smime -decrypt -in message.enc -recip cert.pem -inkey private.key -out decrypted.txt

# Verify signature
openssl smime -verify -in message.sgn -out verified.txt

# Verify with CA certificates
openssl smime -verify -in message.sgn -out verified.txt -CAfile ca.crt

# Sign with specific attributes
openssl smime -sign -in message.txt -out message.sgn -signer cert.pem -inkey private.key -from sender@example.com -to recipient@example.com -subject "Signed Message"

# Encrypt with DES3 (deprecated)
openssl smime -encrypt -in message.txt -out message.enc -des3 recipient-cert.pem

# Create S/MIME message from file
openssl smime -sign -in document.pdf -out document.pdf.sgn -signer cert.pem -inkey private.key -binary
```

### Certificate Verification

#### Verify Certificate Chains
```bash
# Verify certificate against system CAs
openssl verify certificate.crt

# Verify with specific CA file
openssl verify -CAfile ca.crt certificate.crt

# Verify with CA directory
openssl verify -CApath /etc/ssl/certs certificate.crt

# Verify with untrusted certificate chain
openssl verify -untrusted intermediate.crt -CAfile root.crt certificate.crt

# Verify with explicit purpose checking
openssl verify -purpose sslserver certificate.crt
openssl verify -purpose sslclient certificate.crt
openssl verify -purpose smimesign certificate.crt

# Verify with CRL checking
openssl verify -CRLfile ca.crl -CAfile ca.crt certificate.crt

# Verify with OCSP checking
openssl ocsp -issuer ca.crt -cert certificate.crt -url http://ocsp.example.com

# Extended verification with detailed output
openssl verify -verbose -CAfile ca.crt certificate.crt

# Check certificate expiration
openssl x509 -in certificate.crt -noout -dates

# Verify certificate modulus matches private key
openssl rsa -noout -modulus -in private.key | openssl md5
openssl x509 -noout -modulus -in certificate.crt | openssl md5

# Complete chain verification
openssl verify -CAfile root.crt -untrusted intermediate.crt certificate.crt
```

### Performance Testing

#### Benchmark Cryptographic Operations
```bash
# Test algorithm performance
openssl speed

# Test specific algorithms
openssl speed aes-256-cbc
openssl speed rsa
openssl speed ecdsa
openssl speed sha256

# Test multi-threaded performance
openssl speed -multi 4 aes-256-cbc
openssl speed -multi 8 sha256

# Test with specific key sizes
openssl speed rsa2048
openssl speed rsa4096
openssl speed ecdsap256
openssl speed ecdsap384

# Test elapsed time
openssl speed -elapsed

# Test with specific iterations
openssl speed -mr evp aes-256-cbc
openssl speed -mr rsa

# Test all algorithms
openssl speed -seconds 10

# Test performance of different hash algorithms
openssl speed md5 sha1 sha256 sha512

# Test performance of different cipher algorithms
openssl speed des des-ede3 aes-128-cbc aes-192-cbc aes-256-cbc
```

## Practical Examples

### Complete Certificate Authority Setup
```bash
#!/bin/bash
# Complete Certificate Authority Setup

# Configuration
CA_DIR="my-ca"
ROOT_CA_DAYS=3650
INTERMEDIATE_CA_DAYS=1825
SERVER_CERT_DAYS=365

# Create CA directory structure
mkdir -p $CA_DIR/{root,intermediate}/{certs,crl,newcerts,private}
mkdir -p $CA_DIR/root/csr
mkdir -p $CA_DIR/intermediate/csr

# Create index files
touch $CA_DIR/root/index.txt
touch $CA_DIR/intermediate/index.txt
echo 1000 > $CA_DIR/root/serial
echo 1000 > $CA_DIR/intermediate/serial
echo 1000 > $CA_DIR/root/crlnumber
echo 1000 > $CA_DIR/intermediate/crlnumber

# Create root CA configuration
cat > $CA_DIR/root/openssl.cnf << 'EOF'
[ ca ]
default_ca = CA_default

[ CA_default ]
dir               = .
certs             = $dir/certs
crl_dir           = $dir/crl
database          = $dir/index.txt
new_certs_dir     = $dir/newcerts
certificate       = $dir/ca.crt
serial            = $dir/serial
crl               = $dir/crl.pem
private_key       = $dir/private/ca.key
RANDFILE          = $dir/private/.rand

default_days      = 3650
default_crl_days  = 30
default_md        = sha256

policy            = policy_match

[ policy_match ]
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ v3_ca ]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical,CA:true
keyUsage = critical, digitalSignature, keyCertSign, cRLSign

[ v3_intermediate_ca ]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical,CA:true,pathlen:0
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
EOF

# Create intermediate CA configuration
cat > $CA_DIR/intermediate/openssl.cnf << 'EOF'
[ ca ]
default_ca = CA_default

[ CA_default ]
dir               = .
certs             = $dir/certs
crl_dir           = $dir/crl
database          = $dir/index.txt
new_certs_dir     = $dir/newcerts
certificate       = $dir/ca.crt
serial            = $dir/serial
crl               = $dir/crl.pem
private_key       = $dir/private/ca.key
RANDFILE          = $dir/private/.rand

default_days      = 365
default_crl_days  = 30
default_md        = sha256

policy            = policy_match

[ policy_match ]
countryName             = match
stateOrProvinceName     = match
organizationName        = match
organizationalUnitName  = optional
commonName              = supplied
emailAddress            = optional

[ server_cert ]
basicConstraints = CA:FALSE
nsCertType = server
nsComment = "OpenSSL Generated Server Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[ client_cert ]
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "OpenSSL Generated Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer:always
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection
EOF

echo "CA directory structure created successfully!"
echo "Next steps:"
echo "1. Generate root CA key and certificate"
echo "2. Generate intermediate CA key and certificate"
echo "3. Sign intermediate CA with root CA"
echo "4. Start issuing certificates"
```

### Automated Certificate Generation
```bash
#!/bin/bash
# Automated Certificate Generation Script

DOMAIN=$1
CERT_TYPE=${2:-server}  # server, client, code_signing
KEY_SIZE=${3:-2048}
DAYS_VALID=${4:-365}

if [ -z "$DOMAIN" ]; then
    echo "Usage: $0 domain [cert_type] [key_size] [days_valid]"
    echo "cert_type: server (default), client, code_signing"
    exit 1
fi

# Certificate configuration based on type
case $CERT_TYPE in
    "server")
        EXTENSIONS="server_cert"
        SUBJECT="/C=US/ST=California/L=San Francisco/O=Company/OU=IT/CN=$DOMAIN"
        SAN_SUBJECT_ALT_NAME="DNS:$DOMAIN,DNS:www.$DOMAIN,DNS:api.$DOMAIN"
        ;;
    "client")
        EXTENSIONS="client_cert"
        SUBJECT="/C=US/ST=California/L=San Francisco/O=Company/OU=Users/CN=$DOMAIN"
        SAN_SUBJECT_ALT_NAME="email:$DOMAIN@company.com"
        ;;
    "code_signing")
        EXTENSIONS="code_signing"
        SUBJECT="/C=US/ST=California/L=San Francisco/O=Company/OU=Development/CN=$DOMAIN"
        SAN_SUBJECT_ALT_NAME=""
        ;;
    *)
        echo "Invalid certificate type: $CERT_TYPE"
        exit 1
        ;;
esac

# Create configuration file
CONFIG_FILE="${DOMAIN}.cnf"
cat > $CONFIG_FILE << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
$SUBJECT

[v3_req]
basicConstraints = CA:FALSE
keyUsage = critical, digitalSignature, keyEncipherment
EOF

# Add extensions based on certificate type
case $CERT_TYPE in
    "server")
        cat >> $CONFIG_FILE << EOF
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = $DOMAIN
DNS.2 = www.$DOMAIN
DNS.3 = api.$DOMAIN
EOF
        ;;
    "client")
        cat >> $CONFIG_FILE << EOF
extendedKeyUsage = clientAuth
EOF
        ;;
    "code_signing")
        cat >> $CONFIG_FILE << EOF
extendedKeyUsage = codeSigning
EOF
        ;;
esac

echo "Generating $CERT_TYPE certificate for $DOMAIN..."

# Generate private key
echo "Generating private key..."
openssl genrsa -out ${DOMAIN}.key $KEY_SIZE

# Generate certificate signing request
echo "Generating CSR..."
openssl req -new -key ${DOMAIN}.key -out ${DOMAIN}.csr -config $CONFIG_FILE

# Generate self-signed certificate
echo "Generating self-signed certificate..."
openssl req -x509 -days $DAYS_VALID -key ${DOMAIN}.key -in ${DOMAIN}.csr -out ${DOMAIN}.crt -extensions v3_req -extfile $CONFIG_FILE

# Display certificate information
echo -e "\nCertificate Information:"
openssl x509 -in ${DOMAIN}.crt -text -noout | grep -A 10 "Subject:"
openssl x509 -in ${DOMAIN}.crt -text -noout | grep -A 5 "Not Before"
openssl x509 -in ${DOMAIN}.crt -text -noout | grep -A 5 "Not After"

# Generate PKCS#12 bundle
echo "Creating PKCS#12 bundle..."
openssl pkcs12 -export -out ${DOMAIN}.p12 -inkey ${DOMAIN}.key -in ${DOMAIN}.crt -passout pass:

# Clean up
rm -f ${DOMAIN}.csr $CONFIG_FILE

echo -e "\nFiles generated:"
echo "- Private key: ${DOMAIN}.key"
echo "- Certificate: ${DOMAIN}.crt"
echo "- PKCS#12 bundle: ${DOMAIN}.p12 (password: empty)"

# Verify certificate
echo -e "\nVerifying certificate..."
openssl verify ${DOMAIN}.crt
```

### SSL Certificate Monitoring Script
```bash
#!/bin/bash
# SSL Certificate Monitoring and Alerting Script

DOMAINS_FILE="domains.txt"
ALERT_DAYS=30
ALERT_EMAIL="admin@example.com"
LOG_FILE="cert_monitor.log"

# Function to check certificate expiration
check_cert_expiry() {
    local domain=$1
    local port=${2:-443}

    echo "Checking certificate for $domain:$port"

    # Get certificate expiration date
    expiry_date=$(echo | openssl s_client -connect $domain:$port -servername $domain 2>/dev/null |
                  openssl x509 -noout -enddate 2>/dev/null |
                  cut -d= -f2)

    if [ -z "$expiry_date" ]; then
        echo "$(date): ERROR - Could not retrieve certificate for $domain:$port" | tee -a $LOG_FILE
        return 1
    fi

    # Convert to epoch time
    expiry_epoch=$(date -d "$expiry_date" +%s)
    current_epoch=$(date +%s)
    days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))

    echo "$(date): $domain expires in $days_until_expiry days ($expiry_date)" | tee -a $LOG_FILE

    # Check if certificate expires soon
    if [ $days_until_expiry -lt $ALERT_DAYS ]; then
        alert_message="URGENT: SSL certificate for $domain:$port expires in $days_until_expiry days on $expiry_date"
        echo "$alert_message" | mail -s "SSL Certificate Expiration Alert: $domain" $ALERT_EMAIL
        echo "$(date): ALERT SENT for $domain" | tee -a $LOG_FILE
    fi

    return 0
}

# Function to check certificate chain
check_cert_chain() {
    local domain=$1
    local port=${2:-443}

    echo "Checking certificate chain for $domain:$port"

    # Get certificate chain and verify
    chain_info=$(echo | openssl s_client -connect $domain:$port -servername $domain -showcerts 2>/dev/null)

    if [ $? -ne 0 ]; then
        echo "$(date): ERROR - Failed to connect to $domain:$port" | tee -a $LOG_FILE
        return 1
    fi

    # Count certificates in chain
    cert_count=$(echo "$chain_info" | grep -c "-----BEGIN CERTIFICATE-----")
    echo "$(date): Certificate chain for $domain has $cert_count certificates" | tee -a $LOG_FILE

    # Check for common issues
    if echo "$chain_info" | grep -q "self signed certificate"; then
        echo "$(date): WARNING - Self-signed certificate detected for $domain" | tee -a $LOG_FILE
    fi

    # Verify certificate purpose
    echo "$chain_info" | openssl x509 -purpose -noout 2>/dev/null | grep -q "SSL server"
    if [ $? -ne 0 ]; then
        echo "$(date): WARNING - Certificate may not be valid for SSL server usage" | tee -a $LOG_FILE
    fi
}

# Main monitoring loop
echo "$(date): Starting SSL certificate monitoring" | tee -a $LOG_FILE

if [ ! -f "$DOMAINS_FILE" ]; then
    echo "$(date): ERROR - Domains file $DOMAINS_FILE not found" | tee -a $LOG_FILE
    exit 1
fi

while read -r line; do
    # Skip comments and empty lines
    if [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "$line" ]]; then
        continue
    fi

    # Parse domain and port (format: domain:port)
    if [[ "$line" =~ ^([^:]+):([0-9]+)$ ]]; then
        domain="${BASH_REMATCH[1]}"
        port="${BASH_REMATCH[2]}"
    else
        domain="$line"
        port="443"
    fi

    check_cert_expiry "$domain" "$port"
    check_cert_chain "$domain" "$port"

    echo "---" >> $LOG_FILE
done < "$DOMAINS_FILE"

echo "$(date): SSL certificate monitoring completed" | tee -a $LOG_FILE
```

### File Encryption and Decryption Script
```bash
#!/bin/bash
# Secure File Encryption and Decryption Script

ENCRYPT_MODE="encrypt"
DECRYPT_MODE="decrypt"
ALGORITHM="aes-256-cbc"
KEY_SIZE=256
IV_SIZE=16

# Function to generate random key
generate_key() {
    openssl rand -hex $KEY_SIZE
}

# Function to generate random IV
generate_iv() {
    openssl rand -hex $IV_SIZE
}

# Function to encrypt file
encrypt_file() {
    local input_file=$1
    local output_file=${2:-"${input_file}.enc"}

    if [ ! -f "$input_file" ]; then
        echo "Error: Input file '$input_file' not found"
        return 1
    fi

    # Generate key and IV
    local key=$(generate_key)
    local iv=$(generate_iv)

    # Encrypt the file
    openssl enc -$ALGORITHM -K $key -iv $iv -in "$input_file" -out "$output_file"

    if [ $? -eq 0 ]; then
        # Save key and IV to separate files
        echo "$key" > "${output_file}.key"
        echo "$iv" > "${output_file}.iv"

        echo "File encrypted successfully:"
        echo "  Encrypted file: $output_file"
        echo "  Key file: ${output_file}.key"
        echo "  IV file: ${output_file}.iv"
        echo ""
        echo "IMPORTANT: Keep the key and IV files secure!"

        # Calculate file sizes
        input_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
        output_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")

        echo "Original size: $input_size bytes"
        echo "Encrypted size: $output_size bytes"
    else
        echo "Error: Failed to encrypt file"
        return 1
    fi
}

# Function to decrypt file
decrypt_file() {
    local input_file=$1
    local output_file=${2:-"${input_file%.enc}"}
    local key_file=${3:-"${input_file}.key"}
    local iv_file=${4:-"${input_file}.iv"}

    if [ ! -f "$input_file" ]; then
        echo "Error: Encrypted file '$input_file' not found"
        return 1
    fi

    if [ ! -f "$key_file" ]; then
        echo "Error: Key file '$key_file' not found"
        return 1
    fi

    if [ ! -f "$iv_file" ]; then
        echo "Error: IV file '$iv_file' not found"
        return 1
    fi

    # Read key and IV
    local key=$(cat "$key_file")
    local iv=$(cat "$iv_file")

    # Decrypt the file
    openssl enc -$ALGORITHM -d -K $key -iv $iv -in "$input_file" -out "$output_file"

    if [ $? -eq 0 ]; then
        echo "File decrypted successfully:"
        echo "  Decrypted file: $output_file"

        # Verify file integrity if available
        if [ -f "${output_file}.hash" ]; then
            echo "Verifying file integrity..."
            calculated_hash=$(openssl dgst -sha256 "$output_file" | cut -d' ' -f2)
            stored_hash=$(cat "${output_file}.hash")

            if [ "$calculated_hash" = "$stored_hash" ]; then
                echo "✓ File integrity verified"
            else
                echo "✗ File integrity check failed"
            fi
        fi
    else
        echo "Error: Failed to decrypt file"
        return 1
    fi
}

# Function to encrypt with password
encrypt_with_password() {
    local input_file=$1
    local output_file=${2:-"${input_file}.enc"}
    local password=$3

    if [ -z "$password" ]; then
        echo -n "Enter encryption password: "
        read -s password
        echo
        echo -n "Confirm password: "
        read -s password_confirm
        echo

        if [ "$password" != "$password_confirm" ]; then
            echo "Error: Passwords do not match"
            return 1
        fi
    fi

    openssl enc -$ALGORITHM -salt -pbkdf2 -iter 100000 -in "$input_file" -out "$output_file" -pass pass:"$password"

    if [ $? -eq 0 ]; then
        echo "File encrypted successfully with password"
        echo "Encrypted file: $output_file"
    else
        echo "Error: Failed to encrypt file"
        return 1
    fi
}

# Function to decrypt with password
decrypt_with_password() {
    local input_file=$1
    local output_file=${2:-"${input_file%.enc}"}
    local password=$3

    if [ -z "$password" ]; then
        echo -n "Enter decryption password: "
        read -s password
        echo
    fi

    openssl enc -$ALGORITHM -d -salt -pbkdf2 -iter 100000 -in "$input_file" -out "$output_file" -pass pass:"$password"

    if [ $? -eq 0 ]; then
        echo "File decrypted successfully"
        echo "Decrypted file: $output_file"
    else
        echo "Error: Failed to decrypt file (wrong password or corrupted file)"
        return 1
    fi
}

# Main script logic
case "$1" in
    "encrypt")
        if [ "$2" = "--password" ]; then
            encrypt_with_password "$3" "$4"
        else
            encrypt_file "$2" "$3"
        fi
        ;;
    "decrypt")
        if [ "$2" = "--password" ]; then
            decrypt_with_password "$3" "$4"
        else
            decrypt_file "$2" "$3" "$4" "$5"
        fi
        ;;
    *)
        echo "Usage: $0 {encrypt|decrypt} [--password] input_file [output_file] [key_file] [iv_file]"
        echo "  encrypt: Encrypt a file"
        echo "  decrypt: Decrypt a file"
        echo "  --password: Use password-based encryption instead of key/IV files"
        echo ""
        echo "Examples:"
        echo "  $0 encrypt document.pdf"
        echo "  $0 encrypt --password secret.txt secret.enc"
        echo "  $0 decrypt document.pdf.enc decrypted.pdf"
        echo "  $0 decrypt --password secret.enc secret.txt"
        exit 1
        ;;
esac
```

## Related Commands

- [`gpg`](/docs/commands/security/gpg) - GNU Privacy Guard
- [`ssh-keygen`](/docs/commands/security/ssh-keygen) - SSH key generation and management
- [`keytool`](/docs/commands/security/keytool) - Java key and certificate management
- [`certbot`](/docs/commands/security/certbot) - Let's Encrypt client for SSL certificates
- [`curl`](/docs/commands/networking/curl) - Transfer data with SSL/TLS support
- [`wget`](/docs/commands/networking/wget) - Network downloader with SSL support
- [`gnutls-cli`](/docs/commands/security/gnutls-cli) - GnuTLS client tool
- [`nmap`](/docs/commands/networking/nmap) - Network scanner with SSL/TLS scripts

## Best Practices

### Security Considerations
1. **Use strong algorithms** - Prefer AES-256-GCM or ChaCha20-Poly1305 over older ciphers
2. **Secure key management** - Protect private keys with strong passphrases and proper access controls
3. **Regular certificate updates** - Renew certificates before expiration with adequate time
4. **Key size selection** - Use minimum 2048-bit RSA or 256-bit ECC for security
5. **Secure random generation** - Use OpenSSL's random functions for keys and IVs
6. **Algorithm validation** - Validate certificate chains and digital signatures
7. **Perfect forward secrecy** - Use ECDHE cipher suites for SSL/TLS connections
8. **Hardware security** - Consider HSM for critical private keys and certificates
9. **Backup strategies** - Implement secure backup procedures for certificates and keys
10. **Audit trails** - Log all certificate operations and key usage

### Key Management
1. **Backup keys** - Keep secure, encrypted backups of private keys
2. **Key rotation** - Implement regular key rotation policies (typically annually)
3. **Access control** - Restrict access to private keys using file permissions
4. **Key segregation** - Use different keys for different purposes and environments
5. **Version control** - Never commit private keys to version control systems
6. **Secure storage** - Store keys in hardware security modules when possible
7. **Key destruction** - Properly destroy old keys when they're no longer needed
8. **Key inventory** - Maintain an inventory of all cryptographic keys
9. **Recovery planning** - Have documented procedures for key recovery
10. **Compliance** - Ensure key management meets regulatory requirements

### Certificate Management
1. **Complete information** - Include all required fields and extensions in CSRs
2. **Subject Alternative Names** - Use SAN instead of Common Name for modern browsers
3. **Certificate hierarchy** - Maintain proper CA structures with intermediate certificates
4. **Revocation checking** - Implement CRL and OCSP checking for certificate revocation
5. **Certificate pinning** - Consider certificate pinning for critical services
6. **Automated renewal** - Set up automated certificate renewal processes
7. **OCSP stapling** - Enable OCSP stapling for improved performance and privacy
8. **Certificate transparency** - Monitor certificate transparency logs for issued certificates
9. **Multi-domain certificates** - Use SAN certificates instead of multiple certificates
10. **Wildcards sparingly** - Use wildcard certificates carefully due to security implications

### SSL/TLS Configuration
1. **Protocol versions** - Disable SSLv2, SSLv3, and TLS 1.0/1.1, use TLS 1.2/1.3
2. **Cipher suites** - Use strong, modern cipher suites with forward secrecy
3. **Perfect Forward Secrecy** - Prioritize ECDHE key exchange
4. **HSTS** - Implement HTTP Strict Transport Security headers
5. **Certificate chains** - Ensure complete certificate chain is served
6. **Secure renegotiation** - Enable secure renegotiation
7. **Compression** - Disable TLS compression to prevent CRIME attacks
8. **Session tickets** - Configure secure session ticket keys
9. **ALPN** - Use Application-Layer Protocol Negotiation where appropriate
10. **Regular testing** - Regularly test SSL/TLS configuration with tools like SSL Labs

### Development Practices
1. **Error handling** - Implement proper error handling for cryptographic operations
2. **Memory management** - Securely wipe sensitive data from memory
3. **Input validation** - Validate all inputs to cryptographic operations
4. **Timing attacks** - Implement constant-time comparisons for sensitive data
5. **Random number quality** - Use cryptographically secure random number generators
6. **Side-channel protection** - Be aware of timing and cache-based side channels
7. **Code review** - Have cryptographic code reviewed by security experts
8. **Testing** - Include security testing in the development lifecycle
9. **Documentation** - Document cryptographic decisions and configurations
10. **Updates** - Keep OpenSSL libraries updated to latest stable versions

## Performance Tips

1. **Hardware acceleration** - Use OpenSSL engine support for hardware acceleration
2. **Multi-threading** - Enable multi-threading for parallel cryptographic operations
3. **Session caching** - Implement SSL/TLS session caching for better performance
4. **Connection pooling** - Reuse SSL/TLS connections where possible
5. **Optimized ciphers** - Use hardware-accelerated cipher suites when available
6. **Buffer sizes** - Use appropriate buffer sizes for I/O operations
7. **Asymmetric operations** - Cache asymmetric key operations when possible
8. **Memory management** - Optimize memory usage for bulk cryptographic operations
9. **Benchmarking** - Regularly benchmark cryptographic performance
10. **Algorithm selection** - Choose appropriate algorithms based on performance vs security needs

The `openssl` command is a comprehensive cryptographic toolkit that provides essential functionality for secure communications, data protection, and certificate management in modern computing environments. Its extensive features make it indispensable for system administrators, security professionals, and developers working with encryption, digital signatures, and SSL/TLS protocols.