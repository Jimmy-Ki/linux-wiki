---
title: arping - Send ARP REQUEST to a host
sidebar_label: arping
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arping - Send ARP REQUEST to a host

The `arping` command is a network utility that sends ARP (Address Resolution Protocol) REQUEST packets to a network host to discover and verify its MAC address. It operates at the data link layer (Layer 2) of the OSI model, making it useful for testing network connectivity on local networks, detecting duplicate IP addresses, monitoring network availability, and troubleshooting ARP-related issues. Unlike traditional ping commands that use ICMP, arping works even when ICMP is blocked or filtered.

## Basic Syntax

```bash
arping [OPTIONS] destination
```

## Common Options

### Basic Options
- `-0` - Use ARP REPLY packets instead of ARP REQUEST
- `-c COUNT` - Send only COUNT packets
- `-w TIMEOUT` - Specify a timeout in seconds
- `-i INTERVAL` - Set interval between packets (seconds)
- `-s SOURCE` - Set source IP address
- `-I INTERFACE` - Use specified network interface
- `-f` - Quit after first reply (ping mode)

### Advanced Options
- `-b` - Send broadcast packets
- `-D` - Duplicate address detection mode
- `-U` - Unsolicited ARP mode (gratuitous ARP)
- `-A` - ARP answer mode (same as -U)
- `-q` - Quiet mode, only display summary
- `-p` - Turn on promiscuous mode
- `-r` - Raw output mode

### Timing and Control
- `-t TIMEOUT` - Set timeout per packet (microseconds)
- `-W TIMEOUT` - Set timeout for replies (seconds)
- `-B` - Halt on broadcast reply
- `-T` - Use timestamp option
- `-R` - Use RARP instead of ARP

## Usage Examples

### Basic Network Testing

#### Simple ARP Ping
```bash
# Send ARP requests to a host
arping 192.168.1.100

# Send only 3 packets
arping -c 3 192.168.1.100

# Ping with 1-second interval
arping -i 1 192.168.1.100

# Use specific interface
arping -I eth0 192.168.1.100

# Quit after first reply
arping -f 192.168.1.100
```

#### Continuous Monitoring
```bash
# Continuous ARP ping (Ctrl+C to stop)
arping 192.168.1.100

# Ping with custom interval
arping -i 0.5 192.168.1.100

# Set timeout for whole operation
arping -w 10 192.168.1.100
```

### Duplicate Address Detection

#### Detect Duplicate IPs
```bash
# Duplicate address detection mode
arping -D -c 2 192.168.1.100

# Exit with 0 if address is unique, 1 if duplicate
if arping -D -c 2 -I eth0 192.168.1.100; then
    echo "IP address is unique"
else
    echo "Duplicate IP address detected!"
fi

# Check with source IP specified
arping -D -s 192.168.1.10 -c 3 192.168.1.100
```

#### Network Setup Validation
```bash
# Validate IP assignment before use
arping -D -c 3 -I eth0 10.0.0.50 && \
    echo "IP 10.0.0.50 is available" || \
    echo "IP 10.0.0.50 is already in use"
```

### Network Interface Management

#### Specify Source Address
```bash
# Use specific source IP
arping -s 192.168.1.10 192.168.1.100

# Use specific source MAC (if supported)
arping --source-mac 00:11:22:33:44:55 192.168.1.100

# Interface-specific testing
arping -I wlan0 -c 5 192.168.1.100
arping -I eth1 -c 5 192.168.1.100
```

#### Broadcast Testing
```bash
# Send broadcast ARP requests
arping -b -c 3 192.168.1.255

# Test network segment reachability
arping -b -I eth0 -c 5 192.168.1.255
```

### ARP Cache Manipulation

#### Gratuitous ARP
```bash
# Send gratuitous ARP (announce IP address)
arping -U -c 3 -I eth0 192.168.1.100

# Force ARP cache update
arping -U -s 192.168.1.100 192.168.1.100

# ARP answer mode
arping -A -c 5 192.168.1.100
```

#### Network Configuration Changes
```bash
# Announce IP change to network
arping -U -c 3 -I eth0 192.168.1.100

# Update ARP tables after failover
arping -U -s 192.168.1.100 192.168.1.100
```

## Practical Examples

### Network Administration

#### Network Discovery
```bash
# Check if host is on local network
arping -c 1 -w 1 192.168.1.100 && echo "Host reachable" || echo "Host not found"

# Discover active hosts on network segment
for ip in 192.168.1.{1..254}; do
    if arping -c 1 -w 1 -q $ip 2>/dev/null; then
        echo "$ip is active"
    fi
done

# Find MAC address of IP
arping -c 1 192.168.1.100
# MAC address shown in output
```

#### Network Troubleshooting
```bash
# Test ARP resolution
arping -c 3 -v 192.168.1.100

# Check ARP cache consistency
arping -c 1 192.168.1.100
arp -n | grep 192.168.1.100

# Verify interface connectivity
for iface in eth0 eth1 wlan0; do
    if ip link show $iface | grep -q "state UP"; then
        echo "Testing interface $iface:"
        arping -I $iface -c 1 192.168.1.1
    fi
done
```

### System Administration

#### Network Configuration Validation
```bash
#!/bin/bash
# Network configuration validation script

NETWORK_INTERFACE="eth0"
GATEWAY_IP="192.168.1.1"
TEST_IP="8.8.8.8"

echo "Validating network configuration..."

# Check interface is up
if ! ip link show $NETWORK_INTERFACE | grep -q "state UP"; then
    echo "ERROR: Interface $NETWORK_INTERFACE is down"
    exit 1
fi

# Test ARP resolution to gateway
echo "Testing ARP resolution to gateway..."
if arping -c 3 -I $NETWORK_INTERFACE -q $GATEWAY_IP; then
    echo "✓ ARP resolution to gateway successful"
else
    echo "✗ ARP resolution to gateway failed"
    exit 1
fi

# Test duplicate IP detection
echo "Checking for duplicate IP addresses..."
CURRENT_IP=$(ip -4 addr show $NETWORK_INTERFACE | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
if arping -D -c 2 -I $NETWORK_INTERFACE $CURRENT_IP; then
    echo "✓ No duplicate IP detected"
else
    echo "✗ Duplicate IP address detected!"
    exit 1
fi

echo "Network validation completed successfully"
```

#### High Availability Setup
```bash
#!/bin/bash
# VIP failover monitoring script

VIP="192.168.1.100"
INTERFACE="eth0"
STATE_FILE="/tmp/vip_state"

check_vip() {
    # Check if we can ARP to the VIP
    if arping -D -c 1 -I $INTERFACE $VIP; then
        echo "VIP is available for acquisition"
        return 0
    else
        echo "VIP is already in use"
        return 1
    fi
}

acquire_vip() {
    echo "Acquiring VIP $VIP"
    ip addr add $VIP/24 dev $INTERFACE
    arping -U -c 5 -I $INTERFACE $VIP
    echo "VIP acquired successfully"
}

release_vip() {
    echo "Releasing VIP $VIP"
    ip addr del $VIP/24 dev $INTERFACE
    echo "VIP released"
}

# Main failover logic
if check_vip; then
    acquire_vip
    echo "active" > $STATE_FILE
else
    echo "standby" > $STATE_FILE
fi
```

### Security and Monitoring

#### Network Security Monitoring
```bash
#!/bin/bash
# ARP spoofing detection script

NETWORK="192.168.1.0/24"
LOG_FILE="/var/log/arp_monitor.log"
arp_table="/tmp/arp_table"

monitor_arp_changes() {
    while true; do
        # Scan network and record ARP responses
        for ip in 192.168.1.{1..254}; do
            if arping -c 1 -w 1 -q $ip 2>/dev/null; then
                mac=$(arp -n $ip | awk '/ether/ {print $3}')
                if [ -n "$mac" ]; then
                    echo "$ip $mac $(date)" >> $arp_table
                fi
            fi
        done

        # Check for suspicious changes
        if [ -f "$arp_table" ]; then
            # Analyze ARP table for anomalies
            # Add your security analysis logic here
            :
        fi

        sleep 300  # Check every 5 minutes
    done
}

echo "Starting ARP monitoring..."
monitor_arp_changes
```

#### Network Performance Testing
```bash
#!/bin/bash
# Network latency testing with ARP

TARGET_IP="192.168.1.100"
PACKETS=100
RESULTS_FILE="/tmp/arp_latency_test.csv"

test_arp_latency() {
    echo "Timestamp,Response_Time" > $RESULTS_FILE

    for ((i=1; i<=$PACKETS; i++)); do
        start_time=$(date +%s%N)
        if arping -c 1 -w 1 -q $TARGET_IP; then
            end_time=$(date +%s%N)
            latency=$(( (end_time - start_time) / 1000 ))  # microseconds
            echo "$(date),$latency" >> $RESULTS_FILE
        else
            echo "$(date),timeout" >> $RESULTS_FILE
        fi
        sleep 0.1
    done

    echo "ARP latency test completed. Results saved to $RESULTS_FILE"
}

# Calculate average latency
calculate_average() {
    if [ -f "$RESULTS_FILE" ]; then
        avg_latency=$(awk -F',' 'NR>1 && $2!="timeout" {sum+=$2; count++} END {if(count>0) print sum/count; else print "0"}' $RESULTS_FILE)
        echo "Average ARP response time: ${avg_latency} microseconds"
    fi
}

test_arp_latency
calculate_average
```

## Advanced Usage

### Advanced Network Testing

#### Multi-Interface Testing
```bash
# Test connectivity through multiple interfaces
for iface in $(ip link show | grep -oP '^\d+: \K[^:]+'); do
    if ip link show $iface | grep -q "state UP"; then
        echo "Testing interface $iface:"
        arping -I $iface -c 3 192.168.1.1
        echo "---"
    fi
done

# Compare ARP performance across interfaces
performance_test() {
    local iface=$1
    local target=$2

    echo "Testing $iface performance..."
    time arping -I $iface -c 100 $target > /dev/null 2>&1
}

for iface in eth0 eth1 wlan0; do
    if ip link show $iface | grep -q "state UP"; then
        performance_test $iface 192.168.1.1
    fi
done
```

#### Network Discovery Scripts
```bash
#!/bin/bash
# Comprehensive network discovery

NETWORK="192.168.1"
RANGE_START=1
RANGE_END=254
OUTPUT_FILE="network_discovery_$(date +%Y%m%d).txt"

echo "Starting network discovery on $NETWORK.0/24..."
echo "Discovery started at $(date)" > $OUTPUT_FILE

discover_network() {
    echo "Scanning network range $NETWORK.$RANGE_START-$NETWORK.$RANGE_END"

    for i in $(seq $RANGE_START $RANGE_END); do
        ip="$NETWORK.$i"
        if arping -c 1 -w 1 -q $ip 2>/dev/null; then
            mac=$(arp -n $ip 2>/dev/null | awk '/ether/ {print $3}')
            hostname=$(host $ip 2>/dev/null | awk '/domain/ {print $5}')

            echo "Host found: $ip"
            echo "  MAC: ${mac:-'Unknown'}"
            echo "  Hostname: ${hostname:-'Unknown'}"
            echo "  Discovered: $(date)"
            echo "" >> $OUTPUT_FILE
            echo "IP: $ip" >> $OUTPUT_FILE
            echo "MAC: ${mac:-'Unknown'}" >> $OUTPUT_FILE
            echo "Hostname: ${hostname:-'Unknown'}" >> $OUTPUT_FILE
            echo "Timestamp: $(date)" >> $OUTPUT_FILE
            echo "---" >> $OUTPUT_FILE
        fi
    done
}

discover_network
echo "Network discovery completed. Results saved to $OUTPUT_FILE"
```

### Scripting and Automation

#### Network Health Monitoring
```bash
#!/bin/bash
# Network health monitoring with ARP

# Configuration
CRITICAL_HOSTS=("192.168.1.1" "192.168.1.10" "192.168.1.20")
ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/network_health.log"
MAX_FAILURES=3

# Failure tracking
declare -A host_failures

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

send_alert() {
    local message="$1"
    echo "$message" | mail -s "Network Alert" $ALERT_EMAIL
}

check_host() {
    local host=$1
    local interface=${2:-"eth0"}

    if arping -c 3 -I $interface -w 5 -q $host; then
        if [ ${host_failures[$host]} -gt 0 ]; then
            log_message "Host $host is back online after ${host_failures[$host]} failures"
            host_failures[$host]=0
        fi
        return 0
    else
        host_failures[$host]=$((${host_failures[$host]} + 1))
        log_message "Host $host unreachable (failure ${host_failures[$host]}/$MAX_FAILURES)"

        if [ ${host_failures[$host]} -eq $MAX_FAILURES ]; then
            local alert_message="Critical: Host $host has failed $MAX_FAILURES consecutive ARP checks"
            send_alert "$alert_message"
            log_message "ALERT SENT: $alert_message"
        fi
        return 1
    fi
}

# Main monitoring loop
while true; do
    log_message "Starting network health check"

    for host in "${CRITICAL_HOSTS[@]}"; do
        check_host $host
    done

    # Check overall network health
    active_interfaces=$(ip link show | grep -c "state UP")
    log_message "Active interfaces: $active_interfaces"

    log_message "Network health check completed"
    sleep 60  # Check every minute
done
```

#### Network Configuration Validation
```bash
#!/bin/bash
# Comprehensive network configuration validation

validate_network_config() {
    local errors=0

    echo "=== Network Configuration Validation ==="

    # Check if we have network interfaces
    if ! ip link show | grep -q "state UP"; then
        echo "ERROR: No network interfaces are up"
        ((errors++))
    fi

    # Check for duplicate IP addresses
    current_ip=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
    for ip in $current_ip; do
        if ! arping -D -c 2 $ip; then
            echo "ERROR: Duplicate IP address detected: $ip"
            ((errors++))
        fi
    done

    # Test ARP resolution
    gateway=$(ip route | grep default | awk '{print $3}')
    if [ -n "$gateway" ]; then
        if arping -c 3 $gateway; then
            echo "✓ Gateway reachable via ARP"
        else
            echo "ERROR: Gateway not reachable"
            ((errors++))
        fi
    fi

    # Check ARP cache
    if [ $(arp -n | wc -l) -eq 0 ]; then
        echo "WARNING: ARP cache is empty"
    fi

    echo "=== Validation Complete ==="
    if [ $errors -eq 0 ]; then
        echo "✓ Network configuration appears valid"
        return 0
    else
        echo "✗ Found $errors network configuration issues"
        return 1
    fi
}

validate_network_config
```

## Troubleshooting

### Common Issues

#### ARP Resolution Failures
```bash
# Debug ARP resolution issues
debug_arp_resolution() {
    local target=$1

    echo "Debugging ARP resolution for $target..."

    # Check if target is on local network
    local_ip=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
    local_net=$(echo $local_ip | cut -d'.' -f1-3)
    target_net=$(echo $target | cut -d'.' -f1-3)

    if [ "$local_net" != "$target_net" ]; then
        echo "Target $target is not on the local network"
        return 1
    fi

    # Check interface status
    interface=$(ip route get $target | awk '{print $5}')
    echo "Using interface: $interface"
    ip link show $interface

    # Test ARP with verbose output
    echo "Testing ARP resolution..."
    arping -v -c 3 $target

    # Check ARP cache
    echo "Current ARP cache entry:"
    arp -n $target
}

debug_arp_resolution 192.168.1.100
```

#### Permission and Interface Issues
```bash
# Check if running with sufficient privileges
check_permissions() {
    if [ "$EUID" -ne 0 ]; then
        echo "WARNING: arping may require root privileges for some operations"
        echo "Try running with sudo for full functionality"
    fi

    # List available interfaces
    echo "Available network interfaces:"
    ip link show | grep -E '^[0-9]+:' | awk '{print $2}' | sed 's/:$//'

    # Check interface states
    echo -e "\nInterface states:"
    for iface in $(ip link show | grep -oP '^\d+: \K[^:]+'); do
        state=$(ip link show $iface | grep -oP 'state \K\w+')
        echo "$iface: $state"
    done
}

check_permissions
```

#### Network Performance Issues
```bash
# Diagnose ARP performance problems
diagnose_arp_performance() {
    local target=$1
    local packets=100

    echo "Diagnosing ARP performance to $target..."

    # Test ARP response times
    echo "Measuring ARP response times..."
    start_time=$(date +%s%N)

    if arping -c $packets -q $target; then
        end_time=$(date +%s%N)
        total_time=$(( (end_time - start_time) / 1000000 ))  # milliseconds
        avg_time=$((total_time / packets))

        echo "ARP Performance Results:"
        echo "  Packets sent: $packets"
        echo "  Total time: ${total_time}ms"
        echo "  Average response time: ${avg_time}ms"

        if [ $avg_time -gt 1000 ]; then
            echo "WARNING: High ARP latency detected"
        else
            echo "✓ ARP latency is within normal range"
        fi
    else
        echo "ERROR: Unable to complete ARP performance test"
    fi

    # Check for ARP cache issues
    echo -e "\nARP cache analysis:"
    arp -n | head -10
}

diagnose_arp_performance 192.168.1.1
```

## Related Commands

- [`ping`](/docs/commands/networking/ping) - ICMP echo request utility
- [`arp`](/docs/commands/system-info/arp) - ARP cache manipulation utility
- [`ip`](/docs/commands/system-info/ip) - Advanced network interface configuration
- [`netstat`](/docs/commands/system-info/netstat) - Network statistics utility
- [`tcpdump`](/docs/commands/networking/tcpdump) - Network packet analyzer
- [`nmap`](/docs/commands/networking/nmap) - Network discovery and security auditing
- [`fping`](/docs/commands/networking/fping) - Advanced ping utility for multiple hosts
- [`arp-scan`](/docs/commands/networking/arp-scan) - ARP discovery and scanning tool
- [`ethtool`](/docs/commands/system-info/ethtool) - Ethernet settings utility
- [`mtr`](/docs/commands/networking/mtr) - Network diagnostic tool combining ping and traceroute

## Best Practices

1. **Use specific interfaces** with `-I` option for accurate testing
2. **Limit packet count** with `-c` to avoid network flooding
3. **Set appropriate timeouts** for network conditions
4. **Check permissions** - most arping operations require root privileges
5. **Validate network segments** before using ARP-based tools
6. **Monitor ARP cache** for inconsistencies during troubleshooting
7. **Use duplicate detection** (`-D`) when configuring new IP addresses
8. **Test connectivity** with both ARP and ICMP for comprehensive validation
9. **Document network topology** for effective ARP troubleshooting
10. **Monitor performance** baseline for network health assessment

## Performance Tips

1. **Fast discovery** - Use `-f` flag for quick presence/absence checks
2. **Batch operations** - Combine multiple tests in scripts for efficiency
3. **Interface optimization** - Use the most direct network interface
4. **Timeout tuning** - Adjust `-w` based on network latency
5. **Packet timing** - Use `-i` to control packet rate and avoid flooding
6. **Quiet mode** (`-q`) for performance-critical automated scripts
7. **Broadcast optimization** - Use `-b` for network-wide discovery
8. **Parallel testing** - Run multiple arping processes for large networks
9. **Cache awareness** - Flush ARP cache when testing address changes
10. **Resource monitoring** - Track CPU and network usage during intensive ARP operations

The `arping` command is an essential network diagnostic tool that operates at Layer 2, making it invaluable for local network troubleshooting, duplicate IP detection, and ARP cache management. Its ability to work even when ICMP is blocked makes it a crucial component of any network administrator's toolkit.