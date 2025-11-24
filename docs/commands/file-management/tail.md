---
title: tail - Display Last Lines of a File
sidebar_label: tail
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tail - Display Last Lines of a File

The `tail` command displays the last part of files, typically the last 10 lines by default. It's most commonly used for monitoring log files and checking the most recent entries in text files.

## Basic Syntax

```bash
tail [OPTIONS] [FILE]...
```

## Common Options

### Line Count Options
- `-n NUM, --lines=NUM` - Display last NUM lines (default: 10)
- `-c NUM, --bytes=NUM` - Display last NUM bytes
- `-f, --follow[={name|descriptor}]` - Follow file as it grows
- `-F` - Same as --follow=name --retry

### Display Options
- `-q, --quiet, --silent` - Never print headers for file names
- `-v, --verbose` - Always print headers for file names
- `--retry` - Keep trying to open file if it's inaccessible

### Sleep Options
- `-s NUM, --sleep-interval=NUM` - With -f, sleep for NUM seconds between iterations

## Usage Examples

### Basic Usage
```bash
# Display last 10 lines (default)
tail file.txt

# Display specific number of lines
tail -n 20 file.txt

# Display last 100 bytes
tail -c 100 file.txt

# Display multiple files
tail file1.txt file2.txt file3.txt
```

### File Following (Real-time Monitoring)
```bash
# Follow file growth (live monitoring)
tail -f logfile.txt

# Follow with retry (for log rotation)
tail -F logfile.txt

# Follow multiple files
tail -f /var/log/syslog /var/log/auth.log

# Follow with custom sleep interval
tail -f -s 2 logfile.txt
```

### Log Analysis
```bash
# View recent log entries
tail -n 50 /var/log/syslog

# Follow application logs
tail -f application.log

# Check recent errors
tail -n 100 error.log | grep "ERROR"

# Follow multiple log files
tail -f /var/log/*.log
```

## Advanced Usage

### Multiple File Monitoring
```bash
# Monitor multiple logs with headers
tail -f -v /var/log/syslog /var/log/auth.log

# Quiet mode for multiple files
tail -f -q *.log

# Monitor all logs in directory
tail -f /var/log/*
```

### File Position Control
```bash
# Show last 100 lines
tail -n 100 large_file.txt

# Show everything except first 100 lines
tail -n +101 file.txt

# Show from specific line to end
tail -n +1000 huge_file.txt
```

### Combining with Other Commands
```bash
# Monitor and filter
tail -f logfile.txt | grep "ERROR"

# Monitor and count
tail -f access.log | wc -l

# Monitor with timestamps
tail -f logfile.txt | ts '[%Y-%m-%d %H:%M:%S]'

# Monitor and alert
tail -f error.log | grep --line-buffered "CRITICAL" | while read line; do
    echo "ALERT: $line"
done
```

## Practical Examples

### System Administration
```bash
# Monitor system logs
tail -f /var/log/syslog
tail -f /var/log/auth.log

# Monitor web server logs
tail -f /var/log/nginx/access.log
tail -f /var/log/apache2/error.log

# Monitor database logs
tail -f /var/log/mysql/error.log
tail -f /var/log/postgresql/postgresql.log
```

### Development
```bash
# Monitor application output
tail -f application.log

# Monitor build process
make 2>&1 | tail -f

# Monitor test results
tail -f test_results.log
```

### Real-time Processing
```bash
# Monitor and extract IPs
tail -f access.log | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+' | sort | uniq

# Monitor and extract errors
tail -f app.log | grep -i "error\|exception\|fatal"

# Monitor and alert on patterns
tail -f security.log | grep --line-buffered "attack\|intrusion" | mail -s "Security Alert" admin@example.com
```

## Special Features

### Log Rotation Handling
```bash
# Use -F for log rotation support
tail -F /var/log/syslog

# Manual log rotation handling
tail --pid=$(cat /var/run/syslogd.pid) -f /var/log/syslog
```

### Remote Log Monitoring
```bash
# Monitor remote logs
ssh user@server "tail -f /var/log/app.log"

# Monitor multiple remote logs
ssh user@server "tail -f /var/log/*.log"
```

## Related Commands

- [`head`](/docs/commands/text-processing/head) - Display first lines of a file
- [`less`](/docs/commands/text-processing/less) - View file page by page
- [`cat`](/docs/commands/text-processing/cat) - Display entire file
- [`multitail`](/docs/commands/text-processing/multitail) - Monitor multiple files
- [`watch`](/docs/commands/system-info/watch) - Execute command periodically

## Common Use Cases

1. **Log monitoring** - Real-time monitoring of application and system logs
2. **Debugging** - Watching error logs while running applications
3. **File processing** - Check the end of large files
4. **System monitoring** - Keep track of system activities
5. **Progress tracking** - Monitor progress of long-running processes

## Tips and Tricks

### Efficient Monitoring
```bash
# Monitor specific lines with context
tail -f logfile.txt | grep -C 3 "ERROR"

# Monitor with color highlighting
tail -f logfile.txt | grep --color=always "ERROR\|WARNING"

# Monitor and save to file
tail -f logfile.txt | tee saved_output.log
```

### Productivity
```bash
# Create log monitoring alias
alias logs='tail -f /var/log/syslog'

# Monitor multiple applications
tail -f ~/apps/*/logs/application.log

# Monitor with timestamps automatically
export TA监测_PROG='tail -f'
```

### Script Integration
```bash
# Background monitoring
tail -f logfile.txt > /dev/null &
TAIL_PID=$!
# ... do other work ...
kill $TAIL_PID

# Monitor until pattern found
tail -f logfile.txt | grep -m 1 "PROCESSING COMPLETE"
```

## Performance Considerations

### Resource Usage
- `tail -f` is lightweight and efficient
- `tail -F` uses slightly more resources for file checking
- Multiple file following increases resource usage

### Alternatives for High-Volume Logs
```bash
# For very high-volume logs, consider:
multitail  # Multiple file monitoring with colors
lnav       # Log file navigator with advanced features
```

The `tail` command, especially with the `-f` option, is essential for real-time log monitoring and debugging. It's a fundamental tool for system administrators and developers working with continuously growing log files.