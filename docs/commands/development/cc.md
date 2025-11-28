---
title: cc - C Compiler
sidebar_label: cc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cc - C Compiler

The `cc` command is a C compiler that serves as a frontend or symbolic link to the system's C compiler, typically `gcc` (GNU Compiler Collection) or `clang` (LLVM Compiler Infrastructure). It compiles C source files into executable programs, object files, or assembly code. The `cc` command follows the POSIX standard and provides a consistent interface across different Unix-like systems while supporting various optimization levels, debugging options, and target architectures.

## Basic Syntax

```bash
cc [OPTIONS] INPUT_FILES...
cc [OPTIONS] -c SOURCE_FILE -o OBJECT_FILE
cc [OPTIONS] SOURCE_FILES... -o EXECUTABLE
```

## Common Options

### Compilation Control
- `-c` - Compile source files to object files without linking
- `-o FILE` - Specify output file name
- `-x LANGUAGE` - Specify the language of subsequent input files
- `-v` - Display compiler version and verbose compilation process
- `--version` - Show compiler version information
- `--help` - Display help message

### Preprocessor Options
- `-E` - Run preprocessor only, output to stdout
- `-I DIR` - Add directory to include file search path
- `-D MACRO[=VALUE]` - Define preprocessor macro
- `-U MACRO` - Undefine preprocessor macro
- `-include FILE` - Include file before first compilation
- `-M` - Generate makefile dependencies
- `-MM` - Generate makefile dependencies (excluding system headers)

### Optimization Levels
- `-O0` - No optimization (default)
- `-O1` / `-O` - Basic optimization
- `-O2` - Moderate optimization (recommended for release)
- `-O3` - Aggressive optimization
- `-Os` - Optimize for size
- `-Oz` - Optimize for size (more aggressive than -Os)
- `-Ofast` - Fast optimization with relaxed standards
- `-Og` - Optimize debugging experience

### Debugging Options
- `-g` - Generate debug information
- `-g0` - No debug information
- `-g1` - Minimal debug information
- `-g2` - Standard debug information (default for -g)
- `-g3` - Maximum debug information
- `-ggdb` - Generate GDB-specific debug info
- `-dA` - Annotate assembler
- `-fno-omit-frame-pointer` - Keep frame pointer for debugging

### Warning and Error Options
- `-Wall` - Enable all common warnings
- `-Wextra` - Enable extra warnings
- `-Werror` - Treat warnings as errors
- `-w` - Disable all warnings
- `-Wpedantic` - Issue pedantic warnings
- `-Wconversion` - Enable conversion warnings
- `-Wuninitialized` - Warn about uninitialized variables
- `-Wformat` - Check format string usage
- `-Wunused` - Warn about unused variables

### Code Generation
- `-S` - Generate assembly code
- `-fPIC` - Generate position-independent code
- `-fPIE` - Generate position-independent executable
- `-march=ARCH` - Generate code for specific architecture
- `-mtune=CPU` - Optimize for specific CPU
- `-m32` - Generate 32-bit code
- `-m64` - Generate 64-bit code

### Linking Options
- `-l LIBRARY` - Link with specified library
- `-L DIR` - Add directory to library search path
- `-static` - Link statically
- `-shared` - Create shared library
- `-rdynamic` - Export symbols for dynamic linking
- `-Wl,OPTION` - Pass option to linker

## Usage Examples

### Basic Compilation

#### Simple Program Compilation
```bash
# Compile single source file to executable
cc hello.c -o hello

# Compile and run immediately
cc hello.c -o hello && ./hello

# Compile with default output name (a.out)
cc hello.c
./a.out

# Compile multiple source files
cc main.c utils.c helpers.c -o myprogram
```

#### Object File Generation
```bash
# Compile to object file only
cc -c module.c -o module.o

# Compile multiple source files to objects
cc -c main.c -o main.o
cc -c utils.c -o utils.o
cc -c helpers.c -o helpers.o

# Link object files to executable
cc main.o utils.o helpers.o -o final_program

# Compile and link in one step vs separate steps
# One step:
cc main.c utils.c -o program

# Separate steps:
cc -c main.c -o main.o
cc -c utils.c -o utils.o
cc main.o utils.o -o program
```

### Optimization Examples

#### Basic Optimization
```bash
# Compile with basic optimization
cc -O1 program.c -o program_opt

# Compile with standard optimization (recommended)
cc -O2 program.c -o program_release

# Compile with aggressive optimization
cc -O3 program.c -o program_fast

# Compile optimizing for size
cc -Os program.c -o program_small

# Compile with debugging-friendly optimization
cc -Og program.c -o program_debug_opt
```

#### Architecture-Specific Optimization
```bash
# Optimize for current machine
cc -O2 -march=native program.c -o program_native

# Optimize for specific architecture
cc -O2 -march=x86-64 program.c -o program_x86_64

# Optimize for specific CPU
cc -O2 -mtune=intel-core-i7 program.c -o program_intel

# Generate 32-bit code on 64-bit system
cc -m32 program.c -o program_32bit

# Generate AVX-optimized code
cc -O2 -mavx program.c -o program_avx
```

### Debugging Compilation

#### Debug Information
```bash
# Compile with debug information
cc -g program.c -o program_debug

# Compile with GDB-specific debug info
cc -ggdb program.c -o program_gdb

# Compile with maximum debug info
cc -g3 program.c -o program_debug_full

# Compile with debug and optimization
cc -g -O2 program.c -o program_debug_opt

# Keep frame pointer for better debugging
cc -g -fno-omit-frame-pointer program.c -o program_debug_fp
```

#### Development Builds
```bash
# Development build with warnings and debug info
cc -g -Wall -Wextra program.c -o program_dev

# Development build treating warnings as errors
cc -g -Wall -Werror program.c -o program_strict

# Compile with sanitizers
cc -g -fsanitize=address program.c -o program_asan
cc -g -fsanitize=undefined program.c -o program_ubsan

# Compile with memory sanitizer
cc -g -fsanitize=memory program.c -o program_msan
```

### Warning Control

#### Common Warning Configurations
```bash
# Enable all common warnings
cc -Wall program.c -o program_warn

# Enable extra warnings
cc -Wall -Wextra program.c -o program_extra_warn

# Enable pedantic ISO C compliance checks
cc -Wall -Wpedantic program.c -o program_pedantic

# Treat warnings as errors
cc -Wall -Werror program.c -o program_strict

# Disable all warnings
cc -w program.c -o program_quiet

# Specific warning categories
cc -Wall -Wconversion -Wuninitialized program.c -o program_specific
```

#### Warning Suppression
```bash
# Suppress specific warnings
cc -Wall -Wno-unused-variable program.c -o program_no_unused

# Suppress deprecated warnings
cc -Wall -Wno-deprecated-declarations program.c -o program_no_deprecated

# Suppress format warnings
cc -Wall -Wno-format program.c -o program_no_format
```

### Preprocessor Usage

#### Macro Definition
```bash
# Define macro without value
cc -DDEBUG program.c -o program_debug

# Define macro with value
cc -DVERSION="1.0.0" program.c -o program_v1

# Define multiple macros
cc -DDEBUG -DVERSION=2.1 -DMAX_SIZE=1024 program.c -o program_defines

# Undefine macro
cc -UDEBUG program.c -o program_nodebug

# Include file before compilation
cc -include config.h program.c -o program_config
```

#### Include Paths
```bash
# Add include directory
cc -I./include program.c -o program_local

# Add multiple include directories
cc -I./include -I/usr/local/include -I/opt/lib/include program.c -o program_multi

# Add system include directory
cc -I/usr/include/gtk-3.0 gtk_app.c -o gtk_app

# Use relative and absolute paths
cc -I../common/include -I/home/user/lib/include program.c -o program_paths
```

#### Preprocessor Output
```bash
# Run preprocessor only
cc -E program.c > program.i

# Preprocess with macros defined
cc -E -DDEBUG=1 program.c > program_debug.i

# Show preprocessed output with line numbers
cc -E -P program.c > program_clean.i

# Generate dependencies for makefile
cc -M program.c > program.d

# Generate dependencies (no system headers)
cc -MM program.c > program_local.d
```

### Library Linking

#### Basic Linking
```bash
# Link with math library
cc program.c -o program -lm

# Link with pthread library
cc pthread_app.c -o pthread_app -lpthread

# Link with multiple libraries
cc program.c -o app -lm -lpthread -lrt

# Link with custom library directory
cc program.c -o program -L./lib -lmylib
```

#### Static vs Dynamic Linking
```bash
# Static linking
cc program.c -o program_static -static

# Static link specific library
cc program.c -o program -static-libgcc -static-libstdc++

# Dynamic linking (default)
cc program.c -o program

# Link with shared library
cc program.c -o program -lmysharedlib

# Check library dependencies (after compilation)
ldd program
```

### Advanced Compilation

#### Creating Libraries
```bash
# Create static library
cc -c library.c -o library.o
ar rcs libmylibrary.a library.o

# Create shared library
cc -fPIC -c library.c -o library.o
cc -shared -o libmylibrary.so library.o

# Compile program linking with static library
cc program.c -o program -L. -lmylibrary

# Compile program linking with shared library
cc program.c -o program -L. -lmylibrary
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
./program
```

#### Cross-Compilation
```bash
# Cross-compile for ARM
cc -march=armv7-a program.c -o program_arm

# Cross-compile with specific toolchain (if available)
arm-linux-gnueabihf-gcc program.c -o program_armhf

# Compile for different ABI
cc -mabi=ilp32 program.c -o program_ilp32
```

## Practical Examples

### Development Workflow

#### Debug Build Process
```bash
#!/bin/bash
# Complete debug build process

# Compile with debug information and warnings
cc -g -Wall -Wextra -DDEBUG \
    -I./include \
    -c main.c -o main.o

cc -g -Wall -Wextra -DDEBUG \
    -I./include \
    -c utils.c -o utils.o

# Link with debug libraries
cc main.o utils.o -o debug_app -lm -lpthread

# Run with debugger
gdb ./debug_app
```

#### Release Build Process
```bash
#!/bin/bash
# Optimized release build process

# Compile with optimization
cc -O3 -Wall -DNDEBUG \
    -I./include \
    -c main.c -o main.o

cc -O3 -Wall -DNDEBUG \
    -I./include \
    -c utils.c -o utils.o

# Link static for distribution
cc main.o utils.o -o release_app -static -lm -lpthread

# Strip debug symbols
strip release_app

# Check final size
ls -lh release_app
```

### Testing and Validation

#### Compile-Time Testing
```bash
# Compile with all warnings as errors
cc -Wall -Wextra -Werror -pedantic test.c -o test

# Check for undefined behavior
cc -fsanitize=undefined -g test.c -o test_ub

# Check for memory errors
cc -fsanitize=address -g test.c -o test_asan

# Compile with different standards
cc -std=c99 -Wall program.c -o program_c99
cc -std=c11 -Wall program.c -o program_c11
cc -std=c18 -Wall program.c -o program_c18
```

#### Performance Testing
```bash
# Compare optimization levels
cc -O0 program.c -o program_O0
cc -O1 program.c -o program_O1
cc -O2 program.c -o program_O2
cc -O3 program.c -o program_O3

# Benchmark each version
time ./program_O0
time ./program_O1
time ./program_O2
time ./program_O3

# Compare sizes
ls -l program_O0 program_O1 program_O2 program_O3
```

## Advanced Usage

### Conditional Compilation

#### Feature Toggles
```bash
# Compile with debugging enabled
cc -DDEBUG -DVERBOSE -g program.c -o debug_verbose

# Compile with performance monitoring
cc -DPERFORMANCE_MONITOR -O2 program.c -o perf_monitor

# Compile for embedded system
cc -DEMBEDDED -Os -ffunction-sections -fdata-sections program.c -o embedded

# Compile for test environment
cc -DTESTING -DTEST_MODE -g program.c -o test_build
```

#### Platform-Specific Code
```bash
# Compile for Linux
cc -DLINUX -DUNIX program.c -o linux_build

# Compile for macOS
cc -DMACOS -DUNIX program.c -o macos_build

# Compile for Windows (using MinGW)
x86_64-w64-mingw32-gcc -DWIN32 program.c -o windows_build.exe

# Compile with POSIX extensions
cc -D_POSIX_C_SOURCE=200809L program.c -o posix_build
```

### Code Generation Control

#### Assembly Output
```bash
# Generate assembly code
cc -S program.c -o program.s

# Generate assembly with optimization
cc -O3 -S program.c -o program_opt.s

# Generate annotated assembly
cc -g -Wa,-adhln program.c > program.lst

# Generate Intel syntax assembly
cc -masm=intel -S program.c -o program_intel.s
```

#### Intermediate Files
```bash
# Show compilation process
cc -### program.c -o program

# Stop after preprocessing
cc -E program.c > program.i

# Stop after compilation (no assembly)
cc -S program.c -o program.s

# Stop after assembly (no linking)
cc -c program.c -o program.o

# Link separately
cc program.o -o program
```

### Integration with Build Systems

#### Make Integration
```makefile
# Makefile example
CC = cc
CFLAGS = -Wall -Wextra -O2
LDFLAGS = -lm -lpthread

program: main.o utils.o
	$(CC) $(LDFLAGS) -o $@ $^

main.o: main.c
	$(CC) $(CFLAGS) -c $< -o $@

utils.o: utils.c
	$(CC) $(CFLAGS) -c $< -o $@

debug: CFLAGS += -g -DDEBUG
debug: clean program

clean:
	rm -f *.o program
```

#### Conditional Compilation
```bash
# Development vs Production build
if [ "$ENVIRONMENT" = "development" ]; then
    cc -g -Wall -Wextra -DDEBUG program.c -o program
else
    cc -O3 -DNDEBUG program.c -o program
    strip program
fi

# Feature-specific builds
cc -DWITH_GUI gui_program.c -o gui_program -lgtk
cc -DWITH_CLI cli_program.c -o cli_program
```

## Troubleshooting

### Common Compilation Errors

#### Header File Issues
```bash
# Missing header files
cc -I./include program.c -o program

# System header not found
cc -I/usr/local/include program.c -o program

# Check include paths
cc -v program.c 2>&1 | grep "#include"

# Preprocess to check macro expansion
cc -E -dM program.c | head -20
```

#### Linking Problems
```bash
# Undefined symbol errors
cc program.c -o program -lmissing_library

# Library not found
cc program.c -o program -L./lib -lmylib

# Check library dependencies
nm program | grep symbol_name
objdump -t program | grep symbol_name

# Link with verbose output
cc -v program.c -o program -lmylib
```

#### Architecture Mismatches
```bash
# 32-bit vs 64-bit mismatch
cc -m32 program.c -o program_32
cc -m64 program.c -o program_64

# Check file type
file program
file program.o

# Architecture-specific issues
cc -march=native program.c -o program_native
```

### Optimization Issues

#### Performance Problems
```bash
# Optimization too aggressive
cc -O2 program.c -o program  # Use O2 instead of O3

# Floating-point precision issues
cc -O2 -ffloat-store program.c -o program_precise

# Debug optimized code
cc -g -O2 program.c -o program_debug_opt

# Check generated assembly
cc -O2 -S program.c -o program.s
```

#### Size Optimization
```bash
# Code too large
cc -Os -ffunction-sections -fdata-sections program.c -o program_small
gcc -Wl,--gc-sections program.o -o program_gc

# Remove unused code
cc -O2 -flto program.c -o program_lto

# Check symbol table
nm --print-size program.o | sort
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU Compiler Collection
- [`clang`](/docs/commands/development/clang) - LLVM C Compiler
- [`g++`](/docs/commands/development/gpp) - GNU C++ Compiler
- [`make`](/docs/commands/development/make) - Build automation tool
- [`ld`](/docs/commands/development/ld) - GNU linker
- [`ar`](/docs/commands/development/ar) - Archive creator
- [`nm`](/docs/commands/development/nm) - Symbol list extractor
- [`objdump`](/docs/commands/development/objdump) - Object file information
- [`gdb`](/docs/commands/development/gdb) - GNU debugger
- [`valgrind`](/docs/commands/development/valgrind) - Memory debugging tool

## Best Practices

1. **Always enable warnings** with `-Wall` and optionally `-Wextra`
2. **Use optimization levels** appropriately: `-O0` for debugging, `-O2` for release
3. **Include debug information** with `-g` for development builds
4. **Define version and build macros** using `-D` flags
5. **Use consistent include paths** with `-I` options
6. **Treat warnings as errors** with `-Werror` in CI/CD pipelines
7. **Generate position-independent code** with `-fPIC` for shared libraries
8. **Check return values** and handle errors appropriately
9. **Use static analysis** tools alongside compilation
10. **Document build requirements** and compiler-specific features

## Performance Tips

1. **Use `-O2`** for the best balance of performance and reliability
2. **Consider `-Os`** for embedded systems or size-constrained applications
3. **Use `-march=native`** when compiling for the target machine
4. **Enable Link Time Optimization (LTO)** with `-flto` for whole-program optimization
5. **Profile-guided optimization** can provide significant performance gains
6. **Avoid over-optimization** (`-O3` may not always be faster than `-O2`)
7. **Use `-fno-omit-frame-pointer`** when debugging performance issues
8. **Consider cross-compilation** for target-specific optimization
9. **Benchmark different** optimization levels for your specific code
10. **Use compiler-specific intrinsics** for performance-critical code

The `cc` command is a fundamental tool in C development, providing a standardized interface to the system's C compiler. Whether using GCC or Clang as the backend, `cc` offers consistent behavior across Unix-like systems while supporting the rich set of features needed for modern software development, from basic compilation to advanced optimization and debugging capabilities.