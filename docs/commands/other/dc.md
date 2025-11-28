---
title: dc - Desktop Calculator
sidebar_label: dc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dc - Desktop Calculator

The `dc` command is an arbitrary-precision calculator that uses Reverse Polish Notation (RPN) for calculations. It's one of the oldest Unix utilities, designed for mathematical computations with unlimited precision, making it ideal for complex calculations, scientific computing, and scripting. Unlike standard calculators, dc operates on a stack-based paradigm where numbers are pushed onto a stack and operations pop numbers from the stack to perform calculations. This makes it particularly powerful for batch processing and complex mathematical expressions in shell scripts.

## Basic Syntax

```bash
dc [OPTIONS] [FILE...]
```

## Common Options

### Input/Output Options
- `-e, --expression=STRING` - Evaluate the specified expression
- `-f, --file=FILE` - Execute commands from file
- `-h, --help` - Display help information
- `-V, --version` - Show version information
- `-i, --interactive` - Force interactive mode
- `-L, --no-line-editing` - Disable line editing

### Precision and Base
- `k` - Set precision (number of decimal places)
- `i` - Set input base
- `o` - Set output base
- `K` - Push current precision onto stack

## Stack Operations

### Basic Stack Commands
- `NUMBER` - Push number onto stack
- `p` - Print top of stack (without removing)
- `n` - Print top of stack and remove it
- `f` - Print entire stack
- `c` - Clear stack
- `d` - Duplicate top of stack
- `r` - Swap top two elements
- `z` - Push stack size onto stack

## Arithmetic Operations

### Basic Operations
- `+` - Addition: pop two numbers, push sum
- `-` - Subtraction: pop two numbers, push difference
- `*` - Multiplication: pop two numbers, push product
- `/` - Division: pop two numbers, push quotient
- `%` - Remainder: pop two numbers, push remainder
- `^` - Exponentiation: pop two numbers, push power
- `v` - Square root: pop number, push square root

### Advanced Mathematical Operations
- `~` - Division and remainder: push quotient and remainder
- `|` - Modulo exponentiation: push modular exponentiation result
- `!` - Factorial: pop number, push factorial
- `?` - Read input from user

## Register Operations

### Register Commands
- `sX` - Store top of stack in register X
- `lX` - Load value from register X and push onto stack
- `S` - Store top of stack in register from stack
- `L` - Load value from register from stack

### Register Stack Operations
- `:` - Store into array
- `;` - Load from array

## Control Structures

### Loops and Conditionals
- `[` - Start of string (macro definition)
- `]` - End of string (macro definition)
- `x` - Execute macro
- `>X` - Pop two values, execute macro X if first > second
- `<X` - Pop two values, execute macro X if first < second
- `=X` - Pop two values, execute macro X if first = second
- `!>` - Pop two values, execute macro X if first ≤ second
- `!<` - Pop two values, execute macro X if first ≥ second
- `!=` - Pop two values, execute macro X if first ≠ second

## Usage Examples

### Basic Calculator Operations

#### Simple Arithmetic
```bash
# Basic operations
echo "2 3 + p" | dc          # Output: 5
echo "10 4 - p" | dc         # Output: 6
echo "6 7 * p" | dc          # Output: 42
echo "15 3 / p" | dc         # Output: 5
echo "17 5 % p" | dc         # Output: 2

# Chain operations
echo "2 3 + 4 * p" | dc      # Output: 20 ( (2+3) * 4 )
echo "10 2 ^ p" | dc         # Output: 100 (10^2)
echo "16 v p" | dc           # Output: 4 (sqrt(16))
```

#### Precision Control
```bash
# Set precision for decimal calculations
echo "2 k 10 3 / p" | dc     # Output: 3.33 (precision 2)
echo "5 k 10 3 / p" | dc     # Output: 3.33333 (precision 5)
echo "10 k 22 7 / p" | dc    # Output: 3.1428571428 (π approximation)

# Change precision mid-calculation
echo "2 k 10 3 / p 5 k 10 3 / p" | dc
# Output: 3.33 (first result)
#         3.33333 (second result)
```

#### Base Conversions
```bash
# Convert between number bases
echo "2 i 1010 o p" | dc      # Binary to decimal: Output: 1010
echo "16 i FF o p" | dc       # Hex to decimal: Output: 255
echo "10 i 255 16 o p" | dc   # Decimal to hex: Output: FF
echo "10 i 42 2 o p" | dc     # Decimal to binary: Output: 101010

# Octal operations
echo "8 i 77 10 o p" | dc     # Octal 77 to decimal: Output: 63
echo "10 i 63 8 o p" | dc     # Decimal 63 to octal: Output: 77
```

### Advanced Mathematical Calculations

#### Scientific Computing
```bash
# Complex mathematical expressions
echo "5 k 100 2 / v p" | dc    # Square root of 50: Output: 7.07106
echo "3 k 3 14159 10000 / * p" | dc  # 3 * π ≈ 9.42477

# Exponential calculations
echo "2 10 ^ p" | dc           # 2^10: Output: 1024
echo "5 3 ^ p" | dc            # 5^3: Output: 125
echo "10 6 ^ p" | dc           # 10^6: Output: 1000000

# Factorial calculation
echo "5 [ 1 - d 1 <L ] sL d sX lX x p" | dc
# This macro calculates 5!: Output: 120
```

#### Statistical Operations
```bash
# Sum of series
echo "0 1 10 [ + ] S 1 lL x p" | dc  # Sum 1 to 10: Output: 55

# Average calculation
echo "5 8 12 3 7 + + + + 5 / p" | dc  # Average: Output: 7

# Variance calculation (simplified)
echo "10 k [ + ] S 5 10 [ + ] S / sX" | dc  # Set up for variance
```

### Programming and Scripting

#### Variables and Storage
```bash
# Using registers for storage
echo "5 sA 3 sB lA lB + p" | dc     # Store 5 in A, 3 in B, sum: Output: 8
echo "10 sX lX 2 * p" | dc           # Store 10, double it: Output: 20

# Register operations example
echo "2 sA 3 sB 4 sC lA lB + lC * p" | dc  # (2+3)*4: Output: 20
```

#### Loops and Iterations
```bash
# Simple loop: print squares 1-5
echo "[
    d d * p
    1 +
    d 5 <L
] sL 1 lL x" | dc

# Factorial loop
echo "1 [
    d *
    1 -
    d 1 <L
] sL 5 d lL x p" | dc  # 5!: Output: 120

# Sum of squares 1-10
echo "0 [
    d d * +
    1 -
    d 0 <L
] sL 10 d lL x p" | dc  # Sum squares: Output: 385
```

#### Conditional Logic
```bash
# Absolute value
echo "[
    0 <a 0 >b
] sa [
    1 - a
] sb [
    1 r
] sb 5 - p" | dc  # |5-10|: Output: 5

# Maximum of two numbers
echo "[
    <
    [ r ] sM 1
    >
    [ 1 ] sM 0
] sM 15 25 lM x p" | dc  # max(15,25): Output: 25
```

## Practical Examples

### System Administration

#### Disk Space Calculations
```bash
# Calculate disk usage percentages
#!/bin/bash
# disk_usage_calc.sh

# Get disk usage in KB
usage=$(df / | awk 'NR==2 {print $3}')
total=$(df / | awk 'NR==2 {print $2}')

# Calculate percentage using dc
percentage=$(echo "$usage $total * 100 / p" | dc)

echo "Disk usage: $percentage%"

# Format for display
echo "$usage KB used out of $total KB"
echo "Free space: $(echo "$total $usage - p" | dc) KB"
```

#### Memory Calculations
```bash
# Convert memory units
echo "1024 1024 * p" | dc              # MB to KB: 1048576
echo "1024 1024 * 1024 * p" | dc       # GB to KB: 1073741824

# Calculate memory efficiency
#!/bin/bash
used_mem=$(free -k | awk 'NR==2{print $3}')
total_mem=$(free -k | awk 'NR==2{print $2}')

# Calculate percentage with 2 decimal places
efficiency=$(echo "2 k $used_mem $total_mem * 100 / p" | dc)
echo "Memory efficiency: $efficiency%"
```

### Financial Calculations

#### Interest and Loan Calculations
```bash
# Compound interest calculation
principal=1000
rate=5    # 5%
years=10

# Calculate compound interest: P * (1 + r)^n
echo "2 k $principal 1 $rate 100 / + $years ^ p" | dc

# Simple interest
echo "2 k $principal $rate $years * 100 / + p" | dc

# Monthly loan payment (simplified)
loan_amount=10000
annual_rate=6
years=5

# Monthly rate and payments
monthly_rate=$(echo "2 k $annual_rate 12 / 100 / p" | dc)
months=$(echo "$years 12 * p" | dc)

echo "$loan_amount $monthly_rate * (1 + $monthly_rate) $months ^ / [ (1 + $monthly_rate) $months ^ - 1 ] / p" | dc
```

#### Currency Conversion
```bash
# Currency conversion rates
usd_to_eur=0.85
usd_to_gbp=0.73

convert_usd() {
    local amount=$1
    local rate=$2
    echo "2 k $amount $rate * p" | dc
}

echo "100 USD = $(convert_usd 100 $usd_to_eur) EUR"
echo "100 USD = $(convert_usd 100 $usd_to_gbp) GBP"

# Multiple currency conversions
echo "1000 [ 0.85 * p ] sE [ 0.73 * p ] sG lE x lG x" | dc
```

### Scientific and Engineering

#### Unit Conversions
```bash
# Temperature conversions
# Celsius to Fahrenheit: (C * 9/5) + 32
echo "2 k 25 9 * 5 / 32 + p" | dc  # 25°C to °F: Output: 77

# Fahrenheit to Celsius: (F - 32) * 5/9
echo "2 k 77 32 - 5 * 9 / p" | dc  # 77°F to °C: Output: 25

# Distance conversions
# Miles to kilometers: * 1.60934
echo "2 k 10 1.60934 * p" | dc  # 10 miles to km: Output: 16.09

# Kilometers to miles: / 1.60934
echo "2 k 16 1.60934 / p" | dc   # 16 km to miles: Output: 9.94
```

#### Physics Calculations
```bash
# Kinetic energy: KE = 0.5 * m * v^2
mass=10      # kg
velocity=5   # m/s
echo "2 k 0.5 $mass $velocity * * p" | dc  # KE: Output: 125.00

# Ohm's Law: V = I * R
current=2    # amperes
resistance=100  # ohms
echo "$current $resistance * p" | dc  # Voltage: Output: 200

# Power: P = V^2 / R
voltage=120
resistance=50
echo "$voltage $voltage * $resistance / p" | dc  # Power: Output: 288
```

### Advanced Usage

### Array Operations

#### Data Processing
```bash
# Store numbers in array
echo "0 1:A 1 1:A 2 2:A 3 3:A 4 4:A" | dc

# Read and process array
echo "0:A p 1:A p 2:A p 3:A p 4:A p" | dc  # Print array elements

# Sum array elements
echo "0 [ + ] S 0 5 [ ;A + ] L 1 lL x p" | dc  # Sum array
```

#### Matrix Operations (Simplified)
```bash
# 2x2 matrix determinant
echo "3 4 sA 1 2 sB lA lB * 4 1 * - p" | dc  # det[[3,4],[1,2]]: Output: 2

# Simple vector operations
echo "[ + ] S 1 2 3 4 5 5 [ ;V ] S 1 lL x p" | dc  # Vector sum
```

### Performance Calculations

#### Benchmarking
```bash
# Calculate operations per second
#!/bin/bash
operations=10000
start_time=$(date +%s.%N)

# Perform dc operations
for i in $(seq 1 $operations); do
    echo "$i $i * p" | dc > /dev/null
done

end_time=$(date +%s.%N)
duration=$(echo "$end_time $start_time - p" | dc -l)
ops_per_sec=$(echo "$operations $duration / p" | dc -l)

echo "Operations per second: $ops_per_sec"
```

#### Memory Usage Optimization
```bash
# Efficient large number calculations
echo "999999999 999999999 * p" | dc  # Large multiplication

# Memory-efficient factorial
echo "1 [ d * 1 - d 0 <L ] sL 100 d lL x p" | dc  # 100!
```

## Integration and Automation

### Shell Script Integration

#### Math Library Functions
```bash
#!/bin/bash
# mathlib.sh - Mathematical functions using dc

# Square function
square() {
    echo "$1 $1 * p" | dc
}

# Cube function
cube() {
    echo "$1 $1 * $1 * p" | dc
}

# Power function (base^exp)
power() {
    local base=$1
    local exp=$2
    echo "$base $exp ^ p" | dc
}

# Absolute value
abs() {
    echo "$1 0 < [ $1 1 - * ] sA lA x p" | dc
}

# Fibonacci sequence
fibonacci() {
    local n=$1
    echo "0 1 [
        d +
        1 -
        d 1 <L
    ] sL $n lL x p" | dc
}

# Usage examples
echo "Square of 5: $(square 5)"
echo "Cube of 3: $(cube 3)"
echo "2 to the power of 8: $(power 2 8)"
echo "Absolute value of -7: $(abs -7)"
echo "10th Fibonacci: $(fibonacci 10)"
```

#### Configuration Parser
```bash
#!/bin/bash
# config_parser.sh - Parse config files with numeric values

parse_config() {
    local config_file=$1

    while IFS='=' read -r key value; do
        if [[ $key =~ ^[0-9]+$ ]]; then
            echo "Key: $key, Value: $value"
            # Perform calculations if needed
            if [[ $value =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
                doubled=$(echo "$value 2 * p" | dc)
                echo "Doubled value: $doubled"
            fi
        fi
    done < "$config_file"
}

# Example usage
echo "CPU_COUNT=4
MEMORY_GB=16
DISK_SIZE=500" > sample.conf

parse_config sample.conf
```

### Batch Processing

#### Multiple File Processing
```bash
#!/bin/bash
# batch_calculator.sh

# Process multiple files with numbers
for file in data/*.txt; do
    if [ -f "$file" ]; then
        echo "Processing $file"

        # Sum all numbers in file
        sum=$(awk '{sum+=$1} END {print sum}' "$file")
        count=$(wc -l < "$file")
        average=$(echo "$sum $count / p" | dc)

        echo "Sum: $sum"
        echo "Average: $average"
        echo "---"
    fi
done
```

#### Log Analysis
```bash
#!/bin/bash
# log_analyzer.sh - Analyze numeric data in logs

analyze_log() {
    local log_file=$1

    # Extract numbers and calculate statistics
    numbers=$(grep -oE '[0-9]+(\.[0-9]+)?' "$log_file")

    if [ -n "$numbers" ]; then
        sum=$(echo "$numbers" | paste -sd+ | dc)
        count=$(echo "$numbers" | wc -l)
        average=$(echo "$sum $count / p" | dc)

        echo "Total numbers: $count"
        echo "Sum: $sum"
        echo "Average: $average"
    fi
}
```

## Troubleshooting

### Common Issues

#### Precision Problems
```bash
# Issue: Unexpected rounding
echo "10 3 / p" | dc           # Output: 3 (integer division)
echo "2 k 10 3 / p" | dc       # Output: 3.33 (with precision)

# Solution: Always set precision for decimal calculations
echo "10 k 22 7 / p" | dc      # High precision π approximation
```

#### Stack Underflow
```bash
# Issue: Stack underflow error
echo "+ p" | dc               # Error: stack empty

# Solution: Ensure stack has enough operands
echo "2 3 + p" | dc           # Works: Output: 5

# Check stack before operations
echo "z p" | dc               # Print stack size
```

#### Base Conversion Issues
```bash
# Issue: Wrong base interpretation
echo "2 i FF o p" | dc        # Error: F not valid in binary

# Solution: Use appropriate bases
echo "16 i FF 10 o p" | dc    # Hex to decimal
echo "10 i 255 16 o p" | dc    # Decimal to hex
```

#### Complex Expression Debugging
```bash
# Debug complex expressions by breaking them down
echo "2 3 + 4 * 5 + p" | dc   # Break down: (2+3)*4+5
# Step by step:
echo "2 3 + p" | dc           # 5
echo "5 4 * p" | dc           # 20
echo "20 5 + p" | dc          # 25

# Use stack printing for debugging
echo "2 3 4 5 f p" | dc       # Show stack state
```

### Performance Issues

#### Slow Calculations
```bash
# Issue: Slow factorial calculation for large numbers
echo "[ d * 1 - d 1 <L ] sL 10000 d lL x p" | dc  # Very slow

# Solution: Use optimized algorithms
echo "1 [
    d *
    2 -
    d 0 <L
] sL 10000 d lL x p" | dc  # Faster version
```

#### Memory Usage
```bash
# Monitor memory usage with large calculations
/usr/bin/time -v dc << EOF
2 k 1000000 1000000 * p
EOF

# Use memory-efficient operations
echo "999999999 1 + p" | dc    # More efficient than direct large number
```

## Related Commands

- [`bc`](/docs/commands/other/bc) - Basic calculator with infix notation
- [`expr`](/docs/commands/other/expr) - Evaluate expressions
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning with arithmetic
- [`python`](/docs/commands/development/python) - Python calculator
- [`ruby`](/docs/commands/development/ruby) - Ruby calculator
- [`perl`](/docs/commands/file-management/perl) - Perl arithmetic operations
- [`let`](/docs/commands/system-information/let) - Shell arithmetic evaluation

## Best Practices

1. **Always set precision** (`k`) for decimal calculations
2. **Use registers** (`s`, `l`) for complex calculations to avoid stack confusion
3. **Check stack size** (`z`) before operations that require multiple operands
4. **Set appropriate bases** (`i`, `o`) for number base conversions
5. **Use macros** for repetitive calculations
6. **Break complex expressions** into smaller, testable parts
7. **Use `f` command** to debug stack contents
8. **Consider using `bc`** for simpler arithmetic when RPN isn't needed
9. **Document complex macros** with comments
10. **Test with small numbers** before scaling to large calculations

## Performance Tips

1. **Use integer operations** when possible for better performance
2. **Minimize precision** to only what's needed for the calculation
3. **Reuse stored values** in registers instead of recalculating
4. **Avoid unnecessary stack operations** to reduce overhead
5. **Use efficient algorithms** for complex calculations like factorial
6. **Batch operations** when processing multiple calculations
7. **Consider parallel processing** for independent calculations
8. **Monitor memory usage** for very large number calculations
9. **Use appropriate precision levels** to balance accuracy and speed
10. **Leverage dc's unlimited precision** when standard calculators would overflow

The `dc` command is a powerful, stack-based calculator that excels at arbitrary-precision arithmetic and complex mathematical operations. While its RPN syntax may seem counterintuitive at first, it provides excellent control over calculations and is particularly valuable in shell scripting, scientific computing, and situations where precision is critical. Its unlimited precision capabilities make it indispensable for calculations that would overflow standard calculators or floating-point units.