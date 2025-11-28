---
title: od - Octal Dump
sidebar_label: od
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# od - Octal Dump

The `od` command is a powerful file analysis tool that displays files in various formats including octal, decimal, hexadecimal, ASCII, and other representations. It's particularly useful for examining binary files, debugging data structures, analyzing file formats, and understanding low-level data representation. The command can display file contents in multiple formats simultaneously, making it an essential tool for system programmers, reverse engineers, and anyone working with binary data formats.

## Basic Syntax

```bash
od [OPTION]... [FILE]...
od [-abcdefhilox]... [FILE] [[+]OFFSET[.][b]]
od --traditional [OPTION]... [FILE] [[+]OFFSET[.][b] [+][LABEL][.][b]]
```

## Display Format Options

### Output Format Types
- `-a, --address-radix=RADIX` - Select the base for file offsets (8, 10, 16, or d/o/n for default)
- `-A, --address-radix=RADIX` - Same as above
- `-j, --skip-bytes=BYTES` - Skip BYTES input bytes before formatting
- `-N, --read-bytes=BYTES` - Limit dump to BYTES input bytes
- `-S, --strings[=BYTES]` - Output strings of at least BYTES graphic characters (3 by default)
- `-t, --format=TYPE` - Select output format(s)
- `-w, --width[=BYTES]` - Output BYTES bytes per output line (32 by default)
- `--traditional` - Accept arguments in traditional form

### Format Type Specifications
```bash
TYPE = [acdfox...] [SIZE]
SIZE = 1 | 2 | 4 | 8
```

#### Format Characters
- `a` - Named character (ASCII name or escape sequence)
- `c` - Character (ASCII or non-printable as \ooo)
- `d[SIZE]` - Signed decimal, SIZE bytes per integer
- `f[SIZE]` - Floating point, SIZE bytes per integer
- `o[SIZE]` - Octal, SIZE bytes per integer
- `u[SIZE]` - Unsigned decimal, SIZE bytes per integer
- `x[SIZE]` - Hexadecimal, SIZE bytes per integer

#### Size Modifiers
- `C` - Char (1 byte)
- `S` - Short (2 bytes)
- `I` - Int (4 bytes)
- `L` - Long (8 bytes, depending on system)
- `F` - Float (4 bytes)
- `D` - Double (8 bytes)

## Usage Examples

### Basic File Analysis

#### Default Octal Display
```bash
# Display file in octal format (default)
od file.bin

# Display with readable ASCII interpretation
od -c file.bin

# Display in hexadecimal format
od -x file.bin

# Display in decimal format
od -d file.bin
```

#### Multiple Format Display
```bash
# Display in both octal and ASCII
od -o -c file.bin

# Display in hexadecimal and ASCII
od -x -c file.bin

# Display in multiple formats simultaneously
od -t x1 -t c file.bin

# Display in decimal, hex, and octal
od -t d4 -t x4 -t o4 file.bin
```

### Data Type Analysis

#### Integer Data
```bash
# Display as 1-byte signed integers
od -t d1 file.bin

# Display as 2-byte integers (short)
od -t d2 file.bin

# Display as 4-byte integers (int)
od -t d4 file.bin

# Display as 8-byte integers (long)
od -t d8 file.bin

# Display as unsigned integers
od -t u4 file.bin

# Display in multiple integer sizes
od -t d1 -t d2 -t d4 file.bin
```

#### Floating Point Data
```bash
# Display as 4-byte floats
od -t f4 file.bin

# Display as 8-byte doubles
od -t f8 file.bin

# Mixed floating point formats
od -t f4 -t f8 file.bin
```

#### Character Data
```bash
# Display as ASCII characters
od -t c file.bin

# Display as named characters (with escape sequences)
od -t a file.bin

# Character and byte representation
od -t c -t x1 file.bin
```

### File Navigation

#### Byte Offset Control
```bash
# Skip first 100 bytes
od -j 100 file.bin

# Display only first 256 bytes
od -N 256 file.bin

# Skip 512 bytes, then show 1024 bytes
od -j 512 -N 1024 file.bin

# Display from specific offset in hex
od -j 0x200 file.bin

# Display specific byte range
od -j 1000 -N 500 file.bin
```

#### Address Format Control
```bash
# Octal addresses (default)
od -A o file.bin

# Decimal addresses
od -A d file.bin

# Hexadecimal addresses
od -A x file.bin

# No addresses
od -A n file.bin
```

### String Extraction

#### Finding Text in Binary
```bash
# Extract strings of 4+ characters
od -S 4 file.bin

# Extract strings with minimum length
od -S 10 file.bin

# Show strings with character display
od -S 4 -t c file.bin

# Traditional string extraction
od -a file.bin
```

## Practical Examples

### Binary File Analysis

#### Executable File Headers
```bash
# Analyze ELF header
od -t x1 -N 64 /bin/ls

# View magic numbers and file type
od -t x1 -N 16 program.exe

# Check file signatures
od -t x1 -N 8 file.bin | head -1

# Analyze PE header
od -t x2 -j 60 -N 4 windows_program.exe
```

#### Image File Analysis
```bash
# Check PNG signature
od -t x1 -N 8 image.png

# Verify JPEG header
od -t x1 -N 4 photo.jpg

# Analyze BMP header
od -t x2 -N 14 bitmap.bmp

# Check GIF magic number
od -t c -N 6 animation.gif
```

#### Audio/Video File Analysis
```bash
# Check WAV file header
od -t x1 -N 44 audio.wav

# Analyze MP3 frame header
od -t x1 -N 4 music.mp3

# View AVI file signature
od -t c -N 4 video.avi

# Check MIDI header
od -t x1 -N 14 music.mid
```

### Data Structure Inspection

#### Network Packet Analysis
```bash
# Analyze IP packet header
od -t x1 -N 20 packet.raw

# View TCP header structure
od -t x2 -N 20 tcp_packet.bin

# Examine Ethernet frame
od -t x1 -N 14 eth_frame.raw

# UDP packet analysis
od -t x2 -N 8 udp_packet.bin
```

#### Database File Analysis
```bash
# Check SQLite header
od -t x1 -N 16 database.db

# Examine database page header
od -t x4 -j 16 -N 8 database.db

# View record structure
od -t x2 -j 100 -N 20 datafile.db

# Analyze B-tree page
od -t x4 -j 8 -N 4 database.db
```

### System Programming

#### Memory Dump Analysis
```bash
# Analyze core dump
od -t x1 -N 64 core.dump

# Examine memory layout
od -t x4 memory_dump.bin

# View stack contents
od -t x8 -j 0x7fff0000 -N 128 memory.bin

# Analyze heap structure
od -t x4 -N 256 heap_dump.bin
```

#### Device File Analysis
```bash
# Examine device registers
od -t x4 /dev/mem

# Read hardware status
od -t x1 /dev/port

# Analyze disk sector
dd if=/dev/sda bs=512 count=1 | od -t x1

# View MBR partition table
dd if=/dev/sda bs=512 count=1 | od -t x1 -j 446 -N 64
```

### Data Format Conversion

#### Binary to Text
```bash
# Convert binary to readable format
od -t x1 -w1 binary.dat | cut -d' ' -f2- > hex.txt

# Extract all data as hex
od -t x1 -A n file.bin | tr -d ' \n' > hexstream.txt

# Generate C array from binary
od -t x1 -A n file.bin | awk '{printf "0x" $0 ","}' > array.c

# Create Python bytes literal
od -t x1 -A n file.bin | awk '{print "b\"\\" $0 "\""}' > python.py
```

#### Endian Conversion
```bash
# View data in little-endian
od --endian=little -t x4 file.bin

# View data in big-endian
od --endian=big -t x4 file.bin

# Compare endianness
od -t x4 file.bin
od --endian=big -t x4 file.bin
```

## Advanced Usage

### Custom Formatting

#### Complex Format Strings
```bash
# Custom multi-byte format
od -t "4x1 4c" file.bin

# Mixed format display
od -t "x2 d2 u2" file.bin

# Structured data format
od -t "x4 x4 x4 x4" file.bin

# Custom byte grouping
od -t "x1 x1 x1 x1" -w4 file.bin
```

#### Output Customization
```bash
# Custom line width
od -w 16 -t x1 file.bin

# Single byte per line
od -w 1 -t x1 file.bin

# Wide output for large files
od -w 64 -t x1 file.bin

# No line wrapping
od -w 1024 -t x1 file.bin
```

### Traditional Mode

#### Legacy Syntax
```bash
# Traditional octal display
od -a file.bin

# Traditional format specification
od -b file.bin

# Traditional decimal display
od -d file.bin

# Traditional hex display
od -x file.bin

# Traditional character display
od -c file.bin
```

#### Offset Specifications
```bash
# Traditional offset
od file.bin +100

# Traditional offset with label
od file.bin +100 200

# Block offset
od file.bin +100b

# Label offset
od file.bin 200l
```

### Pipeline Integration

#### Command Chaining
```bash
# Create and analyze binary data
echo "Hello" | od -t x1

# Compare two files binary-wise
diff <(od -t x1 file1) <(od -t x1 file2)

# Extract specific patterns
od file.bin | grep "pattern"

# Generate checksums from hex dump
od -t x1 -A n file.bin | tr -d ' \n' | sha256sum
```

#### Script Integration
```bash
# File type detection script
#!/bin/bash
magic=$(od -t x1 -N 4 "$1" | awk 'NR==1{print $2$3$4$5}')
case "$magic" in
    "7f454c46") echo "ELF executable" ;;
    "89504e47") echo "PNG image" ;;
    "ffd8ffe0") echo "JPEG image" ;;
    *) echo "Unknown file type" ;;
esac
```

## Integration and Automation

### Shell Scripts

#### Binary Analysis Script
```bash
#!/bin/bash
# Comprehensive binary file analyzer

FILE="$1"
echo "Analyzing file: $FILE"
echo "File size: $(stat -f%z "$FILE") bytes"
echo

# File signature
echo "File signature (first 16 bytes):"
od -t x1 -N 16 "$FILE" | head -1
echo

# String analysis
echo "Printable strings (4+ chars):"
od -S 4 -t c "$FILE" | grep -v "^[0-9]*[ ]*$"
echo

# Entropy calculation (basic)
echo "Entropy analysis:"
hex_bytes=$(od -t x1 -A n "$FILE" | tr -d ' \n')
unique_chars=$(echo "$hex_bytes" | fold -w2 | sort -u | wc -l)
total_chars=$((${#hex_bytes} / 2))
entropy=$(echo "scale=2; $unique_chars * l(256) / l(2) / 256" | bc -l)
echo "Estimated entropy: $entropy"
```

#### File Comparison Script
```bash
#!/bin/bash
# Binary file comparison tool

if [ $# -ne 2 ]; then
    echo "Usage: $0 <file1> <file2>"
    exit 1
fi

echo "Comparing $1 and $2"
echo "===================="

# Size comparison
size1=$(stat -f%z "$1")
size2=$(stat -f%z "$2")
echo "Size difference: $(($size1 - $size2)) bytes"

# Hex dump comparison
echo "First differing byte:"
diff <(od -t x1 "$1") <(od -t x1 "$2") | head -5

# Check if files are identical
if cmp -s "$1" "$2"; then
    echo "Files are identical"
else
    echo "Files differ"
fi
```

## Troubleshooting

### Common Issues

#### Large File Handling
```bash
# Memory issues with large files
# Solution: Use limited reading
od -N 1000000 huge_file.bin

# View specific sections
od -j 1000000 -N 1000 huge_file.bin

# Process in chunks
for offset in 0 1000000 2000000 3000000; do
    echo "Offset: $offset"
    od -j $offset -N 1000 huge_file.bin | head -5
done
```

#### Format Selection Problems
```bash
# Unreadable output format
# Solution: Use character display
od -t c binary_file.bin

# Mixed output confusion
# Solution: Use single format
od -t x1 file.bin

# Size specification errors
# Solution: Check file size first
od -t d8 file.bin  # Error if file < 8 bytes
```

#### Offset Calculation
```bash
# Incorrect offset calculations
# Solution: Use decimal for accuracy
od -j 1024 file.bin

# Hex offset confusion
# Solution: Specify base clearly
od -j 0x400 file.bin  # 1024 decimal

# Combined offset and limit
od -j 100 -N 50 file.bin
```

## Related Commands

- [`hexdump`](/docs/commands/file-management/hexdump) - Display file contents in hexadecimal
- [`xxd`](/docs/commands/file-management/xxd) - Hexdump with bidirectional conversion
- [`strings`](/docs/commands/file-management/strings) - Extract printable strings from files
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`dd`](/docs/commands/file-management/dd) - Convert and copy files
- [`xxd`](/docs/commands/file-management/xxd) - Hexdump and reverse hexdump

## Best Practices

1. **Use appropriate format** for the data type being analyzed
2. **Limit output** with `-N` for large files to avoid overwhelming output
3. **Combine formats** using multiple `-t` options for comprehensive analysis
4. **Use character display** (-t c) to identify readable text in binary files
5. **Skip irrelevant data** with `-j` to focus on specific file regions
6. **Adjust address radix** (-A) for easier navigation in large files
7. **Use traditional mode** for compatibility with older scripts
8. **Pipe output** to other tools like `grep` for pattern searching
9. **Save analysis results** to files for documentation purposes
10. **Use strings extraction** (-S) to find embedded text in binary files

## Performance Tips

1. **Limit read bytes** with `-N` for faster analysis of large files
2. **Use appropriate width** (`-w`) to optimize output formatting
3. **Single format** processing is faster than multiple formats
4. **Skip to relevant sections** with `-j` instead of processing entire files
5. **Use octal output** (`-o`) for fastest processing on some systems
6. **Avoid string extraction** (`-S`) on non-text binary files
7. **Process in chunks** for very large files to manage memory usage
8. **Use decimal addresses** (`-A d`) for easier position calculation
9. **Minimize format types** to reduce processing overhead
10. **Combine with other tools** efficiently using pipes to avoid intermediate files

The `od` command is an indispensable tool for binary file analysis, offering flexible formatting options and comprehensive data representation capabilities. Its ability to display data in multiple formats simultaneously makes it ideal for debugging, reverse engineering, and understanding complex binary file formats.