---
title: command - Execute command without shell function lookup
sidebar_label: command
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# command - Execute command without shell function lookup

The `command` builtin command in Unix-like operating systems is a powerful utility that allows you to execute commands with or without bypassing shell functions, aliases, and builtins. It's particularly useful when you want to ensure that you're running the actual external command rather than a shell function or alias with the same name. The command provides fine-grained control over command execution, supports verbose output for debugging, and can help avoid infinite recursion in shell functions. It's an essential tool for shell scripting, system administration, and command-line troubleshooting.

## Basic Syntax

```bash
command [-p|-v|-V] COMMAND [ARGUMENTS...]
```

## Common Options

### Execution Control
- `-p` - Use a default value for `PATH` that is guaranteed to find all standard utilities
- `-v` - Verbose mode: describe the command that would be executed
- `-V` - Very verbose mode: display detailed information about the command

### Shell Behavior
- `--` - Signal end of options and treat following arguments as commands
- No options: Execute the command normally, bypassing shell functions

## Usage Examples

### Basic Command Execution

#### Executing Commands Normally
```bash
# Execute a command, bypassing any shell functions
command ls -la

# Execute with custom arguments
command grep -r "pattern" /directory/

# Run a specific command even if a function exists with the same name
command cd /path/to/directory

# Execute multiple commands
command date; command whoami
```

#### Bypassing Shell Functions
```bash
# Define a function that would normally override 'ls'
ls() {
    echo "Custom ls function"
    echo "Arguments: $@"
}

# This would execute the function
ls -la

# This executes the actual 'ls' command
command ls -la

# Reset the function behavior
unset -f ls
```

### Path Management

#### Using Default PATH
```bash
# Use standard PATH to find system utilities
command -p ls

# Execute system version regardless of local modifications
command -p python3 script.py

# Find standard utilities in case PATH is corrupted
command -p which command_name

# Execute system cp with standard PATH
command -p cp source.txt destination.txt
```

#### Command Discovery and Information
```bash
# Check if a command exists and where it is
command -v python3

# Get full path of executable
command -v gcc

# Check multiple commands
for cmd in git node python; do
    if command -v "$cmd" >/dev/null 2>&1; then
        echo "$cmd is available at $(command -v "$cmd")"
    else
        echo "$cmd is not found"
    fi
done

# Use in scripts for dependency checking
command -v docker >/dev/null 2>&1 || {
    echo "Docker is required but not installed."
    exit 1
}
```

### Verbose Command Information

#### Verbose Mode (-v)
```bash
# Show where the command would be found
command -v ls
# Output: /bin/ls

# Check for shell builtins
command -v echo
# Output: echo (shell builtin)

# Identify shell functions
myfunc() { echo "Hello"; }
command -v myfunc
# Output: myfunc

# Check for aliases
alias ll='ls -l'
command -v ll
# Output: ll (aliased to 'ls -l')

# Find commands in different scenarios
command -v ifconfig
# Output: /sbin/ifconfig (or not found)
```

#### Very Verbose Mode (-V)
```bash
# Get detailed information about commands
command -V ls
# Output: ls is /bin/ls

# Information about shell builtins
command -V cd
# Output: cd is a shell builtin

# Details about shell functions
command -V myfunc
# Output: myfunc is a function
# myfunc ()
# {
#     echo "Hello"
# }

# Aliases information
command -V ll
# Output: ll is an alias for 'ls -l'

# Multiple command information
for cmd in ls cd grep; do
    echo "=== Information about '$cmd' ==="
    command -V "$cmd"
    echo
done
```

## Practical Examples

### Shell Scripting

#### Safe Command Execution
```bash
#!/bin/bash
# Safe script execution with command builtin

# Function that would conflict with system command
cd() {
    echo "Custom cd function - would be unsafe"
    return 1
}

# Use 'command' to ensure real command execution
backup_directory() {
    local source_dir="$1"
    local dest_dir="$2"

    echo "Backing up from $source_dir to $dest_dir"

    # Use command to bypass our custom function
    command mkdir -p "$dest_dir"
    command cp -r "$source_dir"/* "$dest_dir/"

    echo "Backup completed successfully"
}

# Restore normal cd behavior
unset -f cd

# Usage in scripts with error checking
safe_execute() {
    local cmd="$1"
    shift

    if command -v "$cmd" >/dev/null 2>&1; then
        echo "Executing: $cmd $*"
        command "$cmd" "$@"
    else
        echo "Error: Command '$cmd' not found" >&2
        return 1
    fi
}

# Example usage
safe_execute ls -la /tmp
safe_execute python3 --version
```

#### Dependency Checking Script
```bash
#!/bin/bash
# Check for required commands before proceeding

required_commands=("git" "docker" "python3" "node")
missing_commands=()

echo "Checking for required commands..."

for cmd in "${required_commands[@]}"; do
    if command -v "$cmd" >/dev/null 2>&1; then
        echo "✓ $cmd found: $(command -v "$cmd")"
    else
        echo "✗ $cmd not found"
        missing_commands+=("$cmd")
    fi
done

if [ ${#missing_commands[@]} -gt 0 ]; then
    echo
    echo "Error: Missing required commands: ${missing_commands[*]}"
    echo "Please install these commands before proceeding."
    exit 1
else
    echo
    echo "All required commands are available!"
fi
```

### System Administration

#### Command Audit and Security
```bash
#!/bin/bash
# Audit command availability and versions

echo "=== System Command Audit ==="
echo "Date: $(date)"
echo "Hostname: $(hostname)"
echo

# List important system commands
system_commands=("ls" "cp" "mv" "rm" "chmod" "chown" "ps" "kill" "top" "df" "du")

echo "Checking core system commands:"
for cmd in "${system_commands[@]}"; do
    if cmd_path=$(command -v "$cmd" 2>/dev/null); then
        echo "✓ $cmd: $cmd_path"
        # Get version if available
        if "$cmd" --version >/dev/null 2>&1; then
            echo "  Version: $("$cmd" --version 2>&1 | head -1)"
        fi
    else
        echo "✗ $cmd: NOT FOUND"
    fi
done

echo
echo "=== Shell Builtins Check ==="
for builtin in cd echo pwd kill; do
    command -V "$builtin"
done

echo
echo "=== Function/Alias Conflicts Check ==="
# Check for potential conflicts
conflicting_commands=("ls" "cd" "rm")
for cmd in "${conflicting_commands[@]}"; do
    if command -V "$cmd" 2>/dev/null | grep -q "function\|alias"; then
        echo "⚠ Potential conflict for '$cmd':"
        command -V "$cmd"
    fi
done
```

#### Safe Environment Setup
```bash
#!/bin/bash
# Setup safe environment with guaranteed standard utilities

# Function to create a safe environment
create_safe_environment() {
    local temp_dir="$1"

    echo "Creating safe environment in $temp_dir"

    # Use default PATH to ensure standard utilities
    command -p mkdir -p "$temp_dir"
    command -p cd "$temp_dir" || {
        echo "Error: Cannot change to directory $temp_dir"
        return 1
    }

    # Copy essential utilities with explicit paths
    local essential_bins=("/bin/ls" "/bin/cp" "/bin/mv" "/bin/rm" "/bin/cat")

    for bin in "${essential_bins[@]}"; do
        if [ -x "$bin" ]; then
            command -p cp "$bin" ./
            echo "Copied $(basename "$bin")"
        fi
    done

    echo "Safe environment created successfully"
}

# Use safe commands even if functions are overridden
safe_cleanup() {
    local target_dir="$1"

    echo "Safely cleaning up $target_dir"

    # Use command with explicit paths for safety
    command -p rm -rf "$target_dir"

    echo "Cleanup completed"
}
```

### Development Workflow

#### Build Script with Safe Commands
```bash
#!/bin/bash
# Safe build script that bypasses custom functions

# Potential conflicting functions
make() {
    echo "Custom make function - this would break the build!"
    return 1
}

cmake() {
    echo "Custom cmake function - conflict detected"
    return 1
}

# Safe build function
safe_build() {
    local build_dir="$1"

    echo "Starting safe build process..."

    # Create build directory safely
    command mkdir -p "$build_dir"
    command cd "$build_dir"

    # Use command to bypass our conflicting functions
    echo "Configuring with CMake..."
    command cmake .. || {
        echo "CMake configuration failed"
        return 1
    }

    echo "Building with make..."
    command make -j$(nproc) || {
        echo "Build failed"
        return 1
    }

    echo "Build completed successfully!"
}

# Clean build function
safe_clean() {
    echo "Cleaning build directory..."
    command rm -rf build/
    echo "Clean completed"
}

# Main execution
case "$1" in
    "build")
        safe_build "build"
        ;;
    "clean")
        safe_clean
        ;;
    *)
        echo "Usage: $0 {build|clean}"
        exit 1
        ;;
esac
```

#### Development Environment Checker
```bash
#!/bin/bash
# Check development environment setup

# Development tools to check
dev_tools=("gcc" "g++" "make" "cmake" "python3" "node" "npm" "git" "docker")
python_modules=("pip" "virtualenv")
node_modules=("npm" "yarn" "npx")

echo "=== Development Environment Check ==="
echo

# Check basic development tools
echo "Checking core development tools:"
for tool in "${dev_tools[@]}"; do
    if command -v "$tool" >/dev/null 2>&1; then
        version=$("$tool" --version 2>/dev/null | head -1 || echo "Unknown version")
        echo "✓ $tool: $version"
    else
        echo "✗ $tool: NOT INSTALLED"
    fi
done

echo
echo "Checking Python environment:"
if command -v python3 >/dev/null 2>&1; then
    python_version=$(python3 --version)
    echo "✓ Python: $python_version"

    for module in "${python_modules[@]}"; do
        if python3 -m "$module" --version >/dev/null 2>&1; then
            echo "✓ python3 -m $module: Available"
        else
            echo "✗ python3 -m $module: Not available"
        fi
    done
else
    echo "✗ Python3: Not installed"
fi

echo
echo "Checking Node.js environment:"
if command -v node >/dev/null 2>&1; then
    node_version=$(node --version)
    echo "✓ Node.js: $node_version"

    for module in "${node_modules[@]}"; do
        if command -v "$module" >/dev/null 2>&1; then
            module_version=$("$module" --version 2>/dev/null || echo "Unknown version")
            echo "✓ $module: $module_version"
        else
            echo "✗ $module: Not installed"
        fi
    done
else
    echo "✗ Node.js: Not installed"
fi
```

## Advanced Usage

### Function and Alias Management

#### Detecting and Handling Conflicts
```bash
#!/bin/bash
# Advanced conflict detection and resolution

# Function to check for command conflicts
check_command_conflicts() {
    local commands=("$@")
    local conflicts_found=false

    echo "Checking for command conflicts..."

    for cmd in "${commands[@]}"; do
        # Get detailed command information
        cmd_info=$(command -V "$cmd" 2>/dev/null)

        if echo "$cmd_info" | grep -q "function"; then
            echo "⚠ Function conflict for '$cmd':"
            echo "$cmd_info"
            conflicts_found=true
        elif echo "$cmd_info" | grep -q "alias"; then
            echo "⚠ Alias conflict for '$cmd':"
            echo "$cmd_info"
            conflicts_found=true
        elif echo "$cmd_info" | grep -q "not found"; then
            echo "✗ Command '$cmd' not found"
        else
            echo "✓ '$cmd': $cmd_info"
        fi
    done

    return $([ "$conflicts_found" = true ] && echo 1 || echo 0)
}

# Function to safely execute commands with conflict resolution
safe_execute_with_fallback() {
    local cmd="$1"
    shift

    # Check if command exists
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: Command '$cmd' not found" >&2
        return 127
    fi

    # Check for conflicts
    cmd_info=$(command -V "$cmd" 2>/dev/null)

    if echo "$cmd_info" | grep -q "function"; then
        echo "Warning: Bypassing function '$cmd', executing system command" >&2
        command "$cmd" "$@"
    elif echo "$cmd_info" | grep -q "alias"; then
        echo "Warning: Bypassing alias '$cmd', executing system command" >&2
        command "$cmd" "$@"
    else
        # No conflicts, execute normally
        "$cmd" "$@"
    fi
}

# Usage examples
important_commands=("ls" "cd" "rm" "cp" "mv")

check_command_conflicts "${important_commands[@]}"

echo
echo "Testing safe execution:"
safe_execute_with_fallback ls -la
safe_execute_with_fallback rm -rf /tmp/test_file
```

#### Command Wrapper Generator
```bash
#!/bin/bash
# Generate safe command wrappers

# Function to create safe command wrappers
create_safe_wrapper() {
    local cmd="$1"
    local wrapper_name="safe_$cmd"

    cat << EOF > "$wrapper_name"
#!/bin/bash
# Safe wrapper for '$cmd' command

# Execute the real command, bypassing any functions or aliases
command "$cmd" "\$@"
EOF

    chmod +x "$wrapper_name"
    echo "Created safe wrapper: $wrapper_name"
}

# Function to generate comprehensive wrapper script
generate_wrapper_script() {
    local commands=("$@")
    local output_file="safe_commands.sh"

    cat << 'EOF' > "$output_file"
#!/bin/bash
# Safe command execution script - generated automatically
# This script provides safe versions of important commands

EOF

    # Add wrapper functions for each command
    for cmd in "${commands[@]}"; do
        cat << EOF >> "$output_file"
# Safe wrapper for $cmd
safe_$cmd() {
    command "$cmd" "\$@"
}

EOF
    done

    # Add main execution logic
    cat << 'EOF' >> "$output_file"
# Main execution logic
if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> [arguments...]"
    echo "Available safe commands: "
    for cmd in "${commands[@]}"; do
        echo "  safe_$cmd"
    done
    exit 1
fi

safe_cmd="$1"
shift

case "$safe_cmd" in
EOF

    # Add case statements
    for cmd in "${commands[@]}"; do
        echo "    \"safe_$cmd\")" >> "$output_file"
        echo "        safe_$cmd \"\$@\"" >> "$output_file"
        echo "        ;;" >> "$output_file"
    done

    cat << 'EOF' >> "$output_file"
    *)
        echo "Error: Unknown safe command '$safe_cmd'"
        exit 1
        ;;
esac
EOF

    chmod +x "$output_file"
    echo "Generated wrapper script: $output_file"
}

# Create wrappers for important commands
critical_commands=("rm" "mv" "cp" "chmod" "chown")

echo "Creating individual safe wrappers:"
for cmd in "${critical_commands[@]}"; do
    create_safe_wrapper "$cmd"
done

echo
echo "Generating comprehensive wrapper script:"
generate_wrapper_script "${critical_commands[@]}"
```

### Environment and Path Management

#### Secure Command Execution Environment
```bash
#!/bin/bash
# Create secure command execution environment

# Function to setup secure environment
setup_secure_env() {
    local working_dir="$1"

    echo "Setting up secure environment in $working_dir"

    # Use default PATH for security
    export PATH=$(command -p getconf PATH)

    # Create working directory with standard commands
    command -p mkdir -p "$working_dir"
    command -p cd "$working_dir"

    # Create a sandbox with essential binaries
    local essential_bins=(
        "/bin/cat" "/bin/ls" "/bin/cp" "/bin/mv" "/bin/rm"
        "/bin/chmod" "/bin/chown" "/bin/mkdir" "/bin/rmdir"
        "/usr/bin/find" "/usr/bin/grep" "/usr/bin/sed"
        "/usr/bin/awk" "/usr/bin/wc" "/usr/bin/sort"
        "/usr/bin/uniq" "/usr/bin/head" "/usr/bin/tail"
    )

    command -p mkdir -p bin

    for bin in "${essential_bins[@]}"; do
        if [ -x "$bin" ]; then
            command -p cp "$bin" bin/
            echo "Copied $(basename "$bin")"
        fi
    done

    # Create secure wrapper script
    cat << 'EOF' > secure_exec
#!/bin/bash
# Secure execution wrapper

# Use only local binaries
export PATH="./bin"

# Execute command with security checks
if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> [arguments...]"
    exit 1
fi

cmd="$1"
shift

# Check if command exists in our sandbox
if [ -x "./bin/$cmd" ]; then
    "./bin/$cmd" "$@"
else
    echo "Error: Command '$cmd' not available in secure environment"
    exit 1
fi
EOF

    command -p chmod +x secure_exec
    echo "Secure environment setup completed"
}

# Function to test secure environment
test_secure_env() {
    local test_dir="$1"

    echo "Testing secure environment..."

    # Test standard PATH command
    echo "Testing with standard PATH:"
    command -p ls -la

    echo
    echo "Testing with secure environment:"
    cd "$test_dir"
    ./secure_exec ls -la

    echo
    echo "Testing command availability:"
    for cmd in ls cat rm cp; do
        if ./secure_exec which "$cmd" >/dev/null 2>&1; then
            echo "✓ $cmd available"
        else
            echo "✗ $cmd not available"
        fi
    done
}

# Usage
secure_dir="/tmp/secure_env_$$"
setup_secure_env "$secure_dir"
test_secure_env "$secure_dir"
```

#### Cross-Platform Command Compatibility
```bash
#!/bin/bash
# Cross-platform command compatibility checker

# Function to check command across different platforms
check_cross_platform_commands() {
    local commands=("$@")

    echo "=== Cross-Platform Command Compatibility Check ==="
    echo "System: $(uname -s)"
    echo "Architecture: $(uname -m)"
    echo "Shell: $SHELL"
    echo

    # Check standard commands with different behaviors
    for cmd in "${commands[@]}"; do
        echo "Checking '$cmd':"

        # Check if command exists
        if ! command -v "$cmd" >/dev/null 2>&1; then
            echo "  ✗ Not found"
            continue
        fi

        # Get command type and location
        cmd_info=$(command -V "$cmd" 2>/dev/null)
        echo "  $cmd_info"

        # Check if it's a builtin
        if echo "$cmd_info" | grep -q "builtin"; then
            echo "  Type: Shell builtin"
        elif echo "$cmd_info" | grep -q "function"; then
            echo "  Type: Shell function"
        elif echo "$cmd_info" | grep -q "alias"; then
            echo "  Type: Shell alias"
        else
            echo "  Type: External command"
        fi

        # Test basic functionality
        case "$cmd" in
            "echo")
                echo "  Test: $(command echo "Hello World")"
                ;;
            "pwd")
                echo "  Test: $(command pwd)"
                ;;
            "date")
                echo "  Test: $(command date)"
                ;;
        esac

        echo
    done
}

# Function to create platform-specific command wrapper
create_platform_wrapper() {
    local cmd="$1"
    local wrapper_name="platform_$cmd"

    cat << EOF > "$wrapper_name"
#!/bin/bash
# Platform-specific wrapper for '$cmd'

# Detect platform
platform=\$(uname -s)

case "\$platform" in
    "Linux")
        # Linux-specific behavior
        command "$cmd" "\$@"
        ;;
    "Darwin")
        # macOS-specific behavior
        command "$cmd" "\$@"
        ;;
    *)
        # Default behavior
        command "$cmd" "\$@"
        ;;
esac
EOF

    chmod +x "$wrapper_name"
    echo "Created platform wrapper: $wrapper_name"
}

# Test important commands
platform_commands=("echo" "pwd" "date" "ls" "cat" "rm" "cp")

check_cross_platform_commands "${platform_commands[@]}"

echo
echo "Creating platform-specific wrappers:"
for cmd in echo pwd date; do
    create_platform_wrapper "$cmd"
done
```

## Integration and Automation

### Shell Script Templates

#### Robust Script Template
```bash
#!/bin/bash
# Robust shell script template with safe command execution

# Script configuration
SCRIPT_NAME="$(basename "$0")"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION="1.0.0"

# Safe command execution function
safe_cmd() {
    local cmd="$1"
    shift

    # Validate command exists
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: Command '$cmd' not found" >&2
        return 127
    fi

    # Execute safely
    command "$cmd" "$@"
}

# Verbose command execution
verbose_cmd() {
    local cmd="$1"
    shift

    echo "Executing: $cmd $*"
    safe_cmd "$cmd" "$@"
}

# Error handling
handle_error() {
    local exit_code=$1
    local line_number=$2

    echo "Error occurred in $SCRIPT_NAME at line $line_number" >&2
    echo "Exit code: $exit_code" >&2
    exit $exit_code
}

# Set up error handling
set -eE
trap 'handle_error $? $LINENO' ERR

# Main script function
main() {
    echo "Starting $SCRIPT_NAME v$VERSION"
    echo "Working directory: $(safe_cmd pwd)"
    echo

    # Example usage of safe commands
    echo "Creating test directory..."
    safe_cmd mkdir -p test_dir

    echo "Creating test files..."
    safe_cmd touch test_dir/file1.txt test_dir/file2.txt

    echo "Listing directory contents:"
    verbose_cmd ls -la test_dir/

    echo "Cleaning up..."
    safe_cmd rm -rf test_dir/

    echo "Script completed successfully"
}

# Script entry point
if [[ "${BASH_SOURCE[0}}" == "${0}" ]]; then
    main "$@"
fi
```

#### Command Availability Checker
```bash
#!/bin/bash
# Comprehensive command availability checker

# Configuration
CONFIG_FILE="commands.conf"
REPORT_FILE="command_report_$(date +%Y%m%d_%H%M%S).txt"

# Default command categories
declare -A COMMAND_CATEGORIES=(
    ["system_tools"]="ls cp mv rm mkdir rmdir chmod chown find grep sed awk"
    ["development"]="gcc g++ make cmake git python3 node npm docker"
    ["networking"]="ping curl wget ssh scp rsync nmap netstat"
    ["text_processing"]="cat less more head tail wc sort uniq tr"
    ["system_info"]="ps top df du free uname lscpu lsblk"
)

# Function to check command availability
check_command() {
    local cmd="$1"

    if command -v "$cmd" >/dev/null 2>&1; then
        local cmd_path=$(command -v "$cmd")
        local cmd_info=$(command -V "$cmd" 2>/dev/null)

        echo "✓ $cmd: $cmd_path"
        echo "  Info: $cmd_info"

        # Try to get version information
        if "$cmd" --version >/dev/null 2>&1; then
            echo "  Version: $("$cmd" --version 2>&1 | head -1)"
        fi

        return 0
    else
        echo "✗ $cmd: NOT FOUND"
        return 1
    fi
}

# Function to check command category
check_category() {
    local category="$1"
    local commands="$2"

    echo "=== $category ==="

    local found=0
    local total=0

    for cmd in $commands; do
        ((total++))
        if check_command "$cmd"; then
            ((found++))
        fi
        echo
    done

    echo "Summary for $category: $found/$total commands found"
    echo
}

# Function to generate report
generate_report() {
    echo "Generating command availability report..."

    {
        echo "Command Availability Report"
        echo "Generated: $(date)"
        echo "System: $(uname -a)"
        echo "Shell: $SHELL"
        echo "PATH: $PATH"
        echo
        echo "=== EXECUTION SUMMARY ==="

        # Check all categories
        for category in "${!COMMAND_CATEGORIES[@]}"; do
            check_category "$category" "${COMMAND_CATEGORIES[$category]}"
        done

    } | tee "$REPORT_FILE"

    echo "Report saved to: $REPORT_FILE"
}

# Function to load custom configuration
load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        echo "Loading configuration from $CONFIG_FILE"
        source "$CONFIG_FILE"
    fi
}

# Function to install missing packages (example for apt)
install_missing() {
    echo "This would install missing packages (example implementation)"
    echo "Note: Actual implementation would depend on package manager"

    # Example for apt-based systems
    # sudo apt-get update
    # sudo apt-get install -y missing_package1 missing_package2
}

# Main execution
main() {
    echo "Command Availability Checker"
    echo "==========================="
    echo

    load_config
    generate_report

    echo "Check completed. Report generated."
}

# Command line interface
case "${1:-check}" in
    "check")
        main
        ;;
    "install")
        install_missing
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [check|install|help]"
        echo "  check   - Check command availability (default)"
        echo "  install - Install missing commands (example)"
        echo "  help    - Show this help message"
        ;;
    *)
        echo "Unknown option: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
```

## Troubleshooting

### Common Issues and Solutions

#### Command Not Found Errors
```bash
# Problem: Command not found despite being installed
command -v mycommand

# Solution: Check PATH and use full path
echo "Current PATH: $PATH"
command -p which mycommand

# Solution: Use default PATH for standard utilities
command -p ls
command -p cp file1 file2

# Solution: Check for shell functions overriding commands
declare -f mycommand 2>/dev/null && echo "Function exists"
alias mycommand 2>/dev/null && echo "Alias exists"

# Solution: Bypass conflicts with command builtin
command mycommand --version
```

#### Function and Alias Conflicts
```bash
# Problem: Custom functions override system commands
ls() { echo "Custom function"; }

# Detect conflicts
command -V ls
# Output: ls is a function

# Solution: Use command to bypass functions
command ls -la

# Solution: Temporarily disable the function
unset -f ls
ls -la

# Solution: Use command with default PATH
command -p ls -la
```

#### Path Issues
```bash
# Problem: Corrupted or modified PATH
export PATH=""

# Solution: Use command with default PATH
command -p ls
command -p whoami

# Reset to default PATH
export PATH=$(command -p getconf PATH)

# Solution: Check command location explicitly
if [ -x /bin/ls ]; then
    /bin/ls -la
fi
```

#### Permission Issues
```bash
# Problem: Command exists but not executable
touch myscript.sh
echo '#!/bin/bash' > myscript.sh

# Check if command is found but not executable
command -v ./myscript.sh
# Returns path but may not be executable

# Solution: Make executable
chmod +x ./myscript.sh

# Verify with command
command -v ./myscript.sh && echo "Now executable"
```

## Related Commands

- [`type`](/docs/commands/system-info/type) - Display command type and information
- [`which`](/docs/commands/file-management/which) - Locate executable in PATH
- [`whereis`](/docs/commands/file-management/whereis) - Locate binary, source, and manual files
- [`builtin`](/docs/commands/system-info/builtin) - Execute shell builtins
- [`enable`](/docs/commands/system-info/enable) - Enable/disable shell builtins
- [`alias`](/docs/commands/system-info/alias) - Create command aliases
- [`unalias`](/docs/commands/system-info/unalias) - Remove command aliases
- [`declare`](/docs/commands/system-info/declare) - Declare variables and functions
- [`export`](/docs/commands/system-info/export) - Export variables to child processes

## Best Practices

1. **Use `command` in shell scripts** to ensure reliable command execution
2. **Check command existence** before execution using `command -v`
3. **Bypass functions** when you need the actual external command
4. **Use `-p` option** for critical system utilities to avoid PATH issues
5. **Validate commands** in scripts with verbose mode (`-v`) or very verbose (`-V`)
6. **Document command requirements** in scripts using `command -v` checks
7. **Avoid name conflicts** by using descriptive function names
8. **Test command availability** across different platforms and environments
9. **Use absolute paths** for critical system commands when possible
10. **Handle errors gracefully** when commands are not found

## Performance Tips

1. **`command -v` is fast** for simple existence checks and preferred over `which`
2. **Cache command paths** in scripts for repeated use to avoid PATH lookups
3. **Use built-in commands** when available for better performance
4. **Minimize command lookups** by storing results in variables
5. **Avoid unnecessary function definitions** that might conflict with system commands
6. **Use `command` only when needed** - direct execution is faster when no conflicts exist
7. **Group related checks** together to reduce overhead
8. **Consider shell-specific optimizations** based on your target shell
9. **Profile command execution** in critical scripts to identify bottlenecks
10. **Use appropriate tools** for the task - `command` for execution control, `type` for information

The `command` builtin is an essential tool for reliable shell scripting and command execution. It provides fine-grained control over command resolution, helps avoid conflicts with shell functions and aliases, and ensures predictable behavior across different environments. Mastering `command` is crucial for writing robust, portable shell scripts and maintaining system security.