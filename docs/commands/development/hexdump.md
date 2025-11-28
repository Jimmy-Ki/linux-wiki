---
title: hexdump - ASCII, decimal, hexadecimal, octal dump
sidebar_label: hexdump
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# hexdump - ASCII, decimal, hexadecimal, octal dump

The `hexdump` command is a versatile utility that displays file contents in various formats including hexadecimal, decimal, octal, and ASCII. It's particularly useful for examining binary files, analyzing data structures, debugging low-level data formats, and investigating file contents when standard text editors cannot handle the data. Hexdump can format output according to user specifications, making it invaluable for reverse engineering, data recovery, forensics, and low-level system programming tasks.

## Basic Syntax

```bash
hexdump [OPTIONS] [FILE...]
hexdump -f FORMAT_FILE [FILE...]
hexdump -n LENGTH [OPTIONS] [FILE...]
hexdump -s SKIP [OPTIONS] [FILE...]
hexdump -e FORMAT_STRING [OPTIONS] [FILE...]
```

## Common Options

### Display Format Options
- `-b` - One-byte octal display
- `-c` - One-byte character display
- `-d` - Two-byte decimal display
- `-o` - Two-byte octal display
- `-x` - Two-byte hexadecimal display
- `-C` - Canonical hex+ASCII display

### Input Control
- `-n LENGTH` - Read only LENGTH bytes of input
- `-s SKIP` - Skip SKIP bytes before displaying
- `-v` - Display all input data (don't use asterisk for duplicate lines)

### Format Specification
- `-e FORMAT_STRING` - Use custom format string
- `-f FORMAT_FILE` - Read format from file

## Usage Examples

### Basic Display Formats

#### Standard Hexadecimal Display
```bash
# Display file in two-byte hexadecimal
hexdump -x binary_file.bin

# Display file in two-byte octal
hexdump -o binary_file.bin

# Display file in two-byte decimal
hexdump -d binary_file.bin

# Display file in one-byte octal
hexdump -b data_file.dat
```

#### Character Display
```bash
# Display as ASCII characters (non-printable shown as escape sequences)
hexdump -c text_file.txt

# Display with printable characters shown directly
hexdump -C mixed_file.bin
```

#### Canonical Hex+ASCII Display
```bash
# Show both hex and ASCII side by side (most common format)
hexdump -C file.bin

# Example output:
# 00000000  48 65 6c 6c 6f 20 57 6f  72 6c 64 0a 00 00 00 00  |Hello World.....|
# 00000010  7b 22 6d 65 73 73 61 67  65 22 3a 20 22 48 65 6c  |{"message": "Hel|
# 00000020  6c 6f 22 2c 20 22 76 61  6c 75 65 22 3a 20 34 32  |lo", "value": 42|
# 00000030  7d 00                                             |}|
```

### Input Control and Filtering

#### Limiting Output
```bash
# Display only first 64 bytes
hexdump -C -n 64 large_file.bin

# Display only 128 bytes starting from offset 1024
hexdump -C -s 1024 -n 128 file.bin

# Skip first 512 bytes then display rest
hexdump -C -s 512 file.img
```

#### Combining Options
```bash
# Display 32 bytes in hex starting from offset 16
hexdump -x -s 16 -n 32 file.bin

# Show ASCII characters for first 256 bytes
hexdump -c -n 256 text_file
```

### Custom Format Strings

#### Basic Format Specifications
```bash
# Display as formatted hex with address
hexdump -e '"%08_ax: " 4/1 "%02x " "  " 4/1 "%02x "\n"' file.bin

# Display as decimal with address
hexdump -e '"%08_ad: " 8/1 "%3d " "\n"' file.bin

# Display as mixed hex and ASCII
hexdump -e '"%08_ax: " 16/1 "%02x " "\n"' file.bin
```

#### Advanced Format Strings
```bash
# Display with custom separators
hexdump -e '"%08_ax: " 8/1 "%02x " "- " 8/1 "%02x " "\n"' file.bin

# Display as formatted structure
hexdump -e '"Header: %08_ax\n"' -e '"  Magic: 4/1 "%02x "\n"' -e '"  Size: %04_ad\n"' file.bin

# Display with ASCII interpretation
hexdump -e '"%08_ax: " 16/1 "%02x " " |"' -e '16/1 "%_p" "|\n"' file.bin
```

#### Format String Components
```bash
# Address formats
%_ax  # Hexadecimal offset
%_ad  # Decimal offset
%_ao  # Octal offset

# Data formats
%02x  # Two-digit hexadecimal
%03d  # Three-digit decimal
%04o  # Four-digit octal
%c    # Character
%_p   # Printable character or '.' for non-printable
```

### Format Files

#### Creating Format Files
```bash
# Create format file hexdump.fmt
cat > hexdump.fmt << 'EOF'
# Custom format for analyzing network packets
"%08_ax: " 4/1 "%02x " " "
4/1 "%02x " " " 4/1 "%02x " " "
4/1 "%02x "\n"
EOF

# Use format file
hexdump -f hexdump.fmt network_capture.bin
```

#### Complex Format Examples
```bash
# Create format for ELF header analysis
cat > elf_header.fmt << 'EOF'
# ELF Header Analysis
"ELF Header:\n"
"  Magic: " 4/1 "%02x " "\n"
"  Class: " 1/1 "%02x " "\n"
"  Data: " 1/1 "%02x " "\n"
"  Version: " 1/1 "%02x " "\n"
"  OS/ABI: " 1/1 "%02x " "\n"
"  ABI Version: " 1/1 "%02x " "\n"
"  Type: " 2/1 "%04x " "\n"
"  Machine: " 2/1 "%04x " "\n"
"  Version: " 4/1 "%08x " "\n"
"  Entry: " 4/1 "%08x " "\n"
EOF

hexdump -f elf_header.fmt -n 52 executable_file
```

## Practical Examples

### System Administration

#### Analyzing System Files
```bash
# Examine bootloader sector
hexdump -C -n 512 /dev/sda

# Check MBR partition table
hexdump -C -s 446 -n 64 /dev/sda

# Analyze kernel image header
hexdump -C -n 1024 /boot/vmlinuz-$(uname -r)

# Examine initramfs structure
hexdump -C -n 256 /boot/initrd.img-$(uname -r)
```

#### Network Debugging
```bash
# Analyze network packet capture
hexdump -C network_dump.pcap | head -20

# Examine raw socket data
hexdump -x -n 64 raw_socket_output.bin

# Analyze HTTP headers in binary file
hexdump -C -n 1024 http_response.bin | grep -E "HTTP|Host|User-Agent"
```

#### File Recovery and Forensics
```bash
# Find file signatures in disk image
hexdump -C disk_image.img | grep -E "50 4B 03 04|7F 45 4C 46|FF D8 FF E0"

# Examine deleted file sectors
hexdump -C -s $((2048*512)) -n 512 filesystem.img

# Analyze file metadata
hexdump -C -n 256 file_with_metadata.dat
```

### Development Workflow

#### Binary File Analysis
```bash
# Examine compiled binary headers
hexdump -C -n 128 compiled_program

# Analyze data file structure
hexdump -e '"%08_ad: " 8/4 "%08x " "\n"' data_file.bin

# Check byte order and endianness
hexdump -x -n 16 binary_data.bin
```

#### Debugging Data Structures
```bash
# Analyze C struct layout
hexdump -e '"Offset: %08_ad\n"' -e '"  Field1: %08x\n"' -e '"  Field2: %04x\n"' struct_file.bin

# Examine network packet structure
hexdump -e '"Packet: %08_ax\n"' -e '"  Src IP: 4/1 "%02x " "\n"' -e '"  Dst IP: 4/1 "%02x " "\n"' packet.bin

# Analyze file format headers
hexdump -f png_header.fmt -n 8 image.png
```

#### Memory Dump Analysis
```bash
# Analyze core dump files
hexdump -C -n 1024 core_dump | head -20

# Examine memory layout
hexdump -e '"%08_ad: " 16/1 "%02x " "\n"' memory_dump.bin | head -50

# Search for patterns in memory
hexdump -C memory_dump.bin | grep "41 41 41 41"  # Search for "AAAA"
```

### Data Format Investigation

#### Multimedia File Analysis
```bash
# Examine JPEG header
hexdump -C -n 32 image.jpg

# Analyze MP3 frame header
hexdump -x -n 4 audio.mp3 | head -5

# Check PNG file signature and chunks
hexdump -C -n 64 image.png
```

#### Archive and Compression Analysis
```bash
# Examine ZIP file header
hexdump -C -n 64 archive.zip

# Analyze gzip header
hexdump -x -n 10 compressed.gz

# Check tar file structure
hexdump -C -n 512 archive.tar
```

#### Configuration and Log Analysis
```bash
# Examine binary configuration files
hexdump -C config.db

# Analyze proprietary log formats
hexdump -x -n 256 application.log

# Check Unicode text file encoding
hexdump -C -n 32 unicode_file.txt
```

## Advanced Usage

### Format String Programming

#### Complex Format Examples
```bash
# Multi-line formatted output
hexdump -e '"%08_ax: "' -e '16/1 "%02x " "\n"' -e '"         "' -e '16/1 "%_p" "\n\n"' file.bin

# C-style array output
hexdump -e '"unsigned char data[] = {'"' -e '16/1 "0x%02x, " "\n"' -e '"};\n"' file.bin

# Binary diff format
hexdump -e '"%08_ax  "' -e '8/1 "%02x " "' -e '8/1 "%02x " "\n"' file.bin
```

#### Conditional Formatting
```bash
# Format based on content type
hexdump -e '"%08_ax: "' -e '16/1 "%_p" "\n"' text_file.bin    # Text mode
hexdump -e '"%08_ax: "' -e '16/1 "%02x " "\n"' binary_file.bin # Hex mode

# Mixed format for structured data
hexdump -e '"Header: "' -e '4/1 "%02x " "\n"' -e '"Data: "' -e '12/1 "%02x " "\n"' file.bin
```

### Performance Optimization

#### Large File Handling
```bash
# Process large files efficiently with head/tail
hexdump -C large_file.bin | head -100   # First 100 lines
hexdump -C large_file.bin | tail -50    # Last 50 lines

# Use specific ranges to avoid processing entire file
hexdump -C -s 1048576 -n 1024 huge_file.bin  # Read 1MB from 1MB offset

# Pipe through other tools for specific analysis
hexdump -C file.bin | grep "pattern" | head -20
```

#### Batch Processing
```bash
# Analyze multiple files with consistent format
for file in *.bin; do
    echo "=== Analyzing $file ==="
    hexdump -C -n 64 "$file"
    echo ""
done

# Create summary of multiple files
for file in *.dat; do
    echo "$file: $(hexdump -n 4 -e '"%08x"' "$file")"
done
```

### Integration with Other Tools

#### Combining with Text Processing
```bash
# Extract specific patterns from hex dump
hexdump -C file.bin | grep "41 42 43" | cut -d' ' -f2-17

# Convert hex dump to other formats
hexdump -e '"%02x\n"' file.bin | xxd -r -p > new_file.bin

# Parse hex output with awk
hexdump -x file.bin | awk '/00001000/ {print $2, $3, $4, $5}'
```

#### Working with dd and Other Utilities
```bash
# Extract specific sectors and analyze
dd if=/dev/sda bs=512 skip=1 count=1 | hexdump -C

# Create hex dump of memory-mapped files
hexdump -C <(cat /proc/kmsg) | head -10

# Analyze process memory
hexdump -C /proc/$(pidof process_name)/mem 2>/dev/null | head -20
```

## Special Operations

### File Format Analysis

#### Executable File Analysis
```bash
# Analyze ELF magic number and structure
hexdump -x -n 16 executable | grep "7f 45"

# Check PE header (Windows executable)
hexdump -C -n 64 program.exe | head -4

# Examine Mach-O header (macOS)
hexdump -x -n 16 macho_binary
```

#### Document File Analysis
```bash
# PDF file header analysis
hexdump -C -n 32 document.pdf

# Microsoft Office file signature
hexdump -x -n 8 document.docx

# Check for file corruption
hexdump -C -n 1024 suspected_corrupt.pdf | grep -E "25 50 44 46|PDF"
```

### Network Protocol Analysis

#### Packet Analysis
```bash
# Ethernet frame analysis
hexdump -C -n 14 ethernet_frame.bin

# IP packet header analysis
hexdump -x -n 20 ip_packet.bin

# TCP segment analysis
hexdump -C -n 20 tcp_segment.bin
```

#### Binary Protocol Debugging
```bash
# Custom binary protocol analysis
hexdump -e '"Length: %04x\n"' -e '"Type: %02x\n"' -e '"Data: "' -e '10/1 "%02x " "\n"' protocol_packet.bin

# WebSocket frame analysis
hexdump -C -n 16 websocket_frame.bin
```

## Troubleshooting

### Common Issues

#### Large File Handling
```bash
# Problem: hexdump hangs on very large files
# Solution: Use -n and -s to limit output
hexdump -C -n 1024 -s $((1024*1024)) huge_file.bin

# Monitor progress with pv
pv large_file.bin | hexdump -C | head -100

# Split analysis into chunks
split -b 1M huge_file.bin chunk_
hexdump -C chunk_aa | head -20
```

#### Non-Printable Characters
```bash
# Problem: Output contains many non-printable characters
# Solution: Use -C or custom format strings
hexdump -C binary_file.bin  # Shows printable characters
hexdump -e '"%08_ax: " 16/1 "%_p" "\n"' binary_file.bin  # ASCII only

# Filter out non-printable characters
hexdump -c file.bin | tr -cd '\11\12\15\40-\176'
```

#### Format String Errors
```bash
# Problem: Format string syntax errors
# Solution: Use proper escape sequences and quotes
hexdump -e '"%08_ax: " 4/1 "%02x " "\n"' file.bin

# Test format strings on small files first
echo "test" | hexdump -e '"%08_ax: " 4/1 "%02x " "\n"'

# Use format files for complex formats
cat > test.fmt << 'EOF'
"%08_ax: " 4/1 "%02x " "\n"
EOF
hexdump -f test.fmt file.bin
```

#### Display Issues with Duplicate Lines
```bash
# Problem: hexdump shows asterisks for duplicate lines
# Solution: Use -v flag to show all data
hexdump -v -C file_with_repeats.bin

# Count duplicate lines separately
hexdump -C file.bin | grep -c "^\*"
```

### Performance Issues

#### Memory Usage
```bash
# Problem: High memory usage with large files
# Solution: Process in chunks
hexdump -C -n 4096 file.bin

# Use dd to process in blocks
dd if=large_file.bin bs=4096 count=1 | hexdump -C

# Stream processing to avoid loading entire file
tail -c 1024 large_file.bin | hexdump -C
```

#### Output Processing
```bash
# Problem: Too much output to handle
# Solution: Filter and limit output
hexdump -C file.bin | head -100

# Search for specific patterns only
hexdump -C file.bin | grep "pattern"

# Use awk for selective analysis
hexdump -x file.bin | awk '$2 ~ /1234/ {print}'
```

## Related Commands

- [`xxd`](/docs/commands/development/xxd) - Hexdump with additional features
- [`od`](/docs/commands/file-management/od) - Octal dump utility
- [`xxd`](/docs/commands/development/xxd) - Hex dump to/from file or stdin
- [`bvi`](/docs/commands/editors/bvi) - Binary file editor
- [`bless`](/docs/commands/editors/bless) - Hexadecimal editor
- [`strings`](/docs/commands/file-management/strings) - Extract printable strings
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`dd`](/docs/commands/file-management/dd) - Convert and copy files
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`biew`](/docs/commands/editors/biew) - Binary viewer and editor

## Best Practices

1. **Use canonical format** (-C) for general binary analysis as it shows both hex and ASCII
2. **Limit output** with -n and -s when working with large files to avoid overwhelming output
3. **Save format strings** to files for complex, reusable analysis patterns
4. **Use -v flag** when you need to see all data, including duplicate lines
5. **Combine with other tools** like grep, awk, and sed for powerful analysis pipelines
6. **Test format strings** on small files before applying to large datasets
7. **Use appropriate display formats** (-b, -c, -d, -o, -x) based on your analysis needs
8. **Pipe through less** for large outputs: `hexdump -C large_file.bin | less`
9. **Document your format strings** for future reference and team collaboration
10. **Consider using xxd** when you need reverse hexdump capabilities

## Performance Tips

1. **Canonical format** (-C) is slower than basic formats (-x, -d) due to ASCII processing
2. **Limit output size** with -n to improve performance on large files
3. **Use -v** only when necessary as it increases output size
4. **Process files in chunks** using dd for very large files
5. **Simple format strings** are faster than complex ones
6. **Avoid regex processing** on large hexdump outputs when possible
7. **Use head and tail** to preview large files before full analysis
8. **Consider memory constraints** when analyzing files larger than available RAM
9. **Format files** (-f) are faster than inline format strings for repeated use
10. **Batch process multiple files** efficiently using shell loops and consistent formats

The `hexdump` command is an essential tool for anyone working with binary data, providing flexible and powerful capabilities for examining, analyzing, and debugging files at the byte level. Its custom formatting options make it invaluable for reverse engineering, forensics, network analysis, and low-level development tasks.