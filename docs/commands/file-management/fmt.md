---
title: fmt - Text Formatting and Paragraph Optimization
sidebar_label: fmt
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# fmt - Text Formatting and Paragraph Optimization

The `fmt` command is a powerful text formatting utility that reformats text files to create well-structured, readable paragraphs. It automatically adjusts line breaks and spacing to optimize text presentation according to specified width constraints. fmt is particularly useful for formatting plain text documents, emails, configuration files, and any text content that requires consistent paragraph structure. The command intelligently handles word wrapping, paragraph detection, and various formatting options to produce clean, professional-looking text output.

## Basic Syntax

```bash
fmt [OPTION]... [FILE]...
fmt -w WIDTH [OPTION]... [FILE]...
fmt -p PREFIX [OPTION]... [FILE]...
fmt -s [OPTION]... [FILE]...
fmt -u [OPTION]... [FILE]...
fmt -t [OPTION]... [FILE]...
fmt -c [OPTION]... [FILE]...
fmt -m [OPTION]... [FILE]...
```

## Common Options

### Formatting Control
- `-w WIDTH`, `--width=WIDTH` - Set maximum line width (default: 75)
- `-p PREFIX`, `--prefix=PREFIX` - Preserve lines starting with PREFIX
- `-s`, `--split-only` - Split long lines but don't join short lines
- `-u`, `--uniform-spacing` - Use uniform spacing (1 space between words, 2 between sentences)
- `-t`, `--tagged-paragraph` - Preserve indentation of first line in paragraphs

### Output Control
- `-c`, `--crown-margin` - Preserve indentation of first two lines
- `-m`, `--mail` - Format mail, preserving headers and indentation
- `-o MARGIN`, `--goal=MARGIN` - Set goal width (default: 93% of width)
- `-g`, `--goal=WIDTH` - Set goal width (alias for -o)

### Miscellaneous
- `-h`, `--help` - Display help information
- `-V`, `--version` - Show version information

## Usage Examples

### Basic Text Formatting

#### Simple Text Reformatting
```bash
# Format text with default width (75 characters)
fmt document.txt

# Format text with custom width
fmt -w 80 document.txt

# Format multiple files
fmt chapter1.txt chapter2.txt chapter3.txt

# Format from standard input
cat rough_draft.txt | fmt > formatted.txt

# Format text in-place (using temporary file)
fmt document.txt > temp.txt && mv temp.txt document.txt
```

#### Width Control
```bash
# Format for standard terminal (80 characters)
fmt -w 80 document.txt

# Format for narrow displays (40 characters)
fmt -w 40 document.txt

# Format for wide displays (120 characters)
fmt -w 120 document.txt

# Format with goal width for better appearance
fmt -w 80 -g 76 document.txt

# Format using percentage-based goal
fmt -w 80 -g 74 document.txt
```

### Advanced Formatting Options

#### Paragraph Preservation
```bash
# Preserve lines starting with bullet points
fmt -p "• " document.txt

# Preserve numbered list items
fmt -p "1. " numbered_list.txt

# Preserve quoted text
fmt -p "> " email_quotes.txt

# Preserve code block indentation
fmt -p "    " code_documentation.txt

# Multiple prefixes (using multiple passes)
fmt -p "• " document.txt | fmt -p "1. " | fmt -p "> "
```

#### Special Formatting Modes
```bash
# Crown margin mode (preserve first two lines' indentation)
fmt -c document.txt

# Tagged paragraph mode (preserve first line indentation)
fmt -t indented_text.txt

# Uniform spacing mode (standardize word and sentence spacing)
fmt -u messy_text.txt

# Mail formatting mode
fmt -m email_message.txt

# Split-only mode (don't join short lines)
fmt -s mixed_line_lengths.txt
```

### Complex Text Processing

#### Multiple Formatting Operations
```bash
# Chain formatting operations
fmt -u -w 80 document.txt | fmt -c > final_output.txt

# Format with multiple passes for complex documents
fmt -p "``` " code_doc.txt | fmt -w 80 | fmt -c > formatted_code.txt

# Format and add line numbers
fmt -w 75 document.txt | nl > numbered_output.txt

# Format and sort paragraphs
fmt -w 80 document.txt | sort > sorted_paragraphs.txt
```

#### File Processing Workflows
```bash
# Format all text files in a directory
for file in *.txt; do
    fmt -w 80 "$file" > "formatted_$file"
done

# Format and backup original files
for file in *.md; do
    cp "$file" "$file.backup"
    fmt -w 80 "$file.backup" > "$file"
done

# Format with different widths for different purposes
fmt -w 40 document.txt > mobile_view.txt
fmt -w 80 document.txt > desktop_view.txt
fmt -w 120 document.txt > print_view.txt
```

## Practical Examples

### Document Preparation

#### Academic Papers
```bash
# Format abstract with specific width
fmt -w 70 abstract.txt > formatted_abstract.txt

# Format main body with standard academic width
fmt -w 85 main_body.txt > formatted_body.txt

# Format bibliography with hanging indent preservation
fmt -p "    " bibliography.txt > formatted_bib.txt

# Format footnotes and endnotes
fmt -w 60 footnotes.txt > formatted_footnotes.txt

# Combine formatted sections
cat formatted_title.txt formatted_abstract.txt formatted_body.txt > paper_formatted.txt
```

#### Email and Message Formatting
```bash
# Format email body with quote preservation
fmt -p "> " email_draft.txt > email_formatted.txt

# Format email for plain text sending
fmt -w 72 email_content.txt > email_ready.txt

# Format mailing list message
fmt -m -w 75 message.txt > mailing_list_ready.txt

# Format and prepare signature
fmt -w 60 signature.txt | fmt -c > email_signature.txt
```

#### Configuration File Formatting
```bash
# Format configuration comments
fmt -p "# " config_file.txt > formatted_comments.txt

# Format documentation strings
fmt -w 60 -p "# " documentation.txt > clean_docs.txt

# Format README files
fmt -w 80 README.md > formatted_README.md

# Format man page source files
fmt -w 65 -p ". " man_page.txt > formatted_man.txt
```

### Content Management

#### Blog and Web Content
```bash
# Format blog posts for web display
fmt -w 80 blog_post.txt > web_ready_post.txt

# Format articles with heading preservation
fmt -p "# " article.txt > formatted_article.txt

# Format content for mobile viewing
fmt -w 50 content.txt > mobile_content.txt

# Format code comments
fmt -p "// " source_code_comments.txt > clean_comments.txt
```

#### Technical Documentation
```bash
# Format API documentation
fmt -w 80 -p "## " api_docs.txt > formatted_api.txt

# Format README with section preservation
grep -v "^#" README.txt | fmt -w 80 | cat - README.txt > combined_readme.txt

# Format changelog entries
fmt -p "* " changelog.txt > formatted_changelog.txt

# Format release notes
fmt -w 75 release_notes.txt > clean_release_notes.txt
```

## Advanced Usage

### Text Processing Pipelines

#### Complex Formatting Workflows
```bash
# Extract and format specific sections
grep "^[A-Z]" document.txt | fmt -w 80 > formatted_headings.txt

# Format and clean up OCR text
ocr_text.txt | fmt -u -w 80 | sed 's/\s\+/ /g' > clean_ocr.txt

# Format text from PDF extraction
pdftotext document.pdf - | fmt -w 80 > formatted_pdf.txt

# Format and remove excess blank lines
fmt document.txt | sed '/^$/d' > compact_text.txt
```

#### Batch Processing Scripts
```bash
#!/bin/bash
# Format all markdown files in a project

for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo "Formatting $file..."
        # Create backup
        cp "$file" "$file.backup"
        # Format with code block preservation
        grep -v "```" "$file" | fmt -w 80 > temp_fmt.txt
        # Preserve code blocks
        awk '
            /^```/ {
                if (in_code) { in_code=0; print }
                else { in_code=1; print }
                next
            }
            in_code { print; next }
            !in_code { print > "temp_fmt.txt" }
        ' "$file"
        cat temp_fmt.txt > "$file"
        rm temp_fmt.txt
        echo "Formatted $file"
    fi
done
```

### Text Analysis and Processing

#### Text Statistics and Analysis
```bash
# Count words after formatting
fmt document.txt | wc -w

# Count lines after formatting
fmt -w 80 document.txt | wc -l

# Find average line length
fmt -w 80 document.txt | awk '{sum += length($0)} END {print sum/NR}'

# Extract and format only certain paragraphs
awk '/^Chapter [0-9]/ {found=1} /^Chapter [0-9]/ && found>1 {exit} found' book.txt | fmt -w 80
```

#### Specialized Text Processing
```bash
# Format poetry (preserve line breaks)
awk '{if (NF==0) print; else printf "%s ", $0}' poetry.txt | fmt -w 50

# Format dialogues with speaker preservation
awk '/^[A-Z]+:/{speaker=1} speaker{print; if($0=="") speaker=0}' dialogue.txt

# Format with custom paragraph detection
awk 'NF==0{if(paragraph) print paragraph; paragraph=""; next}
     {paragraph=paragraph $0 " "}
     END{if(paragraph) print paragraph}' document.txt | fmt -w 80
```

## Integration and Automation

### Shell Script Integration

#### Automated Document Processing
```bash
#!/bin/bash
# Document formatting pipeline

SOURCE_DIR="raw_documents"
OUTPUT_DIR="formatted_documents"
WIDTH=80

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Process all text files
find "$SOURCE_DIR" -name "*.txt" -type f | while read file; do
    filename=$(basename "$file")
    echo "Processing $filename..."

    # Format with multiple options
    fmt -u -w "$WIDTH" "$file" | fmt -c > "$OUTPUT_DIR/$filename"

    # Create statistics
    original_lines=$(wc -l < "$file")
    formatted_lines=$(wc -l < "$OUTPUT_DIR/$filename")
    echo "  Original: $original_lines lines, Formatted: $formatted_lines lines"
done

echo "Document formatting complete!"
```

#### Email Automation
```bash
#!/bin/bash
# Automatic email formatter

EMAIL_TEMPLATE="email_template.txt"
RECIPIENT_FILE="recipients.txt"
WIDTH=72

# Format email body
if [ -f "$EMAIL_TEMPLATE" ]; then
    formatted_email=$(fmt -w "$WIDTH" -p "> " "$EMAIL_TEMPLATE")

    # Add to each recipient's file
    while IFS= read -r recipient; do
        echo "To: $recipient" > "emails/email_to_$recipient.txt"
        echo "Subject: Automated Notification" >> "emails/email_to_$recipient.txt"
        echo "" >> "emails/email_to_$recipient.txt"
        echo "$formatted_email" >> "emails/email_to_$recipient.txt"
        echo "Created email for $recipient"
    done < "$RECIPIENT_FILE"
fi
```

#### Log File Processing
```bash
#!/bin/bash
# Log file formatting and analysis

LOG_DIR="/var/log"
OUTPUT_DIR="formatted_logs"
DATE=$(date +%Y%m%d)

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Process system logs
for log_file in "$LOG_DIR"/*.log; do
    if [ -f "$log_file" ]; then
        basename=$(basename "$log_file")

        # Extract and format recent entries
        tail -100 "$log_file" | fmt -w 100 -p "$(date '+%b %d')" > "$OUTPUT_DIR/${basename}_$DATE.txt"

        # Create summary
        echo "Summary for $basename:" > "$OUTPUT_DIR/${basename}_summary_$DATE.txt"
        grep -i "error\|warning\|critical" "$log_file" | tail -20 | fmt -w 80 >> "$OUTPUT_DIR/${basename}_summary_$DATE.txt"
    fi
done

echo "Log processing complete for $DATE"
```

## Troubleshooting

### Common Issues

#### Line Breaking Problems
```bash
# Lines not breaking properly
# Solution: Check for non-standard characters or encoding
iconv -f utf-8 -t ascii//TRANSLIT document.txt | fmt -w 80 > clean_formatted.txt

# Words getting split incorrectly
# Solution: Use uniform spacing option
fmt -u -w 80 document.txt > correctly_formatted.txt

# Indentation being lost
# Solution: Use crown margin or tagged paragraph mode
fmt -c -w 80 indented_text.txt > preserved_indentation.txt
```

#### File Encoding Issues
```bash
# Check file encoding
file -bi document.txt

# Convert encoding if needed
iconv -f latin1 -t utf-8 document.txt > utf8_document.txt

# Handle Windows line endings
dos2unix document.txt
fmt -w 80 document.txt > unix_formatted.txt
```

#### Performance Issues
```bash
# Processing large files slowly
# Solution: Process in chunks
split -l 10000 large_file.txt chunk_
for chunk in chunk_*; do
    fmt -w 80 "$chunk" > "formatted_$chunk" &
done
wait
cat formatted_chunk_* > large_formatted.txt
rm chunk_* formatted_chunk_*

# Memory issues with huge files
# Solution: Use streaming approach
fmt -w 80 < large_file.txt > formatted_output.txt
```

#### Unexpected Formatting Results
```bash
# Verify formatting results
fmt -w 80 document.txt > temp_formatted.txt
diff document.txt temp_formatted.txt

# Test with small sample first
head -20 document.txt | fmt -w 80

# Check for special characters
cat -A document.txt | head -10
```

## Related Commands

- [`fold`](/docs/commands/file-management/fold) - Wrap lines to fit specified width
- [`pr`](/docs/commands/file-management/pr) - Convert text files for printing
- [`par`](/docs/commands/file-management/par) - Paragraph reformatter (alternative to fmt)
- [`expand`](/docs/commands/file-management/expand) - Convert tabs to spaces
- [`unexpand`](/docs/commands/file-management/unexpand) - Convert spaces to tabs
- [`tr`](/docs/commands/file-management/tr) - Translate or delete characters
- [`sed`](/docs/commands/file-management/sed) - Stream editor for text processing
- [`awk`](/docs/commands/file-management/awk) - Pattern scanning and processing language
- [`cut`](/docs/commands/file-management/cut) - Remove sections from each line of files
- [`paste`](/docs/commands/file-management/paste) - Merge lines of files
- [`join`](/docs/commands/file-management/join) - Join lines of two files on a common field

## Best Practices

1. **Choose appropriate width** based on target output medium (terminal: 80, print: 65-75, mobile: 40-50)
2. **Preserve important formatting** using prefix options for code blocks, quotes, and lists
3. **Test formatting on samples** before processing entire documents
4. **Create backups** of original files before automated processing
5. **Use uniform spacing** (-u) for consistent text appearance
6. **Handle special cases** separately (poetry, code, tables)
7. **Verify character encoding** before processing
8. **Consider cultural differences** in text layout requirements
9. **Use appropriate formatting mode** for different document types (mail, code, documentation)
10. **Pipeline formatting** with other text processing tools for complex transformations

## Performance Tips

1. **Width selection**: Smaller widths process faster but may increase line count
2. **Memory usage**: fmt processes files in memory, consider streaming for very large files
3. **Batch processing**: Process multiple files in parallel when possible
4. **Text preprocessing**: Remove unnecessary whitespace before formatting
5. **Use appropriate mode**: Choose specific modes (-c, -t, -u) for better results
6. **Character encoding**: Ensure UTF-8 encoding for best compatibility
7. **Regular expressions**: Combine with grep/sed for selective formatting
8. **File I/O**: Use temporary files for complex multi-step processing

The `fmt` command is an essential text formatting utility that provides sophisticated paragraph reformatting capabilities. Its intelligent handling of word boundaries, paragraph detection, and various formatting modes make it invaluable for document preparation, content management, and text processing workflows. Whether you're formatting emails, preparing documentation, or processing large text datasets, fmt offers the flexibility and control needed to produce professional, readable text output.