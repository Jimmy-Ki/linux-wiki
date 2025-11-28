---
title: gdb - GNU Debugger
sidebar_label: gdb
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gdb - GNU Debugger

The `gdb` command is the GNU Debugger, a powerful and versatile program debugging tool that allows developers to examine what is happening inside another program while it executes. GDB can perform four main kinds of operations: start your program, stop on specified conditions, examine what has happened, and change things in your program. It supports debugging programs written in C, C++, Fortran, Objective-C, Pascal, assembly, and other languages. GDB provides features like breakpoints, watchpoints, source-level debugging, machine-level debugging, and remote debugging capabilities, making it an essential tool for software development and system programming.

## Basic Syntax

```bash
gdb [options] [executable-file [core-file or process-id]]
gdb [options] --args executable-file [arguments...]
```

## Command Line Options

### Basic Options
- `-h, --help` - Print help message and exit
- `-v, --version` - Print version information and exit
- `-q, --quiet` - Do not print introductory and copyright messages
- `-s, --silent` - Same as `-q`
- `-w, --nw` - No GUI interface mode
- `-w, --nx` - Do not read `.gdbinit` file
- `-tui` - Use Terminal User Interface
- `--args` - Pass arguments to the program being debugged

### File Options
- `-x <file>` - Execute GDB commands from file
- `-ex <command>` - Execute given GDB command after startup
- `-b <baud>` - Set serial line baud rate used for remote debugging
- `-l <timeout>` - Set timeout in seconds for remote debugging

### Directory Options
- `-cd <directory>` - Change working directory
- `-d <directory>` - Add directory to source file search path
- `-i <directory>` - Add directory to object file search path

### Core Dump and Process Options
- `-c <core>` - Specify core dump file to examine
- `-p <pid>` - Attach to running process with specified PID
- `-tty <device>` - Set terminal for debugging

### Target Options
- `-b <baudrate>` - Set serial line baud rate
- `-readnow` - Read all symbols immediately on startup

### Output Options
- `-f, --fullname` - Print full file and line number for each stack frame
- `-return-child-result` - Return child process exit status

## Core GDB Commands

### Program Execution Control
- `run [args]` or `r [args]` - Start program execution with arguments
- `start` - Start program and stop at main function
- `continue [count]` or `c [count]` - Continue program execution
- `next [count]` or `n [count]` - Execute next line (step over functions)
- `step [count]` or `s [count]` - Execute next line (step into functions)
- `stepi [count]` or `si [count]` - Execute next machine instruction
- `nexti [count]` or `ni [count]` - Execute next instruction (step over)
- `finish` - Execute until current function returns
- `until [location]` or `u [location]` - Execute until specified location
- `return [value]` - Return from function with optional value
- `kill` - Kill the program being debugged
- `quit` or `q` - Exit GDB

### Breakpoint Management
- `break [location]` or `b [location]` - Set breakpoint
- `tbreak [location]` - Set temporary breakpoint (deleted when hit)
- `clear [location]` - Clear breakpoint at location
- `delete [breakpoints]` - Delete specified breakpoints
- `disable [breakpoints]` - Disable specified breakpoints
- `enable [breakpoints]` - Enable specified breakpoints
- `condition [breakpoint] expression` - Set breakpoint condition
- `ignore [breakpoint] count` - Set ignore count for breakpoint
- `commands [breakpoint]` - Define commands to execute at breakpoint

### Watchpoints and Catchpoints
- `watch [expression]` - Set write watchpoint (stops when expression changes)
- `rwatch [expression]` - Set read watchpoint (stops when expression is read)
- `awatch [expression]` - Set access watchpoint (stops on read or write)
- `catch [event]` - Set catchpoint for events (throw, catch, fork, exec, etc.)
- `tcatch [event]` - Set temporary catchpoint

### Stack and Frame Navigation
- `where` or `bt` - Show current stack backtrace
- `backtrace [levels]` - Show backtrace with specified levels
- `frame [frame-number]` or `f [frame-number]` - Select stack frame
- `up [n]` - Move up n stack frames
- `down [n]` - Move down n stack frames
- `info frame` - Show information about current frame
- `info locals` - Show local variables in current frame
- `info args` - Show function arguments
- `info variables` - Show global and static variables
- `info functions [regex]` - Show function names matching regex

### Variable and Memory Inspection
- `print [expression]` or `p [expression]` - Print value of expression
- `display [expression]` - Display expression at each stop
- `undisplay [numbers]` - Stop displaying specified expressions
- `x [format] address` - Examine memory contents
- `whatis [expression]` - Show type of expression
- `ptype [type]` - Show definition of type
- `info scope [location]` - Show scope of local variables

### Source Code Navigation
- `list [lines]` or `l [lines]` - List source lines
- `list [function]` - List source lines of function
- `list [file:lines]` - List specified lines in file
- `set listsize n` - Set number of lines to list
- `directory [directories]` or `dir [directories]` - Add source file search directories
- `search [regex]` - Search for regular expression in source
- `forward-search [regex]` - Search forward for regex
- `reverse-search [regex]` - Search backward for regex

## Usage Examples

### Basic Debugging Workflow

#### Starting Debugging Sessions
```bash
# Compile program with debug information
gcc -g -Wall -o myprogram myprogram.c

# Start GDB with program
gdb ./myprogram

# Start GDB with core dump
gdb ./myprogram core

# Start GDB and attach to running process
gdb -p 1234

# Start GDB with arguments
gdb --args ./myprogram -f input.txt -v

# Quiet mode (skip intro messages)
gdb -q ./myprogram

# Execute commands from file
gdb -x debug_commands.txt ./myprogram

# Execute single command after startup
gdb -ex "break main" -ex "run" ./myprogram
```

#### Basic Program Control
```bash
# In GDB session
(gdb) break main           # Set breakpoint at main function
(gdb) run                  # Start program execution
(gdb) step                 # Step through execution (enter functions)
(gdb) next                 # Step over function calls
(gdb) print variable_name  # Print variable value
(gdb) info locals          # Show all local variables
(gdb) continue             # Continue execution
(gdb) quit                 # Exit GDB
```

### Advanced Breakpoint Management

#### Setting Different Types of Breakpoints
```bash
# Function breakpoints
(gdb) break main           # Break at function main
(gdb) break my_function    # Break at specific function
(gdb) break MyClass::method # Break at C++ class method

# Line breakpoints
(gdb) break 25             # Break at line 25 in current file
(gdb) break myprogram.c:50 # Break at line 50 in myprogram.c
(gdb) break file1.c:100 if condition # Conditional breakpoint

# Address breakpoints
(gdb) break *0x08048abc    # Break at memory address
(gdb) break *$pc + 8      # Break 8 bytes from current PC

# Break on C++ exceptions
(gdb) catch throw          # Stop when exception is thrown
(gdb) catch catch          # Stop when exception is caught

# Break on system calls
(gdb) catch syscall open   # Stop on open() system call
(gdb) catch syscall fork   # Stop on fork() system call
```

#### Conditional Breakpoints
```bash
# Simple conditions
(gdb) break 25 if x == 10  # Break when x equals 10
(gdb) break function if i > 100 # Break when i > 100

# Complex conditions
(gdb) break file.c:50 if (x > 0 && y < 100)
(gdb) break function if strcmp(name, "test") == 0

# Break on pointer conditions
(gdb) break function if ptr == NULL
(gdb) break function if *ptr == 0

# Conditional commands
(gdb) break 42
(gdb) condition 1 count > 1000  # Set condition on breakpoint 1
(gdb) info breakpoints           # List all breakpoints with conditions
```

#### Temporary and Disabled Breakpoints
```bash
# Temporary breakpoints (deleted after hit)
(gdb) tbreak main          # Break once at main
(gdb) tbreak 25            # Break once at line 25
(gdb) tbreak function      # Break once at function entry

# Enable/disable management
(gdb) disable 1 2 3        # Disable breakpoints 1, 2, 3
(gdb) enable 1              # Enable breakpoint 1
(gdb) enable once 2        # Enable breakpoint 2 for one hit
(gdb) enable delete 3      # Delete breakpoint 3 when hit

# Breakpoint with ignore count
(gdb) break 25
(gdb) ignore 1 5           # Ignore first 5 hits of breakpoint 1
```

### Comprehensive Watchpoint Examples

#### Data Watchpoints
```bash
# Watch local variables
(gdb) watch global_var     # Stop when global_var changes
(gdb) watch local_var      # Stop when local_var changes

# Watch specific memory locations
(gdb) watch *0x0804abc0    # Stop when memory at address changes
(gdb) watch *(int*)0x601050 # Watch int at specific address

# Watch struct members
(gdb) watch my_struct.field # Stop when field changes

# Array element watching
(gdb) watch array[5]       # Watch array element 5

# Conditional watchpoints
(gdb) watch count if count > 1000
(gdb) watch buffer[100] if buffer[100] == '\0'
```

#### Read/Write Access Watchpoints
```bash
# Read watchpoints
(gdb) rwrite status_flag   # Stop when status_flag is written
(gdb) rwrite *ptr          # Stop when memory pointed by ptr is written

# Read watchpoints
(gdb) rread config_value   # Stop when config_value is read
(gdb) rread *ptr           # Stop when memory pointed by ptr is read

# Access watchpoints (both read and write)
(gdb) awatch critical_data # Stop on any access to critical_data

# Watchpoint management
(gdb) info watchpoints     # List all watchpoints
(gdb) delete watchpoint 1  # Delete watchpoint 1
```

### Variable and Memory Inspection Techniques

#### Basic Variable Display
```bash
# Print different variable types
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
(gdb) print/d x            # Print as decimal
(gdb) print/o x            # Print in octal
(gdb) print/u x            # Print as unsigned decimal

# Print arrays
(gdb) print array[0]@10   # Print 10 elements from array[0]
(gdb) print *array@10      # Print first 10 elements of array

# Print strings
(gdb) print string_var     # Print string variable
(gdb) print *string_var    # Print first character
```

#### Complex Data Structures
```bash
# Print structures and unions
(gdb) print my_struct      # Print entire structure
(gdb) print my_struct.field1 # Print specific member
(gdb) print *(my_struct*)0x601000 # Cast and print struct at address

# C++ objects
(gdb) print my_object      # Print C++ object
(gdb) print my_object.getMember() # Call getter method
(gdb) print this->member   # Access member via this pointer

# Linked structures
(gdb) print *head_node     # Print first node
(gdb) print head_node->next->data # Follow links

# Multi-dimensional arrays
(gdb) print matrix[2][3]   # Print matrix element
(gdb) print matrix[0]@3    # Print row as 3-element array
(gdb) print **matrix@9     # Print entire 3x3 matrix
```

#### Memory Examination
```bash
# Examine memory with different formats
(gdb) x/10x 0x0804abc0     # Examine 10 hex bytes
(gdb) x/16i $pc            # Examine 16 instructions at PC
(gdb) x/32s string_ptr     # Examine 32 strings
(gdb) x/4w 0x601000        # Examine 4 words

# Memory format options:
# x - hexadecimal, d - decimal, u - unsigned decimal
# o - octal, t - binary, i - instruction, c - character, s - string
# b - byte, h - halfword (2 bytes), w - word (4 bytes), g - giant word (8 bytes)

# Advanced memory examination
(gdb) x/10gx $rsp          # Examine 10 giant words from stack pointer
(gdb) x/5i main            # Disassemble first 5 instructions of main
(gdb) x/1s 0x400500        # Print string starting at address

# Address calculations
(gdb) print &array + 5     # Print address of array[5]
(gdb) print array + 5      # Same as above (array name = address)
(gdb) x/wx 0x0804abc0      # Examine word at address
(gdb) x/gx 0x0804abc0      # Examine 8-byte word at address
```

#### Display Commands for Continuous Monitoring
```bash
# Set up automatic displays
(gdb) display x            # Show x at each stop
(gdb) display/x *ptr@10    # Show 10 elements as hex
(gdb) display/i $pc        # Show instruction at PC
(gdb) display $eax         # Show EAX register value

# Display with format
(gdb) display/t status     # Show status in binary
(gdb) display/c char_var   # Show as character

# Manage displays
(gdb) undisplay 1          # Stop displaying expression 1
(gdb) disable display 2    # Temporarily disable display 2
(gdb) enable display 2     # Re-enable display 2
(gdb) info display         # Show all display expressions

# Clear all displays
(gdb) delete display
```

## Practical Debugging Scenarios

### Stack and Frame Navigation

#### Basic Stack Operations
```bash
# Stack frame navigation
(gdb) where                # Show call stack
(gdb) backtrace            # Show full backtrace
(gdb) backtrace full       # Full backtrace with locals
(gdb) up                   # Move up one stack frame
(gdb) down                 # Move down one stack frame
(gdb) frame 3              # Select frame 3
(gdb) info frame           # Show current frame info
(gdb) info locals          # Show local variables
(gdb) info args            # Show function arguments

# Detailed frame information
(gdb) info frame 2         # Show info about frame 2
(gdb) frame 2
(gdb) info locals
(gdb) info args
(gdb) info scope
```

#### Advanced Stack Analysis
```bash
# Examine stack memory
(gdb) x/20x $rsp           # Examine 20 bytes from stack pointer
(gdb) info frame           # Show frame layout
(gdb) info registers       # Show current register values

# Function call analysis
(gdb) backtrace 10         # Show 10 stack frames
(gdb) select-frame 5       # Select frame 5
(gdb) return               # Force return from current function
(gdb) return 42            # Return with value 42
```

### Core Dump Analysis

#### Basic Core Dump Debugging
```bash
# Debug core dump
gdb ./program core
gdb ./program core.1234

# Core dump analysis
(gdb) where                # Show stack trace at crash
(gdb) info registers       # Show register values
(gdb) info signals         # Show signal information
(gdb) backtrace full       # Show full backtrace with locals
(gdb) thread apply all bt  # Show backtrace for all threads

# Examine crash state
(gdb) print $pc            # Show program counter
(gdb) info float           # Show floating point registers
(gdb) info vector          # Show vector registers
```

#### Advanced Core Analysis
```bash
# Memory inspection at crash
(gdb) x/20x $rsp-80        # Examine stack before crash
(gdb) x/16i $pc-32         # Examine instructions before crash
(gdb) info mem 0x400000    # Memory mapping info

# Signal and exception information
(gdb) info signals
(gdb) handle SIGSEGV nostop
(gdb) catch signal SIGSEGV

# Generate core dumps
(gdb) generate-core-file crash.core
(gdb) gcore live_core.core  # Generate core from running process
```

### Thread Debugging

#### Thread Management
```bash
# Thread commands
(gdb) info threads         # List all threads
(gdb) thread 3             # Switch to thread 3
(gdb) thread apply 1-3 bt  # Apply command to threads
(gdb) thread apply all bt  # Backtrace all threads
(gdb) set scheduler-locking on # Lock scheduler

# Thread-specific debugging
(gdb) thread info 2        # Information about thread 2
(gdb) thread find regex    # Find threads matching regex
(gdb) thread name 1 "worker" # Name thread 1

# Thread-synchronization debugging
(gdb) info lock            # Show mutex information
(gdb) info condition       # Show condition variable info
```

#### Advanced Thread Operations
```bash
# Control individual threads
(gdb) thread 2             # Switch to thread 2
(gdb) continue             # Continue only this thread
(gdb) interrupt            # Interrupt all threads

# Thread-specific breakpoints
(gdb) break function thread 2  # Break only in thread 2
(gdb) break line thread all    # Break in all threads

# Deadlock debugging
(gdb) thread apply all info registers
(gdb) thread apply all bt full
```

### Remote Debugging

#### Basic Remote Debugging Setup
```bash
# Start GDB server on remote machine
gdbserver :1234 ./program
gdbserver host:1234 ./program --args input.txt

# Connect from local machine
gdb ./program
(gdb) target remote remote-host:1234
(gdb) target remote 192.168.1.100:1234
(gdb) continue

# Remote debugging with file transfer
(gdb) set sysroot /path/to/target/root
(gdb) file ./program
(gdb) target remote remote-host:1234
```

#### Advanced Remote Debugging
```bash
# Multiple target types
(gdb) target extended-remote remote-host:1234  # Extended remote
(gdb) target remote | ssh remote-host gdbserver -  # Pipe through SSH
(gdb) target sim  # Simulator debugging

# Remote file operations
(gdb) remote get /remote/file /local/file
(gdb) remote put /local/file /remote/file
(gdb) remote delete /remote/file

# Multi-process remote debugging
(gdb) set detach-on-fork off
(gdb) set follow-fork-mode child
```

### Conditional and Automated Debugging

#### Conditional Breakpoints with Commands
```bash
# Breakpoints with automated actions
(gdb) break malloc
(gdb) commands 1
silent
printf "malloc called\n"
printf "size: %d\n", size
continue
end

# Complex breakpoint conditions
(gdb) break function if (x > 100 && y < 50)
(gdb) break 42 if strcmp(name, "critical") == 0
(gdb) watch global_var if global_var < 0

# Performance monitoring
(gdb) break performance_critical_function
(gdb) commands
silent
set $call_count = $call_count + 1
printf "Call #%d at %s\n", $call_count, $_caller
continue
end
```

#### Catchpoints for Events
```bash
# Exception handling
(gdb) catch throw          # Stop when exception is thrown
(gdb) catch catch          # Stop when exception is caught
(gdb) catch rethrow        # Stop on exception rethrow

# System events
(gdb) catch exec           # Stop on exec call
(gdb) catch fork           # Stop on fork call
(gdb) catch vfork          # Stop on vfork call
(gdb) catch syscall open   # Stop on open system call

# Loading/unloading
(gdb) catch load           # Stop when library is loaded
(gdb) catch unload         # Stop when library is unloaded
```

### Specialized Debugging Scenarios

#### Memory Leak Detection
```bash
# Track memory allocation
(gdb) break malloc
(gdb) commands
silent
printf "malloc(%d) = %p\n", size, $retval
continue
end

(gdb) break free
(gdb) commands
silent
printf "free(%p)\n", ptr
continue
end

# Find memory leaks
(gdb) break malloc
(gdb) condition 1 size > 1024  # Only large allocations
(gdb) break realloc
(gdb) commands
silent
if (old_ptr != 0 && new_ptr == 0)
    printf "realloc failed, lost %d bytes\n", size
end
continue
end
```

#### Performance Analysis
```bash
# Function call profiling
(gdb) set $func_calls = 0
(gdb) break expensive_function
(gdb) commands
silent
set $func_calls = $func_calls + 1
printf "Call #%d to expensive_function\n", $func_calls
continue
end

# Loop iteration counting
(gdb) break loop_start
(gdb) commands
silent
set $loop_count = $loop_count + 1
continue
end

# Timing function execution
(gdb) set pagination off
(gdb) python import time
(gdb) break function
(gdb) commands
python start_time = time.time()
continue
end
```

#### Complex Data Structure Debugging
```bash
# Print linked list
(gdb) define print_linked_list
set $node = $arg0
while $node != 0
    printf "Node at %p: data=%d, next=%p\n", $node, $node->data, $node->next
    set $node = $node->next
end
end
(gdb) print_linked_list head

# Print binary tree
(gdb) define print_tree
set $node = $arg0
if $node != 0
    printf "Node: %d\n", $node->data
    printf "  Left: "
    print_tree $node->left
    printf "  Right: "
    print_tree $node->right
end
end

# Array debugging
(gdb) print array[0]@100   # Print 100 array elements
(gdb) print *(int(*)[10][20])array_ptr  # Cast to 10x20 array
(gdb) p/d matrix[0]@3     # Print matrix row in decimal
```

## Advanced GDB Features

### Reverse Debugging

#### Record and Replay
```bash
# Enable reverse debugging (requires support)
(gdb) record               # Start recording
(gdb) record full          # Full reverse debugging
(gdb) record btrace        # Branch trace recording

# Reverse execution commands
(gdb) reverse-step         # Step backwards one instruction
(gdb) reverse-next         # Step backwards one line
(gdb) reverse-continue     # Continue backwards
(gdb) reverse-finish       # Reverse finish

# Replay control
(gdb) record stop          # Stop recording
(gdb) record goto $pc-100  # Go to specific program position
(gdb) record save state.log    # Save execution log
```

#### Reverse Debugging Applications
```bash
# Find when variable was modified
(gdb) watch my_variable
(gdb) continue             # Variable changes
(gdb) reverse-continue     # Go back to find who changed it

# Trace bug origin
(gdb) record
(gdb) continue             # Program crashes
(gdb) reverse-continue     # Step back to before crash
(gdb) where                # Examine state before crash
```

### Multi-Process Debugging

#### Fork and Exec Handling
```bash
# Process following settings
(gdb) set follow-fork-mode child    # Follow child process
(gdb) set follow-fork-mode parent   # Follow parent process
(gdb) set detach-on-fork off        # Debug both processes
(gdb) set schedule-multiple on      # Schedule all processes

# Process management
(gdb) info inferiors       # List all processes
(gdb) inferior 2           # Switch to process 2
(gdb) add-inferior         # Add new inferior
(gdb) remove-inferior 2    # Remove inferior 2

# Debugging multiple processes
(gdb) inferior 1
(gdb) continue
(gdb) inferior 2
(gdb) continue
```

### Assembly-Level Debugging

#### Assembly Display and Control
```bash
# Assembly display settings
(gdb) set disassembly-flavor intel    # Use Intel syntax
(gdb) set disassembly-flavor att      # Use AT&T syntax (default)
(gdb) set print asm-demangle on       # Demangle names in assembly

# Assembly disassembly
(gdb) disassemble main       # Disassemble main function
(gdb) disassemble $pc-32,$pc+32 # Disassemble around PC
(gdb) disassemble/r main     # Show raw bytes

# TUI assembly mode
(gdb) layout split           # Show source and assembly
(gdb) layout asm             # Show assembly only
(gdb) layout regs            # Show registers
```

#### Machine-Level Debugging
```bash
# Step at instruction level
(gdb) stepi                 # Step one machine instruction
(gdb) nexti                 # Step over instruction
(gdb) x/10i $pc            # Examine 10 instructions at PC

# Register operations
(gdb) info registers        # Show all registers
(gdb) info registers eax ebx ecx edx  # Show specific registers
(gdb) print $eax           # Print EAX register value
(gdb) set $eax = 42        # Set EAX register

# Stack examination
(gdb) x/20wx $esp          # Examine stack as words
(gdb) info frame           # Show frame information
(gdb) frame 1              # Select frame 1
```

### Python Integration and Scripting

#### Python Commands in GDB
```bash
# Python evaluation
(gdb) python import os
(gdb) python print("Current directory:", os.getcwd())
(gdb) python gdb.execute("info registers")

# Python functions for complex debugging
(gdb) python
def print_call_stack():
    frame = gdb.newest_frame()
    while frame:
        func = frame.name()
        if func:
            print(f"Function: {func} at {frame.find_sal()}")
        frame = frame.older()
    end
(gdb) python print_call_stack()

# Create custom GDB commands with Python
(gdb) python
class PrintArray(gdb.Command):
    def __init__(self):
        super(PrintArray, self).__init__("print_array", gdb.COMMAND_DATA)

    def invoke(self, arg, from_tty):
        args = gdb.string_to_argv(arg)
        if len(args) != 2:
            print("Usage: print_array <array_name> <count>")
            return
        array_name, count = args
        array = gdb.parse_and_eval(array_name)
        for i in range(int(count)):
            print(f"{array_name}[{i}] = {array[i]}")

PrintArray()
end
```

#### Advanced Python Scripting
```bash
# Pretty printers for custom data types
(gdb) python
class MyStructPrinter:
    def __init__(self, val):
        self.val = val

    def to_string(self):
        return f"MyStruct {{ field1: {self.val['field1']}, field2: {self.val['field2']} }}"

    def children(self):
        yield 'field1', self.val['field1']
        yield 'field2', self.val['field2']

def my_struct_printer_lookup(val):
    if str(val.type) == 'struct MyStruct':
        return MyStructPrinter(val)
    return None

gdb.pretty_printers.append(my_struct_printer_lookup)
end

# Memory analysis scripts
(gdb) python
def find_memory_leaks():
    """Find potential memory leaks by tracking malloc/free"""
    # Implementation would track allocations and deallocations
    print("Memory leak analysis not implemented")
end
```

## GDB Automation and Customization

### Command Files and Scripts

#### Creating GDB Initialization Files
```bash
# Create .gdbinit file in home directory
cat > ~/.gdbinit << 'EOF'
# Default GDB configuration
set print pretty on          # Format structures nicely
set print array on           # Print arrays nicely
set print elements 200       # Limit array element display
set print demangle on        # Demangle C++ names
set print asm-demangle on    # Demangle in assembly
set pagination off           # Don't pause for long output
set history save on          # Save command history
set history size 10000       # History size
set confirm off              # Don't confirm potentially dangerous operations
set verbose off              # Less verbose output

# Handle common signals
handle SIGPIPE nostop noprint pass
handle SIGUSR1 nostop noprint pass
handle SIGUSR2 nostop noprint pass
handle SIGWINCH nostop noprint pass

# Set default disassembly flavor
set disassembly-flavor intel

# Useful macros
define dump_stack
    printf "Stack dump:\n"
    x/20x $esp
end

define dump_regs
    printf "Register dump:\n"
    info registers
end

define hexdump
    if $argc == 2
        set $i = 0
        while $i < $arg1
            printf "%02x ", *((unsigned char*)$arg0 + $i)
            set $i = $i + 1
            if $i % 16 == 0
                printf "\n"
            end
        end
        printf "\n"
    else
        printf "Usage: hexdump <address> <count>\n"
    end
end
EOF

# Project-specific .gdbinit
cat > /path/to/project/.gdbinit << 'EOF'
# Project-specific GDB settings
directory /path/to/project/src
directory /path/to/project/include
set sysroot /path/to/target/root

# Auto-load useful breakpoints for this project
# break critical_function
# break error_handler
EOF
```

#### Command Scripts for Automated Debugging
```bash
# debug_crash.sh - automated crash analysis script
cat > debug_crash.sh << 'EOF'
#!/bin/bash
# Automated crash debugging script

if [ $# -lt 2 ]; then
    echo "Usage: $0 <program> <core_file>"
    exit 1
fi

PROGRAM=$1
CORE=$2
REPORT="crash_report_$(date +%Y%m%d_%H%M%S).txt"

gdb -q -batch -ex "set pagination off" \
    -ex "file $PROGRAM" \
    -ex "core $CORE" \
    -ex "where" \
    -ex "info registers" \
    -ex "info signals" \
    -ex "thread apply all bt full" \
    -ex "quit" > "$REPORT" 2>&1

echo "Crash analysis saved to $REPORT"
echo "Summary:"
grep -A 5 "#0" "$REPORT" || echo "No crash location found"
EOF

chmod +x debug_crash.sh

# memory_leak_detector.gdb - memory allocation tracking
cat > memory_leak_detector.gdb << 'EOF'
# Memory leak detection script
set pagination off

# Track malloc
break malloc
commands
silent
printf "MALLOC: %d bytes at %p\n", size, $retval
continue
end

# Track free
break free
commands
silent
printf "FREE: %p\n", ptr
continue
end

# Track realloc
break realloc
commands
silent
if (old_ptr != 0 && new_ptr == 0)
    printf "REALLOC FAILED: lost %d bytes at %p\n", size, old_ptr
else
    printf "REALLOC: %p -> %p (%d bytes)\n", old_ptr, new_ptr, size
end
continue
end

printf "Memory leak tracking enabled\n"
continue
EOF
```

#### Custom Command Definitions
```bash
# Advanced custom commands for GDB
cat >> ~/.gdbinit << 'EOF'

# Print linked list
define print_linked_list
    if $argc != 1
        printf "Usage: print_linked_list <head_ptr>\n"
    else
        set $node = (void*)$arg0
        set $count = 0
        printf "Linked List at %p:\n", $node
        while $node != 0
            printf "  [%d] %p: data=%d, next=%p\n", $count, $node, *((int*)$node), *((void**)$node + 1)
            set $node = *((void**)$node + 1)
            set $count = $count + 1
            if $count > 1000
                printf "  ... (stopping after 1000 nodes)\n"
                loop_break
            end
        end
        printf "Total nodes: %d\n", $count
    end
end

# Find memory corruption
define find_corruption
    if $argc != 3
        printf "Usage: find_corruption <start_addr> <end_addr> <pattern>\n"
    else
        set $start = (unsigned char*)$arg0
        set $end = (unsigned char*)$arg1
        set $pattern = $arg2
        set $found = 0
        printf "Searching for pattern 0x%x from %p to %p\n", $pattern, $start, $end

        while $start < $end
            if *$start == $pattern
                printf "Found pattern at address %p\n", $start
                x/16x $start-8
                set $found = $found + 1
                if $found >= 10
                    printf "Found 10 matches, stopping search\n"
                    loop_break
                end
            end
            set $start = $start + 1
        end
        if $found == 0
            printf "Pattern not found\n"
        end
    end
end

# Backup and restore breakpoints
define save_breakpoints
    if $argc != 1
        printf "Usage: save_breakpoints <filename>\n"
    else
        save breakpoints $arg0
        printf "Breakpoints saved to %s\n", $arg0
    end
end

define load_breakpoints
    if $argc != 1
        printf "Usage: load_breakpoints <filename>\n"
    else
        source $arg0
        printf "Breakpoints loaded from %s\n", $arg0
    end
end

EOF
```

### Integration with Development Tools

#### Makefile Integration
```bash
# Makefile with GDB debugging support
cat > Makefile << 'EOF'
CC = gcc
CFLAGS = -Wall -g -O0  # Debug build
TARGET = myprogram
SRCDIR = src
OBJDIR = obj

# Debug target
debug: CFLAGS += -DDEBUG -g3
debug: $(TARGET)

# Build for debugging
$(TARGET): $(OBJDIR)/main.o $(OBJDIR)/utils.o
	$(CC) $(CFLAGS) -o $@ $^

$(OBJDIR)/%.o: $(SRCDIR)/%.c
	@mkdir -p $(OBJDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

# Run with GDB
gdb: $(TARGET)
	gdb ./$(TARGET)

# Run with GDB and auto-attach to core
debug-core: $(TARGET)
	@if [ -f core ]; then \
		gdb ./$(TARGET) core; \
	else \
		echo "No core file found"; \
	fi

# Valgrind integration
memcheck: $(TARGET)
	valgrind --leak-check=full --show-leak-kinds=all ./$(TARGET)

# Generate core dump on crash
run-with-core: $(TARGET)
	ulimit -c unlimited && ./$(TARGET)

# Clean
clean:
	rm -rf $(OBJDIR) $(TARGET) core core.*

.PHONY: debug gdb debug-core memcheck run-with-core clean
EOF
```

#### CMake Integration
```bash
# CMakeLists.txt with GDB support
cat > CMakeLists.txt << 'EOF'
cmake_minimum_required(VERSION 3.10)
project(MyProgram C)

# Set build type
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

# Compiler flags
set(CMAKE_C_FLAGS "-Wall")
set(CMAKE_C_FLAGS_DEBUG "-g -O0 -DDEBUG")
set(CMAKE_C_FLAGS_RELEASE "-O2 -DNDEBUG")

# Source files
file(GLOB_RECURSE SOURCES "src/*.c")

# Create executable
add_executable(myprogram ${SOURCES})

# Custom targets for debugging
add_custom_target(gdb
    COMMAND gdb ${CMAKE_BINARY_DIR}/myprogram
    DEPENDS myprogram
    WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
)

add_custom_target(debug-core
    COMMAND gdb ${CMAKE_BINARY_DIR}/myprogram core
    DEPENDS myprogram
    WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
)

# Install gdbinit in build directory
configure_file(${CMAKE_SOURCE_DIR}/.gdbinit ${CMAKE_BINARY_DIR}/.gdbinit COPYONLY)

# Include directories
target_include_directories(myprogram PRIVATE include)
EOF
```

## Specialized Debugging Techniques

### Kernel and System Programming

#### Kernel Module Debugging
```bash
# Debugging kernel modules with KGDB
# Setup on target system
echo 'kgdboc=ttyS0,115200' > /sys/module/kgdboc/parameters/kgdboc
echo ttyS0 > /sys/module/debug_core/parameters/kgdboc

# Connect from development machine
gdb ./vmlinux
(gdb) set remotebaud 115200
(gdb) target remote /dev/ttyS0
(gdb) continue

# Break in kernel functions
(gdb) break sys_open
(gdb) break printk
(gdb) continue
```

#### System Call Tracing with GDB
```bash
# Trace all system calls
(gdb) catch syscall
(gdb) continue

# Trace specific system calls
(gdb) catch syscall open
(gdb) catch syscall read
(gdb) catch syscall write

# System call debugging with arguments
(gdb) break sys_open
(gdb) commands
silent
printf "open(\"%s\", %d)\n", (char*)$rdi, $rsi
continue
end
```

### Performance Profiling

#### Function Call Counting
```bash
# Profile function calls
set $call_count = 0
break function_name
commands
silent
set $call_count = $call_count + 1
printf "Call #%d to %s\n", $call_count, $_func
continue
end

# Multiple function profiling
define setup_profiling
    break malloc
    commands
    silent
    set $malloc_calls = $malloc_calls + 1
    continue
    end

    break free
    commands
    silent
    set $free_calls = $free_calls + 1
    continue
    end

    printf "Profiling setup complete\n"
end

define show_profiling_stats
    printf "Function call statistics:\n"
    printf "  malloc calls: %d\n", $malloc_calls
    printf "  free calls: %d\n", $free_calls
end
```

#### Execution Time Measurement
```bash
# Measure function execution time
break function_entry
commands
silent
set $start_time = clock()
continue
end

break function_exit
commands
silent
set $end_time = clock()
printf "Function took %f seconds\n", ($end_time - $start_time) / CLOCKS_PER_SEC
continue
end
```

### Security and Vulnerability Analysis

#### Buffer Overflow Detection
```bash
# Check for buffer overflows
define check_buffer_bounds
    if $argc != 3
        printf "Usage: check_buffer_bounds <buffer> <size> <index>\n"
    else
        if $arg2 >= $arg1
            printf "BUFFER OVERFLOW DETECTED: index %d >= size %d\n", $arg2, $arg1
        else
            printf "Buffer access safe: index %d < size %d\n", $arg2, $arg1
        end
    end
end

# Check pointer validity
define check_pointer
    if $argc != 1
        printf "Usage: check_pointer <pointer>\n"
    else
        set $ptr = (void*)$arg0
        if $ptr == 0
            printf "NULL pointer detected\n"
        else
            printf "Pointer %p appears valid\n", $ptr
            x/1x $ptr
        end
    end
end
```

#### Memory Protection and Security
```bash
# Stack protection checking
define check_stack_canary
    printf "Checking stack canary...\n"
    info frame
    # Look for stack canary patterns
    x/4x $rsp
    x/4x $rbp
end

# Heap corruption detection
define check_heap_integrity
    printf "Checking heap integrity...\n"
    # This would need to be customized for your memory allocator
    break malloc
    commands
    silent
    printf "malloc(%d) = %p\n", size, $retval
    continue
    end
end
```

## Troubleshooting and Common Problems

### Compilation and Symbol Issues

#### Missing Debug Information
```bash
# Problem: No debug symbols available
# Solution: Recompile with debug flags
gcc -g -Wall -O0 -o program program.c
g++ -g -Wall -O0 -o program program.cpp

# For makefiles
CFLAGS += -g -O0
CXXFLAGS += -g -O0

# Check if binary has debug symbols
file ./program | grep "not stripped"
objdump -h ./program | grep debug
readelf -S ./program | grep debug

# Strip debug symbols (for release builds)
strip ./program
```

#### Missing Source Files
```bash
# Problem: GDB can't find source files
# Solution: Add source directories
(gdb) directory /path/to/source
(gdb) directory /path/to/includes
(gdb) show directories

# Set substitute paths for moved source
(gdb) set substitute-path /old/path /new/path

# List current source search path
(gdb) show directories
```

#### Optimized Code Debugging
```bash
# Problem: Optimized code makes debugging difficult
# Solution: Disable optimization for debug builds
gcc -g -O0 program.c
gcc -g -Og program.c  # Optimized but debuggable

# For existing optimized binaries
(gdb) set print frame-arguments all
(gdb) set print static-members on
(gdb) set print vtbl on
```

### Runtime Issues

#### Signal Handling Problems
```bash
# Problem: Signals interrupt debugging
# Solution: Configure signal handling
(gdb) handle SIGPIPE nostop noprint pass
(gdb) handle SIGUSR1 nostop noprint pass
(gdb) handle SIGTERM nostop noprint pass

# Stop on specific signals
(gdb) handle SIGSEGV stop print
(gdb) handle SIGABRT stop print
(gdb) handle SIGFPE stop print

# Show current signal handling
(gdb) info signals
```

#### Thread Debugging Issues
```bash
# Problem: Multiple threads make debugging confusing
# Solution: Lock scheduler when needed
(gdb) set scheduler-locking on
(gdb) set scheduler-locking off

# Debug specific threads only
(gdb) thread 3
(gdb) info threads
(gdb) thread apply all bt
```

#### Core Dump Issues
```bash
# Problem: No core dump generated
# Solution: Enable core dumps
ulimit -c unlimited
echo "/tmp/core.%e.%p.%h.%t" > /proc/sys/kernel/core_pattern

# Check core dump settings
cat /proc/sys/kernel/core_pattern
ulimit -c

# Generate core manually from running process
gdb -p <pid>
(gdb) gcore core_file
(gdb) detach
(gdb) quit
```

### Performance Optimization

#### Speeding Up GDB Operations
```bash
# Reduce GDB output for faster operation
(gdb) set pagination off
(gdb) set print elements 100
(gdb) set print pretty off
(gdb) set width 80
(gdb) set height 30

# Speed up symbol loading
gdb -readnow ./program  # Load all symbols immediately
gdb -readnow -write ./program  # Load symbols and enable writing

# Use GDB index for faster symbol lookup
gcc -g -gpubnames ./program.c
```

#### Memory Usage Optimization
```bash
# Problem: GDB uses too much memory
# Solution: Limit GDB's memory usage
(gdb) set max-value-size 1024
(gdb) set max-source-cache-size 10485760
(gdb) set max-completions 1000

# Reduce stack trace depth
(gdb) set backtrace limit 20
```

## Related Commands

### Development Tools
- [`gcc`](/docs/commands/development/gcc) - GNU Compiler Collection
- [`g++`](/docs/commands/development/g++) - GNU C++ Compiler
- [`make`](/docs/commands/development/make) - Build automation tool
- [`cmake`](/docs/commands/development/cmake) - Cross-platform make

### Debugging and Analysis Tools
- [`valgrind`](/docs/commands/development-tools/valgrind) - Memory debugging and profiling tool
- [`strace`](/docs/commands/development-tools/strace) - System call tracer
- [`ltrace`](/docs/commands/development-tools/ltrace) - Library call tracer
- [`addr2line`](/docs/commands/development-tools/addr2line) - Address to line number converter

### Binary Analysis Tools
- [`objdump`](/docs/commands/development-tools/objdump) - Object file disassembler
- [`nm`](/docs/commands/development-tools/nm) - Symbol table extraction
- [`readelf`](/docs/commands/development-tools/readelf) - ELF file analysis
- `c++filt` - C++ name demangler

### Process Tools
- [`ps`](/docs/commands/system-info/ps) - Process status
- [`top`](/docs/commands/system-info/top) - Dynamic process viewer
- [`kill`](/docs/commands/system-info/kill) - Process termination
- [`strace`](/docs/commands/development-tools/strace) - System call tracer

## Best Practices

### Development Workflow
1. **Always compile with debug symbols**: Use `-g` flag during development and testing
2. **Use appropriate optimization levels**: `-O0` for debugging, `-Og` for optimized debugging
3. **Set up project-specific .gdbinit**: Include common breakpoints and settings
4. **Use meaningful breakpoint conditions**: Avoid unnecessary stops and improve efficiency
5. **Leverage core dumps**: Configure system to generate core dumps for post-mortem analysis
6. **Practice incremental debugging**: Start with high-level issues and drill down
7. **Document debugging sessions**: Keep notes on complex bugs and their solutions

### Performance Considerations
8. **Use watchpoints carefully**: They can significantly slow program execution
9. **Limit array and structure display**: Use `set print elements` to avoid output overflow
10. **Optimize GDB startup**: Use `gdb -readnow` for large projects
11. **Manage memory usage**: Set appropriate limits for large debugging sessions
12. **Use TUI mode efficiently**: Learn keyboard shortcuts for faster navigation

### Advanced Techniques
13. **Master reverse debugging**: When available, reverse debugging is powerful for finding bug origins
14. **Learn assembly basics**: Understanding assembly helps with low-level debugging and optimization
15. **Use Python scripting**: Automate complex debugging tasks and create custom tools
16. **Practice remote debugging**: Essential for embedded systems and distributed applications
17. **Understand threading**: Multi-threaded debugging requires special attention to synchronization

### Troubleshooting Mindset
18. **Start simple**: Begin with basic commands before advanced techniques
19. **Verify assumptions**: Always check that debugging environment is correctly set up
20. **Use multiple tools**: Combine GDB with other debugging tools for comprehensive analysis
21. **Keep learning**: GDB has many advanced features; continuously explore new capabilities

## Performance Tips

### Debugging Efficiency
1. **Set strategic breakpoints**: Place breakpoints at function entries and key decision points
2. **Use conditional breakpoints**: Reduce unnecessary stops with smart conditions
3. **Master command history**: Use `Ctrl+R` for reverse search in GDB command history
4. **Learn keyboard shortcuts**: Use `Ctrl+X, Ctrl+A` for TUI mode and other shortcuts
5. **Use display commands**: Set up automatic variable monitoring for frequently accessed data

### Memory and Performance
6. **Limit large data structures**: Use array ranges when printing large arrays or structures
7. **Use appropriate data types**: Cast pointers to appropriate types for better display
8. **Manage watchpoints efficiently**: Remove watchpoints when not needed to improve performance
9. **Optimize symbol loading**: Use `-readnow` flag for faster startup on large projects
10. **Configure output limits**: Set reasonable limits for print and command output

### Advanced Performance
11. **Use GDB index**: Compile with `-gpubnames` for faster symbol lookup
12. **Leverage parallel debugging**: Debug multiple processes or threads simultaneously when needed
13. **Profile within GDB**: Use GDB commands to measure function execution times and call counts
14. **Automate repetitive tasks**: Create custom commands and scripts for common debugging patterns
15. **Use hardware breakpoints**: When available, hardware breakpoints are faster than software breakpoints

The `gdb` command is an essential and powerful tool for software development on Linux. Mastering its comprehensive feature set enables developers to efficiently diagnose and fix complex bugs, optimize performance, understand program behavior at the deepest levels, and maintain high-quality code across various programming languages and system architectures.