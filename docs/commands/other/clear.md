---
title: clear - Clear Terminal Screen
sidebar_label: clear
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# clear - Clear Terminal Screen

The `clear` command is a fundamental terminal utility that clears the terminal screen and moves the cursor to the top-left corner. It uses terminal control sequences to clear all visible content and provides a clean workspace for continued work. The command is essential for maintaining terminal readability, organizing command output, and creating a clean interface for users. `clear` works with virtually all terminal emulators and supports various options for different clearing behaviors and environments.

## Basic Syntax

```bash
clear [OPTIONS]
```

## Common Options

### Standard Options
- `-h, --help` - Display help information and exit
- `-V, --version` - Display version information and exit
- `-x` - Do not try to clear scrollback buffer (GNU extension)

### Terminal Behavior Options
- `-T, --type=TYPE` - Specify terminal type
- `-w, --whole-screen` - Clear entire screen including scrollback

## Terminal Capabilities

The `clear` command utilizes terminal capabilities through the `terminfo` database:

### Control Sequences Used
- **Clear Screen**: `\033[H\033[2J` - Move cursor home and clear entire screen
- **Clear to End**: `\033[J` - Clear from cursor to end of screen
- **Scrollback Control**: Terminal-specific sequences for scrollback buffer

### Terminal Types Supported
- **xterm**: Standard X terminal emulator
- **vt100**: Digital Equipment Corporation terminal
- **linux**: Linux console terminal
- **ansi**: ANSI standard terminal
- **screen**: GNU screen terminal multiplexer
- **tmux**: Terminal multiplexer session

## Usage Examples

### Basic Operations

#### Standard Screen Clearing
```bash
# Basic clear - most common usage
clear

# Clear without affecting scrollback buffer
clear -x

# Clear entire screen including scrollback (GNU clear)
clear -w
```

#### Terminal Type Specific Operations
```bash
# Specify terminal type explicitly
clear -T xterm
clear -T vt100
clear -T linux

# Use environment variable for terminal type
TERM=screen clear

# Force specific terminal behavior
TERM=xterm-256color clear
```

### Script Integration

#### Shell Script Examples
```bash
#!/bin/bash
# Automated terminal management script

# Function to clear screen with confirmation
clear_screen() {
    echo "Press Enter to clear screen or Ctrl+C to cancel"
    read -r
    clear
    echo "Screen cleared successfully"
}

# Function for conditional clearing
clear_if_needed() {
    if [ "$1" = "--force" ]; then
        clear
    else
        read -p "Clear screen? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            clear
        fi
    fi
}

# Function for periodic clearing
periodic_clear() {
    local interval=${1:-300}  # Default 5 minutes
    while true; do
        sleep "$interval"
        clear
        echo "Auto-cleared at $(date)"
    done
}

# Main script execution
case "$1" in
    "--interactive")
        clear_screen
        ;;
    "--conditional")
        clear_if_needed
        ;;
    "--auto")
        periodic_clear "$2"
        ;;
    *)
        echo "Usage: $0 {--interactive|--conditional|--auto [interval]}"
        ;;
esac
```

#### Menu System with Clear
```bash
#!/bin/bash
# Interactive menu with screen clearing

show_menu() {
    clear
    echo "==================================="
    echo "        SYSTEM MANAGEMENT MENU"
    echo "==================================="
    echo "1. System Information"
    echo "2. Disk Usage"
    echo "3. Memory Status"
    echo "4. Network Status"
    echo "5. Running Processes"
    echo "0. Exit"
    echo "==================================="
    echo -n "Enter your choice [0-5]: "
}

while true; do
    show_menu
    read -r choice

    case $choice in
        1)
            clear
            echo "--- System Information ---"
            uname -a
            uptime
            echo ""
            read -p "Press Enter to continue..." -r
            ;;
        2)
            clear
            echo "--- Disk Usage ---"
            df -h
            echo ""
            read -p "Press Enter to continue..." -r
            ;;
        3)
            clear
            echo "--- Memory Status ---"
            free -h
            echo ""
            read -p "Press Enter to continue..." -r
            ;;
        4)
            clear
            echo "--- Network Status ---"
            ip addr show
            echo ""
            read -p "Press Enter to continue..." -r
            ;;
        5)
            clear
            echo "--- Running Processes ---"
            ps aux --sort=-%cpu | head -20
            echo ""
            read -p "Press Enter to continue..." -r
            ;;
        0)
            clear
            echo "Exiting menu..."
            exit 0
            ;;
        *)
            clear
            echo "Invalid option. Please try again."
            sleep 2
            ;;
    esac
done
```

### Advanced Terminal Management

#### Multi-Session Terminal Control
```bash
# Clear specific terminal session
tty=$(tty)
echo "Current terminal: $tty"
clear

# Clear all accessible terminals
for term in /dev/tty*; do
    if [ -w "$term" ]; then
        echo "Clearing $term"
        clear > "$term" 2>/dev/null
    fi
done

# Clear remote sessions via SSH
clear_remote_session() {
    local host=$1
    ssh "$host" 'clear; echo "Remote terminal cleared"'
}
```

#### Terminal Reset Functions
```bash
# Advanced terminal reset function
reset_terminal() {
    # Full terminal reset
    tput reset

    # Alternative method using stty
    stty sane

    # Clear and reset cursor position
    clear
    tput cup 0 0

    # Reset terminal colors
    echo -e "\033[0m"

    echo "Terminal fully reset"
}

# Soft reset (preserves scrollback)
soft_reset() {
    tput rmcup 2>/dev/null || clear -x
    tput cnorm
    echo "Terminal soft reset complete"
}
```

## Practical Applications

### System Administration

#### Monitoring Dashboard
```bash
#!/bin/bash
# System monitoring dashboard with auto-clear

dashboard() {
    local interval=${1:-5}

    while true; do
        clear
        echo "================================="
        echo "   SYSTEM MONITORING DASHBOARD   "
        echo "================================="
        echo "Time: $(date)"
        echo ""

        echo "--- System Load ---"
        uptime
        echo ""

        echo "--- Memory Usage ---"
        free -h
        echo ""

        echo "--- CPU Usage ---"
        top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1
        echo ""

        echo "--- Disk Usage ---"
        df -h | grep -E '^/dev/'
        echo ""

        echo "--- Network Connections ---"
        netstat -an | grep ESTABLISHED | wc -l
        echo "Active connections: $(netstat -an | grep ESTABLISHED | wc -l)"
        echo ""

        echo "Updating every $interval seconds. Press Ctrl+C to exit."

        sleep "$interval"
    done
}

dashboard 10
```

#### Log Viewer with Clear
```bash
#!/bin/bash
# Enhanced log viewer with screen clearing

view_log() {
    local log_file=$1
    local lines=${2:-50}

    if [ ! -f "$log_file" ]; then
        echo "Error: Log file $log_file not found"
        return 1
    fi

    while true; do
        clear
        echo "======================================"
        echo "     LOG VIEWER: $log_file"
        echo "======================================"
        echo "Last update: $(date)"
        echo ""

        tail -n "$lines" "$log_file"
        echo ""
        echo "Press 'q' to quit, 'r' to refresh, 'f' to follow mode"

        read -n 1 -t 1 key
        case $key in
            q)
                clear
                echo "Exiting log viewer..."
                break
                ;;
            r)
                continue
                ;;
            f)
                clear
                echo "Following $log_file (Press Ctrl+C to stop)"
                tail -f "$log_file"
                ;;
        esac
    done
}
```

### Development Workflow

#### Build System Integration
```bash
#!/bin/bash
# Build script with clear terminal output

build_project() {
    local project_name=$1

    clear
    echo "===================================="
    echo "    BUILDING: $project_name"
    echo "===================================="
    echo "Build started at: $(date)"
    echo ""

    # Clean previous build
    echo "--- Cleaning previous build ---"
    make clean 2>&1 | tee build.log
    echo ""

    # Compile project
    echo "--- Compiling project ---"
    if make 2>&1 | tee -a build.log; then
        echo ""
        echo "✅ Build completed successfully!"
        echo "Build log saved to: build.log"
    else
        echo ""
        echo "❌ Build failed. Check build.log for details."
        echo "Last 10 errors:"
        tail -10 build.log | grep -i error
    fi

    echo ""
    echo "Build completed at: $(date)"

    read -p "Press Enter to continue..." -r
}

# Usage
build_project "my_application"
```

#### Testing Framework with Clear
```bash
#!/bin/bash
# Test runner with clean output display

run_tests() {
    local test_pattern=${1:-"*test*"}
    local failed_tests=0
    local total_tests=0

    clear
    echo "==================================="
    echo "      RUNNING TEST SUITE"
    echo "==================================="
    echo "Test started at: $(date)"
    echo ""

    # Find and run test files
    for test_file in $test_pattern; do
        if [ -f "$test_file" ]; then
            echo "--- Running: $test_file ---"
            ((total_tests++))

            if ./"$test_file" 2>&1; then
                echo "✅ PASSED: $test_file"
            else
                echo "❌ FAILED: $test_file"
                ((failed_tests++))
            fi
            echo ""
        fi
    done

    # Summary
    echo "==================================="
    echo "         TEST SUMMARY"
    echo "==================================="
    echo "Total tests: $total_tests"
    echo "Passed: $((total_tests - failed_tests))"
    echo "Failed: $failed_tests"
    echo ""

    if [ $failed_tests -eq 0 ]; then
        echo "🎉 All tests passed!"
    else
        echo "⚠️  $failed_tests test(s) failed"
    fi

    echo "Test completed at: $(date)"
}

run_tests "*_test.rb"
```

### Terminal Session Management

#### Session Cleaner
```bash
#!/bin/bash
# Terminal session cleanup utility

cleanup_session() {
    local preserve_history=${1:-true}

    echo "Cleaning terminal session..."

    # Clear screen
    clear

    # Clear command history if requested
    if [ "$preserve_history" != "true" ]; then
        history -c
        echo "Command history cleared"
    fi

    # Reset terminal state
    tput reset 2>/dev/null

    # Clear any background jobs
    jobs

    # Show session summary
    echo "======================================"
    echo "     SESSION CLEANUP COMPLETE"
    echo "======================================"
    echo "Time: $(date)"
    echo "Terminal: $TERM"
    echo "Shell: $SHELL"
    echo "User: $USER"
    echo "Host: $HOSTNAME"
    echo ""

    if [ "$preserve_history" = "true" ]; then
        echo "✅ History preserved"
    else
        echo "🗑️  History cleared"
    fi

    echo "✅ Terminal cleared"
    echo "✅ Session reset complete"

    echo ""
    echo "Ready for new session!"
}

cleanup_session true
```

## Advanced Usage

### Terminal Control Sequences

#### Manual Screen Control
```bash
# Direct terminal control without clear command
echo -e "\033[H\033[2J"  # Move cursor home and clear screen

# Clear to end of line
echo -e "\033[K"

# Clear from cursor to beginning of line
echo -e "\033[1K"

# Clear entire line
echo -e "\033[2K"

# Clear from cursor to end of screen
echo -e "\033[J"

# Clear from cursor to beginning of screen
echo -e "\033[1J"
```

#### Advanced Terminal Operations
```bash
# Save and restore cursor position
tput sc  # Save cursor
echo "Some content here"
tput rc  # Restore cursor

# Show/hide cursor
tput civis  # Hide cursor
tput cnorm  # Show cursor

# Move cursor to specific position
tput cup 10 20  # Row 10, column 20

# Clear specific regions
tput ed  # Clear to end of screen
tput el  # Clear to end of line
```

### Cross-Platform Compatibility

#### Platform-Specific Clear Commands
```bash
# Cross-platform clear function
platform_clear() {
    case "$(uname)" in
        "Linux")
            # Use GNU clear with extensions
            command clear -x 2>/dev/null || command clear
            ;;
        "Darwin")
            # macOS/BSD clear
            command clear
            ;;
        "CYGWIN"*|"MINGW"*)
            # Windows environments
            cmd /c cls 2>/dev/null || clear
            ;;
        *)
            # Fallback method
            echo -e "\033[H\033[2J"
            ;;
    esac
}

# Safe clear with error handling
safe_clear() {
    if command -v clear >/dev/null 2>&1; then
        clear 2>/dev/null || echo -e "\033[H\033[2J"
    else
        # Fallback for systems without clear
        printf "\033[H\033[2J"
    fi
}
```

#### Terminal Detection and Adaptation
```bash
# Intelligent terminal clearing
smart_clear() {
    local terminal_type=$TERM
    local force_clear=${1:-false}

    # Check if we're in a multiplexer
    if [[ "$terminal_type" =~ screen|tmux ]]; then
        if [ "$force_clear" = "true" ]; then
            # Clear entire terminal window
            printf "\033[H\033[2J"
        else
            # Multiplexer-safe clear
            clear
        fi
    else
        # Standard terminal clear
        clear
    fi

    # Reset terminal attributes
    printf "\033[0m"

    # Show cursor if hidden
    printf "\033[?25h"
}
```

## Integration and Automation

### Shell Aliases and Functions

#### Enhanced Clear Functions
```bash
# Add to ~/.bashrc or ~/.zshrc

# Enhanced clear with confirmation
alias cls='clear && echo "Screen cleared"'

# Clear with timestamp
alias clst='clear && echo "Cleared at: $(date)"'

# Clear with current directory info
alias clsp='clear && echo "Current directory: $(pwd)" && ls -la'

# Smart clear function
smart_clear_func() {
    if [ -n "$TMUX" ]; then
        tmux clear-history
        clear
    else
        clear
    fi
}

# Clear with system info
clear_info() {
    clear
    echo "======================================"
    echo "Terminal cleared at: $(date)"
    echo "User: $USER"
    echo "Host: $HOSTNAME"
    echo "Shell: $SHELL"
    echo "Directory: $(pwd)"
    echo "======================================"
}
```

### Environment-Specific Clearing

#### Development Environment
```bash
# Development workspace cleaner
dev_clear() {
    clear
    echo "====================================="
    echo "    DEVELOPMENT WORKSPACE CLEARED"
    echo "====================================="
    echo "Project: $(basename "$PWD")"
    echo "Branch: $(git branch --show-current 2>/dev/null || echo 'Not a git repo')"
    echo "Python venv: ${VIRTUAL_ENV:-'None'}"
    echo "Node version: $(node --version 2>/dev/null || echo 'Not installed')"
    echo "====================================="
}
```

#### Production Environment
```bash
# Production server clear with safety
prod_clear() {
    echo "⚠️  Production environment detected!"
    read -p "Clear terminal? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        clear
        echo "✅ Terminal cleared"
        echo "⚠️  Remember: Production environment"
        echo "Time: $(date)"
        echo "User: $USER"
        echo "Current sessions: $(who | wc -l)"
    else
        echo "❌ Clear cancelled"
    fi
}
```

## Troubleshooting

### Common Issues

#### Terminal Not Clearing
```bash
# Debug terminal clearing issues
debug_clear() {
    echo "Terminal debugging information:"
    echo "TERM: $TERM"
    echo "Terminal supports clear: $(command -v clear >/dev/null && echo 'Yes' || echo 'No')"
    echo "Terminfo entry: $(infocmp "$TERM" >/dev/null 2>&1 && echo 'Available' || echo 'Missing')"

    # Test alternative clear methods
    echo ""
    echo "Testing alternative clear methods..."

    echo -e "\033[H\033[2J"
    echo "Control sequence method: ✓"

    sleep 2

    if command -v tput >/dev/null 2>&1; then
        tput reset
        echo "tput method: ✓"
    else
        echo "tput method: ✗ (not available)"
    fi
}
```

#### Restore Terminal State
```bash
# Restore corrupted terminal state
restore_terminal() {
    echo "Restoring terminal state..."

    # Reset terminal
    tput reset 2>/dev/null

    # Restore sane settings
    stty sane 2>/dev/null

    # Clear any weird characters
    clear

    # Reset colors and attributes
    printf "\033[0m"

    # Ensure cursor is visible
    printf "\033[?25h"

    echo "Terminal state restored"
}
```

## Related Commands

- [`tput`](/docs/commands/system-info/tput) - Terminal capability utility
- [`reset`](/docs/commands/other/reset) - Reset terminal to initial state
- [`stty`](/docs/commands/system-info/stty) - Change terminal settings
- [`tty`](/docs/commands/system-info/tty) - Display terminal name
- [`echo`](/docs/commands/file-management/echo) - Display messages
- [`printf`](/docs/commands/system-info/printf) - Format and print data
- [`script`](/docs/commands/other/script) - Record terminal session
- [`screen`](/docs/commands/process-management/screen) - Terminal multiplexer
- [`tmux`](/docs/commands/process-management/tmux) - Terminal multiplexer

## Best Practices

1. **Use `clear` before showing important information** to avoid confusion
2. **Combine `clear` with descriptive headers** for better user experience
3. **Consider preserving scrollback buffer** when using `clear` in scripts
4. **Use alternative methods** when `clear` is not available
5. **Test terminal compatibility** before deploying to production
6. **Add user confirmation** before clearing in interactive scripts
7. **Use appropriate clear methods** for different terminal types
8. **Handle errors gracefully** when clearing operations fail
9. **Combine with status information** for better session management
10. **Consider user experience** when automating screen clearing

## Performance Tips

1. **`clear` is extremely lightweight** - almost no performance impact
2. **Control sequences are faster** than calling external commands
3. **Avoid excessive clearing** in rapidly updating displays
4. **Use `-x` flag** when you need to preserve scrollback
5. **Terminal multiplexers** may have their own clear methods
6. **Batch operations** instead of frequent clearing
7. **Consider user preferences** for automatic clearing
8. **Test performance** in terminal-heavy applications
9. **Use appropriate clearing methods** for your use case
10. **Monitor terminal responsiveness** in automated systems

The `clear` command is a simple yet essential utility for maintaining terminal readability and organization. While basic on the surface, it offers various options and integration possibilities that make it valuable for everything from simple screen clearing to complex automated terminal management systems. Understanding its capabilities and proper usage patterns helps create better terminal-based applications and user experiences.