---
title: tcpreplay - Replay Captured Network Traffic
sidebar_label: tcpreplay
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# tcpreplay - Replay Captured Network Traffic

The `tcpreplay` command is a powerful network testing tool that replays captured network traffic from pcap files onto a live network. It allows network administrators, security professionals, and developers to reproduce network conditions, test network devices, and analyze network behavior under controlled conditions. Tcpreplay supports various replay modes, packet manipulation, timing control, and performance optimization features, making it an essential tool for network testing, security audits, and performance analysis.

## Basic Syntax

```bash
tcpreplay [OPTIONS] [-t|-T|-i|-p|-l] <pcap_file(s)>
```

## Main Replay Modes

- `-i <interface>` - Replay packets on specified interface (default)
- `-t` - Replay in top-to-bottom order (no timing)
- `-T` - Replay using timestamps from capture file
- `-l <loop_count>` - Loop replay N times
- `-p` - Replay packets in a precise timing mode
- `--dualfile` - Replay two pcap files simultaneously

## Common Options

### Interface Selection
- `-i <interface>` - Specify output interface
- `--list-nics` - List available network interfaces
- `--intf1 <interface>` - First interface for dual replay
- `--intf2 <interface>` - Second interface for dual replay

### Timing and Speed Control
- `-M <mbps>` - Set replay speed in Mbps
- `-p` - Precise packet timing mode
- `-t` - Top-to-bottom replay (no timing)
- `-T` - Replay using original timestamps
- `-u <multiplier>` - Speed up replay by factor
- `--pps <packets_per_sec>` - Set packets per second
- `--pps-multiplier <factor>` - Multiply original PPS
- `--mbps <mbps>` - Set speed in Mbps
- `--oneatatime` - Send one packet at a time
- `--sleep-accel <factor>` - Acceleration factor for sleep

### Packet Processing
- `-c <cache_size>` - Set packet cache size
- `-P` - Don't send packets to server (client mode)
- `-S` - Don't send packets to client (server mode)
- `--preload-pcap` - Preload pcap file into memory
- `--quiet` - Suppress output
- `--stats` - Print detailed statistics
- `--timer` - Display timing information

### File Handling
- `-L <limit>` - Limit number of packets to send
- `-x <skip>` - Skip N packets from start
- `-k <keep>` - Keep N packets from end
- `--loop <count>` - Loop replay N times
- `--loopdelay-ms <ms>` - Delay between loops
- `-- unique-ip` - Rewrite source IP addresses
- `--unique-ip6` - Rewrite source IPv6 addresses

### Advanced Options
- `--pps-multiplier <factor>` - Multiply packet rate
- `--duration <seconds>` - Limit replay duration
- `--limit` - Limit total number of packets
- `--skip` - Skip first N packets
- `--end-after <packets>` - Stop after N packets
- `--timeout <seconds>` - Set send timeout
- `--noskip` - Don't skip packets with errors
- `--debug <level>` - Set debug level (0-5)

## Usage Examples

### Basic Replay Operations

#### Simple Packet Replay
```bash
# Replay packets on default interface
tcpreplay capture.pcap

# Replay on specific interface
tcpreplay -i eth0 capture.pcap

# List available interfaces
tcpreplay --list-nics

# Replay with verbose output
tcpreplay -v -i eth0 capture.pcap
```

#### Speed and Timing Control
```bash
# Replay at specific speed (10 Mbps)
tcpreplay -M 10 -i eth0 capture.pcap

# Replay using original timing
tcpreplay -T -i eth0 capture.pcap

# Fast replay without timing (top-to-bottom)
tcpreplay -t -i eth0 capture.pcap

# Double speed replay
tcpreplay -u 2 -i eth0 capture.pcap

# Replay at 1000 packets per second
tcpreplay --pps 1000 -i eth0 capture.pcap
```

### Advanced Replay Scenarios

#### Looping and Repetition
```bash
# Loop replay 5 times
tcpreplay -l 5 -i eth0 capture.pcap

# Infinite loop with delay
tcpreplay --loop 0 --loopdelay-ms 1000 -i eth0 capture.pcap

# Replay specific packet range
tcpreplay -x 1000 -L 5000 -i eth0 capture.pcap

# Keep only last 1000 packets
tcpreplay -k 1000 -i eth0 capture.pcap
```

#### Dual Interface Replay
```bash
# Replay two files on different interfaces
tcpreplay --dualfile --intf1 eth0 --intf1 eth1 client.pcap server.pcap

# Split traffic between client and server
tcpreplay -i eth0 -P client_traffic.pcap
tcpreplay -i eth1 -S server_traffic.pcap
```

## Practical Examples

### Network Testing

#### Load Testing
```bash
# High-speed replay for load testing
tcpreplay -M 1000 -i eth0 high_traffic.pcap

# Sustained load testing with loops
tcpreplay -l 100 --loopdelay-ms 100 -i eth0 load_test.pcap

# Replay with statistics
tcpreplay --stats -M 500 -i eth0 performance_test.pcap
```

#### Network Device Testing
```bash
# Test firewall rules
tcpreplay -i eth0 -M 100 firewall_test.pcap

# Test IDS/IPS signatures
tcpreplay -i eth0 -T attack_signatures.pcap

# Test load balancer distribution
tcpreplay --dualfile --intf1 eth0 --intf2 eth1 lb_test_client.pcap lb_test_server.pcap
```

### Security and Forensics

#### Malware Analysis
```bash
# Replay malware traffic in sandbox
tcpreplay -i eth0 --pps 100 malware_traffic.pcap

# Analyze C2 communication patterns
tcpreplay -T -i eth0 c2_traffic.pcap

# Replay attack scenarios
tcpreplay -i eth0 -M 50 attack_scenario.pcap
```

#### Network Forensics
```bash
# Reconstruct incident timeline
tcpreplay -T -i eth0 incident_traffic.pcap

# Test network intrusion detection
tcpreplay -i eth0 intrusion_attempt.pcap

# Validate network logs
tcpreplay -i eth0 --stats -T log_validation.pcap
```

### Application Testing

#### Web Application Testing
```bash
# Replay HTTP traffic
tcpreplay -i eth0 -M 10 http_traffic.pcap

# Test CDN performance
tcpreplay -i eth0 -u 5 cdn_test.pcap

# Load test web servers
tcpreplay -l 50 -i eth0 --pps 1000 web_load.pcap
```

#### Database Performance Testing
```bash
# Test database connection handling
tcpreplay -i eth0 --pps 500 db_connections.pcap

# Replay query patterns
tcpreplay -T -i eth0 db_queries.pcap

# Stress test database cluster
tcpreplay -M 100 -i eth0 db_stress.pcap
```

## Advanced Usage

### Packet Manipulation

#### IP Address Rewrite
```bash
# Rewrite source IP addresses
tcpreplay --unique-ip -i eth0 capture.pcap

# Rewrite IPv6 addresses
tcpreplay --unique-ip6 -i eth0 ipv6_capture.pcap

# Custom IP mapping (requires tcprewrite)
tcprewrite --srcipmap=0.0.0.0/0:192.168.1.100 -o new_capture.pcap capture.pcap
tcpreplay -i eth0 new_capture.pcap
```

#### Traffic Filtering and Selection
```bash
# Replay specific protocols only
tcpdump -r capture.pcap -w tcp_only.pcap 'tcp'
tcpreplay -i eth0 tcp_only.pcap

# Replay specific port traffic
tcpdump -r capture.pcap -w port80.pcap 'port 80'
tcpreplay -i eth0 port80.pcap

# Replay specific time range
tcpdump -r capture.pcap -w time_range.pcap -t 't > 1000000 and t < 2000000'
tcpreplay -T -i eth0 time_range.pcap
```

### Performance Optimization

#### Memory and Caching
```bash
# Preload pcap into memory
tcpreplay --preload-pcap -i eth0 large_capture.pcap

# Optimize packet cache size
tcpreplay -c 1000000 -i eth0 high_volume.pcap

# Disable statistics for maximum speed
tcpreplay --quiet -i eth0 max_speed.pcap
```

#### Multi-threading and Processing
```bash
# Use multiple cores (if supported)
tcpreplay --parallel 4 -i eth0 parallel_test.pcap

# Batch process multiple files
for file in *.pcap; do
    tcpreplay -i eth0 -M 10 "$file"
done
```

## Integration and Automation

### Shell Scripts

#### Automated Network Testing
```bash
#!/bin/bash
# Automated network load testing

INTERFACE="eth0"
TEST_FILES=("test1.pcap" "test2.pcap" "test3.pcap")
SPEEDS=(10 50 100 500)

for file in "${TEST_FILES[@]}"; do
    for speed in "${SPEEDS[@]}"; do
        echo "Testing $file at ${speed}Mbps..."
        tcpreplay -M "$speed" -i "$INTERFACE" "$file"

        # Capture statistics
        echo "Statistics for $file at ${speed}Mbps:"
        tcpreplay --stats -M "$speed" -i "$INTERFACE" "$file"

        sleep 5
    done
done
```

#### Continuous Monitoring
```bash
#!/bin/bash
# Continuous traffic replay for monitoring

while true; do
    echo "Replaying traffic at $(date)"
    tcpreplay -i eth0 -M 10 -t monitor_traffic.pcap

    # Log replay statistics
    echo "Replay completed at $(date)" >> /var/log/tcpreplay.log

    sleep 60
done
```

### Performance Benchmarking

#### Network Performance Testing
```bash
#!/bin/bash
# Network performance benchmark

TARGET_SPEEDS=(1 10 100 500 1000)
TEST_DURATION=60
RESULTS_FILE="network_performance.log"

echo "Speed (Mbps),Throughput (Mbps),Packet Loss (%)" > "$RESULTS_FILE"

for speed in "${TARGET_SPEEDS[@]}"; do
    echo "Testing at ${speed}Mbps for ${TEST_DURATION}s..."

    # Record start time
    start_time=$(date +%s)

    # Run test
    tcpreplay -M "$speed" -i eth0 --duration "$TEST_DURATION" benchmark.pcap

    # Record end time
    end_time=$(date +%s)

    # Calculate results
    actual_duration=$((end_time - start_time))
    echo "$speed,$actual_duration,0" >> "$RESULTS_FILE"
done
```

## Troubleshooting

### Common Issues

#### Interface Problems
```bash
# Check available interfaces
tcpreplay --list-nics

# Interface not found errors
# Solution: Use correct interface name or bring interface up
sudo ip link set eth0 up

# Permission denied errors
# Solution: Run with sudo or add user to appropriate group
sudo tcpreplay -i eth0 capture.pcap
```

#### Performance Issues
```bash
# Slow replay speed
# Solution: Use appropriate timing mode
tcpreplay -t -i eth0 capture.pcap  # No timing constraints

# Memory usage issues
# Solution: Reduce cache size or preload smaller files
tcpreplay -c 100000 -i eth0 large_capture.pcap

# Packet loss during replay
# Solution: Reduce replay speed or use better hardware
tcpreplay -M 50 -i eth0 capture.pcap
```

#### File Format Issues
```bash
# Corrupted pcap files
# Solution: Repair with tcpdump or wireshark
tcpdump -r corrupted.pcap -w repaired.pcap

# Unsupported pcap format
# Solution: Convert with tcpdump or tshark
tcpdump -r old_format.pcap -w new_format.pcap
```

## Related Commands

- [`tcpdump`](/docs/commands/network/tcpdump) - Capture network traffic
- [`tcpprep`](/docs/commands/network/tcpprep) - Process pcap files for tcpreplay
- [`tcprewrite`](/docs/commands/network/tcprewrite) - Modify pcap files
- [`tcpbridge`](/docs/commands/network/tcpbridge) - Bridge network traffic
- [`tcpprep`](/docs/commands/network/tcpprep) - Create cache files
- [`wireshark`](/docs/commands/network/wireshark) - Network protocol analyzer
- [`tshark`](/docs/commands/network/tshark) - Command-line network analyzer
- [`ngrep`](/docs/commands/network/ngrep) - Network grep

## Best Practices

1. **Test in isolated environments** to avoid network disruption
2. **Use appropriate interface selection** with `-i` flag
3. **Control replay speed** carefully to avoid network overload
4. **Preload large pcap files** with `--preload-pcap` for better performance
5. **Monitor network conditions** during replay with `--stats`
6. **Use loop delays** when replaying traffic continuously
7. **Filter pcap files** before replay to target specific traffic
8. **Consider timing modes** based on testing requirements
9. **Document test scenarios** and capture parameters for reproducibility
10. **Back up critical pcap files** before modification

## Performance Tips

1. **Top-to-bottom mode** (-t) provides fastest replay for load testing
2. **Preload pcap files** into memory for consistent performance
3. **Adjust packet cache size** based on available memory
4. **Use precise timing** (-p) for accurate protocol testing
5. **Limit packet count** with `-L` for targeted testing
6. **Disable statistics** with `--quiet` for maximum throughput
7. **Choose appropriate speed** based on network capacity
8. **Use dual interface replay** for client-server testing
9. **Monitor system resources** during high-speed replay
10. **Consider hardware limitations** when setting replay speeds

The `tcpreplay` command is an essential network testing tool that enables realistic network traffic replay for testing, analysis, and security auditing. Its flexible timing controls, interface options, and performance features make it invaluable for network engineers, security professionals, and developers who need to reproduce network conditions accurately and efficiently.