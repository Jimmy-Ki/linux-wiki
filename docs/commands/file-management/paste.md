---
title: paste - Merge Lines of Files
sidebar_label: paste
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# paste - Merge Lines of Files

The `paste` command merges lines from multiple files horizontally, creating a tabular output. It's the opposite of `cut`, which extracts columns, and is commonly used for combining data from different sources into a single structured format.

## Basic Syntax

```bash
paste [OPTION]... [FILE]...
```

## Common Options

### Delimiter Options

- `-d, --delimiters=LIST` - Reuse characters from LIST instead of TABs
- `--help` - Display help message and exit
- `--version` - Output version information and exit

### Processing Options

- `-s, --serial` - Paste one file at a time instead of in parallel

## Usage Examples

### Basic Merging

```bash
# Merge two files side by side (default delimiter: tab)
paste file1.txt file2.txt

# Merge multiple files
paste file1.txt file2.txt file3.txt

# Merge files with specific delimiter
paste -d',' file1.txt file2.txt

# Use multiple delimiters
paste -d' , ' file1.txt file2.txt file3.txt
```

### Serial Processing

```bash
# Combine all lines from one file into single line
paste -s file.txt

# Combine files serially with delimiter
paste -s -d',' file1.txt file2.txt

# Create comma-separated list
paste -s -d',' items.txt > list.csv
```

### Standard Input Processing

```bash
# Merge file with stdin
paste file1.txt -

# Merge two commands' outputs
ls -1 | paste - <(ls -1 | sort)

# Merge command output with file
date | paste file.txt -
```

## Practical Examples

### Data Processing

```bash
# Combine names and ages
paste names.txt ages.txt > contact_info.txt

# Create CSV from separate files
paste -d',' names.txt emails.txt phones.txt > contacts.csv

# Merge headers with data
paste -d',' headers.txt data.txt > complete.csv

# Combine configuration sections
paste -d'\n' section1.txt section2.txt section3.txt > full_config.txt
```

### Report Generation

```bash
# Create tabular report
paste -d'\t' timestamps.txt events.txt users.txt > report.tsv

# Merge log analysis results
paste -d'|' dates.txt counts.txt summaries.txt > daily_report.txt

# Combine server statistics
paste -d',' server_names.txt cpu_usage.txt memory_usage.txt > server_stats.csv
```

### File Manipulation

```bash
# Create side-by-side file comparison
paste file1.txt file2.txt | pr -t

# Add line numbers to file
cat -n file.txt | cut -f1 > line_numbers.txt
paste line_numbers.txt file.txt > numbered_file.txt

# Combine related files
paste -d':' usernames.txt uids.txt > user_info.txt
```

### System Administration

```bash
# Create process report
ps aux | awk '{print $1}' > users.txt
ps aux | awk '{print $11}' > commands.txt
paste -d'\t' users.txt commands.txt > process_report.txt

# Merge network statistics
paste -d',' interfaces.txt rx_bytes.txt tx_bytes.txt > network_stats.csv

# Combine disk usage information
paste -d'\t' filesystems.txt usage.txt available.txt > disk_report.txt
```

## Advanced Usage

### Complex Delimiters

```bash
# Use different delimiters for each column
paste -d',\t|' file1.txt file2.txt file3.txt

# Create JSON-like format
paste -d'":",' keys.txt values.txt > json_data.txt

# Custom table formatting
paste -d' | ' column1.txt column2.txt column3.txt | column -t
```

### Data Transformation

```bash
# Transpose data (convert rows to columns)
paste -s -d'\n' < file.txt

# Create key-value pairs
paste -d'=' keys.txt values.txt

# Build configuration lines
paste -d' ' directives.txt values.txt > config_lines.txt
```

### Pipeline Integration

```bash
# Combine with other commands
ls -1 | sort | paste - <(du -sh *) > file_sizes.txt

# Process log data
cut -d' ' -f1 access_log.txt | sort | uniq -c | paste - <(cut -d' ' -f1 access_log.txt | sort | uniq)

# Create summary report
awk '{print $1}' data.txt | uniq > unique_items.txt
awk '{sum[$1]++} END {for (item in sum) print item, sum[item]}' data.txt | sort > counts.txt
paste unique_items.txt counts.txt > summary.txt
```

## Real-World Applications

### Database Operations

```bash
# Create SQL INSERT statements
paste -d"'," "INSERT INTO table VALUES (" values.txt ");" > insert.sql

# Combine CSV columns from different sources
cut -d',' -f1 file1.csv > col1.txt
cut -d',' -f2 file2.csv > col2.txt
paste -d',' col1.txt col2.txt > combined.csv

# Merge query results
paste -d'\t' query1_results.txt query2_results.txt > combined_query.txt
```

### Configuration Management

```bash
# Merge configuration files
paste -d'\n' config_header.txt main_config.txt config_footer.txt > full_config.txt

# Create environment file
paste -d'=' env_names.txt env_values.txt > .env

# Combine hosts file sections
paste -d' ' ip_addresses.txt hostnames.txt aliases.txt > hosts_entries.txt
```

### Data Analysis

```bash
# Create correlation table
paste -d'\t' variable1.txt variable2.txt > correlation_data.txt

# Combine time series data
paste -d',' timestamps.txt metric1.txt metric2.txt > time_series.csv

# Merge classification results
paste -d',' samples.txt predicted.txt actual.txt > classification_results.csv
```

## Special Cases

### Handling Different Line Counts

```bash
# Files with different numbers of lines
paste file1.txt file2.txt  # Stops when shortest file ends

# Pad shorter files
yes "" | head -n $(wc -l < longer_file.txt) | paste - shorter_file.txt longer_file.txt

# Handle missing data gracefully
awk 'NR==FNR{a[NR]=$0;next} {print a[FNR], $0}' file1.txt file2.txt
```

### Standard Input Techniques

```bash
# Multiple stdin streams
echo -e "a\nb\nc" | paste - <(echo -e "1\n2\n3")
# Output: a	1
#         b	2
#         c	3

# Create file from multiple inputs
printf "name\nemail\nphone\n" | paste -d',' - <(echo -e "John\njohn@example.com\n555-1234")
```

## Performance Considerations

```bash
# For large files, consider memory usage
paste huge_file1.txt huge_file2.txt > output.txt

# Process in chunks if necessary
split -l 1000000 large_file.txt chunk_
for chunk in chunk_*; do
    paste "$chunk" other_file.txt >> output.txt
done
```

## Creative Uses

### Text Processing

```bash
# Create acrostic poem
paste -d'\n' <(cut -c1 words.txt) <(cut -c2 words.txt) <(cut -c3 words.txt)

# Create word ladder
echo -e "cat\nbat\nbet\nget\ngot" | paste -sd'\n' > word_ladder.txt

# Build multi-column layout
paste -d'\n' column1.txt column2.txt column3.txt | pr -3
```

### Data Visualization

```bash
# Create simple bar chart
paste -d' ' items.txt bars.txt
# Where bars.txt contains: "=========" etc.

# Create ASCII table
paste -d'|' col1.txt col2.txt col3.txt | sed 's/^/|/;s/$/|/'
```

### Automation Scripts

```bash
# Generate batch commands
paste -d' ' commands.txt arguments.txt > batch_commands.txt

# Create file operations list
paste -d' ' <(printf "cp\nmv\nrm") files.txt destinations.txt > operations.txt

# Build test data
paste -d',' ids.txt names.txt emails.txt > test_data.csv
```

## Related Commands

- [`cut`](/docs/commands/text-processing/cut) - Remove sections from lines (inverse operation)
- [`join`](/docs/commands/text-processing/join) - Join lines of two files on common fields
- [`pr`](/docs/commands/text-processing/pr) - Convert text files for printing
- [`column`](/docs/commands/text-processing/column) - Columnate data
- [`awk`](/docs/commands/text-processing/awk) - Pattern scanning and processing
- [`printf`](/docs/commands/text-processing/printf) - Format and print data

## Best Practices

1. **Check line counts** before merging to ensure expected results
2. **Use appropriate delimiters** for your output format (CSV, TSV, etc.)
3. **Consider alternative tools** for complex data manipulation (awk, join)
4. **Test with sample data** before processing large files
5. **Use `-s` for creating single-line outputs** like CSV rows
6. **Combine with other tools** for powerful data processing pipelines

## Common Patterns

### CSV Generation

```bash
# Generate CSV header and data
echo -e "Name,Age,City" > header.csv
paste -d',' names.txt ages.txt cities.txt >> data.csv
cat header.csv data.csv > complete.csv
```

### Configuration Building

```bash
# Create key-value configuration
paste -d'=' keys.txt values.txt | sed 's/^/export /' > env_vars.sh
```

### Data Validation

```bash
# Compare expected vs actual results
paste expected.txt actual.txt | awk '$1 != $2 {print "Mismatch:", $0}'
```

The `paste` command is simple but powerful for combining data horizontally. While it has limitations compared to more advanced tools like `awk` or database joins, it's perfect for quick data merging tasks and is an essential component of many text processing pipelines.