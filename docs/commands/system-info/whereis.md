---
title: whereis - Locate the binary, source, and manual page files for a command
sidebar_label: whereis
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# whereis - Locate the binary, source, and manual page files for a command

The `whereis` command is a system utility that helps locate the binary, source code, and manual page files for a given command. Unlike `which`, `whereis` searches for multiple types of files including executables, source files, and documentation in standard Linux system directories. It provides a quick way to find where programs are installed on the system without searching through the entire filesystem, making it particularly useful for system administrators, developers, and users who need to understand program locations and verify installations.

## Basic Syntax

```bash
whereis [OPTIONS] [-BMS] [-f] [COMMAND...]
```

## Common Options

### Search Path Control
- `-B <directories>` - Limit binary search to specified directories
- `-M <directories>` - Limit manual page search to specified directories
- `-S <directories>` - Limit source search to specified directories

### Output Control
- `-b` - Search only for binaries
- `-m` - Search only for manual pages
- `-s` - Search only for source files
- `-u` - Show commands with unusual entries (files not in standard locations)
- `-f` - Terminate directory list and start command names

### Search Behavior
- `-l` - List the effective search paths
- `-h` - Display help information
- `-V` - Show version information

## Usage Examples

### Basic Command Location

#### Finding Standard Commands
```bash
# Find all locations for ls command
whereis ls

# Output: ls: /bin/ls /usr/share/man/man1/ls.1.gz

# Find python installation locations
whereis python

# Output: python: /usr/bin/python /usr/bin/python3.8 /usr/share/man/man1/python.1.gz

# Find gcc compiler files
whereis gcc

# Output: gcc: /usr/bin/gcc /usr/lib/gcc /usr/share/man/man1/gcc.1.gz
```

#### Multiple Command Search
```bash
# Search for multiple commands at once
whereis ls cd pwd

# Find common system utilities
whereis bash sh zsh

# Search for development tools
whereis gcc make gdb
```

### Targeted Search Types

#### Binary-only Search
```bash
# Find only executable files
whereis -b nginx

# Search for binaries in specific locations
whereis -B /usr/local/bin -b docker

# Find system binaries only
whereis -b /usr/sbin crond

# Search for custom installed binaries
whereis -B /opt/bin -b custom_tool
```

#### Manual Page Search
```bash
# Find only manual pages
whereis -m git

# Search for man pages in custom locations
whereis -M /usr/local/share/man -m python

# Find documentation for system services
whereis -m sshd

# Check if manual page exists
whereis -m custom_command
```

#### Source Code Search
```bash
# Find source files
whereis -s kernel

# Search for sources in development directories
whereis -S /usr/src -s linux

# Look for package sources
whereis -s apache2

# Find header files locations
whereis -s stdio
```

### Advanced Search Techniques

#### Custom Search Paths
```bash
# Search in specific directories for binaries
whereis -B /usr/local/bin:/opt/bin -b node

# Combine multiple search types with custom paths
whereis -B /usr/local/bin -M /usr/local/man python

# Search for development tools in non-standard locations
whereis -B /home/user/bin -M /home/user/man myscript

# Search source in custom directories
whereis -S /home/user/src:/opt/src -s myproject
```

#### Unusual File Detection
```bash
# Show commands with files in non-standard locations
whereis -u

# Find programs installed in unusual places
whereis -u | head -10

# Check for custom installations
whereis -u | grep -E "(home|opt|local)"
```

#### Search Path Information
```bash
# List default binary search paths
whereis -l

# Show all search directories
whereis -l | grep -E "(bin|lib|man)"

# Check if your custom paths are included
whereis -l | grep -E "local|opt"
```

## Practical Examples

### System Administration

#### Package and Installation Verification
```bash
# Verify package installation locations
whereis -b apache2 nginx mysql

# Check if service binaries exist
whereis -b sshd crond httpd

# Find all components of a package
whereis docker docker-compose docker-engine

# Verify development tools installation
whereis gcc g++ make cmake

# Check system utility locations
whereis sudo passwd useradd groupadd
```

#### System Diagnostics
```bash
# Find all network-related binaries
whereis -b ping traceroute nslookup dig

# Locate system monitoring tools
whereis -b top htop iostat vmstat

# Find backup and restore utilities
whereis -b tar rsync dump restore

# Check security tool locations
whereis -b iptables ufw fail2ban

# Locate log analysis tools
whereis -b journalctl dmesg logwatch
```

#### Configuration File Location Aid
```bash
# Find configuration files by locating their associated binaries
whereis -b nginx
# Then check: /etc/nginx/, /usr/local/nginx/conf/

# Locate Apache configuration directory
whereis -b apache2 httpd
# Then check: /etc/apache2/, /etc/httpd/

# Find SSH configuration files
whereis -b ssh sshd
# Then check: /etc/ssh/

# Locate database configuration
whereis -b mysql mysqld postgresql
# Then check: /etc/mysql/, /var/lib/postgresql/
```

### Development Workflow

#### Development Environment Setup
```bash
# Check compiler installations
whereis -b gcc clang g++

# Find build tools
whereis -b make cmake ninja

# Locate version control systems
whereis -b git svn hg

# Find debugging tools
whereis -b gdb valgrind strace

# Check package managers
whereis -b pip npm apt yum

# Locate documentation tools
whereis -b doxygen sphinx pandoc
```

#### Project Dependency Management
```bash
# Check if required tools are installed
whereis -b node npm yarn

# Verify Java development kit
whereis -b java javac jar

# Find Python tools
whereis -b python pip virtualenv

# Locate container tools
whereis -b docker podman kubectl

# Check database clients
whereis -b mysql psql mongo

# Find testing frameworks
whereis -b pytest jest mocha
```

#### Cross-Platform Development
```bash
# Find Windows compatibility tools
whereis -b wine mono

# Locate cross-compilation tools
whereis -b mingw64-gcc cross-compiler

# Find emulation tools
whereis -b qemu VirtualBox

# Check remote development tools
whereis -b ssh scp rsync

# Locate build system tools
whereis -b meson bazel buck
```

### Scripting and Automation

#### Environment Detection
```bash
# Script: Check if required tools are available
#!/bin/bash
required_tools="git make gcc python3"
missing_tools=""

for tool in $required_tools; do
    if ! whereis -b $tool > /dev/null; then
        missing_tools="$missing_tools $tool"
    fi
done

if [ -n "$missing_tools" ]; then
    echo "Missing required tools:$missing_tools"
    exit 1
fi
```

#### Path Validation Scripts
```bash
# Check if custom binaries are in standard paths
#!/bin/bash
custom_bins="myscript mytool myapp"
non_standard=""

for bin in $custom_bins; do
    locations=$(whereis -b $bin)
    if echo "$locations" | grep -E "(home|opt|local)" > /dev/null; then
        non_standard="$non_standard $bin:$locations"
    fi
done

if [ -n "$non_standard" ]; then
    echo "Tools in non-standard locations:$non_standard"
fi
```

#### Documentation Availability Check
```bash
# Verify manual pages are available
#!/bin/bash
tools="ls grep sed awk find"
undocumented=""

for tool in $tools; do
    if ! whereis -m $tool | grep "man" > /dev/null; then
        undocumented="$undocumented $tool"
    fi
done

if [ -n "$undocumented" ]; then
    echo "Tools without manual pages:$undocumented"
fi
```

## Advanced Usage

### Search Path Customization

#### Environment-Specific Searches
```bash
# Development environment setup
export WHEREIS_BIN_PATHS="/usr/local/bin:/opt/bin:/home/$USER/bin"
whereis -B $WHEREIS_BIN_PATHS -b mydevtool

# Production environment check
whereis -B /usr/sbin:/usr/local/sbin -b prod_service

# Testing environment verification
whereis -B /opt/testing/bin:/home/tester/bin -b test_harness

# Multi-user environment
for user in alice bob charlie; do
    whereis -B /home/$user/bin -b user_script_$user
done
```

#### Package-Specific Searches
```bash
# Find all Node.js related files
whereis -b -m -s node npm npx

# Search Python ecosystem
whereis -b -m -s python pip pip3 virtualenv

# Locate Java development tools
whereis -b -m -s java javac javadoc jar

# Find database tools
whereis -b -m -s mysql psql redis-cli mongo

# Check web server components
whereis -b -m -s apache2 nginx httpd
```

### Integration with Other Commands

#### Combined File System Analysis
```bash
# Cross-reference whereis with file type detection
for cmd in $(whereis -b -l | grep -E "(bin|sbin)" | head -10); do
    file $cmd 2>/dev/null || true
done

# Check file sizes of found binaries
for bin in $(whereis -b ls cd pwd awk | cut -d' ' -f2); do
    ls -lh $bin 2>/dev/null || true
done

# Verify permissions on system binaries
for binary in $(whereis -b sudo passwd su | cut -d' ' -f2); do
    ls -la $binary
done

# Check for SUID binaries
for cmd in $(whereis -b -u | cut -d' ' -f1); do
    find $(whereis -b $cmd | cut -d' ' -f2) -perm -4000 2>/dev/null
done
```

#### Package Management Integration
```bash
# Check which package manager installed a command
check_package() {
    local cmd=$1
    local binary_path=$(whereis -b $cmd | awk '{print $2}')

    if [ -n "$binary_path" ]; then
        if command -v dpkg > /dev/null; then
            dpkg -S $binary_path 2>/dev/null
        elif command -v rpm > /dev/null; then
            rpm -qf $binary_path 2>/dev/null
        elif command -v pacman > /dev/null; then
            pacman -Qo $binary_path 2>/dev/null
        fi
    fi
}

# Check package for multiple tools
for tool in git vim curl wget; do
    echo "Package for $tool:"
    check_package $tool
    echo
done
```

### Performance Optimization

#### Efficient Searching Techniques
```bash
# Limit search scope for faster results
whereis -b /usr/bin python

# Use specific path searches instead of broad searches
whereis -B /usr/local/bin -b node

# Cache results for frequently used commands
create_whereis_cache() {
    local cache_file="$HOME/.whereis_cache"
    local cmds="git vim emacs python java gcc"

    for cmd in $cmds; do
        whereis $cmd >> $cache_file
    done
}

# Parallel searches for multiple commands
echo "git python java" | xargs -P 4 -n 1 whereis
```

#### Bulk Operations
```bash
# Generate system inventory
generate_system_inventory() {
    echo "=== System Binaries Inventory ==="
    whereis -b $(compgen -c | head -50) | sort

    echo "=== Available Manual Pages ==="
    whereis -m $(compgen -c | head -50) | grep -v ":$"

    echo "=== Commands in Non-Standard Locations ==="
    whereis -u | head -20
}

# Check for missing documentation
check_missing_docs() {
    local commands_with_bins=$(whereis -b $(ls /usr/bin/* | head -20 | xargs -n1 basename) | cut -d: -f1)

    for cmd in $commands_with_bins; do
        if ! whereis -m $cmd | grep -q "man"; then
            echo "No manual page for: $cmd"
        fi
    done
}
```

## Troubleshooting

### Common Issues

#### Command Not Found
```bash
# Command not found by whereis but exists
# Check if command is an alias or function
type ll
# Output: ll is aliased to `ls -al'

# Check if command is a built-in
type cd
# Output: cd is a shell builtin

# Find shell built-ins locations
help -d cd

# Check PATH vs whereis paths
echo $PATH
whereis -l
```

#### Unexpected Search Results
```bash
# whereis shows multiple unexpected locations
# Check for duplicate installations
whereis python
python --version  # Check which one is active

# Find which Python is being used
which python

# Check all Python installations
ls -la /usr/bin/python*

# Search for Python in all locations
find /usr -name "python*" 2>/dev/null | head -10
```

#### Performance Issues
```bash
# whereis taking too long
# Limit search to specific directories
whereis -B /bin:/usr/bin -b command_name

# Use specific search type
whereis -b command_name  # Only binaries, faster

# Check current search paths
whereis -l | wc -l  # Count search paths

# Reduce search paths temporarily
WHEREIS_PATHS="/bin:/usr/bin:/usr/local/bin"
export PATH
```

#### Manual Pages Not Found
```bash
# whereis not finding manual pages
# Update manual page database
sudo mandb

# Check manual page search paths
manpath

# Add custom manual path
export MANPATH="/usr/local/man:$MANPATH"

# Verify manual page exists
ls /usr/share/man/man1/command.1.gz
```

### Debugging Techniques

#### Search Path Analysis
```bash
# Analyze why whereis doesn't find a command
debug_whereis() {
    local cmd=$1
    echo "Searching for: $cmd"

    echo "Binary search paths:"
    whereis -l | grep -E "bin|sbin"

    echo "Manual page search paths:"
    whereis -l | grep "man"

    echo "Source search paths:"
    whereis -l | grep "src"

    echo "Actual search result:"
    whereis $cmd
}

# Find where whereis is looking
trace_whereis_search() {
    local cmd=$1
    echo "Tracing search for: $cmd"

    # Search manually in whereis paths
    for path in $(whereis -l | grep -E "bin|sbin"); do
        if [ -f "$path/$cmd" ]; then
            echo "Found binary at: $path/$cmd"
        fi
    done
}
```

#### Environment Comparison
```bash
# Compare whereis results across different users
compare_user_commands() {
    local cmd=$1

    echo "Current user ($(whoami)):"
    whereis $cmd

    sudo -u nobody bash -c "whereis $cmd"
    echo "User nobody:"

    # Check PATH differences
    echo "Current PATH: $PATH"
    sudo -u nobody bash -c "echo PATH: \$PATH"
}

# Test in different environments
test_environment_variations() {
    local cmd=$1

    echo "Standard environment:"
    env -i bash -c "whereis $cmd"

    echo "Minimal environment:"
    env -i PATH=/bin:/usr/bin bash -c "whereis $cmd"

    echo "Full environment:"
    bash -l -c "whereis $cmd"
}
```

## Related Commands

- [`which`](/docs/commands/file-management/which) - Locate a command executable in PATH
- [`type`](/docs/commands/system/type) - Display command type and location information
- [`command`](/docs/commands/system/command) - Execute a command with specific lookup behavior
- [`locate`](/docs/commands/file-management/locate) - Find files by name using database
- [`find`](/docs/commands/file-management/find) - Search for files in directory hierarchy
- [`apropos`](/docs/commands/system/apropos) - Search manual page names and descriptions
- [`whatis`](/docs/commands/system/whatis) - Display one-line manual page descriptions
- [`man`](/docs/commands/system/man) - Display manual pages
- [`file`](/docs/commands/file-management/file) - Determine file type
- [`ls`](/docs/commands/file-management/ls) - List directory contents

## Best Practices

1. **Use `whereis` for quick location checks** when you need to find where programs are installed
2. **Combine with `which`** to understand which executable will actually be run (PATH resolution)
3. **Use specific search types** (-b, -m, -s) to narrow down searches and improve performance
4. **Customize search paths** with -B, -M, -S when working with non-standard installations
5. **Use `whereis -u`** to identify commands installed in unusual locations
6. **Cross-reference with package managers** to understand which packages installed specific commands
7. **Update manual page database** regularly with `mandb` for accurate `-m` searches
8. **Use `whereis -l`** to understand default search paths and troubleshoot missing files
9. **Combine with other tools** like `file` and `ls -la` for detailed file information
10. **Script automation** should use whereis for existence checks before attempting to use commands

## Performance Tips

1. **Use targeted searches** (-b, -m, -s) instead of full searches when possible
2. **Limit search scope** with -B, -M, -S for faster results in large systems
3. **Cache results** for frequently accessed commands in scripts
4. **Avoid wildcard searches** as whereis doesn't support pattern matching
5. **Use `whereis -u` sparingly** as it checks all commands which can be slow
6. **Update your system's locate database** if using `locate` as an alternative
7. **Consider `which`** for PATH-only searches when you need the active executable
8. **Use shell built-ins** like `type` for fastest command existence checks
9. **Batch multiple commands** in a single whereis call for efficiency
10. **Understand search path priorities** to predict which locations will be checked first

The `whereis` command is a fundamental system utility that provides quick access to program locations across standard Linux filesystem hierarchies. Its ability to search for multiple file types (binaries, source, and documentation) makes it invaluable for system administration, development environment setup, and troubleshooting installation issues. While simpler than comprehensive search tools like `find`, `whereis` offers excellent performance for standard location lookups and serves as an essential tool in every Linux user's toolkit.