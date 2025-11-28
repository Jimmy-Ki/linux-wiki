---
title: base64 - Base64 Encode and Decode Data
sidebar_label: base64
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# base64 - Base64 Encode and Decode Data

The `base64` command is a utility that encodes and decodes data using the Base64 encoding scheme. Base64 is a binary-to-text encoding method that converts binary data into an ASCII string format by translating it into a radix-64 representation. This encoding is commonly used to transmit binary data over channels that only support text content, such as email attachments, XML/JSON data, and URL parameters. The command provides options for handling different input/output formats, line wrapping, and in-place file operations.

## Basic Syntax

```bash
base64 [OPTION]... [FILE]
```

## Common Options

### Encoding/Decoding Options
- `-d, --decode` - Decode data instead of encoding
- `-i, --ignore-garbage` - When decoding, ignore non-alphabetic characters
- `-w, --wrap=COLS` - Wrap encoded lines at COLS characters (default 76, 0 disables)
- `--help` - Display help information and exit
- `--version` - Output version information and exit

### Input/Output Options
- `[FILE]` - Input file to encode/decode (default: standard input)
- When no FILE is specified, read from standard input
- Output is written to standard output

## Usage Examples

### Basic Encoding Operations

#### Encode Text Strings
```bash
# Encode a simple string
echo "Hello World" | base64
# Output: SGVsbG8gV29ybGQK

# Encode without trailing newline
echo -n "Hello World" | base64
# Output: SGVsbG8gV29ybGQ

# Encode with printf (no newline)
printf "Hello World" | base64
# Output: SGVsbG8gV29ybGQ
```

#### Encode Files
```bash
# Encode a text file
base64 document.txt

# Save encoded output to file
base64 document.txt > document.b64

# Encode binary file
base64 image.jpg > image.b64

# Encode with custom line wrapping
base64 -w 50 large_file.txt > wrapped_output.b64
```

#### Decode Operations
```bash
# Decode from standard input
echo "SGVsbG8gV29ybGQK" | base64 -d

# Decode from file
base64 -d document.b64 > decoded_document.txt

# Decode and ignore non-alphabetic characters
echo "SGVsbG8gV29ybGQK" | base64 -di

# Decode with line wrapping in source
cat encoded_file.txt | base64 -d > original_file.txt
```

### Advanced Encoding Operations

#### Control Line Wrapping
```bash
# Encode with no line wrapping (single line)
base64 -w 0 large_file.txt

# Encode with 40 character wrapping
base64 -w 40 file.txt

# Default behavior (76 character wrapping)
base64 file.txt

# Encode with 100 character wrapping
base64 -w 100 file.txt
```

#### In-place File Operations
```bash
# Note: base64 doesn't have in-place option, use temp file
base64 input.txt > temp.b64 && mv temp.b64 input.txt.b64

# Decode in-place
base64 -d input.b64 > temp.txt && mv temp.txt input.txt
```

#### Working with Binary Data
```bash
# Encode binary file (executable)
base64 program.bin > program.b64

# Encode compressed data
gzip -c file.txt | base64 > file.gz.b64

# Decode back to binary
base64 -d program.b64 > program.bin

# Decode compressed data
base64 -d file.gz.b64 | gunzip > file.txt
```

### Data Transformation Examples

#### URL-safe Base64
```bash
# Create URL-safe base64 (replace + and /)
echo "Hello World" | base64 | tr '+' '-' | tr '/' '_'

# Full URL-safe encoding function
url_base64_encode() {
    printf "%s" "$1" | base64 | tr -d '=' | tr '+' '-' | tr '/' '_'
}

# URL-safe decoding
url_base64_decode() {
    printf "%s" "$1" | tr '-' '+' | tr '_' '/' | base64 -d
}
```

#### Hash Encoding
```bash
# Encode SHA256 hash in base64
echo -n "password" | sha256sum | base64

# Generate base64-encoded random data
openssl rand -base64 32

# Create base64-encoded timestamp
date +%s | base64
```

#### String Manipulation
```bash
# Reverse and encode
echo "Hello World" | rev | base64

# Encode and reverse
echo "Hello World" | base64 | rev

# Multiple encoding layers
echo "Hello World" | base64 | base64 | base64

# Decode multiple layers
echo "SGVsbG8gV29ybGQK" | base64 -d | base64 -d | base64 -d
```

### File Processing Examples

#### Batch File Operations
```bash
# Encode all text files in directory
for file in *.txt; do
    base64 "$file" > "${file}.b64"
done

# Encode files with original name in output
for file in *.jpg; do
    base64 "$file" > "encoded_${file}"
done

# Decode all .b64 files
for file in *.b64; do
    base64 -d "$file" > "${file%.b64}"
done
```

#### File Integrity
```bash
# Create base64 checksum of file
base64 file.txt > file.txt.b64

# Verify file integrity
base64 file.txt | cmp - file.txt.b64

# Create multiple encoding backups
cp file.txt file.txt.backup
base64 file.txt > file.txt.b64.backup
base64 -w 0 file.txt > file.txt.single.b64
```

### Network and Web Examples

#### HTTP Authentication
```bash
# Create Basic Authentication header
echo -n "username:password" | base64
# Output: dXNlcm5hbWU6cGFzc3dvcmQ=

# Use with curl
curl -H "Authorization: Basic $(echo -n "user:pass" | base64)" https://api.example.com

# JWT header encoding (simplified)
echo -n '{"alg":"HS256","typ":"JWT"}' | base64 -w 0
```

#### Data Transmission
```bash
# Encode file for JSON transmission
base64 -w 0 file.txt | jq -R '{data: .}'

# Create data URI for HTML
printf "data:text/plain;base64,"; base64 -w 0 file.txt

# Email attachment encoding (simplified)
echo "Content-Type: text/plain"
echo "Content-Transfer-Encoding: base64"
echo ""
base64 email_body.txt
```

## Practical Examples

### System Administration

#### Configuration Files
```bash
# Encode sensitive configuration
base64 -w 0 config.ini > config.b64

# Decode configuration
base64 -d config.b64 > config.ini

# Backup with encoding
tar -czf - /etc/important | base64 > backup_$(date +%Y%m%d).tar.gz.b64

# Restore from encoded backup
base64 -d backup_20231201.tar.gz.b64 | tar -xzf -
```

#### Password and Key Management
```bash
# Generate random base64 password
openssl rand -base64 32

# Create base64-encoded API key
head -c 32 /dev/urandom | base64

# Store credentials securely
echo "user:password" | base64 > credentials.b64

# Retrieve credentials
base64 -d credentials.b64
```

#### Log Processing
```bash
# Encode log files for transmission
base64 -w 0 application.log > log_$(date +%Y%m%d).b64

# Decode received log
base64 -d log_20231201.b64 | grep "ERROR"

# Create log digest
tail -1000 app.log | base64 > recent_log.b64
```

### Development Workflow

#### Source Code Handling
```bash
# Encode source code for transmission
base64 -w 0 main.py > source.py.b64

# Decode received source code
base64 -d source.py.b64 > main.py

# Create encoded patch file
diff -u old_file new_file | base64 > patch.b64
```

#### Build Artifacts
```bash
# Encode build artifacts
base64 -w 0 build/release.tar.gz > release.b64

# Deploy from encoded artifact
base64 -d release.b64 | tar -xzf - -C /opt/app/

# Create multi-format release
tar -czf release.tar.gz dist/
base64 -w 0 release.tar.gz > release.b64
rm release.tar.gz
```

### Data Processing

#### Database Operations
```bash
# Encode binary data for database storage
base64 -w 0 binary_file.dat > sql_insert.sql

# Create SQL with base64 data
echo "INSERT INTO files (name, content) VALUES ('image.jpg', '$(base64 -w 0 image.jpg)');"

# Decode database-stored data
mysql -e "SELECT content FROM files WHERE name='image.jpg';" | base64 -d > image.jpg
```

#### Data Conversion
```bash
# Convert hex to base64
echo "48656c6c6f20576f726c64" | xxd -r -p | base64

# Convert base64 to hex
echo "SGVsbG8gV29ybGQK" | base64 -d | xxd -p

# Convert decimal to base64
echo "12345" | xxd -r -p | base64
```

### Security Applications

#### Data Obfuscation
```bash
# Simple data obfuscation (not encryption!)
cat sensitive.txt | base64 | base64 | base64

# Multi-stage decoding
cat obfuscated.txt | base64 -d | base64 -d | base64 -d
```

#### Certificate Handling
```bash
# Extract certificate in base64
openssl x509 -in cert.pem -outform DER | base64

# Convert certificate to base64 PEM
cat cert.pem | base64 -w 64 > cert.b64
```

### Media Processing

#### Image Encoding
```bash
# Create HTML image data URI
printf '<img src="data:image/jpeg;base64,'; base64 -w 0 photo.jpg; echo '">'

# Encode multiple images
for img in *.jpg; do
    base64 -w 0 "$img" > "${img%.jpg}.b64"
done

# Create gallery with data URIs
echo '<html><body>'
for img in *.jpg; do
    printf '<img src="data:image/jpeg;base64,'
    base64 -w 0 "$img"
    echo '">'
done
echo '</body></html>'
```

#### Audio/Video Processing
```bash
# Encode audio file for web embedding
base64 -w 0 audio.mp3 > audio.b64

# Create HTML5 audio element
printf '<audio src="data:audio/mpeg;base64,'
cat audio.b64
echo '"></audio>'
```

## Script Integration

### Bash Scripts

#### Backup Script
```bash
#!/bin/bash
# Encode backup script

SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create compressed archive and encode
tar -czf - "$SOURCE_DIR" | base64 -w 0 > "$BACKUP_DIR/backup_$DATE.tar.gz.b64"

# Verify backup
if [ -f "$BACKUP_DIR/backup_$DATE.tar.gz.b64" ]; then
    echo "Backup created: backup_$DATE.tar.gz.b64"
    echo "Size: $(du -h "$BACKUP_DIR/backup_$DATE.tar.gz.b64")"
else
    echo "Backup failed!"
    exit 1
fi
```

#### File Transfer Script
```bash
#!/bin/bash
# Encode and transfer files

if [ $# -eq 0 ]; then
    echo "Usage: $0 <file>"
    exit 1
fi

FILE="$1"
ENCODED="${FILE}.b64"

# Encode file
base64 -w 0 "$FILE" > "$ENCODED"

echo "File encoded: $ENCODED"
echo "Original size: $(stat -f%z "$FILE")"
echo "Encoded size: $(stat -f%z "$ENCODED")"

# Generate transfer command
echo "Transfer command:"
echo "cat $ENCODED | base64 -d > $FILE"
```

#### Verification Script
```bash
#!/bin/bash
# Verify base64 encoding integrity

check_encoding() {
    local file="$1"
    local encoded="${file}.b64"

    # Create encoding
    base64 -w 0 "$file" > "$encoded"

    # Decode and compare
    if base64 -d "$encoded" | cmp - "$file"; then
        echo "✓ $file: Encoding verified"
    else
        echo "✗ $file: Encoding failed"
    fi

    rm "$encoded"
}

# Check all files in directory
for file in *.txt; do
    check_encoding "$file"
done
```

### Pipeline Integration

#### Data Processing Pipeline
```bash
# Process and encode data
process_data.sh | base64 -w 0 | curl -X POST -d @- https://api.example.com/data

# Decode and process
curl https://api.example.com/data | base64 -d | process_data.sh

# Multi-step pipeline
cat large_dataset.csv | \
    awk '{print $1 "," $2}' | \
    sort | \
    uniq | \
    base64 -w 0 > processed_data.b64
```

## Advanced Usage

### Performance Optimization

#### Large File Processing
```bash
# Process large file in chunks (using split)
split -b 10M large_file.txt chunk_
for chunk in chunk_*; do
    base64 -w 0 "$chunk" > "${chunk}.b64"
    rm "$chunk"
done
cat chunk_*.b64 > large_file.txt.b64
rm chunk_*.b64

# Monitor encoding progress
pv large_file.txt | base64 > encoded_file.b64
```

#### Parallel Processing
```bash
# Parallel encoding of multiple files
find . -name "*.log" -print0 | xargs -0 -P 4 -I {} bash -c 'base64 -w 0 "$1" > "$1.b64"' _ {}

# Parallel decoding
find . -name "*.b64" -print0 | xargs -0 -P 4 -I {} bash -c 'base64 -d "$1" > "${1%.b64}"' _ {}
```

### Custom Functions

#### Enhanced Base64 Functions
```bash
# Base64 with compression
compress_and_encode() {
    local file="$1"
    gzip -c "$file" | base64 -w 0 > "${file}.gz.b64"
}

# Decode and decompress
decode_and_decompress() {
    local file="$1"
    base64 -d "$file" | gunzip > "${file%.gz.b64}"
}

# Base64 with encryption (simplified)
encrypt_and_encode() {
    local file="$1"
    local password="$2"
    openssl enc -aes-256-cbc -salt -in "$file" -pass pass:"$password" | base64 -w 0
}

# Decode and decrypt
decode_and_decrypt() {
    local file="$1"
    local password="$2"
    base64 -d "$file" | openssl enc -aes-256-cbc -d -salt -pass pass:"$password"
}
```

#### Utility Functions
```bash
# Check if string is valid base64
is_base64() {
    [[ "$1" =~ ^[A-Za-z0-9+/]*={0,2}$ ]] && echo "Valid" || echo "Invalid"
}

# Compare two base64 strings
base64_compare() {
    local str1="$1"
    local str2="$2"
    local file1=$(mktemp)
    local file2=$(mktemp)

    echo "$str1" | base64 -d > "$file1"
    echo "$str2" | base64 -d > "$file2"

    cmp -s "$file1" "$file2"
    local result=$?

    rm "$file1" "$file2"
    return $result
}
```

## Troubleshooting

### Common Issues

#### Invalid Base64 Input
```bash
# Handle invalid characters gracefully
echo "Invalid@Base64" | base64 -d 2>/dev/null || echo "Invalid input"

# Use ignore garbage option for partial cleanup
echo "SGVsbG8@World" | base64 -di

# Validate before decoding
validate_base64() {
    if echo "$1" | base64 -d >/dev/null 2>&1; then
        echo "Valid base64"
    else
        echo "Invalid base64"
    fi
}
```

#### Line Break Issues
```bash
# Problems with line breaks in encoded data
echo "SGVsbG8gV29ybGQK
Cg==" | base64 -d  # May fail due to line breaks

# Remove line breaks first
echo "SGVsbG8gV29ybGQK
Cg==" | tr -d '\n' | base64 -d

# Or use ignore garbage option
echo "SGVsbG8gV29ybGQK
Cg==" | base64 -di
```

#### Memory Issues with Large Files
```bash
# Use streaming for very large files
# Instead of: base64 huge_file.txt
# Use: pv huge_file.txt | base64 > output.b64

# Process in chunks for extremely large files
split -b 100M huge_file.txt part_
for part in part_*; do
    base64 -w 0 "$part" >> encoded_output.b64
    rm "$part"
done
```

#### Performance Optimization
```bash
# Compare encoding speeds
time base64 large_file.txt > /dev/null
time base64 -w 0 large_file.txt > /dev/null
time base64 -w 76 large_file.txt > /dev/null

# Find optimal line wrap size
for wrap in 0 40 76 100; do
    echo "Testing wrap=$wrap:"
    time base64 -w $wrap large_file.txt > /dev/null
done
```

## Related Commands

- [`openssl`](/docs/commands/security/openssl) - OpenSSL cryptographic toolkit (base64 command)
- [`xxd`](/docs/commands/file-management/xxd) - Hex dump tool
- [`od`](/docs/commands/file-management/od) - Octal dump tool
- [`hexdump`](/docs/commands/file-management/hexdump) - ASCII, decimal, hex, octal dump
- [`uuencode`](/docs/commands/other/uuencode) - Uuencode/uudecode files
- [`tr`](/docs/commands/text-processing/tr) - Translate or delete characters
- [`sed`](/docs/commands/text-processing/sed) - Stream editor
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`jq`](/docs/commands/text-processing/jq) - JSON processor
- [`curl`](/docs/commands/networking/curl) - Transfer data from servers

## Best Practices

1. **Use appropriate line wrapping** (-w 0 for data URIs, default for email)
2. **Handle binary data carefully** with proper input/output redirection
3. **Validate base64 input** before decoding in scripts
4. **Use compression** before encoding large binary files
5. **Consider security** - base64 is encoding, not encryption
6. **Manage file extensions** properly (.b64, .base64, etc.)
7. **Test encoding/decoding** for critical data
8. **Use streaming** for large files to avoid memory issues
9. **Handle line breaks** consistently across platforms
10. **Document encoding parameters** when sharing encoded data

## Performance Tips

1. **Disable line wrapping** (-w 0) for maximum encoding speed
2. **Use compression** before encoding large repetitive data
3. **Process files in parallel** when handling multiple files
4. **Use pv or pipe viewer** to monitor progress on large files
5. **Avoid intermediate files** with shell pipelines
6. **Consider memory limits** when encoding very large files
7. **Use appropriate buffer sizes** for streaming operations
8. **Test different line wrap sizes** for your specific use case
9. **Prefer base64 over uuencode** for better compatibility
10. **Use OpenSSL base64** for additional options and better performance

The `base64` command is an essential utility for data encoding and transmission across text-based protocols. Its simplicity and reliability make it ideal for email attachments, data URIs, configuration files, and any scenario where binary data needs to be safely transmitted through text-only channels. While not a security measure, it provides excellent compatibility and is widely supported across programming languages and platforms.