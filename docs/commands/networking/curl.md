---
title: curl - Transfer Data with URLs
sidebar_label: curl
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# curl - Transfer Data with URLs

The `curl` command is a powerful command-line tool and library for transferring data with URLs. It supports an extensive range of protocols including HTTP, HTTPS, FTP, FTPS, SCP, SFTP, TFTP, LDAP, LDAPS, DICT, TELNET, FILE, IMAP, POP3, SMTP and more. Since its creation in 1997, curl has become the de facto standard for command-line data transfer, making it indispensable for web scraping, API testing, file transfers, network diagnostics, and automation tasks. Its versatility, reliability, and extensive feature set make it a crucial tool for system administrators, developers, and DevOps engineers.

## Basic Syntax

```bash
curl [options] [URL...]
```

## Protocol Support

curl supports the following protocols:
- **HTTP/HTTPS** - Hypertext Transfer Protocol (with SSL/TLS)
- **FTP/FTPS** - File Transfer Protocol (with SSL/TLS)
- **SCP/SFTP** - SSH File Transfer Protocol
- **TFTP** - Trivial File Transfer Protocol
- **LDAP/LDAPS** - Lightweight Directory Access Protocol (with SSL/TLS)
- **DICT** - Dictionary Server Protocol
- **TELNET** - Telnet Protocol
- **FILE** - Local file access
- **IMAP/IMAPS** - Internet Message Access Protocol (with SSL/TLS)
- **POP3/POP3S** - Post Office Protocol (with SSL/TLS)
- **SMTP/SMTPS** - Simple Mail Transfer Protocol (with SSL/TLS)

## Common Options

### Output and File Operations

#### Basic Output Options
- `-o, --output FILE` - Write output to specified file instead of stdout
- `-O, --remote-name` - Write output to local file named like remote file
- `--create-dirs` - Create necessary local directory structure
- `-C, --continue-at OFFSET` - Resume transfer at specified offset
- `--remote-name-all` - Use remote name for all URLs
- `--output-dir DIR` - Specify directory for output files
- `-J, --remote-header-name` - Use filename from Content-Disposition header

#### Progress and Display
- `-#, --progress-bar` - Display progress bar instead of meter
- `-s, --silent` - Silent mode (don't show progress or error messages)
- `-S, --show-error` - Show error even with -s
- `--stderr FILE` - Redirect stderr to specified file
- `--compressed` - Request compressed response using deflate/gzip

### HTTP Request Options

#### Request Methods
- `-X, --request COMMAND` - Specify custom request method (GET, POST, PUT, DELETE, PATCH, etc.)
- `-G, --get` - Send the -d data with a GET request instead of POST
- `-i, --include` - Include HTTP response headers in the output
- `-I, --head` - Show document info only (HTTP HEAD request)
- `--head-only` - Same as --head

#### Data and Content
- `-d, --data DATA` - HTTP POST data (URL-encoded)
- `--data-ascii DATA` - Same as -d but ASCII only
- `--data-binary DATA` - POST binary data without processing
- `--data-urlencode DATA` - URL-encode the data before sending
- `--data-raw DATA` - Send raw data without encoding
- `-F, --form CONTENT` - Specify multipart form data
- `--form-string STRING` - Specify form field without processing
- `-T, --upload-file FILE` - Upload file to URL

#### Headers and Content-Type
- `-H, --header HEADER` - Pass custom header to server
- `-A, --user-agent AGENT` - Set custom User-Agent string
- `-e, --referer REFERER` - Set HTTP Referer header
- `--url URL` - Set URL to work with
- `--resolve HOST:PORT:ADDR` - Force resolve of HOST:PORT to ADDR

### Authentication Options

#### User Authentication
- `-u, --user USER[:PASSWORD]` - Set user and password
- `--user-anyauth` - Pick any authentication method
- `--basic` - Use HTTP Basic authentication
- `--digest` - Use HTTP Digest authentication
- `--ntlm` - Use HTTP NTLM authentication
- `--negotiate` - Use HTTP Negotiate (SPNEGO) authentication
- `--aws-sigv4` - AWS Signature Version 4 authentication

#### Certificate and Key Options
- `-E, --cert CERT[:PASSWD]` - Client certificate file and password
- `--cert-type TYPE` - Certificate type (DER, PEM, ENG)
- `--key KEY` - Private key file name
- `--key-type TYPE` - Private key file type (DER, PEM, ENG)
- `--pass PASS` - Passphrase for private key

### SSL/TLS Options

#### Certificate Verification
- `-k, --insecure` - Allow insecure SSL connections (skip certificate verification)
- `--cacert FILE` - CA certificate to verify peer against
- `--capath DIR` - CA directory to verify peer against
- `--crlfile FILE` - Get a CRL list in PEM format from the given file
- `--pinnedpubkey FILE` - Set the public key file

#### SSL/TLS Configuration
- `--tlsv1.0` - Force TLSv1.0
- `--tlsv1.1` - Force TLSv1.1
- `--tlsv1.2` - Force TLSv1.2
- `--tlsv1.3` - Force TLSv1.3
- `--ssl-allow-beast` - Allow SSL Beast vulnerability workaround
- `--ssl-no-revoke` - Disable SSL certificate revocation checks

### Network Configuration

#### Connection Settings
- `--connect-timeout SECONDS` - Maximum time allowed for connection
- `--max-time SECONDS` - Maximum time allowed for the entire operation
- `--limit-rate RATE` - Limit transfer speed to RATE bytes/second
- `--max-filesize BYTES` - Maximum file size to download
- `--retry NUM` - Number of retry attempts
- `--retry-delay SECONDS` - Delay between retries
- `--retry-max-time SECONDS` - Maximum time for all retries combined

#### Proxy Configuration
- `-x, --proxy [PROTOCOL://]HOST[:PORT]` - Use proxy server
- `--socks5 HOST[:PORT]` - SOCKS5 proxy
- `--socks4a HOST[:PORT]` - SOCKS4a proxy
- `--proxy-user USER[:PASSWORD]` - Proxy authentication
- `--proxy-anyauth` - Pick any proxy authentication method
- `--preproxy [PROTOCOL://]HOST[:PORT]` - Use proxy before main proxy

### DNS and Resolution
- `--dns-servers ADDRESSES` - Comma-separated list of DNS servers
- `--dns-ipv4-addr ADDRESS` - IPv4 address to use for DNS requests
- `--dns-ipv6-addr ADDRESS` - IPv6 address to use for DNS requests
- `--interface INTERFACE` - Network interface to use
- `--local-port PORT` - Force local port number

### Debug and Troubleshooting

#### Verbose Options
- `-v, --verbose` - Make operation more talkative
- `--trace FILE` - Dump all network traffic to specified file
- `--trace-ascii FILE` - Dump all network traffic in ASCII format
- `--trace-time` - Add timestamps to trace/verbose output
- `--unix-socket FILE` - Connect through Unix domain socket

#### Performance Timing
- `-w, --write-out FORMAT` - Display information after transfer
- `--speed-limit SPEED` - Stop transfers below this speed for N seconds
- `--speed-time N` - Time to trigger speed limit abort

## Usage Examples

### Basic HTTP Operations

#### Simple GET Requests
```bash
# Basic GET request
curl https://api.example.com/data

# GET request with output to file
curl -o output.html https://example.com/page.html

# GET request saving with remote filename
curl -O https://example.com/documents/report.pdf

# GET request with silent mode and progress bar
curl -s -# -O https://example.com/largefile.zip

# GET request following redirects
curl -L https://bit.ly/shortened-url

# GET request with multiple URLs
curl -O https://site.com/file1.txt -O https://site.com/file2.txt

# GET request with URL list file
curl -O -K urls.txt
```

#### HTTP Methods
```bash
# HEAD request (headers only)
curl -I https://api.example.com/status

# OPTIONS request (available methods)
curl -X OPTIONS https://api.example.com/api

# PATCH request (partial update)
curl -X PATCH -d '{"field":"value"}' https://api.example.com/resource/1

# Custom request method
curl -X CUSTOM https://api.example.com/custom
```

### POST Requests and Data Submission

#### Form Data Submission
```bash
# Simple POST form data
curl -X POST -d "name=John&email=john@example.com" https://api.example.com/users

# POST data from file
curl -X POST -d @data.txt https://api.example.com/submit

# POST multiple data fields
curl -X POST \
     -d "username=admin" \
     -d "password=secret" \
     -d "remember=true" \
     https://api.example.com/login

# POST with URL encoding
curl -X POST --data-urlencode "name=John Doe" https://api.example.com/users

# POST raw data
curl -X POST --data-raw '{"raw":"data"}' https://api.example.com/raw
```

#### JSON Data Submission
```bash
# POST JSON data
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","age":30}' \
     https://api.example.com/users

# POST JSON from file
curl -X POST \
     -H "Content-Type: application/json" \
     -d @user.json \
     https://api.example.com/users

# POST JSON with pretty printing in terminal
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name":"John"}' \
     https://api.example.com/users | jq

# Multiple JSON objects in single request
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"users":[{"name":"John"},{"name":"Jane"}]}' \
     https://api.example.com/batch
```

### File Uploads

#### Multipart Form Uploads
```bash
# Single file upload
curl -X POST -F "file=@/path/to/document.pdf" https://upload.example.com

# File upload with additional form fields
curl -X POST \
     -F "file=@report.pdf" \
     -F "title=Monthly Report" \
     -F "author=John Doe" \
     https://upload.example.com/documents

# Multiple file upload
curl -X POST \
     -F "files=@file1.txt" \
     -F "files=@file2.txt" \
     https://upload.example.com/batch

# Upload with content type
curl -X POST \
     -F "image=@photo.jpg;type=image/jpeg" \
     -F "document=@report.pdf;type=application/pdf" \
     https://upload.example.com/mixed

# Upload from stdin
cat data.json | curl -X POST -F "data=@-" https://api.example.com/upload
```

#### Direct File Upload (PUT)
```bash
# Upload file directly (PUT method)
curl -T localfile.txt https://upload.example.com/remote.txt

# Upload with authentication
curl -u user:pass -T backup.tar.gz ftp://ftp.example.com/backups/

# Upload with progress bar
curl -T --progress-bar largefile.zip https://upload.example.com/

# Upload with resume capability
curl -C - -T partial_file.zip https://upload.example.com/
```

### Header Manipulation

#### Custom Headers
```bash
# Set single custom header
curl -H "Authorization: Bearer token123" https://api.example.com

# Set multiple headers
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer token123" \
     -H "X-Custom-Header: custom-value" \
     https://api.example.com/data

# Set user agent
curl -A "MyCustomApp/1.0" https://httpbin.org/user-agent

# Set referer
curl -e "https://google.com" https://example.com/page.html

# Include response headers in output
curl -i https://api.example.com/users

# Get headers only
curl -I https://api.example.com/status

# Send custom Accept header
curl -H "Accept: application/json" https://api.example.com/data

# Send API key in header
curl -H "X-API-Key: your-api-key-here" https://api.example.com
```

### Authentication and Security

#### HTTP Authentication
```bash
# Basic authentication
curl -u username:password https://api.example.com/secure

# Prompt for password
curl -u username https://api.example.com/secure

# Digest authentication
curl --digest -u user:pass https://api.example.com/

# NTLM authentication
curl --ntlm -u user:pass https://api.example.com/

# Any authentication method
curl --anyauth -u user:pass https://api.example.com/
```

#### Bearer Token and API Keys
```bash
# Bearer token authentication
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     https://api.example.com/secure

# API key in header
curl -H "X-API-Key: sk-1234567890abcdef" https://api.example.com

# API key in query parameter
curl "https://api.example.com/data?api_key=sk-1234567890abcdef"

# OAuth2 token
curl -H "Authorization: OAuth abc123def456" https://api.example.com/oauth
```

#### Certificate Authentication
```bash
# Client certificate authentication
curl --cert client.crt \
     --key client.key \
     https://secure.example.com/api

# Certificate with password
curl --cert client.crt:password \
     --key client.key \
     https://secure.example.com/

# Certificate type specification
curl --cert client.crt --cert-type PEM \
     --key client.key --key-type PEM \
     https://secure.example.com/

# CA certificate verification
curl --cacert ca-bundle.crt https://secure.example.com/

# Custom CA directory
curl --capath /etc/ssl/certs https://secure.example.com/
```

#### SSL/TLS Configuration
```bash
# Insecure SSL connection (skip verification)
curl -k https://self-signed.example.com

# Force specific TLS version
curl --tlsv1.2 https://api.example.com
curl --tlsv1.3 https://api.example.com

# Enable certificate revocation checking
curl --ssl-no-revoke https://secure.example.com

# Use specific cipher suites
curl --ciphers ECDHE-RSA-AES256-GCM-SHA384 https://secure.example.com/
```

### FTP Operations

#### FTP Downloads
```bash
# List FTP directory
curl ftp://ftp.example.com/directory/

# Download single FTP file
curl -O ftp://ftp.example.com/file.txt

# Download multiple files with wildcard
curl -O "ftp://ftp.example.com/files/*.txt"

# Download with authentication
curl -u user:pass -O ftp://ftp.example.com/secure/file.txt

# FTP over SSL/TLS
curl -u user:pass -O ftps://secure.example.com/file.txt

# Passive mode FTP
curl --ftp-pasv -O ftp://ftp.example.com/file.txt
```

#### FTP Uploads
```bash
# Upload file to FTP
curl -T localfile.txt ftp://ftp.example.com/remote.txt

# Upload with authentication
curl -u user:pass -T backup.tar.gz ftp://ftp.example.com/backups/

# Upload to specific directory
curl -T file.txt ftp://ftp.example.com/uploads/file.txt

# Create directory and upload
curl --ftp-create-dirs -T file.txt ftp://ftp.example.com/newdir/file.txt

# Upload with SSL/TLS
curl -u user:pass --ssl-reqd -T secure.txt ftp://ftp.example.com/
```

### Cookie Handling

#### Cookie Management
```bash
# Save cookies to file
curl -c cookies.txt https://example.com/login

# Use cookies from file
curl -b cookies.txt https://example.com/dashboard

# Set single cookie
curl -b "session=abc123; user=john" https://example.com/

# Cookie jar (both save and load)
curl -b cookies.txt -c cookies.txt https://example.com/session

# Cookie with domain and path
curl -b "name=value; domain=.example.com; path=/" https://example.com/

# Secure and HTTP-only cookies
curl -b "token=xyz; Secure; HttpOnly" https://example.com/

# Clear cookies
curl -b ";" https://example.com/
```

### Proxy Configuration

#### HTTP Proxy
```bash
# Use HTTP proxy
curl -x http://proxy.example.com:8080 https://example.com

# Proxy with authentication
curl -x http://user:pass@proxy.example.com:8080 https://example.com

# Use environment proxy settings
curl https://example.com

# SOCKS5 proxy
curl --socks5 socks5://proxy.example.com:1080 https://example.com

# SOCKS5 with authentication
curl --socks5 user:pass@socks5.example.com:1080 https://example.com

# Proxy chain
curl --preproxy http://internal-proxy:3128 \
     -x http://external-proxy:8080 \
     https://example.com
```

### Network Performance and Optimization

#### Speed and Rate Limiting
```bash
# Limit download speed (1MB/s)
curl --limit-rate 1M -O https://example.com/largefile.zip

# Set connection timeout (10 seconds)
curl --connect-timeout 10 https://example.com

# Set maximum time (60 seconds)
curl --max-time 60 https://example.com

# Retry on failure (3 attempts)
curl --retry 3 --retry-delay 1 https://example.com

# Low speed timeout (abort if speed < 1KB for 30 seconds)
curl --speed-limit 1024 --speed-time 30 https://example.com
```

#### Connection Optimization
```bash
# Use specific network interface
curl --interface eth0 https://example.com

# Use local port
curl --local-port 5000 https://example.com

# Parallel downloads (with zsh)
curl -O https://example.com/file{1..10}.zip &

# Persistent connections
curl --keepalive-time 60 https://api.example.com/multiple_requests

# Enable TCP keepalive
curl --keepalive https://example.com/
```

### Advanced HTTP Features

#### Content Compression
```bash
# Request compressed response
curl --compressed https://example.com/api/data

# Set specific compression
curl -H "Accept-Encoding: gzip, deflate" https://example.com/

# Handle compressed responses
curl --compressed -o file.json.gz https://api.example.com/data
```

#### Range Requests
```bash
# Download specific byte range
curl -r 0-999 -O https://example.com/largefile.mp4

# Download multiple ranges
curl -r 0-499,1000-1499 https://example.com/file.bin

# Download from offset to end
curl -r 1000- -O https://example.com/partial_file
```

#### Conditional Requests
```bash
# If-Modified-Since request
curl -H "If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT" \
     https://example.com/resource

# If-None-Match request
curl -H "If-None-Match: \"33a64df551425fcc55e4d42a148795d9f25f89d4\"" \
     https://example.com/resource

# HTTP caching control
curl -H "Cache-Control: no-cache" https://example.com/api/data
curl -H "Cache-Control: max-age=3600" https://example.com/resource
```

## Practical Examples

### API Testing and Development

#### RESTful API Operations
```bash
# GET request for all users
curl -H "Authorization: Bearer token123" https://api.example.com/users

# GET specific user
curl -H "Authorization: Bearer token123" https://api.example.com/users/123

# POST create new user
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer token123" \
     -d '{"name":"John Doe","email":"john@example.com","age":30}' \
     https://api.example.com/users

# PUT update user
curl -X PUT \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer token123" \
     -d '{"name":"Jane Doe","age":31}' \
     https://api.example.com/users/123

# DELETE user
curl -X DELETE \
     -H "Authorization: Bearer token123" \
     https://api.example.com/users/123

# PATCH partial update
curl -X PATCH \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer token123" \
     -d '{"status":"active"}' \
     https://api.example.com/users/123
```

#### GraphQL API
```bash
# GraphQL query
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"query":"{ user(id: 123) { name email } }"}' \
     https://api.example.com/graphql

# GraphQL with variables
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{
       "query": "query GetUser($id: ID!) { user(id: $id) { name email } }",
       "variables": {"id": "123"}
     }' \
     https://api.example.com/graphql
```

#### API Pagination and Filtering
```bash
# Paginated results
curl "https://api.example.com/users?page=1&limit=50"

# Filtering and sorting
curl "https://api.example.com/users?status=active&sort=name"

# Date range filtering
curl "https://api.example.com/logs?start_date=2024-01-01&end_date=2024-01-31"

# Complex query parameters
curl "https://api.example.com/search?q=linux&type=article&limit=10&offset=20"
```

### System Administration

#### Health Monitoring
```bash
# Check service health
curl -f -s -o /dev/null -w "%{http_code}" https://api.example.com/health

# Check multiple services
for url in "https://api.example.com" "https://db.example.com" "https://cache.example.com"; do
    if curl -f -s -o /dev/null "$url/health"; then
        echo "✓ $url is healthy"
    else
        echo "✗ $url is unhealthy"
    fi
done

# Check SSL certificate expiry
curl -I https://example.com 2>&1 | awk '/expire date/ {print $4,$5,$6}'
```

#### Log Collection
```bash
# Download logs with authentication
curl -u admin:password -O https://logs.example.com/access.log

# Download logs from specific date range
curl -u admin:password -o access_$(date +%Y%m%d).log \
     "https://logs.example.com/access?date=$(date +%Y-%m-%d)"

# Stream logs in real-time
curl -u admin:password "https://logs.example.com/stream?follow=true"
```

#### Configuration Management
```bash
# Download configuration file
curl -s -o /etc/app/config.json https://config.example.com/app-config.json

# Upload configuration
curl -X PUT -u api:token -T config.json https://config.example.com/apps/123

# Backup configurations
for app in $(curl -s -H "Authorization: Bearer token" https://config.example.com/apps | jq -r '.[].name'); do
    curl -s -H "Authorization: Bearer token" -o "backup_${app}_$(date +%Y%m%d).json" \
         "https://config.example.com/apps/${app}/config"
done
```

### File Management and Distribution

#### Batch Downloads
```bash
# Download multiple files from list
while read url; do
    curl -O "$url"
done < urls.txt

# Download with URL pattern expansion
curl -O "https://data.example.com/reports/2024/q{1,2,3,4}/report.json"

# Parallel downloads with GNU parallel
cat urls.txt | parallel -j 4 curl -O {}

# Download with retry logic
curl --retry 3 --retry-delay 5 --retry-max-time 60 -O https://example.com/file.zip
```

#### Cloud Storage Operations
```bash
# Upload to S3 (with signature)
curl -X PUT -T file.txt \
     -H "Authorization: AWS4-HMAC-SHA256 ..." \
     -H "Content-Type: application/octet-stream" \
     "https://s3.amazonaws.com/bucket/file.txt"

# Upload to Google Cloud Storage
curl -X PUT -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: image/jpeg" \
     --data-binary @photo.jpg \
     "https://storage.googleapis.com/my-bucket/photo.jpg"

# Download from Azure Blob Storage
curl -H "Authorization: Bearer $AZURE_TOKEN" \
     -o downloaded-file.txt \
     "https://myaccount.blob.core.windows.net/container/file.txt"
```

### Web Scraping and Data Collection

#### Content Extraction
```bash
# Save HTML page
curl -s -o page.html https://example.com/article

# Follow redirects and save final page
curl -L -s -o final_page.html https://shortened-url.com/abc

# Extract specific elements with post-processing
curl -s https://example.com | grep -o '<title>[^<]*' | sed 's/<title>//'

# Download images from page
curl -s https://example.com | grep -o 'src="[^"]*\.jpg"' | cut -d'"' -f2 | \
    xargs -I {} curl -O "https://example.com{}"
```

#### API Data Collection
```bash
# Collect weather data
curl -s "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=London" \
     | jq '.current'

# Collect cryptocurrency prices
curl -s "https://api.coindesk.com/v1/bpi/currentprice.json" | jq '.bpi'

# Batch data collection
for coin in bitcoin ethereum litecoin; do
    curl -s "https://api.coingecko.com/api/v3/simple/price?ids=$coin&vs_currencies=usd" \
         | jq -r ".$coin.usd"
done
```

### Authentication and Security Testing

#### OAuth Flow
```bash
# Get authorization code
curl -X GET \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "redirect_uri=https://yourapp.com/callback" \
     -d "response_type=code" \
     -d "scope=read write" \
     https://oauth.example.com/authorize

# Exchange code for access token
curl -X POST \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=AUTHORIZATION_CODE" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=https://yourapp.com/callback" \
     https://oauth.example.com/token

# Use access token
curl -H "Authorization: Bearer ACCESS_TOKEN" \
     https://api.example.com/protected
```

#### JWT Token Handling
```bash
# Decode JWT header
curl -s -H "Authorization: Bearer $TOKEN" https://api.example.com | \
    jq -R 'split(".") | .[0] | @base64d | fromjson'

# Refresh token
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"refresh_token":"REFRESH_TOKEN"}' \
     https://auth.example.com/refresh
```

## Automation and Scripting

### Download Manager Script
```bash
#!/bin/bash
# robust_downloader.sh - Robust file downloader with resume and retry

URL="$1"
OUTPUT="$2"
MAX_RETRIES=3
RETRY_DELAY=5

if [ -z "$URL" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: $0 <URL> <output_file>"
    exit 1
fi

for ((i=1; i<=MAX_RETRIES; i++)); do
    echo "Attempt $i: Downloading $URL -> $OUTPUT"

    if curl -L -C - --retry 3 --retry-delay 2 \
           --connect-timeout 10 --max-time 300 \
           -o "$OUTPUT" "$URL"; then
        echo "Download completed successfully"
        exit 0
    else
        echo "Download failed (attempt $i/$MAX_RETRIES)"
        if [ $i -lt $MAX_RETRIES ]; then
            echo "Retrying in $RETRY_DELAY seconds..."
            sleep $RETRY_DELAY
        fi
    fi
done

echo "Download failed after $MAX_RETRIES attempts"
exit 1
```

### API Test Suite
```bash
#!/bin/bash
# api_test_suite.sh - Comprehensive API testing

BASE_URL="https://api.example.com"
API_TOKEN="your-api-token"
TEST_RESULTS="test_results_$(date +%Y%m%d_%H%M%S).json"

# Function to make authenticated API call
api_call() {
    local method="$1"
    local endpoint="$2"
    local data="$3"

    curl -s -w '%{http_code}' \
         -X "$method" \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer $API_TOKEN" \
         -d "$data" \
         "$BASE_URL$endpoint"
}

# Function to run test case
run_test() {
    local test_name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected_status="$5"

    echo "Running test: $test_name"

    response=$(api_call "$method" "$endpoint" "$data")
    status_code="${response: -3}"
    response_body="${response%???}"

    if [ "$status_code" -eq "$expected_status" ]; then
        echo "✓ PASS - $test_name"
        echo "{\"test\":\"$test_name\",\"status\":\"PASS\",\"response\":$response_body}" >> "$TEST_RESULTS"
    else
        echo "✗ FAIL - $test_name (Expected: $expected_status, Got: $status_code)"
        echo "{\"test\":\"$test_name\",\"status\":\"FAIL\",\"expected\":$expected_status,\"actual\":$status_code,\"response\":$response_body}" >> "$TEST_RESULTS"
    fi
}

# Test cases
echo "[" > "$TEST_RESULTS"

run_test "Get All Users" "GET" "/users" "" "200"
run_test "Create User" "POST" "/users" '{"name":"Test User","email":"test@example.com"}' "201"
run_test "Get Specific User" "GET" "/users/1" "" "200"
run_test "Update User" "PUT" "/users/1" '{"name":"Updated User"}' "200"
run_test "Invalid User" "GET" "/users/999999" "" "404"

echo "]" >> "$TEST_RESULTS"

echo "Test completed. Results saved to $TEST_RESULTS"
```

### Health Monitoring Script
```bash
#!/bin/bash
# health_monitor.sh - Multi-service health monitoring

SERVICES=(
    "https://api.example.com:health"
    "https://db.example.com:3306/status"
    "https://cache.example.com:6379/ping"
    "https://queue.example.com:5672/health"
)

SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

check_service() {
    local url="$1"
    local service_name=$(echo "$url" | sed 's|https://||' | sed 's|:.*||')

    if curl -f -s -o /dev/null --max-time 10 "$url"; then
        echo "✓ $service_name is healthy"
        return 0
    else
        echo "✗ $service_name is unhealthy"
        return 1
    fi
}

send_alert() {
    local message="$1"
    curl -X POST \
         -H 'Content-type: application/json' \
         -d "{\"text\":\"🚨 Service Alert: $message\"}" \
         "$SLACK_WEBHOOK"
}

# Check all services
unhealthy_services=()
for service in "${SERVICES[@]}"; do
    if ! check_service "$service"; then
        service_name=$(echo "$service" | sed 's|https://||' | sed 's|:.*||')
        unhealthy_services+=("$service_name")
    fi
done

# Send alert if services are unhealthy
if [ ${#unhealthy_services[@]} -gt 0 ]; then
    alert_message="Unhealthy services detected: ${unhealthy_services[*]}"
    echo "Sending alert: $alert_message"
    send_alert "$alert_message"
else
    echo "All services are healthy"
fi
```

### Backup Automation Script
```bash
#!/bin/bash
# backup_automation.sh - Automated backup with remote upload

BACKUP_DIRS=("/home/user/documents" "/etc" "/var/log")
BACKUP_DEST="s3://backup-bucket/$(date +%Y-%m-%d)"
TEMP_DIR="/tmp/backups"
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).tar.gz"

# Create backup
echo "Creating backup..."
mkdir -p "$TEMP_DIR"
tar -czf "$TEMP_DIR/$BACKUP_FILE" "${BACKUP_DIRS[@]}"

# Upload to cloud storage
echo "Uploading to cloud storage..."
curl -X PUT \
     -H "Authorization: Bearer $(aws s3 cp - | jq -r '.token')" \
     -T "$TEMP_DIR/$BACKUP_FILE" \
     "$BACKUP_DEST/$BACKUP_FILE"

# Cleanup
echo "Cleaning up..."
rm -f "$TEMP_DIR/$BACKUP_FILE"

echo "Backup completed successfully: $BACKUP_FILE"
```

## Performance Testing and Benchmarking

### HTTP Performance Testing
```bash
# Time connection establishment
curl -w "Time to connect: %{time_connect}s\n" \
     -o /dev/null -s https://example.com

# Full request timing breakdown
curl -w "DNS: %{time_namelookup}s | Connect: %{time_connect}s | " \
        "App Connect: %{time_appconnect}s | Pretransfer: %{time_pretransfer}s | " \
        "Redirect: %{time_redirect}s | Start: %{time_starttransfer}s | " \
        "Total: %{time_total}s\n" \
     -o /dev/null -s https://api.example.com/data

# Download speed test
curl -w "Downloaded: %{size_download} bytes in %{time_total}s " \
        "(Speed: %{speed_download} bytes/sec)\n" \
     -o /dev/null -s https://example.com/largefile

# Upload speed test
dd if=/dev/zero of=/tmp/testfile bs=1M count=100
curl -w "Uploaded: %{size_upload} bytes in %{time_total}s " \
        "(Speed: %{speed_upload} bytes/sec)\n" \
     -T /tmp/testfile https://upload.example.com/upload
rm -f /tmp/testfile
```

### Concurrent Testing
```bash
# Concurrent connections (using parallel)
seq 1 10 | parallel -j 10 curl -s -o /dev/null -w "%{http_code}\n" https://api.example.com

# Load testing with different endpoints
endpoints=(
    "/users"
    "/products"
    "/orders"
    "/search"
)

for endpoint in "${endpoints[@]}"; do
    echo "Testing $endpoint..."
    for i in {1..5}; do
        time curl -s -o /dev/null "https://api.example.com$endpoint"
    done
done
```

## Troubleshooting and Debugging

### Verbose Mode and Tracing
```bash
# Verbose output for debugging
curl -v https://problematic-site.com

# Trace all network traffic
curl --trace trace.log https://api.example.com

# Trace with timestamps
curl --trace-ascii trace.log --trace-time https://api.example.com

# Trace specific request
curl -v -H "Custom-Header: value" -d "data=example" https://api.example.com
```

### Common Issues and Solutions

#### SSL Certificate Problems
```bash
# Certificate verification failed
curl: (60) SSL certificate problem
# Solution: Check certificate or use -k for testing

# Certificate chain incomplete
curl: (35) SSL connect error
# Solution: Use --cacert to specify CA certificate

# Self-signed certificate
curl -k https://self-signed.example.com  # For testing only
# Better: Install proper CA certificate
curl --cacert custom-ca.pem https://self-signed.example.com
```

#### Connection and Timeout Issues
```bash
# Connection timeout
curl: (28) Operation timed out
# Solution: Increase timeout or check network connectivity
curl --connect-timeout 30 --max-time 300 https://slow-server.com

# DNS resolution failure
curl: (6) Could not resolve host
# Solution: Check DNS settings or use IP directly
curl --dns-servers 8.8.8.8,8.8.4.4 https://api.example.com

# Connection refused
curl: (7) Failed to connect
# Solution: Check if service is running on target port
```

#### HTTP Error Codes
```bash
# 404 Not Found - URL doesn't exist
curl: (22) The requested URL returned error: 404

# 403 Forbidden - Authentication required
curl: (22) The requested URL returned error: 403
# Solution: Add authentication headers
curl -H "Authorization: Bearer token" https://api.example.com

# 429 Too Many Requests - Rate limiting
curl: (22) The requested URL returned error: 429
# Solution: Add delays or reduce request frequency
sleep 1
curl https://api.example.com

# 500 Server Error - Server-side problem
# Solution: Check server logs or try again later
```

### Performance Bottleneck Analysis
```bash
# Analyze where time is spent
curl -w "@format.txt" -o /dev/null -s https://api.example.com

# format.txt contents:
#       time_namelookup:  %{time_namelookup}\n
#          time_connect:  %{time_connect}\n
#       time_appconnect:  %{time_appconnect}\n
#      time_pretransfer:  %{time_pretransfer}\n
#         time_redirect:  %{time_redirect}\n
#    time_starttransfer:  %{time_starttransfer}\n
#                        ----------\n
#           time_total:  %{time_total}\n

# Memory usage monitoring
/usr/bin/time -v curl -O https://example.com/largefile.zip
```

## Integration with Other Tools

### Data Processing Pipelines
```bash
# Download and process JSON data
curl -s https://api.example.com/data | jq '.[] | select(.status=="active")'

# Download CSV and process with awk
curl -s https://data.example.com/export.csv | awk -F, '$3 > 1000'

# Download XML and extract with grep
curl -s https://data.example.com/feed.xml | grep -o '<title>[^<]*'

# Download and extract with tar
curl -s https://releases.example.com/package.tar.gz | tar -xz
```

### Monitoring and Alerting
```bash
# Integrate with Prometheus
curl -s http://metrics.example.com/metrics | grep 'http_requests_total'

# Send metrics to InfluxDB
curl -i -XPOST 'http://influxdb:8086/write?db=metrics' \
     --data-binary 'curl_requests,host=server1 value=42'

# Alert via email
if ! curl -f -s https://api.example.com/health; then
    curl -X POST \
         -H 'Content-Type: application/json' \
         -d '{"personalizations":[{"to":[{"email":"admin@example.com"}],"subject":"Service Alert"}],"from":{"email":"monitor@example.com"},"content":[{"type":"text/plain","value":"Service is down!"}]}' \
         https://api.sendgrid.com/v3/mail/send
fi
```

## Best Practices

1. **Always use HTTPS** for secure communications unless specifically testing HTTP
2. **Validate SSL certificates** in production environments (avoid -k)
3. **Use appropriate timeouts** for production scripts to prevent hanging
4. **Handle errors properly** by checking exit codes and response codes
5. **Rate limit requests** when working with external APIs
6. **Use user authentication** instead of passing credentials in URLs
7. **Specify content types** explicitly when posting data
8. **Use proper HTTP methods** (GET for retrieval, POST for creation, etc.)
9. **Test with -v (verbose)** during development to understand request/response flow
10. **Cache responses** when appropriate to reduce load on target servers
11. **Use proper User-Agent** strings to identify your client
12. **Follow redirects** with -L when appropriate
13. **Implement retry logic** for unreliable connections
14. **Use appropriate data encoding** for special characters
15. **Monitor response sizes** to prevent unexpected large downloads

## Performance Tips

1. **Use --compressed** to reduce bandwidth usage
2. **Enable HTTP/2** with curl 7.47.0+ for multiplexing benefits
3. **Use persistent connections** for multiple requests to same host
4. **Implement connection pooling** in applications using libcurl
5. **Choose appropriate timeout values** based on network conditions
6. **Use DNS caching** to avoid repeated DNS lookups
7. **Optimize buffer sizes** with --buffer-size for specific use cases
8. **Disable unnecessary features** like progress bars in scripts
9. **Use range requests** for partial content downloads
10. **Implement parallel downloads** for multiple independent files
11. **Profile performance** with -w and appropriate timing variables
12. **Consider using a local caching proxy** for repeated requests
13. **Use appropriate compression levels** for upload data
14. **Minimize header overhead** by sending only necessary headers
15. **Batch multiple operations** when the API supports it

The `curl` command is an exceptionally versatile and powerful tool that has become indispensable for modern web development, system administration, and automation workflows. Its extensive protocol support, rich feature set, and reliable performance make it the go-to solution for virtually any URL-based data transfer task. Mastering curl's numerous options and capabilities enables developers and administrators to efficiently interact with web services, automate complex workflows, diagnose network issues, and build robust automation systems.