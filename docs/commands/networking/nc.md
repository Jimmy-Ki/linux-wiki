---
title: nc - Netcat Network Utility
sidebar_label: nc
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# nc - Netcat Network Utility

The `nc` command (netcat) is a versatile networking utility that reads and writes data across network connections using TCP or UDP protocols. Often referred to as the "Swiss Army knife" of networking tools, netcat can function as a client, server, port scanner, file transfer utility, and more. It provides simple yet powerful capabilities for network debugging, exploration, and data transfer, making it an essential tool for system administrators, network engineers, and security professionals.

## Basic Syntax

```bash
nc [OPTIONS] HOSTNAME PORT
nc -l [OPTIONS] [HOSTNAME] PORT
```

## Common Options

### Connection Options
- `-l` - Listen mode (act as server)
- `-p PORT` - Local port number (for client mode)
- `-s SOURCE` - Local source address
- `-w SECONDS` - Connection timeout
- `-i SECONDS` - Delay interval between lines/ports
- `-r` - Randomize local and remote ports
- `-n` - DNS resolution skip (numeric-only)

### Protocol Options
- `-u` - UDP mode instead of TCP
- `-t` - Telnet negotiation
- `-T TOS` - Set IP Type of Service
- `-M TTL` - Set IP Time To Live

### Data Transfer Options
- `-o FILE` - Save hex dump to file
- `-x HOST:PORT` - Specify proxy address and port
- `-X PROTOCOL` - Proxy protocol (4, 5, socks)
- `-c STRING` - Execute shell command after connection

### Scanning Options
- `-v` - Verbose output
- `-z` - Zero I/O mode (port scanning)
- `-r` - Randomize ports
- `-w TIMEOUT` - Connection timeout

### File and Stream Options
- `-q SECONDS` - Quit after EOF on stdin and delay
- `-k` - Keep listening after client disconnects
- `-C` - Send CRLF instead of LF

## Usage Examples

### Basic Network Connections

#### Client Connections
```bash
# Connect to a web server
nc google.com 80

# Connect with timeout
nc -w 5 example.com 80

# Connect from specific source port
nc -p 8080 server.example.com 22

# Use specific source address
nc -s 192.168.1.100 remote.host 80

# Connect with verbose output
nc -v example.com 22
```

#### Server Mode
```bash
# Simple TCP server
nc -l 8080

# Server on specific interface
nc -l 192.168.1.100 8080

# UDP server
nc -l -u 8080

# Server that stays listening after client disconnect
nc -l -k 8080

# Server with connection timeout
nc -l -w 10 8080
```

### Port Scanning

#### Basic Port Scanning
```bash
# Scan single port
nc -zv example.com 80

# Scan multiple ports
nc -zv example.com 22 80 443 8080

# Scan port range
nc -zv example.com 1-1024

# Scan with timeout
nc -zv -w 1 example.com 80

# UDP port scanning
nc -zvu example.com 53

# Random port scanning
nc -zvr example.com 1-1000
```

#### Advanced Scanning
```bash
# Scan with verbose output and timing
nc -zvw 1 target.host 1-1000

# Scan specific services
for port in 21 22 23 25 53 80 110 143 443 993 995; do
    nc -zv target.host $port
done

# Scan with delays
nc -zv -i 0.1 target.host 1-1000
```

### File Transfer

#### Simple File Transfer
```bash
# Send file (receiver)
nc -l 8080 > received_file.txt

# Send file (sender)
nc receiver.host 8080 < file_to_send.txt

# Send with progress monitoring (using pv)
pv file_to_send.txt | nc receiver.host 8080

# Receive with progress monitoring
nc -l 8080 | pv > received_file.txt
```

#### Directory Transfer
```bash
# Send directory (sender)
tar -czf - /path/to/directory | nc receiver.host 8080

# Receive directory (receiver)
nc -l 8080 | tar -xzf -

# Send with compression and progress
tar -czf - directory/ | pv | nc receiver.host 8080

# Create compressed archive on the fly
tar -czf - -C /path/to/backup . | nc -l 8080
```

#### Large File Transfer
```bash
# Send large file with resumption capability
split -b 100M large_file.iso part_
for part in part_*; do
    nc receiver.host 8080 < $part
    echo "Sent $part"
done

# Send using rsync-like approach with checksums
md5sum large_file.txt
nc receiver.host 8080 < large_file.txt
```

### Chat and Communication

#### Simple Chat Server
```bash
# Server
nc -l 8080

# Client
nc server.host 8080

# Two-way chat with named pipes
mkfifo fifo
nc -l 8080 < fifo | tee log.txt > fifo
```

#### Broadcast Message
```bash
# Send message to multiple hosts
for host in host1 host2 host3; do
    echo "System maintenance in 10 minutes" | nc $host 8080
done

# Broadcast with confirmation
for host in $(cat hosts.txt); do
    if echo "Message" | nc -w 1 $host 8080; then
        echo "Sent to $host successfully"
    else
        echo "Failed to send to $host"
    fi
done
```

### Proxy and Tunneling

#### Simple Proxy
```bash
# Create simple TCP proxy
mkfifo pipe
nc -l 8080 0<pipe | nc remote.host 80 1>pipe

# Port forwarding
nc -l -p 8080 -c "nc internal.server 80"

# SOCKS proxy usage
nc -X 5 -x proxy.server:1080 target.host 80
```

#### HTTP Proxy
```bash
# Simple HTTP proxy
while true; do
    nc -l 8080 -c '
        read request
        host=$(echo "$request" | cut -d" " -f2 | cut -d"/" -f3)
        nc "$host" 80
    '
done
```

## Practical Examples

### System Administration

#### Network Service Testing
```bash
# Test web server connectivity
echo "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80

# Test mail server
nc -v mail.server 25
EHLO test.domain.com
QUIT

# Test DNS resolution
echo "example.com" | nc dns.server 53

# Test SSH connectivity
timeout 5 nc -z target.host 22 && echo "SSH is up" || echo "SSH is down"
```

#### Service Health Monitoring
```bash
# Monitor multiple services
while true; do
    echo "$(date): Checking services..."
    for service in web:80 ssh:22 mail:25; do
        host=$(echo $service | cut -d: -f1)
        port=$(echo $service | cut -d: -f2)
        if nc -z -w 3 $host $port; then
            echo "✓ $host:$port is up"
        else
            echo "✗ $host:$port is down"
        fi
    done
    sleep 60
done

# Service availability script
check_service() {
    local host=$1
    local port=$2
    local service=$3

    if nc -z -w 5 "$host" "$port"; then
        echo "OK: $service on $host:$port is responding"
        return 0
    else
        echo "CRITICAL: $service on $host:$port is not responding"
        return 1
    fi
}
```

#### Log Collection
```bash
# Centralized log collector
nc -l -k 514 | while read line; do
    echo "$(date): $line" >> /var/log/remote_logs.log
done

# Send logs to collector
tail -f /var/log/app.log | nc log-server 514
```

### Security Testing

#### Port Security Assessment
```bash
# Scan for open ports
echo "Scanning target..."
nc -zvw 1 target.host 1-65535 2>&1 | grep succeeded

# Check for vulnerable services
vulnerable_ports="23 135 139 445 1433 3389"
for port in $vulnerable_ports; do
    if nc -zv target.host "$port" 2>&1 | grep -q succeeded; then
        echo "WARNING: Port $port is open"
    fi
done

# Test for banner grabbing
for port in 21 22 23 25 53 80 110 143 443; do
    echo "Banner for port $port:"
    timeout 3 nc target.host "$port" 2>/dev/null || echo "Connection failed"
    echo "---"
done
```

#### Firewall Testing
```bash
# Test firewall rules
test_firewall() {
    local target=$1
    local port=$2

    echo "Testing $target:$port"
    if nc -z -w 3 "$target" "$port"; then
        echo "ALLOWED: Connection successful"
    else
        echo "BLOCKED: Connection failed"
    fi
}

# Test outbound connectivity
for port in 80 443 53; do
    test_firewall google.com $port
done
```

### Development and Testing

#### Web Server Testing
```bash
# HTTP request testing
cat << EOF | nc example.com 80
GET / HTTP/1.1
Host: example.com
User-Agent: netcat-test/1.0
Connection: close

EOF

# POST request testing
cat << EOF | nc api.example.com 80
POST /api/data HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 27

{"test": "data"}EOF
```

#### API Testing
```bash
# Simple REST API client
api_request() {
    local method=$1
    local url=$2
    local data=$3

    host=$(echo "$url" | sed 's|http[s]*://||' | cut -d/ -f1)
    path=$(echo "$url" | sed 's|http[s]*://[^/]*/||')

    if [ "$method" = "GET" ]; then
        cat << EOF | nc "$host" 80
GET /$path HTTP/1.1
Host: $host
Connection: close

EOF
    fi
}

# Test API endpoints
api_request "GET" "api.example.com/users"
api_request "GET" "api.example.com/status"
```

## Advanced Usage

### Network Performance Testing

#### Bandwidth Testing
```bash
# Server (receiver)
nc -l 8080 > /dev/null

# Client (sender)
dd if=/dev/zero bs=1M count=100 | nc receiver.host 8080

# UDP throughput test
dd if=/dev/zero bs=1M count=100 | nc -u receiver.host 8080

# Network latency measurement
time nc -z target.host 80
```

#### Connection Stress Testing
```bash
# Concurrent connection test
for i in {1..100}; do
    nc -z target.host 80 &
done
wait

# Persistent connection test
while true; do
    nc target.host 80 < /dev/null
    sleep 1
done
```

### Data Processing and Streaming

#### Real-time Data Streaming
```bash
# Stream audio data
arecord -f cd | nc -u receiver.host 8080

# Receive and play audio
nc -l -u 8080 | aplay

# Stream video data
ffmpeg -i input.mp4 -f avi - | nc receiver.host 8080

# Screen sharing
ffmpeg -f x11grab -s 1920x1080 -i :0.0 -f avi - | nc receiver.host 8080
```

#### Data Transformation Pipeline
```bash
# Compress and transfer
gzip -c large_file.log | nc receiver.host 8080

# Receive and decompress
nc -l 8080 | gunzip -c > recovered_file.log

# Encrypt and transfer
openssl aes-256-cbc -salt -in file.txt | nc receiver.host 8080

# Receive and decrypt
nc -l 8080 | openssl aes-256-cbc -d -out decrypted_file.txt
```

### Automation and Scripting

#### Automated Network Tests
```bash
#!/bin/bash
# Network connectivity test script

HOSTS="google.com github.com stackoverflow.com"
PORTS="80 443"

for host in $HOSTS; do
    echo "Testing $host:"
    for port in $PORTS; do
        if nc -z -w 3 "$host" "$port" 2>/dev/null; then
            echo "  ✓ Port $port: Open"
        else
            echo "  ✗ Port $port: Closed"
        fi
    done
done
```

#### Backup Automation
```bash
#!/bin/bash
# Automated backup with netcat

SOURCE_DIR="/home/user/documents"
BACKUP_HOST="backup.server"
BACKUP_PORT="8080"

# Create compressed backup and send
tar -czf - "$SOURCE_DIR" | nc "$BACKUP_HOST" "$BACKUP_PORT"

# Verify transfer
if [ $? -eq 0 ]; then
    echo "Backup sent successfully"
else
    echo "Backup failed"
fi
```

## Integration and Automation

### Shell Scripts

#### Network Discovery Script
```bash
#!/bin/bash
# Network discovery using netcat

NETWORK="192.168.1."
COMMON_PORTS="22 23 53 80 135 139 443 445 8080"

echo "Scanning network $NETWORK.0/24"

for host in $(seq 1 254); do
    ip="${NETWORK}$host"
    echo -n "Scanning $ip... "

    if ping -c 1 -W 1 "$ip" >/dev/null 2>&1; then
        echo "Host is up"
        for port in $COMMON_PORTS; do
            if nc -z -w 1 "$ip" "$port" 2>/dev/null; then
                echo "  Open port: $port"
            fi
        done
    else
        echo "Host is down"
    fi
done
```

#### Port Monitoring Service
```bash
#!/bin/bash
# Service monitoring daemon

SERVICES=(
    "web.example.com:80:HTTP"
    "mail.example.com:25:SMTP"
    "db.example.com:3306:MySQL"
)

LOG_FILE="/var/log/port_monitor.log"

while true; do
    for service in "${SERVICES[@]}"; do
        IFS=':' read -r host port name <<< "$service"

        if nc -z -w 5 "$host" "$port"; then
            echo "$(date): OK - $name on $host:$port" >> "$LOG_FILE"
        else
            echo "$(date): CRITICAL - $name on $host:$port is DOWN" >> "$LOG_FILE"
            # Send alert (email, SMS, etc.)
        fi
    done

    sleep 300  # Check every 5 minutes
done
```

## Troubleshooting

### Common Issues

#### Connection Problems
```bash
# Debug connection issues
nc -v -v target.host 80

# Test with different timeouts
nc -w 1 target.host 80
nc -w 5 target.host 80
nc -w 10 target.host 80

# Test both TCP and UDP
nc -v target.host 80    # TCP
nc -vu target.host 53   # UDP

# Check if port is actually open
netstat -tlnp | grep :80
ss -tlnp | grep :80
```

#### Permission Issues
```bash
# Run with sudo for privileged ports
sudo nc -l 80

# Use non-privileged ports for testing
nc -l 8080

# Check firewall status
sudo iptables -L
sudo ufw status
```

#### Performance Issues
```bash
# Test network bandwidth
dd if=/dev/zero bs=1M count=100 | nc receiver.host 8080

# Monitor transfer progress
pv large_file.iso | nc receiver.host 8080

# Test with different buffer sizes
dd if=/dev/zero bs=1024 count=10240 | nc receiver.host 8080
dd if=/dev/zero bs=1048576 count=10 | nc receiver.host 8080
```

## Related Commands

- [`telnet`](/docs/commands/networking/telnet) - Interactive network communication
- [`curl`](/docs/commands/networking/curl) - Transfer data with URLs
- [`wget`](/docs/commands/networking/wget) - Network file retriever
- [`nmap`](/docs/commands/networking/nmap) - Network exploration tool
- [`netstat`](/docs/commands/system-info/netstat) - Network statistics
- [`ss`](/docs/commands/system-info/ss) - Socket statistics
- [`socat`](/docs/commands/other/socat) - Data transfer between addresses
- [`tcpdump`](/docs/commands/networking/tcpdump) - Network packet analyzer

## Best Practices

1. **Always use timeouts** (-w option) to prevent hanging connections
2. **Combine with pv** for progress monitoring on large file transfers
3. **Use compression** (gzip, bzip2) for faster transfers over slow networks
4. **Test with -z flag** for quick port availability checks
5. **Use -v flag** for debugging and verbose output
6. **Implement authentication** when using netcat for sensitive data transfers
7. **Use encryption** (openssl, ssh) for secure data transmission
8. **Monitor system resources** during large transfers
9. **Clean up background processes** when using netcat in scripts
10. **Document your netcat scripts** with clear usage instructions

## Performance Tips

1. **UDP mode** (-u) is faster for unreliable data transfer
2. **Zero I/O mode** (-z) for quick port scanning
3. **Buffer size optimization** can improve transfer speeds
4. **Parallel transfers** for large files using split and multiple connections
5. **Compression** reduces transfer time for text files
6. **Use appropriate timeouts** to balance responsiveness and reliability
7. **Monitor network utilization** to optimize transfer parameters
8. **Consider TCP window scaling** for high-bandwidth transfers
9. **Use pipe buffering** for smooth streaming operations
10. **Implement retry logic** for unreliable networks

The `nc` command is an incredibly versatile networking tool that provides fundamental building blocks for network communication. Its simplicity and power make it invaluable for network diagnostics, file transfers, service testing, and rapid prototyping of network applications. Mastering netcat opens up countless possibilities for network administration and development tasks.