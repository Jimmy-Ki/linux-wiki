---
title: iptables - Linux Firewall Administration
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# iptables - Linux Firewall Administration

The `iptables` command is the user-space interface for the Linux kernel firewall system `netfilter`. It provides powerful packet filtering, network address translation (NAT), and packet mangling capabilities to secure Linux systems and networks.

## Basic Syntax

```bash
iptables [options] [chain] [rule-specification]
iptables -t table [options] [chain] [rule-specification]
```

## Common Options

### Table Selection
- `-t filter` - Filter table (default) - packet filtering
- `-t nat` - NAT table - network address translation
- `-t mangle` - Mangle table - packet modification
- `-t raw` - Raw table - connection tracking exemptions

### Chain Management
- `-A, --append chain` - Append rule to chain end
- `-I, --insert chain [rulenum]` - Insert rule at position
- `-D, --delete chain rulenum` - Delete rule by number
- `-R, --replace chain rulenum` - Replace rule
- `-F, --flush [chain]` - Flush all rules from chain
- `-X, --delete-chain [chain]` - Delete custom chain
- `-N, --new-chain chain` - Create new custom chain
- `-P, --policy chain target` - Set chain default policy
- `-E, --rename-chain old-chain new-chain` - Rename chain

### Rule Matching
- `-p, --protocol protocol` - Protocol (tcp, udp, icmp, all)
- `-s, --source address[/mask]` - Source IP/network
- `-d, --destination address[/mask]` - Destination IP/network
- `-i, --in-interface interface` - Input interface
- `-o, --out-interface interface` - Output interface
- `--sport [!] port[:port]` - Source port range
- `--dport [!] port[:port]` - Destination port range
- `-m, --match match` - Use extended match module

### Actions (Targets)
- `ACCEPT` - Allow packet through
- `DROP` - Silently drop packet
- `REJECT` - Drop packet and send rejection
- `LOG` - Log packet and continue processing
- `DNAT` - Destination NAT
- `SNAT` - Source NAT
- `MASQUERADE` - Dynamic source NAT
- `REDIRECT` - Redirect to local port

### Display Options
- `-L, --list [chain]` - List rules in chain
- `-v, --verbose` - Verbose output
- `-n, --numeric` - Numeric output (no DNS lookups)
- `--line-numbers` - Show rule numbers
- `-x, --exact` - Exact numbers instead of K/M/G

## Usage Examples

### Basic Firewall Setup

#### Clear Existing Rules
```bash
# Flush all rules
iptables -F
iptables -X
iptables -Z

# Set default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
```

#### Allow Loopback and Established Connections
```bash
# Allow loopback interface
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established and related connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

### Common Service Ports

#### SSH Access
```bash
# Allow SSH from anywhere
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow SSH only from specific network
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 22 -j ACCEPT

# Allow SSH only from specific IP
iptables -A INPUT -p tcp -s 203.0.113.10 --dport 22 -j ACCEPT
```

#### Web Services
```bash
# HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Alternative HTTP ports
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
iptables -A INPUT -p tcp --dport 8443 -j ACCEPT
```

#### Database Services
```bash
# MySQL (restrict to specific network)
iptables -A INPUT -p tcp -s 10.0.0.0/8 --dport 3306 -j ACCEPT

# PostgreSQL
iptables -A INPUT -p tcp -s 10.0.0.0/8 --dport 5432 -j ACCEPT

# Redis
iptables -A INPUT -p tcp -s 127.0.0.1 --dport 6379 -j ACCEPT
```

### Network Address Translation (NAT)

#### Internet Connection Sharing
```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# NAT for internal network to internet
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE

# Forward traffic for internal network
iptables -A FORWARD -i eth1 -o eth0 -s 192.168.1.0/24 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -d 192.168.1.0/24 -m state --state ESTABLISHED,RELATED -j ACCEPT
```

#### Port Forwarding
```bash
# Forward external port 8080 to internal server port 80
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80
iptables -A FORWARD -p tcp -d 192.168.1.100 --dport 80 -j ACCEPT

# Forward SSH to internal server
iptables -t nat -A PREROUTING -p tcp --dport 2222 -j DNAT --to-destination 192.168.1.100:22
iptables -A FORWARD -p tcp -d 192.168.1.100 --dport 22 -j ACCEPT
```

### Security and Attack Prevention

#### IP Blocking
```bash
# Block specific IP addresses
iptables -A INPUT -s 192.0.2.100 -j DROP
iptables -A INPUT -s 203.0.113.0/24 -j DROP

# Block IPs by country (using geoip module if available)
iptables -A INPUT -m geoip --src-cc CN,RU -j DROP
```

#### Rate Limiting
```bash
# Limit SSH connections to 5 per minute
iptables -A INPUT -p tcp --dport 22 -m limit --limit 5/min --limit-burst 5 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP

# Limit ping requests
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

# Limit HTTP connections per IP
iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 20 -j REJECT
```

#### SYN Flood Protection
```bash
# SYN flood protection
iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# TCP SYN cookies protection (sysctl)
sysctl -w net.ipv4.tcp_syncookies=1
```

#### Port Scanning Protection
```bash
# Block port scans
iptables -A INPUT -m recent --name portscan --rcheck --seconds 86400 -j DROP
iptables -A INPUT -m recent --name portscan --set -j LOG --log-prefix "Port Scan: "
iptables -A INPUT -m recent --name portscan --set -j DROP

# Block invalid packets
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP
```

## Advanced iptables Features

### Multi-port Matching
```bash
# Allow multiple ports in single rule
iptables -A INPUT -p tcp -m multiport --dports 22,80,443,3306 -j ACCEPT

# Allow range of ports
iptables -A INPUT -p tcp --dport 1000:2000 -j ACCEPT
```

### String Matching
```bash
# Block HTTP requests containing malicious strings
iptables -A INPUT -p tcp --dport 80 -m string --algo bm --string "cmd.exe" -j DROP
iptables -A INPUT -p tcp --dport 80 -m string --algo bm --string "../" -j DROP
```

### Time-based Rules
```bash
# Allow SSH only during business hours
iptables -A INPUT -p tcp --dport 22 -m time --timestart 09:00 --timestop 17:00 --weekdays Mon,Tue,Wed,Thu,Fri -j ACCEPT

# Block gaming sites during work hours
iptables -A FORWARD -p tcp --dport 80 -m time --timestart 09:00 --timestop 17:00 -m string --algo bm --string "game" -j DROP
```

### Connection Limits
```bash
# Limit connections per IP
iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 50 --connlimit-mask 32 -j REJECT

# Limit new connections per second
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
```

### Custom Chains
```bash
# Create custom chain for HTTP traffic
iptables -N HTTP_CHAIN
iptables -A INPUT -p tcp --dport 80 -j HTTP_CHAIN

# Add rules to custom chain
iptables -A HTTP_CHAIN -m recent --name http_flood --rcheck --seconds 1 --hitcount 10 -j DROP
iptables -A HTTP_CHAIN -m recent --name http_flood --set -j ACCEPT
```

## Practical Examples

### Web Server Firewall
```bash
#!/bin/bash
# Web Server Basic Firewall

# Flush existing rules
iptables -F
iptables -X
iptables -Z

# Set default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# SSH (from admin network only)
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 22 -m state --state NEW -j ACCEPT

# HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -m state --state NEW -j ACCEPT

# Allow FTP (passive mode)
iptables -A INPUT -p tcp --dport 21 -m state --state NEW -j ACCEPT
iptables -A INPUT -p tcp --dport 50000:60000 -m state --state NEW -j ACCEPT

# Rate limiting
iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min --limit-burst 3 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -m limit --limit 50/sec --limit-burst 200 -j ACCEPT

# Log and drop other traffic
iptables -A INPUT -j LOG --log-prefix "INPUT DENIED: "
iptables -A INPUT -j DROP
```

### Router/Gateway Setup
```bash
#!/bin/bash
# Basic Router/Gateway Setup

# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Flush existing NAT rules
iptables -t nat -F
iptables -t mangle -F

# NAT for internal network
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j MASQUERADE

# Port forwarding for web server
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.10:80
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j DNAT --to-destination 192.168.1.10:443

# Forward rules
iptables -A FORWARD -i eth1 -o eth0 -s 192.168.1.0/24 -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -d 192.168.1.0/24 -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow management from internal network
iptables -A INPUT -i eth1 -s 192.168.1.0/24 -j ACCEPT
```

### Development Environment Firewall
```bash
#!/bin/bash
# Development Environment with Multiple Services

# Flush existing rules
iptables -F
iptables -X
iptables -Z

# Default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Basic allowances
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Development services
iptables -A INPUT -p tcp --dport 22 -j ACCEPT      # SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT      # HTTP
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT    # Node.js
iptables -A INPUT -p tcp --dport 8000 -j ACCEPT    # Django/Python
iptables -A INPUT -p tcp --dport 5000 -j ACCEPT    # Flask
iptables -A INPUT -p tcp --dport 3306 -j ACCEPT    # MySQL
iptables -A INPUT -p tcp --dport 5432 -j ACCEPT    # PostgreSQL
iptables -A INPUT -p tcp --dport 6379 -j ACCEPT    # Redis
iptables -A INPUT -p tcp --dport 27017 -j ACCEPT   # MongoDB

# Only allow ICMP ping from development network
iptables -A INPUT -p icmp -s 192.168.1.0/24 -j ACCEPT

# Log denied attempts
iptables -A INPUT -j LOG --log-prefix "DEV_FW: "
```

## Managing iptables

### Saving and Restoring Rules
```bash
# Save current rules (RHEL/CentOS)
iptables-save > /etc/sysconfig/iptables

# Save current rules (Debian/Ubuntu)
iptables-save > /etc/iptables/rules.v4

# Restore rules
iptables-restore < /etc/sysconfig/iptables

# Save to custom location
iptables-save > /root/iptables-backup-$(date +%Y%m%d).rules
```

### Listing Rules
```bash
# List all rules with verbose output
iptables -L -v -n

# List specific chain
iptables -L INPUT -v -n

# List with line numbers
iptables -L --line-numbers

# List NAT table
iptables -t nat -L -v -n

# List rules in a specific format
iptables -S INPUT
iptables-save
```

### Rule Analysis
```bash
# Count packet and byte traffic
iptables -L -v -n | grep -E "(pkts|bytes)"

# Monitor rules in real-time
watch "iptables -L -v -n --line-numbers"

# Show connection tracking table
cat /proc/net/nf_conntrack
```

## Related Commands

- [`firewall-cmd`](/docs/commands/security/firewall-cmd) - Firewalld administration
- [`ufw`](/docs/commands/security/ufw) - Uncomplicated Firewall
- [`ip6tables`](/docs/commands/security/ip6tables) - IPv6 firewall
- [`nft`](/docs/commands/security/nft) - nftables command
- [`conntrack`](/docs/commands/security/conntrack) - Connection tracking utility
- [`netstat`](/docs/commands/networking/netstat) - Network statistics
- [`ss`](/docs/commands/networking/ss) - Socket statistics

## Best Practices

### Security Considerations
1. **Default deny policy** - Drop all traffic by default, explicitly allow what's needed
2. **Least privilege** - Only open ports that are absolutely necessary
3. **Limit access** - Restrict services to specific IP networks when possible
4. **Monitor logs** - Regularly check firewall logs for suspicious activity
5. **Rate limiting** - Implement rate limits to prevent DoS attacks
6. **Keep rules organized** - Use comments and logical rule ordering

### Performance Optimization
1. **Rule order matters** - Put frequently matched rules first
2. **Use stateful inspection** - Utilize connection tracking efficiently
3. **Avoid excessive rules** - Consolidate similar rules when possible
4. **Regular cleanup** - Remove outdated or unused rules
5. **Use appropriate modules** - Load only necessary iptables modules

### Maintenance and Backup
1. **Regular backups** - Save working rule sets before making changes
2. **Document rules** - Maintain documentation for all firewall rules
3. **Test thoroughly** - Validate rule changes in non-production environment
4. **Automate deployment** - Use scripts for consistent rule deployment
5. **Version control** - Store rule files in version control system

### Common Pitfalls to Avoid
1. **Locking yourself out** - Always have alternative access methods
2. **Forgotten rules** - Regular audit of active rules
3. **Complex rules** - Keep rules simple and understandable
4. **Missing state rules** - Don't forget established/related connections
5. **Testing oversight** - Always test rule changes before production deployment

The `iptables` command is a powerful tool for Linux network security, providing granular control over network traffic. Understanding its various tables, chains, and rule syntax is essential for securing Linux systems and networks effectively.