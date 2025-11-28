---
title: pwd - Print Working Directory
sidebar_label: pwd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pwd - Print Working Directory

The `pwd` command prints the full pathname of the current working directory to standard output. It's a fundamental Unix/Linux utility that provides essential context for filesystem navigation, script execution, and system administration. The command handles symbolic links differently based on the options specified, making it crucial for understanding both logical and physical paths in complex filesystem structures. PWD is essential for shell scripting, path resolution, and maintaining orientation within directory hierarchies.

## Basic Syntax

```bash
pwd [OPTION]
```

## Command Options

### Path Resolution Options
- `-L, --logical` - Use PWD from environment, even if it contains symlinks (default behavior)
- `-P, --physical` - Avoid all symlinks, print actual physical path by resolving all symbolic links

### Help and Version
- `--help` - Display help message and exit
- `--version` - Output version information and exit

## Usage Examples

### Basic Directory Operations

#### Display Current Directory
```bash
# Print current working directory
pwd
# Output: /home/user/projects/myapp

# Current directory in root
pwd
# Output: /

# Display with logical path (default)
pwd -L
# Output: /home/user/documents  # Even if accessed through symlink

# Display physical path (resolves symlinks)
pwd -P
# Output: /mnt/storage/documents  # Actual physical location
```

#### Understanding Path Types
```bash
# Create symbolic link scenario
ln -s /var/www/html ~/webroot
cd ~/webroot

# Logical path (default) - shows the path as traversed
pwd
# Output: /home/user/webroot

pwd -L
# Output: /home/user/webroot

# Physical path - resolves all symlinks
pwd -P
# Output: /var/www/html

# Create nested symbolic links
ln -s /opt/app/data ~/appdata
ln -s ~/appdata ~/mydata
cd ~/mydata

pwd -L  # /home/user/mydata
pwd -P  # /opt/app/data
```

### Environment Variable Integration

#### PWD Environment Variable
```bash
# Display PWD environment variable
echo $PWD

# Compare pwd command with PWD variable
pwd
echo $PWD
# Usually show the same result

# Manual PWD assignment (not recommended in practice)
export PWD="/custom/path"
pwd
# Still shows actual current directory, not the manually set value

# Reset PWD to actual directory
cd .
echo $PWD
```

#### OLDPWD Variable Usage
```bash
# Navigate through directories
cd /etc
cd /var/log
cd /home

# Show previous directory
echo $OLDPWD
# Output: /var/log

# Return to previous directory
cd -
# Equivalent to: cd $OLDPWD

# Verify current location
pwd
```

## Practical Examples

### Shell Scripting Applications

#### Script Directory Context
```bash
#!/bin/bash
# Get script's execution directory
SCRIPT_DIR=$(pwd)
echo "Script running from: $SCRIPT_DIR"

# Get script's actual directory (resolves symlinks)
REAL_DIR=$(pwd -P)
echo "Physical location: $REAL_DIR"

# Store original directory for later return
ORIGINAL_DIR=$(pwd)
echo "Starting operations from: $ORIGINAL_DIR"

# Navigate and perform operations
cd /tmp
echo "Temporary operations in: $(pwd)"

# Return to original location
cd "$ORIGINAL_DIR"
echo "Returned to: $(pwd)"
```

#### File Path Construction
```bash
#!/bin/bash
# Build absolute paths relative to current directory
CURRENT_DIR=$(pwd)

# Create paths for common operations
LOG_FILE="$CURRENT_DIR/logs/application.log"
CONFIG_FILE="$CURRENT_DIR/config/settings.json"
BACKUP_DIR="$CURRENT_DIR/backups"

echo "Current directory: $CURRENT_DIR"
echo "Log file location: $LOG_FILE"
echo "Config file: $CONFIG_FILE"
echo "Backup directory: $BACKUP_DIR"

# Create directories if they don't exist
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$BACKUP_DIR"

# Verify paths exist
[ -f "$CONFIG_FILE" ] && echo "Config file found" || echo "Config file missing"
```

#### Directory Change Validation
```bash
#!/bin/bash
# Safe directory navigation with validation
TARGET_DIR="/path/to/destination"

# Store current directory
START_DIR=$(pwd)

# Attempt directory change
if cd "$TARGET_DIR" 2>/dev/null; then
    echo "Successfully changed to: $(pwd)"

    # Perform operations in new directory
    echo "Directory contents:"
    ls -la

    # Return to original directory
    cd "$START_DIR"
    echo "Returned to: $(pwd)"
else
    echo "Failed to change directory to: $TARGET_DIR"
    echo "Current directory remains: $(pwd)"
    exit 1
fi
```

### System Administration

#### System Maintenance Scripts
```bash
#!/bin/bash
# System backup with directory tracking
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/system_backup_$TIMESTAMP.log"

# Log starting directory
echo "[$(date)] Starting backup from: $(pwd)" >> "$LOG_FILE"

# Create backup structure
BACKUP_ROOT="/backup/$(hostname)/$(date +%Y%m%d)"
mkdir -p "$BACKUP_ROOT"

# Backup important directories
for DIR in /etc /home /var/log /opt; do
    if [ -d "$DIR" ]; then
        echo "[$(date)] Backing up $DIR" >> "$LOG_FILE"
        tar -czf "$BACKUP_ROOT$(basename $DIR).tar.gz" -C "$(dirname "$DIR")" "$(basename "$DIR")"
    fi
done

echo "[$(date)] Backup completed" >> "$LOG_FILE"
echo "Current directory: $(pwd)" >> "$LOG_FILE"
```

#### Service Management
```bash
#!/bin/bash
# Service deployment with directory context
SERVICE_NAME="webapp"
DEPLOY_DIR="/opt/$SERVICE_NAME"
CONFIG_DIR="/etc/$SERVICE_NAME"

# Ensure we're in the right directory
cd "$DEPLOY_DIR" || {
    echo "Failed to change to deployment directory: $DEPLOY_DIR"
    echo "Current directory: $(pwd)"
    exit 1
}

echo "Deploying $SERVICE_NAME from: $(pwd)"

# Check configuration directory
if [ ! -d "$CONFIG_DIR" ]; then
    echo "Configuration directory missing: $CONFIG_DIR"
    echo "Creating from: $(pwd)/config"
    cp -r config "$CONFIG_DIR"
fi

# Start service with full paths
./bin/start-server --config "$CONFIG_DIR/app.conf" --log "/var/log/$SERVICE_NAME.log"
```

### Development Workflow

#### Project Management
```bash
#!/bin/bash
# Development environment setup
PROJECT_ROOT=$(pwd)
echo "Project root: $PROJECT_ROOT"

# Set up development environment
export PROJECT_ROOT
export NODE_ENV="development"
export LOG_LEVEL="debug"

# Create necessary directories
mkdir -p "$PROJECT_ROOT/logs"
mkdir -p "$PROJECT_ROOT/temp"
mkdir -p "$PROJECT_ROOT/build"

echo "Development environment initialized"
echo "Current working directory: $(pwd)"
echo "Project root: $PROJECT_ROOT"

# Run tests relative to project root
cd tests
echo "Running tests from: $(pwd)"
npm test

# Return to project root
cd "$PROJECT_ROOT"
echo "Back to project root: $(pwd)"
```

#### Build Processes
```bash
#!/bin/bash
# Build system with directory awareness
BUILD_DIR=$(pwd)
SOURCE_DIR="$BUILD_DIR/src"
OUTPUT_DIR="$BUILD_DIR/dist"

echo "Build process started"
echo "Source directory: $SOURCE_DIR"
echo "Output directory: $OUTPUT_DIR"

# Clean previous build
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Compile source files
cd "$SOURCE_DIR"
echo "Compiling from: $(pwd)"

find . -name "*.java" -exec javac -d "$OUTPUT_DIR" {} \;

# Create JAR file
cd "$OUTPUT_DIR"
echo "Creating JAR from: $(pwd)"
jar cf "$BUILD_DIR/application.jar" .

echo "Build completed successfully"
echo "Final JAR location: $BUILD_DIR/application.jar"
```

### File Operations

#### Batch File Processing
```bash
#!/bin/bash
# Process files in current directory context
WORK_DIR=$(pwd)
echo "Processing files in: $WORK_DIR"

# Find and process log files
find "$WORK_DIR" -name "*.log" -type f | while read -r logfile; do
    echo "Processing: $logfile"

    # Create backup
    cp "$logfile" "$logfile.backup"

    # Compress old logs
    if [ -f "$logfile.1" ]; then
        gzip "$logfile.1"
    fi

    # Truncate current log
    > "$logfile"
done

echo "File processing completed in: $(pwd)"
```

#### Path Validation
```bash
#!/bin/bash
# Validate file and directory paths
CURRENT_DIR=$(pwd)

echo "Directory validation for: $CURRENT_DIR"

# Check directory permissions
echo "Read permissions: $([ -r "$CURRENT_DIR" ] && echo "Yes" || echo "No")"
echo "Write permissions: $([ -w "$CURRENT_DIR" ] && echo "Yes" || echo "No")"
echo "Execute permissions: $([ -x "$CURRENT_DIR" ] && echo "Yes" || echo "No")"

# Check available space
AVAILABLE_SPACE=$(df -h "$CURRENT_DIR" | awk 'NR==2 {print $4}')
echo "Available space: $AVAILABLE_SPACE"

# Validate important subdirectories
for SUBDIR in bin config logs temp; do
    if [ -d "$CURRENT_DIR/$SUBDIR" ]; then
        echo "✓ $SUBDIR directory exists"
    else
        echo "✗ $SUBDIR directory missing"
    fi
done
```

## Advanced Usage

### Symbolic Link Management

#### Complex Symbolic Link Scenarios
```bash
# Create nested symbolic link structure
mkdir -p /data/app/v1/config
mkdir -p /data/app/v2/config
ln -s /data/app/v2/current
cd /data/app/current

# Logical path shows symlink path
pwd -L
# Output: /data/app/current

# Physical path resolves to actual location
pwd -P
# Output: /data/app/v2

# Create relative symlink
ln -s ../v1/config legacy_config
cd legacy_config

pwd -L  # /data/app/current/legacy_config
pwd -P  # /data/app/v1/config
```

#### Symbolic Link Detection
```bash
#!/bin/bash
# Detect and handle symbolic links in current path
CURRENT_LOGICAL=$(pwd -L)
CURRENT_PHYSICAL=$(pwd -P)

if [ "$CURRENT_LOGICAL" != "$CURRENT_PHYSICAL" ]; then
    echo "Current directory accessed through symbolic links"
    echo "Logical path:  $CURRENT_LOGICAL"
    echo "Physical path: $CURRENT_PHYSICAL"

    # Find all symbolic links in the path
    echo "Symbolic links in path:"
    echo "$CURRENT_LOGICAL" | tr '/' '\n' | while read -r component; do
        [ -n "$component" ] && echo "  - $component"
    done
else
    echo "No symbolic links in current path"
    echo "Current directory: $CURRENT_LOGICAL"
fi
```

### Path Manipulation

#### Directory Navigation Helper
```bash
#!/bin/bash
# Enhanced directory navigation with path tracking
save_current_dir() {
    local label="$1"
    local current_dir=$(pwd)
    echo "Saved '$label': $current_dir"
    export SAVED_DIR_$label="$current_dir"
}

goto_saved_dir() {
    local label="$1"
    local saved_var="SAVED_DIR_$label"
    local target_dir="${!saved_var}"

    if [ -n "$target_dir" ] && [ -d "$target_dir" ]; then
        echo "Going to saved '$label': $target_dir"
        cd "$target_dir"
        pwd
    else
        echo "No saved directory '$label' found or directory doesn't exist"
        return 1
    fi
}

# Usage examples
save_current_dir "project"
cd /tmp
save_current_dir "temp"
goto_saved_dir "project"
goto_saved_dir "temp"
```

#### Path Component Analysis
```bash
#!/bin/bash
# Analyze current directory path components
CURRENT_PATH=$(pwd)

echo "Path analysis for: $CURRENT_PATH"

# Count directory depth
DEPTH=$(echo "$CURRENT_PATH" | tr '/' '\n' | wc -l)
echo "Directory depth: $DEPTH"

# Extract path components
echo "Path components:"
echo "$CURRENT_PATH" | tr '/' '\n' | nl

# Show parent directory hierarchy
echo "Parent directory hierarchy:"
TEMP_PATH="$CURRENT_PATH"
while [ "$TEMP_PATH" != "/" ]; do
    echo "  $TEMP_PATH"
    TEMP_PATH=$(dirname "$TEMP_PATH")
done
echo "  /"

# Show current directory name only
echo "Current directory name: $(basename "$CURRENT_PATH")"
echo "Parent directory: $(dirname "$CURRENT_PATH")"
```

## Shell Integration

### Custom Shell Functions

#### Enhanced cd Function
```bash
# Add to ~/.bashrc or ~/.bash_profile
cd_with_pwd() {
    builtin cd "$@" && {
        echo "Changed to: $(pwd)"
        # Update terminal title (if supported)
        echo -ne "\033]0;$(pwd)\007"

        # Show directory contents
        if [ "$(ls -1 | wc -l)" -lt 20 ]; then
            ls -F
        else
            echo "Directory contains $(ls -1 | wc -l) items"
        fi
    }
}

# Use as: cd_with_pwd /path/to/directory
alias cd='cd_with_pwd'
```

#### Directory Bookmark Function
```bash
# Directory bookmarking system
declare -A DIR_BOOKMARKS

bookmark() {
    local name="$1"
    local dir="${2:-$(pwd)}"

    DIR_BOOKMARKS["$name"]="$dir"
    echo "Bookmark '$name' set to: $dir"
}

go() {
    local name="$1"

    if [ -z "${DIR_BOOKMARKS[$name]}" ]; then
        echo "Bookmark '$name' not found"
        return 1
    fi

    cd "${DIR_BOOKMARKS[$name]}"
    echo "Went to bookmark '$name': $(pwd)"
}

list_bookmarks() {
    echo "Directory bookmarks:"
    for name in "${!DIR_BOOKMARKS[@]}"; do
        echo "  $name -> ${DIR_BOOKMARKS[$name]}"
    done
}
```

### Prompt Customization

#### Enhanced Bash Prompt
```bash
# Custom prompt with current directory information
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]$(pwd)\[\033[00m\]\$ '

# Shortened prompt for deep directories
short_pwd() {
    local pwd=$(pwd)
    local homepwd="$HOME"

    case "$pwd" in
        $homepwd/*) echo "~${pwd#$homepwd}" ;;
        *) echo "$pwd" ;;
    esac
}

export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]$(short_pwd)\[\033[00m\]\$ '
```

#### Git-aware Prompt with Directory
```bash
# Git repository aware prompt
git_branch() {
    git branch 2>/dev/null | sed -n 's/* \(.*\)/ (\1)/p'
}

export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]$(short_pwd)$(git_branch)\[\033[00m\]\$ '
```

## Integration and Automation

### Backup Scripts

#### Automated Directory Backup
```bash
#!/bin/bash
# Intelligent backup script based on current directory
CURRENT_DIR=$(pwd)
DIR_NAME=$(basename "$CURRENT_DIR")
BACKUP_BASE="/backup/$(hostname)/$(date +%Y%m%d)"
BACKUP_DIR="$BACKUP_BASE/$DIR_NAME"

echo "Starting backup for: $CURRENT_DIR"
echo "Backup destination: $BACKUP_DIR"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Perform backup based on directory type
if [ -f "$CURRENT_DIR/package.json" ]; then
    echo "Node.js project detected - using rsync"
    rsync -av --exclude=node_modules --exclude=.git "$CURRENT_DIR/" "$BACKUP_DIR/"
elif [ -f "$CURRENT_DIR/requirements.txt" ]; then
    echo "Python project detected - excluding venv"
    rsync -av --exclude=venv --exclude=.git "$CURRENT_DIR/" "$BACKUP_DIR/"
elif [ -f "$CURRENT_DIR/CMakeLists.txt" ] || [ -f "$CURRENT_DIR/Makefile" ]; then
    echo "C/C++ project detected - excluding build files"
    rsync -av --exclude=build --exclude=*.o "$CURRENT_DIR/" "$BACKUP_DIR/"
else
    echo "Generic directory backup"
    rsync -av --exclude=.git "$CURRENT_DIR/" "$BACKUP_DIR/"
fi

# Create compressed archive
cd "$BACKUP_BASE"
tar -czf "$DIR_NAME-$(date +%H%M%S).tar.gz" "$DIR_NAME/"
rm -rf "$DIR_NAME"

echo "Backup completed: $(pwd)/$DIR_NAME-$(date +%H%M%S).tar.gz"
```

### Project Templates

#### Project Initialization Script
```bash
#!/bin/bash
# Initialize new project with directory awareness
PROJECT_NAME="$1"
PROJECT_PATH="$(pwd)/$PROJECT_NAME"

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

echo "Creating project: $PROJECT_NAME"
echo "Project path: $PROJECT_PATH"

# Create project structure
mkdir -p "$PROJECT_PATH"/{src,docs,tests,config,logs,temp}
cd "$PROJECT_PATH"

# Create initial files
cat > README.md << EOF
# $PROJECT_NAME

Project created on $(date)
Working directory: $(pwd)
EOF

cat > .gitignore << EOF
# Logs
logs/
*.log

# Temp files
temp/
tmp/

# OS files
.DS_Store
Thumbs.db
EOF

echo "Project initialized in: $(pwd)"
echo "Structure:"
tree -L 2
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Check directory permissions
ls -ld $(pwd)

# Test read access
[ -r "$(pwd)" ] && echo "Directory is readable" || echo "Directory is not readable"

# Test write access
[ -w "$(pwd)" ] && echo "Directory is writable" || echo "Directory is not writable"

# Test execute access
[ -x "$(pwd)" ] && echo "Directory is accessible" || echo "Directory is not accessible"

# Check directory ownership
stat -c "Owner: %U, Group: %G" $(pwd)
```

#### Symbolic Link Confusion
```bash
# Diagnose symbolic link issues
echo "Current logical path: $(pwd -L)"
echo "Current physical path: $(pwd -P)"

# Check if current directory is a symbolic link
if [ -L "$(pwd -L)" ]; then
    echo "Current directory is a symbolic link"
    ls -la "$(pwd -L)"
else
    echo "Current directory is not a symbolic link"
fi

# Find all symbolic links in current path
find "$(pwd -P)" -type l 2>/dev/null
```

#### Directory Not Found Issues
```bash
# Handle directory access problems
check_directory() {
    local target_dir="$1"

    if [ ! -d "$target_dir" ]; then
        echo "Directory does not exist: $target_dir"
        echo "Current directory: $(pwd)"
        return 1
    fi

    if [ ! -x "$target_dir" ]; then
        echo "Directory is not accessible: $target_dir"
        echo "Permissions: $(ls -ld "$target_dir")"
        return 1
    fi

    echo "Directory is accessible: $target_dir"
    return 0
}

# Usage
check_directory "/some/directory"
```

### Performance Considerations

#### Large Directory Navigation
```bash
# Optimize directory changes in large filesystems
# Use absolute paths to avoid relative path resolution
cd /very/deep/directory/structure  # Faster than multiple relative cd commands

# Cache current directory for repeated use
CURRENT_DIR=$(pwd)
# Use $CURRENT_DIR instead of repeatedly calling pwd

# For scripts that need to know the directory multiple times
# Store it once at the beginning
SCRIPT_DIR=$(pwd -P)  # Get physical path once
```

## Best Practices

### Script Development
1. **Store current directory** at the beginning of scripts to avoid repeated `pwd` calls
2. **Use `pwd -P`** when you need the actual physical location, especially for file operations
3. **Validate directory access** before performing operations in scripts
4. **Return to original directory** after temporary navigation in scripts
5. **Use absolute paths** in scripts to avoid ambiguity and ensure reliability

### Directory Management
1. **Understand symlink behavior** - know when to use logical vs physical paths
2. **Check permissions** before assuming directory access
3. **Monitor disk space** before operations that create files
4. **Use meaningful directory names** to make path identification easier
5. **Maintain consistent directory structures** for projects and applications

### Performance Optimization
1. **Cache `pwd` output** when used multiple times in scripts
2. **Use `cd -`** for returning to previous directory instead of storing paths manually
3. **Avoid excessive directory changes** in loops - work with absolute paths instead
4. **Use `realpath` command** for more complex path resolution when needed
5. **Minimize filesystem calls** by storing directory information in variables

### Shell Integration
1. **Customize prompts** to show current directory context
2. **Create directory bookmarks** for frequently accessed locations
3. **Use directory stack** (`pushd`, `popd`) for temporary navigation
4. **Set up aliases** for common directory operations
5. **Configure terminal titles** to show current directory

## Related Commands

- [`cd`](/docs/commands/file-management/cd) - Change directory
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`dirname`](/docs/commands/file-management/dirname) - Extract directory name from path
- [`basename`](/docs/commands/file-management/basename) - Extract filename from path
- [`realpath`](/docs/commands/file-management/realpath) - Resolve absolute path
- [`readlink`](/docs/commands/file-management/readlink) - Display symbolic link targets
- [`find`](/docs/commands/file-management/find) - Search for files and directories
- [`tree`](/docs/commands/file-management/tree) - Display directory structure

The `pwd` command, while seemingly simple, is fundamental to Linux system navigation and scripting. Understanding its behavior with symbolic links, environment variables, and shell integration is essential for effective system administration and development workflows.