---
title: bzcmp - Compare bzip2 compressed files
sidebar_label: bzcmp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# bzcmp - Compare bzip2 compressed files

The `bzcmp` command is a specialized utility that allows you to compare bzip2 compressed files directly without needing to manually decompress them first. It acts as a wrapper around the standard `cmp` command, automatically handling bzip2 decompression before passing the uncompressed data to `cmp` for comparison. This tool is particularly useful when working with large compressed log files, backups, or archives where you need to quickly verify differences or perform integrity checks without the overhead of full decompression.

## Basic Syntax

```bash
bzcmp [cmp_options] file1 [file2]
bzdiff [diff_options] file1 [file2]
```

## Common Options

### Basic Comparison Options
- `-l, --verbose` - Show byte-by-byte comparison results
- `-s, --quiet` - Silent mode, only show exit status
- `-x` - Exit after first difference is found

### Output Format Options
- `-b, --print-bytes` - Print differing bytes as values
- `-h` - Do not follow symbolic links

### Skip and Ignore Options
- `-i num1[:num2], --ignore-initial=num1[:num2]` - Skip initial bytes from files
- `-n num, --bytes=num` - Compare only first N bytes

## Usage Examples

### Basic File Comparisons

#### Simple Comparisons
```bash
# Compare two bzip2 compressed files
bzcmp document1.txt.bz2 document2.txt.bz2

# Compare a compressed file with an uncompressed file
bzcmp document.txt.bz2 document.txt

# Compare a compressed file with its uncompressed version
bzcmp config.json.bz2 config.json

# Silent comparison (only exit status)
bzcmp -s backup1.tar.bz2 backup2.tar.bz2
```

#### Single File Comparisons
```bash
# Compare file with its compressed version
bzcmp log.txt

# This compares log.txt with log.txt.bz2
# Equivalent to: cmp log.txt <(bzcat log.txt.bz2)
```

### Detailed Comparison Analysis

#### Verbose Output
```bash
# Show detailed byte-by-byte differences
bzcmp -l old_config.conf.bz2 new_config.conf.bz2

# Print differing byte values
bzcmp -lb data1.csv.bz2 data2.csv.bz2

# Exit after finding first difference
bzcmp -x file1.bz2 file2.bz2
```

#### Limited Comparisons
```bash
# Compare only first 1024 bytes
bzcmp -n 1024 header1.txt.bz2 header2.txt.bz2

# Skip first 100 bytes from both files
bzcmp -i 100 file1.log.bz2 file2.log.bz2

# Skip different amounts from each file
bzcmp -i 50:75 backup1.tar.bz2 backup2.tar.bz2
```

## Practical Examples

### System Administration

#### Log File Analysis
```bash
# Compare rotated log files
bzcmp /var/log/application.log.1.bz2 /var/log/application.log.2.bz2

# Compare today's log with yesterday's compressed log
bzcmp -l /var/log/error.log /var/log/error.log.1.bz2

# Quick integrity check of backup logs
bzcmp -s system_backup.log.bz2 system_backup_current.log.bz2 && echo "Logs match" || echo "Logs differ"
```

#### Configuration File Management
```bash
# Compare current config with compressed backup
bzcmp /etc/ssh/sshd_config /backups/sshd_config.20231201.bz2

# Batch compare multiple config backups
for backup in /backups/nginx/*.bz2; do
    echo "Comparing with $backup"
    bzcmp /etc/nginx/nginx.conf "$backup"
done

# Verify configuration consistency across servers
bzcmp -s server1_nginx.conf.bz2 server2_nginx.conf.bz2
```

#### Backup Verification
```bash
# Verify database backup integrity
bzcmp -l database_dump.sql.bz2 database_dump_current.sql

# Compare incremental backups
bzcmp -i 1024 backup_incremental1.sql.bz2 backup_incremental2.sql.bz2

# Quick validation of compressed backups
bzcmp -s full_backup.tar.bz2 /reference/full_backup.tar.bz2
```

### Development Workflow

#### Source Code Comparison
```bash
# Compare compressed source code archives
bzcmp -l project_v1.0.tar.bz2 project_v1.1.tar.bz2

# Compare with previous version
bzcmp current_source.tar.bz2 previous_source.tar.bz2

# Verify build artifacts
bzcmp -s build_artifacts.tar.bz2 expected_artifacts.tar.bz2
```

#### Testing and Quality Assurance
```bash
# Compare test results with baseline
bzcmp test_results.log.bz2 baseline_results.log.bz2

# Validate data processing outputs
bzcmp -i 512 output_data.csv.bz2 expected_output.csv.bz2

# Regression testing
bzcmp -l regression_test.log.bz2 baseline_test.log.bz2
```

### Data Processing

#### Large File Operations
```bash
# Compare large datasets without full decompression
bzcmp -n 1048576 large_dataset1.csv.bz2 large_dataset2.csv.bz2

# Skip headers and compare data
bzcmp -i 100:100 financial_data1.csv.bz2 financial_data2.csv.bz2

# Verify data migration
bzcmp -s migrated_data.tar.bz2 source_data.tar.bz2
```

#### Archive Management
```bash
# Compare archive contents
bzcmp archive_2023Q1.tar.bz2 archive_2023Q2.tar.bz2

# Verify archive integrity
bzcmp -l backup.tar.bz2 backup_verification.tar.bz2

# Check for changes in log archives
bzcmp /logs/archives/january.log.bz2 /logs/archives/february.log.bz2
```

## Advanced Usage

### Script Integration

#### Automated Comparison Scripts
```bash
#!/bin/bash
# Automated log comparison script

LOG_DIR="/var/log"
ARCHIVE_DIR="/archives/logs"
THRESHOLD=100

compare_logs() {
    local current="$1"
    local previous="$2"

    if bzcmp -s "$current" "$previous"; then
        echo "Logs $current and $previous are identical"
        return 0
    else
        echo "Logs $current and $previous differ"
        # Count differences
        bzcmp -l "$current" "$previous" | wc -l
        return 1
    fi
}

# Compare today's log with yesterday's
today_log="$LOG_DIR/application.log"
yesterday_log="$ARCHIVE_DIR/application.log.1.bz2"

if [ -f "$today_log" ] && [ -f "$yesterday_log" ]; then
    compare_logs "$today_log" "$yesterday_log"
fi
```

#### Backup Integrity Checker
```bash
#!/bin/bash
# Backup integrity verification script

BACKUP_DIR="/backups"
REFERENCE_DIR="/reference/backups"

check_backup() {
    local backup="$1"
    local reference="$2"
    local backup_name=$(basename "$backup")

    echo "Checking $backup_name..."

    if bzcmp -s "$backup" "$reference"; then
        echo "✓ $backup_name matches reference"
        return 0
    else
        echo "✗ $backup_name differs from reference"
        # Show first few differences
        bzcmp -l -n 1000 "$backup" "$reference" | head -20
        return 1
    fi
}

# Check all backup files
for backup in "$BACKUP_DIR"/*.bz2; do
    if [ -f "$backup" ]; then
        base_name=$(basename "$backup" .bz2)
        reference="$REFERENCE_DIR/$base_name"

        if [ -f "$reference" ]; then
            check_backup "$backup" "$reference"
        else
            echo "⚠ No reference found for $base_name"
        fi
    fi
done
```

### Batch Processing

#### Multiple File Comparison
```bash
# Compare all compressed logs in a directory
for file in /logs/*.log.bz2; do
    echo "Comparing $file with uncompressed version"
    uncompressed="${file%.bz2}"
    if [ -f "$uncompressed" ]; then
        bzcmp -s "$file" "$uncompressed" && echo "Match" || echo "Different"
    fi
done

# Find differences in archive series
for i in {1..10}; do
    if [ -f "backup_$i.tar.bz2" ] && [ -f "backup_$((i+1)).tar.bz2" ]; then
        echo "Comparing backup_$i with backup_$((i+1))"
        bzcmp -l "backup_$i.tar.bz2" "backup_$((i+1)).tar.bz2"
    fi
done
```

#### Performance Monitoring
```bash
# Monitor comparison performance for large files
start_time=$(date +%s.%N)
bzcmp -l large_file1.bz2 large_file2.bz2 > /dev/null
end_time=$(date +%s.%N)

runtime=$(echo "$end_time - $start_time" | bc)
echo "Comparison completed in $runtime seconds"

# Memory usage during comparison
/usr/bin/time -v bzcmp -l file1.bz2 file2.bz2
```

## Integration with Other Tools

### Working with Pipelines
```bash
# Compare decompressed output with another file
bzcat log_file.bz2 | cmp - current_log.txt

# Use bzcmp output in scripts
if bzcmp -s file1.bz2 file2.bz2; then
    echo "Files are identical"
else
    echo "Files differ - showing differences:"
    bzcmp -l file1.bz2 file2.bz2 | head -20
fi

# Chain with other compression tools
bzcat file1.bz2 | cmp - <(bzcat file2.bz2)
```

### Combining with Text Processing
```bash
# Count differences between files
difference_count=$(bzcmp -l file1.bz2 file2.bz2 | wc -l)
echo "Found $difference_count differing bytes"

# Show differences in context
bzcat file1.bz2 > /tmp/file1_uncompressed
bzcat file2.bz2 > /tmp/file2_uncompressed
diff -u /tmp/file1_uncompressed /tmp/file2_uncompressed
rm /tmp/file1_uncompressed /tmp/file2_uncompressed
```

## Troubleshooting

### Common Issues

#### File Access Problems
```bash
# Permission denied errors
sudo bzcmp protected_file.bz2 another_file.bz2

# Symbolic link issues
bzcmp -h symlink_file.bz2 target_file.bz2

# Check if files are actually bzip2 compressed
file document.txt.bz2
```

#### Memory Issues with Large Files
```bash
# Compare only portions of large files
bzcmp -n 1048576 huge_file1.bz2 huge_file2.bz2  # First 1MB only

# Use incremental comparison
bzcmp -i 1048576:1048576 huge_file1.bz2 huge_file2.bz2  # Skip first 1MB

# Monitor memory usage
/usr/bin/time -v bzcmp file1.bz2 file2.bz2
```

#### Output Interpretation
```bash
# Understanding exit codes
bzcmp file1.bz2 file2.bz2
echo "Exit code: $?"  # 0 = identical, 1 = different, 2 = error

# Show detailed comparison
bzcmp -l file1.bz2 file2.bz2 | head -10

# Silent comparison for scripting
bzcmp -s file1.bz2 file2.bz2 && echo "Match" || echo "No match"
```

## Related Commands

- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`bzdiff`](/docs/commands/other/bzdiff) - Compare bzip2 files using diff
- [`bzcat`](/docs/commands/file-management/bzcat) - Decompress bzip2 files to stdout
- [`bzless`](/docs/commands/file-management/bzless) - View bzip2 compressed files
- [`bzip2`](/docs/commands/compression/bzip2) - Compress/decompress files using bzip2
- [`bunzip2`](/docs/commands/compression/bunzip2) - Decompress bzip2 files

## Best Practices

1. **Use silent mode (-s)** in scripts to only check if files differ
2. **Limit comparison scope** with -n for large files to improve performance
3. **Skip headers** with -i when comparing structured data files
4. **Check exit codes** to handle comparison results programmatically
5. **Use verbose mode (-l)** sparingly for large files due to output volume
6. **Verify file types** before comparing to avoid unexpected results
7. **Use -h option** when you don't want to follow symbolic links
8. **Monitor memory usage** when comparing very large compressed files
9. **Combine with other tools** for comprehensive file analysis
10. **Document comparison criteria** when using in automated workflows

## Performance Tips

1. **Single file comparison** is efficient for checking against compressed versions
2. **Byte-limited comparison** (-n) significantly speeds up large file checks
3. **Skip initial bytes** (-i) when comparing files with headers
4. **Use exit status** instead of verbose output for automated checks
5. **Batch processing** is more efficient than individual comparisons
6. **Memory usage** is lower than full decompression for most operations
7. **Consider file sizes** before comparison to estimate processing time
8. **Use appropriate comparison levels** based on your accuracy needs

The `bzcmp` command is an essential tool for anyone working with compressed files who needs to perform quick comparisons without the overhead of full decompression. Its seamless integration with the standard `cmp` command makes it familiar and easy to use while providing significant efficiency gains when dealing with bzip2 compressed data.