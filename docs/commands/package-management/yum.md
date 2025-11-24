---
title: yum - Yellowdog Updater Modified
sidebar_label: yum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# yum - Yellowdog Updater Modified

The `yum` command is a package manager for RPM-based Linux distributions, including Red Hat Enterprise Linux, CentOS, Fedora, and their derivatives. It provides an automated system for installing, updating, and removing software packages while handling dependencies automatically.

## Basic Syntax

```bash
yum [OPTIONS] [COMMAND] [PACKAGE...]
```

## Common Options

### General Options
- `-h, --help` - Display help information
- `-y, --assumeyes` - Assume "yes" to all prompts
- `-q, --quiet` - Quiet operation
- `-v, --verbose` - Verbose operation
- `-c [config file]` - Use specified configuration file
- `--version` - Show yum version
- `--installroot=[path]` - Set install root
- `--enablerepo=[repo]` - Enable one or more repositories
- `--disablerepo=[repo]` - Disable one or more repositories
- `--obsoletes` - Enable obsoletes processing during updates
- `--nogpgcheck` - Disable GPG signature checking
- `--noplugins` - Disable all plugins
- `--disableplugin=[plugin]` - Disable specific plugins
- `--enableplugin=[plugin]` - Enable specific plugins

### Download Options
- `--downloadonly` - Download packages only, don't install
- `--downloaddir=[dir]` - Specify directory to download packages
- `--resolve` - Resolve dependencies when downloading

### Package Selection Options
- `--showduplicates` - Show all versions of packages
- `--cacheonly` - Run from cache only, don't update metadata
- `--exclude=[package]` - Exclude package from operation

## Usage Examples

### Package Installation

```bash
# Install a package
yum install package_name

# Install multiple packages
yum install package1 package2 package3

# Install package without prompts
yum install -y package_name

# Install local RPM package with dependency resolution
yum localinstall /path/to/local.rpm

# Install from specific repository
yum install --enablerepo=epel package_name

# Install package without dependencies (not recommended)
yum install --nodeps package_name

# Install packages from URL
yum install http://example.com/package.rpm
```

### Package Updates and Upgrades

```bash
# Check for available updates
yum check-update

# Update all packages
yum update

# Update specific packages
yum update package1 package2

# Update security packages only
yum update --security

# Update bug fix packages only
yum update --bugfix

# Perform distribution upgrade
yum upgrade

# Skip broken packages during update
yum update --skip-broken
```

### Package Removal

```bash
# Remove a package (keep config files)
yum remove package_name

# Remove package and config files
yum erase package_name

# Remove package and dependencies
yum remove package_name --remove-leaves

# Remove package group
yum groupremove group_name

# Autoremove unused packages
yum autoremove
```

### Package Information and Search

```bash
# Search for packages
yum search keyword

# Search by package name
yum search name:package_name

# Search by summary
yum search summary:keyword

# Show package information
yum info package_name

# List all packages
yum list all

# List installed packages
yum list installed

# List available packages
yum list available

# List updates
yum list updates

# List recent packages
yum list recent

# Show package dependencies
yum deplist package_name

# Find which package provides a file
yum provides /path/to/file
```

### Package Group Management

```bash
# List available package groups
yum grouplist

# Show group information
yum groupinfo group_name

# Install package group
yum groupinstall group_name

# Install package group with optional packages
yum groupinstall group_name --with-optional

# Update package group
yum groupupdate group_name

# Remove package group
yum groupremove group_name

# Install group development tools
yum groupinstall "Development Tools"

# Install group with security tools
yum groupinstall "Security Tools"
```

### Repository Management

```bash
# List enabled repositories
yum repolist

# List all repositories (enabled and disabled)
yum repolist all

# Show repository information
yum repoinfo repository_name

# Clean package cache
yum clean all

# Clean metadata cache
yum clean metadata

# Clean packages cache
yum clean packages

# Clean headers cache
yum clean headers

# Clean expired cache
yum clean expire-cache

# Make cache (refresh repository metadata)
yum makecache
```

### Package History and Transactions

```bash
# Show transaction history
yum history

# Show transaction details
yum history info transaction_id

# Show transaction package list
yum history list transaction_id

# Undo a transaction
yum history undo transaction_id

# Redo a transaction
yum history redo transaction_id

# Rollback to specific transaction
yum history rollback transaction_id

# Show user transactions
yum history user

# Show package history
yum history package package_name

# Create transaction history
yum history new
```

## Practical Examples

### System Maintenance

```bash
# Complete system update and cleanup
yum update -y && yum autoremove -y && yum clean all

# Check system for updates
yum check-update

# Update security packages only
yum update --security -y

# Install all available bug fixes
yum update --bugfix -y

# Install all enhancement packages
yum update --enhancement -y

# Verify RPM database
yum check

# Rebuild RPM database
yum --rebuilddb
```

### Package Management Workflows

```bash
# Install package from specific repository
yum install --enablerepo=rpmforge package_name

# Install package excluding specific repository
yum install --disablerepo=updates package_name

# Download package without installing
yum download --downloaddir=/tmp package_name

# Download package and dependencies
yum download --resolve package_name

# Install package ignoring GPG check
yum install --nogpgcheck package_name

# Install package in specific directory
yum install --installroot=/opt/chroot package_name

# Install package with custom configuration
yum install -c /etc/yum/custom.conf package_name
```

### Dependency Resolution

```bash
# Show package dependencies
yum deplist package_name

# Resolve dependency issues
yum resolve-dep dependency_name

# Find packages requiring specific dependency
yum resolvedep package_name

# Install build dependencies
yum-builddep package_name

# Check for dependency conflicts
yum check
```

### Repository Configuration

```bash
# Add new repository
yum-config-manager --add-repo http://repo.example.com/repo.repo

# Enable repository
yum-config-manager --enable repository_name

# Disable repository
yum-config-manager --disable repository_name

# Show repository configuration
yum-config-manager --showduplicates

# Export repository configuration
yum-config-manager --export filename.repo
```

### Advanced Package Operations

```bash
# Downgrade package to previous version
yum downgrade package_name

# Reinstall package
yum reinstall package_name

# Verify package installation
yum verify package_name

# Check package signatures
yum check-signature package_name

# Show package changelog
yum changelog package_name

# Show package files (requires yum-utils)
repoquery --list package_name

# Find packages that own specific file
yum whatprovides /path/to/file
```

### Plugin Usage

```bash
# Install yum plugins
yum install yum-plugin-fastestmirror
yum install yum-plugin-security
yum install yum-plugin-versionlock

# Use fastest mirror plugin
yum update --enableplugin=fastestmirror

# Lock package version
yum versionlock add package_name
yum versionlock delete package_name
yum versionlock list

# Use security plugin for security updates
yum update --security

# Use versionlock plugin to prevent updates
yum update --disableplugin=versionlock
```

### Performance Optimization

```bash
# Use fastest mirror plugin
yum install yum-plugin-fastestmirror
yum update

# Configure parallel downloads
yum update --setopt=tsflags=nodocs

# Use multilib_policy=best for 32-bit libraries
yum install --setopt=multilib_policy=best package_name

# Exclude packages from update
yum update --exclude=kernel* --exclude=glibc*

# Use timeout and retries
yum update --timeout=30 --retries=3
```

### Debugging and Troubleshooting

```bash
# Enable verbose output for debugging
yum update -v

# Show all available options
yum --help

# Check yum configuration
yum-config-manager --dump

# Show plugin information
yum --noplugins info

# Test repository connectivity
yum repolist -v

# Check GPG key information
yum gpgkeyinfo repository_name

# Force metadata refresh
yum makecache --refresh
```

### Backup and Recovery

```bash
# Backup yum configuration
cp -r /etc/yum /etc/yum.backup

# Backup installed packages list
rpm -qa > installed_packages.txt

# Restore packages from backup
yum install $(cat installed_packages.txt)

# Export repository list
yum repolist > repositories.txt
```

## Related Commands

- `rpm` - Low-level RPM package manager
- `repoquery` - Query RPM repositories
- `yum-config-manager` - Manage yum repositories
- `yum-builddep` - Install build dependencies
- `yumdownloader` - Download RPM packages
- `yum-complete-transaction` - Complete incomplete transactions
- `yum-utils` - Additional yum utilities
- `dnf` - Successor to yum package manager

## Best Practices

### System Maintenance
1. Regularly run `yum check-update` to monitor available updates
2. Schedule system updates during maintenance windows
3. Test updates on development systems before production deployment
4. Always backup important data before major system updates
5. Use `yum history` to track and rollback changes when needed

### Package Management
1. Use package groups for installing related software collections
2. Enable GPG signature checking for security (`yum install --nogpgcheck` only when necessary)
3. Use `yum clean all` regularly to free up disk space
4. Consider using `yum update --security` for critical security updates
5. Use `yum whatprovides` to find packages that provide specific files

### Repository Management
1. Configure trusted repositories only
2. Use stable, official repositories whenever possible
3. Test new repositories before enabling them system-wide
4. Use repository priorities for mixed-source environments
5. Regularly update repository metadata with `yum makecache`

### Performance Optimization
1. Install and configure `yum-plugin-fastestmirror` for optimal download speeds
2. Configure appropriate timeout and retry settings
3. Use `yum --cacheonly` for operations on slow networks
4. Limit bandwidth usage if necessary with system-wide settings
5. Use parallel downloads where supported

### Security Considerations
1. Always verify GPG signatures before package installation
2. Keep the system updated with security patches
3. Use `yum update --security` to prioritize security updates
4. Regularly review `yum history` for unauthorized changes
5. Consider using `yum-plugin-security` for enhanced security management

The `yum` package manager provides robust, dependency-aware package management for RPM-based Linux distributions, offering comprehensive tools for system maintenance, software installation, and repository management. While `dnf` is replacing `yum` in newer distributions, `yum` remains widely used in enterprise environments like RHEL/CentOS 7.