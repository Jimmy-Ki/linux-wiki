---
title: dpkg - Debian Package Manager
sidebar_label: dpkg
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dpkg - Debian Package Manager

The `dpkg` command is the low-level package management utility for Debian-based Linux systems. It serves as the foundation for higher-level package managers like apt and aptitude, providing direct control over the installation, removal, and configuration of Debian packages (.deb files). dpkg handles the core package management operations including package installation, file extraction, dependency tracking, configuration management, and database maintenance. It operates directly on the dpkg database stored in `/var/lib/dpkg/` and is essential for system administration, troubleshooting, and automated package management scenarios.

## Basic Syntax

```bash
dpkg [OPTIONS] ACTION [PACKAGE_FILE|PACKAGE_NAME]
```

## Common Actions

### Package Management Actions
- `-i, --install <package_file>` - Install package file
- `-r, --remove <package_name>` - Remove package (keep config files)
- `-P, --purge <package_name>` - Remove package and config files
- `--unpack <package_file>` - Unpack package without configuration
- `--configure <package_name>` - Configure unpacked package
- `--configure --pending` - Configure all pending packages
- `--triggers-only` - Process triggers only

### Information Actions
- `-l, --list [pattern]` - List installed packages
- `-s, --status <package_name>` - Show package status
- `-L, --listfiles <package_name>` - List files installed by package
- `-S, --search <pattern>` - Find package owning file
- `-p, --print-avail <package_name>` - Show available package info
- `-I, --info <package_file>` - Show package file information
- `-c, --contents <package_file>` - List package contents

### Database Actions
- `--update-avail <package_file>` - Update available packages database
- `--merge-avail <package_file>` - Merge available packages
- `--clear-avail` - Clear available packages database
- `--forget-old-unavail` - Forget old unavailable packages

## Common Options

### Installation Options
- `-R, --recursive <directory>` - Recursively install packages
- `--force-all` - Force all operations (overrides conflicts)
- `--force-depends` - Ignore dependency problems
- `--force-overwrite` - Overwrite files from other packages
- `--force-confnew` - Always install new config files
- `--force-confold` - Always keep old config files
- `--force-confdef` - Use default configuration options
- `--instdir=<dir>` - Change installation directory
- `--root=<dir>` - Use alternative root directory
- `--admindir=<dir>` - Use alternative admin directory

### Removal Options
- `--force-remove-reinstreq` - Remove package even if required
- `--force-depends` - Remove despite dependency problems

### Output Options
- `--verbose` - Provide detailed output
- `--debug=<number>` - Enable debugging output
- `--no-pager` - Don't use pager for output
- `--license` - Show license information
- `--version` - Show version information
- `--help` - Show help information

### Selection Options
- `--get-selections` - Get package selections
- `--set-selections` - Set package selections
- `--clear-selections` - Clear selections

## Usage Examples

### Basic Package Installation

#### Installing Local Packages
```bash
# Install a single .deb package
sudo dpkg -i package_1.2.3_amd64.deb

# Install multiple packages at once
sudo dpkg -i package1.deb package2.deb package3.deb

# Install with verbose output
sudo dpkg -i --verbose package.deb

# Install package in custom directory
sudo dpkg --instdir=/opt/custom -i package.deb

# Install in chroot environment
sudo dpkg --root=/chroot/debian -i package.deb
```

#### Recursive Installation
```bash
# Install all .deb files in directory
sudo dpkg -R /path/to/debs/

# Install packages from multiple directories
sudo dpkg -R /downloads/debs/ /local/packages/

# Install with force overwrite for conflicts
sudo dpkg -R --force-overwrite /packages/
```

#### Handling Installation Issues
```bash
# Install ignoring dependency conflicts
sudo dpkg --force-depends -i package.deb

# Install with configuration conflicts resolution
sudo dpkg --force-confnew -i package.deb

# Install and keep existing configurations
sudo dpkg --force-confold -i package.deb

# Install with default options for conflicts
sudo dpkg --force-confdef -i package.deb
```

### Package Removal Operations

#### Basic Removal
```bash
# Remove package but keep configuration files
sudo dpkg -r package_name

# Remove package and all configuration files
sudo dpkg -P package_name

# Remove multiple packages
sudo dpkg -r package1 package2 package3

# Purge multiple packages
sudo dpkg -P package1 package2 package3
```

#### Force Removal
```bash
# Remove package despite dependency issues
sudo dpkg --force-depends -r package_name

# Remove even if marked required
sudo dpkg --force-remove-reinstreq -P package_name

# Remove broken package
sudo dpkg --force-all -P broken_package
```

### Package Information and Querying

#### Listing Packages
```bash
# List all installed packages
dpkg -l

# List packages matching pattern
dpkg -l '*python*'
dpkg -l 'apache*'

# List with specific status
dpkg -l | grep '^ii'  # Only installed packages
dpkg -l | grep '^rc'  # Removed but config files remain

# Count installed packages
dpkg -l | grep '^ii' | wc -l

# List packages by status
dpkg -l | awk '{print $1}' | sort | uniq -c
```

#### Package Status Information
```bash
# Show detailed package status
dpkg -s nginx

# Show specific status fields
dpkg -s nginx | grep -E "Version|Status|Architecture|Depends"

# Check if package is installed
dpkg -s package_name | grep -q "Status: install ok installed"

# Show package installation time
grep "install.*package_name" /var/log/dpkg.log
```

#### Package Files and Contents
```bash
# List all files installed by package
dpkg -L nginx

# List files with line numbers
dpkg -L nginx | nl

# Find which package owns a file
dpkg -S /usr/bin/nginx

# Search for packages by file pattern
dpkg -S '/usr/sbin/*'
dpkg -S '/etc/*.conf'

# Find packages owning multiple files
dpkg -S /usr/bin/{ls,cp,mv}
```

#### Package File Information
```bash
# Show package file information
dpkg -I package.deb

# Show specific control fields
dpkg -f package.deb Package Version Architecture

# List package contents without installing
dpkg -c package.deb

# Count files in package
dpkg -c package.deb | wc -l

# Show package dependencies
dpkg -I package.deb | grep Depends

# Check package architecture
dpkg -I package.deb | grep Architecture
```

### Package Configuration Management

#### Configuring Packages
```bash
# Configure all pending packages
sudo dpkg --configure --pending

# Configure specific package
sudo dpkg --configure package_name

# Reconfigure all packages
sudo dpkg --configure -a

# Process triggers only
sudo dpkg --triggers-only

# Configure with verbose output
sudo dpkg --configure --verbose package_name
```

#### Package Selection Management
```bash
# Get current package selections
dpkg --get-selections > selections.txt

# Set package selections from file
sudo dpkg --set-selections < selections.txt

# Clear all selections
dpkg --clear-selections

# Install packages based on selections
sudo apt-get dselect-upgrade

# Show selections for specific packages
dpkg --get-selections | grep python
```

### Database Operations

#### Available Packages Management
```bash
# Update available packages database
sudo dpkg --update-avail /path/to/Packages

# Merge available packages
sudo dpkg --merge-avail /path/to/Packages

# Clear available packages database
sudo dpkg --clear-avail

# Forget old unavailable packages
sudo dpkg --forget-old-unavail

# Audit installed packages
sudo dpkg --audit

# Check for broken packages
dpkg -l | grep -E "^[ai][bcf]"
```

## Advanced Usage

### Package Recovery and Repair

#### Fixing Broken Packages
```bash
# Identify broken packages
dpkg -l | grep -E "^[ai][bcf]"

# Reconfigure all packages
sudo dpkg --configure -a

# Fix specific package
sudo dpkg --configure --pending package_name

# Force reinstallation
sudo dpkg --force-all -i package.deb

# Check package integrity
sudo dpkg --verify package_name
```

#### Package Extraction and Inspection
```bash
# Extract package without installing
dpkg -x package.deb /tmp/extract/

# Extract control information
dpkg -e package.deb /tmp/control/

# Extract with verbose output
dpkg -X package.deb /tmp/extract/

# Extract specific files
dpkg -x package.deb /tmp/ && cp /tmp/path/to/file /desired/location/

# View package scripts
dpkg -e package.deb control_dir
cat control_dir/postinst
cat control_dir/prerm
```

### System Maintenance

#### Package Cleanup
```bash
# Remove orphaned packages
sudo apt-get autoremove

# Clear package cache
sudo apt-get clean

# Remove old kernels
sudo apt-get remove --purge $(dpkg -l 'linux-*' | sed '/^ii/!d;/'"$(uname -r | sed "s/\(.*\)-\([^0-9]\+\)/\1/")"'/d;s/^[^ ]* [^ ]* \([^ ]*\).*/\1/;/[0-9]/!d')

# Find packages with removed status (config files remain)
dpkg -l | grep '^rc' | awk '{print $2}' | xargs sudo dpkg -P

# Clean up old package files
find /var/cache/apt/archives/ -name "*.deb" -mtime +30 -delete
```

#### System Backup and Migration
```bash
# Backup installed packages list
dpkg --get-selections > package_selections_backup.txt

# Backup package information with versions
dpkg-query -W -f='${Package} ${Version}\n' > installed_packages.txt

# Create list of manually installed packages
apt-mark showmanual > manual_packages.txt

# Backup package configurations
sudo tar -czf etc_backup.tar.gz /etc/

# Restore package selections
sudo dpkg --set-selections < package_selections_backup.txt
sudo apt-get dselect-upgrade
```

### Package Comparison and Analysis

#### Package Version Management
```bash
# Compare installed package versions
dpkg-query -W -f='${Package} ${Version}\n' | sort

# Check package version
dpkg -l package_name | awk '{print $3}'

# Compare versions
dpkg --compare-versions "1.2.3" "lt" "1.2.4" && echo "Older"

# Find packages needing updates
apt list --upgradable

# Check architecture compatibility
dpkg --print-architecture
dpkg -I package.deb | grep Architecture
```

#### Package Size and Usage Analysis
```bash
# List packages by installed size
dpkg-query -W -f='${Installed-Size} ${Package}\n' | sort -n

# Find large packages (>100MB)
dpkg-query -W -f='${Installed-Size} ${Package}\n' | \
awk '$1 > 100000 {printf "%.1f MB\t%s\n", $1/1024, $2}' | \
sort -nr

# Calculate total installed size
dpkg-query -W -f='${Installed-Size}\n' | \
awk '{sum += $1} END {printf "Total installed size: %.1f MB\n", sum/1024}'

# Show package sizes in human readable format
dpkg-query -W -f='${Installed-Size}\t${Package}\n' | \
awk '{printf "%.2f MB\t%s\n", $1/1024, $2}' | sort -nr
```

## Practical Examples

### System Administration

#### Package Installation Automation
```bash
#!/bin/bash
# Bulk package installation script

PACKAGES_DIR="/downloads/debs"
LOG_FILE="/var/log/package_install.log"

# Function to install package with error handling
install_package() {
    local package=$1
    echo "Installing $package..." | tee -a "$LOG_FILE"

    if sudo dpkg -i "$package" 2>&1 | tee -a "$LOG_FILE"; then
        echo "Successfully installed $package" | tee -a "$LOG_FILE"
    else
        echo "Failed to install $package" | tee -a "$LOG_FILE"
        # Try fixing dependencies
        echo "Attempting to fix dependencies..." | tee -a "$LOG_FILE"
        sudo apt-get install -f -y 2>&1 | tee -a "$LOG_FILE"
    fi
}

# Install all .deb files in directory
for package in "$PACKAGES_DIR"/*.deb; do
    if [ -f "$package" ]; then
        install_package "$package"
    fi
done

# Configure any pending packages
echo "Configuring pending packages..." | tee -a "$LOG_FILE"
sudo dpkg --configure --pending 2>&1 | tee -a "$LOG_FILE"

echo "Package installation completed" | tee -a "$LOG_FILE"
```

#### Package Audit and Verification
```bash
#!/bin/bash
# Package audit script

echo "=== Package Audit Report ===" > package_audit.txt
echo "Generated on: $(date)" >> package_audit.txt
echo "" >> package_audit.txt

# Check for broken packages
echo "=== Broken Packages ===" >> package_audit.txt
dpkg -l | grep -E "^[ai][bcf]" >> package_audit.txt
echo "" >> package_audit.txt

# Check for packages with config files only
echo "=== Packages with Config Files Only ===" >> package_audit.txt
dpkg -l | grep '^rc' | awk '{print $2}' >> package_audit.txt
echo "" >> package_audit.txt

# Show total package count
echo "=== Package Statistics ===" >> package_audit.txt
echo "Total installed packages: $(dpkg -l | grep '^ii' | wc -l)" >> package_audit.txt
echo "Packages with config only: $(dpkg -l | grep '^rc' | wc -l)" >> package_audit.txt
echo "" >> package_audit.txt

# Show disk usage by packages
echo "=== Disk Usage ===" >> package_audit.txt
dpkg-query -W -f='${Installed-Size}\n' | \
awk '{sum += $1} END {printf "Total disk usage: %.1f MB\n", sum/1024}' >> package_audit.txt

echo "Audit completed. See package_audit.txt for details."
```

### Development and Testing

#### Package Building Preparation
```bash
#!/bin/bash
# Prepare system for package building

# Install build dependencies
echo "Installing build dependencies..."
sudo apt-get update
sudo apt-get install -y build-essential devscripts debhelper dh-make

# Install packaging tools
sudo apt-get install -y dpkg-dev lintian pbuilder

# Create working directory
mkdir -p ~/debian-packages
cd ~/debian-packages

# Set up development environment
export DEBEMAIL="developer@example.com"
export DEBFULLNAME="Developer Name"

echo "Package building environment ready!"
```

#### Package Testing Environment
```bash
#!/bin/bash
# Create chroot for package testing

CHROOT_DIR="/tmp/test-chroot"
PACKAGE=$1

if [ -z "$PACKAGE" ]; then
    echo "Usage: $0 <package.deb>"
    exit 1
fi

# Create chroot directory
sudo mkdir -p "$CHROOT_DIR"

# Install basic system
sudo debootstrap --variant=minbase stable "$CHROOT_DIR" http://deb.debian.org/debian

# Copy package to chroot
sudo cp "$PACKAGE" "$CHROOT_DIR/tmp/"

# Enter chroot and test package
sudo chroot "$CHROOT_DIR" /bin/bash -c "
cd /tmp
dpkg -i $(basename $PACKAGE) || apt-get install -f -y
dpkg -l | grep $(basename $PACKAGE .deb | cut -d_ -f1)
"

echo "Package testing completed in chroot"
```

### Backup and Recovery

#### System State Backup
```bash
#!/bin/bash
# Complete system state backup

BACKUP_DIR="/backups/system_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup package selections
echo "Backing up package selections..."
dpkg --get-selections > "$BACKUP_DIR/package_selections.txt"

# Backup package versions
echo "Backing up package versions..."
dpkg-query -W -f='${Package} ${Version}\n' > "$BACKUP_DIR/package_versions.txt"

# Backup manually installed packages
echo "Backing up manually installed packages..."
apt-mark showmanual > "$BACKUP_DIR/manual_packages.txt"

# Backup package configurations
echo "Backing up package configurations..."
sudo tar -czf "$BACKUP_DIR/etc_backup.tar.gz" /etc/

# Backup dpkg database
echo "Backing up dpkg database..."
sudo cp -a /var/lib/dpkg "$BACKUP_DIR/dpkg_backup"

echo "System backup completed: $BACKUP_DIR"
```

#### Disaster Recovery
```bash
#!/bin/bash
# System recovery from backup

BACKUP_DIR=$1

if [ -z "$BACKUP_DIR" ] || [ ! -d "$BACKUP_DIR" ]; then
    echo "Usage: $0 <backup_directory>"
    exit 1
fi

echo "Starting system recovery from: $BACKUP_DIR"

# Restore package selections
echo "Restoring package selections..."
sudo dpkg --set-selections < "$BACKUP_DIR/package_selections.txt"

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install packages
echo "Installing packages..."
sudo apt-get dselect-upgrade -y

# Restore configurations (manual review required)
echo "Configuration backup available at: $BACKUP_DIR/etc_backup.tar.gz"
echo "Please review and restore configurations manually"

echo "System recovery completed"
```

## Troubleshooting

### Common Installation Issues

#### Dependency Problems
```bash
# Check what dependencies are missing
sudo apt-get install -f  # This will show missing dependencies

# Install missing dependencies manually
sudo apt-get install missing-package1 missing-package2

# Or use apt to resolve dependencies
sudo apt-get install -f

# For stubborn cases, force install
sudo dpkg --force-depends -i package.deb
sudo apt-get install -f
```

#### Configuration Conflicts
```bash
# Show what configuration conflicts exist
sudo dpkg --configure package_name

# Keep old configuration files
sudo dpkg --force-confold -i package.deb

# Use new configuration files
sudo dpkg --force-confnew -i package.deb

# Use default options
sudo dpkg --force-confdef -i package.deb
```

#### Database Corruption
```bash
# Check dpkg database integrity
sudo dpkg --audit

# Rebuild available packages database
sudo dpkg --clear-avail
sudo apt-get update

# Check for broken packages
dpkg -l | grep -E "^[ai][bcf]"

# Fix broken installations
sudo dpkg --configure -a

# In extreme cases, rebuild database
sudo cp -a /var/lib/dpkg /var/lib/dpkg.backup
sudo rm -f /var/lib/dpkg/lock
sudo dpkg --configure -a
```

### Performance Issues

#### Slow Operations
```bash
# Use verbose output to identify bottlenecks
sudo dpkg --verbose -i package.deb

# Disable triggers temporarily
sudo dpkg --no-triggers -i package.deb
sudo dpkg --triggers-only

# For large installations, use apt instead
sudo apt-get install package_name

# Monitor system resources during operation
htop
iostat -x 1
```

## Integration and Automation

### Configuration Management

#### Ansible Integration
```yaml
# Example Ansible task for dpkg
- name: Install local .deb package
  dpkg_selections:
    name: "{{ item }}"
    selection: install
  with_items:
    - package1
    - package2

- name: Copy deb file
  copy:
    src: files/package.deb
    dest: /tmp/package.deb

- name: Install package
  apt:
    deb: /tmp/package.deb
    state: present
```

#### Docker Integration
```dockerfile
# Dockerfile example
FROM debian:stable

# Install local packages
COPY packages/*.deb /tmp/
RUN for deb in /tmp/*.deb; do \
        dpkg -i "$deb" || apt-get install -f -y; \
    done && \
    rm /tmp/*.deb

# Clean up
RUN apt-get autoremove -y && \
    apt-get clean
```

### Monitoring and Logging

#### Package Change Monitoring
```bash
#!/bin/bash
# Monitor package installations

LOG_FILE="/var/log/package_monitor.log"

# Log current state
echo "$(date): Package installation monitoring started" >> "$LOG_FILE"

# Monitor dpkg log
tail -f /var/log/dpkg.log | while read line; do
    if echo "$line" | grep -q "install\|remove\|purge"; then
        echo "$(date): $line" >> "$LOG_FILE"

        # Send notification if needed
        # notify-send "Package Change" "$line"
    fi
done
```

#### Installation Validation
```bash
#!/bin/bash
# Validate package installation integrity

validate_package() {
    local package=$1

    # Check if package is properly installed
    if dpkg -s "$package" | grep -q "Status: install ok installed"; then
        echo "✓ $package is properly installed"

        # Check if all files are present
        local missing_files=$(dpkg -L "$package" | xargs -I {} sh -c 'if [ ! -e "{}" ]; then echo "{}"; fi')
        if [ -n "$missing_files" ]; then
            echo "  ⚠ Missing files: $missing_files"
        fi

        # Check package integrity
        if sudo dpkg --verify "$package" 2>/dev/null; then
            echo "  ✓ Package integrity verified"
        else
            echo "  ⚠ Package integrity issues detected"
        fi
    else
        echo "✗ $package is not properly installed"
    fi
}

# Validate all installed packages
for package in $(dpkg -l | grep '^ii' | awk '{print $2}'); do
    validate_package "$package"
done
```

## Related Commands

- [`apt`](/docs/commands/package-management/apt) - High-level package management tool
- [`apt-get`](/docs/commands/package-management/apt-get) - Command-line package manager
- [`aptitude`](/docs/commands/package-management/aptitude) - Text-based package manager
- [`dpkg-query`](/docs/commands/package-management/dpkg-query) - Query the dpkg database
- [`dpkg-deb`](/docs/commands/package-management/dpkg-deb) - Debian package archive manipulation tool
- [`dpkg-split`](/docs/commands/package-management/dpkg-split) - Split large Debian packages
- [`dpkg-divert`](/docs/commands/package-management/dpkg-divert) - Override package files
- [`dpkg-statoverride`](/docs/commands/package-management/dpkg-statoverride) - Override file ownership
- [`dpkg-reconfigure`](/docs/commands/package-management/dpkg-reconfigure) - Reconfigure installed packages
- [`apt-cache`](/docs/commands/package-management/apt-cache) - Query APT cache
- [`apt-mark`](/docs/commands/package-management/apt-mark) - Mark package holdings

## Best Practices

### Package Management
1. **Use apt for regular operations** - Prefer apt/apt-get for dependency resolution
2. **Use dpkg for local packages** - Only use dpkg when installing specific .deb files
3. **Always run apt-get install -f** - Fix dependencies after manual dpkg operations
4. **Verify package integrity** - Check GPG signatures and checksums
5. **Keep system updated** - Regularly update package lists and upgrade packages

### System Maintenance
1. **Regular backup** - Back up package selections and configurations
2. **Monitor disk space** - Large packages can consume significant space
3. **Clean up regularly** - Remove unused packages and cached files
4. **Document changes** - Keep track of manual package installations
5. **Test before production** - Use testing environments for package validation

### Security
1. **Use trusted sources** - Only install packages from reputable repositories
2. **Verify signatures** - Check package GPG signatures when available
3. **Review package contents** - Inspect files before installation
4. **Monitor installations** - Log and audit package changes
5. **Regular updates** - Keep security patches current

### Performance Optimization
1. **Use apt for bulk operations** - Faster for multiple packages
2. **Configure triggers wisely** - Process triggers at appropriate times
3. **Monitor system resources** - Watch memory and disk usage
4. **Optimize database** - Periodically clean dpkg database
5. **Use appropriate mirrors** - Configure fast package repositories

## Performance Tips

1. **Dependency Resolution** - Let apt handle dependencies for better performance
2. **Bulk Operations** - Install multiple packages in single operations
3. **Database Optimization** - Regularly clean and maintain dpkg database
4. **Network Configuration** - Use local mirrors and caching for faster downloads
5. **Storage Optimization** - Use appropriate compression and cleanup strategies
6. **Memory Management** - Monitor memory usage during large installations
7. **Parallel Processing** - Use appropriate flags for multi-core systems
8. **Caching Strategies** - Implement intelligent package caching

The `dpkg` command provides fundamental package management capabilities for Debian-based systems, serving as the low-level foundation upon which higher-level package managers like `apt` and `aptitude` are built. While `dpkg` lacks automatic dependency resolution, it offers precise control over individual package operations and is essential for system administration, troubleshooting, and automation tasks. Understanding `dpkg` is crucial for effective Linux system management, especially when dealing with custom packages, recovery scenarios, and automated deployments.