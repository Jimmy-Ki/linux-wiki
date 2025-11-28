---
title: declare - Declare shell variables
sidebar_label: declare
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# declare - Declare shell variables

The `declare` command is a built-in shell command that declares shell variables, sets their attributes, and displays variable definitions. It provides powerful variable management capabilities in Bash, allowing you to define variables with specific types, set them as read-only, export them to child processes, and create arrays. The `declare` command is essential for advanced shell scripting, providing type safety, scope control, and variable attribute management for robust script development.

## Basic Syntax

```bash
declare [-aAfFgilnrtux] [-p] [name[=value] ...]
```

## Common Options

### Variable Attributes
- `-a` - Declare variables as indexed arrays
- `-A` - Declare variables as associative arrays (key-value pairs)
- `-i` - Declare variables as integers
- `-r` - Declare variables as readonly (cannot be modified)
- `-x` - Export variables to child processes (same as `export`)
- `-l` - Convert variable values to lowercase on assignment
- `-u` - Convert variable values to uppercase on assignment

### Display Options
- `-p` - Display attributes and values of variables
- `-f` - Display function names and definitions
- `-F` - Display function names only (no body)

### Advanced Options
- `-g` - Create global variables (even in functions)
- `-n` - Create nameref variables (references to other variables)
- `-t` - Set trace attribute for variables

## Usage Examples

### Basic Variable Declaration

#### Simple Variables
```bash
# Declare a basic variable
declare myvar="Hello World"

# Declare multiple variables
declare var1="value1" var2="value2" var3="value3"

# Display variable attributes
declare -p myvar

# Display all variables with attributes
declare -p

# Display all variable names
declare
```

#### Integer Variables
```bash
# Declare integer variable
declare -i count=10
declare -i total=0

# Arithmetic operations automatically evaluated
count=15
total=count+25

echo $total  # Output: 40

# Increment operations
((count++))
((total+=10))

echo $count  # Output: 16
echo $total  # Output: 50

# Reset to integer if accidentally assigned string
declare -i num=42
num="invalid"  # Becomes 0
echo $num      # Output: 0
```

#### Read-Only Variables
```bash
# Declare constant
declare -r PI=3.14159
declare -r CONFIG_PATH="/etc/myapp"

# Attempting to modify causes error
PI=3.14  # Error: readonly variable

# Useful for configuration constants
declare -r MAX_RETRIES=3
declare -r DEFAULT_PORT=8080

# Combine with other attributes
declare -ri MAX_CONNECTIONS=100  # Readonly integer
```

#### Case Conversion
```bash
# Lowercase conversion
declare -l name="JOHN DOE"
echo $name  # Output: john doe

name="ALICE SMITH"
echo $name  # Output: alice smith

# Uppercase conversion
declare -u command="start"
echo $command  # Output: START

command="restart"
echo $command  # Output: RESTART

# Useful for normalized input
declare -l user_input
read -p "Enter (y/n): " user_input
if [[ $user_input == "y" ]]; then
    echo "You answered yes"
fi
```

### Array Declaration

#### Indexed Arrays
```bash
# Declare indexed array
declare -a fruits=("apple" "banana" "orange")

# Access elements
echo ${fruits[0]}  # Output: apple
echo ${fruits[1]}  # Output: banana

# Add elements
fruits[3]="grape"
fruits+=( "mango" "pineapple" )  # Append multiple

# Display all elements
echo ${fruits[@]}  # All elements as separate words
echo ${fruits[*]}  # All elements as single string

# Display array length
echo ${#fruits[@]}

# Display with indices
declare -p fruits
```

#### Associative Arrays
```bash
# Declare associative array (requires Bash 4.0+)
declare -A user_info=(
    ["name"]="John Doe"
    ["email"]="john@example.com"
    ["age"]=30
)

# Access elements
echo ${user_info[name]}     # Output: John Doe
echo ${user_info[email]}    # Output: john@example.com

# Add/modify elements
user_info[city]="New York"
user_info[age]=31

# Display all keys
echo ${!user_info[@]}

# Display all values
echo ${user_info[@]}

# Display entire array
declare -p user_info

# Useful for configuration maps
declare -A config=(
    ["db_host"]="localhost"
    ["db_port"]="5432"
    ["db_name"]="myapp"
    ["debug"]="true"
)
```

### Exported Variables

#### Environment Variables
```bash
# Export variable to child processes
declare -x APP_ENV="production"
declare -x DB_PASSWORD="secret123"

# Equivalent to export command
export APP_ENV="production"

# Export existing variable
PATH=$PATH:/usr/local/bin
declare -x PATH

# Display exported variables
declare -x
export -p

# Export arrays (limited support)
declare -a dirs=("bin" "lib" "share")
export dirs
```

#### Function Definitions
```bash
# Display all functions
declare -f

# Display specific function
declare -f my_function

# Display only function names
declare -F

# Check if function exists
if declare -f my_function > /dev/null; then
    echo "Function exists"
fi
```

### Advanced Variable Features

#### Nameref Variables (Bash 4.3+)
```bash
# Create reference to another variable
original="Hello World"
declare -n ref=original

echo $ref  # Output: Hello World

# Modify through reference
ref="Modified through reference"
echo $original  # Output: Modified through reference

# Reference to array elements
declare -a array=("one" "two" "three")
declare -n elem_ref=array[1]
echo $elem_ref  # Output: two

# Useful for function parameters
process_var() {
    local -n var_ref=$1
    echo "Processing: $var_ref"
    var_ref="Processed: $var_ref"
}

mydata="original"
process_var mydata
echo $mydata  # Output: Processed: original
```

#### Global Variables in Functions
```bash
# Create global variable from within function
set_config() {
    declare -g CONFIG_FILE="/etc/myapp.conf"
    declare -g -r APP_VERSION="1.0.0"
}

set_config
echo $CONFIG_FILE  # Output: /etc/myapp.conf

# Compare with local variable
test_scope() {
    local local_var="local"
    declare -g global_var="global"
    echo "Local: $local_var"
    echo "Global: $global_var"
}

test_scope
echo $local_var    # Empty (not accessible)
echo $global_var   # Output: global
```

## Practical Examples

### Shell Scripting

#### Configuration Management
```bash
#!/bin/bash
# Advanced configuration management with declare

# Configuration constants
declare -r SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
declare -r CONFIG_FILE="$SCRIPT_DIR/config.conf"
declare -r LOG_FILE="$SCRIPT_DIR/app.log"
declare -r -i DEFAULT_TIMEOUT=30
declare -r -i MAX_RETRIES=3

# Configuration variables
declare -A app_config=(
    ["server"]="localhost"
    ["port"]="8080"
    ["debug"]="false"
    ["log_level"]="INFO"
)

# Parse configuration file
parse_config() {
    declare -g -A parsed_config

    while IFS='=' read -r key value; do
        [[ $key =~ ^#.*$ ]] && continue  # Skip comments
        [[ -z $key ]] && continue       # Skip empty lines

        # Remove quotes from value
        value="${value//\"/}"
        parsed_config[$key]="$value"
    done < "$CONFIG_FILE"
}

# Merge configurations
merge_configs() {
    for key in "${!app_config[@]}"; do
        if [[ -n ${parsed_config[$key]} ]]; then
            app_config[$key]="${parsed_config[$key]}"
        fi
    done
}

# Validate configuration
validate_config() {
    declare -i port="${app_config[port]}"

    if (( port < 1 || port > 65535 )); then
        echo "Error: Invalid port number: $port"
        exit 1
    fi

    if [[ ! "${app_config[log_level]}" =~ ^(DEBUG|INFO|WARN|ERROR)$ ]]; then
        echo "Error: Invalid log level: ${app_config[log_level]}"
        exit 1
    fi
}

# Usage example
if [[ -f "$CONFIG_FILE" ]]; then
    parse_config
    merge_configs
    validate_config
fi

echo "Server: ${app_config[server]}"
echo "Port: ${app_config[port]}"
echo "Debug: ${app_config[debug]}"
echo "Log Level: ${app_config[log_level]}"
```

#### Data Processing Script
```bash
#!/bin/bash
# Data processing with typed variables

# Input data processing
declare -a input_files=()
declare -a processed_data=()
declare -A statistics=(
    ["total_lines"]=0
    ["errors"]=0
    ["warnings"]=0
)

# Counter variables
declare -i line_count=0
declare -i file_count=0
declare -i error_count=0

# Configuration
declare -r -i MAX_ERRORS=10
declare -l log_level="info"

# Process single file
process_file() {
    local file="$1"
    declare -i file_lines=0
    declare -i file_errors=0

    while IFS= read -r line; do
        ((file_lines++))
        ((statistics[total_lines]++))

        # Check for errors
        if [[ $line =~ ERROR ]]; then
            ((file_errors++))
            ((statistics[errors]++))
        fi

        # Process data
        processed_data+=("$line")

    done < "$file"

    echo "Processed $file: $file_lines lines, $file_errors errors"

    if (( file_errors > 0 )); then
        ((error_count++))
    fi
}

# Main processing loop
main() {
    # Collect input files
    for file in "$@"; do
        if [[ -f "$file" ]]; then
            input_files+=("$file")
            ((file_count++))
        else
            echo "Warning: File not found: $file"
            ((statistics[warnings]++))
        fi
    done

    # Process each file
    for file in "${input_files[@]}"; do
        process_file "$file"

        # Exit if too many errors
        if (( error_count > MAX_ERRORS )); then
            echo "Error: Too many errors ($error_count), aborting"
            exit 1
        fi
    done

    # Display statistics
    echo "=== Processing Summary ==="
    echo "Files processed: $file_count"
    echo "Total lines: ${statistics[total_lines]}"
    echo "Total errors: ${statistics[errors]}"
    echo "Files with errors: $error_count"
    echo "Warnings: ${statistics[warnings]}"

    # Display processed data sample
    echo "=== Data Sample ==="
    printf '%s\n' "${processed_data[@]:0:5}"
}

main "$@"
```

### System Administration

#### Environment Setup
```bash
#!/bin/bash
# Environment setup with declare

# System paths
declare -r SYSTEM_PATHS=(
    "/usr/bin"
    "/usr/local/bin"
    "/opt/bin"
)

# Application environment
declare -x APP_ENV="${APP_ENV:-development}"
declare -x APP_PORT="${APP_PORT:-8080}"
declare -x APP_HOST="${APP_HOST:-0.0.0.0}"

# Database configuration
declare -A db_config=(
    ["host"]="${DB_HOST:-localhost}"
    ["port"]="${DB_PORT:-5432}"
    ["name"]="${DB_NAME:-myapp}"
    ["user"]="${DB_USER:-admin}"
)

# Secure password handling
if [[ -f "$DB_PASSWORD_FILE" ]]; then
    declare -rx DB_PASSWORD="$(cat "$DB_PASSWORD_FILE")"
else
    echo "Warning: DB_PASSWORD_FILE not set"
fi

# Application features (toggle)
declare -A features=(
    ["debug"]="${DEBUG:-false}"
    ["logging"]="${LOGGING:-true}"
    ["cache"]="${CACHE:-true}"
    ["metrics"]="${METRICS:-true}"
)

# Runtime configuration
declare -i -r MAX_WORKERS="${MAX_WORKERS:-4}"
declare -i -r TIMEOUT="${TIMEOUT:-30}"
declare -i -r RETRY_COUNT="${RETRY_COUNT:-3}"

# Validation functions
validate_environment() {
    # Check required environment variables
    if [[ -z $DB_PASSWORD ]]; then
        echo "Error: DB_PASSWORD not set"
        return 1
    fi

    # Validate numeric values
    if (( APP_PORT < 1 || APP_PORT > 65535 )); then
        echo "Error: Invalid APP_PORT: $APP_PORT"
        return 1
    fi

    # Check feature flags
    for feature in "${!features[@]}"; do
        if [[ ! "${features[$feature]}" =~ ^(true|false)$ ]]; then
            echo "Error: Invalid value for $feature: ${features[$feature]}"
            return 1
        fi
    done

    echo "Environment validation passed"
    return 0
}

# Setup functions
setup_environment() {
    # Add to PATH
    for path in "${SYSTEM_PATHS[@]}"; do
        if [[ -d "$path" ]] && [[ ":$PATH:" != *":$path:"* ]]; then
            export PATH="$PATH:$path"
        fi
    done

    # Create application directories
    declare -a app_dirs=("/var/log/myapp" "/var/run/myapp" "/tmp/myapp")
    for dir in "${app_dirs[@]}"; do
        [[ ! -d "$dir" ]] && mkdir -p "$dir"
    done

    echo "Environment setup completed"
}

# Display configuration
show_config() {
    echo "=== Application Configuration ==="
    echo "Environment: $APP_ENV"
    echo "Port: $APP_PORT"
    echo "Host: $APP_HOST"
    echo "Workers: $MAX_WORKERS"
    echo "Timeout: ${TIMEOUT}s"
    echo ""

    echo "=== Database Configuration ==="
    for key in "${!db_config[@]}"; do
        echo "DB $key: ${db_config[$key]}"
    done
    echo ""

    echo "=== Features ==="
    for feature in "${!features[@]}"; do
        echo "$feature: ${features[$feature]}"
    done
}

# Main execution
if validate_environment; then
    setup_environment
    show_config
else
    exit 1
fi
```

#### User Management Script
```bash
#!/bin/bash
# User management with structured data

# User data structure
declare -A users=(
    ["john.doe"]="active:admin:/home/john.doe"
    ["jane.smith"]="active:user:/home/jane.smith"
    ["bob.wilson"]="inactive:user:/home/bob.wilson"
)

# System constants
declare -r -i MAX_UID=60000
declare -r -i MIN_UID=1000
declare -r SHELLS=("/bin/bash" "/bin/sh" "/bin/zsh")
declare -r MIN_UID=1000

# User statistics
declare -i active_users=0
declare -i inactive_users=0
declare -i admin_users=0

# Parse user data
parse_user_data() {
    local username="$1"
    local user_data="${users[$username]}"

    if [[ -z $user_data ]]; then
        echo "User not found: $username"
        return 1
    fi

    IFS=':' read -r status role home <<< "$user_data"

    echo "Username: $username"
    echo "Status: $status"
    echo "Role: $role"
    echo "Home: $home"
    echo ""
}

# Count user statistics
count_users() {
    for username in "${!users[@]}"; do
        local user_data="${users[$username]}"
        IFS=':' read -r status role _ <<< "$user_data"

        if [[ $status == "active" ]]; then
            ((active_users++))
        else
            ((inactive_users++))
        fi

        if [[ $role == "admin" ]]; then
            ((admin_users++))
        fi
    done
}

# Add new user
add_user() {
    local username="$1"
    local status="${2:-active}"
    local role="${3:-user}"
    local home="/home/$username"

    # Validate username
    if [[ ! $username =~ ^[a-z][a-z0-9._-]*$ ]]; then
        echo "Error: Invalid username format: $username"
        return 1
    fi

    # Check if user exists
    if [[ -n ${users[$username]} ]]; then
        echo "Error: User already exists: $username"
        return 1
    fi

    # Add to users array
    users[$username]="$status:$role:$home"
    echo "Added user: $username ($status, $role)"
}

# Modify user
modify_user() {
    local username="$1"
    local field="$2"
    local value="$3"

    if [[ -z ${users[$username]} ]]; then
        echo "Error: User not found: $username"
        return 1
    fi

    local user_data="${users[$username]}"
    IFS=':' read -r status role home <<< "$user_data"

    case $field in
        status)
            if [[ ! $value =~ ^(active|inactive)$ ]]; then
                echo "Error: Invalid status: $value"
                return 1
            fi
            status="$value"
            ;;
        role)
            if [[ ! $value =~ ^(admin|user)$ ]]; then
                echo "Error: Invalid role: $value"
                return 1
            fi
            role="$value"
            ;;
        home)
            home="$value"
            ;;
        *)
            echo "Error: Invalid field: $field"
            return 1
            ;;
    esac

    users[$username]="$status:$role:$home"
    echo "Modified $username: $field=$value"
}

# Display user report
user_report() {
    count_users

    echo "=== User Management Report ==="
    echo "Total Users: ${#users[@]}"
    echo "Active Users: $active_users"
    echo "Inactive Users: $inactive_users"
    echo "Admin Users: $admin_users"
    echo ""

    echo "=== User Details ==="
    for username in "${!users[@]}"; do
        parse_user_data "$username"
    done
}

# Main execution
case "${1:-}" in
    "add")
        add_user "$2" "$3" "$4"
        ;;
    "modify")
        modify_user "$2" "$3" "$4"
        ;;
    "show")
        parse_user_data "$2"
        ;;
    "report")
        user_report
        ;;
    *)
        echo "Usage: $0 {add|modify|show|report} [args...]"
        exit 1
        ;;
esac
```

## Advanced Usage

### Variable Inspection

#### Attribute Analysis
```bash
# Check variable attributes
check_variable() {
    local varname="$1"

    if declare -p "$varname" 2>/dev/null | grep -q "declare -a"; then
        echo "$varname is an indexed array"
    elif declare -p "$varname" 2>/dev/null | grep -q "declare -A"; then
        echo "$varname is an associative array"
    elif declare -p "$varname" 2>/dev/null | grep -q "declare -i"; then
        echo "$varname is an integer"
    elif declare -p "$varname" 2>/dev/null | grep -q "declare -r"; then
        echo "$varname is readonly"
    elif declare -p "$varname" 2>/dev/null | grep -q "declare -x"; then
        echo "$varname is exported"
    else
        echo "$varname is a regular variable"
    fi
}

# Test various variables
declare -a my_array=("one" "two")
declare -i my_int=42
declare -r my_const="constant"
declare -x my_export="exported"
my_regular="regular"

check_variable my_array    # Indexed array
check_variable my_int      # Integer
check_variable my_const    # Readonly
check_variable my_export   # Exported
check_variable my_regular  # Regular

# List variables by type
list_arrays() {
    echo "=== Indexed Arrays ==="
    declare -a | cut -d' ' -f3-

    echo "=== Associative Arrays ==="
    declare -A | cut -d' ' -f3-

    echo "=== Functions ==="
    declare -f | grep '^[a-zA-Z_][a-zA-Z0-9_]* ()'
}

list_arrays
```

#### Variable Validation
```bash
# Comprehensive variable validation
validate_variables() {
    local -i errors=0

    # Check required variables
    local -a required_vars=("HOME" "USER" "PATH")
    for var in "${required_vars[@]}"; do
        if [[ -z ${!var} ]]; then
            echo "Error: Required variable $var is not set"
            ((errors++))
        fi
    done

    # Validate numeric variables
    declare -i numeric_tests=0
    local -a numeric_vars=("UID" "EUID")
    for var in "${numeric_vars[@]}"; do
        if [[ ${!var} =~ ^[0-9]+$ ]]; then
            ((numeric_tests++))
        else
            echo "Warning: $var should be numeric: ${!var}"
        fi
    done

    # Check array variables
    declare -i array_count=0
    local -a array_vars=("BASH_VERSINFO" "PIPESTATUS")
    for var in "${array_vars[@]}"; do
        if declare -p "$var" 2>/dev/null | grep -q "declare -a"; then
            ((array_count++))
        fi
    done

    echo "Validation Results:"
    echo "Required variables: ${#required_vars[@]} defined, $errors errors"
    echo "Numeric variables: $numeric_tests/${#numeric_vars[@]} valid"
    echo "Array variables: $array_count/${#array_vars[@]} found"

    return $errors
}

validate_variables
```

### Performance Optimization

#### Efficient Array Operations
```bash
# Efficient array processing
declare -a large_data=()

# Populate large array
for ((i=1; i<=10000; i++)); do
    large_data+=("item_$i")
done

# Efficient iteration
process_large_array() {
    local -i processed=0

    # Use local variable to avoid repeated array expansion
    local -a data_copy=("${large_data[@]}")

    for item in "${data_copy[@]}"; do
        # Process item
        [[ $item =~ item_[0-9]+ ]] && ((processed++))
    done

    echo "Processed $processed items"
}

# Bulk operations
bulk_array_operations() {
    # Filter efficiently
    declare -a filtered=()
    local item

    for item in "${large_data[@]}"; do
        if [[ $item =~ item_[0-9]{4,}$ ]]; then
            filtered+=("$item")
        fi
    done

    echo "Filtered ${#filtered[@]} items from ${#large_data[@]}"
}

# Memory-efficient operations
memory_efficient_processing() {
    local -i count=0

    # Process without copying array
    for i in "${!large_data[@]}"; do
        if (( i % 2 == 0 )); then  # Process even indices
            ((count++))
        fi
    done

    echo "Processed $count even-indexed items"
}

process_large_array
bulk_array_operations
memory_efficient_processing
```

#### Variable Caching
```bash
# Variable caching for performance
declare -A command_cache=()
declare -A file_cache=()

# Cache command results
cached_command() {
    local cmd="$1"
    local cache_key="${cmd//[^a-zA-Z0-9]/_}"

    if [[ -n ${command_cache[$cache_key]} ]]; then
        echo "${command_cache[$cache_key]}"
        return 0
    fi

    local result
    result=$(eval "$cmd" 2>/dev/null)
    command_cache[$cache_key]="$result"
    echo "$result"
}

# Cache file contents
cached_file() {
    local filepath="$1"
    local cache_key="${filepath//[^a-zA-Z0-9]/_}"

    if [[ -n ${file_cache[$cache_key]} ]]; then
        echo "${file_cache[$cache_key]}"
        return 0
    fi

    if [[ -f "$filepath" ]]; then
        local content
        content=$(<"$filepath")
        file_cache[$cache_key]="$content"
        echo "$content"
    fi
}

# Clear caches
clear_caches() {
    command_cache=()
    file_cache=()
    echo "Caches cleared"
}

# Usage examples
echo "Cached date:"
cached_command "date"

echo "Cached file read:"
cached_file "/etc/hostname"

clear_caches
```

## Integration and Automation

### Dynamic Variable Management

#### Configuration Generator
```bash
#!/bin/bash
# Dynamic configuration generator

# Configuration template
declare -A config_template=(
    ["app_name"]="MyApp"
    ["version"]="1.0.0"
    ["debug"]="false"
    ["port"]="8080"
    ["host"]="localhost"
)

# Environment-specific overrides
declare -A dev_overrides=(
    ["debug"]="true"
    ["port"]="3000"
    ["log_level"]="DEBUG"
)

declare -A prod_overrides=(
    ["debug"]="false"
    ["port"]="80"
    ["log_level"]="ERROR"
    ["workers"]="4"
)

# Generate configuration
generate_config() {
    local env="$1"
    local -A final_config=()

    # Start with template
    for key in "${!config_template[@]}"; do
        final_config[$key]="${config_template[$key]}"
    done

    # Apply environment overrides
    local -A overrides
    case $env in
        "dev") overrides=("${dev_overrides[@]}") ;;
        "prod") overrides=("${prod_overrides[@]}") ;;
        *) echo "Unknown environment: $env"; return 1 ;;
    esac

    for key in "${!overrides[@]}"; do
        final_config[$key]="${overrides[$key]}"
    done

    # Generate output
    echo "# Generated configuration for $env environment"
    echo "# Generated on: $(date)"
    echo ""

    for key in "${!final_config[@]}"; do
        echo "${key^^}=${final_config[$key]}"
    done
}

# Export configuration as environment variables
export_config() {
    local env="$1"
    local -A final_config=()

    # Build final config (same logic as above)
    for key in "${!config_template[@]}"; do
        final_config[$key]="${config_template[$key]}"
    done

    local -A overrides
    case $env in
        "dev") overrides=("${dev_overrides[@]}") ;;
        "prod") overrides=("${prod_overrides[@]}") ;;
    esac

    for key in "${!overrides[@]}"; do
        final_config[$key]="${overrides[$key]}"
    done

    # Export variables
    for key in "${!final_config[@]}"; do
        declare -x "${key^^}=${final_config[$key]}"
    done

    echo "Exported ${#final_config[@]} configuration variables"
}

# Main execution
ENVIRONMENT="${1:-dev}"
echo "Generating configuration for: $ENVIRONMENT"
generate_config "$ENVIRONMENT"
export_config "$ENVIRONMENT"
```

#### Variable State Manager
```bash
#!/bin/bash
# Variable state management system

declare -A variable_states=()
declare -A variable_history=()
declare -a state_stack=()

# Save variable state
save_state() {
    local state_name="$1"
    shift
    local vars=("$@")

    # Save current values
    for var in "${vars[@]}"; do
        if [[ -v $var ]]; then
            variable_states["${state_name}:${var}"]="${!var}"
        fi
    done

    # Add to state stack
    state_stack+=("$state_name")
    echo "Saved state: $state_name (${#vars[@]} variables)"
}

# Restore variable state
restore_state() {
    local state_name="$1"
    local restored=0

    for key in "${!variable_states[@]}"; do
        if [[ $key == "${state_name}:"* ]]; then
            local var="${key#*:}"
            local value="${variable_states[$key]}"

            # Restore variable
            if [[ $value =~ ^[0-9]+$ ]]; then
                declare -g -i "$var=$value"
            else
                declare -g "$var=$value"
            fi

            ((restored++))
        fi
    done

    echo "Restored state: $state_name ($restored variables)"
}

# Create checkpoint
checkpoint() {
    local checkpoint_name="$1"
    local -a all_vars=()

    # Get all variable names
    mapfile -t all_vars < <(declare -p | grep '^[^a-z]*declare' | cut -d' ' -f3 | cut -d'=' -f1)

    save_state "$checkpoint_name" "${all_vars[@]}"
}

# Compare states
compare_states() {
    local state1="$1"
    local state2="$2"

    echo "Comparing states: $state1 vs $state2"
    echo ""

    for key in "${!variable_states[@]}"; do
        if [[ $key == "${state1}:"* ]]; then
            local var="${key#*:}"
            local compare_key="${state2}:${var}"

            local value1="${variable_states[$key]}"
            local value2="${variable_states[$compare_key]:-(not set)}"

            if [[ $value1 != "$value2" ]]; then
                echo "$var: $value1 -> $value2"
            fi
        fi
    done
}

# Clear state
clear_state() {
    local state_name="$1"
    local removed=0

    for key in "${!variable_states[@]}"; do
        if [[ $key == "${state_name}:"* ]]; then
            unset variable_states["$key"]
            ((removed++))
        fi
    done

    echo "Cleared state: $state_name ($removed variables)"
}

# List all states
list_states() {
    echo "=== Saved States ==="

    # Extract unique state names
    local -a states=()
    for key in "${!variable_states[@]}"; do
        local state_name="${key%%:*}"
        if [[ ! " ${states[*]} " =~ " $state_name " ]]; then
            states+=("$state_name")
        fi
    done

    printf '%s\n' "${states[@]}"
    echo ""

    echo "=== State Stack ==="
    printf '%s\n' "${state_stack[@]}"
}

# Usage example
declare -i test_var=10
declare test_str="hello"

checkpoint "initial"

test_var=20
test_str="world"
declare new_var="added"

checkpoint "modified"

compare_states "initial" "modified"
list_states
```

## Troubleshooting

### Common Issues

#### Variable Scope Problems
```bash
# Problem: Variables not accessible in functions
problem_scope() {
    local_var="local value"
    global_var="global value"  # This won't be accessible outside
}

problem_scope
echo $local_var    # Empty - not accessible
echo $global_var   # Empty - not accessible

# Solution: Use declare -g for global variables
solution_scope() {
    declare -g global_var="global value"
    local local_var="local value"

    # Or use export if needed in child processes
    export export_var="exported value"
}

solution_scope
echo $global_var   # Works: global value
echo $export_var   # Works: exported value

# Alternative: Use function return values
return_value() {
    local result="computed value"
    echo "$result"
}

my_var=$(return_value)
echo $my_var  # Works: computed value
```

#### Array Attribute Issues
```bash
# Problem: Array variables losing attributes
problem_arrays() {
    local -a temp_array=("one" "two")
    # When passed to functions, might lose array attribute
    process_array "$temp_array"  # This passes as string
}

# Solution: Pass array name or use nameref
solution_arrays() {
    local -a temp_array=("one" "two")

    # Method 1: Pass by nameref
    process_by_reference temp_array

    # Method 2: Pass elements individually
    process_by_elements "${temp_array[@]}"
}

process_by_reference() {
    local -n array_ref="$1"
    echo "First element: ${array_ref[0]}"
}

process_by_elements() {
    local -a received_array=("$@")
    echo "Received ${#received_array[@]} elements"
}
```

#### Type Conversion Issues
```bash
# Problem: Integer variables with non-integer values
problem_integers() {
    declare -i num=42
    num="not a number"  # Becomes 0
    echo $num  # 0
}

# Solution: Validate before assignment
solution_integers() {
    declare -i num=42

    assign_int() {
        local value="$1"
        if [[ $value =~ ^-?[0-9]+$ ]]; then
            num="$value"
        else
            echo "Error: Not an integer: $value" >&2
            return 1
        fi
    }

    assign_int "123"    # Works
    assign_int "abc"    # Error message
}

# Alternative: Use regular variables with validation
validate_assignment() {
    local varname="$1"
    local value="$2"

    if [[ $value =~ ^-?[0-9]+$ ]]; then
        declare -g -i "$varname=$value"
        return 0
    else
        echo "Error: Invalid integer: $value" >&2
        return 1
    fi
}

validate_assignment "counter" "42"
echo $counter  # 42
```

#### Read-only Variable Issues
```bash
# Problem: Accidentally making variables read-only
problem_readonly() {
    declare -r config="/etc/file.conf"

    # Later trying to modify
    config="/new/path"  # Error: readonly variable
}

# Solution: Use conditional declaration
solution_readonly() {
    # Make read-only only in production
    if [[ $ENVIRONMENT == "production" ]]; then
        declare -r config="/etc/file.conf"
    else
        declare config="/etc/file.conf"
    fi

    # Or use a function to set config
    set_config() {
        local new_config="$1"

        if [[ -v config && $config == "/etc/file.conf" ]]; then
            echo "Warning: Cannot change production config"
            return 1
        fi

        config="$new_config"
    }
}
```

### Debugging Techniques

#### Variable Inspection
```bash
# Comprehensive variable inspection
debug_variables() {
    local varname="$1"

    echo "=== Debug: $varname ==="

    # Check if variable exists
    if [[ -v $varname ]]; then
        echo "Status: Defined"

        # Show attributes and value
        declare -p "$varname" 2>/dev/null || echo "Cannot display attributes"

        # Show value if not an array
        if [[ ! $(declare -p "$varname" 2>/dev/null) =~ "declare -[aA]" ]]; then
            echo "Value: ${!varname}"
            echo "Length: ${#!varname}"
        fi
    else
        echo "Status: Undefined"
    fi

    # Check if it's a function
    if declare -f "$varname" >/dev/null 2>&1; then
        echo "Type: Function"
        declare -f "$varname" | head -5
    fi
}

# Test various variables
declare -a test_array=("a" "b" "c")
declare -A test_map=(["key"]="value")
declare -i test_int=42
declare -r test_const="constant"

debug_variables "test_array"
debug_variables "test_map"
debug_variables "test_int"
debug_variables "test_const"
debug_variables "nonexistent"
```

#### Attribute Tracking
```bash
# Track variable attribute changes
track_attributes() {
    local varname="$1"
    local original_attrs
    original_attrs=$(declare -p "$varname" 2>/dev/null)

    echo "Original attributes: $original_attrs"

    # Function to check current state
    check_attrs() {
        local current_attrs
        current_attrs=$(declare -p "$varname" 2>/dev/null)

        if [[ "$original_attrs" != "$current_attrs" ]]; then
            echo "Attributes changed for $varname"
            echo "Before: $original_attrs"
            echo "After:  $current_attrs"
            original_attrs="$current_attrs"
        fi
    }

    # Export function for use
    export -f check_attrs
}

# Usage
track_attributes "myvar"

# Later in script
declare -r myvar="value"
check_attrs  # Will show if attributes changed
```

## Related Commands

- [`export`](/docs/commands/system-info/export) - Export variables to child processes
- [`local`](/docs/commands/system-info/local) - Create local variables in functions
- [`readonly`](/docs/commands/system-info/readonly) - Mark variables as read-only
- [`unset`](/docs/commands/system-info/unset) - Remove variable definitions
- [`set`](/docs/commands/system-info/set) - Set and display shell variables
- [`env`](/docs/commands/system-info/env) - Display environment variables
- [`printenv`](/docs/commands/system-info/printenv) - Print environment variables
- [`typeset`](/docs/commands/system-info/typeset) - Alias for declare command

## Best Practices

1. **Use specific attributes** - Declare variables with appropriate types (-i for integers, -a for arrays)
2. **Make constants readonly** - Use `-r` for configuration values that shouldn't change
3. **Scope variables properly** - Use `local` in functions, `declare -g` when needed
4. **Validate input** - Check values before assignment, especially for typed variables
5. **Use associative arrays** - For key-value data structures instead of complex parsing
6. **Document variable purpose** - Use descriptive names and comments
7. **Export carefully** - Only export variables needed by child processes
8. **Clean up variables** - Use `unset` for variables no longer needed
9. **Use namerefs wisely** - Great for function parameters but can be confusing
10. **Test variable attributes** - Use `declare -p` to verify variable properties

## Performance Tips

1. **Integer variables** are faster for arithmetic than string manipulation
2. **Associative arrays** provide O(1) lookup for key-value data
3. **Local variables** are faster than global variables in functions
4. **Avoid excessive attribute changes** - Set attributes once when possible
5. **Use readonly constants** - Shell can optimize access to immutable values
6. **Bulk array operations** are more efficient than element-by-element
7. **Cache variable values** in local variables when used repeatedly
8. **Minimize exported variables** - They have additional overhead
9. **Use parameter expansion** instead of external commands for string operations
10. **Consider arrays** for multiple related values instead of separate variables

The `declare` command is a powerful tool for shell scripting, providing type safety, scope control, and advanced data structures. Its comprehensive attribute system enables robust variable management essential for complex scripts and applications.