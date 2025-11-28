---
title: yum - Yellowdog Updater Modified
sidebar_label: yum
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# yum - Yellowdog Updater Modified

The `yum` command is a powerful, feature-rich package manager designed for RPM-based Linux distributions, including Red Hat Enterprise Linux (RHEL), CentOS, Fedora, Oracle Linux, and their derivatives. It provides an automated system for installing, updating, removing, and managing software packages while intelligently handling dependencies automatically. Yum uses repositories to manage software packages and supports features like transaction history, rollback capabilities, security updates, and plugin extensions.

## Basic Syntax

```bash
yum [OPTIONS] [COMMAND] [PACKAGE...]
```

## Primary Commands

### Package Management Commands
- `install` - Install one or more packages
- `update` - Update one or more packages
- `upgrade` - Upgrade packages, removing obsolete ones
- `check-update` - Check for available package updates
- `remove` - Remove one or more packages
- `erase` - Alias for remove
- `reinstall` - Reinstall a package
- `downgrade` - Downgrade a package to previous version

### Information Commands
- `info` - Display detailed information about packages
- `list` - List packages (installed, available, updates, etc.)
- `search` - Search package information for specific strings
- `provides` - Find which package provides a specific file or feature
- `whatprovides` - Alias for provides
- `deplist` - List package dependencies
- `groupinfo` - Display information about package groups

### Group Management Commands
- `grouplist` - List available package groups
- `groupinstall` - Install a package group
- `groupupdate` - Update a package group
- `groupremove` - Remove a package group

### Repository Commands
- `repolist` - Display configured repositories
- `repoinfo` - Display repository information
- `makecache` - Generate repository metadata cache

### Maintenance Commands
- `clean` - Clean up cached data
- `history` - Display transaction history
- `check` - Check for problems in the RPM database

## Comprehensive Options

### Global Options
- `-h, --help` - Display help information
- `-y, --assumeyes` - Assume "yes" to all prompts (non-interactive)
- `-q, --quiet` - Run with minimal output
- `-v, --verbose` - Run with verbose output
- `-d [level]` - Set debugging level (0-10)
- `-e [level]` - Set error level (0-10)
- `--version` - Display yum version and exit
- `--installroot=[path]` - Set alternative installation root directory
- `--config=[config]` - Use alternative configuration file
- `--rpmverbosity=[debug|info|warn|error]` - Set RPM verbosity level

### Repository Options
- `--enablerepo=[repo]` - Enable one or more repositories temporarily
- `--disablerepo=[repo]` - Disable one or more repositories temporarily
- `--repo=[repo]` - Enable only specified repository
- `--obsoletes` - Enable obsoletes processing during updates
- `--exclude=[package]` - Exclude package from all operations
- `--disableexcludes=[repo]` - disable exclude from repo

### Security Options
- `--nogpgcheck` - Disable GPG signature checking
- `--security` - Include security-related packages only
- `--bugfix` - Include bugfix packages only
- `--enhancement` - Include enhancement packages only
- `--cve=[cve]` - Include packages fixing specified CVE
- `--bz=[bz]` - Include packages fixing specified bugzilla

### Download Options
- `--downloadonly` - Download packages only, don't install
- `--downloaddir=[dir]` - Specify directory to download packages
- `--resolve` - Resolve dependencies when downloading
- `--url=[protocol]` - Use specified protocol for downloads

### Transaction Options
- `--skip-broken` - Skip packages with dependency problems
- `--setopt=[option=value]` - Set arbitrary config option
- `--color=[always|never|auto]` - Control whether output is colored
- `--downloadonly` - Download packages without installing

### Plugin Options
- `--noplugins` - Disable all plugins
- `--enableplugin=[plugin]` - Enable specific plugin
- `--disableplugin=[plugin]` - Disable specific plugin

### Package Selection Options
- `--showduplicates` - Show all versions of packages
- `--cacheonly` - Run from cache only, don't update metadata
- `--filter=[package]` - Filter packages by various criteria

## Usage Examples

### Basic Package Management

#### Package Installation
```bash
# Install single package
yum install nginx

# Install multiple packages at once
yum install nginx mysql-server php

# Install package non-interactively (auto-confirm all prompts)
yum install -y git

# Install local RPM file with dependency resolution
yum localinstall /path/to/custom-package.rpm

# Install package from URL
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

# Install package from specific repository
yum install --enablerepo=epel htop

# Install package with debug information
yum install --debuglevel=2 package_name

# Install package ignoring GPG checks (use with caution)
yum install --nogpgcheck unsigned-package.rpm

# Install package without dependencies (not recommended)
yum install --nodeps package_name

# Install package with custom configuration file
yum install -c /etc/yum/custom.conf package_name
```

#### Package Updates and Upgrades
```bash
# Check for available updates
yum check-update

# Update all installed packages
yum update -y

# Update specific packages
yum update nginx mysql

# Perform full system upgrade (removes obsolete packages)
yum upgrade

# Update security packages only
yum update --security

# Update packages fixing specific CVE
yum update --cve CVE-2021-44228

# Update packages fixing specific bugzilla
yum update --bz 1234567

# Update bug fixes only
yum update --bugfix

# Update enhancement packages only
yum update --enhancement

# Skip broken packages during update
yum update --skip-broken

# Update excluding certain packages
yum update --exclude=kernel* --exclude=glibc*

# Update with verbose output
yum update -v
```

#### Package Removal
```bash
# Remove package (keeps configuration files)
yum remove nginx

# Remove package and its configuration files
yum erase nginx

# Remove multiple packages
yum remove nginx mysql-server php

# Remove package and unused dependencies
yum remove package_name && yum autoremove

# Remove package group
yum groupremove "Web Server"

# Remove package without dependencies checks
yum remove --nodeps package_name

# Force removal (breaks dependencies)
yum remove --setopt=clean_requirements_on_remove=0 package_name
```

### Advanced Package Operations

#### Package Version Management
```bash
# Downgrade package to previous version
yum downgrade package_name

# Reinstall current package version
yum reinstall package_name

# List available versions of package
yum list --showduplicates package_name

# Install specific version
yum install package_name-2.4.6-1.el7

# Show package changelog
yum update --changelog package_name

# Verify package installation
yum verify package_name

# Check package files for modifications
yum verify --rpmverbosity=info package_name
```

#### Package Information and Search
```bash
# Search packages by keyword
yum search web server

# Search by package name only
yum search name:nginx

# Search by summary/description
yum search summary:database

# Show detailed package information
yum info nginx

# Show file listing for package
repoquery --list nginx

# Show package dependencies
yum deplist nginx

# Show reverse dependencies (what requires this package)
repoquery --whatrequires nginx

# Find which package provides specific file
yum provides /usr/bin/nginx

# Find packages that provide specific capability
yum provides "perl(DBI)"

# List all installed packages
yum list installed

# List available packages
yum list available

# List all packages (installed + available)
yum list all

# List recent updates
yum list recent

# List updates for installed packages
yum list updates

# List packages from specific repository
yum list --enablerepo=epel available
```

### Repository Management

#### Repository Configuration
```bash
# List enabled repositories
yum repolist

# List all repositories (enabled and disabled)
yum repolist all

# Show detailed repository information
yum repoinfo base

# Add new repository
yum-config-manager --add-repo http://mirror.example.com/repo.repo

# Enable repository
yum-config-manager --enable epel

# Disable repository
yum-config-manager --enable updates-testing
yum-config-manager --disable updates-testing

# Show repository priorities
yum repolist -v

# Export repository configuration
yum-config-manager --export my-repos.repo

# Test repository connectivity
yum repolist --refresh
```

#### Repository Operations
```bash
# Clean all cached data
yum clean all

# Clean metadata only
yum clean metadata

# Clean downloaded packages
yum clean packages

# Clean headers
yum clean headers

# Clean expired metadata
yum clean expire-cache

# Force refresh repository metadata
yum makecache --refresh

# Generate cache for specific repository
yum makecache --enablerepo=epel

# Clean dbcache
yum clean dbcache

# Remove plugin data
yum clean plugins
```

### Package Group Management

#### Group Installation and Management
```bash
# List available package groups
yum grouplist

# List all groups (including hidden)
yum grouplist hidden

# Show group information
yum groupinfo "Web Server"

# Install package group
yum groupinstall "Development Tools"

# Install group with optional packages
yum groupinstall "Web Server" --with-optional

# Update package group
yum groupupdate "Web Server"

# Remove package group
yum groupremove "Web Server"

# Install group from specific repository
yum groupinstall --enablerepo=epel "Additional Development"

# Show group categories
yum grouplist --verbose
```

### Transaction History and Rollback

#### History Management
```bash
# Show transaction history
yum history

# Show detailed transaction info
yum history info 15

# Show transaction package list
yum history list 15

# Undo specific transaction
yum history undo 15

# Redo transaction
yum history redo 15

# Rollback to specific transaction
yum history rollback 10

# Show transactions by package
yum history package nginx

# Show user transactions
yum history user

# Show transaction summary
yum history summary

# Force new history entry
yum history new

# Sync transaction history
yum history sync
```

### Security and Validation

#### Security Operations
```bash
# Install security updates only
yum update --security

# List security advisories
yum updateinfo list security

# Show advisory details
yum updateinfo info RHSA-2021:1234

# Apply specific advisory
yum update --advisory RHSA-2021:1234

# Check for security updates
yum check-update --security

# Verify GPG signatures on packages
yum check-signature package_name

# Import GPG key for repository
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
```

### Advanced Features and Plugins

#### Plugin Usage
```bash
# Install useful plugins
yum install yum-plugin-fastestmirror
yum install yum-plugin-security
yum install yum-plugin-versionlock
yum install yum-plugin-downloadonly

# Use fastest mirror plugin
yum update --enableplugin=fastestmirror

# Lock package version to prevent updates
yum versionlock add nginx
yum versionlock list
yum versionlock delete nginx

# Download packages only (don't install)
yum install --downloadonly --downloaddir=/tmp nginx

# Use download plugin
yumdownloader --source nginx

# Use config-manager plugin
yum-config-manager --add-repo custom.repo
```

#### Performance Optimization
```bash
# Enable parallel downloads
yum update --setopt=timeout=30

# Set retry count for downloads
yum update --setopt=retries=3

# Use specific bandwidth limit
yum update --setopt=bandwidth=1000k

# Disable documentation installation
yum install --setopt=tsflags=nodocs package_name

# Enable delta RPM processing
yum update --setopt=obsoletes=1

# Use multiple threads for metadata downloads
yum makecache --setopt=metadata_expire=0
```

## Practical Examples

### System Administration Workflows

#### Complete System Maintenance
```bash
#!/bin/bash
# Comprehensive system maintenance script

# Update package lists
echo "Updating package lists..."
yum makecache

# Check for security updates
echo "Checking for security updates..."
yum check-update --security

# Apply security updates
echo "Applying security updates..."
yum update --security -y

# Clean up old packages
echo "Cleaning up old packages..."
yum autoremove -y

# Clean package cache
echo "Cleaning package cache..."
yum clean all

# Verify system integrity
echo "Verifying system integrity..."
yum check

echo "System maintenance completed!"
```

#### Development Environment Setup
```bash
#!/bin/bash
# Setup complete development environment

# Install development tools group
yum groupinstall -y "Development Tools"

# Install additional development packages
yum install -y gcc gcc-c++ make cmake git vim

# Install version control
yum install -y subversion mercurial

# Install database clients
yum install -y mysql postgresql

# Enable EPEL repository
yum install -y epel-release

# Install useful tools from EPEL
yum install -y htop tree jq

# Clean up
yum clean all
```

#### Web Server Deployment
```bash
#!/bin/bash
# Deploy LAMP stack

# Install Apache web server
yum groupinstall -y "Web Server"
yum install -y httpd mod_ssl

# Install PHP and extensions
yum install -y php php-mysql php-gd php-xml php-mbstring

# Install MySQL/MariaDB
yum install -y mariadb-server mariadb

# Start and enable services
systemctl enable httpd mariadb
systemctl start httpd mariadb

# Configure firewall
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# Secure MySQL installation
mysql_secure_installation
```

### Troubleshooting and Debugging

#### Dependency Resolution Issues
```bash
# Check for dependency problems
yum check

# Debug dependency resolution
yum update --debuglevel=10

# Skip problematic packages
yum update --skip-broken

# Clear yum cache and retry
yum clean all
yum makecache

# Check package dependency tree
yum deplist problem-package

# Find conflicting packages
yum check-update --filter=conflicts

# Enable obsoletes processing
yum update --obsoletes
```

#### Repository Issues
```bash
# Test repository connectivity
yum repolist -v

# Check GPG keys
rpm -qa gpg-pubkey*
rpm -qi gpg-pubkey-key-name

# Rebuild RPM database
rpm --rebuilddb

# Clear specific repository cache
yum clean metadata --enablerepo=problematic-repo

# Force metadata refresh
yum makecache --refresh --enablerepo=problematic-repo

# Test with custom config
yum repolist -c /etc/yum.conf.test
```

#### Performance Issues
```bash
# Use fastest mirror plugin
yum install -y yum-plugin-fastestmirror

# Test mirror speeds
yum repolist --verbose

# Increase timeout for slow connections
yum update --timeout=300 --retries=5

# Use parallel downloads
yum update --setopt=throttle=5m

# Disable plugins to troubleshoot
yum update --noplugins

# Monitor yum performance
time yum check-update
```

### Automation and Scripting

#### Package Installation Automation
```bash
#!/bin/bash
# Automated package installation script

PACKAGES=(
    "nginx"
    "mysql-server"
    "php-fpm"
    "redis"
)

# Function to install package with error handling
install_package() {
    local package=$1

    echo "Installing $package..."

    if yum install -y $package; then
        echo "Successfully installed $package"
        return 0
    else
        echo "Failed to install $package"
        return 1
    fi
}

# Install all packages
for package in "${PACKAGES[@]}"; do
    if ! install_package "$package"; then
        echo "Installation failed for $package"
        exit 1
    fi
done

echo "All packages installed successfully!"
```

#### Backup and Recovery Automation
```bash
#!/bin/bash
# System backup automation

# Backup installed packages
echo "Backing up installed packages..."
rpm -qa | sort > /backup/installed_packages_$(date +%Y%m%d).txt

# Backup repository configuration
echo "Backing up repository configuration..."
cp -r /etc/yum.repos.d /backup/yum.repos.d_$(date +%Y%m%d)

# Create package list for restoration
echo "Creating package restoration list..."
yum list installed | awk '{print $1}' > /backup/package_list_$(date +%Y%m%d).txt

# Download packages for offline installation
echo "Downloading packages for offline backup..."
yumdownloader --destdir=/backup/rpms $(rpm -qa)

echo "Backup completed!"
```

#### Security Update Automation
```bash
#!/bin/bash
# Automated security update script

# Check for security updates
if yum check-update --security | grep -q "Security"; then
    echo "Security updates available"

    # Apply security updates
    yum update --security -y

    # Record update in log
    echo "$(date): Applied security updates" >> /var/log/security-updates.log

    # Restart critical services if needed
    systemctl restart httpd
    systemctl restart mysqld

    echo "Security updates applied successfully"
else
    echo "No security updates available"
fi
```

## Integration and Automation

### Shell Script Integration

#### Batch Package Management
```bash
#!/bin/bash
# Batch package management script

# Function to install packages from list
install_from_list() {
    local list_file=$1
    local packages=($(cat "$list_file"))

    for package in "${packages[@]}"; do
        if rpm -q "$package" >/dev/null 2>&1; then
            echo "$package is already installed"
        else
            echo "Installing $package..."
            yum install -y "$package"
        fi
    done
}

# Function to remove packages from list
remove_from_list() {
    local list_file=$1
    local packages=($(cat "$list_file"))

    for package in "${packages[@]}"; do
        if rpm -q "$package" >/dev/null 2>&1; then
            echo "Removing $package..."
            yum remove -y "$package"
        else
            echo "$package is not installed"
        fi
    done
}

# Usage examples
# install_from_list "required_packages.txt"
# remove_from_list "unwanted_packages.txt"
```

#### System Update Automation
```bash
#!/bin/bash
# Automated system update with rollback capability

LOG_FILE="/var/log/yum-auto-update.log"

# Log function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Check for updates
if yum check-update >/dev/null 2>&1; then
    log "Updates available, proceeding with update"

    # Create history checkpoint
    HISTORY_ID=$(yum history | head -1 | awk '{print $1}')
    log "Created history checkpoint: $HISTORY_ID"

    # Apply updates
    if yum update -y; then
        log "Updates applied successfully"

        # Reboot if kernel was updated
        if yum updateinfo list installed | grep -q "kernel"; then
            log "Kernel updated, scheduling reboot"
            shutdown -r +5 "System reboot scheduled for kernel update"
        fi
    else
        log "Update failed, rolling back"
        yum history undo "$HISTORY_ID" -y
    fi
else
    log "No updates available"
fi
```

### Cron Job Examples

#### Daily Security Updates
```bash
#!/bin/bash
# /etc/cron.daily/yum-security-update

LOG_FILE="/var/log/yum-security-updates.log"

# Apply security updates automatically
yum update --security -y >> "$LOG_FILE" 2>&1

# Log completion
echo "$(date): Security updates completed" >> "$LOG_FILE"

# Clean up old logs (keep last 7 days)
find /var/log -name "yum-security-updates.log*" -mtime +7 -delete
```

#### Weekly System Maintenance
```bash
#!/bin/bash
# /etc/cron.weekly/yum-maintenance

# Clean yum cache
yum clean all

# Update package metadata
yum makecache

# Check for updates
yum check-update > /tmp/yum-check-update.txt

# Email report if updates available
if [ -s /tmp/yum-check-update.txt ]; then
    mail -s "System Updates Available" admin@example.com < /tmp/yum-check-update.txt
fi

# Remove temporary file
rm -f /tmp/yum-check-update.txt
```

## Troubleshooting

### Common Issues and Solutions

#### Dependency Conflicts
```bash
# Identify conflicting packages
yum check

# Show dependency details
yum deplist conflicting-package

# Resolve conflicts by updating
yum update --skip-broken

# Remove problematic package
yum remove conflicting-package --setopt=clean_requirements_on_remove=0

# Use distro-sync to resolve major conflicts
yum distro-sync
```

#### Repository Issues
```bash
# Clear all caches
yum clean all

# Rebuild metadata
yum makecache --refresh

# Test individual repositories
yum repolist --enablerepo=base

# Check GPG keys
rpm -qa | grep gpg

# Import missing GPG keys
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-*
```

#### Network Issues
```bash
# Test with longer timeout
yum update --timeout=300 --retries=10

# Use specific proxy
yum update --setopt=proxy=http://proxy.example.com:8080

# Disable IPv6 if causing issues
yum update --setopt=ip_resolve=4

# Test with different mirror
yum update --enablerepo=base --disablerepo=updates
```

#### Performance Issues
```bash
# Enable fastest mirror
yum install -y yum-plugin-fastestmirror

# Limit bandwidth
yum update --setopt=throttle=1m

# Use parallel downloads
yum update --setopt=max_parallel_downloads=10

# Debug performance bottlenecks
yum update --debuglevel=2
```

### Error Recovery

#### Corrupted RPM Database
```bash
# Backup current database
cp -a /var/lib/rpm /var/lib/rpm.backup

# Rebuild database
rpm --rebuilddb

# Clear yum cache
yum clean all

# Verify database integrity
yum check
```

#### Incomplete Transactions
```bash
# Check for incomplete transactions
yum history list | grep "incomplete"

# Complete incomplete transactions
yum-complete-transaction

# Clean up orphaned transactions
yum-complete-transaction --cleanup-only
```

#### Locked Package Management
```bash
# Remove yum.pid if yum crashed
rm -f /var/run/yum.pid

# Kill stuck yum processes
pkill -f yum

# Check for other package managers
ps aux | grep -E "(yum|rpm|dnf)"
```

## Related Commands

### Core Package Management
- [`rpm`](/docs/commands/package-management/rpm) - Low-level RPM package manager
- [`dnf`](/docs/commands/package-management/dnf) - Modern successor to yum
- [`yum-config-manager`](/docs/commands/package-management/yum-config-manager) - Manage yum repositories
- [`yumdownloader`](/docs/commands/package-management/yumdownloader) - Download RPM packages

### Yum Utilities
- [`repoquery`](/docs/commands/package-management/repoquery) - Query RPM repositories
- [`yum-builddep`](/docs/commands/package-management/yum-builddep) - Install build dependencies
- [`yum-complete-transaction`](/docs/commands/package-management/yum-complete-transaction) - Complete incomplete transactions
- [`yum-utils`](/docs/commands/package-management/yum-utils) - Additional yum utilities

### Alternative Package Managers
- [`apt`](/docs/commands/package-management/apt) - Debian package manager
- [`pacman`](/docs/commands/package-management/pacman) - Arch Linux package manager
- [`zypper`](/docs/commands/package-management/zypper) - SUSE package manager

## Best Practices

### System Maintenance
1. **Regular Updates**: Schedule regular system updates during maintenance windows
2. **Security First**: Use `yum update --security` for critical security patches
3. **Testing**: Test updates in development environments before production deployment
4. **Backup**: Create system backups before major updates
5. **History Tracking**: Use `yum history` to track changes and enable rollbacks

### Package Management
1. **Dependency Awareness**: Let yum handle dependencies automatically
2. **Package Groups**: Use package groups for related software installations
3. **Clean Up**: Regularly run `yum clean all` to free disk space
4. **Version Control**: Use versionlock for critical packages that shouldn't auto-update
5. **Documentation**: Keep records of custom packages and configurations

### Repository Management
1. **Trusted Sources**: Only use official or trusted third-party repositories
2. **Priorities**: Configure repository priorities to prevent conflicts
3. **GPG Verification**: Always enable GPG signature checking
4. **Metadata Updates**: Regularly refresh repository metadata
5. **Backup Repos**: Maintain local mirrors for critical packages

### Performance Optimization
1. **Fastest Mirror**: Use `yum-plugin-fastestmirror` for optimal download speeds
2. **Parallel Downloads**: Enable parallel downloads for faster operations
3. **Bandwidth Management**: Use throttling for bandwidth-constrained environments
4. **Cache Management**: Configure appropriate cache expiration times
5. **Local Mirrors**: Set up local repositories for large deployments

### Security Considerations
1. **Regular Security Updates**: Apply security patches promptly
2. **GPG Verification**: Verify package signatures before installation
3. **Audit Trail**: Monitor `yum history` for unauthorized changes
4. **Isolation**: Use `--installroot` for chrooted installations
5. **Network Security**: Use secure repositories (HTTPS) when available

## Performance Tips

1. **Metadata Caching**: Use `yum makecache` to pre-download metadata
2. **Parallel Operations**: Configure parallel downloads for faster updates
3. **Delta RPMs**: Enable delta RPMs to reduce download sizes
4. **Fastest Mirror**: Automatically select the fastest repository mirror
5. **Local Repositories**: Set up local repositories for frequently used packages
6. **Exclude Lists**: Exclude large packages from regular updates
7. **Plugin Management**: Disable unnecessary plugins for faster operations
8. **Cache Optimization**: Tune cache settings based on system resources

The `yum` package manager is a powerful, mature tool that provides comprehensive package management capabilities for RPM-based Linux distributions. Its robust dependency resolution, transaction history, and extensive plugin ecosystem make it an essential tool for system administrators and developers managing enterprise Linux environments.