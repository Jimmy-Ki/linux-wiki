---
title: mkdir - Create Directories
sidebar_label: mkdir
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# mkdir - Create Directories

The `mkdir` command creates new directories in the filesystem. It's essential for organizing files and maintaining a structured directory hierarchy.

## Basic Syntax

```bash
mkdir [OPTIONS] DIRECTORY...
```

## Common Options

### Permission Options
- `-m, --mode=MODE` - Set directory permissions (default is 0777)
- `-p, --parents` - Create parent directories as needed

### Verbose Options
- `-v, --verbose` - Print message for each created directory

### Context Options
- `-Z, --context=CTX` - Set SELinux security context

## Usage Examples

### Basic Directory Creation
```bash
# Create a single directory
mkdir my_directory

# Create multiple directories
mkdir dir1 dir2 dir3

# Create directory with specific permissions
mkdir -m 755 public_directory
mkdir -m 700 private_directory

# Create with verbose output
mkdir -v new_project
```

### Nested Directory Creation
```bash
# Create nested directories (will fail without -p)
mkdir -p projects/web/frontend
mkdir -p data/logs/2024/january

# Create complex directory structure
mkdir -p src/{components,utils,styles,assets}
mkdir -p docs/{api,guides,tutorials}

# Create parent directories as needed
mkdir -p backup/daily/$(date +%Y%m%d)
```

### Directory with Specific Permissions
```bash
# Create directory with read/write for owner only
mkdir -m 700 private

# Create shared directory
mkdir -m 775 shared_project

# Create public read-only directory
mkdir -m 755 public_files

# Create directory with octal permissions
mkdir -m 1777 temp_dir  # with sticky bit
mkdir -m 2755 project   # with setgid bit
```

### Advanced Usage Examples
```bash
# Create directory structure for web project
mkdir -p website/{css,js,images,docs,uploads}

# Create directories with date
mkdir -p logs/$(date +%Y)/$(date +%m)/$(date +%d)

# Create multiple project directories
mkdir -p project_{1,2,3}/{src,docs,tests}

# Create temporary directories
mkdir -p /tmp/work_{1,2,3}
```

## Permission Modes

### Common Permission Settings
```bash
# 755: rwxr-xr-x (owner can do everything, others can read/execute)
mkdir -m 755 public_dir

# 700: rwx------ (only owner can access)
mkdir -m 700 private_dir

# 775: rwxrwxr-x (group can write, others can read/execute)
mkdir -m 775 team_dir

# 777: rwxrwxrwx (everyone can do everything - not recommended)
mkdir -m 777 shared_dir

# 1777: rwxrwxrwt (with sticky bit - users can only delete their own files)
mkdir -m 1777 temp_dir

# 2755: rwxr-sr-x (with setgid - new files inherit group)
mkdir -m 2755 project_dir
```

### Symbolic Mode
```bash
# Using symbolic notation
mkdir -m u=rwx,g=rx,o=rx directory
mkdir -m a=rwx,go-w directory
mkdir -m u=rwx,g=rx,o= directory
```

## Practical Examples

### Project Setup
```bash
# Create standard project structure
mkdir -p project/{src,tests,docs,config,logs,scripts}

# Web application structure
mkdir -p webapp/{public/{css,js,images},src/{controllers,models,views},config,logs}

# Database backup directory
mkdir -p /backups/mysql/{daily,weekly,monthly}/$(date +%Y%m%d)
```

### User Directories
```bash
# Create user home directories
mkdir -p /home/username/{Documents,Downloads,Pictures,Videos,Music}

# Create application directories
mkdir -p ~/.config/app_name/{cache,data,logs}
mkdir -p ~/.local/share/app_name
```

### System Administration
```bash
# Create log directories
sudo mkdir -p /var/log/app/{error,access,debug}

# Create temporary directories
sudo mkdir -p /tmp/app_{work,cache,locks}

# Create backup directories
mkdir -p /backup/{system,user,config}/$(date +%Y%m%d)
```

## Directory Naming

### Naming Conventions
```bash
# Use descriptive names
mkdir project_documentation
mkdir web_application_logs
mkdir database_backups

# Use underscores instead of spaces
mkdir my_project_files
mkdir source_code_archive

# Use version numbers
mkdir project_v1.0
mkdir backup_2024_01_15

# Avoid special characters in directory names
mkdir "Project Files"        # Valid but problematic
mkdir project_files          # Better
mkdir project-files          # Also good
```

### Date-Based Directories
```bash
# Current date
mkdir $(date +%Y-%m-%d)

# Year/Month structure
mkdir -p logs/$(date +%Y)/$(date +%m)

# Timestamp directories
mkdir archive_$(date +%Y%m%d_%H%M%S)
```

## Best Practices

### Directory Organization
```bash
# Create logical hierarchy
mkdir -p project/{src/{main,test},docs,config,scripts}

# Separate concerns
mkdir -p website/{frontend,backend,api,database}

# Use consistent naming
mkdir -p data/{raw,processed,archive,backup}
```

### Security Considerations
```bash
# Set appropriate permissions immediately
mkdir -m 700 sensitive_data
mkdir -m 755 public_files

# Create with specific ownership
sudo mkdir -m 755 /shared/project
sudo chown user:group /shared/project

# Use setgid for collaborative directories
mkdir -m 2775 team_project
sudo chown :team_group team_project
```

## Script Integration

### Bash Scripts
```bash
#!/bin/bash
# Example: Setup project directories

PROJECT_NAME="$1"
if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

mkdir -p "$PROJECT_NAME"/{src,docs,tests,config,logs}
echo "Created project structure for $PROJECT_NAME"

# Create with permissions
mkdir -m 755 "$PROJECT_NAME"/public
mkdir -m 700 "$PROJECT_NAME"/private
```

### Conditional Creation
```bash
# Create directory if it doesn't exist
[ ! -d "logs" ] && mkdir logs

# Create with error checking
mkdir -p important_data || {
    echo "Failed to create directory"
    exit 1
}
```

## Related Commands

- [`rmdir`](/docs/commands/file-management/rmdir) - Remove empty directories
- [`rm`](/docs/commands/file-management/rm) - Remove directories (with -r)
- [`ls`](/docs/commands/file-management/ls) - List directory contents
- [`cd`](/docs/commands/file-management/cd) - Change directory
- [`tree`](/docs/commands/file-management/tree) - Display directory structure

## Common Use Cases

### Development Projects
```bash
# Standard project structure
mkdir -p myapp/{src/{controllers,models,views},public/{css,js},tests,config}

# Node.js project
mkdir -p node_project/{src,public,node_modules,test,docs}

# Python project
mkdir -p python_project/{src,tests,docs,requirements,config}
```

### System Administration
```bash
# Log rotation directories
sudo mkdir -p /var/log/app/{old,archive,current}

# Backup directories
mkdir -p /backup/{daily,weekly,monthly}/$(date +%Y%m%d)

# Temporary working directories
mkdir -p /tmp/work_{1,2,3}
```

### File Organization
```bash
# Media organization
mkdir -p media/{photos/{2023,2024},videos,music,documents}

# Document management
mkdir -p documents/{work,personal,archive,templates}
```

## Tips and Tricks

1. **Use `-p`** to avoid errors when creating nested directories
2. **Set permissions immediately** with `-m` for security
3. **Use verbose mode** for scripts to show progress
4. **Plan directory structure** before creating many directories
5. **Use braces** `{}` for creating multiple related directories

The `mkdir` command is fundamental for organizing files and maintaining a clean filesystem structure. Using its options effectively helps create well-organized and secure directory hierarchies.