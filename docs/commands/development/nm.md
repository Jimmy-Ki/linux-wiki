---
title: nm - List symbols from object files
sidebar_label: nm
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nm - List symbols from object files

The `nm` command is a powerful symbol table examination tool that displays symbol information from object files, executable files, and libraries. It's an essential utility for developers, system programmers, and debuggers who need to analyze compiled code, understand program structure, debug linking issues, and inspect symbol visibility. nm can decode symbols from various file formats including ELF, COFF, and a.out, providing detailed information about symbol types, addresses, sizes, and binding attributes.

## Basic Syntax

```bash
nm [OPTIONS] [FILE...]
```

## Common Options

### Output Format Options
- `-a, --debug-syms` - Display debugger-only symbols
- `-g, --extern-only` - Display only external symbols
- `-B` - Use BSD output format (default)
- `-P, --portability` - Use POSIX output format
- `-f FORMAT` - Use specified output format (bsd, sysv, posix)

### Symbol Type Selection
- `--defined-only` - Display only defined symbols
- `--undefined-only` - Display only undefined symbols
- `--dynamic` - Display dynamic symbols
- `--special-syms` - Display special symbols

### Output Control
- `-C, --demangle` - Decode low-level symbol names into user-level names
- `-l, --line-numbers` - Use debugging information to find filename and line numbers
- `-n, --numeric-sort` - Sort symbols numerically by address
- `-p, --no-sort` - Do not sort the symbols
- `-r, --reverse-sort` - Reverse the sort order
- `-S, --print-size` - Print size of defined symbols
- `-s, --print-armap` - Include index for symbols from archive members

### Target Specific
- `-A, --print-file-name` - Print name of the input file before every symbol
- `-o, --print-file-name` - Same as -A
- `-u, --undefined-only` - Display only undefined symbols

## Symbol Types

| Symbol | Description |
|--------|-------------|
| `T` | Text section symbol (global function) |
| `t` | Text section symbol (local function) |
| `D` | Data section symbol (global variable) |
| `d` | Data section symbol (local variable) |
| `B` | BSS section symbol (global uninitialized data) |
| `b` | BSS section symbol (local uninitialized data) |
| `W` | Weak symbol (global) |
| `w` | Weak symbol (local) |
| `U` | Undefined symbol |
| `N` | Debugging symbol |
| `R` | Read-only data symbol |
| `r` | Read-only data symbol (local) |
| `V` | Weak object symbol (global) |
| `v` | Weak object symbol (local) |
| `I` | Indirect function symbol |
| `i` | Indirect function symbol (local) |

## Usage Examples

### Basic Symbol Listing

#### Viewing All Symbols
```bash
# List all symbols in an object file
nm object_file.o

# List symbols in an executable
nm /usr/bin/ls

# List symbols in a shared library
nm /lib/x86_64-linux-gnu/libc.so.6
```

#### Basic Symbol Analysis
```bash
# List symbols with file name prefix
nm -A program

# Show only external symbols
nm -g library.a

# Display only undefined symbols
nm -u program.o
```

### Sorting and Filtering

#### Sorting Symbols
```bash
# Sort symbols by address (numeric)
nm -n program

# Sort symbols alphabetically (default)
nm program

# Reverse sort order
nm -r program

# No sorting (preserve original order)
nm -p program
```

#### Filtering by Type
```bash
# Show only defined symbols
nm --defined-only program

# Show only undefined symbols
nm --undefined-only program

# Show only global symbols
nm -g program

# Show only dynamic symbols
nm --dynamic shared_library.so
```

### Advanced Symbol Analysis

#### Demangled C++ Symbols
```bash
# Demangle C++ symbol names
nm -C program_cpp

# Demangle and sort by address
nm -C -n program_cpp

# Show demangled symbols with sizes
nm -C -S program_cpp
```

#### Debug Information
```bash
# Include debugging symbols
nm -a program

# Show line numbers for symbols
nm -l program_debug

# Show archive member index
nm -s static_library.a
```

#### Size and Format Analysis
```bash
# Print symbol sizes
nm -S program

# Use POSIX output format
nm -P program

# Use System V output format
nm -f sysv program
```

## Practical Examples

### Development Workflow

#### Library Development
```bash
# Analyze exported symbols from a shared library
nm -D -g my_library.so

# Check for undefined symbols in an object file
nm -u module.o

# Compare symbol tables between builds
nm -S old_build.o > old_symbols.txt
nm -S new_build.o > new_symbols.txt
diff old_symbols.txt new_symbols.txt

# Analyze static library contents
nm -s static_library.a
```

#### Debugging Linking Issues
```bash
# Find undefined symbols causing link errors
nm -u program.o | grep ' U '

# Check for duplicate symbols
nm -S *.o | awk '{print $3}' | sort | uniq -d

# Verify symbol visibility
nm -D shared_lib.so | grep ' T '

# Find symbols that should be static
nm object_file.o | grep ' [A-Z] '
```

#### Code Analysis
```bash
# Find all global variables
nm program | grep ' [DdBbVv] '

# Find all global functions
nm program | grep ' [TtWw] '

# Check library dependencies
nm -u program | grep ' U '

# Analyze binary size contribution
nm -S --size-sort program
```

### Performance and Memory Analysis

#### Memory Layout Analysis
```bash
# Analyze BSS segment usage
nm program | grep ' [bB] '

# Find large static variables
nm -S program | grep ' [DdBb] ' | awk '$3 > 1024 {print}'

# Check for symbol alignment waste
nm -S program | awk '{print $3, $4}' | sort -n

# Analyze function sizes
nm -S program | grep ' [TtWw] ' | sort -k3 -n
```

#### Optimization Analysis
```bash
# Find unused static functions (requires debugging info)
nm -l program.o | grep ' [t] '

# Check for weak symbols optimization opportunities
nm program | grep ' [Ww] '

# Analyze inline function expansion
nm -C program | grep ' _Z'  # C++ mangled symbols
```

## Advanced Usage

### Cross-Platform Development

#### Format Conversions
```bash
# Compare symbols across different object formats
nm -f bsd object.o
nm -f sysv object.o
nm -f posix object.o

# Convert between symbol formats
nm -P object.o | awk '{printf "%-16s %s %s\n", $1, $2, $3}'

# Create symbol map files
nm -C -n program > symbol_map.txt
```

#### Build System Integration
```bash
# Generate symbol lists for documentation
nm -D -g lib*.so > exported_symbols.txt

# Create version script from symbol analysis
nm -D -g library.so | awk '{print $3}' | sed 's/^/    /; s/$/;/' > lib.version

# Check ABI compatibility between versions
nm -D -g lib_v1.so > v1_symbols.txt
nm -D -g lib_v2.so > v2_symbols.txt
diff v1_symbols.txt v2_symbols.txt
```

### Security Analysis

#### Symbol Information Leakage
```bash
# Find potentially sensitive symbol names
nm -C program | grep -i -E '(password|key|secret|token)'

# Check for debug symbols in release builds
nm -a release_binary | grep -i debug

# Analyze exported symbols in security libraries
nm -D crypto_library.so | grep ' [A-Z] '
```

#### Binary Hardening
```bash
# Check for stack canary symbols
nm program | grep -E '(stack_chk|__stack_chk)'

# Verify position-independent code symbols
nm -D pic_library.so | grep -E '(PIC|PIE)'

# Analyze RELRO protection symbols
nm program | grep -E '(relro|_init|_fini)'
```

## Shell Scripting and Automation

### Symbol Analysis Scripts

#### Comprehensive Symbol Report
```bash
#!/bin/bash
# Generate comprehensive symbol analysis report

input_file="$1"
output_file="${input_file%.*}_symbol_report.txt"

{
    echo "=== Symbol Analysis Report for $input_file ==="
    echo "Generated on: $(date)"
    echo ""

    echo "=== File Information ==="
    file "$input_file"
    echo ""

    echo "=== Symbol Summary ==="
    echo "Total symbols: $(nm "$input_file" | wc -l)"
    echo "Global symbols: $(nm -g "$input_file" | wc -l)"
    echo "Undefined symbols: $(nm -u "$input_file" | wc -l)"
    echo "Debug symbols: $(nm -a "$input_file" | grep -c ' N ')"
    echo ""

    echo "=== Symbol Types Distribution ==="
    nm "$input_file" | awk '{print $2}' | sort | uniq -c | sort -nr
    echo ""

    echo "=== Largest Symbols ==="
    nm -S "$input_file" | grep ' [TtDdBb] ' | sort -k3 -nr | head -10
    echo ""

    echo "=== Global Functions ==="
    nm -C "$input_file" | grep ' [TtWw] ' | awk '{print $3}' | sort
    echo ""

    echo "=== Global Variables ==="
    nm -C "$input_file" | grep ' [DdBbVv] ' | awk '{print $3}' | sort

} > "$output_file"

echo "Symbol report saved to: $output_file"
```

#### Library Compatibility Checker
```bash
#!/bin/bash
# Check library API compatibility

old_lib="$1"
new_lib="$2"

if [ $# -ne 2 ]; then
    echo "Usage: $0 <old_library> <new_library>"
    exit 1
fi

echo "=== Library Compatibility Analysis ==="
echo "Comparing $old_lib (old) with $new_lib (new)"
echo ""

# Extract symbols
nm -D -g "$old_lib" | awk '{print $3}' | sort > old_symbols.txt
nm -D -g "$new_lib" | awk '{print $3}' | sort > new_symbols.txt

# Check for removed symbols
echo "=== REMOVED SYMBOLS (INCOMPATIBLE) ==="
comm -23 old_symbols.txt new_symbols.txt
echo ""

# Check for added symbols
echo "=== ADDED SYMBOLS (USUALLY SAFE) ==="
comm -13 old_symbols.txt new_symbols.txt
echo ""

# Check for common symbols
echo "=== COMMON SYMBOLS ==="
comm -12 old_symbols.txt new_symbols.txt | wc -l
echo ""

# Cleanup
rm -f old_symbols.txt new_symbols.txt

echo "Compatibility analysis complete."
```

### Build Integration

#### Makefile Integration
```makefile
# Symbol analysis targets
symbols: $(TARGET)
	@echo "Generating symbol analysis for $(TARGET)..."
	nm -C -n $(TARGET) > $(TARGET).symbols
	nm -S $(TARGET) | sort -k3 -nr > $(TARGET).sizes

check-symbols: $(TARGET)
	@echo "Checking for undefined symbols..."
	nm -u $(TARGET) | grep ' U ' && exit 1 || echo "No undefined symbols found"

exported-symbols: $(SHARED_LIB)
	@echo "Listing exported symbols from $(SHARED_LIB)..."
	nm -D -g $(SHARED_LIB) | awk '{print $$3}' > $(SHARED_LIB).exported

.PHONY: symbols check-symbols exported-symbols
```

## Troubleshooting

### Common Issues

#### File Format Errors
```bash
# File not recognized
nm: file.o: File format not recognized
# Solution: Check if file is actually an object file
file object.o
# Use appropriate tool for different file types
readelf -s executable  # for ELF files
objdump -t executable  # alternative tool
```

#### Permission Issues
```bash
# Permission denied
nm: /usr/bin/suid_program: Permission denied
# Solution: Use appropriate privileges or copy file
sudo nm /usr/bin/suid_program
# Or copy and analyze
cp /usr/bin/suid_program /tmp/ && nm /tmp/suid_program
```

#### Symbol Not Found
```bash
# No symbols found
nm: stripped_binary: no symbols
# Solution: Check if binary is stripped
file stripped_binary
# Look for debug symbols separately
nm --debug-syms binary.debug
```

#### Demangling Errors
```bash
# C++ demangling issues
nm: failed to demangle symbol
# Solution: Use different demangling options
nm -C --demangle=auto program
nm -C --demangle=gnu-v3 program_cpp
# Use c++filt directly
nm program_cpp | c++filt
```

### Performance Issues

#### Large Files
```bash
# Processing very large object files
# Solution: Use filtering options
nm -g -u large_library.so  # only global and undefined symbols
nm --defined-only program  # only defined symbols

# Process in parallel
find . -name "*.o" -print0 | xargs -0 -P4 -I{} nm -A {} > all_symbols.txt
```

#### Memory Usage
```bash
# Out of memory with huge symbol tables
# Solution: Process incrementally
nm -u program.o > undefined.txt
nm -g program.o > global.txt

# Use streaming approach
nm program | awk '{print $0; fflush()}' | while read line; do
    # Process each symbol individually
done
```

## Related Commands

- [`objdump`](/docs/commands/development/objdump) - Display information from object files
- [`readelf`](/docs/commands/development/readelf) - Display information about ELF files
- [`c++filt`](/docs/commands/development/cfilt) - Filter to demangle C++ symbols
- [`ldd`](/docs/commands/development/ldd) - Print shared object dependencies
- [`strings`](/docs/commands/development/strings) - Find printable strings in files
- [`size`](/docs/commands/development/size) - List section sizes and total size
- [`strip`](/docs/commands/development/strip) - Discard symbols from object files
- [`ar`](/docs/commands/development/ar) - Create, modify, and extract from archives

## Best Practices

1. **Use demangling** (-C) for C++ code to improve readability
2. **Filter appropriately** with -g for externals or -u for undefined symbols
3. **Sort numerically** (-n) when analyzing memory layout
4. **Show file names** (-A) when processing multiple files
5. **Include sizes** (-S) for memory usage analysis
6. **Use debugging symbols** (-a) for comprehensive analysis
7. **Compare builds** systematically for regression testing
8. **Document symbol interfaces** using nm output for API specifications
9. **Monitor symbol growth** during development to prevent bloat
10. **Use nm in CI/CD** pipelines for binary analysis and quality checks

## Performance Tips

1. **Filter early** with -g, -u, or --defined-only to reduce processing
2. **Sort only when needed** -p flag preserves original order for speed
3. **Process large archives** with -s to get index first
4. **Use appropriate format** -P for script processing, -f sysv for detailed info
5. **Parallel processing** for multiple files using xargs
6. **Cache symbol tables** for frequently analyzed libraries
7. **Combine with grep** for specific symbol patterns
8. **Use streaming** for very large symbol tables to avoid memory issues

The `nm` command is an indispensable tool for low-level programming, debugging, and system analysis. Its ability to reveal the inner structure of compiled code makes it essential for understanding program behavior, diagnosing linking problems, and optimizing binary layouts. Whether you're developing libraries, analyzing security, or debugging complex linking issues, nm provides the visibility needed to work effectively at the symbol level.