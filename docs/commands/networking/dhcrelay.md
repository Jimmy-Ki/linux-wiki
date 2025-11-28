---
title: dhcrelay - ISC DHCP Relay Agent
sidebar_label: dhcrelay
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dhcrelay - ISC DHCP Relay Agent

The `dhcrelay` command is the ISC DHCP relay agent that provides a means to relay DHCP and BOOTP requests from a subnet with no DHCP server to one or more DHCP servers on other subnets. This allows network administrators to centralize DHCP services while serving clients across multiple network segments. dhcrelay forwards DHCP client broadcasts to DHCP servers and routes the responses back to the appropriate client network, enabling IP address allocation and network configuration for clients on different subnets.

## Basic Syntax

```bash
dhcrelay [options] [server-address ...]
```

## Common Options

### Basic Options
- `-4` - Use IPv4 only (default behavior)
- `-6` - Use IPv6 only instead of IPv4
- `-p port` - Specify destination port (default: 67 for DHCPv4, 547 for DHCPv6)
- `-q` - Quiet mode - suppress normal output
- `-v` - Display version information and exit
- `-h` - Display help information and exit

### Network Interface Options
- `-i ifname` - Specify interface to listen on for client requests
- `-l [address%]ifname` - Specify local interface and optional address for receiving client requests
- `-m count` - Maximum hop count for forwarded packets (default: 10)

### Server Options
- `server-address` - IP address of DHCP server(s) to forward requests to
- Multiple servers can be specified for redundancy and load balancing

### Advanced Options
- `-a` - Append an agent option (relay agent information option)
- `-A number` - Circuit ID for relay agent information option
- `-B` - Always broadcast replies (even when unicast is possible)
- `-c count` - Maximum number of packet forwards before dropping (default: unlimited)
- `-d` - Debug mode - run in foreground and log all packets
- `-D` - Write PID file (usually /var/run/dhcrelay.pid)
- `-t timeout` - Set timeout for server responses in seconds (default: 60)
- `-u` - Dump lease database to stderr on exit
- `-n` - Enable packet tracking for debugging
- `-pf pid-file` - Specify alternate PID file location

## Usage Examples

### Basic DHCP Relay Configuration

#### Simple DHCP Relay
```bash
# Forward DHCP requests to a single DHCP server
dhcrelay 192.168.1.1

# Forward to multiple DHCP servers for redundancy
dhcrelay 192.168.1.1 192.168.1.2

# Specify interface to listen on
dhcrelay -i eth0 192.168.1.1

# Forward with quiet mode (minimal logging)
dhcrelay -q 192.168.1.1
```

#### Interface-Specific Configuration
```bash
# Listen on specific interface and forward to server
dhcrelay -i eth1 10.0.0.1

# Use local address on interface
dhcrelay -l 192.168.2.1%eth0 192.168.1.1

# Specify multiple interfaces for client requests
dhcrelay -i eth0 -i eth1 192.168.1.1
```

### Advanced Configuration

#### Debug and Monitoring
```bash
# Run in debug mode with detailed logging
dhcrelay -d 192.168.1.1

# Debug mode with specific interface
dhcrelay -d -i eth0 192.168.1.1

# Run with PID file for service management
dhcrelay -D 192.168.1.1

# Custom PID file location
dhcrelay -pf /var/run/my-dhcrelay.pid 192.168.1.1
```

#### Custom Settings
```bash
# Set maximum hop count to prevent loops
dhcrelay -m 5 192.168.1.1

# Custom timeout for server responses
dhcrelay -t 30 192.168.1.1

# Always broadcast replies
dhcrelay -B 192.168.1.1

# Limit number of packet forwards
dhcrelay -c 1000 192.168.1.1
```

### Production Environment Setup

#### Multi-Subnet DHCP Service
```bash
# Forward requests from multiple subnets
dhcrelay -i eth0 -i eth1 -i eth2 192.168.1.100 192.168.1.101

# Use specific local addresses
dhcrelay -l 10.1.0.1%eth0 -l 10.2.0.1%eth1 192.168.1.1
```

#### High Availability Configuration
```bash
# Primary and backup DHCP servers
dhcrelay 192.168.1.10 192.168.1.11 192.168.1.12

# With specific timeout for failover
dhcrelay -t 10 192.168.1.10 192.168.1.11
```

## Practical Examples

### System Administration

#### Network Segmentation Setup
```bash
# Scenario: Separate client and server networks
# eth0: 192.168.10.1/24 (client network)
# eth1: 192.168.1.100/24 (server network)

# Basic relay configuration
dhcrelay -i eth0 192.168.1.1

# With monitoring and logging
dhcrelay -d -i eth0 192.168.1.1

# Production ready with PID file
dhcrelay -D -i eth0 192.168.1.1 192.168.1.2
```

#### VLAN Environment
```bash
# VLAN interfaces for different departments
dhcrelay -i vlan10 192.168.1.1
dhcrelay -i vlan20 192.168.1.1
dhcrelay -i vlan30 192.168.1.1

# Combined with specific addresses
dhcrelay -l 10.10.0.1%vlan10 -l 10.20.0.1%vlan20 192.168.1.1
```

### Enterprise Network Deployment

#### Redundant DHCP Infrastructure
```bash
# Multiple DHCP servers for redundancy
dhcrelay \
    -i eth0 \
    -i eth1 \
    dhcp-primary.example.com \
    dhcp-secondary.example.com \
    dhcp-backup.example.com

# With custom timeout and logging
dhcrelay -t 5 -D -q 192.168.1.10 192.168.1.11
```

#### Campus Network Configuration
```bash
# Multiple building networks
dhcrelay \
    -i building1 \
    -i building2 \
    -i building3 \
    192.168.100.100 \
    192.168.100.101

# With agent information for tracking
dhcrelay -a -A "Building-A" -i eth0 192.168.1.1
```

## Configuration Files

### System Configuration

#### Debian/Ubuntu Configuration
```bash
# /etc/default/isc-dhcp-relay
SERVERS="192.168.1.1 192.168.1.2"
INTERFACES="eth0 eth1"
OPTIONS="-m 5 -t 10"

# Enable the service
sudo systemctl enable isc-dhcp-relay
sudo systemctl start isc-dhcp-relay
```

#### RHEL/CentOS Configuration
```bash
# /etc/sysconfig/dhcrelay
INTERFACES="eth0 eth1"
DHCPSERVERS="192.168.1.1 192.168.1.2"
OPTIONS="-m 5 -D"

# Enable and start service
sudo systemctl enable dhcrelay
sudo systemctl start dhcrelay
```

### Service Management Scripts

#### Systemd Service Example
```ini
# /etc/systemd/system/dhcrelay-custom.service
[Unit]
Description=DHCP Relay Agent
After=network.target

[Service]
ExecStart=/usr/sbin/dhcrelay -d -i eth0 192.168.1.1
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

#### Init.d Script Example
```bash
#!/bin/bash
# /etc/init.d/dhcrelay-custom
DAEMON="/usr/sbin/dhcrelay"
OPTIONS="-d -i eth0 192.168.1.1"
PIDFILE="/var/run/dhcrelay.pid"

case "$1" in
    start)
        echo "Starting DHCP relay agent..."
        $DAEMON -D -pf $PIDFILE $OPTIONS
        ;;
    stop)
        echo "Stopping DHCP relay agent..."
        kill -TERM $(cat $PIDFILE)
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
```

## Advanced Usage

### Network Topology Configuration

#### Multi-Homed Router Setup
```bash
# Router with multiple network interfaces
# eth0: 10.0.1.1/24 (clients)
# eth1: 10.0.2.1/24 (clients)
# eth2: 192.168.1.1/24 (DHCP servers)

# Forward from all client networks to server network
dhcrelay -i eth0 -i eth1 192.168.1.100

# With specific local addresses
dhcrelay -l 10.0.1.1%eth0 -l 10.0.2.1%eth1 192.168.1.100
```

#### DMZ Configuration
```bash
# DMZ network with restricted DHCP relay
# eth0: 192.168.10.1/24 (internal clients)
# eth1: 172.16.1.1/24 (DMZ)
# eth2: 10.0.0.1/24 (DHCP servers)

# Forward only from DMZ to servers
dhcrelay -i eth1 10.0.0.10

# Internal clients get local DHCP, DMZ gets forwarded
dhcrelay -i eth0 192.168.10.1
dhcrelay -i eth1 10.0.0.10
```

### Performance Optimization

#### High-Volume Environment
```bash
# Optimize for high traffic environments
dhcrelay -c 10000 -m 3 -t 5 192.168.1.1

# Multiple relays for load balancing
dhcrelay -i eth0 192.168.1.10 &
dhcrelay -i eth1 192.168.1.11 &
```

#### Security Enhancements
```bash
# Limit hop count to prevent relay loops
dhcrelay -m 3 192.168.1.1

# Always broadcast for security
dhcrelay -B 192.168.1.1

# Use agent information for tracking
dhcrelay -a -A "SecureZone" 192.168.1.1
```

## Integration and Automation

### Network Automation

#### Ansible Configuration Example
```yaml
- name: Configure DHCP relay
  hosts: routers
  tasks:
    - name: Install DHCP relay package
      package:
        name: isc-dhcp-relay
        state: present

    - name: Configure DHCP relay
      template:
        src: dhcrelay.conf.j2
        dest: /etc/default/isc-dhcp-relay

    - name: Start DHCP relay service
      service:
        name: isc-dhcp-relay
        state: started
        enabled: yes
```

#### Configuration Template (dhcrelay.conf.j2)
```jinja2
# DHCP Relay Configuration
SERVERS="{{ dhcp_servers | join(' ') }}"
INTERFACES="{{ relay_interfaces | join(' ') }}"
OPTIONS="{{ relay_options }}"
```

### Monitoring and Logging

#### Log Configuration
```bash
# Configure rsyslog for dhcrelay logs
echo "local0.*    /var/log/dhcrelay.log" >> /etc/rsyslog.d/dhcrelay.conf

# Rotate logs
cat > /etc/logrotate.d/dhcrelay << EOF
/var/log/dhcrelay.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
EOF
```

#### Monitoring Script
```bash
#!/bin/bash
# Monitor dhcrelay service and network connectivity

DHCP_SERVER="192.168.1.1"
LOG_FILE="/var/log/dhcrelay-monitor.log"

# Check if dhcrelay process is running
if ! pgrep dhcrelay > /dev/null; then
    echo "$(date): dhcrelay process not found, restarting..." >> $LOG_FILE
    systemctl restart dhcrelay
fi

# Check connectivity to DHCP server
if ! ping -c 1 $DHCP_SERVER > /dev/null; then
    echo "$(date): Cannot reach DHCP server $DHCP_SERVER" >> $LOG_FILE
fi
```

## Troubleshooting

### Common Issues

#### Service Not Starting
```bash
# Check if dhcrelay is installed
which dhcrelay

# Install if missing
sudo apt-get install isc-dhcp-relay    # Debian/Ubuntu
sudo yum install dhcp                   # RHEL/CentOS

# Check permissions
sudo dhcrelay -d 192.168.1.1
```

#### Network Connectivity Issues
```bash
# Verify interface configuration
ip addr show

# Test connectivity to DHCP server
ping 192.168.1.1

# Check routing tables
ip route show

# Verify firewall rules
sudo iptables -L -n | grep 67
sudo iptables -L -n | grep 68
```

#### DHCP Forwarding Problems
```bash
# Run in debug mode to see packet flow
sudo dhcrelay -d 192.168.1.1

# Monitor network traffic
sudo tcpdump -i eth0 port 67 or port 68
sudo tcpdump -i eth1 port 67 or port 68

# Check system logs
journalctl -u dhcrelay -f
tail -f /var/log/syslog | grep dhcp
```

#### Performance Issues
```bash
# Check system resources
top -p $(pgrep dhcrelay)
iostat -x 1

# Monitor network traffic
iftop -i eth0
netstat -i

# Adjust timeout and hop count
dhcrelay -t 10 -m 5 192.168.1.1
```

### Debugging Techniques

#### Packet Capture and Analysis
```bash
# Capture DHCP packets on client interface
sudo tcpdump -i eth0 -vvv port 67 or port 68

# Capture packets on server interface
sudo tcpdump -i eth1 -vvv port 67 or port 68

# Capture with file output for analysis
sudo tcpdump -w dhcp.pcap -i eth0 port 67 or port 68

# Analyze captured packets
tshark -r dhcp.pcap -Y "dhcp"
```

#### Configuration Validation
```bash
# Test configuration before applying
dhcrelay -d -t 1 192.168.1.1 &
sleep 2
kill %1

# Verify service status
systemctl status dhcrelay

# Check configuration syntax
dhcrelay -h
```

## Related Commands

- [`dhcpd`](/docs/commands/network/dhcpd) - ISC DHCP server daemon
- [`dhclient`](/docs/commands/network/dhclient) - DHCP client daemon
- [`dhclient-script`](/docs/commands/network/dhclient-script) - DHCP client configuration script
- [`ip`](/docs/commands/network/ip) - Show/manipulate routing and network devices
- [`iptables`](/docs/commands/network/iptables) - Packet filtering and NAT
- [`tcpdump`](/docs/commands/network/tcpdump) - Network packet analyzer
- [`nmap`](/docs/commands/network/nmap) - Network discovery and security auditing
- [`netstat`](/docs/commands/network/netstat) - Network statistics
- [`ss`](/docs/commands/network/ss) - Socket statistics
- [`ping`](/docs/commands/network/ping) - Send ICMP ECHO_REQUEST to network hosts

## Best Practices

1. **Plan Network Topology** - Design DHCP relay architecture with proper subnet planning
2. **Use Redundant Servers** - Configure multiple DHCP servers for high availability
3. **Monitor Performance** - Regularly check relay performance and network connectivity
4. **Secure Configuration** - Use appropriate security measures and firewall rules
5. **Document Configuration** - Maintain clear documentation of relay setup and network topology
6. **Test Thoroughly** - Validate DHCP relay functionality in lab before production deployment
7. **Use Appropriate Timeouts** - Configure timeouts based on network latency and response times
8. **Limit Hop Count** - Prevent infinite relay loops with reasonable hop count limits
9. **Log Everything** - Enable comprehensive logging for troubleshooting and auditing
10. **Regular Updates** - Keep ISC DHCP packages updated for security and bug fixes

## Performance Tips

1. **Optimize Interface Configuration** - Use dedicated interfaces for client and server networks
2. **Adjust Timeout Values** - Set shorter timeouts for faster failover in multi-server configurations
3. **Monitor System Resources** - Ensure adequate CPU and memory for high-volume environments
4. **Use Hardware Offload** - Enable network interface hardware acceleration when available
5. **Configure Load Balancing** - Distribute DHCP requests across multiple relay agents
6. **Limit Broadcast Domains** - Use VLANs or subnets to limit broadcast traffic
7. **Optimize Firewall Rules** - Minimize firewall processing overhead for DHCP traffic
8. **Use Dedicated Hardware** - Consider dedicated relay servers for large enterprise networks
9. **Monitor Network Latency** - Ensure low latency between relay agents and DHCP servers
10. **Regular Performance Testing** - Periodically test DHCP relay performance under load

The `dhcrelay` command is an essential tool for network administrators managing DHCP services across multiple subnets. It provides reliable DHCP request forwarding while maintaining network efficiency and enabling centralized IP address management in complex network environments.