---
title: strace - System Call Tracer
sidebar_label: strace
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# strace - System Call Tracer

The `strace` command is a diagnostic, debugging, and instructional utility that intercepts and records system calls made by a process and the signals received by that process. It is an invaluable tool for troubleshooting, debugging, and understanding how programs interact with the operating system kernel.

## Basic Syntax

```bash
strace [options] [-e expr]... [-o file] [-p pid]... [command [args...]]
strace -c [options] [-e expr]... [-O overhead] [-S sortby] [command [args...]]
```

## Common Options

### Output Options
- `-o `` - Write trace to file instead of stderr
- `-f` - Trace child processes created by fork
- `-ff` - Write traces to filename.pid for each process
- `-q` - Quiet mode - suppress attach/detach messages
- `-v` - Verbose mode - print all system calls
- `-a <column>` - Alignment column for return values (default 40)

### Timing Options
- `-r` - Print relative timestamp on each system call
- `-t` - Prefix each line with absolute timestamp
- `-tt` - Prefix with microsecond timestamp
- `-ttt` - Prefix with microsecond timestamp since epoch
- `-T` - Show time spent in each system call
- `-s <size>` - Maximum string size to print (default 32)

### Filtering Options
- `-e <expr>` - Specify expression to filter events
- `-p <pid>` - Attach to existing process
- `-c` - Count time, calls, and errors for each syscall
- `-O <overhead>` - Set overhead for syscall timing (default 0)
- `-S <sortby>` - Sort syscall counts by: time, calls, name, nothing

### Display Options
- `-x` - Print non-string data in hex
- `-xx` - Print all strings in hex
- `-d` - Debug strace itself
- `-h` - Print help message
- `-V` - Print version information
- `-u <username>` - Run command as specified user

## Expression Syntax

### Qualifiers and Values
```bash
# Basic expression format
-e [qualifier=][!]value1[,value2]...

# Qualifiers: trace, abbrev, verbose, raw, signal, read, write
# Values: syscall names, signal names, file descriptors
# Negation: use ! to negate (shell escaping may be needed)
```

### Common Filter Expressions
```bash
# Trace specific system calls
-e trace=open,close,read,write
-e trace=%process,%file
-e trace=%network
-e trace=%signal
-e trace=%ipc

# Exclude specific system calls
-e trace=!open,close

# Signal filtering
-e signal=SIGUSR1,SIGUSR2
-e signal=!SIGTERM

# File descriptor filtering
-e read=3,4
-e write=1,2

# Abbreviation control
-e abbrev=all          # Abbreviate all
-e abbrev=none         # Don't abbreviate
-e abbrev=open,stat    # Abbreviate specific calls

# Raw output
-e raw=read,write      # Show raw arguments for read/write
```

## Usage Examples

### Basic System Call Tracing
```bash
# Trace all system calls of a command
strace ls -la

# Trace with timestamps
strace -t ls -la

# Trace with microsecond timestamps
strace -tt ls -la

# Trace with execution times
strace -T ls -la

# Trace with relative timing
strace -r ls -la

# Combined timing options
strace -ttT ls -la
```

### Output Control
```bash
# Save trace to file
strace -o trace.log ls -la

# Quiet mode (suppress attach messages)
strace -q -o trace.log ls -la

# Verbose mode (show all syscalls)
strace -v ls -la

# Custom alignment for return values
strace -a 60 ls -la

# Increase string display length
strace -s 256 cat file.txt
```

### Filtering System Calls
```bash
# Only trace file operations
strace -e trace=file ls -la

# Only trace network operations
strace -e trace=network wget http://example.com

# Only trace process operations
strace -e trace=process bash -c "sleep 1 &"

# Trace specific system calls
strace -e trace=open,read,write cat file.txt

# Exclude certain system calls
strace -e trace=!mmap,mprotect cat file.txt

# Trace memory allocation syscalls
strace -e trace=brk,mmap,munmap malloc_test
```

### Attaching to Running Processes
```bash
# Trace running process by PID
strace -p 1234

# Attach and follow forks
strace -f -p 1234

# Attach multiple processes
strace -p 1234 -p 5678

# Attach with timestamp
strace -t -p 1234

# Save trace to file
strace -o apache.log -p 1234
```

### Counting and Statistics
```bash
# Generate system call statistics
strace -c ls -la

# Statistics with custom sort
strace -c -S time ls -la
strace -c -S calls ls -la

# Trace with overhead calculation
strace -c -O 1 ls -la

# Statistics for specific syscalls
strace -c -e trace=file ls -la
```

### Signal Tracing
```bash
# Trace signal-related system calls
strace -e trace=signal sleep 10

# Trace specific signals
strace -e signal=SIGTERM,SIGINT sleep 10

# Exclude certain signals
strace -e signal=!SIGCHLD sleep 10

# Trace all signals
strace -e signal=all sleep 10
```

## Advanced Usage

### Network Debugging
```bash
# Trace network operations
strace -e trace=network curl http://example.com

# Trace network syscalls with detailed output
strace -e trace=network -s 1000 wget http://example.com

# Network connection debugging
strace -e trace=connect,send,recv nc -l 8080

# DNS resolution tracing
strace -e trace=sendto,recvfrom nslookup example.com
```

### File System Operations
```bash
# Trace file operations with full paths
strace -e trace=file -s 256 find /home/user -name "*.txt"

# Trace with raw output for byte data
strace -e raw=read,write -s 1000 dd if=/dev/urandom of=test.bin bs=100 count=1

# File descriptor monitoring
strace -e read=3,write=1 cat input.txt

# File system performance analysis
strace -c -e trace=file cp large_file.dat backup/
```

### Process Interaction
```bash
# Trace fork/exec operations
strace -f -e trace=process bash -c "ls && echo done"

# Multi-process application tracing
strace -f -e trace=process,network firefox

# Process tree tracing
strace -f -ff -o strace.out daemon_process
```

### Memory and Performance Analysis
```bash
# Memory allocation tracing
strace -e trace=brk,mmap,munmap malloc_test

# Virtual memory operations
strace -e trace=%memory my_application

# Performance profiling
strace -c -S time my_application

# System call latency analysis
strace -T my_application | sort -k4 -n
```

## Practical Examples

### Debugging File Not Found Errors
```bash
# Trace file access operations
strace -e trace=openat,stat access_file.py

# Search for file access patterns
strace -e trace=file python script.py 2>&1 | grep ENOENT

# Find configuration file locations
strace -e trace=file nginx 2>&1 | grep openat
```

### Network Connection Troubleshooting
```bash
# Debug network connection issues
strace -e trace=connect,sendto,recvfrom curl http://example.com

# DNS resolution debugging
strace -e trace=sendto,recvfrom,poll dig example.com

# Socket creation analysis
strace -e trace=socket,bind,listen,accept netstat -an
```

### Permission Issues
```bash
# Trace permission-related syscalls
strace -e trace=openat,access,chmod ls /root/

# Debug authentication issues
strace -e trace=openat,read sudo ls /root/

# File permission analysis
strace -e trace=statx,access touch restricted_file
```

### Performance Bottleneck Analysis
```bash
# Find slow system calls
strace -T my_application 2>&1 | sort -k4 -nr | head -10

# System call frequency analysis
strace -c my_application

# I/O analysis
strace -e trace=read,write -T my_application | sort -k4 -n
```

### Security Analysis
```bash
# Monitor for suspicious file access
strace -e trace=openat,read,write suspicious_program

# Network activity monitoring
strace -e trace=network suspicious_process

# Execve monitoring (command execution)
strace -e trace=execve -f bash
```

## Advanced Filtering

### Complex Expressions
```bash
# Multiple filter types
strace -e trace=open,close -e signal=SIGTERM my_program

# Filter with exclusion
strace -e trace=file -e trace=!stat,lstat my_program

# File descriptor specific tracing
strace -e read=0,1,2 -e write=1,2 interactive_program

# Network-specific filtering
strace -e trace=%network -e signal=SIGHUP,SIGTERM daemon
```

### Output Manipulation
```bash
# Filter output with grep
strace -e trace=open python script.py 2>&1 | grep ENOENT

# Extract file names from trace
strace -e trace=file ls -la 2>&1 | grep openat | cut -d'"' -f2

# System call timing analysis
strace -T my_program 2>&1 | awk '{print $NF, $1}' | sort -n

# Error extraction
strace my_program 2>&1 | grep -E "(ENOENT|EACCES|EPERM)"
```

## Integration with Other Tools

### GDB Integration
```bash
# Use strace output to inform GDB session
strace -o trace.log my_program
gdb my_program
(gdb) set logging file gdb.log
(gdb) set logging on
# Use trace.log to understand system call patterns
```

### Performance Profiling
```bash
# Combine strace with time command
time strace -c my_program

# Use strace to profile system calls
strace -c my_program | sort -k2 -nr > syscall_profile.txt
```

### Automated Analysis
```bash
# Count different types of system calls
strace -c my_program | awk 'NR>1 {print $1}' | sort | uniq -c

# Extract all file paths accessed
strace -e trace=file my_program 2>&1 | grep -o '"[^"]*"' | sort | uniq

# Create access pattern report
strace -e trace=file my_program 2>&1 | grep -E '(openat|statx)' | cut -d'"' -f2 > files_accessed.txt
```

## Related Commands

- [`ltrace`](/docs/commands/development-tools/ltrace) - Library call tracer
- [`gdb`](/docs/commands/development-tools/gdb) - GNU Debugger
- [`valgrind`](/docs/commands/development-tools/valgrind) - Memory debugging tool
- [`strace`](/docs/commands/development-tools/strace) - System call tracer
- [`lsof`](/docs/commands/system-info/lsof) - List open files
- [`netstat`](/docs/commands/network-tools/netstat) - Network connections
- [`ps`](/docs/commands/system-info/ps) - Process information
- [`top`](/docs/commands/process-management/top) - Process monitoring
- [`tcpdump`](/docs/commands/networking/tcpdump) - Network packet capture
- [`dmesg`](/docs/commands/system-info/dmesg) - Kernel messages

## Best Practices

1. **Use filters**: Focus on relevant system calls to reduce noise
2. **Save to file**: Use `-o` for long-running programs or complex analysis
3. **Combine with timestamps**: Use `-tt` for precise timing analysis
4. **Use statistics mode**: `-c` provides valuable performance insights
5. **Be specific**: Target specific processes with `-p` when possible
6. **Mind permissions**: Ensure you have rights to attach to processes
7. **Consider performance impact**: strace can significantly slow applications
8. **Use process tracing**: `-f` for multi-process applications
9. **Filter output**: Use shell tools to process large trace files
10. **Document traces**: Keep context for trace analysis

## Troubleshooting

### Common Issues
```bash
# Permission denied when attaching to process
sudo strace -p 1234

# strace not installed
sudo apt-get install strace  # Ubuntu/Debian
sudo yum install strace      # RHEL/CentOS

# Process not found
ps aux | grep process_name
strace -p $(pgrep process_name)

# Too much output
strace -e trace=open,close program
strace -o trace.log program
```

### Performance Considerations
```bash
# Reduce performance impact
strace -c program  # Statistics mode only
strace -e trace=specific_syscalls program

# Filter for specific events
strace -e trace=%file,%network program
```

The `strace` command is an essential tool for Linux system administration and software development. Mastering its filtering capabilities and understanding system call patterns enables effective troubleshooting, performance analysis, and security monitoring.