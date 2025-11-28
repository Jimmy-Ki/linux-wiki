---
title: patch - Apply diff file to original
sidebar_label: patch
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# patch - Apply diff file to original

The `patch` command takes a patch file containing a difference listing (produced by the `diff` program) and applies those differences to an original set of files. It's a fundamental tool in software development and version control systems, allowing developers to share and apply changes to source code files efficiently. Patch supports various diff formats and provides sophisticated handling of context, fuzzy matching, and conflict resolution. The command is essential for distributing bug fixes, updates, and modifications across multiple versions of software projects.

## Basic Syntax

```bash
patch [OPTIONS] [ORIGFILE [PATCHFILE]]
```

## Common Options

### Basic Operations
- `-pNUM` - Strip NUM leading components from file names
- `-i FILE` - Read patch from FILE instead of stdin
- `-d DIR` - Change directory to DIR first
- `-b` - Back up the original files
- `-B PREFIX` - Prepend PREFIX to backup file names

### Output and Verbosity
- `-v, --verbose` - Output verbose information
- `-s, --quiet, --silent` - Work silently unless errors occur
- `--dry-run` - Don't actually apply the patch
- `--reject-format=FORMAT` - Format of rejected hunks

### Patch Application Control
- `-R, --reverse` - Assume the patch was created with the old and new files swapped
- `-N, --forward` - Ignore patches that seem to be reversed or already applied
- `-f, --force` - Assume patches are never reversed

### Backup and Recovery
- `-c, --context` - Interpret the patch file as a context diff
- `-u, --unified` - Interpret the patch file as a unified diff
- `-n, --normal` - Interpret the patch file as a normal diff

### Fuzzy Matching
- `-F LINES` - Set the maximum fuzz factor
- `--fuzz=LINES` - Same as -F LINES
- `--ignore-whitespace` - Ignore whitespace differences
- `--reject` - Reject hunks that overlap

## Usage Examples

### Basic Patch Operations

#### Applying Simple Patches
```bash
# Apply patch from stdin (most common usage)
patch < changes.patch

# Apply patch from specific file
patch -i updates.patch

# Apply patch to specific file
patch source.c < source.c.patch

# Apply patch and backup original files
patch -b < changes.patch

# Apply patch with custom backup prefix
patch -B .orig < changes.patch
```

#### Directory and Path Handling
```bash
# Strip leading directory components from patch paths
patch -p1 < changes.patch
patch -p2 < changes.patch
patch -p0 < changes.patch

# Change to directory before applying patch
patch -d /usr/src/linux < kernel.patch

# Apply patch in specific directory
cd /usr/src/linux && patch -p1 < ../patches/bugfix.patch
```

### Advanced Patch Application

#### Different Patch Formats
```bash
# Apply context diff
patch -c < context_changes.patch

# Apply unified diff (default for most modern patches)
patch -u < unified_changes.patch

# Apply normal diff
patch -n < normal_changes.patch

# Let patch detect the format automatically
patch < mixed_format.patch
```

#### Reversing and Testing Patches
```bash
# Reverse a patch (undo changes)
patch -R < changes.patch

# Test patch application without modifying files
patch --dry-run < changes.patch

# Apply patch ignoring if it seems reversed
patch -N < changes.patch

# Force application assuming patch is correct direction
patch -f < changes.patch
```

### Fuzzy Matching and Error Handling

#### Handling Imperfect Matches
```bash
# Allow fuzzy matching with default fuzz factor
patch < fuzzy.patch

# Set custom fuzz factor (default is 2)
patch -F 3 < fuzzy.patch

# Ignore whitespace differences
patch --ignore-whitespace < whitespace.patch

# Reject conflicting hunks instead of fuzzy matching
patch --reject < conflict.patch
```

#### Backup and Recovery
```bash
# Create backup files with .orig extension
patch -b < changes.patch

# Create backups with custom prefix
patch -B .backup < changes.patch

# Create backups with custom suffix
patch --suffix=.backup < changes.patch

# Keep rejects in separate files
patch --reject < problem.patch
```

## Practical Examples

### Software Development

#### Applying Open Source Patches
```bash
# Download and apply a patch from a project
wget https://example.com/bugfix.patch
patch -p1 < bugfix.patch

# Apply multiple patches in sequence
for patch in patches/*.patch; do
    echo "Applying $patch..."
    patch -p1 < "$patch"
done

# Apply patch and verify it worked
patch -p1 < fix.patch
git status
git diff
```

#### Kernel Patching
```bash
# Apply kernel patches
cd /usr/src/linux
patch -p1 < ../patches/security-fix.patch

# Apply patches with backup
patch -p1 -b < ../patches/driver-update.patch

# Test patch before applying to critical system
patch -p1 --dry-run < ../patches/critical-fix.patch
```

#### Package Maintenance
```bash
# Apply Debian-style patches
cd package-source
for patch in debian/patches/*.patch; do
    patch -p1 < "$patch"
done

# Apply patches with proper backup and logging
patch -p1 -b --verbose < update.patch 2>&1 | tee patch.log

# Reverse all applied patches
for patch in $(ls -r debian/patches/*.patch); do
    patch -p1 -R < "$patch"
done
```

### System Administration

#### Configuration Management
```bash
# Apply configuration changes
cd /etc
patch -p0 < config_updates.patch

# Backup original configs before patching
patch -p0 -B .$(date +%Y%m%d) < security_config.patch

# Apply patch to multiple config files
find /etc -name "*.conf" -exec patch -b {} \;
```

#### Log and Data File Updates
```bash
# Apply patches to log files
patch -b /var/log/app.log < log_update.patch

# Apply data patches with precision
patch --ignore-whitespace < data_corrections.patch

# Batch patch multiple similar files
for file in data_*.txt; do
    patch "$file" < template.patch
done
```

### Development Workflow

#### Code Review Integration
```bash
# Create and apply review patches
git diff > review_changes.patch
patch -p1 < review_changes.patch

# Test patches before committing
patch -p1 --dry-run < feature.patch
if [ $? -eq 0 ]; then
    patch -p1 < feature.patch
    git add .
    git commit -m "Apply feature patch"
fi

# Apply patches with conflict resolution
patch -p1 --reject < feature.patch
# Manually resolve .rej files
```

#### Automated Build Systems
```bash
# Script for applying patches in build process
#!/bin/bash
apply_patches() {
    local patch_dir="$1"
    local strip_level="${2:-1}"

    for patch_file in "$patch_dir"/*.patch; do
        if [ -f "$patch_file" ]; then
            echo "Applying $(basename "$patch_file")..."
            if patch -p"$strip_level" < "$patch_file"; then
                echo "Successfully applied $patch_file"
            else
                echo "Failed to apply $patch_file" >&2
                return 1
            fi
        fi
    done
}

# Usage in build script
apply_patches "patches/bugfixes" 1
apply_patches "patches/features" 0
```

## Advanced Usage

### Complex Patch Scenarios

#### Multiple File Patches
```bash
# Apply patch affecting multiple files
patch -p1 < multi_file_update.patch

# Apply patch with specific file matching
patch -p1 -i big.patch source.c

# Handle patches with renamed files
patch -p1 < file_rename.patch

# Apply patch to files in different directories
find . -name "*.c" -exec patch {} < template.patch \;
```

#### Patch Validation and Testing
```bash
# Validate patch format
patch --dry-run < suspicious.patch

# Check patch applicability
if patch -p1 --dry-run < test.patch 2>/dev/null; then
    echo "Patch can be applied cleanly"
else
    echo "Patch will have conflicts"
fi

# Verbose patch application for debugging
patch -p1 --verbose < debug.patch

# Apply patch with custom reject format
patch --reject-format=unified < problematic.patch
```

### Batch Processing and Automation

#### Automated Patch Application
```bash
# Apply all patches from a directory
apply_all_patches() {
    local patch_dir="$1"
    local success_count=0
    local fail_count=0

    for patch in "$patch_dir"/*.patch; do
        echo "Processing $(basename "$patch")..."
        if patch -p1 < "$patch"; then
            ((success_count++))
        else
            ((fail_count++))
            echo "Failed: $patch" >&2
        fi
    done

    echo "Summary: $success_count succeeded, $fail_count failed"
}

# Recursive patch application
patch_recursive() {
    find . -name "*.patch" -print0 | while IFS= read -r -d '' patch; do
        echo "Applying $patch..."
        patch -p1 < "$patch"
    done
}
```

#### Patch Management Scripts
```bash
#!/bin/bash
# Comprehensive patch management system

PATCH_DIR="/var/patches"
BACKUP_DIR="/var/backups"
LOG_FILE="/var/log/patch.log"

apply_managed_patch() {
    local patch_file="$1"
    local target_dir="$2"
    local strip_level="${3:-1}"

    # Create backup
    local backup_name="$(basename "$patch_file" .patch)_$(date +%Y%m%d_%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"

    echo "[$(date)] Applying $patch_file to $target_dir" | tee -a "$LOG_FILE"

    # Apply patch with comprehensive logging
    if (cd "$target_dir" && patch -p"$strip_level" -b --verbose < "$patch_file") 2>&1 | tee -a "$LOG_FILE"; then
        echo "[$(date)] Successfully applied $patch_file" | tee -a "$LOG_FILE"
        return 0
    else
        echo "[$(date)] Failed to apply $patch_file" | tee -a "$LOG_FILE"
        return 1
    fi
}
```

## Integration and Automation

### Shell Scripts

#### Patch Testing Script
```bash
#!/bin/bash
# Test patches before applying to production

test_patch() {
    local patch_file="$1"
    local source_dir="$2"
    local strip_level="${3:-1}"

    echo "Testing patch: $patch_file"
    echo "Target directory: $source_dir"
    echo "Strip level: $strip_level"

    # Create temporary copy for testing
    local test_dir=$(mktemp -d)
    cp -r "$source_dir"/* "$test_dir/"

    # Test patch application
    if (cd "$test_dir" && patch -p"$strip_level" --dry-run < "$patch_file"); then
        echo "✓ Patch applies cleanly"
        rm -rf "$test_dir"
        return 0
    else
        echo "✗ Patch has conflicts"
        rm -rf "$test_dir"
        return 1
    fi
}

# Usage
test_patch security_fix.patch /usr/src/app 1
```

#### Patch Rollback Script
```bash
#!/bin/bash
# Rollback applied patches using backup files

rollback_patch() {
    local target_dir="$1"
    local backup_suffix="${2:-.orig}"

    echo "Rolling back patches in $target_dir"

    find "$target_dir" -name "*$backup_suffix" | while read backup_file; do
        local original_file="${backup_file%$backup_suffix}"
        echo "Restoring $original_file from $backup_file"
        mv "$backup_file" "$original_file"
    done

    # Remove reject files
    find "$target_dir" -name "*.rej" -delete
    echo "Rollback completed"
}
```

## Troubleshooting

### Common Issues

#### Patch Application Failures
```bash
# Check patch file format
file suspicious.patch
head -20 suspicious.patch

# Test patch with different strip levels
for level in 0 1 2 3; do
    echo "Testing strip level $level:"
    patch -p$level --dry-run < problematic.patch
    echo "---"
done

# Apply patch with increased fuzz factor
patch -F 5 < fuzzy_match.patch

# Check file permissions before patching
ls -la target_file
chmod u+w target_file
patch < changes.patch
```

#### Path and Directory Issues
```bash
# Debug path stripping
patch -p0 --dry-run < patch_with_paths.patch
patch -p1 --dry-run < patch_with_paths.patch
patch -p2 --dry-run < patch_with_paths.patch

# Show what files patch will modify
patch -p1 --dry-run --verbose < multi_file.patch

# Check current directory context
pwd
find . -name "source_file.c"

# Apply patch from correct directory
cd correct/source/directory
patch < ../../patches/fix.patch
```

#### Whitespace and Encoding Issues
```bash
# Handle different line endings
dos2unix patch_file.patch
patch < patch_file.patch

# Ignore whitespace in patches
patch --ignore-whitespace < space_issues.patch

# Check for hidden characters
hexdump -C suspicious.patch | head -20

# Normalize patch file
tr -d '\r' < patch_file.patch > normalized.patch
patch < normalized.patch
```

### Patch Creation Issues

#### Creating Better Patches
```bash
# Create unified diff (recommended)
diff -u original_file modified_file > fix.patch

# Create context diff
diff -c original_file modified_file > fix.patch

# Create recursive patch for directories
diff -ur original_dir modified_dir > directory.patch

# Create patch with proper function context
diff -up original_file modified_file > function_aware.patch

# Ignore whitespace when creating patches
diff -uw original_file modified_file > whitespace_ignoring.patch
```

## Related Commands

- [`diff`](/docs/commands/file-management/diff) - Compare files line by line
- [`diff3`](/docs/commands/file-management/diff3) - Three-way file comparison
- [`cmp`](/docs/commands/file-management/cmp) - Byte-by-byte file comparison
- [`comm`](/docs/commands/file-management/comm) - Compare sorted files line by line
- [`sdiff`](/docs/commands/file-management/sdiff) - Side-by-side merge of file differences
- [`git apply`](/docs/commands/development/git) - Apply a patch to files and/or to the index
- [`quilt`](/docs/commands/development/quilt) - Tool for managing series of patches

## Best Practices

1. **Always test patches** with `--dry-run` before applying to important files
2. **Use appropriate strip levels** (-p0, -p1, -p2) based on how the patch was created
3. **Create backups** (-b or -B) when applying patches to critical files
4. **Check patch format** (unified, context, normal) and specify with -u, -c, -n if needed
5. **Use verbose mode** (-v) during complex patch operations for better debugging
6. **Manage rejected hunks** carefully and resolve conflicts manually
7. **Document patch applications** in production environments
8. **Use source control** (git) alongside patch for better change tracking
9. **Validate patches** from untrusted sources before application
10. **Test patches on copies** of files before applying to originals

## Performance Tips

1. **Unified diffs** (-u) are generally more reliable and efficient than context diffs
2. **Higher fuzz factors** can help with patches from slightly different versions
3. **Batch operations** are more efficient than applying many small patches individually
4. **Directory-level patches** (diff -ur) are more efficient than individual file patches
5. **Memory usage** is minimal; patch works well on very large files
6. **Strip level -p1** is most common for patches created with relative paths
7. **--dry-run** adds minimal overhead and should always be used for testing
8. **Patch processing** is CPU-bound rather than I/O-bound in most cases

The `patch` command remains an essential tool for software development, system administration, and file modification management. Its sophisticated handling of file differences, robust error recovery, and extensive configuration options make it invaluable for applying changes across multiple files and systems while maintaining data integrity and providing detailed feedback throughout the process.