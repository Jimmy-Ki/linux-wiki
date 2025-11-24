---
title: createrepo - Create YUM Repository Metadata
sidebar_label: createrepo
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# createrepo - Create YUM Repository Metadata

The `createrepo` command is a utility for creating YUM repository metadata from a directory containing RPM packages. It generates the necessary XML metadata files (repodata) that YUM-based package managers like `yum` and `dnf` use to index and resolve package dependencies.

## Basic Syntax

```bash
createrepo [OPTIONS] <directory>
```

## Common Options

### Output and Directory Options
- `-o, --outputdir <url>` - Specify output directory for metadata
- `--basedir <url>` - Base directory for relative paths
- `-p, --pretty` - Output XML in pretty format
- `--simple-md-filenames` - Use simple metadata filenames
- `--unique-md-filenames` - Use unique filenames with checksums

### Package Selection Options
- `-x, --excludes <packages>` - Exclude specific packages
- `-i, --pkglist <filename>` - Include only packages from file
- `-n, --includepkg <packages>` - Include specified packages via command line
- `-S, --skip-symlinks` - Skip symbolic links

### Performance and Caching Options
- `-c, --cachedir <path>` - Directory for package checksum cache
- `--update` - Update existing metadata instead of recreating
- `--skip-stat` - Skip stat() calls during update
- `--update-md-path <path>` - Use existing metadata for updates
- `-C, --checkts` - Skip metadata generation if newer than RPMs

### Database and Format Options
- `-d, --database` - Generate SQLite database metadata (default)
- `--no-database` - Don't generate SQLite database
- `-s, --checksum <type>` - Set checksum type (sha256, sha1, md5)
- `--workers <count>` - Number of worker threads for processing

### Content and Group Options
- `-g, --groupfile <groupfile>` - Specify group definition file
- `--changelog-limit <count>` - Limit changelog entries per package
- `--distro <cpeid,tag>` - Specify distribution tags
- `--content <tags>` - Specify content keywords
- `--repo <tags>` - Specify repository keywords

### Advanced Options
- `--deltas` - Generate deltarpm data
- `--oldpackagedirs <paths>` - Paths to older packages for deltas
- `--num-deltas <count>` - Number of old versions for delta processing
- `--compress-type <type>` - Compression method (gz, bz2, xz)
- `--profile` - Output timing analysis information

## Usage Examples

### Basic Repository Creation

```bash
# Create repository metadata
createrepo /path/to/rpms/

# Create with verbose output
createrepo -v /path/to/rpms/

# Create with pretty XML output
createrepo -p /path/to/rpms/

# Create repository with custom output directory
createrepo -o /var/www/html/ /path/to/rpms/
```

### Package Selection and Filtering

```bash
# Create repository excluding specific packages
createrepo -x "*debuginfo*" -x "*src.rpm" /path/to/rpms/

# Create repository from package list file
createrepo -i package_list.txt /path/to/rpms/

# Include specific packages only
createrepo -n package1.rpm package2.rpm /path/to/rpms/

# Create repository with group file
createrepo -g comps.xml /path/to/rpms/

# Create repository excluding development packages
createrepo -x "*-devel*" -x "*-debug*" /path/to/rpms/
```

### Performance and Caching

```bash
# Create with checksum caching
createrepo -c /tmp/repocache /path/to/rpms/

# Update existing metadata efficiently
createrepo --update /path/to/rpms/

# Create with multiple worker threads
createrepo --workers 8 /path/to/rpms/

# Skip timestamp checks for faster processing
createrepo --skip-stat /path/to/rpms/

# Create with custom compression
createrepo --compress-type xz /path/to/rpms/
```

### Advanced Repository Features

```bash
# Create repository with delta RPMS
createrepo --deltas --oldpackagedirs /path/to/old/rpms /path/to/rpms/

# Create with limited changelog entries
createrepo --changelog-limit 5 /path/to/rpms/

# Create with distribution tags
createrepo --distro=cpe:/o:redhat:enterprise_linux:8 --distro=RHEL8 /path/to/rpms/

# Create with content keywords
createrepo --content=development --content=testing /path/to/rpms/

# Create with repository metadata
createrepo --repo=third-party --repo=community /path/to/rpms/
```

## Practical Examples

### Setting Up a Basic YUM Repository

```bash
#!/bin/bash
# Complete YUM repository setup script

REPO_DIR="/var/www/html/yum-repo"
RPMS_DIR="/path/to/rpms"
GROUP_FILE="/path/to/comps.xml"

# Create directory structure
mkdir -p "$REPO_DIR"
mkdir -p "$RPMS_DIR"

# Copy RPM files to repository directory
cp /path/to/local/rpms/*.rpm "$RPMS_DIR/"

# Create repository metadata
createrepo -g "$GROUP_FILE" -o "$REPO_DIR" "$RPMS_DIR"

# Create repository configuration file
cat > "/etc/yum.repos.d/local.repo" << EOF
[local-repo]
name=Local YUM Repository
baseurl=http://localhost/yum-repo/
enabled=1
gpgcheck=0
EOF

# Clean yum cache
yum clean all

echo "YUM repository setup complete!"
```

### Repository Maintenance Automation

```bash
#!/bin/bash
# Automated repository maintenance script

REPO_BASE="/var/www/html/repositories"
LOG_FILE="/var/log/createrepo.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to update repository
update_repository() {
    local repo_dir="$1"
    local repo_name="$2"

    log "Updating repository: $repo_name"

    if [ -f "$repo_dir/comps.xml" ]; then
        createrepo -g comps.xml --update -v "$repo_dir" >> "$LOG_FILE" 2>&1
    else
        createrepo --update -v "$repo_dir" >> "$LOG_FILE" 2>&1
    fi

    if [ $? -eq 0 ]; then
        log "Successfully updated $repo_name"
    else
        log "Error updating $repo_name"
    fi
}

# Update all repositories
for repo_path in "$REPO_BASE"/*/; do
    if [ -d "$repo_path" ]; then
        repo_name=$(basename "$repo_path")
        update_repository "$repo_path" "$repo_name"
    fi
done

# Clean old metadata (keep last 3 versions)
find "$REPO_BASE" -name "repodata.*" -type d | \
    sort -r | tail -n +4 | xargs rm -rf

log "Repository maintenance completed"
```

### Multi-Architecture Repository Setup

```bash
#!/bin/bash
# Multi-architecture repository setup

BASE_DIR="/var/www/html/multi-arch-repo"
ARCHS=("x86_64" "i386" "armhfp")
RPMS_SOURCE="/path/to/all/rpms"

# Create directory structure for each architecture
for arch in "${ARCHS[@]}"; do
    mkdir -p "$BASE_DIR/$arch"

    # Copy architecture-specific packages
    find "$RPMS_SOURCE" -name "*.$arch.rpm" -exec cp {} "$BASE_DIR/$arch/" \;

    # Create noarch packages in each architecture
    find "$RPMS_SOURCE" -name "*.noarch.rpm" -exec cp {} "$BASE_DIR/$arch/" \;

    # Create repository metadata
    createrepo -o "$BASE_DIR/$arch" "$BASE_DIR/$arch"
done

# Create repository configuration files
for arch in "${ARCHS[@]}"; do
    cat > "/etc/yum.repos.d/multi-arch-$arch.repo" << EOF
[multi-arch-$arch]
name=Multi-Arch Repository ($arch)
baseurl=http://localhost/multi-arch-repo/$arch/
enabled=1
gpgcheck=0
EOF
done
```

### Repository Synchronization Script

```bash
#!/bin/bash
# Repository synchronization with upstream source

UPSTREAM="rsync://upstream.example.com/centos/8/"
LOCAL="/var/www/html/mirror/centos/8"
LOG_FILE="/var/log/repo-sync.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Sync packages from upstream
log "Starting repository synchronization"
rsync -avz --delete "$UPSTREAM" "$LOCAL/" >> "$LOG_FILE" 2>&1

# Update repository metadata for all architectures
for arch_dir in "$LOCAL"/Packages/*/; do
    if [ -d "$arch_dir" ]; then
        log "Updating metadata for $(basename "$arch_dir")"
        createrepo --update -v "$arch_dir" >> "$LOG_FILE" 2>&1
    fi
done

# Clean up old files
find "$LOCAL" -name "*.rpm.old" -delete
find "$LOCAL" -name "repodata.*" -type d -mtime +7 -exec rm -rf {} \;

log "Repository synchronization completed"
```

### Repository Health Check

```bash
#!/bin/bash
# Repository health check script

REPO_DIR="/var/www/html/yum-repo"
TEMP_CHECK="/tmp/repo_check_$$"

# Check repository metadata integrity
check_repo_integrity() {
    local repo_path="$1"

    echo "Checking repository: $repo_path"

    # Verify primary metadata
    if [ -f "$repo_path/repodata/primary.xml.gz" ]; then
        gunzip -t "$repo_path/repodata/primary.xml.gz" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "  ✓ Primary metadata is valid"
        else
            echo "  ✗ Primary metadata is corrupted"
        fi
    else
        echo "  ✗ Primary metadata missing"
    fi

    # Verify filelists metadata
    if [ -f "$repo_path/repodata/filelists.xml.gz" ]; then
        gunzip -t "$repo_path/repodata/filelists.xml.gz" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "  ✓ Filelists metadata is valid"
        else
            echo "  ✗ Filelists metadata is corrupted"
        fi
    else
        echo "  ✗ Filelists metadata missing"
    fi

    # Check for missing packages
    mkdir -p "$TEMP_CHECK"
    gunzip -c "$repo_path/repodata/primary.xml.gz" | \
        grep -o '<location href="[^"]*"' | \
        sed 's/<location href="//; s/"$//' > "$TEMP_CHECK/packages.txt"

    missing_count=0
    while read package; do
        if [ ! -f "$repo_path/$package" ]; then
            echo "  ✗ Missing package: $package"
            ((missing_count++))
        fi
    done < "$TEMP_CHECK/packages.txt"

    if [ $missing_count -eq 0 ]; then
        echo "  ✓ All packages present"
    else
        echo "  ✗ $missing_count packages missing"
    fi

    rm -rf "$TEMP_CHECK"
}

# Run health check
echo "Repository Health Check Report"
echo "=============================="
check_repo_integrity "$REPO_DIR"
```

## Related Commands

- `yum` - Yellowdog Updater Modified package manager
- `dnf` - Dandified YUM package manager
- `reposync` - Synchronize YUM repositories to local directory
- `yum-utils` - Additional YUM utilities
- `repomanage` - Manage repository packages
- `repodiff` - Compare two repositories
- `repotrack` - Track packages and dependencies
- `yumdownloader` - Download packages from repositories

## Best Practices

### Repository Management
1. Use `--update` option for efficient metadata updates
2. Implement regular repository maintenance schedules
3. Use checksum caching for improved performance
4. Keep backup copies of critical repository metadata
5. Monitor repository disk space usage

### Performance Optimization
1. Use multiple worker threads for large repositories
2. Implement checksum caching with `--cachedir`
3. Use appropriate compression based on your use case
4. Consider delta generation for frequently updated repositories
5. Monitor repository creation times and optimize accordingly

### Security Considerations
1. Use GPG signing for repository packages
2. Implement access controls for repository directories
3. Use HTTPS for secure repository access
4. Regularly audit repository contents and integrity
5. Monitor for unauthorized package additions

### Automation and Scripting
1. Create automated repository update scripts
2. Implement logging and monitoring for repository operations
3. Use configuration management for repository setup
4. Implement health checks and monitoring
5. Create backup and recovery procedures

### Content Management
1. Use group files for package categorization
2. Implement proper package naming conventions
3. Use content and distribution tags for better organization
4. Limit changelog entries to reduce metadata size
5. Regularly clean up obsolete packages and metadata

The `createrepo` command is essential for anyone managing YUM repositories, providing the tools needed to create and maintain reliable package repositories that can be used across multiple systems with YUM-based package management.