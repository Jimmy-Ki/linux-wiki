---
title: gcc - GNU Compiler Collection
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gcc - GNU Compiler Collection

The `gcc` command is the GNU Compiler Collection, a comprehensive set of compilers and development tools for C, C++, Objective-C, Fortran, Ada, Go, and D programming languages. It's the standard compiler system for most Unix-like operating systems and is widely used in open-source software development.

## Basic Syntax

```bash
gcc [options] [source_files] [-o output_file]
```

## Common Options

### Compilation Stages
- `-E` - Preprocess only; do not compile, assemble or link
- `-S` - Compile only; do not assemble or link
- `-c` - Compile and assemble, but do not link
- `-o <output_file>` - Place output in specified output file

### Optimization Levels
- `-O0` - No optimization (default)
- `-O1` or `-O` - Basic optimization
- `-O2` - More aggressive optimization
- `-O3` - Maximum optimization
- `-Os` - Optimize for size
- `-Og` - Optimize for debugging experience
- `-Ofast` - Disregard strict standards compliance

### Debugging Options
- `-g` - Generate debug information
- `-gdb` - Generate gdb-specific debug information
- `-ggdb` - Generate the most expressive format suitable for gdb
- `-pg` - Generate extra code to write profile information
- `-p` - Generate extra code to write profile information for prof

### Warning Options
- `-Wall` - Enable most warning messages
- `-Wextra` - Enable extra warning messages
- `-Werror` - Make all warnings into errors
- `-pedantic` - Issue all warnings required by strict ISO C
- `-w` - Inhibit all warning messages

### Preprocessor Options
- `-I <directory>` - Add directory to the include file search path
- `-D <macro>` - Define macro with string '1' as its definition
- `-D <macro>=<value>` - Define macro as value
- `-U <macro>` - Undefine macro
- `-include <filename>` - Process filename before main file

### Linker Options
- `-l <library>` - Link with specified library
- `-L <directory>` - Add directory to the library search path
- `-static` - Link against static libraries
- `-shared` - Create a shared library

### Language Standards
- `-std=<standard>` - Specify language standard (c89, c99, c11, c17, c18, c2x, c++98, c++03, c++11, c++14, c++17, c++20, etc.)

### Architecture and Target Options
- `-march=<arch>` - Generate code for specific CPU architecture
- `-mtune=<cpu>` - Optimize for specific CPU
- `-m32` - Generate 32-bit code
- `-m64` - Generate 64-bit code

## Usage Examples

### Basic Compilation
```bash
# Compile and link a single C file
gcc hello.c -o hello

# Compile without linking (produce object file)
gcc -c hello.c -o hello.o

# Compile and run in one step
gcc hello.c && ./a.out

# Compile with all warnings enabled
gcc -Wall hello.c -o hello

# Compile with debug information
gcc -g hello.c -o hello
```

### Multi-file Projects
```bash
# Compile multiple source files at once
gcc main.c utils.c file.c -o program

# Compile files separately and link
gcc -c main.c
gcc -c utils.c
gcc -c file.c
gcc main.o utils.o file.o -o program

# Compile with optimization
gcc -O2 main.c utils.c file.c -o program
```

### Library Linking
```bash
# Link with math library
gcc program.c -lm -o program

# Link with pthread library
gcc program.c -lpthread -o program

# Link with custom library
gcc program.c -L./lib -lmylib -o program

# Link with multiple libraries
gcc program.c -lm -lpthread -lrt -o program
```

### Include Directories
```bash
# Add include directory
gcc -I./include program.c -o program

# Add multiple include directories
gcc -I./include -I/usr/local/include program.c -o program

# System include directory
gcc -I/usr/include/mysql program.c -o program
```

### Preprocessor Usage
```bash
# Define macros
gcc -DDEBUG -DVERSION=2.1 program.c -o program

# Undefine macros
gcc -UDEBUG program.c -o program

# Include header files
gcc -include config.h program.c -o program
```

## Advanced Compilation

### Standard Compliance
```bash
# Compile with C99 standard
gcc -std=c99 program.c -o program

# Compile with C11 standard
gcc -std=c11 program.c -o program

# Compile with C++17 standard
g++ -std=c++17 program.cpp -o program

# Compile with pedantic warnings
gcc -pedantic -std=c99 program.c -o program
```

### Optimization Examples
```bash
# Different optimization levels
gcc -O0 program.c -o program_no_opt    # No optimization
gcc -O1 program.c -o program_opt1     # Basic optimization
gcc -O2 program.c -o program_opt2     # Standard optimization
gcc -O3 program.c -o program_opt3     # Aggressive optimization
gcc -Os program.c -o program_size     # Optimize for size
gcc -Og program.c -o program_debug    # Optimize for debugging

# Architecture-specific optimization
gcc -march=native -O2 program.c -o program_native
gcc -march=x86-64 -O2 program.c -o program_x86_64
gcc -mtune=generic -O2 program.c -o program_generic
```

### Creating Libraries
```bash
# Create static library
gcc -c library.c -o library.o
ar rcs liblibrary.a library.o

# Create shared library
gcc -fPIC -c library.c -o library.o
gcc -shared -o liblibrary.so library.o

# Link against created library
gcc program.c -L. -llibrary -o program
```

### Cross-compilation
```bash
# Compile for 32-bit system
gcc -m32 program.c -o program_32

# Compile for ARM architecture
gcc -march=armv7-a program.c -o program_arm

# Compile with specific endianness
gcc -mbig-endian program.c -o program_be
gcc -mlittle-endian program.c -o program_le
```

## Practical Examples

### Development Workflow
```bash
# Development build with warnings and debug info
gcc -Wall -Wextra -g -DDEBUG program.c -o program_debug

# Production build with optimization
gcc -Wall -Wextra -O2 -DNDEBUG program.c -o program_release

# Profile build for performance analysis
gcc -O2 -pg program.c -o program_profile
./program_profile
gprof program_profile gmon.out > analysis.txt
```

### Makefile Integration
```bash
# Example Makefile snippet
CC = gcc
CFLAGS = -Wall -Wextra -std=c99
LDFLAGS = -lm -lpthread

program: main.o utils.o
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```

### Template Makefile
```bash
# Complete example Makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -O2
LDFLAGS = -lm
SRCDIR = src
OBJDIR = obj
SOURCES = $(wildcard $(SRCDIR)/*.c)
OBJECTS = $(SOURCES:$(SRCDIR)/%.c=$(OBJDIR)/%.o)
TARGET = program

$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

$(OBJDIR)/%.o: $(SRCDIR)/%.c | $(OBJDIR)
	$(CC) $(CFLAGS) -c $< -o $@

$(OBJDIR):
	mkdir -p $(OBJDIR)

clean:
	rm -f $(OBJECTS) $(TARGET)

.PHONY: clean
```

### Debugging Preparation
```bash
# Compile for GDB debugging
gcc -g -O0 -Wall program.c -o program_debug

# Compile with specific debug format
gcc -ggdb3 -O0 program.c -o program_gdb

# Generate source-level debugging
gcc -g -fno-omit-frame-pointer program.c -o program_frames
```

### Performance Analysis
```bash
# Compile with profiling support
gcc -O2 -pg program.c -o program_profile

# Generate coverage analysis
gcc -fprofile-arcs -ftest-coverage program.c -o program_coverage
./program_coverage
gcov program.c

# Generate assembly output
gcc -S program.c -o program.s
gcc -S -fverbose-asm program.c -o program_verbose.s
```

### Large Project Compilation
```bash
# Project directory structure
# project/
#   ├── src/
#   │   ├── main.c
#   │   ├── utils.c
#   │   └── modules/
#   │       ├── module1.c
#   │       └── module2.c
#   ├── include/
#   │   ├── project.h
#   │   ├── utils.h
#   │   └── modules/
#   │       ├── module1.h
#   │       └── module2.h
#   └── lib/
#       └── external.a

# Compilation commands
gcc -I./include -I./include/modules \
    src/main.c src/utils.c src/modules/module1.c src/modules/module2.c \
    -L./lib -lexternal -lm -lpthread \
    -o project

# Alternative: compile separately
gcc -I./include -I./include/modules -c src/main.c -o main.o
gcc -I./include -I./include/modules -c src/utils.c -o utils.o
gcc -I./include -I./include/modules -c src/modules/module1.c -o module1.o
gcc -I./include -I./include/modules -c src/modules/module2.c -o module2.o
gcc main.o utils.o module1.o module2.o -L./lib -lexternal -lm -lpthread -o project
```

### Conditional Compilation
```bash
# Debug build
gcc -DDEBUG -g -O0 -Wall program.c -o debug_version

# Release build
gcc -DNDEBUG -O3 -Wall program.c -o release_version

# Test build with mock functions
gcc -DTESTING -I./mocks program.c mocks/test_utils.c -o test_version

# Feature-specific builds
gcc -DENABLE_FEATURE_X -DENABLE_FEATURE_Y program.c -o full_features
gcc -DENABLE_FEATURE_X program.c -o minimal_features
```

## Advanced Features

### Link Time Optimization (LTO)
```bash
# LTO compilation
gcc -flto -O2 program.c -o program_lto

# LTO with separate compilation
gcc -flto -c program1.c -o program1.o
gcc -flto -c program2.c -o program2.o
gcc -flto program1.o program2.o -o program_lto
```

### Instrumentation
```bash
# Sanitizers for memory checking
gcc -fsanitize=address -g program.c -o program_asan
gcc -fsanitize=memory -g program.c -o program_msan
gcc -fsanitize=thread -g program.c -o program_tsan
gcc -fsanitize=undefined -g program.c -o program_ubsan

# Combined sanitizers
gcc -fsanitize=address,undefined -g program.c -o program_full_san
```

### Vectorization
```bash
# Enable auto-vectorization
gcc -O3 -ftree-vectorize program.c -o program_vectorized

# Explicit vectorization hints
gcc -O3 -ftree-vectorize -fopt-info-vec-missed program.c -o program_vec_info
```

### Plugin Usage
```bash
# Compile with GCC plugin
gcc -fplugin=./plugin.so program.c -o program_plugin

# Example: compile-time security analysis
gcc -fplugin=sa_plugin program.c -o program_secure
```

## Common Compilation Scenarios

### Embedded Systems
```bash
# Compile for embedded ARM target
arm-linux-gnueabihf-gcc -march=armv7-a -mfpu=neon \
    -mfloat-abi=hard -O2 program.c -o embedded_program

# Bare-metal compilation
arm-none-eabi-gcc -mcpu=cortex-m4 -mthumb -Os \
    -ffunction-sections -fdata-sections \
    program.c -o embedded_baremetal
```

### High-Performance Computing
```bash
# HPC optimization
gcc -O3 -march=native -march=x86-64 -ffast-math \
    -funroll-loops program.c -o hpc_program

# OpenMP parallelization
gcc -fopenmp -O3 program.c -o parallel_program
```

### WebAssembly Compilation
```bash
# Compile to WebAssembly
emcc program.c -o program.js
emcc program.c -o program.wasm
```

## Related Commands

- [`g++`](/docs/commands/development-tools/gpp) - GNU C++ compiler
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`ld`](/docs/commands/development-tools/ld) - GNU Linker
- [`ar`](/docs/commands/development-tools/ar) - Archive utility for creating static libraries
- [`objdump`](/docs/commands/development-tools/objdump) - Object file information
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis
- [`size`](/docs/commands/development-tools/size) - Section sizes of object files
- [`strings`](/docs/commands/development-tools/strings) - Extract printable strings
- [`strip`](/docs/commands/development-tools/strip) - Discard symbols from object files

## Best Practices

1. **Always use warnings**: Enable `-Wall` and `-Wextra` to catch potential issues
2. **Use appropriate optimization levels**: `-O2` for general use, `-O3` for performance-critical code
3. **Compile with debug symbols**: Use `-g` during development for better debugging
4. **Specify language standard**: Use `-std=` to ensure code portability
5. **Consider sanitizers**: Use address/undefined sanitizers during development
6. **Profile before optimizing**: Use profiling tools to identify bottlenecks
7. **Use architecture flags**: Target specific architectures when appropriate
8. **Organize include paths**: Keep include directories clean and logical
9. **Version control builds**: Keep track of compilation flags and versions
10. **Test different optimization levels**: Some optimizations may introduce bugs

## Troubleshooting

### Common Compilation Errors
```bash
# Fix undefined reference errors by linking libraries
gcc program.c -lm -lpthread -o program

# Fix include file not found by adding include paths
gcc -I./include program.c -o program

# Fix library not found by adding library paths
gcc program.c -L./lib -lmylib -o program
```

### Debugging Compilation Issues
```bash
# Show preprocessing output
gcc -E program.c -o program.i

# Show assembly output
gcc -S program.c -o program.s

# Verbose compilation output
gcc -v program.c -o program

# Show include file search order
gcc -H program.c
```

### Memory and Performance Issues
```bash
# Use AddressSanitizer to detect memory errors
gcc -fsanitize=address -g program.c -o program_asan
./program_asan

# Use Valgrind to detect memory leaks
gcc -g program.c -o program_debug
valgrind --leak-check=full ./program_debug
```

The `gcc` compiler is a powerful and versatile tool that forms the foundation of C/C++ development on Linux systems. Mastering its various options and features enables developers to create efficient, reliable, and maintainable software across diverse platforms and use cases.