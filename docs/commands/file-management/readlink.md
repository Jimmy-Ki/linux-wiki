---
title: readlink - Read Symbolic Link Target
sidebar_label: readlink
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# readlink - Read Symbolic Link Target

The `readlink` command resolves symbolic links and prints the target file or directory. It's essential for understanding link structures, debugging broken links, and working with file system paths where symbolic links are involved.

## Basic Syntax

```bash
readlink [OPTIONS] FILE...
```

## Common Options

### Display Options
- `-f, --canonicalize` - Canonicalize by following every symlink in every component
- `-e, --canonicalize-existing` - Canonicalize by following every symlink in every component, all components must exist
- `-m, --canonicalize-missing` - Canonicalize by following every symlink in every component, without requirements on components existence
- `-n, --no-newline` - Do not output the trailing newline

### Quiet Mode
- `-q, --quiet` - Suppress most error messages
- `-s, --silent` - Suppress most error messages

### Help and Version
- `-v, --verbose` - Report error messages
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Symbolic Link Resolution
```bash
# Read symbolic link target
readlink symlink.txt

# Multiple links
readlink link1 link2 link3

# Quiet mode (no errors for non-links)
readlink -q not_a_link.txt
```

### Canonicalization
```bash
# Fully canonicalize path (follow all links)
readlink -f /path/to/symlink

# Canonicalize only if all components exist
readlink -e /path/to/possibly/broken/link

# Canonicalize without existence checks
readlink -m /path/to/any/link
```

### Working Directory Resolution
```bash
# Get absolute path of current directory
readlink -f .

# Get absolute path of file
readlink -f relative/path/file.txt

# Resolve parent directory
readlink -f ../other_directory
```

## Practical Examples

### Checking Link Validity
```bash
# Check if link is broken
if readlink -e symlink.txt > /dev/null; then
    echo "Link points to existing file"
else
    echo "Broken link"
fi

# Find all broken links
find . -type l ! -exec readlink -e {} \; -print
```

### Path Resolution
```bash
# Get real path of script directory
SCRIPT_DIR=$(readlink -f "$(dirname "$0")")

# Get absolute path of configuration file
CONFIG_PATH=$(readlink -f ./config.yml)

# Resolve relative to absolute paths
readlink -f ../../some/file.txt
```

### System Administration
```bash
# Find where system binaries are located
readlink -f $(which python)

# Check what /bin/sh actually points to
readlink -f /bin/sh

# Find real location of shared libraries
readlink -f /usr/lib/lib.so
```

## Advanced Usage

### Complex Path Resolution
```bash
# Resolve chain of symbolic links
ln -s target.txt link1.txt
ln -s link1.txt link2.txt
readlink -f link2.txt  # Returns absolute path to target.txt

# Resolve relative symbolic links
ln -s ../target.txt link.txt
readlink -f link.txt  # Returns absolute path
```

### Scripting with Links
```bash
#!/bin/bash
# resolve_links.sh - Resolve all symbolic links in directory

for item in *; do
    if [ -L "$item" ]; then
        target=$(readlink -f "$item")
        echo "Link: $item -> $target"

        if [ ! -e "$target" ]; then
            echo "  WARNING: Broken link"
        fi
    fi
done
```

### File System Analysis
```bash
# Find all symbolic links and their targets
find . -type l -exec readlink -f {} + | sort | uniq -c

# Show link chains
find . -type l -exec sh -c 'echo "$1 -> $(readlink -f "$1")"' _ {} \;

# Check for circular links
find . -type l -exec sh -c '
    target=$(readlink -m "$1")
    if [ "$target" = "$1" ] || echo "$target" | grep -q "$(pwd)"; then
        echo "Potential circular link: $1"
    fi
' _ {} \;
```

## Special Cases

### Handling Broken Links
```bash
# Show broken links only
find . -type l ! -exec readlink -e {} \; -print

# Check specific link
if ! readlink -e broken_link > /dev/null 2>&1; then
    echo "Link is broken or doesn't exist"
fi

# Show what broken link points to
readlink broken_link  # Shows target path even if it doesn't exist
```

### Multiple Link Resolution
```bash
# Resolve multiple links in one command
readlink -f /usr/bin/vi /usr/bin/python /bin/sh

# Process list of files
cat file_list.txt | while read file; do
    echo "$file -> $(readlink -f "$file" 2>/dev/null || echo 'NOT A LINK')"
done
```

### Working with Directories
```bash
# Get real path of current working directory
readlink -f .

# Resolve parent directory through links
readlink -f ..

# Find real location of current script
SCRIPT_PATH=$(readlink -f "$0")
```

## Troubleshooting

### Common Issues
```bash
# Operation not permitted (privilege issues)
sudo readlink -f /root/some_link

# Too many levels of symbolic links (circular reference)
readlink -f circular_link

# File doesn't exist
readlink non_existent_link
```

### Debugging Link Chains
```bash
# Show each step of resolution
readlink -v link.txt

# Follow links manually
current="link.txt"
while [ -L "$current" ]; do
    echo "$current -> $(readlink "$current")"
    current=$(readlink "$current")
done
```

## Related Commands

- [`ln`](/docs/commands/file-management/ln) - Create symbolic links
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`realpath`](/docs/commands/file-management/realpath) - Get real path of file
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`stat`](/docs/commands/file-management/stat) - Display file status

## Best Practices

1. **Use `-f` for absolute path resolution**:
   - `readlink -f` gives canonical absolute paths

2. **Check link validity before using**:
   - Use `-e` to ensure all components exist

3. **Handle broken links gracefully**:
   - Check exit codes and use error handling

4. **Use in scripts for path resolution**:
   - Perfect for getting absolute paths of scripts and resources

5. **Be careful with recursive links**:
   - May create infinite loops if not handled properly

6. **Use with find for bulk operations**:
   - `find . -type l -exec readlink -f {} +`

7. **Consider using realpath** for newer systems:
   - `realpath` is often more intuitive for simple path resolution

The `readlink` command is essential for working with symbolic links and understanding file system structure. Its ability to resolve link chains and provide absolute paths makes it invaluable for system administration, script writing, and debugging file system issues in Linux environments.