---
title: seq - Print a Sequence of Numbers
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# seq - Print a Sequence of Numbers

The `seq` command prints a sequence of numbers from a first value to a last value, with optional increment and formatting options. It's commonly used in shell scripts for generating numbered lists, loops, and test data.

## Basic Syntax

```bash
seq [OPTION]... LAST
seq [OPTION]... FIRST LAST
seq [OPTION]... FIRST INCREMENT LAST
```

## Common Options

- `-f, --format=FORMAT` - Use printf-style floating-point format
- `-s, --separator=STRING` - Use STRING to separate numbers (default: newline)
- `-w, --equal-width` - Equalize width by padding with leading zeroes
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Number Sequences
```bash
# Sequence from 1 to 5
seq 5

# Sequence from 3 to 7
seq 3 7

# Sequence with custom increment
seq 1 2 10  # 1, 3, 5, 7, 9

# Counting down
seq 10 -1 5  # 10, 9, 8, 7, 6, 5

# Negative numbers
seq -5 -1 -10  # -5, -6, -7, -8, -9, -10
```

### Formatting Options
```bash
# Equal width with leading zeros
seq -w 98 101

# Custom format with leading zeros
seq -f "%03g" 1 5

# Prefix with text
seq -f "file%03g.txt" 1 10

# Floating point numbers
seq -f "%.2f" 0 0.5 2

# Scientific notation
seq -f "%e" 1 3
```

### Custom Separators
```bash
# Space-separated sequence
seq -s " " 1 5

# Comma-separated values
seq -s "," 1 5

# Tab-separated
seq -s $'\t' 1 5

# Custom separator with formatting
seq -s "|" -f "%03g" 1 5

# No separator (continuous string)
seq -s "" 1 5
```

## Practical Examples

### File and Directory Operations
```bash
# Create numbered files
for i in $(seq 1 10); do
    touch "file$(printf '%03d' $i).txt"
done

# Create numbered directories
for i in $(seq -f "%03g" 1 5); do
    mkdir "dir_$i"
done

# Batch rename files
i=1
for file in *.txt; do
    mv "$file" "document$(seq -f "%03d" $i $i).txt"
    ((i++))
done

# Create test data files
for i in $(seq 1 100); do
    echo "Test data for file $i" > "test_file_$i.log"
done
```

### Loop Iteration
```bash
# Traditional for loop replacement
for i in $(seq 1 10); do
    echo "Processing item $i"
done

# Process numbered files
for i in $(seq 1 20); do
    file="image_$(printf '%04d' $i).jpg"
    [ -f "$file" ] && echo "Found $file"
done

# Generate configuration lines
for port in $(seq 8000 8009); do
    echo "listen $port;" >> nginx.conf
done
```

### Data Generation
```bash
# Generate CSV data
echo "ID,Name,Value" > data.csv
for i in $(seq 1 100); do
    echo "$i,Item_$i,$((RANDOM % 1000))" >> data.csv
done

# Create JSON array elements
for i in $(seq 1 5); do
    echo '{"id": '$i', "name": "item_'$i'"}'
done

# Generate SQL insert statements
for i in $(seq 1 50); do
    echo "INSERT INTO users (id, username) VALUES ($i, 'user$i');"
done

# Create test log entries
for i in $(seq 1 20); do
    echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] Processing record $i"
done
```

### Mathematical Operations
```bash
# Generate multiplication table
for i in $(seq 1 10); do
    for j in $(seq 1 10); do
        printf "%4d" $((i * j))
    done
    echo
done

# Calculate powers of 2
for i in $(seq 0 10); do
    echo "2^$i = $((2 ** i))"
done

# Fibonacci sequence simulation
a=0; b=1
echo "Fibonacci sequence:"
for i in $(seq 1 15); do
    echo "$a"
    next=$((a + b))
    a=$b
    b=$next
done
```

### System Administration
```bash
# Check multiple service ports
for port in $(seq 8000 8005); do
    echo "Checking port $port..."
    netstat -ln | grep ":$port "
done

# Monitor multiple log files
for i in $(seq 1 5); do
    log_file="/var/log/app_$i.log"
    echo "Last 5 lines from $log_file:"
    tail -5 "$log_file" 2>/dev/null || echo "File not found"
done

# Process CPU monitoring
for cpu in $(seq 0 3); do
    echo "CPU $cpu usage:"
    mpstat -P $cpu 1 1 | tail -1
done
```

## Advanced Usage

### Complex Formatting
```bash
# Mixed formatting
seq -f "Item-%04d-Processed" 1 5

# Floating point sequences
seq -f "%.2f" 0.0 0.25 1.0

# Scientific data generation
seq -f "%8.3e" 1 0.1 2

# Hexadecimal sequence conversion
for i in $(seq 1 16); do
    printf "0x%02X\n" $i
done

# Binary sequence
for i in $(seq 0 7); do
    printf "%08b\n" $i
done
```

### Custom Applications
```bash
# Generate HTML list items
for i in $(seq 1 10); do
    echo "  <li>List item $i</li>"
done

# Create numbered CSS classes
for i in $(seq 1 5); do
    echo ".level-$i { padding: ${i}0px; }"
done

# Generate configuration sections
for i in $(seq 1 3); do
    cat << EOF
[Section$i]
enabled = true
port = $((8000 + i))
threads = $i
EOF
done
```

### Testing and Development
```bash
# Generate test cases
for i in $(seq 1 100); do
    echo "Test case $i: input=$i, expected_output=$((i * 2))"
done

# Load testing simulation
for i in $(seq 1 1000); do
    curl -s "http://example.com/api?id=$i" &
    [ $((i % 10)) -eq 0 ] && wait  # Process in batches
done

# Performance benchmarking
for size in $(seq 1000 1000 10000); do
    start_time=$(date +%s%N)
    # Simulate work
    for j in $(seq 1 $size); do
        dummy=$((j * j))
    done
    end_time=$(date +%s%N)
    echo "Size: $size, Time: $((($end_time - $start_time) / 1000000))ms"
done
```

## Data Processing Examples

### File Batch Processing
```bash
# Process images in batches
for batch in $(seq 1 10); do
    start=$(((batch - 1) * 100 + 1))
    end=$((batch * 100))
    echo "Processing batch $batch (files $start-$end)..."

    for i in $(seq $start $end); do
        input="image_$(printf '%04d' $i).jpg"
        output="processed_image_$(printf '%04d' $i).jpg"
        [ -f "$input" ] && convert "$input" -resize 50% "$output"
    done
done

# Generate checksums for files
for i in $(seq 1 50); do
    filename="data_$(printf '%03d' $i).bin"
    [ -f "$filename" ] && md5sum "$filename" >> checksums.md5
done
```

### Database Operations
```bash
# Generate batch inserts
batch_size=1000
total_records=10000

for batch in $(seq 1 $((total_records / batch_size))); do
    start=$(((batch - 1) * batch_size + 1))
    end=$((batch * batch_size))

    echo "INSERT INTO logs (id, message, timestamp) VALUES"
    for i in $(seq $start $end); do
        echo "($i, 'Log message $i', NOW())"
        [ $i -lt $end ] && echo ","
    done
    echo ";"
done
```

## Best Practices

1. **Use appropriate formatting** for your specific use case
2. **Combine with other commands** for powerful data processing pipelines
3. **Consider using brace expansion** for simple sequences: `{1..10}`
4. **Use `seq -w`** when you need consistent width for sorting
5. **Redirect output efficiently** when generating large datasets

## Performance Considerations

```bash
# For very large sequences, consider alternatives
# Faster than seq for simple counting:
for ((i=1; i<=1000000; i++)); do
    echo $i
done

# Use brace expansion for moderate ranges:
echo {1..10000}

# Process in batches for memory efficiency:
for batch in $(seq 1 100); do
    process_batch $(seq $(((batch-1)*1000+1)) $((batch*1000)))
done
```

## Related Commands

- [`printf`](/docs/commands/other-commands/printf) - Format and print data
- [`for`](/docs/commands/shell/for) - Loop construct
- [`brace expansion`](/docs/commands/shell/brace-expansion) - Generate sequences
- [`nl`](/docs/commands/text-processing/nl) - Number lines of files
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing

The `seq` command is a versatile tool for generating numeric sequences, essential for creating loops, test data, and numbered lists in shell scripts and command-line operations.