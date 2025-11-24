---
title: cat - Display File Contents
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cat - Display File Contents

The `cat` (concatenate) command reads files sequentially, writing them to standard output. It's commonly used for viewing file contents, creating files, and combining multiple files.

## Basic Syntax

```bash
cat [OPTIONS] [FILE]...
```

## Common Options

### Display Options
- `-n, --number` - Number all output lines
- `-b, --number-nonblank` - Number only non-empty output lines
- `-s, --squeeze-blank` - Suppress repeated empty output lines
- `-E, --show-ends` - Display $ at end of each line
- `-T, --show-tabs` - Display TAB characters as ^I
- `-A, --show-all` - Equivalent to -vET

### Output Control
- `-v, --show-nonprinting` - Use ^ and M- notation for non-printing characters
- `-e` - Equivalent to -vE
- `-t` - Equivalent to -vT

## Usage Examples

### Basic File Viewing
```bash
# Display file contents
cat filename.txt

# Display multiple files
cat file1.txt file2.txt file3.txt

# Display all text files
cat *.txt

# No file specified (reads from stdin)
cat
# Type text, press Ctrl+D to end
```

### Line Numbering
```bash
# Number all lines
cat -n file.txt

# Number only non-empty lines
cat -b file.txt

# Combine files with line numbers
cat -n file1.txt file2.txt > combined.txt
```

### File Creation
```bash
# Create new file (or overwrite existing)
cat > newfile.txt
# Type content, press Ctrl+D to save

# Append to existing file
cat >> existing.txt
# Type content, press Ctrl+D to append
```

### Combining Files
```bash
# Concatenate multiple files
cat file1.txt file2.txt > combined.txt

# Concatenate all .txt files
cat *.txt > all_texts.txt

# Append files to existing file
cat file1.txt file2.txt >> existing.txt
```

## Advanced Usage

### Special Characters Display
```bash
# Show line endings
cat -E file.txt

# Show tab characters
cat -T file.txt

# Show all non-printing characters
cat -A file.txt

# Show non-printing characters with verbose mode
cat -v file.txt
```

### Formatting Options
```bash
# Squeeze multiple blank lines into one
cat -s file.txt

# Combine multiple options
cat -ns file.txt  # Number non-empty lines, squeeze blanks

# Create formatted output
cat -n file.txt | less
```

## Practical Examples

### File Content Analysis
```bash
# View configuration files
cat /etc/hosts
cat ~/.bashrc

# Check script contents
cat script.sh

# View log files
cat /var/log/syslog | tail -20
```

### File Operations
```bash
# Copy file content
cat source.txt > destination.txt

# Create backup with timestamp
cat config.txt > config_backup_$(date +%Y%m%d).txt

# Create file with headers
cat > report.txt << EOF
Report generated: $(date)
=============================
EOF
```

### Data Processing
```bash
# Remove blank lines
cat -s file.txt > clean_file.txt

# Add line numbers to code
cat -n script.py > numbered_script.py

# Combine header and content
cat header.txt content.txt > complete.txt
```

### System Administration
```bash
# View system information
cat /proc/cpuinfo
cat /proc/meminfo
cat /proc/version

# Check network configuration
cat /etc/resolv.conf
cat /etc/hosts

# View authentication logs
cat /var/log/auth.log | grep "Failed password"
```

## Working with stdin

### Input Redirection
```bash
# Redirect file to stdin
cat < input.txt

# Combine with other commands
ls -la | cat > file_list.txt

# Use in pipelines
echo "Hello World" | cat
```

### Here Documents
```bash
# Create file with here document
cat > config.txt << EOF
server_name = example.com
port = 8080
debug = true
EOF

# Create script
cat > script.sh << 'EOF'
#!/bin/bash
echo "Hello World"
EOF
chmod +x script.sh
```

## File Manipulation

### Content Filtering
```bash
# Display specific line ranges
cat -n file.txt | sed -n '10,20p'

# Remove comments and blank lines
cat file.txt | grep -v '^#' | grep -v '^$'

# Extract specific patterns
cat file.txt | grep "ERROR"
```

### Data Transformation
```bash
# Convert to uppercase
cat file.txt | tr '[:lower:]' '[:upper:]'

# Replace text
cat file.txt | sed 's/old/new/g'

# Sort and unique
cat file.txt | sort | uniq
```

## Combining with Other Commands

### Pipeline Examples
```bash
# Count lines, words, characters
cat file.txt | wc

# Find longest lines
cat file.txt | awk 'length > 80'

# Extract email addresses
cat file.txt | grep -E '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
```

### Complex Processing
```bash
# Create summary report
cat *.log | grep "ERROR" | wc -l

# Extract URLs from HTML files
cat *.html | grep -o 'href="[^"]*"' | sort | uniq

# Process configuration files
cat config.ini | grep -v '^#' | grep -v '^$'
```

## Best Practices

### Viewing Large Files
```bash
# For large files, use less or more
cat large_file.txt | less

# View beginning of file
cat file.txt | head -20

# View end of file
cat file.txt | tail -20
```

### Safe File Operations
```bash
# Check if file exists before reading
[ -f "file.txt" ] && cat file.txt

# Use cat for viewing, not for editing
cat file.txt  # View
nano file.txt  # Edit
```

## Performance Considerations

### Memory Usage
```bash
# cat reads entire file into memory
# For very large files, consider:
tail file.txt          # View end
head file.txt          # View beginning
less file.txt          # Paginated view
```

### Efficiency Tips
```bash
# Use cat when you need to process entire file
# Use other tools for specific needs:
head -n 10 file.txt    # First 10 lines
tail -n 10 file.txt    # Last 10 lines
grep pattern file.txt  # Search pattern
```

## Related Commands

- [`less`](/docs/commands/text-processing/less) - View files page by page
- [`more`](/docs/commands/text-processing/more) - Display file content page by page
- [`head`](/docs/commands/text-processing/head) - Display first lines of a file
- [`tail`](/docs/commands/text-processing/tail) - Display last lines of a file
- [`tac`](/docs/commands/text-processing/tac) - Concatenate and print files in reverse
- [`nl`](/docs/commands/text-processing/nl) - Number lines of files

## Common Use Cases

### Quick File Viewing
```bash
# View configuration
cat /etc/ssh/sshd_config

# Check script before execution
cat deploy.sh

# View logs
cat application.log
```

### File Creation and Editing
```bash
# Create simple configuration
cat > .env << EOF
DATABASE_URL=localhost:5432
API_KEY=secret_key
DEBUG=false
EOF
```

### Data Processing
```bash
# Combine CSV files
cat data1.csv data2.csv > all_data.csv

# Create backup with header
cat header.csv daily_data.csv > report.csv
```

### System Administration
```bash
# Check system resources
cat /proc/mounts
cat /proc/partitions

# Verify file contents
cat checksum.txt
```

## Troubleshooting

### Common Issues

```bash
# File not found
cat nonexistent.txt
# Solution: Check file path and permissions
ls -la file.txt

# Permission denied
cat /etc/shadow
# Solution: Use sudo if needed
sudo cat /etc/shadow

# Binary file output
cat binary_file
# Solution: Use file command first
file binary_file
```

### Encoding Issues
```bash
# Check file encoding
file -bi filename.txt

# Convert encoding if needed
iconv -f utf-8 -t ascii file.txt > converted.txt
```

The `cat` command is fundamental for file viewing and manipulation in Linux. While simple, it's versatile for quick file operations and combining with other commands in pipelines. Remember to use `less` for large files and be careful when redirecting output to avoid overwriting important files.