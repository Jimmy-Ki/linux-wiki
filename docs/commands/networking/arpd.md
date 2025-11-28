---
title: arpd - ARP daemon
sidebar_label: arpd
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arpd - ARP daemon

The `arpd` command is a userspace ARP (Address Resolution Protocol) daemon that collects gratuitous ARP information and maintains a persistent database of IP-MAC address pairs. It's part of the iproute2 package and serves as an advanced networking utility for ARP cache management, helping to avoid redundant ARP broadcasts and improve network performance in environments with limited kernel ARP cache size. The daemon monitors ARP traffic, saves learned mappings to disk, and feeds them to the kernel on demand to optimize network resolution processes.

## Basic Syntax

```bash
arpd [ -lkh? ] [ -a N ] [ -b dbase ] [ -B number ] [ -f file ] [ -p interval ] [ -n time ] [ -R rate ] [ <INTERFACES> ]
```

## Common Options

### Database Management
- `-b <DATABASE>` - Database file location (default: `/var/lib/arpd/arpd.db`)
- `-l` - Dump arpd database to stdout and exit
- `-f <FILE>` - Read and load arpd database from FILE

### ARP Resolution Control
- `-a <NUMBER>` - Number of broadcast queries before destination considered dead
- `-k` - Suppress sending broadcast queries by kernel
- `-n <TIME>` - Negative cache timeout
- `-R <RATE>` - Max broadcast rate (default: 1)
- `-B <NUMBER>` - Number of back-to-back broadcasts (default: 3)

### Monitoring and Polling
- `-p <TIME>` - Time between polling attempts to kernel ARP table (default: 30 seconds)

### Information
- `-h` - Print help information
- `-?` - Print help information
- `-v` - Enable verbose output (if available)

## Usage Examples

### Basic ARP Daemon Operations

#### Starting ARP Daemon
```bash
# Start arpd with default settings on all interfaces
sudo arpd

# Start arpd on specific interface
sudo arpd eth0

# Start arpd on multiple interfaces
sudo arpd eth0 eth1 wlan0

# Start with custom database location
sudo arpd -b /var/tmp/arpd.db eth0
```

#### Database Management
```bash
# Start with custom database file
sudo arpd -b /custom/path/arpd.db eth0

# Dump current database contents
sudo arpd -l

# Load database from file and start
sudo arpd -f /backup/arpd.db eth0

# Create database backup
sudo arpd -l > /backup/arpd_backup.db
```

### Advanced Configuration

#### ARP Resolution Optimization
```bash
# Replace kernel resolution completely
sudo arpd -b /var/tmp/arpd.db -a 3 -k eth0 eth1

# Set aggressive broadcast parameters
sudo arpd -a 2 -R 2 -B 5 eth0

# Configure negative cache timeout
sudo arpd -n 300 eth0

# Set custom polling interval
sudo arpd -p 60 eth0
```

#### Performance Tuning
```bash
# High-performance configuration
sudo arpd -a 1 -R 5 -B 10 -p 10 eth0

# Conservative configuration
sudo arpd -a 5 -R 1 -B 2 -p 120 eth0

# Balanced configuration
sudo arpd -a 3 -R 2 -B 3 -p 30 eth0
```

## Practical Examples

### Network Administration

#### Large Network ARP Management
```bash
# Start arpd for large enterprise network
sudo arpd -b /var/lib/arpd/corporate.db -a 5 -k -p 60 eth0 eth1 eth2

# Monitor ARP database size
sudo arpd -l | wc -l

# Create periodic database backup
sudo arpd -l > /backup/arpd_$(date +%Y%m%d).db
```

#### High-Availability Setup
```bash
# Start arpd with failover interface
sudo arpd -b /shared/arpd/arpd.db eth0 eth1

# Configure for redundant network paths
sudo arpd -a 2 -B 5 -R 3 bond0

# Load backup database on service restart
sudo systemctl stop arpd
sudo arpd -f /backup/latest_arpd.db eth0
```

#### Network Performance Optimization
```bash
# Optimize for data center environment
sudo arpd -a 1 -R 10 -B 20 -p 5 eth0

# Configure for WAN connections
sudo arpd -a 10 -R 1 -B 2 -p 300 eth0

# Balance for mixed traffic
sudo arpd -a 3 -R 3 -B 5 -p 45 eth0
```

### System Administration

#### Database Maintenance
```bash
# Backup current ARP database
sudo arpd -l > /root/arpd_backup_$(date +%F).db

# Clean and restart with fresh database
sudo systemctl stop arpd
sudo rm -f /var/lib/arpd/arpd.db
sudo arpd eth0

# Migrate database to new location
sudo arpd -l > /tmp/arpd_temp.db
sudo arpd -f /tmp/arpd_temp.db -b /new/location/arpd.db eth0
```

#### Troubleshooting ARP Issues
```bash
# Start with verbose logging for debugging
sudo arpd -v -p 10 eth0

# Monitor ARP resolution behavior
sudo arpd -a 1 -k eth0

# Check database contents for specific IP
sudo arpd -l | grep "192.168.1.100"

# Restart with fresh database to clear corruption
sudo systemctl stop arpd
sudo arpd eth0
```

#### Service Integration
```bash
# Start as system service
sudo systemctl start arpd
sudo systemctl enable arpd

# Check service status
sudo systemctl status arpd

# View service logs
sudo journalctl -u arpd -f

# Custom service configuration
sudo systemctl edit arpd
# Add custom ExecStart with required options
```

### Security and Monitoring

#### Security Configuration
```bash
# Isolate ARP database in secure location
sudo mkdir -p /secure/arpd
sudo chmod 700 /secure/arpd
sudo arpd -b /secure/arpd/arpd.db eth0

# Monitor for ARP spoofing attempts
sudo arpd -a 1 -p 5 eth0

# Log ARP activity for security analysis
sudo arpd -v -p 15 eth0 | tee /var/log/arpd_activity.log
```

#### Performance Monitoring
```bash
# Monitor ARP cache hit rates
sudo arpd -v eth0 | grep "cache"

# Check database growth over time
watch -n 60 "sudo arpd -l | wc -l"

# Generate ARP statistics report
sudo arpd -l > /tmp/arpd_stats.txt
echo "Total ARP entries: $(wc -l < /tmp/arpd_stats.txt)"
```

## Advanced Usage

### Database Operations and Analysis

#### Database Analysis Scripts
```bash
#!/bin/bash
# Analyze ARP database for network insights

DB_FILE="/var/lib/arpd/arpd.db"
REPORT_FILE="/tmp/arpd_analysis_$(date +%Y%m%d).txt"

echo "ARP Database Analysis - $(date)" > "$REPORT_FILE"
echo "=================================" >> "$REPORT_FILE"

# Total entries
echo "Total ARP entries: $(sudo arpd -l | wc -l)" >> "$REPORT_FILE"

# Unique networks
echo "Unique /24 networks:" >> "$REPORT_FILE"
sudo arpd -l | awk '{print $1}' | cut -d. -f1-3 | sort -u | wc -l >> "$REPORT_FILE"

# Most active IPs
echo "Top 10 most frequent IPs:" >> "$REPORT_FILE"
sudo arpd -l | awk '{print $1}' | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"

cat "$REPORT_FILE"
```

#### Database Cleanup and Maintenance
```bash
#!/bin/bash
# ARP database maintenance script

DB_PATH="/var/lib/arpd"
BACKUP_PATH="/backup/arpd"
RETENTION_DAYS=30

# Create backup
sudo arpd -l > "$BACKUP_PATH/arpd_backup_$(date +%Y%m%d_%H%M%S).db"

# Clean old backups
find "$BACKUP_PATH" -name "arpd_backup_*.db" -mtime +$RETENTION_DAYS -delete

# Compress old backups
find "$BACKUP_PATH" -name "arpd_backup_*.db" -mtime +1 -exec gzip {} \;

echo "ARP database maintenance completed"
```

### Integration with Network Services

#### DHCP Integration
```bash
# Start arpd after DHCP client gets IP
#!/bin/bash
# Hook script for DHCP client

INTERFACE=$1
sudo systemctl restart arpd
sudo arpd "$INTERFACE"
```

#### VLAN and Bonding Support
```bash
# Start arpd on bonded interface
sudo arpd bond0

# Monitor multiple VLANs
sudo arpd eth0.10 eth0.20 eth0.30

# Configure for teaming interface
sudo arpd team0
```

#### Container and Virtualization
```bash
# Start arpd for container bridge
sudo arpd docker0

# Monitor VM network interfaces
sudo arpd virbr0 vnet0 vnet1

# Configure for Open vSwitch
sudo arpd ovs-br0
```

## Signals and Process Management

### Signal Handling
```bash
# Send SIGUSR1 for statistics dump
sudo pkill -USR1 arpd

# Graceful shutdown with database sync
sudo pkill -TERM arpd

# Force database sync without shutdown
sudo pkill -HUP arpd
```

### Process Monitoring
```bash
# Monitor arpd process
ps aux | grep arpd

# Check arpd resource usage
top -p $(pgrep arpd)

# Monitor file descriptors
lsof -p $(pgrep arpd)
```

## Troubleshooting

### Common Issues

#### Database Corruption
```bash
# Symptoms: arpd fails to start or crashes
# Solution: Recreate database
sudo systemctl stop arpd
sudo mv /var/lib/arpd/arpd.db /var/lib/arpd/arpd.db.corrupt
sudo arpd eth0

# Verify database integrity
sudo arpd -l | head -10
```

#### Performance Issues
```bash
# Symptoms: High CPU usage or slow ARP resolution
# Solution: Tune polling and broadcast parameters
sudo arpd -p 120 -R 1 -B 2 eth0

# Monitor performance impact
sudo iostat -x 1 | grep -E "(Device|eth0)"
```

#### Permission Problems
```bash
# Symptoms: Permission denied errors
# Solution: Check database directory permissions
sudo ls -la /var/lib/arpd/
sudo chown -R arpd:arpd /var/lib/arpd/
sudo chmod 755 /var/lib/arpd/
```

### Debugging Techniques

#### Verbose Logging
```bash
# Start with maximum verbosity
sudo arpd -v -v -p 10 eth0 2>&1 | tee /tmp/arpd_debug.log

# Monitor system logs
sudo journalctl -f | grep arpd
```

#### Network Analysis
```bash
# Monitor ARP traffic
sudo tcpdump -i eth0 arp

# Check kernel ARP cache
ip neigh show

# Monitor ARP statistics
cat /proc/net/arp
```

## Related Commands

- [`arp`](/docs/commands/system-info/arp) - Display and manipulate ARP cache
- [`arping`](/docs/commands/system-info/arping) - Send ARP REQUEST to a neighbour host
- [`ip`](/docs/commands/system-info/ip) - Show/manipulate routing, devices, policy routing and tunnels
- [`tcpdump`](/docs/commands/networking/tcpdump) - Dump traffic on a network
- [`ethtool`](/docs/commands/system-info/ethtool) - Display or change ethernet card settings
- [`netstat`](/docs/commands/system-info/netstat) - Print network connections, routing tables, interface statistics
- [`ss`](/docs/commands/system-info/ss) - Another utility to investigate sockets
- [`nmap`](/docs/commands/networking/nmap) - Network exploration tool and security/port scanner

## Best Practices

1. **Database Location**: Store ARP database on fast, reliable storage with adequate space
2. **Regular Backups**: Create periodic backups of the ARP database for disaster recovery
3. **Performance Tuning**: Adjust broadcast and polling parameters based on network size and traffic patterns
4. **Security**: Restrict access to ARP database files and monitor for unusual ARP activity
5. **Monitoring**: Regularly check database size and growth patterns to detect network anomalies
6. **Service Integration**: Configure arpd to start automatically with network services
7. **Resource Management**: Monitor CPU and memory usage, especially on busy networks
8. **Network Segmentation**: Consider running separate arpd instances for different network segments

## Performance Tips

1. **Polling Interval**: Increase `-p` value on stable networks, decrease on dynamic networks
2. **Broadcast Rate**: Adjust `-R` based on network capacity and congestion levels
3. **Database Size**: Monitor database growth and implement cleanup strategies for large networks
4. **Interface Selection**: Run arpd only on interfaces that need ARP optimization
5. **Cache Tuning**: Use `-a` to balance between responsiveness and broadcast traffic
6. **Memory Usage**: Ensure sufficient system memory for large ARP databases
7. **Disk I/O**: Place database on fast storage for better performance
8. **Network Topology**: Consider network topology when configuring broadcast parameters

The `arpd` daemon is a powerful tool for optimizing ARP resolution in large or complex network environments. Its ability to maintain a persistent ARP cache and reduce unnecessary broadcasts makes it particularly valuable in enterprise networks, data centers, and environments with limited kernel ARP cache capacity. Proper configuration and monitoring of arpd can significantly improve network performance while reducing ARP-related traffic overhead.