---
title: ltrace - Library Call Tracer
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ltrace - Library Call Tracer

The `ltrace` command intercepts and records the dynamic library function calls made by a process and the signals received by that process. It's an invaluable tool for debugging, profiling, and understanding how programs interact with shared libraries, complementing `strace` which traces system calls.

## Basic Syntax

```bash
ltrace [options] [-e expr]... [-f] [-L] [-o file] [-p pid]... [command [args...]]
ltrace -c [options] [-e expr]... [command [args...]]
```

## Common Options

### Basic Options
- `-h, --help` - Print help message and exit
- `-V, --version` - Print version information and exit
- `-f` - Trace child processes created by fork
- `-L` - Do NOT display library calls
- `-F `` - Use file containing addresses and names
- `-o `` - Write trace to file instead of stderr
- `-p <pid>` - Attach to existing process with specified PID
- `-c` - Count time, calls, and errors for each library call
- `-n` - Do not display function names
- `-S` - Trace system calls as well as library calls
- `-a, --align <column>` - Alignment column for return values (default 40)

### Display Options
- `-A, --noargs` - Do not print arguments
- `-s, --string <size>` - Maximum string size to print (default 32)
- `-x, --hex` - Display arguments in hexadecimal
- `-X, --hex-strings` - Display strings in hexadecimal
- `-i, --indent` - Indent output according to call stack
- `-T, --time` - Show time spent in each library call
- `-r, --relative-time` - Print relative timestamp on each call
- `-t, --absolute-time` - Prefix each line with absolute timestamp
- `-tt` - Prefix with microsecond timestamp
- `-u, --username <username>` - Run command as specified user

### Filtering Options
- `-e <expr>` - Specify expression to filter calls
- `-l, --library <pattern>` - Only trace symbols in matching libraries
- `-D, --debug <level>` - Enable debugging output

## Expression Syntax

### Basic Expression Format
```bash
# Trace specific functions
-e printf,strcpy

# Exclude specific functions
-e !printf

# Use regular expressions
-e print*

# Wildcard matching
-e *malloc*,*free*
```

### Library Filtering
```bash
# Trace specific library
-e lib:libc.so.6

# Trace multiple libraries
-e lib:libc.so.6,libm.so.6

# Exclude library
-e !lib:libpthread.so.0

# Pattern matching
-e lib:*c.so*
```

## Usage Examples

### Basic Library Call Tracing
```bash
# Trace all library calls of a program
ltrace ls -la

# Trace with timing information
ltrace -T ls -la

# Trace with timestamps
ltrace -t ls -la

# Trace with microsecond timestamps
ltrace -tt ls -la

# Combine timing options
ltrace -ttT ls -la
```

### Output Control
```bash
# Save trace to file
ltrace -o ltrace.log ls -la

# No function names (only addresses)
ltrace -n ls -la

# Do not show arguments
ltrace -A ls -la

# Indent according to call depth
ltrace -i ls -la

# Custom alignment for return values
ltrace -a 60 ls -la
```

### Argument Display Control
```bash
# Increase string display length
ltrace -s 256 printf "Hello, world!\n"

# Display arguments in hexadecimal
ltrace -x ls -la

# Display strings in hexadecimal
ltrace -X printf "\x48\x65\x6c\x6c\x6f\n"

# No arguments display
ltrace -A ls -la
```

### Filtering Library Calls
```bash
# Trace specific functions
ltrace -e printf,scanf myprogram

# Trace functions matching pattern
ltrace -e "*malloc*" myprogram

# Exclude specific functions
ltrace -e "!printf" myprogram

# Multiple specific functions
ltrace -e printf,strcpy,strlen myprogram
```

### Library Filtering
```bash
# Only trace libc functions
ltrace -l libc.so.6 myprogram

# Trace multiple libraries
ltrace -l libc.so.6 -l libm.so.6 myprogram

# Exclude specific library
ltrace -l !libpthread.so.0 myprogram

# Pattern matching for libraries
ltrace -l "*c.so*" myprogram
```

### Attaching to Running Processes
```bash
# Attach to running process
ltrace -p 1234

# Attach with timing
ltrace -T -p 1234

# Attach multiple processes
ltrace -p 1234 -p 5678

# Save to file
ltrace -o app.log -p 1234

# Follow child processes
ltrace -f -p 1234
```

### Statistics and Counting
```bash
# Generate library call statistics
ltrace -c ls -la

# Statistics with sorting
ltrace -c -S calls ls -la
ltrace -c -S time ls -la

# Statistics for specific functions
ltrace -c -e "*malloc*" myprogram
```

## Advanced Usage

### Memory Allocation Tracking
```bash
# Trace memory allocation functions
ltrace -e "malloc*,free*,calloc*,realloc*" myprogram

# Memory allocation with timing
ltrace -T -e "malloc*,free*" myprogram

# Count memory operations
ltrace -c -e "malloc*,free*" myprogram

# Trace specific memory library
ltrace -l libmalloc.so.0 myprogram
```

### String Operations
```bash
# Trace string manipulation functions
ltrace -e "strlen,strcpy,strcat,strcmp" myprogram

# Display string contents with increased size
ltrace -s 512 -e "*str*" myprogram

# String operations with hex output
ltrace -X -e "*str*" myprogram
```

### Mathematical Functions
```bash
# Trace math library functions
ltrace -l libm.so.6 math_program

# Specific math functions
ltrace -e "sin,cos,tan,log,exp" math_program

# Math function performance
ltrace -T -l libm.so.6 math_program
```

### I/O Operations
```bash
# Trace I/O functions
ltrace -e "fopen,fclose,fread,fwrite,printf,scanf" io_program

# File descriptor operations
ltrace -e "open,close,read,write" file_program

# Standard I/O
ltrace -e "printf,scanf,puts,gets" console_program
```

## Practical Examples

### Debugging Dynamic Linking Issues
```bash
# Trace library loading
ltrace -e "dlopen,dlsym,dlclose" myprogram

# Check library resolution
ltrace -e "printf,puts" myprogram 2>&1 | grep -E "(printf|puts)"

# Debug missing symbols
ltrace -e function_name myprogram
```

### Performance Analysis
```bash
# Find slow library calls
ltrace -T myprogram 2>&1 | sort -k4 -nr | head -10

# Library call frequency analysis
ltrace -c myprogram

# I/O performance analysis
ltrace -T -e "fread,fwrite" file_program
```

### Memory Leak Investigation
```bash
# Track memory allocation
ltrace -e "malloc*,free*" myprogram | tee memory.log

# Count allocations vs frees
ltrace -c -e "malloc*,free*" myprogram

# Find unmatched malloc/free
ltrace -e "malloc*,free*" myprogram | grep -E "(malloc|free)"
```

### Library Function Call Analysis
```bash
# Trace program initialization
ltrace -e "__libc_start_main" myprogram

# Thread-related functions
ltrace -e "pthread_*" threaded_program

# Signal handling functions
ltrace -e "signal,sigaction" signal_program
```

### Integration with Debugging
```bash
# Combine with gdb for deeper analysis
ltrace -o ltrace.out myprogram &
gdb -p $(pgrep myprogram)

# Use ltrace to inform debugging session
ltrace -e "printf,strcpy" myprogram 2>&1 | grep -E "(error|fail)"
```

## Filtering and Analysis

### Complex Filtering
```bash
# Multiple function types
ltrace -e "*malloc*,*str*" -e "printf" myprogram

# Exclude noise functions
ltrace -e "!printf,!malloc" myprogram

# Combined library and function filtering
ltrace -l libc.so.6 -e "*str*" myprogram
```

### Output Processing
```bash
# Extract function names
ltrace myprogram 2>&1 | grep '^[^ ]' | cut -d'(' -f1 | sort | uniq

# Count specific function calls
ltrace -e "malloc" myprogram 2>&1 | grep malloc | wc -l

# Find long-running calls
ltrace -T myprogram 2>&1 | grep -E "^[^ ]*<[^0]"

# Analyze call patterns
ltrace -c myprogram | sort -k2 -nr
```

## Comparison with strace

### When to Use ltrace
- Library function calls instead of system calls
- Dynamic linking issues
- Memory allocation debugging
- String operation tracking
- Mathematical function profiling

### Complementary Usage
```bash
# Use both for complete picture
strace -e trace=open,read,write myprogram
ltrace -e "fopen,fread,fwrite" myprogram

# Compare system call vs library call overhead
time strace -c myprogram
time ltrace -c myprogram
```

## Related Commands

- [`strace`](/docs/commands/development-tools/strace) - System call tracer
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`valgrind`](/docs/commands/development-tools/valgrind) - Memory debugging tool
- [`ldd`](/docs/commands/development-tools/ldd) - List dynamic dependencies
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`objdump`](/docs/commands/development-tools/objdump) - Object file information
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis
- [`ps`](/docs/commands/system-info/ps) - Process information
- [`top`](/docs/commands/process-management/top) - Process monitoring
- [`lsof`](/docs/commands/system-info/lsof) - List open files

## Best Practices

1. **Use specific filtering**: Focus on relevant functions to reduce output
2. **Combine with timing**: Use `-T` for performance analysis
3. **Save to file**: Use `-o` for long-running programs or complex analysis
4. **Know your libraries**: Use `-l` to focus on specific libraries
5. **Use statistics mode**: `-c` provides valuable performance insights
6. **Consider overhead**: ltrace can significantly slow applications
7. **Use with debug symbols**: Ensure programs are compiled with debugging info
8. **Filter string output**: Use `-s` to control string display length
9. **Use for library debugging**: Excellent for dynamic linking issues
10. **Combine with strace**: Use both for complete system understanding

## Troubleshooting

### Common Issues
```bash
# Permission denied when attaching
sudo ltrace -p 1234

# No symbols found
ltrace -l library.so program

# Program uses static linking
ldd program  # Check if dynamic libraries are used

# Missing debug symbols
ltrace -C program  # Demangle C++ names
```

### Performance Considerations
```bash
# Reduce overhead
ltrace -e specific_function program

# Use statistics mode
ltrace -c program

# Filter by library
ltrace -l libc.so.6 program
```

The `ltrace` command is an essential tool for debugging and profiling applications that use dynamic libraries. Mastering its filtering capabilities and understanding library call patterns enables effective troubleshooting of dynamic linking issues, memory management problems, and performance bottlenecks in shared libraries.