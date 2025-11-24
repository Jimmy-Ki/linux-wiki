---
title: true - Return Successful Status
sidebar_label: true
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# true - Return Successful Status

The `true` command is a shell builtin that always returns a successful exit status (0). It does nothing and produces no output, making it useful for scripting, loops, and logical operations.

## Basic Syntax

```bash
true
```

## Usage Examples

### Basic Usage
```bash
# Always succeeds
true

# Check exit status
true && echo "Success!"  # Will print "Success!"

# Use in conditional statements
if true; then
    echo "This will always execute"
fi
```

### Scripting and Logic
```bash
# Infinite loop
while true; do
    echo "This runs forever"
    sleep 1
done

# Bypass error checking in scripts with set -e
set -e
some_command || true  # Prevents script from exiting on failure

# Always execute cleanup
cleanup_command || true
```

### Placeholder and No-Op
```bash
# Empty function body
function placeholder() {
    true  # Do nothing successfully
}

# Conditional placeholder
if [ "$condition" ]; then
    echo "Condition met"
else
    true  # Do nothing when condition not met
fi

# Case statement placeholder
case "$option" in
    start)   echo "Starting...";;
    stop)    echo "Stopping...";;
    *)       true;;  # Do nothing for other options
esac
```

## Practical Examples

### Error Handling
```bash
# Continue script despite errors
risky_command || true
echo "Script continues..."

# Override set -e temporarily
set -e
command_that_might_fail || true
echo "This line will execute regardless"

# Safe error handling
function safe_operation() {
    try_command || true
    cleanup_command
}
```

### Loop Control
```bash
# Infinite monitoring loop
while true; do
    check_system_status
    sleep 60
done

# Keep service running
while true; do
    service_command || echo "Service failed, restarting..."
    sleep 5
done

# Process monitoring
while true; do
    if ! pgrep important_process > /dev/null; then
        echo "Process died, restarting..."
        start_important_process
    fi
    sleep 30
done
```

### Shell Configuration
```bash
# Functions with conditional execution
function debug_log() {
    if [ "$DEBUG" = "true" ]; then
        echo "$1"
    else
        true  # Silent when debug is off
    fi
}

# Optional commands
function optional_cleanup() {
    [ -d "/tmp/cache" ] && rm -rf /tmp/cache || true
}

# Safe sourcing of optional files
[ -f "/opt/custom/config" ] && source /opt/custom/config || true
```

### System Administration
```bash
# Service management scripts
function restart_service() {
    systemctl stop "$1" || true
    systemctl start "$1"
    echo "Service $1 restarted"
}

# User management with error tolerance
function create_user() {
    useradd "$1" || true
    echo "User creation attempted for $1"
}

# File operations with graceful failure
function safe_remove() {
    [ -f "$1" ] && rm "$1" || true
}
```

## Advanced Usage

### Conditional Logic
```bash
# Complex conditions with true
if command1 && command2 || true; then
    echo "At least one path succeeded"
fi

# Always execute cleanup
function main_logic() {
    setup_commands
    main_commands
}
cleanup_commands || true

# Error recovery
function robust_command() {
    attempt_command || {
        echo "First attempt failed, trying alternative..."
        alternative_command || true
    }
}
```

### Performance Testing
```bash
# Benchmark true command performance
time for i in {1..1000000}; do true; done

# Compare with other no-ops
time true
time echo -n
time :

# Loop overhead testing
start_time=$(date +%s%N)
for i in {1..100000}; do true; done
end_time=$(date +%s%N)
echo "Time taken: $((($end_time - $start_time) / 1000000))ms"
```

### Debugging and Testing
```bash
# Mock functions for testing
function mock_network_call() {
    true  # Simulate successful network call
}

# Conditional debugging
function debug_command() {
    [ "$DEBUG_MODE" = "1" ] && actual_command || true
}

# Test harness setup
function setup_test_environment() {
    export TEST_MODE=true
    create_test_files || true
    setup_mocks || true
}
```

## Shell Programming Patterns

### Safe Scripting
```bash
#!/bin/bash
set -euo pipefail

# Safe function definitions
function cleanup() {
    rm -f /tmp/lockfile || true
    echo "Cleanup completed"
}

function main() {
    trap cleanup EXIT
    # Main logic here
    risky_operation || true
    echo "Script completed successfully"
}

main "$@"
```

### Configuration Management
```bash
# Optional configuration loading
function load_config() {
    [ -f "/etc/app/config" ] && source /etc/app/config || true
    [ -f "$HOME/.app/config" ] && source "$HOME/.app/config" || true
    echo "Configuration loaded"
}

# Default value setting
: ${APP_MODE:="production"}  # Uses true internally
echo "Running in $APP_MODE mode"
```

## Best Practices

1. **Use `true` for placeholder operations** that must succeed
2. **Combine with `||`** to ignore specific command failures
3. **Use in infinite loops** with appropriate sleep/exit conditions
4. **Employ for debugging switches** to enable/disable code sections
5. **Leverage for error recovery** in critical scripts

## Security Considerations

```bash
# Avoid using true to mask important errors
# Bad practice:
rm -rf /important/data || true  # Dangerous!

# Good practice:
if rm -rf /important/data; then
    echo "Cleanup successful"
else
    echo "Cleanup failed - manual intervention required"
    exit 1
fi
```

## Performance Characteristics

- **Exit Status**: Always returns 0 (success)
- **Output**: No output produced
- **Execution Time**: Minimal overhead
- **Resource Usage**: Negligible

## Related Commands

- [`false`](/docs/commands/other-commands/false) - Return unsuccessful status
- [`:` (colon)] - Shell builtin equivalent to true
- [`exit`](/docs/commands/shell/exit) - Exit the shell
- [`return`](/docs/commands/shell/return) - Return from function
- [`test`](/docs/commands/shell/test) - Evaluate conditional expression

## Compatibility Notes

- Available in all POSIX-compliant shells
- Built-in command in bash, zsh, and most modern shells
- External `/bin/true` also available on most systems
- Consistent behavior across Unix-like systems

The `true` command is a fundamental tool in shell scripting, providing a reliable way to indicate success and create placeholder operations that always succeed.