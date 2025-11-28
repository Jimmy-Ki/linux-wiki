---
title: ufw - Uncomplicated Firewall
sidebar_label: ufw
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ufw - Uncomplicated Firewall

## Overview

The `ufw` (Uncomplicated Firewall) command is a user-friendly interface for managing iptables (netfilter) firewall rules on Linux systems. It provides a simplified syntax for common firewall operations while maintaining the power and flexibility of iptables underneath. UFW is the default firewall management tool on Ubuntu and Debian systems, designed to make firewall configuration accessible to system administrators of all skill levels.

UFW abstracts the complexity of iptables by providing intuitive commands for allowing, denying, and managing network traffic based on ports, protocols, IP addresses, and interfaces. It includes sensible defaults that prioritize security while enabling administrators to quickly implement essential firewall policies.

## Key Features

- **Simplified Syntax**: Easy-to-remember commands for common firewall operations
- **IPv4/IPv6 Support**: Native support for both IPv4 and IPv6 networking
- **Application Profiles**: Pre-configured rules for common services
- **Logging**: Comprehensive logging capabilities for monitoring and troubleshooting
- **Rate Limiting**: Built-in protection against brute-force attacks
- **Integration**: Seamlessly works with iptables and other network tools

## Syntax

```bash
ufw [GLOBAL_OPTIONS] COMMAND [COMMAND_OPTIONS]
```

### Global Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help message and exit |
| `-v, --version` | Display version information |
| `--dry-run` | Show what rules would be created without applying them |

## Installation and Setup

### Installing UFW

On Debian/Ubuntu systems:
```bash
sudo apt update
sudo apt install ufw
```

On RHEL/CentOS/Fedora systems:
```bash
sudo yum install ufw  # RHEL/CentOS 7
sudo dnf install ufw  # Fedora and RHEL/CentOS 8+
```

### Basic Setup

```bash
# Check UFW status
sudo ufw status

# Enable UFW (this will apply default rules)
sudo ufw enable

# Disable UFW
sudo ufw disable

# Reset UFW to default settings
sudo ufw reset
```

## Basic Command Usage

### Status Commands

```bash
# Show current status and active rules
sudo ufw status

# Show verbose status with numbered rules
sudo ufw status verbose

# Show numbered rules for easy deletion
sudo ufw status numbered
```

### Rule Management

```bash
# Allow traffic
sudo ufw allow <port/protocol>
sudo ufw allow <service_name>

# Deny traffic
sudo ufw deny <port/protocol>
sudo ufw deny <service_name>

# Reject traffic (sends rejection message)
sudo ufw reject <port/protocol>

# Delete rules
sudo ufw delete allow <port/protocol>
sudo ufw delete deny <port/protocol>
```

## Comprehensive Options Reference

### Port and Protocol Rules

#### Single Port Rules

```bash
# Allow specific port (default TCP)
sudo ufw allow 22/tcp
sudo ufw allow 80
sudo ufw deny 53/udp

# Allow port range
sudo ufw allow 1000:2000/tcp
sudo ufw allow 8000:9000/udp
```

#### Service-based Rules

```bash
# Use service names from /etc/services
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow ftp
sudo ufw allow smtp
sudo ufw allow dns
```

### IP Address-based Rules

#### Specific IP Rules

```bash
# Allow from specific IP
sudo ufw allow from 192.168.1.100
sudo ufw allow from 10.0.0.0/8

# Deny from specific IP
sudo ufw deny from 203.0.113.50
sudo ufw deny from 198.51.100.0/24

# Allow specific IP to specific port
sudo ufw allow from 192.168.1.100 to any port 22
sudo ufw allow from 10.0.0.0/8 to any port 3306
```

#### Interface-based Rules

```bash
# Rules based on network interfaces
sudo ufw allow in on eth0 to any port 80
sudo ufw allow out on eth1 to any port 53

# Allow traffic between interfaces
sudo ufw allow in on eth0 out on eth1
sudo ufw route allow in on eth0 out on eth1
```

### Application Profiles

```bash
# List available application profiles
sudo ufw app list

# Show details of an application profile
sudo ufw app info OpenSSH
sudo ufw app info Apache
sudo ufw app info Nginx

# Allow based on application profile
sudo ufw allow OpenSSH
sudo ufw allow Apache
sudo ufw allow 'Apache Full'

# Create custom application profile
sudo nano /etc/ufw/applications.d/myapp
```

#### Custom Application Profile Example

```ini
[MyWebApp]
title=My Custom Web Application
description=Custom web application running on ports 8080 and 8443
ports=8080,8443/tcp
```

```bash
# After creating the profile
sudo ufw app update myapp
sudo ufw allow myapp
```

## Advanced Rule Management

### Rule Deletion Methods

#### By Rule Specification

```bash
# Delete by exact rule specification
sudo ufw delete allow 22/tcp
sudo ufw delete deny from 192.168.1.0/24
sudo ufw delete reject 80
```

#### By Rule Number

```bash
# Show numbered rules first
sudo ufw status numbered

# Delete by number
sudo ufw delete 3
sudo ufw delete 5
```

#### Batch Operations

```bash
# Reset all rules
sudo ufw reset

# Disable UFW without deleting rules
sudo ufw disable
```

### Logging Configuration

```bash
# Enable logging
sudo ufw logging on

# Set logging level
sudo ufw logging low      # Minimal logging
sudo ufw logging medium   # Standard logging (default)
sudo ufw logging high     # Verbose logging
sudo ufw logging full     # Maximum logging

# Disable logging
sudo ufw logging off
```

### Rate Limiting

```bash
# Rate limit SSH connections (prevents brute force)
sudo ufw limit ssh

# Custom rate limiting
sudo ufw limit 22/tcp

# This allows:
# - 6 connections in the last 30 seconds
# - Once limit exceeded, connections are denied for 30 seconds
```

### Default Policies

```bash
# Set default incoming policy
sudo ufw default deny incoming    # Recommended
sudo ufw default allow incoming   # Less secure

# Set default outgoing policy
sudo ufw default allow outgoing   # Recommended
sudo ufw default deny outgoing    # More restrictive

# Set default routed policy
sudo ufw default deny routed
sudo ufw default allow routed
```

## Practical Usage Examples

### Basic Web Server Setup

```bash
# Enable UFW with basic web server rules
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow web traffic
sudo ufw allow http
sudo ufw allow https

# Allow SSH for management
sudo ufw allow ssh

# Status check
sudo ufw status verbose
```

### Database Server Configuration

```bash
# MySQL server example
sudo ufw enable
sudo ufw default deny incoming

# Allow SSH from admin network only
sudo ufw allow from 192.168.1.0/24 to any port 22

# Allow MySQL from application servers
sudo ufw allow from 10.0.0.0/24 to any port 3306
sudo ufw allow from 10.0.1.100 to any port 3306

# Deny other MySQL attempts
sudo ufw deny 3306
```

### Development Environment

```bash
# Allow development ports with restrictions
sudo ufw enable

# Allow development tools from local network only
sudo ufw allow from 192.168.1.0/24 to any port 3000  # Node.js
sudo ufw allow from 192.168.1.0/24 to any port 8080  # Tomcat
sudo ufw allow from 192.168.1.0/24 to any port 9000  # Development server

# Rate limit development access
sudo ufw limit from 192.168.1.0/24 to any port 22
```

### Home Network Router

```bash
# Basic home router setup
sudo ufw enable

# Allow established connections
sudo ufw allow in on eth0  # Internal network
sudo ufw allow out on eth1 # External network

# Allow specific services internally
sudo ufw allow in on eth0 to any port 53    # DNS
sudo ufw allow in on eth0 to any port 67    # DHCP
sudo ufw allow in on eth0 to any port 80    # Web interface
sudo ufw allow in on eth0 to any port 443   # Secure web

# Allow management from internal network
sudo ufw allow from 192.168.1.0/24 to any port 22
```

### Multi-interface Server

```bash
# Server with multiple network interfaces
sudo ufw enable

# Internal interface (eth0) - trusted
sudo ufw allow in on eth0
sudo ufw allow out on eth0

# External interface (eth1) - restricted
sudo ufw allow in on eth1 to any port 22    # SSH
sudo ufw allow in on eth1 to any port 80    # HTTP
sudo ufw allow in on eth1 to any port 443   # HTTPS
sudo ufw allow in on eth1 to any port 25    # SMTP

# Allow established connections
sudo ufw allow in on eth1 to any
```

## Advanced Configuration

### Configuration Files

#### Main Configuration: `/etc/default/ufw`

```bash
# Default policies
DEFAULT_INPUT_POLICY="DROP"
DEFAULT_OUTPUT_POLICY="ACCEPT"
DEFAULT_FORWARD_POLICY="DROP"
DEFAULT_APPLICATION_POLICY="SKIP"

# IPv6 support
IPV6=yes

# Additional options
MANAGE_BUILTINS=no
IPT_SYSCTL=/etc/sysctl.conf

# Logging
LOGLEVEL="medium"
```

#### Rules Directory: `/etc/ufw/`

```bash
# User rules files
/etc/ufw/before.rules
/etc/ufw/user.rules
/etc/ufw/after.rules

# IPv6 equivalents
/etc/ufw/before6.rules
/etc/ufw/user6.rules
/etc/ufw/after6.rules
```

### Custom Rules Integration

#### Custom before.rules

```bash
# /etc/ufw/before.rules
#
# Rules that should be run before UFW rules

# Don't delete these required lines
*filter
:ufw-before-input - [0:0]
:ufw-before-output - [0:0]
:ufw-before-forward - [0:0]

# Accept all traffic on loopback
-A ufw-before-input -i lo -j ACCEPT
-A ufw-before-output -o lo -j ACCEPT

# Drop packets with bogus TCP flags
-A ufw-before-input -p tcp --tcp-flags ALL NONE -j DROP
-A ufw-before-input -p tcp --tcp-flags ALL ALL -j DROP

# Accept established connections
-A ufw-before-input -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

COMMIT
```

#### Custom after.rules

```bash
# /etc/ufw/after.rules
#
# Rules that should be run after UFW rules

# Don't delete these required lines
*filter
:ufw-after-input - [0:0]
:ufw-after-output - [0:0]
:ufw-after-forward - [0:0]

# Log dropped packets
-A ufw-after-input -m limit --limit 3/min --limit-burst 10 -j LOG --log-prefix "[UFW BLOCK] "

# Reject with proper ICMP messages
-A ufw-after-input -p tcp -j REJECT --reject-with tcp-reset
-A ufw-after-input -p udp -j REJECT --reject-with icmp-port-unreachable

COMMIT
```

### Network Address Translation (NAT)

#### Masquerading Setup

```bash
# /etc/ufw/sysctl.conf
net.ipv4.ip_forward=1

# /etc/default/ufw
DEFAULT_FORWARD_POLICY="ACCEPT"

# /etc/ufw/before.rules - add at the end
*nat
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE
COMMIT
```

#### Port Forwarding

```bash
# /etc/ufw/before.rules - add to *nat section
*nat
:PREROUTING ACCEPT [0:0]
-A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:8080
COMMIT
```

## Monitoring and Troubleshooting

### Status Checking

```bash
# Basic status
sudo ufw status

# Verbose status with packet counters
sudo ufw status verbose

# Numbered rules for management
sudo ufw status numbered

# Detailed rule inspection
sudo iptables -L -n -v
sudo iptables -t nat -L -n -v
```

### Log Analysis

```bash
# Monitor UFW logs in real-time
sudo tail -f /var/log/ufw.log
sudo tail -f /var/log/kern.log | grep UFW

# Show recent blocked connections
sudo grep "UFW BLOCK" /var/log/ufw.log | tail -20

# Analyze blocked traffic patterns
sudo grep "UFW BLOCK" /var/log/ufw.log | awk '{print $12}' | sort | uniq -c | sort -nr

# Show top blocked IP addresses
sudo grep "UFW BLOCK" /var/log/ufw.log | awk '{print $NF}' | sort | uniq -c | sort -nr | head -10
```

### Log Analysis Examples

```bash
# Find all SSH connection attempts
sudo grep "UFW" /var/log/ufw.log | grep "DPT=22"

# Count blocked packets by destination port
sudo grep "UFW BLOCK" /var/log/ufw.log | grep "DPT=" | awk '{print $NF}' | sort | uniq -c

# Show traffic from specific IP
sudo grep "UFW" /var/log/ufw.log | grep "SRC=192.168.1.100"

# Generate daily summary
sudo grep "$(date '+%b %d')" /var/log/ufw.log | grep "UFW BLOCK" | wc -l
```

### Common Issues and Solutions

#### Rule Not Applying

```bash
# Check if UFW is active
sudo ufw status

# Check syntax of custom rules
sudo ufw --dry-run allow 8080

# Verify iptables rules
sudo iptables -L -n | grep 8080

# Reload UFW
sudo ufw reload
```

#### Connection Issues

```bash
# Check if service is running
sudo systemctl status ufw

# Check kernel module loading
lsmod | grep ip_tables

# Verify sysctl settings
sysctl net.ipv4.ip_forward

# Test connectivity
sudo ufw disable  # Temporarily disable for testing
sudo ufw enable   # Re-enable after testing
```

## Security Best Practices

### Default Security Policy

```bash
# Secure default configuration
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw default deny forward

# Enable immediately
sudo ufw enable
```

### SSH Hardening

```bash
# Rate limit SSH to prevent brute force
sudo ufw limit ssh/tcp

# Allow SSH from specific networks only
sudo ufw allow from 192.168.1.0/24 to any port 22
sudo ufw allow from 10.0.0.0/8 to any port 22

# Deny SSH from everywhere else
sudo ufw deny 22
```

### Service Exposure

```bash
# Only expose necessary services
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw allow 22/tcp   # SSH (rate limited)

# Block common attack ports
sudo ufw deny 23        # Telnet
sudo ufw deny 135       # RPC
sudo ufw deny 139       # NetBIOS
sudo ufw deny 445       # SMB
```

### Monitoring and Response

```bash
# Enable comprehensive logging
sudo ufw logging high

# Set up log rotation
sudo nano /etc/logrotate.d/ufw

# Monitor for suspicious activity
sudo tail -f /var/log/ufw.log | grep "UFW BLOCK"
```

## Automation and Scripting

### Bash Scripts for UFW Management

#### Basic Setup Script

```bash
#!/bin/bash
# firewall-setup.sh

echo "Configuring UFW firewall..."

# Reset existing rules
sudo ufw --force reset

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow essential services
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Rate limit SSH
sudo ufw limit ssh

# Enable firewall
sudo ufw --force enable

echo "Firewall configuration complete!"
sudo ufw status
```

#### Application Deployment Script

```bash
#!/bin/bash
# deploy-firewall.sh

APP_NAME="$1"
PORT="$2"
INTERNAL_NETWORK="$3"

if [ -z "$APP_NAME" ] || [ -z "$PORT" ]; then
    echo "Usage: $0 <app_name> <port> [internal_network]"
    exit 1
fi

echo "Deploying firewall rules for $APP_NAME on port $PORT..."

# Create application profile if internal network specified
if [ ! -z "$INTERNAL_NETWORK" ]; then
    sudo ufw allow from "$INTERNAL_NETWORK" to any port "$PORT"
    echo "Allowed $APP_NAME from $INTERNAL_NETWORK on port $PORT"
else
    sudo ufw allow "$PORT"
    echo "Allowed $APP_NAME on port $PORT"
fi

# Enable logging
sudo ufw logging on

# Show status
sudo ufw status verbose
```

#### Security Monitoring Script

```bash
#!/bin/bash
# security-monitor.sh

LOG_FILE="/var/log/ufw.log"
THRESHOLD=100  # Alert if more than 100 blocks per hour

# Count blocks in the last hour
BLOCK_COUNT=$(sudo grep "$(date '+%b %d %H')" "$LOG_FILE" | grep "UFW BLOCK" | wc -l)

if [ "$BLOCK_COUNT" -gt "$THRESHOLD" ]; then
    echo "ALERT: High number of blocked connections: $BLOCK_COUNT"

    # Show top source IPs
    echo "Top source IPs:"
    sudo grep "$(date '+%b %d %H')" "$LOG_FILE" | grep "UFW BLOCK" | \
        awk '{print $NF}' | sort | uniq -c | sort -nr | head -5

    # Send alert (example)
    # echo "Firewall alert: $BLOCK_COUNT blocks detected" | mail -s "UFW Alert" admin@example.com
fi
```

### Cron Jobs for Maintenance

```bash
# Daily firewall status check
0 8 * * * /usr/local/sbin/firewall-daily-check.sh

# Weekly log cleanup
0 2 * * 0 find /var/log -name "ufw.log.*" -mtime +30 -delete

# Hourly security monitoring
0 * * * * /usr/local/sbin/security-monitor.sh
```

## Integration with Other Tools

### Fail2ban Integration

```bash
# Install fail2ban
sudo apt install fail2ban

# Configure fail2ban to use UFW
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600

[ufw]
enabled = true
filter = ufw
logpath = /var/log/ufw.log
maxretry = 5
bantime = 86400
```

### Docker and UFW

```bash
# Docker networking considerations
sudo ufw allow 2376/tcp  # Docker daemon
sudo ufw allow 2377/tcp  # Docker Swarm
sudo ufw allow 7946/tcp  # Docker overlay network
sudo ufw allow 7946/udp  # Docker overlay network
sudo ufw allow 4789/udp  # VXLAN overlay network
```

### Ansible Automation

```yaml
# playbook.yml
---
- hosts: webservers
  become: yes
  tasks:
    - name: Install UFW
      apt:
        name: ufw
        state: present

    - name: Configure UFW defaults
      ufw:
        state: enabled
        policy: deny
        direction: incoming

    - name: Allow SSH
      ufw:
        rule: allow
        name: ssh

    - name: Allow HTTP
      ufw:
        rule: allow
        port: 80
        proto: tcp

    - name: Allow HTTPS
      ufw:
        rule: allow
        port: 443
        proto: tcp

    - name: Rate limit SSH
      ufw:
        rule: limit
        port: ssh
        proto: tcp
```

## Performance Optimization

### Rule Optimization

```bash
# Use specific rules over general ones
sudo ufw allow from 192.168.1.0/24 to any port 22  # Good
# sudo ufw allow 22  # Less optimal

# Combine related rules
sudo ufw allow from 10.0.0.0/8 to any port 3306  # MySQL
sudo ufw allow from 10.0.0.0/8 to any port 6379  # Redis

# Use application profiles when possible
sudo ufw allow 'Apache Full'  # Better than separate HTTP/HTTPS rules
```

### Logging Optimization

```bash
# Adjust logging level based on needs
sudo ufw logging low     # Production servers
sudo ufw logging medium  # Default
sudo ufw logging high    # Development/troubleshooting

# Configure log rotation
sudo nano /etc/logrotate.d/ufw
```

```
/var/log/ufw.log {
    weekly
    rotate 4
    compress
    delaycompress
    missingok
    notifempty
    create 640 syslog adm
}
```

## Network Service Examples

### Web Server Configuration

```bash
# Apache/Nginx web server
sudo ufw enable
sudo ufw default deny incoming
sudo ufw allow http
sudo ufw allow https
sudo ufw allow ssh
sudo ufw logging medium
```

### Database Server Configuration

```bash
# MySQL/MariaDB server
sudo ufw enable
sudo ufw default deny incoming

# Allow SSH from admin network
sudo ufw allow from 192.168.1.0/24 to any port 22

# Allow database from application servers
sudo ufw allow from 10.0.0.0/24 to any port 3306

# Allow MySQL replication
sudo ufw allow from 10.0.0.100 to any port 3306
sudo ufw allow from 10.0.0.101 to any port 3306
```

### Mail Server Configuration

```bash
# Postfix/Dovecot mail server
sudo ufw enable
sudo ufw default deny incoming

# Mail services
sudo ufw allow smtp    # 25/tcp
sudo ufw allow submission  # 587/tcp
sudo ufw allow imaps  # 993/tcp
sudo ufw allow pop3s  # 995/tcp

# Webmail
sudo ufw allow http
sudo ufw allow https

# Management
sudo ufw allow ssh
```

### VPN Server Configuration

```bash
# OpenVPN server
sudo ufw enable
sudo ufw default deny incoming

# OpenVPN
sudo ufw allow 1194/udp

# Allow traffic from VPN clients
sudo ufw allow from 10.8.0.0/24

# Management
sudo ufw allow ssh
```

## Troubleshooting Guide

### Common Problems and Solutions

#### Rule Not Working

```bash
# Check rule syntax
sudo ufw --dry-run allow 8080

# Verify rule exists
sudo ufw status numbered

# Check if service is listening
sudo netstat -tlnp | grep :8080

# Test with iptables
sudo iptables -L -n -v | grep 8080
```

#### Cannot Access Service

```bash
# Check if service is running
sudo systemctl status nginx

# Check if service is listening
sudo ss -tlnp | grep nginx

# Check firewall rules
sudo ufw status verbose

# Test from local machine
curl http://localhost:80
```

#### Performance Issues

```bash
# Check rule count
sudo ufw status | wc -l

# Optimize rule order
# Put most frequently matched rules first

# Check log size
sudo du -sh /var/log/ufw.log*

# Adjust logging level
sudo ufw logging low
```

### Debug Commands

```bash
# Test rule creation without applying
sudo ufw --dry-run allow 8080

# Check raw iptables rules
sudo iptables -L -n -v --line-numbers

# Check connection tracking
sudo conntrack -L

# Monitor network traffic
sudo tcpdump -i eth0 port 8080

# Check UFW logs in detail
sudo journalctl -u ufw
```

## Migration from iptables

### Converting iptables Rules

```bash
# iptables to UFW conversion examples

# iptables: iptables -A INPUT -p tcp --dport 80 -j ACCEPT
# UFW:     sudo ufw allow 80/tcp

# iptables: iptables -A INPUT -s 192.168.1.0/24 -p tcp --dport 22 -j ACCEPT
# UFW:     sudo ufw allow from 192.168.1.0/24 to any port 22

# iptables: iptables -A INPUT -p tcp --dport 8080 -j REJECT
# UFW:     sudo ufw reject 8080
```

### Migration Checklist

```bash
# 1. Backup current iptables rules
sudo iptables-save > /root/iptables-backup.rules

# 2. Install and enable UFW
sudo apt install ufw
sudo ufw --force reset

# 3. Convert essential rules to UFW syntax
sudo ufw allow ssh

# 4. Test UFW configuration
sudo ufw --dry-run enable

# 5. Apply UFW rules
sudo ufw --force enable

# 6. Verify connectivity
# Test all critical services and connections
```

## Advanced Topics

### Multi-homed Firewall

```bash
# Server with multiple network interfaces
# eth0: Internal network (192.168.1.0/24)
# eth1: External network (public IP)

# Configure UFW for multi-homed setup
sudo ufw enable

# Allow all traffic on internal interface
sudo ufw allow in on eth0

# Restrictive rules on external interface
sudo ufw allow in on eth1 to any port 22    # SSH
sudo ufw allow in on eth1 to any port 80    # HTTP
sudo ufw allow in on eth1 to any port 443   # HTTPS

# Allow forwarding between interfaces
sudo ufw route allow in on eth0 out on eth1
sudo ufw route allow in on eth1 out on eth0
```

### Complex Rule Sets

```bash
# Complex web application firewall

# Allow web traffic with rate limiting
sudo ufw allow http
sudo ufw limit https

# Allow admin access from specific IPs
sudo ufw allow from 203.0.113.10 to any port 22
sudo ufw allow from 203.0.113.20 to any port 8080

# Database access from application servers
sudo ufw allow from 10.0.0.0/24 to any port 3306

# Allow monitoring
sudo ufw allow from 192.168.100.0/24 to any port 161  # SNMP
sudo ufw allow from 192.168.100.0/24 to any port 5666 # NRPE

# Block known bad networks
sudo ufw deny from 198.51.100.0/24
sudo ufw deny from 203.0.113.0/24
```

## Security Auditing

### Rule Review

```bash
# Export rules for review
sudo ufw status verbose > /root/firewall-rules.txt

# Analyze rule efficiency
sudo iptables -L -n -v | head -20

# Check for overly permissive rules
sudo ufw status | grep "Anywhere" | grep -v "v6"

# Review logged activity
sudo grep "UFW BLOCK" /var/log/ufw.log | wc -l
```

### Security Recommendations

```bash
# Regular security audit checklist

# 1. Review UFW status
sudo ufw status verbose

# 2. Check for unnecessary open ports
sudo netstat -tlnp

# 3. Analyze blocked traffic patterns
sudo grep "UFW BLOCK" /var/log/ufw.log | tail -100

# 4. Verify rate limiting is working
sudo ufw status | grep limit

# 5. Check log file sizes
sudo du -sh /var/log/ufw.log*
```

## Reference Tables

### Common Port Numbers

| Port | Protocol | Service | UFW Command |
|------|----------|---------|-------------|
| 20,21 | TCP | FTP | `sudo ufw allow ftp` |
| 22 | TCP | SSH | `sudo ufw allow ssh` |
| 23 | TCP | Telnet | `sudo ufw deny telnet` |
| 25 | TCP | SMTP | `sudo ufw allow smtp` |
| 53 | TCP/UDP | DNS | `sudo ufw allow dns` |
| 80 | TCP | HTTP | `sudo ufw allow http` |
| 110 | TCP | POP3 | `sudo ufw allow pop3` |
| 143 | TCP | IMAP | `sudo ufw allow imap` |
| 443 | TCP | HTTPS | `sudo ufw allow https` |
| 993 | TCP | IMAPS | `sudo ufw allow imaps` |
| 995 | TCP | POP3S | `sudo ufw allow pop3s` |
| 3306 | TCP | MySQL | `sudo ufw allow 3306` |
| 5432 | TCP | PostgreSQL | `sudo ufw allow 5432` |
| 6379 | TCP | Redis | `sudo ufw allow 6379` |
| 8080 | TCP | HTTP-alt | `sudo ufw allow 8080` |

### Command Quick Reference

| Action | Command | Example |
|--------|---------|---------|
| Enable firewall | `sudo ufw enable` | - |
| Disable firewall | `sudo ufw disable` | - |
| Check status | `sudo ufw status` | - |
| Allow port | `sudo ufw allow <port>` | `sudo ufw allow 80` |
| Deny port | `sudo ufw deny <port>` | `sudo ufw deny 23` |
| Allow service | `sudo ufw allow <service>` | `sudo ufw allow ssh` |
| Allow from IP | `sudo ufw allow from <ip>` | `sudo ufw allow from 192.168.1.100` |
| Delete rule | `sudo ufw delete <rule>` | `sudo ufw delete allow 80` |
| Reset firewall | `sudo ufw reset` | - |
| Show numbered rules | `sudo ufw status numbered` | - |

## Best Practices Summary

1. **Secure Defaults**: Use `deny incoming` and `allow outgoing` as defaults
2. **Principle of Least Privilege**: Only allow necessary services
3. **Rate Limiting**: Apply to SSH and other critical services
4. **Logging**: Enable appropriate logging for monitoring
5. **Regular Audits**: Review rules and logs periodically
6. **Testing**: Always test changes in a controlled environment
7. **Documentation**: Document rule changes and justifications
8. **Backups**: Backup configurations before major changes
9. **Monitoring**: Monitor logs for suspicious activity
10. **Updates**: Keep UFW and system packages updated

## Conclusion

UFW provides a powerful yet user-friendly interface for managing Linux firewall rules. By following the comprehensive examples and best practices outlined in this guide, administrators can effectively secure their systems while maintaining necessary network access. The simplified syntax of UFW makes it accessible to users of all skill levels while still providing the advanced features needed for complex network configurations.

Regular monitoring, logging, and security auditing ensure that the firewall continues to protect systems effectively while adapting to changing security requirements and network environments.
