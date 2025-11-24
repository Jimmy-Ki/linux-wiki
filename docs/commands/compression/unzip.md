---
title: unzip - Extract ZIP Archives
sidebar_label: unzip
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# unzip - Extract ZIP Archives

The `unzip` command extracts files from ZIP archives created with the `zip` command. It's a cross-platform utility that can handle various ZIP archive formats, including password-protected archives and those with specific character encodings. Unzip provides flexible options for file extraction, filtering, and output control.

## Basic Syntax

```bash
unzip [OPTIONS] ZIPFILE [FILES...] [-x EXCLUDE_FILES...] [-d EXTRACT_DIR]
```

## Common Options

### Extraction Control
- `-o, --overwrite` - Overwrite existing files without prompting
- `-n, --never-overwrite` - Never overwrite existing files
- `-f, --freshen` - Freshen existing files (extract only newer files)
- `-u, --update` - Update existing files and extract new ones

### Output and Display
- `-l, --list` - List archive contents without extracting
- `-v, --verbose` - Verbose extraction with detailed output
- `-q, --quiet` - Quiet operation (minimal output)
- `-c, --stdout` - Extract files to standard output
- `-p, --pipe` - Extract files to pipe (no conversion)

### Directory and Path Handling
- `-d DIR, --directory=DIR` - Extract to specified directory
- `-j, --junk-paths` - Junk directory paths (flatten extraction)
- `-X, --restore-owner` - Restore original UID/GID when possible

### File Selection and Filtering
- `x PATTERN` - Exclude files matching pattern
- `FILES` - Extract only specified files

### Character and Text Processing
- `-a, --text` - Convert text files to local line endings
- `-aa, --all-text` - Treat all files as text
- `-b, --binary` - Treat all files as binary (no conversion)
- `-L, --lowercase` - Convert filenames to lowercase

### Security and Passwords
- `-P PASSWORD, --password=PASSWORD` - Use specified password
- `-O CHARSET, --charset=CHARSET` - Specify character encoding

### Archive Information
- `-t, --test` - Test archive integrity
`-z, --archive-comment` - Display archive comment only
- `-Z, --zipinfo` - Run zipinfo mode

## Usage Examples

### Basic Extraction

#### Simple Extraction
```bash
# Extract all files to current directory
unzip archive.zip

# Extract to specific directory
unzip archive.zip -d /target/directory/

# Extract without overwriting existing files
unzip -n archive.zip

# Extract and overwrite existing files
unzip -o archive.zip

# Extract with verbose output
unzip -v archive.zip
```

#### File Selection
```bash
# Extract specific files
unzip archive.zip file1.txt file2.txt

# Extract files matching pattern
unzip archive.zip "*.txt"

# Extract all but certain files
unzip archive.zip -x "*.tmp" "*.log"

# Extract specific files to specific directory
unzip archive.zip important.doc -d /documents/
```

### Directory Handling

#### Path Management
```bash
# Extract without directory structure (flatten)
unzip -j archive.zip

# Extract preserving directory structure
unzip archive.zip

# Extract to absolute path
unzip archive.zip -d /absolute/path/to/extract/

# Extract with relative path preservation
unzip archive.zip -d ./relative/path/
```

#### Multiple Directory Operations
```bash
# Extract multiple archives to same directory
for zip in *.zip; do unzip "$zip" -d extracted/; done

# Extract and organize by archive name
for zip in *.zip; do
    mkdir -p "extracted/$(basename "$zip" .zip)"
    unzip "$zip" -d "extracted/$(basename "$zip" .zip)/"
done
```

### Password-Protected Archives

#### Password Handling
```bash
# Extract with password (prompt)
unzip -P mypassword secure.zip

# Extract with password from file
cat password.txt | xargs -I {} unzip -P {} secure.zip

# Extract password-protected files only
unzip -P secret archive.zip secret_files/

# Test password-protected archive
unzip -t -P mypassword secure.zip
```

### Archive Information

#### Listing Contents
```bash
# List archive contents
unzip -l archive.zip

# List with detailed information
unzip -v archive.zip

# List archive comment
unzip -z archive.zip

# Test archive integrity
unzip -t archive.zip

# List files matching pattern
unzip -l archive.zip "*.pdf"
```

#### File Information
```bash
# List compressed sizes
unzip -v archive.zip | awk '{print $1, $8, $9}'

# Check if specific file exists in archive
unzip -l archive.zip | grep "filename.txt"

# Show archive statistics
unzip -v archive.zip | tail -1
```

### Advanced Extraction

#### Character Encoding
```bash
# Extract with specific character encoding
unzip -O CP852 archive.zip

# Extract and convert UTF-8 filenames
unzip -O UTF-8 unicode_archive.zip

# Extract with local system encoding
unzip -O $(locale charmap) archive.zip

# Extract and convert filenames to lowercase
unzip -L archive.zip
```

#### Text and Binary Handling
```bash
# Extract with automatic text conversion
unzip -a archive.zip

# Extract treating all files as text
unzip -aa archive.zip

# Extract without text conversion (binary mode)
unzip -b archive.zip

# Extract specific files with text conversion
unzip -a archive.zip text_files/*.txt
```

## Practical Examples

### Software Installation

#### Extracting Software Packages
```bash
# Extract software package
unzip software_package.zip

# Extract to /opt directory
sudo unzip application.zip -d /opt/application/

# Extract and set permissions
unzip webapp.zip && chmod -R 755 webapp/

# Extract with ownership preservation
sudo unzip -X system_config.zip -d /etc/
```

#### Development Setup
```bash
# Extract project dependencies
unzip dependencies.zip -d lib/

# Extract and organize by type
unzip source_code.zip
mkdir -p src docs tests
mv *.c *.h src/ 2>/dev/null || true
mv *.md docs/ 2>/dev/null || true
mv *test* tests/ 2>/dev/null || true
```

### Data Recovery and Migration

#### System Migration
```bash
# Extract user data backup
unzip user_backup.zip -d /home/user/

# Extract configuration files
sudo unzip etc_backup.zip -d /etc/

# Extract with permission preservation
sudo unzip -X system_files.zip -d /

# Extract and verify integrity
unzip -t critical_data.zip && unzip critical_data.zip
```

#### Data Processing
```bash
# Extract CSV files for processing
unzip data_archive.zip "*.csv" -d csv_data/

# Extract logs for analysis
unzip log_archive.zip "*.log" -d logs/

# Extract and process immediately
unzip -p data.zip "dataset.json" | python process_data.py
```

### File Management

#### Batch Operations
```bash
# Extract all zip files in directory
for zip in *.zip; do
    echo "Extracting: $zip"
    unzip -q "$zip"
done

# Extract and organize by date
for zip in backup_*.zip; do
    date=$(echo "$zip" | grep -o '[0-9]\{8\}')
    mkdir -p "extracted_$date"
    unzip "$zip" -d "extracted_$date/"
done
```

#### Selective Extraction
```bash
# Extract only documents
unzip archive.zip -x "*.exe" "*.dll" "*.so"

# Extract only recent files
unzip -l archive.zip | grep "$(date +%Y-%m)" | awk '{print $NF}' | xargs unzip archive.zip

# Extract files based on size
unzip -l archive.zip | awk '$1 > 1000000 {print $NF}' | xargs unzip archive.zip
```

## Advanced Usage

### Pipeline Integration

#### Stream Processing
```bash
# Extract and process directly
unzip -p archive.zip data.csv | cut -d',' -f1,3 > processed_data.csv

# Extract and filter
unzip -p archive.zip logs.txt | grep "ERROR" > errors.log

# Extract to another archive
unzip -p archive.zip large_file.txt | gzip > large_file.txt.gz

# Extract and convert formats
unzip -p archive.zip document.docx | pandoc -f docx -t markdown - > document.md
```

#### Automated Processing
```bash
# Extract and archive with timestamp
extract_with_timestamp() {
    local archive="$1"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local extract_dir="extracted_${timestamp}"

    mkdir -p "$extract_dir"
    unzip "$archive" -d "$extract_dir"
    echo "Extracted to: $extract_dir"
}

# Use function
extract_with_timestamp backup.zip
```

### Error Handling

#### Robust Extraction
```bash
# Extract with error checking
if unzip -t archive.zip; then
    unzip archive.zip
    echo "Extraction successful"
else
    echo "Archive is corrupted"
    exit 1
fi

# Extract with retry logic
max_retries=3
retry_count=0
until unzip archive.zip || [ $retry_count -eq $max_retries ]; do
    ((retry_count++))
    echo "Retry $retry_count..."
    sleep 1
done
```

#### Validation and Verification
```bash
# Extract and verify file count
expected_files=10
actual_files=$(unzip -l archive.zip | tail -1 | awk '{print $2}')
if [ "$actual_files" -eq "$expected_files" ]; then
    unzip archive.zip
else
    echo "Warning: Expected $expected_files files, found $actual_files"
fi
```

### Performance Optimization

#### Large Archives
```bash
# Extract with progress monitoring
unzip large_archive.zip | pv -l > /dev/null

# Extract to specific filesystem for better I/O
unzip huge_archive.zip -d /fast/storage/

# Extract and compress immediately
unzip archive.zip && tar -czf archive.tar.gz extracted_files/
```

#### Memory Management
```bash
# Extract with low memory usage (if available)
unzip -l archive.zip > /dev/null  # List without loading all into memory

# Extract in chunks for very large archives
find . -name "*.zip" -exec unzip {} \; -delete
```

## Troubleshooting

### Common Issues

#### Password Problems
```bash
# Try common passwords
for password in "123456" "password" "admin"; do
    if unzip -P "$password" archive.zip > /dev/null 2>&1; then
        echo "Password found: $password"
        break
    fi
done

# Extract with password prompt
unzip archive.zip
```

#### Character Encoding Issues
```bash
# Try different encodings
for encoding in CP850 CP852 UTF-8 ISO-8859-1; do
    echo "Trying encoding: $encoding"
    unzip -O "$encoding" archive.zip -d "test_$encoding"
done
```

#### Space and Permissions
```bash
# Check available space before extraction
required_size=$(unzip -l archive.zip | tail -1 | awk '{print $3}')
available_space=$(df . | awk 'NR==2 {print $4}')
if [ "$available_size" -lt "$required_size" ]; then
    echo "Insufficient disk space"
    exit 1
fi

# Extract with different permissions if needed
sudo unzip archive.zip -d /restricted/directory/
```

## Integration Examples

### Shell Script Functions

#### Smart Extraction Function
```bash
smart_extract() {
    local archive="$1"
    local target_dir="${2:-extracted}"

    # Check if file exists
    if [ ! -f "$archive" ]; then
        echo "Archive not found: $archive"
        return 1
    fi

    # Test archive integrity
    if ! unzip -t "$archive" > /dev/null 2>&1; then
        echo "Archive is corrupted: $archive"
        return 1
    fi

    # Create target directory
    mkdir -p "$target_dir"

    # Extract
    echo "Extracting $archive to $target_dir"
    unzip -q "$archive" -d "$target_dir"

    echo "Extraction completed successfully"
}
```

#### Batch Processing Script
```bash
#!/bin/bash
# Process multiple archives

extract_all() {
    local source_dir="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    find "$source_dir" -name "*.zip" | while read -r archive; do
        local basename=$(basename "$archive" .zip)
        local target_dir="$output_dir/$basename"

        echo "Processing: $archive"
        if unzip -q "$archive" -d "$target_dir"; then
            echo "✓ Extracted: $basename"
        else
            echo "✗ Failed: $basename"
        fi
    done
}

extract_all /path/to/zips /path/to/extracted
```

## Related Commands

- [`zip`](/docs/commands/compression/zip) - Create ZIP archives
- [`zipinfo`](/docs/commands/compression/zipinfo) - Display ZIP file information
- [`zipsplit`](/docs/commands/compression/zipsplit) - Split ZIP files
- [`tar`](/docs/commands/compression/tar) - Extract tar archives
- [`7z`](/docs/commands/compression/7z) - 7-Zip archiver
- [`unrar`](/docs/commands/compression/unrar) - Extract RAR archives
- [`gzip`](/docs/commands/compression/gzip) - Extract gzip files
- [`bzip2`](/docs/commands/compression/bzip2) - Extract bzip2 files

## Best Practices

1. **Test archives** before extraction with `-t` option
2. **Check available disk space** before extracting large archives
3. **Use appropriate extraction directory** to avoid file clutter
4. **Handle password-protected archives** securely
5. **Use `-n` or `-o` explicitly** to control overwriting behavior
6. **Consider character encoding** for archives with non-ASCII filenames
7. **Use `-j` carefully** as it flattens directory structure
8. **Verify extracted files** after extraction
9. **Use verbose mode** (`-v`) during extraction to monitor progress
10. **Handle errors gracefully** in automated scripts

## Performance Tips

1. **Extract to fast storage** for better I/O performance
2. **Use `-q` option** for scripts where output isn't needed
3. **Extract to temporary location** first when unsure about contents
4. **Consider using `-j`** when directory structure isn't needed
5. **Monitor disk space** during extraction of large archives
6. **Use appropriate file system** for extracted files
7. **Batch process multiple archives** for efficiency
8. **Consider SSD storage** for faster extraction of large archives

The `unzip` command is a versatile tool for extracting ZIP archives, essential for software distribution, data exchange, and backup restoration on Linux systems. Its cross-platform compatibility makes it ideal for working with archives from various operating systems.