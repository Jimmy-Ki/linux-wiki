# iostat

## Overview
`iostat` reports CPU and I/O statistics for devices and partitions.

## Basic Usage

```bash
# Display basic I/O statistics
iostat

# Display extended statistics with intervals
iostat 2 5

# Show human-readable output
iostat -h

# Display statistics for specific devices
iostat -d sda sdb
```

## Key Metrics

- **tps**: Transfers per second
- **kB_read/s**: Kilobytes read per second
- **kB_wrtn/s**: Kilobytes written per second
- **await**: Average wait time (ms)
- **util**: Device utilization percentage

## Examples

```bash
# Monitor disk utilization in real-time
watch -n 1 iostat -x 1 1

# Check for I/O bottlenecks
iostat -x 1 3 | grep -E "^Device|sd"
```

## Performance Analysis

- **0-20%**: Low usage, healthy
- **20-50%**: Moderate usage, normal
- **50-80%**: High usage, monitor closely
- **80-95%**: Very high usage, potential bottleneck
- **95-100%**: Disk is saturated, serious performance issues

## Related Commands
- `vmstat` - Virtual memory statistics
- `sar` - System activity reporter
- `iotop` - I/O monitoring tool