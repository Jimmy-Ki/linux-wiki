---
title: enable - Enable and disable shell builtins
sidebar_label: enable
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# enable - Enable and disable shell builtins

The `enable` command is a shell builtin that allows you to enable and disable shell builtin commands. This powerful feature provides control over shell behavior, allowing you to use external commands with the same name as builtins, load new builtins dynamically, and manage the shell's command resolution. The command is particularly useful for script debugging, customization of shell behavior, and working with systems that have both builtin and external versions of commands like `test`, `echo`, or `printf`.

## Basic Syntax

```bash
enable [-pnds] [-a] [-f filename] [name ...]
enable -n [name ...]
```

## Command Options

### Display Options
- `-a` - List all builtins with their enabled/disabled status
- `-p` - Print builtins in a format suitable for re-input
- `-s` - Restrict output to POSIX.2 'special' builtins only
- `-n` - Display a list of all disabled builtins

### Management Options
- `-n` - Disable the specified builtin(s)
- `-f filename` - Load new builtins from shared object FILENAME
- `-d` - Delete a builtin previously loaded with -f

### Target Arguments
- `name` - Name of the builtin to enable/disable

## Usage Examples

### Basic Operations

#### Listing Builtins
```bash
# List all enabled builtins
enable

# List all builtins with status
enable -a

# Print builtins in reusable format
enable -p

# List only POSIX special builtins
enable -s

# List disabled builtins
enable -n
```

#### Enabling and Disabling Builtins
```bash
# Disable the test builtin
enable -n test

# Re-enable the test builtin
enable test

# Disable multiple builtins
enable -n echo printf kill

# Enable multiple builtins
enable echo printf kill

# Check if builtin is enabled
enable test && echo "test is enabled" || echo "test is disabled"
```

### Command Resolution Management

#### Using External Commands Instead of Builtins
```bash
# Disable builtin to use external command
enable -n test
# Now 'test' will use the external /usr/bin/test

# Disable echo to use external echo
enable -n echo
# Now 'echo' will use /bin/echo

# Temporarily use external printf
enable -n printf
command printf "External printf\n"
enable printf  # Restore builtin

# Use specific version of command
enable -n cd
/bin/cd /tmp  # External cd (usually doesn't exist)
enable cd     # Restore builtin
```

#### Script Development and Debugging
```bash
#!/bin/bash
# Disable echo for debugging
enable -n echo
/bin/echo "This uses external echo"

# Enable all builtins for standard behavior
enable -a

# Disable specific builtin to test fallback
enable -n printf
if command -v printf >/dev/null 2>&1; then
    echo "External printf available"
else
    echo "No external printf found"
fi
enable printf
```

### Advanced Usage

#### Dynamic Builtin Loading
```bash
# Load builtin from shared object (if supported)
enable -f /usr/lib/bash/sleep sleep

# Load custom builtin
enable -f ./mybuiltins.so mycommand

# Remove dynamically loaded builtin
enable -d mycommand

# List available builtins after loading
enable -a | grep mycommand
```

#### Builtin Status Management
```bash
# Check status of specific builtin
if enable test >/dev/null 2>&1; then
    echo "test builtin is enabled"
else
    echo "test builtin is disabled"
fi

# Disable builtin temporarily in function
test_with_external() {
    local builtin_status
    builtin_status=$(enable test 2>/dev/null && echo "enabled" || echo "disabled")

    if [ "$builtin_status" = "enabled" ]; then
        enable -n test
        /usr/bin test "$@"  # Use external test
        enable test
    else
        /usr/bin/test "$@"
    fi
}

# Save and restore builtin state
save_builtin_state() {
    local builtin="$1"
    enable "$builtin" >/dev/null 2>&1 && echo "enable $builtin" || echo "enable -n $builtin"
}

restore_builtin_state() {
    local state="$1"
    eval "$state"
}
```

## Practical Examples

### System Administration

#### Shell Environment Management
```bash
#!/bin/bash
# Secure shell environment setup

# Disable potentially dangerous builtins for restricted shell
enable -n exec source
echo "Exec and source commands disabled for security"

# Create restricted environment
setup_restricted_shell() {
    # Disable builtins that can escape restrictions
    enable -n exec source command builtin
    echo "Restricted shell environment configured"
}

# Restore full shell functionality
restore_full_shell() {
    enable exec source command builtin
    echo "Full shell functionality restored"
}
```

#### Testing and Development
```bash
#!/bin/bash
# Test script with different builtin configurations

# Function to test behavior with and without builtins
test_builtin_behavior() {
    local cmd="$1"
    local builtin_path builtin_version external_version

    # Test with builtin
    if enable "$cmd" >/dev/null 2>&1; then
        builtin_version=$("$cmd" --version 2>/dev/null || echo "No version info")
        echo "Builtin $cmd: $builtin_version"
    fi

    # Test with external
    builtin_path=$(command -v "$cmd" 2>/dev/null)
    if [ -n "$builtin_path" ]; then
        external_version=$("$builtin_path" --version 2>/dev/null || echo "No version info")
        echo "External $cmd: $external_version"
    fi

    # Compare outputs
    if [ "$builtin_version" != "$external_version" ]; then
        echo "Difference detected between builtin and external $cmd"
    fi
}

# Test common commands
for cmd in test echo printf kill; do
    echo "Testing $cmd:"
    test_builtin_behavior "$cmd"
    echo "---"
done
```

### Development Workflow

#### Portable Script Development
```bash
#!/bin/bash
# Ensure consistent behavior across different systems

# Function to ensure external command usage
use_external() {
    local cmd="$1"
    shift

    # Temporarily disable builtin
    enable -n "$cmd" 2>/dev/null

    # Execute with external command
    "$cmd" "$@"
    local exit_code=$?

    # Restore builtin
    enable "$cmd" 2>/dev/null

    return $exit_code
}

# Example: Use external test for POSIX compliance
test_portable() {
    use_external test "$@"
}

# Example: Use external echo for specific behavior
echo_portable() {
    use_external echo "$@"
}
```

#### Shell Feature Testing
```bash
#!/bin/bash
# Test shell capabilities and builtin features

# Function to check if builtin exists
check_builtin_exists() {
    local builtin="$1"
    if enable -a | grep -q "enable $builtin"; then
        echo "Builtin $builtin exists"
        return 0
    else
        echo "Builtin $builtin does not exist"
        return 1
    fi
}

# Function to test builtin functionality
test_builtin_features() {
    local builtin="$1"

    echo "Testing $builtin builtin:"

    # Check if enabled
    if enable "$builtin" >/dev/null 2>&1; then
        echo "  ✓ $builtin is enabled"
    else
        echo "  ✗ $builtin is disabled"
    fi

    # Check if it's a POSIX special builtin
    if enable -s | grep -q "enable $builtin"; then
        echo "  ✓ $builtin is a POSIX special builtin"
    fi

    # Get help if available
    if help "$builtin" >/dev/null 2>&1; then
        echo "  ✓ Help available for $builtin"
    fi
}

# Test common builtins
for builtin in test echo printf kill cd read; do
    check_builtin_exists "$builtin" && test_builtin_features "$builtin"
    echo
done
```

### Script Debugging and Troubleshooting

#### Builtin Conflict Resolution
```bash
#!/bin/bash
# Resolve conflicts between builtins and external commands

# Function to detect and report builtin conflicts
detect_conflicts() {
    echo "Checking for builtin/external command conflicts:"

    for cmd in $(compgen -c | sort -u); do
        builtin_path=$(type -a "$cmd" 2>/dev/null)

        # Check if both builtin and external exist
        if echo "$builtin_path" | grep -q "is a shell builtin" && \
           echo "$builtin_path" | grep -q "/"; then
            echo "Conflict detected: $cmd"
            echo "  Builtin: $(type -t "$cmd")"
            echo "  External: $(command -v "$cmd")"
            echo "  Currently using: $(type "$cmd" | head -1)"
            echo
        fi
    done
}

# Function to create safe command aliases
safe_command() {
    local cmd="$1"
    shift

    # Ensure external command is used
    enable -n "$cmd" 2>/dev/null
    "$cmd" "$@"
    enable "$cmd" 2>/dev/null
}

# Usage example
safe_command test -f "/etc/passwd"
```

#### Debug Mode Setup
```bash
#!/bin/bash
# Enhanced debugging with builtin management

# Function to enable debug mode
enable_debug_mode() {
    echo "Enabling debug mode..."

    # Disable builtins that might mask issues
    enable -n echo printf test

    # Enable verbose output
    set -x

    # Load debugging builtins if available
    enable -f /usr/lib/bash/debug 2>/dev/null || echo "Debug builtins not available"
}

# Function to disable debug mode
disable_debug_mode() {
    echo "Disabling debug mode..."

    # Restore standard builtins
    enable echo printf test

    # Disable verbose output
    set +x

    # Unload debugging builtins
    enable -d debug 2>/dev/null
}

# Usage example
enable_debug_mode
echo "Debug mode test"
disable_debug_mode
```

## Advanced Usage

### Builtin State Management

#### Complex Builtin Configuration
```bash
#!/bin/bash
# Advanced builtin state management

# Class for managing builtin states
declare -A BUILTIN_STATES

# Save current state of all builtins
save_all_builtin_states() {
    while IFS= read -r line; do
        if [[ $line =~ ^enable ]]; then
            local builtin=$(echo "$line" | awk '{print $2}')
            BUILTIN_STATES["$builtin"]="$line"
        fi
    done < <(enable -p)
}

# Restore builtin states
restore_all_builtin_states() {
    for state in "${BUILTIN_STATES[@]}"; do
        eval "$state"
    done
}

# Create custom builtin profile
create_profile() {
    local profile_name="$1"
    shift

    case "$profile_name" in
        "secure")
            # Disable potentially dangerous builtins
            enable -n exec source builtin command
            ;;
        "posix")
            # Ensure only POSIX builtins are enabled
            local posix_builtins
            posix_builtins=$(enable -s | awk '{print $2}')
            for builtin in $(enable -a | awk '{print $2}' | grep -v '^enable$'); do
                if ! echo "$posix_builtins" | grep -q "^${builtin}$"; then
                    enable -n "$builtin"
                fi
            done
            ;;
        "full")
            # Enable all builtins
            enable -a
            ;;
        *)
            echo "Unknown profile: $profile_name"
            echo "Available profiles: secure, posix, full"
            return 1
            ;;
    esac
}

# Usage example
save_all_builtin_states
create_profile secure
echo "Secure profile active"
restore_all_builtin_states
echo "Original state restored"
```

### Cross-Shell Compatibility

#### Shell Detection and Adaptation
```bash
#!/bin/bash
# Make enable work across different shells

# Detect current shell
detect_shell() {
    if [ -n "$BASH_VERSION" ]; then
        echo "bash"
    elif [ -n "$ZSH_VERSION" ]; then
        echo "zsh"
    elif [ -n "$KSH_VERSION" ]; then
        echo "ksh"
    else
        echo "unknown"
    fi
}

# Adapt enable usage based on shell
safe_enable() {
    local shell=$(detect_shell)
    local args=("$@")

    case "$shell" in
        "bash")
            enable "${args[@]}"
            ;;
        "zsh")
            # Zsh may use different syntax for some operations
            enable "${args[@]}"
            ;;
        "ksh")
            # Ksh might have different builtin management
            echo "Ksh builtin management may differ"
            ;;
        *)
            echo "Unsupported shell for enable command"
            return 1
            ;;
    esac
}

# Test builtin availability across shells
test_builtin_cross_shell() {
    local builtin="$1"

    echo "Testing '$builtin' across shells:"

    # Test in current shell
    if enable -a | grep -q "enable $builtin"; then
        echo "  ✓ Available in $(detect_shell)"
    else
        echo "  ✗ Not available in $(detect_shell)"
    fi

    # Could test in other shells if available
    for shell_bin in /bin/bash /bin/zsh /bin/ksh; do
        if [ -x "$shell_bin" ]; then
            if "$shell_bin" -c "enable -a" 2>/dev/null | grep -q "enable $builtin"; then
                echo "  ✓ Available in $(basename "$shell_bin")"
            fi
        fi
    done
}
```

## Troubleshooting

### Common Issues

#### Builtin Not Found
```bash
# Error: enable: builtin not found
enable nonexistent

# Solution: Check available builtins first
enable -a | grep builtin

# Check if it's an external command
command -v nonexistent

# List all available commands
compgen -c | grep -i search_term
```

#### Permission Issues
```bash
# Error: Permission denied when loading builtins
enable -f /path/to/builtin.so

# Solution: Check file permissions and ownership
ls -la /path/to/builtin.so
sudo chown root:root /path/to/builtin.so
sudo chmod 644 /path/to/builtin.so

# Check if dynamic loading is supported
if [ -f /proc/version ]; then
    echo "Dynamic loading support: Check kernel and shell configuration"
fi
```

#### State Recovery
```bash
# Problem: Accidentally disabled important builtins
enable -n cd echo test

# Solution: Restore essential builtins
enable cd echo test

# Restore all builtins to default state
enable -a

# Or restart shell for clean state
exec bash  # Restart bash
```

#### Builtin Conflicts
```bash
# Problem: Command not working as expected
which test

# Solution: Check what's actually being used
type -a test

# Force use of external command
enable -n test
/usr/bin/test expression

# Or use command builtin to bypass builtins
command test expression
```

### Debugging Builtin Issues

#### Diagnostic Script
```bash
#!/bin/bash
# Comprehensive builtin diagnostic tool

# Function to check builtin health
check_builtin_health() {
    local builtin="$1"

    echo "=== Diagnostic for $builtin ==="

    # Check existence
    if enable -a | grep -q "enable $builtin"; then
        echo "✓ $builtin exists"
    else
        echo "✗ $builtin does not exist"
        return 1
    fi

    # Check current status
    if enable "$builtin" >/dev/null 2>&1; then
        echo "✓ $builtin is enabled"
    else
        echo "✗ $builtin is disabled"
    fi

    # Check if it's special
    if enable -s | grep -q "enable $builtin"; then
        echo "✓ $builtin is a POSIX special builtin"
    fi

    # Test functionality
    case "$builtin" in
        "test")
            "$builtin" -n "test" && echo "✓ $builtin functionality works"
            ;;
        "echo")
            "$builtin" "test" >/dev/null && echo "✓ $builtin functionality works"
            ;;
        *)
            echo "? Cannot test $builtin functionality automatically"
            ;;
    esac

    # Check for help
    if help "$builtin" >/dev/null 2>&1; then
        echo "✓ Help available for $builtin"
    fi

    echo
}

# Run diagnostic on all builtins
for builtin in $(enable -a | awk '{print $2}' | grep -v '^enable$'); do
    check_builtin_health "$builtin"
done
```

## Related Commands

- [`disable`](/docs/commands/system-info/disable) - Disable shell builtins
- [`builtin`](/docs/commands/system-info/builtin) - Execute shell builtins
- [`command`](/docs/commands/system-info/command) - Execute commands with special handling
- [`type`](/docs/commands/system-info/type) - Display command type information
- [`which`](/docs/commands/file-management/which) - Locate command in PATH
- [`help`](/docs/commands/system-info/help) - Display help for shell builtins
- [`export`](/docs/commands/system-info/export) - Set environment variables
- [`alias`](/docs/commands/system-info/alias) - Create command aliases
- [`unalias`](/docs/commands/system-info/unalias) - Remove command aliases
- [`hash`](/docs/commands/system-info/hash) - Remember command locations

## Best Practices

1. **Document builtin changes** - Keep track of when and why you modify builtin states
2. **Use functions for temporary changes** - Wrap builtin modifications in functions for cleanup
3. **Test in safe environments** - Test builtin modifications in isolated shells first
4. **Restore original state** - Always restore builtin state when finished
5. **Check for conflicts** - Verify builtin vs external command behavior differences
6. **Use command for explicit external calls** - Use `command builtin_name` for one-time external usage
7. **Avoid disabling essential builtins** - Keep critical builtins like `cd`, `test`, `echo` enabled
8. **Consider portability** - Remember that builtin availability varies between shells
9. **Use profiles for consistent environments** - Create predefined builtin configurations
10. **Test script behavior** - Verify scripts work correctly with different builtin states

## Performance Tips

1. **Builtins are faster** - Use builtins instead of external commands when possible
2. **Minimize state changes** - Avoid frequent enable/disable operations
3. **Batch operations** - Enable/disable multiple builtins at once
4. **Cache builtin states** - Store and reuse builtin configurations
5. **Use -p for scripting** - Use `enable -p` for programmatic state management
6. **Load builtins at startup** - Load frequently used dynamic builtins once
7. **Profile performance differences** - Measure builtin vs external command performance
8. **Consider memory usage** - Dynamic builtins consume shell memory
9. **Use POSIX builtins for compatibility** - Prefer POSIX special builtins for portability
10. **Clean up unused builtins** - Remove dynamically loaded builtins when no longer needed

The `enable` command provides powerful control over shell builtin behavior, enabling customized shell environments, conflict resolution, and enhanced debugging capabilities. Its ability to manage the distinction between builtins and external commands makes it an essential tool for advanced shell scripting, system administration, and shell customization.