---
title: uniq - Report or Omit Repeated Lines
sidebar_label: uniq
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# uniq - Report or Omit Repeated Lines

The `uniq` command is a powerful text processing utility that filters adjacent duplicate lines from input. It is commonly used to remove duplicate entries, count occurrences, analyze data patterns, and perform data quality checks in sorted files. The command works most effectively when combined with `sort` to process unsorted data, making it an essential tool for system administrators, data analysts, and developers working with log files, data processing, and text manipulation tasks.

## Basic Syntax

```bash
uniq [OPTION]... [INPUT [OUTPUT]]
```

## Parameters

- `INPUT` - Input file to process (default: standard input)
- `OUTPUT` - Output file for results (default: standard output)

## Core Options

### Filtering and Display Options

#### Basic Filtering
- `-c, --count` - Prefix lines by the number of occurrences
- `-d, --repeated` - Only print duplicate lines, one for each group
- `-D, --all-repeated[=METHOD]` - Print all duplicate lines
- `-u, --unique` - Only print unique lines (non-duplicate)

#### Grouping and Formatting
- `--group[=METHOD]` - Show all items with empty lines separating groups
  - `separate` - Separate groups with empty lines (default)
  - `prepend` - Prepend empty line to each group
  - `append` - Append empty line to each group
  - `both` - Prepend and append empty lines

### Comparison Control Options

#### Content-based Comparison
- `-i, --ignore-case` - Ignore differences in case when comparing
- `-s, --skip-chars=N` - Skip N characters at start of line when comparing
- `-w, --check-chars=N` - Compare only first N characters of each line

#### Field-based Comparison
- `-f, --skip-fields=N` - Skip N fields at start of line when comparing
- Field delimiter is whitespace by default

### Input/Output Options

#### Line Delimiter
- `-z, --zero-terminated` - Use NULL character instead of newline as line delimiter

### Help and Information
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Duplicate Removal Operations

#### Simple Duplicate Filtering
```bash
# Remove adjacent duplicate lines from file
uniq data.txt

# Process unsorted data (requires sorting)
sort unsorted_data.txt | uniq

# Remove duplicates and save to new file
sort data.txt | uniq > unique_output.txt

# Chain with standard input/output
cat data.txt | sort | uniq > unique_data.txt
```

#### Alternative Sorting Methods
```bash
# Using sort -u (single command alternative)
sort -u data.txt

# Remove duplicates while preserving original order
awk '!seen[$0]++' data.txt

# Remove duplicates from multiple files
cat file1.txt file2.txt | sort | uniq > merged_unique.txt
```

### Counting and Frequency Analysis

#### Basic Counting Operations
```bash
# Count occurrences of each line
sort access_log.txt | uniq -c

# Count and sort by frequency (most common first)
sort data.txt | uniq -c | sort -nr

# Count and sort by frequency (least common first)
sort data.txt | uniq -c | sort -n

# Get top N most frequent entries
sort log_entries.txt | uniq -c | sort -nr | head -20

# Get bottom N least frequent entries
sort data.txt | uniq -c | sort -n | head -10
```

#### Advanced Counting and Analysis
```bash
# Count with formatting
sort data.txt | uniq -c | awk '{printf "%3d: %s\n", $1, substr($0, index($0,$2))}'

# Count occurrences exceeding threshold
sort data.txt | uniq -c | awk '$1 > 5 {print $0}'

# Create frequency distribution report
sort data.txt | uniq -c | awk '{counts[$1]++} END {for (freq in counts) print freq " occurrences:", counts[freq] " lines"}'

# Calculate statistics
sort data.txt | uniq -c | awk '{sum+=$1; lines++} END {print "Average frequency:", sum/lines}'
```

### Selective Line Filtering

#### Show Only Specific Line Types
```bash
# Show only lines that appear more than once (duplicates)
sort data.txt | uniq -d

# Show only lines that appear exactly once (unique lines)
sort data.txt | uniq -u

# Show all duplicate occurrences
sort data.txt | uniq -D

# Show all duplicates with grouping
sort data.txt | uniq -D --group=separate
```

#### Advanced Filtering Techniques
```bash
# Show duplicates with different grouping methods
sort data.txt | uniq --group=prepend
sort data.txt | uniq --group=append
sort data.txt | uniq --group=both

# Count and show only duplicates
sort data.txt | uniq -cd

# Show unique lines with their context
sort data.txt | uniq -u | nl
```

### Case-Insensitive Processing

#### Case-Insensitive Operations
```bash
# Remove case-insensitive duplicates
sort -f data.txt | uniq -i

# Count case-insensitive occurrences
sort -f data.txt | uniq -ic

# Show case-insensitive duplicates only
sort -f data.txt | uniq -id

# Process mixed-case email addresses
tr '[:upper:]' '[:lower:]' < emails.txt | sort | uniq -c
```

#### Locale-Aware Processing
```bash
# Use specific locale for comparison
LC_ALL=C sort data.txt | uniq -c

# Case-insensitive with specific locale
LC_ALL=en_US.UTF-8 sort -f data.txt | uniq -i

# Handle Unicode properly
export LANG=en_US.UTF-8
sort data.txt | uniq -c
```

## Practical Examples

### System Administration and Monitoring

#### Log File Analysis
```bash
# Analyze web server access logs
# Count requests per IP address
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -20

# Find most accessed URLs
awk '{print $7}' /var/log/apache2/access.log | sort | uniq -c | sort -nr | head -10

# Count HTTP status codes distribution
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# Analyze user agents
awk -F'"' '{print $6}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10

# Identify suspicious high-frequency requests
awk '{print $1,$7}' /var/log/nginx/access.log | sort | uniq -c | awk '$1 > 100 {print $0}'

# Track error patterns
awk '$9 >= 400 {print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# Monitor real-time log patterns
tail -f /var/log/application.log | while read line; do
    echo "$line" | sort | uniq -c
done
```

#### Process and System Monitoring
```bash
# Count running processes by name
ps aux | awk '{print $11}' | sort | uniq -c | sort -nr | head -15

# Find users with most processes
ps aux | awk '{print $1}' | sort | uniq -c | sort -nr

# Monitor duplicate log entries in real-time
tail -f /var/log/syslog | sort | uniq -c

# Check for duplicate cron jobs across all users
for user in $(cut -d: -f1 /etc/passwd); do
    crontab -u $user -l 2>/dev/null | sort | uniq -d
done

# Analyze system call traces
strace -p 1234 2>&1 | awk '{print $1}' | sort | uniq -c | sort -nr

# Monitor file access patterns
inotifywait -m -r /path | awk '{print $3}' | sort | uniq -c | sort -nr
```

#### Network Monitoring
```bash
# Analyze network connections by state
ss -tuln | awk '{print $1}' | sort | uniq -c | sort -nr

# Count connections per IP
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -10

# Monitor DNS queries
tcpdump -n port 53 | awk '{print $8}' | sort | uniq -c | sort -nr

# Analyze firewall logs
awk '{print $5}' /var/log/ufw.log | sort | uniq -c | sort -nr
```

### File Processing and Data Management

#### Email and Contact Processing
```bash
# Remove duplicate email addresses while preserving case
awk '!seen[tolower($0)]++' emails.txt

# Count unique domains from email list
cut -d'@' -f2 emails.txt | sort | uniq -c | sort -nr | head -10

# Remove case-insensitive email duplicates
tr '[:upper:]' '[:lower:]' < emails.txt | sort | uniq -c

# Find duplicate email domains
cut -d'@' -f2 emails.txt | sort | uniq -d

# Process CSV with email validation
awk -F',' '{if ($3 ~ /@/) print tolower($3)}' contacts.csv | sort | uniq -c
```

#### File System Analysis
```bash
# Find duplicate files by size
find . -type f -exec ls -l {} \; | awk '{print $5}' | sort | uniq -d | while read size; do
    echo "Files with size: $size"
    find . -type f -size "${size}c" -exec ls -l {} \;
done

# Analyze file extensions
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -nr

# Find duplicate filenames (case-insensitive)
find . -type f -exec basename {} \; | tr '[:upper:]' '[:lower:]' | sort | uniq -d

# Check for duplicate configuration entries
grep -v '^#' /etc/ssh/sshd_config | sort | uniq -d

# Analyze duplicate file permissions
find . -type f -exec stat -c "%a" {} \; | sort | uniq -c | sort -nr
```

#### Text Processing and Content Analysis
```bash
# Deduplicate word list from document
tr -cs '[:alnum:]' '\n' < document.txt | sort | uniq -c | sort -nr

# Find duplicate lines in configuration files
grep -v '^#\|^$' config.txt | sort | uniq -d

# Count unique characters in text file
fold -w1 text.txt | sort | uniq -c | sort -nr

# Analyze duplicate paragraphs in markdown files
awk -v RS='' '{print}' document.md | sort | uniq -c | sort -nr

# Process log file with timestamp analysis
awk '{print $1,$2}' /var/log/syslog | sort | uniq -c | sort -nr
```

### Database and Data Processing

#### CSV and Database Analysis
```bash
# Analyze survey responses
sort survey_responses.txt | uniq -c | sort -nr | head -20

# Count unique values in CSV column
cut -d',' -f3 data.csv | tail -n +2 | sort | uniq -c | sort -nr

# Remove duplicate records based on specific field
sort -t',' -k1,1 data.csv | uniq

# Find duplicate database entries
awk -F',' '{print $1,$2}' database_export.csv | sort | uniq -d

# Analyze data quality - find exact duplicates
sort data.csv | uniq -D

# Remove duplicates while preserving header (line 1)
(head -n1 data.csv && tail -n +2 data.csv | sort | uniq) > dedup_data.csv

# Count records by category
cut -d',' -f2 data.csv | sort | uniq -c | sort -nr

# Multi-column deduplication
sort -t',' -k1,1 -k2,2 data.csv | uniq
```

#### Data Quality and Validation
```bash
# Find inconsistent data patterns
awk '{print length($0)}' data.txt | sort | uniq -c | sort -nr

# Check for duplicate IDs in dataset
awk -F',' '{print $1}' data.csv | sort | uniq -d

# Validate unique constraint violations
awk -F',' '{count[$1]++} END {for (id in count) if (count[id] > 1) print id, count[id]}' data.csv

# Find duplicate records with different cases
awk -F',' '{print tolower($1)}' data.csv | sort | uniq -d

# Analyze duplicate timestamps
awk '{print $1}' data_with_timestamps.txt | sort | uniq -d
```

### Security Analysis

#### Security Log Analysis
```bash
# Analyze failed login attempts by IP
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr

# Count suspicious user activities
awk '/su: failed/ {print $(NF-1)}' /var/log/auth.log | sort | uniq -c | sort -nr

# Analyze port scan attempts
grep "port" /var/log/ufw.log | awk '{print $9}' | sort | uniq -c | sort -nr

# Find duplicate SSH key attempts
grep "Accepted publickey" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -nr

# Monitor repeated sudo failures
grep "sudo:" /var/log/auth.log | awk '{print $6}' | sort | uniq -c | sort -nr
```

## Advanced Usage

### Field and Character-based Processing

#### Field-based Comparison
```bash
# Skip first field when comparing duplicates (common for CSV data)
uniq -f1 data.txt

# Skip first 2 fields when comparing
uniq -f2 server_logs.txt

# Skip first field and compare only first 10 characters
uniq -f1 -w10 user_data.txt

# Advanced field skipping with custom delimiter
awk -F',' '{print $2,$3}' data.csv | sort | uniq -c

# Skip timestamp fields in log files
awk '{print substr($0, index($0,$4))}' logs.txt | sort | uniq -c
```

#### Character-based Comparison
```bash
# Skip first 5 characters of each line (useful for log timestamps)
uniq -s5 log_with_timestamps.txt

# Compare only first N characters (prefix matching)
uniq -w3 prefixes.txt

# Skip characters and limit comparison length
uniq -s10 -w15 partial_matching.txt

# Combine character and field skipping
uniq -f1 -s5 complex_data.txt

# Custom character range matching
awk '{print substr($0, 10, 15)}' data.txt | sort | uniq -c
```

### Complex Data Processing Techniques

#### Order-Preserving Deduplication
```bash
# Remove duplicates while preserving first occurrence order
awk '!seen[$0]++' unsorted_data.txt

# Remove duplicates while preserving last occurrence order
awk 'seen[$0]++ == 0' unsorted_data.txt | tac

# Find duplicates in unsorted file without sorting
awk 'seen[$0]++ == 1' unsorted_data.txt
awk 'seen[$0] == 1' unsorted_data.txt

# Count occurrences in original order
awk '{count[$0]++} END {for (line in count) print count[line], line}' data.txt | sort -nr

# Preserve order with custom key
awk -F',' '!key[$1]++' data.csv
```

#### Advanced Pattern Matching
```bash
# Case-insensitive deduplication with original case preservation
awk '!seen[tolower($0)]++' mixed_case.txt

# Remove whitespace-insensitive duplicates
awk '!seen[$0=$1$2$3]++' data_with_whitespace.txt

# Pattern-based deduplication (keep first match of each pattern)
awk '!seen[gensub(/^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+/, "IP", "g", $0)]++' network_logs.txt

# Regex-based key extraction for deduplication
awk '!seen[gensub(/.*@(.*)/, "\\1", "g")]++' email_list.txt
```

### Grouping and Advanced Formatting

#### Advanced Grouping Options
```bash
# Group duplicates with empty lines between groups
sort data.txt | uniq --group=separate

# Group duplicates with headers before each group
sort data.txt | uniq --group=prepend

# Show all duplicate entries with context
sort data.txt | uniq -D --group=both

# Custom grouping with AWK
awk '{if ($0 != prev) if (prev) print "---"; print; prev=$0}' sorted_data.txt

# Create hierarchical grouping
sort data.txt | uniq -c | awk '{
    if ($1 != prev_count) {
        if (prev_count) print "=== Group change ==="
        prev_count = $1
    }
    print $0
}'
```

#### Advanced Formatting and Reporting
```bash
# Create summary report with alignment
sort data.txt | uniq -c | awk '{printf "%-6s %s\n", $1, substr($0, 8)}'

# Format output with custom separators
sort data.txt | uniq -c | awk '{printf "%s:%s\n", $2, $1}'

# Create bar chart of frequencies
sort data.txt | uniq -c | sort -nr | awk '{printf "%-20s %s\n", $2, sprintf("%*s", $1, "")}'

# Generate frequency distribution report
sort data.txt | uniq -c | awk '{
    total += $1
    frequencies[$1]++
}
END {
    print "Frequency Distribution:"
    for (freq in frequencies)
        printf "%3d occurrences: %d items\n", freq, frequencies[freq]
    print "Total items:", total
}'

# Multi-level analysis with percentages
sort data.txt | uniq -c | sort -nr | awk '{
    total += $1
    items[++count] = $0
}
END {
    for (i = 1; i <= count; i++) {
        split(items[i], arr)
        printf "%3d: %-30s %5.1f%%\n", arr[1], substr(items[i], index(items[i], arr[2])), (arr[1]/total)*100
    }
}'
```

### Performance-Optimized Processing

#### Memory-Efficient Processing
```bash
# Process large files in chunks
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do
    sort "$chunk" | uniq -c >> counts.txt
    rm "$chunk"
done

# Use temporary files for intermediate steps
sort huge_file.txt > /tmp/sorted_file.txt
uniq -c /tmp/sorted_file.txt > final_counts.txt

# Memory-limited sorting
sort -S 100M huge_file.txt | uniq -c > counts.txt

# Process streaming data efficiently
tail -f large_log_file | while read line; do
    echo "$line" >> temp_buffer.txt
    if (( $(wc -l < temp_buffer.txt) % 1000 == 0 )); then
        sort temp_buffer.txt | uniq -c >> running_counts.txt
        > temp_buffer.txt
    fi
done
```

#### Parallel Processing
```bash
# Parallel processing of multiple files
find . -name "*.log" | xargs -P 4 -I {} sh -c 'sort {} | uniq -c > {}.counts'

# Distributed processing with GNU Parallel
ls *.txt | parallel 'sort {} | uniq -c > {.}.uniq'

# Pipeline parallelization
mkfifo pipe1 pipe2
sort large_file.txt > pipe1 &
uniq -c < pipe1 > pipe2 &
sort -nr < pipe2 > final_output.txt
```

### Advanced Data Analysis

#### Statistical Analysis
```bash
# Calculate entropy of data distribution
sort data.txt | uniq -c | awk '{
    total += $1
    probabilities[NR] = $1
}
END {
    entropy = 0
    for (i = 1; i <= NR; i++) {
        p = probabilities[i] / total
        entropy -= p * log(p) / log(2)
    }
    print "Data entropy:", entropy
    print "Total items:", total
    print "Unique items:", NR
}'

# Quartile analysis
sort data.txt | uniq -c | sort -n | awk '{
    counts[++n] = $1
    total += $1
}
END {
    asort(counts)
    q1 = counts[int(n*0.25)]
    median = counts[int(n*0.5)]
    q3 = counts[int(n*0.75)]
    print "Q1:", q1, "Median:", median, "Q3:", q3
}'

# Outlier detection using IQR
sort data.txt | uniq -c | sort -n | awk '{
    frequencies[++n] = $1
}
END {
    asort(frequencies)
    q1 = frequencies[int(n*0.25)]
    q3 = frequencies[int(n*0.75)]
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr

    for (i = 1; i <= n; i++) {
        if (frequencies[i] < lower_bound || frequencies[i] > upper_bound)
            print "Outlier:", frequencies[i]
    }
}'
```

## Integration and Automation

### Shell Script Integration

#### Automated Log Analysis Script
```bash
#!/bin/bash
# Comprehensive log analysis script

LOG_FILE="/var/log/nginx/access.log"
REPORT_DIR="/tmp/reports"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$REPORT_DIR"

echo "Analyzing access log: $LOG_FILE"

# Generate comprehensive report
{
    echo "=== Log Analysis Report - $(date) ==="
    echo ""
    echo "Top 20 IP addresses:"
    awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -20
    echo ""
    echo "Top 20 requested URLs:"
    awk '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -20
    echo ""
    echo "HTTP status code distribution:"
    awk '{print $9}' "$LOG_FILE" | sort | uniq -c | sort -nr
    echo ""
    echo "Top 10 user agents:"
    awk -F'"' '{print $6}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -10
    echo ""
    echo "High-frequency requesters (>1000 requests):"
    awk '{print $1}' "$LOG_FILE" | sort | uniq -c | awk '$1 > 1000 {print $0}'
} > "$REPORT_DIR/log_analysis_$DATE.txt"

echo "Report saved to: $REPORT_DIR/log_analysis_$DATE.txt"
```

#### Data Deduplication Script
```bash
#!/bin/bash
# Advanced data deduplication with backup

INPUT_DIR="/data/input"
OUTPUT_DIR="/data/output"
BACKUP_DIR="/data/backup"

mkdir -p "$OUTPUT_DIR" "$BACKUP_DIR"

process_file() {
    local file="$1"
    local basename=$(basename "$file")

    echo "Processing: $file"

    # Create backup
    cp "$file" "$BACKUP_DIR/${basename}.backup.$(date +%s)"

    # Remove duplicates while preserving order and header
    if head -n1 "$file" | grep -q ","; then
        # CSV file - handle header
        (head -n1 "$file" && tail -n +2 "$file" | sort | uniq) > "$OUTPUT_DIR/${basename}.dedup"
    else
        # Regular file
        awk '!seen[$0]++' "$file" > "$OUTPUT_DIR/${basename}.dedup"
    fi

    # Generate statistics
    original_lines=$(wc -l < "$file")
    dedup_lines=$(wc -l < "$OUTPUT_DIR/${basename}.dedup")
    removed=$((original_lines - dedup_lines))

    echo "  Original: $original_lines lines"
    echo "  Deduped:  $dedup_lines lines"
    echo "  Removed:  $removed lines"
    echo ""
}

# Process all files in input directory
find "$INPUT_DIR" -type f -name "*.txt" -o -name "*.csv" | while read file; do
    process_file "$file"
done
```

#### Real-time Monitoring Script
```bash
#!/bin/bash
# Real-time duplicate detection script

LOG_FILE="/var/log/application.log"
ALERT_THRESHOLD=10
STATE_FILE="/tmp/monitor_state.txt"

# Initialize state file
if [ ! -f "$STATE_FILE" ]; then
    touch "$STATE_FILE"
fi

monitor_duplicates() {
    while IFS= read -r line; do
        # Extract pattern (first 50 characters)
        pattern=$(echo "$line" | cut -c1-50)

        # Count occurrences in recent window
        count=$(tail -n 100 "$LOG_FILE" | cut -c1-50 | sort | uniq -c | grep -F "$pattern" | awk '{print $1}')

        if [ "$count" -gt "$ALERT_THRESHOLD" ]; then
            echo "ALERT: Pattern detected $count times: $pattern"
            echo "$(date): $count occurrences of '$pattern'" >> "$STATE_FILE"
        fi
    done < <(tail -f "$LOG_FILE")
}

echo "Starting duplicate monitoring..."
monitor_duplicates
```

### Complex Pipeline Examples

#### Multi-stage Data Processing
```bash
# Complete data processing pipeline
{
    # Stage 1: Extract and normalize data
    awk -F',' '{print tolower($1), $3}' data.csv |

    # Stage 2: Remove duplicates and count
    sort | uniq -c |

    # Stage 3: Filter significant results
    awk '$1 > 5' |

    # Stage 4: Format output
    sort -nr | awk '{printf "%3d: %s\n", $1, $2}' |

    # Stage 5: Add summary
    tee >(awk '{total+=$1} END {print "\nTotal significant items:", total}')
} > analysis_report.txt

# Real-time log processing with pattern detection
tail -f /var/log/syslog |
while read line; do
    echo "$line" |
    awk '{print $1,$2,$3}' |
    sort |
    uniq -c |
    awk '$1 > 3 {print "High frequency:", $0}'
done

# Multi-file analysis with consolidation
find /var/log -name "*.log" -mtime -7 |
while read logfile; do
    echo "=== $(basename $logfile) ==="
    awk '{print $5}' "$logfile" |
    sort |
    uniq -c |
    sort -nr |
    head -5
done | awk '
/===/ {file=$0; next}
{print file ": " $0}'
```

#### Advanced Text Processing
```bash
# Text mining and word frequency analysis
process_document() {
    local file="$1"

    # Extract words, normalize, and analyze
    tr -cs '[:alpha:]' '\n' < "$file" |
    tr '[:upper:]' '[:lower:]' |
    grep -v '^$' |
    sort |
    uniq -c |
    sort -nr |
    head -50 |
    awk '{printf "%-6d %s\n", $1, $2}'
}

# Pattern extraction from logs
extract_patterns() {
    local log_file="$1"

    # Extract error patterns
    grep -i "error\|warning\|critical" "$log_file" |
    sed 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}//' |
    sed 's/\[[0-9]\+\]//' |
    awk '{$1=$1; print}' |
    sort |
    uniq -c |
    sort -nr |
    head -20
}

# File change monitoring with deduplication
monitor_changes() {
    local directory="$1"

    while true; do
        find "$directory" -type f -newer /tmp/last_check |
        while read file; do
            echo "Changed: $file"
            # Create checksum-based tracking
            md5sum "$file" >> /tmp/checksums.txt
        done

        # Remove duplicate checksum entries
        sort /tmp/checksums.txt | uniq -d > /tmp/duplicates.txt

        if [ -s /tmp/duplicates.txt ]; then
            echo "Duplicate files detected:"
            cat /tmp/duplicates.txt
        fi

        touch /tmp/last_check
        sleep 60
    done
}
```

## Performance Optimization and Best Practices

### Memory Management

#### Large File Processing Strategies
```bash
# Process extremely large files in manageable chunks
process_large_file() {
    local file="$1"
    local chunk_size=100000

    # Split file into chunks
    split -l "$chunk_size" "$file" chunk_

    # Process each chunk
    for chunk in chunk_*; do
        echo "Processing chunk: $chunk"

        # Process chunk and save partial results
        sort "$chunk" | uniq -c >> partial_counts.txt

        # Clean up processed chunk
        rm "$chunk"
    done

    # Consolidate results
    sort partial_counts.txt | uniq -c > final_counts.txt
    rm partial_counts.txt
}

# Memory-constrained sorting
memory_efficient_sort() {
    local file="$1"
    local max_memory="500M"

    # Use external sorting with memory limit
    sort -S "$max_memory" -T /tmp "$file" | uniq -c
}

# Streaming processing for infinite data streams
stream_process() {
    mkfifo input_pipe output_pipe

    # Create background processes
    sort -S 100M < input_pipe > output_pipe &
    uniq -c < output_pipe &

    # Feed data into pipeline
    while IFS= read -r line; do
        echo "$line" > input_pipe
    done < /dev/stdin

    # Clean up pipes
    rm input_pipe output_pipe
}
```

### Performance Tuning

#### Optimization Techniques
```bash
# Benchmark different approaches
benchmark_uniq() {
    local file="$1"

    echo "Benchmarking deduplication methods for $(wc -l < $file) lines..."

    # Method 1: sort + uniq
    time sort "$file" | uniq > /tmp/method1.txt

    # Method 2: sort -u
    time sort -u "$file" > /tmp/method2.txt

    # Method 3: awk order-preserving
    time awk '!seen[$0]++' "$file" > /tmp/method3.txt

    # Method 4: perl (if available)
    if command -v perl >/dev/null 2>&1; then
        time perl -ne 'print unless $seen{$_}++' "$file" > /tmp/method4.txt
    fi

    echo "Results comparison:"
    wc -l /tmp/method*.txt
}

# Parallel processing optimization
parallel_uniq() {
    local input_dir="$1"
    local output_dir="$2"

    mkdir -p "$output_dir"

    # Process files in parallel using all CPU cores
    find "$input_dir" -name "*.txt" |
    xargs -P $(nproc) -I {} bash -c '
        input="{}"
        output="'$output_dir'/$(basename {}).uniq"
        sort "$input" | uniq -c > "$output"
        echo "Processed: $input -> $output"
    '
}

# I/O optimization with tmpfs
optimize_io() {
    local input_file="$1"

    # Use memory-based filesystem for temporary files
    if [ -d /dev/shm ]; then
        temp_dir="/dev/shm/uniq_temp_$$"
        mkdir -p "$temp_dir"

        # Copy to memory for faster processing
        cp "$input_file" "$temp_dir/data.txt"

        # Process in memory
        sort "$temp_dir/data.txt" | uniq -c > "$input_file.processed"

        # Clean up
        rm -rf "$temp_dir"
    else
        sort "$input_file" | uniq -c > "$input_file.processed"
    fi
}
```

### Monitoring and Debugging

#### Performance Monitoring
```bash
# Monitor memory usage during processing
monitor_uniq_performance() {
    local file="$1"

    # Start monitoring in background
    /usr/bin/time -v bash -c "
        sort '$file' | uniq -c > /tmp/output.txt
    " 2>&1 | grep -E "(Maximum resident|User time|System time)"
}

# Check for processing bottlenecks
diagnose_pipeline() {
    local file="$1"

    echo "Diagnosing pipeline performance..."

    # Test individual components
    echo "Sorting time:"
    time sort "$file" > /tmp/sort_test.txt

    echo "Uniq time:"
    time uniq -c /tmp/sort_test.txt > /tmp/uniq_test.txt

    echo "Combined pipeline time:"
    time sort "$file" | uniq -c > /tmp/pipeline_test.txt

    # Clean up
    rm /tmp/*_test.txt
}

# Resource usage monitoring
track_resources() {
    local pid="$1"
    local interval=5

    while kill -0 "$pid" 2>/dev/null; do
        ps -p "$pid" -o pid,ppid,pcpu,pmem,rss,vsz,cmd
        sleep "$interval"
    done
}
```

## Related Commands

- [`sort`](/docs/commands/text-processing/sort) - Sort lines of text files (essential prerequisite)
- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines (field extraction)
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing (advanced filtering)
- [`wc`](/docs/commands/text-processing/wc) - Count lines, words, and characters
- [`grep`](/docs/commands/text-processing/grep) - Search for patterns in files
- [`comm`](/docs/commands/text-processing/comm) - Compare sorted files line by line
- [`join`](/docs/commands/text-processing/join) - Join lines of two files on a common field
- [`tr`](/docs/commands/text-processing/tr) - Translate or delete characters
- [`sed`](/docs/commands/text-processing/sed) - Stream editor for text transformation

## Best Practices

### Data Processing Guidelines

1. **Always sort first** when processing unsorted data to find all duplicates
2. **Use `-c` for counting** to understand data distribution and patterns
3. **Combine with `sort` pipelines** for powerful data analysis capabilities
4. **Consider field skipping** (`-f`) for structured data with headers or timestamps
5. **Use case-insensitive option** (`-i`) when appropriate for text data
6. **Process large files in chunks** to manage memory usage effectively
7. **Preserve original order** when needed using AWK alternatives
8. **Use appropriate locale settings** for consistent behavior across systems

### Performance Recommendations

1. **Use `sort -u`** for simple deduplication when counting isn't needed
2. **Leverage parallel processing** for multiple file operations
3. **Optimize I/O operations** using temporary directories and memory filesystems
4. **Monitor resource usage** during large-scale processing operations
5. **Choose appropriate chunk sizes** based on available memory and file size
6. **Use external sorting** (`sort -T`) for files larger than available RAM

### Data Quality Assurance

1. **Validate input format** before processing to ensure consistent results
2. **Normalize whitespace** using sed or tr before deduplication
3. **Handle special characters** properly with appropriate locale settings
4. **Test with sample data** before processing large datasets
5. **Create backups** of original data before applying destructive operations

## Troubleshooting

### Common Issues and Solutions

#### Data Not Being Deduplicated
```bash
# Problem: uniq not finding duplicates in unsorted data
# Symptom: No duplicates reported despite obvious matches

# Solution: Always sort data first
sort unsorted.txt | uniq -d

# Alternative: Use order-preserving AWK method
awk '!seen[$0]++' unsorted.txt

# Debug: Check line endings and whitespace
od -c unsorted.txt | head -5
```

#### Memory and Performance Issues
```bash
# Problem: Out of memory errors with large files
# Symptoms: Process killed, system becomes unresponsive

# Solution: Use memory-limited sorting
sort -S 500M large_file.txt | uniq -c > output.txt

# Solution: Use external temporary directory
sort -T /tmp large_file.txt | uniq -c > output.txt

# Solution: Process in chunks
split -l 1000000 huge_file.txt chunk_
for chunk in chunk_*; do
    sort "$chunk" | uniq -c >> partial_results.txt
    rm "$chunk"
done
```

#### Whitespace and Formatting Issues
```bash
# Problem: Inconsistent deduplication due to whitespace
# Symptoms: Similar lines not recognized as duplicates

# Solution: Normalize whitespace before processing
sed 's/^[[:space:]]*//;s/[[:space:]]*$//' data.txt | sort | uniq

# Solution: Remove all internal whitespace
tr -d '[:space:]' < data.txt | sort | uniq

# Solution: Standardize line endings
dos2unix data.txt
```

#### Character Encoding and Locale Problems
```bash
# Problem: Inconsistent behavior with special characters
# Symptoms: Different results on different systems

# Solution: Use C locale for consistent sorting
LC_ALL=C sort data.txt | uniq -c

# Solution: Handle UTF-8 properly
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
sort data.txt | uniq -c

# Solution: Check file encoding
file -i data.txt
iconv -f original_encoding -t utf-8 data.txt > utf8_data.txt
```

#### Field-based Comparison Issues
```bash
# Problem: Field skipping not working as expected
# Symptoms: Wrong duplicates being identified or missed

# Solution: Test field boundaries first
awk -F',' '{print "Field1:", $1, "Field2:", $2}' data.csv | head -5

# Solution: Use custom delimiter if needed
sort -t':' -k2,2 /etc/passwd | uniq -f1

# Solution: Combine character and field skipping carefully
uniq -f1 -s5 data.txt
```

### Debugging Techniques

#### Step-by-Step Pipeline Debugging
```bash
# Debug complex pipelines by examining each stage
cat data.txt |
  tee stage1_input.txt |
  sort |
  tee stage1_sorted.txt |
  uniq -c |
  tee stage2_counts.txt |
  sort -nr > final_output.txt

# Check intermediate results
echo "=== Input sample ==="
head -5 stage1_input.txt
echo "=== After sort ==="
head -5 stage1_sorted.txt
echo "=== After uniq -c ==="
head -5 stage2_counts.txt
```

#### Performance Profiling
```bash
# Profile each step of the pipeline
echo "Testing sort performance:"
time sort large_file.txt > /tmp/sorted.txt

echo "Testing uniq performance:"
time uniq -c /tmp/sorted.txt > /tmp/counted.txt

echo "Testing complete pipeline:"
time sort large_file.txt | uniq -c > /tmp/complete.txt

# Memory usage analysis
/usr/bin/time -v sort large_file.txt | uniq -c 2>&1 | grep -E "(Maximum|Peak)"
```

#### Validation and Verification
```bash
# Verify deduplication worked correctly
original_lines=$(wc -l < original.txt)
deduped_lines=$(wc -l < deduped.txt)
echo "Original: $original_lines lines"
echo "Deduped:  $deduped_lines lines"
echo "Removed:  $((original_lines - deduped_lines)) lines"

# Check for unexpected duplicates
sort deduped.txt | uniq -d

# Verify count consistency
total_count=$(sort data.txt | uniq -c | awk '{sum+=$1} END {print sum}')
line_count=$(wc -l < data.txt)
echo "Count total: $total_count"
echo "Line count:  $line_count"
if [ "$total_count" -eq "$line_count" ]; then
    echo "Counts match - processing successful"
else
    echo "Counts mismatch - investigate further"
fi
```

The `uniq` command is essential for data cleanup, analysis, and pattern detection. When combined with `sort` and other Unix tools, it becomes a powerful component of text processing pipelines for system administration, log analysis, and data quality assurance. Its versatility makes it suitable for simple duplicate removal tasks as well as complex data analysis operations.