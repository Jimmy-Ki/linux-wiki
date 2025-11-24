---
title: tr - Translate or Delete Characters
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tr - Translate or Delete Characters

The `tr` command translates, squeezes, or deletes characters from standard input and writes the result to standard output. It's a powerful tool for character-level text transformations and is often used in pipelines for data cleaning and formatting.

## Basic Syntax

```bash
tr [OPTION]... SET1 [SET2]
```

## Common Options

### Operation Modes

- `-d, --delete` - Delete characters in SET1 (do not translate)
- `-s, --squeeze-repeats` - Replace each sequence of repeated characters with one
- `-c, --complement` - Use the complement of SET1 (characters not in SET1)
- `-t, --truncate-set1` - First truncate SET1 to length of SET2

### Help Options

- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Character Sets

### Character Classes

```bash
[:alnum:]   # Alphanumeric characters (letters and digits)
[:alpha:]   # Alphabetic characters
[:blank:]   # Blank characters (space and tab)
[:cntrl:]   # Control characters
[:digit:]   # Numeric characters (0-9)
[:graph:]   # Graphical characters (visible, non-space)
[:lower:]   # Lowercase letters
[:print:]   # Printable characters
[:punct:]   # Punctuation characters
[:space:]   # Whitespace characters
[:upper:]   # Uppercase letters
[:xdigit:]  # Hexadecimal digits
```

### Escape Sequences

```bash
\\   # Backslash
\a   # Alert (BEL)
\b   # Backspace
\f   # Form feed
\n   # Newline
\r   # Carriage return
\t   # Horizontal tab
\v   # Vertical tab
```

### Set Syntax

```bash
'abc'      # Specific characters a, b, c
'a-z'      # Range from a to z
'a-zA-Z'   # Multiple ranges
'0-9a-f'   # Hexadecimal digits
'abcxyz'   # Mixed specific characters
```

## Usage Examples

### Case Conversion

```bash
# Convert to lowercase
echo "HELLO WORLD" | tr 'A-Z' 'a-z'
# Output: hello world

# Convert to uppercase
echo "hello world" | tr 'a-z' 'A-Z'
# Output: HELLO WORLD

# Using character classes
echo "Hello World 123" | tr '[:lower:]' '[:upper:]'
# Output: HELLO WORLD 123

# Convert both cases
tr 'a-zA-Z' 'A-Za-z' < input.txt
```

### Character Deletion

```bash
# Remove digits
echo "hello 123 world 456" | tr -d '0-9'
# Output: hello  world

# Remove punctuation
echo "hello, world! how are you?" | tr -d '[:punct:]'
# Output: hello world how are you

# Remove whitespace
echo "  hello   world  " | tr -d '[:space:]'
# Output: helloworld

# Remove control characters
tr -d '[:cntrl:]' < input.txt
```

### Character Replacement

```bash
# Replace spaces with underscores
echo "hello world" | tr ' ' '_'
# Output: hello_world

# Replace newlines with spaces
tr '\n' ' ' < input.txt

# Replace tabs with spaces
tr '\t' ' ' < input.txt

# Replace multiple characters
tr 'aeiou' '12345' < input.txt
```

### Character Squeezing

```bash
# Squeeze repeated spaces
echo "hello    world" | tr -s ' '
# Output: hello world

# Squeeze repeated newlines
tr -s '\n' < input.txt

# Squeeze multiple characters
echo "thissss isss aaaa tesssst" | tr -s 's'
# Output: this is a test

# Clean up multiple whitespace types
echo "hello   world\t\ttest" | tr -s '[:space:]'
# Output: hello world test
```

### Complement Operations

```bash
# Keep only digits and spaces
echo "hello 123 world 456" | tr -cd '0-9 \n'
# Output:  123  456

# Remove everything except letters
echo "hello world 123!" | tr -cd '[:alpha:]\n'
# Output: helloworld

# Extract email characters (alphanumeric and @._)
tr -cd '[:alnum:]@._\n' < raw_email.txt
```

## Practical Examples

### File Processing

```bash
# Convert Windows line endings to Unix
tr -d '\r' < windows_file.txt > unix_file.txt

# Convert Unix line endings to Windows
tr '\n' '\r\n' < unix_file.txt > windows_file.txt

# Remove non-printable characters from files
tr -cd '[:print:]\n' < dirty_file.txt > clean_file.txt

# Convert text to uppercase for processing
tr '[:lower:]' '[:upper:]' < input.txt > output.txt
```

### Data Cleaning

```bash
# Remove phone number formatting
echo "(555) 123-4567" | tr -d '()- '
# Output: 5551234567

# Standardize email addresses
echo "User@Example.COM" | tr '[:upper:]' '[:lower:]'
# Output: user@example.com

# Remove currency symbols and formatting
echo "$1,234.56" | tr -d '$,'
# Output: 1234.56

# Clean up CSV data
tr ',' '\t' < data.csv > data.tsv
```

### Text Analysis

```bash
# Count character frequency
cat file.txt | tr -cd '[:lower:]' | tr 'a-z' '\n' | sort | uniq -c | sort -nr

# Count words (simple approach)
tr -s '[:space:]' '\n' < file.txt | wc -l

# Extract only words
tr -cd '[:alpha:][:space:]\n' < file.txt

# Create word frequency analysis
tr -cs '[:alpha:]' '\n' < file.txt | sort | uniq -c | sort -nr
```

### System Administration

```bash
# Generate random passwords
tr -dc '[:alnum:]' < /dev/urandom | head -c 12

# Remove color codes from command output
echo -e "\e[31mRed text\e[0m" | tr -d '\e[0-9;[m]'

# Sanitize filenames
echo "file name with spaces.txt" | tr ' ' '_'

# Clean up user input
tr -cd '[:alnum:]_-' < user_input.txt
```

## Advanced Usage

### Complex Transformations

```bash
# ROT13 cipher
tr 'a-zA-Z' 'n-za-mN-ZA-M' < input.txt

# Create Caesar cipher
tr 'a-zA-Z' 'd-za-cD-ZA-C' < input.txt

# Remove duplicate characters while preserving order
awk '!seen[$0]++' | tr -d '\n'

# Convert between character encodings (simplified)
tr '[:upper:]' '[:lower:]' | iconv -f latin1 -t utf8
```

### Pipeline Combinations

```bash
# Word frequency analysis
cat text.txt | tr -cs '[:alpha:]' '\n' | tr '[:upper:]' '[:lower:]' | sort | uniq -c | sort -nr

# Extract and count IP addresses
tr -cs '0-9.' '\n' < logfile.txt | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | sort | uniq -c

# Clean and format CSV data
tr -d '\r' | tr ',' '\t' | tr -s '[:space:]' | sort

# Remove HTML tags (basic)
tr -cd '[:print:]\n' | sed 's/<[^>]*>//g'
```

### Multi-step Processing

```bash
# Complete text normalization pipeline
cat input.txt | \
    tr -d '\r' | \
    tr '[:upper:]' '[:lower:]' | \
    tr -s '[:space:]' ' ' | \
    tr -cd '[:print:] \n' | \
    sed 's/^[[:space:]]*//;s/[[:space:]]*$//'

# Process log files for analysis
cat access.log | \
    cut -d' ' -f1 | \
    tr -d '[]' | \
    sort | \
    uniq -c | \
    sort -nr
```

## Performance Considerations

```bash
# For large files, use appropriate buffering
tr -cd '[:print:]\n' < large_file.txt > output.txt

# Process files in chunks for memory efficiency
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do
    tr '[:upper:]' '[:lower:]' < "$chunk" >> processed_output.txt
done

# Use temp files for complex operations
tr -cd '[:alnum:] \n' < input.txt > temp.txt
sort temp.txt > final_output.txt
```

## Real-World Applications

### Data Migration

```bash
# Convert legacy database exports
tr '|' ',' < pipe_delimited.txt > comma_delimited.csv

# Standardize text encoding
tr -cd '[:print:]\n\t' < mixed_encoding.txt > clean.txt

# Prepare data for import
tr -d '"' | tr ',' '\t' < csv_data.txt > tab_separated.txt
```

### Security and Validation

```bash
# Sanitize user input for filenames
tr -cd '[:alnum:]._- ' < user_input.txt > safe_filename.txt

# Validate password strength
tr -cd '[:alnum:]!@#$%^&*()_+-=' < password.txt

# Remove potentially dangerous characters
tr -d '<>|"\'$(){}[]' < untrusted_input.txt
```

### Text Processing

```bash
# Create word cloud data
tr -cs '[:alpha:]' '\n' < document.txt | tr '[:upper:]' '[:lower:]' | sort | uniq -c

# Remove duplicate words
tr -cs '[:alpha:]' '\n' < text.txt | sort -u

# Create acronyms
tr '[:lower:]' '[:upper:]' < words.txt | cut -c1 | tr -d '\n'
```

## Related Commands

- [`sed`](/docs/commands/text-processing/sed) - Stream editor for filtering text
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines
- [`iconv`](/docs/commands/text-processing/iconv) - Convert character encoding
- [`expand`](/docs/commands/text-processing/expand) - Convert tabs to spaces
- [`unexpand`](/docs/commands/text-processing/unexpand) - Convert spaces to tabs

## Best Practices

1. **Use character classes** for more readable and portable code
2. **Quote character sets** to prevent shell expansion
3. **Test on small samples** before processing large files
4. **Combine with other tools** for complex transformations
5. **Use `-c` complement** for extraction operations
6. **Handle special characters** with escape sequences properly

## Common Pitfalls

### Character Set Issues

```bash
# Wrong - shell interprets ranges
tr a-z A-Z < file.txt

# Correct - quote the character sets
tr 'a-z' 'A-Z' < file.txt
```

### Buffering Issues

```bash
# May not work as expected with interactive input
echo "test" | tr 'a-z' 'A-Z'

# Better for interactive use
printf "test\n" | tr 'a-z' 'A-Z'
```

### Complex Transformations

```bash
# For complex pattern matching, consider other tools
awk '{print toupper($0)}' file.txt  # Often more readable
tr '[:lower:]' '[:upper:]' file.txt
```

The `tr` command is a simple yet powerful tool for character-level text processing. While it has limitations compared to more advanced tools like `sed` or `awk`, it excels at simple character transformations and is an essential component of many text processing pipelines.