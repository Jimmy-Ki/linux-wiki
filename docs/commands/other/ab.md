---
title: ab - Apache HTTP Server Benchmarking Tool
sidebar_label: ab
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ab - Apache HTTP Server Benchmarking Tool

The `ab` command (Apache Benchmark) is a powerful web server benchmarking tool that provides comprehensive performance testing capabilities for HTTP servers. It simulates multiple concurrent users making HTTP requests to a web server, generating detailed performance statistics including requests per second, connection times, response times, and throughput metrics. Originally part of the Apache HTTP Server project, `ab` is widely used for load testing, capacity planning, performance optimization, and stress testing of web applications and APIs. Its lightweight design and rich feature set make it an essential tool for web developers, system administrators, and DevOps engineers.

## Installation

```bash
# Ubuntu/Debian
sudo apt-get install apache2-utils

# CentOS/RHEL/Fedora
sudo yum install httpd-tools
# or
sudo dnf install httpd-tools

# macOS (using Homebrew)
brew install apache2

# Compile from source
wget https://downloads.apache.org/httpd/httpd-2.4.58.tar.gz
tar xzf httpd-2.4.58.tar.gz
cd httpd-2.4.58
./configure
make ab
sudo make install
```

## Basic Syntax

```bash
ab [options] [http[s]://]hostname[:port]/path
```

## Common Options

### Request Control
- `-n NUM` - Number of requests to perform
- `-c CONCURRENCY` - Number of multiple requests to make at a time
- `-t TIMELIMIT` - Maximum seconds to spend on benchmarking
- `-b WINDOWSIZ` - Size of TCP send/receive buffer (bytes)

### Authentication
- `-A username:password` - Basic authentication credentials
- `-p POSTFILE` - File containing POST data
- `-u PUTFILE` - File containing PUT data
- `-T content-type` - Content-type header for POST/PUT data

### HTTP Options
- `-H custom-header` - Add custom header to request
- `-C cookie-name=value` - Add cookie to request
- `-k` - Enable HTTP KeepAlive feature
- `-i` - Use HEAD instead of GET
- `-X proxy[:port]` - Use a proxy server

### Output Control
- `-v verbosity` - Set verbosity level (1-4)
- `-w` - Print results in HTML tables
- `-x <table>-attributes` - Attributes for HTML table
- `-y <tr>-attributes` - Attributes for HTML table row
- `-z <td>-attributes` - Attributes for HTML table cell
- `-g gnuplot-file` - Write measured data to gnuplot format file
- `-e CSV-file` - Write percentages to CSV file

### Connection Options
- `-r` - Don't exit on socket receive errors
- `-h` - Display usage information
- `-Z ciphersuite` - Specify SSL/TLS cipher suite
- `-f protocol` - Specify SSL/TLS protocol
- `-P proxy-auth-username:password` - Proxy authentication credentials

## Usage Examples

### Basic Benchmarking

#### Simple GET Request Testing
```bash
# Basic benchmark with 1000 requests
ab -n 1000 http://localhost/

# Test with 50 concurrent connections
ab -n 1000 -c 50 http://example.com/

# Test specific page
ab -n 500 -c 10 https://example.com/api/users

# Test for 60 seconds duration
ab -t 60 -c 20 http://localhost/

# Test with unlimited requests for 30 seconds
ab -t 30 -n 99999 http://example.com/
```

#### Concurrent User Testing
```bash
# Simulate 100 concurrent users
ab -n 10000 -c 100 http://localhost/

# Gradual load testing (multiple runs)
for users in 10 25 50 100 200; do
    echo "Testing with $users concurrent users:"
    ab -n 2000 -c $users http://localhost/
    echo "---"
done

# Stress test with high concurrency
ab -n 50000 -c 500 http://example.com/
```

### Authentication and Security Testing

#### Basic Authentication
```bash
# Test with username and password
ab -n 1000 -c 20 -A admin:password http://localhost/admin/

# Test protected API endpoint
ab -n 500 -c 10 -A apiuser:apikey https://api.example.com/v1/data

# Test with custom headers
ab -n 1000 -c 20 -H "Authorization: Bearer token123" http://localhost/api/
```

#### SSL/TLS Testing
```bash
# Test HTTPS endpoint
ab -n 1000 -c 20 https://secure.example.com/

# Test with specific TLS version
ab -n 500 -c 10 -f TLS1.2 https://secure.example.com/

# Test with specific cipher suite
ab -n 500 -c 10 -Z ECDHE-RSA-AES256-GCM-SHA384 https://secure.example.com/
```

### POST and PUT Request Testing

#### POST Data Testing
```bash
# Create POST data file
cat > postdata.json << EOF
{
    "username": "testuser",
    "email": "test@example.com",
    "action": "login"
}
EOF

# Send POST requests
ab -n 1000 -c 20 -p postdata.json -T "application/json" http://localhost/api/login

# POST form data
cat > formdata.txt << EOF
field1=value1&field2=value2&submit=Submit
EOF

ab -n 500 -c 10 -p formdata.txt -T "application/x-www-form-urlencoded" http://localhost/form
```

#### PUT Request Testing
```bash
# Create PUT data file
cat > putdata.json << EOF
{
    "id": 123,
    "name": "Updated Product",
    "price": 99.99
}
EOF

# Send PUT requests
ab -n 200 -c 5 -u putdata.json -T "application/json" http://localhost/api/products/123

# Upload file via PUT
cat > filecontent.txt << EOF
This is the file content to upload.
EOF

ab -n 10 -c 2 -u filecontent.txt -T "text/plain" http://localhost/upload/file.txt
```

### Advanced Testing Scenarios

#### API Testing
```bash
# Test REST API endpoints
ab -n 1000 -c 50 -H "Content-Type: application/json" http://localhost/api/users

# Test with JSON payload
cat > user.json << EOF
{"name": "John Doe", "email": "john@example.com"}
EOF

ab -n 500 -c 25 -p user.json -T "application/json" http://localhost/api/users

# Test pagination
ab -n 200 -c 10 "http://localhost/api/products?page=1&limit=20"

# Test with query parameters
ab -n 1000 -c 30 "http://localhost/api/search?q=linux&limit=10"
```

#### Cookie and Session Testing
```bash
# Test with session cookie
ab -n 1000 -c 20 -C "sessionid=abc123" http://localhost/protected/

# Test with multiple cookies
ab -n 500 -c 10 -C "sessionid=abc123" -C "prefs=theme=dark" http://localhost/

# Test authentication cookie
ab -n 200 -c 5 -C "auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" http://localhost/api/
```

#### Proxy Testing
```bash
# Test through HTTP proxy
ab -n 1000 -c 20 -X proxy.example.com:8080 http://example.com/

# Test with proxy authentication
ab -n 500 -c 10 -X proxy.example.com:8080 -P user:pass http://example.com/

# Test through SOCKS proxy
ab -n 200 -c 5 -X socks5://proxy.example.com:1080 http://example.com/
```

## Performance Testing

### Load Testing Strategies

#### Baseline Testing
```bash
# Establish baseline performance
echo "Establishing baseline..."
ab -n 1000 -c 1 http://localhost/ > baseline.txt

# Test with increasing load
for concurrency in 1 5 10 25 50; do
    echo "Testing with $concurrency concurrent connections:"
    ab -n 2000 -c $concurrency http://localhost/ | grep "Requests per second"
done
```

#### Capacity Planning
```bash
#!/bin/bash
# Capacity planning script

URL="http://localhost/"
RESULTS="capacity_test_$(date +%Y%m%d_%H%M%S).csv"

# CSV header
echo "Concurrency,Requests_per_sec,Time_per_request,Failed_reqs" > $RESULTS

# Test different concurrency levels
for c in 1 2 5 10 20 50 100 200; do
    echo "Testing with $c concurrent connections..."

    # Run benchmark and extract key metrics
    result=$(ab -n 5000 -c $c $URL 2>/dev/null)

    rps=$(echo "$result" | grep "Requests per second" | awk '{print $4}')
    tpr=$(echo "$result" | grep "Time per request" | head -1 | awk '{print $4}')
    failed=$(echo "$result" | grep "Failed requests" | awk '{print $3}')

    echo "$c,$rps,$tpr,$failed" >> $RESULTS
    echo "Results: $rps req/sec, $tpr ms/req, $failed failed"
done

echo "Results saved to $RESULTS"
```

#### Stress Testing
```bash
# Stress test to find breaking point
#!/bin/bash

URL="http://localhost/"
MAX_CONCURRENCY=1000
STEP=50

echo "Starting stress test for $URL"

for ((c=$STEP; c<=$MAX_CONCURRENCY; c+=$STEP)); do
    echo "Testing with $c concurrent connections..."

    if ab -n 10000 -c $c $URL 2>/dev/null; then
        echo "Success with $c connections"
    else
        echo "Failed at $c connections - breaking point reached"
        break
    fi
done
```

### Benchmarking Multiple Endpoints

#### Comparative Testing
```bash
#!/bin/bash
# Compare performance of different endpoints

ENDPOINTS=(
    "http://localhost/api/users"
    "http://localhost/api/products"
    "http://localhost/api/orders"
    "http://localhost/static/index.html"
)

for endpoint in "${ENDPOINTS[@]}"; do
    echo "Testing $endpoint"
    ab -n 2000 -c 50 $endpoint | grep -E "(Requests per second|Time per request|Failed requests)"
    echo "---"
done
```

#### A/B Testing
```bash
# Compare two different server configurations
SERVER_A="http://server-a.example.com/"
SERVER_B="http://server-b.example.com/"

echo "Testing Server A"
ab -n 5000 -c 100 $SERVER_A > server_a_results.txt

echo "Testing Server B"
ab -n 5000 -c 100 $SERVER_B > server_b_results.txt

# Extract and compare key metrics
echo "Comparison Results:"
echo "Server A RPS: $(grep 'Requests per second' server_a_results.txt | awk '{print $4}')"
echo "Server B RPS: $(grep 'Requests per second' server_b_results.txt | awk '{print $4}')"
```

## Output Analysis

### Result Interpretation

#### Understanding ab Output
```bash
# Example ab output interpretation
ab -n 1000 -c 50 http://localhost/

# Key metrics to analyze:
# 1. Server Software - Web server type and version
# 2. Server Hostname - Target server
# 3. Server Port - Connection port
# 4. Document Path - Tested URL path
# 5. Document Length - Response size in bytes
# 6. Concurrency Level - Number of simultaneous connections
# 7. Time taken - Total test duration
# 8. Complete requests - Successful requests
# 9. Failed requests - Unsuccessful requests
# 10. Requests per second - Throughput metric
# 11. Time per request - Average response time
# 12. Transfer rate - Data transfer speed
```

#### Custom Report Generation
```bash
#!/bin/bash
# Generate custom performance report

URL=$1
REQUESTS=${2:-5000}
CONCURRENCY=${3:-100}

if [ -z "$URL" ]; then
    echo "Usage: $0 <URL> [requests] [concurrency]"
    exit 1
fi

REPORT="performance_report_$(date +%Y%m%d_%H%M%S).txt"

{
    echo "Performance Report"
    echo "=================="
    echo "URL: $URL"
    echo "Date: $(date)"
    echo "Requests: $REQUESTS"
    echo "Concurrency: $CONCURRENCY"
    echo ""

    ab -n $REQUESTS -c $CONCURRENCY $URL

    echo ""
    echo "System Information"
    echo "------------------"
    echo "CPU Info:"
    lscpu | grep -E "(Model name|CPU\(s\)|Thread)"
    echo ""
    echo "Memory Info:"
    free -h
    echo ""
    echo "Network Info:"
    ss -tuln | head -10

} > $REPORT

echo "Report saved to $REPORT"
```

### Data Export and Visualization

#### CSV Export for Analysis
```bash
# Export results to CSV for spreadsheet analysis
ab -n 5000 -c 100 -e performance.csv http://localhost/

# Generate multiple data points
for c in 10 25 50 100 200; do
    ab -n 2000 -c $c -e perf_${c}.csv http://localhost/
done
```

#### Gnuplot Data Generation
```bash
# Generate data for Gnuplot visualization
ab -n 10000 -c 200 -g performance_data.txt http://localhost/

# Create simple Gnuplot script
cat > plot_performance.gp << EOF
set terminal png
set output 'performance_graph.png'
set title 'Web Server Performance'
set xlabel 'Request Number'
set ylabel 'Response Time (ms)'
plot 'performance_data.txt' using 2 with lines title 'Response Time'
EOF

# Generate graph (requires gnuplot)
gnuplot plot_performance.gp
```

## Integration and Automation

### Continuous Integration

#### CI/CD Pipeline Integration
```bash
#!/bin/bash
# Performance test for CI/CD pipeline

TARGET_URL=${1:-http://localhost:8080/}
MIN_RPS=${2:-100}
MAX_RESPONSE_TIME=${3:-500}

echo "Running performance test against $TARGET_URL"

# Run benchmark
RESULT=$(ab -n 1000 -c 50 $TARGET_URL 2>/dev/null)

# Extract metrics
RPS=$(echo "$RESULT" | grep "Requests per second" | awk '{print $4}')
RESPONSE_TIME=$(echo "$RESULT" | grep "Time per request" | head -1 | awk '{print $4}')
FAILED=$(echo "$RESULT" | grep "Failed requests" | awk '{print $3}')

echo "Performance Results:"
echo "- RPS: $RPS"
echo "- Response Time: ${RESPONSE_TIME}ms"
echo "- Failed Requests: $FAILED"

# Check against thresholds
if (( $(echo "$RPS < $MIN_RPS" | bc -l) )); then
    echo "ERROR: RPS ($RPS) below minimum threshold ($MIN_RPS)"
    exit 1
fi

if (( $(echo "$RESPONSE_TIME > $MAX_RESPONSE_TIME" | bc -l) )); then
    echo "ERROR: Response time ($RESPONSE_TIME) above maximum threshold ($MAX_RESPONSE_TIME)"
    exit 1
fi

echo "Performance test passed!"
```

#### Automated Performance Monitoring
```bash
#!/bin/bash
# Automated performance monitoring script

LOG_DIR="/var/log/performance"
TARGET_URL="http://localhost/"
RESULTS_FILE="$LOG_DIR/performance_$(date +%Y%m%d).log"

# Create log directory
mkdir -p $LOG_DIR

# Run performance test
{
    echo "=== $(date) ==="
    ab -n 2000 -c 50 $TARGET_URL | grep -E "(Requests per second|Time per request|Failed requests)"
    echo ""
} >> $RESULTS_FILE

# Alert on performance degradation
LATEST_RPS=$(tail -20 $RESULTS_FILE | grep "Requests per second" | tail -1 | awk '{print $4}')
if [ -n "$LATEST_RPS" ] && [ $(echo "$LATEST_RPS < 100" | bc -l) -eq 1 ]; then
    echo "ALERT: Performance degradation detected! RPS: $LATEST_RPS"
    # Send alert (email, Slack, etc.)
fi
```

### Scheduled Testing

#### Cron Job for Regular Testing
```bash
# Add to crontab for daily performance testing
# crontab -e

# Test every day at 2 AM
0 2 * * * /path/to/performance_test.sh

# Test every hour during business hours
0 9-17 * * 1-5 /path/to/performance_test.sh

# Test after deployment
@reboot /path/to/deployment_performance_test.sh
```

## Advanced Usage

### Custom Headers and Protocols

#### HTTP Header Testing
```bash
# Test with custom headers
ab -n 1000 -c 20 \
   -H "User-Agent: CustomAgent/1.0" \
   -H "Accept: application/json" \
   -H "X-API-Key: your-api-key" \
   http://localhost/api/

# Test caching behavior
ab -n 500 -c 10 -H "Cache-Control: no-cache" http://localhost/static/image.jpg

# Test compression
ab -n 1000 -c 50 -H "Accept-Encoding: gzip, deflate" http://localhost/

# Test mobile user agent
ab -n 2000 -c 100 -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" http://localhost/mobile/
```

#### HTTP Method Testing
```bash
# HEAD requests (testing response headers only)
ab -n 1000 -c 50 -i http://localhost/api/status

# Custom HTTP methods
ab -n 500 -c 10 -H "X-HTTP-Method-Override: PATCH" -p data.json http://localhost/api/resource

# OPTIONS requests
curl -X OPTIONS http://localhost/api/
```

### Session and State Testing

#### Persistent Connection Testing
```bash
# Test with KeepAlive enabled
ab -n 5000 -c 100 -k http://localhost/

# Test without KeepAlive
ab -n 5000 -c 100 http://localhost/

# Compare results
echo "With KeepAlive:"
ab -n 2000 -c 50 -k http://localhost/ | grep "Requests per second"

echo "Without KeepAlive:"
ab -n 2000 -c 50 http://localhost/ | grep "Requests per second"
```

#### Multi-Step Testing Scenarios
```bash
#!/bin/bash
# Simulate realistic user behavior

BASE_URL="http://localhost/"

# Step 1: Login and get session
LOGIN_RESPONSE=$(curl -s -X POST -d "username=user&password=pass" $BASE_URL/login)
SESSION_ID=$(echo "$LOGIN_RESPONSE" | grep -o 'session_id=[^;]*' | cut -d'=' -f2)

# Step 2: Browse pages with session
for page in "/home" "/products" "/about"; do
    echo "Testing $page with session"
    ab -n 200 -c 10 -C "session_id=$SESSION_ID" "$BASE_URL$page"
done

# Step 3: Logout
curl -s -X POST "$BASE_URL/logout?session_id=$SESSION_ID"
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Socket receive errors
# Solution: Use -r flag to continue on socket errors
ab -n 5000 -c 100 -r http://localhost/

# Timeouts and connection refused
# Solution: Check server status and configuration
systemctl status apache2  # or nginx, etc.
netstat -tuln | grep :80

# DNS resolution issues
# Solution: Use IP address directly
ab -n 1000 -c 20 http://127.0.0.1/
```

#### Performance Issues
```bash
# Slow performance due to client limitations
# Solution: Increase file descriptors limit
ulimit -n 65536

# Check system limits
ulimit -a

# Monitor system resources during test
htop &
iostat 1 &
ab -n 10000 -c 200 http://localhost/
```

#### SSL/TLS Issues
```bash
# SSL certificate verification failures
# Solution: Use appropriate SSL options
ab -n 1000 -c 20 -f TLS1.2 https://localhost/

# Self-signed certificates
# Solution: May need to adjust system certificate store
# or use ab2 with custom SSL configuration
```

### Debugging and Monitoring

#### Verbose Output
```bash
# Different verbosity levels
ab -v 1 -n 100 http://localhost/   # Basic info
ab -v 2 -n 100 http://localhost/   # Include headers
ab -v 3 -n 100 http://localhost/   # Include response codes
ab -v 4 -n 100 http://localhost/   # Full debugging info
```

#### Network Monitoring
```bash
# Monitor network traffic during test
tcpdump -i any -w test.pcap host localhost &
PID=$!

ab -n 5000 -c 100 http://localhost/

kill $PID
# Analyze test.pcap with Wireshark or tcpdump

# Monitor connections in real-time
ss -tuln | grep :80 &
watch -n 1 "ss -tuln | grep :80" &
ab -n 2000 -c 50 http://localhost/
```

## Related Commands

- [`curl`](/docs/commands/network/curl) - Command-line tool for transferring data with URLs
- [`wget`](/docs/commands/network/wget) - Network downloader to retrieve files from the web
- [`httping`](/docs/commands/network/httping) - Ping-like tool for HTTP requests
- [`siege`](/docs/commands/other/siege) - HTTP load testing and benchmarking utility
- [`jmeter`](/docs/commands/other/jmeter) - Open source load testing tool
- [`httperf`](/docs/commands/other/httperf) - Web server performance testing tool
- [`wrk`](/docs/commands/other/wrk) - Modern HTTP benchmarking tool
- [`hey`](/docs/commands/other/hey) - HTTP load testing tool
- [`apache2ctl`](/docs/commands/other/apache2ctl) - Apache HTTP Server control interface
- [`nginx`](/docs/commands/other/nginx) - High-performance web server

## Best Practices

1. **Start with baseline tests** - Establish performance benchmarks before optimization
2. **Use realistic concurrency levels** - Test with expected user load, not maximum possible
3. **Monitor system resources** - Watch CPU, memory, and network during tests
4. **Test from multiple locations** - Consider network latency and geographic distribution
5. **Use consistent test parameters** - Maintain same request count and data for comparison
6. **Warm up the server** - Run initial tests to cache content before actual measurement
7. **Test various content types** - Benchmark static files, dynamic content, and APIs separately
8. **Document test conditions** - Record server configuration, network conditions, and test parameters
9. **Use proper error handling** - Don't ignore failed requests in analysis
10. **Consider Keep-Alive effects** - Test both with and without persistent connections

## Performance Tips

1. **Test during off-peak hours** to avoid interference from production traffic
2. **Use local network** for pure server performance testing (eliminate network latency)
3. **Increase file descriptor limits** for high-concurrency tests (`ulimit -n 65536`)
4. **Monitor server logs** during tests to identify bottlenecks and errors
5. **Use multiple test runs** and average results for consistent measurements
6. **Test different HTTP methods** (GET, POST, PUT) as they may perform differently
7. **Consider SSL/TLS overhead** - test both HTTP and HTTPS separately
8. **Watch for network saturation** - ensure network bandwidth isn't the limiting factor
9. **Use realistic payload sizes** - test with actual data sizes your application uses
10. **Implement gradual load increases** to identify breaking points systematically

The `ab` command provides a reliable and straightforward approach to web server performance testing. Its integration with the Apache ecosystem and comprehensive output metrics make it an invaluable tool for ensuring web applications can handle expected traffic loads while maintaining optimal performance.