---
title: ls - List Directory Contents
sidebar_label: ls
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ls - List Directory Contents

The `ls` command lists directory contents, displaying files and subdirectories in the specified directory. It's one of the most frequently used commands in Linux for browsing file systems.

## Basic Syntax

```bash
ls [OPTIONS] [DIRECTORY...]
```

## Common Options

### Display Options
- `-a, --all` - Show all files, including hidden files (starting with .)
- `-l` - Use long listing format with detailed information
- `-h, --human-readable` - Show file sizes in human-readable format (K, M, G)
- `-r, --reverse` - Reverse order while sorting
- `-t` - Sort by modification time (newest first)
- `-S` - Sort by file size (largest first)
- `-X` - Sort alphabetically by file extension
- `-R, --recursive` - List subdirectories recursively

### Color and Formatting
- `--color=auto` - Colorize output (default in many distributions)
- `-1` - List one file per line
- `-m` - Separate entries with commas

## Usage Examples

### Basic Directory Listing
```bash
# List current directory contents
ls

# List specific directory
ls /home/user/documents
```

### Show Hidden Files
```bash
# List all files including hidden ones
ls -la

# List only hidden files
ls -d .*
```

### Detailed Information
```bash
# Long format with human-readable sizes
ls -lh

# Long format with all files
ls -la

# Sort by modification time
ls -lt

# Sort by file size
ls -lS
```

### Sorting and Filtering
```bash
# Reverse alphabetical order
ls -r

# List files by extension
ls -X

# Recursive listing
ls -R

# Multiple directories
ls /var/log /tmp
```

### Combination Examples
```bash
# Show all files in long format, sorted by size, largest first
ls -laS

# Show all files with human-readable sizes, sorted by time
ls -lath

# Recursive listing of hidden files only
ls -laR | grep '^\.'
```

## Output Format

The basic `ls` output shows:
- **Regular files** - Just the filename
- **Directories** - Filenames in color (usually blue) or with `/` suffix when using `-F`
- **Executable files** - Filenames in color (usually green) or with `*` suffix when using `-F`
- **Symbolic links** - Filenames in color (usually cyan) or with `@` suffix when using `-F`

### Long Format (`ls -l`) Columns:
1. **File type and permissions** (10 characters)
2. **Number of hard links**
3. **Owner username**
4. **Group name**
5. **File size in bytes**
6. **Last modification date/time**
7. **Filename**

## Related Commands

- [`pwd`](/docs/commands/file-management/pwd) - Print working directory
- [`cd`](/docs/commands/file-management/cd) - Change directory
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`tree`](/docs/commands/file-management/tree) - Display directory structure in tree format
- [`stat`](/docs/commands/file-management/stat) - Display detailed file information

## Tips

1. **Create useful aliases**:
   ```bash
   alias ll='ls -la'      # Long format with hidden files
   alias la='ls -A'       # Almost all files (exclude . and ..)
   alias lt='ls -ltr'     # Long format, sorted by time, reverse
   ```

2. **Combine with other commands**:
   ```bash
   ls -la | grep '\.log$'  # List log files only
   ls -la | wc -l          # Count files in directory
   ```

3. **Use with wildcards**:
   ```bash
   ls *.txt               # List all .txt files
   ls file?.*             # List files with 5-character names
   ```

## Common Use Cases

- **Quick directory overview**: `ls`
- **Detailed file information**: `ls -lh`
- **Finding recently modified files**: `ls -lt`
- **Checking file permissions**: `ls -l`
- **Listing hidden configuration files**: `ls -la`

The `ls` command is fundamental for Linux system navigation and file management. Mastering its various options will significantly improve your command-line efficiency.