---
title: gs - Ghostscript PostScript and PDF Interpreter
sidebar_label: gs
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# gs - Ghostscript PostScript and PDF Interpreter

The `gs` command is Ghostscript, a high-performance interpreter for the PostScript language and the Portable Document Format (PDF). Ghostscript is a versatile tool that can render PostScript and PDF files to various output formats, display them on screen, or convert them between different formats. It serves as the core engine for many document processing systems and provides powerful capabilities for document manipulation, conversion, and printing operations.

## Basic Syntax

```bash
gs [OPTIONS] [FILES...]
```

## Common Command Categories

- **Display**: Show files on screen or terminal
- **Conversion**: Convert between different formats
- **Printing**: Send files to printers
- **Extraction**: Extract specific pages or elements
- **Optimization**: Reduce file size and improve quality

## Common Options

### Device and Output Options
- `-sDEVICE=<device>` - Set output device
- `-sOutputFile=<filename>` - Set output filename
- `-dNOPAUSE` - Don't pause between pages
- `-dBATCH` - Exit after processing files
- `-dSAFER` - Run in safer mode
- `-dQUIET` - Suppress messages

### Page and Resolution Options
- `-r<resolution>` - Set resolution in DPI
- `-g<w>x<h>` - Set output geometry (width x height)
- `-dFirstPage=<n>` - Start at page n
- `-dLastPage=<n>` - End at page n
- `-dFIXEDMEDIA` - Use fixed media size
- `-dPDFFitPage` - Fit PDF to page

### Color and Image Options
- `-dGrayImage=<device>` - Set grayscale image device
- `-dColorImage=<device>` - Set color image device
- `-dAutoRotatePages=/None` - Disable automatic rotation
- `-dUseTrimBox` - Use PDF trim box
- `-dNOGC` - Disable garbage collection

### Text and Font Options
- `-dEmbedAllFonts=true` - Embed all fonts
- `-dSubsetFonts=true` - Subset fonts
- `-dMaxSubsetPct=100` - Maximum font subsetting
- `-sFont=<fontname>` - Specify font

### Compression Options
- `-dAutoFilterColorImages=false` - Disable auto color filtering
- `-dColorImageFilter=/DCTEncode` - Use JPEG compression
- `-dColorImageFilter=/FlateEncode` - Use ZIP compression
- `-dJPEGQ=95` - JPEG quality (0-100)

## Common Devices

### Output Devices
- `pdfwrite` - Create PDF files
- `ps2write` - Create PostScript files
- `eps2write` - Create EPS files
- `png16m` - 48-bit PNG
- `png256` - 8-bit PNG
- `pngmono` - Monochrome PNG
- `jpeg` - JPEG format
- `tiff24nc` - 24-bit TIFF
- `tiffgray` - Grayscale TIFF

### Display Devices
- `x11` - X11 display
- `x11alpha` - X11 with alpha channel
- `display` - Platform-specific display
- `nullpage` - No output (useful for testing)

### Printer Devices
- `laserjet` - HP LaserJet
- `ljet4` - HP LaserJet 4
- `psmono` - PostScript monochrome printer
- `psgray` - PostScript grayscale printer
- `psrgb` - PostScript color printer

## Usage Examples

### Basic Operations

#### Displaying Files
```bash
# Display PDF file on screen
gs document.pdf

# Display PostScript file
gs document.ps

# Display without pausing between pages
gs -dNOPAUSE -dBATCH document.pdf

# Quiet mode (suppress messages)
gs -dQUIET -dNOPAUSE -dBATCH document.pdf

# Safe mode (restrict file operations)
gs -dSAFER document.pdf
```

#### Page Range Selection
```bash
# Display specific page range
gs -dNOPAUSE -dBATCH -dFirstPage=5 -dLastPage=10 document.pdf

# Display single page
gs -dNOPAUSE -dBATCH -dFirstPage=3 -dLastPage=3 document.pdf

# Display from page 10 to end
gs -dNOPAUSE -dBATCH -dFirstPage=10 document.pdf

# Display from start to page 15
gs -dNOPAUSE -dBATCH -dLastPage=15 document.pdf
```

### File Conversion

#### PDF to Image Conversion
```bash
# Convert PDF to PNG (300 DPI)
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r300 -sOutputFile=output_%03d.png input.pdf

# Convert PDF to JPEG (high quality)
gs -dNOPAUSE -dBATCH -sDEVICE=jpeg -r150 -dJPEGQ=95 -sOutputFile=output_%03d.jpg input.pdf

# Convert PDF to grayscale PNG
gs -dNOPAUSE -dBATCH -sDEVICE=pnggray -r200 -sOutputFile=output_%03d.png input.pdf

# Convert specific page range to images
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r150 -dFirstPage=1 -dLastPage=5 -sOutputFile=page_%03d.png document.pdf

# Convert with custom dimensions
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -g800x600 -sOutputFile=output.png input.pdf
```

#### PDF Creation and Manipulation
```bash
# Convert PostScript to PDF
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=output.pdf input.ps

# Merge multiple PDF files
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=merged.pdf file1.pdf file2.pdf file3.pdf

# Extract specific pages from PDF
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dFirstPage=3 -dLastPage=7 -sOutputFile=extracted.pdf input.pdf

# Optimize PDF for web
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -sOutputFile=optimized.pdf input.pdf

# Create high-quality PDF for printing
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/printer -sOutputFile=print_ready.pdf input.pdf

# Compress PDF with different settings
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -sOutputFile=compressed.pdf input.pdf
```

#### Format Conversions
```bash
# Convert PDF to PostScript
gs -dNOPAUSE -dBATCH -sDEVICE=ps2write -sOutputFile=output.ps input.pdf

# Convert PDF to EPS (for LaTeX)
gs -dNOPAUSE -dBATCH -sDEVICE=eps2write -sOutputFile=output.eps input.pdf

# Convert PostScript to PNG
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r300 -sOutputFile=output.png input.ps

# Convert multiple PostScript files to PDFs
for file in *.ps; do
    gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile="${file%.ps}.pdf" "$file"
done
```

### Advanced PDF Operations

#### PDF Optimization and Compression
```bash
# Prepress quality PDF
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=prepress.pdf input.pdf

# Printer quality PDF
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/printer -sOutputFile=printer.pdf input.pdf

# Ebook quality PDF (balanced)
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -sOutputFile=ebook.pdf input.pdf

# Screen quality PDF (smallest size)
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/screen -sOutputFile=screen.pdf input.pdf

# Default quality PDF
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/default -sOutputFile=default.pdf input.pdf
```

#### Font and Text Handling
```bash
# Convert PDF embedding all fonts
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dEmbedAllFonts=true -sOutputFile=embedded_fonts.pdf input.pdf

# Convert with font subsetting
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dSubsetFonts=true -dMaxSubsetPct=100 -sOutputFile=subset_fonts.pdf input.pdf

# Force specific font substitution
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sFONTPATH=/path/to/fonts -sOutputFile=output.pdf input.ps

# Create PDF-A compliant file
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFA -sProcessColorModel=DeviceRGB -sOutputFile=pdfa.pdf input.pdf
```

### Image Processing

#### High-Quality Image Conversion
```bash
# Convert PDF to high-resolution TIFF for printing
gs -dNOPAUSE -dBATCH -sDEVICE=tiff24nc -r600 -sOutputFile=output_%03d.tif input.pdf

# Convert to JPEG with custom quality
gs -dNOPAUSE -dBATCH -sDEVICE=jpeg -r150 -dJPEGQ=85 -sOutputFile=output_%03d.jpg input.pdf

# Convert to PNG with transparency
gs -dNOPAUSE -dBATCH -sDEVICE=pngalpha -r300 -sOutputFile=output_%03d.png input.pdf

# Convert to grayscale images
gs -dNOPAUSE -dBATCH -sDEVICE=tiffgray -r200 -sOutputFile=output_%03d.tif input.pdf
```

#### Batch Image Processing
```bash
# Convert all PDFs in directory to PNGs
for pdf in *.pdf; do
    gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r150 -sOutputFile="${pdf%.pdf}_%03d.png" "$pdf"
done

# Create thumbnails from PDFs
for pdf in *.pdf; do
    gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r72 -dFirstPage=1 -dLastPage=1 -sOutputFile="thumb_${pdf%.pdf}.png" "$pdf"
done
```

## Practical Examples

### Document Processing Workflow

#### Automated PDF Processing
```bash
#!/bin/bash
# Batch PDF processing script

INPUT_DIR="input_pdfs"
OUTPUT_DIR="processed_pdfs"
THUMBNAIL_DIR="thumbnails"

mkdir -p "$OUTPUT_DIR" "$THUMBNAIL_DIR"

# Process each PDF
for pdf in "$INPUT_DIR"/*.pdf; do
    filename=$(basename "$pdf" .pdf)

    # Create compressed version
    gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook \
        -sOutputFile="$OUTPUT_DIR/${filename}_compressed.pdf" "$pdf"

    # Create thumbnail
    gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r72 -dFirstPage=1 -dLastPage=1 \
        -sOutputFile="$THUMBNAIL_DIR/${filename}_thumb.png" "$pdf"

    echo "Processed: $filename"
done
```

#### PDF Validation and Repair
```bash
#!/bin/bash
# PDF validation and repair script

validate_pdf() {
    local pdf_file="$1"

    echo "Validating: $pdf_file"

    # Attempt to render first page to check validity
    if gs -dNOPAUSE -dBATCH -sDEVICE=nullpage -dFirstPage=1 -dLastPage=1 "$pdf_file" 2>/dev/null; then
        echo "✓ Valid PDF: $pdf_file"
        return 0
    else
        echo "✗ Invalid PDF: $pdf_file"

        # Attempt to repair
        echo "Attempting to repair..."
        gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile="${pdf_file%.pdf}_repaired.pdf" "$pdf_file"

        if [ $? -eq 0 ]; then
            echo "✓ Successfully repaired: ${pdf_file%.pdf}_repaired.pdf"
        else
            echo "✗ Repair failed for: $pdf_file"
        fi
        return 1
    fi
}

# Validate all PDFs
for pdf in *.pdf; do
    validate_pdf "$pdf"
done
```

### Printing and Output

#### Print Preparation
```bash
# Prepare PDF for specific printer
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite \
    -dPDFA -sProcessColorModel=DeviceCMYK \
    -dCompatibilityLevel=1.4 \
    -dEmbedAllFonts=true \
    -sOutputFile=print_ready.pdf \
    input.pdf

# Convert to printer-specific format
gs -dNOPAUSE -dBATCH -sDEVICE=ljet4 -sOutputFile=printready.pjl input.pdf

# Create booklet layout
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite \
    -d booklet=true \
    -dBookletRight=36 -dBookletBottom=36 \
    -sOutputFile=booklet.pdf \
    input.pdf
```

### Security and Safe Mode

#### Safe Document Processing
```bash
# Process untrusted PDF safely
gs -dNOPAUSE -dBATCH -dSAFER -dNOOUTERSAVE -dDELAYSAFER \
    -sDEVICE=pdfwrite -sOutputFile=safe_output.pdf \
    untrusted.pdf

# Disable potentially dangerous features
gs -dNOPAUSE -dBATCH -dSAFER \
    -dNOINTERP -dNOPSICC -dNORANGEPAGESIZE \
    -sDEVICE=pdfwrite -sOutputFile=secure.pdf \
    input.pdf
```

## Advanced Usage

### Performance Optimization

#### Memory and Speed Optimization
```bash
# Limit memory usage
gs -dNOPAUSE -dBATCH -dMaxBitmap=500000000 \
    -sDEVICE=pdfwrite -sOutputFile=output.pdf \
    input.pdf

# Use multiple cores (if available)
gs -dNOPAUSE -dBATCH -dNumRenderingThreads=4 \
    -sDEVICE=png16m -r300 -sOutputFile=output.png \
    input.pdf

# Optimize for large files
gs -dNOPAUSE -dBATCH -dFirstPage=1 -dLastPage=100 \
    -sDEVICE=pdfwrite -sOutputFile=part1.pdf \
    large_file.pdf
```

#### Ghostscript Resource Settings
```bash
# Increase temporary space
gs -dNOPAUSE -dBATCH -dMaxUPath=1000 -dMaxFontItem=500 \
    -sDEVICE=pdfwrite -sOutputFile=output.pdf \
    input.pdf

# Control cache settings
gs -dNOPAUSE -dBATCH -dBufferSpace=200000 -dBandBufferSpace=50000 \
    -sDEVICE=pdfwrite -sOutputFile=output.pdf \
    input.pdf
```

### Custom Device Configuration

#### Create Custom Output Devices
```bash
# Custom JPEG with specific settings
gs -dNOPAUSE -dBATCH -sDEVICE=jpeg \
    -dJPEGQ=90 -dUseTrimBox -dAutoRotatePages=/None \
    -r300 -sOutputFile=custom_%03d.jpg \
    input.pdf

# Custom PDF with specific settings
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite \
    -dCompatibilityLevel=1.7 \
    -dAutoRotatePages=/None \
    -dDetectDuplicateImages=true \
    -dCompressFonts=true \
    -sOutputFile=custom.pdf \
    input.pdf
```

### Integration with Other Tools

#### Pipeline Integration
```bash
# Use with find for batch processing
find . -name "*.ps" -print0 | xargs -0 -I {} \
    gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile={}.pdf {}

# Use with pdftk for advanced manipulation
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=temp.pdf input.pdf
pdftk temp.pdf cat 1-5 output first_5_pages.pdf

# Use with convert (ImageMagick) for additional processing
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r300 -sOutputFile=- input.pdf | \
    convert - -quality 95 output.jpg
```

## Troubleshooting

### Common Issues

#### Memory and Performance Problems
```bash
# Out of memory errors
# Solution: Limit memory usage and bitmap size
gs -dNOPAUSE -dBATCH -dMaxBitmap=100000000 -sDEVICE=pdfwrite -sOutputFile=output.pdf input.pdf

# Slow processing
# Solution: Adjust resolution and disable features
gs -dNOPAUSE -dBATCH -r150 -dNOGC -sDEVICE=png16m -sOutputFile=output.png input.pdf

# Large file processing
# Solution: Process in chunks
gs -dNOPAUSE -dBATCH -dFirstPage=1 -dLastPage=50 -sDEVICE=pdfwrite -sOutputFile=part1.pdf large.pdf
gs -dNOPAUSE -dBATCH -dFirstPage=51 -dLastPage=100 -sDEVICE=pdfwrite -sOutputFile=part2.pdf large.pdf
```

#### Font and Text Issues
```bash
# Missing fonts
# Solution: Specify font path and substitutions
gs -dNOPAUSE -dBATCH -sFONTPATH=/usr/share/fonts -sOutputFile=output.pdf input.ps

# Font embedding problems
# Solution: Force font embedding
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dEmbedAllFonts=true -sOutputFile=output.pdf input.pdf

# Text encoding issues
# Solution: Specify encoding
gs -dNOPAUSE -dBATCH -dNOSAFER -sOutputFile=output.pdf input.ps
```

#### Color and Output Problems
```bash
# Color accuracy issues
# Solution: Use specific color profiles
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sProcessColorModel=DeviceRGB -sOutputFile=output.pdf input.pdf

# Incorrect page sizes
# Solution: Fix media handling
gs -dNOPAUSE -dBATCH -dFIXEDMEDIA -dCompatibilityLevel=1.4 -sOutputFile=output.pdf input.pdf

# Image quality problems
# Solution: Adjust compression settings
gs -dNOPAUSE -dBATCH -sDEVICE=jpeg -dJPEGQ=95 -dAutoFilterColorImages=false -sOutputFile=output.jpg input.pdf
```

### Debugging and Testing

#### Troubleshooting Commands
```bash
# Test Ghostscript installation
gs --version

# List available devices
gs -h

# Test file validity
gs -dNOPAUSE -dBATCH -sDEVICE=nullpage input.pdf

# Verbose output for debugging
gs -dNOPAUSE -dBATCH -dverbose input.pdf

# Check PostScript syntax
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dQUIET -sOutputFile=test.pdf input.ps 2>errors.log
```

## Related Commands

- [`ps2pdf`](/docs/commands/document/ps2pdf) - PostScript to PDF converter
- [`pdf2ps`](/docs/commands/document/pdf2ps) - PDF to PostScript converter
- [`ps2eps`](/docs/commands/document/ps2eps) - PostScript to EPS converter
- [`pdftk`](/docs/commands/document/pdftk) - PDF toolkit
- [`convert`](/docs/commands/imagemagick/convert) - ImageMagick convert tool
- [`identify`](/docs/commands/imagemagick/identify) - ImageMagick identify tool
- [`pdfinfo`](/docs/commands/document/pdfinfo) - PDF information extractor
- [`pdfgrep`](/docs/commands/document/pdfgrep) - Search text in PDF files
- [`pdftoppm`](/docs/commands/document/pdftoppm) - PDF to PPM converter
- [`pdftotext`](/docs/commands/document/pdftotext) - PDF to text converter

## Best Practices

1. **Always use -dNOPAUSE -dBATCH** for automated processing
2. **Use -dSAFER** when processing untrusted documents
3. **Choose appropriate -dPDFSETTINGS** based on output quality requirements
4. **Set proper resolution (-r)** for image conversions
5. **Use specific page ranges** for large documents
6. **Test with small samples** before processing large batches
7. **Monitor memory usage** with large files
8. **Validate output files** after conversion
9. **Use appropriate output devices** for target formats
10. **Backup original files** before batch processing

## Performance Tips

1. **Screen quality** (/screen) produces smallest files for web use
2. **Ebook quality** (/ebook) balances size and quality for documents
3. **Printer quality** (/printer) best for printing purposes
4. **Prepress quality** (/prepress) highest quality for professional printing
5. **Limit resolution** to 150-300 DPI for most image conversions
6. **Use -dMaxBitmap** to control memory usage with large files
7. **Disable auto-rotation** (-dAutoRotatePages=/None) for predictable output
8. **Embed fonts** (-dEmbedAllFonts=true) for better portability
9. **Use specific devices** like png16m for better color accuracy
10. **Process in batches** for better resource management

The `gs` command is a powerful and versatile document processing tool that serves as the backbone for many PDF and PostScript workflows. Its extensive format support, conversion capabilities, and optimization options make it indispensable for document management, printing, and archival tasks in professional environments.