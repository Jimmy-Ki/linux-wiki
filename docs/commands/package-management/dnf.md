---
title: dnf - Dandified YUM Package Manager
sidebar_label: dnf
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dnf - Dandified YUM Package Manager

The `dnf` command is a modern package manager for RPM-based Linux distributions, serving as the next-generation replacement for `yum`. It provides improved dependency resolution using the libsolv library, better performance through parallel downloads and caching, enhanced user experience with comprehensive history tracking, and robust plugin architecture. DNF maintains full compatibility with existing RPM packages and repositories while introducing advanced features like modular application streams, atomic transactions, and sophisticated rollback capabilities.

## Basic Syntax

```bash
dnf [GLOBAL_OPTIONS] COMMAND [COMMAND_OPTIONS] [PACKAGES...]
```

## Common Commands

- `install` - Install packages or package groups
- `update/upgrade` - Update packages or entire system
- `remove/erase` - Remove installed packages
- `downgrade` - Downgrade packages to previous versions
- `reinstall` - Reinstall installed packages
- `distro-sync` - Synchronize installed packages with repositories
- `search` - Search package information and metadata
- `info` - Display detailed package information
- `list` - List packages (installed, available, updates)
- `provides/whatprovides` - Find packages providing specific files/capabilities
- `check-update` - Check for available package updates
- `autoremove` - Remove automatically installed packages no longer needed
- `clean` - Clean cached data and metadata
- `repolist` - Display configured repositories
- `repoinfo` - Show repository information
- `makecache` - Generate repository metadata cache
- `history` - View, undo, or redo transactions
- `groupinstall/groupupdate/groupremove` - Manage package groups
- `module install/update/remove/reset` - Manage module streams

## Global Options

### Essential Global Options
- `-h, --help` - Display help information for commands
- `-v, --verbose` - Increase verbosity level for detailed output
- `-q, --quiet` - Suppress non-error output for automated scripts
- `-y, --assumeyes` - Automatically answer yes to all prompts
- `--assumeno` - Automatically answer no to all prompts
- `--best` - Use the best package version available in repositories
- `--best=all` - Use best packages from all enabled repositories
- `-C, --cacheonly` - Run entirely from system cache without network access
- `-c [config file]` - Use specified configuration file instead of default
- `--disableplugin=[plugin]` - Disable specific plugins by name (comma-separated)
- `--enableplugin=[plugin]` - Enable specific plugins by name
- `--noplugins` - Disable all plugins for current operation

### Repository and Cache Options
- `--enablerepo=[repo]` - Temporarily enable additional repositories
- `--disablerepo=[repo]` - Temporarily disable specific repositories
- `--repo=[repo]` - Enable only specified repositories
- `--refresh` - Force refresh of repository metadata
- `--downloadonly` - Download packages without installing them
- `--url` - Print URLs for packages instead of downloading
- `--arch=[arch]` - Only consider packages of specific architecture
- `--ignorearch` - Ignore architecture compatibility

### Performance and Network Options
- `--setopt=option=value` - Set arbitrary configuration option temporarily
- `--timeout=[seconds]` - Set network timeout duration
- `--retries=[count]` - Set number of retry attempts
- `--countme` - Add countme flag for repository statistics
- `--comment=[text]` - Add comment to transaction history
- `--downloadonly` - Only download packages, don't install
- `--skip-broken` - Skip packages with broken dependencies

### Security and Verification Options
- `--gpgcheck` - Enable GPG signature verification
- `--nogpgcheck` - Disable GPG signature verification
- `--nodocs` - Install packages without documentation files
- `--installroot=[path]` - Set alternative install root directory
- `--releasever=[version]` - Override release version for repositories

## Usage Examples

### Basic Package Management

#### Package Installation
```bash
# Install a single package with confirmation prompts
dnf install package_name

# Install multiple packages in one transaction
dnf install package1 package2 package3

# Install packages without any prompts (useful for scripts)
dnf install -y package_name

# Install packages with automatic yes to all prompts
dnf install --assumeyes package_name

# Install specific package version
dnf install package_name-1.2.3-1.el8

# Install package from specific architecture
dnf install package_name.x86_64

# Install package without documentation to save space
dnf install --nodocs package_name

# Install local RPM file with dependency resolution
dnf install /path/to/local.rpm

# Install package from specific repository only
dnf install --enablerepo=epel-testing package_name

# Install package excluding specific repositories
dnf install --disablerepo=updates package_name
```

#### Package Updates and System Maintenance
```bash
# Update specific packages
dnf update package_name
dnf upgrade package_name

# Update all packages on the system
dnf update
dnf upgrade

# Perform full system upgrade (including major version changes)
dnf distro-sync

# Check for available updates without installing
dnf check-update

# Install security updates only
dnf update --security

# Install bug fixes only
dnf update --bugfix

# Install enhancement packages only
dnf update --enhancement

# Update packages for specific advisory
dnf update --advisory=RHSA-2023:1234

# Update packages for specific CVE
dnf update --cve=CVE-2023-1234

# Update packages with automatic conflict resolution
dnf update --allowerasing

# Update packages and skip broken dependencies
dnf update --skip-broken

# Update packages from cache only
dnf update --cacheonly

# Update packages with forced metadata refresh
dnf update --refresh
```

#### Package Removal and Cleanup
```bash
# Remove a single package
dnf remove package_name

# Remove multiple packages in one transaction
dnf remove package1 package2 package3

# Remove package and all dependencies that are no longer needed
dnf autoremove package_name

# Remove package and all packages that depend on it
dnf remove package_name --allowerasing

# Remove package without dependency checking (dangerous)
dnf remove --nodeps package_name

# Remove package without prompting
dnf remove -y package_name

# Remove orphaned packages (leaves)
dnf autoremove

# Clean all cached data
dnf clean all

# Clean only metadata cache
dnf clean metadata

# Clean only package cache
dnf clean packages

# Clean expired cache
dnf clean expire-cache
```

### Package Information and Search

#### Basic Search Operations
```bash
# Search for packages by keyword
dnf search keyword

# Search by package name only
dnf search name:package_name

# Search by package summary
dnf search summary:keyword

# Search by package description
dnf search description:keyword

# Show detailed package information
dnf info package_name

# Show package information including dependencies
dnf info --requires package_name

# Show package information including what it provides
dnf info --provides package_name

# Show package information including conflicts
dnf info --conflicts package_name

# Show package changelog
dnf changelog package_name

# Show what provides a specific file
dnf provides /path/to/file

# Show what provides a specific capability
dnf provides libssl.so.1.1
```

#### Advanced Search and Query Operations
```bash
# Find all packages providing specific command
dnf provides */command_name

# Search for packages with specific requirements
dnf repoquery --whatrequires libssl.so.1.1

# Search for packages that require specific package
dnf repoquery --whatrequires package_name

# Search for packages that conflict with specific package
dnf repoquery --whatconflicts package_name

# Search packages by file patterns
dnf repoquery --file /etc/*.conf

# Show package files
dnf repoquery --list package_name

# Show package dependencies
dnf repoquery --requires package_name

# Show package weak dependencies (recommends, suggests)
dnf repoquery --recommends package_name
dnf repoquery --suggests package_name

# Show all packages from specific repository
dnf repoquery --repoid=epel

# Show package sizes
dnf repoquery --qf "%{name}: %{size}" package_name

# Show package license information
dnf repoquery --qf "%{name}: %{license}" package_name

# Show recently added packages
dnf history list | head -10
```

### Package Listing and Filtering

#### Package Listing Operations
```bash
# Show all installed packages
dnf list installed

# Show all available packages
dnf list available

# Show all packages (installed + available)
dnf list all

# Show recently installed packages
dnf list installed --recent

# Show packages matching pattern
dnf list package*

# Show packages from specific repository
dnf list --enablerepo=epel available

# Show packages with specific architecture
dnf list *.x86_64

# Show available updates
dnf list updates

# Show security updates
dnf list updates --security

# Show package sizes
dnf list --showduplicates package_name

# Show installed packages with versions
dnf list installed package_name

# Show available packages with duplicates
dnf list available --showduplicates package_name

# Show obsoleted packages
dnf list obsoletes

# Show extras (packages not from repositories)
dnf list extras
```

### Repository Management

#### Repository Information and Operations
```bash
# List enabled repositories
dnf repolist

# List all repositories (enabled and disabled)
dnf repolist all

# Show repository information
dnf repoinfo repository_name

# Show detailed repository information
dnf repoinfo --verbose repository_name

# List repositories with their priority
dnf repolist --verbose

# List repositories with their base URLs
dnf repolist --baseurl

# Show repository synchronization status
dnf repolist --all --sync

# Refresh repository metadata
dnf makecache --refresh

# Make cache for all repositories
dnf makecache

# Make cache for specific repositories
dnf makecache --enablerepo=epel

# Make cache with timer for automatic updates
dnf makecache --timer
```

#### Repository Configuration and Management
```bash
# Add new repository from URL
dnf config-manager --add-repo https://repo.example.com/repo.repo

# Enable repository
dnf config-manager --enable repository_name

# Disable repository
dnf config-manager --disable repository_name

# Set repository priority
dnf config-manager --setopt=repository_name.priority=10

# Set repository bandwidth limit
dnf config-manager --setopt=repository_name.bandwidth=1m

# Set repository timeout
dnf config-manager --setopt=repository_name.timeout=30

# Set repository proxy
dnf config-manager --setopt=repository_name.proxy=http://proxy.example.com:8080

# Enable fastest mirror for repository
dnf config-manager --setopt=repository_name.fastestmirror=True

# Enable GPG check for repository
dnf config-manager --setopt=repository_name.gpgcheck=1

# Set repository GPG key URL
dnf config-manager --setopt=repository_name.gpgkey=https://repo.example.com/RPM-GPG-KEY

# Show repository configuration
dnf config-manager --print-config
```

### Package Group Management

#### Group Operations
```bash
# List available package groups
dnf grouplist

# Show all groups including hidden
dnf grouplist --hidden

# Show group information
dnf groupinfo group_name

# Install package group
dnf groupinstall group_name

# Install package group with optional packages
dnf groupinstall group_name --with-optional

# Install package group without optional packages
dnf groupinstall group_name --setopt=group_package_types=mandatory,default

# Upgrade package group
dnf groupupdate group_name

# Upgrade all installed groups
dnf groupupdate

# Remove package group
dnf groupremove group_name

# Remove package group but keep individual packages
dnf groupremove group_name --noautoremove

# Search for groups
dnf grouplist | grep keyword

# List groups from specific repository
dnf grouplist --enablerepo=epel
```

### History and Transaction Management

#### History Operations and Analysis
```bash
# Show transaction history
dnf history

# Show transaction history with details
dnf history list

# Show transaction history with more details
dnf history list --info

# Show transaction history for specific user
dnf history user

# Show transaction history for specific package
dnf history package package_name

# Show transaction details
dnf history info transaction_id

# Show transaction package list
dnf history list transaction_id

# Show transaction with specific date range
dnf history list --from=2023-01-01 --to=2023-12-31

# Show last 10 transactions
dnf history list --last=10

# Show transaction summary
dnf history summary

# Show transaction statistics
dnf history stats
```

#### Transaction Manipulation and Recovery
```bash
# Undo a transaction
dnf history undo transaction_id

# Redo a transaction
dnf history redo transaction_id

# Rollback to specific transaction
dnf history rollback transaction_id

# Rollback to specific date
dnf history rollback --from=2023-01-01

# Rollback to last successful transaction
dnf history rollback last

# Show transaction before undo
dnf history undo transaction_id --dry-run

# Show transaction before rollback
dnf history rollback transaction_id --dry-run

# Undo transaction without dependency check
dnf history undo transaction_id --nodeps

# Undo transaction with automatic yes
dnf history undo transaction_id -y

# Clear history
dnf history clear

# Create history database backup
cp /var/lib/dnf/history.sqlite /root/history_backup.sqlite
```

## Practical Examples

### System Administration

#### System Update Workflows
```bash
# Complete system update workflow with verification
dnf check-update && \
dnf update -y && \
dnf autoremove -y && \
dnf clean all && \
dnf verify all

# Safe system update with backup and rollback
dnf history list && \
dnf update && \
dnf verify all && \
echo "Update completed successfully"

# Staging update workflow
dnf update --downloadonly && \
dnf check-downloaded && \
dnf update && \
systemctl reboot

# Security-only update workflow
dnf update --security -y && \
dnf autoremove -y && \
dnf history list | tail -5
```

#### Package Installation Workflows
```bash
# Install development environment
dnf groupinstall "Development Tools" -y && \
dnf install python3-devel nodejs npm git -y && \
dnf clean all

# Install web server stack
dnf install httpd php php-mysqlnd mariadb-server -y && \
systemctl enable httpd mariadb && \
systemctl start httpd mariadb

# Install package from specific repository with priority
dnf install --disablerepo="*" --enablerepo=epel-testing package_name -y

# Install package with specific architecture
dnf install package_name.x86_64 --setopt=exclude=*.i686
```

#### System Maintenance and Cleanup
```bash
# Comprehensive system cleanup
dnf autoremove -y && \
dnf clean all && \
dnf repolist && \
dnf history list | tail -10

# Remove orphaned packages and clean cache
dnf autoremove -y && \
dnf clean packages && \
dnf clean metadata && \
echo "System cleanup completed"

# Backup critical system packages
dnf history list | grep -E "(Install|Update)" | head -20 > /root/package_history.txt

# Check system integrity
dnf check && \
dnf verify all | grep -i failed
```

### Development Workflow

#### Development Environment Setup
```bash
# Install build dependencies for package
dnf builddep package_name -y

# Install development tools and libraries
dnf groupinstall "Development Tools" -y && \
dnf install gcc-c++ make cmake git vim -y && \
dnf install python3-devel python3-pip -y

# Install specific development packages
dnf install --enablerepo=crb development_package -y

# Setup PHP development environment
dnf module install php:8.1 -y && \
dnf install php-cli php-fpm php-mysqlnd php-json -y
```

#### Package Testing and Verification
```bash
# Download package for testing
dnf download --source package_name

# Verify package integrity
dnf verify package_name

# Check package dependencies before installation
dnf repoquery --requires package_name

# Test package installation without installing
dnf install package_name --downloadonly --downloadonly
```

#### Repository Management for Development
```bash
# Add development repository
dnf config-manager --add-repo https://copr.fedorainfracloud.org/coprs/user/repo/repo.repo

# Enable testing repository
dnf config-manager --enable testing-repo

# Install development version
dnf install --enablerepo=testing-repo package_name
```

### Server Management

#### Server Update Management
```bash
# Schedule updates during maintenance window
dnf update --downloadonly && \
echo "Updates downloaded, will install during maintenance window"

# Install updates with automatic reboot if needed
dnf update -y && \
if [ $? -eq 0 ]; then
    echo "Updates installed successfully"
    needs-restarting -r && systemctl reboot
fi

# Check for security updates
dnf update --security --info
```

#### Package Audit and Security
```bash
# Check for vulnerable packages
dnf updateinfo list security

# Show security advisories
dnf updateinfo info

# Install security updates only
dnf update --security -y

# Check GPG signatures of installed packages
rpm -qa --qf "%{name}-%{version}-%{release}.%{arch} -> %{pgpsig}\n"
```

#### Performance Optimization
```bash
# Optimize repository downloads
dnf config-manager --setopt=fastestmirror=True && \
dnf config-manager --setopt=max_parallel_downloads=5

# Clean up old packages to free space
dnf autoremove -y && \
dnf clean all

# Cache repositories for offline use
dnf makecache && \
echo "Repositories cached for offline use"
```

## Advanced Usage

### Modularity and Application Streams

#### Module Operations (RHEL/CentOS 8+ and Fedora)
```bash
# List available modules
dnf module list

# Show module streams
dnf module list module_name

# Show module information
dnf module info module_name:stream

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

# List all module profiles
dnf module info module_name --profile

# Install module with specific profile
dnf module install module_name:stream/profile_name
```

### Package Verification and Security

#### Security Operations
```bash
# Verify installed packages
dnf verify package_name

# Verify all installed packages
dnf verify all

# Check for missing security updates
dnf updateinfo list security

# Show security advisory details
dnf updateinfo info RHSA-2023:1234

# Import GPG key
rpm --import /path/to/gpg-key

# Check package signatures
dnf check-update --refresh && \
echo "Repository signatures verified"
```

### Performance Optimization

#### Network and Caching Optimization
```bash
# Use multiple threads for downloads
dnf update --setopt=max_parallel_downloads=10

# Limit download speed
dnf update --setopt=bandwidth=1m

# Set custom timeout
dnf update --setopt=timeout=60

# Use fastest mirror
dnf install fastestmirror && \
dnf update --setopt=fastestmirror=True

# Cache management
dnf makecache --timer && \
dnf clean all --enablerepo=epel
```

#### Memory and Resource Management
```bash
# Set maximum memory for package manager
dnf update --setopt=metadata_expire=0

# Use specific configuration file
dnf -c /custom/dnf.conf update

# Run with minimal output
dnf update -q --assumeyes

# Disable plugins for faster operation
dnf update --noplugins
```

## Integration and Automation

### Shell Scripts

#### Automated System Update Script
```bash
#!/bin/bash
# Comprehensive system update with error handling

LOG_FILE="/var/log/system-update.log"
DATE=$(date +%Y-%m-%d_%H:%M:%S)

echo "[$DATE] Starting system update" >> $LOG_FILE

# Check for available updates
if dnf check-update > /dev/null 2>&1; then
    echo "[$DATE] Updates available, proceeding with installation" >> $LOG_FILE

    # Download updates first
    if dnf update --downloadonly -y; then
        echo "[$DATE] Updates downloaded successfully" >> $LOG_FILE

        # Install updates
        if dnf update -y; then
            echo "[$DATE] Updates installed successfully" >> $LOG_FILE

            # Remove unused packages
            dnf autoremove -y

            # Clean cache
            dnf clean all

            echo "[$DATE] System update completed successfully" >> $LOG_FILE
        else
            echo "[$DATE] ERROR: Update installation failed" >> $LOG_FILE
            exit 1
        fi
    else
        echo "[$DATE] ERROR: Download failed" >> $LOG_FILE
        exit 1
    fi
else
    echo "[$DATE] No updates available" >> $LOG_FILE
fi

exit 0
```

#### Package Installation Script
```bash
#!/bin/bash
# Install package with verification and rollback

PACKAGES="nginx php-fpm mariadb-server"
BACKUP_DIR="/backup/packages"

# Create backup directory
mkdir -p $BACKUP_DIR

# Save current package versions
for pkg in $PACKAGES; do
    if dnf list installed $pkg > /dev/null 2>&1; then
        dnf info $pkg > $BACKUP_DIR/${pkg}_info.txt
    fi
done

# Install packages
if dnf install -y $PACKAGES; then
    echo "Packages installed successfully"

    # Verify installation
    for pkg in $PACKAGES; do
        dnf verify $pkg || echo "Warning: $pkg verification failed"
    done

    # Get transaction ID for potential rollback
    TRANSACTION_ID=$(dnf history list | head -2 | tail -1 | awk '{print $1}')
    echo "Installation transaction ID: $TRANSACTION_ID"
    echo "To rollback: dnf history undo $TRANSACTION_ID"
else
    echo "Package installation failed"
    exit 1
fi
```

#### Repository Management Script
```bash
#!/bin/bash
# Repository health check and maintenance

REPO_LIST=$(dnf repolist --enabled | awk 'NR>1 {print $1}')
HEALTH_OK=0

for repo in $REPO_LIST; do
    echo "Checking repository: $repo"

    # Test repository connectivity
    if dnf repoinfo $repo > /dev/null 2>&1; then
        echo "✓ $repo is healthy"
        ((HEALTH_OK++))
    else
        echo "✗ $repo has issues"

        # Try to refresh repository
        dnf clean metadata --enablerepo=$repo
        dnf makecache --enablerepo=$repo

        # Recheck
        if dnf repoinfo $repo > /dev/null 2>&1; then
            echo "✓ $repo fixed after refresh"
            ((HEALTH_OK++))
        else
            echo "✗ $repo still problematic"
        fi
    fi
done

echo "Repository health check complete: $HEALTH_OK/$# repositories healthy"

# Clean up old cache
if [ $HEALTH_OK -eq $# ]; then
    dnf clean all
    echo "All repositories healthy, cache cleaned"
fi
```

## Troubleshooting

### Common Issues

#### Dependency Resolution Problems
```bash
# Check for broken dependencies
dnf check

# Skip broken packages to proceed
dnf update --skip-broken

# Force installation with dependency resolution
dnf install --allowerasing package_name

# Reset all packages to repository versions
dnf distro-sync

# Clear all caches and retry
dnf clean all && dnf makecache && dnf update
```

#### Repository Issues
```bash
# Clear specific repository cache
dnf clean all --enablerepo=problematic-repo

# Rebuild repository cache
dnf makecache --refresh

# Check repository configuration
dnf repoinfo problematic-repo

# Temporarily disable problematic repository
dnf update --disablerepo=problematic-repo

# Test with minimal configuration
dnf update --noplugins
```

#### Network and Performance Issues
```bash
# Test with longer timeout
dnf update --timeout=120

# Limit parallel downloads
dnf update --setopt=max_parallel_downloads=1

# Use different mirror
dnf config-manager --setopt=baseurl=http://alternate-mirror.example.com

# Download only first to test connectivity
dnf update --downloadonly

# Run with verbose output for debugging
dnf update --verbose
```

#### Transaction and History Issues
```bash
# Show recent transactions
dnf history list --last=10

# Check if transaction was successful
dnf history info transaction_id

# Undo problematic transaction
dnf history undo transaction_id

# Rollback to known good state
dnf history rollback good_transaction_id

# Create fresh history database
dnf history clear
```

## Related Commands

- [`yum`](/docs/commands/package-management/yum) - Legacy package manager (dnf replacement)
- [`rpm`](/docs/commands/package-management/rpm) - Low-level RPM package manager
- [`rpm2cpio`](/docs/commands/package-management/rpm2cpio) - Convert RPM to cpio archive
- [`createrepo`](/docs/commands/package-management/createrepo) - Create RPM repositories
- [`reposync`](/docs/commands/package-management/reposync) - Synchronize repositories
- [`dnf5`](/docs/commands/package-management/dnf5) - Next-generation DNF implementation
- [`repoquery`](/docs/commands/package-management/repoquery) - Query RPM repositories
- [`rpmquery`](/docs/commands/package-management/rpmquery) - Query installed RPMs

## Best Practices

### System Updates
1. **Regular Updates**: Use `dnf check-update` daily to monitor available updates
2. **Security First**: Prioritize security updates with `dnf update --security`
3. **Testing Environment**: Test updates in staging before production deployment
4. **Backup Strategy**: Always backup critical data before major updates
5. **Update Windows**: Schedule updates during planned maintenance windows
6. **History Tracking**: Review `dnf history` regularly for unauthorized changes
7. **Rollback Planning**: Know how to rollback problematic updates with history commands

### Package Management
1. **Group Installation**: Use package groups for related software installations
2. **Dependency Management**: Regularly run `dnf autoremove` to clean up unused packages
3. **Repository Control**: Enable repositories only when needed with `--enablerepo`
4. **Version Pinning**: Use specific versions for stability-critical environments
5. **Documentation**: Keep package lists for reproducible system builds
6. **Verification**: Always verify packages before installation with `dnf verify`
7. **Download Testing**: Use `--downloadonly` to test updates before installation

### Performance Optimization
1. **Caching Strategy**: Use `dnf makecache --timer` for automatic cache updates
2. **Parallel Downloads**: Configure appropriate parallel download settings
3. **Repository Priorities**: Set repository priorities for mixed-source environments
4. **Network Optimization**: Configure fastest mirror and appropriate timeouts
5. **Storage Management**: Regularly clean cache with `dnf clean all`
6. **Plugin Management**: Enable only necessary plugins for better performance
7. **Memory Usage**: Configure appropriate metadata expiration settings

### Security Considerations
1. **GPG Verification**: Always verify GPG signatures before installation
2. **Repository Trust**: Only use trusted and verified repositories
3. **Update Monitoring**: Regularly review security advisories with `dnf updateinfo`
4. **Access Control**: Limit package installation privileges to authorized users
5. **Audit Logging**: Monitor `dnf history` for unauthorized package changes
6. **Package Integrity**: Verify installed packages with `dnf verify all`
7. **Network Security**: Use HTTPS repositories whenever possible

The `dnf` command represents a significant advancement in RPM-based package management, providing modern dependency resolution, enhanced performance, comprehensive transaction tracking, and robust plugin architecture. Its sophisticated features like modular application streams, atomic transactions, and advanced rollback capabilities make it the preferred choice for modern Fedora, RHEL, CentOS, and compatible distributions.