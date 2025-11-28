---
title: tree - Directory Tree Listing
sidebar_label: tree
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tree - Directory Tree Listing

The `tree` command is a powerful recursive directory listing program that produces depth-indented listings of files and directories in a visually appealing tree-like format. It transforms complex directory structures into clear, hierarchical representations that make it easy to understand the organization of file systems at a glance. Tree is particularly useful for documentation, project analysis, system administration, and when you need to quickly grasp the layout of unfamiliar directory structures. With extensive customization options for display formatting, filtering, and output formats, tree serves as an essential tool for visualizing and documenting file system hierarchies.

## Basic Syntax

```bash
tree [OPTIONS] [DIRECTORY...]
```

## General Options

### Display Control
- `-a, --all` - Show all files, including hidden files (starting with .)
- `-d, --dirs-only` - List directories only
- `-l, --level [LEVEL]` - Limit the depth of the directory tree
- `-f, --fullpath` - Print the full path prefix for each file
- `-F, --classify` - Append indicator (/,=,*,@,|,>) to entries
- `-i, --noreport` - Don't print the file and directory report at the end
- `--nolinks` - Don't print symbolic link targets
- `--inodes` - Print inode numbers for each file

### File Information
- `-p, --fileperms` - Print file permissions in octal and symbolic format
- `-u, --user` - Show file owner (UID or user name)
- `-g, --group` - Show file group (GID or group name)
- `-s, --size` - Print file size in bytes
- `-h, --human-readable` - Print file sizes in human readable format (K, M, G, T)
- `-D, --date` - Print last modification date for files
- `--si` - Use powers of 1000 instead of 1024 for human-readable sizes

### Sorting and Ordering
- `-t, --sort` - Sort output by last modification time
- `-r, --reverse` - Reverse sort order
- `-v, --version-sort` - Sort files alphabetically by version numbers
- `-U, --unsorted` - Do not sort; list in directory order
- `-c, --time [ctime|mtime|atime]` - Sort by timestamp type (default: mtime)

### Pattern Matching and Filtering
- `-P, --pattern [PATTERN]` - Show only files matching the pattern
- `-I, --ignore [PATTERN]` - Do not list files matching the pattern
- `--matchdirs` - Include directory names in pattern matching
- `--ignorecase` - Ignore case when pattern matching
- `--prune` - Prune empty directories from output
- `--filelimit [#]` - Do not descend directories with more than # files

### Output Formatting
- `-C, --color` - Colorize output (default when connected to tty)
- `--color=[always|never|auto]` - Control color output explicitly
- `-n, --no-color` - Turn off colorization
- `-q, --quote` - Quote filenames with double quotes
- `--charset=[charset]` - Use specific character set for tree graphics
- `--forcefile` - Force showing files when patterns match only directories

### Export Formats
- `-J, --json` - Output in JSON format
- `-X, --xml` - Output in XML format
- `-H, --html [base_href]` - Output in HTML format with base href
- `-o, --output [filename]` - Output to file instead of stdout
- `--fromfile` - Read paths from file (one per line)

### Graphics and Style
- `--treecharset=[charset]` - Set charset for tree drawing characters
- `--du` - Show disk usage for directories
- `-L, --level [depth]` - Set maximum display depth of directory tree
- `--dirsfirst` - List directories before files
- `--filelimit [#]` - Don't descend dirs with more than # files

## Usage Examples

### Basic Tree Operations

#### Simple Directory Listings
```bash
# List current directory tree
tree

# List specific directory
tree /home/user/documents

# List multiple directories
tree /etc /var /home

# Show only directories
tree -d

# Include hidden files and directories
tree -a
```

#### Depth Control and Navigation
```bash
# Limit depth to 3 levels
tree -L 3

# Show specific depth starting from root
tree -L 2 -d /usr

# Limit files per directory
tree --filelimit 50

# Show only up to 2 levels deep, directories only
tree -d -L 2

# Display system directory structure overview
tree -d -L 1 /
```

### File Information and Details

#### Comprehensive File Information
```bash
# Show file permissions and owner
tree -pug

# Display file sizes in human readable format
tree -h

# Show full path for each file
tree -f

# Show all details (permissions, owner, group, size, date)
tree -pughDs

# Display with file classification indicators
tree -F

# Show modification dates
tree -D
```

#### Advanced Information Display
```bash
# Show inode numbers with file info
tree --inodes -p

# Display disk usage for directories
tree --du -h

# Show files with both size and date
tree -hD

# Comprehensive information display
tree -pughfDs --si
```

### Pattern Matching and Filtering

#### Include/Exclude Patterns
```bash
# Show only Python files
tree -P "*.py"

# Exclude multiple patterns
tree -I "*.log|*.tmp|node_modules|.git"

# Show only source code files
tree -P "*.py|*.js|*.html|*.css|*.java|*.cpp"

# Include directories in pattern matching
tree -P "*.conf" --matchdirs

# Case-insensitive pattern matching
tree --ignorecase -P "*.jpg"

# Exclude backup and temporary files
tree -I "*~|*.bak|*.tmp|*.swp"
```

#### Complex Filtering Scenarios
```bash
# Show only configuration files
tree -P "*.conf|*.ini|*.cfg|*.yaml|*.yml|*.json" -f

# Project-specific filtering
tree -I 'node_modules|.git|coverage|dist|build|*.log|*.tmp'

# Show only media files
tree -P '*.jpg|*.jpeg|*.png|*.gif|*.mp3|*.mp4|*.avi'

# Exclude hidden files and directories
tree -I '.*'
```

### Sorting and Ordering

#### Time-based Sorting
```bash
# Sort by modification time (newest first)
tree -t

# Sort by modification time (oldest first)
tree -tr

# Sort by creation time
tree -c

# Sort by last access time
tree -c --time=atime
```

#### Version and Alphanumeric Sorting
```bash
# Version-aware sorting (1.10 comes after 1.9)
tree -v

# Reverse version sorting
tree -vr

# Unsorted (directory order)
tree -U

# Sort with directories first
tree --dirsfirst
```

### Output Formatting and Export

#### Color and Formatting Control
```bash
# Force color output even when redirecting
tree --color=always

# Disable all colors
tree -n

# Quote filenames with spaces
tree -q

# Custom character set for tree graphics
tree --charset=ASCII

# Use specific tree characters
tree --treecharset=ibm
```

#### Export to Different Formats
```bash
# Save to text file
tree -o directory_structure.txt

# Export to JSON format
tree -J -o structure.json

# Create HTML documentation with links
tree -H http://example.com/files -o tree.html

# Export to XML format
tree -X -o files.xml

# Generate colored output for ANSI terminal
tree --color=always > colored_tree.txt
```

#### HTML Output Customization
```bash
# HTML with custom base URL
tree -H /files -o index.html

# HTML with full paths and colors
tree -fH http://localhost/files --color=always -o files.html

# HTML showing only directories
tree -d -H / -o dirs.html
```

### Practical Usage Scenarios

#### Project Documentation
```bash
# Generate project overview (2 levels, directories only)
tree -d -L 2 -o project_overview.txt

# Create comprehensive project documentation
tree -h -I 'node_modules|.git|coverage|dist|build|*.log' > project_structure.txt

# Show source code organization
tree --noreport -I 'vendor|node_modules|.git' src/

# Create API documentation structure
tree -d -P 'api*' -L 3 -o api_structure.txt

# Project inventory with file sizes
tree -h --filelimit 100 project/ > project_inventory.txt
```

#### System Administration
```bash
# Show system directory structure
tree -d -L 1 /

# Display configuration directories
tree -d -L 2 /etc/

# Analyze log directory structure and sizes
tree -s -h /var/log/

# Show user home directory structures
tree -d -L 2 /home/

# Find large directories recursively
tree --du -h -d | sort -rh | head -20

# System service directories
tree -d -L 1 /etc/systemd /etc/init.d
```

#### File Analysis and Management
```bash
# Find large files in directory tree
tree -s -h | grep -E "\d+M|\d+G"

# Count files by extension
tree -f | grep -o '\.[^.]*$' | sort | uniq -c | sort -rn

# Show recently modified files
tree -t -r | head -20

# Analyze file permissions
tree -p | grep -E 'rwx|rw-'

# Find empty directories
tree -d --prune | grep -v '├──\|│   └──\|└──'

# Generate file inventory report
tree -hspugD -o file_inventory.txt
```

### Advanced Features

#### Complex Pattern Operations
```bash
# Show files modified in last 7 days (with find)
find . -mtime -7 -exec tree -P {} \;

# Multiple include patterns with directories
tree -P '*.py|*.js|*.java' --matchdirs -d

# Complex exclusion for development projects
tree -I '.git|node_modules|coverage|dist|build|*.log|*.tmp|*.cache|__pycache__'

# Show only executable files
tree -P '*' | tree -p | grep -E 'r-x|x'
```

#### Integration with System Tools
```bash
# Count total files and directories
tree | tail -1 | grep -o '\d* file\|director'

# Extract file paths for further processing
tree -fi | grep -v '^\.$' | sed 's/^[^│]*[│├─└] //'

# Find files with specific permissions
tree -p | grep 'rwxrwxrwx' | cut -d'[' -f2 | cut -d']' -f1

# Generate checksums for all files
tree -fi | grep -v '^\.$' | xargs sha256sum
```

#### Performance and Large Directory Handling
```bash
# Fast directory-only view
tree -d -L 2 --noreport

# Limit files per directory for performance
tree --filelimit 100 -L 3

# Prune empty directories for cleaner output
tree --prune

# Show only first level with file count
tree -L 1 --noreport
```

## Special Operations

#### Network and Remote Operations
```bash
# Generate directory structure for remote documentation
tree -H http://server.com/files -o remote_tree.html

# Create file manifest for transfers
tree -f --noreport -o file_manifest.txt

# Export structure for backup verification
tree -s -o backup_structure.txt
```

#### Automation and Scripting
```bash
# Monitor directory changes
watch -n 60 "tree -d -L 1 /path/to/monitor"

# Daily project structure snapshots
tree -h -o "structure_$(date +%Y%m%d).txt" project/

# Generate reports with timestamps
echo "Directory structure as of $(date)" > report.txt && tree -a >> report.txt
```

## Configuration and Customization

### Environment Variables
```bash
# Set default options
export TREE_OPTIONS="-a -I '.git|node_modules|*.pyc'"

# Set character set for tree graphics
export TREE_CHARSET="utf-8"

# Customize color scheme
export TREE_COLORS="di=01;34:fi=01;32:ex=01;31:ln=01;36"
```

### Configuration File
```bash
# Create ~/.treerc for persistent settings
echo "-a -I '.git|node_modules|*.log|*.tmp' --color=auto" > ~/.treerc

# Project-specific configuration
echo "-I 'coverage|dist|build' --noreport" > project/.treerc
```

### Color Customization
```bash
# Custom color scheme
TREE_COLORS="di=01;34:fi=00:ex=01;31:ln=01;36:or=01;33:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:tw=01;05:ow=01;05" tree

# Disable colors for scripts
tree -n
```

## Integration and Automation

### Shell Script Examples

#### Automated Project Documentation
```bash
#!/bin/bash
# Generate comprehensive project documentation

PROJECT_DIR="$1"
OUTPUT_DIR="docs"
DATE=$(date +%Y%m%d_%H%M%S)

if [ -z "$PROJECT_DIR" ]; then
    echo "Usage: $0 <project_directory>"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Generate different views
tree -d -L 2 "$PROJECT_DIR" > "$OUTPUT_DIR/directory_overview_$DATE.txt"
tree -h -I 'node_modules|.git|coverage|dist|build|*.log' "$PROJECT_DIR" > "$OUTPUT_DIR/full_structure_$DATE.txt"
tree -P '*.py|*.js|*.java|*.cpp' "$PROJECT_DIR" > "$OUTPUT_DIR/source_files_$DATE.txt"
tree -J "$PROJECT_DIR" > "$OUTPUT_DIR/structure_$DATE.json"

echo "Documentation generated in $OUTPUT_DIR/"
```

#### System Monitoring Script
```bash
#!/bin/bash
# Monitor directory structure changes

MONITOR_DIR="/var/log"
INTERVAL=300  # 5 minutes

while true; do
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    tree -d -L 1 "$MONITOR_DIR" > "/tmp/monitor_$TIMESTAMP.txt"
    echo "[$TIMESTAMP] Directory structure saved"
    sleep $INTERVAL
done
```

#### File Classification Script
```bash
#!/bin/bash
# Classify and organize files by type

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

echo "=== Image Files ==="
tree -P '*.jpg|*.jpeg|*.png|*.gif|*.bmp|*.svg' "$TARGET_DIR"

echo -e "\n=== Document Files ==="
tree -P '*.pdf|*.doc|*.docx|*.txt|*.rtf|*.odt' "$TARGET_DIR"

echo -e "\n=== Video Files ==="
tree -P '*.mp4|*.avi|*.mkv|*.mov|*.wmv|*.flv' "$TARGET_DIR"

echo -e "\n=== Audio Files ==="
tree -P '*.mp3|*.wav|*.flac|*.aac|*.ogg' "$TARGET_DIR"
```

## Troubleshooting

### Common Issues

#### Performance Problems
```bash
# Large directories causing slowdown
# Solution: Limit depth and file count
tree -L 3 --filelimit 50 /very/large/directory

# Too many files in output
# Solution: Use directories-only view
tree -d

# Memory issues with very deep trees
# Solution: Prune empty directories and limit depth
tree --prune -L 2
```

#### Display Issues
```bash
# Tree graphics not displaying correctly
# Solution: Force ASCII characters
tree --charset=ASCII

# Colors not working in terminal
# Solution: Explicitly enable/disable colors
tree --color=always
tree --color=never

# Special characters in filenames
# Solution: Quote filenames
tree -q
```

#### Permission Issues
```bash
# Permission denied errors cluttering output
# Solution: Redirect errors or use sudo appropriately
tree 2>/dev/null
sudo tree /root/directory

# Symbolic links causing infinite loops
# Solution: Don't follow symbolic links
tree --nolinks
```

### Advanced Troubleshooting

#### Memory and Resource Usage
```bash
# Monitor memory usage during tree generation
/usr/bin/time -v tree /large/directory

# Use find for very large directories where tree is slow
find /directory -type d -printf "%d %p\n" | sort -n | cut -d' ' -f2-

# Progressive tree building for massive directories
for depth in {1..5}; do
    echo "Level $depth:"
    tree -L $depth -d | grep -E '^[^│]'
done
```

## Related Commands

- [`ls`](/docs/commands/file-management/ls) - List directory contents with various options
- [`find`](/docs/commands/file-management/find) - Search for files and directories with complex criteria
- [`du`](/docs/commands/file-management/du) - Show disk usage summary for files and directories
- [`ncdu`](/docs/commands/file-management/ncdu) - Interactive disk usage analyzer with curses interface
- [`dirtree`](/docs/commands/file-management/dirtree) - Alternative directory tree visualization tool
- [`fd`](/docs/commands/file-management/fd) - Modern find alternative with user-friendly syntax
- [`exa`](/docs/commands/file-management/exa) - Modern replacement for ls with tree view
- [`bfs`](/docs/commands/file-management/bfs) - Breadth-first directory traversal tool

## Best Practices

1. **Use depth limiting** for large directories to avoid overwhelming output:
   - `tree -L 3` for project overviews
   - `tree -L 1` for high-level summaries

2. **Filter output strategically** to focus on relevant information:
   - `tree -I 'node_modules|.git|coverage|dist'` for development projects
   - `tree -a` when you need to see hidden files
   - `tree -d` for directory-only views

3. **Choose appropriate display options** based on your needs:
   - `tree -h` for human-readable file sizes
   - `tree -pug` for permission and ownership information
   - `tree -D` for modification dates

4. **Export to appropriate formats** for documentation and sharing:
   - `tree -J` for JSON output for programmatic processing
   - `tree -H` for HTML documentation with clickable links
   - `tree -o filename.txt` for saving to files

5. **Use color strategically** for better readability:
   - `tree --color=auto` for automatic color detection
   - `tree --color=never` when redirecting to files
   - Custom `TREE_COLORS` for personalized color schemes

6. **Consider performance implications** with large directory trees:
   - Use `--filelimit` to limit processing in directories with many files
   - Use `--prune` to remove empty directories from output
   - Consider `find` as an alternative for very complex searches

7. **Leverage pattern matching** for focused analysis:
   - `tree -P` for including specific patterns
   - `tree -I` for excluding unwanted files
   - Combine patterns for complex filtering

8. **Use version-aware sorting** for software and versioned content:
   - `tree -v` for proper version number ordering
   - `tree -t` for time-based analysis
   - `tree --dirsfirst` for directory-prioritized views

## Performance Tips

1. **Limit depth early** with `-L` to avoid processing unnecessary levels
2. **Use file count limits** with `--filelimit` to skip directories with too many files
3. **Exclude large directories** with `-I` patterns like `node_modules`, `.git`, or `__pycache__`
4. **Directories-only mode** with `-d` is significantly faster than full listings
5. **Disable file stat calls** by not using `-p`, `-s`, `-u`, `-g` when not needed
6. **Use ASCII charset** with `--charset=ASCII` for faster rendering in terminals
7. **Redirect stderr** with `2>/dev/null` to suppress permission errors
8. **Consider `find`** for very large or complex searches requiring advanced filtering

The `tree` command is an indispensable tool for visualizing and understanding file system structures. Its combination of intuitive visual output, extensive customization options, and multiple export formats makes it perfect for documentation, analysis, and system administration tasks. From quick directory overviews to comprehensive project documentation, tree provides the clarity and detail needed to effectively navigate and understand complex file hierarchies.