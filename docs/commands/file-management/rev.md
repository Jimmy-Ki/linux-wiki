---
title: rev - Reverse Lines Character by Character
sidebar_label: rev
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rev - Reverse Lines Character by Character

The `rev` command reverses the characters in each line of input, effectively reading each line backwards. It's useful for text manipulation, puzzles, and certain data processing tasks where character reversal is needed.

## Basic Syntax

```bash
rev [FILE]...
```

## Usage Examples

### Basic Usage
```bash
# Reverse characters in a string
echo "hello world" | rev

# Reverse multiple lines
echo -e "first line\nsecond line\nthird line" | rev

# Reverse file contents
rev input.txt

# Reverse from standard input
echo "Linux command line" | rev
```

### File Processing
```bash
# Reverse all lines in a file
rev document.txt > reversed_document.txt

# Process multiple files
rev file1.txt file2.txt file3.txt

# Reverse specific lines using head/tail
head -10 data.txt | rev  # Reverse first 10 lines
tail -10 data.txt | rev  # Reverse last 10 lines
```

## Practical Examples

### Text Analysis
```bash
# Check for palindromes
echo "madam" | rev
echo "level" | rev

# Find palindromic words in a text
grep -o '\w\+' text.txt | while read word; do
    reversed=$(echo "$word" | rev)
    [ "$word" = "$reversed" ] && echo "Palindrome: $word"
done

# Analyze character patterns
echo "test string" | rev | grep -o . | sort | uniq -c
```

### Data Transformation
```bash
# Reverse log entries for analysis
tail -100 application.log | rev

# Reverse CSV columns (simple case)
echo "name,age,city" | rev | sed 's/,/ /g' | rev

# Reverse file paths
echo "/home/user/documents/file.txt" | rev
```

### String Manipulation
```bash
# Get last character efficiently
echo "hello" | rev | cut -c 1

# Remove last character
echo "hello" | rev | cut -c 2- | rev

# Check if string ends with specific character
input="testfile"
last_char=$(echo "$input" | rev | cut -c 1)
[ "$last_char" = "e" ] && echo "Ends with 'e'"
```

## Advanced Applications

### Text Processing and Encryption
```bash
# Simple character-level encryption
cat message.txt | rev > encrypted.txt

# Create simple puzzle
echo "Find the hidden message" | rev

# Double reversal (returns to original)
echo "hello" | rev | rev
```

### File Operations
```bash
# Reverse filename extensions
ls *.txt | while read file; do
    basename=$(basename "$file" .txt)
    echo "$basename" | rev
done

# Process files in reverse order
ls -1 | rev | sort | rev

# Reverse directory structure
find . -type f | rev | cut -d'/' -f 1 | rev | sort -u
```

### Data Validation
```bash
# Validate numeric strings (reversed and compared)
is_numeric() {
    reversed=$(echo "$1" | rev)
    echo "$reversed" | grep -q "^[0-9]\+$"
}

# Check string symmetry
check_symmetry() {
    str="$1"
    rev_str=$(echo "$str" | rev)
    [ "$str" = "$rev_str" ] && echo "Symmetric: $str"
}
```

### System Administration
```bash
# Reverse command history for analysis
history | rev

# Reverse process list
ps aux | rev

# Analyze reversed logs for patterns
tail -100 /var/log/syslog | rev | grep -E "(kcol|reuq)"
```

## Specialized Uses

### Password and Security
```bash
# Create reversible encoding
encode_string() {
    echo "$1" | rev | base64
}

decode_string() {
    echo "$1" | base64 -d | rev
}

# Generate reverse password variations
original="password123"
echo "$original" | rev
```

### Development and Testing
```bash
# Test string handling functions
test_reverse_function() {
    test_strings=("hello" "world" "12345" "test123")
    for str in "${test_strings[@]}"; do
        echo "Original: $str"
        echo "Reversed: $(echo "$str" | rev)"
        echo "---"
    done
}

# Generate test data with reversed patterns
for i in {1..10}; do
    echo "test$(printf '%03d' $i)" | rev
done
```

### Creative Applications
```bash
# Create mirror text
create_mirror_text() {
    echo "$1" | rev | tac
}

# Generate reversed poetry
cat poem.txt | rev

# Create artistic patterns
for i in {1..10}; do
    echo "Line $i:" | rev
done
```

## Pipeline Integration

### Complex Text Processing
```bash
# Combine with other text tools
cat input.txt | rev | tr '[:lower:]' '[:upper:]' | rev

# Extract and reverse specific patterns
grep -o 'error.*' logfile.txt | rev

# Multi-step transformation
echo "Example String" | rev | sed 's/\(.\)/\1\n/g' | rev
```

### Data Analysis
```bash
# Analyze text from end
cat document.txt | rev | head -c 100 | rev

# Find words ending with specific letters
cat words.txt | rev | grep -E '^[aeiou]' | rev

# Reverse sort order
ls -1 | rev | sort | rev
```

## Performance Considerations

### Large File Processing
```bash
# Process large files efficiently
split -l 10000 large_file.txt chunk_
for chunk in chunk_*; do
    rev "$chunk" > "rev_$chunk"
done

# Memory-efficient processing
cat large_file.txt | rev | gzip > reversed_file.gz

# Batch processing
find . -name "*.log" -exec rev {} \;
```

## Best Practices

1. **Use for character-level operations** where string reversal is needed
2. **Combine with other tools** for complex text processing
3. **Consider performance** when processing very large files
4. **Use in scripts** for specific transformation needs
5. **Test with sample data** before applying to important files

## Common Issues and Solutions

### Unicode and Special Characters
```bash
# Handle UTF-8 properly
export LANG=en_US.UTF-8
echo "café" | rev

# Be careful with combining characters
echo "e\u0301" | rev  # May not work as expected
```

### Binary Files
```bash
# Avoid using on binary files
# Use hexdump or od for binary analysis
```

## Related Commands

- [`tac`](/docs/commands/text-processing/tac) - Reverse lines of files
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`sed`](/docs/commands/text-processing/sed) - Stream editor
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`tr`](/docs/commands/text-processing/tr) - Translate characters

The `rev` command provides a simple yet powerful way to reverse text character by character, useful for various text processing, analysis, and transformation tasks.