---
title: cmp - Compare two files byte by byte
sidebar_label: cmp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cmp - Compare two files byte by byte

The `cmp` command is a powerful file comparison utility that compares two files byte by byte and reports the first difference found. Unlike `diff` which shows line-by-line differences, `cmp` performs a binary comparison and is ideal for verifying file integrity, checking if files are identical, comparing binary files, and finding the exact location of differences. It's particularly useful for system administrators, developers, and anyone working with file verification or data integrity tasks. The command provides precise byte-level analysis, making it essential for backup verification, data integrity checks, forensic analysis, and quality assurance processes where exact matches are critical.

## Basic Syntax

```bash
cmp [OPTIONS] file1 file2 [skip1 [skip2]]
```

## Common Options

### Comparison Modes
- `-l, --verbose` - Show byte number and differing bytes for all differences
- `-s, --silent, --quiet` - Silent mode, only return exit status
- `-x` - Like -l but shows values in hexadecimal with zero-based indexing

### Output Control
- `-b, --print-bytes` - Show differing bytes in both octal and ASCII
- `-n NUM, --bytes=NUM` - Compare only specified number of bytes
- `-z` - Compare file sizes first, fail if sizes differ

### Comparison Control
- `-i NUM1[:NUM2], --ignore-initial=NUM1[:NUM2]` - Skip specified bytes from files
- `-h` - Do not follow symbolic links

## Exit Status

- `0` - Files are identical
- `1` - Files differ (including EOF differences)
- `>1` - An error occurred

## Usage Examples

### Basic File Comparison

#### Simple Comparisons
```bash
# Compare two files
cmp file1.txt file2.txt

# Silent comparison (useful in scripts)
cmp -s file1.txt file2.txt && echo "Files are identical" || echo "Files differ"

# Compare files and check exit status
if cmp file1.txt file2.txt; then
    echo "Files are identical"
else
    echo "Files are different"
fi
```

#### Verbose Output
```bash
# Show all differences with byte positions
cmp -l file1.txt file2.txt

# Show differences in hexadecimal
cmp -x file1.txt file2.txt

# Show differences with ASCII characters
cmp -lb file1.txt file2.txt
```

### Partial File Comparison

#### Limiting Comparison Length
```bash
# Compare only first 100 bytes
cmp -n 100 file1.bin file2.bin

# Compare first 1KB
cmp -n 1024 data1.dat data2.dat

# Compare specific byte ranges
cmp -n 500 file1.txt file2.txt
```

#### Skipping Bytes
```bash
# Skip first 50 bytes from both files
cmp -i 50 file1.bin file2.bin

# Skip different amounts from each file
cmp -i 100:200 file1.bin file2.bin

# Skip bytes using traditional syntax
cmp file1.bin file2.bin 100 200

# Skip first 1KB from file1 and 512 bytes from file2
cmp -i 1024:512 data1.dat data2.dat
```

### Advanced Comparison Techniques

#### Binary File Analysis
```bash
# Compare binary executables
cmp -l program1 program2

# Compare with file size check first
cmp -z binary1.bin binary2.bin

# Compare large files with byte limit
cmp -n 1000000 large_file1.bin large_file2.bin
```

#### Data Verification
```bash
# Verify downloaded file integrity
cmp -s downloaded.iso original.iso && echo "Download successful" || echo "Download corrupted"

# Compare backup with original
cmp -s backup.tar original.tar && echo "Backup verified" || echo "Backup failed"

# Verify copied data
cp source.bin destination.bin && cmp -s source.bin destination.bin
```

## Practical Examples

### System Administration

#### File Backup Verification
```bash
# Verify backup integrity
backup_file="/backup/data_$(date +%Y%m%d).tar.gz"
original_file="/data/data.tar.gz"

if cmp -s "$backup_file" "$original_file"; then
    echo "Backup verification successful: $backup_file"
else
    echo "Backup verification failed!"
    exit 1
fi

# Automated backup verification script
for backup in /backups/*.tar.gz; do
    original="/data/$(basename "$backup")"
    if [ -f "$original" ]; then
        cmp -s "$backup" "$original" && echo "$backup: OK" || echo "$backup: FAILED"
    fi
done
```

#### Configuration File Management
```bash
# Compare configuration before changes
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
# Make changes...
cmp -s /etc/ssh/sshd_config /etc/ssh/sshd_config.backup && echo "No changes made" || echo "Configuration modified"

# Validate configuration deployment
cmp -s deployed_config.conf template.conf && echo "Configuration deployed correctly" || echo "Configuration mismatch"
```

#### Log File Analysis
```bash
# Compare log files for differences
cmp -s access.log yesterday_access.log && echo "No new activity" || echo "Log files differ"

# Find where log files start to differ
cmp -l current.log previous.log | head -5

# Compare rotated log files
for i in {1..7}; do
    log="app.log.$i.gz"
    [ -f "$log" ] && cmp -s "$log" "backup_$log" && echo "$log: OK" || echo "$log: Different"
done
```

### Development Workflow

#### Source Code Verification
```bash
# Compare compiled versions
cmp -l program_v1 program_v2 | head -10

# Verify source code compilation
gcc program.c -o program_new
gcc program.c -o program_old
cmp -s program_new program_old && echo "Reproducible build" || echo "Build non-deterministic"

# Compare object files
cmp -l module1.o module2.o
```

#### Data Processing Validation
```bash
# Verify data processing pipeline
cmp -s input_processed.txt input_original.txt && echo "Data preserved" || echo "Data modified"

# Compare CSV files before/after processing
cmp -l data_original.csv data_processed.csv | head -20

# Validate data conversion
convert_file original.txt converted.json
# Compare content after conversion (assuming back-conversion)
back_convert converted.json back.txt
cmp -s original.txt back.txt && echo "Conversion lossless" || echo "Conversion lossy"
```

#### Testing and Quality Assurance
```bash
# Compare expected vs actual output
cmp -s expected_output.txt actual_output.txt && echo "Test passed" || echo "Test failed"

# Unit test for file processing
process_data input.txt output.txt
cmp -s expected.txt output.txt && echo "Processing correct" || echo "Processing error"

# Regression testing
cmp -s baseline_results.txt current_results.txt
if [ $? -eq 0 ]; then
    echo "No regressions detected"
else
    echo "Regressions found - investigate differences"
    cmp -l baseline_results.txt current_results.txt | head -10
fi
```

### Data Integrity and Security

#### File Integrity Monitoring
```bash
# Monitor sensitive files for changes
checksum_db="/var/lib/file_integrity.db"

check_file_integrity() {
    local file="$1"
    local checksum=$(sha256sum "$file")
    if grep -q "$file" "$checksum_db"; then
        old_checksum=$(grep "$file" "$checksum_db")
        if [ "$checksum" != "$old_checksum" ]; then
            echo "WARNING: $file has been modified!"
            return 1
        fi
    else
        echo "$checksum" >> "$checksum_db"
    fi
    return 0
}

# Compare critical system files
check_file_integrity /etc/passwd
check_file_integrity /etc/shadow
check_file_integrity /etc/hosts
```

#### Forensic Analysis
```bash
# Compare disk images
cmp -l disk_image1.dd disk_image2.dd | head -50

# Find differences in memory dumps
cmp -lb memory_dump1.bin memory_dump2.bin > diff_analysis.txt

# Analyze modified sectors
cmp -n 512 -i 2048 sector1.bin sector2.bin
```

### File System Operations

#### File Transfer Verification
```bash
# Verify file copy integrity
cp large_file.dat /backup/
cmp -s large_file.dat /backup/large_file.dat && echo "Copy verified" || echo "Copy failed"

# Verify network transfer
scp user@server:/remote/file.txt .
cmp -s file.txt /remote/file.txt && echo "Transfer successful" || echo "Transfer corrupted"

# Batch verification
for file in *.tar.gz; do
    scp "$file" backup:/backup/
    ssh backup "cmp -s /backup/$file $file && echo $file: OK || echo $file: FAILED"
done
```

#### Synchronization Validation
```bash
# Verify directory synchronization
find dir1 -type f -exec cmp -s {} dir2/{} \; -print

# Check if directories are identical
diff -q dir1 dir2 || echo "Directories differ"

# Detailed comparison with file reporting
find source -type f -exec sh -c '
    file="$1"
    base=$(basename "$file")
    if [ -f "target/$base" ]; then
        if ! cmp -s "$file" "target/$base"; then
            echo "Different: $base"
        fi
    else
        echo "Missing: $base"
    fi
' sh {} \;
```

## Advanced Usage

### Performance Optimization

#### Large File Comparison
```bash
# Compare large files efficiently with byte limits
cmp -n 1000000 large_file1.bin large_file2.bin

# Compare in chunks for very large files
compare_large_files() {
    local file1="$1" file2="$2" chunk_size=1048576  # 1MB
    local offset=0

    while true; do
        if ! cmp -n "$chunk_size" -i "$offset:$offset" "$file1" "$file2" >/dev/null 2>&1; then
            echo "Files differ at offset: $offset"
            cmp -l -n "$chunk_size" -i "$offset:$offset" "$file1" "$file2" | head -5
            return 1
        fi

        offset=$((offset + chunk_size))
        # Check if we've reached end of files
        if [ "$offset" -gt "$(stat -f%z "$file1" 2>/dev/null || stat -c%s "$file1" 2>/dev/null)" ]; then
            break
        fi
    done
    echo "Files are identical"
}
```

#### Parallel Comparison
```bash
# Compare multiple file pairs in parallel
compare_files_parallel() {
    local file1="$1" file2="$2"
    cmp -s "$file1" "$file2" && echo "IDENTICAL: $file1" || echo "DIFFERENT: $file1"
}

export -f compare_files_parallel
find dir1 -type f -exec bash -c 'compare_files_parallel "$1" "dir2/${1#dir1/}"' bash {} \; &
```

### Integration and Automation

#### Backup Script with Verification
```bash
#!/bin/bash
# Automated backup with integrity verification

SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/backup.log"

backup_and_verify() {
    local source="$1" backup="$2"

    # Create backup
    if cp -r "$source" "$backup"; then
        log "Created backup: $backup"

        # Verify backup
        if cmp -s "$source" "$backup"; then
            log "Backup verified: $backup"
            return 0
        else
            log "Backup verification FAILED: $backup"
            return 1
        fi
    else
        log "Backup creation failed: $backup"
        return 1
    fi
}

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Perform backup
backup_and_verify "$SOURCE_DIR" "$BACKUP_DIR/documents_$DATE"
```

#### Continuous Integration Script
```bash
#!/bin/bash
# CI pipeline step for file comparison

compare_artifacts() {
    local expected="$1" actual="$2" tolerance="$3"

    if [ -f "$expected" ] && [ -f "$actual" ]; then
        if cmp -s "$expected" "$actual"; then
            echo "✓ Files identical: $(basename "$expected")"
            return 0
        else
            echo "✗ Files differ: $(basename "$expected")"
            if [ -n "$tolerance" ]; then
                echo "Showing first $tolerance differences:"
                cmp -l "$expected" "$actual" | head -"$tolerance"
            fi
            return 1
        fi
    else
        echo "✗ Missing files: expected=$expected, actual=$actual"
        return 1
    fi
}

# Compare build artifacts
compare_artifacts "expected_output.bin" "build_output.bin" 10
```

## Troubleshooting

### Common Issues

#### Memory Issues with Large Files
```bash
# Problem: System runs out of memory comparing very large files
# Solution: Use byte limits and chunk comparison

# Compare first 10MB only
cmp -n 10485760 huge_file1.bin huge_file2.bin

# Compare specific sections
cmp -i 1048576:1048576 -n 1048576 huge_file1.bin huge_file2.bin
```

#### Symbolic Link Handling
```bash
# Problem: cmp follows symbolic links by default
# Solution: Use -h to compare link files themselves

# Compare symbolic links themselves
cmp -h link1 link2

# Regular comparison (follows links)
cmp link_target1 link_target2
```

#### Different File Sizes
```bash
# Problem: Files of different sizes cause many difference reports
# Solution: Use -z to check sizes first

# Quick size check before detailed comparison
cmp -z file1.bin file2.bin || echo "Files have different sizes"

# Compare only up to the size of the smaller file
size1=$(stat -f%z file1.bin 2>/dev/null || stat -c%s file1.bin)
size2=$(stat -f%z file2.bin 2>/dev/null || stat -c%s file2.bin)
min_size=$((size1 < size2 ? size1 : size2))
cmp -n "$min_size" file1.bin file2.bin
```

#### Binary vs Text File Confusion
```bash
# Problem: Binary output is hard to read
# Solution: Use appropriate display options

# Show bytes in readable format
cmp -lb binary1.bin binary2.bin

# Show in hexadecimal
cmp -x binary1.bin binary2.bin

# Limit output to first differences
cmp -l file1 file2 | head -20
```

### Performance Issues

#### Slow Comparison of Large Directories
```bash
# Problem: Comparing entire directories is slow
# Solution: Optimize with selective comparison

# Compare only important files
find dir1 dir2 -name "*.config" -exec cmp -s {} {} \;

# Use find with parallel processing
find dir1 -type f -print0 | xargs -0 -P 4 -I {} bash -c '
    file="{}"
    target="dir2/${file#dir1/}"
    if [ -f "$target" ]; then
        cmp -s "$file" "$target" && echo "OK: $file" || echo "DIFF: $file"
    fi
'
```

#### Network Storage Performance
```bash
# Problem: Comparing files on network storage is slow
# Solution: Copy locally for comparison or use limits

# Compare only first part for quick check
cmp -n 10000 network_file1 network_file2

# Copy to local temp directory first
cp /mnt/remote/file1.tmp /tmp/
cp /mnt/remote/file2.tmp /tmp/
cmp /tmp/file1.tmp /tmp/file2.tmp
rm /tmp/file1.tmp /tmp/file2.tmp
```

## Related Commands

- [`diff`](/docs/commands/file-management/diff) - Find line-by-line differences between files
- [`diff3`](/docs/commands/file-management/diff3) - Compare three files line by line
- [`comm`](/docs/commands/file-management/comm) - Compare sorted files line by line
- [`md5sum`](/docs/commands/file-management/md5sum) - Compute and check MD5 message digests
- [`sha256sum`](/docs/commands/file-management/sha256sum) - Compute SHA256 checksums
- [`cksum`](/docs/commands/file-management/cksum) - Compute CRC checksums and byte counts
- [`stat`](/docs/commands/file-management/stat) - Display file or file system status
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`hexdump`](/docs/commands/file-management/hexdump) - Display file contents in hexadecimal
- [`od`](/docs/commands/file-management/od) - Octal dump of files

## Best Practices

1. **Use silent mode (-s)** in scripts when you only need the exit status
2. **Check file sizes first** with -z for performance when comparing large files
3. **Limit comparison scope** with -n for large files to improve performance
4. **Use appropriate output format** (-l, -x, -b) based on your analysis needs
5. **Handle symbolic links carefully** with -h when comparing link files
6. **Use byte skipping** (-i) to compare specific regions of large files
7. **Combine with other tools** like `find` and `xargs` for batch operations
8. **Monitor system resources** when comparing very large files
9. **Use proper error handling** in scripts to handle different exit statuses
10. **Document comparison criteria** when using cmp for verification purposes

## Performance Tips

1. **File size checking with -z** is faster than full comparison
2. **Byte limits with -n** significantly improve performance for large files
3. **Partial comparison with -i** is useful when only specific sections matter
4. **Parallel processing** can speed up multiple file comparisons
5. **Memory-mapped comparisons** are handled automatically by the system
6. **Local copies** of network files can improve comparison speed
7. **Chunk-based comparison** is better for extremely large files
8. **Silent mode (-s)** reduces output overhead in automated scripts
9. **Exit status only** comparisons are fastest for identical/different checks
10. **Hardware acceleration** may be available for cryptographic comparisons

The `cmp` command is an essential tool for precise file comparison and verification tasks. Its ability to perform byte-level comparisons makes it invaluable for data integrity checking, backup verification, forensic analysis, and quality assurance processes where exact matches are critical.