---
title: wget - Web Downloader
sidebar_label: wget
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# wget - Web Downloader

The `wget` command is a free utility for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols, as well as retrieval through HTTP proxies. It's designed to be robust and can handle slow network connections and interruptions.

## Basic Syntax

```bash
wget [OPTIONS] [URL]...
```

## Common Options

### Download Options
- `-O, --output-document=FILE` - Write documents to FILE
- `-c, --continue` - Continue getting a partially-downloaded file
- `--progress=TYPE` - Select progress indicator type
- `-N, --timestamping` - Turn on time-stamping
- `--no-clobber` - Skip downloads that would overwrite existing files

### Recursive Retrieval
- `-r, --recursive` - Turn on recursive retrieving
- `-l, --level=NUMBER` - Maximum recursion depth
- `-k, --convert-links` - Convert links for local viewing
- `-p, --page-requisites` - Get all image files, etc. needed to display HTML page
- `--no-parent` - Don't ascend to the parent directory

### FTP Options
- `--ftp-user=USER` - Set FTP user
- `--ftp-password=PASS` - Set FTP password
- `--no-passive-ftp` - Disable passive FTP mode

### HTTP Options
- `--http-user=USER` - Set HTTP user
- `--http-password=PASS` - Set HTTP password
- `--header=STRING` - Insert STRING among headers
- `--user-agent=AGENT` - Identify as AGENT instead of Wget/VERSION

### Output and Logging
- `-o, --output-file=FILE` - Log messages to FILE
- `-a, --append-output=FILE` - Append messages to FILE
- `-d, --debug` - Print debug output
- `-q, --quiet` - Quiet (no output)
- `-v, --verbose` - Be verbose (default)

## Usage Examples

### Basic Downloads
```bash
# Download single file
wget https://example.com/file.zip

# Download with custom filename
wget -O custom_name.pdf https://example.com/document.pdf

# Resume interrupted download
wget -c https://example.com/largefile.iso

# Download in background
wget -b https://example.com/file.zip
```

### Recursive Downloads
```bash
# Download entire website (one level deep)
wget -r -l1 https://example.com/

# Download website with all dependencies
wget -r -p -k https://example.com/

# Recursive download with limit
wget -r -l3 -np https://example.com/path/

# Download entire directory from FTP
wget -r ftp://ftp.example.com/path/
```

### Authentication and Headers
```bash
# Download with HTTP authentication
wget --user=username --password=password https://example.com/protected/file.txt

# Custom user agent
wget --user-agent="Mozilla/5.0" https://example.com/

# Custom headers
wget --header="Accept: application/json" https://api.example.com/data

# Download with cookies
wget --load-cookies cookies.txt https://example.com/protected/
```

### Download Control
```bash
# Download multiple URLs from file
wget -i urls.txt

# Rate limit download
wget --limit-rate=200k https://example.com/largefile.zip

# Number of retry attempts
wget -t 5 https://example.com/file.zip

# Wait between retries
wget --wait=10 --random-wait https://example.com/files/
```

## Advanced Usage

### Mirror Websites
```bash
# Complete mirror of website
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://example.com/

# Mirror with specific domains
wget --mirror --domains=example.com,www.example.com --exclude-domains=ads.example.com https://example.com/

# Mirror excluding certain paths
wget -r --exclude-directories=/forum,/admin https://example.com/
```

### File Type Filtering
```bash
# Download only specific file types
wget -A "*.pdf,*.doc" -r https://example.com/documents/

# Exclude specific file types
wget -R "*.gif,*.jpg" -r https://example.com/

# Download based on URL patterns
wget --accept-regex='.*\.mp3' -r https://music.example.com/
```

### Download Management
```bash
# Download with timestamping
wget -N https://example.com/daily-report.csv

# Force clobber (overwrite existing files)
wget --no-clobber https://example.com/file.txt

# Skip certificate verification
wget --no-check-certificate https://example.com/cert-file.zip

# Limit download size
wget -Q 10m https://example.com/files/
```

## Scripting Examples

### Batch Download Script
```bash
#!/bin/bash
# download_files.sh - Download files from URL list

URL_FILE="urls.txt"
OUTPUT_DIR="downloads"
LOG_FILE="download.log"

mkdir -p "$OUTPUT_DIR"

while IFS= read -r url; do
    echo "Downloading: $url"
    wget -c -P "$OUTPUT_DIR" -a "$LOG_FILE" "$url"
done < "$URL_FILE"

echo "Download completed. Check $LOG_FILE for details."
```

### Website Backup Script
```bash
#!/bin/bash
# website_backup.sh - Create local mirror of website

SITE_URL="$1"
BACKUP_DIR="site_backup_$(date +%Y%m%d)"

if [ -z "$SITE_URL" ]; then
    echo "Usage: $0 <website_url>"
    exit 1
fi

mkdir -p "$BACKUP_DIR"

wget --mirror \
     --convert-links \
     --adjust-extension \
     --page-requisites \
     --no-parent \
     --no-clobber \
     --user-agent="Mozilla/5.0" \
     --limit-rate=1m \
     --wait=1 \
     --random-wait \
     -P "$BACKUP_DIR" \
     "$SITE_URL"

echo "Website backup completed in $BACKUP_DIR"
```

### Update Checker Script
```bash
#!/bin/bash
# check_updates.sh - Download files only if updated

URLS=("https://example.com/data.csv" "https://api.example.com/stats.json")
DOWNLOAD_DIR="updates"

mkdir -p "$DOWNLOAD_DIR"

for url in "${URLS[@]}"; do
    filename=$(basename "$url")
    wget -N -P "$DOWNLOAD_DIR" "$url"

    if [ $? -eq 0 ]; then
        echo "Updated: $filename"
    else
        echo "No update needed for $filename"
    fi
done
```

## Special Features

### Background Downloads
```bash
# Start download in background
wget -b https://example.com/largefile.iso

# Background with custom output file
wget -b -o wget.log https://example.com/files.zip

# Check background download progress
tail -f wget.log
```

### Resuming Downloads
```bash
# Resume interrupted download
wget -c https://example.com/partial-file.bin

# Force resume even if local file exists
wget -c --no-clobber https://example.com/file.bin
```

### Proxy Configuration
```bash
# Use HTTP proxy
wget -e use_proxy=yes -e http_proxy=proxy.example.com:8080 https://target.com/

# Use proxy with authentication
wget -e https_proxy=user:pass@proxy.example.com:8080 https://secure.com/

# Bypass proxy for certain domains
wget --no-proxy localhost,127.0.0.1,intranet.company.com https://example.com/
```

## Troubleshooting

### Common Issues
```bash
# SSL certificate verification failed
wget --no-check-certificate https://self-signed.example.com/

# 403 Forbidden error
wget --user-agent="Mozilla/5.0" https://example.com/protected/

# Connection timeout
wget --timeout=30 --tries=3 https://example.com/file.zip
```

### Debug Mode
```bash
# Verbose debug output
wget -d https://example.com/

# Save headers
wget --save-headers https://example.com/

# Show server response
wget -S https://example.com/
```

## Related Commands

- [`curl`](/docs/commands/file-management/curl) - Transfer data with URLs
- [`httrack`](/docs/commands/file-management/httrack) - Website copier
- [`youtube-dl`](/docs/commands/file-management/youtube-dl) - Video downloader
- [`aria2`](/docs/commands/file-management/aria2) - Multi-protocol downloader

## Best Practices

1. **Use appropriate options** for website mirroring:
   - `--mirror --convert-links --adjust-extension`

2. **Be respectful to web servers**:
   - Use `--wait` and `--random-wait` for recursive downloads

3. **Use timestamping** for updating files:
   - `wget -N` to download only newer files

4. **Rate limit downloads** to avoid overwhelming servers:
   - `--limit-rate=200k`

5. **Use background mode** for large downloads:
   - `wget -b` for unattended downloads

6. **Check robots.txt** before downloading entire sites:
   - Respect website crawling policies

7. **Use appropriate user agents**:
   - Some sites block default wget user agent

The `wget` command is a robust tool for downloading files and mirroring websites. Its reliability and comprehensive options make it ideal for automated downloads, backups, and offline browsing in Linux environments.