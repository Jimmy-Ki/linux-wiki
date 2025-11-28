---
title: comm - Compare sorted files line by line
sidebar_label: comm
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# comm - Compare sorted files line by line

The `comm` command is a powerful utility that compares two sorted files line by line and produces three columns of output: lines unique to the first file, lines unique to the second file, and lines common to both files. It's an essential tool for file comparison, data deduplication, set operations, and text analysis tasks. The command requires both input files to be sorted for proper operation, making it particularly useful for processing logs, configuration files, and any structured text data where you need to identify differences and similarities.

## Basic Syntax

```bash
comm [OPTION]... FILE1 FILE2
```

## Common Options

### Output Control
- `-1` - Suppress column 1 (lines unique to FILE1)
- `-2` - Suppress column 2 (lines unique to FILE2)
- `-3` - Suppress column 3 (lines common to both files)
- `--check-order` - Check that the input is correctly sorted
- `--nocheck-order` - Do not check that the input is correctly sorted
- `--output-delimiter=STR` - Separate columns with STR

### Help and Version
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic File Comparison

#### Simple Comparison
```bash
# Compare two files with all three columns
comm file1.txt file2.txt

# Create sample files for demonstration
cat > file1.txt << EOF
apple
banana
cherry
date
elderberry
EOF

cat > file2.txt << EOF
apple
banana
fig
grape
elderberry
EOF

# Compare the files
comm file1.txt file2.txt
# Output:
#         apple      (column 3: common to both)
#         banana     (column 3: common to both)
# cherry             (column 1: unique to file1)
# date               (column 1: unique to file1)
#         fig        (column 2: unique to file2)
#         grape      (column 2: unique to file2)
#         elderberry (column 3: common to both)
```

#### Selective Column Display
```bash
# Show only lines unique to file1
comm -23 file1.txt file2.txt

# Show only lines unique to file2
comm -13 file1.txt file2.txt

# Show only common lines
comm -12 file1.txt file2.txt

# Show lines unique to either file (symmetric difference)
comm -3 file1.txt file2.txt
```

### Working with Unsorted Files

#### Sorting Files Before Comparison
```bash
# Sort files first, then compare
sort file1.txt > sorted1.txt
sort file2.txt > sorted2.txt
comm sorted1.txt sorted2.txt

# Using process substitution for immediate sorting
comm <(sort file1.txt) <(sort file2.txt)

# Sort files in place (overwrites original)
sort -o file1.txt file1.txt
sort -o file2.txt file2.txt
comm file1.txt file2.txt

# Check if files are sorted before comparison
comm --check-order file1.txt file2.txt
```

### Set Operations

#### Union, Intersection, Difference
```bash
# Set intersection (lines in both files)
comm -12 <(sort file1.txt) <(sort file2.txt)

# Set difference (lines in file1 but not in file2)
comm -23 <(sort file1.txt) <(sort file2.txt)

# Set difference (lines in file2 but not in file1)
comm -13 <(sort file1.txt) <(sort file2.txt)

# Symmetric difference (lines in either file but not both)
comm -3 <(sort file1.txt) <(sort file2.txt)

# Set union (all unique lines from both files)
comm -3 <(sort file1.txt) <(sort file2.txt) | sort
```

### Data Deduplication

#### Finding Duplicate Lines
```bash
# Find lines that appear in both files
comm -12 file1.txt file2.txt > duplicates.txt

# Find unique lines across multiple files
comm -23 file1.txt file2.txt | comm -13 - file3.txt

# Remove duplicates from a single file
comm -13 <(sort file.txt) <(sort file.txt | uniq -d)

# Keep only unique lines (remove all duplicates)
sort file.txt | uniq -c | awk '$1 == 1 {print $2}'
```

### Custom Output Formatting

#### Changing Delimiters
```bash
# Use custom delimiter between columns
comm --output-delimiter=" | " file1.txt file2.txt

# Use tabs instead of spaces
comm --output-delimiter=$'\t' file1.txt file2.txt

# Use comma as delimiter
comm --output-delimiter="," file1.txt file2.txt

# Create CSV output
comm --output-delimiter="," file1.txt file2.txt | sed 's/^,//;s/,$//'
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# Compare system configuration files
comm /etc/hosts /etc/hosts.backup

# Find differences in service configurations
comm <(sort /etc/services) <(sort /etc/services.old)

# Compare user lists
comm <(sort /etc/passwd | cut -d: -f1) <(sort users.txt)

# Compare package lists
comm <(dpkg --get-selections | awk '{print $1}' | sort) \
     <(cat required_packages.txt | sort)

# Find new or modified configuration files
comm <(find /etc -type f -name "*.conf" -exec md5sum {} \; | sort) \
     <(cat /etc/md5sums_backup | sort)
```

#### Log File Analysis
```bash
# Compare log files from different days
comm <(sort /var/log/syslog.1) <(sort /var/log/syslog.2)

# Find unique error messages
comm -23 <(grep ERROR /var/log/app.log | sort | uniq) \
        <(grep ERROR /var/log/app.log.1 | sort | uniq)

# Compare access patterns
comm <(awk '{print $1}' /var/log/nginx/access.log | sort | uniq) \
     <(awk '{print $1}' /var/log/nginx/access.log.1 | sort | uniq)

# Find new IP addresses in logs
comm -23 <(awk '{print $1}' current_logs.txt | sort | uniq) \
        <(awk '{print $1}' previous_logs.txt | sort | uniq)
```

### Development Workflow

#### Code Comparison
```bash
# Compare function lists
comm <(grep -n "^function" source1.js | sort) \
     <(grep -n "^function" source2.js | sort)

# Compare imports/dependencies
comm <(grep "^import" file1.py | sort) \
     <(grep "^import" file2.py | sort)

# Find duplicate functions across files
comm -12 <(grep -h "def " *.py | sort | uniq) \
        <(grep -h "def " *.py | sort | uniq -d)

# Compare API endpoints
comm <(grep "app\." routes1.py | sort) \
     <(grep "app\." routes2.py | sort)
```

#### Database Schema Comparison
```bash
# Compare table definitions
comm <(mysql -e "SHOW TABLES;" database1 | sort) \
     <(mysql -e "SHOW TABLES;" database2 | sort)

# Compare column definitions
comm <(mysql -e "DESCRIBE users;" db1 | sort) \
     <(mysql -e "DESCRIBE users;" db2 | sort)

# Find missing indexes
comm -23 <(mysql -e "SHOW INDEX FROM table;" db1 | awk '{print $2}' | sort | uniq) \
        <(mysql -e "SHOW INDEX FROM table;" db2 | awk '{print $2}' | sort | uniq)
```

### Data Processing

#### List Management
```bash
# Merge email lists and remove duplicates
comm -23 <(sort list1.txt) <(sort list2.txt) > unique1.txt
comm -13 <(sort list1.txt) <(sort list2.txt) > unique2.txt
cat unique1.txt unique2.txt <(comm -12 <(sort list1.txt) <(sort list2.txt)) > merged_unique.txt

# Find common items in shopping lists
comm -12 <(sort shopping_list.txt) <(sort inventory.txt) > available_items.txt

# Compare permission sets
comm <(sort file_permissions.txt) <(sort required_permissions.txt)

# Find missing dependencies
comm -23 <(sort required_deps.txt) <(sort installed_deps.txt)
```

#### Text Analysis
```bash
# Compare word frequency lists
comm <(sort wordfreq1.txt) <(sort wordfreq2.txt)

# Find unique words in documents
comm -23 <(sort doc1_words.txt) <(sort doc2_words.txt)

# Compare dictionary entries
comm -12 <(sort dictionary1.txt) <(sort dictionary2.txt)

# Analyze vocabulary overlap
comm -12 <(sort vocab_text1.txt) <(sort vocab_text2.txt) | wc -l
```

## Advanced Usage

### Complex File Operations

#### Multi-file Comparisons
```bash
# Compare three files using temporary files
comm -12 file1.txt file2.txt > temp_common.txt
comm -12 temp_common.txt file3.txt

# Find lines common to all files in a directory
for file in *.txt; do sort "$file" > "sorted_$file"; done
comm -12 sorted_file1.txt sorted_file2.txt | comm -12 - sorted_file3.txt

# Cascading comparisons
comm -12 <(comm -12 file1.txt file2.txt) file3.txt
```

#### Pipeline Integration
```bash
# Compare command outputs
comm <(ls -la /bin | sort) <(ls -la /usr/bin | sort)

# Compare process lists
comm <(ps aux | sort) <(ps aux.old | sort)

# Compare network connections
comm <(netstat -tuln | sort) <(netstat -tuln.old | sort)

# Compare package versions
comm <(rpm -qa | sort) <(cat package_list.txt | sort)
```

### Performance Optimization

#### Large File Handling
```bash
# Use memory-efficient sorting for large files
LC_ALL=C sort file1.txt > sorted1.txt
LC_ALL=C sort file2.txt > sorted2.txt
comm sorted1.txt sorted2.txt

# Process large files in chunks
split -l 100000 large_file.txt chunk_
for chunk in chunk_*; do
    comm -12 <(sort "$chunk") <(sort reference.txt) >> common_lines.txt
done

# Parallel processing with GNU parallel
cat files_to_compare.txt | parallel -j 4 'comm -12 <(sort {}) <(sort master.txt)'
```

### Custom Scripts and Functions

#### Comparison Wrapper Script
```bash
#!/bin/bash
# Enhanced comm wrapper with sorting and error handling

smart_comm() {
    local file1="$1"
    local file2="$2"
    local options="$3"

    if [[ ! -f "$file1" || ! -f "$file2" ]]; then
        echo "Error: Both files must exist"
        return 1
    fi

    # Check if files are sorted
    if ! sort -c "$file1" 2>/dev/null; then
        echo "Sorting $file1..."
        sort -o "$file1" "$file1"
    fi

    if ! sort -c "$file2" 2>/dev/null; then
        echo "Sorting $file2..."
        sort -o "$file2" "$file2"
    fi

    comm $options "$file1" "$file2"
}

# Usage examples
smart_comm file1.txt file2.txt "-12"
smart_comm unsorted1.txt unsorted2.txt "-3"
```

#### Batch Comparison Function
```bash
#!/bin/bash
# Compare multiple files against a reference

compare_all() {
    local reference="$1"
    shift
    local files=("$@")

    for file in "${files[@]}"; do
        echo "Comparing $file with $reference:"
        echo "Common lines:"
        comm -12 <(sort "$reference") <(sort "$file")
        echo "Lines unique to $file:"
        comm -13 <(sort "$reference") <(sort "$file")
        echo "---"
    done
}

# Usage
compare_all master.txt file1.txt file2.txt file3.txt
```

## Troubleshooting

### Common Issues

#### Unsorted Input Files
```bash
# Problem: Files not sorted
# Error: comm: file 1 is not in sorted order
# Solution: Sort files first
sort file1.txt -o file1.txt
sort file2.txt -o file2.txt
comm file1.txt file2.txt

# Skip sorting check (not recommended)
comm --nocheck-order unsorted1.txt unsorted2.txt

# Sort and compare in one command
comm <(sort file1.txt) <(sort file2.txt)
```

#### Different Line Endings
```bash
# Problem: Windows vs Unix line endings
# Solution: Normalize line endings
dos2unix file1.txt file2.txt
comm file1.txt file2.txt

# Convert using sed
sed 's/\r$//' file1.txt > file1_unix.txt
sed 's/\r$//' file2.txt > file2_unix.txt
comm file1_unix.txt file2_unix.txt
```

#### Encoding Issues
```bash
# Problem: Different character encodings
# Solution: Convert to same encoding
iconv -f latin1 -t utf8 file1.txt > file1_utf8.txt
iconv -f latin1 -t utf8 file2.txt > file2_utf8.txt
comm file1_utf8.txt file2_utf8.txt

# Check encoding
file -i file1.txt
file -i file2.txt
```

#### Memory Limitations
```bash
# Problem: Out of memory with large files
# Solution: Use disk-based sorting
TMPDIR=/tmp comm <(sort -T /tmp file1.txt) <(sort -T /tmp file2.txt)

# Split large files
split -l 1000000 huge_file.txt part_
for part in part_*; do
    sort "$part" > "sorted_$part"
done
```

## Related Commands

- [`sort`](/docs/commands/file-management/sort) - Sort lines of text files
- [`uniq`](/docs/commands/file-management/uniq) - Remove duplicate lines from sorted files
- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`cmp`](/docs/commands/file-management/cmp) - Compare two files byte by byte
- [`join`](/docs/commands/file-management/join) - Join lines of two files on a common field
- [`grep`](/docs/commands/file-management/grep) - Search for patterns in files
- [`cut`](/docs/commands/file-management/cut) - Remove sections from each line of files
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language

## Best Practices

1. **Always sort input files** before using `comm` for accurate results
2. **Use process substitution** `<(sort file)` for one-time comparisons
3. **Choose appropriate column options** (-1, -2, -3) based on your needs
4. **Backup original files** before sorting them in place
5. **Use `--check-order`** when unsure if files are properly sorted
6. **Consider encoding** and line ending issues when comparing files from different systems
7. **Use custom delimiters** for better output formatting in scripts
8. **Combine with other tools** like `grep`, `cut`, and `awk` for complex processing
9. **Test with small files** first before processing large datasets
10. **Handle errors gracefully** in scripts when files don't exist or aren't sorted

## Performance Tips

1. **LC_ALL=C** can speed up sorting and comparison for ASCII text
2. **Parallel processing** with `sort --parallel` on multi-core systems
3. **Memory allocation** with `sort -S` for large file operations
4. **Temporary files** on fast storage (SSD) for sorting operations
5. **Avoid multiple sorts** by reusing sorted files in comparisons
6. **Use appropriate comparison method**: `comm` for set operations, `diff` for detailed differences
7. **Minimize disk I/O** by using pipes and process substitution
8. **Consider file size**: `comm` is efficient for moderate-sized files but may need chunking for very large datasets
9. **Batch operations** when comparing many files against the same reference
10. **Use SSD storage** for temporary files during large sorting operations

The `comm` command is an essential tool for file comparison and set operations, providing a simple yet powerful way to analyze relationships between sorted text files. Its column-based output makes it ideal for identifying differences, finding commonalities, and performing various data analysis tasks efficiently.

*Tip: For best results, always ensure your input files are properly sorted before using `comm`.*