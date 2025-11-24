---
title: apt-get - Package Management Tool
description: Manage packages on Debian-based Linux distributions using APT
sidebar_label: apt-get
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# apt-get - Package Management Tool

The `apt-get` command is a package management utility used on Debian-based Linux distributions like Ubuntu, Debian, and their derivatives. It handles installation, removal, and updating of software packages from configured repositories.

## Syntax

```bash
apt-get [OPTIONS] COMMAND [PACKAGE_NAME...]
```

## Key Commands

### Package Management
- `install PACKAGE` - Install new packages
- `remove PACKAGE` - Remove packages (keep configuration files)
- `purge PACKAGE` - Remove packages and configuration files
- `update` - Refresh package lists from repositories
- `upgrade` - Upgrade all installed packages
- `dist-upgrade` - Upgrade system with intelligent dependency resolution
- `autoremove` - Remove automatically installed packages no longer needed

### Maintenance
- `clean` - Delete downloaded package files
- `autoclean` - Delete old downloaded package files
- `check` - Verify for broken dependencies
- `source PACKAGE` - Download source code for package
- `build-dep PACKAGE` - Install build dependencies for package

## Options

### General Options
- `-h`, `--help` - Show help message
- `-q`, `--quiet` - Quiet mode
- `-qq` - Even quieter mode
- `-s`, `--dry-run` - Simulate actions without making changes
- `-y`, `--yes` - Assume yes to all prompts
- `-f`, `--fix-broken` - Attempt to fix broken dependencies

### Configuration
- `-c FILE`, `--config-file=FILE` - Use specific configuration file
- `-o OPTION=VALUE` - Set configuration option

### Output Control
- `-V`, `--verbose` - Show additional version information
- `--no-install-recommends` - Don't install recommended packages
- `--install-suggests` - Install suggested packages
- `--download-only` - Download packages without installing

## Examples

### Basic Package Operations
```bash
# Update package lists
sudo apt-get update

# Install a package
sudo apt-get install vim

# Install multiple packages
sudo apt-get install git curl wget

# Remove a package (keep config)
sudo apt-get remove vim

# Remove package and configuration
sudo apt-get purge vim

# Upgrade all packages
sudo apt-get upgrade

# System upgrade with dependency resolution
sudo apt-get dist-upgrade
```

### System Maintenance
```bash
# Remove unnecessary packages
sudo apt-get autoremove

# Clean package cache
sudo apt-get clean

# Clean old package files
sudo apt-get autoclean

# Fix broken dependencies
sudo apt-get install -f
sudo apt-get --fix-broken install

# Check for broken dependencies
sudo apt-get check
```

### Package Information and Search
```bash
# Show package information
apt-cache show package-name

# Search for packages
apt-cache search keyword

# Show package dependencies
apt-cache depends package-name

# Show reverse dependencies
apt-cache rdepends package-name

# Show package statistics
apt-cache stats
```

### Advanced Usage
```bash
# Install specific version
sudo apt-get install package-name=version

# Reinstall package
sudo apt-get install --reinstall package-name

# Download only (don't install)
sudo apt-get download package-name

# Install without recommends
sudo apt-get install --no-install-recommends package-name

# Install with build dependencies
sudo apt-get build-dep package-name

# Download source code
apt-get source package-name
```

### Simulation and Verification
```bash
# Simulate installation
sudo apt-get install -s package-name

# Show what would be upgraded
sudo apt-get upgrade -s

# Show package versions
apt-cache policy package-name

# Check which packages are upgradable
apt list --upgradable
```

## Repository Management

### Sources List Configuration
The main configuration file is `/etc/apt/sources.list`:

```bash
# Example /etc/apt/sources.list for Ubuntu
deb http://archive.ubuntu.com/ubuntu/ focal main restricted
deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted
deb http://archive.ubuntu.com/ubuntu/ focal universe
deb http://archive.ubuntu.com/ubuntu/ focal-backports main restricted

deb http://security.ubuntu.com/ubuntu/ focal-security main restricted
```

### Adding Repositories
```bash
# Add PPA repository
sudo add-apt-repository ppa:user/ppa-name
sudo apt-get update

# Add repository manually
echo "deb http://repository.domain.com/ubuntu/ focal main" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
```

## Common Workflows

### Fresh System Setup
```bash
# Update system
sudo apt-get update
sudo apt-get upgrade

# Install essential packages
sudo apt-get install build-essential curl git vim

# Install development tools
sudo apt-get install python3 python3-pip nodejs npm
```

### System Maintenance
```bash
# Regular maintenance
sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove
sudo apt-get autoclean
```

### Development Environment Setup
```bash
# Install development tools
sudo apt-get install build-essential cmake git

# Install Python development
sudo apt-get install python3 python3-pip python3-dev python3-venv

# Install web development tools
sudo apt-get install nodejs npm
sudo npm install -g n
sudo n lts
```

## Configuration Files

### /etc/apt/apt.conf
```bash
# Example apt.conf
APT::Get::Assume-Yes "true";
APT::Get::fix-broken "true";
APT::Install-Recommends "false";
APT::Clean-Installed "true";
Acquire::Retries "3";
```

### /etc/apt/sources.list.d/
Additional repository files in this directory:
```bash
# Example custom repository file
/etc/apt/sources.list.d/custom.list
```

### /etc/apt/preferences
Package pinning and preferences:
```bash
# Example preferences file
Package: *
Pin: release a=stable
Pin-Priority: 900

Package: *
Pin: release a=testing
Pin-Priority: 400
```

## Package States and Selections

### Package States
- **install**: Marked for installation
- **deinstall**: Marked for removal (keep config)
- **purge**: Marked for removal (delete config)
- **hold**: Prevent updates or removals

### Managing Package States
```bash
# Show package selection states
apt-get -s install package-name

# Put package on hold
echo "package-name hold" | sudo dpkg --set-selections

# Remove hold
echo "package-name install" | sudo dpkg --set-selections

# Show package states
dpkg --get-selections | grep package-name
```

## Security and Authentication

### GPG Key Management
```bash
# Add repository GPG key
wget -qO - https://repository.domain.com/key.asc | sudo apt-key add -

# List trusted keys
apt-key list

# Remove key
sudo apt-key del KEY_ID
```

### Secure APT Configuration
```bash
# Enable security updates only
echo "Acquire::AllowUnauthenticated \"false\";" | sudo tee -a /etc/apt/apt.conf.d/99-security
```

## Troubleshooting

### Common Issues
```bash
# Fix "Release file not found" errors
sudo apt-get update --allow-releaseinfo-change

# Resolve dependency conflicts
sudo apt-get install -f

# Clear package cache if needed
sudo rm -rf /var/lib/apt/lists/*
sudo apt-get update

# Lock file issues
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo dpkg --configure -a
```

### Network Issues
```bash
# Check repository connectivity
ping archive.ubuntu.com

# Use different mirror
sudo apt-get update -o Acquire::Check-Valid-Until=false

# Force IPv4 or IPv6
sudo apt-get update -o Acquire::ForceIPv4=true
```

## Performance Optimization

### Parallel Downloads
```bash
# Enable parallel downloads
echo "Acquire::Retries \"3\";" | sudo tee -a /etc/apt/apt.conf.d/99-performance
echo "Acquire::http::Pipeline-Depth \"0\";" | sudo tee -a /etc/apt/apt.conf.d/99-performance
```

### Alternative APT Tools
```bash
# Modern APT interface (recommended)
sudo apt update
sudo apt install package-name
sudo apt remove package-name

# Nala - APT frontend with better output
sudo nala update
sudo nala install package-name

# Aptitude - Text-based interface
sudo aptitude update
sudo aptitude install package-name
```

## Best Practices

1. **Always run `apt-get update`** before installing packages
2. **Use `sudo apt-get upgrade`** regularly for security updates
3. **Clean up with `autoremove`** and `autoclean` periodically
4. **Pin important packages** to prevent unwanted updates
5. **Backup system** before major upgrades
6. **Read package descriptions** before installing
7. **Use virtual packages** for generic requirements
8. **Test in virtual environment** before production deployment

## Related Commands

- [`apt-cache`](/docs/commands/package-management/apt-cache) - Package information utility
- [`apt`](/docs/commands/package-management/apt) - Modern APT interface
- [`dpkg`](/docs/commands/package-management/dpkg) - Low-level package manager
- [`apt-key`](/docs/commands/package-management/apt-key) - GPG key management
- [`add-apt-repository`](/docs/commands/package-management/add-apt-repository) - Repository management

The `apt-get` command remains a fundamental tool for Debian-based systems, providing reliable package management capabilities essential for system administration and software deployment.