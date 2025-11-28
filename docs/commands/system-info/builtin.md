---
title: builtin - Execute shell builtins
sidebar_label: builtin
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# builtin - Execute shell builtins

The `builtin` command is a shell builtin that forces the execution of a shell builtin command, bypassing any function or external command with the same name. This is particularly useful in shell scripting when you need to ensure that a specific builtin command is executed instead of a function or external program that might shadow it. The `builtin` command is available in most modern shells including bash, zsh, and ksh, providing a reliable way to access shell builtin functionality even when name conflicts exist.

## Basic Syntax

```bash
builtin [shell-builtin] [arguments]
```

## Common Built-in Commands

### Shell Builtins Commonly Used with builtin
- `cd` - Change directory
- `echo` - Display arguments
- `printf` - Format and print arguments
- `read` - Read from standard input
- `eval` - Execute arguments as shell commands
- `exec` - Replace shell with specified command
- `exit` - Exit the shell
- `export` - Set export attribute for variables
- `kill` - Send signals to processes
- `local` - Create local variables
- `return` - Return from shell function
- `source` - Execute commands from file
- `type` - Display command type information
- `ulimit` - Set resource limits
- `umask` - Set file creation mask

## Usage Examples

### Basic builtin Operations

#### Forcing Builtin Execution
```bash
# Execute builtin echo instead of any echo function
builtin echo "This is the builtin echo"

# Use builtin cd instead of a function named cd
builtin cd /path/to/directory

# Execute builtin printf
builtin printf "Formatted output: %s\n" "Hello World"

# Use builtin kill to ensure signal handling
builtin kill -TERM 1234
```

#### Function Bypassing
```bash
# Create a function that shadows a builtin
cd() {
    echo "Custom cd function"
    builtin cd "$@"
    echo "Changed to $(pwd)"
}

# Use builtin cd directly without the function wrapper
builtin cd /tmp

# Override read function
read() {
    echo "Custom read function"
    builtin read "$@"
}

# Force builtin read execution
builtin read -p "Enter your name: " name
```

### Shell Scripting Applications

#### Safe Scripting with builtin
```bash
#!/bin/bash
# Ensure we use builtin commands regardless of overrides

# Safe directory change
change_dir() {
    local target_dir="$1"
    if [ -d "$target_dir" ]; then
        builtin cd "$target_dir" || {
            echo "Failed to change directory to $target_dir" >&2
            return 1
        }
        echo "Successfully changed to $target_dir"
    else
        echo "Directory $target_dir does not exist" >&2
        return 1
    fi
}

# Safe variable export
safe_export() {
    local var_name="$1"
    local var_value="$2"

    # Validate variable name
    case "$var_name" in
        [a-zA-Z_][a-zA-Z0-9_]*)
            builtin export "${var_name}=${var_value}"
            ;;
        *)
            echo "Invalid variable name: $var_name" >&2
            return 1
            ;;
    esac
}

# Use builtin ulimit for resource control
set_resource_limits() {
    # Limit file descriptors
    builtin ulimit -n 1024

    # Limit process size
    builtin ulimit -v 1048576

    # Limit CPU time
    builtin ulimit -t 300

    echo "Resource limits applied"
}
```

#### Function Override Detection
```bash
# Check if a builtin is overridden
is_builtin_overridden() {
    local cmd="$1"

    # Check if command exists
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Command $cmd not found"
        return 1
    fi

    # Get command type information
    local cmd_type
    cmd_type=$(type -t "$cmd" 2>/dev/null)

    case "$cmd_type" in
        "builtin")
            echo "$cmd is a builtin command"
            return 0
            ;;
        "function")
            echo "$cmd is overridden by a function"
            echo "Function definition:"
            declare -f "$cmd"
            return 1
            ;;
        "alias")
            echo "$cmd is overridden by an alias"
            echo "Alias definition:"
            alias "$cmd"
            return 1
            ;;
        "file")
            echo "$cmd is an external command"
            return 2
            ;;
        *)
            echo "$cmd type: $cmd_type"
            return 0
            ;;
    esac
}

# Execute builtin safely
safe_builtin() {
    local cmd="$1"
    shift

    if is_builtin_overridden "$cmd" >/dev/null 2>&1; then
        builtin "$cmd" "$@"
    else
        echo "$cmd is not a builtin or is overridden" >&2
        return 1
    fi
}
```

### Advanced Shell Programming

#### Command Validation and Execution
```bash
# Validate and execute builtin commands
validate_and_exec_builtin() {
    local builtin_name="$1"
    shift

    # Check if it's a valid builtin
    if ! builtin -p "$builtin_name" >/dev/null 2>&1; then
        echo "Error: '$builtin_name' is not a shell builtin" >&2
        return 1
    fi

    # Check if arguments are valid for this builtin
    case "$builtin_name" in
        "cd")
            if [ $# -gt 1 ]; then
                echo "Error: cd accepts at most one argument" >&2
                return 1
            fi
            ;;
        "export")
            if [ $# -eq 0 ]; then
                builtin export
                return 0
            fi
            ;;
        "kill")
            if [ $# -eq 0 ]; then
                echo "Error: kill requires at least one argument" >&2
                return 1
            fi
            ;;
    esac

    # Execute the builtin with arguments
    builtin "$builtin_name" "$@"
}

# Wrapper for enhanced builtin functionality
enhanced_builtin() {
    local cmd="$1"
    shift

    # Log the builtin execution
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Executing builtin: $cmd $*" >> /tmp/builtin.log

    # Execute with error handling
    if builtin "$cmd" "$@"; then
        echo "Builtin '$cmd' executed successfully"
        return 0
    else
        local exit_code=$?
        echo "Builtin '$cmd' failed with exit code: $exit_code" >&2
        return $exit_code
    fi
}
```

#### Performance Optimization with builtin
```bash
# Performance comparison between builtin and external
benchmark_commands() {
    local iterations=1000
    local test_string="Hello World"

    echo "Performance benchmark (iterations: $iterations)"

    # Time builtin echo
    echo -n "builtin echo: "
    time (
        for ((i=1; i<=iterations; i++)); do
            builtin echo "$test_string" >/dev/null
        done
    )

    # Time external echo (if available)
    if command -v echo >/dev/null 2>&1; then
        echo -n "external echo: "
        time (
            for ((i=1; i<=iterations; i++)); do
                echo "$test_string" >/dev/null
            done
        )
    fi

    # Time builtin printf
    echo -n "builtin printf: "
    time (
        for ((i=1; i<=iterations; i++)); do
            builtin printf "%s\n" "$test_string" >/dev/null
        done
    )
}

# Optimize script with builtin commands
optimize_script() {
    local script_file="$1"

    echo "Optimizing script: $script_file"

    # Create backup
    cp "$script_file" "${script_file}.backup"

    # Replace common external commands with builtin alternatives
    sed -i.bak \
        -e 's|^[[:space:]]*echo[[:space:]]|builtin echo |g' \
        -e 's|^[[:space:]]*printf[[:space:]]|builtin printf |g' \
        -e 's|^[[:space:]]*kill[[:space:]]|builtin kill |g' \
        -e 's|^[[:space:]]*export[[:space:]]|builtin export |g' \
        -e 's|^[[:space:]]*readonly[[:space:]]|builtin readonly |g' \
        "$script_file"

    echo "Script optimization completed"
    echo "Backup saved as: ${script_file}.backup"
}
```

## Practical Examples

### System Administration

#### Secure Shell Environment
```bash
#!/bin/bash
# Secure shell environment setup script

setup_secure_shell() {
    # Set restrictive umask
    builtin umask 077

    # Set resource limits for security
    builtin ulimit -c 0      # No core dumps
    builtin ulimit -n 1024   # Limit file descriptors
    builtin ulimit -u 100    # Limit user processes

    # Export secure environment variables
    builtin export PATH="/usr/local/bin:/usr/bin:/bin"
    builtin export ENV=""
    builtin export IFS=""

    echo "Secure shell environment configured"
}

# Function override protection
protect_builtins() {
    # List of critical builtins to protect
    local critical_builtins=(
        "cd" "eval" "exec" "exit" "kill" "source"
        "ulimit" "umask" "export" "readonly" "return"
    )

    for builtin_cmd in "${critical_builtins[@]}"; do
        # Check if builtin is overridden
        if [ "$(type -t "$builtin_cmd")" != "builtin" ]; then
            echo "Warning: $builtin_cmd is overridden" >&2

            # Restore builtin functionality
            unset -f "$builtin_cmd" 2>/dev/null
            unalias "$builtin_cmd" 2>/dev/null

            echo "Restored builtin functionality for $builtin_cmd"
        fi
    done
}
```

#### Audit and Monitoring
```bash
# Builtin execution auditor
audit_builtin_usage() {
    local audit_file="/tmp/builtin_audit.log"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    # Wrap builtins for auditing
    audit_wrapper() {
        local cmd="$1"
        shift
        local args="$*"

        # Log the command execution
        echo "[$timestamp] Builtin executed: $cmd $args by $USER" >> "$audit_file"

        # Execute the builtin
        builtin "$cmd" "$@"
        local result=$?

        # Log the result
        echo "[$timestamp] Builtin result: $cmd exit code $result" >> "$audit_file"

        return $result
    }

    # Create audited versions of critical builtins
    cd() { audit_wrapper cd "$@"; }
    echo() { audit_wrapper echo "$@"; }
    eval() { audit_wrapper eval "$@"; }
    exec() { audit_wrapper exec "$@"; }

    echo "Builtin auditing enabled. Log file: $audit_file"
}

# Resource usage monitoring
monitor_builtin_resources() {
    local report_file="/tmp/builtin_resource_report.txt"

    echo "Builtin Resource Usage Report - $(date)" > "$report_file"
    echo "=================================" >> "$report_file"

    # Current resource limits
    echo "Current Resource Limits:" >> "$report_file"
    echo "File descriptors: $(builtin ulimit -n)" >> "$report_file"
    echo "Process size: $(builtin ulimit -v)" >> "$report_file"
    echo "CPU time: $(builtin ulimit -t)" >> "$report_file"
    echo "User processes: $(builtin ulimit -u)" >> "$report_file"
    echo "" >> "$report_file"

    # Environment variables count
    echo "Environment Variables:" >> "$report_file"
    echo "Total variables: $(builtin export | wc -l)" >> "$report_file"
    echo "" >> "$report_file"

    # Shell options
    echo "Shell Options:" >> "$report_file"
    builtin set -o | grep -E "(emacs|vi|ignoreeof|noclobber)" >> "$report_file"

    echo "Report saved to: $report_file"
}
```

### Development Workflow

#### Development Environment Setup
```bash
# Development shell environment
setup_dev_environment() {
    # Set development-friendly umask
    builtin umask 022

    # Export development environment variables
    builtin export EDITOR="vim"
    builtin export VISUAL="vim"
    builtin export PAGER="less"
    builtin export LANG="en_US.UTF-8"
    builtin export LC_ALL="en_US.UTF-8"

    # Set development PATH
    builtin export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

    # Increase resource limits for development
    builtin ulimit -n 4096    # More file descriptors
    builtin ulimit -u 1024    # More user processes

    echo "Development environment configured"
}

# Safe development functions
safe_dev_cd() {
    local target_dir="$1"

    # Use builtin cd for safety
    if ! builtin cd "$target_dir" 2>/dev/null; then
        echo "Failed to change directory to: $target_dir" >&2
        return 1
    fi

    # Verify we're in the right directory
    local current_dir
    current_dir=$(builtin pwd)
    echo "Changed to: $current_dir"

    # Show directory contents if it's a project directory
    if [ -f "package.json" ] || [ -f "Makefile" ] || [ -f "CMakeLists.txt" ]; then
        echo "Project directory detected. Contents:"
        ls -la
    fi
}

# Git integration with builtin commands
git_safe_checkout() {
    local branch="$1"

    echo "Safely checking out branch: $branch"

    # Use builtin cd to ensure we're in git repository
    if ! builtin cd "$(git rev-parse --show-toplevel)" 2>/dev/null; then
        echo "Not in a git repository" >&2
        return 1
    fi

    # Stash changes if needed
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo "Stashing uncommitted changes..."
        git stash push -m "Auto-stash before checkout"
    fi

    # Checkout the branch
    git checkout "$branch"

    echo "Checked out to branch: $(git branch --show-current)"
}
```

## Integration and Automation

### Shell Script Templates

#### Robust Script Template
```bash
#!/bin/bash
# Template script with builtin safety features

# Script metadata
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && builtin pwd)"
readonly SCRIPT_PID="$$"

# Safety functions
safe_exit() {
    local exit_code="${1:-0}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $SCRIPT_NAME exiting with code $exit_code"
    builtin exit "$exit_code"
}

# Error handling
error_exit() {
    local error_msg="$1"
    echo "ERROR: $error_msg" >&2
    safe_exit 1
}

# Resource initialization
init_resources() {
    # Set safe umask
    builtin umask 022

    # Set resource limits
    builtin ulimit -c 0      # No core dumps
    builtin ulimit -t 300    # 5 minutes CPU time limit

    # Export script environment
    builtin export SCRIPT_NAME SCRIPT_DIR SCRIPT_PID
}

# Cleanup function
cleanup() {
    echo "Performing cleanup..."
    # Add cleanup tasks here
    builtin echo "Cleanup completed"
}

# Set up signal handlers
trap 'cleanup; safe_exit 130' INT TERM
trap 'error_exit "Script failed on line $LINENO"' ERR

# Initialize script
init_resources

# Main script logic here
main() {
    echo "Starting $SCRIPT_NAME..."

    # Use builtin commands for reliability
    builtin cd "$SCRIPT_DIR" || error_exit "Failed to change to script directory"

    echo "Script completed successfully"
}

# Execute main function
main "$@"
```

#### Function Library with builtin Safety
```bash
#!/bin/bash
# Safe function library using builtin commands

# Safe directory operations
safe_cd() {
    local target_dir="$1"

    # Validate directory
    if [ ! -d "$target_dir" ]; then
        echo "Error: Directory '$target_dir' does not exist" >&2
        return 1
    fi

    # Use builtin cd for safety
    if ! builtin cd "$target_dir"; then
        echo "Error: Failed to change to directory '$target_dir'" >&2
        return 1
    fi

    return 0
}

# Safe variable export
safe_export() {
    local var_name="$1"
    local var_value="$2"

    # Validate variable name
    if [[ ! "$var_name" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]]; then
        echo "Error: Invalid variable name '$var_name'" >&2
        return 1
    fi

    # Export using builtin
    builtin export "${var_name}=${var_value}"
}

# Safe kill operation
safe_kill() {
    local signal="$1"
    local pid="$2"

    # Validate PID
    if [[ ! "$pid" =~ ^[0-9]+$ ]]; then
        echo "Error: Invalid PID '$pid'" >&2
        return 1
    fi

    # Check if process exists
    if ! kill -0 "$pid" 2>/dev/null; then
        echo "Error: Process $pid does not exist" >&2
        return 1
    fi

    # Use builtin kill
    builtin kill "$signal" "$pid"
}

# Safe umask setting
safe_umask() {
    local mask="$1"

    # Validate umask format
    if [[ ! "$mask" =~ ^[0-7]{3}$ ]]; then
        echo "Error: Invalid umask '$mask'. Must be 3-digit octal number." >&2
        return 1
    fi

    # Use builtin umask
    builtin umask "$mask"
}

# Safe read operation
safe_read() {
    local var_name="$1"
    local prompt="$2"
    local is_password="${3:-false}"

    # Validate variable name
    if [[ ! "$var_name" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]]; then
        echo "Error: Invalid variable name '$var_name'" >&2
        return 1
    fi

    # Use builtin read with appropriate options
    if [ "$is_password" = "true" ]; then
        builtin read -s -p "$prompt" "$var_name"
        echo  # Newline after password input
    else
        builtin read -p "$prompt" "$var_name"
    fi
}
```

## Troubleshooting

### Common Issues

#### Builtin Override Conflicts
```bash
# Diagnose builtin override issues
diagnose_builtin_conflicts() {
    local cmd="$1"

    echo "Diagnosing command: $cmd"
    echo "========================"

    # Check if command exists
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "❌ Command '$cmd' not found"
        return 1
    fi

    # Get detailed type information
    echo "Command type:"
    type -a "$cmd"
    echo ""

    # Check if it's a builtin
    if builtin -p "$cmd" >/dev/null 2>&1; then
        echo "✅ '$cmd' is a shell builtin"

        # Check if it's overridden
        local cmd_type
        cmd_type=$(type -t "$cmd" 2>/dev/null)

        if [ "$cmd_type" != "builtin" ]; then
            echo "⚠️  Warning: '$cmd' builtin is overridden by $cmd_type"
            echo ""
            echo "Current definition:"
            case "$cmd_type" in
                "function")
                    declare -f "$cmd"
                    ;;
                "alias")
                    alias "$cmd"
                    ;;
            esac
            echo ""
            echo "To use the builtin directly:"
            echo "builtin $cmd ..."
        else
            echo "✅ '$cmd' builtin is not overridden"
        fi
    else
        echo "❌ '$cmd' is not a shell builtin"
    fi
}

# Fix builtin overrides
fix_builtin_overrides() {
    local cmd="$1"

    echo "Fixing builtin overrides for: $cmd"

    # Remove function override
    if [ "$(type -t "$cmd" 2>/dev/null)" = "function" ]; then
        echo "Removing function override..."
        unset -f "$cmd"
    fi

    # Remove alias override
    if alias "$cmd" >/dev/null 2>&1; then
        echo "Removing alias override..."
        unalias "$cmd"
    fi

    # Verify fix
    if [ "$(type -t "$cmd" 2>/dev/null)" = "builtin" ]; then
        echo "✅ Fixed: '$cmd' is now accessible as builtin"
    else
        echo "❌ Failed to fix '$cmd' override"
        return 1
    fi
}
```

#### Performance Issues
```bash
# Builtin performance analysis
analyze_builtin_performance() {
    local cmd="$1"
    local iterations="${2:-1000}"

    echo "Performance analysis for: $cmd"
    echo "Iterations: $iterations"
    echo "=========================="

    # Check if it's a builtin
    if ! builtin -p "$cmd" >/dev/null 2>&1; then
        echo "Error: '$cmd' is not a builtin"
        return 1
    fi

    # Time builtin execution
    echo "Timing builtin execution..."
    time (
        for ((i=1; i<=iterations; i++)); do
            builtin "$cmd" >/dev/null 2>&1
        done
    )

    # If external command exists, compare performance
    local external_cmd
    external_cmd=$(command -v "$cmd" 2>/dev/null)
    if [ -n "$external_cmd" ] && [ "$external_cmd" != "$cmd" ]; then
        echo ""
        echo "Timing external command execution..."
        time (
            for ((i=1; i<=iterations; i++)); do
                "$external_cmd" >/dev/null 2>&1
            done
        )
    fi
}

# Optimize builtin usage
optimize_builtin_usage() {
    local script_file="$1"

    if [ ! -f "$script_file" ]; then
        echo "Error: Script file '$script_file' not found"
        return 1
    fi

    echo "Optimizing builtin usage in: $script_file"

    # Create backup
    cp "$script_file" "${script_file}.optimize_backup"

    # Optimization patterns
    local optimizations=(
        's|^\([[:space:]]*\)echo[[:space:]]|\1builtin echo |g'
        's|^\([[:space:]]*\)printf[[:space:]]|\1builtin printf |g'
        's|^\([[:space:]]*\)kill[[:space:]]|\1builtin kill |g'
        's|^\([[:space:]]*\)export[[:space:]]|\1builtin export |g'
        's|^\([[:space:]]*\)readonly[[:space:]]|\1builtin readonly |g'
        's|^\([[:space:]]*\)cd[[:space:]]|\1builtin cd |g'
        's|^\([[:space:]]*\)umask[[:space:]]|\1builtin umask |g'
        's|^\([[:space:]]*\)ulimit[[:space:]]|\1builtin ulimit |g'
    )

    # Apply optimizations
    for pattern in "${optimizations[@]}"; do
        sed -i.bak "$pattern" "$script_file"
    done

    echo "Optimization completed"
    echo "Backup saved as: ${script_file}.optimize_backup"
    echo "Intermediate backups: ${script_file}.bak"
}
```

## Related Commands

- [`type`](/docs/commands/system-info/type) - Display command type information
- [`command`](/docs/commands/system-info/command) - Execute command with search bypass
- [`which`](/docs/commands/file-management/which) - Locate executable files
- [`whereis`](/docs/commands/file-management/whereis) - Locate binary/source/man pages
- [`alias`](/docs/commands/system-info/alias) - Create command aliases
- [`unalias`](/docs/commands/system-info/unalias) - Remove command aliases
- [`declare`](/docs/commands/system-info/declare) - Declare shell variables and functions
- [`enable`](/docs/commands/system-info/enable) - Enable and disable shell builtins
- [`help`](/docs/commands/system-info/help) - Display help for shell builtins

## Best Practices

1. **Use builtin for critical operations** - Ensure reliability by using `builtin cd`, `builtin kill`, etc.
2. **Check for overrides** - Use `type -t` to verify if builtins are overridden
3. **Create safe wrappers** - Build validation functions around critical builtins
4. **Audit builtin usage** - Log builtin execution for security monitoring
5. **Performance optimization** - Prefer builtins over external commands when possible
6. **Error handling** - Always check builtin return codes
7. **Resource management** - Use `builtin ulimit` and `builtin umask` for security
8. **Script portability** - Ensure builtin availability across different shell environments
9. **Documentation** - Document any builtin overrides in your code
10. **Testing** - Test builtin behavior in different shell environments

## Performance Tips

1. **Builtins are faster** - Shell builtins execute faster than external commands
2. **No subprocess creation** - Builtins don't create new processes
3. **Memory efficient** - Builtins use less memory than external programs
4. **Consistent behavior** - Builtins provide consistent behavior across systems
5. **Resource limits** - Use `builtin ulimit` to optimize resource usage
6. **Avoid unnecessary forks** - Use builtins to reduce system calls
7. **Batch operations** - Combine multiple builtin operations when possible
8. **Security** - Builtins are less susceptible to PATH manipulation attacks
9. **Environment access** - Builtins have direct access to shell environment
10. **Signal handling** - Builtins integrate better with shell signal handling

The `builtin` command is an essential tool for shell scripting and system administration, providing reliable access to shell builtin functionality while protecting against function and alias overrides. Its use ensures consistent behavior and improved performance in shell scripts and interactive sessions.