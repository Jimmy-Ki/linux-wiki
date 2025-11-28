---
title: arp - Display and manipulate ARP cache
sidebar_label: arp
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arp - Display and manipulate ARP cache

The `arp` command (Address Resolution Protocol) is a fundamental network utility that displays and manipulates the system's ARP cache/table. ARP is used to map IPv4 addresses to MAC addresses (hardware addresses) on local networks. The arp command is essential for network diagnostics, troubleshooting connectivity issues, managing network configurations, and monitoring network activity. It provides critical insights into how devices on a local network are communicating and can help resolve various network-related problems.

## Basic Syntax

```bash
arp [-vn] [<HW>] [-i <if>] [-a] [<hostname>]
arp [-v] [-i <if>] -d <host> [pub]
arp [-v] [-i <if>] -s <host> <hwaddr> [temp] [nopub] [trail]
arp [-v] [-i <if>] -s <host> <hwaddr> [netmask <nm>] pub
arp [-v] [-i <if>] -Ds <host> <if> [netmask <nm>] pub
arp [-vnD] [<HW>] [-i <if>] -f [<filename>]
```

## Common Operations

- `arp -a` - Display all entries in ARP cache
- `arp -d` - Delete an ARP entry
- `arp -s` - Add a static ARP entry
- `arp -n` - Show numeric addresses only (no DNS resolution)
- `arp -v` - Verbose output
- `arp -i` - Specify network interface

## Options and Parameters

### Display Options
- `-a` - Display all entries in ARP cache for all interfaces
- `-v` - Verbose mode, show detailed information
- `-n` - Show numeric addresses, don't resolve names
- `-D` - Use device name instead of hardware address
- `-H <type>` - Hardware type (default: ether)
  - `ether` - Ethernet (10 Mbps)
  - `ax25` - Amateur Radio AX.25
  - `pronet` - PROnet token ring
  - `chaos` - Chaos
  - `arcnet` - ARCnet
  - `dlci` - Frame Relay DLCI
  - `fibre` - Fibre Channel
  - `hippi` - HIPPI
  - `irda` - IrDA
  - `ppp` - PPP

### Interface Selection
- `-i <if>` - Specify network interface (e.g., eth0, wlan0, enp0s3)
- `-f <file>` - Read entries from file instead of command line

### ARP Entry Operations
- `-d <host>` - Delete ARP entry for specified host
- `-s <host> <hwaddr>` - Add static ARP entry
- `temp` - Temporary entry (will timeout)
- `nopub` - Non-published entry (not advertised)
- `trail` - Trailer encapsulation
- `pub` - Published entry (advertised to network)

### Advanced Options
- `-pub` - Set published flag (advertise to network)
- `-netmask <nm>` - Set netmask for proxy ARP
- `-D <if>` - Use device for proxy ARP

## Usage Examples

### Basic ARP Cache Operations

#### Display ARP Table
```bash
# Show all ARP entries
arp -a

# Show ARP entries with numeric addresses only
arp -an

# Show ARP entries for specific interface
arp -i eth0 -a

# Verbose display of ARP cache
arp -v -a
```

#### View Specific Host Information
```bash
# Look up specific host
arp 192.168.1.100

# Show ARP entry for router
arp gateway

# Display with hostnames resolved
arp -a | grep router
```

### Static ARP Entry Management

#### Adding Static Entries
```bash
# Add static ARP entry
arp -s 192.168.1.100 00:11:22:33:44:55

# Add static entry for specific interface
arp -i eth0 -s 192.168.1.101 00:11:22:33:44:56

# Add temporary static entry
arp -s 192.168.1.102 00:11:22:33:44:57 temp

# Add static entry without publishing
arp -s 192.168.1.103 00:11:22:33:44:58 nopub
```

#### Proxy ARP Configuration
```bash
# Configure proxy ARP for network
arp -s 10.0.0.1 00:11:22:33:44:59 pub

# Proxy ARP with netmask
arp -s 192.168.2.1 00:11:22:33:44:60 netmask 255.255.255.0 pub

# Proxy ARP using device name
arp -Ds 192.168.3.1 eth0 pub
```

#### Deleting ARP Entries
```bash
# Delete specific ARP entry
arp -d 192.168.1.100

# Delete entry and stop publishing
arp -d 192.168.1.100 pub

# Delete all ARP entries
arp -d $(arp -an | awk '{print $2}' | tr -d '()')
```

### Network Diagnostics

#### Troubleshooting Network Issues
```bash
# Check if host is in ARP cache
arp -an | grep 192.168.1.100

# Find MAC address of IP
arp -an | grep "192.168.1" | awk '{print $4}'

# Check for duplicate MAC addresses
arp -an | sort | uniq -d -f3

# Monitor ARP cache changes
watch -n 1 'arp -an | head -20'
```

#### Network Discovery and Mapping
```bash
# List all hosts on local network
arp -an | grep -v "incomplete" | awk '{print $2}' | tr -d '()'

# Find host by MAC address
arp -an | grep "00:11:22:33:44:55"

# Show all interfaces with ARP entries
arp -a | grep "on" | awk '{print $7}' | sort | uniq

# Check for incomplete ARP entries (potential issues)
arp -an | grep "incomplete"
```

### Advanced ARP Operations

#### Batch Operations
```bash
# Read ARP entries from file
arp -f arp_entries.txt

# Create batch file for static entries
cat > static_arp.txt << EOF
192.168.1.10 00:11:22:33:44:10
192.168.1.11 00:11:22:33:44:11
192.168.1.12 00:11:22:33:44:12
EOF

arp -f static_arp.txt

# Export current ARP table to file
arp -an > arp_backup.txt
```

#### Interface-Specific Operations
```bash
# Show ARP for wireless interface only
arp -i wlan0 -a

# Add static entry to specific interface
arp -i eth1 -s 10.0.0.50 00:11:22:33:44:50

# Clear ARP for specific interface
sudo ip neigh flush dev eth0
```

## Practical Examples

### System Administration

#### Network Security Monitoring
```bash
# Monitor ARP table for suspicious activity
arp -an > /var/log/arp_$(date +%Y%m%d_%H%M%S).log

# Check for ARP spoofing detection
watch -n 5 'arp -an | grep "$(ip route | grep default | awk "{print \$3}")"'

# Validate gateway MAC address consistency
GATEWAY_IP=$(ip route | grep default | awk '{print $3}')
CURRENT_MAC=$(arp -n $GATEWAY_IP | awk '{print $3}')
echo "Gateway MAC: $CURRENT_MAC"

# Alert on MAC address changes
arp -an | awk '{print $2,$4}' > /tmp/arp_current
diff /tmp/arp_previous /tmp/arp_current && echo "ARP table changed"
```

#### Server Network Configuration
```bash
# Configure static ARP for critical servers
arp -s 192.168.1.10 00:1A:2B:3C:4D:5E  # Database server
arp -s 192.168.1.11 00:1A:2B:3C:4D:5F  # Application server
arp -s 192.168.1.12 00:1A:2B:3C:4D:60  # Backup server

# Configure proxy ARP for network segmentation
arp -s 10.0.1.1 00:1A:2B:3C:4D:61 netmask 255.255.255.0 pub

# Verify static entries
arp -an | grep "192.168.1.1[0-2]"
```

### Network Troubleshooting

#### Connectivity Issues
```bash
# Diagnose network connectivity
ping -c 1 192.168.1.100 && arp -an | grep 192.168.1.100

# Check for ARP timeout issues
arp -d 192.168.1.100 && ping -c 1 192.168.1.100 && arp -an | grep 192.168.1.100

# Verify network interface ARP functionality
arp -i eth0 -a | grep -c "entries"

# Test ARP resolution speed
time arp -n 192.168.1.100
```

#### ARP Cache Issues
```bash
# Clear entire ARP cache
sudo ip -s -s neigh flush all

# Clear ARP for specific network
sudo ip neigh flush to 192.168.1.0/24 dev eth0

# Check ARP cache statistics
cat /proc/net/arp | wc -l
cat /proc/net/arp_cache

# Monitor ARP cache usage
cat /proc/sys/net/ipv4/neigh/default/gc_thresh1
cat /proc/sys/net/ipv4/neigh/default/gc_thresh2
cat /proc/sys/net/ipv4/neigh/default/gc_thresh3
```

### Security Applications

#### ARP Spoofing Detection
```bash
# Create baseline ARP table
arp -an > /tmp/arp_baseline.txt

# Periodic ARP table comparison
arp -an > /tmp/arp_current.txt
if ! diff /tmp/arp_baseline.txt /tmp/arp_current.txt; then
    echo "WARNING: ARP table has changed!"
    mail -s "ARP Change Alert" admin@company.com < /tmp/arp_current.txt
fi

# Monitor for duplicate MAC addresses
arp -an | awk '{print $4}' | sort | uniq -c | awk '$1 > 1 {print $2}'

# Check for inconsistent MAC addresses
for ip in $(arp -an | awk '{print $2}' | tr -d '()'); do
    ping -c 1 -W 1 $ip >/dev/null 2>&1
    mac=$(arp -n $ip 2>/dev/null | awk '$1 == "'$ip'" {print $3}')
    echo "$ip -> $mac"
done
```

#### Static ARP Security
```bash
# Security script to lock down critical infrastructure
#!/bin/bash
CRITICAL_HOSTS=(
    "192.168.1.1:00:11:22:33:44:01"  # Gateway
    "192.168.1.10:00:11:22:33:44:10" # DNS Server
    "192.168.1.20:00:11:22:33:44:20" # Authentication Server
)

for entry in "${CRITICAL_HOSTS[@]}"; do
    ip=$(echo $entry | cut -d: -f1)
    mac=$(echo $entry | cut -d: -f2-)
    arp -s $ip $mac
    echo "Static ARP added: $ip -> $mac"
done

# Verify configuration
arp -an | grep "192.168.1"
```

## Advanced Usage

### Integration with Other Commands

#### Network Discovery Scripts
```bash
# Complete network scan and ARP table building
#!/bin/bash
NETWORK="192.168.1"
for i in {1..254}; do
    (ping -c 1 -W 1 $NETWORK.$i >/dev/null 2>&1 && arp -n $NETWORK.$i) &
done
wait
arp -an | grep "$NETWORK" | sort

# Export ARP table with additional information
arp -an | while read line; do
    ip=$(echo $line | awk '{print $2}' | tr -d '()')
    mac=$(echo $line | awk '{print $4}')
    iface=$(echo $line | awk '{print $7}')
    hostname=$(nslookup $ip 2>/dev/null | grep name | awk '{print $4}')
    echo "$ip,$mac,$iface,$hostname"
done
```

#### ARP Cache Optimization
```bash
# ARP cache size tuning
echo 1024 > /proc/sys/net/ipv4/neigh/default/gc_thresh1
echo 2048 > /proc/sys/net/ipv4/neigh/default/gc_thresh2
echo 4096 > /proc/sys/net/ipv4/neigh/default/gc_thresh3

# ARP timeout optimization
echo 60 > /proc/sys/net/ipv4/neigh/default/base_reachable_time_ms
echo 30 > /proc/sys/net/ipv4/neigh/default/reachable_time_ms

# Monitoring ARP cache performance
watch -n 1 'cat /proc/net/arp | wc -l; cat /proc/net/arp_cache'
```

### Automation and Monitoring

#### Continuous ARP Monitoring
```bash
#!/bin/bash
# ARP monitoring script
LOG_FILE="/var/log/arp_monitor.log"
ALERT_EMAIL="admin@company.com"

monitor_arp() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] ARP Table Check:" >> $LOG_FILE
    arp -an >> $LOG_FILE

    # Check for suspicious entries
    suspicious=$(arp -an | grep "incomplete")
    if [ ! -z "$suspicious" ]; then
        echo "[$timestamp] WARNING: Incomplete ARP entries detected:" >> $LOG_FILE
        echo "$suspicious" >> $LOG_FILE
        echo "$suspicious" | mail -s "ARP Incomplete Entries Alert" $ALERT_EMAIL
    fi
}

while true; do
    monitor_arp
    sleep 300  # Check every 5 minutes
done
```

## Troubleshooting

### Common Issues

#### ARP Entry Not Resolving
```bash
# Symptoms: ping works but ARP shows incomplete
# Solution: Clear ARP cache and try again
sudo ip neigh flush all
ping -c 3 192.168.1.100

# Check network interface status
ip link show
arp -i eth0 -a

# Verify routing table
ip route show
```

#### Static ARP Entries Not Working
```bash
# Check if static entry exists
arp -an | grep "192.168.1.100"

# Verify MAC address format
arp -s 192.168.1.100 00:11:22:33:44:55

# Check interface status
ip addr show

# Re-add static entry with correct interface
arp -i eth0 -s 192.168.1.100 00:11:22:33:44:55
```

#### Permission Issues
```bash
# Most ARP operations require root privileges
sudo arp -s 192.168.1.100 00:11:22:33:44:55
sudo arp -d 192.168.1.100

# Check current user capabilities
capsh --print | grep -i "cap_net_admin"

# Run with proper privileges
sudo -E arp -a
```

#### Network Interface Problems
```bash
# Check interface status
ip link show
ip addr show

# Bring interface up if down
sudo ip link set eth0 up

# Check ARP on specific interface
arp -i eth0 -a

# Reset interface
sudo ip link set eth0 down
sudo ip link set eth0 up
```

## Related Commands

- [`ip`](/docs/commands/system-info/ip) - Modern network interface and routing configuration
- [`ifconfig`](/docs/commands/system-info/ifconfig) - Network interface configuration (legacy)
- [`netstat`](/docs/commands/system-info/netstat) - Network connections and statistics
- [`ss`](/docs/commands/system-info/ss) - Socket statistics (modern netstat replacement)
- [`route`](/docs/commands/system-info/route) - Show and manipulate routing table
- [`ping`](/docs/commands/system-info/ping) - Test network connectivity
- [`arping`](/docs/commands/system-info/arping) - Send ARP REQUEST to a neighbour host
- [`arpwatch`](/docs/commands/system-info/arpwatch) - ARP monitoring utility
- [`nmap`](/docs/commands/network-tools/nmap) - Network exploration and security scanning
- [`ethtool`](/docs/commands/system-info/ethtool) - Network interface configuration tool

## Best Practices

1. **Use ip command** for modern systems instead of traditional arp
2. **Regular monitoring** of ARP table for security and troubleshooting
3. **Static ARP entries** for critical infrastructure security
4. **DNS resolution** disabled (-n) for faster operation in scripts
5. **Interface specification** (-i) for multi-interface systems
6. **Regular cleanup** of stale ARP entries
7. **Security monitoring** for ARP spoofing detection
8. **Backup ARP tables** for disaster recovery
9. **Consistent MAC address** verification for critical services
10. **Proper permissions** when modifying ARP tables

## Performance Tips

1. **Use -n flag** to avoid DNS resolution delays
2. **Specify interfaces** on systems with multiple network cards
3. **Monitor ARP cache size** to prevent memory issues
4. **Use appropriate GC thresholds** for your network size
5. **Regular ARP cache cleanup** improves performance
6. **Static entries** reduce lookup overhead for frequent access
7. **Batch operations** for multiple ARP changes
8. **Avoid excessive ARP requests** in high-frequency monitoring
9. **Use appropriate timeouts** for your network environment
10. **Monitor ARP cache hit ratios** for performance tuning

The `arp` command remains an essential tool for network administration, providing critical insights into layer 2 network operations and serving as a fundamental diagnostic utility for connectivity troubleshooting. While modern systems increasingly use the `ip` command for ARP management, understanding and properly using `arp` continues to be valuable for network professionals and system administrators.