---
title: ip - Network Configuration and Routing Tool
sidebar_label: ip
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ip - Network Configuration and Routing Tool

The `ip` command is a powerful network configuration utility that replaces the old `ifconfig` and `route` commands in modern Linux systems. It provides comprehensive control over network interfaces, routing tables, tunnels, and network namespaces. The `ip` command is part of the iproute2 package and offers advanced networking features including policy routing, traffic control, and network device management. It supports both IPv4 and IPv6 configurations and can handle complex network topologies with ease.

## Basic Syntax

```bash
ip [ OPTIONS ] OBJECT { COMMAND | help }
```

## Main Objects

- `link` - Network device configuration
- `addr` - Protocol address management
- `route` - Routing table management
- `rule` - Policy routing rules
- `neighbor` - ARP/NDISC cache entries
- `tunnel` - IP tunnel configuration
- `tuntap` - TUN/TAP device management
- `maddr` - Multicast address management
- `mroute` - Multicast routing cache
- `netns` - Network namespace management

## Common Options

### Global Options
- `-s, -stats` - Show detailed statistics
- `-h, -human, -human-readable` - Human readable output
- `-d, -details` - Show more detailed information
- `-V, -Version` - Show version information
- `-f, -family { inet | inet6 | link }` - Specify protocol family
- `-4` - IPv4 family (shortcut for -f inet)
- `-6` - IPv6 family (shortcut for -f inet6)
- `-o, -oneline` - Display each record on a single line
- `-r, -resolve` - Use system name resolver
- `-n, -numeric` - Don't resolve names
- `-c, -color` - Colorize output
- `-br, -brief` - Brief output

### Link Options
- `up` - Bring interface up
- `down` - Bring interface down
- `name` - Rename interface
- `mtu` - Set MTU size
- `address` - Set MAC address
- `txqueuelen` - Set transmit queue length

### Address Options
- `add` - Add new address
- `del` - Delete address
- `dev` - Specify interface
- `peer` - Point-to-point address
- `broadcast` - Broadcast address
- `label` - Address label
- `scope` - Address scope
- `valid_lft` - Valid lifetime
- `preferred_lft` - Preferred lifetime

## Usage Examples

### Interface Management

#### Displaying Interface Information
```bash
# Show all interfaces
ip link show

# Show specific interface
ip link show eth0

# Brief interface information
ip -br link show

# Show interface statistics
ip -s link show eth0

# Show human-readable statistics
ip -stats -human link show

# Detailed interface information
ip -details link show
```

#### Configuring Interfaces
```bash
# Bring interface up
ip link set eth0 up

# Bring interface down
ip link set eth0 down

# Set interface MTU
ip link set eth0 mtu 1500

# Set MAC address
ip link set eth0 address 00:11:22:33:44:55

# Rename interface
ip link set eth0 name lan0

# Set promiscuous mode
ip link set eth0 promisc on

# Disable promiscuous mode
ip link set eth0 promisc off

# Set txqueuelen
ip link set eth0 txqueuelen 1000

# Set alias for interface
ip link set eth0 alias "Primary Interface"
```

#### Multi-queue Configuration
```bash
# Show number of queues
ip link show eth0 | grep queue

# Set number of receive queues
ip link set eth0 numtxqueues 8

# Set number of transmit queues
ip link set eth0 numrxqueues 8

# Configure RSS (Receive Side Scaling)
ip link set eth0 rss 1
```

### IP Address Management

#### IPv4 Address Configuration
```bash
# Add IPv4 address
ip addr add 192.168.1.100/24 dev eth0

# Add address with label
ip addr add 192.168.1.101/24 dev eth0 label eth0:1

# Add broadcast address
ip addr add 192.168.1.102/24 dev eth0 broadcast 192.168.1.255

# Show all addresses
ip addr show

# Show addresses for specific interface
ip addr show eth0

# Delete IPv4 address
ip addr del 192.168.1.100/24 dev eth0

# Flush all addresses on interface
ip addr flush dev eth0
```

#### IPv6 Address Configuration
```bash
# Add IPv6 address
ip -6 addr add 2001:db8::1/64 dev eth0

# Add link-local IPv6 address
ip -6 addr add fe80::1/64 dev eth0

# Add temporary IPv6 address
ip -6 addr add 2001:db8::2/64 dev eth0 temporary

# Show IPv6 addresses
ip -6 addr show

# Delete IPv6 address
ip -6 addr del 2001:db8::1/64 dev eth0

# Set preferred lifetime
ip -6 addr add 2001:db8::3/64 dev eth0 preferred_lft 3600

# Set valid lifetime
ip -6 addr add 2001:db8::4/64 dev eth0 valid_lft 7200
```

#### Advanced Address Configuration
```bash
# Add address with scope
ip addr add 10.0.0.1/8 dev eth0 scope host

# Add point-to-point address
ip addr add 192.168.100.1 peer 192.168.100.2/32 dev ppp0

# Add secondary address
ip addr add 172.16.1.1/16 dev eth0 secondary

# Show addresses with human-readable format
ip -h addr show

# Show addresses with numeric output
ip -n addr show
```

### Routing Table Management

#### Basic Routing
```bash
# Show routing table
ip route show

# Show default route
ip route show default

# Show routes for specific table
ip route show table main

# Add default route
ip route add default via 192.168.1.1 dev eth0

# Add static route
ip route add 10.0.0.0/24 via 192.168.1.254 dev eth0

# Add route with source
ip route add 172.16.0.0/16 via 10.0.0.1 dev eth0 src 10.0.0.10

# Delete route
ip route del 10.0.0.0/24 via 192.168.1.254 dev eth0

# Flush routing table
ip route flush table main
```

#### Policy Routing
```bash
# Show all routing tables
ip route show table all

# Add custom routing table entry
ip route add 192.168.200.0/24 dev eth1 table 100

# Add rule for policy routing
ip rule add from 192.168.1.0/24 table 100

# Show routing rules
ip rule show

# Delete routing rule
ip rule del from 192.168.1.0/24 table 100

# Add rule based on source address
ip rule add from 10.0.0.0/8 lookup 100

# Add rule based on destination
ip rule add to 172.16.0.0/12 lookup 200

# Add rule with priority
ip rule add priority 32766 from 192.168.2.0/24 table 101
```

#### Advanced Routing Features
```bash
# Add blackhole route
ip route add blackhole 192.168.100.0/24

# Add unreachable route
ip route add unreachable 10.0.100.0/24

# Add prohibit route
ip route add prohibit 172.16.100.0/24

# Add throw route
ip route add throw 192.0.2.0/24

# Multipath routing
ip route add default \
    nexthop via 192.168.1.1 dev eth0 weight 1 \
    nexthop via 192.168.2.1 dev eth1 weight 2

# Show route cache (deprecated in newer kernels)
ip route get 8.8.8.8

# Trace route lookup
ip route get 8.8.8.8 from 192.168.1.100 iif eth0
```

### Neighbor Management

#### ARP Cache Management
```bash
# Show neighbor table
ip neighbor show

# Show neighbors for specific interface
ip neighbor show dev eth0

# Add static ARP entry
ip neighbor add 192.168.1.10 lladdr 00:11:22:33:44:55 dev eth0

# Add permanent ARP entry
ip neighbor add 192.168.1.11 lladdr aa:bb:cc:dd:ee:ff dev eth0 nud permanent

# Delete ARP entry
ip neighbor del 192.168.1.10 dev eth0

# Flush ARP cache
ip neighbor flush dev eth0

# Replace ARP entry
ip neighbor change 192.168.1.10 lladdr 00:11:22:33:44:66 dev eth0
```

#### Neighbor Discovery Options
```bash
# Show IPv6 neighbors
ip -6 neighbor show

# Add static IPv6 neighbor
ip -6 neighbor add 2001:db8::1 lladdr fe80::1 dev eth0

# Set neighbor reachability state
ip neighbor replace 192.168.1.12 lladdr 11:22:33:44:55:66 dev eth0 nud reachable

# Show neighbor statistics
ip -s neighbor show

# Monitor neighbor events
ip monitor neigh
```

### Tunnel Configuration

#### IP-in-IP Tunnels
```bash
# Create IPIP tunnel
ip tunnel add tun0 mode ipip remote 203.0.113.1 local 198.51.100.1 ttl 255

# Bring tunnel up
ip link set tun0 up

# Add IP address to tunnel
ip addr add 10.0.0.1 peer 10.0.0.2/32 dev tun0

# Show tunnel information
ip -d link show tun0

# Delete tunnel
ip tunnel del tun0
```

#### GRE Tunnels
```bash
# Create GRE tunnel
ip tunnel add gre1 mode gre remote 203.0.113.1 local 198.51.100.1 ttl 255

# Create GRE tunnel with key
ip tunnel add gre2 mode gre remote 203.0.113.2 local 198.51.100.2 ttl 255 key 1234

# Create GRE tunnel with P2P
ip tunnel add gre3 mode gre remote 203.0.113.3 local 198.51.100.3 ttl 255 p2p

# Show GRE tunnel details
ip -d -s link show gre1
```

#### IPv6 Tunnels
```bash
# Create SIT (Simple Internet Transition) tunnel
ip tunnel add sit1 mode sit remote 203.0.113.1 local 198.51.100.1 ttl 255

# Create IPv6-in-IPv4 tunnel
ip -6 tunnel add ipip6 mode ipip6 remote 203.0.113.1 local 198.51.100.1

# Create IPv4-in-IPv6 tunnel
ip -6 tunnel add ip4ip6 mode ip4ip6 remote 2001:db8::1 local 2001:db8::2
```

### TUN/TAP Interface Management

#### TAP Interface Creation
```bash
# Create TAP interface
ip tuntap add tap0 mode tap

# Create TAP interface with user ownership
ip tuntap add tap1 mode tap user 1000 group 1000

# Create TAP interface with specific queues
ip tuntap add tap2 mode tap multi_queue

# Bring TAP interface up
ip link set tap0 up

# Assign IP address
ip addr add 192.168.100.1/24 dev tap0

# Delete TAP interface
ip tuntap del tap0 mode tap
```

#### TUN Interface Creation
```bash
# Create TUN interface
ip tuntap add tun1 mode tun

# Create TUN interface with specific name
ip tuntap add vpn0 mode tun user 1000

# Show TUN/TAP interfaces
ip tuntap show

# Show detailed TUN/TAP info
ip -d tuntap show
```

## Advanced Usage

### Network Namespace Management

#### Namespace Operations
```bash
# Create network namespace
ip netns add namespace1

# List namespaces
ip netns list

# Execute command in namespace
ip netns exec namespace1 ip addr show

# Create veth pair and connect to namespace
ip link add veth0 type veth peer name veth1
ip link set veth1 netns namespace1
ip netns exec namespace1 ip link set veth1 name eth0
ip netns exec namespace1 ip link set eth0 up
ip link set veth0 up

# Delete namespace
ip netns delete namespace1

# Show namespace IDs
ip netns identify
```

#### Advanced Namespace Configuration
```bash
# Create namespace with specific name
ip netns add production

# Move interface to namespace
ip link set eth1 netns production

# Configure interface in namespace
ip netns exec production ip addr add 10.0.1.1/24 dev eth1
ip netns exec production ip link set eth1 up

# Add default route in namespace
ip netns exec production ip route add default via 10.0.1.254

# Show processes in namespace
ip netns pids namespace1

# Show all namespace IDs
ip netns list-id
```

### Traffic Control Integration

#### Classless Queuing Disciplines
```bash
# Show qdisc information
ip link show dev eth0

# Add pfifo qdisc
ip qdisc add dev eth0 root pfifo limit 1000

# Add tbf (Token Bucket Filter)
ip qdisc add dev eth0 root tbf rate 1mbit burst 32kbit latency 400ms

# Show qdisc statistics
ip -s qdisc show dev eth0

# Delete qdisc
ip qdisc del dev eth0 root
```

#### Classful Queuing Disciplines
```bash
# Add HTB qdisc
ip qdisc add dev eth0 root handle 1: htb default 30

# Add HTB class
ip class add dev eth0 parent 1: classid 1:1 htb rate 100mbit ceil 100mbit

# Add SFQ qdisc to class
ip qdisc add dev eth0 parent 1:1 handle 10: sfq perturb 10

# Filter traffic to class
ip filter add dev eth0 protocol ip parent 1:0 prio 1 u32 match ip src 10.0.0.0/24 flowid 1:1
```

### Monitoring and Debugging

#### Real-time Monitoring
```bash
# Monitor all ip command events
ip monitor all

# Monitor link events
ip monitor link

# Monitor address events
ip monitor addr

# Monitor route events
ip monitor route

# Monitor neighbor events
ip monitor neigh

# Monitor with timestamps
ip -t monitor link

# Monitor specific events
ip monitor link addr route
```

#### Advanced Diagnostics
```bash
# Show detailed route information
ip route get 8.8.8.8

# Show route lookup from specific source
ip route get 8.8.8.8 from 192.168.1.10

# Show route with TOS
ip route get 8.8.8.8 tos 0x10

# Trace route through multiple tables
ip route get 8.8.8.8 oif eth0

# Show multipath route details
ip route show table all | grep nexthop

# Show routing policy database
ip route show cache

# Show kernel routing cache (deprecated)
ip route get cache
```

## Practical Examples

### Network Configuration Scripts

#### Basic Network Setup
```bash
#!/bin/bash
# Basic network interface configuration

# Configure eth0
ip link set eth0 up
ip addr add 192.168.1.100/24 dev eth0
ip route add default via 192.168.1.1 dev eth0

# Configure eth1 for internal network
ip link set eth1 up
ip addr add 10.0.0.1/24 dev eth1

# Add static route for internal network
ip route add 172.16.0.0/16 via 10.0.0.254 dev eth1

echo "Network configuration completed"
```

#### VLAN Configuration
```bash
#!/bin/bash
# VLAN interface configuration

# Create VLAN interfaces
ip link add link eth0 name eth0.100 type vlan id 100
ip link add link eth0 name eth0.200 type vlan id 200

# Configure VLAN interfaces
ip addr add 192.168.100.1/24 dev eth0.100
ip addr add 192.168.200.1/24 dev eth0.200

# Bring VLAN interfaces up
ip link set eth0.100 up
ip link set eth0.200 up

# Add VLAN routes
ip route add 192.168.100.0/24 dev eth0.100
ip route add 192.168.200.0/24 dev eth0.200
```

#### Bonding Configuration
```bash
#!/bin/bash
# Network bonding setup

# Create bonding interface
ip link add bond0 type bond mode 802.3ad miimon 100

# Add slave interfaces
ip link set eth0 master bond0
ip link set eth1 master bond0

# Configure bonding interface
ip addr add 10.0.0.10/24 dev bond0
ip link set bond0 up

# Show bonding status
cat /proc/net/bonding/bond0
```

### Network Failover Setup

#### Active-Backup Configuration
```bash
#!/bin/bash
# Active-backup network failover

# Create bonding interface
ip link add bond0 type bond mode active-backup miimon 100

# Configure primary interface
ip link set eth0 master bond0
ip link set eth1 master bond0

# Set primary interface
ip link set bond0 type bond primary eth0

# Configure IP
ip addr add 192.168.1.100/24 dev bond0
ip link set bond0 up

# Add default route
ip route add default via 192.168.1.1 dev bond0
```

#### Multipath Routing
```bash
#!/bin/bash
# Configure multipath routing

# Configure interfaces
ip addr add 192.168.1.100/24 dev eth0
ip addr add 192.168.2.100/24 dev eth1

# Add default routes with equal weights
ip route add default \
    nexthop via 192.168.1.1 dev eth0 weight 1 \
    nexthop via 192.168.2.1 dev eth1 weight 1

# Add policy routing rules
ip rule add from 192.168.1.0/24 table 100
ip rule add from 192.168.2.0/24 table 101

# Add table-specific routes
ip route add 0.0.0.0/0 via 192.168.1.1 dev eth0 table 100
ip route add 0.0.0.0/0 via 192.168.2.1 dev eth1 table 101
```

### Container Networking

#### Bridge Configuration
```bash
#!/bin/bash
# Docker-like bridge configuration

# Create bridge
ip link add br0 type bridge

# Configure bridge
ip addr add 172.17.0.1/16 dev br0
ip link set br0 up

# Create veth pairs
for i in {1..3}; do
    ip link add veth${i} type veth peer name eth${i}
    ip link set veth${i} master br0
    ip link set veth${i} up
    ip link set eth${i} up
done

# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward
```

#### Namespace Networking
```bash
#!/bin/bash
# Container network namespace setup

# Create namespace
ip netns add container1

# Create veth pair
ip link add veth0 type veth peer name veth1

# Configure veth interfaces
ip link set veth1 netns container1
ip addr add 10.0.0.1/24 dev veth0
ip link set veth0 up

# Configure namespace
ip netns exec container1 ip addr add 10.0.0.2/24 dev veth1
ip netns exec container1 ip link set veth1 up
ip netns exec container1 ip link set lo up

# Add NAT rules (requires iptables)
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -j MASQUERADE
```

## Troubleshooting

### Common Network Issues

#### Interface Problems
```bash
# Check interface status
ip link show

# Check interface statistics
ip -s link show eth0

# Reset interface configuration
ip link set eth0 down
ip link set eth0 up

# Check for duplicate MAC addresses
ip link show | grep ether

# Verify interface MTU
ip link show dev eth0 | grep mtu
```

#### Address Configuration Issues
```bash
# Show all addresses
ip addr show

# Check for address conflicts
arp -n | grep 192.168.1.100

# Flush problematic addresses
ip addr flush dev eth0

# Reconfigure address
ip addr add 192.168.1.100/24 dev eth0

# Check address scope
ip -d addr show
```

#### Routing Problems
```bash
# Show routing table
ip route show

# Check default route
ip route get 8.8.8.8

# Test route lookup
ip route get 8.8.8.8 from 192.168.1.100

# Show route cache
ip route show cache

# Flush routing table
ip route flush cache

# Verify multiple routing tables
ip route show table all
```

### Performance Monitoring

#### Interface Statistics
```bash
# Show detailed interface stats
ip -s link show

# Monitor interface errors
ip -s link show | grep -i error

# Show traffic counters
cat /proc/net/dev

# Monitor packet drops
ip -s -d link show eth0

# Track interface utilization
watch -n 1 'ip -s link show eth0'
```

#### Route Cache Analysis
```bash
# Show route cache statistics
ip -s route show cache

# Monitor route cache
ip monitor route

# Clear route cache
ip route flush cache

# Show routing table with statistics
ip -stats route show

# Analyze route lookup performance
time ip route get 8.8.8.8
```

## Related Commands

- [`ifconfig`](/docs/commands/network/ifconfig) - Legacy network interface configuration
- [`netstat`](/docs/commands/network/netstat) - Network statistics and connections
- [`ss`](/docs/commands/network/ss) - Socket statistics utility
- [`route`](/docs/commands/network/route) - Legacy routing table management
- [`arp`](/docs/commands/network/arp) - ARP cache management
- [`ethtool`](/docs/commands/network/ethtool) - Ethernet device settings
- [`bridge`](/docs/commands/network/bridge) - Bridge management
- [`tc`](/docs/commands/network/tc) - Traffic control utility
- [`iptables`](/docs/commands/network/iptables) - Packet filtering and NAT

## Best Practices

1. **Use `ip` instead of `ifconfig`** - The `ip` command is the modern standard
2. **Always verify configurations** - Use `ip addr show` and `ip route show` after changes
3. **Use policy routing** for complex network topologies
4. **Implement redundancy** with bonding or multipath routing
5. **Monitor interface statistics** regularly for performance issues
6. **Use network namespaces** for isolation and security
7. **Document your network configuration** with scripts
8. **Test routing changes** in a lab environment first
9. **Use proper address scoping** for multi-homed systems
10. **Implement monitoring** for critical network paths

## Performance Tips

1. **Multipath routing** provides load balancing and redundancy
2. **Traffic shaping** with qdiscs manages bandwidth effectively
3. **Network namespaces** provide isolation without VM overhead
4. **Bonding interfaces** increases throughput and reliability
5. **Tunnel configuration** with proper MTU prevents fragmentation
6. **Policy routing** optimizes traffic for different paths
7. **Monitoring** with `ip monitor` helps track network changes
8. **Route caching** improves lookup performance
9. **Interface offloading** reduces CPU usage
10. **Proper MTU sizing** avoids packet fragmentation and reassembly

The `ip` command is an essential tool for modern Linux network administration, providing comprehensive control over all aspects of network configuration and management. Its extensive feature set makes it suitable for everything from simple desktop networking to complex data center environments with multiple routing tables and policy routing requirements.