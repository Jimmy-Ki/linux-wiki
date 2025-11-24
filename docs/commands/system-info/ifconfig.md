---
title: ifconfig - Network Interface Configuration
sidebar_label: ifconfig
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ifconfig - Network Interface Configuration

The `ifconfig` command is a legacy network interface configuration utility used to configure and display network interface parameters in Linux. While largely superseded by the modern `ip` command, it remains available on many systems and is useful for basic network configuration tasks.

## Basic Syntax

```bash
ifconfig [interface] [address] [options]
ifconfig [interface] [options]
ifconfig -a
```

## Common Options

### Interface Control
- `up` - Activate the specified network interface
- `down` - Deactivate the specified network interface
- `interface` - Name of the network interface (e.g., eth0, wlan0)

### Address Configuration
- `address` - IP address to assign to the interface
- `netmask mask` - Set the network mask
- `broadcast address` - Set the broadcast address
- `pointopoint address` - Set point-to-point address
- `add address/prefix` - Add IPv6 address
- `del address/prefix` - Delete IPv6 address

### Hardware Configuration
- `hw class address` - Set hardware address (MAC address)
- `mtu size` - Set Maximum Transmission Unit
- `metric number` - Set interface metric
- `txqueuelen length` - Set transmit queue length

### Protocol Options
- `arp` - Enable ARP protocol on the interface
- `-arp` - Disable ARP protocol on the interface
- `promisc` - Enable promiscuous mode
- `-promisc` - Disable promiscuous mode
- `allmulti` - Enable all-multicast mode
- `-allmulti` - Disable all-multicast mode
- `multicast` - Enable multicast
- `-multicast` - Disable multicast

### Display Options
- `-a` - Show all interfaces (including inactive ones)
- `-s` - Display short output
- `-v` - Verbose mode

## Usage Examples

### Basic Interface Display
```bash
# Show all active interfaces
ifconfig

# Show all interfaces (active and inactive)
ifconfig -a

# Show specific interface
ifconfig eth0

# Show interface in short format
ifconfig -s eth0

# Verbose output
ifconfig -v eth0
```

### Interface Configuration
```bash
# Configure interface with IP address
ifconfig eth0 192.168.1.100

# Configure with IP and netmask
ifconfig eth0 192.168.1.100 netmask 255.255.255.0

# Configure with IP, netmask, and broadcast
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 broadcast 192.168.1.255

# Configure interface using CIDR notation
ifconfig eth0 192.168.1.100/24
```

### IPv6 Configuration
```bash
# Add IPv6 address
ifconfig eth0 add 2001:db8::1/64

# Delete IPv6 address
ifconfig eth0 del 2001:db8::1/64

# Add link-local IPv6 address
ifconfig eth0 add fe80::1/64
```

### Interface Control
```bash
# Bring interface up
ifconfig eth0 up

# Take interface down
ifconfig eth0 down

# Reset interface
ifconfig eth0 down
ifconfig eth0 up

# Check interface status
ifconfig eth0 | grep UP
```

### Hardware Configuration
```bash
# Change MAC address
ifconfig eth0 hw ether 00:11:22:33:44:55

# Set MTU size (for jumbo frames)
ifconfig eth0 mtu 9000

# Set interface metric
ifconfig eth0 metric 1

# Set transmit queue length
ifconfig eth0 txqueuelen 1000

# Set interface IRQ
ifconfig eth0 irq 10
```

### Special Configurations
```bash
# Configure point-to-point interface
ifconfig ppp0 192.168.1.100 pointopoint 192.168.1.1

# Configure loopback interface
ifconfig lo 127.0.0.1

# Configure alias interface
ifconfig eth0:1 192.168.1.101

# Configure with no broadcast
ifconfig eth0 192.168.1.100 -broadcast
```

### Protocol Controls
```bash
# Enable ARP
ifconfig eth0 arp

# Disable ARP
ifconfig eth0 -arp

# Enable promiscuous mode (for packet sniffing)
ifconfig eth0 promisc

# Disable promiscuous mode
ifconfig eth0 -promisc

# Enable all-multicast mode
ifconfig eth0 allmulti

# Disable all-multicast mode
ifconfig eth0 -allmulti
```

## Practical Examples

### Basic Network Setup
```bash
# Configure basic network interface
ifconfig eth0 192.168.1.100 netmask 255.255.255.0

# Set default route (using route command)
route add default gw 192.168.1.1

# Test configuration
ifconfig eth0
ping 192.168.1.1
```

### Multiple IP Addresses
```bash
# Primary address
ifconfig eth0 192.168.1.100 netmask 255.255.255.0

# Secondary address (alias)
ifconfig eth0:1 192.168.1.101 netmask 255.255.255.0

# Third address
ifconfig eth0:2 192.168.1.102 netmask 255.255.255.0

# Show all interfaces including aliases
ifconfig -a
```

### Temporary Configuration Changes
```bash
# Change IP temporarily
ifconfig eth0 192.168.1.200

# Restore original IP
ifconfig eth0 192.168.1.100

# Test connectivity after change
ping -c 4 8.8.8.8
```

### Network Troubleshooting
```bash
# Check interface status
ifconfig eth0

# Bring interface up if down
ifconfig eth0 | grep -q UP || ifconfig eth0 up

# Check if interface is running
ifconfig eth0 | grep RUNNING

# Check for errors
ifconfig eth0 | grep -E "errors|dropped|overruns"
```

### IPv6 Configuration
```bash
# Add global IPv6 address
ifconfig eth0 add 2001:db8::1/64

# Add link-local address
ifconfig eth0 add fe80::1/64

# Show IPv6 configuration
ifconfig eth0 | grep inet6

# Test IPv6 connectivity
ping6 -c 4 2001:4860:4860::8888
```

### Interface Performance Tuning
```bash
# Set large MTU for jumbo frames
ifconfig eth0 mtu 9000

# Increase transmit queue length
ifconfig eth0 txqueuelen 10000

# Set interface metric for routing
ifconfig eth0 metric 10

# Check interface statistics
ifconfig eth0 | grep -E "RX|TX"
```

### Security Configuration
```bash
# Disable ARP (for security)
ifconfig eth0 -arp

# Enable promiscuous mode for monitoring
ifconfig eth0 promisc

# Configure stealth interface
ifconfig eth0 0.0.0.0 up

# Restore normal operation
ifconfig eth0 -promisc arp
```

### Virtual Interface Configuration
```bash
# Configure VLAN-like behavior with aliases
ifconfig eth0:0 192.168.1.100 netmask 255.255.255.0
ifconfig eth0:1 192.168.2.100 netmask 255.255.255.0
ifconfig eth0:2 192.168.3.100 netmask 255.255.255.0

# Show all configurations
ifconfig -a | grep eth0
```

## Understanding Output

### Interface Status Fields
```bash
eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:1E:51
          inet addr:10.160.7.81  Bcast:10.160.15.255  Mask:255.255.240.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:61430830 errors:0 dropped:0 overruns:0 frame:0
          TX packets:88534 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:3607197869 (3.3 GiB)  TX bytes:6115042 (5.8 MiB)
```

Field explanations:
- **Link encap** - Link layer encapsulation type
- **HWaddr** - Hardware (MAC) address
- **inet addr** - IPv4 address
- **Bcast** - Broadcast address
- **Mask** - Subnet mask
- **UP** - Interface is administratively up
- **BROADCAST** - Interface supports broadcast
- **RUNNING** - Interface carrier is detected
- **MULTICAST** - Interface supports multicast
- **MTU** - Maximum Transmission Unit
- **Metric** - Interface metric for routing
- **RX packets** - Received packet count
- **TX packets** - Transmitted packet count
- **errors** - Packet errors
- **dropped** - Dropped packets
- **overruns** - Buffer overruns
- **frame** - Frame alignment errors
- **carrier** - Carrier errors
- **collisions** - Collision count
- **txqueuelen** - Transmit queue length
- **RX bytes** - Bytes received
- **TX bytes** - Bytes transmitted

## Advanced Configuration

### Bridge Configuration
```bash
# Create bridge (using brctl, but ifconfig for interfaces)
ifconfig eth0 0.0.0.0 up
ifconfig eth1 0.0.0.0 up
brctl addbr br0
brctl addif br0 eth0
brctl addif br0 eth1
ifconfig br0 192.168.1.100 up
```

### Bonding Preparation
```bash
# Prepare interfaces for bonding
ifconfig eth0 0.0.0.0 up
ifconfig eth1 0.0.0.0 up
# Then use bonding driver configuration
```

### Tunnel Interface Configuration
```bash
# Configure GRE tunnel (requires kernel support)
ifconfig gre0 up
ifconfig gre0 192.168.100.1 pointopoint 192.168.100.2
```

## Scripting Examples

### Network Status Check
```bash
#!/bin/bash
# Check network interface status

interfaces=$(ifconfig -a | grep -E "^[a-zA-Z]" | awk '{print $1}')

for interface in $interfaces; do
    echo "=== $interface ==="
    ifconfig $interface
    echo
done
```

### Interface Configuration Script
```bash
#!/bin/bash
# Configure network interface

INTERFACE=$1
IP=$2
NETMASK=$3
GATEWAY=$4

if [ $# -lt 3 ]; then
    echo "Usage: $0 <interface> <ip> <netmask> [gateway]"
    exit 1
fi

echo "Configuring $interface with IP $IP"

# Configure interface
ifconfig $INTERFACE $IP netmask $NETMASK up

# Set gateway if provided
if [ ! -z "$GATEWAY" ]; then
    route add default gw $GATEWAY
fi

echo "Configuration complete"
ifconfig $INTERFACE
```

## Common Issues and Solutions

### Interface Not Found
```bash
# Check available interfaces
ifconfig -a

# Load network module if needed
modprobe e1000  # for Intel cards
```

### Permission Denied
```bash
# Use sudo for configuration
sudo ifconfig eth0 192.168.1.100

# Check if running as root
if [ $(id -u) -ne 0 ]; then
    echo "Must be root to configure interfaces"
fi
```

### Configuration Not Persisting
```bash
# Save configuration in /etc/network/interfaces (Debian/Ubuntu)
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1

# Or use /etc/sysconfig/network-scripts/ifcfg-eth0 (RHEL/CentOS)
```

## Related Commands

- [`ip`](/docs/commands/network-tools/ip) - Modern network interface configuration
- [`ethtool`](/docs/commands/network-tools/ethtool) - Ethernet settings configuration
- [`mii-tool`](/docs/commands/network-tools/mii-tool) - Media Independent Interface tool
- [`route`](/docs/commands/network-tools/route) - Display and manipulate routing tables
- [`arp`](/docs/commands/network-tools/arp) - Display and manipulate ARP cache
- [`netstat`](/docs/commands/network-tools/netstat) - Network statistics
- [`ss`](/docs/commands/network-tools/ss) - Socket statistics

## Migration to ip command

Since `ifconfig` is deprecated, here are common equivalent commands:

```bash
# Show interfaces
ifconfig                    # → ip link show

# Show specific interface
ifconfig eth0               # → ip addr show eth0

# Configure IP address
ifconfig eth0 192.168.1.100 netmask 255.255.255.0
                           # → ip addr add 192.168.1.100/24 dev eth0

# Bring interface up
ifconfig eth0 up            # → ip link set eth0 up

# Bring interface down
ifconfig eth0 down          # → ip link set eth0 down

# Show all interfaces
ifconfig -a                 # → ip addr show
```

## Best Practices

1. **Prefer `ip` command** for new configurations on modern systems
2. **Use ifconfig** for quick checks on systems where it's available
3. **Test connectivity** after configuration changes
4. **Save configurations** in appropriate system files for persistence
5. **Check interface status** before making changes
6. **Use verbose mode** for troubleshooting
7. **Document changes** for future reference
8. **Be careful with remote connections** when changing network settings
9. **Use MTU carefully** - mismatched MTUs can cause connectivity issues
10. **Monitor statistics** regularly for performance analysis

The `ifconfig` command, while being phased out in favor of the `ip` command, remains a useful tool for basic network interface configuration and quick status checks on many Linux systems.