---
title: netstat - Network Statistics
sidebar_label: netstat
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# netstat - Network Statistics

The `netstat` command is a powerful network utility that displays network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. It provides comprehensive information about network subsystem activity and is essential for network troubleshooting, monitoring, and security analysis. Netstat can display both TCP and UDP connections, show listening sockets, and provide detailed statistics about network interfaces and protocols.

## Basic Syntax

```bash
netstat [OPTIONS] [ADDRESS_FAMILY]
```

## Common Options

### Display Options
- `-a` - Show all sockets (both listening and connected)
- `-l` - Show only listening sockets
- `-n` - Show numeric addresses (don't resolve names)
- `-p` - Show the PID and name of the program
- `-e` - Show extended information (user, inode, etc.)
- `-c` - Continuous output (updates every second)
- `-t` - Show TCP connections
- `-u` - Show UDP connections
- `-w` - Show RAW connections
- `-x` - Show UNIX domain sockets

### Format Options
- `-v` - Verbose output
- `-W` - Wide output (don't truncate hostnames)
- `--numeric-ports` - Show port numbers numerically
- `--numeric-hosts` - Show host addresses numerically

### Information Types
- `-r` - Display routing table
- `-i` - Display interface table
- `-s` - Display network statistics
- `-g` - Display multicast group memberships
- `-M` - Display masqueraded connections

## Usage Examples

### Basic Connection Monitoring

#### Display All Connections
```bash
# Show all active connections
netstat -a

# Show all TCP connections
netstat -at

# Show all UDP connections
netstat -au

# Show numeric output (faster)
netstat -an

# Show all connections with PIDs
netstat -anp

# Continuous monitoring
netstat -c
```

#### Listening Ports Only
```bash
# Show only listening sockets
netstat -l

# Show listening TCP ports
netstat -lt

# Show listening UDP ports
netstat -lu

# Show listening ports with PIDs
netstat -lntp

# Show listening ports in numeric format
netstat -ln
```

### Connection State Analysis

#### TCP Connection States
```bash
# Show all TCP connections with state
netstat -ant

# Show established connections only
netstat -ant | grep ESTABLISHED

# Show connections in TIME_WAIT state
netstat -ant | grep TIME_WAIT

# Count connections by state
netstat -ant | awk '{print $6}' | sort | uniq -c | sort -rn

# Show connections to specific port
netstat -ant | grep :80

# Show connections from specific IP
netstat -ant | grep 192.168.1.100
```

#### Connection Monitoring
```bash
# Monitor new connections in real-time
watch "netstat -ant | grep ESTABLISHED | wc -l"

# Show top 10 connecting IPs
netstat -ant | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10

# Show connections by process
netstat -antp | grep sshd

# Monitor specific service connections
netstat -antp | grep :3306  # MySQL
netstat -antp | grep :5432  # PostgreSQL
netstat -antp | grep :6379  # Redis
```

### Network Interface Statistics

#### Interface Information
```bash
# Show interface statistics
netstat -i

# Show extended interface information
netstat -ie

# Show interface statistics continuously
netstat -ci

# Show specific interface
netstat -i | grep eth0

# Show interface errors and collisions
netstat -i | grep -E "(RX-OK|TX-OK|RX-ERR|TX-ERR)"
```

#### Network Performance
```bash
# Monitor network traffic
watch "netstat -i"

# Show packet statistics
netstat -s

# Show IP statistics
netstat -s | grep -i ip

# Show TCP statistics
netstat -s | grep -i tcp

# Show UDP statistics
netstat -s | grep -i udp
```

### Routing Table Analysis

#### Routing Information
```bash
# Display routing table
netstat -r

# Show numeric routing table
netstat -rn

# Show routing table with extended info
netstat -rne

# Show default gateway
netstat -rn | grep "^0.0.0.0"

# Show routes to specific network
netstat -rn | grep 192.168.1
```

#### Route Analysis
```bash
# Count number of routes
netstat -rn | wc -l

# Show routes to specific interface
netstat -rn | grep eth0

# Show route cache
netstat -rn | grep UG

# Monitor routing changes
watch "netstat -rn"
```

### Socket Analysis

#### UNIX Domain Sockets
```bash
# Show UNIX domain sockets
netstat -x

# Show UNIX sockets with processes
netstat -xp

# Show listening UNIX sockets
netstat -lx

# Count UNIX sockets by type
netstat -x | awk '{print $1}' | sort | uniq -c
```

#### Raw Sockets
```bash
# Show RAW sockets
netstat -w

# Show RAW sockets with processes
netstat -wp

# Show RAW socket statistics
netstat -s | grep RAW
```

## Practical Examples

### System Administration

#### Server Monitoring
```bash
# Monitor web server connections
netstat -antp | grep :80 | wc -l

# Show all listening services
netstat -lntp

# Monitor database connections
netstat -antp | grep :3306

# Check for suspicious connections
netstat -antp | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -20

# Show connections by user
netstat -antp | awk '{print $7}' | sort | uniq -c
```

#### Security Monitoring
```bash
# Find connections from unknown IPs
netstat -ant | grep ESTABLISHED | grep -v -E "(192.168|10\.|127\.0\.0\.1)"

# Show connections without process names (potential malware)
netstat -antp | grep "-"

# Monitor for new listening ports
watch "netstat -lntp | grep -v 'LISTEN'"

# Check for ports in TIME_WAIT attack
netstat -ant | grep TIME_WAIT | wc -l

# Show connection patterns
netstat -ant | awk '{print $6}' | sort | uniq -c | sort -rn
```

#### Performance Analysis
```bash
# Show connection rate
netstat -s | grep "connections established"

# Monitor SYN packets (potential SYN flood)
netstat -s | grep -i syn

# Check for packet loss
netstat -i | grep -E "(RX-ERR|TX-ERR|DROP)"

# Show network utilization
netstat -i | awk '{if(NR>2) print $1, $3+$7, $4+$8}'

# Monitor buffer usage
netstat -s | grep -i buffer
```

### Network Troubleshooting

#### Connection Issues
```bash
# Check if port is listening
netstat -lntp | grep :8080

# Show all connections to problematic service
netstat -antp | grep nginx

# Check for hung connections
netstat -ant | grep -E "(FIN_WAIT|CLOSE_WAIT)"

# Verify firewall by checking blocked connections
netstat -antp | grep SYN_RECV

# Show half-open connections
netstat -ant | grep SYN_SENT
```

#### Service Diagnostics
```bash
# Check if service is listening on all interfaces
netstat -lntp | grep :22 | grep "0.0.0.0"

# Show services bound to localhost only
netstat -lntp | grep "127.0.0.1"

# Find services using specific ports
netstat -lntp | grep -E ":(80|443|8080|8443)"

# Check for port conflicts
netstat -lntp | grep :80

# Show UDP services
netstat -lnup
```

### Development and Testing

#### Application Testing
```bash
# Monitor application connections
netstat -antp | grep java

# Show connection pool usage
netstat -antp | grep ESTABLISHED | grep java | wc -l

# Test connection limits
for i in {1..1000}; do
    netstat -ant | grep ESTABLISHED | wc -l
    sleep 1
done

# Monitor socket usage by application
lsof -p <PID> | grep TCP
```

#### Load Testing
```bash
# Monitor connections during load test
while true; do
    echo "$(date): $(netstat -ant | grep ESTABLISHED | wc -l) connections"
    sleep 5
done

# Track connection states during test
watch "netstat -ant | awk '{print \$6}' | sort | uniq -c"

# Monitor new connections per second
watch "netstat -s | grep 'connections established'"
```

## Advanced Usage

### Custom Output Formats

#### Filtering and Parsing
```bash
# Show only ESTABLISHED connections with process info
netstat -antp | grep ESTABLISHED | awk '{print $4, $5, $7}'

# Format output for reporting
netstat -antp | grep LISTEN | awk '{printf "%-20s %-6s %s\n", $4, $6, $7}'

# Show connection summary by port
netstat -ant | awk '/ESTABLISHED/ {split($5, a, ":"); ports[a[2]]++} END {for (p in ports) print p, ports[p]}'

# Generate connection report
netstat -antp | awk 'BEGIN{print "Local_Address\tRemote_Address\tState\tPID/Program"}
                     /ESTABLISHED/ {print $4 "\t" $5 "\t" $6 "\t" $7}'
```

#### Complex Queries
```bash
# Show connections without DNS resolution (fast)
netstat -antp | grep -v "0.0.0.0:*"

# Find connections older than 1 hour (requires additional tools)
ss -o state established '( dport = :http or sport = :http )'

# Show connections grouped by process
netstat -antp | awk '{print $7}' | sort | uniq -c | sort -rn

# Monitor connection creation rate
netstat -s | grep "active connections openings"
```

### Integration with Other Tools

#### Combining Commands
```bash
# Top 10 connection consumers
netstat -antp | awk '{print $7}' | sort | uniq -c | sort -rn | head -10

# Show connections and system load together
while true; do
    clear
    date
    echo "Connections: $(netstat -ant | grep ESTABLISHED | wc -l)"
    uptime
    netstat -ant | grep ESTABLISHED | head -5
    sleep 2
done

# Network usage by process
for pid in $(pgrep -d, nginx); do
    echo "PID: $pid"
    netstat -antp | grep $pid
done

# Log connection statistics
echo "$(date): $(netstat -ant | grep ESTABLISHED | wc -l)" >> /var/log/connections.log
```

#### Script Integration
```bash
#!/bin/bash
# Network monitoring script

LOG_FILE="/var/log/network_monitor.log"
ALERT_THRESHOLD=1000

# Function to log connections
log_connections() {
    local count=$(netstat -ant | grep ESTABLISHED | wc -l)
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Connections: $count" >> $LOG_FILE

    if [ $count -gt $ALERT_THRESHOLD ]; then
        echo "ALERT: High connection count: $count" >> $LOG_FILE
        # Send alert notification here
    fi
}

# Function to check suspicious connections
check_suspicious() {
    netstat -ant | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10 >> $LOG_FILE
}

# Main monitoring loop
while true; do
    log_connections
    check_suspicious
    sleep 60
done
```

## Troubleshooting

### Common Issues

#### Performance Problems
```bash
# Slow netstat output
# Solution: Use -n flag to avoid DNS resolution
netstat -an  # Much faster than netstat -a

# Too many connections to display
# Solution: Filter or count connections
netstat -ant | wc -l
netstat -ant | grep :80 | wc -l

# System with many network interfaces
# Solution: Show specific interface only
netstat -i | grep eth0
```

#### Permission Issues
```bash
# netstat shows "-" instead of process names
# Solution: Run as root or use appropriate permissions
sudo netstat -antp

# Can't see all processes
# Solution: Check if net-tools is installed
sudo apt-get install net-tools
sudo yum install net-tools
```

#### Output Interpretation
```bash
# Understanding connection states
netstat -ant | awk '{print $6}' | sort | uniq -c

# Common states:
# ESTABLISHED - Active connection
# LISTEN - Waiting for connection
# TIME_WAIT - Waiting for late packets
# CLOSE_WAIT - Remote closed, waiting for application
# FIN_WAIT - Connection closing
# SYN_SENT - Connection initiated
# SYN_RECV - Connection received

# Check for unusual states
netstat -ant | grep -v -E "(ESTABLISHED|LISTEN|TIME_WAIT|CLOSE_WAIT)"
```

### Debugging Network Issues

#### Connection Problems
```bash
# Verify service is listening
netstat -lntp | grep :80

# Check if firewall is blocking
netstat -antp | grep SYN_RECV

# Look for hung connections
netstat -ant | grep FIN_WAIT

# Monitor during problem occurrence
watch "netstat -antp | grep ESTABLISHED"
```

#### Performance Bottlenecks
```bash
# Check for connection leaks
netstat -ant | grep CLOSE_WAIT | wc -l

# Monitor connection buildup
while true; do
    echo "$(date): $(netstat -ant | wc -l) total connections"
    sleep 30
done

# Find top connection consumers
netstat -antp | awk '{print $7}' | sort | uniq -c | sort -rn | head -10
```

## Related Commands

- [`ss`](/docs/commands/system-info/ss) - Modern replacement for netstat with more features
- [`lsof`](/docs/commands/system-info/lsof) - List open files and network connections
- [`nmap`](/docs/commands/network/nmap) - Network scanning and discovery
- [`tcpdump`](/docs/commands/network/tcpdump) - Packet capture and analysis
- [`ip`](/docs/commands/system-info/ip) - Modern network interface configuration
- [`iftop`](/docs/commands/network/iftop) - Real-time network bandwidth monitoring
- [`nethogs`](/docs/commands/system-info/nethogs) - Per-process network usage monitoring
- [`sar`](/docs/commands/system-info/sar) - System activity reporter

## Best Practices

1. **Use numeric output** (`-n`) for better performance and readability
2. **Run as root** to see process names and PIDs for all connections
3. **Filter output** using grep or awk for specific information
4. **Use continuous mode** (`-c`) for real-time monitoring
5. **Combine with watch** for periodic updates without flooding output
6. **Log interesting connections** for security analysis
7. **Monitor connection states** to detect network problems early
8. **Use ss instead** when possible for better performance on modern systems

## Performance Tips

1. **Avoid DNS resolution** with `-n` flag for faster output
2. **Filter early** with specific options (`-t`, `-u`, `-l`) to reduce output
3. **Use grep for filtering** instead of netstat options when possible
4. **Consider ss command** for better performance on busy systems
5. **Use specific address families** to limit scope of information
6. **Cache frequent queries** in scripts to avoid repeated calls
7. **Monitor selectively** during high traffic periods

The `netstat` command remains a fundamental tool for network administration and troubleshooting, providing comprehensive visibility into network connections and system networking activity. While newer tools like `ss` offer better performance, `netstat`'s familiarity and detailed output make it valuable for network diagnostics and monitoring.

*Note: On many modern Linux distributions, netstat is considered deprecated in favor of the `ss` command from the iproute2 package, but netstat is still widely used and available.*