---
title: curl - Transfer Data with URLs
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# curl - Transfer Data with URLs

The `curl` command is a powerful tool for transferring data with URLs. It supports numerous protocols including HTTP, HTTPS, FTP, FTPS, SCP, SFTP, TFTP, LDAP, and more. It's essential for web scraping, API testing, file transfers, and network diagnostics.

## Basic Syntax

```bash
curl [OPTIONS] [URL...]
```

## Common Options

### Output Options
- `-o, --output FILE` - Write output to FILE instead of stdout
- `-O, --remote-name` - Write output to local file named like remote file
- `-C, --continue-at OFFSET` - Resume transferred at given offset
- `--create-dirs` - Create necessary local directory structure

### Request Options
- `-X, --request COMMAND` - Specify request command (GET, POST, PUT, DELETE)
- `-d, --data DATA` - HTTP POST data
- `-G, --get` - Send the -d data with a GET request
- `-I, --head` - Show document info only (HTTP HEAD)
- `-i, --include` - Include protocol headers in the output

### Authentication
- `-u, --user USER[:PASSWORD]` - Set user and password
- `--user-agent AGENT` - Set user-agent string
- `--proxy USER:PASS@HOST:PORT` - Use HTTP proxy
- `--cert CERT[:PASSWD]` - Client certificate file and password

### SSL/TLS
- `-k, --insecure` - Allow insecure SSL connections
- `--cacert FILE` - CA certificate to verify peer against
- `--cert-type TYPE` - Certificate type (DER, PEM, ENG)

### Verbose and Debug
- `-v, --verbose` - Make the operation more talkative
- `--trace FILE` - Dump all network traffic to FILE
- `--trace-time` - Add time stamps to trace/verbose output

## Usage Examples

### Basic HTTP Requests
```bash
# GET request (default)
curl https://api.example.com/data

# Save output to file
curl -o output.txt https://example.com/page.html

# Save with remote filename
curl -O https://example.com/file.zip

# Follow redirects
curl -L https://bit.ly/short-url
```

### POST Requests
```bash
# POST form data
curl -X POST -d "name=value&param2=value2" https://api.example.com/submit

# POST JSON data
curl -X POST -H "Content-Type: application/json" \
     -d '{"key":"value", "param":"data"}' \
     https://api.example.com/data

# POST from file
curl -X POST -d @data.json https://api.example.com/upload
```

### File Downloads
```bash
# Download single file
curl -O https://example.com/file.pdf

# Download with resume capability
curl -C - -O https://example.com/largefile.zip

# Download with progress bar
curl -# -O https://example.com/file.tar.gz

# Download multiple files
curl -O https://site.com/file1.txt -O https://site.com/file2.txt
```

### Header Manipulation
```bash
# Set custom headers
curl -H "Authorization: Bearer token123" https://api.example.com

# Set user agent
curl -A "Mozilla/5.0" https://httpbin.org/user-agent

# Include response headers
curl -i https://example.com

# Only get headers
curl -I https://example.com
```

### Authentication
```bash
# Basic authentication
curl -u username:password https://api.example.com

# Bearer token authentication
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com

# Client certificate authentication
curl --cert client.crt --key client.key https://secure.example.com
```

## Advanced Usage

### API Testing
```bash
# RESTful API operations
curl -X GET https://api.example.com/users/1
curl -X POST -d '{"name":"John"}' -H "Content-Type: application/json" https://api.example.com/users
curl -X PUT -d '{"name":"Jane"}' -H "Content-Type: application/json" https://api.example.com/users/1
curl -X DELETE https://api.example.com/users/1

# API with query parameters
curl "https://api.example.com/search?q=linux&limit=10"

# Pretty JSON output
curl https://api.example.com/data | jq '.'
```

### File Uploads
```bash
# Upload file with POST
curl -F "file=@/path/to/file.txt" https://upload.example.com

# Multiple file upload
curl -F "file1=@file1.txt" -F "file2=@file2.txt" https://upload.example.com

# Upload with additional form fields
curl -F "file=@document.pdf" -F "description=Important document" https://upload.example.com
```

### FTP Operations
```bash
# List FTP directory
curl ftp://ftp.example.com/directory/

# Download FTP file
curl -O ftp://ftp.example.com/file.txt

# Upload to FTP
curl -T localfile.txt ftp://ftp.example.com/remote.txt

# FTP with authentication
curl -u user:pass -T file.txt ftp://ftp.example.com/
```

### Proxy and Network Configuration
```bash
# Use HTTP proxy
curl -x http://proxy.example.com:8080 https://example.com

# Proxy with authentication
curl -x http://user:pass@proxy.example.com:8080 https://example.com

# SOCKS proxy
curl --socks5 socks5://proxy.example.com:1080 https://example.com

# Set DNS servers
curl --dns-servers 8.8.8.8,8.8.4.4 https://example.com
```

## Special Features

### Cookie Handling
```bash
# Save cookies to file
curl -c cookies.txt https://example.com

# Use cookies from file
curl -b cookies.txt https://example.com

# Set single cookie
curl -b "session=abc123" https://example.com

# Cookie jar (both save and load)
curl -b cookies.txt -c cookies.txt https://example.com
```

### Rate Limiting and Performance
```bash
# Limit download speed
curl --limit-rate 1000K -O https://example.com/largefile.zip

# Set connection timeout
curl --connect-timeout 10 https://example.com

# Set maximum time
curl --max-time 60 https://example.com

# Retry on failure
curl --retry 3 --retry-delay 1 https://example.com
```

### SSL/TLS Options
```bash
# Insecure SSL (bypass certificate validation)
curl -k https://self-signed.example.com

# Specify CA certificate
curl --cacert ca.crt https://secure.example.com

# Client certificate authentication
curl --cert client.crt --key client.key https://secure.example.com

# Force specific SSL/TLS version
curl --tlsv1.2 https://example.com
```

## Scripting Examples

### Health Check Script
```bash
#!/bin/bash
# health_check.sh - Check website availability

SITES=("https://google.com" "https://github.com" "https://stackoverflow.com")

for site in "${SITES[@]}"; do
    if curl -f -s -o /dev/null "$site"; then
        echo "✓ $site is up"
    else
        echo "✗ $site is down"
    fi
done
```

### API Test Script
```bash
#!/bin/bash
# api_test.sh - Test API endpoints

BASE_URL="https://api.example.com"
TOKEN="your-api-token"

# Test GET request
echo "Testing GET endpoint..."
curl -H "Authorization: Bearer $TOKEN" \
     "$BASE_URL/users" | jq '.[:2]'

# Test POST request
echo -e "\nTesting POST endpoint..."
curl -X POST \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com"}' \
     "$BASE_URL/users"
```

### Download Manager
```bash
#!/bin/bash
# download_manager.sh - Resumeable file downloader

URL="$1"
OUTPUT="$2"

if [ -z "$URL" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: $0 <URL> <output_file>"
    exit 1
fi

echo "Downloading: $URL -> $OUTPUT"
curl -L -C - -o "$OUTPUT" "$URL"

if [ $? -eq 0 ]; then
    echo "Download completed successfully"
else
    echo "Download failed"
fi
```

## Troubleshooting

### Debug Options
```bash
# Verbose output
curl -v https://example.com

# Trace network traffic
curl --trace trace.txt https://example.com

# Time-traced output
curl --trace-ascii trace.txt --trace-time https://example.com
```

### Common Issues
```bash
# Certificate verification failed
curl: (60) SSL certificate problem
# Solution: Use -k for testing or fix certificate

# Connection timeout
curl: (28) Operation timed out
# Solution: Increase timeout or check network

# HTTP 404 Not Found
curl: (22) The requested URL returned error: 404
# Solution: Check URL and verify resource exists
```

### Performance Testing
```bash
# Time the request
curl -w "Total time: %{time_total}s\n" -o /dev/null -s https://example.com

# Download speed test
curl -w "Download speed: %{speed_download} bytes/sec\n" \
     -o /dev/null -s https://example.com/largefile
```

## Related Commands

- [`wget`](/docs/commands/file-management/wget) - Non-interactive file downloader
- [`scp`](/docs/commands/file-management/scp) - Secure copy protocol
- [`rsync`](/docs/commands/file-management/rsync) - Remote file synchronization
- [`nc`](/docs/commands/network-communication/nc) - Netcat for network connections
- [`telnet`](/docs/commands/network-communication/telnet) - Telnet client

## Best Practices

1. **Always quote URLs** with special characters:
   - `curl "https://example.com/path with spaces"`

2. **Use appropriate HTTP methods** for APIs:
   - GET for retrieval, POST for creation, PUT for updates, DELETE for removal

3. **Handle errors properly** in scripts:
   - Check exit codes and use appropriate error handling

4. **Be secure with credentials**:
   - Avoid passwords in command line history
   - Use config files or environment variables

5. **Use appropriate timeouts** for production scripts:
   - `--connect-timeout` and `--max-time`

6. **Rate limit requests** when possible:
   - `--limit-rate` for downloads, add delays for API calls

7. **Use verbose mode** for debugging:
   - `-v` to understand what curl is doing

The `curl` command is an incredibly versatile tool for network operations, from simple downloads to complex API interactions. Mastering its numerous options and protocols makes it indispensable for system administration, development, and automation tasks.