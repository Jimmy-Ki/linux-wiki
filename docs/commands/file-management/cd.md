---
title: cd - Change Directory
sidebar_label: cd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# cd - Change Directory

The `cd` command is a shell builtin that changes the current working directory in the shell. It's one of the most frequently used commands for navigating the Linux filesystem and is essential for efficient command-line operations. The command supports absolute paths, relative paths, and special directory references, making it versatile for various navigation scenarios.

## Basic Syntax

```bash
cd [-L|[-P [-e]] [-@]] [DIRECTORY]
cd [OPTIONS] [DIRECTORY]
```

## Command Options

### Path Resolution Options
- `-L, --logical` - Follow symbolic links (default behavior in most shells)
- `-P, --physical` - Follow physical directory structure, resolve symbolic links to their actual location
- `-e` - Exit with status code if unable to change directory to a non-existent directory
- `-@` - Navigate to extended attribute directory (macOS/BSD specific)

### Behavior Modifiers
- `--help` - Display help information and exit
- `--version` - Output version information and exit

## Special Directory References

### Path Shortcuts
- `~` or `$HOME` - Current user's home directory
- `~username` - Another user's home directory
- `.` - Current directory (no navigation change)
- `..` - Parent directory
- `../..` - Two levels up
- `../../..` - Three levels up
- `-` - Previous working directory (toggles between last two directories)
- `/` - Root directory

### Environment Variables
- `$HOME` - User's home directory
- `$PWD` - Current working directory
- `$OLDPWD` - Previous working directory
- `$CDPATH` - Search path for directory changes

## Usage Examples

### Basic Navigation

#### Absolute and Relative Paths
```bash
# Navigate using absolute path
cd /var/log
cd /usr/local/bin
cd /home/username/projects

# Navigate using relative paths
cd Documents
cd ../config
cd ../../backup
cd src/components
cd ./scripts

# Go to parent directory
cd ..
cd ../..
```

#### Home Directory Navigation
```bash
# Go to home directory
cd ~
cd $HOME

# Go to specific subdirectory in home
cd ~/Documents
cd ~/projects/myapp
cd $HOME/Downloads

# Navigate to another user's home directory
cd ~root
cd ~guest
```

#### Directory Toggling
```bash
# Toggle between two directories
cd /var/log
cd /etc
cd -  # Back to /var/log
cd -  # Back to /etc

# Check previous directory
echo $OLDPWD
```

### Advanced Navigation Techniques

#### Using Command Substitution
```bash
# Navigate to script's directory
cd $(dirname "$0")

# Navigate to found directory
cd $(find /opt -name "project*" -type d | head -1)

# Navigate using command output
cd $(locate myproject)

# Navigate to parent of current script
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
```

#### Conditional Navigation
```bash
# Change directory only if it exists
[ -d "/path/to/dir" ] && cd /path/to/dir

# Change directory with error handling
cd /path/to/dir || echo "Directory not found: $?"

# Safe directory change with fallback
if cd "$TARGET_DIR" 2>/dev/null; then
    echo "Successfully changed to $PWD"
else
    echo "Failed to change to $TARGET_DIR, staying in $PWD"
fi

# Change directory with creation
[ ! -d "target" ] && mkdir target && cd target || cd target
```

#### Complex Path Navigation
```bash
# Navigate using variable paths
PROJECT_ROOT="/home/user/projects"
cd "$PROJECT_ROOT/webapp"

# Navigate with path expansion
cd /usr/{local,share}/doc

# Navigate using pattern matching
cd /var/log/*_old/

# Navigate with path completion (shell feature)
cd /etc/sys<TAB>  # Tab completion
```

### Symbolic Links Handling

#### Following vs. Resolving Links
```bash
# Follow symbolic link (default -L behavior)
cd -L /path/to/symlink

# Resolve to physical location (-P behavior)
cd -P /path/to/symlink

# Create symbolic link and navigate
ln -s /very/long/path/to/project ~/project
cd ~/project  # Goes to /very/long/path/to/project

# Check actual path
pwd -P  # Shows physical location
pwd -L  # Shows logical location
```

#### Symbolic Link Management
```bash
# Navigate and verify link status
cd -P symlink_dir && pwd

# Check if current directory is accessed through symlink
if [ "$(pwd -P)" != "$(pwd -L)" ]; then
    echo "Currently in a directory accessed via symlink"
fi

# Navigate to link's target directly
readlink -f symlink_path | xargs cd
```

### Directory Stack Operations

#### Basic Stack Usage
```bash
# Push directory onto stack and change to it
pushd /tmp
pushd /var/log
pushd ~/projects

# View directory stack
dirs
dirs -l  # Long format
dirs -v  # Vertical format with numbers

# Rotate stack
pushd  # Rotates directories in stack

# Pop directory from stack and change to it
popd
popd +1  # Remove specific entry from stack
popd -0  # Remove current directory

# Clear stack
dirs -c
```

#### Advanced Stack Operations
```bash
# Stack-based directory navigation for projects
pushd ~/projects/project1
pushd ~/projects/project2
pushd ~/projects/project3

# Quick navigation between projects
cd ~5  # Go to 6th entry in stack (0-indexed)

# Stack manipulation in scripts
# Save current directory
pushd . > /dev/null

# Navigate and perform operations
cd /some/path && do_something

# Return to original directory
popd > /dev/null
```

### Shell Integration and Customization

#### Enhanced cd Functions
```bash
# cd with automatic directory listing
cd() {
    builtin cd "$@" && ls -la
}

# cd with git status display
cd() {
    builtin cd "$@"
    if [ -d ".git" ]; then
        echo "Current directory: $PWD"
        echo "Git branch: $(git branch --show-current 2>/dev/null || echo 'Not a git repo')"
        git status --porcelain 2>/dev/null | wc -l | xargs -I {} echo "Modified files: {}"
    fi
}

# cd with directory creation (mkcd function)
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# cd with history tracking
cd() {
    builtin cd "$@"
    echo "$PWD" >> ~/.cd_history
}

# Smart cd with fuzzy finding
cd() {
    if [ $# -eq 0 ]; then
        builtin cd
    elif [ -d "$1" ]; then
        builtin cd "$1"
    else
        local found_dir=$(find . -type d -name "*$1*" | head -1)
        if [ -n "$found_dir" ]; then
            builtin cd "$found_dir"
        else
            echo "Directory '$1' not found"
            return 1
        fi
    fi
}
```

#### CDPATH Configuration
```bash
# Set search path for cd command
export CDPATH=.:~:~/projects:/var/www:/opt

# Add multiple search paths
export CDPATH="$CDPATH:~/work:~/documents"

# Now cd will search these directories in order
cd project1  # Searches in current directory, then home, projects, etc.

# Show current CDPATH
echo $CDPATH

# Temporarily modify CDPATH
CDPATH=/tmp:~/Downloads cd logs  # Only searches in /tmp and ~/Downloads
```

#### Bash Aliases for Common Directories
```bash
# Development aliases
alias cdproj='cd ~/projects'
alias cdsrc='cd ~/projects/src'
alias cddocs='cd ~/Documents'
alias cddown='cd ~/Downloads'
alias cdtmp='cd /tmp'

# System administration aliases
alias cdlog='cd /var/log'
alias cdetc='cd /etc'
alias cdwww='cd /var/www'
alias cdopt='cd /opt'

# Application-specific aliases
alias cdnginx='cd /etc/nginx'
alias cdapache='cd /etc/apache2'
alias cdmysql='cd /var/lib/mysql'
```

## Path Expansion and Completion

### Shell Expansion Features
```bash
# Tab completion for directory names
cd /etc/sys<TAB>           # Completes to /etc/systemd/
cd ~/pro<TAB>              # Completes to ~/projects/

# Brace expansion
cd /usr/{local,share}/doc
cd /var/{log,lib,cache}

# Tilde expansion
cd ~root
cd ~user/tmp

# Command substitution
cd $(dirname $(which python))
cd $(git rev-parse --show-toplevel)  # Go to git repository root
```

### Pattern Matching Navigation
```bash
# Navigate using wildcards
cd /var/log/*_old/     # If only one match
cd /home/*/Downloads/  # If only one match

# Navigate to most recently modified directory
cd "$(ls -td */ | head -1)"

# Navigate using find command
cd "$(find . -type d -name "*config*" | head -1)"
```

## Script Integration

### Directory Navigation in Scripts
```bash
#!/bin/bash
# Script with directory navigation

# Store original directory
ORIGINAL_DIR=$(pwd)
echo "Starting in: $ORIGINAL_DIR"

# Navigate to target directory
cd /path/to/work || {
    echo "Failed to change directory"
    exit 1
}

# Perform operations in target directory
echo "Working in: $PWD"
ls -la

# Return to original directory
cd "$ORIGINAL_DIR"
echo "Returned to: $PWD"
```

### Robust Directory Changes
```bash
#!/bin/bash
# Safe directory navigation function

safe_cd() {
    local target_dir="$1"

    if [ ! -d "$target_dir" ]; then
        echo "Error: Directory '$target_dir' does not exist"
        return 1
    fi

    if [ ! -r "$target_dir" ]; then
        echo "Error: Directory '$target_dir' is not readable"
        return 1
    fi

    if [ ! -x "$target_dir" ]; then
        echo "Error: Directory '$target_dir' is not executable"
        return 1
    fi

    builtin cd "$target_dir" || {
        echo "Error: Failed to change to directory '$target_dir'"
        return 1
    }

    echo "Successfully changed to: $PWD"
}

# Usage example
safe_cd /var/log || exit 1
```

## Environment Variables and Context

### Directory-Related Environment Variables
```bash
# Display current working directory
echo $PWD
pwd

# Display previous working directory
echo $OLDPWD

# Show user's home directory
echo $HOME

# Display current directory search path
echo $CDPATH

# Show all directory-related variables
env | grep -E "(PWD|HOME|CDPATH)"
```

### Context-Aware Navigation
```bash
# Navigate based on current working directory
case "$PWD" in
    "/home/user/projects"*)
        echo "Currently in projects directory"
        cd src
        ;;
    "/var/log"*)
        echo "Currently in log directory"
        cd ..
        ;;
esac

# Navigate using project structure detection
if [ -f "package.json" ]; then
    echo "Node.js project detected"
    cd node_modules
elif [ -f "requirements.txt" ]; then
    echo "Python project detected"
    cd venv
fi
```

## Performance and Best Practices

### Efficient Navigation Patterns
```bash
# Use relative paths for project navigation
cd ../../config
cd ../src

# Use absolute paths for system directories
cd /var/log
cd /etc/nginx

# Chain navigation with commands
cd /tmp && ls -la && rm -rf temp_files/

# Use pushd/popd for temporary navigation
pushd /var/log && grep "error" app.log && popd
```

### Navigation with Error Handling
```bash
# Validate directory before navigation
validate_and_cd() {
    local dir="$1"

    # Check if directory exists
    if [ ! -d "$dir" ]; then
        echo "Directory '$dir' does not exist"
        return 1
    fi

    # Check if directory is accessible
    if [ ! -r "$dir" ] || [ ! -x "$dir" ]; then
        echo "Directory '$dir' is not accessible"
        return 1
    fi

    # Navigate with error checking
    builtin cd "$dir" || {
        echo "Failed to change to directory '$dir'"
        return 1
    }
}
```

## Troubleshooting Common Issues

### Permission Issues
```bash
# Check directory permissions
ls -ld /path/to/directory

# Check if user has execute permission
test -x /path/to/directory && echo "Executable" || echo "Not executable"

# Use sudo with caution (not recommended for cd)
# Instead, change to directory as the appropriate user
sudo -u username cd /path/to/directory

# Fix permissions if needed
chmod +x /path/to/directory
```

### Symbolic Link Problems
```bash
# Check if path is a symbolic link
test -L /path/to/link && echo "Is symlink" || echo "Not symlink"

# Show link target
readlink /path/to/link
readlink -f /path/to/link  # Absolute path

# Navigate to actual target
cd -P /path/to/link
```

### Path Resolution Issues
```bash
# Show current logical path
pwd -L

# Show current physical path
pwd -P

# Compare logical vs physical
if [ "$(pwd -L)" != "$(pwd -P)" ]; then
    echo "Current directory accessed via symlink"
    echo "Logical path: $(pwd -L)"
    echo "Physical path: $(pwd -P)"
fi
```

## Integration with Other Commands

### Combining with File Operations
```bash
# Navigate and perform operations
cd /tmp && touch test_file && ls -la

# Navigate and run commands in context
(cd /var/log && gzip *.log)

# Navigate for file operations
cd ~/Downloads && mv *.pdf ~/Documents/

# Navigate and execute script
cd /opt/app && ./run.sh
```

### Directory-Based Operations
```bash
# Navigate to largest directory
cd "$(du -h */ 2>/dev/null | sort -rh | head -1 | cut -f2)"

# Navigate to most recently created directory
cd "$(ls -dt */ | head -1 | tr -d '/')"

# Navigate based on file content
cd "$(grep -l "pattern" */.* 2>/dev/null | head -1 | xargs dirname)"
```

## Cross-Shell Compatibility

### Bash vs. Zsh vs. Fish
```bash
# Bash-specific features
cd -  # Works in all shells
builtin cd  # Explicitly call builtin

# Zsh-specific features
cd -2  # Go to second previous directory
cd +1  # Go forward in directory history

# Fish shell features (different syntax)
# Fish doesn't use cd for many operations (auto-cd feature)
```

### POSIX Compliance
```bash
# POSIX-compliant cd usage
cd /path/to/directory
cd -
cd ..
cd .

# Avoid shell-specific features for maximum compatibility
cd -- "$directory"  # Handle directories starting with -
```

## Related Commands

- [`pwd`](/docs/commands/file-management/pwd) - Print working directory
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`dirs`](/docs/commands/shell/dirs) - Display directory stack
- [`pushd`](/docs/commands/shell/pushd) - Push directory onto stack
- [`popd`](/docs/commands/shell/popd) - Pop directory from stack
- [`find`](/docs/commands/file-management/find) - Find files and directories
- [`realpath`](/docs/commands/file-management/realpath) - Resolve absolute path
- [`readlink`](/docs/commands/file-management/readlink) - Display symbolic link target

## Best Practices

### Navigation Efficiency
1. **Use tab completion** to avoid typos and speed up navigation
2. **Create meaningful aliases** for frequently accessed directories
3. **Set up CDPATH** for project directories to enable quick access
4. **Use relative paths** when working within project structures
5. **Leverage directory stack** (pushd/popd) for temporary navigation
6. **Create custom functions** for common navigation patterns

### Script Safety
1. **Always validate directories** before navigation in scripts
2. **Store original directory** when temporary navigation is needed
3. **Use absolute paths** in scripts for reliability
4. **Handle permission errors** gracefully
5. **Check symlink behavior** with `-L` and `-P` options

### Shell Integration
1. **Customize cd behavior** with shell functions
2. **Add directory listing** or status display to cd operations
3. **Track navigation history** for advanced features
4. **Integrate with version control** for project-aware navigation
5. **Use environment variables** for dynamic path resolution

## Performance Tips

1. **Tab completion** is faster than typing full paths
2. **Directory aliases** reduce typing for common locations
3. **CDPATH optimization** reduces path resolution time
4. **Use pushd/popd** instead of cd + cd - for multiple directory operations
5. **Minimize symlink traversal** for better performance with `-P` when needed
6. **Cache frequently used paths** in shell variables or functions

The `cd` command is fundamental for Linux filesystem navigation. Mastering its various options, shell integration capabilities, and best practices will significantly improve your command-line efficiency and script reliability. While seemingly simple, `cd` offers powerful features for efficient directory management and navigation workflows.