---
title: ar - Archive Utility
sidebar_label: ar
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ar - Archive Utility

The `ar` command is a Unix archive utility that creates, modifies, and extracts from static libraries (archives). It's primarily used for creating and maintaining object file archives that are linked into programs during compilation. The `ar` command works with `.a` archive files, which are essentially collections of object files with a special header structure. It's an essential tool in the C/C++ development workflow for creating static libraries and managing object code collections.

## Basic Syntax

```bash
ar [-]{dmpqrstx}[abcfilNoPsSuvV] [--plugin <name>] [member-name] [count] archive-file file...
ar -M [<mri-script]
```

## Common Commands

- `d` - Delete files from archive
- `m` - Move files in archive
- `p` - Print files to stdout
- `q` - Quick append files to archive (no index update)
- `r` - Replace or add files to archive
- `s` - Create archive index (or update it)
- `t` - Display contents of archive
- `x` - Extract files from archive

## Common Options

### Archive Creation and Modification
- `r` - Replace existing or insert new files into archive
- `q` - Quick append files to archive without updating index
- `c` - Create archive silently (don't warn about creation)
- `s` - Create or update archive symbol table/index
- `u` - Update only newer files in archive

### Archive Extraction and Display
- `x` - Extract files from archive
- `t` - List table of contents of archive
- `p` - Print contents of files to stdout
- `o` - Preserve original dates when extracting files

### Archive Maintenance
- `d` - Delete files from archive
- `m` - Move files within archive
- `a` - Add files after specified member
- `b` - Add files before specified member
- `i` - Insert files before specified member (same as b)

### Output Options
- `v` - Verbose mode (detailed operation information)
- `V` - Display version information
- `--version` - Show program version

### Archive Format Options
- `D` - Use deterministic mode (zero timestamps and uids/gids)
- `U` - Use actual timestamps and uids/gids (default)
- `P` - Use full path names when matching

### Other Options
- `N` - Use count parameter with extraction operations
- `M` - Operate in MRI compatibility mode
- `--plugin <name>` - Load specified plugin
- `--help` - Display help information

## Usage Examples

### Basic Archive Operations

#### Creating Archives
```bash
# Create new static library from object files
ar rcs libmath.a math.o complex.o matrix.o

# Create archive without symbol table (faster creation)
ar rc libutil.a string.o file.o memory.o

# Create archive with verbose output
ar rvc libgraphics.a draw.o render.o shader.o

# Create deterministic archive (reproducible builds)
ar rcsD libcrypto.a encrypt.o decrypt.o hash.o

# Create archive and add files after specific member
ar ra libengine.a main.o core.o
```

#### Adding and Updating Files
```bash
# Add new object files to existing archive
ar rcs libmyapp.a newmodule.o

# Quick append (no symbol table update)
ar q libmyapp.a temp.o debug.o

# Update only if source files are newer
ar ru libmyapp.a utils.o helpers.o

# Add file after specific member
ar ra libmyapp.a init.o startup.o main.o

# Add file before specific member
ar rb libmyapp.a cleanup.o exit.o main.o
```

#### Extracting Files
```bash
# Extract all files from archive
ar x libmath.a

# Extract specific files
ar x libmath.a math.o matrix.o

# Extract with original timestamps
ar xo libmath.a

# Extract first N files
ar xN 5 libmath.a

# Extract and preserve full paths
ar xP libmath.a
```

### Library Development

#### Static Library Creation
```bash
# Compile source files and create static library
gcc -c math.c -o math.o
gcc -c complex.c -o complex.o
gcc -c matrix.c -o matrix.o
ar rcs libmath.a math.o complex.o matrix.o

# Create library from multiple source files
gcc -c *.c
ar rcs liball.a *.o

# Create library with deterministic mode for reproducible builds
ar rcsD librepro.a *.o
```

#### Library Maintenance
```bash
# List contents of library
ar t libmath.a

# List with detailed information
ar tv libmath.a

# Print specific object file contents
ar p libmath.a math.o

# Delete object from library
ar d libmath.a old_module.o

# Move object within archive
ar m libmath.a old_position.o new_position.o

# Update symbol table only
ar s libmath.a
```

#### Library Optimization
```bash
# Create thin archive (references external objects)
ar rcsT libthin.a reference1.o reference2.o

# Create library from multiple archives
ar rcs libcombined.a libfirst.a libsecond.a

# Update library and force symbol table recreation
ar rcs libmath.a math.o complex.o matrix.o
ranlib libmath.a  # Alternative to ar s
```

### Development Workflow

#### Building Projects with Static Libraries
```bash
# Create library from object files
ar rcs libproject.a module1.o module2.o module3.o

# Link program with static library
gcc main.o -L. -lproject -o myprogram

# Create and use library in single command
gcc -c *.c
ar rcs libapp.a *.o
gcc app_main.o -L. -lapp -o application

# Build with debug information
gcc -g -c debug.c -o debug.o
ar rcs libdebug.a debug.o
```

#### Cross-Platform Development
```bash
# Create 32-bit library on 64-bit system
gcc -m32 -c source.c -o source_32.o
ar rcs lib32.a source_32.o

# Create library for embedded target
arm-none-eabi-gcc -c embedded.c -o embedded.o
ar rcs libembedded.a embedded.o

# Create library with specific architecture flags
gcc -march=armv7-a -c arm_code.c -o arm_code.o
ar rcs libarm.a arm_code.o
```

## Advanced Usage

### Archive Management

#### Symbol Table Operations
```bash
# Create or update symbol table
ar s libmath.a

# Create symbol table with verbose output
ar sv libmath.a

# Create deterministic symbol table
ar sD libmath.a

# Check if symbol table exists
nm libmath.a  # Shows symbols if table exists
```

#### Archive Conversion and Manipulation
```bash
# Convert thin archive to regular archive
ar rcs libregular.a libthin.a

# Extract all objects and recreate with different options
ar x libold.a
ar rcsD libnew.a *.o

# Merge multiple archives
ar rcs libcombined.a lib1.a lib2.a lib3.a

# Create archive from other archives and objects
ar rcs libfinal.a libcommon.a specific.o utils.o
```

### Performance Optimization

#### Large Archive Management
```bash
# Create archive efficiently for many objects
find . -name "*.o" -exec ar rcs libbig.a {} +

# Use parallel compilation and archiving
make -j$(nproc)  # Compile in parallel
ar rcs libparallel.a *.o  # Archive after compilation

# Create incremental archive
ar q libincremental.a new_objects.o
ar s libincremental.a  # Update index
```

#### Build System Integration
```bash
# Makefile rule for static library
libmyapp.a: $(OBJECTS)
	ar rcs $@ $^
	ranlib $@

# GNU make with automatic dependencies
%.a: %.o
	ar rcs $@ $<

# CMake integration
add_library(mylibrary STATIC source1.c source2.c)
```

## Practical Examples

### System Administration

#### Backup and Recovery
```bash
# Create archive of important object files
ar rcs backup_objects.a /usr/lib/*.o

# Archive and compress object files
ar rcs objects_backup.a *.o
gzip objects_backup.a

# Verify archive integrity
ar t backup_objects.a | wc -l
```

#### Library Distribution
```bash
# Create distribution package
ar rcs dist_lib.a *.o
ar tv dist_lib.a > dist_manifest.txt

# Create multiple architecture packages
ar rcs lib_x86_64.a x86_64/*.o
ar rcs lib_arm64.a arm64/*.o
```

### Development Scenarios

#### Software Development
```bash
# Create library for mathematical operations
gcc -c -fPIC math_utils.c -o math_utils.o
gcc -c -fPIC string_utils.c -o string_utils.o
ar rcs libutils.a math_utils.o string_utils.o

# Create library for graphics operations
gcc -c -O3 render.c -o render.o
gcc -c -O3 texture.c -o texture.o
ar rcs libgraphics.a render.o texture.o

# Create debug library
gcc -g -c debug_module.c -o debug_module.o
ar rcs libdebug.a debug_module.o
```

#### Library Versioning
```bash
# Create versioned libraries
ar rcs libproject_v1.a v1/*.o
ar rcs libproject_v2.a v2/*.o

# Create compatibility library
ar rcs libcompat.a old_api.o wrapper.o

# Update library with new version
ar rcs libproject.a *.o
mv libproject.a libproject_v3.a
```

## Troubleshooting

### Common Issues

#### Archive Creation Problems
```bash
# Archive already exists - use c flag to silence warning
ar rc libtest.a *.o  # No warning about creation

# Symbol table issues - recreate symbol table
ar s libproblem.a
ranlib libproblem.a  # Alternative method

# Permission denied - check write permissions
ls -la lib*.a
chmod 644 libtest.a
```

#### Linking Issues
```bash
# Multiple definitions - check archive contents
ar tv libduplicate.a

# Unresolved symbols - check symbol table
nm libproblem.a | grep "U"

# Archive not found - verify library path
ar t libmissing.a
```

#### Performance Issues
```bash
# Slow archiving with many files - use find
find . -name "*.o" -print0 | xargs -0 ar rcs libbig.a

# Large archives - consider splitting into smaller ones
ar rcs libcore.a core_*.o
ar rcs libutils.a util_*.o
```

## Integration and Automation

### Shell Scripts

#### Automated Library Building
```bash
#!/bin/bash
# Automated static library builder

LIB_NAME="myproject"
OBJECT_DIR="objects"
ARCHIVE_FILE="lib${LIB_NAME}.a"

# Compile source files
echo "Compiling source files..."
gcc -c -fPIC src/*.c -o ${OBJECT_DIR}/

# Create archive
echo "Creating static library..."
ar rcs ${ARCHIVE_FILE} ${OBJECT_DIR}/*.o

# Verify archive
echo "Verifying archive contents..."
ar tv ${ARCHIVE_FILE}

echo "Library ${ARCHIVE_FILE} created successfully!"
```

#### Archive Maintenance Script
```bash
#!/bin/bash
# Archive maintenance and backup

ARCHIVE_DIR="/usr/local/lib"
BACKUP_DIR="/backup/archives"
DATE=$(date +%Y%m%d)

# Backup existing archives
find ${ARCHIVE_DIR} -name "*.a" -exec cp {} ${BACKUP_DIR}/{}.${DATE} \;

# Update symbol tables
find ${ARCHIVE_DIR} -name "*.a" -exec ar s {} \;

echo "Archive maintenance completed"
```

## Related Commands

- [`gcc`](/docs/commands/development/gcc) - GNU C compiler
- [`g++`](/docs/commands/development/g++) - GNU C++ compiler
- [`ld`](/docs/commands/other/ld) - GNU linker
- [`nm`](/docs/commands/development/nm) - Symbol table display utility
- [`objdump`](/docs/commands/development/objdump) - Object file information utility
- [`ranlib`](/docs/commands/development/ranlib) - Archive index generator
- [`make`](/docs/commands/development/make) - Build automation tool
- [`strip`](/docs/commands/development/strip) - Strip symbols from object files
- [`ldconfig`](/docs/commands/other/ldconfig) - Configure dynamic linker run-time bindings
- [`pkg-config`](/docs/commands/development/pkg-config) - Package configuration tool

## Best Practices

1. **Always use the `s` flag** when creating libraries to ensure proper symbol table generation
2. **Use deterministic mode** (`D` flag) for reproducible builds and consistent output
3. **Organize object files** logically before archiving to maintain clear structure
4. **Update symbol table** after manual modifications using `ar s` or `ranlib`
5. **Use thin archives** (`T` flag) for large projects with many object files
6. **Consider parallel compilation** before archiving for better performance
7. **Verify archive contents** with `ar t` before distribution
8. **Maintain consistent naming conventions** for libraries (lib*.a pattern)
9. **Use version control** for both source and archive files when appropriate
10. **Test libraries thoroughly** after creation with sample programs

## Performance Tips

1. **Batch operations** are faster than individual file operations
2. **Use `find` with `xargs`** for handling large numbers of object files efficiently
3. **Create thin archives** for development to avoid copying large object files
4. **Update symbol tables** only when necessary to reduce build time
5. **Use deterministic archives** for consistent build outputs across systems
6. **Avoid excessive archive manipulation** - prefer complete recreation for major changes
7. **Monitor archive size** and consider splitting very large archives
8. **Use `ranlib` instead of `ar s`** for clearer intention in build scripts
9. **Consider using `make`** for complex library building with dependencies
10. **Profile archive operations** for large projects to identify bottlenecks

The `ar` command is a fundamental tool for C/C++ development, providing efficient management of static libraries through its archive creation, modification, and extraction capabilities. Its integration with the GNU toolchain and support for various optimization modes makes it essential for building efficient, maintainable software projects.

---

## Cross References

- **Static Libraries**: Used extensively with gcc/g++ for creating reusable code modules
- **Build Systems**: Integral part of Make, CMake, and other build automation tools
- **Package Management**: Combined with tar and compression tools for library distribution
- **Debugging**: Works with gdb and nm for symbol resolution and debugging
- **Cross-Compilation**: Essential for creating libraries for different target architectures