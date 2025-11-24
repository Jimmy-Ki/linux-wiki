---
title: read - Read Input from Standard Input
sidebar_label: read
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# read - Read Input from Standard Input

The `read` command reads one line from standard input and assigns it to variables. It's essential for creating interactive shell scripts that need to gather user input, process file data, or handle user responses in a controlled manner.

## Basic Syntax

```bash
read [OPTIONS] [VARIABLES...]
```

## Common Options

- `-p PROMPT` - Display prompt before reading input
- `-t TIMEOUT` - Time out and return failure if no input within TIMEOUT seconds
- `-a ARRAY` - Read words into indexed array ARRAY
- `-r` - Do not allow backslashes to escape characters
- `-s` - Silent mode (do not echo input)
- `-n NCHARS` - Read only NCHARS characters
- `-d DELIM` - Read until character DELIM instead of newline
- `-e` - Use Readline to handle input (interactive editing)
- `-i TEXT` - Use TEXT as the initial text for Readline
- `-u FD` - Read from file descriptor FD instead of standard input

## Usage Examples

### Basic Input Reading
```bash
# Read into a single variable
echo "Enter your name:"
read name
echo "Hello, $name!"

# Read into multiple variables
echo "Enter first and last name:"
read first_name last_name
echo "First: $first_name, Last: $last_name"

# Read into default REPLY variable
echo "Enter some text:"
read
echo "You entered: $REPLY"

# Read multiple words with array
echo "Enter multiple words:"
read -a words
echo "First word: ${words[0]}"
echo "All words: ${words[@]}"
echo "Number of words: ${#words[@]}"
```

### Interactive Prompts
```bash
# Simple prompt
read -p "Username: " username
echo "Welcome, $username!"

# Multiple prompts
read -p "Enter your age: " age
read -p "Enter your city: " city
echo "$age-year-old from $city"

# Password input
read -s -p "Enter password: " password
echo  # Newline after silent input
echo "Password received (length: ${#password})"

# Confirmation prompt
read -p "Continue? (y/n): " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
else
    echo "Cancelled."
fi
```

### Timeouts and Limits
```bash
# Read with timeout
read -t 5 -p "Enter something (5 seconds): " input
if [[ -z "$input" ]]; then
    echo "Timeout!"
else
    echo "You entered: $input"
fi

# Read fixed number of characters
read -n 3 -p "Enter 3 characters: " chars
echo  # Newline
echo "Characters: $chars"

# Read until specific delimiter
read -d ":" -p "Enter text ending with ': ': " text
echo "Text before colon: $text"

# Combine multiple options
read -t 10 -n 1 -p "Press Y to continue (10 seconds): " choice
echo
if [[ "$choice" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
fi
```

### File Processing
```bash
# Read from file line by line
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt

# Read with line numbers
line_num=0
while IFS= read -r line; do
    ((line_num++))
    printf "%4d: %s\n" "$line_num" "$line"
done < input.txt

# Process CSV file
while IFS=',' read -r name age city; do
    printf "Name: %-10s Age: %-3s City: %s\n" "$name" "$age" "$city"
done < data.csv

# Read specific fields
while read -r _ username _; do
    echo "User: $username"
done < /etc/passwd

# Skip comments and empty lines
while IFS= read -r line; do
    [[ "$line" =~ ^# ]] && continue
    [[ -z "$line" ]] && continue
    echo "Processing: $line"
done < config.txt
```

## Practical Examples

### Menu System
```bash
# Interactive menu
show_menu() {
    clear
    echo "=== Main Menu ==="
    echo "1. List files"
    echo "2. Create directory"
    echo "3. Edit file"
    echo "4. Exit"
}

get_choice() {
    while true; do
        show_menu
        read -p "Enter your choice (1-4): " choice
        case "$choice" in
            1) ls -la ;;
- 2)
                read -p "Directory name: " dirname
                mkdir -p "$dirname"
                echo "Created: $dirname"
                ;;
- 3)
                read -p "File name: " filename
                ${EDITOR:-nano} "$filename"
                ;;
            4) exit 0 ;;
            *) echo "Invalid choice. Try again." ;;
        esac
        read -p "Press Enter to continue..."
    done
}

get_choice
```

### Configuration Management
```bash
# Read configuration from user
setup_config() {
    echo "=== Configuration Setup ==="

    read -p "Server name: " server_name
    read -p "Port (default 8080): " port
    port=${port:-8080}  # Default value

    read -p "Enable debug mode? (y/n): " debug
    debug_mode=$([[ "$debug" =~ ^[Yy] ]] && echo "true" || echo "false")

    read -s -p "Database password: " db_password
    echo

    # Create config file
    cat > config.conf << EOF
# Generated configuration
server_name = $server_name
port = $port
debug_mode = $debug_mode
db_password = $db_password
EOF

    echo "Configuration saved to config.conf"
}

setup_config
```

### User Registration
```bash
# Interactive user registration
register_user() {
    echo "=== User Registration ==="

    while true; do
        read -p "Username: " username
        if [[ "$username" =~ ^[a-zA-Z0-9_]{3,20}$ ]]; then
            break
        else
            echo "Username must be 3-20 characters, alphanumeric and underscore only."
        fi
    done

    while true; do
        read -s -p "Password: " password
        echo
        if [[ ${#password} -ge 8 ]]; then
            break
        else
            echo "Password must be at least 8 characters."
        fi
    done

    read -s -p "Confirm password: " password_confirm
    echo

    if [[ "$password" != "$password_confirm" ]]; then
        echo "Passwords don't match."
        return 1
    fi

    read -p "Email: " email
    if [[ ! "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
        echo "Invalid email format."
        return 1
    fi

    read -p "Full name: " full_name

    # Save user data
    printf "%s|%s|%s|%s\n" "$username" "$(echo -n "$password" | sha256sum | cut -d' ' -f1)" "$email" "$full_name" >> users.txt

    echo "User $username registered successfully!"
}

register_user
```

### File Editor Simulation
```bash
# Simple line editor
edit_file() {
    local filename="$1"
    local temp_file=$(mktemp)

    echo "=== Simple File Editor ==="
    echo "File: $filename"
    echo "Commands: .save, .quit, .help"
    echo

    # Load existing file if it exists
    if [[ -f "$filename" ]]; then
        cp "$filename" "$temp_file"
        line_num=1
        while IFS= read -r line; do
            printf "%3d: %s\n" "$line_num" "$line"
            ((line_num++))
        done < "$temp_file"
    fi

    echo
    echo "Enter new lines (or commands):"

    while true; do
        read -p "> " input

        case "$input" in
            ".save")
                cp "$temp_file" "$filename"
                echo "File saved."
                ;;
            ".quit")
                echo "Editor closed."
                break
                ;;
            ".help")
                echo "Commands:"
                echo "  .save - Save file"
                echo "  .quit - Exit editor"
                echo "  .help - Show this help"
                ;;
            *)
                echo "$input" >> "$temp_file"
                ;;
        esac
    done

    rm "$temp_file"
}

# Usage
edit_file "mydocument.txt"
```

### Data Validation
```bash
# Input validation functions
validate_number() {
    local input="$1"
    local min="$2"
    local max="$3"

    if [[ ! "$input" =~ ^[0-9]+$ ]]; then
        echo "Error: Please enter a valid number."
        return 1
    fi

    if [[ -n "$min" && "$input" -lt "$min" ]]; then
        echo "Error: Number must be at least $min."
        return 1
    fi

    if [[ -n "$max" && "$input" -gt "$max" ]]; then
        echo "Error: Number must be at most $max."
        return 1
    fi

    return 0
}

# Interactive data entry
get_valid_input() {
    local prompt="$1"
    local validator="$2"
    local result_var="$3"

    while true; do
        read -p "$prompt" input
        if $validator "$input"; then
            eval "$result_var='$input'"
            return 0
        fi
    done
}

# Usage examples
get_valid_input "Enter your age: " "validate_number" age
echo "Valid age: $age"

get_valid_input "Enter a number (1-100): " "validate_number 1 100" score
echo "Valid score: $score"
```

### Batch Processing
```bash
# Process multiple inputs
process_batch() {
    echo "Enter data (empty line to finish):"

    local -a inputs
    local count=0

    while true; do
        read -p "Item $((count + 1)): " input
        [[ -z "$input" ]] && break
        inputs[count]="$input"
        ((count++))
    done

    echo
    echo "You entered ${#inputs[@]} items:"
    for ((i=0; i<${#inputs[@]}; i++)); do
        printf "%2d: %s\n" $((i + 1)) "${inputs[$i]}"
    done
}

process_batch
```

### Multi-line Input
```bash
# Read multi-line input
read_multiline() {
    local prompt="$1"
    local delimiter="$2"

    echo "$prompt (end with $delimiter on new line):"
    local content=""
    local line

    while true; do
        read -r line
        [[ "$line" == "$delimiter" ]] && break
        content+="$line"$'\n'
    done

    echo -n "$content"
}

# Usage
story=$(read_multiline "Enter your story" "END")
echo "Your story:"
echo "$story"
```

### Progress Indicator
```bash
# Read with progress indicator
read_with_progress() {
    local timeout="$1"
    local prompt="$2"

    printf "%s (" "$prompt"
    local start_time=$(date +%s)

    # Start background progress indicator
    (
        while true; do
            local elapsed=$(($(date +%s) - start_time))
            local remaining=$((timeout - elapsed))
            if [[ $remaining -le 0 ]]; then
                printf "TIMEOUT"
                break
            fi
            printf "%d " "$remaining"
            sleep 1
            printf "\b\b\b\b"
        done
    ) &

    local progress_pid=$!

    # Read input
    local result
    read -t "$timeout" result
    local exit_code=$?

    # Kill progress indicator
    kill "$progress_pid" 2>/dev/null
    wait "$progress_pid" 2>/dev/null

    printf ") "

    if [[ $exit_code -eq 0 ]]; then
        echo "RECEIVED"
        echo "$result"
    else
        echo "TIMEOUT"
        return 1
    fi
}

# Usage
read_with_progress 10 "Enter your response"
```

## Advanced Techniques

### Custom Input Handling
```bash
# Read with character filtering
read_filtered() {
    local allowed_chars="$1"
    local prompt="$2"
    local result=""

    printf "%s" "$prompt"

    while true; do
        read -n 1 -s char
        [[ "$char" == $'\n' ]] && break
        [[ "$char" == $'\x7f' ]] && {  # Backspace
            [[ -n "$result" ]] && {
                result="${result%?}"
                printf "\b \b"
            }
            continue
        }

        if [[ "$allowed_chars" == *"$char"* ]]; then
            result+="$char"
            printf "%s" "$char"
        else
            printf "\a"  # Bell for invalid character
        fi
    done
    echo

    echo "$result"
}

# Usage: read only digits
number=$(read_filtered "0123456789" "Enter numbers only: ")
echo "You entered: $number"
```

### Interactive Grid Input
```bash
# 2D array input
read_grid() {
    local rows="$1"
    local cols="$2"
    local -a grid

    echo "Enter $rows x $cols grid data:"

    for ((i=0; i<rows; i++)); do
        echo "Row $((i + 1)): "
        while true; do
            read -p "  Column values (space-separated): " -a row_values
            if [[ ${#row_values[@]} -eq $cols ]]; then
                for ((j=0; j<cols; j++)); do
                    grid[$((i * cols + j))]="${row_values[$j]}"
                done
                break
            else
                echo "  Please enter exactly $cols values."
            fi
        done
    done

    # Display grid
    echo
    echo "Grid data:"
    for ((i=0; i<rows; i++)); do
        printf "  "
        for ((j=0; j<cols; j++)); do
            printf "%6s" "${grid[$((i * cols + j))]}"
        done
        echo
    done
}

# Usage
read_grid 3 4
```

## Best Practices

### Security Considerations
```bash
# Sanitize input
sanitize_input() {
    local input="$1"
    # Remove potentially dangerous characters
    echo "$input" | sed 's/[;&|`$(){}[]<>]//g'
}

# Use with read
read -p "Enter filename: " raw_filename
filename=$(sanitize_input "$raw_filename")

# Avoid eval with user input
# Dangerous: eval echo "$user_input"
# Safe: echo "$user_input"
```

### Error Handling
```bash
# Robust input function
safe_read() {
    local var_name="$1"
    local prompt="$2"
    local default="$3"
    local timeout="${4:-0}"

    local read_args=(-p "$prompt")
    [[ -n "$default" ]] && read_args+=(-i "$default")
    [[ "$timeout" -gt 0 ]] && read_args+=(-t "$timeout")

    if read "${read_args[@]}" "$var_name"; then
        # Input successful
        [[ -z "${!var_name}" && -n "$default" ]] && eval "$var_name='$default'"
        return 0
    else
        # Handle timeout or error
        [[ "$timeout" -gt 0 ]] && echo "Timeout" || echo "Error reading input"
        return 1
    fi
}

# Usage
safe_read username "Username: " "guest"
safe_read choice "Choice (y/n): " "" 10
```

## Performance Tips

```bash
# Use array assignment for multiple inputs
# Efficient
read -a <<< "one two three four"

# Less efficient for large files
while read line; do
    array+=("$line")
done < large_file.txt

# Use mapfile for large files
mapfile -t array < large_file.txt
```

## Related Commands

- `echo` - Display a line of text
- `printf` - Format and print data
- `mapfile`/`readarray` - Read lines into an array
- `select` - Create menus in shell scripts
- `stty` - Change terminal settings
- `IFS` - Internal Field Separator variable
- `getopts` - Parse positional parameters

## Portability Notes

- Most `read` options are POSIX compliant
- Some options like `-e`, `-i` are bash-specific
- Array support with `-a` varies between shells
- Timeout support may not be available in all shells
- Always test critical scripts on target systems