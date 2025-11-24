---
title: ss - Socket Statistics
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ss - Socket Statistics

The `ss` command is a modern replacement for `netstat` that displays socket statistics and provides detailed information about network connections. It's part of the iproute2 package and offers significantly better performance, especially on systems with large numbers of connections.

## Basic Syntax

```bash
ss [OPTIONS] [FILTER]
```

## Common Options

### Display Options
- `-a, --all` - Display all sockets
- `-l, --listening` - Display only listening sockets
- `-n, --numeric` - Don't resolve service names (numeric output)
- `-r, --resolve` - Resolve hostnames
- `-b, --bpf` - Show BPF filter code

### Socket Types
- `-t, --tcp` - Display TCP sockets
- `-u, --udp` - Display UDP sockets
- `-w, --raw` - Display RAW sockets
- `-x, --unix` - Display UNIX domain sockets
- `-d, --dccp` - Display DCCP sockets
- `--vsock` - Display vsock sockets

### Information Options
- `-p, --processes` - Show process using socket
- `-e, --extended` - Show detailed socket information
- `-m, --memory` - Show socket memory usage
- `-o, --options` - Show timer information
- `-i, --info` - Show internal TCP information
- `-s, --summary` - Show socket usage summary

### Protocol Versions
- `-4, --ipv4` - Display only IPv4 sockets
- `-6, --ipv6` - Display only IPv6 sockets
- `-0, --packet` - Display PACKET sockets

### State and Filtering
- `state STATE` - Filter by socket state
- `dst ADDRESS_PATTERN` - Filter by destination address
- `src ADDRESS_PATTERN` - Filter by source address
- `dport OP PORT` - Filter by destination port
- `sport OP PORT` - Filter by source port

### Other Options
- `-h, --help` - Display help information
- `-V, --version` - Display version information
- `-D, --diag=FILE` - Dump raw information to file
- `-F, --filter=FILE` - Read filter information from file

## Usage Examples

### Basic Socket Display
```bash
# Display all TCP connections
ss -t

# Show all UDP connections
ss -u

# Display all sockets
ss -a

# Show only listening sockets
ss -l

# Display all listening TCP sockets
ss -lt

# Show all listening UDP sockets
ss -lu

# Display all UNIX sockets
ss -x

# Show numeric output (faster)
ss -n
```

### Process Information
```bash
# Show sockets with process information
ss -p

# Show listening sockets with processes
ss -lp

# Find which process is using port 80
ss -ltp | grep :80

# Show all sockets with process info
ss -ap

# Find all connections from specific process
ss -ap | grep nginx
```

### Socket States
```bash
# Show established connections
ss state established

# Show connections in specific states
ss state time-wait
ss state fin-wait-1
ss state close-wait

# Show all TCP states
ss -tan | awk 'NR>1{++S[$1]}END{for(a in S) print a,S[a]}'

# Show connected sockets (all states except listen/closed)
ss state connected
```

### Address and Port Filtering
```bash
# Filter by destination address
ss dst 192.168.1.100

# Filter by source address
ss src 10.0.0.1

# Filter by destination port
ss dport = :80
ss dport = :443

# Filter by source port
ss sport = :22
ss sport = :8080

# Multiple port filters
ss sport = :80 or sport = :443

# Port range filtering
ss dport \> :1024
ss dport \< :5000

# Port comparison
ss sport >= :1024
ss sport <= :5000
```

### Network Statistics
```bash
# Show socket summary
ss -s

# Display TCP information
ss -ti

# Show memory usage
ss -m

# Display extended information
ss -e

# Show timer information
ss -o

# Display internal TCP information
ss -i
```

## Practical Examples

### Server Administration
```bash
# Check what services are listening
ss -lntp

# Monitor established connections
ss -ant state established

# Find connections to specific service
ss -anp | grep :3306

# Count connections by state
ss -an | awk '/^tcp/ {++state[$1]} END {for(i in state) print i, state[i]}'

# Find processes listening on privileged ports
ss -lntp | awk '$4 ~ /:(1[0-9]{1,3}|2[0-9]{3}|3[0-9]{3}|4[0-9]{3}|5[0-9]{3}|6[0-4][0-9]{2}|65[0-4][0-9]|655[0-2][0-9]|6553[0-6])/'

# Monitor connection changes
watch 'ss -an state established | wc -l'

# Check for time-wait connections
ss -an state time-wait | wc -l

# Show connections by interface
ss -ie
```

### Performance Monitoring
```bash
# Get quick socket summary
ss -s

# Monitor TCP connection states
ss -tan state all

# Find top connected IPs
ss -nt | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -10

# Check for SYN flood
ss -an state syn-recv | wc -l

# Monitor socket memory usage
ss -m

# Find processes with most connections
ss -p | awk '/users:/ {print $6}' | sort | uniq -c | sort -nr | head -10

# Show large receive queues
ss -lnt | awk '$2 > 0'

# Monitor connection queue lengths
watch 'ss -lnt | head -10'
```

### Network Troubleshooting
```bash
# Check if service is listening
ss -lntp | grep :8080

# Find connections from problematic IP
ss -an | grep '192.168.1.100'

# Check for ports in use
ss -lnt | grep ':'

# Verify TCP connection to specific port
ss -an | grep :22

# Check UDP socket usage
ss -unlp

# Find orphaned connections
ss -an state fin-wait-2

# Check for half-open connections
ss -an state syn-recv

# Monitor connection establishment
watch 'ss -an state syn-sent'
```

### Security Analysis
```bash
# Find all external connections
ss -an | grep -v '^State\|127.0.0.1\|::1\|0.0.0.0'

# Monitor connections to admin ports
ss -an | grep -E ':(22|23|3389|5900)'

# Check for suspicious port usage
ss -an | grep -E ':(4444|5555|6666|7777|8888|9999|31337|12345)'

# Monitor established connections
ss -an state established

# Find connections to unknown IPs
ss -an | awk '$5 !~ /^(127\.|::1|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/'

# Check for connections from/to unusual ports
ss -an | awk '$4 ~ /:[0-9]{5}/ || $5 ~ /:[0-9]{5}/'

# Monitor process network activity
ss -p | grep 'sshd\|bash\|sh'
```

### Application Debugging
```bash
# Find application port usage
ss -lntp | grep java

# Monitor application connections
ss -anp | grep nginx

# Check WebSocket connections
ss -an | grep -E ':(80|443)' | grep ESTAB

# Find database connections
ss -an | grep :5432

# Monitor HTTP connections
ss -an | grep -E ':(80|8080|3000)'

# Check local service bindings
ss -ln | grep '127.0.0.1\|::1'

# Debug connection issues
ss -an | grep -E ':(8080|8443|3000)'

# Find connection timeouts
ss -an state time-wait | wc -l
```

## Advanced Filtering

### State Filtering
```bash
# Show multiple states
ss state '(established || syn-sent)'

# Filter out specific states
ss state '!time-wait'

# Complex state filters
ss state '(fin-wait-1 || fin-wait-2 || time-wait)'

# Show synchronized states
ss state synchronized

# Show bucket states (minisockets)
ss state bucket

# Show big states
ss state big
```

### Address and Port Filtering
```bash
# Complex port filters
ss '( dport = :http or dport = :https )'

# Address and port combinations
ss dst 192.168.1.100 dport = :80

# Multiple source ports
ss '( sport = :22 or sport = :8080 )'

# CIDR notation
ss dst 192.168.1.0/24

# Port ranges with operators
ss dport \>= :1024
ss sport \< :5000

# Exclude specific ports
ss dport != :22

# Complex filters
ss state established '( dport = :80 or dport = :443 )'
```

### Process Filtering
```bash
# Filter by process name
ss -ap | grep nginx

# Show sockets for specific PID
ss -p | grep 'pid=1234'

# Find processes using specific ports
ss -ltp | grep -E ':(80|443|8080)'

# Monitor process connections
ss -p | grep 'java\|python\|node'

# Show all processes with network connections
ss -ap | grep users:
```

### Performance and Optimization
```bash
# Quick summary
ss -s

# Fast connection counting
ss -an | wc -l

# Memory usage analysis
ss -m

# Timer analysis
ss -o

# Internal TCP information
ss -i

# Performance comparison
time ss -an
time netstat -an
```

## Socket States

### TCP States
- **established** - Connection established
- **syn-sent** - SYN sent, waiting for ACK
- **syn-recv** - SYN received, waiting for ACK
- **fin-wait-1** - FIN sent, waiting for ACK
- **fin-wait-2** - FIN acknowledged, waiting for FIN
- **time-wait** - Connection closed, waiting for timeout
- **close** - Connection closed
- **close-wait** - Remote closed, waiting for local close
- **last-ack** - Local closed, waiting for final ACK
- **listen** - Listening for incoming connections
- **closing** - Both sides closing simultaneously

### Special States
- **connected** - All states except listen and closed
- **synchronized** - Connected states except syn-sent
- **bucket** - Mini-sockets (time-wait, syn-recv)
- **big** - Regular sockets
- **all** - All possible states

## Integration Examples

### with Other Commands
```bash
# Monitor with watch
watch 'ss -ant state established | wc -l'

# Combine with grep for filtering
ss -ant | grep ESTABLISHED

# Pipe to awk for analysis
ss -ant | awk '{print $5}' | sort | uniq -c | sort -nr

# Use with xargs for operations
ss -lntp | grep :80 | awk '{print $7}' | cut -d, -f2 | cut -d= -f2 | xargs ps -p

# Redirect to file
ss -an > ss_output_$(date +%Y%m%d_%H%M%S).txt

# Count by port
ss -ant | awk '{print $4}' | cut -d: -f2 | sort | uniq -c | sort -nr
```

### Script Integration
```bash
#!/bin/bash
# Monitor high connection counts

while true; do
    count=$(ss -ant state established | wc -l)
    if [ $count -gt 1000 ]; then
        echo "High connection count: $count"
        ss -ant state established | head -20
    fi
    sleep 30
done
```

## Comparison with netstat

### Advantages of ss:
- **Faster execution**, especially with many connections
- **More filtering options**
- **Better performance** on busy systems
- **More detailed socket information**
- **Modern design** as part of iproute2

### When to use:
- **ss**: Modern systems, performance-critical monitoring
- **netstat**: Legacy systems, familiarity, quick checks

## Related Commands

- [`netstat`](/docs/commands/network-tools/netstat) - Traditional network statistics
- [`ip`](/docs/commands/network-tools/ip) - Show/manipulate routing and devices
- [`lsof`](/docs/commands/system-monitoring/lsof) - List open files and network connections
- [`nmap`](/docs/commands/network-tools/nmap) - Network exploration and security auditing
- [`tcpdump`](/docs/commands/network-tools/tcpdump) - Network packet analyzer
- [`iftop`](/docs/commands/network-monitoring/iftop) - Display bandwidth usage

## Best Practices

1. **Use numeric output** (`-n`) for faster execution
2. **Filter by state** to focus on relevant connections
3. **Combine with process info** (`-p`) for application debugging
4. **Use specific protocol flags** (`-t`, `-u`) to reduce output
5. **Employ advanced filtering** for complex queries
6. **Monitor socket summary** (`-s`) for quick overviews
7. **Use watch** for continuous monitoring
8. **Filter by port** when debugging specific services
9. **Check memory usage** (`-m`) for performance analysis
10. **Utilize state filtering** for connection lifecycle tracking

The `ss` command is the preferred tool for modern Linux network monitoring, offering superior performance and functionality compared to traditional alternatives.