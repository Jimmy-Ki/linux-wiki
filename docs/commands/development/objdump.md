---
title: objdump - Display information from object files
sidebar_label: objdump
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# objdump - Display information from object files

The `objdump` command is a powerful utility for displaying information about object files, including executable files, shared libraries, and relocatable object files. It's part of the GNU Binutils package and provides detailed insights into binary file structure, assembly code, symbol tables, debugging information, and more. Objdump is essential for reverse engineering, debugging, performance analysis, and understanding low-level program behavior. It supports multiple object file formats including ELF, COFF, and a.out, making it versatile across different Unix-like systems.

## Basic Syntax

```bash
objdump [OPTIONS] [FILE...]
```

## Common Options

### Information Display Options
- `-a, --archive-headers` - Display archive header information
- `-f, --file-headers` - Display file header information
- `-h, --section-headers` - Display section headers
- `-x, --all-headers` - Display all available headers
- `-p, --private-headers` - Display object format specific headers

### Disassembly Options
- `-d, --disassemble` - Disassemble executable sections
- `-D, --disassemble-all` - Disassemble all sections
- `-S, --source` - Integrate source code with disassembly
- `-M, --disassembler-options=[options]` - Pass options to disassembler
- `-z, --disassemble-zeroes` - Do not skip sections of zeroes

### Symbol and Debug Information
- `-t, --syms` - Display symbol table
- `-T, --dynamic-syms` - Display dynamic symbol table
- `-r, --reloc` - Display relocation entries
- `-R, --dynamic-reloc` - Display dynamic relocation entries
- `-g, --debugging` - Display debugging information
- `-e, --debugging-tags` - Display debugging tags

### Output Control
- `-C, --demangle` - Decode mangled/processed symbol names
- `-w, --wide` - Wide output format (don't wrap lines)
- `-l, --line-numbers` - Include line numbers in output
- `-P, --private=[options]` - Display format-specific contents
- `-j, --section=[section]` - Only display information for specified section

### Target and Architecture
- `-b, --target=[target]` - Specify object code format
- `-m, --architecture=[architecture]` - Specify architecture
- `-EB, --endian=big` - Assume big endian format
- `-EL, --endian=little` - Assume little endian format

## Usage Examples

### Basic File Information

#### File Headers and Archive Information
```bash
# Display complete file header information
objdump -f program

# Show archive headers for static libraries
objdump -a libstatic.a

# Display all headers in one command
objdump -x executable

# Show section headers only
objdump -h shared_library.so

# Display private format-specific headers
objdump -p program
```

#### Symbol Table Analysis
```bash
# Display symbol table
objdump -t program

# Show dynamic symbols (for shared libraries)
objdump -T shared_library.so

# Display demangled C++ symbols
objdump -C -t program

# Combine with file headers
objdump -f -t program

# Show symbols for specific sections only
objdump -j .text -t program
```

### Disassembly and Code Analysis

#### Basic Disassembly
```bash
# Disassemble executable sections
objdump -d program

# Disassemble all sections including data
objdump -D program

# Disassemble with line numbers
objdump -d -l program

# Wide format output (no line wrapping)
objdump -d -w program

# Disassemble with source code integration
objdump -S program
```

#### Advanced Disassembly
```bash
# Disassemble specific section
objdump -d -j .text program

# Disassemble with Intel syntax (x86/x64)
objdump -d -M intel program

# Disassemble with ATT syntax (default for x86/x64)
objdump -d -M att program

# Show all instructions including zero bytes
objdump -D -z program

# Disassemble with source and line numbers
objdump -d -S -l program
```

### Relocation and Debug Information

#### Relocation Analysis
```bash
# Display relocation entries
objdump -r object_file.o

# Show dynamic relocations
objdump -R shared_library.so

# Display both static and dynamic relocations
objdump -r -R program

# Wide format for better readability
objdump -r -w object_file.o
```

#### Debugging Information
```bash
# Display debugging information
objdump -g debug_program

# Show debugging tags
objdump -e debug_program

# Combine disassembly with debug info
objdump -d -g debug_program
```

### Cross-Platform and Multi-Architecture

#### Different File Formats
```bash
# Specify target format
objdump -b pe32 -x windows_executable.exe

# Display COFF headers
objdump -b coff -f windows_obj.obj

# Work with Mach-O files (macOS)
objdump -b mach-o -x mac_program
```

#### Architecture-Specific Analysis
```bash
# Specify ARM architecture
objdump -m arm -d arm_program

# Specify PowerPC architecture
objdump -m powerpc -d ppc_program

# Specify MIPS architecture
objdump -m mips -d mips_program

# Force big endian interpretation
objdump -EB -d program

# Force little endian interpretation
objdump -EL -d program
```

## Practical Examples

### Software Development

#### Binary Analysis and Debugging
```bash
# Quick overview of executable structure
objdump -x program

# Find all functions in the binary
objdump -t program | grep " F "

# Disassemble main function
objdump -d program | grep -A 50 "main>:"

# Search for specific assembly patterns
objdump -d program | grep -i "mov.*eax"

# Analyze stack usage in functions
objdump -d -l program | grep -E "(push|sub.*esp)"
```

#### Library Analysis
```bash
# List all exported functions from shared library
objdump -T libmath.so | grep -v " UND "

# Show library dependencies
objdump -p program | grep NEEDED

# Display dynamic relocations
objdump -R program

# Find which library provides a symbol
objdump -T /usr/lib/*.so | grep "function_name"

# Analyze library version information
objdump -p library.so | grep -E "(SONAME|NEEDED)"
```

#### Performance Analysis
```bash
# Count total instructions in program
objdump -d program | grep -c "^[ ]*[0-9a-f]*:"

# Find hot spots by analyzing function sizes
objdump -h program | grep -E "\.text|\.data"

# Analyze branch instructions
objdump -d program | grep -E "(jmp|call|ret)"

# Count different instruction types
objdump -d program | awk '{print $2}' | sort | uniq -c | sort -nr

# Find large functions for optimization
objdump -d program | awk '/^[0-9a-f]+ <.*>:/ {if(NR>1) print size; size=0; name=$0} {size+=getline} END {print size}'
```

### Security and Reverse Engineering

#### Malware Analysis
```bash
# Display all strings in executable
objdump -s -j .rodata program | strings

# Find suspicious API calls
objdump -d program | grep -i "call.*0x"

# Analyze encryption functions
objdump -d program | grep -E "(xor|rol|ror|shr|shl)"

# Show program entry point
objdump -f program | grep "start address"

# Find hardcoded addresses
objdump -d program | grep -E "0x[0-9a-f]{8}"
```

#### Binary Hardening Analysis
```bash
# Check for security protections
objdump -p program | grep -E "(RELRO|BIND_NOW|PIE)"

# Find stack canaries
objdump -d program | grep -E "(gs:|fs:)"

# Analyze NX bit usage
objdump -h program | grep -E "\.text|\.data.*WA"

# Check for position-independent code
objdump -d program | grep -E "(RIP|EIP)-relative"

# Find format string vulnerabilities
objdump -s -j .rodata program | grep -E "%[0-9]*\\$|%(s|n|x)"
```

### System Administration

#### Binary Compatibility
```bash
# Check library architecture compatibility
objdump -f program
objdump -f library.so

# Verify ABI version
objdump -p program | grep -E "(OSABI|ABIVERSION)"

# Check symbol versioning
objdump -T library.so | grep -E "@@"

# Analyze binary for security updates
objdump -p program | grep -E "(RUNPATH|RPATH)"

# Check for required GLIBC version
objdump -T program | grep -E "GLIBC_[0-9]"
```

#### System Debugging
```bash
# Analyze core dump files
objdump -f core_file

# Find crash locations in executables
objdump -d -l program | grep -E "(segfault|crash)"

# Check for memory layout information
objdump -h program

# Analyze stack usage
objdump -d program | grep -E "(add.*esp|sub.*esp)"

# Verify binary integrity
objdump -s -j .text program | md5sum
```

## Advanced Usage

### Custom Disassembly

#### Processor-Specific Options
```bash
# ARM disassembly with specific CPU
objdump -m arm -M armv5t -d arm_binary

# x86 with specific instruction set
objdump -m i386 -M i386,sse2 -d program

# PowerPC with Book E extensions
objdump -m powerpc -M booke -d ppc_program

# MIPS with specific ISA
objdump -m mips -M mips32r2 -d mips_binary
```

#### Advanced Output Formatting
```bash
# Create annotated assembly with source
objdump -d -S -l program > annotated.asm

# Generate disassembly for analysis scripts
objdump -d program | grep -v "^\s*$" > clean.asm

# Extract specific function disassembly
objdump -d program | awk '/<main>:/,/<.*>:/{if(!/<.*>:/)print}'

# Create binary fingerprint
objdump -d program | md5sum
```

### Automation and Scripting

#### Batch Analysis
```bash
# Analyze all executables in directory
for file in *.exe; do
    echo "Analyzing $file:"
    objdump -f "$file" | head -5
    echo "---"
done

# Create summary of all binaries
for bin in $(find . -type f -executable); do
    echo "$bin: $(objdump -f "$bin" | grep 'file format')"
done

# Extract all symbols from shared libraries
for lib in *.so; do
    objdump -T "$lib" | grep -v " UND " | cut -d' ' -f1
done
```

#### Security Scanning
```bash
# Find potentially dangerous functions
objdump -T program | grep -E "(system|exec|strcpy|sprintf)"

# Check for weak cryptography
objdump -s -j .rodata program | strings | grep -i -E "(md5|des|rc4)"

# Find hardcoded credentials
objdump -s -j .data program | strings | grep -E "(password|key|secret)"

# Analyze control flow for obfuscation
objdump -d program | grep -E "(jmp.*\*|call.*\*)"
```

## Special Operations

### Binary Patching and Modification

#### Find and Replace Patterns
```bash
# Find all occurrences of specific byte pattern
objdump -s program | grep -A2 -B2 "deadbeef"

# Extract shellcode from binary
objdump -d program | grep -E "^[ ]*[0-9a-f]*:" | cut -d: -f2 | tr -d ' \t'

# Find NOP sleds for exploit analysis
objdump -d program | grep -E "90|nop"

# Analyze function prologues/epilogues
objdump -d program | grep -E "(push.*ebp|mov.*ebp.*esp|pop.*ebp|ret)"
```

#### Binary Diffing
```bash
# Compare two versions of binary
objdump -d program_v1 > disasm1.txt
objdump -d program_v2 > disasm2.txt
diff disasm1.txt disasm2.txt

# Find differences in symbols
objdump -t program_v1 | grep -v " UND " > syms1.txt
objdump -t program_v2 | grep -v " UND " > syms2.txt
diff syms1.txt syms2.txt

# Compare section layouts
objdump -h program_v1 | head -10
objdump -h program_v2 | head -10
```

### Cross-Platform Analysis

#### Windows Binary Analysis
```bash
# Analyze PE32 executables on Linux
objdump -b pe32 -x program.exe

# Show PE header information
objdump -b pe32 -p program.exe | head -20

# Display import table
objdump -b pe32 -p program.exe | grep -A10 "Import Table"

# Show export table
objdump -b pe32 -p program.exe | grep -A10 "Export Table"
```

#### Embedded Systems
```bash
# Analyze raw binary files
objdump -b binary -m arm -D firmware.bin

# Disassemble with custom origin address
objdump -b binary -m i386 --adjust-vma=0x10000 -D bootloader.bin

# Analyze big-endian binaries
objdump -b binary -m powerpc -EB -D bigendian.bin

# Work with Intel HEX files
objdump -b ihex -I ihex program.hex
```

## Integration and Automation

### Development Workflows

#### Build System Integration
```bash
# Generate disassembly for all build artifacts
find build/ -name "*.o" -exec objdump -d -S {} \; > disassembly.txt

# Create symbol map for debugging
objdump -t program | grep -E " [TDBS] " > symbol_map.txt

# Verify build reproducibility
objdump -d program | shasum > build_fingerprint.txt

# Check for unintended symbols in release builds
objdump -t program | grep -E " [dgs] " | grep -v "_Z"
```

#### Continuous Integration
```bash
#!/bin/bash
# Binary analysis CI script

ARTIFACT="$1"
REPORT_FILE="binary_analysis_report.txt"

echo "Binary Analysis Report for $ARTIFACT" > "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "================================" >> "$REPORT_FILE"

# File information
echo -e "\n## File Information" >> "$REPORT_FILE"
objdump -f "$ARTIFACT" >> "$REPORT_FILE"

# Security checks
echo -e "\n## Security Analysis" >> "$REPORT_FILE"
echo "RELRO:" >> "$REPORT_FILE"
objdump -p "$ARTIFACT" | grep -E "(BIND_NOW|RELRO)" || echo "No RELRO found" >> "$REPORT_FILE"

echo -e "\nStack Protection:" >> "$REPORT_FILE"
objdump -d "$ARTIFACT" | grep -q "gs:0x14" && echo "Stack canary found" || echo "No stack canary" >> "$REPORT_FILE"

# Size analysis
echo -e "\n## Size Analysis" >> "$REPORT_FILE"
objdump -h "$ARTIFACT" | grep -E "\.text|\.data|\.bss" >> "$REPORT_FILE"

echo "Analysis complete: $REPORT_FILE"
```

### Monitoring and Maintenance

#### Binary Health Monitoring
```bash
#!/bin/bash
# Monitor binary integrity over time

BINARY_PATH="/usr/bin/important_program"
LOG_FILE="/var/log/binary_integrity.log"
CHECKSUM_FILE="/var/log/binary_checksums.txt"

# Calculate current checksum
CURRENT_CHECKSUM=$(objdump -s -j .text "$BINARY_PATH" | sha256sum)
DATE=$(date +%Y-%m-%d_%H:%M:%S)

# Read previous checksum
if [ -f "$CHECKSUM_FILE" ]; then
    PREV_CHECKSUM=$(tail -1 "$CHECKSUM_FILE" | cut -d' ' -f1)

    if [ "$CURRENT_CHECKSUM" != "$PREV_CHECKSUM" ]; then
        echo "$DATE: WARNING - Binary checksum changed!" >> "$LOG_FILE"
        echo "$DATE: Previous: $PREV_CHECKSUM" >> "$LOG_FILE"
        echo "$DATE: Current:  $CURRENT_CHECKSUM" >> "$LOG_FILE"
    else
        echo "$DATE: Binary integrity verified" >> "$LOG_FILE"
    fi
fi

# Store new checksum
echo "$CURRENT_CHECKSUM $DATE" >> "$CHECKSUM_FILE"
```

## Troubleshooting

### Common Issues

#### File Format Errors
```bash
# Unknown file type error
# Solution: Specify correct file format
objdump -b pe32 windows_program.exe
objdump -b mach-o mac_program
objdump -b a.out legacy_program

# Architecture mismatch error
# Solution: Specify correct architecture
objdump -m arm arm_program
objdump -m mips mips_binary

# Endianness issues
# Solution: Specify correct endianness
objdump -EB program_big_endian
objdump -EL program_little_endian
```

#### Large File Handling
```bash
# Out of memory errors
# Solution: Process specific sections only
objdump -d -j .text huge_program

# Use wide format to reduce memory usage
objdump -d -w program

# Output to file instead of terminal
objdump -D program > disassembly.txt
```

#### Symbol Resolution
```bash
# Mangled C++ symbols
# Solution: Use demangling
objdump -C -t program

# Missing symbols
# Solution: Check dynamic symbols
objdump -T shared_library.so

# Symbol lookup failures
# Solution: Use correct symbol table
objdump --syms program
```

### Performance Optimization

#### Faster Analysis
```bash
# Only analyze specific sections
objdump -d -j .text program

# Use wide output for better performance
objdump -d -w program

# Limit output with grep
objdump -d program | grep "function_name"

# Use multiple processes for batch analysis
for file in *.o; do
    objdump -d "$file" > "${file}.disasm" &
done
wait
```

#### Memory Optimization
```bash
# Process files one at a time
find . -name "*.o" -exec objdump -h {} \;

# Use temporary files for large outputs
objdump -D program > /tmp/disasm.tmp && mv /tmp/disasm.asm .

# Stream processing for huge files
objdump -d huge_program | less
```

## Related Commands

- [`nm`](/docs/commands/development/nm) - List symbols from object files
- [`readelf`](/docs/commands/development/readelf) - Display information about ELF files
- [`gdb`](/docs/commands/development/gdb) - GNU Debugger for binary analysis
- [`ldd`](/docs/commands/development/ldd) - Print shared library dependencies
- [`strings`](/docs/commands/file-management/strings) - Extract printable strings from files
- [`hexdump`](/docs/commands/file-management/hexdump) - Display file contents in hexadecimal
- [`file`](/docs/commands/file-management/file) - Determine file type and encoding
- [`ar`](/docs/commands/other-tools/ar) - Create, modify, and extract from archives

## Best Practices

1. **Use appropriate options** for your analysis goals (`-d` for disassembly, `-t` for symbols, `-h` for headers)
2. **Combine with grep** to find specific patterns or functions in large binaries
3. **Save output to files** when analyzing large programs to avoid terminal buffer limits
4. **Use source code integration** (`-S`) when debugging compiled programs with debug symbols
5. **Specify architecture** (`-m`) and file format (`-b`) when objdump cannot auto-detect
6. **Use wide output** (`-w`) for better readability of long assembly lines
7. **Demangle C++ symbols** (`-C`) for better readability of C++ programs
8. **Analyze specific sections** (`-j`) to focus on relevant parts of the binary
9. **Use pipe and redirection** for automated analysis and report generation
10. **Cross-reference with source code** when available for better understanding

## Performance Tips

1. **Section-specific analysis** is faster than disassembling entire binaries
2. **Symbol table analysis** (`-t`) is much faster than full disassembly
3. **Wide output** reduces processing overhead for line wrapping
4. **Output redirection** prevents terminal rendering slowdowns
5. **Parallel processing** of multiple files using background jobs
6. **Limited grep filtering** reduces memory usage for large files
7. **Architecture specification** prevents auto-detection overhead
8. **File format specification** avoids format detection delays
9. **Pipe directly to other tools** instead of intermediate files when possible
10. **Use incremental analysis** for very large programs, focusing on suspicious areas first

The `objdump` command is an indispensable tool for binary analysis, reverse engineering, and debugging. Its comprehensive feature set and support for multiple architectures make it essential for developers, security researchers, and system administrators working with low-level code analysis. Understanding objdump's capabilities and options enables deep insight into binary program structure and behavior.