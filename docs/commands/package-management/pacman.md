---
title: pacman - Arch Linux Package Manager
sidebar_label: pacman
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# pacman - Arch Linux Package Manager

The `pacman` command is the default package manager for Arch Linux and its derivatives. It combines a simple binary package format with an easy-to-use build system, providing powerful package management capabilities including installation, upgrades, and removal of software packages.

## Basic Syntax

```bash
pacman [OPTIONS] <OPERATION> <PACKAGE(S)>
```

## Common Options

### General Options
- `-h, --help` - Display help information
- `-V, --version` - Display pacman version
- `-b, --dbpath <path>` - Specify an alternative database location
- `-r, --root <path>` - Specify an alternative installation root
- `--logfile <path>` - Specify an alternative log file
- `--arch <architecture>` - Set an alternate architecture
- `--cachedir <dir>` - Specify an alternative package cache location
- `--config <path>` - Specify an alternative configuration file
- `--gpgdir <path>` - Specify an alternative GPG directory
- `--hookdir <dir>` - Specify an alternative hook directory

### Synchronization Options
- `-y, --refresh` - Download fresh package databases from server
- `-u, --sysupgrade` - Upgrade all packages that are out of date
- `--needed` - Don't reinstall up-to-date packages
- `--ignore <package>` - Ignore a package upgrade
- `--ignoregroup <group>` - Ignore a group upgrade

### Query Options
- `-Q, --query` - Query the package database
- `-s, --search <regex>` - Search package database
- `-i, --info <package>` - View package information
- `-l, --list <package>` - List the contents of a package
- `-o, --owns `` - Query the package that owns a file

### Remove Options
- `-R, --remove` - Remove packages from the system
- `-s, --recursive` - Remove dependencies not required by other packages
- `-c, --cascade` - Remove packages and all packages that depend on them
- `-n, --nosave` - Remove configuration files as well
- `--print` - Only print the targets instead of performing the operation

## Usage Examples

### Package Installation

```bash
# Install a package
pacman -S package_name

# Install multiple packages
pacman -S package1 package2 package3

# Install packages without prompts
pacman -S --noconfirm package_name

# Install package as dependency
pacman -S --asdeps package_name

# Install package explicitly (not dependency)
pacman -S --asexplicit package_name

# Install from local package file
pacman -U /path/to/package.pkg.tar.zst

# Install packages from URL
pacman -U http://example.com/package.pkg.tar.zst

# Download package without installing
pacman -Sw package_name

# Install package and all dependencies
pacman -S package_name --needed

# Install packages ignoring file conflicts
pacman -S package_name --overwrite '*'
```

### System Updates

```bash
# Sync package databases
pacman -Sy

# Upgrade all packages
pacman -Su

# Sync and upgrade in one command (full system upgrade)
pacman -Syu

# Refresh database and upgrade packages
pacman -Syyu

# Upgrade specific packages only
pacman -Su package1 package2

# Upgrade system ignoring specific packages
pacman -Syu --ignore package_name

# Perform system upgrade only if needed
pacman -Syu --needed

# Check for available updates
pacman -Qu

# List outdated packages
pacman -Qm
```

### Package Removal

```bash
# Remove a package
pacman -R package_name

# Remove package and dependencies not needed by others
pacman -Rs package_name

# Remove package and all packages that depend on it
pacman -Rc package_name

# Remove package, dependencies, and dependent packages
pacman -Rsc package_name

# Remove package and configuration files
pacman -Rn package_name

# Remove package, dependencies, and config files
pacman -Rns package_name

# Remove orphan packages
pacman -Rns $(pacman -Qtdq)

# Remove package without confirmation
pacman -R --noconfirm package_name

# Dry run removal (show what would be removed)
pacman -Rsp package_name
```

### Package Search and Information

```bash
# Search for packages
pacman -Ss search_term

# Search in installed packages only
pacman -Qs search_term

# Show package information
pacman -Si package_name

# Show installed package information
pacman -Qi package_name

# List package files
pacman -Ql package_name

# Show which package owns a file
pacman -Qo /path/to/file

# List all installed packages
pacman -Q

# List foreign packages (not from repositories)
pacman -Qm

# List packages not required as dependencies
pacman -Qtd

# Check for package modification
pacman -Qk package_name

# Show package dependencies
pacman -Qi package_name | grep Depends

# Show package reverse dependencies
pacman -Qi package_name | grep Required
```

### Package Query Operations

```bash
# Query package database
pacman -Q package_name

# Query with file ownership
pacman -Qo file

# List package contents
pacman -Ql package_name

# Check package modification
pacman -Qk package_name

# List packages by size
pacman -Qi | grep -E 'Name|Size'

# Show package changelog
pacman -Qc package_name

# Show package install reason
pacman -Qi package_name | grep 'Install Reason'

# List packages by repository
pacman -Sl repository_name
```

### Database Operations

```bash
# Update package database
pacman -Sy

# Force database refresh
pacman -Syy

# Clean package cache
pacman -Sc

# Remove all packages from cache
pacman -Scc

# Show database statistics
pacman -Qi | wc -l

# Check database integrity
pacman -Dk

# Check package modification
pacman -Qkk

# Rebuild local database
pacman -D --asdeps package_name

# Mark package as explicitly installed
pacman -D --asexplicit package_name
```

### Package Files and Orphans

```bash
# Find orphan packages
pacman -Qtd

# Remove orphan packages
pacman -Rns $(pacman -Qtdq)

# Show package backup files
pacman -Qii package_name | grep '^BACKUP'

# Show modified configuration files
pacman -Qii | grep -B1 'MODIFICATION'

# List all modified config files
pacman -Qii | grep -B1 '^MODIFICATION$'

# Remove specific files from backup
pacman -D --asdeps package_name
```

## Practical Examples

### System Maintenance

```bash
# Complete system update and cleanup
pacman -Syu --noconfirm && pacman -Scc --noconfirm

# Update system excluding specific packages
pacman -Syu --ignore linux-lts --ignore nvidia

# Refresh databases only
pacman -Syy

# Full system upgrade with download preview
pacman -Syu --downloadonly
pacman -Syu

# Clean package cache keeping recent versions
pacman -Sc

# Remove all cached packages
pacman -Scc

# Check for orphans and remove them
if [ "$(pacman -Qtdq)" ]; then
    pacman -Rns $(pacman -Qtdq)
fi
```

### Package Installation Workflows

```bash
# Install package with dependencies
pacman -S package_name

# Install package as explicit dependency
pacman -S --asexplicit package_name

# Install package from specific repository
pacman -S extra/package_name

# Install package ignoring version
pacman -S package_name --ignore version

# Install package with database refresh
pacman -Sy package_name

# Install packages with force (overwrite conflicting files)
pacman -S package_name --overwrite '/path/to/conflicting/*'

# Install from package group
pacman -S base-devel

# Install all packages from group
pacman -S $(pacman -Sg package_group)
```

### Advanced Package Management

```bash
# Mark package as dependency
pacman -D --asdeps package_name

# Mark package as explicit
pacman -D --asexplicit package_name

# Downgrade package
pacman -U /var/cache/pacman/pkg/old_version.pkg.tar.zst

# Install AUR package (requires helper like yay)
yay -S package_name

# List packages by size
pacman -Qi | awk '/^Name/ {name=$3} /^Installed Size/ {print $3, name}' | sort -h

# Find largest packages
pacman -Qi | awk '/^Name/ {name=$3} /^Installed Size/ {size=$4$5; print size, name}' | sort -hr | head -10

# Backup package list
pacman -Qqe > package_list.txt

# Restore packages from list
pacman -S $(cat package_list.txt)

# Check which packages need restart
pacman -Qii | grep -B1 'MODIFICATION$'
```

### Package Database Management

```bash
# Check database consistency
pacman -Dk

# Check all installed packages for modification
pacman -Qkk

# Test package installation (dry run)
pacman -Sw package_name

# Rebuild local database
sudo rm -r /var/lib/pacman/local/
sudo pacman -Sy

# Sync specific repositories
pacman -Sy extra community

# Test package integrity
pacman -Qk

# Test all package files
pacman -Qkk

# Show package installation history
grep "installed" /var/log/pacman.log | tail -20
```

### Package Groups and Dependencies

```bash
# List package groups
pacman -Sg

# List packages in group
pacman -Sg package_group

# Install entire group
pacman -S package_group

# Show group information
pacman -Si package_group

# List dependencies for package
pacman -Si package_name | grep Depends

# List reverse dependencies
pacman -Qi package_name | grep "Required By"

# Check package dependency tree
pactree package_name

# Show dependency tree with reverse dependencies
pactree -r package_name

# Find orphan dependencies
pacman -Qtdq
```

### Configuration and Troubleshooting

```bash
# Test pacman configuration
pacman -T

# Show package verification
pacman -Qk package_name

# List ignored packages
grep -E "^IgnorePkg|^IgnoreGroup" /etc/pacman.conf

# Set package hold
echo "IgnorePkg = package_name" >> /etc/pacman.conf

# Remove package hold
sed -i '/package_name/d' /etc/pacman.conf

# Test repository access
pacman -Sy --print-format "%n %v %r"

# Show download statistics
pacman -Qi | grep -E 'Name|Installed Size' | wc -l

# Show package build information
pacman -Qii package_name
```

### AUR (Arch User Repository) Integration

```bash
# Install yay (Yet Another Yaourt) AUR helper
pacman -S git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay && makepkg -si

# Using yay for AUR packages
yay -S aur_package_name
yay -Syu  # Update both official and AUR packages
yay -Ss search_term  # Search in AUR
yay -Qm  # List AUR packages

# Install multiple AUR packages
yay -S package1 package2 package3

# Clean AUR cache
yay -Scc

# Show AUR package information
yay -Si aur_package_name
```

## Related Commands

- `makepkg` - Build packages from PKGBUILD files
- `pactree` - Show package dependency tree
- `pacman-key` - Manage pacman's keyring
- `pacman-contrib` - Additional pacman scripts and tools
- `repose` - Create repository databases
- `pacstrap` - Install packages into new system
- `yay` / `paru` - AUR helpers
- `pkgfile` - Find which package owns a file

## Best Practices

### System Updates
1. Regularly run `pacman -Syu` for system updates
2. Read Arch Linux news before major system upgrades
3. Use `pacman -Syu --downloadonly` to preview updates
4. Keep backups before major system changes
5. Test updates in virtual environments when possible

### Package Management
1. Clean package cache regularly with `pacman -Sc`
2. Remove orphan packages to keep system clean
3. Use package groups for related software collections
4. Mark packages appropriately as explicit or dependency
5. Review package information before installation

### AUR Management
1. Use trusted AUR helpers like yay or paru
2. Review PKGBUILD files before building AUR packages
3. Keep AUR helpers updated
4. Use official repositories when possible
5. Backup important data before AUR package installation

### Security Considerations
1. Verify package signatures with `pacman-key`
2. Regularly update package databases
3. Review package changes before updates
4. Keep track of package modifications with `pacman -Qkk`
5. Use trusted repositories only

### Performance Optimization
1. Use fast mirrors in `/etc/pacman.d/mirrorlist`
2. Clean package cache to save disk space
3. Use parallel downloads when available
4. Configure appropriate download timeout settings
5. Monitor package installation sizes for storage management

The `pacman` package manager provides a powerful, efficient solution for package management in Arch Linux and its derivatives, offering excellent dependency resolution, simple binary package format, and integration with the Arch User Repository for additional software availability.