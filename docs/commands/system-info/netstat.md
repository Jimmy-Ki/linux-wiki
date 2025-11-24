---
title: netstat - Network Statistics
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# netstat - Network Statistics

The `netstat` command displays network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. It's a traditional network diagnostic tool that provides comprehensive information about the network subsystem.

## Basic Syntax

```bash
netstat [OPTIONS]
```

## Common Options

- `-a, --all` - Display all sockets (both listening and non-listening)
- `-l, --listening` - Show only listening sockets
- `-n, --numeric` - Display numeric addresses (don't resolve names)
- `-p, --programs` - Show PID/program name for each socket
- `-t, --tcp` - Display TCP connections
- `-u, --udp` - Display UDP connections
- `-w, --raw` - Display RAW connections
- `-x, --unix` - Display Unix domain sockets
- `-r, --route` - Display routing table
- `-i, --interfaces` - Display network interface statistics
- `-s, --statistics` - Display network statistics
- `-c, --continuous` - Continuously display network status (every second)
- `-e, --extend` - Display additional information
- `-v, --verbose` - Display verbose output
- `-o, --timers` - Display timer information
- `-g, --groups` - Display multicast group memberships
- `-M, --masquerade` - Display masqueraded connections

## Usage Examples

### Basic Connection Monitoring
```bash
# Display all active connections
netstat -a

# Show all TCP connections
netstat -at

# Show all UDP connections
netstat -au

# Display only listening sockets
netstat -l

# Show listening TCP sockets
netstat -lt

# Show listening UDP sockets
netstat -lu

# Show listening Unix sockets
netstat -lx
```

### Network Statistics
```bash
# Display summary statistics for all protocols
netstat -s

# Show TCP statistics only
netstat -st

# Show UDP statistics only
netstat -su

# Display interface statistics
netstat -i

# Show extended interface information
netstat -ie
```

### Process Information
```bash
# Show connections with PID/process names
netstat -p

# Show TCP connections with process info
netstat -pt

# Show all connections with process information
netstat -ap

# Find connections for a specific process
netstat -ap | grep ssh

# Find process listening on specific port
netstat -lntp | grep :8080
```

### Numeric Output
```bash
# Display all connections with numeric addresses
netstat -an

# Show TCP connections with numeric addresses
netstat -ant

# Show UDP connections with numeric addresses
netstat -anu

# Don't resolve service names
netstat -an --numeric-ports

# Don't resolve hostnames
netstat -an --numeric-hosts
```

### Routing Table
```bash
# Display routing table
netstat -r

# Show routing table with numeric addresses
netstat -rn

# Display kernel routing table
netstat -nr
```

### Continuous Monitoring
```bash
# Continuously display connections (every second)
netstat -c

# Continuously monitor TCP connections
netstat -ct

# Monitor specific port continuously
netstat -c | grep :80
```

## Practical Examples

### Server Administration
```bash
# Check what services are listening on the server
netstat -lntp

# Find all established connections
netstat -ant | grep ESTABLISHED

# Show connections to specific port
netstat -ant | grep :22

# Count connections by state
netstat -ant | awk '/^tcp/ {++state[$NF]} END {for(i in state) print i, state[i]}'

# Monitor for suspicious connections
netstat -antu | grep ':22\|:21\|:23\|:3389'

# Find connections from specific IP
netstat -ant | grep '192.168.1.100'

# Check for time-wait connections (potential performance issue)
netstat -ant | grep TIME_WAIT | wc -l
```

### Network Troubleshooting
```bash
# Check if service is listening
netstat -lntp | grep nginx

# Verify port accessibility
netstat -an | grep :8080

# Check interface statistics for errors
netstat -i

# Look for network interface problems
netstat -ie

# Monitor connection changes
watch 'netstat -ant | grep ESTABLISHED | wc -l'

# Check for UDP connections
netstat -anu | grep -v '^Active\|^Proto'

# Find process using specific port
netstat -lntp | grep :5432
```

### Security Monitoring
```bash
# Find all connections from external IPs
netstat -antu | grep -v '^Active\|^Proto\|127.0.0.1\|::1'

# Monitor connections to privileged ports
netstat -ant | grep -E ':(1|2|0)[0-9]{1,3}'

# Check for connections to known suspicious ports
netstat -antu | grep -E ':(4444|5555|6666|7777|8888|9999|31337|12345)'

# Show all established connections with process info
netstat -antp | grep ESTABLISHED

# Monitor for new connections
watch 'netstat -antu | grep ESTABLISHED'

# Find connections to remote admin ports
netstat -antu | grep -E ':(22|3389|5900)'
```

### Performance Analysis
```bash
# Count connections by state
netstat -an | awk '/^tcp/ {++state[$NF]} END {for(i in state) print i, state[i]}'

# Show top 10 IP addresses by connection count
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -10

# Find top connecting IPs to HTTP service
netstat -ntu | grep :80 | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -10

# Monitor connection queue lengths
netstat -lnt | awk '{print $1, $2, $4}'

# Check for SYN flood attacks
netstat -ant | grep SYN_RECV | wc -l

# Monitor TCP connection states over time
watch 'netstat -ant | awk "/^tcp/ {++s[\$NF]} END {for(a in s) print a, s[a]}"'
```

### Application Development
```bash
# Check if application is listening
netstat -lntp | grep :3000

# Find process ID for specific port
netstat -lntp | grep :8080 | awk '{print $7}' | cut -d/ -f1

# Monitor application connections
netstat -anp | grep 'java\|python\|node'

# Check database connections
netstat -ant | grep :5432

# Debug connection issues
netstat -an | grep -E '(8080|8443|3000)'

# Verify service binding
netstat -lntp | grep -E '(nginx|apache|httpd)'

# Monitor WebSocket connections
netstat -ant | grep -E ':(80|443|8080|8443)' | grep ESTABLISHED
```

## Advanced Usage

### Connection Filtering
```bash
# Filter by specific state
netstat -ant | grep ESTABLISHED
netstat -ant | grep TIME_WAIT
netstat -ant | grep CLOSE_WAIT

# Filter by port range
netstat -ant | grep -E ':(80|443|8080|8443)'

# Filter by IP address
netstat -ant | grep '192.168.1.'

# Combine multiple filters
netstat -ant | grep 'ESTABLISHED.*192.168.1'

# Show connections to specific service
netstat -antp | grep nginx

# Display connections sorted by port
netstat -ant | sort -k4

# Show unique destination IPs
netstat -ant | awk '{print $5}' | cut -d: -f1 | sort | uniq
```

### Output Parsing
```bash
# Extract just the local addresses
netstat -lnt | awk 'NR>2 {print $4}'

# Get process PIDs from connections
netstat -lntp | awk '{print $7}' | cut -d/ -f1

# Count connections per process
netstat -antp | awk '{print $7}' | sort | uniq -c | sort -nr

# Show connections without header/footer
netstat -ant | tail -n +3 | head -n -1

# Parse routing table for default gateway
netstat -rn | grep '^0.0.0.0'

# Extract interface names from statistics
netstat -i | awk 'NR>2 {print $1}'
```

### Integration with Other Tools
```bash
# Monitor with watch for real-time updates
watch 'netstat -ant | grep ESTABLISHED | wc -l'

# Pipe to grep for pattern matching
netstat -ant | grep -E ':(22|80|443)'

# Combine with awk for custom formatting
netstat -ant | awk '/^tcp/ {print $4, $5, $6}'

# Use with sort for connection analysis
netstat -ant | awk '{print $5}' | sort | uniq -c | sort -nr

# Filter with sed for clean output
netstat -i | sed 's/^ *//'

# Combine with xargs for batch operations
netstat -lntp | grep :80 | awk '{print $7}' | cut -d/ -f1 | xargs ps -p

# Redirect output to file for analysis
netstat -ant > connections_$(date +%Y%m%d_%H%M%S).txt
```

## TCP Connection States

The `netstat` command shows TCP connections in various states:

- **LISTEN** - Waiting for a connection request
- **SYN_SENT** - Actively trying to establish connection
- **SYN_RECV** - Connection request received, waiting for acknowledgment
- **ESTABLISHED** - Connection is established and data can be transferred
- **FIN_WAIT1** - Connection closed, waiting for termination acknowledgment
- **FIN_WAIT2** - Connection closed, waiting for termination request
- **TIME_WAIT** - Waiting for enough time to ensure remote termination
- **CLOSED** - Connection is completely closed
- **CLOSE_WAIT** - Remote end has closed, waiting for local application to close
- **LAST_ACK** - Waiting for acknowledgment of termination request
- **CLOSING** - Both sides have closed simultaneously
- **UNKNOWN** - State cannot be determined

## Related Commands

- [`ss`](/docs/commands/network-tools/ss) - Modern socket statistics utility
- [`ip`](/docs/commands/network-tools/ip) - Show/manipulate routing and devices
- [`lsof`](/docs/commands/system-monitoring/lsof) - List open files and network connections
- [`nmap`](/docs/commands/network-tools/nmap) - Network exploration and security auditing
- [`tcpdump`](/docs/commands/network-tools/tcpdump) - Network packet analyzer
- [`iftop`](/docs/commands/network-monitoring/iftop) - Display bandwidth usage
- [`nethogs`](/docs/commands/network-monitoring/nethogs) - Monitor network traffic per process

## Best Practices

1. **Use numeric output** (`-n`) for faster execution and to avoid DNS delays
2. **Combine with process information** (`-p`) to identify which applications are using connections
3. **Filter by protocol** (`-t`, `-u`) to focus on specific connection types
4. **Monitor continuously** (`-c`) for real-time connection tracking
5. **Use with grep** to filter for specific ports, IPs, or processes
6. **Combine with other tools** like `watch`, `awk`, and `sort` for advanced analysis
7. **Regular monitoring** of TIME_WAIT connections for performance optimization
8. **Security monitoring** of established connections for unusual activity
9. **Interface statistics** monitoring for network hardware issues
10. **Routing table** analysis for connectivity troubleshooting

The `netstat` command remains a valuable tool for network diagnostics and monitoring, though newer alternatives like `ss` offer improved performance for large numbers of connections.