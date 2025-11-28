---
title: iftop - Network Bandwidth Monitoring Tool
sidebar_label: iftop
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# iftop - Network Bandwidth Monitoring Tool

The `iftop` command is a real-time network bandwidth monitoring tool that displays bandwidth usage on a network interface. It provides a visual representation of network connections showing the source and destination hosts, along with the amount of data being transferred between them. iftop works similarly to the Unix `top` command but focuses specifically on network traffic, making it an essential tool for network administrators, system administrators, and developers who need to monitor network performance, troubleshoot connectivity issues, and analyze bandwidth consumption.

## Basic Syntax

```bash
iftop [OPTIONS] [INTERFACE]
```

## Common Options

### Interface Selection
- `-i, --interface [INTERFACE]` - Specify network interface to monitor
- `-f, --filter [CODE]` - Use filter code to select connections
- `-F, --net-filter [NET/MASK]` - Display network ranges

### Display Options
- `-n, --no-dns` - Don't resolve hostnames (show IP addresses only)
- `-N, --no-port` - Don't convert port numbers to service names
- `-P, --port-display` - Display port numbers
- `-b, --bar` - Show bandwidth bars (default)
- `-B, --no-bar` - Don't show bandwidth bars
- `-l, --display` - Display mode (line, etc.)

### Timing and Resolution
- `-t, --timed` - Use text mode with timing
- `-s, --seconds [SEC]` - Set delay between updates (default: 2 seconds)
- `-L, --limit [NUM]` - Set number of lines to display

### Output Control
- `-h, --help` - Display help information
- `-v, --version` - Show version information
- `-o, --output [FILE]` - Write output to file

## Usage Examples

### Basic Monitoring

#### Start Basic Monitoring
```bash
# Monitor default interface
iftop

# Monitor specific interface
iftop -i eth0

# Monitor wireless interface
iftop -i wlan0

# Monitor with no DNS resolution (faster)
iftop -n

# Show port numbers
iftop -P

# Monitor without port name resolution
iftop -N
```

#### Real-time Traffic Analysis
```bash
# Monitor with 1-second intervals
iftop -s 1

# Show both IP addresses and hostnames
iftop

# Monitor specific interface with port numbers
iftop -i eth0 -P

# Display network traffic in text mode
iftop -t
```

### Interface and Network Filtering

#### Monitor Multiple Interfaces
```bash
# List available interfaces first
ip link show

# Monitor Ethernet interface
iftop -i enp0s3

# Monitor wireless interface
iftop -i wlp2s0

# Monitor loopback interface
iftop -i lo

# Monitor VPN interface
iftop -i tun0
```

#### Network Range Filtering
```bash
# Monitor specific network range
iftop -F 192.168.1.0/24

# Monitor traffic to/from specific subnet
iftop -F 10.0.0.0/8

# Monitor local network traffic only
iftop -F 192.168.0.0/16
```

### Advanced Filtering

#### BPF Filter Expressions
```bash
# Monitor traffic to/from specific host
iftop -f "host google.com"

# Monitor specific port traffic
iftop -f "port 80"

# Monitor HTTP and HTTPS traffic
iftop -f "port 80 or port 443"

# Monitor traffic from specific source
iftop -f "src host 192.168.1.100"

# Monitor traffic to specific destination
iftop -f "dst host 10.0.0.1"

# Monitor specific protocol
iftop -f "tcp"

# Exclude traffic from specific host
iftop -f "not host 192.168.1.50"

# Complex filter combinations
iftop -f "tcp and (port 22 or port 80) and not host 192.168.1.100"
```

### Display Customization

#### Different Display Modes
```bash
# Text mode with continuous output
iftop -t

# Bar display only
iftop -b

# No bar display (numbers only)
iftop -B

# Limit display to 20 lines
iftop -L 20

# Monitor with all optimizations
iftop -nNP -i eth0
```

## Practical Examples

### Network Troubleshooting

#### Bandwidth Analysis
```bash
# Check current bandwidth usage
iftop -i eth0

# Find top bandwidth consumers
iftop -t -i eth0 | head -20

# Monitor for suspicious activity
iftop -n -i eth0

# Check if specific service is using bandwidth
iftop -f "port 3306" -i eth0
```

#### Performance Monitoring
```bash
# Monitor network performance during peak hours
iftop -i eth0 -s 1

# Check for network saturation
iftop -t -i eth0 | grep -E "MB|GB"

# Monitor specific application traffic
iftop -f "host api.example.com" -i eth0
```

### Server Administration

#### Web Server Monitoring
```bash
# Monitor web traffic (HTTP/HTTPS)
iftop -f "port 80 or port 443" -i eth0

# Monitor traffic to web server
iftop -f "dst port 80" -i eth0

# Check for DDoS attacks
iftop -n -i eth0 -t
```

#### Database Server Monitoring
```bash
# Monitor database connections
iftop -f "port 3306 or port 5432" -i eth0

# Monitor replication traffic
iftop -f "host db-slave.example.com" -i eth0

# Check backup traffic
iftop -f "port 22 or port 873" -i eth0
```

### Security Analysis

#### Intrusion Detection
```bash
# Monitor for unusual traffic patterns
iftop -n -t -i eth0

# Track connections to suspicious hosts
iftop -f "host suspicious-ip.com" -i eth0

# Monitor for port scans
iftop -t -i eth0 | grep "ESTABLISHED"
```

#### Traffic Analysis
```bash
# Monitor outbound traffic
iftop -f "src net 192.168.0.0/16" -i eth0

# Monitor inbound traffic
iftop -f "dst net 192.168.0.0/16" -i eth0

# Track data transfer volumes
iftop -t -i eth0 > traffic_log.txt
```

## Interactive Commands

### During iftop Execution

#### Display Control
- `n` - Toggle DNS resolution
- `s` - Toggle source host display
- `d` - Toggle destination host display
- `t` - Toggle text mode
- `p` - Toggle pause mode
- `q` - Quit iftop

#### Sorting and Filtering
- `1/2/3` - Sort by different columns
- `<` / `>` - Sort in ascending/descending order
- `f` - Edit filter code
- `F` - Edit network filter
- `l` - Toggle display of link layer addresses

#### Display Options
- `b` - Toggle bar graph display
- `B` - Toggle bar graph scale
- `T` - Toggle cumulative totals
- `j` / `k` - Scroll down/up
- `o` - Freeze/unfreeze display

## Advanced Usage

### Automation and Scripting

#### Traffic Logging
```bash
#!/bin/bash
# Log network traffic for analysis
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/iftop_traffic_$TIMESTAMP.log"

# Run iftop for 5 minutes and log output
timeout 300 iftop -t -n -i eth0 > "$LOG_FILE"

# Extract top 10 bandwidth consumers
grep "=>" "$LOG_FILE" | sort -k 3 -nr | head -10
```

#### Bandwidth Monitoring Script
```bash
#!/bin/bash
# Continuous bandwidth monitoring
INTERFACE="eth0"
THRESHOLD_MBIT=100

while true; do
    # Get current bandwidth usage
    BANDWIDTH=$(iftop -t -n -i "$INTERFACE" -s 2 2>/dev/null | \
               grep "=>" | awk '{print $3}' | sort -nr | head -1)

    # Check if threshold exceeded
    if [[ "$BANDWIDTH" =~ ([0-9]+)Mb ]]; then
        MBIT=${BASH_REMATCH[1]}
        if [ "$MBIT" -gt "$THRESHOLD_MBIT" ]; then
            echo "High bandwidth detected: $BANDWIDTH"
            # Send alert or take action
        fi
    fi

    sleep 60
done
```

#### Network Usage Report
```bash
#!/bin/bash
# Generate daily network usage report
REPORT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="/var/network_reports/daily_usage_$REPORT_DATE.txt"

{
    echo "Network Usage Report - $REPORT_DATE"
    echo "=================================="
    echo

    # Interface summary
    echo "Interface Summary:"
    ip -s link show | grep -A 1 "eth0\|wlan0"
    echo

    # Top bandwidth consumers
    echo "Top Bandwidth Consumers (Last Hour):"
    timeout 3600 iftop -t -n -i eth0 | \
        grep "=>" | sort -k 3 -nr | head -10
    echo

    # Port usage analysis
    echo "Port Usage Analysis:"
    timeout 3600 iftop -t -n -P -i eth0 | \
        grep ":" | awk '{print $2}' | sort | uniq -c | sort -nr

} > "$REPORT_FILE"
```

### Integration with Other Tools

#### Combining with netstat
```bash
# Monitor traffic and check connections
iftop -i eth0 &
IFTOP_PID=$!

# Get detailed connection information
netstat -tuln

# Check established connections
ss -tuln | grep ESTABLISHED

# Clean up
kill $IFTOP_PID
```

#### Using with tcpdump
```bash
# Capture suspicious traffic while monitoring
iftop -f "host suspicious-host.com" -i eth0 &
IFTOP_PID=$!

# Capture packets for analysis
tcpdump -i eth0 host suspicious-host.com -w suspicious_traffic.pcap

# Analyze captured traffic
kill $IFTOP_PID
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# iftop requires root privileges for detailed monitoring
sudo iftop -i eth0

# Check if running with sufficient privileges
iftop -h

# Install iftop if not available
# Ubuntu/Debian:
sudo apt-get install iftop

# RHEL/CentOS:
sudo yum install iftop

# Fedora:
sudo dnf install iftop
```

#### Interface Issues
```bash
# List available network interfaces
ip link show

# Check interface status
ip addr show eth0

# Monitor all interfaces
for iface in $(ip link show | grep -o "eth[0-9]\|wlan[0-9]\|enp[0-9]s[0-9]"); do
    echo "Monitoring $iface:"
    iftop -i "$iface" -t -n -s 2
done
```

#### Performance Issues
```bash
# Reduce update frequency for better performance
iftop -s 5 -i eth0

# Disable DNS resolution for faster updates
iftop -n -i eth0

# Limit display lines
iftop -L 10 -i eth0
```

#### Display Problems
```bash
# Use text mode if terminal display issues
iftop -t -i eth0

# Try different display modes
iftop -b -i eth0
iftop -B -i eth0

# Adjust terminal size if display is cut off
stty columns 120 rows 50
```

### Network Interface Problems

#### Interface Not Found
```bash
# Check interface names
ip addr show

# Use interface aliases
iftop -i eth0:0

# Monitor virtual interfaces
iftop -i venet0
```

#### No Traffic Showing
```bash
# Check if interface is up
ip link set eth0 up

# Verify traffic on interface
tcpdump -i eth0 -c 5

# Check interface statistics
cat /proc/net/dev
```

## Related Commands

- [`netstat`](/docs/commands/system-info/netstat) - Network statistics and connections
- [`ss`](/docs/commands/system-info/ss) - Socket statistics utility
- [`nethogs`](/docs/commands/system-info/nethogs) - Network bandwidth monitoring per process
- [`iptraf`](/docs/commands/networking/iptraf) - Interactive IP LAN monitoring
- [`bmon`](/docs/commands/networking/bmon) - Bandwidth monitor and rate estimator
- [`nload`](/docs/commands/networking/nload) - Network traffic monitor
- [`tcpdump`](/docs/commands/networking/tcpdump) - Network packet analyzer
- [`wireshark`](/docs/commands/networking/wireshark) - Network protocol analyzer
- [`ip`](/docs/commands/system-info/ip) - Show/manipulate routing and devices
- [`ethtool`](/docs/commands/system-info/ethtool) - Display or change Ethernet device settings

## Best Practices

1. **Use specific interfaces** with `-i` flag for accurate monitoring
2. **Disable DNS resolution** with `-n` for faster updates and privacy
3. **Apply filters** with `-f` to focus on relevant traffic
4. **Monitor during different times** to establish baseline usage patterns
5. **Use text mode** (`-t`) for logging and automation
6. **Run with appropriate privileges** for detailed interface information
7. **Combine with other tools** like netstat for comprehensive network analysis
8. **Monitor key interfaces** regularly for bandwidth planning
9. **Set appropriate update intervals** based on monitoring needs
10. **Document normal traffic patterns** for easier anomaly detection

## Performance Tips

1. **Use `-n` flag** to skip DNS resolution and improve performance
2. **Set appropriate refresh intervals** with `-s` to balance accuracy and performance
3. **Apply specific filters** to reduce processing overhead
4. **Limit display lines** with `-L` for better performance on slow connections
5. **Monitor specific interfaces** rather than all available interfaces
6. **Use text mode** for long-term monitoring and logging
7. **Avoid running multiple instances** on the same interface
8. **Consider system resources** when monitoring high-traffic interfaces
9. **Use bar display** (`-b`) for visual quick assessment of traffic patterns
10. **Regular monitoring** helps establish baseline performance metrics

The `iftop` command is an essential network monitoring tool that provides real-time visibility into network bandwidth usage. Its intuitive interface, flexible filtering options, and detailed traffic analysis capabilities make it invaluable for network administrators, system administrators, and developers who need to monitor, troubleshoot, and optimize network performance. Whether you're tracking bandwidth consumption, identifying network bottlenecks, or investigating security incidents, iftop provides the critical insights needed for effective network management.