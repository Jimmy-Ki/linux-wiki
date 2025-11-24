---
title: file - Determine File Type
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# file - Determine File Type

The `file` command determines the type of a file by examining its contents, magic numbers, and other characteristics. It can identify file formats, encoding types, executable formats, and more, making it essential for file analysis and system administration.

## Basic Syntax

```bash
file [OPTIONS] FILE...
file -b -s [OPTIONS] FILE...
```

## Common Options

### Output Options
- `-b, --brief` - Do not prepend filenames to output lines
- `-s, --special-files` - Read special files
- `-L, --dereference` - Follow symbolic links

### Display Options
- `-i, --mime-type` - Output MIME type strings instead of human readable
- `--mime-encoding` - Output MIME encoding instead of human readable
- `-k, --keep-going` - Don't stop at the first match
- `-l, --list` - List information about the magic file

### Analysis Options
- `-F, --separator` - Use string as separator instead of ":"
- `-n, --no-buffer` - Do not buffer output
- `-0, --print0` - Terminate filenames with null character

## Usage Examples

### Basic File Type Detection
```bash
# Determine file type
file document.txt

# Check multiple files
file *.txt *.jpg *.pdf

# Brief output (no filename)
file -b image.jpg
```

### Symbolic Links
```bash
# Follow symbolic links
file -L symlink.txt

# Don't follow links (default)
file symlink.txt
```

### Special Files
```bash
# Analyze device files
file -s /dev/sda1
file -s /dev/null

# Check block devices
file -b /dev/sda
```

### MIME Types
```bash
# Show MIME type
file -i document.pdf

# Show only MIME encoding
file --mime-encoding document.txt

# Combine both
file -i --mime-encoding *.txt
```

## File Types Detected

### Text Files
```bash
# Plain text
file document.txt
# Output: ASCII text

# Unicode text
file unicode.txt
# Output: UTF-8 Unicode text

# Script files
file script.sh
# Output: Bourne-Again shell script, ASCII text executable

# Configuration files
file config.conf
# Output: ASCII text
```

### Binary Files
```bash
# Executable files
file program
# Output: ELF 64-bit LSB executable, x86-64

# Libraries
file library.so
# Output: ELF 64-bit LSB shared object, x86-64

# Archives
file archive.tar.gz
# Output: gzip compressed data
```

### Image Files
```bash
# JPEG images
file photo.jpg
# Output: JPEG image data

# PNG images
file image.png
# Output: PNG image data

# GIF images
file animation.gif
# Output: GIF image data
```

### Document Files
```bash
# PDF files
file document.pdf
# Output: PDF document, version 1.4

# Microsoft Office files
file document.docx
# Output: Microsoft OOXML
```

## Advanced Usage

### Detailed Analysis
```bash
# Keep going to find all matches
file -k mystery_file

# Use custom separator
file -F " -> " *.txt

# Detailed magic file information
file -l
```

### Batch Processing
```bash
# Check all files in directory
find . -type f -exec file {} +

# Output to file
file * > file_types.txt

# Process with null separator (for filenames with spaces)
find . -type f -print0 | xargs -0 file
```

### Scripting Examples
```bash
#!/bin/bash
# identify_files.sh - Identify file types in directory

echo "=== File Type Analysis ==="
for file in *; do
    if [ -f "$file" ]; then
        echo -n "$file: "
        file -b "$file"
    fi
done
```

```bash
#!/bin/bash
# find_images.sh - Find all image files

echo "=== Image Files ==="
find . -type f -exec file -b {} + | grep "image data" | sort | uniq -c
```

### MIME Type Processing
```bash
# Get MIME types for web server
file -i *.html *.css *.js

# Filter by MIME type
find . -type f -exec file -i --mime-type {} + | grep "text/"

# Create MIME type mapping
for file in *; do
    echo "$file,$(file -i -b "$file")"
done
```

## Special File Analysis

### Device Files
```bash
# Block devices
file -s /dev/sda1
# Output: Linux rev 1.0 ext4 filesystem data

# Character devices
file -s /dev/tty
# Output: character special (4/1)

# Special files
file /dev/null
# Output: character special (1/3)
```

### Compressed Archives
```bash
# Gzip files
file archive.tar.gz
# Output: gzip compressed data

# Zip files
file package.zip
# Output: Zip archive data

# Tar files
file backup.tar
# Output: POSIX tar archive
```

## Troubleshooting

### Unknown Files
```bash
# For unknown files, try different approaches
file unknown.bin

# Use hex dump for binary files
file -b unknown.bin
hexdump -C unknown.bin | head

# Check if it's text
file -b unknown.bin | grep -i text
```

### Encrypted Files
```bash
# Encrypted files often appear as "data"
file encrypted.dat
# Output: data

# Try to identify by file extension
file --extension encrypted.dat
```

## Integration with Other Commands

### File Management
```bash
# Find files by type
find . -type f -exec file {} + | grep "text"

# Sort files by type
file * | sort

# Count files by type
file * | awk '{print $NF}' | sort | uniq -c
```

### System Administration
```bash
# Check system binaries
file /usr/bin/* | grep "not stripped"

# Check libraries
file /usr/lib/*.so | grep "shared object"

# Verify file integrity
file system_file | grep -i "corrupted"
```

## Performance Considerations

### Large Directories
```bash
# Efficient batch processing
find . -type f -print0 | xargs -0 file

# Limit scope for speed
find . -name "*.txt" -exec file {} +

# Use brief mode for large outputs
file -b * > types.txt
```

### Network File Systems
```bash
# Use local copy for faster analysis
cp remote_file local_file && file local_file

# Or use timeout for remote files
timeout 10 file remote_file
```

## Related Commands

- [`hexdump`](/docs/commands/file-management/hexdump) - Display file contents in hexadecimal
- [`xxd`](/docs/commands/file-management/xxd) - Hex dump with more features
- [`od`](/docs/commands/file-management/od) - Octal dump utility
- [`strings`](/docs/commands/file-management/strings) - Extract printable strings
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Use brief mode** for scripting:
   - `file -b filename` for cleaner output

2. **Handle symbolic links appropriately**:
   - Use `-L` to follow links
   - Default behavior checks the link itself

3. **Use MIME types** for web applications:
   - `file -i filename` for web content detection

4. **Be careful with special files**:
   - Use `-s` for device files
   - Some special files require privileges

5. **Batch process efficiently**:
   - Use `find ... -exec file {} +` for multiple files

6. **Handle unknown files**:
   - "data" usually means binary/unknown
   - Use other tools for deeper analysis

The `file` command is indispensable for file type identification and system administration. Its ability to analyze file contents without relying on extensions makes it essential for security, file management, and automated processing in Linux environments.