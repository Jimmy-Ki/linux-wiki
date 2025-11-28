---
title: rpm - RPM Package Manager
sidebar_label: rpm
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# rpm - RPM Package Manager

The `rpm` command is the powerful package management utility for RPM-based Linux distributions, including Red Hat Enterprise Linux, CentOS, Fedora, and SUSE. It provides low-level package installation, removal, querying, and verification capabilities, serving as the foundation for higher-level package managers like yum and dnf. RPM packages contain software files, metadata, and installation scripts that ensure proper software deployment and dependency management.

## Basic Syntax

```bash
rpm [OPTIONS] [PACKAGE_FILE|PACKAGE_NAME]
```

## Common Commands

### Installation Commands
- `-i, --install` - Install package
- `-U, --upgrade` - Upgrade package (install if not present)
- `-F, --freshen` - Upgrade package (only if already installed)
- `--reinstall` - Reinstall package
- `--replacefiles` - Replace files owned by another package
- `--replacepkgs` - Reinstall if already present

### Query Commands
- `-q, --query` - Query package information
- `-a, --all` - Query all installed packages
- `-f, --file` - Query package owning file
- `-p, --package` - Query package file
- `-l, --list` - List files in package
- `-i, --info` - Display package information
- `-d, --docfiles` - List documentation files
- `-c, --configfiles` - List configuration files

### Verification Commands
- `-V, --verify` - Verify package installation
- `-K, --checksig` - Check package signature
- `--import` - Import public keys

### Removal Commands
- `-e, --erase` - Remove package
- `--allmatches` - Remove all versions
- `--nodeps` - Don't check dependencies

### Database Commands
- `--initdb` - Initialize database
- `--rebuilddb` - Rebuild database
- `--verifydb` - Verify database

## Common Options

### Installation Options
- `-v, --verbose` - Provide more detailed output
- `-h, --hash` - Print hash marks during installation
- `--force` - Force installation ignoring conflicts
- `--nodeps` - Don't check package dependencies
- `--noscripts` - Don't execute package scripts
- `--notriggers` - Don't execute package triggers
- `--oldpackage` - Upgrade to an older version
- `--test` - Test installation without actually installing
- `--excludedocs` - Don't install documentation
- `--includedocs` - Install documentation

### Query Options
- `--queryformat` - Custom query format
- `--scripts` - Display package scripts
- `--triggers` - Display package triggers
- `--changelog` - Display package changelog
- `--requires` - Show package requirements
- `--provides` - Show package capabilities
- `--conflicts` - Show package conflicts
- `--obsoletes` - Show package obsoletes
- `--dump` - Dump package information

### Verification Options
- `--nofiles` - Don't verify file attributes
- `--nodeps` - Don't verify dependencies
- `--noscripts` - Don't verify scripts
- `--nomd5` - Don't verify file MD5 sums
- `--nomtime` - Don't verify file modification times
- `--nosize` - Don't verify file sizes

### Signature Options
- `--addsign` - Add signature to package
- `--resign` - Replace existing signature
- `--checksig` - Check package signature

## Usage Examples

### Package Installation

#### Basic Installation
```bash
# Install an RPM package
sudo rpm -i package.rpm

# Install with verbose output and progress
sudo rpm -ivh package.rpm

# Install multiple packages
sudo rpm -ivh package1.rpm package2.rpm package3.rpm

# Install package with specific architecture
sudo rpm -ivh package.x86_64.rpm

# Install from URL
sudo rpm -ivh http://example.com/package.rpm

# Install from local directory
sudo rpm -ivh /path/to/packages/*.rpm
```

#### Advanced Installation
```bash
# Install ignoring dependencies
sudo rpm -ivh --nodeps package.rpm

# Install forcing overwrite of files
sudo rpm -ivh --force package.rpm

# Install without executing scripts
sudo rpm -ivh --noscripts package.rpm

# Install excluding documentation
sudo rpm -ivh --excludedocs package.rpm

# Test installation (dry run)
sudo rpm -ivh --test package.rpm

# Install with custom database location
sudo rpm -ivh --dbpath /custom/rpmdb package.rpm
```

### Package Upgrades

#### Standard Upgrades
```bash
# Upgrade package (install if not present)
sudo rpm -Uvh package.rpm

# Freshen package (upgrade only if installed)
sudo rpm -Fvh package.rpm

# Upgrade multiple packages
sudo rpm -Uvh *.rpm

# Upgrade with verbose output
sudo rpm -Uvh --verbose package.rpm
```

#### Special Upgrade Scenarios
```bash
# Upgrade to older version
sudo rpm -Uvh --oldpackage package.rpm

# Reinstall package
sudo rpm -Uvh --replacepkgs package.rpm

# Upgrade ignoring dependencies
sudo rpm -Uvh --nodeps package.rpm

# Force upgrade ignoring conflicts
sudo rpm -Uvh --force package.rpm

# Upgrade with test mode
sudo rpm -Uvh --test package.rpm

# Upgrade all packages in directory
sudo rpm -Uvh /updates/*.rpm
```

### Package Removal

#### Basic Removal
```bash
# Remove package
sudo rpm -e package_name

# Remove package with verbose output
sudo rpm -ev package_name

# Remove multiple packages
sudo rpm -e package1 package2 package3

# Remove all versions of package
sudo rpm -e --allmatches package_name
```

#### Advanced Removal
```bash
# Remove ignoring dependencies
sudo rpm -e --nodeps package_name

# Remove without executing scripts
sudo rpm -e --noscripts package_name

# Remove just the files, keep entry in database
sudo rpm -e --justdb package_name

# Remove without checking for matches
sudo rpm -e --allmatches package_name

# Force removal of required package
sudo rpm -e --nodeps --noscripts package_name
```

### Package Querying

#### Basic Queries
```bash
# List all installed packages
rpm -qa

# Query specific package
rpm -q package_name

# Query package with version
rpm -q package_name-version-release

# Check if package is installed
rpm -q package_name && echo "Installed" || echo "Not installed"

# Query multiple packages
rpm -q package1 package2 package3
```

#### Package Information
```bash
# Show package information
rpm -qi package_name

# List files in installed package
rpm -ql package_name

# List documentation files
rpm -qd package_name

# List configuration files
rpm -qc package_name

# List only executable files
rpm -ql package_name | xargs file | grep "executable"

# Show package scripts
rpm -q --scripts package_name

# Display package changelog
rpm -q --changelog package_name
```

#### File-based Queries
```bash
# Find package owning file
rpm -qf /path/to/file

# Find package owning multiple files
rpm -qf /etc/passwd /etc/group

# Query package file
rpm -qp package.rpm

# Show package file information
rpm -qpi package.rpm

# List files in package file
rpm -qpl package.rpm

# Query package file dependencies
rpm -qpR package.rpm
```

#### Dependency Queries
```bash
# Show package requirements
rpm -qR package_name

# Show package capabilities
rpm -q --provides package_name

# Show package conflicts
rpm -q --conflicts package_name

# Show package obsoletes
rpm -q --obsoletes package_name

# Find what provides a capability
rpm -q --whatprovides capability_name

# Find packages requiring a capability
rpm -q --whatrequires capability_name
```

### Custom Query Formats

#### Basic Custom Formats
```bash
# Format package list
rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n"

# Show package and vendor
rpm -qa --queryformat "%-30{NAME} %-15{VENDOR}\n"

# Show package size
rpm -qa --queryformat "%{SIZE} bytes\t%{NAME}\n" | sort -n

# Show installation date
rpm -qa --queryformat "%{INSTALLTIME:date} %{NAME}\n" | sort

# Show package summary
rpm -qa --queryformat "%{NAME}: %{SUMMARY}\n"
```

#### Advanced Query Formats
```bash
# Generate package inventory report
rpm -qa --queryformat "%{NAME}\t%{VERSION}\t%{RELEASE}\t%{ARCH}\t%{INSTALLTIME:date}\n" > inventory.csv

# Show packages by group
rpm -qa --queryformat "%{GROUP}\t%{NAME}\n" | sort

# Display URL and license
rpm -qa --queryformat "%{NAME}\t%{URL}\t%{LICENSE}\n"

# Show build host and time
rpm -qa --queryformat "%{NAME}\t%{BUILDHOST}\t%{BUILDTIME:date}\n"

# Find packages with specific requirements
rpm -qa --queryformat "[%{REQUIRENAME} %{REQUIREFLAGS:depflags} %{REQUIREVERSION}\n]" package_name
```

### Package Verification

#### Basic Verification
```bash
# Verify package installation
rpm -V package_name

# Verify all packages
rpm -Va

# Verify with verbose output
rpm -Vv package_name

# Verify package file
rpm -Vp package.rpm

# Verify specific file
rpm -Vf /path/to/file
```

#### Advanced Verification
```bash
# Verify without MD5 check
rpm -V --nomd5 package_name

# Verify without dependency check
rpm -V --nodeps package_name

# Verify without checking file modification times
rpm -V --nomtime package_name

# Show detailed verification results
rpm -Va --nomtime --nosize --nomd5 --nouser --nogroup --nomode --nordev

# Verify only configuration files
rpm -Vc package_name

# Verify only documentation files
rpm -Vd package_name
```

#### Understanding Verification Output
```bash
# The verification output format:
# S - File size differs
# M - Mode differs (includes permissions and file type)
# 5 - MD5 sum differs
# D - Device major/minor number mismatch
# L - readLink(2) path mismatch
# U - User ownership differs
# G - Group ownership differs
# T - mTime differs
# P - caPabilities differ

# Example: .M...UG..  c /etc/passwd
# Means: Mode, User, and Group have changed for config file
```

### Signature Management

#### GPG Key Operations
```bash
# Import GPG key
sudo rpm --import RPM-GPG-KEY

# Import key from URL
sudo rpm --import https://example.com/key.asc

# Check package signature
rpm --checksig package.rpm

# Check all package signatures in directory
rpm --checksig /path/to/packages/*.rpm

# Verify with detailed output
rpm --checksig -v package.rpm
```

#### Key Management
```bash
# List all public keys
rpm -qa | grep gpg-pubkey

# Show key information
rpm -qi gpg-pubkey-<key-id>

# Remove a key
sudo rpm -e gpg-pubkey-<key-id>

# Add signature to package
rpm --addsign --key-id=<key-id> package.rpm

# Replace existing signature
rpm --resign --key-id=<key-id> package.rpm
```

### Database Management

#### Basic Database Operations
```bash
# Initialize RPM database
sudo rpm --initdb

# Rebuild RPM database
sudo rpm --rebuilddb

# Verify RPM database
sudo rpm --verifydb

# Use alternative database directory
rpm --dbpath /custom/dbpath -qa
```

#### Database Maintenance
```bash
# Check database integrity
sudo rpm --verifydb

# Rebuild corrupted database
sudo rm -f /var/lib/rpm/__db*
sudo rpm --rebuilddb

# Export package list
rpm -qa --queryformat '%{NAME}\n' > packages.txt

# Export complete package information
rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" > full_package_list.txt

# Show database statistics
rpm --eval '%{_dbpath}'
rpm --eval '%{_rpmdb_path}'
```

## Advanced Usage

### Package Creation and Manipulation

#### Extracting RPM Contents
```bash
# Extract files from RPM without installing
rpm2cpio package.rpm | cpio -idmv

# Extract to specific directory
mkdir temp && cd temp
rpm2cpio ../package.rpm | cpio -idmv

# Extract only specific files
rpm2cpio package.rpm | cpio -idmv ./path/to/file

# Convert RPM to cpio archive
rpm2cpio package.rpm > package.cpio

# Extract with preservation of permissions
rpm2cpio package.rpm | cpio -idmuv
```

#### Building Packages
```bash
# Show build requirements
rpm -q --queryformat "[%{REQUIRENAME} %{REQUIREFLAGS:depflags} %{REQUIREVERSION}\n]" package_name

# Display package header in YAML format
rpm -q --queryformat "[%{*:yaml}\n]" package_name

# Show build information
rpm -q --queryformat "%{NAME} was built on %{BUILDTIME:date} by %{BUILDUSER}\n" package_name

# List package triggers
rpm -q --triggers package_name

# Show trigger scripts
rpm -q --triggers --scripts package_name
```

### System Information and Reporting

#### Package Analysis
```bash
# Find recently installed packages
rpm -qa --queryformat "%{INSTALLTIME:date} %{NAME}\n" | sort | tail -10

# Show packages by size
rpm -qa --queryformat "%{SIZE}\t%{NAME}\n" | sort -n | tail -10

# Find large packages
rpm -qa --queryformat "%{SIZE} %{NAME}\n" | awk '$1 > 1048576 {print $1/1024/1024 " MB", $2}' | sort -n

# Show packages from specific vendor
rpm -qa --queryformat "%{VENDOR}\t%{NAME}\n" | grep "Red Hat"

# List packages by group
rpm -qa --queryformat "%{GROUP}\t%{NAME}\n" | sort | uniq -c
```

#### Dependency Analysis
```bash
# Generate dependency graph
rpm -qa | xargs rpm -qR | sort | uniq > all_requires.txt

# Find packages that depend on given package
rpm -qa --queryformat "%{NAME} %{REQUIRES}\n" | grep "package_name" | cut -d' ' -f1 | sort -u

# Find missing dependencies
rpm -Va | grep -E "^[^.]"

# Check for circular dependencies
rpm -qa | xargs rpm -q --whatrequires | grep -v "no package"
```

### Backup and Recovery

#### System Backup Operations
```bash
# Backup RPM database
sudo cp -a /var/lib/rpm /backup/rpm_backup_$(date +%Y%m%d)

# Export installed packages list
rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" > installed_packages.txt

# Create package inventory with detailed information
rpm -qa --queryformat "%{NAME}\t%{VERSION}\t%{RELEASE}\t%{ARCH}\t%{INSTALLTIME:date}\t%{SIZE}\n" > full_inventory.txt

# Backup configuration files
rpm -qac | xargs tar -czf config_backup.tar.gz

# Verify all packages before backup
rpm -Va > package_verification_$(date +%Y%m%d).txt
```

#### Recovery Procedures
```bash
# Recreate package list from backup
cat installed_packages.txt | xargs sudo yum install

# Restore corrupted database
sudo mv /var/lib/rpm /var/lib/rpm.backup
sudo rpm --initdb
sudo rpm --rebuilddb

# Find and reinstall missing packages
rpm -Va | grep '^missing' | awk '{print $2}' | while read file; do
    package=$(rpm -qf "$file" 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "Reinstalling $package for $file"
        sudo yum reinstall "$package"
    fi
done
```

## Practical Examples

### System Administration

#### Package Audit and Management
```bash
# Generate system package report
echo "=== System Package Report ===" > package_report.txt
echo "Generated: $(date)" >> package_report.txt
echo "" >> package_report.txt

# Total packages count
echo "Total packages: $(rpm -qa | wc -l)" >> package_report.txt

# Packages by vendor
echo "" >> package_report.txt
echo "=== Packages by Vendor ===" >> package_report.txt
rpm -qa --queryformat "%{VENDOR}\n" | sort | uniq -c | sort -nr >> package_report.txt

# Large packages
echo "" >> package_report.txt
echo "=== Largest Packages (>50MB) ===" >> package_report.txt
rpm -qa --queryformat "%{SIZE} %{NAME}\n" | awk '$1 > 52428800 {print $1/1024/1024 " MB", $2}' | sort -nr >> package_report.txt

# Recently installed packages
echo "" >> package_report.txt
echo "=== Recently Installed (Last 7 Days) ===" >> package_report.txt
seven_days_ago=$(( $(date +%s) - 7*24*3600 ))
rpm -qa --queryformat "%{INSTALLTIME} %{NAME}\n" | awk -v cutoff=$seven_days_ago '$1 > cutoff {print strftime("%Y-%m-%d", $1), $2}' >> package_report.txt
```

#### Security Audit
```bash
# Check for packages with security updates
echo "=== Security Audit ===" > security_audit.txt

# Find setuid files from packages
echo "" >> security_audit.txt
echo "=== Setuid Files ===" >> security_audit.txt
find / -type f -perm -4000 -exec rpm -qf {} \; 2>/dev/null | sort -u >> security_audit.txt

# Check modified configuration files
echo "" >> security_audit.txt
echo "=== Modified Configuration Files ===" >> security_audit.txt
rpm -Va | grep "^..5" | grep "c$" >> security_audit.txt

# List packages from unofficial repositories
echo "" >> security_audit.txt
echo "=== Unofficial Packages ===" >> security_audit.txt
rpm -qa --queryformat "%{VENDOR}\t%{NAME}\n" | grep -v -E "(Red Hat|Fedora|CentOS)" >> security_audit.txt
```

### Automation and Scripting

#### Package Management Scripts
```bash
#!/bin/bash
# Advanced RPM package management script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if package is installed
is_installed() {
    rpm -q "$1" >/dev/null 2>&1
}

# Function to install package if missing
install_if_missing() {
    local package="$1"
    if ! is_installed "$package"; then
        echo -e "${YELLOW}Installing $package...${NC}"
        sudo rpm -ivh "$package.rpm" 2>/dev/null || {
            echo -e "${RED}Failed to install $package${NC}"
            return 1
        }
        echo -e "${GREEN}$package installed successfully${NC}"
    else
        echo -e "${GREEN}$package is already installed${NC}"
    fi
}

# Function to verify package integrity
verify_package() {
    local package="$1"
    echo -e "${YELLOW}Verifying $package...${NC}"
    if rpm -V "$package" >/dev/null 2>&1; then
        echo -e "${GREEN}$package is intact${NC}"
    else
        echo -e "${RED}$package has modifications${NC}"
        rpm -V "$package"
    fi
}

# Function to find package dependencies
find_dependencies() {
    local package="$1"
    echo -e "${YELLOW}Dependencies for $package:${NC}"
    rpm -qR "$package" | while read dep; do
        provider=$(rpm -q --whatprovides "$dep" 2>/dev/null | head -1)
        if [ -n "$provider" ]; then
            echo "  $dep -> $provider"
        else
            echo -e "  ${RED}$dep -> NOT FOUND${NC}"
        fi
    done
}

# Function to backup package information
backup_package_info() {
    local package="$1"
    local backup_dir="package_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"

    echo -e "${YELLOW}Backing up information for $package...${NC}"

    # Package information
    rpm -qi "$package" > "$backup_dir/${package}_info.txt"

    # File list
    rpm -ql "$package" > "$backup_dir/${package}_files.txt"

    # Scripts
    rpm -q --scripts "$package" > "$backup_dir/${package}_scripts.txt" 2>/dev/null

    # Dependencies
    rpm -qR "$package" > "$backup_dir/${package}_requires.txt"

    echo -e "${GREEN}Backup created in $backup_dir${NC}"
}

# Example usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> <package>"
    echo "Commands: install, verify, deps, backup, list-large"
    exit 1
fi

case "$1" in
    "install")
        install_if_missing "$2"
        ;;
    "verify")
        verify_package "$2"
        ;;
    "deps")
        find_dependencies "$2"
        ;;
    "backup")
        backup_package_info "$2"
        ;;
    "list-large")
        echo -e "${YELLOW}Largest packages:${NC}"
        rpm -qa --queryformat "%{SIZE} %{NAME}\n" | sort -nr | head -10 | \
        awk '{printf "%.2f MB\t%s\n", $1/1024/1024, $2}'
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        exit 1
        ;;
esac
```

#### Package Update Script
```bash
#!/bin/bash
# System package update automation script

UPDATE_DIR="/tmp/rpm_updates"
LOG_FILE="/var/log/rpm_updates.log"

# Create update directory
mkdir -p "$UPDATE_DIR"
cd "$UPDATE_DIR"

# Function to log actions
log_action() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to backup current state
backup_current_state() {
    log_action "Creating backup of current package state"
    rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" > packages_before_update.txt
}

# Function to check package integrity
check_integrity() {
    log_action "Checking package integrity"
    local issues=$(rpm -Va 2>/dev/null | wc -l)
    if [ "$issues" -gt 0 ]; then
        log_action "WARNING: Found $issues package integrity issues before update"
        rpm -Va > integrity_issues_before.txt
    else
        log_action "All packages have valid integrity"
    fi
}

# Function to perform update
perform_update() {
    local rpm_file="$1"
    local package_name=$(rpm -qp --queryformat "%{NAME}" "$rpm_file" 2>/dev/null)

    if [ -z "$package_name" ]; then
        log_action "ERROR: Cannot determine package name for $rpm_file"
        return 1
    fi

    log_action "Updating $package_name with $rpm_file"

    # Test the update first
    if ! sudo rpm -Uvh --test "$rpm_file" 2>/dev/null; then
        log_action "ERROR: Test update failed for $package_name"
        return 1
    fi

    # Perform the actual update
    if sudo rpm -Uvh "$rpm_file" 2>/dev/null; then
        log_action "Successfully updated $package_name"
        return 0
    else
        log_action "ERROR: Failed to update $package_name"
        return 1
    fi
}

# Function to verify update
verify_update() {
    local package_name="$1"
    log_action "Verifying update for $package_name"

    if rpm -V "$package_name" >/dev/null 2>&1; then
        log_action "Update verification successful for $package_name"
        return 0
    else
        log_action "WARNING: Update verification failed for $package_name"
        rpm -V "$package_name"
        return 1
    fi
}

# Main execution
main() {
    log_action "Starting RPM package update process"

    # Backup current state
    backup_current_state

    # Check integrity before updates
    check_integrity

    # Process all RPM files in the directory
    for rpm_file in *.rpm; do
        if [ -f "$rpm_file" ]; then
            package_name=$(rpm -qp --queryformat "%{NAME}" "$rpm_file" 2>/dev/null)
            if [ $? -eq 0 ]; then
                if perform_update "$rpm_file"; then
                    verify_update "$package_name"
                fi
            else
                log_action "ERROR: Invalid RPM file: $rpm_file"
            fi
        fi
    done

    # Final integrity check
    log_action "Performing final integrity check"
    check_integrity

    # Generate final report
    log_action "Generating final update report"
    rpm -qa --queryformat "%{NAME}-%{VERSION}-%{RELEASE}.%{ARCH}\n" > packages_after_update.txt

    # Show differences
    if diff packages_before_update.txt packages_after_update.txt > package_changes.txt; then
        log_action "No package changes detected"
    else
        log_action "Package changes detected, see package_changes.txt"
    fi

    log_action "RPM package update process completed"
}

# Run main function
main "$@"
```

### Troubleshooting and Recovery

#### Database Corruption Recovery
```bash
#!/bin/bash
# RPM database recovery script

DB_PATH="/var/lib/rpm"
BACKUP_PATH="/var/lib/rpm.backup.$(date +%Y%m%d_%H%M%S)"

# Function to backup current database
backup_database() {
    echo "Creating backup of current database..."
    sudo cp -a "$DB_PATH" "$BACKUP_PATH"
    echo "Backup created at $BACKUP_PATH"
}

# Function to check database integrity
check_database() {
    echo "Checking database integrity..."
    if sudo rpm --verifydb 2>/dev/null; then
        echo "Database is intact"
        return 0
    else
        echo "Database has issues"
        return 1
    fi
}

# Function to rebuild database
rebuild_database() {
    echo "Rebuilding database..."

    # Remove lock files
    sudo rm -f "$DB_PATH"/__db.*

    # Rebuild database
    if sudo rpm --rebuilddb 2>/dev/null; then
        echo "Database rebuilt successfully"
        return 0
    else
        echo "Database rebuild failed"
        return 1
    fi
}

# Function to initialize fresh database
init_database() {
    echo "Initializing fresh database..."

    # Move corrupted database
    sudo mv "$DB_PATH" "$DB_PATH.corrupted.$(date +%Y%m%d_%H%M%S)"

    # Create new database
    sudo mkdir -p "$DB_PATH"
    if sudo rpm --initdb 2>/dev/null; then
        echo "Fresh database initialized"
        return 0
    else
        echo "Failed to initialize database"
        return 1
    fi
}

# Main recovery process
main() {
    echo "RPM Database Recovery Process"
    echo "=============================="

    # Check current state
    if check_database; then
        echo "Database is healthy, no recovery needed"
        exit 0
    fi

    # Backup current database
    backup_database

    # Try to rebuild
    if rebuild_database; then
        echo "Recovery successful via rebuild"
        exit 0
    fi

    # Try fresh initialization
    echo "Rebuild failed, trying fresh initialization..."
    if init_database; then
        echo "Recovery successful via fresh initialization"
        echo "WARNING: You may need to reinstall packages"
        exit 0
    fi

    echo "All recovery attempts failed"
    echo "Please restore from backup or reinstall system"
    exit 1
}

main "$@"
```

## Integration and Automation

### System Integration

#### Cron Jobs for Package Management
```bash
# Daily package verification cron job
0 2 * * * /usr/local/bin/daily_package_check.sh

#!/bin/bash
# Daily package verification script
# /usr/local/bin/daily_package_check.sh

LOG_FILE="/var/log/daily_package_check.log"
EMAIL="admin@example.com"

# Run verification
{
    echo "Daily Package Verification - $(date)"
    echo "===================================="

    # Check for missing files
    echo "Checking for missing files..."
    rpm -Va | grep '^missing'

    # Check for modified configuration files
    echo ""
    echo "Checking modified configuration files..."
    rpm -Va | grep '^..5' | grep 'c$'

    # Check database integrity
    echo ""
    echo "Checking database integrity..."
    sudo rpm --verifydb && echo "Database OK" || echo "Database issues found"

    echo ""
    echo "Verification completed at $(date)"

} >> "$LOG_FILE" 2>&1

# Email report if issues found
if [ $(wc -l < "$LOG_FILE") -gt 10 ]; then
    tail -n 50 "$LOG_FILE" | mail -s "Daily Package Verification Report" "$EMAIL"
fi
```

#### Integration with Monitoring Systems
```bash
#!/bin/bash
# Package monitoring for Nagios/Icinga

# Exit codes
OK=0
WARNING=1
CRITICAL=2
UNKNOWN=3

# Check package count
total_packages=$(rpm -qa | wc -l)
expected_packages=1000  # Adjust based on your system

if [ "$total_packages" -lt $((expected_packages - 100)) ]; then
    echo "CRITICAL: Unusually low package count ($total_packages)"
    exit $CRITICAL
elif [ "$total_packages" -lt $((expected_packages - 50)) ]; then
    echo "WARNING: Low package count ($total_packages)"
    exit $WARNING
fi

# Check for verification issues
issues=$(rpm -Va 2>/dev/null | wc -l)

if [ "$issues" -gt 100 ]; then
    echo "CRITICAL: $issues package verification issues"
    exit $CRITICAL
elif [ "$issues" -gt 10 ]; then
    echo "WARNING: $issues package verification issues"
    exit $WARNING
fi

# Check database integrity
if ! sudo rpm --verifydb >/dev/null 2>&1; then
    echo "CRITICAL: RPM database integrity issues"
    exit $CRITICAL
fi

echo "OK: $total_packages packages, $issues verification issues"
exit $OK
```

## Related Commands

- [`yum`](/docs/commands/package-management/yum) - Yellowdog Updater Modified package manager
- [`dnf`](/docs/commands/package-management/dnf) - Dandified YUM package manager
- [`rpm2cpio`](/docs/commands/package-management/rpm2cpio) - Convert RPM to cpio archive
- [`repoquery`](/docs/commands/package-management/repoquery) - Query RPM repositories
- [`rpmbuild`](/docs/commands/package-management/rpmbuild) - Build RPM packages
- [`rpmquery`](/docs/commands/package-management/rpmquery) - Query RPM packages
- [`rpmverify`](/docs/commands/package-management/rpmverify) - Verify RPM packages
- [`createrepo`](/docs/commands/package-management/createrepo) - Create RPM repositories
- [`yum-utils`](/docs/commands/package-management/yum-utils) - Additional YUM utilities
- [`rpmkeys`](/docs/commands/package-management/rpmkeys) - RPM key management utility
- [`apt`](/docs/commands/package-management/apt) - Advanced Package Tool (Debian/Ubuntu)
- [`dpkg`](/docs/commands/package-management/dpkg) - Debian package manager
- [`pacman`](/docs/commands/package-management/pacman) - Arch Linux package manager

## Best Practices

### Package Installation Best Practices
1. **Use high-level package managers** (yum/dnf) for regular operations to handle dependencies automatically
2. **Use rpm only for local .rpm files** or when you need low-level control
3. **Always verify package signatures** before installation with `--checksig`
4. **Check package architecture compatibility** (x86_64, i686, noarch, etc.)
5. **Test installations in development environments** before production deployment
6. **Use `--test` option** to simulate installations without actually installing
7. **Back up critical data** before major package operations
8. **Keep installation logs** for troubleshooting and audit purposes

### System Maintenance Best Practices
1. **Regularly verify package integrity** with `rpm -Va`
2. **Keep track of manually installed packages** for system documentation
3. **Monitor package changes** and modifications with automated scripts
4. **Backup RPM database** before major system changes or upgrades
5. **Use package signing** for security verification and integrity checking
6. **Implement dependency tracking** for custom-built packages
7. **Maintain package inventory** for disaster recovery planning
8. **Regular database maintenance** with `--rebuilddb` for optimal performance

### Security Best Practices
1. **Always verify GPG signatures** before installing packages from external sources
2. **Use trusted repositories only** and verify repository GPG keys
3. **Import and manage GPG keys properly** with `rpm --import`
4. **Monitor package installations** for unauthorized or suspicious changes
5. **Use vendor-provided packages** when possible for better security support
6. **Implement package integrity monitoring** as part of security monitoring
7. **Regular security audits** of installed packages and their sources
8. **Document and track** all package sources and installation procedures

### Performance Optimization
1. **Rebuild RPM database regularly** for optimal query performance
2. **Use query formatting** for efficient reporting and analysis
3. **Monitor package sizes** for effective disk space management
4. **Use `rpm2cpio`** for file extraction without full installation
5. **Implement package groups** for managing related software efficiently
6. **Optimize database operations** by avoiding unnecessary full queries
7. **Use incremental updates** instead of full reinstalls when possible
8. **Cache query results** for frequently accessed package information

## Performance Tips

1. **Query Performance**
   - Use specific query options instead of broad searches
   - Cache frequently accessed package information
   - Use custom query formats to reduce post-processing
   - Avoid recursive queries in scripts

2. **Database Optimization**
   - Run `rpm --rebuilddb` during maintenance windows
   - Ensure adequate disk space for database operations
   - Use SSD storage for better database performance
   - Monitor database size and cleanup old data

3. **Installation Performance**
   - Install multiple packages in a single command when possible
   - Use `--test` for validation before actual installation
   - Batch operations during system maintenance periods
   - Pre-download packages for faster installation

4. **Network Considerations**
   - Use local mirrors for package downloads
   - Implement package caching for offline installations
   - Use `yum` or `dnf` for dependency resolution efficiency
   - Consider bandwidth limitations for large package operations

The `rpm` command provides fundamental package management capabilities for RPM-based distributions, offering precise control over package operations and serving as the foundation for higher-level package management systems like `yum` and `dnf`. While it lacks automatic dependency resolution, it offers powerful query, verification, and manipulation features essential for system administration, troubleshooting, and package development workflows.