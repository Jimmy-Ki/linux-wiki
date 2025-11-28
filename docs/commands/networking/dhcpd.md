---
title: dhcpd - Dynamic Host Configuration Protocol Server
sidebar_label: dhcpd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# dhcpd - Dynamic Host Configuration Protocol Server

The `dhcpd` command is the Internet Systems Consortium (ISC) DHCP Server, which dynamically assigns IP addresses and network configuration parameters to client machines on a network. It implements the Dynamic Host Configuration Protocol (DHCP) to automate the process of configuring network devices, eliminating the need for manual IP address assignment. DHCPd is essential for network administrators managing large networks, providing centralized control over IP allocation, subnet masks, gateway addresses, DNS servers, and other network configuration parameters.

## Basic Syntax

```bash
dhcpd [OPTIONS] [IFACES...]
```

## Common Options

### Server Control Options
- `-p PORT` - Specify UDP port to listen on (default: 67)
- `-f` - Run in foreground (do not daemonize)
- `-d` - Enable verbose logging (do not fork to background)
- `-q` - Quiet mode (minimal logging)
- `-cf FILE` - Specify configuration file (default: /etc/dhcp/dhcpd.conf)
- `-lf FILE` - Specify lease database file (default: /var/lib/dhcp/dhcpd.leases)
- `-pf FILE` - Specify PID file (default: /var/run/dhcpd.pid)

### Network Interface Options
- `IFACES...` - Network interfaces to listen on (space-separated)
- `-no-pid` - Do not write PID file

### Testing and Debugging Options
- `-t` - Test configuration file syntax
- `-T` - Test configuration file and leases file
- `-4` - Use IPv4 only (default)
- `-6` - Use IPv6 only (dhcpd6 mode)
- `-s SERVER` - Specify server identifier
- `-user USER` - Run as specified user after startup
- `-group GROUP` - Run as specified group after startup
- `-chroot DIR` - Chroot to specified directory

### Logging Options
- `-version` - Display version information
- `-help` - Display help information
- `-lf LEASEFILE` - Specify lease database location

## Configuration File Structure

The DHCP server uses `/etc/dhcp/dhcpd.conf` as its main configuration file. Key sections include:

### Global Parameters
```bash
# Global configuration options
default-lease-time 86400;        # 24 hours default lease
max-lease-time 604800;           # 7 days maximum lease
authoritative;                   # Authoritative DHCP server
log-facility local7;             # Syslog facility
```

### Subnet Declarations
```bash
# Subnet configuration
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    option domain-name "example.com";
    option broadcast-address 192.168.1.255;
    option subnet-mask 255.255.255.0;
    default-lease-time 43200;
    max-lease-time 86400;
}
```

### Host Reservations
```bash
# Fixed IP address for specific host
host fileserver {
    hardware ethernet 00:1A:2B:3C:4D:5E;
    fixed-address 192.168.1.10;
    option host-name "fileserver";
}
```

## Usage Examples

### Basic Server Operations

#### Starting DHCP Server
```bash
# Start DHCP server with default settings
sudo dhcpd

# Start on specific interface
sudo dhcpd eth0

# Start on multiple interfaces
sudo dhcpd eth0 eth1 wlan0

# Start with custom configuration file
sudo dhcpd -cf /etc/dhcp/mydhcp.conf

# Run in foreground for debugging
sudo dhcpd -d -f eth0
```

#### Testing Configuration
```bash
# Test configuration file syntax
sudo dhcpd -t

# Test configuration and lease files
sudo dhcpd -T

# Test with custom configuration
sudo dhcpd -t -cf /etc/dhcp/test.conf
```

### Configuration Management

#### Basic DHCP Configuration
```bash
# Create basic DHCP configuration
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# DHCP Server Configuration File

# Global settings
default-lease-time 86400;
max-lease-time 604800;
authoritative;
log-facility local7;

# Subnet for internal network
subnet 192.168.100.0 netmask 255.255.255.0 {
    range 192.168.100.150 192.168.100.200;
    option routers 192.168.100.1;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    option domain-name "internal.lan";
    option broadcast-address 192.168.100.255;
}

# Subnet for guest network
subnet 192.168.200.0 netmask 255.255.255.0 {
    range 192.168.200.100 192.168.200.150;
    option routers 192.168.200.1;
    option domain-name-servers 8.8.8.8;
    option domain-name "guest.lan";
}
EOF
```

#### Advanced Configuration with Classes
```bash
# Create configuration with vendor classes
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Advanced DHCP configuration with classes

# Global configuration
default-lease-time 86400;
max-lease-time 604800;
authoritative;

# Vendor class for VoIP phones
class "voip-phones" {
    match if substring (hardware, 1, 3) = 00:11:22;
    default-lease-time 3600;
    max-lease-time 7200;
    option routers 192.168.10.1;
    option domain-name-servers 192.168.10.10;
}

# Subnet with different pools
subnet 192.168.10.0 netmask 255.255.255.0 {
    pool {
        allow members of "voip-phones";
        range 192.168.10.50 192.168.10.100;
    }

    pool {
        deny members of "voip-phones";
        range 192.168.10.101 192.168.10.200;
    }

    option routers 192.168.10.1;
    option domain-name-servers 192.168.10.1;
}
EOF
```

### Network Segmentation

#### Multiple Subnet Configuration
```bash
# Configure multiple subnets on single server
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Multi-subnet DHCP configuration

option domain-name "company.com";
option domain-name-servers ns1.company.com, ns2.company.com;

# Management network
subnet 10.0.0.0 netmask 255.255.255.0 {
    range 10.0.0.100 10.0.0.150;
    option routers 10.0.0.1;
    option broadcast-address 10.0.0.255;
    default-lease-time 7200;
    max-lease-time 14400;
}

# Production servers
subnet 10.0.1.0 netmask 255.255.255.0 {
    range 10.0.1.20 10.0.1.50;
    option routers 10.0.1.1;
    option broadcast-address 10.0.1.255;
    default-lease-time 86400;
    max-lease-time 604800;
}

# Workstations
subnet 10.0.2.0 netmask 255.255.255.0 {
    range 10.0.2.100 10.0.2.200;
    option routers 10.0.2.1;
    option broadcast-address 10.0.2.255;
    default-lease-time 43200;
    max-lease-time 86400;
}

# Guest network
subnet 10.0.3.0 netmask 255.255.255.0 {
    range 10.0.3.50 10.0.3.150;
    option routers 10.0.3.1;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    default-lease-time 3600;
    max-lease-time 7200;
}
EOF
```

### Fixed Address Assignments

#### Static IP Reservations
```bash
# Create configuration with fixed addresses
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# DHCP configuration with fixed addresses

default-lease-time 86400;
max-lease-time 604800;
authoritative;

# Subnet configuration
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
}

# Fixed IP assignments for servers
host dc01 {
    hardware ethernet 00:1A:2B:3C:4D:5E;
    fixed-address 192.168.1.10;
    option host-name "dc01";
}

host webserver {
    hardware ethernet 00:1A:2B:3C:4D:5F;
    fixed-address 192.168.1.20;
    option host-name "webserver";
}

host db-server {
    hardware ethernet 00:1A:2B:3C:4D:60;
    fixed-address 192.168.1.30;
    option host-name "db-server";
}

# Fixed IP for network printer
host printer-hp01 {
    hardware ethernet 00:AA:BB:CC:DD:EE;
    fixed-address 192.168.1.90;
    option host-name "printer-hp01";
}
EOF
```

### Advanced Features

#### DHCP Failover Configuration
```bash
# Primary DHCP server configuration
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Primary DHCP server with failover

failover peer "dhcp-failover" {
    primary;
    address 192.168.1.10;
    port 647;
    peer address 192.168.1.11;
    peer port 647;
    max-response-delay 60;
    max-unacked-updates 10;
    load balance max seconds 3;
    mclt 1800;
    split 128;
}

subnet 192.168.1.0 netmask 255.255.255.0 {
    pool {
        failover peer "dhcp-failover";
        range 192.168.1.100 192.168.1.200;
    }
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
}
EOF
```

#### Dynamic DNS Updates
```bash
# DHCP with dynamic DNS updates
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# DHCP with dynamic DNS support

authoritative;
default-lease-time 86400;
max-lease-time 604800;

# Dynamic DNS configuration
ddns-update-style interim;
update-static-leases on;
ignore client-updates;

# DNS key for secure updates
key "dhcp-key" {
    algorithm HMAC-MD5.SIG-ALG.REG.INT;
    secret "your-base64-encoded-secret";
}

zone example.com. {
    primary 127.0.0.1;
    key "dhcp-key";
}

zone 1.168.192.in-addr.arpa. {
    primary 127.0.0.1;
    key "dhcp-key";
}

subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
    option domain-name "example.com";

    # Dynamic DNS options
    ddns-domainname "example.com";
    ddns-rev-domainname "in-addr.arpa.";
}
EOF
```

## Practical Examples

### System Administration

#### Network Setup and Management
```bash
#!/bin/bash
# Network DHCP setup script

# Configuration file path
CONFIG_FILE="/etc/dhcp/dhcpd.conf"
LEASE_FILE="/var/lib/dhcp/dhcpd.leases"
BACKUP_DIR="/backup/dhcp"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup current configuration
if [ -f "$CONFIG_FILE" ]; then
    cp "$CONFIG_FILE" "$BACKUP_DIR/dhcpd.conf.$(date +%Y%m%d_%H%M%S)"
fi

# Test and apply new configuration
test_config() {
    echo "Testing DHCP configuration..."
    if dhcpd -t -cf "$CONFIG_FILE"; then
        echo "Configuration syntax is valid"
        return 0
    else
        echo "Configuration syntax error!"
        return 1
    fi
}

# Restart DHCP service safely
restart_dhcp() {
    echo "Restarting DHCP service..."
    if test_config; then
        systemctl restart isc-dhcp-server
        if [ $? -eq 0 ]; then
            echo "DHCP service restarted successfully"
        else
            echo "Failed to restart DHCP service"
            return 1
        fi
    else
        echo "Not restarting due to configuration errors"
        return 1
    fi
}

# Monitor DHCP leases
monitor_leases() {
    echo "Current DHCP leases:"
    if [ -f "$LEASE_FILE" ]; then
        tail -20 "$LEASE_FILE"
    else
        echo "Lease file not found: $LEASE_FILE"
    fi
}

# Show DHCP statistics
show_stats() {
    echo "DHCP Server Statistics:"
    systemctl status isc-dhcp-server
    echo "Active leases: $(grep -c "lease " "$LEASE_FILE" 2>/dev/null || echo "0")"
}

# Usage examples
echo "Available functions:"
echo "test_config - Test DHCP configuration syntax"
echo "restart_dhcp - Restart DHCP service safely"
echo "monitor_leases - Show current DHCP leases"
echo "show_stats - Display DHCP server statistics"
```

#### Lease Management
```bash
#!/bin/bash
# DHCP lease management script

LEASE_FILE="/var/lib/dhcp/dhcpd.leases"

# List active leases
list_active_leases() {
    echo "Active DHCP Leases:"
    echo "=================="

    awk '
    /^lease/ {
        ip = $2
        getline; getline;
        if ($1 == "hardware") mac = $3
        if ($1 == "client-hostname") hostname = $2
        if ($1 == "ends") {
            gsub(/;/, "", $3)
            endtime = $3
            print sprintf("%-15s %-18s %-20s %s", ip, mac, hostname, endtime)
        }
    }' "$LEASE_FILE" | column -t
}

# Find lease by MAC address
find_by_mac() {
    local mac="$1"
    echo "Searching for MAC address: $mac"
    awk -v mac="$mac" '
    /^lease/ {
        ip = $2
        in_lease = 1
    }
    in_lease && /hardware ethernet/ {
        if ($3 ~ mac) {
            found_ip = ip
        }
        in_lease = 0
    }
    END {
        if (found_ip) print "Found lease: " found_ip
        else print "No lease found for MAC: " mac
    }' "$LEASE_FILE"
}

# Find lease by IP address
find_by_ip() {
    local ip="$1"
    echo "Searching for IP address: $ip"
    awk -v ip="$ip" '
    /^lease / {
        if ($2 == ip) {
            print "Lease found for " ip
            in_lease = 1
        } else {
            in_lease = 0
        }
    }
    in_lease {
        print
        if (/}/) in_lease = 0
    }' "$LEASE_FILE"
}

# Clean expired leases
clean_expired_leases() {
    echo "Cleaning expired leases..."
    cp "$LEASE_FILE" "$LEASE_FILE.backup"

    # Create temporary file for active leases
    temp_file=$(mktemp)
    awk '
    /^lease/ {
        lease_ip = $2
        in_lease = 1
        lease_content = ""
        lease_active = 0
    }
    in_lease {
        lease_content = lease_content $0 "\n"
        if (/ends/) {
            gsub(/;/, "", $3)
            end_time = $3
            # Convert to timestamp and check if still active
            cmd="date -d \"" end_time "\" +%s 2>/dev/null"
            cmd | getline timestamp
            close(cmd)
            current=$(date +%s)
            if (timestamp > current) lease_active = 1
        }
        if (/}/) {
            if (lease_active) printf "%s", lease_content
            in_lease = 0
        }
    }' "$LEASE_FILE" > "$temp_file"

    mv "$temp_file" "$LEASE_FILE"
    echo "Expired leases cleaned up"
}

# Examples
echo "DHCP Lease Management Functions:"
echo "list_active_leases - Show all active leases"
echo "find_by_mac <MAC> - Find lease by MAC address"
echo "find_by_ip <IP> - Find lease by IP address"
echo "clean_expired_leases - Remove expired leases"
```

### Network Security

#### MAC Address Filtering
```bash
# Configure DHCP with MAC address filtering
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Secure DHCP configuration with MAC filtering

authoritative;
default-lease-time 86400;
max-lease-time 604800;

# Define allowed hosts class
class "allowed-clients" {
    match hardware;
}

# Allow specific MAC addresses
subclass "allowed-clients" 00:1A:2B:3C:4D:5E;  # Admin workstation
subclass "allowed-clients" 00:1A:2B:3C:4D:5F;  # Server 1
subclass "allowed-clients" 00:1A:2B:3C:4D:60;  # Server 2
subclass "allowed-clients" 00:AA:BB:CC:DD:EE;  # Network printer

# Subnet configuration
subnet 192.168.1.0 netmask 255.255.255.0 {
    pool {
        allow members of "allowed-clients";
        range 192.168.1.100 192.168.1.200;
        option routers 192.168.1.1;
        option domain-name-servers 192.168.1.1;
    }

    # Deny all other clients
    pool {
        deny members of "allowed-clients";
        range 192.168.1.201 192.168.1.250;
    }
}

# Log all unknown MAC attempts
log-facility local7;
EOF
```

#### DHCP Snooping Protection
```bash
# Configure DHCP with security features
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Secure DHCP configuration

authoritative;
default-lease-time 3600;   # Shorter leases for security
max-lease-time 7200;

# Option 82 (DHCP relay agent information) processing
authoritative;

# Define trusted network
class "trusted-network" {
    match if substring (option agent.circuit-id, 0, 4) = "trus";
}

# Enhanced logging
log-facility local7;

# Subnet with security settings
subnet 192.168.1.0 netmask 255.255.255.0 {
    pool {
        allow members of "trusted-network";
        range 192.168.1.100 192.168.1.200;
    }

    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
    option broadcast-address 192.168.1.255;

    # Security options
    option ip-forwarding off;
    option mask-supplier off;
}

# Host-specific security
host critical-server {
    hardware ethernet 00:1A:2B:3C:4D:5E;
    fixed-address 192.168.1.10;
    option routers 192.168.1.1;
    default-lease-time 86400;  # Longer lease for critical server
}
EOF
```

## Advanced Usage

### Performance Optimization

#### High-Performance Configuration
```bash
# Optimized DHCP configuration for large networks
cat > /etc/dhcp/dhcpd.conf << 'EOF'
# High-performance DHCP configuration

authoritative;
default-lease-time 1800;      # 30 minutes default
max-lease-time 3600;         # 1 hour maximum

# Performance tuning
ddns-update-style none;      # Disable dynamic DNS for performance
log-facility local0;         # Use efficient logging

# Large address pool
subnet 10.0.0.0 netmask 255.255.252.0 {
    pool {
        range 10.0.0.100 10.0.3.254;
        option routers 10.0.0.1;
        option domain-name-servers 10.0.0.10, 10.0.0.11;
        option domain-name "large-network.com";

        # Reduce network overhead
        option broadcast-address 10.0.3.255;
        option subnet-mask 255.255.252.0;

        # Lease optimization
        default-lease-time 900;   # 15 minutes for dynamic clients
        max-lease-time 1800;      # 30 minutes maximum
    }
}

# Separate pool for static devices
subnet 10.0.4.0 netmask 255.255.255.0 {
    range 10.0.4.10 10.0.4.100;
    option routers 10.0.4.1;
    default-lease-time 86400;   # 24 hours for devices
    max-lease-time 604800;      # 7 days maximum
}
EOF
```

### Multi-Interface Configuration

#### Multiple Network Interfaces
```bash
#!/bin/bash
# Configure DHCP for multiple interfaces

# Create interface-specific configurations
setup_interface_configs() {
    # Internal network
    cat > /etc/dhcp/dhcpd-internal.conf << 'EOF'
# Internal network configuration
subnet 192.168.10.0 netmask 255.255.255.0 {
    range 192.168.10.100 192.168.10.200;
    option routers 192.168.10.1;
    option domain-name-servers 192.168.10.1;
    option domain-name "internal.lan";
}
EOF

    # Guest network
    cat > /etc/dhcp/dhcpd-guest.conf << 'EOF'
# Guest network configuration
subnet 192.168.20.0 netmask 255.255.255.0 {
    range 192.168.20.50 192.168.20.150;
    option routers 192.168.20.1;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    option domain-name "guest.lan";
    default-lease-time 3600;
    max-lease-time 7200;
}
EOF

    # DMZ network
    cat > /etc/dhcp/dhcpd-dmz.conf << 'EOF'
# DMZ network configuration
subnet 192.168.30.0 netmask 255.255.255.0 {
    range 192.168.30.10 192.168.30.50;
    option routers 192.168.30.1;
    option domain-name-servers 192.168.30.1;
    option domain-name "dmz.lan";
    default-lease-time 86400;
    max-lease-time 604800;
}
EOF
}

# Start DHCP on specific interfaces
start_dhcp_interfaces() {
    echo "Starting DHCP on multiple interfaces..."

    # Internal interface
    dhcpd -cf /etc/dhcp/dhcpd-internal.conf eth0 &

    # Guest interface
    dhcpd -cf /etc/dhcp/dhcpd-guest.conf eth1 &

    # DMZ interface
    dhcpd -cf /etc/dhcp/dhcpd-dmz.conf eth2 &

    echo "DHCP servers started on all interfaces"
}

# Monitor all interfaces
monitor_interfaces() {
    echo "DHCP server status by interface:"
    for pid in $(pgrep dhcpd); do
        echo "PID: $pid"
        ps -p $pid -o pid,ppid,cmd
        echo "---"
    done
}

setup_interface_configs
```

## Integration and Automation

### Service Management Scripts

#### DHCP Service Automation
```bash
#!/bin/bash
# Comprehensive DHCP service management script

CONFIG_DIR="/etc/dhcp"
LEASE_DIR="/var/lib/dhcp"
LOG_DIR="/var/log"
BACKUP_DIR="/backup/dhcp"

# Service management
start_service() {
    echo "Starting DHCP service..."
    if dhcpd -t; then
        systemctl start isc-dhcp-server
        echo "DHCP service started successfully"
        log_status
    else
        echo "Configuration error - service not started"
        exit 1
    fi
}

stop_service() {
    echo "Stopping DHCP service..."
    systemctl stop isc-dhcp-server
    echo "DHCP service stopped"
}

restart_service() {
    echo "Restarting DHCP service..."
    if dhcpd -t; then
        systemctl restart isc-dhcp-server
        echo "DHCP service restarted successfully"
        log_status
    else
        echo "Configuration error - service not restarted"
        exit 1
    fi
}

reload_config() {
    echo "Reloading DHCP configuration..."
    if dhcpd -t; then
        systemctl reload isc-dhcp-server
        echo "Configuration reloaded successfully"
    else
        echo "Configuration error - reload aborted"
        exit 1
    fi
}

# Backup and restore
backup_config() {
    echo "Creating DHCP configuration backup..."
    backup_file="$BACKUP_DIR/dhcp_backup_$(date +%Y%m%d_%H%M%S).tar.gz"

    mkdir -p "$BACKUP_DIR"
    tar -czf "$backup_file" -C / \
        etc/dhcp/ \
        var/lib/dhcp/ \
        etc/systemd/system/isc-dhcp-server.service 2>/dev/null

    echo "Backup created: $backup_file"
}

restore_config() {
    local backup_file="$1"
    if [ -z "$backup_file" ]; then
        echo "Usage: restore_config <backup_file>"
        return 1
    fi

    echo "Restoring DHCP configuration from $backup_file..."
    systemctl stop isc-dhcp-server
    tar -xzf "$backup_file" -C /

    # Fix permissions
    chown -R root:root /etc/dhcp/
    chown -R root:root /var/lib/dhcp/
    chmod 644 /etc/dhcp/dhcpd.conf
    chmod 644 /var/lib/dhcp/dhcpd.leases

    systemctl start isc-dhcp-server
    echo "Configuration restored"
}

# Monitoring and diagnostics
log_status() {
    echo "DHCP Service Status:"
    systemctl status isc-dhcp-server --no-pager
    echo
    echo "Active Leases: $(grep -c "^lease " /var/lib/dhcp/dhcpd.leases 2>/dev/null || echo "0")"
    echo "Configured Subnets: $(grep -c "^subnet " /etc/dhcp/dhcpd.conf 2>/dev/null || echo "0")"
}

monitor_logs() {
    echo "DHCP Server Logs (last 20 lines):"
    journalctl -u isc-dhcp-server -n 20 --no-pager
}

# Network diagnostics
test_connectivity() {
    echo "Testing DHCP connectivity..."

    # Check if DHCP server is listening
    netstat -ulnp | grep :67

    # Test configuration
    dhcpd -t

    # Check lease file
    if [ -f /var/lib/dhcp/dhcpd.leases ]; then
        echo "Lease file exists and is readable"
        wc -l /var/lib/dhcp/dhcpd.leases
    else
        echo "Warning: Lease file not found"
    fi
}

# Main menu
case "${1:-help}" in
    start)      start_service ;;
    stop)       stop_service ;;
    restart)    restart_service ;;
    reload)     reload_config ;;
    status)     log_status ;;
    backup)     backup_config ;;
    restore)    restore_config "$2" ;;
    logs)       monitor_logs ;;
    test)       test_connectivity ;;
    help|*)
        echo "Usage: $0 {start|stop|restart|reload|status|backup|restore <file>|logs|test}"
        ;;
esac
```

## Troubleshooting

### Common Issues and Solutions

#### Configuration Errors
```bash
# Troubleshoot DHCP configuration issues
check_config() {
    echo "Checking DHCP configuration..."

    # Test configuration syntax
    if dhcpd -t; then
        echo "✓ Configuration syntax is valid"
    else
        echo "✗ Configuration syntax error"
        dhcpd -t 2>&1 | grep -E "line|error|warning"
    fi

    # Check file permissions
    config_file="/etc/dhcp/dhcpd.conf"
    if [ -r "$config_file" ]; then
        echo "✓ Configuration file is readable"
    else
        echo "✗ Configuration file permission issue"
        ls -la "$config_file"
    fi

    # Check lease file
    lease_file="/var/lib/dhcp/dhcpd.leases"
    if [ -f "$lease_file" ]; then
        echo "✓ Lease file exists"
        if [ -w "$lease_file" ]; then
            echo "✓ Lease file is writable"
        else
            echo "✗ Lease file permission issue"
            ls -la "$lease_file"
        fi
    else
        echo "⚠ Lease file doesn't exist (will be created automatically)"
    fi
}

# Check network interface issues
check_interfaces() {
    echo "Checking network interfaces..."

    # List available interfaces
    ip link show | grep -E "^[0-9]+:"

    # Check if DHCP can bind to port 67
    netstat -ulnp | grep :67

    # Check interface status
    for interface in $(ip link show | grep -E "^[0-9]+:" | cut -d: -f2 | tr -d ' '); do
        if ip addr show "$interface" | grep -q "inet "; then
            echo "✓ Interface $interface has IP address"
        else
            echo "⚠ Interface $interface has no IP address"
        fi
    done
}

# Check service status
check_service() {
    echo "Checking DHCP service status..."

    if systemctl is-active --quiet isc-dhcp-server; then
        echo "✓ DHCP service is running"
        systemctl status isc-dhcp-server --no-pager -l
    else
        echo "✗ DHCP service is not running"
        echo "Service status:"
        systemctl status isc-dhcp-server --no-pager -l
        echo "Recent logs:"
        journalctl -u isc-dhcp-server -n 10 --no-pager
    fi
}

# Run full diagnostic
run_diagnostic() {
    echo "Running DHCP diagnostic..."
    echo "================================"
    check_config
    echo
    check_interfaces
    echo
    check_service
    echo
    echo "System information:"
    echo "Kernel: $(uname -r)"
    echo "DHCP version: $(dhcpd --version 2>&1 | head -1)"
    echo "System uptime: $(uptime)"
}

run_diagnostic
```

#### Performance Issues
```bash
# Monitor DHCP server performance
monitor_performance() {
    echo "DHCP Performance Monitor"
    echo "========================"

    # Memory usage
    echo "Memory Usage:"
    ps aux | grep dhcpd | grep -v grep

    # Network connections
    echo -e "\nActive DHCP Connections:"
    netstat -ulnp | grep :67

    # Lease activity
    echo -e "\nRecent Lease Activity:"
    if [ -f /var/lib/dhcp/dhcpd.leases ]; then
        tail -20 /var/lib/dhcp/dhcpd.leases
    fi

    # System load
    echo -e "\nSystem Load:"
    uptime
    free -h

    # DHCP logs
    echo -e "\nRecent DHCP Activity:"
    journalctl -u isc-dhcp-server -n 10 --no-pager | grep -E "DHCPDISCOVER|DHCPOFFER|DHCPREQUEST|DHCPACK"
}

# Optimize performance
optimize_performance() {
    echo "Optimizing DHCP performance..."

    # Create optimized configuration
    cat > /etc/dhcp/dhcpd.conf << 'EOF'
# Performance-optimized DHCP configuration
authoritative;
default-lease-time 1800;
max-lease-time 3600;

# Disable features for performance
ddns-update-style none;
log-facility local0;

subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option routers 192.168.1.1;
    option domain-name-servers 192.168.1.1;
}
EOF

    echo "Optimized configuration applied"

    # Clean old leases
    if [ -f /var/lib/dhcp/dhcpd.leases ]; then
        cp /var/lib/dhcp/dhcpd.leases /var/lib/dhcp/dhcpd.leases.backup

        # Keep only active leases
        awk '
        /^lease/ {
            lease_start = NR
            lease_ip = $2
            lease_content = ""
            active = 0
        }
        NR > lease_start {
            lease_content = lease_content $0 "\n"
            if (/ends/) {
                # Extract end time
                gsub(/;/, "", $3)
                end_time = $3
                # Check if lease is still active (simplified check)
                if (end_time != "never") active = 1
            }
            if (/}/) {
                if (active) printf "%s", lease_content
                lease_start = 0
            }
        }
        END {
            print "# Lease file cleaned on $(date)"
        }' /var/lib/dhcp/dhcpdleases.backup > /var/lib/dhcp/dhcpd.leases

        echo "Old leases cleaned"
    fi

    echo "Performance optimization complete"
}
```

## Related Commands

- [`dhclient`](/docs/commands/network/dhclient) - DHCP client utility
- [`dhcrelay`](/docs/commands/network/dhcrelay) - DHCP relay agent
- [`ifconfig`](/docs/commands/system-info/ifconfig) - Network interface configuration
- [`ip`](/docs/commands/system-info/ip) - IP address and routing utility
- [`netstat`](/docs/commands/system-info/netstat) - Network statistics
- [`systemctl`](/docs/commands/system-service/systemctl) - Service management
- [`journalctl`](/docs/commands/user-management/journalctl) - System log viewer
- [`tcpdump`](/docs/commands/network/tcpdump) - Network packet analyzer

## Best Practices

1. **Always test configuration** with `dhcpd -t` before restarting service
2. **Backup configuration files** before making changes
3. **Use appropriate lease times** based on network requirements
4. **Implement failover** for critical network environments
5. **Monitor lease utilization** to prevent address exhaustion
6. **Secure DHCP server** with MAC filtering and access controls
7. **Separate subnets** for different network segments (internal, guest, DMZ)
8. **Use fixed addresses** for servers and critical infrastructure
9. **Enable logging** for troubleshooting and security monitoring
10. **Regular maintenance** of lease files and configuration cleanup

## Performance Tips

1. **Shorter lease times** for dynamic environments improve address recovery
2. **Longer lease times** for stable networks reduce overhead
3. **Disable dynamic DNS** updates if not needed for better performance
4. **Use larger address pools** to prevent exhaustion
5. **Implement failover pairs** for high availability
6. **Monitor server resources** on large networks
7. **Optimize subnet masks** to efficiently use address space
8. **Separate networks** to reduce broadcast traffic
9. **Regular cleanup** of expired leases improves performance
10. **Hardware considerations** for large-scale deployments

The `dhcpd` command is a critical network service component that provides automated IP address management. Its flexible configuration options, security features, and scalability make it suitable for networks of all sizes, from small office environments to large enterprise deployments.