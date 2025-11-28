---
title: c++ - C++ Compiler
sidebar_label: c++
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# c++ - C++ Compiler

The `c++` command is a compiler driver for the C++ programming language that invokes the underlying C++ compiler (typically GNU g++ or Clang). It serves as a frontend that processes C++ source files, handles preprocessing, compilation, assembly, and linking phases to produce executable programs, shared libraries, or object files. The c++ command supports modern C++ standards, extensive optimization options, debugging capabilities, and cross-compilation features, making it essential for C++ software development on Linux systems.

## Basic Syntax

```bash
c++ [OPTIONS] INPUT_FILES... [-o OUTPUT_FILE]
c++ -x c++ [OPTIONS] INPUT_FILES... [-o OUTPUT_FILE]
c++ -c [OPTIONS] SOURCE_FILES... [-o OBJECT_FILES]
```

## Common Options

### Compilation Modes
- `-c` - Compile source files to object files, don't link
- `-S` - Compile to assembly language, don't assemble
- `-E` - Run preprocessor only, output to stdout
- `-o FILE` - Specify output filename
- `-x LANGUAGE` - Specify source language (c++, c, etc.)

### Optimization Levels
- `-O0` - No optimization (default)
- `-O1` - Basic optimization
- `-O2` - Standard optimization (recommended)
- `-O3` - Aggressive optimization
- `-Os` - Optimize for size
- `-Oz` - Aggressive size optimization
- `-Og` - Optimizations that don't interfere with debugging
- `-Ofast` - Fastest possible optimization (may violate standards)

### Debugging Options
- `-g` - Generate debug information
- `-g0`-`-g3` - Debug information levels
- `-ggdb` - Generate gdb-specific debug info
- `-gdwarf` - Use DWARF debug format
- `-p` - Generate profiling information
- `-pg` - Generate profiling for gprof

### Warning Levels
- `-Wall` - Enable most warnings
- `-Wextra` - Enable extra warnings
- `-Werror` - Treat warnings as errors
- `-w` - Suppress all warnings
- `-Wpedantic` - Pedantic ISO C++ compliance warnings
- `-Weverything` - Enable all possible warnings (Clang)

### Language Standards
- `-std=c++98` - ISO C++ 1998
- `-std=c++03` - ISO C++ 2003
- `-std=c++11` - ISO C++ 2011
- `-std=c++14` - ISO C++ 2014
- `-std=c++17` - ISO C++ 2017
- `-std=c++20` - ISO C++ 2020
- `-std=c++23` - ISO C++ 2023
- `-std=gnu++XX` - GNU C++ dialect with extensions

### Preprocessor Options
- `-I DIR` - Add directory to include search path
- `-D MACRO[=VALUE]` - Define preprocessor macro
- `-U MACRO` - Undefine preprocessor macro
- `-include FILE` - Include file before compilation
- `-M` - Generate makefile dependencies
- `-MM` - Like -M but omit system headers

### Linking Options
- `-l LIBRARY` - Link with library
- `-L DIR` - Add directory to library search path
- `-static` - Link statically
- `-shared` - Create shared library
- `-fPIC` - Generate position-independent code
- `-rpath PATH` - Set runtime library search path

## Usage Examples

### Basic Compilation

#### Simple Program Compilation
```bash
# Compile single source file to executable
c++ -o program program.cpp

# Compile with standard C++11
c++ -std=c++11 -o program program.cpp

# Compile with warnings and debugging
c++ -Wall -g -o program program.cpp

# Compile with optimization
c++ -O2 -o program program.cpp
```

#### Multiple Source Files
```bash
# Compile multiple source files
c++ -o program main.cpp utils.cpp parser.cpp

# Compile with specific include directories
c++ -I./include -I./libs -o program main.cpp

# Compile with library linking
c++ -o program main.cpp -lssl -lcrypto -lpthread
```

#### Object File Generation
```bash
# Compile to object files only
c++ -c main.cpp -o main.o
c++ -c utils.cpp -o utils.o
c++ -c parser.cpp -o parser.o

# Link object files into executable
c++ -o program main.o utils.o parser.o -lssl -lcrypto

# Compile multiple files to objects automatically
c++ -c *.cpp
```

### Advanced Compilation

#### Optimization Techniques
```bash
# Maximum optimization for performance
c++ -O3 -march=native -o program program.cpp

# Optimize for specific architecture
c++ -O2 -march=haswell -mtune=generic -o program program.cpp

# Optimize for size
c++ -Os -o small_program program.cpp

# Profile-guided optimization
c++ -fprofile-generate -O2 -o program program.cpp
./program
c++ -fprofile-use -O2 -o program program.cpp
```

#### Debug Compilation
```bash
# Full debug information
c++ -g3 -O0 -Wall -o debug_program program.cpp

# Debug with specific format
c++ -ggdb -O0 -o debug_program program.cpp

# Debug with sanitizers
c++ -g -fsanitize=address -o debug_program program.cpp
c++ -g -fsanitize=undefined -o debug_program program.cpp
c++ -g -fsanitize=thread -o debug_program program.cpp

# Debug with memory checker
c++ -g -DMEMCHECK -o debug_program program.cpp
```

#### Library Creation
```bash
# Create static library
ar rcs libmystatic.a mycode1.o mycode2.o
c++ -o program main.cpp -L. -lmystatic

# Create shared library
c++ -fPIC -c mycode1.cpp -o mycode1.o
c++ -fPIC -c mycode2.cpp -o mycode2.o
c++ -shared -o libmyshared.so mycode1.o mycode2.o

# Link against shared library
c++ -o program main.cpp -L. -lmyshared

# Create shared library with soname
c++ -shared -Wl,-soname,libmyshared.so.1 -o libmyshared.so.1.0 mycode1.o mycode2.o
```

### Preprocessor Usage

#### Macro Definitions
```bash
# Define macros at compile time
c++ -DDEBUG -DVERSION=\"1.0\" -o program program.cpp

# Conditional compilation
c++ -DNDEBUG -O2 -o release_program program.cpp
c++ -DDEBUG -g -o debug_program program.cpp

# Platform-specific compilation
c++ -DLINUX_BUILD -o program program.cpp
c++ -DWINDOWS_BUILD -o program.exe program.cpp
```

#### Include Path Management
```bash
# Multiple include directories
c++ -I./include -I./external -I/usr/local/include -o program program.cpp

# System include paths
c++ -I/usr/include/opencv4 -o program program.cpp

# Relative and absolute paths
c++ -I../shared -I/opt/local/include -o program program.cpp
```

### Linking and Libraries

#### Static and Dynamic Linking
```bash
# Static linking (create standalone executable)
c++ -static -o program program.cpp -lssl -lcrypto

# Dynamic linking (default)
c++ -o program program.cpp -lssl -lcrypto

# Mixed linking
c++ -o program program.cpp -Wl,-Bstatic -lssl -Wl,-Bdynamic -lcrypto
```

#### Library Search Paths
```bash
# Add library search directories
c++ -L./lib -L/usr/local/lib -o program main.cpp -lmystuff

# Runtime library path (for shared libraries)
c++ -Wl,-rpath,'$ORIGIN' -o program program.cpp -lmylib
c++ -Wl,-rpath,/usr/local/lib -o program program.cpp -lmylib

# Multiple runtime paths
c++ -Wl,-rpath,/opt/lib -Wl,-rpath,/usr/local/lib -o program program.cpp
```

#### Specific Libraries
```bash
# Math library
c++ -o math_program math.cpp -lm

# POSIX threads
c++ -o threaded_program threaded.cpp -lpthread

# OpenGL
c++ -o opengl_program opengl.cpp -lGL -lGLU -lglut

# SSL/TLS
c++ -o secure_program secure.cpp -lssl -lcrypto

# Boost
c++ -o boost_program boost.cpp -lboost_system -lboost_filesystem
```

## Practical Examples

### Development Workflow

#### Project Compilation
```bash
# Typical project compilation
c++ -std=c++17 -Wall -Wextra -O2 \
    -I./include \
    -I./external/include \
    -o myapp \
    src/main.cpp \
    src/utils.cpp \
    src/network.cpp \
    -L./external/lib \
    -lboost_system \
    -lboost_filesystem \
    -lpthread

# Debug build for development
c++ -std=c++17 -Wall -Wextra -g3 -O0 \
    -DDEBUG \
    -fsanitize=address \
    -I./include \
    -o myapp_debug \
    src/*.cpp \
    -lpthread
```

#### Build System Integration
```bash
# Makefile pattern for C++ compilation
# CXX = c++
# CXXFLAGS = -std=c++17 -Wall -Wextra -O2
# INCLUDES = -I./include
# LIBS = -lpthread
#
# all: program
#
# program: main.o utils.o
# 	$(CXX) $(CXXFLAGS) -o $@ $^ $(LIBS)
#
# %.o: %.cpp
# 	$(CXX) $(CXXFLAGS) $(INCLUDES) -c $< -o $@
```

### Cross-Platform Development

#### Platform-Specific Builds
```bash
# Linux build with specific features
c++ -DLINUX_BUILD -std=c++17 -o program_linux program.cpp

# macOS build with frameworks
c++ -framework Foundation -framework CoreFoundation -o program_mac program.cpp

# Windows build (MinGW)
c++ -DWINDOWS_BUILD -static -o program.exe program.cpp -lws2_32
```

#### 64-bit vs 32-bit Compilation
```bash
# 64-bit compilation (default on modern systems)
c++ -m64 -o program_64 program.cpp

# 32-bit compilation
c++ -m32 -o program_32 program.cpp

# Architecture-specific optimization
c++ -march=x86-64 -mtune=generic -o program program.cpp
c++ -march=armv8-a -mtune=cortex-a72 -o program_arm program.cpp
```

### Performance Optimization

#### Aggressive Optimization
```bash
# Maximum performance build
c++ -O3 -march=native -flto -DNDEBUG \
    -o fast_program program.cpp

# Link Time Optimization (LTO)
c++ -O3 -flto -c program.cpp -o program.o
c++ -O3 -flto -o program program.o

# Profile-guided optimization workflow
c++ -O2 -fprofile-generate -o program_profile program.cpp
./program_profile  # Run with representative input
c++ -O2 -fprofile-use -o program program.cpp
```

#### Vectorization and Parallelism
```bash
# Enable auto-vectorization
c++ -O3 -ftree-vectorize -o vectorized_program program.cpp

# OpenMP support
c++ -fopenmp -o parallel_program parallel.cpp
export OMP_NUM_THREADS=4

# SIMD intrinsic support
c++ -mavx2 -mfma -o simd_program program.cpp
```

### Advanced Features

#### Template Instantiation
```bash
# Explicit template instantiation
c++ -fvisibility-inlines-hidden -o template_program templates.cpp

# Debug templates with verbose output
c++ -ftemplate-backtrace-limit=0 -g -o template_debug templates.cpp

# Suppress template instantiation warnings
c++ -Wno-non-template-friend -o program program.cpp
```

#### Exception Handling
```bash
# Enable exceptions (default)
c++ -fexceptions -o program program.cpp

# Disable exceptions for performance
c++ -fno-exceptions -o fast_program program.cpp

# Set exception handling model
c++ -fexceptions -fasync-unwind-tables -o program program.cpp
```

## Advanced Usage

### Compiler-Specific Features

#### GCC-Specific Options
```bash
# GCC color diagnostics
c++ -fdiagnostics-color=auto -o program program.cpp

# GCC sanitizers
c++ -fsanitize=address,undefined -o program program.cpp

# GCC coverage analysis
c++ -fprofile-arcs -ftest-coverage -o program program.cpp
gcov program.cpp

# GCC time-trace (Clang also supports)
c++ -ftime-trace -o program program.cpp
```

#### Clang-Specific Options
```bash
# Clang static analyzer
c++ -Xanalyzer -analyzer-output=text -o program program.cpp

# Clang tidy integration
c++ -Xclang -analyze -Xclang -analyzer-output=text -o program program.cpp

# Clang modules
c++ -fmodules -o program program.cpp

# Clang address sanitizer with debug info
c++ -g -fsanitize=address -fno-omit-frame-pointer -o program program.cpp
```

### Build Automation

#### Compilation Databases
```bash
# Generate compilation database for IDEs
c++ -MJ compilation_database.json -c program.cpp -o program.o

# Bear tool integration
bear -- c++ -o program program.cpp

# CMake integration (CMake generates proper c++ commands)
mkdir build && cd build
cmake -DCMAKE_CXX_COMPILER=c++ ..
make
```

#### Dependency Generation
```bash
# Generate makefile dependencies
c++ -M -MF deps.d program.cpp

# Generate dependencies without system headers
c++ -MM -MF deps.d program.cpp

# Include dependency files in Makefile
include deps.d
```

### Specialized Compilation

#### Embedded Systems
```bash
# Freestanding environment compilation
c++ -ffreestanding -nostdlib -o firmware.elf firmware.cpp

# Cross-compilation for ARM
c++ -target arm-none-eabi -mcpu=cortex-m4 -o firmware.elf firmware.cpp

# Bare-metal compilation
c++ -ffreestanding -fno-exceptions -fno-rtti -o firmware.elf firmware.cpp
```

#### Kernel Development
```bash
# Linux kernel module compilation
c++ -D__KERNEL__ -DMODULE -o kernel_module.o kernel_module.cpp

# Userspace kernel program
c++ -I./usr/include -o kernel_program kernel_program.cpp
```

## Integration and Automation

### Build Scripts

#### Automated Build Script
```bash
#!/bin/bash
# Advanced C++ build script

set -e

# Configuration
SOURCE_DIR="src"
INCLUDE_DIR="include"
BUILD_DIR="build"
TARGET="myapp"
CXX="c++"
CXXFLAGS="-std=c++17 -Wall -Wextra -O2"
LIBS="-lpthread -lssl -lcrypto"

# Create build directory
mkdir -p "$BUILD_DIR"

# Compile source files
echo "Compiling source files..."
find "$SOURCE_DIR" -name "*.cpp" -exec "$CXX" $CXXFLAGS \
    -I"$INCLUDE_DIR" \
    -c {} -o "$BUILD_DIR"/{\//_}.o \;

# Link executable
echo "Linking executable..."
"$CXX" -o "$TARGET" "$BUILD_DIR"/*.o $LIBS

echo "Build completed successfully: $TARGET"
```

#### Testing Integration
```bash
#!/bin/bash
# Build and test script

# Build test version
c++ -std=c++17 -Wall -Wextra -g -fsanitize=address \
    -DTEST_MODE \
    -o test_program \
    test/*.cpp src/*.cpp \
    -lgtest -lgtest_main -pthread

# Run tests
./test_program --gtest_output=xml:test_results.xml

# Generate coverage report
gcov test/*.cpp
lcov --capture --directory . --output-file coverage.info
genhtml coverage.info --output-directory coverage_html
```

## Troubleshooting

### Common Issues

#### Linking Errors
```bash
# Undefined reference errors
# Solution: Check library order and include required libraries
c++ -o program main.cpp -lpthread -lssl -lcrypto

# Library not found errors
# Solution: Add library search paths
c++ -L./lib -L/usr/local/lib -o program main.cpp -lmylib

# Multiple definition errors
# Solution: Use inline or properly declare with extern
c++ -o program main.cpp utils.cpp -Wl,--allow-multiple-definition
```

#### Compilation Errors
```bash
# Header file not found
# Solution: Add include directories
c++ -I./include -I/usr/local/include -o program program.cpp

# C++ standard not supported
# Solution: Use appropriate standard flag
c++ -std=c++14 -o program program.cpp

# Template instantiation errors
# Solution: Use explicit instantiation or export templates
c++ -fno-implicit-templates -o program program.cpp
```

#### Optimization Issues
```bash
# Optimization breaks program
# Solution: Reduce optimization level or disable specific optimizations
c++ -O1 -fno-strict-aliasing -o program program.cpp

# Debug information missing
# Solution: Ensure debug flags are passed to all compilation stages
c++ -g -O0 -o program program.cpp
c++ -g -O0 -c utils.cpp -o utils.o
c++ -g -O0 -o program main.o utils.o
```

### Performance Debugging

#### Profiling Integration
```bash
# Compile with profiling support
c++ -pg -O2 -o profiled_program program.cpp

# Run and generate profile
./profiled_program
gprof profiled_program gmon.out > profile_report.txt

# Remove profiling symbols
strip profiled_program
```

#### Memory Debugging
```bash
# Valgrind integration
c++ -g -o valgrind_program program.cpp
valgrind --leak-check=full ./valgrind_program

# AddressSanitizer
c++ -g -fsanitize=address -o asan_program program.cpp
./asan_program

# UndefinedBehaviorSanitizer
c++ -g -fsanitize=undefined -o ubsan_program program.cpp
./ubsan_program
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU C Compiler
- [`g++`](/docs/commands/development/gcc) - GNU C++ Compiler
- [`clang`](/docs/commands/development/clang) - Clang C Compiler
- [`clang++`](/docs/commands/development/clang) - Clang C++ Compiler
- [`make`](/docs/commands/development/make) - Build automation tool
- [`cmake`](/docs/commands/development/cmake) - Cross-platform build system
- [`gdb`](/docs/commands/development/gdb) - GNU Debugger
- [`ld`](/docs/commands/development/ld) - GNU Linker
- [`ar`](/docs/commands/development/ar) - Archive utility for static libraries
- [`nm`](/docs/commands/development/nm) - Symbol table examination
- [`objdump`](/docs/commands/development/objdump) - Object file information display
- [`readelf`](/docs/commands/development/readelf) - ELF file information display

## Best Practices

1. **Always enable warnings** (-Wall -Wextra) and fix all warning messages
2. **Use appropriate C++ standard** (-std=c++17 or newer for modern features)
3. **Enable optimization** (-O2 for release builds, -O0 for debugging)
4. **Include debug information** (-g) for all builds intended for debugging
5. **Use position-independent code** (-fPIC) for shared libraries
6. **Specify library dependencies** explicitly and in correct order
7. **Use static analysis tools** like Clang Static Analyzer or cppcheck
8. **Enable sanitizers** during development for catching bugs early
9. **Consistent naming conventions** for source files and output targets
10. **Version control your build scripts** and compilation configurations

## Performance Tips

1. **Link Time Optimization** (-flto) provides significant performance improvements
2. **Profile-guided optimization** (-fprofile-generate/use) yields best results
3. **Architecture-specific flags** (-march=native) improve local performance
4. **Thin LTO** is faster than full LTO for large projects
5. **Incremental builds** save compilation time during development
6. **Parallel compilation** using make -j speeds up large builds
7. **Precompiled headers** reduce compilation time for large headers
8. **Unity builds** can improve compilation speed and optimization
9. **CCache** can dramatically speed up rebuilds
10. **Avoid unnecessary template instantiation** in translation units

The `c++` command provides a comprehensive compilation solution for C++ development, supporting modern language standards, advanced optimization techniques, debugging capabilities, and cross-platform development. Its flexibility and power make it an essential tool for C++ programmers developing anything from simple utilities to complex, performance-critical applications.