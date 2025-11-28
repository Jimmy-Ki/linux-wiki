---
title: host - DNS Lookup Utility
sidebar_label: host
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# host - DNS Lookup Utility

The `host` command is a simple and efficient DNS (Domain Name System) lookup utility that translates domain names to IP addresses and vice versa. It is part of the BIND utilities suite and provides a straightforward interface for querying DNS servers. Unlike `dig`, `host` offers a cleaner, more focused output format that's ideal for quick lookups, scripting, and troubleshooting DNS resolution issues. The command supports various DNS record types, can query specific DNS servers, and provides detailed information about DNS zones and records.

## Basic Syntax

```bash
host [OPTIONS] name [server]
```

## Common Options

### Query Options
- `-a` - Equivalent to `-v -t ANY` (verbose query for any record type)
- `-c CLASS` - Specify DNS query class (IN, CH, HS, etc.)
- `-C` - Display SOA records from authoritative servers
- `-d` - Equivalent to `-v` (verbose output)
- `-i` - Use IP6.INT for IPv6 reverse lookups
- `-l` - List all hosts in a domain (zone transfer)
- `-m` - Use memory mapping for zone transfer
- `-N N` - Set the number of dots for absolute names
- `-r` - Disable recursive processing
- `-R N` - Specify number of retries (default 1)
- `-T` - Use TCP connection instead of UDP
- `-t TYPE` - Specify query type (A, AAAA, MX, NS, SOA, TXT, etc.)
- `-v` - Verbose output
- `-W N` - Set wait time for replies (seconds)

### Output Options
- `-4` - Use IPv4 query transport only
- `-6` - Use IPv6 query transport only

## Usage Examples

### Basic DNS Queries

#### Forward Lookups (Domain to IP)
```bash
# Basic A record lookup
host google.com

# Lookup with verbose output
host -v example.com

# Query specific DNS server
host github.com 8.8.8.8

# Use Cloudflare DNS
host wikipedia.org 1.1.1.1

# Multiple domain lookups
host google.com facebook.com twitter.com
```

#### Reverse Lookups (IP to Domain)
```bash
# Reverse DNS lookup
host 8.8.8.8

# Reverse lookup with specific server
host 1.1.1.1 8.8.8.8

# IPv6 reverse lookup
host 2001:4860:4860::8888
```

### Specific Record Type Queries

#### Common Record Types
```bash
# Query A records (IPv4 addresses)
host -t A google.com

# Query AAAA records (IPv6 addresses)
host -t AAAA google.com

# Query MX records (mail servers)
host -t MX gmail.com

# Query NS records (name servers)
host -t NS google.com

# Query SOA records (start of authority)
host -t SOA google.com

# Query TXT records
host -t TXT google.com

# Query CNAME records
host -t CNAME mail.google.com

# Query ALL records
host -t ANY google.com

# Query PTR records (reverse)
host -t PTR 8.8.8.8
```

#### Advanced Record Types
```bash
# Query SRV records (services)
host -t SRV _http._tcp.google.com

# Query DNSKEY records (DNSSEC)
host -t DNSSEC google.com

# Query DS records (delegation signer)
host -t DS google.com

# Query NSEC records (authenticated denial of existence)
host -t NSEC nonexistent.google.com

# Query CAA records (certificate authority authorization)
host -t CAA google.com
```

### DNS Server Configuration

#### Using Specific DNS Servers
```bash
# Use Google DNS (8.8.8.8, 8.8.4.4)
host example.com 8.8.8.8
host example.com 8.8.4.4

# Use Cloudflare DNS (1.1.1.1, 1.0.0.1)
host example.com 1.1.1.1
host example.com 1.0.0.1

# Use OpenDNS (208.67.222.222, 208.67.220.220)
host example.com 208.67.222.222

# Use Quad9 DNS (9.9.9.9)
host example.com 9.9.9.9

# Use local DNS server
host example.com 192.168.1.1

# Use multiple servers for verification
host example.com 8.8.8.8 && host example.com 1.1.1.1
```

#### DNS Server Testing
```bash
# Test multiple DNS servers
for server in 8.8.8.8 1.1.1.1 208.67.222.222 9.9.9.9; do
    echo "Testing DNS server $server:"
    host google.com $server
    echo "---"
done

# Compare response times
time host google.com 8.8.8.8
time host google.com 1.1.1.1

# Test DNS server reliability
host -W 5 -R 3 slow-response-site.com 8.8.8.8
```

## Practical Examples

### Network Troubleshooting

#### DNS Resolution Issues
```bash
# Check basic DNS resolution
host problematic-domain.com

# Try different DNS servers
host problematic-domain.com 8.8.8.8
host problematic-domain.com 1.1.1.1

# Check specific record types
host -t A problematic-domain.com
host -t AAAA problematic-domain.com

# Verbose output for debugging
host -v problematic-domain.com

# Use TCP instead of UDP (bypasses some firewalls)
host -T problematic-domain.com

# Increase timeout for slow responses
host -W 10 problematic-domain.com
```

#### DNS Propagation Testing
```bash
# Test DNS propagation across servers
servers=("8.8.8.8" "1.1.1.1" "208.67.222.222" "9.9.9.9" "64.6.64.6")
domain="newly-configured-domain.com"

for server in "${servers[@]}"; do
    echo "DNS Server: $server"
    host $domain $server
    echo "------------------------"
done

# Check authoritative name servers
host -t NS $domain

# Verify SOA records
host -t SOA $domain

# Check for recent changes
host -v -t A $domain
```

#### Mail Server Configuration
```bash
# Check MX records for email delivery
host -t MX gmail.com
host -t MX outlook.com

# Verify mail server IPs
host -t A mx1.google.com
host -t A mx2.google.com

# Check SPF records (TXT)
host -t TXT google.com | grep "v=spf"

# Check DKIM records
host -t TXT selector1._domainkey.example.com

# Check DMARC records
host -t TXT _dmarc.example.com

# Test reverse DNS for mail servers
host 74.125.133.27  # Google mail server
```

### System Administration

#### DNS Server Maintenance
```bash
# Check authoritative information
host -C example.com

# List all hosts in domain (zone transfer)
host -l example.com ns1.example.com

# Get SOA serial numbers
host -t SOA example.com

# Check DNSSEC validation
host -t DNSSEC example.com

# Verify zone delegation
host -t NS subdomain.example.com

# Test DNS server response
host -v server.test.com 127.0.0.1
```

#### Network Discovery
```bash
# Find all A records for a domain
host -t A example.com

# Find all mail servers
host -t MX example.com

# Find name servers
host -t NS example.com

# Get all available records
host -t ANY example.com

# Discover related domains
host -t PTR ip-address

# Check for CNAME chains
host -v cname.example.com
```

### Security and Verification

#### DNS Security Checks
```bash
# Check for DNSSEC support
host -t DNSSEC secure-domain.com

# Verify DNSKEY records
host -t DNSKEY secure-domain.com

# Check DS records
host -t DS secure-domain.com

# Look for NSEC/NSEC3 records
host -t NSEC secure-domain.com

# Verify CAA records for HTTPS
host -t CAA bank.com

# Check for SPF records
host -t TXT domain.com | grep spf
```

#### Certificate Verification
```bash
# Check CAA records before certificate issuance
host -t CAA example.com

# Verify DKIM configuration
host -t TXT selector1._domainkey.example.com

# Check DMARC policy
host -t TXT _dmarc.example.com

# Verify BIMI records (Brand Indicators for Message Identification)
host -t TXT _bimi.example.com
```

### Automation and Scripting

#### Batch DNS Lookups
```bash
#!/bin/bash
# Batch domain resolver

domains=("google.com" "facebook.com" "twitter.com" "linkedin.com")
output_file="dns_results.txt"

echo "DNS Lookup Results - $(date)" > "$output_file"
echo "================================" >> "$output_file"

for domain in "${domains[@]}"; do
    echo "Domain: $domain" >> "$output_file"
    host -t A "$domain" >> "$output_file"
    host -t AAAA "$domain" >> "$output_file"
    echo "---" >> "$output_file"
done

echo "Results saved to $output_file"
```

#### DNS Health Monitor
```bash
#!/bin/bash
# DNS server health monitor

domains=("google.com" "cloudflare.com" "amazon.com")
dns_servers=("8.8.8.8" "1.1.1.1")

while true; do
    echo "$(date): DNS Health Check"

    for domain in "${domains[@]}"; do
        for server in "${dns_servers[@]}"; do
            if host -W 3 "$domain" "$server" >/dev/null 2>&1; then
                echo "✓ $domain via $server: OK"
            else
                echo "✗ $domain via $server: FAILED"
            fi
        done
    done

    echo "------------------------"
    sleep 300  # Check every 5 minutes
done
```

#### DNS Change Detection
```bash
#!/bin/bash
# Monitor DNS changes

domain="example.com"
previous_ip=""

while true; do
    current_ip=$(host -t A "$domain" | awk '{print $NF}')

    if [ "$current_ip" != "$previous_ip" ]; then
        if [ -n "$previous_ip" ]; then
            echo "$(date): IP changed from $previous_ip to $current_ip"
            # Send notification
            mail -s "DNS Change Alert for $domain" admin@example.com <<EOF
The IP address for $domain has changed:
Old IP: $previous_ip
New IP: $current_ip
EOF
        fi
        previous_ip="$current_ip"
    fi

    sleep 60  # Check every minute
done
```

## Advanced Usage

### DNS Zone Transfers

#### Authorized Zone Transfers
```bash
# Complete zone transfer (requires authorization)
host -l example.com ns1.example.com

# Zone transfer with specific server
host -l example.com 192.168.1.10

# Use TCP for zone transfer
host -l -T example.com ns1.example.com

# Memory-mapped zone transfer for large zones
host -l -m example.com ns1.example.com
```

### DNS Debugging

#### Detailed Query Analysis
```bash
# Verbose query with all details
host -v -t A google.com

# Trace DNS resolution path
host -v -t A www.google.com

# Check SOA record details
host -v -t SOA google.com

# Query specific class (CH for chaos records)
host -c CH -t TXT version.bind ns1.google.com

# Disable recursion to test authoritative response
host -r domain.com authoritative-server.com
```

#### Network Protocol Testing
```bash
# Force TCP queries
host -T domain.com

# Use IPv4 only
host -4 domain.com

# Use IPv6 only
host -6 domain.com

# Custom timeout and retries
host -W 10 -R 5 slow-domain.com
```

## Troubleshooting

### Common Issues

#### DNS Resolution Failures
```bash
# Check if domain exists
host domain.com

# Try different DNS servers
host domain.com 8.8.8.8
host domain.com 1.1.1.1

# Check network connectivity
ping 8.8.8.8

# Verify DNS configuration
cat /etc/resolv.conf

# Test with increased timeout
host -W 10 domain.com

# Use TCP to bypass UDP issues
host -T domain.com
```

#### Slow DNS Responses
```bash
# Measure response time
time host domain.com

# Test different servers
time host domain.com 8.8.8.8
time host domain.com 1.1.1.1

# Check for DNS cache issues
# Flush DNS cache based on system:
# Linux: sudo systemctl restart systemd-resolved
# macOS: sudo dscacheutil -flushcache

# Check firewall rules
sudo iptables -L -n | grep 53
```

#### Zone Transfer Issues
```bash
# Check if zone transfer is allowed
host -t NS domain.com

# Test AXFR request
host -l domain.com ns1.domain.com

# Check server configuration
dig AXFR domain.com @ns1.domain.com

# Verify server allows transfers
named-checkconf /etc/named.conf
```

## Related Commands

- [`dig`](/docs/commands/networking/dig) - Domain Information Groper (advanced DNS utility)
- [`nslookup`](/docs/commands/networking/nslookup) - Interactive DNS query tool
- [`ping`](/docs/commands/networking/ping) - Network connectivity tester
- [`traceroute`](/docs/commands/networking/traceroute) - Network path tracer
- [`whois`](/docs/commands/networking/whois) - Domain registration information
- [`dnssec-keygen`](/docs/commands/networking/dnssec-keygen) - DNSSEC key generation
- [`named-checkconf`](/docs/commands/networking/named-checkconf) - BIND configuration checker

## Best Practices

1. **Use specific DNS servers** for consistent results when troubleshooting
2. **Prefer `dig` for complex queries** and `host` for simple lookups
3. **Always test with multiple DNS servers** to verify DNS changes
4. **Use TCP mode** (`-T`) when UDP is blocked or unreliable
5. **Set appropriate timeouts** (`-W`) for slow networks
6. **Query specific record types** instead of using `-t ANY` when possible
7. **Check both IPv4 and IPv6** records when troubleshooting connectivity
8. **Use verbose mode** (`-v`) for debugging DNS resolution issues
9. **Monitor DNS propagation** after making changes
10. **Verify DNSSEC records** for security-sensitive domains

## Performance Tips

1. **Use caching DNS resolvers** like `dnsmasq` or `unbound` locally
2. **Choose nearby DNS servers** for faster response times
3. **Query specific record types** instead of `-t ANY` to reduce load
4. **Use TCP mode** sparingly as it's slower than UDP
5. **Batch queries** when checking multiple domains
6. **Set appropriate timeouts** to avoid long waits
7. **Use authoritative DNS servers** for the most accurate results
8. **Avoid zone transfers** unless necessary as they're resource-intensive

The `host` command provides a clean, efficient interface for DNS queries, making it an essential tool for network administrators, system administrators, and developers who need to troubleshoot DNS issues or verify domain configurations. Its simple output format and straightforward options make it ideal for both interactive use and automation scripts.