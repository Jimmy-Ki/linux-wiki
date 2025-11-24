---
title: aptitude - Text-based Package Management Interface
sidebar_label: aptitude
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# aptitude - Text-based Package Management Interface

The `aptitude` command is a text-based interface for the Debian package management system. It provides both a curses-based menu interface and command-line functionality for installing, upgrading, and removing Debian packages. Aptitude excels at dependency resolution and maintains a comprehensive history of package operations.

## Basic Syntax

```bash
aptitude [OPTIONS] [ACTION] [PACKAGES...]
```

## Common Options

### General Options
- `-h, --help` - Display help information
- `-v, --verbose` - Show additional information
- `-q, --quiet` - Suppress normal output
- `-s, --simulate` - Simulate actions without performing them
- `-d, --download-only` - Download packages without installing
- `-y, --assume-yes` - Assume yes to all prompts
- `-P, --prompt-after-completion` - Show prompt after operations complete
- `--no-gui` - Use command-line interface only
- `--disable-columns` - Disable columnized output

### Package Selection Options
- `--purge-unused` - Remove unused packages with configuration files
- `--show-why` - Show why packages are being installed or removed
- `--show-deps` - Show dependency information
- `--show-resolver-actions` - Show detailed dependency resolution
- `--visualize` - Show dependency graph

### Interactive Mode Options
- `--no-new-installs` - Don't install new packages (only upgrades)
- `--target-release <release>` - Set target release for packages
- `--safe-upgrade` - Safe upgrade (no new packages or removals)
- `--full-upgrade` - Full upgrade (may install/remove packages)
- `--add-user-tag <tag>` - Add user tag to packages

## Usage Examples

### Command-Line Package Management

```bash
# Update package lists
aptitude update

# Upgrade installed packages (safe)
aptitude safe-upgrade

# Full system upgrade (may install/remove packages)
aptitude full-upgrade

# Install a package
aptitude install package_name

# Install multiple packages
aptitude install package1 package2 package3

# Install package without prompts
aptitude install -y package_name

# Install specific package version
aptitude install package_name=version

# Remove a package (keep configuration)
aptitude remove package_name

# Remove package and configuration files
aptitude purge package_name

# Reinstall a package
aptitude reinstall package_name
```

### Package Search and Information

```bash
# Search for packages
aptitude search keyword

# Search with pattern matching
aptitude search ~npackage_name

# Search by description
aptitude search ~dkeyword

# Search by maintainer
aptitude search ~mmaintainer

# Show package details
aptitude show package_name

# Show package versions
aptitude versions package_name

# List installed packages
aptitude search '~i'

# List available packages
aptitude search '!~i'

# Show why a package would be installed
aptitude why package_name

# Show why a package would be removed
aptitude why-not package_name
```

### Dependency Resolution and Troubleshooting

```bash
# Show dependency resolution details
aptitude install --show-deps package_name

# Show why packages are being installed
aptitude install --show-why package_name

# Install with specific resolver strategy
aptitude install -o Aptitude::ProblemResolver::StepScore=1000 package_name

# Hold a package at current version
aptitude hold package_name

# Unhold a package
aptitude unhold package_name

# Mark package as automatically installed
aptitude markauto package_name

# Mark package as manually installed
aptitude unmarkauto package_name

# Show automatically installed packages
aptitude search '~i ~M'

# Show manually installed packages
aptitude search '~i !~M'
```

### Package Group and Task Management

```bash
# List available tasks
aptitude tasksel

# Install task
aptitude install task_name^

# List package groups
aptitude search ~T

# Install package group
aptitude install ~Tgroup_name

# Show tasks for desktop environment
aptitude install ~Tdesktop
```

### Repository Management

```bash
# Show repository sources
aptitude versions

# Install from specific repository
aptitude install -t repository_name package_name

# Show package source information
aptitude changelog package_name

# Check package availability in repositories
aptitude show package_name | grep State
```

## Practical Examples

### System Maintenance and Updates

```bash
# Complete system maintenance cycle
aptitude update && aptitude safe-upgrade

# Full system upgrade with cleanup
aptitude update && aptitude full-upgrade && aptitude purge-unused

# Security updates only
aptitude install '~nsecurity~i'

# Check for broken packages
aptitude search '~b'

# Fix broken packages
aptitude install -f

# Clean up unused packages
aptitude purge-unused

# Remove orphaned configuration files
aptitude purge '~c'
```

### Advanced Package Operations

```bash
# Install package with specific architecture
aptitude install package_name:amd64

# Install package without recommendations
aptitude install --without-recommends package_name

# Install with recommendations
aptitude install --with-recommends package_name

# Download package without installing
aptitude download package_name

# Install local package file
aptitude install /path/to/package.deb

# Build dependency installation
aptitude build-dep package_name

# Reverse dependency installation
aptitude install package_name^

# Install package from specific version
aptitude install package_name/stable
aptitude install package_name/testing
```

### Package Management Patterns

```bash
# Search patterns by architecture
aptitude search ~i~amd64

# Search by package state
aptitude search '~i~npython'  # installed python packages
aptitude search '~p~nlib'     # purged lib packages
aptitude search '~c~nconfig'  # configuration files remaining

# Search by section
aptitude search ~Sadmin        # administration packages
aptitude search ~Sdevel        # development packages
aptitude search ~Sgames        # game packages

# Search by priority
aptitude search ~Prequired
aptitude search ~Pimportant
aptitude search ~Pstandard
aptitude search ~Poptional

# Complex search patterns
aptitude search '~npython~n3.*~i'  # installed python 3 packages
aptitude search '~deditor~i'       # installed editors
aptitude search '~mmaintainer~n'   # packages by maintainer
```

### Interactive Mode Operations

```bash
# Start interactive mode
aptitude

# Start with specific filter
aptitude '~i'

# Start showing why packages are installed
aptitude --show-why

# Start with specific category
aptitude --display-format '%p%V'

# Non-interactive mode for scripting
aptitude -y install package_name
```

### Package State Management

```bash
# Show package state changes
aptitude show package_name | grep State

# Package hold management
aptitude hold package_name      # prevent upgrades
aptitude unhold package_name    # allow upgrades
aptitude hold '~n.*~i~M'        # hold all auto-installed packages

# Automatic/manual package marking
aptitude markauto package_name
aptitude unmarkauto package_name
aptitude markauto '~i~nlib.*'   # mark all lib packages as auto
aptitude unmarkauto '~i~napp.*' # mark app packages as manual

# Purge old packages
aptitude purge '~noldpackage'

# Remove specific versions
aptitude purge '~npackage~V1.0'
```

### Configuration and Customization

```bash
# Set configuration options
aptitude -o Aptitude::Delete-Unused=false install package_name
aptitude -o Aptitude::Recommends-Important=false install package_name

# Use specific resolver strategy
aptitude -o Aptitude::ProblemResolver::SolutionCost=score install package_name

# Show configuration
aptitude config dump

# Show specific configuration option
aptitude config dump | grep Recommends

# Set default actions
echo 'Aptitude::Recommends-Important "false";' >> /etc/apt/apt.conf
```

### Troubleshooting and Debugging

```bash
# Show detailed dependency resolution
aptitude install --show-deps --show-why package_name

# Debug broken dependencies
aptitude search '~b'

# Check for conflicts
aptitude install package_name --simulate

# Show resolver actions
aptitude install --show-resolver-actions package_name

# Visualize dependency graph
aptitude install --visualize package_name

# Check package versions across repositories
aptitude versions package_name

# Show package changelog
aptitude changelog package_name

# Show package files
aptitude show package_name | grep -A 20 "Package file list"
```

### Archive and Backup Operations

```bash
# Create package selection backup
aptitude search '~i!~M' > manual_packages.txt
aptitude search '~i~M' > auto_packages.txt

# Restore package selection
cat manual_packages.txt | awk '{print $2}' | xargs aptitude install

# Archive package states
aptitude search '~i' > installed_packages.log
aptitude search '~i~M' > auto_installed.log

# Compare package states
diff old_installed.log new_installed.log
```

## Related Commands

- `apt` - High-level package management tool
- `apt-get` - Low-level package management tool
- `apt-cache` - Package cache query tool
- `dpkg` - Low-level Debian package manager
- `apt-mark` - Package selection state management
- `tasksel` - Task installation tool
- `debconf` - Debian configuration management
- `apt-file` - Search for files in packages

## Best Practices

### System Updates
1. Use `aptitude update` before any package operations
2. Prefer `safe-upgrade` for regular maintenance
3. Use `full-upgrade` only when necessary for major updates
4. Always review package changes before confirming
5. Keep a backup of critical package configurations

### Package Management
1. Use `--show-why` to understand dependency changes
2. Regularly run `purge-unused` to clean up system
3. Use `markauto`/`unmarkauto` for proper dependency tracking
4. Review patterns before complex operations with `--simulate`
5. Keep track of manual vs automatic package installations

### Dependency Resolution
1. Trust aptitude's resolver but verify major changes
2. Use `--show-deps` for complex dependency situations
3. Hold critical packages when necessary to prevent unwanted upgrades
4. Understand the difference between safe-upgrade and full-upgrade
5. Use patterns for bulk operations involving related packages

### Interactive Usage
1. Use `?` key in interactive mode for help
2. Learn keyboard shortcuts for efficient navigation
3. Use `g` to preview changes before applying them
4. Explore package information with `Enter` key
5. Use search filters to navigate large package lists

### Scripting and Automation
1. Always use `-y` or `--assume-yes` for non-interactive scripts
2. Include `--simulate` for testing before actual operations
3. Use specific search patterns for targeted operations
4. Log package operations for audit purposes
5. Test scripts in safe environments before production use

The `aptitude` package manager provides a powerful, text-based interface for Debian package management with superior dependency resolution capabilities and comprehensive package state tracking, making it particularly suitable for complex system administration tasks and detailed package management operations.