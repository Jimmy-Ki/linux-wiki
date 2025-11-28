---
title: ipcalc - IP Address Calculator
sidebar_label: ipcalc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ipcalc - IP Address Calculator

The `ipcalc` command is a powerful network administration tool that performs calculations and provides information about IP addresses and networks. It can calculate network addresses, broadcast addresses, subnet masks, and other network parameters. ipcalc supports both IPv4 and IPv6 addresses, making it an essential utility for network administrators, system engineers, and IT professionals who need to work with IP addressing and subnetting.

## Basic Syntax

```bash
ipcalc [OPTIONS] <IP_ADDRESS>[/PREFIX_LENGTH] [NETMASK]
ipcalc [OPTIONS] -c <IP_ADDRESS>...
ipcalc [OPTIONS] -r <IP1> <IP2>
```

## Common Options

### Display Options
- `-c, --check` - Validate IP addresses
- `-4, --ipv4` - Force IPv4 mode
- `-6, --ipv6` - Force IPv6 mode
- `-b, --broadcast` - Display broadcast address
- `-h, --hostname` - Display hostname
- `-n, --network` - Display network address
- `-p, --prefix` - Display prefix length
- `-m, --netmask` - Display netmask
- `-s, --silent` - Silent mode
- `-v, --verbose` - Verbose output

### Calculation Options
- `-r, --range` - Calculate range between two IPs
- `-d, --deaggregate` - Deaggregate address ranges
- `--split` - Split network into subnets
- `--info` - Show detailed information

### IPv6 Specific Options
- `-i, --info` - Show IPv6 address info
- `--geoinfo` - Show geographic information

## Usage Examples

### Basic IPv4 Calculations

#### Network Information
```bash
# Calculate basic network information
ipcalc 192.168.1.100/24

# Output:
# Address:   192.168.1.100
# Netmask:   255.255.255.0   = 24
# Wildcard:  0.0.0.255
# Network:   192.168.1.0/24
# HostMin:   192.168.1.1
# HostMax:   192.168.1.254
# Broadcast: 192.168.1.255
# Hosts/Net: 254

# Calculate with specific netmask
ipcalc 10.0.5.50 255.255.0.0

# Output:
# Address:   10.0.5.50
# Netmask:   255.255.0.0   = 16
# Wildcard:  0.0.255.255
# Network:   10.0.0.0/16
# HostMin:   10.0.0.1
# HostMax:   10.0.255.254
# Broadcast: 10.0.255.255
# Hosts/Net: 65534
```

#### Specific Information Display
```bash
# Show only network address
ipcalc -n 192.168.1.100/24
# Output: 192.168.1.0

# Show only broadcast address
ipcalc -b 192.168.1.100/24
# Output: 192.168.1.255

# Show only netmask
ipcalc -m 192.168.1.100/24
# Output: 255.255.255.0

# Show only prefix length
ipcalc -p 192.168.1.100 255.255.255.0
# Output: 24

# Show hostname for IP
ipcalc -h 8.8.8.8
# Output: dns.google
```

### IPv6 Address Calculations

#### Basic IPv6 Information
```bash
# Calculate IPv6 network information
ipcalc -6 2001:db8::1/64

# Output:
# Address:   2001:db8::1
# Network:   2001:db8::/64
# HostMin:   2001:db8::
# HostMax:   2001:db8::ffff:ffff:ffff:ffff
# Hosts/Net: 2^64

# IPv6 address info
ipcalc -6 -i 2001:db8:85a3::8a2e:370:7334

# Output includes expanded form, compressed form, and type
```

#### IPv6 Specific Features
```bash
# Show detailed IPv6 information
ipcalc -6 --info 2001:db8::1

# Geographic information (if available)
ipcalc --geoinfo 8.8.8.8
```

### IP Address Validation

#### Validate IP Addresses
```bash
# Validate single IP address
ipcalc -c 192.168.1.1
# Output: 192.168.1.1 is valid

# Validate multiple IP addresses
ipcalc -c 192.168.1.1 10.0.0.1 256.1.1.1

# Output:
# 192.168.1.1 is valid
# 10.0.0.1 is valid
# 256.1.1.1 is invalid

# Silent validation (exit code only)
ipcalc -cs 192.168.1.1
echo $?  # 0 = valid, 1 = invalid
```

#### Batch Validation
```bash
# Validate IPs from file
while read ip; do
    ipcalc -c "$ip"
done < ip_list.txt

# Count valid/invalid IPs
valid=0
invalid=0
while read ip; do
    if ipcalc -cs "$ip"; then
        ((valid++))
    else
        ((invalid++))
    fi
done < ip_list.txt
echo "Valid: $valid, Invalid: $invalid"
```

### Range Calculations

#### IP Range Analysis
```bash
# Calculate range between two IPs
ipcalc -r 192.168.1.1 192.168.1.100

# Output shows all IPs in range and network information

# Find networks that cover a range
ipcalc -r 10.0.0.0 10.0.3.255
# Output: 10.0.0.0/22
```

#### Network Range Calculations
```bash
# Calculate network ranges for subnets
ipcalc 192.168.1.0/28

# Output:
# Address:   192.168.1.0
# Netmask:   255.255.255.240   = 28
# Wildcard:  0.0.0.15
# Network:   192.168.1.0/28
# HostMin:   192.168.1.1
# HostMax:   192.168.1.14
# Broadcast: 192.168.1.15
# Hosts/Net: 14
```

### Advanced Calculations

#### Subnet Planning
```bash
# Plan different subnet sizes
echo "Class C Network Subnets:"
for prefix in 25 26 27 28 29 30; do
    echo "/$prefix subnet:"
    ipcalc 192.168.1.0/$prefix | grep "Hosts/Net"
done

# Output:
# /25 subnet: Hosts/Net: 126
# /26 subnet: Hosts/Net: 62
# /27 subnet: Hosts/Net: 30
# /28 subnet: Hosts/Net: 14
# /29 subnet: Hosts/Net: 6
# /30 subnet: Hosts/Net: 2
```

#### Network Design
```bash
# Design network with specific host requirements
hosts_needed=100
network=10.0.0.0

echo "Network design for $hosts_needed hosts:"
for prefix in {24..30}; do
    max_hosts=$(ipcalc $network/$prefix | grep "Hosts/Net" | awk '{print $3}')
    if [ "$max_hosts" -ge "$hosts_needed" ]; then
        echo "Use /$prefix prefix (supports $max_hosts hosts)"
        break
    fi
done
```

### IPv4 to IPv6 Mapping

#### IPv4-mapped IPv6 Addresses
```bash
# Convert IPv4 to IPv6 mapped address
ipv4="192.168.1.1"
ipv6=$(printf "2002:%02x%02x:%02x%02x::" \
    $(echo $ipv4 | tr '.' ' '))
echo "IPv6 mapped address: $ipv6"

# Calculate IPv6 network for IPv4 mapped address
ipcalc -6 "$ipv6/32"
```

## Practical Examples

### Network Administration

#### Subnet Allocation Planning
```bash
#!/bin/bash
# Network subnet planning script

NETWORK="192.168.0.0"
SUBNETS=(
    "Engineering:50"
    "Marketing:30"
    "Finance:20"
    "Guest:100"
)

echo "Network allocation plan for $NETWORK/16"
echo "====================================="

total_used=0
for subnet in "${SUBNETS[@]}"; do
    IFS=':' read -r department hosts <<< "$subnet"

    # Find appropriate prefix length
    for prefix in {24..30}; do
        max_hosts=$(ipcalc $NETWORK.$prefix | grep "Hosts/Net" | awk '{print $3}')
        if [ "$max_hosts" -ge "$hosts" ]; then
            echo "$department: /$prefix (max $max_hosts hosts, need $hosts)"
            total_used=$((total_used + max_hosts))
            break
        fi
    done
done

echo "Total hosts allocated: $total_used"
```

#### IP Address Management
```bash
#!/bin/bash
# IP address range management

BASE_NETWORK="10.1.0.0"
SUBNET_SIZE=24

# Calculate all possible /24 subnets
echo "Available subnets in $BASE_NETWORK/16:"
for i in {0..255}; do
    subnet="$BASE_NETWORK.$i.0/$SUBNET_SIZE"
    info=$(ipcalc $subnet)
    network=$(echo "$info" | grep "Network:" | awk '{print $2}')
    broadcast=$(echo "$info" | grep "Broadcast:" | awk '{print $2}')
    hosts=$(echo "$info" | grep "Hosts/Net:" | awk '{print $3}')

    printf "Subnet %3d: %-15s Broadcast: %-15s Hosts: %s\n" \
        "$i" "$network" "$broadcast" "$hosts"
done
```

### Network Troubleshooting

#### IP Conflict Detection
```bash
#!/bin/bash
# Network conflict detection script

check_ip_conflict() {
    local ip1="$1"
    local ip2="$2"

    network1=$(ipcalc -n "$ip1/24")
    network2=$(ipcalc -n "$ip2/24")

    if [ "$network1" = "$network2" ]; then
        echo "WARNING: $ip1 and $ip2 are in the same network: $network1"
        return 0
    else
        echo "OK: $ip1 ($network1) and $ip2 ($network2) are in different networks"
        return 1
    fi
}

# Check multiple IPs
check_ip_conflict "192.168.1.10" "192.168.1.20"
check_ip_conflict "192.168.1.10" "10.0.0.5"
```

#### Network Connectivity Testing
```bash
#!/bin/bash
# Network connectivity and configuration testing

test_network_config() {
    local ip="$1"
    local gateway="$2"
    local dns="$3"

    echo "Testing network configuration:"
    echo "IP: $ip"
    echo "Gateway: $gateway"
    echo "DNS: $dns"
    echo "--------------------------------"

    # Validate IP addresses
    for addr in "$ip" "$gateway" "$dns"; do
        if ipcalc -c "$addr"; then
            echo "✓ $addr is valid"
        else
            echo "✗ $addr is invalid"
            return 1
        fi
    done

    # Check if IP and gateway are in same network
    ip_network=$(ipcalc -n "$ip/24")
    gw_network=$(ipcalc -n "$gateway/24")

    if [ "$ip_network" = "$gw_network" ]; then
        echo "✓ IP and Gateway are in same network: $ip_network"
    else
        echo "✗ IP ($ip_network) and Gateway ($gw_network) are in different networks"
    fi
}

test_network_config "192.168.1.100" "192.168.1.1" "8.8.8.8"
```

### Server and Infrastructure Setup

#### Web Server Network Planning
```bash
#!/bin/bash
# Web server network planning script

PUBLIC_IP="203.0.113.10"
PRIVATE_NETWORK="10.0.1.0"

echo "Web Server Network Configuration"
echo "================================"

# Public network calculation
echo "Public IP Information:"
ipcalc "$PUBLIC_IP/28"

echo -e "\nPrivate Network Information:"
ipcalc "$PRIVATE_NETWORK/24"

# Calculate required IP addresses
echo -e "\nIP Allocation:"
echo "Web Server: $PUBLIC_IP"
echo "Database Server: 10.0.1.10"
echo "Application Server: 10.0.1.20"
echo "Load Balancer: 10.0.1.5"

# Validate network connectivity
for ip in "$PUBLIC_IP" "10.0.1.10" "10.0.1.20" "10.0.1.5"; do
    if ipcalc -c "$ip"; then
        echo "✓ $ip is valid"
    else
        echo "✗ $ip is invalid"
    fi
done
```

#### Firewall Rule Planning
```bash
#!/bin/bash
# Firewall rule planning based on network calculations

INTERNAL_NET="192.168.100.0/24"
DMZ_NET="192.168.200.0/24"
EXTERNAL_NET="203.0.113.0/28"

echo "Firewall Rule Planning"
echo "======================"

for net in "$INTERNAL_NET" "$DMZ_NET" "$EXTERNAL_NET"; do
    echo -e "\nNetwork: $net"
    ipcalc "$net" | grep -E "(Network|Netmask|Broadcast|HostMin|HostMax)"
done

echo -e "\nRecommended Rules:"
echo "ALLOW INTERNAL -> DMZ: $(ipcalc -n $INTERNAL_NET) -> $(ipcalc -n $DMZ_NET)"
echo "ALLOW DMZ -> EXTERNAL: $(ipcalc -n $DMZ_NET) -> $(ipcalc -n $EXTERNAL_NET)"
echo "DENY EXTERNAL -> INTERNAL: $(ipcalc -n $EXTERNAL_NET) -> $(ipcalc -n $INTERNAL_NET)"
```

## Advanced Usage

### Network Calculations

#### VLSM (Variable Length Subnet Masking)
```bash
#!/bin/bash
# Variable Length Subnet Masking calculator

BASE_NETWORK="172.16.0.0/16"

# Department requirements
declare -A departments=(
    ["Engineering"]=500
    ["Marketing"]=200
    ["Sales"]=100
    ["HR"]=50
    ["IT"]=25
)

echo "VLSM Subnet Allocation for $BASE_NETWORK"
echo "========================================="

current_ip="172.16.0.0"
total_allocated=0

for dept in "${!departments[@]}"; do
    required="${departments[$dept]}"

    # Find minimum prefix that can accommodate required hosts
    for prefix in {16..30}; do
        max_hosts=$(ipcalc "$current_ip/$prefix" | grep "Hosts/Net:" | awk '{print $3}')
        if [ "$max_hosts" -ge "$required" ]; then
            echo "$dept: $current_ip/$prefix (Required: $required, Available: $max_hosts)"

            # Calculate next available network
            current_ip=$(ipcalc "$current_ip/$prefix" | grep "Network:" | awk '{print $2}')
            block_size=$((2**(32-prefix)))

            # Convert to decimal and add block size
            IFS='.' read -r a b c d <<< "$current_ip"
            d=$((d + block_size))

            # Handle carry-over
            if [ "$d" -ge 256 ]; then
                d=$((d % 256))
                c=$((c + 1))
                if [ "$c" -ge 256 ]; then
                    c=$((c % 256))
                    b=$((b + 1))
                fi
            fi

            current_ip="$a.$b.$c.$d"
            total_allocated=$((total_allocated + max_hosts))
            break
        fi
    done
done

echo "Total IPs allocated: $total_allocated"
```

#### IP Address Conservation Analysis
```bash
#!/bin/bash
# IP address conservation analysis

analyze_network_efficiency() {
    local network="$1"
    local used_hosts="$2"

    local info=$(ipcalc "$network")
    local max_hosts=$(echo "$info" | grep "Hosts/Net:" | awk '{print $3}')
    local利用率=$((used_hosts * 100 / max_hosts))

    echo "Network: $network"
    echo "Used hosts: $used_hosts"
    echo "Maximum hosts: $max_hosts"
    echo "Utilization: ${利用率}%"

    if [ "$利用率" -lt 50 ]; then
        echo "Status: LOW utilization - consider smaller subnet"
    elif [ "$利用率" -gt 80 ]; then
        echo "Status: HIGH utilization - consider larger subnet"
    else
        echo "Status: GOOD utilization"
    fi
    echo "--------------------------------"
}

# Analyze different network scenarios
analyze_network_efficiency "192.168.1.0/24" 50
analyze_network_efficiency "10.0.0.0/16" 2000
analyze_network_efficiency "172.16.0.0/20" 1000
```

### Integration with Other Tools

#### Network Discovery Integration
```bash
#!/bin/bash
# Network discovery with ipcalc integration

discover_network() {
    local network="$1"

    echo "Discovering network: $network"

    # Get network information
    local net_info=$(ipcalc "$network")
    local hostmin=$(echo "$net_info" | grep "HostMin:" | awk '{print $2}')
    local hostmax=$(echo "$net_info" | grep "HostMax:" | awk '{print $2}')

    echo "Scanning from $hostmin to $hostmax"

    # Convert to numeric range for scanning
    IFS='.' read -r a1 b1 c1 d1 <<< "$hostmin"
    IFS='.' read -r a2 b2 c2 d2 <<< "$hostmax"

    # Simple ping scan (first 10 IPs as example)
    for ((i=0; i<10; i++)); do
        current_ip="$a1.$b1.$c1.$((d1 + i))"
        if ping -c 1 -W 1 "$current_ip" >/dev/null 2>&1; then
            echo "Host found: $current_ip"
            # Additional analysis can be added here
        fi
    done
}

discover_network "192.168.1.0/24"
```

#### DNS and Network Configuration
```bash
#!/bin/bash
# DNS configuration with network validation

setup_reverse_dns() {
    local ip="$1"
    local hostname="$2"

    # Validate IP address
    if ! ipcalc -c "$ip"; then
        echo "Error: Invalid IP address $ip"
        return 1
    fi

    # Get network information for reverse DNS
    local net_info=$(ipcalc "$ip/24")
    local network=$(echo "$net_info" | grep "Network:" | awk '{print $2}')
    local rev_zone=$(echo "$network" | awk -F. '{print $3"."$2"."$1".in-addr.arpa"}')

    echo "Reverse DNS Configuration:"
    echo "IP: $ip"
    echo "Hostname: $hostname"
    echo "Reverse Zone: $rev_zone"

    # Generate BIND reverse DNS entry
    local last_octet=$(echo "$ip" | awk -F. '{print $4}')
    echo "BIND record: $last_octet IN PTR $hostname."

    # Check if hostname resolves to IP
    if nslookup "$hostname" >/dev/null 2>&1; then
        resolved_ip=$(nslookup "$hostname" | grep -A1 "Name:" | tail -1 | awk '{print $2}')
        if [ "$resolved_ip" = "$ip" ]; then
            echo "✓ Forward DNS confirmed: $hostname -> $ip"
        else
            echo "✗ Forward DNS mismatch: $hostname -> $resolved_ip (expected $ip)"
        fi
    else
        echo "✗ Forward DNS not found for $hostname"
    fi
}

setup_reverse_dns "192.168.1.100" "server.example.com"
```

## Troubleshooting

### Common Issues

#### Invalid IP Address Formats
```bash
# Common invalid formats and fixes
invalid_ips=("256.1.1.1" "192.168.1" "192.168.1.300" "abc.def.ghi.jkl")

for ip in "${invalid_ips[@]}"; do
    echo "Testing: $ip"
    if ipcalc -c "$ip"; then
        echo "✓ Valid"
    else
        echo "✗ Invalid IP address format"
        # Provide suggestions for common errors
        if [[ "$ip" =~ \. ]]; then
            octets=(${ip//./ })
            echo "  IP has ${#octets[@]} octets (need 4)"
            for i in "${!octets[@]}"; do
                if [[ "${octets[$i]}" =~ ^[0-9]+$ ]]; then
                    if [ "${octets[$i]}" -gt 255 ]; then
                        echo "  Octet $((i+1)) (${octets[$i]}) exceeds 255"
                    fi
                else
                    echo "  Octet $((i+1)) (${octets[$i]}) is not numeric"
                fi
            done
        fi
    fi
    echo "--------------------------------"
done
```

#### Network Calculation Errors
```bash
#!/bin/bash
# Debug network calculation issues

debug_network_calc() {
    local input="$1"

    echo "Debugging network calculation for: $input"

    # Check if it's a valid format
    if [[ "$input" =~ / ]]; then
        ip="${input%/*}"
        prefix="${input#*/}"

        echo "IP address: $ip"
        echo "Prefix length: $prefix"

        # Validate IP
        if ipcalc -c "$ip"; then
            echo "✓ IP address is valid"
        else
            echo "✗ IP address is invalid"
            return 1
        fi

        # Validate prefix
        if [ "$prefix" -ge 0 ] && [ "$prefix" -le 32 ]; then
            echo "✓ Prefix length is valid"
        else
            echo "✗ Prefix length must be between 0 and 32"
            return 1
        fi

        # Perform calculation
        echo "Network calculation:"
        ipcalc "$input"
    else
        echo "No prefix specified, assuming /32"
        ipcalc "$input/32"
    fi
}

debug_network_calc "192.168.1.100/24"
debug_network_calc "256.1.1.1/24"
debug_network_calc "192.168.1.100/33"
```

#### Performance Issues
```bash
# Batch processing optimization for large IP lists
process_large_ip_list() {
    local input_file="$1"
    local output_file="$2"

    echo "Processing large IP list from $input_file"

    # Process in batches for better performance
    batch_size=1000
    batch_num=1

    > "$output_file"  # Clear output file

    while IFS= read -r ip; do
        # Process batch
        if ((batch_num % batch_size == 0)); then
            echo "Processed $batch_num IPs..."
        fi

        # Validate IP
        if ipcalc -cs "$ip"; then
            echo "$ip: VALID" >> "$output_file"
        else
            echo "$ip: INVALID" >> "$output_file"
        fi

        ((batch_num++))
    done < "$input_file"

    echo "Completed processing $((batch_num - 1)) IP addresses"

    # Summary statistics
    valid_count=$(grep -c "VALID" "$output_file")
    invalid_count=$(grep -c "INVALID" "$output_file")
    total_count=$((valid_count + invalid_count))

    echo "Summary:"
    echo "Total processed: $total_count"
    echo "Valid IPs: $valid_count"
    echo "Invalid IPs: $invalid_count"
    echo "Success rate: $((valid_count * 100 / total_count))%"
}
```

## Related Commands

- [`ip`](/docs/commands/system/ip) - Show and manipulate routing and network devices
- [`ifconfig`](/docs/commands/network/ifconfig) - Configure network interfaces
- [`netstat`](/docs/commands/network/netstat) - Network connections and statistics
- [`route`](/docs/commands/network/route) - Show and manipulate routing tables
- [`ping`](/docs/commands/network/ping) - Send ICMP ECHO_REQUEST to network hosts
- [`traceroute`](/docs/commands/network/traceroute) - Print route packets trace
- [`dig`](/docs/commands/network/dig) - DNS lookup utility
- [`nslookup`](/docs/commands/network/nslookup) - Query internet name servers
- [`hostname`](/docs/commands/system/hostname) - Show or set system host name
- [`ssh`](/docs/commands/network/ssh) - OpenSSH SSH client

## Best Practices

1. **Always validate IP addresses** before using them in configurations
2. **Use appropriate subnet sizes** to avoid IP address waste
3. **Document network allocations** using ipcalc output
4. **Plan network growth** by considering future requirements
5. **Use VLSM** for efficient IP address allocation
6. **Test network configurations** in lab environments before deployment
7. **Keep network diagrams updated** with calculated subnet information
8. **Monitor IP address utilization** regularly
9. **Use IPv6** for new deployments when possible
10. **Implement proper IP address management** policies

## Performance Tips

1. **Batch operations** when processing multiple IP addresses
2. **Use silent mode** (-s) in scripts when you only need exit codes
3. **Cache calculations** for frequently used networks
4. **Use specific options** (-n, -b, -m) when you only need specific information
5. **Combine with other tools** for comprehensive network analysis
6. **Script common calculations** to avoid manual errors
7. **Use appropriate prefix lengths** for your specific needs
8. **Consider network overlap** when planning multiple subnets
9. **Validate input parameters** before processing
10. **Use parallel processing** for large-scale IP address validation

The `ipcalc` command is an indispensable tool for network administrators and IT professionals working with IP addressing and network design. Its ability to perform complex subnet calculations, validate IP addresses, and provide detailed network information makes it essential for network planning, troubleshooting, and management tasks. Whether you're designing a new network infrastructure, managing existing subnets, or troubleshooting connectivity issues, ipcalc provides the computational accuracy and detailed information needed for effective network administration.