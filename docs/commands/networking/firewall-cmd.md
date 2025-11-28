---
title: firewall-cmd - Firewalld Command Line Interface
sidebar_label: firewall-cmd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# firewall-cmd - Firewalld Command Line Interface

The `firewall-cmd` command is the command-line client for the firewalld daemon, which provides a dynamically managed firewall with support for network/firewall zones that define the trust level of network connections or interfaces. It supports both IPv4 and IPv6, separates runtime and permanent configuration options, and provides an interface for services or applications to add firewall rules directly. Firewalld uses a D-Bus interface for communication and provides a more flexible and easier-to-use alternative to traditional iptables management.

## Basic Syntax

```bash
firewall-cmd [OPTIONS...] [ARGUMENTS...]
```

## Global Options

- `-h`, `--help` - Show help message
- `-V`, `--version` - Show version information
- `-q`, `--quiet` - Do not print status messages
- `--state` - Check if firewalld is active
- `--reload` - Reload firewall rules
- `--complete-reload` - Completely reload firewall
- `--runtime-to-permanent` - Make runtime configuration permanent
- `--permanent` - Make changes permanent
- `--check-config` - Check permanent configuration for errors

## Status and Information Commands

### Status Operations
- `--state` - Display firewall state
- `--get-active-zones` - Get currently active zones
- `--get-zones` - List all available zones
- `--get-services` - List all predefined services
- `--get-icmptypes` - List all ICMP types
- `--get-default-zone` - Get default zone
- `--list-all-zones` - List everything for all zones
- `--info-zone=ZONE` - Get information about a zone

### Configuration Information
- `--get-log-denied` - Get log denied setting
- `--get-automatic-helpers` - Get automatic helpers setting
- `--get-pid` - Get firewalld process ID
- `--permanent --get-log-denied` - Get permanent log denied setting

## Zone Management

### Zone Configuration
- `--set-default-zone=ZONE` - Set default zone
- `--get-default-zone` - Get default zone
- `--get-zones` - List all zones
- `--get-active-zones` - Get active zones
- `--info-zone=ZONE` - Get zone information
- `--list-all-zones` - List all zones with settings

### Zone-specific Operations
- `--zone=ZONE` - Specify zone for operation
- `--get-zone-of-interface=INTERFACE` - Get zone of interface
- `--get-zone-of-source=SOURCE` - Get zone of source
- `--permanent --zone=ZONE --set-target=TARGET` - Set zone target

## Service Management

### Service Operations
- `--service=SERVICE` - Specify service
- `--add-service=SERVICE` - Add service to zone
- `--remove-service=SERVICE` - Remove service from zone
- `--query-service=SERVICE` - Check if service is enabled
- `--list-services` - List enabled services
- `--get-services` - Get all available services

### Permanent Service Configuration
- `--permanent --add-service=SERVICE` - Permanently add service
- `--permanent --remove-service=SERVICE` - Permanently remove service
- `--permanent --query-service=SERVICE` - Check permanent service
- `--permanent --list-services` - List permanent services

## Port Management

### Port Operations
- `--add-port=PORT/PROTOCOL` - Add port to zone
- `--remove-port=PORT/PROTOCOL` - Remove port from zone
- `--query-port=PORT/PROTOCOL` - Check if port is enabled
- `--list-ports` - List enabled ports

### Port Ranges
- `--add-port=PORT-PORT/PROTOCOL` - Add port range
- `--remove-port=PORT-PORT/PROTOCOL` - Remove port range
- `--query-port=PORT-PORT/PROTOCOL` - Check port range

## Rich Rules

### Rich Rule Operations
- `--add-rich-rule='RULE'` - Add rich rule
- `--remove-rich-rule='RULE'` - Remove rich rule
- `--query-rich-rule='RULE'` - Check if rich rule exists
- `--list-rich-rules` - List rich rules

### Rich Rule Syntax
```bash
'rule [family="ipv4|ipv6"] [source address="address"] [destination address="address"] [port port="port" protocol="tcp|udp"] [service="service"] [forward-port port="port" protocol="tcp|udp" to-port="port" to-addr="address"] [log [prefix="prefix"] [level="emerg|alert|crit|err|warn|notice|info|debug"] [limit value="rate/duration"]] [nflog group="group"] [accept|reject|drop|mark set="mark"]'
```

## Interface Management

### Interface Operations
- `--add-interface=INTERFACE` - Add interface to zone
- `--change-interface=INTERFACE` - Change interface zone
- `--query-interface=INTERFACE` - Check interface zone
- `--remove-interface=INTERFACE` - Remove interface from zone
- `--list-interfaces` - List interfaces in zone
- `--get-zones` - Get available zones for interfaces

## Source Address Management

### Source Operations
- `--add-source=SOURCE` - Add source address to zone
- `--remove-source=SOURCE` - Remove source address from zone
- `--query-source=SOURCE` - Check if source is in zone
- `--list-sources` - List source addresses in zone

### Source Types
- `IP` - Single IP address (192.168.1.100)
- `CIDR` - Network range (192.168.1.0/24)
- `MAC` - MAC address (00:11:22:33:44:55)
- `ipset:NAME` - IP set reference

## Masquerading and Forwarding

### Masquerading
- `--add-masquerade` - Enable masquerading in zone
- `--remove-masquerade` - Disable masquerading in zone
- `--query-masquerade` - Check masquerading status

### Port Forwarding
- `--add-forward-port=port=PORT:proto=PROTOCOL:toport=TO_PORT` - Forward port
- `--add-forward-port=port=PORT:proto=PROTOCOL:toaddr=ADDR` - Forward to address
- `--add-forward-port=port=PORT:proto=PROTOCOL:toport=TO_PORT:toaddr=ADDR` - Forward to address and port
- `--remove-forward-port=...` - Remove port forwarding
- `--query-forward-port=...` - Check port forwarding
- `--list-forward-ports` - List port forwards

## ICMP Types

### ICMP Operations
- `--add-icmp-block=ICMPTYPE` - Block ICMP type
- `--remove-icmp-block=ICMPTYPE` - Remove ICMP block
- `--query-icmp-block=ICMPTYPE` - Check ICMP block
- `--list-icmp-blocks` - List blocked ICMP types

## Direct Rules

### Direct Interface
- `--direct --add-rule {ipv4|ipv6|eb} TABLE CHAIN PRIORITY ARGS` - Add direct rule
- `--direct --remove-rule {ipv4|ipv6|eb} TABLE CHAIN PRIORITY ARGS` - Remove direct rule
- `--direct --query-rule {ipv4|ipv6|eb} TABLE CHAIN PRIORITY ARGS` - Query direct rule
- `--direct --list-all-rules` - List all direct rules
- `--direct --get-all-rules` - Get all direct rules

## Usage Examples

### Basic Firewall Management

#### Checking Firewall Status
```bash
# Check if firewalld is running
firewall-cmd --state

# Get default zone
firewall-cmd --get-default-zone

# List active zones
firewall-cmd --get-active-zones

# List all available zones
firewall-cmd --get-zones

# List all available services
firewall-cmd --get-services

# Show all settings for default zone
firewall-cmd --list-all

# Show all zones configuration
firewall-cmd --list-all-zones

# Check firewall version
firewall-cmd --version
```

#### Basic Zone Configuration
```bash
# Set default zone
sudo firewall-cmd --set-default-zone=public

# Get current zone of interface
firewall-cmd --get-zone-of-interface=eth0

# Change interface zone
sudo firewall-cmd --zone=dmz --change-interface=eth0

# List interfaces in a zone
firewall-cmd --zone=public --list-interfaces

# Show detailed zone information
firewall-cmd --info-zone=public
```

### Service Management

#### Adding and Removing Services
```bash
# Add HTTP service (runtime)
sudo firewall-cmd --add-service=http

# Add HTTPS service (permanent)
sudo firewall-cmd --permanent --add-service=https

# Add multiple services
sudo firewall-cmd --permanent --add-service={http,https,ftp}

# Remove service (runtime)
sudo firewall-cmd --remove-service=http

# Remove service (permanent)
sudo firewall-cmd --permanent --remove-service=http

# Check if service is enabled
firewall-cmd --query-service=http

# List enabled services in zone
firewall-cmd --zone=public --list-services

# List all predefined services
firewall-cmd --get-services
```

#### Custom Services
```bash
# Create custom service definition
sudo tee /etc/firewalld/services/custom-app.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<service>
  <short>Custom Application</short>
  <description>Custom application service</description>
  <port protocol="tcp" port="8080"/>
  <port protocol="udp" port="8081"/>
</service>
EOF

# Reload firewall to recognize new service
sudo firewall-cmd --reload

# Add custom service
sudo firewall-cmd --permanent --add-service=custom-app
```

### Port Management

#### Basic Port Operations
```bash
# Open single TCP port (runtime)
sudo firewall-cmd --add-port=8080/tcp

# Open port range (permanent)
sudo firewall-cmd --permanent --add-port=9000-9100/tcp

# Open UDP port
sudo firewall-cmd --permanent --add-port=53/udp

# Remove port
sudo firewall-cmd --remove-port=8080/tcp

# Check if port is open
firewall-cmd --query-port=8080/tcp

# List open ports
firewall-cmd --list-ports
```

#### Advanced Port Configuration
```bash
# Open multiple ports
sudo firewall-cmd --permanent --add-port={80/tcp,443/tcp,8080/tcp}

# Open port ranges
sudo firewall-cmd --permanent --add-port=10000-11000/tcp
sudo firewall-cmd --permanent --add-port=20000-21000/udp

# Open ports in specific zone
sudo firewall-cmd --zone=internal --add-port=3306/tcp
sudo firewall-cmd --zone=dmz --add-port=80/tcp

# List ports in specific zone
firewall-cmd --zone=internal --list-ports
```

### Rich Rules

#### Rich Rule Examples
```bash
# Allow specific IP address
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" accept'

# Block specific IP address
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.50" reject'

# Allow port only from specific network
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port protocol="tcp" port="22" accept'

# Forward traffic to different port
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" forward-port port="80" protocol="tcp" to-port="8080"'

# Log and reject traffic
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" port protocol="tcp" port="23" log prefix="telnet" level="notice" reject'

# Allow specific service with logging
sudo firewall-cmd --permanent --add-rich-rule='rule service name="http" log limit value="1/m" accept'

# Block specific ICMP type
sudo firewall-cmd --permanent --add-rich-rule='rule protocol value="icmp" icmp-block name="echo-request"'
```

#### Complex Rich Rules
```bash
# Multiple conditions
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" service name="ssh" log prefix="SSH" level="info" accept'

# Rate limiting
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="0.0.0.0/0" port protocol="tcp" port="22" log prefix="SSH Brute Force" level="notice" limit value="5/m" reject'

# Forward to different host
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" forward-port port="3306" protocol="tcp" to-port="3306" to-addr="192.168.1.200"'

# Time-based rules (requires recent kernel)
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port protocol="tcp" port="8080" accept'

# Block and log
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" port protocol="tcp" port="23" log prefix="Telnet Blocked" limit value="3/m" reject'

# Allow established connections
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" ct state="ESTABLISHED,RELATED" accept'
```

### Interface and Source Management

#### Interface Management
```bash
# Add interface to zone
sudo firewall-cmd --zone=internal --add-interface=eth1

# Remove interface from zone
sudo firewall-cmd --zone=internal --remove-interface=eth1

# Change interface zone
sudo firewall-cmd --zone=dmz --change-interface=eth0

# Query interface zone
firewall-cmd --get-zone-of-interface=eth0

# List all interfaces with zones
firewall-cmd --get-active-zones

# Add multiple interfaces
sudo firewall-cmd --zone=public --add-interface={eth0,eth1,wlan0}
```

#### Source Address Management
```bash
# Add single IP address
sudo firewall-cmd --permanent --zone=trusted --add-source=192.168.1.100

# Add network range
sudo firewall-cmd --permanent --zone=internal --add-source=10.0.0.0/8

# Add MAC address
sudo firewall-cmd --permanent --zone=trusted --add-source=00:11:22:33:44:55

# Remove source
sudo firewall-cmd --permanent --zone=trusted --remove-source=192.168.1.100

# Query source
firewall-cmd --zone=trusted --query-source=192.168.1.100

# List sources in zone
firewall-cmd --zone=trusted --list-sources

# Add multiple sources
sudo firewall-cmd --permanent --zone=internal --add-source={192.168.1.0/24,10.0.0.0/8}
```

### Masquerading and Port Forwarding

#### Masquerading Configuration
```bash
# Enable masquerading (NAT)
sudo firewall-cmd --zone=external --add-masquerade

# Enable permanent masquerading
sudo firewall-cmd --permanent --zone=external --add-masquerade

# Check masquerading status
firewall-cmd --zone=external --query-masquerade

# Disable masquerading
sudo firewall-cmd --zone=external --remove-masquerade
```

#### Port Forwarding
```bash
# Forward port 80 to 8080
sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080

# Forward to different IP
sudo firewall-cmd --permanent --add-forward-port=port=3306:proto=tcp:toaddr=192.168.1.200

# Forward to different IP and port
sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=192.168.1.100

# Remove port forwarding
sudo firewall-cmd --permanent --remove-forward-port=port=80:proto=tcp:toport=8080

# List port forwards
firewall-cmd --list-forward-ports

# Complex forwarding with masquerading
sudo firewall-cmd --permanent --zone=external --add-masquerade
sudo firewall-cmd --permanent --add-forward-port=port=2222:proto=tcp:toport=22:toaddr=192.168.1.100
```

### ICMP Management

#### ICMP Configuration
```bash
# Block ping requests
sudo firewall-cmd --permanent --add-icmp-block=echo-request

# Block all ICMP
sudo firewall-cmd --permanent --add-icmp-block={echo-request,echo-reply,destination-unreachable}

# Allow specific ICMP types
sudo firewall-cmd --permanent --remove-icmp-block=echo-request

# List all ICMP types
firewall-cmd --get-icmptypes

# List blocked ICMP types
firewall-cmd --list-icmp-blocks

# Check ICMP block status
firewall-cmd --query-icmp-block=echo-request
```

## Practical Examples

### Web Server Configuration

#### Basic Web Server Setup
```bash
# Configure for web server
sudo firewall-cmd --permanent --set-default-zone=public
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=8080/tcp  # Alternative HTTP port
sudo firewall-cmd --reload

# Allow management access from specific network
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'

# Log and reject brute force attempts
sudo firewall-cmd --permanent --add-rich-rule='rule service name="ssh" log prefix="SSH Attack" level="warning" limit value="5/m" reject'

# Block known malicious IPs
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.0.2.100" reject'
```

#### High-Security Web Server
```bash
# Restrictive web server configuration
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --permanent --zone=public --remove-service=ssh

# Create management zone
sudo firewall-cmd --permanent --new-zone=management
sudo firewall-cmd --permanent --zone=management --add-source=10.0.0.0/8
sudo firewall-cmd --permanent --zone=management --add-service=ssh

# Block all other traffic
sudo firewall-cmd --permanent --zone=public --set-target=DROP
sudo firewall-cmd --permanent --zone=management --set-target=ACCEPT

# Enable logging for dropped packets
sudo firewall-cmd --permanent --set-log-denied=all
```

### Database Server Configuration

#### Database Server Setup
```bash
# MySQL/MariaDB server configuration
sudo firewall-cmd --permanent --zone=internal --add-service=mysql
sudo firewall-cmd --permanent --zone=internal --add-source=10.0.0.0/8

# PostgreSQL server
sudo firewall-cmd --permanent --zone=internal --add-service=postgresql
sudo firewall-cmd --permanent --zone=internal --add-port=5432/tcp

# Allow replication
sudo firewall-cmd --permanent --zone=internal --add-rich-rule='rule family="ipv4" source address="192.168.1.200" port protocol="tcp" port="5432" accept'

# Block external access to database ports
sudo firewall-cmd --permanent --zone=public --remove-service=mysql
sudo firewall-cmd --permanent --zone=public --remove-service=postgresql
```

### Home Network Router

#### Basic Router Configuration
```bash
# Set external interface zone
sudo firewall-cmd --permanent --zone=external --add-interface=eth0
sudo firewall-cmd --permanent --zone=external --add-masquerade

# Set internal interface zone
sudo firewall-cmd --permanent --zone=internal --add-interface=eth1

# Allow internal network
sudo firewall-cmd --permanent --zone=internal --add-source=192.168.1.0/24

# Forward port for web server
sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=80:toaddr=192.168.1.100

# Allow SSH from external with restrictions
sudo firewall-cmd --permanent --zone=external --add-rich-rule='rule family="ipv4" source address="203.0.113.100" service name="ssh" accept'

# Enable logging
sudo firewall-cmd --permanent --set-log-denied=unicast
```

### Development Environment

#### Development Server Setup
```bash
# Allow development ports
sudo firewall-cmd --permanent --add-port={3000/tcp,3001/tcp,8000/tcp,8080/tcp,9000/tcp}

# Allow database connections
sudo firewall-cmd --permanent --add-service=mysql
sudo firewall-cmd --permanent --add-service=postgresql
sudo firewall-cmd --permanent --add-port=27017/tcp  # MongoDB

# Allow version control
sudo firewall-cmd --permanent --add-port=9418/tcp  # Git

# Create development zone
sudo firewall-cmd --permanent --new-zone=development
sudo firewall-cmd --permanent --zone=development --add-source=192.168.1.0/24
sudo firewall-cmd --permanent --zone=development --add-port={3000-3010/tcp,8000-8010/tcp}

# Restrict access to development services
sudo firewall-cmd --permanent --zone=public --remove-port=3000/tcp
```

## Advanced Usage

### Direct Rules

#### Direct Interface Examples
```bash
# Add custom iptables rule
sudo firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport 10022 -j ACCEPT

# Add custom NAT rule
sudo firewall-cmd --permanent --direct --add-rule ipv4 nat PREROUTING 0 -p tcp --dport 2222 -j DNAT --to-destination 192.168.1.100:22

# List all direct rules
sudo firewall-cmd --direct --get-all-rules

# Remove direct rule
sudo firewall-cmd --permanent --direct --remove-rule ipv4 filter INPUT 0 -p tcp --dport 10022 -j ACCEPT

# Add chain
sudo firewall-cmd --permanent --direct --add-chain ipv4 filter custom_chain

# Pass to custom chain
sudo firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -j custom_chain
```

### Zone Customization

#### Creating Custom Zones
```bash
# Create new zone
sudo firewall-cmd --permanent --new-zone=webserver

# Configure zone settings
sudo firewall-cmd --permanent --zone=webserver --set-target=DEFAULT
sudo firewall-cmd --permanent --zone=webserver --add-service=http
sudo firewall-cmd --permanent --zone=webserver --add-service=https
sudo firewall-cmd --permanent --zone=webserver --add-service=ssh

# Add sources to zone
sudo firewall-cmd --permanent --zone=webserver --add-source=203.0.113.0/24
sudo firewall-cmd --permanent --zone=webserver --add-source=198.51.100.0/24

# Reload to apply new zone
sudo firewall-cmd --reload
```

### Complex Rich Rules

#### Advanced Filtering
```bash
# Allow HTTP with rate limiting
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="http" log limit value="100/m" accept'

# Block SSH with logging
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="ssh" log prefix="SSH Denied" level="notice" reject'

# Allow specific user agent (HTTP)
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="http" accept'

# Multi-port allow with conditions
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" port protocol="tcp" port="{22,80,443}" accept'

# Time-based rule (kernel 3.6+)
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port protocol="tcp" port="22" accept'

# Complex logging and action
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="0.0.0.0/0" port protocol="tcp" port="3389" log prefix="RDP" limit value="3/m" reject'
```

## Integration and Automation

### Shell Scripts

#### Firewall Configuration Script
```bash
#!/bin/bash
# Automated firewall setup for web server

# Set variables
WEB_ZONE="public"
MGMT_ZONE="management"
MGMT_NETWORK="10.0.0.0/8"

# Set default zone
sudo firewall-cmd --set-default-zone="$WEB_ZONE"

# Configure web services
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=8080/tcp

# Create management zone
if ! firewall-cmd --get-zones | grep -q "$MGMT_ZONE"; then
    sudo firewall-cmd --permanent --new-zone="$MGMT_ZONE"
fi

# Configure management access
sudo firewall-cmd --permanent --zone="$MGMT_ZONE" --add-source="$MGMT_NETWORK"
sudo firewall-cmd --permanent --zone="$MGMT_ZONE" --add-service=ssh

# Add security rules
sudo firewall-cmd --permanent --add-rich-rule='rule service name="ssh" log prefix="SSH Access" level="info" accept'
sudo firewall-cmd --permanent --add-rich-rule='rule service name="ssh" log prefix="SSH Brute Force" level="warning" limit value="5/m" reject'

# Block common attack vectors
sudo firewall-cmd --permanent --add-icmp-block=echo-request
sudo firewall-cmd --permanent --set-log-denied=all

# Apply changes
sudo firewall-cmd --reload

echo "Firewall configuration completed successfully"
```

#### Backup and Restore Script
```bash
#!/bin/bash
# Firewall backup and restore script

BACKUP_DIR="/backup/firewall"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup current configuration
sudo firewall-cmd --list-all-zones > "$BACKUP_DIR/zones_$DATE.txt"
sudo cp -r /etc/firewalld "$BACKUP_DIR/firewalld_$DATE"

# Function to restore firewall
restore_firewall() {
    local backup_date=$1

    # Stop firewalld
    sudo systemctl stop firewalld

    # Restore configuration
    sudo rm -rf /etc/firewalld
    sudo cp -r "$BACKUP_DIR/firewalld_$backup_date" /etc/firewalld

    # Start firewalld
    sudo systemctl start firewalld
    sudo firewall-cmd --reload

    echo "Firewall restored from backup: $backup_date"
}

# List backups
list_backups() {
    echo "Available firewall backups:"
    ls -la "$BACKUP_DIR" | grep firewall
}

case "$1" in
    backup)
        echo "Firewall backup created: $DATE"
        ;;
    restore)
        if [ -n "$2" ]; then
            restore_firewall "$2"
        else
            echo "Usage: $0 restore <backup_date>"
            exit 1
        fi
        ;;
    list)
        list_backups
        ;;
    *)
        echo "Usage: $0 {backup|restore|list}"
        exit 1
        ;;
esac
```

### Monitoring and Logging

#### Firewall Monitoring
```bash
# Monitor firewall logs in real-time
sudo tail -f /var/log/firewalld

# Monitor system logs for firewall events
sudo tail -f /var/log/messages | grep -i firewall

# Check recent blocked connections
sudo journalctl -u firewalld --since "1 hour ago" | grep -i "reject\|drop"

# Monitor connection attempts
sudo journalctl -f | grep -i "firewall\|kernel.*IN=\|OUT="

# Check firewall status and active zones
watch -n 5 'sudo firewall-cmd --state && sudo firewall-cmd --get-active-zones'
```

## Troubleshooting

### Common Issues

#### Firewall Not Starting
```bash
# Check firewall status
sudo systemctl status firewalld

# Check for configuration errors
sudo firewall-cmd --check-config

# Check logs for errors
sudo journalctl -u firewalld -n 50

# Restart firewall service
sudo systemctl restart firewalld

# Check if ports are actually blocked
sudo ss -tuln
```

#### Rules Not Applying
```bash
# Check runtime vs permanent rules
firewall-cmd --list-all
sudo firewall-cmd --permanent --list-all

# Reload to apply permanent changes
sudo firewall-cmd --reload

# Check active zones
sudo firewall-cmd --get-active-zones

# Verify rule syntax
sudo firewall-cmd --check-config

# Check if service is running
sudo firewall-cmd --state
```

#### Connectivity Issues
```bash
# Test connectivity before and after rules
ping -c 3 8.8.8.8
telnet example.com 80

# Check specific port status
sudo ss -tuln | grep :80
netstat -tuln | grep :80

# Check firewall logs for blocks
sudo journalctl -u firewalld | grep -i reject
sudo grep -i "reject\|drop" /var/log/messages

# Temporarily disable for testing
sudo systemctl stop firewalld
# Test connectivity
sudo systemctl start firewalld
```

### Performance Optimization

#### Optimizing Rules
```bash
# Use efficient rich rules
# Bad (multiple rules):
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.1" accept'
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.2" accept'

# Good (single rule):
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" accept'

# Use services instead of ports when possible
sudo firewall-cmd --add-service=http  # Better than port 80/tcp

# Group similar rules
sudo firewall-cmd --add-port={80,443,8080}/tcp  # Better than separate commands

# Use proper zones to reduce rule complexity
sudo firewall-cmd --zone=internal --add-service=ssh  # Instead of rich rules
```

## Related Commands

- [`iptables`](/docs/commands/networking/iptables) - Traditional packet filtering tool
- [`nftables`](/docs/commands/networking/nftables) - Modern packet filtering framework
- [`ufw`](/docs/commands/networking/ufw) - Uncomplicated Firewall
- [`systemctl`](/docs/commands/system-services/systemctl) - System service manager
- [`netstat`](/docs/commands/system-information/netstat) - Network statistics
- [`ss`](/docs/commands/system-information/ss) - Socket statistics
- [`journalctl`](/docs/commands/user-management/journalctl) - Systemd journal viewer
- [`networkctl`](/docs/commands/network-tools/networkctl) - Network management

## Best Practices

1. **Always test rules in runtime first** before making them permanent
2. **Use zones appropriately** - separate different network trust levels
3. **Apply the principle of least privilege** - only allow what's necessary
4. **Document custom rules** - maintain clear records of firewall changes
5. **Regularly backup configurations** - before making major changes
6. **Monitor logs regularly** - for security incidents and troubleshooting
7. **Use service definitions** instead of raw port numbers when possible
8. **Implement proper logging** - for security monitoring and audit purposes
9. **Review rules periodically** - remove unused or outdated rules
10. **Test after changes** - ensure critical services still work

## Security Considerations

1. **Block unnecessary services** - minimize attack surface
2. **Use rich rules for granular control** - instead of broad port opening
3. **Implement rate limiting** - to prevent brute force attacks
4. **Log denied traffic** - for security monitoring
5. **Restrict management access** - only allow SSH from trusted networks
6. **Regularly review firewall rules** - remove unnecessary access
7. **Use source-based restrictions** - limit access by IP/network
8. **Enable masquerading carefully** - only when needed for NAT
9. **Monitor firewall logs** - for suspicious activity patterns
10. **Keep firewalld updated** - for security patches

The `firewall-cmd` command provides a powerful and flexible interface for managing Linux firewalls through firewalld. Its zone-based approach, runtime/permanent separation, and rich rule capabilities make it an excellent choice for both simple and complex network security configurations.