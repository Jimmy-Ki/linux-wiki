---
title: yes - Repeatedly Output a String
sidebar_label: yes
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# yes - Repeatedly Output a String

The `yes` command repeatedly outputs a specified string or "y" by default until terminated. It's commonly used for automating responses to interactive commands that require confirmation.

## Basic Syntax

```bash
yes [STRING]
yes [OPTION]
```

## Common Options

- `--help` - Display help information and exit
- `--version` - Display version information and exit

## Usage Examples

### Basic Usage
```bash
# Output "y" repeatedly (default behavior)
yes

# Output custom string repeatedly
yes "Hello World"

# Output confirmation for package installation
yes | apt-get install package-name

# Automated file overwriting confirmation
yes | rm -r directory/
```

### System Administration Examples
```bash
# Force confirmation for system updates
yes | sudo apt-get update && sudo apt-get upgrade

# Automatic disk formatting confirmation
yes | mkfs.ext4 /dev/sdb1

# Bypass interactive prompts in scripts
yes | ./install.sh

# Force remove without confirmation
yes | rm -rf important_files/
```

## Practical Examples

### Automation and Scripting
```bash
# Automated backup with overwrite confirmation
yes | cp -r source/* destination/

# Batch user creation with default values
yes | sudo adduser newuser

# Automatic service restart confirmation
yes | sudo systemctl restart service-name

# Force git push with overwrite
yes | git push --force origin main
```

### Testing and Development
```bash
# Generate test data
yes "test line" > test_file.txt
head -1000 test_file.txt  # Get first 1000 lines

# Stress test with continuous output
yes > /dev/null  # Maximum output test

# Network connection testing
yes | nc host.example.com 8080

# Memory testing by filling output
yes $(python -c 'print("A"*1000)') > large_file.txt
```

### File Processing
```bash
# Create numbered test file
yes | nl > numbered_lines.txt

# Combine with text processing
yes "sample text" | head -100 > sample_data.txt

# Generate CSV test data
yes "field1,field2,field3" | head -50 > test.csv

# Create log file for testing
yes "$(date): Log entry message" | head -1000 > test.log
```

### System Maintenance
```bash
# Automatic confirmation for log rotation
yes | logrotate -f /etc/logrotate.conf

# Force package removal
yes | sudo apt-get remove package-name

# Batch file permission changes
yes | chmod 777 *.sh

# Automated cleanup with confirmation
yes | find /tmp -type f -delete
```

## Advanced Usage

### Pipeline Integration
```bash
# Combine with other commands
yes | head -10 | rev
yes "$(date)" | head -5
yes "test" | tr '[:lower:]' '[:upper:]' | head -3

# Create specific patterns
yes "A,B,C" | head -100 | tr ',' '\n'

# Generate JSON test data
yes '{"id":%d,"name":"test","value":true}' | head -50
```

### Conditional Output
```bash
# Limited output with timeout
timeout 5s yes

# Output with count limit
yes | head -100

# Conditional string output
if [ "$1" = "install" ]; then
    yes | ./install_script.sh
else
    echo "Installation cancelled"
fi
```

## Best Practices

1. **Use with caution** - `yes` can overwhelm system resources if not controlled
2. **Limit output** when testing using `head`, `tail`, or `timeout`
3. **Redirect to `/dev/null`** when you only want to provide automatic responses
4. **Combine with pipes** for automated workflows
5. **Test with small samples** before running on large datasets

## Safety Considerations

```bash
# Safe testing with limited output
yes "test" | head -10

# Use timeout for safety
timeout 10s yes

# Redirect to null when only providing responses
yes | command_that_asks_questions > /dev/null

# Monitor resource usage
yes | pv > /dev/null  # Monitor output rate
```

## Performance Testing

```bash
# Test CPU usage with yes
yes > /dev/null &  # Run in background
top  # Monitor CPU usage

# Generate large files quickly
yes $(python -c 'print("x"*1000)') | head -100000 > large_test.txt

# Test disk I/O
yes | dd of=/test_file bs=1M count=100

# Benchmark system performance
yes | wc -c  # Count characters per second
```

## Troubleshooting

### Common Issues
```bash
# Stop yes command
Ctrl+C  # Standard interrupt
killall yes  # Kill all yes processes

# Check if yes is running
ps aux | grep yes

# Limit memory usage
ulimit -v 10000  # Set memory limit before running yes
```

## Related Commands

- [`echo`](/docs/commands/other-commands/echo) - Display a line of text
- [`printf`](/docs/commands/other-commands/printf) - Format and print data
- [`seq`](/docs/commands/other-commands/seq) - Print a sequence of numbers
- [`head`](/docs/commands/text-processing/head) - Output the first part of files
- [`tail`](/docs/commands/text-processing/tail) - Output the last part of files
- [`timeout`](/docs/commands/system-utility/timeout) - Run a command with a time limit

The `yes` command is a simple yet powerful tool for automation and testing. Its ability to provide continuous output makes it invaluable for scripting, system administration, and performance testing scenarios.