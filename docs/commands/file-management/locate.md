---
title: locate - Find Files by Name Using Database
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# locate - Find Files by Name Using Database

The `locate` command finds files by name using a pre-built database, making it much faster than `find` for simple name searches. It searches the entire filesystem almost instantly by looking up filenames in an indexed database.

## Basic Syntax

```bash
locate [OPTIONS] PATTERN...
```

## Common Options

### Search Options
- `-i, --ignore-case` - Case-insensitive search
- `-r, --regexp REGEXP` - Search using regular expressions
- `-e, --existing` - Report only files that currently exist
- `-c, --count` - Only print number of found entries
- `-b, --basename` - Match only the base name of files

### Database Options
- `-d, --database DBPATH` - Use database(s) at DBPATH
- `--statistics` - Print statistics about each database

### Output Options
- `-q, --quiet` - Quiet mode (no error messages)
- `-n, --limit N` - Limit output to N entries
- `-0, --null` - Separate output with null character instead of newline

## Usage Examples

### Basic Searching
```bash
# Find files by name
locate myfile.txt

# Find files matching pattern
locate "*.conf"

# Case-insensitive search
locate -i README

# Search for multiple patterns
locate ".bash" ".profile"
```

### Regular Expression Searches
```bash
# Use regular expressions
locate -r '\.log$'           # Files ending with .log
locate -r '^config'          # Files starting with config
locate -r 'error.*\.log$'    # Files matching error.*.log

# Complex regex patterns
locate -r '/home/.*/(documents|photos)/.*\.jpg'
```

### Output Control
```bash
# Count matching files
locate -c "*.txt"

# Limit results to 10 files
locate -n 10 "*.py"

# Show only base names
locate -b "config"

# Quiet mode (no error messages)
locate -q missing_file
```

### Database Management
```bash
# Use specific database
locate -d /custom/database.db pattern

# Show database statistics
locate --statistics

# Use multiple databases
locate -d /var/lib/mlocate/mlocate.db:/backup/db pattern
```

## Database Management

### Updating Database
```bash
# Update the locate database (requires root)
sudo updatedb

# Update specific directory
sudo updatedb -o custom.db -U /path/to/directory

# Update with specific options
sudo updatedb --prunepaths="/tmp,/var/tmp"
```

### Database Configuration
```bash
# Configuration file location
/etc/updatedb.conf

# Common configuration options
PRUNE_BIND_MOUNTS="yes"
PRUNEPATHS="/tmp /var/spool /media"
PRUNEFS="NFS nfs nfs4 rpc_pipefs afs binfmt_misc proc smbfs autofs iso9660 ncpfs coda devpts ftpfs devfs mfs shfs sysfs cifs lustre"
```

## Practical Examples

### Configuration File Searches
```bash
# Find all configuration files
locate -i ".conf"

# Find configuration in /etc
locate -r '^/etc/.*\.conf$'

# Find SSH configuration files
locate -r 'ssh.*config'
```

### Log File Searches
```bash
# Find all log files
locate -r '\.log$'

# Find access logs
locate -b "access.log"

# Find error logs in /var/log
locate -r '^/var/log.*error.*\.log$'
```

### Executable Searches
```bash
# Find executable files
locate -b "python"

# Find binaries in /usr/bin
locate -r '^/usr/bin/.*'

# Find shell scripts
locate -r '\.sh$'
```

### Media File Searches
```bash
# Find image files
locate -r '\.(jpg|png|gif|bmp)$'

# Find music files
locate -r '\.(mp3|wav|ogg|flac)$'

# Find video files
locate -r '\.(mp4|avi|mkv|mov)$'
```

## Advanced Usage

### Combining with Other Commands
```bash
# Count total matching files
locate "*.log" | wc -l

# Find and process files
locate "*.tmp" | xargs rm

# Search within found files
locate "*.py" | xargs grep -l "TODO"

# Create archive of found files
locate -0 "*.txt" | xargs -0 tar -czf text_files.tar.gz
```

### File System Analysis
```bash
# Find duplicate file names
locate -b "config" | sort | uniq -d

# Find files in specific directory
locate -r '^/home/user/.*'

# Find files by size (requires additional processing)
locate -b "*.log" | xargs ls -lh | sort -k5 -hr
```

### Security Audits
```bash
# Find SUID files
locate -perm -4000 2>/dev/null

# Find world-writable files
locate -perm -002 2>/dev/null

# Find configuration files with sensitive data
locate -r '\.conf$' | xargs grep -l "password" 2>/dev/null
```

## Performance Considerations

### When to Use locate vs find

**Use locate when:**
- Searching by filename only
- Need speed over real-time accuracy
- Searching entire filesystem
- Doing frequent name searches

**Use find when:**
- Need real-time results
- Searching by file attributes (size, time, permissions)
- Need to execute commands on found files
- Searching specific directory structure

### Optimization Tips
```bash
# Limit search to current system files
locate -n 100 pattern

# Use base name search for better performance
locate -b "python"

# Use case-insensitive search carefully
locate -i "config"  # May return more results than needed

# Regular expressions can be slower
locate "*.conf"      # Faster than
locate -r '\.conf$'  # This
```

## Database Maintenance

### Scheduled Updates
```bash
# Add to cron for daily updates
sudo crontab -e
# Add: 0 2 * * * /usr/bin/updatedb

# Manual update after major changes
sudo updatedb
```

### Custom Databases
```bash
# Create database for specific directory
sudo updatedb -o ~/myfiles.db -U ~/Documents

# Search custom database
locate -d ~/myfiles.db pattern

# Update custom database
updatedb -o ~/myfiles.db -U ~/Documents
```

## Troubleshooting

### Common Issues

```bash
# File not found (database outdated)
sudo updatedb
locate filename

# Permission denied accessing database
sudo locate filename

# Too many results
locate -n 20 pattern

# Case sensitivity issues
locate -i pattern
```

### Database Corruption
```bash
# Rebuild database completely
sudo rm /var/lib/mlocate/mlocate.db
sudo updatedb
```

## Integration with Other Tools

### Shell Scripts
```bash
#!/bin/bash
# Find and backup configuration files
for file in $(locate -r '^/etc/.*\.conf$'); do
    cp "$file" "/backup/$(basename $file).$(date +%Y%m%d)"
done
```

### System Administration
```bash
# Monitor new files since last update
sudo updatedb
# Make changes...
# Compare with previous database state
```

## Security Considerations

### Privacy Issues
```bash
# Locate can show all files on system
# Some distributions don't index /home by default

# Check what's being indexed
sudo updatedb --debug
```

### Access Control
```bash
# Regular users can't see files they don't have permission for
# Database contains all file names but locate filters by permissions
```

## Related Commands

- [`find`](/docs/commands/file-management/find) - Find files with more complex criteria
- [`updatedb`](/docs/commands/file-management/updatedb) - Update locate database
- [`grep`](/docs/commands/text-processing/grep) - Search within files
- [`which`](/docs/commands/system-info/which) - Find command locations
- [`whereis`](/docs/commands/system-info/whereis) - Find command binaries and sources

## Best Practices

1. **Update database regularly** for accurate results
2. **Use -n limit** for large result sets
3. **Combine with grep** for more specific searches
4. **Use -i** for case-insensitive filename searches
5. **Use find** when you need real-time or attribute-based searches

## Tips and Tricks

### Efficient Searching
```bash
# Use specific patterns
locate "httpd.conf"           # Better than
locate "*.conf" | grep httpd  # This

# Use base name search for speed
locate -b "python"            # Faster than full path search

# Combine patterns effectively
locate -r '\.(log|txt|conf)$' # Multiple extensions
```

### Automation
```bash
# Create quick file inventory
locate -c "*" > file_count.txt

# Find recently added files (after updatedb run)
# Note: locate doesn't track modification time
# Use find for time-based searches
```

The `locate` command provides extremely fast filename searches by using a pre-built database. While it's much faster than `find` for simple name searches, it trades real-time accuracy for speed. Keep the database updated for best results.