---
title: tree - Directory Tree Listing
sidebar_label: tree
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tree - Directory Tree Listing

The `tree` command is a recursive directory listing program that produces a depth-indented listing of files and directories. It displays the contents of directories in a tree-like format, making it easy to visualize the hierarchical structure of file systems.

## Basic Syntax

```bash
tree [OPTIONS] [DIRECTORY]
```

## Common Options

### Display Options
- `-a, --all` - Show all files, including hidden files (starting with .)
- `-d, --dirs-only` - List directories only
- `-l, --level` - Limit the depth of the directory tree
- `-f, --fullpath` - Print the full path prefix for each file
- `-i, --noreport` - Don't print the file and directory report at the end
- `-q, --quote` - Quote filenames with double quotes
- `-p, --fileperms` - Print file permissions
- `-u, --user` - Show file owner
- `-g, --group` - Show file group
- `-s, --size` - Print file size in bytes
- `-h, --human-readable` - Print file sizes in human readable format (K, M, G)

### Output Options
- `-C, --color` - Colorize output (default when connected to tty)
- `-n, --no-color` - Turn off colorization
- `-x, --nolinks` - Don't print indentation lines
- `-t, --sort` - Sort output by modification time
- `-r, --reverse` - Reverse sort order
- `-v, --version-sort` - Sort files alphabetically by version

### Pattern Matching
- `PATTERN` - Show only files matching the pattern
- `-I PATTERN` - Do not list files matching the pattern
- `--matchdirs` - Include directory names in pattern matching
- `--ignorecase` - Ignore case when pattern matching

### Output Format
- `-J, --json` - Output in JSON format
- `-X, --xml` - Output in XML format
- `-H, --html` - Output in HTML format
- `-o FILENAME` - Output to file instead of stdout

## Usage Examples

### Basic Usage
```bash
# List current directory tree
tree

# List specific directory
tree /home/user/documents

# List with limited depth (2 levels deep)
tree -L 2

# Show all files including hidden
tree -a

# Show only directories
tree -d
```

### Detailed Information
```bash
# Show file permissions and owner
tree -pug

# Show file sizes in human readable format
tree -h

# Show full path for each file
tree -f

# Show all details (permissions, owner, group, size)
tree -pughs

# Sort by modification time
tree -t
```

### Pattern Matching and Filtering
```bash
# Show only files matching pattern
tree -P "*.py"

# Exclude files matching pattern
tree -I "*.log"

# Multiple patterns
tree -P "*.js|*.html|*.css"

# Ignore case in patterns
tree --ignorecase -P "*.jpg"

# Show only directories matching pattern
tree -d -P "src*"
```

### Output Options
```bash
# Disable color output
tree -n

# Save output to file
tree -o directory_structure.txt

# Output in JSON format
tree -J

# Output in HTML format
tree -H . -o tree.html

# Print without indentation lines
tree -x
```

## Output Format

### Basic Tree Structure
```
.
├── documents/
│   ├── report.pdf
│   ├── notes.txt
│   └── presentations/
│       ├── slides.pptx
│       └── images/
│           └── logo.png
├── downloads/
│   ├── software.deb
│   └── images.zip
├── music/
│   ├── rock/
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   └── classical/
│       └── symphony.mp3
└── README.md

4 directories, 10 files
```

### Detailed Output
```
.
├── [drwxr-xr-x user   user   4096] documents/
│   ├── [-rw-r--r-- user   user   12.4K] report.pdf
│   ├── [-rw-r--r-- user   user    156] notes.txt
│   └── [drwxr-xr-x user   user   4096] presentations/
│       ├── [-rw-r--r-- user   user   25.6K] slides.pptx
│       └── [drwxr-xr-x user   user   4096] images/
│           └── [-rw-r--r-- user   user   45.2K] logo.png
├── [drwxr-xr-x user   user   4096] downloads/
│   ├── [-rw-r--r-- user   user   15.7M] software.deb
│   └── [-rw-r--r-- user   user   128.9M] images.zip
└── [-rw-r--r-- user   user    2.1K] README.md

5 directories, 6 files
```

## Practical Examples

### Project Documentation
```bash
# Create project overview
tree -d -L 2 project/

# Generate project documentation
tree -h -I 'node_modules|*.log|.git' > project_structure.txt

# Show source code structure
tree --noreport -I 'coverage|dist|build' src/
```

### System Analysis
```bash
# Show system directory structure
tree -d -L 1 /

# Show configuration directories
tree -d -L 2 /etc/

# Analyze log directory
tree -s -h /var/log/
```

### File Management
```bash
# Find large files in directory tree
tree -s -h | grep -E "\d+M|\d+G"

# Count files by type
tree -f | grep -o '\.[^.]*$' | sort | uniq -c

# Show recently modified files
tree -t -r | head -20
```

## Advanced Features

### Custom Patterns
```bash
# Complex pattern matching
tree -P '*.py|*.js|*.html|*.css' --matchdirs

# Exclude multiple patterns
tree -I 'node_modules|.git|coverage|dist|*.log'

# Show only specific file types
tree -P '*.jpg' -o image_files.txt
```

### Export Formats
```bash
# Generate JSON for programmatic use
tree -J -o directory_structure.json

# Create HTML documentation
tree -H http://example.com/files -o files.html

# XML output for data exchange
tree -X -o files.xml
```

### Integration with Other Tools
```bash
# Count total files and directories
tree | tail -1

# Find files with specific permissions
tree -p | grep 'rwxrwxrwx'

# Combine with find for complex searches
tree -f | grep -E '\.(js|py)$' | cut -d' ' -f2
```

## Configuration

### Default Settings
The `tree` command can be configured with environment variables:
- `TREE_CHARSET` - Set character set for tree graphics
- `TREE_COLORS` - Customize color schemes
- `LC_COLLATE` - Control sort order

### Configuration File
Some versions support configuration files:
```bash
# ~/.treerc
# Custom default options
-a -I '.git|node_modules|*.pyc' --color=auto
```

## Related Commands

- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`du`](/docs/commands/file-management/du) - Show disk usage
- [`ncdu`](/docs/commands/file-management/ncdu) - Interactive disk usage analyzer
- [`dirtree`](/docs/commands/file-management/dirtree) - Alternative directory tree tool

## Best Practices

1. **Use depth limiting** for large directories:
   - `tree -L 3` to avoid overwhelming output

2. **Filter output** to focus on relevant files:
   - `tree -I 'node_modules|.git'` for project directories

3. **Save complex output** to files for analysis:
   - `tree -o structure.txt` for documentation

4. **Use human-readable sizes** for better readability:
   - `tree -h` instead of raw byte counts

5. **Combine with other tools** for advanced analysis:
   - Use with `grep` to filter specific file types

6. **Consider using `find`** for very large directory trees:
   - `find` may be more efficient for complex searches

The `tree` command is excellent for quickly understanding directory structure and creating visual documentation of file hierarchies. Its customizable output and filtering options make it a valuable tool for system administrators, developers, and users who need to explore and document file system structures.