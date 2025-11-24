---
title: dpkg - Debian Package Manager
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dpkg - Debian Package Manager

The `dpkg` command is the low-level package management utility for Debian-based Linux systems. It serves as the foundation for higher-level package managers like apt and aptitude, providing direct control over the installation, removal, and configuration of Debian packages (.deb files).

## Basic Syntax

```bash
dpkg [OPTIONS] ACTION [PACKAGE_FILE|PACKAGE_NAME]
```

## Common Options

### Package Installation Options
- `-i, --install <package_file>` - Install package file
- `-R, --recursive <directory>` - Recursively install packages in directory
- `--unpack <package_file>` - Unpack package without configuration
- `--configure <package_name>` - Configure unpacked package
- `--force-all` - Force all operations (overrides conflicts)
- `--force-depends` - Ignore dependency problems
- `--force-overwrite` - Overwrite files from other packages

### Package Removal Options
- `-r, --remove <package_name>` - Remove package (keep config)
- `-P, --purge <package_name>` - Remove package and config files
- `--force-remove-reinstreq` - Remove package even if required
- `--force-depends` - Remove despite dependency problems

### Package Information Options
- `-l, --list [pattern]` - List installed packages
- `-s, --status <package_name>` - Show package status
- `-L, --listfiles <package_name>` - List files installed by package
- `-S, --search <pattern>` - Find package owning file
- `-p, --print-avail <package_name>` - Show available package info
- `--print-architecture` - Show system architecture

### Configuration Options
- `--configure` - Reconfigure all unpacked packages
- `--pending` - Configure pending packages
- `--configure --pending` - Configure pending packages only
- `--triggers-only` - Process triggers only

### Database Options
- `--update-avail <package_file>` - Update available packages
- `--merge-avail <package_file>` - Merge available packages
- `--clear-avail` - Clear available packages database
- `--forget-old-unavail` - Forget old unavailable packages

## Usage Examples

### Package Installation

```bash
# Install a package file
sudo dpkg -i package.deb

# Install multiple packages
sudo dpkg -i package1.deb package2.deb package3.deb

# Install packages recursively
sudo dpkg -R /path/to/packages/

# Install without configuring (unpack only)
sudo dpkg --unpack package.deb

# Configure unpacked package
sudo dpkg --configure package_name

# Install ignoring dependency conflicts
sudo dpkg --force-depends -i package.deb

# Install overwriting conflicting files
sudo dpkg --force-overwrite -i package.deb

# Install package in specific directory
sudo dpkg --instdir=/custom/path -i package.deb

# Install package with root filesystem in chroot
sudo dpkg --root=/chroot/path -i package.deb
```

### Package Removal

```bash
# Remove package (keep configuration files)
sudo dpkg -r package_name

# Remove package and configuration files
sudo dpkg -P package_name

# Remove multiple packages
sudo dpkg -r package1 package2 package3

# Remove package despite dependency issues
sudo dpkg --force-depends -r package_name

# Remove package even if marked required
sudo dpkg --force-remove-reinstreq -P package_name

# Remove package only if it's configured
sudo dpkg -r package_name --admindir=/custom/var/lib/dpkg/
```

### Package Information and Querying

```bash
# List all installed packages
dpkg -l

# List packages matching pattern
dpkg -l '*python*'

# List package with status details
dpkg -l package_name

# Show package status
dpkg -s package_name

# Show package information in custom format
dpkg -s package_name | grep -E "Version|Status|Architecture"

# List files installed by package
dpkg -L package_name

# Find which package owns a file
dpkg -S /path/to/file

# Search for files by pattern
dpkg -S '/usr/bin/*'

# Show available package information
dpkg -p package_name

# Show package control file information
dpkg -I package.deb

# Show package file listing
dpkg -c package.deb
```

### Package Management Operations

```bash
# Reconfigure all pending packages
sudo dpkg --configure --pending

# Reconfigure specific package
sudo dpkg --configure package_name

# Process pending triggers
sudo dpkg --triggers-only

# Update available packages database
sudo dpkg --update-avail /path/to/Packages

# Merge available packages
sudo dpkg --merge-avail /path/to/Packages

# Clear available packages database
sudo dpkg --clear-avail

# Forget old unavailable packages
sudo dpkg --forget-old-unavail

# Check package integrity
sudo dpkg --audit

# Search for broken packages
sudo dpkg -l | grep -E "^[ai][bcf]"
```

### Database and File Operations

```bash
# Extract control information from package
dpkg -e package.deb output_directory

# Extract files from package
dpkg -x package.deb output_directory

# Extract files with verbose output
dpkg -X package.deb output_directory

# Show package control fields
dpkg -f package.deb Package Version Architecture

# Build package from directory
dpkg -b package_directory package.deb

# Show package architecture
dpkg --print-architecture

# Show supported architectures
dpkg --print-foreign-architectures

# Add foreign architecture
sudo dpkg --add-architecture i386

# Remove foreign architecture
sudo dpkg --remove-architecture i386
```

## Practical Examples

### System Maintenance

```bash
# Check for broken packages
dpkg -l | grep -E "^[ai][bcf]"

# Fix broken packages
sudo dpkg --configure -a

# Reconfigure all packages
sudo dpkg-reconfigure --all

# List all packages with their status
dpkg-query -W -f='${Package} ${Status} ${Version}\n'

# Show package installation history
grep "install " /var/log/dpkg.log | tail -20

# Find recently installed packages
grep "status installed" /var/log/dpkg.log | grep "$(date '+%Y-%m-%d')" | cut -d' ' -f4
```

### Package Troubleshooting

```bash
# Check package dependencies
dpkg -s package_name | grep Depends

# Find packages that depend on a specific package
apt-cache rdepends package_name

# Check for configuration files left by removed packages
find /etc -name "*.dpkg-*" -o -name "*.ucf-*"

# Reinstall package
sudo dpkg -i $(dpkg -S /usr/bin/package_name | cut -d: -f1)

# Fix broken package installation
sudo dpkg --force-all -i package.deb

# Check package integrity
sudo dpkg --verify package_name
```

### Package Backup and Recovery

```bash
# Backup package selection list
dpkg --get-selections > package_selections.txt

# Restore package selection list
sudo dpkg --set-selections < package_selections.txt
sudo apt-get dselect-upgrade

# Backup installed packages list
dpkg-query -W -f='${Package}\n' > installed_packages.txt

# Create list of manually installed packages
apt-mark showmanual > manual_packages.txt

# Export package information with versions
dpkg-query -W -f='${Package} ${Version}\n' > package_versions.txt
```

### Package Comparison and Verification

```bash
# Compare installed package versions
dpkg-query -W -f='${Package} ${Version}\n' package_name

# Check if package is installed
dpkg -l package_name | grep -E "^[ih][rc]"

# Show package installation time
grep "status installed.*package_name" /var/log/dpkg.log

# Verify package file integrity
dpkg-deb --contents package.deb

# Compare two package versions
dpkg --compare-versions "1.2.3" "lt" "1.2.4"

# Check package architecture compatibility
dpkg --print-architecture
dpkg -I package.deb | grep Architecture
```

### Automation and Scripting

```bash
#!/bin/bash
# Package management script

# Function to check if package is installed
is_package_installed() {
    dpkg -l "$1" | grep -q "^ii.*$1"
}

# Function to install package if not installed
install_if_missing() {
    if ! is_package_installed "$1"; then
        echo "Installing $1..."
        sudo apt-get install -y "$1"
    else
        echo "$1 is already installed"
    fi
}

# Function to list packages by size
list_packages_by_size() {
    dpkg-query -W -f='${Installed-Size}\t${Package}\n' | sort -n
}

# Function to find large packages
find_large_packages() {
    dpkg-query -W -f='${Installed-Size} ${Package}\n' | \
    awk '$1 > 10000 {printf "%.1f MB\t%s\n", $1/1024, $2}' | \
    sort -nr
}
```

### System Information Gathering

```bash
# List all packages with install size
dpkg-query -W -f='${Installed-Size} ${Package}\n'

# Show total installed size
dpkg-query -W -f='${Installed-Size}\n' | \
awk '{sum += $1} END {printf "Total installed size: %.1f MB\n", sum/1024}'

# List packages by maintainer
dpkg-query -W -f='${Maintainer}\t${Package}\n' | sort | uniq -c

# Show packages installed on specific date
grep "$(date '+%Y-%m-%d')" /var/log/dpkg.log | \
grep "status installed" | cut -d' ' -f4 | sort -u

# List packages without maintainer
dpkg-query -W -f='${Maintainer}\t${Package}\n' | \
grep "unknown\|<none>" | cut -f2
```

### Advanced Package Operations

```bash
# Extract specific files from package without installing
dpkg-deb -x package.deb temp_extract
cp temp_extract/path/to/file /desired/location/
rm -rf temp_extract

# View package changelog
dpkg-deb -x package.deb temp_dir
zcat temp_dir/usr/share/doc/package_name/changelog.Debian.gz | less

# Check package dependencies without installing
dpkg-deb -I package.deb | grep Depends

# Create package from directory structure
dpkg-deb --build package_directory custom_package.deb

# Merge multiple package selections
cat selections1.txt selections2.txt | dpkg --set-selections

# Find packages with configuration files
dpkg-query -W -f='${Package}\n' | xargs -I {} sh -c 'if [ -f "/etc/{}/conf" ]; then echo {}; fi'
```

## Related Commands

- `dpkg-query` - Query the dpkg database
- `dpkg-deb` - Debian package archive (.deb) manipulation tool
- `dpkg-split` - Split large Debian packages
- `dpkg-divert` - Override a package's version of a file
- `dpkg-statoverride` - Override ownership and mode of files
- `dpkg-reconfigure` - Reconfigure an already installed package
- `apt` - High-level package management tool
- `apt-get` - Command-line package manager

## Best Practices

### Package Installation
1. Use `apt` or `apt-get` for regular package management to handle dependencies
2. Use `dpkg` only for local .deb files or when you need low-level control
3. Always resolve dependency issues after manual `dpkg` operations
4. Check package architecture compatibility before installation
5. Verify package sources and integrity before installation

### System Maintenance
1. Regularly check for broken packages with `dpkg -l | grep ^[^ii]`
2. Use `dpkg --configure -a` to fix interrupted installations
3. Keep track of manually installed packages for system documentation
4. Monitor package sizes to manage disk space effectively
5. Regular backup package selections for disaster recovery

### Security Considerations
1. Only install packages from trusted sources
2. Verify GPG signatures when available
3. Review package contents and scripts before installation
4. Use package pinning to control version updates
5. Monitor package installation logs for security auditing

### Troubleshooting
1. Use `dpkg -s` to check package status and configuration
2. Review `/var/log/dpkg.log` for installation history
3. Use `--force-*` options only when absolutely necessary
4. Check dependency conflicts before manual operations
5. Use `dpkg-reconfigure` to fix configuration issues

### Automation
1. Use `dpkg-query` with custom formats for reporting
2. Create scripts for bulk package operations
3. Integrate with configuration management tools
4. Use dpkg selections for system replication
5. Monitor package changes in automated environments

The `dpkg` command provides fundamental package management capabilities for Debian-based systems, serving as the low-level foundation upon which higher-level package managers like `apt` and `aptitude` are built. While `dpkg` lacks automatic dependency resolution, it offers precise control over individual package operations and is essential for system administration, troubleshooting, and automation tasks.