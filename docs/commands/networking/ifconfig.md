---
title: ifconfig - Network Interface Configuration
sidebar_label: ifconfig
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ifconfig - Network Interface Configuration

The `ifconfig` command is a system administration utility for Unix-like operating systems used to configure, control, and query TCP/IP network interface parameters. It allows administrators to configure network interfaces, assign IP addresses, enable/disable interfaces, and view network interface statistics. While newer systems increasingly use the `ip` command from the iproute2 package, `ifconfig` remains widely used and supported, especially in older systems and embedded devices.

## Basic Syntax

```bash
ifconfig [interface] [options] [address]
ifconfig [interface] [up|down]
ifconfig -a
```

## Common Operations

- `ifconfig` - Display active network interfaces
- `ifconfig -a` - Display all network interfaces (including inactive)
- `ifconfig interface up` - Bring network interface up
- `ifconfig interface down` - Take network interface down
- `ifconfig interface address` - Configure IP address for interface
- `ifconfig interface netmask mask` - Set subnet mask
- `ifconfig interface broadcast addr` - Set broadcast address

## Interface Configuration Options

### Address Configuration
- `address` - Set IP address for interface
- `netmask mask` - Set subnet mask (e.g., 255.255.255.0)
- `broadcast addr` - Set broadcast address
- `pointopoint addr` - Set point-to-point address
- `dstaddr addr` - Set destination address (for point-to-point)

### Interface Control
- `up` - Activate the interface
- `down` - Deactivate the interface
- `-arp` - Disable ARP on this interface
- `arp` - Enable ARP on this interface (default)
- `-promisc` - Disable promiscuous mode
- `promisc` - Enable promiscuous mode

### MTU and Metric
- `mtu n` - Set Maximum Transmission Unit
- `metric n` - Set interface metric

### Hardware Address
- `hw class address` - Set hardware address (MAC)
  - `ether` - Ethernet address
  - `ax25` - AX.25 address
  - `arcnet` - ARCnet address
  - `netrom` - NET/ROM address

### IP Configuration
- `add addr` - Add IPv6 address
- `del addr` - Delete IPv6 address
- `tunnel addr` - Create tunnel interface

## Usage Examples

### Basic Interface Operations

#### Viewing Interface Information
```bash
# Display active interfaces
ifconfig

# Display all interfaces (including inactive)
ifconfig -a

# Display specific interface
ifconfig eth0

# Display interface with IPv6
ifconfig -a inet6

# Show interface statistics continuously
watch ifconfig
```

#### Bringing Interfaces Up/Down
```bash
# Bring interface up
ifconfig eth0 up

# Take interface down
ifconfig eth0 down

# Restart interface
ifconfig eth0 down && ifconfig eth0 up

# Check if interface is up
ifconfig eth0 | grep "UP"
```

### IP Address Configuration

#### Basic IP Configuration
```bash
# Configure IP address with subnet mask
ifconfig eth0 192.168.1.100 netmask 255.255.255.0

# Configure IP address with broadcast
ifconfig eth0 192.168.1.100 broadcast 192.168.1.255

# Configure IP address with full network parameters
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 broadcast 192.168.1.255 up

# Configure multiple IP addresses
ifconfig eth0:0 192.168.1.100
ifconfig eth0:1 192.168.1.101
ifconfig eth0:2 192.168.1.102
```

#### IPv6 Configuration
```bash
# Add IPv6 address
ifconfig eth0 add 2001:db8::1/64

# Remove IPv6 address
ifconfig eth0 del 2001:db8::1/64

# Configure IPv6 address
ifconfig eth0 inet6 add 2001:db8::1/64

# Display IPv6 information
ifconfig -a inet6
```

### Advanced Network Configuration

#### MTU and Performance Tuning
```bash
# Set MTU for jumbo frames
ifconfig eth0 mtu 9000

# Set standard MTU
ifconfig eth0 mtu 1500

# Set interface metric for routing
ifconfig eth0 metric 10

# Optimize for high-latency networks
ifconfig eth0 mtu 1400
```

#### Hardware Configuration
```bash
# Change MAC address (requires root)
ifconfig eth0 hw ether 00:11:22:33:44:55

# Set interface to promiscuous mode
ifconfig eth0 promisc

# Disable promiscuous mode
ifconfig eth0 -promisc

# Enable/disable ARP
ifconfig eth0 arp
ifconfig eth0 -arp
```

#### Point-to-Point Configuration
```bash
# Configure point-to-point interface
ifconfig ppp0 192.168.1.1 pointopoint 192.168.1.2

# Configure tunnel interface
ifconfig tun0 10.0.0.1 pointopoint 10.0.0.2

# Configure GRE tunnel
ifconfig gre0 tunnel 192.168.1.1 192.168.1.2
```

## Practical Examples

### Network Interface Management

#### System Network Setup
```bash
# Configure primary network interface
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 broadcast 192.168.1.255 up

# Configure loopback interface (usually set by system)
ifconfig lo 127.0.0.1 netmask 255.0.0.0 up

# Configure multiple interfaces
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up
ifconfig eth1 10.0.0.100 netmask 255.255.255.0 up

# Configure VLAN interface
ifconfig eth0.100 192.168.100.100 netmask 255.255.255.0 up
```

#### Virtual and Alias Interfaces
```bash
# Create virtual interfaces for multiple IPs
ifconfig eth0:0 192.168.1.100 netmask 255.255.255.0
ifconfig eth0:1 192.168.1.101 netmask 255.255.255.0
ifconfig eth0:2 192.168.1.102 netmask 255.255.255.0

# Create bridge interface
ifconfig br0 192.168.1.10 netmask 255.255.255.0 up
brctl addbr br0
brctl addif br0 eth0
brctl addif br0 eth1
```

### Network Diagnostics

#### Interface Status Monitoring
```bash
# Check interface status
ifconfig eth0 | grep "UP"

# Check interface statistics
ifconfig eth0 | grep "RX packets"
ifconfig eth0 | grep "TX packets"

# Monitor interface errors
ifconfig eth0 | grep "errors"
ifconfig eth0 | grep "dropped"

# Show interface statistics in human-readable format
ifconfig -s eth0
```

#### Network Connectivity Testing
```bash
# Configure interface for testing
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up

# Test with loopback
ifconfig lo up
ping 127.0.0.1

# Test interface connectivity
ifconfig eth0 up && ping -c 4 192.168.1.1

# Test with different MTU sizes
ifconfig eth0 mtu 1400 && ping -c 4 -M do -s 1372 8.8.8.8
```

### Server and System Administration

#### Network Server Configuration
```bash
# Configure web server interface
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up
ifconfig eth0:0 192.168.1.101 netmask 255.255.255.0  # Virtual IP

# Configure database server
ifconfig eth1 10.0.0.100 netmask 255.255.255.0 up
ifconfig eth1 mtu 9000  # Enable jumbo frames

# Configure backup network
ifconfig eth2 172.16.1.100 netmask 255.255.255.0 up
```

#### High Availability Setup
```bash
# Configure floating IP
ifconfig eth0:0 192.168.1.200 netmask 255.255.255.0 up

# Configure heartbeat interface
ifconfig eth1 10.0.0.1 netmask 255.255.255.252 up

# Configure cluster communication
ifconfig eth0 192.168.1.10 netmask 255.255.255.0 up
ifconfig eth0:1 192.168.1.11 netmask 255.255.255.0 up
```

## Advanced Usage

### Interface Bonding and Teaming

#### Network Bonding Configuration
```bash
# Configure bonding interface
ifconfig bond0 192.168.1.100 netmask 255.255.255.0 up
ifenslave bond0 eth0 eth1

# Check bonding status
cat /proc/net/bonding/bond0

# Configure active-backup mode
ifconfig bond0 up
echo +eth0 > /sys/class/net/bond0/bonding/slaves
echo +eth1 > /sys/class/net/bond0/bonding/slaves
```

### Virtualization and Containers

#### Bridge Configuration for VMs
```bash
# Create bridge for virtual machines
ifconfig br0 192.168.1.10 netmask 255.255.255.0 up
brctl addbr br0
brctl addif br0 eth0
brctl stp br0 on

# Configure tap interface for VM
ifconfig tap0 up
brctl addif br0 tap0

# Create bridge for Docker
ifconfig docker0 172.17.42.1 netmask 255.255.0.0 up
```

### Wireless Network Configuration

#### Wireless Interface Setup
```bash
# Configure wireless interface
ifconfig wlan0 up
iwconfig wlan0 essid "NetworkName"
iwconfig wlan0 key s:YourPassword

# Configure wireless with DHCP
ifconfig wlan0 up
dhclient wlan0

# Monitor wireless interface
ifconfig wlan0 promisc
iwconfig wlan0 mode monitor
```

## Integration and Automation

### Shell Scripts

#### Network Configuration Script
```bash
#!/bin/bash
# Network interface configuration script

INTERFACE="eth0"
IP_ADDRESS="192.168.1.100"
NETMASK="255.255.255.0"
BROADCAST="192.168.1.255"

# Configure interface
ifconfig $INTERFACE $IP_ADDRESS netmask $NETMASK broadcast $BROADCAST up

# Verify configuration
if ifconfig $INTERFACE | grep -q "$IP_ADDRESS"; then
    echo "Interface $INTERFACE configured successfully"
    echo "IP Address: $IP_ADDRESS"
    echo "Netmask: $NETMASK"
    echo "Broadcast: $BROADCAST"
else
    echo "Failed to configure $INTERFACE"
    exit 1
fi

# Test connectivity
ping -c 4 $(echo $IP_ADDRESS | awk -F. '{print $1"."$2"."$3".1"}')
```

#### Network Monitoring Script
```bash
#!/bin/bash
# Monitor network interface statistics

INTERFACE="eth0"
LOG_FILE="/var/log/network_monitor.log"

while true; do
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    # Get interface statistics
    RX_PACKETS=$(ifconfig $INTERFACE | grep "RX packets" | awk '{print $2}' | cut -d: -f2)
    TX_PACKETS=$(ifconfig $INTERFACE | grep "TX packets" | awk '{print $2}' | cut -d: -f2)
    RX_BYTES=$(ifconfig $INTERFACE | grep "RX packets" | awk '{print $5}')
    TX_BYTES=$(ifconfig $INTERFACE | grep "TX packets" | awk '{print $5}')

    # Log statistics
    echo "$TIMESTAMP - RX: $RX_PACKETS packets ($RX_BYTES bytes), TX: $TX_PACKETS packets ($TX_BYTES bytes)" >> $LOG_FILE

    sleep 60
done
```

### Network Backup and Recovery

#### Configuration Backup Script
```bash
#!/bin/bash
# Backup network interface configuration

BACKUP_DIR="/etc/network/backup"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup current configuration
ifconfig -a > $BACKUP_DIR/interfaces_$DATE.txt

# Backup routing table
route -n > $BACKUP_DIR/routes_$DATE.txt

# Backup ARP table
arp -n > $BACKUP_DIR/arp_$DATE.txt

echo "Network configuration backed up to $BACKUP_DIR"
```

#### Configuration Restore Script
```bash
#!/bin/bash
# Restore network interface configuration

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Parse and restore interfaces
while read -r line; do
    if [[ $line =~ ^[a-zA-Z0-9]+: ]]; then
        INTERFACE=$(echo $line | cut -d: -f1)
        if echo $line | grep -q "UP"; then
            # Restore interface configuration
            IP=$(echo $line | grep "inet " | awk '{print $2}')
            if [ -n "$IP" ]; then
                ifconfig $INTERFACE $IP up
            else
                ifconfig $INTERFACE up
            fi
        fi
    fi
done < "$BACKUP_FILE"

echo "Network configuration restored from $BACKUP_FILE"
```

## Troubleshooting

### Common Issues

#### Interface Not Found
```bash
# List available interfaces
ifconfig -a

# Check if interface module is loaded
lsmod | grep driver_name

# Load network driver
modprobe driver_name

# Check device status
ethtool eth0
mii-tool eth0
```

#### Permission Denied
```bash
# Check if running as root
whoami

# Use sudo
sudo ifconfig eth0 192.168.1.100

# Check capabilities
capsh --print

# Add net_admin capability (advanced)
sudo setcap cap_net_admin+ep /path/to/binary
```

#### Interface Won't Come Up
```bash
# Check interface status
ifconfig eth0
ethtool eth0

# Check for link
mii-tool eth0
ethtool eth0 | grep "Link detected"

# Check driver status
dmesg | grep eth0
lspci | grep -i ethernet
```

#### Network Connectivity Issues
```bash
# Check interface configuration
ifconfig eth0

# Check routing
route -n

# Check DNS
cat /etc/resolv.conf

# Test connectivity
ping -c 4 8.8.8.8
ping -c 4 google.com

# Check for conflicts
arp -n
ip neigh show
```

### Performance Issues

#### Slow Network Performance
```bash
# Check interface statistics
ifconfig eth0 | grep -E "(RX|TX) packets"
ifconfig eth0 | grep -E "(RX|TX) bytes"

# Check for errors
ifconfig eth0 | grep -E "(errors|dropped|overruns)"

# Check duplex and speed
ethtool eth0

# Optimize MTU
ifconfig eth0 mtu 9000

# Check for packet loss
ping -c 100 -i 0.1 192.168.1.1
```

## Related Commands

- [`ip`](/docs/commands/system-info/ip) - Modern network interface configuration utility
- [`route`](/docs/commands/system-info/route) - Display and manipulate routing tables
- [`netstat`](/docs/commands/system-info/netstat) - Network statistics and connections
- [`ss`](/docs/commands/system-info/ss) - Socket statistics utility
- [`ethtool`](/docs/commands/system-info/ethtool) - Ethernet settings utility
- [`mii-tool`](/docs/commands/system-info/mii-tool) - Media Independent Interface utility
- [`arp`](/docs/commands/system-info/arp) - Display and manipulate ARP cache
- [`iwconfig`](/docs/commands/system-info/iwconfig) - Wireless interface configuration
- [`brctl`](/docs/commands/system-info/brctl) - Ethernet bridge administration
- [`dhclient`](/docs/commands/other-tools/dhclient) - DHCP client

## Best Practices

1. **Use `ip` command** for new systems - `ifconfig` is being deprecated
2. **Always specify netmask** when configuring IP addresses
3. **Test connectivity** after configuration changes
4. **Backup configuration** before making changes
5. **Use interface aliases** for multiple IP addresses on same interface
6. **Set appropriate MTU** based on network requirements
7. **Monitor interface statistics** for performance tuning
8. **Document network configuration** for disaster recovery
9. **Use static addressing** for servers and critical infrastructure
10. **Secure management interfaces** with proper access controls

## Performance Tips

1. **Enable jumbo frames** (MTU 9000) for high-performance networks
2. **Use appropriate duplex settings** (auto-negotiation vs. fixed)
3. **Monitor interface statistics** regularly for bottlenecks
4. **Optimize MTU size** based on network topology
5. **Use bonding/teaming** for redundancy and performance
6. **Configure appropriate buffer sizes** for high-throughput applications
7. **Disable unnecessary features** to reduce CPU overhead
8. **Use interrupt coalescing** for better performance
9. **Optimize NIC offload features** (TSO, LRO, GSO)
10. **Monitor queue lengths** for network congestion

The `ifconfig` command remains a fundamental tool for network interface configuration and troubleshooting in Linux systems. While newer utilities like `ip` offer enhanced capabilities, `ifconfig` provides a straightforward and reliable method for managing network interfaces, making it essential knowledge for system administrators and network engineers.