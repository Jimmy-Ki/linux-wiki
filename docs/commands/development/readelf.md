---
title: readelf - Display information about ELF files
sidebar_label: readelf
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# readelf - Display information about ELF files

The `readelf` command is a powerful utility that displays detailed information about ELF (Executable and Linkable Format) files. ELF is the standard file format for executable files, object files, shared libraries, and core dumps in Unix and Unix-like systems. `readelf` provides comprehensive analysis of ELF file structure, including headers, sections, program headers, symbols, and debugging information. It's an essential tool for developers, system administrators, and security analysts who need to examine binary files, debug applications, or analyze system executables.

## Basic Syntax

```bash
readelf [OPTIONS] FILENAME...
```

## Common Options

### File Information Options
- `-h, --file-header` - Display the ELF file header
- `-l, --program-headers, --segments` - Display the program headers
- `-S, --section-headers, --sections` - Display the sections' header
- `-g, --section-groups` - Display section groups
- `-t, --section-details` - Display the section details
- `-e, --headers` - Display all headers
- `-s, --symbols, --syms` - Display the symbol table
- `--syms` - Display the symbol table (same as -s)
- `--dyn-syms` - Display the dynamic symbol table
- `-x, --hex-dump=<number/name>` - Dump the contents of section <number/name> as bytes

### Debug Information Options
- `--debug-dump=<info>` - Display the contents of DWARF debug sections
- `--debug-dump=info` - Display .debug_info section
- `--debug-dump=abbrev` - Display .debug_abbrev section
- `--debug-dump=line` - Display .debug_line section
- `--debug-dump=aranges` - Display .debug_aranges section
- `--debug-dump=frames` - Display .debug_frame section
- `--debug-dump=str,debug_str` - Display .debug_str section
- `--debug-dump=loc,debug_loc` - Display .debug_loc section
- `--debug-dump=pubnames` - Display .debug_pubnames section
- `--debug-dump=macinfo` - Display .debug_macinfo section
- `--debug-dump=pubtypes` - Display .debug_pubtypes section
- `--debug-dump=gdb_index` - Display .gdb_index section

### Relocation and Dynamic Options
- `-r, --relocs` - Display the relocations (if present)
- `-R, --dynamic-relocs` - Display the dynamic relocations (if present)
- `-d, --dynamic` - Display the dynamic section (if present)

### Notes and Comments Options
- `-n, --notes` - Display the core notes (if present)
- `-p, --string-dump=<number/name>` - Dump the contents of section <number/name> as strings
- `-c, --archive-index` - Display the symbol/file index of an archive

### Output Control Options
- `-u, --unwind` - Display the unwind info (if present)
- `-V, --version-info` - Display the version sections (if present)
- `-A, --arch-specific` - Display architecture-specific information (if present)
- `-D, --use-dynamic` - Use the dynamic section info when displaying symbols
- `-v, --version` - Display the version number of readelf
- `-W, --wide` - Wide output (never truncate output)
- `-H, --help` - Display this information

### Format Options
- `--histogram` - Display histogram of bucket list lengths
- `--wide` - Allow output width to exceed 80 characters
- `--address-signness=<32|64>` - Force addresses to be treated as 32-bit or 64-bit

## Usage Examples

### Basic File Information

#### Display ELF File Header
```bash
# Show basic ELF file information
readelf -h /bin/ls

# Display file header for a shared library
readelf --file-header /lib/x86_64-linux-gnu/libc.so.6

# Check file type and architecture
readelf -h myprogram | grep -E '(Class|Machine|Type)'
```

#### Show All Headers
```bash
# Display all available headers
readelf -e /usr/bin/gcc

# Wide output format for better readability
readelf -eW /bin/bash

# Multiple files at once
readelf -h /bin/* 2>/dev/null
```

### Section Analysis

#### Display Section Headers
```bash
# Show all sections in the file
readelf -S /usr/bin/python3

# Detailed section information
readelf -S -W /lib/x86_64-linux-gnu/libssl.so.3

# Display section details
readelf -t /bin/ls

# Show specific section information
readelf -S /bin/ls | grep -E '\.(text|data|bss)'
```

#### Section Content Analysis
```bash
# Dump hex content of .text section
readelf -x .text /bin/ls

# Dump string content of .rodata section
readelf -p .rodata /bin/ls

# Display multiple sections
readelf -x .data -x .bss /usr/bin/ssh

# Show section group information
readelf -g /usr/lib/x86_64-linux-gnu/libpthread.so.0
```

### Symbol Table Analysis

#### Display Symbols
```bash
# Show symbol table
readelf -s /lib/x86_64-linux-gnu/libc.so.6

# Wide format for better symbol viewing
readelf -sW /usr/bin/gcc

# Show only function symbols
readelf -s /bin/ls | grep ' FUNC '

# Show undefined symbols
readelf -s /usr/bin/ssh | grep ' NOTYPE '
```

#### Dynamic Symbol Analysis
```bash
# Display dynamic symbols
readelf --dyn-syms /lib/x86_64-linux-gnu/libm.so.6

# Use dynamic section for symbol display
readelf -Ds /usr/bin/python3

# Show exported symbols from shared library
readelf -sW /lib/x86_64-linux-gnu/libz.so.1 | grep GLOBAL
```

### Program Header Analysis

#### Display Program Headers
```bash
# Show program headers (segments)
readelf -l /bin/ls

# Wide format for program headers
readelf -lW /usr/bin/gdb

# Show specific segment types
readelf -l /bin/bash | grep -E '(LOAD|GNU_STACK)'
```

### Relocation Information

#### Display Relocations
```bash
# Show relocation entries
readelf -r /usr/bin/python3

# Show dynamic relocations
readelf -R /lib/x86_64-linux-gnu/libc.so.6

# Display relocations for object files
readelf -r myobject.o
```

### Debug Information Analysis

#### DWARF Debug Information
```bash
# Display debug information sections
readelf --debug-dump=all /usr/bin/gcc

# Show specific debug sections
readelf --debug-dump=info /usr/bin/gdb
readelf --debug-dump=line /usr/bin/python3
readelf --debug-dump=frames /usr/bin/ssh

# Display debug abbreviations
readelf --debug-dump=abbrev /usr/bin/strace
```

## Practical Examples

### Development Workflow

#### Binary Analysis
```bash
# Analyze compiled binary for debugging
readelf -h -S -l my_program

# Check if binary is dynamically linked
readelf -l my_program | grep INTERP

# Find required shared libraries
readelf -d my_program | grep NEEDED

# Analyze symbol usage
readelf -s my_program | grep -E 'FUNC|OBJECT'

# Check for debugging symbols
readelf -S my_program | grep debug

# Verify architecture compatibility
readelf -h my_program | grep Machine
```

#### Library Development
```bash
# Check exported symbols from shared library
readelf -sW mylib.so | grep GLOBAL

# Verify library dependencies
readelf -d mylib.so | grep NEEDED

# Analyze library sections
readelf -SW mylib.so

# Check version information
readelf -V mylib.so

# Validate library structure
readelf -e mylib.so
```

#### Build System Integration
```bash
# Verify object file structure
readelf -h source.o

# Check for unresolved symbols
readelf -s program.o | grep UND

# Analyze archive contents
readelf -c libmylib.a

# Verify linking results
readelf -s final_executable
```

### System Administration

#### Binary Compatibility
```bash
# Check binary architecture
readelf -h /usr/bin/some_program | grep -E '(Class|Machine)'

# Verify 32/64 bit compatibility
readelf -h /lib/*/*.so* | grep Class

# Check shared library dependencies system-wide
find /lib /usr/lib -name "*.so*" -exec readelf -d {} \; 2>/dev/null | grep NEEDED

# Find all executables requiring specific library
find /bin /usr/bin -type f -executable -exec readelf -d {} \; 2>/dev/null | grep -B1 libspecific.so
```

#### Security Analysis
```bash
# Check for security-related sections
readelf -S suspicious_binary | grep -E '(relro|got|plt)'

# Analyze executable segments for NX bit
readelf -l binary | grep -E 'GNU_STACK|GNU_RELRO'

# Find binaries with stack protection disabled
readelf -l /bin/* | grep -A1 GNU_STACK | grep -B1 RW

# Check for dynamic linking security features
readelf -d /bin/ls | grep -E '(BIND_NOW|RELRO)'

# Analyze symbols for suspicious functions
readelf -s malware_sample | grep -E '(system|execve|socket)'
```

#### System Audit
```bash
# Check all system binaries for consistency
find /bin /sbin /usr/bin /usr/sbin -type f -exec readelf -h {} \; 2>/dev/null | grep Machine

# Find all 32-bit binaries on 64-bit system
find / -type f -executable -exec readelf -h {} \; 2>/dev/null 2>/dev/null | grep -B1 'ELF32'

# Audit shared library versions
readelf -V /lib/x86_64-linux-gnu/libc.so.6

# Check for stripped binaries
readelf -S /bin/* 2>/dev/null | grep -c .symtab
```

### Advanced Usage

#### Cross-Platform Analysis
```bash
# Analyze different architecture binaries
readelf -h arm_binary
readelf -h x86_binary
readelf -h x86_64_binary

# Convert between different readelf outputs
readelf -h binary > header_info.txt
readelf -S binary > sections.txt

# Compare two binaries
diff <(readelf -s binary1) <(readelf -s binary2)
```

#### Performance Analysis
```bash
# Large symbol table analysis
readelf -sW huge_binary | wc -l
readelf -sW huge_binary | grep FUNC | wc -l

# Fast symbol lookup
readelf -sW library.so | grep specific_symbol

# Batch analysis of multiple files
for file in *.so; do
    echo "=== $file ==="
    readelf -h "$file" | grep Machine
    readelf -d "$file" | grep NEEDED | wc -l
done
```

#### Debugging Complex Issues
```bash
# Comprehensive binary analysis script
#!/bin/bash
binary="$1"
echo "=== Binary Analysis for $binary ==="

# Basic information
echo "File Header:"
readelf -h "$binary"

# Program headers
echo -e "\nProgram Headers:"
readelf -l "$binary"

# Required libraries
echo -e "\nRequired Libraries:"
readelf -d "$binary" | grep NEEDED

# Exported symbols
echo -e "\nExported Symbols:"
readelf -s "$binary" | grep GLOBAL

# Debug information
echo -e "\nDebug Sections:"
readelf -S "$binary" | grep debug
```

## Integration and Automation

### Shell Scripts

#### Binary Health Check Script
```bash
#!/bin/bash
# Comprehensive binary health checker

check_binary() {
    local binary="$1"
    echo "=== Checking $binary ==="

    # Check if file exists and is ELF
    if [ ! -f "$binary" ]; then
        echo "ERROR: File not found"
        return 1
    fi

    if ! readelf -h "$binary" >/dev/null 2>&1; then
        echo "ERROR: Not an ELF file"
        return 1
    fi

    # Display basic info
    echo "Architecture: $(readelf -h "$binary" | grep 'Machine:' | awk '{print $2}')"
    echo "Type: $(readelf -h "$binary" | grep 'Type:' | awk '{print $2}')"

    # Check dependencies
    echo "Dependencies:"
    readelf -d "$binary" 2>/dev/null | grep NEEDED | awk '{print "  " $5}' | tr -d ','

    # Check security features
    echo "Security features:"
    if readelf -l "$binary" 2>/dev/null | grep -q "GNU_RELRO"; then
        echo "  ✓ RELRO protection"
    fi
    if readelf -l "$binary" 2>/dev/null | grep "GNU_STACK" | grep -q "RW"; then
        echo "  ✓ NX bit enabled"
    fi

    # Check for debug symbols
    if readelf -S "$binary" 2>/dev/null | grep -q "\.debug"; then
        echo "  ✓ Debug symbols present"
    fi
}

# Usage examples
check_binary /bin/ls
check_binary /usr/bin/gcc
```

#### Library Dependency Analyzer
```bash
#!/bin/bash
# Analyze library dependencies recursively

analyze_deps() {
    local binary="$1"
    local visited="$2"

    # Mark as visited
    echo "$binary" >> "$visited"

    # Get dependencies
    readelf -d "$binary" 2>/dev/null | grep NEEDED | awk '{print $5}' | tr -d ',' | while read lib; do
        # Find library path
        lib_path=$(find /lib /usr/lib -name "$lib" 2>/dev/null | head -1)

        if [ -n "$lib_path" ] && ! grep -q "$lib_path" "$visited"; then
            echo "$binary -> $lib_path"
            analyze_deps "$lib_path" "$visited"
        fi
    done
}

# Usage
temp_file=$(mktemp)
analyze_deps "$1" "$temp_file" | sort -u
rm "$temp_file"
```

#### Binary Comparison Tool
```bash
#!/bin/bash
# Compare two binaries in detail

compare_binaries() {
    local bin1="$1"
    local bin2="$2"

    echo "=== Binary Comparison ==="
    echo "Comparing $bin1 and $bin2"
    echo

    # Compare headers
    echo "File Headers:"
    diff -u <(readelf -h "$bin1") <(readelf -h "$bin2") || true
    echo

    # Compare sections
    echo "Section Headers:"
    diff -u <(readelf -S "$bin1") <(readelf -S "$bin2") || true
    echo

    # Compare symbols
    echo "Symbol Tables:"
    diff -u <(readelf -s "$bin1") <(readelf -s "$bin2") || true
    echo

    # Compare dependencies
    echo "Dependencies:"
    diff -u <(readelf -d "$bin1") <(readelf -d "$bin2") || true
}

# Usage
compare_binaries /bin/ls /usr/bin/ls
```

## Troubleshooting

### Common Issues

#### File Not ELF Format
```bash
# Check if file is actually ELF
file myprogram
readelf -h myprogram

# Handle different file types
if file myprogram | grep -q "ELF"; then
    readelf -h myprogram
elif file myprogram | grep -q "ar archive"; then
    echo "Use 'ar t' for archive files"
elif file myprogram | grep -q "Mach-O"; then
    echo "Use 'otool' for macOS binaries"
fi
```

#### Missing Sections or Symbols
```bash
# Check if binary is stripped
readelf -S binary | grep symtab

# Check for dynamic symbols instead
readelf --dyn-syms binary

# Look for debug information separately
readelf -S binary | grep debug

# Use file command to get more info
file binary
```

#### Permission Issues
```bash
# Check file permissions
ls -la binary

# Try with different user
sudo readelf -h /usr/bin/sudo

# Check if file is accessible
test -r binary && echo "Readable" || echo "Not readable"
```

#### Large Files Performance
```bash
# Use specific options to reduce output
readelf -h binary  # Just header
readelf -d binary  # Just dynamic section

# Redirect output to files for large analysis
readelf -s binary > symbols.txt
readelf -S binary > sections.txt

# Use wide format to avoid truncation
readelf -sW binary
```

## Related Commands

- [`objdump`](/docs/commands/development/objdump) - Display information from object files
- [`nm`](/docs/commands/development/nm) - List symbols from object files
- [`ldd`](/docs/commands/other/ldd) - Print shared library dependencies
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`strings`](/docs/commands/file-management/strings) - Find printable strings in files
- [`hexdump`](/docs/commands/file-management/hexdump) - Display file contents in hexadecimal
- [`od`](/docs/commands/file-management/od) - Octal dump of files
- [`size`](/docs/commands/other/size) - List section sizes and total size
- [`strip`](/docs/commands/development/strip) - Remove symbols from object files
- [`ar`](/docs/commands/other/ar) - Create, modify, and extract from archives

## Best Practices

1. **Always start with `-h`** to verify file type and architecture before detailed analysis
2. **Use `-W` (wide) option** for complex output to avoid truncation
3. **Combine multiple options** like `-e` for comprehensive analysis
4. **Pipe output to `grep`** for filtering specific information
5. **Use `-d` option** to check library dependencies for deployment
6. **Verify debug symbols** with `-S` and grep for debug sections
7. **Check security features** using `-l` for program headers
8. **Use `-s` with `-W`** for better symbol table readability
9. **Redirect output to files** for large binaries analysis
10. **Always confirm file type** with `file` command before using readelf

## Performance Tips

1. **Use specific options** instead of `-e` when you need only certain information
2. **Redirect large outputs** to files to avoid console limitations
3. **Use `-W` option** to prevent output truncation and re-run commands
4. **Process multiple files** efficiently using shell loops or xargs
5. **Cache readelf output** for frequently analyzed binaries
6. **Use `grep` filters** to extract only needed information
7. **Avoid analyzing entire system** unnecessarily; focus on specific files
8. **Use parallel processing** for analyzing multiple independent files
9. **Consider using `objdump`** for certain analysis tasks that might be faster
10. **Limit symbol analysis** to specific sections when dealing with large symbol tables

The `readelf` command is an indispensable tool for anyone working with ELF binaries. Its comprehensive set of options allows for detailed analysis of executable files, shared libraries, and object files, making it essential for debugging, security analysis, and system administration tasks involving binary files.