---
title: ld - GNU Linker
sidebar_label: ld
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ld - GNU Linker

The `ld` command is the GNU linker, a crucial component of the GNU Binutils package that combines object files and libraries to create executable programs or shared libraries. The linker resolves symbols, allocates memory, performs relocations, and generates the final output file in various formats like ELF, COFF, or a.out. ld is typically invoked automatically by compilers like GCC, but can also be used directly for fine-grained control over the linking process.

## Basic Syntax

```bash
ld [options] [-o outputfile] objfile...
```

## Common Options

### Output Control
- `-o FILE` - Set output file name
- `-e SYMBOL` - Set entry point symbol
- `-s` - Strip all symbols
- `-S` - Strip debugger symbols
- `-x` - Discard local symbols
- `-r` - Generate relocatable output

### Library and Search Path
- `-lNAME` - Link with library libNAME.so or libNAME.a
- `-L PATH` - Add directory to library search path
- `-static` - Link static libraries only
- `-shared` - Create shared library
- `-Bstatic` - Use static libraries for subsequent -l options
- `-Bdynamic` - Use shared libraries for subsequent -l options

### Script and Layout Control
- `-T SCRIPT` - Use linker script
- `-Tdata ADDR` - Set data segment address
- `-Ttext ADDR` - Set text segment address
- `-Tbss ADDR` - Set BSS segment address
- `-format FORMAT` - Set output format

### Symbol Handling
- `-u SYMBOL` - Start with undefined reference
- `-defsym SYMBOL=EXPRESSION` - Define symbol
- `-wrap SYMBOL` - Use wrapper function for symbol
- `-export-dynamic` - Export symbols for dynamic loading

### Debugging and Information
- `-t` - Print input files as processed
- `-v` - Print version information
- `-M` - Print link map
- `-Map FILE` - Write link map to file
- `--cref` - Output cross reference table

### Architecture and Target
- `-m EMULATION` - Set emulation
- `--oformat FORMAT` - Set output format
- `-A ARCH` - Set architecture
- `--32` - Generate 32-bit output
- `--64` - Generate 64-bit output

## Usage Examples

### Basic Linking Operations

#### Simple Executable Creation
```bash
# Link object files to create executable
ld -o myprogram main.o utils.o helper.o

# Link with standard library
ld -o myprogram main.o -lc -dynamic-linker /lib64/ld-linux-x86-64.so.2

# Link with specific library
ld -o myprogram main.o -lm -lpthread

# Link with custom library path
ld -o myprogram main.o -L./libs -lmylib
```

#### Creating Shared Libraries
```bash
# Create shared library
ld -shared -o libmylib.so module1.o module2.o

# Create shared library with soname
ld -shared -o libmylib.so.1.0 -soname libmylib.so.1 module.o

# Create shared library for position-independent code
ld -shared -fPIC -o libshared.so pic_object.o

# Create shared library with exported symbols
ld -shared -o libapi.so api.o --export-dynamic
```

#### Static Linking
```bash
# Link statically
ld -static -o static_program main.o -lc -lm

# Link with specific static library
ld -o program main.o -L./lib -l:libmylib.a

# Mix static and dynamic linking
ld -o program main.o -Bstatic -lstatic_lib -Bdynamic -ldynamic_lib
```

### Advanced Linking

#### Linker Scripts
```bash
# Use custom linker script
ld -T custom_script.ld -o firmware.elf input.o

# Use default script with modifications
ld -T default.ld -Ttext 0x10000 -o kernel.o kernel_start.o

# Create linker script on the fly
ld -T <(echo "SECTIONS { .text 0x1000 : { *(.text) } }") -o program.o input.o

# Combine multiple scripts
ld -T base.ld -T extras.ld -o final.elf modules/*.o
```

#### Memory Layout Control
```bash
# Set specific text segment address
ld -Ttext 0x100000 -o bootloader.o boot.o

# Set data and BSS segments
ld -Ttext 0x1000 -Tdata 0x2000 -Tbss 0x3000 -o embedded.o

# Align sections
ld -Ttext 0x1000 -Tdata 0x2000 --section-start=.rodata=0x1800 -o aligned.o

# Create position-independent executable
ld -pie -o pie_executable.o main.o
```

#### Symbol Manipulation
```bash
# Define symbols at link time
ld -defsym VERSION=42 -o program.o main.o

# Force undefined symbol
ld -u missing_symbol -o program.o main.o -lm

# Wrap function calls
ld -wrap malloc -wrap free -o traced.o main.o tracer.o

# Export specific symbols only
ld -shared --version-script version.map -o libfiltered.so lib.o

# Create versioned symbols
ld -shared --version-script versions.lds -o libversioned.so modules.o
```

### Cross-Platform Development

#### Different Output Formats
```bash
# Create ELF executable
ld --oformat elf64-x86-64 -o program.elf main.o

# Create COFF output
ld --oformat pe-i386 -o program.exe main.o

# Create flat binary
ld --oformat binary -o firmware.bin -Ttext 0x0 startup.o

# Create Mach-O for macOS
ld -o output.macho -arch x86_64 -macosx_version_min 10.15 input.o
```

#### Embedded Systems
```bash
# Link for ARM microcontroller
ld -m armelf -T arm_link.ld -o firmware.elf startup.o main.o

# Link with memory regions
ld -T memory.ld -o embedded.elf sections/*.o

# Create Intel HEX output
ld -o firmware.elf input.o
objcopy -O ihex firmware.elf firmware.hex

# Create Motorola S-record
ld -o firmware.elf input.o
objcopy -O srec firmware.elf firmware.srec
```

## Practical Examples

### System Programming

#### Kernel Development
```bash
# Link kernel with custom layout
ld -T kernel.ld -o vmlinuz head.o init.o kernel.o

# Create kernel with specific sections
ld -Ttext 0x100000 -Tdata 0x200000 -o kernel.o \
    arch/x86/kernel/head.o \
    init/main.o \
    kernel/*.o

# Link kernel modules
ld -r -o module.ko module_core.o module_crypto.o

# Create bootable kernel image
ld -T boot.ld -o boot_image boot.o kernel.o
```

#### Library Development
```bash
# Create shared library with version info
ld -shared -o libcalc.so.1.2.3 \
    -soname libcalc.so.1 \
    calc.o math.o

# Create static library (using ar)
ar rcs libcalc.a calc.o math.o

# Create library with symbol versioning
ld -shared -o libcompat.so \
    --version-script compat.map \
    compat.o legacy.o

# Create library with exported symbols only
ld -shared -o libminimal.so \
    --version-script minimal.vers \
    modules/*.o
```

### Application Development

#### Complex Application
```bash
# Link multi-module application
ld -o application \
    main.o \
    gui/gtk_interface.o \
    network/protocol.o \
    database/sqlite_wrapper.o \
    -lgtk-3 -lsqlite3 -lpthread -lm

# Link with optimization
ld -o optimized_app main.o utils.o \
    -Wl,--gc-sections \
    -Wl,--strip-all

# Link with debugging information
ld -o debug_app main.o utils.o \
    -g \
    -Wl,--export-dynamic
```

#### Plugin System
```bash
# Create main executable for plugins
ld -o main_app main.o plugin_manager.o \
    -ldl -rdynamic

# Create plugin as shared library
ld -shared -o plugin_text.so text_plugin.o
ld -shared -o plugin_image.so image_plugin.o

# Link with plugin API
ld -o main main.o -L./plugins -lplugin_api
```

## Advanced Usage

### Linker Script Development

#### Basic Linker Script
```ld
/* script.ld */
SECTIONS {
    . = 0x10000;  /* Start at 0x10000 */

    .text : {
        *(.text)
        *(.rodata)
    }

    .data : {
        *(.data)
    }

    .bss : {
        *(.bss)
        *(COMMON)
    }
}
```

#### Complex Memory Layout
```ld
/* memory.ld */
MEMORY {
    FLASH (rx)  : ORIGIN = 0x08000000, LENGTH = 64K
    RAM   (rwx) : ORIGIN = 0x20000000, LENGTH = 20K
}

SECTIONS {
    .text : {
        *(.text*)
    } > FLASH

    .data : {
        *(.data*)
        _sdata = .;
    } > RAM AT > FLASH

    .bss : {
        *(.bss*)
        *(COMMON)
        _sbss = .;
        _ebss = .;
    } > RAM
}
```

### Symbol Versioning

#### Version Script
```lds
/* version.map */
LIBRARY_1.0 {
    global:
        func1;
        func2;
    local:
        *;
};

LIBRARY_2.0 {
    global:
        func3;
        func4;
} LIBRARY_1.0;
```

```bash
# Link with version script
ld -shared -o libexample.so.2.0 \
    -soname libexample.so.2 \
    --version-script version.map \
    modules/*.o
```

### Build System Integration

#### Makefile Integration
```makefile
# Makefile snippet
CC = gcc
LD = ld
CFLAGS = -c -fPIC

all: program shared_lib

program: main.o utils.o
	$(LD) -o $@ $^ -lc

shared_lib: module.o
	$(LD) -shared -o libmodule.so $^

%.o: %.c
	$(CC) $(CFLAGS) -o $@ $<
```

#### Complex Build Script
```bash
#!/bin/bash
# build.sh - Custom build script with ld

# Compile source files
gcc -c -Wall -Wextra -fPIC src/*.c

# Create static library
ar rcs libstatic.a *.o

# Create shared library
ld -shared -o libshared.so \
    -soname libshared.so.1 \
    *.o

# Create main executable
ld -o main_program main.o \
    -L. -lshared -lpthread -lm

# Create debug version
ld -o debug_program main.o \
    -g -L. -lstatic -rdynamic
```

## Troubleshooting

### Common Issues

#### Undefined References
```bash
# Problem: Undefined reference errors
ld -o program main.o
# error: undefined reference to 'printf'

# Solution: Link required libraries
ld -o program main.o -lc

# Solution: Link with math library
ld -o calculator calc.o -lm

# Solution: Add library search path
ld -o app main.o -L/usr/local/lib -lcustom
```

#### Symbol Resolution Issues
```bash
# Multiple definitions
ld -o program main.o lib1.o lib2.o
# error: multiple definition of 'global_var'

# Solution: Use weak symbols or
# wrap to resolve conflicts
ld -o program main.o -Wl,--allow-multiple-definition

# Solution: Use linker script to control symbol visibility
ld -T visibility.ld -o program *.o
```

#### Memory Layout Problems
```bash
# Text segment too large
ld -Ttext 0x1000 -o embedded.o modules/*.o
# error: region 'text' overflowed

# Solution: Increase address space or split sections
ld -Ttext 0x1000 -Tdata 0x100000 -o embedded.o modules/*.o

# Solution: Use garbage collection
ld --gc-sections -o embedded.o modules/*.o
```

#### Shared Library Issues
```bash
# Position-independent code errors
ld -shared -o lib.so module.o
# error: relocation R_X86_64_32 against `.rodata'

# Solution: Compile with -fPIC
gcc -fPIC -c module.c
ld -shared -o lib.so module.o

# Solution: Create position-independent executable
ld -pie -o pie_app main.o
```

### Debugging Linker Issues

#### Getting Detailed Information
```bash
# Show link map
ld -Map linkmap.txt -o program *.o

# Verbose output
ld -v -o program *.o

# Show all input files
ld -t -o program *.o

# Cross reference table
ld --cref -o program *.o

# Print all symbols
nm -C program.o
```

#### Analyzing Libraries
```bash
# List library contents
nm libstatic.a

# List shared library symbols
nm -D libshared.so

# Show library dependencies
ldd executable

# Read ELF header
readelf -h program

# Show program headers
readelf -l program
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU Compiler Collection (automatically invokes ld)
- [`g++`](/docs/commands/development/g++) - GNU C++ Compiler
- [`ar`](/docs/commands/other-tools/ar) - Create and manipulate static libraries
- [`nm`](/docs/commands/development/nm) - List symbols from object files
- [`objdump`](/docs/commands/development/objdump) - Display information from object files
- [`readelf`](/docs/commands/development/readelf) - Display ELF file information
- [`ldconfig`](/docs/commands/other-tools/ldconfig) - Configure dynamic linker run-time bindings
- [`ldd`](/docs/commands/other-tools/ldd) - Print shared library dependencies

## Best Practices

1. **Let compilers invoke ld** when possible for automatic library linking
2. **Use linker scripts** for embedded systems and custom memory layouts
3. **Enable garbage collection** (--gc-sections) to reduce binary size
4. **Use version scripts** for shared library API management
5. **Set appropriate permissions** on shared libraries (rwx for owner, rx for group/others)
6. **Maintain symbol compatibility** when updating shared libraries
7. **Use position-independent code** (-fPIC) for shared libraries
8. **Test linker configurations** with different optimization levels
9. **Document custom linker scripts** for maintainability
10. **Use build tools** (make, cmake) to manage complex linking requirements

## Performance Tips

1. **Use -Wl,--gc-sections** to remove unused code
2. **Link static vs dynamic** based on deployment requirements
3. **Optimize library search paths** to reduce lookup time
4. **Use symbol versioning** for backward compatibility
5. **Consider LTO (Link Time Optimization)** with compiler support
6. **Prefer shared libraries** for memory efficiency in large systems
7. **Use incremental linking** for faster development cycles
8. **Organize object files** by function for better cache utilization

The `ld` command is a powerful tool that provides complete control over the linking process, enabling developers to create optimized executables and libraries for various platforms and requirements. Understanding its capabilities is essential for system programming, embedded development, and performance-critical applications.