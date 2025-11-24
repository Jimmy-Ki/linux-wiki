---
title: firewall-cmd - Firewalld Command Line Tool
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# firewall-cmd - Firewalld Command Line Tool

The `firewall-cmd` command is the command-line interface for firewalld, a dynamic firewall management tool for Linux. It provides zone-based firewall management with support for runtime and permanent configuration changes without disrupting existing connections.

## Basic Syntax

```bash
firewall-cmd [OPTIONS...] [ARGUMENTS...]
```

## Common Options

### General Options
- `-h, --help` - Display help information
- `-V, --version` - Display version information
- `-q, --quiet` - Suppress output messages
- `--state` - Display firewalld status
- `--reload` - Reload firewall without disrupting connections
- `--complete-reload` - Reload firewall with disruption
- `--runtime-to-permanent` - Make runtime configuration permanent
- `--permanent` - Make changes permanent (with reload)

### Zone Management
- `--get-zones` - List all available zones
- `--get-default-zone` - Get default zone
- `--set-default-zone=<zone>` - Set default zone
- `--get-active-zones` - List active zones
- `--zone=<zone>` - Specify zone for operations

### Service and Port Management
- `--add-service=<service>` - Add service to zone
- `--remove-service=<service>` - Remove service from zone
- `--add-port=<port>/<protocol>` - Add port to zone
- `--remove-port=<port>/<protocol>` - Remove port from zone
- `--list-services` - List services in zone
- `--list-ports` - List ports in zone
- `--list-all` - List all configuration for zone

### Interface Management
- `--add-interface=<interface>` - Add interface to zone
- `--remove-interface=<interface>` - Remove interface from zone
- `--change-interface=<interface>` - Move interface to zone
- `--get-zone-of-interface=<interface>` - Get zone of interface

### Rich Rules
- `--add-rich-rule='rule'` - Add rich rule
- `--remove-rich-rule='rule'` - Remove rich rule
- `--list-rich-rules` - List rich rules

### Direct Rules
- `--direct --add-rule <args>` - Add direct iptables rule
- `--direct --remove-rule <args>` - Remove direct iptables rule
- `--direct --get-all-rules` - List all direct rules

## Usage Examples

### Basic Firewalld Operations

#### Check Status and Start Firewalld
```bash
# Check if firewalld is running
firewall-cmd --state

# Start firewalld service
systemctl start firewalld

# Enable firewalld on boot
systemctl enable firewalld

# Stop firewalld service
systemctl stop firewalld

# Disable firewalld on boot
systemctl disable firewalld
```

#### Basic Configuration
```bash
# Get version information
firewall-cmd --version

# Get current configuration
firewall-cmd --list-all

# Reload firewall without disruption
firewall-cmd --reload

# Complete reload (with disruption)
firewall-cmd --complete-reload

# Make runtime rules permanent
firewall-cmd --runtime-to-permanent
```

### Zone Management

#### Understanding Zones
```bash
# List all available zones
firewall-cmd --get-zones

# Show default zone
firewall-cmd --get-default-zone

# Show active zones
firewall-cmd --get-active-zones

# Show all information about a specific zone
firewall-cmd --zone=public --list-all

# Set default zone
firewall-cmd --set-default-zone=home
```

#### Zone Configuration
```bash
# Change default zone to dmz
firewall-cmd --set-default-zone=dmz

# Add interface to specific zone (temporary)
firewall-cmd --zone=work --add-interface=eth0

# Add interface to specific zone (permanent)
firewall-cmd --permanent --zone=work --add-interface=eth0

# Move interface to different zone
firewall-cmd --zone=internal --change-interface=eth1

# Get zone of specific interface
firewall-cmd --get-zone-of-interface=eth0
```

### Service Management

#### Basic Service Operations
```bash
# List all predefined services
firewall-cmd --get-services

# Add service to default zone (temporary)
firewall-cmd --add-service=http

# Add service permanently
firewall-cmd --permanent --add-service=http

# Remove service
firewall-cmd --remove-service=http

# List services in current zone
firewall-cmd --list-services

# Add service to specific zone
firewall-cmd --zone=public --add-service=ssh
firewall-cmd --zone=public --add-service=ssh --permanent
```

#### Common Services
```bash
# Web services
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https

# Database services
firewall-cmd --permanent --add-service=mysql
firewall-cmd --permanent --add-service=postgresql

# File services
firewall-cmd --permanent --add-service=nfs
firewall-cmd --permanent --add-service=samba

# Email services
firewall-cmd --permanent --add-service=smtp
firewall-cmd --permanent --add-service=pop3s
firewall-cmd --permanent --add-service=imaps

# Remote access
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=rdp
```

### Port Management

#### Basic Port Operations
```bash
# Open port temporarily
firewall-cmd --add-port=8080/tcp

# Open port permanently
firewall-cmd --permanent --add-port=8080/tcp

# Open port range
firewall-cmd --permanent --add-port=10000-20000/tcp

# Open UDP port
firewall-cmd --permanent --add-port=53/udp

# Remove port
firewall-cmd --permanent --remove-port=8080/tcp

# List open ports
firewall-cmd --list-ports
```

#### Port Examples
```bash
# Custom web server port
firewall-cmd --permanent --add-port=8080/tcp
firewall-cmd --permanent --add-port=8443/tcp

# Database ports
firewall-cmd --permanent --add-port=3306/tcp  # MySQL
firewall-cmd --permanent --add-port=5432/tcp  # PostgreSQL
firewall-cmd --permanent --add-port=6379/tcp  # Redis
firewall-cmd --permanent --add-port=27017/tcp # MongoDB

# Application-specific ports
firewall-cmd --permanent --add-port=3000/tcp  # Node.js
firewall-cmd --permanent --add-port=8000/tcp  # Django
firewall-cmd --permanent --add-port=5000/tcp  # Flask
```

### Rich Rules

#### Advanced Rule Management
```bash
# Allow specific IP address
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" accept'

# Allow specific IP only on specific port
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" port protocol="tcp" port="22" accept'

# Block specific IP
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.200" drop'

# Forward port to another machine
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" forward-port port="80" protocol="tcp" to-port="8080"'

# Limit connections per minute
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="ssh" limit value="5/m" accept'
```

#### Complex Rich Rule Examples
```bash
# Allow SSH from specific network with logging
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.0/24" service name="ssh" log prefix="ssh-allowed" level="info" accept'

# Block and log port scans
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" port port="1-65535" protocol="tcp" log prefix="port-scan" level="warning" drop'

# Allow HTTP from specific network, deny others with logging
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="http" accept'
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="http" log prefix="http-denied" level="notice" drop'

# Time-based access (if supported)
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'
```

### Port Forwarding and NAT

#### Basic Port Forwarding
```bash
# Enable masquerading (required for port forwarding)
firewall-cmd --permanent --add-masquerade

# Forward port 80 to port 8080 on same machine
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080

# Forward port to different machine
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.100

# Forward port to different machine and port
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.100:toport=8080
```

#### NAT Configuration
```bash
# Check if masquerading is enabled
firewall-cmd --query-masquerade

# Enable IP masquerading
firewall-cmd --permanent --add-masquerade

# Disable masquerading
firewall-cmd --permanent --remove-masquerade

# Forward HTTPS to internal server
firewall-cmd --permanent --add-forward-port=port=443:proto=tcp:toaddr=192.168.1.50:toport=443

# Forward range of ports
firewall-cmd --permanent --add-forward-port=port=5000-6000:proto=tcp:toaddr=192.168.1.60
```

### Direct Rules

#### Iptables Integration
```bash
# Add direct iptables rule
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport 9000 -j ACCEPT

# Add rule with position
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 1 -s 192.168.1.0/24 -j ACCEPT

# List all direct rules
firewall-cmd --permanent --direct --get-all-rules

# List rules for specific chain
firewall-cmd --permanent --direct --get-rules ipv4 filter INPUT

# Remove direct rule
firewall-cmd --permanent --direct --remove-rule ipv4 filter INPUT 0 -p tcp --dport 9000 -j ACCEPT
```

### Service Configuration

#### Custom Service Creation
```bash
# Create new service
firewall-cmd --permanent --new-service=custom-app

# Set service description
firewall-cmd --permanent --service=custom-app --set-description="Custom Application Service"

# Add port to service
firewall-cmd --permanent --service=custom-app --add-port=8080/tcp
firewall-cmd --permanent --service=custom-app --add-port=8081/tcp

# Add module to service
firewall-cmd --permanent --service=custom-app --add-module=conntrack

# Set destination for service
firewall-cmd --permanent --service=custom-app --set-destination=ipv4:192.168.1.100

# Add service to zone
firewall-cmd --permanent --zone=public --add-service=custom-app

# Show service information
firewall-cmd --info-service=custom-app
```

### Panic Mode

#### Emergency Shutdown
```bash
# Enable panic mode (block all traffic)
firewall-cmd --panic-on

# Disable panic mode
firewall-cmd --panic-off

# Check panic mode status
firewall-cmd --query-panic
```

### Log Management

#### Configure Logging
```bash
# Get current log denied setting
firewall-cmd --get-log-denied

# Set log denied to 'all'
firewall-cmd --set-log-denied=all

# Set log denied to 'unicast'
firewall-cmd --set-log-denied=unicast

# Disable logging of denied packets
firewall-cmd --set-log-denied=off
```

## Practical Examples

### Web Server Configuration
```bash
#!/bin/bash
# Web Server Firewall Configuration

# Set default zone to public
firewall-cmd --set-default-zone=public

# Enable and start firewalld
systemctl enable firewalld
systemctl start firewalld

# Web services
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https

# SSH from specific network only
firewall-cmd --permanent --zone=public --remove-service=ssh
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" service name="ssh" accept'

# Allow monitoring from internal network
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" port port="8080" protocol="tcp" accept'

# Rate limit SSH connections
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="ssh" limit value="5/m" log prefix="ssh-limit" level="info" accept'

# Reload configuration
firewall-cmd --reload
```

### Database Server Configuration
```bash
#!/bin/bash
# Database Server Firewall Configuration

# Create database zone
firewall-cmd --permanent --new-zone=database
firewall-cmd --permanent --zone=database --set-description="Database Access Zone"

# Add database interface to database zone
firewall-cmd --permanent --zone=database --change-interface=eth1

# Allow database services from application servers
firewall-cmd --permanent --zone=database --add-rich-rule='rule family="ipv4" source address="192.168.1.100" service name="mysql" accept'
firewall-cmd --permanent --zone=database --add-rich-rule='rule family="ipv4" source address="192.168.1.100" service name="postgresql" accept'

# Allow SSH from admin network
firewall-cmd --permanent --zone=database --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" service name="ssh" accept'

# Enable logging
firewall-cmd --permanent --zone=database --add-rich-rule='rule family="ipv4" service name="mysql" log prefix="mysql-access" level="info" accept'

# Reload configuration
firewall-cmd --reload
```

### Development Environment Setup
```bash
#!/bin/bash
# Development Environment Firewall

# Set up development zone
firewall-cmd --permanent --new-zone=development
firewall-cmd --permanent --set-default-zone=development

# Development services and ports
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-port=3000/tcp  # Node.js
firewall-cmd --permanent --add-port=8000/tcp  # Django/Flask
firewall-cmd --permanent --add-port=5000/tcp  # Flask
firewall-cmd --permanent --add-port=9200/tcp  # Elasticsearch
firewall-cmd --permanent --add-port=3306/tcp  # MySQL
firewall-cmd --permanent --add-port=6379/tcp  # Redis

# Allow from developer network
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.100.0/24" accept'

# Rate limiting for web services
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" service name="http" limit value="100/m" accept'

# Enable logging for debugging
firewall-cmd --set-log-denied=all

# Reload configuration
firewall-cmd --reload
```

### Router/Gateway Configuration
```bash
#!/bin/bash
# Router/Gateway Firewall Configuration

# Enable masquerading for NAT
firewall-cmd --permanent --add-masquerade

# Forward common services to internal servers
firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toaddr=192.168.1.10
firewall-cmd --permanent --add-forward-port=port=443:proto=tcp:toaddr=192.168.1.10
firewall-cmd --permanent --add-forward-port=port=25:proto=tcp:toaddr=192.168.1.20

# Port forwarding to specific ports
firewall-cmd --permanent --add-forward-port=port=2222:proto=tcp:toaddr=192.168.1.10:toport=22

# Allow management from internal network
firewall-cmd --permanent --zone=internal --add-service=ssh
firewall-cmd --permanent --zone=internal --add-service=https

# External zone restrictions
firewall-cmd --permanent --zone=external --add-service=ssh
firewall-cmd --permanent --zone=external --add-service=http
firewall-cmd --permanent --zone=external --add-service=https

# Log dropped packets
firewall-cmd --permanent --zone=external --add-rich-rule='rule service name="ssh" log prefix="ssh-attempt" level="notice" accept'

# Reload configuration
firewall-cmd --reload
```

## Zone Types and Their Uses

### Predefined Zones
- **drop** - Drop all incoming packets without response
- **block** - Reject all incoming packets with ICMP-host-prohibited
- **public** - For use in public areas, only selected connections accepted
- **external** - For external networks with masquerading enabled
- **dmz** - For computers in DMZ zone with limited access to internal network
- **work** - For work areas with most computers trusted
- **home** - For home areas with most computers trusted
- **internal** - For internal networks with most computers trusted
- **trusted** - All network connections are accepted

### Zone Selection Guidelines
```bash
# Public servers (internet-facing)
firewall-cmd --set-default-zone=public

# Development workstations
firewall-cmd --set-default-zone=work

# Home networks
firewall-cmd --set-default-zone=home

# Highly trusted internal networks
firewall-cmd --set-default-zone=internal

# Maximum security environments
firewall-cmd --set-default-zone=drop
```

## Related Commands

- [`iptables`](/docs/commands/security/iptables) - Traditional Linux firewall
- [`ufw`](/docs/commands/security/ufw) - Uncomplicated Firewall
- [`nftables`](/docs/commands/security/nftables) - Modern packet filtering framework
- [`systemctl`](/docs/commands/system-service/systemctl) - Service management
- [`netstat`](/docs/commands/networking/netstat) - Network statistics
- [`ss`](/docs/commands/networking/ss) - Socket statistics
- [`nmap`](/docs/commands/networking/nmap) - Network scanning tool

## Best Practices

### Security Considerations
1. **Use appropriate zones** - Choose zones that match your security requirements
2. **Principle of least privilege** - Only open necessary ports and services
3. **Regular monitoring** - Check firewall logs for suspicious activity
4. **Backup configurations** - Export working configurations before making changes
5. **Test thoroughly** - Validate changes in non-production environments
6. **Document exceptions** - Keep track of why specific rules were created

### Performance Optimization
1. **Use services over ports** - Services are easier to manage and understand
2. **Organize rules logically** - Group related rules together
3. **Avoid overly complex rich rules** - Break complex rules into simpler ones
4. **Regular cleanup** - Remove outdated or unused rules
5. **Monitor rule performance** - Check which rules are being hit most frequently

### Management Best Practices
1. **Use permanent configuration** - Make important changes permanent with `--permanent`
2. **Reload properly** - Use `--reload` for live updates, `--complete-reload` for major changes
3. **Zone-based management** - Group interfaces and services into appropriate zones
4. **Automate deployments** - Use scripts for consistent firewall deployment
5. **Version control** - Store firewall configurations in version control

### Common Pitfalls to Avoid
1. **Forgetting to reload** - Changes won't take effect until reloaded
2. **Mixing runtime and permanent** - Be clear about which mode you're using
3. **Complex rich rules** - Keep rules simple and maintainable
4. **No backup before changes** - Always have a way to revert changes
5. **Ignoring logging** - Enable logging for troubleshooting and security monitoring

The `firewall-cmd` command provides a modern, zone-based approach to Linux firewall management that is more user-friendly than traditional iptables while maintaining powerful functionality for complex network security requirements.