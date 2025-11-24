---
title: ip - Show/manipulate routing, devices, policy routing and tunnels
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ip - IP Routing and Network Device Management

The `ip` command is a modern network configuration utility that replaces the older `ifconfig`, `route`, and `arp` commands. It provides comprehensive control over network interfaces, routing tables, tunnels, and policy routing as part of the iproute2 package.

## Basic Syntax

```bash
ip [ OPTIONS ] OBJECT { COMMAND | help }
ip [ -force ] -batch filename
```

## Common Objects

- **link** - Network device configuration
- **addr** - Protocol address configuration
- **route** - Routing table management
- **rule** - Policy routing rules
- **neigh** - Neighbor/ARP table management
- **tunnel** - Tunnel configuration
- **tuntap** - TUN/TAP device management
- **maddress** - Multicast address management
- **mroute** - Multicast routing
- **monitor** - Watch for netlink messages
- **netns** - Network namespace management
- **xfrm** - IPsec policy management

## Global Options

- `-V, -Version` - Display version information
- `-s, -stats, -statistics` - Output more detailed information
- `-d, -details` - Display detailed information
- `-r, -resolve` - Use system name resolver to display DNS names
- `-h, -human, -human-readable` - Output human readable statistics
- `-iec` - Use IEC standard units (KiB, MiB, etc.)
- `-f, -family` - Specify protocol family (inet, inet6, link)
- `-4` - Use IPv4 protocol family
- `-6` - Use IPv6 protocol family
- `-0` - Output each record on single line
- `-o, -oneline` - Output each record on single line
- `-t, -timestamp` - Display timestamp
- `-ts, -tshort` - Short timestamp format
- `-b, -batch` - Read commands from file
- `-a, -all` - Display all objects

## Usage Examples

### Network Interface Management
```bash
# Show all network interfaces
ip link show

# Show detailed interface information
ip -s link show

# Show specific interface
ip link show eth0

# Bring interface up
ip link set eth0 up

# Bring interface down
ip link set eth0 down

# Set interface MTU
ip link set eth0 mtu 9000

# Enable promiscuous mode
ip link set eth0 promisc on

# Disable promiscuous mode
ip link set eth0 promisc off

# Set interface MAC address
ip link set eth0 address 00:11:22:33:44:55

# Rename interface
ip link set eth0 name wan0

# Set interface queue length
ip link set eth0 txqueuelen 1000

# Enable/disable ARP on interface
ip link set eth0 arp on
ip link set eth0 arp off

# Set multicast flag
ip link set eth0 multicast on

# Set interface alias
ip link set eth0 alias "External Interface"
```

### IP Address Management
```bash
# Show all IP addresses
ip addr show

# Show addresses for specific interface
ip addr show eth0

# Add IPv4 address
ip addr add 192.168.1.100/24 dev eth0

# Add IPv6 address
ip addr add 2001:db8::1/64 dev eth0

# Add secondary address
ip addr add 10.0.0.100/24 dev eth0 label eth0:1

# Remove IP address
ip addr del 192.168.1.100/24 dev eth0

# Flush all addresses on interface
ip addr flush dev eth0

# Show addresses in numeric form
ip -n addr show

# Add address with broadcast
ip addr add 192.168.1.100/24 broadcast 192.168.1.255 dev eth0

# Add address with peer
ip addr add 192.168.1.100 peer 192.168.1.101 dev eth0

# Set temporary address
ip addr add 192.168.1.100/24 dev eth0 temporary

# Show address scope
ip addr show scope global
```

### Routing Table Management
```bash
# Show routing table
ip route show

# Show main routing table
ip route show table main

# Show all routing tables
ip route show table all

# Add default route
ip route add default via 192.168.1.1

# Add route for network
ip route add 192.168.2.0/24 via 192.168.1.254 dev eth0

# Add route with specific interface
ip route add 10.0.0.0/8 dev eth1

# Add route with source address
ip route add 192.168.3.0/24 via 192.168.1.254 src 192.168.1.100

# Add route with metric
ip route add 192.168.4.0/24 via 192.168.1.254 metric 100

# Add route with MTU
ip route add 192.168.5.0/24 via 192.168.1.254 mtu 1400

# Delete route
ip route del 192.168.2.0/24

# Delete default route
ip route del default

# Flush routing table
ip route flush table main

# Show route cache
ip route show cache

# Get route for specific destination
ip route get 8.8.8.8

# Get route with details
ip -s route get 8.8.8.8
```

### Neighbor Table (ARP) Management
```bash
# Show neighbor table
ip neigh show

# Show neighbors for specific interface
ip neigh show dev eth0

# Add static ARP entry
ip neigh add 192.168.1.10 lladdr 00:11:22:33:44:55 dev eth0

# Delete ARP entry
ip neigh del 192.168.1.10 dev eth0

# Flush ARP table
ip neigh flush dev eth0

# Show neighbor statistics
ip -s neigh show

# Show reachable neighbors
ip neigh show nud reachable

# Show stale neighbors
ip neigh show nud stale

# Add proxy ARP entry
ip neigh add proxy 192.168.1.100 dev eth0

# Set neighbor entry permanent
ip neigh replace 192.168.1.10 lladdr 00:11:22:33:44:55 dev eth0 nud permanent
```

### Policy Routing
```bash
# Show routing rules
ip rule show

# Add routing rule
ip rule add from 192.168.1.0/24 table 100

# Add rule based on source address
ip rule add from 10.0.0.100 table main

# Add rule based on destination address
ip rule add to 192.168.100.0/24 table 200

# Add rule with priority
ip rule add priority 1000 fwmark 1 table 100

# Delete routing rule
ip rule del from 192.168.1.0/24 table 100

# Flush routing rules
ip rule flush

# Show rule with priorities
ip rule show prio
```

### Tunnel Management
```bash
# Show tunnels
ip tunnel show

# Add GRE tunnel
ip tunnel add gre1 mode gre remote 203.0.113.2 local 198.51.100.1 ttl 255

# Add IPIP tunnel
ip tunnel add ipip1 mode ipip remote 203.0.113.2 local 198.51.100.1

# Add SIT tunnel (IPv6 over IPv4)
ip tunnel add sit1 mode sit remote 203.0.113.2 local 198.51.100.1

# Bring tunnel up
ip link set gre1 up

# Add IP to tunnel
ip addr add 192.168.100.1/30 dev gre1

# Delete tunnel
ip tunnel del gre1

# Show tunnel information
ip -s tunnel show gre1
```

### Network Namespace Management
```bash
# Show network namespaces
ip netns show

# Add network namespace
ip netns add testns

# Delete network namespace
ip netns del testns

# Execute command in namespace
ip netns exec testns ip addr show

# Move interface to namespace
ip netns exec testns ip link set eth0 netns 1

# List processes in namespace
ip netns pids testns

# Monitor namespace events
ip netns monitor
```

### TUN/TAP Device Management
```bash
# Add TUN device
ip tuntap add tun0 mode tun

# Add TAP device
ip tuntap add tap0 mode tap

# Show TUN/TAP devices
ip tuntap show

# Delete TUN/TAP device
ip tuntap del tun0 mode tun

# Set device owner
ip tuntap add tun0 mode tun user 1000

# Set device group
ip tuntap add tun0 mode tun group 1000
```

## Practical Examples

### Network Configuration
```bash
# Configure interface with IP and default route
ip link set eth0 up
ip addr add 192.168.1.100/24 dev eth0
ip route add default via 192.168.1.1

# Configure multiple IP addresses
ip addr add 192.168.1.100/24 dev eth0
ip addr add 192.168.1.101/24 dev eth0
ip addr add 10.0.0.100/24 dev eth0

# Configure interface for DHCP client
ip link set eth0 up
# dhclient would then be run

# Configure bonding interface
ip link add bond0 type bond
ip link set eth0 master bond0
ip link set eth1 master bond0
ip link set bond0 up

# Configure VLAN interface
ip link add link eth0 name eth0.100 type vlan id 100
ip addr add 192.168.100.1/24 dev eth0.100
ip link set eth0.100 up
```

### Network Diagnostics
```bash
# Show detailed interface statistics
ip -s link show

# Check route to destination
ip route get 8.8.8.8

# Show all IP addresses
ip addr show

# Check ARP entries
ip neigh show

# Show routing tables
ip route show table all

# Monitor network changes
ip monitor all

# Check interface configuration
ip -d link show eth0

# Show network namespace configuration
ip netns list
```

### Performance Tuning
```bash
# Set interface MTU for jumbo frames
ip link set eth0 mtu 9000

# Adjust transmit queue length
ip link set eth0 txqueuelen 10000

# Enable GRO/GSO offload
ip link set eth0 gro on
ip link set eth0 gso on

# Set receive side scaling
ip link set eth0 rx offload on

# Configure ring buffer sizes
ethtool -G eth0 rx 4096 tx 4096

# Disable ARP on interface
ip link set eth0 arp off

# Enable/disable multicast
ip link set eth0 multicast on
ip link set eth0 allmulticast on
```

### Complex Network Setup
```bash
# Setup multi-homed server
ip addr add 192.168.1.100/24 dev eth0
ip addr add 10.0.0.100/24 dev eth1
ip route add default via 192.168.1.1 dev eth0
ip route add 10.0.0.0/8 via 10.0.0.1 dev eth1

# Policy routing example
ip rule add from 192.168.1.0/24 table 100
ip route add default via 192.168.1.1 dev eth0 table 100
ip rule add from 10.0.0.0/24 table 200
ip route add default via 10.0.0.1 dev eth1 table 200

# NAT router setup
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i eth1 -j ACCEPT
```

### IPv6 Configuration
```bash
# Add IPv6 address
ip -6 addr add 2001:db8::1/64 dev eth0

# Add IPv6 default route
ip -6 route add default via 2001:db8::1

# Show IPv6 addresses
ip -6 addr show

# Show IPv6 routing table
ip -6 route show

# Add IPv6 router advertisement configuration
sysctl -w net.ipv6.conf.eth0.accept_ra=1
sysctl -w net.ipv6.conf.eth0.forwarding=1
```

## Advanced Features

### Address Labeling
```bash
# Add address label
ip addrlabel add prefix 2001:db8::/32 label 10

# Show address labels
ip addrlabel list

# Delete address label
ip addrlabel del prefix 2001:db8::/32 label 10
```

### Multicast Routing
```bash
# Show multicast routes
ip mroute show

# Add multicast route
ip mroute add 239.1.1.1/32 dev eth0

# Delete multicast route
ip mroute del 239.1.1.1/32 dev eth0
```

### XFRM (IPsec) Management
```bash
# Show IPsec policies
ip xfrm policy show

# Show IPsec states
ip xfrm state show

# Add IPsec policy
ip xfrm policy add src 192.168.1.0/24 dst 10.0.0.0/24 dir out tmpl src 198.51.100.1 dst 203.0.113.2 proto esp mode tunnel

# Add IPsec state
ip xfrm state add src 198.51.100.1 dst 203.0.113.2 proto esp spi 0x1000 enc aes 0x1234567890abcdef1234567890abcdef auth sha1 0x1234567890abcdef1234567890abcdef12345678
```

## Monitoring and Debugging

### Real-time Monitoring
```bash
# Monitor all network events
ip monitor all

# Monitor link events
ip monitor link

# Monitor address events
ip monitor addr

# Monitor route events
ip monitor route

# Monitor neighbor events
ip monitor neigh
```

### Debug Commands
```bash
# Show detailed information
ip -details link show

# Show statistics
ip -statistics link show

# Show human readable output
ip -human link show

# Show timestamped output
ip -timestamp link show

# Batch command execution
ip -batch commands.txt
```

## Integration Examples

### with Other Tools
```bash
# Use with awk for interface parsing
ip link show | awk '/^[0-9]+:/ {print $2}' | tr -d ':'

# Use with grep for filtering
ip addr show | grep 'inet '

# Extract IP addresses
ip addr show eth0 | awk '/inet / {print $2}'

# Count interfaces
ip link show | wc -l

# Find default gateway
ip route show | grep '^default' | awk '{print $3}'
```

## Related Commands

- [`ifconfig`](/docs/commands/network-tools/ifconfig) - Legacy network interface configuration
- [`route`](/docs/commands/network-tools/route) - Legacy routing table manipulation
- [`arp`](/docs/commands/network-tools/arp) - Legacy ARP table manipulation
- [`ss`](/docs/commands/network-tools/ss) - Socket statistics
- [`ethtool`](/docs/commands/network-tools/ethtool) - Ethernet settings configuration
- [`bridge`](/docs/commands/network-tools/bridge) - Bridge configuration

## Best Practices

1. **Use `ip` over legacy commands** for modern Linux systems
2. **Check interface status** before making changes
3. **Use `-s` flag** for detailed statistics when troubleshooting
4. **Backup configurations** before making network changes
5. **Test connectivity** after configuration changes
6. **Use network namespaces** for isolation and testing
7. **Monitor network changes** in production environments
8. **Document complex configurations** for maintainability
9. **Use policy routing** for multi-homed systems
10. **Regularly update network configurations** as requirements change

The `ip` command is the standard tool for modern Linux network configuration, providing comprehensive control over all aspects of network interfaces and routing. It's essential for system administrators and network engineers managing Linux systems.