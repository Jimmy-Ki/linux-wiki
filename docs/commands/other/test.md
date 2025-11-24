---
title: test - Evaluate Conditional Expressions
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# test - Evaluate Conditional Expressions

The `test` command evaluates conditional expressions and returns an exit status of 0 (true) or 1 (false). It's fundamental to shell scripting for making decisions and controlling program flow. The command is commonly used in its bracket form `[ expression ]` or the enhanced bash version `[[ expression ]]`.

## Basic Syntax

```bash
test EXPRESSION
[ EXPRESSION ]      # Equivalent to test
[[ EXPRESSION ]]    # Enhanced bash version
```

## File Test Operators

### File Existence and Type
- `-a FILE` - True if file exists (deprecated, use `-e`)
- `-e FILE` - True if file exists
- `-f FILE` - True if file exists and is a regular file
- `-d FILE` - True if file exists and is a directory
- `-b FILE` - True if file exists and is a block special file
- `-c FILE` - True if file exists and is a character special file
- `-p FILE` - True if file exists and is a named pipe (FIFO)
- `-S FILE` - True if file exists and is a socket
- `-L FILE` - True if file exists and is a symbolic link
- `-h FILE` - True if file exists and is a symbolic link (same as `-L`)

### File Permissions and Ownership
- `-r FILE` - True if file exists and is readable
- `-w FILE` - True if file exists and is writable
- `-x FILE` - True if file exists and is executable
- `-u FILE` - True if file exists and has setuid bit set
- `-g FILE` - True if file exists and has setgid bit set
- `-k FILE` - True if file exists and has sticky bit set
- `-O FILE` - True if file exists and is owned by effective user ID
- `-G FILE` - True if file exists and is owned by effective group ID

### File Content and Status
- `-s FILE` - True if file exists and size is greater than zero
- `-N FILE` - True if file exists and has been modified since last read
- `-t FD` - True if file descriptor FD is open and refers to a terminal

### File Comparison
- `FILE1 -nt FILE2` - True if file1 is newer than file2 (modification date)
- `FILE1 -ot FILE2` - True if file1 is older than file2
- `FILE1 -ef FILE2` - True if file1 and file2 refer to the same device and inode

## String Test Operators

- `-z STRING` - True if string is empty (zero length)
- `-n STRING` - True if string is not empty
- `STRING` - True if string is not empty
- `STRING1 = STRING2` - True if strings are equal
- `STRING1 == STRING2` - True if strings are equal (bash extension)
- `STRING1 != STRING2` - True if strings are not equal
- `STRING1 < STRING2` - True if string1 sorts before string2 lexicographically
- `STRING1 > STRING2` - True if string1 sorts after string2 lexicographically

## Integer Comparison Operators

- `INTEGER1 -eq INTEGER2` - Equal to
- `INTEGER1 -ne INTEGER2` - Not equal to
- `INTEGER1 -lt INTEGER2` - Less than
- `INTEGER1 -le INTEGER2` - Less than or equal to
- `INTEGER1 -gt INTEGER2` - Greater than
- `INTEGER1 -ge INTEGER2` - Greater than or equal to

## Logical Operators

- `! EXPRESSION` - True if expression is false (logical NOT)
- `EXPRESSION1 -a EXPRESSION2` - True if both expressions are true (logical AND)
- `EXPRESSION1 -o EXPRESSION2` - True if either expression is true (logical OR)
- `&&` - Logical AND (in `[[ ]]`)
- `||` - Logical OR (in `[[ ]]`)

## Other Operators

- `-o OPTION` - True if shell option OPTION is enabled
- `-v VAR` - True if shell variable VAR is set
- `-R VAR` - True if shell variable VAR is set and is a name reference

## Usage Examples

### File Testing
```bash
# Check if file exists
if [ -f "/etc/passwd" ]; then
    echo "Password file exists"
fi

# Check directory existence
if [ -d "/tmp" ]; then
    echo "Directory /tmp exists"
fi

# Check file permissions
if [ -r "config.txt" ]; then
    echo "File is readable"
fi

if [ -w "output.txt" ]; then
    echo "File is writable"
fi

if [ -x "script.sh" ]; then
    echo "File is executable"
fi

# Check file type
if [ -L "/usr/bin/vi" ]; then
    echo "vi is a symbolic link"
fi

if [ -d "/dev" ] && [ -w "/dev" ]; then
    echo "Can write to device directory"
fi

# Check file size
if [ -s "large_file.txt" ]; then
    echo "File is not empty"
fi

# Check if file was modified
if [ -N "data.txt" ]; then
    echo "File was modified since last read"
fi
```

### String Testing
```bash
# Check if variable is set
if [ -n "$USERNAME" ]; then
    echo "Username is set to: $USERNAME"
fi

# Check if variable is empty
if [ -z "$input" ]; then
    echo "Input is empty"
fi

# String equality
if [ "$answer" = "yes" ]; then
    echo "User confirmed"
fi

# String inequality
if [ "$color" != "red" ]; then
    echo "Color is not red"
fi

# String comparison (case sensitive)
if [ "$name" < "m" ]; then
    echo "Name starts with letter before m"
fi

# Pattern matching (bash)
if [[ "$filename" == *.txt ]]; then
    echo "Text file detected"
fi

# Regular expression matching (bash)
if [[ "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
    echo "Valid email format"
fi
```

### Integer Comparisons
```bash
# Numeric comparisons
age=25
if [ $age -ge 18 ]; then
    echo "Adult"
fi

count=10
if [ $count -eq 0 ]; then
    echo "Count is zero"
elif [ $count -lt 0 ]; then
    echo "Count is negative"
else
    echo "Count is positive"
fi

# Range checking
score=85
if [ $score -ge 0 ] && [ $score -le 100 ]; then
    echo "Valid score range"
fi

# Compare command outputs
files_count=$(ls -1 *.txt | wc -l)
if [ $files_count -gt 5 ]; then
    echo "Many text files found"
fi
```

### Complex Conditions
```bash
# Multiple conditions
if [ -f "data.txt" ] && [ -r "data.txt" ] && [ -s "data.txt" ]; then
    echo "Readable non-empty file exists"
fi

# Either/or conditions
if [ "$OS" = "Linux" ] || [ "$OS" = "macOS" ]; then
    echo "Unix-like system detected"
fi

# Negation
if [ ! -f "backup.tar.gz" ]; then
    echo "Backup file not found"
fi

# Nested conditions
if [ -d "logs" ]; then
    if [ -r "logs" ] && [ -x "logs" ]; then
        echo "Can access logs directory"
    fi
fi
```

## Practical Examples

### File Backup Script
```bash
backup_file() {
    local source="$1"
    local backup_dir="$2"

    # Validate source file
    if [ ! -f "$source" ]; then
        echo "Error: Source file '$source' does not exist"
        return 1
    fi

    if [ ! -r "$source" ]; then
        echo "Error: Cannot read source file '$source'"
        return 1
    fi

    # Create backup directory if needed
    if [ ! -d "$backup_dir" ]; then
        mkdir -p "$backup_dir" || {
            echo "Error: Cannot create backup directory"
            return 1
        }
    fi

    if [ ! -w "$backup_dir" ]; then
        echo "Error: Cannot write to backup directory"
        return 1
    fi

    # Perform backup
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="$backup_dir/$(basename "$source").$timestamp"

    cp "$source" "$backup_file" && {
        echo "Backup created: $backup_file"
        return 0
    } || {
        echo "Error: Backup failed"
        return 1
    }
}

# Usage
backup_file "important.txt" "backups"
```

### User Input Validation
```bash
validate_input() {
    local input="$1"
    local min_length="$2"
    local max_length="$3"

    # Check if input is empty
    if [ -z "$input" ]; then
        echo "Error: Input cannot be empty"
        return 1
    fi

    # Check length constraints
    local length=${#input}
    if [ -n "$min_length" ] && [ $length -lt $min_length ]; then
        echo "Error: Input must be at least $min_length characters"
        return 1
    fi

    if [ -n "$max_length" ] && [ $length -gt $max_length ]; then
        echo "Error: Input must be at most $max_length characters"
        return 1
    fi

    # Check for only alphanumeric characters
    if [[ ! "$input" =~ ^[a-zA-Z0-9_]+$ ]]; then
        echo "Error: Input must contain only letters, numbers, and underscores"
        return 1
    fi

    echo "Input is valid"
    return 0
}

# Usage
read -p "Enter username: " username
validate_input "$username" 3 20
```

### System Monitoring
```bash
check_system() {
    # Check disk space
    local disk_usage=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $disk_usage -gt 80 ]; then
        echo "WARNING: Disk usage is ${disk_usage}%"
    else
        echo "OK: Disk usage is ${disk_usage}%"
    fi

    # Check memory usage
    local mem_available=$(free -m | awk '/^Mem:/{print $7}')
    if [ $mem_available -lt 100 ]; then
        echo "WARNING: Low memory (${mem_available}MB available)"
    else
        echo "OK: Sufficient memory (${mem_available}MB available)"
    fi

    # Check if critical services are running
    local services=("nginx" "mysql" "sshd")
    for service in "${services[@]}"; do
        if pgrep "$service" > /dev/null; then
            echo "OK: $service is running"
        else
            echo "ERROR: $service is not running"
        fi
    done

    # Check load average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    local load_int=${load_avg%.*}  # Integer part
    if [ $load_int -gt 2 ]; then
        echo "WARNING: High load average: $load_avg"
    else
        echo "OK: Load average is $load_avg"
    fi
}

# Usage
check_system
```

### Configuration Validation
```bash
validate_config() {
    local config_file="$1"

    # Check if config file exists and is readable
    if [ ! -f "$config_file" ]; then
        echo "Error: Configuration file '$config_file' not found"
        return 1
    fi

    if [ ! -r "$config_file" ]; then
        echo "Error: Cannot read configuration file '$config_file'"
        return 1
    fi

    # Check required configuration options
    local required_options=("server_name" "port" "database_url")
    for option in "${required_options[@]}"; do
        if ! grep -q "^${option}=" "$config_file"; then
            echo "Error: Missing required option '$option' in configuration"
            return 1
        fi
    done

    # Validate port number
    local port=$(grep "^port=" "$config_file" | cut -d'=' -f2)
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
        echo "Error: Invalid port number: $port"
        return 1
    fi

    echo "Configuration is valid"
    return 0
}

# Usage
validate_config "app.conf"
```

### File Processing with Safety Checks
```bash
safe_process_files() {
    local source_dir="$1"
    local target_dir="$2"

    # Validate source directory
    if [ ! -d "$source_dir" ]; then
        echo "Error: Source directory '$source_dir' does not exist"
        return 1
    fi

    if [ ! -r "$source_dir" ]; then
        echo "Error: Cannot read source directory '$source_dir'"
        return 1
    fi

    # Create target directory if needed
    if [ ! -d "$target_dir" ]; then
        mkdir -p "$target_dir" || {
            echo "Error: Cannot create target directory '$target_dir'"
            return 1
        }
    fi

    # Check if target directory is writable
    if [ ! -w "$target_dir" ]; then
        echo "Error: Cannot write to target directory '$target_dir'"
        return 1
    fi

    # Process each file
    find "$source_dir" -type f -name "*.txt" | while read -r file; do
        local basename=$(basename "$file")
        local target_file="$target_dir/$basename"

        # Check if target file already exists
        if [ -f "$target_file" ]; then
            echo "Warning: File '$basename' already exists in target, skipping"
            continue
        fi

        # Process the file
        if cp "$file" "$target_file"; then
            echo "Processed: $basename"
        else
            echo "Error: Failed to process $basename"
        fi
    done

    echo "File processing completed"
}

# Usage
safe_process_files "input_files" "processed_files"
```

## Advanced Usage

### Enhanced Pattern Matching with [[ ]]
```bash
# Bash pattern matching
filename="document_2023_report.pdf"

if [[ "$filename" == document_*_*.pdf ]]; then
    echo "Document filename pattern matched"
fi

# Case patterns
case "$filename" in
    *.txt) echo "Text file" ;;
    *.pdf) echo "PDF file" ;;
    *.jpg|*.png) echo "Image file" ;;
    *) echo "Unknown file type" ;;
esac

# Extended glob patterns (with shopt -s extglob)
shopt -s extglob
if [[ "$filename" == +([a-zA-Z])_+([0-9])_* ]]; then
    echo "Complex pattern matched"
fi
```

### Regular Expressions
```bash
# Email validation
email="user@example.com"
if [[ "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
    echo "Valid email address"
else
    echo "Invalid email address"
fi

# IP address validation
ip_address="192.168.1.1"
if [[ "$ip_address" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
    echo "Valid IP address format"
else
    echo "Invalid IP address format"
fi

# Extract patterns
if [[ "$filename" =~ (.*)_([0-9]{4})_(.*).pdf ]]; then
    prefix="${BASH_REMATCH[1]}"
    year="${BASH_REMATCH[2]}"
    name="${BASH_REMATCH[3]}"
    echo "Prefix: $prefix, Year: $year, Name: $name"
fi
```

## Best Practices

### Quoting and Safety
```bash
# Always quote variables in tests
if [ -n "$variable" ]; then        # Good
if [ -n $variable ]; then          # Bad (fails if variable is empty or unset)

# Use [[ ]] for string comparisons when possible
if [[ "$str1" == "$str2" ]]; then  # Better, handles spaces and special chars
if [ "$str1" == "$str2" ]; then    # Works but less robust

# Check variable existence
if [ -v "variable" ]; then         # Best practice
if [ -n "$variable" ]; then        # May behave differently for unset variables
```

### Performance Considerations
```bash
# Use shell built-ins when possible
# Fast
if [[ -f "$file" ]]; then
# Slower (external command)
if test -f "$file"; then

# Avoid unnecessary tests
# Good
if [[ -f "$file" && -r "$file" ]]; then
# Less efficient
if [[ -f "$file" ]]; then
    if [[ -r "$file" ]]; then
```

### Error Handling
```bash
# Set up error handling
set -euo pipefail

# Safe file operations
if [ ! -f "$config_file" ]; then
    echo "Configuration file not found" >&2
    exit 1
fi

# Use functions for complex checks
is_valid_port() {
    local port="$1"
    [[ "$port" =~ ^[0-9]+$ ]] && [ "$port" -ge 1 ] && [ "$port" -le 65535 ]
}

if is_valid_port "$port"; then
    echo "Port is valid"
else
    echo "Invalid port: $port" >&2
    exit 1
fi
```

## Related Commands

- `[` - Test expression (alias for test)
- `[[` - Enhanced conditional expression (bash)
- `((` - Arithmetic evaluation (bash)
- `case` - Pattern matching command
- `if` - Conditional command
- `expr` - Evaluate expressions
- `exit` - Exit the shell with a status

## Portability Notes

- `[` is POSIX standard, `[[` is bash-specific
- `test` is available on all Unix-like systems
- Some operators may vary between implementations
- Always use POSIX syntax for maximum portability
- Bash extensions provide more features but reduce portability
- Quote variables consistently for predictable behavior across shells