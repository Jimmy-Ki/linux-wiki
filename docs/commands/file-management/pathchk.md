---
title: pathchk - Check whether file names are valid
sidebar_label: pathchk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pathchk - Check whether file names are valid

The `pathchk` command is a system utility that validates pathnames for validity and portability across different POSIX-compliant systems. It checks whether specified pathnames conform to system limitations and POSIX standards, helping developers and system administrators ensure file compatibility. The command is particularly useful when creating cross-platform applications, scripts, or when working with file systems that have strict naming conventions. `pathchk` can detect issues like overly long filenames, invalid characters, non-searchable directories, and other pathname-related problems that could cause file operations to fail.

## Basic Syntax

```bash
pathchk [-pP] pathname [pathname...]
```

## Options

### Basic Options
- `-p` - Perform portability checks based on POSIX standards
- `-P` - Perform additional strict checks including empty paths and components starting with hyphen

## Validation Checks

### Default Checks (without options)
The `pathchk` command performs the following validations by default:

- **Path Length**: Checks if the entire path exceeds `PATH_MAX` bytes
- **Component Length**: Validates that no path component exceeds `NAME_MAX` bytes
- **Directory Accessibility**: Ensures all directory components in the path are searchable
- **Path Validity**: Verifies the path follows basic pathname syntax rules

### Portability Checks (-p option)
When the `-p` flag is used, `pathchk` performs additional POSIX portability checks:

- **POSIX Path Length**: Ensures path doesn't exceed `_POSIX_PATH_MAX` (255) bytes
- **POSIX Component Length**: Validates components don't exceed `_POSIX_NAME_MAX` (14) bytes
- **Portable Characters**: Checks for characters outside the portable filename character set:
  - Alphanumeric characters (A-Z, a-z, 0-9)
  - Period (.)
  - Hyphen (-)
  - Underscore (_)

### Strict Checks (-P option)
The `-P` flag adds strict validation rules:

- **Empty Path**: Detects empty pathnames
- **Hyphen Components**: Identifies components starting with hyphen (-)

## Usage Examples

### Basic Path Validation

#### Simple Path Checks
```bash
# Check a valid path
pathchk /tmp

# Check multiple paths
pathchk /home/user /var/log /usr/local/bin

# Check a path that doesn't exist
pathchk /nonexistent/directory

# Check current directory
pathchk .
```

#### Testing Invalid Paths
```bash
# Test path with non-existent parent (should pass)
pathchk /nonexistent/parent/newfile.txt

# Test path with very long filename
pathchk /tmp/this-is-a-very-long-filename-that-might-exceed-system-limits

# Test with special characters (may fail on some systems)
pathchk "/tmp/file with spaces"
```

### Portability Validation

#### POSIX Standard Checks
```bash
# Check POSIX portability
pathchk -p /home/user/document.txt

# Check long filename for POSIX compatibility
pathchk -p "/tmp/long-filename-that-exceeds-posix-14-char-limit.txt"

# Check path with special characters
pathchk -p "/tmp/file@#$%^&*()"

# Multiple files with portability check
find . -type f -exec pathchk -p {} +
```

#### Cross-Platform Compatibility
```bash
# Check all files in current directory for POSIX compatibility
ls | xargs pathchk -p

# Validate script-generated filenames
pathchk -p "$(date +%Y%m%d)_report_final_v2.0.csv"

# Check application-generated paths
pathchk -p "/var/log/app_$(hostname)_$(date +%Y%m%d).log"
```

### Strict Validation

#### Additional Safety Checks
```bash
# Perform strict validation
pathchk -P /path/to/file

# Check for empty path components
pathchk -P "/path//with//double//slashes"

# Check for hyphen-starting components
pathchk -P "/path/-invalid-component/file"

# Combined portability and strict checks
pathchk -pP "/path/with-issues"
```

## Practical Examples

### System Administration

#### File System Validation
```bash
# Check all mount points for validity
mount | awk '{print $3}' | grep -v '^/$' | xargs pathchk

# Validate backup paths before backup operation
backup_paths="/home /etc /var /opt"
for path in $backup_paths; do
    if pathchk "$path"; then
        echo "Path $path is valid"
    else
        echo "Path $path has issues"
    fi
done

# Check log file paths for rotation
log_paths="/var/log/messages /var/log/auth.log /var/log/syslog"
for log in $log_paths; do
    pathchk -p "$log" || echo "Log path $log not portable"
done
```

#### System Migration Planning
```bash
# Validate all system paths for migration to different OS
find / -type f -name "*.conf" | head -20 | xargs pathchk -p

# Check home directory structure for portability
for user in $(ls /home); do
    find "/home/$user" -maxdepth 2 | xargs pathchk -p
done

# Validate application installation paths
app_paths="/opt/app /usr/local/app /etc/app/conf"
for path in $app_paths; do
    pathchk -pP "$path" && echo "$path: OK" || echo "$path: INVALID"
done
```

### Development Workflow

#### Build System Integration
```bash
# Validate source file paths in Makefile
find src/ -name "*.c" | xargs pathchk -p

# Check output file paths
output_paths="build/release/app build/debug/app build/test/test_suite"
for path in $output_paths; do
    pathchk "$path" || echo "Invalid output path: $path"
done

# Validate temporary file paths
temp_dir="/tmp/$(whoami)_build_$(date +%s)"
pathchk -p "$temp_dir" && mkdir -p "$temp_dir"
```

#### Package Development
```bash
# Validate file paths for package inclusion
package_files="bin/app lib/libapp.so share/man/man1/app.1"
for file in $package_files; do
    pathchk -p "/usr/local/$file" || echo "Non-portable path: $file"
done

# Check configuration file paths
config_paths="/etc/app/config /etc/app/conf.d /etc/app/modules"
pathchk -p $config_paths

# Validate user data paths
user_paths=".config/app .local/share/app .cache/app"
pathchk -p $user_paths
```

### Application Development

#### File Validation in Scripts
```bash
#!/bin/bash
# Function to validate user-provided paths
validate_path() {
    local path="$1"
    local strict="${2:-false}"

    if [ "$strict" = "true" ]; then
        pathchk -pP "$path"
    else
        pathchk -p "$path"
    fi

    return $?
}

# Usage examples
validate_path "/home/user/data" && echo "Path is valid"
validate_path "/tmp/very-long-filename.txt" true || echo "Path not portable"
```

#### Cross-Platform File Handling
```bash
# Generate portable filenames
timestamp=$(date +%Y%m%d_%H%M%S)
safe_filename="report_${timestamp}.txt"
pathchk -p "$safe_filename" || safe_filename="report.txt"

# Create portable paths
base_dir="/var/log/app"
hostname_clean=$(hostname | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9_-]//g')
log_path="${base_dir}/${hostname_clean}_$(date +%Y%m%d).log"

if pathchk -p "$log_path"; then
    echo "Log path is portable: $log_path"
else
    echo "Log path needs adjustment"
fi
```

## Advanced Usage

### Batch Processing

#### Bulk Path Validation
```bash
# Validate all paths from a file
while read -r path; do
    if pathchk -p "$path"; then
        echo "VALID: $path"
    else
        echo "INVALID: $path"
    fi
done < paths_list.txt

# Check all executables in PATH for validity
echo "$PATH" | tr ':' '\n' | while read -r dir; do
    [ -d "$dir" ] && find "$dir" -type f -executable | xargs pathchk
done

# Validate all symbolic links
find / -type l 2>/dev/null | head -50 | while read link; do
    target=$(readlink "$link")
    pathchk "$target" 2>/dev/null || echo "Broken link: $link -> $target"
done
```

#### Automated Testing
```bash
# Test path generation function
test_path_generation() {
    local test_cases=(
        "/tmp/normal_file.txt"
        "/very/deep/nested/path/structure/file.txt"
        "/tmp/file-with-dashes.txt"
        "/tmp/file_with_underscores.txt"
        "/tmp/file.with.dots.txt"
    )

    for path in "${test_cases[@]}"; do
        if pathchk -p "$path"; then
            echo "✓ PASS: $path"
        else
            echo "✗ FAIL: $path"
        fi
    done
}

# Test portable character set
test_portable_chars() {
    local portable="abc123.-_"
    local nonportable="@#$%^&*(){}[]"

    echo "Testing portable characters:"
    for char in $(echo "$portable" | fold -w1); do
        test_file="/tmp/test${char}file.txt"
        pathchk -p "$test_file" && echo "✓ '$char' is portable" || echo "✗ '$char' not portable"
    done

    echo "Testing non-portable characters:"
    for char in $(echo "$nonportable" | fold -w1); do
        test_file="/tmp/test${char}file.txt"
        pathchk -p "$test_file" && echo "✓ '$char' is portable" || echo "✗ '$char' not portable"
    done
}
```

### Integration with Other Tools

#### File System Analysis
```bash
# Find files with non-portable names
find / -type f -name '*[^a-zA-Z0-9._-]*' 2>/dev/null | head -20 | while read file; do
    echo "Non-portable filename: $file"
    pathchk -p "$file" 2>/dev/null || echo "  Validation failed"
done

# Check for overly long filenames
find / -type f -name '????????????????????????*' 2>/dev/null | while read file; do
    basename_file=$(basename "$file")
    if [ ${#basename_file} -gt 255 ]; then
        echo "Oversized filename: $file (${#basename_file} chars)"
    fi
done

# Validate directory structure
check_directory_structure() {
    local base_dir="$1"
    find "$base_dir" -type d | while read dir; do
        pathchk -p "$dir" || echo "Invalid directory: $dir"
    done
}
```

#### Backup and Archive Validation
```bash
# Validate paths before creating archive
validate_backup_paths() {
    local source_dir="$1"
    local exclude_patterns="$2"

    find "$source_dir" -type f | grep -v -E "$exclude_patterns" | while read file; do
        if ! pathchk -p "$file"; then
            echo "Non-portable file for backup: $file"
        fi
    done
}

# Check archive extraction paths
validate_extraction_paths() {
    local archive_list="$1"
    local target_dir="$2"

    while read -r archive_file; do
        full_path="${target_dir}/${archive_file}"
        pathchk -p "$full_path" || echo "Problematic extraction path: $full_path"
    done < "$archive_list"
}
```

## Integration and Automation

### Shell Scripts

#### Path Validation Script
```bash
#!/bin/bash
# Comprehensive path validation script

validate_paths() {
    local mode="${1:-standard}"  # standard, portable, strict
    local paths_file="$2"

    local pathchk_opts=""
    case "$mode" in
        "portable") pathchk_opts="-p" ;;
        "strict") pathchk_opts="-pP" ;;
        *) pathchk_opts="" ;;
    esac

    local valid_count=0
    local invalid_count=0

    while IFS= read -r path; do
        # Skip empty lines and comments
        [[ -z "$path" || "$path" =~ ^[[:space:]]*# ]] && continue

        if pathchk $pathchk_opts "$path" 2>/dev/null; then
            echo "✓ VALID: $path"
            ((valid_count++))
        else
            echo "✗ INVALID: $path"
            ((invalid_count++))
        fi
    done < "$paths_file"

    echo "Summary: $valid_count valid, $invalid_count invalid"
    return $invalid_count
}

# Usage examples
validate_paths "portable" "file_paths.txt"
validate_paths "strict" "critical_paths.txt"
```

#### File System Migration Helper
```bash
#!/bin/bash
# File system migration path validation

check_migration_readiness() {
    local source_dir="$1"
    local target_os="${2:-linux}"

    echo "Checking migration readiness for $target_os..."

    case "$target_os" in
        "posix"|"linux")
            pathchk_opts="-pP"
            ;;
        "windows")
            pathchk_opts="-p"
            echo "Warning: Additional Windows-specific checks needed"
            ;;
        *)
            pathchk_opts="-p"
            ;;
    esac

    # Check directory structure
    echo "Validating directory structure..."
    find "$source_dir" -type d | while read dir; do
        pathchk $pathchk_opts "$dir" 2>/dev/null || {
            echo "  Directory issue: $dir"
        }
    done

    # Check files
    echo "Validating files..."
    find "$source_dir" -type f | while read file; do
        pathchk $pathchk_opts "$file" 2>/dev/null || {
            echo "  File issue: $file"
        }
    done

    # Generate report
    echo "Migration readiness check completed."
    echo "Review issues above before proceeding with migration."
}
```

### Cron Jobs and Monitoring

#### Periodic Path Validation
```bash
#!/bin/bash
# Daily path validation for critical directories

LOG_FILE="/var/log/pathchk_validation.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Critical directories to validate
CRITICAL_DIRS=(
    "/etc"
    "/home"
    "/var/log"
    "/opt"
    "/usr/local"
)

echo "[$DATE] Starting path validation..." >> "$LOG_FILE"

for dir in "${CRITICAL_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "Checking $dir..." >> "$LOG_FILE"
        find "$dir" -maxdepth 2 | xargs pathchk -p 2>&1 | while read issue; do
            echo "[$DATE] ISSUE in $dir: $issue" >> "$LOG_FILE"
        done
    else
        echo "[$DATE] WARNING: Directory $dir does not exist" >> "$LOG_FILE"
    fi
done

echo "[$DATE] Path validation completed." >> "$LOG_FILE"
```

## Troubleshooting

### Common Issues

#### Path Length Problems
```bash
# Check system limits
getconf PATH_MAX
getconf NAME_MAX

# Find files approaching limits
find / -type f -exec bash -c 'f="$1"; [ ${#f} -gt 200 ] && echo "Long path: $f"' _ {} \;

# Check specific directory for long paths
find /usr/local/bin -type f -exec bash -c 'echo "$1: ${#1} chars"' _ {} \; | sort -k2 -nr
```

#### Character Encoding Issues
```bash
# Check for non-ASCII characters
find / -type f -name '*[![:print:][:space:]]*' 2>/dev/null | head -10

# Validate UTF-8 filenames
find / -type f -exec bash -c 'echo "$1" | grep -q "[^[:print:][:space:]]" && echo "Non-ASCII: $1"' _ {} \;

# Convert problematic filenames
find /tmp -name '*@*' -exec bash -c 'f="$1"; new=$(echo "$f" | tr "@" "_"); [ "$f" != "$new" ] && echo "Rename: $f -> $new"' _ {} \;
```

#### Permission-Related Issues
```bash
# Check searchable directories
find / -type d ! -executable 2>/dev/null | head -10

# Test path accessibility
test_path_accessibility() {
    local path="$1"
    local dir=$(dirname "$path")

    while [ "$dir" != "/" ]; do
        if [ ! -x "$dir" ]; then
            echo "Directory not searchable: $dir"
            return 1
        fi
        dir=$(dirname "$dir")
    done
    return 0
}
```

## Related Commands

- [`getconf`](/docs/commands/system-info/getconf) - Get system configuration values
- [`stat`](/docs/commands/file-management/stat) - Display file or file system status
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`basename`](/docs/commands/file-management/basename) - Strip directory and suffix from filenames
- [`dirname`](/docs/commands/file-management/dirname) - Strip non-directory suffix from file name
- [`realpath`](/docs/commands/file-management/realpath) - Return the canonicalized absolute pathname
- [`readlink`](/docs/commands/file-management/readlink) - Print resolved symbolic links or canonical file names

## Best Practices

1. **Always validate user-provided paths** before file operations to prevent errors
2. **Use `-p` option** for applications that need to work across different POSIX systems
3. **Use `-P` option** for maximum safety and strict validation requirements
4. **Check system limits** with `getconf` before processing large file structures
5. **Validate paths early** in scripts to fail fast and provide clear error messages
6. **Consider character encoding** when working with international file names
7. **Test path accessibility** along with validity for complete validation
8. **Use portable naming conventions** when creating new files for cross-platform compatibility

## Performance Tips

1. **Batch multiple paths** in a single `pathchk` call rather than individual calls
2. **Use with `find -exec`** and `+` syntax for efficient bulk processing
3. **Limit validation depth** for large directory structures using `find -maxdepth`
4. **Cache validation results** when repeatedly checking the same paths
5. **Parallelize validation** for independent path checks using `xargs -P`
6. **Skip validation** for system-generated paths when performance is critical
7. **Use appropriate options** - only enable strict checks when actually needed
8. **Consider filesystem-specific limits** when working with specialized file systems

The `pathchk` command is an essential tool for ensuring file path compatibility and validity across different systems and environments. Its ability to detect potential path-related issues before they cause problems makes it invaluable for system administrators, developers, and anyone working with file operations in cross-platform environments.