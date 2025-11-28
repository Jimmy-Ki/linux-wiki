---
title: readlink - Read Symbolic Link Target
sidebar_label: readlink
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# readlink - Read Symbolic Link Target

The `readlink` command resolves symbolic links and prints the target file or directory. It's an essential tool for understanding link structures, debugging broken links, working with file system paths where symbolic links are involved, and canonicalizing file paths. The command is particularly useful for system administration, script development, and file system analysis where symbolic links are extensively used for flexibility and organization.

## Basic Syntax

```bash
readlink [OPTIONS] FILE...
```

## Common Options

### Path Resolution Options
- `-f, --canonicalize` - Canonicalize by following every symlink in every component of the given name recursively, all components must exist
- `-e, --canonicalize-existing` - Canonicalize by following every symlink in every component of the given name recursively, all components must exist
- `-m, --canonicalize-missing` - Canonicalize by following every symlink in every component of the given name recursively, without requirements on components existence

### Output Format Options
- `-n, --no-newline` - Do not output the trailing newline
- `-z, --zero` - Separate output filenames with NUL characters instead of newlines

### Error Handling Options
- `-q, --quiet` - Suppress most error messages
- `-s, --silent` - Suppress most error messages (alias for --quiet)
- `-v, --verbose` - Report error messages

### Help and Version
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Symbolic Link Resolution

#### Simple Link Reading
```bash
# Read symbolic link target
readlink symlink.txt

# Multiple links in one command
readlink link1.txt link2.txt link3.txt

# Quiet mode (suppress errors for non-links)
readlink -q not_a_link.txt
```

#### Getting Link Information
```bash
# Create and read a symbolic link
ln -s /path/to/target.txt link.txt
readlink link.txt

# Show link with verbose output
readlink -v link.txt

# Read link without trailing newline (useful in scripts)
readlink -n link.txt
```

### Path Canonicalization

#### Full Path Resolution
```bash
# Fully canonicalize path (follow all links recursively)
readlink -f /path/to/symlink

# Get absolute path of current directory
readlink -f .

# Get absolute path of relative file
readlink -f relative/path/file.txt

# Resolve parent directory
readlink -f ../other_directory
```

#### Existence-Based Resolution
```bash
# Canonicalize only if all components exist
readlink -e /path/to/possibly/broken/link

# Test if link and target exist
if readlink -e symlink.txt > /dev/null; then
    echo "Link and target exist"
else
    echo "Link or target doesn't exist"
fi
```

#### Resolution Without Existence Checks
```bash
# Canonicalize without checking if components exist
readlink -m /path/to/any/link

# Useful for building paths that will be created later
readlink -m /tmp/new_directory/future_file.txt
```

## Advanced Operations

### Complex Link Chain Resolution

#### Multi-Level Symbolic Links
```bash
# Create chain of symbolic links
ln -s actual_target.txt target.txt
ln -s target.txt link1.txt
ln -s link1.txt link2.txt
ln -s link2.txt final_link.txt

# Read immediate target
readlink final_link.txt
# Output: link2.txt

# Resolve complete chain
readlink -f final_link.txt
# Output: /full/path/to/actual_target.txt
```

#### Relative vs Absolute Links
```bash
# Create relative symbolic link
ln -s ../data/config.txt ./config_link.txt

# Resolve to absolute path
readlink -f ./config_link.txt

# Create absolute symbolic link
ln -s /etc/hosts ./hosts_link.txt
readlink ./hosts_link.txt
```

### Link Validation and Analysis

#### Checking Link Validity
```bash
# Check if link is broken
if readlink -e broken_link.txt > /dev/null; then
    echo "Link points to existing file"
else
    echo "Broken link or doesn't exist"
fi

# Find all broken links in directory
find . -type l ! -exec readlink -e {} \; -print

# Count broken vs valid links
echo "Valid links:"
find . -type l -exec readlink -e {} \; | wc -l

echo "Broken links:"
find . -type l ! -exec readlink -e {} \; | wc -l
```

#### Link Analysis Script
```bash
#!/bin/bash
# analyze_links.sh - Analyze symbolic links in directory structure

echo "=== Symbolic Link Analysis ==="
echo "Directory: $(pwd)"
echo

total_links=0
valid_links=0
broken_links=0

while IFS= read -r -d '' link; do
    ((total_links++))
    target=$(readlink "$link" 2>/dev/null)

    if [ $? -eq 0 ]; then
        if [ -e "$(readlink -f "$link" 2>/dev/null)" ]; then
            ((valid_links++))
            echo "✓ $link -> $target"
        else
            ((broken_links++))
            echo "✗ $link -> $target (BROKEN)"
        fi
    else
        ((broken_links++))
        echo "✗ $link (UNREADABLE)"
    fi
done < <(find . -type l -print0)

echo
echo "Summary:"
echo "  Total links: $total_links"
echo "  Valid links: $valid_links"
echo "  Broken links: $broken_links"
```

### Script Integration

#### Path Resolution in Scripts
```bash
#!/bin/bash
# script_path_resolution.sh - Demonstrate readlink in scripts

# Get real path of script directory
SCRIPT_DIR=$(readlink -f "$(dirname "$0")")
echo "Script directory: $SCRIPT_DIR"

# Get absolute path of configuration file
CONFIG_FILE=$(readlink -f "$SCRIPT_DIR/../config/app.conf")
echo "Configuration file: $CONFIG_FILE"

# Resolve data directory path
DATA_DIR=$(readlink -f "$SCRIPT_DIR/../data")
echo "Data directory: $DATA_DIR"
```

#### Link Management Script
```bash
#!/bin/bash
# link_manager.sh - Manage symbolic links

create_link() {
    local target="$1"
    local link_name="$2"

    if [ -L "$link_name" ]; then
        echo "Warning: $link_name already exists as a symlink"
        echo "Current target: $(readlink "$link_name")"
        read -p "Replace? (y/n): " replace
        [[ "$replace" =~ ^[Yy]$ ]] || return 1
        rm "$link_name"
    fi

    ln -s "$target" "$link_name"
    echo "Created: $link_name -> $target"
}

verify_links() {
    local directory="$1"

    echo "Verifying links in: $directory"
    find "$directory" -type l | while read -r link; do
        target=$(readlink "$link")
        if readlink -e "$link" > /dev/null 2>&1; then
            echo "✓ $link -> $target"
        else
            echo "✗ $link -> $target (BROKEN)"
        fi
    done
}
```

## System Administration Applications

### System Binary Resolution

#### Finding Real Binary Locations
```bash
# Find where system binaries are actually located
echo "Python location: $(readlink -f $(which python))"
echo "Sh location: $(readlink -f /bin/sh)"
echo "Vi location: $(readlink -f $(which vi))"

# Check what /bin/sh actually points to
readlink -f /bin/sh
# Common outputs: /bin/bash, /bin/dash, /bin/zsh

# Analyze command alternatives
for cmd in python python3 java node; do
    if command -v "$cmd" >/dev/null 2>&1; then
        real_path=$(readlink -f "$(which "$cmd")")
        echo "$cmd: $real_path"
    fi
done
```

### Shared Library Management

#### Library Link Analysis
```bash
# Find real location of shared libraries
readlink -f /usr/lib/lib.so
readlink -f /lib/x86_64-linux-gnu/libc.so.6

# Analyze library version links
find /usr/lib -name "lib*.so*" -type l | head -10 | while read -r lib_link; do
    target=$(readlink "$lib_link")
    real_target=$(readlink -f "$lib_link")
    echo "$lib_link -> $target ($real_target)"
done
```

### Configuration Management

#### Configuration File Resolution
```bash
# Resolve configuration file paths
resolve_config() {
    local config_name="$1"
    local config_paths=(
        "/etc/$config_name"
        "$HOME/.$config_name"
        "$HOME/.config/$config_name/config"
    )

    for path in "${config_paths[@]}"; do
        if [ -L "$path" ]; then
            echo "Found link: $path -> $(readlink -f "$path")"
        elif [ -f "$path" ]; then
            echo "Found file: $path"
        fi
    done
}

resolve_config "vimrc"
resolve_config "bashrc"
```

## File System Analysis

### Comprehensive Link Auditing

#### Link Structure Analysis
```bash
#!/bin/bash
# link_auditor.sh - Comprehensive symbolic link analysis

audit_directory() {
    local dir="$1"
    local report_file="link_audit_$(date +%Y%m%d_%H%M%S).txt"

    {
        echo "=== Symbolic Link Audit Report ==="
        echo "Directory: $(readlink -f "$dir")"
        echo "Date: $(date)"
        echo "==================================="
        echo

        # Total statistics
        total_links=$(find "$dir" -type l | wc -l)
        echo "Total symbolic links: $total_links"
        echo

        # Broken links
        echo "=== Broken Links ==="
        find "$dir" -type l ! -exec readlink -e {} \; -print 2>/dev/null | while read -r link; do
            echo "BROKEN: $link -> $(readlink "$link" 2>/dev/null || echo 'UNREADABLE')"
        done
        echo

        # Links pointing outside directory
        echo "=== External Links ==="
        find "$dir" -type l -exec sh -c '
            link="$1"
            target=$(readlink -f "$link" 2>/dev/null)
            if [[ "$target" != "'"$dir"'"* ]]; then
                echo "EXTERNAL: $link -> $target"
            fi
        ' _ {} \;
        echo

        # Circular links detection
        echo "=== Potential Circular Links ==="
        find "$dir" -type l -exec sh -c '
            link="$1"
            target=$(readlink -m "$link" 2>/dev/null)
            if [[ "$target" == *"$(readlink -f "$dir")"* ]]; then
                echo "CIRCULAR: $link -> $target"
            fi
        ' _ {} \;

    } | tee "$report_file"

    echo "Report saved to: $report_file"
}

# Run audit on current directory
audit_directory "."
```

#### Link Depth Analysis
```bash
# Analyze symbolic link depth
analyze_link_depth() {
    local max_depth=0
    local deep_links=()

    while IFS= read -r -d '' link; do
        depth=0
        current="$link"

        # Follow link chain
        while [ -L "$current" ]; do
            ((depth++))
            target=$(readlink "$current")

            # Handle relative paths
            if [[ "$target" != /* ]]; then
                current="$(dirname "$current")/$target"
            else
                current="$target"
            fi

            # Prevent infinite loops
            if [ $depth -gt 50 ]; then
                echo "Warning: Possible circular link: $link"
                break
            fi
        done

        if [ $depth -gt $max_depth ]; then
            max_depth=$depth
            deep_links=("$link")
        elif [ $depth -eq $max_depth ]; then
            deep_links+=("$link")
        fi

    done < <(find . -type l -print0)

    echo "Maximum link depth: $max_depth"
    echo "Links with maximum depth:"
    printf '  %s\n' "${deep_links[@]}"
}

analyze_link_depth
```

## Performance Optimization

### Efficient Link Processing

#### Batch Link Resolution
```bash
# Process multiple links efficiently
process_links_batch() {
    local link_list="$1"

    # Use xargs for parallel processing
    xargs -P 4 -I {} readlink -f {} < "$link_list"

    # Alternative: Process with NUL separator for safety
    find . -type l -print0 | xargs -0 -P 4 -I {} readlink -f {}
}
```

#### Memory-Efficient Link Analysis
```bash
# Memory-efficient analysis for large directory trees
efficient_link_analysis() {
    local directory="$1"

    # Process links one at a time to avoid memory issues
    find "$directory" -type l | while read -r link; do
        if target=$(readlink -f "$link" 2>/dev/null); then
            echo "VALID:$link:$target"
        else
            echo "BROKEN:$link:$(readlink "$link" 2>/dev/null || echo 'UNREADABLE')"
        fi
    done
}
```

## Integration with Other Commands

### Combining with Find

#### Advanced Link Searching
```bash
# Find links by target pattern
find . -type l -exec sh -c '
    for link; do
        target=$(readlink "$link" 2>/dev/null)
        case "$target" in
            *.txt|*.md) echo "Text link: $link -> $target" ;;
            *.sh|*.py|*.pl) echo "Script link: $link -> $target" ;;
            /etc/*) echo "Config link: $link -> $target" ;;
        esac
    done
' _ {} +

# Find links by size of target
find . -type l -exec sh -c '
    for link; do
        if target_path=$(readlink -f "$link" 2>/dev/null); then
            if [ -f "$target_path" ]; then
                size=$(stat -f%z "$target_path" 2>/dev/null || stat -c%s "$target_path" 2>/dev/null)
                if [ "$size" -gt 1048576 ]; then  # > 1MB
                    echo "Large file link: $link -> $target_path (${size} bytes)"
                fi
            fi
        fi
    done
' _ {} +
```

### Combining with Stat

#### Detailed Link Information
```bash
# Get comprehensive link information
detailed_link_info() {
    local link="$1"

    echo "=== Link Information: $link ==="

    if [ -L "$link" ]; then
        echo "Type: Symbolic Link"
        echo "Link target: $(readlink "$link")"
        echo "Canonical path: $(readlink -f "$link" 2>/dev/null || echo 'BROKEN')"

        if [ -e "$link" ]; then
            echo "Target exists: YES"
            echo "Target type: $(stat -c%F "$(readlink -f "$link")" 2>/dev/null)"
            echo "Target size: $(stat -c%s "$(readlink -f "$link")" 2>/dev/null) bytes"
        else
            echo "Target exists: NO"
        fi

        echo "Link permissions: $(stat -c%A "$link")"
        echo "Link owner: $(stat -c%U "$link"):$(stat -c%G "$link")"
        echo "Link modified: $(stat -c%y "$link")"
    else
        echo "Not a symbolic link"
    fi
}

detailed_link_info "example_link"
```

## Automation and Scripting

### Link Maintenance Scripts

#### Automated Link Cleanup
```bash
#!/bin/bash
# cleanup_broken_links.sh - Find and optionally remove broken links

DRY_RUN=true
LOG_FILE="cleanup_broken_links_$(date +%Y%m%d_%H%M%S).log"

cleanup_broken_links() {
    local directory="$1"
    local count=0

    echo "Starting broken link cleanup in: $directory" | tee "$LOG_FILE"

    while IFS= read -r -d '' broken_link; do
        ((count++))
        target=$(readlink "$broken_link" 2>/dev/null || echo "UNREADABLE")

        echo "Broken link #$count: $broken_link -> $target" | tee -a "$LOG_FILE"

        if [ "$DRY_RUN" = false ]; then
            echo "Removing: $broken_link" | tee -a "$LOG_FILE"
            rm "$broken_link"
            if [ $? -eq 0 ]; then
                echo "✓ Removed successfully" | tee -a "$LOG_FILE"
            else
                echo "✗ Failed to remove" | tee -a "$LOG_FILE"
            fi
        else
            echo "[DRY RUN] Would remove: $broken_link" | tee -a "$LOG_FILE"
        fi
    done < <(find "$directory" -type l ! -exec readlink -e {} \; -print0)

    echo "Cleanup complete. Found $count broken links." | tee -a "$LOG_FILE"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --execute)
            DRY_RUN=false
            shift
            ;;
        --directory)
            DIRECTORY="$2"
            shift 2
            ;;
        *)
            echo "Usage: $0 [--execute] [--directory PATH]"
            echo "  --execute    Actually remove broken links (default: dry run)"
            echo "  --directory  Directory to clean (default: current directory)"
            exit 1
            ;;
    esac
done

cleanup_broken_links "${DIRECTORY:-.}"
```

#### Link Backup and Restore
```bash
#!/bin/bash
# backup_links.sh - Backup and restore symbolic link structure

backup_links() {
    local directory="$1"
    local backup_file="links_backup_$(date +%Y%m%d_%H%M%S).txt"

    echo "Creating link backup: $backup_file"

    find "$directory" -type l | while read -r link; do
        target=$(readlink "$link")
        relative_path=$(realpath --relative-to="$directory" "$link")
        echo "$relative_path|$target"
    done > "$backup_file"

    echo "Backup complete: $backup_file"
}

restore_links() {
    local backup_file="$1"
    local base_dir="${2:-$(pwd)}"

    echo "Restoring links from: $backup_file"

    while IFS='|' read -r relative_link target; do
        link_path="$base_dir/$relative_link"
        link_dir=$(dirname "$link_path")

        # Create directory if it doesn't exist
        mkdir -p "$link_dir"

        # Create symbolic link
        if ln -s "$target" "$link_path" 2>/dev/null; then
            echo "Restored: $relative_link -> $target"
        else
            echo "Failed: $relative_link -> $target"
        fi
    done < "$backup_file"
}

# Usage examples
# backup_links "/path/to/directory"
# restore_links "links_backup_20231201_120000.txt" "/path/to/restore/directory"
```

## Troubleshooting

### Common Issues and Solutions

#### Handling Circular Links
```bash
# Detect circular symbolic links
detect_circular_links() {
    local max_iterations=50

    find . -type l | while read -r link; do
        visited=()
        current="$link"
        iterations=0

        while [ -L "$current" ] && [ $iterations -lt $max_iterations ]; do
            if [[ " ${visited[*]} " =~ " ${current} " ]]; then
                echo "Circular link detected: $link"
                echo "  Path: ${visited[*]} -> $current"
                break
            fi

            visited+=("$current")
            target=$(readlink "$current")

            # Resolve relative path
            if [[ "$target" != /* ]]; then
                current="$(dirname "$current")/$target"
            else
                current="$target"
            fi

            ((iterations++))
        done

        if [ $iterations -eq $max_iterations ]; then
            echo "Possible circular link (max iterations): $link"
        fi
    done
}

detect_circular_links
```

#### Resolving Permission Issues
```bash
# Handle permission-related link problems
check_link_permissions() {
    local link="$1"

    echo "Checking permissions for: $link"

    # Check if link itself is readable
    if [ ! -r "$link" ]; then
        echo "  ✗ Link is not readable"
        ls -ld "$link"

        # Try with sudo if available
        if command -v sudo >/dev/null 2>&1; then
            echo "  Trying with sudo:"
            sudo readlink "$link"
        fi
    fi

    # Check if target path components are accessible
    if target=$(readlink "$link" 2>/dev/null); then
        echo "  Link target: $target"

        # Check directory accessibility
        current_dir="$(dirname "$link")"
        while [ "$current_dir" != "/" ]; do
            if [ ! -x "$current_dir" ]; then
                echo "  ✗ Cannot access directory: $current_dir"
            fi
            current_dir="$(dirname "$current_dir")"
        done
    fi
}

check_link_permissions "problematic_link"
```

#### Dealing with Special Characters
```bash
# Handle links with special characters
handle_special_chars() {
    # Use NUL-separated output for safety
    find . -type l -print0 | while IFS= read -r -d '' link; do
        # Handle whitespace and special characters properly
        target=$(readlink "$link")
        canonical=$(readlink -f "$link")

        printf 'Link: "%s"\n' "$link"
        printf 'Target: "%s"\n' "$target"
        printf 'Canonical: "%s"\n\n' "$canonical"
    done
}

handle_special_chars
```

## Best Practices

### Link Management Best Practices

1. **Use absolute paths for critical links**:
   - Prevents issues when the link or its parent directories are moved
   - Ensures reliable operation across different working directories

2. **Validate links before use in scripts**:
   - Always check if links resolve to existing targets
   - Use error handling for broken links

3. **Use canonicalization for path comparison**:
   - `readlink -f` provides consistent absolute paths
   - Essential for comparing file locations reliably

4. **Document link structures**:
   - Maintain documentation of important symbolic links
   - Use consistent naming conventions

5. **Regular maintenance**:
   - Periodically check for broken links
   - Update links when file systems are reorganized

6. **Security considerations**:
   - Be aware of link-based attacks (link following)
   - Validate link targets in security-sensitive applications

### Performance Optimization Tips

1. **Use NUL-separated output for processing**:
   - `-print0` with find and `-0` with xargs handles filenames with special characters
   - Prevents parsing issues with whitespace and special characters

2. **Batch process links when possible**:
   - Use xargs for parallel processing of multiple links
   - Reduces overhead of repeated command executions

3. **Cache canonical paths**:
   - Store resolved paths when used multiple times
   - Avoids repeated resolution of the same links

4. **Limit search scope**:
   - Specify directory depth when analyzing large file systems
   - Use appropriate find criteria to reduce search space

## Related Commands

- [`ln`](/docs/commands/file-management/ln) - Create symbolic and hard links
- [`find`](/docs/commands/file-management/find) - Find files and directories with advanced criteria
- [`realpath`](/docs/commands/file-management/realpath) - Get real path of files (alternative to readlink -f)
- [`ls`](/docs/commands/file-management/ls) - List directory contents with link indicators
- [`stat`](/docs/commands/file-management/stat) - Display detailed file or filesystem status
- [`symlinks`](/docs/commands/file-management/symlinks) - Find and report symbolic links (where available)
- [`file`](/docs/commands/file-management/file) - Determine file type including symbolic links
- [`pathchk`](/docs/commands/file-management/pathchk) - Check path names for portability

The `readlink` command is an indispensable tool for working with symbolic links in Linux environments. Its ability to resolve link chains, canonicalize paths, and validate link integrity makes it essential for system administration, script development, and file system analysis. Whether you're debugging broken links, creating portable scripts, or analyzing complex file system structures, `readlink` provides the functionality needed to work effectively with symbolic links.