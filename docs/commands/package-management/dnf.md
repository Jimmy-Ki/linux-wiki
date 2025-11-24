---
title: dnf - Dandified YUM Package Manager
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dnf - Dandified YUM Package Manager

The `dnf` command is a modern package manager for RPM-based Linux distributions, serving as the next-generation replacement for `yum`. It provides improved dependency resolution, better performance, and enhanced user experience while maintaining compatibility with existing RPM packages and repositories.

## Basic Syntax

```bash
dnf [GLOBAL_OPTIONS] COMMAND [COMMAND_OPTIONS] [PACKAGES...]
```

## Common Options

### Global Options
- `-h, --help` - Display help information
- `-v, --verbose` - Increase verbosity
- `-q, --quiet` - Quiet operation
- `-y, --assumeyes` - Automatically answer yes to all prompts
- `--assumeno` - Automatically answer no to all prompts
- `--best` - Use the best package version available
- `--best=all` - Use best packages from all enabled repositories
- `-C, --cacheonly` - Run entirely from system cache
- `-c [config file]` - Use specified config file
- `--disableplugin=[plugin]` - Disable plugins by name
- `--enableplugin=[plugin]` - Enable plugins by name
- `--noplugins` - Disable all plugins
- `--nodocs` - Install packages without documentation
- `--setopt=option=value` - Set arbitrary configuration option

### Repository Options
- `--enablerepo=[repo]` - Enable additional repositories
- `--disablerepo=[repo]` - disable specific repositories
- `--repo=[repo]` - Enable only specified repositories
- `--allowerasing` - Allow erasing of installed packages
- `--downloadonly` - Download packages without installing
- `--url` - Print URLs for packages
- `--arch=[arch]` - Only consider packages of this architecture

## Usage Examples

### Package Installation and Management

```bash
# Install a package
dnf install package_name

# Install multiple packages
dnf install package1 package2 package3

# Install packages without prompts
dnf install -y package_name

# Install package without dependencies (not recommended)
dnf install --nodeps package_name

# Download package without installing
dnf download package_name

# Reinstall a package
dnf reinstall package_name

# Upgrade specific packages
dnf update package_name

# Upgrade all packages
dnf update
dnf upgrade

# Perform full system upgrade
dnf distro-sync

# Remove a package
dnf remove package_name

# Remove package and all dependencies
dnf remove package_name --allowerasing

# Remove package and unused dependencies
dnf autoremove package_name
```

### Package Information and Search

```bash
# Search for packages
dnf search keyword

# Search by package name
dnf search name:package_name

# Search by summary
dnf search summary:keyword

# Search by description
dnf search description:keyword

# Show package information
dnf info package_name

# Show installed packages
dnf list installed

# Show available packages
dnf list available

# Show all packages
dnf list all

# Show package files
dnf repoquery --list package_name

# Show package dependencies
dnf repoquery --requires package_name

# Show what provides a file
dnf provides /path/to/file

# Show package changelog
dnf changelog package_name
```

### Repository Management

```bash
# List enabled repositories
dnf repolist

# List all repositories (enabled and disabled)
dnf repolist all

# Show repository information
dnf repoinfo repository_name

# Clean package cache
dnf clean all

# Clean metadata cache
dnf clean metadata

# Clean packages cache
dnf clean packages

# Clean expired cache
dnf clean expire-cache

# Make cache (refresh repository metadata)
dnf makecache
```

### Package Group Management

```bash
# List available package groups
dnf grouplist

# Show group information
dnf groupinfo group_name

# Install package group
dnf groupinstall group_name

# Install package group with optional packages
dnf groupinstall group_name --with-optional

# Upgrade package group
dnf groupupdate group_name

# Remove package group
dnf groupremove group_name
```

### Package History and Transactions

```bash
# Show transaction history
dnf history

# Show transaction details
dnf history info transaction_id

# Show transaction package list
dnf history list transaction_id

# Undo a transaction
dnf history undo transaction_id

# Redo a transaction
dnf history redo transaction_id

# Rollback to specific transaction
dnf history rollback transaction_id

# Show user transactions
dnf history user

# Show package history
dnf history package package_name
```

## Practical Examples

### System Maintenance and Updates

```bash
# Complete system update and cleanup
dnf update -y && dnf autoremove -y && dnf clean all

# Check for available updates
dnf check-update

# Install security updates only
dnf update --security

# Install bug fixes only
dnf update --bugfix

# Install enhancement packages only
dnf update --enhancement

# Update specific packages without prompting
dnf update package1 package2 -y

# Perform distro sync to fix dependency issues
dnf distro-sync

# Verify RPM database
dnf check
```

### Package Management Workflows

```bash
# Install package from specific repository
dnf install --enablerepo=epel package_name

# Install local RPM package
dnf install /path/to/local.rpm

# Install RPM with dependency resolution
dnf localinstall /path/to/local.rpm

# Downgrade package to previous version
dnf downgrade package_name

# Mark package for exclusion from updates
dnf install package_name --exclude=package_name

# Install package excluding specific repositories
dnf install --disablerepo=updates package_name

# Force installation despite dependency issues
dnf install --setopt=protected_packages= package_name

# Install package with specific architecture
dnf install package_name.x86_64
```

### Repository Configuration and Management

```bash
# Enable third-party repository
dnf config-manager --add-repo https://repo.example.com/repo.repo

# Enable repository
dnf config-manager --enable repository_name

# Disable repository
dnf config-manager --disable repository_name

# Set repository priority
dnf config-manager --setopt=repository_name.priority=10

# Show repository priorities
dnf repolist --verbose

# Update repository metadata
dnf makecache --refresh
```

### Advanced Package Operations

```bash
# Install build dependencies
dnf builddep package_name

# Download source RPM
dnf download --source package_name

# Verify package integrity
dnf verify package_name

# Check for broken dependencies
dnf check

# Show package provides
dnf repoquery --provides package_name

# Show package conflicts
dnf repoquery --conflicts package_name

# Show package obsoletes
dnf repoquery --obsoletes package_name

# Show package file provides
dnf repoquery --file-provides

# Search packages by file
dnf repoquery --file /path/to/file
```

### Plugin Management and Usage

```bash
# List enabled plugins
dnf --help | grep -i plugin

# Disable specific plugin for one command
dnf --disableplugin=plugin_name install package

# Enable specific plugin for one command
dnf --enableplugin=plugin_name install package

# Use dnf plugins-core for extended functionality
dnf install dnf-plugins-core
```

### Modularity and Application Streams (Fedora/RHEL 8+)

```bash
# List available modules
dnf module list

# Show module streams
dnf module list module_name

# Enable module stream
dnf module enable module_name:stream

# Install module
dnf module install module_name:stream

# Update module
dnf module update module_name:stream

# Remove module
dnf module remove module_name:stream

# Reset module state
dnf module reset module_name

# Disable module
dnf module disable module_name

# Show module info
dnf module info module_name:stream
```

### Package Verification and Security

```bash
# Verify installed packages
dnf verify package_name

# Verify all installed packages
dnf verify-all

# Check GPG signatures
dnf check-signature package_name

# Import GPG key
dnf install /path/to/key.rpm

# Show package security information
dnf info package_name | grep -i security
```

### Performance and Optimization

```bash
# Use fastest mirror plugin
dnf install fastestmirror
dnf update --setopt=fastestmirror=True

# Limit download speed
dnf update --setopt=bandwidth=1000k

# Use multiple threads for downloads
dnf update --setopt=max_parallel_downloads=5

# Cache management optimization
dnf makecache --timer
```

## Related Commands

- `yum` - Legacy package manager (dnf replacement)
- `rpm` - Low-level RPM package manager
- `repoquery` - Query RPM repositories
- `repoquery` - Query installed RPMs
- `dnf5` - Next-generation DNF implementation
- `rpm2cpio` - Convert RPM to cpio archive
- `createrepo` - Create RPM repositories
- `reposync` - Synchronize repositories

## Best Practices

### System Updates
1. Regularly run `dnf check-update` to check for available updates
2. Use `dnf update` for regular system maintenance
3. Schedule updates during system maintenance windows
4. Test updates in staging environments before production
5. Always backup critical data before major updates

### Package Management
1. Use `dnf autoremove` to clean up unused dependencies
2. Verify package integrity before installation with `dnf verify`
3. Use package groups for installing related software collections
4. Consider using `--downloadonly` for pre-download testing
5. Keep track of changes with `dnf history`

### Repository Management
1. Configure repository priorities for mixed-source environments
2. Use trusted repositories only for security
3. Regularly clean cache with `dnf clean all`
4. Test new repositories before enabling them system-wide
5. Use repository configuration files for consistent settings

### Performance Optimization
1. Configure fastestmirror plugin for optimal download speeds
2. Use appropriate timeout and retry settings
3. Limit parallel downloads on bandwidth-constrained systems
4. Cache repositories locally for multiple systems
5. Use `--cacheonly` for offline operations

### Security Considerations
1. Always verify GPG signatures before installation
2. Use `--security` flag for security update prioritization
3. Regularly review `dnf history` for unauthorized changes
4. Keep system up to date with security patches
5. Use containerization for isolated package testing

The `dnf` package manager provides modern, efficient package management for RPM-based distributions with improved dependency resolution, better performance, and enhanced user experience compared to its predecessor `yum`.