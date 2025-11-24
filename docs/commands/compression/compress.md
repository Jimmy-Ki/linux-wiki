---
title: compress - Lempel-Ziv Compression Utility
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation program._

# compress - Lempel-Ziv Compression Utility

The `compress` command is a classic Unix compression utility that uses the Lempel-Ziv (LZ) compression algorithm to reduce file sizes. While largely superseded by more modern compression tools like gzip and bzip2, compress remains important for compatibility with legacy systems and specific use cases. Files compressed with compress typically have a `.Z` extension.

## Basic Syntax

```bash
compress [OPTIONS] [FILES]
```

## Common Options

### Basic Options
- `-f, --force` - Force compression, even if file already exists
- `-c, --stdout, --to-stdout` - Write to standard output, don't change original files
- `-v, --verbose` - Write progress messages to standard error
- `-r, --recursive` - Recursively compress files in directories

### Compression Control
- `-b BITS` - Set the upper limit of bits per code (default: 16, range: 9-16)
- `-V, --version` - Display version information and compile options
- `-d, --decompress, --uncompress` - Decompress files (acts like uncompress)

### Behavior Options
- `-q, --quiet` - Suppress all warning messages
- `-h, --help` - Display help information

## Usage Examples

### Basic Compression
```bash
# Compress a single file
compress document.txt
# Result: document.txt.Z

# Compress multiple files
compress file1.txt file2.txt file3.txt
# Result: file1.txt.Z, file2.txt.Z, file3.txt.Z

# Force compression (overwrite existing .Z file)
compress -f document.txt

# Compress with verbose output
compress -v large_file.log
```

### Output Redirection
```bash
# Compress to standard output
compress -c document.txt > document.txt.Z

# Compress and pipe to another command
compress -c large_file.log | mail -s "Compressed log" user@example.com

# Decompress to standard output
compress -d -c document.txt.Z > document.txt
```

### Decompression
```bash
# Decompress using -d option
compress -d document.txt.Z

# Use uncompress command (symbolic link to compress)
uncompress document.txt.Z

# Decompress to standard output
compress -d -c document.txt.Z > new_document.txt
```

### Directory Operations
```bash
# Compress files in directory recursively
compress -r /var/log/old_logs/

# Compress specific pattern
compress *.log

# Compress and keep original file
compress -c original.txt > compressed.txt.Z
```

## Practical Examples

### Log File Compression Script
```bash
#!/bin/bash
# Log file compression utility using compress

LOG_DIR="/var/log"
COMPRESSED_DIR="$LOG_DIR/compressed"
RETENTION_DAYS=30

# Create compressed logs directory
mkdir -p "$COMPRESSED_DIR"

# Function to compress log files
compress_logs() {
    local log_pattern="$1"
    local archive_name="$2"

    echo "Compressing logs: $log_pattern"

    # Find matching log files and compress them
    find "$LOG_DIR" -name "$log_pattern" -type f -mtime +7 | while read log_file; do
        echo "Processing: $(basename "$log_file")"

        # Compress the file
        compress -f -v "$log_file"

        if [ $? -eq 0 ]; then
            echo "Successfully compressed: $log_file"

            # Move compressed file to archive directory
            mv "${log_file}.Z" "$COMPRESSED_DIR/"

            # Create archive entry
            echo "$(date): Compressed $log_file" >> "$COMPRESSED_DIR/${archive_name}_compression.log"
        else
            echo "Failed to compress: $log_file"
        fi
    done
}

# Compress different types of log files
compress_logs "*.log" "application"
compress_logs "*.log.[0-9]" "rotated"
compress_logs "*.log.[0-9][0-9]" "old_rotated"

# Clean up very old compressed logs
find "$COMPRESSED_DIR" -name "*.Z" -mtime +$RETENTION_DAYS -delete

echo "Log compression completed"
```

### System Backup Compression
```bash
#!/bin/bash
# Create compressed system backup

BACKUP_DIR="/backups/system"
DATE=$(date +%Y%m%d_%H%M%S)
TEMP_DIR="/tmp/backup_$DATE"

mkdir -p "$BACKUP_DIR" "$TEMP_DIR"

echo "Creating system backup"

# Create tar archive first
tar --create \
    --file="$TEMP_DIR/system_backup.tar" \
    --exclude="/proc" \
    --exclude="/sys" \
    --exclude="/dev" \
    --exclude="/tmp" \
    --exclude="/var/tmp" \
    --exclude="/var/cache" \
    /etc /home /var /opt

# Compress the tar archive using compress
echo "Compressing backup archive"
compress -vf "$TEMP_DIR/system_backup.tar"

if [ $? -eq 0 ]; then
    # Move compressed backup to backup directory
    mv "$TEMP_DIR/system_backup.tar.Z" "$BACKUP_DIR/system_backup_$DATE.tar.Z"

    # Create backup info
    cat > "$BACKUP_DIR/system_backup_$DATE.info" << EOF
System Backup Information
========================
Date: $(date)
Type: Compressed tar archive (LZ compression)
Size: $(du -h "$BACKUP_DIR/system_backup_$DATE.tar.Z" | cut -f1)
Contents: /etc, /home, /var, /opt

To extract:
1. uncompress system_backup_$DATE.tar.Z
2. tar -xf system_backup_$DATE.tar
EOF

    echo "System backup completed: system_backup_$DATE.tar.Z"
else
    echo "Backup compression failed"
    exit 1
fi

# Cleanup
rm -rf "$TEMP_DIR"
```

### File Transfer Compression
```bash
#!/bin/bash
# Compress files for network transfer

SOURCE_DIR="$1"
DEST_HOST="$2"
DEST_PATH="$3"

if [ $# -ne 3 ]; then
    echo "Usage: $0 <source_directory> <destination_host> <destination_path>"
    exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist"
    exit 1
fi

echo "Compressing and transferring $SOURCE_DIR to $DEST_HOST:$DEST_PATH"

# Create tar archive and compress in one step
tar --create --directory="$SOURCE_DIR" . | compress -c | \
ssh "$DEST_HOST" "cat > $DEST_PATH/transfer_$(date +%Y%m%d_%H%M%S).tar.Z"

if [ ${PIPESTATUS[0]} -eq 0 ] && [ ${PIPESTATUS[1]} -eq 0 ] && [ ${PIPESTATUS[2]} -eq 0 ]; then
    echo "Transfer completed successfully"
else
    echo "Transfer failed"
    exit 1
fi
```

### Compatibility Mode Script
```bash
#!/bin/bash
# Ensure compatibility with systems that only support compress

ARCHIVE_FILE="$1"
COMPATIBILITY_MODE="$2"

if [ -z "$ARCHIVE_FILE" ]; then
    echo "Usage: $0 <archive_file> [compatibility_mode]"
    echo "compatibility_mode: legacy (for old systems) | modern (default)"
    exit 1
fi

if [ "$COMPATIBILITY_MODE" = "legacy" ]; then
    echo "Using legacy compress format for maximum compatibility"

    if [ -f "$ARCHIVE_FILE" ]; then
        # Compress with maximum compatibility settings
        compress -b 12 -f -v "$ARCHIVE_FILE"
        echo "Created legacy-compatible archive: ${ARCHIVE_FILE}.Z"
    else
        echo "File not found: $ARCHIVE_FILE"
        exit 1
    fi
else
    echo "Checking archive compatibility"

    # Test if file can be decompressed
    if [ -f "${ARCHIVE_FILE}.Z" ]; then
        if compress -d -t "${ARCHIVE_FILE}.Z" 2>/dev/null; then
            echo "Archive is compatible and readable"
        else
            echo "Archive may be corrupted or incompatible"
            exit 1
        fi
    else
        echo "Compressed archive not found: ${ARCHIVE_FILE}.Z"
        exit 1
    fi
fi
```

## Real-World Scenarios

### Legacy System Data Transfer
```bash
#!/bin/bash
# Prepare data for transfer to legacy Unix systems

DATA_DIR="/data/export"
LEGACY_DIR="/tmp/legacy_transfer"
DESTINATION="oldserver.company.com"

mkdir -p "$LEGACY_DIR"

echo "Preparing data for legacy system transfer"

# Convert text files to Unix format and compress
find "$DATA_DIR" -type f | while read file; do
    relative_path="${file#$DATA_DIR/}"
    legacy_file="$LEGACY_DIR/$relative_path"

    # Create directory structure
    mkdir -p "$(dirname "$legacy_file")"

    # Convert line endings and compress
    if file "$file" | grep -q "text"; then
        # Text file - convert line endings first
        tr -d '\r' < "$file" | compress -c > "${legacy_file}.Z"
    else
        # Binary file - compress directly
        compress -c "$file" > "${legacy_file}.Z"
    fi

    echo "Processed: $relative_path"
done

# Create transfer manifest
cat > "$LEGACY_DIR/MANIFEST.txt" << EOF
Transfer Manifest
================
Date: $(date)
Source: $DATA_DIR
Target: $DESTINATION
Compression: Lempel-Ziv (compress)
Files: $(find "$LEGACY_DIR" -name "*.Z" | wc -l)

Transfer Instructions:
1. Copy all .Z files to $DESTINATION
2. Use 'uncompress' to extract files
3. Text files have Unix line endings
EOF

# Create tar archive for transfer
cd "$LEGACY_DIR"
tar --create -f "../legacy_transfer_$(date +%Y%m%d).tar" .

# Compress the tar archive
compress -f "../legacy_transfer_$(date +%Y%m%d).tar"

echo "Legacy transfer package created: legacy_transfer_$(date +%Y%m%d).tar.Z"
```

### Archive Maintenance
```bash
#!/bin/bash
# Maintain and verify compressed archives

ARCHIVE_DIR="/archives/compressed"
LOG_FILE="/var/log/archive_maintenance.log"
REPORT_FILE="/tmp/archive_report_$(date +%Y%m%d).txt"

echo "Archive Maintenance Report" > "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Function to verify compressed file
verify_archive() {
    local archive="$1"

    echo "Verifying: $(basename "$archive")" >> "$REPORT_FILE"

    # Test file integrity
    if compress -d -t "$archive" 2>/dev/null; then
        echo "Status: OK" >> "$REPORT_FILE"

        # Get file size
        size=$(du -h "$archive" | cut -f1)
        echo "Size: $size" >> "$REPORT_FILE"

        # Estimate original size
        original_size=$(compress -d -c "$archive" | wc -c)
        compression_ratio=$(echo "scale=2; $original_size / $(stat -c%s "$archive")" | bc)
        echo "Compression ratio: ${compression_ratio}:1" >> "$REPORT_FILE"

        return 0
    else
        echo "Status: CORRUPTED" >> "$REPORT_FILE"
        echo "$(date): Corrupted archive found: $archive" >> "$LOG_FILE"
        return 1
    fi
}

# Verify all archives
echo "=== Archive Verification ===" >> "$REPORT_FILE"
corrupted_count=0
total_count=0

for archive in "$ARCHIVE_DIR"/*.Z; do
    if [ -f "$archive" ]; then
        total_count=$((total_count + 1))
        verify_archive "$archive" || corrupted_count=$((corrupted_count + 1))
        echo "" >> "$REPORT_FILE"
    fi
done

# Summary
echo "=== Summary ===" >> "$REPORT_FILE"
echo "Total archives: $total_count" >> "$REPORT_FILE"
echo "Corrupted archives: $corrupted_count" >> "$REPORT_FILE"
echo "Integrity rate: $(( (total_count - corrupted_count) * 100 / total_count ))%" >> "$REPORT_FILE"

# Send report if corrupted archives found
if [ $corrupted_count -gt 0 ]; then
    mail -s "Archive Alert: $corrupted_count corrupted archives" admin@company.com < "$REPORT_FILE"
fi

echo "Archive maintenance completed"
```

### Batch Processing Utility
```bash
#!/bin/bash
# Batch compress files with progress tracking

SOURCE_DIR="$1"
DEST_DIR="$2"
MAX_PROCESSES=4

if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>"
    exit 1
fi

mkdir -p "$DEST_DIR"

echo "Starting batch compression from $SOURCE_DIR to $DEST_DIR"

# Function to compress single file
compress_file() {
    local source="$1"
    local dest="$2"
    local basename=$(basename "$source")

    if [ -f "$source" ]; then
        echo "Compressing: $basename"

        if compress -c "$source" > "$dest/$basename.Z" 2>/dev/null; then
            # Verify compressed file
            if compress -d -t "$dest/$basename.Z" 2>/dev/null; then
                echo "✓ $basename compressed successfully"
                return 0
            else
                echo "✗ $basename compression verification failed"
                rm -f "$dest/$basename.Z"
                return 1
            fi
        else
            echo "✗ $basename compression failed"
            return 1
        fi
    fi
    return 1
}

# Process files in parallel with job control
processed=0
failed=0
total=$(find "$SOURCE_DIR" -type f | wc -l)

echo "Found $total files to compress"

for source_file in $(find "$SOURCE_DIR" -type f); do
    # Wait for available slot
    while [ $(jobs -r | wc -l) -ge $MAX_PROCESSES ]; do
        sleep 1
    done

    # Start compression in background
    compress_file "$source_file" "$DEST_DIR" &
    processed=$((processed + 1))

    # Progress indicator
    if [ $((processed % 10)) -eq 0 ]; then
        echo "Progress: $processed/$total files processed"
    fi
done

# Wait for all background jobs to complete
wait

# Count successful and failed compressions
successful=$(ls -1 "$DEST_DIR"/*.Z 2>/dev/null | wc -l)
failed=$((total - successful))

echo ""
echo "Batch Compression Results:"
echo "Total files: $total"
echo "Successfully compressed: $successful"
echo "Failed: $failed"
echo "Output directory: $DEST_DIR"
```

## Compression Analysis

### Compression Ratio Testing
```bash
#!/bin/bash
# Test compression ratios for different file types

TEST_DIR="/tmp/compression_test"
RESULTS_FILE="/tmp/compression_analysis_$(date +%Y%m%d).txt"

mkdir -p "$TEST_DIR"

echo "Compression Analysis Report" > "$RESULTS_FILE"
echo "Generated: $(date)" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

# Create test files
echo "Creating test files..."

# Text file
cat > "$TEST_DIR/text_sample.txt" << 'EOF'
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
EOF

# Create larger repetitive text for better compression
for i in {1..100}; do
    cat "$TEST_DIR/text_sample.txt" >> "$TEST_DIR/large_text.txt"
done

# Binary file with some patterns
dd if=/dev/urandom of="$TEST_DIR/random_binary.bin" bs=1024 count=100 2>/dev/null

# Create file with repeated pattern
printf 'A%.0s' {1..10000} > "$TEST_DIR/repeated_pattern.txt"

# Function to test compression
test_compression() {
    local file="$1"
    local name=$(basename "$file")

    echo "Testing: $name" >> "$RESULTS_FILE"

    original_size=$(stat -c%s "$file")

    # Compress with different bit sizes
    for bits in 9 12 16; do
        compress -b "$bits" -c "$file" > "$TEST_DIR/temp_$bits.Z"
        compressed_size=$(stat -c%s "$TEST_DIR/temp_$bits.Z")
        ratio=$(echo "scale=2; $original_size / $compressed_size" | bc)

        echo "  Bits $bits: ${compressed_size} bytes (${ratio}:1)" >> "$RESULTS_FILE"
        rm "$TEST_DIR/temp_$bits.Z"
    done

    echo "" >> "$RESULTS_FILE"
}

# Test each file type
echo "=== File Type Analysis ===" >> "$RESULTS_FILE"
for file in "$TEST_DIR"/*; do
    test_compression "$file"
done

echo "Compression analysis completed. Results saved to: $RESULTS_FILE"

# Cleanup
rm -rf "$TEST_DIR"
```

## Related Commands

- [`uncompress`](/docs/commands/compression/uncompress) - Decompress .Z files (symbolic link to compress)
- [`gzip`](/docs/commands/compression/gzip) - Compress using Lempel-Ziv coding (LZ77)
- [`bzip2`](/docs/commands/compression/bzip2) - Block-sorting file compressor
- [`xz`](/docs/commands/compression/xz) - XZ format compression utility
- [`tar`](/docs/commands/backup-recovery/tar) - Tape archiver (often used with compress)
- [`file`](/docs/commands/system-info/file) - Determine file type

## Best Practices

1. **Use modern alternatives when possible** - gzip and bzip2 offer better compression
2. **Use compress for compatibility** - Essential for legacy Unix systems
3. **Verify compressed files** - Test with `-d -t` option
4. **Monitor compression ratios** - Higher bit values (up to 16) provide better compression
5. **Use `-f` with caution** - Force option overwrites existing files
6. **Consider disk space** - Compressed files still require space during compression
7. **Test decompression** - Ensure you can uncompress files before deleting originals
8. **Use appropriate naming** - Standard `.Z` extension for compress files
9. **Document compression methods** - Important for long-term data preservation
10. **Batch process efficiently** - Use shell scripting for multiple files

The `compress` command, while largely replaced by more efficient modern alternatives, remains an important tool for maintaining compatibility with legacy systems and specific archival requirements. Understanding its operation and limitations helps ensure smooth data exchange between older and newer computing environments.