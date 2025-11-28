---
title: arp - Address Resolution Protocol Cache Manager
sidebar_label: arp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arp - Address Resolution Protocol Cache Manager

The `arp` command is used to view and manipulate the system's ARP (Address Resolution Protocol) cache. ARP is a protocol used to map IP network addresses to MAC (Media Access Control) addresses on a local network. The ARP cache maintains a table of IP-to-MAC address mappings that have been resolved recently, allowing for faster communication on the local network segment.

## Basic Syntax

```bash
arp [options] [hostname] [-H type] [-i interface]
```

## Common Commands

- Default operation - Display current ARP table
- `-d hostname` - Delete an entry from the ARP cache
- `-s hostname hw_addr` - Add a permanent entry to the ARP cache
- `-n` - Display numeric addresses (no DNS resolution)
- `-a` - Display all entries in all ARP tables (default behavior)
- `-v` - Verbose mode

## Common Options

### Display Options
- `-a` - Show all entries (default behavior)
- `-n` - Show numeric addresses only, don't resolve names
- `-D` - Use the hardware address type of the interface
- `-e` - Display in Linux default format
- `-v` - Verbose output

### Manipulation Options
- `-d hostname` - Delete the ARP entry for the specified host
- `-s hostname hw_addr` - Create a static ARP entry
- `-f filename` - Read entries from file

### Interface Selection
- `-i interface` - Specify network interface
- `-H type` - Hardware type (default: ether)

### Timing Options
- `-t timeout` - Set timeout for ARP requests (seconds)

## Usage Examples

### Basic ARP Operations

#### Viewing ARP Cache
```bash
# Display current ARP table
arp

# Display ARP table without name resolution
arp -n

# Display all entries in verbose mode
arp -av

# Display in Linux default format
arp -e

# Show entries with interface information
arp -an

# View ARP cache for specific interface
arp -i eth0
```

#### Understanding ARP Output
```bash
# Typical ARP output explanation
# Address                  HWtype  HWaddress           Flags Mask            Iface
# 192.168.1.1              ether   00:11:22:33:44:55   C                     eth0
# 192.168.1.100            ether   aa:bb:cc:dd:ee:ff   C                     eth0

# Flags explanation:
# C - Complete entry
# M - Permanent entry (static)
# P - Published entry (proxy ARP)
# R - Reject entry
```

### ARP Cache Manipulation

#### Adding Static ARP Entries
```bash
# Add a static ARP entry
arp -s 192.168.1.100 00:11:22:33:44:55

# Add permanent entry for specific interface
arp -i eth0 -s 192.168.1.100 00:11:22:33:44:55

# Add entry with timeout (not supported on all systems)
arp -s 192.168.1.100 00:11:22:33:44:55 temp

# Add ARP entry for broadcast address
arp -s 192.168.1.255 ff:ff:ff:ff:ff:ff

# Add entry for specific hardware type
arp -H ether -s 192.168.1.100 00:11:22:33:44:55
```

#### Deleting ARP Entries
```bash
# Delete specific ARP entry
arp -d 192.168.1.100

# Delete entry from specific interface
arp -i eth0 -d 192.168.1.100

# Delete all ARP entries (script approach)
for entry in $(arp -n | awk 'NR>1 {print $1}'); do
    arp -d $entry
done

# Delete entries with specific hardware address
arp -n | grep "00:11:22:33:44:55" | awk '{print $1}' | xargs -r arp -d
```

### Network Diagnostics

#### ARP Troubleshooting
```bash
# Check if a specific IP is resolved
arp -n | grep "192.168.1.100"

# Check for duplicate MAC addresses
arp -n | awk '{print $3}' | sort | uniq -d

# Find hosts with multiple MAC addresses
arp -an | awk '{print $2, $4}' | sort | uniq -D

# Monitor ARP table changes
watch -n 1 "arp -an"

# Check for incomplete entries
arp -an | grep -i incomplete
```

#### Security Analysis
```bash
# Find static ARP entries (potential security policies)
arp -an | grep -i "0x2"

# Check for proxy ARP entries
arp -an | grep -i "0x8"

# Monitor ARP changes for security
while true; do
    arp -an > /tmp/arp_current
    diff /tmp/arp_previous /tmp/arp_current
    cp /tmp/arp_current /tmp/arp_previous
    sleep 10
done
```

## Practical Examples

### System Administration

#### Network Configuration Management
```bash
# Flush ARP cache completely
ip -s -s neigh flush all

# Flush ARP cache for specific interface
ip neigh flush dev eth0

# Reload ARP cache by pinging
ping -c 1 192.168.1.1

# Verify ARP cache after network changes
arp -n && ip neigh show
```

#### Security Hardening
```bash
# Add static ARP entries for critical servers
arp -s 192.168.1.1 00:aa:bb:cc:dd:ee  # Gateway
arp -s 192.168.1.10 00:11:22:33:44:55  # DNS server
arp -s 192.168.1.20 00:11:22:33:44:66  # File server

# Create static ARP entries file
cat > /etc/ethers << EOF
192.168.1.1 00:aa:bb:cc:dd:ee
192.168.1.10 00:11:22:33:44:55
192.168.1.20 00:11:22:33:44:66
EOF

# Load static entries from file
arp -f /etc/ethers
```

#### Network Monitoring
```bash
# Monitor ARP cache size
arp -an | wc -l

# Find oldest ARP entries
arp -an | head -20

# Track ARP cache usage
while true; do
    echo "$(date): $(arp -an | wc -l) entries"
    sleep 30
done

# Export ARP table for analysis
arp -an > arp_table_$(date +%Y%m%d_%H%M%S).txt
```

### Network Troubleshooting

#### Connectivity Issues
```bash
# Check if gateway is in ARP table
arp -n | grep "$(ip route show default | awk '/default/ {print $3}')"

# Manually add ARP entry to test connectivity
arp -s 192.168.1.100 00:11:22:33:44:55
ping -c 3 192.168.1.100
arp -d 192.168.1.100

# Clear problematic ARP entry
arp -d 192.168.1.100

# Refresh ARP table
sudo ip neigh flush all
ping -c 1 $(ip route show default | awk '/default/ {print $3}')
```

#### Duplicate IP Detection
```bash
# Check for duplicate IP addresses
arp -n | awk '{print $1, $3}' | sort | uniq -d -f 1

# Script to detect IP conflicts
#!/bin/bash
arp -n | awk '
NR>1 {
    if ($1 in ips) {
        print "Duplicate IP detected: " $1
        print "  MAC1: " ips[$1]
        print "  MAC2: " $3
    } else {
        ips[$1] = $3
    }
}'
```

### Automation and Scripting

#### ARP Management Scripts
```bash
#!/bin/bash
# ARP Cache Maintenance Script

STATIC_ENTRIES="/etc/ethers"
LOG_FILE="/var/log/arp_maintenance.log"

# Ensure critical static entries exist
if [ -f "$STATIC_ENTRIES" ]; then
    while read -r ip mac; do
        # Check if entry exists
        if ! arp -n | grep -q "$ip.*$mac"; then
            echo "Adding static ARP entry: $ip -> $mac"
            arp -s "$ip" "$mac"
            echo "$(date): Added static entry $ip -> $mac" >> "$LOG_FILE"
        fi
    done < "$STATIC_ENTRIES"
fi

# Clean old entries older than 1 hour
# (Implementation depends on system capabilities)
arp -an | grep -v "0x2" | head -20
```

#### Network Discovery
```bash
#!/bin/bash
# Network Discovery using ARP

NETWORK="192.168.1"
START=1
END=254

echo "Scanning network $NETWORK.0/24..."

for i in $(seq $START $END); do
    IP="$NETWORK.$i"

    # Ping to trigger ARP
    ping -c 1 -W 1 "$IP" >/dev/null 2>&1 &

    # Check if already in ARP table
    if arp -n | grep -q "$IP"; then
        MAC=$(arp -n | grep "$IP" | awk '{print $3}')
        echo "$IP is alive (MAC: $MAC)"
    fi
done

# Wait for pings to complete
wait

# Check ARP table again
arp -an | grep "$NETWORK" | grep -v "incomplete"
```

## Advanced Usage

### ARP Table Analysis

#### Network Topology Mapping
```bash
# Map network based on ARP table
arp -an | awk '
NR>1 {
    ip = $2
    gsub(/[()]/, "", ip)
    mac = $4
    iface = $7

    if (mac != "incomplete" && mac != "<incomplete>") {
        topo[iface][ip] = mac
        vendor[mac] = mac
    }
}

END {
    for (interface in topo) {
        print "Interface: " interface
        print "----------------------------------------"
        for (ip in topo[interface]) {
            print sprintf("%-15s -> %s", ip, topo[interface][ip])
        }
        print ""
    }
}'
```

#### Security Monitoring
```bash
#!/bin/bash
# ARP Change Detection Script

ARP_CACHE="/tmp/arp_cache.tmp"
ALERT_EMAIL="admin@example.com"

# Get current ARP table
arp -an > "$ARP_CACHE"

# Check for changes (compare with last run)
if [ -f "${ARP_CACHE}.prev" ]; then
    changes=$(diff "${ARP_CACHE}.prev" "$ARP_CACHE")

    if [ -n "$changes" ]; then
        echo "$(date): ARP table changes detected:" | mail -s "ARP Alert" "$ALERT_EMAIL"
        echo "$changes" | mail -s "ARP Alert" "$ALERT_EMAIL"
    fi
fi

# Save current table for next comparison
cp "$ARP_CACHE" "${ARP_CACHE}.prev"
```

### Performance Optimization

#### Cache Management
```bash
# Monitor ARP cache performance
cat /proc/net/arp

# Check ARP cache statistics
cat /proc/sys/net/ipv4/neigh/default/gc_thresh1
cat /proc/sys/net/ipv4/neigh/default/gc_thresh2
cat /proc/sys/net/ipv4/neigh/default/gc_thresh3

# Optimize ARP cache for busy networks
echo 1024 > /proc/sys/net/ipv4/neigh/default/gc_thresh1
echo 2048 > /proc/sys/net/ipv4/neigh/default/gc_thresh2
echo 4096 > /proc/sys/net/ipv4/neigh/default/gc_thresh3

# Set ARP cache timeout
echo 60 > /proc/sys/net/ipv4/neigh/default/base_reachable_time_ms
```

#### Batch Operations
```bash
# Add multiple static entries from CSV
cat << EOF > arp_entries.csv
192.168.1.10,00:11:22:33:44:55
192.168.1.20,00:11:22:33:44:66
192.168.1.30,00:11:22:33:44:77
EOF

while IFS=',' read -r ip mac; do
    arp -s "$ip" "$mac"
    echo "Added static entry: $ip -> $mac"
done < arp_entries.csv
```

## Integration and Automation

### System Integration

#### Network Interface Configuration
```bash
#!/bin/bash
# Configure ARP settings on network startup

INTERFACE=$1
GATEWAY_IP=$2
GATEWAY_MAC=$3

if [ -z "$INTERFACE" ] || [ -z "$GATEWAY_IP" ] || [ -z "$GATEWAY_MAC" ]; then
    echo "Usage: $0 <interface> <gateway_ip> <gateway_mac>"
    exit 1
fi

# Ensure gateway ARP entry is permanent
arp -i "$INTERFACE" -s "$GATEWAY_IP" "$GATEWAY_MAC"

# Disable ARP on certain interfaces for security
echo 1 > /proc/sys/net/ipv4/conf/"$INTERFACE"/arp_ignore

# Enable proxy ARP if needed
echo 1 > /proc/sys/net/ipv4/conf/"$INTERFACE"/proxy_arp

echo "ARP configuration completed for $INTERFACE"
```

#### Monitoring Integration
```bash
#!/bin/bash
# ARP monitoring for Nagios/Icinga

WARNING=100
CRITICAL=200

CURRENT=$(arp -an | wc -l)

if [ "$CURRENT" -gt "$CRITICAL" ]; then
    echo "CRITICAL: ARP cache has $CURRENT entries (threshold: $CRITICAL)"
    exit 2
elif [ "$CURRENT" -gt "$WARNING" ]; then
    echo "WARNING: ARP cache has $CURRENT entries (threshold: $WARNING)"
    exit 1
else
    echo "OK: ARP cache has $CURRENT entries"
    exit 0
fi
```

## Troubleshooting

### Common Issues

#### ARP Cache Problems
```bash
# ARP cache not updating
# Solution: Flush and rebuild cache
sudo ip neigh flush all
ping -c 1 $(ip route show default | awk '/default/ {print $3}')

# Duplicate ARP entries
# Solution: Clear duplicates and add static entries
arp -d problem_ip
arp -s problem_ip correct_mac

# ARP requests timing out
# Solution: Check network connectivity and ARP timeout
ping -c 1 target_ip
arp -n | grep target_ip
```

#### Performance Issues
```bash
# Large ARP cache causing delays
# Solution: Monitor and optimize cache size
watch -n 5 'arp -an | wc -l'

# Too many incomplete entries
# Solution: Flush incomplete entries
arp -an | grep "incomplete" | awk '{print $2}' | tr -d '()' | xargs -r arp -d
```

#### Security Issues
```bash
# ARP poisoning detection
# Solution: Monitor for unexpected MAC changes
while true; do
    arp -n | sort > /tmp/arp_current
    if [ -f /tmp/arp_previous ]; then
        if ! diff /tmp/arp_current /tmp/arp_previous; then
            echo "ARP table changed!"
            diff /tmp/arp_previous /tmp/arp_current
        fi
    fi
    mv /tmp/arp_current /tmp/arp_previous
    sleep 30
done
```

## Related Commands

- [`ip`](/docs/commands/network/ip) - Modern IP configuration tool
- [`arping`](/docs/commands/network/arping) - Send ARP REQUEST to a host
- [`ndisc6`](/docs/commands/network/ndisc6) - ICMPv6 Neighbor Discovery tool
- [`netstat`](/docs/commands/network/netstat) - Network statistics
- [`ss`](/docs/commands/network/ss) - Socket statistics
- [`tcpdump`](/docs/commands/network/tcpdump) - Network packet analyzer
- [`nmap`](/docs/commands/network/nmap) - Network exploration tool
- [`ping`](/docs/commands/network/ping) - Send ICMP ECHO_REQUEST to hosts

## Best Practices

1. **Use static ARP entries** for critical infrastructure servers
2. **Monitor ARP cache regularly** for security and performance
3. **Flush ARP cache** when troubleshooting network connectivity issues
4. **Use ARP filtering** on sensitive networks to prevent poisoning attacks
5. **Document static ARP mappings** in configuration files
6. **Implement ARP monitoring** for change detection
7. **Use appropriate timeouts** for dynamic entries
8. **Regular cleanup** of stale or incomplete entries
9. **Security hardening** with static entries for gateways and servers
10. **Network segmentation** to limit ARP broadcast domains

## Performance Tips

1. **Static ARP entries** provide instant lookup without network traffic
2. **Reduce ARP cache size** on memory-constrained systems
3. **Use appropriate gc_thresh values** for your network size
4. **Monitor ARP cache hit rates** for performance optimization
5. **Implement ARP aging** to prevent stale entries
6. **Use proxy ARP judiciously** as it increases processing load
7. **Consider ARP suppression** on high-traffic networks
8. **Optimize network design** to minimize ARP broadcast domains

The `arp` command is an essential tool for managing IP-to-MAC address resolution on local networks. While modern systems often use the `ip` command for ARP management, `arp` remains valuable for compatibility, scripting, and understanding network behavior at the ARP protocol level.