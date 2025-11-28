---
title: colcrt - Filter nroff Output for CRT Terminals
sidebar_label: colcrt
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# colcrt - Filter nroff Output for CRT Terminals

The `colcrt` command is a specialized text processing utility designed to filter output from nroff (document formatting system) for display on CRT terminals. It processes reverse line feeds and underlining, making formatted documents more readable on terminal displays. The command is particularly useful when working with man pages, technical documentation, or any text formatted with nroff/troff that needs to be properly displayed on terminals that don't support reverse line feed operations.

## Basic Syntax

```bash
colcrt [OPTIONS] [FILE...]
```

## Common Options

### Display Options
- `-` - Suppress underlining (replaces underlined text with plain text)
- `--` or `-2` - Half-line spacing (allows all lines to be visible on terminals that can't display half-lines)

### Output Control
- `-b` - Do not output backspaces
- `-f` - Forward half-line feeds (for terminals that support them)
- `-h` - Half-line feeds (default behavior)
- `-p` - Pass through control characters unchanged

## Usage Examples

### Basic Text Processing

#### Simple nroff Output Filtering
```bash
# Filter nroff output for terminal display
nroff -man document.1 | colcrt

# Process formatted man page
man -t ls | colcrt

# Filter pre-formatted text file
colcrt formatted_text.txt
```

#### Removing Underlining
```bash
# Remove underlining from nroff output
nroff document.ms | colcrt -

# Process man page without underlines
man -t grep | colcrt - > grep_plain.txt
```

### Terminal Compatibility

#### Half-Line Processing
```bash
# Use half-line spacing for better display
nroff -ms document.ms | colcrt --

# Force half-line mode for old terminals
colcrt -2 nroff_output.txt
```

#### Control Character Handling
```bash
# Pass through control characters unchanged
nroff document.txt | colcrt -p

# Suppress backspace characters
nroff manual.ms | colcrt -b
```

## Practical Examples

### Document Processing

#### Man Page Conversion
```bash
# Convert man page to plain text for editing
man -t cp | colcrt - > cp_manual.txt

# Extract specific section from man page
man -t find | colcrt | grep -A 10 "EXAMPLES"

# Create printable version without special formatting
man -t ls | colcrt -b | lpr
```

#### Technical Documentation
```bash
# Process troff output for terminal viewing
troff -me report.me | colcrt

# Filter multiple document files
for file in *.ms; do
    nroff -ms "$file" | colcrt - > "${file%.ms}_processed.txt"
done

# Create unified documentation view
cat chapter*.txt | nroff -ms | colcrt -- > full_document.txt
```

### System Administration

#### Log Processing
```bash
# Process formatted system logs
cat /var/log/messages | nroff | colcrt -b > clean_logs.txt

# Filter formatted configuration files
nroff /etc/passwd | colcrt -p > formatted_passwd.txt

# Create terminal-friendly system reports
ps aux | nroff | colcrt -- > process_report.txt
```

#### Backup and Migration
```bash
# Backup formatted documentation with proper conversion
find /usr/share/man -name "*.1" -exec man -t {} \; | colcrt - > man_backup.txt

# Migrate formatted documents between systems
cat *.nroff | colcrt -b | ssh target "cat > migrated_docs.txt"

# Create portable documentation format
nroff -ms guide.ms | colcrt - > portable_guide.txt
```

### Development Workflow

#### Code Documentation
```bash
# Process formatted source code comments
ctags -x | nroff | colcrt > function_index.txt

# Create terminal-friendly API documentation
doxygen -w man | colcrt - > api_docs.txt

# Filter debugging output with formatting
make debug 2>&1 | nroff | colcrt -b > debug_report.txt
```

#### Text Processing Pipeline
```bash
# Complex text processing with multiple filters
cat document.txt | nroff | colcrt - | sed 's/\x08//g' | pr

# Chain with other text processing tools
grep "ERROR" logfile | nroff | colcrt -- | sort | uniq

# Create formatted reports
sar -u | nroff | colcrt -f > cpu_report.txt
```

## Advanced Usage

### Special Terminal Handling

#### Different Terminal Types
```bash
# For terminals without reverse line feed support
nroff document.ms | colcrt -2

# For terminals with limited control character support
nroff manual.txt | colcrt -b -p

# For modern terminals with full support
nroff -ms document.ms | colcrt -f
```

#### Batch Processing
```bash
# Process multiple files with consistent formatting
for doc in report_*.ms; do
    nroff -ms "$doc" | colcrt -b > "processed_${doc%.ms}.txt"
done

# Create documentation archive
find . -name "*.nroff" -exec nroff {} \; | colcrt - > all_docs.txt

# Parallel processing of large document sets
ls *.ms | xargs -P 4 -I {} sh -c 'nroff -ms {} | colcrt - > {}.processed'
```

### Integration with Other Tools

#### Document Conversion Pipeline
```bash
# Convert various formats to terminal-friendly text
pandoc document.docx -t plain | nroff | colcrt - > terminal_doc.txt

# Create unified output from multiple sources
cat header.txt document.ms footer.txt | nroff -ms | colcrt -- > complete_doc.txt

# Process LaTeX output for terminal viewing
latex document.tex && dvips document.dvi | ps2ascii | nroff | colcrt
```

#### Remote Processing
```bash
# Process documents remotely and display locally
ssh remote "nroff -ms /path/to/doc.ms | colcrt -" | less

# Create formatted output for remote systems
cat local_doc.txt | nroff | colcrt -b | ssh target "cat > remote_doc.txt"

# Stream processing for real-time display
tail -f logfile | nroff | colcrt -- | tee formatted_log.txt
```

## Troubleshooting

### Common Issues

#### Display Problems
```bash
# Issues with special characters
# Solution: Use -b to suppress backspaces
nroff document.txt | colcrt -b

# Problems with underlining
# Solution: Use - to remove underlining
nroff manual.ms | colcrt -

# Terminal compatibility issues
# Solution: Try different half-line modes
nroff doc.txt | colcrt --  # or colcrt -2
```

#### Character Encoding
```bash
# Issues with non-ASCII characters
# Solution: Filter through iconv first
iconv -f latin1 -t utf8 document.txt | nroff | colcrt

# Problems with control characters
# Solution: Use -p to preserve or clean separately
nroff doc.txt | colcrt -p | tr -cd '\11\12\15\40-\176'
```

#### Performance Issues
```bash
# Slow processing of large files
# Solution: Process in chunks
split -l 1000 large_file.txt chunk_
for chunk in chunk_*; do
    nroff "$chunk" | colcrt - >> processed_output.txt
    rm "$chunk"
done

# Memory issues with very large files
# Solution: Stream processing directly
nroff huge_file.txt | colcrt -b | gzip > compressed_output.gz
```

## Related Commands

- [`col`](/docs/commands/file-management/col) - Filter reverse line feeds from input
- [`colrm`](/docs/commands/file-management/colrm) - Remove columns from input files
- [`expand`](/docs/commands/file-management/expand) - Convert tabs to spaces
- [`unexpand`](/docs/commands/file-management/unexpand) - Convert spaces to tabs
- [`pr`](/docs/commands/file-management/pr) - Convert files for printing
- [`nl`](/docs/commands/file-management/nl) - Number lines of files
- [`fold`](/docs/commands/file-management/fold) - Wrap input lines to fit specified width
- [`fmt`](/docs/commands/file-management/fmt) - Simple optimal text formatter

## Best Practices

1. **Choose appropriate options** based on your terminal capabilities
2. **Test on small samples** before processing large documents
3. **Use `-` option** when underlining causes display issues
4. **Consider `-b` option** for terminals that don't handle backspaces well
5. **Use `--` or `-2`** for older terminals with half-line display issues
6. **Combine with other tools** like `sed`, `awk`, or `grep` for complex processing
7. **Preserve original formatting** when you might need it later
8. **Check terminal compatibility** before choosing display options
9. **Use proper input encoding** to avoid character display problems
10. **Test output on target terminal** before finalizing document processing

## Performance Tips

1. **Stream processing** is more memory-efficient than loading entire files
2. **Batch processing** of multiple files is more efficient than individual processing
3. **Minimal options** reduce processing overhead when not needed
4. **Pipeline integration** can reduce temporary file usage
5. **Parallel processing** for independent files can speed up large jobs
6. **Pre-filtering** with other tools can reduce colcrt processing load
7. **Appropriate buffering** can improve I/O performance
8. **Terminal-specific options** can reduce unnecessary processing

The `colcrt` command remains a valuable tool for working with nroff-formatted documents on terminal displays, providing essential filtering capabilities for proper text rendering across different terminal types and ensuring readability of formatted documentation in terminal environments.