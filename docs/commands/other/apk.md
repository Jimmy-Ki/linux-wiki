---
title: apk - Alpine Package Keeper
sidebar_label: apk
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# apk - Alpine Package Keeper

The `apk` (Alpine Package Keeper) is the package manager for Alpine Linux, designed specifically for security, simplicity, and efficiency. It operates on the `.apk` package format and provides fast, reliable package management with minimal dependencies. APK uses a data-driven approach to dependency resolution, supports cryptographic verification of packages, and is optimized for container and embedded environments. Its lightweight design makes it ideal for Docker containers, embedded systems, and security-focused distributions.

## Basic Syntax

```bash
apk [--no-cache] [--no-network] [--no-progress] [--quiet] [--simulate] [--wait TIMEOUT]
    [--arch ARCH] [--repository REPO] [--allow-untrusted] [--keys-dir KEYSDIR]
    COMMAND [options] [packages...]
```

## Common Commands

- `add` - Install packages
- `del` - Remove packages
- `update` - Update repository indexes
- `upgrade` - Upgrade installed packages
- `fix` - Repair package database
- `search` - Search for packages
- `info` - Display package information
- `list` - List installed packages
- `stats` - Show repository statistics
- `cache` - Cache management
- `version` - Compare package versions
- `policy` - Show repository priority
- `index` - Create package index

## Common Options

### Global Options
- `--no-cache` - Do not use any local cache path
- `--no-network` - Do not use network (cache only)
- `--no-progress` - Disable progress bar
- `--quiet, -q` - Print less information
- `--verbose, -v` - Print more information
- `--simulate, -s` - Show what would be done without doing it
- `--wait TIMEOUT` - Wait for network if not available
- `--purge` - Also delete package configuration
- `--no-scripts` - Skip package scripts
- `--no-commit` - Keep changes in transaction state

### Repository Options
- `--repository REPO` - Add additional repository
- `--keys-dir KEYSDIR` - Override directory of trusted keys
- `--allow-untrusted` - Install packages with untrusted signatures
- `--update-cache, -U` - Update repository indexes

### Package Selection
- `--available, -a` - List all available packages
- `--installed, -I` - List only installed packages
- `--orphaned` - List orphaned packages
- `--upgrades, -u` - List packages that can be upgraded

### Version Options
- `--latest` - Select latest version
- `--dependencies` - List all dependencies
- `--depends` - Show dependencies
- `--rdepends` - Show reverse dependencies
- `--provides` - Show virtual packages provided
- `--replaces` - Show packages replaced

## Usage Examples

### Basic Package Management

#### Installing Packages
```bash
# Install a single package
apk add nginx

# Install multiple packages
apk add nginx php8 php8-fpm

# Install specific version
apk add nginx=1.24.0-r0

# Install from specific repository
apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing nginx

# Install without cache
apk add --no-cache curl

# Install and run scripts quietly
apk add --quiet --no-scripts package

# Simulate installation
apk add --simulate nginx

# Install dependencies only
apk add --virtual .build-base build-base

# Install package with specific architecture
apk add --arch x86_64 package

# Install allowing untrusted packages
apk add --allow-untrusted local-package.apk
```

#### Removing Packages
```bash
# Remove a package
apk del nginx

# Remove multiple packages
apk del nginx php8 php8-fpm

# Remove package and configuration files
apk del --purge nginx

# Remove virtual package
apk del .build-base

# Simulate removal
apk del --simulate nginx

# Remove without running scripts
apk del --no-scripts package
```

#### Updating Packages
```bash
# Update repository indexes
apk update

# Upgrade all packages
apk upgrade

# Upgrade specific packages
apk upgrade nginx php8

# Upgrade with available packages only
apk upgrade --available

# Upgrade ignoring dependencies
apk upgrade --no-scripts

# Simulate upgrade
apk upgrade --simulate
```

### Package Information and Search

#### Searching for Packages
```bash
# Search by package name
apk search nginx

# Search with wildcard
apk search *http*

# Search by description
apk search --description "web server"

# Search only installed packages
apk search --installed nginx

# Search in specific repository
apk search --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nginx

# Detailed search with description
apk search -v -d nginx
```

#### Package Information
```bash
# Show package information
apk info nginx

# Show package contents
apk info --contents nginx

# Show package dependencies
apk info --depends nginx

# Show packages that depend on this package
apk info --rdepends nginx

# Show installed package info
apk info --installed nginx

# Show package size and disk usage
apk info --size nginx

# Show package description
apk info --description nginx

# Show package license
apk info --license nginx

# Show package URL
apk info --website nginx

# List all installed packages
apk info

# List all available packages
apk info --available
```

#### Version Management
```bash
# Compare package versions
apk version nginx

# Check for available upgrades
apk version --upgrade-available

# Check which packages are newer than installed
apk version --newer-than 3.16.0

# Show package versions in repositories
apk version --all nginx

# Check package versions against repositories
apk version --check --quiet nginx
```

### Repository Management

#### Repository Configuration
```bash
# Add additional repository
apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/community package

# Use testing repository
apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing package

# Show repository priorities
apk policy

# Show package policy information
apk policy nginx

# Update cache from all repositories
apk update --repository http://custom-repo/alpine
```

#### Cache Management
```bash
# Clean package cache
apk cache clean

# Show cache statistics
apk cache -v

# Download packages without installing
apk fetch nginx

# Download with dependencies
apk fetch --recursive nginx

# Download to specific directory
apk fetch --destination /tmp nginx

# Verify package cache
apk cache verify
```

### Advanced Operations

#### Virtual Packages
```bash
# Create virtual package
apk add --virtual .build-base build-base cmake make

# Remove virtual package and all dependencies
apk del .build-base

# List virtual packages
apk info --virtual

# Show which virtual package provides what
apk info --provides .build-base
```

#### Package Fixing
```bash
# Fix broken packages
apk fix

# Fix specific package
apk fix nginx

# Fix ignoring dependency checks
apk fix --no-scripts

# Reinstall packages
apk fix --reinstall nginx
```

#### Dependency Analysis
```bash
# Show all dependencies recursively
apk info --depends --recursive nginx

# Show reverse dependencies
apk info --rdepends --recursive nginx

# Show dependency tree
apk graph

# Show orphaned packages
apk info --orphaned

# Show packages that are not required by others
apk info --optional
```

## Practical Examples

### Container and Docker Usage

#### Minimal Container Setup
```bash
# Update package indexes
apk update --no-cache

# Install essential packages
apk add --no-cache ca-certificates tzdata

# Install runtime dependencies only
apk add --no-cache curl wget

# Install development packages
apk add --no-cache --virtual .build-deps \
    gcc musl-dev \
    linux-headers \
    libffi-dev \
    openssl-dev

# Remove build dependencies after compilation
apk del .build-deps
```

#### Production Container Preparation
```bash
# Production package installation
apk update && \
apk add --no-cache \
    nginx \
    php8-fpm \
    php8-mysqli \
    && \
rm -rf /var/cache/apk/*

# Security update for containers
apk update && \
apk upgrade && \
rm -rf /var/cache/apk/*

# Install specific versions for reproducibility
apk add \
    nginx=1.24.0-r0 \
    php8-fpm=8.2.13-r0
```

### System Administration

#### System Maintenance
```bash
# Full system update
apk update && apk upgrade

# Security updates only
apk update && apk add --upgrade \
    $(apk audit --system)

# Remove unused packages
apk info --orphaned | xargs apk del

# Clean old cached packages
apk cache clean

# Check for broken packages
apk fix

# Audit system packages
apk audit

# Show disk usage by packages
apk info --size | sort -hr
```

#### Package Management
```bash
# Install development environment
apk add \
    build-base \
    cmake \
    git \
    vim \
    curl \
    wget

# Install web server stack
apk add \
    nginx \
    php8 \
    php8-fpm \
    php8-mysqli \
    php8-json \
    php8-opcache

# Install database server
apk add \
    mariadb \
    mariadb-client \
    mariadb-server-utils

# Install monitoring tools
apk add \
    htop \
    iotop \
    iftop \
    nethogs
```

### Development Workflow

#### Build Environment Setup
```bash
# Install complete build environment
apk add --no-cache --virtual .build-deps \
    gcc \
    g++ \
    musl-dev \
    linux-headers \
    libffi-dev \
    openssl-dev \
    python3-dev \
    make \
    cmake

# Install Python development tools
apk add \
    python3 \
    python3-dev \
    python3-pip \
    py3-pip

# Install Node.js development
apk add \
    nodejs \
    npm

# Clean up after build
apk del .build-deps
rm -rf /var/cache/apk/*
```

#### Package Development
```bash
# Install packaging tools
apk add \
    alpine-sdk \
    abuild \
    sudo

# Setup build environment
adduser -D -s /bin/sh builder
addgroup builder abuild
echo "builder ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Build package
abuild -r
```

## Advanced Usage

### Repository Customization

#### Custom Repository Setup
```bash
# Add custom repository
echo "http://custom-repo.example.com/alpine" >> /etc/apk/repositories

# Add testing repository
echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

# Pin package to specific repository
apk add \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
    package

# Add repository with specific priority
echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
apk add package@edge
```

#### Package Pinning and Holds
```bash
# Hold package at current version
apk add 'package>='

# Prevent package upgrade
apk add 'package='

# Install minimum version requirement
apk add 'package>=1.0.0'

# Install version range
apk add 'package>=1.0.0' 'package<2.0.0'
```

### Security and Verification

#### Package Verification
```bash
# Verify package signatures
apk verify package.apk

# Update package keys
apk update --keys-dir /etc/apk/keys

# Show package signing key
apk info --license package

# Install without verification (insecure)
apk add --allow-untrusted package.apk

# Check package integrity
apk fix --reinstall package
```

#### Security Auditing
```bash
# Audit system for vulnerabilities
apk audit

# Audit specific package
apk audit package

# Show vulnerable packages
apk audit --system

# Update vulnerable packages
apk update && apk add --upgrade $(apk audit --system)
```

### Performance Optimization

#### Network Optimization
```bash
# Use local mirror for faster downloads
echo "http://local-mirror.example.com/alpine" > /etc/apk/repositories

# Use multiple repositories in parallel
apk update --repository http://repo1/main --repository http://repo2/community

# Limit download bandwidth
apk add --timeout 30 package

# Use local cache exclusively
apk add --no-cache package
```

#### Cache Optimization
```bash
# Preload cache for faster installation
apk update

# Show cache statistics
apk cache -v

# Verify cache integrity
apk cache verify

# Clean old cache to save space
apk cache clean
```

## Integration and Automation

### Shell Scripts

#### Automated System Update Script
```bash
#!/bin/bash
# Alpine Linux System Update Script

set -e

echo "Starting Alpine Linux system update..."

# Update repository indexes
echo "Updating package indexes..."
apk update --no-cache --quiet

# Upgrade all packages
echo "Upgrading packages..."
apk upgrade --no-cache --quiet

# Check for security updates
echo "Checking for security vulnerabilities..."
if apk audit | grep -q "CVE"; then
    echo "Security vulnerabilities found:"
    apk audit
    echo "Applying security updates..."
    apk add --upgrade $(apk audit --system)
fi

# Remove orphaned packages
echo "Cleaning up orphaned packages..."
ORPHANED=$(apk info --orphaned)
if [ ! -z "$ORPHANED" ]; then
    echo "$ORPHANED" | xargs apk del --no-scripts
fi

# Clean package cache
echo "Cleaning package cache..."
apk cache clean

echo "System update completed successfully!"
```

#### Package Installation Script
```bash
#!/bin/bash
# Package Installation with Dependency Management

PACKAGE_LIST="$1"
BUILD_DEPS=false

if [ "$2" = "build" ]; then
    BUILD_DEPS=true
fi

install_packages() {
    local packages="$1"
    echo "Installing packages: $packages"

    if [ "$BUILD_DEPS" = true ]; then
        apk add --no-cache --virtual .build-deps $packages
    else
        apk add --no-cache $packages
    fi
}

cleanup_build_deps() {
    if [ "$BUILD_DEPS" = true ]; then
        echo "Cleaning up build dependencies..."
        apk del .build-deps
    fi
}

# Main execution
apk update --no-cache
install_packages "$PACKAGE_LIST"

# If build mode, run command then cleanup
if [ "$BUILD_DEPS" = true ]; then
    shift 2
    echo "Running: $@"
    "$@"
    cleanup_build_deps
fi

rm -rf /var/cache/apk/*
```

### Docker Integration

#### Multi-stage Dockerfile Example
```dockerfile
FROM alpine:3.18 as builder

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    python3-dev \
    && \
    apk add --no-cache \
    python3 \
    py3-pip

# Build application
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM alpine:3.18

# Install runtime dependencies only
RUN apk add --no-cache \
    python3 \
    py3-pip \
    && \
    rm -rf /var/cache/apk/*

# Copy built application
COPY --from=builder /usr/lib/python3.11/site-packages /usr/lib/python3.11/site-packages
COPY . /app

WORKDIR /app
CMD ["python3", "app.py"]
```

#### Docker Optimization
```bash
# Dockerfile optimizations for Alpine
FROM alpine:3.18

# Combine apk update and add to reduce layers
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    curl \
    && \
    rm -rf /var/cache/apk/*

# Use --virtual for build dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    && \
    apk add --no-cache runtime-package \
    && \
    apk del .build-deps

# Use specific versions for reproducibility
RUN apk add \
    nginx=1.24.0-r0 \
    php8-fpm=8.2.13-r0
```

## Troubleshooting

### Common Issues

#### Repository Issues
```bash
# Repository connection timeout
apk add --wait 60 package

# Repository signature verification failed
apk update --keys-dir /etc/apk/keys

# Clear corrupted repository cache
rm -rf /var/cache/apk/*
apk update

# Use different mirror
echo "http://dl-cdn.alpinelinux.org/alpine/v3.18/main" > /etc/apk/repositories
apk update
```

#### Dependency Issues
```bash
# Broken dependencies
apk fix

# Circular dependencies
apk add --no-scripts package

# Missing dependencies
apk add --no-scripts --update-cache package

# Conflict resolution
apk del conflicting-package
apk add desired-package
```

#### Cache Issues
```bash
# Corrupted package cache
apk cache clean
apk update

# Out of disk space during installation
apk cache clean
apk add --no-cache package

# Permission denied cache access
sudo apk update
sudo apk add package
```

#### Network Issues
```bash
# Slow downloads
apk add --wait 120 package

# Intermittent network failures
apk add --no-network --no-cache package

# Mirror timeout
apk update --repository http://backup-mirror.example.com/alpine
```

## Related Commands

- [`apt`](/docs/commands/package-management/apt) - Debian/Ubuntu package manager
- [`apt-get`](/docs/commands/package-management/apt-get) - Debian package handling utility
- [`yum`](/docs/commands/package-management/yum) - Yellowdog Updater Modified
- [`dnf`](/docs/commands/package-management/dnf) - DNF package manager
- [`pacman`](/docs/commands/package-management/pacman) - Arch Linux package manager
- [`rpm`](/docs/commands/package-management/rpm) - RPM Package Manager
- [`dpkg`](/docs/commands/package-management/dpkg) - Debian package management tool
- [`docker`](/docs/commands/development/docker) - Docker container platform

## Best Practices

1. **Always use `--no-cache`** in Docker containers to reduce image size
2. **Combine `apk update` and `apk add`** in the same Docker layer
3. **Use virtual packages** for build dependencies and remove them after use
4. **Pin package versions** for reproducible builds
5. **Regularly run `apk audit`** for security vulnerability checking
6. **Use `apk cache clean`** to free up disk space
7. **Enable multiple repositories** for package availability
8. **Use `--simulate`** before performing major operations
9. **Run `apk fix`** when encountering dependency issues
10. **Monitor package sizes** using `apk info --size`

## Performance Tips

1. **Use local mirrors** for faster package downloads
2. **Enable package caching** for frequently used packages
3. **Avoid unnecessary package installations** in containers
4. **Use virtual packages** to manage temporary dependencies
5. **Clean cache regularly** to save disk space
6. **Pin specific repositories** for consistent package versions
7. **Use `--no-scripts`** for faster installation when scripts aren't needed
8. **Batch package operations** to reduce repository queries
9. **Use `--available`** to limit operations to available packages
10. **Monitor disk usage** especially on embedded systems

The `apk` command provides a fast, secure, and efficient package management solution for Alpine Linux. Its lightweight design and security focus make it ideal for containerized applications, embedded systems, and environments where minimal footprint and high security are priorities.