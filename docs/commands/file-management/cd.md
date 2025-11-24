---
title: cd - Change Directory
sidebar_label: cd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cd - Change Directory

The `cd` command changes the current working directory in the shell. It's one of the most frequently used commands for navigating the Linux filesystem.

## Basic Syntax

```bash
cd [DIRECTORY]
```

## Common Options

- `-L, --logical` - Follow symbolic links (default behavior)
- `-P, --physical` - Follow physical directory structure, resolve symlinks
- `-e` - Exit with status if unable to change directory
- `@` - Navigate to extended attributes (macOS/BSD specific)

## Usage Examples

### Basic Navigation
```bash
# Change to home directory
cd ~

# Change to specific directory
cd /home/user/documents

# Change to parent directory
cd ..

# Go to previous directory
cd -

# Change to root directory
cd /
```

### Relative and Absolute Paths
```bash
# Absolute path
cd /var/log

# Relative path
cd ../sibling_directory

# From current directory
cd subdirectory

# Multiple levels down
cd path/to/nested/directory
```

### Special Directory References
```bash
# Home directory
cd ~
cd $HOME

# Current directory (no effect but valid)
cd .

# Previous directory (toggle)
cd -

# Other user's home directory
cd ~username

# Root directory
cd /
```

### Navigation with Variables
```bash
# Using environment variables
cd $HOME/Documents
cd $PROJECT_ROOT
cd $WORKSPACE

# Using command substitution
cd $(find /opt -name "project*" -type d | head -1)
cd $(dirname "$0")  # Go to script's directory
```

## Directory Stack

### Using pushd and popd
```bash
# Push directory onto stack and change to it
pushd /tmp

# Pop directory from stack and change to it
popd

# View directory stack
dirs

# Rotate stack
pushd
```

### Stack Operations
```bash
# Push multiple directories
pushd /usr/local
pushd /var/log

# Clear stack
dirs -c

# Remove entries
popd +1  # Remove second entry
```

## Advanced Navigation

### Shell Expansion and Wildcards
```bash
# Use tab completion for directory names
cd /etc/sys<TAB>

# Navigate to directory matching pattern
cd /var/log/*_old/

# Use brace expansion
cd /usr/{local,share}
```

### Conditional Navigation
```bash
# Change directory only if it exists
[ -d "/path/to/dir" ] && cd /path/to/dir

# Change directory with error handling
cd /path/to/dir || echo "Directory not found"

# Safe directory change
cdpath="/path/to/project"
if cd "$cdpath" 2>/dev/null; then
    echo "Changed to $PWD"
else
    echo "Failed to change directory"
fi
```

## Shell Configuration

### Bash Configuration (.bashrc)
```bash
# cd aliases for common directories
alias cdproj='cd ~/projects'
alias cdlog='cd /var/log'
alias cdtmp='cd /tmp'

# cd function to create directory if it doesn't exist
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Enhanced cd with history
cd() {
    builtin cd "$@" && ls
}
```

### CDPATH Environment Variable
```bash
# Set search path for cd
export CDPATH=.:~/projects:/var/www

# Now cd will search these directories
cd project1  # Will search in current directory, ~/projects, and /var/www
```

## Practical Examples

### Development Workflow
```bash
# Navigate to project directory
cd ~/projects/myapp

# Go to source directory
cd src

# Back to project root
cd ..

# Navigate to specific feature
cd features/user-authentication
```

### System Administration
```bash
# Navigate to system directories
cd /etc
cd /var/log
cd /usr/local/bin

# Quick access to configuration
cd /etc/nginx/sites-available
cd /opt/app/config
```

### File Management
```bash
# Navigate to download directory
cd ~/Downloads

# Move files to correct location
mv file.pdf ~/Documents/
cd ~/Documents
```

## Directory Navigation Tips

### Efficient Navigation
```bash
# Use tab completion for long paths
cd /very/long/path/to/d<TAB>

# Use relative paths when possible
cd ../../sibling/directory

# Combine with other commands
cd /tmp && ls -la
```

### Navigation History
```bash
# Toggle between two directories
cd /path/one
cd /path/two
cd -  # Back to /path/one
cd -  # Back to /path/two

# Use directory stack for multiple locations
pushd ~/projects
pushd /var/log
popd  # Back to ~/projects
```

## Related Commands

- [`pwd`](/docs/commands/file-management/pwd) - Print working directory
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`dirs`](/docs/commands/shell/dirs) - Display directory stack
- [`pushd`](/docs/commands/shell/pushd) - Push directory onto stack
- [`popd`](/docs/commands/shell/popd) - Pop directory from stack
- [`find`](/docs/commands/file-management/find) - Find files and directories

## Common Issues and Solutions

### Permission Denied
```bash
# Check permissions
ls -ld /path/to/directory

# Use sudo if necessary
sudo cd /root/directory
```

### Directory Not Found
```bash
# Check if directory exists
[ -d "/path/to/dir" ] && echo "Directory exists"

# Find correct path
find / -name "directory_name" 2>/dev/null
```

### Symbolic Link Issues
```bash
# Follow logical path (default)
cd -L symbolic_link

# Follow physical path
cd -P symbolic_link
```

## Best Practices

1. **Use tab completion** to avoid typos in long paths
2. **Use meaningful aliases** for frequently accessed directories
3. **Combine with `ls`** to immediately see directory contents
4. **Use relative paths** when working within project structures
5. **Set up CDPATH** for frequently accessed project directories
6. **Use `mkcd` function** to create and navigate to directories simultaneously

## Shell Integration

### Custom Functions
```bash
# Enhanced cd with directory listing
cd() {
    builtin cd "$@" && echo "Current directory: $PWD" && ls -la
}

# cd with git repository status
cd() {
    builtin cd "$@"
    if [ -d ".git" ]; then
        echo "Git branch: $(git branch --show-current)"
    fi
}
```

The `cd` command is fundamental for Linux filesystem navigation. Mastering its various options and integration with shell features will significantly improve your command-line efficiency.