---
title: pwd - Print Working Directory
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pwd - Print Working Directory

The `pwd` command prints the full pathname of the current working directory. It's essential for understanding your current location in the filesystem hierarchy.

## Basic Syntax

```bash
pwd [OPTIONS]
```

## Common Options

- `-L, --logical` - Use PWD from environment, even if it contains symlinks (default)
- `-P, --physical` - Avoid all symlinks, print actual physical path

## Usage Examples

### Basic Usage
```bash
# Print current working directory
pwd

# Current directory example output:
# /home/user/projects/myapp

# Root directory
pwd
# /
```

### Logical vs Physical Paths
```bash
# Navigate through symbolic link
cd /usr/local/bin  # Might be a symlink to /opt/bin

# Logical path (default)
pwd -L
# /usr/local/bin

# Physical path (resolves symlinks)
pwd -P
# /opt/bin
```

### Environment Variable
```bash
# Display PWD environment variable
echo $PWD

# PWD and pwd usually show the same
pwd
echo $PWD
```

## Practical Examples

### Script Usage
```bash
#!/bin/bash
# Get script's directory
SCRIPT_DIR=$(pwd)
echo "Running from: $SCRIPT_DIR"

# Get script's actual directory (resolves symlinks)
REAL_DIR=$(pwd -P)
echo "Actual location: $REAL_DIR"
```

### File Operations
```bash
# Save current directory
CURRENT_DIR=$(pwd)

# Navigate somewhere else
cd /tmp

# Create file with full path
touch "$CURRENT_DIR/backup_file.txt"

# Return to original directory
cd "$CURRENT_DIR"
```

### Directory Comparison
```bash
# Check if we're in a specific directory
if [ "$(pwd)" = "/home/user/projects" ]; then
    echo "You're in the projects directory"
fi

# Check if we're under home directory
if [[ $(pwd) == /home/user/* ]]; then
    echo "You're under your home directory"
fi
```

## Advanced Usage

### Working with Symbolic Links
```bash
# Create symbolic link
ln -s /very/long/path/to/project ~/shortcut

# Navigate through link
cd ~/shortcut

# Different outputs
pwd -L  # /home/user/shortcut
pwd -P  # /very/long/path/to/project
```

### Relative Paths
```bash
# Get parent directory
PARENT_DIR=$(dirname $(pwd))

# Get current directory name
CURRENT_NAME=$(basename $(pwd))

# Get two levels up
TWO_UP=$(dirname $(dirname $(pwd)))
```

### Shell Integration
```bash
# Custom prompt with current directory
export PS1='[\u@\h $(pwd)]\$ '

# Show current directory in title bar
echo -ne "\033]0;$(pwd)\007"
```

## Directory Information

### Path Components
```bash
# Full path
pwd

# Just directory name
basename $(pwd)

# Parent directory
dirname $(pwd)

# All parent directories
echo $(pwd) | tr '/' '\n'
```

### Directory Properties
```bash
# Check if directory exists
[ -d "$(pwd)" ] && echo "Directory exists"

# Get directory permissions
ls -ld $(pwd)

# Get directory size
du -sh $(pwd)
```

## Use in Scripts

### Error Handling
```bash
# Check if directory changed successfully
cd /path/to/dir || {
    echo "Failed to change directory"
    echo "Current directory: $(pwd)"
    exit 1
}
```

### Path Operations
```bash
#!/bin/bash
# Script that operates on files relative to current directory

SCRIPT_DIR=$(pwd)
CONFIG_FILE="$SCRIPT_DIR/config.json"
LOG_DIR="$SCRIPT_DIR/logs"

echo "Running from: $SCRIPT_DIR"
echo "Config file: $CONFIG_FILE"
echo "Log directory: $LOG_DIR"
```

### Backup Scripts
```bash
#!/bin/bash
# Backup current directory

BACKUP_DIR="/backup/$(basename $(pwd))/$(date +%Y%m%d)"
SOURCE_DIR=$(pwd)

echo "Backing up: $SOURCE_DIR"
echo "To: $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"
cp -r "$SOURCE_DIR"/* "$BACKUP_DIR/"
```

## Related Commands

- [`cd`](/docs/commands/file-management/cd) - Change directory
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`dirname`](/docs/commands/file-management/dirname) - Get directory name from path
- [`basename`](/docs/commands/file-management/basename) - Get filename from path
- [`realpath`](/docs/commands/file-management/realpath) - Get absolute path

## Environment Variables

### PWD Variable
```bash
# Display PWD environment variable
echo $PWD

# PWD is automatically updated by cd
cd /tmp
echo $PWD  # /tmp

# Manual assignment (not recommended)
export PWD="/custom/path"
```

### OLDPWD Variable
```bash
# Show previous directory
echo $OLDPWD

# Return to previous directory
cd $OLDPWD
```

## Practical Applications

### Project Navigation
```bash
# Save project root
PROJECT_ROOT=$(pwd)

# Navigate to subdirectories
cd src
cd tests

# Return to project root
cd $PROJECT_ROOT
```

### Relative Path Operations
```bash
# Create file relative to current directory
touch "$(pwd)/output.txt"

# Operate on files in current directory
find $(pwd) -name "*.log"
```

### System Administration
```bash
# Log current directory before operations
CURRENT_DIR=$(pwd)
echo "Starting backup from $CURRENT_DIR"

# Perform operations knowing current location
tar -czf backup.tar.gz -C "$(dirname $(pwd))" "$(basename $(pwd))"
```

## Common Issues

### Permission Problems
```bash
# Check if you can read current directory
ls -ld $(pwd)

# Check if directory is accessible
[ -r "$(pwd)" ] && echo "Directory is readable"
```

### Symbolic Link Confusion
```bash
# Understand the difference
echo "Logical: $(pwd -L)"
echo "Physical: $(pwd -P)"
```

### Script Location Issues
```bash
# Get script directory (not current directory)
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

# Get current working directory
CURRENT_DIR=$(pwd)
```

## Best Practices

1. **Use `pwd -P`** when you need the actual physical path
2. **Capture current directory** before navigating in scripts
3. **Use `dirname` and `basename`** for path manipulation
4. **Check directory accessibility** before performing operations
5. **Use absolute paths** in scripts to avoid ambiguity

## Shell Prompts

### Custom Prompts
```bash
# Show current directory in prompt
export PS1='[\u@\h \w]\$ '

# Shorten long paths in prompt
export PROMPT_COMMAND='PS1="[\u@\h $(pwd | sed "s|$HOME|~|")]\$ "'

# Show git branch and current directory
export PS1='[\u@\h \w$(git branch 2>/dev/null | sed -n "s/* \(.*\)/ (\1)/p")]\$ '
```

The `pwd` command is simple but essential for filesystem navigation and scripting. Understanding the difference between logical and physical paths is crucial when working with symbolic links.