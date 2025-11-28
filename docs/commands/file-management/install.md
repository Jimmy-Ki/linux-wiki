---
title: install - Copy files and set attributes
sidebar_label: install
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# install - Copy files and set attributes

The `install` command is a versatile Unix utility that combines file copying operations with permission and attribute setting capabilities. It's primarily used in system administration and software installation processes to copy files to specific locations while simultaneously setting appropriate ownership, permissions, and other file attributes. Unlike standard copy commands, `install` is specifically designed for installing programs and files with proper system-level attributes, making it essential for software development, system configuration, and package management tasks.

## Basic Syntax

```bash
install [OPTIONS] SOURCE DEST
install [OPTIONS] SOURCE... DIRECTORY
install -d [OPTIONS] DIRECTORY...
```

## Common Options

### File Operation Options
- `-c` - Copy files (default behavior, included for compatibility)
- `-C` - Copy only if files differ, preserving timestamps
- `-p` - Preserve access and modification times of source files
- `-b` - Backup existing files before overwriting (creates file.old)
- `-B SUFFIX` - Use specified suffix for backup files
- `-S` - Flush each file to disk after copying (ensures data integrity)

### Attribute Options
- `-m MODE` - Set file permissions (default: 0755)
- `-o OWNER` - Set file owner (name or UID)
- `-g GROUP` - Set file group (name or GID)
- `-f FLAGS` - Set file flags (see chflags(1))

### Directory Operations
- `-d` - Create directories with specified attributes
- `-U` - Unprivileged mode (don't change owner/group/flags)

### Link Options
- `-l LINKFLAGS` - Create links instead of copying:
  - `h` - Hard links
  - `s` - Symbolic links
  - `a` - Absolute symbolic links
  - `r` - Relative symbolic links
  - `m` - Mixed (hard when possible, symbolic otherwise)

### Advanced Options
- `-s` - Strip symbol tables from executables (using strip(1))
- `-v` - Verbose output
- `-D DESTDIR` - Specify destination directory root
- `-M METALOG` - Write metadata to metalog file
- `-T TAGS` - Specify mtree tags for metadata
- `-h HASH` - Calculate file hashes (none, sha1, sha256, sha512)

## Usage Examples

### Basic File Installation

#### Simple File Copy
```bash
# Install a file to specific location
install myfile.txt /usr/local/bin/myfile.txt

# Install to directory (preserves filename)
install myfile.txt /usr/local/bin/

# Install with specific permissions
install -m 755 script.sh /usr/local/bin/

# Install with specific owner and group
install -o root -g staff config.conf /etc/
```

#### Directory Installation
```bash
# Create single directory
install -d /tmp/testdir

# Create directory with specific permissions
install -d -m 700 /tmp/private

# Create multiple directories
install -d /tmp/dir1 /tmp/dir2 /tmp/dir3

# Create directory with owner and permissions
install -d -m 755 -o www -g www /var/www/htdocs
```

### Permission and Ownership Management

#### Setting Permissions
```bash
# Install executable with execute permissions
install -m 755 myscript /usr/local/bin/

# Install read-only configuration file
install -m 644 config.txt /etc/myapp/

# Install with umask-style permissions
install -m 0755 program /usr/local/bin/

# Install with sticky bit
install -m 1755 shared_script /usr/local/bin/
```

#### Ownership Control
```bash
# Install with specific owner
install -o john file.txt /home/john/

# Install with specific group
install -g developers script.sh /opt/tools/

# Install with both owner and group
install -o daemon -g daemon daemon.conf /etc/

# Install with numeric UID/GID
install -o 1000 -g 1000 file.txt /home/user/
```

### Backup and Safety Operations

#### File Backup
```bash
# Backup existing files before overwriting
install -b important.conf /etc/myapp/important.conf

# Use custom backup suffix
install -b -B .backup old_file.txt /new/location/

# Install with timestamp backup
install -b -B .$(date +%Y%m%d) config.txt /etc/
```

#### Safe Installation
```bash
# Install with data integrity flush
install -S critical_data.db /var/lib/

# Compare and copy only if different
install -C config /etc/myapp/

# Preserve timestamps during copy
install -p source.txt destination.txt
```

### Advanced File Operations

#### Link Creation
```bash
# Create hard link instead of copying
install -l h original.txt link_to_original.txt

# Create symbolic link
install -l s /path/to/target /path/to/link

# Create absolute symbolic link
install -l a /usr/local/bin/tool /usr/bin/tool

# Create relative symbolic link
install -l r ../config/file.conf /etc/app/config.conf

# Mixed links (hard when possible)
install -l m source.txt /another/location/
```

#### Executable Installation
```bash
# Install and strip debug symbols
install -s myprogram /usr/local/bin/

# Install with specific permissions and strip
install -s -m 755 program /usr/bin/

# Install with custom strip command
STRIPBIN=custom_strip install -s binary /usr/local/bin/
```

### Development and Build Systems

#### Makefile Integration
```bash
# Typical install target in Makefile
install: myprogram
    install -s -m 755 myprogram /usr/local/bin/
    install -m 644 config.txt /etc/myapp/
    install -d /var/log/myapp

# Install multiple files
install -m 644 *.txt /usr/local/share/doc/myapp/
install -m 755 scripts/* /usr/local/libexec/myapp/
```

#### Software Distribution
```bash
# Install headers
install -m 644 include/*.h /usr/local/include/mylib/

# Install library files
install -m 755 libmylib.so.1.0 /usr/local/lib/
install -l s libmylib.so.1.0 /usr/local/lib/libmylib.so
install -l s libmylib.so.1.0 /usr/local/lib/libmylib.so.1

# Install documentation
install -d /usr/local/share/doc/myapp/
install -m 644 README.md /usr/local/share/doc/myapp/
install -m 644 docs/*.pdf /usr/local/share/doc/myapp/
```

## Practical Examples

### System Administration

#### Configuration File Management
```bash
# Install system configuration with proper permissions
install -o root -g wheel -m 644 system.conf /etc/

# Install with backup for safe updates
install -b -B .old -o root -g wheel -m 644 new.conf /etc/critical.conf

# Install configuration directory structure
install -d -m 755 -o root -g wheel /etc/myapp/{conf,logs,data}

# Install SSL certificates
install -m 600 -o root -g ssl-cert server.key /etc/ssl/private/
install -m 644 -o root -g ssl-cert server.crt /etc/ssl/certs/
```

#### Log Directory Setup
```bash
# Create log directory with proper permissions
install -d -m 755 -o www-data -g adm /var/log/myapp

# Create log file with correct permissions
install -m 640 -o www-data -g adm /dev/null /var/log/myapp/access.log

# Set up log rotation directory
install -d -m 750 -o root -g adm /var/log/archive/myapp
```

#### User Environment Setup
```bash
# Install user scripts with proper permissions
install -m 755 -o user -g user scripts/*.sh /home/user/bin/

# Install configuration templates
install -m 644 -o user -g user config.template /home/user/.config/

# Create user directories
install -d -m 700 -o user -g user /home/user/{.config,.cache,.local}
```

### Development Workflow

#### Build System Integration
```bash
# Install development headers
install -m 644 src/*.h /usr/local/include/myproject/

# Install library files
install -m 755 libmyproject.so /usr/local/lib/
install -l s libmyproject.so /usr/local/lib/libmyproject.so.1

# Install development tools
install -s -m 755 tools/* /usr/local/bin/

# Install documentation
install -m 644 docs/man/*.1 /usr/local/share/man/man1/
install -m 644 README.md /usr/local/share/doc/myproject/
```

#### Testing and Validation
```bash
# Install test files with specific permissions
install -m 644 test_data/* /usr/local/share/myproject/tests/

# Install test executables
install -m 755 test_suites/* /usr/local/libexec/myproject/tests/

# Create test directories
install -d -m 755 /var/tmp/myproject-tests
install -d -m 700 /var/tmp/myproject-tests/secure
```

#### Package Installation
```bash
# Install application with proper structure
install -d -m 755 /opt/myapp/{bin,lib,share,etc}
install -m 755 myapp /opt/myapp/bin/
install -m 644 lib*.so /opt/myapp/lib/
install -m 644 assets/* /opt/myapp/share/

# Install service files
install -m 644 myapp.service /etc/systemd/system/
install -m 755 myapp.init /etc/init.d/
```

### Security and Permissions

#### Secure File Installation
```bash
# Install sensitive configuration with restricted permissions
install -m 600 -o root -g root secret.key /etc/ssl/private/

# Install setuid binary
install -m 4755 -o root -g root privileged_tool /usr/local/bin/

# Install world-readable documentation
install -m 644 docs/* /usr/local/share/doc/myapp/

# Install group-writable shared resource
install -m 664 -o appuser -g appgroup shared.db /var/lib/myapp/
```

#### File System Hardening
```bash
# Install with immutable flag (where supported)
install -f schg -m 644 critical.conf /etc/myapp/

# Install with append-only flag
install -f sappnd -m 644 audit.log /var/log/

# Install hidden system file
install -m 600 -o root -g wheel .sysconfig /etc/
```

## Advanced Usage

### Metadata and Logging

#### Metalog Generation
```bash
# Generate installation metadata
install -M install.mtree -m 644 config.conf /etc/myapp/

# Install with specific tags
install -T "package=myapp,version=1.0" -M metadata.mtree program /usr/local/bin/

# Include hash calculations in metadata
install -h sha256 -M hashlog.mtree -m 644 important.data /var/lib/
```

#### Chroot and DESTDIR Operations
```bash
# Install to staging directory
install -D /staging/usr/local/bin program /usr/local/bin/

# Create directory structure in staging
install -D /staging -d -m 755 /usr/local/share/myapp

# Install with relative paths for packaging
install -D /tmp/pkgroot -m 644 config /etc/myapp/config
```

### Batch Operations

#### Multiple File Installation
```bash
# Install multiple source files to directory
install -m 644 *.txt /usr/local/share/doc/myapp/

# Install multiple executables with different permissions
install -m 755 scripts/* /usr/local/libexec/myapp/
install -m 644 configs/* /etc/myapp/

# Install with wildcard patterns
install -m 755 src/[a-m]*.py /usr/local/bin/
install -m 755 src/[n-z]*.py /opt/tools/
```

#### Conditional Installation
```bash
# Install only if source is newer
find . -name "*.conf" -newer /etc/myapp/ -exec install -m 644 {} /etc/myapp/ \;

# Install with file type filtering
find . -type f -name "*.so" -exec install -m 755 {} /usr/local/lib/ \;

# Install multiple directories with consistent permissions
for dir in bin lib share; do
    install -d -m 755 /opt/myapp/$dir
done
```

## Integration and Automation

### Shell Script Integration

#### Installation Scripts
```bash
#!/bin/bash
# Comprehensive application installer

APP_NAME="myapp"
APP_USER="appuser"
APP_GROUP="appgroup"
INSTALL_PREFIX="/opt/$APP_NAME"

# Create directory structure
install -d -m 755 -o root -g wheel "$INSTALL_PREFIX"/{bin,lib,share,etc,var}
install -d -m 755 -o "$APP_USER" -g "$APP_GROUP" "$INSTALL_PREFIX/var"

# Install application files
install -m 755 -o root -g wheel "$APP_NAME" "$INSTALL_PREFIX/bin/"
install -m 644 -o "$APP_USER" -g "$APP_GROUP" lib*.so "$INSTALL_PREFIX/lib/"
install -m 644 -o root -g wheel config/* "$INSTALL_PREFIX/etc/"

# Install documentation
install -d -m 755 /usr/local/share/doc/$APP_NAME
install -m 644 README.md docs/*.pdf /usr/local/share/doc/$APP_NAME/

# Create log file
install -m 640 -o "$APP_USER" -g "$APP_GROUP" /dev/null "$INSTALL_PREFIX/var/app.log"

echo "Installation completed successfully"
```

#### System Setup Scripts
```bash
#!/bin/bash
# System directory setup

# Essential directories
install -d -m 755 -o root -g wheel /usr/local/{bin,lib,share,include}
install -d -m 755 -o root -g wheel /var/{log,lib,cache,tmp}
install -d -m 1777 -o root -g wheel /tmp

# Security-sensitive directories
install -d -m 700 -o root -g wheel /etc/ssl/private
install -d -m 755 -o root -g wheel /etc/ssl/certs

# User-specific directories
install -d -m 755 -o user -g user /home/user/{.config,.cache,.local}
```

#### Backup and Maintenance
```bash
#!/bin/bash
# Configuration backup script

BACKUP_DIR="/backup/$(date +%Y%m%d)"
install -d -m 700 -o root -g wheel "$BACKUP_DIR"

# Backup with original timestamps
install -p -b -B .old -m 644 /etc/myapp/*.conf "$BACKUP_DIR/"

# Create hash list for verification
install -h sha256 -M "$BACKUP_DIR/hashes.mtree" -m 644 /etc/myapp/*.conf "$BACKUP_DIR/"

echo "Configuration backed up to $BACKUP_DIR"
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied errors
# Solution: Use sudo or check target permissions
sudo install -m 644 file.txt /etc/config/

# Cannot change ownership
# Solution: Use unprivileged mode or run as root
install -U -m 644 config.txt ~/.config/

# File flags cannot be set
# Warning expected on filesystems that don't support flags
install -f schg -m 644 file.txt /tmp/  # May show warning
```

#### Path and Directory Issues
```bash
# Target directory doesn't exist
# Solution: Create directory first
install -d /path/to/target
install file.txt /path/to/target/

# Cannot move file onto itself
# Solution: Check source and destination paths
install source.txt /different/path/source.txt

# Absolute vs relative path confusion
# Solution: Use full paths or ensure correct working directory
install ./script.sh /usr/local/bin/script.sh
```

#### File Type Issues
```bash
# Strip operation fails on non-executable
# Solution: Don't strip non-binaries or check file type
install -s program /usr/local/bin/  # OK for executables
install config.txt /etc/            # Don't use -s for config files

# Symbolic link creation fails
# Solution: Check if target exists and path is correct
install -l s /absolute/path/to/target /path/to/link
```

#### Environment Variable Issues
```bash
# Custom strip command not found
# Solution: Set STRIPBIN environment variable
STRIPBIN=/usr/bin/strip install -s program /usr/local/bin/

# Strip disabled by environment
# Solution: Unset DONTSTRIP variable
unset DONTSTRIP
install -s program /usr/local/bin/
```

### Debugging Techniques

#### Verbose Installation
```bash
# See detailed installation process
install -v file.txt /target/location/

# Monitor multiple file installations
install -v -m 644 *.conf /etc/myapp/
```

#### Dry Run Testing
```bash
# Test directory creation
install -d -v -m 755 /test/directory/structure

# Verify permissions with test files
install -m 755 test_script.sh /tmp/test/
ls -la /tmp/test/test_script.sh
```

#### Metadata Verification
```bash
# Generate and verify metadata
install -M install.log -h sha256 -m 644 important.dat /var/lib/
cat install.log

# Compare installed files
cmp source.txt /usr/local/bin/installed_file.txt
```

## Related Commands

- [`cp`](/docs/commands/file-management/cp) - Copy files and directories
- [`mv`](/docs/commands/file-management/mv) - Move or rename files
- [`ln`](/docs/commands/file-management/ln) - Create links between files
- [`chmod`](/docs/commands/file-management/chmod) - Change file permissions
- [`chown`](/docs/commands/file-management/chown) - Change file ownership
- [`chgrp`](/docs/commands/file-management/chgrp) - Change file group ownership
- [`mkdir`](/docs/commands/file-management/mkdir) - Create directories
- [`strip`](/docs/commands/development/strip) - Strip symbols from object files
- [`chflags`](/docs/commands/file-management/chflags) - Change file flags
- [`find`](/docs/commands/file-management/find) - Find files and directories

## Best Practices

1. **Always specify explicit permissions** using `-m` instead of relying on defaults
2. **Use appropriate ownership** with `-o` and `-g` for system files
3. **Create directory structure first** with `install -d` before installing files
4. **Backup important files** with `-b` before overwriting system configurations
5. **Use verbose mode** (`-v`) for critical installations to track progress
6. **Preserve timestamps** with `-p` when copying files that need original times
7. **Test installations** in staging directories before production deployment
8. **Use secure permissions** for sensitive files (600, 640, 644 as appropriate)
9. **Leverage linking** (`-l`) instead of copying when appropriate to save space
10. **Document installations** using metadata (`-M`) for system auditing

## Performance Tips

1. **Use `-C` option** to avoid unnecessary file copies when files haven't changed
2. **Batch operations** by installing multiple files at once rather than individual commands
3. **Minimize disk flushes** by avoiding `-S` unless data integrity is critical
4. **Use hard links** (`-l h`) instead of copying duplicate files to save disk space
5. **Skip stripping** (`-s`) in development builds to preserve debugging information
6. **Create directory trees** efficiently with single `install -d` commands
7. **Use relative symbolic links** (`-l r`) for portable installations
8. **Combine with find** for efficient batch installations of file sets
9. **Parallelize installations** when possible for large file sets
10. **Use staging directories** to minimize filesystem fragmentation

The `install` command is a powerful system administration tool that combines file operations with attribute management. Its ability to set permissions, ownership, and create directory structures makes it indispensable for software installation, system configuration, and maintenance tasks. Understanding its comprehensive options enables efficient and secure file management operations in Unix/Linux environments.