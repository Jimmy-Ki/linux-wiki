---
title: axel - Light download accelerator
sidebar_label: axel
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# axel - Light download accelerator

The `axel` command is a lightweight download accelerator that significantly speeds up HTTP/FTP downloads by using multiple connections to the same server. Unlike traditional download tools that use a single connection, axel splits the file into multiple segments and downloads them simultaneously through separate connections, then reassembles them on your local system. This multi-threaded approach can dramatically improve download speeds, especially for large files from servers that support parallel connections. Axel is particularly useful for downloading ISO images, software packages, media files, and other large content where download speed matters.

## Basic Syntax

```bash
axel [OPTIONS] URL [URL2...]
axel [OPTIONS] -o OUTPUT_FILE URL
```

## Common Options

### Connection and Speed Options
- `-n NUM` - Set number of connections (default: 4)
- `-s SPEED` - Set maximum speed (bytes per second)
- `--max-speed=SPEED` - Alternative syntax for speed limit
- `--min-speed=SPEED` - Set minimum speed threshold

### Output and File Options
- `-o FILE` - Specify output filename
- `-O DIR` - Specify output directory
- `-S SEARCH` - Search for mirrors and use fastest
- `--no-proxy` - Disable proxy usage
- `--no-clobber` - Don't overwrite existing files

### Interface and Behavior Options
- `-a` - Show alternate progress bar (light mode)
- `-q` - Quiet mode (minimal output)
- `-v` - Verbose mode (detailed information)
- `-V` - Show version information
- `-h, --help` - Display help message

### Advanced Options
- `--header=HEADER` - Add custom HTTP header
- `--user-agent=AGENT` - Set custom user agent
- `--insecure` - Skip SSL certificate verification
- `--timeout=SECONDS` - Set connection timeout
- `--retries=NUM` - Set retry count (default: 3)

### Resume and Recovery
- `--max-redirect=NUM` - Maximum redirect follow count
- `--check-certificate` - Verify SSL certificates (default)

## Usage Examples

### Basic Download Operations

#### Simple Downloads
```bash
# Basic file download
axel https://example.com/file.iso

# Download with specific output filename
axel -o ubuntu-20.04.iso https://releases.ubuntu.com/20.04/ubuntu-20.04.3-desktop-amd64.iso

# Download with 8 connections for faster speed
axel -n 8 https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/debian-11.2.0-amd64-DVD-1.iso

# Quiet mode download
axel -q https://example.com/large-file.zip

# Download with speed limit (1MB/s)
axel -s 1048576 https://example.com/video.mp4
```

#### Multiple File Downloads
```bash
# Download multiple files
axel https://site1.com/file1.iso https://site2.com/file2.zip

# Download files to specific directory
axel -O /downloads/ https://example.com/software.tar.gz

# Download with verbose output
axel -v https://github.com/user/repo/archive/refs/heads/main.zip
```

### Advanced Download Techniques

#### Mirror Selection and Optimization
```bash
# Search for fastest mirror
axel -S http://www.kernel.org/pub/linux/kernel/v5.x/linux-5.15.5.tar.xz

# Use 16 connections for maximum speed
axel -n 16 https://ftp.gnu.org/gnu/gcc/gcc-11.2.0/gcc-11.2.0.tar.gz

# Download with custom headers
axel --header="Authorization: Bearer token" https://api.example.com/file

# Download with custom user agent
axel --user-agent="MyDownloader/1.0" https://example.com/file.bin
```

#### Large File Management
```bash
# Download large ISO with many connections
axel -n 10 -o windows.iso https://software-download.microsoft.com/ Win10_21H2_English_x64.iso

# Download with progress bar only
axel -a https://releases.ubuntu.com/20.04/ubuntu-20.04.3-live-server-amd64.iso

# Download to specific directory with custom name
axel -o /var/cache/apt/archives/package.deb https://packages.debian.org/bullseye/amd64/package/download

# Resume interrupted download (automatic)
axel https://example.com/partial-download.zip
```

### Network-Specific Downloads

#### HTTP Downloads
```bash
# HTTP download with authentication
axel --header="Authorization: Basic $(echo -n user:pass | base64)" https://private-site.com/file.tar.gz

# Download through proxy with authentication
export http_proxy="http://user:pass@proxy.example.com:8080"
axel https://example.com/file.zip

# Download with custom referer
axel --header="Referer: https://source-site.com/" https://download-site.com/file.bin

# Download with cookies
axel --header="Cookie: session=abc123" https://secure-site.com/download/file.pdf
```

#### HTTPS Downloads
```bash
# Skip SSL certificate verification
axel --insecure https://self-signed-site.com/file.tar.gz

# Download with specific timeout
axel --timeout=30 https://slow-server.com/large-file.iso

# Set custom CA certificate (via environment)
export CURL_CA_BUNDLE="/path/to/ca-bundle.crt"
axel https://secured-site.com/file.zip
```

#### FTP Downloads
```bash
# FTP download (anonymous)
axel ftp://ftp.example.com/pub/software/package.tar.gz

# FTP download with authentication (in URL format)
axel ftp://user:password@ftp.example.com/path/to/file.iso

# Active FTP mode (may need firewall configuration)
export FTP_MODE=active
axel ftp://files.example.com/data.zip
```

### Resume and Recovery Operations

#### Resume Interrupted Downloads
```bash
# Resume automatically when file exists
axel https://example.com/large-file.part

# Force resume (use if automatic resume fails)
axel -o existing-file.iso https://example.com/file.iso

# Resume with different connection count
axel -n 6 -o partial-download.zip https://example.com/archive.zip

# Check if file can be resumed
ls -la *.iso  # Look for partial files
axel -v *.iso  # Verbose output shows resume status
```

## Practical Examples

### System Administration

#### Software Distribution and Updates
```bash
# Download Linux kernel source
axel -n 8 -O /usr/src/ https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.1.1.tar.xz

# Download security patches
axel -S http://security.ubuntu.com/ubuntu/pool/main/p/patch-name.deb

# Batch download updates
for url in $(cat update-urls.txt); do
    axel -n 4 -O /var/cache/apt/archives/ "$url"
done

# Download Docker images (tar exports)
axel https://download.docker.com/linux/static/stable/x86_64/docker-20.10.12.tgz
```

#### Backup and Archive Downloads
```bash
# Download system backup from remote server
axel -n 2 -o system-backup-$(date +%Y%m%d).tar.gz \
    https://backup-server.example.com/backups/latest.tar.gz

# Download database dump
axel --header="Authorization: Bearer $(cat token.txt)" \
    https://backup-api.example.com/database/dump.sql

# Download log archives
axel -n 4 -O /var/log/archives/ \
    https://log-server.example.com/archives/logs-$(date +%Y%m%d).tar.gz
```

#### ISO and Media Downloads
```bash
# Download Linux distributions
axel -n 10 -o /isos/ubuntu-22.04-desktop-amd64.iso \
    https://releases.ubuntu.com/22.04/ubuntu-22.04-desktop-amd64.iso

# Download virtual machine images
axel -n 8 -o centos-8-stream-x86_64.qcow2 \
    https://cloud.centos.org/centos/8-stream/x86_64/images/CentOS-Stream-GenericCloud-8-latest.x86_64.qcow2

# Download container images
axel -o alpine.tar.gz https://dl-cdn.alpinelinux.org/alpine/v3.17/releases/x86_64/alpine-standard-3.17.0-x86_64.iso
```

### Development Workflow

#### Source Code and Dependencies
```bash
# Download source code archives
axel -n 4 -o boost_1_81_0.tar.gz \
    https://boostorg.jfrog.io/artifactory/main/release/1.81.0/source/boost_1_81_0.tar.gz

# Download third-party libraries
axel -S https://downloads.sourceforge.net/project/library/library-1.0.tar.gz

# Download build dependencies
axel -n 2 -O build-deps/ https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz

# Download package repositories
axel -o epel-release.rpm https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
```

#### Continuous Integration and Deployment
```bash
# Download build artifacts
axel --header="Authorization: token $GITHUB_TOKEN" \
    https://api.github.com/repos/user/repo/actions/artifacts/12345/zip

# Download deployment packages
axel -n 4 -o deployment-v1.2.3.tar.gz \
    https://ci-server.example.com/artifacts/deployment-v1.2.3.tar.gz

# Download configuration files
axel -o config.prod.yaml https://config-server.example.com/production/config.yaml
```

### Data Science and Research

#### Dataset Downloads
```bash
# Download large datasets
axel -n 16 -o research-dataset.csv https://data.research.gov/datasets/large-dataset.csv

# Download scientific data
axel -S ftp://ftp.ncbi.nlm.nih.gov/pub/data/genome/human.fa.gz

# Download model files
axel -n 8 -o model-v2.1.h5 https://ml-models.example.com/models/image-classification-v2.1.h5

# Download research papers
wget -r -np -A.pdf https://arxiv.org/list/cs.AI/recent
```

### Media Content Management

#### Video and Audio Downloads
```bash
# Download video files
axel -n 4 -o presentation.mp4 https://media.example.com/videos/presentation.mp4

# Download audio archives
axel -n 2 -o podcast-episode-123.mp3 https://podcast.example.com/episodes/episode-123.mp3

# Download image collections
axel -n 8 -o photo-gallery.zip https://gallery.example.com/downloads/2023/gallery.zip

# Batch download from file list
while read url; do
    axel -n 4 -O /downloads/ "$url"
done < download-urls.txt
```

## Advanced Usage

### Performance Optimization

#### Connection Tuning
```bash
# Find optimal connection count for your network
for connections in 2 4 8 16 32; do
    echo "Testing with $connections connections..."
    time axel -n $connections --max-speed=10m https://speedtest.example.com/100MB.bin
done

# Adaptive download based on file size
download_with_adaptive() {
    local url=$1
    local file_size=$(curl -sI "$url" | grep -i content-length | awk '{print $2}' | tr -d '\r')

    if [ "$file_size" -gt 104857600 ]; then  # > 100MB
        axel -n 16 "$url"
    elif [ "$file_size" -gt 10485760 ]; then  # > 10MB
        axel -n 8 "$url"
    else
        axel -n 4 "$url"
    fi
}

# Bandwidth-aware downloading
if [ "$(date +%H)" -ge 9 ] && [ "$(date +%H)" -lt 17 ]; then
    axel -n 4 -s 5m https://example.com/large-file.iso
else
    axel -n 16 https://example.com/large-file.iso
fi
```

#### Memory and Disk Management
```bash
# Monitor disk space during download
download_with_space_check() {
    local url=$1
    local output=$2
    local required_space=$(curl -sI "$url" | grep -i content-length | awk '{print $2}')
    local available_space=$(df -BG . | awk 'NR==2 {print $4}' | sed 's/G//')

    if [ "$required_space" -gt "$((available_space * 1073741824))" ]; then
        echo "Insufficient disk space"
        return 1
    fi

    axel -o "$output" "$url"
}

# Download with progress monitoring
download_with_progress() {
    local url=$1
    local output=$2

    axel -v -o "$output" "$url" | while read -r line; do
        if [[ $line =~ .*%.* ]]; then
            echo -ne "\r$line"
        fi
    done
    echo
}
```

### Network Integration

#### Proxy and Firewall Configuration
```bash
# Configure proxy for corporate networks
export http_proxy="http://proxy.company.com:8080"
export https_proxy="http://proxy.company.com:8080"
export ftp_proxy="http://proxy.company.com:8080"

# Download with proxy authentication
export http_proxy="http://username:password@proxy.company.com:8080"
axel https://external-site.com/file.zip

# Bypass proxy for local networks
export no_proxy="localhost,127.0.0.1,10.0.0.0/8,192.168.0.0/16"

# Download with specific network interface
sudo ip link set dev eth0 up
axel https://example.com/file.iso
```

#### Quality of Service Integration
```bash
# Download with traffic shaping (Linux tc)
sudo tc qdisc add dev eth0 root handle 1: htb default 30
sudo tc class add dev eth0 parent 1: classid 1:1 htb rate 100mbit
sudo tc class add dev eth0 parent 1:1 classid 1:10 htb rate 50mbit ceil 100mbit
sudo tc filter add dev eth0 protocol ip parent 1:0 prio 1 u32 match ip dport 80 0xffff flowid 1:10

# Download with network namespace
sudo ip netns add download-ns
sudo ip netns exec download-ns axel https://example.com/file.iso
```

### Security and Authentication

#### SSL/TLS Configuration
```bash
# Download with custom CA certificate
export SSL_CERT_FILE="/etc/ssl/certs/custom-ca.crt"
axel https://secure-site.com/file.zip

# Download with client certificate
export SSL_CLIENT_CERT="/path/to/client.pem"
export SSL_CLIENT_KEY="/path/to/client.key"
axel https://secure-api.example.com/data.tar.gz

# Skip certificate verification for testing only
axel --insecure https://self-signed.example.com/file.bin
```

#### Authentication Methods
```bash
# Basic authentication
axel --header="Authorization: Basic $(printf 'user:pass' | base64)" \
    https://protected-site.com/file.zip

# Bearer token authentication
axel --header="Authorization: Bearer $API_TOKEN" \
    https://api.example.com/downloads/file.pdf

# Custom authentication headers
axel --header="X-API-Key: $API_KEY" \
    --header="X-Client-ID: $CLIENT_ID" \
    https://api.service.com/exports/data.csv

# Cookie-based authentication
axel --header="Cookie: session_id=$(cat session.txt); auth_token=$(cat token.txt)" \
    https://webapp.example.com/download/file.zip
```

## Integration and Automation

### Shell Scripts

#### Automated Download Script
```bash
#!/bin/bash
# Advanced download manager with Axel

DOWNLOAD_DIR="/downloads"
LOG_FILE="/var/log/download-manager.log"
MAX_RETRIES=3
CONNECTIONS=8

# Create download directory
mkdir -p "$DOWNLOAD_DIR"

download_file() {
    local url=$1
    local filename=$(basename "$url")
    local output_path="$DOWNLOAD_DIR/$filename"

    echo "$(date): Starting download of $url" >> "$LOG_FILE"

    for ((i=1; i<=MAX_RETRIES; i++)); do
        if axel -n $CONNECTIONS -o "$output_path" "$url"; then
            echo "$(date): Successfully downloaded $filename" >> "$LOG_FILE"
            return 0
        else
            echo "$(date): Download attempt $i failed for $filename" >> "$LOG_FILE"
            sleep 10
        fi
    done

    echo "$(date): Failed to download $filename after $MAX_RETRIES attempts" >> "$LOG_FILE"
    return 1
}

# Download from URL list
if [ -f "$1" ]; then
    while read -r url; do
        [ ! -z "$url" ] && download_file "$url"
    done < "$1"
else
    download_file "$1"
fi
```

#### Mirror Selection Script
```bash
#!/bin/bash
# Smart mirror selection with Axel

URL=$1
FILE=$2

if [ -z "$URL" ] || [ -z "$FILE" ]; then
    echo "Usage: $0 <URL> <output-file>"
    exit 1
fi

# Test mirror speeds and select fastest
echo "Testing mirror speeds..."
axel -S -n 1 -o "$FILE" "$URL" &
AXEL_PID=$!

# Monitor progress
while kill -0 $AXEL_PID 2>/dev/null; do
    if [ -f "$FILE.st" ]; then
        speed=$(tail -1 "$FILE.st" | awk '{print $3}')
        echo "Current speed: $speed"
    fi
    sleep 5
done

wait $AXEL_PID

if [ $? -eq 0 ]; then
    echo "Download completed successfully"
else
    echo "Download failed"
    exit 1
fi
```

#### Batch Download Manager
```bash
#!/bin/bash
# Batch download with parallel processing

MAX_PARALLEL=4
CONNECTIONS_PER_DOWNLOAD=4
URL_FILE="download-urls.txt"
OUTPUT_DIR="downloads"

mkdir -p "$OUTPUT_DIR"

download_with_axel() {
    local url=$1
    local filename=$(basename "$url")
    local output="$OUTPUT_DIR/$filename"

    axel -n $CONNECTIONS_PER_DOWNLOAD -o "$output" "$url"
    echo "Downloaded: $filename"
}

export -f download_with_axel
export OUTPUT_DIR CONNECTIONS_PER_DOWNLOAD

# Process URLs in parallel
xargs -n 1 -P $MAX_PARALLEL -I {} bash -c 'download_with_axel "$@"' _ {} < "$URL_FILE"

echo "All downloads completed"
```

### Cron Integration

#### Scheduled Downloads
```bash
#!/bin/bash
# /usr/local/bin/daily-downloads

BACKUP_DIR="/backups/daily-$(date +%Y%m%d)"
URLS_FILE="/etc/download-urls.conf"
LOG="/var/log/daily-downloads.log"

mkdir -p "$BACKUP_DIR"

while read -r url output; do
    echo "$(date): Downloading $url to $output" >> "$LOG_FILE"

    if axel -n 4 -o "$BACKUP_DIR/$output" "$url"; then
        echo "$(date): Success: $output" >> "$LOG_FILE"
    else
        echo "$(date): Failed: $output" >> "$LOG_FILE"
    fi
done < "$URLS_FILE"

# Cleanup old backups (keep 7 days)
find /backups -name "daily-*" -mtime +7 -exec rm -rf {} \;
```

```cron
# Crontab entry for daily downloads at 2 AM
0 2 * * * /usr/local/bin/daily-downloads
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Download fails with connection errors
# Solutions:
axel --timeout=60 --retries=5 https://example.com/file.iso
axel -n 2 https://problematic-server.com/file.zip  # Reduce connections
axel --no-proxy https://proxy-blocked-site.com/file.bin

# Check network connectivity
ping -c 4 example.com
nslookup example.com

# Test with different user agents
axel --user-agent="Mozilla/5.0" https://blocked-site.com/file.zip
axel --user-agent="curl/7.68.0" https://blocked-site.com/file.zip
```

#### Speed Issues
```bash
# Slow download speeds
# Solutions:
axel -n 16 https://fast-server.com/large-file.iso  # Increase connections
axel -S https://mirror-site.com/file.zip           # Use mirror search
axel --max-speed=0 https://unlimited-site.com/file.iso  # Remove speed limit

# Test different mirror locations
axel https://us-mirror.example.com/file.iso
axel https://eu-mirror.example.com/file.iso
axel https://asia-mirror.example.com/file.iso
```

#### File System Issues
```bash
# Out of disk space
# Solutions:
df -h  # Check available space
axel -o /mnt/large-disk/file.iso https://example.com/large-file.iso

# Permission denied
sudo axel -o /root/protected-file.bin https://example.com/file.bin
sudo chown $USER:$USER /path/to/download/directory

# File name issues
axel -o "custom name.zip" https://example.com/file%20with%20spaces.zip
```

#### SSL/TLS Certificate Issues
```bash
# Certificate verification failures
# Solutions:
axel --insecure https://self-signed-site.com/file.iso  # Skip verification (not recommended)
sudo apt-get install ca-certificates  # Update certificates
export SSL_CERT_FILE="/path/to/certificate.pem"
```

### Performance Analysis

#### Benchmarking Download Speeds
```bash
# Test optimal connection count
benchmark_axel() {
    local url=$1
    local max_connections=${2:-16}

    echo "Testing download speeds for: $url"

    for connections in $(seq 1 $max_connections); do
        echo "Testing with $connections connections..."
        time axel -n $connections -o /dev/null "$url"
        echo "---"
    done
}

# Test with different mirrors
test_mirrors() {
    local file=$1
    local mirrors=(
        "https://mirror1.example.com/$file"
        "https://mirror2.example.com/$file"
        "https://mirror3.example.com/$file"
    )

    for mirror in "${mirrors[@]}"; do
        echo "Testing mirror: $mirror"
        time axel -n 8 -o /dev/null "$mirror"
        echo "---"
    done
}
```

#### Network Optimization
```bash
# Optimize TCP settings for better performance
echo 'net.core.rmem_max = 16777216' | sudo tee -a /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 87380 16777216' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_wmem = 4096 65536 16777216' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Monitor network during download
sudo iftop -i eth0 &
axel -n 8 https://example.com/large-file.iso
sudo pkill iftop
```

## Related Commands

- [`wget`](/docs/commands/network/wget) - Command-line download manager with advanced features
- [`curl`](/docs/commands/network/curl) - Data transfer tool with extensive protocol support
- [`aria2`](/docs/commands/network/aria2) - Multi-protocol multi-source download utility
- [`rsync`](/docs/commands/network/rsync) - Fast remote file copy and synchronization tool
- [`scp`](/docs/commands/network/scp) - Secure copy protocol client
- [`sftp`](/docs/commands/network/sftp) - Secure file transfer protocol client
- [`lftp`](/docs/commands/network/lftp) - Sophisticated file transfer program
- [`ncftp`](/docs/commands/network/ncftp) - NcFTP browser and client

## Best Practices

1. **Use appropriate connection counts** - Start with 4-8 connections, increase for large files
2. **Test mirror speeds** - Use `-S` option to find fastest mirrors automatically
3. **Monitor bandwidth usage** - Use speed limits during peak hours with `-s`
4. **Resume interrupted downloads** - Axel automatically resumes partial downloads
5. **Set proper timeouts** - Use `--timeout` for unreliable connections
6. **Use output directories** - Organize downloads with `-O` option
7. **Monitor disk space** - Ensure sufficient space before starting large downloads
8. **Configure proxy settings** - Set environment variables for corporate networks
9. **Use authentication headers** - Secure downloads with proper authentication
10. **Log downloads** - Keep track of download activities for auditing

## Performance Tips

1. **More connections aren't always better** - Too many connections can overwhelm the server
2. **Use mirror search** (`-S`) for large downloads from popular sites
3. **Limit concurrent downloads** on systems with limited bandwidth
4. **Prioritize important downloads** with higher connection counts
5. **Schedule large downloads** during off-peak hours
6. **Use SSD storage** for better write performance during downloads
7. **Close bandwidth-intensive applications** while downloading large files
8. **Monitor system resources** during heavy download sessions
9. **Use wired connections** for more stable downloads
10. **Consider file system choice** - ext4/btrfs perform better than FAT32 for large files

The `axel` command is an excellent choice for accelerating HTTP and FTP downloads through its multi-connection approach. Its simple interface, automatic resume capability, and mirror selection features make it particularly valuable for downloading large files efficiently. When used properly with the right combination of options, axel can significantly reduce download times compared to single-connection download tools.