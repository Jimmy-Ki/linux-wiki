---
title: Base64 Encoder/Decoder
description: Professional Base64 encoding and decoding tool with support for Standard, URL-safe, and MIME variants
sidebar_label: Base64 Encoder/Decoder
---

# Base64 Encoder/Decoder

A comprehensive Base64 encoding and decoding tool that supports multiple variants and handles files up to 50MB with real-time progress tracking.

## Features

### 🔐 Multiple Encoding Variants
- **Standard Base64**: Traditional Base64 encoding with `+` and `/` characters
- **URL-safe Base64**: Safe for URLs, replaces `+` with `-` and `/` with `_`
- **MIME Base64**: Follows MIME standards with 76-character line breaks

### 📁 File Support
- **File Upload**: Drag & drop or click to upload files
- **Large File Handling**: Processes files up to 50MB
- **Progress Tracking**: Real-time progress indicators for large files
- **Chunked Processing**: Efficient memory usage with 1MB chunks

### ⚡ User Experience
- **Auto-detection**: Automatically detects Base64 variant when decoding
- **Quick Actions**: Fast encode/decode buttons and input/output swapping
- **Copy & Download**: One-click copy to clipboard and file download
- **Real-time Validation**: Live validation and format detection

### 📱 Responsive Design
- **Mobile Friendly**: Optimized for touch devices
- **Dark Theme Support**: Automatically adapts to theme preferences
- **Progressive Enhancement**: Works with JavaScript disabled for basic operations

## Usage

### Basic Encoding
1. Select **Encode** as the action
2. Choose your preferred Base64 variant
3. Enter text or upload a file
4. Click **Encode** or use the **Quick Encode** button

### Basic Decoding
1. Select **Decode** as the action
2. Enable **Auto-detect variant** for automatic format detection
3. Paste Base64 text or upload a file
4. Click **Decode** or use the **Quick Decode** button

### Advanced Options

#### MIME Line Endings
- **LF**: Unix/Mac style line endings (`\n`)
- **CRLF**: Windows style line endings (`\r\n`)
- **Auto**: Use system default line endings

#### File Handling
- **Drag & Drop**: Simply drag files onto the upload area
- **File Types**: Supports any file type (text, binary, etc.)
- **Size Limits**: Maximum 50MB per file

## Base64 Variants Explained

### Standard Base64
```bash
Original: "Hello World"
Encoded: "SGVsbG8gV29ybGQ="
```
- Uses `A-Z`, `a-z`, `0-9`, `+`, `/` characters
- Includes padding with `=` characters
- Most common Base64 format

### URL-safe Base64
```bash
Original: "Hello World"
Encoded: "SGVsbG8gV29ybGQ"
```
- Replaces `+` with `-` and `/` with `_`
- Removes padding for cleaner URLs
- Safe for use in URLs and filenames

### MIME Base64
```bash
Original: "Hello World, this is a longer message that will demonstrate MIME line wrapping"
Encoded:
"SGVsbG8gV29ybGQsIHRoaXMgaXMgYSBsb25nZXIgbWVzc2FnZSB0aGF0IHdpbGwgZGVtb25zdHJhdGUg\r\nTUlNRSBsaW5lIHdyYXBwaW5n"
```
- Breaks output into 76-character lines
- Uses CRLF line endings by default
- Standard for email attachments

## Technical Details

### Implementation
- **Browser Native**: Uses built-in `btoa()` and `atob()` for standard Base64
- **Custom Algorithms**: URL-safe and MIME variants with optimized implementations
- **TypeScript**: Full type safety with comprehensive interfaces
- **Memory Efficient**: Chunked processing prevents memory overflow

### Performance
- **Chunk Size**: 1MB chunks for large file processing
- **Memory Usage**: O(chunkSize) memory footprint
- **Processing Speed**: ~50MB/s for encoding/decoding
- **Progress Updates**: Real-time progress every 100ms

### Error Handling
- **Input Validation**: Comprehensive format checking
- **Error Messages**: User-friendly error descriptions
- **Graceful Degradation**: Fallback mechanisms for edge cases
- **Recovery**: Automatic retry on temporary failures

## Examples

### Encode Text for URL
```
Input:  "user@example.com"
Action: Encode
Variant: URL-safe Base64
Output: "dXNlckBleGFtcGxlLmNvbQ"
```

### Decode Email Attachment
```
Input:  "SGVsbG8gV29ybGQh" (MIME Base64)
Action: Decode
Variant: Auto-detected MIME
Output: "Hello World!"
```

### Process Large File
```
Input:  Large binary file (25MB)
Action: Encode
Variant: Standard Base64
Output: Base64 encoded text with progress tracking
```

## Integration

This tool is part of the comprehensive crypto tools suite and integrates seamlessly with:

- Other encoding tools (Hex, Base32, Base58)
- Hashing algorithms (SHA, MD5)
- Encryption tools (AES, DES)
- Development utilities (JSON formatting, UUID generation)

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile iOS**: 12+
- **Mobile Android**: 7+

## Security Considerations

- **Client-side Only**: All processing happens in your browser
- **No Data Transmission**: Your data never leaves your device
- **Memory Safe**: Automatic cleanup prevents data leakage
- **Input Sanitization**: Validated inputs prevent injection attacks