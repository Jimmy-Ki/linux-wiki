---
title: ld - GNU Linker
sidebar_label: ld
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ld - GNU Linker

The `ld` command is the GNU linker, a crucial tool in the compilation process that combines object files and libraries to create executable programs or shared libraries. The linker resolves symbol references, performs address relocation, and constructs the final executable image with proper memory layout.

## Basic Syntax

```bash
ld [options] [-o outputfile] objfile...
ld [options] [--output=outputfile] objfile...
```

## Common Options

### Output Control
- `-o `` - Set output filename
- `-r` - Generate relocatable output (partial linking)
- `-s` - Strip all symbols from output
- `-S` - Strip debugger symbols
- `-x` - Strip local symbols
- `-X` - Remove temporary local symbols

### Search Paths and Libraries
- `-L <path>` - Add directory to library search path
- `-l <library_name>` - Link with library (searches for lib[library_name].so or lib[library_name].a)
- `-Bstatic` - Prefer static libraries
- `-Bdynamic` - Prefer shared libraries
- `-as-needed` - Only link libraries that provide undefined symbols
- `-no-as-needed` - Link all specified libraries

### Symbol Handling
- `-u <symbol>` - Force symbol to be entered in output file
- `-e <symbol>` - Use symbol as program entry point (default: _start)
- `--defsym <symbol>=<value>` - Define symbol
- `--allow-multiple-definition` - Allow multiple definitions
- `--no-undefined` - Report unresolved symbol references

### Architecture and Format
- `-m <emulation>` - Set linker emulation
- `--format=<format>` - Specify input format
- `-b <format>` - Specify object format
- `--oformat=<format>` - Specify output format

### Section Management
- `--section-start=<section>=<addr>` - Set section address
- `-T <script>` - Read linker script
- `-Ttext=<addr>` - Set text section address
`-Tdata=<addr>` - Set data section address
`-Tbss=<addr>` - Set BSS section address

### Debugging and Information
- `-t` - Print names of input files as processed
- `-v` - Print version information
- `--verbose` - Verbose output
- `--trace` - Trace file processing
- `--print-map` - Print link map
- `--cref` - Output cross-reference table

## Linker Scripts

### Basic Linker Script Structure
```ld
/* Basic linker script */
OUTPUT_FORMAT(elf64-x86-64)
ENTRY(_start)

SECTIONS
{
    . = 0x400000;    /* Starting address */

    .text : {
        *(.text)     /* All text sections */
    }

    .data : {
        *(.data)     /* All data sections */
    }

    .bss : {
        *(.bss)      /* All BSS sections */
    }
}
```

### Memory Regions
```ld
MEMORY
{
    RAM (rwx) : ORIGIN = 0x80000000, LENGTH = 64M
    FLASH (rx) : ORIGIN = 0x00000000, LENGTH = 256K
}

SECTIONS
{
    .text : {
        *(.text)
    } > FLASH

    .data : {
        *(.data)
    } > RAM AT > FLASH

    .bss : {
        *(.bss)
    } > RAM
}
```

## Usage Examples

### Basic Linking
```bash
# Simple object file linking
ld -o program main.o utils.o file.o

# Link with C library
ld -o program /lib/crt0.o main.o -lc

# Link with math library
ld -o program main.o -lm

# Multiple libraries
ld -o program main.o utils.o -lm -lpthread -lrt
```

### Library Search Paths
```bash
# Add custom library path
ld -o program main.o -L./lib -lmylib

# Multiple search paths
ld -o program main.o -L/usr/local/lib -L./lib -lmylib

# System library paths
ld -o program main.o -L/usr/lib -L/lib -lssl -lcrypto
```

### Static vs Dynamic Linking
```bash
# Static linking
ld -static -o program main.o -lc -lm

# Dynamic linking (default)
ld -o program main.o -lc -lm

# Prefer static for specific libraries
ld -Bstatic -o program main.o -lssl -lcrypto -Bdynamic -lpthread
```

### Entry Point and Symbols
```bash
# Custom entry point
ld -e my_main -o program main.o

# Define symbols
ld --defsym=VERSION=123 -o program main.o

# Force symbol inclusion
ld -u unused_function -o program main.o
```

### Section Control
```bash
# Custom section addresses
ld -Ttext=0x8048000 -Tdata=0x8049000 -o program main.o

# Use custom linker script
ld -T custom_script.ld -o program main.o

# Specify section start
ld --section-start=.text=0x1000 -o program main.o
```

### Output Format Control
```bash
# Strip all symbols
ld -s -o program main.o

# Strip debugger symbols only
ld -S -o program main.o

# Strip local symbols
ld -x -o program main.o

# Relocatable output (partial linking)
ld -r -o combined.o part1.o part2.o
```

## Advanced Linking

### Partial Linking
```bash
# Combine object files
ld -r -o combined.o file1.o file2.o file3.o

# Archive creation after partial linking
ld -r -o big.o *.o
ar rcs libbig.a big.o
```

### Cross-compilation
```bash
# ARM cross-linking
arm-linux-gnueabihf-ld -o arm_program arm_main.o

# Embedded systems
ld -melf_x86_64 -o embedded_program embedded.o -nostdlib
```

### Position Independent Code
```bash
# Create shared library
ld -shared -o libmylib.so mylib.o

# Position independent executable
ld -pie -o pie_program main.o
```

### Custom Linker Scripts

### Complex Memory Layout
```ld
/* Complex embedded system script */
OUTPUT_FORMAT(elf32-littlearm)
ENTRY(Reset_Handler)

/* Memory definition */
MEMORY
{
    FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 512K
    RAM (rwx) : ORIGIN = 0x20000000, LENGTH = 64K
}

/* Stack and heap sizes */
_Min_Heap_Size = 0x200;
_Min_Stack_Size = 0x400;

SECTIONS
{
    /* Interrupt vector table */
    .isr_vector :
    {
        . = ALIGN(4);
        KEEP(*(.isr_vector))
        . = ALIGN(4);
    } >FLASH

    /* Program code */
    .text :
    {
        . = ALIGN(4);
        *(.text)
        *(.text*)
        *(.glue_7)
        *(.glue_7t)
        *(.eh_frame)
        . = ALIGN(4);
        _etext = .;
    } >FLASH

    /* Constant data */
    .rodata :
    {
        . = ALIGN(4);
        *(.rodata)
        *(.rodata*)
        . = ALIGN(4);
    } >FLASH

    /* Initialized data */
    .data :
    {
        . = ALIGN(4);
        _sdata = .;
        *(.data)
        *(.data*)
        . = ALIGN(4);
        _edata = .;
    } >RAM AT > FLASH

    /* Zero-initialized data */
    .bss :
    {
        . = ALIGN(4);
        _sbss = .;
        *(.bss)
        *(.bss*)
        *(COMMON)
        . = ALIGN(4);
        _ebss = .;
    } >RAM

    /* Stack setup */
    ._user_heap_stack :
    {
        . = ALIGN(8);
        . = . + _Min_Heap_Size;
        . = . + _Min_Stack_Size;
        . = ALIGN(8);
    } >RAM
}
```

### Dynamic Linking Features
```bash
# Version scripts for symbol visibility
ld --version-script=lib.map -o libmylib.so mylib.o

# lib.map content:
LIBMYLIB_1.0 {
    global:
        public_function1;
        public_function2;
    local:
        *;
};

# Symbol export control
ld --export-dynamic -o program main.o

# Create versioned shared library
ld -shared -Wl,--version-script=versions.map -o libmylib.so.1 mylib.o
```

## Debugging and Information

### Link Map Generation
```bash
# Generate detailed link map
ld -Map linkmap.txt -o program main.o utils.o

# Include dead code in map
ld -Map linkmap.txt --print-gc-sections -o program main.o

# Cross-reference table
ld --cref -o program main.o utils.o
```

### Verbose Output
```bash
# Verbose linking process
ld -v -o program main.o

# Trace file processing
ld --trace -o program main.o

# Show search paths
ld --verbose -o program main.o
```

### Symbol Table Analysis
```bash
# Show all symbols
nm program

# Show dynamic symbols
nm -D program

# Show only undefined symbols
nm -u program
```

## Practical Examples

### Creating Shared Libraries
```bash
# Create position independent code
gcc -fPIC -c mylib.c -o mylib.o

# Create shared library
ld -shared -o libmylib.so mylib.o

# Create versioned library
ld -shared -Wl,-soname,libmylib.so.1 -o libmylib.so.1.0 mylib.o
ln -s libmylib.so.1.0 libmylib.so.1
ln -s libmylib.so.1 libmylib.so
```

### Static Library Creation
```bash
# Compile to object files
gcc -c file1.c -o file1.o
gcc -c file2.c -o file2.o

# Partial linking
ld -r -o combined.o file1.o file2.o

# Create static library
ar rcs libmylib.a combined.o
```

### Embedded Systems
```bash
# Bare-metal linking
ld -T linker_script.ld -nostdlib -o firmware.elf startup.o main.o

# Bootloader linking
ld -Ttext=0x0000 -o bootloader.o bootloader_section.o main_section.o
```

### Kernel Development
```bash
# Kernel module linking
ld -m elf_x86_64 -r -o module.o module_main.o module_utils.o

# System linking (no standard library)
ld -nostdlib -static -o kernel kernel.o -I/lib/ld-linux.so.2
```

## Related Commands

- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`ar`](/docs/commands/development-tools/ar) - Archive utility
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`objdump`](/docs/commands/development-tools/objdump) - Object file disassembler
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis
- [`strip`](/docs/commands/development-tools/strip) - Strip symbols from objects
- [`ldd`](/docs/commands/development-tools/ldd) - List dynamic dependencies
- [`size`](/docs/commands/development-tools/size) - Show section sizes

## Best Practices

1. **Use GCC as frontend**: Let gcc handle ld invocation for most cases
2. **Understand linker scripts**: Master linker scripts for complex layouts
3. **Use proper library ordering**: Place dependent libraries after dependents
4. **Consider static vs dynamic**: Choose linking strategy based on requirements
5. **Handle symbols carefully**: Control symbol visibility and exports
6. **Memory layout planning**: Design efficient memory maps
7. **Version libraries**: Use versioning for API stability
8. **Debug with maps**: Generate link maps for troubleshooting
9. **Cross-reference symbols**: Use cref for symbol dependency analysis
10. **Test linkage**: Verify all dependencies are resolved correctly

## Troubleshooting

### Common Issues
```bash
# Undefined reference errors
ld -o program main.o -lmissing_library

# Cannot find library
ld -L/path/to/libraries -o program main.o -llibrary

# Multiple definition errors
ld --allow-multiple-definition -o program main.o

# Cannot find entry point
ld -e main -o program main.o
```

### Symbol Resolution
```bash
# Find which library provides a symbol
nm -D /usr/lib/*.so.6 | grep printf

# Check for undefined symbols
nm -u program

# Find duplicate symbols
nm program | sort | uniq -d
```

The `ld` command is a fundamental tool in the build process that combines object files into executable programs. Understanding its capabilities is essential for custom build systems, embedded development, and optimizing program layout and performance.