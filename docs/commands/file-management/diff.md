---
title: diff - Show File Differences
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# diff - Show File Differences

The `diff` command compares files line by line and displays the differences between them. It's essential for version control, configuration management, and comparing text files to identify changes, additions, and deletions.

## Basic Syntax

```bash
diff [OPTIONS] FILE1 FILE2
diff [OPTIONS] -r DIR1 DIR2
```

## Common Options

### Output Format
- `-u, -U NUM, --unified[=NUM]` - Output NUM (default 3) lines of unified context
- `-c, -C NUM, --context[=NUM]` - Output NUM (default 3) lines of copied context
- `-e, --ed` - Output an ed script
- `-n, --rcs` - Output RCS format
- `-y, --side-by-side` - Output in two columns
- `-t, --expand-tabs` - Expand tabs to spaces in output

### Display Options
- `--normal` - Output a normal diff (default)
- `--brief` - Report only when files differ
- `-q, --brief` - Report only when files differ
- `-i, --ignore-case` - Ignore case differences
- `-w, --ignore-all-space` - Ignore all white space
- `-B, --ignore-blank-lines` - Ignore changes where lines are all blank
`

### Behavior Options
- `-r, --recursive` - Recursively compare subdirectories
- `-N, --new-file` - Treat absent files as empty
- `-a, --text` - Treat all files as text
- `--suppress-common-lines` - Do not output common lines

### Speed and Memory
- `-H, --speed-large-files` - Assume large files and many scattered small changes
- `--from-file=FILE1` - Compare FILE1 to all operands
- `--to-file=FILE2` - Compare all operands to FILE2

## Output Formats

### Normal Format
```
$ diff file1.txt file2.txt
- 2,3c2,3
< Line 2 from file1
< Line 3 from file1
---
> Line 2 from file2
> Line 3 from file2
```

### Unified Format (Recommended)
```
$ diff -u file1.txt file2.txt
--- file1.txt   2023-12-01 10:00:00
+++ file2.txt   2023-12-01 10:30:00
@@ -1,4 +1,4 @@
 Line 1
-Line 2 from file1
+Line 2 from file2
 Line 3
-Line 4 from file1
+Line 4 from file2
```

### Context Format
```
$ diff -c file1.txt file2.txt
*** file1.txt   2023-12-01 10:00:00
--- file2.txt   2023-12-01 10:30:00
***************
*** 1,4 ****
  Line 1
! Line 2 from file1
  Line 3
! Line 4 from file1
--- 1,4 ----
  Line 1
! Line 2 from file2
  Line 3
! Line 4 from file2
```

### Side-by-Side Format
```
$ diff -y file1.txt file2.txt
Line 1                       Line 1
Line 2 from file1            | Line 2 from file2
Line 3                       Line 3
Line 4 from file1            | Line 4 from file2
```

## Usage Examples

### Basic Comparisons
```bash
# Compare two files
diff file1.txt file2.txt

# Brief comparison (just show if different)
diff -q file1.txt file2.txt

# Unified format (most readable)
diff -u file1.txt file2.txt

# Context format
diff -c file1.txt file2.txt
```

### Directory Comparisons
```bash
# Compare directories recursively
diff -r dir1/ dir2/

# Show which files differ
diff -rq dir1/ dir2/

# Treat new files as empty
diff -rN dir1/ dir2/
```

### Ignoring Differences
```bash
# Ignore case differences
diff -i file1.txt file2.txt

# Ignore whitespace changes
diff -w file1.txt file2.txt

# Ignore blank lines
diff -B file1.txt file2.txt

# Combine multiple ignore options
diff -i -w -B file1.txt file2.txt
```

## Practical Examples

### Configuration File Management
```bash
# Compare backup configurations
diff /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Check for changes in system configuration
diff -u /etc/fstab /etc/fstab.new

# Safe configuration update
cp /etc/hosts /etc/hosts.bak
# Edit /etc/hosts
diff -u /etc/hosts.bak /etc/hosts
```

### Code Review
```bash
# Compare code versions
diff -u original.py modified.py > changes.patch

# Side-by-side comparison for review
diff -y -W 120 old_version.c new_version.c

# Brief check for any differences
diff -q source.c backup.c
```

### Log File Analysis
```bash
# Compare log files for differences
diff /var/log/syslog.1 /var/log/syslog

# Show only different lines (suppress common lines)
diff --suppress-common-lines log1.txt log2.txt

# Compare logs ignoring timestamps
diff -w <(cut -d' ' -f4- log1) <(cut -d' ' -f4- log2)
```

## Advanced Usage

### Creating Patches
```bash
# Create patch file
diff -u original.c modified.c > fix.patch

# Create patch for directory changes
diff -ruN original_dir/ modified_dir/ > update.patch

# Create patch with context
diff -c -P original.txt modified.txt > context.patch
```

### Applying Patches (with patch command)
```bash
# Apply unified patch
patch -p1 < changes.patch

# Apply patch to multiple files
patch -p0 < directory_changes.patch

# Dry run (see what would be applied)
patch --dry-run -p1 < changes.patch
```

### Complex Comparisons
```bash
# Compare with process substitution
diff <(command1) <(command2)

# Compare command output
diff <(ls -la) <(find . -maxdepth 1 -exec ls -ld {} +)

# Compare filtered content
diff <(grep -v "^#" config1) <(grep -v "^#" config2)
```

### Directory Analysis
```bash
# List files that exist in one directory but not the other
diff -rq dir1 dir2 | grep "Only in"

# Show file differences in subdirectories
find dir1 -name "*.py" -exec diff -q {} dir2/{} \;

# Compare file sizes in directories
diff <(ls -l dir1) <(ls -l dir2)
```

## Scripting Examples

### Automated Backup Verification
```bash
#!/bin/bash
# verify_backups.sh - Check if files differ from backups

SOURCE_DIR="/etc/configs"
BACKUP_DIR="/backups/configs"

for file in "$SOURCE_DIR"/*; do
    filename=$(basename "$file")
    backup_file="$BACKUP_DIR/$filename"

    if [ -f "$backup_file" ]; then
        if ! diff -q "$file" "$backup_file" > /dev/null; then
            echo "CHANGED: $filename differs from backup"
        fi
    else
        echo "NEW: $filename has no backup"
    fi
done
```

### Configuration Sync Script
```bash
#!/bin/bash
# sync_configs.sh - Generate patches for configuration changes

CONFIG_DIR="/etc/configs"
TEMPLATE_DIR="/etc/templates"

for config in "$CONFIG_DIR"/*; do
    filename=$(basename "$config")
    template="$TEMPLATE_DIR/$filename"

    if [ -f "$template" ]; then
        if ! diff -q "$config" "$template" > /dev/null; then
            echo "=== Changes in $filename ==="
            diff -u "$template" "$config"
            echo
        fi
    fi
done
```

### File Integrity Check
```bash
#!/bin/bash
# check_integrity.sh - Compare files against checksums

for file in *; do
    if [ -f "$file" ]; then
        current_hash=$(md5sum "$file" | cut -d' ' -f1)
        stored_hash=$(grep "$file" checksums.txt 2>/dev/null | cut -d' ' -f2)

        if [ "$current_hash" != "$stored_hash" ]; then
            echo "MODIFIED: $file"
        fi
    fi
done
```

## Special Cases

### Binary Files
```bash
# Binary file comparison
diff file1.exe file2.exe
# Output: Binary files file1.exe and file2.exe differ

# Force text comparison (may be garbage)
diff -a file1.exe file2.exe
```

### Large Files
```bash
# Efficient comparison of large files
diff -q large_file1.txt large_file2.txt

# Show first few differences
diff -q large1.txt large2.txt || head -n 50 <(diff large1.txt large2.txt)
```

### Files with Special Characters
```bash
# Files with spaces or special characters
diff "file with spaces.txt" "another file.txt"

# Use -- to separate options from filenames
diff -u -- -special-filename normal-file
```

## Integration with Other Tools

### Version Control
```bash
# Git diff uses diff internally
git diff file.txt

# Show changes in unified format
git diff --unified=10 file.txt

# Ignore whitespace in git diff
git diff --ignore-space-change file.txt
```

### File Monitoring
```bash
# Monitor file changes in real-time
watch -n 5 'diff -q current.txt backup.txt || echo "FILE CHANGED"'

# Compare file snapshots
cp file.txt snapshot.txt
# Make changes
diff -u snapshot.txt file.txt
```

## Related Commands

- [`patch`](/docs/commands/file-management/patch) - Apply diff patches
- [`cmp`](/docs/commands/file-management/cmp) - Compare files byte by byte
- [`diff3`](/docs/commands/file-management/diff3) - Three-way file comparison
- [`sdiff`](/docs/commands/file-management/sdiff) - Side-by-side merge of files
- [`vimdiff`](/docs/commands/text-processing/vimdiff) - Visual file comparison in Vim

## Best Practices

1. **Use unified format** for most comparisons:
   - `diff -u` is most readable and patchable

2. **Check if files differ first**:
   - `diff -q` for quick comparison
   - Use full diff only if needed

3. **Handle whitespace carefully**:
   - `-w` to ignore all whitespace
   - `-B` to ignore blank lines

4. **Create patches** for changes:
   - `diff -u` creates standard patch format
   - Essential for version control

5. **Use process substitution** for dynamic comparisons:
   - `diff <(command1) <(command2)`

6. **Be careful with binary files**:
   - Default diff shows they differ
   - Use `-a` to force text comparison

The `diff` command is fundamental for text comparison, version control, and change management. Understanding its various output formats and options is essential for effective file comparison and patch management in Linux environments.