---
title: source - Execute commands from file in the current shell
sidebar_label: source
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# source - Execute commands from file in the current shell

The `source` command (also known as `.`) is a built-in shell command that reads and executes commands from a file in the current shell environment. Unlike executing a script directly, which runs in a subshell, `source` modifies the current shell's environment, making it ideal for loading configuration files, setting environment variables, defining functions, and modifying shell state. This command is essential for managing shell sessions, loading environment configurations, and maintaining consistent development environments across different systems.

## Basic Syntax

```bash
source filename [arguments]
. filename [arguments]
```

## Common Options

### Shell Options
- `--help` - Display help information and exit
- `--version` - Show version information and exit

### Bash-specific Options (when using Bash)
- `-n` - Read commands but don't execute them (no-exec mode)
- `-v` - Verbose mode - print input lines as they are read
- `-x` - Debug mode - print commands and their arguments as they are executed

## Usage Examples

### Basic File Sourcing

#### Loading Configuration Files
```bash
# Load bash configuration
source ~/.bashrc

# Load profile configuration
source ~/.profile

# Load environment variables from file
source .env

# Load custom aliases and functions
source ~/.bash_aliases
```

#### Virtual Environment Activation
```bash
# Activate Python virtual environment
source venv/bin/activate
source /opt/python/venv/bin/activate

# Activate conda environment
source ~/miniconda3/etc/profile.d/conda.sh
conda activate myenv
```

#### Shell Script Development
```bash
# Source function library
source lib/functions.sh

# Source configuration in script
source config/config.sh

# Source common utilities
source utils/common.sh
```

### Environment Management

#### Development Environment Setup
```bash
# Load development environment
source dev/setup.sh

# Load API keys and secrets
source secrets/api_keys.env

# Load custom PATH modifications
source scripts/setup_path.sh

# Load module system (HPC environments)
source /etc/profile.d/modules.sh
module load python/3.9
```

#### Docker and Container Environments
```bash
# Source environment for containerized apps
source docker/env_vars.sh

# Load multi-environment configuration
source configs/production.env
source configs/development.env
```

### Shell Session Management

#### Interactive Shell Customization
```bash
# Source theme configuration
source ~/.bash_themes/dark.sh

# Load custom prompt settings
source ~/.bash_prompt

# Source completion scripts
source /etc/bash_completion
source ~/.git-completion.bash
```

#### Temporary Environment Changes
```bash
# Source test environment temporarily
source test/test_env.sh

# Load debugging configuration
source debug/debug_config.sh

# Source performance monitoring setup
source scripts/perf_monitor.sh
```

## Practical Examples

### System Administration

#### System Configuration Management
```bash
#!/bin/bash
# System initialization script

# Load system-wide environment
source /etc/environment

# Load service-specific configuration
source /etc/myapp/config.sh

# Set up logging
source scripts/logging.sh

# Initialize monitoring
source scripts/monitoring.sh
```

#### User Environment Setup
```bash
#!/bin/bash
# User environment setup script

# Create and source user-specific config
cat > ~/.myconfig << 'EOF'
export EDITOR=vim
export BROWSER=firefox
export TERM=xterm-256color
EOF

source ~/.myconfig

# Source application-specific configurations
source ~/.config/htop/htoprc 2>/dev/null || true
```

### Development Workflow

#### Project Environment Management
```bash
#!/bin/bash
# Development environment setup

# Source project configuration
if [ -f ".env" ]; then
    source .env
    echo "Environment variables loaded from .env"
fi

# Source development tools
source dev-tools/aliases.sh
source dev-tools/functions.sh

# Source build configuration
source config/build.conf

# Source testing environment
source test/test_setup.sh
```

#### Multi-language Development Setup
```bash
#!/bin/bash
# Multi-language development environment

# Node.js environment
source ~/.nvm/nvm.sh
nvm use 18

# Python environment
source ~/.pyenv/versions/3.9.7/bin/activate

# Ruby environment
source ~/.rvm/scripts/rvm
rvm use 3.0.0

# Go environment
source ~/.goenv/goenv.sh
goenv local 1.19
```

#### Database Environment Configuration
```bash
#!/bin/bash
# Database environment setup

# Source database credentials (for development)
source dev/db_credentials_dev.sh

# Source connection parameters
source config/database.conf

# Source utility functions for database operations
source utils/db_utils.sh

# Example usage of sourced functions
connect_database
run_migrations
```

### Application Deployment

#### Configuration-based Deployment
```bash
#!/bin/bash
# Application deployment script

# Source environment-specific configuration
case "$ENVIRONMENT" in
    "development")
        source config/dev.env
        ;;
    "staging")
        source config/staging.env
        ;;
    "production")
        source config/prod.env
        ;;
    *)
        echo "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac

# Source deployment utilities
source scripts/deploy_utils.sh

# Source application-specific functions
source lib/app_functions.sh

# Execute deployment
deploy_application
```

#### Service Management
```bash
#!/bin/bash
# Service management script

# Source service configuration
source /etc/myapp/service.conf

# Source logging functions
source lib/logging.sh

# Source health check functions
source lib/health_checks.sh

# Service operations
case "$1" in
    start)
        source scripts/start_service.sh
        ;;
    stop)
        source scripts/stop_service.sh
        ;;
    restart)
        source scripts/restart_service.sh
        ;;
    status)
        source scripts/status_check.sh
        ;;
esac
```

## Advanced Usage

### Conditional Sourcing

#### Safe Sourcing with Error Handling
```bash
#!/bin/bash
# Safe sourcing with error handling

# Function to safely source files
safe_source() {
    local file="$1"
    if [ -f "$file" ]; then
        source "$file"
        echo "Successfully sourced: $file"
    else
        echo "Warning: File not found: $file" >&2
        return 1
    fi
}

# Usage examples
safe_source ~/.bashrc
safe_source ~/.custom_config
safe_source "$ENVIRONMENT_FILE"
```

#### Environment-specific Configuration Loading
```bash
#!/bin/bash
# Environment-specific configuration loading

# Determine environment
ENVIRONMENT="${ENVIRONMENT:-development}"

# Source base configuration
safe_source config/base.conf

# Source environment-specific overrides
case "$ENVIRONMENT" in
    "development")
        safe_source config/development.conf
        ;;
    "testing")
        safe_source config/testing.conf
        ;;
    "production")
        safe_source config/production.conf
        ;;
esac

# Source local overrides (if they exist)
safe_source config/local.conf
```

### Function and Library Management

#### Creating Function Libraries
```bash
#!/bin/bash
# utils/string_utils.sh - String manipulation functions

# Function to convert to uppercase
to_upper() {
    echo "$1" | tr '[:lower:]' '[:upper:]'
}

# Function to convert to lowercase
to_lower() {
    echo "$1" | tr '[:upper:]' '[:lower:]'
}

# Function to trim whitespace
trim() {
    echo "$1" | xargs
}

# Function to check if string contains substring
contains() {
    [[ "$1" == *"$2"* ]]
}

# Export functions if requested
if [ "$1" = "--export" ]; then
    export -f to_upper to_lower trim contains
fi
```

```bash
#!/bin/bash
# Usage of string utilities library

# Source the library
source utils/string_utils.sh --export

# Use the functions
NAME="john doe"
UPPER_NAME=$(to_upper "$NAME")
echo "Uppercase: $UPPER_NAME"

if contains "$NAME" "john"; then
    echo "String contains 'john'"
fi
```

#### Modular Script Architecture
```bash
#!/bin/bash
# Main application script

# Source core modules
source lib/core/config.sh
source lib/core/logging.sh
source lib/core/validation.sh

# Source feature modules
source modules/auth/auth.sh
source modules/database/database.sh
source modules/api/api.sh

# Source utilities
source utils/string_utils.sh
source utils/file_utils.sh
source utils/network_utils.sh

# Initialize application
initialize_app
```

### Dynamic Configuration

#### Runtime Configuration Loading
```bash
#!/bin/bash
# Dynamic configuration loader

# Function to load configuration from multiple sources
load_configuration() {
    local config_dir="$1"

    # Load all .conf files in order
    for file in "$config_dir"/*.conf; do
        if [ -f "$file" ]; then
            echo "Loading: $file"
            source "$file"
        fi
    done

    # Load environment-specific config
    local env_file="$config_dir/${ENVIRONMENT}.conf"
    if [ -f "$env_file" ]; then
        echo "Loading environment config: $env_file"
        source "$env_file"
    fi

    # Load user-specific overrides
    local user_file="$config_dir/user_${USER}.conf"
    if [ -f "$user_file" ]; then
        echo "Loading user config: $user_file"
        source "$user_file"
    fi
}

# Usage
load_configuration /etc/myapp/config
```

#### Configuration Validation
```bash
#!/bin/bash
# Configuration validation after sourcing

validate_configuration() {
    local errors=0

    # Check required variables
    local required_vars=("APP_NAME" "DATABASE_URL" "LOG_LEVEL")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            echo "Error: Required variable $var is not set" >&2
            ((errors++))
        fi
    done

    # Validate configuration values
    if [ -n "$LOG_LEVEL" ]; then
        case "$LOG_LEVEL" in
            DEBUG|INFO|WARN|ERROR)
                ;;
            *)
                echo "Error: Invalid LOG_LEVEL: $LOG_LEVEL" >&2
                ((errors++))
                ;;
        esac
    fi

    return $errors
}

# Source configuration and validate
source config/app.conf
if validate_configuration; then
    echo "Configuration is valid"
else
    echo "Configuration validation failed" >&2
    exit 1
fi
```

## Integration and Automation

### Shell Integration

#### Custom Shell Startup
```bash
#!/bin/bash
# ~/.bash_profile - Custom shell startup

# Source global profiles
if [ -f /etc/profile ]; then
    source /etc/profile
fi

# Source bash completion
if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    source /etc/bash_completion
fi

# Source custom configurations
for file in ~/.bashrc.d/*.sh; do
    if [ -r "$file" ]; then
        source "$file"
    fi
done

# Source local customizations
if [ -f ~/.bash_local ]; then
    source ~/.bash_local
fi
```

#### Intelligent Prompt System
```bash
#!/bin/bash
# ~/.bash_prompt - Intelligent prompt system

# Source prompt configuration
source ~/.prompt_config

# Source git integration if available
if command -v git >/dev/null 2>&1; then
    source ~/.git_prompt
fi

# Source prompt themes
case "$PROMPT_THEME" in
    "simple")
        source prompts/simple.sh
        ;;
    "advanced")
        source prompts/advanced.sh
        ;;
    "minimal")
        source prompts/minimal.sh
        ;;
    *)
        source prompts/default.sh
        ;;
esac

# Initialize prompt
setup_prompt
```

### Development Environment Automation

#### IDE Integration Scripts
```bash
#!/bin/bash
# IDE environment setup

# Source VS Code integration
if [ "$EDITOR" = "code" ]; then
    source ide/vscode/setup.sh
fi

# Source Vim configuration
if [ "$EDITOR" = "vim" ]; then
    source ide/vim/setup.sh
fi

# Source language server configurations
source ide/languageservers/setup.sh
```

#### Container Development Setup
```bash
#!/bin/bash
# Container development environment

# Source Docker configuration
source docker/docker_env.sh

# Source Kubernetes configuration
source kubernetes/k8s_env.sh

# Source development container utilities
source containers/dev_utils.sh

# Initialize development containers
setup_dev_containers
```

## Troubleshooting

### Common Issues

#### File Not Found Errors
```bash
# Check if file exists before sourcing
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "Configuration file not found: $CONFIG_FILE" >&2
    exit 1
fi

# Use alternative configuration files
CONFIG_FILES=("$HOME/.config/app.conf" "/etc/app/config" "./config/default.conf")
for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        source "$file"
        break
    fi
done
```

#### Permission Issues
```bash
# Check file permissions before sourcing
if [ ! -r "$CONFIG_FILE" ]; then
    echo "Cannot read configuration file: $CONFIG_FILE" >&2
    echo "Checking permissions:" >&2
    ls -la "$CONFIG_FILE" >&2
    exit 1
fi

source "$CONFIG_FILE"
```

#### Environment Variable Conflicts
```bash
#!/bin/bash
# Safe environment variable setting

# Function to set environment variable safely
safe_set_env() {
    local var_name="$1"
    local var_value="$2"

    if [ -z "${!var_name}" ]; then
        export "$var_name"="$var_value"
    else
        echo "Warning: $var_name already set, not overriding" >&2
    fi
}

# Source configuration with safe variable setting
source config/with_safe_exports.sh
```

#### Syntax Errors in Sourced Files
```bash
#!/bin/bash
# Syntax validation before sourcing

validate_shell_script() {
    local script_file="$1"

    if ! bash -n "$script_file" 2>/dev/null; then
        echo "Syntax error in $script_file:" >&2
        bash -n "$script_file"
        return 1
    fi

    return 0
}

# Validate and source
if validate_shell_script "$CONFIG_FILE"; then
    source "$CONFIG_FILE"
else
    echo "Cannot source file with syntax errors" >&2
    exit 1
fi
```

### Debugging Sourced Files

#### Tracing Sourced Files
```bash
#!/bin/bash
# Debug mode for sourcing

# Enable debugging
set -x  # Show commands as they execute
set -v  # Show shell input lines

# Source file with debugging
source debug_config.sh

# Disable debugging
set +x
set +v
```

#### Verbose Sourcing
```bash
#!/bin/bash
# Verbose sourcing with line numbers

verbose_source() {
    local file="$1"
    local line_number=0

    while IFS= read -r line; do
        ((line_number++))
        echo "Line $line_number: $line"
        eval "$line"
    done < "$file"
}

# Usage
verbose_source config.sh
```

## Related Commands

- [`bash`](/docs/commands/shells/bash) - GNU Bourne-Again SHell
- [`sh`](/docs/commands/shells/sh) - Bourne Shell
- [`export`](/docs/commands/system-info/export) - Set environment variables
- [`env`](/docs/commands/other/env) - Environment variables
- [`exec`](/docs/commands/system-info/exec) - Execute commands in current shell
- [`eval`](/docs/commands/system-info/eval) - Evaluate and execute commands
- [`alias`](/docs/commands/system-info/alias) - Create command aliases
- [`unset`](/docs/commands/system-info/unset) - Remove variables or functions
- [`type`](/docs/commands/file-management/type) - Display command type information

## Best Practices

1. **Always check file existence** before sourcing to avoid errors
2. **Use absolute paths** when sourcing important configuration files
3. **Validate configuration** after sourcing critical files
4. **Organize configuration files** in a logical hierarchy
5. **Document dependencies** between configuration files
6. **Use conditional sourcing** for optional configurations
7. **Implement error handling** for missing or invalid files
8. **Keep configuration files** readable and maintainable
9. **Version control configuration files** where appropriate
10. **Test configuration changes** in a safe environment before production

## Performance Tips

1. **Minimize recursive sourcing** to avoid infinite loops
2. **Cache expensive operations** in sourced files
3. **Use lazy loading** for heavy configuration modules
4. **Avoid excessive variable exports** - only export what's needed
5. **Optimize PATH modifications** - avoid duplicates
6. **Profile sourced scripts** to identify performance bottlenecks
7. **Use shell built-ins** instead of external commands when possible
8. **Implement caching mechanisms** for frequently accessed data
9. **Source files only when needed** based on conditions
10. **Consider using compiled alternatives** for performance-critical setups

The `source` command is a fundamental tool for shell environment management and configuration. Its ability to modify the current shell environment makes it indispensable for creating flexible, maintainable, and portable shell configurations across different systems and environments.

**Key Features:**
- Modifies current shell environment (no subshell)
- Preserves variables, functions, and aliases
- Essential for configuration management
- Supports both `source` and `.` syntax
- Integrates seamlessly with shell scripting
- Enables modular code organization
- Provides dynamic configuration capabilities