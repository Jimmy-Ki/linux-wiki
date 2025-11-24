---
title: gdb - GNU Debugger
sidebar_label: gdb
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gdb - GNU Debugger

The `gdb` command is the GNU Debugger, a powerful program debugging tool that allows developers to examine what is happening inside another program while it executes. GDB can perform four main kinds of operations: start your program, stop on specified conditions, examine what has happened, and change things in your program.

## Basic Syntax

```bash
gdb [options] [executable-file [core-file or process-id]]
```

## Common Options

### Basic Options
- `-h, --help` - Print help message and exit
- `-v, --version` - Print version information and exit
- `-q, --quiet` - Do not print introductory and copyright messages
- `-s, --silent` - Same as `-q`
- `-w, --nw` - No GUI interface mode
- `-w, --nx` - Do not read `.gdbinit` file
- `-tui` - Use Terminal User Interface

### File Options
- `-x `` - Execute GDB commands from file
- `-ex <command>` - Execute given GDB command
- `-b <baud>` - Set serial line baud rate used for remote debugging
- `-l <timeout>` - Set timeout in seconds for remote debugging

### Directory Options
- `-cd <directory>` - Change working directory
- `-d <directory>` - Add directory to source file search path
- `-i <directory>` - Add directory to object file search path

### Core Dump Options
- `-c <core>` - Specify core dump file to examine
- `-p <pid>` - Attach to running process with specified PID

### Target Options
- `-b <baudrate>` - Set serial line baud rate
- `-tty <device>` - Set terminal for debugging

## Basic GDB Commands

### Program Control
```bash
(gdb) run [args]           # Start program execution
(gdb) start                # Start program and stop at main
(gdb) continue [count]     # Continue program execution
(gdb) next [count]         # Execute next line (step over)
(gdb) step [count]         # Execute next line (step into)
(gdb) stepi [count]        # Execute next machine instruction
(gdb) nexti [count]        # Execute next instruction (step over)
(gdb) finish               # Execute until current function returns
(gdb) until [location]     # Execute until specified location
(gdb) return [value]       # Return from function with optional value
(gdb) quit                 # Exit GDB
```

### Breakpoints
```bash
(gdb) break [location]     # Set breakpoint
(gdb) tbreak [location]    # Set temporary breakpoint
(gdb) clear [location]     # Clear breakpoint
(gdb) delete [breakpoints] # Delete breakpoints
(gdb) disable [breakpoints] # Disable breakpoints
(gdb) enable [breakpoints] # Enable breakpoints
(gdb) condition [breakpoint] expression # Set breakpoint condition
(gdb) ignore [breakpoint] count # Set ignore count
(gdb) watch [expression]   # Set watchpoint
(gdb) rwatch [expression]  # Set read watchpoint
(gdb) awatch [expression]  # Set access watchpoint
```

### Program Information
```bash
(gdb) where                # Show current stack
(gdb) backtrace [levels]   # Show backtrace
(gdb) frame [frame-number] # Select stack frame
(gdb) up [n]               # Select up n stack frames
(gdb) down [n]             # Select down n stack frames
(gdb) info frame           # Show information about current frame
(gdb) info locals          # Show local variables
(gdb) info args            # Show function arguments
(gdb) info variables       # Show global and static variables
```

### Variable and Memory Inspection
```bash
(gdb) print [expression]   # Print value of expression
(gdb) p [expression]       # Alias for print
(gdb) display [expression] # Display expression at each stop
(gdb) undisplay [numbers]  # Stop displaying expressions
(gdb) x [format] address   # Examine memory
(gdb) whatis [expression]  # Show type of expression
(gdb) ptype [type]         # Show definition of type
```

### Source Files
```bash
(gdb) list [lines]         # List source lines
(gdb) list [function]      # List source lines of function
(gdb) list [file:lines]    # List specified lines in file
(gdb) set listsize n       # Set number of lines to list
(gdb) directory [directories] # Add source file search directories
```

## Usage Examples

### Basic Debugging Session
```bash
# Compile program with debug information
gcc -g -o program program.c

# Start GDB
gdb ./program

# In GDB session
(gdb) break main           # Set breakpoint at main
(gdb) run                  # Run program
(gdb) step                 # Step through execution
(gdb) print variable_name  # Print variable value
(gdb) continue             # Continue execution
(gdb) quit                 # Exit GDB
```

### Breakpoint Management
```bash
# Set different types of breakpoints
(gdb) break main           # Break at function main
(gdb) break 25             # Break at line 25
(gdb) break file.c:50      # Break at line 50 in file.c
(gdb) break *0x08048abc    # Break at memory address

# Conditional breakpoints
(gdb) break 25 if x == 10  # Break when x equals 10
(gdb) condition 1 x > 100  # Set condition on breakpoint 1

# Temporary breakpoints
(gdb) tbreak main          # Break once at main
(gdb) tbreak 25            # Break once at line 25

# Breakpoint information
(gdb) info breakpoints     # List all breakpoints
(gdb) delete 1             # Delete breakpoint 1
(gdb) clear main           # Clear breakpoint at main
```

### Watchpoints
```bash
# Set watchpoints
(gdb) watch global_var     # Stop when global_var changes
(gdb) watch *0x0804abc0    # Stop when memory changes
(gdb) rwrite local_var     # Stop when local_var is written
(gdb) read read_var        # Stop when read_var is read

# Watchpoint management
(gdb) info watchpoints     # List all watchpoints
(gdb) delete watchpoint 1  # Delete watchpoint 1
```

### Variable Inspection
```bash
# Print variables
(gdb) print x              # Print variable x
(gdb) print array[5]       # Print array element
(gdb) print &x             # Print address of x
(gdb) print *ptr           # Print dereferenced pointer
(gdb) print struct.member  # Print struct member

# Format printing
(gdb) print/x x            # Print in hexadecimal
(gdb) print/t x            # Print in binary
(gdb) print/a x            # Print as address
(gdb) print/c x            # Print as character

# Display variables continuously
(gdb) display x            # Show x at each stop
(gdb) display/y *ptr@10    # Show 10 elements as hex
(gdb) undisplay 1          # Stop displaying expression 1
```

### Stack Navigation
```bash
# Stack frame navigation
(gdb) where                # Show call stack
(gdb) backtrace            # Show full backtrace
(gdb) up                   # Move up one stack frame
(gdb) down                 # Move down one stack frame
(gdb) frame 3              # Select frame 3
(gdb) info frame           # Show current frame info
(gdb) info locals          # Show local variables
(gdb) info args            # Show function arguments
```

## Advanced Debugging

### Memory Inspection
```bash
# Examine memory
(gdb) x/10x 0x0804abc0     # Examine 10 hex bytes
(gdb) x/16i $pc            # Examine 16 instructions at PC
(gdb) x/32s string_ptr     # Examine 32 strings

# Memory format options
# x - hexadecimal
# d - decimal
# u - unsigned decimal
# o - octal
# t - binary
# i - instruction
# c - character
# s - string

# Address calculations
(gdb) print &array + 5     # Print address of array[5]
(gdb) x/wx 0x0804abc0      # Examine word at address
(gdb) x/gx 0x0804abc0      # Examine giant word (8 bytes)
```

### Core Dump Analysis
```bash
# Debug core dump
gdb ./program core

# Core dump analysis
(gdb) where                # Show stack trace at crash
(gdb) info registers       # Show register values
(gdb) info signals         # Show signal information
(gdb) backtrace full       # Show full backtrace with locals
```

### Remote Debugging
```bash
# Start GDB server on remote machine
gdbserver :1234 ./program

# Connect from local machine
gdb ./program
(gdb) target remote remote-host:1234
(gdb) continue
```

### Thread Debugging
```bash
# Thread commands
(gdb) info threads         # List all threads
(gdb) thread 3             # Switch to thread 3
(gdb) thread apply 1-3 bt  # Apply command to threads
(gdb) set scheduler-locking on # Lock scheduler
```

### Conditional Debugging
```bash
# Conditional breakpoints
(gdb) break function if x > 100
(gdb) break 25 if strcmp(name, "test") == 0
(gdb) watch global_var if global_var < 0

# Automatic breakpoints
(gdb) catch throw          # Stop when exception is thrown
(gdb) catch catch          # Stop when exception is caught
(gdb) catch exec           # Stop on exec call
(gdb) catch fork           # Stop on fork call
```

## Practical Examples

### Debugging Segmentation Faults
```bash
# Compile with debug information
gcc -g -Wall -o segfault segfault.c

# Debug segmentation fault
gdb ./segfault
(gdb) run
# Program crashes with segmentation fault
(gdb) where                # Show crash location
(gdb) backtrace            # Show call stack
(gdb) print ptr            # Examine pointer that caused crash
(gdb) x/10x ptr-20         # Examine memory around crash
```

### Function Analysis
```bash
# Step through function
(gdb) break function_name
(gdb) run
(gdb) step                 # Step into function
(gdb) info locals          # See local variables
(gdb) info args            # See function arguments
(gdb) next                 # Step through statements
(gdb) finish               # Return from function
```

### Memory Leak Detection
```bash
# Debug memory allocation
(gdb) break malloc
(gdb) break free
(gdb) break realloc
(gdb) condition 1 size > 1000  # Break on large allocations
(gdb) commands
silent
printf "Allocating %d bytes\n", size
continue
end
```

### Performance Analysis
```bash
# Profile function calls
(gdb) break function_name
(gdb) commands
silent
printf "Function called\n"
continue
end

# Count function calls
(gdb) break function_name
(gdb) commands
silent
set $count = $count + 1
continue
end
(gdb) print $count
```

### Array and Structure Debugging
```bash
# Print arrays
(gdb) print array[0]@10   # Print 10 elements from array[0]
(gdb) print *(int(*)[10])array_ptr # Print as 10-element array
(gdb) p/d array[5]        # Print element 5 in decimal

# Print structures
(gdb) print struct_var    # Print entire structure
(gdb) print struct_var.member  # Print specific member
(gdb) ptype struct_type   # Show structure definition
```

### Template Debugging
```bash
# Custom pretty-printers
(gdb) set print pretty on # Format structures nicely
(gdb) set print array on  # Print arrays nicely
(gdb) set print elements 1000 # Limit array element display

# Set display options
(gdb) set print demangle on # Demangle C++ names
(gdb) set print asm-demangle on # Demangle in assembly
```

## GDB Automation

### Command Files
```bash
# Create .gdbinit file
echo "set print pretty on" > ~/.gdbinit
echo "set pagination off" >> ~/.gdbinit
echo "handle SIGPIPE nostop noprint pass" >> ~/.gdbinit
echo "set history save on" >> ~/.gdbinit
echo "set history size 10000" >> ~/.gdbinit
```

### Command Scripts
```bash
# Execute commands from file
gdb -x debug_script.txt ./program

# debug_script.txt example:
break main
run
step
print x
continue
quit
```

### Python Integration
```bash
# Python scripting in GDB
(gdb) python import sys
(gdb) python print("Debugging:", sys.argv[1])

# Define custom commands
(gdb) define my_command
Type commands for definition of "my_command".
End with a line saying just "end".
>printf "Custom command executed\n"
>end
```

## Specialized Debugging

### Multi-Process Debugging
```bash
# Follow forked processes
(gdb) set follow-fork-mode child
(gdb) set follow-fork-mode parent
(gdb) set detach-on-fork off

# Debug multiple processes
(gdb) info inferiors       # List all inferiors
(gdb) inferior 2           # Switch to inferior 2
```

### Reverse Debugging
```bash
# Enable reverse debugging (if supported)
(gdb) record               # Start recording
(gdb) reverse-step         # Step backwards
(gdb) reverse-continue     # Continue backwards
(gdb) reverse-finish       # Finish backwards
```

### Assembly Debugging
```bash
# Display assembly
(gdb) set disassembly-flavor intel
(gdb) disassemble main
(gdb) layout split         # Show both source and assembly
(gdb) layout asm           # Show assembly only
(gdb) info registers       # Show registers
(gdb) stepi                # Step instruction
```

## Related Commands

- [`gcc`](/docs/commands/development-tools/gcc) - GNU Compiler Collection
- [`make`](/docs/commands/development-tools/make) - Build automation tool
- [`valgrind`](/docs/commands/development-tools/valgrind) - Memory debugging tool
- [`strace`](/docs/commands/development-tools/strace) - System call tracer
- [`ltrace`](/docs/commands/development-tools/ltrace) - Library call tracer
- [`objdump`](/docs/commands/development-tools/objdump) - Object file disassembler
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis
- [`addr2line`](/docs/commands/development-tools/addr2line) - Address to line number converter
- [`c++filt`](/docs/commands/development-tools/cfilt) - C++ name demangler

## Best Practices

1. **Always compile with debug symbols**: Use `-g` flag during development
2. **Set meaningful breakpoints**: Use conditions to avoid unnecessary stops
3. **Use watchpoints carefully**: They can significantly slow execution
4. **Leverage core dumps**: Analyze crashes after they occur
5. **Use .gdbinit files**: Automate common debugging setups
6. **Practice reverse debugging**: When available, reverse debugging is powerful
7. **Master memory inspection**: Understanding memory layout is crucial
8. **Use automation**: Create command scripts for repetitive tasks
9. **Learn assembly basics**: Understanding assembly helps low-level debugging
10. **Document debugging sessions**: Keep notes on complex bugs

## Troubleshooting

### Common Issues
```bash
# No debug symbols
gcc -g program.c -o program  # Recompile with -g

# Missing source files
(gdb) directory /path/to/source  # Add source path

# Optimized code makes debugging difficult
gcc -g -O0 program.c -o program  # Disable optimization

# GDB doesn't follow fork/exec
(gdb) set follow-fork-mode child
(gdb) set detach-on-fork off
```

### Performance Optimization
```bash
# Speed up debugging
(gdb) set pagination off
(gdb) set print pretty off
(gdb) set print elements 200

# Reduce output
(gdb) set width 80
(gdb) set height 30
```

The `gdb` command is an essential tool for C/C++ development on Linux. Mastering its features enables developers to efficiently diagnose and fix complex bugs, optimize performance, and understand program behavior at the deepest levels.