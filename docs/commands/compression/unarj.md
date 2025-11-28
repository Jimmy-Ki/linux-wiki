---
title: unarj - Extract files from ARJ archives
sidebar_label: unarj
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# unarj - Extract files from ARJ archives

The `unarj` command is a utility for extracting files from ARJ (Archive Robert Jung) archives. ARJ is a file archiver and compression tool that was popular in the early 1990s, known for its high compression ratios and archive management features. The `unarj` utility provides read-only access to ARJ archives, allowing users to extract files, list archive contents, and test archive integrity. While ARJ archives are less common today, they are still encountered in legacy systems and old software distributions.

## Basic Syntax

```bash
unarj [OPTIONS] ARCHIVE_FILE [EXTRACT_TO_DIRECTORY]
```

## Common Commands

- `unarj e` - Extract files from archive (without path information)
- `unarj x` - Extract files with full path structure
- `unarj l` - List contents of archive
- `unarj t` - Test archive integrity
- `unarj v` - Verbose list of archive contents

## Common Options

### Extraction Options
- `-e` - Extract files without paths (extract to current directory)
- `-x` - Extract files with full paths (preserve directory structure)
- `-a` - Extract files with original timestamps
- `-b` - Extract without query (overwrite existing files)
- `-c` - Extract without CRC verification
- `-f` - Freshen existing files only
- `-g` - Garbage collection (remove temporary files)

### Display Options
- `-l` - List archive contents (brief format)
- `-v` - List archive contents (verbose format)
- `-t` - Test archive integrity

### File Selection
- `-d` - Extract files to specified directory
- `-p` - Extract files with password (if archive is encrypted)
- `-n` - Extract only newer files
- `-o` - Extract only older files

### Output Control
- `-i` - Ignore file attributes
- `-j` - Join continued volumes
- `-m` - More information (detailed output)
- `-q` - Quiet mode (minimal output)

## Usage Examples

### Basic Archive Operations

#### Simple Extraction
```bash
# Extract archive to current directory
unarj e archive.arj

# Extract archive preserving directory structure
unarj x archive.arj

# Extract to specific directory
unarj x archive.arj /target/directory/

# Extract with full paths to current directory
unarj x archive.arj .
```

#### Archive Information
```bash
# List archive contents
unarj l archive.arj

# Verbose list with details
unarj v archive.arj

# Test archive integrity
unarj t archive.arj

# Quick check without detailed output
unarj -q t archive.arj
```

### Advanced Extraction Options

#### Selective Extraction
```bash
# Extract only newer files than those on disk
unarj -n archive.arj

# Extract without overwriting existing files
unarj -f archive.arj

# Extract ignoring file attributes
unarj -i archive.arj

# Extract without CRC verification (faster but less safe)
unarj -c archive.arj
```

#### Password-Protected Archives
```bash
# Extract password-protected archive
unarj -p"password" secure.arj

# Extract encrypted file
unarj -x -p"mypass" encrypted.arj

# Test encrypted archive
unarj -t -p"password" secure.arj
```

#### Volume Archives
```bash
# Extract multi-volume archive (archive.arj, archive.a01, archive.a02...)
unarj -j archive.arj

# Extract continued volumes
unarj -jv archive.arj

# Test multi-volume archive
unarj -jt archive.arj
```

## Practical Examples

### System Administration

#### Legacy Software Installation
```bash
# Extract old software package
unarj x legacy_app.arj /opt/legacy_app/

# Extract with original timestamps
unarj -a x system_files.arj /etc/

# Test archive before extraction
unarj t critical_system.arj && unarj x critical_system.arj

# Extract drivers for old hardware
unarj -b x drivers.arj /lib/modules/
```

#### Data Recovery
```bash
# Extract old backup archives
unarj x backup_1995.arj /recovery/data/

# Test multiple archives for integrity
for archive in *.arj; do
    echo "Testing $archive..."
    unarj t "$archive"
done

# Extract with error handling
unarj -c x corrupted_backup.arj /recovery/partial/
```

### File Conversion and Migration

#### Archive Conversion
```bash
# Extract ARJ and repack with modern format
unarj x old_archive.arj /tmp/extract/
cd /tmp/extract/
tar -czf new_archive.tar.gz *

# Batch extract and convert
for arj_file in *.arj; do
    mkdir "${arj_file%.arj}"
    unarj x "$arj_file" "${arj_file%.arj}/"
done

# Extract and preserve permissions
unarj -a x important_files.arj /destination/
```

#### Data Migration
```bash
# Extract old data for migration
unarj x user_data_1990.arj /migration/old_data/

# Extract configuration files
unarj x config_backup.arj /etc/legacy/

# Batch extract for system upgrade
unarj -b x all_configs.arj /tmp/config_backup/
```

### Development and Testing

#### Software Compatibility Testing
```bash
# Extract test data for legacy application
unarj x test_data.arj /test/suite/

# Extract reference files
unarj -a x reference_files.arj /test/reference/

# Extract and create test environment
mkdir test_env
unarj x test_archive.arj test_env/
```

#### Archive Analysis
```bash
# Analyze archive structure
unarj -v archive.arj > archive_structure.txt

# Check archive properties
unarj -l archive.arj | wc -l  # Count files

# Verify archive before processing
if unarj -q t important.arj; then
    echo "Archive is valid"
else
    echo "Archive may be corrupted"
fi
```

## Advanced Usage

### Batch Processing

#### Multiple Archive Operations
```bash
# Extract all ARJ archives in directory
for file in *.arj; do
    echo "Extracting $file..."
    unarj x "$file"
done

# Test all archives
find . -name "*.arj" -exec unarj t {} \;

# Extract to corresponding directories
for arj in *.arj; do
    dir="${arj%.arj}"
    mkdir -p "$dir"
    unarj x "$arj" "$dir/"
done
```

#### Automated Archive Processing
```bash
#!/bin/bash
# Archive processing script

EXTRACT_DIR="/tmp/arj_extract"
FAILED_LOG="failed_extracts.log"

mkdir -p "$EXTRACT_DIR"

for archive in "$@"; do
    echo "Processing: $archive"

    # Test archive first
    if unarj -q t "$archive"; then
        # Create extraction directory
        extract_path="$EXTRACT_DIR/$(basename "$archive" .arj)"
        mkdir -p "$extract_path"

        # Extract with full paths
        if unarj x "$archive" "$extract_path/"; then
            echo "✓ Successfully extracted: $archive"
        else
            echo "✗ Extraction failed: $archive" | tee -a "$FAILED_LOG"
        fi
    else
        echo "✗ Archive test failed: $archive" | tee -a "$FAILED_LOG"
    fi
done
```

### Archive Integrity and Recovery

#### Comprehensive Testing
```bash
# Test archive with detailed output
unarj -v -t archive.arj

# Test encrypted archive
unarj -t -p"password" secure.arj

# Batch test with reporting
echo "ARJ Archive Integrity Report" > integrity_report.txt
echo "=============================" >> integrity_report.txt
date >> integrity_report.txt

for archive in *.arj; do
    echo "Testing $archive..." | tee -a integrity_report.txt
    if unarj -q t "$archive"; then
        echo "$archive: OK" >> integrity_report.txt
    else
        echo "$archive: FAILED" >> integrity_report.txt
    fi
done
```

#### Recovery Operations
```bash
# Attempt recovery from corrupted archive
unarj -c x corrupted.arj /recovery/

# Extract ignoring errors
unarj -b -c x damaged.arj /partial_recovery/

# Create recovery report
unarj -v t problem_archive.arj > recovery_report.txt
```

### Integration with Other Tools

#### Pipeline Operations
```bash
# List archive and grep for specific files
unarj -l archive.arj | grep "\.txt$"

# Count files in archive
unarj -l archive.arj | wc -l

# Extract and process files
unarj e archive.arj && for file in *.txt; do
    echo "Processing $file..."
done

# Find specific file types in archives
find . -name "*.arj" -exec sh -c 'unarj -l "$1" | grep -q "\.pdf$" && echo "PDF in: $1"' _ {} \;
```

#### System Integration
```bash
# Create function for shell integration
unarj_extract() {
    local archive="$1"
    local dest="${2:-$(basename "$archive" .arj)}"

    if [[ -f "$archive" ]]; then
        mkdir -p "$dest"
        unarj x "$archive" "$dest/"
        echo "Extracted to: $dest"
    else
        echo "Archive not found: $archive"
    fi
}

# Install as shell command (add to .bashrc)
# unarj_extract() { ... }
```

## Troubleshooting

### Common Issues

#### Archive Access Errors
```bash
# Permission denied
# Solution: Check file permissions
ls -l archive.arj
chmod 644 archive.arj

# File not found
# Solution: Verify file exists and path is correct
ls *.arj
find . -name "*.arj"

# Archive corrupted
# Solution: Test archive integrity
unarj -v t archive.arj

# Try recovery extraction
unarj -c x corrupted.arj
```

#### Extraction Problems
```bash
# Disk space issues
# Solution: Check available space
df -h .
unarj t archive.arj | tail -1  # Check uncompressed size

# File already exists
# Solution: Use freshen option or backup
unarj -f x archive.arj  # Only newer files
unarj -b x archive.arj  # Overwrite without query

# Path too long
# Solution: Extract to different directory
unarj x archive.arj /short/path/
```

#### Password Issues
```bash
# Wrong password
# Solution: Try different passwords or check documentation
unarj -p"try1" secure.arj
unarj -p"try2" secure.arj

# Password prompt not working
# Solution: Use command line password
unarj -p"password" x archive.arj
```

#### Volume Issues
```bash
# Missing volume files
# Solution: Check for all volume parts
ls archive.*

# Join volume command not working
# Solution: Ensure all volumes are present
unarj -j archive.arj

# Volume order incorrect
# Solution: Rename volumes in correct order
mv archive.a02 archive.a01
mv archive.a03 archive.a02
```

### Performance Issues

#### Slow Extraction
```bash
# Use quiet mode for faster processing
unarj -q x archive.arj

# Disable CRC verification for speed
unarj -c x archive.arj

# Extract without preserving attributes
unarj -i x archive.arj
```

#### Large Archives
```bash
# Extract in batches
unarj -l archive.arj | head -100 > file_list.txt
# Extract first 100 files manually

# Monitor extraction progress
unarj -v x archive.arj | tee extraction.log

# Check extraction status periodically
watch "ls -la extracted_files/"
```

## Related Commands

- [`arj`](/docs/commands/compression/arj) - Create and manage ARJ archives
- [`unarj`](/docs/commands/compression/unarj) - Extract ARJ archives (this command)
- [`7z`](/docs/commands/compression/7z) - 7-Zip archiver (supports ARJ format)
- [`zip`](/docs/commands/compression/zip) - ZIP archive utility
- [`unzip`](/docs/commands/compression/unzip) - Extract ZIP archives
- [`tar`](/docs/commands/compression/tar) - Tape archiver
- [`gzip`](/docs/commands/compression/gzip) - GZIP compression
- [`bzip2`](/docs/commands/compression/bzip2) - BZIP2 compression

## Best Practices

1. **Test archives before extraction** with `unarj t` to ensure integrity
2. **Use appropriate extraction mode**: `-e` for flat extraction, `-x` for preserving paths
3. **Verify extraction** by comparing file counts and sizes
4. **Handle encrypted archives** carefully with proper password management
5. **Process multi-volume archives** with the `-j` option
6. **Use quiet mode** (`-q`) for batch operations to reduce noise
7. **Create extraction directories** before extracting to avoid clutter
8. **Backup original archives** before attempting recovery operations
9. **Monitor disk space** when extracting large archives
10. **Document extraction processes** for reproducible operations

## Performance Tips

1. **Use `-c` flag** to skip CRC verification for faster extraction (when integrity is not critical)
2. **Enable `-q` mode** for batch processing to reduce I/O overhead
3. **Extract to fast storage** (SSD) when possible for better performance
4. **Process multiple archives** in parallel for multi-core systems
5. **Use `-b` flag** to avoid overwrite prompts during automated extraction
6. **Test archives first** with `-t` to avoid failed extraction attempts
7. **Monitor system resources** during large extraction operations
8. **Consider file system fragmentation** when extracting many small files

## Migration and Modern Alternatives

### When to Use unarj

- **Legacy System Support**: Extracting old software packages and data
- **Data Recovery**: Recovering information from old backup systems
- **Compliance Requirements**: Working with archived data in ARJ format
- **System Migration**: Moving data from legacy systems to modern platforms

### Modern Alternatives

For new archives, consider using modern formats:

- **7z**: Better compression ratios and more features
- **tar.gz**: Good balance of compression and compatibility
- **zip**: Universal compatibility
- **xz**: Excellent compression for text files

### Migration Strategy

```bash
# Convert ARJ archives to modern format
convert_arj_to_7z() {
    local arj_file="$1"
    local sevenz_file="${arj_file%.arj}.7z"
    local temp_dir="/tmp/arj_convert_$$"

    mkdir -p "$temp_dir"
    unarj x "$arj_file" "$temp_dir/"
    7z a "$sevenz_file" "$temp_dir/*"
    rm -rf "$temp_dir"

    echo "Converted: $arj_file -> $sevenz_file"
}

# Batch convert all ARJ files
for arj_file in *.arj; do
    convert_arj_to_7z "$arj_file"
done
```

The `unarj` command remains an essential utility for working with legacy ARJ archives. While the format is largely superseded by modern compression standards, `unarj` provides reliable access to historical data and supports system administrators in data migration and recovery tasks. Its simple interface and robust extraction capabilities make it the go-to tool when dealing with ARJ archives in Linux environments.