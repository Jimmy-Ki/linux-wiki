---
title: ss - Socket Statistics Utility
sidebar_label: ss
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ss - Socket Statistics Utility

The `ss` command is a modern and powerful utility for investigating network and system socket connections on Linux systems. It serves as a replacement for the older `netstat` command, offering significantly better performance and more detailed information about TCP, UDP, UNIX domain sockets, and various other socket types. The `ss` command retrieves its information directly from the kernel, making it faster and more efficient than `netstat`, especially on systems with large numbers of connections. It provides comprehensive socket state information, network statistics, process-to-socket mappings, and advanced filtering capabilities for network diagnostics and monitoring.

## Basic Syntax

```bash
ss [OPTIONS] [ FILTER ]
```

## Common Options

### Display Options
- `-a, --all` - Show all sockets (both listening and non-listening)
- `-l, --listening` - Show only listening sockets
- `-n, --numeric` - Don't resolve service names (show port numbers)
- `-r, --resolve` - Resolve hostnames and service names
- `-p, --processes` - Show process using socket
- `-e, --extended` - Show detailed socket information
- `-m, --memory` - Show socket memory usage
- `-i, --info` - Show internal TCP information
- `-o, --options` - Show timer information

### Protocol and Socket Type
- `-t, --tcp` - Display TCP sockets
- `-u, --udp` - Display UDP sockets
- `-w, --raw` - Display RAW sockets
- `-x, --unix` - Display UNIX domain sockets
- `-d, --dccp` - Display DCCP sockets
- `-s, --summary` - Show socket statistics summary
- `-4, --ipv4` - Display IPv4 sockets only
- `-6, --ipv6` - Display IPv6 sockets only

### State Filtering
- `state FILTER` - Filter by socket state (established, time-wait, etc.)
- `exclude FILTER` - Exclude matching sockets
- `exclude STATE-FILTER` - Exclude specific states

### Output Control
- `-H, --no-header` - Suppress header line
- `-O, --oneline` - Print each socket on a single line
- `-b, --bpf` - Show BPF filter code
- `-E, --events` - Continually display sockets as they are created/destroyed
- `-Z, --context` - Display SELinux security context
- `-z, --contexts` - Show process security contexts

## Usage Examples

### Basic Socket Information

#### Listing All Sockets
```bash
# Show all sockets
ss -a

# Show all sockets with process information
ss -ap

# Show all sockets without resolving names
ss -an

# Show only listening sockets
ss -l

# Show listening sockets with processes
ss -lp

# Show all TCP sockets
ss -at

# Show all UDP sockets
ss -au

# Show UNIX domain sockets
ss -ax
```

#### Socket Statistics Summary
```bash
# Show socket statistics summary
ss -s

# Show summary with extended information
ss -se

# Show TCP protocol statistics
ss -st

# Show UDP protocol statistics
ss -su

# Show summary for all protocols
ss -s -a
```

### TCP Socket Analysis

#### TCP Connection States
```bash
# Show all TCP connections with process info
ss -tp

# Show established TCP connections
ss -t state established

# Show listening TCP sockets
ss -t state listening

# Show TCP connections in TIME_WAIT state
ss -t state time-wait

# Show all TCP connection states
ss -t state all

# Show TCP connections with detailed information
ss -tpe

# Show TCP connections with memory usage
ss -tpm

# Show TCP connections with timer information
ss -tpo
```

#### TCP Connection Filtering
```bash
# Filter by destination port
ss -t '( dport = :22 )'

# Filter by source port
ss -t '( sport = :80 )'

# Filter by destination address
ss -t '( dst = 192.168.1.100 )'

# Filter by source address
ss -t '( src = 192.168.1.100 )'

# Filter by specific connection
ss -t '( dst = 192.168.1.100 and dport = :22 )'

# Filter established connections to specific host
ss -t state established '( dst = 10.0.0.0/8 )'

# Show connections from specific process
ss -tp '( pid = 1234 )'

# Show connections from specific user
ss -tp '( uid = 1000 )'
```

### UDP Socket Analysis

#### UDP Socket Information
```bash
# Show all UDP sockets with processes
ss -up

# Show UDP sockets with extended info
ss -ue

# Show UDP sockets with memory info
ss -upm

# Show listening UDP sockets
ss -ul

# Show UDP sockets to specific port
ss -ua '( dport = :53 )'

# Show UDP sockets from specific process
ss -up '( pid = 4356 )'
```

### UNIX Domain Sockets

#### UNIX Socket Analysis
```bash
# Show all UNIX domain sockets
ss -ax

# Show UNIX sockets with processes
ss -axp

# Show listening UNIX sockets
ss -xl

# Show UNIX sockets with extended info
ss -xae

# Show UNIX sockets by path
ss -ax '( path = /var/run/docker.sock )'

# Show UNIX sockets for specific user
ss -axp '( uid = 0 )'
```

### Advanced Filtering

#### Complex Filters
```bash
# Filter by multiple conditions
ss -t '( dport = :80 or dport = :443 ) and state established'

# Exclude specific ports
ss -t 'state established and not ( dport = :22 )'

# Filter by IP range
ss -t '( dst = 192.168.1.0/24 )'

# Filter by interface
ss -t '( dst = 192.168.1.1 ) and ( dst != 127.0.0.1 )'

# Show IPv4 connections only
ss -4t

# Show IPv6 connections only
ss -6t

# Filter by network protocol
ss -t '( ipproto = tcp )'

# Show connections with specific packet count
ss -tie
```

#### Process-based Filtering
```bash
# Show sockets for specific PID
ss -p '( pid = 1234 )'

# Show sockets for specific process name
ss -p '( procname = nginx )'

# Show sockets for specific user
ss -p '( uid = 1000 )'

# Show sockets for specific group
ss -p '( gid = 1000 )'

# Combine process and state filters
ss -tp '( pid = 1234 ) and state established'
```

## Practical Examples

### System Administration

#### Network Monitoring
```bash
# Monitor all network activity in real-time
ss -itpe

# Continually monitor new connections
ss -itE

# Monitor connection changes
watch -n 1 'ss -t state established'

# Show top 10 processes by connections
ss -tp | awk '{print $5}' | sort | uniq -c | sort -nr | head -10

# Monitor port usage
ss -tuln | grep LISTEN

# Show connection statistics over time
while true; do ss -s; sleep 5; done
```

#### Security Analysis
```bash
# Show all listening services
ss -tlpn

# Show connections from external IPs
ss -tp state established | grep -v '127.0.0.1\|::1'

# Show suspicious connections (high port numbers)
ss -tp '( dport > :1024 ) and state established'

# Monitor for new connections
ss -itp state established

# Show connections without associated processes
ss -ap | grep 'users=('

# Show connections from root processes
ss -ap '( uid = 0 )'

# Show all privileged ports (<1024)
ss -lt '( sport < :1024 )'

# Detect port scanning attempts
ss -tlpn | grep -E ':([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b'
```

### Performance Analysis

#### Connection Analysis
```bash
# Show connection count by state
ss -s

# Show TCP connection statistics
ss -st

# Show memory usage by socket
ss -mp

# Show TCP timers and timeouts
ss -to

# Show connections with high send/recv queues
ss -tpn | awk '$5 > 1000 || $6 > 1000'

# Monitor connection churn
ss -it state all

# Show slow connections (large timers)
ss -toe

# Show connection latency information
ss -tie
```

#### System Diagnostics
```bash
# Check for TIME_WAIT connections
ss -t state time-wait | wc -l

# Show CLOSE_WAIT connections (potential application issues)
ss -t state close-wait

# Show FIN_WAIT connections
ss -t state fin-wait-1,fin-wait-2

# Check socket memory usage
ss -sm

# Show raw socket statistics
ss -sr

# Display kernel socket information
ss -i

# Show protocol-specific statistics
ss -s
```

### Web Server Administration

#### Apache/Nginx Monitoring
```bash
# Show all web server connections
ss -tp '( dport = :80 or dport = :443 )'

# Show established web connections
ss -tp state established '( dport = :80 or dport = :443 )'

# Show web server process connections
ss -tp '( procname = apache2 or procname = nginx )'

# Monitor web server connection states
ss -tp '( dport = :80 or dport = :443 )' | grep -E 'ESTAB|TIME-WAIT|FIN-WAIT'

# Show SSL connections
ss -tp '( dport = :443 )'

# Monitor web server performance
ss -tpie '( dport = :80 or dport = :443 )'
```

### Database Server Administration

#### Database Connection Monitoring
```bash
# Show MySQL connections
ss -tp '( dport = :3306 )'

# Show PostgreSQL connections
ss -tp '( dport = :5432 )'

# Show Redis connections
ss -tp '( dport = :6379 )'

# Monitor database connection pool
ss -tp state established '( dport = :3306 )'

# Show database server listening ports
ss -tlpn | grep -E ':3306|:5432|:6379|:27017'

# Check database connection statistics
ss -s | grep -E 'TCP|LISTEN'
```

## Advanced Usage

### Socket Memory Analysis

#### Memory Usage Investigation
```bash
# Show socket memory usage
ss -m

# Show memory usage with process info
ss -mp

# Show TCP memory statistics
ss -tm

# Show detailed memory information
ss -mpe

# Monitor socket memory usage
watch -n 1 'ss -sm'

# Show high memory usage sockets
ss -mp | awk '$5 > 1000 || $6 > 1000'

# Show memory usage by protocol
ss -sm | grep -E 'TCP|UDP|RAW'
```

### Timer and Performance Analysis

#### Timer Information
```bash
# Show socket timers
ss -o

# Show timers with process info
ss -op

# Show TCP timers specifically
ss -to

# Show detailed timer information
ss -ope

# Monitor connection timeouts
ss -ot state time-wait

# Show keepalive timers
ss -to state established
```

#### Performance Metrics
```bash
# Show internal TCP information
ss -i

# Show extended socket information
ss -e

# Show all available information
ss -peomi

# Show detailed statistics
ss -se

# Monitor performance changes
ss -itpeo

# Show connection quality metrics
ss -tie
```

### Real-time Monitoring

#### Continuous Monitoring
```bash
# Monitor socket events in real-time
ss -E

# Monitor TCP events
ss -Et

# Monitor specific ports
ss -E '( dport = :80 )'

# Monitor with detailed output
ss -Epe

# Monitor specific processes
ss -Ep '( pid = 1234 )'

# Save monitoring to file
ss -Epe > socket_monitor.log
```

## Integration and Automation

### Shell Scripts

#### Network Health Check Script
```bash
#!/bin/bash
# Network socket health checker

# Check critical services
check_service() {
    local service=$1
    local port=$2
    local count=$(ss -tlpn "( dport = :$port )" | grep -c LISTEN)

    if [ $count -gt 0 ]; then
        echo "✓ $service is listening on port $port"
    else
        echo "✗ $service is NOT listening on port $port"
        return 1
    fi
}

# Check essential services
echo "Checking network services..."
check_service "SSH" 22
check_service "HTTP" 80
check_service "HTTPS" 443
check_service "DNS" 53

# Check connection statistics
echo -e "\nConnection Statistics:"
ss -s | grep -E 'TCP|UDP|Total'

# Check for suspicious connections
echo -e "\nSuspicious connections (privileged users, high ports):"
ss -tp '( uid = 0 ) and ( dport > :1024 )'

# Check TIME_WAIT connections
time_wait=$(ss -t state time-wait | wc -l)
echo "TIME_WAIT connections: $time_wait"
```

#### Connection Monitoring Script
```bash
#!/bin/bash
# Continuous connection monitor

MONITOR_INTERVAL=10
ALARM_THRESHOLD=1000
LOG_FILE="/var/log/connections.log"

while true; do
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    total_connections=$(ss -t state established | wc -l)
    time_wait=$(ss -t state time-wait | wc -l)

    echo "[$timestamp] Established: $total_connections, TIME_WAIT: $time_wait" >> $LOG_FILE

    if [ $total_connections -gt $ALARM_THRESHOLD ]; then
        echo "WARNING: High connection count: $total_connections" >> $LOG_FILE
    fi

    sleep $MONITOR_INTERVAL
done
```

#### Port Usage Analysis
```bash
#!/bin/bash
# Port usage analysis script

echo "=== Listening Ports Analysis ==="
ss -tuln | awk 'NR>1 {print $1, $5}' | sort | uniq -c | sort -nr

echo -e "\n=== Top 10 Connected Ports ==="
ss -tn state established | awk '{print $4}' | \
    sed 's/.*:\([0-9]\+\)/\1/' | sort | uniq -c | sort -nr | head -10

echo -e "\n=== Processes with Most Connections ==="
ss -tp state established | awk '/users=/ {print $7}' | \
    sed 's/users=(//g; s/,.*//g; s/"//g' | sort | uniq -c | sort -nr | head -10

echo -e "\n=== Foreign IP Connections ==="
ss -tn state established | awk '{print $5}' | \
    sed 's/:.*//g' | sort | uniq -c | sort -nr | head -10
```

### Performance Optimization

#### Connection Optimization
```bash
# Check for excessive TIME_WAIT connections
time_wait_count=$(ss -t state time-wait | wc -l)
if [ $time_wait_count -gt 1000 ]; then
    echo "High TIME_WAIT count: $time_wait_count"
    echo "Consider adjusting TCP_FIN_TIMEOUT"
fi

# Check CLOSE_WAIT connections (application issue)
close_wait=$(ss -t state close-wait | wc -l)
if [ $close_wait -gt 10 ]; then
    echo "CLOSE_WAIT connections detected: $close_wait"
    echo "Possible application issues"
fi

# Check socket memory usage
mem_info=$(ss -sm | grep 'mem')
echo "Socket memory usage: $mem_info"

# Show connection distribution by state
ss -st | grep -E 'ESTABLISHED|TIME-WAIT|CLOSE-WAIT'
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Check if service is listening
ss -tlpn | grep :80

# Check established connections to service
ss -tpn | grep :80

# Check for TIME_WAIT accumulation
ss -t state time-wait | wc -l

# Check socket memory pressure
ss -sm

# Verify firewall isn't blocking
ss -tlpn | grep LISTEN

# Check for connection limits
ulimit -n
```

#### Performance Issues
```bash
# Check connection queue lengths
ss -tlpn

# Monitor connection rates
watch -n 1 'ss -s'

# Check for socket leaks
ss -tp state established | grep -v 'users=('

# Monitor memory usage
ss -mp

# Check for socket buffer issues
ss -ie
```

#### Debugging Techniques
```bash
# Show all connection details
ss -peomi

# Monitor in real-time
ss -E

# Show raw socket information
ss -i

# Check specific process connections
ss -tp '( pid = 1234 )'

# Show connections with errors
ss -te | grep -E 'error|drop'

# Filter by specific condition
ss -t '( dport = :80 ) and state established'
```

## Related Commands

- [`netstat`](/docs/commands/network/netstat) - Legacy network statistics tool
- [`lsof`](/docs/commands/system-info/lsof) - List open files and network connections
- [`netcat`](/docs/commands/network/netcat) - Network utility for reading/writing connections
- [`tcpdump`](/docs/commands/network/tcpdump) - Network packet analyzer
- [`nmap`](/docs/commands/network/nmap) - Network discovery and security scanning
- [`ip`](/docs/commands/system-info/ip) - Show/manipulate routing and network devices
- [`iptables`](/docs/commands/network/iptables) - Packet filtering and NAT
- [`nethogs`](/docs/commands/system-info/nethogs) - Network bandwidth monitoring per process

## Best Practices

1. **Use `-n` option** for faster output without DNS resolution
2. **Combine with `watch`** for real-time monitoring: `watch ss -tlpn`
3. **Filter by state** to focus on relevant connections: `ss -t state established`
4. **Use process information** (`-p`) for application-level troubleshooting
5. **Monitor memory usage** (`-m`) for performance analysis
6. **Use specific protocols** (`-t`, `-u`) to reduce output noise
7. **Employ filters** for precise socket selection and analysis
8. **Regular monitoring** of TIME_WAIT and CLOSE_WAIT connections
9. **Use `-s` for quick overviews** of socket statistics
10. **Combine with logging** for historical analysis and trend monitoring

## Performance Tips

1. **ss is faster than netstat** - always prefer ss for large systems
2. **Use `-n` to skip DNS resolution** for significantly faster execution
3. **Filter early** with specific options to reduce processing time
4. **Use state filtering** to focus on relevant connections only
5. **Monitor with `-E`** for real-time event tracking without overhead
6. **Combine options efficiently** - e.g., `ss -tlpn` instead of multiple calls
7. **Use specific protocols** to avoid unnecessary socket enumeration
8. **Monitor memory usage** on high-connection servers
9. **Use summary mode** (`-s`) for quick health checks
10. **Filter by process** when investigating application-specific issues

The `ss` command is an essential tool for modern Linux system administration, providing fast, detailed, and comprehensive socket information that surpasses the capabilities of traditional tools like `netstat`. Its rich filtering options, performance characteristics, and integration with modern kernel features make it indispensable for network diagnostics, security monitoring, and system performance analysis.