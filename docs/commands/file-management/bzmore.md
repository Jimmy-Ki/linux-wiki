---
title: bzmore - Bzip2 File Viewer
sidebar_label: bzmore
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bzmore - Bzip2 File Viewer

The `bzmore` command is a file filter that allows viewing the contents of bzip2 compressed files page by page. It's essentially the bzip2 equivalent of the `more` command, providing a convenient way to browse compressed text files without having to decompress them first. The command automatically decompresses the file in memory and displays it in a paginated format, making it ideal for examining large compressed log files, documents, or any text-based compressed content.

## Basic Syntax

```bash
bzmore [OPTIONS] [FILE...]
```

## Command Options

### Display Options
- `-d` - Display help information (same as --help)
- `-h, --help` - Show help message and exit
- `-V, --version` - Display version information
- `-s` - Squeeze multiple blank lines into one

### File Options
- Multiple files can be specified and will be viewed sequentially
- If no files are specified, reads from standard input

## Usage Examples

### Basic File Viewing

#### Viewing Single Files
```bash
# View a bzip2 compressed file
bzmore document.txt.bz2

# View compressed log file
bzmore /var/log/syslog.1.bz2

# View compressed text file with path
bzmore /home/user/documents/report.txt.bz2

# View file from current directory
bz2more data.log.bz2
```

#### Viewing Multiple Files
```bash
# View multiple compressed files sequentially
bzmore log1.txt.bz2 log2.txt.bz2 log3.txt.bz2

# View all compressed log files in directory
bzmore *.log.bz2

# View specific compressed files
bzmore error.log.bz2 access.log.bz2 debug.log.bz2
```

### Advanced Viewing Options

#### Squeeze Blank Lines
```bash
# View file with squeezed blank lines
bzmore -s document.txt.bz2

# View log file with compacted spacing
bzmore -s /var/log/messages.1.bz2
```

#### Standard Input Viewing
```bash
# View compressed data from pipe
cat document.txt.bz2 | bzmore

# View from another command output
bzcat file.txt.bz2 | bzmore

# View compressed data from network
curl -s http://example.com/data.txt.bz2 | bzmore
```

## Practical Examples

### System Administration

#### Log File Analysis
```bash
# View compressed system logs
bzmore /var/log/syslog.2.bz2

# Check compressed application logs
bzmore /var/log/apache2/access.log.1.bz2

# View compressed authentication logs
bzmore /var/log/auth.log.1.bz2

# Analyze compressed error logs
bzmore /var/log/nginx/error.log.1.bz2
```

#### Configuration File Review
```bash
# View compressed backup configurations
bzmore /etc/backup/config.yaml.bz2

# Check compressed system configurations
bzmore /etc/systemd/system.conf.bz2

# Review compressed application settings
bzmore /opt/app/config/application.properties.bz2
```

### Development Workflow

#### Code Review
```bash
# View compressed source code files
bzmore source.py.bz2

# Review compressed documentation
bzmore README.md.bz2

# Check compressed change logs
bzmore CHANGELOG.bz2

# View compressed test results
bzmore test_results.txt.bz2
```

#### Data Analysis
```bash
# View compressed CSV data
bzmore dataset.csv.bz2

# Analyze compressed JSON logs
bzmore api_logs.json.bz2

# Review compressed XML files
bzmore config.xml.bz2

# Examine compressed text reports
bzmore report.txt.bz2
```

### Backup and Recovery

#### Backup Verification
```bash
# Verify compressed backup contents
bzmore backup_manifest.txt.bz2

# Check compressed backup logs
bzmore backup_log.txt.bz2

# Review compressed system snapshots
bzmore system_snapshot.txt.bz2
```

#### Data Recovery
```bash
# Examine compressed recovered files
bzmore recovered_document.txt.bz2

# Check compressed database exports
bzmore database_export.sql.bz2

# Review compressed system diagnostics
bzmore diagnostic_report.txt.bz2
```

## Navigation Controls

Once inside bzmore, you can use the following navigation commands:

### Movement Commands
- `SPACE` or `f` - Forward one screen
- `b` - Backward one screen
- `RETURN` or `j` - Forward one line
- `k` - Backward one line
- `d` - Forward half screen
- `u` - Backward half screen
- `g` - Go to beginning of file
- `G` - Go to end of file
- `/pattern` - Search forward for pattern
- `?pattern` - Search backward for pattern
- `n` - Repeat previous search
- `p` - Repeat previous search in reverse direction

### File Management
- `:n` - View next file (if multiple files specified)
- `:p` - View previous file
- `:q` or `q` - Quit bzmore
- `:e filename` - View new file
- `=!command` - Execute shell command
- `v` - Start vi editor at current line

## File Handling

### Supported File Types
```bash
# Standard bzip2 files
bzmore file.txt.bz2

# Bzip2 compressed files with different extensions
bzmore document.tbz2
bzmore archive.tbz

# Files from various sources
bzmore downloaded_file.bz2
bzmore generated_report.bz2
```

### File Size Considerations
```bash
# Small files (immediate display)
bzmore small_config.txt.bz2

# Large files (paginated viewing)
bzmore large_dataset.txt.bz2

# Very large compressed files (memory efficient)
bzmore huge_logfile.txt.bz2
```

## Integration with Other Commands

### Pipeline Operations
```bash
# Chain with other text processors
bzcat file.bz2 | bzmore | grep "error"

# View compressed data with filtering
bzcat log.bz2 | grep "ERROR" | bzmore

# Process compressed data through multiple filters
bzcat data.bz2 | sort | uniq | bzmore
```

### Script Integration
```bash
# View files in backup directory
for file in /backup/*.bz2; do
    echo "Viewing: $file"
    bzmore "$file"
done

# Batch review compressed logs
find /var/log -name "*.bz2" -mtime -7 | while read log; do
    echo "Analyzing: $log"
    bzmore "$log"
done
```

## Advanced Usage

### Search and Filter
```bash
# Search within bzmore
bzmore logfile.bz2
# Then use: /ERROR pattern to search for "ERROR"

# View files with specific content
bzcat file.bz2 | grep "critical" | bzmore
```

### File Comparison
```bash
# Compare compressed files (requires decompression)
bzcat file1.bz2 > /tmp/file1.txt
bzcat file2.bz2 > /tmp/file2.txt
diff /tmp/file1.txt /tmp/file2.txt | bzmore
```

### Remote File Viewing
```bash
# View remote compressed files via SSH
ssh user@server "bzcat /path/to/file.bz2" | bzmore

# View compressed files from network share
smbclient //server/share -c "get file.bz2 -" | bzcat | bzmore
```

## Performance Optimization

### Memory Usage
```bash
# For very large files, use with care
bzmore huge_compressed_file.bz2

# Monitor memory usage during viewing
/usr/bin/time -v bzmore large_file.bz2
```

### File Access Patterns
```bash
# Efficient viewing of multiple files
bzmore *.log.bz2  # Better than decompressing each individually

# Use bzcat for pipes when no pagination needed
bzcat file.bz2 | head -100  # For first 100 lines only
```

## Troubleshooting

### Common Issues

#### File Not Found
```bash
# Check if file exists
ls -la document.txt.bz2

# Use absolute path
bzmore /full/path/to/document.txt.bz2

# Verify file permissions
ls -lh document.txt.bz2
```

#### Corrupted Files
```bash
# Test file integrity
bzip2 -t document.txt.bz2

# Try to recover if possible
bzip2 -k -d document.txt.bz2 2>/dev/null
bzmore document.txt.bz2
```

#### Permission Issues
```bash
# Check file permissions
ls -l document.txt.bz2

# Use sudo if necessary (with caution)
sudo bzmore /root/protected_file.bz2
```

#### Display Issues
```bash
# Clear screen if display is corrupted
clear

# Reset terminal if needed
reset

# Use with -s for better display on some terminals
bzmore -s document.txt.bz2
```

## Shell Scripts

### Automated Log Review
```bash
#!/bin/bash
# Automated compressed log reviewer

LOG_DIR="/var/log"
PATTERN="ERROR"

# Find recent compressed logs
find "$LOG_DIR" -name "*.bz2" -mtime -7 | while read logfile; do
    echo "=== Checking: $logfile ==="
    bzcat "$logfile" | grep "$PATTERN" | bzmore
    echo
done
```

### Batch File Viewer
```bash
#!/bin/bash
# View multiple compressed files sequentially

FILES=("$@")

if [ ${#FILES[@]} -eq 0 ]; then
    echo "Usage: $0 file1.bz2 [file2.bz2 ...]"
    exit 1
fi

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "=== Viewing: $file ==="
        bzmore "$file"
    else
        echo "File not found: $file"
    fi
done
```

## Related Commands

- [`bzip2`](/docs/commands/compression/bzip2) - Compress/decompress files with bzip2
- [`bzcat`](/docs/commands/compression/bzcat) - Concatenate and display bzip2 files
- [`bzless`](/docs/commands/file-management/bzless) - View bzip2 files with less
- [`more`](/docs/commands/file-management/more) - Display file contents page by page
- [`less`](/docs/commands/file-management/less) - View file contents with less
- [`gunzip`](/docs/commands/compression/gunzip) - Decompress gzip files
- [`xz`](/docs/commands/compression/xz) - XZ compression utility

## Best Practices

1. **Use bzmore for large files** to avoid memory issues with complete decompression
2. **Take advantage of search functions** within bzmore for efficient navigation
3. **Use -s option** for files with excessive spacing to improve readability
4. **Check file integrity** with `bzip2 -t` before viewing if you suspect corruption
5. **Use absolute paths** in scripts to avoid path resolution issues
6. **Combine with pipes** for custom filtering and processing workflows
7. **Consider bzless** for more advanced features if available on your system
8. **Use bzcat** when you don't need pagination for better performance
9. **Monitor system resources** when viewing very large compressed files
10. **Clean up temporary files** if using manual decompression for comparison

## Performance Tips

1. **bzmore** is memory efficient as it doesn't decompress the entire file at once
2. **Search functions** work on the current buffer, not the entire file
3. **Multiple files** are handled efficiently by reusing the same buffer
4. **Use bzcat** for small files or when you don't need interactive viewing
5. **Network viewing** through pipes can be slower due to transfer overhead
6. **Terminal speed** affects perceived performance when navigating large files
7. **Regular files** on fast storage provide the best viewing experience
8. **SSD storage** significantly improves performance for large compressed files

The `bzmore` command provides an efficient and convenient way to examine bzip2 compressed files without requiring full decompression, making it an essential tool for working with compressed text data, logs, and documents in Linux environments.