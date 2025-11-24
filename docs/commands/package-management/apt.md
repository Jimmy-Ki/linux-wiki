---
title: apt - Advanced Package Tool
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# apt - Advanced Package Tool

The `apt` command is a high-level interface for the package management system used in Debian-based Linux distributions. It serves as a user-friendly replacement for `apt-get` and provides simplified commands for managing software packages, including installation, updates, and removal operations.

## Basic Syntax

```bash
apt [OPTIONS] COMMAND
```

## Common Options

### General Options
- `-h, --help` - Display help information
- `-v, --version` - Display apt version
- `-c, --config-file FILE` - Read configuration file
- `-o, --option OPTION=VALUE` - Set a configuration option

### Common Command Options
- `-y, --yes` - Assume "yes" to all prompts
- `-q, --quiet` - Quiet mode, minimal output
- `-s, --simulate, --dry-run` - Simulate the command without making changes
- `-d, --download-only` - Download packages without installing or configuring
- `-f, --fix-broken` - Attempt to fix broken dependencies

## Usage Examples

### Basic Package Management

```bash
# Update package lists from repositories
apt update

# Upgrade all installed packages to latest versions
apt upgrade

# Perform full system upgrade (may install/remove packages)
apt full-upgrade

# Install a new package
apt install package_name

# Install multiple packages
apt install package1 package2 package3

# Remove a package (keep configuration files)
apt remove package_name

# Remove a package and its configuration files
apt purge package_name

# Remove automatically installed unused packages
apt autoremove
```

### Package Information and Search

```bash
# Search for packages by name or description
apt search search_term

# Show detailed information about a package
apt show package_name

# Show package information in a specific format
apt show --no-all-versions package_name

# List installed and available packages
apt list

# List only installed packages
apt list --installed

# List only upgradable packages
apt list --upgradable

# List all available versions of a package
apt list --all-versions package_name
```

### Package Source and Repository Management

```bash
# Add a new repository
apt add-repository repository_specification

# Remove a repository
apt add-repository -r repository_specification

# Edit sources list
apt edit-sources
```

### Cache and Maintenance Operations

```bash
# Clean the package cache completely
apt clean

# Remove obsolete package cache files
apt autoclean

# Verify there are no broken dependencies
apt check

# Download a package without installing
apt download package_name

# Reinstall a package
apt install --reinstall package_name
```

## Practical Examples

### System Maintenance and Updates

```bash
# Complete system update routine
apt update && apt upgrade -y && apt autoremove -y && apt autoclean

# Check for broken packages and fix them
apt check
apt install --fix-broken

# Update specific package categories
apt update && apt install --only-upgrade security-updates
```

### Package Installation and Management

```bash
# Install package with specific version
apt install package_name=version_number

# Install package without recommended packages
apt install --no-install-recommends package_name

# Install package including recommended packages
apt install --install-recommends package_name

# Install package from specific repository
apt install -t repository_name package_name

# Hold a package to prevent updates
apt-mark hold package_name

# Unhold a package to allow updates
apt-mark unhold package_name

# Show why a package cannot be installed
apt policy package_name

# Show package dependencies
apt depends package_name

# Show reverse dependencies
apt rdepends package_name
```

### Package Information and Debugging

```bash
# Show package details including dependencies
apt-cache show package_name

# Show package statistics
apt-cache stats

# Search package names and descriptions
apt-cache search keyword

# Find packages that provide a specific file
apt-file search filename

# Show files included in a package
apt-file list package_name

# Update apt-file database
apt-file update
```

### System Package State Analysis

```bash
# List all installed packages with versions
apt list --installed

# List upgradable packages with version information
apt list --upgradable

# Show pending changes without executing
apt dist-upgrade -s

# Check which packages were recently installed
apt history log

# Show detailed command history
apt history

# Undo a specific apt operation
apt history undo number

# Rollback to a specific system state
apt history rollback number
```

### Advanced Package Operations

```bash
# Download source code for a package
apt source package_name

# Build dependencies for a package
apt build-dep package_name

# Change package priorities
apt-cache policy package_name

# Satisfy dependency requirements
apt satisfy "dependency_expression"

# Mark package as automatically installed
apt-mark auto package_name

# Mark package as manually installed
apt-mark manual package_name

# Show package manual/auto status
apt-mark showmanual
apt-mark showauto
```

### Repository and Source Management

```bash
# Add PPA repository (Ubuntu)
apt add-repository ppa:user/repository

# Add repository with GPG key
apt-add-repository 'deb [arch=amd64] https://repo.example.com/ focal main'

# Update repository keys
apt-key update

# Add repository GPG key
apt-key add keyfile.asc

# Remove repository GPG key
apt-key del key_id

# List trusted keys
apt-key list
```

### Package Cache Operations

```bash
# Show cache statistics
apt-cache stats

# Show cache size
apt-cache showpkg package_name

# Clean only specific cache directories
apt-get clean -o Dir::Cache::archives=/path/to/cache

# Configure cache retention
apt-get autoclean -o APT::Clean-Installed="true"
```

## Related Commands

- `apt-get` - Low-level package handling utility (legacy)
- `apt-cache` - Package cache query tool
- `apt-file` - Search for files in packages
- `apt-key` - APT repository key management
- `apt-mark` - Package selection state management
- `dpkg` - Low-level package manager
- `aptitude` - Text-based package management interface
- `sources.list` - Repository configuration file

## Best Practices

### System Updates
1. Always run `apt update` before installing or upgrading packages
2. Use `apt upgrade` for regular updates and `full-upgrade` for major system changes
3. Schedule regular system updates using cron or systemd timers
4. Test updates on staging systems before production deployment

### Package Management
1. Use `autoremove` regularly to clean up unused dependencies
2. Consider using `--no-install-recommends` for minimal installations
3. Use `apt-mark hold` to prevent unwanted updates of critical packages
4. Verify package integrity before installation using `apt-cache show`

### Security Considerations
1. Always verify repository authenticity before adding new sources
2. Regularly update package lists to receive security patches
3. Use `apt-listchanges` to review changelog information
4. Consider using unattended-upgrades for automated security updates

### Performance Optimization
1. Configure apt mirrors for faster downloads
2. Use local package caches for multiple systems
3. Clean package cache regularly with `autoclean`
4. Consider using `apt-fast` or similar tools for parallel downloads

### Troubleshooting
1. Use `apt check` to identify broken dependencies
2. Fix broken packages with `--fix-broken` option
3. Review `/var/log/apt/history.log` for installation history
4. Use `apt policy` to understand package version and repository priority
5. Check network connectivity and DNS resolution for repository access issues

### Configuration Management
1. Use `/etc/apt/apt.conf.d/` for custom apt configuration
2. Configure proxy settings if needed for repository access
3. Set up repository priorities for mixed-source environments
4. Use pinning to control package version preferences

The `apt` command provides a modern, user-friendly interface for package management in Debian-based systems, combining the functionality of multiple legacy tools while offering improved usability and better dependency resolution capabilities.