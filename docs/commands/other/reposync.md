---
title: reposync - Synchronize YUM Repositories to Local Directory
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# reposync - Synchronize YUM Repositories to Local Directory

The `reposync` command is a utility for synchronizing remote YUM repositories to local directories. It uses YUM's repository configuration to download RPM packages and optionally their metadata, enabling the creation of local mirrors and offline repositories for testing, deployment, or air-gapped environments.

## Basic Syntax

```bash
reposync [OPTIONS]
```

## Common Options

### Repository Selection Options
- `-r REPOID, --repoid=REPOID` - Specify repository ID to sync (can be used multiple times)
- `-c CONFIG, --config=CONFIG` - Use specific configuration file (default: /etc/yum.conf)
- `-a ARCH, --arch=ARCH` - Download packages for specific architecture
- `--newest-only` - Download only the newest packages from each repository

### Download and Output Options
- `-p DESTDIR, --download_path=DESTDIR` - Specify download destination directory
- `-u, --urls` - List URLs to download without downloading
- `-d, --delete` - Delete local packages no longer in remote repository
- `--norepopath` - Don't add repository name to download path
- `-t, --tempcache` - Use temporary directory for yum cache

### Metadata Options
- `-m, --downloadcomps` - Download comps.xml group files
- `--download-metadata` - Download all non-default metadata
- `-l, --plugins` - Enable YUM plugins support

### Security and Verification Options
- `-g, --gpgcheck` - Delete packages that fail GPG signature verification
- `--allow-path-traversal` - Allow packages outside repository directory (security risk)

### General Options
- `-h, --help` - Display help information
- `-q, --quiet` - Quiet mode with minimal output

## Usage Examples

### Basic Repository Synchronization

```bash
# Sync all enabled repositories to current directory
reposync

# Sync specific repository to current directory
reposync --repoid=updates

# Sync repository to specific directory
reposync --repoid=updates --download-path=/var/www/html/repos/

# Sync multiple repositories
reposync --repoid=updates --repoid=extras --repoid=epel
```

### Architecture and Package Selection

```bash
# Sync only x86_64 packages
reposync --repoid=updates --arch=x86_64

# Sync only the newest packages
reposync --repoid=updates --newest-only

# Sync specific architectures only
reposync --repoid=updates --arch=x86_64 --arch=noarch

# Sync for a different distribution
reposync --repoid=updates --arch=aarch64
```

### Advanced Synchronization Options

```bash
# Sync with package cleanup (delete removed packages)
reposync --repoid=updates --delete

# Sync with metadata download
reposync --repoid=updates --downloadcomps --download-metadata

# Sync with GPG verification
reposync --repoid=updates --gpgcheck

# Sync without adding repository path to directory structure
reposync --repoid=updates --norepopath --download_path=/path/to/repos/
```

### Testing and Dry Run Operations

```bash
# List URLs without downloading
reposync --repoid=updates --urls

# Sync with verbose output for testing
reposync --repoid=updates -v

# Sync using specific configuration file
reposync --config=/custom/yum.conf --repoid=updates

# Sync with temporary cache
reposync --repoid=updates --tempcache
```

## Practical Examples

### Complete Repository Mirror Setup

```bash
#!/bin/bash
# Complete YUM repository mirror setup script

MIRROR_BASE="/var/www/html/yum-mirror"
REPOS=("base" "updates" "extras" "epel")
LOG_FILE="/var/log/reposync.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Create base directory
mkdir -p "$MIRROR_BASE"

# Mirror each repository
for repo in "${REPOS[@]}"; do
    log "Starting sync for repository: $repo"

    # Create repository directory
    mkdir -p "$MIRROR_BASE/$repo"

    # Sync repository with cleanup and metadata
    reposync \
        --repoid="$repo" \
        --download_path="$MIRROR_BASE" \
        --delete \
        --downloadcomps \
        --download-metadata \
        --gpgcheck \
        --quiet \
        >> "$LOG_FILE" 2>&1

    if [ $? -eq 0 ]; then
        log "Successfully synced repository: $repo"

        # Create repository metadata
        createrepo --update "$MIRROR_BASE/$repo"
    else
        log "Error syncing repository: $repo"
    fi
done

# Create repository configuration files
cat > "$MIRROR_BASE/mirror.repo" << EOF
[base]
name=Base Repository Mirror
baseurl=http://$(hostname)/yum-mirror/base/
enabled=1
gpgcheck=1

[updates]
name=Updates Repository Mirror
baseurl=http://$(hostname)/yum-mirror/updates/
enabled=1
gpgcheck=1

[extras]
name=Extras Repository Mirror
baseurl=http://$(hostname)/yum-mirror/extras/
enabled=1
gpgcheck=1

[epel]
name=EPEL Repository Mirror
baseurl=http://$(hostname)/yum-mirror/epel/
enabled=1
gpgcheck=1
EOF

log "Repository mirror setup completed"
```

### Automated Repository Synchronization

```bash
#!/bin/bash
# Automated repository synchronization with monitoring

SYNC_DIR="/mirror/yum"
LOCK_FILE="/var/run/reposync.lock"
MAX_RETRIES=3
RETRY_DELAY=300  # 5 minutes

# Check if another sync is running
if [ -f "$LOCK_FILE" ]; then
    echo "Repository synchronization already running"
    exit 1
fi

# Create lock file
touch "$LOCK_FILE"

# Cleanup function
cleanup() {
    rm -f "$LOCK_FILE"
}

trap cleanup EXIT

sync_with_retry() {
    local repo="$1"
    local attempt=1

    while [ $attempt -le $MAX_RETRIES ]; do
        echo "Syncing $repo (attempt $attempt/$MAX_RETRIES)"

        if reposync \
            --repoid="$repo" \
            --download_path="$SYNC_DIR" \
            --delete \
            --downloadcomps \
            --gpgcheck; then

            echo "Successfully synced $repo"

            # Update repository metadata
            if [ -d "$SYNC_DIR/$repo" ]; then
                createrepo --update "$SYNC_DIR/$repo"
            fi

            return 0
        else
            echo "Failed to sync $repo (attempt $attempt)"

            if [ $attempt -lt $MAX_RETRIES ]; then
                echo "Waiting $RETRY_DELAY seconds before retry..."
                sleep $RETRY_DELAY
            fi

            ((attempt++))
        fi
    done

    echo "Failed to sync $repo after $MAX_RETRIES attempts"
    return 1
}

# Get list of enabled repositories
REPOS=$(yum repolist enabled | awk 'NR>1 {print $1}')

# Sync each repository
for repo in $REPOS; do
    sync_with_retry "$repo"
done

echo "Repository synchronization completed"
```

### Multi-Architecture Repository Mirror

```bash
#!/bin/bash
# Multi-architecture repository mirror

MIRROR_BASE="/mirror/multi-arch"
ARCHS=("x86_64" "i386" "aarch64")
REPO_BASE="/mirror/yum"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Create architecture-specific directories
for arch in "${ARCHS[@]}"; do
    mkdir -p "$MIRROR_BASE/$arch"
done

# Sync repositories for each architecture
for arch in "${ARCHS[@]}"; do
    log "Syncing repositories for $arch architecture"

    reposync \
        --arch="$arch" \
        --arch=noarch \
        --download_path="$MIRROR_BASE/$arch" \
        --delete \
        --downloadcomps \
        --download-metadata \
        --gpgcheck

    # Create repository metadata for each synced repo
    for repo_dir in "$MIRROR_BASE/$arch"/*/; do
        if [ -d "$repo_dir" ] && [ "$(ls -A "$repo_dir")" ]; then
            createrepo --update "$repo_dir"
        fi
    done
done

# Create multi-architecture repository configuration
cat > "$MIRROR_BASE/multi-arch.repo" << EOF
# Multi-architecture repository mirror

[base-\$basearch]
name=Base Repository Mirror (\$basearch)
baseurl=http://$(hostname)/multi-arch/\$basearch/base/
enabled=1
gpgcheck=1

[updates-\$basearch]
name=Updates Repository Mirror (\$basearch)
baseurl=http://$(hostname)/multi-arch/\$basearch/updates/
enabled=1
gpgcheck=1

[epel-\$basearch]
name=EPEL Repository Mirror (\$basearch)
baseurl=http://$(hostname)/multi-arch/\$basearch/epel/
enabled=1
gpgcheck=1
EOF

log "Multi-architecture mirror setup completed"
```

### Repository Validation and Health Check

```bash
#!/bin/bash
# Repository synchronization validation script

MIRROR_DIR="/mirror/yum"
TEMP_CHECK="/tmp/repo_check_$$"

validate_repository() {
    local repo_path="$1"
    local repo_name="$2"

    echo "Validating repository: $repo_name"

    # Check if repository directory exists
    if [ ! -d "$repo_path" ]; then
        echo "  ✗ Repository directory missing"
        return 1
    fi

    # Check for RPM packages
    rpm_count=$(find "$repo_path" -name "*.rpm" | wc -l)
    if [ $rpm_count -eq 0 ]; then
        echo "  ✗ No RPM packages found"
        return 1
    else
        echo "  ✓ Found $rpm_count RPM packages"
    fi

    # Check for repository metadata
    if [ -f "$repo_path/repodata/primary.xml.gz" ]; then
        echo "  ✓ Repository metadata present"

        # Validate metadata integrity
        if gunzip -t "$repo_path/repodata/primary.xml.gz" 2>/dev/null; then
            echo "  ✓ Metadata integrity valid"
        else
            echo "  ✗ Metadata integrity corrupted"
        fi
    else
        echo "  ✗ Repository metadata missing"
    fi

    # Check for missing packages
    if [ -f "$repo_path/repodata/primary.xml.gz" ]; then
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
            echo "  ✓ All packages present in metadata"
        else
            echo "  ✗ $missing_count packages missing"
        fi

        rm -rf "$TEMP_CHECK"
    fi

    # Check disk space
    repo_size=$(du -sh "$repo_path" 2>/dev/null | cut -f1)
    echo "  Repository size: $repo_size"
}

# Validate all repositories
echo "Repository Validation Report"
echo "============================"

for repo_dir in "$MIRROR_DIR"/*/; do
    if [ -d "$repo_dir" ]; then
        repo_name=$(basename "$repo_dir")
        validate_repository "$repo_dir" "$repo_name"
        echo
    fi
done
```

### Differential Repository Synchronization

```bash
#!/bin/bash
# Differential repository synchronization (only new/updated packages)

MIRROR_DIR="/mirror/yum"
STAMP_DIR="/var/lib/reposync"
LAST_SYNC_FILE="$STAMP_DIR/last_sync"

# Create stamp directory
mkdir -p "$STAMP_DIR"

get_last_sync_time() {
    if [ -f "$LAST_SYNC_FILE" ]; then
        cat "$LAST_SYNC_FILE"
    else
        echo "0"
    fi
}

update_last_sync_time() {
    date +%s > "$LAST_SYNC_FILE"
}

sync_differential() {
    local repo="$1"
    local last_sync=$(get_last_sync_time)

    echo "Differential sync for $repo since $(date -d@$last_sync)"

    # Get list of recently updated packages
    yum repo-pkgs "$repo" --queryformat '%{name}-%{version}-%{release}.%{arch}\n' | \
    while read package; do
        # Check if package is newer than last sync
        local package_path="$MIRROR_DIR/$repo/$package.rpm"

        if [ ! -f "$package_path" ]; then
            echo "Downloading new package: $package"
            yumdownloader --destdir="$MIRROR_DIR/$repo" "$package" 2>/dev/null
        fi
    done

    # Clean up removed packages
    reposync --repoid="$repo" --download_path="$MIRROR_DIR" --delete
}

# Get all enabled repositories
REPOS=$(yum repolist enabled | awk 'NR>1 {print $1}')

# Sync each repository differentially
for repo in $REPOS; do
    sync_differential "$repo"
done

# Update last sync time
update_last_sync_time

echo "Differential synchronization completed"
```

## Related Commands

- `yum` - Yellowdog Updater Modified package manager
- `dnf` - Dandified YUM package manager
- `createrepo` - Create YUM repository metadata
- `yumdownloader` - Download RPM packages from repositories
- `yum-utils` - Additional YUM utilities
- `repotrack` - Track packages and dependencies
- `yum-config-manager` - Manage YUM repository configurations

## Best Practices

### Synchronization Strategy
1. Use `--delete` option to maintain clean local mirrors
2. Schedule regular syncs during off-peak hours
3. Implement retry mechanisms for failed downloads
4. Use lock files to prevent concurrent sync operations
5. Monitor disk space usage on mirror servers

### Performance Optimization
1. Use `--newest-only` to save bandwidth and disk space
2. Implement differential synchronization when possible
3. Use multiple repositories in parallel sync operations
4. Cache downloaded packages to avoid re-downloads
5. Use appropriate network configurations for large downloads

### Security Considerations
1. Always use `--gpgcheck` to verify package integrity
2. Use HTTPS connections when available
3. Implement proper file permissions on mirrored content
4. Use checksums to verify download integrity
5. Monitor for unauthorized changes in mirrored content

### Monitoring and Maintenance
1. Implement logging and monitoring for sync operations
2. Regularly validate repository integrity
3. Monitor disk usage and implement cleanup policies
4. Create alerts for failed synchronization attempts
5. Implement health checks for mirror availability

### Automation and Scripting
1. Create automated sync scripts with error handling
2. Use configuration management for repository setup
3. Implement backup and recovery procedures
4. Use cron or systemd timers for scheduled syncs
5. Create reporting mechanisms for sync status

The `reposync` command is invaluable for creating local YUM repositories, enabling offline installations, testing, and deployment scenarios where internet access may be limited or unreliable. It provides essential functionality for enterprise environments managing package distribution across multiple systems.