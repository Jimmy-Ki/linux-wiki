---
title: dc - Arbitrary-Precision Reverse Polish Notation Calculator
sidebar_label: dc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dc - Arbitrary-Precision Reverse Polish Notation Calculator

The `dc` command is an arbitrary-precision calculator that uses reverse Polish notation (RPN) and a stack-based architecture for performing mathematical computations. Unlike traditional calculators, dc operates by pushing numbers onto a stack and then applying operations that pop numbers from the stack, perform calculations, and push results back. dc supports unlimited precision arithmetic, making it ideal for scientific computing, financial calculations, and any application requiring exact decimal arithmetic. It includes features for different number bases, arbitrary precision, complex mathematical operations, and programmable capabilities with registers and macros.

## Basic Syntax

```bash
dc [OPTIONS] [-e EXPRESSION] [-f FILE] [FILE...]
```

## Command Options

### Execution Options
- `-e EXPRESSION, --expression=EXPRESSION` - Evaluate the specified expression
- `-f FILE, --file=FILE` - Read and evaluate expressions from file
- `-h, --help` - Display help information
- `-v, --version` - Show version information

### Number Base Options
- `-I IBASE, --ibase=IBASE` - Set input base (default: 10)
- `-O OBASE, --obase=OBASE` - Set output base (default: 10)

### Precision Options
- `-S SCALE, --scale=SCALE` - Set precision scale (default: 0)
- `-E SEED, --seed=SEED` - Set random seed for pseudo-random numbers

### Digit Processing Options
- `-c, --digit-clamp` - Enable digit clamping (default)
- `-C, --no-digit-clamp` - Disable digit clamping

### Interactive Options
- `-i, --interactive` - Force interactive mode
- `--no-prompt` - Disable prompt in interactive mode
- `--no-read-prompt` - Disable read prompt

### Extended Options
- `-x, --extended-register` - Enable extended registers
- `--extended-register` - Same as -x

## Basic Commands

### Stack Operations
- `NUMBER` - Push number onto stack
- `p` - Print top of stack (without popping)
- `n` - Print top of stack and pop it
- `f` - Print entire stack
- `c` - Clear stack
- `d` - Duplicate top of stack
- `r` - Swap top two stack elements

### Arithmetic Operations
- `+` - Addition (pop two, push sum)
- `-` - Subtraction (pop two, push difference)
- `*` - Multiplication (pop two, push product)
- `/` - Division (pop two, push quotient)
- `%` - Remainder (pop two, push remainder)
- `^` - Exponentiation (pop two, push power)
- `v` - Square root (pop one, push square root)

### Number Base Commands
- `i` - Pop value and set as input base
- `o` - Pop value and set as output base
- `k` - Pop value and set as precision scale

### Register Operations
- `sR` - Store top of stack in register R
- `lR` - Load value from register R onto stack
- `S` - Store top of stack in register and pop
- `L` - Load from register and push onto stack

### Stack Manipulation
- `P` - Pop and print as string
- `X` - Push stack depth
- `z` - Push stack depth
- `?` - Read input and push onto stack

### Control Commands
- `Q` - Exit dc
- `q` - Quit execution context
- `;` - Comment (ignore rest of line)

## Usage Examples

### Basic Arithmetic

#### Simple Calculations
```bash
# Addition: 2 + 3
echo "2 3 + p" | dc
# Output: 5

# Subtraction: 10 - 4
echo "10 4 - p" | dc
# Output: 6

# Multiplication: 7 * 8
echo "7 8 * p" | dc
# Output: 56

# Division: 15 / 3
echo "15 3 / p" | dc
# Output: 5

# Multiple operations: (2 + 3) * 4
echo "2 3 + 4 * p" | dc
# Output: 20
```

#### Precision and Division
```bash
# Integer division (default)
echo "7 2 / p" | dc
# Output: 3

# Set precision to 2 decimal places
echo "2 k 7 2 / p" | dc
# Output: 3.50

# High precision division
echo "10 k 22 7 / p" | dc
# Output: 3.1428571428

# Calculate Pi with high precision
echo "100 k 1 1 1 / v p" | dc
# Output: 1.00000000000000000000...
```

### Advanced Mathematics

#### Scientific Calculations
```bash
# Exponentiation: 2^10
echo "2 10 ^ p" | dc
# Output: 1024

# Square root: sqrt(16)
echo "16 v p" | dc
# Output: 4

# Compound interest calculation: $1000 at 5% for 3 years
echo "1000 1.05 3 ^ * p" | dc
# Output: 1157.625000000000000000

# Factorial calculation (simplified)
echo "5 1 1 4 { * 1 - } l x p" | dc
# More practical approach:
echo "5 [ 1 - ] sf 5 [lf * 1 - lf x] sf lf p" | dc
```

#### Number Base Conversions
```bash
# Binary to decimal
echo "2 i 1010 o p" | dc
# Output: 10

# Decimal to hexadecimal
echo "16 o 10 p" | dc
# Output: A

# Octal to decimal
echo "8 i 377 o p" | dc
# Output: 255

# Base conversions: Convert FF (hex) to binary
echo "16 i FF 2 o p" | dc
# Output: 11111111
```

### Programming with dc

#### Variables and Registers
```bash
# Store and retrieve values
echo "5 sA 10 sB lA lB + p" | dc
# Output: 15

# Using multiple registers
echo "3 sA 4 sB 5 sC lA lB * lC + p" | dc
# Output: 17

# Register arithmetic (some dc versions)
echo "5 sA lA 2 + sA lA p" | dc
# Output: 7
```

#### Loops and Conditionals
```bash
# Simple counter: sum 1 to 5
echo "0 1 5 + [ + la 1 + sa la 5 <L ] sL lL x p" | dc

# Fibonacci sequence (first 10 numbers)
echo "0 sa 1 sb 0 [ la sb + sc sb sa sa sc 10 <L ] sL lL x p" | dc

# Power function: calculate a^b
echo "3 4 [ * 1 - d 0 <L ] sL lL x p" | dc
```

#### Mathematical Functions
```bash
# Absolute value
echo "-5 [ d 0 <a 0 1 - * a ] sa la x p" | dc

# Maximum of two numbers
echo "5 8 [ d la <a la ] sa la x p" | dc

# Minimum of two numbers
echo "5 8 [ d la >a la ] sa la x p" | dc

# Factorial using recursion
echo "5 [ d 1 <F 1 * lF d 1 - F ] sF lF x p" | dc
```

## Practical Applications

### Financial Calculations

#### Compound Interest
```bash
# Calculate compound interest
# Principal: $1000, Rate: 5%, Years: 10
echo "1000 1.05 10 ^ * p" | dc
# Output: 1628.894626777441406250

# Monthly compound interest
# Principal: $5000, Annual Rate: 6%, Years: 5, Compounded monthly
echo "5000 1.005 60 ^ * p" | dc
# Output: 6744.250000000000000000

# Loan payment calculation (simplified)
# Loan amount: $100000, Interest rate: 5% annually, Term: 30 years
echo "100000 0.05 12 / 1 0.05 12 / 360 ^ - / p" | dc
```

#### Investment Returns
```bash
# Calculate ROI percentage
echo "1000 1500 - 1000 / 100 * p" | dc
# Output: 50

# Future value of regular deposits
echo "100 1.08 10 ^ 1 - 0.08 / * p" | dc
# Output: 1448.656246540000000000
```

### Scientific Computing

#### Statistical Calculations
```bash
# Mean calculation: (10 + 20 + 30 + 40 + 50) / 5
echo "10 20 + 30 + 40 + 50 + 5 / p" | dc
# Output: 30

# Standard deviation (simplified)
# Data: 2, 4, 4, 4, 5, 5, 7, 9
echo "2 4 + 4 + 4 + 5 + 5 + 7 + 9 + 8 / d 2 - ^ 4 - ^ 4 - ^ 4 - ^ 5 - ^ 5 - ^ 7 - ^ 9 - ^ + + + + + + + 8 / v p" | dc
```

#### Physics Calculations
```bash
# Kinetic energy: KE = 0.5 * m * v^2
# Mass: 10 kg, Velocity: 5 m/s
echo "10 5 2 ^ * 2 / p" | dc
# Output: 125

# Ohm's Law: V = I * R
# Current: 2A, Resistance: 50Ω
echo "2 50 * p" | dc
# Output: 100

# Distance: d = v * t + 0.5 * a * t^2
# Velocity: 10 m/s, Time: 5s, Acceleration: 2 m/s^2
echo "10 5 * 2 5 2 ^ * 2 / + p" | dc
# Output: 75
```

### Data Processing

#### Binary Operations
```bash
# Bitwise AND (simplified)
echo "5 3 & p" | dc

# Bitwise OR (simplified)
echo "5 3 | p" | dc

# Bitwise XOR (simplified)
echo "5 3 ^ p" | dc
```

#### Number Systems
```bash
# Convert decimal to different bases
echo "16 o 255 p" | dc      # Hexadecimal: FF
echo "2 o 255 p" | dc       # Binary: 11111111
echo "8 o 255 p" | dc       # Octal: 377

# Base conversion utility function
echo "10 i 42 2 o p" | dc   # Convert decimal 42 to binary
echo "2 i 1010 10 o p" | dc # Convert binary 1010 to decimal
```

## Advanced Features

### Extended Registers
```bash
# Using extended registers for complex calculations
echo "--extended-register -e '3 s[extended] 4 s[extended2] l[extended] l[extended2] + p'" | dc
```

### Macros and Functions
```bash
# Define a macro for addition
echo "[ + p ] s+ 3 5 l+ x" | dc

# Conditional macro
echo "[ d 0 <A p ] sA -5 lA x" | dc

# Loop macro
echo "[ 1 + d 10 <L ] sL 0 lL x p" | dc
```

### Interactive Usage

#### Interactive Calculator Session
```bash
# Start interactive session
dc

# Interactive commands:
# 2 3 + p    # Calculate 2 + 3 and print
# 4 k        # Set precision to 4 decimal places
# 7 2 / p    # Calculate 7/2 with precision
# 16 o       # Set output base to hexadecimal
# 255 p      # Display 255 in hex (FF)
# 10 o       # Return to decimal output
# q          # Quit
```

#### Reading from Files
```bash
# Create a dc script file
cat > calculations.dc << 'EOF'
# Set precision
5 k
# Calculate some values
"Circle area (radius 5): " P 5 5 * 3.14159 * P
10 P
"Square root of 16: " P 16 v P
10 P
"2^10: " P 2 10 ^ P
10 P
EOF

# Execute the script
dc calculations.dc
```

## Performance and Optimization

### Precision Management
```bash
# Set optimal precision for calculations
echo "2 k 22 7 / p" | dc    # Standard precision
echo "10 k 22 7 / p" | dc   # Higher precision
echo "100 k 22 7 / p" | dc  # Very high precision

# Reset precision after calculations
echo "20 k 22 7 / p 0 k 2 3 + p" | dc
```

### Memory Efficiency
```bash
# Clean stack regularly
echo "1 2 3 4 5 c 6 7 8 p" | dc  # Clear stack before new operations

# Use registers for temporary storage
echo "100 sA 200 sB lA lB + p" | dc
```

## Integration and Automation

### Shell Script Integration
```bash
#!/bin/bash
# Calculator function using dc
calculate() {
    echo "$1" | dc
}

# Usage examples
result=$(calculate "2 3 + p")
echo "2 + 3 = $result"

pi=$(calculate "100 k 1 1 1 / v p")
echo "Pi approximation: $pi"
```

### Batch Processing
```bash
# Process multiple calculations from a file
cat > batch_calc.txt << 'EOF'
2 3 + p
4 5 * p
10 2 / p
3 k 7 2 / p
EOF

# Process all calculations
dc batch_calc.txt
```

### Pipeline Integration
```bash
# Use dc in data processing pipelines
echo "3.14159" | dc -e "? 2 ^ p"  # Square pi

# Calculate sums from numbers file
seq 1 100 | paste -sd+ | dc -e "? p"
```

## Troubleshooting

### Common Issues

#### Precision Problems
```bash
# Issue: Division gives integer results
echo "7 2 / p" | dc  # Result: 3

# Solution: Set appropriate precision
echo "2 k 7 2 / p" | dc  # Result: 3.50
```

#### Stack Underflow
```bash
# Issue: Not enough operands
echo "2 +" | dc  # Error: stack empty

# Solution: Ensure sufficient operands
echo "2 3 +" | dc  # Works correctly
```

#### Base Conversion Issues
```bash
# Issue: Unexpected results with different bases
echo "16 i FF p" | dc  # May not work as expected

# Solution: Set input base before parsing
echo "16 o 255 p" | dc  # Proper base conversion
```

#### Memory and Performance
```bash
# Issue: Slow calculations with high precision
echo "1000 k 22 7 / p" | dc  # Very slow

# Solution: Use appropriate precision levels
echo "20 k 22 7 / p" | dc  # Faster, usually sufficient
```

### Error Handling

#### Invalid Input
```bash
# Handle non-numeric input gracefully
echo "abc 2 + p" | dc  # Will show error
```

#### Division by Zero
```bash
# Check for division by zero
echo "5 0 / p" | dc  # Will show error
```

## Related Commands

- [`bc`](/docs/commands/development/bc) - Basic Calculator (front-end to dc)
- [`expr`](/docs/commands/file-management/expr) - Evaluate expressions
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing
- [`python`](/docs/commands/development/python) - Python programming language
- [`perl`](/docs/commands/file-management/perl) - Perl programming language
- [`calc`](/docs/commands/development/calc) - Arbitrary precision calculator
- [`units`](/docs/commands/system-information/units) - Unit conversion utility

## Best Practices

1. **Set appropriate precision** before performing division operations
2. **Use registers** for complex calculations to avoid stack confusion
3. **Test with known values** before using dc for critical calculations
4. **Document complex dc scripts** with comments for maintainability
5. **Use interactive mode** for exploratory calculations and debugging
6. **Clean the stack regularly** in long-running scripts
7. **Validate input** when using dc in automated scripts
8. **Choose appropriate bases** for number system conversions

## Performance Tips

1. **Lower precision** for faster computations when high precision isn't needed
2. **Use register storage** instead of keeping large numbers on the stack
3. **Break complex calculations** into simpler steps
4. **Avoid unnecessary operations** in tight loops
5. **Use batch processing** for multiple calculations
6. **Consider bc** for complex mathematical functions if available
7. **Clear the stack** periodically to manage memory usage

The `dc` command is a powerful, precise calculator that excels at arbitrary-precision arithmetic using reverse Polish notation. Its stack-based architecture, combined with support for various number bases and programming constructs, makes it an invaluable tool for mathematical computations, financial calculations, and scientific applications where exact precision is required. While its learning curve can be steep due to the RPN syntax, its power and precision make it indispensable for complex numerical tasks.