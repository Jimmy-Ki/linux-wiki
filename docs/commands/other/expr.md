---
title: expr - Evaluate Expressions
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# expr - Evaluate Expressions

The `expr` command evaluates expressions and prints the result. It supports integer arithmetic, string operations, and regular expression matching. While bash and other modern shells provide built-in arithmetic capabilities, `expr` remains useful for portable scripts and complex operations.

## Basic Syntax

```bash
expr EXPRESSION
expr OPTION
```

## Common Options

- `--help` - Display help information and exit
- `--version` - Show version information and exit

## Expression Types

### Arithmetic Operations
- `ARG1 + ARG2` - Addition
- `ARG1 - ARG2` - Subtraction
- `ARG1 \* ARG2` - Multiplication (must escape the asterisk)
- `ARG1 / ARG2` - Integer division
- `ARG1 % ARG2` - Modulo (remainder)

### String Operations
- `ARG1 : ARG2` - Regular expression matching
- `match STRING REGEX` - Same as `STRING : REGEX`
- `substr STRING POS LENGTH` - Extract substring
- `index STRING CHARS` - Find position of characters
- `length STRING` - Length of string
- `+ TOKEN` - Interpret TOKEN as string, even if it's a keyword

### Logical Operations
- `ARG1 \| ARG2` - OR (returns ARG1 if non-zero, otherwise ARG2)
- `ARG1 \& ARG2` - AND (returns ARG1 if both are non-zero, otherwise 0)

### Comparison Operations
- `ARG1 = ARG2` - Equal
- `ARG1 != ARG2` - Not equal
- `ARG1 \< ARG2` - Less than (escape the angle bracket)
- `ARG1 \<= ARG2` - Less than or equal
- `ARG1 \> ARG2` - Greater than (escape the angle bracket)
- `ARG1 \>= ARG2` - Greater than or equal

## Usage Examples

### Basic Arithmetic
```bash
# Simple calculations
expr 2 + 3           # Output: 5
expr 10 - 4          # Output: 6
expr 5 \* 3          # Output: 15
expr 20 / 4          # Output: 5
expr 10 % 3          # Output: 1

# Using variables
a=10
b=3
expr $a + $b         # Output: 13
expr $a \* $b        # Output: 30

# Complex expressions (note the backticks for command substitution)
result=`expr $a + $b \* 2`
echo $result         # Output: 16

# Integer division only
expr 7 / 2           # Output: 3 (integer division)
expr 7 % 2           # Output: 1 (remainder)
```

### String Operations
```bash
# String length
expr length "hello world"           # Output: 11
text="Linux"
expr length "$text"                # Output: 5

# Substring extraction
expr substr "hello world" 1 5      # Output: hello
expr substr "hello world" 7 5      # Output: world

# Character position (1-based indexing)
expr index "hello world" "o"       # Output: 5 (first 'o')
expr index "hello world" "lo"      # Output: 4 (first occurrence of any character)
expr index "hello world" "z"       # Output: 0 (not found)

# String matching with regex
expr "hello world" : "h.*"         # Output: 11 (matches "hello world")
expr "hello world" : "h.*o"        # Output: 5 (matches "hello")
expr "hello world" : "world"       # Output: 5 (exact match)
expr "hello world" : "xyz"         # Output: 0 (no match)

# Alternative match syntax
expr match "hello world" "h.*"     # Output: 11
```

### Comparison Operations
```bash
# String comparisons
expr "apple" = "apple"             # Output: 1 (true)
expr "apple" = "orange"            # Output: 0 (false)

# Numeric comparisons
expr 10 = 10                       # Output: 1
expr 10 != 5                       # Output: 1
expr 10 \> 5                       # Output: 1
expr 5 \< 10                       # Output: 1
expr 10 \<= 10                     # Output: 1
expr 10 \>= 5                      # Output: 1

# String comparisons (lexicographic)
expr "apple" \< "banana"           # Output: 1
expr "zebra" \> "apple"            # Output: 1
```

### Logical Operations
```bash
# OR operation
expr 5 \| 0                        # Output: 5 (first argument non-zero)
expr 0 \| 7                        # Output: 7 (first is zero, use second)
expr 0 \| 0                        # Output: 0

# AND operation
expr 5 \& 3                        # Output: 5 (both non-zero)
expr 5 \& 0                        # Output: 0 (second is zero)
expr 0 \& 3                        # Output: 0 (first is zero)

# Combined with comparisons
expr 5 \> 3 \& 3 \< 7              # Output: 1
expr 5 \> 10 \| 8 \> 3             # Output: 1
```

## Practical Examples

### Calculator Script
```bash
#!/bin/bash
# Simple calculator using expr

simple_calculator() {
    echo "Simple Calculator"
    echo "Usage: ./calc.sh NUMBER1 OPERATOR NUMBER2"
    echo "Operators: + - * / %"

    if [[ $# -ne 3 ]]; then
        echo "Error: Invalid number of arguments"
        echo "Example: $0 10 + 5"
        exit 1
    fi

    num1="$1"
    op="$2"
    num2="$3"

    case "$op" in
        "+")
            result=$(expr $num1 + $num2)
            ;;
        "-")
            result=$(expr $num1 - $num2)
            ;;
        "*")
            result=$(expr $num1 \* $num2)
            ;;
        "/")
            if [[ "$num2" -eq 0 ]]; then
                echo "Error: Division by zero"
                exit 1
            fi
            result=$(expr $num1 / $num2)
            ;;
        "%")
            result=$(expr $num1 % $num2)
            ;;
        *)
            echo "Error: Unknown operator $op"
            exit 1
            ;;
    esac

    echo "$num1 $op $num2 = $result"
}

# Usage
simple_calculator "$@"
```

### File Size Calculator
```bash
# Calculate total file sizes
calculate_total_size() {
    local total=0

    for file in "$@"; do
        if [[ -f "$file" ]]; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            if [[ -n "$size" ]]; then
                total=$(expr $total + $size)
                echo "$file: $size bytes"
            fi
        else
            echo "File not found: $file"
        fi
    done

    echo "Total: $total bytes"
    echo "Total: $(expr $total / 1024) KB"
    echo "Total: $(expr $total / 1048576) MB"
}

# Usage
calculate_total_size *.txt *.sh
```

### String Processing
```bash
# String validation functions
validate_email() {
    local email="$1"

    # Check for @ symbol
    at_pos=$(expr index "$email" "@")
    if [[ "$at_pos" -eq 0 ]]; then
        echo "Invalid: Missing @"
        return 1
    fi

    # Check for domain
    domain=$(expr substr "$email" $(expr $at_pos + 1) 100)
    dot_pos=$(expr index "$domain" ".")
    if [[ "$dot_pos" -eq 0 ]]; then
        echo "Invalid: Missing domain"
        return 1
    fi

    echo "Valid email: $email"
    return 0
}

# Username validation
validate_username() {
    local username="$1"
    local length=$(expr length "$username")

    if [[ "$length" -lt 3 ]]; then
        echo "Username too short (minimum 3 characters)"
        return 1
    fi

    if [[ "$length" -gt 20 ]]; then
        echo "Username too long (maximum 20 characters)"
        return 1
    fi

    # Check if alphanumeric
    if [[ $(expr match "$username" "^[a-zA-Z0-9_]*$") -eq 0 ]]; then
        echo "Username must contain only letters, numbers, and underscores"
        return 1
    fi

    echo "Valid username: $username"
    return 0
}

# Usage examples
validate_email "user@example.com"
validate_username "john_doe123"
```

### Date and Time Calculations
```bash
# Days until a date
days_until() {
    local target_date="$1"
    local current_date=$(date +%s)
    local target_timestamp=$(date -d "$target_date" +%s 2>/dev/null)

    if [[ -z "$target_timestamp" ]]; then
        echo "Invalid date format"
        return 1
    fi

    local diff_seconds=$(expr $target_timestamp - $current_date)
    local diff_days=$(expr $diff_seconds / 86400)

    if [[ "$diff_days" -lt 0 ]]; then
        echo "Date $target_date was $(expr 0 - $diff_days) days ago"
    elif [[ "$diff_days" -eq 0 ]]; then
        echo "Date $target_date is today!"
    else
        echo "Date $target_date is $diff_days days away"
    fi
}

# Age calculator
calculate_age() {
    local birth_date="$1"
    local birth_year=$(expr substr "$birth_date" 1 4)
    local current_year=$(date +%Y)
    local age=$(expr $current_year - $birth_year)

    echo "Born in $birth_year, you are $age years old"
}

# Usage
days_until "2024-12-31"
calculate_age "1990-06-15"
```

### Game Logic
```bash
# Simple number guessing game
number_guessing_game() {
    local secret=$((RANDOM % 100 + 1))
    local attempts=0
    local max_attempts=7

    echo "Guess the number (1-100). You have $max_attempts attempts."

    while [[ $attempts -lt $max_attempts ]]; do
        read -p "Enter your guess: " guess

        # Validate input
        if [[ $(expr match "$guess" "^[0-9]*$") -eq 0 ]]; then
            echo "Please enter a valid number."
            continue
        fi

        attempts=$(expr $attempts + 1)

        if [[ "$guess" -eq "$secret" ]]; then
            echo "Congratulations! You guessed it in $attempts attempts!"
            return 0
        elif [[ "$guess" -lt "$secret" ]]; then
            echo "Too low!"
        else
            echo "Too high!"
        fi

        local remaining=$(expr $max_attempts - $attempts)
        echo "Attempts remaining: $remaining"
    done

    echo "Game over! The number was $secret."
    return 1
}

# Usage
number_guessing_game
```

### File Processing
```bash
# Count words in files
count_words() {
    local total_words=0

    for file in "$@"; do
        if [[ -f "$file" ]]; then
            local file_words=0
            while read -r line; do
                local line_words=$(expr "$line" : ".*")
                # Simple word count (approximate)
                local count=$(expr "$line" : "[^ ]*")
                while [[ "$line" != "" ]]; do
                    file_words=$(expr $file_words + 1)
                    line="${line#* }"
                done
            done < "$file"

            echo "$file: $file_words words"
            total_words=$(expr $total_words + $file_words)
        fi
    done

    echo "Total words: $total_words"
}

# Find palindromes in a file
find_palindromes() {
    local file="$1"

    while read -r word; do
        local length=$(expr length "$word")
        local reversed=""

        # Reverse the word
        for ((i=length; i>0; i--)); do
            reversed="$reversed$(expr substr "$word" $i 1)"
        done

        if [[ "$word" == "$reversed" ]]; then
            echo "Palindrome: $word"
        fi
    done < "$file"
}

# Usage
count_words *.txt
find_palindromes words.txt
```

### System Administration
```bash
# Disk usage checker
check_disk_space() {
    local threshold=80
    local df_output=$(df / | tail -1)
    local usage_percent=$(echo "$df_output" | awk '{print $5}' | sed 's/%//')

    if [[ $(expr $usage_percent \> $threshold) -eq 1 ]]; then
        echo "WARNING: Disk usage is ${usage_percent}% (threshold: ${threshold}%)"
        return 1
    else
        echo "OK: Disk usage is ${usage_percent}%"
        return 0
    fi
}

# Process monitor
monitor_process() {
    local process_name="$1"
    local max_mem=100000  # 100MB in KB

    if pgrep "$process_name" > /dev/null; then
        local pid=$(pgrep "$process_name")
        local mem_usage=$(ps -p "$pid" -o rss= | tr -d ' ')

        if [[ $(expr $mem_usage \> $max_mem) -eq 1 ]]; then
            echo "Process $process_name (PID: $pid) using excessive memory: $(expr $mem_usage / 1024)MB"
            return 1
        else
            echo "Process $process_name (PID: $pid) memory usage OK: $(expr $mem_usage / 1024)MB"
            return 0
        fi
    else
        echo "Process $process_name not running"
        return 1
    fi
}

# Usage
check_disk_space
monitor_process "nginx"
```

### Mathematical Operations
```bash
# Factorial calculator
factorial() {
    local n="$1"
    local result=1

    for ((i=1; i<=n; i++)); do
        result=$(expr $result \* $i)
    done

    echo "Factorial of $n is $result"
}

# Greatest Common Divisor
gcd() {
    local a="$1"
    local b="$2"

    while [[ "$b" -ne 0 ]]; do
        local temp=$(expr $a % $b)
        a="$b"
        b="$temp"
    done

    echo "GCD of $1 and $2 is $a"
}

# Fibonacci sequence
fibonacci() {
    local n="$1"
    local a=0
    local b=1
    local count=0

    echo "Fibonacci sequence (first $n numbers):"
    while [[ $count -lt $n ]]; do
        echo -n "$a "
        local temp=$a
        a=$(expr $a + $b)
        b=$temp
        count=$(expr $count + 1)
    done
    echo
}

# Usage
factorial 5
gcd 12 18
fibonacci 10
```

## Best Practices

### Error Handling
```bash
# Safe arithmetic with expr
safe_expr() {
    local expression="$1"
    local result

    # Validate that inputs are integers
    if [[ ! "$expression" =~ ^[0-9\+\-\*\/%\(\)\ ]+$ ]]; then
        echo "Error: Invalid characters in expression"
        return 1
    fi

    result=$(expr "$expression" 2>/dev/null)
    local exit_code=$?

    if [[ $exit_code -ne 0 ]]; then
        echo "Error: Invalid expression"
        return 1
    fi

    echo "$result"
    return 0
}

# Usage
result=$(safe_expr "10 + 5")
if [[ $? -eq 0 ]]; then
    echo "Result: $result"
fi
```

### Performance Considerations
```bash
# Use shell arithmetic for simple operations
# Fast (bash built-in)
result=$((10 + 5))
result=$((10 * 5))

# Slower (external command)
result=$(expr 10 + 5)
result=$(expr 10 \* 5)

# Use expr for complex string operations
substring_length=$(expr substr "$text" 1 5 | wc -c)
```

### Portability
```bash
# Test expr availability
if command -v expr >/dev/null 2>&1; then
    echo "expr is available"
else
    echo "expr not found, using alternatives"
    # Use shell arithmetic or other tools
fi

# Fallback for systems without expr
portable_math() {
    local op="$1"
    local a="$2"
    local b="$3"

    if command -v expr >/dev/null 2>&1; then
        case "$op" in
            "+") expr $a + $b ;;
            "-") expr $a - $b ;;
            "*") expr $a \* $b ;;
            "/") expr $a / $b ;;
            *) echo "Unsupported operation" >&2; return 1 ;;
        esac
    else
        # Fallback to shell arithmetic
        case "$op" in
            "+") echo $(($a + $b)) ;;
            "-") echo $(($a - $b)) ;;
            "*") echo $(($a * $b)) ;;
            "/") echo $(($a / $b)) ;;
            *) echo "Unsupported operation" >&2; return 1 ;;
        esac
    fi
}
```

## Related Commands

- `let` - Evaluate arithmetic expressions (bash built-in)
- `bc` - Arbitrary precision calculator
- `awk` - Pattern scanning and processing language
- `test` - Evaluate expressions
- `[` - Evaluate expressions (builtin)
- `$((...))` - Arithmetic expansion (shell feature)
- `dc` - Desk calculator

## Portability Notes

- `expr` is specified by POSIX and highly portable
- Some implementations may have slight differences in regex behavior
- All arithmetic is integer-based (no floating point)
- String indices are 1-based in expr, 0-based in most shell features
- Performance is generally slower than shell built-in arithmetic
- Always quote expressions to prevent shell expansion issues