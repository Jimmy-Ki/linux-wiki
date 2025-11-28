---
title: mktemp - Create temporary file or directory
sidebar_label: mktemp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mktemp - Create temporary file or directory

The `mktemp` command is a utility for creating temporary files and directories with secure, randomized names. It solves the security problems associated with using predictable temporary file names by generating unique names with random characters. mktemp is essential for shell scripting and programming tasks that require safe temporary storage, ensuring that temporary files have unique names and proper permissions to prevent race conditions and security vulnerabilities.

## Basic Syntax

```bash
mktemp [OPTIONS] [TEMPLATE]
```

## Common Options

### File Creation Options
- `-d, --directory` - Create a temporary directory instead of a file
- `-u, --dry-run` - Don't actually create anything, just print the name
- `-q, --quiet` - Suppress error messages
- `--suffix=SUFFIX` - Append SUFFIX to TEMPLATE
- `--tmpdir[=DIR]` - Interpret TEMPLATE relative to DIR (default: $TMPDIR or /tmp)

### Template Options
- `TEMPLATE` - Template for temporary filename (default: tmp.XXXXXXXXXX)
  - Must contain at least 3 consecutive 'X' characters
  - X's will be replaced with random alphanumeric characters

### Information Options
- `-h, --help` - Display help information
- `-V, --version` - Show version information

## Usage Examples

### Basic Temporary File Operations

#### Creating Temporary Files
```bash
# Create a temporary file with default template
mktemp
# Output: /tmp/tmp.abc123def

# Create a temporary file with custom template
mktemp /tmp/mytemp.XXXXXXXX
# Output: /tmp/mytemp.a1b2c3d4

# Create temporary file in current directory
mktemp ./temp.XXX
# Output: ./temp.A1B

# Create temporary file with suffix
mktemp --suffix=.log temp.XXXXXX
# Output: /tmp/temp.A1B2C3.log

# Create temporary file but don't actually create it (dry run)
mktemp -u test.XXXX
# Output: /tmp/test.A1B2 (file doesn't exist)
```

#### Creating Temporary Directories
```bash
# Create a temporary directory
mktemp -d
# Output: /tmp/tmp.def456ghi

# Create temporary directory with custom template
mktemp -d /tmp/workdir.XXXXXXXX
# Output: /tmp/workdir.b2c3d4e5

# Create temporary directory and use it immediately
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"
echo "Working in temporary directory: $TEMP_DIR"

# Clean up temporary directory when done
rm -rf "$TEMP_DIR"
```

### Template Customization

#### Custom Templates and Patterns
```bash
# Use custom prefix
mktemp backup.XXXXXX
# Output: backup.C3D4E5

# Use custom path and template
mktemp /var/cache/myapp.XXXXXXXXXX
# Output: /var/cache/myapp.F1A2B3C4D5

# Create multiple temporary files with different templates
TEMP1=$(mktemp data1.XXXX)
TEMP2=$(mktemp data2.XXXX)
TEMP3=$(mktemp data3.XXXX)

echo "Created temporary files: $TEMP1, $TEMP2, $TEMP3"

# Template with specific directory and suffix
mktemp --tmpdir=/home/user/tmp --suffix=.cache cache.XXXXXX
# Output: /home/user/tmp/cache.D4E5F6.cache
```

#### Secure Template Practices
```bash
# Minimum 3 X's required (will fail with fewer)
mktemp temp.XX  # This will fail

# Good: More X's for better randomness
mktemp secure.XXXXXXXXXXXXXXXXXX

# Template with timestamp and randomness
mktemp backup_$(date +%Y%m%d)_XXXXXX
# Output: backup_20251128_A1B2C3
```

## Practical Examples

### Shell Scripting

#### Safe Temporary File Handling
```bash
#!/bin/bash
# Script demonstrating safe temporary file usage

# Create temporary file and store its name
TEMP_FILE=$(mktemp)

# Ensure cleanup on exit
trap 'rm -f "$TEMP_FILE"' EXIT

# Use temporary file
echo "Processing data..." > "$TEMP_FILE"
echo "Important information" >> "$TEMP_FILE"

# Process the file
cat "$TEMP_FILE" | some_processing_command

# Script will automatically clean up on exit
echo "Temporary file will be cleaned up automatically"
```

#### Temporary Directory for Processing
```bash
#!/bin/bash
# Script using temporary directory for batch processing

# Create temporary directory
WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

echo "Working directory: $WORK_DIR"

# Copy files to temporary directory
cp /path/to/input/files/* "$WORK_DIR/"

# Process files in temporary directory
cd "$WORK_DIR"
for file in *; do
    echo "Processing $file..."
    # Process each file
    process_file "$file" > "${file}.processed"
done

# Copy results back
cp *.processed /path/to/output/

echo "Processing complete"
```

#### Multiple Temporary Files
```bash
#!/bin/bash
# Managing multiple temporary files

# Create an array to store temporary file names
declare -a TEMP_FILES

# Create multiple temporary files
for i in {1..5}; do
    TEMP_FILE=$(mktemp temp_$i.XXXXXX)
    TEMP_FILES+=("$TEMP_FILE")
    echo "Data for file $i" > "$TEMP_FILE"
done

# Use the files
for temp_file in "${TEMP_FILES[@]}"; do
    echo "Processing $(basename "$temp_file")"
    cat "$temp_file"
done

# Clean up all temporary files
rm -f "${TEMP_FILES[@]}"
```

### System Administration

#### Log File Rotation and Analysis
```bash
#!/bin/bash
# Log analysis script using temporary files

LOG_FILE="/var/log/application.log"
TEMP_SORTED=$(mktemp)
TEMP_FILTERED=$(mktemp)

trap 'rm -f "$TEMP_SORTED" "$TEMP_FILTERED"' EXIT

# Extract and sort error messages
grep "ERROR" "$LOG_FILE" | sort > "$TEMP_SORTED"

# Filter unique errors
uniq "$TEMP_SORTED" > "$TEMP_FILTERED"

# Generate report
echo "Error Analysis Report - $(date)"
echo "=============================="
cat "$TEMP_FILTERED"

# Send report
mail -s "Log Analysis Report" admin@example.com < "$TEMP_FILTERED"
```

#### Backup and Restore Operations
```bash
#!/bin/bash
# Backup script using temporary storage

SOURCE_DIR="/home/user/documents"
BACKUP_FILE="/backup/daily_backup.tar.gz"
TEMP_LIST=$(mktemp)

trap 'rm -f "$TEMP_LIST"' EXIT

# Create file list for backup
find "$SOURCE_DIR" -type f -mtime -1 > "$TEMP_LIST"

# Create backup using the file list
tar -czf "$BACKUP_FILE" -T "$TEMP_LIST"

echo "Backup created: $BACKUP_FILE"
echo "Files backed up: $(wc -l < "$TEMP_LIST")"
```

#### Configuration File Processing
```bash
#!/bin/bash
# Configuration management with temporary files

CONFIG_FILE="/etc/myapp/config.conf"
TEMP_CONFIG=$(mktemp)

trap 'rm -f "$TEMP_CONFIG"' EXIT

# Copy current configuration
cp "$CONFIG_FILE" "$TEMP_CONFIG"

# Make modifications safely
sed -i 's/debug=false/debug=true/' "$TEMP_CONFIG"
sed -i 's/log_level=INFO/log_level=DEBUG/' "$TEMP_CONFIG"

# Validate new configuration
if validate_config "$TEMP_CONFIG"; then
    cp "$TEMP_CONFIG" "$CONFIG_FILE"
    echo "Configuration updated successfully"
else
    echo "Configuration validation failed"
    exit 1
fi
```

### Development Workflow

#### Build and Compilation
```bash
#!/bin/bash
# Build script using temporary directories

BUILD_DIR=$(mktemp -d)
SOURCE_DIR="$PWD"
trap 'rm -rf "$BUILD_DIR"' EXIT

echo "Building in temporary directory: $BUILD_DIR"

# Copy source files
cp -r "$SOURCE_DIR"/* "$BUILD_DIR/"
cd "$BUILD_DIR"

# Configure and build
./configure --prefix=/usr/local
make
make check

# Install if tests pass
if [ $? -eq 0 ]; then
    sudo make install
    echo "Build and installation successful"
else
    echo "Build failed"
    exit 1
fi
```

#### Testing and Validation
```bash
#!/bin/bash
# Test script using temporary files

TEST_DATA=$(mktemp)
TEST_OUTPUT=$(mktemp)

trap 'rm -f "$TEST_DATA" "$TEST_OUTPUT"' EXIT

# Create test data
cat > "$TEST_DATA" << EOF
test line 1
test line 2
test line 3
EOF

# Run application with test data
./myapp < "$TEST_DATA" > "$TEST_OUTPUT"

# Validate output
if [ -s "$TEST_OUTPUT" ]; then
    echo "Test passed - Application produced output"
    cat "$TEST_OUTPUT"
else
    echo "Test failed - No output produced"
    exit 1
fi
```

## Advanced Usage

### Security Considerations

#### Secure Temporary File Practices
```bash
#!/bin/bash
# Security-focused temporary file handling

# Set restrictive umask for temporary files
OLD_UMASK=$(umask)
umask 077

# Create temporary file with restricted permissions
TEMP_FILE=$(mktemp)

# Restore original umask
umask "$OLD_UMASK"

# Ensure only owner can read/write
chmod 600 "$TEMP_FILE"

# Use temporary file for sensitive data
echo "sensitive_data" | openssl enc -aes-256-cbc -out "$TEMP_FILE"

# Process and clean up securely
decrypt_and_process "$TEMP_FILE"
shred -u "$TEMP_FILE"  # Securely delete
```

#### Race Condition Prevention
```bash
#!/bin/bash
# Preventing race conditions with mktemp

# GOOD: Using mktemp (atomic operation)
TEMP_FILE=$(mktemp /tmp/myscript.XXXXXX)

# BAD: Avoid this pattern (race condition)
# TEMP_FILE="/tmp/myscript.$$"
# touch "$TEMP_FILE"

# Check if file was created successfully
if [ ! -f "$TEMP_FILE" ]; then
    echo "Failed to create temporary file"
    exit 1
fi

# Use the file safely
echo "data" > "$TEMP_FILE"

# Clean up
rm -f "$TEMP_FILE"
```

### Performance Optimization

#### Efficient Temporary File Management
```bash
#!/bin/bash
# Efficient handling of many temporary files

# Use RAM disk for better performance (if available)
TMPDIR="${TMPDIR:-/tmp}"
if [ -d "/dev/shm" ] && [ -w "/dev/shm" ]; then
    TMPDIR="/dev/shm"
fi

# Create temporary directory in fast storage
WORK_DIR=$(mktemp -d -p "$TMPDIR")
echo "Working in: $WORK_DIR"

# Batch operations to reduce file system calls
{
    echo "line1"
    echo "line2"
    echo "line3"
} > "$WORK_DIR/batch_data.txt"

# Clean up
rm -rf "$WORK_DIR"
```

#### Memory-Mapped Temporary Files
```bash
#!/bin/bash
# Using temporary files for memory mapping

TEMP_FILE=$(mktemp)
trap 'rm -f "$TEMP_FILE"' EXIT

# Create a large temporary file
dd if=/dev/zero of="$TEMP_FILE" bs=1M count=100

# Use for memory mapping in other processes
echo "Temporary file created for memory mapping: $TEMP_FILE"
echo "Size: $(stat -c%s "$TEMP_FILE") bytes"

# Application can now mmap this file
./memory_intensive_app --temp-file "$TEMP_FILE"
```

### Cross-Platform Compatibility

#### Portable Temporary File Handling
```bash
#!/bin/bash
# Cross-platform temporary file creation

# Detect OS and set appropriate temp directory
case "$(uname -s)" in
    Darwin*)
        TMPDIR="${TMPDIR:-/tmp}"
        ;;
    Linux*)
        TMPDIR="${TMPDIR:-/tmp}"
        ;;
    CYGWIN*|MINGW*)
        TMPDIR="${TMPDIR:-$TEMP}"
        ;;
    *)
        TMPDIR="${TMPDIR:-/tmp}"
        ;;
esac

# Create temporary file with platform-appropriate path
TEMP_FILE=$(mktemp -p "$TMPDIR" portable.XXXXXX)
echo "Platform-agnostic temporary file: $TEMP_FILE"

# Clean up
rm -f "$TEMP_FILE"
```

## Integration and Automation

### Build System Integration

#### Makefile with Temporary Files
```makefile
# Makefile using mktemp for temporary storage

.PHONY: test clean

test:
	@echo "Running tests with temporary files..."
	@TEMP_DIR=$$(mktemp -d) && \
	trap 'rm -rf $$TEMP_DIR' EXIT && \
	cp test_data/*.txt $$TEMP_DIR/ && \
	for file in $$TEMP_DIR/*.txt; do \
		echo "Testing $$file"; \
		./test_runner "$$file" || exit 1; \
	done

clean:
	@echo "Cleaning up..."
	@find . -name "tmp.*" -type f -delete 2>/dev/null || true
	@find . -name "tmp.*" -type d -delete 2>/dev/null || true
```

#### CI/CD Pipeline Integration
```bash
#!/bin/bash
# CI/CD script using temporary files

set -euo pipefail

# Create workspace directory
WORKSPACE=$(mktemp -d)
trap 'rm -rf "$WORKSPACE"' EXIT

echo "CI/CD Pipeline - Workspace: $WORKSPACE"

# Clone repository
git clone https://github.com/user/repo.git "$WORKSPACE/repo"
cd "$WORKSPACE/repo"

# Create temporary file for build artifacts
ARTIFACTS=$(mktemp artifacts.XXXXXX.tar.gz)

# Build and test
npm ci
npm test
npm run build

# Package artifacts
tar -czf "$ARTIFACTS" dist/

# Upload artifacts
curl -X POST \
  -H "Authorization: token $CI_TOKEN" \
  -F "file=@$ARTIFACTS" \
  https://api.github.com/repos/user/repo/releases

echo "Pipeline completed successfully"
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
#!/bin/bash
# Troubleshooting permission issues

# Check if temporary directory is writable
TEMP_DIR="/tmp"
if [ ! -w "$TEMP_DIR" ]; then
    echo "Error: $TEMP_DIR is not writable"
    # Try alternative locations
    for alt_dir in "$HOME/tmp" "/var/tmp" "/dev/shm"; do
        if [ -w "$alt_dir" ]; then
            echo "Using alternative directory: $alt_dir"
            TEMP_FILE=$(mktemp -p "$alt_dir" test.XXXXXX)
            break
        fi
    done
else
    TEMP_FILE=$(mktemp test.XXXXXX)
fi

echo "Created temporary file: $TEMP_FILE"
```

#### Disk Space Issues
```bash
#!/bin/bash
# Check disk space before creating temporary files

# Check available space in temp directory
TEMP_DIR="${TMPDIR:-/tmp}"
AVAILABLE_SPACE=$(df "$TEMP_DIR" | awk 'NR==2 {print $4}')
REQUIRED_SPACE=1024  # 1MB in blocks

if [ "$AVAILABLE_SPACE" -lt "$REQUIRED_SPACE" ]; then
    echo "Error: Insufficient disk space in $TEMP_DIR"
    echo "Available: ${AVAILABLE_SPACE}KB, Required: ${REQUIRED_SPACE}KB"
    exit 1
fi

# Create temporary file
TEMP_FILE=$(mktemp -p "$TEMP_DIR" large_file.XXXXXX)
echo "Created temporary file: $TEMP_FILE"

# Clean up on error
trap 'rm -f "$TEMP_FILE"' ERR
```

#### Template Validation
```bash
#!/bin/bash
# Validate mktemp templates

# Function to test template
test_template() {
    local template="$1"

    if mktemp -u "$template" >/dev/null 2>&1; then
        echo "✓ Template '$template' is valid"
        mktemp "$template"
    else
        echo "✗ Template '$template' is invalid"
        return 1
    fi
}

# Test various templates
echo "Testing mktemp templates:"
test_template "temp.XXX"        # Too few X's (will fail)
test_template "temp.XXXX"       # Minimum X's
test_template "temp.XXXXXXXXXX" # Many X's
test_template "/tmp/test.XXXX"  # With directory
test_template "noXs"            # No X's (will fail)
```

## Related Commands

- [`tempfile`](/docs/commands/file-management/tempfile) - Create temporary file (deprecated)
- [`tmpwatch`](/docs/commands/system-management/tmpwatch) - Remove temporary files
- [`tmpreaper`](/docs/commands/system-management/tmpreaper) - Remove files older than specified time
- [`rm`](/docs/commands/file-management/rm) - Remove files or directories
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`touch`](/docs/commands/file-management/touch) - Change file timestamps
- [`dirname`](/docs/commands/file-management/dirname) - Extract directory from path
- [`basename`](/docs/commands/file-management/basename) - Extract filename from path

## Best Practices

1. **Always use trap** to clean up temporary files on script exit
2. **Use descriptive templates** to make debugging easier
3. **Set proper umask** before creating temporary files for sensitive data
4. **Validate template format** before using in production scripts
5. **Use -d option** for temporary directories when working with multiple files
6. **Check disk space** before creating large temporary files
7. **Use $TMPDIR** environment variable to respect user preferences
8. **Avoid predictable names** - never use $$ or timestamps alone
9. **Clean up promptly** - remove temporary files as soon as they're no longer needed
10. **Test cleanup logic** - verify that trap handlers work correctly

## Performance Tips

1. **Use RAM disk** (/dev/shm on Linux) for high-performance temporary storage
2. **Batch operations** to reduce file system I/O
3. **Use minimal templates** - fewer X's means faster generation
4. **Reuse temporary directories** for multiple operations in the same script
5. **Avoid unnecessary file operations** in tight loops
6. **Consider memory alternatives** for very small temporary data
7. **Use appropriate permissions** to avoid unnecessary security checks
8. **Monitor cleanup** - ensure temporary files don't accumulate

The `mktemp` command is an essential utility for safe temporary file and directory creation in shell scripts and system administration tasks. Its secure random naming prevents race conditions and makes it indispensable for robust scripting practices.

**Key Features:**
- Secure random filename generation
- Atomic file creation operations
- Flexible template system
- Cross-platform compatibility
- Integration with shell scripting best practices

**Common Use Cases:**
- Shell script intermediate storage
- Build system temporary files
- Log processing and analysis
- Configuration file modifications
- Test data creation
- Backup and restore operations
- Data processing pipelines