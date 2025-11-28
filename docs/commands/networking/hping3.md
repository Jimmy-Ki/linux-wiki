---
title: hping3 - Advanced Network Scanning and Packet Crafting Tool
sidebar_label: hping3
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# hping3 - Advanced Network Scanning and Packet Crafting Tool

The `hping3` command is a powerful network tool that allows you to send custom TCP/IP packets and display target replies. It's essentially a packet crafter that can be used for network scanning, firewall testing, performance testing, and network security auditing. Hping3 supports TCP, UDP, ICMP, and RAW-IP protocols, with a traceroute-like mode and the ability to send files between covered channels.

## Basic Syntax

```bash
hping3 [OPTIONS] [TARGET_HOST]
```

## Basic Modes

- **TCP Mode** (default) - Send TCP packets
- **UDP Mode** (-u) - Send UDP packets
- **ICMP Mode** (-1) - Send ICMP packets
- **Raw IP Mode** (--raw-ip) - Send raw IP packets

## Common Options

### Target and Interface Options
- `TARGET_HOST` - Destination host/IP address
- `-I INTERFACE` - Network interface to use
- `-S` - Set source IP address

### Protocol Selection
- `-0` - Raw IP mode
- `-1` - ICMP mode
- `-2` - UDP mode
- `-8` - SCAN mode (deprecated)
- `-9` - LISTEN mode (deprecated)

### TCP Options
- `-S` - SYN flag (used for stealth scans)
- `-A` - ACK flag
- `-R` - RST flag
- `-F` - FIN flag
- `-P` - PSH flag
- `-U` - URG flag
- `-X` - XMAS flag (FIN+URG+PSH)
- `-Y` - YMAS flag (FIN+PSH+URG)

### Port and Address Options
- `-p PORT` - Destination port
- `--source-port PORT` - Source port
- `--rand-source` - Random source IP address
- `--dstip IP` - Destination IP (overrides host)

### Packet Content Options
- `-d DATA_SIZE` - Data size
- `--data HEX_STRING` - Data in hex format
- `--file FILENAME` - Send file content
- `--sign SIGNATURE` - Add signature to packets

### Timing and Rate Options
- `-i MICROSECONDS` - Wait interval between packets
- `--fast` - Alias for -i u1000 (10 packets/second)
- `--faster` - Alias for -i u100 (100 packets/second)
- `--flood` - Flood mode: no delay between packets
- `--count COUNT` - Send specified number of packets

### Output and Display Options
- `-V` - Verbose mode
- `-c COUNT` - Packet count
- `-C` - Show TCP connection count
- `-q` - Quiet mode (doesn't show received packets)
- `-Q` - Quiet mode (doesn't show sent packets)
- `-z` - Bind CTRL+Z to time-to-live (TTL)
- `-Z` - Unbind CTRL+Z

### IP Options
- `-T TTL` - Time to live
- `-N IP_ID` - IP identification
- `-W WINDOW_SIZE` - Window size
- `-O IP_TYPE` - IP type of service
- `-M SEQUENCE` - TCP sequence number
- `-L ACK_NUMBER` - TCP ack number

## Usage Examples

### Basic Network Testing

#### Ping Alternative
```bash
# Basic ICMP ping
hping3 -1 192.168.1.1

# TCP ping (SYN to port 80)
hping3 -S -p 80 google.com

# UDP ping
hping3 -2 -p 53 8.8.8.8
```

#### Connectivity Testing
```bash
# Test HTTP connectivity
hping3 -S -p 80 -c 3 example.com

# Test HTTPS connectivity
hping3 -S -p 443 -c 3 example.com

# Test DNS connectivity
hping3 -2 -p 53 -c 3 8.8.8.8

# Test SMTP connectivity
hping3 -S -p 25 -c 3 mail.example.com
```

### Port Scanning

#### Basic TCP Port Scanning
```bash
# Scan single port
hping3 -S -p 80 -c 1 target.com

# Port scan with common ports
for port in 21 22 23 25 53 80 110 143 443 993 995; do
    hping3 -S -p $port -c 1 target.com 2>/dev/null
done

# Quick port range scan
hping3 -S -p ++1-1024 target.com

# Detailed port scan
hping3 -S -p 80 -c 1 -V target.com
```

#### SYN Scanning (Stealth)
```bash
# Stealth SYN scan
hping3 -S -p 80 -c 1 target.com

# SYN scan with source port 53 (DNS)
hping3 -S -p 22 --source-port 53 -c 1 target.com

# SYN scan with decoy
hping3 -S -p 80 --rand-source -c 1 target.com
```

#### UDP Port Scanning
```bash
# UDP port scan
hping3 -2 -p 53 -c 3 target.com

# UDP scan with data
hping3 -2 -p 161 --data "0x30100100" target.com
```

### Firewall and Security Testing

#### Firewall Enumeration
```bash
# Test firewall response to various TCP flags
hping3 -S -p 80 target.com    # SYN packet
hping3 -A -p 80 target.com    # ACK packet
hping3 -F -p 80 target.com    # FIN packet
hping3 -X -p 80 target.com    # XMAS scan

# Test ICMP filtering
hping3 -1 -c 3 target.com

# Test response to fragmented packets
hping3 --frag -S -p 80 -c 1 target.com
```

#### IDS/IPS Testing
```bash
# Test with packet fragmentation
hping3 --frag -d 100 -S -p 80 target.com

# Test with unusual TCP flags
hping3 -S -F -U -p 80 target.com

# Test flood resistance (use carefully)
hping3 --flood -S -p 80 target.com

# Test slowloris-style attack
hping3 --faster -S -p 80 target.com
```

### Network Performance Testing

#### Bandwidth Testing
```bash
# Test bandwidth with large packets
hping3 -2 -p 5000 -d 1024 --fast target.com

# Test with specific packet size
hping3 -S -p 80 -d 1400 target.com

# Rate-limited testing
hping3 -S -p 80 -i u5000 target.com
```

#### Latency and Jitter Testing
```bash
# Measure latency
hping3 -1 -c 10 target.com

# Measure TCP handshake time
hping3 -S -p 80 -c 10 target.com

# Detailed timing measurement
hping3 -V -c 10 target.com
```

### Advanced Scanning Techniques

#### Traceroute with hping3
```bash
# TCP traceroute to port 80
hping3 -S -p 80 ++1 target.com

# UDP traceroute
hping3 -2 -p 53 ++1 target.com

# ICMP traceroute
hping3 -1 ++1 target.com
```

#### Custom Packet Crafting
```bash
# Send custom TCP packet with data
hping3 -S -p 80 -d 50 --data "HTTP/1.1 GET /" target.com

# Send packet with specific sequence number
hping3 -S -p 80 -M 1000 -L 500 target.com

# Send packet with custom TTL
hping3 -S -p 80 -T 64 target.com

# Send packet with specific window size
hping3 -S -p 80 -W 8192 target.com
```

#### File Transfer Over covert channels
```bash
# Send file over ICMP
hping3 -1 --file secret.txt target.com

# Send file over UDP
hping3 -2 --file data.bin -p 9999 target.com

# Send encrypted data
hping3 -S -p 80 --data "$(cat encrypted.txt | xxd -p)" target.com
```

## Advanced Usage

### Complex Network Analysis

#### Network Discovery
```bash
# Discover hosts on network
hping3 -1 192.168.1.0/24

# Ping sweep with SYN packets
for i in $(seq 1 254); do
    hping3 -S -p 80 -c 1 192.168.1.$i &
done

# Quick network scan
hping3 --rand-source -S -p 80 192.168.1.0/24
```

#### Service Fingerprinting
```bash
# Test service responses
hping3 -S -p 22 -c 1 target.com 2>&1 | grep -i "flags"
hping3 -A -p 80 -c 1 target.com

# Banner grabbing with crafted packets
hping3 -S -p 80 -d 20 --data "GET / HTTP/1.0\r\n\r\n" target.com
```

### Penetration Testing

#### Firewall Bypassing
```bash
# Try different source ports
hping3 -S -p 80 --source-port 20 target.com
hping3 -S -p 80 --source-port 53 target.com
hping3 -S -p 80 --source-port 443 target.com

# Fragment packets
hping3 --frag -S -p 80 target.com

# Use uncommon flags
hping3 -F -p 80 target.com
hping3 -U -p 80 target.com
```

#### Denial of Service Testing
```bash
# SYN flood (CAUTION: Use only in authorized testing)
hping3 --flood -S -p 80 target.com

# UDP flood (CAUTION: Use only in authorized testing)
hping3 --flood -2 -p 53 target.com

# ICMP flood (CAUTION: Use only in authorized testing)
hping3 --flood -1 target.com

# Slowloris-style attack
hping3 -S -p 80 --faster target.com
```

## Shell Scripts and Automation

### Network Monitoring Script
```bash
#!/bin/bash
# Network connectivity monitoring script

TARGET="google.com"
PORT=443
COUNT=3
LOGFILE="/var/log/network_monitor.log"

while true; do
    if hping3 -S -p $PORT -c $COUNT $TARGET >/dev/null 2>&1; then
        echo "$(date): Connection to $TARGET:$PORT OK" >> $LOGFILE
    else
        echo "$(date): Connection to $TARGET:$PORT FAILED" >> $LOGFILE
    fi
    sleep 60
done
```

### Port Scanner Script
```bash
#!/bin/bash
# Multi-port scanner with hping3

if [ $# -ne 1 ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

TARGET=$1
PORTS="21 22 23 25 53 80 110 135 139 143 443 993 995 8080 8443"

echo "Scanning $TARGET..."

for port in $PORTS; do
    if hping3 -S -p $port -c 1 $TARGET 2>/dev/null | grep -q "flags=SA"; then
        echo "Port $port: Open"
    elif hping3 -S -p $port -c 1 $TARGET 2>/dev/null | grep -q "flags=RA"; then
        echo "Port $port: Closed"
    else
        echo "Port $port: Filtered"
    fi
done
```

### Network Performance Test
```bash
#!/bin/bash
# Network performance testing script

if [ $# -ne 1 ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

TARGET=$1

echo "Testing network performance to $TARGET..."

# Test latency
echo "Latency test:"
hping3 -1 -c 10 $TARGET | grep "time"

# Test bandwidth
echo "Bandwidth test:"
hping3 -2 -p 9999 -d 1000 --fast $TARGET

# Test connection rate
echo "Connection rate test:"
hping3 -S -p 80 --faster -c 100 $TARGET
```

## Practical Examples

### Network Troubleshooting

#### Diagnose Connection Issues
```bash
# Check if host is reachable via ICMP
hping3 -1 target.com

# Check if HTTP port is open
hping3 -S -p 80 target.com

# Check if firewall is blocking specific ports
hping3 -S -p 22 --source-port 53 target.com

# Test with different protocols
hping3 -2 -p 53 target.com
hping3 -1 target.com
```

#### Path MTU Discovery
```bash
# Test maximum packet size
for size in 1400 1450 1472 1500; do
    hping3 -2 -p 53 -d $size -c 1 target.com
    if [ $? -eq 0 ]; then
        echo "Size $size: OK"
    else
        echo "Size $size: Failed"
    fi
done
```

### Security Auditing

#### Firewall Rules Verification
```bash
# Test inbound rules
hping3 -S -p 22 external_host
hping3 -S -p 80 external_host
hping3 -S -p 443 external_host

# Test outbound rules
hping3 -S -p 80 --source-port 1024 external_host

# Test ICMP filtering
hping3 -1 external_host

# Test stateful inspection
hping3 -A -p 80 external_host
```

#### Application Layer Testing
```bash
# Test web server responses
hping3 -S -p 80 -c 5 web_server

# Test DNS server responses
hping3 -2 -p 53 -d 30 --data "0x1234" dns_server

# Test mail server
hping3 -S -p 25 mail_server
hping3 -S -p 465 mail_server
hping3 -S -p 993 mail_server
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Permission denied when using raw sockets
# Solution: Run with sudo or as root
sudo hping3 -1 target.com

# Interface selection issues
# Solution: Specify interface explicitly
sudo hping3 -I eth0 -1 target.com
```

#### Network Issues
```bash
# No responses received
# Check connectivity and firewall rules
hping3 -V target.com

# Interface doesn't exist
# List available interfaces and choose correct one
hping3 -I lo 127.0.0.1
```

#### Performance Issues
```bash
# Slow packet sending
# Use appropriate timing
hping3 -i u1000 target.com

# CPU usage during flood
# Monitor system resources
top -p $(pgrep hping3)
```

## Safety and Legal Considerations

### Important Warnings
1. **Authorization Required**: Only use hping3 on networks you own or have explicit permission to test
2. **Network Impact**: Aggressive scanning can disrupt networks and trigger security alerts
3. **Legal Compliance**: Ensure compliance with local laws and regulations
4. **Responsible Disclosure**: Report security vulnerabilities responsibly

### Best Practices
1. **Start with non-invasive tests** (single packets, low rates)
2. **Monitor impact** on target systems
3. **Use appropriate timing** to avoid overwhelming targets
4. **Document all testing** for audit purposes
5. **Coordinate with network administrators** before testing

## Related Commands

- [`nmap`](/docs/commands/networking/nmap) - Network exploration and security auditing
- [`ping`](/docs/commands/networking/ping) - Send ICMP echo requests
- [`traceroute`](/docs/commands/networking/traceroute) - Print route to network host
- [`tcpdump`](/docs/commands/networking/tcpdump) - Dump traffic on a network
- [`netcat`](/docs/commands/networking/nc) - TCP/IP swiss army knife
- [`iptables`](/docs/commands/networking/iptables) - Administration tool for IPv4 packet filtering
- [`nmap`](/docs/commands/networking/nmap) - Network exploration and security auditing
- [`mtr`](/docs/commands/networking/mtr) - Network diagnostic tool
- [`dig`](/docs/commands/networking/dig) - DNS lookup utility

## Best Practices

1. **Start with basic ICMP testing** to verify connectivity before complex scans
2. **Use appropriate timing** options to avoid overwhelming targets
3. **Monitor system resources** during intensive operations
4. **Test on known targets** first to understand expected responses
5. **Document all findings** for analysis and reporting
6. **Use verbose mode** (-V) for detailed analysis
7. **Respect rate limits** and avoid flooding production systems
8. **Combine with other tools** for comprehensive network analysis

## Performance Tips

1. **Use SYN scanning** for faster port scans without full TCP handshake
2. **Adjust packet count** (-c) to limit unnecessary traffic
3. **Choose appropriate interfaces** (-I) for multi-homed systems
4. **Optimize timing** (-i) based on network conditions
5. **Use flood mode** (--flood) only for authorized stress testing
6. **Leverage parallel execution** for large-scale scans
7. **Monitor bandwidth usage** during packet-intensive operations
8. **Customize packet sizes** (-d) for specific testing scenarios

The `hping3` command is an essential tool for network administrators, security professionals, and researchers who need to craft custom network packets for testing, analysis, and troubleshooting. Its flexibility in supporting multiple protocols and custom packet options makes it invaluable for deep network analysis and security auditing when used responsibly and with proper authorization.