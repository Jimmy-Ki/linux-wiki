---
title: apt-get - Advanced Package Tool
sidebar_label: apt-get
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# apt-get - Advanced Package Tool

The `apt-get` command is a powerful command-line interface for the Advanced Package Tool (APT), the package management system used by Debian-based Linux distributions including Ubuntu, Debian, Linux Mint, and their derivatives. It provides a comprehensive suite of tools for installing, updating, removing, and managing software packages from configured repositories, with advanced features like dependency resolution, package pinning, and intelligent upgrade capabilities. apt-get is known for its robust dependency handling, efficient package retrieval, and extensive configuration options that make it the preferred tool for system administrators managing Debian-based systems.

## Basic Syntax

```bash
apt-get [OPTIONS] COMMAND [PACKAGE_NAME...]
```

## Common Commands

### Package Management
- `install PACKAGE` - Install new packages with dependencies
- `remove PACKAGE` - Remove packages (keep configuration files)
- `purge PACKAGE` - Remove packages and configuration files
- `update` - Refresh package lists from repositories
- `upgrade` - Upgrade all installed packages
- `dist-upgrade` - Intelligent system upgrade with dependency changes
- `autoremove` - Remove automatically installed packages no longer needed
- `source PACKAGE` - Download source code for package
- `build-dep PACKAGE` - Install build dependencies for package

### Maintenance and Utilities
- `clean` - Delete all downloaded package files from cache
- `autoclean` - Delete old downloaded package files
- `check` - Verify for broken dependencies
- `changelog PACKAGE` - Download and display changelog
- `download PACKAGE` - Download package without installing

## Common Options

### General Options
- `-h`, `--help` - Show help message and exit
- `-q`, `--quiet` - Quiet mode (minimal output)
- `-qq` - Even quieter mode (no output except errors)
- `-s`, `--dry-run`, `--simulate` - Simulate actions without making changes
- `-y`, `--yes`, `--assume-yes` - Assume yes to all prompts
- `-f`, `--fix-broken` - Attempt to fix broken dependencies
- `-m`, `--ignore-missing` - Continue despite missing packages
- `-u`, `--show-upgraded` - Show upgraded packages
- `-V`, `--verbose` - Show additional version information

### Package Selection Options
- `--install-recommends` - Install recommended packages (default)
- `--no-install-recommends` - Don't install recommended packages
- `--install-suggests` - Install suggested packages
- `--no-install-suggests` - Don't install suggested packages
- `--download-only` - Download packages without installing
- `--reinstall` - Reinstall packages

### Configuration Options
- `-c FILE`, `--config-file=FILE` - Use specific configuration file
- `-o OPTION=VALUE`, `--option=OPTION=VALUE` - Set configuration option
- `-t RELEASE`, `--target-release=RELEASE` - Set target release
- `--purge` - Use purge instead of remove
- `--auto-remove` - Remove auto-installed packages

### Output and Progress Options
- `--print-uris` - Show URIs of packages to be fetched
- `--trivial-only` - Perform only trivial operations
- `--no-list-cleanup` - Don't clean up obsolete package lists
- `--ignore-hold` - Ignore package holds

## Usage Examples

### Basic Package Operations

#### Installing Packages
```bash
# Install a single package
sudo apt-get install vim

# Install multiple packages
sudo apt-get install git curl wget tree

# Install specific version
sudo apt-get install nginx=1.18.0-0ubuntu1

# Install without recommended packages
sudo apt-get install --no-install-recommends package-name

# Install only essential packages (no suggests or recommends)
sudo apt-get install --no-install-recommends --no-install-suggests package-name

# Reinstall a package
sudo apt-get install --reinstall package-name

# Install from specific repository
sudo apt-get install -t testing package-name

# Install package and its build dependencies
sudo apt-get build-dep package-name
```

#### Updating and Upgrading
```bash
# Update package lists
sudo apt-get update

# Upgrade all packages (safe upgrades only)
sudo apt-get upgrade

# Full system upgrade with dependency changes
sudo apt-get dist-upgrade

# Show what would be upgraded
sudo apt-get upgrade --dry-run

# Upgrade with verbose output
sudo apt-get upgrade -V

# Safe upgrade with automatic yes
sudo apt-get upgrade -y

# Upgrade from specific release
sudo apt-get upgrade -t stable
```

#### Removing Packages
```bash
# Remove package (keep configuration)
sudo apt-get remove package-name

# Remove package and configuration files
sudo apt-get purge package-name

# Remove package and auto-installed dependencies
sudo apt-get autoremove package-name

# Force remove without dependency checks
sudo apt-get remove --ignore-depends package-name

# Remove package but keep dependencies
sudo apt-get remove --auto-remove=false package-name
```

### Advanced Package Management

#### Package Information and Search
```bash
# Show package information
apt-cache show package-name

# Show detailed package information with versions
apt-cache showpkg package-name

# Show package statistics
apt-cache stats

# Search for packages by name or description
apt-cache search keyword

# Search only package names
apt-cache search --names-only keyword

# Show package dependencies
apt-cache depends package-name

# Show reverse dependencies
apt-cache rdepends package-name

# Show which package provides a file
apt-cache search "/path/to/file"

# List all packages
apt-cache pkgnames
```

#### Package Versions and Policies
```bash
# Show package policy (available versions and priorities)
apt-cache policy package-name

# Show all versions of a package
apt-cache madison package-name

# Check which packages are upgradable
apt list --upgradable

# Show installed and available versions
apt-cache policy package-name | grep -E "(Installed|Candidate)"

# Show packages from specific origin
apt-cache policy | grep "o=Ubuntu"
```

### Source Code and Development

#### Working with Source Packages
```bash
# Download source code for package
apt-get source package-name

# Download source without building dependencies
apt-get source --download-only package-name

# Download source with verbose output
apt-get source -V package-name

# Download source to specific directory
apt-get source -t . package-name

# Install build dependencies
sudo apt-get build-dep package-name

# Build source package after download
apt-get source -b package-name

# Download and build without dependencies
apt-get source -b --download-only package-name
```

### Package State Management

#### Package Selections and States
```bash
# Show package selection states
dpkg --get-selections | grep package-name

# Put package on hold (prevent updates)
echo "package-name hold" | sudo dpkg --set-selections

# Remove hold from package
echo "package-name install" | sudo dpkg --set-selections

# Hold multiple packages
echo "package1 hold
package2 hold" | sudo dpkg --set-selections

# Show all held packages
dpkg --get-selections | grep hold

# Clear all selections
sudo dpkg --clear-selections
sudo apt-get dselect-upgrade
```

### Package Pinning and Preferences

#### Setting Package Priorities
```bash
# Create preferences file for package pinning
sudo nano /etc/apt/preferences.d/package-pin
```

**Example preferences file:**
```
# Keep package at specific version
Package: package-name
Pin: version 1.2.3-4
Pin-Priority: 1001

# Prefer packages from specific repository
Package: *
Pin: origin "archive.ubuntu.com"
Pin-Priority: 900

# Hold back specific packages from upgrade
Package: critical-package
Pin: release a=stable
Pin-Priority: -1
```

```bash
# Test preferences without applying
sudo apt-get -s install package-name

# Install with specific pin
sudo apt-get install -t testing package-name

# Show package pinning information
apt-cache policy package-name
```

## Practical Examples

### System Administration

#### Fresh System Setup
```bash
# Complete system update and setup
sudo apt-get update && sudo apt-get upgrade -y

# Install essential system tools
sudo apt-get install build-essential curl wget git vim htop

# Install development environment
sudo apt-get install python3 python3-pip python3-dev python3-venv
sudo apt-get install nodejs npm docker.io docker-compose

# Install system monitoring tools
sudo apt-get install iotop nethogs sysstat glances

# Clean up after installation
sudo apt-get autoremove -y && sudo apt-get autoclean
```

#### System Maintenance and Updates
```bash
# Automated system update script
#!/bin/bash
# Update system safely
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get autoremove -y
sudo apt-get autoclean

# Check for broken packages
sudo apt-get check

# Show update statistics
echo "Update completed on $(date)"
apt list --installed | wc -l | xargs echo "Total packages installed:"
```

#### Package Backup and Restore
```bash
# Backup list of installed packages
dpkg --get-selections > package-list.txt

# Restore packages on new system
sudo apt-get update
sudo apt-get install dselect
sudo dpkg --set-selections < package-list.txt
sudo apt-get dselect-upgrade

# Create comprehensive backup
apt-mark showauto > auto-packages.txt
apt-mark showmanual > manual-packages.txt
dpkg --get-selections > selections.txt
```

### Development Environment Setup

#### Python Development Environment
```bash
# Install Python development tools
sudo apt-get update
sudo apt-get install python3 python3-pip python3-dev python3-venv

# Install additional Python packages
sudo apt-get install python3-setuptools python3-wheel python3-distutils

# Install scientific computing packages
sudo apt-get install python3-numpy python3-scipy python3-matplotlib

# Install development tools
sudo apt-get install python3-black python3-flake8 python3-mypy
```

#### Web Development Environment
```bash
# Install LAMP stack
sudo apt-get install apache2 mysql-server php libapache2-mod-php

# Install Node.js development tools
sudo apt-get install nodejs npm
sudo npm install -g n
sudo n lts

# Install database tools
sudo apt-get install postgresql postgresql-contrib redis-server
```

#### Container and Virtualization
```bash
# Install Docker and related tools
sudo apt-get update
sudo apt-get install docker.io docker-compose podman

# Install virtualization tools
sudo apt-get install qemu-kvm libvirt-daemon-system virt-manager

# Install cloud tools
sudo apt-get install awscli terraform packer
```

### Security Management

#### Security Updates Management
```bash
# Install only security updates
sudo apt-get update
sudo apt-get upgrade -s | grep -i security
sudo apt-get install --only-upgrade $(apt-get -s upgrade | grep -i security | awk '{print $2}')

# Check for security vulnerabilities
apt list --upgradable | grep -i security

# Install unattended-upgrades for automatic security updates
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

#### Package Verification
```bash
# Verify package integrity
sudo apt-get install debsums
sudo debsums -a

# Check for modified configuration files
sudo apt-get install debsums
debsums -c

# Verify package signatures
sudo apt-get install debian-archive-keyring
gpg --list-keys /usr/share/keyrings/debian-archive-keyring.gpg
```

## Advanced Usage

### Repository Management

#### Sources Configuration
```bash
# Main sources list file
sudo nano /etc/apt/sources.list

# Additional repository files in
ls /etc/apt/sources.list.d/

# Add new repository
echo "deb http://archive.ubuntu.com/ubuntu/ focal main restricted" | sudo tee -a /etc/apt/sources.list

# Add repository with source packages
echo "deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted" | sudo tee -a /etc/apt/sources.list
```

**Example sources.list for Ubuntu 20.04 LTS:**
```
# Main repositories
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted universe multiverse

# Security updates
deb http://security.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse

# Source repositories
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
```

#### PPA Repository Management
```bash
# Add PPA repository
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update

# Remove PPA repository
sudo add-apt-repository --remove ppa:deadsnakes/ppa
sudo apt-get update

# List added PPAs
grep -r ^deb /etc/apt/sources.list.d/ | grep ppa
```

### Configuration Management

#### APT Configuration Files
```bash
# Main configuration directory
ls /etc/apt/

# Create custom configuration
sudo nano /etc/apt/apt.conf.d/99custom
```

**Example apt.conf configurations:**
```bash
# /etc/apt/apt.conf.d/99performance - Performance tuning
APT::Get::Assume-Yes "true";
APT::Get::Fix-Broken "true";
APT::Install-Recommends "false";
APT::Clean-Installed "true";
Acquire::Retries "3";
Acquire::http::Timeout "10";
Acquire::https::Timeout "10";

# /etc/apt/apt.conf.d/99proxy - Proxy configuration
Acquire::http::Proxy "http://proxy.example.com:8080/";
Acquire::https::Proxy "https://proxy.example.com:8080/";

# /etc/apt/apt.conf.d/99security - Security settings
APT::Get::AllowUnauthenticated "false";
Acquire::AllowInsecureRepositories "false";

# /etc/apt/apt.conf.d/99parallel - Parallel downloads
Acquire::QueueMode "host";
Acquire::Retries "3";
```

#### Package Preferences and Pinning
```bash
# Create preferences file
sudo nano /etc/apt/preferences.d/my-pin

# Global preferences file
sudo nano /etc/apt/preferences
```

**Example preferences file:**
```
Package: *
Pin: release a=stable
Pin-Priority: 900

Package: *
Pin: release a=testing
Pin-Priority: 400

Package: *
Pin: release a=unstable
Pin-Priority: 200

Package: nginx
Pin: version 1.18.0-0ubuntu1
Pin-Priority: 1001

Package: docker.io
Pin: origin "download.docker.com"
Pin-Priority: 900
```

### Package Selection and Automation

#### Advanced Package Selection
```bash
# Install packages with wildcard
sudo apt-get install "*-dev"

# Install packages from file list
sudo apt-get install $(cat packages.txt)

# Install all available upgrades
sudo apt-get dist-upgrade

# Install only specific upgrades
sudo apt-get install --only-upgrade package1 package2

# Mark packages as automatically installed
sudo apt-mark auto package-name

# Mark packages as manually installed
sudo apt-mark manual package-name
```

#### Batch Operations
```bash
# Remove all kernels except current one
sudo apt-get purge $(dpkg -l 'linux-*' | sed '/^ii/!d;/'"$(uname -r | sed "s/\(.*\)-\([^0-9]\+\)/\1/")"'/d;s/^[^ ]* [^ ]* \([^ ]*\).*/\1/;/[0-9]/!d')

# Remove orphaned packages
sudo apt-get autoremove --purge

# Clean everything
sudo apt-get clean
sudo apt-get autoremove
sudo apt-get autoclean
```

## Integration and Automation

### Shell Scripts for Package Management

#### Automated System Update Script
```bash
#!/bin/bash
# auto-update.sh - Comprehensive system update script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

log "Starting system update..."

# Update package lists
log "Updating package lists..."
if sudo apt-get update; then
    log "Package lists updated successfully"
else
    error "Failed to update package lists"
    exit 1
fi

# Check for broken packages
log "Checking for broken packages..."
if sudo apt-get check; then
    log "No broken packages found"
else
    warn "Broken packages detected, attempting to fix..."
    sudo apt-get install -f
fi

# Upgrade packages
log "Upgrading packages..."
if sudo apt-get upgrade -y; then
    log "Packages upgraded successfully"
else
    error "Package upgrade failed"
    exit 1
fi

# Distribution upgrade
log "Performing distribution upgrade..."
if sudo apt-get dist-upgrade -y; then
    log "Distribution upgrade completed"
else
    warn "Distribution upgrade had issues"
fi

# Remove obsolete packages
log "Removing obsolete packages..."
sudo apt-get autoremove -y
sudo apt-get autoclean

log "System update completed successfully"

# Show summary
echo "=== Update Summary ==="
echo "Packages updated: $(apt list --upgradable 2>/dev/null | wc -l)"
echo "Free disk space freed: $(df -h / | tail -1 | awk '{print $4}')"
```

#### Package Backup Script
```bash
#!/bin/bash
# backup-packages.sh - Backup installed packages

BACKUP_DIR="/backup/packages"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup package selections
dpkg --get-selections > "$BACKUP_DIR/packages_$DATE.txt"
apt-mark showauto > "$BACKUP_DIR/auto_$DATE.txt"
apt-mark showmanual > "$BACKUP_DIR/manual_$DATE.txt"

# Create restore script
cat > "$BACKUP_DIR/restore_$DATE.sh" << 'EOF'
#!/bin/bash
# Restore packages from backup

set -e

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file_prefix>"
    exit 1
fi

sudo apt-get update
sudo apt-get install dselect

# Restore package selections
sudo dpkg --set-selections < "${BACKUP_FILE}.txt"
sudo apt-get dselect-upgrade

# Restore auto/manual marks
sudo apt-mark auto $(cat "${BACKUP_FILE}_auto.txt")
sudo apt-mark manual $(cat "${BACKUP_FILE}_manual.txt")

echo "Package restoration completed"
EOF

chmod +x "$BACKUP_DIR/restore_$DATE.sh"

echo "Backup created in $BACKUP_DIR"
echo "To restore, run: sudo $BACKUP_DIR/restore_$DATE.sh $DATE"
```

### Monitoring and Reporting

#### Package Update Monitoring
```bash
#!/bin/bash
# monitor-updates.sh - Monitor available updates

# Check for available updates
AVAILABLE_UPDATES=$(apt list --upgradable 2>/dev/null | wc -l)
SECURITY_UPDATES=$(apt-get -s upgrade | grep -i security | wc -l)

if [ "$AVAILABLE_UPDATES" -gt 0 ]; then
    echo "Available updates: $AVAILABLE_UPDATES"
    echo "Security updates: $SECURITY_UPDATES"

    if [ "$SECURITY_UPDATES" -gt 0 ]; then
        echo "CRITICAL: Security updates available!"
        apt-get -s upgrade | grep -i security
    fi

    # Send email notification (if configured)
    if command -v mail >/dev/null; then
        echo "$AVAILABLE_UPDATES updates available ($SECURITY_UPDATES security updates)" | \
            mail -s "System Updates Available" admin@example.com
    fi
else
    echo "System is up to date"
fi
```

## Troubleshooting

### Common Issues and Solutions

#### Package Dependency Problems
```bash
# Fix broken dependencies
sudo apt-get install -f
sudo apt-get --fix-broken install

# Clear package cache and reupdate
sudo rm -rf /var/lib/apt/lists/*
sudo apt-get update

# Force installation with missing dependencies
sudo apt-get install --ignore-missing package-name

# Remove problematic package
sudo apt-get remove --purge package-name
sudo apt-get autoremove
```

#### Network and Repository Issues
```bash
# Test repository connectivity
wget -qO- http://archive.ubuntu.com/ubuntu/dists/focal/Release

# Clear proxy settings
unset http_proxy
unset https_proxy

# Force IPv4 or IPv6
sudo apt-get update -o Acquire::ForceIPv4=true
sudo apt-get update -o Acquire::ForceIPv6=true

# Change download timeout
sudo apt-get update -o Acquire::http::Timeout=30

# Use different mirror
sudo sed -i 's/archive.ubuntu.com/mirror.example.com/g' /etc/apt/sources.list
```

#### Lock File Issues
```bash
# Check for running APT processes
ps aux | grep apt

# Remove lock files (only if APT is not running)
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo rm /var/cache/apt/archives/lock

# Reconfigure packages
sudo dpkg --configure -a

# Fix interrupted installation
sudo apt-get install -f
```

#### Disk Space Issues
```bash
# Clean package cache
sudo apt-get clean
sudo apt-get autoclean

# Remove old kernels
sudo apt-get remove --purge $(dpkg -l 'linux-*' | sed '/^ii/!d;/'"$(uname -r | sed "s/\(.*\)-\([^0-9]\+\)/\1/")"'/d;s/^[^ ]* [^ ]* \([^ ]*\).*/\1/;/[0-9]/!d')

# Remove unused packages
sudo apt-get autoremove --purge

# Check disk usage
du -sh /var/cache/apt/
df -h /
```

#### Package Authentication Issues
```bash
# Update GPG keys
sudo apt-key update

# Import missing GPG key
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys KEY_ID

# Remove problematic key
sudo apt-key del KEY_ID

# Allow unauthenticated packages (not recommended)
sudo apt-get update --allow-unauthenticated

# Fix expired repository keys
sudo apt-get -o Acquire::AllowInsecureRepositories=true update
```

## Performance Optimization

### Speed Up Package Operations

#### Parallel Downloads and Caching
```bash
# Enable parallel downloads
echo "Acquire::QueueMode \"host\";" | sudo tee -a /etc/apt/apt.conf.d/99parallel
echo "Acquire::Retries \"3\";" | sudo tee -a /etc/apt/apt.conf.d/99parallel

# Configure persistent connections
echo "Acquire::http::Pipeline-Depth \"0\";" | sudo tee -a /etc/apt/apt.conf.d/99performance
echo "Acquire::http::ConnectionAttempts \"3\";" | sudo tee -a /etc/apt/apt.conf.d/99performance

# Set timeout values
echo "Acquire::http::Timeout \"10\";" | sudo tee -a /etc/apt/apt.conf.d/99performance
echo "Acquire::ftp::Timeout \"10\";" | sudo tee -a /etc/apt/apt.conf.d/99performance
```

#### Mirror Selection and Load Balancing
```bash
# Use fastest mirrors
sudo apt-get install netselect-apt
sudo netselect-apt -s -t 10 -c stable

# Configure mirror rotation in sources.list
echo "deb http://mirrors.list/ubuntu/ focal main" | sudo tee /etc/apt/sources.list.d/mirror.list

# Test mirror speed
for mirror in archive.ubuntu.com mirror.example.com; do
    time wget -q http://$mirror/ubuntu/dists/focal/Release -O /dev/null
done
```

### Alternative Tools and Interfaces

#### Modern APT Frontends
```bash
# Use apt (modern interface)
sudo apt update
sudo apt install package-name
sudo apt remove package-name

# Nala - Better output and performance
sudo apt-get install nala
sudo nala update
sudo nala install package-name

# Aptitude - Advanced dependency resolution
sudo apt-get install aptitude
sudo aptitude update
sudo aptitude install package-name
```

## Security Best Practices

### Secure Package Management

#### Repository Security
```bash
# Enable only authenticated repositories
echo "Acquire::AllowUnauthenticated \"false\";" | sudo tee /etc/apt/apt.conf.d/99security

# Verify repository signatures
sudo apt-get install debian-archive-keyring ubuntu-keyring
sudo apt-key list

# Use HTTPS repositories only
sudo sed -i 's/http:/https:/g' /etc/apt/sources.list
```

#### Package Verification
```bash
# Install verification tools
sudo apt-get install debsums apt-show-versions

# Verify installed packages
sudo debsums -a

# Check package versions
apt-show-versions -u

# Verify file integrity
dpkg -V package-name
```

#### Update Management
```bash
# Configure unattended security updates
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# Configure update intervals
echo "APT::Periodic::Update-Package-Lists \"1\";" | sudo tee /etc/apt/apt.conf.d/02periodic
echo "APT::Periodic::Download-Upgradeable-Packages \"1\";" | sudo tee -a /etc/apt/apt.conf.d/02periodic
echo "APT::Periodic::AutocleanInterval \"7\";" | sudo tee -a /etc/apt/apt.conf.d/02periodic
```

## Related Commands

- [`apt`](/docs/commands/package-management/apt) - Modern APT command-line interface
- [`apt-cache`](/docs/commands/package-management/apt-cache) - Package information utility
- [`apt-file`](/docs/commands/package-management/apt-file) - File contents search utility
- [`apt-key`](/docs/commands/package-management/apt-key) - APT key management utility
- [`apt-mark`](/docs/commands/package-management/apt-mark) - Package marking utility
- [`aptitude`](/docs/commands/package-management/aptitude) - Advanced package manager
- [`dpkg`](/docs/commands/package-management/dpkg) - Low-level package management tool
- [`dpkg-query`](/docs/commands/package-management/dpkg-query) - Package information query tool
- [`gdebi`](/docs/commands/package-management/gdebi) - Simple .deb package installer
- [`snap`](/docs/commands/package-management/snap) - Canonical's package manager
- [`flatpak`](/docs/commands/package-management/flatpak) - Universal application distribution

## Best Practices

1. **Always run `apt-get update`** before installing or upgrading packages
2. **Use `apt-get upgrade`** regularly for security updates and bug fixes
3. **Prefer `apt` over `apt-get`** for interactive use (better progress bars and colors)
4. **Use `--dry-run`** to preview actions before executing them
5. **Clean up regularly** with `autoremove` and `autoclean` to save disk space
6. **Pin critical packages** to prevent unwanted updates
7. **Backup system state** before major upgrades or package removals
8. **Verify package integrity** after installation using `debsums`
9. **Use HTTPS repositories** when available for better security
10. **Monitor update logs** for troubleshooting and audit purposes
11. **Test updates in staging environments** before applying to production
12. **Configure unattended security updates** for critical systems
13. **Use package pinning** to maintain specific versions for compatibility
14. **Keep documentation** of custom repositories and configurations
15. **Regularly check** for orphaned and unused packages

## Performance Tips

1. **Use fast mirrors** closer to your geographical location for better download speeds
2. **Enable parallel downloads** to utilize full bandwidth capacity
3. **Clean package cache** regularly to free up disk space and improve performance
4. **Use `--download-only`** when planning multiple installations to avoid repeated downloads
5. **Configure persistent connections** to reduce connection overhead
6. **Use package pinning** to avoid unnecessary dependency calculations
7. **Schedule updates** during off-peak hours to minimize system impact
8. **Use local mirrors** or caching proxies for multiple systems in the same network
9. **Disable recommended packages** when not needed to reduce download size
10. **Use SSD storage** for `/var/cache/apt` to improve package extraction performance

The `apt-get` command remains the backbone of Debian-based package management, offering robust dependency resolution, extensive configuration options, and reliable operation that has made it the preferred choice for system administrators and developers managing Linux distributions. Its comprehensive feature set and mature architecture provide the foundation for maintaining stable, secure, and up-to-date Linux systems.