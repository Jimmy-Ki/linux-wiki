---
title: valgrind - Memory Debugging and Profiling Tool
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# valgrind - Memory Debugging and Profiling Tool

The `valgrind` command is a suite of tools for debugging and profiling Linux programs. It includes Memcheck, a memory error detector that can detect memory leaks, invalid memory access, use of undefined values, and other memory-related problems. Valgrind is an essential tool for C/C++ development, helping developers find subtle bugs that often go undetected.

## Basic Syntax

```bash
valgrind [valgrind options] [program options]
valgrind --tool=<tool> [tool options] [program options]
```

## Common Tools

### Memcheck (default tool)
- Detects memory management problems
- Finds leaks, invalid reads/writes, use of uninitialized values
- Most commonly used valgrind tool

### Cachegrind
- Cache and branch prediction profiler
- Helps identify performance bottlenecks

### Callgrind
- Call graph profiler
- More detailed than Cachegrind for function call analysis

### Massif
- Heap profiler
- Helps with memory usage optimization

### Helgrind
- Thread error detector
- Finds data races and deadlocks

### DRD
- Another thread error detector
- Alternative to Helgrind with different algorithms

## Common Options

### General Options
- `--help` - Show help message
- `--version` - Show version information
- `--tool=<tool>` - Specify which tool to use (memcheck, cachegrind, callgrind, etc.)
- `--leak-check=<yes|no|summary|full>` - Check for memory leaks (default: summary)
- `--show-leak-kinds=<set>` - Leak kinds to detect (definite,indirect,possible,reachable)
- `--leak-resolution=<low|med|high>` - Leak resolution (default: high)
- `--trace-children=<yes|no>` - Follow into child processes (default: no)
- `--track-fds=<yes|no>` - Track open file descriptors (default: no)

### Output Control
- `--log-file=`` - Write output to file
- `--quiet` - Suppress startup messages
- `--verbose` - Verbose output
- `--xml=<yes|no>` - Output in XML format
- `--xml-file=`` - XML output file

### Error Suppression
- `--suppressions=`` - Load suppressions from file
- `--gen-suppressions=<yes|no|all>` - Generate suppressions

### Performance Options
- `--max-frames=<number>` - Maximum stack frames to show (default: 12)
- `--num-callers=<number>` - Stack depth for error reporting (default: 12)

## Usage Examples

### Basic Memory Debugging
```bash
# Run program with Memcheck (default tool)
valgrind ./myprogram

# Run with leak checking enabled
valgrind --leak-check=full ./myprogram

# Show all kinds of memory leaks
valgrind --leak-check=full --show-leak-kinds=all ./myprogram

# Suppress startup messages
valgrind --quiet ./myprogram

# Track file descriptors
valgrind --track-fds=yes ./myprogram
```

### Error Reporting Control
```bash
# Increase call stack depth for better error reporting
valgrind --num-callers=20 ./myprogram

# Show all reachable memory blocks
valgrind --leak-check=full --show-leak-kinds=definite,possible ./myprogram

# Generate suppressions for known issues
valgrind --gen-suppressions=all ./myprogram

# Use custom suppressions file
valgrind --suppressions=mycustom.supp ./myprogram
```

### Output Control
```bash
# Save output to file
valgrind --log-file=valgrind.log ./myprogram

# XML output for automated analysis
valgrind --xml=yes --xml-file=valgrind.xml ./myprogram

# Quiet mode for scripting
valgrind --quiet --log-file=valgrind.log ./myprogram

# Verbose output for detailed analysis
valgrind --verbose ./myprogram
```

### Tool Selection
```bash
# Explicitly use Memcheck
valgrind --tool=memcheck ./myprogram

# Use Cachegrind for performance profiling
valgrind --tool=cachegrind ./myprogram

# Use Callgrind for call graph profiling
valgrind --tool=callgrind ./myprogram

# Use Massif for heap profiling
valgrind --tool=massif ./myprogram

# Use Helgrind for thread debugging
valgrind --tool=helgrind ./myprogram
```

## Advanced Memory Debugging

### Detailed Leak Analysis
```bash
# Full leak checking with high resolution
valgrind --leak-check=full --leak-resolution=high ./myprogram

# Show reachable blocks (for detailed analysis)
valgrind --leak-check=full --show-leak-kinds=all ./myprogram

# Track origins of uninitialized values
valgrind --track-origins=yes ./myprogram

# Check for overlapping memory blocks
valgrind --check-heap=yes ./myprogram
```

### Stack Tracing and Debugging
```bash
# Increase stack trace depth
valgrind --num-callers=30 ./myprogram

# Show backtrace for errors
valgrind --show-below-main=yes ./myprogram

# Track all stack frames
valgrind --max-frames=50 ./myprogram

# Use with debug symbols for better traces
valgrind --read-var-info=yes ./myprogram
```

## Performance Profiling with Cachegrind

### Basic Cache Profiling
```bash
# Run with Cachegrind
valgrind --tool=cachegrind ./myprogram

# Generate branch prediction statistics
valgrind --tool=cachegrind --branch-sim=yes ./myprogram

# Save cache analysis output
valgrind --tool=cachegrind --cachegrind-out-file=cache.out ./myprogram

# Analyze with cg_annotate
cg_annotate cache.out
```

### Cache Analysis
```bash
# Detailed cache simulation
valgrind --tool=cachegrind --cache-sim=yes ./myprogram

# Show instruction and data cache misses
valgrind --tool=cachegrind --cache-sim=yes ./myprogram

# Analyze specific functions
valgrind --tool=cachegrind --fn-scan=yes ./myprogram
```

## Call Graph Profiling with Callgrind

### Basic Call Graph Profiling
```bash
# Run with Callgrind
valgrind --tool=callgrind ./myprogram

# Collect detailed call information
valgrind --tool=callgrind --dump-instr=yes ./myprogram

# Collect at function level only
valgrind --tool=callgrind --dump-line=no ./myprogram

# Generate call graph
valgrind --tool=callgrind ./myprogram
kcachegrind callgrind.out.*
```

### Callgrind Analysis
```bash
# Run callgrind with specific output file
valgrind --tool=callgrind --callgrind-out-file=myapp.out ./myprogram

# Analyze with callgrind_annotate
callgrind_annotate myapp.out

# Use with KCachegrind GUI
kcachegrind myapp.out
```

## Heap Profiling with Massif

### Memory Usage Profiling
```bash
# Run with Massif
valgrind --tool=massif ./myprogram

# Detailed heap profiling
valgrind --tool=massif --heap=yes ./myprogram

# Stack profiling
valgrind --tool=massif --stacks=yes ./myprogram

# Specify output file
valgrind --tool=massif --massif-out-file=massif.out ./myprogram

# Analyze results
ms_print massif.out
```

### Memory Allocation Analysis
```bash
# Track memory allocation sites
valgrind --tool=massif --alloc-fn=malloc --alloc-fn=calloc ./myprogram

# Show detailed allocation information
valgrind --tool=massif --detailed-freq=10 ./myprogram

# Minimum allocation threshold
valgrind --tool=massif --threshold=0.1 ./myprogram
```

## Thread Debugging with Helgrind

### Race Condition Detection
```bash
# Run with Helgrind
valgrind --tool=helgrind ./mythreaded_program

# Track thread creation
valgrind --tool=helgrind --track-lockorders=yes ./myprogram

# Show detailed race information
valgrind --tool=helgrind --show-error-list=yes ./myprogram

# Race condition analysis
valgrind --tool=helgrind --history-level=full ./myprogram
```

### Deadlock Detection
```bash
# Check for deadlocks
valgrind --tool=helgrind --check-stack-var=yes ./myprogram

# Detailed synchronization analysis
valgrind --tool=helgrind --conflict-cache-size=1000000 ./myprogram
```

## Practical Examples

### Memory Leak Detection
```bash
# Compile with debug symbols
gcc -g -o myprogram myprogram.c

# Find memory leaks
valgrind --leak-check=full --show-leak-kinds=all ./myprogram

# Track specific memory allocations
valgrind --leak-check=full --trace-children=yes ./myprogram
```

### Buffer Overflow Detection
```bash
# Detect buffer overflows
valgrind --track-origins=yes ./myprogram

# Find use of uninitialized values
valgrind --track-origins=yes --leak-check=full ./myprogram
```

### Performance Optimization
```bash
# Cache performance analysis
valgrind --tool=cachegrind ./performance_critical_program

# Call graph for optimization
valgrind --tool=callgrind ./myprogram

# Memory usage optimization
valgrind --tool=massif ./memory_intensive_program
```

### Regression Testing
```bash
# Automated memory testing
valgrind --quiet --log-file=test.log --error-exitcode=1 ./test_program

# Memory leak regression test
valgrind --leak-check=full --error-exitcode=1 ./unit_tests
```

## Integration with Development Workflow

### Makefile Integration
```makefile
# Memory check target
memcheck: program
	valgrind --leak-check=full --error-exitcode=1 ./program

# Performance profiling
profile: program
	valgrind --tool=cachegrind --cachegrind-out-file=cache.out ./program
	cg_annotate cache.out

# Thread safety check
helgrind: program
	valgrind --tool=helgrind ./program
```

### Continuous Integration
```bash
#!/bin/bash
# ci_memory_check.sh

echo "Running memory checks..."
valgrind --quiet --error-exitcode=1 --leak-check=full ./myprogram
if [ $? -eq 0 ]; then
    echo "Memory check passed"
else
    echo "Memory check failed"
    exit 1
fi
```

## Related Commands

- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`strace`](/docs/commands/development-tools/strace) - System call tracer
- [`ltrace`](/docs/commands/development-tools/ltrace) - Library call tracer
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`addr2line`](/docs/commands/development-tools/addr2line) - Address to line number converter
- [`c++filt`](/docs/commands/development-tools/cfilt) - C++ name demangler
- [`objdump`](/docs/commands/development-tools/objdump) - Object file disassembler
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis

## Best Practices

1. **Compile with debug symbols**: Always use `-g` flag for meaningful output
2. **Use appropriate tools**: Choose the right valgrind tool for your needs
3. **Fix errors systematically**: Address errors from top to bottom in output
4. **Use suppression files**: Create suppressions for known library issues
5. **Test regularly**: Use valgrind throughout development cycle
6. **Analyze performance**: Use profiling tools for optimization decisions
7. **Check for leaks**: Always check for memory leaks before releases
8. **Use with build systems**: Integrate valgrind into automated testing
9. **Track origin of errors**: Use `--track-origins=yes` for uninitialized values
10. **Save output**: Use log files for analysis and documentation

## Troubleshooting

### Common Issues
```bash
# Valgrind not installed
sudo apt-get install valgrind  # Ubuntu/Debian
sudo yum install valgrind      # RHEL/CentOS

# Program runs too slow
valgrind --tool=massif ./program  # Less overhead than Memcheck

# Too many false positives
valgrind --suppressions=/usr/lib/valgrind/default.supp ./program

# Missing debug symbols
gcc -g -o program program.c  # Recompile with debug info
```

### Performance Optimization
```bash
# Reduce overhead
valgrind --tool=massif ./program  # Less memory overhead
valgrind --num-callers=5 ./program  # Reduce stack depth

# Faster leak checking
valgrind --leak-check=summary ./program
```

The `valgrind` command is an essential tool for C/C++ development, providing powerful memory debugging, profiling, and thread safety checking capabilities. Mastering its various tools and options enables developers to create more reliable, efficient, and maintainable software by catching memory-related errors early in the development process.