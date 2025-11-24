# mpstat

## Overview
`mpstat` reports processor-related statistics, showing CPU utilization for each processor.

## Basic Usage

```bash
# Display all processor statistics
mpstat -P ALL

# Show statistics with interval
mpstat 1 5

# Display global CPU statistics
mpstat

# Show specific CPU
mpstat -P 0
```

## Output Fields

- **CPU**: Processor number
- **%usr**: Percentage of CPU utilization at the user level
- **%nice**: Percentage of CPU utilization at the user level with nice priority
- **%sys**: Percentage of CPU utilization at the system level
- **%iowait**: Percentage of time CPU is idle waiting for I/O operations
- **%irq**: Percentage of time CPU is servicing hardware interrupts
- **%soft**: Percentage of time CPU is servicing software interrupts
- **%steal**: Percentage of time spent in involuntary wait by virtual CPU
- **%guest**: Percentage of time spent running a virtual processor
- **%idle**: Percentage of time CPU is idle

## Examples

```bash
# Monitor CPU usage every second for 10 iterations
mpstat 1 10

# Check for CPU saturation
mpstat 1 5 | grep -E "CPU|all"

# Monitor individual CPUs
mpstat -P ALL 2 3

# Check if CPUs are idle
mpstat -P ALL | awk '$NF < 20 {print "CPU" $2 " has low idle: " $NF "%"}'
```

## Performance Analysis

- **High %iowait**: I/O bottleneck affecting CPU performance
- **High %sys**: System-level overhead (kernel processes)
- **Low %idle**: CPU is heavily utilized
- **High %usr**: User applications consuming CPU

## CPU Saturation Indicators

- %idle < 20% indicates CPU saturation
- %iowait > 20% indicates I/O wait issues
- %usr + %sys > 80% indicates high CPU usage

## Related Commands
- `iostat` - I/O statistics
- `vmstat` - Virtual memory statistics
- `top` - Dynamic process viewer
- `sar` - System activity reporter