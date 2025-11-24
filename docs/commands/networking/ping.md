---
title: ping - Test Network Connectivity
description: Test network connectivity between hosts using ICMP echo requests
sidebar_label: ping
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# ping - Test Network Connectivity

The `ping` command is a fundamental network diagnostic tool that tests connectivity between hosts on an IP network. It works by sending ICMP (Internet Control Message Protocol) echo request packets to the target host and waiting for ICMP echo replies.

## Syntax

```bash
ping [OPTIONS] destination
```

## Key Options

### Control Options
- `-c <count>` - Stop after sending `count` packets
- `-i <interval>` - Wait `interval` seconds between packets (default 1 second)
- `-w <deadline>` - Specify a timeout, in seconds, before ping exits regardless of how many packets have been sent or received
- `-W <timeout>` - Time to wait for a response, in seconds

### Packet Options
- `-s <size>` - Specify the number of data bytes to be sent
- `-p <pattern>` - Fill the packet with the specified pattern
- `-t <ttl>` - Set the IP Time to Live (TTL) value

### Display Options
- `-v` - Verbose output
- `-q` - Quiet output - only summary is displayed
- `-n` - Numeric output only - no DNS lookups

### Advanced Options
- `-f` - Flood ping - send packets as fast as they come back (requires root)
- `-I <interface>` - Set source interface
- `-R` - Record route
- `-l <preload>` - Send `preload` number of packets as fast as possible before falling into normal mode

## Usage Examples

### Basic Ping Test
```bash
# Ping a host continuously (stop with Ctrl+C)
ping google.com

# Ping with IPv4 specifically
ping -4 google.com

# Ping with IPv6 specifically
ping -6 google.com
```

### Limited Packet Count
```bash
# Send exactly 4 packets
ping -c 4 8.8.8.8

# Send 10 packets with custom interval
ping -c 10 -i 2 example.com
```

### Adjusting Packet Size
```bash
# Send larger packets (1500 bytes)
ping -s 1500 192.168.1.1

# Send small packets
ping -s 64 8.8.8.8
```

### Network Diagnostics
```bash
# Fast ping with short timeout
ping -c 1 -W 1 8.8.8.8

# Ping with no DNS resolution
ping -n 192.168.1.1

# Verbose mode for detailed information
ping -v example.com
```

### IPv6 Specific
```bash
# Ping IPv6 address
ping6 2001:db8::1

# Ping IPv6 with specific interface
ping -I eth0 2001:db8::1
```

## Understanding the Output

```
PING google.com (172.217.14.14) 56(84) bytes of data.
64 bytes from lhr34s01-in-f14.1e100.net (172.217.14.14): icmp_seq=1 ttl=116 time=12.3 ms
64 bytes from lhr34s01-in-f14.1e100.net (172.217.14.14): icmp_seq=2 ttl=116 time=11.8 ms
64 bytes from lhr34s01-in-f14.1e100.net (172.217.14.14): icmp_seq=3 ttl=116 time=12.1 ms
64 bytes from lhr34s01-in-f14.1e100.net (172.217.14.14): icmp_seq=4 ttl=116 time=11.9 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 11.822/12.048/12.347/0.198 ms
```

### Output Breakdown:
- **icmp_seq=X** - Sequence number of the packet
- **ttl=X** - Time To Live - how many hops the packet can make before being discarded
- **time=X ms** - Round-trip time in milliseconds
- **packet loss** - Percentage of packets that didn't receive a response
- **rtt min/avg/max/mdev** - Round-trip time statistics (minimum, average, maximum, mean deviation)

## Best Practices

### Network Testing
```bash
# Test basic connectivity
ping -c 4 8.8.8.8

# Test DNS resolution
ping -c 4 google.com

# Test local network
ping -c 4 192.168.1.1
```

### Troubleshooting
```bash
# Quick connectivity test with timeout
ping -c 1 -W 3 8.8.8.8

# Test MTU size
ping -M do -s 1472 8.8.8.8  # Standard MTU
ping -M do -s 8932 8.8.8.8  # Jumbo frames

# Flood ping for stress testing (requires root)
sudo ping -f 192.168.1.1
```

## Common Use Cases

1. **Basic Network Connectivity** - Verify if a host is reachable
2. **Latency Measurement** - Check network response times
3. **Packet Loss Detection** - Identify network reliability issues
4. **DNS Resolution Testing** - Verify DNS is working
5. **Network Troubleshooting** - Isolate connectivity problems
6. **Performance Monitoring** - Track network quality over time

## Tips and Notes

- Most modern systems limit ping to prevent abuse. Use `-c` to limit packets
- Some networks block ICMP packets, which affects ping
- For continuous monitoring, use tools like `mtr` or `watch ping 8.8.8.8`
- High TTL values may indicate longer routes or distance
- Consistent latency suggests stable networks; variable latency suggests congestion

## Related Commands

- [`traceroute`](/docs/commands/networking/traceroute) - Trace network path to destination
- [`mtr`](/docs/commands/networking/mtr) - Network diagnostic tool combining ping and traceroute
- [`ss`](/docs/commands/networking/ss) - Socket statistics utility
- [`netstat`](/docs/commands/networking/netstat) - Network connections monitoring
- [`nslookup`](/docs/commands/networking/nslookup) - DNS query tool

The `ping` command remains one of the most essential tools for network administrators and users to diagnose network connectivity issues.