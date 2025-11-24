---
title: rpm - RPM Package Manager
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rpm - RPM Package Manager

The `rpm` command is the powerful package management utility for RPM-based Linux distributions, including Red Hat Enterprise Linux, CentOS, Fedora, and SUSE. It provides low-level package installation, removal, querying, and verification capabilities, serving as the foundation for higher-level package managers like yum and dnf.

## Basic Syntax

```bash
rpm [OPTIONS] [PACKAGE_FILE|PACKAGE_NAME]
```

## Common Options

### Installation Options
- `-i, --install <package_file>` - Install package
- `-U, --upgrade <package_file>` - Upgrade package (install if not present)
- `-F, --freshen <package_file>` - Upgrade package (only if already installed)
- `--force` - Force installation ignoring conflicts
- `--nodeps` - Don't check package dependencies
- `--noscripts` - Don't execute package scripts
- `--notriggers` - Don't execute package triggers
- `--oldpackage` - Upgrade to an older version
- `--reinstall` - Reinstall package

### Query Options
- `-q, --query <options>` - Query installed packages
- `-a, --all` - Query all installed packages
- `-f, --file `` - Query package owning file
- `-p, --package <package_file>` - Query package file
- `-l, --list` - List files in package
- `-i, --info` - Display package information
- `-d, --docfiles` - List only documentation files
- `-c, --configfiles` - List only configuration files
- `--scripts` - Display package scripts
- `--triggers` - Display package triggers
- `--changelog` - Display package changelog

### Verification Options
- `-V, --verify [options]` - Verify installed package
- `--nofiles` - Don't verify file attributes
- `--nodeps` - Don't verify dependencies
- `--noscripts` - Don't verify scripts
- `--nomd5` - Don't verify file MD5 sums
- `--nomtime` - Don't verify file modification times

### Removal Options
- `-e, --erase <package_name>` - Remove package
- `--allmatches` - Remove all versions of package
- `--nodeps` - Don't check dependencies before removal
- `--noscripts` - Don't execute package scripts during removal

### Database Options
- `--initdb` - Initialize RPM database
- `--rebuilddb` - Rebuild RPM database
- `--verifydb` - Verify RPM database
- `--dbpath <directory>` - Use alternative database directory

## Usage Examples

### Package Installation

```bash
# Install an RPM package
sudo rpm -i package.rpm

# Install with verbose output
sudo rpm -ivh package.rpm

# Install multiple packages
sudo rpm -ivh package1.rpm package2.rpm package3.rpm

# Install ignoring dependencies
sudo rpm -ivh --nodeps package.rpm

# Install forcing overwrite of files
sudo rpm -ivh --force package.rpm

# Install without executing scripts
sudo rpm -ivh --noscripts package.rpm

# Install from URL
sudo rpm -ivh http://example.com/package.rpm

# Install package with specific architecture
sudo rpm -ivh package.x86_64.rpm
```

### Package Upgrades

```bash
# Upgrade package (install if not present)
sudo rpm -Uvh package.rpm

# Freshen package (upgrade only if installed)
sudo rpm -Fvh package.rpm

# Upgrade to older version
sudo rpm -Uvh --oldpackage package.rpm

# Reinstall package
sudo rpm -Uvh --replacepkgs package.rpm

# Upgrade ignoring dependencies
sudo rpm -Uvh --nodeps package.rpm

# Force upgrade ignoring conflicts
sudo rpm -Uvh --force package.rpm

# Upgrade with test mode (dry run)
sudo rpm -Uvh --test package.rpm
```

### Package Removal

```bash
# Remove package
sudo rpm -e package_name

# Remove package with verbose output
sudo rpm -ev package_name

# Remove ignoring dependencies
sudo rpm -e --nodeps package_name

# Remove without executing scripts
sudo rpm -e --noscripts package_name

# Remove all versions of package
sudo rpm -e --allmatches package_name

# Remove multiple packages
sudo rpm -e package1 package2 package3

# Force removal of required package
sudo rpm -e --nodeps package_name
```

### Package Querying

```bash
# List all installed packages
rpm -qa

# Query specific package
rpm -q package_name

# Query package with version
rpm -q package_name-version-release

# Show package information
rpm -qi package_name

# List files in installed package
rpm -ql package_name

# List documentation files
rpm -qd package_name

# List configuration files
rpm -qc package_name

# Show package scripts
rpm -q --scripts package_name

# Display package changelog
rpm -q --changelog package_name

# Find package owning file
rpm -qf /path/to/file

# Query package file
rpm -qp package.rpm

# Show package file information
rpm -qpi package.rpm

# List files in package file
rpm -qpl package.rpm
```

### Package Verification

```bash
# Verify package installation
rpm -V package_name

# Verify all packages
rpm -Va

# Verify with verbose output
rpm -Vv package_name

# Verify package file
rpm -Vp package.rpm

# Verify specific file attributes
rpm -Vf /path/to/file

# Verify without MD5 check
rpm -V --nomd5 package_name

# Verify without dependency check
rpm -V --nodeps package_name

# Show verification results in detail
rpm -Va --nomtime --nosize --nomd5 --nouser --nogroup --nomode --nordev
```

### Database Management

```bash
# Initialize RPM database
sudo rpm --initdb

# Rebuild RPM database
sudo rpm --rebuilddb

# Verify RPM database
sudo rpm --verifydb

# Use alternative database directory
rpm --dbpath /custom/dbpath -qa

# Export package list
rpm -qa --queryformat '%{NAME}\n' > packages.txt

# Show database statistics
rpm --dbpath /var/lib/rpm --eval '%{_dbpath}'
```

### Advanced Operations

```bash
# Show package requirements (dependencies)
rpm -qR package_name

# Show package capabilities (what it provides)
rpm -q --provides package_name

# Show package conflicts
rpm -q --conflicts package_name

# Show package obsoletes
rpm -q --obsoletes package_name

# Show package triggers
rpm -q --triggers package_name

# Export package GPG key
rpm -q --queryformat '%{DSAHEADER:pgpsig}' package_name

# Import GPG key
sudo rpm --import keyfile.asc

# Check GPG signature of package
rpm --checksig package.rpm

# Set query format
rpm -qa --queryformat "%-30{NAME} %-10{VERSION} %{VENDOR}\n"
```

## Practical Examples

### System Maintenance

```bash
# List all installed packages with versions
rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n"

# Find recently installed packages
rpm -qa --queryformat "%{INSTALLTIME:date} %{NAME}\n" | sort

# Show packages by size
rpm -qa --queryformat "%{SIZE}\t%{NAME}\n" | sort -n

# Check for missing files
rpm -Va | grep '^missing'

# Verify configuration files
rpm -Va | grep '^..5'

# List packages from specific vendor
rpm -qa --queryformat "%{VENDOR}\t%{NAME}\n" | grep "Red Hat"
```

### Package Troubleshooting

```bash
# Check package dependencies
rpm -qR package_name

# Find what provides a specific capability
rpm -q --whatprovides capability_name

# Show package installation history
grep "install" /var/log/rpm.log | tail -10

# Find broken dependencies
rpm -Va | grep -E "^[^.]"

# Check for duplicate packages
rpm -qa | sort | uniq -d

# Verify package integrity
rpm -K package.rpm

# Check package signature
rpm --checksig package.rpm
```

### Package Creation and Manipulation

```bash
# Extract files from RPM without installing
rpm2cpio package.rpm | cpio -idmv

# Extract only specific files
rpm2cpio package.rpm | cpio -idmv ./path/to/file

# Show package build requirements
rpm -q --queryformat "[%{REQUIRENAME} %{REQUIREFLAGS:depflags} %{REQUIREVERSION}\n]" package_name

# Convert RPM to cpio archive
rpm2cpio package.rpm > package.cpio

# Display package header information
rpm -q --queryformat "[%{*:yaml}\n]" package_name
```

### System Information and Reporting

```bash
# Generate package inventory report
rpm -qa --queryformat "%{NAME}\t%{VERSION}\t%{RELEASE}\t%{ARCH}\t%{INSTALLTIME:date}\n" > package_inventory.csv

# Show packages by installation date
rpm -qa --queryformat "%{INSTALLTIME:date} %{NAME}\n" | sort

# Find large packages
rpm -qa --queryformat "%{SIZE} %{NAME}\n" | sort -n | tail -10

# Show packages from specific repository
rpm -qa --queryformat "%{VENDOR}\t%{NAME}\n" | grep "EPEL"

# Generate package dependency graph
rpm -qa | xargs rpm -qR | sort | uniq
```

### Backup and Recovery

```bash
# Backup RPM database
sudo cp -a /var/lib/rpm /backup/rpm_backup_$(date +%Y%m%d)

# Export installed packages list
rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" > installed_packages.txt

# Recreate package list from backup
cat installed_packages.txt | xargs sudo yum install

# Verify all packages before system backup
rpm -Va > package_verification.txt

# Check for modified configuration files
rpm -Va | grep "^..5..T"
```

### Automation and Scripting

```bash
#!/bin/bash
# RPM package management script

# Function to check if package is installed
is_installed() {
    rpm -q "$1" >/dev/null 2>&1
}

# Function to install package if missing
install_if_missing() {
    if ! is_installed "$1"; then
        echo "Installing $1..."
        sudo rpm -ivh "$1"
    else
        echo "$1 is already installed"
    fi
}

# Function to find packages by size
find_largest_packages() {
    rpm -qa --queryformat "%{SIZE}\t%{NAME}\n" | \
    sort -nr | \
    head -10 | \
    awk '{printf "%.2f MB\t%s\n", $1/1024/1024, $2}'
}

# Function to verify critical packages
verify_critical_packages() {
    local packages=("kernel" "glibc" "systemd" "bash")
    for pkg in "${packages[@]}"; do
        if is_installed "$pkg"; then
            echo "Verifying $pkg..."
            rpm -V "$pkg"
        fi
    done
}
```

### Advanced Query Examples

```bash
# Show packages with specific files
rpm -qa --queryformat "%{NAME}\n" | xargs -I {} bash -c 'if rpm -ql {} | grep -q "config"; then echo {}; fi'

# Find packages with post-install scripts
rpm -qa --queryformat "%{NAME}\n" | xargs -I {} bash -c 'if rpm -q --scripts {} | grep -q "postinstall"; then echo {}; fi'

# Show package dependencies in tree format
rpm -qR package_name | while read dep; do
    echo "$dep -> $(rpm -q --whatprovides "$dep" 2>/dev/null || echo "Not provided")"
done

# Find packages that depend on given package
rpm -qa --queryformat "%{NAME} %{REQUIRES}\n" | grep "package_name" | cut -d' ' -f1 | sort -u
```

## Related Commands

- `yum` - Yellowdog Updater Modified package manager
- `dnf` - Dandified YUM package manager
- `rpm2cpio` - Convert RPM to cpio archive
- `repoquery` - Query RPM repositories
- `rpmbuild` - Build RPM packages
- `rpmquery` - Query RPM packages
- `rpmverify` - Verify RPM packages
- `createrepo` - Create RPM repositories
- `yum-utils` - Additional YUM utilities
- `rpmkeys` - RPM key management utility

## Best Practices

### Package Installation
1. Use `yum` or `dnf` for regular package management to handle dependencies
2. Use `rpm` only for local .rpm files or when you need low-level control
3. Always verify package signatures before installation
4. Check package architecture compatibility
5. Test installations in development environments first

### System Maintenance
1. Regularly verify package integrity with `rpm -Va`
2. Keep track of manually installed packages
3. Monitor package changes and modifications
4. Backup RPM database before major operations
5. Use package signing for security verification

### Security Considerations
1. Always verify GPG signatures before installing packages
2. Use trusted repositories only
3. Import and manage GPG keys properly
4. Monitor package installations for unauthorized changes
5. Use vendor-provided packages when possible

### Troubleshooting
1. Use `rpm -Va` to find modified or missing files
2. Check dependency conflicts before manual operations
3. Review `/var/log/rpm.log` for installation history
4. Use `--nodeps` option only when absolutely necessary
5. Verify database integrity with `--verifydb`

### Performance Optimization
1. Rebuild RPM database regularly for performance
2. Use query formatting for efficient reporting
3. Monitor package sizes for disk space management
4. Use `rpm2cpio` for file extraction without installation
5. Consider using package groups for related software

The `rpm` command provides fundamental package management capabilities for RPM-based distributions, offering precise control over package operations and serving as the foundation for higher-level package management systems like `yum` and `dnf`. While it lacks automatic dependency resolution, it offers powerful query, verification, and manipulation features essential for system administration and troubleshooting.