---
title: arpwatch - ARP monitoring tool
sidebar_label: arpwatch
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# arpwatch - ARP monitoring tool

The `arpwatch` command is a network monitoring utility that keeps track of Ethernet/IP address pairings on a network. It continuously monitors ARP (Address Resolution Protocol) traffic and logs changes in IP-to-MAC address mappings, making it an essential tool for network security monitoring, detecting unauthorized devices, and troubleshooting network issues. Arpwatch can detect potential security threats like ARP spoofing, IP conflicts, and unauthorized network access by logging when the same IP address is associated with different MAC addresses or vice versa.

## Basic Syntax

```bash
arpwatch [OPTIONS] [INTERFACE]
```

## Common Options

### Basic Options
- `-i INTERFACE` - Specify network interface to monitor
- `-f FILE` - Specify database file (default: /var/lib/arpwatch/arp.dat)
- `-r FILE` - Read packets from file instead of network interface
- `-u USER` - Run as specified user (default: pcap)
- `-g GROUP` - Run as specified group (default: pcap)
- `-P` - Don't put interface into promiscuous mode
- `-p` - Don't attempt to change process priority
- `-n` - Use numeric IP addresses instead of hostnames
- `-N` - Don't resolve hostnames
- `-m EMAIL` - Send email reports to specified address
- `-e EMAIL` - Email sender address
- `-s SUBDIR` - Save database in subdirectory
- `-l` - Log to syslog instead of stdout
- `-a` - Append to database file instead of overwriting
- `-t` - Timestamp database entries
- `-y` - Send email for every change (not just new ones)
- `-b` - Don't beep when something changes
- `-B` - beep for every packet (for debugging)
- `-C` - Use compact output format
- `-R` - Report on repeated changes
- `-h` - Display help information
- `-v` - Show version information

### Output Control
- `-D` - Debug mode (don't fork to background)
- `-f` - Run in foreground
- `-d` - Enable debug output

## Usage Examples

### Basic ARP Monitoring

#### Monitor Default Interface
```bash
# Monitor the default network interface
sudo arpwatch

# Monitor specific interface
sudo arpwatch -i eth0

# Monitor wireless interface
sudo arpwatch -i wlan0
```

#### Custom Database and Logging
```bash
# Use custom database file
sudo arpwatch -f /custom/path/arp.dat

# Log to syslog
sudo arpwatch -l

# Run in foreground with debug output
sudo arpwatch -D

# Use numeric IP addresses only
sudo arpwatch -n
```

#### Background Service Setup
```bash
# Run as daemon with specific user
sudo arpwatch -u nobody -g nogroup

# Send email notifications
sudo arpwatch -m admin@company.com

# Email with custom sender
sudo arpwatch -m admin@company.com -e arpwatch@company.com
```

### Advanced Monitoring Scenarios

#### Network Security Monitoring
```bash
# Monitor for ARP spoofing attacks
sudo arpwatch -i eth0 -m security@company.com -y

# Monitor without hostname resolution (faster)
sudo arpwatch -i eth0 -n -l

# Monitor with beep alerts
sudo arpwatch -i eth0 -m admin@company.com

# Monitor in promiscuous mode
sudo arpwatch -i eth0
```

#### Multiple Interface Monitoring
```bash
# Monitor multiple interfaces (run multiple instances)
sudo arpwatch -i eth0 -f /var/lib/arpwatch/arp.eth0.dat &
sudo arpwatch -i wlan0 -f /var/lib/arpwatch/arp.wlan0.dat &

# Monitor with different users
sudo arpwatch -i eth0 -u arpwatch_eth0 -g arpwatch
sudo arpwatch -i eth1 -u arpwatch_eth1 -g arpwatch
```

#### Debugging and Analysis
```bash
# Run in foreground with verbose output
sudo arpwatch -D -v

# Read from packet capture file
sudo arpwatch -r network_capture.pcap

# Monitor with timestamp logging
sudo arpwatch -t -f /var/log/arpwatch_timestamped.dat

# Monitor all changes with email alerts
sudo arpwatch -y -m network-admin@company.com
```

## Practical Examples

### Network Administration

#### Security Monitoring
```bash
# Continuous security monitoring with email alerts
sudo arpwatch -i eth0 -m security@company.com -y -l

# Monitor suspicious network activity
sudo arpwatch -i eth0 -n -f /var/log/security_arp.dat

# Automated security response script
#!/bin/bash
# Monitor ARP changes and trigger alerts
sudo arpwatch -i eth0 -m security@company.com | \
    while read line; do
        echo "ARP Change Detected: $line" | \
            mail -s "Security Alert: ARP Change" admin@company.com
    done
```

#### Network Inventory Management
```bash
# Maintain network inventory database
sudo arpwatch -i eth0 -f /var/lib/arpwatch/inventory.dat

# Generate network inventory report
arp2ethers -f /var/lib/arpwatch/inventory.dat > /etc/ethers

# Monitor new devices on network
sudo arpwatch -i eth0 -m network-admin@company.com -y
```

#### Troubleshooting Network Issues
```bash
# Monitor IP conflicts
sudo arpwatch -i eth0 -n -l

# Track IP address changes
sudo arpwatch -i eth0 -t -f /var/log/ip_changes.log

# Debug network connectivity issues
sudo tcpdump -i eth0 -w capture.pcap &
sudo arpwatch -i eth0 -r capture.pcap
```

### Enterprise Deployment

#### Centralized ARP Monitoring
```bash
# Setup centralized monitoring server
#!/bin/bash
# arpwatch_monitor.sh - Centralized ARP monitoring

INTERFACES="eth0 eth1 eth2 eth3"
LOG_DIR="/var/log/arpwatch"
EMAIL="network-admin@company.com"

for iface in $INTERFACES; do
    sudo arpwatch -i $iface \
        -f $LOG_DIR/arp.$iface.dat \
        -m $EMAIL \
        -l \
        -u arpwatch \
        -g arpwatch &
done
```

#### Automated Reporting
```bash
# Daily ARP activity report
#!/bin/bash
# daily_arp_report.sh

DATE=$(date +%Y%m%d)
REPORT_FILE="/tmp/arp_report_$DATE.log"

echo "ARP Activity Report for $(date)" > $REPORT_FILE
echo "================================" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Process arpwatch database files
for dat_file in /var/lib/arpwatch/*.dat; do
    interface=$(basename $dat_file .dat)
    echo "Interface: $interface" >> $REPORT_FILE
    echo "---------------------" >> $REPORT_FILE
    cat $dat_file >> $REPORT_FILE
    echo "" >> $REPORT_FILE
done

# Email the report
mail -s "Daily ARP Activity Report" network-admin@company.com < $REPORT_FILE
```

#### Integration with SIEM Systems
```bash
# Export ARP data to SIEM format
#!/bin/bash
# arp_to_siem.sh

ARP_DAT="/var/lib/arpwatch/arp.dat"
SIEM_LOG="/var/log/siem/arp_events.log"

while true; do
    if [ -f "$ARP_DAT" ]; then
        tail -n 1 "$ARP_DAT" | \
            awk '{print strftime("%Y-%m-%d %H:%M:%S"), "ARP_CHANGE", $0}' >> $SIEM_LOG
    fi
    sleep 60
done
```

### Development and Testing

#### Packet Analysis
```bash
# Capture and analyze ARP packets
sudo tcpdump -i eth0 -w arp_capture.pcap 'arp'
sudo arpwatch -r arp_capture.pcap

# Test ARP spoofing detection
sudo arpspoof -i eth0 -t 192.168.1.100 192.168.1.1 &
sudo arpwatch -i eth0 -D

# Simulate network changes for testing
sudo arp -s 192.168.1.200 aa:bb:cc:dd:ee:ff
sudo arpwatch -i eth0 -D -f /tmp/test_arp.dat
```

#### Script Integration
```bash
# Python script to process arpwatch output
#!/usr/bin/env python3
# process_arpwatch.py

import re
import sys
import json
from datetime import datetime

def parse_arp_line(line):
    """Parse arpwatch output line"""
    pattern = r'(\S+)\s+(\S+)\s+(\d+)\s+(.*)'
    match = re.match(pattern, line.strip())
    if match:
        return {
            'timestamp': datetime.now().isoformat(),
            'hostname': match.group(1),
            'ip_address': match.group(2),
            'interface': match.group(3),
            'details': match.group(4)
        }
    return None

def main():
    for line in sys.stdin:
        parsed = parse_arp_line(line)
        if parsed:
            print(json.dumps(parsed))

if __name__ == "__main__":
    main()
```

## Advanced Usage

### Database Management

#### ARP Database Operations
```bash
# Convert ARP database to human-readable format
arp2ethers -f /var/lib/arpwatch/arp.dat

# Merge multiple ARP databases
cat /var/lib/arpwatch/arp.eth0.dat /var/lib/arpwatch/arp.eth1.dat > /tmp/merged_arp.dat

# Clean old ARP entries
awk '$3 > systime() - 86400 * 7' /var/lib/arpwatch/arp.dat > /tmp/clean_arp.dat

# Extract specific host ARP history
grep "192.168.1.100" /var/lib/arpwatch/arp.dat
```

#### Database Backup and Recovery
```bash
# Backup ARP database
cp /var/lib/arpwatch/arp.dat /backup/arpwatch/arp_$(date +%Y%m%d).dat

# Restore ARP database
cp /backup/arpwatch/arp_20231201.dat /var/lib/arpwatch/arp.dat

# Rotate ARP logs
#!/bin/bash
LOG_DIR="/var/lib/arpwatch"
DAYS_TO_KEEP=30

for log_file in $LOG_DIR/*.dat; do
    if [ $(find $log_file -mtime +$DAYS_TO_KEEP) ]; then
        gzip $log_file
        mv $log_file.gz $LOG_DIR/archive/
    fi
done
```

### Performance Optimization

#### Resource Management
```bash
# Limit CPU usage
nice -n 19 sudo arpwatch -i eth0

# Monitor multiple interfaces efficiently
#!/bin/bash
# multi_interface_monitor.sh

INTERFACES="eth0 eth1"
MAX_PROCS=2

for iface in $INTERFACES; do
    sudo arpwatch -i $iface -f /tmp/arp_$iface.dat &

    # Limit concurrent processes
    while [ $(pgrep -f arpwatch | wc -l) -ge $MAX_PROCS ]; do
        sleep 1
    done
done
```

#### Memory and Storage Optimization
```bash
# Use compact output format
sudo arpwatch -C -f /var/lib/arpwatch/compact.dat

# Limit database size
#!/bin/bash
# limit_database_size.sh

MAX_SIZE=10000000  # 10MB
DB_FILE="/var/lib/arpwatch/arp.dat"

while [ $(stat -c%s "$DB_FILE") -gt $MAX_SIZE ]; do
    # Remove oldest entries (first line)
    sed -i '1d' "$DB_FILE"
done
```

## Integration and Automation

### Systemd Service Setup

#### Create arpwatch Service
```bash
# /etc/systemd/system/arpwatch@.service
[Unit]
Description=ARP Monitor for %I
After=network.target

[Service]
Type=simple
ExecStart=/usr/sbin/arpwatch -i %I -f /var/lib/arpwatch/arp.%I.dat -l -u arpwatch -g arpwatch
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

#### Enable and Start Services
```bash
# Reload systemd configuration
sudo systemctl daemon-reload

# Enable arpwatch for specific interfaces
sudo systemctl enable arpwatch@eth0
sudo systemctl enable arpwatch@wlan0

# Start the services
sudo systemctl start arpwatch@eth0
sudo systemctl start arpwatch@wlan0

# Check status
sudo systemctl status arpwatch@eth0
```

### Logrotate Configuration

#### Setup Log Rotation
```bash
# /etc/logrotate.d/arpwatch
/var/lib/arpwatch/*.dat {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 arpwatch arpwatch
    postrotate
        systemctl reload arpwatch@eth0 || true
    endscript
}
```

### Integration with Monitoring Systems

#### Nagios/Icinga Plugin
```bash
#!/bin/bash
# check_arpwatch.sh - Nagios plugin for ARP monitoring

ARP_FILE="/var/lib/arpwatch/arp.dat"
WARNING_THRESHOLD=10
CRITICAL_THRESHOLD=20

if [ ! -f "$ARP_FILE" ]; then
    echo "UNKNOWN: ARP database file not found"
    exit 3
fi

CHANGES=$(wc -l < "$ARP_FILE")

if [ $CHANGES -gt $CRITICAL_THRESHOLD ]; then
    echo "CRITICAL: $CHANGES ARP changes detected"
    exit 2
elif [ $CHANGES -gt $WARNING_THRESHOLD ]; then
    echo "WARNING: $CHANGES ARP changes detected"
    exit 1
else
    echo "OK: $CHANGES ARP changes detected"
    exit 0
fi
```

#### Prometheus Exporter
```bash
#!/bin/bash
# arpwatch_exporter.sh - Prometheus metrics exporter

ARP_FILE="/var/lib/arpwatch/arp.dat"

echo "# HELP arpwatch_changes_total Total number of ARP changes"
echo "# TYPE arpwatch_changes_total counter"

if [ -f "$ARP_FILE" ]; then
    CHANGES=$(wc -l < "$ARP_FILE")
    echo "arpwatch_changes_total $CHANGES"
fi

echo "# HELP arpwatch_last_change_timestamp Timestamp of last ARP change"
echo "# TYPE arpwatch_last_change_timestamp gauge"

if [ -f "$ARP_FILE" ] && [ -s "$ARP_FILE" ]; then
    LAST_CHANGE=$(tail -1 "$ARP_FILE" | awk '{print $1}')
    echo "arpwatch_last_change_timestamp $LAST_CHANGE"
fi
```

## Troubleshooting

### Common Issues

#### Permission Problems
```bash
# Fix permission denied errors
sudo chown arpwatch:arpwatch /var/lib/arpwatch/
sudo chmod 755 /var/lib/arpwatch/

# Check if running with correct privileges
sudo -u arpwatch arpwatch -i eth0 -D

# Setup proper capabilities
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/arpwatch
```

#### Interface Issues
```bash
# Check if interface exists
ip link show

# Verify interface is up
sudo ip link set eth0 up

# Check promiscuous mode
sudo ip link set eth0 promisc on
sudo arpwatch -i eth0
```

#### Database File Issues
```bash
# Create database directory
sudo mkdir -p /var/lib/arpwatch
sudo chown arpwatch:arpwatch /var/lib/arpwatch

# Fix corrupted database
sudo rm /var/lib/arpwatch/arp.dat
sudo arpwatch -i eth0 -f /var/lib/arpwatch/arp.dat

# Check database file permissions
ls -la /var/lib/arpwatch/
```

#### Performance Issues
```bash
# Monitor CPU usage
top -p $(pgrep arpwatch)

# Check network interface utilization
iftop -i eth0

# Reduce monitoring frequency
sudo arpwatch -i eth0 -p
```

## Related Commands

- [`arp`](/docs/commands/system-info/arp) - Display and modify ARP cache
- [`arping`](/docs/commands/system-info/arping) - Send ARP REQUEST to a host
- [`tcpdump`](/docs/commands/network-tools/tcpdump) - Dump traffic on a network
- [`wireshark`](/docs/commands/network-tools/wireshark) - Network protocol analyzer
- [`nmap`](/docs/commands/network-tools/nmap) - Network exploration and security auditing
- [`netstat`](/docs/commands/system-info/netstat) - Network statistics
- [`ip`](/docs/commands/system-info/ip) - Show/manipulate routing and devices
- [`ethtool`](/docs/commands/system-info/ethtool) - Display or modify ethernet device settings

## Best Practices

1. **Run as non-root user** when possible using appropriate capabilities
2. **Monitor critical interfaces** continuously for security purposes
3. **Implement log rotation** to prevent database files from growing too large
4. **Use email notifications** for immediate security alerts
5. **Backup ARP databases** regularly for historical analysis
6. **Integrate with SIEM systems** for comprehensive security monitoring
7. **Monitor system resources** when running on high-traffic networks
8. **Use specific database files** for different interfaces
9. **Test configurations** in development environments before production deployment
10. **Document monitoring policies** and alert thresholds

## Performance Tips

1. **Use numeric addresses** (-n) to reduce DNS lookup overhead
2. **Limit monitoring** to essential interfaces only
3. **Adjust process priority** when running on busy systems
4. **Use compact format** (-C) to reduce database size
5. **Implement database cleanup** scripts to manage file sizes
6. **Monitor resource usage** and adjust as needed
7. **Consider packet filtering** on very busy networks
8. **Use appropriate hardware** for high-traffic monitoring
9. **Optimize email notifications** to prevent alert fatigue
10. **Regular maintenance** of ARP databases improves performance

The `arpwatch` command is a powerful network security tool that provides essential monitoring of ARP activity. By detecting changes in IP-to-MAC address mappings, it helps identify potential security threats, unauthorized devices, and network misconfigurations. Proper configuration and integration with existing security infrastructure make it an invaluable component of comprehensive network security monitoring.